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
  this.getPartType();
  
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
      ReqObj = 
        [{
          "ClaimNo": this.CliamNo,
          "QuotationNo": this.QuotationNo,
          "DamageSno": index+1,
          "DamageDirection": rowData.DamageDirection,
          "DamagePart": rowData.DamagePart,
          "RepairReplace": rowData.RepairReplace,
          "NoOfUnits": rowData.NoOfUnits,
          "UnitPrice": rowData.UnitPrice,
          "ReplacementCharge": rowData.ReplacementCharge,
          "GarageLoginId": this.loginId,
          "TotalPrice": rowData.TotalPrice,
        }]
  //       reqList.push(ReqObj)
  //       i+=1;
  // }
       urlLink = `${this.CommonApiUrl}damage/garage/save`;
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Errors.length!=0){
           // this.DamageDeatilsList = data;
        }
        else{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Damage Details Added Successfully' });
          this.DamageIndex =null
        }
      },
      (err) => { },
    );
}
getDamageDirection(){
    let urlLink = `${this.CommonApiUrl}dropdown/getdamagedirection`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.DamageDirectionList = data.Result;
        }
      },
      (err) => { },
    );
}
getPartType(){
  let urlLink = `${this.CommonApiUrl}dropdown/vehiclebodyparts`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.PartTypeList = data.Result;
      }
    },
    (err) => { },
  );
}
getRepairReplaceType(){
  let urlLink = `${this.CommonApiUrl}dropdown/repairreplace`;
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
  let ReplacementCharge
  if(rowData.ReplacementCharge==null){
    ReplacementCharge = 0;
  } 
  else {
    ReplacementCharge = rowData.ReplacementCharge
  }

  const total = Number(rowData.NoOfUnits) * Number(rowData.UnitPrice)  +  Number(ReplacementCharge);
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
    return  grandTotal    
} 
}
