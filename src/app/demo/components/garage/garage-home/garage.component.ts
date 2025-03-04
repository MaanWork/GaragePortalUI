import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent {
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
  WorkOrderInformationList: any[]=[];
  CliamNo: string;
  DealerWorkOrderInformationList: any[]=[];
  GarageDropList:any[]=[];
  GarageDrop:any;
  tabIndex:any;
  pendingVehicleList:any[]=[];
  inprogressVehicleList: any[]=[];
  compeletedVehicleList: any[]=[];
  rejectedVehicleList: any[]=[];
  columnsR: any[]=[];
  columnsP: any[]=[];
  QuoteStatusList:any[]=[];
  displayDialog:boolean=false;
  responseData: any[]=[];
  DamageDisable: boolean=false;
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Response.LoginId;
    this.agencyCode = this.userDetails.Response.OaCode;
    this.branchCode = this.userDetails.Response.BranchCode;
    this.productId = this.userDetails.Response.ProductId;
    this.CompanyId = this.userDetails.Response.CompanyId;
    this.userType = this.userDetails.Response.UserType;
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
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
      this.columnsR = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #'];
      this.columnsP = [ 'S.#','Claim No', 'Quotation No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];

      this.columns = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
    else if(this.lang=='po'){ 
      this.columnsR = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #'];
      this.columns = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
    else if(this.lang=='fr'){ 
      this.columnsR = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #'];
      this.columns = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Accueil', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
  }
 
ngOnInit(){
     this.getallVehicleList("PFG","0",'direct');
    this.getallWorkOrderInformationList('direct')
    this.getQuoteStatus()
  if(this.userType=='Dealer'){
    this.GarageDropList = [{"Code":"garage_test","CodeDesc":"garage_test"},{"Code":"garage_test1","CodeDesc":"garage_test1"}]
    this.getallWorkOrderInformationList('direct')
  }
}
getallVehicleList(status,event,type){
  
  let ReqObj = {
      "CompanyId": this.CompanyId,
      "GarageId" : this.loginId
    }
    let urlLink = `${this.CommonApiUrl}vehicle/garage/view`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
          this.vehicleList = data.Response;
          let datas:any[]=[];
          if(type=='change'){
            this.pendingVehicleList = this.vehicleList.filter(ele => ele.QuoteStatus== status[event.index].Code);
          }
          else{
            this.pendingVehicleList = this.vehicleList.filter(ele => ele.QuoteStatus== "PFG");
          }
          console.log(this.pendingVehicleList,event,"this.pendingVehicleList");
          
          // for(let entry of this.pendingVehicleList){
          //   if(entry.QuotationNo=='' || entry.QuotationNo==null){
          //     this.DamageDisable=true;
          //   }
          // }
          // this.compeletedVehicleList = compeleted;
          // this.rejectedVehicleList = rejected;
          
        }
      },
      (err) => { },
    );
}
getallWorkOrderInformationList(type){
  let ReqObj;
  if(type=='change'){
     ReqObj = {
      "CreatedBy": this.loginId
    }
  }else {
    ReqObj = {
      "CreatedBy": this.loginId
    }
  }
    let urlLink = `${this.CommonApiUrl}workOrder/getAllByGarage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
            this.WorkOrderInformationList = data.Response;
        }
      },
      (err) => { },
    );
}
editQuote(rowData,type){
  if(type=='GPC')sessionStorage.setItem('Completed','Completed')
    if(rowData){
      sessionStorage.setItem('CliamNo',rowData.ClaimNo);
      sessionStorage.setItem('QuoteStatus',rowData.QuoteStatus);
      if(this.userType=="Garage")
        {
      this.router.navigate(['/garage/workorder']);
      }
      else if(this.userType=="Dealer"){
        this.router.navigate(['/garage/damagedetail']);
      }
  }
}
editQuote1(CliamNo,rowData,type){
  if(rowData){
    sessionStorage.setItem('CliamNo',CliamNo)
    sessionStorage.setItem('QuotationNo',rowData.QuotationNo)
    sessionStorage.setItem('Type',type)
      this.router.navigate(['/garage/damagedetail'])
    
  }
}
rejectQuote(rowData,status){
  Swal.fire({
    title: '<strong></strong>',
    icon: 'info',
    html:
      `<ul class="list-group errorlist">
        <li>Do You Want Reject the Quote?</li>
    </ul>`,
     //showCloseButton: false,
      focusConfirm: true,
      showCancelButton:true,

    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No',
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
  this.reject(rowData,status)
    }
})

}
getQuoteStatus(){
  let urlLink = `${this.CommonApiUrl}claim/grid/status/${this.userType}/${this.CompanyId}`;
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
reject(rowData,status){
  let ReqObj = {
    "ClaimNo": rowData,
    "QuoteStatus":status
  }

  let urlLink = `${this.CommonApiUrl}vehicle/garage/rejectClaim`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Response){
        this.getallVehicleList("PFG","0",'direct')
      }
    },
    (err) => { },
  );
}
Completed(rowData,type){
if(rowData){
  sessionStorage.setItem('CliamNo',rowData)
  sessionStorage.setItem("Completed",type)
  this.router.navigate(['/garage/workorder'])
}
}
detailview(data){
  console.log(data,"detailview");
  this.displayDialog = true;
  if(data){
    this.responseData = [data];
  }
  console.log(this.responseData,"detailview");

}
}
