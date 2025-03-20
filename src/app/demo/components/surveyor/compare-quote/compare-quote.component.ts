import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-compare-quote',
  templateUrl: './compare-quote.component.html',
  styleUrls: ['./compare-quote.component.scss']
})


export class CompareQuoteComponent {
  ClaimNo: string;
  vehicles: any[]=[];
  selectedVehicles: any[];
  selectedGarage: boolean=false;
  selectedQuote:any;
  CompareDetailsList: any[]=[];
  
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  constructor(private route1: ActivatedRoute,private cdr: ChangeDetectorRef,private messageService: MessageService,private router:Router,private sharedService: SharedService,private appComp:AppComponent,private translate:TranslateService) {
 }

  ngOnInit(): void {
    // Retrieve the 'id' parameter from the route
    this.ClaimNo = this.route1.snapshot.paramMap.get('ClaimNo')!;
    // If you want to handle the case where the parameter changes, use:
     this.route1.paramMap.subscribe(params => { this.ClaimNo = params.get('ClaimNo'); });

    //  this.vehicles = [
    //   {
    //     make: 'Toyota',
    //     model: 'Corolla',
    //     price: 20000,
    //     engine: '1.8L 4-Cylinder',
    //     mileage: '30 MPG',
    //     features: ['Bluetooth', 'Backup Camera', 'LED headlights']
    //   },
    //   {
    //     make: 'Honda',
    //     model: 'Civic',
    //     price: 22000,
    //     engine: '2.0L 4-Cylinder',
    //     mileage: '32 MPG',
    //     features: ['Bluetooth', 'Sunroof', 'Lane Assist']
    //   },
    //   {
    //     make: 'Ford',
    //     model: 'Focus',
    //     price: 19000,
    //     engine: '2.0L 4-Cylinder',
    //     mileage: '28 MPG',
    //     features: ['Bluetooth', 'Heated Seats', 'Remote Start']
    //   }
    // ];
    this.getCompareDetails()

    this.selectedVehicles = [];
  
  }


  addToComparison(vehicle) {
    if (!this.selectedVehicles.includes(vehicle)) {
      this.selectedVehicles.push(vehicle);
    }
  }

  removeFromComparison(vehicle) {
    const index = this.selectedVehicles.indexOf(vehicle);
    if (index > -1) {
      this.selectedVehicles.splice(index, 1);
    }
  }
  getComparisonRows() {
    // List of comparison features
    return [
        { "name": "Claim Number", "values": "ClaimNo" },
        { "name": "Quotation Number", "values": "QuotationNo" },
        { "name": "Spareparts Dealer ID", "values": "SparepartsDealerId" },
        { "name": "Garage Name", "values": "GarageName" },
        { "name": "Replacement Cost", "values": "ReplacementCost" },
        { "name": "Total Amount Replacement", "values": "TotalAmountReplacement" },
        { "name": "Repair Labour", "values": "RepairLabour" },
        { "name": "Total Amount Repair Labour", "values": "TotalAmountRepairLabour" },
        { "name": "Net Amount", "values": "NetAmount" },
        { "name": "Unknown Accident Deduction", "values": "UnknownAccidentDeduction" },
        { "name": "Amount to be Recovered", "values": "AmountToBeRecovered" },
        { "name": "Total After Deductions", "values": "TotalAfterDeductions" },
        { "name": "VAT Rate", "values": "VatRate" },
        { "name": "VAT Amount", "values": "VatAmount" },
        { "name": "Total with VAT", "values": "TotalWithVAT" },
        // { "name": "Salvage Deduction", "values": "SalvageDeduction" },
        { "name": "Work Order No", "values": "WorkOrderNo" },
        { "name": "Work Order Date", "values": "WorkOrderDate" },
        { "name": "Settlement To", "values": "SettlementTo" },
        { "name": "Location", "values": "Location" },
        { "name": "Delivery Date", "values": "DeliveryDate" },
      ]
      
  
    
  }

  getCompareDetails(){
     let ReqObj = {
       "ClaimNo": this.ClaimNo,
     }
     let urlLink = `${this.CommonApiUrl}workOrder/surveyor/getAllQuote`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Response){
              this.vehicles = data.Response;
          }
        },
        (err) => { },
      );
  }

  saveSelected(rowData){
          Swal.fire({
            title: `<strong> &nbsp;${rowData.GarageName}</strong>`,
            iconHtml: '<i class="fa-solid fa-check-circle fa-fade"></i>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              Do you Want to add this garage?
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: `No`,
            confirmButtonText: `Yes`,
          })
            .then((result) => {
              if (result.isConfirmed) {
                this.proceedGarage(rowData);
              }
            });
  }
  proceedGarage(rowData){
    let ReqObj = {
      "ClaimNo": rowData.ClaimNo,
      "QuotationNo":rowData.QuotationNo,
      "GarageLoginId":rowData.GarageId
    }
    let urlLink = `${this.CommonApiUrl}workOrder/surveyor/quoteSave`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         console.log(data);
         if(data.Message=="Success"){
          this.router.navigate(['/surveyor'])
         }
       },
       (err) => { },
     );
  }
}
