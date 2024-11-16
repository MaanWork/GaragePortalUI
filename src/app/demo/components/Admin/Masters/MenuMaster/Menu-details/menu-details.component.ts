import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { MenuDetails } from './menuModel';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuNewDetailsComponent implements OnInit {
  public activeMenu:any='Menu Master' ;@Input() DropdownId  :any;TypeList:any[]=[];
  insuranceName: string;regionValue:any="";
  paramList:any[]=[];paramKeylist:any[]=[];
  statusValue:any="Y";branchList:any;jsonList:any[]=[];
  public AppConfig:any = (Mydatas as any).default;
  "EffectiveDateStart": any;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public branchCode:any;
  public DropDownDetails:any;minDate:any;
  tableList:any;tableNameList:any;KyeNameList:any;
  KeyTableValue:any;KeyNameValue:any;productId:any;
  insuranceId: string;keyTableList:any[]=[];
  MenuMasterList: any[]=[];
  loginId: any;
 value:any;
 editSection:boolean=false;
  branchValue: any;
  ItemCode: any;
  ItemValue: any;
  ItemId: any;
  MenuName: string;
  MenuURL: any;
  MenuType: any;
  Status: any;
  MenuIcon: any;
  MenuDetails: any;
  MenuLogo: any;
  MenuId: any;
  userTypeList:any;
  editValue: boolean = false;
option: "Parent";
visible: boolean = false;
  ParentmenuList: any;
  typeValue: any;
  MenuTypeList: { Code: string; CodeDesc: string; }[];
  optionValue: any;
  type: string;

  constructor(private router:Router,private sharedService:SharedService ,private datePipe:DatePipe,private layoutService:LayoutService )
   {
    this.minDate = new Date();
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.MenuMasterList = userDetails?.Result?.MenuMasterList;
    this.typeValue = userDetails?.Result?.UserType;
    console.log("this.typeValue ",this.typeValue);
    
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.insuranceId = userDetails?.Result?.LoginBranchDetails[0].InsuranceId;
    }
    this.MenuDetails = new MenuDetails();
    //this.DropdownId = sessionStorage.getItem('ItemId');
    // this.DropDownDetails = new Dropdown();

    // this.paramList = [
    //   { "key":"", "ColumnName" : "" }
    // ];
    // this.paramKeylist = [
    //   {"text":"CoverId","value":"01"},
    //   {"text":"SectionId","value":"02"},
    //   {"text":"branchCode","value":"03"},
    //   {"text":"CountryId","value":"04"},
    //   {"text":"CityId","value":"05"},
    //   {"text":"InsuranceId","value":"06"},
    //   {"text":"subUserType","value":"07"},
    // ]
    // this.DropDownDetails = new Dropdown();
   }

  ngOnInit(): void {
    this.userTypeList =[{Code:'', CodeDesc: '--Select--'},
    {Code:'Broker', CodeDesc: 'Broker'},
    {Code:'Issuer', CodeDesc: 'Issuer'},
    {Code:'User', CodeDesc: 'User'},
    {Code:'Super Admin', CodeDesc: 'SuperAdmin'},
    {Code:'Admin', CodeDesc: 'Admin'},
    ]
    this.MenuTypeList =[
      {Code:'', CodeDesc: '--Select--'},
      {Code:'Parent', CodeDesc: 'Parent'},
    {Code:'Child', CodeDesc: 'Child'},
   
    ]
    // if(this.DropdownId!=null && this.DropdownId!=undefined){

    // }
    // else{
    //   this.DropDownDetails = new Dropdown();
    //   if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = 'Y';
    //   if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "N";
    //   this.DropDownDetails.CreatedBy = this.loginId;
    // }

     let MenuId = JSON.parse(sessionStorage.getItem('MenuId'));
    //this.option=this.MenuType?.MenuType;
    // this.typeValue = JSON.parse(sessionStorage.getItem('typeValue'));
    // console.log("this.typeValue",this.typeValue);
    

     this.MenuId = MenuId?.MenuId;
     console.log("this.MenuId", this.MenuId)
    // this.ItemCode=DropDown?.ItemCode;
    // this.insuranceId=DropDown?.InsuranceId;
    // //this.branchValue =  DropDown?.BranchCode;
    // this.ItemValue= DropDown?.ItemType;

    if(this.MenuId){
      this.getEditMenuDetails();
      this.editValue = true;
    }
    else{
      this.MenuId=null;
      this.MenuDetails = new MenuDetails();
      this.editValue = false;
    //   this.DropDownDetails = new Dropdown();
    if(this.MenuDetails.Status==null) this.MenuDetails.Status='N';
    }

    // this.getBranchList();
    // this.jsonList = [
    //   {
    //     "RequestJsonKey":"",
    //     "RequestColumn":"",
    //     "RequestTable": this.DropDownDetails.KeyTable,
    //     "Status":"Y"
    //   }
    // ]
    // this.getList()
    this. menuTypeChange();
  }
  parentMenuDropDown(){
    let ReqObj = {
      "UserType":[this.typeValue],
      "CompanyId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}master/getByUserType`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.ParentmenuList =data?.Result;
        }
      },
      (err) => { },
    );
  }
  menuTypeChange(){
   this.optionValue=this.MenuDetails.MenuType
   console.log("this.option",this.optionValue);
   
    if(this.optionValue=="Child"){
      this.parentMenuDropDown();
      this.visible=true;
     
    }
    else{
      this.visible=false;
    }
  }
