import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
import { QuotationPlanComponent } from '../quotation-plan.component';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styles: [`input{ min-width: 20rem; }`]
})
export class DocumentInfoComponent {

  imageUrl:any=null;
  uploadDocList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  subuserType:any=null;userDetails:any=null;
  loginId:any=null;userType:any=null;agencyCode:any=null;
  branchCode:any=null;branchList:any[]=[];productId:any=null;
  insuranceId:any=null;loginType:any=null;notificationList:any[]=[];
  endorsementSection:boolean=false;endorseCategory:any=null;
  endorsementName:any=null;enableFieldsList:any[]=[];enableDriverDetails:boolean=false;
  endorsementId:any=null;enableCustomerDetails:boolean=false;
  currentDate:any=null;minDate:any=null;CoverList:any[]=[]
  quoteNo: any=null;enableDocumentDetails:boolean = false;quoteRefNo:any=null;
  vehicleDetails: any[]=[];commonDocTypeList:any[]=[];totalPremium:any=null;
  uploadedDocList:any[]=[];uploadedIndividualList:any[]=[];
  individualDocumentList:any[]=[];Riskdetails:any=null;endtPremium:any=null;
  orgPolicyNo:any=null;endorsePolicyNo:any[]=[];endorsementType:any=null;
  quoteDetails:any=null;listDocTypes:any=null;currencyCode:any=null;localPremiumCost:any=null;
  EmiYn: any=null;vehicleList:any[]=[];emiPeriod: any=null;RiskId:any=null;
  emiMonth: any=null;dueAmount: any=null;LicenseList:any[]=[];
  uploadListDoc:any[]=[];columns:any[]=[];tableView = 'table';
  uploadedColumns:any[]=[];
  viewImageUrl: any=null;
  viewImageFileName: any=null;
  viewImageSection: boolean;
  driverDetailsList: any[]=[];
  coverlist: any[]=[];lang:any=null;
  BackSession: string;
  constructor(private sharedService: SharedService,private quoteComponent:QuotationPlanComponent,
    private router:Router,private appComp:AppComponent,private translate:TranslateService,
    private datePipe:DatePipe) {
    //this.vehicleId = sessionStorage.getItem('editVehicleId');
    //this.quoteNo = sessionStorage.getItem('quoteNo');
    //this.updateComponent.quoteNo = this.quoteNo;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    this.notificationList = [
      { CodeDesc: 'SMS', Code: 'Sms' },
      { CodeDesc: 'Mail', Code: 'Mail' },
      { CodeDesc: 'Whatsapp', Code: 'Whatsapp' }
    ];
      sessionStorage.removeItem('quotePaymentId');
      
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementSection = true;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        if(endorseObj.QuoteNo) this.quoteNo = endorseObj.QuoteNo;
        if(this.endorsementId!=42 && this.endorsementId!=842){
          this.enableCustomerDetails = this.enableFieldsList.some(ele=>ele=='customerName' || ele=='Title');
          this.enableDocumentDetails = this.enableFieldsList.some(ele=>ele=='documentId');
          this.enableDriverDetails = this.enableFieldsList.some(ele=>ele=='driverName' || ele=='DriverName');
        }
      }
      else{
        this.endorsementSection = false;
      }
     this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
     this.quoteNo = sessionStorage.getItem('quoteNo');
     var d= new Date();
     var year = d.getFullYear();
     var month = d.getMonth();
     var day = d.getDate();
      this.currentDate = new Date();
     this.minDate = new Date(year - 18,month, day );
     let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    // if(referenceNo){
    //   this.quoteRefNo = referenceNo;
    // }
    
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
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
   ngOnInit(){
    if(this.productId=='5' || this.productId=='46'){
      this.columns = ['SNo','FileName','Section','RegistrationNumber','DocumentType','Actions'];
      this.uploadedColumns = ['SNo','FileName','Section','RegistrationNumber','DocumentType','Actions'];
    }
    else if(this.productId=='43'){
      this.columns = ['SNo','FileName','Section','EmployeeName','DocumentType','Actions'];
      this.uploadedColumns = ['SNo','FileName','Section','EmployeeName','DocumentType','Actions'];
    }
    else if(this.productId=='42'){
      this.columns = ['SNo','FileName','Section','SerialNo','DocumentType','Actions'];
      this.uploadedColumns = ['SNo','FileName','Section','SerialNo','DocumentType','Actions'];
    }
    else if(this.productId=='59'){
      this.columns = ['SNo','FileName','Location','Section','ID','DocumentType','Actions'];
      this.uploadedColumns = ['SNo','FileName','Location','Section','ID','DocumentType','Actions'];
    }
    else{
      this.columns = ['SNo','FileName','Section','ID','DocumentType','Actions'];
      this.uploadedColumns = ['SNo','FileName','Section','ID','DocumentType','Actions'];
    }
      this.getCommonDocTypeList();
      this.getUploadedDocList(null,-1,null);
      if(this.quoteRefNo){
        this.getEditQuoteDetails();
        this.getLocationWiseList();
      }
   }
   getCommonDocTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "SectionId":"99999"
    }
    let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.commonDocTypeList = data.Result;
           this.commonDocTypeList = this.commonDocTypeList.filter(ele=>ele.Code!='23');
          //  this.commonDocTypeList = [
          //    {"Code":"1","CodeDesc":"License"},
          //    {"Code":"2","CodeDesc":"Aadhar Card"}
          //  ];
           
        }
      },
      (err) => { },
    );

  }
  getUploadedDocList(vehicleData:any,index:any,reqObj:any){
    let ReqObj = {
      "QuoteNo":  this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.uploadedDocList = data?.Result?.CommmonDocument;
            this.uploadedDocList = this.uploadedDocList.filter(ele=>ele.DocumentId!='23');
            this.uploadedIndividualList = data?.Result?.InduvidualDocument;
            if(this.uploadedDocList.length!=0){
              this.uploadedIndividualList = this.uploadedDocList.concat(this.uploadedIndividualList)
            }
              let entry = this.uploadedIndividualList.find(ele=>ele.DocumentId=='17' && ele.VerifiedYn!='Y');
              // if(entry){
              //   this.checkMandatoryDocument(entry);
              // }
          }
        },
        (err) => { },
      );
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
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.Riskdetails = data?.Result?.RiskDetails;
            if(this.endorsementSection){
              this.totalPremium = this.quoteDetails?.TotalEndtPremium;
            }
            else {
              if(this.EmiYn !='Y'){
                this.totalPremium = this.quoteDetails?.OverallPremiumFc;
              }
              else{
                this.totalPremium = this.quoteDetails?.DueAmount;
              }   
            }
            this.quoteComponent.setRiskDetails(this.Riskdetails);
            this.quoteComponent.currencyCode = data?.Result?.QuoteDetails?.Currency;
          for (let cover of this.Riskdetails) {
            let j = 0;
            if(cover?.SectionDetails){
              for (let section of cover?.SectionDetails) {
                let CoverData = section.Covers;
                for (let subsectioncover of section?.Covers) {
                  console.log("subsectioncover", subsectioncover);
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
                  console.log("otherCovers", CoverData);
                  this.CoverList.push(cover);
                  console.log("CoverList", this.CoverList);
                  if (j == cover?.SectionDetails) {
                    this.CoverList.push(cover);
                    console.log("vehicleList", this.CoverList);
                  }
                  else j += 1;
                }
              }
            }
          }
            let quoteDetails = data?.Result?.QuoteDetails;
            if(quoteDetails){
              if(quoteDetails.Endorsementeffdate!=null){
                this.orgPolicyNo = quoteDetails?.OriginalPolicyNo;
                this.endorsePolicyNo = quoteDetails?.policyNo;
                sessionStorage.setItem('endorsePolicyNo',quoteDetails?.OriginalPolicyNo);
                 this.endorsementType = quoteDetails.Endtcategdesc;
                if(!JSON.parse(sessionStorage.getItem('endorseTypeId'))){
                  let obj = {
                    "EndtTypeId": quoteDetails?.EndtTypeId,
                    "FieldsAllowed":quoteDetails.Endtdependantfields.split(','),
                    "EffectiveDate":quoteDetails.Endorsementeffdate,
                    "Remarks":quoteDetails.Endorsementeffdate,
                    "Category": quoteDetails.Endtcategdesc,
                    "EndtName": quoteDetails.EndtTypeDesc,
                    "PolicyNo": quoteDetails?.policyNo
                  }
                  sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
                  this.endorsementSection = true;
                }
              }
            }
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.listDocTypes = data.Result?.DocumentDetails;
            this.currencyCode = quoteDetails?.Currency;
            if(quoteDetails?.TotalEndtPremium!=null){
              this.endtPremium = quoteDetails?.TotalEndtPremium;
              if(this.endorsementSection){
                this.totalPremium = quoteDetails?.TotalEndtPremium;
              }
              else this.totalPremium = quoteDetails?.OverallPremiumFc;
            }
            else{
              if(this.endorsementSection){
                this.endtPremium = null;this.totalPremium =null;
              }
              else this.endtPremium = null;this.totalPremium = quoteDetails?.OverallPremiumFc;
            }
           
            
            this.localPremiumCost = quoteDetails?.OverallPremiumLc;
            if(quoteDetails.EmiYn!=null){
              this.EmiYn = quoteDetails.EmiYn;
              this.emiPeriod = quoteDetails.InstallmentPeriod;
              this.emiMonth = quoteDetails.InstallmentMonth;
              this.dueAmount = quoteDetails.DueAmount;
            }
            else{
              this.EmiYn = "N";
              this.emiPeriod = null;
              this.emiMonth = null;
            }
            let vehicles:any[] = data?.Result?.RiskDetails;
            if(vehicles.length!=0){
              let i=0;this.vehicleList=[];
              for(let vehicle of vehicles){
                let entry:any;
                // if(this.productId=='5')  entry=vehicle.VehicleDetails;
                // else if(this.productId=='4')  entry=vehicle.TravelPassengerDetails;
                // else if(this.productId=='59')  entry=vehicle.BuildingDetails;
                // else entry = vehicle.CommonDetails;
                entry = vehicle;
                //entry['CoverList'] = vehicle.Covers;
                this.vehicleList.push(entry);
                let obj={
                  "Code":entry.RiskId,
                  "CodeDesc":entry.Registrationnumber,
                  "RiskId": entry.RiskId
                }
                this.LicenseList.push(obj);
                 this.RiskId=entry.RiskId;
                i+=1;
                if(i==vehicles.length){
                  console.log("Final License List",this.LicenseList)
                  //this.setVehicleList();
                }
              }
            }
            if(this.vehicleList.length!=0){

              // if(this.productId=='59'){

              // }
              // else{
              //   this.setVehicleList();
              // }



              // let entry = this.vehicleList.find(ele=>String(ele.Vehicleid)==String(this.vehicleId));
              // if(entry){
              //   let index= this.vehicleList.findIndex(ele=>String(ele.Vehicleid)==entry.VehicleDetails.Vehicleid)
              //   let coverList:any[] = entry.Covers;
              //   if(coverList.length!=0 && this.coverList.length!=0){
              //     let i=0;
              //     for(let event of coverList){
              //       let cover = this.coverList.find(ele=>ele.CoverId == event.CoverId);
              //       if(cover){
              //         cover['selected']= true;
              //         this.onSelectCover(cover,true,this.vehicleId,'vehList');
              //       }
              //       i+=1;
              //       if(i==coverList.length){
              //         this.dataSource = new MatTableDataSource(this.coverList);
              //         this.dataSource.sort = this.sort;
              //         this.dataSource.paginator = this.paginator;
              //         this.applyFilter(this.filterValue);
              //       }
              //     }
              //   }
              //   else{
              //     this.dataSource = new MatTableDataSource(this.coverList);
              //     this.dataSource.sort = this.sort;
              //     this.dataSource.paginator = this.paginator;
              //     this.applyFilter(this.filterValue);
              //   }
              // }
              // else{
              //   this.dataSource = new MatTableDataSource(this.vehicleDetailsList);
              //   this.dataSource.sort = this.sort;
              //   this.dataSource.paginator = this.paginator;
              //   this.applyFilter(this.filterValue);
              // }
            }
            else{

            }
          }
          console.log("Final Total Premium",this.totalPremium);
      },
      (err) => { },
    );

  }
  getLocationWiseList(){
      let ReqObj = {
          "QuoteNo": this.quoteNo,
          "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}document/getlocationwisesrisk`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data?.Result){
                    this.individualDocumentList = data?.Result?.InduvidualDocuments;
                    if(data.Result?.CommonDocuments && this.individualDocumentList.length!=0){
                      let sectionList = this.individualDocumentList[0].SectionList;
                      let defaultObj = [{"SectionId":'99999',"SectionName":'ALL',"CodeDescLocal":'Todos',
                      "IdList":[{RiskId: "99999", Id: "ALL","CodeDescLocal":'Todos', IdType: "REGISTER_NUMBER"}]
                      }];
                      this.individualDocumentList[0].SectionList = defaultObj.concat(sectionList);
                    }
                    console.log('Indivijual List',data?.Result?.InduvidualDocuments);
            }
          },
          (err) => { },
        );
  }
  getIdValue(){
    if(this.lang=='en') return 'Id';
		 else return 'CodeDescLocal'
  }
  getSectionName(){
     if(this.lang=='en') return 'SectionName';
		 else return 'CodeDescLocal'
  }
  getLocationName(){
    if(this.lang=='en') return 'LocationName';
		 else return 'CodeDescLocal'
  }
  getDisplayName(){
    if(this.lang=='en') return 'CodeDesc';
		else return 'CodeDescLocal'
  }
  getDeleteYN(val){
    if(val=='Y'){
        if(this.lang=='en') return 'Yes';
		    else return 'Sim'
    }
    else{
      if(this.lang=='en') return 'No';
		  else return 'Não'
    }
  }
  getDeleteName(){
    if(this.lang=='en') return 'Delete!!!';
		else return 'Excluir!!!'
  }
  getDeleteMsg(){
    if(this.lang=='en') return 'Do You Want to Delete this Document?';
		else return 'Você deseja excluir este documento?'
  }
  getBacks(){
    this.BackSession = sessionStorage.getItem('back');
    if(this.subuserType=='b2c' || this.subuserType=='B2C Broker'){ this.router.navigate(['/quotation/plan/motor-details'])}
    else if(this.BackSession=="skipBack"){
      sessionStorage.removeItem('back');
      if(this.productId!='4') this.router.navigate(['/quotation/plan/premium-details']);
      else this.router.navigate(['/quotation/plan/travel-quote-details']);
    }
    else{

   
    if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.coverlist=[];let i=0;
      for(let vehicle of this.Riskdetails){
        let vehEntry = vehicle.SectionDetails;
        if(vehEntry.length!=0){
          let j=0;
          for(let s of vehEntry){
          let covers = s.Covers;
          if(covers.length!=0){
            let entry = covers.filter(ele=>ele.CoverId == '55');
            if(entry.length!=0){
              this.coverlist.push(entry)
            }
          }
          j+=1;
        }
        }
        i+=1;
      }           
              if(this.coverlist.length!=0){
                this.router.navigate(['quotation/plan/main/accessories']);
              }
              else{
                if(this.productId=='5' && this.insuranceId!='100028' && this.insuranceId!='100020'){
                  this.router.navigate(['/quotation/plan/main/driver-info'])
                }
                else this.router.navigate(['/quotation/plan/premium-details']);
              }
    }
    else if(this.productId=='5' || this.productId=='59' || this.productId=='32' || this.productId=='39' || this.productId=='14' || this.productId=='15' || this.productId=='19' || this.productId=='1' || this.productId=='6' || this.productId=='16' || this.productId =='21' || this.productId =='26' || this.productId =='25' || this.productId =='24' || this.productId=='42' || this.productId=='43' || this.productId=='13' || this.productId=='27'){
      //this.router.navigate(['/quotation/plan/premium-details']);
      if(this.productId=='6' || this.productId=='13' || this.productId=='16' || this.productId=='1') this.router.navigate(['/quotation/plan/premium-details']);
      else this.router.navigate(['/quotation/plan/main/accessories']);
    }
    else{
        if(this.productId=='5' && this.insuranceId!='100028' && this.insuranceId!='100020'){
          this.router.navigate(['/quotation/plan/main/driver-info'])
        }
        else if(this.productId=='14' || this.productId=='24' || this.productId=='59' || this.productId=='13'){
          this.router.navigate(['/quotation/plan/main/accessories']);
        }
        else if(this.productId=='4') this.router.navigate(['/quotation/plan/travel-quote-details']);
        else  this.router.navigate(['/quotation/plan/premium-details']);
      }
    }
  }
  onProceed(){
    if(this.endorsementSection){
        if(this.endtPremium!=null && this.endtPremium!='' && this.endtPremium!=0 && this.endtPremium!=undefined){
              this.onMakePayment();
        }
        else{
          sessionStorage.removeItem('quotePaymentId');
          if((this.productId=='5' || this.productId=='46' || this.productId=='29') && this.enableDriverDetails){
            this.onMakePayment();
          }
          // else if(this.enableCustomerDetails){
          //     this.saveCustomerDetails();
          // }
          else {
            
            if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
              this.router.navigate(['/Home/customer/ClientDetails']);
            }
            else  this.router.navigate(['/quotation/plan/main/payment']);
          }
        }
    }
    else{
      this.onMakePayment();
    }
  }
  onMakePayment(){
    if(this.subuserType==null){
      this.subuserType = this.userDetails.Result.SubUserType;
      sessionStorage.setItem('typeValue',this.subuserType)
    }
    let amount = null;
    if(this.EmiYn=='Y'){
      amount = this.dueAmount;
    }
    else{
      amount = this.localPremiumCost;
    }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "EmiYn": this.EmiYn,
      "InstallmentMonth":this.emiMonth,
      "InstallmentPeriod":this.emiPeriod,
      "InsuranceId": this.insuranceId,
      "Premium": amount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "SubUserType": this.subuserType,
      "UserType": this.userType
    }
    let urlLink = `${this.CommonApiUrl}payment/makepayment`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if((this.productId=='5' || this.productId=='46' || this.productId=='29') && this.driverDetailsList.length!=0 && (!this.endorsementSection || (this.endorsementSection && this.enableDriverDetails))){
            sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
            if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
              this.router.navigate(['/quotation/plan/main/payment']);
            }
            else {
              if(this.EmiYn!='Y'){
                this.router.navigate(['/quotation/plan/main/payment']);
              }
              else{
                sessionStorage.removeItem('Makepaymentid');
                this.router.navigate(['/quotation/plan/main/payment']);
              }
              
            }
          }
          else if(data.Result.PaymentId){
            sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
            if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
              this.router.navigate(['/quotation/plan/main/payment']);
            }
            else this.router.navigate(['/quotation/plan/main/payment']);
          }
        }
      },
      (err) => { },
    );
  }
  onUploadDocuments(target:any,fileType:any,type:any,uploadType:any){
    console.log("Event ",target);
    let event:any=null;
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
    console.log("Final File List",this.uploadDocList)
  }
  onUploadListDocuments(target:any,fileType:any,type:any,uploadType:any){
    
    console.log("Event ",target);
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
          let entry = { 'url': element,'DocTypeId':'','Id':'','typeList':[],'sectionList':[],'sectionId':'','locationId':'','locationList':this.individualDocumentList,'docTypeList':[],'filename':element.name, 'JsonString': {} }
          console.log('KKKKKKKKKK',entry);
          console.log('OOOOOOOOOO',this.individualDocumentList.length);
          if(this.individualDocumentList.length==1){
            console.log('NNNNNNNNNNNNN',this.individualDocumentList);
            entry.locationId = this.individualDocumentList[0].LocationId;
            entry.sectionList = this.individualDocumentList[0].SectionList;
            this.uploadListDoc.push(entry)
            if(entry.sectionList.length==1){this.uploadListDoc[this.uploadListDoc.length-1].sectionId= entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)}
          }
          else{
            // entry.sectionList = this.individualDocumentList[0].SectionList;
            this.uploadListDoc.push(entry)
            if(entry.sectionList.length==1){this.uploadListDoc[this.uploadListDoc.length-1].sectionId= entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)}
          }
            //this.vehicleList[i].docList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });
        }
    }

  }
  onDeleteSelectedDocument(index){
    this.uploadListDoc.splice(index,1);
  }
  onChangeLocation(entry){
    if(entry.locationId!=null){
        entry.sectionList = this.individualDocumentList.find(ele=>ele.LocationId==entry.locationId)?.SectionList;
        entry.sectionId='';
    }
  }
  onChangeSectionType(rowData,index){
   let entry = this.individualDocumentList.find(ele=>ele.LocationId==rowData.locationId);
    if(entry){
      let section = entry.SectionList.find(ele=>ele.SectionId==rowData.sectionId);
      if(section){
        rowData.Id = "";
        rowData['typeList'] = section.IdList;
        if(rowData.typeList.length==1){rowData.Id= rowData.typeList[0].Id;}
        if(section.docTypeList==undefined){
          let ReqObj = {
            "InsuranceId":this.insuranceId,
            "ProductId": this.productId,
            "SectionId": rowData.sectionId
          }
          let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                  this.uploadListDoc[index].docTypeList = data.Result;
                  section['docTypeList'] = data.Result;
              }
            },
            (err) => { },
          );
        }
        else rowData['docTypeList'] = section.docTypeList;
      }
    }
  }
  onFileUploadCommonList(){

    let docList = this.uploadDocList;
    if(docList.length!=0){
      let i=0;
      for(let doc of docList){
        let ReqObj={
          "QuoteNo":this.quoteNo,
          "Id":"99999",
          "IdType":"Common" ,
          "SectionId":"99999" ,
          "InsuranceId": this.insuranceId,
          "DocumentId":doc.DocTypeId,
          "RiskId":"99999",
          "LocationId":"99999",
          "LocationName":"Common" ,
          "ProductId":this.productId,
          "FileName":doc.filename,
          "OriginalFileName":doc.filename,
          "UploadedBy":this.loginId
        }
        if(this.endorsementSection && this.enableDocumentDetails){
          ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
          ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
          ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
          ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
          ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
          ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
          ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
        }
        let urlLink = `${this.CommonApiUrl}document/upload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
            if(data.ErrorMessage){
              for(let entry of data.ErrorMessage){
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   entry.Field,
                //   entry.Message,
                //   config);
              }
            }
            else if(data?.Result){
                i+=1;
                if(i==docList.length){
                  this.uploadDocList = [];
                  this.getUploadedDocList(null,-1,null);
                }
              }
            },
            (err) => { },
          );
      }
    }
  }
  onFileUploadVehicleList(index){
    //let vehicleDetails = this.vehicleList[index];
    let docList = this.uploadListDoc;
    if(docList.length!=0){
      let i=0;
      let doc = docList[index]
        console.log("Document",doc)
        let IdType=null,locationName=null,RiskId=null;
        let locations = doc.locationList.find(ele=>ele.LocationId==doc.locationId);
        if(locations) locationName = locations.LocationName;
        let entry = doc.typeList.find(ele=>ele.Id==doc.Id);
        if(entry){IdType = entry.IdType;RiskId=entry.RiskId}
        let ReqObj = {
          "QuoteNo":this.quoteNo,
          "Id":doc.Id,
          "IdType":IdType,
          "SectionId":doc.sectionId,
          "InsuranceId":this.insuranceId,
          "DocumentId":doc.DocTypeId,
          "RiskId":RiskId,
          "LocationId": doc.locationId,
          "LocationName": locationName,
          "ProductId": this.productId,
          "FileName": doc.filename,
          "OriginalFileName":doc.filename,
          "UploadedBy": this.loginId
          
        }
        if(ReqObj.Id=='All') ReqObj.Id = '99999';
        // let ReqObj={
        //   "RequestReferenceNo": this.quoteRefNo,
        //   "InsuranceId": this.insuranceId,
        //   "DocumentId": doc.DocTypeId,
        //   "ProductId": this.productId,
        //   "SectionId": doc?.SectionId,
        //   "DocumentReferenceNo":"",
        //   "FileName": doc.filename,
        //   "OriginalFileName": doc.filename,
        //   "CreatedBy":this.loginId,
        //   "QuoteNo":this.quoteNo,
        //   "Id": doc.Id
        // }
        if(this.endorsementSection && this.enableDocumentDetails){
          ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
          ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
          ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
          ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
          ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
          ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
          ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
        }
        let urlLink = `${this.CommonApiUrl}document/upload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
            if(data.ErrorMessage){
              for(let entry of data.ErrorMessage){
               
              }
            }
            else if(data?.Result){
                  this.uploadListDoc.splice(index,1);
                  if(this.productId=='4' && ReqObj?.DocumentId=='17'){
                    this.getUploadedDocList(null,null,ReqObj);
                  }
                  else this.getUploadedDocList(null,null,null);
                }
            },
            (err) => { },
          );
    }
  }
  onListDocumentDownload(vehicleIndex,doc){
    let ReqObj = {
      "Id": doc.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": doc.UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OriginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onDeleteListDocument(vehIndex,rowData){
    Swal.fire({
      title: `<strong>${this.getDeleteName()}</strong>`,
      icon: 'info',
      html:
        `<ul class="list-group errorlist">
         <li>${this.getDeleteMsg()}</li>
     </ul>`,
      showCloseButton: false,
      //focusConfirm: false,
      showCancelButton:true,
     //confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: this.getDeleteYN('Y'),
     cancelButtonText: this.getDeleteYN('N'),
    }).then((result) => {
      if (result.isConfirmed) {
          this.onDeleteListDocProceed(vehIndex,rowData);
      }
    });
  }
  onDeleteListDocProceed(vehIndex,rowData){
    if(vehIndex){
      let entry = this.vehicleList[vehIndex];
    } 
    let ReqObj = {
        "Id": rowData.Id,
        "QuoteNo": this.quoteNo,
        "UniqueId": rowData.UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/delete`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.ErrorMessage.length!=0){
              for(let entry of data.ErrorMessage){
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   entry.Field,
                //   entry.Message,
                //   config);
                 }
            }
            else if(data?.Result){
              // let type: NbComponentStatus = 'success';
              //   const config = {
              //     status: type,
              //     destroyByClick: true,
              //     duration: 4000,
              //     hasIcon: true,
              //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //     preventDuplicates: false,
              //   };
              // this.toastrService.show(
              //   "Delete",
              //   "Document Deleted Successfully",
              //   config);
                this.getUploadedDocList(null,null,null);
            }
          },
          (err) => { },
        );
  }
  onViewListDocument(index,doc)
  {
     this.viewImageUrl = null;
    let ReqObj = {
      "Id": doc.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": doc.UniqueId
    }
  let urlLink = `${this.CommonApiUrl}document/getcompressedimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      this.viewImageUrl = data.Result.ImgUrl;
      this.viewImageFileName =  data.Result.OrginalFileName;
      this.viewImageSection = true;
      // const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
      //   data: {
      //     title: data.Result.OrginalFileName,
      //          imageUrl: data.Result.ImgUrl
      //   }
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      // });

    },
    (err) => { },
  );

  }
  onChangeIdType(rowData){
    
  }
}
