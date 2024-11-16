import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; 
  stateValue:any;cityValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;cityList:any;
  currencyData:any[]=[];currencyHeader:any[]=[];
  userDetails: any;
  UserType: any;
  ProductId: any;insuranceList:any[]=[];
  MenuMasterList: any[]=[];
  InsuranceId: any;SubUserType:any=null;
  LoginId: any;loginId:any=null;
  constructor(private router:Router,private sharedService:SharedService,private layoutService:LayoutService ) {
    this.activeMenu = "Currency Master";
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.UserType = userDetails?.Result?.UserType;
      this.SubUserType = userDetails?.Result?.SubUserType;
      this.ProductId = userDetails?.Result?.ProductId;
    }
    this.stateList = [
      { "Code":"01","CodeDesc":"TamilNadu"},
      { "Code":"02","CodeDesc":"Kerala"},
      { "Code":"03","CodeDesc":"Andhra Pradesh"},
    ];
    this.cityList = [
      { "Code":"01","CodeDesc":"Trichy"},
      { "Code":"02","CodeDesc":"Chennai"},
      { "Code":"03","CodeDesc":"Madurai"},
    ];
    this.currencyHeader = ['Currency Name' ,'Currency Code' , ' Local Name ','Effective Date' ,'Status' , 'Action',];
    this.getCompanyList();
   }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          let insurance = sessionStorage.getItem('countryInsurance');
          if(insurance){
            this.InsuranceId = insurance;
            this.getExistingCurrency();
          }
          else{
            this.InsuranceId = this.insuranceList[0].Code
            this.getExistingCurrency();
          }
        }
      });
  }
  // onRedirect(value){
  //   if(value == 'State'){
  //     this.router.navigate(['/Admin/countryMaster/stateList']);
  //   }
  //   else if(value == 'City'){
  //     this.router.navigate(['/Admin/countryMaster/cityList']);
  //   }
  //   else if(value == 'Country'){
  //     this.router.navigate(['/Admin/countryMaster/newCountryDetails']);
  //   }
  //   else if(value == 'Currency'){
  //     this.router.navigate(['/Admin/countryMaster/currencyList']);
  //   }
  //   else if(value == 'Region'){
  //     this.router.navigate(['/Admin/countryMaster/regionList']);
  //   }
  // }
  onEditCurrency(rowdata){
    sessionStorage.setItem('editCurrencyId',rowdata.CurrencyId);
    sessionStorage.setItem('Insuranceid',this.InsuranceId);
    this.router.navigate(['/Admin/currencyMaster/newCurrencyDetails']);
  }
  onAddNew(){
    sessionStorage.removeItem('editCurrencyId');
    sessionStorage.setItem('Insuranceid',this.InsuranceId);
    this.router.navigate(['/Admin/currencyMaster/newCurrencyDetails']);
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/currencyMaster/']);
  }
  EditStatus(event){
    console.log("Status Changed",event)
  }
 getMenu(rowData){
  this.layoutService.setMaster(rowData);
  }
  getExistingCurrency(){
      let ReqObj={
        "InsuranceId": this.InsuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/getallcurrencydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.currencyData = data.Result
        }
      })

  }

}
