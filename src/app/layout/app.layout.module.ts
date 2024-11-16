import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { SplitButtonModule } from 'primeng/splitbutton';
import { VehicleModule } from '../demo/components/vehicle/vehicle.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { CommonQuoteDetailsModule } from '../demo/components/common-quote-details/common-quote-details.module';
import { ProductComponent } from '../demo/components/auth/login/product/product.component';
import { CustomerModule, HttpLoaderFactory } from '../demo/components/customer/customer.module';
import { QuotationModule } from '../demo/components/quotation/quotation.module';
import { PolicyModule } from '../demo/components/policy/policy.module';
import { TiraSearchModule } from '../demo/components/tira-search/tira-search.module';
import { SharedModule } from '../demo/shared/component/shared.module';
import { ReferralModule } from '../demo/components/referral/referral.module';
import { PortfolioModule } from '../demo/components/portfolio/portfolio.module';
import { ReportModule } from '../demo/components/report/report.module';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { SearchModule } from '../demo/components/Search/search.module';
import { ButtonModule } from 'primeng/button';
import { MaterialModule } from '../material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        ProductComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        SplitButtonModule,
        OverlayPanelModule,
        AvatarModule,
        VehicleModule,
        CommonQuoteDetailsModule,
        PolicyModule,
        TiraSearchModule,
        ReferralModule,
        PortfolioModule,
        ReportModule,
        DropdownModule,
        SearchModule,
        ButtonModule,
        MaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
