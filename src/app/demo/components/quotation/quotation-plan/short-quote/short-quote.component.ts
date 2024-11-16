import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MotorShotQuoteUganda } from '../models/Uganda/MotorShotQuoteUganda';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProductData } from '../models/product';
import * as moment from 'moment';
import { MotorShotQuoteCustomerUganda } from '../models/Uganda/MotorShotQuoteCustomerUganda';
import { ShortQuoteCustomerSanlam } from '../models/sanlam/MotorShotQuoteCustomer';
import { ShortQuoteSanlam } from '../models/sanlam/MotorShotQuote';
import { MotorShotQuoteCustomerMadison } from '../models/Madison/MotorShotQuoteCustomerUganda';
import { MotorShotQuoteMadison } from '../models/Madison/MotorShotQuoteMadison';
import { MotorShotQuoteCustomerEagle } from '../models/Eagle/MotorShotQuoteCustomerEagle';
import { MotorShotQuoteEagle } from '../models/Eagle/MotorShotQuoteEagle';
import { ShortQuoteCustomerBurkina } from '../models/sanlamBurkina/MotorShotQuoteCustomerBurkina';
import { ShortQuoteSanlamBurkina } from '../models/sanlamBurkina/MotorShotQuoteBurkina';
import { MotorShortQuoteCustomerIvory } from '../models/sanlamIvory/MotorShotQuoteCustomerIvory';
import { MotorShortQuoteIvory } from '../models/sanlamIvory/MotorShotQuoteIvory';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: './short-quote.component.html',
  styleUrls: ['./short-quote.component.scss']
})
export class ShortQuoteComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public customApiUrl1:any = this.AppConfig.CustomApiUrl1;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  insuranceId: any=null;quoteNo:any=null;
  productId: any;coverSection:boolean=false;
  countryCode:any='';clientName:any='';
  insurenceTypeList: any[]=[];
  insurenceClassList: any[]=[];
  bodyTypeList: any[]=[];
  motorUsageList: any[]=[];
  modelList: any[]=[];
  makeList: any[]=[];
  years: any;
  userDetails: any;
  loginId: any;
  userType: any;
  brokerbranchCode: any;
  branchList: any;
  agencyCode: any;customerName:any=null;
  branchCode: any;classList:any[]=[];customerDetails:any=null;
  modelColumns: string[];brokerCode:any=null;customerCode:any=null;
  vehicleDetailsList: any[]=[];noOfDays:any=null;sourceType:any=null;
  editSectionAlt: boolean;endorseEffectiveDate:any=null;
  makeValue: any;typeList:any[]=[];policyStartDate:any=null;
  editdata: any;mobileNo:any=null;endorsementSection:boolean=false;
  bodyTypeId: any;cityValue:any=null;yearList:any[]=[];enableAddVehicle:boolean=false;
  bodyTypeValue: any;motorUsageValue:any=null;policyEndDate:any=null;
  bodyTypeIdcode: any;vehicleDetails:any=null;endorsementYn:any='N';
  form:any;classValue:any=null;motorUsageType:any=null;
  model:any;motorTypeList:any[]=[];typeValue:any=null;subuserType:any=null;
  fields:any[]=[];fields2:any[]=[];productItem:any=null;mobileCodeList:any[]=[];
  individualCalcIndex: number;lang:any=null;
  quoteRefNo: any=null;
  endorseCoverModification: any;
  exchangeRate: any=null;
  currencyCode: any=null;
  currencyList: any[]=[];
  minCurrencyRate: any=null;
  maxCurrencyRate: any=null;
  vehicleData: any[]=[];
  finalizeYN: any='N';typeListIvory:any[]=[];
  endorsementId: any;enableFieldsList: any;coverModificationYN: string;
  adminRemarks: any;emipolicytype: any;
  adminSection: boolean = false;selectedCoverList: any[]=[];
  showSection: boolean=false;isMannualReferal: any=null;
  localPremiumCost: number;totalPremium: number;emiYN: any='N';
  emiPeriod: any=null;selectedRowData: any;
  rejectedReason: any;endorseAddOnCovers: any;
  endorseCovers: any;endorseSIModification: boolean;
  selectedVehicleList: any[]=[];statusValue:any=null;
  customerReferenceNo: any;Code:any;sourceTypeList:any[]=[];
  motordetails: any=null;editSection: boolean;
  editMotorUsageSection: boolean;issuerSection:boolean=false;
  showCustomerList: boolean=false;brokerBranchCode: any=null;
  brokerLoginId: any=null;commonSection: boolean=false;
  sourceCodeDesc: any=null;brokerList: any[]=[];customerList: any[]=[];
  brokerBranchList: any[]=[];mainBodyTypeList: any[]=[];vehicleTypeList: any[]=[];
  defencecostList: any[]=[];deductiblesList: any[]=[];
  typeListAlt: any[]=[];aggregatedList:any[]=[];
  constructor(private router: Router,private sharedService: SharedService,
    private appComp:AppComponent,
    private translate: TranslateService,private datePipe:DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.insuranceId = this.userDetails.Result.InsuranceId;
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.insuranceId = this.userDetails.Result.InsuranceId;
      this.currencyCode = this.userDetails.Result.CurrencyId;
      this.modelColumns = ['Select','Model','Body Type','Fuel Type','Transmission','WeightKg'];
      let vehicleList = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleList) this.vehicleDetailsList = vehicleList;
      this.form = new FormGroup({});
      this.model = { };
      this.productItem = new ProductData();
      if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
      else this.issuerSection = false
      if(this.userType=='Issuer' )this.getSourceList();
    // this.getCountryCode();
    // this.getInsurenceType();
    // this.getInsurenceClass();
    // this.getMotorUsageList();
    // this.getBodyType();
    // this.years = this.getYearList();
  }
  ngOnInit(): void {
    this.productItem.CarAlarmYN = 'N';
    this.productItem.GpsYN = 'N';
    this.productItem.ClaimsYN = 'N';
    this.yearList = this.getYearList();
    this.getCurrencyList();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.policyStartDate = this.datePipe.transform(new Date(year, month, day),'dd/MM/yyyy');
    this.policyEndDate = this.datePipe.transform(new Date(year + 1, month, day-1),'dd/MM/yyyy');
    this.onGetFormControl();
  }
  onGetFormControl(){
    this.fields = [];this.fields2 =[];
    let fireData:any=null,fireData2:any=null;
    if(this.insuranceId=='100019'){
      fireData2 = new MotorShotQuoteCustomerUganda();
      fireData = new MotorShotQuoteUganda();
    }
    if(this.insuranceId=='100004'){
      fireData2 = new MotorShotQuoteCustomerMadison();
      fireData = new MotorShotQuoteMadison();
    }
    else if(this.insuranceId=='100027'){
      fireData2 = new ShortQuoteCustomerSanlam();
      fireData = new ShortQuoteSanlam();
    }
    else if(this.insuranceId=='100028'){
      fireData2 = new MotorShotQuoteCustomerEagle();
      fireData = new MotorShotQuoteEagle();
    }
    else if(this.insuranceId=='100040'){
      fireData2 = new MotorShortQuoteCustomerIvory();
      fireData = new MotorShortQuoteIvory();
    }
    else if(this.insuranceId=='100042'){
      fireData2 = new ShortQuoteCustomerBurkina();
      fireData = new ShortQuoteSanlamBurkina();
    }
    this.fields2[0] = fireData2?.fields;
    this.fields[0] = fireData?.fields;
    
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.form.controls['InsuranceType'].valueChanges.subscribe(() => {
          if(this.insuranceId == '100040')  this.getInsuranceTypeListIvory();
        });
      } }
      
      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004' || this.insuranceId=='100027' || this.insuranceId=='100040' || this.insuranceId=='100028' || this.insuranceId=='100004'){
        let regionHooks2 ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.onChangeInsuranceClass('change')
          });
        } 
       }
       let regionHooks5 ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.onChangeMotorUsage('direct');
              this.getMotorTypeList('change',null,null);
              if(this.insuranceId=='100040'){
                this.getInsuranceClassList();
              }
            });
          } 
        } 
       let regionHooks3 ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onBodyTypeChange('change');
         
        });
        }} 
        let regionHooks4 ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.onMakeChange();
          });
        }} 
        let regionHooks6 ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.onModelChange('change');
          });
        }} 
        let changevehicleHooks = {
          onInit: (field: FormlyFieldConfig) => {
            console.log("Field Details",field,this.productItem)
            field.form.controls['VehicleValue'].valueChanges.subscribe(() => {
               this.productItem.VehicleValue=field.form.controls['VehicleValue'].value
                 this.onchangevehicleValue(null);
              });
          }
          
        };
        //if(this.insuranceId!='100004') {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
          for(let field of fieldList){
            if(field.key=='InsuranceType') field.hooks = regionHooks;
            if(field.key=='ManufactureYear' && this.yearList.length!=0) field.props.options= defaultObj.concat(this.yearList);
            if(field.key=='MotorUsage'){field.hooks = regionHooks5;}
            if(field.key=='BodyType'){ field.hooks = regionHooks3;}
            if(field.key=='Make'){ field.hooks = regionHooks4;}
            if(field.key=='Model'){ field.hooks = regionHooks6;}
            if(field.key=='VehicleValue'){field.hooks=changevehicleHooks;}
            if(field.key=='InsuranceClass' && this.insuranceId=='100028'){field.hooks = regionHooks2;}
            else if(field.key=='InsuranceType'  && this.insuranceId!='100028') field.hooks = regionHooks;
          }
        // }
        // else this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks2;
      }
      

