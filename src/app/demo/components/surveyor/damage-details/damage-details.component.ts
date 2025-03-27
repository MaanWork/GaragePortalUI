import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';
import { Product, ProductData } from '../product';
import { DamageDetails } from '../../quotation/quotation-plan/models/DamageDetails';
import { FormGroup } from '@angular/forms';
import { TotalAmount } from '../../quotation/quotation-plan/models/TotalAmount';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.component.html',
  styleUrls: ['./damage-details.component.scss']
})
export class DamageDetailsComponent {
  items: MenuItem[] | undefined;
  tableActions:MenuItem[] | undefined;
  columns:string[] = []; 
  tableView = 'table';
  userDetails:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  userType:any=null;brokerbranchCode:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  searchValue: any=null;clearSearchSection: boolean=false;lang:any=null;
  vehicleList: any[]=[];
  CompanyId: any;
  culumnHeader: any[]=[];
  products: any[]=[];
  DamageDeatilsList: any[]=[];
  CliamNo: string;
  DamageDirectionList: any[]=[];
  QuotationNo: string;
  RepairReplaceTypeList: any[]=[];
  clonedProducts: any;
  productItem: any;
  DamageVisible:boolean=false;
  Fields: any[]=[];
  DamageIndex:any=0;
  public form = new FormGroup({}); 
  //grandTotal: any;
  grandTotal1: number;
  Type: string;
  FieldsSpare: any[]=[];
  FieldsRepair: any[]=[];
  FieldsReplaceD: any[]=[];
  FieldsRepairD: any[]=[];
  FieldsTotalAfterD: any[]=[];
  FieldsAccident: any[]=[];
  FieldsVAT: any[]=[];
  FieldsNetAmount: any[]=[];
  FieldsRecivedAmount: any[]=[];
  addUnit:any=0;
  totalAmountView:boolean=false;
  totalAmountReplacement: any;
  labourTotal: number;
  FieldsSalvage: any[]=[];
  spareFordeduct: any=0;
  LabourFordeduct: any=0;
  PartTypeList: any[]=[];
  FieldsVatRate: any[]=[];
  totalAmountPop: boolean=false;
  SpareList:any[]=[];
  DamageList:any[]=[];
  DamageType:any;
  sparePartType:any;
  DepreciationList:any[]=[];
  DepreciationType:any;
  SpareDiscount:any='0';
  SpareDiscountAmount:any='0';
  cuurentTotal: number;
  replacedisable: boolean=false;
  repairdisable: boolean=false;
  ReplacementCostDeductible: any='0';
  DepreciationReplace: any='0';
  RepairLabourCost:  any='0';
  RepairLabourDiscountPer:  any='0';
  RepairLabourDiscountAmount:  any='0';
  RepairLabourDeductible: any='0';
  RepairLabourTotalAmount:  any='0';
  RepairLabourRemarks:  any;
  tolalSpare: any='0';
  DepreciationReplacechanged: any='0';
  DepreciationReplaceper:any='0';
  GrandTotal:any='0'
  SparePartDepreciation: any;
  viewType: boolean = false;
  GarageLoginId:any
  WorkAssignedViewtype: any;
  constructor(private cdr: ChangeDetectorRef,private messageService: MessageService, private route: ActivatedRoute,private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Response.LoginId;
    this.agencyCode = this.userDetails.Response.OaCode;
    this.branchCode = this.userDetails.Response.BranchCode;
    this.productId = this.userDetails.Response.ProductId;
    this.CompanyId = this.userDetails.Response.CompanyId;
    this.userType = this.userDetails.Response.UserType;
    this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
    this.CliamNo = sessionStorage.getItem('CliamNo');
    this.QuotationNo=sessionStorage.getItem('QuotationNo');
    this.Type=sessionStorage.getItem('Type');
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
    // this.getCustomersList();
   
  }
  setHeaders(){
    if(this.lang=='en'){ 
      this.columns = [ 'S.#','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
    else if(this.lang=='po'){ 
      this.columns = [ 'S.#','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
    else if(this.lang=='fr'){ 
      this.columns = [ 'S.#','Vehicle Make and Model',  'Make Year','Chassis No.', 'Insured / Customer Name', 'Type', 'Vehicle Reg #','Action'];
      this.items = [{ label: 'Accueil', routerLink:'/' }, {label:'Vehicle Details'}];
      this.culumnHeader =[ 'S.#','Work Order Type',  'Work Order Number','Work Order Date', 'Settlement Type', 'Settlement To', 'Action'];
    }
  }
 
 ngOnInit(){
  // this.productItem= new ProductData();
  // let fireData = new DamageDetails();
  // this.Fields[0] = fireData?.fields?.fieldGroup[0];
  this.productItem= new ProductData();
  let fireData = new TotalAmount();
  this.FieldsSpare[0] = fireData?.fields?.fieldGroup[0];
  this.FieldsRepair[0] = fireData?.fields?.fieldGroup[1];
  this.FieldsReplaceD[0] = fireData?.fields?.fieldGroup[2];
  this.FieldsRepairD[0] = fireData?.fields?.fieldGroup[3];
  this.FieldsAccident[0] = fireData?.fields?.fieldGroup[4];
  this.FieldsSalvage[0] = fireData?.fields?.fieldGroup[5];
  this.FieldsTotalAfterD[0] = fireData?.fields?.fieldGroup[6];
  this.FieldsVAT[0] = fireData?.fields?.fieldGroup[7];
  this.FieldsNetAmount [0] = fireData?.fields?.fieldGroup[8];
  this.FieldsRecivedAmount[0] = fireData?.fields?.fieldGroup[9];
  this.FieldsVatRate[0] = fireData?.fields?.fieldGroup[10];
  
  // this.getDamageDeatilsListByclaimid();
  // this.getDamageDirection();
  // this.getRepairReplaceType();
  // this.getPartType();
  if(this.DamageDeatilsList.length==0){
    this.DamageDeatilsList=[{
      "DamageSno":this.DamageDeatilsList.length+1,
    "DamageDirection":null,
    "DamagePart":null,
    "RepairReplace":null,
    "NoOfUnits":null,
    "UnitPrice":null,
    "ReplacementCharge":null,
    "Status":null,
    "QuotationNo":this.QuotationNo
  }]
  }
  setInterval(() => {
    this.GrandTotal = Number(this.RepairLabourTotalAmount)+Number(this.tolalSpare)
  }, 200);

  this.route.queryParams.subscribe(params => {
this.WorkAssignedViewtype = params['type'];
  if(this.WorkAssignedViewtype =='1'){
    this.viewType = true;
    this.FieldsAccident[0].fieldGroup[0].props.disabled = true;
    this.FieldsRecivedAmount[0].fieldGroup[0].props.disabled = true;
    this.FieldsVatRate[0].fieldGroup[0].props.disabled = true;
     this.CliamNo= params['ClaimNo'];
     this.QuotationNo =params['QuotationNo'];
     this.GarageLoginId =params['GarageLoginId'];
   
  }
  if(this.WorkAssignedViewtype =='2'){
    this.CliamNo= params['ClaimNo'];
     this.QuotationNo =params['QuotationNo'];
     this.GarageLoginId =params['GarageLoginId'];
  }
  });
  this.getDamageDeatilsListByclaimid();
  this.getDamageDirection();
  this.getRepairReplaceType();
  this.getPartType();
 }
 getDamageDeatilsListByclaimid(){

  let ReqObj,urlLink;
  if(this.userType=='Dealer'){
    ReqObj = {
      "ClaimNo": this.CliamNo,
      "QuotationNo": this.QuotationNo
    }
    urlLink = `${this.CommonApiUrl}api/damagedetails/dealerview`;
  }else{

    ReqObj = {
     "ClaimNo": this.CliamNo,
     "QuotationNo": this.QuotationNo,
     "GarageId":this.loginId
   }
   urlLink = `${this.CommonApiUrl}damage/surveyor/view`;
  }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
            this.DamageDeatilsList = data.Response;
            this.DamageIndex=null;
        }
      },
      (err) => { },
    );
}
saveDamageDeatils(rowData,index){
  let ReqObj,urlLink
  //for(let entry of this.DamageDeatilsList){
    if(this.userType=='Dealer'){
      ReqObj= [
        {
          "ClaimNo": this.CliamNo,
          "QuotationNo": this.QuotationNo,
          "DamageSno": index+1,
          "UnitPrice": rowData.UnitPrice,
          "DealerLoginId": this.loginId,
        }
      ]
      urlLink = `${this.CommonApiUrl}api/damagedetails/dealersave`;
    }
    else{
      ReqObj = 
        [{
          "ClaimNo": this.CliamNo,
          "QuotationNo": this.QuotationNo,
          "DamageSno": index+1,
          "DamageDirection": rowData.DamageDirection,
          "DamagePart": rowData.DamagePart,
          "RepairReplace": rowData.RepairReplace,
          "NoOfUnits": rowData.NoOfUnits,
          "UnitPrice": rowData.UnitPrice,
          "ReplacementCharge": rowData.ReplacementCharge,
          "GarageLoginId": this.loginId,
          "TotalPrice": rowData.TotalPrice,
        }]
  //       reqList.push(ReqObj)
  //       i+=1;
  // }
       urlLink = `${this.CommonApiUrl}api/damagedetails/garagesave`;
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Errors.length!=0){
           // this.DamageDeatilsList = data;
        }
        else{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Damage Details Added Successfully' });
          this.DamageIndex =null
        }
      },
      (err) => { },
    );
}
getDamageDirection(){
    let urlLink = `${this.CommonApiUrl}dropdown/getdamagedirection/${this.CompanyId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.DamageDirectionList = data.Result;
        }
      },
      (err) => { },
    );
}
getRepairReplaceType(){
  let urlLink = `${this.CommonApiUrl}dropdown/repairreplace/${this.CompanyId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.RepairReplaceTypeList = data.Result;
      }
    },
    (err) => { },
  );
}

