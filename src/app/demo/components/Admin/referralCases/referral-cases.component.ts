import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-referral-cases',
  templateUrl: './referral-cases.component.html',
  providers: [MessageService]
})
export class ReferralCasesComponent implements OnInit {
  items: MenuItem[] | undefined;
  quoteOptions: any[] = [{label: 'Quotes', value: 'quotes'}, {label: 'Endrosements', value: 'endrosements'}];
  value: string = 'quotes';
  branches: MenuItem[] | undefined;
  selectedBranch: MenuItem | undefined;
  tableActions:MenuItem[] | undefined;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails:any;loginId:any=null;
  agencyCode:any=null;brokerbranchCode:any=null;
  branchCode:any=null;productId:any=null;
  userType:any=null;insuranceId:any=null;
  brokerCode:any=null;brokerList:any[]=[];
  quoteData:any[]=[];
  ApprovedquoteData:any[]=[];
  limit:any=0;totalQuoteRecords: any=null;
  pageCount: any=null;
  quotePageNo: any=null;
  startIndex: any=null;
  endIndex: any=null;
  section: any='quote';
  columns:string[] = [];
  columnss:string[] = [];
  ApproveredList:any[]=[];
  tableView = 'table'; 
  ApproverbrokerCode: any;
  Rejecedbrokercode: any;
  RejectedList: any[];RejectedquoteData:any[]=[];
  
