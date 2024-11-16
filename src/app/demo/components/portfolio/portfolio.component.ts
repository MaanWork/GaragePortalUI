import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from '../../service/shared.service';
import * as Mydatas from '../../../app-config.json';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  items: MenuItem[] | undefined;
  quoteOptions: any[] = [{label: 'Quotes', value: 'quotes'}, {label: 'Endrosements', value: 'endrosements'}];
  value: string = 'quotes';
  columns:any[]=[];items2: MenuItem[];
  branches: MenuItem[] | undefined;
  searchValue:any[]=[];
  selectedBranch: MenuItem | undefined;tableView = 'table';
  userDetails:any=null;loginId:any=null;agencyCode:any=null;
  brokerbranchCode:any=null;branchCode:any=null;productId:any=null;
  userType:any=null;insuranceId:any=null;brokerCode:any=null;
  brokerList:any[]=[];totalQuoteRecords:any=null;limit:any=0;
  pageCount:any=null;quoteData:any[]=[];quotePageNo:any=null;
  startIndex:any=null;endIndex:any=null;
  totalCancelRecords:any;
  customersearch:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  cancelbrokerList: any[]=[];
  CancelbrokerCode: any;CancelledquoteData:any[]=[];
  pageCount1: number;lang:any=null;
  quotePageNo1: number;
  show: boolean = false;
  pendingBrokerList: any[]=[];
  pendingBrokerCode: any=null;
  totalPendingQuoteRecords: any;
  pagePendingCount: number;
  pendingPolicyPageNo: number;
  startPendingIndex: number;
  endPendingIndex: any;
  pendingQuoteData: any[]=[];
  MotorList: any[]=[];
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate: TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
   
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
      sessionStorage.removeItem('loadingType');
      sessionStorage.removeItem('firstLoad');
      sessionStorage.removeItem('VechileDetails');
    
   }
  ngOnInit() {
    
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);this.setHeaders();
		  });
		if(!this.lang){
      if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language')); this.setHeaders();}
    this.branches = [
      { label: 'Test', target: 'T' },
    ];
    if(this.productId=='5') this.columns = ['VehicleDetails','PolicyNo','QuoteNo','CustomerName','Currency','StartDate','EndDate','Premium','Actions']
    else this.columns = ['PolicyNo','QuoteNo','CustomerName','Currency','StartDate','EndDate','Premium','Actions']
    this.getBrokerList();
    this.getPendingList();
    this.getCancelledList();
  }
  setHeaders(){
    if(this.lang=='en'){
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Portfolio'}];
    }
    else if(this.lang=='po'){
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Portfólio'}];
    }
  }
  getBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/portfoliobrokerdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          let brokercode=sessionStorage.getItem('brokercodeendorsement');
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else if(brokercode!="" && brokercode!=null){
              this.brokerCode=brokercode;
              console.log('HHHHHHHHHH',this.brokerCode)
          }
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change');
            sessionStorage.removeItem('brokercodeendorsement');
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change');
            sessionStorage.removeItem('brokercodeendorsement');
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
      let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
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
  getPendingList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/portfoliopendingdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.pendingBrokerList = defaultObj.concat(data.Result);
          if(this.pendingBrokerList.length==0){this.pendingBrokerCode = ''; this.pendingBrokerList = []}
          else this.pendingBrokerCode = this.loginId;
          if(this.pendingBrokerCode!=null && this.pendingBrokerCode!=''){
            if(!this.pendingBrokerList.some(ele=>ele.Code==this.pendingBrokerCode)) this.pendingBrokerCode = this.pendingBrokerList[0].Code;
            this.getPendingPolicyList(null,'change')
          }
          else{
            this.pendingBrokerCode = this.pendingBrokerList[0].Code;
            this.getPendingPolicyList(null,'change')
          }
        }
      },
      (err) => { },
    );
  }
  getPendingPolicyList(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.pendingBrokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.pendingBrokerCode;
      brokerbranchCode = '';
    }
    let entry = this.pendingBrokerList.find(ele=>ele.Code==this.pendingBrokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
        if(this.userType=='Issuer'){
        loginId='';
        bdmCode=this.pendingBrokerCode;
      }
      else{
        loginId=entry.Code;
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
            "Offset": 10000
      }
      let urlLink = `${this.CommonApiUrl}api/portfolio/pending`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.PortfolioList) {
              if (data.Result?.PortfolioList.length != 0) {
                this.totalPendingQuoteRecords = data.Result?.Count;
                this.pagePendingCount = 10;
                if (entryType == 'change') {
                  this.pendingPolicyPageNo = 1;
                  let startCount = 1, endCount = this.pageCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.PortfolioList;
                    this.pendingQuoteData = data.Result?.PortfolioList;
                    if (quoteData.length <= this.pagePendingCount) {
                      endCount = quoteData.length
                    }
                    else endCount = this.pagePendingCount;
                  
                  this.startPendingIndex = startCount; this.endPendingIndex = endCount;
                }
                else {

                  let startCount = element.startCount, endCount = element.endCount;
                  this.pagePendingCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.PortfolioList;
                    this.pendingQuoteData = this.pendingQuoteData.concat(data.Result?.PortfolioList);
                  if (this.totalPendingQuoteRecords <= endCount + (element.n)) {
                    endCount = this.totalPendingQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startPendingIndex = startCount; this.endPendingIndex = endCount;
                }
              }
              else {
                this.pendingQuoteData = []; 
              }
            }
          }
        },
        (err) => { },
      );
    }
  }
  getCancelledList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/cancelpolicyportfoliodropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.cancelbrokerList = defaultObj.concat(data.Result);
          if(this.cancelbrokerList.length==0){this.CancelbrokerCode = ''; this.cancelbrokerList = []}
          else this.CancelbrokerCode = this.loginId;
          if(this.CancelbrokerCode!=null && this.CancelbrokerCode!=''){
            if(!this.cancelbrokerList.some(ele=>ele.Code==this.CancelbrokerCode)) this.CancelbrokerCode = this.cancelbrokerList[0].Code;
            this.getCancelledQuotes(null,'change');
            //this.getExistingQuotes(null,'change')
          }
          else{
            this.CancelbrokerCode = this.cancelbrokerList[0].Code;
            this.getCancelledQuotes(null,'change');
            //this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );

  }
  getPolicyItems(rowData){
    let entry:MenuItem[] =  [{
      label: 'PDF',
      items: [{
          label: 'Schedule',
          icon: 'pi pi-file-pdf',
          command: () => {
                this.onGetSchedule(rowData)
          }
      },
      {
        label: 'Debit Note',
        icon: 'pi pi-file-pdf',
        command: () => {
            this.onDebitdownload(rowData)
        }
      },
      {
        label: 'Credit Note',
        icon: 'pi pi-file-pdf',
        command: () => {
          this.onCreditdownload(rowData);
        }
      }
      ]},
      {
          label: 'Others',
          items: [{
              label: 'Endorsement',
              icon: 'pi pi-external-link',
              command: () => {
                this.onEditEndorsement(rowData)
          }
          },
          {
              label: 'View Quote Details',
              icon: 'pi pi-eye',
              command: () => {
               this.onViews(rowData);
          }
          }
      ]}
    ];
   // const hideDebitNote = true; // Set your condition here
if (rowData?.CreditNo==null && rowData.CreditNo=='') {
    entry[0].items = entry[0].items.filter(item => item.label === 'Credit Note');
}
if (rowData.DebitNoteNo==null && rowData.DebitNoteNo=='') {
  entry[0].items = entry[0].items.filter(item => item.label === 'Debit Note');
}

    // let i=0;
    // if(rowData?.CreditNo!=null && rowData.CreditNo!=''){
    //   i+=1;
    //   entry[0].items.concat(
    //     []
    //   )
    // }
    // else i+=1;
    // if(rowData.DebitNoteNo!=null && rowData.DebitNoteNo!=''){
    //   i+=1;
    //   entry[0].items.concat(
    //     []
    //   )
    //   console.log("final Concat",entry)
    // }
    // else i+=1;
    // if(i==2) return entry;
    //else return []
    return entry;
  }
  onEditEndorsement(rowData){
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    sessionStorage.setItem('endorsePolicyNo',rowData.OriginalPolicyNo);
    sessionStorage.setItem('Pagefrom','endorsement');
    sessionStorage.setItem('brokercodeendorsement',this.brokerCode);
    this.router.navigate(['/portfolio/endorsement'])
  }
  onViews(rowData){
    let ReqObj={
      "Search":"",
      "SearchValue":rowData.QuoteNo,
      "QuoteNo":rowData.QuoteNo,
      "RequestReferenceNo":rowData.RequestReferenceNo,
      "ProductId":this.productId,
      "pageFrom": 'policy',
      "CustomerName": rowData.ClientName,
      "ProductName":rowData.ProductName,
      "PolicyNo":rowData.PolicyNo,
      "Currency":rowData.Currency,
      "EmiYn":rowData?.EmiYn
    }
    sessionStorage.setItem('editCustomer',JSON.stringify(ReqObj));
    this.router.navigate(['/portfolio/motorDocuments'])
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
      // // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
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
            "Offset": 60
      }
      let urlLink = `${this.CommonApiUrl}api/portfolio/active`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.PortfolioList) {
              if (data.Result?.PortfolioList.length != 0) {
                this.totalQuoteRecords = data.Result?.Count;
                this.pageCount = 10;
                if (entryType == 'change') {
                  this.quotePageNo = 1;
                  let startCount = 1, endCount = this.pageCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.PortfolioList;
                    this.quoteData = data.Result?.PortfolioList;
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
                    let quoteData = data.Result?.PortfolioList;
                    this.quoteData = this.quoteData.concat(data.Result?.PortfolioList);
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


  getCancelledQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.CancelbrokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.CancelbrokerCode;
      brokerbranchCode = '';
    }
    let entry = this.cancelbrokerList.find(ele=>ele.Code==this.CancelbrokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      // if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      // && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
      if(this.userType=='Issuer'){
        loginId = '';
        bdmCode=this.brokerCode;
      }
      else{
        loginId=entry.Code;
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
          "Offset": 60
      }
      let urlLink = `${this.CommonApiUrl}api/portfolio/cancelled`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.PortfolioList) {
              // this.CancelledquoteData = data.Result?.PortfolioList;
              if (data.Result?.PortfolioList.length != 0) {
                this.totalCancelRecords = data.Result?.Count;
                this.pageCount1 = 10;
                if (entryType == 'change') {
                  this.quotePageNo1 = 1;
                  let startCount = 1, endCount = this.pageCount1;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.PortfolioList;
                    this.CancelledquoteData = data.Result?.PortfolioList;
                    if (quoteData.length <= this.pageCount1) {
                      endCount = quoteData.length
                    }
                    else endCount = this.pageCount;
                  
                  this.startIndex = startCount; this.endIndex = endCount;
                }
                else {

                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.PortfolioList;
                    this.CancelledquoteData = this.CancelledquoteData.concat(data.Result?.PortfolioList);
                  if (this.totalCancelRecords <= endCount + (element.n)) {
                    endCount = this.totalQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startIndex = startCount; this.endIndex = endCount;
                }
              }
              else {
                this.CancelledquoteData = []; 
              }
            }
            else {
              this.CancelledquoteData = [];
            }
          }
        },
        (err) => { },
      );
    }
  }
  onCreditdownload(rowData){
    console.log('KKKKKKKKKKK',rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','Creditpdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onDebitdownload(rowData){
    console.log('KKKKKKKKKKK',rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','DebitPdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onGetSchedule(rowData){
    let ReqObj = {
      "QuoteNo":rowData.QuoteNo
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile,'Schedule');
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }
  downloadMyFile(data,name) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download',name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  onSelectCustomer(event){
    console.log('Eventsss',event);
    
    if(event){
    this.show= true;
    this.customersearch=true;
    }
    else{
      this.show=false;
      this.customersearch=false;
    }
      }
}