DamageDictDesc(rowData){
}
totalCalc(rowData){
  let ReplacementCharge
  if(rowData.ReplacementCharge==null){
    ReplacementCharge = 0;
  } 
  else {
    ReplacementCharge = rowData.ReplacementCharge
  }
  
  const total = Number(rowData.NoOfUnits)*(rowData.UnitPrice)
  let add= Number(total)+ Number(ReplacementCharge);
  return add;
}
addNewDamageDeatils(){
  let entry = {
    "DamageSno":this.DamageDeatilsList.length+1,
    "DamageDirection":null,
    "DamagePart":null,
    "RepairReplace":null,
    "NoOfUnits":null,
    "UnitPrice":null,
    "ReplacementCharge":null,
    "Status":null,
    "QuotationNo":this.QuotationNo
    
  }
  this.DamageIndex = this.DamageDeatilsList.length
  this.DamageDeatilsList.push(entry) // Debug line
  // this.DamageVisible=true;
}
getBack(){
  if(this.WorkAssignedViewtype =='2'){
    this.router.navigate(['/surveyor'])
  }
  else{
    let type =sessionStorage.getItem('Type');
  if(this.viewType){
    this.router.navigate(['/spareparts'])
  }
  else{
    if(type=='In-Progress' ){
      this.router.navigate(['/surveyor'])
    }
    else if(type=='surveyor'){
      this.router.navigate(['/surveyor'])
    }
    else if(this.userType=='Dealer'){
      this.router.navigate(['/dealer'])
    }
    else{
      this.router.navigate(['/surveyor/workorder'])
    }
  }
  }
  
}
onSubmit(){
  let entry;
  for(entry of this.DamageDeatilsList){

  }
  console.log(entry,"entryentryentryentry");
  
  //this.saveDamageDeatils(this.DamageDeatilsList,null)
  if(entry.DamageDirection!=null && entry.DamagePart!=null && entry.RepairReplace!=null && entry.NoOfUnits!=null
     && entry.UnitPrice!=null && entry.ReplacementCharge!=null){
      this.router.navigate(['/garage/totalamount'])
     }
  else{
    this.validation()
  }
}
validation(){
  Swal.fire({
    title: `<strong>
      <ng-container >Errors!</ng-container>
      </strong>`,
    icon: 'info',
    html:
      `<ul class="list-group errorlist">
       Please Enter Values
    </ul>`,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText:
      `<i class="fa fa-thumbs-down"></i> <ng-container>Errors!</ng-container> `,
    confirmButtonAriaLabel: 'Thumbs down, Errors!',
  })
}
// onRowEditInit(product) {
//   //this.DamageVisible=true;
// }
removeDamageDeatils(rowData,index){
  //this.DamageDeatilsList.splice(index,1)
let ReqObj =[ {
  "ClaimNo": this.CliamNo,
  "QuotationNo": rowData.QuotationNo,
  "DamageSno":rowData.DamageSno,
}]
    let urlLink = `${this.CommonApiUrl}api/damagedetails/garagedelete`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Response){
          this.getDamageDeatilsListByclaimid()
        }
      },
      (err) => { },
    );
}
next(){
  if(this.totalAmountView==true){
    this.saveToalAmount();
  }
   else{
    this.router.navigate(['/surveyor']);
   }
}
addTotalsToData(dataList){
  let grandTotal = 0;
  let addUnit=0;
  let Labourtotal=0;
  for (let i = 0; i < dataList.length; i++) {
    const rowData = dataList[i];
    grandTotal += this.totalCalc(rowData);
    addUnit += Number(rowData.UnitPrice * rowData.NoOfUnits);
    Labourtotal += Number(rowData.ReplacementCharge);
  }
  this.addUnit =addUnit ;
  this.labourTotal=Labourtotal;
  // this.totalAmountcalc(addUnit);
   
    return  grandTotal    
} 
totalAmount(){
  // this.productItem.sparePartsCost =  this.addUnit;
  // this.productItem.totalAmountReplacement =  this.addUnit;
  // this.productItem.repairLabour =this.labourTotal;
  // this.productItem.totalAmountRepairLabour =this.labourTotal;
  //this.productItem.DeductionTotal =(this.productItem.totalAmountReplacement+this.productItem.totalAmountRepairLabour);
  //this.productItem.NetAmount =(this.productItem.totalAmountReplacement+this.productItem.totalAmountRepairLabour);
 // this.productItem.TotalwithVAT =(this.productItem.DeductionTotal+this.productItem.VATAmount);
}

