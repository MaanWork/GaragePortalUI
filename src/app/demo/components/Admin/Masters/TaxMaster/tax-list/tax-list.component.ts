import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit {

  public activeMenu:any='Country Tax Setup';filterValue:any;@Input() DropdownId  :any;
  insuranceName: string;regionValue:any="";
  dropdownData:any[]=[];dropdownHeader:any[]=[];
  MenuMasterList: any[]=[];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;tableList:any;
  TypeList:any[]=[];TypeValue:any;
  TaxData:any[]=[];
  insuranceList: { Code: string; CodeDesc: string; }[];


  public branchList:any;branchValue:any;BranchCode:any;insuranceId:any;
  userDetails: any;
  loginId: any;

  constructor(private router:Router ,private sharedService:SharedService,private layoutService:LayoutService ) {
    this.insuranceName = sessionStorage.getItem('insuranceName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
    const user = this.userDetails?.Result;
    this.loginId = user?.LoginId;
   }

  ngOnInit(): void {
    sessionStorage.removeItem("ItemId")
    this.dropdownHeader = [
     'Country Id',
    'Tax Name' ,
     'Tax Description' ,
     'Local Name',
     'Effective Date' ,
     'Status' ,
     'Action',
    ];
    this.getCompanyList();

  }
  getMenu(rowData){
    this.layoutService.setMaster(rowData);
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
          let docObj = JSON.parse(sessionStorage.getItem('addDocDetaisObj'));
          console.log('IIIIIIIIIIII',docObj)
          if(docObj){
            this.insuranceId = docObj?.insuranceid;
            this.getList('direct');
         }
          else{
            this.insuranceId='99999';
            this.getList('direct');
          }
          
        }
  
      },
      (err) => { },
    );
  }
  getList(type){
    this.TaxData =[];
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          //let obj = [{Code:"",CodeDesc:""}];
          this.TypeList = data?.Result;
          if(this.TypeList.length!=0){
            this.TypeValue=this.TypeList[0].Code;
            this.getExistingDropdown();
          }
         else{
          this.TypeValue=null;
          
         }
      
        }
      },
      (err) => { },

    );
  
  }

  getExistingDropdown(){
    let ReqObj = {
      "CountryId": this.TypeValue
    }
    let urlLink = `${this.ApiUrl1}master/getallcountrytax`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.TaxData = data?.Result;
            if(this.TypeValue!=undefined && this.TypeValue!=null){
              let docObj = {"ItemType":this.TypeValue,"insuranceid":this.insuranceId};
              sessionStorage.setItem('addDocDetaisObj',JSON.stringify(docObj));
            }
        }
      },
      (err) => { },
    );
  }

  onAddDropdowns(){
      let ReqObj = {
       "CountryId":this.TypeValue,
       "InsuranceId":this.insuranceId,
       "TaxId":null
      }
      sessionStorage.setItem('CountryDetails',JSON.stringify(ReqObj));
    this.router.navigate(['Admin/taxMaster/newtaxlist'])
  }
  onEditDrop(event){
    let ReqObj = {
      "CountryId":event.CountryId,
      "InsuranceId":this.insuranceId,
      "TaxId":event.TaxId
    }
    console.log("Edit Req Obj",event);
    sessionStorage.setItem('CountryDetails',JSON.stringify(ReqObj));
    this.router.navigate(['Admin/taxMaster/newtaxlist'])
  }
  EditStatus(event){
    let ReqObj = {
      "ItemId":event.DropdownId,
      "InsuranceId":"1000002",
      "BranchCode":this.branchValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}api/constanttabledetails/changestatus`;
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
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }

}

