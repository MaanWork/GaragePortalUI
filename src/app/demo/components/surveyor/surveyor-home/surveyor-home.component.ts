import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';


@Component({
  selector: 'app-surveyor-home',
  templateUrl: './surveyor-home.component.html',
  styleUrls: ['./surveyor-home.component.scss']
})
export class SurveyorHomeComponent {
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
  columnsC: any[]=[];
  assignWorkList: any[]=[];
  DealerLowestList: any[]=[];
  GarageLowestList: any[]=[];
  columnsDealer: string[];
  columnsGarage: string[];
  selectedRows: any;
  WorkAssigned: any[]=[];
  QuoteStatusList: any[]=[];
  displayDialog: boolean=false;
  GarageDropError: boolean=false;
  responseData: any[]=[];
  
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
      this.columnsR = [ 'S.#','Claim No','Vehicle Make and Model',  'Make Year','Chassis No.',  'Type', 'Vehicle Reg #','Purchased by Where','Compare Quote /View'];
      this.columnsP = [ 'S.#','Claim No', 'Quotation No','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.columnsC = [ 'S.#','Vehicle Make' , 'Vehicle Model',  'Damage Part','No Of Unit', 'Garage Price', 'Dealer Price','Garage Id','Dealer Id', 'Vehicle Reg #' ,'Entry Date'];
      this.columnsDealer = ['Claim No','Vehicle Make' , 'Vehicle Model',  'Damage Part','No Of Unit', 'Dealer Price','Garage Price','Vehicle Reg #' ,'Entry Date'];
      this.columnsGarage = ['Claim No', 'Vehicle Make' , 'Vehicle Model',  'Damage Part','No Of Unit', 'Garage Price', 'Dealer Price', 'Vehicle Reg #' ,'Entry Date'];
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
    this.getallVehicleList("CPTS","0",'direct');
 // else if(this.userType=='Dealer'){
    // this.GarageDropList = [{"Code":"","CodeDesc":"--Select--"},{"Code":"garage_test","CodeDesc":"garage_test"},{"Code":"garage_test1","CodeDesc":"garage_test1"}]
    this.getQuoteStatus()
    this.getallgarageLoginId();
   
 // }
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
getallVehicleList(status,event,type){
  this.GarageDropError=false;
  if(this.GarageDrop=='' || this.GarageDrop==null || this.GarageDrop=='--Select--'){
    this.GarageDropError=true;
  }
  else{
   
    let ReqObj = {
      "CompanyId": this.CompanyId,
      "GarageId": this.GarageDrop,
      "SurveyorId":this.loginId
    }
    
    let urlLink = `${this.CommonApiUrl}vehicle/surveyor/view`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
          this.vehicleList = data.Response;
          
          if(type=='change'){
            this.pendingVehicleList = this.vehicleList.filter(ele => ele.QuoteStatus== status[event.index].Code);
          }
          else{
            this.pendingVehicleList = this.vehicleList.filter(ele => ele.QuoteStatus== "CPTS");
          }
          console.log(this.pendingVehicleList,event,"this.pendingVehicleList");
          this.assignedWork();
          this.getCompVehicleList();
        }
      },
      (err) => { },
    );
  }
 
}
getCompVehicleList(){
  let ReqObj = {
    "CompanyId": this.CompanyId,
    "GarageId": this.GarageDrop,
    }
    let urlLink = `${this.CommonApiUrl}vehicle/surveyor/view/completed`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
          this.compeletedVehicleList = data.Response;
          //let DealerLow = this.vehicleList.filter(ele => parseFloat(ele.DealerPrice) < parseFloat(ele.GaragePrice));
          // let inprogress = this.vehicleList.filter(ele => ele.Status == "I");
          // let compeleted = this.vehicleList.filter(ele => ele.Status == "C");
          // let rejected = this.vehicleList.filter(ele => ele.Status == "R");
          let DealerLow = this.compeletedVehicleList.filter(ele => {
            const dealerPrice = parseFloat(ele.DealerPrice);
            const garagePrice = parseFloat(ele.GaragePrice);
            console.log(`Comparing Dealer Price: ${dealerPrice} with Garage Price: ${garagePrice}`);
            return dealerPrice < garagePrice;
        });
        let GarageLow = this.compeletedVehicleList.filter(ele => {
          const dealerPrice = parseFloat(ele.DealerPrice);
          const garagePrice = parseFloat(ele.GaragePrice);
          console.log(`Comparing Dealer Price: ${dealerPrice} with Garage Price: ${garagePrice}`);
          return garagePrice <= dealerPrice && garagePrice!=0;
      });
          this.DealerLowestList = DealerLow;
         // this.DealerLowestList['SelectedYn']='N';
          console.log(this.DealerLowestList,"this.DealerLowestList");
          this.GarageLowestList = GarageLow;
          console.log(this.GarageLowestList,"this.DealerLowestList");
          // this.inprogressVehicleList = inprogress;
          // this.compeletedVehicleList = compeleted; 
          //  [
          //   {
          //     "ClaimNo": "CLM987654",
          //     "QuotationNo": "QUO-CLM987654-2",
          //     "DamageSno": "1",
          //     "DamageDictDesc": "Front",
          //     "DamagePart": "text",
          //     "RepairReplace": "REPAIR",
          //     "NoOfParts": "23",
          //     "GaragePrice": "10.00",
          //     "DealerPrice": "700.00",
          //     "GarageLoginId": "garage_test",
          //     "DealerLoginId": "dealer_test",
          //     "SurveyorId": "",
          //     "ReplaceCost": "",
          //     "ReplaceCostDeduct": "",
          //     "SparepartDeprection": "",
          //     "DiscountSparepart": "",
          //     "TotamtReplace": "",
          //     "LabourCost": "10.00",
          //     "LabourCostDeduct": "",
          //     "LabourDisc": "",
          //     "TotamtOfLabour": "",
          //     "TotPrice": "",
          //     "EntryDate": "03/10/2024",
          //     "Status": "Dealer"
          //   }
          // ]
          // this.rejectedVehicleList = rejected;
          
        }
      },
      (err) => { },
    );
}
getallgarageLoginId(){
    let urlLink = `${this.CommonApiUrl}dropdown/garageLoginId`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj =[{"Code":null,"CodeDesc":"--Select--"}]
            this.GarageDropList = obj.concat(data.Result);
        }
      },
      (err) => { },
    );
}
editQuote(rowData){
    if(rowData){
      sessionStorage.setItem('CliamNo',rowData.ClaimNo);
      sessionStorage.setItem('GarageLoginId',rowData.GarageLoginId);
      sessionStorage.setItem('QuoteStatus',rowData.QuoteStatus);
      if(this.userType=="Surveyor")
        {
          sessionStorage.setItem('Completed','SurveyorPending')
      this.router.navigate(['/surveyor/workorder'])
      }
      else if(this.userType=="Dealer"){
        this.router.navigate(['/surveyor/damagedetail'])
      }
  }
}
editQuote1(CliamNo,rowData,type){
  if(rowData){
    sessionStorage.setItem('CliamNo',CliamNo)
    sessionStorage.setItem('QuotationNo',rowData.QuotationNo)
    sessionStorage.setItem('Type',type)
      this.router.navigate(['/surveyor/damagedetail'])
    
  }
}
rejectQuote(rowData){
  let ReqObj = {
    "ClaimNo": rowData,
  }

  let urlLink = `${this.CommonApiUrl}api/vehicleinfo/rejectClaim`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Response){
        this.getallVehicleList("CPTS","0",'direct')
      }
    },
    (err) => { },
  );
}
Completed(rowData,type){
if(rowData){
  // sessionStorage.setItem('CliamNo',rowData)
  // sessionStorage.setItem("Completed",type)
  this.tabIndex+=1
 // this.getallVehicleList()
  //this.router.navigate(['/surveyor/workorder'])
}
}