totalAmountOpen(){
this.totalAmountView=true;
  this.totalAmount()


  let idTypeHooks1 ={ onInit: (field: FormlyFieldConfig) => {
    field.form.controls['sparePartDepreciation'].valueChanges.pipe(
      debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
      ).subscribe(() => {
        this.addDeduct()  // Call your method on value change
        this.deductTotalnew() 
        this.netAmount()
        this.vatRate()
        this.grandTotal()
      });
    field.props.onKeydown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key);
      this.addDeduct() // Call your method on key press
      this.deductTotalnew() 
      this.netAmount()
      this.vatRate()
        this.grandTotal()
    };
    }
    
}


let idTypeHooks2 ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['discountonSpareParts'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.addDeduct()  // Call your method on value change
      this.deductTotalnew() 
      this.netAmount()
      this.vatRate()
        this.grandTotal()
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.addDeduct() // Call your method on key press
    this.deductTotalnew() 
    this.netAmount()
    this.vatRate()
        this.grandTotal()
  };
  }
  
}


let idTypeHooks3 ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['replacementCostDeductible'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.addDeduct()
      this.netAmount()  // Call your method on value change
      this.vatRate()
        this.grandTotal()
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.addDeduct() 
    this.netAmount()
    this.vatRate()
        this.grandTotal()
  };
  }
  
}



