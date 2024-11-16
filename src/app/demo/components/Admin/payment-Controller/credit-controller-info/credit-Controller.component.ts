import { DatePipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-credit-controller',
  templateUrl: './credit-controller.component.html',
  styleUrls: ['./credit-controller.component.scss']
})
export class CreditControllerInfoComponent implements OnInit{
  
  Sno: any;  public AppConfig: any = (Mydatas as any).default;
  public ReInsurance: any = this.AppConfig.ReInsurance;
  insuranceName: string;quoteDetails:any=null;
  insuranceId: string;quoteNo:any=null;
  userDetails: any;remarks:any=null;
  UserType: any;statusValue:any='CCP';
  ProductId: any;statusList:any[]=[];
  loginId: any;paymentId:any=null;remarksError:boolean=false;
  columnHeader: any[]=[];pendingList:any[]=[];productId:any=null;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;brokerbranchCode:any=null;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;PackageYn:any=null;
  riskDetails: any=null;userType:any=null;agencyCode:any=null;branchList:any[]=[];
  customerDetails: any;branchCode:any=null;countryId:any=null;mainStatus=null
  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.countryId = this.userDetails.Result.CountryId;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.PackageYn= this.userDetails.Result.PackageYn
      this.insuranceId = this.userDetails.Result.InsuranceId;
      this.branchList = this.userDetails.Result.LoginBranchDetails;
      this.paymentId = sessionStorage.getItem('PaymentId');
      let status =sessionStorage.getItem('controllerType');
      this.mainStatus = status;
      if(status=='CCP') this.statusValue='P';
      else if(status=='CCA') this.statusValue='Y';
      else if(status=='CCR') this.statusValue = 'R'; 
        this.statusList = [
          {"Code":"P","CodeDesc":"Pending"},
          {"Code":"Y","CodeDesc":"Accepted"},
          {"Code":"R","CodeDesc":"Rejected"}
        ];
     }
  ngOnInit(): void {
    let quoteNo = sessionStorage.getItem('quoteNo')
    if(quoteNo){
      this.quoteNo = quoteNo;
      this.getQuoteDetails(quoteNo);
    }
    this.columnHeader =[
      'QuoteNo',"Customer Name","Payment Type","Policy Start Date","Policy End Date","Mobile No","Premium","Action"
    ]
  }
  getQuoteDetails(quoteNo){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl1}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
              this.quoteDetails = data.Result.QuoteDetails;
              this.riskDetails = data.Result.RiskDetails;
              this.customerDetails = data.Result.CustomerDetails;
          }
        })
  }
  onUpdateStatus(){
    if(this.remarks==null || this.remarks=='') this.remarksError = true;
    else{this.remarksError=false;
      let ReqObj = {
        "Status" : this.statusValue,	
         "QuoteNo" : this.quoteNo,
         "Remarks" : this.remarks,
          "Type": 'creditcontroller',
          "InsuranceId" : this.insuranceId,
          "PaymentId": this.paymentId,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode
      }
      let urlLink = `${this.CommonApiUrl1}paymentprocess/save`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            sessionStorage.removeItem('PaymentId');
            sessionStorage.removeItem('quoteNo');
            this.router.navigate(['Home/credit-controller']);
          }
        })
    }
  }
  getBack(){
    sessionStorage.removeItem('PaymentId');
    sessionStorage.removeItem('quoteNo');
    this.router.navigate(['Home/credit-controller']);
  }
}