onCheckEndorseSelect(rowData){
  return rowData.SelectedYn=='Y';
}

 onSelectProduct(rowData,event,i){
  if(event){
      rowData.SelectedYn = 'Y';
      rowData['GarageDealer']='Dealer'
      rowData.Checked = true;
  }
  else{
      rowData.SelectedYn = 'N';
  }
}
onCheckCoverAll(){
  //this.DealerLowestList['SelectedYn']='N';
  return this.DealerLowestList.some(ele=>ele.SelectedYn=='N');
 }
 onSelectCoverAll(event){
    let value = null;
    if(event){value='Y'}
    else{value='N'}
    for(let cover of this.DealerLowestList){
      cover['SelectedYn']=value;
      cover['GarageDealer']='Dealer'
    }      
 }

 onCheckGarageSelect(rowData){
  return rowData.SelectedYn=='Y';
}

 onSelectGarageProduct(rowData,event,i){
  if(event){
      rowData.SelectedYn = 'Y';
      rowData['GarageDealer']='Garage'
      rowData.Checked = true;
  }
  else{
      rowData.SelectedYn = 'N';
  }
}
onCheckGarageCoverAll(){
  //this.DealerLowestList['SelectedYn']='N';
  return this.GarageLowestList.some(ele=>ele.SelectedYn=='N');
 }
 onSelectGarageCoverAll(event){
    let value = null;
    if(event){value='Y'}
    else{value='N'}
    for(let cover of this.GarageLowestList){
      cover['SelectedYn']=value
      cover['GarageDealer']='Garage'
    }      
 }

 save(event){
  console.log(this.DealerLowestList,"event");
  
 
  let i=0; let req:any=[];
    let selectedList = this.DealerLowestList.filter(ele=>ele.SelectedYn=='Y');
    
    for(let s of selectedList){
      
      i+=1;
      let ReqObj = {
        "ClaimNo": s.ClaimNo,
        "QuotationNo": s.QuotationNo,
        "DamageSno": s.DamageSno,
        "RepairReplace": s.RepairReplace,
        "ReplaceCostDeductPercentage": "1",
        "SparepartDeprectionPercentage": "1",
        "DiscountSparepartPercentage": "1",
        "LabourCostDeductPercentage": "1",
        "LabourDiscPercentage": "1",
        "GarageDealer": s.GarageDealer,
        "SurveyorId": this.loginId,
      }
      req.push(ReqObj);
    }
    console.log(req,"selectedList");
    let urlLink = `${this.CommonApiUrl}damage/save`;
    this.sharedService.onPostMethodSync(urlLink, req).subscribe(
        (data: any) => {
            console.log(data);
            let res:any=data;
            if(res){
              this.assignedWork();
              this.getallVehicleList(null,null,null);
             // window.location.reload();

            }
          },
          (err) => { },
        );
 }

 save1(event){
  console.log(this.DealerLowestList,"event");
  let i=0; let req:any=[];
    let selectedList = this.GarageLowestList.filter(ele=>ele.SelectedYn=='Y');
    for(let s of selectedList){
      i+=1;
      let ReqObj = {
        "ClaimNo": s.ClaimNo,
        "QuotationNo": s.QuotationNo,
        "DamageSno": s.DamageSno,
        "RepairReplace": s.RepairReplace,
        "ReplaceCostDeductPercentage": "1",
        "SparepartDeprectionPercentage": "1",
        "DiscountSparepartPercentage": "1",
        "LabourCostDeductPercentage": "1",
        "LabourDiscPercentage": "1",
        "GarageDealer": s.GarageDealer,
        "SurveyorId": this.loginId,
      }
      req.push(ReqObj);
    }
    console.log(req,"selectedList");
    let urlLink = `${this.CommonApiUrl}damage/save`;
    this.sharedService.onPostMethodSync(urlLink, req).subscribe(
        (data: any) => {
            console.log(data);
            let res:any=data;
            if(res){
              sessionStorage.setItem('CliamNo',selectedList['ClaimNo']);
              this.assignedWork();
              this.getallVehicleList(null,null,null);
             // window.location.reload();

            }
          },
          (err) => { },
        );
 }
 assignedWork(){
  //let CliamNo = sessionStorage.getItem('CliamNo');
  let ReqObj = {
    "GarageId": this.GarageDrop,
    "SurveyorId":this.loginId
  }

  let urlLink = `${this.CommonApiUrl}vehicle/surveyor/asigned/completed`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Response){
        this.WorkAssigned= data.Response;
      }
    },
    (err) => { },
  );
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