let repairLabour ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['repairLabourDiscountAmount'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.addlabTotal()  // Call your method on value change
      this.deductTotalnew() 
      this.netAmount()
      this.vatRate()
        this.grandTotal()
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.addlabTotal() // Call your method on key press
    this.deductTotalnew()
    this.netAmount() 
    this.vatRate()
        this.grandTotal()
  };
  }
  
}



let repairLabourDeductible ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['repairLabourDeductible'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.addlabTotal()  // Call your method on value change
      this.netAmount()
      this.vatRate()
        this.grandTotal()
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.addlabTotal() // Call your method on key press
    this.netAmount()
    this.vatRate()
        this.grandTotal()
  };
  }
  
}

let AccidentDeduction ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['AccidentDeduction'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.deductTotal()  // Call your method on value change
      this.vatRate()
        this.grandTotal()
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.deductTotal() // Call your method on key press
    this.vatRate()
        this.grandTotal()
  };
  }
  
}
let AmountRecovered ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['AmountRecovered'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.deductTotal()  // Call your method on value change
      this.vatRate()
        this.grandTotal()
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.deductTotal() // Call your method on key press
    this.vatRate()
        this.grandTotal()
  };
  }
  


  
}
let VatRatePer ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['VATRate'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.vatRate()  // Call your method on value change
       this.grandTotal()
       
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.vatRate() // Call your method on key press
     this.grandTotal()
  };
  }
  
}

        // let fieldList=this.FieldsSpare[0].fieldGroup;
        //   for(let field of fieldList){
        //     if(field.key=='sparePartDepreciation'){
        //       field.hooks = idTypeHooks1;
        //     }
        //     if(field.key=='discountonSpareParts'){
        //       field.hooks = idTypeHooks2;
        //     }
        //     if(field.key=='replacementCostDeductible'){
        //       field.hooks = idTypeHooks3;
        //     }
        //   }
        //   let fieldList1=this.FieldsRepair[0].fieldGroup;
        //   for(let field of fieldList1){
        //     if(field.key=='repairLabour'){
        //       field.hooks = repairLabour;
        //     }
        //     if(field.key=='repairLabourDeductible'){
        //       field.hooks = repairLabourDeductible;
        //     }
        //   }
        //   let fieldList2=this.FieldsReplaceD[0].fieldGroup;
        //   for(let field of fieldList2){
        //     if(field.key=='repairLabourDiscountAmount'){
        //       field.hooks = idTypeHooks3;
        //     }
           
        //   }
          let fieldList3=this.FieldsVatRate[0].fieldGroup;
          for(let field of fieldList3){
            if(field.key=='VATRate'){
              field.hooks = VatRatePer;
            }
          }
          let fieldList4=this.FieldsAccident[0].fieldGroup;
          for(let field of fieldList4){
            if(field.key=='AccidentDeduction'){
              field.hooks = AccidentDeduction;
            }
          }
          let fieldList5=this.FieldsRecivedAmount[0].fieldGroup;
          for(let field of fieldList5){
            if(field.key=='AmountRecovered'){
              field.hooks = AmountRecovered;
            }
          }

          
          this.getTotalAmount(); 
          
}
 
