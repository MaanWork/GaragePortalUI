import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { QuotationPlanComponent } from '../quotation-plan.component';

import * as Mydatas from '../../../../../app-config.json';
import { AddPassenger } from '../models/addPassenger';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProductData } from '../models/product';
@Component({
  selector: 'app-travel-quote-details',
  templateUrl: './travel-quote-details.component.html',
  styleUrls: ['./travel-quote-details.component.scss']
})
export class TravelQuoteDetailsComponent {
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  visible:boolean=false;
  visibleUp:boolean=false;
  passengerGrid:boolean=false;
  quoteRefNo: string;
  quoteNo: string;
  subuserType: string;
  userDetails: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  branchCode: any;
  branchList: any;
  productId: any;
  insuranceId: any;
  loginType: any;
  imageUrl: any;
  individualDocumentList: any[]=[];
  uploadedDocList: any;
  uploadedIndividualList: any;
  customerDetails: any;
  titleValue: any;
  clientName: any;
  clientStatus: any;
  idTypeDesc: any;
  idNumber: any;
  mobileNumber: any;
  customerquoteRefNo: string;
  policyStartDate: any;
  policyEndDate: any;
  form = new FormGroup({});

  model = {};
  AddPassengerField: any[]=[];
  addPassengerItem: any;
  PassengerFirstName: any;
  PassengerLastName: any;
  GenderId: any;
  RelationId: any;
  Dob: any;
  Nationality: any;
  PassportNo: any;
  firstNameError: boolean;
  lastNameError: boolean;
  DobError: boolean;
  NationalityError: boolean;
  genderError: boolean;
  relationShipError: boolean;
  passportError: boolean;
  GroupIdError: boolean;
  relationshipDesc: any;
  relationShipList: any;
  GroupId: any;
  uploadListDoc:any[]=[];
  PassengerId: any;
  historyRecordsList: any[]=[];
  editIndex: number;
  countryList: any[]=[];
  enableDocumentDetails: any;
  OverallPremium: any;
  QuoteDetails:  any;
  quoteDetails: any;
  passengerCountList: any;
  constructor(private sharedService: SharedService,
    private router:Router,private datePipe : DatePipe
   ) {
    //   //this.quoteNo = sessionStorage.getItem('quoteNo');
    //   //this.updateComponent.quoteNo = this.quoteNo;
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
   }
  //   //this.vehicleId = sessionStorage.getItem('editVehicleId');
  
