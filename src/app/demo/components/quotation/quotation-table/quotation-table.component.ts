import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../app-config.json';
import { formatDate } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quotation-table',
  styles:[ `.pagination{
	margin-top: 5px !important;
	padding: 3px;
	background-color: transparent !important;
	border-radius: 10px;
	box-shadow: 0 5px 25px 0 rgba(0,0,0,.5);
  }


	li{
		display: inline-block;
		list-style: none;
    }

	li	a{
        display: block;
        cursor: pointer;
        min-width: 80px;
        height: 40px;
        line-height: 40px;
        background-color: transparent !important;
        text-align: center;
        text-decoration: none;
        color: #252525;
        border-radius: 4px;
        margin: 5px;
        box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
        transition: all .3s ease;
				
    }
	li a:hover{
        color: #fff;
        background-color: #ff4242 !important
    }
	li:first-child a{
        border-radius: 40px 0 0 40px	
    }		
	li:last-child a{
        border-radius: 0 40px 40px 0
    }	`],
  templateUrl: './quotation-table.component.html',
})
export class QuotationTableComponent implements OnInit {
  items: MenuItem[] | undefined;
  columns:string[] = []; 
  quotations:any[] = []; 
  isSearchFormVisible = false;
  customerFilterSuggestions:any[] = [];
  customers:any[]=[];customerColumn:any[]=[];
  tableView = 'table';
  userDetails:any;loginId:any=null;
  agencyCode:any=null;brokerbranchCode:any=null;
  branchCode:any=null;productId:any=null;
  userType:any=null;insuranceId:any=null;
  brokerCode:any=null;brokerList:any[]=[];
  quoteData:any[]=[];limit:any=0;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorurl:any = this.AppConfig.MotorApiUrl;
  totalQuoteRecords: any=null;pageCount: any=null;quotePageNo: any=null;startIndex: any=null;endIndex: any=null;
  brokerLapsedList: any[]=[];
  brokerlapsedCode: any=null;lapsedQuoteData:any[]=[];
  totalLapsedQuoteRecords: any;
  pageLapsedCount: any=null;
  quoteLapsedPageNo: any=null;
  startLapsedIndex: any=null;
  endLapsedIndex: any=null;
  brokerRejectedList: any[]=[];
  brokerRejectedCode: string;
  totalRejectedQuoteRecords: any;
  pageRejectedCount: any=null;
  quoteRejectedPageNo: any=null;
  quoteRejectedData: any[]=[];RejectList:any[]=[];
  startRejectedIndex: any=null;quoteDataList:any[]=[];
  endRejectedIndex: any=null;selectedCustomer:any=null;
  cols:any[]=[];clearSearchSection:boolean = false;searchValue:any=[];
  quote: any=null;rejectedColumns:any[]=[]
  quotes: boolean=false;pageSize:any=5;
  Remarks: any=null;totalRecords:any=null;
  Reference: any=null;isRejectVisible:boolean=false;
  RejectdList: any;tabIndex:any=0;nextSection:boolean=true;
  remarksError: boolean=false;activePage:any=1;
  MotorList: any[]=[];
  LapsedList: any;
  sqBrokerList: any[]=[];lang:any=null;
  endCount: number;finalQuoteData:any[]=[];
  startCount: number;
  start: number;
  end: number;
  activeLapsedPage: any=1;
  startLapsedCount: number;
  endLapsedCount: any;
  constructor(private router: Router,private sharedService: SharedService,private appComp:AppComponent,
    private translate: TranslateService,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
    sessionStorage.removeItem('FinalizeYN');
    sessionStorage.removeItem('FireObj');
  }

