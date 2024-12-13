import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { ProductData } from '../models/product';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
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
import { LocationDetails } from '../models/additionalDetails/locationdetails';
import { HttpClient } from '@angular/common/http';
import { Building } from '../models/Building';
import { HealthInsurance } from '../models/HealthInsurance';
import { findIndex } from 'rxjs';
import { ProfessionalIndemnity } from '../models/ProfessionalIntermnity';
import { ContentProfessionalIndermity } from '../models/ContentProfessional';
import { ElectronicEquipmentNew } from '../models/ElectronicEquipmentNew';
import { DomesticServant } from '../models/DomesticServant';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-Riskdetails',
  templateUrl: './Riskdetails.component.html',
  styleUrls: ['./Riskdetails.component.scss']
})
export class RiskDetailsComponent {
  BuildingSuminsured:any=10;tabIndex:any=0;
        sidebarVisible:boolean = false;Buildings: any;fields9:any[]=[];
        requestReferenceNo: any;fields8:any[]=[];fieldsGroupPa: any=null;currentRelationIndex:any;
        wallMaterialList:any[]=[];roofMaterialList:any[]=[];public productItem: ProductData = null
        loginId:any=null;machineries:any[]=[];fields: any[] = [];BuildingUsageList:any[]=[];
        userDetails:any=null;insuranceId:any=null;productId:any=null;TypeOfPropertyss:any[]=[];
        userType:any=null;branchCode:any=null;quoteNo:any=null;chassisNo:any=null;constructionTypes:any[]=[];
        quoteRefNo:any=null;Section:boolean=false;buildingDetailsSection:boolean=false;
        newten:boolean=false;minDate:any=null;maxDate:any=null;accessoriesType:any=null;
        endorsementSection:boolean=false;orgPolicyNo:any=null;endorsementId:any=null;actualAssSI:any=null;
        enableFieldsList:any[]=[];enableAllSection:any=null;endorsePolicyNo:any=null;totalAccessoriesSI:any='0';
        endorseCategory:any=null;endorsementName:any=null;newacc:any=null;serialNoDesc:any=null;sectionDetails:any=null;
        employeeOccupationList:any[]=[];actualAccessoriesSI:any=null;SumInsured:any=null;enableAccessoriesEditSection:boolean=false;
        accessoriesList:any[]=[];currentAccessoriesIndex:any=null;editAccessoriesSection:boolean=false;ChassisList:any[]=[];
        totalAccSIError:any=null;AccLists:any[]=[];CoverList:any[]=[];sumInsuredDetails:any=null;item:any[]=[];
        public AppConfig: any = (Mydatas as any).default;
          public ApiUrl1: any = this.AppConfig.ApiUrl1;
          public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
          public motorApiUrl: any = this.AppConfig.MotorApiUrl;
        contentId: null;buildingSection: boolean = false;fieldsEmployee:any[]=[];fields1:any[]=[];
        fields2:any[]=[]; fields3:any[]=[];fields4:any[]=[];orginalPolicyNo: any = null;exchangeRate:any=null;pAOccupationError:boolean=false;
        quoteDetails:any=null;Riskdetails:any=null;customerDetails:any;building:any[]=[];plOccupationId:any='';pAOccupationId:any='';
        agencyCode:any=null;applicationId:any=null;issuerSection:boolean=false; customerName: any;plOccupationError:boolean=false;
        accessoriesSection: boolean=false;currentBuildingIndex:any=null;fieldsRisk:any[]=[];CyberItem:any[]=[];
        editBuildingSection:boolean=false;enableBuildingEditSection:boolean=false;fieldsDevice:any[]=[];fieldsElectronic:any[]=[];
        actualFidelitySI: any=null;actualMachinerySI: any=null;actualEmployeeSI: any=null;actualElectronicIntSI: any=null;actualPersonalIntSI: any=null;actualPersonalAccSI: any=null;EquipmentSi: any=null;actualAllRiskSI: any=null;actualContentSI: any=null;actualBuildingSI: any=null;liabilityOccupationId: any;
        liabilityOccupation: any=null;accidentOccupationId: any=null;accidentOccupation: any=null;currencyValue: any=null;
        six:boolean=false;ElectronicList:any[]=[];allriskList:any[]=[];fieldsMachinery:any[]=[];CyperList:any[]=[];
        formSection: boolean=false;viewSection: boolean=false; form = new FormGroup({});field:any[]=[];
        cyberSectionId: any=null;ten: boolean=false;sumInsured:boolean=false; editContentSection: boolean;
        fieldss:any[]=[];first:boolean=false;fieldsContent:any[]=[];eight:boolean=false;questionSection:boolean=false;
        fieldsPersonalAccident: any;second:boolean=false;third:boolean=false;fieldFEFields:any[]=[];
        contentRiskDesc: any=''; dropList:any[]=[];endorsementDetails: any=null;countryList:any[]=[];
        fifth: boolean=false;seven:boolean=false;fieldsEmpFields:any[]=[];selectedTab: any = 0;
        promocode:any=null;  customerCode: any=null;relationList:any[]=[];
        fieldsPersonalInd: any[]=[];monthList: any[]=[];employeeList:any[]=[]; Cotentrisk: any[] = [];
        SectionId: any=null;fidelityList: any[]=[];originalFidelityList: any[];contentRiskSection: boolean=false;
        currentContentIndex: number;enableContentEditSection:boolean = false;LocationId: any;  contentSI: any='0';
        nine: boolean=false;risk: any=null;originalEmployeeList: any[]=[];LocationList:any[]=[];fourth: boolean = false;
        fidelityOccupationList: any[]=[];  occupationList: any[] = []; enableEmployeeUploadSection: boolean=false;
  subuserType: string;selectedIndex:number=0;
  SIColumnHeader:any[]=[];
  endorsementDate: any = null; endorsementEffectiveDate: any = null;brokerCode:any=null;
  endorsementType: any = null; endorsementRemarks: any = null;
  endorsementTypeDesc: any = null; endtCategoryDesc: any = null;
  endtCount: any = null; endtPrevPolicyNo: any = null;
  endtStatus: any = null; endtPrevQuoteNo: any = null; isFinanceEndt: any = null;
  IndustryId: string;policyStartDate: any;sectionDropdownList:any[]=[];
  policyEndDate: any;currencyCode: any; currentStatus: any="Y";GroupListNew: any[]=[];brokerbranchCode: any;tab:FormlyFieldTabs=new FormlyFieldTabs();
  commonDetails: any;uwQuestionList: any[] = [];listSectionGroup: boolean;
  listnGroup: boolean;CustomerReferenceNo: any;endorseEffectiveDate: any;endorseCoverModification: any=null;
  NewSection: any;  dobminDate: Date;newselectedIndex: number;ProfessionalTypes:any[]=[];IndimnityTypes:any[]=[];
  nextslide: boolean= false;nextslide1:boolean = false; nextslide2:boolean = false; nextslide3:boolean=false;
  nextslide4:boolean = false; ProductCode:any="68";
  showSection: boolean =false;showsection: boolean = false;Building: boolean = false;Content: boolean = false;AllRisk: boolean = false;
  Building1: boolean = false;PersonalAccident: boolean = false;personalIndemity: boolean = false;sectionCount: number;currentContentRowIndex=null;
  currentBuildingRowIndex=null;coversreuired: any;commonSectionList: any;
  noOfDays: number;visible: boolean = false;visibleBuilding: boolean = false;columnHeader: any;buildingEditSection:boolean=false;
  TableRow: any[];Total: any;columnHeaderBuilding: string[];TableRowBuilding:any[]= [];
  fieldsBuilding: FormlyFieldConfig<import("@ngx-formly/core").FormlyFieldProps & { [additionalProperties: string]: any; }>;
  columnHeaderAllRisk: string[];TableRowAllRisk: any[]= [];visibleAllRisk: boolean=false;
  currentAllRiskRowIndex =null;getLocationName: any;LocationName: any[]=[];contentSection: boolean;buildingColumnHeader: any[];
  locationList: any[]=[];personalLiabilityDialog: boolean=false;LocationHeader:any[]=[]
  columnHeaderPersonalLiability:any[]=[];currentPLRowIndex:any=0;TableRowPL:any[]=[];
  personalAccidentDialog: boolean=false;columnHeaderPersonalAccident:any[]=[];
  TableRowPA: any[]=[];countryId:any=null;currentPARowIndex: any=0;ElecEquipment: boolean=false;
  fields6: any[]=[];electronicEquipDialog: boolean=false;currentEERiskRowIndex:any=null;
  TableRowEE: any[]=[];DomesticServant: boolean=false;currentDSRowIndex: any=null;TableRowDS: any[]=[];
  fields7: any[]=[];locationIndex:any=0;domesticServantDialog: boolean;bankList: any[]=[];
  servantTypeList: any[]=[];lang:any=null;
  coversRequired:any='C';BuildingOwnerYn:any ='N'
        constructor(private router: Router,private datePipe:DatePipe,private translate: TranslateService,
          private appComp: AppComponent,private sharedService: SharedService,public http: HttpClient) {
         let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails') || '{}');
         this.coversreuired=sessionStorage.getItem('coversRequired');
         this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
         this.insuranceId = this.userDetails.Result.InsuranceId;
         this.loginId = this.userDetails.Result.LoginId;
         this.productId = this.userDetails.Result.ProductId;
         this.userType = this.userDetails?.Result?.UserType;
         this.branchCode = this.userDetails.Result.BranchCode;
         this.agencyCode = this.userDetails.Result.OaCode;
         this.countryId = this.userDetails.Result.CountryId;
         this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
         this.branchCode = this.userDetails.Result.BranchCode;
         this.quoteNo = sessionStorage.getItem('quoteNo');
         this.productItem = new ProductData();
         let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceNo) {
            this.quoteRefNo = referenceNo;
            this.Section = false;
          }
          if(this.productId=='5' || this.productId=='29'){
            this.buildingDetailsSection=false;
          }
          else if(this.productId!='43'){
            this.buildingDetailsSection=true;
            // let items = this.item?.find((Code) => Code == '1' || Code=='40');
            // console.log('JJJJJJJJJJJJJJJJJJ',items);
          }
          if(this.productId=='43'){
            this.newten = true;
          }
          this.currencyCode = this.userDetails.Result.CurrencyId;
          let referenceo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceo) {
            this.requestReferenceNo = referenceo;
          }
          this.buildingColumnHeader =['Location','Address','Delete']
          this.LocationHeader = ['LocationName','Delete']
          this.SIColumnHeader=['Location','Building SI','Content SI','All Risk SI','Personal Liability SI','Personal Accident SI','Domestic Servant SI']
          
        }
        ngOnInit() {
          
          let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          //this.fourth=false;
          if (referenceNo) {
            this.quoteRefNo = referenceNo;
            this.Section = false;
          }
         var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          this.minDate = new Date(year-18,month,day-1);
          this.getdropList();
          this.getCountryList();
          this.contentSection=true;this.getAddInfo()
          this.buildingColumnHeader =['Location','Address','Delete']
          this.columnHeader =['Location *','Content Type *','Serial No','Description','Sum Insured *','Edit' ,'Delete']
          this.TableRow =[{
            LocationName:'',
            id:1,
            ItemId: '',
            Content: '',
            SerialNoDesc : '',
            ContentRiskDesc: '',
            SumInsured: 0,
          }]
          this.columnHeaderPersonalLiability =['Location *','Occupation *','Name *','Date Of Birth *','Salary *','Edit' ,'Delete'];
          this.columnHeaderPersonalAccident =['Location *','Occupation *','Name *','Date Of Birth *','Salary *','Edit' ,'Delete'];
          this.columnHeaderBuilding =['Construction (Wall)','Construction (Roof)','First Loss Payee','Sum Insured']
          this.TableRowBuilding =[{
            id:1,
            BuildingUsageId: '',
            BuildingBuildYear : '',
            BuildingAddress : '',
            FirstLossPayee: '',
            WallType: '',
            RoofType: '',
            BuildingSumInsured: 0,
            //LocationName: '',
          }]
          this.columnHeaderAllRisk =['Location','Content Type','Serial No','Description','Sum Insured','Edit' ,'Delete']
          this.TableRowAllRisk =[{
            id:1,
            ItemId:'',
            Content: '',
            Serial : '',
            Description: '',
            SumInsured: 0,
          }];
          this.TableRowEE =[{
            id:1,
            ItemId:'',
            Content: '',
            Serial : '',
            Description: '',
            SumInsured: 0,
          }];
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
            this.currentContentRowIndex = 0;
            this.currentBuildingRowIndex = 0;
            this.currentAllRiskRowIndex = 0;
            this.currentEERiskRowIndex = 0;
            this.currentDSRowIndex = 0;
            this.sumInsured =false;

            this.productItem = new ProductData();
            if(this.requestReferenceNo!=null && this.productId=='59'){
              this.getLocationDetails();
            }
            else if(this.productId=='59'){
              let details = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
              if(details){
                this.editsections('Content');this.editsections('Building');this.editsections('ElectronicEquipment');
                this.editsections('AllRisk');this.editsections('PersonalLiability'); this.editsections('PersonalAccident');
                this.editsections('DomesticServant');
                // let sectionIDs:any[] = details[0].SectionId;
                  // this.Content = sectionIDs.some(ele=>ele=='47');
                  // if(this.Content) 
                  // this.Building1 = sectionIDs.some(ele=>ele=='1');
                  // if(this.Building1) 
                  // this.ElecEquipment = sectionIDs.some(ele=>ele=='76');
                  // if(this.ElecEquipment) 
                  // this.AllRisk = sectionIDs.some(ele=>ele=='3');
                  // if(this.AllRisk) 
                  // this.personalIndemity = sectionIDs.some(ele=>ele=='35');
                  // if(this.personalIndemity) 
                  // this.PersonalAccident = sectionIDs.some(ele=>ele=='36');
                  // if(this.PersonalAccident) 
                  // this.DomesticServant = sectionIDs.some(ele=>ele=='106');
                  // if(this.DomesticServant) 
              }
            }
            if(this.productId=='19'){
              this.getSectionList();
              this.setSMEForm();
            }
            if(this.productId=='63'){
              if(this.requestReferenceNo){
                this.getLocationDetails();
              }
              else{
                this.LocationName = [
                  {"OriginalRiskId":null,"LocationId":"1","LocationName":"","BuildingType":null,"BuildingSI":null,"ContentSI":null,'AllRiskSI':null,
                    "ServantList":[{"ServantType":null,'ServantCount':null,'ServantSI':null}],
                    "PAList":[{'RelationType':null,'DeathSI':null}],
                    'PersonalLiabilitySI':null,'ServantType':null,'ServantCount':null,'ServantSI':null,'RelationType':null,'DeathSI':null}
                ]
              }
              this.getConstructionTypeList();
              this.getDomesticServantList();
              this.getRelationShipList();
            }
            if(this.productId=='24'){
              this.getCommonDetails();
              this.getSectionList();
              this.getContentDetails('Content');
              this.getAllRiskDetails('AllRisk');
            }

            if(this.productId=='57'){
              //let fireData = new EmployersLiability();
              let fireData = new GroupPersonalAccident();
              let entry = [];
              let fields:any = fireData?.fields;
              console.log('Fieldssssssssss',fields);
              //fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
             
             
              this.fieldsGroupPa = fields;
              let referenceNo = sessionStorage.getItem('quoteReferenceNo');
              if (referenceNo) {
                this.requestReferenceNo = referenceNo;
                this.getSectionList();
                this.setCommonFormValues();
                this.productItem = new ProductData();
               
              }
              else {
                this.getSectionList();
                  this.productItem = new ProductData();
                  this.formSection = true; this.viewSection = false;
              }
            }

            if(this.productId=='56'){
              let referenceNo = sessionStorage.getItem('quoteReferenceNo');
              if (referenceNo) {
                this.requestReferenceNo = referenceNo;
                this.getCommonnDetails();
                this.getSectionList();
                this.getCommonDetails();
              }
              else{
            
                this.AddNewFunc();
                this.getSectionList();
                    this.getCommonDetails();
                    // this.productItem.patientList = [
                    //   {
                    //     "CreatedBy": this.loginId,
                    //     "RiskId": null,
                    //     "RelationType": '1',
                    //     "RelationTypeDesc": null,
                    //     "DateOfBirth": null
                    //   }
                    // ]
                    this.getSectionList();
                    this.getRelationTypeList('direct');
                    this.formSection = true; this.viewSection = false;
                    this.showSection=true;
              }
            }
            if(this.productId=='60'){
            // this.getEditDetails();
           this.getCommonDetails();
           this.getdetails();
           this.getProfessional();

            }
           
            //this.editsections();

            
            this.Buildings=sessionStorage.getItem('Buildings');
            this.formSection = true; this.viewSection = false;
          if(this.productId!='14' && this.productId!='32') 
        //   this.getOccupationList(null);
        //   this.getEditQuoteDetails();
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
          this.minDate = new Date(year-18,month,day-1);
          this.maxDate = new Date();
          
          if(sessionStorage.getItem('endorsePolicyNo')){
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if(endorseObj){
              this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
              this.endorsementId = endorseObj.EndtTypeId;
              this.enableFieldsList = endorseObj.FieldsAllowed;
              let enableAllSection = this.enableFieldsList.some(ele=>ele=='domesticRiskDetails' || ele=='AddCovers' || ele=='AccessoriesSI');
              if(enableAllSection) this.enableAllSection=true;
              else this.enableAllSection = false;
              this.endorsePolicyNo = endorseObj?.PolicyNo;
              this.endorseCategory = endorseObj.Category;
              this.endorsementName = endorseObj?.EndtName;
              // if(this.endorsementId!=42 && this.endorsementId!=842){
              //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
              // }
            }
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
          this.getUWDetails();
          //this.getSumInsuredDetails();
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
        getLocationDetails(){
          let ReqObj={
            "RequestReferenceNo": this.requestReferenceNo
          }
          let urlLink = `${this.motorApiUrl}api/slide/GetNonMotor`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if(data.Result){
                  let details = data.Result;
                  let locationList = [];
                  if(details.LocationList) locationList = details.LocationList;
                  if(locationList.length!=0) {
                      if(this.productId=='63'){
                        this.LocationName = [];
                        let i =0;
                        for(let entry of locationList){
                            let obj = {
                                "LocationId":entry.LocationId,"LocationName":entry.LocationName,
                                "BuildingAddress":entry.Address
                            }
                            let subDetails = entry.SectionList;
                            // if(entry.AssesListDetails) subDetails = subDetails.concat(entry.AssesListDetails);
                            // if(entry.HumanListDetails) subDetails = subDetails.concat(entry.HumanListDetails);
                           let persAcc = subDetails.filter(ele=>ele['SectionId']=='138')
                            let PAList = [];
                            if(persAcc.length!=0){
                              let i=0;
                              for(let sub of persAcc){
                                  let subEntry = {
                                    "DeathSI":sub['SumInsured '],
                                    'RelationType':sub.RelationType
                                  }
                                  PAList.push(subEntry);
                                  i+=1;
                                  if(i==persAcc.length) obj['PAList'] = PAList;
                              }
                            }
                            else{PAList = [{'RelationType':null,'DeathSI':null}];obj['PAList'] = PAList;}
                            let build = subDetails.filter(ele=>ele['SectionId']=='1')
                            if(build.length!=0){
                              if(build[0]['SumInsured ']){obj['BuildingSI']=String(build[0]['SumInsured ']);this.CommaFormatted(obj,'Building');} 
                              obj['BuildingType']=build[0]['OutbuildConstructType'];obj['OriginalRiskId']=build[0].RiskId  }
                            else{obj['BuildingSI']=null;obj['BuildingType']=null;}
                            let content = subDetails.filter(ele=>ele['SectionId']=='47')
                            if(content.length!=0){obj['ContentSI']=String(content[0]['SumInsured ']);this.CommaFormatted(obj,'Content');obj['OriginalRiskId']=content[0].RiskId  }
                            else{obj['ContentSI']=null;}
                            let allRisk = subDetails.filter(ele=>ele['SectionId']=='3')
                            if(allRisk.length!=0){obj['AllRiskSI']=String(allRisk[0]['SumInsured ']);this.CommaFormatted(obj,'AllRisk');obj['OriginalRiskId']=allRisk[0].RiskId  }
                            else{obj['AllRiskSI']=null;}
                            let domestic = subDetails.filter(ele=>ele['SectionId']=='106')
                            let servantList = [];
                            if(persAcc.length!=0){
                              let i=0;
                              for(let sub of domestic){
                                let subEntry={
                                  "ServantType":sub.DomesticServantType,
                                  "ServantCount": sub.Count,
                                  "ServantSI": sub['SumInsured '] 
                                }
                                servantList.push(subEntry);
                                i+=1;
                                if(i==domestic.length) obj['ServantList'] = servantList;
                              }
                            }
                            else{servantList = [{"ServantType":null,'ServantCount':null,'ServantSI':null}];obj['ServantList']=servantList;}
                            let persLiab = subDetails.filter(ele=>ele['SectionId']=='139')
                            if(persLiab.length!=0){obj['PersonalLiabilitySI']=String(persLiab[0]['SumInsured ']);this.CommaFormatted(obj,'PL');obj['OriginalRiskId']=persLiab[0].RiskId  }
                            else{obj['PersonalLiabilitySI']=null;}
                            this.LocationName.push(obj);
                            i+=1;
                        }
                      }
                      else if(this.productId=='59'){
                        this.editsections('Content');this.editsections('Building');this.editsections('ElectronicEquipment');
                        this.editsections('AllRisk');this.editsections('PersonalLiability'); this.editsections('PersonalAccident');
                        this.editsections('DomesticServant');
                        let i =0;this.locationList=[];
                        for(let entry of locationList){
                          let obj = {
                            "LocationId":entry.LocationId,"LocationName":entry.LocationName,"CoversRequired":entry?.CoversRequired,"BuildingOwnerYn":entry?.BuildingOwnerYn,
                            "BuildingList":[],"BuildingAddress":entry.Address
                          }
                          let subDetails = entry.SectionList;
                          let buildDetails = subDetails.filter(ele=>ele['SectionId']=='1');
                          if(buildDetails.length!=0){
                            obj['BuildingList']=[]
                            for(let build of buildDetails){
                              let subEntry = {"WallType":build.WallType,"RoofType":build.RoofType,"FirstLossPayee":build.FirstLossPayee,"BuildingSumInsured":build.BuildingSumInsured}
                              obj.BuildingList.push(subEntry);
                            }
                          }
                          else{obj['BuildingList']=[{"WallType":null,"RoofType":null,"FirstLossPayee":null,"BuildingSumInsured":0}]}
                          let contentDetails = subDetails.filter(ele=>ele['SectionId']=='47');
                          if(contentDetails.length!=0){obj['ContentSuminsured']=contentDetails[0].ContentSuminsured;}
                          let AllRiskDetails = subDetails.filter(ele=>ele['SectionId']=='3');
                          if(AllRiskDetails.length!=0){obj['AllriskSuminsured']=AllRiskDetails[0].AllriskSuminsured;}
                          let OwnersDetails = subDetails.filter(ele=>ele['SectionId']=='36');
                          if(OwnersDetails.length!=0){obj['EmpLiabilitySi']=OwnersDetails[0].SumInsured;}
                          let ElecEquipment = subDetails.filter(ele=>ele['SectionId']=='76');
                          if(ElecEquipment.length!=0){obj['ElectronicEquipmentSI']=ElecEquipment[0].SumInsured;}
                          let PADetails = subDetails.filter(ele=>ele['SectionId']=='35');
                          if(PADetails.length!=0){obj['SumInsured']=PADetails[0].SumInsured;obj['OccupationType']=PADetails[0].OccupationType;}
                          this.locationList.push(obj);
                          i+=1;
                          if(i==this.locationList.length){this.onEditDomestic();}
                        }
                      }
                  }
                  else{
                    if(this.productId=='63') this.LocationName = [
                        {"OriginalRiskId":null,"LocationId":"1","LocationName":"","BuildingType":null,"BuildingSI":null,"ContentSI":null,'AllRiskSI':null,
                          "ServantList":[{"ServantType":null,'ServantCount':null,'ServantSI':null}],
                          "PAList":[{'RelationType':null,'DeathSI':null}],
                          'PersonalLiabilitySI':null,'ServantType':null,'ServantCount':null,'ServantSI':null,'RelationType':null,'DeathSI':null}
                      ]
                  }
                }
                else{
                  if(this.productId=='63') this.LocationName = [{"OriginalRiskId":null,"LocationId":"1","LocationName":"","BuildingType":null,"BuildingSI":null,"ContentSI":null,'AllRiskSI':null,
                    "ServantList":[{"ServantType":null,'ServantCount':null,'ServantSI':null}],
                    "PAList":[{'RelationType':null,'DeathSI':null}],  
                    'PersonalLiabilitySI':null,'ServantType':null,'ServantCount':null,'ServantSI':null,'RelationType':null,'DeathSI':null}
                  ];
                }
            })
        }
        onAddRow(type,location){
          if(type=='servant'){
              let entry = {"ServantType":null,'ServantCount':null,'ServantSI':null};
              location.ServantList.push(entry);
          }
          else if(type=='PA'){
            let entry = {'RelationType':null,'DeathSI':null};
            location.PAList.push(entry);
          }
        }
        deleteRow(location,index,type){
          if(type=='servant'){location.ServantList.splice(index,1)}
          else if(type=='PA'){location.PAList.splice(index,1)}
        }
        onEditDomestic(){
          let entry = this.locationList[this.tabIndex];
          this.productItem=new ProductData();
          if(entry.CoversRequired==null || entry.CoversRequired==undefined) entry.CoversRequired = 'BC';
          if(entry.BuildingOwnerYn==null || entry.BuildingOwnerYn==undefined) entry.BuildingOwnerYn = 'Y';
          if(entry.ContentSuminsured) this.productItem.ContentSuminsured = entry.ContentSuminsured;
          if(entry.AllriskSuminsured) this.productItem.AllriskSumInsured = entry.AllriskSuminsured;
          if(entry.ElectronicEquipmentSI) this.productItem.ElectronicEquipmentSI = entry.ElectronicEquipmentSI;
          if(entry.EmpLiabilitySi) this.productItem.EmpLiabilitySi = entry.EmpLiabilitySi;
          if(entry.SumInsured){this.productItem.PersonalAccidentSuminsured=entry.SumInsured;this.productItem.OccupationType=entry.OccupationType}
          
        }
        checkLocationDetail(){
          if(this.LocationName.length!=0){
            return (this.LocationName[0].LocationName!='');
          }
          else return true;
        }
        checkLocationDetailAlt(){
          if(this.locationList.length!=0){
            return (this.locationList[0].LocationName!=''  && this.locationList[0].BuildingAddress!='' && this.locationList[0].LocationName!=null && this.locationList[0].LocationName!=undefined && this.locationList[0].BuildingAddress!=null);
          }
          else return false;
        }
        getConstructionTypeList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "ItemType": "wall_type"
          }
          let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
              this.constructionTypes = defaultObj.concat(data.Result);
            })
        }
        getDomesticServantList(){
          let ReqObj = {
            "InsuranceId": this.insuranceId,
            "ItemType": "Servant TYPE"
          }
          let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
              this.servantTypeList = defaultObj.concat(data.Result);
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
              let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': null }]
              this.relationList = defaultObj.concat(data.Result);
            })
        }
        // getPLTotal(){
        //   this.Total = 0;let i=0;
        //   if(this.TableRowPL.length!=0){
        //     for(let tot of this.TableRowPL){
        //       if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
        //       i+=1;
        //       if(i==this.TableRowPL.length){
        //         this.productItem.EmpLiabilitySi = this.Total;
        //         if(this.fields3.length!=0){
        //           let fieldList = this.fields3[0].fieldGroup[0].fieldGroup;
        //           for(let field of fieldList){
        //             if(field.key=='EmpLiabilitySi'){
        //               //field.props.disabled = false;
        //               if(field.formControl) field.formControl.setValue(this.Total);
        //              // field.props.disabled = true;
        //             }
        //             else if(field.key=='LiabilityOccupationId'){
        //               if(field.formControl) field.formControl.setValue(this.plOccupationId);
        //             }
        //           }
        //         }
        //         return this.Total;
        //       }
        //     }
        //   }
        //   else return 0;
        // }
        // getDSTotal(){
        //   this.Total = 0;let i=0;
        //   if(this.TableRowDS.length!=0){
        //     for(let tot of this.TableRowDS){
        //       if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
        //       i+=1;
        //       if(i==this.TableRowDS.length){
        //         this.productItem.DomesticServantSi = this.Total;
        //         if(this.fields7.length!=0){
        //           let fieldList = this.fields7[0].fieldGroup[0].fieldGroup;
        //           for(let field of fieldList){
        //             if(field.key=='DomesticServantSi'){
        //               field.props.disabled = false;
        //               if(field.formControl) field.formControl.setValue(this.Total);
        //               field.props.disabled = true;
        //             }
        //             // else if(field.key=='LiabilityOccupationId'){
        //             //   if(field.formControl) field.formControl.setValue(this.plOccupationId);
        //             // }
        //           }
        //         }
        //         return this.Total;
        //       }
        //     }
        //   }
        //   else return 0;
        // }
        // getPATotal(){
        //   this.Total = 0;let i=0;
        //   if(this.TableRowPA.length!=0){
        //     for(let tot of this.TableRowPA){
        //       if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
        //       i+=1;
        //       if(i==this.TableRowPA.length){
        //         this.productItem.PersonalAccidentSuminsured = this.Total;
        //         if(this.fields4.length!=0){
        //           let fieldList = this.fields4[0].fieldGroup[0].fieldGroup;
        //           for(let field of fieldList){
        //             if(field.key=='PersonalAccidentSuminsured'){
        //                 field.props.disabled = false;
        //                 if(field.formControl) field.formControl.setValue(this.Total);
        //                 field.props.disabled = true;
        //             }
        //             else if(field.key=='OccupationType'){
        //               if(field.formControl) field.formControl.setValue(this.pAOccupationId);
        //             }
        //           }
        //         }
        //         return this.Total;
        //       }
        //     }
        //   }
        //   else return 0;
        // }
        getProductLocation(entry){
          if(entry!='' && entry!=null) return this.locationList.find(ele=>ele.RiskId==entry.RiskId)?.LocationName
          else return '';
        }
        onEditBuilding(index){
          this.currentBuildingIndex = index;
          this.editBuildingSection = true;
          this.enableBuildingEditSection = true;
          this.productItem.LocationAddress = this.building[index].BuildingAddress;
          this.productItem.LocationNameBuilding = this.building[index].LocationName;
          this.productItem.BuildingSumInsureds = this.building[index].BuildingSuminsured;
          // this.LocationName = this.building[index].LocationName;
          // this.BuildingAddress = this.building[index].BuildingAddress;
          // this.BuildingSuminsured = this.building[index].BuildingSuminsured;
          this.individualCommaFormatted('building');
        }
        checkBuildingDetails(){
          if(this.TableRowBuilding.length!=0){
            if((this.coversreuired=='B' || this.coversreuired=='BC') && this.Building1)  return this.TableRowBuilding.some(ele=>ele.RoofType==null || ele.RoofType=='' || ele.RoofType==undefined || ele.LocationName==undefined || ele.LocationName=='' || ele.LocationName==null);
            else 
            return  !this.TableRowBuilding.some(ele=>ele.RiskId==null || ele.RiskId=='' || ele.RiskId==undefined || ele.LocationName==undefined || ele.LocationName=='' || ele.LocationName==null);
          }
          else return false;
        }
        checkLocationDetails(){
          if(this.locationList.length==1){return this.locationList.some(ele=>ele.BuildingAddress==null || ele.BuildingAddress=='' || ele.BuildingAddress==undefined || ele.LocationName==undefined || ele.LocationName=='' || ele.LocationName==null);}
          else return !(this.locationList.length>1)
        }
        showDialog() {
          console.log("Building",this.TableRowBuilding)
          
          if(!((this.coversreuired=='B' || this.coversreuired=='BC') && this.Building1)){
              if(this.locationList.length==0 || this.checkLocationDetails()){
                Swal.fire({
                  title: '<strong>Error</strong>',
                  icon: 'info',
                  html:
                    `<ul class="list-group errorlist">
                      <li>Please Add Location Details First</li>
                  </ul>`,
                   showCloseButton: false,
                  //focusConfirm: false,
                  // showCancelButton:true,
            
                  //confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Ok',
                })
              }
              else{
                this.visible = true;
                this.getContentDetail();}
          }
          else if(!this.checkBuildingDetails()){
            this.visible = true;
            this.getContentDetail();
          }
         
      }
      showDialogBuilding() {
        if((this.coversreuired=='B' || this.coversreuired=='BC') && this.Building1){
          if(this.locationList.length==0 || this.checkLocationDetails()){
            Swal.fire({
              title: '<strong>Error</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                  <li>Please Add Location Details First</li>
              </ul>`,
               showCloseButton: false,
              //focusConfirm: false,
              // showCancelButton:true,
        
              //confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Ok',
            })
          }
          else{ this.getBuildingDetails('direct');
            this.visibleBuilding = true;}
      }
      else if(this.TableRowBuilding.length!=0 && !this.checkBuildingDetails()){
        this.visibleBuilding = true;
        this.getBuildingDetails('direct');
      }
       
    }
    addLocation(){
      let entry={"LocationId":null,"LocationName":"","BuildingType":null,"BuildingSI":null,"ContentSI":null,'AllRiskSI':null,
        'PersonalLiabilitySI':null,'ServantType':null,'ServantCount':null,'ServantSI':null,'RelationType':null,'DeathSI':null};
      this.LocationName.push(entry);
    }
    onDeleteLocation(index){
      this.LocationName.splice(index,1);
    }
    onEditLocationDetails(listData){
      if(listData.length!=0){
        this.locationList = listData;
        if(this.locationList.some(ele=>ele.LocationName==null || ele.LocationName==undefined))  this.buildingEditSection = true;
        else this.buildingEditSection = false;
        this.locationIndex=null;
      }
      else{this.buildingEditSection = true; if(this.locationList.length==0)this.onAddLocationDetails(); }
    }
    deleteLocation(index){this.locationList.splice(index,1);if(this.locationList.length==0)this.onAddLocationDetails()}
    onAddLocationDetails(){this.locationList.push({"RiskId":String(this.locationList.length+1),"LocationName":null,"BuildingAddress":null,"CoversRequired":'C',"BuildingOwnerYn":'N',"BuildingList":[{"WallType":null,"RoofType":null,"FirstLossPayee":null,"BuildingSumInsured":0}]});this.locationIndex= this.locationList.length-1}
    onSaveLocationDetails(){
      if(this.locationList.length!=0){
        let i=0,j=0,reqList=[];
        for(let entry of this.locationList){
          if(entry.LocationName==null || entry.LocationName=='' || entry.LocationName==undefined){j+=1;entry['LocationNameError']=true;}
          else{entry['LocationNameError']=false}
          if(entry.BuildingAddress==null || entry.BuildingAddress=='' || entry.BuildingAddress==undefined){j+=1;entry['BuildingAddressError']=true;}
          else{entry['BuildingAddressError']=false}
          let Obj={
            "BuildingSuminsured":'0',
            "BuildingAddress": entry.BuildingAddress,
            "Createdby": this.loginId,
            "LocationId": entry.RiskId,
            "InbuildConstructType":"W",
            "QuoteNo":sessionStorage.getItem('quoteNo'),
            "RequestReferenceNo":this.quoteRefNo,
            "SectionId": '1',
            "LocationName":entry.LocationName,
          }
          reqList.push(Obj)
          i+=1;
          if(i==this.locationList.length && j==0){
            let urlLink = `${this.motorApiUrl}api/buildingdetails`;
            this.sharedService.onPostMethodSync(urlLink, reqList).subscribe(
              (data: any) => {
                console.log(data);
                let res: any = data;
                if (data.ErrorMessage.length != 0) {
                }
                else{this.buildingEditSection=false;this.locationIndex=null}
              });
          }
        }
      }
    }
    onCancelLocation(type){
      if(this.TableRowBuilding.length!=0){this.buildingEditSection=!this.buildingEditSection;this.locationList=this.TableRowBuilding}
      else if(type=='content'){this.visible=false;}
    }
    showFinalDialogAllRisk(type){
      if(type=='AR'){
        this.visibleAllRisk = true;
        this.getallriskDetailsData();
      }   
      else if(type=='PL'){
        this.personalLiabilityDialog = true;
        this.plOccupationError = false;
        this.getPersonalLiabilityDetails('PersonalLiability');
      }
      else if(type=='PA'){
        this.personalAccidentDialog = true;
        this.getPersonalAccidentDetails('PersonalAccident');
      }
      else if(type=='EE'){
        this.electronicEquipDialog = true;
        this.getElectronicEquipDetails('ElectronicEquipment');
      }
      else if(type=='DS'){
        this.domesticServantDialog = true;
        this.getDomesticServantDetails('DomesticServant');
      }
    }
    showDialogAllRisk(type) { 
      if(((this.coversreuired=='B' || this.coversreuired=='BC') && this.Building1) && this.checkBuildingDetails()){
        Swal.fire({
          title: '<strong>Error</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
              <li>Please Add Building Details First</li>
          </ul>`,
            showCloseButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Ok',
        })
      }
      else if(!((this.coversreuired=='B' || this.coversreuired=='BC') && this.Building1)){
        if(this.locationList.length==0 || this.checkLocationDetails()){
          Swal.fire({
            title: '<strong>Error</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
                <li>Please Add Location Details First</li>
            </ul>`,
             showCloseButton: false,
            //focusConfirm: false,
            // showCancelButton:true,
      
            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Ok',
          })
        }
        else this.showFinalDialogAllRisk(type);
      }
      else{
        this.showFinalDialogAllRisk(type);
      }
    }
    addRow() {
        const newItem = { id: this.TableRow.length + 1,RiskId:'', Content: '', SerialNoDesc: '',ContentRiskDesc:'',SumInsured:0,LocationName:'' };
        this.TableRow.push(newItem);
        this.currentContentRowIndex = this.TableRow.length-1;
    }
    onChangeContentLocation(entry){
      if(entry.RiskId) entry['LocationName'] = this.locationList.find(ele=>ele.RiskId==entry.RiskId)?.LocationName;
    }
    onChangeFirstLoss(entry){
    }
    getOccupationName(entry){
      if(entry?.OccupationId){return this.occupationList.find(ele=>ele.Code==entry.OccupationId)?.CodeDesc}
      else return '';
    }
    getNationalityDesc(entry){
      if(entry?.Nationality){return this.countryList.find(ele=>ele.Code==entry.Nationality)?.CodeDesc}
      else return '';
    }
    deleteProduct(index) {
      this.TableRow.splice(index,1);
      if(this.TableRow.length==0){
        this.onSaveContentRisk('deleteSave');
      }
    }
    addRowPL(){
      const newItem = {  id: this.TableRowPL.length + 1,RiskId:'',Name: '',Nationality:this.countryId,Dob: '',SerialNo : '',SumInsured: 0};
      this.TableRowPL.push(newItem);
      this.currentPLRowIndex = this.TableRowPL.length-1;
    }
    addRowDS(){
      const newItem = {  id: this.TableRowDS.length + 1,RiskId:'',Name: '',Nationality:this.countryId,Dob: '',SerialNo : '',SumInsured: 0};
      this.TableRowDS.push(newItem);
      this.currentDSRowIndex = this.TableRowDS.length-1;
    }
    deleteProductPL(index) {
      this.TableRowPL.splice(index,1);
      if(this.TableRowPL.length==0){
        this.onSavePL('deleteSave','PL');
      }
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
    addRowAllRisk(){
      const newItem = {  id: this.TableRowAllRisk.length + 1,RiskId:'',ItemId: '', Content: '', Serial: '',Description:'',SumInsured:0,};
      this.TableRowAllRisk.push(newItem);
      this.currentAllRiskRowIndex = this.TableRowAllRisk.length-1;
    }
    deleteProductAllRisk(index) {
      this.TableRowAllRisk.splice(index,1);
      if(this.TableRowAllRisk.length==0){
        this.onSaveAllRisk('deleteSave');
      }
    }
    addRowEE(){
      const newItem = {  id: this.TableRowEE.length + 1,RiskId:'',ItemId: '', Content: '', Serial: '',Description:'',SumInsured:0,};
      this.TableRowEE.push(newItem);
      this.currentEERiskRowIndex = this.TableRowEE.length-1;
    }
    deleteProductEE(index) {
      this.TableRowEE.splice(index,1);
      if(this.TableRowEE.length==0){
        this.onSaveElectronicEquipment('deleteSave');
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
          if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
            else{ j+=1; entry['LocationNameError']=true;}
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
              "RiskId": entry.RiskId,
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
      if(section=='PL') sectionID='36';
      else sectionID='106';
      let  ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": sectionID,
        "Description": "Accident Details",
        "Type":'PI',
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
    onSavePA(type){
      if (this.TableRowPA.length != 0) {
        let i=0,j=0, reqList =[];
        for(let entry of this.TableRowPA){
          if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
            else{ j+=1; entry['LocationNameError']=true;}
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
              "RiskId": entry.RiskId,
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
      "SectionId": "35",
      "Description": "Accident Details",
      "Type":'PI',
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
                    this.onChangeContentLocation(entry);
                    entry['Content'] = entry?.ItemValue;
                    entry['Serial'] = entry?.SerialNo;
                    entry['Description'] = entry?.SerialNoDesc;
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
    getTotalAllRisk(){
      this.Total = 0;let i=0;
      if(this.TableRowAllRisk.length!=0){
        for(let tot of this.TableRowAllRisk){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) tot.SumInsured = Number(tot.SumInsured);
          this.Total=this.Total+tot.SumInsured;
          i+=1;
          if(i==this.TableRowAllRisk.length){
            this.productItem.AllriskSumInsured = this.Total;
            if(this.fields2.length!=0){
              let fieldList = this.fields2[0].fieldGroup[0].fieldGroup;
              //console.log("Field Lsit",fieldList)
              for(let field of fieldList){
                // if(field.key=='BuildingBuildYear' && this.insuranceId=='100004'){
                //   field.props.options = this.getYearList();
                //   console.log("Building JSON",this.fields)
                // }
                if(field.key=='AllriskSumInsured'){
                    field.templateOptions.disabled = false;
                    if(field.formControl) field.formControl.setValue(this.Total);
                    field.templateOptions.disabled = false;
                }
              }
            }
            return this.Total;
          }
        }
      }
      else{this.productItem.SumInsured =0;return 0;} 
    }
    getTotalEE(){
      this.Total = 0;let i=0;
      if(this.TableRowEE.length!=0){
        for(let tot of this.TableRowEE){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) tot.SumInsured = Number(tot.SumInsured);
          this.Total=this.Total+tot.SumInsured;
          i+=1;
          if(i==this.TableRowEE.length){
            this.productItem.ElectronicEquipmentSI = this.Total;
            if(this.fields6.length!=0){
              let fieldList = this.fields6[0].fieldGroup[0].fieldGroup;
              //console.log("Field Lsit",fieldList)
              for(let field of fieldList){
                // if(field.key=='BuildingBuildYear' && this.insuranceId=='100004'){
                //   field.props.options = this.getYearList();
                //   console.log("Building JSON",this.fields)
                // }
                if(field.key=='ElectronicEquipmentSI'){
                    field.templateOptions.disabled = false;
                    if(field.formControl) field.formControl.setValue(this.Total);
                    field.templateOptions.disabled = false;
                }
              }
            }
            return this.Total;
          }
        }
      }
      else{this.productItem.SumInsured =0;return 0;} 
    }
    addRowBuilding(){
    const newItem = { id: this.TableRowBuilding.length + 1, BuildingUsageId: '', BuildingBuildYear : '',FirstLossPayee: '',SavedYN:'N',
    WallType: '',RoofType: '', BuildingSumInsured: 0,LocationName:'',RiskId:this.TableRowBuilding.length + 1};
    this.TableRowBuilding.push(newItem);
    this.currentBuildingRowIndex = this.TableRowBuilding.length-1;
    console.log("Final Table Row",this.TableRowBuilding)
    }
    onDeleteBuilding(index){
      // if(this.TableRowBuilding[index].SavedYN=='Y'){
      //   Swal.fire({
      //     title: '<strong><i class="fa fa-trash"></i>&nbsp;Delete</strong>',
      //     icon: 'error',
      //     html:
      //       `<ul class="list-group errorlist">
      //        <li>Are You Sure Want to Remove All Details Regarding to this Building?</li>
      //    </ul>`,
      //     showCloseButton: false,
      //     focusConfirm: false,
      //     showCancelButton:true,
  
      //    confirmButtonColor: '#3085d6',
      //    cancelButtonColor: '#d33',
      //    confirmButtonText:"Yes! Delete it",
      //    cancelButtonText: 'No',
      //   }).then((result) => {
      //     if (result.isConfirmed) {
  
      //     } 
      //     else{
            
      //     }
      //   })
      // }
      // else this.TableRowBuilding.splice(index,1);
      this.TableRowBuilding.splice(index,1);
      if(this.TableRowBuilding.length==0){
        this.onSaveBuildingList();
      }
    }
    getTotal(){
      this.Total = 0;let i=0;
      if(this.TableRow.length!=0){
        for(let tot of this.TableRow){
          if(tot.SumInsured!=null && tot.SumInsured!='' && tot.SumInsured!=undefined) this.Total=this.Total+Number(tot.SumInsured);
          i+=1;
          if(i==this.TableRow.length){
            this.productItem.ContentSuminsured = this.Total;
            if(this.fields1.length!=0){
              let fieldList = this.fields1[0].fieldGroup[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='ContentSuminsured'){
                    field.props.disabled = false;
                    if(field.formControl) field.formControl.setValue(this.Total);
                    field.props.disabled = false;
                }
              }
            }
            return this.Total;
          }
        }
      }
      else return 0;
          
    }
    getTotalBuilding(){
      this.Total = 0;let i=0;
      if(this.TableRowBuilding.length!=0 && ((this.coversreuired=='B' || this.coversreuired=='BC') && this.Building1)){
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
      else{this.productItem.BuildingSuminsured = 0;return 0;} 
          
    }
    onSaveElectronicEquipment(type){
      if (this.TableRowEE.length != 0) {
        let i=0,j=0, reqList =[];
        for(let entry of this.TableRowEE){
          if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
            else{ j+=1; entry['LocationNameError']=true;}
            if(entry.ItemId!=null && entry.ItemId!='' && entry.ItemId!=undefined) entry['ContentRiskDescError']=false;
            else{ j+=1; entry['ContentRiskDescError']=true;}
            if(entry.SumInsured!=null   && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
            else{ j+=1; entry['SumInsuredError']=true;}
            if(entry.ItemId!= null && entry.ItemId!='' && entry.ItemId!=undefined) entry['Content']=this.allriskList.find(ele=>ele.Code==entry.ItemId)?.CodeDesc
            let data = {
                "ItemId":entry.ItemId,
                "RiskId":entry.RiskId,
                "ContentRiskDesc":entry.Content,
                "SerialNoDesc": entry.Description,
                "MakeAndModel":"TN123",
                "SerialNo":entry.Serial,
                "ItemValue": entry.Content,
                "SumInsured":entry.SumInsured
            }
            reqList.push(data);
            i+=1;
            if(i==this.TableRowEE.length && j==0){
                this.onFinalSaveAllRisk(reqList,type,'76');
            }
       }
      }
      else this.onFinalSaveAllRisk([],type,'76')
    }
    onSaveAllRisk(type){
      if (this.TableRowAllRisk.length != 0) {
        let i=0,j=0, reqList =[];
        for(let entry of this.TableRowAllRisk){
          if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
            else{ j+=1; entry['LocationNameError']=true;}
            if(entry.ItemId!=null && entry.ItemId!='' && entry.ItemId!=undefined) entry['ContentRiskDescError']=false;
            else{ j+=1; entry['ContentRiskDescError']=true;}
            if(entry.SumInsured!=null   && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
            else{ j+=1; entry['SumInsuredError']=true;}
            if(entry.ItemId!= null && entry.ItemId!='' && entry.ItemId!=undefined) entry['Content']=this.allriskList.find(ele=>ele.Code==entry.ItemId)?.CodeDesc
            let data = {
                "ItemId":entry.ItemId,
                "RiskId":entry.RiskId,
                "ContentRiskDesc":entry.Content,
                "SerialNoDesc": entry.Description,
                "MakeAndModel":"TN123",
                "SerialNo":entry.Serial,
                "ItemValue": entry.Content,
              
                "SumInsured":entry.SumInsured
            }
            reqList.push(data);
            i+=1;
            if(i==this.TableRowAllRisk.length && j==0){
                this.onFinalSaveAllRisk(reqList,type,'3');
            }
       }
      }
      else this.onFinalSaveAllRisk([],type,'3')
    }
    onFinalSaveAllRisk(reqList,Type,sectionId){
      let ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo":sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo":this.quoteRefNo,
        "BranchCode": this.branchCode,
        "SectionId": sectionId,
        "Type":'A',
        "ContentRiskDetails":reqList,
        "Companyid": this.insuranceId,
        "ProductId": this.productId
        }
      let  urlLink = `${this.motorApiUrl}api/savecontentrisk`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {
              if(this.TableRowAllRisk.length!=0 && sectionId=='3'){
                if(this.TableRowAllRisk.length>1 || (this.TableRowAllRisk[0].SumInsured!=null && this.TableRowAllRisk[0].SumInsured!=0)) this.currentAllRiskRowIndex = null;
              }
              else if(this.TableRowEE.length!=0 && sectionId=='76'){
                if(this.TableRowEE.length>1 || (this.TableRowEE[0].SumInsured!=null && this.TableRowEE[0].SumInsured!=0)) this.currentEERiskRowIndex = null;
              }
            }
          }
          else { 
            if(sectionId=='3'){
              if(Type=='direct') this.visibleAllRisk = false; 
              else{
                this.TableRowAllRisk =[{
                  id:1,
                  ItemId:'',
                  Content: '',
                  Serial : '',
                  Description: '',
                  SumInsured: 0,
                }];
                this.currentAllRiskRowIndex = this.TableRowAllRisk.length-1;
              }
            }
            else{
              if(Type=='direct') this.electronicEquipDialog = false; 
              else{
                this.TableRowEE =[{
                  id:1,
                  ItemId:'',
                  Content: '',
                  Serial : '',
                  Description: '',
                  SumInsured: 0,
                }];
                this.currentEERiskRowIndex = this.TableRowEE.length-1;
              }
            }
          }
        },
        (err) => {},
      );
    }
    onSaveContentRisk(type){
      if (this.TableRow.length != 0) {
        console.log("Final Table Row",this.TableRow)
        let i=0, reqList =[],j=0;
        for(let entry of this.TableRow){
          if(entry.RiskId!=null && entry.RiskId!='' && entry.RiskId!=undefined) entry['LocationNameError']=false;
          else{j+=1; entry['LocationNameError']=true;}
          if(entry.ItemId!=null && entry.ItemId!='' && entry.ItemId!=undefined) entry['ContentTypeError']=false;
          else{j+=1; entry['ContentTypeError']=true;}
          if(entry.SumInsured!=null && entry.SumInsured!='' && entry.SumInsured!=undefined && entry.SumInsured!=0 && entry.SumInsured!='0'){ entry['SumInsuredError']=false;}
          else{ j+=1; entry['SumInsuredError']=true;}
            if(entry.ItemId!= null && entry.ItemId!='' && entry.ItemId!=undefined) entry['Content']=this.dropList.find(ele=>ele.Code==entry.ItemId)?.CodeDesc
            let data = {
                "ItemId":entry.ItemId,
                "RiskId":entry.RiskId,
                "ContentRiskDesc":entry.ContentRiskDesc,
                "SerialNoDesc": entry.SerialNoDesc,
                "MakeAndModel":"TN123",
                "SerialNo":entry.SerialNoDesc,
                "ItemValue":entry.Content,
                "SumInsured":entry.SumInsured,
                "LocationName":entry.LocationName
            }
            /*if(data.Dob!=null){
                data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
            }*/
            reqList.push(data);
            i+=1;
            
            if(i==this.TableRow.length && j==0){
              this.finalSaveRiskDetails(reqList,'C',type);
            }
        }
    
      }
      else{this.finalSaveRiskDetails([],'C',type);}
    }
    getdetails(){
      let  contentData:any;let newcontent:any;
      contentData = new ProfessionalIndemnity();
      newcontent = new ContentProfessionalIndermity();
      this.fields8[0] = contentData?.fields;
      this.fields9[0] = newcontent?.fields;
      // this.professionaltype();
      this.Indemitytype();
      this.getOccupationList('106','ProfessionalIntermidity');
    }
    getEditDetails(){
      let ReqObj = {
            "InsuranceId": "100020",
            "ProductId": "56",
            "SectionLevelReq":[
                {
            "RequestReferenceNo": "FAK-POI-05046",
              "RiskId": "53",
            "SectionId": "106"
                },
            ]
          }
          let urlLink=`${this.CommonApiUrl}dropdown/professionaltype`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if (data.Result) {

              }
            },
            (err) => { },
          );
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
                        this.fields8[0].fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(this.ProfessionalTypes);
                  }
                }
              }
            },
            (err) => { },
          );
        }


        getRelationTypeList(type){
          let ReqObj = {
            "InsuranceId": this.insuranceId
          }
          let urlLink = `${this.CommonApiUrl}dropdown/ratingrelationtypes`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                this.relationList = data.Result;
                if (this.relationList.length != 0) {
                  for (let i = 0; i < this.relationList.length; i++) {
                    this.relationList[i].label = this.relationList[i]['CodeDesc'];
                    this.relationList[i].value = this.relationList[i]['Code'];
                    delete this.relationList[i].CodeDesc;
                    if (i == this.relationList.length - 1) {
                      // this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.relationList);
                       this.fields[0].fieldGroup[0].fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.relationList);
                    
                   }
                    // console.log('FFFF',this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[i].fieldGroup[0].fieldGroup[0].props.options )
                     //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[i].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.relationList);

                    for(let x of this.fields){
                      let vars = x.fieldGroup[0].fieldGroup[0];
                      let j=0;
                      for( let n of vars.fieldGroup){      
                        console.log('HHHHHHHHHHHHH',n);  
                        this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[j].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.relationList);       
                      
                        j+=1;
                      }
                }
                  
                  }
                }
              }
            });
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
                        this.fields8[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.IndimnityTypes);
                  }
                }
              }
            },
            (err) => { },
          );
        }
        AddnewCovers(){
          let entry3 = {
            "CreatedBy": this.loginId,
            "RiskId": null,
            "RelationType": '3',
            "RelationTypeDesc": null,
            "DateOfBirth": null
      }
      this.productItem.patientList.push(entry3);
          let fieldGroup=[
            {
              fieldGroupClassName: 'grid',
              key: 'patientList',
              fieldGroup: [
                {
                  className: 'w-full md:mt-0 mt-5 mdw-5 ml-4 mr-4',
                  type: 'ngselect',
                  key: 'RelationType',
                  defaultValue: '',
                  props: {
                    label: 'Relation Type',
                    required: true,
                    options: [
                    ],
                  },
  
                  expressions: {
  
                  },
                },
                {
                  className: 'w-full md:mt-0 mt-5 mdw-5 ml-4 mr-4',
                  type: 'input',
                  key: 'NickName',
                  props: {
                    label: 'Nick Name',
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'w-full md:mt-0 mt-3 md:w-1/3 ml-4 mr-4',
                  type: 'datepicker',
                  key: 'DateOfBirth',
                  defaultValue: '',
                  templateOptions: {
                   defaultValue: '',
                    },
                    props: {
                    label: 'Date Of Birth',
                     required: true,
                    type: 'date',
                    datepickerOptions: {
                    defaultValue: '',
                     max: ''
                     },
                },
              }
            ]
            }
              ];
              let fire:any=this.fields[0].fieldGroup[0].fieldGroup;
              console.log('MMMMMMMMM',fire)
              fire = fire.concat(fieldGroup)
              console.log('RRRRRRRRRR',fire);
              this.fields[0] = {
                "fieldGroup":[
                  {
                    "props": {label: 'Health Insurance'},
                    "fieldGroup": fire
                  }
                ]
              };
              this.getRelationTypeList('change');
        }
        onTabClicked(event,header){
          console.log("Source Event",event,header);
          if(event.index!=0){
          if(this.productId!='19' && this.selectedTab!=1 && this.LocationList.length==0) this.onSave(event.tab.textLabel)
          }
      
          console.log('Tab event',event);
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
                // if(this.productId!='19' && this.productId!='59'){
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
                    console.log('LLLLLLLLLL',this.actualBuildingSI);
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
                  if(this.productId!='57'){
                    let empSI = this.sumInsuredDetails.ProductSuminsuredDetails.EmpLiabilitySi;
                    if(empSI!='' && empSI!=null && empSI!=undefined){
                      this.actualEmployeeSI = empSI;
                    }
                    else this.actualEmployeeSI=0;
                  }
                  else{
                    let empSI = this.sumInsuredDetails.ProductSuminsuredDetails.SumInsured;
                    if(empSI!='' && empSI!=null && empSI!=undefined){
                      this.actualEmployeeSI = empSI;
                    }
                    else this.actualEmployeeSI=0;
                  }
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
                  this.getbuilding();
                } 
                if(this.productId=='5' || this.productId=='29'){
                  this.getAccessories();
                }
              }
            },
            (err) => { },
          );
        }
        onFormSubmit(){
          if(this.productId=='5') this.onSaveAccessories();
      
        }
      
        onSave(type) {
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
                "LocationName":build.LocationName
              }
              buildReqList.push(ReqObj);
              i += 1;
              if (i == this.building.length) {
                this.saveBuildingDetails(buildReqList,type);
              }
            }
            console.log('TTTTTTTTTTTTTTTT',this.LocationList)
            if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
              if(this.LocationList.length !=0){
                for (let j = 0; j < this.LocationList.length; j++) {
                  this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
                  this.LocationList[j].value = this.LocationList[j]['Code'];
                  delete this.LocationList[j].CodeDesc;
                  if (j == this.LocationList.length - 1) {
                    if(this.first){
                      this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                    }
                    if(this.second){
                      this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                    }
                   if(this.fifth){
                    this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                   }
                   if(this.six){
                    this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                   }
                   if(this.ten){
                    this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                   }
                   if(this.third){
                    this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                   }
                    if(this.nine){
                      this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                    }
                  if(this.seven){
                    if(this.productId=='57' && this.sectionDetails.find((ele) => ele.SectionId==45)) this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = this.LocationList;
                    else  this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                  }
                  if(this.eight){
      
                    this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                  }
                  }
                }
              }
            }
          }
      
          //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      
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
                  for (let i = 0; i < this.CyperList.length; i++) {
                    this.CyperList[i].label = this.CyperList[i]['CodeDesc'];
                    this.CyperList[i].value = this.CyperList[i]['Code'];
                    delete this.CyperList[i].CodeDesc;
                    if (i == this.CyperList.length - 1) {
                      this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.CyperList;
                    }
                  }
                  console.log('CyberContent List',this.CyperList);
              }
            },
            (err) => { },
          );
        }
        onSaveLocation(){
          if(this.currentBuildingIndex!=null){
            this.building[this.currentBuildingIndex].BuildingAddress = this.productItem.LocationAddress;
            this.building[this.currentBuildingIndex].LocationName = this.productItem.LocationNameBuilding;
            this.building[this.currentBuildingIndex].BuildingSuminsured = this.productItem.BuildingSumInsureds;
            this.productItem.LocationAddress=null;
            this.productItem.LocationNameBuilding=null;
            this.productItem.BuildingSumInsureds=null;
          }
          else{
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
            this.productItem.LocationAddress=null;
            this.productItem.LocationNameBuilding=null;
            this.productItem.BuildingSumInsureds=null;
          }
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
                  this.allriskList = data.Result.ContentTypeRes;
                  for (let i = 0; i < this.allriskList.length; i++) {
                    this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
                    this.allriskList[i].value = this.allriskList[i]['Code'];
                    delete this.allriskList[i].CodeDesc;
                    if (i == this.allriskList.length - 1) {
                      this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = this.allriskList;
                    }
                  }
                  //this.getOccupationList()
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
                  this.allriskList = data.Result;
                  for (let i = 0; i < this.allriskList.length; i++) {
                    this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
                    this.allriskList[i].value = this.allriskList[i]['Code'];
                    delete this.allriskList[i].CodeDesc;
                    if (i == this.allriskList.length - 1) {
                      this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
                    }
                  }
                  //this.getOccupationList();
      
              }
            },
            (err) => { },
          );
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
                      this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.ElectronicList;
                    }
                  }
                }
              },
              (err) => { },
            );
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
        getchassisAcc(){
          let ReqObj = {
            "QuoteNo":sessionStorage.getItem('quoteNo')
          }
          let urlLink = `${this.CommonApiUrl}dropdown/motorWithaccessories`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){   
                let defaultObj = [{"Code":'',"CodeDesc":"---Select---"}]
                this.ChassisList = defaultObj.concat(data.Result);
                if(this.ChassisList.length==2){this.productItem.AccessoriesChassisNo=this.ChassisList[1].Code;}
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
              console.log(data);
              if(data.Result){ 
                let defaultObj = [{"Code":'',"CodeDesc":"---Select---"}]  
                this.AccLists = defaultObj.concat(data.Result);
              }
            },
            (err) => { },
          ); 
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
                 if(res.Result.ContentRiskDetails.length!=0){
                  if(this.endorsementSection){
                    console.log('Acessories Section',this.enableFieldsList)
                    this.accessoriesSection = !this.enableFieldsList.some(ele=>ele=='AccessoriesSuminsured');
                  }
                  //else this.contentRiskSection = true;
                  else this.accessoriesSection = true;
                   this.accessoriesList= res.Result.ContentRiskDetails;
                   console.log('Get details of Accessories', this.accessoriesList);
                   this.getTotalSICost('Accessories');
                 }
                 else{
              
                 }
                }
             
              }
            })
        }
        onEditAccessories(index,rowdata){
          let edit = this.accessoriesList.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc);
          console.log('LLLL',rowdata.ItemId);
          this.currentAccessoriesIndex = edit;
          this.enableAccessoriesEditSection = true;
          this.editAccessoriesSection=true;
      
          this.productItem.AccessoriesType= rowdata.ItemId;
           this.productItem.AccessoriesSerialNo = rowdata.SerialNoDesc;//this.serialNoDesc
           this.productItem.AccessoriesChassisNo = rowdata.RiskId; //this.MachineryName // this.MiSumInsured
          this.productItem.AccessoriesSI= rowdata.SumInsured;
       //this.machineryItemId = this.machineries[index].ItemId;
          this.individualCommaFormatted('accessories');
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
              }
            });
        }
        setTabSections(){
          

          //if(this.productId=='19' || this.productId=='59'){
            if(this.sectionDetails.length!=0){
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
                  this.productItem = new ProductData();
                  this.formSection = true; this.viewSection = false;
                }
                else{
                  this.sumInsured =false;
                  let fireData = new LocationDetails();
                  this.fieldss = fireData?.fields;  
                  this.productItem = new ProductData();
                  this.formSection = true; this.viewSection = false;
                }
              }
              else{
                  this.sumInsured =false;
                  let fireData = new LocationDetails();
                  this.fieldss = fireData?.fields;  
                  this.productItem = new ProductData();
                  this.formSection = true; this.viewSection = false;
              }
              let first = this.sectionDetails.find((ele) => ( ele.SectionId == 47));
           
              const second = this.sectionDetails.find((ele) => ele.SectionId == 35);
              if (second){
                if(second?.AddDetailYn=='Y'){
                  this.second = true;
                  let fireData = new PersonalAccident();
                  let entry = [];
                  this.fieldsPersonalAccident = fireData?.fields;
          
                  console.log('Second',this.fieldsPersonalAccident);
          
                  let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(() => {
                      this.individualCommaFormatted('PersonalAccident');
                    });
                  } }
                  this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
                }
                else{
                  this.second = false;
                }
              }
              else this.second = false;
              const third = this.sectionDetails.find((ele) => ele.SectionId == 3);
              const six = this.sectionDetails.find((ele) => ele.SectionId== 39); 
              const nine = this.sectionDetails.find((ele) => ele.SectionId == 41);
            }
            else{
                  this.sumInsured =false;
                  let fireData = new LocationDetails();
                  this.fieldss = fireData?.fields;  
                  this.productItem = new ProductData();
                  this.formSection = true; this.viewSection = false;
            }
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
                console.log('SectionId',this.SectionId);
                if(this.productId!=='32'){
                  this.employeeList = data?.Result;
                  console.log('OOOOO',this.employeeList);
                }
                else if(this.productId=='32'){
                  this.fidelityList =data?.Result;
                  console.log('Ferdility Lists',this.fidelityList);
                }
                else if(this.productId=='59'){
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
                  else if(this.productId=='59' && this.risk.length!=0 ){
                    //this.getTotalSICost('Fidelity');
                  }
              }
            });
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
                  this.originalFidelityList = new Array().concat(data?.Result);
                  if(this.fidelityList.length!=0){
                    this.getTotalSICost('Fidelity');
                  }
              }
            });
        }
        // getbuilding() {
        //   let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
        //   let ReqObj = {
        //     "QuoteNo": sessionStorage.getItem('quoteNo'),
        //   }
        //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        //     (data: any) => {
        //       console.log(data);
        //       let res: any = data;
        //       if (res.Result.length != 0) {
        //       }
        //       else {
        //       }
        //     })
        // }
        getbuilding() {
          let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
          let ReqObj = {
            "QuoteNo": sessionStorage.getItem('quoteNo'),
          }
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              let res: any = data;
              if (res.Result.length != 0) {
                if(this.endorsementSection){
                  console.log('Enable Building Suminsureds',this.enableFieldsList);
                  //this.buildingSection = !this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
                  this.buildingSection = this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
                }
                else this.buildingSection = false;
                //else this.buildingSection = false;
                this.building = res.Result;
                // let i=0;
                // for(let entry of this.building){
                //   if (i == 0) {
                //     this.LocationList = [];
                //   }
                //   this.LocationList.push({ "Code": String(this.LocationList.length+1), "CodeDesc": entry.LocationName })
                //   i+=1;
                // }
      
                if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
                  if(this.LocationList.length !=0){
                    for (let j = 0; j < this.LocationList.length; j++) {
                      this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
                      this.LocationList[j].value = this.LocationList[j]['Code'];
                      delete this.LocationList[j].CodeDesc;
                      if (j == this.LocationList.length - 1) {
                        if(this.first){
                          this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.six){
                          this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.second){
                          this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.fifth){
                          this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.ten){
                          this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.third){
                          this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.nine){
                          this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                        }
                        if(this.seven){
                          this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                        }
                        if(this.eight){
                          this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                        }
                      }
                    }
                  }
                }
         
             
                this.fourth = true;
                this.getTotalSICost('building');
              }
              else {
                this.building=[];
                this.AddNew();
                // this.building = [
                //   {
                //     "BuildingAddress": null,
                //     "BuildingBuildYear": null,
                //     "BuildingFloors": null,
                //     "InbuildConstructType": null,
                //     "BuildingSuminsured": null,
                //     "RiskId": null,
                //     SectionId: "1"
                //   }
                // ]
              }
              if(this.first){
                this.getdropList();
              
              }
              else if(this.second){
                //this.getPersonalAccidentDetails();
              }
              else if(this.third){
                //this.getallriskDetails();
              }
              else if(this.fifth){
                //this.getPersonalIntermediaryDetails();
              }
              else if(this.six){
                //this.getElectronicEquipment();
                }
                else if(this.nine){
                  //this.getMachineryRisk();
                  }
            })
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
                //let defaultObj = [{ 'label': '-Select-', 'value': null }]
                this.dropList = data.Result;
                // for (let i = 0; i < this.dropList.length; i++) {
                //   this.dropList[i].label = this.dropList[i]['CodeDesc'];
                //   this.dropList[i].value = this.dropList[i]['Code'];
                //   delete this.dropList[i].CodeDesc;
                //   if (i == this.dropList.length - 1) {
                //     this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.dropList);
                //   }
                // }
                  
      
                  //this.getOccupationList();
              }
            },
            (err) => { },
          );
        }
        getCountryList(){
          let ReqObj = {
            "InsuranceId":this.insuranceId,
            "BranchCode": this.branchCode
          }
          let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                this.countryList = data.Result;
								let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
								this.countryList = defaultRow.concat(this.countryList);
              }
            });
        }
        AddNewFunc() {
       this.productItem = new ProductData();
  //      let entry = {
  //       "CreatedBy": this.loginId,
  //       "RiskId": null,
  //       "RelationType": '1',
  //       "RelationTypeDesc": null,
  //       "DateOfBirth": null
  // }
  // this.productItem.patientList.push(entry);
  //  let entry1 = {
  //       "CreatedBy": this.loginId,
  //       "RiskId": null,
  //       "RelationType": '2',
  //       "RelationTypeDesc": null,
  //       "DateOfBirth": null
  // }
  // this.productItem.patientList.push(entry1);
  console.log('Patients Listsssssssss',this.productItem?.patientList)

          // for(let i=0;i<2;i++){
          let entry = {
        "CreatedBy": this.loginId,
        "RiskId": null,
        "RelationType": '1',
        "RelationTypeDesc": null,
        "DateOfBirth": null
  }
              this.productItem.patientList.push(entry);
              let entry1 = { "CreatedBy": this.loginId,
              "RiskId": null,
              "RelationType": '2',
              "RelationTypeDesc": null,
              "DateOfBirth": null}
          //     let entry1 = {
          //       "CreatedBy": this.loginId,
          //       "RiskId": null,
          //       "RelationType": '2',
          //       "RelationTypeDesc": null,
          //       "DateOfBirth": null
          // }
                      this.productItem.patientList.push(entry1);
            console.log('ENNNNNNN',this.productItem.patientList)
          // }
            let fireData = new HealthInsurance();
            

            this.fields[0]=fireData.fields[0];
            console.log('HHHHHHHHHHH',this.fields[0])
            if(this.fields[0]){
              this.showsection=true;
            }
            let modelHooks = { onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.onoccChange();
              });
            } }
            // this.fields[0].fieldGroup[0].fieldGroup[1].hooks = modelHooks;
            // console.log("Final Fields",this.fields[0].fieldGroup[0])
        }
        onoccChange(){
          console.log('HHHHHH',this.productItem);
        }
        onChange(type){
            console.log("YYYYYYYYYYYYYY",type)
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
                this.customerDetails=data?.Result?.CustomerDetails;
                if(this.Riskdetails[0].AcccessoriesSumInsured!=null)
                this.actualAccessoriesSI = String(this.Riskdetails[0].AcccessoriesSumInsured);
                
                if(this.Riskdetails.length==1){
                  this.newacc=true;
                  //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
                  this.productItem = new ProductData();
                }
                else{
                  this.newacc=false;
                  this.productItem = new ProductData();
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
                  this.allriskList = data.Result;
                  // for (let i = 0; i < this.allriskList.length; i++) {
                  //   this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
                  //   this.allriskList[i].value = this.allriskList[i]['Code'];
                  //   delete this.allriskList[i].CodeDesc;
                  //   if (i == this.allriskList.length - 1) {
                  //     if(this.third)
                  //     this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
                  //   }
                  // }
      
              }
            },
            (err) => { },
          );
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
          let i =0;
          if(this.productItem.AccessoriesChassisNo==null || this.productItem.AccessoriesChassisNo==''){
            i+=1;
          }
          if(this.productItem.AccessoriesType==null || this.productItem.AccessoriesType==''){
            i+=1;
          }
          if(this.productItem.AccessoriesSerialNo==null || this.productItem.AccessoriesSerialNo==''){
            i+=1;
          }
          if(this.productItem.AccessoriesSI==null || this.productItem.AccessoriesSI=='0' || this.productItem.AccessoriesSI==''){
            i+=1;
          }
          else if(this.totalAccessoriesSI > this.actualAccessoriesSI){
            i+=1;
            this.totalAccSIError = true;
            this.onsubmitAccessories()
          }
          if(i==0){
            
            if(!this.editAccessoriesSection && this.currentAccessoriesIndex==null ){
              this.currentAccessoriesIndex = this.accessoriesList.length;
            }
            if(this.accessoriesList[this.currentAccessoriesIndex]==undefined){
              this.accessoriesList.push({
                "ItemId":null,
                "RiskId":null,
                "MakeAndModel":null,
                "ContentRiskDesc":null,
                "SerialNoDesc": null,
                "SerialNo":null,
                "ItemValue":null,
                "SumInsured":null,
              });
            }
            
            this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = this.productItem.AccessoriesSI//this.contentSI;
            this.accessoriesList[this.currentAccessoriesIndex]['RiskId'] = this.productItem.AccessoriesChassisNo;
            this.accessoriesList[this.currentAccessoriesIndex]['SerialNoDesc'] = this.productItem.AccessoriesSerialNo;//this.serialNoDesc
            this.accessoriesList[this.currentAccessoriesIndex]['ItemId'] = this.productItem.AccessoriesType//this.contentId;
            this.accessoriesList[this.currentAccessoriesIndex]['LocationId'] = this.productItem.AccessoriesChassisNo;
            this.accessoriesList[this.currentAccessoriesIndex]['ContentRiskDesc'] =this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
            this.currentAccessoriesIndex = null;
            this.editAccessoriesSection = false;
            this.enableAccessoriesEditSection = false;
            this.productItem = new ProductData();
            if(this.ChassisList.length==2){this.productItem.AccessoriesChassisNo=this.ChassisList[1].Code;}
          }
            
        }
        getBuildingUsageId(BuildingUsageId) {
          let entry = this.BuildingUsageList.find(ele=>ele.Code==BuildingUsageId);
          if(entry){
            return entry.CodeDesc;
          }
          else return '';
        }
        getRoofTypeDescription(RoofType) {
          let entry = this.roofMaterialList.find(ele=>ele.Code==RoofType);
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
        getAllContentTypeDescription(Content) {
          let entry = this.allriskList.find(ele=>ele.Code==Content);
          if(entry){
            return entry.CodeDesc;
          }
          else return '';
        }
        getwallTypeDescription(WallType) {
          let entry = this.wallMaterialList.find(ele=>ele.Code==WallType);
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
        getAssName(Id){
          let entry = this.ChassisList.find(ele=>ele.Code==Id);
          if(entry){
            return entry.CodeDesc;
          }
          else return '';
        }
        getAssCont(ItemId){
          let entry = this.AccLists.find(ele=>ele.Code==ItemId);
          if(entry) return entry.CodeDesc;
          else return '';
        }
        AccessoriesDelete(rows:any){
          const index = this.accessoriesList.indexOf(rows);
          this.accessoriesList.splice(index, 1);
          this.getTotalSICost('Accessories');
        }
        delete(row: any) {
          const index = this.building.indexOf(row);
      
          this.building.splice(index, 1);
          this.LocationList.splice(index,1);
          this.getTotalSICost('building');
          console.log("Locations",this.LocationList);
          //this.Section=false;
        }
        onsubmitAccessories(){
          if(this.totalAccessoriesSI > this.actualAccessoriesSI){
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
        onAccessoriesCancel(){
          if(!this.editAccessoriesSection) this.accessoriesList.splice(this.currentAccessoriesIndex,1);
          this.chassisNo = null;this.accessoriesType=null;this.serialNoDesc=null;this.SumInsured=null;
          this.currentAccessoriesIndex = null;
          this.enableAccessoriesEditSection=false;
        }
        onSubmit(type){
          console.log('Final Locations',this.LocationName)
          let commonDetals:any = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          let appId = "1", loginId = "", brokerbranchCode = "",createdBy = "";
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
            if(referenceNo){
              this.quoteRefNo = referenceNo;
            }
            else this.quoteRefNo = null;
            if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
            }
            else {
              createdBy = this.loginId;
              if (this.userType != 'Issuer') {
                this.brokerCode = this.agencyCode;
                appId = "1"; loginId = this.loginId;
              }
              else {
                appId = this.loginId;
                brokerbranchCode = null;
              }
            }
          this.applicationId = appId;
          let havePromoYN = 'N'
          if(commonDetals[0].PromoCode!=null && commonDetals[0].PromoCode!='' && commonDetals[0].PromoCode!=undefined) havePromoYN='Y' 
          let startDate = null,endDate=null;
          let startDateList = String(commonDetals[0].PolicyStartDate).split('/');
          if(startDateList.length>1) startDate = commonDetals[0].PolicyStartDate
          else startDate = this.datePipe.transform(commonDetals[0].PolicyStartDate,'dd/MM/yyyy');
          let endDateList = String(commonDetals[0].PolicyEndDate).split('/');
          if(endDateList.length>1) endDate = commonDetals[0].PolicyEndDate
          else endDate = this.datePipe.transform(commonDetals[0].PolicyEndDate,'dd/MM/yyyy');
          this.policyStartDate = startDate;this.policyEndDate=endDate;
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
                "Currency": commonDetals[0].Currency,
                "ExchangeRate": commonDetals[0].ExchangeRate,
                "Havepromocode": havePromoYN,
                "PolicyEndDate": endDate,
               "PolicyStartDate": startDate,
                "IndustryId": "99999",
                "InsuranceId": this.insuranceId,
                "ProductId": this.productId,
                 "BranchCode": this.branchCode,
            },
            "BrokerDetails": {
                "CustomerCode": commonDetals[0]?.CustomerCode,
                "CustomerName": commonDetals[0]?.CustomerName,
                "BdmCode": commonDetals[0]?.CustomerCode,
                "BrokerCode": commonDetals[0]?.BrokerCode,
               "LoginId": loginId,
               "ApplicationId": appId,
                "AgencyCode": this.agencyCode,
                "BrokerBranchCode": this.brokerbranchCode,
                "SourceTypeId": commonDetals[0].SourceType,
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
          // {
          //   "SaveOrSubmit": type,
          //   "AcexecutiveId": "",
          //   "PolicyNo": null,
          //   "ProductType": null,
          //   "TiraCoverNoteNo": null,
          //   "CustomerCode": commonDetals[0]?.CustomerCode,
          //   "CustomerName": commonDetals[0]?.CustomerName,
          //   "BdmCode": commonDetals[0]?.CustomerCode,
          //   "BrokerCode": commonDetals[0]?.BrokerCode,
          //   "LoginId": loginId,
          //   "SubUserType": this.subuserType,
          //   "ApplicationId": appId,
          //   "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
          //   "RequestReferenceNo": this.quoteRefNo,
          //   "AgencyCode": this.agencyCode,
          //   "BranchCode": this.branchCode,
          //   "BrokerBranchCode": this.brokerbranchCode,
          //   "BuildingOwnerYn": "N",
          //   "Createdby": this.loginId,
          //   "SourceTypeId": commonDetals[0].SourceType,
          //   "Currency": commonDetals[0].Currency,
          //   "ExchangeRate": commonDetals[0].ExchangeRate,
          //   "Havepromocode": havePromoYN,
          //   "Promocode": commonDetals[0].Promocode,
          //   "UserType": this.userType,
          //   "PolicyEndDate": endDate,
          //   "PolicyStartDate": startDate,
          //   "IndustryId": "99999",
          //   "InsuranceId": this.insuranceId,
          //   "ProductId": this.productId,
          //   "EndorsementDate": null,
          //   "EndorsementEffectiveDate": null,
          //   "EndorsementRemarks": null,
          //   "EndorsementType": null,
          //   "EndorsementTypeDesc": null,
          //   "EndtCategoryDesc": null,
          //   "EndtCount": null,
          //   "EndtPrevPolicyNo": null,
          //   "EndtPrevQuoteNo": null,
          //   "EndtStatus": null,
          //   "IsFinanceEndt": null,
          //   "OrginalPolicyNo": null,
          //   "LocationList": []
          // }
          let locationList = [],i=0;
          for(let entry of this.LocationName){
            let obj = {
                "LocationId":i+1,
                "LocationName":entry.LocationName,
                "SectionList": []
            }
            if(entry.BuildingType!=null && entry.BuildingType!='' && entry.BuildingSI!=null && entry.BuildingSI!='' && entry.BuildingSI!='0'){
              let subEntry = {
                "SectionId": "1",
                "RiskId": null,
                //"BuildingSumInsured": String(entry.BuildingSI).replaceAll(',',''),
                "SumInsured": String(entry.BuildingSI).replaceAll(',',''),
                "OutbuildConstructType": entry.BuildingType
              }
              //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
              obj.SectionList.push(subEntry);
            }
            if(entry.ContentSI!=null && entry.ContentSI!='' && entry.ContentSI!='0'){
              let subEntry = {
                "SectionId": "47",
                "RiskId": null,
                //"ContentSuminsured": String(entry.ContentSI).replaceAll(',',''),
                "SumInsured": String(entry.ContentSI).replaceAll(',','')
              }
              //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
              obj.SectionList.push(subEntry);
            }
            if(entry.AllRiskSI!=null && entry.AllRiskSI!='' && entry.AllRiskSI!='0'){
              let subEntry = {
                "SectionId": "3",
                "RiskId": null,
                //"AllriskSumInsured": String(entry.AllRiskSI).replaceAll(',',''),
                "SumInsured": String(entry.AllRiskSI).replaceAll(',','')
              }
              //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
              obj.SectionList.push(subEntry);
            }
            if(entry.PersonalLiabilitySI!=null && entry.PersonalLiabilitySI!='' && entry.PersonalLiabilitySI!='0'){
              let subEntry = {
                "SectionId": "139",
                //"PersonalLiabilitySi": String(entry.PersonalLiabilitySI).replaceAll(',',''),
                "SumInsured": String(entry.PersonalLiabilitySI).replaceAll(',','')
              }
              //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
              obj.SectionList.push(subEntry);
            }
            
            if(entry.ServantList.length!=0){
              for(let ser of entry.ServantList){
                let subEntry={
                      "SectionId": "106",
                      "RiskId": null,
                      "DomesticServantType":ser.ServantType,
                      "Count":ser.ServantCount,
                      //"DomesticServentSi": String(ser.ServantSI).replaceAll(',',''),
                      "SumInsured": String(ser.ServantSI).replaceAll(',','')
                }
                obj.SectionList.push(subEntry);
              }
            }
            if(entry.PAList.length!=0){
              for(let ser of entry.PAList){
                 let subEntry = {
                  "SectionId": "138",
                  "RiskId": null,
                  "RelationType": ser.RelationType,
                  //"PersonalAccidentSi":String(ser.DeathSI).replaceAll(',',''),
                  "SumInsured": String(ser.DeathSI).replaceAll(',',''),
                }
                //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
                obj.SectionList.push(subEntry);
              }
            }
            // if(entry.ServantType!=null && entry.ServantType!='' && entry.ServantCount!=null && entry.ServantCount!='' && entry.ServantSI!=null && entry.ServantSI!=''){
            //   let subEntry = {
            //     "SectionId": "106",
            //     "RiskId": null,
            //     "DomesticServantType":entry.ServantType,
            //     "Count":entry.ServantCount,
            //     "DomesticServentSi": String(entry.ServantSI).replaceAll(',',''),
            //     "SumInsured": String(entry.ServantSI).replaceAll(',',''),
            //   }
            //   //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
            //   obj.SectionList.push(subEntry);
            // }
            // if(entry.RelationType!=null && entry.RelationType!='' && entry.DeathSI!=null && entry.DeathSI!=''){
            //   let subEntry = {
            //     "SectionId": "138",
            //     "RiskId": null,
            //     "RelationType": entry.RelationType,
            //     "PersonalAccidentSi":String(entry.DeathSI).replaceAll(',',''),
            //     "SumInsured": String(entry.DeathSI).replaceAll(',',''),
            //   }
            //   //if(entry['OriginalRiskId']!=null && entry['OriginalRiskId']!=undefined) subEntry['RiskId']=entry['OriginalRiskId']
            //   obj.SectionList.push(subEntry);
            // }
            
            if(obj.SectionList.length==0){
              obj['CommonError']=true
            }
            else{
              obj['CommonError']=false;
            }
            if(obj.SectionList.length!=0) locationList.push(obj);
            i+=1;
            if(i==this.LocationName.length){
                ReqObj.LocationList = locationList;
                this.onFinalSubmit(ReqObj,type);
            }
          }
        }
        onFinalSubmit(ReqObj,type){
          let urlLink = `${this.motorApiUrl}api/slide/nonmotorsave`
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              if(data.Result){
                if (data?.Result.length!=0) {
                  this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  if((type=='Save' && this.LocationName.length==(this.tabIndex+1)) || type=='Submit' ){
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
                        if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList,data.Result,type);
                      }
                    }
                    else{ this.onCalculate(data.Result,type); }
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
                        if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList,data.Result,type);
                      }
                    }
                    else this.tabIndex+=1;
                  } 
                }
              }
            });
        }
        onOptionSelect(rowData,value){
          rowData.Value = value;
        }
        getUWDesc(ques){
          if(ques.ReferralYn=='Y') return `<i class="pi pi-bookmark-fill customReferralBorder"></i>&nbsp; ${ques.UwQuesOptionDesc}`
          else return ques.UwQuesOptionDesc;
        }
        getOccupationList(sectionId,type){
          let ReqObj = {},urlLink:any='';this.occupationList=[];
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
              if(data.Result){
                this.occupationList =[];
                this.occupationList = data.Result;
                if(this.productId=='14' || sectionId=='45'){
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                  this.employeeOccupationList = data.Result;
                  for (let i = 0; i < this.employeeOccupationList.length; i++) {
                    this.employeeOccupationList[i].label = this.employeeOccupationList[i]['CodeDesc'];
                    this.employeeOccupationList[i].value = this.employeeOccupationList[i]['Code'];
                    if (i == this.employeeOccupationList.length - 1) {
                      console.log('Itemsss',this.fieldsGroupPa[0].fieldGroup[0])
                      this.fieldsGroupPa[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.employeeOccupationList);
                    }
                  }
                }
                else if(this.productId=='32' || sectionId=='43'){
                  this.fidelityOccupationList = data.Result;
                  for (let i = 0; i < this.fidelityOccupationList.length; i++) {
                    this.fidelityOccupationList[i].label = this.fidelityOccupationList[i]['CodeDesc'];
                    this.fidelityOccupationList[i].value = this.fidelityOccupationList[i]['Code'];
                    delete this.fidelityOccupationList[i].CodeDesc;
                    if (i == this.fidelityOccupationList.length - 1) {
                      this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.fidelityOccupationList;
                    }
                    // console.log('JJJJJJJJJJJJJJJJJJJ',this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options)
                  }
                }
                else 
                {
                  this.occupationList = data.Result;
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }]
                  for (let i = 0; i < this.occupationList.length; i++) {
                    this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
                    this.occupationList[i].value = this.occupationList[i]['Code'];
                    if (i == this.occupationList.length - 1) {
                          if(this.productId=='59' && sectionId=='35'){
                            let fieldList = this.fields4[0].fieldGroup[0].fieldGroup;
                            for(let field of fieldList){
                                if(field.key=='OccupationType') field.templateOptions.options = defaultObj.concat(this.occupationList);
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
        individualCommaFormatted(type){
          if(type=='accessories'){
            let entry = this.productItem.AccessoriesSI;
            if(entry){
              //if(this.SumInsured.includes('.')) this.SumInsured = this.SumInsured.split('.')[0];
              // let value = this.SumInsured.replace(/\D/g, "")
              // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if(!this.editAccessoriesSection && this.currentAccessoriesIndex==null ){
                this.currentAccessoriesIndex = this.accessoriesList.length;
              }
              if(this.accessoriesList[this.currentAccessoriesIndex]==undefined){
                this.accessoriesList.push({
                  "ItemId":null,
                  "RiskId":null,
                  "MakeAndModel":null,
                  "ContentRiskDesc":null,
                  "SerialNoDesc": null,
                  "SerialNo":null,
                  "ItemValue":null,
                  "SumInsured":null,
                });
                console.log("Final Accessories",this.accessoriesList,this.accessoriesList[this.currentAccessoriesIndex],this.currentAccessoriesIndex)
                this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = entry;
                this.productItem.AccessoriesSI= entry;
                this.getTotalSICost('Accessories');
              }
              else{
                this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = entry;
                this.productItem.AccessoriesSI= entry;
                this.getTotalSICost('Accessories');
              }
            }
          }
        }
        getTotalSICost(type){
           if(type=='Accessories'){
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
        onSaveAccessories(){
          if (this.accessoriesList.length != 0) {
            let i=0, reqList =[];
            for(let entry of this.accessoriesList){
              let sumInsured;
              if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
              // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
              else sumInsured = entry.SumInsured;
                let data = {
                  "ItemId":entry.ItemId,
                  "RiskId":'1',
                  "ContentRiskDesc":entry.ContentRiskDesc,
                  "SerialNoDesc": entry.SerialNoDesc,
                  "MakeAndModel":"TN123",
                  "SerialNo":"155685",
                  "ItemValue":"26534556",
                  "SumInsured":sumInsured
                }
                reqList.push(data);
                i+=1;
                if(i==this.accessoriesList.length){
                  this.finalSaveRiskDetails(reqList,'EA',null);
                }
            }
      
          }
        }
        finalSaveRiskDetails(reqList,type,SaveType){
          let ReqObj;let urlLink;
          if(type=='SB'){
          }
          if(type=='EA' && (this.productId=='5' || this.productId=='29'))
          {
            ReqObj = {
              "CreatedBy": this.loginId,
            "QuoteNo":sessionStorage.getItem('quoteNo'),
            "RequestReferenceNo":this.quoteRefNo,
            "SectionId": "99999",
             "Type":type,
             "ContentRiskDetails":reqList
            }
            urlLink = `${this.motorApiUrl}api/savecontentrisk`;
          }
          if(type=='C')
          {
            ReqObj = {
              "CreatedBy": this.loginId,
              // sessionStorage.getItem('quoteNo')
            "QuoteNo":null,
            "RequestReferenceNo":this.quoteRefNo,
            "Companyid": this.insuranceId,
            "ProductId": this.productId,
            "SectionId": "47",
            "BranchCode": this.branchCode,
             "Type":type,
             "ContentRiskDetails":reqList,
            }
            urlLink = `${this.motorApiUrl}api/savecontentrisk`;
          }
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
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
                if(type=='C'){
                  if(SaveType=='direct'){
                    this.visible = false;
                    this.currentContentRowIndex = null;
                  }
                  else{
                    this.TableRow=[{
                      LocationName:'',
                      id:1,
                      ItemId: '',
                      Content: '',
                      SerialNoDesc : '',
                      ContentRiskDesc: '',
                      SumInsured: 0,
                    }]
                    this.currentContentRowIndex = this.TableRow.length-1;
                  }
                }
                console.log('First Fields');
                  // this.toastrService.show(
                  //   'Building Details',
                  //   'Building Details Inserted/Updated Successfully',
                  //   config)
                  if(type=='MA' || type=='PI' || type=='E' || type=='EA') this.checkValidation();
        
              }
        
            },
           
            (err) => { },
          );
        }
        checkValidation(){
          let ReqObj = {
            "QuoteNo": this.quoteNo
          }
          let urlLink = `${this.motorApiUrl}api/additionalinfovali`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              if (data?.Message=='Success') {
                this.saveFleetDetails();
                //this.router.navigate(['/quotation/plan/premium-details']);
                //this.router.navigate(['/quotation/plan/main/document-info'])
              }
            },
            (err) => { },
          ); 
        }
        showSidebar() {
          this.sidebarVisible = true;
        }
      
        getBack(type){
          if(this.endorsementSection){
            if(type=='Building'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
            }
            else if(type=='Health Insurance'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              // this.fourth = true;
              // this.selectedTab -=1; 
            }
            else if(type=='Content Risk'){
              this.fourth = true;
              //this.getContentDetails();
              this.selectedTab -=1; 
              
            }
            else if(type=='Personal Accident'){
              this.fourth = true;
              //this.getPersonalAccidentDetails();
              this.selectedTab -=1; 
            }
            else if(type=='All Risk'){
              this.fourth = true;
              //this.getallriskDetails();
              this.selectedTab -=1; 
            }
            else if(type=='Personal Indemenity'){
              this.fourth = true;
              //this.getPersonalIntermediaryDetails();
              this.selectedTab -=1; 
            }
            else if(type=='ElectricalEquipment'){
              this.fourth = true;
              //this.getElectronicEquipment();
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
            else if(type=='Health Insurance'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
            }
            if(type=='Content Risk'){
              this.fourth = true;
              //this.getContentDetails();
              this.selectedTab -=1; 
              
            }
            else if(type=='Personal Accident'){
              this.fourth = true;
              //this.getPersonalAccidentDetails();
              this.selectedTab -=1; 
            }
            else if(type=='All Risk'){
              this.fourth = true;
              //this.getallriskDetails();
              this.selectedTab -=1; 
            }
            else if(type=='Personal Indemenity'){
              this.fourth = true;
              //this.getPersonalIntermediaryDetails();
              this.selectedTab -=1; 
            }
            else if(type=='ElectricalEquipment'){
              this.fourth = true;
              //this.getElectronicEquipment();
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
          }
      
          
        }
      
        onSaveEmployeeDetails(type){
          
          let urlLink = null;
          if(type=='save') urlLink = `${this.motorApiUrl}api/saveemployees`;
          else urlLink = `${this.motorApiUrl}api/proceedemployees`;
          if(this.employeeList.length!=0){
              let empList = [],i=0;
              for(let emp of this.employeeList){
                let entry = emp;
                 if(entry.DateOfBirth!=null){
                    if(!entry.DateOfBirth.includes('/')) entry['DateOfBirth']= this.datePipe.transform(entry.DateOfBirth, "dd/MM/yyyy");
                }
                if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
                if(entry['EmployeeId']==null || entry['EmployeeId']==undefined || entry['EmployeeId']=='') entry['EmployeeId'] = null;
                else entry['EmployeeId'] = String(entry.EmployeeId);
                empList.push(entry);
                i+=1;
                if(i==this.employeeList.length){
                  let SectionId = null;
                  if(this.productId=='14' || this.productId=='19' || this.productId=='57') SectionId = '45';
                  let validYN='N';
                  if(type=='alter') validYN = 'Y';
                  let ReqObj = {
                    "Createdby": this.loginId,
                    "SectionId": SectionId,
                    "ProductId": this.productId,
                    "InsuranceId": this.insuranceId,
                    "ProductEmployeeSaveReq": empList,
                    "QuoteNo": this.quoteNo,
                     // "EmpcountSIvalidYN": validYN,
                    // "ExcelUploadYN": "N",
                    // "RequestReferenceNo": this.quoteRefNo
                  }
                  //let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
                  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
                    (data: any) => {
                      console.log(data);
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
          else{alert("No Employees Found")}
        }
      
        saveBuildingDetails(ReqObj,type) {
          let urlLink = `${this.motorApiUrl}api/buildingdetails`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              let res: any = data;
              if (data.ErrorMessage.length != 0) {
                if (res.ErrorMessage) {
      
                }
              }
              else {
                if (data.Result) {
                  console.log('PPPPPPPPP',data.Result);
                  console.log('SSSSSSSSSSSS',type);
                  //this.first=true;
                  if(type=='Content Risk'){
                    this.fourth = true;
                    //this.getContentDetails();
                    this.selectedTab = 1;
                  }
                  else if(type=='Personal Accident'){
                    this.fourth = true;
                    // this.getPersonalAccidentDetails();
                  }
                  else if(type=='All Risk'){
                    this.fourth = true;
                    // this.getallriskDetails();
                  }
                  else if(type=='Personal Indemenity'){
                    this.fourth = true;
                    //this.getPersonalIntermediaryDetails();
                  }
                  else if(type=='ElectricalEquipment'){
                    this.fourth = true;
                    //this.getElectronicEquipment();
                  }
                  else if(type== 'Machinery Breakdown'){
                    this.nine =true;
                    this.getMachineryRisk();
                    }
                  else if (this.first||this.second || this.third || this.fifth || this.six || this.seven || this.eight || this.nine) {
                    this.fourth = true;
                    if(this.first){
                      //this.getContentDetails();
                    }
                    else if(this.second){
                      //this.getPersonalAccidentDetails();
                    }
                    else if(this.third){
                      //this.getallriskDetails();
                    }
                    else if(this.fifth){
                      //this.getPersonalIntermediaryDetails();
                    }
                    else if(this.six){
                      //this.getElectronicEquipment();
                      }
                      else if(this.nine){
                        this.getMachineryRisk();
                        }
                    this.selectedTab = 1;
                  }
                  else if(this.productId=='42') this.selectedTab = 1;
                  else if(this.productId=='56') this.selectedTab = 1;
                  else{
                    this.checkValidation();
                  }
                }
              }
      
            },
            (err) => { },
          );
        }
        editsections(types){
        
            //   this.Products=true;
              
              //this.updateComponent.setTabCountSection(0);
            //   this.showSection = true;
              
                let contentData 
                if(types=='Building'){
                if(this.insuranceId=='100004'){
                  contentData = new Buildingss();
                
                }
                else{
                  contentData = new Building();
                }
                //this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
                this.fields[0] = contentData?.fields;
                let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                for(let field of fieldList){
                  if(field.key=='BuildingBuildYear' && this.insuranceId=='100004'){
                    field.props.options = this.getYearList();
                  }
                  if(field.key=='BuildingSuminsured'){
                      field.templateOptions.disabled = true;
                  }
                }
                this.getWallMaterialList();
                this.getRoofMaterialList();
                this.getbuildingpurposeList();
                this.getFirstLossPayeeList();
                if(this.insuranceId =='100004'){
                  this.getTypeOfProperty();
                }
              }
              if(types=='Content'){
                if(this.insuranceId=='100004' && this.productId=='59'){
                  //let contentData1 = new HouseHoldContentsss();
                  let contentData1 = new HouseHoldContents();
                  this.fields1[0] = contentData1?.fields;
                }
                else {
                  let contentData1 = new HouseHoldContents();
                  this.fields1[0] = contentData1?.fields;
                }
              } 
              if(types=='ElectronicEquipment'){
                 let contentData6 = new ElectronicEquipmentNew();
                this.fields6[0] = contentData6?.fields;
              }
              if(types=='AllRisk'){
                  let contentData3 
                  if(this.insuranceId=='100004'){
                    contentData3 = new AllRiskss();
                  }
                  else {
                    contentData3 = new AllRisk();
                  }
                  this.fields2[0] = contentData3?.fields;
              }
              if(types=='PersonalAccident'){
                  let contentData5:any; 
                  contentData5 = new PersonalAccident();
                  this.fields4[0] = contentData5?.fields;
                  this.getOccupationList('35','PersonalAccident');
              }
              if(types=='PersonalLiability'){
                  let contentData4:any;
                  contentData4 = new PersonalLiability();
                  this.fields3[0] = contentData4?.fields;
              }
              if(types=='DomesticServant'){
                let contentData4:any;
                contentData4 = new DomesticServant();
                this.fields7[0] = contentData4?.fields;
              }
              //this.productItem = new ProductData();
              
              //this.getOccupationList();
          }
          checkMachineryYNChanges(){
            console.log("Form",this.productItem,this.fields)
            if(this.productId=='19' || this.productId=='24'){
              let fields = this.fields[0].fieldGroup;
            }
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
                  let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
                  this.wallMaterialList = defaultObj.concat(data.Result);
                  
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
                    let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
                    this.roofMaterialList = defaultObj.concat(data.Result);
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
                        else if(this.productId!='19' && this.productId!='59' && this.productId!='59'){ } 
                       
                        else{
                          let fields = this.fields[0].fieldGroup;
                          for(let field of fields){
                              field.fieldGroup[4].props.options = defaultObj.concat(this.TypeOfPropertyss);
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
                  // for (let i = 0; i < this.BuildingUsageList.length; i++) {
                  //   this.BuildingUsageList[i].label = this.BuildingUsageList[i]['CodeDesc'];
                  //   this.BuildingUsageList[i].value = this.BuildingUsageList[i]['Code'];
                  //   delete this.BuildingUsageList[i].CodeDesc;
                  //   if (i == this.BuildingUsageList.length - 1) {
                  //     let fields = this.fields[0].fieldGroup;
                  //       console.log('fieldsss',this.fields[0]);
                  //       this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.BuildingUsageList);
                  //   }
                  // }
                }
              },
              (err) => { },
            );
          }

          // onNextProceed(){
          //   this.router.navigate(['/quotation/plan/premium-details']);
          // }
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

          getContentDetails(type){
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
                      // this.sectionCount +=1;
                      // if(sections.length==this.sectionCount){
                      //   this.formSection = true; this.viewSection = false;
                      // }
                      console.log("Products",this.productItem)
                }
                this.editsections('Content');
              },
              (err) => { },
            );
          }
          onSaveContentRiskDetails(){
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
               "EndorsementDate":null,
              "EndorsementEffectiveDate":null,
              "EndorsementRemarks":null,
              "EndorsementType":null,
              "EndorsementTypeDesc": null,
              "EndtCategoryDesc": null,
              "EndtCount": null,
              "EndtPrevPolicyNo":null,
              "EndtPrevQuoteNo": null,
              "EndtStatus": null,
              "IsFinanceEndt": null,
              "OrginalPolicyNo": null,
              // "PolicyNo": this.endorsePolicyNo,
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
                  //sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
                  this.nextslide1=true; 
                  // this.onCalculate(data.Result,'Content');
               
                  // this.onCheckUWQuestionProceed(data.Result);
                }
                else {
                  this.nextslide1=false;
                }
            },
            (err) => { },
          );
          }
          onSubmitDomesticDetails(type){
            let valid = this.checkLocationValidation()
            if(valid){
              let commonDetals:any = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
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
                  //loginId = this.brokerLoginId
                  brokerbranchCode = null;
                }
              }
              this.applicationId = appId;
              let havePromoYN = 'N'
              if(commonDetals[0].PromoCode!=null && commonDetals[0].PromoCode!='' && commonDetals[0].PromoCode!=undefined) havePromoYN='Y' 
              let startDate = null,endDate=null;
              let startDateList = String(commonDetals[0].PolicyStartDate).split('/');
              if(startDateList.length>1) startDate = commonDetals[0].PolicyStartDate
              else startDate = this.datePipe.transform(commonDetals[0].PolicyStartDate,'dd/MM/yyyy');
              let endDateList = String(commonDetals[0].PolicyEndDate).split('/');
              if(endDateList.length>1) endDate = commonDetals[0].PolicyEndDate
              else endDate = this.datePipe.transform(commonDetals[0].PolicyEndDate,'dd/MM/yyyy');
              this.policyStartDate = startDate;this.policyEndDate=endDate;
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
                    "Currency": commonDetals[0].Currency,
                    "ExchangeRate": commonDetals[0].ExchangeRate,
                    "Havepromocode": havePromoYN,
                    "PolicyEndDate": endDate,
                  "PolicyStartDate": startDate,
                    "IndustryId": "99999",
                    "InsuranceId": this.insuranceId,
                    "ProductId": this.productId,
                    "BranchCode": this.branchCode,
                },
                "BrokerDetails": {
                    "CustomerCode": commonDetals[0]?.CustomerCode,
                    "CustomerName": commonDetals[0]?.CustomerName,
                    "BdmCode": commonDetals[0]?.CustomerCode,
                    "BrokerCode": commonDetals[0]?.BrokerCode,
                  "LoginId": loginId,
                  "ApplicationId": appId,
                    "AgencyCode": this.agencyCode,
                    "BrokerBranchCode": this.brokerbranchCode,
                    "SourceTypeId": commonDetals[0].SourceType,
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
              for(let entry of this.locationList){
                let locationList = [],i=0,j=0;
                  let obj = {
                      "LocationId":i+1,
                      "LocationName":entry.LocationName,
                      "CoversRequired": entry.CoversRequired,
                      "BuildingOwnerYn": entry.BuildingOwnerYn,
                      "Address": entry.BuildingAddress,
                      "SectionList": []
                  }
                  if(entry.BuildingList.length!=0){
                    for(let build of entry.BuildingList){
                      if(build.BuildingSumInsured!=0 && build.BuildingSumInsured!=null && build.RoofType!=null && build.WallType!=null){
                        let subEntry= {
                          "SectionId": "1",
                          "Status": "Y",
                          "RiskId" : null,
                          "RoofType": build.RoofType,
                          "WallType": build.WallType,
                          "BuildingBuildYear": '2024',
                          "BuildingOwnerYn": "N",
                          "FirstLossPayee": build.FirstLossPayee,
                          "BuildingSumInsured": build.BuildingSumInsured,
                          "SumInsured": build.BuildingSumInsured,
                          "BuildingUsageId": null,
                          "WaterTankSi": null,
                          "ArchitectsSi": null,
                          "LocationName":entry?.LocationName,
                          "LossOfRentSi":this.productItem?.LossOfRentSi,
                          "TypeOfProperty":this.productItem?.TypeOfProperty,
                          "BuildingAddress": entry?.BuildingAddress
                        }
                        obj.SectionList.push(subEntry);
                      }
                    }
                  }
                  if(j==this.tabIndex){
                    entry['ContentSuminsured'] = this.productItem.ContentSuminsured;
                    entry['AllriskSumInsured'] = this.productItem.AllriskSumInsured;
                    entry['TotalNoOfEmployees'] = this.productItem.TotalNoOfEmployees;
                    entry['EmpLiabilitySi'] = this.productItem.EmpLiabilitySi;
                    entry['LiabilityOccupationId'] = this.productItem.LiabilityOccupationId;
                    entry['OccupationType'] = this.productItem.OccupationType;
                    entry['ElectronicEquipmentSI'] = this.productItem.ElectronicEquipmentSI;
                    entry['SumInsured']= this.productItem.SumInsured;
                    entry['OtherOccupation'] = this.productItem.otheroptionPer
                  }
                  if(entry.ContentSuminsured!=null && entry.ContentSuminsured!=0 && entry.ContentSuminsured!='0'){
                    let subEntry= {
                      "SectionId": "47",
                      "ContentSuminsured":entry.ContentSuminsured,
                      "SumInsured": entry.ContentSuminsured,
                      "Status": "Y",
                      "JewellerySi": this.productItem?.JewellerySi,
                      "PaitingsSi": this.productItem?.PaitingsSi,
                      "CarpetsSi": this.productItem?.CarpetsSi,
                      "EquipmentSi":  this.productItem?.EquipmentSis,
                    }
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.AllriskSumInsured!=null && entry.AllriskSumInsured!=0 && entry.AllriskSumInsured!='0'){
                      let subEntry = {
                        "SectionId": "3",
                        "AllriskSumInsured": entry.AllriskSumInsured,
                        "SumInsured": entry.AllriskSumInsured,
                      }
                      obj.SectionList.push(subEntry);
                  }
                  if(entry.OccupationType!=null && entry.OccupationType!='' && entry.SumInsured!='0' && entry.SumInsured!=null){
                      let subEntry={   
                        "SectionId": "35",
                        "TotalNoOfPersons": "1",  
                        "Status": "Y",
                        "OccupationType": entry.OccupationType,
                        "SumInsured": entry.SumInsured,
                        "OtherOccupation": entry.OtherOccupation
                      }
                      obj.SectionList.push(subEntry);
                  }
                  if(entry.EmpLiabilitySi!=null && entry.EmpLiabilitySi!='' && entry.EmpLiabilitySi!='0'){
                    let subEntry = {    "SectionId": "36", "TotalNoOfEmployees": "1","LiabilityOccupationId": entry.LiabilityOccupationId,"SumInsured": entry.EmpLiabilitySi,"Status": "Y"}
                    obj.SectionList.push(subEntry);
                  }
                  if(entry.ElectronicEquipmentSI!=null && entry.ElectronicEquipmentSI!='' && entry.ElectronicEquipmentSI!='0'){
                    let subEntry = {    "SectionId": "76", "TotalNoOfEmployees": "1","LiabilityOccupationId": entry.LiabilityOccupationId,"SumInsured": entry.ElectronicEquipmentSI,"Status": "Y"}
                    obj.SectionList.push(subEntry);
                  }
                  locationList.push(obj);
                  j+=1;
                  if(j==this.locationList.length){ReqObj.LocationList=locationList;this.onFinalSubmit(ReqObj,type)}
              }
            }
          
        
          }
          checkLocationValidation(){
            let i = 0,j=0;
            for(let entry of this.locationList){
              if(entry.LocationName==null || entry.LocationName==''){ entry['LocationNameError']=true;i+=1;}
              else{entry['LocationNameError']=false;}
              if(entry.BuildingAddress==null || entry.BuildingAddress==''){ entry['BuildingAddressError']=true;i+=1;}
              else{entry['BuildingAddressError']=false;}
              if(entry.CoversRequired=='B' || entry.CoversRequired=='BC'){
                if(entry.CoversRequired=='B')
                for(let build of entry.BuildingList){
                  if(build.WallType==null || build.WallType==''){build['WallTypeError']=true;i+=1}else{build['WallTypeError']=false;}
                  if(build.RoofType==null || build.RoofType==''){build['RoofTypeError']=true;i+=1}else{build['RoofTypeError']=false;}
                  if(build.FirstLossPayee==null || build.FirstLossPayee==''){build['FirstLossPayeeError']=true;i+=1}else{build['FirstLossPayeeError']=false;}
                  if(build.BuildingSumInsured==null || build.BuildingSumInsured=='' || build.BuildingSumInsured==0){build['SumInsuredError']=true;i+=1}else{build['SumInsuredError']=false;}
                }
              }
              if((entry.CoversRequired=='C' || entry.CoversRequired=='BC' ) && j==this.tabIndex){
                if(j==this.tabIndex){entry['ContentSuminsured']=this.productItem.ContentSuminsured}
                if(entry.CoversRequired=='C' && j==this.tabIndex){if(entry.ContentSuminsured==null || entry.ContentSuminsured=='' || entry.ContentSuminsured==0){entry['ContentSuminsuredError']=true;i+=1}else{entry['ContentSuminsuredError']=false;}}
              else{entry['ContentSuminsuredError']=false;}
              }
              
              j+=1;
              console.log(this.locationList,"entryentry");
              if(j==this.locationList.length) return i==0;
            }
          }
          onfinalsave(type){
          let buildingList = [];
          let i= 0;
          if(this.TableRowBuilding.length!=0){
            for(let entry of this.TableRowBuilding){
              if(entry.BuildingAddress==undefined || entry.BuildingAddress==null) entry['BuildingAddress'] = null;
              let obj = {  
                "SectionId": "1",
                "Status": "Y",
                "RiskId" : entry.RiskId,
                "RoofType": entry.RoofType,
                "WallType": entry.WallType,
                "BuildingBuildYear": '2024',
                "BuildingOwnerYn": "N",
                "FirstLossPayee": entry.FirstLossPayee,
                "BuildingSumInsured": entry.BuildingSumInsured,
                "BuildingUsageId": entry.BuildingUsageId,
                "WaterTankSi": this.productItem?.WaterTankSi,
                "ArchitectsSi": this.productItem?.ArchitectsSi,
                "LocationName":entry?.LocationName,
                "LossOfRentSi":this.productItem?.LossOfRentSi,
                "TypeOfProperty":this.productItem?.TypeOfProperty,
                "BuildingAddress": entry?.BuildingAddress
            }
            buildingList.push(obj);
            i+=1;
            }
          }
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
               let ReqObj= {
                "CreatedBy":this.loginId,
                "InsuranceId": this.insuranceId,
                "ProductId": this.productId,
                "RequestReferenceNo": this.requestReferenceNo,
                "RiskId": "1",
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
                "BuildingDetails" :buildingList,
            
             "AllRiskDetails" :[
              {
                 "SectionId": "3",
                "AllriskSumInsured": this.productItem?.AllriskSumInsured
             } ],
             "DomesticServant":[
                {
                    "SectionId": "106",
                    "TotalNoOfEmployees": "1",
                    "LiabilityOccupationId": null,
                    "EmpLiabilitySi": this.productItem.DomesticServantSi,
                    "Status": "Y"
                }
            ],
             "EmployeeLiabilityDetails" :[
                {    "SectionId": "36",
                    "TotalNoOfEmployees": "1",     
                    "LiabilityOccupationId": this.productItem.LiabilityOccupationId,
                    "EmpLiabilitySi": this.productItem.EmpLiabilitySi,       
                    "Status": "Y",
                }
            ] ,
            "ContentDetails" :{   
                "SectionId": "47",
                "ContentSuminsured":this.productItem?.ContentSuminsured,
                "Status": "Y",
                "JewellerySi": this.productItem?.JewellerySi,
                "PaitingsSi": this.productItem?.PaitingsSi,
                "CarpetsSi": this.productItem?.CarpetsSi,
                "EquipmentSi":  this.productItem?.EquipmentSis,
            },
            "ElectronicEquipmentDetails":null,
            "PersonalAccidentDetails" : [
                {   "SectionId": "35",
                    "TotalNoOfPersons": "1",  
                    "Status": "Y",
                    "OccupationType": this.productItem.OccupationType,
                    "SumInsured": this.productItem.PersonalAccidentSuminsured,
                    "OtherOccupation":this.productItem.otheroptionPer,
                }
              ]
               }
               if(this.TableRowEE.length!=0){
                  let filterList = this.TableRowEE.filter(ele=>ele.RiskId!=null && ele.RiskId!='' && ele.SumInsured!=null && ele.SumInsured!='0' && ele.SumInsured!=0);
                  if(filterList.length!=0){
                      ReqObj['ElectronicEquipment'] ={
                        "SectionId": "76",
                        "ContentSuminsured": this.productItem.ElectronicEquipmentSI,
                        "Status": "Y",
                        "JewellerySi": "0",
                        "PaitingsSi": "0",
                        "CarpetsSi": "0",
                        "EquipmentSi": "0"
                      };
                      
                  }
                  else ReqObj['ElectronicEquipment'] = null;
               }
               else ReqObj['ElectronicEquipment'] = null;
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
              if((this.productItem?.BuildingSuminsured==null || this.productItem?.BuildingSuminsured==undefined || this.productItem?.BuildingSuminsured=='') && this.Buildings!='Y'){
                ReqObj['BuildingDetails'] = null;
              }
              if(this.coversreuired!='B'){
                if(this.productItem?.ContentSuminsured==null || this.productItem?.ContentSuminsured==undefined || this.productItem?.ContentSuminsured==''){
                  ReqObj['ContentDetails'] = null;
                }
              }
              if(!this.DomesticServant){ReqObj['DomesticServant']=null;}
              if(this.productItem?.AllriskSumInsured==null || this.productItem?.AllriskSumInsured==undefined || this.productItem?.AllriskSumInsured==''){
                ReqObj['AllRiskDetails'] = null;                  
              }
              if(this.productItem?.OccupationType==null || this.productItem?.OccupationType==undefined || this.productItem?.OccupationType==''){
                if(this.productItem?.PersonalAccidentSuminsured==null || this.productItem?.PersonalAccidentSuminsured==undefined || this.productItem?.PersonalAccidentSuminsured==''  || this.productItem?.PersonalAccidentSuminsured=='0'){
                  ReqObj['PersonalAccidentDetails'] = null;      
                }
              }
              if(this.productItem?.LiabilityOccupationId==null || this.productItem?.LiabilityOccupationId==undefined || this.productItem?.LiabilityOccupationId==''){
                if(this.productItem?.EmpLiabilitySi==null || this.productItem?.EmpLiabilitySi==undefined || this.productItem?.EmpLiabilitySi==''  || this.productItem?.EmpLiabilitySi=='0'){
                  ReqObj['EmployeeLiabilityDetails'] = null;    
                }
              }
              if(this.coversreuired!='BC' && this.coversreuired!='B'){
                ReqObj['BuildingDetails'] = null;
              }
              if(this.coversreuired=='B') { ReqObj['ContentDetails'] = null;}
              
              if((this.coversreuired=='B' || this.coversreuired=='BC')){
                if(ReqObj['EmployeeLiabilityDetails']==null && ReqObj['PersonalAccidentDetails'] == null &&  ReqObj['BuildingDetails'] == null && ReqObj['ContentDetails'] == null && ReqObj['AllRiskDetails'] == null){
                  this.errorproceed(1);   
                }
                else if(ReqObj['BuildingDetails']!=null){
                  //if(ReqObj.BuildingDetails[i]?.BuildingSumInsured==0 || ReqObj.BuildingDetails[i]?.BuildingSumInsured=='0' || ReqObj.BuildingDetails[i]?.BuildingSumInsured==null){
                  if(ReqObj.BuildingDetails.length==0  && type!='delete'){
                    this.errorproceed(2);
                  }
                  else{
                    if(type=='delete') ReqObj['BuildingDetails'] = null;
                    this.finalSave(ReqObj,type);
                  }
                }
                else if((this.coversreuired=='C') && (this.productItem?.ContentSuminsured==null || this.productItem?.ContentSuminsured==undefined || this.productItem?.ContentSuminsured=='')){
                  this.error1proceed();
                }
                else this.finalSave(ReqObj,type);
              }
              else if((this.coversreuired=='C') && (this.productItem?.ContentSuminsured==null || this.productItem?.ContentSuminsured==undefined || this.productItem?.ContentSuminsured=='')){
                this.error1proceed();
              }
              else if(this.Buildings=='N') {
                if(ReqObj['EmployeeLiabilityDetails']==null && ReqObj['PersonalAccidentDetails'] == null && ReqObj['ContentDetails'] == null && ReqObj['AllRiskDetails'] == null){
                  this.errorproceed(1);   
                }
                else if(ReqObj['BuildingDetails']!=null){
                  //if(ReqObj.BuildingDetails[i]?.BuildingSumInsured==0 || ReqObj.BuildingDetails[i]?.BuildingSumInsured=='0' || ReqObj.BuildingDetails[i]?.BuildingSumInsured==null){
                   if(ReqObj.BuildingDetails.length==0){
                    this.errorproceed(2);
                   }    
                  // else if(ReqObj.BuildingDetails[i]?.BuildingBuildYear=='' || ReqObj.BuildingDetails[i]?.BuildingSumInsured==null){
                  //   this.errorproceed(3);
                  // }
                  else{
                    this.finalSave(ReqObj,type);
                  }
                }
                else this.finalSave(ReqObj,type);
              }
              else this.finalSave(ReqObj,type);
          }
          finalSave(ReqObj,RequestType){
            let urlLink = `${this.motorApiUrl}api/saveAllSection`;
                  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                    (data: any) => {
                      if (data?.Result) {
                        if(data?.ErrorMessage==null){
                          if(data.Result.length!=0){
                            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                            if(RequestType=='Save')  this.visibleBuilding = false;
                            else{
                              if(this.TableRowBuilding.length==0){
                                  this.TableRowBuilding =[{
                                  id:1,
                                  BuildingUsageId: '',
                                  BuildingBuildYear : '',
                                  FirstLossPayee: '',
                                  BuildingAddress : '',
                                  WallType: '',
                                  RoofType: '',
                                  BuildingSumInsured: 0,
                                  LocationName: '',
                                }]
                                this.currentBuildingRowIndex = this.TableRowBuilding.length-1;
                              }
                              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                              this.onCalculate(data.Result,null);
                            }
                            //this.onCheckUWQuestionProceed(data.Result);
                          }
                        }
                      // }
                      // else {
                      //   this.nextslide=false;
                      // }
                      }
                  },
                  (err) => { },
                  );
          }
          errorproceed(type){
            let text = '';
            if(type==1) text = ' Please Enter One Section Details';
            else if(type==2) text = 'Please Enter Valid Building Sum Insured';
            else if(type==3) text = 'Please Enter Valid Building Year';
            Swal.fire({
              title: '<strong>Form Validations</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                    ${text}
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }

          error1proceed(){
            Swal.fire({
              title: '<strong>Form Validations</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                 Please Enter Content Details
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
          onprofessionalsave(){
            let occupations:any;
            if(this.productItem?.ProfessionalOccupation!=null && this.productItem?.ProfessionalOccupation!='' && this.productItem?.ProfessionalOccupation!=undefined){
              let occ = this.occupationList.find(ele => ele.Code == this.productItem?.ProfessionalOccupation)
               if(occ){
                occupations = occ.label;
               }
            }
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
            let ReqObj={
              "RequestReferenceNo": this.requestReferenceNo,
  "RiskId": "1",
  "ProductId":this.productId,
  "InsuranceId": this.insuranceId,
  "CreatedBy": this.loginId,
  "OccupationId": this.productItem?.ProfessionalOccupation,
  "OccupationDesc": occupations,
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
  "PrincipalDetails": 
    {
      "SectionId": "106",
      "ProfessionalType": '1',
      "EmployeeCount": this.productItem?.EmployeeCounts,
      "IndemnityType": this.productItem?.IndemnityTypes,
      "IndemnitySi": this.productItem?.ProfessionalSI,
      "GrossIncome": this.productItem?.GISI
    }
  ,
  "ProffesoionalStaffDetails": 
    {
      "SectionId": "107",
      "ProfessionalType": '2',
      "EmployeeCount": this.productItem.ProfessionalStaff,
    }
  ,
  "NonProffesoionalStaffDetails": 
    {
      "SectionId": "108",
      "ProfessionalType": '3',
      "EmployeeCount": this.productItem.NonProfessionalStaff
    }
  
              // "RequestReferenceNo": this.requestReferenceNo,
              // "RiskId": "1",
              // "ProductId": this.productId,
              // "SectionId": "106",
              // "InsuranceId": this.insuranceId,
              // "CreatedBy":this.loginId,
              // "OccupationId":this.productItem?.ProfessionalOccupation,
              // "OccupationDesc":"Adocate",
              // "ProfessionalType":this.productItem?.ProfessionalType,
              //  "EmployeeCount": this.productItem?.EmployeeCounts,
              //  "IndemnityType": this.productItem?.IndemnityTypes,
              //  "IndemnitySi":this.productItem?.ProfessionalSI,
              //  "GrossIncome":this.productItem?.GISI,
              //  "EndorsementDate": endorsementDate,
              //  "EndorsementEffectiveDate": EndorsementEffectiveDate,
              //  "EndorsementRemarks": EndorsementRemarks,
              //  "EndorsementType": EndorsementType,
              //  "EndorsementTypeDesc": EndorsementTypeDesc,
              //  "EndtCategoryDesc": EndtCategoryDesc,
              //  "EndtCount": EndtCount,
              //  "EndtPrevPolicyNo": EndtPrevPolicyNo,
              //  "EndtPrevQuoteNo": EndtPrevQuoteNo,
              //  "EndtStatus": EndtStatus,
              //  "IsFinanceEndt": IsFinanceEndt,
              //  "OrginalPolicyNo": OrginalPolicyNo,
            
            }
            let urlLink = `${this.motorApiUrl}api/slide7/saveprofindernity`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data?.Result) {
                  if(data.Result.length!=0){
                    this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                    sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                    this.onCalculate(data.Result,null);
                   
                    //this.onCheckUWQuestionProceed(data.Result);
                  }
                  
                // }
                // else {
                //   this.nextslide=false;
                // }
                }
            },
            (err) => { },
          );
          
          }


          onSavePersonalAccidentDetails(){
            this.subuserType = sessionStorage.getItem('typeValue');
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo')
            let appId = "1",loginId="",brokerbranchCode="";
            let createdBy="";
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                // brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
                //   createdBy = this.commonDetails[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
                if(this.userType!='Issuer'){
                  // this.brokerCode = this.agencyCode;
                  // appId = "1"; loginId=this.loginId;
                  // brokerbranchCode = this.brokerbranchCode;
                }
                else{
                  appId = this.loginId;
                  // loginId = this.commonDetails[0].LoginId;
                  // loginId = this.updateComponent.brokerLoginId
                  // brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
                }
              }
              let emp = [ {
                "InsuranceId": this.insuranceId,
                "CreatedBy": createdBy,
                "ProductId": this.productId,
                "RequestReferenceNo": this.requestReferenceNo,
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
                    sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                    this.nextslide3=true;
                    // this.onCalculate(data?.Result,'PersonalAccident');
                    // if(type=='proceed'){
                    //   if(this.commonDetails){
                    //     if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                    //       if(!this.commonDetails[0].SectionId.some(ele=>ele=='35')) this.commonDetails[0].SectionId.push('35');
                    //     }
                    //     else  this.commonDetails[0]['SectionId']=['35'];
                    //   }
                    //   sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
                    // }
                    //  this.onCheckUWQuestionProceed(data.Result,type,formType);
                  }
                  else {
                    this.nextslide3=false;
                  }
              },
              (err) => { },
            );
          }

          getBuildingDetails(type){
            
            let ReqObj = {
              // "RequestReferenceNo": this.requestReferenceNo,
              // // "RiskId": "1",
              // "SectionId":  "1"
              // "RequestReferenceNo": this.requestReferenceNo,
              // "SectionId": "1"
            
                "RequestReferenceNo": this.requestReferenceNo,
                "SectionId": "1" 
           
            }
            let urlLink = `${this.motorApiUrl}api/slide14/getbuilding`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data.Result) {
                  
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
                      console.log("Products in Building",this.productItem);
                      if(this.requestReferenceNo){
                        this.editsections('Building');
                      }
                }
              },
              (err) => { },
            );
          }
          getAddInfo(){
            if(this.requestReferenceNo!=null){
              let ReqObj = {
                "RequestReferenceNO": this.quoteRefNo,
                "SectionId": "1"
              }
            let urlLink = `${this.motorApiUrl}api/getbuildingdetails`;
              this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                  if (data.Result) { 
                    console.log(data.Result,"this.LocationNamethis.LocationName");
                    if(this.contentSection){
                      
                      this.onEditLocationDetails(data.Result);
                    }
                    else{
                      let i = 0
                      for(i; i < data.Result.length; i++){
                          
                      }
                    }
                  }
                  
                },
                (err) => { },
              );
            }
            else{if(this.contentSection)this.onEditLocationDetails([]);}
          }

          getDomesticServantDetails(type){
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo,
              "QuoteNo": null,
              "SectionId":  "106"
            }
            let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if (data.Result) {
                  if(data.Result.PersonalDetails){
                    this.currentDSRowIndex = null;
                    this.TableRowDS = data.Result.PersonalDetails;
                    for(let entry of this.TableRowDS){
                      entry['Name'] = entry?.PersonName;
                      entry['SumInsured'] = entry?.Salary;
                      entry['Nationality'] = entry?.NationalityId;
                      if(entry.RiskId) this.onChangeContentLocation(entry);
                    }
                    this.getOccupationList('36','DomesticServant');
                    this.editsections('DomesticServant');
                  }
                  else{this.productItem.LiabilityOccupationId = null;this.productItem.PersonalIntermediarySuminsured='0';this.productItem.EmpLiabilitySi=null; 
                  this.getOccupationList('36','DomesticServant');
                  this.editsections('DomesticServant');
                  }
                }
                this.newselectedIndex+=1;
                this.editsections(type);
              },
              (err) => { },
            );
          }
          getPersonalLiabilityDetails(type){
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo,
              "QuoteNo": null,
              "SectionId":  "36"
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
                      if(entry.RiskId) this.onChangeContentLocation(entry);
                    }
                    this.getOccupationList('36','PersonalLiability');
                    this.editsections('PersonalLiability');
                  }
                  else{this.productItem.LiabilityOccupationId = null;this.productItem.PersonalIntermediarySuminsured='0';this.productItem.EmpLiabilitySi=null; 
                  this.getOccupationList('36','PersonalLiability');
                  this.editsections('PersonalLiability');
                  }
                }
                this.newselectedIndex+=1;
                this.editsections(type);
              },
              (err) => { },
            );
          }

          getPersonalAccidentDetails(type){
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo,
              "QuoteNo": null,
              "SectionId":  "35"
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
                      if(entry.RiskId) this.onChangeContentLocation(entry);
                    }
                    this.getOccupationList('35','PersonalAccident');
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
                  this.getOccupationList('35','PersonalAccident');
                }
                this.editsections(type);
                  //this.onoccChangepersonal('Direct');
                  this.newselectedIndex+=1;
                
                }
                   
              },
              (err) => { },
            );
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
                  if(entry.LocationName!=null && entry.LocationName!='' && entry.LocationName!=undefined && entry.LocationName!=0) entry['LocationError']=false;
                  else{ j+=1; entry['LocationError']=true;}
                  if(entry.FirstLossPayee!=null && entry.FirstLossPayee!='' && entry.FirstLossPayee!=undefined && entry.FirstLossPayee!=0) entry['FirstLossPayeeError']=false;
                  else{ j+=1; entry['FirstLossPayeeError']=true;}
                  let entryList = this.TableRowBuilding.filter(ele=>(ele.RiskId==entry.RiskId) && ele.RiskId!=null && ele.RiskId!='');
                  if(entryList.length>1){
                    j+=1;
                    for(let obj of entryList) obj['DuplicateError'] = true;
                  }
                  else{entry['DuplicateError']=false}
                    let data = {
                        "ItemId":entry.ItemId,
                        "RiskId":entry.RiskId,
                        "BuildingUsageId":entry.BuildingUsageId,
                        "BuildingBuildYear": entry.BuildingBuildYear,
                        "WallType":entry.WallType,
                        "RoofType":entry.RoofType,
                        "BuildingSumInsured":entry.BuildingSumInsured,
                        "LocationName": entry.LocationName,
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
                      "LocationName": entry.LocationName
                    }
                    additionalList.push(additonalData);
                    reqList.push(data);
                    i+=1;
                    if(i==this.TableRowBuilding.length && j==0){
                        this.onfinalsave('Save');
                    }
              }
            }
            else{this.onfinalsave('delete');
            }
          }
          SaveBuildingList(datas){
              
                let urlLink = `${this.motorApiUrl}api/buildingdetails`;
                  this.sharedService.onPostMethodSync(urlLink, datas).subscribe(
                    (data: any) => {
                      if (data?.Result) {
                        if(data.Result.length!=0){
                          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                        }
                      }
                  },
                  (err) => { },
                );
            
          }
          
        
          onSaveBuildingDetails(){
            this.subuserType = sessionStorage.getItem('typeValue');
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            let appId = "1",loginId="",brokerbranchCode="";
            let createdBy="";
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                // brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
                //   createdBy = this.commonDetails[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
                if(this.userType!='Issuer'){
                  // this.brokerCode = this.agencyCode;
                  // appId = "1"; loginId=this.loginId;
                  // brokerbranchCode = this.brokerbranchCode;
                }
                else{
                  appId = this.loginId;
                  // loginId = this.commonDetails[0].LoginId;
                  // loginId = this.updateComponent.brokerLoginId
                  // brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
                }
              }
              let insuranceForList = [];
              if (this.productItem.InsuranceForId != null) {
                insuranceForList = Object.keys(this.productItem.InsuranceForId);
              }
              let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
              if (refNo!=undefined && refNo!="undefined") {
                reqRefNo = sessionStorage.getItem('quoteReferenceNo')
              }
              if(reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
                let ReqObj = {
                  "CreatedBy": createdBy,
                  "InsuranceId": this.insuranceId,
                  "ProductId": this.productId,
                  "RequestReferenceNo": reqRefNo,
                  "RiskId": "1",
                  "SectionId":  "1",
                  "RoofType": this.productItem.RoofType,
                  "WallType": this.productItem.WallType,
                  "BuildingBuildYear": this.productItem.BuildingBuildYear,
                  "BuildingOwnerYn": "N",
                  "BuildingSumInsured": this.productItem.BuildingSuminsured,
                  "BuildingUsageId": this.productItem.BuildingUsageId,
                  "WaterTankSi": this.productItem?.WaterTankSi,
                  "ArchitectsSi": this.productItem?.ArchitectsSi,
                  "LossOfRentSi":this.productItem?.LossOfRentSi,
                  "TypeOfProperty":this.productItem?.TypeOfProperty,
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
                  "PolicyNo": this.endorsePolicyNo,
                  "Status": "Y",
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
            let urlLink = `${this.motorApiUrl}api/slide14/savebuilding`;
                this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                  (data: any) => {
                    if (data?.Result) {
                      if(data.Result.length!=0){
                        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                        this.nextslide=true;
                        // this.onCalculate(data.Result,'Building');
                       
                        //this.onCheckUWQuestionProceed(data.Result);
                      }
                      
                    }
                    else {
                      this.nextslide=false;
                    }
                },
                (err) => { },
              );
          }
          getElectronicEquipDetails(type){
            let ReqObj = {
              "RequestReferenceNO": this.requestReferenceNo,
              "SectionId": '76'
            }
            let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data.Result) {
                  if(data.Result.ContentRiskDetails){
                    this.TableRowEE = data?.Result?.ContentRiskDetails;
                    if(this.TableRowEE.length!=0){
                      if(this.TableRowEE.length>1 || (this.TableRowEE[0].SumInsured!=null && this.TableRowEE[0].SumInsured!=0)) this.currentEERiskRowIndex = null;
                    }
                    if(this.TableRowEE.length!=0){
                      for(let entry of this.TableRowEE){
                        this.onChangeContentLocation(entry);
                        entry['Content'] = entry?.ItemValue;
                        entry['Serial'] = entry?.SerialNo;
                        entry['Description'] = entry?.SerialNoDesc;
                      }
                    }
                  } 
                  else{
                    this.TableRowEE =[{
                      id:1,
                      ItemId:'',
                      Content: '',
                      Serial : '',
                      Description: '',
                      SumInsured: 0,
                    }];
                  } 
                }
                this.editsections('ElectronicEquipment');
                this.newselectedIndex+=1;
              },
              (err) => { },
            );
          }
          getAllRiskDetails(type){
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo,
              "SectionId": '3'
            }
            let urlLink = `${this.motorApiUrl}api/slide2/getallriskdetails`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data.Result) {
                      this.productItem.AllriskSumInsured = data?.Result?.AllriskSumInsured;
                      console.log("Products",this.productItem)
                }
                this.editsections('AllRisk');
                this.newselectedIndex+=1;
              },
              (err) => { },
            );
          }
          onSaveAllRiskDetails(){
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
                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  this.nextslide2=true;
                }
                else {
                  this.nextslide2=false;
                }
              },
              (err) => { },
            );
          }


          onSavePersonalLiability(){
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
                    //this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                    sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                      if(this.commonDetails){
                        if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                          if(!this.commonDetails[0].SectionId.some(ele=>ele=='36')) this.commonDetails[0].SectionId.push('36');
                        }
                        else  this.commonDetails[0]['SectionId']=['36'];
                      }
                    // sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) 
                    this.nextslide4=true;
                    // this.onCalculate(data.Result,'PersonalLiability');
                    
                  //this.onCheckUWQuestionProceed(data.Result);
                  }
                  else {
                    this.nextslide4=false;
                  }
              },
              (err) => { },
            );
          } 
          saveCommonDetails(section){
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
                //loginId = this.brokerLoginId
                brokerbranchCode = null;
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
              //sourcecode=this.Code
            }
            else{
              sourcecode=sessionStorage.getItem('typeValue')
            }
            let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
            if (homeDetails) {
              if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") 
              this.commonDetails = homeDetails;
            }
            if( this.productId=='59'){this.IndustryId='99999'};
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
                "ProductType": "Asset",
                "TiraCoverNoteNo": null,
                "RequestReferenceNo": this.quoteRefNo,
                "AgencyCode": this.agencyCode,
                "ApplicationId": this.applicationId,
                "BdmCode": this.customerCode,
                "BranchCode": this.branchCode,
                "BrokerBranchCode": brokerbranchCode,
                "BrokerCode": this.brokerCode,
                "BuildingOwnerYn": this.Buildings,
                "Createdby": this.loginId,
                "SourceTypeId":sourcecode,//this.Code
                "Currency": this.currencyCode,
                "CustomerReferenceNo": this.CustomerReferenceNo,
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
                      this.NewSection=sections.length;
                          this.onNextProceed(sections);
                       
                }
              },
              (err) => { },
            );
          }

          onNextProceed(sections){
            this.selectedIndex=0;
            if(sections){
              let i=0;let j:any
                let se= sections.some(ele => ele == '1')
                if(se){
                  this.onSaveBuildingDetails();
                  this.selectedIndex +=1;
                }
                else {
                  this.nextslide = true;
                }
              
                let se1= sections.some(ele => ele == '47')
                if(se1){
                 this.onSaveContentRiskDetails();
                 this.selectedIndex +=1;
                }
                else {
                  this.nextslide1 = true;
                }
                let se2= sections.some(ele => ele == '3')
                if(se2){
                 this.onSaveAllRiskDetails();
                 this.selectedIndex +=1;
                }
                else {
                  this.nextslide2 = true;
                }
                let se3= sections.some(ele => ele == '35')
                if(se3){
                 this.onSavePersonalAccidentDetails();
                 this.selectedIndex +=1;
                }
                else {
                  this.nextslide3 = true;
                }
                let se4= sections.some(ele => ele == '36')
                if(se4){
                 this.onSavePersonalLiability();
                 this.selectedIndex +=1;
                }
                else {
                  this.nextslide4 = true;
                }
             }
           
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
                console.log(data);
                if(data.Result){
                  let details = data.Result;
                  this.commonSectionList = data.Result.SectionIds;
                  let startDate=null,endDate=null;
                  this.policyStartDate = details.PolicyStartDate;
                    this.policyEndDate = details.PolicyEndDate;
                    this.exchangeRate = details.ExchangeRate;
                    this.customerCode = details.CustomerCode;
                    this.customerName = details.CustomerName;
                    this.CustomerReferenceNo = details?.CustomerReferenceNo;
                    if(this.productId =='59') this.getSectionList();
                  // this.productItem = new ProductData();
                  // this.productItem.BuildingOwnerYn = 'Y';
                  //this.dobminDate = new Date();
                }
                // if(!this.activeSection){this.activeSection=true;this.setProductSections();}
              });
          }


          getCalculationDetails(vehicleDetails) {
            let createdBy = "";
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if (quoteStatus == 'AdminRP') {
              //createdBy = this.vehicleDetailsList[0].CreatedBy;
            }
            else {
              createdBy = this.loginId;
            }
            if (this.productId != '59') {
              let sectionId = null;
              if (this.productId == '13') sectionId = '35';
              else if (this.productId == '14') sectionId = '37';
              else if (this.productId == '15') sectionId = '38';
              else if (this.productId == '32') sectionId = '43';
              let effectiveDate = null;
              if (this.endorsementSection) {
                effectiveDate = this.endorseEffectiveDate;
              }
              else {
                effectiveDate = this.commonDetails[0].PolicyStartDate;
              }
              let ReqObj = {
                "InsuranceId": this.insuranceId,
                "BranchCode": this.branchCode,
                "AgencyCode": this.agencyCode,
                "SectionId": sectionId,
                "ProductId": this.productId,
                "MSRefNo": vehicleDetails?.MSRefNo,
                "VehicleId": vehicleDetails?.VehicleId,
                "CdRefNo": vehicleDetails?.CdRefNo,
                "VdRefNo": vehicleDetails?.VdRefNo,
                "CreatedBy": createdBy,
                "productId": this.productId,
                "sectionId": sectionId,
                "RequestReferenceNo": this.requestReferenceNo,
                "EffectiveDate": effectiveDate,
                "PolicyEndDate": this.commonDetails[0].PolicyEndDate
              }
              let urlLink = `${this.CommonApiUrl}calculator/calc`;
              this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                  let res: any = data;
                  let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                  if (homeDetails) {
                    if (this.productId != '59') {
                      if (homeDetails.SectionId == undefined || homeDetails.SectionId == "undefined") homeDetails['SectionId'] = [sectionId];
                      sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                    }
          
                  }
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          
                },
                (err) => { },
              );
            }
            else if (vehicleDetails.length != 0) {
              let i = 0;
              for (let veh of vehicleDetails) {
                let effectiveDate = null; let coverModificationYN = 'N';
                if (this.endorsementSection) {
                  effectiveDate = this.endorseEffectiveDate;
                  // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
                  // if (entry || (this.endorsementId == 846 && veh.Status =='D')) coverModificationYN = 'Y';
                  // else coverModificationYN = 'N';
                  if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
                }
                else {
                  effectiveDate = this.commonDetails[0].PolicyStartDate;
                }
          
                let ReqObj = {
                  "InsuranceId": this.insuranceId,
                  "BranchCode": this.branchCode,
                  "AgencyCode": this.agencyCode,
                  "SectionId": veh.SectionId,
                  "ProductId": this.productId,
                  "MSRefNo": veh?.MSRefNo,
                  "VehicleId": veh?.VehicleId,
                  "CdRefNo": veh?.CdRefNo,
                  "VdRefNo": veh?.VdRefNo,
                  "CreatedBy": createdBy,
                  "productId": this.productId,
                  "sectionId": veh.SectionId,
                  "RequestReferenceNo": this.requestReferenceNo,
                  "EffectiveDate": effectiveDate,
                  "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
                  "CoverModification": coverModificationYN
                }
                let urlLink = `${this.CommonApiUrl}calculator/calc`;
                this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                  (data: any) => {
                    let res: any = data;
                    i += 1;
                    if (i == vehicleDetails.length) {
          
                      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
                    }
                  },
                  (err) => { },
                );
              }
            }
          }


          onSaveUWQues(uwList, entry,type) {
            if (uwList.length != 0) {
              let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
              this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
                (data: any) => {
                  if (data.Result) {
                    if (this.productId == '19' || this.productId == '59' || this.productId=='24') {
                      this.onFinalProceed();
                    }
                    else { this.onCalculate(entry,type); }
                  }
                },
                (err) => { },
              );
            }
            else{
              if (this.productId == '19' || this.productId == '59' || this.productId=='24') {
                this.onFinalProceed();
              }
              else { this.getCalculationDetails(entry); }
            }
          }

          onCalculate(buildDetails,type) {
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
                if (this.endorsementSection) {
                  effectiveDate = this.endorseEffectiveDate;
                  // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
                  // if (entry || this.endorsementId == 846) coverModificationYN = 'Y';
                  // else coverModificationYN = 'N';
                  if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
                }
                else {
                  effectiveDate = this.policyStartDate;
                
                }
                if(this.productId=='46') build['RiskId'] = '1';
                let sectionId = '';
                let locationId = '1';
                if(build.LocationId) locationId = build.LocationId
          console.log('build.SectionId',build.SectionId)
                let ReqObj = {
                  "InsuranceId": this.insuranceId,
                  "BranchCode": this.branchCode,
                  "AgencyCode": this.agencyCode,
                  "SectionId": build.SectionId,
                  "ProductId": this.productId,
                  "LocationId": locationId,
                  "MSRefNo": build.MSRefNo,
                  "VehicleId": build.RiskId,
                  "CdRefNo": build.CdRefNo,
                  "VdRefNo": build.VdRefNo,
                  "CreatedBy": this.loginId,
                  "productId": this.productId,
                  "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
                  "EffectiveDate": effectiveDate,
                  "PolicyEndDate": this.policyEndDate,
                  "CoverModification": coverModificationYN
                }
                let urlLink = `${this.CommonApiUrl}calculator/calc`;
                this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                  (data: any) => {
                    if (data) {
                      let entry = data?.Result;
                      i += 1;
                      if (i == buildDetails.length) {
                      //  console.log('newsections',this.selectedIndex == this.NewSection,this.nextslide, this.nextslide1,this.nextslide2,this.nextslide3 ,this.nextslide4)
                      //   if(this.selectedIndex == this.NewSection && this.nextslide && this.nextslide1 && this.nextslide2 && this.nextslide3 && this.nextslide4){
                          if(this.productId=='63' || this.productId=='59'){
                            if((type=='Save' && this.LocationName.length==(this.tabIndex+1)) || type=='Submit' ){
                                  this.onFinalProceed();
                            }
                            else{ this.tabIndex+=1;if(this.uwQuestionList.length!=0)this.getEditUwQuestions()}
                          }
                          else this.onFinalProceed();
                        // }
                        // this.onFinalProceed();
                        // if(formType=='Group'){
                        //   if(type=='save'){this.selectedIndex +=1;
                        //     this.onNextProceed();
                        //     //this.myStepper.next();
                        //   }
                        //   else{this.onFinalProceed();}
                        // }
                        // else if(type!='save'){ this.onFinalProceed();}
                      }
                    }
                  },
                  (err) => { },
                );
              }
            }
          }

          onSaveUWQuestions(uwList,buildDetails,index) {
            if (uwList.length != 0) {
              let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
              this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
                (data: any) => {
                  if (data.Result) {
                      if(index==buildDetails.length) {}
                      //this.onCalculate(buildDetails)
                  }
                },
                (err) => { },
              );
            }
          }
          onSIValueChange (args) {
            if (args.key === 'e' || args.key === '+' || args.key === '-') {
              return false;
            } else {
              return true;
            }
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
          onFinalProceed() {
            this.saveFleetDetails();
            //this.router.navigate(['/quotation/plan/premium-details']);
            //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
          saveFleetDetails(){
            if(this.productId!='46'){
              let Reqobj={
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
            else this.router.navigate(['/quotation/plan/premium-details']);
          }
          getFleetCalc(res){
            let startDate = this.policyStartDate,endDate =this.policyEndDate
            //this.updateComponent.vehicleDetails = this.vehicleDetails;
            let effectiveDate=null;
            if(this.endorsementSection){
                effectiveDate = this.endorseEffectiveDate;
            }
            else {
              if(this.policyStartDate){
                if(this.policyStartDate.includes('/')) effectiveDate = this.policyStartDate;
                else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
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
            if(this.insuranceId!='100028' && this.insuranceId!='100027' && this.insuranceId!='100040' && this.insuranceId!='100042' && this.insuranceId!='100019'){
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
          onCheckUWQuestionProceed(buildDetails){
            //,type,formType
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
                        if(uwList.length!=0) this.onSaveUWQuestions(uwList,buildDetails,j);
                        //type,formType
                        else if(j==buildDetails.length) {//this.onCalculate(buildDetails)
                        }
                        //type,formType
                      }
                    }
                  }
              }
              // else this.onCalculate(buildDetails)
              //,type,formType
            }
          }

          setCommonFormValues(){
            let refNo = sessionStorage.getItem('quoteReferenceNo');
            if(refNo==undefined) refNo = this.requestReferenceNo
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo,
              "RiskId": "1",
              "SectionId":  null
            }
            let urlLink = null;
          if(this.productId=='57'){ReqObj.SectionId='45';urlLink=`${this.motorApiUrl}api/slide13/getpersonlaaccident`;}
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data.Result) {
                    let details = data?.Result;
                    if(this.productId=='57'){
                      this.getOccupationList('45','direct')
                      this.GroupListNew = data.Result.filter(ele=>ele.OccupationType!=null && ele.OccupationType!='');
                      if(this.GroupListNew.length!=0){
                        this.listSectionGroup = true;
                        this.listnGroup = false;
                      }
                    }
                }
              },
              (err) => { },
            );
          }

          onsaveGroupPADetails(){
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
                          this.onCheckUWQuestionProceed(data.Result);
                        }
                      });
                    }
                  }
              }
            }
          }



          getCommonnDetails(){
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
                console.log(data);
                if(data.Result){
                  let details = data.Result;
                  let startDate=null,endDate=null;
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
                  this.currencyCode = this.commonDetails[0].Currency
          
                  this.ProductCode = details.SectionIds[0];
                  if(this.productId=='56'){
                      
                      //let fireData = new EmployersLiability();
                    let fireData = new HealthInsurance();
                    this.fields[0] = fireData?.fields[0];
                    console.log("Final Fields",this.fields)
                      let entry = [];
                      // this.AddNewFunc();

                    //   let modelHooks = { onInit: (field: FormlyFieldConfig) => {
                    //     field.formControl.valueChanges.subscribe(() => {
                    //       this.onoccChangepersonalInd('change');
                    //     });
                    //   } 
                    // }
                    // this.fields[0] = fireData?.fields[0];
              
                      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                      this.showSection=true;
                      if (referenceNo) {
                        this.requestReferenceNo = referenceNo;
                        this.getSectionList();
                        //this.setCommonFormValues();
                        this.setCommonFormValues1();
                        this.getRelationTypeList('direct');
                        console.log('FIIIIIIIIIIIIIII',this.fields[0].fieldGroup[0]);
                        // this.productItem = new ProductData();
                       
                      }
                      else {
                          // this.productItem = new ProductData();
                          this.formSection = true; this.viewSection = false;
                      }
                  }
                  // this.productItem = new ProductData();
                  this.productItem.BuildingOwnerYn = 'Y';
                  this.dobminDate = new Date();
                }
                // if(!this.activeSection){this.activeSection=true;this.setProductSections();}
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
                  let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }];
                  this.sectionDropdownList = defaultObj.concat(data.Result);
                  let i=0;
                  for(let n of this.sectionDropdownList){
                  console.log('HJGGGGG',n.CodeDesc)
                    if(this.productId=='59'){
                        if(this.commonSectionList.some(ele=>ele==n.Code)){
                          if(n.Code== '1'){
                            this.Building1=true;
                          }
                          if(n.Code =='47'){
                            this.Content=true;
                          }
                          if(n.Code =='76'){
                            this.ElecEquipment=true;
                          }
                          if(n.Code == '3'){
                            this.AllRisk=true;
                          }
                          if(n.Code == '36'){
                            this.PersonalAccident=true;
                          }
                          if(n.Code =='106'){
                            this.DomesticServant=true;
                          }
                          if(n.Code == '35'){
                            this.personalIndemity=true;
                          }
                        }
                        i+=1;
                    }
                    else{
                      
                      if(n.Code== '1'){
                        this.Building1=true;
                      }
                      if(n.Code =='47'){
                        this.Content=true;
                      }
                      if(n.Code =='76'){
                        this.ElecEquipment=true;
                      }
                      if(n.Code == '3'){
                        this.AllRisk=true;
                      }
                      if(n.Code == '36'){
                        this.PersonalAccident=true;
                      }
                      if(n.Code =='106'){
                        this.DomesticServant=true;
                      }
                      if(n.Code == '35'){
                        this.personalIndemity=true;
                      }
                      i+=1;
                    }
                  }
                }
              });
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


          getProfessional(){
            let ReqObj = {
              "InsuranceId":this.insuranceId,
              "ProductId": this.productId,
              "SectionLevelReq":[
                 {
              "RequestReferenceNo": this.requestReferenceNo,
                "RiskId": "53",
             "SectionId": '106'
                 },
                 {
                  "RequestReferenceNo": this.requestReferenceNo,
                    "RiskId": "53",
                 "SectionId": '107'
                     },
                     {
                      "RequestReferenceNo": this.requestReferenceNo,
                        "RiskId": "53",
                     "SectionId": '108'
                         },
              ]
            }
            let urlLink = `${this.motorApiUrl}api/slide15/gethumantype`;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                this.productItem = new ProductData();
              if(data.Result){
                let datas= data?.Result[0];
                this.productItem.ProfessionalOccupation = datas?.OccupationId;
              
                this.productItem.ProfessionalType= datas?.ProfessionalType;
                this.productItem.EmployeeCounts=datas?.EmployeeCount;
                this.productItem.GISI = datas?.GrossIncome;
                  this.productItem.IndemnityTypes=datas?.InternityType;
                  this.productItem.ProfessionalSI = datas?.IndernitySI;
                  let datas1= data?.Result[1];
                  let datas2= data?.Result[2];
                  this.productItem.ProfessionalStaff=datas1?.EmployeeCount;
                  this.productItem.NonProfessionalStaff=datas2?.EmployeeCount;
                // "OccupationId":this.productItem?.ProfessionalOccupation,
                // "OccupationDesc":"Adocate",
                // "ProfessionalType":this.productItem?.ProfessionalType,
                //  "EmployeeCount": this.productItem?.EmployeeCounts,
                //  "IndemnityType": this.productItem?.IndemnityTypes,
                //  "IndemnitySi":this.productItem?.ProfessionalSI,
                //  "GrossIncome":this.productItem?.GISI,
                // console.log('Daaaaaaaaaaaaa',datas);
              }
              },
              (err) => { },
            );
          }
          onSaveHealthInsurance(){
            let list = [],i=0;
            for(let entry of this.productItem.patientList){
              let obj = entry;
              if(entry.DateOfBirth!=null && entry.DateOfBirth!=undefined){
                let dateList = String(entry.DateOfBirth).split('/');
                if(dateList.length>1){}
                else obj.DateOfBirth = this.datePipe.transform(entry.DateOfBirth,'dd/MM/yyyy');
              }
              obj['CreatedBy'] = this.loginId;
              obj['InsuranceId'] = this.insuranceId;
              obj['ProductId'] = this.productId;
              obj['RiskId'] = String(i+1);
              obj['SectionId'] = this.ProductCode;
              obj['RequestReferenceNo'] = this.requestReferenceNo;
              list.push(obj);
              i+=1;
              if(i==this.productItem.patientList.length){
                    let urlLink = `${this.motorApiUrl}api/slide15/savehealthinsure`;
                    this.sharedService.onPostMethodSync(urlLink, list).subscribe(
                      (data: any) => {
                          if (data?.Result) {
                  if(data.Result.length!=0){
                    this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                    sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                    this.onCalculate(data.Result,null);
                   
                    //this.onCheckUWQuestionProceed(data.Result);
                  }
                  
                // }
                // else {
                //   this.nextslide=false;
                // }
                }
                        // if (data?.Result) {
                        //   if (data?.Result.length!=0) {
                        //     this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                        //     sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                        //       if(this.commonDetails){
                        //         if(this.commonDetails[0].SectionId !=null && this.commonDetails[0].SectionId.length!=0){
                        //           if(!this.commonDetails[0].SectionId.some(ele=>ele==this.ProductCode)) this.commonDetails[0].SectionId.push(this.ProductCode);
                        //         }
                        //         else  this.commonDetails[0]['SectionId']=[this.ProductCode];
                        //       }
                        //     sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) 
                           
                        //   }
                        // }
                      });
              }
            }
            console.log("Final List",this.productItem.patientList);
          }


          setCommonFormValues1(){
            let refNo = sessionStorage.getItem('quoteReferenceNo');
            if(refNo==undefined) refNo = this.requestReferenceNo
            let ReqObj = {
              "RequestReferenceNo": this.requestReferenceNo,
              "RiskId": "1",
              "SectionId":  null
            }
            let urlLink = null;
           
            if(this.productId=='56'){ReqObj.SectionId=this.ProductCode;urlLink=`${this.motorApiUrl}api/slide15/gethealthinsure`;}
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if (data.Result) {
                    let details = data?.Result;
                   
                    if(this.productId=='56'){
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
                            entry.DateOfBirth =this.onDateFormatInEdit(entry.DateOfBirth)
                            // let dateList = String(entry.DateOfBirth).split('/');
                            // if(dateList.length>1){
                            //   entry.DateOfBirth = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
                            // }
                          }
                          if(i==0){
                            this.ProductCode = s.SectionId;
                            if(entry.RelationType==null || entry.RelationType=='') entry.RelationType = '1';
                          }
                          else if(entry.RelationType==null || entry.RelationType==undefined) entry.RelationType = '';
                          this.productItem.patientList.push(entry);
                          console.log('MNNNNNGGGGGGGGGGGGG',this.productItem?.patientList)
                          i+=1;
                          if(i==details.length){this.getRelationTypeList('direct');}
                          this.showsection=true;
                        }
                      
                    }
                }
              },
              (err) => { },
            );
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


          setSMEForm() {
    
            // let sections:any[] = this.commonDetails[0].SectionId;
            //let section = sections.filter(ele => ele=='42')
            this.tab = new FormlyFieldTabs();
            this.fields = [
              {
                type: 'tabs',
                fieldGroup: [
                  
                  
                ],
              }
            ];
            
            // if(sections){
              // console.log('sectionssss',sections)
              this.showSection = true;
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
                //this.getbuildingpurposeList();
                if(this.insuranceId =='100004'){
                  this.getTypeOfProperty();
                }

                let contentData1 = new HouseHoldContents();
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData1?.fields]);

                let contentData2:any; 
                if(this.insuranceId=='100004'){
                  contentData2 = new AllRiskss();
                }
                else {
                  contentData2 = new AllRisk();
                }
                let contentData5:any; 
                if(this.insuranceId=='100004'){
                  contentData5 = new AllRiskss();
                }
                else {
                  contentData5 = new AllRisk();
                }
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData2?.fields])
       
                let contentData3 = new PersonalLiability();
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData3?.fields])
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData5?.fields]);
                let fireData = new ElectronicEquipment();
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData?.fields]);

                let contentData4 = new PersonalAccident();
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData4?.fields]);

             
                let fireData1 = new BussinessAllRisk();
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData1?.fields]);

             
                let contentData6
                if(this.productId!='24'){
                  contentData6 = new HouseHoldContentsss();
                }
                else{
                  contentData6 = new HouseHoldContents();
                }
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData6?.fields]);
          
                let contentData7 = new PublicLiability();
               this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData7?.fields]);

                let fireData3 = new FireAlliedPerils();
                let entry = [];
                entry.push(fireData?.fields);
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData3?.fields]);

                let contentData9 = new MachineryBreakDown();
                let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
                  field.formControl.valueChanges.subscribe(() => {
                      this.checkMachineryYNChanges()
                  });
                }};
                // let groupList = contentData9.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
                // let i=0;
                // for(let group of groupList){
                //    group.fieldGroup[0].hooks = checkYnHooks;
                //    i+=1;
                //    if(i==groupList.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData9?.fields]); this.checkMachineryYNChanges()}
                // }
   
                  let employeeData = new EmployersLiabilitytwo();
                  let field = {
                    props: { label: 'Employers Liability' },
                    fieldGroup: employeeData.fields
                  }
                  let modelHooks = { onInit: (field: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(() => {
                      //this.onoccChange('change');
                    });
                  } }
                  this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field]);
                  console.log('SectionEmployeers', this.fields[0].fieldGroup);
                  for(let field of this.fields[0].fieldGroup){
                    console.log('Formly Fields',field.props.label)
                    if(field.props.label=='Employers Liability'){
                      this.fieldsEmployee = field.fieldGroup;
                      // console.log('Fedilitysss',field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0]);
                      // console.log('Empliablity',this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup[0]);
                    }
                  }
                  if(this.fieldsEmployee){
                    //this.fieldsEmployee[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
                  }
              
                  let fidelity = new Fidelitytwo();
                  //let fidelity = new Fidelity();
                  let field1 = {
                    props: { label: 'Fidelity' },
                    fieldGroup: fidelity.fields
                  }
                  let modelHooks1 = { onInit: (field: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(() => {
                      //this.onoccFedilityChange('change');
                    });
                  } }
                  this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field1]);
                  for(let field of this.fields[0].fieldGroup){
                    console.log('Formly Fields',field.props.label)
                    if(field.props.label=='Fidelity'){
                     // this.fieldsFidelity = field.fieldGroup;
                    }
                  }
                  // if(this.fieldsFidelity){
                  //   this.fieldsFidelity[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].hooks = modelHooks;
                  // }
                
                
                this.productItem.employeeList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
                 this.productItem.fidelityList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
                    let money = new Money();
                    let checkYnHooks1 ={ onInit: (field: FormlyFieldConfig) => {
                      field.formControl.valueChanges.subscribe(() => {
                          // this.checkMoneyYNChanges()
                      });
                    }};
                    let groupList1 = money.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
                    let m=0;
                    for(let group of groupList1){
                       group.fieldGroup[0].hooks = checkYnHooks1;
                       m+=1;
                       if(m==groupList1.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([money?.fields]); 
                        //this.checkMoneyYNChanges()}
                    }
                  }
               if(this.insuranceId=='100002'){
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
                    // this.ongetDistrictList('change')
                  });
                } }
                
                field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field])
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
          
              
                let fireData8 = new BusinessInterruption();
                this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData8?.fields]);

                  let fireData2 = new GoodsInTransit();
                  this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([fireData2?.fields]);
                  console.log("Goods Fields",this.fields);
                  // this.getTransportList();
                  // this.getgeographicalLimit();
                  // this.getTransportedByList();
               
              if(this.requestReferenceNo){
                   this.sectionCount = 0;
                  //  if(sections.some(ele=>ele=='1')) this.getBuildingDetails();
                  //  if(sections.some(ele=>ele=='3')) this.getAllRiskDetails(sections);
                  //  if(sections.some(ele=>ele=='47' || ele=='74')) this.getContentDetails(sections);
                  //  if(sections.some(ele=>ele=='35')) //this.getPersonalAccidentDetails(sections);
                  //  if(sections.some(ele=>ele=='36')) this.getPersonalLiabilityDetails(sections);
                  //  if(sections.some(ele=>ele=='40')) this.getFireAlliedRiskDetails(sections);
                  //  if(sections.some(ele=>ele=='45')){ this.getEmployeeRiskDetails(sections)}
                  //  if(sections.some(ele=>ele=='43')){ this.getFidelityRiskDetails(sections)}
                  //  if(sections.some(ele=>ele=='41')){ this.getMachineryBreakDownDetails(sections)}
                  //  if(sections.some(ele=>ele=='42')){ this.getMoneyDetails(sections)}
                  //  if(sections.some(ele=>ele=='52')){ this.getBurglaryDetails(sections) }
                  //  if(sections.some(ele=>ele=='69')){ this.getBusinessAllRiskDetails(sections) }
                  //  if(sections.some(ele=>ele=='75')){ this.getBusinessInterruptionDetails(sections) }
                  //  if(sections.some(ele=>ele=='76')){ this.getElectronicEquipment(sections)}
                  //  if(sections.some(ele=>ele=='46')){ this.getGoodsTransitDetails(sections) }
                  //  if(sections.some(ele=>ele=='54')){ this.getPublicLiabilityDetails(sections) }
                  //  if(sections.some(ele=>ele=='3') && this.productId=='21' || this.productId == '26'){ this.getPlantallrisk(sections) }
                  //  if(sections.some(ele=>ele=='3') && this.productId=='21'){ this.getElectronicEquipment(sections) 

                  }
                  //  if(sections.some(ele=>ele=='56' || ele=='53')){ 
                  //   this.sectionCount +=1;
                  //   if(sections.length==this.sectionCount){
                  //     this.formSection = true; this.viewSection = false;
                  //   }
                  //  }
    
              // else{
              //   this.formSection = true; this.viewSection = false;
              // }
            // }
            
          }
          
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
          setBuildingOwnerYN(){
            if(this.BuildingOwnerYn!='Y'){
               this.coversRequired = 'C'
            }
            else if(this.coversRequired==null) this.coversRequired='BC';
          }
}