import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endorsement',
  templateUrl: './endorsement.component.html',
  styleUrls: ['./endorsement.component.scss']
})
export class EndorsementComponent {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  PolicyNo:any;userDetails:any;loginId:any=null;
  QuoteNo:any;agencyCode:any=null;brokerbranchCode:any=null;
  Categoery:any;branchCode:any=null;productId:any=null;
  Type:any;userType:any=null;insuranceId:any=null;
  Primium:any;policyNo:any=null;
  EndorsementPrimium:any;
  Status:any;
  rows:any[] = [];
  columns:string[] = [];
  items: any[]=[];
  quoteData: any[]=[];
  currencyCode: any;
  constructor(private router:Router,private sharedService:SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.policyNo = sessionStorage.getItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('endorseStartDate')
    sessionStorage.removeItem('homeCommonDetails')
  }
  ngOnInit() {
     this.items = [{ label: 'Home', routerLink:'/' },{label:'Portfolio',routerLink:'/portfolio'},{label:'Endorsement'}];
    // this.tableActions = [{label: 'Edit', icon:'pi pi-pencil'}, {label: 'Delete',icon: PrimeIcons.TRASH}];
    this.columns = [ 'Policy No','Quote No',  'Category','Type', 'Premium', 'Endorsement Premium', 'Status', 'Action'];
    // this.customers = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];
    // this.PolicyNo = 'P11/2024/110/99999/10/1003815';
    // this.QuoteNo="AICQ11776";
    // this.Categoery="Debit";
    // this.Type="Debit";
    // this.Primium="23600";
    // this.EndorsementPrimium="23600";
   // this.Status="Y";
   this.getExistingEndorsements();

  }
  getExistingEndorsements(){
    let ReqObj = {
      "PolicyNo": this.policyNo,
      "CompanyId": this.insuranceId,   
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}endorsment/datas`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log("Endorsement List",data);
          this.quoteData = data;
          if(this.quoteData.length!=0){
            this.currencyCode = this.quoteData[0].currency
            
          }
      },
      (err) => { },
    );
  }

  navigateTo(){
    this.router.navigate(['/portfolio']);
  }
  onEditCovers(rowData){
    let obj = {
      "EndtTypeId":rowData.endorsementTypeId,
      "FieldsAllowed":[],
      "EffectiveDate":rowData.effectiveDate,
      "Remarks":rowData.endorsementRemarks,
      "QuoteNo": rowData.quoteNo, 
      "PolicyNo": rowData.policyNo
    }
    sessionStorage.setItem('endorseStartDate',this.quoteData[0].policyStartDate);
    sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
    sessionStorage.setItem('quoteReferenceNo',rowData.requestReferenceNo);
    this.router.navigate(['/portfolio/endorsementtype']);
  }
  onCreateEndorsement(){
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.setItem('endorseStartDate',this.quoteData[0].policyStartDate);
    this.router.navigate(['/portfolio/endorsementtype']);
  }
  getPolicyItems(rowData){
    let entry:MenuItem[] =  [{
      label: 'PDF',
      items: [{
          label: 'Schedule',
          icon: 'pi pi-file-pdf',
          command: () => {
                
          }
      },
      {
        label: 'Debit Note',
        icon: 'pi pi-file-pdf',
        command: () => {
            
        }
      },
      {
        label: 'Credit Note',
        icon: 'pi pi-file-pdf',
        command: () => {
          
        }
      }
      ]},
      {
          label: 'Others',
           items: [
          //  {
          //     // label: 'Endorsement',
          //     // icon: 'pi pi-external-link',
          // //     command: () => {
          // //       this.router.navigate(['/portfolio/endorsement'])
          // // }
          // },
          {
              label: 'View Quote Details',
              icon: 'pi pi-eye'
          }
      ]}
    ];
  return entry;
  }
  checkCreateEndorse(){
    if(this.quoteData.length!=0){
      return ((this.quoteData.length==0) || !this.quoteData.some(ele=>ele.endorsementStatus=='P' || (ele.endorsementStatus=='C' && ele.endorsementTypeId==842)))
    }
    else return true;
  }
onGetSchedule(rowData){
  let quoteNo = null;
  if(rowData.QuoteNo) quoteNo = rowData.QuoteNo;
  else quoteNo = rowData.quoteNo;
  let ReqObj = {
    "QuoteNo": quoteNo
  }
  let urlLink = `${this.CommonApiUrl}pdf/policyform`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data?.Result?.PdfOutFile){
          this.downloadMyFile(data.Result.PdfOutFile,'Schedule');
      }
      else{
        Swal.fire({
          title: '<strong>Schedule Pdf</strong>',
          icon: 'error',
          html:
            `No Pdf Generated For this Policy`,
          //showCloseButton: true,
          //focusConfirm: false,
          showCancelButton: false,

          //confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
        })
      }
    },
    (err) => { },
  );
}

onDebitdownload(rowData){
  console.log('KKKKKKKKKKK',rowData.QuoteNo);
  let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`

  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data?.Result?.PdfOutFile){
        this.downloadMyFile(data.Result.PdfOutFile,'DebitPdf');
    }
  },
    (err) => { },
  );
}
onCreditdownload(rowData){
  console.log('KKKKKKKKKKK',rowData.QuoteNo);
  let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`

  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data?.Result?.PdfOutFile){
        this.downloadMyFile(data.Result.PdfOutFile,'Creditpdf');
    }
  },
    (err) => { },
  );
}

downloadMyFile(data,name) {
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', data);
  link.setAttribute('download',name);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
}