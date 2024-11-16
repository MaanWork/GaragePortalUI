import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import * as Mydatas from '../../../app-config.json';
@Component({
  selector: 'app-yakeen-search',
  templateUrl: './yakeen-search.component.html',
  styleUrls: ['./yakeen-search.component.scss']
})
export class YakeenSearchComponent {
  SequenceNumber:boolean=true;
  CustomID:boolean=false;sequenceNo="666222510";
  customNumber:any="SequenceNumber";nationalityId:any='1068751948';
  dob:any="24/01/1411";mobileNo:any="0533071751";ownerShipYN:any='N';
  userDetails:any=null;loginId:any=null;userType:any=null;
  agencyCode:any=null;branchCode:any=null;countryId:any=null;
  brokerbranchCode:any=null;productId:any=null;PackageYn:any=null;
  insuranceId:any=null;issuerSection:boolean=false;
  policyPeriodExceed:boolean=false;branchValue:any=null;
  motorDetails: any=null;customerName:any=null;brokerLoginId:any=null;
  Code: any=null;customerCode:any=null;brokerCode:any=null;
  public AppConfig: any = (Mydatas as any).default;quoteData:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;startIndex:any=null;
  public customApiUrl1:any = this.AppConfig.CustomApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  constructor(private router: Router,private sharedService: SharedService){
    sessionStorage.removeItem('PageFrom')
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn= this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true; }
    else this.issuerSection = false
  }
  ongetSearchVehicle(){
    this.policyPeriodExceed = false;
    let regNo = 'TRN65656',chassisNo = '';
     let ReqObj = {
      "ReqChassisNumber":chassisNo,
      "ReqRegNumber":regNo,
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.brokerbranchCode,
      "ProductId": this.productId,
      "CreatedBy": this.loginId,
      "SavedFrom": 'WEB'
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
      this.motorDetails = data.Result;
      if(this.motorDetails.ErrorMessage!=null){
        this.policyPeriodExceed = true;
        setTimeout(() => {this.policyPeriodExceed = false;},8000);
      }
      else if(this.motorDetails.PolicyHolderInfo){
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerbranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchCode;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        sessionStorage.setItem('customerReferenceNo',this.motorDetails.PolicyHolderInfo.CustomerReferenceNo);
        sessionStorage.setItem('firstLoad','yes');
        sessionStorage.setItem('PageFrom','yakeen');
        this.router.navigate(['/Home/customer/ClientDetails']);
      }
      else{
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerbranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        this.getPolicyHolderDetails(ReqObj);
      }
      // sessionStorage.setItem('customerReferenceNo','Cust-00285');
      // sessionStorage.setItem('quoteReferenceNo','MOT-09677');
      //this.router.navigate(['/dashboardpage']);
      }
      },
      (err) => { },
    );
  }
  getPolicyHolderDetails(ReqObj){
    let urlLink = `${this.motorApiUrl}regulatory/showpolicyholder`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(data.Result.CustomerReferenceNo){
            sessionStorage.setItem('customerReferenceNo',data.Result.CustomerReferenceNo);
            sessionStorage.setItem('firstLoad','yes');
            sessionStorage.setItem('PageFrom','yakeen');
            this.router.navigate(['/customer/create']);
          }
          else{sessionStorage.setItem('firstLoad','yes');sessionStorage.setItem('PageFrom','yakeen'); this.router.navigate(['/customer/create']);}
        }
        else{sessionStorage.setItem('firstLoad','yes');sessionStorage.setItem('PageFrom','yakeen'); this.router.navigate(['/customer/create']);}
        },
        (err) => { },
      );
  }
  Change(type){
    if(type=="SequenceNumber"){
      this.SequenceNumber=true;
      this.CustomID=false;
    }
   else if(type=="CustomID"){
      this.CustomID=true;
      this.SequenceNumber=false;
    }
    
  }
}
