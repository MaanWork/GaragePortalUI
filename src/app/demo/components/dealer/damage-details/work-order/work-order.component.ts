import { Component } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../app-config.json';
import { ProductData } from '../product';
import { WorkOrder } from '../../../quotation/quotation-plan/models/WorkOrder';
import { FormlyFieldConfig } from '@ngx-formly/core';

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
		this.insuranceId = this.userDetails.Response.InsuranceId;
		this.loginType = this.userDetails.Response.LoginType;
    this.GarageName = this.userDetails.Response.UserName;
    this.GarageId = this.userDetails.Response.UserName;
		this.userType = this.userDetails.Response.UserType;
		this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue');
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.QuotationNo = sessionStorage.getItem('QuotationNo');
    this.Completed = sessionStorage.getItem('Completed');
    this.productItem= new ProductData();
    let fireData = new WorkOrder();
    this.Fields[0] = fireData?.fields?.fieldGroup[0];
    this.getWorkOrderType();
    this.getSettlementType();
    this.getSettlement();
    this.getTotalLossType();
    this.getQuoteStatus()
    this.productItem.Subrogation='N';
    this.productItem.JoinOrder='N';
    // this.Fields.forEach(field => {
    //   this.form.addControl(field.key, new FormGroup({})); // Ensure control is added
    // });
    let alphabetHooks4 = { onInit: (field: FormlyFieldConfig) => {
      field.form.controls['SettlementType'].valueChanges.subscribe(() => {
        //this.taxExcepted();
        this.onCheckAlphabetsSettlement(event)
        });
      field.props.onKeydown = (event: KeyboardEvent) => {
        this.onCheckAlphabetsSettlement(event) // Call your method on key press
        };
      }
    }
    let alphabetHooks2 = { onInit: (field: FormlyFieldConfig) => {
      field.form.controls['WorkOrderNumber'].valueChanges.subscribe(() => {
        //this.taxExcepted();
        this.onCheckAlphabetsWorkOrder(event)
        });
      field.props.onKeydown = (event: KeyboardEvent) => {
        this.onCheckAlphabetsWorkOrder(event) // Call your method on key press
        };
      }
    }
    let alphabetHooks1 = { onInit: (field: FormlyFieldConfig) => {
      field.form.controls['PrimaryLocation'].valueChanges.subscribe(() => {
        //this.taxExcepted();
        this.onCheckAlphabetsWorkPrimary(event)
        });
      field.props.onKeydown = (event: KeyboardEvent) => {
        this.onCheckAlphabetsWorkPrimary(event) // Call your method on key press
        };
      }
    }
    if(this.Completed=='Completed' || this.Completed=='SurveyorPending'){
      let fieldList=this.Fields[0].fieldGroup;
      for(let field of fieldList){
          if(field.key=='SettlementType') field.hooks = alphabetHooks4;
          if(field.key=='WorkOrderNumber') field.hooks = alphabetHooks2;
          if(field.key=='PrimaryLocation') field.hooks = alphabetHooks1;
          
          field.props.disabled = true;
      }
    }
    }
    ngOnInit(){
      this.getGarageClaim();
      if(this.userType=='Surveyor'){
        this.DealerList();
     }
    }

    onCheckAlphabetsSettlement(event: Event): void {
			const input = event.target as HTMLInputElement;
			if(input.value){
				input.value = input.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 50);
				let fieldList=this.Fields[0].fieldGroup;
				for(let field of fieldList){
          if(field.key=='SettlementType'){field.value = input.value;}
        }
			}
		}
    onCheckAlphabetsWorkOrder(event: Event): void {
			const input = event.target as HTMLInputElement;
			if(input.value){
				input.value = input.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
				let fieldList=this.Fields[0].fieldGroup;
				for(let field of fieldList){
          if(field.key=='WorkOrderNumber'){field.value = input.value;}
        }
			}
		}
    onCheckAlphabetsWorkPrimary(event: Event): void {
			const input = event.target as HTMLInputElement;
			if(input.value){
				input.value = input.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
				let fieldList=this.Fields[0].fieldGroup;
				for(let field of fieldList){
          if(field.key=='PrimaryLocation'){field.value = input.value;}
        }
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
    let urlLink = `${this.CommonApiUrl}dropdown/getworkordertype/${this.insuranceId}`;
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
  getSettlementType(){
    let urlLink = `${this.CommonApiUrl}dropdown/getsettlementtype/${this.insuranceId}`;
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
    let urlLink = `${this.CommonApiUrl}dropdown/accountforsettlement/${this.insuranceId}`;
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
    let urlLink = `${this.CommonApiUrl}dropdown/dealerLoginId/${this.insuranceId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.DealerDropList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getTotalLossType(){
    let urlLink = `${this.CommonApiUrl}dropdown/claimlosstype/${this.insuranceId}`;
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
    let urlLink = `${this.CommonApiUrl}dropdown/status/${this.insuranceId}`;
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
  onSubmit(){
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
    // }
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
        "SettlementToDesc":this.SettlementList.find(ele => ele.Code == this.productItem.Settlement).CodeDesc,
        "WorkOrderTypeDesc":this.WorkOrderTypeList.find(ele => ele.Code == this.productItem.WorkOrderType).CodeDesc
    }
    
    let urlLink = `${this.CommonApiUrl}garage/save`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
          if(data.Message=='Success'){
            sessionStorage.setItem("QuotationNo",data.Response.QuotationNo)
            this.router.navigate(['/dealer/damagedetail'])
          }
        }
      },
      (err) => { },
    );
  }
  getGarageClaim(){
    let ReqObj = {
       "ClaimNo": this.CliamNo,
       "CreatedBy": this.loginId
    }
    let urlLink = `${this.CommonApiUrl}garage/getbyclaimno`;
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
    this.form.controls['TotalLoss'].setValue(rowdata.TotalLoss)
    this.form.controls['TotalLossType'].setValue(rowdata.LossType)
    this.form.controls['QuoteStatus'].setValue(rowdata.QuoteStatus)
    this.form.controls['Remarks'].setValue(rowdata.Remarks)
    if(this.userType=='Surveyor'){
      //this.DealerDrop();
      this.DealerDrop= rowdata.SparepartsDealerId;
      this.GarageId=rowdata.GarageId;
      this.GarageName=rowdata.GarageName;
    }
    this.QuotationNo=rowdata.QuotationNo;
  }
  getBack(){
    if(this.userType=='Dealer'){
      sessionStorage.removeItem('Completed')
      this.router.navigate(['/dealer'])
    }else{
      sessionStorage.removeItem('Completed')
      this.router.navigate(['/garage'])
    }
  }
}
