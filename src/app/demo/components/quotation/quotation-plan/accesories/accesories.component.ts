import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DeviceDetails } from '../models/additionalDetails/Devicedetails';
import { LocationDetails } from '../models/additionalDetails/locationdetails';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ContentRisk } from '../models/additionalDetails/contentRisk';
import { PersonalAccident } from '../models/additionalDetails/perosonalaccident';
import { AllRisks } from '../models/additionalDetails/AllRisk';
import { PersonalIndemenitys } from '../models/additionalDetails/personalIndemenity';
import { ElectronicEquip } from '../models/additionalDetails/Electronicequip';
import { GroupPersonalAccident } from '../models/GroupPersonalAccident';
import { EmployeeLiablityss } from '../models/additionalDetails/Employeeliability';
import { Fedilitis } from '../models/additionalDetails/Fedilitiys';
import { Machineryss } from '../models/additionalDetails/Machinery';
import { Accessories } from '../models/additionalDetails/Accsessories';
import { Accessorieswh } from '../models/additionalDetails/Accsessorieswh';
import {PageEvent} from '@angular/material/paginator';
import { ProductData } from '../models/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuotationPlanComponent } from '../quotation-plan.component';
import { Medical } from '../models/additionalDetails/medical';
import { Fidelitytwo } from '../models/additionalDetails/Fidelitytwo';

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
  selector: 'app-accesories',
  templateUrl: './accesories.component.html',
  styleUrls: ['./accesories.component.scss']
})
export class AccesoriesComponent {

  @ViewChild('myModalClose') modalClose;
  quoteDetails: any;
  quoteNo: any;
  customerDetails:any;
  Riskdetails: any[] = [];
  CoverList: any[]=[];
  sidebarVisible:boolean = false;
  HavePromoCode: any;
  value = 'N';relationList:any[]=[];
  ElectronicList:any[]=[];
  dob: Date;
  BuildingUsageYn: any = 'N';
  BuildingUsageList: any[] = [];
  building: any[] = [];
  Section = false;tabIndex:any=0;
  buildingSection: boolean = false;
  personalIntermeditySection: boolean = false;
  personalAccidentSection: boolean = false;
  allRiskSection: boolean = false;
  quoteRefNo: any = null;
  jsonList: any[] = [];
  PersonalAssistantList: any[] = [];
  LocationList: any[] = [];
  ChassisList: any[]=[];
  CyperList:any[]=[];
  AccLists:any[]=[];
  Cotentrisk: any[] = [];
  MachineryContentrisk:any[]=[];
  policyEndDate: any;
  row: any;contentList:any[]=[];
  rows: any;Intermedity:any[]=[];
  ElectronicItem:any[]=[];
  CyberItem:any[]=[];
  Addrow: any;sumInsuredDetails:any;
  rowss: any;
  item: any;
  items: any[] = [];
  ContentList:any[]=[];
  first: any;fifth:any;
  sixth:any;
  second: any;
  third: any;
  occupationList: any[] = [];
  userDetails: any;
  risk:any []=[];
  allriskList:any[]=[];actualAccessoriesSI:any='0';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public UploadUrl: any = this.AppConfig.ExcelUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; ageList: any[] = [];
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  newname: any;totalBuildingSumInsured:any=0;
  loginId: any;enableMachineryEditSection:boolean = false;
  insuranceId: any;
  SectionId: any;
  quote: any; selectedTab: any = 0;
  fourth: boolean = false;
  branchCode: any;
  userType: any;
  minDate: Date;maxDate:Date;
  dropList:any[]=[];
  contentSumInsured: any;
  pASumInsured: any;productId:any;
  actualBuildingSI: any;
  actualContentSI: any;
  actualAllRiskSI: any;
  actualPersonalIntSI: any;
  actualElectronicIntSI:any;
  totalContentSI: any=0;totalAllRiskSI:any=0;
  totalPersIntSI: number;monthList:any[]=[];
  totalElectrIntSI:number;
  InbuildConstructType: void;
  sumInsured: boolean;six: boolean;
  ten:boolean;
  newten:boolean;
  actualPersonalAccSI: any;machineries:any[]=[];
  length = 50;MachineryName:any=null;BrandName:any=null;
  MachineryLocation:any=null;NameDesc:any=null;
  pageSize = 10;SumInsured:any=null;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  allfields:any=false;
  showFirstLastButtons = true;
  p: Number = 1;j: Number= 1;
  count: Number = 20;
  s: Number = 1;
  fds:Number = 1;
  js: Number = 1;
  pa:Number=1;
  ar:Number=1;
  pi:Number=1;emp:Number=1;
  E:Number=1;LocationName:any;
  fd:Number=1;
  ma:Number=1;
  accs:Number=1;
  endorsementSection: boolean;BuildingSuminsured:any;
  orgPolicyNo: string;BuildingAddress:any;
  endorsementId: any;
  enableFieldsList: any[]=[];
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;
  contentRiskSection: boolean=false;
  accessoriesSection:boolean =false;
  electronicEquipSection: boolean=false;
  currencyValue: any;Buildingsections:any=false;
  accidentOccupation: any;
  accidentOccupationId: any;
  liabilityOccupation: any;
  liabilityOccupationId: any;
  totalPASI: number=0;
  currentBuildingIndex: number;
  currentCyberIndex:number;
  enableBuildingEditSection: boolean = false;enableContentEditSection:boolean = false;
  enablePersonalAccEditSection:boolean=false;
  enablePersonalIndEditSection:boolean = false;
  enableElectronicEquipmentSection:boolean = false;
  buildingSIError: boolean=false;
  buildingLocationError: boolean=false;
  buildingAddressError: boolean=false;
  editBuildingSection: boolean=false;
  totalBuildSIError: boolean=false;
  currentContentIndex: number;
  currentPersonalAccidentIndex: number;
  currentPersonalIndIndex: number;
  currentRiskIndex: number;
  MachineryIndex:number;
  editContentSection: boolean;
  editPersonalAccidentSection  : boolean;
  LocationId: any;
  serialNoDesc: any;
  contentRiskDesc: any='';
  contentSI: any='0';
  contentId: null;
  locationIdError: boolean;
  contentIdError: boolean;
  serialNoError: boolean;
  contentDescError: boolean;servantTypeList:any[]=[];
  contentSIError: boolean;constructionTypes:any[]=[];
  seven: boolean=false;eight:boolean = false;
  employeeList:any[]=[];
  currentEmployeeIndex: number;
  editEmployeeSection: boolean=false;
  enableEmployeeEditSection: boolean=false;enableFidelityEditSection:boolean=false;
  enableAllRiskEditSection:boolean=false;
  empAddress: any=null;employeeName: any=null;nationalityList:any[]=[];
  occupationType: any;employeeSalary: any;nationality: any;
  totalEmpIntSI: number;
  actualEmployeeSI: any;
  empDob: any;
  empJoiningDate: any;
  employeeNameError: boolean;
  employeeOccupationError: boolean;
  employeeAddressError: boolean;
  employeeNationalityError: boolean;
  employeeDobError: boolean;
  employeeDojError: boolean;
  employeeSalaryError: boolean;
  enableEmployeeUploadSection: boolean=false;
  enableAllriskEditSection:boolean=false;
  imageUrl: any=null;
  uploadDocList: any[]=[];
  uploadFedDocList:any[]=[];
  employeeUploadRecords: any[]=[];
  employeeUploadRecords1:any[]=[];
  FedUploadRecords:any[]=[];
  fieldsMachinerys:any[]=[];
  showEmpRecordsSection: boolean;
  errorRecords: any[]=[];
  errorRecords1:any[]=[];
  errorRecordsRisk :any[]=[];
  uploadStatus: any;
  closeResult: string;
  errorRowNum: any;accessoriesList:any[]=[];
  employeeErrorList: any[]=[];
  empJoiningMonth: any;
  originalEmployeeList: any[]=[];
  editFidelitySection: boolean=false;fidelityList: any[]=[];
  allrisksList: any[]=[]; fieldsPersonalAccident:any[]=[];
  currentFidelityIndex: number;
  enableFidelityUploadSection: boolean=false;
  enableAllRiskUploadSection: boolean=false;
  enableAllContentUploadSection: boolean=false;
  showFidelityRecordsSection: boolean=false;
  showAllRiskRecordsSection: boolean=false;
  showAllContentRecordsSection:boolean=false;
  selectedProductList:any[]=[];
  editRiskSection:boolean;
  editElectronicSection:boolean;
  originalFidelityList: any;
  totalFidelityIntSI: number;
  empLocation: any;
  employeeLocationError: boolean;
  employeeOccupationList: any[]=[];
  fidelityOccupationList: any[]=[];
  actualFidelitySI: any="0";
  nine: boolean=false;
  showgrids:boolean=false;
  uploadrisk=false;
  uploadcontent=false;
  currentMachineryIndex: number;
  editMachinerySection: boolean;
  totalMachinerySI: number;
  eleven:boolean = false;
  buildingDetailsSection: boolean;
  currentAccessoriesIndex: number;
  currentElectronicIndex:number;
  editAccessoriesSection: boolean;
  enableAccessoriesEditSection: boolean;
  totalAccessoriesSI: any;
  chassisNo: null;
  accessoriesType: null;
  chassisNoError: boolean;
  accessoriesTypeError: boolean;
  sumInsuredError: boolean;
  totalAccSIError: boolean;
  enableAllSection: boolean = false;
  EquipmentSi: any;
  machineryItemId: any;
  MiSumInsured: any;
  actualMachinerySI: any;
  enableCyberSection: boolean = false;
  CyberMake:any;
  DeviceType:any;navItems:any;
  editCyberSection: boolean;
  cyberSectionId: any;
  Cyberyear:any;
  CyberSNo:any;
  fields: any[] = [];
  field:any[]=[];
  fireData:any;
  fieldsContent:any []= [];
  PAFields:any[]=[];
  fieldss:any[]=[];
  Accfieldss:any[]=[];activeTab:any='Location';
  fieldsPersonalInd:any[]=[];
  fieldsDevice:any[]=[];
  fieldsRisk:any[]=[];
  sectionDetailsffff:any[]=[];
  queryHeader1:any[]=[];
  fieldsMachinery:any[]=[];
  fieldsEmpFields:any[]=[];
  fieldFEFields:any[]=[];
  fieldsElectronic:any[]=[];
  fieldsAllRisk :any[]=[];
  fieldsContentRisk:any[]=[];currentContentRowIndex:any=0;
  fieldsMachineryRisk:any[]=[];currentBuildingRowIndex:any=0;
  fieldsEmployee:any[]=[];columnHeaderBuilding:any[]=[];
  fieldsFidelity:any[]=[];TableRowBuilding:any[]=[];
  fileText: any;fileContent: any= '';TableRow:any[]=[];

  formSection: boolean = false; viewSection: boolean = false;
  form = new FormGroup({});