saveMenuDetails(){
  let edits:any
  if(this.editValue){
edits='update'
  }
  else{
    edits='insert'
  }
  let startDate;
  if(this.MenuDetails.CompanyId==undefined || this.MenuDetails.CompanyId ==null)this.MenuDetails.CompanyId=this.insuranceId
  else this.MenuDetails.CompanyId;
    if(String(this.MenuDetails.EntryDate).includes('/')) startDate = this.MenuDetails.EntryDate
    else startDate = this.datePipe.transform(this.MenuDetails.EntryDate,'dd/MM/yyyy');
  let RegObj = {
      "MenuName":this.MenuDetails.MenuName,
      "MenuURL":this.MenuDetails.MenuURL,
      "MenuType":this.MenuDetails.MenuType,  
      "ParentMenu":this.MenuDetails.ParentMenu, 
      "CompanyId":this.MenuDetails.CompanyId,
      "ProductId":this.MenuDetails.productId,   
      "Status":this.MenuDetails.Status,
      "UserTypeList": [
        {
          "UserType":this.MenuDetails.UserType,
        },
      ],
      "CreatedBY":this.loginId,
      "MenuLogo":this.MenuDetails.MenuLogo,
      "DisplayOrder":this.MenuDetails.DisplayOrder,
      "EntryDate": startDate,
      "MenuId":null,
      "InsertType":edits, 
      "CodeDescLocal": this.MenuDetails.CodeDescLocal,
  }
  let urlLink = `${this.CommonApiUrl1}master/savemenu`;
  this.sharedService.onPostMethodSync(urlLink, RegObj).subscribe(
    (data: any) => {
      let res:any=data;
      if(data.Result){
        this.router.navigate(['/Admin/MenuMaster']);
      }
      else if(data.ErrorMessage){
        if(res.ErrorMessage){
          
          console.log("Error Iterate",data.ErrorMessage)

        }
    }
    }
  )
}

