import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { CreateLead } from '../../../quotation/quotation-plan/models/CRM/createLead';
import { ProductData } from '../../product';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FormlyFieldConfig } from '@ngx-formly/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crm-customer',
  templateUrl: './crm-customer.component.html',
  styleUrls: ['./crm-customer.component.scss']
})
export class CrmCustomerComponent implements OnInit {
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
  personalInfoFields: any[]=[];
  additionalInfoFields: any[]=[];
  addressInfoFields: any[]=[];
  items:any[]=[];
  countryList:any[]=[];
  genderList: any[]=[];
  policyHolderTypeList: any[]=[];
  titleList:  any[]=[];
  messages:  any[]=[];
  Idnumber: any;
  Idnumber1: any;
  Idnumber2: any;
  mobileCodeList:  any[]=[];
  stateList:  any[]=[];
  regionList:  any[]=[];
  customerReferenceNo: any;
  policyHolderList:  any[]=[];
  shows: boolean;
  maxTextLen: any;
  final1: boolean;
  final: boolean;
  final2: boolean;
  occupationList:  any[]=[];
  final3: boolean;
  final4: boolean;
  final5: boolean;
  final6: boolean;
  final7: boolean;
  leadInfoFields: any[]=[];
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
   // this.setHeaders();
		this.checkFieldNames()}
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
    this.customerReferenceNo= sessionStorage.getItem('customerReferenceNo');
		this.typeValue = sessionStorage.getItem('typeValue');
    this.setForms()
    }
    setForms(){
     
      let fireData;
      this.productItem = new ProductData();
        fireData = new CreateLead();
      
     
      this.personalInfoFields[0] = fireData?.fields?.fieldGroup[0];
      this.additionalInfoFields[0] = fireData?.fields?.fieldGroup[1];
      this.addressInfoFields[0] = fireData?.fields?.fieldGroup[2];
      this.leadInfoFields[0]= fireData?.fields?.fieldGroup[3];
      this.otherInfoFields[0]=fireData?.fields?.fieldGroup[4];
      console.log(fireData?.fields,"this.customerInfoFields[0]");
     
     this.contactType();
     this.getChannel();
    this.getSectionType();
   
    //this.getPolicyIdTypeList()
  // }
  
  if(this.insuranceId=='100002' || this.insuranceId=='100044'){
    let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
      field.form.controls['Country'].valueChanges.subscribe(() => {
        this.getRegionList('change')
       });
      }
    }
    let regionHooks1 ={ onInit: (field: FormlyFieldConfig) => {
      field.form.controls['Region'].valueChanges.subscribe(() => {
        this.getStateList('change')
       });
      }
    }
    let fieldList=this.addressInfoFields[0].fieldGroup;
      for(let field of fieldList){
        if(field.key=='Country'){
          field.hooks = regionHooks;
        }
        if(field.key=='Region'){
          field.hooks = regionHooks1;
        }
      }
    }

    }
    // setHeaders(){
    //   if(this.lang=='en'){this.items = [{ label: 'CRM', routerLink:'/' }, {label:'Customer', routerLink: '/customer'}, { label: 'Create Customer' }];}
    //   else if(this.lang=='po'){this.items = [{ label: 'CRM', routerLink:'/' }, {label:'Cliente', routerLink: '/customer'}, { label: 'Criar cliente' }];}
    //   else if(this.lang=='fr'){this.items = [{ label: 'CRM', routerLink:'/' }, {label:'Client', routerLink: '/customer'}, { label: 'Créer un client' }];}
    // }
    onLanguageChange(item: any) {
      this.translate.use(item.value);
    }
    addLead(){
      const newFieldGroup = JSON.parse(JSON.stringify(this.leadInfoFields[0]));
      this.leadInfoFields.push(newFieldGroup);
      console.log(this.leadInfoFields[this.leadInfoFields.length - 1].fieldGroup);
    }
    getTitleList(){
      let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode
        }
        let urlLink = `${this.CommonApiUrl}dropdown/title`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data.Result) {
              this.titleList = data.Result;
                let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                for (let i = 0; i < this.titleList.length; i++) {
                  this.titleList[i].label = this.titleList[i]['CodeDesc'];
                  this.titleList[i].value = this.titleList[i]['Code'];
                  if (i == this.titleList.length - 1) {
                    let fieldList=this.personalInfoFields[0].fieldGroup;
                    for(let field of fieldList){
                      if (field.key == 'Title') {
                        let entry
                        if(this.productItem.IdType==1){
                        entry="I"
                        }else{
                        entry="C"
                        }
                        field.props.options = defaultRow.concat(this.titleList.filter(ele=>ele.TitleType==entry));
                        this.checkFieldNames()
                        
                        console.log(field.props.options,"field.props.optionsfield.props.options");
                        
                        }
                    }
                  }
              }
            }
          },
          (err) => { },
        );
    }
    ngOnInit(): void {
      
      this.getTitleList()
      this.getOccupationLists('direct');
      this.getGenderList();
      this.getBusinessTypeList();
      this.getPolicyHolderList('direct');
      
      this.getCountryList();
      this.getRegionList('change');
      this.getMobileCodeList();
      this.appComp.getLanguage().subscribe((res:any)=>{  
        if(res) this.lang=res;
        else this.lang='en';
        this.translate.setDefaultLang(this.lang);
        if(this.lang){this.checkFieldNames();//this.setHeaders();
          }
        });
      // if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
      //   else this.lang='en';
      //   sessionStorage.setItem('language',this.lang)
      //   this.translate.setDefaultLang(sessionStorage.getItem('language'));
      //   this.setHeaders();
      //   this.lang = sessionStorage.getItem('language');
      //   this.checkFieldNames();
      // }
      this.lang = sessionStorage.getItem('language');
        this.checkFieldNames();
    }
    getDisplayName(){
      if(this.lang=='en') return 'CodeDesc';
      else return 'CodeDescLocal'
    }
    checkFieldNames(){
      if(this.personalInfoFields.length!=0){
        let fieldList = this.personalInfoFields[0].fieldGroup;
        let i=0;
        for(let field of fieldList){
        let key =null;
        if(field.id) key=field.id
        else key = field.key
        this.translate.get('HOME.'+key).subscribe((translation: string) => {
          if(field.props){
          field.props.label = translation;
          if(field.props.options){
            for(let entry of field.props.options){
            if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
              entry['CodeDescLocal'] = 'Other';
            }
            
            if(this.lang=='en'){ entry['label'] = entry.CodeDesc;}
            else entry['label'] = entry.CodeDescLocal
            }
          }
          }
          else if(field.templateOptions){
          field.templateOptions.label = translation;
          if(field.templateOptions.options){
            for(let entry of field.templateOptions.options){
              if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
                entry['CodeDescLocal'] = 'Other';
              }
              if(this.lang=='en') entry['label'] = entry.CodeDesc
              else entry['label'] = entry.CodeDescLocal
            }
          }
          }
        });
        i+=1;
        if(i==fieldList.length)  console.log('Final Field Lang',fieldList);
        }
      }
      if(this.additionalInfoFields.length!=0){
        let fieldList = this.additionalInfoFields[0].fieldGroup;
        console.log(fieldList+"fieldList");
        
        let i=0;
        for(let field of fieldList){
          let key =null;
          if(field.id) key=field.id
          else key = field.key
          this.translate.get('HOME.'+key).subscribe((translation: string) => {
          if(field.props){
            field.props.label = translation;
            if(field.props.options){
            for(let entry of field.props.options){
              if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
              entry['CodeDescLocal'] = 'Other';
              }
              if(this.lang=='en') entry['label'] = entry.CodeDesc
              else entry['label'] = entry.CodeDescLocal
            }
            }
          }
          else if(field.templateOptions){
            field.templateOptions.label = translation;
            if(field.templateOptions.options){
              for(let entry of field.templateOptions.options){
                if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
                  entry['CodeDescLocal'] = 'Other';
                }
                if(this.lang=='en') entry['label'] = entry.CodeDesc
                else entry['label'] = entry.CodeDescLocal
              }
            }
          }
          });
          i+=1;
          if(i==fieldList.length)  console.log('Final Field Lang',fieldList);
        }
        }
        if(this.addressInfoFields.length!=0){
        let fieldList = this.addressInfoFields[0].fieldGroup;
        console.log(fieldList+"fieldList");
        
        let i=0;
        for(let field of fieldList){
          let key =null;
          if(field.id) key=field.id
          else key = field.key
          this.translate.get('HOME.'+key).subscribe((translation: string) => {
          if(field.props){
            field.props.label = translation;
            if(field.props.options){
            for(let entry of field.props.options){
              if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
              entry['CodeDescLocal'] = 'Other';
              }
              if(this.lang=='en') entry['label'] = entry.CodeDesc
              else entry['label'] = entry.CodeDescLocal
            }
            }
          }
          else if(field.templateOptions){
            field.templateOptions.label = translation;
            if(field.templateOptions.options){
              for(let entry of field.templateOptions.options){
                if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
                  entry['CodeDescLocal'] = 'Other';
                }
                if(this.lang=='en') entry['label'] = entry.CodeDesc
                else entry['label'] = entry.CodeDescLocal
              }
            }
          }
          });
          i+=1;
          if(i==fieldList.length)  console.log('Final Field Lang',fieldList);
        }
        }
      }
      
     ongetBack(){
      let entry = sessionStorage.getItem('PageFrom');
      if(entry=='yakeen'){
      this.router.navigate(['/yakeenSearch'])
      }
      else{this.router.navigate(['/customer'])}
    }
   
    
      public async onSubmit(data) {
      console.log("Total Data", data);
      this.messages=[];
      let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null,cityName=null, stateName=null,businessType = null;
      //  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
      // 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
      //  }
      if(this.insuranceId!='100004'){
        if(data.CityName!=null && data.CityName!='') cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
      }
      else if(this.insuranceId=='100004'){
        if(data?.districtcode==null || data?.districtcode=='' || data?.districtcode==undefined){
          if(data.CityName!='' && data.CityName!=null && data.CityName!='99999'){
            cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
          }
          else cityName = '';
        }
        else if(data.CityName!='99999'){
          if(data.CityName!='' && data.CityName!=null){
            cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
          }
          else cityName = '';
        }
        else cityName=data?.districtcode;
      }
      var d= new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      
      if((this.productItem.IdType != 2 && this.productItem.IdType != '2') && this.insuranceId!='100040' && this.insuranceId!='100042' ){
        
        data.dobOrRegDate = new Date(year - 18,month, day-2 );
      }
      if(data.state!=null && data.state!='') stateName = this.regionList.find(ele=>ele.Code==data.state)?.CodeDesc;
      
      if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem?.TaxExemptedId;
      //this.productItem.TaxExemptedId;
      if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
      console.log("Appointment Date", appointmentDate);
      console.log('mobile code', this.productItem.MobileCode)
      let codes = this.productItem.MobileCode
      if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {
        
        let code = this.mobileCodeList.find(ele => ele.Code == codes)
        if(code){ 
          if(code?.label) this.productItem.MobileCodeDesc = code.label;
          else this.productItem.MobileCodeDesc = '';
        }
        else this.productItem.MobileCodeDesc = '';
      }
      if(data.vrngst=='' || data.vrngst== undefined || data.vrngst==null){data.vrngst=null};
      if(this.loginType=='B2CFlow') data.Clientstatus = 'Y';
      let type = null;
      if(this.productId=='46' && (this.productItem?.PolicyHolderTypeid==null || this.productItem?.PolicyHolderTypeid=='' || this.productItem?.PolicyHolderTypeid==undefined)){
          if(this.productItem.IdType==1 || this.productItem.IdType=='1'){ this.productItem.PolicyHolderTypeid = '3';}
        else{this.productItem.PolicyHolderTypeid = '6';}
        var minm = 1000000000; 
          var maxm = 9876543210; 
        this.productItem.IdNumber = Math.floor(Math 
          .random() * (maxm - minm + 1)) + minm; 
      }
      if((this.productItem.IdType=='2' || this.productItem.IdType==2) && this.insuranceId!='100040' &&  this.insuranceId!='100042'){
            if(dobOrRegDate=='' || dobOrRegDate==null || dobOrRegDate==undefined || (new Date(dobOrRegDate)).setHours(0,0,0,0)<=new Date().setHours(0,0,0,0) || dobOrRegDate==null || dobOrRegDate==''){
          var d= new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var sysDay = new Date(year,month, day-2 );
          dobOrRegDate = this.datePipe.transform(sysDay,'dd/MM/yyyy');
        }
      }
      if(data.IdType=='1'){
        if(this.productItem?.PolicyHolderTypeid=='1' && this.insuranceId=='100004' && this.insuranceId!='100040' &&  this.insuranceId!='100042'){
          if(this.productItem.IdNumber!=null && this.productItem.IdNumber!=''){
          let year = this.productItem.IdNumber.substr(0, 4);
          let month = this.productItem.IdNumber.substr(4,2);
          let day = this.productItem.IdNumber.substr(6,2);
          if(year!=null && year!=undefined && month!=null && month!=undefined && day!=null && day!=undefined){
            dobOrRegDate = day+'/'+month+'/'+year;
          }
          }
        }
        }
      let policyid:any;
      if(data?.PolicyHolderTypeid == '1' && this.insuranceId=='100004'){
           policyid = this.Idnumber.concat(this.Idnumber1).concat(this.Idnumber2);
      }
      else{
        policyid = data?.IdNumber;
      }
      if(this.insuranceId=="100002")data.state=this.productItem.Region;data.RegionCode=this.productItem.Country
     
      if((this.productItem.IdType=='2' || this.productItem.IdType==2) ){
        data.Title='1';
        data.ClientName=data?.CompanyName;
        data.Occupation = '99999';
        data.occupationdesc = 'Others';
      }
      if (data.dobOrRegDate != undefined && data.dobOrRegDate != null && data.dobOrRegDate != '' && this.insuranceId!='100040' &&  this.insuranceId!='100042') {
        if(String(dobOrRegDate).includes('/')){
          dobOrRegDate = data.dobOrRegDate;
        }
        else dobOrRegDate = this.datePipe.transform(data.dobOrRegDate,'dd/MM/yyyy')
      }
      if(data.SocioProfessionalcategory==undefined || data.SocioProfessionalcategory=='') data.SocioProfessionalcategory = null;
      if(this.insuranceId=='100040' || this.insuranceId=='100042'){
        if(data?.PolicyHolderTypeid==null || data?.PolicyHolderTypeid==''){
          data.PolicyHolderTypeid=this.productItem.PolicyHolderTypeid;
        }
        if (this.productItem.dobOrRegDate != undefined && this.productItem.dobOrRegDate != null && this.productItem.dobOrRegDate != '') {
          if(String(this.productItem.dobOrRegDate).includes('/')){
            dobOrRegDate = this.productItem.dobOrRegDate;
          }
          else dobOrRegDate = this.datePipe.transform(this.productItem.dobOrRegDate,'dd/MM/yyyy')
        }
        if(this.productItem.Nationality){
          data.Country=this.productItem.Nationality;
        }
      }
      if(this.insuranceId=='100002'){
        data.Country='TZA'
      }
      let ReqObj = {
        "BrokerBranchCode": this.brokerbranchCode,
        "CustomerReferenceNo": this.customerReferenceNo,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "ProductId": "5",
        "AppointmentDate": appointmentDate,
        "Address1": data?.Address1,
        "Address2": data?.Address2,
        "BusinessType": businessType,
        "CityCode": data?.CityName,
        "CityName": cityName,
        "ClientName": data?.ClientName,
        "Clientstatus": data?.Clientstatus,
        "CreatedBy": this.loginId,
        "DobOrRegDate": dobOrRegDate,
        "Email1": data?.EmailId,
        "Email2": null,
        "Email3": null,
        "Fax": null,
        "Gender": data?.Gender,
        "IdNumber": policyid,
        "IdType": data.IdType,
        "IsTaxExempted": data.isTaxExempted,
        "Language": "1",
        "MobileNo1": data.MobileNo,
        "MobileNo2": null,
        "MobileNo3": null,
        "Nationality": this.productItem.Country,
        "Occupation": data?.Occupation,
        "OtherOccupation":data?.occupationdesc,
        "Placeofbirth": "Chennai",
        "PolicyHolderType": data.IdType,
        "PolicyHolderTypeid": data?.PolicyHolderTypeid,
        "PreferredNotification": data?.PreferredNotification,
        "RegionCode": this.productItem.Region,
        "MobileCode1": data?.MobileCode,
        "WhatsappCode": data?.MobileCode,
        "MobileCodeDesc1": "1",
        "WhatsappDesc": "1",
        "WhatsappNo": data.MobileNo,
        "StateCode": data?.state,
        "StateName": stateName,
        "Status": data?.Clientstatus,
        "Street": data?.Street,
        "Type":type,
        "TaxExemptedId": taxExemptedId,
        "TelephoneNo1": data?.TelephoneNo,
        "PinCode": data?.PinCode,
        "TelephoneNo2": null,
        "TelephoneNo3": null,
        "Title": data.Title,
        "VrTinNo": data.vrngst,
        "SaveOrSubmit": 'Submit',
        "MiddleName":data?.MiddleName,
        "LastName":data?.LastName,
        "Zone":"1",
        "SocioProfessionalCategory":data?.SocioProfessionalcategory,
        // "CompanyName":data?.CompanyName, 
        "Activities":data?.BusinessType
      }
      let quoteNo = sessionStorage.getItem('quoteNo'),refNo = null;
      if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
          
          ReqObj['Type'] = 'b2c';
          if(quoteNo!=undefined) ReqObj['QuoteNo'] = quoteNo;
          else ReqObj['QuoteNo'] = null;
          ReqObj['RequestReferenceNo'] = sessionStorage.getItem('quoteReferenceNo')
      }
      // if(this.endorsementSection){
      // 	ReqObj['EndtStatus'] = this.endtStatus;
      // 	ReqObj['EndorsementTypeDesc'] = this.endorsementName;
      // 	ReqObj['EndorsementType'] = this.endorsementId;
      // 	ReqObj['EndtCategoryDesc'] = this.endorseCategory;
      // 	ReqObj['EndtCount'] = this.endtcount;
      // 	ReqObj['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
      // 	ReqObj['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
      //   }
      let urlLink = `${this.CommonApiUrl}api/sales/saveleaddetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {
              const errorList: any[] = res.ErrorMessage;
                      let ulList:any='';
                for (let index = 0; index < errorList.length; index++) {
                const element = errorList[index];
                //this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
                this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
                console.log('Final Messages',this.messages)
                
                 }
                // Swal.fire({
                // title: '<strong>Form Validation</strong>',
                // icon: 'info',
                // html:
                // 	`<ul class="list-group errorlist">
                // 	${ulList}
                // </ul>`,
                // showCloseButton: true,
                // focusConfirm: false,
                // confirmButtonText:
                // 	'<i class="fa fa-thumbs-down"></i> Errors!',
                // confirmButtonAriaLabel: 'Thumbs down, Errors!',
                // })
              }
          }
          else {
            // if(this.endorsementSection){
            // 	this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);	
            // }
            // else{
              let quoteNo = sessionStorage.getItem('quoteNo');
              if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2' && quoteNo!=undefined && quoteNo!=null)){
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
              }
              else if(sessionStorage.getItem('VechileDetails')){
                sessionStorage.setItem('customerReferenceNo',data.Result.SuccessId);
                this.router.navigate(['/policyDetails']);
              }
              // else if(sessionStorage.getItem('QuoteType') || this.endorsementSection){
              //   if(this.productId=='5')	this.router.navigate(['/policyDetails']);
              //   else this.router.navigate(['/quotation/plan/quote-details']);
              // }
              else {
                if(res.Result.SuccessId){
                  this.savemultiplelead(res.Result.SuccessId);
                  this.router.navigate(['/crmHome'])}
              }
            //}
          }
        },
  
        (err: any) => { console.log(err); },
      );
    }
    submit() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Added Successfully' });
    }
    getPolicyHolderList(type){
      let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode
        }
  
        let urlLink = `${this.CommonApiUrl}dropdown/policyholdertype`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              this.policyHolderList = data.Result;
                  let defaultRow = []
                
                  this.policyHolderList = defaultRow.concat(this.policyHolderList);
                  // this.getPolicyIdTypeList()
        }
      });  
    }
    getPolicyIdTypeList() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "PolicyTypeId": this.productItem.IdType
        }
        let urlLink = `${this.CommonApiUrl}dropdown/policyholderidtype`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              //this.holderTypeValue = null;
              this.policyHolderTypeList = data.Result;
                let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                for (let i = 0; i < this.policyHolderTypeList.length; i++) {
                  this.policyHolderTypeList[i].label = this.policyHolderTypeList[i]['CodeDesc'];
                  this.policyHolderTypeList[i].value = this.policyHolderTypeList[i]['Code'];
                  if (i == this.policyHolderTypeList.length - 1) {
                    let fieldList=this.additionalInfoFields[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='PolicyHolderTypeid'){
                        field.props.options = defaultRow.concat(this.policyHolderTypeList);
                        this.checkFieldNames()
                      }
                    }
                  }
                }
                // if (this.customerReferenceNo) {
                // 	this.setValuescall()
                // }
              //this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
              // if (type == 'change'){this.dob = "";this.productItem.PolicyHolderTypeid='';
              //this.productItem.IdNumber=null
            //}
            }
  
            
          },
          (err) => { },
        );
    }
    getGenderList() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
        }
        let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              this.genderList = data.Result;
              
                // this.getOccupationLists('direct');
              
                let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                for (let i = 0; i < this.genderList.length; i++) {
                  this.genderList[i].label = this.genderList[i]['CodeDesc'];
                  this.genderList[i].value = this.genderList[i]['Code'];
                  if (i == this.genderList.length - 1) {
                    let fieldList=this.personalInfoFields[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='Gender'){
                        field.props.options = defaultRow.concat(this.genderList);
                        this.checkFieldNames()
                        
                      }
                    }
    
                  }
                
              }
              
              
              //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);
              
            }
          },
          (err) => { },
        );
    }
    getCountryList() {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode
        }
        let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              this.countryList = data.Result;
                let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                //this.countryList = defaultRow.concat(this.countryList);
                for (let i = 0; i < this.countryList.length; i++) {
                  this.countryList[i].label = this.countryList[i]['CodeDesc'];
                  this.countryList[i].value = this.countryList[i]['Code'];
                  if (i == this.countryList.length - 1) {
                    let fieldList=this.addressInfoFields[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='Country'){
                        field.props.options = this.countryList;
                        this.checkFieldNames()
                      }
                    }
    
                  }
                
              }
            }
          },
          (err) => { },
        );
    }
  
    getBusinessTypeList(){
      let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
        }
        let urlLink = `${this.CommonApiUrl}dropdown/businesstype`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              this.businessTypeList = data.Result;
                let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                for (let i = 0; i < this.businessTypeList.length; i++) {
                  this.businessTypeList[i].label = this.businessTypeList[i]['CodeDesc'];
                  this.businessTypeList[i].value = this.businessTypeList[i]['Code'];
                  if (i == this.businessTypeList.length - 1) {
                    let fieldList=this.personalInfoFields[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='BusinessType'){
                        field.props.options = defaultRow.concat(this.businessTypeList);
                        this.checkFieldNames()
                      }
                    }
                  }
                
              }
              
              //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[10].props.options = defaulObj.concat(this.businessTypeList);
              
              
            }
          },
          (err) => { },
        );
    }
    getMobileCodeList() {
        let ReqObj = { "InsuranceId": this.insuranceId }
        let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              this.mobileCodeList = data.Result;
                let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                for (let i = 0; i < this.mobileCodeList.length; i++) {
                  this.mobileCodeList[i].label = this.mobileCodeList[i]['CodeDesc'];
                  this.mobileCodeList[i].value = this.mobileCodeList[i]['Code'];
                  if (i == this.mobileCodeList.length - 1) {
                    let fieldList=this.personalInfoFields[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='MobileCode'){
                         if(this.mobileCodeList.length>1){
                          field.props.options = defaultRow.concat(this.mobileCodeList);
                          this.checkFieldNames()
                        }
                        else{
                          field.props.options = this.mobileCodeList;
                          field.form.controls['MobileCode'].setValue(this.mobileCodeList[0].Code);
                          this.checkFieldNames()
                        }
                      }
                    }
                  }
                
              }
              
              if (this.customerReferenceNo) {
                
                this.setValues();
                //this.getPolicyIdTypeList()
              }
              else {
                this.productItem = new ProductData();
                this.productItem.Clientstatus = 'Y';
                this.productItem.isTaxExempted = 'N'; 
                this.productItem.PreferredNotification = '';
                this.productItem.Gender = '';
                this.productItem.PolicyHolderTypeid = '';
                this.productItem.IdType = '1';
                this.setPolicyType();
                if(this.mobileCodeList.length!=0 && this.mobileCodeList.length>1){
                  this.productItem.MobileCode = this.mobileCodeList[1].Code;
                }
                if(this.countryList.length!=0 && this.countryList.length>1){
                  this.productItem.Country = this.countryList[1].Code;
                    this.getRegionList('change');
                }
                this.productItem.state = '';
                this.productItem.CityName = '';
                this.productItem.Occupation = '';
                this.productItem.BusinessType='';
                this.productItem.Title='';
                if(sessionStorage.getItem('VechileDetails')){
                  let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
                  this.productItem.ClientName = motorDetails.ResOwnerName;
                  this.productItem.Title = '1';
                  this.onTitleChange('direct');
                }
              }
  
            }
          },
          (err) => { },
        );
    }
    getStateList(type) {
      let ReqObj,urlLink
      this.productItem.Country = this.productItem.Country;
        ReqObj= {
          "CountryId": this.productItem.Country,
          "RegionCode": this.productItem.Region
        }
      urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`
      if (this.insuranceId == '100002' || this.insuranceId == '100044') this.productItem.state = this.productItem.Region;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.stateList = data.Result;
            let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal': '-Selecione-' }]
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[8].props.options = defaultRow.concat(this.stateList);
            //this.stateList = defaultRow.concat(this.stateList)
            if (type == 'change') { this.productItem.CityName = ''; }
            if (type == 'change') { this.productItem.state = ''; this.productItem.CityName = '' };
            let defaultRow1 = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Selecione--' }];
            for (let i = 0; i < this.stateList.length; i++) {
              this.stateList[i].label = this.stateList[i]['CodeDesc'];
              this.stateList[i].value = this.stateList[i]['Code'];
              if (i == this.stateList.length - 1) {
                let fieldList = this.addressInfoFields[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'CityName') {
                    // if(this.stateList.length>1){
                    field.props.options = defaultRow1.concat(this.stateList);
                    this.checkFieldNames()
                    // }
                    // else{
                    // 	field.props.options = this.stateList;
                    // }
                  }
                }
  
  
              }
            }
  
          }
        },
        (err) => { },
      );
    }
    omit_special_char(event){   
      var k;  
      k = event.charCode;  //         k = event.keyCode;  (Both can be used)
      return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 47); 
    }
    onTitleChange(type){
      let title = this.productItem.Title;
      if(title!='' && title!=null && title!=undefined){
          if(title=='2') this.productItem.IdType = '2';
          else this.productItem.IdType = '1';
          if(title=='1') this.productItem.Gender = 'M';
          else this.productItem.Gender = 'F';
          if(type!='direct') this.getPolicyIdTypeList();
      }
      else{
        this.productItem.IdType = '';
      }
    }
    newidtype(){
      if(this.productItem.PolicyHolderTypeid=='1' && this.insuranceId=='100004'){
        this.shows=true;
      }
      else {
      this.shows=false;
      }
      this.productItem.IdNumber='';
      if(this.productItem.PolicyHolderTypeid=='7') this.maxTextLen = '14';
      else this.maxTextLen = '10';
      }
    getRegionList(type){
      let ReqObj = {
        "CountryId": this.productItem.Country
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.regionList = data.Result;
                let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
                //this.regionList = defaultRow.concat(this.regionList);
                
                  if(type=='change'){
                    this.productItem.state = '';
                    this.productItem.CityName=''
                  };
                  let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                  for (let i = 0; i < this.regionList.length; i++) {
                    this.regionList[i].label = this.regionList[i]['CodeDesc'];
                    this.regionList[i].value = this.regionList[i]['Code'];
                    if (i == this.regionList.length - 1) {
                      let fieldList=this.addressInfoFields[0].fieldGroup;
                      for(let field of fieldList){
                        if(field.key=='Region'){
                          field.props.options = defaultRow1.concat(this.regionList);
                          this.checkFieldNames()
                        }
                      }
    
                    }
                  
                }
                
          }
        },
        (err) => { },
      );
    }
  
    setValues() {
      let ReqObj = {
        "CustomerReferenceNo": this.customerReferenceNo
      }
      let urlLink = `${this.CommonApiUrl}api/sales/getLeaddetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            let customerDetails = data.Result;
            this.productItem = new ProductData();
            this.productItem.ClientName = customerDetails.ClientName;
            this.productItem.CompanyName = customerDetails.ClientName;
            this.productItem.MiddleName = customerDetails.MiddleName;
            this.productItem.LastName = customerDetails.LastName;
            this.productItem.IdType = customerDetails.PolicyHolderType;
            // if(customerDetails.AppointmentDate!=null && customerDetails.AppointmentDate!=undefined){
            // 	var dateParts = customerDetails.AppointmentDate.split("/");
            // 	 this.productItem.AppointmentDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
            // }
            
            this.productItem.Address1 = customerDetails.Address1;
            this.productItem.Address2 = customerDetails.Address2;
            this.productItem.BusinessType = customerDetails.BusinessType;
            this.productItem.CityName = customerDetails.CityCode;
            this.productItem.SocioProfessionalcategory = customerDetails.SocioProfessionalCategory;
            this.productItem.Activities = customerDetails.Activities;
            if(this.productItem.CityName==null) this.productItem.CityName = '';
            this.productItem.districtcode = customerDetails.CityName;
            if(customerDetails.Clientstatus) this.productItem.Clientstatus = customerDetails.Clientstatus;
            else this.productItem.Clientstatus = 'Y';
            this.productItem.EmailId = customerDetails.Email1;
            this.productItem.occupationdesc = customerDetails?.OtherOccupation;
            if(customerDetails.Nationality!=null){
              this.productItem.Country = customerDetails.Nationality;
            }
            else if(this.countryList.length!=0 && this.countryList.length>1){
              this.productItem.Country = this.countryList[1].Code;
                
            }
            this.setValue(customerDetails)
            this.productItem.Nationality = customerDetails.Nationality;
            if(this.productItem.Country==null) this.productItem.Country='';
            this.productItem.PinCode = customerDetails.PinCode;
            this.productItem.Gender = customerDetails.Gender;
            //this.productItem.IdNumber = customerDetails.IdNumber;
            if(customerDetails.PolicyHolderType!=null && customerDetails.PolicyHolderType!=''){
              this.productItem.IdType = customerDetails.PolicyHolderType;
              this.setPolicyType();
              if((this.productItem.IdType=='2' || this.productItem.IdType==2) && this.insuranceId=='100044'){
                this.productItem.CompanyName = customerDetails?.ClientName;
              }
            }
            this.getPolicyIdTypeList()
            this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
            if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
            this.productItem.MobileNo = customerDetails.MobileNo1;
            this.productItem.MobileCode = customerDetails.MobileCode1;
            this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;
            if(this.productItem.PolicyHolderTypeid =='1' && this.insuranceId=='100004'){
              this.shows=true;
              if(customerDetails.IdNumber!='NA'){
                this.Idnumber= customerDetails.IdNumber.substr(0, 5);
                this.Idnumber1= customerDetails.IdNumber.substr(5, 3);
                this.Idnumber2= customerDetails.IdNumber.substr(8, 1);
              }
            }
            else{
              this.shows=false;
              if(customerDetails.IdNumber!='NA') this.productItem.IdNumber = customerDetails.IdNumber;
            }
            this.productItem.PreferredNotification = customerDetails.PreferredNotification;
            if(this.productItem.PreferredNotification==null) this.productItem.PreferredNotification='';
            this.productItem.Region = customerDetails.StateCode;
            if(this.productItem.state==null){
              this.productItem.state = '';
              
            }
            this.productItem.dobOrRegDate=customerDetails.DobOrRegDate;
            this.productItem.Street = customerDetails.Street;
            this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
            if(this.shortQuoteYN && customerDetails.Occupation=='99999') this.productItem.Occupation = '';
            else this.productItem.Occupation = customerDetails.Occupation;
            this.productItem.Title = customerDetails.Title;
            this.getTitleList()
            this.productItem.Occupation = customerDetails.Occupation;
            this.productItem.vrngst = customerDetails.VrTinNo;
            this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
            if(this.insuranceId=='100040'){this.productItem.Region=customerDetails.RegionCode;
            this.productItem.Department = customerDetails.StateCode;
          }
            if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
              if(this.productItem.Address1==null || this.productItem.Address1==''){
                this.productItem.Occupation = '';
                if(this.productItem.Title=='1') this.productItem.Gender = 'M';
                else this.productItem.Gender = 'F';
              }
            }
            console.log("Final Edit Data", this.productItem)
            console.log("Final Edit Data", this.personalInfoFields)
          }
        },
        (err) => { },
      );
    }
    idfieldvalidate(){
      let customer:any;
      if(this.productItem.IdType=='1'){
        customer='corporate'
      }
      else if(this.productItem.IdType=='2'){
        customer='Individual'
      }
      let policy:any;
      if(this.productItem.PolicyHolderTypeid!=null && this.productItem.PolicyHolderTypeid!='' && this.productItem.PolicyHolderTypeid!=undefined){
        let p=this.policyHolderTypeList.find(ele => ele.Code == this.productItem.PolicyHolderTypeid);
        if(p){
          policy=p.CodeDesc;
        }
        else{
          policy=null;
        }
      }	
      if(this.productItem.PolicyHolderTypeid=='3'){
        let urlLink = `${this.CommonApiUrl}api/validatecustomerid?accounttype=${customer}&identifytype=${policy}&companyid=${this.insuranceId}&id=${this.productItem.IdNumber}&saveOrsubmit=Submit`;
        this.sharedService.onGetMethodSync(urlLink).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Message== "Success") {
              this.final1=false;
              this.final=false;
            }
            else {
              this.final1=true;
              this.final=true;
            }
          },
          (err) => { },
        );
      }
    }
    Adressvalidate(){
        let urlLink = `${this.CommonApiUrl}api/validateaddress?address=${this.productItem.Address1}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
        this.sharedService.onGetMethodSync(urlLink).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Message== "Success") {
              this.final2=false;
              this.final=false;
            }
            else {
              this.final2=true;
              this.final=true;
            }
          },
          (err) => { },
        );
    }
    occupationchange(){
  
      let occupation:any;
      if(this.productItem.Occupation!=null){
      let occupationa = this.occupationList.find(ele => ele.Code == this.productItem?.Occupation);
      if(occupationa){
             occupation = occupationa?.CodeDesc;
      }
      }
      let urlLink = `${this.CommonApiUrl}api/validateOccupation?occupation=${occupation}&companyid=${this.insuranceId}&otheroccupation=${this.productItem.occupationdesc}&saveOrsubmit=Submit`;
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Message== "Success") {
            this.final3=false;
            this.final=false;
          }
          else {
            this.final3=true;
            this.final=true;
          }
        },
        (err) => { },
      );
    }
  
    StatusChange(){
      let urlLink = `${this.CommonApiUrl}api/validatestatus?status=${this.productItem.Clientstatus}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Message== "Success") {
            this.final4=false;
            this.final=false;
          }
          else {
            this.final4=true;
            this.final=true;
          }
        },
        (err) => { },
      );
    }
  
    Customervalidate(){	
      let urlLink = `${this.CommonApiUrl}api/validateCustomerName?name=${this.productItem.ClientName}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Message== "Success") {
            this.final5=false;
            this.final=false;
          }
          else {
            this.final5=true;
            this.final=true;
          }
        },
        (err) => { },
      );
    }
    Emailvalidate(){	
        let urlLink = `${this.CommonApiUrl}api/ValidateEmail?email=${this.productItem.EmailId}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
        this.sharedService.onGetMethodSync(urlLink).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Message== "Success") {
              this.final6=false;
              this.final=false;
            }
            else {
              this.final6=true;
              this.final=true;
            }
          },
          (err) => { },
        );
    
    }
    Mobilevalidate(){	
          let urlLink = `${this.CommonApiUrl}api/validatemobilenumber?number=${this.productItem.MobileNo}&companyid=${this.insuranceId}&code=${this.productItem.MobileCode}&saveOrsubmit=Submit`;
          this.sharedService.onGetMethodSync(urlLink).subscribe(
            (data: any) => {
              console.log(data);
              if (data.Message== "Success") {
                this.final7=false;
                this.final=false;
              }
              else {
                this.final7=true;
                this.final=true;
              }
            },
            (err) => { },
          );
    }
    
    blankvalidationcheck(datas){
      console.log("Total Data", datas);
      
      let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null,cityName=null, stateName=null,businessType = null;
      //  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
      // 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
      //  }
      if(this.insuranceId!='100004'){
        if(datas.CityName!=null && datas.CityName!='') cityName = this.stateList.find(ele=>ele.Code==datas.CityName)?.CodeDesc;
      }
      else if(this.insuranceId=='100004'){
        if(datas?.districtcode==null || datas?.districtcode=='' || datas?.districtcode==undefined){
          if(datas.CityName!='' && datas.CityName!=null && datas.CityName!='99999'){
            cityName = this.stateList.find(ele=>ele.Code==datas.CityName)?.CodeDesc;
          }
          else cityName = '';
        }
        else if(datas.CityName!='99999'){
          if(datas.CityName!='' && datas.CityName!=null){
            cityName = this.stateList.find(ele=>ele.Code==datas.CityName)?.CodeDesc;
          }
          else cityName = '';
        }
        else cityName=datas?.districtcode;
      }
      
      if(datas.state!=null && datas.state!='') stateName = this.regionList.find(ele=>ele.Code==datas.state)?.CodeDesc;
      var d= new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if(this.productItem.IdType != 2){
        
        datas.dobOrRegDate = new Date(year - 18,month, day-2 );
      }
      if (datas.dobOrRegDate != undefined && datas.dobOrRegDate != null && datas.dobOrRegDate != '') {
        dobOrRegDate = this.datePipe.transform(datas.dobOrRegDate, "dd/MM/yyyy");
      }
      if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem?.TaxExemptedId;
        //taxExemptedId = this.productItem.TaxExemptedId;
      if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
      let codes = this.productItem.MobileCode
      if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {
        //let code = this.productItem
        let code = this.mobileCodeList.find(ele => ele.Code == codes)
        if(code){ 
          if(code?.label) this.productItem.MobileCodeDesc = code.label;
          else this.productItem.MobileCodeDesc = '';
        }
        else this.productItem.MobileCodeDesc = '';
  
        //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
      }
      let type = null;
      if(datas.vrngst=='' || datas.vrngst== undefined || datas.vrngst==null){datas.vrngst=null};
      if(this.loginType=='B2CFlow') datas.Clientstatus = 'Y';
      if(this.productId=='46' && (this.productItem?.PolicyHolderTypeid==null || this.productItem?.PolicyHolderTypeid=='' || this.productItem?.PolicyHolderTypeid==undefined)){
          if(this.productItem.IdType==1 || this.productItem.IdType=='1'){ this.productItem.PolicyHolderTypeid = '3';}
        else{this.productItem.PolicyHolderTypeid = '6';}
        var minm = 1000000000; 
          var maxm = 9876543210; 
        this.productItem.IdNumber = Math.floor(Math 
          .random() * (maxm - minm + 1)) + minm; 
      }
      let policyid:any;
      if(datas?.PolicyHolderTypeid == '1'){
           policyid = this.Idnumber.concat(this.Idnumber1).concat(this.Idnumber2);
      }
      else{
        policyid = datas?.IdNumber;
      }
      let ReqObj = {
        "BrokerBranchCode": this.brokerbranchCode,
        "CustomerReferenceNo": this.customerReferenceNo,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "ProductId": "5",
        "AppointmentDate": appointmentDate,
        "Address1": datas?.Address1,
        "Address2": datas?.Address2,
        "BusinessType": businessType,
        "CityCode": datas?.CityName,
        "CityName": cityName,
        "ClientName": datas?.ClientName,
        "Clientstatus": datas?.Clientstatus,
        "CreatedBy": this.loginId,
        "DobOrRegDate": dobOrRegDate,
        "Email1": datas?.EmailId,
        "Email2": null,
        "Email3": null,
        "Fax": null,
        "Gender": datas?.Gender,
        "IdNumber": policyid,
        "IdType": datas.IdType,
        "IsTaxExempted": datas.isTaxExempted,
        "Language": "1",
        "MobileNo1": datas.MobileNo,
        "MobileNo2": null,
        "MobileNo3": null,
        "Nationality": datas.Country,
        "Occupation": datas?.Occupation,
        "OtherOccupation":datas?.occupationdesc,
        "Placeofbirth": "",
        "PolicyHolderType": datas.IdType,
        "PolicyHolderTypeid": datas?.PolicyHolderTypeid,
        "PreferredNotification": datas?.PreferredNotification,
        "RegionCode": "01",
        "MobileCode1": datas?.MobileCode,
        "WhatsappCode": datas?.MobileCode,
        "MobileCodeDesc1": "1",
        "WhatsappDesc": "1",
        "WhatsappNo": datas.MobileNo,
        "StateCode": datas?.state,
        "StateName": stateName,
        "Status": datas?.Clientstatus,
        "Street": datas?.Street,
        "Type":type,
        "TaxExemptedId": taxExemptedId,
        "TelephoneNo1": datas?.TelephoneNo,
        "PinCode": datas?.PinCode,
        "TelephoneNo2": null,
        "TelephoneNo3": null,
        "Title": datas.Title,
        "VrTinNo": datas.vrngst,
        "SaveOrSubmit": 'Submit',
        "MiddleName":datas?.MiddleName,
          "LastName":datas?.LastName,
      }
      let urlLink = `${this.CommonApiUrl}api/blankvalidation`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {
              const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
                      let ulList:any='';
                for (let index = 0; index < errorList.length; index++) {
        
                const element = errorList[index];
                ulList +=`<li class="list-group-login-field">
                  <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}&nbsp;(${element?.Code})</div>
                  <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                </li>`
                }
                Swal.fire({
                title: '<strong>Form Validation</strong>',
                icon: 'info',
                html:
                  `<ul class="list-group errorlist">
                  ${ulList}
                </ul>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-down"></i> Errors!',
                confirmButtonAriaLabel: 'Thumbs down, Errors!',
                })
              }
          }
          else{
            this.onSubmit(datas);
          }
          
        },
  
  
  
  
  
        
        (err: any) => { console.log(err); },
      );
    }
    setPolicyType(){
    
         let value = this.productItem.IdType;
        if(value==2 || value=='2'){
          this.productItem.Gender = '';
        }
      this.getPolicyIdTypeList();this.getTitleList();
    if(this.insuranceId=='100004'){
      this.getType3('change');
    } 
    let fieldList=this.additionalInfoFields[0].fieldGroup;
    let fieldList1=this.personalInfoFields[0].fieldGroup;
    let fieldList2=this.addressInfoFields[0].fieldGroup;
    
    for(let field of fieldList1){
      if(this.productItem.IdType=='2' || this.productItem.IdType==2){
      if(field.key=='BusinessType' || field.key=='CompanyName'  ){
        field.hide=false;field.hideExpression=false;
      }
      
      if(field.key=='ClientName' || field.key=='Gender' || field.key=='dobOrRegDate' || field.key=='Nationality'
        || field.key=='SocioProfessionalcategory' || field.key=='Occupation' 
      )
        {
          field.hide=true;field.hideExpression=true;
          if(field.key=='dobOrRegDate'){field.label="Registration Date"}
        }
        if(field.key=='BusinessType' ){
          field.templateOptions.required=false;
        }
        else if(field.key=='EmailId' ){
          field.templateOptions.required=true;
        }
      }
      else if(this.productItem.IdType=='1' || this.productItem.IdType==1){
        if(field.key=='BusinessType' || field.key=='CompanyName'){
          field.hide=true;field.hideExpression=true;
        }
        if(field.key=='ClientName'  || field.key=='Gender' || field.key=='dobOrRegDate' || field.key=='Nationality'
          || field.key=='SocioProfessionalcategory' || field.key=='Occupation' 
        ){
            field.hide=false;field.hideExpression=false;
          }
        if(field.key=='ClientName'  || field.key=='Gender'){
            field.hide=false;field.hideExpression=false;
          }
          if(field.key=='EmailId' ){
              field.templateOptions.required=false;
          }
      }
    }
      for(let field of fieldList){
        if(this.productItem.IdType=='1' || this.productItem.IdType==1){
          if(  (field.key=='dobOrRegDate' && this.insuranceId!='100044') || field.key=='GstNumber' ){
            field.hide=true;field.hideExpression=true;
          }
          else if(field.key=='IdNumber' || field.key=='PolicyHolderTypeid'){
            field.templateOptions.required=false;
          }
        } 
        else if(this.productItem.IdType=='2' || this.productItem.IdType==2){
          if(  field.key=='dobOrRegDate' || field.key=='GstNumber'){
            field.hide=false;field.hideExpression=false;
          }
          else if(field.key=='PolicyHolderTypeid' || field.key=='IdNumber'){
            field.templateOptions.required=true;
          }
        }
      }
      for(let field of fieldList2){
        if(this.productItem.IdType=='1' || this.productItem.IdType==1){
          if(field.key=='Country' || field.key=='CityName' || field.key=='Address1'){
            field.templateOptions.required=false;
          }
        } 
        else if(this.productItem.IdType=='2' || this.productItem.IdType==2){
          if(field.key=='Country' || field.key=='CityName' || field.key=='Address1'){
            field.templateOptions.required=true;
          }
        }
      }
    // this.productItem.IdType =value;
    // this.typeChange()
      }
    // navigateToCustomer() {
    //   this.confirmationService.confirm({
    //     message: 'All the changes made will be lost. Are you sure that you want to proceed?',
    //     header: 'Confirmation',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //   if(this.shortQuoteYN) this.router.navigate(['/quotation/plan/shortQuote']);
    //       else this.router.navigate(['/customer']);
    //     },
    //   });
    // }
    onsavedatas(type,data){
    if(type=='Address'){
      this.Adressvalidate();
    }
    else if(type=='IdValue'){
      this.idfieldvalidate();
    }
    else if(type=='Email'){
      this.Emailvalidate();
    }
    else if(type=='Mobile'){
      this.Mobilevalidate();
    }
    else if(type=='Occupation'){
      this.occupationchange();
    }
    else if(type=='Status'){
      this.StatusChange();
    }
    else if(type=='Customer'){
      this.Customervalidate();
    }
    else if(type=='direct' && !this.final){
      //this.blankvalidationcheck(data);
      if(this.insuranceId=='100040' || this.insuranceId=='100042'){
        let fieldList = this.personalInfoFields[0].fieldGroup
        let i=0,j=0;
        for(let field of fieldList){
          if((field.templateOptions.required==true || field.props.required==true) && (field.hide!=true)){
          if(this.productItem[field.key]==null || this.productItem[field.key]==undefined || this.productItem[field.key]==''){
            j+=1;
            this.form.controls[field.key].errors=true;
            this.form.controls[field.key].touched=true;
            field.templateOptions['errors'] = true;
            field.props['errors'] = true;
            console.log(this.form.controls[field.key]);
          }
          else{
            field.templateOptions['errors'] = false;
            field.props['errors'] = false;
          }
          i+=1;
          if(i==fieldList.length && j==0){
            this.errorFunctionadditioal(data);
            // this.onSubmit(data);
          }
          }
          else{ i+=1;
          if(i==fieldList.length && j==0){
            this.errorFunctionaddress(data)
          }
          }
        }
        }
        else{
          this.onSubmit(data);
        }
    }
    else if(type=='direct' && this.final){
     if(this.final1)this.idfieldvalidate();
     if(this.final2) this.Adressvalidate();
     if(this.final3) this.occupationchange();
     if(this.final4) this.StatusChange();
     if(this.final5) this.Customervalidate();
     if(this.final6) this.Emailvalidate();
     if(this.final7) this.Mobilevalidate();
    }
  }
  
  
  errorFunctionadditioal(data){
    let fieldList = this.additionalInfoFields[0].fieldGroup
        let i=0,j=0;
        for(let field of fieldList){
          if((field.templateOptions.required==true || field.props.required==true) && (field.hide!=true)){
          if(this.productItem[field.key]==null || this.productItem[field.key]==undefined || this.productItem[field.key]==''){
            j+=1;
            this.form.controls[field.key].errors=true;
            this.form.controls[field.key].touched=true;
            field.templateOptions['errors'] = true;
            field.props['errors'] = true;
            console.log(this.form.controls[field.key]);
          }
          else{
            field.templateOptions['errors'] = false;
            field.props['errors'] = false;
          }
          i+=1;
          if(i==fieldList.length && j==0){
          }
          }
          else{ i+=1;
          if(i==fieldList.length && j==0){
            this.errorFunctionaddress(data);
          }
          }
        }
  }
  errorFunctionaddress(data){
    let fieldList = this.addressInfoFields[0].fieldGroup
        let i=0,j=0;
        for(let field of fieldList){
          if((field.templateOptions.required==true || field.props.required==true) && (field.hide!=true)){
          if(this.productItem[field.key]==null || this.productItem[field.key]==undefined || this.productItem[field.key]==''){
            j+=1;
            this.form.controls[field.key].errors=true;
            this.form.controls[field.key].touched=true;
            field.templateOptions['errors'] = true;
            field.props['errors'] = true;
            console.log(this.form.controls[field.key]);
          }
          else{
            field.templateOptions['errors'] = false;
            field.props['errors'] = false;
          }
          i+=1;
          if(i==fieldList.length && j==0){
            // this.onSubmit(data);
          }
          }
          else{ i+=1;
          if(i==fieldList.length && j==0){
            this.onSubmit(data);
          }
          }
        }
        //return true;
  }
  getType3(type){
    let product:any;this.titleList =[];
    if(this.productItem.IdType == '1'){
    product = 'I'
    }
    else if(this.productItem.IdType == '2'){
      product = 'C'
    }
    else {
      product ='I'
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "NAME_TITLE",
       "BranchCode":"99999",
       "ItemCode":"null",
       "TitleType":product
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
      console.log(data);
      if(data.Result){
        this.titleList = data.Result;
        let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
        for (let i = 0; i < this.titleList.length; i++) {
          this.titleList[i].label = this.titleList[i]['CodeDesc'];
          this.titleList[i].value = this.titleList[i]['Code'];
          if (i == this.titleList.length - 1) {
            let fieldList=this.personalInfoFields[0].fieldGroup;
            for(let field of fieldList){
            //   if(field.key=='Title'){
            // 	  field.props.options = defaultRow.concat(this.titleList);
            // 	  this.checkFieldNames()
            //   }
            if (field.key == 'Title') {
              let entry
              if(this.productItem.IdType==1){
              entry="I"
              }else{
              entry="C"
              }
              field.props.options = defaultRow.concat(this.titleList.filter(ele=>ele.TitleType==entry));
              this.checkFieldNames()
              
              console.log(field.props.options,"field.props.optionsfield.props.options");
              
              }
            }
          }
        }
      }
      },
      (err) => { },
    );
    }
    
    getOccupationLists(type) {
      let product:any;this.occupationList=[];let productId=this.productId
      if(this.productItem.IdType == '1'){
          product = 'I'
      }
      else if(this.productItem.IdType == '2'){
        product = 'C'
      }
      if(type=='change'){
        this.productItem.Occupation = '';
      }
      if(this.insuranceId=='100004') {
        productId=''
        product='';
      }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "ProductId":productId,
          "TitleType":product
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.occupationList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
            // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
              for (let i = 0; i < this.occupationList.length; i++) {
                this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
                this.occupationList[i].value = this.occupationList[i]['Code'];
                if (i == this.occupationList.length - 1) {
                  let fieldList=this.personalInfoFields[0].fieldGroup;
                  for(let field of fieldList){
                    if(field.key=='Occupation'){
                      field.props.options = defaultRow.concat(this.occupationList);
                      this.checkFieldNames()
                    }
                  }
                }
              }
            // }
            // else{
            // 	this.occupationList = defaultRow.concat(this.occupationList)
            // }
            if(type!='change'){
              this.getBusinessTypeList();
            }
          }
        },
        (err) => { },
      );
    }
    taxExcepted(){
        let fieldList=this.additionalInfoFields[0].fieldGroup;
        for(let field of fieldList){
        if(this.productItem.isTaxExempted=='Y'){
          if(field.key=='TaxExemptedId'){
            field.hide=false;field.hideExpression=false;
          }
        } 
        if(this.productItem.isTaxExempted=='N'){
          if(field.key=='TaxExemptedId'){
            field.hide=true;field.hideExpression=true;
          }
        }
      }
    }
    contactType() {
      let ReqObj = {
          "BranchCode": this.branchCode,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId
      }
      let urlLink = `${this.CommonApiUrl}api/sales/contactType`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.contactTypeList = data.Result;
           // if(type=='change'){ this.productItem.CityName = '';}
              let defaultRow1 = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
              for (let i = 0; i < this.contactTypeList.length; i++) {
                this.contactTypeList[i].label = this.contactTypeList[i]['CodeDesc'];
                this.contactTypeList[i].value = this.contactTypeList[i]['Code'];
                if (i == this.contactTypeList.length - 1) {
                  let fieldList=this.leadInfoFields[0].fieldGroup;
                  for(let field of fieldList){
                    if(field.key=='ContactType'){
                        field.props.options = defaultRow1.concat(this.contactTypeList);
                        
                    }
                  }
              }
            }
                
          }
        },
        (err) => { },
      );
  }
  savemultiplelead(customerReferenceNo){
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
      "LeadId": customerReferenceNo,
      "LoginId": this.loginId,
      "Createdby": this.loginId,
      "Mobile": this.productItem.MobileNo,
      "PropobabilityOfSuccess": this.productItem.ProbabilityOfSuccess,
      "PropobabilityOfSuccessId": this.productItem.ProbabilityOfSuccess,
      "TypeOfBusiness":this.productItem.TypeofBusiness,
      "TypeOfBusinessId": this.productItem.TypeofBusiness,
      "channelDesc": this.productItem.Channel,
    }
    let urlLink = `${this.CommonApiUrl}api/sales/insertSales`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
            //  this.visibleLead=false;
           //   this.getsalesLead()
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
  back(){
    sessionStorage.removeItem('customerReferenceNo')
    this.router.navigate(['/crmHome'])
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
  }
  