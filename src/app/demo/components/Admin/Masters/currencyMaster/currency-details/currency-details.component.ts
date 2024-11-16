import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
export class currency{
  "CurrencyId":null;
"CurrencyName":null;
  "CurrencyShortCode":null;
"Remarks":null;
"ShortName":null;
"Rfactor":null;
"SubCurrency":null;
"ExMinlmt":null;
"ExMaxlmt":null;
"MinDiscount": null;
"MaxLoading": null;
"Status":"Y";
"EffectiveDateStart":any;
"EffectiveDateEnd":any;
"CoreAppCode":null;
"DecimalDigit":null;
}
@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; 
  activeMenu:any;statusValue:any="YES";minDate:any=null;
  insuranceName:any=null;productId:any=null;
  loginId: any=null;CurrencyId:any=null;
  CurrencyDetails: any=null;insuranceId:any=null;
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe, private router: Router) {
      this.activeMenu="Currency";
      this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.CurrencyDetails = new currency();
    this.CurrencyId = sessionStorage.getItem('editCurrencyId');
    console.log(this.CurrencyId);
    this.insuranceId=sessionStorage.getItem('Insuranceid');
  }

  ngOnInit(): void {
    if(this.CurrencyId){
      this.getEditCurrencyDetails();
    }
  }
  ongetBack(){
    this.router.navigate(['/Admin/currencyMaster'])
  }
  onProceed(){
    this.router.navigate(['/Admin/countryMaster/currencyList'])
  }
  onRedirect(value){
    if(value == 'State'){
      this.router.navigate(['/Admin/countryMaster/stateList']);
    }
    else if(value == 'City'){
      this.router.navigate(['/Admin/countryMaster/cityList']);
    }
    else if(value == 'Country'){
      this.router.navigate(['/Admin/countryMaster/newCountryDetails']);
    }
    else if(value == 'Currency'){
      this.router.navigate(['/Admin/currencyMaster']);
    }
    else if(value == 'Region'){
      this.router.navigate(['/Admin/countryMaster/regionList']);
    }
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }

  getEditCurrencyDetails(){
    let ReqObj =  {
      "CurrencyId":this.CurrencyId,
      "InsuranceId": this.insuranceId
  }
    let urlLink = `${this.CommonApiUrl}master/getbycurrencyid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.CurrencyDetails = res.Result;
        // if(this.CurrencyDetails){
        //   if(this.CurrencyDetails?.EffectiveDateStart!=null){
        //     this.CurrencyDetails.EffectiveDateStart = this.onDateFormatInEdit(this.CurrencyDetails?.EffectiveDateStart)
        //   }
        //   if(this.CurrencyDetails?.EffectiveDateEnd!=null){
        //     this.CurrencyDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.CurrencyDetails?.EffectiveDateEnd)
        //   }
        // }
      }
      console.log("Final Modal Class",this.CurrencyDetails);
    },
    (err) => { },
  );
}
onSaveCurrency(){
  let startDate;
    if(String(this.CurrencyDetails.EffectiveDateStart).includes('/')) startDate = this.CurrencyDetails.EffectiveDateStart
    else startDate = this.datePipe.transform(this.CurrencyDetails.EffectiveDateStart,'dd/MM/yyyy');
  let ReqObj = {
    "CurrencyId":this.CurrencyId,
  "CurrencyName": this.CurrencyDetails.CurrencyName,
  "CurrencyShortCode": this.CurrencyDetails.CurrencyShortCode,
  "ShortName":this.CurrencyDetails.ShortName,
  "Rfactor": this.CurrencyDetails.Rfactor,
  "Remarks": this.CurrencyDetails.Remarks,
  "SubCurrency":this.CurrencyDetails.SubCurrency,
  "RegulatoryCode":this.CurrencyDetails.RegulatoryCode,
  "ExMinlmt": this.CurrencyDetails.ExMinlmt,
    "ExMaxlmt": this.CurrencyDetails.ExMaxlmt,
    "MinDiscount": this.CurrencyDetails.MinDiscount,
  "MaxLoading": this.CurrencyDetails.MaxLoading,
   "Status": this.CurrencyDetails.Status,
   "InsuranceId": this.insuranceId,
   "DecimalDigit":this.CurrencyDetails.DecimalDigit,
  //"CreatedBy": this.loginId,
  "CoreAppCode":this.CurrencyDetails.CoreAppCode,
  "EffectiveDateStart": startDate,
  "CodeDescLocal":this.CurrencyDetails.CodeDescLocal,


  }
  let urlLink = `${this.CommonApiUrl}master/insertcurrency`;
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
                  this.router.navigate(['/Admin/currencyMaster'])

        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              console.log("Error Iterate",data.ErrorMessage)
              
            }
        }
      },
      (err) => { },
    );
}
}