totalAmountCalc(deduct){
  let total;
  total = this.productItem.sparePartsCost-deduct;
 
  this.spareFordeduct = total;
  this.form.controls['totalAmountReplacement'].setValue(total);
  return total
  
}
labTotal(repairLabour){
 let total;
 total = this.productItem.repairLabour-repairLabour;
 this.LabourFordeduct = total;
 this.form.controls['totalAmountRepairLabour'].setValue(total);
 return total
}
deductTotalnew(){
  let total;
  total = (this.spareFordeduct +this.LabourFordeduct);
  this.form.controls['DeductionTotal'].setValue(total);
}
deductTotalcalc(deductTotal){
  let total;
  total = (this.productItem.totalAmountReplacement+this.productItem.totalAmountRepairLabour)-deductTotal;
  this.form.controls['DeductionTotal'].setValue(total);
 }
addDeduct(){
  let deduct;
  deduct=this.productItem.sparePartDepreciation+this.productItem.discountonSpareParts+this.productItem.replacementCostDeductible;
  this.totalAmountCalc(deduct)
 // this.addSpare()
}

// addSpare(){
//   let spareReplacementCostDeductible;
//   spareReplacementCostDeductible=this.productItem.totalAmountReplacement-this.productItem.replacementCostDeductible;
//   //this.totalAmountCalc(spare)
//   this.form.controls['totalAmountReplacement'].setValue(spareReplacementCostDeductible);
// }
vatRate(){
  let vatAmount;
  vatAmount=(this.productItem.VATRate/100)*this.productItem.DeductionTotal;
  this.form.controls['VATAmount'].setValue(vatAmount);
  
}
grandTotal(){
  let grandTotal;
  grandTotal=this.productItem.DeductionTotal+this.productItem.VATAmount
  this.form.controls['TotalwithVAT'].setValue(grandTotal);
}
addrepair(){
  let reapirCostDeductible;
  reapirCostDeductible=this.productItem.totalAmountRepairLabour-this.productItem.repairLabourDeductible;
  this.form.controls['totalAmountRepairLabour'].setValue(reapirCostDeductible);
}
addlabTotal(){
  let repairLabour;
  repairLabour=this.productItem.repairLabourDiscountAmount+this.productItem.repairLabourDeductible;
  this.labTotal(repairLabour)
}
deductTotal(){
  let deductTotal =0;
  deductTotal=this.productItem.AccidentDeduction+this.productItem.AmountRecovered;
  this.deductTotalcalc(deductTotal)
}
netAmount(){
  let netAmount;
  netAmount=this.productItem.totalAmountRepairLabour+this.productItem.totalAmountReplacement;
  this.form.controls['NetAmount'].setValue(netAmount);
}
saveToalAmount(){
  let ReqObj = {
    "ClaimNo": this.CliamNo,
    "SparePartsCost": this.productItem.sparePartsCost,
    "SparePartsDeductible": this.productItem.replacementCostDeductible,
    "SparePartsDepreciation": this.productItem.sparePartDepreciation,
    "SparePartsDiscount": this.productItem.discountonSpareParts,
    "TotalAmountSpareParts": this.productItem.totalAmountReplacement,
    "RepairLabourCost": this.productItem.repairLabour,
    "RepairLabourDeductible": this.productItem.repairLabourDeductible,
    "RepairLabourDiscount": this.productItem.repairLabourDiscountAmount,
    "TotalAmountRepairLabour": this.productItem.totalAmountRepairLabour,
    "NetAmount": this.productItem.NetAmount,
    "UnknownAccidentDeduction": this.productItem.AccidentDeduction,
    "AmountToBeRecovered": this.productItem.AmountRecovered,
    "TotalAfterDeduction": this.productItem.DeductionTotal,
    "VATRate": this.productItem.VATRate,
    //"VatRate": this.productItem.VatRate,
    "VATAmount":this.productItem.VATAmount,
    "TotalAmountWithVAT": this.productItem.TotalwithVAT,
    //"SalvageDeduction": this.productItem.salvageDeduction,
    "GarageId":this.loginId,
    "QuotationNo":this.QuotationNo
  }
  let urlLink = `${this.CommonApiUrl}damage/surveyor/save/totalamount`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.IsError==false){
        this.router.navigate(['/surveyor']);
      }
    },
    (err) => { },
  );
}

