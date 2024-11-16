import { OnInit, Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import * as Mydatas from '../../app/app-config.json';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
declare var $:any;

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: ['']
})
export class AppMenuComponent implements OnInit {
    isMenuExpanded = true;

    model: any[] = [];
    productName: string;
    userDetails: any;
    typeValue: string;
    loginId: any;insuranceid:any=null;
    productId: any;loginType:any=null;
    userType: any;productname:any=null;
    customerCode:any=null;customerName:any=null;
    public AppConfig: any = (Mydatas as any).default;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    menuSection: boolean = true;menu:any[]=[];typeList:any[]=[];
    parentSection:boolean = true;submenuList:any[]=[];
    typeName: any;b2cType:any=null;lang:any=null;
    branchValue: any;
    branchList: any[]=[];
    branchName: any;
  RequestReferenceNo: string;
  location: any;
    constructor(public layoutService: LayoutService,private router:Router,private translate:TranslateService,private appComp:AppComponent) { 
        this.productName = sessionStorage.getItem('productName');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.typeValue = sessionStorage.getItem('typeValue');
        this.loginId = this.userDetails.Response.LoginId;
        this.productId = this.userDetails.Response.ProductId;
        this.userType = this.userDetails.Response.UserType;
        this.productname = this.userDetails.Response.ProductName;
        if(this.userDetails.Response.LoginType) this.loginType = this.userDetails.Response.LoginType;
        if(this.userType!='Issuer'){
        this.customerCode = this.userDetails.Response.CustomerCode;
        this.customerName = this.userDetails.Response.UserName;
        }
        let type = sessionStorage.getItem('typeValue');
        if(type) this.typeValue = type;
        //this.insuranceid = this.userDetails.Response.LoginBranchDetails[0].InsuranceId;
        this.appComp.getLanguage().subscribe((res:any)=>{  
          if(res) this.lang=res;
          else this.lang='en';
          this.translate.setDefaultLang(this.lang);
        });
        if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
          else this.lang='en';
          sessionStorage.setItem('language',this.lang)
          this.translate.setDefaultLang(sessionStorage.getItem('language'));}
       // this.getTypeList();
       this.getMenuList('direct');
    }
    getTypeList() {
        let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        if (userDetails) {
          let ReqObj = {
            "InsuranceId": userDetails?.Response?.InsuranceId,
            "LoginId": userDetails?.Response?.LoginId,
            "BranchCode": userDetails?.Response?.BranchCode,
            "UserType": userDetails?.Response?.UserType
          }
          this.layoutService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if (data.Response) {
                this.typeList = data?.Response;
                
                if (this.typeValue == undefined || this.typeValue == 'undefined') {
                  this.typeValue = this.typeList[0].CodeDesc;
                  
                  sessionStorage.setItem('typeValue',this.typeValue);
                  //this.getMenuList();
                }
                let types = this.typeList.filter(ele => ele.CodeDesc == this.typeValue || ele.DisplayName == this.typeValue);
                console.log("Filtered Types",types,this.typeList,this.typeValue)
                if (types){this.finaliseTypeValue(types[0], 'direct');}
              }
            },
            (err: any) => { console.log(err); },
          );
        }
      }
      finaliseTypeValue(types, changeType) {
        
        if(types.CodeDesc!='B2C Broker') this.typeValue = types.CodeDesc;
        this.typeName = types.DisplayName;
        console.log("Setted Type Value", this.typeValue);
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
          this.getMenuList(changeType);
        }
        else {
          sessionStorage.setItem('typeValue', this.typeValue);
          this.getMenuList(changeType);
        }
        if (changeType == 'direct') {
          this.getBranchList();
        }
        else {
          this.router.navigate(['/'])
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
        this.branchList = branchList;
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
        if (this.userType == 'Issuer') {
          this.branchValue = branch.BranchCode;
          this.branchName = branch.BranchName;
          this.onBranchChange(type);
        }
        else {
          this.branchValue = branch.BrokerBranchCode;
          this.branchName = branch.BrokerBranchName;
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
    
          if (type == null){this.router.navigate(['/product']);}
        }
      }
      getMenuList(changeType) {
        // let urlLink = `${this.CommonApiUrl}admin/getmenulist`
        // let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        // let ReqObj = {
        //   "LoginId": this.loginId,
        //   "UserType": this.userType,
        //   "SubUserType": this.typeValue,
        //   "InsuranceId": this.insuranceid,
        //   "ProductId": this.productId
        // }
        // this.layoutService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
        //   (data: any) => {
        //     console.log(data);
        //     if (data.Response) {
        //       if(this.productId=='45'){
        //         if(this.typeValue=='low'){
        //           let obj:any[]=[
        //             {
        //               "link": "/Home/life-risk-details",
        //               "title": "Illustrate",
        //               "icon": "fas fa-clipboard-list",
        //               "id": "331",
        //               "parent": "99999",
        //               "orderby": 2,
        //               "IsDesti": false,
        //               "children": null
        //             }
        //           ];
        //           data.Response= obj.concat(data.Response);
        //         }
        //       }
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
              // this.layoutService.menuList = userDetails.Response.MenuList;
              // // this.layoutService.MenuMasterList = userDetails.Response[2]?.children;
              // if (userDetails) {
              //   userDetails.Response['menuList'] = userDetails.Response.MenuList;
              //   userDetails.Response['MenuMasterList'] = userDetails.Response[2].children;
              //   sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
                this.setMenuSection(userDetails.Response.MenuList);
                
               // this.setMaster(data.Response[2].children)
              // }
            
          
      }
    
      setMenuSection(menuList) {
        this.b2cType =sessionStorage.getItem('b2cType')
        let Pagefrom=  sessionStorage.getItem('Pagefrom');
        if(this.b2cType=='guest'){
        
        }
        else { 
        if (menuList.length != 0) {
          let menus = [], i = 0;
          for (let menu of menuList) {
            let entry: any;
            menu['CodeDesc'] =  menu.title;
            menu['CodeDescLocal'] = menu.titleLocal
            if(this.lang=='en') menu.title=menu.CodeDesc
            else menu.title = menu.CodeDescLocal
            entry = {
              "label": menu.title,
              "icon": 'pi pi-car',
              "routerLink": [menu.link]
            }
            if (menu.children && menu.CodeDesc!='Dashboard' && menu.CodeDesc!='LPO Quote' && menu.CodeDesc!='Overview' && menu.CodeDesc!='Support' && menu.CodeDesc!='Garage' && menu.CodeDesc!='fnol') {
              entry['items'] = [];
              let j = 0;
              for (let child of menu.children) {
                let subEntry = {
                  "label": child.title,
                  "faIcon": child.icon,
                  "link": child.link
                }
                entry.items.push(subEntry);
                j += 1;
                console.log("Entry,", j)
                if (j == menu.children.length) {
                  console.log("Entry in Child", menu)
                  menus.push(entry);
                  i += 1;
                  if (i == menuList.length) {
                    this.model = [
                      {
                          label: 'UI Components',
                          items:menus
                      }
                  ]
                    this.menuSection = true;
                    this.parentSection = true;
                    this.submenuList = [];
                    console.log("Menusaaassss 3", this.menu)
                    console.log("Menusaaassss 2", this.menu)
                  }
                }
              }
            }
            else {
              entry["icon"] = menu.icon;
              if(menu.CodeDesc=='Dashboard' && this.userType!='Admin' ) entry["routerLink"] =  ['/'];
              else if(menu.CodeDesc=='Dashboard' && this.userType=='Admin'){
                entry["routerLink"] =  ['/loginCreation'];
              }
              else if(menu.CodeDesc=='LPO Quote'){
                if(this.userType=='Garage'){
                  entry["routerLink"] =  ['/garage'];
                }
                
                else if(this.userType=='Surveyor'){
                  entry["routerLink"] =  ['/surveyor'];
                }
                
                // else if(this.userType=='Dealer'){
                //   entry["routerLink"] =  ['/garage/dealer'];
                // }
              }
              else if(menu.CodeDesc=='Garage') {
              if(this.userType=='Dealer'){
                    entry["routerLink"] =  ['/dealer'];
                  }
              }
              else if(menu.CodeDesc=='fnol') entry["routerLink"] =  ['/fnol'];
              else if(menu.CodeDesc=='Overview') entry["routerLink"] =  ['/'];
              else if(menu.CodeDesc=='Support') entry['routerLink'] = ['/']
              else entry["routerLink"] =  [menu.link]
              if (this.userType == 'Issuer' && this.typeValue=='high') {
                if(menu.CodeDesc=='Portfolio') entry["routerLink"] =  ['/Home/ApproverPortfolio']
              }
              entry['link'] = menu.link;
              if(this.lang=='en') menu.title=menu.CodeDesc
              else menu.title = menu.CodeDescLocal
              menus.push(entry);
              i += 1;
              if (i == menuList.length) {
                this.menuSection = true;
                this.model= [
                    {
                        label: 'UI Components',
                        items:menus
                    }
                ]
                this.menu = menus;
                this.parentSection = true;
                this.submenuList = [];
                console.log("Menusaaassss", this.menu)
              }
            }
          }
          console.log("Final ", this.menu)
        }
        //this.menu = userDetails?.Response?.menuList;
        //}
        else {
          console.log("Final 2", this.menu)
          this.menuSection = false;
          this.menu = [];
          this.parentSection = true;
          this.submenuList = [];
        }
      }
        //}
        //}
          console.log("Final Menu 2",this.model)
      }
    ngOnInit() {
        // this.model = [
        //     {
        //         label: 'UI Components',
        //         items: [
        //             { label: 'Tira Vehicle Search', icon: 'pi pi-car', routerLink: ['/tira-search'] },
        //             { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        //             { label: 'Customer', icon: 'pi pi-users', routerLink: ['/customer'] },
        //             //{ label: 'Vehicle', icon: 'pi pi-compass', routerLink: ['/vehicle'] },
        //             { label: 'Quotation', icon: 'pi pi-inbox', routerLink: ['/quotation'] },
        //             { label: 'Referral', icon: 'pi pi-user-plus', routerLink: ['/referral'] },
        //             { label: 'Portfolio', icon: 'pi pi-credit-card', routerLink: ['/portfolio'] },
        //             { label: 'Policy', icon: 'pi pi-folder-open', routerLink: ['/policy'] },
        //             { label: 'Report', icon: 'pi pi-eject', routerLink: ['/report'] },
        //             { label: 'Logout', icon: 'pi pi-power-off', routerLink: ['/auth/login'] },
        //         ]
        //     },
        // ];
        console.log("Final Menu",this.model)
    }
    setItemId(rowData){
      console.log(rowData)
      return String(rowData.title).replaceAll(' ','');
    }
}
