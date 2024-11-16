import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { LoginService } from '../demo/components/auth/login/login.service';
import { AuthService } from '../demo/components/auth/Auth/auth.service';
import { SharedService } from '../demo/service/shared.service';
import * as Mydatas from '../app-config.json';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
declare var $:any;
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    branches!: MenuItem[];
    userOptions !: any[];
    selectedOption !: '';
    productName:any=null;userDetails:any=null;
    loginId:any=null;
    productId:any=null;userType:any=null;
    productname:any=null;
    branchName:any=null;
    @Input('typeList') typeList: any[] = [];
    @Input('typeValue') typeValue: any=null;
    @Output('onTypeValueChange') onTypeValueChange = new EventEmitter();
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    branchValue:any=null;branchList:any[]=[];typeName:any=null;
    loginType:any=null;customerCode:any=null;customerName:any=null;
    insuranceid: any;b2cType:any=null;langList:any[]=[];
  lang: string;
    constructor(public layoutService: LayoutService, private router: Router,private loginService: LoginService,private appComp:AppComponent,
        private authService: AuthService,private cookieService: CookieService,private SharedService: SharedService) { 
        this.productName = sessionStorage.getItem('productName');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        console.log("UserDetails",this.userDetails);
        this.loginId = this.userDetails.Response.LoginId;
        this.userType = this.userDetails?.Response?.UserType;
        this.b2cType = sessionStorage.getItem('b2cType');
        let language =  sessionStorage.getItem('language');
        if(language){this.lang=language; this.appComp.setLanguage(language);}
        else{this.lang='en'; this.appComp.setLanguage('en');}
        //if(this.userDetails.Response.LoginBranchDetails.length!=0) this.insuranceid = this.userDetails.Response.LoginBranchDetails[0].InsuranceId;
        
        if(sessionStorage.getItem('Userdetails')){
          this.productName = sessionStorage.getItem('productName');
          this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
          this.typeValue = sessionStorage.getItem('typeValue');
          this.loginId = this.userDetails.Response.LoginId;
          this.productId = this.userDetails.Response.ProductId;
          this.userType = this.userDetails.Response.UserType;
          if(this.SharedService.ProductName) {this.productname = this.SharedService.ProductName;}
          else {
            if(this.lang=='en')  {
              let entry = this.typeList.find(ele=>ele.CodeDesc  = this.typeValue) 
              if(entry=='low'){
                this.typeList['label']='Quotation';
              }
              this.productname=this.userDetails.Response.ProductName;}
            else {
              //this.productname=this.userDetails.Response.BrokerCompanyProducts[0].ProductNameLocal;
            }
          }
          if(this.userDetails.Response.LoginType) this.loginType = this.userDetails.Response.LoginType;
          if(this.userType!='Issuer'){
            this.customerCode = this.userDetails.Response.CustomerCode;
            this.customerName = this.userDetails.Response.UserName;
          }
          }
          else this.router.navigate(['/auth/login'])
        
        
    }

    ngOnInit() {
      //this.getBranchList();
      if(this.insuranceid=='100027'){
        this.langList = [
          {"Code":"en","CodeDesc":"English","CodeDescPor":"Inglês","CodeDescFr":"Anglais"},
          {"Code":"po","CodeDesc":"Portuguese","CodeDescPor":"Português","CodeDescFr":"Portugais"},
        ]
      }
      else{
        this.langList = [
          {"Code":"en","CodeDesc":"English","CodeDescPor":"Inglês","CodeDescFr":"Anglais"},
          {"Code":"fr","CodeDesc":"French","CodeDescPor":"Francês","CodeDescFr":"Français"},
        ]
      }
        this.branches = [{label: 'Branch 1'}, {label: 'Branch 2'}];
        if(this.lang=='en'){
          this.userOptions = [
              {label: 'Logout', value: 'logout', icon: 'pi pi-power-off', command: () => {this.setLogout();}},
          ]
        }
        else if(this.lang=='fr'){
          this.userOptions = [
            {label: 'Se déconnecter', value: 'logout', icon: 'pi pi-power-off', command: () => {this.setLogout();}},
        ]
        }
    }
    
    onProductRedirect(){
      if(this.typeValue=='B2C Broker') this.router.navigate(['/customerProducts']);
      else this.router.navigate(['/auth/login/product']);
    }
    getLangCodeDesc(entry){
      if(this.lang=='en') return entry.CodeDesc
      else if(this.lang=='po') return entry.CodeDescPor
      else if(this.lang=='fr') return entry.CodeDescFr
    }
    getBranchList() {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      let branchList: any[] = userDetails.Response.LoginBranchDetails;
      if (this.userType == 'Issuer') {
        this.branchValue = userDetails?.Response?.BranchCode;
      }
      else {
        this.branchValue = userDetails?.Response?.BrokerBranchCode;
      }
      if(branchList.length!=0){
        let i=0;
        for(let branch of branchList){
           if(this.lang=='en') branch['label']=branch['BranchName'];
            else branch['label']=branch['BrokerBranchNameLocal']
          //branch['label']=branch['BranchName'];
          i+=1;
          if(i==branchList.length) this.branchList = branchList;
        }
        console.log(this.branchList,"this.branchList");
        
      }
      if (this.userType == 'Issuer') {
        let branch = this.branchList.filter(ele => ele.BranchCode == this.branchValue);
        if (branch) this.finaliseBranchValue(branch[0], 'direct');
      }
      else {
        let branch = this.branchList.filter(ele => ele.BrokerBranchCode == this.branchValue);
        if (branch) this.finaliseBranchValue(branch[0], 'direct');
      }
    }
    finaliseBranchValue(branch, type) {
      if(type=='change'){
        branch = this.branchList.find(ele=>ele.BranchName==this.branchName);
      }
      if (this.userType == 'Issuer') {
        this.branchValue = branch?.BranchCode;
        this.branchName = branch?.BranchName;
        this.onBranchChange(type);
      }
      else {
        this.branchValue = branch?.BrokerBranchCode;
        this.branchName = branch?.BranchName;
        this.onBranchChange(type);
      }
    }
    onBranchChange(type) {
      if (this.branchValue != '' && this.branchValue != undefined) {
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        if (this.userType == 'Issuer') {
          userDetails.Response['BranchCode'] = this.branchValue;
          let branchData: any = this.branchList.find(ele => ele.BranchCode == this.branchValue);
          userDetails.Response['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Response['InsuranceId'] = branchData?.InsuranceId;
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        }
        else {
          userDetails.Response['BrokerBranchCode'] = this.branchValue;
          let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
          userDetails.Response['BranchCode'] = branchData?.BranchCode;
          userDetails.Response['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Response['InsuranceId'] = branchData?.InsuranceId;
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        }
  
        if (type == 'change'){this.router.navigate(['/auth/login/product']);}
      }
    }
    finaliseTypeValue(types, changeType) {
      if(types==null) types = this.typeList.find(ele=>ele.CodeDesc  = this.typeValue)  
      else if(types.CodeDesc!='B2C Broker') this.typeValue = types.CodeDesc;
      this.typeName = types.DisplayName;
      // if(this.lang=='en')  this.typeName=types.DisplayName;
      // else this.typeName=types.CodeDescLocal;
      //$("#subUserTypes").hide();
      this.onTypeChange(changeType);
    }
    onTypeChange(changeType) {
      let type = sessionStorage.getItem('typeValue');
      console.log("1", type)
      if (type != undefined) {
        sessionStorage.setItem('typeValue', this.typeValue);
        type = sessionStorage.getItem('typeValue');
        console.log("2", type)
        this.onTypeValueChange.emit('change');
      }
      else {
        sessionStorage.setItem('typeValue', this.typeValue);
        this.onTypeValueChange.emit('change');
      }
      if (changeType == 'direct') {
        this.getBranchList();
      }
      else {
        if(this.typeValue=='high'){
          let url = String(window.location.href).split('#');
          if(url[1]!='/'){sessionStorage.setItem('reloadOnce','true'); this.router.navigate(['/']);}
          else window.location.reload();
        }
        else this.router.navigate(['/auth/login/product']);
        //this.router.navigate(['/auth/login/product']);
      }
    }
    onRedirect(){
      if(this.loginId!='guest'){
        if(this.typeValue=='SuperAdmin'){this.router.navigate(['/'])}
        else{this.router.navigate(['/'])}
      }
      else{
        sessionStorage.clear();
        this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
        window.location.href='https://apps.alliance.co.tz/';
      }
    }
    setLanguage(value){
        this.lang=value;
        sessionStorage.setItem('language',value);
        this.appComp.setLanguage(value);
        window.location.reload();
    }
    showUserDetails(){
      if(this.router.url=='/auth/login/product') return false;
      else return true;
    }
    setLogout(){
            //sessionStorage.clear();
            //this.authService.logout();
      
            //this.router.navigate(['/login']);
            let Req = {
              "LoginId": this.loginId,
              "Token": this.loginService.getToken()
            };
            const urlLink = `${this.CommonApiUrl}login/logout`;
            this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
              (data: any) => {
                let res: any = data;
                console.log(data);
                this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
                  sessionStorage.clear();
                   this.authService.logout();
                   this.router.navigate(['auth/login'])
                  // if(this.typeValue=='b2c' || this.typeValue=='B2C' || this.loginType=='B2CFlow'){
                  //   this.router.navigate(['/b2clogin']);
                  // }
                  // else 
                //
              },
              (err: any) => {
                sessionStorage.clear();
                this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
                  this.authService.logout();
                  this.router.navigate(['/login']);
                // console.log(err);
              },
              );
      
          }
}
