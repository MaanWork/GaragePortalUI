import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { SharedService } from '../../service/shared.service';
import * as Mydatas from '../../../app-config.json';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductData } from '../quotation/quotation-plan/models/product';
import { MotorVehicleSanlam } from '../quotation/quotation-plan/models/sanlam/MotorVehicleSanlam';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MotorVehicleEagle } from '../quotation/quotation-plan/models/Eagle/MotorVehicleEagle';
import { MotorVehicleKenya } from '../quotation/quotation-plan/models/Kenya/MotorVehicleKenya';
import { MotorVehicleTanzaniya } from '../quotation/quotation-plan/models/Tanzaniya/MotorVehicleTanzaniya';
import { MotorVehicleOromia } from '../quotation/quotation-plan/models/Oromia/MotorVehicleOromia';
import { MotorVehicleUganda } from '../quotation/quotation-plan/models/Uganda/MotorVehicleUganda';
import { MotorVehicleMadison } from '../quotation/quotation-plan/models/Madison/MotorVehicleMadison';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { MotorVehicleSanlamIvory } from '../quotation/quotation-plan/models/sanlamIvory/MotorVehicleSanlamIvory';
import { el } from '@fullcalendar/core/internal-common';
import { MotorVehicleSanlamBurkina } from '../quotation/quotation-plan/models/sanlamBurkina/MotorVehicleSanlamBurkina';
import { MotorVehicleSaudiarabia } from '../quotation/quotation-plan/models/Saudiarabia/MotorVehicleSaudiarabia';
declare var $: any;
interface Plan {
  title: string;
  excess: number;
  totalSum: number;
  year: number;
  discount: number
}
export class ForceLengthValidators {
  static maxLength(maxLength: number) {
    return (control: FormControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }

      if (control.value.length > maxLength) {
        //force the length to 
        control.setValue(control.value.substring(0, maxLength));
      }

      return null;
    };
  }
  static min(min: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {

      let val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return { 'min': true };
    }
  }
  
}
export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Check if the value is a valid number
    const value = control.value;
    const isValid = value === null || value === '' || !isNaN(value) && isFinite(value);
    return isValid ? null : { 'number': { value: control.value } };
  };
}
@Component({
  selector: 'app-common-quote-details',
  templateUrl: './common-quote-details.component.html',
  styles: [`
        ::ng-deep .p-menu-overlay {
            position: fixed !important;
        }
        :host ::ng-deep .mat-mdc-form-field {
          display: inline !important;
        }
        :host ::ng-deep .mdc-icon-button { padding: 0px !important}
        :host ::ng-deep .mat-mdc-form-field-infix { min-height:0px !important}
        :host ::ng-deep .mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix {padding:0px !important}
  `],
  providers: [MessageService]
})
export class CommonQuoteDetailsComponent implements OnInit {
  plans: Plan[] = [
    { title: 'Cash/ Cheque etc', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Geographical Extension', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Electronic Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Other Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
  ];
  form = new FormGroup({});
  tabIndex: any; claimsYN: any = 'N'; gpsYn: any = 'N';
  policyStartDate: any = null; policyEndDate: any = null;
  promocode: any = null; currencyList: any[] = []; noOfDaysList: any[] = [];
  years: MenuItem[] = []; currencyCode: any = null;
  vehicles: MenuItem[] = []; agencyCode: any = null;
  customerFilterSuggestions: any[] = []; cityList: any[] = [];
  exchangeRate: any = null; minDate: any = null; countryId: any = null;
  sidebarVisible: boolean = false; userType: any = null;
  userDetails: any = null; loginId: any = null; branchCode: any = null;
  brokerbranchCode: any = null; productId: any = null; PackageYn: any = null;
  insuranceId: any = null; branchList: any[] = []; loginType: any = null;
  referenceNo: any = null; customerDetails: any; regNo: any = null; individualCalcIndex: any = 0;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  public customApiUrl1: any = this.AppConfig.CustomApiUrl1;
  vehicleDetails: any; customerData: any[] = []; licenseNo: any = null;
  havePromoCodeYN: any = null; typeList: any[] = [];
  noOfDays: any = null; industryList: any[] = [];
  sourceType: any = null; IndustryId: any = null;
  sourceTypeDesc: any = null; subuserType: any = null; subUrbanCode: any = null;
  brokerCode: any = null; brokerBranchCode: any = null; cityCode: any = null;
  customerCode: any = null; endorsementDate: any = null; districtList: any[] = [];
  endorsementEffectiveDate: any = null; endorsementRemarks: any = null;
  endorsementType: any = null; endorsementTypeDesc: any = null;
  endtCategoryDesc: any = null; endtCount: any = null;
  endtPrevQuoteNo: any = null; endtStatus: any = null; subUrbanList: any[] = [];
  endtPrevPolicyNo: any = null; orginalPolicyNo: any = null;
  isFinanceEndt: any = null; endorsementSection: boolean = false;
  customerName: any = null; quoteRefNo: any = null; endorsePolicyNo: any;
  finalizeYN: any = 'N'; acExecutiveId: any = null;
  commissionType: any = null; messages: Message[] = [];
  endMinDate: Date; endMaxDate: Date; selectedCustomer: any = null;
  minCurrencyRate: any = null; licenseIssuedDate: any = null;
  maxCurrencyRate: any; typeValue: any = null;
  motorTypeList: any[] = []; drivenBy: any = "D";
  cityValue: any = null; bodyTypeValue: any = null; stateValue: any = null;
  motorUsageList: any[] = []; borrowerList: any[] = []; motorUsageValue: any = null;
  classList: any[] = []; classValue: any = null;
  vehicleSI: any = null; accessoriesSI: any = null; windShieldSI: any = null;
  tppdSI: any = null; tiraCoverNoteNo: any = null;
  enableAddVehicle: boolean = false; stateList: any[] = [];
  endorsementYn: any = null; endorseEffectiveDate: any = null;
  collateralYN: any = 'N'; buildingOwnerYN: any = 'N';
  borrowerValue: any = null; collateralName: any = null;
  firstLossPayee: any = null; endorseCoverModification: any = null;
  isSearchFormVisible = false; enableRemoveVehicle: boolean;
  adminSection: boolean = false; changeUwSection: boolean = false;
  uwQuestionList: any[] = []; vehicleId: string;
  applicationId: string; noOfCompPolicy: any; driverDob: any = null;
  claimRatio: any; enableFieldsSection: boolean = false; martialStatus: any = null;
  customers: any[] = []; currentIndex: number; PurchaseDate: any = null; driverName: any = null;
  collateralValue: boolean = false; fleetYN: any = ''; fleetValue: boolean = false;
  noOfVehicles: any = null; policyStartError: boolean = false; policyEndError: boolean = false;
  currencyCodeError: boolean = false; policyPassDate: boolean = false; customerCodeError: boolean = false;
  sourceTypeList: any[] = []; premiumList: any[] = []; modifiedYN: any = 'N'; brokerBranchCodeError: boolean = false;
  Code: any; brokerList: any[] = []; sourceCodeDesc: any; gender: any = 'M'; driverType: any = '1';
  brokerLoginId: null; backDays: any; brokerBranchList: any[] = []; customerList: any[] = [];
  commonSection: boolean = false; showCustomerList: boolean = false; issuerSection: boolean = false;
  commissionValue: any; vehicleValue: any = ''; executiveValue: any; deductibleList: any[] = [];
  noOfDaysVlaue: string; sourceCodeError: boolean = false; brokerCodeError: boolean; endorsementId: any = null;
  showSectionSeltion: boolean = false; industryError: boolean = false; bankList: any[] = [];
  executiveSection: boolean = false; deductibleValue: any = ''; fields: any[] = []; driveExperience: any = null;
  endorsementDetails: any = null; vehicleValueList: any[] = []; inflationValue: any = null; lang: any = null;
  currentStatus: any = 'Y'; extendedTppdList: any[] = []; extendedTppdValue: any = ''; customerColumn: any[] = [];
  commonData: any = null; pACoversList: any[] = []; pACoverValue: any = ''; productItem: any = null; martialList: any[] = [];
  claimTypeValue: any = null; vehicleDetailsList: any[] = []; defenceCostValue: any = null; claimTypeList: any[] = [];
  vehicleClassValue: any = null; motorDetails: any = null; defencecostList: any[] = []; minDobDate: any; vehicleClassList: any[] = [];
  vehicleTypeList: any[] = []; alarmYN: any = 'Y'; deductiblesList: any[] = []; collateralChecked: boolean = false;
  regNoError: boolean; driverOptions: any[] = []; genderOptions: any[] = []; searchValue: any = []; clearSearchSection: boolean = false;
  duplicateRegister: boolean = false; enableCollateralDetails: boolean = false; enableCustomerDetails: boolean = false;
  motorUsageType: any = null; VehicleSI: any = null; WindShieldSI: any = null; orgPolicyNo: any = null; endorseCategory: any = null; endorsementName: any = null; endorseShortCode: any = null; enableFieldsList: any[] = []; enablePolicyStart: boolean = false; enablePolicyEnd: boolean = false; enableCurrency: boolean = false;
  hideSection: boolean = false;questionSection:boolean=false;
  typeListAlt: any[] = [];
  typeListIvory: any[] = [];
  DrivingLicensingAge: any;
  CategoryExDate: any;
  CategoryDate: any;
  Subscriber: any;
  Civility: any;
  PlaceIssue: any;
  CategoryCode: any;
  Email: any;
  ContactCode: any;
  Contact: any;
  LicenseIssueDt: any;
  socioProfessionalList: any[] = [];
  aggregatedList: any[] = [];
  municipalityTrafficList: any[] = [];
  uploadTab: boolean = false;
  imageUrl: any;
  individualDocumentList: any[] = [];
  uploadListDoc: any[] = [];
  uploadedIndividualList: any[] = [];
  uploadedDocList: any[] = [];
  quoteNo: any;
  uploadDocList: any[] = [];
  uploadSubDocList: any[] = [];
  checkStatusSP: any = 'P';
  tranId: any;
  dataValidationList: any[] = [];
  BankingDelegation: any;
  LoanAmount: any;
  CollateralCompanyName: any;
  CollateralCompanyAddress: any;
  LoanStartDate: string;
  LoanEndDate: string;
  zoneCirculationList: any[]=[];
  vehicleTypeListIVY: any[]=[];
  vehicleUsageListIVY: any[]=[];
  pACoverIdListIVY: any[]=[];
  Zone: any[]=[];
  ClassList: any[]=[];
  constructor(private router: Router, private sharedService: SharedService, private datePipe: DatePipe,
    private appComp: AppComponent,
    private translate: TranslateService, private messageService: MessageService) {
    this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails", this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn = this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.loginType = this.userDetails.Result.LoginType;
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    this.quoteNo = sessionStorage.getItem('quoteNo');
    let loginType = this.userDetails.Result.LoginType;
    if (this.userType == 'Issuer') this.getSourceList();
    this.driverOptions = [
      { "label": 'Driver', "value": '2' },
      { "label": 'Owner', "value": '1' },
    ];
    this.genderOptions = [
      { "label": 'Male', "value": 'M' },
      { "label": 'Female', "value": 'F' },
      { "label": 'Other', "value": 'O' },
    ];
    this.vehicleValueList = [
      { "Code": "", "CodeDesc": "---Select---" },
      { "Code": "1", "CodeDesc": "Market" },
      { "Code": "2", "CodeDesc": "Agreed" },
    ];
    this.extendedTppdList = [
      { "Code": "", "CodeDesc": "---Select---" },
      { "Code": "1", "CodeDesc": "10,000 - 25,000" },
      { "Code": "2", "CodeDesc": "25,001 - 50,000" },
      { "Code": "2", "CodeDesc": "50,001 - 1,00,000" },
    ]
    this.pACoversList = [
      { "Code": "", "CodeDesc": "---Select---" },
      { "Code": "1", "CodeDesc": "Driver" },
      { "Code": "2", "CodeDesc": "Famiy With Driver" },
      { "Code": "3", "CodeDesc": "Famiy Without Driver" },
      { "Code": "4", "CodeDesc": "All Occupant" }
    ];
    this.productItem = new ProductData();
    // if(this.insuranceId=='100027' || this.insuranceId=='100040' || this.insuranceId=='100042'){
    //   let fireData = null;
    //   if(this.insuranceId=='100027') fireData = new MotorVehicleSanlam();
    //   else if(this.insuranceId=='100040') fireData = new MotorVehicleSanlamIvory();
    //   else if(this.insuranceId=='100042') fireData = new MotorVehicleSanlamBurkina();
    //   this.fields[0] = fireData?.fields;
    //   console.log("this.fields[0]",this.fields[0]);
    // }
    //if(this.quoteRefNo) this.getUWDetails();
  }
  ngOnInit() {
    this.getCurrencyList();
    // this.getUploadedDocList();


    if (this.productId == '5') {
      this.getInsuranceTypeList();
      this.getInsuranceClassList();
    }
    else if (this.productId == '6' || this.productId == '13' || this.productId == '16' || this.productId == '39' || this.productId == '14' || this.productId == '32' || this.productId == '1' || this.productId == '21' || this.productId == '26' || this.productId == '25' || this.productId == '57') { this.getIndustryList() }

    this.customerColumn = ['Select', 'Reference No', 'Customer Name', 'Customer Type', 'ID Number'];
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.minDobDate = new Date(year - 18, month, day);
    this.years = [{ label: '1 Year' }, { label: '2 Year' }];
    this.vehicles = [{ label: 'Vehicle 1' }, { label: 'Vehicle 2' }];
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      this.adminSection = true; this.issuerSection = false;
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
    else this.issuerSection = false
    this.currencyCode = this.userDetails?.Result?.CurrencyId;
    this.setCustomerValues(null);
    let referenceNo = sessionStorage.getItem('customerReferenceNo');
    if (referenceNo) {
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
    }
    else {
      this.showSearchForm('direct');
    }
    this.appComp.getLanguage().subscribe((res: any) => {
      if (res) this.lang = res;
      else this.lang = 'en';
      this.translate.setDefaultLang(this.lang); this.checkFieldNames();
    });
    if (!this.lang) {
      if (sessionStorage.getItem('language')) this.lang = sessionStorage.getItem('language');
      else this.lang = 'en';
      sessionStorage.setItem('language', this.lang); this.checkFieldNames();
      this.translate.setDefaultLang(sessionStorage.getItem('language'));
    }
    // let s = sessionStorage.getItem('Addnew');
    // if(s='Addnew'){
    //   console.log('Half page',s)
    //   this.showSearchForm();
    // }
    // else{
    //   console.log('End page',s)
    //   this.hideSearchForm();
    // }
  }
  checkHeaderName(val) {
    let name = val.replaceAll(' ', '');
    return 'QUOTEGRID.' + name
  }
  getNoOfDaysList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/quoteperiod`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.noOfDaysList = data.Result;
        }
      },
      (err) => { },
    );
  }
  onNoOfDaysChange(type){
    if(this.noOfDays!=null && this.noOfDays!=undefined){
      let startDate = null;
      if(String(this.policyStartDate).split('/').length>1) startDate = this.policyStartDate
      else startDate = this.datePipe.transform(String(this.policyStartDate),'dd/MM/yyyy')
      if(startDate){
        let dateList  = String(startDate).split('/')
        let endDate = dateList[2]+'-'+dateList[1]+'-'+dateList[0]; 
        var d=  new Date(String(endDate));
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        this.endMinDate = new Date(startDate);
        this.policyEndDate = new Date(year, month, day+Number(this.noOfDays)-1);
        this.endMaxDate = new Date(year, month, day+Number(this.noOfDays));
        this.onChangeEndDate();
      }
    }
  }
  getDisplayName() {
    if (this.lang == 'en') return 'CodeDesc';
    else return 'CodeDescLocal'
  }
  getIndustryList() {
    this.industryList = [];
    let ReqObj = {
      "CategoryId": null,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '', 'CodeDescLocal': '--Sélectionner--' }]
        this.industryList = defaultObj.concat(data.Result);
      },
      (err) => { },
    );
  }
  checkFieldNames() {
    if (this.fields.length != 0) {
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let i = 0;
      for (let field of fieldList) {
        let key = null;
        if (field.id) key = field.id
        else key = field.key
        this.translate.get('MOTORQUOTE.' + key).subscribe((translation: string) => {
          if (field.props) {
            field.props.label = translation;
            if (field.props.options) {
              for (let entry of field.props.options) {
                if (entry.CodeDescLocal == null || entry.CodeDescLocal == undefined) {
                  entry['CodeDescLocal'] = 'Other';
                }
                if (this.lang == 'en') entry['label'] = entry.CodeDesc
                else entry['label'] = entry.CodeDescLocal
              }
            }
          }
          else if (field.templateOptions) {
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
        i += 1;
        if (i == fieldList.length) console.log('Final Field Lang', fieldList);
      }
    }
  }

  checkDatesDisabled() {
    return (new Date(this.policyStartDate)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)
  }
  getCityLimitList() {
    if (this.cityList.length == 0 && this.tabIndex != 0) {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/citylimit`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.cityList = data.Result;
          }
        })
    }
  }
  getVehicleClassList() {
    if (this.vehicleClassList.length == 0 && this.tabIndex != 0) {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/vehicleclasses`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.vehicleClassList = data.Result;
            if (this.vehicleClassList.length != 0) {
              let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
              for (let i = 0; i < this.vehicleClassList.length; i++) {
                this.vehicleClassList[i].label = this.vehicleClassList[i]['CodeDesc'];
                this.vehicleClassList[i].value = this.vehicleClassList[i]['Code'];
                if (i == this.vehicleClassList.length - 1) {
                  console.log("Dropdown List", this.fields);
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) {
                    if (field.key == 'VehicleClass') { field.props.options = defaultObj.concat(this.vehicleClassList); this.checkFieldNames(); }
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
  getMartialList() {
    if (this.martialList.length == 0) {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/maritalstatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.martialList = data.Result;
          }
        },
        (err) => { },
      );
    }
  }
  getStateList() {
    let ReqObj = {
      "CountryId": this.countryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/stategroups`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.stateList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getClaimTypeList() {
    if (this.claimTypeList.length == 0 && this.tabIndex != 0) {
      let ReqObj = {
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}dropdown/claimtype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.claimTypeList = data.Result;
          }
        },
        (err) => { },
      );
    }
  }
  getDistrictList(type, cityValue, subUrban) {
    let ReqObj = {
      "CountryId": this.countryId,
      "StateId": this.stateValue
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/citygroups`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.districtList = data?.Result;
          if (type == 'change') {
            this.cityCode = null;
            this.subUrbanCode = null;
            this.subUrbanList = [];
          }
          else {
            this.cityCode = cityValue;
            this.getSubUrbanList('direct');
            this.subUrbanCode = subUrban;
          }
        }
      },
      (err) => { },
    );
  }
  getSubUrbanList(type) {
    if (this.cityCode != null && this.cityCode != '' && this.cityCode != undefined) {
      let entry = this.districtList.find(ele => ele.Code == this.cityCode);
      if (entry) {
        this.subUrbanList = entry?.SubUrbDetails;
        if (type == 'change') this.subUrbanCode = null;
      }
    }
  }
  getSourceList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    //let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    let urlLink = `${this.CommonApiUrl}dropdown/getsourcetype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.sourceTypeList = data.Result;
          if (!sessionStorage.getItem('quoteReferenceNo')) {
            if (sessionStorage.getItem('commonDetails')) {
              let details = JSON.parse(sessionStorage.getItem('commonDetails'))
              console.log('Session Details', details);
              this.currencyCode = details?.currencyCode;
              this.promocode = details?.promocode;
              this.brokerCode = details?.BrokerCode;
              this.Code = details?.SourceCode;
              this.onSourceTypeChange('direct');
              this.sourceType = details?.SourceType;
              this.customerCode = details?.CustomerCode;
              this.customerName = details?.CustomerName;
              this.brokerBranchCode = details?.BrokerBranchCode;
              this.policyStartDate = details?.policyStartDate;
              this.policyEndDate = details?.policyEndDate;
              this.exchangeRate = this.exchangeRate;
              this.onCurrencyChange('direct');
            }
          }
        }
      },

      (err) => { },
    );
  }
  onBrokerChange() {
    let entry = this.brokerList.find(ele => String(ele.Code) == this.brokerCode);
    if (entry) {
      this.brokerLoginId = entry.Name;
    }
    this.getBrokerBranchList('change');
  }
  onCustomerSearch() {
    if (this.searchValue) {
      this.customers = [];
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "SearchValue": this.searchValue,
        "CreatedBy": ""
      }
      let urlLink = `${this.CommonApiUrl}api/searchcustomerdata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.customers = data.Result;
            this.clearSearchSection = true;
          }
        },
        (err) => { },
      );
    }
  }
  premiunDropdown() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": "3",
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.premiumList = data.Result;
        }
      },
      (err) => { },
    );
  }
  onSourceTypeChange(type) {
    this.sourceCodeDesc = null;
    if (this.Code != null && this.Code != '' && this.Code != undefined) {
      let entry = this.sourceTypeList.find(ele => ele.Code == this.Code);
      if (entry) this.sourceCodeDesc = entry?.CodeDesc;
    }
    let ReqObj = {
      "SourceType": this.sourceCodeDesc,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        //this.branchList = data.Result;
        // this.updateComponent.sourceType = this.Code;
        // this.updateComponent.sourceTypeDesc = this.sourceCodeDesc;
        this.brokerList = data.Result;
        //if(this.Code=='Agent') this.executiveSection = true;
        if (type == 'change') {
          if (this.productId == '5' || this.productId == '46' || this.productId == '29') { this.modifiedYN = 'Y' }
          // this.updateComponent.CustomerCode = null;
          // this.updateComponent.brokerCode = null;
          // this.updateComponent.brokerBranchCode = null;
          // this.updateComponent.brokerLoginId = null;
          this.customerCode = null;
          this.customerName = null;
          this.brokerCode = null;
          this.brokerBranchCode = null;
          this.brokerLoginId = null;
        }
        else {
          //if(this.Code=='Broker' || this.Code=='Agent'){
          if (this.productId == '59' && this.userType == 'Issuer') this.getBackDaysDetails();
          let entry = this.brokerList.find(ele => String(ele.Code) == this.brokerCode);
          if (entry) {
            console.log("Found Entries", this.brokerCode, entry, this.Code)
            this.brokerLoginId = entry.Name;
            // this.updateComponent.brokerLoginId = this.brokerLoginId;
            // this.updateComponent.brokerCode = this.brokerCode;
          }
          // if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp' || this.sourceCodeDesc == 'Whatsapp'){
          //   if(type=='change'){

          //   }
          //   this.getBrokerBranchList('direct');
          //   this.commonSection = true;
          // }
          // else 
          this.onGetCustomerList('direct', this.customerCode);
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
  onGetCustomerList(type, code) {
    console.log("Search", code);
    if (this.userType == 'Issuer') {
      if (code != '' && code != null && code != undefined) {
        let branch = null;
        if (this.userType == 'issuer') { branch = this.brokerBranchCode; }
        else branch = this.branchCode
        let ReqObj = {
          "SourceType": this.sourceCodeDesc,
          "BranchCode": branch,
          "InsuranceId": this.insuranceId,
          "SearchValue": code
        }
        let urlLink = `${this.customApiUrl1}api/search/premiabrokercustomercode`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            this.customerList = data.Result;
            if (data.Result.length != 0) {

            }
            if (type == 'change') {
              this.showCustomerList = true;
              this.customerName = null;
            }
            else {
              this.showCustomerList = false;
              let entry = this.customerList.find(ele => ele.Code == this.customerCode);
              this.customerName = entry.Name;
              this.setCustomerValue(this.customerCode, this.customerName, 'direct')
            }

          },
          (err) => { },
        );
      }
      else {
        this.customerList = [];
      }
    }
    else {
      this.customerCode = this.userDetails.Result.CustomerCode;
      this.customerName = this.userDetails.Result.UserName;
      //this.updateComponent.CustomerCode = this.userDetails.Result.CustomerCode;
      this.commonSection = true;
    }

  }
  setCustomerValue(code, name, type) {
    this.showCustomerList = false;
    this.customerCode = code;
    this.customerName = name;
    if (this.issuerSection) {
      this.brokerCode = null;
      this.brokerBranchCode = null;
      this.brokerLoginId = name;
      this.commonSection = true;
    }
    if ((this.productId == '5' || this.productId == '46' || this.productId == '29') && type == 'change') { this.modifiedYN = 'Y' }
  }
  setCustomerValues(customerDetails) {
    if (sessionStorage.getItem('endorsePolicyNo')) {
      this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if (endorseObj) {
        this.endorsementDetails = endorseObj;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        this.endorseShortCode = endorseObj?.EndtShortCode;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        if (this.endorseShortCode != 42) {
          this.enablePolicyStart = this.enableFieldsList.some(ele => ele == 'policyStartDate' || ele == 'PolicyStartDate');
          this.enablePolicyEnd = this.enableFieldsList.some(ele => ele == 'policyEndDate' || ele == 'PolicyEndDate');
          this.enableCurrency = this.enableFieldsList.some(ele => ele == 'Currency');
          this.enableAddVehicle = this.enableFieldsList.some(ele => ele == 'addVehicle');
          this.enableRemoveVehicle = this.enableFieldsList.some(ele => ele == 'removeVehicle');
          this.enableCollateralDetails = this.enableFieldsList.some(ele => ele == 'CollateralDetails');
          this.enableCustomerDetails = this.enableFieldsList.some(ele => ele == 'customerName' || ele == 'Title');
        }
        else {
          this.enablePolicyStart = false; this.enablePolicyEnd = false; this.enableCurrency = false; this.enableCustomerDetails = false;
          this.enableAddVehicle = false; this.enableRemoveVehicle = false; this.enableCollateralDetails = false;
        }
      }
    }
    else {
      this.enablePolicyStart = false; this.enablePolicyEnd = false; this.enableCurrency = false;
      this.enableAddVehicle = false; this.enableRemoveVehicle = false; this.enableCollateralDetails = false;
    }
    if (this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId == '14' || this.productId == '32' || this.productId == '1') {
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.quoteRefNo = referenceNo;
        this.getExistingBuildingList();
      }
      else {
        this.quoteRefNo = null;
        this.branchCode = this.userDetails.Result.BranchCode;
        //this.updateComponent.branchValue = this.branchValue;
        this.currencyCode = this.userDetails.Result.CurrencyId;
        this.onCurrencyChange('direct');
        //this.searchSection = true;
        this.commonSection = true;
      }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
        this.adminSection = true; this.issuerSection = false;
      }
      else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
      else this.issuerSection = false
    }
    else if (this.productId != '4') {
      let vehicleDetails: any;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.quoteRefNo = referenceNo;
      }
      if (this.productId == '5' || this.productId == '46' || this.productId == '29') {
        vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        //this.getExistingVehiclesList();
        //this.setCommonValues('direct');
      }
      else if (this.productId != '5' && this.productId != '29') {
        vehicleDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      }
      if (vehicleDetails != undefined) {
        if (vehicleDetails.length != 0 && (sessionStorage.getItem('quoteReferenceNo') == undefined)) {
          this.quoteRefNo = null;
          this.setExistingValues(vehicleDetails);
        }
        else {
          let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceNo) {
            this.quoteRefNo = referenceNo;
            if (this.productId == '5' || this.productId == '46' || this.productId == '29') this.getExistingVehiclesList('direct');
            else if (this.productId != '5' && this.productId != '4' && this.productId != '46' && this.productId != '29') this.getExistingBuildingList();
          }
          else {
            let loadType = sessionStorage.getItem('firstLoad');
            if ((this.productId == '5' || this.productId == '29') && loadType) {
              let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
              this.tabIndex = 0;
              //this.setCommonValues(motorDetails);
            }
            else {
              this.quoteRefNo = null;
              this.tabIndex = 0;
              this.currencyCode = this.userDetails.Result.CurrencyId;
              this.noOfDaysVlaue = '90';
              this.tabIndex = 0;
              this.onCurrencyChange('direct');
              var d = new Date();
              var year = d.getFullYear();
              var month = d.getMonth();
              var day = d.getDate();
              if (this.productId == '5' || this.productId == '29') { this.policyStartDate = new Date(year, month, day); this.onStartDateChange('direct') }
              else if (this.productId == '46') { this.policyStartDate = new Date(year, month, day); this.onStartDateChange('direct') }
              //this.searchSection = true;
              this.commonSection = true;
            }
          }
        }

      }
      else {
        let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        if (referenceNo) {
          this.quoteRefNo = referenceNo;
          if (this.productId == '5' || this.productId == '46' || this.productId == '29') this.getExistingVehiclesList('direct');
          if (this.productId != '5' && this.productId != '4' && this.productId != '46' && this.productId != '29') this.getExistingBuildingList();
        }
        else {
          let loadType = sessionStorage.getItem('firstLoad');
          if ((this.productId == '5' || this.productId == '29') && loadType) {
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
              this.adminSection = true; this.issuerSection = false;
            }
            else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
            else this.issuerSection = false
            let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
            this.setTiraVehicleValues(motorDetails);
            //this.setCommonValues(motorDetails);
          }
          else {
            this.quoteRefNo = null;
            this.branchCode = this.userDetails.Result.BranchCode;
            //this.updateComponent.branchValue = this.branchValue;
            this.currencyCode = this.userDetails.Result.CurrencyId;
            this.noOfDaysVlaue = '90';
            this.tabIndex = 0;
            this.onCurrencyChange('direct');
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            if (this.productId == '5' || this.productId == '29') { this.policyStartDate = new Date(year, month, day); this.onStartDateChange('direct') }
            else if (this.productId == '46') { this.policyStartDate = new Date(year, month, day); this.onStartDateChange('direct') }
            //this.searchSection = true;
            this.commonSection = true;
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
              this.adminSection = true; this.issuerSection = false;
            }
            else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
            else this.issuerSection = false;
          }
        }
      }
    }
    else if (this.productId == '4') {
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.quoteRefNo = referenceNo;
        this.getExistingTravelDetails();
      }
      else {
        this.quoteRefNo = null;
        this.branchCode = this.userDetails.Result.BranchCode;
        // this.updateComponent.branchValue = this.branchValue;
        // this.updateComponent.HavePromoCode = this.HavePromoCode;
        // this.updateComponent.PromoCode = this.PromoCode;
        this.currencyCode = this.userDetails.Result.CurrencyId;
        this.onCurrencyChange('direct');
        //this.searchSection = true;
        this.commonSection = true;
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
          this.adminSection = true; this.issuerSection = false;
        }
        else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
        else this.issuerSection = false
      }
    }
  }
  getExistingBuildingList() {
    if (this.productId != '5') {
      let urlLink: any;
      let ReqObj = {
        "RequestReferenceNo": this.quoteRefNo,
        "RiskId": "1",
        "ProductId": this.productId,
        "InsuranceId": this.insuranceId
      }
      //if(this.productId=='59') urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
      if (this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId == '14' || this.productId == '13' || this.productId == '19' || this.productId == '32' || this.productId == '1' || this.productId == '26' || this.productId == '21' || this.productId == '25' || this.productId == '42' || this.productId == '59' || this.productId == '24') urlLink = `${this.motorApiUrl}api/slide/getcommondetails`;
      else urlLink = `${this.motorApiUrl}api/geteservicebyriskid`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.commonData = data.Result;
            let entry: any;
            //if(this.productId=='59') entry = this.vehicleDetailsList[0];
            entry = this.commonData
            if (entry?.FinalizeYn != null) {
              this.finalizeYN == entry?.FinalizeYn;
              sessionStorage.setItem('FinalizeYN', this.finalizeYN);
            }
            else this.finalizeYN = 'N';
            if (entry?.EndorsementDate != null) {
              this.endorsementDetails['EndorsementDate'] = entry?.EndorsementDate;
              this.endorsementDetails['EndorsementEffectiveDate'] = entry?.EndorsementEffectiveDate;
              this.endorsementDetails['EndorsementRemarks'] = entry?.EndorsementRemarks;
              this.endorsementDetails['EndorsementType'] = entry?.EndorsementType;
              this.endorsementDetails['EndorsementTypeDesc'] = entry?.EndorsementTypeDesc;
              this.endorsementDetails['EndtCategoryDesc'] = entry?.EndtCategoryDesc;
              this.endorsementDetails['EndtCount'] = entry?.EndtCount;
              this.endorsementDetails['EndtPrevPolicyNo'] = entry?.EndtPrevPolicyNo;
              this.endorsementDetails['EndtPrevQuoteNo'] = entry?.EndtPrevQuoteNo;
              this.endorsementDetails['EndtStatus'] = entry?.EndtStatus;
              this.endorsementDetails['IsFinanceEndt'] = entry?.IsFinanceEndt;
              this.endorsementDetails['OrginalPolicyNo'] = entry?.OrginalPolicyNo;
              sessionStorage.setItem('endorseTypeId', JSON.stringify(this.endorsementDetails));
            }
            this.applicationId = entry.ApplicationId;
            if (entry?.PolicyStartDate != null) {
              var dateParts = entry?.PolicyStartDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.policyStartDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
              //this.policyStartDate = dateObject.toString()
            }
            if (entry?.PolicyEndDate != null) {
              var dateParts = entry?.PolicyEndDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.policyEndDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
              this.onChangeEndDate();
            }
            //this.executiveValue = entry?.AcExecutiveId;
            this.currencyCode = entry?.Currency;
            this.onCurrencyChange('direct');
            this.exchangeRate = entry?.ExchangeRate;
            this.IndustryId = entry?.IndustryId;
            this.executiveValue = entry?.AcExecutiveId;
            this.havePromoCodeYN = entry?.Havepromocode;
            if (entry.BuildingOwnerYn != null && entry?.BuildingOwnerYn != '') this.buildingOwnerYN = entry?.BuildingOwnerYn;
            this.promocode = entry?.Promocode;
            if (entry.SourceTypeId != null) this.Code = entry?.SourceTypeId;
            this.branchCode = entry?.BranchCode;
            this.brokerBranchCode = entry?.BrokerBranchCode;
            this.customerCode = entry?.CustomerCode;
            this.brokerCode = entry?.BrokerCode;
            this.currentStatus = entry?.Status;
            this.onSourceTypeChange('direct');
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
              this.adminSection = true; this.issuerSection = false;
            }
            else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
            else this.issuerSection = false
          }
          console.log(
            "Code", this.Code, this.branchCode, this.brokerBranchCode, this.customerCode, this.brokerCode
          )
          //this.onGetCustomerList('direct',this.customerCode);

        },
        (err) => { },
      );
    }

  }
  setTiraVehicleValues(entry) {
    this.tabIndex = 0;
    console.log("Entry Values", entry);
    if (entry?.PolicyStartDate != null) {
      var dateParts = entry.PolicyEndDate.split("/");
      var dateParts2 = entry.PolicyStartDate.split('/');
      var startDate = dateParts2[2] + '-' + dateParts2[1] + '-' + dateParts2[0];
      var endDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if ((new Date(startDate)).setHours(0, 0, 0, 0) >= (new Date()).setHours(0, 0, 0, 0)) {
        var dateParts = entry?.PolicyStartDate.split("/");
        this.policyStartDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        var dateParts2 = entry?.PolicyEndDate.split("/");
        this.onChangeEndDate();
      }
      else if (((new Date(endDate)).setHours(0, 0, 0, 0) >= (new Date()).setHours(0, 0, 0, 0))) {
        var d = new Date(endDate);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        let policyStartDate: any = this.datePipe.transform(new Date(year, month, day + 1), "dd/MM/yyyy");
        let policyEndDate: any = this.datePipe.transform(new Date(year + 1, month, day), "dd/MM/yyyy");
        var dateParts = policyEndDate.split("/");
        var dateParts2 = policyStartDate.split('/');
        var startDate = dateParts2[2] + '-' + dateParts2[1] + '-' + dateParts2[0];
        var endDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        this.policyStartDate = startDate;
        this.policyEndDate = endDate;
        this.onChangeEndDate();
      }
      else {
        let startDate1 = this.datePipe.transform(new Date(year, month, day), "dd/MM/yyyy");
        let EndDate1 = this.datePipe.transform(new Date(year + 1, month, day - 1), "dd/MM/yyyy");
        var dateParts: any = startDate1.split("/");
        var dateParts2: any = EndDate1.split('/');
        var endDate = dateParts2[2] + '-' + dateParts2[1] + '-' + dateParts2[0];
        var startDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        this.policyStartDate = startDate;
        this.policyEndDate = endDate;
        this.onChangeEndDate();

      }
    }
    else {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      let startDate1 = this.datePipe.transform(new Date(year, month, day), "dd/MM/yyyy");
      let EndDate1 = this.datePipe.transform(new Date(year + 1, month, day - 1), "dd/MM/yyyy");
      var dateParts: any = startDate1.split("/");
      var dateParts2: any = EndDate1.split('/');
      var endDate = dateParts2[2] + '-' + dateParts2[1] + '-' + dateParts2[0];
      var startDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
      this.policyStartDate = startDate;
      this.policyEndDate = endDate;
      this.onChangeEndDate();
    }
    // if(entry?.PolicyEndDate != null ){
    //   var dateParts = entry?.PolicyEndDate.split("/");
    //     // month is 0-based, that's why we need dataParts[1] - 1
    //     this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    //     this.updateComponent.policyEndDate = this.policyEndDate;
    //     this.onChangeEndDate('direct');
    //   }
    if (this.issuerSection) {
      this.Code = entry.SourceType;

      //if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
      this.customerCode = entry.CustomerCode;
      this.customerName = entry.CustomerName;
      // }
      // else{
      //   this.brokerCode = entry.BrokerCode;
      //   this.brokerBranchCode = entry.BrokerBranchCode;
      // }
      this.onSourceTypeChange('direct');
    }
    if (entry.CURRENCY_CODE != null && entry.CURRENCY_CODE != undefined) this.currencyCode = entry?.CURRENCY_CODE;
    else this.currencyCode = this.userDetails.Result.CurrencyId;
    this.onCurrencyChange('direct');
    this.promocode = entry?.PromoCode;
    if (entry.SourceType != null) this.Code = entry?.SourceType;
    this.customerCode = entry?.CustomerCode;
    this.branchCode = entry.BranchCode;
    this.brokerCode = entry.BrokerCode;
    this.brokerBranchCode = entry.BrokerBranchCode;
    if (this.branchCode == null || this.branchCode == undefined) this.branchCode = '01';
    if (this.brokerBranchCode == null || this.brokerBranchCode == undefined) this.brokerBranchCode = '1';
    this.executiveValue = entry?.AcExecutiveId;
    this.promocode = null;
    console.log("Final Values", this.brokerList, this.brokerCode)
    this.onSourceTypeChange('direct');
    if (this.vehicleDetails) this.onSaveSearchVehicles();
  }
  getExistingTravelDetails() {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "TravelId": "1"
    }
    let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let customerDatas = data.Result;
        this.applicationId = customerDatas.ApplicationId;
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
          this.adminSection = true; this.issuerSection = false;
        }
        else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
        else this.issuerSection = false
        //this.travelDetails = customerDatas;
        this.Code = customerDatas.SourceTypeId;
        this.branchCode = customerDatas.BranchCode;
        this.brokerBranchCode = customerDatas.BrokerBranchCode;
        this.brokerCode = customerDatas.BrokerCode;
        this.onSourceTypeChange('direct');
        this.promocode = customerDatas.PromoCode;
        this.customerCode = customerDatas.CustomerCode;

        this.executiveValue = customerDatas?.AcExecutiveId;
        this.commissionValue = customerDatas?.CommissionType;
        if (customerDatas?.TravelStartDate != null) {
          var dateParts = customerDatas?.TravelStartDate.split("/");
          // month is 0-based, that's why we need dataParts[1] - 1
          // this.travelStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
          // this.updateComponent.travelStartDate = this.travelStartDate;
          //this.policyStartDate = dateObject.toString()
        }
        if (customerDatas?.TravelEndDate != null) {
          var dateParts = customerDatas?.TravelEndDate.split("/");
          // month is 0-based, that's why we need dataParts[1] - 1
          // this.travelEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
          // this.updateComponent.travelEndDate = this.travelEndDate;
          this.onChangeEndDate();
        }
        //  this.TravelForm.controls['travelStartDate'].setValue(customerDatas.TravelStartDate);
        //  this.TravelForm.controls['travelEndDate'].setValue(customerDatas.TravelEndDate);
        this.currencyCode = customerDatas.Currency;
        this.onCurrencyChange('direct');
        //this.exchangeRate = customerDatas.ExchangeRate;
        this.commonSection = true;
      },
      (err) => { },
    );
  }
  setExistingValues(vehicleList) {
    console.log("Vehicles on Session", vehicleList)
    this.vehicleDetailsList = [];
    if (vehicleList.length != 0) {
      let i = 0;
      for (let vehicle of vehicleList) {
        if (i == 0) {
          let entry = vehicle;
          // if(this.updateComponent.policyStartDate!=null && this.policyStartDate!=undefined && this.policyStartDate!=''){
          //    this.policyStartDate = this.updateComponent.policyStartDate;
          //    this.policyEndDate = this.updateComponent.policyEndDate;
          //   this.onChangeEndDate('direct');
          // }
          // else{
          if (entry?.PolicyStartDate != null) {
            var dateParts = entry?.PolicyStartDate.split("/");
            // month is 0-based, that's why we need dataParts[1] - 1
            this.policyStartDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
            //this.policyStartDate = dateObject.toString()
          }
          if (entry?.PolicyEndDate != null) {
            var dateParts = entry?.PolicyEndDate.split("/");
            // month is 0-based, that's why we need dataParts[1] - 1
            this.policyEndDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
            this.onChangeEndDate();
          }
          //}
          this.commissionValue = entry?.CommissionType;
          this.executiveValue = entry?.AcExecutive;
          this.Code = entry?.SourceType;
          //this.updateComponent.sourceType = this.Code;
          this.brokerCode = entry.BrokerCode;
          this.branchCode = entry?.BranchCode;
          // this.updateComponent.branchValue = this.branchValue;
          this.brokerBranchCode = entry?.BrokerBranchCode;
          //this.updateComponent.brokerBranchCode = this.brokerBranchCode;
          this.brokerLoginId = entry?.LoginId;
          this.customerCode = entry.CustomerCode;
          this.onSourceTypeChange('direct');
          this.currencyCode = entry?.Currency;
          this.exchangeRate = entry?.ExchangeRate;
          this.onCurrencyChange('direct');
          // this.HavePromoCode = entry.HavePromoCode;
          //this.updateComponent.HavePromoCode = entry.HavePromoCode;
          if (entry.Promocode) {
            // this.updateComponent.PromoCode = entry.Promocode;
            this.promocode = entry.Promocode;
          }
          else if (entry.PromoCode) { this.promocode = entry.PromoCode; }
          this.typeValue = entry?.SectionId;
          //this.onGetCustomerList('direct',this.customerCode);
        }
        if (this.currencyCode == "TZS") { //this.editSection=false;
        }
        else { //this.editSection=true; 
        }
        if (vehicle.Active) { this.vehicleDetailsList.push(vehicle); }
        else {
          // this.wishSection=true;
          // this.searchSection = true;
          //this.vehicleWishList.push(vehicle);
        }
        i += 1;
        if (i == vehicleList.length) {
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
            this.adminSection = true; this.issuerSection = false;
          }
          else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; this.adminSection = false; }
          else this.issuerSection = false
          this.commonSection = true;
        }
      }
    }
  }
  getBrokerBranchList(type) {
    let urlLink = `${this.ApiUrl1}api/brokerbranches`;
    let ReqObj = {
      "BrokerCode": this.brokerCode,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.brokerBranchList = data?.Result;
          if (this.brokerBranchList.length == 1) {
            this.brokerBranchCode = this.brokerBranchList[0].Code;
          }

        }
      },
      (err) => { },
    );
  }
  getBackDaysDetails() {
    let loginId = null;
    if (this.userType != 'Issuer') loginId = this.loginId;
    else {
      loginId = this.brokerList.find(ele => String(ele.Code) == this.brokerCode)?.Name;
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/brokerbackdays`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.backDays = data.Result.BackDays;
          if (this.backDays != null) {
            let backDate = new Date();
            var d = backDate;
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            backDate = new Date(year, month, day - Number(this.backDays));
            this.minDate = new Date(year, month, (day - Number(this.backDays)) + 1);
          }
        }
      },
      (err) => { },
    );
  }
  getInsuranceTypeAltList() {
    let ReqObj = null, urlLink = null;
    ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    if(this.insuranceId=='100040' || this.insuranceId=='100042'){
      ReqObj['BodyId']=this.vehicleDetails.VehicleType
    }
    urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.typeListAlt = data.Result;
          if (this.typeListAlt.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.typeListAlt.length; i++) {
              this.typeListAlt[i].label = this.typeListAlt[i]['CodeDesc'];
              this.typeListAlt[i].value = this.typeListAlt[i]['Code'];
              if (i == this.typeListAlt.length - 1) {
                if (this.fields.length != 0) this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.typeListAlt);
              }
            }
          }
        }
      });
  }
  getAggregatedList() {
    let ReqObj = null, urlLink = null;
    ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
    }
    urlLink = `${this.CommonApiUrl}dropdown/aggregatedValue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.aggregatedList = data.Result;
          if (this.aggregatedList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.aggregatedList.length; i++) {
              this.aggregatedList[i].label = this.aggregatedList[i]['CodeDesc'];
              this.aggregatedList[i].value = this.aggregatedList[i]['Code'];
              if (i == this.aggregatedList.length - 1) {
                if (this.fields.length != 0) {
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) {
                    if (field.key == 'Aggregatedvalue') field.props.options = defaultObj.concat(this.aggregatedList);
                  }
                }
              }
            }
          }
        }
      });
  }

  getAggregatedDesc(value) {
    let entry = this.aggregatedList.find(ele => ele.Code == value)?.CodeDesc;
    return entry;
  }
  onChangeAggregated() {
    // this.fields[0]?.fieldGroup[0]?.fieldGroup[7]?.formControl.setValue(this.commaSeparatedToNumber(this.getAggregatedDesc(this.productItem.Aggregatedvalue)));
    if (this.productItem.Aggregatedvalue) this.commaSeparatedToNumber();

  }
  commaSeparatedToNumber() {
    if (this.productItem.Aggregatedvalue != "null" && this.productItem.Aggregatedvalue != "" && this.productItem.Aggregatedvalue != null && this.productItem.Aggregatedvalue != undefined) {
      this.productItem.VehicleSI = Number(this.getAggregatedDesc(this.productItem.Aggregatedvalue).replace(/,/g, ''))
    }
    else {
      this.productItem.Aggregatedvalue=null
      this.productItem.VehicleSI = 0;
    }
  }
  changeMarketValue() {
    // this.fields[0]?.fieldGroup[0]?.fieldGroup[7]?.formControl.setValue();
    this.productItem.VehicleSI = this.productItem.Marketvalue;
  }
  getMunicipalityTrafficList() {
    let ReqObj = null, urlLink = null;
    ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
    }
    urlLink = `${this.CommonApiUrl}dropdown/municipalityTraffic`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.municipalityTrafficList = data.Result;
          if (this.municipalityTrafficList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.municipalityTrafficList.length; i++) {
              this.municipalityTrafficList[i].label = this.municipalityTrafficList[i]['CodeDesc'];
              this.municipalityTrafficList[i].value = this.municipalityTrafficList[i]['Code'];
              if (i == this.municipalityTrafficList.length - 1) {
                let fieldList = this.fields[0]?.fieldGroup[0]?.fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'MunicipalityofTraffic') {
                    field.props.options = defaultObj.concat(this.municipalityTrafficList);
                    console.log(field.props.options, "field.props.options");
                  }
                }
              }
            }
          }
        }
      });
  }
  getInsuranceTypeList() {
    let ReqObj = null, urlLink = null;
    ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.typeList = data.Result;
          if (this.typeList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.typeList.length; i++) {
              this.typeList[i].label = this.typeList[i]['CodeDesc'];
              this.typeList[i].value = this.typeList[i]['Code'];
              if (i == this.typeList.length - 1) {

                if (this.fields.length != 0) {
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) { if (field.key == 'InsuranceType') field.props.options = defaultObj.concat(this.typeList); }
                  this.checkFieldNames();
                }
              }
            }
          }
        }

      },
      (err) => { },
    );
  }
  getInsuranceTypeListIvory() {
    let ReqObj = null, urlLink = null;
    ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "IndustryType": this.productItem.InsuranceType,
      "LoginId": this.loginId
    }
    urlLink = `${this.CommonApiUrl}api/getByIndsutryType`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.typeListIvory = data.Result;
          console.log(this.typeListIvory, "this.typeListthis.typeList");

          if (this.typeListIvory.length != 0) {
            let i = 0;
            let defaultObj = [{ 'label': '---Select--', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let entry of this.typeListIvory) {
              entry['label'] = entry.CodeDesc
              entry['value'] = entry.Code;
              i += 1;
              if (i == this.typeListIvory.length) {
                console.log("final list", this.typeListIvory)
                if (this.fields.length != 0) {

                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) {
                    if (field.key == 'InsuranceType') {
                      let list = field.props.options;
                      let entry = list.find(ele => ele.value == this.productItem.InsuranceType);
                      if (entry) this.productItem.InsurancetypeDesc = entry.label;
                    }
                    if (field.key == 'InsuranceClass') {
                      field.props.options = defaultObj.concat(this.typeListIvory);
                      console.log("Changes Forms", field)
                    }
                   
                  }
                }

                // this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.typeListIvory);
                this.checkFieldNames();
              }
            }
          }
        }

      },
      (err) => { },
    );
  }
  getType1() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DEDUCTIBLES"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.deductiblesList = data.Result;
          if (this.deductiblesList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.deductiblesList.length; i++) {
              this.deductiblesList[i].label = this.deductiblesList[i]['CodeDesc'];
              this.deductiblesList[i].value = this.deductiblesList[i]['Code'];
              if (i == this.deductiblesList.length - 1) {
                console.log("Dropdown List", this.fields)
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'Deductibles') { field.props.options = defaultObj.concat(this.deductiblesList); this.checkFieldNames(); }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }

  getType2() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DEFENCE_COST"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.defencecostList = data.Result;
          if (this.defencecostList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.defencecostList.length; i++) {
              this.defencecostList[i].label = this.defencecostList[i]['CodeDesc'];
              this.defencecostList[i].value = this.defencecostList[i]['Code'];
              if (i == this.defencecostList.length - 1) {
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'DefenceCost') {
                    field.props.options = defaultObj.concat(this.defencecostList);
                    this.checkFieldNames();
                  }
                }
              }
            }
            // if(this.extendedTppdList.length!=0){
            //   for (let i = 0; i < this.extendedTppdList.length; i++) {
            //     this.extendedTppdList[i].label = this.extendedTppdList[i]['CodeDesc'];
            //     this.extendedTppdList[i].value = this.extendedTppdList[i]['Code'];
            //     if (i == this.extendedTppdList.length - 1) {
            //         console.log("Dropdown List",this.fields)
            //         this.fields[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.extendedTppdList);
            //     }
            //   }
            // }
          }
        }
      },
      (err) => { },
    );
  }

  getType3() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "VEHICLE_VALUE_TYPE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.vehicleTypeList = data.Result;
          if (this.vehicleTypeList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.vehicleTypeList.length; i++) {
              this.vehicleTypeList[i].label = this.vehicleTypeList[i]['CodeDesc'];
              this.vehicleTypeList[i].value = this.vehicleTypeList[i]['Code'];
              if (i == this.vehicleTypeList.length - 1) {
                console.log("Dropdown List", this.fields)
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'VehicleValue') { field.props.options = defaultObj.concat(this.vehicleTypeList); this.checkFieldNames(); }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }

  getInsuranceClassList() {
    let loginId = null;
    if (this.userType != 'Issuer') {
      this.subuserType = sessionStorage.getItem('typeValue');
      if (this.subuserType == 'B2C') loginId = 'guest';
      else {
        loginId = this.loginId;
      }
    }
    else {
      loginId = this.loginId
      if (this.vehicleDetailsList.length != 0) loginId = this.vehicleDetailsList[0].LoginId;
      //if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
      "LoginId": loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.classList = data.Result;
          if (this.insuranceId != '100027' && this.insuranceId != '100040' && this.insuranceId != '100042') {
            if (this.classList.length != 0) {
              let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
              for (let i = 0; i < this.classList.length; i++) {
                this.classList[i].label = this.classList[i]['CodeDesc'];
                this.classList[i].value = this.classList[i]['Code'];
                if (i == this.classList.length - 1) {
                  if (this.insuranceId == '100002' || this.insuranceId == '100044' || this.insuranceId == '100018' || this.insuranceId == '100019' || this.insuranceId == '100020' || this.insuranceId == '100004') {
                    if (this.fields.length != 0) {
                      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                      for (let field of fieldList) {
                        if (field.key == 'InsuranceClass') {
                          field.props.options = defaultObj.concat(this.classList);
                          this.checkFieldNames();
                        }
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
  onChangeClassType() {
    this.vehicleSI = "0"; this.accessoriesSI = "0", this.windShieldSI = "0"; this.tppdSI = "0";
  }
  getMotorTypeList(type, motorValue, vehicleUsage) {
    if (this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100044' || this.insuranceId == '100002' || this.insuranceId == '100028' || this.insuranceId == '100018' || this.insuranceId == '100019' || this.typeValue == '100020') this.typeValue = this.productItem.InsuranceType;
    let typeValue = null;
    if (this.insuranceId != '100028') typeValue = null;
    else {
      if (Array.isArray(this.typeValue)) typeValue = null;
      else typeValue = this.typeValue;
    }
    let ReqObj = {
      "SectionId": typeValue,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          if (type == 'change') {
            this.cityValue = null;
            if (this.insuranceId == '100027' || this.insuranceId == '100028') {
              this.productItem.InsuranceClass = this.productItem?.InsuranceType
              this.classValue = this.typeValue;
            }
          }
          this.motorTypeList = data.Result;
          if (type == 'direct') { this.bodyTypeValue = motorValue; this.productItem.BodyType = motorValue }
          else if (this.insuranceId != '100027' && this.insuranceId != '100040' && this.insuranceId != '100042') this.bodyTypeValue = motorValue;
          if (this.vehicleDetails && this.motorTypeList.length != 0 && this.bodyTypeValue == null) {
            let value = this.motorTypeList.find(ele => ele.Code == this.vehicleDetails?.VehicleType || ele.CodeDesc == this.vehicleDetails?.VehicleType);
            if (value) { this.bodyTypeValue = value.Code; }
          }
          
          //this.getMotorUsageList(vehicleUsage,'direct');
          if (this.motorTypeList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.motorTypeList.length; i++) {
              this.motorTypeList[i].label = this.motorTypeList[i]['CodeDesc'];
              this.motorTypeList[i].value = this.motorTypeList[i]['Code'];
              if (i == this.motorTypeList.length - 1) {
                if (this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100044' || this.insuranceId == '100002' || this.insuranceId == '100028' || this.insuranceId == '100018' || this.insuranceId == '100019' || this.insuranceId == '100020') {
                  console.log(this.fields);
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) {
                    if (field.key == 'InsuranceType') {
                      let list = field.props.options;
                      let entry = list.find(ele => ele.value == this.productItem.InsuranceType);
                      if (entry) this.productItem.InsurancetypeDesc = entry.label;
                    }
                    if (field.key == 'VehicleSI' || field.key == 'AccessoriesSI' || field.key == 'WindShieldSI' || field.key == 'ExtendedTPPDSI') {
                      if (this.insuranceId == '100027') {
                        if (this.vehicleDetailsList.length == 1) {
                          field.hideExpression = false; field.hide = false;
                        }
                        else if (this.productItem.InsuranceType == '102' || this.productItem.InsuranceType == '95') {
                          field.hideExpression = true; field.hide = true;
                        }
                        else { field.hideExpression = false; field.hide = false; }
                      }
                      else if (this.insuranceId == '100028') {
                        if (this.vehicleDetailsList.length == 1) {
                          field.hideExpression = false; field.hide = false;
                        }
                        else if (this.productItem.InsuranceType == '104') {
                          field.hideExpression = false; field.hide = false;
                        }
                        else { field.hideExpression = true; field.hide = true; }
                      }
                    }
                    if (field.key == 'BodyType') {
                      field.props.options = defaultObj.concat(this.motorTypeList);
                      this.checkFieldNames();
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
  onChangeBodyType() {
    if (this.bodyTypeValue == '7') this.cityValue = '';
  }
  getMotorUsageList(vehicleValue, type) {
    let sectionId = null;
    //this.productItem.MotorUsage = this.motorUsageValue;
    if (this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100042') sectionId = '91';
    else {
      if (Array.isArray(this.productItem?.InsuranceType)) sectionId = null;
      else sectionId = this.productItem?.InsuranceType;
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "SectionId": sectionId,
      "BranchCode": this.branchCode,
      
    }
    
    let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.motorUsageList = data.Result;
          if (this.motorUsageList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': null, 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.motorUsageList.length; i++) {
              this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
              this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
              if (i == this.motorUsageList.length - 1) {
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'MotorUsage') {
                    if (vehicleValue == null && type != 'direct') {
                      if (this.motorUsageValue) this.productItem.MotorUsage = this.motorUsageValue;
                      let entry = this.motorUsageList.some(ele => ele.Code == this.productItem.MotorUsage || ele.CodeDesc == this.productItem.MotorUsage);
                      if (!entry) {
                        this.productItem.MotorUsage = ''; field.formControl.setValue(''); this.motorUsageValue = ''; this.motorUsageType = type;
                      }
                    }
                    else {
                      let entry = this.motorUsageList.find(ele => ele.Code == vehicleValue || ele.CodeDesc == this.vehicleDetails.MotorUsageDesc);
                      if (entry) { field.formControl.setValue(entry.Code); this.motorUsageType = type; this.productItem.MotorUsage = entry.Code }
                    }
                    field.props.options = defaultObj.concat(this.motorUsageList);
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
          if (this.insuranceId != '100028') this.productItem.MotorUsage = vehicleValue;
          if (this.vehicleDetails && this.motorUsageList.length != 0 && this.motorUsageValue == null) {
            let value = this.motorUsageList.find(ele => ele.CodeDesc == this.vehicleDetails?.Motorusage || ele.Code == this.vehicleDetails?.Motorusage);
            if (value) {
              this.motorUsageValue = value.Code;
              this.productItem.MotorUsage = value.Code;
            }
            else this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
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
  getDeleteName() {
    if (this.lang == 'en') return 'Delete Vehicle!'
    else return 'Excluir veículo!'
  }
  getDeleteMessage() {
    if (this.lang == 'en') return 'Are You Sure Want to Delete this Vehicle Details?'
    else return 'Tem certeza de que deseja excluir os detalhes deste veículo'
  }
  getDeleteYN(val) {
    if (val == 'Y') {
      if (this.lang == 'en') return 'Delete!'
      else return 'Excluir!'
    }
    else {
      if (this.lang == 'en') return 'Cancel'
      else return 'Cancelar'
    }
  }
  onDelete(rowData) {
    if (rowData.Active) {
      Swal.fire({
        title: `<strong> &nbsp;${this.getDeleteName()}</strong>`,
        iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
            ${this.getDeleteMessage()}
        </ul>`,
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: `${this.getDeleteYN('N')}`,
        confirmButtonText: `${this.getDeleteYN('Y')}`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.proceedDeleteVehicle(rowData);
          }
        });
    }
  }
  proceedDeleteVehicle(rowData) {
    let endtType = null;
    if (this.endorsementSection) {
      endtType = this.endorsementId
    }
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "Vehicleid": rowData.Vehicleid,
      "EndtType": endtType
    }
    let urlLink = `${this.motorApiUrl}api/deletemotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          if (this.endorsementSection) {
            Swal.fire({
              title: '<strong> &nbsp;Delete Vehicle!</strong>',
              iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
              icon: 'success',
              html:
                `<ul class="list-group errorlist">
                      Your Vehicle Delete Entry Stored Successfully,Proceed Further to Confirm
                  </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Okay',
            })
              .then((result) => {
                if (result.isConfirmed) {

                  this.getExistingVehiclesList('delete');
                }
              });
          }
          else {

            this.getExistingVehiclesList('delete');
          }
        }
      },
      (err) => { },
    );
  }
  EditData(rowData) {
    this.policyStartError = false; this.policyEndError = false; this.currencyCodeError = false;
    this.policyPassDate = false;
    let i = 0;
    if (!this.endorsementSection) {
      if (this.policyStartDate == null || this.policyStartDate == '' || this.policyStartDate == undefined) {
        i += 1;
        this.policyStartError = true;
      }
      else {
        let dateList = String(this.policyStartDate).split('/');
        if (dateList.length > 0) {
          let date = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
          var firstRepaymentDate = new Date(date);
          var today = new Date();
          if ((this.productId == '5' || this.productId == '4' || this.productId == '46' || this.productId == '29') && (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0))) {
            i += 1;
            this.policyPassDate = true;
          }
        }
      }
      if (this.policyEndDate == null || this.policyEndDate == '' || this.policyEndDate == undefined) {
        i += 1;
        this.policyEndError = true;
      }
      if (this.currencyCode == null || this.currencyCode == '' || this.currencyCode == undefined) {
        i += 1;
        this.currencyCodeError = false;
      }
      if (this.issuerSection) {
        if (this.Code == '' || this.Code == null || this.Code == undefined) {
          i += 1;
          this.sourceCodeError = true;
        }
        else {
          //if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
          if (this.customerName == '' || this.customerName == undefined || this.customerName == null) {
            this.customerCodeError = true;
            i += 1;
          }
          this.brokerCode = null;
          this.brokerBranchCode = null;
          this.brokerLoginId = null;
          // }
          // else{
          //   if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
          //     this.brokerCodeError = true;
          //     i+=1;
          //   }
          //   if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
          //     this.brokerBranchCodeError = true;
          //     i+=1;
          //   }
          // }
        }
      }
    }
    if (i == 0) {
      sessionStorage.setItem('editVehicleId', String(this.vehicleDetailsList.length + 1));
      let startDate = null, endDate = null;
      let startDateList = String(this.policyStartDate).split('/');
      if (startDateList.length > 1) startDate = this.policyStartDate
      else startDate = this.datePipe.transform(this.policyStartDate, 'dd/MM/yyyy');
      let endDateList = String(this.policyEndDate).split('/');
      if (endDateList.length > 1) endDate = this.policyEndDate
      else endDate = this.datePipe.transform(this.policyEndDate, 'dd/MM/yyyy');
      let entry = {
        "policyStartDate": startDate,
        "policyEndDate": endDate,
        "currencyCode": this.currencyCode,
        "exchangeRate": this.exchangeRate,
        "promoCode": this.promocode,
        "BrokerCode": this.brokerCode,
        "SourceType": this.sourceType,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BrokerBranchCode": this.brokerBranchCode,
        "LoginId": this.brokerLoginId,
        "SourceCode": this.Code,
      }
      sessionStorage.setItem('commonDetails', JSON.stringify(entry));
      console.log("Row Data", rowData)
      sessionStorage.setItem('EditCarDetails', JSON.stringify(rowData));
      sessionStorage.setItem('vehicleLength', String(rowData.Vehicleid));
      sessionStorage.setItem('Editcars', 'SavedFroms');
      sessionStorage.setItem('vehicleDetailsList', JSON.stringify(this.vehicleDetailsList));
      this.router.navigate(['/quotation/plan/motor-details'])
    }
  }
  getCurrencyList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productcurrency`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.currencyList = data.Result;
          if (this.currencyCode) {
            //   if(this.currencyList.some(ele=>ele.Code==this.currencyCode)){
            this.onCurrencyChange('direct');
            console.log('currency Details 888', this.currencyCode);
            // }
            // else this.currencyCode=this.currencyList[0].Code
          }
          else if (this.currencyList.length == 1) {
            this.currencyCode = this.currencyList[0].Code;
            this.onCurrencyChange('direct');
          }
        }

      },
      (err) => { },
    );
  }
  onCurrencyChange(type) {
    let currencyData
    if (this.currencyCode != null && this.currencyCode != '') {
      console.log('Currency Listss', this.currencyList);
      if (this.currencyList.length != 0) {
        currencyData = this.currencyList.find(ele => ele.Code == this.currencyCode);
        if (currencyData) {
          this.exchangeRate = currencyData?.ExchangeRate;
          this.minCurrencyRate = currencyData?.MinRate;
          this.maxCurrencyRate = currencyData?.MaxRate;
        }
        else {
          this.currencyCode = this.currencyList[0]?.Code;
          this.exchangeRate = this.currencyList[0]?.ExchangeRate;
          this.minCurrencyRate = this.currencyList[0]?.MinRate;
          this.maxCurrencyRate = this.currencyList[0]?.MaxRate;
        }
      }

    }
    console.log('CCCCCCCC', this.currencyCode)

    if (this.currencyCode == "TZS") {
      // this.editSection=false;
    }
    else {
      // this.editSection=true;
    }
    //if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    if (type == 'change' && this.quoteRefNo != null) {
      // this.updateComponent.ModifiedCurrencyYN = 'Y';
    }
    if (type == 'change') {
      if (this.vehicleDetailsList.length != 0) {
        for (let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
      }
    }
    if (this.exchangeRate == null) this.exchangeRate = '1.0'
  }
  getBorrowerList() {
    if (this.borrowerList.length == 0 && this.tabIndex != 0) {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/borrowertype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.borrowerList = data.Result;
            for (let entry of this.borrowerList) {
              if (this.lang == 'en') entry['label'] = entry.CodeDesc
              else entry['label'] = entry.CodeDescLocal
            }
          }

        },
        (err) => { },
      );
    }
  }
  getBankList() {
    if (this.bankList.length == 0 && this.tabIndex != 0) {
      let branchCode = '';
      if (this.adminSection || (this.userType != 'Broker' && this.userType != 'User')) {
        branchCode = this.branchCode
      }
      else {
        branchCode = this.brokerbranchCode
      }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.bankList = data.Result;
            for (let entry of this.bankList) {
              if (this.lang == 'en') entry['label'] = entry.CodeDesc
              else entry['label'] = entry.CodeDescLocal
            }
          }

        },
        (err) => { },
      );
    }

  }
  onCommonDetailsChange() {
    if (this.vehicleDetailsList.length != 0) {
      for (let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
    }
  }
  onChangeCustomer(value) {
    console.log("Entry", value);
    this.customerCode = value?.CustomerCode;
    if (this.customerCode != null) {
      let entry = this.customerList.find(ele => ele.CustomerCode == this.customerCode);
      this.customerName = entry?.CustomerName;
      console.log("Entry", entry);
    }
  }
  onVehicleValueChange(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.vehicleSI) {
      this.vehicleSI = this.vehicleSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  TppdCommaFormatted() {

    // format number
    if (this.tppdSI) {
      this.tppdSI = this.tppdSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  accessoriesCommaFormatted() {

    // format number
    if (this.accessoriesSI) {
      this.accessoriesSI = this.accessoriesSI.replace(/[^0-9.]|(?<=\..*)/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  WindSICommaFormatted() {
    // format number
    if (this.windShieldSI) {
      this.windShieldSI = this.windShieldSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  getCustomerDetails(refNo) {
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let customerDetails: any = data.Result;
          this.customerDetails = customerDetails;
          sessionStorage.setItem('customerDetails', JSON.stringify(this.customerDetails))
        }
      });
  }
  onTabClicked(event) {
    let index = event.index;
    this.tabIndex = index;
    if (index != 0) {
      this.productItem = new ProductData();
      this.driverName = null; this.driverType = '1'; this.gender = 'M'; this.licenseNo = null;
      this.driverDob = null; this.stateValue = null; this.cityCode = null; this.subUrbanCode = null;
      this.claimTypeValue = null;

      this.getMotorDetails(index - 1);
    }

    console.log('Tab event', event);
  }
  checMandatories() {
    this.policyStartError = false; this.policyEndError = false; this.currencyCodeError = false;
    this.policyPassDate = false;

    let i = 0;
    if (this.policyStartDate == null || this.policyStartDate == '' || this.policyStartDate == undefined) {
      i += 1;
      this.policyStartError = true;
    }
    else {
      let dateList = String(this.policyStartDate).split('/');
      if (dateList.length > 0) {
        let date = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
        var firstRepaymentDate = new Date(date);
        var today = new Date();
        if ((this.productId == '5' || this.productId == '4' || this.productId == '46' || this.productId == '29') && (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0))) {
          i += 1;
          this.policyPassDate = true;
        }
      }
    }


    if (this.policyEndDate == null || this.policyEndDate == '' || this.policyEndDate == undefined) {
      i += 1;
      this.policyEndError = true;
    }
    if (this.currencyCode == null || this.currencyCode == '' || this.currencyCode == undefined) {
      i += 1;
      this.currencyCodeError = true;
    }
    if (this.issuerSection) {
      if (this.Code == '' || this.Code == null || this.Code == undefined) {
        i += 1;
        this.sourceCodeError = true;
      }
      else {
        this.sourceCodeError = false;
        //if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
        if (this.customerName == '' || this.customerName == undefined || this.customerName == null) {
          this.customerCodeError = true;
          i += 1;
        }
        this.brokerCode = null;
        this.brokerBranchCode = null;
        this.brokerLoginId = null;
        // }
        // else{
        //   if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
        //     this.brokerCodeError = true;
        //     i+=1;
        //   }
        //   if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
        //     this.brokerBranchCodeError = true;
        //     i+=1;
        //   }
        // }
      }
    }
    if (this.productId == '6' || this.productId == '13' || this.productId == '16' || this.productId == '39' || this.productId == '14' || this.productId == '32' || this.productId == '1' || this.productId == '21' || this.productId == '26' || this.productId == '25' || this.productId == '57') {
      if (this.IndustryId == '' || this.IndustryId == null || this.IndustryId == undefined) {
        i += 1;
        this.industryError = true;
      }
      else this.industryError = false;
    }

    return i == 0;

  }
  getMotorDetails(index) {
    let vehicleDetails = this.vehicleDetailsList[index];
    this.vehicleId = vehicleDetails?.Vehicleid;

    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": this.customerDetails?.IdNumber,
      "Vehicleid": vehicleDetails?.Vehicleid
    }
    let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.vehicleDetails = data.Result;
          this.tabIndex = index + 1;
         // if (this.insuranceId == '100040' || this.insuranceId == '100042') this.getInsuranceTypeListIvory();
          this.productItem.InsuranceClass = data?.Result.InsuranceClass;
          this.vehicleDetails['InsuranceClass'] = this.productItem.InsuranceClass;
          this.vehicleDetails['NoOfClaimYears'] = data?.Result.NoOfClaimYears;
          this.vehicleDetails['NoOfPassengers'] = data?.Result.NoOfPassengers;
          this.vehicleDetails['NewValue'] = data?.Result.NewValue;
          this.vehicleDetails['AggregatedValue'] = String(data?.Result.AggregatedValue);
          this.vehicleDetails['Mileage'] = data?.Result.Mileage;
          if (this.vehicleDetails.Grossweight) this.vehicleDetails.Grossweight = String(this.vehicleDetails.Grossweight)
          this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
          this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
          this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
          this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
          this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
          this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
          this.vehicleDetails['HorsePower'] = data?.Result.HorsePower;
          this.vehicleDetails['NumberOfCards'] = data?.Result.NumberOfCards;
          this.vehicleDetails['MunicipalityofTraffic'] = data?.Result.MunicipalityTraffic;
          this.vehicleDetails['Transportationofhydrocarbons'] = data?.Result.TransportHydro;
          this.vehicleDetails['DriverName'] = data?.Result.DriverDetails.DriverName;
          this.vehicleDetails['DrivingLicensingAge'] = data?.Result.DriverDetails.DrivingLicensingAge;
          this.vehicleDetails['DateOfCirculation'] = data?.Result.DateOfCirculation;
          this.vehicleDetails['PaCoverId'] = data?.Result.PaCoverId;
          this.vehicleDetails['BankingDelegation'] = data?.Result.BankingDelegation;
          this.vehicleDetails['LoanStartDate'] = data?.Result.LoanStartDate;
          this.vehicleDetails['LoanEndDate'] = data?.Result.LoanEndDate;
          this.vehicleDetails['CollateralCompanyAddress'] = data?.Result.CollateralCompanyAddress;
          this.vehicleDetails['CollateralCompanyName'] = data?.Result.CollateralCompanyName;
          this.vehicleDetails['LoanAmount'] = data?.Result.LoanAmount;
          this.vehicleDetails['UsageId'] = data?.Result.UsageId;
          this.vehicleDetails['VehicleTypeIvr'] = data?.Result.VehicleTypeIvr;
         // this.vehicleDetails['VehicleType'] = data?.Result.VehicleType;
          this.vehicleDetails['ZoneCirculation'] = data?.Result.ZoneCirculation;
          this.vehicleDetails['Zone'] = data?.Result.Zone;
          this.vehicleDetails['Class'] = data?.Result.Class;
          this.typeValue = this.vehicleDetails?.Insurancetype;
          this.classValue = this.vehicleDetails?.InsuranceClass;
          if (this.insuranceId != '100004') this.getMotorTypeList('direct', this.vehicleDetails?.VehicleType, this.vehicleDetails?.Motorusage)
          else { this.motorUsageValue = this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct'); }
          this.bodyTypeValue = this.vehicleDetails?.VehicleType;
          this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
          this.motorUsageValue = this.vehicleDetails?.Motorusage;
          if (this.insuranceId != '100004') this.getMotorTypeList('direct', this.vehicleDetails?.VehicleType, this.vehicleDetails?.Motorusage)
          else { this.motorUsageValue = this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct'); }
          this.bodyTypeValue = this.vehicleDetails?.VehicleType;
          this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
          this.motorUsageValue = this.vehicleDetails?.Motorusage;
          this.collateralYN = this.vehicleDetails?.CollateralYn;
          if (this.collateralYN == 'Y') this.collateralValue = true;
          else { this.collateralValue = false; this.borrowerValue = null; this.collateralName = null; this.firstLossPayee = null;this.LoanStartDate==''
            this.LoanEndDate=='';this.CollateralCompanyAddress='';this.CollateralCompanyName='';this.LoanAmount='';this.BankingDelegation=''
           }
          if (this.vehicleDetails?.NcdYn) this.claimsYN = this.vehicleDetails?.NcdYn;
          else this.claimsYN = 'N';
          if (this.vehicleDetails?.Gpstrackinginstalled) this.gpsYn = this.vehicleDetails?.Gpstrackinginstalled;
          else this.gpsYn = 'N';
          this.vehicleSI = String(this.vehicleDetails?.SumInsured);
          this.CommaFormatted();
          this.windShieldSI = String(this.vehicleDetails?.WindScreenSumInsured);
          this.WindSICommaFormatted();
          this.tppdSI = String(this.vehicleDetails?.TppdIncreaeLimit);
          this.TppdCommaFormatted();
          this.accessoriesSI = String(this.vehicleDetails?.AcccessoriesSumInsured);
          this.accessoriesCommaFormatted();
          if (this.collateralYN == 'Y') {
            this.collateralValue = true;
            this.collateralName = this.vehicleDetails?.CollateralName;
            this.firstLossPayee = this.vehicleDetails?.FirstLossPayee;
            this.borrowerValue = this.vehicleDetails?.BorrowerType;
          }
          else { this.collateralValue = false; this.borrowerValue = null; this.collateralName = null; this.firstLossPayee = null;this.LoanStartDate==''
            this.LoanEndDate=='';this.CollateralCompanyAddress='';this.CollateralCompanyName='';this.LoanAmount='';this.BankingDelegation='' }
          if (this.vehicleDetails?.FleetOwnerYn) {
            if (this.fleetYN != '')
              this.fleetYN = this.vehicleDetails?.FleetOwnerYn;
            if (this.fleetYN == 'Y') {
              this.fleetValue = true;
              this.noOfVehicles = this.vehicleDetails?.NoOfVehicles;
              this.noOfCompPolicy = this.vehicleDetails?.NoOfComprehensives;
              this.claimRatio = this.vehicleDetails?.ClaimRatio
            }
          }

          this.setVehicleValues('direct');
        }
      });
  }
  getMotorTypeAltList(type) {
    if (this.insuranceId != '100040' && this.insuranceId != '100042') {
      let ReqObj = {
        "SectionId": this.motorUsageValue,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            this.motorTypeList = data.Result;
            if (this.motorTypeList.length != 0) {
              let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
              for (let i = 0; i < this.motorTypeList.length; i++) {
                this.motorTypeList[i].label = this.motorTypeList[i]['CodeDesc'];
                this.motorTypeList[i].value = this.motorTypeList[i]['Code'];
                if (i == this.motorTypeList.length - 1) {
                  if (this.insuranceId != '100004') this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.motorTypeList);
                  else this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.motorTypeList);
                  this.checkFieldNames();
                }
              }
            }
            if (type == 'change') this.bodyTypeValue = '';
          }
        },
        (err) => { },
      );
    }

  }
  onStartDateChange(type){
    if(this.productId!='4'){
      // if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
      var d = null;
      if(String(this.policyStartDate).split('/').length>1){let dateList = String(this.policyStartDate).split('/');d=new Date(dateList[2]+'-'+dateList[1]+'-'+dateList[0])}
      else d=new Date(this.policyStartDate)
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if(this.insuranceId=='100004' || this.insuranceId=='100040'){
        if(this.policyEndDate!=null && this.policyEndDate!=undefined){
          const oneday = 24 * 60 * 60 * 1000;
          let formattedDatecurrent:any =null;
          if(String(this.policyStartDate).split('/').length>1){ 
            let dateList  = String(this.policyStartDate).split('/')
            let startDate:any = dateList[2]+'-'+dateList[1]+'-'+dateList[0]; 
            formattedDatecurrent = new Date(startDate);}
          else formattedDatecurrent = this.policyStartDate
          if(String(this.policyEndDate).split('/').length>1){
            let dateList  = String(this.policyEndDate).split('/')
            let endDate:any = dateList[2]+'-'+dateList[1]+'-'+dateList[0]; 
            const momentDate:any = new Date(String(endDate));
            this.noOfDays = String(Math.round((momentDate - formattedDatecurrent) / (1000 * 60 * 60 * 24))+1);
          }
          this.endMinDate = new Date(this.policyStartDate);
          this.policyEndDate = new Date(year, month, day+Number(this.noOfDays)-1);
          this.endMaxDate = new Date(year, month, day+Number(this.noOfDays));
          this.onChangeEndDate();
        }
        else{
          if(this.productId=='46'){
            this.endMinDate = new Date(this.policyStartDate);
            this.policyEndDate = new Date(year, month, day+29);
            this.endMaxDate = new Date(year, month, day+30);
            this.onChangeEndDate();
          }
          else {
            this.endMinDate = new Date(this.policyStartDate);
            this.policyEndDate = new Date(year + 1, month, day-1);
            this.endMaxDate = new Date(year + 2, month, day-1);
            if(this.noOfDays==null || this.noOfDays==undefined){this.noOfDays='365'}
            this.onChangeEndDate();
          }
        }
      }
      else if(this.productId=='46'){
        this.endMinDate = new Date(this.policyStartDate);
        this.policyEndDate = new Date(year, month, day+29);
        this.endMaxDate = new Date(year, month, day+30);
        this.onChangeEndDate();
      }
      else {
        this.endMinDate = new Date(this.policyStartDate);
        if(this.policyEndDate==null || this.policyEndDate==undefined || this.policyEndDate=='') this.policyEndDate = new Date(year + 1, month, day-1);
        this.endMaxDate = new Date(year + 2, month, day-1);
        this.onChangeEndDate();
      }
    }
    else{
      // var d = this.travelStartDate;
      // var year = d.getFullYear();
      // var month = d.getMonth();
      // var day = d.getDate();
      // this.endMinDate = new Date(this.travelStartDate);
      // this.endMaxDate = new Date(year + 1, month, day-1);
      //  this.updateComponent.travelStartDate = this.travelStartDate;
      // if(this.noOfDays!='' && this.noOfDays!=undefined && this.noOfDays!=null){
      //   this.travelEndDate = new Date(year, month, day+Number(this.noOfDays-1));
      //   this.updateComponent.travelStartDate = this.travelStartDate;
      //   this.updateComponent.travelEndDate = this.travelEndDate;
      // }
    }
    if(type=='change') {
      if(this.vehicleDetailsList.length!=0){
        for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
      }
    }
    if((this.insuranceId=='100004' || this.insuranceId=='100040') && this.policyStartDate) this.getNoOfDaysList();
  }
  onCollateralChange() {
    if (this.collateralValue) this.collateralYN = "Y";
    else this.collateralYN = "N";
  }
  onChangeEndDate(){
    if(this.productId!='4'){
      if(this.insuranceId=='100004' || this.insuranceId=='100040'){
        var d = null;
        if(String(this.policyStartDate).split('/').length>1){let dateList = String(this.policyStartDate).split('/');d=new Date(dateList[2]+'-'+dateList[1]+'-'+dateList[0])}
        else d=new Date(this.policyStartDate)
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        const oneday = 24 * 60 * 60 * 1000;
        let formattedDatecurrent:any =null;
        if(String(this.policyStartDate).split('/').length>1){ 
          let dateList  = String(this.policyStartDate).split('/')
          let startDate:any = dateList[2]+'-'+dateList[1]+'-'+dateList[0]; 
          formattedDatecurrent = new Date(startDate);}
        else formattedDatecurrent = this.policyStartDate
        if(String(this.policyEndDate).split('/').length>1){
          let dateList  = String(this.policyEndDate).split('/')
          let endDate:any = dateList[2]+'-'+dateList[1]+'-'+dateList[0]; 
          const momentDate:any = new Date(String(endDate));
          this.noOfDays = String(Math.round((momentDate - formattedDatecurrent) / (1000 * 60 * 60 * 24))+1);
        }
        this.endMinDate = new Date(this.policyStartDate);
        this.policyEndDate = new Date(year, month, day+Number(this.noOfDays)-1);
        this.endMaxDate = new Date(year, month, day+Number(this.noOfDays));
      }
      else{
        const oneday = 24 * 60 * 60 * 1000;
        const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
        const formattedDate = moment(momentDate).format("YYYY-MM-DD");
        const formattedDatecurrent = new Date(this.policyStartDate);
        console.log(formattedDate);
        //this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
      }
      
    
    }
    else{
    
    }
  }
  onSearchVehicle() {
    let entry = this.checMandatories()
    this.regNoError = false;
    if (this.regNo == null || this.regNo == undefined || this.regNo == '') this.regNoError = true;
    if (!this.vehicleDetailsList.some(ele => ele.Registrationnumber == this.regNo)) {
      if (this.regNo != null && this.regNo != undefined && this.regNo != '' && entry) {
        this.regNo = this.regNo.toUpperCase();
        let ReqObj = {
          "ReqChassisNumber": '',
          "ReqRegNumber": this.regNo,
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "BrokerBranchCode": this.branchCode,
          "ProductId": this.productId,
          "CreatedBy": this.loginId,
          "SavedFrom": 'API'
        }
        let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data.Result) {
              this.vehicleDetails = data?.Result;
              if (this.vehicleDetailsList.length != 0) {
                let entry = this.vehicleDetailsList.some(ele => ele.Registrationnumber == this.regNo);
                if (entry) {
                  // this.duplicateSection = true;
                  // this.validSection = false;
                }
                else this.onSaveSearchVehicles();
              }
              else this.onSaveSearchVehicles();
            }
            else if (data.ErrorMessage != null) {
              if (data.ErrorMessage.length != 0) {
              }
            }
          });
      }
    }
    else {
      this.duplicateRegister = true;
      setTimeout(() => {
        this.duplicateRegister = false;
      }, (4 * 1000));
    }

  }
  onSaveSearchVehicles() {
    this.subuserType = sessionStorage.getItem('typeValue');
    let appId = "1", loginId = "", brokerbranchCode = "", createdBy = "";
    if (this.promocode == '' || this.promocode == null || this.promocode == undefined) {
      this.havePromoCodeYN = 'N';
    }
    else this.havePromoCodeYN = 'Y';
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
      createdBy = this.vehicleDetails.CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else {
        appId = this.loginId;
        loginId = this.brokerLoginId;
        // loginId = this.updateComponent.brokerLoginId
        // brokerbranchCode = this.updateComponent.brokerBranchCode;
      }
    }
    if (this.userType != 'Broker' && this.userType != 'User') {
      brokerbranchCode = this.brokerBranchCode
      loginId = this.brokerLoginId;
      // this.sourceType = this.updateComponent.sourceType;
      // this.bdmCode = this.updateComponent.brokerCode;
      // this.brokerCode = this.updateComponent.brokerCode;
      // brokerbranchCode =  this.updateComponent.brokerBranchCode;
      // this.customerCode = this.updateComponent.CustomerCode;
      // this.customerName = this.updateComponent.CustomerName;
    }
    else {
      this.sourceType = this.subuserType;
      this.Code = this.subuserType;
      this.customerCode = this.userDetails?.Result.CustomerCode;
    }
    let refNo = "99999", regYear = "99999", IdType = "99999", IdNo = "99999";
    this.vehicleDetails['Vehicleid'] = String(this.vehicleDetailsList.length + 1)
    if (this.customerDetails) {
      refNo = this.customerDetails?.CustomerReferenceNo;
      IdNo = this.customerDetails?.IdNumber;
      regYear = this.customerDetails?.DobOrRegDate; IdType = this.customerDetails?.PolicyHolderType;
    };
    if (this.endorsementSection) {
      let entry = this.vehicleDetailsList.filter(ele => ele?.EndorsementDate != undefined)
      if (entry) {
        let details = entry[0];
        console.log("Filtered Endorsement Set", entry)
        this.endorsementDate = details?.EndorsementDate;
        this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
        this.endorsementRemarks = details?.EndorsementRemarks;
        this.endorsementType = details?.EndorsementType;
        this.endorsementTypeDesc = details?.EndorsementTypeDesc;
        this.endtCategoryDesc = details?.EndtCategoryDesc;
        this.endtCount = details?.EndtCount;
        this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
        this.endtStatus = details?.EndtStatus; this.orginalPolicyNo = details?.OrginalPolicyNo;
        this.endtPrevPolicyNo = details?.EndtPrevPolicyNo; this.isFinanceEndt = details?.IsFinanceEndt;
      }
    }
    let startDate = null, endDate = null;
    if (this.policyStartDate != null && this.policyStartDate != '' && this.policyStartDate != undefined) {
      let dateList = String(this.policyStartDate).split('/');
      if (dateList.length > 1) startDate = this.policyStartDate;
      else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
    }
    if (this.policyEndDate != null && this.policyEndDate != '' && this.policyEndDate != undefined) {
      let dateList = String(this.policyEndDate).split('/');
      if (dateList.length > 1) endDate = this.policyEndDate;
      else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
    }
    let sumInsured = null;
    if (this.vehicleDetails?.SUM_INSURED) sumInsured = this.vehicleDetails?.SUM_INSURED;
    let gpsYn = 'N';
    if (this.vehicleDetails.Gpstrackinginstalled != null) gpsYn = this.vehicleDetails.Gpstrackinginstalled;
    if (this.vehicleDetails.MobileCode == null || this.vehicleDetails.MobileCode == '' || this.vehicleDetails.MobileCode == undefined) {
      let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      if (customerDetails) {
        this.vehicleDetails['MobileCode'] = customerDetails?.MobileCode1;
        this.vehicleDetails['MobileNumber'] = customerDetails?.MobileNo1;
        if (this.customerName == null) {
          this.customerName = customerDetails?.ClientName;
        }
      }
    }
    if (this.vehicleDetails?.SavedFrom == 'SQ') this.vehicleDetails.SavedFrom = 'WEB';
    if (this.endorsementSection && this.enableAddVehicle) { this.vehicleDetails['EndorsementYn'] = 'Y'; }
    let Insurancetype = null, sectionId = null
    if (this.insuranceId == '100040') {
      sectionId = null;
      Insurancetype = null;
    }
    // else if(this.insuranceId=='100042'){
    //   sectionId=null;
    //   Insurancetype=null;
    // }
    else {
      Insurancetype = this.vehicleDetails?.Insurancetype;
      if (this.vehicleDetails?.Insurancetype) {
        if (this.vehicleDetails?.Insurancetype.length != 0) sectionId = this.vehicleDetails?.Insurancetype[0];
        else sectionId = null;
      }
      else sectionId = null;
    }
    if (brokerbranchCode == null) brokerbranchCode = '1';
    let DateOfcirculation;
    if (String(this.productItem.DateOfcirculation).includes('/')) {
      DateOfcirculation = this.productItem.DateOfcirculation;
    }
    else DateOfcirculation = this.datePipe.transform(this.productItem.DateOfcirculation, 'dd/MM/yyyy');
    let zone="1";
    
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": null,
      "CommissionType": null,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": IdNo,
      "VehicleId": this.vehicleDetails.Vehicleid,
      "AcccessoriesSumInsured": null,
      "AccessoriesInformation": null,
      "AdditionalCircumstances": null,
      "AxelDistance": this.vehicleDetails?.AxelDistance,
      "Chassisnumber": this.vehicleDetails?.Chassisnumber,
      "Color": this.vehicleDetails?.Color,
      "CityLimit": null,
      "CoverNoteNo": null,
      "MobileCode": this.vehicleDetails?.MobileCode,
      "MobileNumber": this.vehicleDetails?.MobileNumber,
      "OwnerCategory": this.vehicleDetails?.OwnerCategory,
      "CubicCapacity": this.vehicleDetails?.Grossweight,
      "CreatedBy": createdBy,
      "DrivenByDesc": 'D',
      "EngineNumber": this.vehicleDetails?.EngineNumber,
      "FuelType": this.vehicleDetails?.FuelType,
      "Gpstrackinginstalled": gpsYn,
      "Grossweight": this.vehicleDetails?.Grossweight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": this.vehicleDetails?.Insurancetype,
      "InsurancetypeDesc": this.vehicleDetails?.InsurancetypeDesc,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": this.vehicleDetails?.InsuranceClass,
      "InsuranceClassDesc": this.vehicleDetails?.InsuranceClassDesc,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.vehicleDetails?.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": this.vehicleDetails?.MotorCategory,
      "Motorusage": this.vehicleDetails?.Motorusage,
      "MotorusageId": this.vehicleDetails?.MotorusageId,
      "NcdYn": null,
      "PreviousInsuranceYN": 'N',
      "PreviousLossRatio": null,
      "PolicyRenewalYn": this.vehicleDetails?.RenewalYn,
      "NoOfClaims": null,
      "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": this.vehicleDetails?.SectionId,
      "PolicyType": null,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "RegistrationDate": this.vehicleDetails?.RegistrationDate,
      "Registrationnumber": this.vehicleDetails?.Registrationnumber,
      "RoofRack": null,
      "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
      "SourceTypeId": this.Code,
      "SourceType": this.sourceTypeDesc,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": this.vehicleDetails?.vehicleSI,
      "InflationSumInsured": null,
      "Tareweight": this.vehicleDetails?.Tareweight,
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": null,
      "TrailerDetails": null,
      "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
      "VehicleType": this.vehicleDetails?.VehicleType,
      "VehicleTypeId": this.vehicleDetails?.VehicleTypeId,
      "Vehiclemake": this.vehicleDetails?.Vehiclemake,
      "VehiclemakeId": this.vehicleDetails?.VehiclemakeId,
      "VehcilemodelId": this.vehicleDetails?.Vehiclemodel,
      "VehicleModel": this.vehicleDetails?.VehicleModelDesc,
      "WindScreenSumInsured": null,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": this.noOfDays,
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "Currency": this.currencyCode,
      "ExchangeRate": this.exchangeRate,
      "HavePromoCode": this.havePromoCodeYN,
      "PromoCode": this.promocode,
      "CollateralYn": 'N',
      "CollateralName": null,
      "FirstLossPayee": null,
      "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
      "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
      "NoOfComprehensives": null,
      "ClaimRatio": null,
      "SavedFrom": this.vehicleDetails?.SavedFrom,
      "UserType": this.userType,
      "TiraCoverNoteNo": this.vehicleDetails?.TiraCoverNoteNo,
      "EndorsementYn": this.vehicleDetails.EndorsementYn,
      "SaveOrSubmit": "Save",
      "EndorsementDate": this.endorsementDate,
      "EndorsementEffectiveDate": this.endorsementEffectiveDate,
      "EndorsementRemarks": this.endorsementRemarks,
      "EndorsementType": this.endorsementType,
      "EndorsementTypeDesc": this.endorsementTypeDesc,
      "EndtCategoryDesc": this.endtCategoryDesc,
      "EndtCount": this.endtCount,
      "EndtPrevPolicyNo": this.endtPrevPolicyNo,
      "EndtPrevQuoteNo": this.endtPrevQuoteNo,
      "EndtStatus": this.endtStatus,
      "IsFinanceEndt": this.isFinanceEndt,
      "OrginalPolicyNo": this.orginalPolicyNo,
      "Mileage": this.productItem.Mileage,
      "HorsePower": this.vehicleDetails.HorsePower,
      "Zone": zone,
      "NoOfClaimYears": null,
      "NoOfPassengers": null,
      "DateOfCirculation": DateOfcirculation,
      "Scenarios": {
        "ExchangeRateScenario": {
          "OldAcccessoriesSumInsured": null,
          "OldCurrency": this.currencyCode,
          "OldExchangeRate": this.exchangeRate,
          "OldSumInsured": null,
          "OldTppdIncreaeLimit": null,
          "OldWindScreenSumInsured": null
        }
      },
      "Status": "Y"
    }
    ReqObj['FleetOwnerYn'] = "N";
    // if(this.insuranceId=='100042'){
    //   ReqObj['Class']=this.productItem.Class
    // }
    if (this.endorsementSection) {
      if (this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.vehicleDetails?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
    //   ReqObj['DriverDetails'] = {
    //     "DrivingLicensingAge":this.DrivingLicensingAge,
    //     "DriverName":this.driverName,
    //   }
    // }
    let urlLink = `${this.motorApiUrl}api/savemotordetails`; //1
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          let ulList: any = '';
          const errorList: any[] = res.ErrorMessage;
          for (let index = 0; index < errorList.length; index++) {
            const element = errorList[index];
            //this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
            this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
            console.log('Final Messages', this.messages)
            // ulList +=`<li class="list-group-login-field">
            // 	<div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
            // 	<div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
            // </li>`
          }
        }
        else {
          if (data.Result?.length != 0) {
            // let entry = this.vehicleDetailsList[this.currentIndex-1];
            // entry['PolicyEndDate'] = endDate;
            // entry['PolicyStartDate'] = startDate;
            this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', data?.Result[0]?.RequestReferenceNo);
            this.regNo = null;
            this.tabIndex = 0;
            this.getExistingVehiclesList('saveSearch');
          }
          // else if(data.Result){
          // this.quoteRefNo = data?.Result?.RequestReferenceNo;
          //   sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
          //   this.vehicleDetails = null;
          //   this.regNo=null;

          //   this.getExistingVehiclesList();
          // }
        }
      },
      (err) => { },
    );
  }
  getExistingVehiclesList(type) {
    this.tabIndex = null;
    this.vehicleDetailsList = [];
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.vehicleDetailsList = data.Result;
          if (this.vehicleDetailsList.length != 0) {
            if (this.vehicleDetailsList[0]?.FinalizeYn != null) {
              this.finalizeYN = this.vehicleDetailsList[0]?.FinalizeYn;
              sessionStorage.setItem('FinalizeYN', this.vehicleDetailsList[0]?.FinalizeYn)
            }
            else this.finalizeYN = 'N';
            //this.updateComponent.CurrencyCode = this.vehicleDetailsList[0].Currency;
            this.currencyCode = this.vehicleDetailsList[0].Currency;
            this.exchangeRate = this.vehicleDetailsList[0].ExchangeRate;
            let entry = this.vehicleDetailsList.find(ele => ele.Status != 'D');
            if (entry) {
              if (entry.PolicyStartDate) {
                this.policyStartDate = entry.PolicyStartDate;
                this.policyEndDate = entry.PolicyEndDate;
                this.onStartDateChange('direct')
              }
            }

            this.havePromoCodeYN = this.vehicleDetailsList[0].HavePromoCode;
            this.promocode = this.vehicleDetailsList[0].PromoCode;
            this.acExecutiveId = this.vehicleDetailsList[0].AcExecutiveId;
            this.commissionType = this.vehicleDetailsList[0].CommissionType;
            //this.updateComponent.setCommonValues(this.vehicleDetailsList[0]);
            for (let veh of this.vehicleDetailsList) {
              veh['Active'] = true;
            }
            if (type == 'direct') {
              if (this.tabIndex == undefined || this.tabIndex == null) {
                let entry = sessionStorage.getItem('BackType');
                let existVeh = sessionStorage.getItem('vehicleExist')
                if (entry && this.insuranceId != '100040' && this.insuranceId != '100042') {
                  if (entry == 'Back') {
                    this.tabIndex = this.vehicleDetailsList.length;
                    this.vehicleId = this.vehicleDetailsList[this.vehicleDetailsList.length - 1].Vehicleid;
                    if (this.vehicleId == null || this.vehicleId == undefined || this.vehicleId == '') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                    this.getEditVehicleDetails(this.vehicleId, 'direct')
                    this.currentIndex = 1;
                    sessionStorage.removeItem('BackType');
                  } else { sessionStorage.removeItem('BackType'); }
                }
                else if (existVeh) {
                  sessionStorage.removeItem('BackType');
                  let id = sessionStorage.getItem('editVehicleId');
                  if (id) {
                    let index = this.vehicleDetailsList.findIndex(ele => String(ele.Vehicleid) === String(id));
                    console.log(id, this.vehicleDetailsList);
                    this.tabIndex = index + 1;
                    this.vehicleId = id;
                    if (this.vehicleId == null || this.vehicleId == undefined || this.vehicleId == '') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                    this.getEditVehicleDetails(this.vehicleId, 'direct')
                    this.currentIndex = 1;
                    sessionStorage.removeItem('BackType');
                    sessionStorage.removeItem('editVehicleId');
                    sessionStorage.removeItem('vehicleExist');
                  }
                }
                else {
                  this.tabIndex = 0;
                  this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                  if (this.vehicleId == null || this.vehicleId == undefined || this.vehicleId == '') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                  this.getEditVehicleDetails(this.vehicleId, 'direct')
                  this.currentIndex = 1;
                }
              }


            }
            else if (type == 'saveSearch') {
              this.tabIndex = this.vehicleDetailsList.length;
              this.vehicleId = this.vehicleDetailsList[this.vehicleDetailsList.length - 1].Vehicleid;
              if (this.vehicleId == null || this.vehicleId == undefined || this.vehicleId == '') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
              this.getEditVehicleDetails(this.vehicleId, 'direct')
              this.currentIndex = 1;
            }
            else if (type == 'delete') {
              if (this.vehicleDetailsList.length != 0) {
                this.tabIndex = 0;
                this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                this.getEditVehicleDetails(this.vehicleId, 'direct')
                this.currentIndex = 1;
              }
            }

          }
          else {
            this.currencyCode = this.userDetails.Result.CurrencyId;
            this.noOfDaysVlaue = '90';
            this.tabIndex = 0;
            this.vehicleId = null;
            this.onCurrencyChange('direct');
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            if (this.productId == '5' || this.productId == '29') { this.policyStartDate = new Date(year, month, day); this.onStartDateChange('direct') }
            else if (this.productId == '46') { this.policyStartDate = new Date(year, month, day); this.onStartDateChange('direct') }
          }
        }
      },
      (err) => { },
    );
  }
  checActiveIndex() {
    return Number(this.tabIndex);
  }
  getYearList() {
    var d = new Date();
    var year = d.getFullYear();
    const currentYear = new Date().getFullYear() - 20, years = [];
    while (year >= currentYear) {
      let yearEntry = year--
      years.push({ "Code": String(yearEntry), 'label': String(yearEntry), "value": String(yearEntry), "CodeDesc": String(yearEntry) });
    }
    return years;
  }
  saveMotorDetails(index) {

    sessionStorage.removeItem('loadingType');
    let entry = false;
    if (this.finalizeYN != 'Y' && !entry) {
      if (this.insuranceId == '100004') this.typeValue = this.classValue;

      let createdBy = "";
      let startDate = "", endDate = "", vehicleSI = "", accSI = "", windSI = "", tppSI = "";
      if (this.vehicleSI == undefined) vehicleSI = null;
      else if (this.vehicleSI.includes(',')) { vehicleSI = this.vehicleSI.replace(/,/g, '') }
      else vehicleSI = this.vehicleSI;
      if (this.accessoriesSI == undefined) accSI = null;
      else if (this.accessoriesSI.includes(',')) { accSI = this.accessoriesSI.replace(/,/g, '') }
      else accSI = this.accessoriesSI
      if (this.windShieldSI == undefined) windSI = null;
      else if (this.windShieldSI.includes(',')) { windSI = this.windShieldSI.replace(/,/g, '') }
      else windSI = this.windShieldSI
      if (this.tppdSI == undefined) tppSI = null;
      else if (this.tppdSI.includes(',')) { tppSI = this.tppdSI.replace(/,/g, '') }
      else tppSI = this.tppdSI
      if (this.policyStartDate) {
        if (this.endorsementSection && (this.enableAddVehicle && this.endorsementYn == 'Y')) {
          startDate = this.endorseEffectiveDate;
          const oneday = 24 * 60 * 60 * 1000;
          const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
          const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          const formattedDatecurrent = new Date(startDate);
          console.log(formattedDate);

          console.log(formattedDatecurrent);

          this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
        }
        else if (this.endorsementSection && this.vehicleDetails?.Status == 'D') {
          startDate = this.vehicleDetails?.PolicyStartDate;
          const oneday = 24 * 60 * 60 * 1000;
          const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
          const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          const formattedDatecurrent = new Date(this.vehicleDetails?.PolicyStartDate);
          console.log(formattedDate);
          this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
        }
        else {
          if (typeof this.policyStartDate === 'string') {
            if (String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
            else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          }
          else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          const oneday = 24 * 60 * 60 * 1000;
          const momentDate = new Date(this.policyEndDate);
          const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          const formattedDatecurrent = new Date(this.policyStartDate);
          this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
        }
      }
      if (this.policyEndDate) {
        if (this.endorsementSection && this.vehicleDetails.Status == 'D') {
          endDate = this.endorseEffectiveDate;
        }
        else {
          if (typeof this.policyEndDate === 'string') {
            if (String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
            else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
          else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
        }
      }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      this.subuserType = sessionStorage.getItem('typeValue');

      let appId = "1", loginId = "", brokerbranchCode = "";
      if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
        brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
        createdBy = this.vehicleDetailsList[0].CreatedBy;
      }
      else {
        createdBy = this.loginId;
        if (this.userType != 'Issuer') {
          this.brokerCode = this.agencyCode;
          appId = "1"; loginId = this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else {
          appId = this.loginId;
          loginId = this.vehicleDetails?.LoginId;
          brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
          //  if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
          //   brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
          // }
        }
        if (this.userType != 'Broker' && this.userType != 'User') {
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
          this.Code = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
        if (this.customerName == undefined) this.customerName = null;
        let refNo = "99999", regYear = "99999", IdType = "99999", IdNo = "99999";
        if (this.customerDetails) {
          refNo = this.customerDetails?.CustomerReferenceNo;
          IdNo = this.customerDetails?.IdNumber;
          regYear = this.customerDetails?.DobOrRegDate; IdType = this.customerDetails?.PolicyHolderType;
        };
        let deductibles = null;
        if (this.productItem.Deductibles != '' && this.productItem.Deductibles != undefined) deductibles = this.productItem.Deductibles;
        let insuranceType = '', sectionId = [];
        if ((this.insuranceId == '100028' || this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100040') && this.vehicleDetailsList.length == 1) {
          //if(this.typeValue==null || this.typeValue==undefined){
          for (let entry of this.typeList) {
            sectionId.push(entry.Code);
          }
          // }
          // else insuranceType.push(this.typeValue)
        }
        else {
          if (this.typeValue == null || this.typeValue == undefined) {

          }
          else {
            if (this.insuranceId == '100004') {
              this.productItem.InsuranceType = this.productItem.InsuranceClass;
              this.productItem.InsurancetypeDesc = this.productItem.InsuranceClassDesc;
            }
            else {
              insuranceType = this.productItem.InsuranceType;
              sectionId = [this.productItem.InsuranceType]
            }
          }
        }

        if (this.insuranceId == '100027' || this.insuranceId == '100028') {
          if (Array.isArray(sectionId)) {
            if (sectionId.length != 0) this.productItem.InsuranceClass = sectionId[0];
          }
          else this.productItem.InsuranceClass = insuranceType
          this.classValue = this.typeValue;
        }
        let PurchaseDate = null;
        if (this.productItem.PurchaseDate != null && this.productItem.PurchaseDate != '' && this.productItem.PurchaseDate != undefined) {
          if (String(this.productItem.PurchaseDate).includes('/')) {
            PurchaseDate = this.productItem.PurchaseDate;
          }
          else PurchaseDate = this.datePipe.transform(this.productItem.PurchaseDate, 'dd/MM/yyyy');
        }
        if (this.productItem.GpsYN == null || this.productItem.GpsYN == undefined || this.productItem.GpsYN == '') this.productItem.GpsYN = 'N';
        this.vehicleDetails['VehicleTypeId'] = null;
        if (this.productItem.BodyType != null && this.productItem.BodyType != '') {
          let usageId = this.motorTypeList.find(ele => ele.CodeDesc == this.productItem.BodyType || ele.Code == this.productItem.BodyType).Code;
          if (usageId) this.vehicleDetails['VehicleTypeId'] = usageId;
          let usageDesc = this.motorTypeList.find(ele => ele.CodeDesc == this.productItem.BodyType || ele.Code == this.productItem.BodyType).CodeDesc;
          if (usageDesc) this.vehicleDetails['VehicleType'] = usageDesc;

        }
        let motorUsage = null, motorUsageId = null;

        if (this.productItem.MotorUsage != null && this.productItem.MotorUsage != '' && this.productItem.MotorUsage != undefined) {
          let usageDesc = this.motorUsageList.find(ele => ele.CodeDesc == this.productItem.MotorUsage || ele.Code == this.productItem.MotorUsage)?.CodeDesc;
          if (usageDesc) {
            motorUsage = usageDesc;
            let usageId = this.motorUsageList.find(ele => ele.CodeDesc == this.productItem.MotorUsage || ele.Code == this.productItem.MotorUsage)?.Code;
            if (usageId) motorUsageId = usageId;
          }
          else {
            motorUsageId = this.vehicleDetails.Motorusage
            motorUsage = this.vehicleDetails.MotorUsageDesc;
          }
        }
        else {
          motorUsageId = this.vehicleDetails.Motorusage
          motorUsage = this.vehicleDetails.MotorUsageDesc;
        }
        if (this.vehicleDetails.MobileCode == null || this.vehicleDetails.MobileCode == '' || this.vehicleDetails.MobileCode == undefined) {
          let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
          if (customerDetails) {
            this.vehicleDetails['MobileCode'] = customerDetails?.MobileCode1;
            this.vehicleDetails['MobileNumber'] = customerDetails?.MobileNo1;
            if (this.customerName == null) {
              this.customerName = customerDetails?.ClientName;
            }
          }
        }
        if (this.motorDetails?.SavedFrom == 'SQ') this.motorDetails.SavedFrom = 'WEB';
        if (this.productItem.PreviousInsuranceYN == null || this.productItem.PreviousInsuranceYN == '') this.productItem.PreviousInsuranceYN = 'N';
        if (this.productItem.PreviousLossRatio != null && this.productItem.PreviousLossRatio != '') {
          this.productItem.PreviousLossRatio = Number(String(this.productItem.PreviousLossRatio).replace(/\D/g, ''));
        }
        else this.productItem.PreviousLossRatio = null;

        if (this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100027') this.typeValue = this.vehicleDetails.InsuranceClass;
        // if(this.vehicleDetails?.HorsePower==undefined) this.vehicleDetails.HorsePower="10"
        let DateOfcirculation;
        if (String(this.productItem.DateOfcirculation).includes('/')) {
          DateOfcirculation = this.productItem.DateOfcirculation;

        }
        else DateOfcirculation = this.datePipe.transform(this.productItem.DateOfcirculation, 'dd/MM/yyyy');
        if (this.productItem.InsurancetypeDesc == undefined) {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.key == 'InsuranceType' && this.insuranceId != '100004') {
              let list = field.props.options;
              let entry = list.find(ele => ele.value == this.productItem.InsuranceType);

              console.log("Optionsssssssssss", field.props.options)
              if (entry) this.productItem.InsurancetypeDesc = entry.label;
            }
          }
        }
        if (this.productItem.InsuranceClassDesc == undefined) {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.key == 'InsuranceClass' && this.insuranceId != '100027' && this.insuranceId != '100028') {
              let list = field.props.options;
              let entry = list.find(ele => ele.value == this.productItem.InsuranceClass);
              if (entry) this.productItem.InsuranceClassDesc = entry.label;
            }
            else if (field.key == 'InsuranceType' && (this.insuranceId == '100027' || this.insuranceId == '100028')) {
              let list = field.props.options;
              let entry = list.find(ele => ele.value == this.productItem.InsuranceType);
              if (entry) this.productItem.InsuranceClassDesc = entry.label;
            }
          }
        }
        if (this.insuranceId == '100042' || this.insuranceId == '100040') {
          sectionId = [String(this.productItem.InsuranceClass)];
          insuranceType = this.productItem.InsuranceType;
          motorUsage = this.productItem.InsuranceType;
          motorUsageId = this.productItem.InsuranceClassDesc;
          this.productItem.Mileage = "1"
        }
        else {
          if (sectionId) {
            if (sectionId.length != 0) insuranceType = sectionId[0];
            else insuranceType = null;
          }
          else insuranceType = null;
        }
        let LoanStartDate,LoanEndDate
        if(this.LoanStartDate!='' || this.LoanStartDate!=null || this.LoanStartDate!=undefined){
          if (String(this.LoanStartDate).includes('/')) {
            LoanStartDate = this.LoanStartDate;
          }
          else LoanStartDate = this.datePipe.transform(this.LoanStartDate, 'dd/MM/yyyy');
        }
        if(this.LoanEndDate!='' || this.LoanEndDate!=null || this.LoanEndDate!=undefined){
          if (String(this.LoanEndDate).includes('/')) {
            LoanEndDate = this.LoanEndDate;
          }
          else LoanEndDate = this.datePipe.transform(this.LoanEndDate, 'dd/MM/yyyy');
        }
        let zone;
        if(this.insuranceId=='100042'){
              zone=this.productItem.Zone
            }
            else{
              zone="1"
            }
        let ReqObj = {
          "HorsePower": this.vehicleDetails.HorsePower,
          "Zone": zone,
          "ExcessLimit": null,
          "Deductibles": deductibles,
          "BrokerBranchCode": brokerbranchCode,
          "AcExecutiveId": this.acExecutiveId,
          "CommissionType": this.commissionType,
          "CustomerCode": this.customerCode,
          "CustomerName": this.customerName,
          "BdmCode": this.customerCode,
          "BrokerCode": this.brokerCode,
          "LoginId": loginId,
          "SubUserType": this.subuserType,
          "ApplicationId": appId,
          "CustomerReferenceNo": refNo,
          "RequestReferenceNo": this.quoteRefNo,
          "Idnumber": IdNo,
          "VehicleId": this.vehicleId,
          "AcccessoriesSumInsured": this.productItem.AccessoriesSI,
          "AccessoriesInformation": "",
          "AdditionalCircumstances": "",
          "AxelDistance": this.vehicleDetails?.AxelDistance,
          "Chassisnumber": this.vehicleDetails?.Chassisnumber,
          "Color": this.vehicleDetails?.Color,
          "CityLimit": this.cityValue,
          "CoverNoteNo": null,
          "MobileCode": this.vehicleDetails?.MobileCode,
          "MobileNumber": this.vehicleDetails?.MobileNumber,
          "OwnerCategory": this.vehicleDetails?.OwnerCategory,
          "CubicCapacity": this.vehicleDetails?.Grossweight,
          "CreatedBy": createdBy,
          "DrivenByDesc": this.drivenBy,
          "EngineNumber": this.vehicleDetails?.EngineNumber,
          "FuelType": this.vehicleDetails?.FuelType,
          "Gpstrackinginstalled": this.productItem.GpsYN,
          "Grossweight": this.vehicleDetails?.Grossweight,
          "HoldInsurancePolicy": "N",
          "Insurancetype": insuranceType,
          "InsurancetypeDesc": this.productItem.InsurancetypeDesc,
          "InsuranceId": this.insuranceId,
          "InsuranceClass": this.productItem.InsuranceClass,
          "InsuranceClassDesc": this.productItem.InsuranceClassDesc,
          "InsurerSettlement": "",
          "InterestedCompanyDetails": "",
          "ManufactureYear": this.vehicleDetails?.ManufactureYear,
          "ModelNumber": null,
          "MotorCategory": this.vehicleDetails?.MotorCategory,
          "Motorusage": motorUsage,
          "MotorusageId": motorUsageId,
          "NcdYn": this.productItem.ClaimsYN,
          "PolicyRenewalYn": this.productItem.RenewalYn,
          "NoOfClaims": null,
          "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "ProductId": this.productId,
          "SectionId": sectionId,
          "PolicyType": IdType,
          "RadioOrCasseteplayer": null,
          "RegistrationYear": regYear,
          "Registrationnumber": this.vehicleDetails?.Registrationnumber,
          "RoofRack": null,
          "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
          "SourceTypeId": this.Code,
          "SpotFogLamp": null,
          "Stickerno": null,
          "SumInsured": this.productItem.VehicleSI,
          "InflationSumInsured": this.productItem.InflationSumInsured,
          "Tareweight": this.vehicleDetails?.Tareweight,
          "TppdFreeLimit": null,
          "TppdIncreaeLimit": this.productItem.ExtendedTPPDSI,
          "TrailerDetails": null,
          "VehicleModel": this.vehicleDetails?.VehicleModelDesc,
          "VehcilemodelId": this.vehicleDetails?.Vehcilemodel,
          "VehicleType": this.vehicleDetails.VehicleType,
          "VehicleTypeId": this.vehicleDetails?.VehicleTypeId,
          "Vehiclemake": this.vehicleDetails?.VehiclemakeDesc,
          "VehiclemakeId": this.vehicleDetails?.Vehiclemake,
          "WindScreenSumInsured": this.productItem.WindShieldSI,
          "Windscreencoverrequired": null,
          "accident": null,
          "periodOfInsurance": this.noOfDays,
          "PolicyStartDate": startDate,
          "PolicyEndDate": endDate,
          "Currency": this.currencyCode,
          "ExchangeRate": this.exchangeRate,
          "HavePromoCode": this.havePromoCodeYN,
          "PromoCode": this.promocode,
          "CollateralYn": this.collateralYN,
          "BorrowerType": this.borrowerValue,
          "CollateralName": this.collateralName,
          "FirstLossPayee": this.firstLossPayee,
          "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
          "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
          "NoOfComprehensives": this.noOfCompPolicy,
          "ClaimRatio": this.claimRatio,
          "SavedFrom": this.motorDetails?.SavedFrom,
          "UserType": this.userType,
          "TiraCoverNoteNo": this.productItem.TiraCoverNoteNo,
          "EndorsementYn": this.endorsementYn,
          "EndorsementDate": this.endorsementDate,
          "EndorsementEffectiveDate": this.endorsementEffectiveDate,
          "EndorsementRemarks": this.endorsementRemarks,
          "EndorsementType": this.endorsementType,
          "EndorsementTypeDesc": this.endorsementTypeDesc,
          "EndtCategoryDesc": this.endtCategoryDesc,
          "EndtCount": this.endtCount,
          "EndtPrevPolicyNo": this.endtPrevPolicyNo,
          "EndtPrevQuoteNo": this.endtPrevQuoteNo,
          "EndtStatus": this.endtStatus,
          "IsFinanceEndt": this.isFinanceEndt,
          "OrginalPolicyNo": this.orginalPolicyNo,
          "ClaimType": this.claimTypeValue,
          "VehicleValueType": this.productItem.VehicleValue,
          "Inflation": this.productItem.Inflation,
          "Ncb": "0",
          "DefenceValue": this.productItem.DefenceCost,
          "PurchaseDate": PurchaseDate,
          "RegistrationDate": this.vehicleDetails?.RegistrationDate,
          "Mileage": this.productItem.Mileage,
          "NoOfClaimYears": this.productItem.NoOfClaimYears,
          "NoOfPassengers": this.productItem.NoOfPassengers,
          "PreviousInsuranceYN": this.productItem.PreviousInsuranceYN,
          "PreviousLossRatio": this.productItem.PreviousLossRatio,
          "NumberOfCards": this.productItem.Nombredecartes,
          "MunicipalityTraffic": this.productItem.MunicipalityofTraffic,
          "TransportHydro": this.productItem.Transportationofhydrocarbons,
          "DateOfCirculation": DateOfcirculation,
          "NewValue": this.productItem.Newvalue,
          "MarketValue": this.productItem.Marketvalue,
          "AggregatedValue": this.productItem.Aggregatedvalue,
          "BankingDelegation": this.BankingDelegation,
          "LoanStartDate": LoanStartDate,
          "LoanEndDate": LoanEndDate,
          "CollateralCompanyAddress": this.CollateralCompanyAddress,
          "CollateralCompanyName": this.CollateralCompanyName,
          "LoanAmount": this.LoanAmount,
          "PaCoverId": this.productItem.PACoverId,
          "UsageId": this.productItem.VehicleUsage,
          "VehicleTypeIvr": this.productItem.VehicleType,
          "ZoneCirculation": this.productItem.ZoneCirculation,
          // "NumberOfCards":this.productItem.Nombredecartes,
          // "MunicipalityTraffic":this.productItem.MunicipalityofTraffic,
          // "TransportHydro":this.productItem.Transportationofhydrocarbons,
          "Scenarios": {
            "ExchangeRateScenario": {
              "OldAcccessoriesSumInsured": this.vehicleDetails.OldAcccessoriesSumInsured,
              "OldCurrency": this.vehicleDetails.OldCurrency,
              "OldExchangeRate": this.vehicleDetails.OldExchangeRate,
              "OldSumInsured": this.vehicleDetails.OldSumInsured,
              "OldTppdIncreaeLimit": this.vehicleDetails.OldTppdIncreaeLimit,
              "OldWindScreenSumInsured": this.vehicleDetails.OldWindScreenSumInsured
            }
          }
        }
        ReqObj['FleetOwnerYn'] = "N";
        // if(this.PurchaseDate!=null){
        //   ReqObj['PurchaseDate'] = this.datePipe.transform(this.PurchaseDate, "dd/MM/yyyy");
        // }
        // else{
        //   ReqObj['PurchaseDate'] = '';
        // }
        if(this.insuranceId=='100042'){
          ReqObj['Class']=this.productItem.Class
        }
        if (this.endorsementSection) {
          if (this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y' || (this.vehicleDetails?.Status == 'RP' && !this.adminSection)) {
            ReqObj['Status'] = 'E';
          }
          else {
            ReqObj['Status'] = this.vehicleDetails?.Status;
          }
          ReqObj['PolicyNo'] = this.endorsePolicyNo
        }
        else {
          ReqObj['Status'] = 'Y';
        }
        if (this.insuranceId == '100020' || this.insuranceId == '100028') {
          let dob = null, licenseDate = null, quoteNo = null;
          if (this.licenseIssuedDate != null && this.licenseIssuedDate != '' && this.licenseIssuedDate != undefined) {
            licenseDate = this.datePipe.transform(this.licenseIssuedDate, "dd/MM/yyyy");
          }
          if (this.driverDob != null && this.driverDob != '' && this.driverDob != undefined) {
            if (String(this.driverDob).includes('/')) {
              dob = this.driverDob;
            }
            else dob = this.datePipe.transform(this.driverDob, 'dd/MM/yyyy');
          }
          if (sessionStorage.getItem('quoteNo')) quoteNo = sessionStorage.getItem('quoteNo');
          let areaGroup = null;
          if (this.subUrbanCode != null && this.subUrbanCode != '' && this.subUrbanCode != undefined) {
            areaGroup = this.districtList.find(ele => ele.Code == this.subUrbanCode)?.AreaGroup;
          }
          if (this.insuranceId == '100028') { this.stateValue = null; this.cityCode = null; this.subUrbanCode = null; areaGroup = null; }

          ReqObj['DriverDetails'] = {
            'DriverName': this.driverName,
            'DriverType': this.driverType,
            'Gender': this.gender,
            'LicenseNo': this.licenseNo,
            'MaritalStatus': this.martialStatus,
            'CountryId': this.countryId,
            'StateId': this.stateValue,
            'CityId': this.cityCode,
            'AreaGroup': areaGroup,
            "SuburbId": this.subUrbanCode,
            'DriverExperience': this.driveExperience,
            "CreatedBy": createdBy,
            "DriverDob": dob,
            "QuoteNo": quoteNo,
            "RequestReferenceNo": this.quoteRefNo,
            "RiskId": this.vehicleId,
            "InsuranceId": this.insuranceId,
            "EndorsementYn": this.endorsementYn,
            "EndorsementDate": this.endorsementDate,
            "EndorsementEffectiveDate": this.endorsementEffectiveDate,
            "EndorsementRemarks": this.endorsementRemarks,
            "EndorsementType": this.endorsementType,
            "EndorsementTypeDesc": this.endorsementTypeDesc,
            "EndtCategoryDesc": this.endtCategoryDesc,
            "EndtCount": this.endtCount,
            "EndtPrevPolicyNo": this.endtPrevPolicyNo,
            "EndtPrevQuoteNo": this.endtPrevQuoteNo,
            "EndtStatus": this.endtStatus,
            "IsFinanceEndt": this.isFinanceEndt,
            "OrginalPolicyNo": this.orginalPolicyNo,
            "VehicleValueType": this.productItem.VehicleValue,
            "Inflation": this.productItem.Inflation,
            "Ncb": "0",
            "DefenceValue": this.productItem.DefenceCost,
            "PurchaseDate": this.productItem.PurchaseDate,
            "RegistrationDate": this.vehicleDetails?.RegistrationDate,
            "ExcessLimit": null,
            "Deductibles": deductibles,
            "Mileage": this.productItem.Mileage,
            "NoOfClaimYears": this.productItem.NoOfClaimYears,
            "NoOfPassengers": this.productItem.NoOfPassengers,
          }
        }
        else ReqObj['DriverDetails'] = null;
        if (this.insuranceId == '100019') ReqObj['CarAlarmYn'] = this.productItem.CarAlarmYN;
        if (this.insuranceId == '100020') ReqObj['VehicleClass'] = this.productItem.VehicleClass;
        // if(this.insuranceId=='100040' || this.insuranceId=='100042'){
        //   ReqObj['DriverDetails'] = {
        //     "DrivingLicensingAge":this.DrivingLicensingAge,
        //     "DriverName":this.driverName,
        //   }
        // }
        let urlLink = `${this.motorApiUrl}api/savemotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let res: any = data;
            if (data.ErrorMessage.length != 0) {
              if (res.ErrorMessage) {
              }
            }
            else {
              if (data.Result?.length != 0) {
                let entry = this.vehicleDetailsList[index - 1];
                entry['PolicyEndDate'] = endDate;
                entry['PolicyStartDate'] = startDate;
                this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo', data?.Result[0]?.RequestReferenceNo);
                let i = 0; this.individualCalcIndex = 0;
                for (let veh of data.Result) {
                  entry['MSRefNo'] = data?.Result[0].MSRefNo;
                  entry['VdRefNo'] = data?.Result[0].VdRefNo;
                  entry['CdRefNo'] = data?.Result[0].CdRefNo;
                  entry['Active'] = true;
                  entry['VehicleId'] = data.Result[0].VehicleId;
                  this.onCalculateVehDetails(veh, 'proceedSave', i, data.Result.length, insuranceType.length);
                  i += 1;
                }
              }

            }
          });
      }
    }
  }
  checkMandatories() {
    if (this.insuranceId == '100040' || this.insuranceId == '100042') {
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let i = 0, j = 0;
      for (let field of fieldList) {
        if (field.key == 'InsuranceType') {
          if (this.productItem.InsuranceType == null || this.productItem.InsuranceType == '' || this.productItem.InsuranceType == undefined) { i += 1; field.formControl.setErrors({ 'incorrect': true }) }
          else field.formControl.setErrors(null);
        }
        if (field.key == 'InsuranceClass') {
          if (this.productItem.InsuranceClass == null || this.productItem.InsuranceClass == '' || this.productItem.InsuranceClass == undefined) { i += 1; field.formControl.setErrors({ 'incorrect': true }) }
          else field.formControl.setErrors(null);
        }
        if ((this.insuranceId == '100040' && (this.productItem.InsuranceClass != '121' && this.productItem.InsuranceClass != '122')) || (this.insuranceId == '100042' && (this.productItem.InsuranceClass != '135' && this.productItem.InsuranceClass != '136' && this.productItem.InsuranceClass != '137'))) {
          if (field.key == 'VehicleValue') {
            if (this.productItem.VehicleValue == null || this.productItem.VehicleValue == '' || this.productItem.VehicleValue == undefined) { i += 1; field.formControl.setErrors({ 'incorrect': true }) }
            else field.formControl.setErrors(null);
          }
          else if (field.key == 'VehicleSI') {
            if (this.productItem.VehicleSI == null || this.productItem.VehicleSI == '' || this.productItem.VehicleSI == undefined || this.productItem.VehicleSI == '0' || this.productItem.VehicleSI == 0) { i += 1; field.formControl.setErrors({ 'incorrect': true }) }
            else field.formControl.setErrors(null);
          }
          else if (field.key == 'Deductibles') {
            if ((this.productItem.Deductibles == null || this.productItem.Deductibles == '' || this.productItem.Deductibles == undefined) && this.productItem.InsuranceClass != '126') { i += 1; field.formControl.setErrors({ 'incorrect': true }) }
            else field.formControl.setErrors(null);
          }
          else if (field.key == 'Inflation') {
            if (this.productItem.Inflation == null || this.productItem.Inflation == '' || this.productItem.Inflation == undefined) { i += 1; field.formControl.setErrors({ 'incorrect': true }) }
            else field.formControl.setErrors(null);
          }
        }
        else {
          this.productItem.VehicleValue = null;
        }

        j += 1;
        if (j == fieldList.length) { return i != 0; }
      }
    }
    else return false;
  }
  getCalculationDetails(vehicleDetails, type, index, returnType) {
    let createdBy = "";
    let coverModificationYN = 'N';
    if (this.endorsementSection) {
      // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
      // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
      // else coverModificationYN = 'N';
      if (this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
    }
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP') {
      createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
    }

    let endDate: any = null;
    if (this.policyEndDate) {
      if (this.endorsementSection && this.enableRemoveVehicle) {
        coverModificationYN = 'Y';
        endDate = this.endorseEffectiveDate;
      }
      // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
      //   coverModificationYN = 'N';
      // }
      else {
        if (this.policyEndDate) {
          let dateList = String(this.policyEndDate).split('/');
          if (dateList.length > 1) endDate = this.policyEndDate;
          else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
        }
      }
    }
    let effectiveDate = null;
    if (this.endorsementSection) {
      effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if (this.policyStartDate) {

        let dateList = String(this.policyStartDate).split('/');
        if (dateList.length > 1) effectiveDate = this.policyStartDate;
        else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
    }
    let locationId = '1';
    if (vehicleDetails.LocationId) locationId = vehicleDetails.LocationId
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
      "LocationId": locationId,
      "CreatedBy": createdBy,
      "productId": this.productId,
      "sectionId": this.typeValue,
      "RequestReferenceNo": this.quoteRefNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": endDate,
      "CoverModification": coverModificationYN
    }
    let urlLink = `${this.CommonApiUrl}calculator/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (index == this.vehicleDetailsList.length - 1) {
          this.onFinalProceed();
        }
        else {
          this.tabIndex = this.tabIndex + 1;
          if (this.vehicleDetailsList[index + 1]) { this.getMotorDetails(index + 1); }
          else this.onFinalProceed();
        }
        // sessionStorage.setItem('coverObject',JSON.stringify(data?.CoverList));
        // this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        // console.log("Res",data);
      },
      (err) => { },
    );
  }
  onFinalProceed() {
    let i = 0, j = 0;
    for (let veh of this.vehicleDetailsList) {
      let refNo = veh?.MSRefNo;
      if (((refNo == undefined && (veh.modifiedYN == 'Y' || this.quoteRefNo == null || this.quoteRefNo == undefined || this.endorsementSection || this.changeUwSection)) && (this.finalizeYN != 'Y'))) {
        i += 1;
      }
      j += 1;
      if (j == this.vehicleDetailsList.length) {
        console.log("Final I", i, this.vehicleDetailsList)
        if (i == 0) {
          sessionStorage.setItem('vehicleDetailsList', JSON.stringify(this.vehicleDetailsList));
          // if(this.uwQuestionList.length!=0){
          //   let i = 0;
          //   let uwList:any[]=new Array();
          //   for(let ques of this.uwQuestionList){
          //     ques['BranchCode'] = this.branchCode;
          //     let createdBy="";
          //       let quoteStatus = sessionStorage.getItem('QuoteStatus');
          //       if(quoteStatus=='AdminRP'){
          //           createdBy = this.vehicleDetailsList[0].CreatedBy;
          //       }
          //       else{
          //         createdBy = this.loginId;
          //       }
          //       let status = null,loading = null;
          //       if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
          //         let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
          //         console.log("Found Obj",ques,obj)
          //         if(obj){
          //           loading = obj.LoadingPercent
          //           if(obj.ReferralYn=='Y') status = 'R';
          //           else status = 'Y';
          //         }
          //         else status = 'Y';
          //       }
          //       else status = ques.Status;
          //       let entry = {
          //         "InsuranceId": this.insuranceId,
          //         "ProductId": this.productId,
          //         "UwQuestionId": ques.UwQuestionId,
          //         "UwQuestionDesc": ques.UwQuestionDesc,
          //         "QuestionType": ques.QuestionType,
          //         "EffectiveDateStart": ques.EffectiveDateStart,
          //         "Status": status,
          //         "LoadingPercent": loading,
          //         "MandatoryYn": ques.MandatoryYn,
          //         "DataType": ques.DataType,
          //         "CreatedBy": createdBy,
          //         "UpdatedBy":  this.loginId,
          //         "Value": ques.Value,
          //         "BranchCode": this.branchCode,
          //         "RequestReferenceNo": this.requestReferenceNo,
          //         "VehicleId": this.vehicleId
          //       }
          //       uwList.push(entry);
          //     i+=1;
          //     if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList);
          //   }
          // }
          // else{
          if (this.tabIndex != this.vehicleDetailsList.length) {
            this.tabIndex += 1;
            this.getMotorDetails(this.tabIndex - 1);
          }
          else {
            if (this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
            else this.router.navigate(['/quotation/plan/premium-details']);
          }

          //}

        }
        else {
          this.saveExistData();
        }
      }
    }
  }

  customerSearch(event) {
    this.customerFilterSuggestions = [{ 'name': 'Customer 1' }, { 'name': 'Customer 2' }];
  }
  saveExistData() {
    let i = 0, calcIndex = 0;
    for (let veh of this.vehicleDetailsList) {
      let refNo = veh?.MSRefNo;
      if ((refNo == undefined && (veh?.modifiedYN == 'Y' || this.quoteRefNo == null || this.quoteRefNo == undefined || this.endorsementSection || this.changeUwSection))) {
        let reqRefNo = veh?.RequestReferenceNo;
        if (reqRefNo == undefined) {
          reqRefNo = null;
        }
        this.vehicleId = String(veh.Vehicleid);
        let ReqObj = {
          "RequestReferenceNo": veh.RequestReferenceNo,
          "Idnumber": this.customerDetails?.IdNumber,
          "Vehicleid": veh.Vehicleid
        }
        let urlLink = `${this.motorApiUrl}api/getmotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data.Result) {
              let vehicleDetails: any = data.Result;
              let startDate = "", endDate = ""
              //this.updateComponent.vehicleDetails = this.vehicleDetails;
              if (this.endorsementSection && this.enableAddVehicle && vehicleDetails.EndorsementYn == 'Y') {
                startDate = this.endorseEffectiveDate;
                const oneday = 24 * 60 * 60 * 1000;
                const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                const formattedDatecurrent = new Date(startDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
              }
              else if (this.policyStartDate) {
                if (this.endorsementSection && veh.Status == 'D') {
                  startDate = veh.PolicyStartDate;
                  const oneday = 24 * 60 * 60 * 1000;
                  const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
                  const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                  const formattedDatecurrent = new Date(veh.PolicyStartDate);
                  console.log(formattedDate);
                  this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
                }
                else {
                  let dateList = String(this.policyStartDate).split('/');
                  if (dateList.length == 1) startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                  else startDate = this.policyStartDate;
                  const oneday = 24 * 60 * 60 * 1000;
                  const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                  const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                  const formattedDatecurrent = new Date(this.policyStartDate);
                  console.log(formattedDate);
                  this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
                }


              }
              if (this.endorsementSection && veh.Status == 'D') {
                endDate = this.endorseEffectiveDate;
              }
              else if (this.policyEndDate) {
                let dateList = String(this.policyEndDate).split('/');
                if (dateList.length == 1) endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                else endDate = this.policyEndDate;
              }

              let createdBy = "";
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
                createdBy = this.vehicleDetailsList[0].CreatedBy;
              }
              else {
                createdBy = this.loginId;
              }
              if (this.userType == 'Broker') {
                this.brokerCode = this.agencyCode;
                createdBy = this.loginId;

                this.applicationId = "01";
              }
              this.subuserType = sessionStorage.getItem('typeValue');
              console.log("AcExecutive", this.acExecutiveId);
              if (vehicleDetails?.FleetOwnerYn == null) vehicleDetails.FleetOwnerYn = 'N';
              let appId = "1", loginId = "", brokerbranchCode = "";
              brokerbranchCode = this.brokerbranchCode;
              console.log("Quote Status Received", quoteStatus)
              if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
                brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
                createdBy = this.vehicleDetailsList[0].CreatedBy;
              }
              else {
                createdBy = this.loginId;
                if (this.userType != 'Issuer') {
                  this.brokerCode = this.agencyCode;
                  appId = "1"; loginId = this.loginId;
                  brokerbranchCode = this.brokerbranchCode;
                }
                else {
                  appId = this.loginId;
                  if (this.vehicleDetailsList.length != 0) {
                    loginId = this.vehicleDetailsList[0].LoginId;
                    brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
                  }
                  else {
                    loginId = this.brokerLoginId;
                    brokerbranchCode = this.branchCode;
                  }
                }
              }
              if (this.userType != 'Broker' && this.userType != 'User') {
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
                this.Code = this.subuserType;
                this.customerCode = this.userDetails?.Result.CustomerCode;
              }

              let refNo = "99999", regYear = "99999", IdType = "99999", IdNo = "99999";
              if (this.customerDetails) {
                refNo = this.customerDetails?.CustomerReferenceNo;
                IdNo = this.customerDetails?.IdNumber;
                regYear = this.customerDetails?.DobOrRegDate; IdType = this.customerDetails?.PolicyHolderType;
              };
              console.log("AcExecutive", this.acExecutiveId, this.vehicleDetails, this.sourceType, this.brokerCode, this.customerCode);
              console.log("AcExecutive", this.acExecutiveId);
              let motorUsageId = vehicleDetails.Motorusage
              let motorUsage = vehicleDetails.MotorUsageDesc;
              if (vehicleDetails.MobileCode == null || vehicleDetails.MobileCode == '' || vehicleDetails.MobileCode == undefined) {
                let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
                if (customerDetails) {
                  vehicleDetails['MobileCode'] = customerDetails?.MobileCode1;
                  vehicleDetails['MobileNumber'] = customerDetails?.MobileNo1;
                }
              }

              if (vehicleDetails?.SavedFrom == 'SQ') vehicleDetails.SavedFrom = 'WEB';
              let Insurancetype = null, sectionId = null;
              Insurancetype = vehicleDetails?.Insurancetype;
              sectionId = vehicleDetails?.SectionId;
              let DateOfcirculation;
              if (String(this.productItem.DateOfcirculation).includes('/')) {
                DateOfcirculation = this.productItem.DateOfcirculation;
              }
              else DateOfcirculation = this.datePipe.transform(this.productItem.DateOfcirculation, 'dd/MM/yyyy');
              let LoanStartDate,LoanEndDate
        if(this.productItem.LoanStartDate!='' || this.productItem.LoanStartDate!=null || this.productItem.LoanStartDate!=undefined){
          if (String(this.productItem.LoanStartDate).includes('/')) {
            LoanStartDate = this.productItem.LoanStartDate;
          }
          else LoanStartDate = this.datePipe.transform(this.productItem.LoanStartDate, 'dd/MM/yyyy');
        }
        if(this.productItem.LoanEndDate!='' || this.productItem.LoanEndDate!=null || this.productItem.LoanEndDate!=undefined){
          if (String(this.productItem.LoanEndDate).includes('/')) {
            LoanEndDate = this.productItem.LoanEndDate;
          }
          else LoanEndDate = this.datePipe.transform(this.productItem.LoanEndDate, 'dd/MM/yyyy');
        }
        let zone;
if(this.insuranceId=='100042'){
      zone=this.productItem.Zone
    }
    else{
      zone="1"
    }

              let ReqObj = {
                "BrokerBranchCode": brokerbranchCode,
                "AcExecutiveId": this.acExecutiveId,
                "CommissionType": this.commissionType,
                "CustomerCode": this.customerCode,
                "CustomerName": this.customerName,
                "BdmCode": this.customerCode,
                "BrokerCode": this.brokerCode,
                "LoginId": loginId,
                "SourceTypeId": this.Code,
                "SourceType": this.sourceTypeDesc,
                "SubUserType": this.subuserType,
                "ApplicationId": appId,
                "CustomerReferenceNo": refNo,
                "RequestReferenceNo": veh.RequestReferenceNo,
                "Idnumber": IdNo,
                "EndorsementYn": veh.EndorsementYn,
                "VehicleId": veh.Vehicleid,
                "AcccessoriesSumInsured": vehicleDetails?.AcccessoriesSumInsured,
                "AccessoriesInformation": "",
                "AdditionalCircumstances": "",
                "AxelDistance": vehicleDetails?.AxelDistance,
                "Chassisnumber": vehicleDetails?.Chassisnumber,
                "Color": vehicleDetails?.Color,
                "CityLimit": vehicleDetails?.CityLimit,
                "CoverNoteNo": null,
                "MobileCode": vehicleDetails?.MobileCode,
                "MobileNumber": vehicleDetails?.MobileNumber,
                "OwnerCategory": vehicleDetails?.OwnerCategory,
                "CubicCapacity": vehicleDetails?.Grossweight,
                "CreatedBy": createdBy,
                "DrivenByDesc": this.drivenBy,
                "EngineNumber": vehicleDetails?.EngineNumber,
                "FuelType": vehicleDetails?.FuelType,
                "Gpstrackinginstalled": vehicleDetails?.Gpstrackinginstalled,
                "Grossweight": vehicleDetails?.Grossweight,
                "HoldInsurancePolicy": "N",
                "InsurancetypeDesc": vehicleDetails?.InsurancetypeDesc,
                "Insurancetype": Insurancetype,
                "InsuranceId": this.insuranceId,
                "InsuranceClass": vehicleDetails?.InsuranceClass,
                "InsuranceClassDesc": vehicleDetails?.InsuranceClassDesc,
                "InsurerSettlement": "",
                "InterestedCompanyDetails": "",
                "ManufactureYear": vehicleDetails?.ManufactureYear,
                "ModelNumber": null,
                "MotorCategory": vehicleDetails?.MotorCategory,
                "Motorusage": motorUsage,
                "MotorusageId": motorUsageId,
                "NcdYn": vehicleDetails?.NcdYn,
                "PolicyRenewalYn": vehicleDetails?.PolicyRenewalYn,
                "NoOfClaims": null,
                "NumberOfAxels": vehicleDetails?.NumberOfAxels,
                "BranchCode": this.branchCode,
                "AgencyCode": this.agencyCode,
                "ProductId": this.productId,
                "SectionId": Insurancetype,
                "PolicyType": IdType,
                "RadioOrCasseteplayer": null,
                "RegistrationYear": regYear,
                "Registrationnumber": vehicleDetails?.Registrationnumber,
                "RoofRack": null,
                "SeatingCapacity": vehicleDetails?.SeatingCapacity,
                "SpotFogLamp": null,
                "Stickerno": null,
                "SumInsured": vehicleDetails?.SumInsured,
                "InflationSumInsured": vehicleDetails.InflationSumInsured,
                "Tareweight": vehicleDetails?.Tareweight,
                "TppdFreeLimit": null,
                "TppdIncreaeLimit": vehicleDetails?.TppdIncreaeLimit,
                "TrailerDetails": null,
                "Vehcilemodel": vehicleDetails?.Vehcilemodel,
                "VehicleType": vehicleDetails?.VehicleType,
                "VehicleTypeId": vehicleDetails?.VehicleTypeId,
                "Vehiclemake": vehicleDetails?.VehiclemakeDesc,
                "VehiclemakeId": vehicleDetails?.Vehiclemake,
                "VehicleModel": vehicleDetails?.VehicleModelDesc,
                "VehcilemodelId": vehicleDetails?.Vehcilemodel,
                "WindScreenSumInsured": vehicleDetails?.WindScreenSumInsured,
                "Windscreencoverrequired": null,
                "accident": null,
                "periodOfInsurance": this.noOfDays,
                "PolicyStartDate": startDate,
                "PolicyEndDate": endDate,
                "Currency": this.currencyCode,
                "ExchangeRate": this.exchangeRate,
                "HavePromoCode": this.havePromoCodeYN,
                "PromoCode": this.promocode,
                "CollateralYn": vehicleDetails?.CollateralYn,
                "BorrowerType": vehicleDetails?.BorrowerType,
                "CollateralName": vehicleDetails?.CollateralName,
                "FirstLossPayee": vehicleDetails?.FirstLossPayee,
                "FleetOwnerYn": vehicleDetails?.FleetOwnerYn,
                "NoOfVehicles": vehicleDetails?.NoOfVehicles,
                "NoOfComprehensives": vehicleDetails?.NoOfComprehensives,
                "ClaimRatio": vehicleDetails?.ClaimRatio,
                "SavedFrom": vehicleDetails?.SavedFrom,
                "UserType": this.userType,
                "TiraCoverNoteNo": vehicleDetails?.TiraCoverNoteNo,
                "EndorsementDate": vehicleDetails?.EndorsementDate,
                "EndorsementEffectiveDate": vehicleDetails?.EndorsementEffectiveDate,
                "EndorsementRemarks": vehicleDetails?.EndorsementRemarks,
                "EndorsementType": vehicleDetails?.EndorsementType,
                "EndorsementTypeDesc": vehicleDetails?.EndorsementTypeDesc,
                "EndtCategoryDesc": vehicleDetails?.EndtCategoryDesc,
                "EndtCount": vehicleDetails?.EndtCount,
                "EndtPrevPolicyNo": vehicleDetails?.EndtPrevPolicyNo,
                "EndtPrevQuoteNo": vehicleDetails?.EndtPrevQuoteNo,
                "EndtStatus": vehicleDetails?.EndtStatus,
                "IsFinanceEndt": vehicleDetails?.IsFinanceEndt,
                "OrginalPolicyNo": vehicleDetails?.OrginalPolicyNo,
                "Mileage": vehicleDetails?.Mileage,
                "NoOfClaimYears": vehicleDetails?.NoOfClaimYears,
                "NoOfPassengers": vehicleDetails?.NoOfPassengers,
                "HorsePower": vehicleDetails?.HorsePower,
                "DateOfCirculation": DateOfcirculation,
                "Zone": zone,
                "BankingDelegation": vehicleDetails?.BankingDelegation,
                "LoanStartDate": LoanStartDate,
                "LoanEndDate": LoanEndDate,
                "CollateralCompanyAddress": vehicleDetails?.CollateralCompanyAddress,
                "CollateralCompanyName": vehicleDetails?.CollateralCompanyName,
                "LoanAmount": vehicleDetails?.LoanAmount,
                "PaCoverId": vehicleDetails?.PaCoverId,
                "UsageId": vehicleDetails?.UsageId,
                "VehicleTypeIvr": vehicleDetails?.VehicleTypeIvr,
                "ZoneCirculation": vehicleDetails?.ZoneCirculation,
                "Scenarios": {
                  "ExchangeRateScenario": {
                    "OldAcccessoriesSumInsured": vehicleDetails.AcccessoriesSumInsured,
                    "OldCurrency": vehicleDetails.Currency,
                    "OldExchangeRate": vehicleDetails.ExchangeRate,
                    "OldSumInsured": vehicleDetails.SumInsured,
                    "OldTppdIncreaeLimit": vehicleDetails.TppdIncreaeLimit,
                    "OldWindScreenSumInsured": vehicleDetails.WindScreenSumInsured
                  }
                }
              }
              if(this.insuranceId=='100042'){
                ReqObj['Class']=this.vehicleDetails.Class
              }
              if (this.endorsementSection) {
                if (this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y' || (this.vehicleDetails?.Status == 'RP' && !this.adminSection)) {
                  ReqObj['Status'] = 'E';
                }
                else {
                  ReqObj['Status'] = vehicleDetails?.Status;
                }
                ReqObj['PolicyNo'] = this.endorsePolicyNo
              }
              else {
                ReqObj['Status'] = 'Y';
              }
              let urlLink = `${this.motorApiUrl}api/savemotordetails`;
              this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                  let res: any = data;
                  if (data.ErrorMessage.length != 0) {
                    if (res.ErrorMessage) {
                      // for(let entry of res.ErrorMessage){
                      //   let type: NbComponentStatus = 'danger';
                      //   const config = {
                      //     status: type,
                      //     destroyByClick: true,
                      //     duration: 4000,
                      //     hasIcon: true,
                      //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                      //     preventDuplicates: false,
                      //   };
                      //   this.toastrService.show(
                      //     entry.Field,
                      //     entry.Message,
                      //     config);
                      // }
                    }
                  }
                  else {
                    if (data.Result?.length != 0) {
                      let entry = veh;
                      entry['PolicyEndDate'] = endDate;
                      entry['PolicyStartDate'] = startDate;
                      this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                      sessionStorage.setItem('quoteReferenceNo', data?.Result[0]?.RequestReferenceNo);
                      let j = 0; this.individualCalcIndex = 0;
                      for (let cover of data.Result) {
                        entry['MSRefNo'] = data?.Result[0].MSRefNo;
                        entry['VdRefNo'] = data?.Result[0].VdRefNo;
                        entry['CdRefNo'] = data?.Result[0].CdRefNo;
                        entry['Active'] = true;
                        entry['VehicleId'] = data.Result[0].VehicleId;
                        this.onCalculateVehDetails(cover, 'proceedSave', j, data.Result.length, vehicleDetails?.Insurancetype.length);
                        j += 1;
                      }
                    }

                    // sessionStorage.setItem('editVehicleId',this.vehicleId);
                    // sessionStorage.removeItem('vehicleDetails');
                    // sessionStorage.setItem('vehChassisNo',this.vehicleDetails?.Chassisnumber);

                    // this.getCalculationDetails(data?.Result);
                  }
                },
                (err) => { },
              );
            }
          },
          (err) => { },
        );
      }
      else {
        i += 1;
        this.getCalculationDetails(veh, null, i, 'finalProceed');
        // i+=1;
        // if(i==this.vehicleDetailsList.length) this.onFinalProceed();
      }
    }
  }
  onCreateVehicle() {
    this.policyStartError = false; this.policyEndError = false; this.currencyCodeError = false; this.policyPassDate = false;
    let i = 0;
    if (!this.endorsementSection) {
      if (this.policyStartDate == null || this.policyStartDate == '' || this.policyStartDate == undefined) {
        i += 1;
        this.policyStartError = true;
      }
      else {
        let dateList = String(this.policyStartDate).split('/');
        if (dateList.length > 0) {
          let date = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
          var firstRepaymentDate = new Date(date);
          var today = new Date();
          if ((this.productId == '5' || this.productId == '4' || this.productId == '46' || this.productId == '29') && (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0))) {
            i += 1;
            this.policyPassDate = true;
          }
        }
      }
      if (this.policyEndDate == null || this.policyEndDate == '' || this.policyEndDate == undefined) {
        i += 1;
        this.policyEndError = true;
      }
      if (this.currencyCode == null || this.currencyCode == '' || this.currencyCode == undefined) {
        i += 1;
        this.currencyCodeError = true;
      }
      if (this.issuerSection) {
        if (this.Code == '' || this.Code == null || this.Code == undefined) {
          i += 1;
          this.sourceCodeError = true;
        }
        else {
          //if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
          if (this.customerName == '' || this.customerName == undefined || this.customerName == null) {
            this.customerCodeError = true;
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
            i += 1;
          }

          // }
          // else{
          //   if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
          //     this.brokerCodeError = true;
          //     i+=1;
          //   }
          //   if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
          //     this.brokerBranchCodeError = true;
          //     i+=1;
          //   }
          // }
        }
      }
    }
    if (i == 0) {
      sessionStorage.setItem('editVehicleId', String(this.vehicleDetailsList.length + 1));
      sessionStorage.removeItem('EditCarDetails');
      let startDate = null, endDate = null;
      let startDateList = String(this.policyStartDate).split('/');
      if (startDateList.length > 1) startDate = this.policyStartDate
      else startDate = this.datePipe.transform(this.policyStartDate, 'dd/MM/yyyy');
      let endDateList = String(this.policyEndDate).split('/');
      if (endDateList.length > 1) endDate = this.policyEndDate
      else endDate = this.datePipe.transform(this.policyEndDate, 'dd/MM/yyyy');
      let entry = {
        "policyStartDate": startDate,
        "policyEndDate": endDate,
        "currencyCode": this.currencyCode,
        "exchangeRate": this.exchangeRate,
        "promoCode": this.promocode,
        "BrokerCode": this.brokerCode,
        "SourceType": this.sourceType,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BrokerBranchCode": this.brokerBranchCode,
        "LoginId": this.brokerLoginId,
        "SourceCode": this.Code,
      }
      sessionStorage.setItem('commonDetails', JSON.stringify(entry));
      sessionStorage.setItem('vehicleLength', String(this.vehicleDetailsList.length + 1))
      sessionStorage.setItem('vehicleDetailsList', JSON.stringify(this.vehicleDetailsList));
      this.router.navigate(['/quotation/plan/motor-details'])
    }
  }
  showSidebar() {
    this.sidebarVisible = true;
  }

  showSearchForm(type) {
    if (type == 'direct') {
      sessionStorage.removeItem('QuoteStatus');
      sessionStorage.removeItem('vehicleDetailsList');
      sessionStorage.removeItem('customerReferenceNo');
      sessionStorage.removeItem('quoteReferenceNo');
      sessionStorage.removeItem('TravelQuoteRefNo')
      sessionStorage.removeItem('endorsePolicyNo');
    }
    let appId = "1", loginId = "", brokerbranchCode = "";
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else {
      appId = this.loginId;
      brokerbranchCode = null;
    }
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "CreatedBy": this.loginId,
      "BranchCode": this.branchCode,
      "UserType": this.userType,
      "Limit": "0",
      "Offset": "1000"
    }
    let urlLink = `${this.CommonApiUrl}api/getactivecustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.customers = data?.Result;
          this.searchValue = [];
          this.clearSearchSection = false;
          this.isSearchFormVisible = true;
        }
      });
  }
  hideSearchForm() {
    if (this.customerDetails == null || this.customerDetails == undefined) {
      this.isSearchFormVisible = true;
    }
    else {
      this.isSearchFormVisible = false;
      this.selectedCustomer = null;
    }
  }
  onSelectCustomer(rowData) {
    this.selectedCustomer = rowData.CustomerReferenceNo;
    sessionStorage.setItem('customerReferenceNo', rowData.CustomerReferenceNo);
  }
  onCreateCustomer() {
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('endorsePolicyNo');
    this.router.navigate(['/customer/create'])
  }
  navigateToCustomerDetail() {
    sessionStorage.setItem('customerReferenceNo', this.selectedCustomer);
    this.isSearchFormVisible = false;
    this.getCustomerDetails(this.selectedCustomer);
    // this.router.navigate(['/policyDetails']);
  }
  checkActiveVehicles() {
    if (this.vehicleDetailsList.length == 0) return false;
    else if (this.vehicleDetailsList.length == 1) { return true; }
    else {
      var exist = this.vehicleDetailsList.some(ele => ele?.MSRefNo == undefined || ele?.MSRefNo == null);
      console.log("Final Entry ", exist)
      return !exist;
    }

  }
  onProceed(type) {
    if (this.insuranceId == '100040' || this.insuranceId == '100042') {
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let i = 0, j = 0;
      for (let field of fieldList) {
        if ((field.templateOptions.required == true || field.props.required == true) && (field.hide != true)) {
          if (this.productItem[field.key] == null || this.productItem[field.key] == undefined || this.productItem[field.key] == '') {
            j += 1;
            this.form.controls[field.key].errors = true;
            this.form.controls[field.key].touched = true;
            field.templateOptions['errors'] = true;
            field.props['errors'] = true;
            console.log(this.form.controls[field.key]);
          }
          else {
            field.templateOptions['errors'] = false;
            field.props['errors'] = false;
          }
          i += 1;
          if (i == fieldList.length && j == 0) {
            if (this.checkDisableField()) {
              if (this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
              else this.router.navigate(['/quotation/plan/premium-details']);
            }
            else if (this.vehicleDetailsList.length != 0) {
              if (this.vehicleDetailsList.length == 1 && this.finalizeYN != 'Y') {
                this.onFormSubmit('proceedSave');
              }
              else {
                if (type == 'save') { this.onFormSubmit('proceedSave'); }
                else this.onFinalProceed();
              }
            }
          }
        }
        else {
          i += 1;
          if (i == fieldList.length && j == 0) {
            if (this.checkDisableField()) {
              if (this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
              else this.router.navigate(['/quotation/plan/premium-details']);
            }
            else if (this.vehicleDetailsList.length != 0) {
              if (this.vehicleDetailsList.length == 1 && this.finalizeYN != 'Y') {
                this.onFormSubmit('proceedSave');
              }
              else {
                if (type == 'save') { this.onFormSubmit('proceedSave'); }
                else this.onFinalProceed();
              }
            }
          }
        }
      }
    }
    else {
      if (this.checkDisableField()) {
        if (this.endorsementSection) this.router.navigate(['/quotation/plan/premium-info']);
        else this.router.navigate(['/quotation/plan/premium-details']);
      }
      else if (this.vehicleDetailsList.length != 0) {
        if (this.vehicleDetailsList.length == 1 && this.finalizeYN != 'Y') {
          this.onFormSubmit('proceedSave');
        }
        else {
          if (type == 'save') { this.onFormSubmit('proceedSave'); }
          else this.onFinalProceed();
        }
      }
    }


  }
  onFormSubmit(type) {
    sessionStorage.removeItem('loadingType');
    this.currentIndex = 1;
    let entry = false;
    if (this.finalizeYN != 'Y') {
      if (this.checkDisableField()) {
        if (this.currentIndex < this.vehicleDetailsList.length) {
          this.collateralYN = "N";
          if (this.collateralYN == 'Y') this.collateralValue = true;
          else { this.collateralValue = false; this.borrowerValue = null; this.collateralName = null; this.firstLossPayee = null;this.LoanStartDate==''
            this.LoanEndDate=='';this.CollateralCompanyAddress='';this.CollateralCompanyName='';this.LoanAmount='';this.BankingDelegation='' }
          this.currentIndex = this.currentIndex + 1;
          if (this.vehicleDetailsList[this.currentIndex - 1]?.Active == true) {
            if (this.endorsementSection && this.enableAddVehicle) {
              if (this.vehicleDetailsList[this.currentIndex - 1]?.EndorsementYn) {
                if (this.vehicleDetailsList[this.currentIndex - 1].EndorsementYn == 'Y') { this.enableFieldsSection = true; }
                else { this.enableFieldsSection = false; }
              }
              else this.enableFieldsSection = false;
            }
            this.vehicleId = String(this.vehicleDetailsList[this.currentIndex - 1].Vehicleid);
            this.getEditVehicleDetails(this.vehicleId, 'direct');
            this.vehicleDetailsList.length = this.vehicleDetailsList.length;
          }
          else {

            this.vehicleDetails = this.vehicleDetailsList[this.currentIndex - 1];
            if (this.endorsementSection && this.enableAddVehicle) {
              if (this.vehicleDetails?.EndorsementYn) {
                if (this.vehicleDetails.EndorsementYn == 'Y') this.enableFieldsSection = true;
                else this.enableFieldsSection = false;
              }
            }
            this.vehicleDetails = this.vehicleDetailsList[this.currentIndex - 1];
            this.vehicleDetailsList.length = this.vehicleDetailsList.length;
            this.setVehicleValues('direct');
          }
        }
      }
      else if (!entry) {
        if (this.insuranceId == '100004') this.typeValue = this.classValue;
        let createdBy = "";
        let startDate = "", endDate = "", vehicleSI = "", accSI = "", windSI = "", tppSI = "";
        if (this.vehicleSI == undefined) vehicleSI = null;
        else if (this.vehicleSI.includes(',')) { vehicleSI = this.vehicleSI.replace(/,/g, '') }
        else vehicleSI = this.vehicleSI;
        if (this.accessoriesSI == undefined) accSI = null;
        else if (this.accessoriesSI.includes(',')) { accSI = this.accessoriesSI.replace(/,/g, '') }
        else accSI = this.accessoriesSI
        if (this.windShieldSI == undefined) windSI = null;
        else if (this.windShieldSI.includes(',')) { windSI = this.windShieldSI.replace(/,/g, '') }
        else windSI = this.windShieldSI
        if (this.tppdSI == undefined) tppSI = null;
        else if (this.tppdSI.includes(',')) { tppSI = this.tppdSI.replace(/,/g, '') }
        else tppSI = this.tppdSI
        this.vehicleId = this.vehicleDetails?.Vehicleid;
        if (this.policyStartDate) {
          if (this.endorsementSection && (this.enableAddVehicle && this.endorsementYn == 'Y')) {
            startDate = this.endorseEffectiveDate;
            const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(startDate);
            console.log(formattedDate);

            console.log(formattedDatecurrent);

            this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
          }
          else if (this.endorsementSection && this.vehicleDetails?.Status == 'D') {
            startDate = this.vehicleDetails?.PolicyStartDate;
            const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.vehicleDetails?.PolicyStartDate);
            console.log(formattedDate);
            this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
          }
          else {
            let dateList = String(this.policyStartDate).split('/');
            if (dateList.length == 1) startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            else startDate = this.policyStartDate;
            // if(this.policyStartDate.includes('/')) startDate = this.policyStartDate;
            // else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");

            const oneday = 24 * 60 * 60 * 1000;

            const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.policyStartDate);

            console.log(formattedDate);
            this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);

          }
        }
        if (this.policyEndDate) {
          if (this.endorsementSection && this.vehicleDetails.Status == 'D') {
            endDate = this.endorseEffectiveDate;
          }
          else {
            let dateList = String(this.policyEndDate).split('/');
            if (dateList.length == 1) endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            else endDate = this.policyEndDate;
          }
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        this.subuserType = sessionStorage.getItem('typeValue');
        console.log("AcExecutive", this.acExecutiveId, this.vehicleDetails, this.sourceType, this.brokerCode, this.customerCode);

        let appId = "1", loginId = "", brokerbranchCode = "";
        if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
          brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
          createdBy = this.vehicleDetailsList[0].CreatedBy;
        }
        else {
          createdBy = this.loginId;
          if (this.userType != 'Issuer') {
            this.brokerCode = this.agencyCode;
            appId = "1"; loginId = this.loginId;
            brokerbranchCode = this.brokerbranchCode;
          }
          else {
            appId = this.loginId;
            loginId = this.vehicleDetails?.LoginId;
            brokerbranchCode = this.vehicleDetails?.BrokerBranchCode;
          }
        }
        if (this.userType != 'Broker' && this.userType != 'User') {
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
          this.Code = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
        if (this.customerName == undefined) this.customerName = null;
        let refNo = "99999", regYear = "99999", IdType = "99999", IdNo = "99999";
        if (this.customerDetails) {
          refNo = this.customerDetails?.CustomerReferenceNo;
          IdNo = this.customerDetails?.IdNumber;
          regYear = this.customerDetails?.DobOrRegDate; IdType = this.customerDetails?.PolicyHolderType;
        };
        let deductibles = null;
        if (this.productItem.Deductibles != '' && this.productItem.Deductibles != undefined) deductibles = this.productItem.Deductibles;

        let PurchaseDate = null;
        if (this.productItem.PurchaseDate != null && this.productItem.PurchaseDate != '' && this.productItem.PurchaseDate != undefined) {
          if (String(this.productItem.PurchaseDate).includes('/')) {
            PurchaseDate = this.productItem.PurchaseDate;
          }
          else PurchaseDate = this.datePipe.transform(this.productItem.PurchaseDate, 'dd/MM/yyyy');
        }
        if (this.productItem.GpsYN == null || this.productItem.GpsYN == undefined || this.productItem.GpsYN == '') this.productItem.GpsYN = 'N';
        this.vehicleDetails['VehicleTypeId'] = null;
        if (this.productItem.BodyType != null && this.productItem.BodyType != '') {
          let usageId = this.motorTypeList.find(ele => ele.CodeDesc == this.productItem.BodyType || ele.Code == this.productItem.BodyType).Code;
          if (usageId) this.vehicleDetails['VehicleTypeId'] = usageId;
          let usageDesc = this.motorTypeList.find(ele => ele.CodeDesc == this.productItem.BodyType || ele.Code == this.productItem.BodyType).CodeDesc;
          if (usageDesc) this.vehicleDetails['VehicleType'] = usageDesc;

        }
        let motorUsage = null, motorUsageId = null;

        if (this.productItem.MotorUsage != null && this.productItem.MotorUsage != '' && this.productItem.MotorUsage != undefined) {
          let usageDesc = this.motorUsageList.find(ele => ele.CodeDesc == this.productItem.MotorUsage || ele.Code == this.productItem.MotorUsage)?.CodeDesc;
          if (usageDesc) {
            motorUsage = usageDesc;
            let usageId = this.motorUsageList.find(ele => ele.CodeDesc == this.productItem.MotorUsage || ele.Code == this.productItem.MotorUsage)?.Code;
            if (usageId) motorUsageId = usageId;
          }
          else {
            motorUsageId = this.vehicleDetails.Motorusage
            motorUsage = this.vehicleDetails.MotorUsageDesc;
          }
        }
        else {
          motorUsageId = this.vehicleDetails.Motorusage
          motorUsage = this.vehicleDetails.MotorUsageDesc;
        }
        if (this.vehicleDetails.MobileCode == null || this.vehicleDetails.MobileCode == '' || this.vehicleDetails.MobileCode == undefined) {
          let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
          if (customerDetails) {
            this.vehicleDetails['MobileCode'] = customerDetails?.MobileCode1;
            this.vehicleDetails['MobileNumber'] = customerDetails?.MobileNo1;
            if (this.customerName == null) {
              this.customerName = customerDetails?.ClientName;
            }
          }
        }
        let insuranceType = '', sectionId = [];
        if ((this.insuranceId == '100028' || this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100040') && this.vehicleDetailsList.length == 1) {
          //if(this.typeValue==null || this.typeValue==undefined){
          for (let entry of this.typeList) {
            sectionId.push(entry.Code);
          }
          insuranceType = this.typeList[0];
          // }
          // else insuranceType.push(this.typeValue)
        }
        else {
          if (this.typeValue == null || this.typeValue == undefined) {

          }
          else {
            if (this.insuranceId == '100004') {
              this.productItem.InsuranceType = this.productItem.InsuranceClass;
              this.productItem.InsurancetypeDesc = this.productItem.InsuranceClassDesc;
            }
            else {
              insuranceType = this.productItem.InsuranceType;
              sectionId = [this.productItem.InsuranceType]
            }
          }
        }

        if (this.insuranceId == '100027' || this.insuranceId == '100028') {
          if (Array.isArray(sectionId)) {
            if (sectionId.length != 0) this.productItem.InsuranceClass = sectionId[0];
          }
          else this.productItem.InsuranceClass = insuranceType
          this.classValue = this.typeValue;
        }
        if (this.motorDetails?.SavedFrom == 'SQ') this.motorDetails.SavedFrom = 'WEB';
        let DateOfcirculation;
        if (String(this.productItem.DateOfcirculation).includes('/')) {
          DateOfcirculation = this.productItem.DateOfcirculation;
        }
        else DateOfcirculation = this.datePipe.transform(this.productItem.DateOfcirculation, 'dd/MM/yyyy');
        if (this.productItem.InsurancetypeDesc == undefined) {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.key == 'InsuranceType' && this.insuranceId != '100004') {
              let list = field.props.options;
              let entry = list.find(ele => ele.value == this.productItem.InsuranceType);

              console.log("Optionsssssssssss", field.props.options)
              if (entry) this.productItem.InsurancetypeDesc = entry.label;
            }
          }
        }
        if (this.productItem.InsuranceClassDesc == undefined) {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.key == 'InsuranceClass' && this.insuranceId != '100027' && this.insuranceId != '100028') {
              let list = field.props.options;
              let entry = list.find(ele => ele.value == this.productItem.InsuranceClass);
              if (entry) this.productItem.InsuranceClassDesc = entry.label;
            }
            else if (field.key == 'InsuranceType' && (this.insuranceId == '100027' || this.insuranceId == '100028')) {
              let list = field.props.options;
              let entry = list.find(ele => ele.value == this.productItem.InsuranceType);
              if (entry) this.productItem.InsuranceClassDesc = entry.label;
            }
          }
        }
        console.log(entry, "CodeDescCodeDesc");
        if (this.insuranceId == '100042' || this.insuranceId == '100040') {
          sectionId = [String(this.productItem.InsuranceClass)];
          insuranceType = this.productItem.InsuranceType;
          motorUsage = this.productItem.InsuranceType;
          motorUsageId = this.productItem.InsuranceClassDesc;
          this.productItem.Mileage = "1"
          if (this.productItem.Aggregatedvalue != null || this.productItem.Aggregatedvalue != undefined || this.productItem.Aggregatedvalue != '') this.commaSeparatedToNumber();
          if (this.productItem.Marketvalue) this.productItem.VehicleSI = this.productItem.Marketvalue;
        }
        else {
          if (sectionId) {
            if (sectionId.length != 0) insuranceType = sectionId[0];
            else insuranceType = null;
          }
          else insuranceType = null;
        }
        let LoanStartDate,LoanEndDate
        if(this.LoanStartDate!='' || this.LoanStartDate!=null || this.LoanStartDate!=undefined){
          if (String(this.LoanStartDate).includes('/')) {
            LoanStartDate = this.LoanStartDate;
          }
          else LoanStartDate = this.datePipe.transform(this.LoanStartDate, 'dd/MM/yyyy');
        }
        if(this.LoanEndDate!='' || this.LoanEndDate!=null || this.LoanEndDate!=undefined){
          if (String(this.LoanEndDate).includes('/')) {
            LoanEndDate = this.LoanEndDate;
          }
          else LoanEndDate = this.datePipe.transform(this.LoanEndDate, 'dd/MM/yyyy');
        }
        let zone;
        if(this.insuranceId=='100042'){
          zone=this.productItem.Zone
        }
        else{
          zone="1"
        }
        let ReqObj = {
          "ExcessLimit": null,
          "Deductibles": deductibles,
          "BrokerBranchCode": brokerbranchCode,
          "AcExecutiveId": this.acExecutiveId,
          "CommissionType": this.commissionType,
          "CustomerCode": this.customerCode,
          "CustomerName": this.customerName,
          "BdmCode": this.customerCode,
          "BrokerCode": this.brokerCode,
          "LoginId": loginId,
          "SubUserType": this.subuserType,
          "ApplicationId": appId,
          "CustomerReferenceNo": refNo,
          "RequestReferenceNo": this.quoteRefNo,
          "Idnumber": IdNo,
          "VehicleId": this.vehicleId,
          "AcccessoriesSumInsured": this.productItem.AccessoriesSI,
          "AccessoriesInformation": "",
          "AdditionalCircumstances": "",
          "AxelDistance": this.vehicleDetails?.AxelDistance,
          "Chassisnumber": this.vehicleDetails?.Chassisnumber,
          "Color": this.vehicleDetails?.Color,
          "CityLimit": this.cityValue,
          "CoverNoteNo": null,
          "MobileCode": this.vehicleDetails?.MobileCode,
          "MobileNumber": this.vehicleDetails?.MobileNumber,
          "OwnerCategory": this.vehicleDetails?.OwnerCategory,
          "CubicCapacity": this.vehicleDetails?.Grossweight,
          "CreatedBy": createdBy,
          "DrivenByDesc": this.drivenBy,
          "EngineNumber": this.vehicleDetails?.EngineNumber,
          "FuelType": this.vehicleDetails?.FuelType,
          "Gpstrackinginstalled": this.productItem.GpsYN,
          "Grossweight": this.vehicleDetails?.Grossweight,
          "HoldInsurancePolicy": "N",
          "Insurancetype": insuranceType,
          "InsurancetypeDesc": this.productItem.InsurancetypeDesc,
          "InsuranceId": this.insuranceId,
          "InsuranceClass": this.productItem.InsuranceClass,
          "InsuranceClassDesc": this.productItem.InsuranceClassDesc,
          "InsurerSettlement": "",
          "InterestedCompanyDetails": "",
          "ManufactureYear": this.vehicleDetails?.ManufactureYear,
          "ModelNumber": null,
          "MotorCategory": this.vehicleDetails?.MotorCategory,
          "Motorusage": motorUsage,
          "MotorusageId": motorUsageId,
          "NcdYn": this.productItem.ClaimsYN,
          "PolicyRenewalYn": this.productItem.RenewalYn,
          "NoOfClaims": null,
          "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "ProductId": this.productId,
          "SectionId": sectionId,
          "PolicyType": IdType,
          "RadioOrCasseteplayer": null,
          "RegistrationYear": regYear,
          "Registrationnumber": this.vehicleDetails?.Registrationnumber,
          "RoofRack": null,
          "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
          "SourceTypeId": this.Code,
          "SpotFogLamp": null,
          "Stickerno": null,
          "SumInsured": this.productItem.VehicleSI,
          "InflationSumInsured": this.productItem.InflationSumInsured,
          "Tareweight": this.vehicleDetails?.Tareweight,
          "TppdFreeLimit": null,
          "TppdIncreaeLimit": this.productItem.ExtendedTPPDSI,
          "TrailerDetails": null,
          "VehicleModel": this.vehicleDetails?.VehicleModelDesc,
          "VehcilemodelId": this.vehicleDetails?.Vehcilemodel,
          "VehicleType": this.vehicleDetails.VehicleType,
          "VehicleTypeId": this.vehicleDetails?.VehicleTypeId,
          "Vehiclemake": this.vehicleDetails?.VehiclemakeDesc,
          "VehiclemakeId": this.vehicleDetails?.Vehiclemake,
          "WindScreenSumInsured": this.productItem.WindShieldSI,
          "Windscreencoverrequired": null,
          "accident": null,
          "periodOfInsurance": this.noOfDays,
          "PolicyStartDate": startDate,
          "PolicyEndDate": endDate,
          "Currency": this.currencyCode,
          "ExchangeRate": this.exchangeRate,
          "HavePromoCode": this.havePromoCodeYN,
          "PromoCode": this.promocode,
          "CollateralYn": this.collateralYN,
          "BorrowerType": this.borrowerValue,
          "CollateralName": this.collateralName,
          "FirstLossPayee": this.firstLossPayee,
          "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
          "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
          "NoOfComprehensives": this.noOfCompPolicy,
          "ClaimRatio": this.claimRatio,
          "SavedFrom": this.motorDetails?.SavedFrom,
          "UserType": this.userType,
          "TiraCoverNoteNo": this.productItem.TiraCoverNoteNo,
          "EndorsementYn": this.endorsementYn,
          "EndorsementDate": this.endorsementDate,
          "EndorsementEffectiveDate": this.endorsementEffectiveDate,
          "EndorsementRemarks": this.endorsementRemarks,
          "EndorsementType": this.endorsementType,
          "EndorsementTypeDesc": this.endorsementTypeDesc,
          "EndtCategoryDesc": this.endtCategoryDesc,
          "EndtCount": this.endtCount,
          "EndtPrevPolicyNo": this.endtPrevPolicyNo,
          "EndtPrevQuoteNo": this.endtPrevQuoteNo,
          "EndtStatus": this.endtStatus,
          "IsFinanceEndt": this.isFinanceEndt,
          "OrginalPolicyNo": this.orginalPolicyNo,
          "ClaimType": this.claimTypeValue,
          "VehicleValueType": this.productItem.VehicleValue,
          "Inflation": this.productItem.Inflation,
          "Ncb": "0",
          "DefenceValue": this.productItem.DefenceCost,
          "PurchaseDate": PurchaseDate,
          "RegistrationDate": this.vehicleDetails?.RegistrationDate,
          "Mileage": this.productItem?.Mileage,
          "NoOfClaimYears": this.productItem.NoOfClaimYears,
          "NoOfPassengers": this.productItem.NoOfPassengers,
          "PreviousInsuranceYN": this.productItem.PreviousInsuranceYN,
          "PreviousLossRatio": this.productItem.PreviousLossRatio,
          "HorsePower": this.vehicleDetails.HorsePower,
          "Zone": zone,
          
          "DateOfCirculation": DateOfcirculation,
          "NewValue": this.productItem.Newvalue,
          "MarketValue": this.productItem.Marketvalue,
          "AggregatedValue": this.productItem.Aggregatedvalue,
          "NumberOfCards": this.productItem.Nombredecartes,
          "MunicipalityTraffic": this.productItem.MunicipalityofTraffic,
          "TransportHydro": this.productItem.Transportationofhydrocarbons,
          "BankingDelegation": this.BankingDelegation,
          "LoanStartDate": LoanStartDate,
          "LoanEndDate": LoanEndDate,
          "CollateralCompanyAddress": this.CollateralCompanyAddress,
          "CollateralCompanyName": this.CollateralCompanyName,
          "LoanAmount": this.LoanAmount,
          "PaCoverId": this.productItem.PACoverId,
          "UsageId": this.productItem.VehicleUsage,
          "VehicleTypeIvr": this.productItem.VehicleType,
          "ZoneCirculation": this.productItem.ZoneCirculation,
          "Scenarios": {
            "ExchangeRateScenario": {
              "OldAcccessoriesSumInsured": this.vehicleDetails.OldAcccessoriesSumInsured,
              "OldCurrency": this.vehicleDetails.OldCurrency,
              "OldExchangeRate": this.vehicleDetails.OldExchangeRate,
              "OldSumInsured": this.vehicleDetails.OldSumInsured,
              "OldTppdIncreaeLimit": this.vehicleDetails.OldTppdIncreaeLimit,
              "OldWindScreenSumInsured": this.vehicleDetails.OldWindScreenSumInsured
            }
          }
        }
        if(this.insuranceId=='100042'){
          ReqObj['Class']=this.productItem.Class
        }
        
        ReqObj['FleetOwnerYn'] = "N";
        // if(this.PurchaseDate!=null){
        //   ReqObj['PurchaseDate'] = this.datePipe.transform(this.PurchaseDate, "dd/MM/yyyy");
        // }
        // else{
        //   ReqObj['PurchaseDate'] = '';
        // }
        if (this.endorsementSection) {
          if (this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y' || (this.vehicleDetails?.Status == 'RP' && !this.adminSection)) {
            ReqObj['Status'] = 'E';
          }
          else {
            ReqObj['Status'] = this.vehicleDetails?.Status;
          }
          ReqObj['PolicyNo'] = this.endorsePolicyNo
        }
        else {
          ReqObj['Status'] = 'Y';
        }
        if (this.insuranceId == '100020' || this.insuranceId == '100028') {
          let dob = null, licenseDate = null, quoteNo = null;
          if (this.licenseIssuedDate != null && this.licenseIssuedDate != '' && this.licenseIssuedDate != undefined) {
            licenseDate = this.datePipe.transform(this.licenseIssuedDate, "dd/MM/yyyy");
          }
          if (this.driverDob != null && this.driverDob != '' && this.driverDob != undefined) {
            if ((String(this.driverDob)).includes('/')) dob = this.driverDob;
            else dob = this.datePipe.transform(this.driverDob, 'dd/MM/yyyy');
          }
          if (sessionStorage.getItem('quoteNo')) quoteNo = sessionStorage.getItem('quoteNo');
          let areaGroup = null;
          if (this.subUrbanCode != null && this.subUrbanCode != '' && this.subUrbanCode != undefined) {
            areaGroup = this.districtList.find(ele => ele.Code == this.subUrbanCode)?.AreaGroup;
          }
          if (this.insuranceId == '100028') { this.stateValue = null; this.cityCode = null; this.subUrbanCode = null; areaGroup = null; }
          if (this.productItem.InsurancetypeDesc == undefined) {
            let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
            for (let field of fieldList) {
              if (field.key == 'InsuranceType' && this.insuranceId != '100004') {
                let list = field.props.options;
                let entry = list.find(ele => ele.value == this.productItem.InsuranceType);

                console.log("Optionsssssssssss", field.props.options)
                if (entry) this.productItem.InsurancetypeDesc = entry.label;
              }
            }
          }
          if (this.productItem.InsuranceClassDesc == undefined) {
            let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
            for (let field of fieldList) {
              if (field.key == 'InsuranceClass' && this.insuranceId != '100027' && this.insuranceId != '100028') {
                let list = field.props.options;
                let entry = list.find(ele => ele.value == this.productItem.InsuranceClass);
                if (entry) this.productItem.InsuranceClassDesc = entry.label;
              }
              else if (field.key == 'InsuranceType' && (this.insuranceId == '100027' || this.insuranceId == '100028')) {
                let list = field.props.options;
                let entry = list.find(ele => ele.value == this.productItem.InsuranceType);
                if (entry) this.productItem.InsuranceClassDesc = entry.label;
              }
            }
          }
          ReqObj['DriverDetails'] = {
            'DriverName': this.driverName,
            'DriverType': this.driverType,
            'Gender': this.gender,
            'LicenseNo': this.licenseNo,
            'MaritalStatus': this.martialStatus,
            'CountryId': this.countryId,
            'StateId': this.stateValue,
            'CityId': this.cityCode,
            'AreaGroup': areaGroup,
            "SuburbId": this.subUrbanCode,
            'DriverExperience': this.driveExperience,
            "CreatedBy": createdBy,
            "DriverDob": dob,
            "QuoteNo": quoteNo,
            "RequestReferenceNo": this.quoteRefNo,
            "RiskId": this.vehicleId,
            "InsuranceId": this.insuranceId,
            "EndorsementYn": this.endorsementYn,
            "EndorsementDate": this.endorsementDate,
            "EndorsementEffectiveDate": this.endorsementEffectiveDate,
            "EndorsementRemarks": this.endorsementRemarks,
            "EndorsementType": this.endorsementType,
            "EndorsementTypeDesc": this.endorsementTypeDesc,
            "EndtCategoryDesc": this.endtCategoryDesc,
            "EndtCount": this.endtCount,
            "EndtPrevPolicyNo": this.endtPrevPolicyNo,
            "EndtPrevQuoteNo": this.endtPrevQuoteNo,
            "EndtStatus": this.endtStatus,
            "IsFinanceEndt": this.isFinanceEndt,
            "OrginalPolicyNo": this.orginalPolicyNo,
            "VehicleValueType": this.productItem.VehicleValue,
            "Inflation": this.productItem.Inflation,
            "Ncb": "0",
            "DefenceValue": this.productItem.DefenceCost,
            "PurchaseDate": this.productItem.PurchaseDate,
            "RegistrationDate": this.vehicleDetails?.RegistrationDate,
            "ExcessLimit": null,
            "Deductibles": deductibles,
            "Mileage": this.productItem.Mileage,
            "NoOfClaimYears": this.productItem.NoOfClaimYears,
            "NoOfPassengers": this.productItem.NoOfPassengers,
          }
        }

        else ReqObj['DriverDetails'] = null;
        if (this.insuranceId == '100019') ReqObj['CarAlarmYn'] = this.productItem.CarAlarmYN;
        if (this.insuranceId == '100020') ReqObj['VehicleClass'] = this.productItem.VehicleClass
        //  if(this.insuranceId=='100040' || this.insuranceId=='100042'){
        //   let dob,dob1,dob2,dob3 = null,licenseDate=null,quoteNo = null;
        //   if(this.licenseIssuedDate!=null && this.licenseIssuedDate!='' && this.licenseIssuedDate!=undefined){
        //     licenseDate = this.datePipe.transform(this.licenseIssuedDate, "dd/MM/yyyy");
        //   }
        //   if(this.driverDob!=null && this.driverDob!='' && this.driverDob!=undefined){
        //    if((String(this.driverDob)).includes('/')) dob = this.driverDob;
        //     else dob = this.datePipe.transform(this.driverDob,'dd/MM/yyyy');
        //   }
        //   if((String(this.CategoryExDate)).includes('/')) dob1 = this.CategoryExDate
        //     else dob1 = this.datePipe.transform(this.CategoryExDate,'dd/MM/yyyy');
        //     if((String(this.CategoryDate)).includes('/')) dob2 = this.CategoryDate;
        //     else dob2 = this.datePipe.transform(this.CategoryDate,'dd/MM/yyyy');
        //     if((String(this.LicenseIssueDt)).includes('/')) dob3 = this.LicenseIssueDt;
        //     else dob3 = this.datePipe.transform(this.LicenseIssueDt,'dd/MM/yyyy');
        //   ReqObj['DriverDetails'] ={
        //     'DriverName':this.driverName,
        //     "DrivingLicensingAge":this.DrivingLicensingAge,
        //   }
        // }
        let urlLink = `${this.motorApiUrl}api/savemotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let res: any = data;
            if (data.ErrorMessage.length != 0) {
              if (res.ErrorMessage) {
              }
            }
            else {
              if (data.Result?.length != 0) {
                this.currentIndex = Number(this.vehicleId);
                let entry = this.vehicleDetailsList.find(ele => ele.Vehicleid == this.vehicleId);
                entry['PolicyEndDate'] = endDate;
                entry['PolicyStartDate'] = startDate;
                this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo', data?.Result[0]?.RequestReferenceNo);
                let i = 0; this.individualCalcIndex = 0;
                for (let veh of data.Result) {
                  if (type == 'proceedSave') {

                    if(this.uwQuestionList.length!=0){
                      let j = 0;
                      let uwList:any[]=new Array();
                      for(let ques of this.uwQuestionList){
                        ques['BranchCode'] = this.branchCode;
                        let createdBy="";
                          let quoteStatus = sessionStorage.getItem('QuoteStatus');
                          if(quoteStatus=='AdminRP'){
                              createdBy = this.vehicleDetailsList[0].CreatedBy;
                          }
                          else{
                            createdBy = this.loginId;
                          }
                          let status = null,loading = null;
                          if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                            let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
                            console.log("Found Obj",ques,obj)
                            if(obj){
                              loading = obj.LoadingPercent
                              if(obj.ReferralYn=='Y') status = 'R';
                              else status = 'Y';
                            }
                            else status = 'Y';
                          }
                          else status = ques.Status;
                          let entry = {
                            "InsuranceId": this.insuranceId,
                            "ProductId": this.productId,
                            "UwQuestionId": ques.UwQuestionId,
                            "UwQuestionDesc": ques.UwQuestionDesc,
                            "QuestionType": ques.QuestionType,
                            "EffectiveDateStart": ques.EffectiveDateStart,
                            "Status": status,
                            "LoadingPercent": loading,
                            "MandatoryYn": ques.MandatoryYn,
                            "DataType": ques.DataType,
                            "CreatedBy": createdBy,
                            "UpdatedBy":  this.loginId,
                            "Value": ques.Value,
                            "BranchCode": this.branchCode,
                            "RequestReferenceNo": this.quoteRefNo,
                            "VehicleId": this.vehicleId
                          }
                          entry['MSRefNo'] = data?.Result[0].MSRefNo;
                          entry['VdRefNo'] = data?.Result[0].VdRefNo;
                          entry['CdRefNo'] = data?.Result[0].CdRefNo;
                          entry['Active'] = true;
                          entry['VehicleId'] = data.Result[0].VehicleId;
                        if (this.insuranceId == "100040" || this.insuranceId == '100042') veh['SectionId'] = sectionId[0];
                          uwList.push(entry);
                        j+=1;
                        if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,entry,type,this.currentIndex-1);
                      }
                    }
                    else {
                      if (this.finalizeYN != 'Y') {
                        entry['MSRefNo'] = data?.Result[0].MSRefNo;
                        entry['VdRefNo'] = data?.Result[0].VdRefNo;
                        entry['CdRefNo'] = data?.Result[0].CdRefNo;
                        entry['Active'] = true;
                        entry['VehicleId'] = data.Result[0].VehicleId;
                        if (this.insuranceId == "100040" || this.insuranceId == '100042') veh['SectionId'] = sectionId[0];
                        this.onCalculateVehDetails(veh, type, i, data.Result.length, sectionId.length);
                        i += 1;
                        //this.getCalculationDetails(veh,type,this.currentIndex-1,'proceedSave');
                      }
                      else {
                        if (type == 'save') {
  
                        }
                        else if (type == 'proceedSave') {
  
                          this.onFinalProceed();
                        }
                        else if (type == 'finalProceed') {
                          if (this.currentIndex - 1 == this.vehicleDetailsList.length) {
                            if (this.insuranceId == '100002' && this.vehicleDetailsList.length > 1) this.saveFleetDetails();
                            else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
                          }
                        }
                        else {
                          if (type == null) {
  
                            if (this.currentIndex - 1 == this.vehicleDetailsList.length) this.onFinalProceed();
                          }
  
  
                        }
                      }
                    }
                   
                  }
                  else {
                    entry['MSRefNo'] = data?.Result[0].MSRefNo;
                    entry['VdRefNo'] = data?.Result[0].VdRefNo;
                    entry['CdRefNo'] = data?.Result[0].CdRefNo;
                    entry['Active'] = true;
                    entry['VehicleId'] = data.Result[0].VehicleId;
                    this.onCalculateVehDetails(veh, type, i, data.Result.length, insuranceType.length)
                    i += 1;
                  }
                }
              }
              // else if(data.Result){
              //     let entry = this.vehicleDetailsList[this.currentIndex-1];
              //     entry['PolicyEndDate'] = endDate;
              //     entry['PolicyStartDate'] = startDate;

              //     entry['InsuranceType'] = data?.Result?.SectionId;
              //     entry['MSRefNo'] = data?.Result?.MSRefNo;
              //     entry['VdRefNo'] = data?.Result?.VdRefNo;
              //     entry['CdRefNo'] = data?.Result?.CdRefNo;
              //     entry['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
              //     entry['Active'] = true;
              //     entry['VehicleId'] = data.Result?.VehicleId;
              //     if(this.currentIndex<this.vehicleDetailsList.length){
              //       this.collateralYN = "N";
              //       //sessionStorage.setItem('loadingType','load');
              //       this.currentIndex = this.currentIndex+1;
              //         if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
              //           if(this.endorsementSection && this.enableAddVehicle){
              //             if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
              //               if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
              //               else{ this.enableFieldsSection = false; }
              //             }
              //             else this.enableFieldsSection = false;
              //           } 
              //           this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
              //           this.getEditVehicleDetails(this.vehicleId,'direct');
              //           this.vehicleDetailsList.length = this.vehicleDetailsList.length;
              //         }
              //         else{
              //           this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
              //           if(this.endorsementSection && this.enableAddVehicle){
              //             if(this.vehicleDetails?.EndorsementYn){
              //               if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
              //               else this.enableFieldsSection = false;
              //             }
              //           } 
              //           this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
              //           this.vehicleDetailsList.length = this.vehicleDetailsList.length;
              //           this.setVehicleValues('direct');
              //           //this.currencyValue = this.vehicleDetailsList[this.currentIndex-1].Currency;
              //           //this.onCurrencyChange();
              //         }
              //     }
              //     else{
              //         if(this.currentIndex-1==this.vehicleDetailsList.length) this.onFinalProceed();
              //     }
              //     this.quoteRefNo = data?.Result?.RequestReferenceNo;
              //     sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);

              //     if(type=='proceedSave'){

              //       if(this.uwQuestionList.length!=0 && this.changeUwSection){
              //         let j = 0;
              //         let uwList:any[]=new Array();
              //         for(let ques of this.uwQuestionList){
              //           ques['BranchCode'] = this.branchCode;
              //           let createdBy="";
              //             let quoteStatus = sessionStorage.getItem('QuoteStatus');
              //             if(quoteStatus=='AdminRP'){
              //                 createdBy = this.vehicleDetailsList[0].CreatedBy;
              //             }
              //             else{
              //               createdBy = this.loginId;
              //             }
              //             let status = null,loading = null;
              //             if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
              //               let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
              //               console.log("Found Obj",ques,obj)
              //               if(obj){
              //                 loading = obj.LoadingPercent
              //                 if(obj.ReferralYn=='Y') status = 'R';
              //                 else status = 'Y';
              //               }
              //               else status = 'Y';
              //             }
              //             else status = ques.Status;
              //             let entry = {
              //               "InsuranceId": this.insuranceId,
              //               "ProductId": this.productId,
              //               "UwQuestionId": ques.UwQuestionId,
              //               "UwQuestionDesc": ques.UwQuestionDesc,
              //               "QuestionType": ques.QuestionType,
              //               "EffectiveDateStart": ques.EffectiveDateStart,
              //               "Status": status,
              //               "LoadingPercent": loading,
              //               "MandatoryYn": ques.MandatoryYn,
              //               "DataType": ques.DataType,
              //               "CreatedBy": createdBy,
              //               "UpdatedBy":  this.loginId,
              //               "Value": ques.Value,
              //               "BranchCode": this.branchCode,
              //               "RequestReferenceNo": this.quoteRefNo,
              //               "VehicleId": this.vehicleId
              //             }
              //             uwList.push(entry);
              //           j+=1;
              //           if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,entry,type,this.currentIndex-1);
              //         }
              //       }
              //       else if(this.finalizeYN!='Y'){
              //         this.getCalculationDetails(entry,type,this.currentIndex-1,'proceedSave');
              //       }
              //       else{
              //         if(type=='save'){

              //         }
              //         else if(type=='proceedSave'){

              //           this.onFinalProceed();
              //         }
              //         else if(type=='finalProceed'){
              //           if(this.currentIndex-1==this.vehicleDetailsList.length) this.router.navigate(['/quotation/plan/premium-details']);
              //         }
              //         else{
              //           if(type==null){
              //             if(this.currentIndex-1==this.vehicleDetailsList.length) this.onFinalProceed();
              //           }


              //         }
              //       }
              //     }
              //     else this.getCalculationDetails(entry,type,null,'proceedSave');
              //   }

            }
          },
          (err) => { },
        );
      }
    }
    else {
      if (this.currentIndex < this.vehicleDetailsList.length) {
        this.collateralYN = "N";
        this.currentIndex = this.currentIndex + 1;
        if (this.vehicleDetailsList[this.currentIndex - 1]?.Active == true) {
          if (this.endorsementSection && this.enableAddVehicle) {
            if (this.vehicleDetailsList[this.currentIndex - 1]?.EndorsementYn) {
              if (this.vehicleDetailsList[this.currentIndex - 1].EndorsementYn == 'Y') { this.enableFieldsSection = true; }
              else { this.enableFieldsSection = false; }
            }
            else this.enableFieldsSection = false;
          }
          this.vehicleId = String(this.vehicleDetailsList[this.currentIndex - 1].Vehicleid);
          this.getEditVehicleDetails(this.vehicleId, 'direct');
          this.vehicleDetailsList.length = this.vehicleDetailsList.length;
        }
        else {

          this.vehicleDetails = this.vehicleDetailsList[this.currentIndex - 1];
          if (this.endorsementSection && this.enableAddVehicle) {
            if (this.vehicleDetails?.EndorsementYn) {
              if (this.vehicleDetails.EndorsementYn == 'Y') this.enableFieldsSection = true;
              else this.enableFieldsSection = false;
            }
          }
          this.vehicleDetails = this.vehicleDetailsList[this.currentIndex - 1];
          this.vehicleDetailsList.length = this.vehicleDetailsList.length;
          this.setVehicleValues('direct');
        }
      }
      else {
        this.onFinalProceed();
      }
    }
  }
  saveFleetDetails() {
    let Reqobj = {
      "RequestReferenceNo": this.quoteRefNo,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.motorApiUrl}api/savefleetdetails`;
    this.sharedService.onPostMethodSync(urlLink, Reqobj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.getFleetCalc(data.Result);

        }
      })
  }
  getFleetCalc(res) {
    let startDate = "", endDate = ""
    //this.updateComponent.vehicleDetails = this.vehicleDetails;
    if (this.policyStartDate) {
      let veh = this.vehicleDetailsList[0];
      if (this.endorsementSection && veh.Status == 'D') {
        startDate = veh.PolicyStartDate;
        const oneday = 24 * 60 * 60 * 1000;
        const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
        const formattedDate = moment(momentDate).format("YYYY-MM-DD");
        const formattedDatecurrent = new Date(veh.PolicyStartDate);
        console.log(formattedDate);
        this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
      }
      else {
        if (String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
        else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
        const oneday = 24 * 60 * 60 * 1000;
        const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
        const formattedDate = moment(momentDate).format("YYYY-MM-DD");
        const formattedDatecurrent = new Date(this.policyStartDate);
        console.log(formattedDate);
        this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
      }
    }
    if (this.policyEndDate) {
      if (this.endorsementSection && this.enableRemoveVehicle) {
        endDate = this.endorseEffectiveDate;
      }
      // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
      //   coverModificationYN = 'N';
      // }
      else {
        if (String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
        else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      }
    }
    let effectiveDate = null;
    if (this.endorsementSection) {
      effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if (this.policyStartDate) {
        if (String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
        else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "SectionId": res?.SectionId,
      "ProductId": this.productId,
      "MSRefNo": res?.MSRefNo,
      "VehicleId": res?.VehicleId,
      "CdRefNo": res?.CdRefNo,
      "DdRefNo": res?.DdRefNo,
      "VdRefNo": res?.VdRefNo,
      "CreatedBy": res?.CreatedBy,
      "productId": this.productId,
      "sectionId": res?.SectionId,
      "RequestReferenceNo": this.quoteRefNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": endDate,
      "CoverModification": "N",
      "PDRefNo": res?.PDRefNo
    }
    let urlLink = `${this.CommonApiUrl}calculator/policy/calc`;
    if (this.insuranceId != '100028' && this.insuranceId != '100027' && this.insuranceId != '100040' && this.insuranceId != '100042' && this.insuranceId != '100019') {
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.CoverList) {
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        });
    }
    else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    // 
  }
  onCalculateVehDetails(vehicleDetails, type, entry, totalCount, sectionCount) {
    console.log(vehicleDetails, "vehicleDetails");

    let createdBy = "";
    let coverModificationYN = 'N';
    if (this.endorsementSection) {
      // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
      // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
      // else coverModificationYN = 'N';
      if (this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
    }
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP') {
      createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
    }

    let endDate: any = null;
    if (this.endorsementSection && vehicleDetails?.Status == 'D') {
      coverModificationYN = 'Y';
      endDate = this.endorseEffectiveDate;
    }
    // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
    //   coverModificationYN = 'N';
    // }
    else {
      if (this.policyEndDate) {
        if (String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
        else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      }
    }
    let effectiveDate = null;
    if (this.endorsementSection) {
      effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if (this.policyStartDate) {
        if (String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
        else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
    }
    let locationId = '1';
    if (vehicleDetails.LocationId) locationId = vehicleDetails.LocationId
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "SectionId": vehicleDetails.SectionId,
      "ProductId": this.productId,
      "MSRefNo": vehicleDetails?.MSRefNo,
      "VehicleId": vehicleDetails?.VehicleId,
      "CdRefNo": vehicleDetails?.CdRefNo,
      "DdRefNo": vehicleDetails?.DdRefNo,
      "VdRefNo": vehicleDetails?.VdRefNo,
      "LocationId": locationId,
      "CreatedBy": createdBy,
      "productId": this.productId,
      //"sectionId": vehicleDetails?.SectionId,
      "RequestReferenceNo": this.quoteRefNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": endDate,
      "CoverModification": coverModificationYN
    }
    let urlLink = `${this.CommonApiUrl}calculator/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.individualCalcIndex += 1;
        if (this.individualCalcIndex == totalCount) {
          if (type == 'ProceedSave') {

            console.log('Vehicle Details', this.vehicleDetailsList);
            this.onFinalProceed();
          }
          else if (this.currentIndex < this.vehicleDetailsList.length) {
            this.collateralYN = "N";
            this.currentIndex = this.currentIndex + 1;
            //this.finalSection = false;
            if (this.vehicleDetailsList[this.currentIndex - 1]?.Active == true) {
              if (this.endorsementSection && this.enableAddVehicle) {
                if (this.vehicleDetailsList[this.currentIndex - 1]?.EndorsementYn) {
                  if (this.vehicleDetailsList[this.currentIndex - 1].EndorsementYn == 'Y') { this.enableFieldsSection = true; }
                  else { this.enableFieldsSection = false; }
                }
                else this.enableFieldsSection = false;
              }
              this.vehicleId = String(this.vehicleDetailsList[this.currentIndex - 1].Vehicleid);
              this.productItem = new ProductData();
              this.driverName = null; this.driverType = '1'; this.gender = 'M'; this.licenseNo = null;
              this.driverDob = null; this.stateValue = null; this.cityCode = null; this.subUrbanCode = null;
              this.claimTypeValue = null;
              if (this.vehicleDetailsList.length != this.tabIndex) this.tabIndex += 1;
              this.getEditVehicleDetails(this.vehicleId, 'direct');
              //this.totalCount = this.vehicleDetailsList.length;
              $('#slider_0').removeClass('active w3-animate-left');
              $('#slider_0').removeClass('active w3-animate-right');
              $('#slider_0').addClass('active w3-animate-right');
            }
            else {
              this.vehicleDetails = this.vehicleDetailsList[this.currentIndex - 1];
              if (this.endorsementSection && this.enableAddVehicle) {
                if (this.vehicleDetails?.EndorsementYn) {
                  if (this.vehicleDetails.EndorsementYn == 'Y') this.enableFieldsSection = true;
                  else this.enableFieldsSection = false;
                }
              }
              this.motorDetails = this.vehicleDetailsList[this.currentIndex - 1];
              //this.totalCount = this.vehicleDetailsList.length;
              console.log("Motor Details", this.motorDetails);
              this.setVehicleValues('direct');
              $('#slider_0').removeClass('active w3-animate-left');
              $('#slider_0').removeClass('active w3-animate-right');
              $('#slider_0').addClass('active w3-animate-right');
            }
          }
          else {
            this.onFinalProceed();
          }
        }
      });
  }
  getEditVehicleDetails(vehicleId, type) {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": this.customerDetails?.IdNumber,
      "Vehicleid": vehicleId
    }
    let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.productItem = new ProductData();
          this.driverName = null; this.driverDob = null; this.licenseNo = null; this.martialStatus = null;
          this.gender = 'M'; this.stateValue = null; this.cityCode = null; this.subUrbanCode = null; this.driveExperience = null;
          this.driveExperience = null; this.licenseIssuedDate = null;
          this.vehicleDetails = data.Result;
          this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
          this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
          this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
          this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
          this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
          this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
          this.vehicleDetails['MunicipalityofTraffic'] = data?.Result.MunicipalityTraffic;
          this.vehicleDetails['Transportationofhydrocarbons'] = data?.Result.TransportHydro;
          this.vehicleDetails['DriverName'] = data?.Result.DriverDetails.DriverName;
          this.vehicleDetails['DrivingLicensingAge'] = data?.Result.DriverDetails.DrivingLicensingAge;
          this.vehicleDetails['DateOfCirculation'] = data?.Result.DateOfCirculation;
          this.vehicleDetails['InsuranceClass'] = data?.Result.InsuranceClass;
          this.vehicleDetails['NoOfClaimYears'] = data?.Result.NoOfClaimYears;
          this.vehicleDetails['NoOfPassengers'] = data?.Result.NoOfPassengers;
          this.vehicleDetails['NewValue'] = data?.Result.NewValue;
          this.vehicleDetails['PaCoverId'] = data?.Result.PaCoverId;
          this.vehicleDetails['BankingDelegation'] = data?.Result.BankingDelegation;
          this.vehicleDetails['LoanStartDate'] = data?.Result.LoanStartDate;
          this.vehicleDetails['LoanEndDate'] = data?.Result.LoanEndDate;
          this.vehicleDetails['CollateralCompanyAddress'] = data?.Result.CollateralCompanyAddress;
          this.vehicleDetails['CollateralCompanyName'] = data?.Result.CollateralCompanyName;
          this.vehicleDetails['LoanAmount'] = data?.Result.LoanAmount;
          this.vehicleDetails['UsageId'] = data?.Result.UsageId;
          this.vehicleDetails['VehicleTypeIvr'] = data?.Result.VehicleTypeIvr;
          this.vehicleDetails['ZoneCirculation'] = data?.Result.ZoneCirculation;
          this.vehicleDetails['Zone'] = data?.Result.Zone;
          this.vehicleDetails['Class'] = data?.Result.Class;
          if (this.vehicleDetails.SourceTypeId != null && (this.Code == null || this.Code == '' || this.Code == undefined)) {
            this.Code = this.vehicleDetails?.SourceTypeId;
            this.customerCode = this.vehicleDetails?.CustomerCode;
            this.branchCode = this.vehicleDetails.BranchCode;
            this.brokerCode = this.vehicleDetails.BrokerCode;
            this.brokerBranchCode = this.vehicleDetails.BrokerBranchCode;
            this.onSourceTypeChange('direct');
          }
          //this.updateComponent.vehicleDetails = this.vehicleDetails;
          if (this.insuranceId == '100020' || this.insuranceId == '100028') {
            //this.getDriverDetails(type,this.vehicleDetails);
            let entry = this.vehicleDetails.DriverDetails;
            if (entry) {
              this.driverName = entry?.DriverName;
              if (entry?.DriverType) this.driverType = entry?.DriverType;
              else this.driverType = '1';
              this.licenseNo = entry?.LicenseNo;
              if (entry.Gender) this.gender = entry?.Gender;
              else this.gender = 'M';
              this.martialStatus = entry?.MaritalStatus;
              this.stateValue = entry?.StateId;
              this.getDistrictList('direct', entry?.CityId, entry?.SuburbId);
              if (this.insuranceId == '100040' || this.insuranceId == '100042') this.onchangevehicleValue(null);
              this.driveExperience = entry?.DriverExperience;
              if (entry?.LicenseIssueDt) {
                let dateList = entry?.LicenseIssueDt.split('/');
                if (dateList.length > 1) this.licenseIssuedDate = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
              }
              if (entry?.DriverDob) {
                this.driverDob = entry?.DriverDob;
                // let dateList = entry?.DriverDob.split('/');
                // if(dateList.length>1) this.driverDob = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
              }
              if (type != 'save') {

                this.setVehicleValues('edit');
              }
              else {
                this.onFormSubmit('save');
              }
            }
            else {
              this.driverName = null; this.driverDob = null; this.licenseNo = null; this.martialStatus = null;
              this.gender = 'M'; this.stateValue = null; this.cityCode = null; this.subUrbanCode = null;
              this.driveExperience = null; this.licenseIssuedDate = null;
              if (type != 'save') {
                this.setVehicleValues('edit');
              }
              else {
                this.onFormSubmit('save');
              }
            }
          }
          else {
            if (type != 'save') {
              this.setVehicleValues('edit');
            }
            else {
              this.onFormSubmit('save');
            }
          }

        }
      },
      (err) => { },
    );
  }
  setVehicleValues(type) {
    this.getBorrowerList();
    this.getBankList();
    this.getCityLimitList();
    if (this.insuranceId == '100020' || this.insuranceId == '100028') {
      if (this.insuranceId == '100020') this.getVehicleClassList();
      this.getMartialList();
      this.getStateList();
      if (this.insuranceId == '100028') this.getClaimTypeList();
    }
    this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
    this.motorUsageValue = this.vehicleDetails.Motorusage;
    this.vehicleId = String(this.vehicleDetails?.Vehicleid);
    console.log("Vehicle Id Setted", this.vehicleId);
    sessionStorage.setItem('vehicleId', this.vehicleId);
    console.log("this.vehicleId" + this.vehicleId);

    this.endorsementYn = this.vehicleDetails?.EndorsementYn;
    this.productItem = new ProductData();
    this.fields = [];
    let fireData: any = null;
    if (this.insuranceId == '100027' || this.insuranceId == '100044' || this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100002' || this.insuranceId == '100028' || this.insuranceId == '100018' || this.insuranceId == '100019' || this.insuranceId == '100020' || this.insuranceId == '100004') {
      if (this.insuranceId == '100027') fireData = new MotorVehicleSanlam();
      else if (this.insuranceId == '100040') { fireData = new MotorVehicleSanlamIvory(); }
      else if (this.insuranceId == '100042') { fireData = new MotorVehicleSanlamBurkina(); }
      else if (this.insuranceId == '100002') { fireData = new MotorVehicleTanzaniya(); this.getInsuranceClassList() }
      else if (this.insuranceId == '100028') { fireData = new MotorVehicleEagle(); }
      else if (this.insuranceId == '100044') { fireData = new MotorVehicleSaudiarabia(); this.getInsuranceClassList() }
      else if (this.insuranceId == '100018') { fireData = new MotorVehicleOromia(); this.getInsuranceClassList() }
      else if (this.insuranceId == '100019') { fireData = new MotorVehicleUganda(); this.getInsuranceClassList() }
      else if (this.insuranceId == '100004') { fireData = new MotorVehicleMadison(); this.getInsuranceClassList() }
      else if (this.insuranceId == '100020') { fireData = new MotorVehicleKenya(); this.getInsuranceClassList(); this.getVehicleClassList() }
      this.fields[0] = fireData?.fields;
      console.log(this.fields[0].fieldGroup[0].fieldGroup, "this.fields[0].fieldGroup[0].fieldGroup")
      if (this.insuranceId == '100040' || this.insuranceId == '100042') {
        let InsuranceHooks = {
          onInit: (field: FormlyFieldConfig) => {
            console.log('Field')
            field.form.controls['InsuranceType'].valueChanges.subscribe(() => {
              this.getInsuranceTypeListIvory();
            });
          }
        }
        // let changevehicleHooks ={ onInit: (field: FormlyFieldConfig) => {
        //   field.form.controls['VehicleValue'].valueChanges.subscribe(() => {
        //      this.onchangevehicleValue(null);
        //   });
        // } }
        let changevehicleHooks = {
          onInit: (field: FormlyFieldConfig) => {
            console.log("Field Details", field, this.productItem)
            field.form.controls['VehicleValue'].valueChanges.subscribe(() => {
              if (this.tabIndex != 0 && field.form) this.productItem.VehicleValue = field.form.controls['VehicleValue'].value
              this.onchangevehicleValue(null);
              // this.onChangeAggregated();
            });
            // field.props.onKeydown = (event: KeyboardEvent) => {
            //   console.log('Key pressed:', field.props);
            //   this.onchangevehicleValue(null);// Call your method on key press
            // };
          }
        };

        // let changeAggregatedHooks ={ onInit: (field: FormlyFieldConfig) => {
        //   field.form.controls['Aggregatedvalue'].valueChanges.subscribe(() => {
        //      this.onChangeAggregated();
        //   });
        // } }
        let changeAggregatedHooks = {
          onInit: (field: FormlyFieldConfig) => {
            // Check if the form and control are defined
            if (field.form && field.form.controls['Aggregatedvalue']) {
              // Subscribe to valueChanges
              field.form.controls['Aggregatedvalue'].valueChanges.subscribe(() => {
               // this.onChangeAggregated();
              });
            } else {
              console.warn('Aggregatedvalue control is not available.');
            }
          }
        };

        // let changeMarketValueHooks ={ onInit: (field: FormlyFieldConfig) => {
        //   field.form.controls['Marketvalue'].valueChanges.subscribe(() => {
        //      this.changeMarketValue();
        //   });
        // } }
        let changeMarketValueHooks = {
          // onInit: (field: FormlyFieldConfig) => {
          //   field.form.controls['Marketvalue'].valueChanges.subscribe(() => {
          //     this.changeMarketValue();
          //   });
          // let changeMarketValueHooks = {
          onInit: (field: FormlyFieldConfig) => {
            // Ensure the form and control are defined before accessing
            if (field.form && field.form.controls['Marketvalue']) {
              // Safely subscribe to valueChanges
              field.form.controls['Marketvalue'].valueChanges.subscribe(() => {
               // this.changeMarketValue();
              });
            } else {
              console.warn('Marketvalue control is not available.');
            }


            // Additional setup if needed
            field.props.onKeydown = (event: KeyboardEvent) => {
              console.log('Key pressed:', field.props);
              this.changeMarketValue(); // Call your method on key press
            };
          },
        };
        // this.fields[0].fieldGroup[0].fieldGroup[0].hooks = InsuranceHooks;
        // this.fields[0].fieldGroup[0].fieldGroup[4].hooks = changevehicleHooks;
        // this.fields[0].fieldGroup[0].fieldGroup[6].hooks = changeMarketValueHooks;
        //  this.fields[0].fieldGroup[0].fieldGroup[7].hooks = changeAggregatedHooks;


        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
        let m = 0;
        for (let field of fieldList) {
          if (field.key == 'InsuranceType') {
            field.hooks = InsuranceHooks;
          }
          if (field.key == 'VehicleValue') {
            field.hooks = changevehicleHooks;
          }
          if (field.key == 'Marketvalue') {
            field.hooks = changeMarketValueHooks;
            field.hideExpression = true; field.hide = true;
          }
           if (field.key == 'Aggregatedvalue') {
            field.hooks = changeAggregatedHooks;
            field.hideExpression = true; field.hide = true;
          }
        }
      }
      if (this.insuranceId == '100040' ) {
        this.getInsuranceTypeAltList();
        this.getMunicipalityTrafficList();
        this.getZoneCirculation();
        this.getVehicleType();
        this.getVehicleUsage();
        this.getPACoverId();
        this.getAggregatedList();
      }
      if(this.insuranceId =='100042'){
        this.getInsuranceTypeAltList();
        this.getMunicipalityTrafficList();
        this.getZone()
        this.getClass()
        this.getAggregatedList();
      }
      this.checkFieldNames();
      let regionHooks = {
        onInit: (field: FormlyFieldConfig) => {
          field.form.controls['InsuranceType'].valueChanges.subscribe(() => {
            this.getMotorTypeList('change', null, null);
            this.getMotorUsageList(null, 'change');
            this.getInsuranceTypeListIvory();
          });
        }
      }
      this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks;
      if (this.insuranceId == '100002' || this.insuranceId == '100044' || this.insuranceId == '100018' || this.insuranceId == '100019' || this.insuranceId == '100040' || this.insuranceId == '100042' || this.insuranceId == '100020' || this.insuranceId == '100004' || this.insuranceId == '100028') {
        let regionHooks2 = {
          onInit: (field: FormlyFieldConfig) => {
            field.form.controls['InsuranceClass'].valueChanges.subscribe(() => {

              this.onChangeInsuranceClass('change')
            });
          }
        }
        if (this.insuranceId == '100040' || this.insuranceId == '100042') {
          this.fields[0].fieldGroup[0].fieldGroup[1].hooks = regionHooks2;

        }

        if (this.insuranceId != '100004') {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.Key == 'InsuranceType' && this.insuranceId == '100028') {
              field.hooks = regionHooks2;
            }
            else if (field.key == 'InsuranceClass' && this.insuranceId != '100028') field.hooks = regionHooks2;
          }
        }
        else this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks2;
      }
      if (this.vehicleDetails?.Insurancetype != null && this.vehicleDetails?.Insurancetype != '') {
        if (Array.isArray(this.vehicleDetails?.Insurancetype)) {
          if (this.vehicleDetails?.Insurancetype.length != 0) this.productItem.InsuranceType = this.vehicleDetails.Insurancetype[0];
        }
        else { this.productItem.InsuranceType = this.vehicleDetails.Insurancetype; this.productItem.InsurancetypeDesc = this.vehicleDetails.InsurancetypeDesc; }
        // if(this.vehicleDetails?.Insurancetype.length!=0){
        //   this.productItem.InsuranceType = this.vehicleDetails?.Insurancetype;
        // }
      }
      if (this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100042') {
        this.getType1();
        this.getType2();
        this.getType3();
      }
      //this.productItem.InsuranceType = this.vehicleDetails?.Insurancetype;

      if (this.vehicleDetails?.InsuranceClass != null && this.vehicleDetails?.InsuranceClass != '' && (this.insuranceId == '100040' || this.insuranceId == '100042')) {

        this.productItem.InsuranceClass = Number(this.vehicleDetails.InsuranceClass);
      }
      else this.productItem.InsuranceClass = this.vehicleDetails?.InsuranceClass;
      this.getInsuranceTypeListIvory();
      if (this.insuranceId == '100002' || this.insuranceId == '100044' || this.insuranceId == '100018' || this.insuranceId == '100019' || this.insuranceId == '100020' || this.insuranceId == '100004' || this.insuranceId == '100028') { this.onChangeInsuranceClass('direct'); }
      this.productItem.ClaimType = this.vehicleDetails?.ClaimType;
      if (this.vehicleDetails?.CarAlarmYn != null && this.vehicleDetails?.CarAlarmYn != '') {
        this.productItem.CarAlarmYn = this.vehicleDetails?.CarAlarmYn;
      }
      else this.productItem.CarAlarmYN = 'N';
      this.productItem.BodyType = this.vehicleDetails?.VehicleType;
      if (this.vehicleDetails?.VehicleType == null || this.vehicleDetails?.VehicleType == '') {
        this.productItem.BodyType = this.vehicleDetails?.TiraBodyType;
      }
      this.productItem.Newvalue = this.vehicleDetails?.NewValue;
      this.productItem.TiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
      this.productItem.PurchaseDate = this.onDateFormatInEdit(this.vehicleDetails?.PurchaseDate);
      this.productItem.Deductibles = this.vehicleDetails?.Deductibles;
      this.productItem.VehicleValue = this.vehicleDetails?.VehicleValueType;

      this.productItem.Aggregatedvalue = String(this.vehicleDetails?.AggregatedValue);
      this.productItem.Marketvalue = this.vehicleDetails?.MarketValue;
      this.productItem.Inflation = this.vehicleDetails?.Inflation;
      this.productItem.Mileage = this.vehicleDetails?.Mileage;
      this.productItem.NoOfClaimYears = this.vehicleDetails?.NoOfClaimYears;
      this.productItem.NoOfPassengers = this.vehicleDetails?.NoOfPassengers;
      this.productItem.DefenceCost = this.vehicleDetails?.DefenceValue;
      this.productItem.HorsePower = this.vehicleDetails?.HorsePower;
      this.productItem.Nombredecartes = this.vehicleDetails.NumberOfCards;
      this.productItem.MunicipalityofTraffic = this.vehicleDetails.MunicipalityofTraffic;
      this.productItem.Transportationofhydrocarbons = this.vehicleDetails.Transportationofhydrocarbons;
      this.productItem.DateOfCirculation = this.vehicleDetails.DateOfCirculation;
      this.productItem.PACoverId = this.vehicleDetails?.PaCoverId;
      this.BankingDelegation = this.vehicleDetails?.BankingDelegation;
      this.LoanStartDate = this.vehicleDetails?.LoanStartDate;
      this.LoanEndDate = this.vehicleDetails?.LoanEndDate;
      this.CollateralCompanyAddress = this.vehicleDetails?.CollateralCompanyAddress;
      this.CollateralCompanyName = this.vehicleDetails?.CollateralCompanyName;
      this.LoanAmount = this.vehicleDetails.LoanAmount;
      this.productItem.VehicleUsage = this.vehicleDetails.UsageId;
      this.productItem.VehicleType = this.vehicleDetails.VehicleTypeIvr;
      this.productItem.ZoneCirculation = this.vehicleDetails.ZoneCirculation;
      this.productItem.Zone = this.vehicleDetails.Zone;
      this.productItem.Class = this.vehicleDetails.Class;
      this.DrivingLicensingAge = this.vehicleDetails.DrivingLicensingAge;
      this.driverName = this.vehicleDetails.DriverName;
      if (this.vehicleDetails?.PreviousLossRatio) this.productItem.PreviousLossRatio = this.vehicleDetails?.PreviousLossRatio;
      if (this.vehicleDetails?.PreviousInsuranceYN) this.productItem.PreviousInsuranceYN = this.vehicleDetails?.PreviousInsuranceYN;
      else this.productItem.PreviousInsuranceYN = 'N';
      if (this.vehicleDetails?.NcdYn) this.productItem.ClaimsYN = this.vehicleDetails?.NcdYn;
      else this.productItem.ClaimsYN = 'N';
      if (this.vehicleDetails?.PolicyRenewalYn) this.productItem.RenewalYn = this.vehicleDetails?.PolicyRenewalYn;
      else this.productItem.RenewalYn = 'N';
      if (this.vehicleDetails?.Gpstrackinginstalled) this.productItem.GpsYN = this.vehicleDetails?.Gpstrackinginstalled;
      else this.productItem.GpsYN = 'N';

      if (this.vehicleDetails?.CarAlarmYn) this.productItem.CarAlarmYN = this.vehicleDetails?.CarAlarmYn;
      else this.productItem.CarAlarmYN = 'N';

    }
    if (this.insuranceId != '100004' && this.insuranceId != '100040' && this.insuranceId != '100042') this.getInsuranceTypeList();
    else { this.getMotorUsageAltList(); }
    //if(this.insuranceId=='100027') this.getMotorTypeList('direct',null,null)

    this.motorUsageValue = this.vehicleDetails?.Motorusage;
    this.typeValue = this.vehicleDetails?.Insurancetype;
    this.classValue = this.vehicleDetails?.InsuranceClass;
    this.claimTypeValue = this.vehicleDetails?.ClaimType;
    if (this.vehicleDetails?.CarAlarmYn != null && this.vehicleDetails?.CarAlarmYn != '') this.alarmYN = this.vehicleDetails?.CarAlarmYn;
    if (this.endorsementSection) {
      if (this.vehicleDetails?.EndorsementDate) {
        this.endorsementDate = this.vehicleDetails?.EndorsementDate;
        this.endorsementEffectiveDate = this.vehicleDetails?.EndorsementEffectiveDate;
        this.endorsementRemarks = this.vehicleDetails?.EndorsementRemarks;
        this.endorsementType = this.vehicleDetails?.EndorsementType;
        this.endorsementTypeDesc = this.vehicleDetails?.EndorsementTypeDesc;
        this.endtCategoryDesc = this.vehicleDetails?.EndtCategoryDesc;
        this.endtCount = this.vehicleDetails?.EndtCount;
        this.endtPrevQuoteNo = this.vehicleDetails?.EndtPrevQuoteNo;
        this.endtStatus = this.vehicleDetails?.EndtStatus;
        this.endtPrevPolicyNo = this.vehicleDetails?.EndtPrevPolicyNo;
        this.isFinanceEndt = this.vehicleDetails?.IsFinanceEndt;
        this.orginalPolicyNo = this.vehicleDetails?.OrginalPolicyNo;
      }
      else {
        let entry = this.vehicleDetailsList.filter(ele => ele?.EndorsementDate != undefined)
        if (entry) {
          let details = entry[0];
          console.log("Filtered Endorsement Set", entry)
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsementRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategoryDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus; this.orginalPolicyNo = details?.OrginalPolicyNo;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo; this.isFinanceEndt = details?.IsFinanceEndt;
        }

      }
      if (this.enableAddVehicle) {
        if (this.vehicleDetails?.EndorsementYn == 'Y') {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          let i = 0;
          for (let field of fieldList) {
            if (field.props) field.props.disabled = false;
            else if (field.templateOptions) field.templateOptions.disabled = false;
            i += 1;
            if (i == fieldList.length) {

            }
          }
        }
        else {
          let i = 0;
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for (let field of fieldList) {
            if (field.props) field.props.disabled = true;
            else if (field.templateOptions) field.templateOptions.disabled = true;
            i += 1;
            if (i == fieldList.length) { this.onChangeInsuranceClass('direct') }
          }
        }
      }
    }
    else {
      this.endorsementDate = null;
      this.endorsementEffectiveDate = null;
      this.endorsementRemarks = null;
      this.endorsementType = null;
      this.endorsementTypeDesc = null;
      this.endtCategoryDesc = null;
      this.endtCount = null;
      this.endtPrevQuoteNo = null;
      this.endtStatus = null; this.orginalPolicyNo = null;
      this.endtPrevPolicyNo = null; this.isFinanceEndt = null;
    }
    if (this.insuranceId != '100004') { this.getMotorTypeList('direct', this.vehicleDetails?.VehicleType, this.vehicleDetails?.Motorusage); this.getMotorUsageList(this.vehicleDetails?.Motorusage, 'direct') }
    else { this.motorUsageValue = this.vehicleDetails?.Motorusage; this.productItem.MotorUsage = this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct'); }
    if (type == 'edit') {


      this.bodyTypeValue = this.vehicleDetails?.VehicleType;
      // if (this.vehicleDetails?.VehicleType == null || this.vehicleDetails?.VehicleType == '') {
      //   this.bodyTypeValue = this.vehicleDetails?.TiraBodyType;
      // }
      this.motorUsageValue = this.vehicleDetails?.Motorusage;
      this.productItem.MotorUsage = this.vehicleDetails?.Motorusage;
      this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;

      this.collateralYN = this.vehicleDetails?.CollateralYn;
      this.PurchaseDate = this.onDateFormatInEdit(this.vehicleDetails?.PurchaseDate);
      this.deductibleValue = this.vehicleDetails?.Deductibles;
      this.vehicleValue = this.vehicleDetails?.VehicleValueType;
      this.inflationValue = this.vehicleDetails?.Inflation;
      this.productItem.Mileage = this.vehicleDetails?.Mileage;
      this.productItem.NoOfClaimYears = this.vehicleDetails?.NoOfClaimYears;
      this.productItem.NoOfPassengers = this.vehicleDetails?.NoOfPassengers;
      this.defenceCostValue = this.vehicleDetails?.DefenceValue;
      if (this.collateralYN == 'Y') {
        this.collateralValue = true;
        this.collateralName = this.vehicleDetails?.CollateralName;
        this.firstLossPayee = this.vehicleDetails?.FirstLossPayee;
        this.borrowerValue = this.vehicleDetails?.BorrowerType;
      }
      else { this.collateralYN = 'N'; this.collateralValue = false; }
      if (this.vehicleDetails?.FleetOwnerYn) {
        if (this.fleetYN != '')
          this.fleetYN = this.vehicleDetails?.FleetOwnerYn;
        if (this.fleetYN == 'Y') {
          this.fleetValue = true;
          this.noOfVehicles = this.vehicleDetails?.NoOfVehicles;
          this.noOfCompPolicy = this.vehicleDetails?.NoOfComprehensives;
          this.claimRatio = this.vehicleDetails?.ClaimRatio
        }
      }
    }
    else {

    }
    this.cityValue = this.vehicleDetails?.CityLimit;
    if (this.policyStartDate == null || this.policyStartDate == '' || this.policyStartDate == undefined) {
      console.log("Vehicle Details on Edit", this.policyStartDate, this.vehicleDetails)
      if (this.vehicleDetails?.PolicyStartDate != null) {
        if (this.vehicleDetails.Status != 'D') {
          var dateParts = this.vehicleDetails?.PolicyStartDate.split("/");

          // month is 0-based, that's why we need dataParts[1] - 1
          this.policyStartDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        }
        if (this.vehicleDetails?.PolicyEndDate != null) {
          var dateParts = this.vehicleDetails?.PolicyEndDate.split("/");

          // month is 0-based, that's why we need dataParts[1] - 1
          this.policyEndDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
          this.onChangeEndDate();
        }
        console.log("Policy Start", this.policyStartDate)
        //this.policyStartDate = dateObject.toString()
      }

    }

    if (type == 'edit') {
      if (this.vehicleDetails?.NcdYn) this.claimsYN = this.vehicleDetails?.NcdYn;
      else this.claimsYN = 'N';
      if (this.vehicleDetails?.PolicyRenewalYn) this.productItem.RenewalYn = this.vehicleDetails?.PolicyRenewalYn;
      else this.productItem.RenewalYn = 'N';
      if (this.vehicleDetails?.Gpstrackinginstalled) this.gpsYn = this.vehicleDetails?.Gpstrackinginstalled;
      else this.gpsYn = 'N';
      if (this.vehicleDetails?.Gpstrackinginstalled) this.productItem.GpsYN = this.vehicleDetails?.Gpstrackinginstalled;
      else this.productItem.GpsYN = 'N';
      if (this.vehicleDetails?.CarAlarmYn) this.productItem.CarAlarmYN = this.vehicleDetails?.CarAlarmYn;
      else this.productItem.CarAlarmYN = 'N';
      this.VehicleSI = String(this.vehicleDetails?.SumInsured);
      this.CommaFormatted();
      this.WindShieldSI = String(this.vehicleDetails?.WindScreenSumInsured);
      this.WindSICommaFormatted();
      this.tppdSI = String(this.vehicleDetails?.TppdIncreaeLimit);
      this.TppdCommaFormatted();
      this.accessoriesSI = String(this.vehicleDetails?.AcccessoriesSumInsured);
      this.accessoriesCommaFormatted();
      this.motorDetails = this.vehicleDetails;
      this.productItem.MotorUsage = this.vehicleDetails?.Motorusage;
      //this.getVehicleDetails(this.vehicleDetails?.Registrationnumber,this.vehicleDetails?.SavedFrom);
    }
    if (this.insuranceId == '100020' || this.insuranceId == '100028') {
      this.vehicleClassValue = this.vehicleDetails?.VehicleClass;
      this.productItem.VehicleClass = this.vehicleDetails?.VehicleClass;
    }
    console.log(this.vehicleDetails,"this.vehicleDetailsthis.vehicleDetails");
    this.productItem.VehicleSI = this.vehicleDetails?.SumInsured;
    this.productItem.WindShieldSI = this.vehicleDetails?.WindScreenSumInsured;
    this.productItem.ExtendedTPPDSI = this.vehicleDetails?.TppdIncreaeLimit;
    this.productItem.AccessoriesSI = this.vehicleDetails?.AcccessoriesSumInsured;
    this.productItem.VehicleClass = this.vehicleDetails?.VehicleClass;
    if ((this.insuranceId == '100027' || this.insuranceId == '100040' || this.insuranceId == '100042') && this.tabIndex != 0) { this.onChangeInsuranceClass('direct'); this.onchangevehicleValue(this.vehicleDetails); }
    if(this.insuranceId == '100040'){
      if (this.vehicleDetails.AggregatedValue) this.onChangeAggregated();
      if (this.vehicleDetails.MarketValue) this.changeMarketValue();
    }
  }
  onchangevehicleValue(data) {
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for (let field of fieldList) {
      
      if (field.key == 'Marketvalue' || field.key == 'Aggregatedvalue' || field.key == 'VehicleSI') {
      if (this.productItem.VehicleValue == 1 || this.productItem.VehicleValue == '1') {
        if (field.key == 'Marketvalue'){
          if (data && field.formControl && field.key == 'Marketvalue') field.formControl.setValue(data.MarketValue)
            field.hideExpression = false; field.hide = false; 
        }
          if (field.key == 'Aggregatedvalue' || field.key == 'VehicleSI') {
            field.hideExpression = true; field.hide = true;
          }
        }
        // if(){

        // }
        else if (this.productItem.VehicleValue == 2 || this.productItem.VehicleValue == '2') {
          if (field.key == 'Aggregatedvalue') {
            if (data && field.formControl && field.key == 'Aggregatedvalue') field.formControl.setValue(data.AggregatedValue)
            field.hideExpression = false; field.hide = false;
            //this.getAggregatedList();
          }
          if (field.key == 'Marketvalue' || field.key == 'VehicleSI') {
            field.hideExpression = true; field.hide = true;
          }
        }
      }
     
      else {
        if (this.productItem.VehicleValue) {
          if (this.productItem.VehicleValue == '1') {
            if (field.key == 'Marketvalue') {
              field.hideExpression = false; field.hide = false;
            }
          }
          else {
            if (field.key == 'Aggregatedvalue' && (this.productItem.VehicleValue == '2' || this.productItem.VehicleValue == 2)) {
              //this.getAggregatedList();
              field.hideExpression = false; field.hide = false;
            }
          }
        }
        else if (field.key == 'Marketvalue' || field.key == 'Aggregatedvalue' || field.key == 'VehicleSI') {
          field.hideExpression = true; field.hide = true;
        }
      }


      // if (field.form && field.form.controls['Marketvalue']) {

      // }
      //  if(field.key =='Marketvalue' || field.key =='Aggregatedvalue' || field.key =='VehicleSI'){
      //   field.hideExpression = true;field.hide=true; 
      // }
    }
    console.log(fieldList, "fieldListfieldList");
  }
  onChangeInsuranceClass(type) {
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for (let field of fieldList) {
      
      if (this.insuranceId == '100004') {
        this.productItem.InsuranceType = this.productItem.InsuranceClass; this.classValue = this.productItem.InsuranceClass
      }
      if (field.key == 'InsuranceClass' && this.insuranceId == '100004') {
        let list = field.props.options;
        let entry = list.find(ele => ele.value == this.productItem.InsuranceClass);
        if (entry) { this.productItem.InsurancetypeDesc = entry.label; this.productItem.InsuranceClassDesc = entry.label; }
      }
      if (field.key == 'GpsYN' || field.key == 'CarAlarmYN') {
        if (this.productItem.InsuranceClass != '' && this.productItem.InsuranceClass != null && this.productItem.InsuranceClass != undefined) {
          if (this.productItem.InsuranceClass == '1') {
            field.hideExpression = false; field.hide = false;
            if (this.productItem.GpsYN == null || this.productItem.GpsYN == '') this.productItem.GpsYN = 'N';
            if (this.productItem.CarAlarmYN == null || this.productItem.CarAlarmYN == '') this.productItem.CarAlarmYN = 'N';
          }
          else {
            field.hideExpression = true; field.hide = true;
            if (this.productItem) {
              this.productItem.GpsYN = 'N';
              this.productItem.CarAlarmYN = 'N';
            }
          }
        }
      }
      if (field.key == 'InsuranceType' && (this.insuranceId == '100028' || this.insuranceId == '100027') && this.vehicleDetailsList.length == 1) {
        field.hideExpression = true; field.hide = true;
      }
      if (this.insuranceId == '100040' || this.insuranceId == '100042') {
        if (field.key == 'VehicleSI' || field.key == 'GpsYN' || field.key == 'Aggregatedvalue' || field.key == 'Newvalue' || field.key == 'Marketvalue' || field.key == 'AccessoriesSI' || field.key == 'ExtendedTPPDSI' || field.key == 'Inflation' || field.key == 'VehicleValue' ||  (field.key == 'PurchaseDate' && this.insuranceId == '100042')) {
          if ((this.insuranceId == '100040' && this.productItem.InsuranceClass != '121' && this.productItem.InsuranceClass != '122') && (this.insuranceId == '100040' && this.productItem.InsuranceClass != '129' && this.productItem.InsuranceClass != '131') && (this.insuranceId == '100040' && this.productItem.InsuranceClass != '143' && this.productItem.InsuranceClass != '144')
            || (this.insuranceId == '100042' && this.productItem.InsuranceClass != '135' && this.productItem.InsuranceClass != '136' )) {

            field.hideExpression = false;
            field.hide = false;
          }
          else {
            if (field.key == 'Deductibles' && this.productItem.InsuranceClass == '126') {
              this.productItem.Deductibles = null; field.hideExpression = true;
              field.hide = true;
            }
            else {
              if (this.insuranceId == '100042') { this.productItem.PurchaseDate = null; this.productItem.NoOfPassengers = null; }
              this.productItem.Inflation = null; this.productItem.Deductibles = null; this.productItem.VehicleValue = null;
              if (this.insuranceId == '100040')this.productItem.VehicleSI = 0; this.productItem.AccessoriesSI = 0;
              if (field.key == 'VehicleValue' ||  field.key == 'Aggregatedvalue') {
                // let changevehicleHooks = {
                // onInit: (field: FormlyFieldConfig) => {
                //   console.log("Field Details",field,this.productItem)
                //   field.form.controls['VehicleValue'].valueChanges.subscribe(() => {
                //if(this.tabIndex!=0 && field.form)this.productItem.VehicleValue=field.form.controls['VehicleValue'].value

                this.onchangevehicleValue(null);
                // });
                // }
                field.hide=true;
                field.hideExpression=true;
                // };
                // field.hooks=changevehicleHooks;
                console.log("Final Fields", field)
              }
             
              field.hideExpression = true;
              field.hide = true;
            }
          }

        }
        else if (field.key == 'Deductibles') {
          if(this.insuranceId=='100040'){
            if (this.productItem.InsuranceClass == '124' || this.productItem.InsuranceClass == '125' || this.productItem.InsuranceClass == '127' || this.productItem.InsuranceClass == '162') {
              field.hideExpression = false;
              field.hide = false;
            }
            else {
              field.hideExpression = true;
              field.hide = true;
            }
          }
          else if(this.insuranceId=='100042'){
            if (this.productItem.InsuranceClass == '135' || this.productItem.InsuranceClass == '136' ) {
             
              field.hideExpression = true;
              field.hide = true;
            }
            else {
              field.hideExpression = false;
              field.hide = false;
            }
          }
          
        }
        else if(field.key == 'WindShieldSI'){
          if (this.productItem.InsuranceClass == '123' || this.productItem.InsuranceClass == '124' || this.productItem.InsuranceClass == '125' || this.productItem.InsuranceClass == '126' || this.productItem.InsuranceClass == '128'
            || this.productItem.InsuranceClass == '130' || this.productItem.InsuranceClass == '132' || this.productItem.InsuranceClass == '133'
            || this.productItem.InsuranceClass == '145' || this.productItem.InsuranceClass == '146' || this.productItem.InsuranceClass == '161' || this.productItem.InsuranceClass == '162') {
            field.hideExpression = false;
            field.hide = false;
          }
          else {
            field.hideExpression = true;
            field.hide = true;
          }
        }
      }
     
      else if (this.insuranceId != '100027') {
        if (field.key == 'VehicleSI' || field.key == 'AccessoriesSI' || field.key == 'WindShieldSI' || field.key == 'ExtendedTPPDSI') {
          if (this.insuranceId == '100028' && this.vehicleDetailsList.length == 1) {
            field.hideExpression = false; field.hide = false;
          }
          else if (this.productItem.InsuranceClass != '' && this.productItem.InsuranceClass != null && this.productItem.InsuranceClass != undefined) {
            if (this.productItem.InsuranceClass == '1' || this.productItem.InsuranceClass == '2') {
              field.hideExpression = false; field.hide = false;
            }
            else {
              this.productItem.VehicleSI = null;
              this.productItem.WindShieldSI = null;
              this.productItem.Accessories
              field.hideExpression = true; field.hide = true;
            }
          }

        }
      }
      if(field.key == 'Aggregatedvalue' || field.key == 'Marketvalue'){
        if(this.productItem.VehicleValue ==null || this.productItem.VehicleValue ==''){
          field.hideExpression = true;
          field.hide = true;
        }
        else if(this.productItem.VehicleValue==1 || this.productItem.VehicleValue=='1'){
          if(field.key == 'Aggregatedvalue'){
            field.hideExpression = true;
            field.hide = true;
          }
          
        }
        else if(this.productItem.VehicleValue==2 || this.productItem.VehicleValue=='2'){
          if(field.key == 'Marketvalue'){
            field.hideExpression = true;
            field.hide = true;
          }
          
        }
      }
      console.log("Final Change Class Form", field)
    }
  }
  getMotorUsageAltList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    
    let urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.motorUsageList = data.Result;
          if (this.motorUsageList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.motorUsageList.length; i++) {
              this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
              this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
              if (i == this.motorUsageList.length - 1) {
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'MotorUsage') {
                    field.props.options = this.motorUsageList;
                    if (this.insuranceId == '100042') this.getInsuranceTypeListIvory()
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
  onSaveUWQues(uwList, entry, type, index) {
    if(uwList.length!=0){ 
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if(data.Result){
            this.getCalculationDetails(entry,type,index,'uwQues');
          }
        },
        (err) => { },
      );
    }
  }
  checkDisableField() {
    let status = sessionStorage.getItem('QuoteStatus');
    return ((this.adminSection && (status == 'AdminRP' || status == 'AdminRA')) || (this.finalizeYN == 'Y'))
  }
  onResetTabIndex() {
    this.tabIndex = 0;
    this.navigateTo('quote-plan')
  }
  navigateTo(location) {
    if (location == 'back') {
      if (this.tabIndex == 0) {
        if (sessionStorage.getItem('QuoteType')) this.router.navigate(['quotation/plan/shortQuote']);
        else if (this.endorsementSection) {
          if (this.enableCustomerDetails) this.router.navigate(['/customer/create']);
          else this.router.navigate(['/portfolio/endorsementtype']);
        }
        else this.router.navigate(['/quotation']);
      }
      else if (this.tabIndex != 0) {
        this.tabIndex -= 1;
        this.productItem = new ProductData();
        // this.driverName = null;this.driverType='1';this.gender='M';this.licenseNo=null;
        // this.driverDob=null;this.stateValue=null;this.cityCode=null;this.subUrbanCode=null;
        this.claimTypeValue = null;
        if (this.tabIndex != 0) this.getEditVehicleDetails(this.tabIndex, 'direct');
      }

    }
    else if (location == 'quote-plan') {
      this.policyStartError = false; this.policyEndError = false; this.currencyCodeError = false; this.policyPassDate = false;
      let i = 0;
      if (!this.endorsementSection) {
        if (this.policyStartDate == null || this.policyStartDate == '' || this.policyStartDate == undefined) {
          i += 1;
          this.policyStartError = true;
        }
        else {
          let dateList = String(this.policyStartDate).split('/');
          if (dateList.length > 0) {
            let date = dateList[2] + '-' + dateList[1] + '-' + dateList[0];
            var firstRepaymentDate = new Date(date);
            var today = new Date();
            if ((this.productId == '5' || this.productId == '4' || this.productId == '46' || this.productId == '29') && (firstRepaymentDate.getTime() < today.setHours(0, 0, 0, 0))) {
              i += 1;
              this.policyPassDate = true;
            }
          }
        }
        if (this.policyEndDate == null || this.policyEndDate == '' || this.policyEndDate == undefined) {
          i += 1;
          this.policyEndError = true;
        }
        if (this.currencyCode == null || this.currencyCode == '' || this.currencyCode == undefined) {
          i += 1;
          this.currencyCodeError = false;
        }
        if (this.issuerSection) {
          if (this.Code == '' || this.Code == null || this.Code == undefined) {
            i += 1;
            this.sourceCodeError = true;
          }
          else {
            this.sourceCodeError = false;
            //if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
            if (this.customerName == '' || this.customerName == undefined || this.customerName == null) {
              this.customerCodeError = true;
              i += 1;
            }
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
            // }
            // else{
            //   if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
            //     this.brokerCodeError = true;
            //     i+=1;
            //   }
            //   if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
            //     this.brokerBranchCodeError = true;
            //     i+=1;
            //   }
            // }
          }
        }
        if (this.productId == '6' || this.productId == '13' || this.productId == '16' || this.productId == '39' || this.productId == '14' || this.productId == '32' || this.productId == '1' || this.productId == '21' || this.productId == '26' || this.productId == '25' || this.productId == '57') {
          if (this.IndustryId == '' || this.IndustryId == null || this.IndustryId == undefined) {
            i += 1;
            this.industryError = true;
          }
          else this.industryError = false;
        }
      }
      if (i == 0) {
        let startDate = null, endDate = null;
        // let startDateList = String(this.policyStartDate).split('/');
        // if(startDateList.length>1) startDate = this.policyStartDate
        // else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
        // let endDateList = String(this.policyEndDate).split('/');
        // if(endDateList.length>1) endDate = this.policyEndDate;
        // else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
        if (this.policyStartDate) {
          if (String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
          else startDate = this.datePipe.transform(this.policyStartDate, 'dd/MM/yyyy');
        }
        if (this.policyEndDate != "Invalid Date") {
          if (String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
          else endDate = this.datePipe.transform(this.policyEndDate, 'dd/MM/yyyy');
        }
        let entry = {
          "policyStartDate": startDate,
          "policyEndDate": endDate,
          "currencyCode": this.currencyCode,
          "exchangeRate": this.exchangeRate,
          "promoCode": this.promocode,
          "BrokerCode": this.brokerCode,
          "SourceType": this.sourceType,
          "SourceCode": this.Code,
          "CustomerCode": this.customerCode,
          "CustomerName": this.customerName,
          "BrokerBranchCode": this.brokerBranchCode,
          "IndustryId": this.IndustryId,
          "LoginId": this.brokerLoginId,

        }
        if (this.productId == '5') {
          sessionStorage.setItem('commonDetails', JSON.stringify(entry));
          if (this.tabIndex == 0) { this.tabIndex += 1; this.getMotorDetails(this.tabIndex - 1) }
          else if (this.vehicleDetailsList.length == this.tabIndex) {
            this.saveMotorDetails(this.tabIndex)
          }
          else {
            if (this.insuranceId == '100040' || this.insuranceId == '100042') {
              let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
              let i = 0, j = 0;
              for (let field of fieldList) {
                if ((field.templateOptions.required == true || field.props.required == true) && (field.hide != true)) {
                  if (this.productItem[field.key] == null || this.productItem[field.key] == undefined || this.productItem[field.key] == '') {
                    j += 1;
                    this.form.controls[field.key].errors = true;
                    this.form.controls[field.key].touched = true;
                    field.templateOptions['errors'] = true;
                    field.props['errors'] = true;
                    console.log(this.form.controls[field.key]);
                  }
                  else {
                    field.templateOptions['errors'] = false;
                    field.props['errors'] = false;
                  }
                  i += 1;
                  if (i == fieldList.length && j == 0) {
                    this.saveMotorDetails(this.tabIndex);
                  }
                }
                else {
                  i += 1;
                  if (i == fieldList.length && j == 0) {
                    this.saveMotorDetails(this.tabIndex);
                  }
                }
              }
            }
            else {
              this.saveMotorDetails(this.tabIndex);
            }

          }
        }
        else if (this.productId == '59' || this.productId == '19') {
          this.showSectionSeltion = true;
        }
        else {
          let vehicle = {};
          if (this.executiveSection) {
            vehicle['AcExecutiveId'] = this.executiveValue;
            vehicle['CommissionType'] = this.commissionValue;
          }
          else {
            vehicle['AcExecutiveId'] = null;
            vehicle['CommissionType'] = null;
          }
          if (this.issuerSection) {
            vehicle['SourceType'] = this.Code;
            vehicle['BrokerCode'] = this.brokerCode;
            vehicle['BranchCode'] = this.branchCode;
            vehicle['BrokerBranchCode'] = this.brokerBranchCode;
            vehicle['CustomerCode'] = this.customerCode;
            vehicle['CustomerName'] = this.customerName;
            vehicle['LoginId'] = this.brokerLoginId;
          }
          else {
            vehicle['SourceType'] = 'Agent';
            vehicle['BrokerCode'] = this.brokerCode;
            vehicle['BranchCode'] = this.branchCode;
            vehicle['BrokerBranchCode'] = this.brokerBranchCode;
            vehicle['CustomerCode'] = this.customerCode;
            vehicle['CustomerName'] = this.customerName;
            vehicle['LoginId'] = this.loginId;
          }
          vehicle['modifiedYN'] = this.modifiedYN;
          vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          vehicle['PolicyPeriod'] = this.noOfDays;
          vehicle['Currency'] = this.currencyCode;
          vehicle['HavePromoCode'] = null;
          vehicle['PromoCode'] = this.promocode;
          vehicle['ExchangeRate'] = this.exchangeRate;
          vehicle['RiskId'] = String(1);
          vehicle['Active'] = false;
          sessionStorage.setItem('homeCommonDetails', JSON.stringify([vehicle]));
          if (this.productId == '19' || this.productId == '59' || this.productId == '24') {
            let loginType = this.loginType;
            if (loginType) {
              // if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
              //   let i=0;
              //   this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
              //   this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
              //     if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
              //     if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
              //     if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
              //     if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
              //     if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
              //     if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
              //     if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
              //     if(i>0) this.errorSection = true;
              //     if(i==0){
              //       let customerObj = {
              //         "Title":this.updateComponent.Title,
              //         "ClientName":this.updateComponent.UserName,
              //         "MobileCode":this.updateComponent.MobileCode,
              //         "MobileNo":this.updateComponent.MobileNo,
              //         "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
              //         "IdNumber":this.updateComponent.IdNumber,
              //         "IdType": this.updateComponent.CustomerType,
              //         "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
              //         "EmailId":this.updateComponent.EmailId,
              //         "PreferredNotification": this.updateComponent.PreferredNotification

              //       }
              //       sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
              //       // this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
              //       // if(this.modifiedCustomer){
              //       //     this.saveCustomerDetails(customerObj,'proceed');
              //       // }
              //       // else{
              //           this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
              //       //}
              //     }
              //   }
              //   else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
            }
            else {
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
            }
          }
          else if (this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId == '14' || this.productId == '32' || this.productId == '1' || this.productId == '21' || this.productId == '26' || this.productId == '25' || this.productId == '43' || this.productId == '13' || this.productId == '27' || this.productId == '57') this.saveCommonDetails([vehicle]);
          else {

            let loginType = this.loginType;
            if (loginType) {
              // if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
              //   let i=0;
              //   this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
              //   this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
              //     if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
              //     if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
              //     if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
              //     if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
              //     if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
              //     if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
              //     if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
              //     if(i>0) this.errorSection = true;
              //     if(i==0){
              //       let customerObj = {
              //         "Title":this.updateComponent.Title,
              //         "ClientName":this.updateComponent.UserName,
              //         "MobileCode":this.updateComponent.MobileCode,
              //         "MobileNo":this.updateComponent.MobileNo,
              //         "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
              //         "IdNumber":this.updateComponent.IdNumber,
              //         "IdType": this.updateComponent.CustomerType,
              //         "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
              //         "EmailId":this.updateComponent.EmailId,
              //         "PreferredNotification": this.updateComponent.PreferredNotification

              //       }
              //       sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
              //       // this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
              //       // if(this.modifiedCustomer){
              //       //     this.saveCustomerDetails(customerObj,'proceed');
              //       // }
              //       // else{
              //           this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
              //       //}
              //     }
              //   }
              // else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
              this.router.navigate(['/quotation/plan/personal-quote-details'])
            }
            else {
              this.router.navigate(['/quotation/plan/personal-quote-details'])
            }
          }
        }
      }
      // else{

      // }

    }
  }
  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }
  saveCommonDetails(commonDetails) {
    let sourcecode: any;
    let endorsementDate = null, EndorsementEffectiveDate = null, EndorsementRemarks = null,
      EndorsementType = null, EndorsementTypeDesc = null, EndtCategoryDesc = null, EndtCount = null,
      EndtPrevPolicyNo = null, EndtPrevQuoteNo = null, EndtStatus = null, IsFinanceEndt = null, OrginalPolicyNo = null;
    if (this.endorsementDetails) {
      endorsementDate = this.endorsementDetails['EndorsementDate'];
      EndorsementEffectiveDate = this.endorsementDetails['EndorsementEffectiveDate'];
      EndorsementRemarks = this.endorsementDetails['EndorsementRemarks'];
      EndorsementType = this.endorsementDetails['EndorsementType'];
      EndorsementTypeDesc = this.endorsementDetails['EndorsementTypeDesc'];
      EndtCategoryDesc = this.endorsementDetails['EndtCategoryDesc'];
      EndtCount = this.endorsementDetails['EndtCount'];
      EndtPrevPolicyNo = this.endorsementDetails['EndtPrevPolicyNo'];
      EndtPrevQuoteNo = this.endorsementDetails['EndtPrevQuoteNo'];
      EndtStatus = this.endorsementDetails['EndtStatus'];
      IsFinanceEndt = this.endorsementDetails['IsFinanceEndt'];
      OrginalPolicyNo = this.endorsementDetails['OrginalPolicyNo'];
    }
    let promocode = null;
    let appId = "1", loginId = "", brokerbranchCode = ""; let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
    }
    else this.quoteRefNo = null;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = this.brokerLoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') {
      brokerbranchCode = commonDetails[0]['BrokerBranchCode']
      this.issuerSection = true;
    }
    else { this.issuerSection = false; brokerbranchCode = this.userDetails.Result.BrokerBranchCode; }
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if (this.userType != 'Broker' && this.userType != 'User') {
      sourcecode = this.Code
    }
    else {
      sourcecode = sessionStorage.getItem('typeValue')
    }
    if (this.promocode != null && this.promocode != '' && this.promocode != undefined) this.havePromoCodeYN = 'Y';
    else this.havePromoCodeYN = 'N';
    let section = [];
    if (this.productId == '6') { section.push('40'); };
    if (this.productId == '39') { section.push('41'); };
    if (this.productId == '16') { section.push('42'); };
    if (this.productId == '14') { section.push('45'); };
    if (this.productId == '32') { section.push('43'); };
    if (this.productId == '1') { section.push('52'); };
    if (this.productId == '21') { section.push('3'); };
    if (this.productId == '26') { section.push('3'); };
    if (this.productId == '25') { section.push('39'); };
    if (this.productId == '13') { section.push('35'); };
    // if(this.productId=='56'){section.push('82');this.IndustryId='99999'};
    if (this.productId == '57') { section.push('50') };
    if (this.productId == '43') { section.push('70'); this.IndustryId = '44' };
    if (this.productId == '27') { section.push('54'); this.IndustryId = '44' };
    let ReqObj = {
      "AcexecutiveId": "",
      "PolicyNo": this.endorsePolicyNo,
      "ProductId": this.productId,
      "ProductType": null,
      "TiraCoverNoteNo": null,
      "RequestReferenceNo": this.quoteRefNo,
      "AgencyCode": this.agencyCode,
      "ApplicationId": this.applicationId,
      "BdmCode": this.customerCode,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": brokerbranchCode,
      "BrokerCode": this.brokerCode,
      "BuildingOwnerYn": this.buildingOwnerYN,
      "Createdby": this.loginId,
      "SourceTypeId": sourcecode,//this.Code
      "Currency": this.currencyCode,
      "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "ExchangeRate": this.exchangeRate,
      "Havepromocode": this.havePromoCodeYN,
      "Promocode": this.promocode,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "UserType": this.userType,
      "PolicyEndDate": this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy"),
      "PolicyStartDate": this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy"),
      "SectionIds": section,
      "SubUsertype": sessionStorage.getItem('typeValue'),
      "RiskId": "1",
      "IndustryId": this.IndustryId,
      "EndorsementDate": endorsementDate,
      "EndorsementEffectiveDate": EndorsementEffectiveDate,
      "EndorsementRemarks": EndorsementRemarks,
      "EndorsementType": EndorsementType,
      "EndorsementTypeDesc": EndorsementTypeDesc,
      "EndtCategoryDesc": EndtCategoryDesc,
      "EndtCount": EndtCount,
      "EndtPrevPolicyNo": EndtPrevPolicyNo,
      "EndtPrevQuoteNo": EndtPrevQuoteNo,
      "EndtStatus": EndtStatus,
      "IsFinanceEndt": IsFinanceEndt,
      "OrginalPolicyNo": OrginalPolicyNo,
      "Status": "Y"
    }
    if (this.endorsementSection) {
      if (this.currentStatus == undefined || this.currentStatus == null || this.currentStatus == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.currentStatus;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide/savecommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let sections = data.Result?.SectionIds;
          let refNo = data.Result?.RequestReferenceNo;
          this.referenceNo = data.Result?.RequestReferenceNo;
          // this.updateComponent.referenceNo = data.Result?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', data.Result?.RequestReferenceNo);
          let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          if (homeDetails) {
            if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") homeDetails[0]['SectionId'] = sections;
            else homeDetails[0].SectionId = sections;
            if (this.IndustryId && this.industryList != null)
              homeDetails[0]['IndustryName'] = this.industryList.find(ele => ele.Code == this.IndustryId).CodeDesc;
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
            let loginType = this.loginType;
            // if(loginType){
            //   if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
            //     let i=0;
            //     this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
            //     this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
            //       if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
            //       if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
            //       if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
            //       if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
            //       if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
            //       if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
            //       if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
            //       if(i>0) this.errorSection = true;
            //       if(i==0){
            //         let customerObj = {
            //           "Title":this.updateComponent.Title,
            //           "ClientName":this.updateComponent.UserName,
            //           "MobileCode":this.updateComponent.MobileCode,
            //           "MobileNo":this.updateComponent.MobileNo,
            //           "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
            //           "IdNumber":this.updateComponent.IdNumber,
            //           "IdType": this.updateComponent.CustomerType,
            //           "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
            //           "EmailId":this.updateComponent.EmailId,
            //           "PreferredNotification": this.updateComponent.PreferredNotification

            //         }
            //         sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
            //         this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
            //         if(this.modifiedCustomer){
            //             this.saveCustomerDetails(customerObj,'proceed');
            //         }
            //         else{
            //             this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
            //         }
            //       }
            //     }
            //     else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
            // }
            // else{
            this.router.navigate(['/quotation/plan/personal-quote-details'])
            //}
          }
        }
      },
      (err) => { },
    );
  }
  onMoveToUpload() {
    let entry = this.checMandatories()
    if (entry) {
      this.uploadTab = true;
    }
  }
  onUploadDocuments(target: any, fileType: any, type: any) {
    console.log("Event ", target);
    // this.uploadStatus = null; 
    this.uploadDocList = [];
    let event: any = target.target.files;
    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader: any = new FileReader();
      reader.readAsDataURL(element);
      var filename = element.name;
      console.log("File Name", element, filename)
      let imageUrl: any;
      reader.onload = (res: { target: { result: any; }; }) => {
        imageUrl = res.target.result;
        this.imageUrl = imageUrl;
        if (type == 'cover') this.uploadDocList.push({ 'url': element, 'DocTypeId': '', 'filename': filename, 'JsonString': {} });
        else this.uploadSubDocList.push({ 'url': element, 'DocTypeId': '', 'filename': filename, 'JsonString': {} });
        console.log("FInal Doc", this.uploadDocList)
      }
    }

  }
  // onChangeSectionType(rowData,index){
  //   let entry = this.individualDocumentList.find(ele=>ele.LocationId==rowData.locationId);
  //    if(entry){
  //      let section = entry.SectionList.find(ele=>ele.SectionId==rowData.sectionId);
  //      if(section){
  //        rowData.Id = "";
  //        rowData['typeList'] = section.IdList;
  //        if(rowData.typeList.length==1){rowData.Id= rowData.typeList[0].Id;}
  //        if(section.docTypeList==undefined){
  //          let ReqObj = {
  //            "InsuranceId":this.insuranceId,
  //            "ProductId": this.productId,
  //            "SectionId": rowData.sectionId
  //          }
  //          let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
  //          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //            (data: any) => {
  //              console.log(data);
  //              if(data.Result){
  //                  this.uploadListDoc[index].docTypeList = data.Result;
  //                  section['docTypeList'] = data.Result;
  //              }
  //            },
  //            (err) => { },
  //          );
  //        }
  //        else rowData['docTypeList'] = section.docTypeList;
  //      }
  //    }
  //  }
  getUploadedDocList() {
    let ReqObj = {
      "QuoteNo": this.quoteRefNo
    }
    let urlLink = `${this.CommonApiUrl}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.uploadDocList = data?.Result;
          //   this.uploadDocList = this.uploadedDocList.filter(ele=>ele.DocumentId!='23');
          //   this.uploadedIndividualList = data?.Result?.InduvidualDocument;
          //   if(this.uploadedDocList.length!=0){
          //     this.uploadedIndividualList = this.uploadedDocList.concat(this.uploadedIndividualList)
          //   }
          //     let entry = this.uploadedIndividualList.find(ele=>ele.DocumentId=='17' && ele.VerifiedYn!='Y');
          //     // if(entry){
          //     //   this.checkMandatoryDocument(entry);
          //     // }
        }
      },
      (err) => { },
    );
  }
  onFileUploadCommonList() {
    // let ReqObj={
    //   "InsuranceId":"100002",
    //   "ProductId":"5",
    //   "CoverId":"21"
    // }
    console.log(this.uploadDocList[0].url, "URL")
    // if(this.endorsementSection && this.enableDocumentDetails){
    //   ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
    //   ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
    //   ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
    //   ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
    //   ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
    //   ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
    //   ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
    // }
    let urlLink = `${this.ApiUrl1}eway/rating/convertExcelToCSV/${this.productId}/${this.insuranceId}`;
    this.sharedService.onPostDocumentMethodSyncNoReqObj(urlLink, this.uploadDocList[0].url).subscribe(
      (data: any) => {
        // if(data.ErrorMessage){
        //   for(let entry of data.ErrorMessage){

        //   }
        // }
        //  else{
        //   this.checkStatus()
        //  }
        if (data.Result) {
          this.checkStatusSP = data?.Result?.status;
          this.tranId = data?.Result?.tran_id;
          if (this.checkStatusSP == 'P') {
            setTimeout(() => {
              this.checkStatus(this.tranId, null)
            }, (2500));
          }
        }
      },
      (err) => { },
    );


  }
  checkStatus(tranId, type) {
    let urlLink = `${this.ApiUrl1}batch/getTranactionByTranId?tranId=${tranId}`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.checkStatusSP = data?.Result?.Status;
          if (this.checkStatusSP == 'S') {
            this.uploadedDocList = Array(data.Result);
            if (type == 'movingRecords') {
              this.movingRecords2();
              sessionStorage.setItem('quoteReferenceNo', this.tranId)
              this.router.navigate(['/quotation/plan/premium-details']);
            }
            else if (type == 'validation') {
              if (data?.Result?.ErrorRecord >= 1) {
              }

            }

          }
          else {
            this.tranId = data?.Result?.TranId;
            setTimeout(() => {
              if (type == 'movingRecords') {
                this.checkStatus(this.tranId, 'movingRecords')
              }
              else if (type == 'validation') {
                this.checkStatus(this.tranId, 'validation')
              }
              else {
                this.checkStatus(this.tranId, null)
              }

            }, (2500));
          }
          console.log(this.uploadedDocList, "this.uploadedDocList")
        }
      },
      (err) => { },
    );
  }
  onDeleteListDocument(index, doc) {
    this.uploadDocList.splice(index, 1)
  }
  rawTableInsert() {
    let sourcecode: any;
    let endorsementDate = null, EndorsementEffectiveDate = null, EndorsementRemarks = null,
      EndorsementType = null, EndorsementTypeDesc = null, EndtCategoryDesc = null, EndtCount = null,
      EndtPrevPolicyNo = null, EndtPrevQuoteNo = null, EndtStatus = null, IsFinanceEndt = null, OrginalPolicyNo = null;
    if (this.endorsementDetails) {
      endorsementDate = this.endorsementDetails['EndorsementDate'];
      EndorsementEffectiveDate = this.endorsementDetails['EndorsementEffectiveDate'];
      EndorsementRemarks = this.endorsementDetails['EndorsementRemarks'];
      EndorsementType = this.endorsementDetails['EndorsementType'];
      EndorsementTypeDesc = this.endorsementDetails['EndorsementTypeDesc'];
      EndtCategoryDesc = this.endorsementDetails['EndtCategoryDesc'];
      EndtCount = this.endorsementDetails['EndtCount'];
      EndtPrevPolicyNo = this.endorsementDetails['EndtPrevPolicyNo'];
      EndtPrevQuoteNo = this.endorsementDetails['EndtPrevQuoteNo'];
      EndtStatus = this.endorsementDetails['EndtStatus'];
      IsFinanceEndt = this.endorsementDetails['IsFinanceEndt'];
      OrginalPolicyNo = this.endorsementDetails['OrginalPolicyNo'];
    }
    let promocode = null;
    let appId = "1", loginId = "", brokerbranchCode = ""; let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
    }
    else this.quoteRefNo = null;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = this.brokerLoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') {
      // brokerbranchCode =  commonDetails[0]['BrokerBranchCode']
      this.issuerSection = true;
    }
    else { this.issuerSection = false; brokerbranchCode = this.userDetails.Result.BrokerBranchCode; }
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if (this.userType != 'Broker' && this.userType != 'User') {
      sourcecode = this.Code
    }
    else {
      sourcecode = sessionStorage.getItem('typeValue')
    }
    if (this.promocode != null && this.promocode != '' && this.promocode != undefined) this.havePromoCodeYN = 'Y';
    else this.havePromoCodeYN = 'N';
    let section = [];
    if (this.productId == '6') { section.push('40'); };
    if (this.productId == '39') { section.push('41'); };
    if (this.productId == '16') { section.push('42'); };
    if (this.productId == '14') { section.push('45'); };
    if (this.productId == '32') { section.push('43'); };
    if (this.productId == '1') { section.push('52'); };
    if (this.productId == '21') { section.push('3'); };
    if (this.productId == '26') { section.push('3'); };
    if (this.productId == '25') { section.push('39'); };
    if (this.productId == '13') { section.push('35'); };
    // if(this.productId=='56'){section.push('82');this.IndustryId='99999'};
    if (this.productId == '57') { section.push('50') };
    if (this.productId == '43') { section.push('70'); this.IndustryId = '44' };
    if (this.productId == '27') { section.push('54'); this.IndustryId = '44' };
    let startDate, endDate;
    if (this.policyStartDate) {
      if (String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
      else startDate = this.datePipe.transform(this.policyStartDate, 'dd/MM/yyyy');
    }
    if (this.policyEndDate != "Invalid Date") {
      if (String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
      else endDate = this.datePipe.transform(this.policyEndDate, 'dd/MM/yyyy');
    }
    let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "TypeId": "101",
      "BrokerBranchCode": brokerbranchCode,
      "BdmCode": this.customerCode,
      "CustomerCode": this.customerCode,
      "SourceTypeId": sourcecode,
      "CustomerRefNo": sessionStorage.getItem('customerReferenceNo'),
      "AcExecutiveId": null,
      "BrokerCode": this.brokerCode,
      "LoginId": this.loginId,
      "RequestReferenceNo": this.tranId,
      "SubUserType": sessionStorage.getItem('typeValue'),
      "ApplicationId": appId,
      "EndorsementYn": "N",
      "EndorsementDate": "",
      "EndorsementEffectiveDate": "",
      "EndorsementRemarks": "",
      "EndorsementType": "",
      "EndorsementTypeDesc": "",
      "EndtCategoryDesc": "",
      "EndtCount": "",
      "EndtPrevPolicyNo": "",
      "EndtPrevQuoteNo": "",
      "EndtStatus": "",
      "IsFinanceEndt": "",
      "OrginalPolicyNo": "",
      "PolicyEndDate": endDate,
      "PolicyStartDate": startDate,
      "Currency": this.currencyCode,
      "ExchangeRate": this.exchangeRate,
      "HavePromoCode": this.havePromoCodeYN,
      "NoOfVehicles": "",
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "Idnumber": this.customerDetails?.IdNumber,
      "UserType": this.userType,
      "UploadType": "Add",
      "NcdYn": this.claimsYN,
      "OwnerCategory": "1",
      "ResOwnerName": customerDetails.ClientName

    }

    let urlLink = `${this.ApiUrl1}eway/vehicle/batch/upload`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if (data.Result.status == 'P') {
            this.checkStatus(data.Result.request_reference_no, null)
          }
        }
      },
      (err) => { },
    );
  }

  dataValidation() {
    let urlLink = `${this.ApiUrl1}eway/vehicle/vehicle/validation/${this.tranId}`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          //this.checkStatusSP=
          if (data.Result.status == 'P') {
            this.checkStatus(data.Result.request_reference_no, 'validation')
          }
          // else{
          //   this.dataValidationList == Array(data.Result);
          //   console.log(this.dataValidationList,"this.dataValidationList");

          // }
        }
      },
      (err) => { },
    );
  }
  movingRecords() {
    let urlLink = `${this.ApiUrl1}eway/vehicle/batch/createquote/${this.tranId}`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          //this.checkStatusSP=
          if (data.Result.status == 'P') {
            this.checkStatus(data.Result.request_reference_no, 'movingRecords')
          }
          else {
            this.movingRecords2()

          }
        }
      },
      (err) => { },
    );
  }
  movingRecords2() {
    let urlLink = `${this.ApiUrl1}eway/vehicle/delete/rawdata/${this.tranId}`;
    this.sharedService.onGetMethod(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          //this.checkStatusSP=
          if (data.Result.status == 'P') {
            this.checkStatus(data.Result.request_reference_no, 'movingRecords2')
          }
          else {
          }
        }
      },
      (err) => { },
    );
  }

  restart() {
    window.location.reload()
  }
  borrowerValueChange() {
    this.collateralName = '',
      this.firstLossPayee = ''
  }
  getZoneCirculation() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "ZONE_CIRCULATION"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.zoneCirculationList = data.Result;
          if (this.zoneCirculationList.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.zoneCirculationList.length; i++) {
              this.zoneCirculationList[i].label = this.zoneCirculationList[i]['CodeDesc'];
              this.zoneCirculationList[i].value = this.zoneCirculationList[i]['Code'];
              if (i == this.zoneCirculationList.length - 1) {
                console.log("Dropdown List", this.fields)
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'ZoneCirculation') { field.props.options = defaultObj.concat(this.zoneCirculationList); this.checkFieldNames(); }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getVehicleType() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "vehicle_type"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.vehicleTypeListIVY = data.Result;
          if (this.vehicleTypeListIVY.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.vehicleTypeListIVY.length; i++) {
              this.vehicleTypeListIVY[i].label = this.vehicleTypeListIVY[i]['CodeDesc'];
              this.vehicleTypeListIVY[i].value = this.vehicleTypeListIVY[i]['Code'];
              if (i == this.vehicleTypeListIVY.length - 1) {
                console.log("Dropdown List", this.fields)
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'VehicleType') { field.props.options = defaultObj.concat(this.vehicleTypeListIVY); this.checkFieldNames(); }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getVehicleUsage() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "vehicle_usage"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.vehicleUsageListIVY = data.Result;
          if (this.vehicleUsageListIVY.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.vehicleUsageListIVY.length; i++) {
              this.vehicleUsageListIVY[i].label = this.vehicleUsageListIVY[i]['CodeDesc'];
              this.vehicleUsageListIVY[i].value = this.vehicleUsageListIVY[i]['Code'];
              if (i == this.vehicleUsageListIVY.length - 1) {
                console.log("Dropdown List", this.fields)
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'VehicleUsage') { field.props.options = defaultObj.concat(this.vehicleUsageListIVY); this.checkFieldNames(); }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getPACoverId() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "PA_COVER_ID"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.pACoverIdListIVY = data.Result;
          if (this.pACoverIdListIVY.length != 0) {
            let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
            for (let i = 0; i < this.pACoverIdListIVY.length; i++) {
              this.pACoverIdListIVY[i].label = this.pACoverIdListIVY[i]['CodeDesc'];
              this.pACoverIdListIVY[i].value = this.pACoverIdListIVY[i]['Code'];
              if (i == this.pACoverIdListIVY.length - 1) {
                console.log("Dropdown List", this.fields)
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for (let field of fieldList) {
                  if (field.key == 'PACoverId') { field.props.options = defaultObj.concat(this.pACoverIdListIVY); this.checkFieldNames(); }
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
    //UW Section
    getUWDetails() {
      // let branchCode = '';
      // if(this.userType!='Broker' && this.userType!='User'){
      //   branchCode = this.branchCode
      // }
      // else{
      //   branchCode = this.brokerbranchCode
      // }
      let ReqObj = {
        "Limit": "0",
        "Offset": "100",
        "ProductId": this.productId,
        "LoginId": this.loginId,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res: any = data.Result;
          if (res.length != 0) {
            this.uwQuestionList = res;
            if(this.uwQuestionList.length!=0){
              let i=0;
              for(let ques of this.uwQuestionList){
                  if(ques['HiddenYN']==undefined) ques['HiddenYN'] = 'N';
                  if(ques.Options!=null && ques.Options.length!=0){
                    let j=0;
                    for(let option of ques.Options){
                      if(option.DependentYn=='Y'){
                        let uwQues = this.uwQuestionList.find(ele=>ele.UwQuestionId==option.DependentUnderwriterId);
                        if(uwQues) uwQues['HiddenYN'] = 'Y';
                      }
                      j+=1;
                      if(j==ques.Options.length){i+=1; if(i==this.uwQuestionList.length) this.getEditUwQuestions();}
                    
                    }
                  }
                  else{i+=1;if(i==this.uwQuestionList.length) this.getEditUwQuestions();}
              }
            }
          }
          else {
          }
        },
        (err) => { },
      );
    }
    getEditUwQuestions() {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "LoginId": this.loginId,
        "RequestReferenceNo": this.quoteRefNo,
        "VehicleId": "1"
      }
      let urlLink = `${this.CommonApiUrl}api/getuwquestionsdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let uwList = data?.Result;
          if (uwList.length != 0) {
            let i = 0;
            for (let ques of uwList) {
              let entry = this.uwQuestionList.find(ele => ele.UwQuestionId == ques.UwQuestionId);
              if (entry) { entry.Value = ques.Value };
              i += 1;
              if (i == uwList.length) {
  
                this.uwQuestionList.forEach(x => {
                  if (x.QuestionType == '01') {
                   
                    console.log('gggggg', x.Value)
                    x.Value = x.Value ?  x.Value : x.Value
                    if(x.Options!=null) this.showUWQUestion(x.Options.find(ele=>ele.UwQuesOptionDesc==x.Value),x.Options,'direct');
                  }
                  
                });
                
                this.questionSection = true; console.log("Final UW List", this.uwQuestionList);
              }
            }
          }
          else {
            let i = 0
            for (let ques of this.uwQuestionList) {
                ques.Value = null;
              i += 1;
              if (i == this.uwQuestionList.length) { this.questionSection = true; console.log("Final UW List", this.uwQuestionList); }
            }
          }
        },
        (err) => { },
      );
    }
    showUWQUestion(rowData,optionList,type){
      if(optionList.length!=0 && rowData!=undefined){
        for(let option of optionList){
          if(option.DependentYn!=null && option.DependentYn=='Y'){
              if(option.DependentUnderwriterId==rowData.DependentUnderwriterId){
                let ques = this.uwQuestionList.find(ele=>ele.UwQuestionId==option.DependentUnderwriterId)
                ques['HiddenYN'] = 'N';
                if(type=='change') ques['Value']=null;
              }
              else{
                let ques = this.uwQuestionList.find(ele=>ele.UwQuestionId==option.DependentUnderwriterId)
                ques['HiddenYN'] = 'Y';
              }
          }
        }
      }
    }
    checkHideQUestion(rowData){
      return rowData['HiddenYN']=='Y';
    }

    getZone() {
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "ZONE"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.Zone = data.Result;
            if (this.Zone.length != 0) {
              let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
              for (let i = 0; i < this.Zone.length; i++) {
                this.Zone[i].label = this.Zone[i]['CodeDesc'];
                this.Zone[i].value = this.Zone[i]['Code'];
                if (i == this.Zone.length - 1) {
                  console.log("Dropdown List", this.fields)
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) {
                    if (field.key == 'Zone') { field.props.options = defaultObj.concat(this.Zone); this.checkFieldNames(); }
                  }
                }
              }
            }
          }
        },
        (err) => { },
      );
    }
    getClass(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "CLASS"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.ClassList = data.Result;
            if (this.ClassList.length != 0) {
              let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
              for (let i = 0; i < this.ClassList.length; i++) {
                this.ClassList[i].label = this.ClassList[i]['CodeDesc'];
                this.ClassList[i].value = this.ClassList[i]['Code'];
                if (i == this.ClassList.length - 1) {
                  console.log("Dropdown List", this.fields)
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for (let field of fieldList) {
                    if (field.key == 'Class') { field.props.options = defaultObj.concat(this.ClassList); this.checkFieldNames(); }
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