getTotalAmount(){
  this.getTotalAmount1();
  let ReqObj = {
    "ClaimNo": this.CliamNo,
    "QuotationNo":this.QuotationNo,
    "GarageLoginId":sessionStorage.getItem("GarageLoginId")? sessionStorage.getItem("GarageLoginId"):this.GarageLoginId
  }
  let urlLink = `${this.CommonApiUrl}damage/surveyor/view/spareparts`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.IsError==false){
        // this.setValues(data?.Response);
        // this.netAmount();
        this.addTotals(data?.Response);
      }
    },
    (err) => { },
  );
}
getTotalAmount1(){
  let ReqObj = {
    "ClaimNo": this.CliamNo,
    "QuotationNo":this.QuotationNo,
    "GarageLoginId":sessionStorage.getItem("GarageLoginId")? sessionStorage.getItem("GarageLoginId"):this.GarageLoginId
  }

  let urlLink = `${this.CommonApiUrl}damage/surveyor/view/totalamount`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.IsError==false){
        // setTimeout(() => {
          this.setValues(data?.Response[0]);
        this.netAmount();
        // }, 200);
        
      //  this.addTotals(data?.Response);
      }
    },
    (err) => { },
  );
}
setValues(rowdata){
  // for(let entry of rowdata){
  //   this.SparePartDepreciation+=Number(entry.Depreciation)
  // }
  // console.log(rowdata,"rowdatarowdatarowdata");
  // alert(Number(this.SparePartDepreciation))
  // console.log(entry.SparePartDepreciation)
//  this.form.controls['sparePartsCost'].setValue(Number(rowdata.ReplacementCost))
//  this.form.controls['sparePartDepreciation'].setValue(Number(rowdata.SparePartDepreciation))
//  this.form.controls['discountonSpareParts'].setValue(Number(rowdata.DiscountOnSpareParts))
//  this.form.controls['totalAmountReplacement'].setValue(Number(rowdata.TotalAmountReplacement))
//  this.form.controls['replacementCostDeductible'].setValue(Number(rowdata.ReplacementCostDeductible))
//  this.form.controls['repairLabourDeductible'].setValue(Number(rowdata.RepairLabourDeductible))
//  this.form.controls['repairLabourDiscountAmount'].setValue(Number(rowdata.RepairLabourDiscountAmount))
 //this.form.controls['repairLabour'].setValue(rowdata.repairLabour)
 //this.form.controls['totalAmountRepairLabour'].setValue(rowdata.TotalAmountRepairLabour)
 //this.form.controls['NetAmount'].setValue(Number(rowdata.NetAmount))
 this.form.controls['AccidentDeduction'].setValue(Number(rowdata.UnknownAccidentDeduction))
 //this.form.controls['DeductionTotal'].setValue(rowdata.TotalAfterDeductions)
 this.form.controls['AmountRecovered'].setValue(Number(rowdata.AmountToBeRecovered))
// this.form.controls['VatRate'].setValue(Number(rowdata.VatRatePer))
 this.form.controls['VATRate'].setValue(Number(rowdata.VATRate))
//  this.form.controls['VATAmount'].setValue(Number(rowdata.VatAmount))
//   this.form.controls['salvageDeduction'].setValue(Number(rowdata.SalvageDeduction))
}
getPartType(){
  let urlLink = `${this.CommonApiUrl}dropdown/vehiclebodyparts/${this.CompanyId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.PartTypeList = data.Result;
      }
    },
    (err) => { },
  );
}
getsparepartstype(){
  let urlLink = `${this.CommonApiUrl}dropdown/sparepartstype/${this.CompanyId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        let defaultValue =[{"Code":"","CodeDesc":"---Select---"}]
          this.SpareList = defaultValue.concat(data.Result);
      }
    },
    (err) => { },
  );
}
getDepreciationtype(){
  let urlLink = `${this.CommonApiUrl}dropdown/depreciationtype/${this.CompanyId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        let defaultValue =[{"Code":"","CodeDesc":"---Select---"}]
          this.DepreciationList = defaultValue.concat(data.Result);
      }
    },
    (err) => { },
  );
}
getDamageList(){
  let urlLink = `${this.CommonApiUrl}dropdown/getdamagetype/${this.CompanyId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        let defaultValue =[{"Code":"","CodeDesc":"---Select---"}]
          this.DamageList = defaultValue.concat(data.Result);
      }
    },
    (err) => { },
  );
}
totalAmountPopup(rowData,index){
  console.log(rowData,"totalAmountPopuprowData");
  if(rowData)sessionStorage.setItem('TotalAmountData',JSON.stringify(rowData));

  this.cuurentTotal=( rowData.NoOfUnits*rowData.UnitPrice)
  this.RepairLabourCost=rowData.ReplacementCharge
  this.getDepreciationtype();
  this.getDamageList();
  this.getsparepartstype();
  this.getRowData(rowData)
  this.totalAmountPop =true;
}
calcRowDiscount(){
  const RowDiscountPer = (this.SpareDiscount/100)*this.cuurentTotal;
  this.SpareDiscountAmount=RowDiscountPer;
}
DepreciationTypeChange(){
   this.DepreciationReplace=0;
   this.DepreciationReplaceper=0;
}
spareTotalAmount(){
  const DepreciationReplaceper = Number(this.DepreciationReplaceper)/100*this.cuurentTotal;
  const calcadd= Number(this.DepreciationReplace)+ Number(DepreciationReplaceper) +Number(this.ReplacementCostDeductible)+Number(this.SpareDiscountAmount)
  this.tolalSpare=this.cuurentTotal-calcadd
}
repairTotalAmount(){
 // const DepreciationReplaceper = Number(this.DepreciationReplaceper)/100*this.cuurentTotal;
  const calcadd= Number(this.RepairLabourDiscountAmount)+ Number(this.RepairLabourDeductible);
  this.RepairLabourTotalAmount=this.RepairLabourCost-calcadd
}
repairDiscCalc(rowData){
    this.RepairLabourDiscountAmount=(Number(rowData)/100)*this.RepairLabourCost
}

