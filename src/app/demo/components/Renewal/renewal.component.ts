import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../app-config.json';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styles: [`.form-container input, p-dropdown { min-width: 20rem }`]
})
export class RenewalComponent implements OnInit {
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
    this.columns = ['S.No', 'BatchId', 'NotifyId ', 'ReTrigger', 'BatchDate', 'TotalNoOfRenewal', 'RenewalCompleted', 'InitiateactionforRenewal', 'Referral'];
  }

  // getBranchList(){
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId
  //   }
  //   let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         //let obj = [{Code:"",CodeDesc:"ALL"}];
  //         this.branchList = data?.Result;
  //         if(!this.branchValue && this.branchList.length!=0){ 
  //           this.branchValue = this.branchList[0].Code;
  //           this.getBrokerList();
  //         }

  //       }
  //     },
  //     (err) => { },
  //   );
  // } 
  getDisplayName() {
    if (this.lang == 'en') return 'CodeDesc';
    else return 'CodeDescLocal';
  }
  // newQuote(){
  //   this.router.navigate(['/policyDetails']);
  // }


  getsearch() {
    this.showgrid = true;
    this.getQuotes();
  }

  getQuotes() {

    this.RenewalListData = [];
    let startdate = this.datePipe.transform(this.startdate, "dd/MM/yyyy");
    let enddate = this.datePipe.transform(this.enddate, "dd/MM/yyyy");
    this.RenewalListData = [
      {
        "S.No": 1,
        "BatchId": "B123",
        "NotifyId": "N456",
        "BatchDate": "27/08/2024",
        "TotalNoOfRenewal": 100,
        "RenewalCompleted": 180,
        "InitiateactionforRenewal": 180,
        "Referral": "Referral A"
      },
      {
        "S.No": 2,
        "BatchId": "B124",
        "NotifyId": "N457",
        "BatchDate": "29/08/2024",
        "TotalNoOfRenewal": 150,
        "RenewalCompleted": 120,
        "InitiateactionforRenewal": 180,
        "Referral": "Referral B"
      },
      {
        "S.No": 3,
        "BatchId": "B125",
        "NotifyId": "N458",
        "BatchDate": "29/08/2024",
        "TotalNoOfRenewal": 200,
        "RenewalCompleted": 180,
        "InitiateactionforRenewal": 180,
        "Referral": "Referral C"
      }
    ]
  }
}

