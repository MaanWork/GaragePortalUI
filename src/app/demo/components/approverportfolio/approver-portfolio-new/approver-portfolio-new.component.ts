import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from '../../../service/shared.service';
import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-approver-portfolio-new',
  templateUrl: './approver-portfolio-new.component.html',
  styleUrls: ['./approver-portfolio-new.component.scss']
})
export class ApproverPortfolioNewComponent {
  selectedBranch: MenuItem | undefined;tableView = 'table';
  userDetails:any=null;loginId:any=null;agencyCode:any=null;
  brokerbranchCode:any=null;branchCode:any=null;productId:any=null;
  userType:any=null;insuranceId:any=null;brokerCode:any=null;
  brokerList:any[]=[];totalQuoteRecords:any=null;limit:any=0;
  pageCount:any=null;quoteData:any[]=[];quotePageNo:any=null;
  startIndex:any=null;endIndex:any=null;
  totalCancelRecords:any;
  customersearch:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  cancelbrokerList: any[]=[];
  CancelbrokerCode: any;CancelledquoteData:any[]=[];
  pageCount1: number;lang:any=null;
  quotePageNo1: number;
  show: boolean = false;
  branches: { label: string; target: string; }[];
  items: ({ label: string; routerLink: string; } | { label: string; routerLink?: undefined; })[];
  columns: any[]=[];
  StartDate:any;minDate:any;TemplateList:any[]=[];EndDate:any;bussinesstype:any;
  branchValue:any;branchList:any[]=[];
  enddate: string;
  startDate: string;
  ProductName: string;
  dataSource: any;
  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
  @ViewChild('paginatorSecond') paginatorSecond: MatPaginator;
  BrokerName: any;
  newlogin: any;
  newproductId: any;
  rowdata: any;
  constructor(private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate: TranslateService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
   
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
      sessionStorage.removeItem('loadingType');
      sessionStorage.removeItem('firstLoad');
      sessionStorage.removeItem('VechileDetails');
    
   }
  ngOnInit() {
    
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);this.setHeaders();
		  });
		if(!this.lang){
      if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language')); this.setHeaders();}
    this.branches = [
      { label: 'Test', target: 'T' },
    ];
     this.columns=['PolicyNo','QuoteNo','CustomerName','Currency','StartDate','EndDate','Premium','Actions']
    //  this.getPendingPolicyList()
     let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
     console.log('HHHHHHHHHHHH',CustomerObj);
     let bussinesstype
     if (CustomerObj){
       bussinesstype=CustomerObj?.BusinessType;
       this.newlogin=CustomerObj?.Login;
     }
       if(bussinesstype!='NB2C'){
         this.onTotal();
       } 
       else{
         this.onTotalb2c();
       } 
  
  }
  setHeaders(){
    if(this.lang=='en'){
      this.items = [{ label: 'Home', routerLink:'/' }, {label:'Portfolio'}];
    }
    else if(this.lang=='po'){
      this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Portfólio'}];
    }
  }
  // getPendingPolicyList(){
    
  //     let ReqObj = {
  //         "BranchCode":this.branchCode,
  //           "InsuranceId": this.insuranceId,
  //           "LoginId":this.loginId,
  //           "StartDate": "01/07/2024",
  //           "EndDate": "17/08/2024",
  //           "ProductId":this.productId,
  //           "Limit":this.limit,
  //           "Offset": 10000,
  //           "BusinessType": "N",
  //     }
  //     let urlLink = `${this.CommonApiUrl}api/admin/portfoliogrid`;
  //     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         sessionStorage.removeItem('loadingType');
  //         if(data.Result){
  //           if (data.Result) {
  //             //if (data.Result?.PortfolioList.length != 0) {
               
  //                   //this.quoteData = data.Result?.PortfolioList;
  //                   this.quoteData=[
  //                     {
  //                       "PolicyNo": "P11/1003973",
  //                       "QuoteNo": "SIV-Q01899",
  //                       "ClientName": "Jane Doe",
  //                       "Currency": "USD",
  //                       "PolicyStartDate": "17/08/2024",
  //                       "PolicyEndDate": "16/08/2025",
  //                       "OverallPremiumLc": "1500.00"
  //                     }
  //                   ]
  //         }}
  //       },
  //       (err) => { },
  //     );
  //   }
    onGetSchedule(rowData){
      let ReqObj = {
        "QuoteNo":rowData.QuoteNo
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
    downloadMyFile(data,name) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', data);
      link.setAttribute('download',name);
      document.body.appendChild(link);
      link.click();
      link.remove();
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
    onViews(rowData){
      let ReqObj={
        "Search":"",
        "SearchValue":rowData.QuoteNo,
        "QuoteNo":rowData.QuoteNo,
        "RequestReferenceNo":rowData.RequestReferenceNo,
        "ProductId":this.productId,
        "pageFrom": 'policy',
        "CustomerName": rowData.ClientName,
        "ProductName":rowData.ProductName,
        "PolicyNo":rowData.PolicyNo,
        "Currency":rowData.Currency,
        "EmiYn":rowData?.EmiYn
      }
      sessionStorage.setItem('editCustomer',JSON.stringify(ReqObj));
      this.router.navigate(['/portfolio/motorDocuments'])
    }
    ongetBack(){
           
      let quoteObj = {
       "Businesstype":this.bussinesstype,
       "StartDate":this.StartDate,
       "EndDate":this.EndDate,
       "BranchCode":this.branchValue
      }
      //sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
      sessionStorage.setItem('datedetails',JSON.stringify(quoteObj));
      this.router.navigate(['/Home/ApproverPortfolio']);
    }
    onTotal(){
      this.show=true;
      let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
      console.log('HHHHHHHHHHHH',CustomerObj);
      
      if (CustomerObj){
      this.newproductId=CustomerObj?.ProductId,
      this.ProductName=CustomerObj?.ProductName,
      this.bussinesstype=CustomerObj?.BusinessType,
      this.startDate=CustomerObj?.StartDate,
      this.enddate=CustomerObj?.EndDate,
      this.branchValue=CustomerObj?.BranchCode,
      this.newlogin=CustomerObj?.LoginId,
      this.page=CustomerObj?.page,
      this.BrokerName=CustomerObj?.BrokerName,
      console.log('ooooooooo',this.page);
      this.rowdata=CustomerObj?.rowData
      }
          
            console.log('PPPPPPPPPP',this.ProductName);
            // this.newproductId=ProductId;
            // if(this.bussinesstype == 'N' || this.bussinesstype == 'C' || this.bussinesstype == 'E'){
            //   this.columns=[
            //     // { key: 'BrokerName', display: 'Broker Name' },
            //     {  header: 'Quote No' },
            //     { header: 'Policy No' },
            //     {  header: 'Customer Name' },
            //     {  header: 'Login ID' },
            //     {  header: 'Policy StartDate' },
            //     {  header: 'Policy EndDate' },
            //     { header: 'Currency' },
            //     { header: 'Premium'},
            //     { header: 'Action'},
            //     // {
            //     //   key: 'actions',
            //     //   display: 'Schedule / View',
            //     //   config: {
            //     //     isViews:true,
            //     //     isEdit: true,
                    
            //     //   },
            //     // },
            //     // { key: 'OverallPremiumLc', display: 'Premium' }, 
            //     // { key:'StatusDesc', display:'Status Desc'},
            //     // {key:'UserType',display:'UserType'}
            //   ]
            // }
        
            //   if(this.bussinesstype == 'Q'){
            //   this.columns=[
            //     { header: 'Request ReferenceNo' },
            //     // { key: 'BrokerName', display: 'Broker Name' },
            //     {  header: 'Quote No' },
            //     {  header: 'Policy No' },
            //     {  header: 'Customer Name' },
            //     {  header: 'Login ID' },
            //     {  header: 'Policy StartDate' },
            //     {  header: 'Policy EndDate' },
            //     // { key: 'OverallPremiumLc', display: 'Premium' }, 
            //     {
            //       header: 'Premium'
            //     },
            //     {
            //       header: 'Action'
            //     },
            //     // { key:'StatusDesc', display:'Status Desc'},
            //     // {key:'UserType',display:'UserType'}
            //   ]
            // }
           
              //  let startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
              //  let enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
               let ReqObj={
                "InsuranceId":this.insuranceId,
              "BusinessType": this.bussinesstype,
               "StartDate":this.startDate,
              "EndDate":this.enddate,
              "BranchCode":this.branchValue,
              "LoginId":this.newlogin,
              "ProductId": this.newproductId,
              "Limit":"0",
              "Offset":"1000"
            }
            let urlLink = `${this.CommonApiUrl}api/admin/portfoliogrid`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if(data?.Result){
                  this.quoteData=data.Result;
                  console.log('Bussiness Type',this.quoteData);
                  
                }
              },
              (err) => { },
            );
           
            let quote={
              "bussinesstype":this.bussinesstype,
              "startDate":this.startDate,
              "EndDate":this.enddate
            }
            sessionStorage.setItem('datedetials',JSON.stringify(quote));
          }
          onTotalb2c(){
            this.show=true;
            let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
      console.log('HHHHHHHHHHHH',CustomerObj);
      
      if (CustomerObj){
      this.newproductId=CustomerObj?.ProductId,
      this.ProductName=CustomerObj?.ProductName,
        this.bussinesstype=CustomerObj?.BusinessType,
        this.startDate=CustomerObj?.StartDate,
      this.enddate=CustomerObj?.EndDate,
      this.branchValue=CustomerObj?.BranchCode,
      this.newlogin=CustomerObj?.LoginId,
      this.page=CustomerObj?.page,
      this.BrokerName=CustomerObj?.BrokerName,
      console.log('ooooooooo',this.page);
      this.rowdata=CustomerObj?.rowData
      }
               let ReqObj={
                "InsuranceId":this.insuranceId,
              "BusinessType": this.bussinesstype,
               "StartDate":this.startDate,
              "EndDate":this.enddate,
              "BranchCode":this.branchValue,
              "LoginId":this.newlogin,
              "ProductId": this.newproductId,
              "Limit":"0",
              "Offset":"1000"
            }
            let urlLink = `${this.CommonApiUrl}api/admin/portfoliob2cgrid`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if(data?.Result){
                  this.quoteData=data.Result;
                  console.log('Bussiness Type',this.quoteData);
                  
                }
              },
              (err) => { },
            );
           
            let quote={
              "bussinesstype":this.bussinesstype,
              "startDate":this.startDate,
              "EndDate":this.enddate
            }
            sessionStorage.setItem('datedetials',JSON.stringify(quote));
          }
  page(arg0: string, page: any) {
    throw new Error('Method not implemented.');
  }
}

