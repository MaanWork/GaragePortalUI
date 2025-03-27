import { DatePipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { ProductData } from '../../garage/product';
import { FNOL } from '../../quotation/quotation-plan/models/FNOL';
import * as Mydatas from '../../../../app-config.json';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-create-fnol',
  templateUrl: './create-fnol.component.html',
  styleUrls: ['./create-fnol.component.scss']
})
export class CreateFNOLComponent {
  public AppConfig: any = (Mydatas as any).default;
  public LiveApiUrl: any = this.AppConfig.LiveApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public form = new FormGroup({});
  productItem: any;
  Fields: any[] = [];
  policeStationList: any[] = [];
  natureoflossList: any[] = [];
  losslocationList: any[] = [];
  fnolEditData: any;
  userDetails: any;
  loginId: any;
  agencyCode: any;
  branchCode: any;
  productId: any;
  CompanyId: any;
  userType: any;
  CliamNo: string;
  brokerbranchCode: any;
  PolicyNo: string;
  uploadListDoc: any[] = []; // List of documents uploaded
  individualDocumentList: any[] = []; // Dropdown options for location
  uploadedIndividualList: any[] = [];
  PolicyNoDisabled:boolean= false
  uploadedDocList: any;
  insuranceId: any;
  imageUrl: any;
  lang: string;
  viewImageFileName: any;
  viewImageUrl: any;
  viewImageSection: boolean = false;
  FnolNo: string;
  PoliceReportNo: any =null;
  PolicySDate: any;
  PolicyEDate: any;
  PoliceStation: string;
  LossTime: string;
  constructor(private sharedService: SharedService, private datePipe: DatePipe,
    private messageService: MessageService, private router: Router, private translate: TranslateService, private appComp: AppComponent,
    private primeNGConfig: PrimeNGConfig) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Response.LoginId;
    this.agencyCode = this.userDetails.Response.OaCode;
    this.branchCode = this.userDetails.Response.BranchCode;
    this.productId = this.userDetails.Response.ProductId;
    this.CompanyId = this.userDetails.Response.CompanyId;
    this.userType = this.userDetails.Response.UserType;
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.PolicyNo = sessionStorage.getItem('PolicyNo');
    this.PoliceReportNo = sessionStorage.getItem('PoliceReportNo');
    this.PoliceStation = sessionStorage.getItem('PoliceStation');
    this.LossTime = sessionStorage.getItem('LossTime');
    this.FnolNo = sessionStorage.getItem('FnolNo');
    this.getpoliceStation();
    this.getnatureofLoss();
    this.getlosslocation();
    // this.FnolNo = "4444444444";
    if (this.PolicyNo) {
      this.getfnolEditData();

    }
    this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
    this.productItem = new ProductData();
    let fireData = new FNOL();
    this.Fields[0] = fireData?.fields?.fieldGroup[0];


    let idTypeHooks1 = {
      onInit: (field: FormlyFieldConfig) => {
        field.form.controls['policyNo'].valueChanges.pipe(
          // Wait 300ms after the last input before calling idTypechange
        ).subscribe(() => {
          //  this.getInsuredName(this.productItem.policyNo); 
        });
        field.props.suffix.onClick = (event: KeyboardEvent) => {
          console.log('Key pressed:', event.key);
          this.getInsuredName(this.productItem.policyNo);
        };
      }

    }


