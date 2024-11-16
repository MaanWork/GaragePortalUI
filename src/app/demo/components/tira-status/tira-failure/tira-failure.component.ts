import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json'

@Component({
  selector: 'app-tira-failure',
  templateUrl: './tira-failure.component.html',
  styleUrls: ['./tira-failure.component.scss']
})
export class TiraFailureComponent {
  issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
  quoteno:any;
  startdate:Date;enddate:Date;
  insuranceId:any;userDetails:any;subUserType:any;
  pageCount: number;
  totalRecords: any;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
  visible:boolean=false;
  closeResult: string;
  totalQuoteRecords: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  productId: string;show:boolean=false;productList:any[]=[];
  loginId: any;
  insuranceList: any[]=[];
    branchValue: any;
    branchList:any;
  loginType: any;
  countryId: any;
  brokerbranchCode: any;
  agencyCode: any;
  branchCode: any;
  userType: any;
    startDate: any;
    EndDate:any;
    StartDate:any;
    endDate: any;tiradetails:any[]=[];tiraHeader:any[]=[];
  fileUrl: any;
  maxDate: Date;
  innerdata: any;
  innergrid: any;
  outergrid: any[];
  innerColumnHeader: string[];
  constructor(private datePipe:DatePipe,private router:Router,private sanitizer: DomSanitizer,private sharedService:SharedService,private modalService: NgbModal) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.loginType = this.userDetails.Result.LoginType;
    var d= new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.StartDate = new Date(year,month-11, day);
    this.EndDate = new Date(year,month, day);
    this.maxDate = d;
}
  ngOnInit(): void {
   //this.getalldetails();
    this.issuerHeader = ['QuoteNo', 'Customer Name' ,'Policy No' , 'Response Status' ,'Response StatusCode' ,
         'Login Id' , 'Branch' ,'Tira RequestId' ,'Tira ResponseId' ,'ReHit', 'View',
      ];
      this.tiraHeader = ['Request Id' ,'Response Id', 'TIRA Code', 'Tracking Id' , 'Hit Count' , 'Status' ,'Entry Date','Method Name','Request',
         'Response','Acknowledge Details'
      ];
      this.innerColumnHeader = [ 'Request Id' ,'Response Id' ,'TIRA Code', 'Tracking Id' ,'Hit Count' ,
        'Status' , 'Entry Date' ,'Method Name' ,'Request', 'Response',
      ];
      this.getalldetails();
  }
  onReqPathDownload(rowData){
    let urlLink = `${this.CommonApiUrl}document/downloadbase64`;
    this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowData.RequestFilePath).subscribe(
      (data: any) => {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href',data?.Result?.ImgUrl);
          link.setAttribute('download','Request');
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
      (err) => { },
    );
    // let  a = document.createElement("a");
    // document.body.appendChild(a);
    // let data  = rowData.RequestFilePath;
    // let file = new Blob(data, {type:'text/plain'});
    //   let fileURL = window.URL.createObjectURL(file);
    //   a.href = fileURL;
    //   a.download = 'log';
    //   a.click();
    //   const data = 'some text';
    // const blob = new Blob([rowData.RequestFilePath], { type: 'application/octet-stream' });

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  onInnerData(rowData){
    this.innerdata=this.innergrid.filter(ele => ele.RequestId == rowData.RequestId && ele.AcknowledgementId== rowData.AcknowledgementId)
    console.log('Inner grid datas',this.innerdata);
    rowData.MotorList=this.innerdata

}
onViews(event){
  this.visible=true;
  this.outergrid=[];this.innergrid=[];
  let ReqObj={
    "QuoteNo":event?.QuoteNo,
  }
  let urlLink = `${this.CommonApiUrl}api/tiraview`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data?.Result){
          this.tiradetails=data?.Result;
          this.outergrid=[];this.innergrid=[];

          for(let i=0;i<=this.tiradetails.length;i++){
               this.innergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/acknowledge')
               this.outergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/request')
          }
       
         
      }
    },
    (err) => { },
  );
}
  onResPathDownload(rowData){
    let urlLink = `${this.CommonApiUrl}document/downloadbase64`;
    this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowData.ResponseFilePath).subscribe(
      (data: any) => {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href',data?.Result?.ImgUrl);
          link.setAttribute('download','Response');
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
      (err) => { },
    );
    
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId) this.getProductList();
        }
  
      },
      (err) => { },
    );
  }
  getBranchList(type){
    if(type=='change'){
        this.branchValue = null;
      }
     
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        // if(!this.branchValue){ this.branchValue = "99999";}
        // else{}
      }
    },
    (err) => { },
  
  );
  }
  getProductList(){

    console.log('KKKKKKKKKKKK',this.insuranceId);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.productList = data.Result;
          this.getBranchList('direct');
        }
      },
      (err) => { },
    );
  
  }
  getalldetails(){
    this.startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
    this.endDate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
    let ReqObj = {
        "ProductId":this.productId,
        "InsuranceId":this.insuranceId,
        "StartDate":this.startDate,
        "EndDate":this.endDate,
        "BranchCode":this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}api/tirasuccess`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.issuerData=data.Result;
        }
      },
      (err) => { },
    
    );
  }
  search(){
    this.EndDate="";
  }
  
  openRejectpopup(modal){
    this.open(modal);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onDownload(type){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href',type);
    link.setAttribute('download','Request');
    document.body.appendChild(link);
    link.click();
    link.remove();
   }
   onHit(event){
    let ReqObj={
      "QuoteNo":event.QuoteNo,
    }
    let urlLink = `${this.CommonApiUrl}payment/pushtira`;
   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
          if(data?.Result?.Response=='Success'){
         this.onViews(event)
          }
      } 
    },
    (err) => { },
    );
  }
}