  constructor(private router: Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;

  }
  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Referral'}];
    this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}];
    this.branches = [
      { label: 'Test', target: 'T' },
    ];
    //if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.columns = ['ReferenceNo','Customer Name','Start Date','End Date','Actions'];
      this.columnss = ['ReferenceNo','Customer Name','Start Date','End Date']
    //}
    this.getBrokerList();
    this.getApprovedList();
    this.getRejectedList();
  }


  getBrokerList(){
    let type=null;
    if(this.section=='quote'){type='Q'}
    else type='E';
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
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
      "BranchCode": this.branchCode,
      "Type": type
    }
    let urlLink = `${this.CommonApiUrl}api/adminreferralpendingsdropdown`;
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
  getExistingQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    if(element==null){ this.quoteData=[];}
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null,SourceType=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
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
       if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
       && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
          bdmCode=this.brokerCode;
          loginId=null;
      }
      else{
        bdmCode=null;
        loginId=this.brokerCode;
      }
      SourceType = entry.Type
      let type=null;
      if(this.section=='quote'){type='Q'}
      else type='E';
      let ReqObj = {
          "BranchCode":this.branchCode,
            "InsuranceId": this.insuranceId,
            "LoginId":loginId,
            "ApplicationId":appId,
            "UserType":this.userType,
            "SubUserType":sessionStorage.getItem('typeValue'),
            "SourceType":SourceType,
            "BdmCode": bdmCode,
            "ProductId":this.productId,
            "Type":type,
            "Limit":this.limit,
            "Offset": 60
      }
    let urlLink = `${this.CommonApiUrl}api/adminreferralpending`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetailsRes) {
            if (data.Result?.CustomerDetailsRes.length != 0) {
              this.totalQuoteRecords = data.Result?.TotalCount;
              this.pageCount = 10;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.quoteData = data.Result?.CustomerDetailsRes;
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
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.quoteData = this.quoteData.concat(data.Result?.CustomerDetailsRes);
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

  getApprovedList(){
    let type='Q';
    // if(this.section=='quote'){type='Q'}
    // else type='E';
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
      "BranchCode": this.branchCode,
      "Type": type
    }
    let urlLink = `${this.CommonApiUrl}api/adminreferralapprovedropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.ApproveredList = defaultObj.concat(data.Result);
          if(this.ApproveredList.length==0){this.ApproverbrokerCode = ''; this.ApproveredList = []}
          else this.ApproverbrokerCode = this.loginId;
          if(this.ApproverbrokerCode!=null && this.ApproverbrokerCode!=''){
            if(!this.ApproveredList.some(ele=>ele.Code==this.ApproverbrokerCode)) this.ApproverbrokerCode = this.ApproveredList[0].Code;
            //this.getExistingQuotes(null,'change')
            this.getApprovedQuotes(null,'change');
          }
          else{
            this.ApproverbrokerCode = this.brokerList[0].Code;
            this.getApprovedQuotes(null,'change');
            //this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );
  }


  getApprovedQuotes(element,entryType){
    
    if(element==null) this.ApprovedquoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.ApproverbrokerCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.ApproverbrokerCode;
      brokerbranchCode = '';
    }
    let entry = this.ApproveredList.find(ele=>ele.Code==this.ApproverbrokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
        && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
           bdmCode=this.ApproverbrokerCode;
           loginId=null;
       }
       else{
         bdmCode=null;
         loginId=this.ApproverbrokerCode;
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
          "Limit":0,
          "Type":'Q',
          "Offset":1000
    }
    let urlLink = `${this.CommonApiUrl}api/adminreferralapproved`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetailsRes) {
           this.ApprovedquoteData = data.Result?.CustomerDetailsRes
          }
          else {
            this.ApprovedquoteData = []; 
          }
        }
      },
      (err) => { },
    );
    }
  }


  getRejectedList(){
    let type='Q';
    // if(this.section=='quote'){type='Q'}
    // else type='E';
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
      "BranchCode": this.branchCode,
      "Type": type
    }
    let urlLink = `${this.CommonApiUrl}api/adminreferralrejectropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.RejectedList = defaultObj.concat(data.Result);
          if(this.RejectedList.length==0){this.Rejecedbrokercode = ''; this.RejectedList = []}
          else this.Rejecedbrokercode = this.loginId;
          if(this.Rejecedbrokercode!=null && this.Rejecedbrokercode!=''){
            if(!this.RejectedList.some(ele=>ele.Code==this.Rejecedbrokercode)) this.Rejecedbrokercode = this.RejectedList[0].Code;
            this.getRejectedQuotes(null,'change');
            //this.getExistingQuotes(null,'change')
          }
          else{
            if(this.RejectedList.length!=0){
              this.Rejecedbrokercode = this.RejectedList[0].Code;
              this.getRejectedQuotes(null,'change');
            }
            
          }
        }
        
      },
      (err) => { },
    );
  }
  getRejectedQuotes(element,entryType){
    if(element==null) this.RejectedquoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.Rejecedbrokercode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.Rejecedbrokercode;
      brokerbranchCode = '';
    }
    let entry = this.RejectedList.find(ele=>ele.Code==this.Rejecedbrokercode);
    if(entry){
      console.log("Entry Received",entry) 
      if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
        && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
           bdmCode=this.Rejecedbrokercode;
           loginId=null;
       }
       else{
         bdmCode=null;
         loginId=this.Rejecedbrokercode;
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
        "Limit":0,
        "Type":'Q',
        "Offset":1000
  }
    let urlLink = `${this.CommonApiUrl}api/adminreferralrejected`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetailsRes) {
            this.RejectedquoteData = data.Result?.CustomerDetailsRes;
            // if (data.Result?.CustomerDetailsRes.length != 0) {
            //   this.totalQuoteRecords = data.Result?.TotalCount;
            //   this.pageCount = 10;
            //   if (entryType == 'change') {
            //     this.quotePageNo = 1;
            //     let startCount = 1, endCount = this.pageCount;
            //     startCount = endCount + 1;
            //       let quoteData = data.Result?.CustomerDetailsRes;
            //       this.quoteData = data.Result?.CustomerDetailsRes;
            //       if (quoteData.length <= this.pageCount) {
            //         endCount = quoteData.length
            //       }
            //       else endCount = this.pageCount;
                
            //     this.startIndex = startCount; this.endIndex = endCount;
            //   }
            //   else {

            //     let startCount = element.startCount, endCount = element.endCount;
            //     this.pageCount = element.n;
            //     startCount = endCount + 1;
            //       let quoteData = data.Result?.CustomerDetailsRes;
            //       this.quoteData = this.quoteData.concat(data.Result?.CustomerDetailsRes);
            //     if (this.totalQuoteRecords <= endCount + (element.n)) {
            //       endCount = this.totalQuoteRecords
            //     }
            //     else endCount = endCount + (element.n);
            //     this.startIndex = startCount; this.endIndex = endCount;
            //   }
            // }
            // else {
            //   this.quoteData = []; 
            // }
          }
          else{
            this.RejectedquoteData = [];
          }
        }
      },
      (err) => { },
    );
    }
  }
  onEditQuotes(rowData){
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.setItem('QuoteStatus','AdminRP');
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    sessionStorage.removeItem('vehicleDetailsList')
    this.router.navigate(['quotation/plan/premium-info']);
  }
}
