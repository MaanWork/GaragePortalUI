import { Component, Input } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AllRisk } from '../../../quotation/quotation-plan/models/AllRisk';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent {
  @Input("data") adminLoginList: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
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
  allLoginList: any[]=[];
  //adminLoginList: any[]=[];
  surveyorLoginList: any[]=[];
  dealerLoginList: any[]=[];
  garageLoginList: any[]=[];
  constructor(private router:Router,
    private sharedService:SharedService,public datePipe:DatePipe) {
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
     // this.getAllLogins();
      console.log(this.adminLoginList,"adminLoginListadminLoginListadminLoginList");
      
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
           // this.adminLoginList=this.allLoginList.filter(ele=>ele.UserType=='Admin');
            // this.surveyorLoginList=this.allLoginList.filter(ele=>ele.UserType=='Surveyor');
            // this.dealerLoginList=this.allLoginList.filter(ele=>ele.UserType=='Dealer');
            // this.garageLoginList=this.allLoginList.filter(ele=>ele.UserType=='Garage');
            console.log( this.adminLoginList," this.adminLoginList this.adminLoginList");
            
          }
        },
        (err) => { },
      );
    }

    EditDetailsView(rowData,type){
      sessionStorage.setItem('EditLoginData',JSON.stringify(rowData));
      this.router.navigate(['/loginCreation/AddNew/',type])
    }
}
