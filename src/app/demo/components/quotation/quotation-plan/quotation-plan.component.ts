import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/demo/service/shared.service';

@Component({
  selector: 'app-quotation-plan',
  templateUrl: './quotation-plan.component.html',
})
export class QuotationPlanComponent {

  riskDetails:any[]=[];tabIndex:any=0;productId:any=null;
  vehicleDetailsList:any[]=[];userType:any=null;agencyCode:any=null;branchList:any[]=[];
  currencyCode:any=null;userDetails:any=null;subuserType:any=null;branchCode:any=null;productName:any=null;
  insuranceId:any=null;brokerbranchCode:any=null;loginType:any=null;lang:any=null;
  constructor(private router:Router,private sharedService:SharedService,
    private translate:TranslateService,private appComp:AppComponent
  ){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let loginType = sessionStorage.getItem('resetLoginDetails');
    this.userType = this.userDetails?.Result?.UserType;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.loginType = this.userDetails.Result.LoginType;
    this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));}
  }
  setRiskDetails(riskDetails){
    if(riskDetails.length!=0){
      this.riskDetails=[];let list=[],i=0;
      for(let entry of riskDetails){
        let obj = list.find(ele=>(ele.LocationId==entry.LocationId && this.productId!='5')  || (ele.LocationId==entry.LocationId && ele.SectionId==entry.SectionId && this.productId=='5'));
        if(obj){obj.SectionDetails[0].Covers = obj.SectionDetails[0].Covers.concat(entry.SectionDetails[0].Covers)}
        else{list.push(entry)}
        i+=1;
        if(i==riskDetails.length){ this.riskDetails = list; console.log("FInal Merfe list",list)}
      }      
    }
  }
  onTabClicked(rowData){
    
  }
  getOccupationDesc(rowData){
    console.log("Finally",rowData)
    return rowData?.OccupationTypeDesc
  }
  getCoverNameDesc(rowData){
    if(this.lang=='en') return rowData.CoverName;
    else return rowData.CoverNameLocal;
  }
  checkCovers(sections,type){
    let coverList = sections.Covers;
      let i=0,j=0;
      for(let cover of coverList){
        if(cover.isSelected=='Y' && type=='opted') i+=1;
        else if(cover.isSelected=='D' && cover.CoverageType!='A' && type=='default') i+=1;
        else if(cover.isSelected=='D' && cover.CoverageType=='A' && type=='benefit') i+=1;
        else if(cover.SubCovers){
          if(cover.SubCovers.some(ele=>ele.isSelected=='Y' && type=='opted')) i+=1;
        }
        j+=1;
        if(j==coverList.length){
          return i!=0;
        }
      }
  }
  checkCovers2(sections,type){
    if(this.productId=='59'){
      let i=0,k=0;
      for(let veh of this.riskDetails){
        for(let sec of veh.SectionDetails){
            let j=0,l=0;
            for(let cover of sec.Covers){
              if(cover.isSelected=='D' && cover.CoverageType!='A' && type=='default') i+=1;
              else if(cover.isSelected=='D' && cover.CoverageType=='A' && type=='benefit') i+=1;
              j+=1;
              if(j==sec.Covers.length){
                l+=1;
                if(l==veh.SectionDetails.length){
                  k+=1;
                  if(k==this.riskDetails.length) return i!=0;
                }
              }
            }
        }
      }
    }
    else return true;
  }
  getHeaderName(menu){
    if(this.productId=='5'){
      let name = menu.Registrationnumber;
      if(menu.SectionName!=null){
        name = name+` (${menu.SectionName})`
      }
      else name = name+`(null)`
      return name;
    }
    else if(this.productId=='4'){
      return menu.PassengerName;
      // if(menu.TravelId=='1') return `Kids (${menu.TotalPassengers})`;
      // if(menu.TravelId=='2') return `Adults (${menu.TotalPassengers})`;
      // if(menu.TravelId=='59') return `Seniors (${menu.TotalPassengers})`;
      // if(menu.TravelId=='4') return `Super Seniors (${menu.TotalPassengers})`;
      // if(menu.TravelId=='5') return `Grand Seniors (${menu.TotalPassengers})`;
    }
    else if(this.productId=='59' || this.productId=='1' || this.productId=='19' || this.productId=='14' || this.productId=='32' || this.productId=='25' || this.productId=='61') return menu.LocationName;
    else return this.productName;
  }
  checkCoverSelected(cover){
    if((cover.isSelected=='Y' && cover.CoverageType!='A')) return true;
    else if(cover.SubCovers){
      if(cover.SubCovers.some(ele=>ele.isSelected=='Y')) return true;
      else return false;
    }
    else return false;
  }
  getPremiumIncTax(cover){
    if(cover.PremiumIncludedTax) return cover.PremiumIncludedTax;
    else if(cover.SubCovers){
      for(let sub of cover.SubCovers){
        if(sub.isSelected=='Y') return sub.PremiumIncludedTax;
      }
    }
    else return '';
  }
  getSubCoverName(cover){
    if(cover.SubCovers){
        for(let sub of cover.SubCovers){
          if(sub.isSelected=='Y') return sub.SubCoverName;
        }  
    }
  }
  checkSubCoverName(cover){
    if(cover.SubCovers){
      let i =0,j=0;
      for(let sub of cover.SubCovers){
          if(sub.isSelected=='Y') i+=1;
          j+=1;
          if(j==cover.SubCovers.length){
            return i!=0;
          }
      }
    }
  }
}
