import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
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
  grandTotal: any;
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
  constructor(private cdr: ChangeDetectorRef,private messageService: MessageService,private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
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
  
  this.getDamageDeatilsListByclaimid();
  this.getDamageDirection();
  this.getRepairReplaceType();
  this.getPartType();
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
    let urlLink = `${this.CommonApiUrl}dropdown/getdamagedirection`;
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
  let urlLink = `${this.CommonApiUrl}dropdown/repairreplace`;
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
  let add= Number(rowData.UnitPrice)+ Number(ReplacementCharge);
  const total = Number(rowData.NoOfUnits)*(add)
  return total;
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
  this.DamageDeatilsList.push(entry)
  console.log(this.DamageDeatilsList); // Debug line
  // this.DamageVisible=true;
}
getBack(){
  let type =sessionStorage.getItem('Type');
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
    addUnit += Number(rowData.UnitPrice);
    Labourtotal += Number(rowData.ReplacementCharge);
  }
  this.addUnit =addUnit;
  this.labourTotal=Labourtotal;
  // this.totalAmountcalc(addUnit);
   
    return  grandTotal    
} 
totalAmount(){
  this.productItem.sparePartsCost =  this.addUnit;
  this.productItem.totalAmountReplacement =  this.addUnit;
  this.productItem.repairLabour =this.labourTotal;
  this.productItem.totalAmountRepairLabour =this.labourTotal;
  this.productItem.DeductionTotal =(this.productItem.totalAmountReplacement+this.productItem.totalAmountRepairLabour);
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
      });
    field.props.onKeydown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key);
      this.addDeduct() // Call your method on key press
      this.deductTotalnew() 
    };
    }
    
}


let idTypeHooks2 ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['discountonSpareParts'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.addDeduct()  // Call your method on value change
      this.deductTotalnew() 
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.addDeduct() // Call your method on key press
    this.deductTotalnew() 
  };
  }
  
}
let repairLabour ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['repairLabourDiscountAmount'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.addlabTotal()  // Call your method on value change
      this.deductTotalnew() 
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.addlabTotal() // Call your method on key press
    this.deductTotalnew() 
  };
  }
  
}

let replacementCostDeductible ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['replacementCostDeductible'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.deductTotal()  // Call your method on value change
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.deductTotal() // Call your method on key press
  };
  }
  
}

let repairLabourDeductible ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['repairLabourDeductible'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.deductTotal()  // Call your method on value change
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.deductTotal() // Call your method on key press
  };
  }
  
}