if( this.insuranceId=='100040' || this.insuranceId=='100042') this.getInsuranceTypeAltList()
  else{this.getInsuranceTypeList();this.getInsuranceClassList();}
      this.getMotorUsageList(null,'change');
      this.getMobileCodeList();
      let customerReferenceNo =  sessionStorage.getItem('customerReferenceNo');
      if(customerReferenceNo){

        this.customerReferenceNo = customerReferenceNo;
        this.getCustomerDetails();
      }
      let quoteReferenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(quoteReferenceNo){
        this.quoteRefNo = quoteReferenceNo;
        this.getmotorDetails();
      }
      if(this.insuranceId=='100027' || this.insuranceId=='100040'){
        this.getType1();
        this.getType2();
        this.getType3();
      }
      this.appComp.getLanguage().subscribe((res:any)=>{  
        if(res) this.lang=res;
        else this.lang='en';
        this.translate.setDefaultLang(this.lang);this.checkFieldNames();
        });
      if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
      else this.lang='en';
      sessionStorage.setItem('language',this.lang);this.checkFieldNames();
      this.translate.setDefaultLang(sessionStorage.getItem('language'));}
  }
  checkFieldNames(){
    if(this.fields.length!=0){
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let i=0;
      for(let field of fieldList){
        let key =null;
        if(field.id) key=field.id
        else key = field.key
        this.translate.get('MOTORQUOTE.'+key).subscribe((translation: string) => {
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
            // if(field.templateOptions.options){
            //   for(let entry of field.templateOptions.options){
            //     if(entry.CodeDescLocal==null || entry.CodeDescLocal==undefined){
            //       entry['CodeDescLocal'] = 'Other';
            //     }
            //     if(this.lang=='en') entry['label'] = entry.CodeDesc
            //     else entry['label'] = entry.CodeDescLocal
            //   }
            // }
          }
        });
        i+=1;
        if(i==fieldList.length)  console.log('Final Field Lang',fieldList);
      }
    }
  }
  getInsuranceTypeListIvory(){
    let ReqObj=null,urlLink=null;
      ReqObj = {
        
        "CompanyId":this.insuranceId,
        "ProductId":this.productId,
        "IndustryType":this.productItem.InsuranceType,
      }
      urlLink = `${this.CommonApiUrl}api/getByIndsutryType`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.typeListIvory = data.Result;
            console.log(this.typeListIvory,"this.typeListthis.typeList");
            
            if(this.typeListIvory.length!=0){
              let i=0;
              let defaultObj = [{'label':'---Select--','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
              for (let entry of this.typeListIvory) {
                entry['label'] = entry.CodeDesc
                entry['value'] = entry.Code;
                i+=1;
                if (i == this.typeListIvory.length) {
                  console.log("final list",this.typeListIvory)
                  if(this.fields.length!=0){
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                      for(let field of fieldList){
                        if(field.key=='InsuranceClass'){
                              field.props.options = defaultObj.concat(this.typeListIvory);
                              this.checkFieldNames();
                        }
                      }
                    }  
                  //this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.typeListIvory);
                  //this.checkFieldNames();
                }
              }
            }
        }

      },
      (err) => { },
    );
  }
  onSourceTypeChange(type){
    this.sourceCodeDesc = null;
    if(this.Code!=null && this.Code!='' && this.Code!=undefined){
      let entry = this.sourceTypeList.find(ele=>ele.Code==this.Code);
      if(entry) this.sourceCodeDesc = entry?.CodeDesc;
    }
    let ReqObj = {
      "SourceType": this.sourceCodeDesc,
      "BranchCode":  this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.brokerList = data.Result;
          if(type=='change'){
            this.customerCode = null;
            this.customerName=null;
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
          }
          else{
            //if(this.Code=='Broker' || this.Code=='Agent'){
              
              let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
              if(entry){
                console.log("Found Entries",this.brokerCode,entry,this.Code)
                this.brokerLoginId = entry.Name; 
                // this.updateComponent.brokerLoginId = this.brokerLoginId;
                // this.updateComponent.brokerCode = this.brokerCode;
              }
              if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp' || this.sourceCodeDesc == 'Whatsapp'){
                if(type=='change'){
                  // this.updateComponent.CustomerCode = null;
                  // this.updateComponent.CustomerName = null;
                }
                this.getBrokerBranchList('direct');
                this.commonSection = true;
              }
              else this.onGetCustomerList('direct',this.customerCode);
            // }
            // else if(this.brokerCode){
            //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
            //  if(entry){
            //   this.brokerLoginId = entry.Name; 
            //   this.brokerBranchCode = null;
            //   this.updateComponent.brokerCode = this.brokerCode;
            //   this.updateComponent.brokerLoginId = this.brokerLoginId;
            //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
            //  }
             
            // }
          }
          
      },
      (err) => { },
    );
  }
  getBrokerBranchList(type){
    let urlLink = `${this.ApiUrl1}api/brokerbranches`;
    let ReqObj = {
      "BrokerCode": this.brokerCode,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
  }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerBranchList = data?.Result;
            if(this.brokerBranchList.length==1){
              this.brokerBranchCode = this.brokerBranchList[0].Code;
              if(type=='change'){

              }
            }
            
          }
        },
        (err) => { },
      );
  }
  onGetCustomerList(type,code){
    console.log("Search",code);
    if(this.userType=='Issuer'){
      if(code!='' && code!=null && code!=undefined){
        let branch = null;
        if(this.userType=='issuer'){branch = this.brokerBranchCode;}
        else branch = this.branchCode
        let ReqObj = {
          "SourceType": this.sourceCodeDesc,
          "BranchCode":  branch,
          "InsuranceId": this.insuranceId,
          "SearchValue":code
        }
        let urlLink = `${this.customApiUrl1}api/search/premiabrokercustomercode`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
                this.customerList = data.Result;
                if(data.Result.length!=0){
                  
                }
                if(type=='change'){
                  this.showCustomerList = true;
                  this.customerName = null;
                }
                else{
                  this.showCustomerList = false;
                  let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                  this.customerName = entry.Name;
                  this.setCustomerValue(this.customerCode,this.customerName,'direct')
                }
                
          },
          (err) => { },
        );
      }
      else{
        this.customerList = [];
      }
    }
    else{
      this.customerCode = this.userDetails.Result.CustomerCode;
        this.customerName = this.userDetails.Result.UserName;
        this.commonSection = true;
    }
    
  }
  setCustomerValue(code,name,type){
    this.showCustomerList = false;
      this.customerCode = code;
      this.customerName = name;
      if(this.issuerSection){
        this.brokerCode = null;
          this.brokerBranchCode = null;
          this.brokerLoginId = name;
          this.commonSection = true;
      }
  }
  getCustomerDetails(){
    let ReqObj = {
			"CustomerReferenceNo": this.customerReferenceNo
		}
		let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					let customerDetails = data.Result;
          this.productItem.CustomerName = customerDetails?.ClientName;
          this.productItem.MobileCode = customerDetails?.MobileCode1;
          this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;
          this.productItem.Title = customerDetails.Title;
          let fieldList = this.fields2[0].fieldGroup[0].fieldGroup;
          for(let field of fieldList){
            if(field.key=='CustomerName') field.formControl.setValue(customerDetails?.ClientName);
            if(field.key=='MobileCode') field.formControl.setValue(customerDetails?.MobileCode1);
            if(field.key=='MobileNo') field.formControl.setValue(customerDetails?.MobileNo1);
            this.checkFieldNames();
          }
        }
      },
      (err) => { },
    );
  }
  getmotorDetails(){
    let ReqObj =  {
      "RequestReferenceNo": this.quoteRefNo,
       "Idnumber": null,
      "Vehicleid": '1'
     }
     let urlLink = `${this.motorApiUrl}api/getmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.motordetails = data.Result;
        this.editSection = true;
        let vehicleDetails = data.Result;
        this.editMotorUsageSection = true;
        this.motorUsageValue = vehicleDetails.Motorusage;
        this.productItem.MotorUsage = vehicleDetails.Motorusage;
        this.bodyTypeId = vehicleDetails.VehicleType;
        this.productItem.BodyType = vehicleDetails.VehicleType;
        if(vehicleDetails.SourceTypeId!=null) this.Code = vehicleDetails?.SourceTypeId;
        this.branchCode = vehicleDetails?.BranchCode;
        this.brokerBranchCode = vehicleDetails?.BrokerBranchCode;
        this.customerCode = vehicleDetails?.CustomerCode;
        this.brokerCode = vehicleDetails?.BrokerCode;
        this.onSourceTypeChange('direct');
        if(vehicleDetails?.Insurancetype!=null && vehicleDetails?.Insurancetype!=''){
          if(Array.isArray(vehicleDetails?.Insurancetype)){
            if(vehicleDetails?.Insurancetype.length!=0) this.productItem.InsuranceType = vehicleDetails.Insurancetype[0]; 
          }
          // if(this.vehicleDetails?.Insurancetype.length!=0){
          //   this.productItem.InsuranceType = this.vehicleDetails?.Insurancetype;
          // }
        }
        this.productItem.InsuranceClass = vehicleDetails?.InsuranceClass;
        this.productItem.Make = vehicleDetails.Vehiclemake;
        this.productItem.MakeDesc = vehicleDetails.VehiclemakeDesc;
        this.productItem.ModelId = vehicleDetails.Vehcilemodel;
        this.productItem.ManufactureYear = vehicleDetails.ManufactureYear;
        this.productItem.ChassisNo = vehicleDetails.Chassisnumber;
        this.productItem.VehicleSI = vehicleDetails.SumInsured;
        this.productItem.WindScreenSumInsured = vehicleDetails.WindScreenSumInsured;
        this.productItem.TppdIncreaeLimit = vehicleDetails.TppdIncreaeLimit;
        this.productItem.AcccessoriesSumInsured = vehicleDetails.AcccessoriesSumInsured;
        this.productItem.Registrationnumber = vehicleDetails.Registrationnumber;
        this.productItem.ClaimsYN = vehicleDetails.NcdYn;
        this.productItem.GpsYN = vehicleDetails.Gpstrackinginstalled;
        this.productItem.CarAlarmYN = vehicleDetails.CarAlarmYn;
      
        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for(let field of fieldList){
            if(field.key=='InsuranceType'){
              field.formControl.setValue(vehicleDetails?.Insurancetype[0]);
            }
            if(field.key=='InsuranceClass') field.formControl.setValue(vehicleDetails?.InsuranceClass);
            if(field.key=='BodyType') field.formControl.setValue(vehicleDetails?.VehicleType);
            if(field.key=='MotorUsage') field.formControl.setValue(vehicleDetails?.Motorusage);
            if(field.key=='Make') field.formControl.setValue(vehicleDetails?.Vehiclemake);
            if(field.key=='ModelId') field.formControl.setValue(vehicleDetails?.Vehcilemodel);
            if(field.key=='ManufactureYear') field.formControl.setValue(vehicleDetails?.ManufactureYear);
            if(field.key=='ChassisNo') field.formControl.setValue(vehicleDetails?.Chassisnumber);
            if(field.key=='VehicleSI') field.formControl.setValue(vehicleDetails?.SumInsured);
            if(field.key=='WindScreenSumInsured') field.formControl.setValue(vehicleDetails?.WindScreenSumInsured);
            if(field.key=='TppdIncreaeLimit') field.formControl.setValue(vehicleDetails?.TppdIncreaeLimit);
            if(field.key=='AcccessoriesSumInsured') field.formControl.setValue(vehicleDetails?.AcccessoriesSumInsured);
            if(field.key=='Registrationnumber') field.formControl.setValue(vehicleDetails?.Registrationnumber);
            if(field.key=='ClaimsYN') field.formControl.setValue(vehicleDetails?.NcdYn);
            if(field.key=='GpsYN') field.formControl.setValue(vehicleDetails?.Gpstrackinginstalled);
            if(field.key=='CarAlarmYn') field.formControl.setValue(vehicleDetails?.CarAlarmYn);
          }
        this.onViewCalc();
      },
      (err) => { },
    );
  }
  getSourceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    //let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    let urlLink = `${this.CommonApiUrl}dropdown/getsourcetype`; 
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.sourceTypeList = data.Result;
        }
      },

      (err) => { },
    );
  }
  onBrokerChange(){
    let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
    if(entry){
      this.brokerLoginId = entry.Name; 
    }
    this.getBrokerBranchList('change');
  }
  getCurrencyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productcurrency`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.currencyList = data.Result;
             if(this.currencyCode){
            //   if(this.currencyList.some(ele=>ele.Code==this.currencyCode)){
                this.onCurrencyChange('direct');
                console.log('currency Details 888',this.currencyCode);
              // }
              // else this.currencyCode=this.currencyList[0].Code
            }
            else if(this.currencyList.length==1){
            this.currencyCode=this.currencyList[0].Code;
            this.onCurrencyChange('direct');
          }
        }

      },
      (err) => { },
    );
  }
  onBuyQuote(){
    sessionStorage.setItem('customerReferenceNo',this.customerReferenceNo);
    sessionStorage.setItem('QuoteType','SQ');
    if(this.productItem.Title==null || this.productItem.Title=='' || this.productItem.Title==undefined) this.router.navigate(['customer/create']);
    else this.router.navigate(['/policyDetails']);
  }
  onCurrencyChange(type){
    let currencyData 
    if(this.currencyCode!=null && this.currencyCode!=''){
      console.log('Currency Listss',this.currencyList);
      if(this.currencyList.length!=0){
        currencyData = this.currencyList.find(ele=>ele.Code==this.currencyCode);
        if(currencyData){
          this.exchangeRate = currencyData?.ExchangeRate;
          this.minCurrencyRate = currencyData?.MinRate;
          this.maxCurrencyRate = currencyData?.MaxRate;
        }
        else{
          this.currencyCode= this.currencyList[0]?.Code;
          this.exchangeRate =this.currencyList[0]?.ExchangeRate;
          this.minCurrencyRate = this.currencyList[0]?.MinRate;
          this.maxCurrencyRate = this.currencyList[0]?.MaxRate;
        }
      }
      
    }
    console.log('CCCCCCCC',this.currencyCode)

    if(this.currencyCode=="TZS")
    {
      // this.editSection=false;
    }
    else{
      // this.editSection=true;
    }
    //if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    if(type=='change' && this.quoteRefNo!=null){
      // this.updateComponent.ModifiedCurrencyYN = 'Y';
    }
    if(type=='change'){
      if(this.vehicleDetailsList.length!=0){
        for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
      }
    }
  }
  onBodyTypeChange(type){
    if(this.productItem.BodyType!=null && this.productItem.BodyType!=''){
      let fieldList =  this.fields[0].fieldGroup[0].fieldGroup;
      for(let field of fieldList){
        if(field.key=='Model'){
            if(this.productItem.BodyType=='1' || this.productItem.BodyType=='2' || this.productItem.BodyType=='3' || this.productItem.BodyType=='' || this.productItem.BodyType==null){  field.hideExpression = false;field.hide=false; }
            else{ field.hideExpression = true;field.hide=true; }
        }
        else if(field.key=='ModelDesc'){
          if((this.productItem.BodyType!='1' && this.productItem.BodyType!='2' && this.productItem.BodyType!='3' && this.productItem.BodyType!='' && this.productItem.BodyType!=null) || this.productItem.Model=='99999'){  field.hideExpression = false;field.hide=false; }
            else{ field.hideExpression = true;field.hide=true; }
        }
      }
     
      if(this.motorTypeList.length!=0) this.bodyTypeId = this.motorTypeList.find(ele=>ele.CodeDesc==String(this.productItem.BodyType) || ele.Code==String(this.productItem.BodyType))?.Code;
      else this.bodyTypeId= this.productItem.BodyType
      if(type=='change' && this.insuranceId!='100020' && !this.editSection){this.productItem.MakeId=null;this.productItem.ModelId=null;}
      if(this.bodyTypeId && this.insuranceId!='100020'){ this.getMakeList(); } 
      if(this.editSection && this.motorTypeList.length!=0) this.editSection = false;
    }
  }
  onMakeChange(){
    console.log("on make change",this.makeValue);
    if(this.productItem.Make!='' && this.productItem.Make!=null){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "BodyId": this.productItem.BodyType,
        "MakeId": this.productItem.Make
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/motormakemodel`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.modelList = data.Result;
              if(this.modelList.length!=0){
                let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
                for (let i = 0; i < this.modelList.length; i++) {
                  this.modelList[i].label = this.modelList[i]['CodeDesc'];
                  this.modelList[i].value = this.modelList[i]['Code'];
                  if (i == this.modelList.length - 1) {
                    if(this.fields.length!=0){
                      let fieldList =  this.fields[0].fieldGroup[0].fieldGroup;
                      for(let field of fieldList){
                        if(field.key=='Model'){
                          field.props.options =  defaultObj.concat(this.modelList);
                          this.checkFieldNames();
                          if(this.motordetails){
                            if(this.productItem.BodyType=='1' || this.productItem.BodyType=='2' || this.productItem.BodyType=='3' || this.productItem.BodyType=='' || this.productItem.BodyType==null){
                              field.hideExpression = false;field.hide=false;
                            }
                            else{
                              field.hideExpression = true;field.hide=true;
                            }
                            field.formControl.setValue(this.motordetails?.Vehcilemodel);
                            let entry = this.modelList.find(ele=>ele.CodeDesc==this.motordetails?.Vehcilemodel || ele.Code==this.motordetails?.Vehcilemodel);
                            if((entry==null || entry==undefined) && (this.motordetails?.Vehcilemodel!=null && this.motordetails?.Vehcilemodel!=undefined)){
                                this.productItem.Model = '99999';
                                this.productItem.ModelDesc = this.motordetails?.Vehcilemodel;
                            }
                            else this.productItem.Model = entry.Code;
                          }
                        }
                        else if(field.key=='ModelDesc'){
                          if((this.productItem.BodyType!='1' && this.productItem.BodyType!='2' && this.productItem.BodyType!='3' && this.productItem.BodyType!='' && this.productItem.BodyType!=null) || this.productItem.Model=='99999'){  field.hideExpression = false;field.hide=false; }
                            else{ field.hideExpression = true;field.hide=true; }
                          
                        }
                      };
                    }
                  }
                }
              }
          }
        },
        (err) => { },
      );
    }
  }
  onModelChange(type){
    if(this.productItem.Model!=null && this.productItem.Model!=''){
      if(this.productItem.Model!='99999'){
        this.productItem.ModelDesc = this.modelList.find(ele=>ele.CodeDesc==this.productItem.Model)?.CodeDesc;
      }
      if(type=='change' && this.productItem.Model!='99999'){
        this.productItem.ModelDesc = null
      }
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
      for(let field of fieldList){
        let fieldList =  this.fields[0].fieldGroup[0].fieldGroup;
        for(let field of fieldList){
          if(field.key=='Model'){
              if(this.productItem.BodyType=='1' || this.productItem.BodyType=='2' || this.productItem.BodyType=='3' || this.productItem.BodyType=='' || this.productItem.BodyType==null){  field.hideExpression = false;field.hide=false; }
              else{ field.hideExpression = true;field.hide=true; }
          }
          else if(field.key=='ModelDesc'){
            if((this.productItem.BodyType!='1' && this.productItem.BodyType!='2' && this.productItem.BodyType!='3' && this.productItem.BodyType!='' && this.productItem.BodyType!=null) || this.productItem.Model=='99999'){  field.hideExpression = false;field.hide=false; }
              else{ field.hideExpression = true;field.hide=true; }
          }
        }
      }
    }
  }
  getYearList(){
    var d = new Date();
    var year = d.getFullYear();
    const currentYear = new Date().getFullYear()-20, years = [];
    while ( year >= currentYear ) {
      let yearEntry = year--
      years.push({"Code":String(yearEntry),'label':String(yearEntry),"value":String(yearEntry),"CodeDesc":String(yearEntry)});
    }   
    return years;
  }
  getMakeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/motormake`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.makeList = data.Result;
            if(this.makeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.makeList.length; i++) {
                this.makeList[i].label = this.makeList[i]['CodeDesc'];
                this.makeList[i].value = this.makeList[i]['Code'];
                if (i == this.makeList.length - 1) {
                  if(this.fields.length!=0){
                    let fieldList =  this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='Make'){
                            field.props.options =  defaultObj.concat(this.makeList);
                            this.checkFieldNames();
                           
                      }
                    };
                  }
                }
              }
            }
        }
      },
      (err) => { },
    );
  }
  getInsuranceTypeList(){
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.typeList = data.Result;
            if(this.typeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.typeList.length; i++) {
                this.typeList[i].label = this.typeList[i]['CodeDesc'];
                this.typeList[i].value = this.typeList[i]['Code'];
                if (i == this.typeList.length - 1) {
                  if(this.fields.length!=0){let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='InsuranceType' && this.insuranceId!='100028') field.props.options = defaultObj.concat(this.typeList);
                      else if(field.key=='InsuranceClass' && this.insuranceId=='100028') field.props.options = defaultObj.concat(this.typeList);
                      this.checkFieldNames();
                    }
                  }
                }
              }
            }
        }

      },
      (err) => { },
    );
  }
  getInsuranceClassList(){
    let loginId = null;
    if(this.userType!='Issuer'){
      this.subuserType = sessionStorage.getItem('typeValue');
      if(this.subuserType=='B2C') loginId = 'guest';
      else{
      loginId=this.loginId;
      }
    }
    else{
      loginId=this.loginId
        if(this.vehicleDetailsList.length!=0) loginId = this.vehicleDetailsList[0].LoginId;
        //if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
    }
    let ReqObj = null,urlLink=null;
    if(this.insuranceId=='100040'){
      ReqObj = {
        "CompanyId":this.insuranceId,
        "ProductId":this.productId,
        "IndustryType":this.productItem.MotorUsage,
      }
      urlLink = `${this.CommonApiUrl}api/getByIndsutryType`;
    }
    else{
      ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "BranchCode": this.branchCode,
        "LoginId":loginId
      }
      urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.classList = data.Result;
            if(this.insuranceId!='100027' && this.insuranceId!='100040'){
              if(this.classList.length!=0){
                let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
                for (let i = 0; i < this.classList.length; i++) {
                  this.classList[i].label = this.classList[i]['CodeDesc'];
                  this.classList[i].value = this.classList[i]['Code'];
                  if (i == this.classList.length-1) {
                   
                      console.log("Dropdown List",this.fields)
                      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004' || this.insuranceId=='100040'){
                        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fieldList){
                          console.log('Field ',field)
                          if(field.key=='InsuranceClass'){
                            field.props.options= defaultObj.concat(this.classList);
                            this.checkFieldNames();
                          }
                        }
                      }
                  }
                }
              }
            }
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
          let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
          this.mobileCodeList = data.Result;
          for (let i = 0; i < this.mobileCodeList.length; i++) {
            this.mobileCodeList[i].label = this.mobileCodeList[i]['CodeDesc'];
            this.mobileCodeList[i].value = this.mobileCodeList[i]['Code'];
            if (i == this.mobileCodeList.length - 1) {
              let fieldList = this.fields2[0].fieldGroup[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='MobileCode'){
                  field.props.options= defaultObj.concat(this.mobileCodeList);
                  this.checkFieldNames();
                  if(this.mobileCodeList.length==1){
                    field.formControl.setValue(this.mobileCodeList[0].Code);
                    this.productItem.MobileCode = this.mobileCodeList[0].Code;
                    
                  }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getType1(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DEDUCTIBLES"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.deductiblesList = data.Result;
            if(this.deductiblesList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.deductiblesList.length; i++) {
                this.deductiblesList[i].label = this.deductiblesList[i]['CodeDesc'];
                this.deductiblesList[i].value = this.deductiblesList[i]['Code'];
                if (i == this.deductiblesList.length - 1) {
                    console.log("Dropdown List",this.fields)
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='Deductibles'){
                        field.props.options = defaultObj.concat(this.deductiblesList);
                        this.checkFieldNames();
                      }
                    }
                }
              }
            }
        }
      },
      (err) => { },
    );
  }

  getType2(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DEFENCE_COST"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.defencecostList = data.Result;
            if(this.defencecostList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.defencecostList.length; i++) {
                this.defencecostList[i].label = this.defencecostList[i]['CodeDesc'];
                this.defencecostList[i].value = this.defencecostList[i]['Code'];
                if (i == this.defencecostList.length - 1) {
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='DefenceCost'){
                        field.props.options = defaultObj.concat(this.defencecostList);
                        this.checkFieldNames();
                      }
                    }
                }
              }
            }
        }
      },
      (err) => { },
    );
  }

  getType3(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "VEHICLE_VALUE_TYPE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.vehicleTypeList = data.Result; 
            if(this.vehicleTypeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.vehicleTypeList.length; i++) {
                this.vehicleTypeList[i].label = this.vehicleTypeList[i]['CodeDesc'];
                this.vehicleTypeList[i].value = this.vehicleTypeList[i]['Code'];
                if (i == this.vehicleTypeList.length - 1) {
                    console.log("Dropdown List",this.fields)
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='VehicleValue'){
                        field.props.options = defaultObj.concat(this.vehicleTypeList);
                        this.checkFieldNames();
                      }
                    }
                }
              }
            }
        }
      },
      (err) => { },
    );
  }
  getMotorUsageList(vehicleValue,type){
    let sectionId = null;
    this.productItem.MotorUsage = this.motorUsageValue;
    console.log("ProductItem",this.productItem)
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorUsageList = data.Result;
            if(this.motorUsageList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':null,'CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorUsageList.length; i++) {
                this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
                this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
                if (i == this.motorUsageList.length - 1) {
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='MotorUsage'){
                        if(vehicleValue==null && type!='direct'){
                          if(this.motorUsageValue) this.productItem.MotorUsage = this.motorUsageValue;
                          let entry = this.motorUsageList.some(ele=>ele.Code==this.productItem.MotorUsage || ele.CodeDesc==this.productItem.MotorUsage);
                          if(!entry){
                            this.productItem.MotorUsage='';field.formControl.setValue(''); this.motorUsageValue='';this.motorUsageType=type;
                          }
                        }
                        else{
                          field.formControl.setValue(vehicleValue);this.motorUsageType=type;}
                          field.props.options= defaultObj.concat(this.motorUsageList);
                          this.checkFieldNames();
                      }
                    }
                }
              }
            }
            this.motorUsageValue = vehicleValue;
            // if(vehicleValue==null && type!='direct'){
            //   this.productItem.MotorUsage = null;
            //   console.log(this.fields)
            // }
            // else{
            //   this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
            // }
            if(this.insuranceId!='100028') this.productItem.MotorUsage = vehicleValue;
            if(this.motordetails && this.motorUsageList.length!=0 && this.motorUsageValue==null){
              let value = this.motorUsageList.find(ele=>ele.CodeDesc == this.motordetails?.Motorusage || ele.Code==this.motordetails?.Motorusage);
              if(value){ this.motorUsageValue = value.Code;this.productItem.MotorUsage = value.Code;}
              else this.productItem.MotorUsage = this.motordetails.Motorusage;
            }
            
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.Motorusage);
            //   if(value){ this.motorUsageValue = value.Code}
            // }

            //this.getMotorUsageList();
        }

      },
      (err) => { },
    );
  }
  onChangeInsuranceClass(type){
    if(this.insuranceId=='100004'){ this.productItem.InsuranceType = this.productItem.InsuranceClass; this.classValue=this.productItem.InsuranceClass;}
    if(this.insuranceId=='100028')this.productItem.InsuranceType = this.productItem.InsuranceClass;
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){
      if(field.key=='GpsYN' || field.key=='CarAlarmYN'){
        if(this.productItem.InsuranceClass!='' && this.productItem.InsuranceClass!=null && this.productItem.InsuranceClass!=undefined){
          if(this.productItem.InsuranceClass=='1'){
            field.hideExpression = false;field.hide=false;  
            if(this.productItem.GpsYN==null || this.productItem.GpsYN=='') this.productItem.GpsYN = 'N';
            if(this.productItem.CarAlarmYN==null || this.productItem.CarAlarmYN=='') this.productItem.CarAlarmYN = 'N';
          }
          else{ field.hideExpression = true;field.hide=true;
            if(this.productItem){
              this.productItem.GpsYN = 'N';
              this.productItem.CarAlarmYN = 'N';
            }
          }
        }
      }
      if(field.key=='InsuranceType'  && (this.insuranceId=='100028' || this.insuranceId=='100027' || this.insuranceId=='100040') && this.vehicleDetailsList.length==1){
        field.hideExpression = true;field.hide=true;
      }
      if(field.key=='VehicleSI' || field.key=='AccessoriesSI' || field.key=='WindShieldSI' || field.key=='ExtendedTPPDSI'){
        if(this.insuranceId=='100028' && this.vehicleDetailsList.length==1){
          field.hideExpression = false;field.hide=false;
        }
        else if(this.insuranceId!='100027'){
          field.hideExpression = true;field.hide=true;
        }
        if(this.productItem.InsuranceClass!='' && this.productItem.InsuranceClass!=null && this.productItem.InsuranceClass!=undefined){
          if(this.productItem.InsuranceClass=='104' || this.productItem.InsuranceClass=='103'){
                field.hideExpression = false;field.hide=false;
            }
            else{ 
              this.productItem.VehicleSI = null;
              this.productItem.WindShieldSI = null;
              this.productItem.Accessories 
              field.hideExpression = true;field.hide=true;}
        }
        else if(this.insuranceId!='100027'){
          field.hideExpression = true;field.hide=true;
        }
      }
    }
  }
  onChangeMotorUsage(type){
    if(this.productItem.MotorUsage!=null && this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined){
     let entry = this.motorUsageList.find(ele=>ele.CodeDesc==this.productItem.MotorUsage || ele.Code==this.productItem.MotorUsage);
     console.log("Filtered Obj",entry)
     if(entry){  
          let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}]; 
           let bodyTypeStatus = entry?.BodyType;
           if(this.insuranceId=='100027' || this.insuranceId=='100040' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020'){
            let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
            for(let field of fieldList){
              if(field.key=='BodyType'){
                let typeList = this.motorTypeList.filter(ele=>ele.BodyType==bodyTypeStatus)
                field.props.options = defaultObj.concat(typeList);
                this.checkFieldNames();
              }
            }
          }
           if(type=='change') this.bodyTypeValue = null;
         }
   }
  }
  onchangevehicleValue(data){
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){
        if(this.productItem.VehicleValue==1 || this.productItem.VehicleValue=='1'){
          if(field.key =='Marketvalue' ||field.key =='Aggregatedvalue' || field.key =='VehicleSI' ){
          
          if(data && field.formControl) field.formControl.setValue(data.MarketValue)
            if(field.key =='Marketvalue'){field.hideExpression = false;field.hide=false; } 
            if(field.key =='Aggregatedvalue' || field.key =='VehicleSI' ){
              field.hideExpression = true;field.hide=true;
            }
          }
        // if(){
           
        // }
      }
      if(this.productItem.VehicleValue==2 || this.productItem.VehicleValue=='2'){
          if(field.key =='Aggregatedvalue' ){
            if(data && field.formControl && field.key =='Aggregatedvalue') field.formControl.setValue(data.AggregatedValue)
            field.hideExpression = false;field.hide=false;
            this.getAggregatedList(); 
          }
           if(field.key =='Marketvalue' || field.key =='VehicleSI'){
            field.hideExpression = true;field.hide=true;  
          }
      }
      else {
        if(this.productItem.VehicleValue){
         if(this.productItem.VehicleValue=='1'){
          if(field.key =='Marketvalue'){
           field.hideExpression = false;field.hide=false;
          }
         }
         else{
           if ( field.key =='Aggregatedvalue' && (this.productItem.VehicleValue=='2' || this.productItem.VehicleValue==2)){
             this.getAggregatedList(); 
             field.hideExpression = false;field.hide=false;
            }
         }
         
        }
        else if(field.key =='Marketvalue' || field.key =='Aggregatedvalue' || field.key =='VehicleSI'){
           field.hideExpression = true;field.hide=true; 
         }
     }
      // if (field.form && field.form.controls['Marketvalue']) {

      // }
      //  if(field.key =='Marketvalue' || field.key =='Aggregatedvalue' || field.key =='VehicleSI'){
      //   field.hideExpression = true;field.hide=true; 
      // }
  }
  }
  getAggregatedList(){
    let ReqObj=null,urlLink=null;
      ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
      }
      urlLink = `${this.CommonApiUrl}dropdown/aggregatedValue`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
              this.aggregatedList = data.Result;
              if(this.aggregatedList.length!=0){
                let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
                for (let i = 0; i < this.aggregatedList.length; i++) {
                  this.aggregatedList[i].label = this.aggregatedList[i]['CodeDesc'];
                  this.aggregatedList[i].value = this.aggregatedList[i]['Code'];
                  if (i == this.aggregatedList.length - 1) {
                    if(this.fields.length!=0){
                      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                      for(let field of fieldList){
                        if(field.key=='Aggregatedvalue'){  field.props.options = defaultObj.concat(this.aggregatedList);this.checkFieldNames();}
                      }
                    }
                  }
                }
              }
          }
      });            
  }
  getMotorTypeList(type,motorValue,vehicleUsage){
    if(this.insuranceId=='100027' || this.insuranceId=='100040' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.typeValue=='100020') this.typeValue = this.productItem.InsuranceType;
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/induvidual/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(type=='change'){
            this.cityValue = null;
              if(this.insuranceId=='100027' || this.insuranceId=='100040' || this.insuranceId=='100028'){
                this.productItem.InsuranceClass = this.productItem?.InsuranceType
                this.classValue = this.typeValue;
              } 
            } 
            this.motorTypeList = data.Result;
            if(type=='direct' && !this.editSection){ this.bodyTypeValue = motorValue; this.productItem.BodyType = motorValue;}
            else if(this.insuranceId!='100027' && this.insuranceId!='100040') this.bodyTypeValue = motorValue;
            if(this.motordetails && this.motorTypeList.length!=0 && this.bodyTypeValue==null){
              let value = this.motorTypeList.find(ele=>ele.Code == this.motordetails?.VehicleType || ele.CodeDesc == this.motordetails?.VehicleType);
              if(value){ this.bodyTypeValue = value.Code;}
            }
            if(this.motorTypeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorTypeList.length; i++) {
                this.motorTypeList[i].label = this.motorTypeList[i]['CodeDesc'];
                this.motorTypeList[i].value = this.motorTypeList[i]['Code'];
                if (i == this.motorTypeList.length - 1) {
                  if(this.motordetails && this.editSection) this.onBodyTypeChange('direct');
                  if(this.insuranceId=='100027' || this.insuranceId=='100040' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004'){
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='VehicleSI' || field.key=='AccessoriesSI' || field.key=='WindShieldSI' || field.key=='ExtendedTPPDSI'){
                        
                        if(this.insuranceId=='100027' || this.insuranceId=='100040'){
                          if(this.vehicleDetailsList.length==1){
                            field.hideExpression = false;field.hide=false;
                          }
                          else if(this.productItem.InsuranceType=='102' || this.productItem.InsuranceType=='95'){
                            field.hideExpression = true;field.hide=true;
                          }
                          else{field.hideExpression = false;field.hide=false;}
                        }
                        else if(this.insuranceId=='100028'){
                          if(this.vehicleDetailsList.length==1){
                            field.hideExpression = false;field.hide=false;
                          }
                          else if(this.productItem.InsuranceType=='104'){
                              field.hideExpression = false;field.hide=false;
                          }
                          else{field.hideExpression = true;field.hide=true;}
                        }
                      }
                      if(field.key=='BodyType'){
                        if(this.motorTypeList.length!=0 && this.productItem.MotorUsage!=null && this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined){
                          let entry = this.motorUsageList.find(ele=>ele.CodeDesc==this.productItem.MotorUsage || ele.Code==this.productItem.MotorUsage);
                          if(entry){   
                            let bodyTypeStatus = entry?.BodyType;
                            this.mainBodyTypeList = this.motorTypeList.filter(ele=>ele.BodyType==bodyTypeStatus);
                            if(type=='change' && !this.editSection){ this.bodyTypeValue = null;  }
                            field.props.options = defaultObj.concat(this.mainBodyTypeList);
                          }
                        }
                        
                      }
                    }
                    
                  }
                    //this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.motorTypeList);
                    
                }
              }
            }
            
            
        }

      },
      (err) => { },
    );
  }
  onCodeChange(){
   
  }
  onSaveVehicleData(){
 
    if(this.insuranceId=='100004') this.typeValue = this.classValue;
    else if(this.insuranceId=='100040') this.typeValue = this.productItem.MotorUsage
    let createdBy="";
    let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    this.subuserType = sessionStorage.getItem('typeValue');
    
    let appId = "1",loginId="",brokerbranchCode="";
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
        createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else{
      createdBy = this.loginId;
    
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else{
        appId = this.loginId;
        loginId = this.brokerLoginId;
        brokerbranchCode = this.brokerBranchCode
        //  if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
        //   brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
        // }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.Code;
        // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
        //   this.sourceType = this.vehicleDetails.SourceTypeId;
        //   this.bdmCode = this.vehicleDetails.BrokerCode;
        //   this.brokerCode = this.vehicleDetails.BrokerCode;
        //   brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
        //   this.customerCode = this.vehicleDetails.CustomerCode;
        //   this.customerName = this.vehicleDetails.CustomerName;
        // }
        // else{
        //   this.sourceType = this.updateComponent.sourceType;
        //   this.bdmCode = this.updateComponent.brokerCode;
        //   this.brokerCode = this.updateComponent.brokerCode;
        //   brokerbranchCode =  this.updateComponent.brokerBranchCode;
        //   this.customerCode = this.updateComponent.CustomerCode;
        //   this.customerName = this.updateComponent.CustomerName;
        // }
      }
      else {
        this.sourceType = this.subuserType;
        this.customerCode = this.userDetails?.Result.CustomerCode;
      }
    }
      if(this.customerName ==undefined) this.customerName = null;
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
      IdNo = this.customerDetails?.IdNumber;
      regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      let deductibles = null;
    if(this.productItem.Deductibles!='' && this.productItem.Deductibles!=undefined) deductibles = this.productItem.Deductibles;
    let insuranceType ='',sectionId=[]
    if((this.insuranceId=='100028' || this.insuranceId=='100027' || this.insuranceId=='100040') && this.vehicleDetailsList.length==1){
        //if(this.typeValue==null || this.typeValue==undefined){
          for(let entry of this.typeList){
            sectionId.push(entry.Code);
          }
        // }
        // else insuranceType.push(this.typeValue)
    }
    else{
      if(this.typeValue==null || this.typeValue==undefined){
          
      }
      else{
        if(this.insuranceId=='100004'){this.productItem.InsuranceType = this.productItem.InsuranceClass;}
        if(Array.isArray(this.productItem.InsuranceType) && this.insuranceId!='100040') insuranceType = this.productItem.InsuranceType;
        else if(this.insuranceId!='100040') sectionId.push(this.productItem.InsuranceType);
        else{
          insuranceType = this.productItem.MotorUsage
          
        }
      }
    }
   
    if(this.insuranceId=='100027' || this.insuranceId=='100028'){
      if(Array.isArray(insuranceType)){
        if(insuranceType.length!=0) this.productItem.InsuranceClass = insuranceType[0];
      }
      else this.productItem.InsuranceClass = insuranceType
      this.classValue = this.typeValue;
    } 
    let PurchaseDate= null;
    if(this.productItem.PurchaseDate!=null && this.productItem.PurchaseDate!='' && this.productItem.PurchaseDate!=undefined){
     if(String(this.productItem.PurchaseDate).includes('/')){
        PurchaseDate = this.productItem.PurchaseDate;
      }
      else PurchaseDate = this.datePipe.transform(this.productItem.PurchaseDate,'dd/MM/yyyy');
    }
    if(this.productItem.GpsYN==null || this.productItem.GpsYN==undefined || this.productItem.GpsYN=='') this.productItem.GpsYN = 'N';
    let VehicleTypeId = null,VehicleType=null;
    if(this.productItem.BodyType!=null && this.productItem.BodyType!=''){
      let usageId = this.motorTypeList.find(ele=>ele.CodeDesc==this.productItem.BodyType || ele.Code==this.productItem.BodyType).Code;
      if(usageId) VehicleTypeId = usageId;
      let usageDesc = this.motorTypeList.find(ele=>ele.CodeDesc==this.productItem.BodyType || ele.Code==this.productItem.BodyType).CodeDesc;
      if(usageDesc) VehicleType = usageDesc;

    }
    let motorUsage=null,motorUsageId=null;
   
      if(this.productItem.MotorUsage!=null && this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined){
        let usageDesc = this.motorUsageList.find(ele=>ele.CodeDesc==this.productItem.MotorUsage || ele.Code==this.productItem.MotorUsage)?.CodeDesc;
        if(usageDesc){
          motorUsage = usageDesc;
          let usageId = this.motorUsageList.find(ele=>ele.CodeDesc==this.productItem.MotorUsage || ele.Code==this.productItem.MotorUsage)?.Code;
          if(usageId) motorUsageId = usageId;
        } 
        else{
          if(this.motordetails){
            motorUsageId = this.motordetails.Motorusage
            motorUsage = this.motordetails.MotorUsageDesc;
          }
        }
      }
      else{
        if(this.motordetails){
          motorUsageId = this.motordetails.Motorusage
          motorUsage = this.motordetails.MotorUsageDesc;
        }
      }
      if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
        let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
        if(entry){this.productItem.MakeDesc=entry.CodeDesc;}
      }
       let Insurancetype=null;
      if(this.insuranceId=='100040'){
        for(let entry of this.classList){
          sectionId.push(entry.Code)
        }
        console.log("Final list",this.classList)
        if(this.classList.length!=0) this.productItem.InsuranceClass = this.classList[0].Code;
      } 
      // else {
      //   Insurancetype =this.vehicleDetails?.Insurancetype;
      //   if(this.vehicleDetails?.Insurancetype){
      //     if(this.vehicleDetails?.Insurancetype.length!=0) sectionId=this.vehicleDetails?.Insurancetype[0];
      //     else sectionId = null;
      //   }
      //   else sectionId = null;
      // }
    let ReqObj={
      "CustomerName": this.productItem.CustomerName,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "UserType": this.userType,
      "ApplicationId": appId,
      "CustomerReferenceNo": this.customerReferenceNo,
      "RequestReferenceNo": this.quoteRefNo,
      "VehicleId": "1",
      "CreatedBy": createdBy,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": brokerbranchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SavedFrom": "SQ",
      "SectionId": sectionId,
      "MobileCode": this.productItem.MobileCode,
      "MobileNumber": this.productItem.MobileNo,
      "Chassisnumber": this.productItem.ChassisNo,
      "Insurancetype": insuranceType,
      "InsuranceClass": this.productItem.InsuranceClass,
      "Motorusage": motorUsage,
      "MotorusageId": this.productItem.MotorUsage,
      "Vehiclemake": this.productItem.MakeDesc,
      "VehiclemakeId": this.productItem.Make,
      "VehicleModel": this.productItem.ModelDesc,
      "VehcilemodelId": this.productItem.Model,
      "VehicleValueType": this.productItem.VehicleValue,
      "DefenceValue":this.productItem.DefenceCost,
      "PurchaseDate":PurchaseDate,
      "ClaimType": '11',
      "Deductibles": deductibles,
      "Inflation": this.productItem.Inflation,
      "ManufactureYear": this.productItem.ManufactureYear,
      "Gpstrackinginstalled": this.productItem.GpsYN,
      "NcdYn": this.productItem.ClaimsYN,
      "VehicleType": VehicleType,
      "VehicleTypeId": VehicleTypeId,
      "CarAlarmYn": this.productItem.CarAlarmYN,
      "PolicyStartDate": this.policyStartDate,
      "PolicyEndDate": this.policyEndDate,
      "CustomerCode":this.customerCode,
      "BdmCode": this.customerCode,
      "SourceTypeId": this.sourceType,
      "SumInsured": this.productItem.VehicleSI,
      "AcccessoriesSumInsured": this.productItem.AccessoriesSI,
      "ExchangeRate": this.exchangeRate,
      "Currency": this.currencyCode,
      "HavePromoCode":"N",
      "SearchFromApi":false,
      "Mileage":this.productItem.Mileage,
      "NoOfClaimYears":this.productItem.NoOfClaimYears,
      "NoOfPassengers":this.productItem.NoOfPassengers,
      "PreviousInsuranceYN":this.productItem.PreviousInsuranceYN,
      "PreviousLossRatio": this.productItem.PreviousLossRatio,
      "NumberOfCards":this.productItem.Nombredecartes,
      "MunicipalityTraffic":this.productItem.MunicipalityofTraffic,
      "TransportHydro":this.productItem.Transportationofhydrocarbons,
      "NewValue":this.productItem.Newvalue,
      "MarketValue":this.productItem.Marketvalue,
      "AggregatedValue":this.productItem.Aggregatedvalue,
      
    }
    if(this.insuranceId=='100004') ReqObj['SectionId']=this.productItem.InsuranceType
    ReqObj['DriverDetails'] = null;
            if(this.insuranceId=='100019') ReqObj['CarAlarmYn'] = this.productItem.CarAlarmYN;
            if(this.insuranceId=='100020') ReqObj['VehicleClass'] = this.productItem.VehicleClass
          let urlLink = `${this.motorApiUrl}api/savemotordetails`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
              if(data.ErrorMessage.length!=0){
                if(res.ErrorMessage){
                }
              }
              else{
                if(data.Result?.length!=0){
                  this.vehicleDetailsList = [];
                  this.vehicleDetailsList.push(ReqObj);
                  let entry = this.vehicleDetailsList[0];
                  entry['PolicyEndDate'] = endDate;
                  entry['PolicyStartDate'] = startDate;
                  this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                  this.customerReferenceNo = data?.Result[0]?.CustomerReferenceNo;
                  sessionStorage.setItem('customerReferenceNo',data?.Result[0]?.CustomerReferenceNo)
                  sessionStorage.setItem('quoteReferenceNo',data?.Result[0]?.RequestReferenceNo);
                  let i=0;this.individualCalcIndex = 0;
                  for(let veh of data.Result){
                    entry['MSRefNo'] = data?.Result[0].MSRefNo;
                    entry['VdRefNo'] = data?.Result[0].VdRefNo;
                    entry['CdRefNo'] = data?.Result[0].CdRefNo;
                    entry['Active'] = true;
                    entry['VehicleId'] = data.Result[0].VehicleId;
                    this.onCalculateVehDetails(veh,'proceedSave',i,data.Result.length,insuranceType.length);
                    i+=1;
                  }
                }
               
              }
          });
        }
  onCalculateVehDetails(vehicleDetails,type,entry,totalCount,sectionCount){
    console.log(this.individualCalcIndex,totalCount)
    let createdBy="";
          let coverModificationYN = 'N';
          if(this.endorsementSection){
            // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
            // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
            // else coverModificationYN = 'N';
            if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
          }
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP'){
              createdBy = this.vehicleDetailsList[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
          }
          
          let endDate:any = null;
          if(this.endorsementSection && vehicleDetails?.Status=='D'){
            coverModificationYN = 'Y';
            endDate = this.endorseEffectiveDate;
          }
          // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
          //   coverModificationYN = 'N';
          // }
          else{
            if(this.policyEndDate){
              if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
              else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            }
          }
          let effectiveDate=null;
          if(this.endorsementSection){
              effectiveDate = this.endorseEffectiveDate;
          }
          else {
            if(this.policyStartDate){
              if(String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
              else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            }
          }
          let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "SectionId": vehicleDetails?.SectionId,
              "ProductId": this.productId,
              "MSRefNo": vehicleDetails?.MSRefNo,
              "VehicleId": vehicleDetails?.VehicleId,
              "CdRefNo": vehicleDetails?.CdRefNo,
              "DdRefNo": vehicleDetails?.DdRefNo,
              "VdRefNo": vehicleDetails?.VdRefNo,
              "CreatedBy": createdBy,
              "productId": this.productId,
              "sectionId": vehicleDetails?.SectionId,
              "RequestReferenceNo": this.quoteRefNo,
              "EffectiveDate": effectiveDate,
              "PolicyEndDate": endDate,
              "CoverModification": coverModificationYN
          }
          let urlLink = `${this.CommonApiUrl}calculator/calc`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              this.individualCalcIndex +=1;
                  if(this.individualCalcIndex==totalCount){ 
                        this.onViewCalc();
                  }
            });
  }
  

