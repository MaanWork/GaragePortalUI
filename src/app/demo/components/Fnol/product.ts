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
	policyNo:any=''
	insuredId:any=''
	lossDate:any=''
	intimatedDate:any=''
	policeReportNo:any=''
	lossLocation:any=''
	natureOfLoss:any=''
	atFault:any='N'
	policeStation:any=''
	lossDescription:any=''
	lossTime:any
	insuredName:any=''
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
