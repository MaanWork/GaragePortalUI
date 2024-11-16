import { DatePipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
@Component({
  selector: 'app-re-insurance',
  templateUrl: './re-insurance.component.html',
  styleUrls: ['./re-insurance.component.scss']
})
export class ReInsuranceComponent implements OnInit{
  
  columnHeader: any[];  columnHeader1: any[];  columnHeader2: any[];  columnHeader3: any[];
  visible1:boolean=false;  visible2:boolean=false;  visible3:boolean=false;  visible4:boolean=false;  insuranceName: string;
  insuranceId: string;  activeMenu: string;  userDetails: any;  UserType: any;  ProductId: any;  MenuMasterList: any;
  loginId: any;  CommonApiUrl1: any;  branchList:any[]=[];  branchValue: any;  treatyTypeMasterList: any[]=[];
  TreatyName: any;  TreatyNumber: any;  EffectiveStartDate: any;  Status: any;  TreatyEditSection: boolean=false;
  LayerNo: any;  TreatyTypeDesc:any[]=[]; treatyMasterList: any[]=[];  AmendId: any;  Cover: any;EffectiveEndDate:any;
  EffectiveDate: any;  EndDate: any; LeadershipYn: any;  NumberOfLines: any;  OverallLimit: any;  Product: any; 
  Section: any;  StartDate: any;  TreatyCode: any;  TreatyPercentage: any;  TreatyType: any;  Year: any;  RetentionPercentage: any; 
  Sno: any;  public AppConfig: any = (Mydatas as any).default;public ReInsurance: any = this.AppConfig.ReInsurance;
  treatyTypeList: any[]=[];  treatyTypeDescList:any[]=[];  treatyNumberList: any[]=[];  treatyNameList: any[]=[];
  layerNoList: any[]=[];ReinsuranceCompanyName:any;CompanyShortCode:any;Address1:any;Address2:any;City:any;
  Country:any;PhoneNo:any;Remarks:any;ReinsuranceCompanyId:any;
  RCMList: any[]=[];
  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.activeMenu="Bank Master";
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.ProductId = this.userDetails?.Result?.ProductId;
      //this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
     // console.log(this.userDetails?.Result?.MenuMasterList);
      
    //  console.log("MMListMMListMMList",this.MMList)
      this.loginId = user?.LoginId;
      if(user.AttachedCompanies){
        if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
      }
      //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     }
  ngOnInit(): void {
    this.columnHeader=[
      'Treaty Name','Treaty Number','Treaty Type','Start Date','Status','Action'
    ]
    this.columnHeader1=[
      'Treaty Code','Year','Product','Section','Cover','Treaty Percentage','Retention Percentage','Action'
    ]
    this.columnHeader2=[
      'Reinsurance Company Id','Company Short Code','Address1','Address2','City','Country','Phone No','Product Name','Action'
    ]
    this.columnHeader3=[
      'Retention Percentage','Commission Percentage','Amend Id','Effective Date','Start Date','End Date','Status','Action'
    ]
   this.getAllRCM();
    this.getTreatyTypeMaster();
    this.getTreatyTypeList();
    this.getTreatyNameList();
    this.getTreatyNumberList();
    this.getTreatyTypeDescList();
    this.getAllTreatyType();
    this.getLayerNoList();
  }
  openPopup(type){
    if(type=='TTM'){
      this.reset();
      this.visible1=true;
    }
    else if(type=='TM'){
      this.reset();
      this.visible2=true;
     
    }
    else if(type=='RCM'){
      this.visible3=true;
    }
    else if(type=='RM'){
      this.visible4=true;
    }
  }
//TTM
   getTreatyTypeMaster(){
   
      let urlLink = `${this.ReInsurance}api/treatyTypeMasters`;
    ( this.sharedService.onGetMethodWithOutAuth(urlLink)).subscribe(
      (data: any) => {
        console.log(data,"datatadata");
        
        if(data){
          this.treatyTypeMasterList = data;
         
        }
      },
      (err) => { },
    
    );
    }
    
  
    CommonTTM(){
      let sno;
      if(this.TreatyEditSection){
        sno =this.Sno;
        this.editsaveTreatyTypeMaster();
       }
       else{
        this.saveTreatyTypeMaster();
       }
    }
    editsaveTreatyTypeMaster(){
      let startDate,endDate;
      if(String(this.EffectiveStartDate).includes('/')) startDate = this.EffectiveStartDate
      else startDate = this.datePipe.transform(this.EffectiveStartDate,'dd/MM/yyyy');
      if(String(this.EffectiveEndDate).includes('/')) endDate = this.EffectiveEndDate
      else endDate = this.datePipe.transform(this.EffectiveEndDate,'dd/MM/yyyy');
      let ReqObj ={
        "sno": this.Sno,
        "treatyNumber": this.TreatyNumber,
        "treatyName": this.TreatyName,
        "layerNo": this.LayerNo,
        "treatyType": this.TreatyType,
        "treatyTypeDesc":  this.TreatyTypeDesc,
        "amendId": 0,
        "effectiveStartDate": startDate,
        "effectiveEndDate": endDate,
        "status": this.Status
      }
        let urlLink = `${this.ReInsurance}api/treatyTypeMasters/${this.Sno}`;
      this.sharedService.onPutMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data){
            this.visible1=false;
            this.TreatyEditSection=false;
            this.getTreatyTypeMaster();
            this.reset();
          }
        },
        (err) => { },
      
      );
    }
    saveTreatyTypeMaster(){
      let startDate,endDate;
      if(String(this.EffectiveStartDate).includes('/')) startDate = this.EffectiveStartDate
      else startDate = this.datePipe.transform(this.EffectiveStartDate,'dd/MM/yyyy');
      if(String(this.EffectiveEndDate).includes('/')) endDate = this.EffectiveEndDate
      else endDate = this.datePipe.transform(this.EffectiveEndDate,'dd/MM/yyyy');
      let ReqObj ={
        "sno": this.treatyTypeMasterList.length+1,
        "treatyNumber": this.TreatyNumber,
        "treatyName": this.TreatyName,
        "layerNo": this.LayerNo,
        "treatyType": this.TreatyType,
        "treatyTypeDesc": this.TreatyTypeDesc,
        "amendId": 0,
        "effectiveStartDate":startDate,
        "effectiveEndDate": endDate,
        "status": this.Status
      }
        let urlLink = `${this.ReInsurance}api/treatyTypeMasters`;
      this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data){
            this.visible1=false;
            this.getTreatyTypeMaster();
            this.reset();
          }
        },
        (err) => { },
      
      );
    }
    treatyTypeMasterEdit(rowData,index){
      this.TreatyEditSection=true;
      this.visible1=true;
        let urlLink = `${this.ReInsurance}api/treatyTypeMasters/${rowData.sno}`;
        this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
        (data: any) => {
           this.TreatyNumber=data.treatyNumber;
           this.TreatyName=data.treatyName;
           let startDate,endDate;
           if(String(data.effectiveStartDate).includes('/')) startDate = data.effectiveStartDate
           else startDate = this.datePipe.transform(data.effectiveStartDate,'dd/MM/yyyy');
           if(String(data.effectiveEndtDate).includes('/')) endDate = data.effectiveEndtDate
           else endDate = this.datePipe.transform(data.effectiveEndtDate,'dd/MM/yyyy');
          // this.treatyTypeMasterList['EffectiveStartDate']=startDate;
           this.EffectiveStartDate=startDate;
           this.Status=data.status;
           this.LayerNo=data.layerNo;
           this.Sno=data.sno;
           this.TreatyType=data.treatyType;
           this.EffectiveEndDate=endDate;
        },
        (err) => { },
      
      );
    }
   
