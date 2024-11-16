import { Component, OnInit } from '@angular/core';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';



@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  activeMenu:any='Menu Master';insuranceName:any;insuranceId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  MakeData: any[]=[];
  BranchCode: any;
  title:string|any;
  MakeId:any;
  public columnHeader: any[] = [];
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  branchList:any[]=[];
  branchValue: any;
  insuranceList: any[]=[];
  loginId: any;
  MenuList:any[]=[];
  MenuMasterList: any[]=[];
  MenuId: any;InsuranceId:any=null;
  UserType: any;
  companyYn: any=null;

  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService /*, private dialogService: NbDialogService,private toastrService:NbToastrService */)
    {  
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
          const user = this.userDetails?.Result;
          this.loginId = user?.LoginId;
          // if(user.AttachedCompanies){
          //   if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
          // }
      this.getCompanyList();
    }

  ngOnInit(): void {
    let menuObj = JSON.parse(sessionStorage.getItem('MenuId'));
    // if(menuObj){
    //   this.insuranceId = menuObj?.InsuranceId;
    //   this.branchValue = menuObj?.BranchCode;
    // }
    this.columnHeader = [
      //{ key: 'MakeId', display: 'Make Id' },
    'MenuName' ,
     'MenuType' ,
    'DisplayOrder' ,'Local Name',
   'Status' ,
 'Action',
    ];

    

    //this.getExistingColor();
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
            if(insurance == '99999'){
              this.companyYn="N";
              this.getMenuList();
            }
            else{
              this.companyYn="Y";
              this.getMenuList();
            }
          }
          else{
            this.companyYn = "N";
            this.InsuranceId = "99999";
            this.getMenuList();
          }
        }

      },
      (err) => { },
    );
  }
  // onRedirect(value){
  //   if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
  //   if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
  //   if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
  //   if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
  //   if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
  //   if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
  //   if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
  //   if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
  //   if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
  //   if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
  //   if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
  //   if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);
  // }
  getMenuList(){
    let ReqObj = {
      "Limit": "0",
      "Offset": "10000",
      "GetType":"getallmenu",
      "InsuranceId": this.InsuranceId,
      "MenuId":null
    }
    let urlLink = `${this.CommonApiUrl}master/getmenudetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        //console.log(data);
        if(data?.Result){
         // alert();
         // let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
          this.MenuList = data.Result;
          // if(this.insuranceId){this.getBranchList('direct');}
          // else{this.insuranceId='99999';this.getBranchList('direct');}
        }
  
      },
      (err) => { },
    );
  }
  onAddColor(){
    //sessionStorage.removeItem('MakeId');
    let ReqObj = {
      "MenuId":this.MenuId,
      
      // "InsuranceId":this.insuranceId,
      // "BranchCode": this.branchValue,
    }
    sessionStorage.setItem('MenuId', JSON.stringify(ReqObj));

    this.router.navigate(['/Admin/MenuMaster/newMenu'])
  }
  onEditMake(event){

    let ReqObj = {
      "MenuId": event.MenuId,
      //"GetType":"getallmenu",
    }
    sessionStorage.setItem('MenuId', JSON.stringify(ReqObj));
   //sessionStorage.setItem('MakeId',event.MakeId);
   this.router.navigate(['/Admin/MenuMaster/newMenu'])
  }
  EditStatus(event){
    let ReqObj = {
      "MakeId": event.MakeId,
      "Status": event.ChangedStatus,
      "InsuranceId": this.InsuranceId,
      "BranchCode": this.branchValue,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl}master/motormake/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
                window.location.reload()
        }
      },
      (err) => { },
    );
  }

  getBranchList(type){
    if(type=='change'){this.branchValue=null;this.MakeData=[];}
    let ReqObj = {
      "InsuranceId": this.InsuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let docObj = JSON.parse(sessionStorage.getItem('MakeId'));
        if(docObj){
          this.branchValue = docObj?.BranchCode;
        this.getExistingColor() }
        else{
          this.branchValue="99999";
          this.getExistingColor()
        }
        //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
      }
    },
    (err) => { },
  );
  }

  getExistingColor(){
    let ReqObj = {
      "InsuranceId":this.InsuranceId,
      "BranchCode":this.branchValue,
    }
    let urlLink = `${this. CommonApiUrl}master/getallmotormake`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.MakeData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  
getMenu(rowData){
  this.layoutService.setMaster(rowData);
}
}



