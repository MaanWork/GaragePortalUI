import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { CreateLead } from '../../quotation/quotation-plan/models/CRM/createLead';
import { ProductData } from '../product';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../app-config.json';
import { CRMEnquiry } from '../../quotation/quotation-plan/models/CRM/CRMEnquiry';

@Component({
  selector: 'app-crm-home',
  templateUrl: './crm-home.component.html',
  styleUrls: ['./crm-home.component.scss']
})
export class CrmHomeComponent implements OnInit {
  tabIndex: any;
  columns: any[]=[];
  visibleLead :boolean=false;
  customerInfoFields: any[]=[];
  contactPersonInfoFields: any[]=[];
  otherInfoFields: any[]=[];
  productItem: any;
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  public form = new FormGroup({})
  CityNameList: any[]=[];
  contactTypeList: any[]=[];
  userDetails: any;
  shortQuoteYN: boolean;
  lang: any;
  maxDobDate: Date;
  loginId: any;
  agencyCode: any;
  branchCode: any;
  productId: any;
  insuranceId: any;
  loginType: any;
  userType: any;
  brokerbranchCode: any;
  typeValue: string;
  channelList: any[]=[];
  SectionTypeList: any[]=[];
  posList: any[]=[];
  businessTypeList: any;
  Enquirycolumns: any[]=[];
  leadList: any[]=[];
  EnquiryList: any[]=[];
  Quotecolumns: any[]=[];
  QuoteList: any[]=[];
  visibleEnquiry:boolean=false;
  leadEditList: any[]=[];
  EnquiryTypeList: any[]=[];
  constructor(private router: Router,private sharedService: SharedService,private appComp:AppComponent,
    private translate: TranslateService,) {
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
		this.translate.setDefaultLang(sessionStorage.getItem('language'));}
     	this.maxDobDate = new Date(year - 18,month, day );
		// if(this.productItem.IdType=='1' || this.productItem.IdType==1){
		// 	this.productItem.dobOrRegDate=this.maxDobDate;
		// }
		this.loginId = this.userDetails.Result.LoginId;
		this.agencyCode = this.userDetails.Result.OaCode;
		this.branchCode = this.userDetails.Result.BranchCode;
		this.productId = this.userDetails.Result.ProductId;
		this.insuranceId = this.userDetails.Result.InsuranceId;
		this.loginType = this.userDetails.Result.LoginType;
		this.userType = this.userDetails.Result.UserType;
		this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue');
    
    }
 
  ngOnInit() {
    this.EnquiryTypeList =[{"Code":"1","CodeDesc":"Pending For Quote"},{"Code":"2","CodeDesc":"Additional Information Required"},
      {"Code":"3","CodeDesc":"Additional Information Provided"},{"Code":"4","CodeDesc":"Accepted Enquiries"},{"Code":"5","CodeDesc":"Rejected Enquiries"}


    ]
    this.columns = ['S.No','Lead Id','Customer Name','Contact No','Created Date','Updated Date','Edit','Enquiry'];
    // this.leadList=[
    //   {
    //     "SNo": 1,
    //     "LeadId": "L001",
    //     "CustomerName": "John Doe",
    //     "ContactNo": "+1234567890",
    //     "CreatedDate": "2024-08-26",
    //     "UpdatedDate": "2024-08-27",
    //     "Edit": "Edit Link",
    //     "Enquiry": "Enquiry Details"
    //   },
    //   {
    //     "SNo": 2,
    //     "LeadId": "L002",
    //     "CustomerName": "Jane Smith",
    //     "ContactNo": "+0987654321",
    //     "CreatedDate": "2024-08-25",
    //     "UpdatedDate": "2024-08-26",
    //     "Edit": "Edit Link",
    //     "Enquiry": "Enquiry Details"
    //   }
    // ]
    this.getsalesLead();
    this.Enquirycolumns =['S.No','Enquiry Id','Lead Id','LOB Name','Product Name','Enquiry Date','Updated Date','Edit','View']
    //  this.EnquiryList=[
    //   {
    //     'SNo': 1,
    //     'EnquiryId': 'E001',
    //     'CustomerName': 'John Doe',
    //     'LOBName': 'Retail',
    //     'ProductName': 'Product A',
    //     'EnquiryDate': '2024-08-26',
    //     'UpdatedDate': '2024-08-27',
        
    //   },
    //   {
    //     'SNo': 2,
    //     'EnquiryId': 'E002',
    //     'CustomerName': 'Jane Smith',
    //     'LOBName': 'Corporate',
    //     'ProductName': 'Product B',
    //     'EnquiryDate': '2024-08-25',
    //     'UpdatedDate': '2024-08-26',
    //   }
    // ];
    this.getEnquiry()
    this.Quotecolumns =['S.No','Enquiry Id','Customer Name','LOB Name','Product Name','Quote Count']
     this.QuoteList=[
      {
        'SNo': 1,
        'EnquiryId': 'E001',
        'CustomerName': 'John Doe',
        'LOBName': 'Retail',
        'ProductName': 'Product A',
        'QuoteCount': '1',
        
      },
      {
        'SNo': 2,
        'EnquiryId': 'E002',
        'CustomerName': 'Jane Smith',
        'LOBName': 'Corporate',
        'ProductName': 'Product B',
        'QuoteCount': '2',
      }
    ];
    // this.contactType();
    // this.getChannel();
  }
  // checkFieldNames(){
  //   if(this.fields.length!=0){
  //     let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
  //     let i=0;
  //     for(let field of fieldList){
  //       let key =null;
  //       if(field.id) key=field.id
  //       else key = field.key
  //       this.translate.get('MOTORQUOTE.'+key).subscribe((translation: string) => {
  //         if(field.props){
  //           field.props.label = translation;
  //           if(field.props.options){
  //             for(let entry of field.props.options){
  //               if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
  //                 entry['CodeDescLocal'] = 'Other';
  //               }
  //               if(this.lang=='en') entry['label'] = entry.CodeDesc
  //               else entry['label'] = entry.CodeDescLocal
  //             }
  //           }
  //         }
  //         else if(field.templateOptions){
  //           field.templateOptions.label = translation;
  //           // if(field.templateOptions.options){
  //           //   for(let entry of field.templateOptions.options){
  //           //     if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
  //           //       entry['CodeDescLocal'] = 'Other';
  //           //     }
  //           //     if(this.lang=='en') entry['label'] = entry.CodeDesc
  //           //     else entry['label'] = entry.CodeDescLocal
  //           //   }
  //           // }
  //         }
  //       });
  //       i+=1;
  //       if(i==fieldList.length)  console.log('Final Field Lang',fieldList);
  //     }
  //   }
  // }
  onTabClicked(event){
    
    console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
  //  if(this.tabIndex==0) 
  //  if(this.tabIndex==1) 
  //  if(this.tabIndex==2) 
  }
  openPopup(type){
    if(type=='Lead'){
      this.router.navigate(['/crmHome/Lead'])
    }
    if(type=='Enquiry'){
      this.visibleEnquiry=true;
      this.setEnquiry();
    }
  }
  setEnquiry(){
    let fireData;
    this.productItem = new ProductData();
      fireData = new CRMEnquiry();
      this.customerInfoFields[0] = fireData?.fields?.fieldGroup[0];
  }
 

  getStateList(type) {
			let ReqObj = {
				"CountryId": this.productItem.Country,
				"RegionCode": this.productItem.state
			}
			let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						this.CityNameList = data.Result;
						if(type=='change'){ this.productItem.CityName = '';}
							let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
							for (let i = 0; i < this.CityNameList.length; i++) {
								this.CityNameList[i].label = this.CityNameList[i]['CodeDesc'];
								this.CityNameList[i].value = this.CityNameList[i]['Code'];
								if (i == this.CityNameList.length - 1) {
									let fieldList=this.customerInfoFields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='CityName'){
												field.props.options = defaultRow1.concat(this.CityNameList);
											
										}
									}
							}
						}
								
					}
				},
				(err) => { },
			);
	}


