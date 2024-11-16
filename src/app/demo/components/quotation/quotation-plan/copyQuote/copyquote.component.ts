import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-copyquote',
  templateUrl: './copyquote.component.html',
  styleUrls: ['./copyquote.component.scss']
})
export class CopyQuoteComponent implements OnInit {

  searchValue:any[]=[];columnHeader:any []=[];innerColumnHeader:any []=[];
  CopyData:any[]=[];
  dob:any;
  quoteData:any []=[];customerData:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;selectedData:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;SearchList:any;
  public userDetails: any;loginId: any;agencyCode: any;branchCode: any;
  public brokerbranchCode: any;productId: any;insuranceId: any;userType: any;
  customerValue: boolean;lang:any=null;
  referenceNo: string;search:any;
  quoteno: any;
    columns: any=[];
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private translate:TranslateService,private appComp:AppComponent
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;

    this.columnHeader =  [
      { key: 'QuoteNo', display: 'Quote No' },
      { key: 'RequestReferenceNo', display: 'Reference No' },
      { key: 'ClientName', display: 'Customer Name' },

    //   {
    //     key: 'actions',
    //     display: 'Action',
    //     config: {
    //       isEdit: true,
    //     },
    //   },
    ];
    this.columnHeader =  [
      //{ key: 'Registrationnumber', display: 'Registration No' },
        //{ key: 'Vehiclemake', display: 'Make' },
        //{ key: 'Vehcilemodel', display: 'Model' },
        {
          key: 'RequestReferenceNo',
          display: 'Select',
          config: {
            select: true,
          },
        },
        {key:'QuoteNo',display:'QuoteNo'},
        { key: 'CustomerReferenceNo', display: 'Customer Reference No' },
        {key:'SectionName',display:'SectionName'},
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'CreatedBy', display: 'Created By' },

      ];

    this.getCustomersList();
   }

  ngOnInit(): void {
    let refno = sessionStorage.getItem('customerReferenceNo')
    if (refno){
      this.customerValue=true;
      this.referenceNo = refno;
    }
    console.log('RRRRRRRRRRRRRR',refno);
    this.columns = [ 'Select','QuoteNo', 'ReferenceNo', 'CustomerName','CurrencyCode'];
    //'Actions'
    this.appComp.getLanguage().subscribe((res:any)=>{  
      if(res) this.lang=res;
      else this.lang='en';
      this.translate.setDefaultLang(this.lang);this.setHeaders();
    });
    if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
      else this.lang='en';
      sessionStorage.setItem('language',this.lang)
      this.translate.setDefaultLang(sessionStorage.getItem('language'));this.setHeaders();}
  }
  setHeaders(){
    
  }
  getCustomersList(){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode":this.branchCode,
        "ProductId":this.productId,
      }
      let urlLink = `${this.CommonApiUrl}api/dropdown/copyquoteby`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
             this.SearchList = data.Result;
             //this.onCustomerSearch()

          }
        },
        (err) => { },
      );
  }
  getHeaderName(value){
    return `'CopyQuote.'+value | translate`
  }
  getDisplayName(){
		if(this.lang=='en') return 'CodeDesc';
		else return 'CodeDescLocal'
	}
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }

  onCustomerSearch(){

    if(this.search=='EntryDate'){

      let dob:any = this.datePipe.transform(this.dob, "dd/MM/yyyy");
      this.searchValue=dob;
      //this.onDateFormatInEdit(this.searchValue);
    }
    if(this.searchValue){
      this.customerData = [];
      let appId = "1", loginId = "",brokerbranchCode="";
      let createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = ""
        brokerbranchCode = null;
      }
      let ReqObj = {
        "SearchKey":this.search,
        "SearchValue": this.searchValue,
        "LoginId": loginId,
        "InsuranceId":this.insuranceId,
        "BranchCode":this.branchCode,
        //"BrokerBranchCode":this.brokerbranchCode,
        "ProductId":this.productId,
        "UserType":this.userType,
        "ApplicationId":appId

      }
      let urlLink = `${this.CommonApiUrl}api/searchmotordata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customerData=data.Result;
              //this.quoteno=data.Result.QuoteNo


          }

        },
        (err) => { },
      );
    }
  }
  onSelect(rowData,event){
    console.log("Select",event);
    if(event.checked){
      this.selectedData = rowData;
      console.log('NNNNNNNNNNN',this.selectedData.RequestReferenceNo);
    }
    else {
      this.selectedData = null;
    }
  }
  onCopyQuote(){
    let appId = "1", loginId = "",brokerbranchCode="";
    let createdBy = this.loginId;
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.loginId;
    }
    else {
      appId = this.loginId;
      loginId = ""
      brokerbranchCode = null;
    }
    let ReqObj = {
      "RequestReferenceNo": this.selectedData.RequestReferenceNo,
      //"BrokerBranchCode": this.brokerbranchCode,
      "BranchCode":this.branchCode,
      "InsuranceId": this.insuranceId,
      "LoginId":loginId,
      "UserType":this.userType,
      "ProductId":this.productId,
      "ApplicationId":appId,
      "EndtTypeId":"",
      "TypeId":"",
      "QuoteNo":""
    }
    let urlLink = `${this.CommonApiUrl}api/copyquote`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            console.log(data);
            this.CopyData=data?.Result;
            this.router.navigate(['/quotation']);
                //this.router.navigate(['/Home/existingQuotes']);
        }

      },
      (err) => { },
    );
  }


}
