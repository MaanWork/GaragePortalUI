import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
export interface AdminInterface{
  Loginname: any;
  LoginId: any;
  CompanyId: any;
  CoreAppCode: any;
  Address: any;
  CityName: any;
  Status: any;
  PassWord: any;
  RePassWord: any;
  BranchCode: any;
  Garageaddress: any;
  Statename: any;
  Contactpersonname: any;
  Mobileno: any;
  Emailid: any;
  Effectivedate: any;
  Remarks: any;
  UserType: any;
  CreatedBy: any;
  OaCode: any;
  EntryDate: any;
  UpdatedBy: any;
  UpdatedDate: any;
  CompanyName: any;
  CityCode: any;
  StateCode: any;
  CountryCode: any;
  Pobox: any;
  CountryName: any;
  MobileCode: any;
  MobileCodeDesc: any;
  ChangePassYN: any;
}
@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.scss']
})
export class LoginCreationComponent {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  tabIndex: any=0;
  userDetails: any;
  loginId: any;
  agencyCode: any;
  branchCode: any;
  productId: any;
  insuranceId: any;
  loginType: any;
  GarageName: any;
  GarageId: any;
  userType: any;
  brokerbranchCode: any;
  //CommonApiUrl: any;
  CountryDropList: any;
  fields: any;
  allLoginList: any[]=[];
  adminLoginList: AdminInterface[];
  surveyorLoginList: any[]=[];
  dealerLoginList: any[]=[];
  garageLoginList: any[]=[];
  constructor(private route1: ActivatedRoute, private sharedService: SharedService,private datePipe: DatePipe,
    private messageService: MessageService, private router: Router, private translate: TranslateService,private appComp:AppComponent,
    private primeNGConfig: PrimeNGConfig) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Response.LoginId;
      this.agencyCode = this.userDetails.Response.OaCode;
      this.branchCode = this.userDetails.Response.BranchCode;
      this.productId = this.userDetails.Response.ProductId;
      this.insuranceId = this.userDetails.Response.CompanyId;
      this.loginType = this.userDetails.Response.LoginType;
      this.GarageName = this.userDetails.Response.UserName;
      this.GarageId = this.userDetails.Response.UserName;
      this.userType = this.userDetails.Response.UserType;
      this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
       this.getAllLogins()
    }
  onTabClicked(event){
    let index = event.index;
    this.tabIndex = index;
  }
  getAllLogins() {
    let regObj = {
      "CompanyId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}login/getAll/login`;
    this.sharedService.onPostMethodSync(urlLink,regObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Response) {
          
          this.allLoginList = data.Response;
          // let adminList,surveyorList,dealerList,garageList;
          this.adminLoginList=this.allLoginList.filter(ele=>ele.UserType=='Admin');
          this.surveyorLoginList=this.allLoginList.filter(ele=>ele.UserType=='Surveyor');
          this.dealerLoginList=this.allLoginList.filter(ele=>ele.UserType=='Dealer');
          this.garageLoginList=this.allLoginList.filter(ele=>ele.UserType=='Garage');
         // console.log(this.adminLoginList,"this.adminLoginListthis.adminLoginListthis.adminLoginListthis.adminLoginList");
          
        }
      },
      (err) => { },
    );
  }


}
