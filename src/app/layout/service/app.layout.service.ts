import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, map, retry, take, throwError, timer } from 'rxjs';
import { AuthService } from 'src/app/demo/components/auth/Auth/auth.service';
import * as Mydatas from '../../../app/app-config.json';
import { CookieService } from 'ngx-cookie-service';


export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    public Token: any;
    timeoutHandle:any=null;
    redirectSection: boolean = false;
    timeLimit: Subscription; public value: number;
    public AppConfig: any = (Mydatas as any).default;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    public menuList:any[]=[];
    public MenuMasterList:any[]=[];
    config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'saga-orange',
        scale: 12,
    };

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();
    userDetails: any;
    loginId: any;
    constructor( private http: HttpClient,
        private authService: AuthService,
        private cookieService:CookieService,
        private router: Router,){}
    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
        }
        else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }
    getToken() {
        this.authService.isloggedToken.subscribe((event: any) => {
          if (event !== undefined && event !== '' && event != null) {
            this.Token = event;
          } else {
            this.Token = sessionStorage.getItem('UserToken');
          }
        });
        return this.Token;
      }
    
    
    
      async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return await this.http
          .post<any>(UrlLink, ReqObj, { headers: headers })
          .pipe(catchError(this.handleError));
      }
      async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return await this.http
          .get<any>(UrlLink, { headers: headers })
          .pipe(catchError(this.handleError));
      }
    
      onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.http
          .post<any>(UrlLink, ReqObj, { headers: headers })
          .pipe(catchError(this.handleError));
      }
      onPostMethodBearerSync(UrlLink: string, ReqObj: any): Observable<any[]> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.http
          .post<any>(UrlLink, ReqObj, { headers: headers })
          .pipe(retry(1), catchError(this.handleError));
      }
      onGetMethodSync(UrlLink: string): Observable<any[]> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.http
          .get<any>(UrlLink, { headers: headers })
          .pipe(catchError(this.handleError));
      }
      onGetMethodPreexceptionAsync(UrlLink: string): Observable<any[]> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic d2hhdHNhcHBjaGF0YXBpOndoYXRzYXBwY2hhdGFwaUAxMjMj');
        return this.http
          .get<any>(UrlLink, { headers: headers })
          .pipe(retry(1), catchError(this.handleError));
      }
      onPostDocumentMethodSync(UrlLink: string, ReqObj: any,file:File): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('File', file);
        formData.append('Req ', JSON.stringify(ReqObj));
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.http
          .post<any>(UrlLink, formData, { headers: headers })
          .pipe(catchError(this.handleError));
      }
      onPostExcelDocumentMethodSync(UrlLink: string, ReqObj: any,file:File): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('uploadReq', JSON.stringify(ReqObj));
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.http
          .post<any>(UrlLink, formData, { headers: headers })
          .pipe(catchError(this.handleError));
      }
      // onPostExcelDocumentMethodSync(UrlLink: string, ReqObj: any,file:File): Observable<any[]> {
      //   const formData: FormData = new FormData();
      //   formData.append('file', file);
      //   formData.append('uploadReq ', JSON.stringify(ReqObj));
      //   let headers = new HttpHeaders();
      //   headers = headers.append('Authorization', 'Bearer ' + this.getToken());
      //   return this.http
      //     .post<any>(UrlLink, formData, { headers: headers })
      //     .pipe(catchError(this.handleError));
      // }
      // TimeOut Session
      onPostCoverDocumentMethodSync(UrlLink: string, ReqObj: any,file:File): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('uploadReq', JSON.stringify(ReqObj));
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.http
          .post<any>(UrlLink, formData, { headers: headers })
          .pipe(catchError(this.handleError));
      }
      clearTimeOut() {
        console.log('Clear Time Out');
        const redirectStatus = sessionStorage.getItem('redirectStatus');
        console.log('Router url',this.router.url);
        // tslint:disable-next-line: triple-equals
        if ((redirectStatus == undefined && this.router != undefined)) {
          // tslint:disable-next-line: triple-equals
          console.log('Clear Time Out1');
          if (this.router.url != '/' && this.router.url != '/Login/Home' && this.router.url != '/Login/sessionRedirect' && this.router.url != '/Login/Officer' && this.router.url != '/Login/Assessor' && this.router.url != '/Login/Garage' ) {
            window.clearTimeout(this.timeoutHandle);
            console.log('Clear Time Out2');
            this.setTimeOutSection();
          }
        }
        return true;
      }
      setTimeOutSection() {
        this.timeoutHandle = setTimeout(() => this.showAlert(this.redirectSection,this.router),(5 * 60 * 1000));
        //(30 * 1000)
        //this.redirectRouting();
      }
      showAlert(redirectSection, router) {
        const redirectStatus = sessionStorage.getItem('redirectStatus');
        // tslint:disable-next-line: triple-equals
        if ((redirectStatus == undefined && router != undefined)) {
          // tslint:disable-next-line: triple-equals
          if (this.router.url != '/' && this.router.url != '/Login/Home' && this.router.url != '/Login/sessionRedirect' && this.router.url != '/Login/Officer' && this.router.url != '/Login/Assessor' && this.router.url != '/Login/Garage' ) {
    
          sessionStorage.setItem('redirectStatus', 'started');
    
          const startValue: any = 1 * 60 + 5;
    
            this.timeLimit = timer(0, 1000).pipe(
              take(startValue + 1),
              map((value: any) => startValue - value),
            ).subscribe(
              value => this.value = value,
              null,
              () => this.timeLimit = null,
            );
              console.log('Alert Time Out', router, this.redirectSection, this.timeLimit);
              // alert('User Ti');
              // Swal.fire({
              //   title: '<strong> Time Out</strong>',
              //   icon: 'info',
              //   html:
              //     `<ul class="list-group errorlist">
              //      <li>Do You Want to Still Proceed?</li>
              //  </ul>`,
              //   showCloseButton: false,
              //   //focusConfirm: false,
              //   showCancelButton:true,
      
              //  //confirmButtonColor: '#3085d6',
              //  cancelButtonColor: '#d33',
              //  confirmButtonText: 'YES',
              //  cancelButtonText: 'NO',
              // }).then((result) => {
              //   if (result.isConfirmed) {
              //         this.onProceed('Yes')
              //   }
              //   else if(result.isDismissed){
              //     this.onProceed('No')
              //   }
              //   else {
              //     this.redirectRouting();
              //   }
              // })
           
          }
        }
      }
    
      onProceed(type){
         if(type=='Yes'){
          this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
          this.loginId = this.userDetails.Result.LoginId;
        
          let ReqObj={
            "LoginId":this.loginId
          }
          let urlLink = `${this.CommonApiUrl}authentication/tokenregenrate`;
              this.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                    if(data){
                      const Token = data?.Result?.Token;
                      //this.authService.login(data);
                      this.authService.UserToken(Token);
                      sessionStorage.setItem('UserToken',Token);
                      sessionStorage.removeItem('redirectStatus');
                    
                    }
                  },  
                  (err) => { },
                );
         }
         else if(type=='No'){
          sessionStorage.clear();
          this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
          this.router.navigate(['/Login/Home']);
         }
      }
    
      redirectRouting() {
        console.log('Redirect Time Out');
        // tslint:disable-next-line: triple-equals
        if (this.router != undefined) {
          // this.timer = new IdleTimeoutManager({
          //   timeout: 60 * 30,
          //   onExpired: () => {
          //     sessionStorage.clear();
          //     // Swal.close();
          //     this.router.navigate(['./Login/sessionRedirect']);
          //   },
          // });
        }
      }
      // Error handling
      handleError(error: HttpErrorResponse) {
        return throwError(error);
      }
      setMaster(MenuMasterList){
    if(MenuMasterList=="Bank Master") this.router.navigate(['/Admin/bankMaster']);
    if(MenuMasterList=="Country Master ") this.router.navigate(['/Admin/countryMaster']);
    if(MenuMasterList=="Currency Master") this.router.navigate(['/Admin/currencyMaster']);
    if(MenuMasterList=="Exchange Master") this.router.navigate(['/Admin/exchangeMaster']);
    if(MenuMasterList=="Vehicle Usage Master") this.router.navigate(['/Admin/vehicleUsageMaster']);
    if(MenuMasterList=="Exclusion Master ") this.router.navigate(['/Admin/exclusionMaster']);
    if(MenuMasterList=="Motor BodyType Master") this.router.navigate(['/Admin/bodyTypeMaster']);
    if(MenuMasterList=="Occupation Master") this.router.navigate(['/Admin/occupationMaster']);
    if(MenuMasterList=="Warranty Master") this.router.navigate(['/Admin/warrantyMaster']);
    if(MenuMasterList=="Clauses Master") this.router.navigate(['/Admin/clausesMaster']);
    if(MenuMasterList=="Model Master") this.router.navigate(['/Admin/modelMaster']);
    if(MenuMasterList=="Make Master") this.router.navigate(['/Admin/makeMaster']);
    if(MenuMasterList=="DropDown Master") this.router.navigate(['/Admin/dropdownMaster']);
    if(MenuMasterList=="Mail Master") this.router.navigate(['/Admin/mailMaster']);
    if(MenuMasterList=="Color Master") this.router.navigate(['/Admin/colorMaster']);
    if(MenuMasterList=="Industry Master") this.router.navigate(['/Admin/Industry']);
    if(MenuMasterList=="Endorsement Field Master") this.router.navigate(['/Admin/endorsementfieldDetails']);
    if(MenuMasterList=="Country Tax Setup") this.router.navigate(['/Admin/taxMaster']);
    if(MenuMasterList=="Error Module Master ") this.router.navigate(['/Admin/errorMaster']);
    if(MenuMasterList=="Menu Master") this.router.navigate(['/Admin/MenuMaster']);
      //   if (MenuMasterList.length != 0) {
      //     alert();
      //     let masters = [], i = 0;
      //     for (let menu of MenuMasterList) {
      //       let entry: any;
      //       entry = {
      //         "label": menu.title,
      //         "icon": menu.icon,
      //         "routerLink": [menu.link]
      //       }
      //       masters.push(entry);
      //       console.log("mastersmasters",entry)
      //     }
      //     if (i == MenuMasterList.length) {
      //       this.model = [
      //         {
      //             label: 'UI Components',
      //             items:masters
      //         }
      //     ]
      //   }
      // }
    }
}
