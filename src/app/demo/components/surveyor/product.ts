export class Product {
	ref: any = null
	ts: number = 0
	data: ProductData = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new ProductData(product)
	}
}

export class ProductData {
	WorkOrderType:any=''
	WorkOrderNumber:any=''
	WorkOrderDate: any=''
	SettlementType:any=''
	Settlement: string = ''
	DefaultGarageName:string = ''
	DefaultGarageCode:any=''
	PrimaryLocation:any
	RepairType:any=''
	GarageName:any
	GarageCode:any =''
	GarageQuotationNumber:any=''
	DeliveryDate:any=''
	Subrogation:any='N'
	JoinOrder:any='N'
	TotalLoss:any=''
	TotalLossType:any=''
	Remarks:any=''
	sparePartsCost:any=0
	sparePartDepreciation:any=0
	discountonSpareParts:any=0
	totalAmountReplacement:any=0
	repairLabour:any=0
	repairLabourDiscountAmount:any=0
	totalAmountRepairLabour:any=0
	replacementCostDeductible:any=0
	repairLabourDeductible:any=0
	AccidentDeduction:any=0
	DeductionTotal:any=0
	VatRate:any=0
	VATRate:any=0
	VATAmount:any=0
	NetAmount:any=0
	AmountRecovered:any=0
	salvageDeduction:any=0
//   MobileCodeDesc:any=''
// 	Occupation:any=''
  /*const currentYear = new Date().getFullYear();
  minDate= new Date(currentYear - 20, 0, 1);*/

	constructor(data?) {

	}


  model: any = {
    maxDate: "2019-09-25"
};
}
