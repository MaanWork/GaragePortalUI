import { Component } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-fnol-listing',
  templateUrl: './fnol-listing.component.html',
  styleUrls: ['./fnol-listing.component.scss']
})
export class FnolListingComponent {
  userDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;
  agencyCode: any;
  branchCode: any;
  productId: any;
  CompanyId: any;
  userType: any;
  CliamNo: string;
  brokerbranchCode: any;
  lang: any;
  tabIndex:any='0';
  columns: any[]=[];
  public form = new FormGroup({}); 
  fnolList: any[]=[];
  policyNumber: any='';
  startDate: any=null;
  endDate: any=null;;
  constructor(private router:Router,private sharedService: SharedService,
    private appComp:AppComponent,private translate:TranslateService,private datePipe:DatePipe) {
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
        //this.setHeaders()
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
      //this.setHeaders();
    }
    
  }

  searchFonl(){
    let startDate=null,endDate=null;
    if (this.startDate != undefined && this.startDate != null && this.startDate != '') {
      if(String(this.startDate).includes('/')){
        startDate = this.startDate;
      }
      else startDate = this.datePipe.transform(this.startDate,'dd/MM/yyyy');
     // this.manufactureYear = this.RegistrationDate.getFullYear();
    }
    if (this.endDate != undefined && this.endDate != null && this.endDate != '') {
      if(String(this.endDate).includes('/')){
        endDate = this.endDate;
      }
      else endDate = this.datePipe.transform(this.endDate,'dd/MM/yyyy');
     // this.manufactureYear = this.RegistrationDate.getFullYear();
    }
    let ReqObj = {
        "LobCode": "10",
        "ProdCode": "1101",
        "PolicyNumber": this.policyNumber,
        "ClaimNotificationNumber": "",
        "CreatedBy": "BASE.U",
        "ClaimNotificationFromDate": "",
        "ClaimNotificationToDate": "",
        "ClaimLossFromDate": startDate,
        "ClaimLossToDate": endDate,
        "RequestMetaData": {
            "RequestOrigin": "API",
            "CurrentBranch": "2222",
            "OriginBranch": "2222",
            "UserName": "BASE.U",
            "IpAddress": "",
            "RequestGeneratedDateTime": "19/06/2024",
            "ConsumerTrackingID": "101"
        }
    }
        
    // {
    //   "LobCode": "string",
    //   "ProdCode": "string",
    //   "PolicyNumber": this.policyNumber,
    //   "ClaimNotificationNumber": "string",
    //   "CreatedBy": "string",
    //   "ClaimNotificationFromDate": "2024-11-05T07:22:28.262Z",
    //   "ClaimNotificationToDate": "2024-11-05T07:22:28.262Z",
    //   "ClaimLossFromDate": this.startDate,
    //   "ClaimLossToDate": this.endDate,
    //   "RequestMetaData": {
    //     "ConsumerTrackingID": "string",
    //     "CurrentBranch": "string",
    //     "IpAddress": "string",
    //     "OriginBranch": "string",
    //     "RequestData": "string",
    //     "RequestGeneratedDateTime": "2024-11-05T07:22:28.262Z",
    //     "RequestId": "string",
    //     "RequestOrigin": "string",
    //     "RequestReference": "string",
    //     "RequestedService": "string",
    //     "ResponseData": "string",
    //     "SourceCode": "string",
    //     "UserName": "string"
    //   }
    // }
      let urlLink = `${this.CommonApiUrl}fnol/claimListing`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Response.data){
            this.fnolList = data.Response.data;
          }
        },
        (err) => { },
      );
  }

}
