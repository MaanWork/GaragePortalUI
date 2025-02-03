import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
import { Product, ProductData } from '../product';
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
  QuoteStatus:any;
  QuoteStatusList: any[]=[];
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
  this.getQuoteStatus()
  this.getDamageDeatilsListByclaimid();
  this.getDamageDirection();
  this.getRepairReplaceType();
  this.getPartType();
  // if(this.DamageDeatilsList.length!=0){
  //   this.grandTotal1 = this.addTotalsToData(this.DamageDeatilsList);
  // }
//   this.DamageDeatilsList=[{
//     "DamageSno":this.DamageDeatilsList.length+1,
//   "DamageDirection":null,
//   "DamagePart":null,
//   "RepairReplace":null,
//   "NoOfUnits":null,
//   "UnitPrice":null,
//   "ReplacementCharge":null,
//   "Status":null,
//   "QuotationNo":this.QuotationNo
// }]
 }
 getQuoteStatus(){
  let urlLink = `${this.CommonApiUrl}claim/grid/status/${this.userType}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.QuoteStatusList = data.Result;
      }
    },
    (err) => { },
  );
}
 getDamageDeatilsListByclaimid(){
  let ReqObj,urlLink;
  if(this.userType=='Dealer'){
    ReqObj = {
      "ClaimNo": this.CliamNo,
      "QuotationNo": this.QuotationNo
    }
    urlLink = `${this.CommonApiUrl}damage/dealer/view`;
  }else{

    ReqObj = {
     "ClaimNo": this.CliamNo,
     "QuotationNo": this.QuotationNo
   }
   urlLink = `${this.CommonApiUrl}api/damagedetails/garageview`;
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
onInputSparePartsChange(rowData,event: Event): void{
  const input = event.target as HTMLInputElement;
  // Remove non-numeric characters and limit length to 5
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 20);
  rowData.UnitPrice = input.value;
}
saveDamageDeatils(rowData,index){
  let ReqObj,urlLink
  //for(let entry of this.DamageDeatilsList){
    if(this.userType=='Dealer'){
      ReqObj= [
        {
          "ClaimNo": this.CliamNo,
          "QuotationNo": this.QuotationNo,
          "DamageSno": rowData.DamageSno,
          "UnitPrice": rowData.UnitPrice,
          "DealerLoginId": this.loginId,
        }
      ]
      urlLink = `${this.CommonApiUrl}damage/dealer/save`;
    }
    else{
      ReqObj = 
        [{
          "ClaimNo": this.CliamNo,
          "QuotationNo": this.QuotationNo,
          "DamageSno": rowData.DamageSno,
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
       urlLink = `${this.CommonApiUrl}api/damagedetails/garagesave`;
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
  let add= Number(rowData.UnitPrice)+ Number(ReplacementCharge);
  const total = Number(rowData.NoOfUnits)*(add)
  return total;
}
addNewDamageDeatils(){
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
  // this.DamageVisible=true;
}
getBack(){
  let type =sessionStorage.getItem('Type');
  // if(type=='In-Progress' ){
  //   this.router.navigate(['/garage'])
  // }
  // else if(type=='surveyor'){
  //   this.router.navigate(['/surveyor'])
  // }
  // else
   if(this.userType=='Dealer'){
    this.router.navigate(['/dealer'])
  }
  else{
    this.router.navigate(['/dealer/workorder'])
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
      this.router.navigate(['/dealer/totalamount'])
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
    let urlLink = `${this.CommonApiUrl}api/damagedetails/garagedelete`;
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
    let ReqObj,urlLink;
      ReqObj = {
       "ClaimNo": this.CliamNo,
       "QuoteStatus": this.QuoteStatus,
       "GarageId":this.DamageDeatilsList[0].GarageLoginId
     }
     urlLink = `${this.CommonApiUrl}vehicle/dealer/status/save`;
    
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Message=='Success'){
            this.router.navigate(['/dealer'])
          }
        },
        (err) => { },
      );
  
   
  
}
addTotalsToData(dataList){
  let grandTotal = 0;
  for (let i = 0; i < dataList.length; i++) {
    const rowData = dataList[i];
    grandTotal += this.totalCalc(rowData);
  }
    return  grandTotal    
} 
saveDamageStaus(){

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

}
