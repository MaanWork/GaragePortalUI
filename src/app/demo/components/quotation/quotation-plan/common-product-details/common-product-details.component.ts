import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { ProductData } from '../models/product';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Burglary } from '../models/Burglary';
import { Burglarys } from '../newmodels/Buglarys';
import { FireAlliedPerils } from '../models/FireAlliedPerils';
import { Money } from '../models/Money';
import { Fidelitytwo } from '../models/Fidelitytwo';
import { EmployersLiabilitytwo } from '../models/Employeetwo';
import { MachineryBreakDown } from '../models/machineryBreakdown';
import { PublicLiability } from '../models/PublicLiablity';
import { HouseHoldContentsss } from '../newmodels/HouseHoldContents';
import { HouseHoldContents } from '../models/HouseHoldContents';
import { BussinessAllRisk } from '../newmodels/Bussinessallrisk';
import { PersonalAccident } from '../models/PersonalAccident';
import { ElectronicEquipment } from '../newmodels/ElectronicEquipment';
import { PersonalLiability } from '../models/PersonalLiability';
import { AllRisk } from '../models/AllRisk';
import { AllRiskss } from '../newmodels/AllRisk';
import { Building } from '../models/Building';
import { Buildingss } from '../newmodels/Building';
import { FormlyFieldTabs } from '../formlyTypes/tab.type';
import { BusinessInterruption } from '../models/BusinessInterruption';
import { GoodsInTransit } from '../models/GoodsInTransit';
import { GroupPersonalAccident } from '../models/GroupPersonalAccident';
import { DatePipe } from '@angular/common';
import { FireAndMaterialDamage } from '../newmodels/Fire&MaterialDamage';
import { MedicalInsurance } from '../models/MedicalInsurance';
import { CyberInsurance } from '../models/CyberInsurance';
import { PlantAllRisk } from '../newmodels/Plantallrisk';
import Swal from 'sweetalert2';
import { ProfessionalIndemnity } from '../models/ProfessionalIntermnity';
import { HealthInsurance } from '../models/HealthInsurance';
import { Moneys } from '../newmodels/Moneys';
import { PublicLiabilitys } from '../newmodels/PublicLiablityCover';
import { ShortTermVehicle } from '../models/ShortTermVehicle';
import { ElectronicEquipments } from '../models/ElectronicEquipments';
import { Bond } from '../models/bond';
import { NonMotorProducts } from './nonMotorModel';

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
@Component({
  selector: 'app-common-product-details',
  templateUrl: './common-product-details.component.html',
  styleUrls: ['./common-product-details.component.scss']
})
export class CommonProductDetailsComponent {
  kids:any=0;
  adult:any=0;
  senior:any=0;
  superSenior:any=0;
  grandSenior:any=0;
  visible:boolean=false;
  burglaryError:boolean=false;
  fieldsBond:any;questionSection:boolean=false;
  userDetails:any=null;loginId:any=null;agencyCode:any=null;ClientName:any=null;
  brokerbranchCode:any=null;branchCode:any=null;productId:any=null;isSearchFormVisible:boolean=false;
  PlanBenefitsVisible:boolean=false;industryValue:any=null;
  userType:any=null;insuranceId:any=null;brokerCode:any=null;customers:any[]=[];
  public AppConfig: any = (Mydatas as any).default;customerDetails:any=null;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;quoteRefNo:any=null;customerData:any=null;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;currencyCode:any=null;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;EmployeeListNew:any[]=[];
  public customApiUrl1:any = this.AppConfig.CustomApiUrl1;
  relationList:any[]=[];paymentModeList: any[]=[];premiumList: any[]=[];
  customerColumn:any[]=[];selectedCustomer:any=null;customerFilterSuggestions:any[] = [];
  adminSection:boolean=false;issuerSection:boolean=false;minCurrencyRate:any=null;
  referenceNo: string;currencyList:any[]=[];exchangeRate:any=null;maxCurrencyRate:any=null;
  selectedIndex:number=0;IndimnityTypes:any[]=[];showCustomerList:boolean = false;
  noOfDays: any=null;policyStartDate:any=null;endMinDate:any=null;policyEndDate:any=null;
  endMaxDate:any=null;promocode:any=null;productItem:any=null;industryList:any[]=[];employeeCountList:any[]=[];
  industryError:boolean=false;IndustryId:any=null;fields: any[] = [];emailId:any=null;
  formSection:boolean=false;dobDate:any=null;title:any=null;clientName:any=null;endorsementSection:boolean=false;
  enableFieldList:any[]=[];public form = new FormGroup({});industryTypeList:any[]=[];BenifitList:any[]=[];
  ownerName:any=null;dateOfBirth:any=null;clientType:any=null;mobileNo:any=null;idNumber:any=null;
  insuranceForList:any[]=[];wallMaterialList:any[]=[];buglaryValue:any[]=[];buildingOccupiedList:any[]=[];
  requestReferenceNo: string;viewSection:boolean=false;stateList:any[]=[];natureTradeList:any[]=[];enableFieldsList:any[]=[];
  indemityPeriodList:any[]=[];TypeOfPropertyss:any[]=[];roofMaterialList:any[]=[];ceilingMaterialList:any[]=[];
  regionList:any[]=[];countryId:any=null;finalizeYN:any='N';subuserType:any=null;nightLeftDoors:any[]=[];
  branchList: any[]=[];windowMaterialList:any[]=[];doorsMaterialList:any[]=[];FidelityListNew:any[]=[];
  endorsementDate: any=null; endorsementEffectiveDate: any=null;endorsementRemarks: any=null;vehicleDetails:any=null;
  endorsementType: any=null; endorsementTypeDesc: any=null;endtCategoryDesc: any=null;queryData1:any[]=[];
  endtCount: any=null;endtPrevPolicyNo: any=null;endtPrevQuoteNo: any=null;ProductCode:any=null;aggSIList:any[]=[];
  endtStatus: any=null;isFinanceEndt: any=null;orginalPolicyNo: any=null;queryData: any[]=[];applicationId:any=null;
  listSection:boolean=false;listn:boolean=false;queryHeader1:any[]=[];fieldsEmployee:any[]=[];
  groupHeader:any[]=[]; GroupListNew: any[]=[];  listSectionGroup: boolean;
  listnGroup: boolean; dobminDate: Date;productList13:any[]=[];isBondForm:boolean=false;
  queryHeader4:any[]=[];vehicleDetailsList:any[]=[]; queryHeader5:any[]=[];BondListNew:any[]=[]
  backDays: any=null;customerList:any[]=[];
  fieldsFidelity:any[]=[];fuelTypeList:any[]=[];motorDetails:any=null;
  listSectionFed:boolean=false;listnFed:boolean=false;queryHeader2:any[]=[];CyberCode:any=null;
  colorList:any[]=[];motorCategoryList:any[]=[];bodyTypeList:any[]=[];usageList:any[]=[];
  quoteDetails: any=null;makeList:any[]=[];sectionList:any[]=[];
  categoryDesc:any=null;showSection:boolean=false;BuildingUsageList:any[]=[];transaportList:any[]=[];
  public tab:FormlyFieldTabs=new FormlyFieldTabs();commonDetails:any[]=[];occupationList:any[]=[];
  sectionCount: number;modeTransportList:any[]=[];geographicalList:any[]=[];modelList:any[]=[];
  customerError: boolean=false;CyperNewList:any[]=[];ProductsList:any[]=[];
  policyStartDateError: boolean=false;
  policyEndDateError: boolean=false;
  currencyCodeError: boolean=false;
  endorsePolicyNo: any=null;currentBuildingIndex:any=0;currentGroupIndex:any=0;
  currentFedIndex:any=0;tabIndexToDelete: number;display: boolean;
  LocationList: any[]=[];local: boolean;endorsementDetails: any=null;
  Code: any=null;buildingOwnerYN:any='N';customerCode: any=null;
  customerName: any;coversRequired:any='C';currentStatus: any="Y";BuildingOwnerYn:any ='N';
  sourceType: any;minDate:Date;bdmCode: any;aooSIList:any[]=[];ProfessionalTypes:any[]=[];
  uwQuestionList: any[]=[];isEmployeeForm:boolean=false;
  isGroupForm:boolean=false;brokerLoginId: any=null;isFedilityForm:boolean=false;
  endorseEffectiveDate: any=null;showsectionnew:boolean=false;
  endorseCoverModification:any=null; sourceCodeDesc: null;editss: boolean=false;brokerList:any[]=[];
  editEmp: boolean=false;activeSection: boolean;editGroup:boolean = false;brokerBranchList:any[]=[];
  employeeError: boolean=false;branchValue: any=null;
  productList: any[]=[];
  Products: boolean = false;currentFidelityIndex:any=0;
  productnames: any;brokerBranchCode: any;
  newsections: any;
  colorSections: any[]=[];relationTypeList:any[]=[];
  plus: boolean = false;values:any;sectionDropdownList:any[]=[];
  landshow: boolean= false;inPatientSIList:any[]=[];
  fidelityList: any[]=[];
  vehicleId: any=null;
  totalIndex: any=null;
  currentIndex: any=null;
  commissionType: any=null;
  searchValue: any=[]
  clearSearchSection: boolean=false;
  FidEmpCount: any;
  PlanBenefitsHeader: string[];
  countryList: { Code: any; CodeDesc: string; }[];
  travelDetails: any;
  TravelForm: FormGroup<any>;
  planTypeList:any[]=[];
  subCoverData:any[]=[];
  SectionId: any;
  planType: any;
  premium: any;
  headerData:any[]=[];
  headerData1:any[]=[];
  coverData:any[]=[];
  subCover:any[]=[];
  subCoverDesc: any[]=[];
  sumInsured: any[]=[];
  excessAmt: any[]=[];
  subCoverDataList:  any[]=[];
  executiveValue: any="";
  commissionValue: any="";
  country: any;
  updatedDetails: boolean;
  productNameList: any[]=[];
  productName:any;
  IndustryTypes:any;
  region:any;
  stateName:any;
  FireSumInsured:any;
  IndustryType: any[]=[];
  TableRowFire: any[]=[];
  TableRowBurglary: any[]=[];
  LocationName: any;
  CoveringDetails: any;
  DescriptionRisk: any;
  FirstLossSumInsured: any;
  currentBurglaryIndex:any=null;
  currentFireIndex:any=null;
  fireIndustypeList: any[]=[];
  industryTypeError: boolean=false;
  productNameError: boolean=false;
  fireSIError: boolean=false;
  coveringDetailsError: boolean=false;
  descriptionRiskError: boolean=false;
  locationNameError: boolean;
  regionError: boolean;
  districtError: boolean;
  fireIndustryList: any[]=[];
  IndustryTypeValue: any=null;
  industryDesc: any=null;
  sectionDesc: any=null;
  modifiedYN: string;
  exchangeRateError: boolean;
  regionName: any=null;currentSectionIndex:any=null;
  stateDesc: any=null; TableRowEE: any[]=[];model: {};
  dropList: any[]=[];Moneyform: boolean=false;TableRowMoney: any[]=[];tableRowPA:any[]=[];
  contentTypeError: boolean=false;
  salaryError: boolean=false;
  yearsList: any[]=[];
  BondTypeList: any[]=[];
  bondTypeError: boolean;
  noYearsError: boolean;
  BondSumSIError: boolean;
  editPAStatus: boolean=false;
  currentPAIndex: any=0;
  currentMoneyIndex: any=0;
  MoneyAnnualEstimateError:boolean=false;
  MoneyCollectorError: boolean=false;
  MoneySafeLimitError: boolean=false;
  StrongroomSiError: boolean=false;
  MoneyMajorLossError: boolean=false;
  MoneyDirectorResidenceError:boolean=false;
  isEEForm: boolean=false;
  contentTypeDuplicateError: boolean=false;
  currentEEIndex: any=0;
  fireSectionList: any[]=[];
  sumInsuredError:boolean=false;
  PersonNameError: boolean=false;
  LocationNameError:boolean=false;
  OccupationError:boolean=false;
  DobError: boolean=false;SerialError: boolean=false;DescriptionError: boolean=false;sumInsuredList: any;
  firstLossList: any[]=[];businessInterruptionList: any[]=[];
  EEError: boolean=false;BusinessName:any=null;BondError: boolean=false;endorseShortCode:any=null;
  endorseCategory: any=null;endorsementName: any=null;endorsementId: any=null;  
  businessNameError: boolean;bankList:any[]=[];BusinessSumInsured: any='0';businessSIError: boolean=false;
  enablePolicyStart: boolean;
  enablePolicyEnd: boolean;
  enableCurrency: boolean;
  enableAddVehicle: boolean;
  enableRemoveVehicle: boolean;
  enableCustomerDetails: boolean;
  LocationListAlt: any[]=[];
  nonMotorProductItem: any;
  tabIndex: any=0;
  moneySIError: boolean;
  ElecEquipSIError: boolean;ContentError: boolean;SerialNoError: boolean;firstSIError: boolean;currentVehicleIndex: number;sectionError: boolean=false;
  constructor(private router: Router,private sharedService: SharedService,private datePipe:DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.countryId = this.userDetails.Result.CountryId;
    this.productId = this.userDetails.Result.ProductId;
    this.currencyCode = this.userDetails.Result.CurrencyId;
    console.log('product Idssssss',this.productId);
    this.insuranceId = this.userDetails.Result.InsuranceId;
    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
    if(endorseObj){
      this.endorsementSection = true;
      this.endorsementDetails = endorseObj;
      this.endorseCategory = endorseObj.Category;
      this.endorsementName = endorseObj?.EndtName;
      this.endorsementId = endorseObj.EndtTypeId;
      this.endtStatus = endorseObj.EndtStatus
      this.endorsePolicyNo = endorseObj.PolicyNo;
      this.endorseShortCode = endorseObj?.EndtShortCode;
      this.enableFieldsList = endorseObj.FieldsAllowed;
      this.endorseEffectiveDate = endorseObj?.EffectiveDate;
      this.endorsementRemarks = endorseObj?.Remarks;
      this.endtCount = endorseObj?.EndtCount;
      this.endorsementTypeDesc = endorseObj?.EndtName;
      this.endtPrevPolicyNo = endorseObj?.EndtPrevPolicyNo;
      this.endtPrevQuoteNo = endorseObj?.EndtPrevQuoteNo;
      this.isFinanceEndt = endorseObj?.IsFinanceEndt;
      this.orginalPolicyNo = sessionStorage.getItem('endorsePolicyNo');
      if(this.endorseShortCode!=42){
        this.enablePolicyStart = this.enableFieldsList.some(ele=>ele=='policyStartDate' || ele=='PolicyStartDate');
        this.enablePolicyEnd = this.enableFieldsList.some(ele=>ele=='policyEndDate' || ele=='PolicyEndDate');
        this.enableCurrency = this.enableFieldsList.some(ele=>ele=='Currency');
        this.enableAddVehicle = this.enableFieldsList.some(ele=>ele=='addVehicle');
        this.enableRemoveVehicle = this.enableFieldsList.some(ele=>ele=='removeVehicle');
        this.enableCustomerDetails = this.enableFieldsList.some(ele=>ele=='customerName' || ele=='Title');
    }
    else{
      this.enablePolicyStart = false;this.enablePolicyEnd = false;this.enableCurrency = false;this.enableCustomerDetails=false;
      this.enableAddVehicle = false;this.enableRemoveVehicle=false;
    } 
    }
    else{this.endorsementSection=false}
    let finalize = sessionStorage.getItem('FinalizeYN');
    if(finalize) this.finalizeYN = finalize;
    this.subuserType = sessionStorage.getItem('typeValue');
    let custId = sessionStorage.getItem('customerReferenceNo');
    if(this.userType!='Issuer'){
      this.customerCode = this.userDetails.Result.CustomerCode;
      this.customerName = this.userDetails.Result.UserName;
    }
    if(!custId){
      this.onSearchCustomer();
    }
    else{
      this.referenceNo = custId
      this.getCustomerDetails(this.referenceNo);
    }
    this.getCurrencyList();
    //this.productId != '59'
    if ( this.productId != '59' && this.productId != '19' && this.productId != '46' && this.productId != '42' && this.productId != '43' && this.productId!='39' && this.productId!='16' && this.productId!='1' && this.productId!='25' && this.productId!='21' && this.productId!='26' && this.productId!='27' && this.productId!='56') {
      this.getOccupationList(null);
    }
    this.relationTypeList = [
      {"Code":"1","CodeDesc":"Principal"},
      {"Code":"2","CodeDesc":"Spouse"},
      {"Code":"3","CodeDesc":"Child"},
    ]
    this.inPatientSIList = [
      {"Code":"100000","CodeDesc":"1,00,000"},
      {"Code":"500000","CodeDesc":"5,00,000"},
      {"Code":"1000000","CodeDesc":"10,00,000"},
    ];
    this.getSourceList();
    this.getUWDetails();
  }
  ngOnInit(){
    this.productItem = new ProductData();
    if(this.productId=='61' || this.productId=='25' || this.productId=='16'  ||  this.productId=='39'
      || this.productId=='1' || this.productId=='14' || this.productId=='13' || this.productId=='15' ||  this.productId=='32' ||  this.productId=='6'){this.nonMotorProductItem = new NonMotorProducts(); console.log("Final Products",this.nonMotorProductItem);this.LocationListAlt = this.nonMotorProductItem.LocationList;this.LocationListAlt[0].LocationId = this.LocationListAlt.length;if(this.productId!='14' && this.productId!='32')this.currentSectionIndex=0;}
   
    
    this.productItem.BuildingOwnerYn = 'Y';
    this.PlanBenefitsHeader = [ 'Cover Id','Cover Name','SubCover Details'];
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      this.adminSection = true;this.issuerSection = false;
    }
    else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
    else this.issuerSection = false
     this.currencyCode = this.userDetails?.Result?.CurrencyId;
    if(!this.endorsementSection){
      this.queryHeader1 = [ 'No Of Employees','Sum Insured','Occupation','Action','Delete'];
      this.queryHeader4 = [ 'No Of Employees','Sum Insured','Action','Delete'];
      this.queryHeader5 = [ 'Types Of Bond','Number Of Years','Sum Insured','Action','Delete'];
    } 
    else{
      this.queryHeader1 = [ 'No Of Employees','Sum Insured','Occupation'];
      this.queryHeader4 = [ 'No Of Employees','Sum Insured'];
      this.queryHeader5 = [ 'Types Of Bond','Number Of Years','Sum Insured'];
    } 
    
    
    this.groupHeader = [
     'No Of Persons','Occupation','Death Sum Insured','Temporary Disability','Permanant Disability','Medical','Funeral Expense','Action','Delete'
    ];
    this.customerColumn = [ 'Select','Reference No','Customer Name',  'Customer Type','ID Number'];
    if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='15' || this.productId=='32' || this.productId=='1' || this.productId=='21'
    || this.productId=='26' || this.productId=='25' || this.productId=='13' || this.productId=='57' || this.productId=='61'){this.getIndustryList();}
    this.policyStartDate = new Date();
    this.onStartDateChange('change');
    this.setProductSections();
    this.onproductdisplay();
    if(this.productId=='4'){
      this.getCountryList() ;
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
      this.getExistingTravelDetails();
      }
    }
    if(this.productId=='61'){
      this.getIndustryList() ;
      
    }
    // if(this.productId=='25' || this.productId=='6' || this.productId=='16' || this.productId=='27' || this.productId=='39'){
    //   this.getFirstLossPayeeList();
    // }
     if(this.productId=='6')
      {
        
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.requestReferenceNo = referenceNo;
          this.getFireRiskDetails();
        }
        else{
          this.requestReferenceNo = null;
          this.IndustryTypes = '56';
          this.TableRowFire=[];
          this.getRegionList();
          this.getFireIndustryTypeList();
          this.getFireIndustryList('direct');
          this.getFireSectionList();
        }
        // this.productNameList = [
        //   { Code:null,CodeDesc:'-Select-'},
        //   { Code:' Fire Class I ',CodeDesc:'Fire Class I'},
        // {Code:'FIRE GIN',CodeDesc:'FIRE GIN' },
        // {Code:'FIRE LOSS OF PROFIT GIN(For Indemity period of Less than One year)',
        //   CodeDesc:'FIRE LOSS OF PROFIT GIN(For Indemity period of Less than One year)'},
        // {Code:'FIRE LOSS OF PROFIT GIN(For Indemity period of One year)',
        //   CodeDesc:'FIRE LOSS OF PROFIT GIN(For Indemity period of One year)'},
        // { Code:'FIRE LOSS OF PROFIT Other than  Class 1 other than Makuti FOR INDEMNITY PERIOD OF LESS THAN  ONE Year',
        //   CodeDesc:'FIRE LOSS OF PROFIT Other than  Class 1 other than Makuti FOR INDEMNITY PERIOD OF LESS THAN  ONE Year'},
        // {Code:'FIRE LOSS OF PROFIT Other than  Class 1 other than Makuti FOR INDEMNITY PERIOD OF ONE Year',
        //   CodeDesc:'FIRE LOSS OF PROFIT Other than  Class 1 other than Makuti FOR INDEMNITY PERIOD OF ONE Year' },
        // {Code:'FIRE LOSS OF PROFIT(For indemity period of less than one year=0.75 * fire rate) Class I',
        //   CodeDesc:'FIRE LOSS OF PROFIT(For indemity period of less than one year=0.75 * fire rate) Class I' },
        // { Code:'FIRE LOSS OF PROFIT(For indemity period of one year=fire rate) Class I',
        //   CodeDesc:'FIRE LOSS OF PROFIT(For indemity period of one year=fire rate) Class I' },
        // { Code:'Fire other than  Class 1 other than Makuti',
        //   CodeDesc:'Fire other than  Class 1 other than Makuti' },
        // {Code:'FIRE(RATING FOR MAKUTI/THATCHED CONSTRUCTION)',
        //   CodeDesc:'FIRE(RATING FOR MAKUTI/THATCHED CONSTRUCTION)'},
        // { Code:'Fire-Class I Floater policies',
        //   CodeDesc:'Fire-Class I Floater policies'},
        // ]
      }
      if(this.productId=='1'){
        //this.TableRowBurglary=[{}]
        
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.getBurglaryDetails(null);
        }
        // this.currentBurglaryIndex=0
      }
      if(this.productId=='16'){
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
        //this.TableRowBurglary=[{}]
        // this.getRegionList();
        // this.ongetDistrictList('direct');
        // this.currentBurglaryIndex=0
        }
      }
      if(this.productId=='61'){
        this.getNOYears();
        this.getBondType();
      }
      // if(this.productId=='27'){
      //   this.getRegionList();
      // }
  }
  onDeleteLocationAlt(index){
    this.LocationListAlt.splice(index,1);
  }
  checkLocationDetail(){
    if(this.LocationListAlt.length!=0){
      return (this.LocationListAlt[0].LocationName!='' && this.LocationListAlt[0].LocationName!=null);
    }
    else return false;
  }
  addLocationAlt(){
    let entry= new NonMotorProducts();
    entry.LocationList[0].LocationId = this.LocationList.length+1;
    this.LocationListAlt.push(entry.LocationList[0])
  }
  onChangeTab(index){this.tabIndex=index;}
  onChangeIndusty(){
    let entry = this.fireIndustryList.find(ele=>ele.Code==this.productItem.OccupationId)?.CodeDesc;
    if(entry) this.productItem.OccupationDesc = entry;
  }
  onChangeSection(){
    let entry = this.productNameList.find(ele=>ele.Code==this.productItem.Section)?.CodeDesc;
    if(entry) this.productItem.SectionDesc = entry;
  }
  onChangeBusiness(){
    let entry = this.productItem.BusinessName;
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){if(field.key=='BusinessSI'){
      if(entry!='' && entry!='0' && entry!=undefined && entry!=null){field.props.disabled=false;}
      else{this.productItem.BusinessSI='0';field.formControl.setValue('0'); field.props.disabled=true;}
    }}
    
  }
  checkDatesDisabled(){
    return (new Date(this.policyStartDate)).setHours(0,0,0,0) < (new Date()).setHours(0,0,0,0)
  }
  openEE(){
    this.isEEForm=true;
  }
  index(data){
  }
//  getFirstLossPayeeList(){
//     let branchCode = '';
//     if((this.userType!='Broker' && this.userType!='User')){
//       branchCode = this.branchCode
//     }
//     else{
//       branchCode = this.brokerbranchCode
//     }
//     let ReqObj = {
//       "InsuranceId": this.insuranceId,
//       "BranchCode": branchCode
//     }
//     let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
//     this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
//       (data: any) => {
//        // let obj=[{Code:"None",CodeDesc:"None"}]
//         let defaultObj = [{ 'label': '-Select-', 'value': "None" }]
//         this.bankList = data.Result;
//         for (let i = 0; i < this.bankList.length; i++) {
//           this.bankList[i].label = this.bankList[i]['CodeDesc'];
//           this.bankList[i].value = this.bankList[i]['Code'];
//         //   delete this.dropList[i].CodeDesc;
//         //   if (i == this.dropList.length - 1) {
//         if(this.productId=='25'){
//           this.fields[0].fieldGroup[0].fieldGroup[3].templateOptions.options = defaultObj.concat(this.bankList);
//         }
//         else if(this.productId=='16'){
//             //money
//             this.fields[0].fieldGroup[0].fieldGroup[10].templateOptions.options = defaultObj.concat(this.bankList);
//         }
//         else if(this.productId=='27'){
//             //pl
//             this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].templateOptions.options = defaultObj.concat(this.bankList);
//         }
//         else if(this.productId=='39'){
//           this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = defaultObj.concat(this.bankList);
//         }
//         else if(this.productId=='6'){

//         }
//         //   }
//         } //this.bankList = obj.concat(data.Result);
//       })
    
//   } 
  getBondDetails(){
    let SectionId;
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if(homeDetails){
       SectionId = homeDetails[0].SectionId[0];
    }
    else {
      SectionId = this.SectionId;
    }
  let ReqObj = {
    "RequestReferenceNo": referenceNo,
    "RiskId": "1",
    "SectionId": SectionId,
     "InsuranceId":this.insuranceId,
     "Type":"GetAll"
    }
  let urlLink = `${this.motorApiUrl}api/slide20/getBond`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result!=0){
        this.fieldsBond[0].formControl.setValue(this.IndustryId);
        this.fieldsBond[1].formControl.setValue(data.Result[0].BondType);
        this.fieldsBond[2].formControl.setValue(data.Result[0].BondYear);
        this.fieldsBond[3].formControl.setValue(data.Result[0].BondSuminsured);
        this.getIndustryList();
      }

    },
    (err) => { },
  );
  }
  onChangeBusinessSection(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "IndustryType":this.productItem.Section
    }
    let urlLink = `${this.CommonApiUrl}api/getByIndsutryType`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.businessInterruptionList = data.Result;
          if (this.businessInterruptionList.length != 0) {
            for (let i = 0; i < this.businessInterruptionList.length; i++) {
              this.businessInterruptionList[i].label = this.businessInterruptionList[i]['CodeDesc'];
              this.businessInterruptionList[i].value = this.businessInterruptionList[i]['Code'];
              if (i == this.businessInterruptionList.length - 1) {
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for(let field of fieldList){
                    if(field.key=='BusinessName'){
                        field.props.options = defaultObj.concat(this.businessInterruptionList);
                    }
                }
                 //this.fields[0].fieldGroup[0].fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.fireIndustypeList);
                  this.showSection=true;
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getFireRiskDetails(){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "SectionId":'555'
    }
    let urlLink = `${this.motorApiUrl}api/slide14/getbuilding`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
            if(data.Result.length!=0){
              let list = data.Result;
              let dataList=[],i=0;
              for(let entry of list){
                let filterList = list.filter(ele=>ele.RiskId==entry.RiskId && ele.SectionId==ele.Business_Interruption);
                if(filterList.length!=0){entry['Business_InterruptionSI']=filterList[0].BuildingSumInsured}
                else{entry['Business_InterruptionSI']='0';}
                dataList.push(entry);
                i+=1;
                if(i==list.length){
                  let entryList = dataList.filter(ele=>ele.SectionId!='0');
                  if(entryList.length!=0){
                    let details = entryList[0];
                    let startDate=null,endDate=null;
                    startDate = details.PolicyStartDate;
                    endDate = details.PolicyEndDate;
                    this.sourceCodeDesc=details.SourceType
                    this.Code= details?.SourceTypeId;
                    if(this.Code)this.onSourceTypeChange('direct')
                    this.customerCode=details?.CustomerCode,
                    this.commonDetails = [
                      {
                          "PolicyStartDate": startDate,
                          "PolicyEndDate": endDate,
                          "Currency": details?.Currency,
                          "SectionId": details?.SectionIds,
                          "AcexecutiveId": "",
                          "ExchangeRate": details?.ExchangeRate,
                          "StateExtent": "",
                          "NoOfDays": details?.NoOfDays,
                          "HavePromoCode": details?.Havepromocode,
                          "PromoCode": details?.Promocode,
                          "SourceType": details?.SourceType,
                          "BrokerCode": details?.BrokerCode,
                          "BranchCode": details?.BranchCode,
                          "BrokerBranchCode": details?.BrokerBranchCode,
                          "CustomerCode": details?.CustomerCode,
                          "CustomerName": details?.CustomerName,
                          "LoginId": null,
                          "IndustryName": null
                      }
                    ]
                    sessionStorage.setItem('homeCommonDetails',JSON.stringify(this.commonDetails));
                    this.currencyCode = this.commonDetails[0].Currency;
                      let k=0;
                      for(let entry of entryList){
                        entry['Saved']='Y';
                        k+=1;
                        if(k==entryList.length)  this.TableRowFire = entryList;
                      }
                      this.IndustryTypes = '56';
                      this.getRegionList();
                      this.getFireIndustryTypeList();
                      this.getFireIndustryList('direct');
                      this.getFireSectionList();
                      this.formSection=true;
                  }
                  else{
                    this.IndustryTypes = '56';
                    this.TableRowFire=[];
                    this.getRegionList();
                    this.getFireIndustryTypeList();
                    this.getFireIndustryList('direct');
                    this.getFireSectionList();
                    this.formSection=true;
                  }
                }
              }
             
            }
            else{
              this.IndustryTypes = '56';
              this.TableRowFire=[];
              this.formSection = true;
              this.getRegionList();
              this.getFireIndustryTypeList();
              this.getFireIndustryList('direct');
              this.getFireSectionList();
            }
        }
      });
  }
  getFireIndustryTypeList(){
    let ReqObj = {
      "CategoryId": "99999",
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = []
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.fireIndustypeList = obj.concat(data.Result);
          if (this.fireIndustypeList.length != 0) {
            for (let i = 0; i < this.fireIndustypeList.length; i++) {
              this.fireIndustypeList[i].label = this.fireIndustypeList[i]['CodeDesc'];
              this.fireIndustypeList[i].value = this.fireIndustypeList[i]['Code'];
              if (i == this.fireIndustypeList.length - 1) {
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for(let field of fieldList){
                    if(field.key=='InsuranceType'){
                        field.props.options = this.fireIndustypeList;
                    }
                }
                 //this.fields[0].fieldGroup[0].fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.fireIndustypeList);
                  this.showSection=true;
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getFireIndustryList(type){
    if(type=='change') this.IndustryId = null;
    let ReqObj = {
      "CategoryId": this.productItem.InsuranceType,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dp/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.fireIndustryList = data.Result;
          if (this.fireIndustryList.length != 0) {
            for (let i = 0; i < this.fireIndustryList.length; i++) {
              this.fireIndustryList[i].label = this.fireIndustryList[i]['CodeDesc'];
              this.fireIndustryList[i].value = this.fireIndustryList[i]['Code'];
              if (i == this.fireIndustryList.length - 1) {
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for(let field of fieldList){
                    if(field.key=='OccupationId'){
                        field.props.options = defaultObj.concat(this.fireIndustryList);
                    }
                }
                 //this.fields[0].fieldGroup[0].fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.fireIndustypeList);
                  this.showSection=true;
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getFireIndustryDesc(emp){
    let entry = this.fireIndustypeList.find(ele=>ele.Code==emp);
    if(entry!=undefined) return entry.CodeDesc;
    else return ''
  }
  getFireSectionList(){
    let ReqObj = {
       "InsuranceId": this.insuranceId,
        "ItemType": "Insurance_type"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.fireSectionList = data.Result;
          this.productNameList  = data.Result;
          this.filterSectionList('direct')
        }
      },
      (err) => { },
    );
  }
  Firedelete(index,rowData){
   
    if(rowData['Saved']=='Y'){
      Swal.fire({
        title: '<strong> &nbsp;Delete Location!</strong>',
        iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
              Are You Sure Want to Delete this Details?
            </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              showCancelButton:true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
              confirmButtonText: 'Delete!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            let list = this.TableRowFire.filter(ele=>ele.RiskId==rowData.RiskId);
            if(list.length!=0){
              let finalList = [],i=0;
              for(let obj of list){
                let entry={
                  "RequestReferenceNo": this.requestReferenceNo,
                  "RiskId":obj?.RiskId,
                  "SectionId": obj?.SectionId
                }
                finalList.push(entry);
                i+=1;
                if(i==list.length){
                  console.log("Final Delete Fire List",finalList)
                  let urlLink = `${this.motorApiUrl}api/deletefire`;
                  this.sharedService.onPostMethodSync(urlLink,finalList).subscribe(
                    (data: any) => {
                        this.TableRowFire.splice(index,1);
                        this.productName='';this.IndustryTypes='56';this.LocationName='';
                        this.industryValue='';this.region='';this.stateName='';this.FireSumInsured='';
                        this.CoveringDetails='';this.DescriptionRisk='';this.industryDesc =null;this.sectionDesc=null;this.IndustryTypeValue=null;
                        this.currentFireIndex=null;
                    },
                    (err) => { },
                  );
                }
              }
            }
            // let ReqObj={
            //   "RequestReferenceNo": this.requestReferenceNo,
            //   "RiskId":rowData?.RiskId,
            //   "SectionId": rowData?.SectionId
            // }
            
                  
              
          }
        });
    }
    else{
      this.TableRowFire.splice(index,1);
      this.productName='';this.IndustryTypes='56';this.LocationName='';
      this.industryValue='';this.region='';this.stateName='';this.FireSumInsured='';
      this.CoveringDetails='';this.DescriptionRisk='';this.industryDesc =null;this.sectionDesc=null;this.IndustryTypeValue=null;
      this.currentFireIndex=null;
    }
  }
  BurglaryDelete(index){
    this.TableRowBurglary.splice(index,1);
  }
  onEditBurglary(rowData,index){
    // this.productItem = new ProductData();
     this.editss=true;
     this.editEmp=true;
     let edit = this.TableRowBurglary.findIndex(ele=>ele.LocationName == rowData.LocationName );
     this.currentBurglaryIndex = index;
     if(edit==undefined) this.currentBurglaryIndex=index+1;
     if(rowData.FirstLossPercentId){
       this.fields[0].fieldGroup[0].fieldGroup[1].formControl.setValue(rowData.FirstLossPercentId);
     }
    //this.productItem.DistrictCode = rowData.DistrictCode;
    this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(rowData.IndustryType);
    
    this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(rowData.BurglarySi);
    this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(rowData.LocationName);
     this.fields[0].fieldGroup[0].fieldGroup[4].formControl.setValue(rowData.CoveringDetails);
     this.fields[0].fieldGroup[0].fieldGroup[5].formControl.setValue(rowData.DescriptionOfRisk);
     this.fields[0].fieldGroup[0].fieldGroup[6].formControl.setValue(rowData.RegionCode);
     this.fields[0].fieldGroup[0].fieldGroup[7].formControl.setValue(rowData.DistrictCode);
    this.productItem.FireSumInsured = rowData.FirstLossPercentId
   }
   filterSectionList(type){
    if(this.productItem.InsuranceType=='57'){}
    else{this.productNameList=this.fireSectionList.filter(ele=>ele.IndustryType!='G')};
    if(type=='change') this.industryValue = null;
    if (this.productNameList.length != 0) {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      for (let i = 0; i < this.productNameList.length; i++) {
        this.productNameList[i].label = this.productNameList[i]['CodeDesc'];
        this.productNameList[i].value = this.productNameList[i]['Code'];
        if (i == this.productNameList.length - 1) {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for(let field of fieldList){
              if(field.key=='Section'){
                  field.props.options = defaultObj.concat(this.productNameList);
                  
              }
          }
           //this.fields[0].fieldGroup[0].fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.fireIndustypeList);
            this.showSection=true;
        }
      }
    }
    }
   onEditFire(rowData){
       this.editss=true;
       this.editEmp=true;
       let edit = this.TableRowFire.findIndex(ele=>ele.OccupationId == rowData.OccupationId && ele.SectionId==rowData.SectionId);
       this.currentFireIndex = edit;
       this.productName = rowData.SectionId;
       this.sectionDesc = rowData.SectionDesc;
       this.IndustryTypes = rowData.IndustryType;
       this.IndustryTypeValue = rowData.IndustryTypeDesc;
       this.getFireIndustryList('direct');
       this.industryValue = rowData.OccupationId;
       this.industryDesc = rowData.OccupationDesc;
       this.LocationName = rowData.LocationName;
       if(rowData.Business_Interruption!=null && rowData.Business_Interruption!='' && rowData.Business_Interruption!=undefined) this.BusinessName = Number(rowData.Business_Interruption);
       if(rowData.Business_InterruptionSI!=null && rowData.Business_InterruptionSI!='') this.BusinessSumInsured = rowData.Business_InterruptionSI;
       this.region = rowData.RegionCode;
       this.onChangeBusinessSection();
       this.filterSectionList('direct')
       this.ongetDistrictList('region',null);
       this.stateName = rowData.DistrictCode;
       this.FirstLossSumInsured= rowData.FirstLossSumInsured;
       this.FireSumInsured= rowData.BuildingSumInsured;
       this.CoveringDetails= rowData.CoveringDetails;
       this.DescriptionRisk= rowData.DescriptionOfRisk;
       
   }
  addFireTable(type){
    this.industryTypeError=false;this.industryError=false;
    let entry = this.checkFireValidation();
    if(entry){
      if(this.currentFireIndex!=null){
        let entry = this.TableRowFire[this.currentFireIndex];
        if(entry){
          entry['SectionId'] = this.productName;
          entry['SectionDesc'] = this.sectionDesc;
          entry['Status'] = "Y";
          entry['RiskId'] = String(this.currentFireIndex+1);
          entry['LocationName'] = this.LocationName;
          entry['BuildingAddress'] =  this.LocationName;
          entry['IndustryType'] = this.IndustryTypes;
          entry['IndustryTypeDesc'] = this.getFireIndustryDesc(this.IndustryTypes);
          entry['OccupationId'] = this.industryValue;
          entry['OccupationDesc'] = this.industryDesc;
          entry['CoveringDetails'] = this.CoveringDetails;
          entry['DescriptionOfRisk'] = this.DescriptionRisk;
          entry['RegionCode'] = this.region;
          entry['DistrictCode'] = this.stateName;
          entry['Business_Interruption'] = this.BusinessName;
          entry['Business_InterruptionSI'] = String(this.BusinessSumInsured).replaceAll(',','');
          entry['BusinessNameDesc'] = this.getBusinessNameDesc(this.BusinessName);
          entry['BuildingSumInsured'] = Number(String(this.FireSumInsured).replaceAll(',',''));
          this.onSaveFireRiskDetails(type);
        }
      } 
      else{
        this.TableRowFire.push({
            "SectionId": this.productName,
            "SectionDesc": this.sectionDesc,
            "Status": "Y",
            "RiskId": String(this.TableRowFire.length+1),
            "LocationName": this.LocationName,
            "BuildingAddress":  this.LocationName,
            "IndustryType": this.IndustryTypes,
            "IndustryTypeDesc": this.getFireIndustryDesc(this.IndustryTypes),
            "OccupationId": this.industryValue,
            "OccupationDesc": this.industryDesc,
            "CoveringDetails": this.CoveringDetails,
            "DescriptionOfRisk": this.DescriptionRisk,
            'Business_Interruption' : this.BusinessName,
            'Business_InterruptionSI' : String(this.BusinessSumInsured).replaceAll(',',''),
            'BusinessNameDesc' :this.getBusinessNameDesc(this.BusinessName),
            "RegionCode": this.region,
            "DistrictCode": this.stateName,
            "BuildingSumInsured":  Number(String(this.FireSumInsured).replaceAll(',',''))
          }
        )
        this.currentFireIndex = this.TableRowFire.length-1;
        this.onSaveFireRiskDetails(type);
      }
    }
  }
  getBusinessNameDesc(val){
      if(val!=null && val!='' && val!=undefined) return this.businessInterruptionList.find(ele=>ele.Code==val)?.CodeDesc;
      else return '';
  }
  checkFireValidation(){
    let i=0;
    if(this.IndustryTypes==null || this.IndustryTypes=='' || this.IndustryTypes==undefined){i+=1;this.industryTypeError=true;}
    else this.industryTypeError=false;
    if(this.industryValue==null || this.industryValue=='' || this.industryValue==undefined){i+=1;this.industryError=true;}
    else this.industryError=false;
    if(this.productName==null || this.productName=='' || this.productName==undefined){i+=1;this.productNameError=true;}
    else this.productNameError=false;
    if(this.FireSumInsured==null || this.FireSumInsured=='' || this.FireSumInsured==undefined || this.FireSumInsured==0 || this.FireSumInsured=='0'){i+=1;this.fireSIError=true;}
    else this.fireSIError=false;
    if(this.CoveringDetails==null || this.CoveringDetails=='' || this.CoveringDetails==undefined){i+=1;this.coveringDetailsError=true;}
    else this.coveringDetailsError=false;
    if(this.DescriptionRisk==null || this.DescriptionRisk=='' || this.DescriptionRisk==undefined){i+=1;this.descriptionRiskError=true;}
    else this.descriptionRiskError=false;
    if(this.LocationName==null || this.LocationName=='' || this.LocationName==undefined){i+=1;this.locationNameError=true;}
    else this.locationNameError=false;
    if(this.region==null || this.region=='' || this.region==undefined){i+=1;this.regionError=true;}
    else this.regionError=false;
    if(this.stateName==null || this.stateName=='' || this.stateName==undefined){i+=1;this.districtError=true;}
    else this.districtError=false;
    if((this.BusinessName==null || this.BusinessName=='' || this.BusinessName==undefined) && this.BusinessName!='0'){i+=1;this.businessNameError=true;}
    else{ this.businessNameError=false;
      if(this.BusinessName!='0' && this.BusinessName!=0 && (this.BusinessSumInsured==null || this.BusinessSumInsured=='0' || this.BusinessSumInsured==0)){i+=1;this.businessSIError=true}
      else if(this.BusinessName=='0' || this.BusinessName==0){ this.BusinessSumInsured='0';this.businessSIError=false;} 
      else{this.businessSIError=false;}
    }
    return i==0;
  }
  addBurglaryTable(rowData,type){
    let RiskId;
    let i= this.TableRowBurglary.length;
    if(rowData.LocationName!=undefined && rowData.BurglarySi!=undefined){
      let data = {
        "LocationName":rowData.LocationName,
        "IndustryType":rowData.IndustryType,
        "RegionCode":rowData.RegionCode,
        "DistrictCode": rowData.DistrictCode,
        "FirstLossSumInsured": rowData.FireSumInsured,
        "FirstLossPercentId":rowData.FireSumInsured,
        "sumInsured": rowData.BurglarySi,
        "BurglarySi": rowData.BurglarySi,
        "CoveringDetails": rowData.CoveringDetails,
        "DescriptionOfRisk": rowData.DescriptionOfRisk,
        "IndustryId":rowData.IndustryId,
        "RiskId": RiskId,
    }
      if(data.IndustryType!=null && data.IndustryType!='' && data.IndustryType!=undefined){
        data["IndustryTypeDesc"] = this.industryList.find(ele=>ele.Code==data.IndustryType)?.label;
      }
          if (this.currentBurglaryIndex !=null && this.currentBurglaryIndex!=undefined) {
            this.TableRowBurglary[this.currentBurglaryIndex] = data;
            this.currentBurglaryIndex=null;
          } else {
            if(type!='redirectType') this.TableRowBurglary.push(data);
            this.currentBurglaryIndex=null;
        } 
        if(this.requestReferenceNo==null || this.requestReferenceNo==undefined){this.saveCommonDetails('direct','save')}
        else if(type=='save' || type == 'redirectType') this.onSaveBurglaryDetails('save','individual')
        else if(type!='save')this.onFormSubmit(type)
        
    }
    else if(type!='save')this.onFormSubmit(type)  
  }
  checkTableRowFire(entry){
    return (entry.IndustryTypes!=null && entry.BuildingSumInsured!=0 && entry.BuildingSumInsured!='0' && entry.CoveringDetails!='' && entry.CoveringDetails!=null && entry.RegionName!=null && entry.RegionName!='' 
      && entry.DistrictName!=null && entry.DistrictName!='' && entry.SectionId!=null && entry.SectionId!='');
  }
  onSaveFireRiskDetails(type){
    this.tab
    if(this.TableRowFire.length!=0){
        let sectionIds = [],i=0,refNo=null;
        if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;}
        if(this.userType!='Broker' && this.userType!='User'){
            
        }
        else {
          this.sourceType = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
          this.customerName = this.userDetails?.Result.CustomerName
        } 
        let havePromoYN = 'Y';
        if(this.promocode==null || this.promocode=='' || this.promocode==undefined) havePromoYN = 'N'
        if(type=='Save'){
          let obj = this.TableRowFire[this.currentFireIndex];
          if(obj.Business_Interruption!=0){
            let businessSI = null;
            if(obj.Business_InterruptionSI) businessSI = obj.Business_InterruptionSI
            else businessSI = '0';
            let list = [
              {
                "SectionId": obj.SectionId,
                "SectionDesc": obj.SectionDesc,
                "Status": obj.SectionDesc,
                "RiskId": obj.RiskId,
                "LocationName": obj.LocationName,
                "BuildingAddress":  obj.BuildingAddress,
                "IndustryType": obj.IndustryType,
                "IndustryTypeDesc": obj.IndustryTypeDesc,
                "OccupationId": obj.OccupationId,
                "OccupationDesc": obj.OccupationDesc,
                "CoveringDetails": obj.CoveringDetails,
                "DescriptionOfRisk": obj.DescriptionOfRisk,
                'Business_Interruption' : obj.Business_Interruption,
                 'BusinessNameDesc' : obj.BusinessNameDesc,
                "RegionCode": obj.RegionCode,
                "DistrictCode": obj.DistrictCode,
                "BuildingSumInsured":  obj.BuildingSumInsured
              },
              {
                "SectionId": obj.Business_Interruption,
                "SectionDesc": obj.BusinessNameDesc,
                "Status": obj.SectionDesc,
                "RiskId": obj.RiskId,
                "LocationName": obj.LocationName,
                "BuildingAddress":  obj.BuildingAddress,
                "IndustryType": obj.IndustryType,
                "IndustryTypeDesc": obj.IndustryTypeDesc,
                "OccupationId": obj.OccupationId,
                "OccupationDesc": obj.OccupationDesc,
                "CoveringDetails": obj.CoveringDetails,
                "DescriptionOfRisk": obj.DescriptionOfRisk,
                'Business_Interruption' : obj.Business_Interruption,
                'BusinessNameDesc' : obj.BusinessNameDesc,
                "RegionCode": obj.RegionCode,
                "DistrictCode": obj.DistrictCode,
                "BuildingSumInsured":  businessSI
              }
            ];
            // let listIndex=0;
            // for(let entry of list){listIndex+=1;this.onFinalSaveFire(entry,sectionIds,type,refNo,havePromoYN,null,listIndex)}
            let totalList = this.TableRowFire.filter(ele=>ele.RiskId!=obj.RiskId);
            totalList = totalList.concat(list);
            this.onFinalSaveFireAlt(list,sectionIds,type,refNo,havePromoYN,null,null);
           
          }
          else{  this.onFinalSaveFireAlt(this.TableRowFire,sectionIds,type,refNo,havePromoYN,null,null);
            //this.onFinalSaveFire(obj,sectionIds,type,refNo,havePromoYN,null,0)

          }
        }
        else{
          let j=0;this.totalIndex=0;let finalList:any[]=[]
          for(let obj of this.TableRowFire){
              if(obj.Business_Interruption!=0){
                let businessSI = null;
                if(obj.Business_InterruptionSI) businessSI = obj.Business_InterruptionSI
                else businessSI = '0';
                let list = [
                  {
                    "SectionId": obj.SectionId,
                    "SectionDesc": obj.SectionDesc,
                    "Status": obj.SectionDesc,
                    "RiskId": obj.RiskId,
                    "LocationName": obj.LocationName,
                    "BuildingAddress":  obj.BuildingAddress,
                    "IndustryType": obj.IndustryType,
                    "IndustryTypeDesc": obj.IndustryTypeDesc,
                    "OccupationId": obj.OccupationId,
                    "OccupationDesc": obj.OccupationDesc,
                    "CoveringDetails": obj.CoveringDetails,
                    "DescriptionOfRisk": obj.DescriptionOfRisk,
                    'Business_Interruption' : obj.Business_Interruption,
                     'BusinessNameDesc' : obj.BusinessNameDesc,
                    "RegionCode": obj.RegionCode,
                    "DistrictCode": obj.DistrictCode,
                    "BuildingSumInsured":  obj.BuildingSumInsured
                  },
                  {
                    "SectionId": obj.Business_Interruption,
                    "SectionDesc": obj.BusinessNameDesc,
                    "Status": obj.Status,
                    "RiskId": obj.RiskId,
                    "LocationName": obj.LocationName,
                    "BuildingAddress":  obj.BuildingAddress,
                    "IndustryType": obj.IndustryType,
                    "IndustryTypeDesc": obj.IndustryTypeDesc,
                    "OccupationId": obj.OccupationId,
                    "OccupationDesc": obj.OccupationDesc,
                    "CoveringDetails": obj.CoveringDetails,
                    "DescriptionOfRisk": obj.DescriptionOfRisk,
                    'Business_Interruption' : obj.Business_Interruption,
                    'BusinessNameDesc' : obj.BusinessNameDesc,
                    "RegionCode": obj.RegionCode,
                    "DistrictCode": obj.DistrictCode,
                    "BuildingSumInsured":  businessSI
                  }
                ];
                // let listIndex=0;
                // for(let entry of list){listIndex+=1;if(listIndex==2){j+=1}this.onFinalSaveFire(entry,sectionIds,type,refNo,havePromoYN,j,null)}
                if(!finalList.some(ele=>ele.RiskId==obj.RiskId)){
                  finalList = finalList.concat(list)
                  j+=1;
                  if(j==this.TableRowFire.length) this.onFinalSaveFireAlt(finalList,sectionIds,type,refNo,havePromoYN,j,null)
                }
                else{
                  j+=1;
                  if(j==this.TableRowFire.length) this.onFinalSaveFireAlt(finalList,sectionIds,type,refNo,havePromoYN,j,null)
                }
                
              }
              else{
                if(!finalList.some(ele=>ele.RiskId==obj.RiskId)){
                  finalList = finalList.concat([obj])
                  j+=1;
                  if(j==this.TableRowFire.length) this.onFinalSaveFireAlt(finalList,sectionIds,type,refNo,havePromoYN,j,null)
                }
                // this.onFinalSaveFire(obj,sectionIds,type,refNo,havePromoYN,j,null)
              }
          }
        }
    }
    else
    {
      this.fireError();
    }
   
  }
  fireError(){
    this.employeeError = true;
    Swal.fire({
      title: '<strong>Fire Details</strong>',
      icon: 'error',
      html:
        `Please Enter Atleast one Fire Detail`,
      //showCloseButton: true,
      //focusConfirm: false,
      showCancelButton: false,

      //confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    })
  
  }
  getTableRowFireList(){
    return this.TableRowFire.filter(ele=>ele.Business_Interruption!=ele.SectionId && String(ele.Business_Interruption)!=String(ele.SectionId))
  }
  onFinalSaveFireAlt(list,sectionIds,type,refNo,havePromoYN,index,subIndex){
    let sourcecode,appId;
    if (this.userType != 'Issuer') {
     // this.brokerCode = this.agencyCode;
      appId = "1";
    }
    else {
      appId = this.loginId;
      // loginId = this.brokerLoginId
      // brokerbranchCode = this.brokerBranchCode;
    }
  this.applicationId = appId;
    if(this.userType!= 'Broker' && this.userType != 'User'){
      sourcecode=this.Code
    }
    else{
      sourcecode=this.userType;
    }
    let valid = this.checkValidation();
    if(valid){
      let startDate=null,endDate=null,riskId=null;
      let dateList = String(this.policyStartDate).split('/');
      if(dateList.length==1) startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      else startDate=this.policyStartDate;
      let dateList2 = String(this.policyEndDate).split('/');
      if(dateList2.length==1) endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      else endDate=this.policyEndDate;
      let i=0,finalList:any[]=[];
      for(let entry of list){
        let SI = entry.BuildingSumInsured;
        if(typeof SI === 'string' || SI instanceof String) SI = Number(SI)
        let obj = {
         "RiskId": entry.RiskId,
        "SectionDesc": entry.SectionDesc,
         "BuildingSumInsured": SI,
         "LocationName": entry.LocationName,
         "IndustryType": entry.IndustryType,
         "IndustryTypeDesc": entry.IndustryTypeDesc,
         "OccupationId": entry.OccupationId,
         "OccupationDesc": entry.OccupationDesc,
         "CoveringDetails": entry.CoveringDetails,
         "DescriptionOfRisk": entry.DescriptionOfRisk,
         "Business_Interruption": entry.Business_Interruption,
         "RegionCode": entry.RegionCode,
         "DistrictCode": entry.DistrictCode,
         "Status": 'Y',
         "SectionId": entry.SectionId
        }
        finalList.push(obj); i+=1;
        if(i==list.length){this.onFireProceed(finalList,sectionIds,type,refNo,havePromoYN,index,subIndex,startDate,endDate)}
      }
    }
  }
  onFireProceed(finalList,sectionIds,type,refNo,havePromoYN,index,subIndex,startDate,endDate){
    let sourcecode,appId;
    if (this.userType != 'Issuer') {
     // this.brokerCode = this.agencyCode;
      appId = "1";
    }
    else {
      appId = this.loginId;
      // loginId = this.brokerLoginId
      // brokerbranchCode = this.brokerBranchCode;
    }
  this.applicationId = appId;
    if(this.userType!= 'Broker' && this.userType != 'User'){
      sourcecode=this.Code
    }
    else{
      sourcecode=this.userType;
    }
    if(this.brokerBranchCode==null) this.brokerBranchCode='1';
      let ReqObj={
        "FireDetails": finalList,
        "CreatedBy": this.loginId,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "RequestReferenceNo": this.requestReferenceNo,
        "EndorsementDate": null,
        "EndorsementEffectiveDate": null,
        "EndorsementRemarks": null,
        "EndorsementType": null,
        "EndorsementTypeDesc": null,
        "EndtCategoryDesc": null,
        "EndtCount": null,
        "EndtPrevPolicyNo": null,
        "EndtPrevQuoteNo": null,
        "EndtStatus": null,
        "IsFinanceEndt": null,
        "OrginalPolicyNo": null,
        "ExchangeRate": this.exchangeRate,
        "PolicyEndDate": endDate,
        "PolicyStartDate": startDate,
        "AgencyCode": this.agencyCode,
        "SubUsertype": this.subuserType,
        "BdmCode": this.customerCode,
        "BranchCode": this.branchCode,
        "Currency": this.currencyCode,
        "BrokerCode": null,
        "CustomerReferenceNo": refNo,
        "BrokerBranchCode": this.brokerBranchCode,
        "Havepromocode": havePromoYN,
        "BuildingOwnerYn": "Y",
        "CustomerName": this.customerName,
        "Status": "Y",
        "Usertype": this.userType,
        "SourceTypeId": sourcecode,
        "CustomerCode": this.customerCode,
        "ProductType": "A",
        "ApplicationId": this.applicationId
      }
      let urlLink = `${this.motorApiUrl}api/saveFire`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              if(data.Result.length!=0){
                this.requestReferenceNo = data.Result[0].RequestReferenceNo
                sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                this.onCalculateFire(data.Result,type,index,subIndex,null);
              }
            }
      });
  }
  onFinalSaveFire(obj,sectionIds,type,refNo,havePromoYN,index,subIndex){
    let sourcecode,appId;
    if (this.userType != 'Issuer') {
     // this.brokerCode = this.agencyCode;
      appId = "1";
    }
    else {
      appId = this.loginId;
      // loginId = this.brokerLoginId
      // brokerbranchCode = this.brokerBranchCode;
    }
  this.applicationId = appId;
    if(this.userType!= 'Broker' && this.userType != 'User'){
      sourcecode=this.Code
    }
    else{
      sourcecode=this.userType;
    }
    let valid = this.checkValidation();
    if(valid){
      let startDate=null,endDate=null,riskId=null;
      let dateList = String(this.policyStartDate).split('/');
      if(dateList.length==1) startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      else startDate=this.policyStartDate;
      let dateList2 = String(this.policyEndDate).split('/');
      if(dateList2.length==1) endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      else endDate=this.policyEndDate;
      if(index==null) riskId = this.currentFireIndex+1;
      else riskId=index+1;
      let ReqObj = {
        "CreatedBy": this.loginId,
          "InsuranceId": this.insuranceId,
          "ProductId": "6",
          "RequestReferenceNo": this.requestReferenceNo,
          "RiskId": obj.RiskId,
          "Business_Interruption": obj.Business_Interruption,
          "EndorsementDate": null,
          "EndorsementEffectiveDate": null,
          "EndorsementRemarks": null,
          "EndorsementType": null,
          "EndorsementTypeDesc": null,
          "EndtCategoryDesc": null,
          "EndtCount": null,
          "EndtPrevPolicyNo": null,
          "EndtPrevQuoteNo": null,
          "EndtStatus": null,
          "IsFinanceEndt": null,
          "OrginalPolicyNo": null,
          "ExchangeRate": this.exchangeRate,
          "PolicyEndDate":endDate,
          "PolicyStartDate": startDate,
          "SectionId": obj.SectionId,
          "AgencyCode": this.agencyCode,
          "SubUsertype": this.subuserType,
          "BdmCode": this.customerCode,
          "BranchCode": this.branchCode,
          "Currency": this.currencyCode,
          "BrokerCode": this.brokerCode,
          "CustomerReferenceNo": refNo,
          "BrokerBranchCode": this.brokerbranchCode,
          "Havepromocode": havePromoYN,
          "BuildingOwnerYn": "Y",
          "CustomerName": this.customerName,
          "SectionDesc": obj.SectionDesc,
          "Status": "Y",
          "LocationName": obj.LocationName,
          "BuildingAddress": "",
          "IndustryType": obj.IndustryType,
          "IndustryTypeDesc": obj.IndustryTypeDesc,
          "OccupationId": obj.OccupationId,
          "OccupationDesc": obj.OccupationDesc,
          "CoveringDetails": obj.CoveringDetails,
          "DescriptionOfRisk": obj.DescriptionOfRisk,
          "RegionCode": obj.RegionCode,
          "DistrictCode": obj.DistrictCode,
          "BuildingSumInsured": obj.BuildingSumInsured,
          "Usertype": this.userType,
          "SourceTypeId": sourcecode,
          "CustomerCode": this.customerCode,
          "ProductType":"A",
          "ApplicationId": this.applicationId
      }
      let urlLink = `${this.motorApiUrl}api/saveFire`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            if(data.Result.length!=0){
                obj['MSRefNo'] = data?.Result[0]?.MSRefNo;
                obj['CdRefNo'] = data?.Result[0]?.CdRefNo;
                obj['VdRefNo'] = data?.Result[0]?.VdRefNo;
                sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                this.onCalculateFire(data.Result,type,index,subIndex,obj);
            }
          }
          else{alert('Null Response')}
        });
    }
  }
  onCalculateFire(buildDetails,type,index,subIndex,subObj) {
    let createdBy = ""
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP') {
      createdBy = ""
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    else createdBy = this.loginId;
    if (buildDetails.length != 0) {
      this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
      sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
      let i = 0;
      for (let build of buildDetails) {
        let effectiveDate = null, coverModificationYN = 'N';
        let startDate = null,endDate=null;
        let dateList2 = String(this.policyEndDate).split('/');
        if(dateList2.length==1) endDate =  this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
        else endDate = this.policyEndDate
        let dateList1 = String(this.policyStartDate).split('/');
        if(dateList1.length==1) startDate =  this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
        else startDate = this.policyStartDate
        if (this.endorsementSection) {
          effectiveDate = this.endorseEffectiveDate;
          // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
          // if (entry || this.endorsementId == 846) coverModificationYN = 'Y';
          // else coverModificationYN = 'N';
          if(this.endorseCoverModification && this.endorsementId==844) coverModificationYN = 'Y'
          else if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
        }
        else {
          effectiveDate = startDate;
        }
        
        if(this.productId=='46') build['RiskId'] = '1';
        let sectionId = '';
        let locationId = '1';
        if(build.LocationId!=null && build.LocationId!=undefined) locationId=build.LocationId;
        let ReqObj = {
          "LocationId" : locationId,
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "SectionId": build.SectionId,
          "ProductId": this.productId,
          "MSRefNo": build.MSRefNo,
          "VehicleId": build.RiskId,
          "CdRefNo": build.CdRefNo,
          "VdRefNo": build.VdRefNo,
          "CreatedBy": this.loginId,
          "productId": this.productId,
          "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
          "EffectiveDate": effectiveDate,
          "PolicyEndDate": endDate,
          "CoverModification": coverModificationYN
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              let entry = data?.Result;
              i += 1;
              if (i == buildDetails.length) {
                  if(type=='Save'){
                    //if((subObj.Business_Interruption!=0 && subIndex==2) || subObj.Business_Interruption==0){
                      this.productName='';this.IndustryTypes='56';this.LocationName='';this.BusinessName='';
                      this.industryValue='';this.region='';this.stateName='';this.FireSumInsured='';
                      this.CoveringDetails='';this.DescriptionRisk='';this.industryDesc =null;this.sectionDesc=null;this.IndustryTypeValue=null;
                      this.currentFireIndex=null;this.BusinessSumInsured='0';
                      this.getFireRiskDetails();

                    //}
                  }
                  else{
                      this.router.navigate(['/quotation/plan/premium-details']);
                  }
              }
            }
          },
          (err) => { },
        );
      }
    }
  }
  getRelationTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/ratingrelationtypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.relationList = data.Result;
          if (this.relationList.length != 0) {
            for (let i = 0; i < this.relationList.length; i++) {
              this.relationList[i].label = this.relationList[i]['CodeDesc'];
              this.relationList[i].value = this.relationList[i]['Code'];
              delete this.relationList[i].CodeDesc;
              if (i == this.relationList.length - 1) {
                 this.fields[0].fieldGroup[0].fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.relationList);
                  this.showSection=true;
              }
            }
          }
        }
      });
  }
  getCountryList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/nationality`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.countryList = obj.concat(data.Result);
          if (this.travelDetails) {
            //this.setValues(this.travelDetails);
          }

        }
      },
      (err) => { },
    );
  }
  Increment(data){
    if(data=='kids'){
      this.kids=this.kids+1;
    }
    if(data=='adult'){
      this.adult=this.adult+1;
    }
    if(data=='senior'){
      this.senior=this.senior+1;
    }
    if(data=='superSenior'){
      this.superSenior=this.superSenior+1;
    }
    if(data=='grandSenior'){
      this.grandSenior=this.grandSenior+1;
    }
  }
  decrement(data){
    if(data=='kids'){
      this.kids=this.kids-1;
    }
    if(data=='adult'){
      this.adult=this.adult-1;
    }
    if(data=='senior'){
      this.senior=this.senior-1;
    }
    if(data=='superSenior'){
      this.superSenior=this.superSenior-1;
    }
    if(data=='grandSenior'){
      this.grandSenior=this.grandSenior-1;
    }
  }
  viewplanBenifits(){
    this.visible=true;
    let ReqObj = {
      "PlanTypeId": this.planType,
      //"PolicyTypeId":this.TravelForm.controls[''].value,
      //"PolicyTypeId":this.TravelForm.controls['PlanTypeId'].value,
      "PolicyTypeId": this.premium,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.motorApiUrl}api/gettravelpolicytype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
             this.headerData= data?.Result?.PlanTypeDesc;
             this.headerData1= data?.Result?.PolicyTypeDesc;
             this.coverData = data?.Result?.CoverDetails;
             //this.subCoverData = data?.Result?.CoverDetails?.SubCoverDetails;
            // console.log(this.subCoverData,"this.subCoverData");
             
            }
          });
        
      }
      onInnerData(rowData){
        this.subCoverDataList = [];
        rowData['subCoverData'] = rowData.SubCoverDetails;
         this.subCoverDataList = rowData.SubCoverDetails;
      }
  getplanTypeListDesc(planType){
      let entry = this.planTypeList.find(ele=>ele.Code==planType);
      if(entry){
        return entry.CodeDesc;
      }
      else return '';
    }
  premiunDropdown4(value) {
    let ReqObj = {
        "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.premiumList = obj.concat(data.Result);
          //  this.TravelForm.controls['SectionId'].setValue(value);
            this.SectionId=value;
          // if(type=='direct'){this.getPlanTypeList('direct')}
        }
      },
      (err) => { },
    );
  }
  getPlanTypeList(premium){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
      "SectionId": premium,
      "LoginId":this.loginId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.planTypeList = obj.concat(data.Result);
        }
      },
      (err) => { },
    );
  }

  
  getCommonDetails(){
    let urlLink:any;
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId":"1",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    //if(this.productId=='59') urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    urlLink = `${this.motorApiUrl}api/slide/getcommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let details = data.Result;
          let startDate=null,endDate=null;
          // if(this.updateComponent.policyStartDate!=null && this.updateComponent.policyStartDate!=''){
          //   // let dateList = String(this.updateComponent.policyStartDate).split('/');
          //   // if(dateList.length>1) startDate = this.updateComponent.policyStartDate;
          //   // else startDate = this.datePipe.transform(this.updateComponent.policyStartDate,'dd/MM/yyyy');
          //   // let dateList2 = String(this.updateComponent.policyEndDate).split('/');
          //   // if(dateList2.length>1) endDate = this.updateComponent.policyEndDate;
          //   // else endDate = this.datePipe.transform(this.updateComponent.policyEndDate,'dd/MM/yyyy');
           
          // }
            startDate = details.PolicyStartDate;
            endDate = details.PolicyEndDate;
            this.commonDetails = [
              {
                  "PolicyStartDate": startDate,
                  "PolicyEndDate": endDate,
                  "Currency": details?.Currency,
                  "SectionId": details?.SectionIds,
                  "AcexecutiveId": "",
                  "ExchangeRate": details?.ExchangeRate,
                  "StateExtent": "",
                  "NoOfDays": details?.NoOfDays,
                  "HavePromoCode": details?.Havepromocode,
                  "PromoCode": details?.Promocode,
                  "SourceType": details?.SourceType,
                  "BrokerCode": details?.BrokerCode,
                  "BranchCode": details?.BranchCode,
                  "BrokerBranchCode": details?.BrokerBranchCode,
                  "CustomerCode": details?.CustomerCode,
                  "CustomerName": details?.CustomerName,
                  "LoginId": null,
                  "IndustryName": null
              }
            ]
          sessionStorage.setItem('homeCommonDetails',JSON.stringify(this.commonDetails));
          this.currencyCode = this.commonDetails[0].Currency;
          if (this.productId != '59' && this.productId != '19' && this.productId!='24' && this.productId != '46' && this.productId != '42' && this.productId != '43' && this.productId!='39' && this.productId!='16' && this.productId!='1' && this.productId!='25' && this.productId!='21' && this.productId!='26' && this.productId!='27' && this.productId!='56') {
            this.getOccupationList(null);
          }
          this.ProductCode = details.SectionIds[0];
          if(this.productId=='56'){
              
              //let fireData = new EmployersLiability();
              let fireData = new HealthInsurance();
              let entry = [];
              let modelHooks = { onInit: (field: FormlyFieldConfig) => {
                  field.formControl.valueChanges.subscribe(() => {
                    this.onoccChangepersonalInd('change');
                  });
                } 
              }
              // console.log('HHHHHHHHHHHHHH',this.fields);
              // this.fields[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
              this.fields[0] = fireData?.fields[0];
         
              let referenceNo = sessionStorage.getItem('quoteReferenceNo');
              if (referenceNo) {
                this.requestReferenceNo = referenceNo;
                //this.updateComponent.referenceNo = referenceNo;
                this.getSectionList();
                this.setCommonFormValues(null);
                this.productItem = new ProductData();
                this.showSection=true;
               
              }
              else {
                  this.productItem = new ProductData();
                  this.formSection = true; this.viewSection = false;
              }
          }
          if(this.productId=='45'){
            this.currencyCode = 'TZS';
            this.paymentModeList = [
                {"Code":"01","CodeDesc":"Monthly"},
                {"Code":"02","CodeDesc":"Quarterly"},
                {"Code":"03","CodeDesc":"Half-Yearly"},
                {"Code":"04","CodeDesc":"Yearly"},
            ]
          }
          this.productItem = new ProductData();
          this.productItem.BuildingOwnerYn = 'Y';
          this.dobminDate = new Date();
        }
        if(!this.activeSection){this.activeSection=true;this.setProductSections();}
      });
  }
  getSectionList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
          this.sectionDropdownList = defaultObj.concat(data.Result);
        }
      });
  }
  setProductSections(){
    var d = new Date();
    let minDate = new Date();
    let regDate = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.dobDate = new Date(year - 18, month, day);
    if(this.customerDetails){
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.ownerName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
      if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
      //this.ownerCategory = this.customerDetails?.PolicyHolderType;
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
    }
    else{
      let referenceNo =  sessionStorage.getItem('customerReferenceNo');
      if(referenceNo){
        this.getCustomerDetails(referenceNo)
      }
    }
    if (this.productId == '13' && this.insuranceId!='100004') {
      this.fields = [
        {
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'offset-2 col-7',
                  type: 'input',
                  key: 'CustomerName',
                  props: {
                    label: 'Insurer Name',
                    disabled: this.checkDisable('CustomerName'),
                    required: true,
                    options: [

                    ],
                  },

                  expressions: {
                  },
                },
                {
                  className: 'offset-2 col-7',
                  key: 'Dob',
                  type: 'datepicker',
                  props: {
                    label: 'Date Of Birth',
                    disabled: this.checkDisable('Dob'),
                    required: true,
                    type: 'date',
                    datepickerOptions: {
                      max: this.dobDate
                    },
                  }
                },
                {
                  className: 'offset-2 col-7',
                  type: 'select',
                  key: 'OccupationType',
                  props: {
                    label: 'Occupation',
                    disabled: this.checkDisable('OccupationType'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
                    'props.disabled': '!model.CustomerName',
                  },
                },
                {
                  className: 'offset-2 col-7',
                  type: 'commaSeparator',
                  key: 'SalaryPerAnnum',

                  props: {
                    maxLength:15,
                    label: `Salary/Year (${this.currencyCode})`,
                    disabled: this.checkDisable('SalaryPerAnnum'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                      field.formControl.valueChanges.subscribe(() => {
                        this.getSIValue();
                      });
                    },
                  },
                  expressions: {
                  },
                },
                {
                  className: 'offset-2 col-7',
                  type: 'select',
                  key: 'BenefitCoverMonth',
                  props: {
                    label: 'Benefit Period',
                    disabled: this.checkDisable('BenefitCoverMonth'),
                    required: true,
                    options: [
                      { label: '12 Months', value: '12' },
                      { label: '24 Months', value: '24' },
                      { label: '36 Months', value: '36' },
                    ],
                  },
                  hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                      field.formControl.valueChanges.subscribe(() => {
                        this.getSIValue();
                      });
                    },
                  },
                  expressions: {
                    'props.disabled': '!model.CustomerName',
                  },
                },
                {
                  className: 'offset-2 col-7',
                  type: 'commaSeparator',
                  key: 'SumInsured',
                  props: {
                    maxLength:15,
                    label: `SumInsured  (${this.currencyCode})`,
                    disabled: this.checkDisable('SumInsured'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  expressions: {

                  },
                },
              ]
            }
          ],
        },
      ];
    }
    else if (this.productId == '14') {
      
    }
    else if (this.productId == '19' || this.productId=='59' || this.productId=='24') {
      //this.checkDomesticForm('direct')
    }
    else if (this.productId == '32') {
      
      
    }
    else if (this.productId == '46') {
      let fireData = new ShortTermVehicle();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let bodyTypeHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
              this.onBodyTypeChange('change');
        });
      } }
      let makeHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onMakeChange('change')
        });
      } }
      let modelHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onModelChange('change')
        });
      } }
      this.fields[0].fieldGroup[0].fieldGroup[0].hooks = bodyTypeHooks;
      this.fields[0].fieldGroup[0].fieldGroup[1].hooks = makeHooks;
      this.fields[0].fieldGroup[0].fieldGroup[2].hooks = modelHooks;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.vehicleDetailsList =[];this.vehicleId = null;
        this.getMotorDetails('direct');
        //this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.onBodyTypeChange('change');
          this.formSection = true; this.viewSection = false;
          if(this.customerDetails) this.productItem.OwnerName = this.customerDetails.ClientName;
          if(this.customerDetails?.PolicyHolderType){
            this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
          } 
          this.getFuelTypeList();
          this.getYearList();
          this.getColorsList();
          this.getBodyTypeList();
          this.getUsageList();
          this.getMotorCategoryList();
          //this.getMotorCategoryList();
      }
    }
    else if (this.productId == '1' && this.insuranceId !='100004') {
      
      let fireData = new Burglary();
      let entry = [];
      this.fields[0] = fireData?.fields;
      this.getRegionList();this.getFireLossList();
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change',null)
        });
      } }
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      console.log("Final Field List",fieldList)
      for(let field of fieldList){
        if(field.key=='RegionCode') field.hooks = regionHooks;
      }

      //  this.getNatureTradeList();
      //  this.getInsuranceForList();
      //  this.getWallMaterialList();
      //  this.buglaryloss();
      //  this.getRoofMaterialList();
      //  this.getCeilingMaterialList();
      //  this.getRegionList();
      //  this.getWindowConsMaterialList();
      //  this.getDoorsMaterilalList(); this.getNightLeftDoorList(); this.getBuildingOccupiedList();
      this.getRegionList();
       let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
       if(this.productId!='4') this.getExistingBuildingList();
        this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    if(this.productId=='56'){
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        // this.updateComponent.referenceNo = referenceNo;
        this.getCommonDetails();
      }
      else{
        let fireData = new HealthInsurance();
            let entry = [];
            this.fields[0] = fireData?.fields[0];
            this.productItem = new ProductData();
            this.productItem.patientList = [
              {
                "CreatedBy": this.loginId,
                "RiskId": null,
                "RelationType": '1',
                "RelationTypeDesc": null,
                "DateOfBirth": null
              }
            ]
            this.getSectionList();
            this.getRelationTypeList();
            this.formSection = true; this.viewSection = false;
      }
    }
    else if (this.productId == '1' && this.insuranceId =='100004') {
      let fireData = new Burglarys();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change',null)
        });
      } }
      this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
       this.getNatureTradeList();
       this.getInsuranceForList();
       this.getWallMaterialList();
       this.buglaryloss();
       this.getRoofMaterialList();
       this.getCeilingMaterialList();
       this.getRegionList();
       this.getWindowConsMaterialList();
       this.getDoorsMaterilalList(); this.getNightLeftDoorList(); this.getBuildingOccupiedList();
       let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='6' && this.insuranceId=='100002'){
      let fireData = new FireAlliedPerils();
      let entry = [];
      this.fields = fireData?.fields;
      let modelHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.getFireIndustryList('change');this.filterSectionList('change')
        });
      } }
      let occupationHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onChangeIndusty()
        });
      } }
      let modelHooks2 = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
      this.onChangeSection();this.onChangeBusinessSection()});
      } }
      let modelHooks3 = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
      this.onChangeBusiness();});
      } }
      let districtHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change',null);
        });
      }};
      console.log("Fields",this.fields)
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      for(let field of fieldList){
          if(field.key=='InsuranceType') field.hooks = modelHooks;
          if(field.key=='Section') field.hooks = modelHooks2;
          if(field.key=='RegionCode') field.hooks = districtHooks;
          if(field.key=='BusinessName') field.hooks = modelHooks3;
          if(field.key=='OccupationId') field.hooks = occupationHooks;
      }
      this.productItem = new ProductData();
      this.productItem.InsuranceType = '56';
      this.TableRowFire=[];
      this.formSection = true;
      this.getRegionList();
      this.getFireIndustryTypeList();
      this.getFireIndustryList('direct');
      //this.getFireSectionList();
    }
    else if(this.productId=='6' && this.insuranceId=='100004'){
      let fireData = new FireAndMaterialDamage();
      let entry = [];
      this.fields[0] = fireData?.fields;
    }
    else if(this.productId=='39'){
      let fireData = new MachineryBreakDown();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        if (referenceNo) {
          this.requestReferenceNo = referenceNo;
          if(this.productId!='4') this.getExistingBuildingList();
          this.setCommonFormValues(null);
        }
        else {
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
        }

     }

    //  else if(this.productId=='60'){
    //   let fireData = new ProfessionalIndemnity();
    //   let entry = [];
    //   this.fields[0] = fireData?.fields;
    //   this.formSection=true;
    //   console.log('FFFFFFFFFF',this.fields[0]);
    //   this.getdetails();
    //   let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //     if (referenceNo) {
    //       this.requestReferenceNo = referenceNo;
    //       this.getExistingBuildingList();
    //     this.getProfessional();
    //     }
    //     else {
    //         this.productItem = new ProductData();
    //         this.formSection = true; this.viewSection = false;
    //     }

    //  }
     else if(this.productId == '59'){
      this.formSection = true;
     }
    else if(this.productId=='16' && this.insuranceId != '100004'){
      let fireData = new Money();
      let entry = [];
      this.getRegionList();
      let districtHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change',null);
        });
      }};
      this.fields[0] = fireData?.fields;
      this.fields[0].fieldGroup[0].fieldGroup[0].hooks =districtHooks;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        this.checkMoneyYNChanges();
        if (referenceNo) {
          this.requestReferenceNo = referenceNo;
          if(this.productId!='4')this.getExistingBuildingList();
          this.setCommonFormValues(null);
        }
        else {
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
            console.log("Final Product",this.productItem)
        }
      //let groupList:any = fireData?.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      // let i=0;
      //   for(let group of groupList){
      //      group.fieldGroup[0].hooks = checkYnHooks;
      //      i+=1;
      //      if(i==groupList.length){
      //       this.fields[0] = fireData?.fields;
            
      //     }
      //   }
    }
    else if(this.productId=='42'){
      let fireData = new CyberInsurance();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        if(this.productId!='4')this.getExistingBuildingList();
        
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='16' && this.insuranceId == '100004'){
      let fireData = new Moneys();
      let entry = [];
      let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
            this.checkMoneyYNChanges()
        });
      }};
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        this.checkMoneyYNChanges();
        if (referenceNo) {
          this.requestReferenceNo = referenceNo;
          this.setCommonFormValues(null);
        }
        else {
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
        }
      // let groupList:any = fireData?.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      // let i=0;
      //   for(let group of groupList){
      //      group.fieldGroup[0].hooks = checkYnHooks;
      //      i+=1;
      //      if(i==groupList.length){
      //       this.fields[0] = fireData?.fields;
      //       let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      //       this.checkMoneyYNChanges();
      //       if (referenceNo) {
      //         this.requestReferenceNo = referenceNo;
      //         this.setCommonFormValues(null);
      //       }
      //       else {
      //           this.productItem = new ProductData();
      //           this.formSection = true; this.viewSection = false;
      //       }
      //     }
      //   }
    }
    else if(this.productId=='21'){
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      let fireData = new PlantAllRisk();
      let entry = [];
      this.fields[0] = fireData?.fields;
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues(null);
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }

    else if(this.productId=='60'){
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      let fireData = new ProfessionalIndemnity();
      let entry = [];
      this.fields[0] = fireData?.fields;
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues(null);
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='26'){
     
      let fireData = new BussinessAllRisk();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.productItem.IndustryBussinessAllRisk = String(this.IndustryId);
        if(this.productId!='4')this.getExistingBuildingList();
        this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='27' && this.insuranceId=='100004'){
     
      let fireData = new PublicLiabilitys();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues(null);
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    // else if(this.productId=='27' && this.insuranceId!='100004'){
    //   let fireData = new PublicLiability();
    //   let entry = [];
    //   this.fields[0] = fireData?.fields;
    //   let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //   if (referenceNo) {
    //     this.requestReferenceNo = referenceNo;
    //     this.productItem = new ProductData();
    //     this.setCommonFormValues(null);
       
    //   }
    //   else {
    //       this.productItem = new ProductData();
    //       this.formSection = true; this.viewSection = false;
    //   }
    // }
    else if(this.productId=='25'){
     
      let fireData = new ElectronicEquipments();
      let entry = [];
      this.fields[0] = fireData?.fields;
      this.getdropList();
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues(null);
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    
    else if(this.productId=='43'){
      let fireData = new MedicalInsurance();
      let entry = [];
      this.fields[0] = fireData?.fields;
      this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = [
        { value: 'A', 
          label:["Nurses","Dietician","Lab/Path.Tech","Physiotherapist","X-Ray Tech","Scanning Tech.Pathologist",
              "Clinical Pathologist","Forensic Pathologist"
          ] 
        }, 
        { value: 'B', label:[
          "Midwife","General Practitioner","Psychiatrist","Nephrologist","Radiologist", "Ophthalmologist (non-surgical)", "Dentist", "Acupuncture Specialist", "Pharmacist", "Emergency doctor", "Neurologist (Non-Surgical)", "Pulmonologist(non-surgical)", "Gastroenterologist(non-surgical)", "Internist (non-surgical)"
        ] },
        { value: 'C', label:[
          "Surgeons including Vascular/cardiovascular", "maxillofacial", "thoracic", "ENT (ear/nose/throat)", "Neurologist", "Urologist", "Plastic", "Venereal Disease Specialist and Dermatologist", "Ophthalmologist", "Neurology", "Gastroenterologist", "Rheumatologist", "Pulmonologist"
        ]},
        { value: 'X', label:[
          "Non-Surgical Specialist", "Gynaecologist", "Obstetrician & Gynaecologist", "Cardiologist", "Anaesthetist", "Paediatrician(non-surgical)", "Obstetrician", "Paediatrician(surgical)", "General surgeon", "orthopaedic surgery", "Doctor (including Surgery)", "Doctor (non-surgical)", "haematology"
        ]}
      ];
      let aggHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetAggSIList('change')
        });
      } }
      this.fields[0].fieldGroup[0].fieldGroup[1].hooks = aggHooks;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.getAooSIList();
        if(this.productId!='4')this.getExistingBuildingList();
        this.setCommonFormValues(null);
      }
      else{
        this.getAooSIList();
        this.formSection = true; this.viewSection=false;
      }
    }
    //   else {
    //       this.productItem = new ProductData();
    //       this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = [
    //         { value: 'A', 
    //         list:[
    //             "Nurses","Dietician","Lab/Path.Tech","Physiotherapist","X-Ray Tech","Scanning Tech.Pathologist",
    //             "Clinical Pathologist","Forensic Pathologist"
    //         ] 
    //       }, 
    //       { value: 'B', list:[
    //             "Midwife", "General Practitioner", "Psychiatrist", "Nephrologist", "Radiologist", "Ophthalmologist (non-surgical)", "Dentist", "Acupuncture Specialist", "Pharmacist", "Emergency doctor", "Neurologist (Non-Surgical)", "Pulmonologist(non-surgical)", "Gastroenterologist(non-surgical)", "Internist (non-surgical)"
    //       ] },
    //       { value: 'C', list:[
    //         "Surgeons including Vascular/cardiovascular", "maxillofacial", "thoracic", "ENT (ear/nose/throat)", "Neurologist", "Urologist", "Plastic", "Venereal Disease Specialist and Dermatologist", "Ophthalmologist", "Neurology", "Gastroenterologist", "Rheumatologist", "Pulmonologist"
    //       ]},
    //       { value: 'X', list:[
    //         "Non-Surgical Specialist", "Gynaecologist", "Obstetrician & Gynaecologist", "Cardiologist", "Anaesthetist", "Paediatrician(non-surgical)", "Obstetrician", "Paediatrician(surgical)", "General surgeon", "orthopaedic surgery", "Doctor (including Surgery)", "Doctor (non-surgical)", "haematology"
    //       ]}
    //       ];
    //       this.fields[0].fieldGroup[0].fieldGroup[1].props.options=[
    //         {label:"--Select--",value:''},
    //         {label:"100,000",value:'100000'},
    //         {label:"50,000",value:'50000'},
    //         {label:"25,000",value:'25000'},
    //         {label:"15,000",value:'15000'},
    //       ];
    //       this.fields[0].fieldGroup[0].fieldGroup[2].props.options=[
    //         {label:"--Select--",value:''},
    //         {label:"100,000",value:'100000'},
    //         {label:"50,000",value:'50000'},
    //         {label:"25,000",value:'25000'},
    //         {label:"15,000",value:'15000'},
    //       ]
    //       this.formSection = true; this.viewSection = false;
    //       this.formSection = true; this.viewSection = false;
    //   }
    // }
    if(this.productId=='13'){
      let contentData = new PersonalAccident();
      this.fields = [contentData?.fields];
      let modelHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onoccChangepersonalInd('change');
        });
      } }
      this.getRegionList();
      //this.ongetDistrictList('region')
      let DistHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.getOccupationList('direct');
        });
      } }
     
      // this.fields[0].fieldGroup[0].fieldGroup[1].hooks = DistHooks;
      // this.fields[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;

      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    if(this.productId=='61'){
      let contentData = new Bond();
      this.fieldsBond = contentData?.fields[0].fieldGroup[0].fieldGroup;
      this.formSection = true;
      
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    
    if(this.productId=='27'){
      let contentData = new PublicLiability();
      this.fields= [contentData?.fields];
      console.log(this.fields)
      this.getRegionList();
     
      let DistHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('direct',null);
        });
      } }
     
      this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].hooks = DistHooks;
      console.log('HHHHHHHHHHHHHH',this.fields);
   
      // let modelHooks = { onInit: (field: FormlyFieldConfig) => {
      //   field.formControl.valueChanges.subscribe(() => {
      //     this.onoccChangepersonalInd('change');
      //   });
      // } }
    
      // this.fields[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;

      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues(null);
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    this.BenifitList = [
      { Code: 1, CodeDescription: '12 Months' },
      { Code: 2, CodeDescription: '24 Months' },
      { Code: 3, CodeDescription: '36 Months' },
    ];

    if (this.productId == '19' || this.productId=='59' || this.productId=='24') this.getIndustryList();
    if (this.productId == '32') {
      // this.getIndustryTypeList();
      // this.getEmployeeCountList();
      // this.getAudientTypeList();
      // this.getSumInsuredList()
    }
    if (this.productId=='42'){
      this.cyberinsutypes();
      this.productTypes();
    }
  }
  getNOYears(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ItemType": "BOND_YEAR"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': null }]
          this.yearsList = data.Result;
          console.log("this.yearsList",this.yearsList);
          
          for (let i = 0; i < this.yearsList.length; i++) {
            this.yearsList[i].label = this.yearsList[i]['CodeDesc'];
            this.yearsList[i].value = this.yearsList[i]['Code'];
          //   delete this.dropList[i].CodeDesc;
          //   if (i == this.dropList.length - 1) {
              this.fieldsBond[2].templateOptions.options = defaultObj.concat(this.yearsList);
          //   }
          }
            

            //this.getOccupationList();
        }
      },
      (err) => { },
    );
  }
  getBondType(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
     "ProductId": this.productId,
    "BranchCode": this.branchCode
    }
    let urlLink = `${this.customApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': null }]
          this.BondTypeList = data.Result;
          console.log("this.yearsList",this.BondTypeList);
          
          for (let i = 0; i < this.BondTypeList.length; i++) {
            this.BondTypeList[i].label = this.BondTypeList[i]['CodeDesc'];
            this.BondTypeList[i].value = this.BondTypeList[i]['Code'];
          //   delete this.dropList[i].CodeDesc;
          //   if (i == this.dropList.length - 1) {
              this.fieldsBond[1].templateOptions.options = defaultObj.concat(this.BondTypeList);
          //   }
          }
            

            //this.getOccupationList();
        }
      },
      (err) => { },
    );
  }
  openMoneyform(){
    this.Moneyform=true;
  }
  addMoney(rowData){
    let valid = this.checkValidation();
    if(valid){
    let RiskId;
    let i= this.TableRowMoney.length;
    if(this.currentMoneyIndex==0){
      RiskId=i+1;
    }
    else {
      RiskId =this.currentMoneyIndex;
    }
    let data = {
     "LocationName":rowData.LocationName,
       "RegionCode": rowData.RegionCode,
       "DistrictCode" : rowData.DistrictCode,//this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(rowData.MoneyDirectorResidence);
      "MoneyDirectorResidence": rowData.MoneyDirectorResidence,
      "MoneyMajorLoss": rowData.MoneyMajorLoss,
      "StrongroomSi": rowData.StrongroomSi,
      "MoneySafeLimit" : rowData.MoneySafeLimit,
      "MoneyOutofSafe": rowData.MoneyOutofSafe,
      "MoneyCollector": rowData.MoneyCollector,
      "MoneyAnnualEstimate": rowData.MoneyAnnualEstimate,
      "MoneyInTransit":rowData.MoneyInTransit,
      "MoneyInSafe":rowData.MoneyInSafe,
      "RiskId": rowData.RiskId,
     // "FirstLossPayee":rowData.FirstLossPayee,
    }
    if (this.currentMoneyIndex !=0) {
      this.TableRowMoney[this.currentMoneyIndex-1] = data;
      this.form.reset();
      this.currentMoneyIndex=0
    } else {
      this.TableRowMoney.push(data);
      this.form.reset();
     
  } 
   // this.TableRowMoney.push(data);
  // this.Moneyform=false;
    
}

  }

  deleteMoney(index){
    this.TableRowMoney.splice(index,1);
  }
  
  getdropList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/content`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': null }]
          this.dropList = data.Result;
          for (let i = 0; i < this.dropList.length; i++) {
            this.dropList[i].label = this.dropList[i]['CodeDesc'];
            this.dropList[i].value = this.dropList[i]['Code'];
          //   delete this.dropList[i].CodeDesc;
          //   if (i == this.dropList.length - 1) {
              //this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = defaultObj.concat(this.dropList);
              this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = defaultObj.concat(this.dropList);
          //   }
          }
            

            //this.getOccupationList();
        }
      },
      (err) => { },
    );
  }
  getMotorDetails(type){
    if(type=='direct'){
      let ReqObj = {
        "RequestReferenceNo": this.requestReferenceNo
      }
      let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.vehicleDetailsList = data.Result;
              if(data.Result.length!=0){
                for(let veh of data.Result){
                  veh['Active'] = true;
                }
                let vehicleDetails = data.Result;
                this.commonDetails = data.Result;
                this.currencyCode = vehicleDetails[0].Currency;
                this.getIndividualVehicle(type,vehicleDetails);
              }
          }
        });
    }
    else this.getIndividualVehicle(type,this.vehicleDetailsList);
  }
  getIndividualVehicle(type,vehicleDetails){
    if(type!='proceedNext'){
      if(this.vehicleId ==null || this.vehicleId==undefined){
        this.policyStartDate = vehicleDetails[0].PolicyStartDate;
        this.policyEndDate = vehicleDetails[0].PolicyEndDate;
        this.sourceType = vehicleDetails[0]?.SourceTypeId;
        this.sourceCodeDesc=vehicleDetails[0]?.SourceType
        this.Code= vehicleDetails[0]?.SourceTypeId;
        if(this.Code)this.onSourceTypeChange('direct')
        this.customerCode=vehicleDetails[0]?.CustomerCode;
        this.customerName = vehicleDetails[0]?.CustomerName;
        this.vehicleId = vehicleDetails[0].Vehicleid;
      }
      this.totalIndex = this.vehicleDetailsList.length;
      let index = this.vehicleDetailsList.findIndex(ele=>ele.Vehicleid==this.vehicleId);
      if(index!=null && index!=undefined) this.currentIndex = index+1;
      sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleDetails));
      this.commonDetails = this.vehicleDetailsList;
      this.setCommonFormValues(type);
    }
    else{
      this.onCreateVehicle();
    }
  }
  onCreateVehicle(){
    this.vehicleId = this.vehicleDetailsList.length+1;
    let make = "",color='',fuel='',usageDesc='',bodyType='',motorCategoryDesc='';
      let insuranceType = ['73'];
      if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
        let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
        make = entry.label;
  
      }
      if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
        let entry = this.bodyTypeList.find(ele=>ele.Code==this.productItem.BodyType);
        bodyType = entry.label;
      }
      if(this.productItem.Color!='' && this.productItem.Color!=undefined && this.productItem.Color!=null){
        let entry = this.colorList.find(ele=>ele.Code==this.productItem.Color);
        color = entry.label;
      }
      if(this.productItem.FuelType!='' && this.productItem.FuelType!=undefined && this.productItem.FuelType!=null){
        let entry = this.fuelTypeList.find(ele=>ele.Code==this.productItem.FuelType);
        fuel = entry.label;
      }
      if(this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined && this.productItem.MotorUsage!=null){
        let entry = this.usageList.find(ele=>ele.Code==this.productItem.MotorUsage);
        usageDesc = entry.label;
      }
      if(this.productItem.MotorCategory!='' && this.productItem.MotorCategory!=undefined && this.productItem.MotorCategory!=null){
        let entry = this.motorCategoryList.find(ele=>ele.Code==this.productItem.MotorCategory);
        motorCategoryDesc = entry.label;
      }
      let model=null,modelDesc = null;
      if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
        let bodyType = this.productItem.BodyType
          if(bodyType=='1' || bodyType=='2' || bodyType=='3' || bodyType=='4' || bodyType=='5'){
            if(this.productItem.Model!='' && this.productItem.Model!=null){
              if(this.productItem.Model=='99999'){
                modelDesc = this.productItem.OtherModelDesc;
                model = this.productItem.Model;
              }
              else{
                let entry = this.modelList.find(ele=>ele.Code==this.productItem.Model);
                modelDesc = entry.label;
                model = this.productItem.Model;
              }
              
            }
          }
          else{
            model = '99999';
            modelDesc = this.productItem.ModelDesc;
          }
      }
      let regNo = null;
      if(this.productItem.RegistrationNo=='' || this.productItem.RegistrationNo==null){
        regNo = this.productItem.ChassisNo;
      }
      else regNo = this.productItem.RegistrationNo;
      let createdBy="";
          let startDate = "",endDate = "",vehicleSI="0",accSI="",windSI="0",tppSI="0";
          startDate = this.commonDetails[0].PolicyStartDate;
          endDate = this.commonDetails[0].PolicyEndDate;
          if(this.policyStartDate){
            // if(this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')){
            //    startDate = this.endorseEffectiveDate;
            //    const oneday = 24 * 60 * 60 * 1000;
            //     const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
            //     const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            //     const formattedDatecurrent = new Date(startDate);
            //     console.log(formattedDate);
      
            //   console.log(formattedDatecurrent);
      
            //   this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
            // }
          }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        this.subuserType = sessionStorage.getItem('typeValue');
        console.log("AcExecutive",this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
        
        let appId = "1",loginId="",brokerbranchCode="";
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
            createdBy = this.commonDetails[0].CreatedBy;
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
            loginId = this.commonDetails[0].LoginId;
            //loginId = this.updateComponent.brokerLoginId
            brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          }
        }
        if(this.userType!='Broker' && this.userType!='User'){
          // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
            
          //   this.sourceType = this.commonDetails[0].SourceType;
          //   this.bdmCode = this.commonDetails[0].BrokerCode;
          //   this.brokerCode = this.commonDetails[0].BrokerCode;
          //   brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
          //   this.customerCode = this.commonDetails[0].CustomerCode;
          //   this.customerName = this.commonDetails[0].CustomerName;
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
        let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
        if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
          IdNo = this.customerDetails?.IdNumber;
          regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
          if(this.customerName ==undefined) this.customerName = null;
          if(this.vehicleId==null || this.vehicleId==undefined) this.vehicleId = '1';
      let endorsementYN = 'N';
      if(this.endorsementSection && this.enableAddVehicle){endorsementYN='Y';}
      this.vehicleDetails = {
        "BrokerBranchCode": brokerbranchCode,
        "AcExecutiveId": null,
        "CommissionType": this.commissionType,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BdmCode": this.customerCode,
        "BrokerCode": this.brokerCode,
        "LoginId": loginId,
        "SubUserType": this.subuserType,
        "ApplicationId": appId,
        "CustomerReferenceNo": refNo,
        "RequestReferenceNo": this.requestReferenceNo,
        "Idnumber": IdNo,
        "VehicleId": this.vehicleId,
        "AxelDistance": '01',
        "Chassisnumber": '99999',
        "Color": null,
        "ColorDesc": color,
        "OwnerCategory": null,
        "CubicCapacity": "100",
        "CreatedBy": createdBy,
        "DrivenByDesc": 'Driver',
        "EngineNumber": null,
        "EngineCapacity": null,
        "FuelType": null,
        "FuelTypeDesc": fuel,
        "Grossweight": "100",
        "HoldInsurancePolicy": "N",
        "Insurancetype": insuranceType,
        "InsuranceId": this.insuranceId,
        "InsuranceClass": "3",
        "ModelNumber": null,
        "NcdYn": 'N',
        "NoOfClaims": null,
        "NumberOfAxels": "1",
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "ProductId": this.productId,
        "SectionId": '73',
        "PolicyType": IdType,
        "RadioOrCasseteplayer": null,
        "RegistrationYear": regYear,
        "SourceTypeId":this.sourceType,
        "SpotFogLamp": null,
        "Stickerno": null,
        "SumInsured": null,
        "Tareweight": '100',
        "TppdFreeLimit": null,
        "TppdIncreaeLimit": null,
        "TrailerDetails": null,
        "Windscreencoverrequired": null,
        "accident": null,
        "periodOfInsurance": "30",
        "PolicyStartDate": startDate,
        "PolicyEndDate": endDate,
        "Currency" : this.currencyCode,
        "ExchangeRate": this.commonDetails[0].ExchangeRate,
        "HavePromoCode": this.commonDetails[0].HavePromoCode,
        "PromoCode" : this.commonDetails[0].PromoCode,
        "CollateralYn": 'N',
        "BorrowerType": null,
        "CollateralName": null,
        "FirstLossPayee": null,
        "FleetOwnerYn": 'N',
        "NoOfVehicles": "1",
        "NoOfComprehensives": null,
        "ClaimRatio": null,
        "SavedFrom": "Owner",
        "UserType": this.userType,
        "SearchFromApi":false,
        "TiraCoverNoteNo": null,
        "EndorsementYn": endorsementYN,
        "EndorsementDate":this.endorsementDate,
        "EndorsementEffectiveDate": this.endorsementEffectiveDate,
        "EndorsementRemarks": this.endorsementRemarks,
        "EndorsementType": this.endorsementType,
        "EndorsementTypeDesc": this.endorsementTypeDesc,
        "EndtCategoryDesc": this.endtCategoryDesc,
        "EndtCount":this.endtCount,
        "EndtPrevPolicyNo":this.endtPrevPolicyNo,
        "EndtPrevQuoteNo": this.endtPrevQuoteNo,
        "EndtStatus": this.endtStatus,
        "IsFinanceEndt": this.isFinanceEndt,
        "OrginalPolicyNo": this.orginalPolicyNo,
        "Ncb":"0",
        "DefenceValue":null,
        "PurchaseDate":null,
        "RegistrationDate": null,
        "Scenarios": {
          "ExchangeRateScenario": {
            "OldAcccessoriesSumInsured": null,
            "OldCurrency": null,
            "OldExchangeRate": null,
            "OldSumInsured": null,
            "OldTppdIncreaeLimit": null,
            "OldWindScreenSumInsured": null
          }
        },
        "AcccessoriesSumInsured": null,
        "AccessoriesInformation": null,
        "AdditionalCircumstances": null,
        "CityLimit": null,
        "CoverNoteNo": null,
        "Gpstrackinginstalled": 'N',
        "InsurerSettlement": "",
        "InterestedCompanyDetails": "",
        "MotorCategory": null,
        "RoofRack": null,
        "WindScreenSumInsured": null,
        "SaveOrSubmit": "Save"
      }
      this.vehicleDetails['FleetOwnerYn'] = "N";
      this.vehicleDetails['Active'] = false;
      this.vehicleDetailsList.push(this.vehicleDetails);
      this.motorDetails = null;
      this.productItem=new ProductData();
      this.currentIndex = this.vehicleDetailsList.length;
      this.totalIndex = this.vehicleDetailsList.length;
      this.checkDisableFields()
  }
  checkDisableFields(){
    if(this.endorsementSection){
      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
      let entry = this.vehicleDetailsList.find(ele=>ele.Vehicleid==this.vehicleId)
      for(let field of fieldList){

      }
    }
  }
  createCover(element,modal){
 
    this.showsectionnew=false;
    this.listSection = false;
    this.listn=true;
    this.productItem = new ProductData();
    this.productItem.LiabilityOccupationId='';
    this.productItem.TotalNoOfEmployees=0;
    this.productItem.EmpLiabilitySi=0;
    this.productItem.otheroption='';
    // let entry = {
    //     "LiabilityOccupationId":null,
    //     "TotalNoOfEmployees":null,
    //     "EmpLiabilitySi":'0',
    //     "OtherOccupation":'',
    //   }
   //   this.currentBuildingIndex = this.EmployeeListNew.length+1;
      // this.EmployeeListNew.push(entry);
    // this.productItem.employeeList.push(entry);
    this.isEmployeeForm = true;
    this.currentBuildingIndex = null;
  //  this.open(modal)
  
}
  createCover2(element,modal){
    this.showsectionnew=false;
    this.listSectionGroup= false;
    this.listnGroup=true;
    this.productItem = new ProductData();
    this.productItem.OccupationType='';
    this.productItem.TotalNoOfPersons= '0' ;
    this.productItem.SumInsured='0';
    this.productItem.TTDSumInsured='0';
    this.productItem.MESumInsured = '0';
    this.productItem.PTDSumInsured = '0';
    this.productItem.FESumInsured = '0';
      let entry = {
        "TotalNoOfPersons": null,
        "SumInsured": 0,
        "OccupationType": null,
        "TTDSumInsured": 0, 
        "PTDSumInsured": 0,      
        "MESumInsured": 0,      
        "FESumInsured": 0 
      }
      
      this.currentGroupIndex = this.GroupListNew.length;
      this.GroupListNew.push(entry);
      this.isGroupForm=true;
  //  this.open(modal)
  }
// viewPlan(){
//   this.PlanBenefitsVisible=true;
// }
savePlan(travelList, totalPassengers){
    let createdBy = "";
    createdBy = this.loginId;
    this.brokerCode = this.agencyCode;
    this.brokerLoginId = createdBy;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.applicationId = "01";
    let appId = "1", loginId = "", brokerbranchCode = "";
    let acExecutiveId = "", commissionType = "",customerName;
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        createdBy = this.travelDetails.CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
        acExecutiveId = this.executiveValue;
        commissionType = this.commissionValue;
      }
      else{
        appId = this.loginId;
        loginId = this.brokerLoginId
        brokerbranchCode = null;
      }
    }
    let startDate = null,endDate=null;
    if(String(this.policyStartDate).split('/').length>1) startDate = this.policyStartDate
    else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
    if(String(this.policyEndDate).split('/').length>1) endDate = this.policyEndDate
    else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
    // let GrandSenior=null;
    // if(this.grandSenior!=0){
    //     GrandSenior =this.grandSenior
    // }
    // else{
    //     GrandSenior =null
    // }
    let ReqObj = {
      
      "AcExecutiveId": acExecutiveId,
      "ApplicationId": appId,
      "CommissionType": commissionType,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
      "RequestReferenceNo": this.quoteRefNo,
      "BranchCode": "01",
      "ProductId": this.productId,
      "UserType": this.userType,
      "BrokerBranchCode": brokerbranchCode,
      "BdmCode": this.customerCode,
      "CreatedBy": createdBy,
      "CustomerCode": this.customerCode,
      "CustomerName": customerName,
      "InsuranceId": this.insuranceId,
      "SourceTypeId":this.sourceType,//this.subuserType,
      "SectionId": this.premium,
      "TravelCoverId": this.premium,
      "Currency": this.currencyCode,
      "ExchangeRate": this.exchangeRate,
      "PlanTypeId": this.planType,
      "SourceCountry": "TZA",
      "DestinationCountry": this.country,
      "TotalPassengers": "4",
      "TravelId": "1",
      "LocationId": "1",
      "HavePromoCode": "N",
      "PromoCode": this.promocode,
      "SportsCoverYn": "N",
      "TerrorismCoverYn": "N",
      "CovidCoverYn": "N",
      "TravelCoverDuration": 3,
      "TravelEndDate":  endDate ,// "09/06/2024",
      "TravelStartDate": startDate,// "08/06/2024",
      "GroupDetails": [
        {
            "GroupId": "1",
            "LocationId": "1",
            "GroupMembers": this.kids,
            "GroupDesc": "Kids(3 Months-18 Years)"
        },
        {
            "GroupId": "2",
            "LocationId": "1",
            "GroupMembers": this.adult,
            "GroupDesc": "Adult(19-65)"
        },
        {
            "GroupId": "3",
            "LocationId": "1",
            "GroupMembers": this.senior,
            "GroupDesc": "Senior(66-75)"
        },
        {
            "GroupId": "4",
            "LocationId": "1",
            "GroupMembers": this.superSenior,
            "GroupDesc": "Super Senior(76-80)"
        },

        {
          "GroupId": "5",
          "LocationId": "1",
          "GroupMembers": this.grandSenior,
          "GroupDesc": "Grand Senior(76-80)"
      }
    ],
      "EndorsementYn": this.endorsementType,
        "EndorsementDate":this.endorsementDate,
        "EndorsementEffectiveDate": this.endorsementEffectiveDate,
        "EndorsementRemarks": this.endorsementRemarks,
        "EndorsementType": this.endorsementType,
        "EndorsementTypeDesc": this.endorsementTypeDesc,
        "EndtCategoryDesc": this.endtCategoryDesc,
        "EndtCount":this.endtCount,
        "EndtPrevPolicyNo":this.endtPrevPolicyNo,
        "EndtPrevQuoteNo": this.endtPrevQuoteNo,
        "EndtStatus": this.endtStatus,
        "IsFinanceEndt": this.isFinanceEndt,
        "OrginalPolicyNo": this.orginalPolicyNo,
        
    }
    ReqObj.GroupDetails = ReqObj.GroupDetails.filter(ele=>ele.GroupMembers!=0 && ele.GroupMembers!='0')
    ReqObj['PolicyNo'] = this.endorsePolicyNo
    console.log("Received Obj",ReqObj)
    let urlLink = `${this.motorApiUrl}api/savetraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (data.ErrorMessage.length != 0 && this.endorsementSection) {
          //this.router.navigate(['/quotation/plan/premium-details']);
          // this.TravelForm.controls['PlanTypeId'].disable();
          // this.TravelForm.controls['SourceCountry'].disable();
          // this.TravelForm.controls['HavePromoCode'].disable();
          // this.TravelForm.controls['PromoCode'].disable();
          // this.TravelForm.controls['SportsCoverYn'].disable();
          // this.TravelForm.controls['TerrorismCoverYn'].disable();
          // this.TravelForm.controls['CovidCoverYn'].disable();
          // this.TravelForm.controls['SectionId'].disable();
        }
        else {
          let entry = data?.Result;
          entry['TravelStartDate'] = ReqObj?.TravelStartDate;
          entry['TravelEndDate'] = ReqObj?.TravelEndDate;
          entry['TotalPassengers'] = ReqObj?.TotalPassengers;
          entry['SectionId'] = ReqObj?.SectionId;
          entry['Currency'] = ReqObj?.Currency;
          entry['DestinationCountry'] = data?.Result?.DestinationCountryDesc;
          entry['NoofDays'] = ReqObj?.TravelCoverDuration;
          this.requestReferenceNo = data.Result.RequestReferenceNo;
         this.getCoverList(entry);



        }
      },
      (err) => { },
    );
}
getCoverList(coverListObj) {
  this.currencyCode = coverListObj?.Currency;
  let createdBy = this.loginId
  let groupList = coverListObj?.GroupDetails;
  let vehicleList = [];
  let endDate:any = null,coverModificationYN='N';
  if(coverListObj?.TravelEndDate){
    if(this.endorsementSection){
      coverModificationYN = 'Y';
      endDate = this.endorseEffectiveDate;
    }
    else endDate = coverListObj?.TravelEndDate;
  }
  let effectiveDate=null;
  if(this.endorsementSection){
      effectiveDate = this.endorseEffectiveDate;
  }
  else {
    if(coverListObj.TravelStartDate){
      effectiveDate = coverListObj.TravelStartDate;
    }
  }
  if (groupList.length != 0) {
    let i = 0;
    for (let group of groupList) {
      let locationId = '1';
        if(group.LocationId!=null && group.LocationId!=undefined) locationId=group.LocationId;
      let ReqObj = {
        "LocationId" : locationId,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": coverListObj?.SectionId,
        "ProductId": this.productId,
        "MSRefNo": coverListObj?.MSRefNo,
        "VehicleId": group.TravelId,
        "CdRefNo": coverListObj?.CdRefNo,
        "VdRefNo": coverListObj?.VdRefNo,
        "CreatedBy": createdBy,
        "productId": this.productId,
        "Passengers": group.GroupMembers,
        "EffectiveDate": effectiveDate,
        "PolicyEndDate": endDate,
        "RequestReferenceNo": coverListObj?.RequestReferenceNo,
        "CoverModification":'N'
      }
      let urlLink = `${this.CommonApiUrl}calculator/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let entry = data;
          entry['DestinationCountry'] = coverListObj.DestinationCountry;
          entry['TravelStartDate'] = coverListObj.TravelStartDate;
          entry['TravelEndDate'] = coverListObj.TravelEndDate;
          let groupEntry = groupList.filter(ele => ele.GroupId == data?.VehicleId);
          if (groupEntry) {
            entry['Passengers'] = groupEntry[0].GroupMembers;
            entry['TravelId'] = entry.VehicleId;
          }
          vehicleList.push(entry);
          i += 1;
          console.log("iiiiiiiii ", i)
          if (i == groupList.length) {
            console.log("grouppppppppppppppppppp");
            sessionStorage.setItem('quoteReferenceNo', coverListObj.RequestReferenceNo)
            //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
            this.router.navigate(['/quotation/plan/premium-details']);
            // this.vehicleDetailsList = vehicleList;
            // console.log("Final Vehicle Details",vehicleList);
            // this.checkSelectedCovers();

          }
        },
        (err) => { },
      );
    }
  }

}
getExistingTravelDetails(){
  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
  let ReqObj = {
    "RequestReferenceNo": referenceNo,
    "TravelId": "1"
    }
  let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
          let customerDatas = data.Result;
          sessionStorage.setItem('quoteReferenceNo', JSON.stringify(data.Result))
          this.applicationId = customerDatas.ApplicationId;
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
            this.adminSection = true;this.issuerSection = false;
          }
          else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
          else this.issuerSection = false
          this.travelDetails = customerDatas;
          this.Code= customerDatas.SourceTypeId;
          this.sourceType = this.premium;
          this.branchValue = customerDatas.BranchCode;
          this.brokerBranchCode = customerDatas.BrokerBranchCode;
         // this.brokerBranchCode = this.brokerBranchCode;
          this.branchValue = customerDatas.BranchCode;
          this.brokerCode = customerDatas.BrokerCode;
          this.onSourceTypeChange('direct');
          this.premiunDropdown4(this.Code);
         
        // this.updateComponent.brokerCode = customerDatas.BrokerCode;
//this.HavePromoCode = customerDatas.HavePromoCode;
          this.planType = customerDatas.PlanTypeId;
          this.promocode = customerDatas.PromoCode;
          this.premium = customerDatas.SectionId;
          this.customerCode = customerDatas.CustomerCode;
          this.getPlanTypeList(this.premium );
          this.executiveValue = customerDatas?.AcExecutiveId;
          this.commissionValue = customerDatas?.CommissionType;
          this.policyStartDate = customerDatas?.TravelStartDate;
          this.policyEndDate = customerDatas?.TravelEndDate
          // if(this.policyStartDate != null ){
          //   var dateParts =this.policyStartDate.split("/");
          //   // month is 0-based, that's why we need dataParts[1] - 1
          //   this.policyStartDate = this.policyStartDate
          //   //this.policyStartDate = dateObject.toString()
          // }
          // if(this.policyEndDate != null ){
          //   var dateParts = this.policyEndDate.split("/");
          //   this.policyEndDate = this.policyEndDate
          //   this.onChangeEndDate();
          // }
          this.country = customerDatas.DestinationCountry;
          this.onCurrencyChange('direct');
          if(customerDatas?.GroupDetails[0]){
            this.kids = parseInt(customerDatas?.GroupDetails[0]?.GroupMembers);
          }
          else{
            this.kids = 0;
          }
          if(customerDatas?.GroupDetails[1]){
            this.adult = parseInt(customerDatas?.GroupDetails[1]?.GroupMembers);
          }
          else{
            this.adult =0;
          }
          if(customerDatas?.GroupDetails[2]){
            this.senior = parseInt(customerDatas?.GroupDetails[2]?.GroupMembers);
          }
          else{
            this.senior =0;
          }
          if(customerDatas?.GroupDetails[3]){
            this.superSenior = parseInt(customerDatas?.GroupDetails[3]?.GroupMembers);
          }
          else{
            this.superSenior =0;
          }
          if(customerDatas?.GroupDetails[4]){
            this.grandSenior = parseInt(customerDatas?.GroupDetails[4]?.GroupMembers);
          }
          else{
            this.grandSenior =0;
          }

    },
    (err) => { },
  );
}

backPlan()
{
 
  this.router.navigate(['/quotation']);
}
  createCover4(element,modal){
    this.showsectionnew=false;
    this.listSection = false;
    this.listn=true;
   this.currentBuildingIndex = null;
    this.productItem = new ProductData();
    this.productItem.LiabilityOccupationId='';
  this.productItem.FidEmpCount='';
  this.productItem.FidEmpSi=0;
  this.productItem.otherFioption='';
  let entry = {
    "LiabilityOccupationId":null,
    "FidEmpCount":null,
    "FidEmpSi":'0',
    "OtherOccupation":'',
  }
  if(entry.LiabilityOccupationId ==null && entry.LiabilityOccupationId =="") {
    this.isFedilityForm = false;
   }
   else{
  
    this.currentFidelityIndex = this.FidelityListNew.length;
    
    this.FidelityListNew.push(entry);
    // this.productItem.LiabilityOccupationId='';
    // this.productItem.FidEmpSi=0;
    // this.productItem.FidEmpCount=0;
    // this.productItem.otherFioption='';
    //   let entry = {
    //     "LiabilityOccupationId":null,
    //     "FidEmpCount":null,
    //     "FidEmpSi":'0',
    //     "OtherOccupation":'',
    //   }
    //   this.currentFidelityIndex= this.fidelityList.length;
    //   this.fidelityList.push(entry);
    
  }
  this.isFedilityForm= true;
  }
  onEditBuilding(rowData,i){
    this.productItem = new ProductData();
    this.editss=true;
    this.editEmp=true;
    console.log(this.EmployeeListNew,"this.EmployeeListNewthis.EmployeeListNewthis.EmployeeListNew");
    
   //let edit = this.EmployeeListNew.findIndex(ele=>ele.LiabilityOccupationId == rowData.LiabilityOccupationId && ele.TotalNoOfEmployees == rowData.TotalNoOfEmployees && ele.EmpLiabilitySi == rowData.EmpLiabilitySi);
    this.currentBuildingIndex = i;
    this.productItem.LiabilityOccupationId = rowData.LiabilityOccupationId;
    this.productItem.TotalNoOfEmployees = rowData.TotalNoOfEmployees;
    this.productItem.EmpLiabilitySi = rowData.EmpLiabilitySi;
    this.productItem.otheroption= rowData.OtherOccupation;
    console.log("Occupation",this.productItem.LiabilityOccupationId)
    
    this.isEmployeeForm = true;
  }
 

  onEditGroup(rowData){
    this.productItem = new ProductData();
    this.editss=true;
    this.editGroup=true;
    this.isGroupForm = true;
    let edit = this.FidelityListNew.findIndex(ele=>ele.LiabilityOccupationId == rowData.LiabilityOccupationId 
      && ele.OtherOccupation == rowData.OtherOccupation 
      && ele.FidEmpSi == rowData.FidEmpSi
      && ele.FidEmpCount == rowData.FidEmpCount
    );
    this.currentGroupIndex= edit;
    this.productItem.OtherOccupation = rowData.OtherOccupation;
    this.productItem.FidEmpSi = rowData.FidEmpSi;
    this.productItem.FidEmpCount = rowData.FidEmpCount;
    this.productItem.LiabilityOccupationId= rowData.LiabilityOccupationId;
    // this.productItem.TTDSumInsured= rowData.TTDSumInsured;
    // this.productItem.PTDSumInsured= rowData.PTDSumInsured;
    // this.productItem.MESumInsured= rowData.MESumInsured;
   
    // this.open(modal);
  }
  delete(rowData: any) {
    // let newvars= this.EmployeeListNew;
    // console.log('First List',newvars)
    // let edit = newvars.findIndex(ele=>ele.LiabilityOccupationId == rowData.LiabilityOccupationId && ele.TotalNoOfEmployees == rowData.TotalNoOfEmployees && ele.EmpLiabilitySi == rowData.EmpLiabilitySi);
    // newvars.splice(edit,1);
    // this.EmployeeListNew = [...newvars];
    this.EmployeeListNew.splice(rowData,1)
  }
  deleteGroup(rowData: any) {
    // let newvars= this.GroupListNew;
    // let edit = newvars.findIndex(ele=>ele.OccupationType == rowData.OccupationType && ele.TotalNoOfPersons == rowData.TotalNoOfPersons && ele.SumInsured == rowData.SumInsured);
    // newvars.splice(edit,1);
    // this.GroupListNew=[...newvars];
    // console.log('MMMMMMM',this.GroupListNew)
    const index = this.FidelityListNew.findIndex(ele=>ele.LiabilityOccupationId == rowData.LiabilityOccupationId 
      && ele.OtherOccupation == rowData.OtherOccupation 
      && ele.FidEmpSi == rowData.FidEmpSi
      && ele.FidEmpCount == rowData.FidEmpCount
    );
    console.log('Item index:', index);
    if (index !== -1) {
        this.FidelityListNew.splice(index, 1);
        console.log('Item deleted:', rowData);
        console.log('Modified GroupListNew:', this.FidelityListNew);
    } else {
        console.log('Item not found:', rowData);
    }
  }
  getAooSIList(){
    this.aooSIList = [];
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.motorApiUrl}api/dropdown/medmalinsuranceaoo`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'label': '-Select-', 'value': null }]
        this.aooSIList = data.Result;
        for (let i = 0; i < this.aooSIList.length; i++) {
          this.aooSIList[i].label = this.aooSIList[i]['CodeDesc'];
          this.aooSIList[i].value = this.aooSIList[i]['Code'];
          delete this.aooSIList[i].CodeDesc;
          if (i == this.aooSIList.length - 1) {
            this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.aooSIList);
          }
        }
      },
      (err) => { },
    );
  }
  checkMachineryYNChanges(){
    console.log("Form",this.productItem,this.fields)
    if(this.productId=='19' || this.productId=='24'){
      let fields = this.fields[0].fieldGroup;
        // for(let field of fields){
        //   if(field.props.label=='Machinery BreakDown'){
        //       let tableData = field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
        //       tableData[0].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.PowerPlantSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       tableData[1].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ElecMachinesSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       tableData[2].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.EquipmentSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       tableData[3].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.MachineEquipSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       tableData[4].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.GeneralMachineSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       tableData[5].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ManuUnitsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       tableData[6].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.BoilerPlantsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
        //       if(!this.productItem.PowerPlantSIYN){this.productItem.PowerPlantSi = '0'; this.form?.controls['PowerPlantSi']?.setValue('0')}
        //       if(!this.productItem.ElecMachinesSIYN) {this.productItem.ElecMachinesSi = '0'; this.form?.controls['ElecMachinesSi']?.setValue('0')}
        //       if(!this.productItem.EquipmentSIYN) { this.productItem.EquipmentSi = '0'; this.form?.controls['EquipmentSi']?.setValue('0')}
        //       if(!this.productItem.MachineEquipSIYN) { this.productItem.MachineEquipSi = '0'; this.form?.controls['MachineEquipSi']?.setValue('0')}
        //       if(!this.productItem.GeneralMachineSIYN) { this.productItem.GeneralMachineSi = '0'; this.form?.controls['GeneralMachineSi']?.setValue('0')}
        //       if(!this.productItem.ManuUnitsSIYN) { this.productItem.ManuUnitsSi = '0'; this.form?.controls['ManuUnitsSi']?.setValue('0')}
        //       if(!this.productItem.BoilerPlantsSIYN) { this.productItem.BoilerPlantsSi = '0'; this.form?.controls['BoilerPlantsSi']?.setValue('0')}
        //   }
        // }
    }
    // else{
    //   let tableData = this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
    //   tableData[0].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.PowerPlantSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   tableData[1].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ElecMachinesSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   tableData[2].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.EquipmentSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   tableData[3].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.MachineEquipSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   tableData[4].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.GeneralMachineSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   tableData[5].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ManuUnitsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   tableData[6].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.BoilerPlantsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    //   if(!this.productItem.PowerPlantSIYN){this.productItem.PowerPlantSi = '0'; this.form?.controls['PowerPlantSi']?.setValue('0')}
    //   if(!this.productItem.ElecMachinesSIYN) {this.productItem.ElecMachinesSi = '0'; this.form?.controls['ElecMachinesSi']?.setValue('0')}
    //   if(!this.productItem.EquipmentSIYN) { this.productItem.EquipmentSi = '0'; this.form?.controls['EquipmentSi']?.setValue('0')}
    //   if(!this.productItem.MachineEquipSIYN) { this.productItem.MachineEquipSi = '0'; this.form?.controls['MachineEquipSi']?.setValue('0')}
    //   if(!this.productItem.GeneralMachineSIYN) { this.productItem.GeneralMachineSi = '0'; this.form?.controls['GeneralMachineSi']?.setValue('0')}
    //   if(!this.productItem.ManuUnitsSIYN) { this.productItem.ManuUnitsSi = '0'; this.form?.controls['ManuUnitsSi']?.setValue('0')}
    //   if(!this.productItem.BoilerPlantsSIYN) { this.productItem.BoilerPlantsSi = '0'; this.form?.controls['BoilerPlantsSi']?.setValue('0')}
    // }
  }
  getIndemityPeriodList(){
    this.indemityPeriodList = [];
   
    if(this.productId=='6' && this.insuranceId!='100002') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options;//this.fields[0].fieldGroup[0].fieldGroup[0].props.options=[];
    else if(this.productId=='19' || this.productId=='24'){
      console.log('NNNNNN',this.fields[0]);
      let fields = this.fields[0].fieldGroup;
      for(let field of fields){
        if(field.props.label=='Fire & Allied Perils'){
          //let defaultObj = [{ 'label': '-Select-', 'value': null }]
          field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options =[];
          // field.fieldGroup[0].fieldGroup[0].props.options = [];
        }
  }
    
      //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[0].props.options = [];
    }
    let ReqObj = {
      "IntemType":"INDEMITY_PERIOD",
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/indemity`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'label': '-Select-', 'value': '' }]
        this.indemityPeriodList = data.Result;
        for (let i = 0; i < this.indemityPeriodList.length; i++) {
          this.indemityPeriodList[i].label = this.indemityPeriodList[i]['CodeDesc'];
          this.indemityPeriodList[i].value = this.indemityPeriodList[i]['Code'];
          delete this.indemityPeriodList[i].CodeDesc;
          if (i == this.indemityPeriodList.length - 1) {
            if(this.productId=='6'){
              if(this.insuranceId!='100002')this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.indemityPeriodList);
                  //this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.indemityPeriodList);
                  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                  if (referenceNo) {
                    this.requestReferenceNo = referenceNo;
                    if(this.productId!='46' && this.productId!='4') this.getExistingBuildingList();
                    this.setCommonFormValues(null);
                  }
                  else {
                      this.productItem = new ProductData();
                      this.productItem.BuildingBuildYear = '';
                      this.productItem.MakutiYn = 'N';
                      this.formSection = true; this.viewSection = false;
                  }
            }
            else if(this.productId == '19'){
              console.log('NNNNNN',this.fields[0].fieldGroup);
              let fields = this.fields[0].fieldGroup;
              for(let field of fields){
                if(field.props.label=='Fire & Allied Perils'){
                  field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.indemityPeriodList);
                  //field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options= defaultObj.concat(this.indemityPeriodList);
                  //field.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.indemityPeriodList);
                }
          }
            }
            //else if(this.productId=='19'){this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.indemityPeriodList);}
          }
        }
      },
      (err) => { },
    );
  }
  cyberinsutypes(){
    //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];
    let ReqObj = {
     "BranchCode": this.branchCode,
     "InsuranceId": this.insuranceId,
   }
   let urlLink = `${this.CommonApiUrl}dropdown/cyberinsurancetypes`;
   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
     (data: any) => {
       let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
       this.CyperNewList = data.Result;
       // for (let i = 0; i < this.CyperNewList.length; i++) {
       //   this.CyperNewList[i].label = this.CyperNewList[i]['CodeDesc'];
       //   this.CyperNewList[i].value = this.CyperNewList[i]['Code'];
       //   delete this.CyperNewList[i].CodeDesc;
       //   if (i == this.CyperNewList.length - 1) {
       //     this.fields[0].fieldGroup[0].fieldGroup[1].props.options= defaultObj.concat(this.CyperNewList);
       //   }
       // }
     },
     (err) => { },
   );
 }
 productTypes(){
  let ReqObj = {
    "InsuranceId":this.insuranceId,
  "ProductId":this.productId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
      this.ProductsList = data.Result;
      // for (let i = 0; i < this.ProductsList.length; i++) {
      //   this.ProductsList[i].label = this.ProductsList[i]['CodeDesc'];
      //   this.ProductsList[i].value = this.ProductsList[i]['Code'];
      //   delete this.ProductsList[i].CodeDesc;
      //   if (i == this.ProductsList.length - 1) {
      //     this.fields[0].fieldGroup[0].fieldGroup[1].props.options= defaultObj.concat(this.ProductsList);
      //   }
      // }
    },
    (err) => { },
  );
}
  buglaryloss(){
    //this.buglaryValue = [];
    //this.fields[0].fieldGroup[0].fieldGroup[3].props.options = [];
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/firstlosspercent`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = []//[{ 'label': '-Select-', 'value': '' }]
        this.buglaryValue = data.Result;
        for (let i = 0; i < this.buglaryValue.length; i++) {
          this.buglaryValue[i].label = this.buglaryValue[i]['CodeDesc'];
          this.buglaryValue[i].value = this.buglaryValue[i]['Code'];
          //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
          delete this.buglaryValue[i].CodeDesc;
          if (i == this.buglaryValue.length - 1) {
            defaultObj = [{ 'label': '-Select-', 'value': '' }];
            if(this.productId!='19'){
              let lossFieldsList = this.fields[0].fieldGroup[3].fieldGroup[0].fieldGroup[0].fieldGroup[1];
              for(let entry of lossFieldsList?.fieldGroup){
                entry.fieldGroup[2].templateOptions.options = defaultObj.concat(this.buglaryValue);
              }
            }
            else{
              let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      let lossFieldsList =field.fieldGroup[0].fieldGroup[3].fieldGroup[0].fieldGroup[0].fieldGroup[1];
                      for(let entry of lossFieldsList?.fieldGroup){
                        entry.fieldGroup[2].templateOptions.options = defaultObj.concat(this.buglaryValue);
                      }
                  }
                }
            }
            
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
          }
          /*if (i == this.buglaryValue.length - 1) {
            //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].props.options
            this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
          }*/
        }
      },
      (err) => { },
    );
  }
  getWallMaterialList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/walltypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.wallMaterialList = data.Result;
          for (let i = 0; i < this.wallMaterialList.length; i++) {
            this.wallMaterialList[i].label = this.wallMaterialList[i]['CodeDesc'];
            this.wallMaterialList[i].value = this.wallMaterialList[i]['Code'];
            delete this.wallMaterialList[i].CodeDesc;
            if (i == this.wallMaterialList.length - 1) {
              if (this.productId == '1') {
                this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.wallMaterialList);
                this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.wallMaterialList);
              }
              else if(this.productId!='19' && this.productId!='59'){
                console.log( 'Fieldsss',this.fields[0].fieldGroup[0]);
                 this.fields[0].fieldGroup[2].fieldGroup[1].props.options = defaultObj.concat(this.wallMaterialList);
                //this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.wallMaterialList);
                //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.wallMaterialList);
              }
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                          console.log("Burglary Filtered Fields",field)
                      field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.wallMaterialList);
                      field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.wallMaterialList);
                  }
                  else if(field.props.label=='Building Risk'){
                    console.log("UsageFilter",field)
                    field.fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.wallMaterialList);
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
  getbuildingpurposeList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
    }
    let urlLink = `${this.CommonApiUrl}dropdown/buildingusage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (res.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.BuildingUsageList = data.Result;
          for (let i = 0; i < this.BuildingUsageList.length; i++) {
            this.BuildingUsageList[i].label = this.BuildingUsageList[i]['CodeDesc'];
            this.BuildingUsageList[i].value = this.BuildingUsageList[i]['Code'];
            delete this.BuildingUsageList[i].CodeDesc;
            if (i == this.BuildingUsageList.length - 1) {
              let fields = this.fields[0].fieldGroup;
                console.log('fieldsss',this.fields[0]);
                this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.BuildingUsageList);
              // for(let field of fields){
              //   if(this.fields[0].props.label=='Building Risk'){
              //       console.log("UsageFilter",field)
              //       field.fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.BuildingUsageList);
              //     //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.BuildingUsageList);
              //   }
              // }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getRoofMaterialList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/rooftypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.roofMaterialList = data.Result;
            for (let i = 0; i < this.roofMaterialList.length; i++) {
              this.roofMaterialList[i].label = this.roofMaterialList[i]['CodeDesc'];
              this.roofMaterialList[i].value = this.roofMaterialList[i]['Code'];
              delete this.roofMaterialList[i].CodeDesc;
              if (i == this.roofMaterialList.length - 1) {
                if (this.productId == '1') {
                  this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
                }
                else if(this.productId!='19' && this.productId!='59') {console.log('FFFFFFFF',this.fields[0].fieldGroup[3].fieldGroup[1]); this.fields[0].fieldGroup[3].fieldGroup[1].props.options = defaultObj.concat(this.roofMaterialList);}
                //this.fields[0].fieldGroup[0].fieldGroup[3]
                //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
                else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
                    }
                    else if(field.props.label=='Building Risk'){
                      field.fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
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
  getTypeOfProperty() {
    console.log('Types of Propertyss');
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/buildingpropertytypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.TypeOfPropertyss = data.Result;
            for (let i = 0; i < this.TypeOfPropertyss.length; i++) {
              this.TypeOfPropertyss[i].label = this.TypeOfPropertyss[i]['CodeDesc'];
              this.TypeOfPropertyss[i].value = this.TypeOfPropertyss[i]['Code'];
              delete this.TypeOfPropertyss[i].CodeDesc;
              if (i == this.TypeOfPropertyss.length - 1) {
                if (this.productId == '1') {
                  this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
                }
                else if(this.productId!='19' && this.productId!='59'){} 
                //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
                else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        //field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
                    }
                    else if(field.props.label=='Building Risk'){
                      field.fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(this.TypeOfPropertyss);
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
  getCeilingMaterialList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/ceilingtype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.ceilingMaterialList = data.Result;
            for (let i = 0; i < this.ceilingMaterialList.length; i++) {
              this.ceilingMaterialList[i].label = this.ceilingMaterialList[i]['CodeDesc'];
              this.ceilingMaterialList[i].value = this.ceilingMaterialList[i]['Code'];
              delete this.ceilingMaterialList[i].CodeDesc;
              if (i == this.ceilingMaterialList.length - 1) {
                if(this.productId!='19') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.ceilingMaterialList);
                else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.ceilingMaterialList);
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
  getRegionList() {
   
    let ReqObj = {
      "CountryId": this.countryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.regionList = data.Result;
          if (data.Result.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'Code': '' }]
            this.regionList = data.Result;
            console.log(this.regionList,"this.regionList");
              let i=0;
              for (let entry of this.regionList) {
                entry.label = entry['CodeDesc'];
                entry.value = entry['Code'];
                delete this.regionList[i].CodeDesc;
                i+=1;
                if(i==this.regionList.length){
                  if(this.productId=='27')
                  {
                    this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].templateOptions.options = defaultObj.concat(this.regionList);
                  }
                  if(this.productId=='1' || this.productId=='6'){
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='RegionCode') field.props.options = defaultObj.concat(this.regionList);
                    }
                  }
                  else if(this.productId=='16'){
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='RegionCode'){ field.templateOptions.options = defaultObj.concat(this.regionList); field.props.options = defaultObj.concat(this.regionList);}
                      console.log("Final Resgion",field)
                    }
                  }
                  else {
                      if(this.productId!='19' && this.productId!='6' && this.productId!='13') this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.regionList);
                  }
                }
              }
          }
        }
      },
      (err) => { },
    );
  }
  getFireLossList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "BURGLARY_FIRST_LOSS"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let lossList = data.Result;
          this.firstLossList = data.Result;
          if (data.Result.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'Code': '' }]
              let i=0;
              for (let entry of lossList) {
                entry.label = entry['CodeDesc'];
                entry.value = entry['Code'];
                i+=1;
                if(i==lossList.length){
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                  for(let field of fieldList){
                    if(field.key=='FireSumInsured') field.templateOptions.options = defaultObj.concat(lossList);
                  }
                }
              }
          }
        }
      })
  }
  getFidSumInsuredList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    "ItemType": "FIDELITY_SI",
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.sumInsuredList = data.Result;
          if (data.Result.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'Code': '' }]
            this.sumInsuredList = data.Result;
            console.log(this.sumInsuredList,"this.sumInsuredList");
            
            for (let i = 0; i < this.sumInsuredList.length; i++) {
              this.sumInsuredList[i].label = this.sumInsuredList[i]['CodeDesc'];
              this.sumInsuredList[i].value = this.sumInsuredList[i]['Code'];
              if (i == this.sumInsuredList.length - 1) {
                this.fieldsFidelity[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].templateOptions.options = defaultObj.concat(this.sumInsuredList);
                // else{
                //   let fields = this.fields[0].fieldGroup;
                //   for(let field of fields){
                //     if(field.props.label=='Burglary'){
                //             console.log("Burglary Filtered Fields Region",field)
                //         field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.regionList);
                //     }
                //   }
                // }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getWindowConsMaterialList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/windowsmaterials`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.windowMaterialList = data.Result;
            for (let i = 0; i < this.windowMaterialList.length; i++) {
              this.windowMaterialList[i].label = this.windowMaterialList[i]['CodeDesc'];
              this.windowMaterialList[i].value = this.windowMaterialList[i]['Code'];
              delete this.windowMaterialList[i].CodeDesc;
              if (i == this.windowMaterialList.length - 1) {
                if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.windowMaterialList);
                else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.windowMaterialList);
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
  getDoorsMaterilalList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/doorsmaterials`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.doorsMaterialList = data.Result;
            for (let i = 0; i < this.doorsMaterialList.length; i++) {
              this.doorsMaterialList[i].label = this.doorsMaterialList[i]['CodeDesc'];
              this.doorsMaterialList[i].value = this.doorsMaterialList[i]['Code'];
              delete this.doorsMaterialList[i].CodeDesc;
              if (i == this.doorsMaterialList.length - 1) {
               if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.doorsMaterialList);
               else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.doorsMaterialList);
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
  getNightLeftDoorList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/nightleftdoor`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.nightLeftDoors = data.Result;
            for (let i = 0; i < this.nightLeftDoors.length; i++) {
              this.nightLeftDoors[i].label = this.nightLeftDoors[i]['CodeDesc'];
              this.nightLeftDoors[i].value = this.nightLeftDoors[i]['Code'];
              delete this.nightLeftDoors[i].CodeDesc;
              if (i == this.nightLeftDoors.length - 1) {
                if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.nightLeftDoors);
                else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.nightLeftDoors);
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
  getBuildingOccupiedList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/buildingoccupied`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          if (res.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.buildingOccupiedList = data.Result;
            for (let i = 0; i < this.buildingOccupiedList.length; i++) {
              this.buildingOccupiedList[i].label = this.buildingOccupiedList[i]['CodeDesc'];
              this.buildingOccupiedList[i].value = this.buildingOccupiedList[i]['Code'];
              delete this.buildingOccupiedList[i].CodeDesc;
              if (i == this.buildingOccupiedList.length - 1) {
               if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.buildingOccupiedList);
               else{
                  let fields = this.fields[0].fieldGroup;
                  for(let field of fields){
                    if(field.props.label=='Burglary'){
                        field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.buildingOccupiedList);
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
  getInsuranceForList(){

    this.insuranceForList = [];
    if(this.productId!='19'){this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];}
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/burglaryinsurancefor`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.insuranceForList = data.Result;
        for (let i = 0; i < this.insuranceForList.length; i++) {
          this.insuranceForList[i].label = this.insuranceForList[i]['CodeDesc'];
          this.insuranceForList[i].value = this.insuranceForList[i]['Code'];
          delete this.insuranceForList[i].CodeDesc;
          if (i == this.insuranceForList.length - 1) {
            if(this.productId!='19'){
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.insuranceForList;
            }
            else{
              let fields = this.fields[0].fieldGroup;
              for(let field of fields){
                if(field.props.label=='Burglary'){
                    field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.insuranceForList;
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  onChangeDistrict(){

  }
  ongetDistrictList(type,value){
    let ReqObj;
    if(type=='region'){
      ReqObj = {
        "CountryId": this.countryId,
        "RegionCode": this.region
      }
    }
    else{
      ReqObj = {
        "CountryId": this.countryId,
        "RegionCode": this.productItem.RegionCode
      }
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.stateList = data.Result;
          if (data.Result.length != 0) {
            let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.stateList = data.Result;
            for (let i = 0; i < this.stateList.length; i++) {
              this.stateList[i].label = this.stateList[i]['CodeDesc'];
              this.stateList[i].value = this.stateList[i]['Code'];
              if(this.productId=='1' || this.productId=='6'){
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for(let field of fieldList){
                  if(field.key=='DistrictCode'){
                    field.templateOptions.options = defaultObj.concat(this.stateList);
                    if(type!='change'){
                      if(this.productItem.DistrictCode){;field.formControl.setValue(this.productItem.DistrictCode)}
                      else if (value!=null && value!=''){field.formControl.setValue(value)}
                    }
                  }
                }
              }
              else{
                if(this.productId=='16')this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = defaultObj.concat(this.stateList);
                else{
                  if (i == this.stateList.length - 1) {
                    if(this.productId!='19') this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.stateList);
                    //if (type == 'change') this.productItem.DistrictCode = '';
                  }
                }
              }
              if(this.productId=='27'){
                this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].templateOptions.options = defaultObj.concat(this.stateList);
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  checkDisable(fieldName) {
    if (this.endorsementSection) {
      let entry = this.enableFieldsList.some(ele => ele == fieldName);
      return !entry;
    }
    else return false;
  
  }
  onVehicleValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.FireSumInsured) {
      this.FireSumInsured = this.FireSumInsured.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedBusinessSI() {

    // format number
    if (this.BusinessSumInsured) {
      this.BusinessSumInsured = this.BusinessSumInsured.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  getExistingBuildingList(){
    let urlLink:any;
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId":"1",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    //if(this.productId=='59') urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
      if(this.productId=='57' || this.productId=='60' || this.productId=='39' 
          || this.productId=='19'   || this.productId=='26' || this.productId=='21'
         || this.productId=='42'  || this.productId=='24' || this.productId=='43') 
         urlLink = `${this.motorApiUrl}api/slide/getcommondetails`;
      else if(this.productId=='63' || this.productId=='61' || this.productId=='25' || this.productId=='6' ||
         this.productId=='16' || this.productId=='13' || this.productId=='59' || this.productId=='1' || this.productId=='14' || this.productId=='15' || this.productId=='32') { delete ReqObj['RiskId']; urlLink = `${this.motorApiUrl}api/slide/GetNonMotor`;}
      else urlLink =  `${this.motorApiUrl}api/geteservicebyriskid`;
      
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            if(data.Result){
                let entry:any;
                //if(this.productId=='59') entry = this.customerData[0];
                if(this.productId!='63' && this.productId!='61' && this.productId!='25' && this.productId!='16' && this.productId!='1' && this.productId!='14' && this.productId!='15' && this.productId!='32' && this.productId!='6' && this.productId!='13') entry = data.Result;
                else { 
                  entry = {...data.Result.PolicyInformation, ...data.Result.EndorsementDetails, ...data.Result.BrokerDetails}
                  if(data.Result.LocationList){entry['LocationList'] = data.Result.LocationList;if(this.productId!='14' && this.productId!='32')this.currentSectionIndex=0}
                  else entry['LocationList'] = [];
                }
                 this.colorSections=[];let j=0;
                 if(this.productId=='61' || this.productId=='25' || this.productId=='16' || this.productId=='1' || this.productId=='14' 
                  || this.productId=='32' || this.productId=='13' || this.productId=='6'){
                    this.productItem = new ProductData();
                    this.LocationListAlt = data.Result.LocationList;
                    if(this.LocationListAlt.length!=0){
                      if(this.LocationListAlt[0].SectionList.length!=0){
                          if( this.LocationListAlt[0].SectionList[0].IndustryId){
                              this.IndustryId = String(this.LocationListAlt[0].SectionList[0].IndustryId)
                          }
                          else if(this.LocationListAlt[0].SectionList[0].IndustryType){
                            this.IndustryId = String(this.LocationListAlt[0].SectionList[0].IndustryType)
                         }
                      }
                    }
                    this.setCommonValues()
                 }
                 this.updatedDetails = true;
                 if(this.productId=='59'){
                 if(entry.SectionIds.length!=0){
                  this.colorSections = entry.SectionIds;
                 }
                 if(this.colorSections.length!=0){
                  let fin= this.colorSections.find(ele => ele == '1')
                  if(fin){
                    this.BuildingOwnerYn='Y';
                  }
                  else {
                    this.BuildingOwnerYn='N';
                  }
                 }
                 if(this.colorSections.length!=0){
                     for(let color of this.colorSections)
                     {
                      if(color =='1') this.getBuildingDetails(color);
                      if(color =='3') {this.getAllRiskDetails(color);}
                      if(color =='47' || color=='74') this.getContentDetails(color);
                      if(color =='35') this.getPersonalAccidentDetails(color);
                      if(color =='36') this.getPersonalLiabilityDetails(color);
                      if(color =='40') this.getFireAlliedRiskDetails(color);
                      if(color =='45'){ this.getEmployeeRiskDetails(color)};
                      
                     }
                     j+=1;
                 }
                 let contents:boolean=false,building:boolean=false;
                let selectedSections = data?.Result?.SectionIds;
                 if(selectedSections.some(ele=>ele=='47')) contents = true;
                 if(selectedSections.some(ele=>ele=='40' || ele=='1')) building = true;
                 if(building) this.coversRequired = 'B';
                 if(contents) this.coversRequired = 'C';
                 if(building && contents) this.coversRequired = 'BC';
                 }
                 if(entry?.FinalizeYn!=null){
                  this.finalizeYN== entry?.FinalizeYn;
                  sessionStorage.setItem('FinalizeYN',this.finalizeYN);
                 }
                 else this.finalizeYN='N';
                  if(entry?.EndorsementDate!=null){
                    if(!sessionStorage.getItem('endorseTypeId')){
                      this.endorsementDetails = {
                        'EndorsementDate': entry?.EndorsementDate,
                        'EndorsementEffectiveDate': entry?.EndorsementEffectiveDate,
                        'EndorsementRemarks': entry?.EndorsementRemarks,
                        'EndorsementType': entry?.EndorsementType,
                        'EndorsementTypeDesc': entry?.EndorsementTypeDesc,
                        'EndtCategoryDesc': entry?.EndtCategoryDesc,
                        'EndtCount': entry?.EndtCount,
                        'EndtPrevPolicyNo': entry?.EndtPrevPolicyNo,
                        'EndtPrevQuoteNo': entry?.EndtPrevQuoteNo,
                        'EndtStatus': entry?.EndtStatus,
                        'IsFinanceEndt': entry?.IsFinanceEndt,
                        'OrginalPolicyNo': entry?.OrginalPolicyNo,
                      }
                      sessionStorage.setItem('endorseTypeId',JSON.stringify(this.endorsementDetails));
                    }
                  }
                this.applicationId = entry.ApplicationId;
                if(entry?.PolicyStartDate != null ){
                  var dateParts = entry?.PolicyStartDate.split("/");
                  // month is 0-based, that's why we need dataParts[1] - 1
                  this.policyStartDate = entry?.PolicyStartDate
                  //this.policyStartDate = dateObject.toString()
                }
                if(entry?.PolicyEndDate != null ){
                  var dateParts = entry?.PolicyEndDate.split("/");
                  this.policyEndDate = entry?.PolicyEndDate;
                  this.onChangeEndDate();
                }
                //this.executiveValue = entry?.AcExecutiveId;
                this.currencyCode = entry?.Currency;
                this.onCurrencyChange('direct');
                this.exchangeRate = entry?.ExchangeRate;
                if(this.exchangeRate==null) this.exchangeRate = "1.0";
               // if(this.productId!='16' && this.productId!='1')this.IndustryId = entry?.IndustryId;
                if(entry.BuildingOwnerYn!=null && entry?.BuildingOwnerYn!='') this.buildingOwnerYN = entry?.BuildingOwnerYn;
                this.promocode=entry?.Promocode;
                if(entry.SourceTypeId!=null) this.Code = entry?.SourceTypeId;
                if(this.productId!='63' && this.productId!='61' && this.productId!='25' && this.productId!='16' && this.productId!='1' && this.productId!='14' && this.productId!='13') this.branchCode = entry?.BranchCode;
                this.brokerbranchCode = entry?.BrokerBranchCode;
                this.customerCode = entry?.CustomerCode;
                this.brokerCode = entry?.BrokerCode;
                this.currentStatus = entry?.Status;
                if(this.userType!='Broker' && this.userType!='User') this.onSourceTypeChange('direct');
                let quoteStatus = sessionStorage.getItem('QuoteStatus');
                if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){ this.adminSection = true;this.issuerSection = false;}
                else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
                else this.issuerSection = false;
                if(this.productId=='42'){ this.ProductCode=entry?.SectionIds[0]; this.setCommonFormValues(null);}
              }
          }
      });
   
  }
  checkRowExist(location){
    if((this.productId=='16' || this.productId=='25' || this.productId=='14' || this.productId=='13' || this.productId=='15' || this.productId=='32') && (location.SectionList.length!=1 || ( ((this.productId=='16' || this.productId=='1') && location.SectionList[0].RegionCode!=null) || ((this.productId=='14' || this.productId=='15' || this.productId=='13') && ((location.SectionList[0].OccupationId!=null && location.SectionList[0].OccupationId!=undefined) || (location.SectionList[0].OccupationType!=undefined && location.SectionList[0].OccupationType!=null))) || (this.productId=='25' && location.SectionList[0].ContentId!=null) || (this.productId=='32' && location.SectionList[0].FidEmpSi!=null)))) return true
    else return false;
  }
  onDeleteCommonDetails(section,location,index){
     location.SectionList.splice(index,1);
  }
  onEditCommonDetails(section,location,index){
    this.currentSectionIndex = index;
    this.productItem = new ProductData();
    if(this.productId=='16'){
      this.productItem.RegionCode = section.RegionCode;
      this.productItem.DistrictCode = section.DistrictCode;
      this.productItem.MoneyDirectorResidence = section.MoneyDirectorResidence;
      this.productItem.MoneyInSafe = section.MoneySafeLimit;
      this.productItem.MoneyOutofSafe = section.MoneyOutofSafe;
      this.productItem.MoneySafeLimit = section.MoneySafeLimit;
      this.productItem.MoneyCollector = section.MoneyCollector;
      this.productItem.MoneyInTransit = section.StrongroomSi;
      this.productItem.MoneyAnnualEstimate = section.MoneyAnnualEstimate;
      this.ongetDistrictList('direct',this.productItem.DistrictCode)
    }
    else if(this.productId=='25'){
      this.productItem.ElecEquipSuminsured = section.ElecEquipSuminsured;
      this.productItem.ContentId = section.ContentId;
      this.productItem.Description = section.DescriptionOfRisk;
      this.productItem.Serial = section.SerialNo;
    }
    else if(this.productId=='1'){
      console.log(section)
      this.productItem.RegionCode = section.RegionCode;
      this.productItem.DistrictCode = section.DistrictCode;
      this.productItem.CoveringDetails = section.CoveringDetails;
      this.productItem.DescriptionOfRisk = section.DescriptionOfRisk;
      if(section?.FirstLossPercentId) this.productItem.FireSumInsured = String(section?.FirstLossPercentId);
      if(section?.SumInsured!='0' && section?.SumInsured!=0 && section?.SumInsured!=null) this.productItem.BurglarySi = section?.SumInsured;
      else if(section?.BurglarySi!=null && section.BurglarySi!=0 && section.BurglarySi!=undefined) this.productItem.BurglarySi = section?.BurglarySi;
      this.ongetDistrictList('direct',section.DistrictCode)
      
    }
    else if(this.productId=='14' || this.productId=='15'){
      if(section.OccupationId) this.productItem.LiabilityOccupationId = section.OccupationId;
      else if(section.OccupationType) this.productItem.LiabilityOccupationId = section.OccupationType;
      this.productItem.TotalNoOfEmployees = section.TotalNoOfEmployees;
      this.productItem.otheroption = section?.OtherOccupation;
      this.productItem.EmpLiabilitySi = section['SumInsured'];
    }
    else if(this.productId=='32'){
      this.productItem.FidEmpCount = section.FidEmpCount;
      if(section.SumInsured) this.productItem.FidEmpSi = String(section.SumInsured);
    }
    else if(this.productId=='13'){
      console.log(section,"sectionsection");
      
      if(section.OccupationId) this.productItem.OccupationType = section.OccupationType;
      else if(section.OccupationType) this.productItem.OccupationType = section.OccupationType;
      this.productItem.Name = section.NickName;
      this.productItem.Dob = section.dob;
      this.productItem.SumInsured = section.SumInsured
    }
    else if(this.productId=='61'){
      this.productItem.BondSI = section.SumInsured;
      this.productItem.TypeOfBond = section.BondType;
      if(section.IndustryType) this.productItem.IndustryId = String(section.IndustryType);
      this.productItem.NoOfYears = section.BondYear;
    }
  }
  addMoneyCommon(location){
    let valid = this.checkMoneyValidation();
    if(valid){
      let entry =null;
      if(this.productId=='16'){
         entry = {
          "SectionId":'42',
          "SectionName": "Money",
          "RegionCode" : this.productItem.RegionCode ? this.productItem.RegionCode : null,
          "DistrictCode" : this.productItem.DistrictCode ? this.productItem.DistrictCode : null,
          "MoneySafeLimit" : this.productItem.MoneySafeLimit ? this.productItem.MoneySafeLimit : '0',
          "MoneyDirectorResidence" : this.productItem.MoneyDirectorResidence ? this.productItem.MoneyDirectorResidence : '0',
          "MoneyOutofSafe" : this.productItem.MoneyOutofSafe ? this.productItem.MoneyOutofSafe : '0',
          "MoneyMajorLoss" : this.productItem.MoneyInTransit ? this.productItem.MoneyInTransit : '0',
          "MoneyCollector" : this.productItem.MoneyCollector ? this.productItem.MoneyCollector : '0',
          "StrongroomSi" : this.productItem.MoneyInSafe ? this.productItem.MoneyInSafe : '0',
          "MoneyAnnualEstimate" : this.productItem.MoneyAnnualEstimate ? this.productItem.MoneyAnnualEstimate : '0'
        }
      }
      else if(this.productId=='25'){
        entry = {
          "SectionId": "39",
          "SectionName": "Electronic Equipments",
          "RiskId": null,
          "ElecEquipSuminsured": this.productItem.ElecEquipSuminsured ? this.productItem.ElecEquipSuminsured : null,
          "ContentId": this.productItem.ContentId ? this.productItem.ContentId : null,
          "ContentDesc": null,
          "DescriptionOfRisk": this.productItem.Description ? this.productItem.Description : null,
          "SerialNo": this.productItem.Serial ? this.productItem.Serial : null
        }
      }
      else if(this.productId=='1'){
        entry = {
          "SectionId": "39",
          "SectionName": "Electronic Equipments",
          "RiskId": null,
          "FirstLossPercentId": this.productItem.FireSumInsured ? this.productItem.FireSumInsured : null,
          "CoveringDetails": this.productItem.CoveringDetails ? this.productItem.CoveringDetails : '0',
          "DescriptionOfRisk": this.productItem.DescriptionOfRisk ? this.productItem.DescriptionOfRisk : '0',
          "RegionCode" : this.productItem.RegionCode ? this.productItem.RegionCode : null,
          "DistrictCode" : this.productItem.DistrictCode ? this.productItem.DistrictCode : null,
          "FireSumInsured": this.productItem.FireSumInsured ? this.productItem.FireSumInsured : '0',
          "SumInsured": this.productItem.BurglarySi ? this.productItem.BurglarySi : '0',
          "BurglarySi": this.productItem.BurglarySi ? this.productItem.BurglarySi : '0'
        }
      }
      else if(this.productId=='14' || this.productId=='15'){
        if(this.productItem.EmpLiabilitySi!=null && this.productItem.EmpLiabilitySi!='0' && this.productItem.EmpLiabilitySi!=0){
          entry = {
            "RiskId": null,
            "OccupationId": this.productItem.LiabilityOccupationId,
            "TotalNoOfEmployees": this.productItem.TotalNoOfEmployees,
            "SumInsured":this.productItem.EmpLiabilitySi,
            "EmpLiabilitySi": this.productItem.EmpLiabilitySi,
            "OtherOccupation": this.productItem.otheroption
          }
          if(this.productId=='14'){entry["SectionId"]= "45";entry["SectionName"]= "Employers Liability";}
          else{entry["SectionId"]= "38";entry["SectionName"]= "Workmen Compensation";}
          location.SectionList = location.SectionList.filter(ele=>ele.TotalNoOfEmployees!=null && ele.TotalNoOfEmployees!='' && ele.EmpLiabilitySi!='0' && ele.EmpLiabilitySi!=null)
        }
      }
      else if(this.productId=='32'){
        if(this.productItem.FidEmpCount!=null && this.productItem.FidEmpSi!=null && this.productItem.FidEmpSi!='' && this.productItem.FidEmpSi!='0'){
          entry = {
            "SectionId": "43",
            "SectionName": "Fidelity",
            "RiskId": null,
            "OccupationId": '99999',
            "SumInsured": this.productItem.FidEmpCount,
            "FidEmpCount":this.productItem.FidEmpCount,
            "FidEmpSi":this.productItem.FidEmpSi
          }
          location.SectionList = location.SectionList.filter(ele=>ele.FidEmpCount!=null && ele.FidEmpCount!='' && ele.FidEmpSi!='0' && ele.FidEmpSi!=null)
        }
      }
      else if(this.productId=='13'){
        let dob;
       // this.addPA(location)
        if(this.productItem.Dob!=null && this.productItem.Dob!='' && this.productItem.Dob!=undefined){
          if(String(this.productItem.Dob).split('/').length==1) dob = this.datePipe.transform(this.productItem.Dob,'dd/MM/yyyy');
          else dob = this.productItem.Dob
        }
        let categoryId =this.occupationList.find(ele=>ele.Code==this.productItem.OccupationType).CategoryId
         entry =
          {
                "Dob":dob,
                "OccupationId": this.productItem.OccupationType,
                "NickName": this.productItem.Name,
                "NationalityId": "01",
                "SumInsured": this.productItem.SumInsured,
                "RiskId": null,
                "CategoryId": categoryId,
               // "LocationName": this.productItem.LocationName,
                "SectionId": "35"
          }
      }
      else if(this.productId=='6'){
        let entry = {};
        entry['SectionId'] = this.productItem.Section;
        entry['SectionDesc'] = this.productItem.SectionDesc;
        entry['BuildingAddress'] =  location.LocationName;
        entry['IndustryType'] = this.productItem.IndustryType;
        entry['IndustryTypeDesc'] = this.getFireIndustryDesc(this.productItem.IndustryType);
        entry['OccupationId'] = this.productItem.Occupation;
        entry['OccupationDesc'] = this.productItem.OccupationDesc;
        entry['CoveringDetails'] = this.productItem.CoveringDetails;
        entry['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;
        entry['RegionCode'] = this.productItem.RegionCode;
        entry['DistrictCode'] = this.productItem.DistrictCode;
        entry['Business_Interruption'] = this.productItem.BusinessName;
        entry['Business_InterruptionSI'] = this.productItem.BusinessSI;
        entry['BusinessNameDesc'] = this.getBusinessNameDesc(this.productItem.BusinessName);
        entry['SumInsured'] = this.productItem.BusinessSI;
        entry['BuildingSumInsured'] = this.productItem.BusinessSI;
      }
      if(this.currentSectionIndex!=null){if(entry) location.SectionList[this.currentSectionIndex] = entry;}
      else if(entry){location.SectionList.push(entry);}
      this.productItem = new ProductData();
      this.currentSectionIndex = null;
    }
  }
  getElectronicDesc(rowData){
    return this.dropList.find(ele=>ele.Code==rowData.ContentId)?.CodeDesc
  }
  getOccupationDesc(rowData){
    return this.occupationList.find(ele=>(ele.Code==rowData.OccupationId || ele.Code==rowData.OccupationType))?.CodeDesc
  }
  getSIDesc(rowData){
    return this.sumInsuredList.find(ele=>ele.Code==rowData.FidEmpSi)?.CodeDesc
  }
  checkMoneyValidation(){
    let fieldList =[]
     if(this.productId=='14' || this.productId=='15') fieldList = this.fieldsEmployee[0].fieldGroup[0].fieldGroup;
     else if(this.productId=='32') fieldList = this.fieldsFidelity[0].fieldGroup[0].fieldGroup;
     else fieldList = this.fields[0].fieldGroup[0].fieldGroup;
        let i=0,j=0;
        for(let field of fieldList){
          if((field.templateOptions.required==true || field.props.required==true) && this.productId!='6'){
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
            if(i==fieldList.length){
              return this.checkValidationCommon(j);
            }
          }
          else{
            i+=1;
            if(i==fieldList.length){
             return this.checkValidationCommon(j);
            }
          }
        }
  }
  checkValidationCommon(j){
    if(this.productId=='1'){
      if(this.productItem.RegionCode==null || this.productItem.RegionCode==''){j+=1;this.regionError=true;}
      else{this.regionError=false} 
      if(this.productItem.DistrictCode==null || this.productItem.DistrictCode==''){j+=1;this.districtError=true;}
      else{this.districtError=false} 
      if(this.productItem.FireSumInsured==null || this.productItem.FireSumInsured==''){j+=1;this.firstSIError=true;}
      else{this.firstSIError=false} 
      if(this.productItem.CoveringDetails==null || this.productItem.CoveringDetails==''){j+=1;this.coveringDetailsError=true;}
      else{this.coveringDetailsError=false} 
      if(this.productItem.DescriptionOfRisk==null || this.productItem.DescriptionOfRisk==''){j+=1;this.descriptionRiskError=true;}
      else{this.descriptionRiskError=false} 
      if(this.productItem.BurglarySi==null || this.productItem.BurglarySi=='' || this.productItem.BurglarySi=='0'){j+=1;this.sumInsuredError=true;}
      else{this.sumInsuredError=false} 
      return j==0
    }
    if(this.productId=='16'){
      if(this.productItem.RegionCode==null || this.productItem.RegionCode==''){j+=1;this.regionError=true;}
      else{this.regionError=false} 
      if(this.productItem.DistrictCode==null || this.productItem.DistrictCode==''){j+=1;this.districtError=true;}
      else{this.districtError=false} 
      if((this.productItem.MoneyAnnualEstimate==null || this.productItem.MoneyAnnualEstimate==0) && 
      (this.productItem.MoneyInTransit==null || this.productItem.MoneyInTransit==0) && 
      (this.productItem.MoneyCollector==null || this.productItem.MoneyCollector==0) && 
      (this.productItem.MoneySafeLimit==null || this.productItem.MoneySafeLimit==0) &&
      (this.productItem.MoneyOutofSafe==null || this.productItem.MoneyOutofSafe==0) &&
      (this.productItem.MoneyDirectorResidence==null || this.productItem.MoneyDirectorResidence==0) &&
      (this.productItem.MoneyDirectorResidence==null || this.productItem.MoneyDirectorResidence==0)){
          this.moneySIError = true;j+=1;
      }
      else{this.moneySIError=false;}
      return j==0
    }
    else if(this.productId=='6'){
      if(this.productItem.OccupationId==null || this.productItem.OccupationId==''){j+=1;this.OccupationError=true;}
      else{this.OccupationError=false} 
      if(this.productItem.Section==null || this.productItem.Section==''){j+=1;this.sectionError=true;}
      else{this.sectionError=false} 
      if(this.productItem.FireSumInsured==null || this.productItem.FireSumInsured=='' || this.productItem.FireSumInsured=='0'){j+=1;this.fireSIError=true;}
      else{this.fireSIError=false} 
      if(this.productItem.BusinessName==null || this.productItem.BusinessName==''){j+=1;this.businessNameError=true;}
      else{this.businessNameError=false;
          if(this.productItem.BusinessName!='0'){
            if(this.productItem.BusinessSI==null  || this.productItem.BusinessSI=='' || this.productItem.BusinessSI=='0'){j+=1;this.businessSIError=true;}
            else {this.businessSIError=false;}
          } else {this.businessSIError=false;}
      } 
      if(this.productItem.RegionCode==null || this.productItem.RegionCode==''){j+=1;this.regionError=true;}
      else{this.regionError=false} 
      if(this.productItem.DistrictCode==null || this.productItem.DistrictCode==''){j+=1;this.districtError=true;}
      else{this.districtError=false} 
      if(this.productItem.CoveringDetails==null || this.productItem.CoveringDetails==''){j+=1;this.coveringDetailsError=true;}
      else{this.coveringDetailsError=false} 
      if(this.productItem.DescriptionOfRisk==null || this.productItem.DescriptionOfRisk==''){j+=1;this.descriptionRiskError=true;}
      else{this.descriptionRiskError=false} 
      return j==0
    }
    else return j==0;
  }
  setCommonValues(){
    let entry = this.LocationListAlt.find(ele=>ele.LocationId==this.tabIndex+1);
    if(this.LocationListAlt.length!=0){
      
    }
    if(this.productId=='61'){
      this.productItem.BondSI = entry.SectionList[0]['SumInsured'];
      this.productItem.TypeOfBond = entry.SectionList[0].BondType;
      if(entry.SectionList[0].IndustryId) this.productItem.IndustryId = String(entry.SectionList[0].IndustryId);
      else if(entry.SectionList[0].IndustryType) this.productItem.IndustryId = String(entry.SectionList[0].IndustryType);
      this.productItem.NoOfYears = entry.SectionList[0].BondYear;
    }
    else if(this.productId=='6'){
      let section = entry.SectionList.filter(ele=>ele.SectionId!=ele.BusinessInterruption);
      if(section.length!=0){
         this.productItem.Section = section[0].SectionId;
         if(section[0].SectionDesc) this.productItem.SectionDesc =  section[0].SectionDesc;
         if(section[0].IndustryType) this.productItem.InsuranceType = String(section[0].IndustryType);
         else if(section[0].IndustryId) this.productItem.InsuranceType = String(section[0].IndustryId);
         this.getFireIndustryList('direct');this.filterSectionList('direct');this.onChangeBusinessSection()
         this.productItem.OccupationId = section[0].CategoryId;
         this.productItem.OccupationDesc = section[0].CategoryDesc;
         this.productItem.CoveringDetails = section[0].CoveringDetails;
         this.productItem.DescriptionOfRisk = section[0].DescriptionOfRisk;
         this.productItem.RegionCode = section[0].RegionCode;
         this.productItem.DistrictCode = section[0].DistrictCode;
         if(section[0].BusinessInterruption) this.productItem.BusinessName = Number(section[0].BusinessInterruption);
         else if(section[0].BusinessInterruption) this.productItem.BusinessName = Number(section[0].BusinessInterruption);
         this.productItem.BusinessSI = section[0].FirePlantSi;
         this.onChangeBusiness();
         this.productItem.FireSumInsured = section[0].BuildingSumInsured;
         if(this.productItem.RegionCode) this.ongetDistrictList('direct',this.productItem.DistrictCode);
      }
    }
    else if(this.productId=='25'){
      this.currentSectionIndex=0;
      this.productItem.ElecEquipSuminsured = entry.SectionList[0].ElecEquipSuminsured;
      this.productItem.ContentId = entry.SectionList[0].ContentId;
      this.productItem.Description = entry.SectionList[0].Description;
      this.productItem.Serial = entry.SectionList[0].SerialNo;
    }
    else if(this.productId=='16'){
      this.currentSectionIndex=0;
      if(this.LocationListAlt.length!=0){
        let entry = this.LocationListAlt[0].SectionList;
        if(entry.length!=0){
          this.IndustryId = entry[0].IndustryType;
          this.productItem.RegionCode = entry[0].RegionCode ? entry[0].RegionCode : null;
          this.productItem.DistrictCode = entry[0].DistrictCode ? entry[0].DistrictCode : null;
          this.productItem.MoneyInSafe = entry[0].MoneySafeLimit ? entry[0].MoneySafeLimit : null;
          this.productItem.MoneyDirectorResidence = entry[0].MoneyDirectorResidence ? entry[0].MoneyDirectorResidence : null;
          this.productItem.MoneyOutofSafe = entry[0].MoneyOutofSafe ? entry[0].MoneyOutofSafe : null;
          this.productItem.MoneySafeLimit = entry[0].MoneySafeLimit ? entry[0].MoneySafeLimit : null;
          this.productItem.MoneyCollector = entry[0].MoneyCollector ? entry[0].MoneyCollector : null;
          this.productItem.MoneyInTransit = entry[0].MoneyMajorLoss ? entry[0].MoneyMajorLoss : null;
          this.productItem.MoneyAnnualEstimate = entry[0].MoneyAnnualEstimate ? entry[0].MoneyAnnualEstimate : null;
          this.ongetDistrictList('direct',this.productItem.DistrictCode);
        }
      }
    }
    else if(this.productId=='14'){
      // this.currentSectionIndex=0;
      // let entry = this.LocationListAlt[0].SectionList;
      // if(entry.length!=0){
      //   this.IndustryId = entry[0].IndustryId;
      //   this.productItem.LiabilityOccupationId = entry[0].OccupationType;
      //   this.productItem.TotalNoOfEmployees = entry[0].TotalNoOfEmployees;
      //   this.productItem.otheroption = entry[0]?.OtherOccupation;
      //   this.productItem.EmpLiabilitySi = entry[0]?.EmpLiabilitySi;
      // }
    }
    else if(this.productId=='1'){let entry = this.LocationListAlt[0].SectionList; this.currentSectionIndex=0; this.onEditCommonDetails(entry[0],this.LocationListAlt[0],0)}
  }
  setCommonFormValues(type){
    if(this.productId!='14'){
      let refNo = sessionStorage.getItem('quoteReferenceNo');
      if(refNo==undefined) refNo = this.requestReferenceNo
      let ReqObj = {
        "RequestReferenceNo": refNo,
        "SectionId":  null
      }
      let urlLink = null;
      if(this.productId=='39'){ReqObj.SectionId='41';urlLink=`${this.motorApiUrl}api/slide9/getmachinerybreakdown`;}
      else if(this.productId=='13'){ReqObj.SectionId='35';ReqObj['RiskId']=null;urlLink=`${this.motorApiUrl}api/slide13/getpersonlaaccident`}
      else if(this.productId=='16'){ReqObj.SectionId='42';urlLink=`${this.motorApiUrl}api/slide10/getmoneydetails`;}
      else if(this.productId=='14'){ReqObj.SectionId='45';urlLink=`${this.motorApiUrl}api/slide7/getempliablity`;}
      else if(this.productId=='15'){ReqObj.SectionId='38';urlLink=`${this.motorApiUrl}api/slide7/getempliablity`;}
      else if(this.productId=='32'){ReqObj.SectionId='43';urlLink=`${this.motorApiUrl}api/slide8/getfidelityemp`;}
      else if(this.productId=='1'){ReqObj.SectionId='52';urlLink=`${this.motorApiUrl}api/slide3/getburglaryandhouse`;}
      else if(this.productId=='21'){ReqObj.SectionId='3';urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;}
      else if(this.productId=='26'){ReqObj.SectionId='3';urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;}
      else if(this.productId=='25'){ReqObj.SectionId='39';urlLink=`${this.motorApiUrl}api/slide6/getelectronicequip`;}
      else if(this.productId=='42'){ReqObj.SectionId=this.ProductCode;urlLink=`${this.motorApiUrl}api/slide6/getelectronicequip`;}
      else if(this.productId=='43'){ReqObj.SectionId='70';urlLink=`${this.motorApiUrl}api/slide12/getpublicliability`;}
      else if(this.productId=='27'){ReqObj.SectionId='54';urlLink=`${this.motorApiUrl}api/slide12/getpublicliability`;}
      else if(this.productId=='56'){ReqObj.SectionId=this.ProductCode;urlLink=`${this.motorApiUrl}api/slide15/gethealthinsure`;}
      else if(this.productId=='46'){ReqObj['Vehicleid']=this.vehicleId;urlLink=`${this.motorApiUrl}api/getmotordetails`;}
      else if(this.productId=='57'){ReqObj['SectionId']='45';urlLink=`${this.motorApiUrl}api/slide13/getpersonlaaccident`;}
      //else if(this.productId=='60'){ReqObj.SectionId='106';urlLink=`${this.motorApiUrl}api/slide15/gethumantype`;}
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
              let details = data?.Result;
              if(this.productId=='14'){
                this.EmployeeListNew = data.Result;
              }
              if( this.productId=='15'){
                if(data.Result.length!=0){
                  let entry = data.Result[0];
                  if(entry.EndorsementDate){
                      this.endorsementDate = entry?.EndorsementDate;
                      this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                      this.endorsementRemarks = entry?.EndorsementRemarks;
                      this.endorsementType = entry?.EndorsementType;
                      this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                      this.endtCategoryDesc = entry?.EndtCategoryDesc;
                      this.endtCount = entry?.EndtCount;
                      this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                      this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                      this.endtStatus = entry?.EndtStatus;
                      this.isFinanceEndt = entry?.IsFinanceEndt;
                      this.orginalPolicyNo = entry?.OrginalPolicyNo;
                  }
                  this.queryData = data.Result;
                  let entrys = this.queryData[0];
                  if(this.queryData[0].LiabilityOccupationId!='' && this.queryData[0].TotalNoOfEmployees!=''){
                    let i=0;
                    for(let s of this.queryData){
                      let entry={
                        "LiabilityOccupationId":s.LiabilityOccupationId,
                        "TotalNoOfEmployees":s.TotalNoOfEmployees,
                        "EmpLiabilitySi":s.EmpLiabilitySi,
                        "OtherOccupation":s.OtherOccupation,
                      }
                      this.EmployeeListNew.push(entry);
                      i+=1;
                    }
                  }
                  else{
                    //this.EmployeeListNew =[];
                  }
                  this.listSection=true;
                  this.listn=false;
                  var length = Object.keys(entrys).length;let i=0;
                  this.onoccChange('direct') ;
                  this.formSection = true; this.viewSection = false;
                }
                else{
                  // this.productItem.LiabilityOccupationId = '';
                  // this.productItem.employeeList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];  
                  // this.onoccChange('direct') ;   
                  this.formSection = true; this.viewSection = false;
                }
              }
              else if(this.productId=='32'){
                if(data.Result.length!=0){
                  let entry = data.Result[0];
                  if(entry.EndorsementDate){
                    this.endorsementDate = entry?.EndorsementDate;
                    this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                    this.endorsementRemarks = entry?.EndorsementRemarks;
                    this.endorsementType = entry?.EndorsementType;
                    this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                    this.endtCategoryDesc = entry?.EndtCategoryDesc;
                    this.endtCount = entry?.EndtCount;
                    this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                    this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                    this.endtStatus = entry?.EndtStatus;
                    this.isFinanceEndt = entry?.IsFinanceEndt;
                    this.orginalPolicyNo = entry?.OrginalPolicyNo;
                }
                this.queryData1 = data.Result;
                let entrys = this.queryData1[0];
                if(this.queryData1[0].LiabilityOccupationId!='' && this.queryData1[0].FidEmpCount!=''){
                  let i=0;
                  this.productItem.FidEmpCount = entrys.FidEmpCount;
                  this.productItem.FidEmpSi = entry.FidEmpSi;
                }
                
                this.onoccFedilityChange('direct');
                this.formSection = true; this.viewSection = false;
                }
                else{
                this.productItem.OccupationType = null;
                this.formSection = true; this.viewSection = false;
                }
              }
              else if(this.productId=='16'){
                if(details?.EndorsementDate){
                  this.endorsementDate = details?.EndorsementDate;
                  this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
                  this.endorsementRemarks = details?.EndorsementRemarks;
                  this.endorsementType = details?.EndorsementType;
                  this.endorsementTypeDesc = details?.EndorsementTypeDesc;
                  this.endtCategoryDesc = details?.EndtCategoryDesc;
                  this.endtCount = details?.EndtCount;
                  this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
                  this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
                  this.endtStatus = details?.EndtStatus;
                  this.isFinanceEndt = details?.IsFinanceEndt;
                  this.orginalPolicyNo = details?.OrginalPolicyNo;
                }
                this.productItem.StrongroomSi = details?.StrongroomSi;
                this.productItem.MoneySafeLimit=details?.MoneySafeLimit;
                this.productItem.MoneyOutofSafe=details?.MoneyOutofSafe;
                this.productItem.MoneyDirectorResidence=details?.MoneyDirectorResidence;
                this.productItem.MoneyCollector=details?.MoneyCollector;
                this.productItem.MoneyAnnualEstimate=details?.MoneyAnnualEstimate;
                this.productItem.MoneyMajorLoss=details?.MoneyMajorLoss;
                this.productItem.MoneyInTransit=details?.MoneyMajorLoss;
              //  this.productItem.FirstLossPayee = details?.FirstLossPayee;
                let list = data.Result;
                let i=0;
                for(let entry of list){
                  entry['StrongroomSi']=entry?.StrongroomSi
                  entry['MoneySafeLimit']=entry?.MoneySafeLimit;
                  entry['MoneyDirectorResidence']=entry?.MoneyDirectorResidence
                  entry['MoneyCollector']=entry?.MoneyCollector;
                  entry['MoneyAnnualEstimate']=entry?.MoneyAnnualEstimate
                  entry['MoneyMajorLoss']=entry?.MoneyMajorLoss;
                  entry['MoneyInTransit']=entry?.MoneyMajorLoss;
                  i+=1;if(i==list.length) this.TableRowMoney=list;
                }
               console.log(data.Result,"this.TableRowMoney");
                if(this.productItem.MoneySafeLimit!=null && this.productItem.MoneySafeLimit!='0' && this.productItem.MoneySafeLimit!='' && this.productItem.MoneySafeLimit!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
                if(this.productItem.MoneyOutofSafe!=null && this.productItem.MoneyOutofSafe!='0' && this.productItem.MoneyOutofSafe!='' && this.productItem.MoneyOutofSafe!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
                if(this.productItem.MoneyDirectorResidence!=null && this.productItem.MoneyDirectorResidence!='0' && this.productItem.MoneyDirectorResidence!='' && this.productItem.MoneyDirectorResidence!='0.0') this.productItem.MoneyInPremisesSIYN = true;
                if(this.productItem.MoneyCollector!=null && this.productItem.MoneyCollector!='0' && this.productItem.MoneyCollector!='' && this.productItem.MoneyCollector!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
                if(this.productItem.MoneyAnnualEstimate!=null && this.productItem.MoneyAnnualEstimate!='0' && this.productItem.MoneyAnnualEstimate!='' && this.productItem.MoneyAnnualEstimate!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
                if(this.productItem.MoneyMajorLoss!=null && this.productItem.MoneyMajorLoss!='0' && this.productItem.MoneyMajorLoss!='' && this.productItem.MoneyMajorLoss!='0.0') this.productItem.CashInTransitSIYN = true;
              
                // this.productItem.CashInHandEmployees = details?.CashInHandEmployees;
                // this.productItem.CashInSafe = details?.CashInSafe;
                // this.productItem.CashInTransit = details?.CashInTransit;
                // this.productItem.MoneyAnnualcarrySuminsured = details?.MoneyAnnualcarrySuminsured;
                // this.productItem.MoneyInPremises = details?.MoneyInPremises;
                // this.productItem.MoneyInSafeBusiness = details?.MoneyInSafeBusiness;
                // this.productItem.MoneyOutSafeBusiness = details?.MoneyOutSafeBusiness;
                // if(this.productItem.CashInHandEmployees!=null && this.productItem.CashInHandEmployees!='0' && this.productItem.CashInHandEmployees!='' && this.productItem.CashInHandEmployees!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
                // if(this.productItem.CashInSafe!=null && this.productItem.CashInSafe!='0' && this.productItem.CashInSafe!='' && this.productItem.CashInSafe!='0.0') this.productItem.CashInSafeSIYN = true;
                // if(this.productItem.CashInTransit!=null && this.productItem.CashInTransit!='0' && this.productItem.CashInTransit!='' && this.productItem.CashInTransit!='0.0') this.productItem.CashInTransitSIYN = true;
                // if(this.productItem.MoneyAnnualcarrySuminsured!=null && this.productItem.MoneyAnnualcarrySuminsured!='0' && this.productItem.MoneyAnnualcarrySuminsured!='' && this.productItem.MoneyAnnualcarrySuminsured!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
                // if(this.productItem.MoneyInPremises!=null && this.productItem.MoneyInPremises!='0' && this.productItem.MoneyInPremises!='' && this.productItem.MoneyInPremises!='0.0') this.productItem.MoneyInPremisesSIYN = true;
                // if(this.productItem.MoneyInSafeBusiness!=null && this.productItem.MoneyInSafeBusiness!='0' && this.productItem.MoneyInSafeBusiness!='' && this.productItem.MoneyInSafeBusiness!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
                // if(this.productItem.MoneyOutSafeBusiness!=null && this.productItem.MoneyOutSafeBusiness!='0' && this.productItem.MoneyOutSafeBusiness!='' && this.productItem.MoneyOutSafeBusiness!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
                this.checkMoneyYNChanges();
              }
              else if(this.productId=='39'){
                  if(details?.EndorsementDate){
                    this.endorsementDate = details?.EndorsementDate;
                    this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
                    this.endorsementRemarks = details?.EndorsementRemarks;
                    this.endorsementType = details?.EndorsementType;
                    this.endorsementTypeDesc = details?.EndorsementTypeDesc;
                    this.endtCategoryDesc = details?.EndtCategoryDesc;
                    this.endtCount = details?.EndtCount;
                    this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
                    this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
                    this.endtStatus = details?.EndtStatus;
                    this.isFinanceEndt = details?.IsFinanceEndt;
                    this.orginalPolicyNo = details?.OrginalPolicyNo;
                  }
                  if(this.insuranceId!='100004'){
                    this.productItem.PowerPlantSi = details?.MachinerySi;
                  //  this.productItem.FirstLossPayee = details?.FirstLossPayee;
                  }
                  else{
                    this.productItem.BoilerPlantsSi = details?.BoilerPlantsSi;
                    this.productItem.ElecMachinesSi = details?.ElecMachinesSi;
                    this.productItem.EquipmentSi = details?.EquipmentSi;
                    this.productItem.GeneralMachineSi = details?.GeneralMachineSi;
                    this.productItem.MachineEquipSi = details?.MachineEquipSi;
                    this.productItem.ManuUnitsSi = details?.ManuUnitsSi;
                    this.productItem.PowerPlantSi = details?.PowerPlantSi;
                   // this.productItem.FirstLossPayee = details?.FirstLossPayee;
                    if(this.productItem.BoilerPlantsSi!=null && this.productItem.BoilerPlantsSi!='0' && this.productItem.BoilerPlantsSi!='' && this.productItem.BoilerPlantsSi!='0.0') this.productItem.BoilerPlantsSIYN = true;
                    if(this.productItem.ElecMachinesSi!=null && this.productItem.ElecMachinesSi!='0' && this.productItem.ElecMachinesSi!='' && this.productItem.ElecMachinesSi!='0.0') this.productItem.ElecMachinesSIYN = true;
                    if(this.productItem.EquipmentSi!=null && this.productItem.EquipmentSi!='0' && this.productItem.EquipmentSi!='' && this.productItem.EquipmentSi!='0.0') this.productItem.EquipmentSIYN = true;
                    if(this.productItem.GeneralMachineSi!=null && this.productItem.GeneralMachineSi!='0' && this.productItem.GeneralMachineSi!='' && this.productItem.GeneralMachineSi!='0.0') this.productItem.GeneralMachineSIYN = true;
                    if(this.productItem.MachineEquipSi!=null && this.productItem.MachineEquipSi!='0' && this.productItem.MachineEquipSi!='' && this.productItem.MachineEquipSi!='0.0') this.productItem.MachineEquipSIYN = true;
                    if(this.productItem.ManuUnitsSi!=null && this.productItem.ManuUnitsSi!='0' && this.productItem.ManuUnitsSi!='' && this.productItem.ManuUnitsSi!='0.0') this.productItem.ManuUnitsSIYN = true;
                    if(this.productItem.PowerPlantSi!=null && this.productItem.PowerPlantSi!='0' && this.productItem.PowerPlantSi!='' && this.productItem.PowerPlantSi!='0.0') this.productItem.PowerPlantSIYN = true;
                    this.checkMachineryYNChanges();
                  }
                  
              }
              else if(this.productId =='13'){
                // "Dob":dob,
                // "OccupationId": rowData.OccupationType,
                // "PersonName": rowData.Name,
                // "NationalityId": "01",
                // "Salary": rowData.SumInsured,
                // "RiskId": i+1,
                // "LocationName": rowData.LocationName,
                // "SectionId": "35"
                let list = data.Result;
                let i=0;
                for(let entry of list){
                  entry['OccupationId']=entry?.OccupationType
                  entry['SumInsured']=entry?.SumInsured;
                  entry['Dob']=entry?.dob
                  entry['PersonName']=entry?.PersonName;
                  entry['LocationName']=entry?.LocationName
                  //entry['SumInsured']=entry?.SumInsured;
                  i+=1;if(i==list.length) this.tableRowPA=list;
                }
               console.log(data.Result,"this.tableRowPA");
              }
              else if(this.productId =='21'){
                this.productItem.MiningPlantSi  = details?.MiningPlantSi;
                this.productItem.NonminingPlantSi = details?.NonminingPlantSi;
                this.productItem.GensetsSi = details?.GensetsSi;
              }
              else if(this.productId =='26'){
               
                this.ProductCode = details?.SectionId;
                // this.getBusinessAllRiskDetails(this.ProductCode);
                // this.getExistingBuildingList();
                this.productItem.EquipmentSi  = details?.EquipmentSi;
                if (this.productId=='26'){
                  this.productItem.IndustryBussinessAllRisk = this.IndustryId;
                  }
                this.formSection = true; this.viewSection = false;
              }
              else if(this.productId =='25'){
                this.TableRowEE= data?.Result
                this.ProductCode = details?.SectionId;
                this.productItem.ElectronicEquipSuminsured  = details?.ElecEquipSuminsured;
              }
              else if(this.productId=='1'){
                this.productItem.BurglarySi  = details?.BurglarySi;
                if(details?.EndorsementDate){
                  this.endorsementDate = details?.EndorsementDate;
                  this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
                  this.endorsementRemarks = details?.EndorsementRemarks;
                  this.endorsementType = details?.EndorsementType;
                  this.endorsementTypeDesc = details?.EndorsementTypeDesc;
                  this.endtCategoryDesc = details?.EndtCategoryDesc;
                  this.endtCount = details?.EndtCount;
                  this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
                  this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
                  this.endtStatus = details?.EndtStatus;
                  this.isFinanceEndt = details?.IsFinanceEndt;
                  this.orginalPolicyNo = details?.OrginalPolicyNo;
                }
                this.productItem.AccessibleWindows = details?.AccessibleWindows;
                this.productItem.Address = details?.Address;
                this.productItem.BackDoors = details?.BackDoors;
                this.productItem.BuildingOccupied = details?.BuildingOccupied;
                this.productItem.CeilingType = details?.CeilingType;
                 if(details?.RegionCode!=null && details?.RegionCode!=''){
                  // this.productItem.RegionCode = details?.RegionCode;
                  // this.productItem.DistrictCode = details?.DistrictCode
                  // this.ongetDistrictList('direct',this.productItem.DistrictCode);
                  
                }
                this.productItem.DoorsMaterialId = details?.DoorsMaterialId;
                this.productItem.WallType = details?.WallType;
                this.productItem.RoofType = details?.RoofType;
                this.productItem.BuildingOwnerYn = details?.BuildingOwnerYn;
                this.productItem.BuildingBuildYear = details?.BuildingBuildYear;
                this.productItem.FrontDoors = details?.FrontDoors;
                this.productItem.InternalWallType = details?.InternalWallType;
                this.productItem.NatureOfTradeId = details?.NatureOfTradeId;
                this.productItem.NightLeftDoor = details?.NightLeftDoor;
                this.productItem.OccupiedYear = details?.OccupiedYear;
                this.productItem.ShowWindow = details?.ShowWindow;
                this.productItem.TrapDoors = details?.TrapDoors;
                this.productItem.WatchmanGuardHours = details?.WatchmanGuardHours;
                this.productItem.WindowsMaterialId = details?.WindowsMaterialId;
                this.productItem.ApplianceSi = details?.ApplianceSi;
                this.productItem.GoodsSi = details?.GoodsSi;
                this.productItem.FurnitureSi = details?.FurnitureSi;
                this.productItem.CashValueablesSi = details?.CashValueablesSi;
                this.productItem.StockInTradeSi = details?.StockInTradeSi;
                if(details?.ApplianceLossPercent!='0' && details?.ApplianceLossPercent != null) this.productItem.ApplianceLossPercent = details?.ApplianceLossPercent;
                if(details?.CashValueablesLossPercent!='0' && details?.CashValueablesLossPercent != null) this.productItem.CashValueablesLossPercent = details?.CashValueablesLossPercent;
                if(details?.FurnitureLossPercent!='0' && details?.FurnitureLossPercent != null) this.productItem.FurnitureLossPercent = details?.FurnitureLossPercent;
                if(details?.GoodsLossPercent!='0' && details?.GoodsLossPercent != null) this.productItem.GoodsLossPercent = details?.GoodsLossPercent;
                if(details?.StockLossPercent!='0' && details?.StockLossPercent != null) this.productItem.StockLossPercent = details?.StockLossPercent;
                if (details?.InsuranceForId != null) {
                  let value = {}, i = 0;
                  for (let element of details?.InsuranceForId) {
                    if (element != '0') {
                      value[element] = true;
                    }
                    i += 1;
                    if (i == details?.InsuranceForId.length) this.productItem.InsuranceForId = value;
                  }
                }
                
              }
              else if(this.productId == '42'){
                console.log('Product 42 Details',details);
                this.ProductCode = details?.SectionId;
                this.CyberCode=details?.OccupationType;
              }
              else if(this.productId=='43'){
                if(details.AggSumInsured!='' && details.AggSumInsured!=null) this.productItem.AggSumInsured = details.AggSumInsured;
                  if(details.AooSumInsured!='' && details.AooSumInsured!=null){this.productItem.AooSumInsured = details.AooSumInsured; this.ongetAggSIList('direct')}
                  this.productItem.Category = details.Category;
                // if(details.EndorsementDate !=undefined && details.EndorsementDate !=null){
                //   this.endorsementDate = details?.EndorsementDate;
                //   this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
                //   this.endorsementRemarks = details?.EndorsementRemarks;
                //   this.endorsementType = details?.EndorsementType;
                //   this.endorsementTypeDesc = details?.EndorsementTypeDesc;
                //   this.endtCategoryDesc = details?.EndtCategoryDesc;
                //   this.endtCount = details?.EndtCount;
                //   this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
                //   this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
                //   this.endtStatus = details?.EndtStatus;
                //   this.isFinanceEndt = details?.IsFinanceEndt;
                //   this.orginalPolicyNo = details?.OrginalPolicyNo;
                // }
                  
              }
              else if(this.productId=='46'){
                this.productItem = new ProductData();
                this.motorDetails = data.Result;
                this.vehicleDetails = data.Result;
                this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
                this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
                this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
                this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
                this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
                this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
                this.productItem.ChassisNo = this.vehicleDetails.Chassisnumber;
                this.productItem.RegistrationNo = this.vehicleDetails.Registrationnumber;
                this.productItem.ManufactureYear = data.Result.ManufactureYear;
                this.productItem.Color = data.Result.Color;
                // this.productItem.EngineNo = 
                if(this.productItem.ChassisNo == this.productItem.RegistrationNo){this.productItem.RegistrationNo=null;}
                if(this.customerDetails) this.productItem.OwnerName = this.customerDetails.ClientName;
                this.productItem.SeatingCapacity = data.Result.SeatingCapacity;
                this.productItem.EngineNo = data.Result.EngineNumber;
                this.productItem.EngineCapacity = data.Result.EngineCapacity;
                this.productItem.ManufactureYear = data.Result.ManufactureYear;
                  if(this.customerDetails?.PolicyHolderType){
                    this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
                  } 
                  this.getFuelTypeList();
                  this.getYearList();
                  this.getColorsList();
                  this.getBodyTypeList();
                  this.getUsageList();
                  this.getMotorCategoryList();
                  this.getMakeList();
                  if(type=='Group'){
                     this.saveMotorRiskDetails(type,'indirect')
                  }
              }
              else if(this.productId=='27'){
                this.ProductCode = details?.SectionId;
                this.productItem.LegalLiabilityAnnualAggreagte = details?.LiabilitySi;
                this.productItem.ProductTurnover = details?.ProductTurnoverSi;
                this.productItem.InsurancePeriodSi = details?.InsurancePeriodSi;
                this.productItem.AnyAccidentSi = details?.AnyAccidentSi;
              }
              else if(this.productId=='56'){
                let i=0;
                let details = data.Result;
                  for(let s of details){
                      let entry = {
                        "RequestReferenceNo": s?.RequestReferenceNo,
                        "ProductId": s?.ProductId,
                        "SectionId": s?.SectionId,
                        "InsuranceId": s?.InsuranceId,
                        "CreatedBy": this.loginId,
                        "RiskId": s?.RiskId,
                        "RelationType": s?.RelationType,
                        "RelationTypeDesc": s?.RelationTypeDesc,
                        "DateOfBirth": s?.DateOfBirth,
                        "NickName": s?.NickName
                    }
                    if(entry.DateOfBirth){
                      let dateList = String(entry.DateOfBirth).split('/');
                      if(dateList.length>1){
                        entry.DateOfBirth = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
                      }
                    }
                    if(i==0){
                      this.ProductCode = s.SectionId;
                      if(entry.RelationType==null || entry.RelationType=='') entry.RelationType = '1';
                    }
                    else if(entry.RelationType==null || entry.RelationType==undefined) entry.RelationType = '';
                    this.productItem.patientList.push(entry);
                    i+=1;
                    if(i==details.length){
                      this.getRelationTypeList();
                    }
                  }
                
              }
              else if(this.productId=='57'){
                this.GroupListNew = data.Result.filter(ele=>ele.OccupationType!=null && ele.OccupationType!='');
              if(this.GroupListNew.length!=0){
                this.listSectionGroup = true;
                this.listnGroup = false;
              }
              }
              else if(this.productId=='60'){
                console.log('details',details[0])
                this.productItem.ProfessionalOccupation = details[0]?.OccupationId;
               
                this.productItem.ProfessionalType= details[0]?.ProfessionalType;
                // this.productItem.EmployeeCounts= details?.OccupationId
                // this.productItem.ProfessionalSI= details?.OccupationId
                // this.productItem.GISI= details?.OccupationId
                // this.productItem.IndemnityTypes= details?.OccupationId
              }
              else{
                if(this.productId=='6' && this.insuranceId == '100004'){
                  //this.productItem.FireBuildingSi=details?.FireBuildingSi;
                  this.productItem.BuildingSuminsured = details?.BuildingSuminsured;
                  this.productItem.FireEquipSi=details?.FireEquipSi;
                  this.productItem.FirePlantSi=details?.FirePlantSi;
                  this.productItem.FireStockSi=details?.StockInTradeSi;
                }
                if(this.productId=='6' && this.insuranceId == '100002'){
                  this.productItem.BuildingSuminsured = details?.BuildingSuminsured;
                  this.productItem.onAssetSumInsured = details?.OnAssetsSi;
                  this.productItem.onStockSumInsured = details?.OnStockSi;
                }
                this.productItem.IndemityPeriod = details?.IndemityPeriod;
                if(details.MakutiYn==null || details.MakutiYn=="" || details.MakutiYn==undefined) this.productItem.MakutiYn='N';
                else this.productItem.MakutiYn=details?.MakutiYn;
                this.productItem.BuildingSuminsured = details?.BuildingSuminsured;
                this.formSection = true; this.viewSection = false;
              }
              if(this.productId!='46') {this.formSection = true; this.viewSection = false;}
          }
        },
        (err) => { },
      );
    }
    else {this.formSection = true; this.viewSection = false;}
  }
  setBuildingOwnerYN(){
    if(this.BuildingOwnerYn!='Y'){
       this.coversRequired = 'C'
    }
    else if(this.coversRequired==null) this.coversRequired='BC';
  }
  editMoney(rowData,index){
    this.Moneyform=true;
    let edit = rowData.RiskId;
    this.currentMoneyIndex = edit;
    if(edit==undefined) this.currentMoneyIndex=index+1;
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){
      if(field.key=='MoneyDirectorResidence')  field.formControl.setValue(rowData.MoneyDirectorResidence);
      if(field.key=='MoneyMajorLoss')  field.formControl.setValue(rowData.MoneyMajorLoss);
      if(field.key=='StrongroomSi')  field.formControl.setValue(rowData.StrongroomSi);
      if(field.key=='MoneySafeLimit')  field.formControl.setValue(rowData.MoneySafeLimit);
      if(field.key=='MoneyCollector')  field.formControl.setValue(rowData.MoneyCollector);
      if(field.key=='MoneyAnnualEstimate')  field.formControl.setValue(rowData.MoneyAnnualEstimate);
      if(field.key=='MoneyInTransit')  field.formControl.setValue(rowData.MoneyInTransit);
      if(field.key=='MoneyInSafe')  field.formControl.setValue(rowData.MoneyInSafe);
      if(field.key=='MoneyOutofSafe')  field.formControl.setValue(rowData.MoneyOutofSafe);
      if(field.key=='LocationName')  field.formControl.setValue(rowData.LocationName);
      if(field.key=='RegionCode')  field.formControl.setValue(rowData.RegionCode);
      if(field.key=='DistrictCode')  field.formControl.setValue(rowData.DistrictCode);
    }
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
    if(referenceNo){
      this.getMoneyDetails(rowData);
    }
    }
   
  editPA(rowData,index){
    this.isEEForm=true;
    let edit = rowData.RiskId;
    this.currentPAIndex = edit;
    if(edit==undefined) this.currentPAIndex=index+1;
    //this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(rowData.LocationName);
    this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(rowData.OccupationId);
    this.fields[0].fieldGroup[0].fieldGroup[1].formControl.setValue(rowData.CustomerName);
    this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(rowData.Dob);
    this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(rowData.SumInsured);
    //console.log(this.currentPAIndex,"this.currentPAIndex");
    this.getPersonalAccidentDetails(rowData);
  }
  editEE(rowData,index){
     let edit = rowData.RiskId;
     this.currentEEIndex = edit;
     if(edit==undefined) this.currentEEIndex=index+1;
     this.isEEForm=true;
     //this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(rowData.LocationName);
     this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(rowData.ContentId);
     this.fields[0].fieldGroup[0].fieldGroup[1].formControl.setValue(rowData.SerialNo);
    // this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(rowData.FirstLossPayee);
     this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(rowData.Description);
     this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(rowData.ElecEquipSuminsured);
     //console.log(this.currentPAIndex,"this.currentPAIndex");
     this.getElectronicEquipment(rowData);
   }
  getYearList() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const currentYear = new Date().getFullYear() - 40, years = [];
    while (year >= currentYear) {
      let yearEntry = year--
      years.push({ "label": String(yearEntry), "value": String(yearEntry) });
      if (year == currentYear) {
        let defaultObj = [{ 'label': '-Select-', 'value': '','Code':'' }]
        if (this.productId != '59' && this.productId!='46') this.fields[0].fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(years);
        if(this.productId=='46'){
          let fields = this.fields[0].fieldGroup[0].fieldGroup;
          for(let field of fields){
            console.log("Received Iterate",field)
            if(field.key=='ManufactureYear'){
              field.props.options = defaultObj.concat(years);
            }
          }
          //this.fields[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(years);
        }
        //if(this.productId=='59') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(years);
        if(this.productId!='46'){
          let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceNo) {
            this.requestReferenceNo = referenceNo;
            if (this.productId != '19' && this.productId != '59' && this.productId!='24' && this.productId!='46' && this.productId!='4') this.setFormValues();
            else this.setSMEFormValues('edit')
          }
          else if (this.productId != '19' && this.productId!='24'){
            this.productItem = new ProductData();
            this.productItem.OccupationType = '';
            if(this.productItem.PersonalAccidentSuminsured== '' || this.productItem.PersonalAccidentSuminsured==null){
              this.productItem.PersonalAccidentSuminsured='0';
            }
            this.policyStartDate = this.datePipe.transform(new Date(),'dd/MM/yyyy') ;
            this.onStartDateChange('change');
            this.formSection = true; this.viewSection = false;
    
          }
        }
        
      }
  
    }
  }
  setSMEFormValues(type) {
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo
    }
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data)
        let customerDatas = data.Result[0];
        this.productItem.IndustryId = customerDatas?.IndustryId;
  
        let entry = this.industryList.find(ele => ele.Code == this.productItem.IndustryId)
        if (customerDatas?.WallType != null && customerDatas?.WallType != undefined) this.productItem.WallType = customerDatas?.WallType;
        else this.productItem.WallType = '';
        if (customerDatas?.RoofType != null && customerDatas?.RoofType != undefined) this.productItem.RoofType = customerDatas?.RoofType;
        else this.productItem.RoofType = '';
        this.productItem.BuildingBuildYear = customerDatas?.BuildingBuildYear;
        this.productItem.BuildingUsageId = customerDatas?.BuildingUsageId;
        this.productItem.BuildingOwnerYn = customerDatas?.BuildingOwnerYn;
        if(customerDatas?.OccupationType!=null) this.productItem.OccupationType = customerDatas?.OccupationType;
        else this.productItem.OccupationType = '';
        this.productItem.InbuildConstructType = customerDatas?.InbuildConstructType;
        this.productItem.OutbuildConstructType = customerDatas?.OutbuildConstructType;
        this.productItem.BuildingFloors = customerDatas?.BuildingFloors;
        this.productItem.CategoryId = customerDatas?.CategoryId;
        this.productItem.LiabilityOccupationId = customerDatas?.LiabilityOccupationId;
        if (this.endorsementSection) {
          this.endorsementDate = customerDatas?.EndorsementDate;
          this.endorsementEffectiveDate = customerDatas?.EndorsementEffectiveDate;
          this.endorsementRemarks = customerDatas?.EndorsementRemarks;
          this.endorsementType = customerDatas?.EndorsementType;
          this.endorsementTypeDesc = customerDatas?.EndorsementTypeDesc;
          this.endtCategoryDesc = customerDatas?.EndtCategoryDesc;
          this.endtCount = customerDatas?.EndtCount;
          this.endtPrevPolicyNo = customerDatas?.EndtPrevPolicyNo;
          this.endtPrevQuoteNo = customerDatas?.EndtPrevQuoteNo;
          this.endtStatus = customerDatas?.EndtStatus;
          this.isFinanceEndt = customerDatas?.IsFinanceEndt;
          this.orginalPolicyNo = customerDatas?.OrginalPolicyNo;
        }
        if (this.productId != '59' && this.productId != '19' && this.productId!='24' && this.productId!='6') this.getIndustryList();
        if (this.productId=='59' || this.productId == '19' || this.productId=='24') {
          let sectionId = customerDatas?.SectionId;
          this.sectionList = sectionId;
          let contents = sectionId.some(ele => ele == '47');
          let building = sectionId.some(ele => ele == '1' || ele == '40');
          if (building && contents) this.coversRequired = 'BC';
          else if (building) this.coversRequired = 'B';
          else if (contents) this.coversRequired = 'C';
        }
        if (customerDatas?.BuildingSuminsured != null) {
          this.productItem.BuildingSuminsured = customerDatas?.BuildingSuminsured;
        }
        else {
          this.productItem.BuildingSuminsured = '0';
        }
        if (customerDatas?.ContentSuminsured != null && customerDatas?.ContentSuminsured != '0' && customerDatas?.ContentSuminsured != undefined) {
          this.productItem.ContentSuminsured = customerDatas?.ContentSuminsured;
        }
        else this.productItem.ContentSuminsured = '0';
        if (customerDatas?.ElecEquipSuminsured != null && customerDatas?.ElecEquipSuminsured != '0') {
          this.productItem.ElecEquipSuminsured = customerDatas?.ElecEquipSuminsured;
          this.productItem.BreakDownCoverYN = 'Yes';
        }
        else {
          this.productItem.ElecEquipSuminsured = '0';
          this.productItem.BreakDownCoverYN = 'No';
        }
        if (customerDatas?.GoodsTurnoverSuminsured != null && customerDatas?.GoodsTurnoverSuminsured != '0') {
          this.productItem.GoodsTurnoverSuminsured = customerDatas?.GoodsTurnoverSuminsured;
          this.productItem.GoodsSinglecarrySuminsured = customerDatas?.GoodsSinglecarrySuminsured;
          this.productItem.GoodsYN = 'Yes';
        }
        else {
          this.productItem.GoodsTurnoverSuminsured = '0';
          this.productItem.GoodsSinglecarrySuminsured = '0';
          this.productItem.GoodsYN = "No"
        }
        if (customerDatas?.MoneyAnnualcarrySuminsured) this.productItem.MoneyAnnualcarrySuminsured = customerDatas?.MoneyAnnualcarrySuminsured;
        else this.productItem.MoneyAnnualcarrySuminsured = '0';
        if (customerDatas?.MoneySinglecarrySuminsured) this.productItem.MoneySinglecarrySuminsured = customerDatas?.MoneySinglecarrySuminsured;
        else this.productItem.MoneySinglecarrySuminsured = '0';
        if (customerDatas?.MoneyInsafeSuminsured) this.productItem.MoneyInsafeSuminsured = customerDatas?.MoneyInsafeSuminsured;
        else this.productItem.MoneyInsafeSuminsured = '0';
        if (customerDatas?.CashInTransit) this.productItem.CashInTransit = customerDatas?.CashInTransit;
        else this.productItem.CashInTransit = '0';
        if (customerDatas?.CashInHandEmployees) this.productItem.CashInHandEmployees = customerDatas?.CashInHandEmployees;
        else this.productItem.CashInHandEmployees = '0';
        if (customerDatas?.CashInSafe) this.productItem.CashInSafe = customerDatas?.CashInSafe;
        else this.productItem.CashInSafe = '0';
        if (customerDatas?.MoneyInSafeBusiness) this.productItem.MoneyInSafeBusiness = customerDatas?.MoneyInSafeBusiness;
        else this.productItem.MoneyInSafeBusiness = '0';
        if (customerDatas?.MoneyOutSafeBusiness) this.productItem.MoneyOutSafeBusiness = customerDatas?.MoneyOutSafeBusiness;
        else this.productItem.MoneyOutSafeBusiness = '0';
        if (customerDatas?.MoneyInPremises) this.productItem.MoneyInPremises = customerDatas?.MoneyInPremises;
        else this.productItem.MoneyInPremises = '0';
        if (customerDatas?.MoneyInLocker) this.productItem.MoneyInLocker = customerDatas?.MoneyInLocker;
        else this.productItem.MoneyInLocker = '0';
        //this.productItem.MoneyCoverYN = 'Yes';
        if (customerDatas?.FidelityAnnualSuminsured != null && customerDatas?.FidelityAnnualSuminsured != '0') {
          this.productItem.FidelityAnnualSuminsured = customerDatas?.FidelityAnnualSuminsured;
          this.productItem.FidelityAnyoccuSuminsured = customerDatas?.FidelityAnyoccuSuminsured;
          this.productItem.FidelityCoverYN = 'Yes';
        }
        else {
          this.productItem.FidelityAnnualSuminsured = '0';
          this.productItem.FidelityAnyoccuSuminsured = '0';
          this.productItem.FidelityCoverYN = 'No';
        }
        if (customerDatas?.TpliabilityAnyoccuSuminsured != null && customerDatas?.TpliabilityAnyoccuSuminsured != '0') {
          this.productItem.TpliabilityAnyoccuSuminsured = customerDatas?.TpliabilityAnyoccuSuminsured;
          this.productItem.LiabilityYN = 'Yes';
        }
        else {
          this.productItem.TpliabilityAnyoccuSuminsured = '0';
          this.productItem.LiabilityYN = 'No';
        }
        if (customerDatas?.EmpliabilityExcessSuminsured != null && customerDatas?.EmpliabilityExcessSuminsured != '0') {
          this.productItem.EmpliabilityExcessSuminsured = customerDatas?.EmpliabilityExcessSuminsured;
          this.productItem.EmpliabilityAnnualSuminsured = customerDatas?.EmpliabilityAnnualSuminsured;
          this.productItem.WcYN = 'Yes';
        }
        else {
          this.productItem.EmpliabilityExcessSuminsured = '0';
          this.productItem.EmpliabilityAnnualSuminsured = '0';
          this.productItem.WcYN = 'No';
        }
        if (customerDatas?.PersonalAccSuminsured != null && customerDatas?.PersonalAccSuminsured != '0') {
          this.productItem.PersonalAccidentSuminsured = customerDatas?.PersonalAccSuminsured;
        }
        else {
          this.productItem.PersonalAccidentSuminsured = '0';
        }
        if (customerDatas?.PersonalIntermediarySuminsured != null && customerDatas?.PersonalIntermediarySuminsured != '0') {
          this.productItem.PersonalIntermediarySuminsured = customerDatas?.PersonalIntermediarySuminsured;
        }
        else {
          this.productItem.PersonalIntermediarySuminsured = '0';
        }
        if (customerDatas?.AllriskSumInsured != null && customerDatas?.AllriskSumInsured != '0') {
          this.productItem.AllriskSumInsured = customerDatas?.AllriskSumInsured;
        }
        else {
          this.productItem.AllriskSumInsured = '0';
        }
        if (customerDatas?.InsuranceForId != null) {
          let value = {}, i = 0;
          for (let element of customerDatas?.InsuranceForId) {
            if (element != '0') {
              value[element] = true;
            }
            i += 1;
            if (i == customerDatas?.InsuranceForId.length) this.productItem.InsuranceForId = value;
          }
        }
        this.productItem.NatureOfTradeId = customerDatas?.NatureOfTradeId;
        this.productItem.IndustryId = customerDatas?.IndustryId;
        if (this.productId == '19' || this.productId=='59' || this.productId=='24') this.onIndustryChange();
        this.productItem.WallType = customerDatas?.WallType;
        this.productItem.InternalWallType = customerDatas?.InternalWallType;
        this.productItem.RoofType = customerDatas?.RoofType;
        this.productItem.CeilingType = customerDatas?.CeilingType;
        this.productItem.StockInTradeSi = customerDatas?.StockInTradeSi;
        this.productItem.GoodsSi = customerDatas?.GoodsSi;
        this.productItem.FurnitureSi = customerDatas?.FurnitureSi;
        this.productItem.ApplianceSi = customerDatas?.ApplianceSi;
        this.productItem.CashValueablesSi = customerDatas?.CashValueablesSi;
        this.productItem.Address = customerDatas?.Address;
        //this.productItem.RegionCode = customerDatas?.RegionCode;
        //this.productItem.DistrictCode = customerDatas?.DistrictCode;
        this.productItem.BuildingOwnerYn = customerDatas?.BuildingOwnerYn;
        this.productItem.BuildingBuildYear = customerDatas?.BuildingBuildYear;
        this.productItem.OccupiedYear = customerDatas?.OccupiedYear;
        this.productItem.WatchmanGuardHours = customerDatas?.WatchmanGuardHours;
        this.productItem.AccessibleWindows = customerDatas?.AccessibleWindows;
        this.productItem.ShowWindow = customerDatas?.showWindow;
        this.productItem.FrontDoors = customerDatas?.FRONT_DOORS;
        this.productItem.BackDoors = customerDatas?.BACK_DOORS;
        this.productItem.TrapDoors = customerDatas?.TrapDoors;
        this.productItem.WindowsMaterialId = customerDatas?.WindowsMaterialId;
        this.productItem.FirstLossPercentId = customerDatas?.FirstLossPercentId;
        this.productItem.DoorsMaterialId = customerDatas?.DoorsMaterialId;
        this.productItem.NightLeftDoor = customerDatas?.NightLeftDoor;
        this.productItem.BuildingOccupied = customerDatas?.BuildingOccupied;
        this.ongetDistrictList('edit',this.productItem.DistrictCode)
  
        //if (this.productId=='59') this.setDomesticForm('edit', type);
        if (this.productId == '19' || this.productId=='59' || this.productId=='24') this.setSMEForm('edit', type)
        else {
          this.formSection = false; this.viewSection = true;
        }
  
      }
  
    );
  }
  setSMEForm(type, mode) {
    
    let sections:any[] = this.commonDetails[0].SectionId;
    //let section = sections.filter(ele => ele=='42')
    this.tab = new FormlyFieldTabs();
    this.fields = [
      {
        type: 'tabs',
        fieldGroup: [
          
          
        ],
      }
    ];
    
    if(sections){
      console.log('sectionssss',sections)
      //this.updateComponent.setTabCountSection(0);
      this.showSection = true;
      if(sections.some(ele=>ele=='1')){
        
        let contentData 
        if(this.insuranceId=='100004'){
          contentData = new Buildingss();
        }
        else{
          contentData = new Building();
        }
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
        this.getWallMaterialList();
        this.getRoofMaterialList();
        this.getbuildingpurposeList();
        if(this.insuranceId =='100004'){
          this.getTypeOfProperty();
        }
        
      }
      if(sections.some(ele=>ele=='47' && this.insuranceId!='100004')){
        let contentData = new HouseHoldContents();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
      }
      if(sections.some(ele=>ele=='3')){
        let contentData 
        if(this.insuranceId=='100004'){
          contentData = new AllRiskss();
        }
        else {
          contentData = new AllRisk();
        }
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields])
      }
      if(sections.some(ele=>ele=='36')){
        let contentData = new PersonalLiability();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields])
      }
      if(sections.some(ele=>ele=='76')){
        let fireData = new ElectronicEquipment();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
        }
      if(sections.some(ele=>ele=='35')){
        let contentData = new PersonalAccident();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
        // let modelHooks = { onInit: (field: FormlyFieldConfig) => {
        //   field.formControl.valueChanges.subscribe(() => {
        //     this.onoccChangepersonal('change');
        //   });
        // } }
        // console.log('HHHHHHHHHHHHHH',this.fields[0].fieldGroup);
        // console.log('Field groups',contentData.fields.fieldGroup)
        // let groupLists = contentData.fields.fieldGroup;
        // let i=0;
        // for(let group of groupLists){
        //    group.fieldGroup[0].hooks = modelHooks;
        //    i+=1;
        //    if(i==groupLists.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]); this.onoccChangepersonal('change');}
        // }
        // this.fields[0].fieldGroup.fieldGroup[0].fieldGroup[0].hooks = modelHooks;
        
      }
      if(sections.some(ele=>ele=='69')){
        let fireData = new BussinessAllRisk();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
      }
     
      if(sections.some(ele=>(ele=='47' || ele=='74') && this.insuranceId=='100004')){
        let contentData
        if(this.productId!='24'){
          contentData = new HouseHoldContents();
        }
        else{
          contentData = new HouseHoldContentsss(); 
        }
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
      }
      if(sections.some(ele=>(ele=='54'))){
        let contentData = new PublicLiability();
       this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
     }
      if(sections.some(ele=>ele=='40')){
        let fireData = new FireAlliedPerils();
        let entry = [];
        entry.push(fireData?.fields);
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
        //this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup);
        this.getIndemityPeriodList();
      }
     
      
        if(sections.some(ele=>ele=='41')){
        let contentData = new MachineryBreakDown();
        let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
              this.checkMachineryYNChanges()
          });
        }};
        let groupList = contentData.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
        let i=0;
        for(let group of groupList){
           group.fieldGroup[0].hooks = checkYnHooks;
           i+=1;
           if(i==groupList.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]); this.checkMachineryYNChanges()}
        }
        }
        if(sections.some(ele=>ele=='45')){
          //let employeeData = new EmployersLiability();
          let employeeData = new EmployersLiabilitytwo();
          let field = {
            props: { label: 'Employers Liability' },
            fieldGroup: employeeData.fields
          }
          let modelHooks = { onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.onoccChange('change');
            });
          } }
          this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field]);
          console.log('SectionEmployeers', this.fields[0].fieldGroup);
          for(let field of this.fields[0].fieldGroup){
            console.log('Formly Fields',field.props.label)
            if(field.props.label=='Employers Liability'){
              this.fieldsEmployee = field.fieldGroup;
              console.log('Fedilitysss',field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0]);
              console.log('Empliablity',this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup[0]);
            }
          }
          if(this.fieldsEmployee){
            this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
          }
      
        }
        if(sections.some(ele=>ele=='43')){
          let fidelity = new Fidelitytwo();
          //let fidelity = new Fidelity();
          let field = {
            props: { label: 'Fidelity' },
            fieldGroup: fidelity.fields
          }
         // this.getFidSumInsuredList();
          let modelHooks = { onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.onoccFedilityChange('change');
            });
          } }
          this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field]);
          for(let field of this.fields[0].fieldGroup){
            console.log('Formly Fields',field.props.label)
            if(field.props.label=='Fidelity'){
              this.fieldsFidelity = field.fieldGroup;
            }
          }
          if(this.fieldsFidelity){
            this.fieldsFidelity[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
          }
        }
        
        if(sections.some(ele=>ele=='45')) this.productItem.employeeList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
          if(sections.some(ele=>ele=='43')) this.productItem.fidelityList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
          if(sections.some(ele=>ele=='42')){
            let money = new Money();
            let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                  this.checkMoneyYNChanges()
              });
            }};
            let groupList = money.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
            let i=0;
            for(let group of groupList){
               group.fieldGroup[0].hooks = checkYnHooks;
               i+=1;
               if(i==groupList.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([money?.fields]); this.checkMoneyYNChanges()}
            }
            // this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([money?.fields])
          }
      
      if(sections.some(ele=>ele=='52')){
        if(this.insuranceId=='100002' || this.insuranceId=='100004'){
        let fireData = new Burglary();
        //let entry = [];
        //entry.push(fireData?.fields);
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
        console.log("Burglary Fields", this.fields[0].fieldGroup);
        }
        else if(this.insuranceId=='100004'){
          let fireData = new Burglarys();
            let field = {
              props: { label: 'Burglary' },
              fieldGroup: [fireData.fields]
            }
        console.log("Burglary Fields",field)
        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.ongetDistrictList('change',null)
          });
        } }
        
        field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field])
          this.getNatureTradeList();
          this.getInsuranceForList();
          this.getWallMaterialList();
          this.buglaryloss();
          this.getRoofMaterialList();
          this.getCeilingMaterialList();
          this.getRegionList();
          this.getWindowConsMaterialList();
          this.getDoorsMaterilalList(); 
          this.getNightLeftDoorList(); this.getBuildingOccupiedList();
        }
        // let field = {
        //   props: { label: 'Burglary' },
        //   fieldGroup: [fireData.fields]
        // }
        // console.log("Burglary Fields",field)
        // let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        //   field.formControl.valueChanges.subscribe(() => {
        //     this.ongetDistrictList('change')
        //   });
        // } }
        
        // field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
        //this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field])
          // this.getNatureTradeList();
          // this.getInsuranceForList();
          // this.getWallMaterialList();
          // this.buglaryloss();
          // this.getRoofMaterialList();
          // this.getCeilingMaterialList();
          // this.getRegionList();
          // this.getWindowConsMaterialList();
          // this.getDoorsMaterilalList(); 
          // this.getNightLeftDoorList(); this.getBuildingOccupiedList();
      }
      if(sections.some(ele=>ele=='75')){
        let fireData = new BusinessInterruption();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
        }
        if(sections.some(ele=>ele=='46')){
          let fireData = new GoodsInTransit();
          this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
          console.log("Goods Fields",this.fields);
          this.getTransportList();
          this.getgeographicalLimit();
          this.getTransportedByList();
          }
      if(this.requestReferenceNo){
           this.sectionCount = 0;
           if(sections.some(ele=>ele=='1')) this.getBuildingDetails(sections);
           if(sections.some(ele=>ele=='3')) this.getAllRiskDetails(sections);
           if(sections.some(ele=>ele=='47' || ele=='74')) this.getContentDetails(sections);
           if(sections.some(ele=>ele=='35')) this.getPersonalAccidentDetails(sections);
           if(sections.some(ele=>ele=='36')) this.getPersonalLiabilityDetails(sections);
           if(sections.some(ele=>ele=='40')) this.getFireAlliedRiskDetails(sections);
           if(sections.some(ele=>ele=='45')){ this.getEmployeeRiskDetails(sections)}
           if(sections.some(ele=>ele=='43')){ this.getFidelityRiskDetails(sections)}
           if(sections.some(ele=>ele=='41')){ this.getMachineryBreakDownDetails(sections)}
           if(sections.some(ele=>ele=='42')){ this.getMoneyDetails(sections)}
           if(sections.some(ele=>ele=='52')){ this.getBurglaryDetails(sections) }
           if(sections.some(ele=>ele=='69')){ this.getBusinessAllRiskDetails(sections) }
           if(sections.some(ele=>ele=='75')){ this.getBusinessInterruptionDetails(sections) }
           if(sections.some(ele=>ele=='76')){ this.getElectronicEquipment(sections)}
           if(sections.some(ele=>ele=='46')){ this.getGoodsTransitDetails(sections) }
           if(sections.some(ele=>ele=='54')){ this.getPublicLiabilityDetails(sections) }
           if(sections.some(ele=>ele=='3') && this.productId=='21' || this.productId == '26'){ this.getPlantallrisk(sections) }
          //  if(sections.some(ele=>ele=='3') && this.productId=='21'){ this.getElectronicEquipment(sections) }
           if(sections.some(ele=>ele=='56' || ele=='53')){ 
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
           }
      }
      else{
        this.formSection = true; this.viewSection = false;
      }
     
      //  if (type == 'create' || mode == 'change') {  }
      //  else { this.formSection = false; this.viewSection = true; };
    }
    
  }
  onSubmit(type){
    let valid = this.checkValidation();
    // if(this.productId=="25" && this.TableRowEE.length!=0 || (this.productId=="16" && this.TableRowMoney.length!=0)){
    //   valid=true;
    // } 
    // if(this.productId=='25' && this.TableRowEE.length==0 && valid==false){
    //   this.EEErrorFun();
    // }
    // if(this.productId=='13' && this.tableRowPA.length==0 && valid==false || (this.tableRowPA.length==0 && valid==true)){
    //   this.PAErrorFun();
    // }
    if(valid){
      if( this.productId=='43' || this.productId=='42' || this.productId=='15'  
          || this.productId=='60' || this.productId=='57' || this.productId=='56' || this.productId=='26'
          || this.productId=='21' || this.productId=='27' || this.productId=='24'){ 
       this.saveCommonDetails('direct',null)
      }
      else if(this.productId=='1' || this.productId=='14' || this.productId=='13' || this.productId=='32' || this.productId=='61' || this.productId=='39' ||  this.productId=='25' || this.productId=='16' || this.productId=='6'){
        let entry = this.LocationListAlt[this.tabIndex];
        if(entry && this.productId=='61'){
          entry.SectionList[0].BondSuminsured = this.productItem.BondSI
          entry.SectionList[0].BondType = this.productItem.TypeOfBond
          entry.SectionList[0].IndustryType = this.productItem.IndustryId
          entry.SectionList[0].BondYear = this.productItem.NoOfYears
        }
        else if(entry && this.productId=='25'){
          if(this.productItem.SerialNo!=null && this.productItem.SerialNo!='' && this.productItem.ElecEquipSuminsured!='0' && this.productItem.ElecEquipSuminsured!=0 && this.productItem.ElecEquipSuminsured!=null){
            let subEntry = {
              RiskId: null,
              SerialNo: this.productItem.SerialNo,
              Description : this.productItem.Description,
              ContentId: this.productItem.ContentId,
              ElecEquipSuminsured : this.productItem.ElecEquipSuminsured
            }
            if(this.currentSectionIndex!=null){entry.SectionList[this.currentSectionIndex] = subEntry;}
            else{entry.SectionList.push(subEntry);}
          }
        }
        else if(entry && this.productId=='1'){
          if(this.productItem.RegionCode!=null && this.productItem.RegionCode!='' && this.productItem.BurglarySi!='0' && this.productItem.BurglarySi!=0 && this.productItem.BurglarySi!=null){
            let subEntry = {
              "SectionId": "52",
              "SectionName": "Burglary",
              "RegionCode": this.productItem.RegionCode,
              "DistrictCode": this.productItem.DistrictCode,
              "CoveringDetails": this.productItem.CoveringDetails,
              "DescriptionOfRisk": this.productItem.DescriptionOfRisk,
              "FirstLossPercentId": this.productItem.FireSumInsured,
              "BurglarySi": this.productItem.BurglarySi,
              "SumInsured": this.productItem.BurglarySi,
              RiskId: null
            }
            if(this.currentSectionIndex!=null){entry.SectionList[this.currentSectionIndex] = subEntry;}
            else{entry.SectionList.push(subEntry);}
          }
        }
        else if(entry && this.productId=='14'){
          if(this.productItem.LiabilityOccupationId!=null && this.productItem.LiabilityOccupationId!='' && this.productItem.EmpLiabilitySi!='0' && this.productItem.EmpLiabilitySi!=0 && this.productItem.EmpLiabilitySi!=null){
            let subEntry = {
              "SectionId": "45",
              "SectionName": "Employers Liability",
              "OccupationId": this.productItem.LiabilityOccupationId,
              "OccupationType": this.productItem.LiabilityOccupationId,
              "TotalNoOfEmployees": this.productItem.TotalNoOfEmployees,
              "EmpLiabilitySi": this.productItem.EmpLiabilitySi,
              "OtherOccupation": this.productItem.OtherOccupation,
              RiskId: null
            }
            if(this.currentSectionIndex!=null){entry.SectionList[this.currentSectionIndex] = subEntry;}
            else{entry.SectionList.push(subEntry);}
          }
        }
        else if(entry && this.productId=='32'){
          if(this.productItem.FidEmpCount!=null && this.productItem.FidEmpCount!='' && this.productItem.FidEmpSi!='0' && this.productItem.FidEmpSi!=0 && this.productItem.FidEmpSi!=null){
            let subEntry = {
              "SectionId": "43",
              "SectionName": "Fidelity",
              "LiabilityOccupationId":'99999',
              "FidEmpCount":this.productItem.FidEmpCount,
              "FidEmpSi":this.productItem.FidEmpSi,
              "OtherOccupation":this.productItem.OtherOccupation,
              RiskId: null
            }
            if(this.currentSectionIndex!=null){entry.SectionList[this.currentSectionIndex] = subEntry;}
            else{entry.SectionList.push(subEntry);}
          }
        }
        else if(entry && this.productId=='16'){
          if(this.productItem.RegionCode!=null && this.productItem.RegionCode!=''){
            let subEntry = {
              RegionCode : this.productItem.RegionCode,
              DistrictCode : this.productItem.DistrictCode,
              MoneyInSafe : this.productItem.MoneyInSafe,
              MoneyDirectorResidence : this.productItem.MoneyDirectorResidence,
              MoneyOutofSafe : this.productItem.MoneyOutofSafe,
              MoneySafeLimit: this.productItem.MoneySafeLimit,
              MoneyCollector : this.productItem.MoneyCollector,
              StrongroomSi: this.productItem.MoneyInSafe,
              MoneyMajorLoss: this.productItem.MoneyInTransit,
              MoneyAnnualEstimate : this.productItem.MoneyAnnualEstimate
            }
            if(this.currentSectionIndex!=null){entry.SectionList[this.currentSectionIndex] = subEntry;}
            else{entry.SectionList.push(subEntry);}
          }
        }
       
        else if(entry && this.productId=='6'){
          let entry = this.LocationListAlt[this.tabIndex];
          if(this.productItem.Section!=null && this.productItem.Section!=''){
            let sectionList =[];
            let obj:any = {};
            obj['SectionId'] = this.productItem.Section;
            obj['SectionDesc'] = this.productItem.SectionDesc;
            obj['BuildingAddress'] =  entry.LocationName;
            obj['IndustryType'] = this.productItem.InsuranceType;
            obj['IndustryTypeDesc'] = this.getFireIndustryDesc(this.productItem.InsuranceType);
            obj['OccupationId'] = this.productItem.OccupationId;
            obj['OccupationDesc'] = this.productItem.OccupationDesc;
            obj['CategoryId'] = this.productItem.OccupationId;
            obj['CategoryDesc'] = this.productItem.OccupationDesc;
            obj['CoveringDetails'] = this.productItem.CoveringDetails;
            obj['DescriptionOfRisk'] = this.productItem.DescriptionOfRisk;
            obj['RegionCode'] = this.productItem.RegionCode;
            obj['DistrictCode'] = this.productItem.DistrictCode;
            obj['BusinessInterruption'] = this.productItem.BusinessName;
            obj['FirePlantSi'] = this.productItem.BusinessSI;
            obj['BusinessNameDesc'] = this.getBusinessNameDesc(this.productItem.BusinessName);
            obj['BuildingSumInsured'] = this.productItem.FireSumInsured;
            entry['SumInsured'] = this.productItem.FireSumInsured;
            sectionList.push(obj);
            if(obj.BusinessInterruption!=0 && obj.BusinessInterruption!='0'){
              let subData = {
                "SectionId": obj.BusinessInterruption,
                "SectionDesc": obj.BusinessNameDesc,
                "Status": obj.SectionDesc,
                "RiskId": obj.RiskId,
                "LocationName": obj.LocationName,
                "BuildingAddress":  obj.BuildingAddress,
                "IndustryType": obj.IndustryType,
                "IndustryTypeDesc": obj.IndustryTypeDesc,
                "OccupationId": obj.OccupationId,
                "OccupationDesc": obj.OccupationDesc,
                "CategoryId": obj.CategoryId,
                "CategoryDesc": obj.CategoryDesc,
                "CoveringDetails": obj.CoveringDetails,
                "DescriptionOfRisk": obj.DescriptionOfRisk,
                'BusinessInterruption' : obj.BusinessInterruption,
                'FirePlantSi': this.productItem.BusinessSI,
                'BusinessNameDesc' : obj.BusinessNameDesc,
                "RegionCode": obj.RegionCode,
                "DistrictCode": obj.DistrictCode,
                "BuildingSumInsured":  this.productItem.BusinessSI,
                "SumInsured":  this.productItem.BusinessSI
              }
              sectionList.push(subData);
            }
            entry.SectionList = sectionList
            console.log("Final Obj",sectionList)
          }
        }
        else if(entry && this.productId=='39'){
          if(this.productItem.PowerPlantSi!=null && this.productItem.PowerPlantSi!='' && this.productItem.PowerPlantSi!='0'){
            let subEntry = {
              "SectionId": "41",
              "SectionName": "Machinery Breakdown",
              "MachinerySi": this.productItem.PowerPlantSi,
              "RiskId": null
            }
            entry.SectionList = [subEntry]
          }
        }
       if(type=='proceedNext') this.onSaveCommonNonMotor('Next')
       else this.onSaveCommonNonMotor('Submit')
      }
      else{this.onFormSubmit(type);}
    }
  }
  onSaveCommonNonMotor(type){
    let sourcecode:any;
    let endorsementDate=null,EndorsementEffectiveDate=null,EndorsementRemarks=null,
    EndorsementType=null,EndorsementTypeDesc=null,EndtCategoryDesc=null,EndtCount=null,
    EndtPrevPolicyNo=null,EndtPrevQuoteNo=null,EndtStatus=null,IsFinanceEndt=null,OrginalPolicyNo=null;
    if(this.endorsementDetails){
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
    let promocode = null,havePromoCode:any='N';
    if(this.promocode!=null && this.promocode!=undefined && this.promocode!='') havePromoCode = "Y";
    let appId = "1", loginId = "", brokerbranchCode = "";let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
    if(referenceNo){
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
        brokerbranchCode = this.brokerBranchCode;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { 
      //brokerbranchCode =  commonDetails[0]['BrokerBranchCode']
      this.issuerSection = true;
     }
    else{ this.issuerSection = false; brokerbranchCode = this.userDetails.Result.BrokerBranchCode; }
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if(this.userType!= 'Broker' && this.userType != 'User'){
      sourcecode=this.Code
    }
    else{
      sourcecode=sessionStorage.getItem('typeValue')
    }
    let havePromoYN = 'N'
    if(this.promocode!=null && this.promocode!='' && this.promocode!=undefined) havePromoYN='Y' 
    let startDate = null,endDate=null;
    let startDateList = String(this.policyStartDate).split('/');
    if(startDateList.length>1) startDate = this.policyStartDate
    else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
    let endDateList = String(this.policyEndDate).split('/');
    if(endDateList.length>1) endDate = this.policyEndDate
    else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
    let ReqObj = {
      "PolicyDetails": {
        "SaveOrSubmit": type,
        "AcexecutiveId": "",
        "ProductType": null,
        "TiraCoverNoteNo": null,
        "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "BuildingOwnerYn": "N",
        "Createdby": this.loginId,
        "Currency": this.currencyCode,
        "ExchangeRate": this.exchangeRate,
        "Havepromocode": havePromoYN,
        "PolicyEndDate": endDate,
        "PolicyStartDate": startDate,
        "IndustryId": "99999",
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "BranchCode": this.branchCode,
      },
      "BrokerDetails": {
          "CustomerCode": this.customerCode,
          "CustomerName": this.customerName,
          "BdmCode": this.customerCode,
          "BrokerCode": this.brokerCode,
         "LoginId": loginId,
         "ApplicationId": appId,
          "AgencyCode": this.agencyCode,
          "BrokerBranchCode": this.brokerbranchCode,
          "SourceTypeId": sourcecode,
          "UserType": "Broker"
      },
      "EndorsementDetails": {
          "EndorsementDate": null,
          "EndorsementEffectiveDate": null,
          "EndorsementRemarks": null,
          "EndorsementType": null,
          "EndorsementTypeDesc": null,
          "EndtCategoryDesc": null,
          "EndtCount": null,
          "EndtPrevPolicyNo": null,
          "EndtPrevQuoteNo": null,
          "EndtStatus": null,
          "IsFinanceEndt": null,
          "OrginalPolicyNo": null, 
          "PolicyNo": null,
      },
      "LocationList": []
    }
    let locationList = [],i=0;
          for(let entry of this.LocationListAlt){
            if(entry.LocationName!=null && entry.LocationName!=''){
              
              let obj = {
                "LocationId":i+1,
                "LocationName":entry.LocationName,
                "SectionList": []
              }
              if(this.productId=='61'){ let j=0,k=0;
                for(let subEntry of entry.SectionList){
                    if(subEntry.BondSuminsured==0 || subEntry.BondSuminsured=='' || subEntry.BondSuminsured==null){j+=1;subEntry['BondSumSIError']=true;}
                    else{subEntry['BondSumSIError']=false;}
                    if(subEntry.BondType=='' || subEntry.BondType==null){j+=1;subEntry['BondTypeError']=true;}
                    else{entry['BondTypeError']=false}
                    if((subEntry.IndustryType=='' || subEntry.IndustryType==null)){
                      if((subEntry.IndustryId=='' || subEntry.IndustryId==null)){
                        j+=1;subEntry['IndustryTypeError']=true;
                      }
                      else{ subEntry.IndustryType = subEntry.IndustryId;subEntry['IndustryTypeError']=false;}
                    }
                    else{subEntry['IndustryTypeError']=false;}
                    if((subEntry.IndustryId=='' || subEntry.IndustryId==null))
                    if(subEntry.BondYear=='' || subEntry.BondYear==null){j+=1;subEntry['BondYearError']=true;}
                    else{subEntry['BondYearError']=false;}
                    if(j==0){
                      subEntry["SumInsured"]= subEntry.BondSuminsured;
                      subEntry['SectionId'] = subEntry.BondType;
                      subEntry['SectionName']=this.BondTypeList.find(ele=>ele.Code==subEntry.BondType)?.CodeDesc
                      obj.SectionList.push(subEntry);
                      k+=1;
                      if(k==entry.SectionList.length && obj.SectionList.length!=0){i+=1;ReqObj.LocationList.push(obj)
                        if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
                      }
                    }
                    else{k+=1;
                      if(k==entry.SectionList.length && obj.SectionList.length!=0){i+=1;ReqObj.LocationList.push(obj)}
                      else if(type=='Next'){i+=1;}
                    if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
                  }
                }
              }
              else if(this.productId=='25'){ let j=0,k=0
                for(let subEntry of entry.SectionList){
                  if(subEntry.ElecEquipSuminsured==0 || subEntry.ElecEquipSuminsured=='' || subEntry.ElecEquipSuminsured==null){j+=1;this.ElecEquipSIError=true;}
                  else{this.ElecEquipSIError=false}
                  if(subEntry.ContentId=='' || subEntry.ContentId==null){j+=1;this.ContentError=true;}
                  else{this.ContentError=false;}
                  if(subEntry.DescriptionOfRisk=='' || subEntry.DescriptionOfRisk==null){j+=1;this.DescriptionError=true;}
                  else{this.DescriptionError=false;}
                  if(subEntry.SerialNo=='' || subEntry.SerialNo==null){j+=1;this.SerialNoError=true;}
                  else{this.SerialNoError=false}
                  // if(subEntry.BondYear=='' || subEntry.BondYear==null){j+=1;subEntry['BondYearError']=true;}
                  // else{subEntry['BondYearError']=false;}
                  if(j==0){
                    subEntry['SectionId'] = '39';
                    subEntry["SumInsured"]= subEntry.ElecEquipSuminsured;
                    subEntry['SectionName']= 'Electronic Equipments';
                    subEntry["ContentDesc"] = this.dropList.find(ele=>ele.Code==subEntry.ContentId)?.CodeDesc;
                    obj.SectionList.push(subEntry);
                    k+=1;
                    if(k==entry.SectionList.length && obj.SectionList.length!=0){i+=1;ReqObj.LocationList.push(obj)
                      if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
                    }
                  }
                  else{k+=1;if(k==entry.SectionList.length && obj.SectionList.length!=0){i+=1;ReqObj.LocationList.push(obj)}
                  if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
                  }
                }
              }
              else if(this.productId=='16'){
                let k=0;
                for(let subEntry of entry.SectionList){
                  let subObj = {
                    "SectionId": "42",
                    "SectionName": "Money",
                    "IndustryId": this.IndustryId,
                    "RiskId": null,
                    "MoneyAnnualEstimate": subEntry.MoneyAnnualEstimate,
                    "StrongroomSi": subEntry.StrongroomSi,
                    "MoneyCollector": subEntry.MoneyCollector,
                    "MoneySafeLimit": subEntry.MoneySafeLimit,
                    "MoneyOutofSafe": subEntry.MoneyOutofSafe,
                    "MoneyDirectorResidence": subEntry.MoneyDirectorResidence,
                    "MoneyMajorLoss": subEntry.MoneyMajorLoss,
                    "MoneyInSafe": subEntry.MoneyInSafe,
                    "RegionCode": subEntry.RegionCode,
                    "DistrictCode": subEntry.DistrictCode
                  }
                  obj.SectionList.push(subObj);
                  k+=1;if(k==entry.SectionList.length){i+=1;ReqObj.LocationList.push(obj); if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
                }
              }
              else if(this.productId=='1'){
                let k=0;
                for(let subEntry of entry.SectionList){
                  let subObj = {
                    "SectionId": "52",
                    "SectionName": "Burglary",
                    "RiskId": null,
                    //"BurglarySi": subEntry.BurglarySi,
                    "SumInsured": subEntry.SumInsured,
                    "FirstLossPercentId": subEntry.FirstLossPercentId,
                    "IndustryId": this.IndustryId,
                    "RegionCode": subEntry.RegionCode,
                    "DistrictCode": subEntry.DistrictCode,
                    "CoveringDetails": subEntry.CoveringDetails,
                    "DescriptionOfRisk": subEntry.DescriptionOfRisk
                  }
                  obj.SectionList.push(subObj);
                  k+=1;if(k==entry.SectionList.length){i+=1;ReqObj.LocationList.push(obj); if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
                }
              }
              else if(this.productId=='14'){
                if(entry.SectionList.length!=0){
                  console.log("On Received Emp List",entry.SectionList)
                  let k=0;
                  for(let subEntry of entry.SectionList){
                    let occupationId=null;
                    if(subEntry.SumInsured!=null && subEntry.SumInsured!='' && subEntry.SumInsured!='0' && subEntry.SumInsured!=0 && subEntry.TotalNoOfEmployees!=null){
                      if(subEntry.OccupationId){occupationId=subEntry.OccupationId;}
                      else if(subEntry.OccupationType){occupationId=subEntry.OccupationType}
                      let subObj = {
                        "SectionId": "45",
                        "SectionName": "Employers Liability",
                        "RiskId": null,
                        "IndustryId": this.IndustryId,
                        "OccupationId": occupationId,
                        "TotalNoOfEmployees": subEntry.TotalNoOfEmployees,
                        //"EmpLiabilitySi":  subEntry.EmpLiabilitySi,
                        "SumInsured": subEntry.SumInsured,
                        "OtherOccupation":  subEntry.OtherOccupation,
                      }
                      if(subEntry.OccupationId) subObj['OccupationType'] = subEntry.OccupationId;
                      else if(subEntry.OccupationType) subObj['OccupationType'] = subEntry.OccupationType;
                      obj.SectionList.push(subObj);
                    }
                    k+=1;if(k==entry.SectionList.length){i+=1;ReqObj.LocationList.push(obj); if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
                  }
                }
                else{i+=1;if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
              }
              else if(this.productId=='13'){
                if(entry.SectionList.length!=0){
                  console.log("On Received Emp List",entry.SectionList)
                  let k=0;
                  for(let subEntry of entry.SectionList){
                    let occupationId=null;
                    if(subEntry.SumInsured!=null && subEntry.SumInsured!='' && subEntry.SumInsured!='0' && subEntry.SumInsured!=0){
                      if(subEntry.OccupationId){occupationId=subEntry.OccupationId;}
                      else if(subEntry.OccupationType){occupationId=subEntry.OccupationType}
                      let subObj = {
                        "SectionId": "35",
                        "SectionName": "Personal Accident",
                        "RiskId": null,
                        "Dob": subEntry.Dob,
                        "OccupationId": occupationId,
                        // "TotalNoOfEmployees": subEntry.TotalNoOfEmployees,
                        // "EmpLiabilitySi":  subEntry.EmpLiabilitySi,
                        "SumInsured": subEntry.SumInsured,
                        "NickName":  subEntry.NickName,
                        "CategoryId": subEntry.CategoryId,
                      }
                      if(subEntry.OccupationId) subObj['OccupationType'] = subEntry.OccupationId;
                      else if(subEntry.OccupationType) subObj['OccupationType'] = subEntry.OccupationType;
                      obj.SectionList.push(subObj);
                    }
                    k+=1;if(k==entry.SectionList.length){i+=1;ReqObj.LocationList.push(obj); if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
                  }
                }
                else{i+=1;if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
              }
              else if(this.productId=='32'){
                let k=0;
                for(let subEntry of entry.SectionList){
                  let subObj = {
                    "SectionId": "43",
                    "SectionName": "Fidelity",
                    "RiskId": null,
                    "IndustryId": this.IndustryId,
                    "OccupationId":'99999',
                    "FidEmpCount":subEntry.FidEmpCount,
                    //"FidEmpSi":subEntry.FidEmpSi,
                    "SumInsured": subEntry.FidEmpSi,
                    "OtherOccupation":this.productItem.OtherOccupation,
                  }
                  obj.SectionList.push(subObj);
                  k+=1;if(k==entry.SectionList.length){i+=1;ReqObj.LocationList.push(obj); if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
                }
              }
              else if(this.productId=='6'){
               
                let sectionData = entry.SectionList.filter(ele=>ele.SectionId!=ele.Business_Interruption);
                 let list = [];
                if(sectionData.length!=0){
                    list.push(sectionData[0]);
                    if(sectionData[0].BusinessInterruption!=0 && sectionData[0].BusinessInterruption!='0'){
                      let subData = {
                        "SectionId": sectionData[0].BusinessInterruption,
                        "SectionDesc": sectionData[0].BusinessNameDesc,
                        "Status": sectionData[0].SectionDesc,
                        "RiskId": sectionData[0].RiskId,
                        "LocationName": sectionData[0].LocationName,
                        "BuildingAddress":  sectionData[0].BuildingAddress,
                        "IndustryType": sectionData[0].IndustryType,
                        "IndustryTypeDesc": sectionData[0].IndustryTypeDesc,
                        "OccupationId": sectionData[0].OccupationId,
                        "OccupationDesc": sectionData[0].OccupationDesc,
                        "CategoryId": sectionData[0].CategoryId,
                        "CategoryDesc": sectionData[0].CategoryDesc,
                        "CoveringDetails": sectionData[0].CoveringDetails,
                        "DescriptionOfRisk": sectionData[0].DescriptionOfRisk,
                        'BusinessInterruption' : sectionData[0].Business_Interruption,
                        'FirePlantSi': sectionData[0].FirePlantSi,
                        "SumInsured": sectionData[0].FirePlantSi,
                        'BusinessNameDesc' : sectionData[0].BusinessNameDesc,
                        "RegionCode": sectionData[0].RegionCode,
                        "DistrictCode": sectionData[0].DistrictCode,
                        "BuildingSumInsured":  sectionData[0].BuildingSumInsured
                      }
                      list.push(subData);
                    }
                    obj.SectionList = list;
                    ReqObj.LocationList.push(obj);i+=1; if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
                }
                else{
                  list.push(sectionData[0]);i+=1; if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
                }
              }
              else if(this.productId=='39'){obj.SectionList=entry.SectionList;i+=1;ReqObj.LocationList.push(obj)
                if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);
              }
            }
            else{i+=1;if(i==this.LocationListAlt.length) this.onFinalCommonSave(type,ReqObj);}
          }
  }
  onFinalCommonSave(type,ReqObj){
    let urlLink = `${this.motorApiUrl}api/slide/nonmotorsave`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if (data?.Result.length!=0) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if((type=='Save' && this.LocationListAlt.length==(this.tabIndex+1)) || type=='Submit' ){
              if(this.uwQuestionList.length!=0){
                let i = 0;
                let uwList:any[]=new Array();
                for(let ques of this.uwQuestionList){
                  ques['BranchCode'] = this.branchCode;
                  let createdBy="";
                    let quoteStatus = sessionStorage.getItem('QuoteStatus');
                    if(quoteStatus=='AdminRP'){
                        createdBy = this.loginId;
                    }
                    else{
                      createdBy = this.loginId;
                    }
                    let status = null,loading = null;
                    if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                      let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
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
                      "QuestionCategory": ques.QuestionCategory,
                      "QuestionCategoryDesc": ques.questionCategoryDesc,
                      "questionCategoryDesc": ques.questionCategoryDesc,
                      "EffectiveDateStart": ques.EffectiveDateStart,
                      "Status": status,
                      "LoadingPercent": loading,
                      "MandatoryYn": ques.MandatoryYn,
                      "DataType": ques.DataType,
                      "CreatedBy": createdBy,
                      "UpdatedBy":  this.loginId,
                      "Value": ques.Value,
                      "BranchCode": this.branchCode,
                      "RequestReferenceNo": this.requestReferenceNo,
                      "VehicleId": String(this.tabIndex+1)
                    }
                    uwList.push(entry);
                  i+=1;
                  if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList,data.Result,type,'direct');
                }
              }
              else{ this.onCalculate(data.Result,type,null,null); }
            }
            else{
                if(this.tabIndex!=this.LocationListAlt.length-1){
                  if(this.uwQuestionList.length!=0){
                    let i = 0;
                    let uwList:any[]=new Array();
                    for(let ques of this.uwQuestionList){
                      ques['BranchCode'] = this.branchCode;
                      let createdBy="";
                        let quoteStatus = sessionStorage.getItem('QuoteStatus');
                        if(quoteStatus=='AdminRP'){
                            createdBy = this.loginId;
                        }
                        else{
                          createdBy = this.loginId;
                        }
                        let status = null,loading = null;
                        if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                          let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
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
                          "QuestionCategory": ques.QuestionCategory,
                          "QuestionCategoryDesc": ques.questionCategoryDesc,
                          "questionCategoryDesc": ques.questionCategoryDesc,
                          "EffectiveDateStart": ques.EffectiveDateStart,
                          "Status": status,
                          "LoadingPercent": loading,
                          "MandatoryYn": ques.MandatoryYn,
                          "DataType": ques.DataType,
                          "CreatedBy": createdBy,
                          "UpdatedBy":  this.loginId,
                          "Value": ques.Value,
                          "BranchCode": this.branchCode,
                          "RequestReferenceNo": this.requestReferenceNo,
                          "VehicleId": String(this.tabIndex+1)
                        }
                        uwList.push(entry);
                      i+=1;
                      if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList,data.Result,type,'next');
                    }
                  }
                  else{
                    this.tabIndex+=1;
                    this.productItem = new ProductData();
                    //this.onEditCommonDetails(this.LocationListAlt[this.tabIndex].SectionList[0],this.LocationListAlt[this.tabIndex],0);
                  }
                }
                else{
                  if(this.uwQuestionList.length!=0){
                    let i = 0;
                    let uwList:any[]=new Array();
                    for(let ques of this.uwQuestionList){
                      ques['BranchCode'] = this.branchCode;
                      let createdBy="";
                        let quoteStatus = sessionStorage.getItem('QuoteStatus');
                        if(quoteStatus=='AdminRP'){
                            createdBy = this.loginId;
                        }
                        else{
                          createdBy = this.loginId;
                        }
                        let status = null,loading = null;
                        if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                          let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
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
                          "QuestionCategory": ques.QuestionCategory,
                          "QuestionCategoryDesc": ques.questionCategoryDesc,
                          "questionCategoryDesc": ques.questionCategoryDesc,
                          "EffectiveDateStart": ques.EffectiveDateStart,
                          "Status": status,
                          "LoadingPercent": loading,
                          "MandatoryYn": ques.MandatoryYn,
                          "DataType": ques.DataType,
                          "CreatedBy": createdBy,
                          "UpdatedBy":  this.loginId,
                          "Value": ques.Value,
                          "BranchCode": this.branchCode,
                          "RequestReferenceNo": this.requestReferenceNo,
                          "VehicleId": String(this.tabIndex+1)
                        }
                        uwList.push(entry);
                      i+=1;
                      if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList,data.Result,type,'direct');
                    }
                  }
                  else{
                  this.onCalculate(data.Result,type,null,null);
                  }
                }
            } 
          }
        }
      });
  }
  onSaveUWQues(uwList, entry,type,subType) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
            if(subType=='next'){
              this.tabIndex+=1;
                    this.productItem = new ProductData();
                    this.onEditCommonDetails(this.LocationListAlt[this.tabIndex].SectionList[0],this.LocationListAlt[this.tabIndex],0);
                    this.getEditUwQuestions();
            }
            else this.onCalculate(entry,type,null,null); }
        })
    }
  }
  getBackRoute(){
    if(this.endorsementSection){
      if(this.enableCustomerDetails) this.router.navigate(['/customer/create']);
      else  this.router.navigate(['/portfolio/endorsementtype']);
    }
    else this.router.navigate(['/quotation']);
  }
  getBack(){
    this.productItem = null;
    this.productItem = new ProductData();
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    let i=0;
      for(let field of fieldList){
        field.formControl.setValue('');
        i+=1;
        if(i==fieldList.length){
          this.currentIndex = this.currentIndex-1;
          this.vehicleId = this.vehicleDetailsList[this.currentIndex-1].Vehicleid;
          this.showSection = false;
          this.setCommonFormValues(null);
        }
      }
  }
  checkPAValidation() {
    this.LocationNameError=false;this.OccupationError =false;this.PersonNameError=false;
    this.DobError=false;this.sumInsuredError=false;
    let i=0;
    // if(this.productItem.LocationName==null || this.productItem.LocationName==undefined || this.productItem.LocationName==''){
    //   this.LocationNameError = true;
    //   i+=1;
    // }
    if(this.productItem.OccupationType==null || this.productItem.OccupationType==undefined || this.productItem.OccupationType==''){
      this.OccupationError = true;
      i+=1;
    }
    if(this.productItem.Name==null || this.productItem.Name==undefined || this.productItem.Name==''){
      this.PersonNameError = true;
      i+=1;
    }
    if(this.productItem.Dob==null || this.productItem.Dob==undefined || this.productItem.Dob==''){
      this.DobError = true;
      i+=1;
    }
    if(this.productItem.SumInsured==null || this.productItem.SumInsured==undefined || this.productItem.SumInsured=='' || this.productItem.SumInsured==0){
      this.sumInsuredError = true;
      i+=1;
    }
    if(i==0) return true;
    else return false;
  }
  checkValidation(){
    this.customerError = false;this.policyStartDateError = false;this.policyEndDateError = false;
    this.currencyCodeError = false;this.industryError = false;this.exchangeRateError=false;
    this.bondTypeError=false;this.noYearsError=false;this.BondSumSIError=false;this.contentTypeError=false
   this.salaryError=false;this.contentTypeDuplicateError=false;
    let i=0;
    if(this.referenceNo==null || this.referenceNo==undefined){
        this.customerError = true;
         i+=1;
       
    }
    if(this.policyStartDate==null || this.policyStartDate==undefined || this.policyStartDate==''){
      this.policyStartDateError = true;
      i+=1;
    }
    if(this.policyEndDate==null || this.policyEndDate==undefined || this.policyEndDate==''){
      this.policyEndDateError = true;
      i+=1;
    }
    if(this.currencyCode==null || this.currencyCode==undefined || this.currencyCode==''){
      this.currencyCodeError = true;
      i+=1;
    }
   
    if(this.exchangeRate==null || this.exchangeRate==undefined || this.exchangeRate==''){
      this.exchangeRateError = true;
      i+=1;
    }
    if(this.productId=='61'){
      if(this.productItem.TypeOfBond==null || this.productItem.TypeOfBond==undefined || this.productItem.TypeOfBond==''){
        this.bondTypeError = true;
        i+=1;
      }
      if(this.productItem.NoOfYears==null || this.productItem.NoOfYears==undefined || this.productItem.NoOfYears==''){
        this.noYearsError = true;
        i+=1;
      }
      if(this.productItem.BondSI==null || this.productItem.BondSI==undefined || this.productItem.BondSI==''|| this.productItem.BondSI==0){
        this.BondSumSIError = true;
        i+=1;
      }
      if(i!=0){
        this.saveBondError();
      }
    }
   
    if(this.productId=='16' || this.productId=='14' || this.productId=='32' || this.productId=='39'){
      if(this.IndustryId==null || this.IndustryId=='' || this.IndustryId=='0'){this.industryError = true;i+=1;}
      else{i=0;this.industryError=false;}
       return i==0;
    }
    if((this.productId=='16' || this.productId=='15'  || this.productId=='32' ||  this.productId=='21'
    ) && (this.IndustryId==null || this.IndustryId==undefined || this.IndustryId=='')){
      //|| this.productId=='26'
      this.industryError = true;
      i+=1;
    }
    if(this.productId=='6'){
      if(this.productItem.OccupationId==null || this.productItem.OccupationId==''){i+=1;this.OccupationError=true;}
      else{this.OccupationError=false} 
      if(this.productItem.Section==null || this.productItem.Section==''){i+=1;this.sectionError=true;}
      else{this.sectionError=false} 
      if(this.productItem.FireSumInsured==null || this.productItem.FireSumInsured=='' || this.productItem.FireSumInsured=='0'){i+=1;this.fireSIError=true;}
      else{this.fireSIError=false} 
      if((this.productItem.BusinessName==null || this.productItem.BusinessName=='') && this.productItem.BusinessName!=0){i+=1;this.businessNameError=true;}
      else{this.businessNameError=false;
          if(this.productItem.BusinessName!='0' && this.productItem.BusinessName!=0){
            if(this.productItem.BusinessSI==null  || this.productItem.BusinessSI=='' || this.productItem.BusinessSI=='0'){i+=1;this.businessSIError=true;}
            else {this.businessSIError=false;}
          } else {this.businessSIError=false;}
      } 
      if(this.productItem.RegionCode==null || this.productItem.RegionCode==''){i+=1;this.regionError=true;}
      else{this.regionError=false} 
      if(this.productItem.DistrictCode==null || this.productItem.DistrictCode==''){i+=1;this.districtError=true;}
      else{this.districtError=false} 
      if(this.productItem.CoveringDetails==null || this.productItem.CoveringDetails==''){i+=1;this.coveringDetailsError=true;}
      else{this.coveringDetailsError=false} 
      if(this.productItem.DescriptionOfRisk==null || this.productItem.DescriptionOfRisk==''){i+=1;this.descriptionRiskError=true;}
      else{this.descriptionRiskError=false} 
    }
    if(i==0) return true;
    else return false;
  }
  saveCommonDetails(types,redirectType){
    let sourcecode:any;
    let endorsementDate=null,EndorsementEffectiveDate=null,EndorsementRemarks=null,
    EndorsementType=null,EndorsementTypeDesc=null,EndtCategoryDesc=null,EndtCount=null,
    EndtPrevPolicyNo=null,EndtPrevQuoteNo=null,EndtStatus=null,IsFinanceEndt=null,OrginalPolicyNo=null;
    if(this.endorsementDetails){
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
    let promocode = null,havePromoCode:any='N';
    if(this.promocode!=null && this.promocode!=undefined && this.promocode!='') havePromoCode = "Y";
    let appId = "1", loginId = "", brokerbranchCode = "";let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
    if(referenceNo){
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
        brokerbranchCode = this.brokerBranchCode;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { 
      //brokerbranchCode =  commonDetails[0]['BrokerBranchCode']
      this.issuerSection = true;
     }
    else{ this.issuerSection = false; brokerbranchCode = this.userDetails.Result.BrokerBranchCode; }
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if(this.userType!= 'Broker' && this.userType != 'User'){
      sourcecode=this.Code
    }
    else{
      sourcecode=sessionStorage.getItem('typeValue')
    }
    let section = [];
    if(types == 'Risk'){
      // section.push(this.newsections);
      console.log('ColorList',this.colorSections);
      console.log('COlorss',this.newsections);
      this.colorSections.push(this.newsections);
      // this.colorList.find(ele => ele == this.newsections)
      {section = this.colorSections}
      this.IndustryId='99999';
    }
    else if(types == 'Risks'){
      {section = this.colorSections}
      this.IndustryId='99999';
    }
    else if(types=='Fire') this.IndustryId='99999';
    if(this.productId=='6'){section.push('108');};
    if(this.productId=='39'){section.push('41'); };
    if(this.productId=='16'){section.push('42');};
    if(this.productId=='14'){section.push('45');};
    if(this.productId=='15'){section.push('38');};
    if(this.productId=='32'){section.push('43');};
    if(this.productId=='1'){section.push('52'); this.IndustryId='99999'};
    if(this.productId=='21'){section.push('3');};
    if(this.productId=='24'){section.push('3','47');};
    if(this.productId=='26'){section.push('3');};
    if(this.productId=='25'){section.push('39');};
    if(this.productId=='13'){section.push('35');};
    if(this.productId=='60'){section.push('106','107','108');this.IndustryId='99999'};
    if( this.productId=='56'){section.push('96');this.IndustryId='99999'};
    if(this.productId=='43'){section.push('70');this.IndustryId='44'};
    if(this.productId=='42'){section.push('69');this.IndustryId='99999'};
    if( this.productId=='57'){section.push('45');this.IndustryId='99999'};
    if( this.productId=='27'){section.push('54');this.IndustryId='44'};
    if (this.productId=='61'){
      section.push(this.productItem.TypeOfBond);
      this.IndustryId=this.productItem.IndustryId;
    }
    if (this.productId=='26'){
      this.IndustryId = this.productItem.IndustryBussinessAllRisk;
    }
    if( this.productId=='59'){
        if(this.BuildingOwnerYn!='N'){
          if(this.coversRequired=='C'){
            section=['47','3','36','76'];
          }
          else if(this.coversRequired =='B'){
            section=['3','1','36','76'];
          }
          else if(this.coversRequired =='BC') section=['47','1','3','36','76'];
        }
        else {
          section=['47','3','36','76'];
        }
       this.IndustryId='99999'
    };
    if(this.productId=='13')this.branchCode= this.userDetails.Result.BranchCode;
    if(this.userType!='Issuer'){ this.customerCode = this.userDetails.Result.CustomerCode;
      this.customerName = this.userDetails.Result.CustomerName;}
    let startDate=null,endDate=null;
    let dateList = String(this.policyStartDate).split('/');
    if(dateList.length==1) startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
    else startDate=this.policyStartDate;
    let dateList2 = String(this.policyEndDate).split('/');
    if(dateList2.length==1) endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
    else endDate=this.policyEndDate;
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
        "BuildingOwnerYn": this.BuildingOwnerYn,
        //this.buildingOwnerYN,
        "Createdby": this.loginId,
        "SourceTypeId":sourcecode,//this.Code
        "Currency": this.currencyCode,
        "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "ExchangeRate": this.exchangeRate,
        "Havepromocode": havePromoCode,
        "Promocode": this.promocode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "UserType": this.userType,
        "PolicyEndDate": endDate,
        "PolicyStartDate": startDate,
        "SectionIds": section,
        "SubUsertype": sessionStorage.getItem('typeValue'),
        "RiskId":"1",
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
                this.requestReferenceNo = data.Result?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo',data.Result?.RequestReferenceNo);
                let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                if (homeDetails) {
                    if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") homeDetails[0]['SectionId'] = sections;
                    else homeDetails[0].SectionId = sections;
                    // if(this.IndustryId && this.industryList!=null)
                    // homeDetails[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                    this.commonDetails = homeDetails;
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                    if(this.productId=='1'){if(redirectType=='save') this.addBurglaryTable(this.productItem,'redirectType'); else this.addBurglaryTable(this.productItem,redirectType);}  
                    else this.onFormSubmit(null);
                }
                else{
                 this.commonDetails = [
                    {
                        "PolicyStartDate": this.policyStartDate,
                        "PolicyEndDate":this.policyEndDate,
                        "Currency": this.currencyCode,
                        "SectionId": section,
                        "AcexecutiveId": "",
                        "ExchangeRate": this.exchangeRate,
                        "StateExtent": "",
                        "NoOfDays": this.noOfDays,
                        "HavePromoCode": havePromoCode,
                        "PromoCode": this.promocode,
                        "SourceType": this.Code,
                        "BrokerCode": this.brokerCode,
                        "BranchCode": this.branchCode,
                        "BrokerBranchCode": this.brokerbranchCode,
                        "CustomerCode": this.customerCode,
                        "CustomerName": this.customerName,
                        "LoginId": loginId,
                        "IndustryName": null
                    }
                  ];
                  sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                  if(this.productId=='1'){if(redirectType=='save') this.addBurglaryTable(this.productItem,'redirectType'); else this.addBurglaryTable(this.productItem,redirectType);}  
                    else this.onFormSubmit(null);
                }
        }
      },
      (err) => { },
    );
  }
  checkSections(type){
    // return this.colorSections
    let color =this.colorSections.find(ele=>ele == type);
    if(color){
      this.plus=true;
      return color
    }
  }
  Checknew(event){
console.log('Eventsss',event);
  }
  checkVehicleStatus(){
    let entry = this.vehicleDetailsList[this.currentIndex-1];
    if(entry){
        return entry?.Status=='D';
    }
    else return false;
  }
  onDeleteVehicle(){
    Swal.fire({
      title: '<strong> &nbsp;Delete Vehicle!</strong>',
      iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
      icon: 'info',
      html:
        `<ul class="list-group errorlist">
            Are You Sure Want to Delete this Vehicle Details?
          </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          let entry = this.vehicleDetailsList[this.currentIndex-1];
          if(entry?.Active!=undefined){
            if(entry.Active==false){
              this.vehicleDetailsList.splice(this.currentGroupIndex-1,1);
              this.currentIndex=1;
              this.totalIndex = this.vehicleDetailsList.length;
              this.motorDetails = null;
              this.productItem=new ProductData();
              this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
              this.setCommonFormValues(null);
            }
            else{
              this.onDelete(entry);
            }
          }
          else{
            this.onDelete(entry);
          }
        }
      });
  }
  onDelete(rowData){
    console.log("Entry",rowData)
    let endtType = null;
    if(this.endorsementSection){
        endtType = this.endorsementId
    }
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "Vehicleid": rowData.Vehicleid,
      "EndtType": this.endorsementId
    }
    let urlLink = `${this.motorApiUrl}api/deletemotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.vehicleId=null;
          this.motorDetails = null;
            this.getMotorDetails('direct');
        }
      });           
  }
  
  onFormSubmit(type){
    if(this.productId=='1'){this.onSaveBurglaryDetails(type,'individual')}
    else if(this.productId=='6'){this.onSaveFireAlliedDetails('proceed','individual');}
    else if(this.productId=='39'){this.onSaveMachineryDetails('proceed','individual')}
    else if(this.productId=='43'){this.onSaveMedicalDetails('proceed','individual')}
    else if(this.productId=='16'){this.onSaveMoneyDetails('proceed','individual')}
    else if(this.productId=='42'){this.anothercyberSave('proceed','individual')}
    else if(this.productId=='14' || this.productId=='15'){this.onsaveemployeenew('proceed','individual')}
    else if(this.productId=='13'){this.onSavePersonalAccident('proceed','individual')}
    else if(this.productId=='61'){this.onSaveBond('proceed','individual')}
    //else if(this.productId=='60'){this.onprofessionalsave('proceed','individual')}
    else if(this.productId=='21'){this.onSaveplantaLLrisk('proceed','individual')}
    else if(this.productId =='27'){this.onSavePublicLiability('proceed','individual')}
    else if(this.productId=='57'){this.onsaveGroupPADetails('proceed','individual')}
    else if(this.productId=='26'){this.onSaveBussinessrisk('proceed','individual');}
    else if(this.productId=='25'){this.onSaveElectronicEquipment('proceed','individual')}
    else if(this.productId=='32'){ this.onsubmitnewfed();}
    else if(this.productId == '66' ||this.productId == '59' || this.productId == '56' || this.productId=='60' || this.productId=='24' || this.productId=='63'){
      this.onFinalProceed();
      // let i=0;
      // if(this.colorSections.length!=0){
      //   if(this.colorSections.find(ele => ele == '35')){this.onSavePersonalAccidentDetails('proceed','individual');}
      //   else if(this.colorSections.find(ele => ele == '3')){this.onSaveAllRiskDetails('proceed','individual');}
      //   else if(this.colorSections.find(ele => ele == '1')){//this.onSaveBuildingDetails('proceed','individual');
      //   }
      //   else if(this.colorSections.find(ele => ele == '47')){this.onSaveContentRiskDetails('proceed','individual');}
      //   else if(this.colorSections.find(ele => ele == '36')){this.onSavePersonalLiability('proceed','individual');}
      // }
    }
    else if(this.productId=='19'){
      this.onsavecorporate();
    }
    else if(this.productId=='46'){
      if(type==null){
        this.currentVehicleIndex = 0;
        this.saveMotorRiskDetails('Group','direct');
      }
      else{this.saveMotorRiskDetails(type,null);}
    }

  }
  saveMotorRiskDetails(type,saveType){
    let make = "",color='',fuel='',usageDesc='',bodyType='',motorCategoryDesc='';
    let model=null,modelDesc = null;
    let insuranceType = '73';
    if(type!='Group' || (type=='Group' && saveType=='direct')){
      if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
        let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
        make = entry.label;
  
      }
      if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
        let entry = this.bodyTypeList.find(ele=>ele.Code==this.productItem.BodyType);
        bodyType = entry.label;
      }
      if(this.productItem.Color!='' && this.productItem.Color!=undefined && this.productItem.Color!=null){
        let entry = this.colorList.find(ele=>ele.Code==this.productItem.Color);
        color = entry.label;
      }
      if(this.productItem.FuelType!='' && this.productItem.FuelType!=undefined && this.productItem.FuelType!=null){
        let entry = this.fuelTypeList.find(ele=>ele.Code==this.productItem.FuelType);
        fuel = entry.label;
      }
      if(this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined && this.productItem.MotorUsage!=null){
        let entry = this.usageList.find(ele=>ele.Code==this.productItem.MotorUsage);
        usageDesc = entry.label;
      }
      if(this.productItem.MotorCategory!='' && this.productItem.MotorCategory!=undefined && this.productItem.MotorCategory!=null){
        let entry = this.motorCategoryList.find(ele=>ele.Code==this.productItem.MotorCategory);
        motorCategoryDesc = entry.label;
      }
      
      if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
        let bodyType = this.productItem.BodyType
          if(bodyType=='1' || bodyType=='2' || bodyType=='3' || bodyType=='4' || bodyType=='5'){
            if(this.productItem.Model!='' && this.productItem.Model!=null){
              if(this.productItem.Model=='99999'){
                modelDesc = this.productItem.OtherModelDesc;
                model = this.productItem.Model;
              }
              else{
                let entry = this.modelList.find(ele=>ele.Code==this.productItem.Model);
                modelDesc = entry.label;
                model = this.productItem.Model;
              }
            }
          }
          else{
            model = '99999';
            modelDesc = this.productItem.ModelDesc;
          }
      }
    }
    else{
      model = this.vehicleDetails.Vehcilemodel;
      modelDesc = this.vehicleDetails.VehicleModelDesc;
      bodyType = this.vehicleDetails.VehicleTypeDesc;
      fuel = this.vehicleDetails.FuelTypeDesc;
      make = this.vehicleDetails.VehiclemakeDesc;
      motorCategoryDesc = this.vehicleDetails.MotorCategoryDesc
      this.productItem.Make = this.vehicleDetails.Vehiclemake;
      this.productItem.BodyType = this.vehicleDetails.VehicleType;
      this.productItem.FuelType = this.vehicleDetails.FuelType;
      this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
      this.productItem.VehicleType = this.vehicleDetails.VehicleType
    }
    let regNo = null;
    if(this.productItem.RegistrationNo=='' || this.productItem.RegistrationNo==null){
      regNo = this.productItem.ChassisNo;
    }
    else regNo = this.productItem.RegistrationNo;
    let createdBy="";
        let startDate = "",endDate = "",vehicleSI="0",accSI="",windSI="0",tppSI="0";
        if(this.policyStartDate){
          if(String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
          else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
          if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
          else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
        }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      this.subuserType = sessionStorage.getItem('typeValue');
      console.log("AcExecutive",this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
      let appId = "1",loginId="",brokerbranchCode="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; loginId=this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else {
          appId = this.loginId;
          loginId = this.brokerLoginId
          brokerbranchCode = this.brokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
          this.sourceType = this.Code
      }
      else {
        this.sourceType = this.subuserType;
        this.customerCode = this.userDetails?.Result.CustomerCode;
        this.customerName = this.userDetails?.Result.CustomerName
      }
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
        if(this.customerName ==undefined) this.customerName = null;
        if(this.vehicleId==null || this.vehicleId==undefined) this.vehicleId = '1';
        if(this.productItem.VehicleValue==undefined) this.productItem.VehicleValue = null;
        if(this.productItem.Inflation==undefined) this.productItem.Inflation = null;
        let havePromoYN = 'Y';
        if(this.promocode==null || this.promocode=='' || this.promocode==undefined) havePromoYN = 'N'
        let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "AcExecutiveId": null,
          "CommissionType": this.commissionType,
          "CustomerCode": this.customerCode,
          "CustomerName": this.customerName,
          "BdmCode": this.customerCode,
          "BrokerCode": this.brokerCode,
          "LoginId": loginId,
          "SubUserType": this.subuserType,
          "ApplicationId": appId,
          "CustomerReferenceNo": refNo,
          "RequestReferenceNo": this.requestReferenceNo,
          "Idnumber": IdNo,
          "VehicleId": this.vehicleId,
          "AcccessoriesSumInsured": '0',
          "AccessoriesInformation": "",
          "AdditionalCircumstances": "",
          "AxelDistance": '01',
          "Chassisnumber": this.productItem.ChassisNo,
          "Color": this.productItem.Color,
          "ColorDesc": color,
          "CityLimit": null,
          "CoverNoteNo": null,
          "OwnerCategory": this.productItem.OwnerCategory,
          "CubicCapacity": "100",
          "CreatedBy": createdBy,
          "DrivenByDesc": 'Driver',
          "EngineNumber": this.productItem.EngineNo,
          "EngineCapacity": this.productItem.EngineCapacity,
          "FuelType": this.productItem.FuelType,
          "FuelTypeDesc": fuel,
          "Gpstrackinginstalled": 'N',
          "Grossweight": "100",
          "HoldInsurancePolicy": "N",
          "Insurancetype": insuranceType,
          "InsuranceId": this.insuranceId,
          "InsuranceClass": "3",
          "InsurerSettlement": "",
          "InterestedCompanyDetails": "",
          "ManufactureYear":this.productItem.ManufactureYear,
          "ModelNumber": null,
          "MotorCategory": this.productItem.MotorCategory,
          "MotorCategoryDesc": motorCategoryDesc,
          "Motorusage": usageDesc,
          "MotorusageId": this.productItem.MotorUsage,
          "NcdYn": 'N',
          "NoOfClaims": null,
          "NumberOfAxels": "1",
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "ProductId": this.productId,
          "SectionId": ['73'],
          "PolicyType": IdType,
          "RadioOrCasseteplayer": null,
          "RegistrationYear": regYear,
          "Registrationnumber": regNo,
          "RoofRack": null,
          "SeatingCapacity": this.productItem.SeatingCapacity,
          "SourceTypeId":this.sourceType,
          "SpotFogLamp": null,
          "Stickerno": null,
          "SumInsured": vehicleSI,
          "Tareweight": '100',
          "TppdFreeLimit": null,
          "TppdIncreaeLimit": tppSI,
          "TrailerDetails": null,
          "VehicleModel": modelDesc,
          "Vehcilemodel": modelDesc,
            "VehcilemodelId": model,
            "VehicleType": bodyType,
            "VehicleTypeId": this.productItem.BodyType,
            "Vehiclemake": make,
            "VehiclemakeId": this.productItem.Make,
          "WindScreenSumInsured": windSI,
          "Windscreencoverrequired": null,
          "accident": null,
          "periodOfInsurance": "30",
          "PolicyStartDate": startDate,
          "PolicyEndDate": endDate,
          "Currency" : this.currencyCode,
          "ExchangeRate": this.exchangeRate,
          "HavePromoCode": havePromoYN,
          "PromoCode" : this.promocode,
          "CollateralYn": 'N',
          "BorrowerType": null,
          "CollateralName": null,
          "FirstLossPayee": null,
          "FleetOwnerYn": 'N',
          "NoOfVehicles": "1",
          "NoOfComprehensives": null,
          "ClaimRatio": null,
          "SavedFrom": "Owner",
          "UserType": this.userType,
          "SearchFromApi":false,
          "TiraCoverNoteNo": null,
          "EndorsementYn": 'N',
          "EndorsementDate":this.endorsementDate,
          "EndorsementEffectiveDate": this.endorseEffectiveDate,
          "EndorsementRemarks": this.endorsementRemarks,
          "EndorsementType": this.endorsementId,
          "EndorsementTypeDesc": this.endorsementTypeDesc,
          "EndtCategoryDesc": this.endtCategoryDesc,
          "EndtCount":this.endtCount,
          "EndtPrevPolicyNo":this.endtPrevPolicyNo,
          "EndtPrevQuoteNo": this.endtPrevQuoteNo,
          "EndtStatus": this.endtStatus,
          "IsFinanceEndt": this.isFinanceEndt,
          "OrginalPolicyNo": this.orginalPolicyNo,
          "VehicleValueType": this.productItem.VehicleValue,
          "Inflation": this.productItem.Inflation,
          "Ncb":"0",
          "DefenceValue":null,
          "PurchaseDate":null,
          "RegistrationDate": null,
          "Scenarios": {
            "ExchangeRateScenario": {
              "OldAcccessoriesSumInsured": null,
              "OldCurrency": null,
              "OldExchangeRate": null,
              "OldSumInsured": null,
              "OldTppdIncreaeLimit": null,
              "OldWindScreenSumInsured": null
            }
          }
        }
        ReqObj['FleetOwnerYn'] = "N";
        if(this.endorsementSection){
          ReqObj['Status'] = this.vehicleDetails.Status;
          ReqObj['PolicyNo'] = this.endorsePolicyNo
        }
        else{
          ReqObj['Status'] = 'Y';
        }
        ReqObj['ClaimType'] = null;
        ReqObj['DriverDetails'] = null;
      let urlLink = `${this.motorApiUrl}api/savemotordetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(data.ErrorMessage.length!=0){
            if(res.ErrorMessage){
            }
          }
          else{
            if(data.Result.length!=0){
              this.onCheckUWQuestionProceed(data.Result,'proceed','Direct',type);
            }
          }
        });
  }
  showSearchForm(type) {
    if(type=='direct'){
      sessionStorage.removeItem('QuoteStatus');
      sessionStorage.removeItem('vehicleDetailsList');
      sessionStorage.removeItem('customerReferenceNo');
      sessionStorage.removeItem('quoteReferenceNo');
      sessionStorage.removeItem('TravelQuoteRefNo')
      sessionStorage.removeItem('endorsePolicyNo');
    }
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
        "Offset":"1000"
    }
    let urlLink = `${this.CommonApiUrl}api/getactivecustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customers = data?.Result;
            this.searchValue = [];
            this.clearSearchSection = false;
            this.isSearchFormVisible = true;
        }
      });
  }
  onCreateCustomer(){
    sessionStorage.removeItem('customerReferenceNo');
    this.isSearchFormVisible = false;
    this.router.navigate(['/customer/create'])
  }
  onsavecorporate(){
    let policyStartDate="";
    let policyEndDate="";
    let Details:any =[ {
      "PolicyStartDate":"",
      "PolicyEndDate":"",
      "Currency":"",
      "ExchangeRate":"",
      "NoOfDays": "",
    }];
    Details[0].PolicyStartDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
    Details[0].NoOfDays = this.noOfDays;
    Details[0].PolicyEndDate=this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
    Details[0].Currency = this.currencyCode;
    Details[0].ExchangeRate = this.exchangeRate;
    sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails));
    sessionStorage.setItem('Buildings',this.BuildingOwnerYn);
    sessionStorage.setItem('coversRequired',this.coversRequired)
    this.router.navigate(['/quotation/plan/risk-page']);

  }
  onSaveplantaLLrisk(type,formType){
    let ReqObj={
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo":sessionStorage.getItem('quoteReferenceNo'),
      "RiskId": "1",
      "SectionId":  "3",
      "MiningPlantSi": this.productItem?.MiningPlantSi,
      "NonminingPlantSi":this.productItem?.NonminingPlantSi,
      "GensetsSi":this.productItem?.GensetsSi,
    }
    let urlLink = `${this.motorApiUrl}api/slide2/saveallriskdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){
            if(this.commonDetails){
              if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                if(!this.commonDetails[0].SectionId.some(ele=>ele=='3')) this.commonDetails[0].SectionId.push('3');
              }
              else  this.commonDetails[0]['SectionId']=['3'];
            }
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          }
           this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
        }
    },
    (err) => { },
  );
  
  }
  onprofessionalsave(type,formtype){
    let endorsementDate=null,EndorsementEffectiveDate=null,EndorsementRemarks=null,
  EndorsementType=null,EndorsementTypeDesc=null,EndtCategoryDesc=null,EndtCount=null,
  EndtPrevPolicyNo=null,EndtPrevQuoteNo=null,EndtStatus=null,IsFinanceEndt=null,OrginalPolicyNo=null;
    if(this.endorsementDetails){
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
    let ReqObj=[{
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "ProductId": this.productId,
      "SectionId": "106",
      "BranchCode":this.branchCode,
      "InsuranceId": this.insuranceId,
      "CreatedBy":this.loginId,
      "OccupationId":this.productItem?.ProfessionalOccupation,
      "OccupationDesc":"Adocate",
      "ProfessionalType":this.productItem?.ProfessionalType,
       "EmployeeCount": this.productItem?.EmployeeCounts,
       "IndemnityType": this.productItem?.IndemnityTypes,
       "IndemnitySi":this.productItem?.ProfessionalSI,
       "GrossIncome":this.productItem?.GISI,
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
    
    }]
    let urlLink = `${this.motorApiUrl}api/slide7/saveprofindernity`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){
            if(this.commonDetails){
              if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                if(!this.commonDetails[0].SectionId.some(ele=>ele=='106')) this.commonDetails[0].SectionId.push('106');
              }
              else  this.commonDetails[0]['SectionId']=['106'];
            }
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          }
          this.onCheckUWQuestionProceed(data.Result,type,formtype,'none');
        }
    },
    (err) => { },
  );
  
  }

  onsaveemployeenew(type,formType){
    console.log('queryydtatas',this.EmployeeListNew);
      if(this.EmployeeListNew.length!=0){
        this.employeeError = false;
        let i=0;
        for(let emp of this.EmployeeListNew){
            emp['CreatedBy'] = this.loginId;
            emp['InsuranceId'] = this.insuranceId;
            emp['ProductId'] = this.productId;
            emp['RequestReferenceNo'] = this.requestReferenceNo;
            emp['RiskId'] = i+1;
            emp['originalRiskId'] = i+1;
            emp['EndorsementDate'] = this.endorsementDate;
            emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
            emp['EndorsementRemarks'] = this.endorsementRemarks;
            emp['EndorsementType'] = this.endorsementType;
            emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
            emp['EndtCategoryDesc'] = this.endtCategoryDesc;
            emp['EndtCount'] = this.endtCount;
            emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
            emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
            emp['EndtStatus'] = this.endtStatus;
            emp['IsFinanceEndt'] = this.isFinanceEndt;
            emp['OrginalPolicyNo'] = this.orginalPolicyNo;
            if(this.productId=='14' || this.productId=='19' || this.productId=='24') emp['SectionId'] = "45";
            else if(this.productId=='32') emp['SectionId'] = "43";
            else if(this.productId=='15') emp['SectionId'] = "38";
            //this.EmployeeListNew.push(emp)
            i+=1;
            if(i==this.EmployeeListNew.length){
              let urlLink = `${this.motorApiUrl}api/slide7/saveempliablity`;
              this.sharedService.onPostMethodSync(urlLink, this.EmployeeListNew).subscribe(
                (data: any) => {
                  if (data?.Result.length!=0) {
                    this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                    sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                    if(type=='proceed'){ 
                      if(this.productId=='14'){
                        if(this.commonDetails){
                          if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                            if(!this.commonDetails[0].SectionId.some(ele=>ele=='45')) this.commonDetails[0].SectionId.push('45');
                          }
                          else  this.commonDetails[0]['SectionId']=['45'];
                        }
                      }
                      if(this.productId=='15'){
                        if(this.commonDetails){
                          if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                            if(!this.commonDetails[0].SectionId.some(ele=>ele=='38')) this.commonDetails[0].SectionId.push('45');
                          }
                          else  this.commonDetails[0]['SectionId']=['38'];
                        }
                      }
                      else if(this.productId=='32'){
                        if(this.commonDetails){
                          if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                            if(!this.commonDetails[0].SectionId.some(ele=>ele=='43')) this.commonDetails[0].SectionId.push('43');
                          }
                          else  this.commonDetails[0]['SectionId']=['43'];
                        }
                      }
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
                    this.Products=false;
                    this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
                  }
              },
              (err) => { },
            );
            }
        }
      }
      else{
        this.employeeError = true;
        Swal.fire({
          title: '<strong>Employee Details</strong>',
          icon: 'error',
          html:
            `Please Enter Atleast one Employee Detail`,
          //showCloseButton: true,
          //focusConfirm: false,
          showCancelButton: false,
  
          //confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
        })
      }
  }
  anothercyberSave(type,formType){
    console.log('NNNNNNNNNNNNN',this.ProductCode);
    let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let appId = "1", loginId = "", brokerbranchCode = "";
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
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
        loginId = this.commonDetails[0].LoginId
        brokerbranchCode = null;
      }
    }
    let ReqObj={
        "CreatedBy":createdBy,
        "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
        "RequestReferenceNo": this.requestReferenceNo,
        "RiskId": "1",
        "SectionId": this.ProductCode,
        "OccupationType":this.CyberCode
    }
    let urlLink = `${this.motorApiUrl}api/slide6/saveelectronicequip`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails));
          this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
        }
    },
    (err) => { },
  );
  }
  onSaveMedicalDetails(type,formType){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": "70",
      "AooSumInsured": this.productItem?.AooSumInsured,
      "AggSumInsured": this.productItem?.AggSumInsured,
      "Category": this.productItem?.Category,
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
    //  "FirstLossPayee":this.productItem?.FirstLossPayee,
  }
  if (this.endorsementSection) {
    if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
      ReqObj['Status'] = 'E';
    }
    else {
      ReqObj['Status'] = this.productItem?.Status;
    }
    ReqObj['PolicyNo'] = this.endorsePolicyNo
  }
  else {
    ReqObj['Status'] = 'Y';
  }
  let urlLink = `${this.motorApiUrl}api/slide12/savepublicliability`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){
            if(this.commonDetails){
              if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                if(!this.commonDetails[0].SectionId.some(ele=>ele=='70')) this.commonDetails[0].SectionId.push('70');
              }
              else  this.commonDetails[0]['SectionId']=['70'];
            }
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          }
          this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
        }
    },
    (err) => { },
  );
  }
  onSaveMachineryDetails(type,formType){
    if(this.productItem?.PowerPlantSi==0){
      this.productItem.PowerPlantSi=0;
    }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  "41",
      // "BoilerPlantsSi": this.productItem?.BoilerPlantsSi,
      // "ElecMachinesSi": this.productItem?.ElecMachinesSi,
      // "EquipmentSi": this.productItem?.EquipmentSi,
      // "GeneralMachineSi": this.productItem?.GeneralMachineSi,
      // "MachineEquipSi": this.productItem?.MachineEquipSi,
      // "ManuUnitsSi": this.productItem?.ManuUnitsSi,
      "MachinerySi": this.productItem?.PowerPlantSi,
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
    //  "FirstLossPayee":this.productItem?.FirstLossPayee,
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide9/savemachinerybreakdown`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Result) {
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
              if(type=='proceed' && this.productId!='19'){
              this.commonDetails[0]['SectionId'] = ['41'];
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
              }
               this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
            }
        },
        (err) => { },
      );
  }
  onSaveBurglaryDetails(type,formType){
    if(this.TableRowBurglary.length !=0) {
    this.subuserType = sessionStorage.getItem('typeValue');
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let appId = "1",loginId="",brokerbranchCode="";
    let createdBy="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
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
          loginId = this.commonDetails[0].LoginId;
          //loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.commonDetails[0].SourceType;
        this.bdmCode = this.commonDetails[0].BrokerCode;
        this.brokerCode = this.commonDetails[0].BrokerCode;
        this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
        this.customerCode = this.commonDetails[0].CustomerCode;
      }
      let insuranceForList = [];
      if (this.productItem.InsuranceForId != null) {
        insuranceForList = Object.keys(this.productItem.InsuranceForId);
      }
      let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
      if (refNo!=undefined && refNo!="undefined") {
        reqRefNo = sessionStorage.getItem('quoteReferenceNo')
      }
      if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
      let ReqObj =[]
      let entry
      let i =0;
    for(let items of this.TableRowBurglary){
      console.log("Burg Item",items)
   entry = {
      "BurglarySuminsured":items.BurglarySi,
      "LocationName":items.LocationName,
      "IndustryType":items.IndustryType,
      "RegionCode":items.RegionCode,
      "DistrictCode": items.DistrictCode,
      "FirstLossSumInsured": items.FireSumInsured,
      "sumInsured": items.BurglarySi,
      "CoveringDetails": items.CoveringDetails,
      "DescriptionOfRisk": items.DescriptionOfRisk,
      "IndustryId": items.IndustryType,
      "AgencyCode": this.agencyCode,
      "ApplicationId": appId,
      "BdmCode": null,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.brokerbranchCode,
      "BrokerCode": this.brokerCode,
      "BuidingAreaSqm": null,
      "BuildingBuildYear": this.productItem.BuildingBuildYear,
      "BuildingCondition": null,
      "BuildingFloors": "",
      "BuildingOwnerYn": this.productItem?.BuildingOwnerYn,
      "BuildingPurposeId": "3",
      "CreatedBy": createdBy,
      "SourceType": this.sourceType,
      "CustomerCode": this.customerCode,
      "InsuranceId": this.insuranceId,
      "InsuranceType": null,
      "RiskId": i+1,
      "LoginId": this.loginId,
      "UserType": this.userType,
      "OutbuildConstructType": null,
      "ProductId": this.productId,
      "SectionId": "52",
      "SubUsertype": this.subuserType,
      "InsuranceForId": insuranceForList,
      "NatureOfTradeId": this.productItem.NatureOfTradeId,
      "WallType": this.productItem.WallType,
      "InternalWallType": this.productItem.InternalWallType,
      "CeilingType": this.productItem.CeilingType,
      "FirstLossPercentId": items.FirstLossPercentId,
      "StockInTradeSi": this.productItem.StockInTradeSi,
      "GoodsSi": this.productItem.GoodsSi,
      "FurnitureSi": this.productItem.FurnitureSi,
      "ApplianceSi": this.productItem.ApplianceSi,
      "CashValueablesSi": this.productItem.CashValueablesSi,
      "StockLossPercent": this.productItem.StockLossPercent,
      "GoodsLossPercent": this.productItem.GoodsLossPercent,
      "FurnitureLossPercent": this.productItem.FurnitureLossPercent,
      "ApplianceLossPercent": this.productItem.ApplianceLossPercent,
      "CashValueablesLossPercent": this.productItem.CashValueablesLossPercent,
      "Address": this.productItem.Address,
      "OccupiedYear": this.productItem.OccupiedYear,
      "WatchmanGuardHours": this.productItem.WatchmanGuardHours,
      "AccessibleWindows": this.productItem.AccessibleWindows,
      "ShowWindow": this.productItem.ShowWindow,
      "FrontDoors": this.productItem.FrontDoors,
      "BackDoors": this.productItem?.BackDoors,
      "TrapDoors": this.productItem?.TrapDoors,
      "WindowsMaterialId": this.productItem?.WindowsMaterialId,
      "DoorsMaterialId": this.productItem?.DoorsMaterialId,
      "NightLeftDoor": this.productItem?.NightLeftDoor,
      "BuildingOccupied": this.productItem?.BuildingOccupied,
      "BurglarySi":items.BurglarySi,
      "RoofType": this.productItem?.RoofType,
      "RequestReferenceNo": reqRefNo,
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
      "PolicyNo": this.endorsePolicyNo,
      "Status": "Y"
    }
    ReqObj.push(entry);
    i+=1;
  }
   
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
 
    let urlLink = `${this.motorApiUrl}api/slide3/saveburglaryandhouselist`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Result) {
              if(type=='save'){
                this.form.reset();
              }
              else{

                if(data.Result.length!=0){
                  this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  if(type=='proceed' && this.productId!='19'){
                  this.commonDetails[0]['SectionId'] = ['52'];
                  sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
                  }
                   this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
                }
               
                
              }
              }
              
        },
        (err) => { },
      );
    }
    else {
      this.burglaryError = true;
      Swal.fire({
        title: '<strong>Burglary Details</strong>',
        icon: 'error',
        html:
          `Please Enter Atleast one Burglary Detail`,
        //showCloseButton: true,
        //focusConfirm: false,
        showCancelButton: false,

        //confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
      })
    }
  }

  onSaveFireAlliedDetails(type,formType){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  "40",
      "BuildingSuminsured": this.productItem?.BuildingSuminsured,
      "IndemityPeriod": this.productItem?.IndemityPeriod,
      //"FireBuildingSi": this.productItem?.FireBuildingSi,
      "FirePlantSi": this.productItem?.FirePlantSi,
      "FireEquipSi": this.productItem?.FireEquipSi,
      "StockInTradeSi": this.productItem?.FireStockSi,
      "OnStockSi":this.productItem?.onStockSumInsured,
      "OnAssetsSi":this.productItem?.onAssetSumInsured,
      "MakutiYn": this.productItem?.MakutiYn,
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
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide4/savefireandperils`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Result) {
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
              if(type=='proceed'){
                if(this.commonDetails){
                  if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                    if(!this.commonDetails[0].SectionId.some(ele=>ele=='40')) this.commonDetails[0].SectionId.push('40');
                  }
                  else  this.commonDetails[0]['SectionId']=['40'];
                }
                sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
              }
              this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
            }
        },
        (err) => { },
      );
  }
  getRegionDesc(rowData){
    let entry = this.regionList.find(ele=>ele.Code==rowData);
    if(entry) return entry.label;
    else return ''
  }
  getFirstSIDesc(rowData){
    
  }
  getFirstLossDesc(rowData){
    let entry = this.firstLossList.find(ele=>ele.Code==rowData);
    if(entry) return entry.label;
    else return ''
  }
  getIndustryDesc(rowData){
    console.log(rowData);
    let entry = this.industryList.find(ele=>ele.Code==rowData.IndustryType);
    if(entry!=undefined) return entry.label;
    else return ''
  }
  onSaveMoneyDetails(type,formType){
    let ReqObj=[]
    let i = 0;
    //let j=this.TableRowMoney.length
    for(let items of this.TableRowMoney){

      let entry= {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": i+1,
      "SectionId":  "42",
      "MoneySafeLimit": items.MoneySafeLimit,
      // "MoneyOutofSafe": this.productItem?.MoneyOutofSafe,
      "MoneyInSafe": items.MoneyInSafe,
      "MoneyInTransit": items.MoneyInTransit,
      "MoneyDirectorResidence": items.MoneyDirectorResidence,
      "MoneyCollector": items.MoneyCollector,
       "MoneyAnnualEstimate":items.MoneyAnnualEstimate,
       "MoneyMajorLoss":items.MoneyMajorLoss,
       "StrongroomSi": items.StrongroomSi,
       "MoneyOutofSafe": items.MoneyOutofSafe,
      // "FirstLossPayee":items.FirstLossPayee,
      // "CashInHandEmployees": this.productItem?.CashInHandEmployees,
      // "CashInSafe": this.productItem?.CashInSafe,
      // "CashInTransit": this.productItem?.CashInTransit,
      // "MoneyAnnualcarrySuminsured": this.productItem?.MoneyAnnualcarrySuminsured,
      // "MoneyInPremises": this.productItem?.MoneyInPremises,
      // "MoneyInSafeBusiness": this.productItem?.MoneyInSafeBusiness,
      // "MoneyOutSafeBusiness": this.productItem?.MoneyOutSafeBusiness,
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
      "LocationName":items.LocationName,
      "RegionCode":items.RegionCode,
      "DistrictCode":items.DistrictCode,
      // "RegionDesc":this.getRegionDesc(items.RegionCode),
      // "DistrictDesc":this.getDistrictDesc(items.DistrictCode)
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    ReqObj.push(entry);
        i+=1;
  if(i==this.TableRowMoney.length){this.finalSaveMoney(ReqObj,type,formType)}
    }
  
}
finalSaveMoney(finalList,type,formType) {
    let urlLink = `${this.motorApiUrl}api/slide10/savemoneydetails`;
        this.sharedService.onPostMethodSync(urlLink, finalList).subscribe(
          (data: any) => {
            if (data?.Result) {
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
              if(type=='proceed'){
                if(this.commonDetails){
                  if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                    if(!this.commonDetails[0].SectionId.some(ele=>ele=='42')) this.commonDetails[0].SectionId.push('42');
                  }
                  else  this.commonDetails[0]['SectionId']=['42'];
                }
                sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
              }
               this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
            }
        },
        (err) => { },
      );
  }
  onCheckUWQuestionProceed(buildDetails,type,formType,saveType){
    if(buildDetails.length!=0){
      
      if (this.uwQuestionList.length != 0 ) {
        let createdBy = ""
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP') {
          createdBy = ""
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        }
        else createdBy = this.loginId;
        this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
          let j=0;
          for(let build of buildDetails){
            let i = 0;
            let uwList: any[] = [];
            //let branchCode = '';
            for (let ques of this.uwQuestionList) {
                if(ques.Value!='' && ques.Value!=null){
                  ques['BranchCode'] = this.branchCode;
         
                  let status = null,loading = null,vehicleId=null;
                  if(this.productId=='42' || this.productId=='43' || this.productId=='46') vehicleId = '1';
                  else vehicleId = build.LocationId
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
                    "RequestReferenceNo": this.requestReferenceNo,
                    "VehicleId": vehicleId
                  }
                  uwList.push(entry);
                }
                
              // if (ques.QuestionType == '01') {
              //   ques['CreatedBy'] = createdBy;
              //   ques['RequestReferenceNo'] = this.requestReferenceNo;
              //   ques['UpdatedBy'] = this.loginId;
              //   if(this.productId=='42' || this.productId=='43') ques["VehicleId"] = '1';
              //   else ques["VehicleId"] = build.LocationId
              //   uwList.push(ques);
              // }
              // else if (ques.Value != "") {
              //   ques['CreatedBy'] = createdBy;
              //   ques['RequestReferenceNo'] = this.requestReferenceNo;
              //   ques['UpdatedBy'] = this.loginId;
              //   if(this.productId=='42' || this.productId=='43') ques["VehicleId"] = '1';
              //   else ques["VehicleId"] = build.LocationId
              //   uwList.push(ques);
              // }
              i += 1;
              if (i == this.uwQuestionList.length){ j+=1; 
                if(uwList.length!=0) this.onSaveUWQuestions(uwList,buildDetails,type,formType,j,saveType);
                else if(j==buildDetails.length) this.onCalculate(buildDetails,type,formType,saveType)
              }
            }
          }
      }
      else this.onCalculate(buildDetails,type,formType,saveType)
    }
  }
  onSaveUWQuestions(uwList,buildDetails,type,formType,index,saveType) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
              if(index==buildDetails.length) this.onCalculate(buildDetails,type,formType,saveType)
          }
        },
        (err) => { },
      );
    }
  }
  onCalculate(buildDetails,type,formType,saveType) {
    let createdBy = ""
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP') {
      createdBy = ""
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    else createdBy = this.loginId;
    if (buildDetails.length != 0) {
      this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
      sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
      let i = 0;
      for (let build of buildDetails) {
        let effectiveDate = null, coverModificationYN = 'N';
        let startDate = null;
        if (this.endorsementSection) {
          effectiveDate = this.endorseEffectiveDate;
          // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
          // if (entry || this.endorsementId == 846) coverModificationYN = 'Y';
          // else coverModificationYN = 'N';
          if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
        }
        else {
          let date = null;
          if(this.policyStartDate) date = this.policyStartDate
          else date = this.commonDetails[0].PolicyStartDate;
          let dateList = String(date).split('/');
          if(dateList.length==1) startDate = this.datePipe.transform(String(date),'dd/MM/yyyy');
          else startDate = date; 
          effectiveDate = startDate
        }
        if(this.productId=='46') build['RiskId'] = this.vehicleId;
        if(this.productId=='13') build['RiskId'] = build.VehicleId;
        let sectionId = '';
        let endDate=null;
        let date = null;
          if(this.policyEndDate) date = this.policyEndDate
          else date = this.commonDetails[0].PolicyEndDate;
          let dateList = String(date).split('/');
          if(dateList.length==1) endDate = this.datePipe.transform(String(date),'dd/MM/yyyy');
          else endDate = date; 
        let locationId = '1';
        if(build.LocationId!=null && build.LocationId!=undefined) locationId=build.LocationId;
        let ReqObj = {
          "LocationId" : locationId,
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "SectionId": build.SectionId,
          "ProductId": this.productId,
          "MSRefNo": build.MSRefNo,
          "VehicleId": build.RiskId,
          "CdRefNo": build.CdRefNo,
          "VdRefNo": build.VdRefNo,
          "CreatedBy": this.loginId,
          "productId": this.productId,
          "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
          "EffectiveDate": effectiveDate,
          "PolicyEndDate": endDate,
          "CoverModification": coverModificationYN
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              let entry = data?.Result;
              i += 1;
              if (i == buildDetails.length) {
                if(this.productId=='46'){
                  this.vehicleDetailsList[this.currentIndex-1]['CdRefNo']=build.CdRefNo;
                }
                if(this.productId=='61'){
                  if(type=='save'){}
                  else{
                    if(this.endorsementSection){this.router.navigate(['/quotation/plan/premium-info']);} 
                    else { this.router.navigate(['/quotation/plan/premium-details']);}
                  }
                }
                else if(formType=='Group'){
                  // if(type=='save'){this.selectedIndex +=1;
                  //   this.onNextProceed();
                  // }
                  // else{this.onFinalProceed();}
                }
                else if(type!='save'){ 
                  if(saveType=='proceedNext') this.getMotorDetails(saveType);
                  else if(saveType=='Next'){
                    this.productItem = null;
                    this.productItem = new ProductData();
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    let i=0;
                      for(let field of fieldList){
                        field.formControl.setValue('');
                        i+=1;
                        if(i==fieldList.length){
                          this.currentIndex = this.currentIndex+1;
                          this.vehicleId = this.vehicleDetailsList[this.currentIndex-1].Vehicleid;
                          this.showSection = false;
                          if(this.vehicleDetailsList[this.currentIndex-1]?.Active) this.setCommonFormValues(null);
                        }
                      }
                  }
                  else if(saveType=='Group'){
                    let list = this.vehicleDetailsList.filter(ele=>ele.CdRefNo==null || ele.CdRefNo==undefined);
                    console.log("Final Vehicle Details",this.vehicleDetailsList)
                    if(list.length!=0){
                      this.productItem = null;
                      this.productItem = new ProductData();
                      let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                      let i=0;
                        for(let field of fieldList){
                          field.formControl.setValue('');
                          i+=1;
                          if(i==fieldList.length){
                            this.vehicleId = list[0].Vehicleid;
                            let index = this.vehicleDetailsList.findIndex(ele=>ele.Vehicleid==this.vehicleId);
                            if(index!=null && index!=undefined)  this.currentIndex = index+1;
                            this.getMotorDetails(saveType);
                          }
                        }
                    }
                    else this.onFinalProceed();
                    
                      
                  }
                  else this.onFinalProceed();
                }
                else{this.currentBurglaryIndex=null;}
              }
            }
          },
          (err) => { },
        );
      }
    }
  }
  onFinalProceed() {
    if(this.productId=='66' || this.productId=='59' || this.productId=='63' || this.productId=='56' || this.productId=='60' || this.productId=='24'){
      sessionStorage.setItem('Buildings',this.BuildingOwnerYn);
      sessionStorage.setItem('coversRequired',this.coversRequired)
      this.commonDetails = [
        {
            "PolicyStartDate": this.policyStartDate,
            "PolicyEndDate": this.policyEndDate,
            "Currency": this.currencyCode,
            "SectionId": null,
            "AcexecutiveId": "",
            "ExchangeRate": this.exchangeRate,
            "StateExtent": "",
            "NoOfDays": null,
            "HavePromoCode": this.promocode,
            "PromoCode": this.promocode,
            "SourceType": this.Code,
            "BrokerCode": this.brokerCode,
            "BranchCode": this.branchCode,
            "BrokerBranchCode": this.brokerBranchCode,
            "CustomerCode": this.customerCode,
            "CustomerName": this.customerName,
            "LoginId": null,
            "IndustryName": null
        }
      ]
      sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
      this.router.navigate(['/quotation/plan/risk-page']);
    }
    else {
      if(this.productId!='46') this.saveFleetDetails();
      else if(this.endorsementSection){this.router.navigate(['/quotation/plan/premium-info']);} 
      else { this.router.navigate(['/quotation/plan/premium-details']);}
      //this.router.navigate(['/quotation/plan/premium-details']);
    }
    
    // if (this.uwQuestionList.length != 0) {
  
    // }
    /*else{
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }*/
  }
  onCustomerSearch(){
    if(this.searchValue){
      this.customers = [];
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "SearchValue":this.searchValue,
        "CreatedBy": ""
      }
      let urlLink = `${this.CommonApiUrl}api/searchcustomerdata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customers=data.Result;
              this.clearSearchSection = true;
          }
        },
        (err) => { },
      );
    }
  }
  saveFleetDetails(){
    if(this.productId!='46' && this.productId!='25' && this.productId!='16' && this.productId!='1' && this.productId!='14' && this.productId!='13' && this.productId!='32' && this.productId!='6' && this.productId!='63'){      let Reqobj={
        "RequestReferenceNo": this.requestReferenceNo,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId
      }
      let urlLink = `${this.motorApiUrl}api/savefleetdetails`;
        this.sharedService.onPostMethodSync(urlLink, Reqobj).subscribe(
          (data: any) => {
            if(data.Result){
              this.getFleetCalc(data.Result);
                
            }
          })
    }
    else if(this.endorsementSection){this.router.navigate(['/quotation/plan/premium-info']);} 
    else { this.router.navigate(['/quotation/plan/premium-details']);}
  }
  getFleetCalc(res){
    let startDate = "",endDate = ""
    //this.updateComponent.vehicleDetails = this.vehicleDetails;
     if(this.commonDetails[0].PolicyStartDate){
      if(String(this.commonDetails[0].PolicyStartDate).includes('/')) startDate = this.commonDetails[0].PolicyStartDate;
      else startDate = this.datePipe.transform(this.commonDetails[0].PolicyStartDate, "dd/MM/yyyy");
      const oneday = 24 * 60 * 60 * 1000;
      const momentDate = new Date(this.commonDetails[0].PolicyEndDate); // Replace event.value with your date value
      const formattedDate = moment(momentDate).format("YYYY-MM-DD");
      const formattedDatecurrent = new Date(this.commonDetails[0].PolicyStartDate);
      console.log(formattedDate);
      this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
      }
    if(this.commonDetails[0].PolicyEndDate){
      
        if(String(this.commonDetails[0].PolicyEndDate).includes('/')) endDate = this.commonDetails[0].PolicyEndDate;
        else endDate = this.datePipe.transform(this.commonDetails[0].PolicyEndDate, "dd/MM/yyyy");
    }
    let effectiveDate=null;
    if(this.endorsementSection){
        effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if(this.commonDetails[0].PolicyStartDate){
        if(String(this.commonDetails[0].PolicyStartDate).includes('/')) effectiveDate = this.commonDetails[0].PolicyStartDate;
        else effectiveDate = this.datePipe.transform(this.commonDetails[0].PolicyStartDate, "dd/MM/yyyy");
      }
    }
    let ReqObj={
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "SectionId": res?.SectionId,
      "ProductId": this.productId,
      "MSRefNo": res?.MSRefNo,
      "VehicleId": res?.VehicleId,
      "CdRefNo": res?.CdRefNo,
      "VdRefNo": res?.VdRefNo,
      "CreatedBy": res?.CreatedBy,
      "productId": this.productId,
      "sectionId": res?.SectionId,
      "RequestReferenceNo": this.requestReferenceNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": endDate,
      "CoverModification": "N",
      "PDRefNo":res?.PDRefNo
    }
    let urlLink = `${this.CommonApiUrl}calculator/policy/calc`;
    if(this.insuranceId!='100028' && this.insuranceId!='100027' && this.insuranceId!='100040' && this.insuranceId!='100042'  && this.insuranceId!='100019'){
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.CoverList){
            this.router.navigate(['/quotation/plan/premium-details']);
          }
        });
    }
    else this.router.navigate(['/quotation/plan/premium-details']);
    // 
  }

  getPlantallrisk(sections){
  
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  '3'
    }
    let urlLink = `${this.motorApiUrl}api/slide2/getallriskdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let details = data?.Result;
          this.productItem.AllriskSumInsured = details?.AllriskSumInsured;
        }
      },
      (err) => { },
    );
  }
  getPublicLiabilityDetails(sections){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  '54'
    }
    let urlLink=`${this.motorApiUrl}api/slide12/getpublicliability`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let details = data?.Result;
          this.productItem.LegalLiabilityAnnualAggreagte = details?.LiabilitySi;
          this.productItem.ProductTurnover = details?.ProductTurnoverSi;
          this.productItem.InsurancePeriodSi = details?.InsurancePeriodSi;
          this.productItem.AnyAccidentSi = details?.AnyAccidentSi;
         // this.productItem.FirstLossPayee = details?.FirstLossPayee;
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  getGoodsTransitDetails(sections){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  '46'
    }
    let urlLink=`${this.motorApiUrl}api/slide14/getgoodsintransit`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          // this.productItem.GrossProfitSi = data.Result?.GrossProfitSi;
          // this.productItem.IndemnityPeriodSi = data.Result?.IndemnityPeriodSi;
         
          this.productItem.GeographicalCoverage = data.Result?.GeographicalCoverage;
          if(data.Result?.SingleRoadSiLc !=null && data.Result?.SingleRoadSiLc !=''){
            this.productItem.SingleRoadSiLc = data.Result?.SingleRoadSiLc;
          }
          else{
            this.productItem.SingleRoadSiLc =0;
          }
          if(data.Result?.EstAnnualCarriesSiLc !=null && data.Result?.EstAnnualCarriesSiLc!=''){
            this.productItem.EstAnnualCarriesSiLc = data.Result?.EstAnnualCarriesSiLc;
          }
          else{
            this.productItem.EstAnnualCarriesSiLc = 0;
          }
          
          this.productItem.TransportedBy = data.Result?.TransportedBy;
          this.productItem.ModeOfTransport = data.Result?.ModeOfTransport;
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  getElectronicEquipment(sections){
    let sectionId = null;
    if(this.productId=='25') sectionId='39';
    else sectionId ='76'
    let i= sections.RiskId;
    let RiskId=null;
    if(this.productId=='25') RiskId=i;
    else RiskId;
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide6/getelectronicequip`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let details = data?.Result;
          this.productItem.ContentId=data.Result[i-1].ContentId;
          this.productItem.Serial=data.Result[i-1].SerialNo;
          this.productItem.ElecEquipSuminsured=data.Result[i-1].ElecEquipSuminsured;
          this.productItem.Description=data.Result[i-1].Description;
          this.productItem.LocationName=data.Result[i-1].LocationName;
        //  this.productItem.FirstLossPayee=data.Result[i-1].FirstLossPayee;
         // this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.productItem.LocationName);
          this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.productItem.ContentId);
          this.fields[0].fieldGroup[0].fieldGroup[1].formControl.setValue(this.productItem.Serial);
         // this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(this.productItem.FirstLossPayee);
          this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(this.productItem.Description);
          this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(this.productItem.ElecEquipSuminsured);
          this.productItem.ElectronicEquipSuminsured = details?.MiningPlantSi;
          if(this.productId=='19') this.productItem.ElectronicEquipSuminsured = details?.ElecEquipSuminsured;
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  addLocation(){
    let location = {
      "Code":this.LocationList.length+1,
      "CodeDesc":this.LocationName,

    }
    this.LocationList.push(location);
  }
  openconfrim(i){
    if(this.LocationList.length==1){
        this.local=false;
    }
    else{
      this.confirmDeleteTab(i);
    }
      
  }
  confirmDeleteTab(index: number) {
    this.tabIndexToDelete = index;
    this.display = true;
  }

  deleteTab() {
    this.LocationList.splice(this.tabIndexToDelete, 1);
  }
  getBusinessInterruptionDetails(sections){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  '75'
    }
    let urlLink=`${this.motorApiUrl}api/slide13/getbusinessInterruption`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if(data.Result?.GrossProfitSi!='' && data.Result?.GrossProfitSi!=null){
            this.productItem.GrossProfitSi = data.Result?.GrossProfitSi;
          }
          else{
            this.productItem.GrossProfitSi=0;
          }
        if(data.Result?.IndemnityPeriodSi !='' && data.Result?.IndemnityPeriodSi !=null){
          this.productItem.IndemnityPeriodSi = data.Result?.IndemnityPeriodSi;
        }
        else{
          this.productItem.IndemnityPeriodSi=0;
        }
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  getBusinessAllRiskDetails(sections){
    let sectionId = null;
    
    if(this.productId=='19' || this.productId=='24') sectionId='69';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  sectionId
    }
    let urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let details = data?.Result;
          if(data?.Result?.AllriskSumInsured!=null) this.productItem.EquipmentSi = data?.Result?.AllriskSumInsured;
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  
  }
  onNextProceed(){
    console.log('this.newsections',this.newsections);
    let count = this.selectedIndex;
    let totalCount = 0;
    if(this.fields[0].fieldGroup.length!=0) totalCount = this.fields[0].fieldGroup.length-1;
    let rowData:any = this.fields[0].fieldGroup[count];
    console.log('rowData222',rowData)
    let type="";
    if(count!=totalCount) type='save';
    else type ='proceed';
    console.log('rowData',rowData.props.label);
        this.saveCommonDetails('Risk',null);
  
   
    // let reqRefNo = sessionStorage.getItem('quoteReferenceNo')
    // if (reqRefNo!=undefined && reqRefNo!="undefined") {
    //     this.saveCommonDetails('Risk');
    // }
    //  else {
    //   if(this.newsections == '35' ){
    //   this.onSavePersonalAccidentDetails(type,'Group');
    //   }
    //   else if(this.newsections == '3'){
    //     this.onSaveAllRiskDetails(type,'Group');
    //   }
    //   else if(this.newsections == '1'){
    //     this.onSaveBuildingDetails(type,'Group');
    //   }
    //   else if(this.newsections == '47'){
    //     this.onSaveContentRiskDetails(type,'Group');
    //   }
    //   else if(this.newsections == '36'){
    //     this.onSavePersonalLiability(type,'Group');
    //   }
    // }
    if(rowData.fieldGroup.props.label=='Building Risk'){
      if(this.finalizeYN=='Y'){
          if(type=='save'){
            this.selectedIndex +=1;
            this.onNextProceed();
          }
          else if(type!='save'){ this.onFinalProceed();}
      }
      //else this.onSaveBuildingDetails(type,'Group');
    }
    if(rowData.props.label=='Fire & Allied Perils'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveFireAlliedDetails(type,'Group');
    }
    else if(rowData.props.label=='Contents Risk'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveContentRiskDetails(type,'Group');
    }
    else if(rowData.props.label=='All Risk'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveAllRiskDetails(type,'Group');
    }
    else if(rowData.props.label=='Personal Accident'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSavePersonalAccidentDetails(type,'Group');
    }
     else if(rowData.props.label=='Personal Liability'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSavePersonalLiability(type,'Group');
    }
    else if(rowData.props.label=='Public Liability'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSavePublicLiability(type,'Group');
    }
    else if(rowData.props.label=='Machinery BreakDown'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveMachineryDetails(type,'Group');
    }
    else if(rowData.props.label=='Employers Liability'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onsaveemployeenew(type,'Group'); //this.onSaveEmployeeDetails(type,'Group');
    }
    else if(rowData.props.label=='Fidelity'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onsavenewFedilityDetails(type,'Group');//this.onSaveFidelityDetails(type,'Group');
    }
    else if(rowData.props.label=='Machinery BreakDown'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveMachineryDetails(type,'Group');
    }
    else if(rowData.props.label=='Money'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveMoneyDetails(type,'Group');
    }
    else if(rowData.props.label=='Burglary'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveBurglaryDetails(type,'Group');
    }
    else if(rowData.props.label=='Business All Risk'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveBussinessrisk(type,'Group');
    }
    else if(rowData.props.label=='Business Interruption'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveBusinessInterruption(type,'Group');
    }
    else if(rowData.props.label=='Goods in Transit'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveGoodsTransitDetails(type,'Group');
    }
    if(rowData.props.label=='Electronic Equipment'){
      if(this.finalizeYN=='Y'){
        if(type=='save'){
          this.selectedIndex +=1;
          this.onNextProceed();
        }
        else if(type!='save'){ this.onFinalProceed();}
      }
      else this.onSaveElectronicEquipment(type,'Group');
    }
  }
  saveElectronicEquip(rowData){
    let valid = this.checkValidation();
    if(valid){
      let RiskId;
      let i= this.TableRowEE.length;
      if(this.currentEEIndex==0){
        RiskId=i+1;
      }
      else {
        RiskId =this.currentEEIndex;
      }
    let data = {
      "LocationName":this.LocationName,
      "ContentId": rowData.ContentId,
     "SerialNo" : rowData.Serial,
      "Description": rowData.Description,
      "ElecEquipSuminsured": rowData.ElecEquipSuminsured,
     // "FirstLossPayee": rowData.FirstLossPayee,
    }
    if (this.currentEEIndex !=0) {
      this.TableRowEE[this.currentEEIndex-1] = data;
      this.currentEEIndex=0
    } else {
      this.TableRowEE.push(data);
      // If currentBurglaryIndex is out of range, you might want to push the data
    } 
      //this.TableRowEE.push(data);
      this.form.reset();
      this.isEEForm=false;
    }
  }
  deleteEE(index){
    this.TableRowEE.splice(index,1);
  }
  deletePA(index){
    this.tableRowPA.splice(index,1);
  }
  getContenDesc(rowData){
    let entry = this.dropList.find(ele=>ele.Code==rowData);
    return entry.CodeDesc;
  }
  getPersonalAccOccDesc(value){
    if(value!='' && value!=null && value!=undefined){
      let entry = this.occupationList.find(ele=>ele.Code==value);
      return entry.CodeDesc;
    }
    else return '';
  }
  onSaveElectronicEquipment(type,formType){
    if(this.TableRowEE.length!=0){
    let sectionId=null;
    if(this.productId=='25') sectionId='39';
    else sectionId = '76';
    let ReqObj=[]
    let i = 0;
    for(let items of this.TableRowEE){
      let entry= {
            "InsuranceId": this.insuranceId,
            "ProductId": this.productId,
            "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
            "RiskId": i+1,
            "SectionId": sectionId,
            "ElecEquipSuminsured": items.ElecEquipSuminsured,
            "Status": "Y",
            "ContentId": items.ContentId,
            "ContentDesc": this.getContenDesc(items.ContentId),
            "CreatedBy": this.loginId,
            "EndorsementDate": null,
            "EndorsementEffectiveDate": null,
            "EndorsementRemarks": null,
            "EndorsementType": null,
            "EndorsementTypeDesc": null,
            "EndtCategoryDesc": null,
            "EndtCount": null,
            "EndtPrevPolicyNo": null,
            "EndtPrevQuoteNo": null,
            "EndtStatus": null,
            "IsFinanceEndt": null,
            "OrginalPolicyNo": null,
            "LocationName":items.LocationName,
            "Description":items.Description,
            "SerialNo":items.SerialNo,
           // "FirstLossPayee":items.FirstLossPayee,
        }
        if (this.endorsementSection) {
          if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
            entry['Status'] = 'E';
          }
          else {
            entry['Status'] = this.productItem?.Status;
          }
          entry['PolicyNo'] = this.endorsePolicyNo
        }
        else {
          entry['Status'] = 'Y';
        }
        ReqObj.push(entry);
        i+=1;
        if(i==this.TableRowEE.length){this.finalSaveEE(ReqObj,type,formType)}
  
    }
  }
  else{

    this.EEError = true;
          
  }
 
  }
  EEErrorFun(){
    Swal.fire({
      title: '<strong>Electronic Equipment Details</strong>',
      icon: 'error',
      html:
        `Please Enter Atleast one Electronic Equipment Detail`,
      //showCloseButton: true,
      //focusConfirm: false,
      showCancelButton: false,

      //confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    })
  }
  MoneyErrorFun(){
    Swal.fire({
      title: '<strong>Money Details</strong>',
      icon: 'error',
      html:
        `Please Enter Atleast one Money  Detail`,
      //showCloseButton: true,
      //focusConfirm: false,
      showCancelButton: false,

      //confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    })
  }
  PAErrorFun(){
    Swal.fire({
      title: '<strong>Personal Accident  Details</strong>',
      icon: 'error',
      html:
        `Please Enter Atleast one Personal Accident  Detail`,
      //showCloseButton: true,
      //focusConfirm: false,
      showCancelButton: false,

      //confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    })
  }
  finalSaveEE(finalList,type,formType){
    let urlLink = `${this.motorApiUrl}api/slide6/saveelectronicequip`;
    this.sharedService.onPostMethodSync(urlLink, finalList).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){
            if(this.productId!='25' && this.insuranceId=='100004'){
              if(this.commonDetails){
                if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                  if(!this.commonDetails[0].SectionId.some(ele=>ele=='3')) this.commonDetails[0].SectionId.push('3');
                }
                else  this.commonDetails[0]['SectionId']=['3'];
              }
            }
            if(this.productId!='25' && this.insuranceId!='100004'){
              if(this.commonDetails){
                if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                  if(!this.commonDetails[0].SectionId.some(ele=>ele=='76')) this.commonDetails[0].SectionId.push('76');
                }
                else  this.commonDetails[0]['SectionId']=['76'];
              }
            }
            else if(this.productId=='25'){
              if(this.commonDetails){
                if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                  if(!this.commonDetails[0].SectionId.some(ele=>ele=='39')) this.commonDetails[0].SectionId.push('39');
                }
                else  this.commonDetails[0]['SectionId']=['39'];
              }
            }
          
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          }
           this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
        }
    },
    (err) => { },
    );
  }
  // onSaveBuildingDetails(type,formType){
  //   this.subuserType = sessionStorage.getItem('typeValue');
  //   let quoteStatus = sessionStorage.getItem('QuoteStatus');
  //   let appId = "1",loginId="",brokerbranchCode="";
  //   let createdBy="";
  //     if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
  //       brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
  //         createdBy = this.commonDetails[0].CreatedBy;
  //     }
  //     else{
  //       createdBy = this.loginId;
  //       if(this.userType!='Issuer'){
  //         this.brokerCode = this.agencyCode;
  //         appId = "1"; loginId=this.loginId;
  //         brokerbranchCode = this.brokerbranchCode;
  //       }
  //       else{
  //         appId = this.loginId;
  //         loginId = this.commonDetails[0].LoginId;
  //         // loginId = this.updateComponent.brokerLoginId
  //         brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
  //       }
  //     }
  //     if(this.userType!='Broker' && this.userType!='User'){
  //       this.sourceType = this.commonDetails[0].SourceType;
  //       this.bdmCode = this.commonDetails[0].BrokerCode;
  //       this.brokerCode = this.commonDetails[0].BrokerCode;
  //       this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
  //       this.customerCode = this.commonDetails[0].CustomerCode;
  //     }
  //     let insuranceForList = [];
  //     if (this.productItem.InsuranceForId != null) {
  //       insuranceForList = Object.keys(this.productItem.InsuranceForId);
  //     }
  //     let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
  //     if (refNo!=undefined && refNo!="undefined") {
  //       reqRefNo = sessionStorage.getItem('quoteReferenceNo')
  //     }
  //     if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
  //   let ReqObj = {
  //     "CreatedBy": createdBy,
  //     "InsuranceId": this.insuranceId,
  //     "ProductId": this.productId,
  //     "RequestReferenceNo": reqRefNo,
  //     "RiskId": "1",
  //     "SectionId":  "1",
  //     "RoofType": this.productItem.RoofType,
  //     "WallType": this.productItem.WallType,
  //     "BuildingBuildYear": this.productItem.BuildingBuildYear,
  //     "BuildingOwnerYn": this.productItem.BuildingOwnerYn,
  //     "BuildingSumInsured": this.productItem.BuildingSuminsured,
  //     "BuildingUsageId": this.productItem.BuildingUsageId,
  //     "WaterTankSi": this.productItem?.WaterTankSi,
  //     "ArchitectsSi": this.productItem?.ArchitectsSi,
  //     "LossOfRentSi":this.productItem?.LossOfRentSi,
  //     "TypeOfProperty":this.productItem?.TypeOfProperty,
  //     "EndorsementDate": this.endorsementDate,
  //     "EndorsementEffectiveDate": this.endorsementEffectiveDate,
  //     "EndorsementRemarks": this.endorsementRemarks,
  //     "EndorsementType": this.endorsementType,
  //     "EndorsementTypeDesc": this.endorsementTypeDesc,
  //     "EndtCategoryDesc": this.endtCategoryDesc,
  //     "EndtCount": this.endtCount,
  //     "EndtPrevPolicyNo": this.endtPrevPolicyNo,
  //     "EndtPrevQuoteNo": this.endtPrevQuoteNo,
  //     "EndtStatus": this.endtStatus,
  //     "IsFinanceEndt": this.isFinanceEndt,
  //     "OrginalPolicyNo": this.orginalPolicyNo,
  //     "PolicyNo": this.endorsePolicyNo,
  //     "Status": "Y",
  //   }
  //   if (this.endorsementSection) {
  //     if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
  //       ReqObj['Status'] = 'E';
  //     }
  //     else {
  //       ReqObj['Status'] = this.productItem?.Status;
  //     }
  //     ReqObj['PolicyNo'] = this.endorsePolicyNo
  //   }
  //   else {
  //     ReqObj['Status'] = 'Y';
  //   }
  //   let urlLink = `${this.motorApiUrl}api/slide14/savebuilding`;
  //       this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //         (data: any) => {
  //           if (data?.Result) {
  //             if(data.Result.length!=0){
  //               this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
  //               // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
  //               sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
  //               if(type=='proceed'){
  //                 if(this.commonDetails){
  //                   if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
  //                     if(!this.commonDetails[0].SectionId.some(ele=>ele=='1')) this.commonDetails[0].SectionId.push('1');
  //                   }
  //                   else  this.commonDetails[0]['SectionId']=['1'];
  //                 }
  //                 sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
  //               }
  //               this.Products=false;
  //               this.onCheckUWQuestionProceed(data.Result,type,formType);
  //             }
              
  //           }
  //       },
  //       (err) => { },
  //     );
  // }
  onSaveGoodsTransitDetails(type,formType){
    this.subuserType = sessionStorage.getItem('typeValue');
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let appId = "1",loginId="",brokerbranchCode="";
    let createdBy="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
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
          loginId = this.commonDetails[0].LoginId;
          // loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.commonDetails[0].SourceType;
        this.bdmCode = this.commonDetails[0].BrokerCode;
        this.brokerCode = this.commonDetails[0].BrokerCode;
        this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
        this.customerCode = this.commonDetails[0].CustomerCode;
      }
   
      let insuranceForList = [];
      if (this.productItem.InsuranceForId != null) {
        insuranceForList = Object.keys(this.productItem.InsuranceForId);
      }
      let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
      if (refNo!=undefined && refNo!="undefined") {
        reqRefNo = sessionStorage.getItem('quoteReferenceNo')
      }
      if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
      if(this.productItem.SingleRoadSiLc == 0){
        this.productItem.SingleRoadSiLc=0;
      }
      if(this.productItem.EstAnnualCarriesSiLc == 0){
        this.productItem.EstAnnualCarriesSiLc=0;
      }
      let ReqObj = { 
        "TransportedBy" : this.productItem.TransportedBy ,
        "ModeOfTransport" : this.productItem.ModeOfTransport,
        "SingleRoadSiFc" : this.productItem.SingleRoadSiLc,
        "SingleRoadSiLc" : this.productItem.SingleRoadSiLc,
        "GeographicalCoverage" : this.productItem.GeographicalCoverage,
        "EstAnnualCarriesSiFc" : this.productItem.EstAnnualCarriesSiLc,
        "EstAnnualCarriesSiLc" : this.productItem.EstAnnualCarriesSiLc,
          "CreatedBy": createdBy,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId,
          "RequestReferenceNo": reqRefNo,
          "RiskId": "1",
          "SectionId": "46",
          "EndorsementDate": this.endorsementDate,
          "EndorsementEffectiveDate": this.endorseEffectiveDate,
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
          "PolicyNo": this.endorsePolicyNo,
          "Status": "Y"
      }
      if (this.endorsementSection) {
        if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
          ReqObj['Status'] = 'E';
        }
        else {
          ReqObj['Status'] = this.productItem?.Status;
        }
        ReqObj['PolicyNo'] = this.endorsePolicyNo
      }
      else {
        ReqObj['Status'] = 'Y';
      }
      let urlLink = `${this.motorApiUrl}api/slide14/savegoodsintransit`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              if (data?.Result) {
                if(data.Result.length!=0){
                  this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                  //this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  if(type=='proceed'){
                    if(this.commonDetails){
                      if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                        if(!this.commonDetails[0].SectionId.some(ele=>ele=='46')) this.commonDetails[0].SectionId.push('46');
                      }
                      else  this.commonDetails[0]['SectionId']=['46'];
                    }
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
                  }
                  this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
                }
              }
            },
            (err) => { },
          );
    }
  onSaveBusinessInterruption(type,formType){
    this.subuserType = sessionStorage.getItem('typeValue');
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let appId = "1",loginId="",brokerbranchCode="";
    let createdBy="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
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
          loginId = this.commonDetails[0].LoginId;
          // loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.commonDetails[0].SourceType;
        this.bdmCode = this.commonDetails[0].BrokerCode;
        this.brokerCode = this.commonDetails[0].BrokerCode;
        this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
        this.customerCode = this.commonDetails[0].CustomerCode;
      }
      let insuranceForList = [];
      if (this.productItem.InsuranceForId != null) {
        insuranceForList = Object.keys(this.productItem.InsuranceForId);
      }
      let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
      if (refNo!=undefined && refNo!="undefined") {
        reqRefNo = sessionStorage.getItem('quoteReferenceNo')
      }
      if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
      if(this.productItem?.GrossProfitSi==0 && this.productItem?.GrossProfitSi==''){
        this.productItem.GrossProfitSi= 0;
      }
      if(this.productItem?.IndemnityPeriodSi==0 && this.productItem?.IndemnityPeriodSi==''){
        this.productItem.IndemnityPeriodSi= 0;
      }
      let ReqObj = {
        "CreatedBy": createdBy,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "RequestReferenceNo": reqRefNo,
        "RiskId": "1",
        "SectionId": "75",
        "GrossProfitSi" : this.productItem?.GrossProfitSi,
        "IndemnityPeriodSi" : this.productItem?.IndemnityPeriodSi,
        "EndorsementDate": this.endorsementDate,
        "EndorsementEffectiveDate": this.endorseEffectiveDate,
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
        "PolicyNo": this.endorsePolicyNo,
        "Status": "Y"
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide13/savebusinessinterruption`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Result) {
              if(data.Result.length!=0){
                this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                if(type=='proceed'){
                  if(this.commonDetails){
                    if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                      if(!this.commonDetails[0].SectionId.some(ele=>ele=='75')) this.commonDetails[0].SectionId.push('75');
                    }
                    else  this.commonDetails[0]['SectionId']=['75'];
                  }
                  sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
                }
                this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
              }
            }
          },
          (err) => { },
        );
  }
  getBurglaryDetails(sections){
    let RiskId=null;
    let sectionId = null;
    if(this.productId=='19' || this.productId=='24' || this.productId=='1') sectionId='52';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide3/getburglaryandhouse`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let details = data?.Result;
            if(sections){
              let i= sections.RiskId;
              this.productItem.LocationName=data.Result[i-1].LocationName;
              this.productItem.OccupationType=data.Result[i-1].OccupationType;
              this.productItem.Name=data.Result[i-1].CustomerName;
              this.productItem.Dob=data.Result[i-1].Dob;
              this.productItem.SumInsured=data.Result[i-1].SumInsured;
              //this.form.get('SumInsured').setValue(value);
              this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.productItem.LocationName);
              this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.productItem.OccupationType);
              this.fields[0].fieldGroup[0].fieldGroup[1].formControl.setValue(this.productItem.Name);
              this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(this.productItem.Dob);
              this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(this.productItem.SumInsured);
            this.productItem.AccessibleWindows = details?.AccessibleWindows;
                this.productItem.Address = details?.Address;
                this.productItem.BackDoors = details?.BackDoors;
                this.productItem.BuildingOccupied = details?.BuildingOccupied;
                this.productItem.CeilingType = details?.CeilingType;
                this.productItem.BurglarySi  = details?.BurglarySi;
                 if(details?.RegionCode!=null && details?.RegionCode!=''){
                  // this.productItem.RegionCode = details?.RegionCode;
                  // this.productItem.DistrictCode = details?.DistrictCode
                  // this.ongetDistrictList('direct',this.productItem.DistrictCode);
                 
                }
                this.productItem.DoorsMaterialId = details?.DoorsMaterialId;
                this.productItem.WallType = details?.WallType;
                this.productItem.RoofType = details?.RoofType;
                this.productItem.BuildingOwnerYn = details?.BuildingOwnerYn;
                this.productItem.BuildingBuildYear = details?.BuildingBuildYear;
                this.productItem.FrontDoors = details?.FrontDoors;
                this.productItem.InternalWallType = details?.InternalWallType;
                this.productItem.NatureOfTradeId = details?.NatureOfTradeId;
                this.productItem.NightLeftDoor = details?.NightLeftDoor;
                this.productItem.OccupiedYear = details?.OccupiedYear;
                this.productItem.ShowWindow = details?.ShowWindow;
                this.productItem.TrapDoors = details?.TrapDoors;
                this.productItem.WatchmanGuardHours = details?.WatchmanGuardHours;
                this.productItem.WindowsMaterialId = details?.WindowsMaterialId;
                this.productItem.ApplianceSi = details?.ApplianceSi;
                this.productItem.GoodsSi = details?.GoodsSi;
                this.productItem.FurnitureSi = details?.FurnitureSi;
                this.productItem.CashValueablesSi = details?.CashValueablesSi;
                this.productItem.StockInTradeSi = details?.StockInTradeSi;
                if(details?.ApplianceLossPercent!='0' && details?.ApplianceLossPercent != null) this.productItem.ApplianceLossPercent = details?.ApplianceLossPercent;
                if(details?.CashValueablesLossPercent!='0' && details?.CashValueablesLossPercent != null) this.productItem.CashValueablesLossPercent = details?.CashValueablesLossPercent;
                if(details?.FurnitureLossPercent!='0' && details?.FurnitureLossPercent != null) this.productItem.FurnitureLossPercent = details?.FurnitureLossPercent;
                if(details?.GoodsLossPercent!='0' && details?.GoodsLossPercent != null) this.productItem.GoodsLossPercent = details?.GoodsLossPercent;
                if(details?.StockLossPercent!='0' && details?.StockLossPercent != null) this.productItem.StockLossPercent = details?.StockLossPercent;
                if (details?.InsuranceForId != null) {
                  let value = {}, i = 0;
                  for (let element of details?.InsuranceForId) {
                    if (element != '0') {
                      value[element] = true;
                    }
                    i += 1;
                    if (i == details?.InsuranceForId.length)this.productItem.InsuranceForId = value;
                  }
                }
                this.sectionCount +=1;
              if(sections.length==this.sectionCount){
                this.formSection = true; this.viewSection = false;
              }
            }
            else{
              this.TableRowBurglary = details;
              this.formSection = true; this.viewSection = false;} 
        }
      },
      (err) => { },
    );
  }
  getMoneyDetails(sections){
    let sectionId = null;
    let i= sections.RiskId;
    let RiskId=1;
    if(this.productId=='16') RiskId=i;
    else RiskId;
    if(this.productId=='19' || this.productId=='24' || this.productId=='16') sectionId='42';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": RiskId,
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide10/getmoneydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if(this.productId=='16') {
            this.productItem.StrongroomSi=data.Result[i-1].StrongroomSi;
            this.productItem.MoneySafeLimit=data.Result[i-1].MoneySafeLimit;
            this.productItem.MoneyDirectorResidence=data.Result[i-1].MoneyDirectorResidence;
            this.productItem.MoneyCollector=data.Result[i-1].MoneyCollector;
            this.productItem.MoneyAnnualEstimate=data.Result[i-1].MoneyAnnualEstimate;
            this.productItem.MoneyInTransit = data.Result[i-1].MoneyMajorLoss;
            this.productItem.MoneyOutofSafe = data.Result[i-1].MoneyOutofSafe;
            this.productItem.MoneyInSafe= data.Result[i-1].StrongroomSi;
            this.productItem.MoneyMajorLoss=data.Result[i-1].MoneyMajorLoss;
            this.productItem.LocationName=data.Result[i-1].LocationName;
            this.productItem.RegionCode=data.Result[i-1].RegionCode;
            this.productItem.DistrictCode=data.Result[i-1].DistrictCode;
           // this.productItem.FirstLossPayee = data.Result[i-1].FirstLossPayee;
            //this.form.get('SumInsured').setValue(value);
            let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
            for(let field of fieldList){
              if(field.key=='MoneyDirectorResidence')  field.formControl.setValue(this.productItem.MoneyDirectorResidence);
              if(field.key=='MoneyMajorLoss')  field.formControl.setValue(this.productItem.MoneyMajorLoss);
              if(field.key=='StrongroomSi')  field.formControl.setValue(this.productItem.StrongroomSi);
              if(field.key=='MoneySafeLimit')  field.formControl.setValue(this.productItem.MoneySafeLimit);
              if(field.key=='MoneyCollector')  field.formControl.setValue(this.productItem.MoneyCollector);
              if(field.key=='MoneyAnnualEstimate')  field.formControl.setValue(this.productItem.MoneyAnnualEstimate);
              if(field.key=='MoneyInTransit')  field.formControl.setValue(this.productItem.MoneyInTransit);
              if(field.key=='MoneyInSafe')  field.formControl.setValue(this.productItem.MoneyInSafe);
              if(field.key=='LocationName')  field.formControl.setValue(this.productItem.LocationName);
              if(field.key=='RegionCode')  field.formControl.setValue(this.productItem.RegionCode);
              if(field.key=='DistrictCode')  field.formControl.setValue(this.productItem.DistrictCode);
              if(field.key=='MoneyOutofSafe')  field.formControl.setValue(this.productItem.MoneyOutofSafe);
             // if(field.key=='FirstLossPayee')  field.formControl.setValue(this.productItem.FirstLossPayee);
            }
          }
          // this.productItem.CashInHandEmployees = details?.CashInHandEmployees;
          // this.productItem.CashInSafe = details?.CashInSafe;
          // this.productItem.CashInTransit = details?.CashInTransit;
          // this.productItem.MoneyAnnualcarrySuminsured = details?.MoneyAnnualcarrySuminsured;
          // this.productItem.MoneyInPremises = details?.MoneyInPremises;
          // this.productItem.MoneyInSafeBusiness = details?.MoneyInSafeBusiness;
          // this.productItem.MoneyOutSafeBusiness = details?.MoneyOutSafeBusiness;
          // if(details?.EndorsementDate){
          //   this.endorsementDate = details?.EndorsementDate;
          //   this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          //   this.endorsementRemarks = details?.EndorsementRemarks;
          //   this.endorsementType = details?.EndorsementType;
          //   this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          //   this.endtCategoryDesc = details?.EndtCategoryDesc;
          //   this.endtCount = details?.EndtCount;
          //   this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
          //   this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          //   this.endtStatus = details?.EndtStatus;
          //   this.isFinanceEndt = details?.IsFinanceEndt;
          //   this.orginalPolicyNo = details?.OrginalPolicyNo;
          // }
          // if(this.productItem.CashInHandEmployees!=null && this.productItem.CashInHandEmployees!='0' && this.productItem.CashInHandEmployees!='' && this.productItem.CashInHandEmployees!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
          // if(this.productItem.CashInSafe!=null && this.productItem.CashInSafe!='0' && this.productItem.CashInSafe!='' && this.productItem.CashInSafe!='0.0') this.productItem.CashInSafeSIYN = true;
          // if(this.productItem.CashInTransit!=null && this.productItem.CashInTransit!='0' && this.productItem.CashInTransit!='' && this.productItem.CashInTransit!='0.0') this.productItem.CashInTransitSIYN = true;
          // if(this.insuranceId!== '100004' && this.productItem.MoneyAnnualcarrySuminsured!=null && this.productItem.MoneyAnnualcarrySuminsured!='0' && this.productItem.MoneyAnnualcarrySuminsured!='' && this.productItem.MoneyAnnualcarrySuminsured!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
          // if(this.productItem.MoneyInPremises!=null && this.productItem.MoneyInPremises!='0' && this.productItem.MoneyInPremises!='' && this.productItem.MoneyInPremises!='0.0') this.productItem.MoneyInPremisesSIYN = true;
          // if(this.productItem.MoneyInSafeBusiness!=null && this.productItem.MoneyInSafeBusiness!='0' && this.productItem.MoneyInSafeBusiness!='' && this.productItem.MoneyInSafeBusiness!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
          // if(this.productItem.MoneyOutSafeBusiness!=null && this.productItem.MoneyOutSafeBusiness!='0'&& this.productItem.MoneyOutSafeBusiness!='' && this.productItem.MoneyOutSafeBusiness!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
          if(this.productItem.MoneySafeLimit!=null && this.productItem.MoneySafeLimit!='0' && this.productItem.MoneySafeLimit!='' && this.productItem.MoneySafeLimit!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
          //if(this.productItem.MoneyOutofSafe!=null && this.productItem.MoneyOutofSafe!='0' && this.productItem.MoneyOutofSafe!='' && this.productItem.MoneyOutofSafe!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
          if(this.productItem.MoneyDirectorResidence!=null && this.productItem.MoneyDirectorResidence!='0' && this.productItem.MoneyDirectorResidence!='' && this.productItem.MoneyDirectorResidence!='0.0') this.productItem.MoneyInPremisesSIYN = true;
          if(this.productItem.MoneyCollector!=null && this.productItem.MoneyCollector!='0' && this.productItem.MoneyCollector!='' && this.productItem.MoneyCollector!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
          if(this.productItem.MoneyAnnualEstimate!=null && this.productItem.MoneyAnnualEstimate!='0' && this.productItem.MoneyAnnualEstimate!='' && this.productItem.MoneyAnnualEstimate!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
          if(this.productItem.MoneyMajorLoss!=null && this.productItem.MoneyMajorLoss!='0' && this.productItem.MoneyMajorLoss!='' && this.productItem.MoneyMajorLoss!='0.0') this.productItem.CashInTransitSIYN = true;
          this.checkMoneyYNChanges();
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  getMachineryBreakDownDetails(sections){
    let sectionId = null;
    if(this.productId=='19' || this.productId=='24') sectionId='41';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide9/getmachinerybreakdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let details = data?.Result;
         // this.productItem.FirstLossPayee = details?.FirstLossPayee;
          if(details?.EndorsementDate){
            this.endorsementDate = details?.EndorsementDate;
            this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
            this.endorsementRemarks = details?.EndorsementRemarks;
            this.endorsementType = details?.EndorsementType;
            this.endorsementTypeDesc = details?.EndorsementTypeDesc;
            this.endtCategoryDesc = details?.EndtCategoryDesc;
            this.endtCount = details?.EndtCount;
            this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
            this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
            this.endtStatus = details?.EndtStatus;
            this.isFinanceEndt = details?.IsFinanceEndt;
            this.orginalPolicyNo = details?.OrginalPolicyNo;
          }
          if(this.insuranceId!='100004'){
            if(details?.MachinerySi!=null && details?.MachinerySi!=''){
              this.productItem.PowerPlantSi = details?.MachinerySi;
              
            }
            else{
              this.productItem.PowerPlantSi = 0;
            }
            
          }
          else{
            this.productItem.BoilerPlantsSi = details?.BoilerPlantsSi;
            this.productItem.ElecMachinesSi = details?.ElecMachinesSi;
            this.productItem.EquipmentSi = details?.EquipmentSi;
            this.productItem.GeneralMachineSi = details?.GeneralMachineSi;
            this.productItem.MachineEquipSi = details?.MachineEquipSi;
            this.productItem.ManuUnitsSi = details?.ManuUnitsSi;
            this.productItem.PowerPlantSi = details?.PowerPlantSi;
            if(this.productItem.BoilerPlantsSi!=null && this.productItem.BoilerPlantsSi!='0' && this.productItem.BoilerPlantsSi!='' && this.productItem.BoilerPlantsSi!='0.0') this.productItem.BoilerPlantsSIYN = true;
            if(this.productItem.ElecMachinesSi!=null && this.productItem.ElecMachinesSi!='0' && this.productItem.ElecMachinesSi!='' && this.productItem.ElecMachinesSi!='0.0') this.productItem.ElecMachinesSIYN = true;
            if(this.productItem.EquipmentSi!=null && this.productItem.EquipmentSi!='0' && this.productItem.EquipmentSi!='' && this.productItem.EquipmentSi!='0.0') this.productItem.EquipmentSIYN = true;
            if(this.productItem.GeneralMachineSi!=null && this.productItem.GeneralMachineSi!='0' && this.productItem.GeneralMachineSi!='' && this.productItem.GeneralMachineSi!='0.0') this.productItem.GeneralMachineSIYN = true;
            if(this.productItem.MachineEquipSi!=null && this.productItem.MachineEquipSi!='0' && this.productItem.MachineEquipSi!='' && this.productItem.MachineEquipSi!='0.0') this.productItem.MachineEquipSIYN = true;
            if(this.productItem.ManuUnitsSi!=null && this.productItem.ManuUnitsSi!='0' && this.productItem.ManuUnitsSi!='' && this.productItem.ManuUnitsSi!='0.0') this.productItem.ManuUnitsSIYN = true;
            if(this.productItem.PowerPlantSi!=null && this.productItem.PowerPlantSi!='0' && this.productItem.PowerPlantSi!='' && this.productItem.PowerPlantSi!='0.0') this.productItem.PowerPlantSIYN = true;
            this.checkMachineryYNChanges();
          }
          
          this.sectionCount +=1;
          if(sections.length==this.sectionCount){
            this.formSection = true; this.viewSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  getFidelityRiskDetails(sections){
    let sectionId = null;
    if(this.productId=='19' || this.productId=='24') sectionId='43';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide8/getfidelityemp`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let queryData:any[]=[];
          if(data.Result.length!=0) 
          queryData= data.Result;
          if(queryData.length!=0){
            let entrys = queryData[0];
            if(queryData[0].LiabilityOccupationId!='' && queryData[0].TotalNoOfEmployees!=''){
              let i=0;
              for(let s of queryData){
                let entry={
                  "LiabilityOccupationId":s.LiabilityOccupationId,
                  "FidEmpCount":s.FidEmpCount,
                  "FidEmpSi":s.FidEmpSi,
                  "OtherOccupation":s.OtherOccupation,
                }
                this.FidelityListNew.push(entry);
                i+=1;
              }
            }
          }
            else{
              this.FidelityListNew =[];
            }
            this.listSectionFed=true;
            this.listnFed=false;
            this.queryHeader2 = [
              // { key: 'LiabilityOccupationId', display: 'Occupation Id' },
              { key: 'FidEmpCount', display: 'No Of Employyees' },
              { key: 'FidEmpSi', display: 'Sum Insured' },
              { key: 'OtherOccupation', display: 'Occupation' },
              {
                      key: 'actions',
                      display: 'Action',
                      config: {
                        isEdit: true,
                      },
              },
              {
                      key: 'Delete',
                      display: 'Delete',
                      config: {
                        isDelete: true,
                      },
              }
             
              
            ];
            this.onoccFedilityChange('direct'); 
          //this.productItem.fidelityList = data.Result;
          //else this.productItem.fidelityList = [{"LiabilityOccupationId":'',"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
          this.getOccupationList(sections);
        }
      },
      (err) => { },
    );
  }
  getBuildingDetails(sections){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  "1"
    }
    let urlLink = `${this.motorApiUrl}api/slide14/getbuilding`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
              this.productItem.BuildingSuminsured = data?.Result?.BuildingSumInsured;
              this.productItem.BuildingBuildYear = data?.Result?.BuildingBuildYear;
              if(data?.Result?.BuildingOwnerYn) this.productItem.BuildingOwnerYn = data.Result.BuildingOwnerYn;
              if(data?.Result?.BuildingUsageId) this.productItem.BuildingUsageId = data.Result.BuildingUsageId;
              else this.productItem.BuildingUsageId = '';
              if(data?.Result?.WallType) this.productItem.WallType = data.Result.WallType;
              if(data?.Result?.RoofType) this.productItem.RoofType = data.Result.RoofType;
              if(this.insuranceId =='100004'){
                if(data?.Result?.TypeOfProperty) this.productItem.TypeOfProperty = data.Result.TypeOfProperty;
                if(data?.Result?.WaterTankSi) this.productItem.WaterTankSi = data.Result.WaterTankSi;
                if(data?.Result?.ArchitectsSi) this.productItem.ArchitectsSi = data.Result.ArchitectsSi;
                if(data?.Result?.LossOfRentSi) this.productItem.LossOfRentSi = data.Result.LossOfRentSi;
              }
              let entry = data?.Result;
              if(entry.EndorsementDate){
                this.endorsementDate = entry?.EndorsementDate;
                this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                this.endorsementRemarks = entry?.EndorsementRemarks;
                this.endorsementType = entry?.EndorsementType;
                this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                this.endtCategoryDesc = entry?.EndtCategoryDesc;
                this.endtCount = entry?.EndtCount;
                this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                this.endtStatus = entry?.EndtStatus;
                this.isFinanceEndt = entry?.IsFinanceEndt;
                this.orginalPolicyNo = entry?.OrginalPolicyNo;
              }
              this.sectionCount +=1;
              if(sections.length==this.sectionCount){
                this.formSection = true; this.viewSection = false;
              }
              // this.editsections(sections);
              console.log("Products in Building",this.productItem)
        }
      },
      (err) => { },
    );
  }
  onSaveAllRiskDetails(type,formType){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": "3",
       "AllriskSumInsured": this.productItem?.AllriskSumInsured
    }
    let urlLink = `${this.motorApiUrl}api/slide2/saveallriskdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){  
            if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
            if(!this.commonDetails[0].SectionId.some(ele=>ele=='3')) this.commonDetails[0].SectionId.push('3');
          }
          else  this.commonDetails[0]['SectionId']=['3'];
        
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
          this.Products=false;
          this.productItem.AllriskSumInsured=null;
          this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
        }
      },
      (err) => { },
    );
  }
  getAllRiskDetails(sections){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": '3'
    }
    let urlLink = `${this.motorApiUrl}api/slide2/getallriskdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
              this.productItem.AllriskSumInsured = data?.Result?.AllriskSumInsured;
              let entry = data?.Result;
              if(entry.EndorsementDate){
                this.endorsementDate = entry?.EndorsementDate;
                this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                this.endorsementRemarks = entry?.EndorsementRemarks;
                this.endorsementType = entry?.EndorsementType;
                this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                this.endtCategoryDesc = entry?.EndtCategoryDesc;
                this.endtCount = entry?.EndtCount;
                this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                this.endtStatus = entry?.EndtStatus;
                this.isFinanceEndt = entry?.IsFinanceEndt;
                this.orginalPolicyNo = entry?.OrginalPolicyNo;
              }
              this.sectionCount +=1;
              if(sections.length==this.sectionCount){
                this.formSection = true; this.viewSection = false;
              }
              // this.editsections(sections);
              console.log("Products",this.productItem)
        }
        else{
        }
      },
      (err) => { },
    );
  }
  onsavenewFedilityDetails(type,formType){
    if(this.FidelityListNew.length!=0){
      this.employeeError = false;
      let i=0;
      for(let emp of this.FidelityListNew){
          emp['CreatedBy'] = this.loginId;
          emp['InsuranceId'] = this.insuranceId;
          emp['ProductId'] = this.productId;
          emp['RequestReferenceNo'] = this.requestReferenceNo;
          emp['RiskId'] = "1";
          emp['originalRiskId'] = "1";
          emp['EndorsementDate'] = this.endorsementDate;
          emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
          emp['EndorsementRemarks'] = this.endorsementRemarks;
          emp['EndorsementType'] = this.endorsementType;
          emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
          emp['EndtCategoryDesc'] = this.endtCategoryDesc;
          emp['EndtCount'] = this.endtCount;
          emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
          emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
          emp['EndtStatus'] = this.endtStatus;
          emp['IsFinanceEndt'] = this.isFinanceEndt;
          emp['OrginalPolicyNo'] = this.orginalPolicyNo;
          if (this.endorsementSection) {
            if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
              emp['Status'] = 'E';
            }
            else {
              emp['Status'] = this.productItem?.Status;
            }
            emp['PolicyNo'] = this.endorsePolicyNo
          }
          else {
            emp['Status'] = 'Y';
          }
          if(this.productId=='14') emp['SectionId'] = "45";
          else if(this.productId=='32' || this.productId=='19' || this.productId=='24') emp['SectionId'] = "43";
          else if(this.productId=='15') emp['SectionId']='38';
          i+=1;
          if(i==this.FidelityListNew.length){
            let urlLink = `${this.motorApiUrl}api/slide8/savefidelityemp`;
            this.sharedService.onPostMethodSync(urlLink, this.FidelityListNew).subscribe(
              (data: any) => {
                if (data?.Result.length!=0) {
                  this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                  // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  if(type=='proceed'){  
                  if(this.productId=='14'){
                    if(this.commonDetails){
                      if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                        if(!this.commonDetails[0].SectionId.some(ele=>ele=='45')) this.commonDetails[0].SectionId.push('45');
                      }
                      else  this.commonDetails[0]['SectionId']=['45'];
                    }
                  } 
                  if(this.productId=='15'){
                    if(this.commonDetails){
                      if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                        if(!this.commonDetails[0].SectionId.some(ele=>ele=='38')) this.commonDetails[0].SectionId.push('38');
                      }
                      else  this.commonDetails[0]['SectionId']=['38'];
                    }
                  } 
                  else if(this.productId=='32'){
                    if(this.commonDetails){
                      if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                        if(!this.commonDetails[0].SectionId.some(ele=>ele=='43')) this.commonDetails[0].SectionId.push('43');
                      }
                      else  this.commonDetails[0]['SectionId']=['43'];
                    }
                  }
                  sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
                  this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
                }
            },
            (err) => { },
          );
          }
      }
    }
    else{
      this.employeeError = true;
        Swal.fire({
          title: '<strong>Fidelity Details</strong>',
          icon: 'error',
          html:
            `Please Enter Atleast one Fidelity Detail`,
          //showCloseButton: true,
          //focusConfirm: false,
          showCancelButton: false,
  
          //confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
        })
      
    }
  }
  getContentDetails(sections){
    let sectionId = null;
    if(this.productId=='24') sectionId='47';
    else sectionId='47';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide5/getcontent`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
              this.productItem.ContentSuminsured = data?.Result?.ContentSuminsured;
              if(this.insuranceId=='100004'){
                this.productItem.CarpetsSi = data?.Result?.CarpetsSi;
                this.productItem.JewellerySi= data?.Result?.JewellerySi;
                this.productItem.PaitingsSi = data?.Result?.PaitingsSi;
                this.productItem.EquipmentSis= data?.Result?.EquipmentSi;
                
              }
              let entry = data?.Result;
              if(entry.EndorsementDate){
                this.endorsementDate = entry?.EndorsementDate;
                this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                this.endorsementRemarks = entry?.EndorsementRemarks;
                this.endorsementType = entry?.EndorsementType;
                this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                this.endtCategoryDesc = entry?.EndtCategoryDesc;
                this.endtCount = entry?.EndtCount;
                this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                this.endtStatus = entry?.EndtStatus;
                this.isFinanceEndt = entry?.IsFinanceEndt;
                this.orginalPolicyNo = entry?.OrginalPolicyNo;
              }
              this.sectionCount +=1;
              // this.editsections(sections);
              if(sections.length==this.sectionCount){
                this.formSection = true; this.viewSection = false;
              }
              console.log("Products",this.productItem)
        }
      },
      (err) => { },
    );
  }
  addPA(rowData){
    let dob = null
    let valid = this.checkPAValidation();
    if(valid){
    if(rowData.Dob!=null && rowData.Dob!='' && rowData.Dob!=undefined){
      if(String(rowData.Dob).split('/').length==1) dob = this.datePipe.transform(rowData.Dob,'dd/MM/yyyy');
      else dob = rowData.Dob
    }
    let RiskId;
    let i= this.LocationListAlt.length;
    if(this.currentPAIndex==0){
      RiskId=i+1;
    }
    else {
      RiskId =this.currentPAIndex;
    }
    let data =
      {
            "Dob":dob,
            "OccupationId": rowData.OccupationType,
            "CustomerName": rowData.Name,
            "NationalityId": "01",
            "SumInsured": rowData.SumInsured,
            "RiskId": RiskId,
            "LocationName": rowData.LocationName,
            "SectionId": "35"
      }
      if (this.currentPAIndex !=0) {
        rowData.SectionList[this.currentPAIndex-1] = data;
        this.currentPAIndex=0
      } else {
        rowData.SectionList.push(data);
        // If currentBurglaryIndex is out of range, you might want to push the data
    } 
    //this.tableRowPA.push(data);
    this.form.reset();
    this.isEEForm=false;
  }
  }
  onSaveBond(type,formType){
    this.subuserType = sessionStorage.getItem('typeValue');
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo');
    let requestNO=null;
    if(this.requestReferenceNo !=undefined && this.requestReferenceNo!=null){
      requestNO = this.requestReferenceNo;
    }
    else{
      requestNO = null;
    }
    let appId = "1",loginId="",brokerbranchCode="";
    let createdBy="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; 
          //loginId=this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else{
          appId = this.loginId;
          //loginId = this.commonDetails[0].LoginId;
          // loginId = this.updateComponent.brokerLoginId
          //brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      let ReqObj ={
        "RequestReferenceNo":this.requestReferenceNo,
        "ProductId":this.productId,
        "InsuranceId":this.insuranceId,
        "CreatedBy":this.loginId,
        "BondDetails":[
           {
        "RiskId":1,
        "BondType":this.productItem.TypeOfBond,
        "BondYear":this.productItem.NoOfYears,
        "BondSuminsured":this.productItem.BondSI
            }
        ]
        }
      let urlLink = `${this.motorApiUrl}api/slide20/saveBond`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            if (data?.Result.length!=0) {
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
              if(type=='proceed'){
                // if(this.commonDetails){
                //   if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                //     if(!this.commonDetails[0].SectionId.some(ele=>ele=='35')) this.commonDetails[0].SectionId.push('35');
                //   }
                //   else  this.commonDetails[0]['SectionId']=['35'];
                // }
                sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
              }
              this.Products=false;
               this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
            }
          }
        },
        (err) => { },
      );
    }
    
      
    saveBondError(){
      this.BondError = true;
        Swal.fire({
          title: '<strong>Bond Details</strong>',
          icon: 'error',
          html:
            `Please Enter Atleast one Bond Detail`,
          //showCloseButton: true,
          //focusConfirm: false,
          showCancelButton: false,
  
          //confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
        })
    }
    
  

  onSavePersonalAccident(type,formType){
    this.subuserType = sessionStorage.getItem('typeValue');
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo');
let requestNO=null;
    if(this.requestReferenceNo !=undefined && this.requestReferenceNo!=null){
      requestNO = this.requestReferenceNo;
    }
    else{
      requestNO = null;
    }
    let appId = "1",loginId="",brokerbranchCode="";
    let createdBy="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; 
          //loginId=this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else{
          appId = this.loginId;
          //loginId = this.commonDetails[0].LoginId;
          // loginId = this.updateComponent.brokerLoginId
          //brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      // let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      let startDate,endDate;
      if(this.policyStartDate){
        if(String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
        else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
        if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
        else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
      }
      let promocode = null,havePromoCode:any='N';
    if(this.promocode!=null && this.promocode!=undefined && this.promocode!='') havePromoCode = "Y";
    let ReqList
    let i = 0;
    let ReqObj=[]
    for(let items of this.tableRowPA){
      ReqList = 
        {
            "Dob": items.Dob,
            "OccupationId": items.OccupationId,
            "PersonName":  items.CustomerName,
            "NationalityId": "01",
            "Salary": items.SumInsured,
            "RiskId":  items.RiskId,
            "LocationName":  "Chennai",
            "SectionId": "35"
        }
          
        
         
        ReqObj.push(ReqList);
        i+=1;
       
      }
      let  entry = {
        "PersonalAccidentRequest":ReqObj,
        "CreatedBy": this.loginId,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "RequestReferenceNo": "",
        "CategoryId": this.IndustryId,
        "OrginalPolicyNo": null,
        "ExchangeRate": this.exchangeRate,
        "PolicyEndDate": endDate,
        "PolicyStartDate": startDate,
        "AgencyCode": this.agencyCode,
        "SubUsertype": this.subuserType,
        "BdmCode": this.customerCode,
        "BranchCode": this.branchCode,
        "Currency": this.currencyCode,
        "BrokerCode": null,
        "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
        "BrokerBranchCode":'1',
        "Havepromocode": havePromoCode,
        "BuildingOwnerYn": this.BuildingOwnerYn,
        "CustomerName": this.customerName,
      }
      if(i==this.tableRowPA.length){this.finalSavePA(entry,type,formType)}
    
    }
    
    finalSavePA(ReqObj,type,formType){
    let urlLink = `${this.motorApiUrl}nonmotor/onetime/insert`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          if (data?.Result.length!=0) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            }
            this.Products=false;
             this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
          }
        }
      },
      (err) => { },
    );
      
  }
  onSavePersonalAccidentDetails(type,formType){
    this.subuserType = sessionStorage.getItem('typeValue');
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo');
let requestNO=null;
    if(this.requestReferenceNo !=undefined && this.requestReferenceNo!=null){
      requestNO = this.requestReferenceNo;
    }
    else{
      requestNO = null;
    }
    let appId = "1",loginId="",brokerbranchCode="";
    let createdBy="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; 
          //loginId=this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else{
          appId = this.loginId;
        }
      }
        let emp = [ {
          "InsuranceId": this.insuranceId,
        "CreatedBy": createdBy,
        "ProductId": this.productId,
        "RequestReferenceNo": requestNO,
        "RiskId": "1",
        "SectionId": "35",
        "OccupationType": this.productItem.OccupationType,
        "SumInsured": this.productItem.PersonalAccidentSuminsured,
        "OtherOccupation":this.productItem.otheroptionPer,
        "TotalNoOfPersons": "1",
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
        
      } ]
      if (this.endorsementSection) {
        if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
          emp[0]['Status'] = 'E';
        }
        else {
          emp[0]['Status'] = this.productItem?.Status;
        }
        emp[0]['PolicyNo'] = this.endorsePolicyNo
      }
      else {
        emp[0]['Status'] = 'Y';
      }
      let urlLink = `${this.motorApiUrl}api/slide13/savepersonlaccident`;
      this.sharedService.onPostMethodSync(urlLink, emp).subscribe(
        (data: any) => {
          if (data?.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){
              // if(this.commonDetails){
              //   if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
              //     if(!this.commonDetails[0].SectionId.some(ele=>ele=='35')) this.commonDetails[0].SectionId.push('35');
              //   }
              //   else  this.commonDetails[0]['SectionId']=['35'];
              // }
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            }
            this.Products=false;
             this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
          }
      },
      (err) => { },
    );
  
  }
  onSavePublicLiability(type,formType){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": "54",
      "LiabilitySi": this.productItem?.LegalLiabilityAnnualAggreagte,
      "ProductTurnoverSi": this.productItem?.ProductTurnover,
      "InsurancePeriodSi":this.productItem.InsurancePeriodSi,
      "AnyAccidentSi": this.productItem.AnyAccidentSi,
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
      "PolicyNo": this.endorsePolicyNo,
     // "FirstLossPayee":this.productItem?.FirstLossPayee,
     
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide12/savepublicliability`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          if (data?.Result.length!=0) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){ 
              if(this.commonDetails){
                if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                  if(!this.commonDetails[0].SectionId.some(ele=>ele=='54')) this.commonDetails[0].SectionId.push('54');
                }
                else  this.commonDetails[0]['SectionId']=['54'];
              }
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
            this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
          }
        }
      },
      (err) => { },
    );
      
  }
  onSavePersonalLiability(type,formType){
    let emp = {};
    emp['CreatedBy'] = this.loginId;
    emp['InsuranceId'] = this.insuranceId;
    emp['ProductId'] = this.productId;
    emp['RequestReferenceNo'] = this.requestReferenceNo;
    emp['RiskId'] = "1";
    emp['EndorsementDate'] = this.endorsementDate;
    emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
    emp['EndorsementRemarks'] = this.endorsementRemarks;
    emp['EndorsementType'] = this.endorsementType;
    emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
    emp['EndtCategoryDesc'] = this.endtCategoryDesc;
    emp['EndtCount'] = this.endtCount;
    emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
    emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
    emp['EndtStatus'] = this.endtStatus;
    emp['IsFinanceEndt'] = this.isFinanceEndt;
    emp['TotalNoOfEmployees'] = '1';
    emp['OrginalPolicyNo'] = this.orginalPolicyNo;
    emp['LiabilityOccupationId'] = this.productItem.LiabilityOccupationId;
    emp['EmpLiabilitySi'] = this.productItem.EmpLiabilitySi;
    emp['SectionId'] = "36";
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        emp['Status'] = 'E';
      }
      else {
        emp['Status'] = this.productItem?.Status;
      }
      emp['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      emp['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide7/saveempliablity`;
    this.sharedService.onPostMethodSync(urlLink, [emp]).subscribe(
        (data: any) => {
          if (data?.Result.length!=0) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            // this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){ 
              if(this.commonDetails){
                if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                  if(!this.commonDetails[0].SectionId.some(ele=>ele=='36')) this.commonDetails[0].SectionId.push('36');
                }
                else  this.commonDetails[0]['SectionId']=['36'];
              }
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
            this.Products = false;
            this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
          }
      },
      (err) => { },
    );
  } 
  getEmployeeRiskDetails(sections){
    let sectionId = null;
    if(this.productId=='19' || this.productId=='24') sectionId='45';
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  sectionId
    }
    let urlLink = `${this.motorApiUrl}api/slide7/getempliablity`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if(data.Result.length!=0)
          this.queryData = data.Result;
        if(this.queryData.length!=0){
          let entrys = this.queryData[0];
          if(this.queryData[0].LiabilityOccupationId!='' && this.queryData[0].TotalNoOfEmployees!=''){
            let i=0;
            for(let s of this.queryData){
              let entry={
                "LiabilityOccupationId":s.LiabilityOccupationId,
                "TotalNoOfEmployees":s.TotalNoOfEmployees,
                "EmpLiabilitySi":s.EmpLiabilitySi,
                "OtherOccupation":s.OtherOccupation,
              }
              this.EmployeeListNew.push(entry);
              i+=1;
            }
          }
        }
          else{
           // this.EmployeeListNew =[];
          }
          this.listSection=true;
          this.listn=false;
          
          this.onoccChange('direct'); 
          // this.onoccChange('direct') ; 
          //this.productItem.employeeList = data.Result;
          //else this.productItem.employeeList = [{"LiabilityOccupationId":'',"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
          this.getOccupationList(sections);
        
        }
      },
      (err) => { },
    );
  }
  onSaveContentRiskDetails(type,formType){
    let sectionId = null;
    if(this.productId=='24') sectionId='47';
    else sectionId='47';
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": sectionId,
       "ContentSuminsured": this.productItem?.ContentSuminsured,
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
      "PolicyNo": this.endorsePolicyNo,
      "JewellerySi": this.productItem?.JewellerySi,
      "PaitingsSi": this.productItem?.PaitingsSi,
      "CarpetsSi": this.productItem?.CarpetsSi,
      "EquipmentSi":  this.productItem?.EquipmentSis,
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide5/savecontent`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          //this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){ 
            if(this.commonDetails){
              if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                if(this.productId=='24'){
                  if(!this.commonDetails[0].SectionId.some(ele=>ele=='47')) this.commonDetails[0].SectionId.push('47');  
                }
                else if(!this.commonDetails[0].SectionId.some(ele=>ele=='47')) this.commonDetails[0].SectionId.push('47');
              }
              else{
                if(this.productId=='24')  this.commonDetails[0]['SectionId']=['47'];
                else  this.commonDetails[0]['SectionId']=['47'];
              }
            }
            this.Products = false;
          
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
          this.Products=false;
          this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
        }
    },
    (err) => { },
  );
  }
  getPersonalAccidentDetails(sections){
    let i= sections.RiskId;
    let RiskId=null;
    if(this.productId=='13') RiskId=i;
    else RiskId;
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": RiskId,
      "SectionId":  "35"
    }
    let urlLink = `${this.motorApiUrl}api/slide13/getpersonlaaccident`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if(data.Result.length!=0){
            this.productItem.LocationName=data.Result[i-1].LocationName;
            this.productItem.OccupationType=data.Result[i-1].OccupationType;
            this.productItem.Name=data.Result[i-1].CustomerName;
            this.productItem.Dob=data.Result[i-1].Dob;
            this.productItem.SumInsured=data.Result[i-1].SumInsured;
            //this.form.get('SumInsured').setValue(value);
           // this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.productItem.LocationName);
            this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.productItem.OccupationType);
            this.fields[0].fieldGroup[0].fieldGroup[1].formControl.setValue(this.productItem.Name);
            this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(this.productItem.Dob);
            this.fields[0].fieldGroup[0].fieldGroup[3].formControl.setValue(this.productItem.SumInsured);
            this.productItem.PersonalAccidentSuminsured = data.Result[0].SumInsured;
            if(data.Result[0].OccupationType!=null)this.productItem.OccupationType = data.Result[0].OccupationType;
            else this.productItem.OccupationType = null;
            this.productItem.otheroptionPer=data.Result[0].OtherOccupation;
            //this.onoccChangepersonal('Direct');
            let entry = data?.Result[0];
              if(entry.EndorsementDate){
                this.endorsementDate = entry?.EndorsementDate;
                this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                this.endorsementRemarks = entry?.EndorsementRemarks;
                this.endorsementType = entry?.EndorsementType;
                this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                this.endtCategoryDesc = entry?.EndtCategoryDesc;
                this.endtCount = entry?.EndtCount;
                this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                this.endtStatus = entry?.EndtStatus;
                this.isFinanceEndt = entry?.IsFinanceEndt;
                this.orginalPolicyNo = entry?.OrginalPolicyNo;
              }
              console.log("Products",this.productItem)
          }
          else{this.productItem.OccupationType = null; this.productItem.PersonalAccidentSuminsured='0'}
          //this.editsections(sections);
          //this.onoccChangepersonal('Direct');
          this.getOccupationList(sections);
         
        }
           
      },
      (err) => { },
    );
  }

  onSaveBussinessrisk(type,formType){

    let productsi:any;
     if(this.productItem.EquipmentSi == '' || this.productItem.EquipmentSi ==null){
       productsi='0'
     }
     else{
       productsi=this.productItem.EquipmentSi;
     }
     let sectionId=null;
     if(this.productId=='26') sectionId='3';
     else sectionId = '69';
     let refNo = null;
     if(sessionStorage.getItem('quoteReferenceNo')) refNo = sessionStorage.getItem('quoteReferenceNo');
     let ReqObj={
       "CreatedBy": this.loginId,
       "InsuranceId": this.insuranceId,
       "ProductId": this.productId,
       "RequestReferenceNo": refNo,
       "RiskId": "1",
       "SectionId":  sectionId,
       "AllriskSumInsured": productsi
     }
     if(this.productId=='26') ReqObj['EquipmentSi'] = productsi
     if (this.endorsementSection) {
       if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
         ReqObj['Status'] = 'E';
       }
       else {
         ReqObj['Status'] = this.productItem?.Status;
       }
       ReqObj['PolicyNo'] = this.endorsePolicyNo
     }
     else {
       ReqObj['Status'] = 'Y';
     }
     let urlLink = `${this.motorApiUrl}api/slide2/saveallriskdetails`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         if (data?.Result) {
           this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          //  this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
           sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
           if(type=='proceed'){
           if(this.commonDetails){
             if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
               if(!this.commonDetails[0].SectionId.some(ele=>ele==sectionId)) this.commonDetails[0].SectionId.push(sectionId);
             }
             else  this.commonDetails[0]['SectionId']=[sectionId];
           }
         
           }
           this.Products=false;
           sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
         }
     },
     (err) => { },
   );
   }
  getOccupationList(sections) {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": "99999",
      "ProductId": this.productId
    }
    if(this.productId=='14')  ReqObj['TitleType'] = 'I';
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data,"getOccupationListgetOccupationList");
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.occupationList = data.Result;
         
          if (this.occupationList.length != 0) {
           
            for (let i = 0; i < this.occupationList.length; i++) {
              this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
              this.occupationList[i].value = this.occupationList[i]['Code'];
              if (i == this.occupationList.length - 1) {
                console.log("Fields",this.fields)
                if(this.productId=='13'){
                  if(this.fields[0].props.label=='Personal Liability' || this.fields[0].props.label=='Personal Accident'){
                    let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                  this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = defaultObj.concat(this.occupationList);
                  }
                }
                else if(this.productId=='19' || this.productId=='59' || this.productId=='24'  || this.productId=='60'){
                  console.log('this.fields',this.fields[0].props.label)
                      let fields = this.fields;
                      for(let field of fields){
                        if(this.fields[0].props.label=='Personal Liability' || this.fields[0].props.label=='Personal Accident'){
                          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                         
                          this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.occupationList);
                          // field.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                          this.sectionCount +=1;
                          if(sections.length==this.sectionCount){
                            this.formSection = true; this.viewSection = false;
                          }
                        }

                        if(this.fields[0].props.label=='Professional Indemnity'){
                          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                          this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options= defaultObj.concat(this.occupationList);
                          // field.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                          this.sectionCount +=1;
                          // if(sections.length==this.sectionCount){
                          //   this.formSection = true; this.viewSection = false;
                          // }
                        }
                            // if(field.props.label=='Employers Liability' || field.props.label=='Fidelity'){
                            //   let defaultObj = [{ 'label': '-Select-', 'value': null }]
                            //   console.log('Checking',field);
                            //   field.fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                            //   // field.fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                            //   this.sectionCount +=1;
                            //   if(sections.length==this.sectionCount){
                            //     this.formSection = true; this.viewSection = false;
                            //   }
                            // }
                            // else if(field.props.label=='Personal Liability' || field.props.label=='Personal Accident'){
                            //   let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                            //   field.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                            //   this.sectionCount +=1;
                            //   if(sections.length==this.sectionCount){
                            //     this.formSection = true; this.viewSection = false;
                            //   }
                            // }
                      }
                      console.log("Fields in Occupation",this.productItem,this.fields)
                }
                else if(this.productId=='13'){
                  this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = defaultObj.concat(this.occupationList);
                }
                
                //if (this.productId != '19' && this.productId!='24' && this.productId != '59' && this.productId!='6' && this.productId != '1' && this.productId != '32' && this.productId!='14' && this.productId!='16' && this.productId!='25' && this.productId!='26' && this.productId!='21' && this.productId!='27' && this.productId!='13' && this.productId!='57') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.occupationList);
                if(this.productId=='14' || this.productId=='15'){
                  //let fireData = new EmployersLiability();
                  let fireData = new EmployersLiabilitytwo();
                  let entry = [];
                  let fields:any = fireData?.fields;
                  fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  //fields[0].fieldGroup[0].fieldGroup[0] = defaultObj.concat(this.occupationList);
                  //fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  let modelHooks = { onInit: (field: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(() => {
                      this.onoccChange('change');
                    });
                  } }
                  fields[0].fieldGroup[0].fieldGroup[1].hooks = modelHooks;
                 
                  this.fieldsEmployee = fields;
                  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                  if (referenceNo) {
                    this.requestReferenceNo = referenceNo;
                    if(this.productId!='4') this.getExistingBuildingList();
                    this.setCommonFormValues(null);
                    this.productItem = new ProductData();
                   
                  }
                  else {
                      this.productItem = new ProductData();
                      this.formSection = true; this.viewSection = false;
                  }
                }
                if(this.productId=='57'){
                  let fireData = new GroupPersonalAccident();
                  let entry = [];
                  let fields:any = fireData?.fields;
                  console.log('Fieldssssssssss',fields);
                  fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  //fields[0].fieldGroup[0].fieldGroup[0] = defaultObj.concat(this.occupationList);
                  //fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  let modelHooks = { onInit: (field: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(() => {
                      // this.onoccChanges('change');
                    });
                  } }
                  fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
                 
                  this.fieldsEmployee = fields;
                  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                  if (referenceNo) {
                    this.requestReferenceNo = referenceNo;
                    this.setCommonFormValues(null);
                    this.productItem = new ProductData();
                    this.formSection = true; this.viewSection = false;
                  }
                  else {
                      this.productItem = new ProductData();
                      this.formSection = true; this.viewSection = false;
                  }
                }
                // if(this.productId=='14' && this.insuranceId == '100004'){
                //   let fireData = new EmployersLiabilitys();
                //   let entry = [];
                //   let fields:any = fireData?.fields;
                //   fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                //   this.fields = fields;
                //   let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                //   if (referenceNo) {
                //     this.requestReferenceNo = referenceNo;
                //     this.updateComponent.referenceNo = referenceNo;
                //     this.setCommonFormValues(null);
                //     this.productItem = new ProductData();
                   
                //   }
                //   else {
                //       this.productItem = new ProductData();
                //       this.formSection = true; this.viewSection = false;
                //   }
                // }
                if(this.productId=='32'){
                  let fireData = new Fidelitytwo();
                  let entry = [];
                  let fields:any = fireData?.fields;
                 this.getFidSumInsuredList();
                 // fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  //fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  let modelHooks = { onInit: (field: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(() => {
                      this.onoccFedilityChange('change');
                    });
                  } }
                  fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
                  this.fieldsFidelity = fields;
                  console.log('JHGF',this.fieldsFidelity)
                  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                  if (referenceNo) {
                    this.requestReferenceNo = referenceNo;
                    this.productItem = new ProductData();
                    this.formSection = true; this.viewSection = false;
                    //this.setCommonFormValues(null);
                   
                  }
                  else {
                      this.productItem = new ProductData();
                      this.formSection = true; this.viewSection = false;
                  }
                }
               
                else if (this.productId == '6') this.setCommonFormValues(null);
                if (this.productId != '59' && this.productId != '59' && this.productId!='13' && this.productId != '6' && this.productId != '19' && this.productId!='24' && this.productId!='14' && this.productId!='15' && this.productId!='32' && this.productId!='57' && this.productId!='60') {
  
                  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                  if (referenceNo) {
                    this.requestReferenceNo = referenceNo;
                    if (this.productId != '19' && this.productId!='24' && this.productId!='46' && this.productId!='4' && this.productId!='63' && this.productId!='61') this.setFormValues();
                    else if(this.productId!='63') this.setSMEFormValues('edit')
                      this.formSection = true; this.viewSection = false;
                  }
                  else {
                    this.productItem.BuildingBuildYear = '';
                    this.productItem.OccupationType = '';
                      if(this.productItem.PersonalAccidentSuminsured== '' || this.productItem.PersonalAccidentSuminsured==null){
                        this.productItem.PersonalAccidentSuminsured='0';
                      }
                    this.formSection = true; this.viewSection = false;
                  }
                }
  
                // if(this.customerReferenceNo){
                // 	this.setValues();
                // }
                //this.getBusinessTypeList();
  
              }
            }
          }
          else {
            if(this.productId!='14' && this.productId!='15' && this.productId!='59' && this.productId!='59'){
              let referenceNo = sessionStorage.getItem('quoteReferenceNo');
              if (referenceNo) {
                this.requestReferenceNo = referenceNo;
                if(this.productId=='59' ) this.checkDomesticForm('direct');
                else if (this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId == '1') this.setCommonFormValues(null);
                else if(this.productId!='24' && this.productId!='46' && this.productId!='4' && this.productId!='61' && this.productId!='63') this.setFormValues();
              }
              else if (this.productId != '19' && this.productId != '59' && this.productId!='24' && this.productId != '59') {
                this.productItem = new ProductData();
                this.productItem.BuildingBuildYear = '';
                this.formSection = true; this.viewSection = false;
              }
            }
            
          }
        }
      },
      (err) => { },
    );
  }
  checkDomesticForm(type) {
    
    let sectionList = [];
    if (this.coversRequired != null) {
      if (type != 'change') {
        let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        if (referenceNo) {
          this.requestReferenceNo = referenceNo;
          //this.setSMEFormValues(type)
          //if (this.productId=='59') this.setSMEFormValues('edit');
          if (this.productId == '19' || this.productId=='59' || this.productId=='24') this.setSMEForm('create', type);
        }
        else {
          this.productItem.BuildingBuildYear = '';
          this.productItem.BuildingOwnerYn = 'Y';
        
           if (this.productId=='59') this.setDomesticForm('create', type);
           if (this.productId == '19' || this.productId=='59' || this.productId=='24') this.setSMEForm('create', type);
        }
      }
      else {
        this.productItem.BuildingBuildYear = '';
        this.productItem.OccupationType = null;
          if(this.productItem.PersonalAccidentSuminsured== '' || this.productItem.PersonalAccidentSuminsured==null){
            this.productItem.PersonalAccidentSuminsured='0';
          }
        if (this.coversRequired == 'C') this.productItem.BuildingSuminsured = null;
        else if (this.coversRequired == 'B') this.productItem.ContentSuminsured = null;
        // if (this.productId=='59') this.setDomesticForm('change', type);
        else if (this.productId == '19' || this.productId=='59' || this.productId=='24') this.setSMEForm('edit', type);
      }


    }
  }
  setDomesticForm(type, mode){
  
    if(this.insuranceId!='100004'){
    this.fields = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'All Risk' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'col-6',
                    type: 'commaSeparator',
                    key: 'AllriskSumInsured',
  
                    props: {
                      maxLength:15,
                      label: `Sum Insured (${this.commonDetails[0].Currency})`,
                      disabled: this.checkDisable('AllriskSumInsured'),
                      required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                ]
              }
            ]
          },
          {
            props: { label: 'Personal Accident' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'col-6',
                    type: 'select',
                    key: 'OccupationType',
                    props: {
                      label: 'Occupation',
                      required: true,
                      disabled: this.checkDisable('OccupationType'),
                      options: [
                      ],
                    },
                    expressions: {
  
                    },
                  },
                  {
                    className: 'col-6',
                    type: 'commaSeparator',
                    key: 'PersonalAccidentSuminsured',
                    props: {
                      maxLength:15,
                      label: `Sum Insured (${this.commonDetails[0].Currency})`,
                      disabled: this.checkDisable('PersonalAccidentSuminsured'),
                      required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                ]
              }
            ]
          },
          {
            props: { label: 'Personal Liability' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'col-6',
                    type: 'select',
                    key: 'LiabilityOccupationId',
                    props: {
                      label: 'Occupation',
                      required: true,
                      disabled: this.checkDisable('OccupationType'),
                      options: [
                      ],
                    },
                    expressions: {
  
                    },
                  },
                  {
                    className: 'col-6',
                    type: 'commaSeparator',
                    key: 'PersonalIntermediarySuminsured',
  
                    props: {
                      maxLength:15,
                      label: `Sum Insured (${this.commonDetails[0].Currency})`,
                      disabled: this.checkDisable('PersonalIntermediarySuminsured'),
                      required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                ]
              }
            ]
          },
        ]
      }
    ];
    }
  
    if(this.insuranceId == '100004'){
      this.fields = [
        {
          type: 'stepper',
          fieldGroup: [
            {
              props: { label: 'All Risk - Excluding Cash , Jewellery' },
              fieldGroup: [
                {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      className: 'col-6',
                      type: 'commaSeparator',
                      key: 'AllriskSumInsured',
  
                      props: {
                        maxLength:15,
                        label: `Sum Insured (${this.commonDetails[0].Currency})`,
                        disabled: this.checkDisable('AllriskSumInsured'),
                        required: true,
                        options: [
  
                        ],
  
                      },
                      validators: {
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                  ]
                }
              ]
            },
          
          
          ]
        }
      ];
    }
  console.log('INSURANCE IDDDDDDD',this.insuranceId);
    if (this.coversRequired == 'C' && this.insuranceId!=='100004') {
      let entry = [
        {
          props: { label: 'House Hold Content Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'ContentSuminsured',
  
                  props: {
                    maxLength:15,
                    label: `HouseHold Content Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('ContentSuminsured'),
                    required: false,
                    options: [
  
                    ],
  
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        }
      ]
      this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
      this.productItem.BuildingUsageId = '';
      this.productItem.BuildingBuildYear = null;
      this.productItem.WallType = '';
      this.productItem.RoofType = '';
      this.productItem.BuildingSuminsured = 0;
    }
  
    if (this.coversRequired == 'C' && this.insuranceId==='100004') {
      let entry = [
        {
          props: { label: 'Contents' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'ContentSuminsured',
  
                  props: {
                    maxLength:15,
                    label: `Contents(${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('ContentSuminsured'),
                    required: true,
                    options: [
  
                    ],
  
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        }
      ]
      this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
      this.productItem.BuildingUsageId = '';
      this.productItem.BuildingBuildYear = null;
      this.productItem.WallType = '';
      this.productItem.RoofType = '';
      this.productItem.BuildingSuminsured = 0;
    }
    if (this.coversRequired == 'BC' && this.insuranceId!=='100004') {
      let entry = [
        {
          props: { label: 'Building Risk' },
  
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                // {
                //   className: 'col-6',
                //   key: 'BuildingOwnerYn',
                //   type: 'radio',
                //   templateOptions: {
                //     type: 'radio',
                //     label: 'Do You Rent Or Own Home ?',
                //     required: true,
                //     disabled: this.checkDisable('BuildingOwnerYn'),
                //     name: 'BuildingOwnerYn',
                //     options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
                //   }
                // },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'BuildingUsageId',
                  props: {
                    label: 'Building Usage',
                    //hideExpression: "model.BuildingOwnerYn =='N'",
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'BuildingBuildYear',
                  props: {
                    label: 'Built Year',
                    placeholder: "YYYY",
                    required: false,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('BuildingBuildYear'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'WallType',
                  props: {
                    label: 'Used Contruction Materials (Wall)',
                    disabled: this.checkDisable('WallType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'RoofType',
                  props: {
                    label: 'Used Contruction Materials (Roof)',
                    disabled: this.checkDisable('RoofType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                // {
                //   className: 'col-6',
                //   key: 'OutbuildConstructType',
                //   type: 'radio',
                //   templateOptions: {
                //     type: 'radio',
                //     label: 'How Are The Outbuildings (if any) Constructed?',
                //     required: true,
                //     disabled: this.checkDisable('OutbuildConstructType'),
                //     name: 'OutbuildConstructType',
                //     options: [{ value: 'W', label: 'Wall' }, { value: 'R', label: 'Roof' }]
                //   }
                // },
  
                // {
                //   className: 'col-6',
                //   type: 'number',
                //   key: 'BuildingFloors',
                //   props: {
                //   label: 'What Is its Height In Storeys?',
                //   disabled: this.checkDisable('BuildingFloors'),
                //   required: false,
                //   options: [
  
                //   ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   expressions: {
                //     hide: "model.InbuildConstructType != 'W'",
                //   },
                // },
  
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    maxLength:15,
                    label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                }
  
              ]
            }
          ]
        },
        {
          props: { label: 'House Hold Content Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'ContentSuminsured',
  
                  props: {
                    maxLength:15,
                    label: `HouseHold Content Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('ContentSuminsured'),
                    required: false,
                    options: [
  
                    ],
  
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        }
      ]
      this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
    }
    if (this.coversRequired == 'BC' && this.insuranceId==='100004') {
      let entry = [
        {
          props: { label: 'Building Risk' },
  
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
      
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'BuildingUsageId',
                  props: {
                    label: 'Building Usage',
                    
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'BuildingBuildYear',
                  props: {
                    label: 'Built Year',
                    placeholder: "YYYY",
                    required: false,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('BuildingBuildYear'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'WallType',
                  props: {
                    label: 'Used Contruction Materials (Wall)',
                    disabled: this.checkDisable('WallType'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'RoofType',
                  props: {
                    label: 'Used Contruction Materials (Roof)',
                    disabled: this.checkDisable('RoofType'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
  
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    maxLength:15,
                    label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'TypeOfProperty',
                  props: {
                    label: 'Type Of Property',
                    
                    disabled: this.checkDisable('TypeOfProperty'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'WaterTankSi',
                  templateOptions: {
                    maxLength:15,
                    label: `WaterTank SumInsured`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                }
  
              ]
            }
          ]
        },
        {
          props: { label: 'Content' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'ContentSuminsured',
  
                  props: {
                    maxLength:15,
                    label: `Content Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('ContentSuminsured'),
                    required: false,
                    options: [
  
                    ],
  
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        }
      ]
      this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
    }
    if (this.coversRequired == 'B' && this.insuranceId!='100004') {
      this.productItem.ContentSuminsured = '0';
      let entry = [
        {
          props: { label: 'Building Risk' },
  
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                // {
                //   className: 'col-6',
                //   key: 'BuildingOwnerYn',
                //   type: 'radio',
                //   templateOptions: {
                //     type: 'radio',
                //     label: 'Do You Rent Or Own Home ?',
                //     required: true,
                //     disabled: this.checkDisable('BuildingOwnerYn'),
                //     name: 'BuildingOwnerYn',
                //     options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
                //   }
                // },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'BuildingUsageId',
                  props: {
                    label: 'Building Usage',
                    //hideExpression: "model.BuildingOwnerYn =='N'",
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'BuildingBuildYear',
                  props: {
                    label: 'Built Year',
                    placeholder: "YYYY",
                    required: false,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('BuildingBuildYear'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'WallType',
                  props: {
                    label: 'Used Contruction Materials (Wall)',
                    disabled: this.checkDisable('WallType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'RoofType',
                  props: {
                    label: 'Used Contruction Materials (Roof)',
                    disabled: this.checkDisable('RoofType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                // {
                //   className: 'col-6',
                //   key: 'OutbuildConstructType',
                //   type: 'radio',
                //   templateOptions: {
                //     type: 'radio',
                //     label: 'How Are The Outbuildings (if any) Constructed?',
                //     required: true,
                //     disabled: this.checkDisable('OutbuildConstructType'),
                //     name: 'OutbuildConstructType',
                //     options: [{ value: 'W', label: 'Wall' }, { value: 'R', label: 'Roof' }]
                //   }
                // },
  
                // {
                //   className: 'col-6',
                //   type: 'number',
                //   key: 'BuildingFloors',
                //   props: {
                //   label: 'What Is its Height In Storeys?',
                //   disabled: this.checkDisable('BuildingFloors'),
                //   required: false,
                //   options: [
  
                //   ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   expressions: {
                //     hide: "model.InbuildConstructType != 'W'",
                //   },
                // },
  
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    maxLength:15,
                    label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                }
  
              ]
            }
          ]
        }
      ]
      this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
    }
    if (this.coversRequired == 'B' && this.insuranceId=='100004') {
      this.productItem.ContentSuminsured = '0';
      let entry = [
        {
          props: { label: 'Building Risk' },
  
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'BuildingUsageId',
                  props: {
                    label: 'Building Usage',
                    //hideExpression: "model.BuildingOwnerYn =='N'",
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'BuildingBuildYear',
                  props: {
                    label: 'Built Year',
                    placeholder: "YYYY",
                    required: false,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('BuildingBuildYear'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'WallType',
                  props: {
                    label: 'Used Contruction Materials (Wall)',
                    disabled: this.checkDisable('WallType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'RoofType',
                  props: {
                    label: 'Used Contruction Materials (Roof)',
                    disabled: this.checkDisable('RoofType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    maxLength:15,
                    label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'TypeOfProperty',
                  props: {
                    label: 'Type Of Property',
                    
                    disabled: this.checkDisable('TypeOfProperty'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'WaterTankSi',
                  templateOptions: {
                    maxLength:15,
                    label: `WaterTank SumInsured`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'LossOfRentSi',
                  templateOptions: {
                    maxLength:15,
                    label: `Loss Of Rent SumInsured`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('LossOfRentSi'),
                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'ArchitectsSi',
                  templateOptions: {
                    maxLength:15,
                    label: `Architects SumInsured`,
  
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    disabled: this.checkDisable('ArchitectsSi'),
                  },
                }
  
              ]
            }
          ]
        }
      ]
      this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
    }
  
    if (this.productId=='59') {
      this.getOccupationList(null);
      if(this.coversRequired=='BC' || this.coversRequired=='B'){
        this.getWallMaterialList();
        this.getRoofMaterialList();
      }
      if(this.insuranceId=='100004'){
        this.getTypeOfProperty();
      }
      
      this.getbuildingpurposeList();
    }
  
    if(this.productId =='1'){
      this.buglaryloss();
    }
  
    if (type == 'create' || mode == 'change') { this.formSection = true; this.viewSection = false; }
    else { this.formSection = false; this.viewSection = true; }
  }
  getFireAlliedRiskDetails(sections){
    if(this.requestReferenceNo ==null || this.requestReferenceNo==undefined){
      this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo');
    }
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  "40"
    }
    let urlLink = `${this.motorApiUrl}api/slide4/getfireandperils`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
              //this.productItem.ContentSuminsured = data?.Result?.ContentSuminsured;
              this.productItem.BuildingSuminsured = data?.Result?.BuildingSuminsured;
              this.productItem.IndemityPeriod = data?.Result?.IndemityPeriod;
              this.productItem.MakutiYn = data?.Result?.MakutiYn;
              this.productItem.onAssetSumInsured = data?.Result?.OnAssetsSi;
              this.productItem.onStockSumInsured = data?.Result?.OnStockSi;
              console.log('On Assets',data?.Result?.OnStockSi)
              let details = data.Result;
              if(details?.EndorsementDate){
                this.endorsementDate = details?.EndorsementDate;
                this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
                this.endorsementRemarks = details?.EndorsementRemarks;
                this.endorsementType = details?.EndorsementType;
                this.endorsementTypeDesc = details?.EndorsementTypeDesc;
                this.endtCategoryDesc = details?.EndtCategoryDesc;
                this.endtCount = details?.EndtCount;
                this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
                this.endtStatus = details?.EndtStatus;
                this.isFinanceEndt = details?.IsFinanceEndt;
                this.orginalPolicyNo = details?.OrginalPolicyNo;
              }
              this.sectionCount +=1;
              if(sections.length==this.sectionCount){
                this.formSection = true; this.viewSection = false;
              }
              console.log("Products",this.productItem)
        }
      },
      (err) => { },
    );
  }
  getPersonalLiabilityDetails(sections){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId":  "36"
    }
    let urlLink = `${this.motorApiUrl}api/slide7/getempliablity`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if(data.Result.length!=0){
            this.productItem.EmpLiabilitySi = data.Result[0].EmpLiabilitySi;
            if(data.Result[0].LiabilityOccupationId!=null && data.Result[0].LiabilityOccupationId!='') this.productItem.LiabilityOccupationId = data.Result[0].LiabilityOccupationId;
            else this.productItem.LiabilityOccupationId = null;
            let entry = data?.Result[0];
              if(entry.EndorsementDate){
                this.endorsementDate = entry?.EndorsementDate;
                this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                this.endorsementRemarks = entry?.EndorsementRemarks;
                this.endorsementType = entry?.EndorsementType;
                this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                this.endtCategoryDesc = entry?.EndtCategoryDesc;
                this.endtCount = entry?.EndtCount;
                this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                this.endtStatus = entry?.EndtStatus;
                this.isFinanceEndt = entry?.IsFinanceEndt;
                this.orginalPolicyNo = entry?.OrginalPolicyNo;
              }
              console.log("Products",this.productItem)
          }
          else{this.productItem.LiabilityOccupationId = null;this.productItem.PersonalIntermediarySuminsured='0'}
          this.Products=false;
          // this.editsections(sections);
          this.getOccupationList(sections);
        }
      },
      (err) => { },
    );
  }
  getTransportedByList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/transportedby`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.transaportList = data.Result;
          if (this.transaportList.length != 0) {
            for (let i = 0; i < this.transaportList.length; i++) {
              this.transaportList[i].label = this.transaportList[i]['CodeDesc'];
              this.transaportList[i].value = this.transaportList[i]['Code'];
              delete this.transaportList[i].CodeDesc;
              if (i == this.transaportList.length - 1) {
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Goods in Transit'){
                    let defaultObj = [{ 'label': '-Select-', 'value': null }]
                    console.log("Goods Fields",field)
                    field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.transaportList);
                  }
                }
                //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.transaportList);
          this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.transaportList);
              }
            }
          }
        }
      });
  }
  getTransportList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/modeoftransport`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.modeTransportList = data.Result;
          if (this.modeTransportList.length != 0) {
            for (let i = 0; i < this.modeTransportList.length; i++) {
              this.modeTransportList[i].label = this.modeTransportList[i]['CodeDesc'];
              this.modeTransportList[i].value = this.modeTransportList[i]['Code'];
              delete this.modeTransportList[i].CodeDesc;
              if (i == this.modeTransportList.length - 1) {
                let fields = this.fields[0].fieldGroup;
                      for(let field of fields){
                        if(field.props.label=='Goods in Transit'){
                          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                          console.log("Goods Fields",field)
                          field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[1].fieldGroup[1].props.options = defaultObj.concat(this.modeTransportList);
                        }
                      }
              }
            }
          }
        }
      });
  }

  onproductdisplay(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log('IIIIII',data);
        if(data.Result){
          this.productList = data.Result;
            // if(products.length!=0){
            //   let i=0;
            //   for(let product of products){
            //       if(this.selectedSections.length!=0){
            //         product['checked'] = this.selectedSections.some(ele=>ele==product.Code);
            //       }
            //       else product['checked']=false;
            //       i+=1;
            //       if(i==products.length) this.productList = products
            //   }
            // }
            console.log('KKKKKKKKKKKKKK',this.productList)
            //this.premiunDropdown()
  
        }
        
      },
  
      (err) => { },
    );
  }

  sectionselect(type,code,value){
    let n = this.checkSections(code);
      let s=this.colorSections.find(ele => ele == code);
      if(!s){
        this.productnames= type;
        console.log('Selected',type);
        this.sections(code);
        this.newsections= code;
      }
      else {
        let s=this.colorSections.findIndex(ele => ele == code);
        console.log('FIndingss',s);
        console.log('FIndingss111',this.colorSections);
        this.colorSections.splice(s,1);
        this.saveCommonDetails('Risks',null);
        // if(code=='3'){
        //   this.productItem.AllriskSumInsured='';
        // }
        // else if(code=='1'){
        //   this.productItem.BuildingUsageId = '';
        //   this.productItem.BuildingBuildYear = null;
        //   this.productItem.WallType = '';
        //   this.productItem.RoofType = '';
        //   this.productItem.BuildingSuminsured = 0;
        // }
        console.log('FIndingss222',this.colorSections);
      }
  }
  getgeographicalLimit(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/geographicalcoverage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.geographicalList = data.Result;
          if (this.geographicalList.length != 0) {
            for (let i = 0; i < this.geographicalList.length; i++) {
              this.geographicalList[i].label = this.geographicalList[i]['CodeDesc'];
              this.geographicalList[i].value = this.geographicalList[i]['Code'];
              delete this.geographicalList[i].CodeDesc;
              if (i == this.geographicalList.length - 1) {
                let fields = this.fields[0].fieldGroup;
                      for(let field of fields){
                        if(field.props.label=='Goods in Transit'){
                          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                          console.log("Goods Fields",field)
                          field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[2].fieldGroup[1].props.options = defaultObj.concat(this.geographicalList);
                        }
                      }
                //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup[2].fieldGroup[1].props.options = defaultObj.concat(this.geographicalList);
              }
            }
          }
        }
      });
  }
  getColorsList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/color`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.colorList = data.Result;
            for (let i = 0; i < this.colorList.length; i++) {
              this.colorList[i].label = this.colorList[i]['CodeDesc'];
              this.colorList[i].value = this.colorList[i]['Code'];
              delete this.colorList[i].CodeDesc;
              if (i == this.colorList.length - 1) {
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                  let fields = this.fields[0].fieldGroup[0].fieldGroup;
                  for(let field of fields){
                    console.log("Received Iterate",field)
                    if(field.key=='Color'){
                      field.props.options = defaultObj.concat(this.colorList);
                    }
                  }
              }
            }
        }
      },
      (err) => { },
    );
  }
  getBodyTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/induvidual/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let sortedList = this.transform(data?.Result)
            console.log("Sorted List",sortedList)
            this.bodyTypeList = data.Result;
            for (let i = 0; i < this.bodyTypeList.length; i++) {
              this.bodyTypeList[i].label = this.bodyTypeList[i]['CodeDesc'];
              this.bodyTypeList[i].value = this.bodyTypeList[i]['Code'];
              delete this.bodyTypeList[i].CodeDesc;
              if (i == this.bodyTypeList.length - 1) {
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                  
                  if(this.fields.length!=0){ this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.bodyTypeList);}
                  if(this.motorDetails){
                    
                    this.productItem.BodyType = this.bodyTypeList.find(ele=>ele.label==this.motorDetails.VehicleTypeDesc || ele.Code ==this.motorDetails.VehicleType)?.Code;
                    if(this.fields.length!=0){
                      let fields = this.fields[0].fieldGroup[0].fieldGroup;
                      for(let field of fields){
                        if(field.key=="BodyType"){
                        if(field.formControl) field.formControl.setValue(this.productItem.BodyType);
                        }
                      }
                    }
                    // this.fields[0].fieldGroup[0].fieldGroup[0].formControl.controls['BodyType'].setValue(this.productItem.BodyType);
                    this.onBodyTypeChange('direct');
                  }
              }
            } 
        }
  
      },
      (err) => { },
    );
  }
  transform(values: any[]): any[] {
    return values.sort((a,b) => Number(a['Code']) -  Number(b['Code']))
  }

  ownership(type){
this.BuildingOwnerYn = type;
  }
  getUsageList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.usageList = data.Result;
            for (let i = 0; i < this.usageList.length; i++) {
              this.usageList[i].label = this.usageList[i]['CodeDesc'];
              this.usageList[i].value = this.usageList[i]['Code'];
              delete this.usageList[i].CodeDesc;
              if (i == this.usageList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                if(this.motorDetails){
                  this.productItem.MotorUsage = this.usageList.find(ele=>ele.label==this.motorDetails.Motorusage || ele.Code ==this.motorDetails.Motorusage)?.Code;
                }
                if(this.fields.length!=0){
                  let fields = this.fields[0].fieldGroup[0].fieldGroup;
                 
                  for(let field of fields){
                    if(field.key=='MotorUsage'){
                      field.props.options = defaultObj.concat(this.usageList);
                      if(field.formControl) field.formControl.setValue(this.productItem.MotorUsage);
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
  onBodyTypeChange(type){
    if(type=='change'){
      
      this.productItem.Make = '';
      this.productItem.Model = '';
      this.productItem.ModelDesc = null;
      this.productItem.OtherModelDesc = null;
    }
    this.getMakeList();
    if(this.productItem.BodyType==null || this.productItem.BodyType=='' || this.productItem.BodyType=='1' || this.productItem.BodyType=='2' || this.productItem.BodyType=='3' || this.productItem.BodyType=='4' || this.productItem.BodyType=='5'){
      let fields = this.fields[0].fieldGroup[0].fieldGroup;
      for(let field of fields){
        if(field.key=='Make'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
        }
        if(field.key=='Model'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
          field.hideExpression=false;field.hide=false;
        }
        else if(field.key=='ModelDesc'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
          field.hideExpression=true;field.hide=true;}
        else if(field.key=='OtherModelDesc'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
          if(this.productItem.Model=='99999') {field.hideExpression=false;field.hide=false;}
          else{field.hideExpression=true;field.hide=true;}
        }
      }
      // this.fields[0].fieldGroup[0].fieldGroup[3].hideExpression = true;
      // this.fields[0].fieldGroup[0].fieldGroup[2].hideExpression = false;
    }
    else{
      let fields = this.fields[0].fieldGroup[0].fieldGroup;
      for(let field of fields){
        if(field.key=='Model'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
          field.hideExpression=true;field.hide=true;
        }
        else if(field.key=='ModelDesc'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
          field.hideExpression=false;field.hide=false;
        }
        else if(field.key=='OtherModelDesc'){
          if(type=='change' && field.formControl) {field.formControl.setValue('');}
          if(this.productItem.Model=='99999') {field.hideExpression=false;field.hide=false;}
          else{field.hideExpression=true;field.hide=true;}
        }
      }
    }
}
  getMotorCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/motorcategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorCategoryList = data.Result;
            for (let i = 0; i < this.motorCategoryList.length; i++) {
              this.motorCategoryList[i].label = this.motorCategoryList[i]['CodeDesc'];
              this.motorCategoryList[i].value = this.motorCategoryList[i]['Code'];
              delete this.motorCategoryList[i].CodeDesc;
              if (i == this.motorCategoryList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                if(this.motorDetails){
                  this.productItem.MotorCategory = this.motorCategoryList.find(ele=>ele.label==this.motorDetails.MotorCategory || ele.Code ==this.motorDetails.MotorCategory)?.Code;
                }
                if(this.fields.length!=0){
                  let fields = this.fields[0].fieldGroup[0].fieldGroup;
                  for(let field of fields){
                    if(field.key=='MotorCategory'){
                      field.props.options = defaultObj.concat(this.motorCategoryList);
                      if(field.formControl) field.formControl.setValue(this.productItem.MotorCategory);
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
  getMakeList(){
    if(this.productItem.BodyType!='' && this.productItem.BodyType!=null){
      let ReqObj = {
        "BodyId": this.productItem.BodyType,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/motormake`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.makeList = data.Result;
              for (let i = 0; i < this.makeList.length; i++) {
                this.makeList[i].label = this.makeList[i]['CodeDesc'];
                this.makeList[i].value = this.makeList[i]['Code'];
                delete this.makeList[i].CodeDesc;
                if (i == this.makeList.length - 1) {
                    let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                    this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.makeList);
                    if(this.motorDetails){
                      this.productItem.Make = this.makeList.find(ele=>ele.label==this.motorDetails.Vehiclemake || ele.Code==this.motorDetails.Vehiclemake || ele.Code == this.motorDetails.VehiclemakeDesc)?.Code;
                      this.productItem.Model = this.motorDetails.Vehiclemodel;
                      this.productItem.ModelDesc = this.motorDetails.VehicleModelDesc;
                      this.productItem.OtherModelDesc = this.motorDetails.VehicleModelDesc;
                      if(this.fields.length!=0){
                        let fields = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fields){
                          if(field.key=="Make"){ if(field.formControl) field.formControl.setValue(this.productItem.Make);}
                          if(field.key=="Model"){ if(field.formControl) field.formControl.setValue(this.productItem.Model);}
                          if(field.key=="ModelDesc"){ if(field.formControl) field.formControl.setValue(this.productItem.ModelDesc);}
                          if(field.key=="OtherModelDesc"){ if(field.formControl) field.formControl.setValue(this.motorDetails.VehicleModelDesc);}
                        }
                      }
                      this.onModelChange('direct');
                      if(this.productItem.Make) this.onMakeChange('direct');
                      else this.formSection = true; this.viewSection = false;
                    }
                    else{this.productItem.Make='';this.productItem.Model='';this.productItem.ModelDesc=null;this.productItem.OtherModelDesc=null;}
                }
              }
          }
        },
        (err) => { },
      );
    }
    
  }
  onMakeChange(type){
    if(this.productItem.Make!='' && this.productItem.Make!=null){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "MakeId": this.productItem.Make,
        "BodyId": this.productItem.BodyType
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/motormakemodel`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.modelList = data.Result;
              for (let i = 0; i < this.modelList.length; i++) {
                this.modelList[i].label = this.modelList[i]['CodeDesc'];
                this.modelList[i].value = this.modelList[i]['Code'];
                delete this.modelList[i].CodeDesc;
                if (i == this.modelList.length - 1) {
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                  if(this.fields.length!=0){ this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.modelList);}
                  //if(type=='change') this.productItem.Model = '';
                 
                   if(this.motorDetails){
                    this.productItem.Model = this.modelList.find(ele=>ele.label==this.motorDetails.Vehcilemodel || ele.Code==this.motorDetails.Vehcilemodel)?.Code;
                    this.productItem.ModelDesc = this.motorDetails.VehicleModelDesc;
                    this.productItem.OtherModelDesc = this.motorDetails.VehicleModelDesc;
                    if(this.fields.length!=0){
                      let fields = this.fields[0].fieldGroup[0].fieldGroup;
                      for(let field of fields){
                        if(field.key=="Model"){ if(field.formControl) field.formControl.setValue(this.productItem.Model);}
                        if(field.key=="ModelDesc"){ if(field.formControl) field.formControl.setValue(this.productItem.ModelDesc);}
                        if(field.key=="OtherModelDesc"){ if(field.formControl) field.formControl.setValue(this.productItem.OtherModelDesc);}
                      }
                    }
                    this.onModelChange('direct');
                    this.formSection = true; this.viewSection = false;
                  }
                  else this.formSection = true; this.viewSection = false;
              }
              }
          }
        },
        (err) => { },
      );
    }
    else{
      this.productItem.Model='';
      this.fields[0].fieldGroup[0].fieldGroup[2].props.options = [{ 'label': '-Select-', 'value': '' }];
    }
  }
 onModelChange(type){
  if(this.fields.length!=0){
    let fields = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fields){
      if(field.key=='OtherModelDesc'){
        if(type=='change' && field.formControl) {field.formControl.setValue('');}
        if(this.productItem.Model=='99999') {field.hideExpression=false;field.hide=false;}
        else{field.hideExpression=true;field.hide=true;}
      }
    }
  }
}
  setFormValues() {

    let urlLink: any;
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1"
    }
    urlLink = `${this.motorApiUrl}api/geteservicebyriskid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let customerData = data.Result;
          this.quoteDetails = data.Result;
          this.productItem = new ProductData();
          this.applicationId = customerData.ApplicationId;
          this.productItem.CustomerName = customerData.CustomerName;
          this.productItem.BetweenDiscontinued = customerData.BetweenDiscontinued;
          this.productItem.EthicalWorkInvolved = customerData.EthicalWorkInvolved;
          this.productItem.IndustryName = customerData.IndustryName;
          this.productItem.NatureOfBusinessId = customerData?.NatureOfBusinessId;
          if (this.productId == '14' || this.productId == '15') this.onIndustryChange();
          this.productItem.TotalNoOfEmployees = customerData?.TotalNoOfEmployees;
          this.productItem.TotalExcludedEmployees = customerData?.TotalExcludedEmployees;
          this.productItem.TotalRejoinedEmployees = customerData?.TotalRejoinedEmployees;
          this.productItem.AccountOutstandingEmployees = customerData?.AccountOutstandingEmployees;
          this.productItem.AccountAuditentType = customerData?.AccountAuditentType;
          this.productItem.TotalOutstandingAmount = customerData?.TotalOutstandingAmount;
          this.productItem.JobJoiningMonth = customerData.JobJoiningMonth;
          this.productItem.OccupationType = customerData.OccupationType;
          this.productItem.SalaryPerAnnum = customerData.SalaryPerAnnum;
          this.productItem.SectionId = customerData.SalaryPerAnnum;
          this.productItem.SumInsured = customerData.SumInsured;
          this.productItem.BenefitCoverMonth = customerData.BenefitCoverMonth;
          if (this.endorsementSection) {
            this.endorsementDate = customerData?.EndorsementDate;
            this.endorsementEffectiveDate = customerData?.EndorsementEffectiveDate;
            this.endorsementRemarks = customerData?.EndorsementRemarks;
            this.endorsementType = customerData?.EndorsementType;
            this.endorsementTypeDesc = customerData?.EndorsementTypeDesc;
            this.endtCategoryDesc = customerData?.EndtCategoryDesc;
            this.endtCount = customerData?.EndtCount;
            this.endtPrevPolicyNo = customerData?.EndtPrevPolicyNo;
            this.endtPrevQuoteNo = customerData?.EndtPrevQuoteNo;
            this.endtStatus = customerData?.EndtStatus;
            this.isFinanceEndt = customerData?.IsFinanceEndt;
            this.orginalPolicyNo = customerData?.OrginalPolicyNo;
          }
          let dob = "";
          if (customerData.Dob != '' && customerData.Dob != null && customerData != undefined) {
            var dateParts = customerData?.Dob.split("/");
            this.productItem.Dob = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
          }
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
            if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
            else { this.issuerSection = false; }
          }
          else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
          else this.issuerSection = false
          this.formSection = true; this.viewSection = false;
  
        }
      },
      (err) => { },
    );
  }
  onIndustryChange(){
    if (this.productId == '14' || this.productId == '15') {
      if (this.productItem.NatureOfBusinessId) {
        let entry = this.industryList.find(ele => ele.Code == this.productItem.NatureOfBusinessId);
        console.log("Selected Entry ", entry);
        if (entry) {
          this.categoryDesc = entry.CategoryDesc;
          this.productItem.CategoryId = entry.CategoryId;
        }
  
      }
    }
    else if (this.productItem.IndustryId) {
      let entry = this.industryList.find(ele => ele.Code == this.productItem.IndustryId);
      console.log("Selected Entry ", entry);
      if (entry) {
        this.categoryDesc = entry.CategoryDesc;
        this.productItem.CategoryId = entry.CategoryId;
      }
  
    }
  
  }
  ongetAggSIList(type){
    if(type=='change'){this.productItem.AggSumInsured = null;}
    this.aggSIList = [];
    let ReqObj = {
      "Aoo":this.productItem.AooSumInsured,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.motorApiUrl}api/dropdown/medmalinsuranceagg`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
       
        let defaultObj = [{ 'label': '-Select-', 'value': null }]
        this.aggSIList = data.Result;
        for (let i = 0; i < this.aggSIList.length; i++) {
          this.aggSIList[i].label = this.aggSIList[i]['CodeDesc'];
          this.aggSIList[i].value = this.aggSIList[i]['Code'];
          delete this.aggSIList[i].CodeDesc;
          if (i == this.aggSIList.length - 1) {
            this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.aggSIList);
            if(type=='change'){this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(null);this.productItem.AggSumInsured = null;}
          }
        }
      },
      (err) => { },
    );
  }
  getFuelTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/fueltype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.fuelTypeList = data.Result;
            for (let i = 0; i < this.fuelTypeList.length; i++) {
              this.fuelTypeList[i].label = this.fuelTypeList[i]['CodeDesc'];
              this.fuelTypeList[i].value = this.fuelTypeList[i]['Code'];
              delete this.fuelTypeList[i].CodeDesc;
              if (i == this.fuelTypeList.length - 1) {
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                  if(this.motorDetails){
                    this.productItem.FuelType = this.fuelTypeList.find(ele=>ele.label==this.motorDetails.FuelType || ele.Code==this.motorDetails.FuelType)?.Code;
                  }
                  if(this.fields.length!=0){
                    let fields = this.fields[0].fieldGroup[0].fieldGroup;
                    
                    for(let field of fields){
                      if(field.key=='FuelType'){
                        field.props.options = defaultObj.concat(this.fuelTypeList);
                        if(field.formControl) field.formControl.setValue(this.productItem.FuelType);
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
  onoccChangepersonalInd(type){
    let fields = this.fields[0].fieldGroup[0].fieldGroup;
    console.log('Personal Accident Fieldsss',fields);
    for(let field of fields){
       if(field.key=='otheroptionPer'){
        if(type=='change' && field.formControl) {field.formControl.setValue('');}
        if(this.productItem.OccupationType=='99999') {
          field.hideExpression=false;field.hide=false;
      }
        else{field.hideExpression=true;field.hide=true;
        }
      }
      console.log('NNNNNNNNNNN',this.fields[0].fieldGroup[0].fieldGroup[2]);
    }
  }
  checkMoneyYNChanges(){
    if(this.productId=='19' || this.productId=='24'){
      let fields = this.fields[0].fieldGroup;
      // for(let field of fields){
      //   if(field.props.label=='Money'){
      //     console.log("Moneyyyyyyyyyy product 19",this.fields[0].fieldGroup)
      //     let tableData = field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      //     tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
      //     tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
      //     tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
      //     tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
      //     tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
      //     tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
      //     if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneySafeLimit = '0'; this.form?.controls['MoneySafeLimit']?.setValue('0')}
      //     if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutofSafe = '0'; this.form?.controls['MoneyOutofSafe']?.setValue('0')}
      //     if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyDirectorResidence = '0'; this.form?.controls['MoneyDirectorResidence']?.setValue('0')}
      //     if(!this.productItem.CashInTransitSIYN) { this.productItem.MoneyMajorLoss = '0'; this.form?.controls['MoneyMajorLoss']?.setValue('0')}
      //     if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.MoneyCollector = '0'; this.form?.controls['MoneyCollector']?.setValue('0')}
      //     if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualEstimate = '0'; this.form?.controls['MoneyAnnualEstimate']?.setValue('0')}
      //       // let tableData = field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      //       // tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
      //       // tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
      //       // tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
      //       // tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
      //       // tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
      //       // tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInSafeSIYN;
      //       // tableData[6].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
      //       // if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneyInSafeBusiness = '0'; this.form?.controls['MoneyInSafeBusiness']?.setValue('0')}
      //       // if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutSafeBusiness = '0'; this.form?.controls['MoneyOutSafeBusiness']?.setValue('0')}
      //       // if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyInPremises = '0'; this.form?.controls['MoneyInPremises']?.setValue('0')}
      //       // if(!this.productItem.CashInTransitSIYN) { this.productItem.CashInTransit = '0'; this.form?.controls['CashInTransit']?.setValue('0')}
      //       // if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.CashInHandEmployees = '0'; this.form?.controls['CashInHandEmployees']?.setValue('0')}
      //       // if(!this.productItem.CashInSafeSIYN) { this.productItem.CashInSafe = '0'; this.form?.controls['CashInSafe']?.setValue('0')}
      //       // if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualcarrySuminsured = '0'; this.form?.controls['MoneyAnnualcarrySuminsured']?.setValue('0')}
           
      //   }
      // }
    }
    // else if(this.productId == '16' && this.insuranceId != '100004'){
    //   console.log("Moneyyyyyyyyyy 10002",this.fields[0].fieldGroup)
    //   let tableData = this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
    //   tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
    //   tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
    //   tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
    //   tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
    //   tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
    //   tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
    //   //tableData[6].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
    //   if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneySafeLimit = '0'; this.form?.controls['MoneySafeLimit']?.setValue('0')}
    //   if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutofSafe = '0'; this.form?.controls['MoneyOutofSafe']?.setValue('0')}
    //   if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyDirectorResidence = '0'; this.form?.controls['MoneyDirectorResidence']?.setValue('0')}
    //   if(!this.productItem.CashInTransitSIYN) { this.productItem.MoneyMajorLoss = '0'; this.form?.controls['MoneyMajorLoss']?.setValue('0')}
    //   if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.MoneyCollector = '0'; this.form?.controls['MoneyCollector']?.setValue('0')}
    //   if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualEstimate = '0'; this.form?.controls['MoneyAnnualEstimate']?.setValue('0')}
    //   // if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneyInSafeBusiness = '0'; this.form?.controls['MoneyInSafeBusiness']?.setValue('0')}
    //   // if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutSafeBusiness = '0'; this.form?.controls['MoneyOutSafeBusiness']?.setValue('0')}
    //   // if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyInPremises = '0'; this.form?.controls['MoneyInPremises']?.setValue('0')}
    //   // if(!this.productItem.CashInTransitSIYN) { this.productItem.CashInTransit = '0'; this.form?.controls['CashInTransit']?.setValue('0')}
    //   // if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.CashInHandEmployees = '0'; this.form?.controls['CashInHandEmployees']?.setValue('0')}
    //   // if(!this.productItem.CashInSafeSIYN) { this.productItem.CashInSafe = '0'; this.form?.controls['CashInSafe']?.setValue('0')}
    //   // if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualcarrySuminsured = '0'; this.form?.controls['MoneyAnnualcarrySuminsured']?.setValue('0')}
    //   console.log("Tablessssss",tableData)
    // }
    // else if(this.productId == '16' && this.insuranceId == '100004'){
    //   console.log("Moneyyyyyyyyyy 100004",this.fields[0].fieldGroup)
    //   let tableData = this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      
    //   tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
    //   tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
    //   tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
    //   tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
    //   tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
    //   // tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInSafeSIYN;
    //   tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
    //   if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneySafeLimit = '0'; this.form?.controls['MoneySafeLimit']?.setValue('0')}
    //   if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutofSafe = '0'; this.form?.controls['MoneyOutofSafe']?.setValue('0')}
    //   if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyDirectorResidence = '0'; this.form?.controls['MoneyDirectorResidence']?.setValue('0')}
    //   if(!this.productItem.CashInTransitSIYN) { this.productItem.MoneyMajorLoss = '0'; this.form?.controls['MoneyMajorLoss']?.setValue('0')}
    //   if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.MoneyCollector = '0'; this.form?.controls['MoneyCollector']?.setValue('0')}
    //   // if(!this.productItem.CashInSafeSIYN) { this.productItem.CashInSafe = '0'; this.form?.controls['CashInSafe']?.setValue('0')}
    //   if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualEstimate = '0'; this.form?.controls['MoneyAnnualEstimate']?.setValue('0')}
    //   console.log("Tablessssss",tableData)
    // }
  }
  onoccChange(type){
    console.log('On Change',this.fieldsEmployee[0]?.fieldGroup[1]?.fieldGroup)
    let fields =  this.fieldsEmployee[0].fieldGroup[1].fieldGroup;
    for(let field of fields){
       if(type=='change' && field.formControl) {field.formControl.setValue('');}
       if(this.productItem.LiabilityOccupationId=='99999') {
         field.hideExpression=false;field.hide=false;
     }
       else{field.hideExpression=true;field.hide=true;}
   }
  }

  onoccChanges(type){
    console.log('On Change',this.fieldsEmployee[0].fieldGroup[0].fieldGroup)
    let fields =  this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup;
    for(let field of fields){
       if(type=='change' && field.formControl) {field.formControl.setValue('');}
       if(this.productItem.OccupationType=='99999') {
         field.hideExpression=false;field.hide=false;
     }
       else{field.hideExpression=true;field.hide=true;}
   }
  }
  cancelnew(){
    this.listn=true;
    if(this.currentBuildingIndex) this.EmployeeListNew.splice(this.currentBuildingIndex, 1);
    this.listSection=true;
    this.listn=false;
    this.isEmployeeForm = false;
    this.isFedilityForm = false;
    
  }
  cancelnewFed(){
    this.isGroupForm=false;
  }
  cancelnes(){
    this.isEmployeeForm = false;
    this.editss=false;
  }
  onsubmitnewemp(){
    // let validate = this.checkManda();
    //   if(validate){
        this.onBuildingSave();
      //}
  }
  onsubmitnewfed(){
    let validate = this.checkManda();
      if(validate){
        this.FidelityListNew=[
          {"FidEmpCount":this.productItem.FidEmpCount,"FidEmpSi":this.productItem.FidEmpSi,
            "LiabilityOccupationId": "99999",
            "OtherOccupation": this.productItem.OtherOccupation
          }
        ]
        this.onSaveFidelityDetails('proceed','individual')
      }
  }
  onSubmitnewGroup(){
    let validate = this.checkMandaGroup();
      if(validate){
        this.onGroupSave();
        
      }
  }
  onGroupSave(){
   
    this.FidelityListNew[this.currentGroupIndex]['FidEmpCount'] =  this.productItem.FidEmpCount;
    this.FidelityListNew[this.currentGroupIndex]['FidEmpSi'] = this.productItem.FidEmpSi;
    this.FidelityListNew[this.currentGroupIndex]['LiabilityOccupationId'] = this.productItem.LiabilityOccupationId;
    this.FidelityListNew[this.currentGroupIndex]['OtherOccupation'] = this.productItem.OtherOccupation;
    //this.FidelityListNew[this.currentGroupIndex]['FESumInsured'] = this.productItem.FESumInsured;
    // this.GroupListNew[this.currentGroupIndex]['TTDSumInsured'] = this.productItem.TTDSumInsured;
    // this.GroupListNew[this.currentGroupIndex]['PTDSumInsured'] = this.productItem.PTDSumInsured;
    //this.FidelityListNew[this.currentFidelityIndex]['OtherOccupation'] = this.productItem.otherFioption;
      // this.listnGroup=false;
      // this.listSectionGroup= true;
      //this.editGroup=false;
     // this.isGroupForm = false;
    this.productItem.OtherOccupation=null; this.productItem.FidEmpCount=null;
    this.productItem.FidEmpSi='0'; this.productItem.MESumInsured='0'; this.productItem.FESumInsured='0';
    this.productItem.TTDSumInsured='0'; this.productItem.PTDSumInsured='0';
    this.isGroupForm=false;
  }
  checkMandaGroup(){
    let errorList = [];
    let ulList:any='',i=0;
     if(this.productItem.OtherOccupation=='' ||  this.productItem.OtherOccupation==null){
      i+=1;
      ulList +=`<li class="list-group-login-field">
        <div style="color: darkgreen;">Field<span class="mx-2">:</span>Occupation Type</div>
        <div style="color: red;">Message<span class="mx-2">:</span>Please Select OccupationType</div>
      </li>`
     }
     if(this.productItem.FidEmpCount=='' ||  this.productItem.FidEmpCount==null){
      i+=1;
      ulList +=`<li class="list-group-login-field">
        <div style="color: darkgreen;">Field<span class="mx-2">:</span>Total No Of Perrson</div>
        <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Total No Of Persons</div>
      </li>` 
     }
     if(!this.editGroup){
     if(this.FidelityListNew.length!=0){
      for(let field of this.FidelityListNew){
        console.log('FIIIIIIIIIIIIIIIIIIII',this.productItem.OtherOccupation)
       if(field.OtherOccupation == this.productItem.OtherOccupation){
         i+=1;
         ulList +=`<li class="list-group-login-field">
           <div style="color: darkgreen;">Field<span class="mx-2">:</span>Occupation Type</div>
           <div style="color: red;">Message<span class="mx-2">:</span>Occupation Id Already Exist</div>
         </li>`
       }
      }
    }
  }
      if(i!=0){
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
        return false;
      }
      else return true;
  }
  onsaveGroupPADetails(type,formType){
    if(this.GroupListNew.length!=0){
      let list:any[] = this.GroupListNew.filter(ele=>ele.OccupationType!=null && ele.OccupationType!='');
      if(list.length!=0){
        let i=0;
          for(let entry of list){
            entry["RequestReferenceNo"] = this.requestReferenceNo;
            entry["RiskId"] = entry.OccupationType;
            entry["ProductId"] = this.productId;
            entry["SectionId"]= "45";
            entry["InsuranceId"] = this.insuranceId
            entry["CreatedBy"] = this.loginId;
            i+=1;
            if(i==list.length){
              let urlLink = `${this.motorApiUrl}api/slide13/savepersonlaccident`;
              this.sharedService.onPostMethodSync(urlLink,list).subscribe(
              (data: any) => {
                if (data?.Result.length!=0) {
                  this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;

                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  if(this.commonDetails){
                    if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                      if(!this.commonDetails[0].SectionId.some(ele=>ele=='45')) this.commonDetails[0].SectionId.push('45');
                    }
                    else  this.commonDetails[0]['SectionId']=['45'];
                  }
                  sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) 
                  this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
                }
              });
            }
          }
      }
    }
  }

  cancelnewGroup(){
    this.listnGroup=true;
    this.GroupListNew.splice(this.currentGroupIndex, 1);
    this.listSectionGroup=true;
    this.listnGroup=false;
    this.isGroupForm = false;
  }
  cancelnesGroup(){
    this.editss=false;
    this.isGroupForm = false;
  }
 
  onBuildingSave(){
    this.listSection = false;
    
     let entry ={
          "LiabilityOccupationId":this.productItem.LiabilityOccupationId,
          "TotalNoOfEmployees":this.productItem.TotalNoOfEmployees,
          "EmpLiabilitySi":this.productItem.EmpLiabilitySi,
          "OtherOccupation":'',
        }
      // this.EmployeeListNew[this.currentBuildingIndex]['LiabilityOccupationId'] =  this.productItem.LiabilityOccupationId;
      // this.EmployeeListNew[this.currentBuildingIndex]['TotalNoOfEmployees'] = this.productItem.TotalNoOfEmployees;
      // this.EmployeeListNew[this.currentBuildingIndex]['EmpLiabilitySi'] = this.productItem.EmpLiabilitySi;
      

      if(this.productItem.LiabilityOccupationId!='99999'){
        console.log(this.occupationList.find(ele=>ele.Code==this.productItem.LiabilityOccupationId).label);
        entry['OtherOccupation'] = this.occupationList.find(ele=>ele.Code==this.productItem.LiabilityOccupationId).label
      }
      else{
        entry['OtherOccupation'] = this.productItem.OtherOccupation;
      }
      if(this.currentBuildingIndex==null || this.currentBuildingIndex==undefined){
        this.EmployeeListNew.push(entry);
      }
      else{
        this.EmployeeListNew[this.currentBuildingIndex]=entry;
      }
      this.listn=false;
      this.listSection = true;
      this.editEmp=false;
      this.isEmployeeForm = false;
      // this.productItem.LiabilityOccupationId=null; this.productItem.TotalNoOfEmployees=null;
      // this.productItem.EmpLiabilitySi=null; this.productItem.otheroption=null;
      // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
  }
  onFedilitySave(){
    this.listSection = false;
    // this.productItem.LiabilityOccupationId='';
    // this.productItem.FidEmpSi=0;
    // this.productItem.FidEmpCount=0;
    // this.productItem.otherFioption='';
    // this.FidelityListNew[this.currentFidelityIndex]['LiabilityOccupationId'] =  '99999';
    // this.FidelityListNew[this.currentFidelityIndex]['FidEmpCount'] = this.productItem.FidEmpCount;
    // this.FidelityListNew[this.currentFidelityIndex]['FidEmpSi'] = this.productItem.FidEmpSi;
    // if(this.productItem.LiabilityOccupationId!='99999'){
    //   console.log(this.occupationList.find(ele=>ele.Code==this.productItem.LiabilityOccupationId).label);
    //   this.FidelityListNew[this.currentFidelityIndex]['OtherOccupation'] = this.occupationList.find(ele=>ele.Code==this.productItem.LiabilityOccupationId).label
     
    // }
    // else{
    //   this.FidelityListNew[this.currentFidelityIndex]['OtherOccupation'] = this.productItem.otherFioption;
    // }
    this.listnFed=false;
    this.listSectionFed= true;
    
    
    //this.editFed=false;
  this.productItem.LiabilityOccupationId=null; this.productItem.FidEmpCount=null;
  this.productItem.FidEmpSi=null; this.productItem.otherFioption=null;
      // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
      this.isFedilityForm= false;
  }
  checkManda(){
    let errorList = [];
    let ulList:any='',i=0;
    console.log('Fedility List',this.FidelityListNew)
    //  if(this.productItem.LiabilityOccupationId=='' ||  this.productItem.LiabilityOccupationId==null){
    //   i+=1;
    //   ulList +=`<li class="list-group-login-field">
    //     <div style="color: darkgreen;">Field<span class="mx-2">:</span>Occupation Type</div>
    //     <div style="color: red;">Message<span class="mx-2">:</span>Please Select OccupationType</div>
    //   </li>`
    // }
     if(this.productItem.FidEmpCount=='' ||  this.productItem.FidEmpCount==null){
      i+=1;
      ulList +=`<li class="list-group-login-field">
        <div style="color: darkgreen;">Field<span class="mx-2">:</span>TotalNoOfEmployees</div>
        <div style="color: red;">Message<span class="mx-2">:</span>Please Enter TotalNoOfEmployees</div>
      </li>`
     }
     if((this.productItem.FidEmpSi=='' || this.productItem.FidEmpSi==null || this.productItem.FidEmpSi==0 )){
      i+=1;
      ulList +=`<li class="list-group-login-field">
        <div style="color: darkgreen;">Field<span class="mx-2">:</span>Sum Insured</div>
        <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Sum Insured</div>
      </li>`
     }
     if(this.productItem.LiabilityOccupationId=='99999'){
      if(this.productItem.otherFioption=='' || this.productItem.otherFioption==null ){
        i+=1;
        ulList +=`<li class="list-group-login-field">
          <div style="color: darkgreen;">Field<span class="mx-2">:</span>Other Occupation</div>
          <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Other Occupation</div>
        </li>`
      }
     }
     if(!this.editEmp){
      if(this.FidelityListNew.length!=0){
        for(let field of this.FidelityListNew){
          console.log('FIIIIIIIIIIIIIIIIIIII',field.LiabilityOccupationId)
         if(field.LiabilityOccupationId == this.productItem.LiabilityOccupationId){
           i+=1;
           ulList +=`<li class="list-group-login-field">
             <div style="color: darkgreen;">Field<span class="mx-2">:</span>Occupation Type</div>
             <div style="color: red;">Message<span class="mx-2">:</span>Occupation Id Already Exist</div>
           </li>`
         }
        }
      }
     }
    
      if(i!=0){
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
        return false;
      }
      else return true;
  }
  onoccFedilityChange(type){
    console.log('KKKKKKKK')
    let fields =  this.fieldsFidelity[0].fieldGroup[0].fieldGroup[0].fieldGroup;
    for(let field of fields){
      if(field.key=='otherFioption'){
       if(type=='change' && field.formControl) {field.formControl.setValue('');}
       if(this.productItem.LiabilityOccupationId=='99999') {
         field.hideExpression=false;field.hide=false;
     }
       else{field.hideExpression=true;field.hide=true;}
     }
   }
  }
    getCustomerDetails(refNo){
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceNo) {
            this.requestReferenceNo = referenceNo;
            // if(this.productId!='60'){
              if(this.productId!='46' && this.productId!='4') this.getExistingBuildingList();
            // }
          }
          
        }

      });
    }
    onStartDateChange(type){
      if(this.productId!='4'){
        // if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
        var d = this.policyStartDate;
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        if(this.productId=='46'){
          this.endMinDate = new Date(this.policyStartDate);
          this.policyEndDate = new Date(year, month, day+29);
          this.endMaxDate = new Date(year, month, day+30);
          //this.updateComponent.policyEndDate = this.policyEndDate;
          this.onChangeEndDate();
        }
        else {
          this.endMinDate = new Date(this.policyStartDate);
          this.policyEndDate = new Date(year + 1, month, day-1);
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
        this.modifiedYN = 'Y';
        // if(this.customerData.length!=0){
        //   for(let customer of this.customerData) customer['modifiedYN'] = 'Y';
        // }
      }
    }
    getNatureTradeList(){
      this.natureTradeList = [];
      if(this.productId!='19'){this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = [];}
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/natureoftrade`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.natureTradeList = data.Result;
          for (let i = 0; i < this.natureTradeList.length; i++) {
            this.natureTradeList[i].label = this.natureTradeList[i]['CodeDesc'];
            this.natureTradeList[i].value = this.natureTradeList[i]['Code'];
            delete this.natureTradeList[i].CodeDesc;
            if (i == this.natureTradeList.length - 1) {
              if(this.productId!='19'){
                this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.natureTradeList);
              }
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                          console.log("Burglary Filtered Fields",field)
                      field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.natureTradeList);
                  }
                }
              }
            }
          }
        },
        (err) => { },
      );
    }
    getEmployeeCountList(){
      this.employeeCountList = [];
    
      if (this.productId != '14' && this.productId != '15') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = [];
      else this.fields[0].fieldGroup[0].fieldGroup[0].props.options = [];
      let ReqObj = {
        "ProductId": this.productId,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/fidelityEmployeeCount`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.employeeCountList = data.Result;
          for (let i = 0; i < this.employeeCountList.length; i++) {
            this.employeeCountList[i].label = this.employeeCountList[i]['CodeDesc'];
            this.employeeCountList[i].value = this.employeeCountList[i]['Code'];
            delete this.employeeCountList[i].CodeDesc;
            if (i == this.employeeCountList.length - 1) {
              if (this.productId != '14' && this.productId != '15') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.employeeCountList);
              else this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.employeeCountList);
              // this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.employeeCountList);
            }
          }
        },
        (err) => { },
      );
    }
    getSIValue() {
      let salary = this.productItem?.SalaryPerAnnum;
      let benefits = this.productItem?.BenefitCoverMonth;
      let sumInsured = this.productItem?.SumInsured;
      if (salary != null && salary != '' && salary != undefined) {
        if (benefits != null && benefits != '' && benefits != undefined) {
          if (benefits == '12') {
            this.productItem.SumInsured = String(Number(salary) * 1);
            this.form.controls['SumInsured'].setValue(this.productItem.SumInsured)
          }
          else if (benefits == '24') {
            this.productItem.SumInsured = String(Number(salary) * 2);
            this.form.controls['SumInsured'].setValue(this.productItem.SumInsured)
          }
          else if (benefits == '36') {
            this.productItem.SumInsured = String(Number(salary) * 3);
            this.form.controls['SumInsured'].setValue(this.productItem.SumInsured)
          }
        }
      }
    }
    getIndustryTypeList(){
      this.industryTypeList = [];
      if (this.productId == '32') { this.fields[0].fieldGroup[0].fieldGroup[1].props.options = []; }
      else if (this.productId != '14' && this.productId != '15') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];
      let ReqObj = {
        "ProductId": this.productId,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          let altObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
          this.industryTypeList = data.Result;
          if (this.productId != '14' && this.productId != '15' && this.productId!='6') {
            for (let i = 0; i < this.industryTypeList.length; i++) {
              this.industryTypeList[i].label = this.industryTypeList[i]['CodeDesc'];
              this.industryTypeList[i].value = this.industryTypeList[i]['Code'];
              //delete this.industryTypeList[i].CodeDesc;
             
              if (i == this.industryTypeList.length - 1) {
                this.industryList = defaultObj.concat(this.industryList)
                console.log("Fields Industry", this.fields)
                if (this.productId == '32') {
                  this.fields[0].fieldGroup[0].fieldGroup[1].props.options = this.industryTypeList;
                }
                else if(this.productId!='1') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.industryTypeList;
              }
            }
          }
          else this.industryList = altObj.concat(this.industryTypeList)
        },
        (err) => { },
      );
    }
    getIndustryList(){
      let ReqObj = {
        "CategoryId": this.productItem.CategoryId,
        "BranchCode": this.branchCode,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
          this.industryList = defaultObj.concat(data.Result);
          if(this.productId=='61' ){
            for (let i = 0; i < this.industryList.length; i++) {
              this.industryList[i].label = this.industryList[i]['CodeDesc'];
              this.industryList[i].value = this.industryList[i]['Code'];
          }
          this.fieldsBond[0].templateOptions.options = this.industryList;
        }
        if(this.productId=='1'){
        //   for (let i = 0; i < this.industryList.length; i++) {
        //     this.industryList[i].label = this.industryList[i]['CodeDesc'];
        //     this.industryList[i].value = this.industryList[i]['Code'];
           
        // }
        //this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = this.industryList;
      }
          if(this.productId=='26'){
            //this.productItem.IndustryBussinessAllRisk = this.IndustryId;
            for (let i = 0; i < this.industryList.length; i++) {
              this.industryList[i].label = this.industryList[i]['CodeDesc'];
              this.industryList[i].value = this.industryList[i]['Code'];
              delete this.industryList[i].CodeDesc;
              
              if (i == this.industryList.length - 1) {
                // this.industryList = defaultObj.concat(this.industryList)
                // this.fields[0].fieldGroup[0].fieldGroup[1].props.options = this.industryList;
              }
            }
            this.fields[0].fieldGroup[0].fieldGroup[1].props.options = this.industryList;
          }
        },
        (err) => { },
      );
    }
    onChangeEndDate(){
      if(this.productId!='4'){
      const oneday = 24 * 60 * 60 * 1000;
      const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
      const formattedDate = moment(momentDate).format("YYYY-MM-DD");
      const formattedDatecurrent = new Date(this.policyStartDate);
      console.log(formattedDate);
      this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
      }
      else{
      }
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
          console.log(data);
          if(data.Result){
              this.currencyList = data.Result;
               if(this.currencyCode){
                  this.onCurrencyChange('direct');
                  console.log('currency Details 888',this.currencyCode)
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
      if(type=='change' && this.quoteRefNo!=null){
        this.modifiedYN='Y'
      }
    }
    onPromoCodeChange(type){
      if(type=='change') this.modifiedYN = 'Y';
    }
    onExchangeRateChange(type){
      if(type=='change') this.modifiedYN = 'Y';
    }
    getSourceList(){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}dropdown/getsourcetype`; 
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.productList13 = data.Result;
              console.log('KJHGFProductsss',this.productList13)
              //this.premiunDropdown(rowdata);
          }
        },
        (err) => { },
      );
    }

    premiunDropdown(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId":"3",
      }
      let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
             this.premiumList = data.Result;
          }
        },
        (err) => { },
      );
    }
    onSearchCustomer(){
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
        "Offset":"1000"
      }
      let urlLink = `${this.CommonApiUrl}api/getactivecustomerdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customers = data?.Result;
              this.isSearchFormVisible = true;
          }
        });
    }
    hideSearchForm() {
      this.isSearchFormVisible = false;
      this.selectedCustomer=null;
      this.Products = false;
    }
    navigateToCustomerDetail() {
      if(this.selectedCustomer){
        sessionStorage.setItem('customerReferenceNo',this.selectedCustomer);
        let entry = this.customers.find(ele=>ele.CustomerReferenceNo == this.selectedCustomer);
        if(entry){
              this.ClientName = entry.ClientName;
              this.customerDetails = entry;
              this.referenceNo = this.selectedCustomer;
        }
        this.isSearchFormVisible = false;
      }
      
    }
    onSelectCustomer(rowData){
      this.selectedCustomer = rowData.CustomerReferenceNo;
      //sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    }
    customerSearch(event) {
      this.customerFilterSuggestions = [{'name':'Customer 1'}, {'name':'Customer 2'}];
    }
    

    sections(sections){
      this.fields=[];
  //     if(this.requestReferenceNo){
  //       this.sectionCount = 0;
  //       if(sections =='1') this.getBuildingDetails(sections);
  //       if(sections =='3') {this.getAllRiskDetails(sections);}
  //       if(sections=='47' || sections=='74') this.getContentDetails(sections);
  //       if(sections =='35') this.getPersonalAccidentDetails(sections);
  //       if(sections =='36') this.getPersonalLiabilityDetails(sections);
  //       if(sections =='40') this.getFireAlliedRiskDetails(sections);
  //       if(sections =='45'){ this.getEmployeeRiskDetails(sections)}
  //       if(sections =='43'){ this.getFidelityRiskDetails(sections)}
  //       if(sections =='41'){ this.getMachineryBreakDownDetails(sections)}
  //       if(sections =='42'){ this.getMoneyDetails(sections)}
  //       if(sections =='52'){ this.getBurglaryDetails(sections) }
  //       if(sections =='69'){ this.getBusinessAllRiskDetails(sections) }
  //       if(sections =='75'){ this.getBusinessInterruptionDetails(sections) }
  //       if(sections =='76'){ this.getElectronicEquipment(sections)}
  //       if(sections =='46'){ this.getGoodsTransitDetails(sections) }
  //       if(sections =='54'){ this.getPublicLiabilityDetails(sections) }
  //       if(sections =='3' && this.productId=='21' || this.productId == '26'){ this.getPlantallrisk(sections) }
  //      //  if(sections.some(ele=>ele=='3') && this.productId=='21'){ this.getElectronicEquipment(sections) }
  //       if(sections =='56' || sections=='53'){ 
  //        this.sectionCount +=1;
  //        if(sections.length==this.sectionCount){
  //          this.formSection = true; this.viewSection = false;
  //        }
  //       }
  //  }
 
     this.formSection = true; this.viewSection = false;
      this.editsections(sections);
      console.log('Sectionsssss',sections);
    }


    editsections(sections){
      if(sections){
        // this.Products=true;
        console.log('sectionssss',sections)
        //this.updateComponent.setTabCountSection(0);
        this.showSection = true;
        if(sections=='1'){
          
          let contentData 
          if(this.insuranceId=='100004'){
            contentData = new Buildingss();
          }
          else{
            contentData = new Building();
          }
          this.fields[0] = contentData?.fields;
          //this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
          this.getWallMaterialList();
          this.getRoofMaterialList();
          this.getbuildingpurposeList();
          if(this.insuranceId =='100004'){
            this.getTypeOfProperty();
          }
          
        }
        if(sections=='47' && this.insuranceId!='100004'){
          let contentData = new HouseHoldContents();
          this.fields[0] = contentData?.fields;
        }
        if(sections=='3'){
          let contentData 
          if(this.insuranceId=='100004'){
            contentData = new AllRiskss();
          }
          else {
           
            contentData = new AllRisk();
          }
          this.fields[0] = contentData?.fields;
          console.log('contents',this.fields,contentData?.fields);
        }
        if(sections=='36'){
          let contentData = new PersonalLiability();
          this.fields[0] = contentData?.fields;
          this.getOccupationList(sections);
        }
        if(sections=='76'){
          let fireData = new ElectronicEquipment();
          this.fields[0] = fireData?.fields;
          }
          // if(sections=='61'){
          //   let fireData = new Bond();
          //   this.fields[0] = fireData?.fields;
          //   }
        if(sections=='35'){
          let contentData = new PersonalAccident();
          this.fields[0] =contentData?.fields;
          this.getOccupationList(sections);
        
          // let modelHooks = { onInit: (field: FormlyFieldConfig) => {
          //   field.formControl.valueChanges.subscribe(() => {
          //     this.onoccChangepersonal('change');
          //   });
          // } }
          // console.log('HHHHHHHHHHHHHH',this.fields[0].fieldGroup);
          // console.log('Field groups',contentData.fields.fieldGroup)
          // let groupLists = contentData.fields.fieldGroup;
          // let i=0;
          // for(let group of groupLists){
          //    group.fieldGroup[0].hooks = modelHooks;
          //    i+=1;
          //    if(i==groupLists.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]); this.onoccChangepersonal('change');}
          // }
          // this.fields[0].fieldGroup.fieldGroup[0].fieldGroup[0].hooks = modelHooks;
          
        }
        if(sections =='69'){
          let fireData = new BussinessAllRisk();
          this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
        }
       
        if(sections =='47' || sections=='74' && this.insuranceId=='100004'){
          let contentData
          if(this.productId!='24'){
            contentData = new HouseHoldContents();
          }
          else{
            contentData = new HouseHoldContentsss(); 
          }
          this.fields[0] = contentData?.fields;
          //this.fields[0].fieldGroup = contentData?.fields;
          //this.fields[0].fieldGroup.concat([contentData?.fields]);
        }
        if(sections=='54'){
          let contentData = new PublicLiability();
         this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
       }
        if(sections=='40'){
          let fireData = new FireAlliedPerils();
          let entry = [];
          entry.push(fireData?.fields);
          this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);
          //this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup);
          this.getIndemityPeriodList();
        }
       
        
          if(sections=='41'){
          let contentData = new MachineryBreakDown();
          let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
                this.checkMachineryYNChanges()
            });
          }};
          let groupList = contentData.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
          let i=0;
          for(let group of groupList){
             group.fieldGroup[0].hooks = checkYnHooks;
             i+=1;
             if(i==groupList.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]); this.checkMachineryYNChanges()}
          }
          }
          if(sections=='45'){
            //let employeeData = new EmployersLiability();
            let employeeData = new EmployersLiabilitytwo();
            let field = {
              props: { label: 'Employers Liability' },
              fieldGroup: employeeData.fields
            }
            let modelHooks = { onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.onoccChange('change');
              });
            } }
            this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field]);
            console.log('SectionEmployeers', this.fields[0].fieldGroup);
            for(let field of this.fields[0].fieldGroup){
              console.log('Formly Fields',field.props.label)
              if(field.props.label=='Employers Liability'){
                this.fieldsEmployee = field.fieldGroup;
                console.log('Fedilitysss',field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0]);
                console.log('Empliablity',this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup[0]);
              }
            }
            if(this.fieldsEmployee){
              this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
            }
        
          }
       
        
      }
    }

    getdetails(){
    this.professionaltype();
    this.Indemitytype();
    }

    professionaltype(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "SectionId": "105",
        "BranchCode": "99999"
      }
      let urlLink=`${this.CommonApiUrl}dropdown/professionaltype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
              this.ProfessionalTypes = data.Result;
              let defaultObj = [{ 'label': '-Select-', 'value': '' }]
              for (let i = 0; i < this.ProfessionalTypes.length; i++) {
                this.ProfessionalTypes[i].label = this.ProfessionalTypes[i]['CodeDesc'];
                this.ProfessionalTypes[i].value = this.ProfessionalTypes[i]['Code'];
                delete this.ProfessionalTypes[i].CodeDesc;
                if (i == this.ProfessionalTypes.length - 1) {
                  this.fields[0].fieldGroup[0].fieldGroup[5].fieldGroup[1].props.options = defaultObj.concat(this.ProfessionalTypes);
              }
            }
          }
        },
        (err) => { },
      );
    }

    Indemitytype(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "SectionId": "105",
        "BranchCode": "99999"
      }
      let urlLink=`${this.CommonApiUrl}dropdown/indemnitytype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
              this.IndimnityTypes = data.Result;
              let defaultObj = [{ 'label': '-Select-', 'value': '' }]
              for (let i = 0; i < this.IndimnityTypes.length; i++) {
                this.IndimnityTypes[i].label = this.IndimnityTypes[i]['CodeDesc'];
                this.IndimnityTypes[i].value = this.IndimnityTypes[i]['Code'];
                delete this.IndimnityTypes[i].CodeDesc;
                if (i == this.IndimnityTypes.length - 1) {
                  this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[1].props.options = defaultObj.concat(this.IndimnityTypes);
              }
            }
          }
        },
        (err) => { },
      );
    }
    onSourceTypeChange(type){
      if(type=='change') this.sourceCodeDesc = null;
      if(this.Code!=null && this.Code!='' && this.Code!=undefined){
        let entry = this.productList13.find(ele=>ele.Code==this.Code);
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
            //this.branchList = data.Result;
            this.brokerList = data.Result;
            //if(this.Code=='Agent') this.executiveSection = true;
            if(type=='change'){
              if(this.productId=='5' || this.productId=='46' || this.productId=='29'){}
              this.customerCode = null;
              this.customerName=null;
              this.brokerCode = null;
              this.brokerLoginId = null;
            }
            else{
              //if(this.Code=='Broker' || this.Code=='Agent'){
                if(this.productId=='59' && this.userType=='Issuer') this.getBackDaysDetails();
                let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
                if(entry){
                  console.log("Found Entries",this.brokerCode,entry,this.Code)
                  this.brokerLoginId = entry.Name; 
                  
                }
                // if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp' || this.sourceCodeDesc == 'Whatsapp'){
                //   if(type=='change'){
                //   }
                //   this.getBrokerBranchList('direct');
                // }
                // else 
                this.onGetCustomerList('direct',this.customerCode);
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
          //this.updateComponent.CustomerCode = this.userDetails.Result.CustomerCode;
      }
      
    }


    setCustomerValue(code,name,type){
      this.showCustomerList = false;
        this.customerCode = code;
        this.customerName = name;
        if(this.issuerSection){
          this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
        }
        if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){}
    }
    onBrokerChange(){
      let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
      if(entry){
        this.brokerLoginId = entry.Name; 
      }
      this.getBrokerBranchList('change');
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
    getBackDaysDetails(){
      let loginId = null;
      if(this.userType!='Issuer') loginId = this.loginId;
      else{
        loginId = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode)?.Name;
      }
      let ReqObj = { 
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "ProductId": this.productId
      }
      let urlLink = `${this.CommonApiUrl}master/brokerbackdays`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.backDays = data.Result.BackDays;
            if(this.backDays!=null){
              let backDate = new Date();
              var d = backDate;
              var year = d.getFullYear();
              var month = d.getMonth();
              var day = d.getDate();
              backDate = new Date(year, month, day-Number(this.backDays));
              this.minDate = new Date(year, month, (day-Number(this.backDays))+1);
            }
            
          }
            
        },
        (err) => { },
      );
    }

    onSaveFidelityDetails(type,formType){
      console.log('DDDDD',this.FidelityListNew)
      if(this.FidelityListNew.length!=0){
        this.employeeError = false;
        let i=0;
        for(let emp of this.FidelityListNew){
            emp['CreatedBy'] = this.loginId;
            emp['InsuranceId'] = this.insuranceId;
            emp['ProductId'] = this.productId;
            emp['RequestReferenceNo'] = this.requestReferenceNo;
            emp['RiskId'] = i+1;
            emp['originalRiskId'] = i+1;
            emp['EndorsementDate'] = this.endorsementDate;
            emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
            emp['EndorsementRemarks'] = this.endorsementRemarks;
            emp['EndorsementType'] = this.endorsementType;
            emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
            emp['EndtCategoryDesc'] = this.endtCategoryDesc;
            emp['EndtCount'] = this.endtCount;
            emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
            emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
            emp['EndtStatus'] = this.endtStatus;
            emp['IsFinanceEndt'] = this.isFinanceEndt;
            emp['OrginalPolicyNo'] = this.orginalPolicyNo;
            if (this.endorsementSection) {
              if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
                emp['Status'] = 'E';
              }
              else {
                emp['Status'] = this.productItem?.Status;
              }
              emp['PolicyNo'] = this.endorsePolicyNo
            }
            else {
              emp['Status'] = 'Y';
            }
            if(this.productId=='14') emp['SectionId'] = "45";
            if(this.productId=='15') emp['SectionId'] = "38";
            else if(this.productId=='32' || this.productId=='19' || this.productId=='24') emp['SectionId'] = "43";
            i+=1;
            if(i==this.FidelityListNew.length){
              let urlLink = `${this.motorApiUrl}api/slide8/savefidelityemp`;
              this.sharedService.onPostMethodSync(urlLink, this.FidelityListNew).subscribe(
                (data: any) => {
                  if (data?.Result.length!=0) {
                    this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                    sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                    if(type=='proceed'){  
                    if(this.productId=='14'){
                      if(this.commonDetails){
                        if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                          if(!this.commonDetails[0].SectionId.some(ele=>ele=='45')) this.commonDetails[0].SectionId.push('45');
                        }
                        else  this.commonDetails[0]['SectionId']=['45'];
                      }
                    } 
                    if(this.productId=='15'){
                      if(this.commonDetails){
                        if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                          if(!this.commonDetails[0].SectionId.some(ele=>ele=='38')) this.commonDetails[0].SectionId.push('38');
                        }
                        else  this.commonDetails[0]['SectionId']=['38'];
                      }
                    } 
                    else if(this.productId=='32'){
                      if(this.commonDetails){
                        if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                          if(!this.commonDetails[0].SectionId.some(ele=>ele=='43')) this.commonDetails[0].SectionId.push('43');
                        }
                        else  this.commonDetails[0]['SectionId']=['43'];
                      }
                    }
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
                    this.onCheckUWQuestionProceed(data.Result,type,formType,'none');
                  }
              },
              (err) => { },
            );
            }
        }
      }
      else{
        this.employeeError = true;
      }
    }
  //UW Questions
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
      "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
       "LocationId": String(this.tabIndex+1),
      "VehicleId": String(this.tabIndex+1)
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
}
