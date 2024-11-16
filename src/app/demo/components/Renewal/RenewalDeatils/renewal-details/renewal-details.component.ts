import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-renewal-details',
  templateUrl: './renewal-details.component.html',
  styleUrls: ['./renewal-details.component.scss']
})
export class RenewalDetailsComponent {
  items: MenuItem[] | undefined;
  startdate: any; branchValue: any;
  public quoteData: any[] = []; innerColumnHeader: any[] = []; customerData: any[] = [];
  userDetails: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  countryId: any;
  brokerbranchCode: any;
  productId: any;
  PackageYn: any;
  insuranceId: any;
  branchList: any;
  updateComponent: any;
  loginType: any;
  enddate: any;
  showgrid: any = false;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  Currency: any; brokerList: any[] = [];
  brokerCode: any; btype: any; buisnessList: any[] = [];
  columns: any[] = []; lang: any = null;
  RenewalListData: any[] = [];
  PendingListData: any[] = [];
  ExpiredListData: any[] = [];
  BusinessLossListData: any[] = [];
  // @Output('Currency') Currency:any='TZS';

  constructor(private router: Router, private sharedService: SharedService, private datePipe: DatePipe,
    private appComp: AppComponent, private translate: TranslateService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails", this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    //this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn = this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    if (this.userType != 'Issuer') this.brokerCode = this.loginId;
  }

  ngOnInit(): void {
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang);
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang)
      this.translate.setDefaultLang(sessionStorage.getItem('language'));
    }
    this.columns = ['S.No', 'Insured Name', 'Expiring Policy Number ', 'Old SI', 'New Start Date', 'Mobile Number', 'Edit', 'UW Renew'];
    this.PendingListData = [
      {
        "InsuredName": "John Doe",
        "ExpiringPolicyNumber": "P123456789",
        "OldSI": "100000",
        "NewStartDate": "28/07/2024",
        "MobileNumber": "+1234567890",
      },
      {
        "InsuredName": "Jane Smith",
        "ExpiringPolicyNumber": "P987654321",
        "OldSI": "150000",
        "NewStartDate": "27/07/2024",
        "MobileNumber": "+0987654321",
      }
    ]
    this.RenewalListData=[
      {
        "InsuredName": "John Doe",
        "ExpiringPolicyNumber": "P123456789",
        "OldSI": "100000",
        "NewStartDate": "26/07/2024",
        "MobileNumber": "+1234567890",
      },
      {
        "InsuredName": "Jane Smith",
        "ExpiringPolicyNumber": "P987654321",
        "OldSI": "150000",
        "NewStartDate": "25/07/2024",
        "MobileNumber": "+0987654321",
      },
      {
        "InsuredName": "Alice Johnson",
        "ExpiringPolicyNumber": "P564738291",
        "OldSI": "200000",
        "NewStartDate": "24/07/2024",
        "MobileNumber": "+1122334455",
      }
    ]
    this.ExpiredListData=[
      {
        "InsuredName": "Jane Smith",
        "ExpiringPolicyNumber": "P987654321",
        "OldSI": "150000",
        "NewStartDate": "23/07/2024",
        "MobileNumber": "+0987654321",
      },
      {
        "InsuredName": "Alice Johnson",
        "ExpiringPolicyNumber": "P564738291",
        "OldSI": "200000",
        "NewStartDate": "22/07/2024",
        "MobileNumber": "+1122334455",
      }
    ]
    this.BusinessLossListData =[
      {
        "InsuredName": "John Doe",
        "ExpiringPolicyNumber": "P123456789",
        "OldSI": "100000",
        "NewStartDate": "2/08/2024",
        "MobileNumber": "+1234567890",
      },
      {
        "InsuredName": "Jane Smith",
        "ExpiringPolicyNumber": "P987654321",
        "OldSI": "150000",
        "NewStartDate": "1/08/2024",
        "MobileNumber": "+0987654321",
      },
    ]
  }


}