cancelMenuDetails(){
  this.router.navigate(['/Admin/MenuMaster']);
}
  delete(row:any)
  {
      const index = this.jsonList.indexOf(row);
      this.jsonList.splice(index, 1);
  }
  addItem(row:{RequestTable:any; RequestColumn:any;}){
  //addItem() {
    //var currentElement = this.jsonList[index];
    //this.jsonList.splice(index, 0, currentElement);
     this.jsonList.push(row);
  }
  getMenu(rowData){
    this.layoutService.setMaster(rowData);
 }
    getEditMenuDetails(){
      let ReqObj =  {
        "Limit": "10",
        "Offset": "5",
        "GetType":"getbyid",
        "MenuId":this.MenuId,
        "CompanyId":this.insuranceId
    }
      let urlLink = `${this.CommonApiUrl1}master/getmenudetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log("getEditMenuDetails",data);
        let res:any = data;
        if(res.Result){
          this.MenuDetails = res.Result[0];
          console.log('Menuuu',this.MenuDetails);
          // if(this.MenuDetails){
          //   if(this.MenuDetails?.EffectiveDateStart!=null){
          //     this.MenuDetails.EffectiveDateStart = this.onDateFormatInEdit(this.MenuDetails?.EffectiveDateStart)
          //   }
          //   if(this.MenuDetails?.EffectiveDateEnd!=null){
          //     this.MenuDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.MenuDetails?.EffectiveDateEnd)
          //   }
          // }
        }
        console.log("Final Modal Class",this.MenuDetails);
      },
      (err) => { },
    );

    }
    onDateFormatInEdit(date) {
      console.log(date);
      if (date) {
        // let format = date.split('-');
        // if(format.length >1){
        //   var NewDate = new Date(new Date(format[0], format[1], format[2]));
        //   NewDate.setMonth(NewDate.getMonth() - 1);
        //   return NewDate;
        // }
        // else{
          let  format = date.split('/');
          if(format.length >1){
            //var NewDate = new Date(new Date(format[2], format[1], format[0]));
            //NewDate.setMonth(NewDate.getMonth() - 1);
            let NewDate = format[2]+'-'+format[1]+'-'+format[0];
            return NewDate;
          }
        // }

      }
    }
  // onRedirect(value){
  //   if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
  //   if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
  //   if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
  //   if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
  //   if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
  //   if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
  //   if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  // }

//   onAddCalEntry(){
//     let entry = {
//           "key":"",
//           "ColumnName" : "",
//     };
//     this.paramList.push(entry);
//   }
//   onRemoveIndex(index){
//     this.paramList.splice(index,1);
//   }
//   ongetBack(){
//     this.router.navigate(['/Admin/dropdownMaster'])
//   }
//   onAddRow(){

//   }
//   onProceed(){
// let ItemId
//     if(this.ItemId){
//         ItemId=this.ItemId
//     }
//     else{
//       ItemId=null;
//     }

    /*if(this.ItemValue!=undefined && this.ItemValue!=null && this.ItemValue!=''){
      //let code = this.productItem
      let code = this.TypeList.find(ele=>ele.CodeDesc==this.ItemValue)
      console.log('codes',code)
      this.DropDownDetails.ItemValue=code.Code
      //code.label

      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }*/
  //   let ReqObj = {
  //       "BranchCode": "99999",
  //       "CoreAppCode": this.DropDownDetails.CoreAppCode,
  //       "CreatedBy": this.loginId,
  //       "EffectiveDateStart":this.DropDownDetails.EffectiveDateStart,
  //       "InsuranceId": this.insuranceId,
  //       "ItemCode":this.DropDownDetails.ItemCode,
  //       "ItemId": ItemId,
  //       "ItemType":this.ItemValue,
  //       "ItemValue":this.DropDownDetails.ItemValue,
  //       "RegulatoryCode":this.DropDownDetails.RegulatoryCode,
  //       "Remarks":this.DropDownDetails.Remarks,
  //       "Status":this.DropDownDetails.Status

  //   }
  //   let urlLink = `${this.CommonApiUrl1}master/insertlovdetails`;
  //   if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined)
  //   {
  //     ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
  //   }
  //   else{
  //     ReqObj['EffectiveDateStart'] = "";
  //   }
  // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //   (data: any) => {
  //       console.log(data);
  //       let res:any=data;
  //       if(data.Result){
          // let type: NbComponentStatus = 'success';
          //       const config = {
          //         status: type,
          //         destroyByClick: true,
          //         duration: 4000,
          //         hasIcon: true,
          //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //         preventDuplicates: false,
          //       };
          //       this.toastrService.show(
          //         'Dropdown Details Inserted/Updated Successfully',
          //         'Dropdown Details',
          //         config);

  //                 this.router.navigate(['/Admin/dropdownMaster'])

  //       }
  //       else if(data.ErrorMessage){
  //           if(res.ErrorMessage){
             
  //             console.log("Error Iterate",data.ErrorMessage)
  //            // this.loginService.errorService(data.ErrorMessage);
  //           }
  //       }
  //     },
  //     (err) => { },
  //   );
  // }
  // getList(){
  //   let ReqObj ={
  //     "BranchCode": this.branchValue,
  //     "InsuranceId": this.insuranceId
  //   }
  //   let urlLink = `${this.CommonApiUrl1}master/dropdown/lovlist`;
  // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //   (data: any) => {
  //     if(data.Result){
  //       let obj = [{Code:"99999",CodeDesc:"ALL"}];
  //       this.TypeList = data?.Result;
  //       let docObj = JSON.parse(sessionStorage.getItem('ItemId'))
  //       if(docObj){
  //         this.ItemValue = docObj?.ItemType;


  //      }
  //       else{

  //         this.ItemValue="99999"

  //       }
  //       //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
  //     }
  //   },
  //   (err) => { },
  // );
  // }

  // getTableType(){
  //   let ReqObj ={
  //     "InsuranceId":this.insuranceId,
  //     "BranchCode":"99999"
  //   }
  //   let urlLink = `${this.ApiUrl1}api/dropdown/tabletype`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data:any) => {
  //       if (data.Result){
  //         let obj = [];
  //         this.tableList = obj.concat(data?.Result);

  //       }
  //     },(err)=>{}
  //   );
  // }
  // tableName(){
  //   let Reqobj={
  //     "InsuranceId": this.insuranceId,
  //   }
  //   let urlLink = `${this.CommonApiUrl1}dropdown/mastertable`;
  //   this.sharedService.onPostMethodSync(urlLink,Reqobj).subscribe(
  //     (data:any) => {
  //       if (data.Result){
  //         let obj = [];
  //         this.tableNameList = obj.concat(data?.Result);
  //         this.getKeyTableList();
  //       }
  //     },(err)=>{}
  //   );
  // }
  // getKeyTableList(){
  //   let Reqobj={
  //     "InsuranceId": this.insuranceId,
  //   }
  //   let urlLink = `${this.CommonApiUrl1}dropdown/eservicetable`;
  //   this.sharedService.onPostMethodSync(urlLink,Reqobj).subscribe(
  //     (data:any) => {
  //       if (data.Result){
  //         let obj = [];
  //       this.keyTableList = obj.concat(data?.Result);
  //       let warranty:any = JSON.parse(sessionStorage.getItem('ItemId'));
  //       if(warranty){
  //         console.log("Edit Obj",warranty)
  //         this.DropdownId = warranty?.ItemId;
  //         if(this.DropdownId){
  //           this.getEditMenuDetails();
  //         }
  //         else{
  //           this.DropdownId = null;
  //           // this.DropDownDetails = new Dropdown();
  //           console.log("Dropdwonssssssssss",this.DropDownDetails)
  //           if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = "Y";
  //           if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "Y";
  //         }
  //       }
  //       else{
  //         this.DropdownId = null;
  //           // this.DropDownDetails = new Dropdown();
  //           console.log("Dropdwonssssssssss",this.DropDownDetails)
  //           if(this.DropDownDetails?.Status==null)  this.DropDownDetails.Status = "Y";
  //           if(this.DropDownDetails.RequestYn==null) this.DropDownDetails.RequestYn = "N";
  //         }
  //       }
  //     },(err)=>{}
  //   );
  // }
  // keyTable(){
  //   let Reqobj={
  //     "InsuranceId": this.insuranceId,
  //   }
  //   let urlLink = `${this.CommonApiUrl1}dropdown/eservicetable`;
  //   this.sharedService.onPostMethodSync(urlLink,Reqobj).subscribe(
  //     (data:any) => {
  //       if (data.Result){
  //         let obj = [];
  //       this.KeyTableValue = obj.concat(data?.Result);

  //       }
  //     },(err)=>{}
  //   );
  // }
  // keyName(value){
  //   this.DropDownDetails.KeyName = null;
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId,
  //     "BranchCode": this.branchCode,
  //     "TableName": this.DropDownDetails?.KeyTable
  //   }
  //   let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data:any) => {
  //       if (data.Result){
  //         let obj = [];
  //         this.KeyNameValue = obj.concat(data?.Result);
  //         if(value)
  //         {
  //           this.editSection=true;

  //         }

  //       }
  //     },(err)=>{}
  //   );
  // }
}