//TT
commonSaveTM(){
  let layer;
  if(this.TreatyEditSection){
    layer =this.LayerNo;
    this.editTreaty();
   }
   else{
    this.saveTreatyMaster();
   }
}
    getAllTreatyType(){
      let urlLink = `${this.ReInsurance}api/treatyMasters`;
    this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
      (data: any) => {
        if(data){
          this.treatyMasterList = data;
         
        }
      },
      (err) => { },
    
    );
    }
    editTreaty(){
      let startDate,endDate;
      if(String(this.EffectiveStartDate).includes('/')) startDate = this.EffectiveStartDate
      else startDate = this.datePipe.transform(this.EffectiveStartDate,'dd/MM/yyyy');
      if(String(this.EffectiveEndDate).includes('/')) endDate = this.EffectiveEndDate
      else endDate = this.datePipe.transform(this.EffectiveEndDate,'dd/MM/yyyy');
      let ReqObj =
      {
        "sno": this.Sno,
        "treatyCode": this.TreatyCode,
        "year": this.Year,
        "product":  this.Product,
        "section": this.Section,
        "cover": this.Cover,
        "treatyPercentage":this.TreatyPercentage,
        "retentionPercentage": this.RetentionPercentage,
        "overallLimit":this.OverallLimit,
        "numberOfLines":this.NumberOfLines,
        "amendId": 0,
        "effectiveDate": startDate,
        "startDate": startDate,
        "endDate":endDate,
        "status":this.Status,
        "leadershipYn":this.LeadershipYn,
        "treatyNumber": this.TreatyNumber,
        "layerNo": this.LayerNo,
        "treatyName": this.TreatyName,
        "treatyType":this.TreatyType,
        "treatyTypeDesc": this.TreatyTypeDesc,
      }
        let urlLink = `${this.ReInsurance}api/treatyMasters`;
      this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Success=true){
            this.visible2=false;
            this.TreatyEditSection=false;
            this.getAllTreatyType();
          }
        },
        (err) => { },
      
      );
    }
    saveTreatyMaster(){
      // this.treatyTypeMasterList.length+1
      let startDate,endDate;
      if(String(this.EffectiveStartDate).includes('/')) startDate = this.EffectiveStartDate
      else startDate = this.datePipe.transform(this.EffectiveStartDate,'dd/MM/yyyy');
      if(String(this.EffectiveEndDate).includes('/')) endDate = this.EffectiveEndDate
      else endDate = this.datePipe.transform(this.EffectiveEndDate,'dd/MM/yyyy');
      let ReqObj =
      {
        "sno": this.treatyMasterList.length+1,
        "treatyCode": this.TreatyCode,
        "year": this.Year,
        "product":  this.Product,
        "section": this.Section,
        "cover": this.Cover,
        "treatyPercentage":this.TreatyPercentage,
        "retentionPercentage": parseInt(this.RetentionPercentage),
        "overallLimit":this.OverallLimit,
        "numberOfLines":this.NumberOfLines,
        "amendId": 0,
        "effectiveDate": startDate,
        "startDate": startDate,
        "endDate":endDate,
        "status":this.Status,
        "leadershipYn":this.LeadershipYn,
        "treatyNumber": this.TreatyNumber,
        "layerNo":this.LayerNo,
        "treatyName": this.TreatyName,
        "treatyType":this.TreatyType,
        "treatyTypeDesc": this.TreatyTypeDesc,
      }
      
        let urlLink = `${this.ReInsurance}api/treatyMasters`;
      this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Success=true){
            this.visible2=false;
            this.getAllTreatyType();
          }
        },
        (err) => { },
      
      );
    }
 
   
    editTreatyMaster(rowData){
      this.visible2=true;
      this.TreatyEditSection=true;
        let urlLink = `${this.ReInsurance}api/treatyMasters/${rowData.sno}`;
        this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
        (data: any) => {
          if(data){
          this.Sno=data.sno;
          this.AmendId=data.amendId;
          this.Cover=data.cover;
          this.EffectiveDate=data.effectiveDate;
          this.EndDate=data.endDate;
          this.LeadershipYn=data.leadershipYn;
          this.NumberOfLines=data.numberOfLines;
          this.OverallLimit=data.overallLimit;
          this.Product=data.product;
          this.RetentionPercentage=data.retentionPercentage;
          this.Section=data.section;
          this.StartDate=data.startDate;
          this.Status=data.status;
          this.TreatyCode=data.treatyCode;
          this.TreatyName=data.treatyName;
          this.TreatyNumber=data.treatyNumber;
          this.TreatyPercentage=data.treatyPercentage;
          this.TreatyType=data.treatyType;
          this.Year=data.year;
        }
        },
        (err) => { },
      
      );
    }
