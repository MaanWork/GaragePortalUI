import { Component } from '@angular/core';
import { ProductData } from '../../../components/garage/product';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { WorkOrder } from '../../quotation/quotation-plan/models/WorkOrder';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../app-config.json';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent {
  Fields:any[]=[];
  userDetails: any;
  shortQuoteYN: boolean;
  lang: any;
  items: ({ label: string; routerLink: string; } | { label: string; routerLink?: undefined; })[];
  maxDobDate: Date;
  loginId: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  agencyCode: any;
  branchCode: any;
  productId: any;
  insuranceId: any;
  loginType: any;
  userType: any;
  brokerbranchCode: any;
  typeValue: string;
  productItem: any;
  public form = new FormGroup({}); 
  WorkOrderTypeList: any[]=[];
  SettlementTypeList:any[]=[];
  TotalLossTypeList: any[]=[];
  SettlementList: any[]=[];
  CliamNo: string;
  GarageClaim: any;
  QuoteStatusList: any[]=[];
  DealerDropList: any[]=[];
  GarageName: any;
  GarageId: any;
  QuotationNo: string;
  Completed: string;
  DealerDrop:any='';
  currentStatus: any;
  uploadListDoc: any[] = []; // List of documents uploaded
  individualDocumentList: any[] = []; // Dropdown options for location
  uploadedIndividualList: any[] = [];
  uploadedDocList: any[] = [];
  imageUrl: any;
  viewImageUrl: any;
  viewImageFileName: any;
  viewImageSection: boolean=false;
  GarageLoginId: any;
  DealerCondition: any;
  errorMsg: string;
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
		this.setHeaders();

		this.checkFieldNames()}
     	this.maxDobDate = new Date(year - 18,month, day );
		// if(this.productItem.IdType=='1' || this.productItem.IdType==1){
		// 	this.productItem.dobOrRegDate=this.maxDobDate;
		// }
		this.loginId = this.userDetails.Response.LoginId;
		this.agencyCode = this.userDetails.Response.OaCode;
		this.branchCode = this.userDetails.Response.BranchCode;
		this.productId = this.userDetails.Response.ProductId;
		this.insuranceId = this.userDetails.Response.CompanyId;
		this.loginType = this.userDetails.Response.LoginType;
    this.GarageName = this.userDetails.Response.UserName;
    this.GarageId = this.userDetails.Response.UserName;
		this.userType = this.userDetails.Response.UserType;
		this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue');
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.currentStatus = sessionStorage.getItem('QuoteStatus');
    this.QuotationNo = sessionStorage.getItem('QuotationNo');
    this.Completed = sessionStorage.getItem('Completed');
    this.GarageLoginId=sessionStorage.getItem('GarageLoginId');
    this.productItem= new ProductData();
    let fireData = new WorkOrder();
    this.Fields[0] = fireData?.fields?.fieldGroup[0];
    this.getWorkOrderType();
    this.getSettlementType();
    this.getSettlement();
    this.getTotalLossType();
    this.getQuoteStatus();
    this.getRepairTypeType();
    this.productItem.Subrogation='N';
    this.productItem.JoinOrder='N';
    // this.Fields.forEach(field => {
    //   this.form.addControl(field.key, new FormGroup({})); // Ensure control is added
    // });
    if(this.Completed=='Completed' || this.Completed=='SurveyorPending'){
      let fieldList=this.Fields[0].fieldGroup;
      for(let field of fieldList){
      //  alert(field.key)
      //  if(field.key== 'WorkOrderType' || field.key== 'WorkOrderNumber' || field.key== 'WorkOrderDate' || field.key== 'SettlementType'
      //   || field.key== 'Settlement'|| field.key== 'PrimaryLocation'|| field.key== 'RepairType'|| field.key== 'DeliveryDate'
      //   || field.key== 'Subrogation'|| field.key== 'JoinOrder'|| field.key== 'QuoteStatus'|| field.key== 'TotalLoss' || field.key== 'TotalLossType'
      //   || field.key== 'Remarks'
      //  ){
      //    field.props.disabled = true;
      // }

      }
    }
    }
    ngOnInit(){
      this.getGarageClaim();
      this.getUploadedDocList(null,-1,null);
      if(this.userType=='Surveyor'){
        this.DealerList();
     }
    }

    
    checkFieldNames(){
      if(this.Fields.length!=0){
        let fieldList = this.Fields[0].fieldGroup;
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
      }
      
  getHeaders(codeDesc){
    return 'HOME.'+codeDesc
  }
  setHeaders(){
    if(this.lang=='en'){this.items = [{ label: 'Home', routerLink:'/' }, {label:'Customer', routerLink: '/customer'}, { label: 'Create Customer' }];}
    else if(this.lang=='po'){this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Cliente', routerLink: '/customer'}, { label: 'Criar cliente' }];}
    else if(this.lang=='fr'){this.items = [{ label: 'Accueil', routerLink:'/' }, {label:'Client', routerLink: '/customer'}, { label: 'Créer un client' }];}
  }
  onLanguageChange(item: any) {
    this.translate.use(item.value);
  }

  getWorkOrderType(){
    let urlLink = `${this.CommonApiUrl}dropdown/getworkordertype`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.WorkOrderTypeList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
							for (let i = 0; i < this.WorkOrderTypeList.length; i++) {
								this.WorkOrderTypeList[i].label = this.WorkOrderTypeList[i]['CodeDesc'];
								this.WorkOrderTypeList[i].value = this.WorkOrderTypeList[i]['Code'];
								if (i == this.WorkOrderTypeList.length - 1) {
									let fieldList=this.Fields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='WorkOrderType'){
											field.props.options = defaultRow.concat(this.WorkOrderTypeList);
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
  getRepairTypeType(){
    let urlLink = `${this.CommonApiUrl}dropdown/repairtype`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.WorkOrderTypeList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
							for (let i = 0; i < this.WorkOrderTypeList.length; i++) {
								this.WorkOrderTypeList[i].label = this.WorkOrderTypeList[i]['CodeDesc'];
								this.WorkOrderTypeList[i].value = this.WorkOrderTypeList[i]['Code'];
								if (i == this.WorkOrderTypeList.length - 1) {
									let fieldList=this.Fields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='RepairType'){
											field.props.options = defaultRow.concat(this.WorkOrderTypeList);
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
  
  getSettlementType(){
    let urlLink = `${this.CommonApiUrl}dropdown/getsettlementtype`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.SettlementTypeList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
							for (let i = 0; i < this.SettlementTypeList.length; i++) {
								this.SettlementTypeList[i].label = this.SettlementTypeList[i]['CodeDesc'];
								this.SettlementTypeList[i].value = this.SettlementTypeList[i]['Code'];
								if (i == this.SettlementTypeList.length - 1) {
									let fieldList=this.Fields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='SettlementType'){
											field.props.options = defaultRow.concat(this.SettlementTypeList);
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
  getSettlement(){
    let urlLink = `${this.CommonApiUrl}dropdown/accountforsettlement`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.SettlementList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
							for (let i = 0; i < this.SettlementList.length; i++) {
								this.SettlementList[i].label = this.SettlementList[i]['CodeDesc'];
								this.SettlementList[i].value = this.SettlementList[i]['Code'];
								if (i == this.SettlementList.length - 1) {
									let fieldList=this.Fields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='Settlement'){
											field.props.options = defaultRow.concat(this.SettlementList);
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
  DealerList(){
    let urlLink = `${this.CommonApiUrl}dropdown/dealerLoginId`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj =[{"Code":"","CodeDesc":"--Select--"}]
            this.DealerDropList = obj.concat(data.Result);
        }
      },
      (err) => { },
    );
  }
  getTotalLossType(){
    let urlLink = `${this.CommonApiUrl}dropdown/claimlosstype`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.TotalLossTypeList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
							for (let i = 0; i < this.TotalLossTypeList.length; i++) {
								this.TotalLossTypeList[i].label = this.TotalLossTypeList[i]['CodeDesc'];
								this.TotalLossTypeList[i].value = this.TotalLossTypeList[i]['Code'];
								if (i == this.TotalLossTypeList.length - 1) {
									let fieldList=this.Fields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='TotalLossType'){
											field.props.options = defaultRow.concat(this.TotalLossTypeList);
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

  getQuoteStatus(){
    let urlLink = `${this.CommonApiUrl}claim/surveyor/status/${this.currentStatus}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.QuoteStatusList = data.Result;
            let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
							for (let i = 0; i < this.QuoteStatusList.length; i++) {
								this.QuoteStatusList[i].label = this.QuoteStatusList[i]['CodeDesc'];
								this.QuoteStatusList[i].value = this.QuoteStatusList[i]['Code'];
								if (i == this.QuoteStatusList.length - 1) {
									let fieldList=this.Fields[0].fieldGroup;
									for(let field of fieldList){
										if(field.key=='QuoteStatus'){
											field.props.options = defaultRow.concat(this.QuoteStatusList);
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
  validation(){
    Swal.fire({
      title: `<strong>
        <ng-container>Errors!</ng-container>
        </strong>`,
      icon: 'info',
      html:
        `<ul class="list-group errorlist">
         ${this.errorMsg}
      </ul>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        `<i class="fa fa-thumbs-down"></i> <ng-container >Errors!</ng-container> `,
      confirmButtonAriaLabel: 'Thumbs down, Errors!',
    })
  }
  onSubmit(){
    if(this.productItem.WorkOrderType=='' || this.productItem.WorkOrderType==undefined || this.productItem.WorkOrderType==null){
     this.errorMsg='Please Select Quotation Type '
     this.validation() 
   }
   else if(this.productItem.WorkOrderNumber=='' || this.productItem.WorkOrderNumber==undefined || this.productItem.WorkOrderNumber==null){
     this.errorMsg='Please Enter Quotation Number'
     this.validation() 
   }
    else if(this.productItem.SettlementType=='' || this.productItem.SettlementType==undefined || this.productItem.SettlementType==null){
      this.errorMsg='Please Select Settlement Type '
      this.validation() 
    }
    else{
      let DeliveryDate,WorkOrderDate
      if (this.productItem.DeliveryDate != undefined && this.productItem.DeliveryDate != null && this.productItem.DeliveryDate != '') {
        if(String(this.productItem.DeliveryDate).includes('/')){
          DeliveryDate = this.productItem.DeliveryDate;
        }
        else DeliveryDate = this.datePipe.transform(this.productItem.DeliveryDate,'dd/MM/yyyy')
      }
      if (this.productItem.WorkOrderDate != undefined && this.productItem.WorkOrderDate != null && this.productItem.WorkOrderDate != '') {
        if(String(this.productItem.WorkOrderDate).includes('/')){
          WorkOrderDate = this.productItem.WorkOrderDate;
        }
        else WorkOrderDate = this.datePipe.transform(this.productItem.WorkOrderDate,'dd/MM/yyyy')
      }
      // if(this.userType=='Surveyor'){
      //   this.GarageName='';
      //   this.GarageId='';
      let ReqObj = {
          "ClaimNo": this.CliamNo,
          "WorkOrderNo": this.productItem.WorkOrderNumber,
          "WorkOrderType": this.productItem.WorkOrderType,
          "WorkOrderDate": WorkOrderDate,
          "SettlementType": this.productItem.SettlementType,
          "SettlementTo": this.productItem.Settlement,
          "GarageName": this.GarageName,
          "GarageId": this.GarageId,
          "Location": this.productItem.PrimaryLocation,
          "RepairType": this.productItem.RepairType,
          "QuotationNo": this.QuotationNo,
          "DeliveryDate": DeliveryDate,
          "JointOrderYn": this.productItem.JoinOrder,
          "SubrogationYn": this.productItem.Subrogation,
          "TotalLoss": this.productItem.TotalLoss,
          "LossType": this.productItem.TotalLossType,
          "Remarks": this.productItem.Remarks,
          "CreatedBy": this.loginId,
          "UpdatedBy": this.loginId,
          "QuoteStatus": this.productItem.QuoteStatus,
          "UserType": this.userType,
          "SparepartsDealerId": this.DealerDrop,
          "SettlementTypeDesc":this.SettlementTypeList.find(ele => ele.Code == this.productItem.SettlementType).CodeDesc,
          "SettlementToDesc":this.productItem.Settlement,
          "WorkOrderTypeDesc":this.productItem.WorkOrderType
      }
      
      let urlLink = `${this.CommonApiUrl}workOrder/surveyor/assign`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Response){
            if(data.Message=='Success'){
              sessionStorage.setItem("QuotationNo",data.Response.QuotationNo)
              this.router.navigate(['/surveyor/damagedetail'])
            }
          }
        },
        (err) => { },
      );
    }
    
  }
  getGarageClaim(){
    let ReqObj = {
       "ClaimNo": this.CliamNo,
       "CreatedBy": this.loginId,
       "GarageLoginId": this.GarageLoginId
    }
    let urlLink = `${this.CommonApiUrl}workOrder/surveyor/view`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
            this.GarageClaim = data.Response;
           this.setvalue(this.GarageClaim);
        }
      },
      (err) => { },
    );
  }
  setvalue(rowdata){
    this.form.controls['WorkOrderType'].setValue(rowdata.WorkOrderType)
    this.form.controls['WorkOrderNumber'].setValue(rowdata.WorkOrderNo)
    this.form.controls['WorkOrderDate'].setValue(rowdata.WorkOrderDate)
    this.form.controls['SettlementType'].setValue(rowdata.SettlementType)
    this.form.controls['Settlement'].setValue(rowdata.SettlementTo)
    // this.form.controls['DefaultGarageName'].setValue(rowdata.GarageName)
    // this.form.controls['DefaultGarageCode'].setValue(rowdata.GarageId)
    this.form.controls['PrimaryLocation'].setValue(rowdata.Location)
    this.form.controls['RepairType'].setValue(rowdata.RepairType)
    // this.form.controls['GarageName'].setValue(rowdata.GarageName)
    //this.form.controls['QuoteStatus'].setValue(rowdata.QuoteStatus)
    this.form.controls['DeliveryDate'].setValue(rowdata.DeliveryDate)
    this.form.controls['Subrogation'].setValue(rowdata.SubrogationYn)
    this.form.controls['JoinOrder'].setValue(rowdata.JointOrderYn)
    // this.form.controls['TotalLoss'].setValue(rowdata.TotalLoss)
    // this.form.controls['TotalLossType'].setValue(rowdata.LossType)
    this.form.controls['QuoteStatus'].setValue(rowdata.QuoteStatus)
    this.form.controls['Remarks'].setValue(rowdata.Remarks)
    if(this.userType=='Surveyor'){
      //this.DealerDrop();
      this.DealerDrop= rowdata.SparepartsDealerId;
      this.GarageId=rowdata.GarageId;
      this.GarageName=rowdata.GarageName;
    }
    this.DealerCondition=rowdata.DealerYN;
    this.QuotationNo=rowdata.QuotationNo;
    
  }
  getBack(){
    sessionStorage.removeItem('QuoteStatus')
    if(this.userType=='Surveyor'){
      sessionStorage.removeItem('Completed')

      this.router.navigate(['/surveyor'])
    }else{
      sessionStorage.removeItem('Completed')
      this.router.navigate(['/garage'])
    }
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
          let entry = { 'url': element,'DocTypeId':'','DocTypeDesc':'','Id':'','typeList':[],'sectionList':[],'sectionId':'','locationId':'','locationList':this.individualDocumentList,'docTypeList':[],'filename':element.name, 'JsonString': {} }
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
            this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)
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
      // let ReqObj = {
      //   "InsuranceId":this.insuranceId,
      //   "ProductId": this.productId,
      //   "SectionId": rowData.sectionId
      // }
      let urlLink = `${this.CommonApiUrl}dropdown/documentType`;
      this.sharedService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.uploadListDoc[index].docTypeList = data.Result;
          }
        },
        (err) => { },
      );
    }
 
  onFileUploadVehicleList(index){
    //let vehicleDetails = this.vehicleList[index];
    let docList = this.uploadListDoc;
    if(docList.length!=0){
      let i=0;
      let doc = docList[index]
        console.log("Document",doc)
        let IdType=null,locationName=null,RiskId=null,DocTypeDesc=null;
         DocTypeDesc = doc.docTypeList.find(ele=>ele.Code==doc.DocTypeId).CodeDesc;
        // if(locations) locationName = locations.LocationName;
         let entry = doc.typeList.find(ele=>ele.Id==doc.Id);
         if(entry){IdType = entry.IdType;RiskId=entry.RiskId}
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
            "UploadedBy" : this.loginId,
            "UserType": this.userType

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
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
             this.getUploadedDocList(null,null,null);
            if(data.ErrorMessage){
              for(let entry of data.ErrorMessage){
               
              }
            }
            else if(data?.Result){
                  this.uploadListDoc.splice(index,1);
                  // if(this.productId=='4' && ReqObj?.DocTypeId=='17'){
                  //   this.getUploadedDocList(null,null,ReqObj);
                  // }
                  // else
                   this.getUploadedDocList(null,null,null);
                }
            },
            (err) => { },
          );
    }
  }
  getUploadedDocList(vehicleData:any,index:any,reqObj:any){
    let ReqObj = {
      "ClaimNo": this.CliamNo,
      "UserType": this.userType,
      "LoginId": this.loginId,
      "GarageLoginId": this.GarageLoginId
    }
    let urlLink = `${this.CommonApiUrl}document/getByClaim`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
           // this.uploadedDocList = data?.Result?.CommmonDocument;
            // this.uploadedDocList = this.uploadedDocList.filter(ele=>ele.DocumentId!='23');
            this.uploadedIndividualList = data?.Result;
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
  onDeleteListDocument(index,doc){
    let ReqObj = {
      "ClaimNo": this.CliamNo,
      "DocumentRef": doc.DocumentRef,
      "LoginId":this.loginId
    }
    let urlLink = `${this.CommonApiUrl}document/delete`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.IsError==false){
          this.getUploadedDocList(null,null,null);
        }
      },
      (err) => { },
    );
  }
  onListDocumentDownload(index,doc){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', doc?.ImgUrl);
    link.setAttribute('download', doc?.FileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onViewListDocument(index,doc){
    this.viewImageUrl = doc.ImgUrl;
    this.viewImageFileName =  doc.FileName;
    this.viewImageSection = true;
  }
}