    let fieldList = this.Fields[0].fieldGroup;
    for (let field of fieldList) {
      if (field.key == 'policyNo') {
        field.hooks = idTypeHooks1;
      }

    }
  }
  getpoliceStation() {
    let urlLink = `${this.CommonApiUrl}dropdown/policeStation/${this.CompanyId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.policeStationList = data.Result;
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          for (let i = 0; i < this.policeStationList.length; i++) {
            this.policeStationList[i].label = this.policeStationList[i]['CodeDesc'];
            this.policeStationList[i].value = this.policeStationList[i]['Code'];
            if (i == this.policeStationList.length - 1) {
              let fieldList = this.Fields[0].fieldGroup;
              for (let field of fieldList) {
                if (field.key == 'policeStation') {
                  field.props.options = defaultRow.concat(this.policeStationList);
                  //this.checkFieldNames()
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getnatureofLoss() {
    let urlLink = `${this.CommonApiUrl}dropdown/natureofloss/${this.CompanyId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.natureoflossList = data.Result;
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          for (let i = 0; i < this.natureoflossList.length; i++) {
            this.natureoflossList[i].label = this.natureoflossList[i]['CodeDesc'];
            this.natureoflossList[i].value = this.natureoflossList[i]['Code'];
            if (i == this.natureoflossList.length - 1) {
              let fieldList = this.Fields[0].fieldGroup;
              for (let field of fieldList) {
                if (field.key == 'natureOfLoss') {
                  field.props.options = defaultRow.concat(this.natureoflossList);
                  //this.checkFieldNames()
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getlosslocation() {
    let urlLink = `${this.CommonApiUrl}dropdown/losslocation/${this.CompanyId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.losslocationList = data.Result;
          let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          for (let i = 0; i < this.losslocationList.length; i++) {
            this.losslocationList[i].label = this.losslocationList[i]['CodeDesc'];
            this.losslocationList[i].value = this.losslocationList[i]['Code'];
            if (i == this.losslocationList.length - 1) {
              let fieldList = this.Fields[0].fieldGroup;
              for (let field of fieldList) {
                if (field.key == 'lossLocation') {
                  field.props.options = defaultRow.concat(this.losslocationList);
                  //this.checkFieldNames()
                }
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  onSubmit() {
    // let DeliveryDate,WorkOrderDate
    // if (this.productItem.DeliveryDate != undefined && this.productItem.DeliveryDate != null && this.productItem.DeliveryDate != '') {
    //   if(String(this.productItem.DeliveryDate).includes('/')){
    //     DeliveryDate = this.productItem.DeliveryDate;
    //   }
    //   else DeliveryDate = this.datePipe.transform(this.productItem.DeliveryDate,'dd/MM/yyyy')
    // }
    // if (this.productItem.WorkOrderDate != undefined && this.productItem.WorkOrderDate != null && this.productItem.WorkOrderDate != '') {
    //   if(String(this.productItem.WorkOrderDate).includes('/')){
    //     WorkOrderDate = this.productItem.WorkOrderDate;
    //   }
    //   else WorkOrderDate = this.datePipe.transform(this.productItem.WorkOrderDate,'dd/MM/yyyy')
    // }
    // if(this.userType=='Surveyor'){
    //   this.GarageName='';
    //   this.GarageId='';
    // }
    let LossDate, IntimatedDate, LossTime;
    if (this.productItem.lossDate != undefined && this.productItem.lossDate != null && this.productItem.lossDate != '') {
      if (String(this.productItem.lossDate).includes('/')) {
        LossDate = this.productItem.lossDate;
        let formattedTime12
        const lossTime = this.productItem.lossTime? this.productItem.lossTime : this.LossTime
        if (lossTime) {
          // Convert 12-hour format (02:41 PM) to 24-hour format (14:41)
          const timeParts = lossTime.match(/(\d+):(\d+) (\w+)/);
          if (timeParts) {
            let hours = parseInt(timeParts[1], 10);
            const minutes = timeParts[2];
            const period = timeParts[3];

            if (period === "PM" && hours !== 12) {
              hours += 12; // Convert PM time to 24-hour format
            } else if (period === "AM" && hours === 12) {
              hours = 0; // Convert 12 AM to 00 hours
            }

            // Create a Date object with today's date and converted time
            const formattedDate = new Date();
            formattedDate.setHours(hours, parseInt(minutes, 10), 0);

            // Format the time in 24-hour format
            formattedTime12 = formattedDate.toLocaleTimeString("en-US", {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });
            LossTime = formattedTime12;

          }
        }
      }
      else {
        LossDate = this.datePipe.transform(this.productItem.lossDate, 'dd/MM/yyyy')
        LossTime = this.datePipe.transform(this.productItem.lossTime, 'hh:mm:ss')
      }
    }
    if (this.productItem.intimatedDate != undefined && this.productItem.intimatedDate != null && this.productItem.intimatedDate != '') {
      if (String(this.productItem.intimatedDate).includes('/')) {
        IntimatedDate = this.productItem.intimatedDate;
      }
      else IntimatedDate = this.datePipe.transform(this.productItem.intimatedDate, 'dd/MM/yyyy')
    }
    let ReqObj = {
      "RequestMetaData": {
        "RequestOrigin": "API",
        "CurrentBranch": "2222",
        "OriginBranch": "2222",
        "UserName": "BASE.U",
        "IpAddress": "",
        "RequestGeneratedDateTime": "21/10/2024",
        "ConsumerTrackingID": "101"
      },
      "LanguageCode": "0",
      "PolicyNo": this.productItem.policyNo,
      "InsuredId": this.productItem.insuredId,
      "UserName": this.productItem.insuredName,
      "LossDate": LossDate,
      "LossTime": LossTime,
      "IntimatedDate": IntimatedDate,
      "LossLocation": this.productItem.lossLocation,
      "NatureOfLoss": this.productItem.natureOfLoss,
      "PoliceStation": this.productItem.policeStation ? this.productItem.policeStation : this.PoliceStation,
      "PoliceReportNo": this.productItem.policeReportNo ? this.productItem.policeReportNo : this.PoliceReportNo,
      "LossDescription": this.productItem.lossDescription,
      "AtFault": this.productItem.atFault,
    }
    let urlLink = `${this.CommonApiUrl}fnol/createfnol`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.IsError == false) {
          // sessionStorage.setItem("QuotationNo",data.Response.QuotationNo)
          this.router.navigate(['/fnol']);
          sessionStorage.removeItem('FnolNo');
          sessionStorage.removeItem('PolicyNo');
          sessionStorage.removeItem('FnolDisable');
          sessionStorage.removeItem('PoliceReportNo');
        }
      },
      (err) => { },
    );
  }

  getfnolEditData() {
    let ReqObj = {
      "PolicyNo": this.PolicyNo,
      "PoliceReportNo": this.PoliceReportNo
    }
    let urlLink = `${this.CommonApiUrl}fnol/getClaimByPolicy`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Response) {
          this.fnolEditData = data.Response;
          this.setvalue(this.fnolEditData);
        }
      },
      (err) => { },
    );
  }

  getInsuredName(rowData) {
    let ReqObj = {
      "PolicyNo": rowData,
      //"PoliceReportNo":  this.PoliceReportNo,
      "CompanyId": this.CompanyId
    }
    let urlLink = `${this.CommonApiUrl}fnol/getPolicyDetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Response) {
          this.PolicySDate = data.Response.PolicyFromDate;
          this.PolicyEDate = data.Response.PolicyToDate;
          this.form.controls['insuredName'].setValue(data.Response.EngFullName);
          this.productItem.insuredId = data.Response.InsuredId;
        }
      },
      (err) => { },
    );
  }


  convertToISO(timeString: string, date): string {
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date(date).toISOString().split('T')[0]; // "2025-03-06"

    // Combine current date with the given time
    const dateTime = new Date(`${currentDate}T${timeString}`);

    // Convert to ISO String
    return dateTime.toISOString(); // Output in ISO format
  }
  setvalue(rowdata) {
    //  const isoFormat = ''//this.convertToISO(rowdata.LossTime,rowdata.LossDate);
    // let date =this.formatDateTime(rowdata.LossDate, rowdata.LossTime)
    this.productItem.policyNo = rowdata.PolicyNo;
    this.getInsuredName(this.productItem.policyNo)
    // this.form.controls['insuredId'].setValue(rowdata.InsuredId);
    this.form.controls['lossDate'].setValue(rowdata.LossDate);
    this.form.controls['lossTime'].setValue(rowdata.LossTime);
    this.form.controls['intimatedDate'].setValue(rowdata.IntimatedDate);
    this.form.controls['lossLocation'].setValue(rowdata.LossLocation);
    this.form.controls['natureOfLoss'].setValue(rowdata.NatureOfLoss);
    // this.form.controls['policeStation'].setValue(rowdata.PoliceStation);
    this.form.controls['lossDescription'].setValue(rowdata.LossDescription);
    this.form.controls['atFault'].setValue(rowdata.AtFault);
    let disable = sessionStorage.getItem('FnolDisable');
    this.productItem.policeReportNo = rowdata.PolicyNo;
    if (disable == 'Disable') {
      this.PolicyNoDisabled = true;
      let fieldList = this.Fields[0].fieldGroup;
      for (let field of fieldList) {
        if (field.key == 'policyNo' || field.key == 'insuredId' || field.key == 'lossDate'
          || field.key == 'intimatedDate' || field.key == 'policeReportNo' || field.key == 'lossLocation' || field.key == 'natureOfLoss'
          || field.key == 'policeStation' || field.key == 'policeReportNo' || field.key == 'lossDescription' || field.key == 'atFault'
        ) {
          field.props.disabled = true;
        }
        if (field.key == 'lossTime') {
          field.type = 'input';
          field.templateOptions.type = 'text';
          field.props.disabled = true;
        }
      }
    }
  }
  formatDateTime(date: string, time: string): string {
    const lossDateTime = new Date(`${date} ${time}`);
    let formateddatetime = this.customDateFormat(lossDateTime);
    return formateddatetime
  }
  customDateFormat(date: Date): string {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timeZoneOffset = date.getTimezoneOffset();
    const timeZone = `GMT${timeZoneOffset <= 0 ? '+' : '-'}${Math.abs(timeZoneOffset) / 60}`; // Assuming IST (Indian Standard Time)
    const timeZoneName = "India Standard Time"; // Static value for India, modify if needed

    // Format the full string
    return `${dayOfWeek} ${month} ${dayOfMonth} ${year} ${hours}:${minutes}:${seconds} ${timeZone} (${timeZoneName})`;
  }
  getBack() {
    sessionStorage.removeItem('FnolNo');
    sessionStorage.removeItem('PolicyNo');
    sessionStorage.removeItem('FnolDisable');
    this.router.navigate(['/fnol']);

  }



  getLocationName() {
    return 'name'; // Example: return the property to display
  }
  getSectionName() {
    return 'name'; // Example: return the property to display
  }
  getIdValue() {
    return 'value'; // Example: return the property to display
  }
  // getDisplayName(){
  //   if(this.lang=='en') return 'CodeDesc';
  //   else return 'CodeDescLocal'
  // }

  onChangeIdType(doc: any) {
    console.log('ID type changed:', doc);
    // Implement ID type change logic
  }

  onChangeDocType(doc: any) {
    console.log('Document type changed:', doc);
    // Implement document type change logic
  }


  onUploadListDocuments(target: any, fileType: any, type: any, uploadType: any) {

    console.log("Event ", target);
    let event: any = null;
    if (uploadType == 'drag') event = target
    else event = target.target.files;
    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader: any = new FileReader();
      reader.readAsDataURL(element);
      var filename = element.name;

      let imageUrl: any;
      reader.onload = (res: { target: { result: any; }; }) => {
        imageUrl = res.target.result;
        this.imageUrl = imageUrl;
        let entry = { 'url': element, 'DocTypeId': '', 'DocTypeDesc': '', 'Id': '', 'typeList': [], 'sectionList': [], 'sectionId': '', 'locationId': '', 'locationList': this.individualDocumentList, 'docTypeList': [], 'filename': element.name, 'JsonString': {} }
        console.log('KKKKKKKKKK', entry);
        console.log('OOOOOOOOOO', this.individualDocumentList.length);
        if (this.individualDocumentList.length == 1) {
          console.log('NNNNNNNNNNNNN', this.individualDocumentList);
          entry.locationId = this.individualDocumentList[0].LocationId;
          entry.sectionList = this.individualDocumentList[0].SectionList;
          this.uploadListDoc.push(entry)
          if (entry.sectionList.length == 1) { this.uploadListDoc[this.uploadListDoc.length - 1].sectionId = entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length - 1], this.uploadListDoc.length - 1) }
        }
        else {
          // entry.sectionList = this.individualDocumentList[0].SectionList;
          this.uploadListDoc.push(entry)
          this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length - 1], this.uploadListDoc.length - 1)
        }
        //this.vehicleList[i].docList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });
      }
    }

  }
  onDeleteSelectedDocument(index) {
    this.uploadListDoc.splice(index, 1);
  }
  onChangeLocation(entry) {
    if (entry.locationId != null) {
      entry.sectionList = this.individualDocumentList.find(ele => ele.LocationId == entry.locationId)?.SectionList;
      entry.sectionId = '';
    }
  }
  onChangeSectionType(rowData, index) {
    // let ReqObj = {
    //   "InsuranceId":this.insuranceId,
    //   "ProductId": this.productId,
    //   "SectionId": rowData.sectionId
    // }
    let urlLink = `${this.CommonApiUrl}dropdown/documentType/${this.CompanyId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.uploadListDoc[index].docTypeList = data.Result;
        }
      },
      (err) => { },
    );
  }

  onFileUploadVehicleList(index) {
    //let vehicleDetails = this.vehicleList[index];
    let docList = this.uploadListDoc;
    if (docList.length != 0) {
      let i = 0;
      let doc = docList[index]
      console.log("Document", doc)
      let IdType = null, locationName = null, RiskId = null, DocTypeDesc = null;
      DocTypeDesc = doc.docTypeList.find(ele => ele.Code == doc.DocTypeId).CodeDesc;
      // if(locations) locationName = locations.LocationName;
      let entry = doc.typeList.find(ele => ele.Id == doc.Id);
      if (entry) { IdType = entry.IdType; RiskId = entry.RiskId }
      let ReqObj = {
        "ClaimNo": this.CliamNo,
        "DocumentRef": "",
        "DocTypeId": doc.DocTypeId,
        "DocDesc": DocTypeDesc,
        "CompanyId": this.insuranceId,
        "FilePathName": "",
        "FileName": doc.filename,
        "UploadType": "manual",
        "CommonFilePath": "",
        "ErrorRes": "",
        "UploadedBy": this.loginId


      }
      //   "QuoteNo":this.quoteNo,
      //   "Id":doc.Id,
      //   "IdType":IdType,
      //   "SectionId":doc.sectionId,
      //   "InsuranceId":this.insuranceId,
      //   "DocumentId":doc.DocTypeId,
      //   "RiskId":RiskId,
      //   "LocationId": doc.locationId,
      //   "LocationName": locationName,
      //   "ProductId": this.productId,
      //   "FileName": doc.filename,
      //   "OriginalFileName":doc.filename,
      //   "UploadedBy": this.loginId

      // }
      //if(ReqObj.Id=='All') ReqObj.Id = '99999';
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
      // if(this.endorsementSection && this.enableDocumentDetails){
      //   ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
      //   ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
      //   ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
      //   ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
      //   ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
      //   ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
      //   ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
      // }
      let urlLink = `${this.CommonApiUrl}document/upload`;
      this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj, doc.url).subscribe(
        (data: any) => {
          this.getUploadedDocList(null, null, null);
          if (data.ErrorMessage) {
            for (let entry of data.ErrorMessage) {

            }
          }
          else if (data?.Result) {
            this.uploadListDoc.splice(index, 1);
            // if(this.productId=='4' && ReqObj?.DocTypeId=='17'){
            //   this.getUploadedDocList(null,null,ReqObj);
            // }
            // else
            this.getUploadedDocList(null, null, null);
          }
        },
        (err) => { },
      );
    }
  }
  getUploadedDocList(vehicleData: any, index: any, reqObj: any) {
    let ReqObj = {
      "ClaimNo": this.CliamNo,
    }
    let urlLink = `${this.CommonApiUrl}document/getByClaim`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          // this.uploadedDocList = data?.Result?.CommmonDocument;
          // this.uploadedDocList = this.uploadedDocList.filter(ele=>ele.DocumentId!='23');
          this.uploadedIndividualList = data?.Result;
          if (this.uploadedDocList.length != 0) {
            this.uploadedIndividualList = this.uploadedDocList.concat(this.uploadedIndividualList)
          }
          let entry = this.uploadedIndividualList.find(ele => ele.DocumentId == '17' && ele.VerifiedYn != 'Y');
          // if(entry){
          //   this.checkMandatoryDocument(entry);
          // }
        }
      },
      (err) => { },
    );
  }
  onDeleteListDocument(index, doc) {
    let ReqObj = {
      "ClaimNo": this.CliamNo,
      "DocumentRef": doc.DocumentRef
    }
    let urlLink = `${this.CommonApiUrl}document/delete`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.IsError == false) {
          this.getUploadedDocList(null, null, null);
        }
      },
      (err) => { },
    );
  }
  onListDocumentDownload(index, doc) {
    //let urlLink = `${this.CommonApiUrl}document/download/files/${doc.FileName}`;
    // this.sharedService.onGetMethodSync(urlLink).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     if(data.Result){

    //     }
    //   },
    //   (err) => { },
    // );
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', doc?.ImgUrl);
    link.setAttribute('download', doc?.FileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onViewListDocument(index, doc) {
    this.viewImageUrl = doc.ImgUrl;
    this.viewImageFileName = doc.FileName;
    this.viewImageSection = true;
  }
}