  ngOnInit() {
    
    this.customerColumn = [ 'Select','Reference No','Customer Name',  'Customer Type','ID Number'];
    if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.columns = [ 'Vehicle Details','Quote No', 'Reference No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Premium','CurrencyCode', 'Action'];
      this.rejectedColumns = [ 'Quote No', 'Reference No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Premium','CurrencyCode','Reason'];
    }
    else{ this.columns = ['Quote No','Reference No','Customer Name','Start Date','End Date','Premium','CurrencyCode','Action'] 
    this.rejectedColumns = [ 'Quote No', 'Reference No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Premium','CurrencyCode','Reason'];
    }
    this.cols = [ 
      { field: "QuoteNo", header: "Quote No" }, 
      { field: "RequestReferenceNo", header: "Reference No" }, 
      { field: "ClientName", header: "Customer Name" }, 
    ]; 
    this.quotations = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];
    this.getBrokerList();
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));}
    // this.getLapsedBrokerList();
    // this.getRejectedBrokerList();
  }
  checkHeaderName(val){
    let name=val.replaceAll(' ','');
    return 'QUOTEGRID.'+name
  }
  onTabClicked(event){
    console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
   if(this.tabIndex==0) this.getBrokerList();
   if(this.tabIndex==1) this.getLapsedBrokerList();
   if(this.tabIndex==2) this.getRejectedBrokerList();
   if(this.tabIndex==3) this.getSQBrokerList();
  }
  
  getBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change')
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );
  }
  getSQBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.sqBrokerList = defaultObj.concat(data.Result);
          if(this.sqBrokerList.length==0){this.brokerCode = ''; this.sqBrokerList = []}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.sqBrokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.sqBrokerList[0].Code;
            this.getShortQuoteList(null,'change')
          }
          else{
            this.brokerCode = this.sqBrokerList[0].Code;
            this.getShortQuoteList(null,'change')
          }
        }
        
      },
      (err) => { },
    );
  }
  onInnerData(rowData){
    let ReqObj = {
        "RequestReferenceNo": rowData.RequestReferenceNo
      }
      let urlLink = `${this.motorurl}api/getallmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.MotorList = data.Result;
          }
        },
        (err) => { },
      );
}
onInnerDataLapsed(rowData){
  let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo
    }
    let urlLink = `${this.motorurl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.LapsedList = data.Result;
        }
      },
      (err) => { },
    );
}
  onRejects(rowData){
   console.log('rrrrrrrrr',rowData)
    this.isRejectVisible = true;
   this.RejectList=rowData;
    
   this.quote=rowData.QuoteNo;
    if(this.quote){
      this.quotes=true;
    }
    else{
      this.quotes=false
    }
    this.Reference=rowData.RequestReferenceNo



   this.Remarks=rowData.RejectReason
   //this.RejectQuote(this.Remarks,rowData)
  }
  getExistingQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerList.find(ele=>ele.Code==this.brokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if(this.userType=='Issuer'){
        loginId='';
        bdmCode=this.brokerCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":10
    }
    let urlLink = `${this.CommonApiUrl}api/existingquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetails) {
            if (data.Result?.CustomerDetails.length != 0) {
              this.totalQuoteRecords = data.Result?.TotalCount;
              this.pageCount = 5;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                 // this.quoteData = data.Result?.CustomerDetails.filter(ele=>ele.SavedFrom!='SQ');
                 this.quoteData = data.Result?.CustomerDetails;
                  this.quoteDataList = data.Result?.CustomerDetails;
                  if (quoteData.length <= this.pageCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;
                
                this.startIndex = startCount; this.endIndex = endCount;
                this.splitToNChunks(this.quoteData,this.pageCount,'first','direct')
              }
              else {

                let startCount = element.startCount, endCount = element.endCount;
                this.pageCount = element.n;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = this.quoteData.concat(data.Result?.CustomerDetails);
                if (this.totalQuoteRecords <= endCount + (element.n)) {
                  endCount = this.totalQuoteRecords
                }
                else endCount = endCount + (element.n);
                this.startIndex = startCount; this.endIndex = endCount;
              }
            }
            else {
              this.quoteData = []; 
            }
          }
        }
      },
      (err) => { },
    );
    }
  }
  onNextPage(){
    if((this.endCount==5 && this.quoteData.length<=10) || (this.endCount==15 && this.quoteData.length<=20) || (this.endCount==25 && this.quoteData.length<=30) || (this.endCount==35 && this.quoteData.length<=40) || (this.endCount==45 && this.quoteData.length<=50) || (this.endCount==55 && this.quoteData.length<=60)  || (this.endCount==65 && this.quoteData.length<=70) ||
     (this.endCount==75 && this.quoteData.length<=80) || (this.endCount==85 && this.quoteData.length<=90) || (this.endCount==95 && this.quoteData.length<=100) || (this.endCount==105 && this.quoteData.length<=110) || (this.endCount==115 && this.quoteData.length<=120) || (this.endCount==125 && this.quoteData.length<=130) || (this.endCount==135 && this.quoteData.length<=140) || (this.endCount==145 && this.quoteData.length<=150) || (this.endCount==155 && this.quoteData.length<=160)
     || (this.endCount==155 && this.quoteData.length<=160) || (this.endCount==165 && this.quoteData.length<=170) || (this.endCount==175 && this.quoteData.length<=180) || (this.endCount==185 && this.quoteData.length<=190) || (this.endCount==195 && this.quoteData.length<=200)
     || (this.endCount==205 && this.quoteData.length<=210) || (this.endCount==215 && this.quoteData.length<=220) || (this.endCount==225 && this.quoteData.length<=230) || (this.endCount==235 && this.quoteData.length<=240) || (this.endCount==245 && this.quoteData.length<=250)){
      if(this.quoteData.length!=this.totalQuoteRecords){
        sessionStorage.setItem('loadingType','disable');
        this.activePage+=1;
        let obj = {
          'activePage':this.activePage,
          'startCount': this.startCount,
          'endCount': this.endCount,
          'n':this.pageCount
        }
        this.onNextData(obj);
        this.splitToNChunks(this.quoteData,this.pageCount,'direct','next') 
        this.nextSection = true;
      }
      else{
        this.nextSection = true;
        this.splitToNChunks(this.quoteData,this.pageCount,'direct','next') 
      }
    }
    else{
        this.nextSection = true;
       this.splitToNChunks(this.quoteData,this.pageCount,'direct','next') 
    }
  }
  splitLapsedToNChunks(array, n,type,btnType) {
    var PageOfItems:any[]=[];
      if(this.activeLapsedPage==1 && btnType=='direct'){
        PageOfItems = array.slice(0,n);
        this.nextSection = true;
        this.startLapsedCount = 1;
        if(this.totalQuoteRecords<=n){
          this.endLapsedCount = this.totalQuoteRecords;
        }
        else this.endLapsedCount = n;
      }
      else{
        if(btnType=='next' || btnType=='direct'){
          this.nextSection = true;
          if(type=='direct'){
            this.startCount = this.endCount+1;
            if(Number(this.totalQuoteRecords)<=Number(this.endCount)+(Number(n))){
              console.log("Final Entered 1",this.endCount,this.totalQuoteRecords,n)
                  this.endCount = Number(this.totalQuoteRecords)
                  
            }
            else{this.endCount = Number(this.endCount)+(Number(n)); console.log("Final Entered 2",this.endCount)}
          }
          else{
            this.startCount = this.start;this.endCount = this.end;
          }
        }
        else{
          this.nextSection = true;
          if(this.endCount == Number(this.totalQuoteRecords)){
            this.endCount = this.startCount-1;
            this.startCount = this.startCount-n;
          }
          else{
            this.startCount = this.startCount-n;
            this.endCount = this.endCount-(n);
          }
        }
        
        let startCount = 0,endCount=0;
        PageOfItems = array.slice(this.startCount-1,this.endCount);
        console.log("Final Page List",this.activePage,this.startCount,this.endCount,this.startCount-1,this.endCount-1,startCount,endCount)
      }
      this.finalQuoteData = PageOfItems;
  }
  splitToNChunks(array, n,type,btnType) {
    var PageOfItems:any[]=[];
      if(this.activePage==1 && btnType=='direct'){
        PageOfItems = array.slice(0,n);
        this.nextSection = true;
        this.startCount = 1;
        if(this.totalQuoteRecords<=n){
          this.endCount = this.totalQuoteRecords;
        }
        else this.endCount = n;
      }
      else{
        if(btnType=='next' || btnType=='direct'){
          this.nextSection = true;
          if(type=='direct'){
            this.startCount = this.endCount+1;
            if(Number(this.totalQuoteRecords)<=Number(this.endCount)+(Number(n))){
              console.log("Final Entered 1",this.endCount,this.totalQuoteRecords,n)
                  this.endCount = Number(this.totalQuoteRecords)
                  
            }
            else{this.endCount = Number(this.endCount)+(Number(n)); console.log("Final Entered 2",this.endCount)}
          }
          else{
            this.startCount = this.start;this.endCount = this.end;
          }
        }
        else{
          this.nextSection = true;
          if(this.endCount == Number(this.totalQuoteRecords)){
            this.endCount = this.startCount-1;
            this.startCount = this.startCount-n;
          }
          else{
            this.startCount = this.startCount-n;
            this.endCount = this.endCount-(n);
          }
        }
        
        let startCount = 0,endCount=0;
        PageOfItems = array.slice(this.startCount-1,this.endCount);
        console.log("Final Page List",this.activePage,this.startCount,this.endCount,this.startCount-1,this.endCount-1,startCount,endCount)
      }
      this.finalQuoteData = PageOfItems;
  }
  onPreviousPage(){
    // if(this.startCount==61 || this.startCount == 121 || this.startCount==181 || this.startCount == 241 || this.startCount==301 || this.startCount==361  || this.startCount==421){
      
    //   let obj = {
    //     'activePage':this.activePage,
    //     'startCount': this.startCount-this.pageCount-this.pageCount,
    //     'endCount': this.endCount-this.pageCount-this.pageCount,
    //     'n':this.pageCount
    //   }
    //   this.onLoadPreviousData.emit(obj);
    // }
    // else{
      this.nextSection = true;
        if(this.startCount==61 || this.startCount == 121 || this.startCount==181 || this.startCount == 241 || this.startCount==301 || this.startCount==361  || this.startCount==421){
          this.activePage-=1;
          this.splitToNChunks(this.quoteData,this.pageCount,'direct','previous');
        }
        else{
          this.splitToNChunks(this.quoteData,this.pageCount,'direct','previous');
        }
    //}
    
  }
  checkDataIndex(){
    return ((this.endCount<this.totalQuoteRecords && this.endCount<this.quoteData.length) && this.nextSection)
  }
  onNextData(element){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount
    this.getExistingQuotes(element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getExistingQuotes(element,'direct');
  }
  getShortQuoteList(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerList.find(ele=>ele.Code==this.brokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      //if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      //&& entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if(this.userType=='Issuer'){
        loginId='';
        bdmCode=this.brokerCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":1000
    }
    let urlLink = `${this.CommonApiUrl}api/sqexistingquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetails) {
            if (data.Result?.CustomerDetails.length != 0) {
              this.totalQuoteRecords = data.Result?.TotalCount;
              this.pageCount = 10;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = data.Result?.CustomerDetails;
                  this.quoteDataList = data.Result?.CustomerDetails;
                  if (quoteData.length <= this.pageCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;
                
                this.startIndex = startCount; this.endIndex = endCount;
              }
              else {

                let startCount = element.startCount, endCount = element.endCount;
                this.pageCount = element.n;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = this.quoteData.concat(data.Result?.CustomerDetails);
                if (this.totalQuoteRecords <= endCount + (element.n)) {
                  endCount = this.totalQuoteRecords
                }
                else endCount = endCount + (element.n);
                this.startIndex = startCount; this.endIndex = endCount;
              }
            }
            else {
              this.quoteData = []; 
            }
          }
        }
      },
      (err) => { },
    );
    }
  }
  RejectQuote(){
    if(this.Remarks!=null && this.Remarks!=undefined){
      this.remarksError = false;
      let ReqObj = {
        "RequestReferenceNo": this.Reference,
        "LoginId":this.loginId,
        "ProductId":this.productId,
        "Status":"R",
        "RejectReason": this.Remarks
  
      }
      let urlLink = `${this.CommonApiUrl}quote/updatestatus`;
      
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this. RejectdList = data.Result;
            console.log('RRRR',this. RejectList);
            this.isRejectVisible = false;
            this.getRejectedBrokerList();
            this.tabIndex= 2;
          }
        },
        (err) => { },
      );
    }
    else this.remarksError = true;
    
  }
  getLapsedBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdownlapsed`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = []
        this.brokerLapsedList = defaultObj.concat(data.Result);
        if(this.brokerLapsedList.length==0){this.brokerlapsedCode = ''; this.brokerLapsedList = []}
        else this.brokerlapsedCode = this.loginId;
        if(this.brokerlapsedCode!=null && this.brokerlapsedCode!=''){
          if(!this.brokerLapsedList.some(ele=>ele.Code==this.brokerlapsedCode)) this.brokerlapsedCode = this.brokerLapsedList[0].Code;
          this.getLapsedQuotes(null,'change')
        }
        else{
          this.brokerlapsedCode = this.brokerLapsedList[0].Code;
          this.getLapsedQuotes(null,'change')
        }
        
      },
      (err) => { },
    );
  }
  getLapsedQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerlapsedCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerLapsedList.find(ele=>ele.Code==this.brokerlapsedCode);
    if(entry){
      console.log("Entry Received",entry) 
      //if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      //&& entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if(this.userType=='Issuer'){
        loginId='';
        bdmCode=this.brokerlapsedCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":1000
      }
      let urlLink = `${this.CommonApiUrl}api/lapsedquotedetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.CustomerDetails) {
              if (data.Result?.CustomerDetails.length != 0) {
                this.totalLapsedQuoteRecords = data.Result?.TotalCount;
                this.pageLapsedCount = 10;
                if (entryType == 'change') {
                  this.quoteLapsedPageNo = 1;
                  let startCount = 1, endCount = this.pageLapsedCount;
                  startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.lapsedQuoteData = data.Result?.CustomerDetails;
                  if (quoteData.length <= this.pageLapsedCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageLapsedCount;
                  this.startLapsedIndex = startCount; this.endLapsedIndex = endCount;
                  this.splitToNChunks(this.quoteData,this.pageCount,'first','direct')
                }
                else {
                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageLapsedCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.CustomerDetails;
                    this.lapsedQuoteData = this.lapsedQuoteData.concat(data.Result?.CustomerDetails);
                    if (this.totalLapsedQuoteRecords <= endCount + (element.n)) {
                      endCount = this.totalLapsedQuoteRecords
                    }
                    else endCount = endCount + (element.n);
                    this.startLapsedIndex = startCount; this.endLapsedIndex = endCount;
                }
              }
              else {
                this.lapsedQuoteData = []; 
              }
            }
          }
        },
        (err) => { },
      );
    }
  }
  getRejectedBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdownrejected`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerRejectedList = defaultObj.concat(data.Result);
          if(this.brokerRejectedList.length==0){this.brokerRejectedCode = ''; this.brokerRejectedList = []}
          else this.brokerRejectedCode = this.loginId;
          if(this.brokerRejectedCode!=null && this.brokerRejectedCode!=''){
            if(!this.brokerRejectedList.some(ele=>ele.Code==this.brokerRejectedCode)) this.brokerRejectedCode = this.brokerRejectedList[0].Code;
            this.getRejectedQuotes(null,'change')
          }
          else{
            if(this.brokerRejectedList.length!=0){
              this.brokerRejectedCode = this.brokerRejectedList[0].Code;
              this.getRejectedQuotes(null,'change')
            }
          }
        }
        
      },
      (err) => { },
    );
  }
  getRejectedQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerRejectedCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerRejectedCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerRejectedList.find(ele=>ele.Code==this.brokerRejectedCode);
    if(entry){
      console.log("Entry Received",entry) 
      // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if(this.userType=='Issuer'){
        loginId='';
        bdmCode=this.brokerRejectedCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":60
      }
      let urlLink = `${this.CommonApiUrl}api/rejectedquotedetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.CustomerDetails) {
              if (data.Result?.CustomerDetails.length != 0) {
                this.totalRejectedQuoteRecords = data.Result?.TotalCount;
                this.pageRejectedCount = 10;
                if (entryType == 'change') {
                  this.quoteRejectedPageNo = 1;
                  let startCount = 1, endCount = this.pageRejectedCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.CustomerDetails;
                    this.quoteRejectedData = data.Result?.CustomerDetails;
                    if (quoteData.length <= this.pageRejectedCount) {
                      endCount = quoteData.length
                    }
                    else endCount = this.pageRejectedCount;
                  
                  this.startRejectedIndex = startCount; this.endRejectedIndex = endCount;
                }
                else {

                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageRejectedCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.CustomerDetails;
                    this.quoteRejectedData = this.quoteRejectedData.concat(data.Result?.CustomerDetails);
                  if (this.totalRejectedQuoteRecords <= endCount + (element.n)) {
                    endCount = this.totalRejectedQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startRejectedIndex = startCount; this.endRejectedIndex = endCount;
                }
              }
              else {
                this.quoteRejectedData = []; 
              }
            }
          }
        },
        (err) => { },
      );
    }
  }
  onCustomerSearch(){
    if(this.searchValue){
      this.customers = [];
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "SearchValue":this.searchValue,
        "CreatedBy": ""
      }
      let urlLink = `${this.CommonApiUrl}api/searchcustomerdata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customers=data.Result;
              this.clearSearchSection = true;
          }
        },
        (err) => { },
      );
    }
  }
  onSelectCustomer(rowData){
    this.selectedCustomer = rowData.CustomerReferenceNo;
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
  }
  showSearchForm(type) {
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('endorsePolicyNo');
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
   
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "InsuranceId":this.insuranceId,
        "ProductId": this.productId,
        "CreatedBy":this.loginId,
        "BranchCode":this.branchCode,
        "UserType": this.userType,
        "Limit":"0",
        "Offset":"1000"
    }
    let urlLink = `${this.CommonApiUrl}api/getactivecustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customers = data?.Result;
            this.clearSearchSection = false;
            this.searchValue = [];
            this.isSearchFormVisible = true;
        }
      });
    
    
  }
  onEditQuotes(rowData){
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('homeCommonDetails');
    sessionStorage.setItem('Pagefrom',"Existing");
    if(this.productId){
      
      if(rowData.QuoteNo!='' && rowData.QuoteNo!=undefined && rowData.QuoteNo!=null){
        this.checkStatus(rowData);
      }
      else{
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
        sessionStorage.removeItem('quoteNo');
        if(this.productId=='5'){
          if(rowData.SavedFrom){
            if(rowData.SavedFrom=='SQ'){
              this.router.navigate(['/quotation/plan/shortQuote']);
            }
            else this.router.navigate(['/policyDetails']);
          }
          else this.router.navigate(['/policyDetails']);
        }
        else{
          this.router.navigate(['/quotation/plan/quote-details']);
        }
        
      }
      // if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
      
      //     sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
      //     sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
      //     sessionStorage.setItem('quoteNo',rowData.QuoteNo);
      //     sessionStorage.setItem('updatebar',rowData.QuoteNo);
      //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        

      // }
      // else{
      //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
      //   if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
      //   sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
      //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
      //   sessionStorage.removeItem('quoteNo');
      //   this.router.navigate(['/policyDetails']);
      // }
    }
    // if(this.productId=='4'){
    //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
    //   sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    //   this.router.navigate(['/Travel/customerDetails']);
    // }


  }
  checkStatus(rowData){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${rowData.QuoteNo}`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.result=='FAIL'){
          let date = rowData.PolicyStartDate;
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
          let date2 = null;
          if(date!='' && date !=null){
            if(date.split('/').length>1){
              let dates = date.split('/')
              date2 = dates[2]+'-'+dates[1]+'-'+dates[0]
            }
          } 
          if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
              sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
              sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
              sessionStorage.setItem('quoteNo',rowData.QuoteNo);
              sessionStorage.setItem('updatebar',rowData.QuoteNo);
              //if(this.productId=='5'){
                this.router.navigate(['/quotation/plan/premium-details']);
              // }
              // else{
              //   this.router.navigate(['/quotation/plan/quote-details']);
              // }
          }
          else{
            sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
            if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
            sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
            sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
            sessionStorage.removeItem('quoteNo');
            if(this.productId=='5'){
              this.router.navigate(['/policyDetails']);
            }
            else{
              this.router.navigate(['/quotation/plan/quote-details']);
            }
          }
        }
        else{
            sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
              sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
              sessionStorage.setItem('quoteNo',rowData.QuoteNo);
              if(this.productId=='5'){
                this.router.navigate(['/policyDetails']);
              }
              else{
                this.router.navigate(['/quotation/plan/quote-details']);
              }
        }
      })

  }
  hideSearchForm() {
    this.isSearchFormVisible = false;
    this.selectedCustomer=null;
  }

  navigateToCustomerDetail() {
    sessionStorage.setItem('customerReferenceNo',this.selectedCustomer);
    if(this.productId=='5'){
      this.router.navigate(['/policyDetails']);
    }
    else{
      this.router.navigate(['/quotation/plan/quote-details'])
    }
  }

  customerSearch(event) {
    this.customerFilterSuggestions = [{'name':'Customer 1'}, {'name':'Customer 2'}];
  }
  onSms(rowData,modal){
    this.router.navigate(['/Home/Sms']);
   let quoteObj = {
    "RequestReferenceNo": rowData.RequestReferenceNo,
    "open":"false"
    //"QuoteNo":rowData.QuoteNo
  }
  sessionStorage.setItem('Details',JSON.stringify(quoteObj));

  }
  lapsedAction(rowData){
    let ReqObj = {
      
      "RequestReferenceNo": rowData?.RequestReferenceNo,
      "LoginId":this.loginId,
      "ProductId":this.productId,
      "Status":"R",
      "RejectReason": "none"//rowData?.RejectReason
    
    }
    let urlLink = `${this.CommonApiUrl}quote/updatestatus`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data.Result);
        
  })
}
onFollowup(rowData){
  console.log('QQQQQQQQQQQQQQQQ',rowData);
  let quoteObj = {
   "RequestReferenceNo": rowData.RequestReferenceNo,
   "QuoteNo":rowData.QuoteNo,
   "CustomerName":rowData.ClientName,
   "ProductId":this.productId,
   "StartDate":rowData.PolicyStartDate,
   "EndDate":rowData.PolicyEndDate
   //"QuoteNo":rowData.QuoteNo
 }
 sessionStorage.setItem('FollowUpDetails',JSON.stringify(quoteObj));
 this.router.navigate(['/Home/Followup']);
}

onMail(rowData,modal){
 
   this.router.navigate(['/Home/Mail']);
   let quoteObj = {
    "RequestReferenceNo": rowData.RequestReferenceNo,
    "open":"false"
    //"QuoteNo":rowData.QuoteNo
  }
  sessionStorage.setItem('Details',JSON.stringify(quoteObj));
  }
}