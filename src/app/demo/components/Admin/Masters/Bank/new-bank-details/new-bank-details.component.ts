import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { Bank } from './bankModel';
import { ThisReceiver } from '@angular/compiler';
import { SharedService } from 'src/app/shared/shared.service';
import { LazyLoadEvent } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-new-bank-details',
  templateUrl: './new-bank-details.component.html',
  styleUrls: ['./new-bank-details.component.scss']
})
export class NewBankDetailsComponent implements OnInit {
  MenuMasterList: any[]=[];
  public minDate:Date;BranchCodeList:any;
  BankId:any;
  statusValue:any="YES";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;public activeMenu:any='Bank Master';
  insuranceId: string;insuranceName:any;
  productId: string;stateList:any[]=[];
  BranchDetails:any={};
  BankDetails:any={};branchList:any;branchValue:any;userDetails:any;

 constructor(/*private toastrService:NbToastrService*/
    private sharedService: SharedService,private datePipe:DatePipe, private router: Router,private layoutService:LayoutService) {
      this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    const user = this.userDetails?.Result;
     //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    // this.loginId = this.userDetails?.Result?.LoginId;

    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      
      //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    }

    this.BankDetails = new Bank();
  }
  ngOnInit(): void {
    
    console.log("BankCode",this.BankId);
    if(this.BankId!=null && this.BankId!=undefined){

    }
    else{
      this.BankId = null;
      this.BankDetails = new Bank();
      if(this.BankDetails?.Status==null)  this.BankDetails.Status = 'N';
    }
    let Exclucsion:any = JSON.parse(sessionStorage.getItem('BankCode'));
    if(Exclucsion){
      console.log("Sess BankCode Obj",Exclucsion)
      this.BankId = Exclucsion?.BankCode;
      this.insuranceId = Exclucsion?.CompanyId;
      this.branchValue = Exclucsion?.BranchCode;
      //this.getEditBankDetails();
    }
   this.getBranchList();
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(this.BankId)  this.getEditBankDetails();
        else this.BankId = null;
      }
    },
    (err) => { },
  );
}
getEditBankDetails(){
  let ReqObj =  {
    "BankCode": this.BankId,
    "InsuranceId":this.insuranceId,
    "BranchCode":this.branchValue
}
  let urlLink = `${this.CommonApiUrl}master/getbybankid`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    let res:any = data;
    if(res.Result){
      this.BankDetails = res.Result;
      if(this.BankDetails){
        // if(this.BankDetails?.EffectiveDateStart!=null){
        //   this.BankDetails.EffectiveDateStart = this.onDateFormatInEdit(this.BankDetails?.EffectiveDateStart)
        // }
        // if(this.BankDetails?.EffectiveDateEnd!=null){
        //   this.BankDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.BankDetails?.EffectiveDateEnd)
        // }
      }
    }
    console.log("Final Modal Class",this.BankDetails);
  },
  (err) => { },
);

}
  ongetBack(){
    this.router.navigate(['/Admin/bankMaster'])

  }
  onProceed(){
    let startDate;
    if(String(this.BankDetails.EffectiveDateStart).includes('/')) startDate = this.BankDetails.EffectiveDateStart
    else startDate = this.datePipe.transform(this.BankDetails.EffectiveDateStart,'dd/MM/yyyy');
    let ReqObj = {
      "BankCode":this.BankId,
      "BankShortName":this.BankDetails.BankShortName,
      "BankFullName":this.BankDetails.BankFullName,
      "EffectiveDateStart":startDate,
      "Remarks":this.BankDetails.Remarks,
      "CreatedBy":this.loginId,
      "InsuranceId":this.insuranceId,
      "CoreAppCode":this.BankDetails.CoreAppCode,
      "RegulatoryCode":this.BankDetails.RegulatoryCode,
      "Status":this.BankDetails.Status,
      "BranchCode": this.BankDetails.BranchCode,
      "CodeDescLocal": this.BankDetails.CodeDescLocal,

    }
    let urlLink = `${this.CommonApiUrl}master/insertbank`;
  // if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
  //   ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
  // }
  // else{
  //   ReqObj['EffectiveDateStart'] = "";
  // }
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
         
                  this.router.navigate(['/Admin/bankMaster'])
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              for(let entry of res.ErrorMessage){
                
              }
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );

  }

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }
  getMenu(rowData){
    this.layoutService.setMaster(rowData);
 }
}
