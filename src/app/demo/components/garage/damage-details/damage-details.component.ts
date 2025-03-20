import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';
import { Product, ProductData } from '../product';
import { DamageDetails } from '../../quotation/quotation-plan/models/DamageDetails';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.component.html',
  styleUrls: ['./damage-details.component.scss']
})
export class DamageDetailsComponent {
  items: MenuItem[] | undefined;
  tableActions:MenuItem[] | undefined;
  columns:string[] = []; 
  tableView = 'table';
  userDetails:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  userType:any=null;brokerbranchCode:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  searchValue: any=null;clearSearchSection: boolean=false;lang:any=null;
  vehicleList: any[]=[];
  CompanyId: any;
  culumnHeader: any[]=[];
  products: any[]=[];
  DamageDeatilsList: any[]=[];
  CliamNo: string;
  DamageDirectionList: any[]=[];
  QuotationNo: string;
  RepairReplaceTypeList: any[]=[];
  clonedProducts: any;
  productItem: any;
  DamageVisible:boolean=false;
  Fields: any[]=[];
  DamageIndex:any=0;
  public form = new FormGroup({}); 
  grandTotal: any;
  grandTotal1: number;
  Type: string;
  saveStatus: string = ''; // Status to show save status
  debounceTimeout: any;
  draftData: any[]=[];
  PartTypeList: any[]=[];
  constructor(private messageService: MessageService,private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Response.LoginId;
    this.agencyCode = this.userDetails.Response.OaCode;
    this.branchCode = this.userDetails.Response.BranchCode;
    this.productId = this.userDetails.Response.ProductId;
    this.CompanyId = this.userDetails.Response.CompanyId;
    this.userType = this.userDetails.Response.UserType;
    this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
    this.draftData = JSON.parse(localStorage.getItem('draftData'));
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.QuotationNo=sessionStorage.getItem('QuotationNo');
    this.Type=sessionStorage.getItem('Type');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
        this.setHeaders()
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
      this.setHeaders();
    }
    // this.getCustomersList();
   
  }
  setHeaders(){
    if(this.lang=='en'){ 
      this.columns = [ 'S.#','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
    else if(this.lang=='po'){ 
      this.columns = [ 'S.#','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
    else if(this.lang=='fr'){ 
      this.columns = [ 'S.#','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Accueil', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
  }
 
 ngOnInit(){
  // this.productItem= new ProductData();
  // let fireData = new DamageDetails();
  // this.Fields[0] = fireData?.fields?.fieldGroup[0];
  this.getDamageDeatilsListByclaimid();
  this.getDamageDirection();
  this.getRepairReplaceType();
  //this.getPartType(' ');
  
  if (this.draftData) {
    let i = 0;
    // Parse the JSON string from local storage
   // const draftData = JSON.parse(this.draftData);
   const draftData = JSON.parse(this.draftData[i]);

   // Optional: If you want to assign to a specific list
  // this.DamageDeatilsList = []; // Clear the existing list if needed
  if(this.DamageDeatilsList.length==0){
    this.DamageDeatilsList=[{
      "DamageSno":this.DamageDeatilsList.length+1,
    "DamageDirection":null,
    "DamagePart":null,
    "RepairReplace":null,
    "NoOfUnits":null,
    "UnitPrice":null,
    "ReplacementCharge":null,
    "Status":null,
    "QuotationNo":this.QuotationNo
  }]
}
  for (i = 0; i < draftData.length; i++) {
     const entry = draftData[i];
     // Create a new entry in your DamageDeatilsList
    this.DamageDeatilsList.push({
       DamageSno: entry.DamageSno,
       DamageDirection: entry.DamageDirection,
       DamagePart: entry.DamagePart,
       RepairReplace: entry.RepairReplace,
       NoOfUnits: entry.NoOfUnits,
       UnitPrice: entry.UnitPrice,
       ReplacementCharge: entry.ReplacementCharge,
       TotalPrice: entry.TotalPrice
     });
 
     // Assign ClaimNo and QuotationNo if needed
     this.CliamNo = entry.ClaimNo || this.CliamNo;
     this.QuotationNo = entry.QuotationNo || this.QuotationNo;
   }
  }
 
 }
 onInputChange() {
  this.saveStatus = 'Saving...';

  // Clear any existing timeout
  if (this.debounceTimeout) {
    clearTimeout(this.debounceTimeout);
  }

  // Set a new timeout to simulate debounce and auto-save
  this.debounceTimeout = setTimeout(() => {
    this.autoSaveDraft();
  }, 1000); // 1 second debounce
}

// Simulate auto-save draft method
autoSaveDraft() {
  let reg=[];
  for(let entry of this.DamageDeatilsList){
     reg.push({
      ClaimNo: this.CliamNo,
      QuotationNo: this.QuotationNo,
      DamageSno: entry.DamageSno,
      DamageDirection: entry.DamageDirection,
      DamagePart: entry.DamagePart,
      RepairReplace: entry.RepairReplace,
      NoOfUnits: entry.NoOfUnits,
      UnitPrice: entry.UnitPrice,
      ReplacementCharge: entry.ReplacementCharge,
      GarageLoginId: this.loginId,
      TotalPrice: entry.TotalPrice
    })
  }
  localStorage.setItem('draftData', JSON.stringify(reg));
  // let draftData=[];
  // draftData.push(reg);

  // Simulate saving to localStorage or API
  
  // Update the save status
  this.saveStatus = 'Draft saved at ' + new Date().toLocaleTimeString();
}

 getDamageDeatilsListByclaimid(){
  let ReqObj,urlLink;
  if(this.userType=='Dealer'){
    ReqObj = {
      "ClaimNo": this.CliamNo,
      "QuotationNo": this.QuotationNo
    }
    urlLink = `${this.CommonApiUrl}api/damagedetails/dealerview`;
  }else{

    ReqObj = {
     "ClaimNo": this.CliamNo,
     "QuotationNo": this.QuotationNo
   }
   urlLink = `${this.CommonApiUrl}damage/garage/view`;
  }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
            this.DamageDeatilsList = data.Response;
            this.DamageIndex=null
        }
      },
      (err) => { },
    );
}
saveDamageDeatils(rowData,index){
  let ReqObj,urlLink
  //for(let entry of this.DamageDeatilsList){
    if(this.userType=='Dealer'){
      ReqObj= [
        {
          "ClaimNo": this.CliamNo,
          "QuotationNo": this.QuotationNo,
          "DamageSno": index+1,
          "UnitPrice": rowData.UnitPrice,
          "DealerLoginId": this.loginId,
        }
      ]
      urlLink = `${this.CommonApiUrl}api/damagedetails/dealersave`;
    }
    else{
      let i=0,DamageDirection;
      if(rowData.DamageDirection==null || rowData.DamageDirection==0 || rowData.DamageDirection==undefined || rowData.DamageDirection=='' || rowData.DamageDirection=='-Select-'){rowData['DamageDirectionError']=true;i+=1;}
      else rowData['DamageDirectionError']=false;
      if(rowData.DamagePart==null || rowData.DamagePart==0 || rowData.DamagePart==undefined || rowData.DamagePart=='' || rowData.DamagePart=='-Select-'){rowData['DamagePartError']=true;i+=1;}
      else rowData['DamagePartError']=false;
      if((rowData.NoOfUnits==null || rowData.NoOfUnits==0 || rowData.NoOfUnits==undefined || rowData.NoOfUnits=='') ){rowData['NoOfUnitsError']=true;i+=1;}
      else rowData['NoOfUnitsError']=false;
      if((rowData.UnitPrice==null || rowData.UnitPrice==0 || rowData.UnitPrice==undefined || rowData.UnitPrice=='') && rowData.RepairReplace!='REPAIR'){rowData['UnitPriceError']=true;i+=1;}
      else rowData['UnitPriceError']=false;
      if((rowData.ReplacementCharge==null || rowData.ReplacementCharge==0 || rowData.ReplacementCharge==undefined) ){rowData['ReplacementChargeError']=true;i+=1;}
      else rowData['ReplacementChargeError']=false;
      if(i==0){
        let UnitPrice=null,ReplacementCharge=null;
        if(rowData.UnitPrice){UnitPrice = String(rowData.UnitPrice).replaceAll(',','')}
        if(rowData.ReplacementCharge){ReplacementCharge = String(rowData.ReplacementCharge).replaceAll(',','')}
        if( rowData.DamageDirection) DamageDirection= this.DamageDirectionList.find(ele=>ele.Code == rowData.DamageDirection).CodeDesc;

        ReqObj = 
          [{
            "ClaimNo": this.CliamNo,
            "QuotationNo": this.QuotationNo,
            "DamageSno": index+1,
            "DamageDirection": DamageDirection,
            "DamagePart": rowData.DamagePart,
            "RepairReplace": rowData.RepairReplace,
            "NoOfUnits": rowData.NoOfUnits,
            "UnitPrice": UnitPrice,
            "ReplacementCharge": ReplacementCharge,
            "GarageLoginId": this.loginId,
            "TotalPrice": rowData.TotalPrice,
          }]
      }
     
  //       reqList.push(ReqObj)
  //       i+=1;
  // }
       urlLink = `${this.CommonApiUrl}damage/garage/save`;
    }
    if(ReqObj){
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Errors.length!=0){
             // this.DamageDeatilsList = data;
          }
          else{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Damage Details Added Successfully' });
            this.DamageIndex =null
            this.getDamageDeatilsListByclaimid()
          }
        },
        (err) => { },
      );
    }
   
}
// getName(rowData){
//   let  DamageDirection= this.DamageDirectionList.find(ele=>ele.Code == rowData.DamageDirection).CodeDesc;
//   alert(DamageDirection)
//  // return DamageDirection;
// }
getDamageDirection(){
    let urlLink = `${this.CommonApiUrl}dropdown/getdamagedirection/${this.CompanyId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let defaultRow = [{"Code": null,"CodeDesc":"-Select-"}]
            this.DamageDirectionList = defaultRow.concat(data.Result);
        }
      },
      (err) => { },
    );
}
getPartType(rowData){
  let urlLink = `${this.CommonApiUrl}dropdown/vehiclebodyparts/${this.CompanyId}/${rowData}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      if(data.Result){
        let defaultRow = [{"Code": null,"CodeDesc":"-Select-"}]
        this.PartTypeList = defaultRow.concat(data.Result);
      }
    },
    (err) => { },
  );
}
onAmountChange (args) {
  if (args.key === 'e' || args.key === '+' || args.key === '-') {
    return false;
  } else {
    return true;
  }
}
CommaFormatted(rowData) {

  // format number
  if (rowData.UnitPrice!='' && rowData.UnitPrice!=null && rowData.UnitPrice!=undefined) {
    rowData.UnitPrice = String(rowData.UnitPrice).replace(/[^0-9.]|(?<=\..*)\./g, "")
     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
LabourCommaFormatted(rowData) {

  // format number
  if (rowData.ReplacementCharge!='' && rowData.ReplacementCharge!=null && rowData.ReplacementCharge!=undefined) {
    rowData.ReplacementCharge = String(rowData.ReplacementCharge).replace(/[^0-9.]|(?<=\..*)\./g, "")
     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
getRepairReplaceType(){
  let urlLink = `${this.CommonApiUrl}dropdown/repairreplace/${this.CompanyId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.RepairReplaceTypeList = data.Result;
      }
    },
    (err) => { },
  );
}

DamageDictDesc(rowData){
  // //alert(rowData)
  // let entry =this.DamageDirectionList.find(ele=>ele.Code == rowData.Code)
  // alert(entry)
  // return entry;
}
totalCalc(rowData){
  if(rowData.NoOfUnits=='' || rowData.NoOfUnits==null) rowData.NoOfUnits = 0;
  if(rowData.UnitPrice=='' || rowData.UnitPrice==null) rowData.UnitPrice = 0;
  let ReplacementCharge
  if(rowData.ReplacementCharge==null){
    ReplacementCharge = 0;
  } 
  else {
    ReplacementCharge = Number(String(rowData.ReplacementCharge).replaceAll(',',''))
  }
  
  const total = Number(String(rowData.NoOfUnits).replaceAll(',','')) * Number(String(rowData.UnitPrice).replaceAll(',',''))  +  Number(String(ReplacementCharge).replaceAll(',',''));
  console.log("Total",total)
  return total;
}
addNewDamageDeatils(){
  console.log(this.draftData,"this.draftDatathis.draftData");
  
    let entry = {
      "DamageSno":this.DamageDeatilsList.length+1,
      "DamageDirection":null,
      "DamagePart":null,
      "RepairReplace":null,
      "NoOfUnits":null,
      "UnitPrice":null,
      "ReplacementCharge":null,
      "Status":null,
      "QuotationNo":this.QuotationNo
      
    }
    this.DamageIndex = this.DamageDeatilsList.length
    this.DamageDeatilsList.push(entry)
    console.log(this.DamageDeatilsList); // Debug line
  
}
getBack(){
  let type =sessionStorage.getItem('Type');
  if(type=='In-Progress' ){
    this.router.navigate(['/garage'])
  }
  // else if(type=='surveyor'){
  //   this.router.navigate(['/surveyor'])
  // }
  // else if(this.userType=='Dealer'){
  //   this.router.navigate(['/dealer'])
  // }
  else{
    this.router.navigate(['/garage/workorder'])
  }
}
onSubmit(){
  let entry;
  for(entry of this.DamageDeatilsList){

  }
  console.log(entry,"entryentryentryentry");
  
  //this.saveDamageDeatils(this.DamageDeatilsList,null)
  if(entry.DamageDirection!=null && entry.DamagePart!=null && entry.RepairReplace!=null && entry.NoOfUnits!=null
     && entry.UnitPrice!=null && entry.ReplacementCharge!=null){
      this.router.navigate(['/garage/totalamount'])
     }
  else{
    this.validation()
  }
}
validation(){
  Swal.fire({
    title: `<strong>
      <ng-container *ngIf="this.lang=='en'">Errors!</ng-container>
      </strong>`,
    icon: 'info',
    html:
      `<ul class="list-group errorlist">
       Please Enter Values
    </ul>`,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText:
      `<i class="fa fa-thumbs-down"></i> <ng-container *ngIf="this.lang=='en'">Errors!</ng-container> `,
    confirmButtonAriaLabel: 'Thumbs down, Errors!',
  })
}
// onRowEditInit(product) {
//   //this.DamageVisible=true;
// }
removeDamageDeatils(rowData,index){
  //this.DamageDeatilsList.splice(index,1)
  let ReqObj =[ {
    "ClaimNo": this.CliamNo,
    "QuotationNo": rowData.QuotationNo,
    "DamageSno":rowData.DamageSno,
  }]
    let urlLink = `${this.CommonApiUrl}damage/garagedelete`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
          this.getDamageDeatilsListByclaimid()
        }
      },
      (err) => { },
    );
}
next(){
  if(this.userType=='Dealer'){
    this.router.navigate(['/dealer'])
  }
  else{
    this.router.navigate(['/garage'])
  }
  
}
  addTotalsToData(dataList){
    let grandTotal = 0;
      for (let i = 0; i < dataList.length; i++) {
        const rowData = dataList[i];
        grandTotal += this.totalCalc(rowData);
      } 
      return Number(grandTotal)
  } 
}