  //   }
  ngOnInit(){
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
     this.quoteNo = sessionStorage.getItem('quoteNo');
     this.customerquoteRefNo = sessionStorage.getItem('customerReferenceNo');
     
     this.getCustomerDetails(this.customerquoteRefNo);
     this.getExistingTravelDetails();
     this.getEditQuoteDetails();
     this.getPassengerCountList();
     this.getpassengerDetails();
     
  }
  ongetBack(){
      this.router.navigate(['/quotation/plan/premium-details'])
  }
  getpassengerDetails(){
    let quoteNo=sessionStorage.getItem('quoteNo');
    let ReqObj =  {
      "QuoteNo": quoteNo,
    }
     //let urlLink = `${this.motorApiUrl}api/getmotordetails`;
     let urlLink = `${this.motorApiUrl}api/getactiverpassengers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.historyRecordsList = data.Result;
          if(this.historyRecordsList.length==0) this.addPassenger();
          else this.passengerGrid = true;
          // this.validRecordsList = data.Result;
          // this.getHistoryRecords(data.Result);
          // this.PassengerDetails = data.Result;
          // this.passengerSection = true;
          // this.setTravelValues();
        }
      },
      (err) => { },
    );
    }
  addPassenger(){
    this.editIndex=null;
    this.visible=true;
    this.passengerGrid=false;
    this.visibleUp=false;
    this.addPassengerItem = new ProductData();
    let fireData = new AddPassenger();
    let entry = [];
    this.AddPassengerField = [fireData?.fields];
    let fieldList = this.AddPassengerField[0].fieldGroup[0].fieldGroup;
    console.log(fieldList,"fieldList");
    
    let regionHooks2 ={ onInit: (field: FormlyFieldConfig) => {
      field.formControl.valueChanges.subscribe(() => {
        this.getRelationshipList('change')
      });
    } }
    let regionHooks3 ={ onInit: (field: FormlyFieldConfig) => {
      field.formControl.valueChanges.subscribe(() => {
        this.onRelationIdChange('change');
      });
    } }
    for(let field of fieldList){
      if(field.key == "GenderId"){
        field.hooks = regionHooks2;
        if(this.addPassengerItem.GenderId==null || this.addPassengerItem.GenderId==''){this.addPassengerItem.GenderId='M';this.getRelationshipList('change');}
      }
      if(field.key == "RelationId"){field.hooks = regionHooks3;}
    }
    this.getCountryList();
  }
  onRelationIdChange(type){
      if(this.addPassengerItem.RelationId!=null && this.addPassengerItem.RelationId!=''){
        this.addPassengerItem.relationshipDesc = this.relationShipList.find(ele=>ele.Code==this.addPassengerItem.RelationId)?.CodeDesc;
      }
  }
  getCountryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/nationality`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.countryList = data.Result;
           // this.getTitleList();
           let defaultObj = [{'Code':null,"CodeDesc":"- - Select - -"}]
          this.countryList = defaultObj.concat(data.Result);
          console.log(this.countryList,"this.countryList");
          
          if(data.Result.length!=0){
            let i=0;
            for(let entry of this.countryList){
              entry['value'] = entry.Code;
              entry['label'] = entry.CodeDesc;
              i+=1;
              if(i==this.countryList.length){
                let fieldList = this.AddPassengerField[0].fieldGroup[0].fieldGroup;
                for(let field of fieldList){
                  if(field.key == "Nationality"){
                    field.props.options = this.countryList;
                }
          }
        }
        }}
      }
      },
      (err) => { },
    );
  }
  getRelationshipList(type){
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "Gender":this.addPassengerItem.GenderId
    }

    let urlLink = `${this.CommonApiUrl}dropdown/relationtype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          console.log("data.Result",data.Result);
          
          let defaultObj = [{'Code':null,"CodeDesc":"- - Select - -"}]
          this.relationShipList = defaultObj.concat(data.Result);
          if(data.Result.length!=0){
            let i=0;
            for(let entry of this.relationShipList){
              entry['value'] = entry.Code;
              entry['label'] = entry.CodeDesc;
              i+=1;
              // if(this.historyRecordsList.length==0 && type=='change'){
               
              // }
              if(i==this.relationShipList.length){
                let fieldList = this.AddPassengerField[0].fieldGroup[0].fieldGroup;
                if(this.historyRecordsList.length==0){
                  this.addPassengerItem.RelationId = this.RelationId;
                  if(this.addPassengerItem.GenderId == 'M'){
                    this.RelationId = '9';
                  }
                  else if(this.addPassengerItem.GenderId == 'F'){
                    this.RelationId = '10';
                  }
                  this.addPassengerItem.RelationId = this.RelationId;
                }
                for(let field of fieldList){
                  if(field.key == "RelationId"){
                    field.props.options = this.relationShipList;
                    if(this.historyRecordsList.length==0){
                      field.props.disabled = false;
                      field.formControl.setValue(this.RelationId)
                      field.props.disabled = true;
                    }
                  }
                  if(field.key=='Dob'){
                    let backDate = new Date();
                    var d = backDate;
                    var year = d.getFullYear();
                    var month = d.getMonth();
                    var day = d.getDate();
                    backDate = new Date(year, month, day);
                    if(this.RelationId=='9' || this.RelationId=='10') field.templateOptions.datepickerOptions.max = new Date(year-18, month, day-1);
                  }
                }
            }
            }
          
        
          // for (let i = 0; i < this.historyRecordsList.length; i++) {
          //   this.historyRecordsList[i].label = this.historyRecordsList[i]['CodeDesc'];
          //   this.historyRecordsList[i].value = this.historyRecordsList[i]['Code'];
          //   this.AddPassengerField[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.historyRecordsList);
          //   // if (i == this.historyRecordsList.length - 1) {
          //   //   alert();
          //   //   console.log('Itemsss',this.AddPassengerField[0].fieldGroup[0].fieldGroup[3])
          //   // }
          // }
          // this.PassengerDetails[index]['relationship'] = data.Result;
          // if(index==0 &&  this.PassengerDetails[index].RelationId == null) this.PassengerDetails[index].RelationId = "9";
          }
        }
      },
      (err) => { },
    );
  }
  close(type){
    if(type=='Add') this.visible=false;
   else if(type=='Update')
    { this.visibleUp=false;
  }
  }
  UploadOpen(){
    this.passengerGrid=false;
    this.visible=false;
    this.visibleUp=true;
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
  onDeleteSelectedDocument(index){
    this.uploadListDoc.splice(index,1);
  }
  passengerSave(){
    
    this.passengerGrid=true;
  
    console.log(this.addPassengerItem ,"this.addPassengerItem ");
    
    let i=0;
    this.firstNameError=false;this.lastNameError=false;this.DobError=false;this.NationalityError=false;
    this.genderError = false;this.relationShipError =false;this.passportError = false;this.GroupIdError=false;
    // if(this.PassengerFirstName==null){i+=1;this.firstNameError=true;}
    // if(this.PassengerLastName==null){i+=1;this.lastNameError = true;}
    // if(this.GenderId==null){i+=1;this.genderError = true;}
    // if(this.RelationId==null){i+=1;this.relationShipError = true;}
    // if(this.RelationId!=null){this.relationshipDesc = this.relationShipList.find(ele=>ele.Code==this.RelationId)?.CodeDesc;}
    // if(this.Dob==null){i+=1;this.DobError = true;}
    // if(this.PassportNo==null){i+=1;this.passportError = true;}
    // if(this.Nationality==null){i+=1;this.NationalityError = true;}
    if(i==0){
      //alert(this.addPassengerItem.Dob);
      let entry = {
        
        "Dob": this.datePipe.transform(this.addPassengerItem.Dob, "dd/MM/yyyy"),
        "GenderId": this.addPassengerItem.GenderId,
        "GroupId": this.addPassengerItem.GroupId,
        "Nationality": this.addPassengerItem.Nationality,
        "PassengerFirstName": this.addPassengerItem.PassengerFirstName,
        "PassengerId": this.addPassengerItem.PassengerId,
        "RelationDesc": this.addPassengerItem.relationshipDesc,
        "PassengerLastName": this.addPassengerItem.PassengerLastName,
        "PassportNo": this.addPassengerItem.PassportNo,
        "RelationId": this.addPassengerItem.RelationId
      }
      if(this.editIndex==null) this.historyRecordsList.push(entry);
      else this.historyRecordsList[this.editIndex] = entry;
      console.log(this.historyRecordsList,"this.historyRecordsList");
      this.visible=false;
    }
    
  }
  passengerDelete(index){
    this.historyRecordsList.splice(index,1);
  }
  passengerEdit(rowData){
    this.editIndex = this.historyRecordsList.findIndex(ele=>ele.PassportNo == rowData.PassportNo && ele.Dob==rowData.Dob);
    console.log("Edit Index",this.editIndex);
    this.addPassengerItem = new ProductData();
    this.addPassengerItem.PassengerId = rowData.PassengerId;
    this.addPassengerItem.PassengerFirstName = rowData.PassengerFirstName;
    this.addPassengerItem.PassengerLastName = rowData.PassengerLastName;
    this.addPassengerItem.Dob = rowData.Dob;
    this.addPassengerItem.Nationality = rowData.Nationality;
    this.addPassengerItem.PassportNo = rowData.PassportNo;
    this.addPassengerItem.GenderId = rowData.GenderId;
    this.addPassengerItem.GroupId = rowData.GroupId;
    this.addPassengerItem.RelationId = String(rowData.RelationId);
    this.addPassengerItem.relationshipDesc = rowData.RelationDesc;
   // this.getRelationshipList('direct');
    console.log("Final Relation On Edit",this.RelationId,rowData) ;
    this.passengerGrid=false;
    this.visible=true;
  }

  ProceedToDoc(type){
    if(this.historyRecordsList.length!=0){
      let urlLink = null;
      if(type=='save') urlLink = `${this.motorApiUrl}api/savepassengers`;
      else urlLink = `${this.motorApiUrl}api/proceedpassengers`;
      let ReqObj = {
        "CreatedBy": this.loginId,
        "PassengerList": this.historyRecordsList,
        "QuoteNo": this.quoteNo
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.router.navigate(['/quotation/plan/main/document-info'])
          }
        },
        (err) => { },
      );
    }
    //this.router.navigate(['/quotation/plan/main/document-info'])
  }
  getCustomerDetails(referenceNo){
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          if(this.customerDetails){
            console.log("Cust Details",this.customerDetails)
            sessionStorage.setItem('customerDetails',JSON.stringify(this.customerDetails));
            //this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
              this.titleValue = this.customerDetails.TitleDesc;
              this.clientName = this.customerDetails?.ClientName;
              this.clientStatus = this.customerDetails?.ClientStatusDesc;
              this.idTypeDesc = this.customerDetails?.IdTypeDesc;
              this.idNumber = this.customerDetails?.IdNumber;
              this.mobileNumber = this.customerDetails?.MobileNo1;
              // this.OverallPremium = this.QuoteDetails?.OverallPremiumFc;
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
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          console.log("Data**",data?.Result);
          this.quoteDetails = data?.Result?.QuoteDetails;
          // this.Riskdetails = data?.Result?.RiskDetails;
          this.OverallPremium = this.quoteDetails?.OverallPremiumFc;
        }
      },
      (err) => { },
    );
  }
  getPassengerCountList(){
    let quoteNo=sessionStorage.getItem('quoteNo');
    let ReqObj =  {
      "QuoteNo": quoteNo,
    }
    //let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    let urlLink = `${this.CommonApiUrl}quote/groupsuminsureddetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
              this.passengerCountList = data?.Result;
        }
      },
      (err) => { },
    );
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
          //   this.travelDetails = customerDatas;
          //   this.Code= customerDatas.SourceTypeId;
          //   this.sourceType = this.premium;
          //   this.branchValue = customerDatas.BranchCode;
          //   this.brokerBranchCode = customerDatas.BrokerBranchCode;
          //  // this.brokerBranchCode = this.brokerBranchCode;
          //   this.branchValue = customerDatas.BranchCode;
          //   this.brokerCode = customerDatas.BrokerCode;
          //   this.onSourceTypeChange('direct');
          //   this.premiunDropdown4(this.Code);
           
          // this.updateComponent.brokerCode = customerDatas.BrokerCode;
  //this.HavePromoCode = customerDatas.HavePromoCode;
            // this.planType = customerDatas.PlanTypeId;
            // this.promocode = customerDatas.PromoCode;
            // this.premium = customerDatas.SectionId;
            // this.customerCode = customerDatas.CustomerCode;
           // this.getPlanTypeList(this.premium );
            // this.executiveValue = customerDatas?.AcExecutiveId;
            // this.commissionValue = customerDatas?.CommissionType;
            this.policyStartDate = customerDatas?.TravelStartDate;
            this.policyEndDate = customerDatas?.TravelEndDate
      },
      (err) => { },
    );
  }





  // onUploadListDocuments(target:any,fileType:any,type:any,uploadType:any){
    
  //   console.log("Event ",target);
  //   let event:any = null;
  //   if(uploadType=='drag') event = target
  //   else event = target.target.files;
  //   let fileList = event;
  //   for (let index = 0; index < fileList.length; index++) {
  //     const element = fileList[index];

  //     var reader:any = new FileReader();
  //     reader.readAsDataURL(element);
  //       var filename = element.name;

  //       let imageUrl: any;
  //       reader.onload = (res: { target: { result: any; }; }) => {
  //         imageUrl = res.target.result;
  //         this.imageUrl = imageUrl;
  //         let entry = { 'url': element,'DocTypeId':'','Id':'','typeList':[],'sectionList':[],'sectionId':'','locationId':'','locationList':this.individualDocumentList,'docTypeList':[],'filename':element.name, 'JsonString': {} }
  //         console.log('KKKKKKKKKK',entry);
  //         console.log('OOOOOOOOOO',this.individualDocumentList.length);
  //         if(this.individualDocumentList.length==1){
  //           console.log('NNNNNNNNNNNNN',this.individualDocumentList);
  //           entry.locationId = this.individualDocumentList[0].LocationId;
  //           entry.sectionList = this.individualDocumentList[0].SectionList;
  //           this.uploadListDoc.push(entry)
  //           if(entry.sectionList.length==1){this.uploadListDoc[this.uploadListDoc.length-1].sectionId= entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)}
  //         }
  //         else{
  //           // entry.sectionList = this.individualDocumentList[0].SectionList;
  //           this.uploadListDoc.push(entry)
  //           if(entry.sectionList.length==1){this.uploadListDoc[this.uploadListDoc.length-1].sectionId= entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)}
  //         }
  //           //this.vehicleList[i].docList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });
  //       }
  //   }

  // }
  // getUploadedDocList(vehicleData:any,index:any,reqObj:any){
  //   let ReqObj = {
  //     "QuoteNo":  this.quoteNo
  //   }
  //   let urlLink = `${this.CommonApiUrl}document/getdoclist`;
  //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //     (data: any) => {
  //         if(data?.Result){
  //           this.uploadedDocList = data?.Result?.CommmonDocument;
  //           this.uploadedDocList = this.uploadedDocList.filter(ele=>ele.DocumentId!='23');
  //           this.uploadedIndividualList = data?.Result?.InduvidualDocument;
  //           if(this.uploadedDocList.length!=0){
  //             this.uploadedIndividualList = this.uploadedDocList.concat(this.uploadedIndividualList)
  //           }
  //             let entry = this.uploadedIndividualList.find(ele=>ele.DocumentId=='17' && ele.VerifiedYn!='Y');
  //             // if(entry){
  //             //   this.checkMandatoryDocument(entry);
  //             // }
  //         }
  //       },
  //       (err) => { },
  //     );
  // }
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
}