let AccidentDeduction ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['AccidentDeduction'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.deductTotal()  // Call your method on value change
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.deductTotal() // Call your method on key press
  };
  }
  
}
let salvageDeduction ={ onInit: (field: FormlyFieldConfig) => {
  field.form.controls['salvageDeduction'].valueChanges.pipe(
    debounceTime(300)  // Wait 300ms after the last input before calling idTypechange
    ).subscribe(() => {
      this.deductTotal()  // Call your method on value change
    });
  field.props.onKeydown = (event: KeyboardEvent) => {
    console.log('Key pressed:', event.key);
    this.deductTotal() // Call your method on key press
  };
  }
  
}


        let fieldList=this.FieldsSpare[0].fieldGroup;
          for(let field of fieldList){
            if(field.key=='sparePartDepreciation'){
              field.hooks = idTypeHooks1;
            }
            if(field.key=='discountonSpareParts'){
              field.hooks = idTypeHooks2;
            }
          }
          let fieldList1=this.FieldsRepair[0].fieldGroup;
          for(let field of fieldList1){
            if(field.key=='repairLabour'){
              field.hooks = repairLabour;
            }
          }
          let fieldList2=this.FieldsReplaceD[0].fieldGroup;
          for(let field of fieldList2){
            if(field.key=='replacementCostDeductible'){
              field.hooks = replacementCostDeductible;
            }
          }
          let fieldList3=this.FieldsRepairD[0].fieldGroup;
          for(let field of fieldList3){
            if(field.key=='repairLabourDeductible'){
              field.hooks = repairLabourDeductible;
            }
          }
          let fieldList4=this.FieldsAccident[0].fieldGroup;
          for(let field of fieldList4){
            if(field.key=='AccidentDeduction'){
              field.hooks = AccidentDeduction;
            }
          }
          let fieldList5=this.FieldsSalvage[0].fieldGroup;
          for(let field of fieldList5){
            if(field.key=='salvageDeduction'){
              field.hooks = salvageDeduction;
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
  deduct=this.productItem.sparePartDepreciation+this.productItem.discountonSpareParts;
  this.totalAmountCalc(deduct)
}
addlabTotal(){
  let repairLabour;
  repairLabour=this.productItem.repairLabourDiscountAmount;
  this.labTotal(repairLabour)
}
deductTotal(){
  let deductTotal;
  deductTotal=this.productItem.replacementCostDeductible+this.productItem.repairLabourDeductible+this.productItem.AccidentDeduction+this.productItem.salvageDeduction;
  this.deductTotalcalc(deductTotal)
}

saveToalAmount(){
  let ReqObj = {
    "ClaimNo": this.CliamNo,
    "ReplacementCost": this.productItem.sparePartsCost,
    "ReplacementCostDeductible": this.productItem.replacementCostDeductible,
    "SparePartDepreciation": this.productItem.sparePartDepreciation,
    "DiscountOnSpareParts": this.productItem.discountonSpareParts,
    "TotalAmountReplacement": this.productItem.totalAmountReplacement,
    "RepairLabour": this.productItem.repairLabour,
    "RepairLabourDeductible": this.productItem.repairLabourDeductible,
    "RepairLabourDiscountAmount": this.productItem.repairLabourDiscountAmount,
    "TotalAmountRepairLabour": this.productItem.totalAmountRepairLabour,
    "NetAmount": this.productItem.NetAmount,
    "UnknownAccidentDeduction": this.productItem.AccidentDeduction,
    "AmountToBeRecovered": this.productItem.AmountRecovered,
    "TotalAfterDeductions": this.productItem.DeductionTotal,
    "VatRatePer": this.productItem.VATRate,
    "VatRate": this.productItem.VatRate,
    "VatAmount":this.productItem.VATAmount,
    "TotalWithVAT": this.productItem.VATAmount,
    "SalvageDeduction": this.productItem.salvageDeduction,
    "GarageId":this.loginId,
    "QuotationNo":this.QuotationNo
  }
  let urlLink = `${this.CommonApiUrl}damage/surveyor/save`;
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
  let ReqObj = {
    "ClaimNo": this.CliamNo,
    "QuotationNo":this.QuotationNo
  }
  let urlLink = `${this.CommonApiUrl}damage/surveyor/view/spareparts`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.IsError==false){
        this.setValues(data?.Response);
      }
    },
    (err) => { },
  );
}
setValues(rowdata){
 //this.form.controls['sparePartsCost'].setValue(rowdata.ReplacementCost)
 this.form.controls['sparePartDepreciation'].setValue(Number(rowdata.SparePartDepreciation))
 this.form.controls['discountonSpareParts'].setValue(Number(rowdata.DiscountOnSpareParts))
 this.form.controls['totalAmountReplacement'].setValue(Number(rowdata.TotalAmountReplacement))
 this.form.controls['replacementCostDeductible'].setValue(Number(rowdata.ReplacementCostDeductible))
 this.form.controls['repairLabourDeductible'].setValue(Number(rowdata.RepairLabourDeductible))
 this.form.controls['repairLabourDiscountAmount'].setValue(Number(rowdata.RepairLabourDiscountAmount))
 //this.form.controls['repairLabour'].setValue(rowdata.repairLabour)
 //this.form.controls['totalAmountRepairLabour'].setValue(rowdata.TotalAmountRepairLabour)
 this.form.controls['NetAmount'].setValue(Number(rowdata.NetAmount))
 this.form.controls['AccidentDeduction'].setValue(Number(rowdata.UnknownAccidentDeduction))
 //this.form.controls['DeductionTotal'].setValue(rowdata.TotalAfterDeductions)
 this.form.controls['AmountRecovered'].setValue(Number(rowdata.AmountToBeRecovered))
// this.form.controls['VatRate'].setValue(Number(rowdata.VatRatePer))
 this.form.controls['VATRate'].setValue(Number(rowdata.VatRatePer))
 this.form.controls['VATAmount'].setValue(Number(rowdata.VatAmount))
  this.form.controls['salvageDeduction'].setValue(Number(rowdata.SalvageDeduction))
}
getPartType(){
  let urlLink = `${this.CommonApiUrl}dropdown/vehiclebodyparts`;
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
}