getInsuranceTypeAltList(){
  let ReqObj=null,urlLink=null;
    ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "Insurance_type"
    }
    urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.typeListAlt = data.Result;
            if(this.typeListAlt.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Selecione--'}];
              for (let i = 0; i < this.typeListAlt.length; i++) {
                this.typeListAlt[i].label = this.typeListAlt[i]['CodeDesc'];
                this.typeListAlt[i].value = this.typeListAlt[i]['Code'];
                if (i == this.typeListAlt.length - 1) {
                    if(this.fields.length!=0){
                      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                      for(let field of fieldList){
                        if(field.key=='InsuranceType'){
                          field.props.options = defaultObj.concat(this.typeListAlt);
                          this.checkFieldNames();
                        }
                      }
                    }
                }
              }
            }
        }
    });            
}


  onViewCalc(){
    let ReqObj = {
      "ProductId":this.productId,
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){

            this.vehicleData = data.Result;
            if(this.vehicleData.length!=0){
              let finalizeyn = this.vehicleData[0]?.FinalizeYn;
              if(finalizeyn!=null){this.finalizeYN = finalizeyn;sessionStorage.setItem('FinalizeYN',finalizeyn);}
              else{this.finalizeYN='N';sessionStorage.removeItem('FinalizeYN')};
            }
            // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
            //     console.log('KKKKKKKKKKKK',this.emipolicytype);
           
            // let refRemarks = this.vehicleData[0].ReferalRemarks;
            // if(refRemarks){
            //   this.referralRemarks = refRemarks.split('~');
            // }
            if(this.productId=='5' || this.productId=='29'){
              let j=0;let datass:any=[]
              if(this.vehicleData.length>1){
                if(this.vehicleData[0]?.RiskDetails?.InsuranceClass == this.vehicleData[1]?.RiskDetails?.InsuranceClass){
                  this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
                }
                else{
                  this.emipolicytype='99999';
                }
               
              }
              else{
               this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              }
              // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              // console.log('KKKKKKKKKKKK',this.emipolicytype);
             }
             else{
              this.emipolicytype='99999';
             }

            let vehicleList:any[]=[];
            if(this.vehicleData.length!=0){
              
              // this.policyStartDate = this.vehicleData[0]?.PolicyStartDate;
              // this.policyEndDate = this.vehicleData[0]?.PolicyEndDate;
              let referralList = this.vehicleData.filter(ele=>(ele.UWReferral!=null && ele.UWReferral.length!=0) || ele.MasterReferral.length!=0);
              
              if(this.vehicleData[0].EndtTypeMaster!=null){
                let quoteDetails = this.vehicleData[0].EndtTypeMaster
                
                if(!JSON.parse(sessionStorage.getItem('endorseTypeId'))){
                  let obj = {
                    "EndtTypeId": Number(quoteDetails?.Endttypeid),
                    "FieldsAllowed":quoteDetails.Endtdependantfields.split(','),
                    "EffectiveDate":quoteDetails.Endorsementeffdate,
                    "Remarks":quoteDetails.Remarks,
                    "Category": quoteDetails.Endttypecategory,
                    "EndtName": quoteDetails.Endttype,
                    "PolicyNo": quoteDetails?.PolicyNo
                  }
                  sessionStorage.setItem('endorsePolicyNo',this.vehicleData[0].OriginalPolicyNo);
                  //sessionStorage.setItem('endorsePolicyNo',)
                  sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
                  this.endorsementSection = true;
                  let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
                  if(endorseObj){
                    console.log("Endorse obj",endorseObj)
                    this.endorsementId = endorseObj.EndtTypeId;
                    this.endorseEffectiveDate = endorseObj?.EffectiveDate;
                    this.enableFieldsList = endorseObj.FieldsAllowed;
                    let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection'  || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
                    if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
                    else this.coverModificationYN = 'N';
                    console.log("Enable Obj",this.enableFieldsList)
                    if(this.endorsementId!=42){
                      
                    }
                    else{
                        
                    }
                  }
                }
              }
              if(this.vehicleData[0].HavePromoCode){
                
              }
              else{
                
              }
              let admRemarks = this.vehicleData[0].AdminRemarks;
              if(admRemarks){
                this.adminRemarks = admRemarks.split('~');

              }
              this.currencyCode= this.vehicleData[0]?.Currency;
              let i=0;
              for(let veh of this.vehicleData){
                veh['ReferralList'] = [];
                if(veh.MasterReferral.length!=0){
                  for(let master of veh.MasterReferral){
                    veh['ReferralList'].push(master.ReferralDesc)
                  }
                }
                if(veh.UWReferral.length!=0){
                  for(let master of veh.UWReferral){
                    veh['ReferralList'].push(master.QuestionDesc)
                  }
                }
                if(veh.EndorsementYn=='Y'){
                  if(this.endorsementSection==false){
                    
                  }
                }
                // if(veh.ReferalRemarks){
                //   veh['ReferralList']= veh.ReferalRemarks.split('~');
                // }
                if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId;
                  veh['Active'] = true;
                  let coverList = veh.CoverList;
                  let baseCovers =[],otherCovers=[];
                  baseCovers = coverList.filter(ele=>ele.CoverageType=='B');
                  otherCovers= coverList.filter(ele=>ele.CoverageType!='B');
                  veh.CoverList = baseCovers.concat(otherCovers)
                  if(i==0){
                    veh['Collapse'] = true;
                    //this.remarks = veh.AdminRemarks;
                    vehicleList.push(veh);
                  }
                  else{
                    veh['Collapse'] = false;
                    vehicleList.push(veh);
                  }
                  i+=1;
                  if(i==this.vehicleData.length){
                    console.log("Vehiclessss",this.vehicleData,data.Result)
                    console.log("Final Vehicle List",vehicleList)
                    //sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                    if(this.productId!='4' && this.productId!='5' && this.productId!='46' && this.productId!='29'){
                      this.vehicleData = vehicleList;
                      this.filterVehicleList();
                    }
                    else{
                      this.vehicleDetailsList = vehicleList;
                      this.checkSelectedCovers();
                    }
                  }
              }
            }
          
        }
      },
      (err) => { },
    );
  }
  filterVehicleList(){
    let vehicleList = [];
    console.log("Vehiclessss on Filter",this.vehicleDetailsList,this.vehicleData)
      if(this.vehicleData.length!=0){
          let i=0;
          this.vehicleDetailsList = [];
          for(let vehicle of this.vehicleData){
            if(i==0){
                vehicleList.push(vehicle);
            }
            else{
              let entry = vehicleList.find(ele=>ele.VehicleId==vehicle.VehicleId);
              if(entry){

                if(entry.SectionId==vehicle.SectionId){
                  entry.CoverList = entry.CoverList.concat(vehicle.CoverList);
                }
                else{
                  vehicleList.push(vehicle);
                }
              }
              else{
                vehicleList.push(vehicle);
              }
            }

            i+=1;
            if(i==this.vehicleData.length){
              this.vehicleDetailsList = vehicleList;
              console.log("Filtered Vehicle List",this.vehicleDetailsList)
              this.checkSelectedCovers();
            }
          }
      }
  }
  checkSelectedCovers(){
    console.log('VVVVVVVVV',this.vehicleDetailsList);
    if(this.vehicleDetailsList.length!=0){
      if(this.vehicleDetailsList[0].CoverList.length!=0){
        this.currencyCode== this.vehicleDetailsList[0].CoverList[0].Currency;
      }
      let j=0;
      for(let veh of this.vehicleDetailsList){
        veh['totalPremium'] = 0;
        let i=0;
        let coverList:any[]=veh.CoverList;
        for(let cover of coverList){
          cover['ExcessDesc'] = 'None';
          let fieldList = [];
          if(cover.Endorsements!=null && veh.Status!='D'){
            
            cover['DifferenceYN']= 'Y';
            if(veh?.EndtTypeMaster?.Endtdependantfields){
              fieldList = veh?.EndtTypeMaster?.Endtdependantfields.split(',')
            }
          }
          if(cover.Endorsements!=null && !this.endorsementSection){
            this.endorsementSection = true;
            
            let obj = {
              "EndtTypeId":cover.Endorsements[0].EndorsementId,
              "FieldsAllowed": fieldList,
              "EffectiveDate":cover.EffectiveDate,
              "Remarks":null,
              "Category": veh?.EndtTypeMaster?.Endttypecategory,
              "EndtName": cover.Endorsements[0].EndorsementDesc,
              "PolicyNo": null
            }
            this.endorsementId = cover.Endorsements[0].EndorsementId;
            this.endorseEffectiveDate = cover.EffectiveDate;
            this.enableFieldsList = fieldList;
            let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection' || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
            if(this.coverModificationYN=='N'){
              if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
              else this.coverModificationYN = 'N';
            }
            sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
          }
          if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
          (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='D' || cover.isSelected=='O')) ){
            // if(this.endorsementId == 846 && veh.Status=='D'){
            //   cover['selected']= false;
            //   this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
            // }
            // else{
              this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
            //}
            
          }
          else{
            console.log("Not Selected 1",cover);
            cover['selected']= false;
          }
          if(cover.SubCovers!=null){
            let k=0;
            for(let sub of cover.SubCovers){
              if(sub.isSelected=='D' || sub.isSelected=='O' || sub.isSelected=='Y' || sub?.UserOpt=='Y'){
                    this.onChangeSubCover(sub,cover,veh,true,null);
              }
              k+=1;
              if(k==cover.SubCovers){
                i+=1;
                if(i==coverList.length){
                  let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
                  let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
                  veh.CoverList = defaultList.concat(otherList);
                  if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
                }
              }
            }
          }
          else{
            i+=1;
            if(i==coverList.length){
              let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
              let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
              veh.CoverList = defaultList.concat(otherList);
              if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
              
            }
          }
          
        }
        j+=1;
        if(j==this.vehicleDetailsList.length){
          if(this.endorsementId==846){
              let vehicles = this.vehicleDetailsList.filter(ele=>ele.Status=='D');
              console.log("Entered Veh 1",vehicles)
              if(vehicles.length!=0){
                let n=0;
                  for(let veh of vehicles){
                    let SectionEntry:any[]=[];
                    SectionEntry = this.vehicleDetailsList.filter(ele=>ele.Status=='E' && ele.SectionId==veh.SectionId);
                    let coverList:any[]=veh.CoverList;
                    let j = 0;
                    for(let cover of coverList){
                      if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
                        (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='Y')) ){
                          cover['selected']= false;
                          this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
                          cover['DifferenceYN'] = 'N';
                          if(SectionEntry.length!=0){
                            let coverList = SectionEntry[0]?.CoverList;
                            let covers = coverList.filter(ele=>ele.CoverId==cover.CoverId);
                            
                            if(!(covers[0].UserOpt=='Y' || covers[0].isSelected=='D' || covers[0].isSelected=='O')){
                              console.log("Opted Sections",SectionEntry[0],covers)
                              covers[0]['selected']= true;
                              this.onSelectCover(covers[0],true,SectionEntry[0].Vehicleid,SectionEntry[0],'coverList','change');
                               covers[0]['DifferenceYN'] = 'Y';
                            }
                          }
                          
                        }
                      
                      j+=1;
                      if(j==coverList.length) n+=1;
                    }
                    
                    if(n==vehicles.length){
                      if(this.quoteNo!="null" && this.quoteNo!=null){
                      }
                       if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
                        this.getEditQuoteDetails();
                      }
                      else{
                        
                      }
                    }
                  }
              }
              else{
                if(this.quoteNo!="null" && this.quoteNo!=null){
                  //this.getEditQuoteDetails();
                }
                 if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
                  //this.updateComponent.quoteNo = this.quoteNo;
                  this.getEditQuoteDetails();
                }
                else{
                  
                }
              }
          }
          else{
            if(this.quoteNo!="null" && this.quoteNo!=null){
              //this.getEditQuoteDetails();
            }
             if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
              //this.updateComponent.quoteNo = this.quoteNo;
              this.getEditQuoteDetails();
            }
            else{
              
            }
          }
          
          //this.onGetCoverListById();
        }
      }


    }
  }
  onChangeSubCover(subCover,cover,vehicle,event,element){
    
    if(subCover==undefined || subCover==null){
      if(element){
        subCover = cover.SubCovers.find(ele=>ele.SubCoverId==element.value)
      }
    }
    console.log("SubCover Data",subCover,event);
    if(subCover.MultiSelectYn=='Y'){
        if(event){
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.SectionId==vehicle.SectionId);
            if(entry.length==0){
              let element = {
                  "Covers": [
                    {
                      "CoverId": cover.CoverId,
                      "SubCoverId": subCover.SubCoverId,
                      "SubCoverYn": "Y",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicle.VehicleId,
                  "SectionId": cover.SectionId,

                }
              cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              console.log("Selected Covers",this.selectedCoverList)
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              // if(vehicle?.totalPremium){
              //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
              //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
              // }
              // else{
              //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
              //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              // }
                console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
             let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
             if(sectionEntry == undefined){
              let element = {
                "Covers": [
                  {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicle.VehicleId,
                "SectionId": cover.SectionId
              }
              cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
                // if(vehicle?.totalPremium){
                //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
                //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
                // }
                // else{
                //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                // }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
             }
             else{
               console.log("Sections",sectionEntry)
              let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
              if(findCover.length==0) {
                let newEntry = {
                  "CoverId": cover.CoverId,
                  "SubCoverId":subCover.SubCoverId,
                  "SubCoverYn": "Y"
                  //"isReferal": rowData.isReferal
                }
                cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.selected = true;
                for(let sub of cover.SubCovers){
                  if(sub.SubCoverId==subCover.SubCoverId){
                    cover['isReferal'] = sub.isReferal;
                    cover['SumInsured'] = sub.SumInsured;
                    cover['Loadings'] = sub.Loadings;
                    cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                    cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                    cover['Discounts'] = sub?.Discounts;
                    cover['CalcType'] = sub?.CalcType;
                    cover['Rate'] = sub?.Rate;
                    cover['ExcessPercent'] = sub?.ExcessPercent;
                    cover['ExcessAmount'] = sub?.ExcessAmount;
                    cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                    cover['ExchangeRate'] = sub?.ExchangeRate;
                    cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                    cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                    cover['Taxes'] = sub.Taxes;
                    sub['selected'] = true;
                  }
                  else{
                    sub['selected'] = false;
                  }
                }
                subCover['selected'] = true;
                sectionEntry.Covers.push(newEntry);
                if(vehicle?.totalPremium){
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                  }
                
                }
                else{
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
              }
              else{
                console.log("Finded Covers",findCover,sectionEntry)
                let subCoverEntry = findCover.filter(ele=>ele.SubCoverId==subCover.SubCoverId);
                if(subCoverEntry.length==0){
                  let newEntry = {
                    "CoverId": cover.CoverId,
                    "SubCoverId":subCover.SubCoverId,
                    "SubCoverYn": "Y"
                    //"isReferal": rowData.isReferal
                  }
                  cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                  cover.selected = true;
                  for(let sub of cover.SubCovers){
                    if(sub.SubCoverId==subCover.SubCoverId){
                      cover['isReferal'] = sub.isReferal;
                      cover['SumInsured'] = sub.SumInsured;
                      cover['Loadings'] = sub.Loadings;
                      cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                      cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                      cover['Discounts'] = sub?.Discounts;
                      cover['CalcType'] = sub?.CalcType;
                      cover['Rate'] = sub?.Rate;
                      cover['ExcessPercent'] = sub?.ExcessPercent;
                      cover['ExcessAmount'] = sub?.ExcessAmount;
                      cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                      cover['ExchangeRate'] = sub?.ExchangeRate;
                      cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                      cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                      cover['Taxes'] = sub.Taxes;
                      sub['selected'] = true;
                    }
                    else{
                      sub['selected'] = false;
                    }
                  }
                  subCover['selected'] = true;
                  sectionEntry.Covers.push(newEntry);
                  if(vehicle?.totalPremium){
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                    }
                  
                  }
                  else{
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                    }
                    
                  }
                  console.log("Total Premium",cover,vehicle)
                  this.getTotalVehiclesCost();
                }
                
              }
             }
            }
          }
          else{
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicle.VehicleId,
              "SectionId": cover.SectionId
            }
            cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

            cover.selected = true;
            for(let sub of cover.SubCovers){
              if(sub.SubCoverId==subCover.SubCoverId){
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                sub['selected'] = true;
              }
              else{
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
              
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
            this.getTotalVehiclesCost();
          }
        }
        else{
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.SectionId==vehicle.SectionId);
            console.log("Entry List",entry);
            let sectionEntry = entry.find(ele=>ele.SectionId==cover.SectionId);
            sectionEntry.Covers = sectionEntry.Covers.filter(ele=>ele.SubCoverId!=subCover.SubCoverId )
            let covers:any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
            subCover['selected'] = false;
            
            cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC-subCover.PremiumIncludedTaxFC;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
            if(vehicle?.totalPremium==null || vehicle?.totalPremium==undefined){ vehicle['totalLcPremium']=0;vehicle['totalPremium']=0 }
            if(vehicle?.totalPremium){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - subCover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']-subCover.PremiumIncludedTax;
              if(findCover.length==0){cover['selected'] = false;  vehicle['totalPremium'] =  vehicle['totalPremium']-cover.PremiumIncludedTax; vehicle['totalLcPremium'] =  vehicle['totalLcPremium']-cover.PremiumIncludedTaxFC;}
            }
            else{
              if(findCover.length!=0){
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
            }
            this.getTotalVehiclesCost();
          }
        }
    }
    else{
      
      if(this.selectedCoverList.length!=0){
        let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.SectionId==vehicle.SectionId);
        
        if(entry.length==0){
          let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicle.VehicleId,
              "SectionId": cover.SectionId,

            }
            if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
              
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
              cover.PremiumIncludedTax = 0;
              cover.PremiumIncludedTaxFC=0;
            }
            cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          // cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
          // cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          cover['selected'] = true;
          for(let sub of cover.SubCovers){
            if(sub.SubCoverId==subCover.SubCoverId){
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              sub['selected'] = true;
            }
            else{
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          console.log("Selected Covers",this.selectedCoverList)
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
          
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
          }
          // if(vehicle?.totalPremium){
          //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
          //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
          // }
          // else{
          //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
          //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
          // }
            console.log("Total Premium",cover,vehicle)
          this.getTotalVehiclesCost();
          //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
        }
        else{
          
         let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
         if(sectionEntry == undefined){
          let element = {
            "Covers": [
              {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y",
                //"isReferal": rowData.isReferal
              }
            ],
            "Id": vehicle.VehicleId,
            "SectionId": cover.SectionId
          }
          if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
            vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
            cover.PremiumIncludedTax = 0;
            cover.PremiumIncludedTaxFC=0;
          }
          cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
          cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          cover.selected = true;
          cover.SubCoverId = subCover.SubCoverId;
          for(let sub of cover.SubCovers){
            if(sub.SubCoverId==subCover.SubCoverId){
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              sub['selected'] = true;
            }
            else{
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
          
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
            
          }
            // if(vehicle?.totalPremium){
            //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
            //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
            // }
            // else{
            //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
            //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            // }
            this.getTotalVehiclesCost();
         }
         else{
          let covers:any[] = sectionEntry.Covers;
          let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
          if(findCover.length==0) {
            let newEntry = {
              "CoverId": cover.CoverId,
              "SubCoverId":subCover.SubCoverId,
              "SubCoverYn": "Y"
              //"isReferal": rowData.isReferal
            }
            if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
              
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
              cover.PremiumIncludedTax = 0;
              cover.PremiumIncludedTaxFC=0;
            }
            cover.SubCoverId = subCover.SubCoverId;
            cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
            cover.selected = true;
            for(let sub of cover.SubCovers){
              if(sub.SubCoverId==subCover.SubCoverId){
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                sub['selected'] = true;
              }
              else{
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            sectionEntry.Covers.push(newEntry);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
            
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
            console.log("Total Premium",cover,vehicle)
            this.getTotalVehiclesCost();
          }
          else{
            console.log("Finded Covers",findCover,sectionEntry)
              let newEntry = {
                "CoverId": cover.CoverId,
                "SubCoverId":subCover.SubCoverId,
                "SubCoverYn": "Y"
                //"isReferal": rowData.isReferal
              }
              console.log("Covers Included",cover);
              if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
               vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
                cover.PremiumIncludedTax = 0;
                cover.PremiumIncludedTaxFC=0;
              }
              cover.SubCoverId = subCover.SubCoverId;
              cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              
              let subIndex = sectionEntry.Covers.findIndex(ele=>ele.CoverId==cover.CoverId);
              sectionEntry.Covers[subIndex] = newEntry;
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
            
            
          }
         }
        }
      }
      else{
        
        let element = {
          "Covers": [
            {
              "CoverId": cover.CoverId,
              "SubCoverId": subCover.SubCoverId,
              "SubCoverYn": "Y",
              //"isReferal": rowData.isReferal
            }
          ],
          "Id": vehicle.VehicleId,
          "SectionId": cover.SectionId
        }
        if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
              
          vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
          vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
          cover.PremiumIncludedTax = 0;
          cover.PremiumIncludedTaxFC=0;
        }
        cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
        cover.PremiumIncludedTax = subCover.PremiumIncludedTax;

        cover.selected = true;
        for(let sub of cover.SubCovers){
          if(sub.SubCoverId==subCover.SubCoverId){
            cover['isReferal'] = sub.isReferal;
            cover['SumInsured'] = sub.SumInsured;
            cover['Loadings'] = sub.Loadings;
            cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
            cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
            cover['Discounts'] = sub?.Discounts;
            cover['CalcType'] = sub?.CalcType;
            cover['Rate'] = sub?.Rate;
            cover['ExcessPercent'] = sub?.ExcessPercent;
            cover['ExcessAmount'] = sub?.ExcessAmount;
            cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
            cover['ExchangeRate'] = sub?.ExchangeRate;
            cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
            cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
            cover['Taxes'] = sub.Taxes;
            sub['selected'] = true;
          }
          else{
            sub['selected'] = false;
          }
        }
        subCover['selected'] = true;
        this.selectedCoverList.push(element);
        if(vehicle?.totalPremium){
          if(cover.Endorsements!=null){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
            vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
          }
          else{
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
            vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
          }
          
        }
        else{
          if(cover.Endorsements!=null){
            vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
            vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
          }
          else{
            vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
            vehicle['totalPremium'] =  cover.PremiumIncludedTax;
          }
          
        }
        this.getTotalVehiclesCost();
      }
    }
    console.log("Total Vehicle",this.selectedCoverList)
  }
  getTotalVehiclesCost(){
    let totalCost = 0,i=0,totalLocalCost=0;
    
    for(let veh of this.vehicleDetailsList){
      
      if(veh?.totalPremium) totalCost = totalCost+veh?.totalPremium;console.log('Total1 premium',veh,totalCost,veh?.totalPremium);
      if(veh?.totalLcPremium) totalLocalCost = totalLocalCost+veh?.totalLcPremium; console.log('Total2 premium',veh,totalLocalCost,veh?.totalLcPremium);
      i+=1;
      if(i==this.vehicleDetailsList.length){
          this.localPremiumCost = totalLocalCost;
          this.totalPremium = totalCost;
          if(this.vehicleData[0].EmiYn!=null && this.vehicleData[0].EmiYn!=undefined && this.vehicleData[0].EmiYn!=''){
          this.emiYN = this.vehicleData[0].EmiYn;
          this.emiPeriod = this.vehicleData[0].InstallmentPeriod;
          if(!this.endorsementSection && this.emiYN=='Y'){
            
          }
        }
        else if(!this.endorsementSection) {
          this.emiYN = "N";
          
        }
    }
    console.log("Total Premium",this.vehicleDetailsList)
    console.log("Final Cost Of Vehicle",this.vehicleDetailsList)
      console.log('TTTTTTTT',this.totalPremium);
    }
  }
  getEditQuoteDetails(){
    let i=0;
    for(let veh of this.vehicleDetailsList){
      if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId
        if(i ==0 ){ //this.remarks = veh.AdminRemarks;
           this.rejectedReason = veh.RejectReason}
        let covers = veh.CoverList;
        let j=0;
        for(let cover of covers){
          
            let entry = this.vehicleDetailsList.find(ele=>String(ele.Vehicleid)==String(veh.VehicleId))
            if(entry){
              let coverList = entry.CoverList;
              if(cover.UserOpt=='Y' ){
                let coverEntry = coverList.find(ele=>ele.CoverId == cover.CoverId)
                if(coverEntry){
                  if(this.endorsementId == 846 && veh.Status=='D'){
                    cover['selected']= false;
                   // this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
                  }
                  else{
                    cover['selected']= true;
                    this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
                  }
                  console.log("Selected 2",cover);
                }
              }
             
            }
            j+=1;
            if(j==covers.length) i+=1;
        }

        if(i==this.vehicleDetailsList.length){
          this.showSection = true;
          if(this.vehicleDetailsList.some(ele=>ele.ManualReferalYn=='Y') && !this.adminSection && this.statusValue){
            this.isMannualReferal = "N";
          }
          this.selectedRowData = this.vehicleDetailsList[0];
          this.onSelectSection();
          this.coverSection = true;
          // if(((this.uwReferralSection && !this.adminSection && (this.statusValue=='RP' || this.statusValue=='' || this.statusValue==null || this.statusValue==undefined))  || (!this.adminSection && this.statusValue=='RP' && this.vehicleDetailsList.some(ele=>ele.Status=='RP')))){
          //   this.columnHeader = [
          //     {
          //       key: 'selected',
          //       display: 'Select',
          //       config: {
          //         isChecked:true
          //       },
          //     },
          //     { key: 'CoverName', display: 'Cover Name' },
          //     { key: 'SumInsured', display: 'Sum Insured' }
      
          //   ]
          // }
          // else{
      
           
          //}
          // if(!this.endorsementSection){
          //   this.EmiInstallment();
          // }
          
          console.log("Final Vehicle Listaaaa",this.vehicleDetailsList,this.selectedCoverList)
        }
    }

  }
  canbeChecked(rowData){
    if(rowData?.selected!=undefined){
      return rowData.selected;
    }
    return false;
  }
  onSelectSection(){
    console.log("Current Id",this.selectedRowData)
    if(this.selectedRowData!=null){
      this.coverSection = false;
      this.selectedVehicleList = [this.selectedRowData]
      this.coverSection = true;

    }
  }
  onSelectCover(rowData,event,vehicleId,vehicleData,type,directType){
    console.log("Cover Selected received",event)
    if(event==null){
      event = !this.canbeChecked(rowData);
    }
    //if(type=='coverList' && (rowData.SubCovers==null || (rowData.SubCovers!=null && rowData.SubCoverId!=null))){
      let vehicle:any;
        if(this.productId!='4' && this.productId!='5' && this.productId!='46' && this.productId!='29'){
          vehicle = this.vehicleDetailsList.find(ele=>(ele.Vehicleid==vehicleId || ele.VehicleId==vehicleId) && (ele.SectionId==rowData.SectionId));
        }
        else{
          vehicle = this.vehicleDetailsList.find(ele=>ele.Vehicleid==vehicleId && ele.SectionId==rowData.SectionId);
          console.log('Vechiles2',vehicle)
        }
        
        let coverList = vehicle?.CoverList;
        if(event){
         
          rowData.selected= true;
          console.log("Final Row",rowData)
          if(rowData.DifferenceYN==undefined && this.coverModificationYN=='Y'){
            if(vehicle.Status=='D') rowData.DifferenceYN = 'N';
            else rowData.DifferenceYN = 'Y'
          }
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
            if(entry.length==0){
              
              if(rowData.SubCovers==null){
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicleId,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
              }
              
              
              if(directType=='change' && this.endorsementSection){
                console.log('Endorsemet section Values')
                if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                  rowData['ModifiedYN'] = 'Y';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN=='Y'){
                    if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  //rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC = 0;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
              }
              else if(vehicle?.totalPremium){
                console.log('Endorsemet section Values 2')
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification || vehicle.Status=='D'){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                console.log('Endorsemet section Values3')
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                 
                  if(this.coverModificationYN!='Y' || this.endorseSIModification || vehicle.Status=='D'){
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium'] = 0;}
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    
                  }
                }
                else{
                 
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
                
              }
                console.log("Total Premium",rowData,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
              console.log('Endorsemet section Values4');
             let sectionEntry = entry.find(ele=>ele.SectionId == rowData.SectionId);
            
             if(sectionEntry == undefined){
              if(rowData.SubCovers==null){
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicleId,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'Y';
                }
                console.log("Selected Cover Lists",this.selectedCoverList)
              }
              
              if(directType=='change' && this.endorsementSection){
                
                if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                  rowData['ModifiedYN'] = 'Y';
                }
                
                if(this.coverModificationYN=='Y' && this.endorsementSection && vehicle?.totalPremium && rowData.Endorsements!=null){
                  if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else if(vehicle?.totalPremium){
                  rowData['Modifiable']='N';
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
  
  
                  }
                  else{
                    
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  rowData['Modifiable']='N';
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                }
                
              }
              else if(vehicle?.totalPremium){
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }


                }
                else{
                  
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification){
                    vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                }
                else{
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
              }
                this.getTotalVehiclesCost();
             }
             else{
                let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==rowData.CoverId);
              if(findCover.length==0) {
                if(rowData.SubCovers==null){
                  let element = {
                        "CoverId": rowData.CoverId,
                         "SubCoverId": null,
                         "SubCoverYn": "N",
                  }
                  // let element = {
                  //   "Covers": [
                  //     {
                  //       "CoverId": rowData.CoverId,
                  //       "SubCoverId": null,
                  //       "SubCoverYn": "N",
                  //       //"isReferal": rowData.isReferal
                  //     }
                  //   ],
                  //   "Id": vehicleId,
                  //   "SectionId": rowData.SectionId,
  
                  // }
                  // this.selectedCoverList.push(element);
                  sectionEntry.Covers.push(element)
                  console.log("Selected Coverlistss",this.selectedCoverList);
                  
                }
                
                if(directType=='change' && this.endorsementSection){
                  console.log('If cover changes1');
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN=='Y'){
                      console.log('If cover changes4');
                      if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      else{
                        console.log('If cover changes5');
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    console.log('JJJJJJJJJ',vehicle?.totalLcPremium,vehicle?.totalPremium);
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium'] = 0; }
                    console.log('If cover changes10',rowData,rowData.PremiumIncludedTaxFC,rowData.PremiumIncludedTax);
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                      console.log('Total Premiums 111111111',vehicle?.totalPremium,rowData.PremiumIncludedTax);
                      vehicle['totalPremium'] =  vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                      console.log('end', vehicle);
                  }
                }
                else if(vehicle?.totalPremium){
                  console.log('If cover changes2');
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                    console.log('If cover changes0',rowData.PremiumIncludedTaxFC,rowData.PremiumIncludedTax);
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  console.log('If cover changes3');
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      
                      if(!vehicle?.totalLcPremium){ vehicle['totalLcPremium'] = 0;}
                      if(!vehicle?.totalPremium){ vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",rowData,vehicle)
                this.getTotalVehiclesCost();
              }
             }
            }
          }
          else{
            
            if(rowData.SubCovers==null){
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicleId,
                "SectionId": rowData.SectionId,

              }
              this.selectedCoverList.push(element);
              console.log("Selected Cover",this.selectedCoverList)
            }
          
          if(directType=='change' && this.endorsementSection){
            console.log('Endorsement section1')
            if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
              rowData['ModifiedYN'] = 'Y';
            }
            if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
              if(this.coverModificationYN=='Y'){
                if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
              
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
            }
            
          }
          else if(vehicle?.totalPremium){
            console.log('Endorsement section2')
            if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
              
              if(this.coverModificationYN!='Y' || this.endorseSIModification){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
            }
            else{
              
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
            }
          
          }
          else{
            console.log('Endorsement section3')
            if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
              
              if(this.coverModificationYN!='Y' || this.endorseSIModification){
                vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                
              }
            }
            else{
              vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
            }
            
          }
          // vehicle['totalLcPremium'] = rowData.PremiumIncludedTaxFC;
          // vehicle['totalPremium'] = rowData.PremiumIncludedTax;
          console.log("Premium Total ",vehicle,this.selectedCoverList)
          this.getTotalVehiclesCost();
            // this.selectedCoverList.push(rowData);
            // this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          }
        }
        else{
          console.log("Received RowData",rowData)
          rowData['selected']= false;
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
          if(entry){
            let sectionEntry = entry.find(ele=>ele.SectionId==rowData.SectionId);
            if(sectionEntry!=undefined){
              let covers:any[] = sectionEntry.Covers;
              let CoverIndex = covers.findIndex(ele=>ele.CoverId==rowData.CoverId);
              covers.splice(CoverIndex,1);
              if(this.coverModificationYN=='Y') {rowData['DifferenceYN'] = 'N';}
              if(directType=='change' && this.endorsementSection){
                if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                if(!vehicle?.totalPremium) { vehicle['totalPremium'] = 0 ;}
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN=='Y'){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    console.log('Minus premiums1',vehicle,vehicle?.totalPremium,rowData.PremiumIncludedTax)
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium'] - rowData.PremiumIncludedTax;
                  }
                
              }
              else if(vehicle?.totalPremium){
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  console.log('Minus premiums2',vehicle,vehicle?.totalPremium,rowData.PremiumIncludedTax)
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
                }
              
              }
              if(rowData.SubCovers){
                rowData.SubCoverId=null;
                for(let sub of rowData.SubCovers){
                  sub['selected'] = false;
                }
              }
              // vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.PremiumIncludedTax;
              // vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxFC;
              this.getTotalVehiclesCost();
            }

          }
          // else if(this.endorsementId==846){
          //   let covers:any[] = rowData.Covers;
          //   console.log("Coverssssssssss",covers)
          // }
        }

    //}
    // else if(directType=='change'){
    //     if(event){
    //       if(rowData.SubCovers){
    //         if(rowData.SubCoverId==null){
    //             rowData['Entry']=null;
    //             rowData['Entry']='None';
    //             rowData['ActiveIndex']= 0;
    //         }
    //       }
    //     }
    // }
    //this.onEmiYNChange();
    console.log("Final Covers",this.vehicleDetailsList,this.selectedCoverList)
  }
}
