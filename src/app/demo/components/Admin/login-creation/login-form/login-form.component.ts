import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import { FormGroup } from '@angular/forms';
import { SurveyorLogin } from '../../../quotation/quotation-plan/models/GarageLoginCreation/surveyorLogin';
import { ProductData } from './product';
import { GarageLogin } from '../../../quotation/quotation-plan/models/GarageLoginCreation/GarageLogin';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  userType: any='';
  fields: any[]=[];
  userDetails: any;
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
	public form = new FormGroup({}); 
  productItem: any=null;
  userTypeinLink: string;
  insuranceId: any;
  loginId: any;
  agencyCode: any;
  branchCode: any;
  productId: any;
  loginType: any;
  GarageName: any;
  GarageId: any;
  brokerbranchCode: any;
  BranchDropList: any[]=[];
  CityDropList: any[]=[];
  CountryDropList: any[]=[];
  LoginDetails: any;
  editDetails:any;
  constructor(private route1: ActivatedRoute, private sharedService: SharedService,private datePipe: DatePipe,
    private messageService: MessageService, private router: Router, private translate: TranslateService,private appComp:AppComponent,
    private primeNGConfig: PrimeNGConfig) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.editDetails = JSON.parse(sessionStorage.getItem('EditLoginData'));
      this.loginId = this.userDetails.Response.LoginId;
      this.agencyCode = this.userDetails.Response.OaCode;
      this.branchCode = this.userDetails.Response.BranchCode;
      this.productId = this.userDetails.Response.ProductId;
      this.insuranceId = this.userDetails.Response.CompanyId;
      this.loginType = this.userDetails.Response.LoginType;
      this.GarageName = this.userDetails.Response.UserName;
      this.GarageId = this.userDetails.Response.UserName;
      this.userType = this.userDetails.Response.UserType;
      this.brokerbranchCode = this.userDetails.Response.BrokerBranchCode;
      if(this.editDetails){
       
        this.editLoginForm();
      }
    }

  ngOnInit(): void {
    // Get the value of 'UserType' from the route parameters
    this.route1.paramMap.subscribe(params => {
      this.userTypeinLink = params.get('UserType');
    });
    this.setForm(this.userType);
  }

  setForm(rowData){
    let fireData;
    this.productItem = new ProductData()
    fireData = new GarageLogin();
  // if(rowData=='Surveyor'){
  // }
  // else if(rowData=='Dealer'){
  //   fireData = new GarageLogin();
  // }
  // else if(rowData=='Admin'){
  //   fireData = new GarageLogin();
  // }
  // else if(rowData=='Garage'){
  //   fireData = new GarageLogin();
  // }
  this.fields[0] = fireData?.fields?.fieldGroup[0];
  this.getBranchDrop();
  this.getCountrytDrop();
  this.getCityDrop();
  if(this.editDetails){
    let exceptedHooks ={ onInit: (field: FormlyFieldConfig) => {
			field.form.controls['changePassYN'].valueChanges.subscribe(() => {
			  this.changePassword();
			 });
		  }
		}
    let fieldList=this.fields[0].fieldGroup;
    for(let field of fieldList){
      if(field.key=='changePassYN'){
        field.hooks = exceptedHooks;
        field.hide=false;
        field.hideExpression=false;
      }
      if(field.key=='Password' || field.key=='RePassword'){
        field.hide=true;
        field.hideExpression=true;
      }
    }
      
    }
}
changePassword(){
		let fieldList=this.fields[0].fieldGroup;
		for(let field of fieldList){
			if(this.productItem.changePassYN=='Y'){
				if(field.key=='Password' || field.key=='RePassword'){
          field.hide=false;
          field.hideExpression=false;
        }
			} 
			if(this.productItem.changePassYN=='N'){
				if(field.key=='Password' || field.key=='RePassword'){
          field.hide=true;
          field.hideExpression=true;
        }
			}
}
}
createNewLogin(productItem){
  let EffectiveDate,urlLink;
  if (productItem.EffectiveDate != undefined && productItem.EffectiveDate != null && productItem.EffectiveDate != '') {
    if(String(productItem.EffectiveDate).includes('/')){
      EffectiveDate = productItem.EffectiveDate;
    }
    else EffectiveDate = this.datePipe.transform(productItem.EffectiveDate,'dd/MM/yyyy')
  }

  let ReqObj = {
    "Loginname": productItem.UserName,
    "LoginId":  productItem.LoginId,
    "CompanyId":  this.insuranceId,
    "CoreAppCode": productItem.CoreAppCode,
    "Address":  productItem.Address,
    "CityName":  "",
    "Status":  productItem.status,
    "PassWord":  productItem.Password,
    "RePassWord":  productItem.RePassword,
    "BranchCode":  productItem.Branch,
    "Garageaddress": productItem.Address,
    "Statename": "",
    "Contactpersonname":  productItem.ContactPersonName,
    "Mobileno":  productItem.MobileNumber,
    "Emailid":  productItem.EmailId,
    "Effectivedate": EffectiveDate,
    "Remarks":  productItem.Remarks,
    "UserType": this.userTypeinLink,
    "CreatedBy": this.loginId,
    "OaCode": this.productItem.OaCode,
    "EntryDate": "",
    "UpdatedBy": this.loginId,
    "UpdatedDate": "",
    "CompanyName": "",
    "CityCode": productItem.City,
    "StateCode": 0,
    "CountryCode": productItem.Country,
    "Pobox": "",
    "CountryName": "",
    "MobileCode": "",
    "MobileCodeDesc": "",
    "ChangePassYN":this.productItem.changePassYN
  }
   
  if(this.userTypeinLink=='Surveyor'){
      urlLink = `${this.CommonApiUrl}login/create/surveyor`;
  }
  else if(this.userTypeinLink=='Dealer'){
    urlLink = `${this.CommonApiUrl}login/create/dealer`;
  }
  else if(this.userTypeinLink=='Admin'){
    urlLink = `${this.CommonApiUrl}api/create/admin`;
  }
  else if(this.userTypeinLink=='Garage'){
    urlLink = `${this.CommonApiUrl}login/create/garage`;
  }
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				let res: any = data;
				console.log(data);
        if(data.Errors.length==0){
          this.router.navigate(['/loginCreation']);
          sessionStorage.removeItem('EditLoginData')

        }
			},

			(err: any) => { console.log(err); },
		);
}