//RCM
getAllRCM(){
  let urlLink = `${this.ReInsurance}api/reinsuranceMasters`;
this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
  (data: any) => {
    if(data){
      this.RCMList = data;
     
    }
  },
  (err) => { },

);
}



//common
reset(){
  this.TreatyNumber=''
   this.TreatyName=''
  this.LayerNo=''
  this.TreatyType=''
 this.TreatyType=''
 this.EffectiveStartDate=''
 this.Status=''
 this.Cover=''
 this.EffectiveDate=''
 this.EndDate=''
 this.LeadershipYn=''
 this.NumberOfLines=''
 this.OverallLimit=''
 this.Product=''
 this.RetentionPercentage=''
 this.Section=''
 this.StartDate=''
 this.TreatyCode=''
 this.TreatyPercentage=''
 this.Year=''
}
getTreatyTypeList(){
  let urlLink = `${this.ReInsurance}api/treatyMasters/treatyTypeValues`;
    this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
      (data: any) => {
        console.log("treatyTypeList",data);
        if(data){
          this.treatyTypeList = data;
        }
      },
      (err) => { },
    
    );
}
getTreatyNameList(){
  let urlLink = `${this.ReInsurance}api/treatyMasters/treatyNameValues`;
    this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
      (data: any) => {
        console.log("treatyTypeList",data);
        if(data){
          this.treatyNameList = data;
        
        }
      },
      (err) => { },
    
    );
}
getTreatyNumberList(){
  let urlLink = `${this.ReInsurance}api/treatyMasters/treatyNumberValues`;
    this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
      (data: any) => {
        console.log("treatyTypeList",data);
        if(data){
          this.treatyNumberList = data;
         
        }
      },
      (err) => { },
    
    );
}
getTreatyTypeDescList(){
  let urlLink = `${this.ReInsurance}api/treatyMasters/treatyTypeDescValues`;
    this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
      (data: any) => {
        console.log("treatyTypeList",data);
        if(data){
          this.treatyTypeDescList = data;
         
        }
      },
      (err) => { },
    
    );
}
getLayerNoList(){
  let urlLink = `${this.ReInsurance}api/treatyMasters/layerNoValues`;
    this.sharedService.onGetMethodWithOutAuth(urlLink).subscribe(
      (data: any) => {
        console.log("treatyTypeList",data);
        if(data){
          this.layerNoList = data;
        
        }
      },
      (err) => { },
    
    );
}
listDiscType(rowData){
  let entry = this.treatyTypeList.find(ele=>ele.Code==rowData).CodeDesc;
  return entry;
}
listDiscName(rowData){
  let entry = this.treatyNameList.find(ele=>ele.Code==rowData).CodeDesc;
  return entry;
}
listDiscTypeDesc(rowData){
  let entry = this.treatyTypeDescList.find(ele=>ele.Code==rowData).CodeDesc;
  return entry;
}
listDiscNumber(rowData){
  let entry = this.treatyNumberList.find(ele=>ele.Code==rowData).CodeDesc;
  return entry;
}
}
