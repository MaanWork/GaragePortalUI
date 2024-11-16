import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';
import { MenuService } from './app.menu.service';
import { LoginService } from '../demo/components/auth/login/login.service';
import * as Mydatas from '../app-config.json';
@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    isMenuExpanded: boolean = false;
    isMenuExpandedStatic: boolean = false;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;
    typeValue:any=null;typeList:any[]=[];typeName:any=null;
    branchList:any[]=[];branchValue:any=null;userDetails:any=null;
    userType:any=null;branchName:any=null;productName:any=null;
    loginId:any=null;productId:any=null;productname:any=null;
    loginType:any=null;customerCode:any=null;customerName:any=null;
  lang: any;
    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private menuService: MenuService,
        private loginService: LoginService) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target) 
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
            this.productName = sessionStorage.getItem('productName');
        if(sessionStorage.getItem('Userdetails')){
          this.productName = sessionStorage.getItem('productName');
          this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
          this.typeValue = sessionStorage.getItem('userType');
          this.lang = sessionStorage.getItem('language');
          this.loginService.typeValue = this.typeValue;
          this.loginId = this.userDetails.Response.LoginId;
          this.productId = this.userDetails.Response.ProductId;
          this.userType = this.userDetails.Response.UserType;
          this.productname = this.userDetails.Response.ProductName;
          if(this.userDetails.Response.LoginType) this.loginType = this.userDetails.Response.LoginType;
          if(this.userType!='Issuer'){
            this.customerCode = this.userDetails.Response.CustomerCode;
            this.customerName = this.userDetails.Response.UserName;
          }
          }
          else this.router.navigate(['/auth/login'])
    //this.getTypeList();
    }
    getTypeList() {
        // let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
         let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        // if (userDetails) {
        //   let ReqObj = {
        //     "InsuranceId": userDetails?.Response?.CompanyId,
        //     "LoginId": userDetails?.Response?.LoginId,
        //     "BranchCode": userDetails?.Response?.BranchCode,
        //     "UserType": userDetails?.Response?.UserType
        //   }
        //   this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
        //     (data: any) => {
        //       console.log(data);
        //       if (data.Response) {
                this.typeList =userDetails?.Response?.UserType
                // if(this.typeList.length!=0){
                //   for(let type of this.typeList){
                //     if(this.lang=='en') type['label']=type.DisplayName;
                //     else type['label']=type.CodeDescLocal;
                //   }
                // }
                // if (this.typeValue == undefined || this.typeValue == 'undefined') {
                //   this.typeValue = this.typeList[0].CodeDesc;
                //   this.loginService.typeValue = this.typeValue;
                //   //this.getMenuList();
                // }
                // let types = this.typeList.filter(ele => ele.CodeDesc == this.typeValue || ele.DisplayName == this.typeValue);
                // console.log("Filtered Types",types,this.typeList,this.typeValue)
                if (this.typeValue) this.finaliseTypeValue(this.typeValue, 'direct');
      }
      onTypeValueChange(value){
        this.typeValue = null;
        if(value){
          let typeValue = sessionStorage.getItem('typeValue')
          let types = this.typeList.find(ele=>ele.CodeDesc==typeValue);
          if(types) this.finaliseTypeValue(types, 'change');
        }
      }
      finaliseTypeValue(types, changeType) {
        if(changeType=='change'){
          
          types = this.typeList.find(ele=>ele.CodeDesc==this.typeValue);
          this.typeValue = sessionStorage.getItem('typeValue')
          // window.location.reload();
           
        }
        else if(types.CodeDesc!='B2C Broker'){ this.typeValue = types.CodeDesc; this.loginService.typeValue = this.typeValue}
        if(this.lang=='en')  this.typeName=types.DisplayName;
            else this.typeName=types.CodeDescLocal;
        if(changeType!='change') this.onTypeChange('direct');
        // $("#subUserTypes").hide();
       
      }
      onTypeChange(changeType) {
        let type = sessionStorage.getItem('typeValue');
        console.log("1", type)
        //this.router.navigate(['/auth/login/product']);
        if (type != undefined) {
          sessionStorage.setItem('typeValue', this.typeValue);
          type = sessionStorage.getItem('typeValue');
          this.typeValue = type;
          console.log("2", type)
          //this.getMenuList(changeType);
        }
        else {
          sessionStorage.setItem('typeValue', this.typeValue);
         
          //this.getMenuList(changeType);
        }
        if (changeType == 'direct') {
          this.getBranchList();
         }
        else {
          
        }
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
            branch['label']=branch['BranchName'];
            i+=1;
            if(i==branchList.length) this.branchList = branchList;
          }
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
          this.branchValue = branch.BranchCode;
          this.branchName = branch.BranchName;
          this.onBranchChange(type);
        }
        else {
          this.branchValue = branch.BrokerBranchCode;
          this.branchName = branch.BranchName;
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
            userDetails.Response['InsuranceId'] = branchData?.CompanyId;
            sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
          }
          else {
            userDetails.Response['BrokerBranchCode'] = this.branchValue;
            let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
            userDetails.Response['BranchCode'] = branchData?.BranchCode;
            userDetails.Response['CurrencyId'] = branchData?.CurrencyId;
            userDetails.Response['InsuranceId'] = branchData?.CompanyId;
            sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
          }
    
          if (type == 'change'){this.router.navigate(['/auth/login/product']);}
        }
      }
    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    expandMenu() {
        if(this.isMenuExpandedStatic == false) {
            this.isMenuExpanded = true;
            this.menuService.expandMenu(this.isMenuExpanded);
        }
    }

    minimizeMenu() {
        if(this.isMenuExpandedStatic == false) {
            this.isMenuExpanded = false;
            this.menuService.expandMenu(this.isMenuExpanded);
        }
    }

    toggleMenuExpandStatic() {
        this.isMenuExpandedStatic = !this.isMenuExpandedStatic;
    }
}
