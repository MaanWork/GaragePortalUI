import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vehicle-create-form',
  templateUrl: './vehicle-create-form.component.html',
  styles : [`
    .card .form-container div label { font-weight: bold; }
    .flex input, .flex p-dropdown, .flex p-calendar, .flex p-inputNumber { min-width: 200px; }
  `],
  providers: [MessageService]
})
export class VehicleCreateFormComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public commonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  items:MenuItem[] | undefined;regNo:any=null;
  customerTypes:any[] | undefined;modelList:any[]=[];
  currentCustomerType:any = 'personal';
  ownerCategoryOptions: any[] | undefined;orginalPolicyNo:any=null;
  selectedOwnerCategory: any | undefined;getdetails: any=null;
  userDetails:any;loginId:any=null;userType:any=null;modelValue:any=null;
  brokerbranchCode:any=null;branchList:any[]=[];bodyTypeId:any=null;
  makeValue:any=null;manufactureYear:any=null;bodyTypeValue:any=null;
  insuranceId:any=null;agencyCode:any=null;ownerList:any[]=[];
  branchCode:any=null;productId:any=null;fuelTypeList:any[]=[];
  colorList:any[]=[];bodyTypeList:any[]=[];usageList:any[]=[];
  motorCategoryList:any[]=[];editSection:boolean=false;makeList:any[]=[];
  vehicleDetails: any;modelDesc:any=null;endtPrevQuoteNo:any=null;
  editdata: any;endorsementYN:any='N';promoCode:any=null;
  quoteRefNo: any=null;endorsementDate:any=null;havePromoCode:any='N';
  axelDistance: any;endorsementType:any=null;exchangeRate:any=null;
  chassisNo: any;endtPrevPolicyNo:any=null;
  colorValue: any;tareWeight:any=null;currencyCode:any=null;
  engineNo: any='';seatingCapacity:any=null;customerName:any=null;
  fuelType: any;ownerName:any=null;endtStatus:any=null;
  grossWeight: any=0;engineCapacity:any=null;vehicleDetailsList:any[]=[];
  motorCategory: any;ownerCategory:any=null;validSection:boolean=false;
  usageValue: any;noOfAxels:any=null;duplicateSection:boolean=false;
  customerCode: any;endorsementEffectiveDate:any=null;isFinanceEndt:any=null;
  brokerCode: any;endorsementTypeDesc:any=null;endtCategoryDesc:any=null;
  sourceType: any;endorsementSection:boolean=false;endtCount:any=null;
  subuserType: any;customerDetails:any;endorsementRemarks:any=null;
  endorsePolicyNo: any=null;years:any[]=[];modelHeader:any[]=[];
  referenceNo: string;mainBodyTypeList:any[]=[];makeError:boolean = false;
  commonDetails: any;editSectionAlt:boolean=false;modelSearchVisible:boolean = false;
  modelColumns:any[]=[];selectedRowData:any=null;lang:any=null;horsePower:any=0;
  horsePowerError=false;
  displacement: any=0;
  numberOfCylinders: any=0;
  RegistrationDate:any;
  bodyTypeError=false;
  modelError=false;
  RegError:boolean=false;
  seatingError=false;
  fuelTypeError=false;
  tareWeightError=false;
  displacementError=false;
  numberOfCylindersError=false;
  RegDateError=false;
  modelError1: boolean=false;
  bodyType: any;
  grossWeightError: boolean=false;
  maxDate: any;
  constructor(private messageService: MessageService,private sharedService: SharedService,private appComp:AppComponent,
    private translate:TranslateService,private datePipe:DatePipe,private router:Router) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.subuserType = this.userDetails?.Result?.SubUserType;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
     
      this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.insuranceId = this.userDetails.Result.InsuranceId;
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.insuranceId = this.userDetails.Result.InsuranceId;
      if(this.subuserType=='b2c' || this.subuserType=='B2C Broker'){ this.productId='5';}
      this.modelColumns = ['Select','Model','Body Type','Fuel Type','Transmission','WeightKg'];
      let vehicleList = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleList) this.vehicleDetailsList = vehicleList;
      if(this.insuranceId=='100020') this.getNewMakeList();
      this.getBodyTypeList();
      this.getOwnerCategoryList();
      if(this.insuranceId=='100040'){
        this.getMakeList()
      }
      this.appComp.getLanguage().subscribe((res:any)=>{  
        if(res) this.lang=res;
        else this.lang='en';
        this.translate.setDefaultLang(this.lang);
      });
      if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
        else this.lang='en';
        sessionStorage.setItem('language',this.lang)
        this.translate.setDefaultLang(sessionStorage.getItem('language'));}
  }

  ngOnInit(): void {
    this.maxDate = new Date(); 
    this.ownerCategoryOptions = [{name: 'Category', code: 'category'}];
    this.customerTypes = [{label: 'Personal', value: 'personal'}, {label: 'Corporate', value: 'corporate'}];
    if(this.lang=='en'){this.items = [{ label: 'Home', routerLink:'/' }, {label:'Vehicle', routerLink: '/vehicle'},{label:'Create Vehicle'}];}
    else if(this.lang=='po'){this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Veículo', routerLink: '/vehicle'},{label:'Criar veículo'}];}
    this.getdetails= sessionStorage.getItem('Editcars');
    this.years = this.getYearList();
    
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.referenceNo = referenceNo;
      this.getCustomerDetails(referenceNo);
    }
    else{

    }
  }
  onChangeMotorUsage(type){
     if(this.bodyTypeList.length!=0 && this.usageValue!=null && this.usageValue!='' && this.usageValue!=undefined){
      let entry = this.usageList.find(ele=>ele.CodeDesc==this.usageValue || ele.Code==this.usageValue);
          if(entry){   
            let bodyTypeStatus = entry?.BodyType;
            this.mainBodyTypeList = this.bodyTypeList.filter(ele=>ele.BodyType==bodyTypeStatus);
            if(type=='change') this.bodyTypeValue = null;
          }
    }
  }
  getDisplayName(){
		if(this.lang=='en') return 'CodeDesc';
		else return 'CodeDescLocal'
	}
  getNewMakeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.motorApiUrl}api/vehiclemakedetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.makeList = data.Result;
            if(this.vehicleDetails?.Vehiclemake!=null && this.vehicleDetails?.Vehiclemake!='' && this.makeList.length!=0 && (this.modelDesc==null || this.modelDesc=='') ){
              let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.Vehiclemake || ele.Code==this.editdata?.Vehiclemake);
              this.makeValue = entry.Code;
              this.editSectionAlt = true;
              this.onMakeAltChange('direct',this.vehicleDetails?.VehicleModelDesc);
            }
            else if(this.vehicleDetails?.VehiclemakeDesc!=null && this.vehicleDetails?.VehiclemakeDesc!='' && this.makeList.length!=0 ){
              let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.VehiclemakeDesc || ele.Code==this.editdata?.VehiclemakeDesc);
              this.makeValue = entry.Code;
              this.editSectionAlt = true;
              this.onMakeAltChange('direct',this.vehicleDetails?.VehicleModelDesc);
            }
        }
      },
      (err) => { },
    );
  }
  onMakeAltChange(type,modelValue){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
       "ProductId": this.productId,
       "MakeId": this.makeValue
     }
     let urlLink = `${this.motorApiUrl}api/vehiclemodeldetails`;
     this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
       (data: any) => {
         if(data.Result){
             this.modelList = data.Result;
             this.modelHeader = [
              {
                key: 'action',
                display: 'Select',
                config: {
                  select: true,
                },
              },
              { key: 'Model', display: 'Model' },
              { key: 'BodyType', display: 'Body Type' },
              { key: 'FuelType', display: 'Fuel Type' },
              { key: 'TransmissionType', display: 'Transmission' },
              { key: 'WeightKg', display: 'WeightKg' },
             ];
             if(type=='direct'){
                let entry = this.modelList.find(ele=>ele.VehicleId==modelValue);
                if(entry){
                  let otherList = this.modelList.filter(ele=>ele.VehicleId!=modelValue);
                  this.modelList = [entry].concat(otherList);
                  this.modelDesc = entry?.Model;
                }
             } 
             else{
              this.modelDesc = null;
              this.modelValue = null;
              this.bodyTypeId = null;
              this.fuelType = null;
              this.grossWeight = null;
              this.tareWeight = null;
              this.engineCapacity = null;
              this.bodyTypeValue = null;
             }
          }
        },
        (err) => { },
      );
  }
  onSelectModel(rowData){
    if(rowData){
       this.selectedRowData = rowData;
    }
  }
  checkEditSection(type){
    if(type=='fuel') return (this.editSectionAlt && this.fuelType!='' && this.fuelType!=null && this.fuelType!=undefined);
    if(type=='engineCapacity') return (this.editSectionAlt && this.engineCapacity!='' && this.engineCapacity!=null && this.engineCapacity!=undefined);
    if(type=='bodyType') return (this.editSectionAlt && this.bodyTypeValue!='' && this.bodyTypeValue!=null && this.bodyTypeValue!=undefined);
    if(type=='tareweight') return (this.editSectionAlt && this.tareWeight!='' && this.tareWeight!=null && this.tareWeight!=undefined);
    if(type=='modelId') return (this.editSectionAlt && this.modelDesc!='' && this.modelDesc!=null && this.modelDesc!=undefined);

  }
  onSaveModelDetails(){
    if(this.selectedRowData){
      this.modelValue = this.selectedRowData?.ModelId;
      this.bodyTypeId = this.selectedRowData?.BodyTypeId;
      this.fuelType = this.selectedRowData.FuelType;
      this.grossWeight = this.selectedRowData.WeightKg;
      this.tareWeight = this.selectedRowData.WeightKg;
      this.modelDesc = this.selectedRowData?.Model;
      this.engineCapacity = this.selectedRowData?.EnginesizeCc;
      if(this.bodyTypeId){
        let entry = this.bodyTypeList.find(ele=>ele.Code==String(this.bodyTypeId));
        if(entry) this.bodyTypeValue = entry.CodeDesc;
      }
      this.noOfAxels = '1';
      this.axelDistance = '1';
      this.editSectionAlt = true;
      this.modelSearchVisible = false;
    }
  }
  onViewModelList(type,value,modal){
    this.makeError = false;
      if(this.makeValue!=null && this.makeValue!=''){
        this.makeError = false;
        this.modelSearchVisible = true;
      }
      else this.makeError = true;
  }
  getCustomerDetails(refNo){
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.commonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          sessionStorage.setItem('customerDetails',JSON.stringify(data.Result))
          this.customerDetails = customerDetails;
          if(this.customerDetails){
            // this.title = this.customerDetails?.TitleDesc;
            // this.clientName = this.customerDetails?.ClientName;
             this.ownerName = this.customerDetails?.ClientName;
             this.customerName = this.customerDetails?.ClientName
            // this.dateOfBirth = this.customerDetails?.DobOrRegDate;
            // if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
            // if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
            // //this.ownerCategory = this.customerDetails?.PolicyHolderType;
            // this.emailId = this.customerDetails?.Email1;
            // this.mobileNo = this.customerDetails?.MobileNo1;
            // this.idNumber = this.customerDetails?.IdNumber;
          }
        }
      },
      (err) => { },
    );
  }
  omit_special_char(event){
   var k;
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  onRegistrationSearch(){
    this.duplicateSection=false;this.editSection=false;this.validSection=false;
      if(this.vehicleDetailsList.some(ele=>ele.Registrationnumber==this.regNo)){
        this.duplicateSection = true;
        this.validSection = false;
        this.editSection = true;
      }
      else if(this.regNo!=null && this.regNo!='' && this.regNo!=undefined){
        if(this.insuranceId=='100002'){
          this.regNo = this.regNo.toUpperCase();
          this.editSection = true;
          sessionStorage.setItem('loadingType','motorSearch');
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
              if(data.Result){
                this.vehicleDetails = data.Result;
                if(this.vehicleDetails.Chassisnumber) this.chassisNo = this.vehicleDetails?.Chassisnumber;
                sessionStorage.removeItem('loadingType');
                if(this.vehicleDetailsList.length!=0){
                    let entry = this.vehicleDetailsList.some(ele=>ele.Registrationnumber==this.regNo);
                    if(entry){
                        this.duplicateSection = true;
                        this.validSection = false;
                        
                    }
                    else this.onSaveSearchVehicles();
                }
                else this.onSaveSearchVehicles();
             }
              else if(data.ErrorMessage!=null){
                if(data.ErrorMessage.length!=0){
                  sessionStorage.removeItem('loadingType');
                  this.duplicateSection = false;
                  this.editSection = false;
                  this.validSection = true;
                }
              }
            },
            (err) => {
              
             },
            );
        }
        else{
          this.duplicateSection = false;
          this.editSection = false;
          this.validSection = true;
        }
      }
}
  onSaveSearchVehicles(){

    sessionStorage.removeItem('loadingType');
    this.duplicateSection = false;
    this.subuserType = sessionStorage.getItem('typeValue');
    let appId = "1",loginId="",brokerbranchCode="",createdBy="";
   
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
          createdBy = this.vehicleDetails.CreatedBy;
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
          loginId = this.vehicleDetails.LoginId;
          //loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = null;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
          this.sourceType = this.commonDetails?.SourceCode;
          this.customerCode = this.commonDetails?.CustomerCode;
          this.brokerCode = this.commonDetails?.BrokerCode;
          brokerbranchCode =  this.commonDetails?.BrokerBranchCode;
          this.customerName = this.commonDetails?.CustomerName;
          loginId = this.commonDetails?.LoginId;
      }
      else {
        this.sourceType = this.subuserType;
        this.customerCode = this.userDetails?.Result.CustomerCode;
      }
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      let id = sessionStorage.getItem('vehicleLength')
      if(id!=null && id!=undefined){
        this.vehicleDetails['Vehicleid'] =  sessionStorage.getItem('vehicleLength');
      }
      else{ this.vehicleDetails['Vehicleid'] = '1';} 
      this.vehicleDetails['Active'] = false;
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      if(this.endorsementSection){
      }
      let sumInsured = null;
      if(this.vehicleDetails?.SUM_INSURED) sumInsured = this.vehicleDetails?.SUM_INSURED;
      let quoteReferenceNo = null;
      if(this.endorsementSection){
        let entry = this.vehicleDetailsList.filter(ele=>ele?.EndorsementDate!=undefined)
        if(entry){
          let details = entry[0];
          console.log("Filtered Endorsement Set",entry)
          this.endorsementYN ='Y';
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsmentRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;this.orginalPolicyNo = details?.OrginalPolicyNo;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;this.isFinanceEndt = details?.IsFinanceYesNo;
        }
      }
      else this.endorsementYN = 'N';
      if(sessionStorage.getItem('quoteReferenceNo')) quoteReferenceNo = sessionStorage.getItem('quoteReferenceNo');
      let grossweight=null,tareweight=null;
      if(this.vehicleDetails?.Grossweight!=null && this.vehicleDetails?.Grossweight!=undefined){
        if(String(this.vehicleDetails?.Grossweight).includes(',')) grossweight = String(this.vehicleDetails?.Grossweight).replace(',','');
        grossweight = this.vehicleDetails?.Grossweight;
      }
      if(this.tareWeight!=null && this.tareWeight!=undefined){
        if(String(this.tareWeight).includes(',')) tareweight = String(this.tareWeight).replace(',','');
        tareweight = this.tareWeight;
      }
      let commonDetails = JSON.parse(sessionStorage.getItem('commonDetails'));
      if(commonDetails){
        this.vehicleDetails.PolicyStartDate = commonDetails.policyStartDate;
        this.vehicleDetails.PolicyEndDate = commonDetails.policyEndDate;
        this.vehicleDetails.Currency = commonDetails.currencyCode;
        this.currencyCode = commonDetails.currencyCode;
        this.exchangeRate = commonDetails.exchangeRate;

        this.vehicleDetails.ExchangeRate = commonDetails.exchangeRate;
        this.vehicleDetails.PromoCode = commonDetails.promoCode;
        this.vehicleDetails.BrokerCode = commonDetails.BrokerCode;
        this.sourceType = commonDetails.SourceCode;
        this.customerCode = commonDetails.CustomerCode;
        this.customerName = commonDetails.CustomerName;
       if(commonDetails.BrokerBranchCode) brokerbranchCode = commonDetails.BrokerBranchCode;
        
      }
      this.vehicleDetails['VehicleTypeId'] = null;
      this.vehicleDetails['MotorusageId'] = null;
      this.vehicleDetails['VehiclemakeId'] = null;
      this.vehicleDetails['VehiclemodelId'] = null;
      let bodyTypeValue = null,motorUsage=null;
      if(this.bodyTypeId!=null && this.bodyTypeId!=''){
        let usageId = this.bodyTypeList.find(ele=>ele.CodeDesc==this.bodyTypeId || ele.Code==this.bodyTypeId).Code;
        if(usageId) this.vehicleDetails['VehicleTypeId'] = usageId;
        let usageDesc = this.bodyTypeList.find(ele=>ele.CodeDesc==this.bodyTypeId || ele.Code==this.bodyTypeId).CodeDesc;
        if(usageDesc) bodyTypeValue =  usageDesc;
      }
      motorUsage = this.vehicleDetails.Motorusage;
      if(this.vehicleDetails?.SavedFrom!='Api'){
        let usageId = this.usageList.find(ele=>ele.CodeDesc==this.vehicleDetails.Motorusage || ele.Code==this.vehicleDetails.Motorusage)?.Code;
          if(usageId) this.vehicleDetails['MotorusageId'] = usageId;
          let usageDesc = this.usageList.find(ele=>ele.CodeDesc==this.vehicleDetails.Motorusage || ele.Code==this.vehicleDetails.Motorusage)?.CodeDesc;
          if(usageDesc) this.vehicleDetails['Motorusage'] = usageDesc;
          motorUsage = null;
      }
      else if(this.vehicleDetails.Motorusage!=null && this.vehicleDetails.Motorusage!=''){
          let usageId = this.usageList.find(ele=>ele.CodeDesc==this.vehicleDetails.Motorusage)?.Code;
          if(usageId) this.vehicleDetails['MotorusageId'] = usageId;
      }
      let make = "";
        if(this.makeValue!='' && this.makeValue!=undefined && this.makeValue!=null){
          let entry = this.makeList.find(ele=>ele.Code==this.makeValue);
          this.vehicleDetails['Vehiclemake'] = entry.CodeDesc;
          this.vehicleDetails['VehiclemakeId'] = entry.Code;
        }
        let modelDesc = null;
        if(this.insuranceId=='100020'){
            if(this.modelDesc!=null && this.modelDesc!=''){ 
              let entry = this.modelList.find(ele=>ele.Model==this.modelDesc);
              if(entry){
                this.vehicleDetails['VehcilemodelId'] = entry?.VehicleId
                this.vehicleDetails['Vehcilemodel'] = this.modelDesc
              } 
            }
            else modelDesc = null;
        }
        else{
          if(this.bodyTypeId=='1' || this.bodyTypeId=='2' || this.bodyTypeId=='3' || this.bodyTypeId=='4' || this.bodyTypeId=='5'){
            if(this.modelValue=='99999'){
                modelDesc = this.modelDesc;
                this.vehicleDetails['VehcilemodelId'] = this.modelValue
                this.vehicleDetails['Vehcilemodel'] = modelDesc
            }
            else if(this.modelValue!='' && this.modelValue!=null){
              modelDesc = this.modelList.find(ele=>ele.Code==this.modelValue)?.CodeDesc
              
              this.vehicleDetails['VehcilemodelId'] = this.modelValue
              this.vehicleDetails['Vehcilemodel'] = modelDesc;
              
            }
          }
          else modelDesc = this.modelDesc;
        }
        if(this.vehicleDetails.MobileCode==null || this.vehicleDetails.MobileCode=='' || this.vehicleDetails.MobileCode==undefined){
          let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
          if(customerDetails){
            this.ownerName = customerDetails?.ClientName;
            this.vehicleDetails['MobileCode'] = customerDetails?.MobileCode1;
            this.vehicleDetails['MobileNumber'] = customerDetails?.MobileNo1;
            if(this.customerName == null) this.customerName = customerDetails?.ClientName;
          }
        }
        if(this.vehicleDetails?.SavedFrom=='SQ') this.vehicleDetails.SavedFrom = 'WEB';
        let registrationDate,parts;
        if (this.RegistrationDate != undefined && this.RegistrationDate != null && this.RegistrationDate != '') {
          if(String(this.RegistrationDate).includes('/')){
            registrationDate = this.RegistrationDate;
          }
          else registrationDate = this.datePipe.transform(this.RegistrationDate,'dd/MM/yyyy')

           parts = registrationDate.split('/');

            // The year is the last part of the array
            
        }
        if(this.insuranceId=='100040' || this.insuranceId=='100042'){
          this.vehicleDetails.MotorCategory  ="1";
          this.vehicleDetails.Motorusage ="Ambulance"
          this.vehicleDetails.MotorusageId='1';
          this.vehicleDetails.ManufactureYear = parts[2];
        }
        let usageId = this.vehicleDetails?.MotorusageId;
        let entry = this.usageList.find(ele=>ele.CodeDesc==this.vehicleDetails?.Motorusage || ele.Code==this.vehicleDetails?.Motorusage);
        if(entry) usageId = entry.Code;
        if(this.engineNo!=null && this.engineNo!='') this.vehicleDetails['EngineNumber'] = this.engineNo;
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "AcExecutiveId": this.vehicleDetails?.AcExecutiveId,
        "CommissionType": this.vehicleDetails?.CommissionType,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BdmCode": this.customerCode,
        "BrokerCode": this.brokerCode,
        "LoginId": loginId,
        "SubUserType": this.subuserType,
        "ApplicationId": appId,
        "CustomerReferenceNo": refNo,
        "RequestReferenceNo": quoteReferenceNo,
        "Idnumber": IdNo,
        "VehicleId": this.vehicleDetails.Vehicleid,
        "Deductibles": this.vehicleDetails.Deductibles,
        "VehicleValueType": this.vehicleDetails.VehicleValueType,
        "DefenceValue": this.vehicleDetails.DefenceValue,
        "Inflation": this.vehicleDetails.Inflation,
        "AcccessoriesSumInsured": this.vehicleDetails?.AcccessoriesSumInsured,
        "AccessoriesInformation": this.vehicleDetails?.AccessoriesInformation,
        "AdditionalCircumstances": this.vehicleDetails?.AdditionalCircumstances,
        "AxelDistance": this.axelDistance,
        "Chassisnumber": this.chassisNo,
        "Color": this.vehicleDetails?.Color,
        "CityLimit": this.vehicleDetails?.CityLimit,
        "CoverNoteNo": this.vehicleDetails?.CoverNoteNo,
        "OwnerCategory": this.vehicleDetails?.OwnerCategory,
        "CubicCapacity": grossweight,
        "CreatedBy": createdBy,
        "DrivenByDesc": 'D',
        "MobileCode": this.vehicleDetails?.MobileCode,
        "InsurancetypeDesc": this.vehicleDetails?.InsurancetypeDesc,
        "InsuranceClassDesc": this.vehicleDetails?.InsuranceClassDesc,
        "MobileNumber": this.vehicleDetails?.MobileNumber,
        "EngineNumber": this.vehicleDetails?.EngineNumber?.toUpperCase(),
        "FuelType": this.vehicleDetails?.FuelType,
        "Gpstrackinginstalled": this.vehicleDetails?.Gpstrackinginstalled,
        "Grossweight": grossweight,
        "HoldInsurancePolicy": "N",
        "Insurancetype": this.vehicleDetails?.Insurancetype,
        "InsuranceId": this.insuranceId,
        "InsuranceClass": this.vehicleDetails?.InsuranceClass,
        "InsurerSettlement": "",
        "InterestedCompanyDetails": "",
        "ManufactureYear": this.vehicleDetails?.ManufactureYear,
        "ModelNumber": null,
        "MotorCategory": this.vehicleDetails?.MotorCategory,
        "Motorusage": this.vehicleDetails?.Motorusage,
        "MotorusageId": usageId,
        "NcdYn": this.vehicleDetails?.NcdYn,
        "PolicyRenewalYn": this.vehicleDetails.PolicyRenewalYn,
        "NoOfClaims": this.vehicleDetails?.NoOfClaims,
        "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "ProductId": '5',
        "SectionId": this.vehicleDetails?.SectionId,
        "PolicyType": this.vehicleDetails?.PolicyType,
        "RadioOrCasseteplayer": null,
        "RegistrationYear": regYear,
        "Registrationnumber": this.regNo.toUpperCase(),
        "RoofRack": null,
        "SeatingCapacity": this.seatingCapacity,
        "SourceTypeId": this.sourceType,
        "SpotFogLamp": null,
        "Stickerno": null,
        "SumInsured": this.vehicleDetails?.SumInsured,
        "Tareweight": tareweight,
        "TppdFreeLimit": this.vehicleDetails?.TppdFreeLimit,
        "TppdIncreaeLimit": this.vehicleDetails?.TppdIncreaeLimit,
        "TrailerDetails": null,
        "Vehcilemodel":  this.vehicleDetails?.Vehcilemodel,
        "VehcilemodelId": this.vehicleDetails?.VehcilemodelId,
        "VehicleType": this.bodyTypeId,
        "VehicleTypeId": this.vehicleDetails?.VehicleTypeId,
        "Vehiclemake": this.vehicleDetails?.Vehiclemake,
        "VehiclemakeId": this.vehicleDetails?.VehiclemakeId,
        "WindScreenSumInsured": this.vehicleDetails?.WindScreenSumInsured,
        "Windscreencoverrequired": this.vehicleDetails?.Windscreencoverrequired,
        "accident": null,
        "ClaimType": this.vehicleDetails?.ClaimType,
        "periodOfInsurance": this.vehicleDetails?.periodOfInsurance,
        "PolicyStartDate": this.vehicleDetails.PolicyStartDate,
        "PolicyEndDate": this.vehicleDetails.PolicyEndDate,
        "Currency": this.currencyCode,
        "ExchangeRate": this.exchangeRate,
        "HavePromoCode": this.havePromoCode,
        "PromoCode": this.promoCode,
        "CollateralYn": this.vehicleDetails?.CollateralYn,
        "CollateralName": this.vehicleDetails?.CollateralName,
        "FirstLossPayee": this.vehicleDetails?.FirstLossPayee,
        "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
        "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
        "NoOfComprehensives": this.vehicleDetails?.NoOfComprehensives,
        "ClaimRatio": null,
        "SavedFrom": this.vehicleDetails?.SavedFrom,
        "UserType": this.userType,
        "TiraCoverNoteNo": this.vehicleDetails?.TiraCoverNoteNo,
        "EndorsementYn":  this.endorsementYN,
        "SaveOrSubmit": "Save",
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
        "HorsePower": this.horsePower,
        "RegistrationDate": registrationDate,
        "Mileage":this.vehicleDetails.Mileage,
        "NoOfClaimYears":this.vehicleDetails.NoOfClaimYears,
        "NoOfPassengers":this.vehicleDetails.NoOfPassengers,
        "PreviousInsuranceYN":this.vehicleDetails.PreviousInsuranceYN,
        "PreviousLossRatio": this.vehicleDetails.PreviousLossRatio,
        "NumberOfCards":this.vehicleDetails.NumberOfCards,
        "MunicipalityTraffic":this.vehicleDetails.MunicipalityTraffic,
        "TransportHydro":this.vehicleDetails.TransportHydro,
        "DateOfCirculation":this.vehicleDetails.DateOfCirculation,
        "NewValue":this.vehicleDetails.NewValue,
        "MarketValue":this.vehicleDetails.MarketValue,
        "AggregatedValue":this.vehicleDetails.AggregatedValue,
        "BankingDelegation":this.vehicleDetails.BankingDelegation,
        "LoanStartDate": this.vehicleDetails.LoanStartDate,
        "LoanEndDate": this.vehicleDetails.LoanEndDate,
        "CollateralCompanyAddress": this.vehicleDetails.CollateralCompanyAddress,
        "CollateralCompanyName": this.vehicleDetails.CollateralCompanyName,
        "LoanAmount": this.vehicleDetails.LoanAmount,
        "PaCoverId":this.vehicleDetails.PaCoverId,
        "UsageId":this.vehicleDetails.UsageId,
        "VehicleTypeIvr": this.vehicleDetails.VehicleType,
        "ZoneCirculation": this.vehicleDetails.ZoneCirculation,
        "Zone": this.vehicleDetails.Zone,
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
      if(this.insuranceId=='100042'){
        ReqObj['Class']=this.vehicleDetails.Class
      }
      ReqObj['FleetOwnerYn'] = "N";
      if(this.endorsementSection){
        if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y'){
          ReqObj['Status'] = 'E';
        }
        else{
          ReqObj['Status'] = this.vehicleDetails?.Status;
        }
        ReqObj['PolicyNo'] = this.endorsePolicyNo
      }
      else{
        ReqObj['Status'] = 'Y';
      }
      if(this.brokerbranchCode==null ||this.brokerbranchCode==''){
        ReqObj['BrokerBranchCode']="1";
      }
      if(this.insuranceId=='100019'){
        if(this.vehicleDetails?.CarAlarmYn!= null && this.vehicleDetails?.CarAlarmYn!='' && this.vehicleDetails?.CarAlarmYn!=undefined)  ReqObj['CarAlarmYn'] = this.vehicleDetails?.CarAlarmYn;
        else ReqObj['CarAlarmYn'] = 'N';
      }
      let urlLink = `${this.motorApiUrl}api/savemotordetails`;
      console.log("Final Req",ReqObj,this.vehicleDetails);
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(data.ErrorMessage.length!=0){
          }
          else{
            if(data.Result.length!=0){
              this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo',data?.Result[0]?.RequestReferenceNo);
              sessionStorage.setItem('vehicleExist','true');
              sessionStorage.setItem('editVehicleId',String(this.vehicleDetails.Vehicleid))
              sessionStorage.removeItem('vehicleDetailsList');
              sessionStorage.removeItem('editCars');
              this.vehicleDetails = null;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Motor Details Updated Successfully' });
              if(this.subuserType=='b2c' || this.subuserType =='B2C Broker') this.router.navigate(['/quotation/plan/main/document-info']);
              else this.router.navigate(['/policyDetails'])
            }
          }
        },
        (err) => { },
      );
  }
  getOwnerCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/ownercategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ownerList = data.Result;
            this.getFuelTypeList();
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
    let urlLink = `${this.commonApiUrl}dropdown/fueltype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.fuelTypeList = data.Result;
            this.getColorsList();
        }
      },
      (err) => { },
    );
  }
  getColorsList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/color`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.colorList = data.Result;
            
        }
      },
      (err) => { },
    );
  }
  onCheckModelChecked(rowData){
      if(this.modelDesc!='' && this.modelDesc!=null && this.modelDesc!=undefined) return (this.modelDesc==rowData.Model) ;
      else return false;
  }
  getBodyTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/induvidual/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.bodyTypeList = data.Result;
            this.getUsageList();
            this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo')
            if(this.getdetails== 'SavedFroms' && this.quoteRefNo){
              this.getExistingVehiclesList();
            }
        }

      },
      (err) => { },
    );
  }
  getUsageList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.usageList = data.Result;
            this.getMotorCategoryList();
        }
      },
      (err) => { },
    );
  }
  onBodyTypeChange(type){
    
    if(this.bodyTypeValue!=null && this.bodyTypeValue!=''){
      this.bodyTypeId = this.bodyTypeList.find(ele=>ele.CodeDesc==this.bodyTypeValue)?.Code;
      this.bodyType = this.bodyTypeList.find(ele=>ele.CodeDesc==this.bodyTypeValue)?.BodyType;
      if(type=='change' && this.insuranceId!='100020'){this.makeValue=null;this.modelValue=null;this.horsePower=0,this.grossWeight=0,this.numberOfCylinders=0}
      if(this.bodyTypeId && this.insuranceId!='100020'){ this.getMakeList(); } 
    }
  }
  getBack(){
    if(this.subuserType=='b2c' || this.subuserType=='B2C Broker') this.router.navigate(['/quotation/plan/premium-details']);
    else{this.router.navigate(['/policyDetails']);}
  }
  getMakeList(){
    let bodyType = null;
    if(this.insuranceId!='100042' && this.insuranceId!='100040') bodyType = this.bodyTypeId
    else bodyType = '99999'
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": bodyType
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormake`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.makeList = data.Result;
            if(this.getdetails== 'SavedFroms'){
              if(this.editdata?.Vehiclemake!=null && this.editdata?.Vehiclemake!='' || this.editdata?.VehiclemakeDesc!=''){
                let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.Vehiclemake || ele.Code==this.editdata?.Vehiclemake || ele.CodeDesc==this.editdata?.VehiclemakeDesc);
                if(entry){
                    this.makeValue = entry.Code;
                    this.onMakeChange();
                }
              }
            }
        }
      },
      (err) => { },
    );
  }
  onMakeChange(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId,
      "MakeId": this.makeValue
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormakemodel`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.modelList = data.Result;
            if(this.getdetails== 'SavedFroms'){
              let entry = this.modelList.find(ele=>ele.CodeDesc==this.editdata?.Vehcilemodel || ele.Code==this.editdata?.Vehcilemodel);
              if((entry==null || entry==undefined) && (this.editdata?.Vehcilemodel!=null && this.editdata?.Vehcilemodel!=undefined)){
                  this.modelValue = '99999';
                  this.modelDesc = this.editdata?.Vehcilemodel;
              }
              else this.modelValue = this.modelValue = entry.Code;
            }
        }
      },
      (err) => { },
    );
  }
  onModelChange(type){
    if(this.modelValue!=null && this.modelValue!=''){
      if(this.modelValue!='99999'){
        this.modelDesc = this.modelList.find(ele=>ele.CodeDesc==this.modelValue)?.CodeDesc;
      }
      
      else if(type=='change'){this.modelDesc = null}
    }
  }
  getMotorCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/motorcategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorCategoryList = data.Result;
            // let chassisNo = sessionStorage.getItem('editVehicleDetails');
            // if(chassisNo){
            //   this.editSection = true;
            //   this.getVehicleDetails('',chassisNo,'edit');
            // }
            // else{ this.editSection = false}
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
      years.push({"Code":String(yearEntry),"CodeDesc":String(yearEntry)});
    }   
    return years;
  }
  submit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle Added Successfully' });
  }
  getExistingVehiclesList(){
    let sessioncar= JSON.parse(sessionStorage.getItem('EditCarDetails'));
    // let ReqObj = {
    //   "ReqChassisNumber": sessioncar?.ReqChassisNumber,
    //   "ReqRegNumber": sessioncar?.ReqRegNumber,
    //   "InsuranceId": this.insuranceId,
    //   "BranchCode": this.branchCode,
    //   "BrokerBranchCode": this.branchCode,
    //   "ProductId": this.productId,
    //   "CreatedBy": this.loginId,
    //   "SavedFrom": 'WEB'
    // }
    if(this.subuserType=='b2c'){sessioncar={"Idnumber":null,"Vehicleid":"1"}}
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": sessioncar?.Idnumber,
      "Vehicleid": sessioncar.Vehicleid
    }
    let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
         console.log('Device Datasssss',data.Result);
         this.vehicleDetails = data.Result;
         this.editdata=data.Result;
         this.setVehiclValues(this.editdata);
      
      }
      },
      (err) => { },
    );
  }
  setVehiclValues(vehDetails){
    this.axelDistance = vehDetails?.AxelDistance;
    this.chassisNo = vehDetails?.Chassisnumber;
    this.colorValue = vehDetails?.Color;
    this.engineNo = vehDetails?.EngineNumber;
    this.fuelType = vehDetails?.FuelType;
    this.grossWeight = vehDetails?.Grossweight;
    this.manufactureYear = vehDetails?.ManufactureYear;
    this.motorCategory = vehDetails?.MotorCategory;
    this.usageValue = vehDetails?.TiraMotorUsage;
    this.noOfAxels = vehDetails?.NumberOfAxels;
    this.ownerCategory = vehDetails?.OwnerCategory;
    this.regNo = vehDetails?.Registrationnumber;
    this.engineCapacity = vehDetails?.EngineCapacity;
    this.ownerName = vehDetails?.ResOwnerName;
    this.seatingCapacity = vehDetails?.SeatingCapacity;
    this.tareWeight = vehDetails?.Tareweight;
    if(vehDetails?.VehicleType!=null && vehDetails?.VehicleType!=''){
    this.bodyTypeId = vehDetails?.VehicleType;
    this.bodyTypeValue = vehDetails?.VehicleTypeDesc;
    this.modelDesc = vehDetails?.VehicleModelDesc;
    this.currencyCode = vehDetails?.Currency;
    this.exchangeRate = vehDetails?.ExchangeRate;
    this.horsePower = vehDetails?.HorsePower;
    this.modelDesc = vehDetails?.VehicleModelDesc;
    this.displacement = vehDetails?.DisplacementInCM3;
    this.numberOfCylinders = vehDetails?.NumberOfCylinders;
    this.RegistrationDate = vehDetails?.RegistrationDate;
     if(this.insuranceId!='100020') this.onBodyTypeChange('direct');
     else{
      if(vehDetails?.Vehiclemake!=null && vehDetails?.Vehiclemake!='' && this.makeList.length!=0){
          let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.Vehiclemake);
          console.log("Make List",this.makeList)
          this.makeValue = entry.Code;
          // this.editSectionAlt = true;
          // this.onMakeAltChange('direct',vehDetails?.VehicleModelDesc);
      }
      
     }
    }
    this.onChangeMotorUsage('direct')
  }
  onFormSubmit(){
    let i=0;
    if(this.insuranceId=='100040' || this.insuranceId=='100042') {
      if( this.bodyTypeValue || this.makeValue  || this.regNo || this.seatingCapacity || this.displacement || this.modelValue || this.modelDesc||
         this.fuelType || this.tareWeight || this.numberOfCylinders || this.RegistrationDate || this.grossWeight || this.horsePower){
          this.horsePowerError = false;
          this.bodyTypeError=false;
          this.makeError=false;
          this.modelError=false;
          this.modelError1=false;
          this.RegError=false;
          this.seatingError=false;
          this.fuelTypeError=false;
          this.tareWeightError=false;
          this.grossWeightError=false;
          this.numberOfCylindersError=false;
          this.RegDateError=false;
          this.displacementError=false;
      }
     
       if((this.bodyTypeValue==null || this.bodyTypeValue=='' || this.bodyTypeValue==undefined)){
        this.bodyTypeError = true;
      } 
      else if(this.makeValue==null || this.makeValue=='' || this.makeValue==undefined){
        this.makeError = true;
      } 
      else if((this.modelValue==null || this.modelValue=='' || this.modelValue==undefined) && this.bodyType=='P'){
          this.modelError1 = true;
      } 
      else if((this.modelDesc==null || this.modelDesc=='' || this.modelDesc==undefined) && this.bodyType=='C'){
          this.modelError = true;
      } 
      else if((this.regNo==null || this.regNo=='' || this.regNo==undefined)){
        this.RegError = true;
      } 
      else if((this.seatingCapacity==null || this.seatingCapacity=='' || this.seatingCapacity==undefined)){
        this.seatingError = true;
      } 
      else if((this.fuelType==null || this.fuelType=='' || this.fuelType==undefined)){
        this.fuelTypeError = true;
      } 
      else if((this.tareWeight==null || this.tareWeight=='' || this.tareWeight==undefined)){
        this.tareWeightError = true;
      } 
     
      // else if(this.horsePower){
      //   alert()
      else if((this.horsePower==null || this.horsePower=='' || this.horsePower==undefined ) && this.bodyType=='P' && this.bodyType=='P' && (this.bodyTypeId!='50' && this.bodyTypeId!='51' && this.bodyTypeId!='5' && this.bodyTypeId!='58' && this.bodyTypeId!='28')){
      //  if(this.insuranceId=='100040')this.horsePowerError = true;
          this.horsePowerError = true
      }
      else if((this.displacement==null || this.displacement=='' || this.displacement==undefined) && (this.bodyTypeId=='50' || this.bodyTypeId=='51' || this.bodyTypeId=='5' || this.bodyTypeId=='58' || this.bodyTypeId=='28' )){
        this.displacementError = true;
      } 
      else if((this.grossWeight==null || this.grossWeight=='' || this.grossWeight==undefined) && this.bodyType=='C'){
        this.grossWeightError = true;
      }
      // else if((this.grossWeight==null || this.grossWeight=='' || this.grossWeight==undefined) && this.bodyType=='P'){
      //   alert("3");
      //    this.grossWeightError = true;
      //  }
      // }
      else if((this.numberOfCylinders==null || this.numberOfCylinders=='' || this.numberOfCylinders==undefined) && (this.bodyTypeId=='50' || this.bodyTypeId=='51' || this.bodyTypeId=='5' || this.bodyTypeId=='58' || this.bodyTypeId=='28')){
        this.numberOfCylindersError = true;
      } 
      else if((this.RegistrationDate==null || this.RegistrationDate=='' || this.RegistrationDate==undefined)){
        this.RegDateError = true;
      } 
      else{
        this.horsePowerError = false;
        this.bodyTypeError=false;
        this.makeError=false;
        this.modelError=false;
        this.modelError1=false;
        this.RegError=false;
        this.seatingError=false;
        this.fuelTypeError=false;
        this.tareWeightError=false;
        this.displacementError=false;
        this.numberOfCylindersError=false;
        this.RegDateError=false;
        this.grossWeightError = false;
        this.onProceed()
      }
    }
    else{
      this.onProceed()
    }
     
  }
  onProceed(){
    let make = "";
    if(this.makeValue!='' && this.makeValue!=undefined && this.makeValue!=null){
      let entry = this.makeList.find(ele=>ele.Code==this.makeValue);
      make = entry.CodeDesc;
    }
    let modelDesc = null;
    if(this.insuranceId=='100020'){
        if(this.modelDesc!=null && this.modelDesc!=''){ 
          let entry = this.modelList.find(ele=>ele.Model==this.modelDesc);
          if(entry) modelDesc = entry?.VehicleId
        }
        else modelDesc = null;
    }
    else{
      if(this.bodyType=='P'){
        if(this.modelValue=='99999'){
            modelDesc = this.modelDesc;
        }
        else if(this.modelValue!='' && this.modelValue!=null){
          modelDesc = this.modelList.find(ele=>ele.Code==this.modelValue)?.CodeDesc
        }
      }
      else modelDesc = this.modelDesc;
    }
    if(this.insuranceId=='100004') this.usageValue = null;
    this.ownerCategory = this.customerDetails?.PolicyHolderType;
    let grossweight=null,tareweight=null;
    if(this.grossWeight!=null && this.grossWeight!=undefined){
      if(String(this.grossWeight).includes(',')) grossweight = String(this.grossWeight).replace(',','');
      grossweight = this.grossWeight;
    }
    if(this.tareWeight!=null && this.tareWeight!=undefined){
      if(String(this.tareWeight).includes(',')) tareweight = String(this.tareWeight).replace(',','');
      tareweight = this.tareWeight;
    }
    if(this.ownerName==null || this.ownerName=='' || this.ownerName==undefined){
      let customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      if(customerDetails){
        this.ownerName = customerDetails?.ClientName;
        
      }
    }
    let registrationDate;
    if (this.RegistrationDate != undefined && this.RegistrationDate != null && this.RegistrationDate != '') {
      if(String(this.RegistrationDate).includes('/')){
        registrationDate = this.RegistrationDate;
      }
      else registrationDate = this.datePipe.transform(this.RegistrationDate,'dd/MM/yyyy');
     // this.manufactureYear = this.RegistrationDate.getFullYear();
    }
    if(this.insuranceId=='100040' || this.insuranceId=='100042'){
      this.engineCapacity='1';
      if(this.grossWeight=='' || this.grossWeight==null || this.grossWeight==undefined){grossweight=tareweight}
      else{
        grossweight =this.grossWeight;
      }
      this.axelDistance='1';
      this.noOfAxels='1';
      this.usageValue='Ambulance';
      this.motorCategory='1';
      let parts: string[] = registrationDate.split('/');

      // The year is the last part of the array
      this.manufactureYear = parts[2];
    }
    let ReqObj = {
      "Insuranceid": this.insuranceId,
      "BranchCode": this.branchCode,
      "AxelDistance": this.axelDistance,
      "Chassisnumber": this.chassisNo?.toUpperCase(),
      "Color": this.colorValue,
      "CreatedBy": this.loginId,
      "EngineNumber": this.engineNo?.toUpperCase(),
      "FuelType": this.fuelType,
      "Grossweight": grossweight,
      "ManufactureYear": this.manufactureYear,
      "MotorCategory": this.motorCategory,
      "Motorusage": this.usageValue,
      "NumberOfAxels": this.noOfAxels,
      "OwnerCategory": this.ownerCategory,
      "Registrationnumber": this.regNo?.toUpperCase(),
      "ResEngineCapacity": this.engineCapacity,
      "ResOwnerName": this.ownerName,
      "ResStatusCode": "Y",
      "ResStatusDesc": "None",
      "SeatingCapacity": this.seatingCapacity,
      "HorsePower": this.horsePower,
      "Tareweight": tareweight,
      "Vehcilemodel": modelDesc,
      "VehicleType": this.bodyTypeValue,
      "Vehiclemake": make,
      "DisplacementInCM3": this.displacement,
       "NumberOfCylinders": this.numberOfCylinders,
       "RegistrationDate": registrationDate,
    }
    let urlLink = `${this.motorApiUrl}regulatory/savevehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          //if(this.getdetails!='SavedFroms'){
            this.getVehicleDetails(this.regNo,this.chassisNo,'save',this.bodyTypeValue,this.usageValue,this.engineCapacity,make,modelDesc);
          // }
          // else{
          //   sessionStorage.removeItem('Editcars')
          //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details'])
          // }
        }
        else  if(data.ErrorMessage.length!=0){
          if(data.ErrorMessage){
            // for(let entry of data.ErrorMessage){
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
      },
      (err) => { },
    );
  }
  getVehicleDetails(regNo,chassisNo,type,modelDesc,usageDesc,engCapacity,make,model){
    //   let ReqObj = {
    //     "ReqChassisNumber": chassisNo,
    //     "ReqRegNumber": regNo,
    //     "InsuranceId": this.insuranceId,
    //     "BranchCode": this.branchCode,
    //     "BrokerBranchCode": this.branchCode,
    //     "ProductId": this.productId,
    //     "CreatedBy": this.loginId,
    //     "SavedFrom": 'WEB'
    //   }
    //   let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //       if(data.Result){
    //         this.vehicleDetails = data?.Result;
        if(this.vehicleDetails==undefined || this.vehicleDetails==null){
          this.vehicleDetails = {
          "AcccessoriesSumInsured": null,
        "AccessoriesInformation": null,
        "AdditionalCircumstances": null,
        "CityLimit": null,
        "CoverNoteNo": null,
        "Gpstrackinginstalled": 'N',
        "Insurancetype": null,
        "InsuranceId": this.insuranceId,
        "InsuranceClass": null,
        "InsurerSettlement": "",
        "InterestedCompanyDetails": "",
        "ModelNumber": null,
        "MotorCategory": null,
        "NcdYn": null,
        "PolicyRenewalYn": 'N',
        "NoOfClaims": null,
        "SectionId": null,
        "PolicyType": null,
        "RadioOrCasseteplayer": null,
        "RoofRack": null,
        "SourceTypeId": this.sourceType,
        "SpotFogLamp": null,
        "Stickerno": null,
        "SumInsured": null,
        "TppdFreeLimit":null,
        "TppdIncreaeLimit": null,
        "TrailerDetails": null,
        "WindScreenSumInsured": null,
        "Windscreencoverrequired": null,
        "accident": null,
        "periodOfInsurance": null,
        "CollateralYn": 'N',
        "CollateralName": null,
        "FirstLossPayee": null,
        "FleetOwnerYn": null,
        "NoOfVehicles": null,
        "NoOfComprehensives": null,
        "ClaimRatio": null,
        "ClaimType": null,
        "SavedFrom":null,
        "TiraCoverNoteNo": null,
        "EndorsementYn": null,
        "SaveOrSubmit": "Save",
        "EndorsementDate": null,
        "EndorsementEffectiveDate": null,
        "EndorsementRemarks": null,
        "EndorsementType": null,
        "EndorsementTypeDesc": null,
        "EndtCategoryDesc": null,
        "EndtCount": null,
        "EndtPrevPolicyNo": null,
        "EndtPrevQuoteNo":null,
        "EndtStatus": null,
        "IsFinanceEndt": null,
        "OrginalPolicyNo": null,
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
              }
            }
            let id = sessionStorage.getItem('vehicleLength')
            if(id!=null && id!='' && id!= undefined){
              this.vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength');
            }
            else{ this.vehicleDetails['Vehicleid'] = '1';}
            this.vehicleDetails['Active'] = false;
            let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
            if(vehicles){
              let motorUsage=null;
              if(usageDesc!=null && usageDesc!=''){
                  let entry = this.usageList.find(ele=>ele.Code==usageDesc || ele.CodeDesc==usageDesc);
                  if(entry) motorUsage = entry.Code;
                  this.vehicleDetails['TiraMotorUsage'] = motorUsage;
                  this.vehicleDetails['TiraBodyType'] = modelDesc;
                  this.vehicleDetails['EngineCapacity'] = engCapacity;
                  this.vehicleDetails['Motorusage'] = motorUsage;
              }
              this.vehicleDetails['Currency'] = this.currencyCode;
              this.vehicleDetails['ExchangeRate'] = this.exchangeRate;
              let commonDetails = JSON.parse(sessionStorage.getItem('commonDetails'));
              if(commonDetails){
                this.commonDetails = commonDetails;
                if(this.vehicleDetails==null || this.vehicleDetails==undefined) this.vehicleDetails={};
                if(this.vehicleDetails.PolicyStartDate==null || this.vehicleDetails.PolicyStartDate==undefined){
                  let dateList = commonDetails.policyStartDate.split('/');
                  if(dateList.length==1){
                    this.vehicleDetails.PolicyStartDate = this.datePipe.transform(commonDetails.policyStartDate, "dd/MM/yyyy");
                    this.vehicleDetails.PolicyEndDate = this.datePipe.transform(commonDetails.policyEndDate, "dd/MM/yyyy");
                  }
                  else{
                    this.vehicleDetails.PolicyStartDate = commonDetails.policyStartDate;
                    this.vehicleDetails.PolicyEndDate = commonDetails.policyEndDate;
                  }
                } 
                else{
                  let dateList = commonDetails.policyStartDate.split('/');
                  if(dateList.length==1){
                    this.vehicleDetails.PolicyStartDate = this.datePipe.transform(commonDetails.policyStartDate, "dd/MM/yyyy");
                    this.vehicleDetails.PolicyEndDate = this.datePipe.transform(commonDetails.policyEndDate, "dd/MM/yyyy");
                  }
                  else{
                    this.vehicleDetails.PolicyStartDate = commonDetails.policyStartDate;
                    this.vehicleDetails.PolicyEndDate = commonDetails.policyEndDate;
                  }
                }
                this.currencyCode = commonDetails?.currencyCode;
                this.exchangeRate = commonDetails?.exchangeRate;
                if(commonDetails?.promoCode!=null && commonDetails?.promoCode!=undefined) this.promoCode = commonDetails?.promoCode;
                if(this.promoCode!=null) this.havePromoCode = 'Y';
              }
              this.vehicleDetails['modifiedYN'] = 'Y';
              // this.vehicleDetails['SourceType'] = this.updateComponent.sourceType;
              // this.vehicleDetails['BrokerCode'] = this.updateComponent.brokerCode;
              // this.vehicleDetails['BranchCode'] = this.updateComponent.branchValue;
              // this.vehicleDetails['BrokerBranchCode'] = this.updateComponent.brokerBranchCode;
              // this.vehicleDetails['CustomerCode'] = this.updateComponent.CustomerCode;
              // this.vehicleDetails['CustomerName'] = this.updateComponent.CustomerName;
              // this.vehicleDetails['HavePromoCode'] = this.updateComponent.HavePromoCode;
              // this.vehicleDetails['PromoCode'] = this.updateComponent.PromoCode;
              vehicles.push(this.vehicleDetails);
              sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicles));
              this.onSaveSearchVehicles();
           }
            else{ 
              let motorUsage=null;
              if(usageDesc!=null && usageDesc!=''){
                  let entry = this.usageList.find(ele=>ele.Code==usageDesc || ele.CodeDesc==usageDesc);
                  if(entry) motorUsage = entry.Code;
                  this.vehicleDetails['TiraMotorUsage'] = motorUsage;
                  this.vehicleDetails['TiraBodyType'] = modelDesc;
                  this.vehicleDetails['EngineCapacity'] = engCapacity;
                  
                    this.vehicleDetails['Motorusage'] = motorUsage;
                  
              }
              let commonDetails = JSON.parse(sessionStorage.getItem('commonDetails'));
              if(commonDetails){
                if(this.vehicleDetails==null || this.vehicleDetails==undefined) this.vehicleDetails={};
                this.vehicleDetails.PolicyStartDate = this.datePipe.transform(commonDetails.policyStartDate, "dd/MM/yyyy");
                this.vehicleDetails.PolicyEndDate = this.datePipe.transform(commonDetails.policyEndDate, "dd/MM/yyyy");
                this.currencyCode = commonDetails?.currencyCode;
                this.exchangeRate = commonDetails?.exchangeRate;
                if(commonDetails?.promoCode!=null && commonDetails?.promoCode!=undefined) this.promoCode = commonDetails?.promoCode;
                if(this.promoCode!=null) this.havePromoCode = 'Y';
              }
              this.vehicleDetails['modifiedYN'] = 'Y';
              // this.vehicleDetails['SourceType'] = this.updateComponent.sourceType;
              // this.vehicleDetails['BrokerCode'] = this.updateComponent.brokerCode;
              // this.vehicleDetails['BranchCode'] = this.updateComponent.branchValue;
              // this.vehicleDetails['BrokerBranchCode'] = this.updateComponent.brokerBranchCode;
              // this.vehicleDetails['CustomerCode'] = this.updateComponent.CustomerCode;
              // this.vehicleDetails['CustomerName'] = this.updateComponent.CustomerName;
              this.vehicleDetails['VehicleMake'] = make;
              this.vehicleDetails['VehicleModel'] = model;
              
              this.onSaveSearchVehicles();
             
  
            //this.updateComponent.CurrencyCode = this.updateComponent.vehicleWishList[0].Currency;
              /*this.currencyCode = this.updateComponent.CurrencyCode;
            this.exchangeRate = this.updateComponent.exchangeRate;
            this.policyStartDate = this.updateComponent.policyStartDate;
            this.policyEndDate = this.updateComponent.policyEndDate;
            this.HavePromoCode = this.updateComponent.HavePromoCode;
            this.PromoCode = this.updateComponent.PromoCode;
            console.log('update',this.updateComponent.CurrencyCode);
            //this.acExecutiveId = this.updateComponent.AcExecutiveId;
            //this.commissionType = this.updateComponent.vehicleWishList[0].CommissionType;
            /*this.updateComponent.CurrencyCode = this.updateComponent.customerData[0].Currency;
            this.currencyCode = this.updateComponent.customerData[0].Currency;
            this.exchangeRate = this.updateComponent.customerData[0].ExchangeRate;
            this.policyStartDate = this.updateComponent.customerData[0].PolicyStartDate;
            this.policyEndDate = this.updateComponent.customerData[0].PolicyEndDate;
            this.HavePromoCode = this.updateComponent.customerData[0].HavePromoCode;
            this.PromoCode = this.updateComponent.customerData[0].PromoCode;
            this.acExecutiveId = this.updateComponent.customerData[0].AcExecutiveId;
            this.commissionType = this.updateComponent.customerData[0].CommissionType;*/
  
            }
            
  
            
            // if(type=='save'){
            //   if(this.editSection){
            //     sessionStorage.removeItem('vehicleDetails')
            //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
            //   }
            //   else{
            //   sessionStorage.removeItem('editVehicleId');
            //   vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength')
            //   sessionStorage.setItem('vehicleDetails',JSON.stringify(vehicleDetails));
            //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
            //   }
            // }
            // else{
            //   this.setVehiclValues(vehicleDetails);
            // }
          //}
      //   },
      //   (err) => { },
      // );
    }
    onInputChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 5);
      this.tareWeight = input.value;
    }
    onInputChangeTonnage(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 5);
      this.grossWeight = input.value;
    }
    onInputChangeHorsePower(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 5);
      this.horsePower = input.value;
    }
    onInputChangeDisplacement(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 3);
      this.displacement = input.value;
    }
    onInputChangenumberOfCylinders(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 2);
      this.numberOfCylinders = input.value;
    }
    onInputChangeEngineNumber(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 25);
      this.engineNo = input.value;
    }
    onInputChangechassisNo(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 25);
      this.chassisNo = input.value;
    }
    onInputChangeseatingCapacity(event: Event): void {
      const input = event.target as HTMLInputElement;
      // Remove non-numeric characters and limit length to 5
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 2);
      this.seatingCapacity = input.value;
    }
}
