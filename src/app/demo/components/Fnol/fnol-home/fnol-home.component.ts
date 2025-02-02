import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fnol-home',
  templateUrl: './fnol-home.component.html',
  styleUrls: ['./fnol-home.component.scss']
})
export class FnolHomeComponent {
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
  fnolList:any[]=[];
  fnolEditData: any;
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
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
    this.getallfnolList()
    this.columns=[ 'S.#','Fnol No','Policy No',  'Loss Date','Intimated Date', 'Loss Location', 'Police Station', 'Edit'];
  }
  getallfnolList(){
    let ReqObj = {
      "CompanyId": this.CompanyId,
   }
      let urlLink = `${this.CommonApiUrl}fnol/getAllClaims`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          if(data.Response){
            this.fnolList = data.Response;
          }
        },
        (err) => { },
      );
  }
  getfnolEdit(rowData){
    if(rowData.FnolNo)sessionStorage.setItem('FnolNo',rowData.FnolNo);
    if(rowData.PoliceReportNo)sessionStorage.setItem('PoliceReportNo',rowData.PoliceReportNo);
    if(rowData.PolicyNo){
      sessionStorage.setItem('PolicyNo',rowData.PolicyNo);
      this.router.navigate(['/fnol/createfnol']);
    }
  }
  getfnolEditView(rowData){

    if(rowData.FnolNo)sessionStorage.setItem('FnolNo',rowData.FnolNo);sessionStorage.setItem('FnolDisable','Disable');
    if(rowData.PoliceReportNo)sessionStorage.setItem('PoliceReportNo',rowData.PoliceReportNo);
    if(rowData.PolicyNo){
      sessionStorage.setItem('PolicyNo',rowData.PolicyNo);
      this.router.navigate(['/fnol/createfnol']);
    }
  }
}
