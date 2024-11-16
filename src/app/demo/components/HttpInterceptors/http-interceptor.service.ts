
import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';

import { CustomLoadingService } from '../../shared/custom-loading.service';
import Swal from 'sweetalert2';
import { LoggingService } from './logging.service';
import { SharedService } from '../../service/shared.service';
import { AuthService } from '../auth/Auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  public AppConfig: any = (Mydatas as any).default;

  service_count = 0;
  totalRequests = 0;
  completedRequests = 0;
  submitted = false;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userType:any;lang:any=null;
  loginSection:boolean = false;
  branchList:any[]=[];
  invalidIssuer = false;branchValue:any;
  public Proceed =false;
  auth: AuthService;

  constructor(
    public router: Router,
    private _injector: Injector,
    private loader: CustomLoadingService,
    private sharedService:SharedService,private translate: TranslateService
    // private logincomponent:LoginComponent
  ) {
    this.lang =sessionStorage.getItem('language');
    if(this.lang==undefined || this.lang==null) this.lang='fr';
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
    setTimeout(() => {
      this.auth = this._injector.get(AuthService);
    })
    
   }
   ngOnInit(){
    
   }
   get http() {
    return this._injector.get(HttpClient);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if(!sessionStorage.getItem('loadingType')){console.log("Entered");this.loader.show();}
    else this.loader.hide();
    this.totalRequests++;
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("error",this.router.url,req);
          if(this.router.url=='/login' || this.router.url=='/auth/login'){
           this.loginResponse(event.body,req)
          }
          else{
            this.openResponse(event.body,req)
          }

        }
        return event;
      }),
      finalize(() => {
        this.completedRequests++;
        if (this.completedRequests === this.totalRequests) {
          this.loader.hide();
          this.sharedService.clearTimeOut();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }

      }),
      catchError((err) => {
        // this.ls.sendErrorLevelMessage(
        //   'Error Occured on this Api '+this.router.url+'Req '+req,
        //   this,
        //   { error: err.statusText }
        // );
        console.log("Error",err)
        if ([401, 403, 0].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          //alert("logOut");
          let ulList=`<li class="list-group-item">
          <div style="color: darkgreen;">Field<span class="mx-2">:</span>LogOut Happened</div>
           <div style="color: red;">Message<span class="mx-2">:</span>From Another Device</div>
         </li>`
          Swal.fire({
            title: '<strong>Session Error</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
               ${ulList}
           </ul>`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton:false,

           //confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           //confirmButtonText: 'Proceed Login!',
           cancelButtonText: 'Cancel',
         }).then((result) => {
          if (result.isConfirmed) {
            //this.login(req?.body);
            sessionStorage.clear();
            if(this.router.url!='/b2clogin') this.router.navigate(['/auth/login']);
        }
      });

        }
        else if([500].includes(err.status)){
          let ulList=`<li class="list-group-item">
          <div style="color: primary;font-size:10px">Url:&nbsp;<b>${req.url}</b></div>
          <div style="color: red;font-size:12px;"><b>Internal Server Error</b></div>
         </li>`
          Swal.fire({
            title: '<strong>Error</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
               ${ulList}
              </ul>`,
                //showCloseButton: true,
                //focusConfirm: false,
                showCancelButton:false,

              //confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              //confirmButtonText: 'Proceed Login!',
              cancelButtonText: 'Okay!',
            })
        }
        else if([400].includes(err.status)){
          console.log("Request",req.url)
          let ulList=`<li class="list-group-item">
          <div style="color: primary;font-size:10px">Url:&nbsp;<b>${req.url}</b></div>
          <div style="color: red;font-size:12px;"><b>Bad Request Error</b></div>
         </li>`
          Swal.fire({
            title: '<strong>Error</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
               ${ulList}
              </ul>`,
                showCancelButton:false,
              cancelButtonColor: '#d33',
              cancelButtonText: 'Okay!',
            })
        }
      else if (err instanceof HttpErrorResponse) {
          const errorList: any[] = err.error.ErrorMessage;
          if (errorList.length > 0) {

            this.openError(errorList);

          }

        }
        const error = err.error?.message || err.statusText;
        console.error(err);
        //return throwError(err.message);
        return throwError(() => error);

      }),
    );
  }

  loginResponse(res: any,req:any) {

    //  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
    //   const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
    //   let ulList:any='';
    //    let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
    //    console.log("checked entry",entry);

    //    for (let index = 0; index < errorList.length; index++) {
       
    //      const element = errorList[index];
    //      alert(element?.Field)
    //       ulList +=`<li class="list-group-login-field">
    //      <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
    //       <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
    //     </li>`
    //    }
    //   if(entry.length==0){
    //      Swal.fire({
    //       title: '<strong>Form Validation</strong>',
    //       icon: 'info',
    //       html:
    //         `<ul class="list-group errorlist">
    //          ${ulList}
    //       </ul>`,
    //       showCloseButton: true,
    //       focusConfirm: false,
    //       confirmButtonText:
    //         '<i class="fa fa-thumbs-down"></i> Errors!',
    //       confirmButtonAriaLabel: 'Thumbs down, Errors!',
    //     })
    //   }
    //   else {
    //     console.log("entered multiiiiiiiiiiiiiiiiiiii");
    //     Swal.fire({
    //        title: '<strong>Session Error</strong>',
    //        icon: 'info',
    //        html:
    //          `<ul class="list-group errorlist">
    //           ${ulList}
    //       </ul>`,
    //        showCloseButton: true,
    //        focusConfirm: false,
    //        showCancelButton:true,

    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Proceed Login!',
    //       cancelButtonText: 'Cancel',
    //     })
    //     .then((result) => {
    //       if (result.isConfirmed) {
          //  this.logincomponent.login(req?.body);
             // this.login(req?.body); 
            // this.router.navigate(['/branch']);
        }

    //     });

    //   }
    //  }

// }
onBranchProceed(){
  this.Proceed = true;
  if(this.branchValue!='' && this.branchValue!=undefined){
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(this.userType =='Issuer'){
      let branchData:any = this.branchList.find(ele=>ele.BranchCode == this.branchValue);
      userDetails.Result['BrokerBranchCode'] = null;
      userDetails.Result['BranchCode'] = branchData.BranchCode;
      userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
      userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      this.router.navigate(['/product']);
    }
    else{

      let branchData:any = this.branchList.find(ele=>ele.BrokerBranchCode == this.branchValue);
      userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
      userDetails.Result['BranchCode'] = branchData.BranchCode;
      userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
      userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      this.router.navigate(['/product']);
    }

  }
}
// login(req:any)
// {
//   let ReqObj = req;
//   ReqObj['ReLoginKey'] = "Y";
//   const urlLink = `${this.CommonApiUrl}authentication/login`;
//   this.loginService.onPostMethodSync(urlLink,ReqObj).subscribe(
//     (data: any) => {
//       let res:any = data;
//       console.log(data);
//       if (data.Result) {
//         const Token = data?.Result?.Token;
//         this.authService.login(data);
//         this.authService.UserToken(Token);
//         sessionStorage.setItem('Userdetails', JSON.stringify(data));
//         sessionStorage.setItem('UserToken', Token);
//         sessionStorage.setItem('menuSection', 'navMenu');
//         this.userType = data.Result.UserType;
//         if(data.Result.UserType=='Issuer' || data.Result.UserType=='Broker'){
//           let branchList:any[] = data?.Result?.LoginBranchDetails;
//           if(branchList.length!=0 && branchList.length>1){
//             console.log("Entered Branch",branchList)
//             this.router.navigate(['/branch']);
//           }
//           else{
//             this.branchList = branchList;
//             if(this.userType == 'Issuer'){
//               this.branchValue = branchList[0].BranchCode;
//               this.onBranchProceed();
//             }
//             else{
//               this.branchValue = branchList[0].BrokerBranchCode;
//               this.onBranchProceed();
//             }

//           }
//         }
//       }
//       else{
//          if(res.ErrorMessage){
//            console.log("Error Iterate",data.ErrorMessage)
//         }
//       }
//     },

//     (err: any) => { console.log(err); },
//   );
// }




  openResponse(res: any,req:any) {
    console.log(res);
    //console.log(ErrorMessage);
    let loadingType = sessionStorage.getItem('loadingType');
    if (res?.Errors && res?.Errors.length > 0 && loadingType!='motorSearch') {
      const errorList: any[] = res.Errors || res?.Result?.Errors;
      let ulList:any='';

      for (let index = 0; index < errorList.length; index++) {
        const element = errorList[index];
        let field = null,message=null,fieldDesc=null,messageDesc=null,errorCode=null,errorCodeDesc=null;
        if(this.lang=='en'){field='Field',message="Message",errorCode="Error Code",fieldDesc = element?.Field,messageDesc=element?.Message,errorCodeDesc=element?.Code}
        else if(this.lang=='fr'){field='Champ',message="Message",errorCode="Code d'erreur",fieldDesc = element?.FieldLocal,messageDesc=element?.MessageLocal,errorCodeDesc=element?.Code}
        else if(this.lang=='po'){field='Campo',message="Mensagem",fieldDesc = element?.FieldLocal,messageDesc=element?.MessageLocal}
        ulList +=`<li class="list-group-login-field">
        <div style="color: darkgreen;">
           ${field}
        <span class="mx-2">:</span> ${fieldDesc}</div>
         <div style="color: red;">
        ${errorCode}
        <span class="mx-2">:</span>${errorCodeDesc}</div>
        <div style="color: red;">
        ${message}
        <span class="mx-2">:</span>${messageDesc}</div>
      </li>`

      }
      let formValidation = null;
      if(this.lang=='en'){formValidation='Form Validations'}
        else if(this.lang=='fr'){formValidation='Validation du formulaire'}
        else if(this.lang=='po'){formValidation='Validação de formulário'}
      //sssss
      Swal.fire({
        title: `<strong>${formValidation}</strong>`,
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           ${ulList}
        </ul>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-down"></i> Errors!',
        confirmButtonAriaLabel: 'Thumbs down, Errors!',
      })
    }
  }

  openError(res: any) {
    const errorList: any[] = res || [];

    if (errorList.length > 0) {
      console.log(errorList)
      let ulList:any='';
      for (let index = 0; index < errorList.length; index++) {
        const element = errorList[index];
         ulList +=`<li class="list-group-login-field">
         <div style="color: darkgreen;">
         <ng-container *ngIf="this.lang=='en'">Field</ng-container> <ng-container *ngIf="this.lang=='fr'">Champ</ng-container><ng-container *ngIf="this.lang=='po'">Campo</ng-container>
         <span class="mx-2">:</span>
         <ng-container *ngIf="this.lang=='en'"> ${element?.Field}</ng-container>
         <ng-container *ngIf="this.lang!='en'"> ${element?.FieldLocal}</ng-container>
         </div>
         <div style="color: red;">
         <ng-container *ngIf="this.lang=='en'">Message</ng-container> <ng-container *ngIf="this.lang=='fr'">Message</ng-container><ng-container *ngIf="this.lang=='po'">Mensagem</ng-container>
         <span class="mx-2">:</span>
         <ng-container *ngIf="this.lang=='en'">${element?.Message}</ng-container>
         <ng-container *ngIf="this.lang!='en'"> ${element?.MessageLocal}</ng-container>
         </div>
       </li>`

      }
      Swal.fire({
        title: `<strong>
          <ng-container *ngIf="this.lang=='en'">Errors!</ng-container> <ng-container *ngIf="this.lang=='fr'">Erreurs!</ng-container><ng-container *ngIf="this.lang=='po'">Erros!</ng-container>
          </strong>`,
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           ${ulList}
        </ul>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          `<i class="fa fa-thumbs-down"></i> <ng-container *ngIf="this.lang=='en'">Errors!</ng-container> <ng-container *ngIf="this.lang=='fr'">Erreurs!</ng-container><ng-container *ngIf="this.lang=='po'">Erros!</ng-container>`,
        confirmButtonAriaLabel: 'Thumbs down, Errors!',
      })

    }
  }
}
