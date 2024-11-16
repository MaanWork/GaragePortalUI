import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
import { QuotationPlanComponent } from '../quotation-plan.component';

@Component({
  selector: 'app-policy-info',
  templateUrl: './policy-info.component.html',
})
export class PolicyInfoComponent {
  sidebarVisible:boolean = false;
  accessories: MenuItem[] = [];loginId:any=null;
  userDetails:any=null;insuranceId:any=null;productId:any=null;
  userType:any=null;branchCode:any=null;quoteNo:any=null;chassisNo:any=null;
  quoteRefNo:any=null;Section:boolean=false;buildingDetailsSection:boolean=false;
  newten:boolean=false;minDate:any=null;maxDate:any=null;accessoriesType:any=null;
  endorsementSection:boolean=false;orgPolicyNo:any=null;endorsementId:any=null;actualAssSI:any=null;
  enableFieldsList:any[]=[];enableAllSection:any=null;endorsePolicyNo:any=null;totalAccessoriesSI:any='0';
  endorseCategory:any=null;endorsementName:any=null;newacc:any=null;serialNoDesc:any=null;sectionDetails:any=null;
  employeeOccupationList:any[]=[];actualAccessoriesSI:any=null;SumInsured:any=null;enableAccessoriesEditSection:boolean=false;
  accessoriesList:any[]=[];currentAccessoriesIndex:any=null;editAccessoriesSection:boolean=false;ChassisList:any[]=[];
  totalAccSIError:any=null;AccLists:any[]=[];CoverList:any[]=[];sumInsuredDetails:any=null;item:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;productItem:any=null;
  quoteDetails:any=null;Riskdetails:any=null;customerDetails:any
  accessoriesSection: boolean=false;loadingSection:boolean=false;
  successSection: boolean=false;paymentDetails:any=null;policyNo:any=null;
  policySection:boolean=false;mobilePaymentPending:boolean = false;totalPremium:any=null;
  EmiYn: any=null;emiPeriod: any=null;emiMonth: any=null;
  stickerNo: any=null;CoverNoteNo: any=null;
  displayPayment:boolean=false;
  constructor(private router: Router,private datePipe:DatePipe,private quoteComponent:QuotationPlanComponent,
    private sharedService: SharedService,public http: HttpClient) {
   let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
   this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
   this.insuranceId = this.userDetails.Result.InsuranceId;
   this.loginId = this.userDetails.Result.LoginId;
   this.productId = this.userDetails.Result.ProductId;
   this.userType = this.userDetails?.Result?.UserType;
   this.branchCode = this.userDetails.Result.BranchCode;
   this.quoteNo = sessionStorage.getItem('quoteNo');
   console.log("item received", homeObj);
   let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(this.productId=='5' || this.productId=='29'){
      this.buildingDetailsSection=false;
    }
    else if(this.productId!='43'){
      this.buildingDetailsSection=true;
      // let items = this.item?.find((Code) => Code == '1' || Code=='40');
      // console.log('JJJJJJJJJJJJJJJJJJ',items);
    }
    if(this.productId=='43'){
      this.newten = true;
      
    }
  }
  ngOnInit() {
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //this.fourth=false;
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        console.log('Enables fields Section',this.enableFieldsList);
        let enableAllSection = this.enableFieldsList.some(ele=>ele=='domesticRiskDetails' || ele=='AddCovers' || ele=='AccessoriesSI');
        console.log('Enables Add Section',enableAllSection);
        if(enableAllSection) this.enableAllSection=true;
        else this.enableAllSection = false;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        console.log("Enable Obj in Vehicle",this.enableFieldsList,this.endorsementId)
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
    if(this.quoteNo){
      this.loadingSection = true;
      this.getEditQuoteDetails();
    }
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          let quoteDetails = data?.Result?.QuoteDetails;
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.quoteRefNo = data?.Result?.QuoteDetails?.RequestReferenceNo;
            this.Riskdetails = data.Result?.RiskDetails;
            this.quoteComponent.currencyCode =  this.quoteDetails?.Currency;
            this.quoteComponent.setRiskDetails(this.Riskdetails);
          if(this.loadingSection && this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!=''){
            this.paymentDetails = {
              "QuoteNo": this.quoteNo,
              "PolicyNo": this.quoteDetails?.policyNo,
              "MerchantReference": this.quoteDetails?.MerchantReference,
              "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
              "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
            };
            this.policyNo = data?.Result?.PolicyNo;
            this.policySection = true;
            this.successSection = false;
            this.loadingSection = false;
            // this.updateTiraDetails();
            // this.getTiraDetails();
          }
          else{
            this.checkStatus();
          }
        }
      },
      (err) => { },
      );
  }
  checkStatus(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${this.quoteNo}`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.result=='FAIL'){
            if(this.quoteDetails?.EmiYn!=null){
              this.EmiYn = this.quoteDetails.EmiYn;
              this.emiPeriod = this.quoteDetails.InstallmentPeriod;
              this.emiMonth = this.quoteDetails.InstallmentMonth;
              //if(this.EmiYn=='Y') this.getCurrentEmiDetails();
            }
            else{
              this.EmiYn = "N";
              this.emiPeriod = null;
              this.emiMonth = null;
            }
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
        }
        else{
          if(this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!='' && this.quoteDetails?.policyNo!=undefined){
            this.paymentDetails = {
              "QuoteNo": this.quoteNo,
              "PolicyNo": this.quoteDetails?.policyNo,
              "MerchantReference": this.quoteDetails?.MerchantReference,
              "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
              "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
            };
            this.policyNo = data?.Result?.PolicyNo;
            this.policySection = true;
            this.successSection = false;
            this.mobilePaymentPending = false;
            //this.getTiraDetails();
            //this.updateTiraDetails();
          }
          else{
            if(!this.mobilePaymentPending) this.loadingSection = true;
            this.getEditQuoteDetails();
          }
        }
      });
  }
  updateTiraDetails(){
    let ReqObj={
      "QuoteNo": this.quoteNo,
    }
    let urlLink = `${this.CommonApiUrl}payment/pushtira`;
   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
          if(data?.Result?.Response=='Success') this.getTiraDetails();
      } 
    },
    (err) => { },
    );
  }
  getTiraDetails(){
    let urlLink = `${this.CommonApiUrl}payment/gettira/${this.quoteNo}`;
   this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      if(data?.Result){
        this.policySection = true;
          this.stickerNo = data?.Result?.StickerNumber;
          this.CoverNoteNo = data?.Result?.CoverNoteNo;
      } 
    },
    (err) => { },
    );
  }
  onGetSchedule(rowData){
    let ReqObj = {
      "QuoteNo":rowData.QuoteNo
    }
    if(this.endorsementSection) ReqObj['EndorsementType'] = 'E';
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    // let ReqObj = {
    //   "QuoteNo": rowData.QuoteNo,
    //   "ReportId": "6"
    // }
    // let urlLink = `${this.CommonApiUrl}pdf/getSchedule`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile);
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            showCancelButton: false,
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
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','DebitPdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
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
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','Creditpdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onGetQuoteSchedule(){
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile);
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
  downloadMyFile(data) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', 'Schedule');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  navigateTo(){
    if(this.endorsementSection) this.router.navigate(['/portfolio/endorsement']);
    else this.router.navigate(['/portfolio']);
  }
}
