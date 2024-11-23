import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-spare-parts-home',
  templateUrl: './spare-parts-home.component.html',
  styleUrls: ['./spare-parts-home.component.scss']
})
export class SparePartsHomeComponent {
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
  fnolEditData: any;
  SparePartsList: any[]=[];
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
    this.getallSparePartsList()
    this.columns=['ClaimNo','QuotationNo','GarageId','WorkOrder Date','WorkOrder No','Settlement To','Delivery Date','Total After Deductions','AmountToBeRecovered','Action'];
  }
  getallSparePartsList(){
        let ReqObj = {
      }
      let urlLink = `${this.CommonApiUrl}fnol/getSpareParts`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          if(data.Response){
            this.SparePartsList = data.Response;
          }
        },
        (err) => { },
      );
  }
  saveSpare(rowData){
    let ReqObj = {
      "ClaimNo": rowData.ClaimNo,
      "WorkOrderNo": rowData.QuotationNo,
      "QuotationNo": rowData.QuotationNo
    }
      let urlLink = `${this.CommonApiUrl}fnol/saveSpareParts`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          if(data.Response){
            Swal.fire({
              title: `<strong> &nbsp;Success</strong>`,
              iconHtml: '<i class="fa-solid fa-check-circle fa-fade"></i>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
               ${data.Response.message}
              </ul>`,
              showCloseButton: true,
             // focusConfirm: false,
             // showCancelButton: true,
            // closeButtonColor: '#3085d6',
              //cancelButtonColor: '#d33',
              //cancelButtonText: `No`,
              confirmButtonText: `Close`,
            })
          }
        },
        (err) => { },
      );
    }
}