getChannel() {
  let ReqObj = {
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
  }
  let urlLink = `${this.CommonApiUrl}api/sales/channel`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.channelList = data.Result;
       // if(type=='change'){ this.productItem.CityName = '';}
          let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
          for (let i = 0; i < this.channelList.length; i++) {
            this.channelList[i].label = this.channelList[i]['CodeDesc'];
            this.channelList[i].value = this.channelList[i]['Code'];
            if (i == this.channelList.length - 1) {
              let fieldList=this.otherInfoFields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='Channel'){
                    field.templateOptions.options = defaultRow1.concat(this.channelList);
                    this.getSectionType();
                }
              }
          }
        }
            
      }
    },
    (err) => { },
  );
}

getSectionType() {
  let ReqObj = {
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
  }
  let urlLink = `${this.CommonApiUrl}api/sales/sectionType`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.SectionTypeList = data.Result;
       // if(type=='change'){ this.productItem.CityName = '';}
          let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
          for (let i = 0; i < this.SectionTypeList.length; i++) {
            this.SectionTypeList[i].label = this.SectionTypeList[i]['CodeDesc'];
            this.SectionTypeList[i].value = this.SectionTypeList[i]['Code'];
            if (i == this.SectionTypeList.length - 1) {
              let fieldList=this.otherInfoFields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='SectionType'){
                    field.templateOptions.options = defaultRow1.concat(this.SectionTypeList);
                    this.getProbabilityOfSuccess();
                }
              }
          }
        }
            
      }
    },
    (err) => { },
  );
}
getProbabilityOfSuccess() {
  let ReqObj = {
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
  }
  let urlLink = `${this.CommonApiUrl}api/sales/pos`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.posList = data.Result;
       // if(type=='change'){ this.productItem.CityName = '';}
          let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
          for (let i = 0; i < this.posList.length; i++) {
            this.posList[i].label = this.posList[i]['CodeDesc'];
            this.posList[i].value = this.posList[i]['Code'];
            if (i == this.posList.length - 1) {
              let fieldList=this.otherInfoFields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='ProbabilityOfSuccess'){
                    field.templateOptions.options = defaultRow1.concat(this.posList);
                    this.getBusinessType();
                }
              }
          }
        }
            
      }
    },
    (err) => { },
  );
}
getBusinessType() {
  let ReqObj = {
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
  }
  let urlLink = `${this.CommonApiUrl}api/sales/businessType`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.businessTypeList = data.Result;
       // if(type=='change'){ this.productItem.CityName = '';}
          let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
          for (let i = 0; i < this.businessTypeList.length; i++) {
            this.businessTypeList[i].label = this.businessTypeList[i]['CodeDesc'];
            this.businessTypeList[i].value = this.businessTypeList[i]['Code'];
            if (i == this.businessTypeList.length - 1) {
              let fieldList=this.otherInfoFields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='TypeofBusiness'){
                    field.templateOptions.options = defaultRow1.concat(this.businessTypeList);
                }
                if(field.key=='RSABranch'){
                  field.templateOptions.options = defaultRow1.concat(this.businessTypeList);
              }
              }
          }
        }
            
      }
    },
    (err) => { },
  );
}
saveLead() {
  let ReqObj = {
    "Address": this.productItem.Address1,
    "BranchCode": this.branchCode,
    "ChannelId": this.productItem.Channel,
    "CurrentInsurer": this.productItem.CurrentInsurer,
    "Email": this.productItem.EmailId,
    "FirstName": this.productItem.ClientName,
    "IntermediateId": this.productItem.IntermediaryCode,
    "IntermediateName": this.productItem.IntermediaryName,
    //"LastName": this.productItem.ClientName,
    "LeadId": "",
    "LoginId": this.loginId,
    "Createdby": this.loginId,
    "Mobile": this.productItem.MobileNo,
    "PropobabilityOfSuccess": this.productItem.ProbabilityOfSuccess,
    "PropobabilityOfSuccessId": this.productItem.ProbabilityOfSuccess,
    "TypeOfBusiness":this.productItem.TypeofBusiness,
    "TypeOfBusinessId": this.productItem.TypeofBusiness,
    "channelDesc": this.productItem.Channel,
  }
  let urlLink = `${this.CommonApiUrl}api/sales/saveleaddetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
            this.visibleLead=false;
            this.getsalesLead()
      }
    },
    (err) => { },
  );
}
getsalesLead() {
  let appId = "1",loginId="",brokerbranchCode="";
  if(this.userType!='Issuer'){
    appId = "1"; loginId = this.loginId;
    brokerbranchCode = this.brokerbranchCode;
  }
  else{
    appId = this.loginId;
    brokerbranchCode = null;
  }
  let ReqObj = {
    "BrokerBranchCode": brokerbranchCode,
    "InsuranceId":this.insuranceId,
    "ProductId": this.productId,
    "CreatedBy":this.loginId,
    "BranchCode":this.branchCode,
    "UserType": this.userType,
    "Limit":"0",
    "Offset":"100"
    }
  let urlLink = `${this.CommonApiUrl}api/sales/getallLeaddetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
          this.leadList=data.Result;
      }
    });
}
editOpen(value){
  if(value){
    sessionStorage.setItem('customerReferenceNo',value.CustomerReferenceNo)
  }
  else{sessionStorage.removeItem('customerReferenceNo')}
  this.router.navigate(['/crmHome/Lead'])
}
getEnquiry() {
  
  let urlLink = `${this.CommonApiUrl}api/sales/getEnquirys`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
          this.EnquiryList=data.Result;
      }
    });
}
setValue(Lead){
      this.productItem.ClientName=Lead.FirstName;
      this.productItem.Address1=Lead.Address;
      this.productItem.Address2=Lead.Address;
      this.productItem.MobileNumber=Lead.Mobile;
      this.productItem.MobileNo=Lead.Mobile;
      this.productItem.PhoneNumber=Lead.Mobile;
      this.productItem.EmailId=Lead.Email;
      this.productItem.IntermediaryName=Lead.IntermediateName;
      this.productItem.IntermediaryCode=Lead.IntermediateId;
      this.productItem.Channel=Lead.ChannelId;
    //  this.getChannel()
      this.productItem.ProbabilityOfSuccess=Lead.PropobabilityOfSuccessId;
    //  this.getProbabilityOfSuccess()
      this.productItem.TypeofBusiness=Lead.TypeOfBusinessId;
    //  this.getBusinessType()
      this.productItem.CurrentInsurer=Lead.CurrentInsurer;
}
getEditEnquiry(value) {
  
}
}