getRowData(rowData){
 
let ReqObj = {
  "ClaimNo": this.CliamNo,
  "QuotationNo":this.QuotationNo,
  "GarageLoginId":sessionStorage.getItem("GarageLoginId")? sessionStorage.getItem("GarageLoginId"):this.GarageLoginId,
  "DamageSno": rowData.DamageSno
}
let urlLink = `${this.CommonApiUrl}damage/surveyor/view/spareparts/damageid`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    
   if(data.Response.length==1){
    let amounts =data.Response[0];
    // setTimeout(() => {
      this.sparePartType = amounts.SparePartType
    // }, 200);
    // this.sparePartType = amounts.SparePartType
    this.SpareDiscount = amounts.DiscountPercentage
    this.SpareDiscountAmount = amounts.DiscountAmount
    this.ReplacementCostDeductible = amounts.ReplacementCostDeductible
    this.DamageType = amounts.DamageType
    this.DepreciationType = amounts.DepreciationType
    this.DepreciationReplace = amounts.Depreciation
    this.DepreciationReplaceper = amounts.DiscountPercentage
    this.tolalSpare = amounts.TotalCost
    this.RepairLabourCost = amounts.RepairLabour
    this.RepairLabourDiscountPer = amounts.RepairLabourDiscount
    this.RepairLabourDiscountAmount = amounts.RepairLabourDiscountAmount
    this.RepairLabourDeductible = amounts.RepairLabourDeductible
    this.RepairLabourTotalAmount = amounts.TotalAmountRepairLabour
    this.RepairLabourRemarks = amounts.Remarks
   }else{
    let amounts =data.Response;
    this.sparePartType = amounts.SparePartType
    this.SpareDiscount = amounts.DiscountPercentage
    this.SpareDiscountAmount = amounts.DiscountAmount
    this.ReplacementCostDeductible = amounts.ReplacementCostDeductible
    this.DamageType = amounts.DamageType
    this.DepreciationType = amounts.DepreciationType
    this.DepreciationReplace = amounts.Depreciation
    this.DepreciationReplaceper = amounts.DiscountPercentage
     this.tolalSpare = amounts.TotalCost
    // this.RepairLabourCost = amounts.RepairLabour
    this.RepairLabourDiscountPer = amounts.RepairLabourDiscount
    this.RepairLabourDiscountAmount = amounts.RepairLabourDiscountAmount
    this.RepairLabourDeductible = amounts.RepairLabourDeductible
    this.RepairLabourTotalAmount = amounts.TotalAmountRepairLabour
    this.RepairLabourRemarks = amounts.Remarks
   }
  },
  (err) => { },
);
}

