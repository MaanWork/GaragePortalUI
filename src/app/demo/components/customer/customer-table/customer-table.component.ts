import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styles: [] 
})

export class CustomerTableComponent implements OnInit{
  items: MenuItem[] | undefined;
  tableActions:MenuItem[] | undefined;
  columns:string[] = []; 
  customers:any[] = []; 
  tableView = 'table';
  userDetails:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  userType:any=null;brokerbranchCode:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  searchValue: any=null;deActiveCustomers:any[]=[];
  clearSearchSection: boolean=false;pendingCustomers:any[]=[];
  activeCustomers: any[]=[];lang:any=null;
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.userType = this.userDetails.Result.UserType;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
        this.setHeaders()
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
      this.setHeaders();
    }
    this.getCustomersList();
  }
  ngOnInit() {
   
    this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}, {label: 'Delete',icon: PrimeIcons.TRASH}];
    
    
    this.customers = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];

  }
  setHeaders(){
    if(this.lang=='en'){ 
      this.columns = [ 'Reference No','Customer Name',  'Customer Type','ID Number', 'Mobile No', 'TaxExempted', 'Created By', 'Status', 'Action'];
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Customer'}];
    }
    else if(this.lang=='po'){ 
      this.columns = [ 'Número de referência','Nome do cliente',  'Tipo de Cliente','Número de identidade', 'Número de telemóvel', 'Isento de Imposto', 'Criado por', 'Status', 'Ação'];
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Cliente'}];
    }
    else if(this.lang=='fr'){ 
      this.columns = [ 'Numéro de référence','Nom du client',  'Type de client',"Numéro d'identification", 'Numéro de portable', "Exonéré d'impôt", 'Créé par', 'Statut', 'Action'];
      this.items = [{ label: 'Accueil', routerLink:'/' }, {label:'Client'}];
    }
  }
  onAddCustomer(rowData){
    if(rowData){
      sessionStorage.setItem('customerReferenceNo',rowData?.CustomerReferenceNo)
    }
    else{sessionStorage.removeItem('customerReferenceNo')}
    this.router.navigate(['customer/create']);
  }
  getCustomersList(){
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
    "Offset":"100"
    }
    let urlLink = `${this.CommonApiUrl}api/getallcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customers = data?.Result;
            this.activeCustomers = data?.Result.filter(ele=>ele.Clientstatus=='Y');
            this.deActiveCustomers = data?.Result.filter(ele=>ele.Clientstatus=='N');
            this.pendingCustomers = data?.Result.filter(ele=>ele.Clientstatus=='P');
            this.searchValue = "";
            if(this.clearSearchSection){
              this.clearSearchSection = false;
            }
        }

      },
      (err) => { },
    );
  }
}