  model = {};
  editPersonalIndSection: boolean;
  enableType: any;
  actualAssSI: any;
  newacc: boolean;
  sectionDetails: any;
  descallrisk: any;
  serialno: any;
  suminsuredallrisk: any;
  indexallrisk: number;
  FirstName: null;
  lastname: null;
  RelationType: null;
  NationalityId: null;
  DateOfBirth: null;
  showmultiple: boolean = false;
  Addtional: any;
  saveSection: boolean =false;
  savedSection: boolean;
  locationlist: any[]=[];
  sumInsuredExceedError: boolean;
  electonicItemError: boolean;
  electronicJoinError: boolean;
  electronicYearError: boolean;bankList:any[]=[];
  electronicMakeModelError: boolean;wallMaterialList:any[]=[];
  electronicSalaryError: boolean;roofMaterialList:any[]=[];
  visibleBuilding: boolean;brokerbranchCode:any=null;
  Total: any=0;visibleContent:boolean=false;
  locationId: any;
  locationName: any;
  columnHeader: any[]=[];
  visibleAllRisk:boolean=false;
  TableRowAllRisk: any[]=[];
  currentAllRiskRowIndex: any=0;
  columnHeaderAllRisk: any[]=[];
  personalLiabilityDialog:boolean=false;
  TableRowPL:  any[]=[];
  countryId: any;
  columnHeaderPersonalLiability: any[]=[];
  columnHeaderPersonalAccident: any[]=[];
  currentPLRowIndex: any=0;
  TableRowDS: any;
  domesticServantDialog: boolean=false;
  currentDSRowIndex: any=0;
  personalAccidentDialog:boolean=false
  TableRowPA: any;
  currentPARowIndex: any=0;
  ActualSI: any;
  newselectedIndex: number;
  ContentTypeError:boolean=false
  SumInsuredError:boolean=false
  ContentRiskDescError:boolean=false
  SerialNoDescError:boolean=false
  constructor(private router: Router,private datePipe:DatePipe,private quoteComponent:QuotationPlanComponent,
     private sharedService: SharedService,public http: HttpClient) {
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    console.log("item received", homeObj);
    this.columnHeaderBuilding =['Construction (Wall)','Construction (Roof)','First Loss Payee','Sum Insured','Edit' ,'Delete']
    // if (homeObj && this.productId!='19' && this.productId!='3') {
    //   this.item = homeObj[0].SectionId;
    //   this.InbuildConstructType=homeObj[0].InbuildConstructType
    //   if(this.item) this.setTabSections();
    // }
    // else{
      // let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      // if (referenceNo) {
      //   this.quoteRefNo = referenceNo;
      //   this.Section = false;
        //this.getEditQuoteDetails();
      //}
    //}
    this.columnHeader =['Content Type *','Serial No','Description','Sum Insured *','Edit' ,'Delete']
          this.TableRow =[{
            id:1,
            ItemId: '',
            Content: '',
            SerialNoDesc : '',
            ContentRiskDesc: '',
            SumInsured: 0,
          }]
          this.columnHeaderAllRisk =['Content Type','Serial No','Description','Sum Insured','Edit' ,'Delete']
          this.TableRowAllRisk =[{
            id:1,
            ItemId:'',
            Content: '',
            Serial : '',
            Description: '',
            SumInsured: 0,
          }];
          this.columnHeaderPersonalLiability =['Occupation *','Name *','Date Of Birth *','Salary *','Edit' ,'Delete'];
          this.columnHeaderPersonalAccident =['Occupation *','Name *','Date Of Birth *','Salary *','Edit' ,'Delete'];
          this.TableRowPL =[{
            id:1,
            OccupationId:'',
            RiskId:'',
            Name: '',
            Nationality: this.countryId,
            Dob: '',
            SerialNo : '',
            SumInsured: 0,
          }]
          this.TableRowDS =[{
            id:1,
            OccupationId:'',
            RiskId:'',
            Name: '',
            Nationality: this.countryId,
            Dob: '',
            SerialNo : '',
            SumInsured: 0,
          }]
          this.TableRowPA =[{
            id:1,
            OccupationId:'',
            RiskId:'',
            Name: '',
            Nationality: this.countryId,
            Dob: '',
            SerialNo : '',
            SumInsured: 0,
          }]
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(this.productId=='5' || this.productId=='29'){
      this.buildingDetailsSection=false;
    }
    else if(this.productId!='43'){
      //this.productId!='43'
      this.buildingDetailsSection=true;
      // let items = this.item?.find((Code) => Code == '1' || Code=='40');
      // console.log('JJJJJJJJJJJJJJJJJJ',items);
    }
    if(this.productId=='43'){
      this.newten = true;
      let fireData = new Medical();
      let entry = [];
      this.fields = fireData?.fields;
      this.getMedicalDetails();
      
    }
    
   


    //this.Section=false;

  }
  public productItem: ProductData;
  ngOnInit(): void {
    //this.changeComponent()
    if(this.productId!='14' && this.productId!='32') this.getOccupationList(null);
    this.getEditQuoteDetails();
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
    this.minDate = new Date(year-18,month,day-1);
    this.maxDate = new Date();
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //this.fourth=false;
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        console.log('Enables fields Section',this.enableFieldsList);
        let enableAllSection = this.enableFieldsList.some(ele=>ele=='domesticRiskDetails' || ele=='AddCovers' || ele=='AccessoriesSI');
        console.log('Enables Add Section',enableAllSection);
        if(enableAllSection) this.enableAllSection=true;
        else this.enableAllSection = false;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        console.log("Enable Obj in Vehicle",this.enableFieldsList,this.endorsementId)
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
    if(this.productId!='63')this.getSumInsuredDetails();
    else{
      this.getConstructionTypeList();
      this.getDomesticServantList();
      this.getRelationShipList();
      this.getWallMaterialList();
      this.getRoofMaterialList();
      this.getFirstLossPayeeList();
      this.getdropList();
    }
    if(this.productId=='59')this.getdropList();
    this.queryHeader1 = [ 'First Name','Last Name','Relation Type','Date Of Birth','Nationality Id'];

    /*this.jsonList = [
      {
        "ApartmentOrBorder": "Y",
      "BuidingAreaSqm": "2000",
      "BuildingBuildYear": "2005",
      "BuildingCondition": "Good",
      "BuildingFloors":"",
      "BuildingUsageYn":"",
      "BuildingUsageId":"",
      "BuildingOccupationType":"",
      "BuildingAddress":"",
      "InbuildConstructType":"",
      "WithoutInhabitantDays":"",


      }
    ]*/
  /*this.ElectronicItem = [
      {
        "ItemId": "",
        "ItemValue": "",
      "MakeAndModel": "",
      "PurchaseMonth": "",
      "PurchaseYear": "",
      "RiskId": "",
      "SerialNo": "",
      "SumInsured": ""
      }
    ]*/

  }
  /*changed(value) {
    this.row.LocationName = value;
  }*/
    getConstructionTypeList(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "wall_type"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          this.constructionTypes = data.Result;
        })
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
           // let defaultObj = [{ 'label': '-Select-', 'value': '' }]
            this.wallMaterialList = data.Result;
           
          }
        },
        (err) => { },
      );
    } 
    getFirstLossPayeeList(){
      let branchCode = '';
      if((this.userType!='Broker' && this.userType!='User')){
        branchCode = this.branchCode
      }
      else{
        branchCode = this.brokerbranchCode
      }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let obj=[{"Code":"None",CodeDesc:"None"}]
            this.bankList = obj.concat(data.Result);
        })
      
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
             // let defaultObj = [{ 'label': '-Select-', 'value': '' }]
              this.roofMaterialList = data.Result;
              // for (let i = 0; i < this.roofMaterialList.length; i++) {
              //   this.roofMaterialList[i].label = this.roofMaterialList[i]['CodeDesc'];
              //   this.roofMaterialList[i].value = this.roofMaterialList[i]['Code'];
              //   delete this.roofMaterialList[i].CodeDesc;
              //   if (i == this.roofMaterialList.length - 1) {
              //     if (this.productId == '1') {
              //       this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
              //     }
              //     else if(this.productId=='59'){
              //       let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
              //       for(let field of fieldList){if(field.key=='RoofType') field.props.options = defaultObj.concat(this.roofMaterialList);}
              //       // field.fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
              //     }
              //     else if(this.productId!='19' && this.productId!='59') {console.log('FFFFFFFF',this.fields[0].fieldGroup[0].fieldGroup[3]); this.fields[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);}
              //     //this.fields[0].fieldGroup[0].fieldGroup[3]
              //     //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
              //     else{
              //       let fields = this.fields[0].fieldGroup;
              //       for(let field of fields){
              //         if(field.props.label=='Burglary'){
              //             field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
              //         }
              //         else if(field.props.label=='Building Details'){
              //           field.fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
              //         }
              //       }
              //     } 
              //   }
              // }
            }
          }
        },
        (err) => { },
      );
    }
    getDomesticServantList(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "Servant TYPE"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          this.servantTypeList = data.Result;
        })
    }
    getRelationShipList(){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "ItemType": "RELATION_TYPE_HOME"
      }
      let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          this.relationList = data.Result;
        })
    }
    onDeleteBuilding(index){
      this.TableRowBuilding.splice(index,1);
      if(this.TableRowBuilding.length==0){
        this.onSaveBuildingList();
      }
    }
    onSaveBuildingList(){
      if (this.TableRowBuilding.length != 0) {
        let i=0,j=0, reqList =[],additionalList=[];
        for(let entry of this.TableRowBuilding){
            if(entry.BuildingUsageId==null || entry.BuildingUsageId=='' || entry.BuildingUsageId==undefined){entry['BuildingUsageId']='1'}
            if(entry.WallType!=null && entry.WallType!='' && entry.WallType!=undefined) entry['WallTypeError']=false;
            else{ j+=1; entry['WallTypeError']=true;}
            if(entry.RoofType!=null && entry.RoofType!='' && entry.RoofType!=undefined) entry['RoofTypeError']=false;
            else{ j+=1; entry['RoofTypeError']=true;}
            if(entry.BuildingSumInsured!=null && entry.BuildingSumInsured!='' && entry.BuildingSumInsured!=undefined && entry.BuildingSumInsured!=0 && entry.BuildingSumInsured!='0') entry['SumInsuredError']=false;
            else{ j+=1; entry['SumInsuredError']=true;}
            if(entry.FirstLossPayee!=null && entry.FirstLossPayee!='' && entry.FirstLossPayee!=undefined && entry.FirstLossPayee!=0) entry['FirstLossPayeeError']=false;
            else{ j+=1; entry['FirstLossPayeeError']=true;}
            let entryList = this.TableRowBuilding.filter(ele=>(ele.RiskId==entry.RiskId) && ele.RiskId!=null && ele.RiskId!='');
            if(entryList.length>1){
              j+=1;
              for(let obj of entryList) obj['DuplicateError'] = true;
            }
            else{entry['DuplicateError']=false}
              let data = {
                  "ItemId":this.locationId,
                  "RiskId":entry.RiskId,
                  "BuildingUsageId":entry.BuildingUsageId,
                  "BuildingBuildYear": entry.BuildingBuildYear,
                  "WallType":entry.WallType,
                  "RoofType":entry.RoofType,
                  "BuildingSumInsured":entry.BuildingSumInsured,
                  "LocationName": this.locationName,
              }
              let additonalData = {
                "BuildingSuminsured": entry.BuildingSumInsured,
                "BuildingAddress": entry.BuildingAddress,
                "Createdby": this.loginId,
                "InbuildConstructType": null,
                "QuoteNo": sessionStorage.getItem('quoteNo'),
                "RequestReferenceNo": this.quoteRefNo,
                "SectionId": "1",
                "RiskId":entry.RiskId,
                "LocationName": this.locationName,
                "LocationId": this.locationId
              }
              additionalList.push(additonalData);
              reqList.push(data);
              i+=1;
              if(i==this.TableRowBuilding.length && j==0){this.SaveBuildingList(additionalList)}
        }
      }
      else{ }
    }
    addRowBuilding(){
      const newItem = { id: this.TableRowBuilding.length + 1, BuildingUsageId: '', BuildingBuildYear : '',FirstLossPayee: '',SavedYN:'N',
      WallType: '',RoofType: '', BuildingSumInsured: 0,LocationName:'',RiskId:this.TableRowBuilding.length + 1};
      this.TableRowBuilding.push(newItem);
      this.currentBuildingRowIndex = this.TableRowBuilding.length-1;
      console.log("Final Table Row",this.TableRowBuilding)
    }
    addRow() {
      const newItem = { id: this.TableRow.length + 1,ItemId:'', Content: '', SerialNoDesc: '',ContentRiskDesc:'',SumInsured:0 };
      this.TableRow.push(newItem);
      this.currentContentRowIndex = this.TableRow.length-1;
    }
    getTotal(){
      this.Total = 0;let i=0;
      if(this.TableRow.length!=0){
        for(let tot of this.TableRow){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
          i+=1;
          if(i==this.TableRow.length){
            this.TableRow['ContentSI'] = this.Total;
            return this.Total;
          }
        }
      }
      else return 0;
          
    }
    getTotalBuilding(){
      this.Total = 0;let i=0;
      if(this.TableRowBuilding.length!=0){
        for(let tot of this.TableRowBuilding){
          if(tot.BuildingSumInsured!=null && tot.BuildingSumInsured!='' && tot.BuildingSumInsured!=undefined) tot.BuildingSumInsured = Number(tot.BuildingSumInsured);
          this.Total=this.Total+tot.BuildingSumInsured;
          i+=1;
          if(i==this.TableRowBuilding.length){
          
            this.productItem.BuildingSuminsured = this.Total;
            if(this.fields.length!=0){
              let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='BuildingBuildYear' && this.insuranceId=='100004'){
                  field.props.options = this.getYearList();
                }
                if(field.key=='BuildingSuminsured'){
                    field.templateOptions.disabled = false;
                    field.formControl.setValue(this.Total);
                    field.templateOptions.disabled = false;
                }
              }
            }
            return this.Total;
          }
        }
      }
      //else{this.productItem.BuildingSuminsured = 0;return 0;} 
          
    }
    getYearList(){
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      const currentYear = new Date().getFullYear()-20, years = [];
      while ( year >= currentYear ) {
        let yearEntry = year--
        years.push({"Code":String(yearEntry),"CodeDesc":String(yearEntry),"label":String(yearEntry),"value":String(yearEntry)});
      }   
      return [{"label":"---Select---","value":null,"Code":"---Select---","CodeDesc":""}].concat(years);
    }
    getRoofTypeDescription(RoofType) {
      let entry = this.roofMaterialList.find(ele=>ele.Code==RoofType);
      if(entry){
        return entry.CodeDesc;
      }
      else return '';
    }
    getFirstLossDesc(rowData){
      let entry = this.bankList.find(ele=>ele.Code==rowData.FirstLossPayee);
      if(entry){
        return entry.CodeDesc;
      }
      else return '';
    }
    onChangeFirstLoss(entry){
    }
    SaveBuildingList(datas){
        
          let urlLink = `${this.motorApiUrl}api/buildingdetails`;
            this.sharedService.onPostMethodSync(urlLink, datas).subscribe(
              (data: any) => {
                if (data?.Result) {
                  if(data.Result.length!=0){
                    sessionStorage.setItem('quoteReferenceNo', this.quoteRefNo);
                  }
                }
            },
            (err) => { },
          );
      
    }
    CommaFormatted(rowData,type) {
      // format number
      if (type=='Building') {
        if(rowData.BuildingSI) rowData.BuildingSI = String(rowData.BuildingSI).replace(/[^0-9.]|(?<=\..*)\./g, "")
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if(type=='Content'){
        if(rowData.ContentSI) rowData.ContentSI = String(rowData.ContentSI).replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if(type=='AllRisk'){
        if(rowData.AllRiskSI) rowData.AllRiskSI = String(rowData.AllRiskSI).replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if(type=='PL'){
        if(rowData.PersonalLiabilitySI) rowData.PersonalLiabilitySI = String(rowData.PersonalLiabilitySI).replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if(type=='Domestic'){
        if(rowData.ServantSI) rowData.ServantSI = String(rowData.ServantSI).replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if(type=='PA'){
        if(rowData.DeathSI) rowData.DeathSI = String(rowData.DeathSI).replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  checkEndorseDisable(type){
      if(this.endorsementSection){

        if(this.enableAllSection){
            return true;
        }
        else {
          return false;
        }
            // if(type =='building') return (!this.buildingSection && !this.enableAllSection);           
            // else if(type=='content') return (!this.contentRiskSection && !this.enableAllSection);
            // else if(type=='personalAccident') return (!this.personalAccidentSection && !this.enableAllSection);
            // else if(type == 'personalIndeminity') return (!this.personalIntermeditySection && !this.enableAllSection);
            // else if(type=='allRisk') return (!this.allRiskSection && !this.enableAllSection);
            // else if(type == 'electronic') return (!this.electronicEquipSection && !this.enableAllSection);
            // else if(type == 'accessories' && this.enableAllSection || this.accessoriesSection) {
            //   return true;
            // }
            // else if(type == 'accessories' && !this.enableAllSection || !this.accessoriesSection) {
            //     return (!this.accessoriesSection && !this.enableAllSection);}
            //else if(type == 'accessories') return (!this.accessoriesSection && !this.enableAllSection);
      }
      else return true;
  }
  setTabSections(){
   
    if(this.productId=='42'){
      this.cyberSectionId=this.item[0];

      this.ten=true;
      let fireData = new DeviceDetails();
      let entry = [];
      this.fieldsDevice = fireData?.fields;
      this.form = new FormGroup({});
      this.productItem = new ProductData();
      this.productItem.AccOccupation = this.accidentOccupation;
      console.log('ten',this.fieldsDevice);  
      // this.CyberItem=[{'Make':'Honda','DeviceType':'1','Making':'2022','SerialNo':1,"DeviceTypeDesc":"Desktop","SumInsured":"123,45"}];
    }
    //if(this.productId=='19' || this.productId=='3'){
      if(this.productId == '56' || this.productId =='60'){
        // this.buildingSection = false;
        this.eleven = true;

        // this.ngOnChanges();
        this.getRelationTypeList();
        this.getHealthData();
        // this.filteredList = [{'FirstName':'','LastName':'','RelationType':'','NationalityId':'','EmployeeId':'','DateOfBirth':'','RiskId':''}];
        //this.ngOnChanges();
      }
      //if(this.sectionDetails.length!=0){
        let items = this.sectionDetails.find((ele) => ele.SectionId == 1 || (this.productId=='19' && ele.SectionId==40));
        if(items){
          if(items?.AddDetailYn=='Y'){
            this.sumInsured=true;
            let fireData = new LocationDetails();
            let entry = [];
            this.field = [
              {
                    fieldGroupClassName: 'row buildingsuminsureds',
                    fieldGroup: [
                          {
                            type: 'commaSeparator',
                            key: 'BuildingSumInsureds',
                            className: 'col-sm-5 offset-lg-1 offset-md-1',
                            props: {
                              maxLength: 15,
                              label: `Sum Insured`,
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {
                              onInit: (field: FormlyFieldConfig) => {
                                field.formControl.valueChanges.subscribe(() => {
                                  this.individualCommaFormatted('building');
                                });
                              },
                            },
                            expressions: {
                            },
                          },
                      
                    ]
              }
            ];
            this.fieldss = fireData?.fields.concat(this.field);  
            this.Addtional=true;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            this.formSection = true; this.viewSection = false;
          }
          else{
            this.sumInsured =false;
            this.Addtional=false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            console.log('DDDDDDDDDDDDDDD',this.fieldss)
            console.log('dddddddddddddddddd')
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            this.formSection = true; this.viewSection = false;
          }
        }
        else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            this.formSection = true; this.viewSection = false;
        }
        let first = this.sectionDetails.find((ele) => ( ele.SectionId == 47));
        if(first){
          if(first?.AddDetailYn=='Y'){
            this.first=true;
            let fireData = new ContentRisk();
            let entry = [];
            this.fieldsContent = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('content')
              });
            } }
            for(let x of this.fieldsContent){
              let vars = x.fieldGroup[0].fieldGroup[0];
              let j=0;
              for( let n of vars.fieldGroup){               
                if(n.type=='commaSeparator'){
                if(n.templateOptions.label=='Sum Insured'){
                   this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                }
              }
                j+=1;
              }
        }

        //location
        let regionHookss ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.contentypes()
          });
        } }
        for(let x of this.fieldsContent){
          let vars = x.fieldGroup[0].fieldGroup[0];
          let j=0;
          console.log('varss',vars.fieldGroup,this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0])    
          for( let n of vars.fieldGroup){      
            if(n.type=='ngselect'){
            if(n.key== 'ContentLocation'){
              this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHookss;
            }
          }
            j+=1;
          }
    }
            //this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
          }
          else {
            this.first =false;
          }
        }
        else {
          this.first =false;
        }
        this.second = this.sectionDetails.find((ele) => ele.SectionId == 35);
        this.changeComponent();
        if (this.second){
        
          
          if(this.second?.AddDetailYn=='Y'){
            this.second = true;
            let fireData = new PersonalAccident();
            let entry = [];
            this.fieldsPersonalAccident = fireData?.fields;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('PersonalAccident');
              });
            } }
            for(let x of this.fieldsPersonalAccident){
              let vars = x.fieldGroup[0].fieldGroup[0];
              let j=0;
              for( let n of vars.fieldGroup){               
                if(n.type=='commaSeparator'){
                if(n.templateOptions.label=='Salary'){
                   this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                }
              }
                j+=1;
              }
        }
            //this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
          }
          else{
            this.second = false;
            this.productItem.AccOccupation = this.accidentOccupation;
            // let fieldList = this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup;
            // console.log("Final Field List",fieldList)
          }
        }
        else this.second = false;
        this.productItem.AccOccupation = this.accidentOccupation;

        const third = this.sectionDetails.find((ele) => ele.SectionId == 3);
        if (third){
          if(third?.AddDetailYn=='Y'){
            this.third = true;
            let fireData = new AllRisks();
            let entry = [];
            this.fieldsRisk = fireData?.fields;
            //this.fieldsAllRisk//fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('AllRisk');
              });
            } }
            for(let x of this.fieldsRisk){
              let vars = x.fieldGroup[0].fieldGroup[0];
              let j=0;
              for( let n of vars.fieldGroup){            
                if(n.type=='commaSeparator'){
                if(n.templateOptions.label=='Sum Insured'){
                   this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                }
              }
                j+=1;
              }
        }
            //this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
            this.getallriskList();
          }
          else this.third = false;
        }
        else this.third = false;

        const fifth = this.sectionDetails.find((ele) => ele.SectionId== 36);
        
        if(fifth){
         
            if(fifth?.AddDetailYn=='Y'){
              
              this.fifth = true;
              let fireData = new PersonalIndemenitys();
              let entry = [];
              this.fieldsPersonalInd = fireData?.fields;
              this.form = new FormGroup({});
              this.productItem = new ProductData();
              this.productItem.AccOccupation = this.accidentOccupation;
              console.log('fifth',this.fieldsPersonalInd);
  
              let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.individualCommaFormatted('PersonalInd');
                });
              } }
              for(let x of this.fieldsPersonalInd){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let j=0;
                for( let n of vars.fieldGroup){            
                  if(n.type=='commaSeparator'){
                  if(n.templateOptions.label=='Salary'){
                     this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                  }
                }
                  j+=1;
                }
          }
              //this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
            }
            else this.fifth = false;
            this.changeComponent();
        }
        else this.fifth = false;
       // const six = this.sectionDetails.find((ele) => ele.SectionId== 39); 
       const six ={AddDetailYn:'Y'};
        if(six){
          if(six?.AddDetailYn=='Y'){
            this.six = true;
            let fireData = new ElectronicEquip();
            let entry = [];
            this.fieldsElectronic = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('Electronicequip');
              });
            } }
            for(let x of this.fieldsElectronic){
              let vars = x.fieldGroup[0].fieldGroup[0];
              let j=0;
              for( let n of vars.fieldGroup){            
                if(n.type=='commaSeparator'){
                if(n.templateOptions.label=='Sum Insured'){
                   this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                }
              }
                j+=1;
              }
            }
            
            //this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].hooks = regionHooks;
            this.monthList = [
              {"Code":"01","CodeDesc":"January"},
              {"Code":"02","CodeDesc":"February"},
              {"Code":"03","CodeDesc":"March"},
              {"Code":"04","CodeDesc":"April"},
              {"Code":"05","CodeDesc":"May"},
              {"Code":"06","CodeDesc":"June"},
              {"Code":"07","CodeDesc":"July"},
              {"Code":"08","CodeDesc":"August"},
              {"Code":"09","CodeDesc":"September"},
              {"Code":"10","CodeDesc":"October"},
              {"Code":"11","CodeDesc":"November"},
              {"Code":"12","CodeDesc":"December"},
            ]
              for (let i = 0; i < this.monthList.length; i++) {
                let defobj=[{'label':'--Select--','value':null}];
                this.monthList[i].label = this.monthList[i]['CodeDesc'];
                this.monthList[i].value = this.monthList[i]['Code'];
                delete this.monthList[i].CodeDesc;
                if (i == this.monthList.length - 1) {
                  for(let x of this.fieldsElectronic){
                    let vars = x.fieldGroup[0].fieldGroup[0];
                    let j=0;
                    for( let n of vars.fieldGroup){            
                      if(n.type=='ngselect'){
                      if(n.props.label=='Purchase Month'){
                         this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defobj.concat(this.monthList);
                      }
                    }
                      j+=1;
                    }
              }
                  //this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options= this.monthList;
                }
              }
              this.setElectronicDropdowns('direct');
              if(this.productId!='14' && this.productId!='32') this.getElectronicEquipment('direct');
              //this.Electronic();
          }
          else this.six = false;
        }
        else this.six = false;
        const seven = this.sectionDetails.find((ele) => ele.SectionId== 37 || ele.SectionId == 38 || ele.SectionId == 45 || ele.SectionId == 43);
        if(seven){
          if(seven?.AddDetailYn=='Y'){
            this.seven = true;
            this.getEmployeeDetails();
            this.getOccupationList(seven.SectionId);
            let fireData = null;
            if(this.productId=='14'){fireData = new EmployeeLiablityss();}
            else if(this.productId=='32'){fireData = new Fidelitytwo();}
            let entry = [];
            this.fieldsEmpFields = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
              });
            } }
            for(let x of this.fieldsEmpFields){
              let vars = x.fieldGroup[0].fieldGroup[0];
              let j=0;
              for( let n of vars.fieldGroup){               
                if(n.type=='commaSeparator'){
                  if(n.templateOptions.label=='Salary'){
                    this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                  }
                }
                
                j+=1;
              }
            }
            //this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
            this.monthList = [
              {"Code":"01","CodeDesc":"January"},
              {"Code":"02","CodeDesc":"February"},
              {"Code":"03","CodeDesc":"March"},
              {"Code":"04","CodeDesc":"April"},
              {"Code":"05","CodeDesc":"May"},
              {"Code":"06","CodeDesc":"June"},
              {"Code":"07","CodeDesc":"July"},
              {"Code":"08","CodeDesc":"August"},
              {"Code":"09","CodeDesc":"September"},
              {"Code":"10","CodeDesc":"October"},
              {"Code":"11","CodeDesc":"November"},
              {"Code":"12","CodeDesc":"December"},
            ]
              // for (let i = 0; i < this.monthList.length; i++) {
              //   this.monthList[i].label = this.monthList[i]['CodeDesc'];
              //   this.monthList[i].value = this.monthList[i]['Code'];
              //   delete this.monthList[i].CodeDesc;
              //   if (i == this.monthList.length - 1) {
              //     for(let x of this.fieldsEmpFields){
              //       let vars = x.fieldGroup[0].fieldGroup[0];
              //       let j=0;
              //       for( let n of vars.fieldGroup){             
              //         if(n.type=='ngselect'){
              //         if(n.props.label=='Joining Period'){
              //            this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = this.monthList;
              //         }
              //       }
              //         j+=1;
              //       }
              // }
              //     //this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
              //   }
              // }
          }
          else this.seven = false;
        }
        else this.seven = false;
        const eight = this.sectionDetails.find((ele) => ele.SectionId == 43);
        if(eight){
          if(eight?.AddDetailYn=='Y'){
            this.eight = true;
          this.getFidelityDetails();
          this.getOccupationList(eight.SectionId);
          //let fireData = new Fedilitis();
          let entry = [];
          //this.fieldFEFields = fireData?.fields;
          this.form = new FormGroup({});
          this.productItem = new ProductData();
          this.productItem.AccOccupation = this.accidentOccupation;
          console.log('eight',this.fieldFEFields);
  
          let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.individualCommaFormatted('fidelity');
            });
          } }
          for(let x of this.fieldFEFields){
            console.log('NNNNNNNNNNNNNNNN',x.fieldGroup[0].fieldGroup[0]);
            let vars = x.fieldGroup[0].fieldGroup[0];
            console.log('vars',vars);
            let i=0;
            for( let n of vars.fieldGroup){
              console.log('vars',n.templateOptions);
              if(n.type== 'commaSeparator')
              if(n.templateOptions.label=='Salary'){
                 this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[i].hooks = regionHooks;
              }
              i+=1;
            }

      }
          //this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
          this.monthList = [
            {"Code":"01","CodeDesc":"January"},
            {"Code":"02","CodeDesc":"February"},
            {"Code":"03","CodeDesc":"March"},
            {"Code":"04","CodeDesc":"April"},
            {"Code":"05","CodeDesc":"May"},
            {"Code":"06","CodeDesc":"June"},
            {"Code":"07","CodeDesc":"July"},
            {"Code":"08","CodeDesc":"August"},
            {"Code":"09","CodeDesc":"September"},
            {"Code":"10","CodeDesc":"October"},
            {"Code":"11","CodeDesc":"November"},
            {"Code":"12","CodeDesc":"December"},
          ]
            for (let i = 0; i < this.monthList.length; i++) {
              this.monthList[i].label = this.monthList[i]['CodeDesc'];
              this.monthList[i].value = this.monthList[i]['Code'];
              delete this.monthList[i].CodeDesc;
              if (i == this.monthList.length - 1) {
                for(let x of this.fieldFEFields){
                  console.log('NNNNNNNNNNNNNNNN',x.fieldGroup[0].fieldGroup[0]);
                  let vars = x.fieldGroup[0].fieldGroup[0];
                  console.log('vars',vars);
                  let j=0;
                  for( let n of vars.fieldGroup){   
                    console.log('templates',n.type);              
                    if(n.type=='ngselect'){
                      console.log('templates111',n.props.label);
                    if(n.props.label=='Joining Period'){
                       this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = this.monthList;
                    }
                  }
                    j+=1;
                  }
            }
                //this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
              }
            }
          }
          else this.eight = false;
        }
        else this.eight = false;
        const nine = this.sectionDetails.find((ele) => ele.SectionId == 41);
        if (nine) {
          if(nine?.AddDetailYn=='Y'){
            this.nine = true;
            let fireData = new Machineryss();
            let entry = [];
            this.fieldsMachinery = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            console.log('nine',this.fieldsMachinery);
  
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('machinery');
              });
            } }
            for(let x of this.fieldsMachinery){
              let vars = x.fieldGroup[0].fieldGroup[0];
              let j=0;
              for( let n of vars.fieldGroup){             
                if(n.type=='commaSeparator'){
                if(n.templateOptions.label=='Sum Insured'){
                   this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].hooks = regionHooks;
                }
              }
                j+=1;
              }
        }
            //this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].hooks = regionHooks;
            this.getallriskMachinery();
            this.getMachineryRisk();
          }
          else this.nine = false;
        }
        else this.nine = false;
      // }
      // else{
      //       this.sumInsured =false;
      //       let fireData = new LocationDetails();
      //       this.fieldss = fireData?.fields;  
      //       this.productItem = new ProductData();
      //       this.productItem.AccOccupation = this.accidentOccupation;
      //       this.formSection = true; this.viewSection = false;
      // }
    // }
    // else if(this.item){
    //     let items = this.item.find((Code) => Code == '1' || Code=='40');
    //     if (items) {
    //       this.sumInsured=true;
    //       let fireData = new LocationDetails();
    //       let entry = [];
    //       this.field = [
    //         {
    //               fieldGroupClassName: 'row buildingsuminsureds',
    //               fieldGroup: [
    //                     {
    //                       type: 'commaSeparator',
    //                       key: 'BuildingSumInsureds',
    //                       className: 'col-sm-5 offset-lg-1 offset-md-1',
    //                       props: {
    //                         label: `Sum Insured`,
    //                       },
    //                       validators: {
    //                         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
    //                       },
    //                       hooks: {
    //                         onInit: (field: FormlyFieldConfig) => {
    //                           field.formControl.valueChanges.subscribe(() => {
    //                             this.individualCommaFormatted('building');
    //                           });
    //                         },
    //                       },
    //                       expressions: {
    //                       },
    //                     },
                    
    //               ]
    //         }
    //       ];
    //       this.fieldss = fireData?.fields.concat(this.field);  
    //       this.productItem = new ProductData();
    //       this.formSection = true; this.viewSection = false;
    //       console.log('GGGGGGGGGGGGGGGG')    
    //     }
    //     else {
    //       this.sumInsured =false;
    //       let fireData = new LocationDetails();
    //       this.fieldss = fireData?.fields;  
    //       console.log('dddddddddddddddddd')
    //       this.productItem = new ProductData();
    //       this.formSection = true; this.viewSection = false;      
    //     }
    //     let first = this.item.find((Code) => Code == '47' || Code=='40');
    //     if (first && this.productId!='6' && this.productId!='19') {
    //       this.first=true;
    //       let fireData = new ContentRisk();
    //       let entry = [];
    //       this.fieldsContent = fireData?.fields;
    //       let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //         field.formControl.valueChanges.subscribe(() => {
    //           this.individualCommaFormatted('content')
    //         });
    //       } }
    //       //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
    //       this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
    //       // this.getMedicalDetails();
    //     }
    //     else {
    //       this.first =false;
    //     }
    //   const second = this.item.find((Code) => Code == '35');
    //   if (second && this.productId!='19') {
    //     this.second = true;
    //     let fireData = new PersonalAccident();
    //     let entry = [];
    //     this.fieldsPersonalAccident = fireData?.fields;

    //     console.log('Second',this.fieldsPersonalAccident);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('PersonalAccident');
    //       });
    //     } }
    //     this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
    //     // this.productItem.AccOccupation = this.accidentOccupation;
    //   }
    //   else {
    //     this.second = false;
    //   }
    //   const third = this.item.find((Code) => Code == '3');
    //   if (third && this.productId!='21' && this.productId!='19') {
    //     this.third = true;
    //     let fireData = new AllRisks();
    //     let entry = [];
    //     this.fieldsRisk = fireData?.fields;

    //     console.log('third',this.fieldsRisk);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('AllRisk');
    //       });
    //     } }
    //     this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
    //     this.getallriskList();
    //   }
    //   else {
    //     this.third = false;
    //   }
    //   const fifth = this.item.find((Code) => Code == '36');
    //   if (fifth && this.productId!='19') {

    //     this.fifth = true;


    //     let fireData = new PersonalIndemenitys();
    //     let entry = [];
    //     this.fieldsPersonalInd = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('fifth',this.fieldsPersonalInd);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('PersonalInd');
    //       });
    //     } }
    //     this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
    //   }
    //   else {
    //     this.fifth = false;
    //   }
    //   const six = this.item.find((Code) => Code == '39');
    //   if (six && this.productId!='19') {
    //     this.six = true;
    //     let fireData = new ElectronicEquip();
    //     let entry = [];
    //     this.fieldsElectronic = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('sssssssssiiiiiiiiiixxxxxxxx',this.fieldsElectronic);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('Electronicequip');
    //       });
    //     } }
    //     this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].hooks = regionHooks;
    //     this.monthList = [
    //       {"Code":"01","CodeDesc":"January"},
    //       {"Code":"02","CodeDesc":"February"},
    //       {"Code":"03","CodeDesc":"March"},
    //       {"Code":"04","CodeDesc":"April"},
    //       {"Code":"05","CodeDesc":"May"},
    //       {"Code":"06","CodeDesc":"June"},
    //       {"Code":"07","CodeDesc":"July"},
    //       {"Code":"08","CodeDesc":"August"},
    //       {"Code":"09","CodeDesc":"September"},
    //       {"Code":"10","CodeDesc":"October"},
    //       {"Code":"11","CodeDesc":"November"},
    //       {"Code":"12","CodeDesc":"December"},
    //     ]
    //       for (let i = 0; i < this.monthList.length; i++) {
    //         this.monthList[i].label = this.monthList[i]['CodeDesc'];
    //         this.monthList[i].value = this.monthList[i]['Code'];
    //         delete this.monthList[i].CodeDesc;
    //         if (i == this.monthList.length - 1) {
    //           this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options= this.monthList;
    //         }
    //       }
    //   }
    //   else {
    //     this.six = false;
    //   }
    //   const seven = this.item.find((Code) =>Code =='37' || Code == '38' || Code == '45');
    //   if(seven && this.productId!='19'){
    //     this.seven = true;
    //     this.getEmployeeDetails();
    //     this.getOccupationList(seven);

    //     let fireData = new EmployeeLiablityss();
    //     let entry = [];
    //     this.fieldsEmpFields = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('Seven',this.fieldsEmpFields);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('employee');
    //       });
    //     } }
    //     this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
    //     this.monthList = [
    //       {"Code":"01","CodeDesc":"January"},
    //       {"Code":"02","CodeDesc":"February"},
    //       {"Code":"03","CodeDesc":"March"},
    //       {"Code":"04","CodeDesc":"April"},
    //       {"Code":"05","CodeDesc":"May"},
    //       {"Code":"06","CodeDesc":"June"},
    //       {"Code":"07","CodeDesc":"July"},
    //       {"Code":"08","CodeDesc":"August"},
    //       {"Code":"09","CodeDesc":"September"},
    //       {"Code":"10","CodeDesc":"October"},
    //       {"Code":"11","CodeDesc":"November"},
    //       {"Code":"12","CodeDesc":"December"},
    //     ]
    //       for (let i = 0; i < this.monthList.length; i++) {
    //         this.monthList[i].label = this.monthList[i]['CodeDesc'];
    //         this.monthList[i].value = this.monthList[i]['Code'];
    //         delete this.monthList[i].CodeDesc;
    //         if (i == this.monthList.length - 1) {
    //           this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
    //         }
    //       }
    //    } 
    //    else this.seven = false;
    //    const eight = this.item.find((Code) => Code == '43');
    //     if(eight && this.productId!='19'){
    //     this.eight = true;
    //     this.getFidelityDetails();
    //     this.getOccupationList(eight);
    //     let fireData = new Fedilitis();
    //     let entry = [];
    //     this.fieldFEFields = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('eight',this.fieldFEFields);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('fidelity');
    //       });
    //     } }
    //     this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
    //     this.monthList = [
    //       {"Code":"01","CodeDesc":"January"},
    //       {"Code":"02","CodeDesc":"February"},
    //       {"Code":"03","CodeDesc":"March"},
    //       {"Code":"04","CodeDesc":"April"},
    //       {"Code":"05","CodeDesc":"May"},
    //       {"Code":"06","CodeDesc":"June"},
    //       {"Code":"07","CodeDesc":"July"},
    //       {"Code":"08","CodeDesc":"August"},
    //       {"Code":"09","CodeDesc":"September"},
    //       {"Code":"10","CodeDesc":"October"},
    //       {"Code":"11","CodeDesc":"November"},
    //       {"Code":"12","CodeDesc":"December"},
    //     ]
    //       for (let i = 0; i < this.monthList.length; i++) {
    //         this.monthList[i].label = this.monthList[i]['CodeDesc'];
    //         this.monthList[i].value = this.monthList[i]['Code'];
    //         delete this.monthList[i].CodeDesc;
    //         if (i == this.monthList.length - 1) {
    //           this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
    //         }
    //       }
    //     } 
    //     else this.eight = false;
    //    const nine = this.item.find((Code) => Code == '41');
    //     if (nine && this.productId!='16' && this.productId!='19') {
    //       this.nine = true;
    //       let fireData = new Machineryss();
    //       let entry = [];
    //       this.fieldsMachinery = fireData?.fields;
    //       this.form = new FormGroup({});
    //       this.productItem = new ProductData();
    //       console.log('nine',this.fieldsMachinery);
  
    //       let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //         field.formControl.valueChanges.subscribe(() => {
    //           this.individualCommaFormatted('machinery');
    //         });
    //       } }
    //       this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].hooks = regionHooks;
    //       this.getallriskMachinery();
    //       this.getMachineryRisk();
    //     }
    //     else {
    //       this.nine = false;
    //     }
    // }
   

    
  }
  newjsonfile(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
    "ProductId": this.productId,
    "OptedSectionIds":this.item
    }
    let urlLink = `${this.CommonApiUrl}master/getoptedsectionadditionalinfo`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){ 
          this.sectionDetails = data.Result;
          this.setTabSections();
          this.getbuilding();
          //      if(this.sectionDetails.length!=0){
          // console.log('Newssssssss',this.sectionDetails);
          //      let i=1;
          //      for(let x of this.sectionDetails){
          //      let veh = x.JsonPath;
          //      this.getpath(veh,x.SectionName,i);
          //      console.log('XXXXXXXX',veh);
          //       i+=1;
          //      }
          //     }
          //     else{
          //       alert('JJJJJJJJJJ')
          //       this.setTabSections();
          //       this.getbuilding();
          //     }
        }
      },
      (err) => { },
    );
  }

  // getpath(rowdata,SectionName,j){
  //   console.log('SectionName',SectionName);
  //   let urlLink = `${this.CommonApiUrl}document/downloadbase64`;
  //   this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowdata).subscribe(
  //     (data: any) => {
  //       this.http.get(data?.Result?.ImgUrl, { responseType: 'text' as 'json' }) 
  //       .subscribe((res : any) => { 
  //          console.log("Resss",res)
  //         let json = this.cleanString(res);
  //         console.log('parse',JSON.parse(json));
  //         let values=JSON.parse(json);
  //         var d = new Date();
  //         var year = d.getFullYear();
  //         var month = d.getMonth();
  //         var day = d.getDate();
  //         let dobDate = new Date(year - 18, month, day);
  //         let i=0;
  //           for (let x of values){
  //           if (x.type == 'ngselect'){
  //             x.props.options=[];
  //             x.options=[];
  //           }
  //           if(x.type == 'datepicker'){
  //             console.log('ttyyyy',x.props.datepickerOptions.max);
  //             x.props.datepickerOptions.max=dobDate;
  //             console.log('ttyyyy1',x.props.datepickerOptions.max);
  //           }
  //           i+1;
  //         }
  //         if(SectionName=='All Risk'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           //this.fieldsAllRisk = [
  //             this.fieldsRisk=[
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         } 
  //         else if(SectionName=='Machinery Breakdown'){
  //           this.fieldsMachineryRisk = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }   
  //         else if(SectionName=='Content' || SectionName=='House Hold Contents'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           this.fieldsContent = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }   
  //         else if(SectionName=='WC/EL'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           this.fieldsEmpFields = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }  
  //         else if(SectionName=='Fidelity Guarantee'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           this.fieldFEFields = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }   
  //         else if(SectionName=='Book Test' || SectionName=='Electronic Equipments'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           this.fieldsElectronic = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }   
  //         else if(SectionName=='Personal Accident'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           this.fieldsPersonalAccident = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }   
  //         else if(SectionName=='Personal Indemenity'){
  //           console.log('JJJJJJJJJJJJJJJ',j)
  //           this.fieldsPersonalInd = [
  //             {
                
  //               fieldGroup: [
  //                 {
  //                   fieldGroupClassName: 'row',
  //                   fieldGroup: [
  //                     {
  //                       fieldGroupClassName: 'row',
  //                       fieldGroup: values
  //                     }
  //                   ]
  //                 }
  //               ]
             
  //             }
  //           ];
  //         }   

                          
  //         console.log('Jsons',this.fieldsAllRisk);
  //         console.log('Jsons1',this.fieldsContentRisk); 
  //         console.log('Jsons2',this.fieldsMachineryRisk); 
  //         console.log('Jsssssssssss',j,this.sectionDetails.length)  
  //         if(j==this.sectionDetails.length){
  //           this.setTabSections();
  //           this.getbuilding();
  //          }
  //       }); 
  //     },
  //     (err) => { },
  //   );
   
  // }

  cleanString(str) {
    str = str.replace('"[', '[');
    str = str.replace(']"', ']');
    // str = str.replace('"{', '{');
    // str = str.replace('}"', '}');
    return str;
  } 
  checkSectionVisible(index,value){
    return this.locationlist[index].SectionDetails.some(ele=>ele['SectionId']==value);
  }

  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          console.log("Data**",data?.Result);
          this.quoteDetails = data?.Result?.QuoteDetails;
          this.Riskdetails = data?.Result?.RiskDetails;
          this.locationlist = data?.Result?.LocationDetails;
          let details = data.Result;
          let locationList = [];
          if(details.LocationDetails) locationList = details.LocationDetails;
          if(locationList.length!=0) {
              this.LocationList = [];
              let i =0;
              for(let entry of locationList){
                  let obj = {
                      "LocationId":entry.LocationId,"LocationName":entry.LocationName
                  }
                  let subDetails = entry.SectionDetails;
                  console.log(subDetails,"subDetails");
                  for(let Si of subDetails){
                    this.ActualSI =Si.SumInsured;
                  }
                  // if(entry.HumanListDetails) subDetails = subDetails.concat(entry.HumanListDetails);
                  let persAcc = subDetails.filter(ele=>ele['SectionId']=='138')
                  if(persAcc.length!=0){obj['DeathSI']=String(persAcc[0]['SumInsured']);this.CommaFormatted(obj,'PA');obj['RelationType']=persAcc[0].RelationType;obj['OriginalRiskId']=persAcc[0].RiskId  }
                  else{obj['DeathSI']=null;obj['RelationType']=null;}
                  let build = subDetails.filter(ele=>ele['SectionId']=='1')
                  if(build.length!=0){
                    if(build[0]['SumInsured']){obj['BuildingSI']=String(build[0]['SumInsured']);this.CommaFormatted(obj,'Building');} 
                    if(build[0]['OutbuildConstructType']){ obj['BuildingType']=build[0]['OutbuildConstructType'];}
                    else obj['BuildingType']=null;
                    obj['OriginalRiskId']=build[0].RiskId  }
                  else{obj['BuildingSI']=null;obj['BuildingType']=null;}
                  let content = subDetails.filter(ele=>ele['SectionId']=='47')
                  if(content.length!=0){obj['ContentSI']=String(content[0]['SumInsured']);this.CommaFormatted(obj,'Content');obj['OriginalRiskId']=content[0].RiskId  }
                  else{obj['ContentSI']=null;}
                  let allRisk = subDetails.filter(ele=>ele['SectionId']=='3')
                  if(allRisk.length!=0){obj['AllRiskSI']=String(allRisk[0]['SumInsured']);this.CommaFormatted(obj,'AllRisk');obj['OriginalRiskId']=allRisk[0].RiskId  }
                  else{obj['AllRiskSI']=null;}
                  let domestic = subDetails.filter(ele=>ele['SectionId']=='106')
                  if(domestic.length!=0){obj['ServantSI']=String(domestic[0]['SumInsured']);this.CommaFormatted(obj,'Domestic');obj['ServantCount']=domestic[0].TotalNoOfEmployees;obj['ServantType']=domestic[0]['ServantType'];obj['OriginalRiskId']=domestic[0].RiskId  }
                  else{obj['ServantSI']=null;obj['ServantCount']=null;obj['ServantType']=null}
                  let persLiab = subDetails.filter(ele=>ele['SectionId']=='139')
                  if(persLiab.length!=0){obj['PersonalLiabilitySI']=String(persLiab[0]['SumInsured']);this.CommaFormatted(obj,'PL');obj['OriginalRiskId']=persLiab[0].RiskId  }
                  else{obj['PersonalLiabilitySI']=null;}
                  console.log("Final Obj",obj)
                  this.LocationList.push(obj);
                  i+=1;
              }
          }
          console.log("Final Location List",this.LocationList);
          this.customerDetails=data?.Result?.CustomerDetails;
          if(this.Riskdetails[0].AcccessoriesSumInsured!=null)
          this.actualAccessoriesSI = String(this.Riskdetails[0].AcccessoriesSumInsured);
          this.quoteComponent.setRiskDetails(this.Riskdetails);
            this.quoteComponent.currencyCode = data?.Result?.QuoteDetails?.Currency;
          if(this.Riskdetails.length==1){
            this.newacc=true;
            let fireData = new Accessorieswh();
            let entry = [];
            this.Accfieldss = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('accessories')
              });
            } }
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
            this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].hooks = regionHooks;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            this.formSection = true; this.viewSection = false;
          }
          else{
            let fireData = new Accessories();
            this.newacc=false;
            let entry = [];
            this.Accfieldss = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('accessories')
              });
            } }
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
            //this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            this.formSection = true; this.viewSection = false;
          }
          for (let cover of this.Riskdetails) {
            let j = 0;
            for (let section of cover?.SectionDetails) {
              let CoverData = section.Covers;
              for (let subsectioncover of section?.Covers) {
                if (cover?.totalPremium) {
                  cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
                  cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
                }
                else {
                  cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
                  cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;

                }
                let baseCovers = [], otherCovers = [];
                baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
                otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
                section.Covers = baseCovers.concat(otherCovers);
                this.CoverList.push(cover);
                if (j == cover?.SectionDetails) {
                  this.CoverList.push(cover);
                  console.log("vehicleList", this.CoverList);
                }
                else j += 1;
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  onShowCommonDialog(rowData,type){
    this.locationId = rowData.LocationId;this.locationName=rowData.LocationName;
    if(type=='1'){this.visibleBuilding=true;this.getBuildingDetails('direct');}
    else if(type=='47'){this.visibleContent=true;this.getContentDetail()}
    else if(type=='3'){this.visibleAllRisk=true;this.getallriskDetailsData()}
    else if(type=='139'){this.personalLiabilityDialog=true;this.getPersonalLiabilityDetails()}
    else if(type=='138'){this.personalAccidentDialog=true;this.getPersonalAccidentDetailsAlt()}
    else if(type=='76'){this.domesticServantDialog=true;}
  }
  getBuildingDetails(type){
            
    let ReqObj = {
      // "RequestReferenceNo": this.requestReferenceNo,
      // // "RiskId": "1",
      // "SectionId":  "1"
      // "RequestReferenceNo": this.requestReferenceNo,
      // "SectionId": "1"
    
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": "1" 
   
    }
    let urlLink = `${this.motorApiUrl}api/slide14/getbuilding`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
              this.productItem = new ProductData();
              this.productItem.BuildingSuminsured = data?.Result?.BuildingSumInsured;
              this.TableRowBuilding=data?.Result;
              console.log(this.TableRowBuilding,"this.TableRothis.TableRowBuildingwBuilding");
              
              if(this.TableRowBuilding.length!=0){
                for(let build of this.TableRowBuilding){
                  build['SavedYN'] = 'Y';
                }
                if(this.TableRowBuilding.length>1 || (this.TableRowBuilding[0].BuildingSumInsured!=null && this.TableRowBuilding[0].BuildingSumInsured!=0)) this.currentBuildingRowIndex = null;
                this.getTotalBuilding();
              }
        }
      },
      (err) => { },
    );
  }
  getwallTypeDescription(WallType) {
    let entry = this.wallMaterialList.find(ele=>ele.Code==WallType);
    if(entry){
      return entry.CodeDesc;
    }
    else return '';
  }
  getEmployeeDetails(){
    let SectionId = null;
    if(this.productId=='14' || this.productId=='19' || this.productId=='57') SectionId = '45';
    if(this.productId=='32') SectionId = '43';
    let ReqObj = {
      "QuoteNo": this.quoteNo,
       //"RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;
    //let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            if(data?.Result){
              let employee:any=[];
              if(data?.Result.length!=0){
                this.employeeList= data?.Result;
                if(this.locationlist.length!=0){
                  for(let entry of this.locationlist){
                    entry['EmployeeList'] = this.employeeList.filter(ele=>ele.LocationId==entry.LocationId);
                  }
                }
              }
              else {
                this.EmployeeAdd();
                if(this.locationlist.length!=0){
                  for(let entry of this.locationlist){
                    entry['EmployeeList'] = [];
                  }
                }
              }
            }
          // if(this.productId=='57'){
          //   if(data?.Result){
          //     this.employeeList = data?.Result;
          //   }
         
          // }
          // else if(this.productId=='32'){
          //   this.fidelityList =data?.Result;
          //   console.log('Ferdility Lists',this.fidelityList);
          // }
          else if(this.productId=='3'){
            this.risk =data?.Result;
            console.log('Ferdility Lists',this.risk);
          }
            this.originalEmployeeList = new Array().concat(data?.Result);
            if(this.employeeList.length!=0 && this.productId!=='32'){
              this.getTotalSICost('Employee');
            }
            else if(this.productId=='32' && this.fidelityList.length!=0 ){
              this.getTotalSICost('Fidelity');
            }
            else if(this.productId=='3' && this.risk.length!=0 ){
              //this.getTotalSICost('Fidelity');
            }
        }
        else {
          this.EmployeeAdd();
           }
      });
  }
  getTotalSI(rowData){
      if((this.productId=='14' || this.productId=='32') && rowData.EmployeeList){
          if(rowData.EmployeeList.length!=0){
              let si = 0,i=0;
              for(let entry of rowData.EmployeeList){
                if(entry.Salary) si=si+Number(entry.Salary); 
                i+=1;
                if(i==rowData.EmployeeList.length){if(si!=null || si !=undefined) return si; else return 0}
              }
          } else return 0;
      }
      else if(this.productId=='25' && rowData.EmployeeList){
        if(rowData.EmployeeList.length!=0){
          let si = 0,i=0;
          for(let entry of rowData.EmployeeList){
            if(entry.SumInsured) si=si+entry.SumInsured; 
            i+=1;
            if(i==rowData.EmployeeList.length){if(si!=null || si !=undefined) return si; else return 0}
          }
      } else return 0;
      }
      else return 0;
  }
  getActualSI(rowData){
    if(rowData.SectionDetails){
        if(rowData.SectionDetails.length!=0){
            let si = 0,i=0;
            for(let entry of rowData.SectionDetails){if(entry.SumInsured) si=si+Number(entry.SumInsured); i+=1;
              if(i==rowData.SectionDetails.length){if(si!=null || si !=undefined) return si; else return 0}
            }
        } else return 0;
    }
    else return 0;
}
  newAllrisk(){
    this.enableAllRiskEditSection=true;
    this.errorRecordsRisk=[];
  }
  newFidelity(){
    this.enableFidelityEditSection=true;
    this.errorRecords=[];
  }
  getFidelityDetails(){
    let SectionId = null;
    if(this.productId=='32'  || this.productId=='19') SectionId = '43';
    let ReqObj = {
      "QuoteNo": this.quoteNo,
       "RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;//api/getallproductemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            this.fidelityList = data?.Result;
            if(this.locationlist.length!=0){
              let i=0,EmployeeList=[];
              for(let entry of this.locationlist){
                  let j=0;
                  for(let subEntry of this.fidelityList){
                      if(String(subEntry.LocationId)==entry.LocationId){EmployeeList.push(subEntry)}
                      j+=1;
                      if(j==this.fidelityList.length){ entry['EmployeeList'] = EmployeeList; i+=1;}
                  }
              }
            }
            // this.originalFidelityList = new Array().concat(data?.Result);
            // if(this.fidelityList.length!=0){
            //   this.getTotalSICost('Fidelity');
            // }
        }
        else {
          this.EmployeeAdd();
           }
      });
  }

  enableAddNewBtn(type){
    //console.log('YYYYYYYYYY',this.buildingSection,this.enableAllSection);
    if(this.endorsementSection){
      if(this.enableAllSection){
        return true;
      }
      else{
        return false;
      }
    //   if(type=='building'){ 
    //   if(type=='building' && this.enableAllSection){
    //     return true;
    //   }
    //   else{
    //     return (!this.buildingSection && !this.enableAllSection) ;
    //   }
    // } 
    //   else if(type=='content') return (!this.contentRiskSection && !this.enableAllSection);
    //   else if(type=='personalAccident') return (!this.personalAccidentSection && !this.enableAllSection);
    //   else if(type == 'personalIndeminity') return (!this.personalIntermeditySection && !this.enableAllSection);
    //   else if(type=='allRisk') return (!this.allRiskSection && !this.enableAllSection);
    //   else if(type == 'electronic') return (!this.electronicEquipSection && !this.enableAllSection);
    //   else if(type == 'Cyber') return (!this.enableCyberSection && !this.enableAllSection);
    //   else if(type == 'accessories' && this.enableAllSection || this.accessoriesSection) {
    //     return true;
    //   }
    //   else if(type == 'accessories' && !this.enableAllSection || !this.accessoriesSection) {
    //       return (!this.accessoriesSection && !this.enableAllSection);}
    }
    else return true;
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  getSumInsuredDetails(){
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}quote/productsuminsureddetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.sumInsuredDetails = data.Result;
          this.item = this.sumInsuredDetails?.ProductSuminsuredDetails?.SectionId;
          // if(this.productId!='19' && this.productId!='3'){
          //   this.setTabSections();
          //   this.getContentList();
          // }
          // else{
            this.newjsonfile();
           
            //this.setTabSections();
          //}
         
          if(this.six){
            this.Electronic();
          }
          if(this.productId=='21' || this.productId=='26'){
            this.getallriskLists();
          }
          if(this.productId=='5' || this.productId=='29'){
            this.getAccesroies();
            this.getchassisAcc();
            
          }
          // else if(this.productId=='26'){
          //   this.getallriskListsplant();
          // }
          else if(this.productId=='39'){
            this.getallriskMachinery();
          }
          else if(this.productId=='42'){
            this.getcontenttype();
            this.getCyberDetails();
          }
          else {
            //this.getallriskList();
          }
             
          if(this.sumInsuredDetails){
            // if(this.first) this.contentSumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.second) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.third) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.fifth) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.CurrencyId;
            if(this.productId=='5' || this.productId=='29'){
              this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.Currency;
            }
            this.accidentOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationTypeDesc;
            this.accidentOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationType;

            this.liabilityOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationDesc;
            this.liabilityOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationId
            let buildingSI = this.sumInsuredDetails.ProductSuminsuredDetails.BuildingSuminsured;
            if(buildingSI!='' && buildingSI!=null && buildingSI!=undefined){
              this.actualBuildingSI = buildingSI;
            }
            else this.actualBuildingSI = 0;
            let contentSI = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            if(contentSI!='' && contentSI!=null && contentSI!=undefined){
              this.actualContentSI = contentSI;
            }
            else this.actualContentSI = 0;
            let allRiskSI = this.sumInsuredDetails.ProductSuminsuredDetails.AllriskSumInsured;
            if(allRiskSI!='' && allRiskSI!=null && allRiskSI!=undefined){
              this.actualAllRiskSI = allRiskSI;
              console.log('KKKKKKKKKKK',this.actualAllRiskSI);
            }
            else this.actualAllRiskSI = 0;

            let AccSI = this.sumInsuredDetails.ProductSuminsuredDetails.AccessoriesSuminsured;
            if(AccSI!='' && AccSI!=null && AccSI!=undefined){
              this.actualAssSI = AccSI;
            }
            else this.actualAssSI  = 0;

            let EquipmentSi = this.sumInsuredDetails.ProductSuminsuredDetails.EquipmentSi;
            if(EquipmentSi!='' && EquipmentSi!=null && EquipmentSi!=undefined){
              this.EquipmentSi = EquipmentSi;
            }
            else this.EquipmentSi = 0;
            let pAccSI = this.sumInsuredDetails.ProductSuminsuredDetails.PersonalAccSuminsured;
            if(pAccSI!='' && pAccSI!=null && pAccSI!=undefined){
              this.actualPersonalAccSI = pAccSI;
            }
            else this.actualPersonalAccSI = 0;
            let pASI = this.sumInsuredDetails.ProductSuminsuredDetails.PersonalIntermediarySuminsured;
            if(pASI!='' && pASI!=null && pASI!=undefined){
              this.actualPersonalIntSI = pASI;
            }
            else this.actualPersonalIntSI = 0;
            let electr =this.sumInsuredDetails.ProductSuminsuredDetails.ElecEquipSuminsured;
            if(electr!='' && electr!=null && electr!=undefined){
              this.actualElectronicIntSI = electr;
            }
            else this.actualElectronicIntSI=0;
            let empSI = this.sumInsuredDetails.ProductSuminsuredDetails.SumInsured;
            if(empSI!='' && empSI!=null && empSI!=undefined){
              this.actualEmployeeSI = empSI;
            }
            else this.actualEmployeeSI=0;
            let MachinerySI = this.sumInsuredDetails.ProductSuminsuredDetails.MachinerySi;
            if(MachinerySI!='' && MachinerySI!=null && MachinerySI!=undefined){
              this.actualMachinerySI = MachinerySI;
            }
            else this.actualMachinerySI=0;
            let FidEmpSi = this.sumInsuredDetails.ProductSuminsuredDetails.FidEmpSi;
            if(FidEmpSi!='' && FidEmpSi!=null && FidEmpSi!=undefined){
              this.actualFidelitySI = FidEmpSi;
            }
            else this.actualFidelitySI=0;
            console.log("SI Rec",this.sumInsuredDetails);
          }
          if(this.productId!='19') {
            //this.getbuilding();
          } 
          if(this.productId=='5' || this.productId=='29'){
            this.getAccessories();
          }
        }
      },
      (err) => { },
    );
  }
  createCover(){
    
    this.FirstName=null;
    this.lastname=null;
    this.RelationType=null;
    this.NationalityId=null;
    this.DateOfBirth=null;
      let entry = {
        "FirstName":null,
        "LastName":null,
        "RelationType":'',
        "NationalityId":'',
        "DateOfBirth":""
      }
      this.selectedProductList.push(entry);
  }
  getCyberDetails(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": this.item[0]
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
              this.CyberItem = res.Result.ContentRiskDetails;
           }
          }
        }
      })
  }
  onBuildingCancel(){
    if(!this.editBuildingSection)  this.building.splice(this.currentBuildingIndex,1);
    this.LocationName = null; this.BuildingAddress=null;this.BuildingSuminsured=null;
    this.currentBuildingIndex = null;
    this.enableBuildingEditSection = false;
  }
  onCyberCancel(){
    if(!this.editCyberSection)  this.CyberItem.splice(this.currentCyberIndex,1);
    this.DeviceType = null; this.CyberMake=null;this.BuildingSuminsured=null;
    this.currentCyberIndex = null;
    this.enableCyberSection = false;
  }
  onMachineryCancel(){
  //   if(!this.editMachinerySection)  this.machineries.splice(this.currentMachineryIndex,1);
  // this.productItem.MBrand =null; this.productItem.MContentType=null; this.productItem.MLocation=null;
  // this.productItem.MName =null; this.productItem.MSI=null;
  // this.productItem.MSerialNo=null;

  //   this.enableMachineryEditSection = false;
  }
  onContentCancel(){
    if(!this.editContentSection) this.Cotentrisk.splice(this.currentContentIndex,1);
    this.LocationId = null;this.serialNoDesc = null;this.contentRiskDesc = null;
    this.contentSI = null;this.contentId = null;this.enableContentEditSection=false;
  }
  onPeronalAccidentCancel(){
    if(!this.editPersonalAccidentSection) this.PersonalAssistantList.splice(this.currentPersonalAccidentIndex,1);
   this.productItem.AccDob=null; this.productItem.AccName=null; this.productItem.AccNationID = null;
   this.productItem.AccSI=null; this.productItem.AccName =null; this.productItem.AccOccupation = null;
   this.enablePersonalAccEditSection = false;
  }
  onAllRiskCancel(){
    if(!this.editRiskSection)  console.log('Enables',); this.risk.splice(this.currentPersonalAccidentIndex,1);
   this.productItem.RiskContentType=null; this.productItem.RiskDescription=null; this.productItem.RiskLocation= null;
   this.productItem.RiskSerialNo=null; this.productItem.RiskSI =null;
   this.enableAllriskEditSection=false;
  }
  onAllRiskCancela(){
    this.enableAllriskEditSection=false;
    this.enableAllRiskUploadSection=false;
    this.employeeUploadRecords=[];
    this.errorRecords=[];
    
  }

  onAllRiskContent(){
this.enableContentEditSection=false;
this.enableAllContentUploadSection=false;
this.employeeUploadRecords1=[];
this.errorRecords1=[];
  }

  onPeronalIndCancel(){
    if(!this.editPersonalIndSection) this.Intermedity.splice(this.currentPersonalIndIndex,1);
   this.productItem.IndDob=null; this.productItem.IndName=null; this.productItem.IndNationID = null;
   this.productItem.IndSI=null; this.productItem.IndName =null; this.productItem.IndOccupation = null;
   this.enablePersonalIndEditSection = false;
  }

  onElectronicCancel(){
      if(!this.editElectronicSection) this.ElectronicItem.splice(this.currentElectronicIndex,1);
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
   this.enableElectronicEquipmentSection= false;
  }

  onAccessoriesCancel(){
    if(!this.editAccessoriesSection) this.accessoriesList.splice(this.currentAccessoriesIndex,1);
    this.chassisNo = null;this.accessoriesType=null;this.serialNoDesc=null;this.SumInsured=null;
    this.currentAccessoriesIndex = this.accessoriesList.length;
    this.enableAccessoriesEditSection=false;
  }

  contentypes(){
    let entry = this.productItem.ContentLocation;
    console.log('ENTRIESSSSSSSSSSSS',entry)
  }
  onEmplyeeCancel(){
    if(!this.editEmployeeSection) this.employeeList.splice(this.currentEmployeeIndex,1);
    this.currentEmployeeIndex = null;this.enableEmployeeEditSection = false;
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empLocation = null;
      this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }
  onFidelityCancel(){
    if(!this.editFidelitySection) this.fidelityList.splice(this.currentFidelityIndex,1);
    this.currentFidelityIndex = null;this.enableFidelityEditSection = false;
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empLocation = null;
      this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }


  onMedicalSave(){
    let date = null;
    console.log("Final Product Value",this.productItem)
    let ReqObj = {
      "Createdby": this.loginId,
      "SectionId": "70",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "ProductEmployeeSaveReq": [
          {
              "RiskId": 1,
              "LocationId": 1,
              "EmployeeId": "1",
              "EmployeeName": this.productItem.EmployeeName,
              "OccupationId":null,
              "OccupationDesc": null,
              "Salary": null,
              "ProductId": this.productId,
              "ProductDesc": "Medical",
              "Address": null,
              "NationalityId": null,
              "DateOfJoiningYear": this.productItem.DateOfJoiningYear,
              "DateOfJoiningMonth": null,
              "DateOfBirth": null,
              "SectionId": "70",
              "Rate": null,
              "PremiumFc": "",
              "PremiumLc": "",
              "LocationName": "",
              "HighestQualificationHeld": this.productItem.HighestQualificationHeld,
              "IssuingAuthority": this.productItem.IssuingAuthority
  
          }
      ],
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/saveemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {
          }
        }
          else  {
            this.router.navigate(['/quotation/plan/main/document-info']);
          }
          //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
      },
      (err) => { },
    );

  }
  onCyberSaves(){
        //this.CyberItem[this.currentCyberIndex].ContentRiskDesc = this.BuildingSuminsured;
        console.log('UUUUUUUUUUUUUUUUUU',this.CyperList);
        this.CyberItem[this.currentCyberIndex].ContentRiskDesc = this.CyperList.find(ele=>ele.Code==this.productItem.DeviceType).label;
        this.CyberItem[this.currentCyberIndex].SerialNoDesc = this.productItem.DeviceSNo;
        this.CyberItem[this.currentCyberIndex].MakeAndModel = this.productItem.DeviceMake;
        this.CyberItem[this.currentCyberIndex].ManufactureYear = this.productItem.DeviceYear;
        this.CyberItem[this.currentCyberIndex].ItemId = this.productItem.DeviceType;
        // if(this.DeviceType!=null){
        //   this.CyberItem[this.currentCyberIndex].ItemDesc = this.CyperList.find(ele=>ele.Code==this.DeviceType)?.CodeDesc;
        // }
        this.CyberItem[this.currentCyberIndex].RiskId = this.productItem.DeviceLocation;
        this.CyberItem[this.currentCyberIndex].Name= this.CyperList.find(ele=>ele.Code==this.productItem.DeviceType).label;
        this.CyberSNo=null;this.CyberMake=null;this.Cyberyear=null;this.DeviceType=null;this.LocationId=null;

        this.productItem=new ProductData();
        this.editCyberSection = false;
       this.enableCyberSection = false;
        // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
  }
  
  onBuildingSave(){
    // this.buildingSIError = false;this.buildingLocationError=false; this.buildingAddressError = false;this.totalBuildSIError = false;
    // if(this.LocationName!=null && this.LocationName!=undefined && this.BuildingAddress!=null){
    //   if(!this.sumInsured){
    //     if(this.BuildingSuminsured==0 || this.BuildingSuminsured=='' || this.BuildingSuminsured==null || this.BuildingSuminsured==undefined) this.BuildingSuminsured = 0;  
    //     this.building[this.currentBuildingIndex].BuildingSuminsured = this.BuildingSuminsured;
    //     this.building[this.currentBuildingIndex].LocationName = this.LocationName;
    //     this.building[this.currentBuildingIndex].BuildingAddress = this.BuildingAddress;
    //     this.editBuildingSection = false;
    //     this.enableBuildingEditSection = false;
    //     this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    //   }
    //   else if(this.BuildingSuminsured==0 || this.BuildingSuminsured=='' || this.BuildingSuminsured==null || this.BuildingSuminsured==undefined) this.buildingSIError = true;
    //   else if(this.totalBuildingSumInsured>this.actualBuildingSI){
    //     this.totalBuildSIError = true;
    //   }
    //   else{
    //     this.building[this.currentBuildingIndex]['LocationName'] = this.LocationName;
    //     this.building[this.currentBuildingIndex]['BuildingAddress'] = this.BuildingAddress;
    //     this.building[this.currentBuildingIndex]['BuildingSuminsured'] = this.BuildingSuminsured;
    //     this.editBuildingSection = false;
    //     this.enableBuildingEditSection = false;
    //     this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    //   }
    // }
    // else if(this.LocationName==null || this.LocationName==undefined){this.buildingLocationError=true;}
    // else if(this.BuildingAddress==null || this.BuildingAddress==undefined){this.buildingAddressError = true;}
    console.log("Final Additional Info",this.form,this.productItem)
    let i=0;
    if(this.productItem.LocationAddress=='' || this.productItem.LocationAddress==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.LocationNameBuilding=='' || this.productItem.LocationNameBuilding==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(i==0){
      this.building[this.currentBuildingIndex]['LocationName'] =  this.productItem.LocationNameBuilding;
      this.building[this.currentBuildingIndex]['BuildingAddress'] = this.productItem.LocationAddress;
      this.building[this.currentBuildingIndex]['BuildingSuminsured'] = this.productItem.BuildingSumInsureds;
         this.editBuildingSection = false;
      this.enableBuildingEditSection = false;
      this.productItem.BuildingSumInsureds=null; this.productItem.LocationAddress=null;
      this.productItem.LocationNameBuilding=null;
    }
   
      // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    
  
}
checkMandatories(){
  return this.form.errors!=null;
}
onMachinerySave(){
 
 
    // this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    // let i=0;
    // if(this.MachineryLocation==null || this.MachineryLocation==undefined || this.MachineryLocation==''){ i+=1; this.locationIdError = true;}
    // if(this.machineryItemId==null || this.machineryItemId==undefined || this.machineryItemId==''){ i+=1; this.contentIdError = true;}
    // if(this.serialNoDesc==null || this.serialNoDesc==undefined || this.serialNoDesc==''){ i+=1; this.serialNoError = true;}
    // if(this.MachineryName==null || this.MachineryName==undefined || this.MachineryName==''){ i+=1; this.contentDescError = true;}
    // if(this.MiSumInsured==null || this.MiSumInsured==undefined || this.MiSumInsured=='' || this.MiSumInsured == '0'){ i+=1; this.contentSIError = true;}
    // console.log('uuuuuuuuu',i)
    // if(i==0){
      this.machineries[this.currentMachineryIndex]['SumInsured'] = this.productItem.MSI;//this.MiSumInsured;
      this.machineries[this.currentMachineryIndex]['RiskId'] = this.productItem.MLocation;
      this.machineries[this.currentMachineryIndex]['SerialNoDesc'] = this.productItem.MSerialNo; //this.serialNoDesc;
      this.machineries[this.currentMachineryIndex]['ContentRiskDesc'] = this.productItem.MDescription; //this.MachineryName;
      this.machineries[this.currentMachineryIndex]['ItemId'] = this.productItem.MContentType; //this.machineryItemId;
      this.machineries[this.currentMachineryIndex]['Name'] = this.productItem.MName;//this.NameDesc;
      this.machineries[this.currentMachineryIndex]['Brand'] = this.productItem.MBrand;//this.BrandName;
      this.productItem = new ProductData();
      // this.MachineryName = null;this.BrandName=null;this.serialNoDesc=null;this.SumInsured=null;
      this.currentMachineryIndex = null;
      this.enableMachineryEditSection = false;
      // this.machineries[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.LocationId).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      // this.editContentSection = false;
      // this.enableContentEditSection = false;
    //}

}
onFidelitySave(){
  // this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
  // this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
  // this.employeeSalaryError = false;this.employeeLocationError=false;let i=0;
  // if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
  // if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
  // // if(this.empAddress=='' || this.empAddress==null || this.empAddress == undefined){i+=1;this.employeeAddressError=true};
  // if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
  // if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
  // if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
  // if(this.empLocation=='' || this.empLocation==null || this.empLocation == undefined){i+=1;this.employeeLocationError=true};
  // if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
  // if(i==0){
    let SectionId = null;
    if(this.productId=='32') SectionId = '43';
    this.fidelityList[this.currentFidelityIndex]['RiskId'] = this.productItem.fdLocation;//this.empLocation;
    this.fidelityList[this.currentFidelityIndex]['LocationId'] = this.productItem.fdLocation;//this.empLocation;
    this.fidelityList[this.currentFidelityIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.fdLocation).label;
    this.fidelityList[this.currentFidelityIndex]['Createdby'] = this.loginId;
    this.fidelityList[this.currentFidelityIndex]['Address'] =  this.productItem.fdAddress;//this.empAddress;
    this.fidelityList[this.currentFidelityIndex]['EmployeeName'] = this.productItem.fdName;
    this.fidelityList[this.currentFidelityIndex]['OccupationId'] = this.productItem.fdOccupation//this.occupationType;
    this.fidelityList[this.currentFidelityIndex]['OccupationDesc'] = this.fidelityOccupationList.find(ele=>ele.Code==this.productItem.fdOccupation).label;
    this.fidelityList[this.currentFidelityIndex]['DateOfBirth'] = this.datePipe.transform(this.productItem.fdDob, "dd/MM/yyyy");
    this.fidelityList[this.currentFidelityIndex]['DateOfJoiningYear'] = this.productItem.fdPeriod;//this.empJoiningDate;
    this.fidelityList[this.currentFidelityIndex]['DateOfJoiningMonth'] = this.productItem.fdJoin;//this.empJoiningMonth;
    this.fidelityList[this.currentFidelityIndex]['SectionId'] = SectionId;
    // let salary = '';
    // if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
    // else salary = this.employeeSalary;
    this.fidelityList[this.currentFidelityIndex]['Salary'] = this.productItem.fdSI;
    this.fidelityList[this.currentFidelityIndex]['NationalityId'] = this.productItem.fdNationality;//this.nationality;
    this.editFidelitySection = false;this.enableFidelityEditSection = false;this.currentFidelityIndex=null;
    this.productItem = new ProductData();
    // this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    // this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;this.empLocation = null;
  //}
}
  onEmployeeSave(){
    let i =0; this.employeeSalaryError=false;
    if(this.productItem.EmpsSI =='' || this.productItem.EmpsSI==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsLocation=='' || this.productItem.EmpsLocation==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsName =='' || this.productItem.EmpsName==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsOccupation=='' || this.productItem.EmpsOccupation==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsPeriod=='' || this.productItem.EmpsPeriod==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsJoin=='' || this.productItem.EmpsJoin==null){
      i+=1;
      this.form.markAllAsTouched();
    }
   
   
    if(i==0){
     //this.empAddress;
   
      this.employeeList[this.currentEmployeeIndex]['RiskId'] = this.productItem.EmpsLocation;//this.empLocation;
      this.employeeList[this.currentEmployeeIndex]['LocationId'] = this.productItem.EmpsLocation; //this.empLocation;
      this.employeeList[this.currentEmployeeIndex]['EmployeeName'] = this.productItem.EmpsName;//this.employeeName;
      this.employeeList[this.currentEmployeeIndex]['OccupationId'] = this.productItem.EmpsOccupation;//this.occupationType;
      this.employeeList[this.currentEmployeeIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.EmpsLocation).label;//.CodeDesc;
      this.employeeList[this.currentEmployeeIndex]['OccupationDesc'] = this.employeeOccupationList.find(ele=>ele.Code==this.productItem.EmpsOccupation).label//this.occupationType).CodeDesc;
      if(this.productItem.EmpsDob!=null && this.productItem.EmpsDob!='') this.employeeList[this.currentEmployeeIndex]['DateOfBirth'] = this.datePipe.transform(this.productItem.EmpsDob, "dd/MM/yyyy");
      this.employeeList[this.currentEmployeeIndex]['DateOfJoiningYear'] =this.productItem.EmpsPeriod; //this.empJoiningDate;
      this.employeeList[this.currentEmployeeIndex]['DateOfJoiningMonth'] = this.productItem.EmpsJoin;//this.empJoiningMonth;
      let salary = '';
      // if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
      // else salary = this.employeeSalary;
      this.employeeList[this.currentEmployeeIndex]['Salary'] = this.productItem.EmpsSI;//salary;
      this.employeeList[this.currentEmployeeIndex]['NationalityId'] = this.productItem.EmpsNationality; 
      this.employeeList[this.currentEmployeeIndex]['Address'] = this.productItem.EmpsAddress;
      this.employeeList[this.currentEmployeeIndex]['Createdby'] = this.loginId;//this.nationality;
      this.getTotalSICost('Employee');
      this.onsubmitemployee();
     
      // this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
      // this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
    }
  }
  isValid(field: FormlyFieldConfig): boolean {
    
    if (field.key) {
      return field.formControl.value!='';
    }
    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
  employeedownload(){
    let SectionId = null;
    if(this.productId=='14' || this.productId=='19') SectionId = '45';
    if(this.productId=='32') SectionId = '43';
    if(this.productId=='3' && this.first && !this.third) SectionId = '47';
    if(this.productId=='3' && this.third && !this.first) SectionId = '3';
    if(this.productId=='24' && this.first && !this.third) SectionId = '47';
    if(this.productId=='24' && this.third && !this.first) SectionId = '3';
    if(this.productId=='3' && this.third && this.first){
      if(this.uploadrisk && !this.uploadcontent){
        SectionId='3';
      }
      if(this.uploadcontent && !this.uploadrisk){
        SectionId='47';
      }
    }

    if(this.productId=='24' && this.first && !this.third) SectionId = '47';
    if(this.productId=='24' && this.third && !this.first) SectionId = '3';
    if(this.productId=='24' && this.third && this.first){
      if(this.uploadrisk && !this.uploadcontent){
        SectionId='3';
      }
      if(this.uploadcontent && !this.uploadrisk){
        SectionId='47';
      }
    }
    if(this.productId=='26'){
      SectionId='3';
    }
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId":SectionId
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/sample/download`
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.Base64);
        link.setAttribute('download', data?.Result.FileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onSaveFidelityDetails(type){
    let urlLink = null;
    if(type=='save') urlLink = `${this.motorApiUrl}api/saveemployees`;
    else urlLink = `${this.motorApiUrl}api/proceedemployees`;
    if(this.fidelityList.length!=0){
        let empList = [],i=0;
        for(let emp of this.fidelityList){
          let entry = emp;
          if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
          if(entry['EmployeeId']==null || entry['EmployeeId']==undefined || entry['EmployeeId']=='') entry['EmployeeId'] = null;
          else entry['EmployeeId'] = String(entry.EmployeeId);
          empList.push(entry);
          i+=1;
          if(i==this.fidelityList.length){
            //let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
            let SectionId = null;
            let validYN='N';
            if(type=='alter') validYN = 'Y';
            if(this.productId=='32' || this.productId=='19') SectionId = '43';
            let ReqObj = {
              "Createdby": this.loginId,
              "SectionId": SectionId,
              "ProductId": this.productId,
              "EmpcountSIvalidYN": validYN,
              "ExcelUploadYN": "N",
              "InsuranceId": this.insuranceId,
              "ProductEmployeeSaveReq": empList,
              "QuoteNo": this.quoteNo,
              "RequestReferenceNo": this.quoteRefNo
            }
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                let res: any = data;
                if (data.ErrorMessage.length != 0) {
                  if (res.ErrorMessage) {
                      console.log("Error Message",res)   
                      let entry = res.ErrorMessage.some(ele=>ele.Code=='333' || ele.Code=='111' || ele.Code=='222');
                      if(entry){
                        let ulList = '';
                        for (let index = 0; index < res.ErrorMessage.length; index++) {
                          const element = res.ErrorMessage[index];
                  
                           ulList +=`<li class="list-group-login-field">
                            <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                            <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                          </li>`
                          // if(index==res.ErrorMessage.length-1){
                          //   Swal.fire({
                          //     title: '<strong>MisMatch Error</strong>',
                          //     icon: 'info',
                          //     html:
                          //       `<ul class="list-group errorlist">
                          //         ${ulList}
                          //         <li>Do you want to continue?</li>
                          //    </ul>`,
                          //     showCloseButton: true,
                          //     //focusConfirm: false,
                          //     showCancelButton:true,
                  
                          //    //confirmButtonColor: '#3085d6',
                          //    cancelButtonColor: '#d33',
                          //    confirmButtonText: 'Yes,Proceed!',
                          //    cancelButtonText: 'Cancel',
                          //   }).then((result) => {
                          //     if (result.isConfirmed) {
                          //         this.onSaveFidelityDetails('alter');
                          //     }
                          //   });
                          // }
                        }
                        
                      }
                  }
                }
                else if(this.productId=='19' && this.nine)this.selectedTab +=1; 
                else{
                 this.checkValidation();
                }
            },
            (err) => { },
            );
          }
        }
    }
    else{alert("No Fidelity Details Found")}
  }
  onSaveCommonEmp(type){
    if(this.selectedTab!=this.locationlist.length-1) this.selectedTab+=1;
    else{
        if(this.productId=='14' || this.productId=='32') this.onSaveEmployeeDetails(type);
        else if(this.productId=='25') this.onSaveEmployeeDetails(type);
    } 
  }
  onSaveEmployeeDetails(type){
    let urlLink = null;let section:any;
    if(this.productId=='14'){
      section='45';
    }
    else if(this.productId=='32'){
      section = '43';
    }
    for(let location of this.locationlist){
      let k=0,locationList = [];
      if(location.EmployeeList.length!=0){
        let empList = [],i=0;
        for(let emp of location.EmployeeList){
          let entry = emp;
            if(this.productId=='14' || this.productId=='32'){
              if(type=='save') urlLink = `${this.motorApiUrl}api/saveemployees`;
              else urlLink = `${this.motorApiUrl}api/proceedemployees`;
              if(entry.DateOfBirth!=null){
                if(!entry.DateOfBirth.includes('/')) entry['DateOfBirth']= this.datePipe.transform(entry.DateOfBirth, "dd/MM/yyyy");
                }
                // if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
                if(entry['EmployeeId']==null || entry['EmployeeId']==undefined || entry['EmployeeId']=='') entry['EmployeeId'] = null;
                else entry['EmployeeId'] = String(entry.EmployeeId);
                entry['RiskId']=this.employeeOccupationList.find(ele=>ele.Code==entry.OccupationId)?.RiskId;
                entry['LocationId']=location.LocationId
                empList.push(entry);
            }
            else if(this.productId=='25'){
              if(this.productItem.ElqList!=null && this.productItem.ElqList!='' && this.productItem.ElqList!=undefined && this.tabIndex+1==Number(location.LocationId)){
                let sumInsured=null,itemValue=null;
                let entry = this.locationlist[this.selectedTab];
                let obj = entry.SectionDetails.find(ele=>ele.ContentType==this.productItem.ElqList)
                if(obj) itemValue = obj.ContentDesc;
                if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
                else sumInsured = entry.SumInsured;
                let data = {
                  "ItemId": this.productItem.ElqList,
                  "ItemValue": itemValue,
                  "MakeAndModel": this.productItem.Elqmake,
                  "PurchaseMonth": this.productItem.ElqJoin,
                  "PurchaseYear": this.productItem.ElqPeriod,
                  "RiskId": location.SectionDetails[0].RiskId,
                  "LocationId": location.LocationId,
                  "ContentRiskDesc": itemValue,
                  "SerialNoDesc": null,
                  "SerialNo":"856757",
                  "SumInsured": this.productItem.ElqSI
                }
                empList.push(data)
                this.productItem=new ProductData();
              }
              else{
                let sumInsured,itemValue=null;
                if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
                // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
                else sumInsured = entry.SumInsured;
                let subObj = this.locationlist[this.selectedTab];
                let obj = subObj.SectionDetails.find(ele=>ele.ContentType==entry.ItemId)
                if(obj) itemValue = obj.ContentDesc;
                let data = {
                  "ItemId": entry.ItemId,
                  "ItemValue": itemValue,
                  "MakeAndModel": entry.MakeAndModel,
                  "PurchaseMonth": entry.PurchaseMonth,
                  "PurchaseYear": entry.PurchaseYear,
                  "RiskId": location.SectionDetails[0].RiskId,
                  "LocationId": location.LocationId,
                  "ContentRiskDesc":itemValue,
                  "SerialNoDesc": entry.SerialNoDesc,
                  "SerialNo":"856757",
                  "SumInsured":sumInsured
                }
                empList.push(data)
              }
                
            }
          i+=1;
          if(i==location.EmployeeList.length){
            locationList=locationList.concat(empList);
            k+=1;
            if(k==this.locationlist.length){let validYN='N';
              let SectionId = null,ReqObj = null;
              if(this.productId=='14' || this.productId=='32'){
                SectionId = '45';if(type=='alter') validYN = 'Y';
                ReqObj = {
                  "Createdby": this.loginId,
                  "SectionId": section,
                  "ProductId": this.productId,
                  "InsuranceId": this.insuranceId,
                  "ProductEmployeeSaveReq": locationList,
                  "QuoteNo": this.quoteNo
                }
              }
              else if(this.productId=='25'){ SectionId = '39';
                ReqObj = {
                  "CreatedBy": this.loginId,
                  "QuoteNo":sessionStorage.getItem('quoteNo'),
                  "RequestReferenceNo":this.quoteRefNo,
                  "SectionId":'39',
                  "Type":'C',
                  "ProductId": this.productId,
                  "Companyid": this.insuranceId,
                  "BranchCode": this.branchCode,
                  "ContentRiskDetails":locationList
                }
                urlLink = `${this.motorApiUrl}api/savecontentrisk`;
              }
              //let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
              this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
                (data: any) => {
                  let res: any = data;
                  if (data.ErrorMessage.length != 0) {
                    if (res.ErrorMessage) {
                      let entry = res.ErrorMessage.some(ele=>ele.Code=='333' || ele.Code=='111' || ele.Code=='222');
                      if(entry){
                        let ulList = '';
                        for (let index = 0; index < res.ErrorMessage.length; index++) {
                          const element = res.ErrorMessage[index];
                           ulList +=`<li class="list-group-login-field">
                            <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                            <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                          </li>`
                        }
                      }
                  }
                }
                else{
                  if(this.productId=='19' && this.eight)  this.selectedTab +=1; 
                  else if(this.productId=='19' && this.nine)this.selectedTab +=1; 
                  else this.checkValidation();
                }
          
              },
              (err) => { },
              );
            }
            
          }
        }
      }
      else{}
    }
    
  }
  onAccessoriesSubmit(){
    // this.chassisNoError = false;this.accessoriesTypeError = false;this.serialNoError = false;this.sumInsuredError = false;
    // this.totalAccSIError = false;
    // if(i==0){
    //   this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
    //   this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
    //   this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
    //   this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
    //   this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
    //   this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
    //   this.productItem.ContentSI=null; this.productItem.ContentLocation=null;this.productItem.ContentSerialNo=null;
    //   this.productItem.ContentDesc=null;this.productItem.ContentType=null;this.currentContentIndex=null;
    //   this.editContentSection = false;
    //   this.enableContentEditSection = false;
    // } 
    if(this.Riskdetails.length==1){
      this.productItem.AccessoriesChassisNo = 1;
    }
    console.log('yyyyyyyyyyyy',this.productItem.AccessoriesChassisNo);
    let i =0;
    if(this.productItem.AccessoriesChassisNo==null || this.productItem.AccessoriesChassisNo==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.AccessoriesType==null || this.productItem.AccessoriesType==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.AccessoriesSerialNo==null || this.productItem.AccessoriesSerialNo==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.AccessoriesSI==null || this.productItem.AccessoriesSI=='0' || this.productItem.AccessoriesSI==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    else if(this.totalAccessoriesSI > this.actualAssSI){
      i+=1;
      this.totalAccSIError = true;
      this.onsubmitAccessories()
    }
      console.log('JJJJJJJJJ',this.productItem.AccessoriesChassisNo,this.productItem.AccessoriesSI,this.productItem.AccessoriesSerialNo,this.currentAccessoriesIndex);
      // this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
      // this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
      // this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
      // this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
      // this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
      // this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      if(i==0){
        if(this.currentAccessoriesIndex!=null){
          this.accessoriesList[this.currentAccessoriesIndex] = {
            'SumInsured': this.productItem.AccessoriesSI,
            'RiskId': this.productItem.AccessoriesChassisNo,
            'SerialNoDesc': this.productItem.AccessoriesSerialNo,
            'ItemId':this.productItem.AccessoriesType,
            'LocationId': this.productItem.AccessoriesChassisNo,
            'ContentRiskDesc':this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label
          };
          console.log(this.accessoriesList[this.currentAccessoriesIndex]);
          // this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = this.productItem.AccessoriesSI//this.contentSI;
          // this.accessoriesList[this.currentAccessoriesIndex]['RiskId'] = this.productItem.AccessoriesChassisNo;
          // this.accessoriesList[this.currentAccessoriesIndex]['SerialNoDesc'] = this.productItem.AccessoriesSerialNo;//this.serialNoDesc
          // this.accessoriesList[this.currentAccessoriesIndex]['ItemId'] = this.productItem.AccessoriesType//this.contentId;
          // this.accessoriesList[this.currentAccessoriesIndex]['LocationId'] = this.productItem.AccessoriesChassisNo;
          // this.accessoriesList[this.currentAccessoriesIndex]['ContentRiskDesc'] =this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
          //this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
          this.currentAccessoriesIndex = this.accessoriesList.length;
          this.editAccessoriesSection = false;
          this.enableAccessoriesEditSection = false;
          this.productItem = new ProductData();
        }
        else{
          this.accessoriesList[this.currentAccessoriesIndex] = {
            'SumInsured': null,
            'RiskId': null,
            'SerialNoDesc': null,
            'ItemId':null,
            'LocationId': null,
            'ContentRiskDesc':null
          };
          this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = this.productItem.AccessoriesSI//this.contentSI;
          this.accessoriesList[this.currentAccessoriesIndex]['RiskId'] = this.productItem.AccessoriesChassisNo;
          this.accessoriesList[this.currentAccessoriesIndex]['SerialNoDesc'] = this.productItem.AccessoriesSerialNo;//this.serialNoDesc
          this.accessoriesList[this.currentAccessoriesIndex]['ItemId'] = this.productItem.AccessoriesType//this.contentId;
          this.accessoriesList[this.currentAccessoriesIndex]['LocationId'] = this.productItem.AccessoriesChassisNo;
          this.accessoriesList[this.currentAccessoriesIndex]['ContentRiskDesc'] =this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
          //this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
          this.currentAccessoriesIndex = this.accessoriesList.length;
          this.editAccessoriesSection = false;
          this.enableAccessoriesEditSection = false;
          this.productItem = new ProductData();
         
        }
      }
      console.log("Final Accessories List ",this.accessoriesList)
 
      
  }
  onContentSubmit(){
      this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
      this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
      this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
      this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
      this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
      this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      this.editContentSection = false;
      this.enableContentEditSection = false;
      this.productItem = new ProductData();
      this.productItem.AccOccupation = this.accidentOccupation;
  }
  onAllRiskSubmit(){
    console.log("Final Additional Info",this.form,this.productItem)
    let i=0;
    if(this.productItem.RiskSI=='' || this.productItem.RiskSI==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.RiskDescription=='' || this.productItem.RiskDescription==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.RiskSerialNo=='' || this.productItem.RiskSerialNo==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.RiskLocation=='' || this.productItem.RiskLocation==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.RiskContentType=='' || this.productItem.RiskContentType==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(i==0){
    this.risk[this.currentRiskIndex]['SumInsured'] = this.productItem.RiskSI;
    this.risk[this.currentRiskIndex]['ContentRiskDesc'] = this.productItem.RiskDescription;
    this.risk[this.currentRiskIndex]['SerialNoDesc'] = this.productItem.RiskSerialNo,
    this.risk[this.currentRiskIndex]['RiskId'] = this.productItem.RiskLocation;//this.serialNoDesc
    this.risk[this.currentRiskIndex]['ItemId'] =this.productItem.RiskContentType; 
    this.productItem=new ProductData();//this.contentRiskDesc;
    this.editRiskSection= false;
    this.enableAllriskEditSection=false;
    }
  }

  onElectronicSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    if(this.productItem.ElqJoin==null || this.productItem.ElqJoin==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqList==null || this.productItem.ElqList==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqLocation==null || this.productItem.ElqLocation==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqPeriod==null || this.productItem.ElqPeriod==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.Elqmake==null || this.productItem.Elqmake==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqSI==null || this.productItem.ElqSI==''){i+=1;this.form.markAllAsTouched();}
    if(i==0){
      this.ElectronicItem[this.currentElectronicIndex]['SumInsured'] = this.productItem.ElqSI;//this.contentSI;
      this.ElectronicItem[this.currentElectronicIndex]['ContentRiskDesc'] = this.ElectronicList.find(ele=>ele.Code==this.productItem.ElqList).label;
      this.ElectronicItem[this.currentElectronicIndex]['PurchaseMonth'] = this.productItem.ElqJoin;//this.serialNoDesc
      this.ElectronicItem[this.currentElectronicIndex]['PurchaseYear'] =this.productItem.ElqPeriod; //this.contentRiskDesc;
      this.ElectronicItem[this.currentElectronicIndex]['ItemId'] = this.productItem.ElqList//this.contentId;
      this.ElectronicItem[this.currentElectronicIndex]['MakeAndModel'] = this.productItem.Elqmake;
      this.ElectronicItem[this.currentElectronicIndex]['RiskId'] = this.productItem.ElqLocation;
      //this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
    this.productItem = new ProductData();
      this.editElectronicSection = false;
      this.enableElectronicEquipmentSection = false;
    }   
  }

  onAccidentSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    if(this.productItem.AccSI==null || this.productItem.AccSI==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccidentLocation==null || this.productItem.AccidentLocation==''){i+=1;this.form.markAllAsTouched();}
    if(this.accidentOccupationId==null || this.accidentOccupationId==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccName==null || this.productItem.AccName==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccNationID==null || this.productItem.AccNationID==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccDob==null || this.productItem.AccDob==''){i+=1;this.form.markAllAsTouched();}
    if(i==0){
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = this.productItem.AccSI;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['RiskId'] = this.productItem.AccidentLocation;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['OccupationId'] = this.accidentOccupationId,
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['OccupationDesc'] = this.accidentOccupation;//this.serialNoDesc
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['PersonName'] =this.productItem.AccName; //this.contentRiskDesc;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Dob'] = this.productItem.AccDob;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['NationalityId'] = this.productItem.AccNationID;
      //this.contentId;
      //this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      this.productItem.AccSI=null;this.productItem.AccidentLocation=null;this.productItem.AccName=null;this.productItem.AccDob=null;
      this.productItem.AccNationID =null;
      this.currentPersonalAccidentIndex=null;
      this.editPersonalAccidentSection= false;
      this.enablePersonalAccEditSection =false;
    }
  }

  onIndSubmit(){
    console.log('PPPPPPPPPPPP',this.productItem.IndSI)
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
      this.Intermedity[this.currentPersonalIndIndex]['Salary'] = this.productItem.IndSI;
      this.Intermedity[this.currentPersonalIndIndex]['RiskId'] = this.productItem.IndLocation;
      this.Intermedity[this.currentPersonalIndIndex]['OccupationId'] = this.liabilityOccupationId;
      this.Intermedity[this.currentPersonalIndIndex]['OccupationDesc'] = this.liabilityOccupation;//this.serialNoDesc
      this.Intermedity[this.currentPersonalIndIndex]['PersonName'] =this.productItem.IndName; //this.contentRiskDesc;
      this.Intermedity[this.currentPersonalIndIndex]['Dob'] = this.productItem.IndDob;
      this.Intermedity[this.currentPersonalIndIndex]['NationalityId'] = this.productItem.IndNationID;
      this.productItem.IndSI=null;this.productItem.IndLocation=null;this.productItem.IndName=null;this.productItem.IndDob=null;
      this.productItem.IndNationID =null;
      this.currentPersonalIndIndex=null;
      this.editPersonalIndSection= false;
      this.enablePersonalIndEditSection =false;
    
  }

  valuechange(row) {
    this.newname = row.LocationName;
  }
  checkValidation(){
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/additionalinfovali`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Message=='Success') {
              this.router.navigate(['/quotation/plan/main/document-info']);
              //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
            }
          },
          (err) => { },
        ); 
  }
  onValueChange(event) {
    console.log("SumInsured", event);
    this.newname = event;
  }
  /*otheros=(event)=>{
    if(event.target.value === 'otheros'){
    $('#osother').show();
    }else{
    $('#osother').hide();}}*/
  getMedicalDetails(){
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "SectionId": "70"
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           if(data.Result?.length!=0){
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
            this.productItem.EmployeeName = data.Result[0]?.EmployeeName;
            this.productItem.DateOfJoiningYear = data.Result[0]?.DateOfJoiningYear;
            this.productItem.HighestQualificationHeld = data.Result[0]?.HighestQualificationHeld;
            this.productItem.IssuingAuthority = data.Result[0]?.IssuingAuthority;
           }
           else{
              this.productItem = new ProductData();
              this.formSection = true; this.viewSection = false;
           }
        }
      
      },
      (err) => { },
    );
  }
  getContentList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/contentrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.contentList = data.Result;

            
        }
      },
      (err) => { },
    );
  }
  getOccupationList(sectionId){
    let ReqObj = {},urlLink:any='';
    if(this.productId!='14' && this.productId!='32' && this.productId!='19'){
      ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode": this.branchCode,
        "ProductId":this.productId
      }
      urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    }
    else{
      ReqObj = {
        "SectionId": sectionId,
        "ProductId": this.productId,
        "QuoteNo": this.quoteNo
      }
      urlLink = `${this.CommonApiUrl}dropdown/occupations`;
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='14' || sectionId=='45' || this.productId=='32' || sectionId=='43'){
            let defobj = [{'label':'--Select--','value':null}];
                  this.employeeOccupationList = data.Result;
                  for (let i = 0; i < this.employeeOccupationList.length; i++) {
                    this.employeeOccupationList[i].label = this.employeeOccupationList[i]['CodeDesc'];
                    this.employeeOccupationList[i].value = this.employeeOccupationList[i]['Code'];
                    if (i == this.employeeOccupationList.length - 1) {
                      this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defobj.concat(this.employeeOccupationList);
                    }
                  }
          }
          // else if(this.productId=='32' || sectionId=='43'){
          //   let defobj = [{'label':'--Select--','value':null}];
          //   this.fidelityOccupationList = data.Result;
          //   for (let i = 0; i < this.fidelityOccupationList.length; i++) {
          //     this.fidelityOccupationList[i].label = this.fidelityOccupationList[i]['CodeDesc'];
          //     this.fidelityOccupationList[i].value = this.fidelityOccupationList[i]['Code'];
          //     delete this.fidelityOccupationList[i].CodeDesc;
          //     if (i == this.fidelityOccupationList.length - 1) {
          //       this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defobj.concat(this.fidelityOccupationList);
          //     }
          //     // console.log('JJJJJJJJJJJJJJJJJJJ',this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options)
          //   }
          // }
          else 
          {
            this.occupationList = data.Result;
            let defobj = [{'label':'--Select--','value':null}];
            for (let i = 0; i < this.occupationList.length; i++) {
              this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
              this.occupationList[i].value = this.occupationList[i]['Code'];
              if (i == this.occupationList.length - 1) {
                if(this.eight){
                  this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defobj.concat(this.occupationList);
                }
                if(this.seven){
                  this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defobj.concat(this.occupationList);
                }
                // console.log('JJJJJJJJJJJJJJJJJJJ',this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options);
                //this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.employeeOccupationList;
              }
            }
          }
          
        }
      },
      (err) => { },
    );
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
          let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
          this.dropList = defaultObj.concat(data.Result);
          for (let i = 0; i < this.dropList.length; i++) {
            this.dropList[i].label = this.dropList[i]['CodeDesc'];
            this.dropList[i].value = this.dropList[i]['Code'];
            if (i == this.dropList.length - 1) {
              // console.log('HHHHHHHHHHHHHHHH',this.fieldsContent[0])
              // this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.dropList);
              // for(let fields of this.fieldsContent){
              //   let vars = fields.fieldGroup[0].fieldGroup[0].fieldGroup;
              //   for( let n of vars){
              //     alert(n.key)
              //     if(n.key=='Content'){
              //        n.props.options = defaultObj.concat(this.dropList);
              //     }
              //   }
              //   }
          }
            }
          }
            //this.getOccupationList();
        
      },
      (err) => { },
    );
  }
  getallriskListsplant(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantallrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result;
         
            //this.getOccupationList();

        }
      },
      (err) => { },
    );
  }
  getallriskLists(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/businessallrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultobj = [{'Code':'--Select--',"CodeDesc":'--Select--'}]
            this.allriskList = data.Result;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defaultobj.concat(this.allriskList);
              }
            }
            //this.getOccupationList();

        }
      },
      (err) => { },
    );
  }
getchassisAcc(){
//   if(this.productId=='5' && !this.buildingSection){
//     let i=0; this.ChassisList=[];
//     for (let cover of this.Riskdetails) {
//       //this.ChassisList=cover.Chassisnumber;
//       this.ChassisList.push({ "Code": String(i + 1), "CodeDesc": cover.Chassisnumber})
//       i+=1;
//     }
//     console.log('Chasssis list',this.ChassisList)
//     if(this.ChassisList.length!=0){
//       for (let i = 0; i < this.ChassisList.length; i++) {
//         this.ChassisList[i].label = this.ChassisList[i]['CodeDesc'];
//         this.ChassisList[i].value = this.ChassisList[i]['Code'];
//         delete this.ChassisList[i].CodeDesc;
//         if (i == this.ChassisList.length - 1) {
//           this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.ChassisList;
//         }
//       }
//       console.log('Risk List',this.ChassisList);
//     }
// }
let ReqObj = {
  "QuoteNo":sessionStorage.getItem('quoteNo')
}
let urlLink = `${this.CommonApiUrl}dropdown/motorWithaccessories`;
this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    if(data.Result){   
      let defaultObj=[{"label":"---Select---","value":null}];
      this.ChassisList = data.Result;
        for (let i = 0; i < this.ChassisList.length; i++) {
          this.ChassisList[i].label = this.ChassisList[i]['CodeDesc'];
          this.ChassisList[i].value = this.ChassisList[i]['Code'];
          delete this.ChassisList[i].CodeDesc;
          if (i == this.ChassisList.length - 1 && !this.newacc) {
            this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.ChassisList);
            if(this.ChassisList.length==1 && this.productItem){
              this.productItem.AccessoriesChassisNo = this.ChassisList[0].Code;
            }
          }
        }
        console.log('Risk List',this.ChassisList);
    }
  },
  (err) => { },
); 
}
  getAccesroies(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/motorcontent`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){ 
          let defaultObj = [{"Code":null,"CodeDesc":"---Select---"}];  
          this.AccLists = defaultObj.concat(data.Result);
          for (let i = 0; i < this.AccLists.length; i++) {
            this.AccLists[i].label = this.AccLists[i]['CodeDesc'];
            this.AccLists[i].value = this.AccLists[i]['Code'];
            if (i == this.AccLists.length - 1 && !this.newacc) {
              this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.AccLists;
            }
            else if(i == this.AccLists.length - 1 && this.newacc){
              this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.AccLists;
            }
          }
          console.log('Accessories List',this.AccLists);
        }
      },
      (err) => { },
    ); 
  }
  getcontenttype(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/cybercontents`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.CyperList = data.Result;
            let defaultobj = [{'Code':'--Select--',"CodeDesc":'--Select--'}]
            for (let i = 0; i < this.CyperList.length; i++) {
              this.CyperList[i].label = this.CyperList[i]['CodeDesc'];
              this.CyperList[i].value = this.CyperList[i]['Code'];
              if (i == this.CyperList.length - 1) {
                this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defaultobj.concat(this.CyperList);
              }
            }
            console.log('CyberContent List',this.CyperList);
        }
      },
      (err) => { },
    );
  }
  getallriskList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/allrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultobj = [{'Code':'--Select--',"CodeDesc":'--Select--','label':'--Select--','value':''}]
            this.allriskList = data.Result;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                if(this.third)
                for(let x of this.fieldsRisk){
                  let vars = x.fieldGroup[0].fieldGroup[0];
                  let j=0;
                  for( let n of vars.fieldGroup){            
                    if(n.type=='ngselect'){
                    if(n.props.label=='Content Type'){
                       this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.allriskList);
                    }
                  }
                    j+=1;
                  }
            }
                //this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
              }
            }

        }
      },
      (err) => { },
    );
  }
  getallriskMachinery(){
    console.log('QQQQQQQQQQ333333333',this.quoteNo);
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}dropdown/machinerycontent`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultobj = [{'Code':'--Select--',"CodeDesc":'--Select--'}]
            this.allriskList = data.Result.ContentTypeRes;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                for(let x of this.fieldsMachinery){
                  let vars = x.fieldGroup[0].fieldGroup[0];
                  let j=0;
                  for( let n of vars.fieldGroup){              
                    if(n.type=='ngselect'){
                      console.log('templates111',n.props.label);
                    if(n.props.label=='Content Type'){
                       this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.allriskList);
                    }
                  }
                    j+=1;
                  }
            }
                //this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = this.allriskList;
              }
            }
            //this.getOccupationList()
        }
      },
      (err) => { },
    );
  }
  onSave(type,requestType) {
    if (this.building.length != 0) {
      
      console.log("Building Details",this.building);
      let i = 0, buildReqList: any[] = [];
      for (let build of this.building) {
        if (i == 0) {
          this.LocationList = [];
        }
        let sumInsured = null;
        if(this.sumInsured == true){
           if(build.BuildingSuminsured==undefined || build.BuildingSuminsured==null) sumInsured = null;
          // else if(build.BuildingSuminsured.includes(',')){ sumInsured = build.BuildingSuminsured.replace(/,/g, '') }
          else sumInsured = build.BuildingSuminsured;
        }
        else{
          sumInsured = 0;
        }

        this.LocationList.push({ "Code": String(i + 1), "CodeDesc": build.LocationName })
       
        let ReqObj = {

          "BuildingSuminsured":sumInsured,
          "BuildingAddress": build.BuildingAddress,
          "Createdby": this.loginId,
          "InbuildConstructType":"W",
          "QuoteNo":sessionStorage.getItem('quoteNo'),
          "RequestReferenceNo":this.quoteRefNo,
          "SectionId": build.SectionId,
          "LocationName":build.LocationName,

          /*"ApartmentOrBorder": null,
          "BuildingAreaSqm": null,
          "BuildingBuildYear": build.BuildingBuildYear,
          "BuildingCondition": null,
          "BuildingFloors": build.BuildingFloors,
          "BuildingOccupationType": null,
          "BuildingType": null,
          "BuildingUsageId": null,
          "BuildingUsageYn": null,
          "BuildingSuminsured": sumInsured,
          "BuildingAddress": build.BuildingAddress,
          "Createdby": this.loginId,
          "CustomerId": null,
          "InbuildConstructType": build.InbuildConstructType,
          "QuoteNo": sessionStorage.getItem('quoteNo'),
          "RequestReferenceNo": this.quoteRefNo,
          "RiskId": null,
          "SectionId": build.SectionId,
          "UpdatedDate": null,
          "Updatedby": this.loginId,
          "WithoutInhabitantDays": null,
          "LocationName":build.LocationName,*/


        }
        buildReqList.push(ReqObj);
        i += 1;
        if (i == this.building.length) {
          this.saveBuildingDetails(buildReqList,type,requestType);
        }
      }
      let defaultobj=[{'label':'--Select--','value':'--Select--'}]
      if((this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six) && !this.savedSection){
        this.savedSection = true;
        if(this.LocationList.length !=0){
          for (let j = 0; j < this.LocationList.length; j++) {
            this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
            this.LocationList[j].value = this.LocationList[j]['Code'];
            delete this.LocationList[j].CodeDesc;
            if (j == this.LocationList.length - 1) {
              if(this.first){
                for(let x of this.fieldsContent){
                  let vars = x.fieldGroup[0].fieldGroup[0];
                  let l=0;
                  for( let n of vars.fieldGroup){   
                    console.log('templates',n.type);              
                    if(n.type=='ngselect'){
                      
                    if(n.props.label=='Location'){
                       this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[l].props.options = defaultobj.concat(this.LocationList);
                    }
                  }
                    l+=1;
                  }
            }
                //this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
              }
              if(this.second){
                for(let x of this.fieldsPersonalAccident){
                  let vars = x.fieldGroup[0].fieldGroup[0];
                  let j=0;
                  for( let n of vars.fieldGroup){            
                    if(n.type=='ngselect'){
                    if(n.props.label=='Location'){
                       this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defaultobj.concat(this.LocationList);
                    }
                  }
                    j+=1;
                  }
            }
                //this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
              }
             if(this.fifth){
              for(let x of this.fieldsPersonalInd){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let j=0;
                for( let n of vars.fieldGroup){            
                  if(n.type=='ngselect'){
                  if(n.props.label=='Location'){
                     this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defaultobj.concat(this.LocationList);
                  }
                }
                  j+=1;
                }
          }
              //this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
             }
             if(this.six){
              for(let x of this.fieldsElectronic){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let j=0;
                for( let n of vars.fieldGroup){            
                  if(n.type=='ngselect'){
                  if(n.props.label=='Location'){
                     this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defaultobj.concat(this.LocationList);
                  }
                }
                  j+=1;
                }
          }
              //this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
             if(this.ten){
              this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultobj.concat(this.LocationList);
             }
             if(this.third){
              for(let x of this.fieldsRisk){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let l=0;
                for( let n of vars.fieldGroup){               
                  if(n.type=='ngselect'){
                    
                  if(n.props.label=='Location'){
                     this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[l].props.options = defaultobj.concat(this.LocationList);
                  }
                }
                  l+=1;
                }
          }
              //this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
            if(this.nine){
              for(let x of this.fieldsMachinery){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let j=0;
                for( let n of vars.fieldGroup){              
                  if(n.type=='ngselect'){
                    console.log('templates111',n.props.label);
                  if(n.props.label=='Location'){
                     this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.LocationList);
                  }
                }
                  j+=1;
                }
          }
              //this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
            if(this.seven){
             
              for(let x of this.fieldsEmpFields){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let j=0;
                for( let n of vars.fieldGroup){               
                  if(n.type=='ngselect'){
                  if(n.props.label=='Location'){
                     this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.LocationList);
                  }
                }
                  j+=1;
                }
          }
              //this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
            }
            if(this.eight){
              for(let x of this.fieldFEFields){
                let vars = x.fieldGroup[0].fieldGroup[0];
                let j=0;
                for( let n of vars.fieldGroup){               
                  if(n.type=='ngselect'){
                  if(n.props.label=='Location'){
                     this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.LocationList);
                  }
                }
                  j+=1;
                }
              }
            }
            }
          }
        }
      }
    }

    //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

  }
  checkEmplyeeSection(){
    if(this.productId=='57') return 'Group Personal Accident';
    else if(this.productId=='32') return 'Fidelity Details';
    else return 'Employee Details';
  }
  onSavePersonalAccident(type){
    if (this.PersonalAssistantList.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.PersonalAssistantList){
        if(entry.PersonName!='' && entry.RiskId!='' && entry.Salary!=0 && entry.Salary!='0'){
          let salary;
          if(entry.Salary==undefined || entry.Salary==null) salary = null;
          // else if(entry.Salary.includes(',')){ salary = entry.Salary.replace(/,/g, '') }
          else salary = entry.Salary;
            let data = {
              "Dob": entry.Dob,
                "Height": null,
                "OccupationId": entry.OccupationId,
                "PersonName": entry.PersonName,
                "NationalityId": entry.NationalityId,
                "Salary": salary,
                "Weight": null,
                "RiskId": entry.RiskId,
                "SerialNo": entry.SerialNo
            }
            if(data.Dob!=null){
                data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
            }
            reqList.push(data);
        }
          i+=1;
          if(i==this.PersonalAssistantList.length){
            this.finalSaveRiskDetails(type,reqList,'PA');
          }
      }

    }
  }
  onSaveElectronic(){
  console.log('SSSSSSSSSSSS');
  console.log('tttttttt',this.ElectronicItem)
  if (this.ElectronicItem.length != 0){

      let i=0, reqList =[];
      for(let entry of this.ElectronicItem){
          /*let data = {
            "ItemId": entry.ItemId,
            "ItemValue": entry.SumInsured,
          "MakeAndModel": entry.MakeAndModel,
          "PurchaseMonth": entry.PurchaseMonth,
          "PurchaseYear": entry.PurchaseYear,
          "RiskId": entry.RiskId,
          "SerialNo": entry.SerialNo,
          "SumInsured":entry.SumInsured
          }*/
          let sumInsured;
          if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
          // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
          else sumInsured = entry.SumInsured;
          /*obj['SumInsured'] = sumInsured
          obj['ItemValue'] = sumInsured
          obj['RiskId'] = "1"
          obj['SerialNo']="856757"*/
          let data = {
            "ItemId": entry.ItemId,
            "ItemValue": sumInsured,
          "MakeAndModel": entry.MakeAndModel,
          "PurchaseMonth": entry.PurchaseMonth,
          "PurchaseYear": entry.PurchaseYear,
          "RiskId": entry.RiskId,
          "ContentRiskDesc":entry.ContentRiskDesc,
          "SerialNoDesc": entry.SerialNoDesc,
          "SerialNo":"856757",
          "SumInsured":sumInsured
        }
          reqList.push(data)
          i+=1;
          if(i==this.ElectronicItem.length){
            this.finalSaveRiskDetails(null,reqList,'E');
          }
      }
    }
  }

  onCyberSave(){
    console.log('PPPPPPPPPPPP',this.CyberItem)
    if (this.CyberItem.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.CyberItem){
          let data = {
            "ItemId": entry.ItemId,
            "RiskId": entry.RiskId,
            "ContentRiskDesc":entry.ContentRiskDesc,
            "SerialNoDesc":entry.SerialNoDesc,
            "MakeAndModel":entry.MakeAndModel,
            "ItemValue":entry.ContentRiskDesc,
            "Name":entry.ContentRiskDesc,
            "ManufactureYear": entry.ManufactureYear
          }
          reqList.push(data);
          i+=1;
          if(i==this.CyberItem.length){
            this.finalSaveRiskDetails(null,reqList,'E');
          }
      }

    }
  }
  onSavePersonalIntermedity(type)
  {
    if (this.Intermedity.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.Intermedity){
        let salary;
        if(entry.Salary==undefined || entry.Salary==null) salary = null;
        // else if(entry.Salary.includes(',')){ salary = entry.Salary.replace(/,/g, '') }
        else salary = entry.Salary;
          let data = {
              "Dob": entry.Dob,
              "Height": entry.Height,
              "OccupationId": entry.OccupationId,
              "PersonName": entry.PersonName,
              "NationalityId": entry.NationalityId,
              "Salary": salary,
              "Weight": entry.Weight,
              "RiskId": entry.RiskId,
              "SerialNo": entry.SerialNo
          }
          if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }
          reqList.push(data);
          i+=1;
          if(i==this.Intermedity.length){
            this.finalSaveRiskDetails(type,reqList,'PI');
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
          }
      }

    }
    
  }
  finalSaveRiskDetails(requestType,reqList,type){
 let ReqObj;let urlLink;
    let sectionId=null;
    if(type=='MA'){sectionId='41';}
    if(type=='C'){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "47",
       "Type":type,
       "Companyid": this.insuranceId,
       "ProductId": this.productId,
       "BranchCode": this.branchCode,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='A' && this.productId!='39'){
      console.log('AAAAAAAAA')
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "3",
       "Type":type,
       "Companyid": this.insuranceId,
       "ProductId": this.productId,
       "BranchCode": this.branchCode,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='MA'){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "41",
       "Type":'MB',
      
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='EA' && (this.productId=='5' || this.productId=='29')){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "99999",
      "Companyid": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='E' && this.productId!='42' && this.productId!='25'){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "41",
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='E' && this.productId=='42'){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId":this.cyberSectionId,
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='E' && this.productId=='25'){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId":'39',
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='PI'){
      ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": "36",
        "Description": "Accident Details",
         "Type":type,
         "PersonalDetails":reqList

      }
      urlLink = `${this.motorApiUrl}api/savepersonalaccident`;
    }
    if(type=='PA'){
      ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": "35",
        "Description": "Accident Details",
         "Type":type,
         "PersonalDetails":reqList

      }
      urlLink = `${this.motorApiUrl}api/savepersonalaccident`;
    }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          if (data.ErrorMessage.length != 0) {
            
            if (res.ErrorMessage) {
              
            }
          }
          else {
            this.visibleContent=false;
            this.visibleAllRisk=false;
             this.finalFormSubmit(type,requestType); }
        },
        (err) => {},
      );
  }
  finalFormSubmit(type,requestType){
    if(type=='C' && requestType=='proceed'){
      if (this.second || this.third || this.fifth || this.six || this.nine) {
        this.fourth = true;
        this.selectedTab = this.selectedTab+1;
        if(this.third){
          this.getallriskDetails();
        }
        console.log('Second Fields');
        this.accidentOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationTypeDesc;
      this.accidentOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationType;
        this.productItem.AccOccupation = this.accidentOccupation;
      }
      else{
        if(this.productId=='19' && this.seven){
          this.fourth = true;
          this.selectedTab = this.selectedTab+1;
        }
        else this.checkValidation();
      }
    }
    else if(type=='PA'){
      if(requestType=='proceed'){
        if (this.third || this.fifth || this.six) {
          this.fourth = true;
          
          this.selectedTab = this.selectedTab+1;
        }
        else{
          this.productItem.AccOccupation = this.accidentOccupation
          this.checkValidation();
        }
      }
      else{
        this.currentPersonalAccidentIndex = this.PersonalAssistantList.length;
        this.productItem.AccOccupation = this.accidentOccupation;
        //this.PersonalAssistantList = this.PersonalAssistantList.filter(ele=>ele.Salary!=null && ele.Salary!='' && ele.Dob!='' && ele.Dob!=null && ele.PersonName!=null && ele.PersonName!='' && ele.NationalityId!='');
        this.productItem.AccSI = '0';this.productItem.AccidentLocation='';this.productItem.AccName='';this.productItem.AccDob='';this.productItem.AccNationID='';
        let fieldList = this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup;
        this.saveSection=false;
        for(let field of fieldList){
          if(field.key!="AccOccupation") field.formControl.setValue('');
        }
      }
    }
    else if(type=='A' && requestType=='proceed'){
      if (this.fifth) {
        this.fourth = true;
        this.selectedTab = this.selectedTab+1;
      }
      else if(this.nine){
        this.selectedTab = this.selectedTab+1;
      }
      else{
        this.checkValidation();
      }
    }
    else if(type=='MA' || (type=='PI' && requestType=='proceed') || type=='E' || type=='EA') this.checkValidation();
  }
  onSaveAllRisk(type){
    if (this.TableRowAllRisk.length != 0) {
      let i=0, reqList =[],locationId;
      for(let location of this.locationlist ){
        locationId = location.LocationId;
      }
      for(let entry of this.TableRowAllRisk){
        let sumInsured;
        let j=0;
        if(entry.ItemId!=null && entry.ItemId!='' && entry.ItemId!=undefined) entry['ContentTypeError']=false;
        else{j+=1; entry['ContentTypeError']=true;}
        if(entry.SumInsured!=null && entry.SumInsured!='' && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
        else{ j+=1; entry['SumInsuredError']=true;}
        if(entry.Serial!=null && entry.Serial!='' && entry.Serial!=undefined ){ entry['SerialNoDescError']=false;}
        else{ j+=1; entry['SerialNoDescError']=true;}
        if(entry.Description!=null && entry.Description!='' && entry.Description!=undefined){ entry['ContentRiskDescError']=false;}
        else{ j+=1; entry['ContentRiskDescError']=true;}
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
             "ItemId":entry.ItemId,
              "RiskId":i+1,
              "ContentRiskDesc":entry.Description,
              "SerialNoDesc": entry.Serial,
              "MakeAndModel":"TN123",
              "SerialNo":null,
              "ItemValue":this.getContentTypeDescription(entry.ItemId),
              "SumInsured":sumInsured,
              "LocationId":locationId,
          }
          /*if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }*/
          reqList.push(data)
          i+=1;
          if(i==this.TableRowAllRisk.length)  this.finalSaveRiskDetails(type,reqList,'A');
          // reqList.push(data);
          // i+=1;
          // if(i==this.Cotentrisk.length){
          //   this.finalSaveRiskDetails(reqList,'C');
          // }
      }

    }
  }
  onSaveAccessories(){
    if (this.accessoriesList.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.accessoriesList){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          if(entry.ItemId!=null && entry.RiskId!=null && entry.ContentRiskDesc!=null && entry.SerialNoDesc!=null && entry.SumInsured!=null){
            let data = {
              "ItemId":entry.ItemId,
              "RiskId":entry.RiskId,
              "ContentRiskDesc":entry.ContentRiskDesc,
              "SerialNoDesc": entry.SerialNoDesc,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured
            }
            reqList.push(data);
          }
          i+=1;
          if(i==this.accessoriesList.length){
            this.finalSaveRiskDetails(null,reqList,'EA');
          }
      }

    }
  }

  onSaveContentRisk(type){
    if (this.TableRow.length != 0) {
      let i=0, reqList =[],locationId;
      for(let location of this.locationlist ){
        locationId = location.LocationId;
      }
      for(let entry of this.TableRow){
        let sumInsured,RiskId;
        let j=0;
        if(entry.ItemId!=null && entry.ItemId!='' && entry.ItemId!=undefined) entry['ContentTypeError']=false;
        else{j+=1; entry['ContentTypeError']=true;}
        if(entry.SumInsured!=null && entry.SumInsured!='' && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
        else{ j+=1; entry['SumInsuredError']=true;}
        if(entry.SerialNoDesc!=null && entry.SerialNoDesc!='' && entry.SerialNoDesc!=undefined ){ entry['SerialNoDescError']=false;}
        else{ j+=1; entry['SerialNoDescError']=true;}
        if(entry.ContentRiskDesc!=null && entry.ContentRiskDesc!='' && entry.ContentRiskDesc!=undefined){ entry['ContentRiskDescError']=false;}
        else{ j+=1; entry['ContentRiskDescError']=true;}
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.ItemId,
              "RiskId":i+1,
              "ContentRiskDesc":entry.ContentRiskDesc,
              "SerialNoDesc": entry.SerialNoDesc,
              "MakeAndModel":"TN123",
              "SerialNo":null,
              "ItemValue":this.getContentTypeDescription(entry.ItemId),
              "SumInsured":sumInsured,
              "LocationId":locationId,
          }
          /*if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }*/
          reqList.push(data);
          i+=1;
          if(i==this.TableRow.length){
            this.finalSaveRiskDetails(type,reqList,'C');
          }
      }

    }
  }
  onSaveMachineryRisk(){
    if (this.machineries.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.machineries){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.ItemId,
              "RiskId":entry.RiskId,
              "ContentRiskDesc":entry.ContentRiskDesc,
              "SerialNoDesc": entry.SerialNoDesc,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured,
              "Name":entry.Name,
              "Brand":entry.Brand
          }
          /*if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }*/
          reqList.push(data);
          i+=1;
          if(i==this.machineries.length){
            this.finalSaveRiskDetails(null,reqList,'MA');
          }
      }

    }
  }
  // onSaveAllRisk(){
  //   if (this.risk.length != 0) {
  //     let i=0, reqList =[];
  //     for(let entry of this.risk){
  //         let obj = entry;
  //         let sumInsured;
  //         if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
  //         // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
  //         else sumInsured = entry.SumInsured;
  //         obj['SumInsured'] = sumInsured
  //         reqList.push(obj)
  //         i+=1;
  //         if(i==this.risk.length)  this.finalSaveRiskDetails(reqList,'A');
  //       }
  //     }
  // }

  finalSavecontentDetails(reqList,type){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo": this.quoteRefNo,
      "SectionId": "36",
      "Description": "Accident Details",
       "Type":type,
       "PersonalDetails":reqList

    }
    let urlLink = `${this.motorApiUrl}api/savecontentrisk`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res: any = data;
      if (data.ErrorMessage.length != 0) {
        if (res.ErrorMessage) {

        }
      }
      else {
        // let type: NbComponentStatus = 'success';
        // const config = {
        //   status: type,
        //   destroyByClick: true,
        //   duration: 4000,
        //   hasIcon: true,
        //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
        //   preventDuplicates: false,
        // };
          if (this.third) {
            this.fourth = true;
            this.selectedTab = 2;
          }
      }

    },
    (err) => { },
  );
  }
  saveBuildingDetails(ReqObj,type,requestType) {
    // let urlLink = `${this.motorApiUrl}api/buildingdetails`;
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     let res: any = data;
    //     if (data.ErrorMessage.length != 0) {
    //       if (res.ErrorMessage) {

    //       }
    //     }
    //     else {
    //       // let type: NbComponentStatus = 'success';
    //       // const config = {
    //       //   status: type,
    //       //   destroyByClick: true,
    //       //   duration: 4000,
    //       //   hasIcon: true,
    //       //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //       //   preventDuplicates: false,
    //       // };


    //       if (data.Result) {
    //         console.log('PPPPPPPPP',data.Result);
    //         console.log('SSSSSSSSSSSS',type,this.first);
    //         this.allfields = true;
    //         //this.first=true;
    //         if(type=='Content Risk'){
    //           this.fourth = true;
    //           // this.first=true;
    //           this.getContentDetails();
    //           this.selectedTab = 1;
    //         }
    //         else if(type=='Personal Accident'){
    //           this.fourth = true;
    //           this.getPersonalAccidentDetails();
    //           this.selectedTab = 1;
    //         }
    //         else if(type=='All Risk'){
    //           this.fourth = true;this.getallriskDetails();
    //           this.selectedTab = 1;
    //         }
    //         else if(type=='Personal Indemenity'){
    //           this.fourth = true;this.getPersonalIntermediaryDetails();
    //           this.selectedTab = 1;
    //         }
    //         else if(type=='ElectricalEquipment'){
    //           this.fourth = true;this.getElectronicEquipment('direct');
    //         }
    //         else if(type== 'Machinery Breakdown'){
    //           this.nine =true;
    //           this.getMachineryRisk();
    //           }
              
    //         else if (this.first||this.second || this.third || this.fifth || this.six || this.seven || this.eight) {
             
    //           console.log('Methodss',this.first,this.second,this.third,this.fifth,this.six,this.seven,this.eight,this.nine);
    //           this.fourth = true;
    //           if(this.first){
    //             this.getContentDetails();
    //           }
    //           else if(this.second){
    //             this.getPersonalAccidentDetails();
    //           }
    //           else if(this.third){
    //             this.getallriskDetails();
    //           }
    //           else if(this.fifth){
    //             this.getPersonalIntermediaryDetails();
    //           }
    //           else if(this.six){
    //             this.getElectronicEquipment('direct');
    //             }
    //             else if(this.nine){
    //               this.getMachineryRisk();
    //               }
    //               // else if(this.seven){
    //               //   this.getEmployeeDetails();
    //               // }
    //           this.selectedTab = 1;
    //         }
    //         else if(this.productId=='42') this.selectedTab = 1;
    //         else if(this.productId=='43') this.selectedTab = 1;
    //         else if(this.productId=='56') this.selectedTab = 1;
    //         else if(this.productId=='57') this.selectedTab = 1;
    //         else if(this.productId=='60') {this.getHealthData();this.selectedTab = 1;this.eleven=true;}
    //         else{
    //           this.checkValidation();
    //           //if(this.productId=='1' || this.productId=='16' || this.productId=='6' || this.productId=='27')
    //         }
    //       }
    //     }

    //   },
    //   (err) => { },
    // );
  }
  onAccsSave(){

  }
  onContentSave() {
    {
      let ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": "12345",
        "RequestReferenceNo": this.quoteRefNo,
        "RiskId": "1",
        "SectionId": this.SectionId,
        "Type": "C",
        "ContentRiskDetails": this.Cotentrisk
      }

      let urlLink = `${this.motorApiUrl}api/savecontentrisk`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {

            }
          }
          else {
            // let type: NbComponentStatus = 'success';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   'Content Details',
            //   'Content Details Inserted/Updated Successfully',
            //   config)

            if (data.Result) {
              this.quote = data.Result.RequestReferenceNo;
            }

            this.checkValidation();
            

          }

        },
        (err) => { },
      );
    }
  }
  getbuilding() {
    // let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
    // let ReqObj = {
    //   "QuoteNo": sessionStorage.getItem('quoteNo'),
    // }
    // console.log('SSSSSSSSSS', this.quote)
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     let res: any = data;
    //     if (res.Result.length != 0) {
    //       if(this.endorsementSection){
    //         console.log('Enable Building Suminsureds',this.enableFieldsList);
    //         //this.buildingSection = !this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
    //         this.buildingSection = this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
    //       }
    //       else this.buildingSection = false;
    //       //else this.buildingSection = false;
    //       this.building = res.Result;
    //       console.log('GHSectionsss',this.building)
    //       this.Buildingsections=true;
    //       let i=0;
    //       for(let entry of this.building){
    //         if (i == 0) {
    //           this.LocationList = [];
    //         }
    //         this.LocationList.push({ "Code": String(this.LocationList.length+1), "CodeDesc": entry.LocationName })
    //         i+=1;
    //       }

    //       if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
    //         let defaultobj=[{'label':'--Select--','value':'--Select--'}]
    //         if(this.LocationList.length !=0){
    //           this.allfields=true;
    //           for (let j = 0; j < this.LocationList.length; j++) {
    //             this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
    //             this.LocationList[j].value = this.LocationList[j]['Code'];
    //             delete this.LocationList[j].CodeDesc;
    //             if (j == this.LocationList.length - 1) {
    //               if(this.first){
    //                 for(let x of this.fieldsContent){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let l=0;
    //                   for( let n of vars.fieldGroup){   
    //                     console.log('templates',n.type);              
    //                     if(n.type=='ngselect'){
                          
    //                     if(n.props.label=='Location'){
    //                        this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[l].props.options = defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     l+=1;
    //                   }
    //             }
    //                 //this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
    //               }
    //               if(this.six){
    //                 for(let x of this.fieldsElectronic){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let j=0;
    //                   for( let n of vars.fieldGroup){            
    //                     if(n.type=='ngselect'){
    //                     if(n.props.label=='Location'){
    //                        this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     j+=1;
    //                   }
    //             }
    //                 //this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
    //               }
    //               if(this.second){
    //                 for(let x of this.fieldsPersonalAccident){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let j=0;
    //                   for( let n of vars.fieldGroup){            
    //                     if(n.type=='ngselect'){
    //                     if(n.props.label=='Location'){
    //                        this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     j+=1;
    //                   }
    //             }
    //                 //this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
    //               }
    //               if(this.fifth){
    //                 for(let x of this.fieldsPersonalInd){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let j=0;
    //                   for( let n of vars.fieldGroup){            
    //                     if(n.type=='ngselect'){
    //                     if(n.props.label=='Location'){
    //                        this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     j+=1;
    //                   }
    //             }
    //                 //this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
    //               }
    //               if(this.ten){
    //                 this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultobj.concat(this.LocationList);
    //               }
    //               if(this.third){
    //                 for(let x of this.fieldsRisk){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let l=0;
    //                   for( let n of vars.fieldGroup){               
    //                     if(n.type=='ngselect'){
    //                     if(n.props.label=='Location'){
    //                        this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[l].props.options = defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     l+=1;
    //                   }
    //             }
    //                 //this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
    //               }
    //               if(this.nine){
    //                 for(let x of this.fieldsMachinery){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let j=0;
    //                   for( let n of vars.fieldGroup){              
    //                     if(n.type=='ngselect'){
    //                       console.log('templates111',n.props.label);
    //                     if(n.props.label=='Location'){
    //                        this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     j+=1;
    //                   }
    //             }
    //                 //this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
    //               }
    //               if(this.seven){
    //                 for(let x of this.fieldsEmpFields){
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   let j=0;
    //                   for( let n of vars.fieldGroup){            
    //                     if(n.type=='ngselect'){
    //                     if(n.props.label=='Location'){
    //                        this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     j+=1;
    //                   }
    //             }
    //                 //this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
    //               }
    //               if(this.eight){
    //                 for(let x of this.fieldFEFields){
    //                   console.log('NNNNNNNNNNNNNNNN',x.fieldGroup[0].fieldGroup[0]);
    //                   let vars = x.fieldGroup[0].fieldGroup[0];
    //                   console.log('vars',vars);
    //                   let j=0;
    //                   for( let n of vars.fieldGroup){   
    //                     console.log('templates',n.type);              
    //                     if(n.type=='ngselect'){
    //                       console.log('templates111',n.props.label);
    //                     if(n.props.label=='Location'){
    //                        this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options = defaultobj.concat(this.LocationList);
    //                     }
    //                   }
    //                     j+=1;
    //                   }
    //             }
    //                 //this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
    //               }
    //             }
    //           }
    //         }
    //       }
   
       
    //       this.fourth = true;
    //       this.getTotalSICost('building');
    //     }
    //     else {
    //       this.AddNew();
    //       // this.building = [
    //       //   {
    //       //     "BuildingAddress": null,
    //       //     "BuildingBuildYear": null,
    //       //     "BuildingFloors": null,
    //       //     "InbuildConstructType": null,
    //       //     "BuildingSuminsured": null,
    //       //     "RiskId": null,
    //       //     SectionId: "1"
    //       //   }
    //       // ]
    //     }
    //     if(this.first){
    //       this.getdropList();
    //       this.getContentDetails();
    //     }
    //     else if(this.second){
    //       this.getPersonalAccidentDetails();
    //     }
    //     else if(this.third){
    //       this.getallriskDetails();
    //     }
    //     else if(this.fifth){
    //       this.getPersonalIntermediaryDetails();
    //     }
    //     else if(this.six){
    //       this.getElectronicEquipment('change');
    //       }
    //       else if(this.nine){
    //         this.getMachineryRisk();
    //         }
    //   })
  }
  onSIValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  onSerialNoChange(type){
    if(type=='content' || type=='machinery' || type=='accessories'){
      if(this.serialNoDesc){
        let value = this.serialNoDesc.replace(/[^a-z0-9_/-]/gi, "");
        this.serialNoDesc = value;
      }
    }
    // if(type=='allRisk'){
    //   let entry = this.risk[index];
    //   if(entry.SerialNoDesc){
    //     let value = entry.SerialNoDesc.replace(/[^a-z0-9_/-]/gi, "");
    //     this.risk[index]['SerialNoDesc'] = value;
    //   }
    // }
  }
  onContentRiskDescChange(type){
    if(type=='content'){
      let entry = this.contentRiskDesc;
      if(this.contentRiskDesc){
        let value = this.contentRiskDesc.replace(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/gi, "");
        this.contentRiskDesc = value;
      }
    }
    // if(type=='allRisk'){
    //   let entry = this.risk[index];
    //   if(entry.ContentRiskDesc){
    //     let value = entry.ContentRiskDesc.replace(/[^a-z0-9_/-]/gi, "");
    //     this.risk[index]['ContentRiskDesc'] = value;
    //   }
    // }
  }
  getLocationName(Id){
    let entry = this.LocationList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
      //return entry.CodeDesc;
    }
  }

  getElectronicName(Id){
    // console.log('IIIIIIIIIII',Id)
    // console.log('NNNNNNNNNN',this.LocationList)
    let entry = this.ElectronicList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
      //return entry.CodeDesc;
    }
  }

  getAssName(Id){
    let entry = this.ChassisList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
    }
  }
  getDeviceName(Id){
    let entry = this.CyperList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
      //return entry.CodeDesc;
    }
  }
  getContentName(rowData){
    let entry = this.dropList.find(ele=>ele.Code==rowData.ItemId);
    if(entry) return entry.label;
    else return '';
  }
  getContentssName(ItemId){
    let entry = this.allriskList.find(ele=>ele.Code==ItemId);
    if(entry) return entry.label;
    else return '';
  }
  getAssCont(ItemId){
    let entry = this.AccLists.find(ele=>ele.Code==ItemId);
    if(entry) return entry.label;
    else return '';
  }


  getContentsName(rowData){
    let entry = this.allriskList.find(ele=>ele.Code==rowData.ItemId);
    if(entry) return entry.CodeDesc;
    else return '';
  }
  CommaFormattedAlt(index,type) {
    if(type=='building'){
          let entry = this.building[index];
          console.log("Entry Came")
          if(entry.BuildingSuminsured){
            console.log("Entry Came 2")
            let value = entry.BuildingSuminsured.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.building[index]['BuildingSuminsured'] = value;
            this.getTotalSICost('building');
          }
    }
    if(type=='content'){
      let entry = this.Cotentrisk[index];
      if(entry.SumInsured){
        let value = entry.SumInsured.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.Cotentrisk[index]['SumInsured'] = value;
        this.getTotalSICost('content');
      }
    }
    if(type=='allRisk'){
      let entry = this.risk[index];
      if(entry.SumInsured){
        let value = entry.SumInsured.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.risk[index]['SumInsured'] = value;
        this.getTotalSICost('AllRisk');
      }
    }
    if(type=='personalInt'){
      let entry = this.Intermedity[index];
      if(entry.Salary){
        let value = entry.Salary.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.Intermedity[index]['Salary'] = value;
        this.getTotalSICost('personalInt');
      }
    }
    if(type=='ElectricalEquipment'){
      let entry = this.ElectronicItem[index];
      if(entry.SumInsured){
        let value = entry.SumInsured.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.ElectronicItem[index]['SumInsured'] = value;
        this.getTotalSICost('ElectricalEquipment');
      }
    }
    if(type=='personalAccident'){
      let entry = this.PersonalAssistantList[index];
      console.log("Entry Received",entry)
      if(entry.Salary){
        let value = entry.Salary.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.PersonalAssistantList[index]['Salary'] = value;
        this.getTotalSICost('PersonalAccident');
      }
    }
    if(type=='personalIndemenity'){
      let entry = this.Intermedity[index];
      if(entry.Salary){
        let value = entry.Salary.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.Intermedity[index]['Salary'] = value;
        this.getTotalSICost('PersonalIndemenity');
      }
    }
  }
  individualCommaFormatted(type){
      if(type=='building'){
        let entry = this.productItem.BuildingSumInsureds;
        console.log("Entry Came",entry)
          this.building[this.currentBuildingIndex]['BuildingSuminsured'] = entry;
          this.productItem.BuildingSumInsureds= entry;
          console.log("Entry Came 2",this.productItem.BuildingSumInsureds);
          this.getTotalSICost('building');
      }
      if(type=='content'){
        let entry = this.productItem.ContentSI;

        if(this.productItem.ContentSI){
          // let value = this.contentSI.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if(this.currentContentIndex==null || this.Cotentrisk[this.currentContentIndex]==undefined){
            this.currentContentIndex=this.Cotentrisk.length;
            this.Cotentrisk[this.currentContentIndex] = {
              "ItemId":null,
              "RiskId":null,
              "MakeAndModel":null,
              "ContentRiskDesc":null,
              "SerialNoDesc": null,
              "SerialNo":null,
              "ItemValue":null,
              "SumInsured":null,
            }
            this.Cotentrisk[this.currentContentIndex]['SumInsured'] = entry;
            this.productItem.ContentSI = entry;
            this.getTotalSICost('content');
          }
          else{
            this.Cotentrisk[this.currentContentIndex]['SumInsured'] = entry;
            this.productItem.ContentSI = entry;
            this.getTotalSICost('content');
          }
        }
      }

      if(type=='PersonalAccident'){
        let entry = this.productItem.AccSI;
        if((this.currentPersonalAccidentIndex==null || this.PersonalAssistantList[this.currentPersonalAccidentIndex]==undefined) && !this.saveSection){
          if(this.currentPersonalAccidentIndex==null) this.currentPersonalAccidentIndex = this.PersonalAssistantList.length-1;
          this.PersonalAssistantList[this.currentPersonalAccidentIndex] = {
            "Dob": this.productItem.AccDob,
            "Height": null,
            "OccupationId": this.accidentOccupationId,
            "OccupationDesc": this.accidentOccupation,
            "NationalityId": this.productItem.AccNationID,
            "PersonName": this.productItem.AccName,
            "Salary":this.productItem.AccSI,
            "Weight": null,
            "RiskId":this.productItem.AccidentLocation,
            "SerialNo": null
          }
          this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = entry;
          console.log('Changed PA',this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary']);
          this.productItem.AccSI= entry;
          this.getTotalSICost('PersonalAccident');
        }
        else{
          if(entry!='' && entry!=0 && entry!='0' && entry!=null){
            this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = entry;
          }
          this.productItem.AccSI= entry;
          this.getTotalSICost('PersonalAccident');
        }
          
        // let entry = this.productItem.AccSI
        // if(entry){
        //   this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = entry;
        //   this.productItem.AccSI = entry;
        //   console.log('jjjjjjjjjjjj',this.productItem.AccSI);
        //   this.getTotalSICost('PersonalAccident');
        // }
      }
      if(type=='PersonalInd'){
        let entry = this.productItem.IndSI
        if(entry){
          // let value = this.contentSI.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.Intermedity[this.currentPersonalIndIndex]['Salary'] = entry;
          this.productItem.IndSI = entry;
          this.getTotalSICost('PersonalIndemenity');
        }
      }
      
      
      if(type=='employee'){
        // let entry = this.productItem.EmpsSI;
        // this.employeeList[this.currentEmployeeIndex]['Salary'] = entry;
        //   this.productItem.EmpsSI= entry;
        //   console.log("Entry Came 2",this.productItem.EmpsSI);
        //   this.getTotalSICost('Employee');
        // let entry = this.productItem.EmpsSI;
        // if(entry){
        //   this.employeeList[this.currentEmployeeIndex]['SumInsured'] = entry;
        //   this.productItem.EmpsSI = entry;
        //   this.getTotalSICost('Employee');
        // }
        // if(this.employeeSalary){
        //   if(this.employeeSalary.includes('.')) this.employeeSalary = this.employeeSalary.split('.')[0];
        //   let value = this.employeeSalary.replace(/\D/g, "")
        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //   this.employeeList[this.currentEmployeeIndex]['Salary'] = value.replace(/,/g, '');
        //   this.employeeSalary = value;
        //   this.getTotalSICost('Employee');
        // }
      }
      if(type=='fidelity'){
        let entry = this.productItem.fdSI;
        if(entry){
          this.fidelityList[this.currentFidelityIndex]['Salary'] = entry;
          this.productItem.fdSI = entry;
          this.getTotalSICost('Fidelity');
        }
        // let entry = this.employeeSalary;
        // if(this.employeeSalary){
        //   if(this.employeeSalary.includes('.')) this.employeeSalary = this.employeeSalary.split('.')[0];
        //   let value = this.employeeSalary.replace(/\D/g, "")
        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //   this.fidelityList[this.currentFidelityIndex]['Salary'] = value.replace(/,/g, '');
        //   this.employeeSalary = value;
        //   this.getTotalSICost('Fidelity');
        // }
      }
      if(type=='machinery'){
        let entry = this.productItem.MSI;//this.MiSumInsured;
        if(entry){
          this.machineries[this.currentMachineryIndex]['SumInsured'] = entry;
          this.productItem.MSI = entry;
          this.getTotalSICost('Machinery');
          // if(this.MiSumInsured.includes('.')) this.MiSumInsured = this.MiSumInsured.split('.')[0];
          // let value = this.MiSumInsured.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // this.machineries[this.currentMachineryIndex]['SumInsured'] = value.replace(/,/g, '');
          // this.MiSumInsured = value;
        }
      }
      if(type=='accessories'){
        let entry = this.productItem.AccessoriesSI;
        if(entry){
          //if(this.SumInsured.includes('.')) this.SumInsured = this.SumInsured.split('.')[0];
          // let value = this.SumInsured.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = entry;
          this.productItem.AccessoriesSI= entry;
          this.getTotalSICost('Accessories');
        }
      }
      if(type=='AllRisk'){
        let entry = this.productItem.RiskSI;
        if(entry){
            // let value = this.contentSI.replace(/\D/g, "")
            // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if(this.currentRiskIndex==null || this.risk[this.currentRiskIndex]==undefined){
              this.currentRiskIndex=this.risk.length;
              this.risk[this.currentRiskIndex] = {
                "ItemId":null,
                "RiskId":null,
                "MakeAndModel":"TN123",
                "ContentRiskDesc":null,
                "SerialNoDesc": null,
                "SerialNo":"155685",
                "ItemValue":"26534556",
                "SumInsured":null,
                }
              this.risk[this.currentRiskIndex]['SumInsured'] = entry;
              this.productItem.RiskSI = entry;
              this.getTotalSICost('AllRisk');
          
            }
            else{
              this.risk[this.currentRiskIndex]['SumInsured'] = entry;
              this.productItem.RiskSI = entry;
              this.getTotalSICost('AllRisk');
            }
            
        }
      }
      if(type=='Electronicequip'){
        let entry = this.productItem.ElqSI;
        if(entry){
            // let value = this.contentSI.replace(/\D/g, "")
            // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // this.ElectronicItem[this.currentElectronicIndex]['SumInsured'] = entry;
            // this.productItem.ElqSI = entry;
            this.getTotalSICost('ElectricalEquipment');
          
        }
      }
  }
  getTotalSICost(type){
    if(type=='building'){
      this.totalBuildingSumInsured = 0;
      if(this.building.length!=0){
        for(let build of this.building){
          let SI = build.BuildingSuminsured,entry=0;
          if(SI==undefined || SI=='' || SI ==null) SI = 0;
          // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
          else entry = SI
          this.totalBuildingSumInsured = Number(entry)+this.totalBuildingSumInsured
        }
      }
    }
    else if(type=='content'){
        this.totalContentSI = 0;
        if(this.Cotentrisk.length!=0){
          for(let content of this.Cotentrisk){
            console.log('Contentsss SumInsured',content.SumInsured);
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            //else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalContentSI = Number(entry)+this.totalContentSI
            console.log('PPPPPPPPPP',this.totalContentSI);

          }
        }
    }
    else if(type=='AllRisk'){
      this.totalAllRiskSI = 0;
        if(this.risk.length!=0){
          for(let content of this.risk){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAllRiskSI = Number(entry)+this.totalAllRiskSI
          }
        }
    }
    // else if(type=='personalInt'){
    //   this.totalPersIntSI = 0;
    //     if(this.Intermedity.length!=0){
    //       for(let content of this.Intermedity){
    //         let SI = content.Salary,entry=0;
    //         if(SI==undefined || SI=='' || SI ==null) SI = 0;
    //         //else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
    //         else entry = SI
    //         this.totalPersIntSI = Number(entry)+this.totalPersIntSI
    //       }
    //     }
    // }
    else if(type=='ElectricalEquipment'){
      this.totalElectrIntSI = 0;
        if(this.ElectronicItem.length!=0){
          for(let content of this.ElectronicItem){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalElectrIntSI = Number(entry)+this.totalElectrIntSI
          }
        }
    }
    else if(type=='PersonalAccident'){
      this.totalPASI = 0;
        if(this.PersonalAssistantList.length!=0){
          for(let content of this.PersonalAssistantList){
            console.log('IIIIIIII',content.Salary);
            let SI = content.Salary,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalPASI = Number(entry)+this.totalPASI
          }
        }
    }
    else if(type=='PersonalIndemenity'){
      this.totalPersIntSI = 0;
        if(this.Intermedity.length!=0){
          for(let content of this.Intermedity){
            let SI = content.Salary,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalPersIntSI = Number(entry)+this.totalPersIntSI
          }
        }
    }
    else if(type=='Employee'){
      this.totalEmpIntSI = 0;
        if(this.employeeList.length!=0){
          for(let emp of this.employeeList){
            let SI = emp.Salary,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalEmpIntSI = Number(entry)+this.totalEmpIntSI;
            if(this.totalEmpIntSI > this.actualEmployeeSI){
              
            }
          }
        }
    }
    else if(type=='Fidelity'){
      this.totalFidelityIntSI = 0;
        if(this.fidelityList.length!=0){
          for(let emp of this.fidelityList){
            let SI = emp.Salary,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalFidelityIntSI = Number(entry)+this.totalFidelityIntSI
          }
        }
    }
    else if(type=='Machinery'){
      this.totalMachinerySI = 0;
        if(this.machineries.length!=0){
          for(let emp of this.machineries){
            let SI = emp.SumInsured,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalMachinerySI = Number(entry)+this.totalMachinerySI
          }
        }
    }
    else if(type=='Accessories'){
      this.totalAccessoriesSI = 0;
        if(this.accessoriesList.length!=0){
          for(let emp of this.accessoriesList){
            let SI = emp.SumInsured,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAccessoriesSI = Number(entry)+this.totalAccessoriesSI
          }
        }
    }
  }

  getAccessories(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": "99999"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
            this.currentAccessoriesIndex = res.Result.ContentRiskDetails.length;
           if(res.Result.ContentRiskDetails.length!=0){
            if(this.endorsementSection){
              console.log('Acessories Section',this.enableFieldsList)
              this.accessoriesSection = !this.enableFieldsList.some(ele=>ele=='AccessoriesSuminsured');
            }
            //else this.contentRiskSection = true;
            else this.accessoriesSection = true;
             this.accessoriesList= res.Result.ContentRiskDetails;
             this.currentAccessoriesIndex=null;
             this.AddNewAccessories();
             console.log('Get details of Accessories', this.accessoriesList);
             this.getTotalSICost('Accessories');
           }
           else{
            this.accessoriesList=[];
            this.AddNewAccessories();
           }
          }
          else {
            this.AddNewAccessories();
          }
        }
      })
  }
  getContentDetails(){
    // let sectionId=null;
    // if(this.productId=='19') sectionId = '47';
    // else sectionId = '47';
    // let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    // let ReqObj = {
    //   "QuoteNo": sessionStorage.getItem('quoteNo'),
    //   "SectionId": sectionId
    // }
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     let res: any = data;
    //     if(res.Result?.ContentRiskDetails){
    //       if (res.Result.ContentRiskDetails) {
    //        if(res.Result.ContentRiskDetails.length!=0){
    //         if(this.endorsementSection){
    //           this.contentRiskSection = !this.enableFieldsList.some(ele=>ele=='ContentSuminsured');
    //         }
    //         else this.contentRiskSection = true;
    //          this.Cotentrisk = res.Result.ContentRiskDetails;
    //          this.currentContentIndex = this.Cotentrisk.length;
    //          this.getTotalSICost('content');
    //        }
    //        else{

    //         this.Cotentrisk=[];
    //         this.currentContentIndex = this.Cotentrisk.length;
    //         this.ContentAdd();
    //         //this.ContentAdd();
    //         // this.Cotentrisk = [{
    //         //   "ItemId":null,
    //         //   "RiskId":null,
    //         //   "MakeAndModel":null,
    //         //   "ContentRiskDesc":null,
    //         //   "SerialNoDesc": null,
    //         //   "SerialNo":null,
    //         //   "ItemValue":null,
    //         //   "SumInsured":null,
    //         // }]
    //        }
    //       }
    //       else {
    //         this.Cotentrisk=[];
    //         this.ContentAdd();

          
    //         // this.Cotentrisk = [{
    //         //   "ItemId":null,
    //         //   "RiskId":null,
    //         //   "MakeAndModel":null,
    //         //   "ContentRiskDesc":null,
    //         //   "SerialNoDesc": null,
    //         //   "SerialNo":null,
    //         //   "ItemValue":null,
    //         //   "SumInsured":null,
    //         // }]
    //       }
    //     }
    //     else {
    //       this.Cotentrisk=[];
    //       this.ContentAdd();
    //       // this.Cotentrisk = [{
    //       //   "ItemId":null,
    //       //   "RiskId":null,
    //       //   "MakeAndModel":null,
    //       //   "ContentRiskDesc":null,
    //       //   "SerialNoDesc": null,
    //       //   "SerialNo":null,
    //       //   "ItemValue":null,
    //       //   "SumInsured":null,
    //       // }]
    //     }
    //     if(this.second){
    //       this.getPersonalAccidentDetails();
          
    //     }
    //     else if(this.third){
    //       this.getallriskDetails();
    //     }
    //     else if(this.fifth){
    //       this.getPersonalIntermediaryDetails();
    //     }
    //     else if(this.six){
    //       this.getElectronicEquipment('change');
    //     }
    //     // else if(this.nine){
    //     //   this.getMachineryRisk();
    //     // }

    //   })
  }
  onUploadEmployeeSection(){
    this.currentEmployeeIndex = null;this.enableEmployeeEditSection = false;
    this.enableEmployeeUploadSection = true;
    this.showEmpRecordsSection = false;
    this.uploadDocList=[];
    this.employeeUploadRecords = [];
    this.uploadStatus = null;
  }
  onUploadFidelitySection(){
    this.currentFidelityIndex = null;this.enableFidelityEditSection = false;
    this.enableFidelityUploadSection = true;
    this.showFidelityRecordsSection = false;
    this.uploadDocList=[];
    this.employeeUploadRecords = [];
    this.uploadStatus = null;
  }
  onUploadAllRiskSection(){
    this.uploadrisk=true;
    this.uploadcontent=false;
    this.currentRiskIndex = null;this.enableAllRiskEditSection = false;
    this.enableAllRiskUploadSection = true;
    this.showAllRiskRecordsSection = false;
    this.uploadDocList=[];
    this.employeeUploadRecords = [];
    this.uploadStatus = null;
  }
  onUploadContentRiskSection(){
    this.uploadcontent=true;
    this.uploadrisk=false;
    this.currentContentIndex = null;this.enableContentEditSection = false;
    this.enableAllContentUploadSection = true;
    this.showAllContentRecordsSection = false;
    this.uploadDocList=[];
    this.employeeUploadRecords1 = [];
    this.uploadStatus = null;
  }

  onUploadDocuments(target:any,fileType:any,type:any,uploadType:any){
    console.log("Event ",target);
    this.imageUrl = null;this.uploadDocList=[];
    let event:any = null;
    if(uploadType=='drag') event = target
    else event = target.target.files;

    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });

        }

    }
  }


  onsubmitemployee(){
    if(this.totalEmpIntSI > this.actualEmployeeSI){
      Swal.fire({
        title: '<strong>Error</strong>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           <li>Entered Salary Amount Greater than Actual Total Salary</li>
       </ul>`,
        showCloseButton: false,
        //focusConfirm: false,
        // showCancelButton:true,

       //confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Ok',
      })
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //         this.onProceedUpload('Merge')
      //   }
      //   else{
      //     this.onProceedUpload('Add')
      //   }
      // })
    }
    else{
      this.editEmployeeSection = false;this.enableEmployeeEditSection = false;this.currentEmployeeIndex=null;
      this.productItem=new ProductData();
    }
  }
  onsubmitAccessories(){
    if(this.totalAccessoriesSI > this.actualAssSI){
      Swal.fire({
        title: '<strong>Error</strong>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           <li>Entered SumInsured Amount Greater than Actual Total SumInsured</li>
       </ul>`,
        showCloseButton: false,
        //focusConfirm: false,
        // showCancelButton:true,

       //confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Ok',
      })
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //         this.onProceedUpload('Merge')
      //   }
      //   else{
      //     this.onProceedUpload('Add')
      //   }
      // })
    }
    // else{
    //   this.editEmployeeSection = false;this.enableEmployeeEditSection = false;this.currentEmployeeIndex=null;
    //   this.productItem=new ProductData();
    // }
  }
  
  onUploadEmployeeDetails(){
      if(this.uploadDocList.length!=0 && this.employeeList.length!=0 || this.fidelityList.length!=0){
        Swal.fire({
          title: '<strong>Merge / Replace Records</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
             <li>Some Employee Details You Already Stored</li>
             <li>Do You Want to Clear Old Records?</li>
         </ul>`,
          showCloseButton: false,
          //focusConfirm: false,
          showCancelButton:true,

         //confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Merge With Old Records',
         cancelButtonText: 'Clear Old Records',
        }).then((result) => {
          if (result.isConfirmed) {
                this.onProceedUpload('Merge')
          }
          else{
            this.onProceedUpload('Add')
          }
        })
      }
      else{
        this.onProceedUpload('Add');
      }
  }
  onProceedUpload(type){
    console.log('Section Details', this.sectionDetails)
    let typeId=null;
    if(this.productId=='32') typeId = '104';
    else if(this.productId=='14') typeId='102';
    else if(this.productId=='15') typeId='103';
    let SectionId = null;
    if(this.productId=='14' || this.productId=='19') SectionId = '45';
    if(this.productId=='32') SectionId = '43';
    if(this.productId=='24' && this.first && !this.third) SectionId = '47';
    if(this.productId=='24' && this.third && !this.first) SectionId = '3';
    if(this.productId=='3' && this.third && this.first){
      if(this.uploadrisk && !this.uploadcontent){
        SectionId='3';
      }
      if(this.uploadcontent && !this.uploadrisk){
        SectionId='47';
      }
    }
    if(this.productId=='24' && this.first && !this.third) SectionId = '47';
    if(this.productId=='24' && this.third && !this.first) SectionId = '3';
    if(this.productId=='24' && this.third && this.first){
      if(this.uploadrisk && !this.uploadcontent){
        SectionId='3';
      }
      if(this.uploadcontent && !this.uploadrisk){
        SectionId='47';
      }
    }
    if(this.productId=='26'){
      SectionId='3';
    }
    if(this.productId=='24' && this.third && this.first){
      if(this.uploadrisk && !this.uploadcontent){
        SectionId='3';
      }
      if(this.uploadcontent && !this.uploadrisk){
        SectionId='47';
      }
    }
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "QuoteNo":this.quoteNo,
      "RiskId":"1",
      "RequestReferenceNo":this.quoteRefNo,
      "TypeId":typeId,
      "LoginId":this.loginId,
      "SectionId":SectionId,
      "UploadType": type,
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/batch/upload`;
        this.sharedService.onPostExcelDocumentMethodSync(urlLink, ReqObj,this.uploadDocList[0].url).subscribe(
          (data: any) => {
              if(data){
                let res = data;
                if(res?.ProgressStatus=='P'){
                  this.checkUploadStatus();
                }
              }
          },  
          (err) => { },
        );
  }
  checkUploadStatus(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/get/transaction/status`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res.Status=='S'){
                  if(this.productId=='3' || this.productId=='26'){
                    this.getValidRecordDetailsAllRisk()
                  }
                  else{
                    this.getValidRecordDetails();
                  }
                }
                else if(res.Status=='E'){
                  this.uploadStatus = 'Upload Failed..Please Try Again...'
                  setTimeout(() => 
                  {
                    this.uploadDocList = [];
                    if(this.productId!='32'){
                      this.enableEmployeeUploadSection = true;
                      this.uploadStatus = null;
                      this.enableEmployeeEditSection = false;
                    }
                    else if(this.productId == '32'){
                      this.enableFidelityUploadSection = true;
                      this.uploadStatus =null;
                      this.enableFidelityEditSection = false;
                    }
                  
                }, (4*1000));
                }
                else{
                  this.uploadStatus = res?.StatusDesc;
                  setTimeout(() => this.checkUploadStatus(), (2*1000));
                }
              }
            },  
            (err) => { },
          );
  }
  uploadallContentsection(){
    if (this.employeeUploadRecords1.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.employeeUploadRecords1){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.LocationId,
              "RiskId":entry.ContentTypeId,
              "ContentRiskDesc":entry.Description,
              "SerialNoDesc": entry.SerialNumber,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured
          }
          reqList.push(data)
          i+=1;
          if(i==this.employeeUploadRecords1.length)  this.finalSaveRiskDetails(null,reqList,'C');
      }

    }
  }
  uploadallrisksection(){
    if (this.employeeUploadRecords.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.employeeUploadRecords){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.LocationId,
              "RiskId":entry.ContentTypeId,
              "ContentRiskDesc":entry.Description,
              "SerialNoDesc": entry.SerialNumber,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured
          }
          reqList.push(data)
          i+=1;
          if(i==this.employeeUploadRecords.length)  this.finalSaveRiskDetails(null,reqList,'A');
      }

    }
  }
  updateEmployeeRecordsTable(){
    let ReqObj = {
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo,
      "QuoteNo": this.quoteNo,
      "RiskId": "1",
      "Status": "Y"
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/insert/records`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                  if(this.productId!='32'){
                    this.enableEmployeeUploadSection = false;
                    this.enableEmployeeEditSection = false;
                  }
                  else if(this.productId=='32'){
                    this.enableFidelityEditSection = false;
                    this.enableFidelityUploadSection = false;
                  }
                  else if(this.productId=='3'){
                    this.enableAllRiskEditSection = false;
                    this.enableAllRiskUploadSection = false;
                  }
             
                  this.errorRecords = [];this.uploadStatus=null;
                  this.getEmployeeDetails();
                }
              }
          },  
          (err) => { },
        );
  }
  getValidRecordDetails(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/getUploadTransaction`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                  if(this.productId!=32){
                    this.employeeUploadRecords = [res];
                    this.showEmpRecordsSection = true;
                  }
                  else if(this.productId == 32){
                    this.employeeUploadRecords = [res];
                    this.showFidelityRecordsSection=true;
                  }
               
                  if(res?.ErrorRecords!=null && res?.ErrorRecords!='0') this.getErrorRecords();
                  else this.errorRecords = [];
                }
              }
            },  
            (err) => { },
          );
  }


  getValidRecordDetailsAllRisk(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/get/upload/record`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                  if(this.productId==3 || this.productId=='26' && res?.SuccessRecords.length!=0){
                    let items = this.sectionDetails.find((ele) => ele.SectionId == 3);
                    if(this.uploadrisk)
                    {
                    this.employeeUploadRecords =res?.SuccessRecords;
                    console.log('employeeUploadRecords',this.employeeUploadRecords);
                    console.log('Section Details', this.sectionDetails)
                    this.showAllRiskRecordsSection= true;
                    }
                    let item = this.sectionDetails.find((ele) => ele.SectionId == 47);
                    if(this.uploadcontent){
                      this.employeeUploadRecords1 =res?.SuccessRecords;
                    console.log('employeeUploadRecords',this.employeeUploadRecords);
                    console.log('Section Details', this.sectionDetails)
                      this.showAllContentRecordsSection= true;
                    }
                    
                  }
                  else if(res?.SuccessRecords.length==0){
                    let items = this.sectionDetails.find((ele) => ele.SectionId == 3);
                    if(this.uploadrisk)
                    {
                      this.showAllRiskRecordsSection= true;
                      this.employeeUploadRecords = [];
                      console.log('employeeUploadRecords',this.employeeUploadRecords);
                      console.log('Section Details', this.sectionDetails)
                    }
                    let item = this.sectionDetails.find((ele) => ele.SectionId == 47);
                    if(this.uploadcontent){
                      this.employeeUploadRecords1 = [];
                      this.showAllContentRecordsSection= true;
                    }
                    
                  }
                  if(res?.ErrorRecords.length!=0){
                 
                    let items = this.sectionDetails.find((ele) => ele.SectionId == 3);
                    if(this.uploadrisk)
                    {
                      this.errorRecords=res?.ErrorRecords;
                      console.log('employeeError Records',this.errorRecords);
                      this.showAllRiskRecordsSection= true;
                    }
                    let item = this.sectionDetails.find((ele) => ele.SectionId == 47);
                    if(this.uploadcontent){
                      this.errorRecords1=res?.ErrorRecords;
                      console.log('employeeError Records',this.errorRecords);
                      this.showAllContentRecordsSection= true;
                    }
                
                  }
                  else if(res?.ErrorRecords.length==0){
                   
                    let items = this.sectionDetails.find((ele) => ele.SectionId == 3);
                    if(this.uploadrisk)
                    {
                      this.errorRecords=[];
                      console.log('employeeError Records',this.errorRecords);
                      this.showAllRiskRecordsSection= true;
                    }
                    let item = this.sectionDetails.find((ele) => ele.SectionId == 47);
                    if(this.uploadcontent){
                      this.errorRecords1=[];
                      console.log('employeeError Records',this.errorRecords);
                      this.showAllContentRecordsSection= true;
                    }
                  }
                  
                }
              }
            },  
            (err) => { },
          );
  }
  getErrorRecords(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo,
      "QuoteNo":this.quoteNo,
      "RiskId":"1",
      "Status": 'E'
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/get/recordsByStatus`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                    this.errorRecords = data.Result;
                    console.log('OOOOOOOO',this.errorRecords);
                }
              }
          },
          (err) => { },
          ); 
  }
  onEditEmployeeError(rowData,modal,type){
    this.enableType= type;
    console.log('OOOOOOOOOOOO',rowData);
    this.errorRowNum = rowData?.RowNum;
    this.empLocation = rowData?.RiskId;
    this.employeeName = rowData?.EmployeeName;
    console.log('SSSSSSSSSS',rowData?.EmployeeName);
    this.occupationType = rowData?.OccupationId;
    this.nationality = rowData?.NationalityId;
    if(rowData.DateOfBirth){
      var dateParts = rowData.DateOfBirth.split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      this.empDob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0]; 
    }
    else this.empDob = null;
    this.empJoiningDate = rowData.DateOfJoiningYear;
    this.empJoiningMonth = rowData.DateOfJoiningMonth;
    this.employeeSalary = rowData.Salary;
      // this.open(modal);
  }


  onEditAllRiskError(rowData,modal,type,types){
    if(types=='Edit'){
      this.showgrids=false;
    }
    else if(types=='ADD'){
      this.showgrids=true;
    }
    if(type=='AllRisk'){
      this.indexallrisk=this.employeeUploadRecords.findIndex(ele => ele.SerialNumber == rowData.SerialNumber && ele.ContentTypeId == rowData.ContentTypeId);
      console.log('Employee recordsss',this.indexallrisk,this.employeeUploadRecords);
    }
    else if(type=='Content'){
      this.indexallrisk=this.employeeUploadRecords1.findIndex(ele => ele.SerialNumber == rowData.SerialNumber && ele.ContentTypeId == rowData.ContentTypeId);
      console.log('Employee recordsss',this.indexallrisk,this.employeeUploadRecords1);
    }
   
    this.enableType= type;
    console.log('OOOOOOOOOOOO',rowData);
    this.errorRowNum = rowData?.RowNum;
    this.empLocation = rowData?.LocationId;
    this.employeeName = rowData?.ContentTypeId;
    this.descallrisk = rowData?.Description;
    this.serialno= rowData?.SerialNumber;
    this.suminsuredallrisk=rowData?.SumInsured;
    console.log('SSSSSSSSSS',rowData?.EmployeeName);
    this.individualCommaFormatted('AllRisk');
      // this.open(modal);
  }
  onSaveErrorRecordDetails(modal){
    this.employeeErrorList = [];
    this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
    this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
    this.employeeSalaryError = false;let i=0;
    if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
    if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
    if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
    if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
    if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
    if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
    if(i==0){
      let salary = '';
      if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
      else salary = this.employeeSalary;
      let ReqObj = {
        
          "ProductId": this.productId,
          "RequestRefNo": this.quoteRefNo,
          "QuoteNo": this.quoteNo,
          "CompanyId": this.insuranceId,
          "RiskId": this.empLocation,
          "Salary": salary,
          "DateOfBirth": this.datePipe.transform(this.empDob, "dd/MM/yyyy"),
          "NationalityId": this.nationality,
          "EmployeeName": this.employeeName,
          "DateOfJoiningYear": this.empJoiningDate,
          "DateOfJoiningMonth": this.empJoiningMonth,
          "OccupationDesc": this.occupationList.find(ele=>ele.Code==this.occupationType).CodeDesc,
          "OccupationId": this.occupationType,
          "RowNum": this.errorRowNum
      }
      let urlLink = `${this.UploadUrl}eway/vehicle/update/records`
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(data?.Message=='SUCCESS'){
                this.employeeErrorList =[];
                modal.dismiss('Cross click');
                //this.modalClose.nativeElement.click();
                this.getValidRecordDetails();
              }
              else{
                if(res.length!=0){this.employeeErrorList = res;}
              }
            }
        },
        (err) => { },
        ); 
    }
  }
  // open(content) {
  //   this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
  getMachineryRisk(){
    
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"41"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
            if(res.Result.ContentRiskDetails.length!=0){
              // if(this.endorsementSection){
              //   this.electronicEquipSection = !this.enableFieldsList.some(ele=>ele=='MachineryBreakDown');
              // }
              // else 
              //this.enableMachineryEditSection= true;
              this.machineries = res.Result.ContentRiskDetails;
              console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPP',this.machineries);
              this.getTotalSICost('Machinery');
            }
            else{
            //  this.machineries = [{
            //    "ItemId":null,
            //    "RiskId":null,
            //    "MakeAndModel":null,
            //   //  "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //    "SerialNo":null,
            //    "ItemValue":null,
            //    "SumInsured":null,
            //  }]
            }
           }
         
    }

  else {
    this.machineries= [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      // "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    }
      })
  }
  setElectronicDropdowns(type){
    let fieldList = this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){
      if(field.key=='ElqList'){
          let entry = this.locationlist[this.selectedTab];
          let list = [{"label":'--Select--',"value":null}],i=0;
          for(let obj of entry.SectionDetails){
              let subObj = {
                "label":obj.ContentDesc,
                "value": obj.ContentType
              }
              list.push(subObj);
              i+=1;
              if(i==entry.SectionDetails.length) field.props.options = list;
          }
      }
    }
  }
  getElectronicEquipment(type){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let sectionid:any;
    if(this.productId=='25'){
    sectionid ='39'
    }
    else{
      sectionid = '41'
    }
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":sectionid
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
            if(res.Result.ContentRiskDetails.length!=0){
              if(this.endorsementSection){
                this.electronicEquipSection = !this.enableFieldsList.some(ele=>ele=='ElecEquipSuminsured');
              }
              else this.electronicEquipSection = true;
              this.ElectronicItem = res.Result.ContentRiskDetails;
              this.getTotalSICost('ElectricalEquipment');
            }
            // else{
            //  this.ElectronicItem = [{
            //    "ItemId":null,
            //    "RiskId":null,
            //    "MakeAndModel":null,
            //    "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //    "SerialNo":null,
            //    "ItemValue":null,
            //    "SumInsured":null,
            //  }]
            // }
           }
           else {
            if(type=='direct'){
              for(let entry of this.locationlist){
                entry['EmployeeList'] = [];
              }
              //this.AllAdds();
            }
           }
          //  else {
          //    this.ElectronicItem = [{
          //      "ItemId":null,
          //      "RiskId":null,
          //      "MakeAndModel":null,
          //      "ContentRiskDesc":null,
          //     "SerialNoDesc": null,
          //      "SerialNo":null,
          //      "ItemValue":null,
          //      "SumInsured":null,
          //    }]
          //  }
    }

  // else {
  //   this.ElectronicItem = [{
  //     "ItemId":null,
  //     "RiskId":null,
  //     "MakeAndModel":null,
  //     "ContentRiskDesc":null,
  //     "SerialNoDesc": null,
  //     "SerialNo":null,
  //     "ItemValue":null,
  //     "SumInsured":null,
  //   }]
  //   }
      })
  }
  getPersonalAccidentDetails() {
    let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"35"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          this.productItem.AccOccupation = this.accidentOccupation;
          if (data?.Result?.PersonalDetails!=null) {
            let i = 0;this.PersonalAssistantList = [];
            let personalList = res.Result.PersonalDetails;
            if(personalList.length!=0){
              if(this.endorsementSection){
                this.personalAccidentSection = this.enableFieldsList.some(ele=>ele=='PersonalAccidentSuminsured' || ele=='OccupationType');
              }
              else this.personalAccidentSection = true;
              let i=0;
              for(let entry of personalList){
                this.currentPersonalAccidentIndex=i;
                if(entry.Dob!=null){
                  entry['Saved'] = true;
                  entry['OccupationId'] = this.accidentOccupationId;
                  entry['OccupationDesc'] = this.accidentOccupation;
                  entry.Dob =  this.onDateFormatInEdit(entry.Dob);
                  
                }
                this.PersonalAssistantList.push(entry);
                this.productItem.AccOccupation = this.accidentOccupation;
                this.getTotalSICost('PersonalAccident');
                  //this.CommaFormatted(i,'personalAccident');
                  i+=1;
                  if(i==personalList.length){
                    this.currentPersonalAccidentIndex = this.PersonalAssistantList.length;
                    this.productItem.AccOccupation = this.accidentOccupation; console.log("Personal Acc",this.PersonalAssistantList);
                  } 
              }
              this.productItem.AccOccupation = this.accidentOccupation;
            }
            
          }
          else {
            this.PersonalAssistantList=[];
            this.PersonalAdd();
            //this.PersonalAdd();
            // this.PersonalAssistantList = [
            //   {
            //     "Dob": null,
            //     "Height": null,
            //     "OccupationId": this.accidentOccupationId,
            //     "OccupationDesc": this.accidentOccupation,
            //     "NationalityId": null,
            //     "PersonName": null,
            //     "Salary": null,
            //     "Weight": null,
            //     "RiskId": null,
            //     "SerialNo": null
            //   }
            // ]
          }
        }
        else {
          this.PersonalAssistantList=[];
          this.PersonalAdd();
          // this.PersonalAssistantList = [
          //   {
          //     "Dob": null,
          //     "Height": null,
          //     "OccupationId": this.accidentOccupationId,
          //     "OccupationDesc": this.accidentOccupation,
          //     "NationalityId": null,
          //     "PersonName": null,
          //     "Salary": null,
          //     "Weight": null,
          //     "RiskId": null,
          //     "SerialNo": null
          //   }
          // ]
        }
        if(this.third){
          this.getallriskDetails();
        }
        else if(this.fifth){
          this.getPersonalIntermediaryDetails();
        }
      })
  }
  changeComponent(){
    if((this.second==false && this.fifth==false || this.second==undefined && this.fifth==undefined) && this.productId!='14' && this.productId!='32'  && this.productId!='25' && this.productId!='59'){
      sessionStorage.setItem('back','skipBack');
      this.router.navigate(['/quotation/plan/main/document-info'])
    }
  }
  getPersonalIntermediaryDetails(){
    let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"36"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){

          if (res.Result.PersonalDetails) {
            let i = 0;this.Intermedity = [];
            let personalList = res.Result.PersonalDetails;
            if(personalList.length!=0){
              if(this.endorsementSection){
                this.personalIntermeditySection = !this.enableFieldsList.some(ele=>ele=='PersonalIntermediarySuminsured' || ele=='OccupationType');
              }
              else this.personalIntermeditySection = true;
              for(let entry of personalList){
                if(entry.Dob!=null){
                  entry['OccupationDesc'] = this.liabilityOccupation;
                  entry.Dob =  this.onDateFormatInEdit(entry.Dob);
                }
                this.Intermedity.push(entry);
                this.getTotalSICost('PersonalIndemenity');
                  //this.CommaFormatted(i,'personalIndemenity');
                i+=1;
                if(i==this.Intermedity.length) this.getTotalSICost('Intermedity');
              }
            }
            
          }
          else {
              this.IntermedityAdd();
            
            // this.Intermedity = [
            //   {
            //     "Dob": null,
            //     "Height": null,
            //     "OccupationId": this.liabilityOccupationId,
            //     "OccupationDesc": this.liabilityOccupation,
            //     "PersonName": null,
            //     "NationalityId": null,
            //     "Salary": null,
            //     "Weight": null,
            //     "RiskId": null,
            //     "SerialNo": null
            //   }
            // ]
          }
        }
        else {
          //this.IntermedityAdd();
          // this.Intermedity = [
          //   {
          //     "Dob": null,
          //     "Height": null,
          //     "OccupationId": this.liabilityOccupationId,
          //     "OccupationDesc": this.liabilityOccupation,
          //     "NationalityId": null,
          //     "PersonName": null,
          //     "Salary": null,
          //     "Weight": null,
          //     "RiskId": null,
          //     "SerialNo": null
          //   }
          // ]
        }
      })
  }
  getallriskDetails(){
    // let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    // let ReqObj = {
    //     "QuoteNo": sessionStorage.getItem('quoteNo'),
    //     "SectionId":"3"
    // }
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //         let res: any = data;
    //         if(res.Result){
    //           if (res.Result.ContentRiskDetails) {
    //            if(res.Result.ContentRiskDetails.length!=0){
    //             if(this.endorsementSection){
    //               this.allRiskSection = !this.enableFieldsList.some(ele=>ele=='AllriskSumInsured');
    //             }
    //             else this.allRiskSection = true;
    //              this.risk = res.Result.ContentRiskDetails;
    //              this.currentRiskIndex = this.risk.length;
    //              console.log('Get pre risk Details',this.risk);
    //              this.getTotalSICost('AllRisk');
    //            }
    //            else{
    //             this.risk=[];
    //             this.AllAdd();
    //             // this.risk=[
    //             //   {
    //             // "ItemId":null,
    //             // "RiskId":null,
    //             // "MakeAndModel":"TN123",
    //             // "ContentRiskDesc":null,
    //             // "SerialNoDesc": null,
    //             // "SerialNo":"155685",
    //             // "ItemValue":"26534556",
    //             // "SumInsured":null,
    //             //   }
    //             // ]
    //            }
    //           }
    //           else {
    //             this.risk=[];
    //             this.AllAdd();
    //             // this.risk=[
    //             //   {
    //             // "ItemId":null,
    //             // "RiskId":null,
    //             // "MakeAndModel":"TN123",
    //             // "ContentRiskDesc":null,
    //             // "SerialNoDesc": null,
    //             // "SerialNo":"155685",
    //             // "ItemValue":"26534556",
    //             // "SumInsured":null,
    //             //   }
    //             // ]
    //           }
    //         }
    //         else {
    //           // this.risk=[
    //           //   {
    //           // "ItemId":null,
    //           // "RiskId":null,
    //           // "MakeAndModel":"TN123",
    //           // "ContentRiskDesc":null,
    //           // "SerialNoDesc": null,
    //           // "SerialNo":"155685",
    //           // "ItemValue":"26534556",
    //           // "SumInsured":null,
    //           //   }
    //           // ]
    //         }
    //         if(this.fifth){
    //           this.getPersonalIntermediaryDetails();
    //         }
    //     })
  }

  getUWDetails() {

  }
  checkPersonalLimit(){
    if(this.productId=='56') return 'Health Insurance';
    else return 'Professional Indemenity';
  }
  onCalculate() {

  }
  FidelityAdd(){
    let entry = 
      {
        "Address": null,
        "Createdby": this.loginId,
        "EmployeeName": null,
        "EmployeeId":null,
        "InsuranceId": this.insuranceId,
        "OccupationDesc": null,
        "OccupationId": null,
        "DateOfBirth": null,
        "DateOfJoiningYear": null,
        "DateOfJoiningMonth": null,
        "ProductId": this.productId,
        "QuoteNo": this.quoteNo,
        "RequestReferenceNo": this.quoteRefNo,
        "RiskId": "1",
        "Salary": null,
        "NationalityId":null
      }
    this.currentFidelityIndex = this.fidelityList.length;
    this.fidelityList.push(entry);
    this.editFidelitySection = false;this.enableFidelityEditSection = true;
    this.productItem = new ProductData();
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
}
  EmployeeAdd(){
    this.productItem.EmpsLocation=null;this.productItem.EmpsName=null;
    this.productItem.EmpsOccupation=null;this.productItem.EmpsDob=null;
    this.productItem.EmpsPeriod =null; this.productItem.EmpsJoin =null;this.productItem.EmpsSI=null;
    this.productItem.EmpsNationality=null; this.productItem.EmpsAddress =null;
    this.currentRiskIndex=null;
    //   let entry = 
    //     {
    //       "Address": null,
    //       "Createdby": this.loginId,
    //       "EmployeeName": null,
    //       "EmployeeId":null,
    //       "InsuranceId": this.insuranceId,
    //       "OccupationDesc": null,
    //       "OccupationId": null,
    //       "DateOfBirth": null,
    //       "DateOfJoiningYear": null,
    //       "DateOfJoiningMonth": null,
    //       "ProductId": this.productId,
    //       "QuoteNo": this.quoteNo,
    //       "RequestReferenceNo": this.quoteRefNo,
    //       "RiskId": null,
    //       "Salary": null,
    //       "NationalityId":null,
    //       "LocationId":null
    //     }
    //   this.currentEmployeeIndex = this.employeeList.length;
    // this.employeeList.push(entry);
    // console.log('Employeeelist',this.employeeList)
    this.productItem = new ProductData();
    //this.productItem = new ProductData();
    // this.editEmployeeSection = false;this.enableEmployeeEditSection = true;
    // this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    // this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }
  ContentAdd() {
    //this.Section=true;
    //this.Cotentrisk.push(rowss);
    this.productItem.ContentDesc=null;
    this.productItem.ContentLocation =null;this.productItem.ContentSI=null;
    this.productItem.ContentSerialNo =null;this.productItem.ContentSuminsured=null;
    this.productItem.ContentType =null;
    let entry = [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    this.currentContentIndex = this.Cotentrisk.length;
    this.Cotentrisk.push(entry);
    this.editContentSection = false;this.enableContentEditSection = true;
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    // this.productItem.ContentDesc=null;
    // this.productItem.ContentLocation =null;this.productItem.ContentSI=null;
    // this.productItem.ContentSerialNo =null;this.productItem.ContentSuminsured=null;
    // this.productItem.ContentType =null;
  }
  onEditContent(index,rowdata){
    this.currentContentIndex = index;
    let edit = this.Cotentrisk.findIndex(ele=>ele.RiskId == rowdata.RiskId && ele.ItemId == rowdata.ItemId);
    console.log('LLLL',edit,rowdata);
    this.currentBuildingIndex= edit;
    this.editContentSection = true;
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    this.enableContentEditSection = true;
    this.productItem.ContentLocation = rowdata.RiskId;
    this.productItem.ContentSerialNo = rowdata.SerialNoDesc;
    this.productItem.ContentDesc = rowdata.ContentRiskDesc;
    this.productItem.ContentSI = rowdata.SumInsured;
    this.productItem.ContentType = rowdata.ItemId;
    if(rowdata.SumInsured !=0){
      this.individualCommaFormatted('content');
    }
    // this.LocationId = this.Cotentrisk[index].RiskId;
    // this.serialNoDesc = this.Cotentrisk[index].SerialNoDesc;
    // this.contentRiskDesc = this.Cotentrisk[index].ContentRiskDesc;
    // this.contentSI = this.Cotentrisk[index].SumInsured;this.contentId = this.Cotentrisk[index].ItemId;
    
  }
  onEditPersonalAccident(index,rowdata){
    //this.currentPersonalAccidentIndex= index;
    let edit = this.PersonalAssistantList.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.PersonName == rowdata.PersonName);
    this.currentPersonalAccidentIndex= edit;
    this.productItem = new ProductData();
    this.editPersonalAccidentSection= true;
    this.enablePersonalAccEditSection= true;
    this.productItem.AccidentLocation = rowdata.RiskId;
    this.productItem.AccName = rowdata.PersonName;
    this.productItem.AccOccupation = rowdata.OccupationDesc;
    this.productItem.AccNationID = rowdata.NationalityId;
    this.productItem.AccDob = rowdata.Dob;
    this.productItem.AccSI = rowdata.Salary;
    console.log('NNNNNNN',rowdata.Salary);
    this.individualCommaFormatted('PersonalAccident');
   
  }

  onEditPersonalInd(index,rowdata){
    let edit = this.Intermedity.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.PersonName == rowdata.PersonName);
    this.currentPersonalIndIndex= edit;
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    this.editPersonalIndSection= true;
    this.enablePersonalIndEditSection= true;
    this.productItem.IndLocation = rowdata.RiskId;
    this.productItem.IndName = rowdata.PersonName;
    this.productItem.IndOccupation = rowdata.OccupationDesc;
    this.productItem.IndNationID = rowdata.NationalityId;
    this.productItem.IndDob = rowdata.Dob;
    this.individualCommaFormatted('PersonalInd');
    this.productItem.IndSI = rowdata.Salary;
  }

  onElectroncequipment(index,rowdata){
    let edit = this.ElectronicItem.findIndex(ele=>ele.PurchaseMonth == rowdata.PurchaseMonth && ele.PurchaseYear == rowdata.PurchaseYear);
    this.currentElectronicIndex = edit;
    this.productItem = new ProductData();
   this.enableElectronicEquipmentSection=true;
    this.editElectronicSection=true;
    this.productItem.ElqLocation = rowdata.RiskId;
   this.productItem.ElqJoin = rowdata.PurchaseMonth;
    this.productItem.ElqPeriod = rowdata.PurchaseYear;
    this.productItem.ElqList = rowdata.ItemId;
    this.productItem.ElqSI = rowdata.SumInsured;
    this.productItem.Elqmake = rowdata.MakeAndModel;
  }
  onEditAllRisk(index,rowdata){
    let edit = this.risk.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc && ele.SerialNoDesc);
    this.currentRiskIndex= edit;
    this.editRiskSection= true;
    this.enableAllriskEditSection= true;
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    this.productItem.RiskLocation = rowdata.RiskId;
    this.productItem.RiskSerialNo = rowdata.SerialNoDesc;
    this.productItem.RiskDescription = rowdata.ContentRiskDesc;
    this.productItem.RiskContentType = rowdata.ItemId;
    this.productItem.RiskSI = rowdata.SumInsured;
    this.individualCommaFormatted('AllRisk');
  }

  onEditMachinery(index,rowdata){
    let edit = this.machineries.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc && ele.Brand == rowdata.Brand);
    console.log('LLLL');
    this.currentMachineryIndex = edit;
    this.enableMachineryEditSection = true;
    this.editMachinerySection=true;
    //this.MachineryLocation 
    this.productItem.MLocation= rowdata.RiskId;
     this.productItem.MSerialNo = rowdata.SerialNoDesc;//this.serialNoDesc
     this.productItem.MDescription = rowdata.ContentRiskDesc; //this.MachineryName // this.MiSumInsured
    this.productItem.MSI = rowdata.SumInsured;//this.machineryItemId = this.machineries[index].ItemId;
    this.productItem.MName = rowdata.Name;//this.NameDesc; //this.BrandName
    this.productItem.MBrand = rowdata.Brand;
    this.productItem.MContentType = rowdata.ItemId;
    this.individualCommaFormatted('machinery');
  }
  onEditAccessories(index,rowdata){
    let edit = this.accessoriesList.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc && ele.AccessoriesSI== rowdata.AccessoriesSI);
    console.log('LLLL',rowdata.ItemId,this.accessoriesList);
    this.currentAccessoriesIndex = edit;
    this.enableAccessoriesEditSection = true;
    this.editAccessoriesSection=true;
    this.productItem = new ProductData();
    this.productItem.AccessoriesType= rowdata.ItemId;
     this.productItem.AccessoriesSerialNo = rowdata.SerialNoDesc;//this.serialNoDesc
     this.productItem.AccessoriesChassisNo = rowdata.RiskId; //this.MachineryName // this.MiSumInsured
    this.productItem.AccessoriesSI= rowdata.SumInsured;
    console.log("")
 //this.machineryItemId = this.machineries[index].ItemId;
    //this.individualCommaFormatted('accessories');
  }

  onEditEmployee(index,rowdata){
    //this.currentEmployeeIndex = index;
    let edit = index;
    this.currentEmployeeIndex = edit;
    this.currentRiskIndex = edit;
    this.editEmployeeSection = true;
    this.enableEmployeeEditSection = true;
    this.productItem = new ProductData();
    this.productItem.EmpsLocation= rowdata.LocationId;
    this.productItem.EmpsName=rowdata.EmployeeName;// this.employeeName this.employeeList[index].
    //this.productItem.EmpsAddress = rowdata.Address;//this.empAddress 
    this.productItem.EmpsOccupation = rowdata.OccupationId;//this.occupationType 
    this.productItem.EmpsSI= rowdata.Salary;//this.employeeSalary
    this.productItem.EmpsNationality = rowdata.NationalityId;//this.nationality
    // var dateParts = rowdata.DateOfBirth.split("/");
    // this.productItem.EmpsDob  = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    console.log('Entered Data', rowdata.DateOfBirth)
    this.productItem.EmpsDob = this.onDateFormatInEdit(rowdata.DateOfBirth);
    //rowdata.DateOfBirth;
    // console.log('NNNNNNNNNNNNN',this.productItem.EmpsDob);
    // month is 0-based, that's why we need dataParts[1] - 1
    //this.productItem.EmpsDob  = rowdata.DateOfBirth;
    //dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
     this.productItem.EmpsPeriod= rowdata.DateOfJoiningYear;//this.empJoiningDate
   this.productItem.EmpsJoin= rowdata.DateOfJoiningMonth;// this.empJoiningMonth 
    this.individualCommaFormatted('employee');
  }

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }
  onEditFidelity(index,rowdata){
    //this.currentFidelityIndex = index;
    let edit = this.fidelityList.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.EmployeeName == rowdata.EmployeeName);
    this.editFidelitySection = true;
    this.enableFidelityEditSection = true;
    this.currentFidelityIndex = edit;

   this.productItem.fdLocation= String(rowdata.RiskId);// this.empLocation 
   this.productItem.fdName= rowdata.EmployeeName;//this.employeeName
   this.productItem.fdAddress= rowdata.Address;//this.empAddress 
   this.productItem.fdOccupation = rowdata.OccupationId;
   this.productItem.fdSI = rowdata.Salary;
   this.productItem.fdNationality= rowdata.NationalityId;
    var dateParts = rowdata.DateOfBirth.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
   this.productItem.fdDob= dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    this.productItem.fdPeriod= rowdata.DateOfJoiningYear;
    this.productItem.fdJoin =rowdata.DateOfJoiningMonth;
    //this.productItem.fdJoin = String(0)+join;
    console.log('MMMMMMMMMMMM', this.monthList);
    console.log('KKKKKKKKKKKKKKKKK', this.productItem.fdJoin);
    this.individualCommaFormatted('fidelity');
  }
  FidelityDelete(rowData,index){
    if(rowData?.EmployeeId==null){
          this.fidelityList.splice(index,1);
          if(this.fidelityList.length!=0){
            this.getTotalSICost('Fidelity');
          }
    }
    else{
      let entry = this.originalFidelityList.some(ele=>ele.EmployeeId==rowData.EmployeeId);
      if(entry){
        let SectionId = null;
        if(this.productId=='32' || this.productId=='19' || this.productId=='57') SectionId = '43';
        let ReqObj = {
          "QuoteNo": this.quoteNo,
          "RiskId": rowData.RiskId,
         "EmployeeId": rowData.EmployeeId,
         "SectionId": SectionId
      }
      let urlLink = `${this.motorApiUrl}api/deleteemployeebyid`;
        this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data.Result){
                this.fidelityList = [];
                this.getFidelityDetails();
            }
          },
          (err) => { },
        );
      }
      else{
        this.fidelityList.splice(index,1);
          if(this.fidelityList.length!=0){
            this.getTotalSICost('Fidelity');
          }
      }
    }
   
  }
  EmployeeDelete(rowData,index){
    let entry = this.locationlist[this.selectedTab];
    console.log(entry,index)
    entry.EmployeeList.splice(index,1);
    this.currentRiskIndex = null;
    this.productItem = new ProductData();
  }
  AddNew() {
    //this.value;
    //this.Section=true;
    //this.jsonList.push(row);
      this.productItem.LocationAddress=null;
      this.productItem.LocationNameBuilding=null;
      this.productItem.BuildingSumInsureds=null;
      let entry = {
        "BuildingAddress": null,
        "BuildingBuildYear": null,
        "BuildingFloors": null,
        "InbuildConstructType": null,
        "BuildingSuminsured": null,
        "RiskId": null,
        "SectionId": "1"
      }
      this.currentBuildingIndex = this.building.length;
      this.editBuildingSection = false;
      this.enableBuildingEditSection = true;
      this.building.push(entry);
  }

  getlength(building,i){
      if(building[0].BuildingAddress==null && building[0].LocationName==null && i==1){
        return false;
      }
      else {
        return true;
      }
  }
  getAccessorieslength(access,i){
    if(access[0].ItemId==null && access[0].RiskId==null && access[0].SumInsured==null && i==1){
      return false;
    }
    else {
      return true;
    }
  }
  getContent(content,i){
    if(content[0]?.ContentRiskDesc==null && content[0]?.SumInsured==null && i==1){
    return false;
    }
else {
return true;
}
  }
  getRisk(risk,i){
    if(risk[0].RiskId==null && risk[0].SumInsured==null && risk[0].SerialNoDesc==null && i==1){
      return false;
      }
  else {
  return true;
  }
  }

  getPersonalAccident(risk,i){
      if((risk[0].RiskId==null || risk[0].PersonName==null || risk[0].OccupationDesc==null || risk[0].Salary==null) && i==1){
      return false;
      }
      else {
        return true;
      }
  }
  getIntermity(risk,i){
    if(risk[0].RiskId==null && risk[0].Salary==null && risk[0].PersonName==null && i==1){
      return false;
      }
  else {
  return true;
  }
  }

  getemployeeList(risk,i){
    if(risk[0].OccupationDesc==null && risk[0].LocationName==null && i==1){
      return false;
      }
  else {
  return true;
  }
  }
  AddNewAccessories(){
    // let entry = {
    //   "AccessoriesType": null,
    //   "ChassisNo": null,
    //   "SerialNo": null,
    //   "SumInsured": null,
    //   "RiskId": null,
    //   "SectionId": ""
    // }
    this.productItem = new ProductData();
    this.currentAccessoriesIndex =null;
    let entry = [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
      "LocationId":null,
    }];
    this.currentAccessoriesIndex = this.accessoriesList.length;
    this.accessoriesList.push(entry);
    this.editAccessoriesSection = false;
    this.enableAccessoriesEditSection = true;
    this.productItem = new ProductData();
    if(this.ChassisList.length==1){
      this.productItem.ChassisNo = this.ChassisList[0].Code;
    }
  }
  AddNewMachinery(){
    let entry = {
      "ConttentRiskDesc": null,
      "Brand": null,
      "SerialNo": null,
      "SumInsured": null,
      "RiskId": null,
      "SectionId": "41",
      "Name":null,
    }
    this.currentMachineryIndex = this.machineries.length;
    this.editMachinerySection = false;
    this.enableMachineryEditSection = true;
    this.machineries.push(entry);
    this.productItem = new ProductData();
  }
  onEditBuilding(index,rowdata){
    this.currentBuildingIndex = index;
    let edit = this.building.findIndex(ele=>ele.BuildingAddress == rowdata.BuildingAddress && ele.LocationName == rowdata.LocationName);
    console.log('LLLL',edit,rowdata);
    this.currentBuildingIndex= edit;
    this.editBuildingSection = true;
    this.enableBuildingEditSection = true;
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    this.productItem.LocationAddress = rowdata.BuildingAddress;
    this.productItem.LocationNameBuilding = rowdata.LocationName;
    console.log('KKKKKKK',this.productItem.LocationNameBuilding)
    if(rowdata.BuildingSuminsured!=0 && rowdata.BuildingSuminsured!='' && rowdata.BuildingSuminsured!=undefined){
      this.productItem.BuildingSumInsureds = rowdata.BuildingSuminsured;
      console.log('KKKKKKK',this.productItem.LocationNameBuilding)
      // this.LocationName = this.building[index].LocationName;
      // this.BuildingAddress = this.building[index].BuildingAddress;
      // this.BuildingSuminsured = this.building[index].BuildingSuminsured;
      this.individualCommaFormatted('building');
    }
 
  }
  // onEditBuilding(index){
  //   this.currentBuildingIndex = index;
  //   this.editBuildingSection = true;
  //   this.enableBuildingEditSection = true;
  //   this.productItem.LocationAddress = this.building[index].BuildingAddress;
  //   this.productItem.LocationNameBuilding = this.building[index].LocationName;
  //   this.productItem.BuildingSumInsureds = this.building[index].BuildingSuminsured;
  //   // this.LocationName = this.building[index].LocationName;
  //   // this.BuildingAddress = this.building[index].BuildingAddress;
  //   // this.BuildingSuminsured = this.building[index].BuildingSuminsured;
  //   this.individualCommaFormatted('building');
  // }

  onEditCyber(index){
    this.currentCyberIndex= index;
    this.editCyberSection = true;
    this.enableCyberSection= true;
    this.productItem.DeviceLocation = this.CyberItem[index].RiskId;
    this.productItem.DeviceType = this.CyberItem[index].ItemId;
    this.productItem.DeviceSNo = this.CyberItem[index].SerialNoDesc;
    this.productItem.DeviceMake = this.CyberItem[index].MakeAndModel;
    this.productItem.DeviceYear = this.CyberItem[index].ManufactureYear;
    // this.LocationId = this.CyberItem[index].RiskId;
    // this.DeviceType = this.CyberItem[index].ItemId;
    // this.Cyberyear= this.CyberItem[index].ManufactureYear;
    // this.CyberMake = this.CyberItem[index].MakeAndModel;
    // this.CyberSNo=this.CyberItem[index].SerialNoDesc;
    // this.individualCommaFormatted('Cyber');
  }

  PersonalAdd() {
    //this.Section=true;
    //this.PersonalAssistantList.push(rows);
    this.form = new FormGroup({});
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    
    let entry = {
      "Dob": null,
      "Height": null,
      "OccupationId": this.accidentOccupationId,
      "OccupationDesc": this.accidentOccupation,
      "NationalityId": null,
      "PersonName": null,
      "Salary": null,
      "Weight": null,
      "RiskId": null,
      "SerialNo": null
    }
    this.currentPersonalAccidentIndex = this.PersonalAssistantList.length;
    this.PersonalAssistantList.push(entry);
    //this.editContentSection = false;
    this.editPersonalAccidentSection = false;
    this.enablePersonalAccEditSection = true;
    //this.PersonalAssistantList = entry.concat(this.PersonalAssistantList);
  }

  delete(row: any) {
    const index = this.building.indexOf(row);

    this.building.splice(index, 1);
    this.LocationList.splice(index,1);
    this.getTotalSICost('building');
    console.log("Locations",this.LocationList);
    //this.Section=false;
  }

  Acssdelete(row:any){
    const index = this.accessoriesList.indexOf(row);
    this.accessoriesList.splice(index, 1);
    // if(index==1){
    //   this.AddNewAccessories();
    // }
    // this.currentAccessoriesIndex=0;
    this.getTotalSICost('Accessories');
  }
  deletePersonal(rows: any) {
    const index = this.PersonalAssistantList.indexOf(rows);
    this.PersonalAssistantList.splice(index, 1);
    this.getTotalSICost('PersonalAccident');
    //this.getTotalSICost('personalInt');
  }
  ContentDelete(rowss: any) {
    const index = this.Cotentrisk.indexOf(rowss);
    this.Cotentrisk.splice(index, 1);
    this.getTotalSICost('content');
  }
  PersonalAccidentDelete(rowss: any) {
    const index = this.PersonalAssistantList.indexOf(rowss);
    this.PersonalAssistantList.splice(index,1);
    this.currentPersonalAccidentIndex = this.PersonalAssistantList.length;
    this.getTotalSICost('PersonalAccident');
  }
  AllRiskDelete(rowss: any) {
    const index = this.risk.indexOf(rowss);
   this.risk.splice(index,1);
    this.getTotalSICost('AllRisk');
  }
  PersonalIndDelete(rowss: any) {
    const index = this.Intermedity.indexOf(rowss);
   this.Intermedity.splice(index,1);
    this.getTotalSICost('PersonalIndemenity');
  }
  ElectronicDelete(rowss: any) {
    const index = this.ElectronicItem.indexOf(rowss);
   this.ElectronicItem.splice(index,1);
    this.getTotalSICost('ElectricalEquipment');
  }
  MachineryDelete(rows:any){
    const index = this.machineries.indexOf(rows);
    this.machineries.splice(index, 1);
    this.getTotalSICost('machinery');
  }
  AccessoriesDelete(rows:any){
    const index = this.accessoriesList.indexOf(rows);
    this.accessoriesList.splice(index, 1);
    this.getTotalSICost('Accessories');
  }
  AllAdd(){
    console.log('IIIIIIIII',this.risk);
    let entry = [{
      "ItemId":"",
      "RiskId":"",
      "MakeAndModel":"TN123",
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":"155685",
      "ItemValue":"26534556",
      "SumInsured":"",
    }]
    this.currentRiskIndex = this.risk.length;
    console.log('NNNNNNNN',this.currentRiskIndex);
    this.risk.push(entry);
    this.enableAllriskEditSection = true;
    this.editRiskSection= false; 
    this.form = new FormGroup({});
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    //this.risk = entry.concat(this.risk);
  
  }

  AllAdds(){
    let entry = [{
      "ItemId": "",
      "ItemValue": "10000",
    "MakeAndModel": "",
    "ContentRiskDesc":null,
    "SerialNoDesc": null,
    "PurchaseMonth": "",
    "PurchaseYear": "",
    "RiskId": "1",
    "SerialNo": "1",
    "SumInsured": ""
    }]
    this.currentElectronicIndex = this.ElectronicItem.length;
    console.log('NNNNNNNN',this.currentElectronicIndex);
    this.ElectronicItem.push(entry);
    this.enableElectronicEquipmentSection= true;  
    this.editElectronicSection= false; 
    this.form = new FormGroup({});
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    //this.ElectronicItem.push(entry);
  }
  AllCyber(){

    let entry = {
      "ItemId":"",
      "ItemDesc":"",
      "RiskId": null,
      "ContentRiskDesc":"",
      "SerialNoDesc":"",
      "MakeAndModel":"",
      "ItemValue":"",
      "Name":"",
      "ManufactureYear": ""
    }
    this.CyberSNo=null;this.CyberMake=null;
    this.Cyberyear=null;this.LocationId=null;
    this.DeviceType = null;
    this.enableCyberSection = true;
    this.editCyberSection = false;
    this.currentCyberIndex= this.CyberItem.length;
    this.CyberItem.push(entry);
    this.productItem = new ProductData();
  }
  AllDelete(row:any){
    const index = this.risk.indexOf(row);
    this.risk.splice(index, 1);
    this.getTotalSICost('AllRisk');
  }
  AllDeleteElect(row:any){
    const index = this.ElectronicItem.indexOf(row);
    this.ElectronicItem.splice(index, 1);
    this.getTotalSICost('ElectricalEquipment');
  }
  IntermedityAdd(){
    this.Intermedity=[];this.currentPersonalIndIndex =null;
    this.form = new FormGroup({});
    this.productItem = new ProductData();
    this.productItem.AccOccupation = this.accidentOccupation;
    this.productItem.IndOccupation = this.liabilityOccupation;
    let entry = [{
      "Dob": null,
      "Height": null,
      "OccupationId": this.liabilityOccupationId,
      "OccupationDesc": this.liabilityOccupation,
      "NationalityId": null,
      "PersonName": null,
      "Salary": null,
      "Weight": null,
      "RiskId": null,
      "SerialNo": null
    }]
    this.currentPersonalIndIndex = this.Intermedity.length;
    this.Intermedity.push(entry);
    this.editPersonalIndSection= false;
    this.enablePersonalIndEditSection = true;

    // this.productItem.IndLocation = "";
    // this.productItem.IndDob = "";
    // this.productItem.IndName ="";
    // this.productItem.IndNationID ="";
    // this.productItem.IndSI="";
    // this.productItem = new ProductData();
    //this.Intermedity=entry.concat(this.Intermedity)
  }
  deleteCyber(index){
      this.CyberItem.splice(index,1);
  }
  IntermedityDelete(row:any){
    const index = this.Intermedity.indexOf(row);
    this.Intermedity.splice(index, 1);
    this.getTotalSICost('personalInt');
  }
  Electronic(){
    let ReqObj = {
      "BranchCode":this.branchCode,
      "InsuranceId":this.insuranceId,
        }
      let urlLink = `${this.CommonApiUrl}dropdown/electronicitems`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.ElectronicList = data?.Result;
            console.log('RRRRRRRRRRRRRRRRRRR',this.ElectronicList);
            for (let j = 0; j < this.ElectronicList.length; j++) {
              this.ElectronicList[j].label = this.ElectronicList[j]['CodeDesc'];
              this.ElectronicList[j].value = this.ElectronicList[j]['Code'];
              delete this.ElectronicList[j].CodeDesc;
              if (j == this.ElectronicList.length - 1) {
                console.log('LLLLLLLLLLLLLLLLLL',this.ElectronicList);
                for(let x of this.fieldsElectronic){
                  let vars = x.fieldGroup[0].fieldGroup[0];
                  let j=0;
                  for( let n of vars.fieldGroup){            
                    if(n.type=='ngselect'){
                    if(n.props.label=='Electronic Equipment'){
                       this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].props.options= this.ElectronicList;
                    }
                  }
                    j+=1;
                  }
            }
                //this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.ElectronicList;
              }
            }
          }
        },
        (err) => { },
      );
  }

  onTabClicked(event,tabView){
   
    console.log('tabss',tabView?.tabs[event?.index]?.header);
    this.activeTab=tabView?.tabs[event?.index]?.header;
    if(event.index!=0){
    if(this.productId!='19' && this.productId!='60' && this.selectedTab!=1 && this.LocationList.length==0) this.onSave(this.activeTab,null)
    }
  }
  getBack(type){
    if(this.endorsementSection){
      if(type=='Building'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      else if(type=='Content Risk'){
        this.fourth = true;
        this.getContentDetails();
        this.selectedTab -=1; 
        
      }
      else if(type=='Personal Accident'){
        this.fourth = true;
        this.getPersonalAccidentDetails();
        this.selectedTab -=1; 
      }
      else if(type=='All Risk'){
        this.fourth = true;this.getallriskDetails();
        this.selectedTab -=1; 
      }
      else if(type=='Personal Indemenity'){
        this.fourth = true;this.getPersonalIntermediaryDetails();
        this.selectedTab -=1; 
      }
      else if(type=='ElectricalEquipment'){
        this.fourth = true;this.getElectronicEquipment('change');
        this.selectedTab -=1; 
      }
      else if(type== 'Machinery Breakdown'){
        this.nine =true;
        this.getMachineryRisk();
        this.selectedTab -=1; 
        }
        else if(type== 'employers'){
          this.selectedTab -=1; 
          }
          else if(type== 'Fedility'){
            this.selectedTab -=1; 
            }
            else if(type== 'Accessories'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
              }
              else if(type== 'Device Details'){
                this.selectedTab -=1; 
                }
    }
    else if(!this.endorsementSection){
      if(type=='Building'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      if(type=='Content Risk'){
        this.fourth = true;
        this.getContentDetails();
        this.selectedTab -=1; 
        
      }
      else if(type=='Personal Accident'){
        this.fourth = true;
        this.getPersonalAccidentDetails();
        this.selectedTab -=1; 
      }
      else if(type=='All Risk'){
        this.fourth = true;this.getallriskDetails();
        this.selectedTab -=1; 
      }
      else if(type=='Personal Indemenity'){
        this.fourth = true;this.getPersonalIntermediaryDetails();
        this.selectedTab -=1; 
      }
      else if(type=='ElectricalEquipment'){
        this.fourth = true;this.getElectronicEquipment('change');
        this.selectedTab -=1; 
      }
      else if(type== 'Machinery Breakdown'){
        this.nine =true;
        this.getMachineryRisk();
        this.selectedTab -=1; 
        }
        else if(type== 'employers'){
          this.selectedTab -=1; 
          }
          else if(type== 'Fedility'){
            this.selectedTab -=1; 
            }
            else if(type== 'Accessories'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
              }
              else if(type== 'Device Details'){
                this.selectedTab -=1; 
                }
                else if(type=='Medical'){
                  this.selectedTab-=1;
                }
     
      // else if(this.buildingDetailsSection){
      //   console.log('Buildingss else block',this.buildingDetailsSection)
      //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      // }
    }

    
  }
  showSidebar() {
    this.sidebarVisible = true;
  }
  onsaveallrisks(modal){
    console.log("employee records",this.employeeUploadRecords,this.indexallrisk)
    //let index=this.employeeUploadRecords.indexOf(ele => ele.SerialNumber == this.serialno)
    this.employeeUploadRecords[this.indexallrisk]['SumInsured'] = this.suminsuredallrisk;
    this.employeeUploadRecords[this.indexallrisk]['Description'] = this.descallrisk;
    this.employeeUploadRecords[this.indexallrisk]['SerialNumber'] = this.serialno,
    this.employeeUploadRecords[this.indexallrisk]['LocationId'] = this.empLocation;//this.serialNoDesc
    this.employeeUploadRecords[this.indexallrisk]['ContentTypeId'] =this.employeeName; 
    this.employeeUploadRecords[this.indexallrisk]['LocationDesc'] = this.LocationList.find(ele=>ele.Code==this.empLocation).label;//this.serialNoDesc
    this.employeeUploadRecords[this.indexallrisk]['ContentTypeDesc'] =this.allriskList.find(ele=>ele.Code==this.employeeName).label; 
    console.log("After List",this.employeeUploadRecords,this.indexallrisk);
    modal.dismiss('Cross click');
  }
  onsavecontent(modal){
    console.log("employee records",this.employeeUploadRecords1,this.indexallrisk)
    //let index=this.employeeUploadRecords.indexOf(ele => ele.SerialNumber == this.serialno)
    this.employeeUploadRecords1[this.indexallrisk]['SumInsured'] = this.suminsuredallrisk;
    this.employeeUploadRecords1[this.indexallrisk]['Description'] = this.descallrisk;
    this.employeeUploadRecords1[this.indexallrisk]['SerialNumber'] = this.serialno,
    this.employeeUploadRecords1[this.indexallrisk]['LocationId'] = this.empLocation;//this.serialNoDesc
    this.employeeUploadRecords1[this.indexallrisk]['ContentTypeId'] =this.employeeName; 
    this.employeeUploadRecords1[this.indexallrisk]['LocationDesc'] = this.LocationList.find(ele=>ele.Code==this.empLocation).label;//this.serialNoDesc
    this.employeeUploadRecords1[this.indexallrisk]['ContentTypeDesc'] =this.allriskList.find(ele=>ele.Code==this.employeeName).label; 
    console.log("After List",this.employeeUploadRecords,this.indexallrisk);
    modal.dismiss('Cross click');
  }

  onSaveErrorRecordDetailsAllRisk(modal,type){
    // this.employeeErrorList = [];
    this.employeeErrorList =[];
    // this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
    // this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
    // this.employeeSalaryError = false;let i=0;
    // if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
    // if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
    // if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
    // if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
    // if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
    // if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
    // //if(i==0){
      let ReqObj = {
        "CompanyId":this.insuranceId,
        "ContentTypeDesc":this.allriskList.find(ele=>ele.Code==this.employeeName).label,
        "ContentTypeId": this.employeeName,
        "Description": this.descallrisk,
        "LocationDesc":this.LocationList.find(ele=>ele.Code==this.empLocation).label,
        "LocationId":this.empLocation,
        "ProductId":this.productId,
        "RequestReferenceNo":this.quoteRefNo,
      "SerialNumber":this.serialno,
        "RowNum": this.errorRowNum,
        "SumInsured":this.suminsuredallrisk
      }
      let urlLink = `${this.UploadUrl}eway/vehicle/update/employee/record`
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(data?.Message=='Records updated Success'){
                this.employeeErrorList =[];
                modal.dismiss('Cross click');
                this.getValidRecordDetailsAllRisk();
                //this.modalClose.nativeElement.click();
              }
              else{
                if(res.length!=0){this.employeeErrorList = res;}
              }
            }
        },
        (err) => { },
        ); 
    //}
  }

  onSaveLocation(type){
    console.log("Final Additional Info",this.form,this.productItem);
    if(this.currentBuildingIndex!=null){
      console.log('this.sectionDetails',this.sectionDetails)
        if(this.Addtional){
          if(this.productItem.LocationAddress!=null && this.productItem.LocationNameBuilding!=null && this.productItem.LocationAddress!='' && this.productItem.LocationNameBuilding!='' &&  this.productItem.BuildingSumInsureds!='0.0'&&  this.productItem.BuildingSumInsureds!=0){
            this.building[this.currentBuildingIndex].BuildingAddress = this.productItem.LocationAddress;
            this.building[this.currentBuildingIndex].LocationName = this.productItem.LocationNameBuilding;
            this.building[this.currentBuildingIndex].BuildingSuminsured = this.productItem.BuildingSumInsureds;
            this.productItem.LocationAddress=null;
            this.productItem.LocationNameBuilding=null;
            this.productItem.BuildingSumInsureds=null;
            this.getTotalSICost(this.building);
            this.currentBuildingIndex = null;
            this.Buildingsections=true;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            }
        }
        else {
          if(this.productItem.LocationAddress!=null && this.productItem.LocationNameBuilding!=null && this.productItem.LocationAddress!='' && this.productItem.LocationNameBuilding!=''){
            this.building[this.currentBuildingIndex].BuildingAddress = this.productItem.LocationAddress;
            this.building[this.currentBuildingIndex].LocationName = this.productItem.LocationNameBuilding;
            this.building[this.currentBuildingIndex].BuildingSuminsured = this.productItem.BuildingSumInsureds;
            this.productItem.LocationAddress=null;
            this.productItem.LocationNameBuilding=null;
            this.productItem.BuildingSumInsureds=null;
            this.getTotalSICost(this.building);
            this.currentBuildingIndex = null;
            this.Buildingsections=true;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
            }
        }
    
   
      //this.AddNew();
    }
    else{
      console.log('this.sectionDetails',this.sectionDetails)
      //let items = this.sectionDetails.find((ele) => ele.SectionId == 1 || (this.productId=='19' && ele.SectionId==40));
         if(this.Addtional){
          if(this.productItem.LocationAddress!=null && this.productItem.LocationNameBuilding!=null && this.productItem.LocationAddress!='' && this.productItem.LocationNameBuilding!='' && this.productItem.BuildingSumInsureds!='0.0'&&  this.productItem.BuildingSumInsureds!=0){
            let entry = {
              "BuildingAddress": this.productItem.LocationAddress,
              "BuildingBuildYear": null,
              "BuildingFloors": null,
              "InbuildConstructType": null,
              "BuildingSuminsured": this.productItem.BuildingSumInsureds,
              "RiskId": null,
              "LocationName": this.productItem.LocationNameBuilding,
              "SectionId": "1"
            }
            this.building.push(entry);
            this.getTotalSICost(this.building);
            this.currentBuildingIndex = null;
            this.productItem.LocationAddress=null;
            this.productItem.LocationNameBuilding=null;
            this.productItem.BuildingSumInsureds=null;
            this.Buildingsections=true;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
          }
        }
        else {
          if(this.productItem.LocationAddress!=null && this.productItem.LocationNameBuilding!=null && this.productItem.LocationAddress!='' && this.productItem.LocationNameBuilding!=''){
            let entry = {
              "BuildingAddress": this.productItem.LocationAddress,
              "BuildingBuildYear": null,
              "BuildingFloors": null,
              "InbuildConstructType": null,
              "BuildingSuminsured": this.productItem.BuildingSumInsureds,
              "RiskId": null,
              "LocationName": this.productItem.LocationNameBuilding,
              "SectionId": "1"
            }
            this.building.push(entry);
            this.getTotalSICost(this.building);
            this.currentBuildingIndex = null;
            this.productItem.LocationAddress=null;
            this.productItem.LocationNameBuilding=null;
            this.productItem.BuildingSumInsureds=null;
            this.Buildingsections=true;
            this.productItem = new ProductData();
            this.productItem.AccOccupation = this.accidentOccupation;
          }
      }
   
    }
    this.onSave(this.activeTab,type);
  }
  checkAccessories(){
    if(this.accessoriesList.length==1){
      let entry = this.accessoriesList[0];
      if(entry.SumInsured!='' && entry.SumInsured!=null && entry.SerialNoDesc!=null && entry.ContentRiskDesc!=null && entry.LocationId!=null) return true;
      else return false;
    }
    else return this.accessoriesList.length!=0;
  }
  onSaveAcessories(){
    console.log("Final Additional Info",this.form,this.productItem);
    if(this.Riskdetails.length==1){
      this.productItem.AccessoriesChassisNo = 1;
    }
    console.log('yyyyyyyyyyyy',this.productItem.AccessoriesChassisNo,this.currentAccessoriesIndex,this.productItem.AccessoriesSI);
    if(this.currentAccessoriesIndex!=null){
      if(this.productItem.AccessoriesSI !=null && this.productItem.AccessoriesChassisNo!=null && this.productItem.AccessoriesType!=null){
        this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = this.productItem.AccessoriesSI//this.contentSI;
        this.accessoriesList[this.currentAccessoriesIndex]['RiskId'] = this.productItem.AccessoriesChassisNo;
        this.accessoriesList[this.currentAccessoriesIndex]['SerialNoDesc'] = this.productItem.AccessoriesSerialNo;//this.serialNoDesc
        this.accessoriesList[this.currentAccessoriesIndex]['ItemId'] = this.productItem.AccessoriesType;//this.contentId;
        this.accessoriesList[this.currentAccessoriesIndex]['LocationId'] = this.productItem.AccessoriesChassisNo;
        this.accessoriesList[this.currentAccessoriesIndex]['ContentRiskDesc'] =this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
        this.currentAccessoriesIndex = null;
        this.editAccessoriesSection = false;
        this.enableAccessoriesEditSection = false;
        this.productItem = new ProductData();
        this.productItem.AccOccupation = this.accidentOccupation;
        if(this.ChassisList.length==1){
          this.productItem.ChassisNo = this.ChassisList[0].Code;
        }
      }
      //this.AddNew();
    }
    else{
      console.log('this.currentAccessoriesIndex',this.currentAccessoriesIndex)
      if(this.productItem.AccessoriesSI !=null && this.productItem.AccessoriesChassisNo!=null && this.productItem.AccessoriesType!=null){
      let entry = {
        "ItemId":this.productItem.AccessoriesType,
        "RiskId":this.productItem.AccessoriesChassisNo,
        "MakeAndModel":null,
        "ContentRiskDesc":this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label,
        "SerialNoDesc":this.productItem.AccessoriesSerialNo,
        "SerialNo":null,
        "ItemValue":null,
        "LocationId":this.productItem.AccessoriesChassisNo,
        "SumInsured":this.productItem.AccessoriesSI,
      }
      this.accessoriesList.push(entry);
      this.currentAccessoriesIndex = null;
      this.productItem = new ProductData();
      if(this.ChassisList.length==1){
        this.productItem.ChassisNo = this.ChassisList[0].Code;
      }
    }
    }
  }

  onSaveprofessiona(){
      console.log("Final Additional Info",this.form,this.productItem);
      if(this.currentPersonalIndIndex!=null){
        if(this.productItem.IndSI !=null && this.productItem.IndLocation!=null && this.liabilityOccupationId!=null){
        this.Intermedity[this.currentPersonalIndIndex]['Salary'] = this.productItem.IndSI;
        this.Intermedity[this.currentPersonalIndIndex]['RiskId'] = this.productItem.IndLocation;
        this.Intermedity[this.currentPersonalIndIndex]['OccupationId'] = this.liabilityOccupationId;
        this.Intermedity[this.currentPersonalIndIndex]['OccupationDesc'] = this.liabilityOccupation;//this.serialNoDesc
        this.Intermedity[this.currentPersonalIndIndex]['PersonName'] =this.productItem.IndName; //this.contentRiskDesc;
        this.Intermedity[this.currentPersonalIndIndex]['Dob'] = this.productItem.IndDob;
        this.Intermedity[this.currentPersonalIndIndex]['NationalityId'] = this.productItem.IndNationID;
        this.productItem.IndSI=null;this.productItem.IndLocation=null;this.productItem.IndName=null;this.productItem.IndDob=null;
        this.productItem.IndNationID =null;
        this.currentPersonalIndIndex=null;
        this.editPersonalIndSection= false;
        this.enablePersonalIndEditSection =false;
        this.getTotalSICost('PersonalIndemenity');
        this.productItem = new ProductData();
        this.productItem.AccOccupation = this.accidentOccupation;
        }
        //this.AddNew();
      }
      else{
        if(this.productItem.IndSI !=null && this.productItem.IndLocation!=null && this.liabilityOccupationId!=null){
        let entry = {
        "Dob":this.productItem.IndDob,
      "Height": null,   
      "OccupationId":  this.liabilityOccupationId,
      "OccupationDesc": this.liabilityOccupation,
      "NationalityId": this.productItem.IndNationID,
      "PersonName":this.productItem.IndName,
      "Salary": this.productItem.IndSI,
      "Weight": null,
      "RiskId": this.productItem.IndLocation,
      "SerialNo": null
        }
        this.Intermedity.push(entry);
        this.getTotalSICost('PersonalIndemenity');
        this.currentBuildingIndex = null;
        this.productItem.LocationAddress=null;
        this.productItem.LocationNameBuilding=null;
        this.productItem.BuildingSumInsureds=null;
        this.productItem = new ProductData();
        this.productItem.AccOccupation = this.accidentOccupation;
      }
      }
      this.onSavePersonalIntermedity('save');
  }

  onSaveContent(){
    // if(this.currentContentIndex!=null){
    //   if(this.productItem.ContentSI!='' && this.productItem.ContentSI!='0.0'  && this.productItem.ContentSI!='0' && this.productItem.ContentSI!=null && this.productItem.ContentType!=null && this.productItem.ContentType!='' ){
    // this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI;
    // this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
    // this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;
    // if(this.productItem.ContentDesc==null || this.productItem.ContentDesc=='' || this.productItem.ContentDesc==undefined){this.productItem.ContentDesc=this.dropList.find(ele=>String(ele.Code)==String(this.productItem.ContentType))?.CodeDesc;}
    // this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc;
    // this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType;
    // this.currentContentIndex=null;
    // this.productItem = new ProductData();
    // this.productItem.AccOccupation = this.accidentOccupation;
    //   }
    // // this.ContentAdd();
    // }
    // else{
    //   if(this.productItem.ContentSI!='' && this.productItem.ContentSI!='0.0'  && this.productItem.ContentSI!='0' && this.productItem.ContentSI!=null && this.productItem.ContentType!=null && this.productItem.ContentType!='' ){
    //   let entry = {
    //     "ItemId":this.productItem.ContentType,
    //   "RiskId":this.productItem.ContentLocation,
    //   "MakeAndModel":null,
    //   "ContentRiskDesc":this.productItem.ContentDesc,
    //   "SerialNoDesc":this.productItem.ContentSerialNo,
    //   "SerialNo":null,
    //   "ItemValue":this.productItem.ContentDesc,
    //   "SumInsured":this.productItem.ContentSI,
    //   }
    //   this.Cotentrisk.push(entry);
    //   this.productItem.ContentSI=null; 
    //   this.productItem.ContentLocation=null;
    //   this.productItem.ContentSerialNo=null;
    //   this.productItem.ContentDesc=null;
    //   this.productItem.ContentType=null;
    //   this.productItem = new ProductData();
    //   this.productItem.AccOccupation = this.accidentOccupation;
    // }
    // }
    //this.onSaveContentRisk('save');
  }
 
  onSaveAllRiskDEtails(){
    // if(this.currentRiskIndex!=null){
    //   if(this.productItem.RiskContentType!=null && this.productItem.RiskLocation!=null && this.productItem.RiskSI!=null && this.productItem.RiskSerialNo!=null){
    //   this.risk[this.currentRiskIndex]['SumInsured'] = this.productItem.RiskSI;
    //   this.risk[this.currentRiskIndex]['ContentRiskDesc'] = this.productItem.RiskDescription;
    //   this.risk[this.currentRiskIndex]['SerialNoDesc'] = this.productItem.RiskSerialNo,
    //   this.risk[this.currentRiskIndex]['RiskId'] = this.productItem.RiskLocation;//this.serialNoDesc
    //   this.risk[this.currentRiskIndex]['ItemId'] =this.productItem.RiskContentType; 
    //   this.currentRiskIndex=null;
    //   this.productItem = new ProductData(); 
    //   this.productItem.AccOccupation = this.accidentOccupation;
    //   }
    //   // this.AllAdd();     // this.AddNew();
    // }
    // else{
    //   if(this.productItem.RiskContentType!=null && this.productItem.RiskLocation!=null && this.productItem.RiskSI!=null && this.productItem.RiskSerialNo!=null){
    //     let entry = {
    //     "ItemId":this.productItem.RiskContentType,
    //     "RiskId":this.productItem.RiskLocation,
    //     "MakeAndModel":"TN123",
    //     "ContentRiskDesc":this.productItem.RiskDescription,
    //     "SerialNoDesc": this.productItem.RiskSerialNo,
    //     "SerialNo":"155685",
    //     "ItemValue":"26534556",
    //     "SumInsured":this.productItem.RiskSI,
    //     }
    //     this.risk.push(entry);
    //     this.productItem = new ProductData();
    //     this.productItem.AccOccupation = this.accidentOccupation;
    //   }
    // }
    // this.onSaveAllRisk('save');
  }
 

  getRelationTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId": "105",
      "BranchCode": "99999"
    }
    let urlLink = `${this.CommonApiUrl}dropdown/professionaltype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.relationList = data.Result;
          
        }
      });
  }
  onsavehealth(){

  }

  getHealthData(){
  
    let ReqObj = {
         "RequestReferenceNo": this.quoteRefNo,
         "RiskId": "",
         "ProductId": this.productId,
         "SectionId": this.item[0],
         //"96",
         "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.motorApiUrl}api/slide15/gethealthinsure`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let newslist:any[]=[];
          let selectedList = data?.Result;
          console.log('Selected Lists',selectedList,selectedList.length);
          if(selectedList.length!=0){
            let i=0;
              for(let product of selectedList){
                  if (product?.DateOfBirth != null) {
                    product['DateOfBirth'] = this.onDateFormatInEdit(product?.DateOfBirth)
                  }
                    newslist.push(product);
                    console.log('MMMMMMMMMM',newslist);
                  i+=1;
                  if(i==selectedList.length){
                  this.selectedProductList= newslist;
                    // this.dataSource = new MatTableDataSource(this.selectedProductList);
                    // this.dataSource.sort = this.sort;
                    // this.dataSource.paginator = this.paginator;
                    // console.log('Paginatorsss',this.dataSource.paginator);
                    // this.applyFilter(this.filterValue);
                    // console.log('OOOOOOOOOOOOOOO',this.dataSource);
                  }
              }
              // if(this.selectedList.length-1 == i){
              //   this.LossList = this.newList;
              //   console.log('JJJJJJJJJJJJJ',this.LossList);
              // }
          }
        }
        else{
          this.selectedProductList = [];
          this.createCover();
          //let productData = this.selectedProductList;
          // this.dataSource = new MatTableDataSource(productData);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
          // this.applyFilter(this.filterValue);
        }
      });
  }
  onSavePersonalAccidentDetails(){
    if(this.currentPersonalAccidentIndex!=null){
      if(this.productItem.AccNationID!=null && this.productItem.AccSI!=0 && this.productItem.AccSI!='0' && this.productItem.AccSI!=null && this.productItem.AccidentLocation!=null && this.accidentOccupationId!=null){
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = this.productItem.AccSI;
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['RiskId'] = this.productItem.AccidentLocation;
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['OccupationId'] = this.accidentOccupationId,
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['OccupationDesc'] = this.accidentOccupation;//this.serialNoDesc
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['PersonName'] =this.productItem.AccName; //this.contentRiskDesc;
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Dob'] = this.productItem.AccDob;
        this.PersonalAssistantList[this.currentPersonalAccidentIndex]['NationalityId'] = this.productItem.AccNationID;
        
      }
    }
    else{
      if(this.productItem.AccSI!=null && this.productItem.AccidentLocation!=null && this.accidentOccupationId!=null){
      let entry = {
        "Dob": this.productItem.AccDob,
        "Height": null,
        "OccupationId": this.accidentOccupationId,
        "OccupationDesc": this.accidentOccupation,
        "NationalityId": this.productItem.AccNationID,
        "PersonName": this.productItem.AccName,
        "Salary":this.productItem.AccSI,
        "Weight": null,
        "RiskId":this.productItem.AccidentLocation,
        "SerialNo": null
      }
      this.PersonalAssistantList.push(entry);
    }
    }
    
    this.onSavePersonalAccident('save');
  }
  // onCancel(){
  //   this.productItem = new ProductData();
  // }
  onSaveHealth(){
    if (this.selectedProductList.length != 0) {
    let datas=this.selectedProductList;
      let i=0, reqList =[];
      for(let entry of datas){
          let data = {
            "RiskId": entry.RiskId,
            "DateOfBirth": entry.DateOfBirth,
            "RelationType":entry.RelationType,
            "FirstName": entry.FirstName,
            "LastName":entry.LastName,
            "NationalityId": entry.NationalityId,
            "EmployeeId":null,
          }
          if(data.DateOfBirth!=null){
              data.DateOfBirth = this.datePipe.transform(data.DateOfBirth, "dd/MM/yyyy")
          }
          reqList.push(data);
          i+=1;
          if(i==this.selectedProductList.length){
            this.finalhealthsubmit(reqList);
          }
      }

    }
  }
  finalhealthsubmit(reqList){
    let ReqObj = {
       "CreatedBy": this.loginId,
       "SectionId":  this.item[0],
       //"96",
       "QuoteNo":sessionStorage.getItem('quoteNo'),
       "ProductId": this.productId,
       "InsuranceId": this.insuranceId,
       "FamilyDetails":reqList
     }
     let urlLink = `${this.motorApiUrl}api/slide15/infohealthinsurance`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         console.log(data);
         let res: any = data;
         if (data.ErrorMessage.length != 0) {
           if (res.ErrorMessage) {
            
           }
         }
         else {
           console.log('First Fields');
           //this.router.navigate(['/quotation/plan/main/document-info']);
          this.checkValidation();
         }
       },
       (err) => { },
     );
 }
  onSavePersonalInt(){
    console.log("Final Additional Info",this.form,this.productItem)
    if(this.currentPersonalIndIndex!=null){
      console.log('HHHHHHHHHHHH',this.currentRiskIndex);
      this.Intermedity[this.currentPersonalIndIndex]['Salary'] = this.productItem.IndSI;
      this.Intermedity[this.currentPersonalIndIndex]['RiskId'] = this.productItem.IndLocation;
      this.Intermedity[this.currentPersonalIndIndex]['OccupationId'] = this.liabilityOccupationId;
      this.Intermedity[this.currentPersonalIndIndex]['OccupationDesc'] = this.liabilityOccupation;//this.serialNoDesc
      this.Intermedity[this.currentPersonalIndIndex]['PersonName'] =this.productItem.IndName; //this.contentRiskDesc;
      this.Intermedity[this.currentPersonalIndIndex]['Dob'] = this.productItem.IndDob;
      this.Intermedity[this.currentPersonalIndIndex]['NationalityId'] = this.productItem.IndNationID;
      this.productItem = new ProductData(); 
      this.productItem.AccOccupation = this.accidentOccupation;
      // this.AllAdd();     // this.AddNew();
    }
    else{
      let entry = {
        "Dob": null,
        "Height": null,
        "OccupationId": this.liabilityOccupationId,
        "OccupationDesc": this.liabilityOccupation,
        "NationalityId": null,
        "PersonName": null,
        "Salary": null,
        "Weight": null,
        "RiskId": null,
        "SerialNo": null
      }
      this.Intermedity.push(entry);
      this.productItem = new ProductData();
      this.productItem.AccOccupation = this.accidentOccupation;
    }
  }

  onSaveElectronicdetails(){
    console.log("Final Additional Info",this.form,this.productItem)
    if(this.currentElectronicIndex!=null){
      this.ElectronicItem[this.currentElectronicIndex]['SumInsured'] = this.productItem.ElqSI;//this.contentSI;
      this.ElectronicItem[this.currentElectronicIndex]['ContentRiskDesc'] = this.ElectronicList.find(ele=>ele.Code==this.productItem.ElqList).label;
      this.ElectronicItem[this.currentElectronicIndex]['PurchaseMonth'] = this.productItem.ElqJoin;//this.serialNoDesc
      this.ElectronicItem[this.currentElectronicIndex]['PurchaseYear'] =this.productItem.ElqPeriod; //this.contentRiskDesc;
      this.ElectronicItem[this.currentElectronicIndex]['ItemId'] = this.productItem.ElqList//this.contentId;
      this.ElectronicItem[this.currentElectronicIndex]['MakeAndModel'] = this.productItem.Elqmake;
      this.ElectronicItem[this.currentElectronicIndex]['RiskId'] = this.productItem.ElqLocation;
      this.currentElectronicIndex=null;
      this.productItem = new ProductData(); 
    }
    else{
      let entry = {
        "ItemId":this.productItem.ElqList,
        "ItemValue": "10000",
        "MakeAndModel":this.productItem.Elqmake,
        "ContentRiskDesc":this.ElectronicList.find(ele=>ele.Code==this.productItem.ElqList).label,
        "SerialNoDesc": null,
        "PurchaseMonth":this.productItem.ElqJoin,
        "PurchaseYear":this.productItem.ElqPeriod,
        "RiskId":this.productItem.ElqLocation,
        "SerialNo": "1",
        "SumInsured":this.productItem.ElqSI
      }
      this.ElectronicItem.push(entry);
      console.log('JKHGFFFFFGH',this.ElectronicItem)
      this.productItem = new ProductData();
    }
  }
  onemployeeCommon(){
    let j=0,itemValue = null;
    if(this.productId=='32') this.productItem.EmpsOccupation = '99999';
    if(this.productId=='14' || this.productId=='32'){
      if(this.productItem.EmpsName!=null && this.productItem.EmpsName!='' && this.productItem.EmpsName!=undefined){this.employeeNameError=false;}
      else{j+=1;this.employeeNameError=true;}
      if(this.productItem.EmpsSI!=null && this.productItem.EmpsSI!='' && this.productItem.EmpsSI!=undefined){
        this.employeeSalaryError=false;
        let si = this.getTotalSI(this.locationlist[this.selectedTab]);
        let totalSI = this.getActualSI(this.locationlist[this.selectedTab]);
        let totalCost = Number(this.productItem.EmpsSI) + si;
        if(totalSI<totalCost && (this.currentRiskIndex==null || this.currentRiskIndex==undefined)){j+=1;this.sumInsuredExceedError = true;}
        else{this.sumInsuredExceedError = false;}
      }
      else{j+=1;this.employeeSalaryError=true;}
    }
    if(this.productId=='14'){
      if(this.productItem.EmpsOccupation!=null && this.productItem.EmpsOccupation!='' && this.productItem.EmpsOccupation!=undefined){this.employeeOccupationError=false;}
      else{j+=1;this.employeeOccupationError=true;}
    }
    if(this.productId=='25'){
      
      if(this.productItem.ElqList!=null && this.productItem.ElqList!='' && this.productItem.ElqList!=undefined){
        let entry = this.locationlist[this.selectedTab];
        let obj = entry.SectionDetails.find(ele=>ele.ContentType==this.productItem.ElqList)
        if(obj) itemValue = obj.ContentDesc;
        this.electonicItemError=false;}
      else{j+=1;this.electonicItemError=true;}
      if(this.productItem.ElqJoin!=null && this.productItem.ElqJoin!='' && this.productItem.ElqJoin!=undefined){this.electronicJoinError=false;}
      else{j+=1;this.electronicJoinError=true;}
      if(this.productItem.ElqPeriod!=null && this.productItem.ElqPeriod!='' && this.productItem.ElqPeriod!=undefined){this.electronicYearError=false;}
      else{j+=1;this.electronicYearError=true;}
      if(this.productItem.Elqmake!=null && this.productItem.Elqmake!='' && this.productItem.Elqmake!=undefined){this.electronicMakeModelError=false;}
      else{j+=1;this.electronicMakeModelError=true;}
      if(this.productItem.ElqSI!=null && this.productItem.ElqSI!='' && this.productItem.ElqSI!='0' && this.productItem.ElqSI!=0 && this.productItem.ElqSI!=undefined){
        this.electronicSalaryError=false;
        let si = this.getTotalSI(this.locationlist[this.selectedTab]);
        let totalSI = this.getActualSI(this.locationlist[this.selectedTab]);
       if(this.currentRiskIndex==null || this.currentRiskIndex==undefined){
            let totalCost = Number(this.productItem.ElqSI) + si; 
            if(totalSI<totalCost){j+=1;this.sumInsuredExceedError = true;}
            else{this.sumInsuredExceedError = false;}
        }
        else{
          if(this.locationlist[this.selectedTab].EmployeeList.length!=0){
            let si = 0,i=0;
            for(let entry of this.locationlist[this.selectedTab].EmployeeList){
              if(entry.Salary && this.currentRiskIndex!=this.selectedTab) si=si+entry.Salary; 
              i+=1;
              if(i==this.locationlist[this.selectedTab].EmployeeList){if(si!=null || si !=undefined) return si; else return 0}
            }
          } else{ return 0;}
          this.sumInsuredExceedError = false;
        }
      }
      else{j+=1;this.electronicSalaryError=true;}
    }
 
    if(j==0){
      let obj = null;
        if(this.productId=='14' || this.productId=='32'){
          obj = {
            "Address": null,
            "Createdby": this.loginId,
            "EmployeeName": this.productItem.EmpsName,
            "EmployeeId":null,
            "InsuranceId": this.insuranceId,
            "OccupationDesc": this.employeeOccupationList.find(ele=>ele.Code==this.productItem.EmpsOccupation).label,
            "OccupationId": this.productItem.EmpsOccupation,
            "DateOfBirth": null,
            "DateOfJoiningYear": null,
            "DateOfJoiningMonth": null,
            "ProductId": this.productId,
            "QuoteNo": this.quoteNo,
            "RequestReferenceNo": this.quoteRefNo,
            "RiskId": null,
            "Salary": this.productItem.EmpsSI,
            "NationalityId":null,
            "LocationId":this.selectedTab+1
          }
        }
        else if(this.productId=='25'){
          obj = {
              "ItemId": this.productItem.ElqList,
              "ItemValue": itemValue,
              "MakeAndModel": this.productItem.Elqmake,
              "PurchaseMonth": this.productItem.ElqJoin,
              "PurchaseYear": this.productItem.ElqPeriod,
              "RiskId": null,
              "ContentRiskDesc":null,
              "SerialNoDesc": null,
              "SerialNo":"856757",
              "SumInsured":this.productItem.ElqSI
          }
        }
      let index = this.selectedTab;
      if(this.currentRiskIndex==null || this.currentRiskIndex==undefined){
        console.log(this.locationlist[index]);if(this.locationlist[index].EmployeeList) this.locationlist[index].EmployeeList.push(obj);
        else this.locationlist[index]['EmployeeList']=[obj];
      }
      else{console.log(this.locationlist[index]);this.locationlist[index].EmployeeList[this.currentRiskIndex] = obj;}
      this.productItem = new ProductData();
      this.currentRiskIndex = null;
    }
    
  }
  onemployeesavelast(){
    if(this.productId=='32') this.productItem.EmpsOccupation = '99999';
    if(this.currentEmployeeIndex!=null){
      this.employeeList[this.currentEmployeeIndex]['LocationName'] = this.productItem.EmpsLocation;
      this.employeeList[this.currentEmployeeIndex]['EmployeeName'] = this.productItem.EmpsName;
      this.employeeList[this.currentEmployeeIndex]['OccupationId'] = this.productItem.EmpsOccupation;
      this.employeeList[this.currentEmployeeIndex]['OccupationDesc'] = this.employeeOccupationList.find(ele=>ele.Code==this.productItem.EmpsOccupation).label;
      this.employeeList[this.currentEmployeeIndex]['Salary'] = this.productItem.EmpsSI;
      console.log('JJJJJ',this.employeeList[this.currentEmployeeIndex]['Salary']);
      this.employeeList[this.currentEmployeeIndex]['Createdby'] = this.loginId;
      this.currentEmployeeIndex = null;
      this.getTotalSICost('Employee');
      this.productItem = new ProductData(); 
    }
    else{
      if(this.productItem.EmpsLocation!=null && this.productItem.EmpsName!=null && this.productItem.EmpsSI!=null && this.productItem.EmpsOccupation!=null){
        let entry = {
          "Address": this.productItem.EmpsAddress,
          "Createdby": this.loginId,
          "EmployeeName": this.productItem.EmpsName,
          "EmployeeId":null,
          "InsuranceId": this.insuranceId,
          "OccupationDesc":this.employeeOccupationList.find(ele=>ele.Code==this.productItem.EmpsOccupation).label,
          "OccupationId":this.productItem.EmpsOccupation,
          "DateOfBirth": this.datePipe.transform(this.productItem.EmpsDob, "dd/MM/yyyy"),
          "DateOfJoiningYear": this.productItem.EmpsPeriod,
          "DateOfJoiningMonth":this.productItem.EmpsJoin,
          "ProductId": this.productId,
          "QuoteNo": this.quoteNo,
          "RequestReferenceNo": this.quoteRefNo,
          "Salary": this.productItem.EmpsSI,
          "NationalityId":this.productItem.EmpsNationality,
          "LocationName":this.productItem.EmpsLocation,
          // "LocationName":null
        }
        this.employeeList.push(entry);
        this.getTotalSICost('Employee');
        this.productItem = new ProductData();
      }
    }
      // this.employeeList[this.currentEmployeeIndex]['RiskId'] = this.productItem.EmpsLocation;
      // this.employeeList[this.currentEmployeeIndex]['LocationId'] = this.productItem.EmpsLocation;
      // this.employeeList[this.currentEmployeeIndex]['EmployeeName'] = this.productItem.EmpsName;
      // this.employeeList[this.currentEmployeeIndex]['OccupationId'] = this.productItem.EmpsOccupation;
      // this.employeeList[this.currentEmployeeIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.EmpsLocation).label;
      // this.employeeList[this.currentEmployeeIndex]['OccupationDesc'] = this.employeeOccupationList.find(ele=>ele.Code==this.productItem.EmpsOccupation).label;
      // if(this.productItem.EmpsDob!=null && this.productItem.EmpsDob!='') this.employeeList[this.currentEmployeeIndex]['DateOfBirth'] = this.datePipe.transform(this.productItem.EmpsDob, "dd/MM/yyyy");
      // this.employeeList[this.currentEmployeeIndex]['DateOfJoiningYear'] =this.productItem.EmpsPeriod; 
      // this.employeeList[this.currentEmployeeIndex]['DateOfJoiningMonth'] = this.productItem.EmpsJoin;
      // let salary = '';
      // this.employeeList[this.currentEmployeeIndex]['Salary'] = this.productItem.EmpsSI;
      // this.employeeList[this.currentEmployeeIndex]['NationalityId'] = this.productItem.EmpsNationality; 
      // this.employeeList[this.currentEmployeeIndex]['Address'] = this.productItem.EmpsAddress;
      // this.employeeList[this.currentEmployeeIndex]['Createdby'] = this.loginId;
      // this.getTotalSICost('Employee');
      // this.onsubmitemployee();
    }
    getTotalAllRisk(){
      this.Total = 0;let i=0;
      if(this.TableRowAllRisk.length!=0){
        for(let tot of this.TableRowAllRisk){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) tot.SumInsured = Number(tot.SumInsured);
          this.Total=this.Total+tot.SumInsured;
          return this.Total
        }
      }
      else{this.productItem.SumInsured =0;return 0;} 
    }
    addRowAllRisk(){
      const newItem = {  id: this.TableRowAllRisk.length + 1,RiskId:'',ItemId: '', Content: '', Serial: '',Description:'',SumInsured:0,};
      this.TableRowAllRisk.push(newItem);
      this.currentAllRiskRowIndex = this.TableRowAllRisk.length-1;
    }
    getAllContentTypeDescription(Content) {
      let entry = this.allriskList.find(ele=>ele.Code==Content);
      if(entry){
        return entry.CodeDesc;
      }
      else return '';
    }
    getContentTypeDescription(Content) {
      let entry = this.dropList.find(ele=>ele.Code==Content);
      if(entry){
        return entry.CodeDesc;
      }
      else return '';
    }
    deleteProduct(index) {
      this.TableRow.splice(index,1);
      if(this.TableRow.length==0){
        this.onSaveContentRisk('deleteSave');
      }
    }
    getPLTotal(){
      this.Total = 0;let i=0;
      if(this.TableRowPL.length!=0){
        for(let tot of this.TableRowPL){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
          
            return this.Total;
          
        }
      }
      else return 0;
    }
    getOccupationName(entry){
      if(entry?.OccupationId){return this.occupationList.find(ele=>ele.Code==entry.OccupationId)?.CodeDesc}
      else return '';
    }
    addRowPL(){
      const newItem = {  id: this.TableRowPL.length + 1,RiskId:'',Name: '',Nationality:this.countryId,Dob: '',SerialNo : '',SumInsured: 0};
      this.TableRowPL.push(newItem);
      this.currentPLRowIndex = this.TableRowPL.length-1;
    }
    deleteProductPL(index) {
      this.TableRowPL.splice(index,1);
      if(this.TableRowPL.length==0){
        this.onSavePL('deleteSave','PL');
      }
    }
    addRowDS(){
      const newItem = {  id: this.TableRowDS.length + 1,RiskId:'',Name: '',Nationality:this.countryId,Dob: '',SerialNo : '',SumInsured: 0};
      this.TableRowDS.push(newItem);
      this.currentDSRowIndex = this.TableRowDS.length-1;
    }
    deleteProductDS(index) {
      this.TableRowDS.splice(index,1);
      if(this.TableRowDS.length==0){
        this.onSavePL('deleteSave','DS');
      }
    }
    addRowPA(){
      const newItem = {  id: this.TableRowPA.length + 1,RiskId:'',Name: '',Nationality:this.countryId,Dob: '',SerialNo : '',SumInsured: 0};
      this.TableRowPA.push(newItem);
      this.currentPARowIndex = this.TableRowPA.length-1;
    }
    deleteProductPA(index) {
      this.TableRowPA.splice(index,1);
      if(this.TableRowPA.length==0){
        this.onSavePA('deleteSave');
      }
    }
    getProductDob(entry){
      if(entry.Dob!=null && entry.Dob!=''){
          if(String(entry.Dob).split('/').length>1) return entry.Dob
          else return String(this.datePipe.transform(entry.Dob,'dd/MM/yyyy'));
      }
      else return '';
    }
    onSavePL(type,section){
      let entryList = [];
      if(section=='PL') entryList=this.TableRowPL;
      else entryList=this.TableRowDS;
      if (entryList.length != 0) {
        let i=0,j=0, reqList =[];
        for(let entry of entryList){
          // if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
          //   else{ j+=1; entry['LocationNameError']=true;}
            if(entry.Name!=null && entry.Name!='' && entry.Name!=undefined) entry['NameError']=false;
            else{ j+=1; entry['NameError']=true;}
            if(entry.Dob!=null && entry.Dob!='' && entry.Dob!=undefined) entry['DobError']=false;
            else{ j+=1; entry['DobError']=true;}
            if(entry.SumInsured!=null   && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
            else{ j+=1; entry['SumInsuredError']=true;}
            if(entry.OccupationId!=null   && entry.OccupationId!=undefined && entry.OccupationId!=''){ entry['OccupationError']=false;}
            else{ j+=1; entry['OccupationError']=true;}
            if(entry.Nationality!=null   && entry.Nationality!=undefined && entry.Nationality!=''){ entry['NationalityError']=false;}
            else{ j+=1; entry['NationalityError']=true;}
            if(entry.ItemId!= null && entry.ItemId!='' && entry.ItemId!=undefined) entry['Content']=this.allriskList.find(ele=>ele.Code==entry.ItemId)?.CodeDesc
            let data = {
              "Dob": this.getProductDob(entry),
              "Height":null,
              "OccupationId": entry.OccupationId,
              "PersonName": entry.Name,
              "NationalityId": entry.Nationality,
              "Salary": entry.SumInsured,
              "Weight": entry.Weight,
              "RiskId": i+1,
              "LocationName": entry.LocationName,
              "SerialNo": null
            }
            reqList.push(data);
            i+=1;
            if(i==entryList.length && j==0){
                this.onFinalSavePL(reqList,type,section)
            }
        }
      }
      else this.onFinalSavePL([],type,section)
    }
    onFinalSavePL(reqList,type,section){
      let sectionID = null;
      if(section=='PL') sectionID='139';
      else sectionID='106';
      let  ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": sectionID,
        "Description": "Accident Details",
        "Type":'PI',
        "Companyid": this.insuranceId,
       "ProductId": this.productId,
       "BranchCode": this.branchCode,
        "PersonalDetails":reqList
      }
      let urlLink = `${this.motorApiUrl}api/savepersonalaccident`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {
              if(section=='PL'){
                if(this.TableRowPL.length!=0){
                  if(this.TableRowPL.length>1 || (this.TableRowPL[0].SumInsured!=null && this.TableRowPL[0].SumInsured!=0)) this.currentPLRowIndex = null;
                }
              }
              else{
                if(this.TableRowDS.length!=0){
                  if(this.TableRowDS.length>1 || (this.TableRowDS[0].SumInsured!=null && this.TableRowDS[0].SumInsured!=0)) this.currentDSRowIndex = null;
                }
              }
            }
          }
          else { 
            if(section=='PL'){
              if(type=='direct'){ this.personalLiabilityDialog = false;this.currentPLRowIndex=null;}
              else{
                this.TableRowPL =[{
                  id:1,
                  OccupationId:'',
                  RiskId:'',
                  Name: '',
                  Nationality: this.countryId,
                  Dob: '',
                  SerialNo : '',
                  SumInsured: 0,
                }]
                this.currentPLRowIndex=this.TableRowPL.length-1;
              }
            }
            else{
              if(type=='direct'){ this.domesticServantDialog = false;this.currentDSRowIndex=null;}
              else{
                this.TableRowDS =[{
                  id:1,
                  OccupationId:'',
                  RiskId:'',
                  Name: '',
                  Nationality: this.countryId,
                  Dob: '',
                  SerialNo : '',
                  SumInsured: 0,
                }]
                this.currentDSRowIndex=this.TableRowDS.length-1;
              }
            }
          }
        },
        (err) => {},
      );
    }
    getPATotal(){
      this.Total = 0;let i=0;
      if(this.TableRowPA.length!=0){
        for(let tot of this.TableRowPA){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
          i+=1;
          if(i==this.TableRowPA.length){
            this.TableRowPA['DeathSI'] = this.Total;
            // if(this.fields4.length!=0){
            //   let fieldList = this.fields4[0].fieldGroup[0].fieldGroup;
            //   for(let field of fieldList){
            //     if(field.key=='PersonalAccidentSuminsured'){
            //         field.props.disabled = false;
            //         if(field.formControl) field.formControl.setValue(this.Total);
            //         field.props.disabled = true;
            //     }
            //     else if(field.key=='OccupationType'){
            //       if(field.formControl) field.formControl.setValue(this.pAOccupationId);
            //     }
            //   }
            // }
            return this.Total;
          }
        }
      }
      else return 0;
    }
    onSavePA(type){
      if (this.TableRowPA.length != 0) {
        let i=0,j=0, reqList =[];
        for(let entry of this.TableRowPA){
          // if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
          //   else{ j+=1; entry['LocationNameError']=true;}
            if(entry.Name!=null && entry.Name!='' && entry.Name!=undefined) entry['NameError']=false;
            else{ j+=1; entry['NameError']=true;}
            if(entry.Dob!=null && entry.Dob!='' && entry.Dob!=undefined) entry['DobError']=false;
            else{ j+=1; entry['DobError']=true;}
            if(entry.SumInsured!=null   && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
            else{ j+=1; entry['SumInsuredError']=true;}
            if(entry.OccupationId!=null   && entry.OccupationId!=undefined && entry.OccupationId!=''){ entry['OccupationError']=false;}
            else{ j+=1; entry['OccupationError']=true;}
            if(entry.Nationality!=null   && entry.Nationality!=undefined && entry.Nationality!=''){ entry['NationalityError']=false;}
            else{ j+=1; entry['NationalityError']=true;}
            if(entry.ItemId!= null && entry.ItemId!='' && entry.ItemId!=undefined) entry['Content']=this.allriskList.find(ele=>ele.Code==entry.ItemId)?.CodeDesc
            
            let data = {
              "Dob": this.getProductDob(entry),
              "Height":null,
              "OccupationId": entry.OccupationId,
              "PersonName": entry.Name,
              "NationalityId": entry.Nationality,
              "Salary": entry.SumInsured,
              "Weight": entry.Weight,
              "RiskId": i+1,
              "LocationName": entry.LocationName,
              "SerialNo": null
            }
            reqList.push(data);
            i+=1;
            if(i==this.TableRowPA.length && j==0){
                this.onFinalSavePA(reqList,type);
            }    
        }
      }
      else this.onFinalSavePA([],type);
    }
    onFinalSavePA(reqList,type){
      let  ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": "138",
        "Description": "Accident Details",
        "Type":'PI',
        "Companyid": this.insuranceId,
        "ProductId": this.productId,
        "BranchCode": this.branchCode,
        "PersonalDetails":reqList
      }
      let urlLink = `${this.motorApiUrl}api/savepersonalaccident`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res: any = data;
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {
              if(this.TableRowPA.length!=0){
                if(this.TableRowPA.length>1 || (this.TableRowPA[0].SumInsured!=null && this.TableRowPA[0].SumInsured!=0)) this.currentPARowIndex = null;
              }
            }
          }
          else { 
            if(type=='direct'){this.personalAccidentDialog = false;this.currentPARowIndex=null;}
            else{
              this.TableRowPA =[{
                id:1,
                OccupationId:'',
                RiskId:'',
                Name: '',
                Nationality: this.countryId,
                Dob: '',
                SerialNo : '',
                SumInsured: 0,
              }];
              this.currentPARowIndex = this.TableRowPA.length-1;
            }
          }
        },
        (err) => {},
      );
    }
    getDSTotal(){
      this.Total = 0;let i=0;
      if(this.TableRowDS.length!=0){
        for(let tot of this.TableRowDS){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
          i+=1;
          if(i==this.TableRowDS.length){
            this.TableRowDS['DomesticServantSi'] = this.Total;
            // if(this.fields7.length!=0){
            //   let fieldList = this.fields7[0].fieldGroup[0].fieldGroup;
            //   for(let field of fieldList){
            //     if(field.key=='DomesticServantSi'){
            //       field.props.disabled = false;
            //       if(field.formControl) field.formControl.setValue(this.Total);
            //       field.props.disabled = true;
            //     }
            //     // else if(field.key=='LiabilityOccupationId'){
            //     //   if(field.formControl) field.formControl.setValue(this.plOccupationId);
            //     // }
            //   }
            // }
            return this.Total;
          }
        }
      }
      else return 0;
    }
    getContentDetail(){
      let sectionId=null;
      if(this.productId=='19') sectionId = '47';
      else sectionId = '47';
      let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
      let ReqObj = {
        "RequestReferenceNO": this.quoteRefNo,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "SectionId": sectionId
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          
          if(res.Result?.ContentRiskDetails){
            if(res.Result.ContentRiskDetails.length!=0){
              this.currentContentRowIndex = null;
             if(this.endorsementSection){
               this.contentRiskSection = !this.enableFieldsList.some(ele=>ele=='ContentSuminsured');
             }
             else this.contentRiskSection = true;
             let list = res.Result.ContentRiskDetails;
             let i=0;
             for(let content of list){
                if(content.ItemId!=null) content['Content'] = list?.ItemValue;
                if(content.RiskId!=null && content.RiskId!=undefined && content.RiskId!=''){
                  content['LocationName'] = this.TableRowBuilding.find(ele=>ele.RiskId==content.RiskId)?.LocationName;
                }
                this.TableRow.push(content);
             }
              this.TableRow = res.Result.ContentRiskDetails;
              this.currentContentIndex = this.TableRow.length;
              if(this.TableRow.length!=0){
                
                if(this.TableRow.length>1 || (this.TableRow[0].SumInsured!=null && this.TableRow[0].SumInsured!=0)) this.currentContentRowIndex = null;
              }
              this.getTotal();
            }
          }
        })
    }
    getallriskDetailsData(){
      let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
      let ReqObj = {
        "RequestReferenceNO": this.quoteRefNo,
          "QuoteNo": sessionStorage.getItem('quoteNo'),
          "SectionId":"3"
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
            // let res: any = data;
              if(data.Result.ContentRiskDetails){
                this.TableRowAllRisk = data?.Result?.ContentRiskDetails;
                if(this.TableRowAllRisk.length!=0){
                  if(this.TableRowAllRisk.length>1 || (this.TableRowAllRisk[0].SumInsured!=null && this.TableRowAllRisk[0].SumInsured!=0)) this.currentAllRiskRowIndex = null;
                }
                if(this.TableRowAllRisk.length!=0){
                  for(let entry of this.TableRowAllRisk){
                    //this.onChangeContentLocation(entry);
                    entry['Content'] = entry?.ItemValue;
                    entry['Serial'] = entry?.SerialNoDesc;
                    entry['Description'] = entry?.ContentRiskDesc;
                  }
                }
              } 
              else{
                this.TableRowAllRisk =[{
                  id:1,
                  ItemId:'',
                  Content: '',
                  Serial : '',
                  Description: '',
                  SumInsured: 0,
                }];
              } 
          })
    }
    // getDomesticServantDetails(type){
    //   let ReqObj = {
    //     "RequestReferenceNo": this.requestReferenceNo,
    //     "QuoteNo": null,
    //     "SectionId":  "106"
    //   }
    //   let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
    //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //     (data: any) => {
    //       console.log(data);
    //       if (data.Result) {
    //         if(data.Result.PersonalDetails){
    //           this.currentDSRowIndex = null;
    //           this.TableRowDS = data.Result.PersonalDetails;
    //           for(let entry of this.TableRowDS){
    //             entry['Name'] = entry?.PersonName;
    //             entry['SumInsured'] = entry?.Salary;
    //             entry['Nationality'] = entry?.NationalityId;
    //             if(entry.RiskId) this.onChangeContentLocation(entry);
    //           }
    //           this.getOccupationList('36','DomesticServant');
    //           this.editsections('DomesticServant');
    //         }
    //         else{this.productItem.LiabilityOccupationId = null;this.productItem.PersonalIntermediarySuminsured='0';this.productItem.EmpLiabilitySi=null; 
    //         this.getOccupationList('36','DomesticServant');
    //         this.editsections('DomesticServant');
    //         }
    //       }
    //       this.newselectedIndex+=1;
    //       this.editsections(type);
    //     },
    //     (err) => { },
    //   );
    // }
    getPersonalLiabilityDetails(){
      let ReqObj = {
        "RequestReferenceNo": this.quoteRefNo,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "SectionId":  "139"
      }
      let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            if(data.Result.PersonalDetails){
              this.currentPLRowIndex = null;
              this.TableRowPL = data.Result.PersonalDetails;
              if(data.Result.PersonalDetails[0].LiabilityOccupationId!=null && data.Result.PersonalDetails[0].LiabilityOccupationId!='') this.productItem.LiabilityOccupationId = data.Result[0].LiabilityOccupationId;
              else this.productItem.LiabilityOccupationId = null;
              for(let entry of this.TableRowPL){
                entry['Name'] = entry?.PersonName;
                entry['SumInsured'] = entry?.Salary;
                entry['Nationality'] = entry?.NationalityId;
               // if(entry.RiskId) this.onChangeContentLocation(entry);
              }
             // this.getOccupationList('36','PersonalLiability');
              //this.editsections('PersonalLiability');
            }
            else{this.productItem.LiabilityOccupationId = null;this.productItem.PersonalIntermediarySuminsured='0';this.productItem.EmpLiabilitySi=null; 
            // this.getOccupationList('36','PersonalLiability');
            // this.editsections('PersonalLiability');
            }
          }
          this.newselectedIndex+=1;
         // this.editsections(type);
        },
        (err) => { },
      );
    }

    getPersonalAccidentDetailsAlt(){
      let ReqObj = {
        "RequestReferenceNo": this.quoteRefNo,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "SectionId":  "138"
      }
      let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            if(data.Result.PersonalDetails){
              this.TableRowPA = data.Result.PersonalDetails;
              
              this.currentPARowIndex = null;
              //if(data.Result[0].OccupationType!=null)this.productItem.OccupationType = data.Result[0].OccupationType;
              //else this.productItem.OccupationType = null;
              //this.productItem.otheroptionPer=data.Result[0].OtherOccupation;
              for(let entry of this.TableRowPA){
                entry['Name'] = entry?.PersonName;
                entry['SumInsured'] = entry?.Salary;
                entry['Nationality'] = entry?.NationalityId;
               // if(entry.RiskId) this.onChangeContentLocation(entry);
              }
             // this.getOccupationList('35','PersonalAccident');
              //this.onoccChangepersonal('Direct');
              let entry = data?.Result[0];
                // if(entry.EndorsementDate){
                //   this.endorsementDate = entry?.EndorsementDate;
                //   this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                //   this.endorsementRemarks = entry?.EndorsementRemarks;
                //   this.endorsementType = entry?.EndorsementType;
                //   this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                //   this.endtCategoryDesc = entry?.EndtCategoryDesc;
                //   this.endtCount = entry?.EndtCount;
                //   this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                //   this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                //   this.endtStatus = entry?.EndtStatus;
                //   this.isFinanceEndt = entry?.IsFinanceEndt;
                //   this.orginalPolicyNo = entry?.OrginalPolicyNo;
                // }
            }
            else{this.productItem.OccupationType = null; this.productItem.PersonalAccidentSuminsured=null;
           // this.getOccupationList('35','PersonalAccident');
          }
          // this.editsections(type);
          //   //this.onoccChangepersonal('Direct');
            //  this.newselectedIndex+=1;
          
          }
             
        },
        (err) => { },
      );
    }
 checkMandatory(){
 
 }
}