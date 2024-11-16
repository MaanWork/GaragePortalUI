import { Component } from '@angular/core';
import { ProductData } from '../product';
import { TotalAmount } from '../../quotation/quotation-plan/models/TotalAmount';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.scss']
})
export class TotalAmountComponent {
  Fields:any[]=[];
  userDetails: any;
  shortQuoteYN: boolean;
  lang: any;
  items: ({ label: string; routerLink: string; } | { label: string; routerLink?: undefined; })[];
  maxDobDate: Date;
  loginId: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  agencyCode: any;
  branchCode: any;
  productId: any;
  insuranceId: any;
  loginType: any;
  userType: any;
  brokerbranchCode: any;
  typeValue: string;
  productItem: any;
  public form = new FormGroup({}); 
  WorkOrderTypeList: any[]=[];
  SettlementTypeList:any[]=[];
  TotalLossTypeList: any[]=[];
  SettlementList: any[]=[];
  CliamNo: string;
  GarageClaim: any;
  QuoteStatusList: any[]=[];
  DealerDropList: any[]=[];
  GarageName: any;
  GarageId: any;
  QuotationNo: string;
  Completed: string;
  DealerDrop:any='';
  constructor(private sharedService: SharedService,private datePipe: DatePipe,
    private messageService: MessageService, private router: Router, private translate: TranslateService,private appComp:AppComponent,
    private primeNGConfig: PrimeNGConfig) {
      
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
	  let type = sessionStorage.getItem('QuoteType')
	  if(type) this.shortQuoteYN = true;
    	//this.maxDate = new Date();
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
		//this.setHeaders();

		//this.checkFieldNames()}
     	this.maxDobDate = new Date(year - 18,month, day );
		// if(this.productItem.IdType=='1' || this.productItem.IdType==1){
		// 	this.productItem.dobOrRegDate=this.maxDobDate;
		// }
		this.loginId = this.userDetails.Response.LoginId;
		this.agencyCode = this.userDetails.Response.OaCode;
		this.branchCode = this.userDetails.Response.BranchCode;
		this.productId = this.userDetails.Response.ProductId;
		this.insuranceId = this.userDetails.Response.InsuranceId;
		this.loginType = this.userDetails.Response.LoginType;
    this.GarageName = this.userDetails.Response.UserName;
    this.GarageId = this.userDetails.Response.UserName;
		this.userType = this.userDetails.Response.UserType;
		this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue');
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.QuotationNo = sessionStorage.getItem('QuotationNo');
    this.Completed = sessionStorage.getItem('Completed');
    this.productItem= new ProductData();
    let fireData = new TotalAmount();
    this.Fields[0] = fireData?.fields?.fieldGroup[0];
    // this.getWorkOrderType();
    // this.getSettlementType();
    // this.getSettlement();
    // this.getTotalLossType();
    // this.getQuoteStatus()
    // this.productItem.Subrogation='N';
    // this.productItem.JoinOrder='N';
    // this.Fields.forEach(field => {
    //   this.form.addControl(field.key, new FormGroup({})); // Ensure control is added
    // });
    if(this.Completed=='Completed' || this.Completed=='SurveyorPending'){
      let fieldList=this.Fields[0].fieldGroup;
      for(let field of fieldList){
          field.props.disabled = true;
      }
    }
    }
}
}