saveRowData(){
    let sparePartTypeDesc = this.SpareList.find(ele=>ele.Code==this.sparePartType)?.CodeDesc;
    let DepreciationTypeDesc = this.DepreciationList.find(ele=>ele.Code==this.DepreciationType)?.CodeDesc;
    let TotalAmountData = JSON.parse(sessionStorage.getItem('TotalAmountData'));
  let ReqObj = {
    "ClaimNo": this.CliamNo,
    "QuotationNo":this.QuotationNo,
    "GarageId": sessionStorage.getItem("GarageLoginId"),
    "SparePartType": this.sparePartType,
    "SparePartTypeDesc": sparePartTypeDesc,
    "DiscountPercentage": this.SpareDiscount,
    "DiscountAmount": this.SpareDiscountAmount,
    "ReplacementCostDeductible": this.ReplacementCostDeductible || '0',
    "DamageType": this.DamageType,
    "DepreciationType": this.DepreciationType,
    "DepreciationTypeDesc": DepreciationTypeDesc,
    "Depreciation": this.DepreciationReplace,
    //"ReferralStatus": "string",
    "RepairLabour": this.RepairLabourCost,
    "RepairLabourDiscount": this.RepairLabourDiscountPer,
    "RepairLabourDiscountAmount": this.RepairLabourDiscountAmount,
    "RepairLabourDeductible": this.RepairLabourDeductible,
    "TotalAmountRepairLabour": this.RepairLabourTotalAmount,
    "Remarks": this.RepairLabourRemarks,
    "DamageDirection": TotalAmountData.DamageDirection,
    "DamageDirectionDesc": TotalAmountData.DamageDirection,
    "PartType": TotalAmountData.DamagePart,
    "PartTypeDesc": TotalAmountData.DamagePart,
    "ReplaceRepair": TotalAmountData.RepairReplace,
    "NoOfUnits": TotalAmountData.NoOfUnits,
    "SparePartsCost": TotalAmountData.UnitPrice || '0',
    "LabourCharge": TotalAmountData.ReplacementCharge,
    "TotalCost": this.tolalSpare,
    "DamageSno": TotalAmountData.DamageSno
  }
  let urlLink = `${this.CommonApiUrl}damage/surveyor/save`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.IsError==false){
        this.totalAmountPop=false;
      }
    },
    (err) => { },
  );
}

addTotals(dataList){
  let grandTotal = 0;
  let SparePartsCost=0;
  let SparePartsCostDep=0;
  let SparePartsCostDisc=0;
  let ReplacementCostDeductible=0;
  let TotalAmountReplacement=0;
  let repairLabour=0;
  let RepairLabourDeductible=0;
  let RepairLabourDiscountAmount=0;
  let TotalAmountRepairLabour=0;
  let NetAmount=0;
  for (let i = 0; i < dataList.length; i++) {
    const rowData = dataList[i];
    //grandTotal += this.totalCalc(rowData);
   SparePartsCost += Number(rowData.SparePartsCost * rowData.NoOfUnits)
   SparePartsCostDep += Number(rowData.Depreciation);
   SparePartsCostDisc += Number(rowData.DiscountAmount);
   ReplacementCostDeductible += Number(rowData.ReplacementCostDeductible);
   TotalAmountReplacement += Number(rowData.TotalCost);
   repairLabour += Number(rowData.RepairLabour);
   RepairLabourDeductible += Number(rowData.RepairLabourDeductible);
   RepairLabourDiscountAmount += Number(rowData.RepairLabourDiscountAmount);
   TotalAmountRepairLabour += Number(rowData.TotalAmountRepairLabour);
   NetAmount = TotalAmountReplacement + TotalAmountRepairLabour
  }
  this.form.controls['sparePartsCost'].setValue(Number(SparePartsCost));
  this.form.controls['sparePartDepreciation'].setValue(Number(SparePartsCostDep));
  this.form.controls['discountonSpareParts'].setValue(Number(SparePartsCostDisc));
  this.form.controls['replacementCostDeductible'].setValue(Number(ReplacementCostDeductible));
  this.form.controls['totalAmountReplacement'].setValue(Number(TotalAmountReplacement));
  this.form.controls['repairLabour'].setValue(Number(repairLabour));
  this.form.controls['repairLabourDeductible'].setValue(Number(RepairLabourDeductible))
  this.form.controls['repairLabourDiscountAmount'].setValue(Number(RepairLabourDiscountAmount))
  this.form.controls['totalAmountRepairLabour'].setValue(Number(TotalAmountRepairLabour))
  this.form.controls['NetAmount'].setValue(Number(NetAmount))
  // this.totalAmountcalc(addUnit);
   
 //   return  grandTotal    
} 
}