getBranchDrop() {
  let urlLink = `${this.CommonApiUrl}dropdown/branch/${this.insuranceId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.BranchDropList = data.Result;
        
          // this.getOccupationLists('direct');
        
          let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
          for (let i = 0; i < this.BranchDropList.length; i++) {
            this.BranchDropList[i].label = this.BranchDropList[i]['CodeDesc'];
            this.BranchDropList[i].value = this.BranchDropList[i]['Code'];
            if (i == this.BranchDropList.length - 1) {
              let fieldList=this.fields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='Branch'){
                  field.props.options = defaultRow.concat(this.BranchDropList);
                  
                }
              }

            }
          
        }
        
        
        //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);
        
      }
    },
    (err) => { },
  );
}


getCityDrop() {
  let urlLink = `${this.CommonApiUrl}dropdown/city/${this.insuranceId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.CityDropList = data.Result;
        
          // this.getOccupationLists('direct');
        
          let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
          for (let i = 0; i < this.CityDropList.length; i++) {
            this.CityDropList[i].label = this.CityDropList[i]['CodeDesc'];
            this.CityDropList[i].value = this.CityDropList[i]['Code'];
            if (i == this.CityDropList.length - 1) {
              let fieldList=this.fields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='City'){
                  field.props.options = defaultRow.concat(this.CityDropList);
                  
                }
              }

            }
          
        }
        
        
        //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);
        
      }
    },
    (err) => { },
  );
}


getCountrytDrop() {
  let urlLink = `${this.CommonApiUrl}dropdown/country/${this.insuranceId}`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.CountryDropList = data.Result;
        
          // this.getOccupationLists('direct');
        
          let defaultRow = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---','CodeDescLocal':'--Sélectionner--'}];
          for (let i = 0; i < this.CountryDropList.length; i++) {
            this.CountryDropList[i].label = this.CountryDropList[i]['CodeDesc'];
            this.CountryDropList[i].value = this.CountryDropList[i]['Code'];
            if (i == this.CountryDropList.length - 1) {
              let fieldList=this.fields[0].fieldGroup;
              for(let field of fieldList){
                if(field.key=='Country'){
                  field.props.options = defaultRow.concat(this.CountryDropList);
                  
                }
              }

            }
          
        }
        
        
        //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);
        
      }
    },
    (err) => { },
  );
}

getBack(){
  sessionStorage.removeItem('EditLoginData')
  this.router.navigate(['/loginCreation'])
}


editLoginForm(){
    let regObj={
      "CompanyId":this.editDetails.CompanyId,
      "LoginId":this.editDetails.LoginId
    }
    let urlLink = `${this.CommonApiUrl}login/getLoginDetails`
    this.sharedService.onPostMethodSync(urlLink,regObj).subscribe(
      (data:any) => {
          if(data.Response){
            this.LoginDetails = data.Response;
            this.setValue(this.LoginDetails);
          }
      },
    (err)=>{},
    );
}
setValue(rowData){
  this.form.controls['UserName'].setValue(rowData.Loginname)
  this.form.controls['CoreAppCode'].setValue(rowData.CoreAppCode)
  this.form.controls['MobileNumber'].setValue(rowData.Mobileno)
  this.form.controls['EmailId'].setValue(rowData.Emailid)
  this.form.controls['Address'].setValue(rowData.Address)
  this.form.controls['City'].setValue(String(rowData.CityCode))
  this.form.controls['Country'].setValue(rowData.CountryCode)
  this.form.controls['LoginId'].setValue(rowData.LoginId)
  this.form.controls['Branch'].setValue(rowData.BranchCode)
  this.form.controls['ContactPersonName'].setValue(rowData.Contactpersonname)
  this.form.controls['EffectiveDate'].setValue(rowData.Effectivedate)
  this.form.controls['Remarks'].setValue(rowData.Remarks)
  this.form.controls['status'].setValue(rowData.Status)
  this.productItem.OaCode=rowData.OaCode;
  // this.form.controls['UserName'].setValue(rowData.Loginname)
  // this.form.controls['CoreAppCode'].setValue(rowData.CoreAppCode)

}
}
