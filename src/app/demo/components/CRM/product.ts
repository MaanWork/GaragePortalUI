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
	Address2:any=null;
	Address1:any=null;
	ClientCode: any=null;
	State:any=null;
	ClientName: any =null;
	EmailId:any =null;
	CityName:any=null;
	PinCode:any=null;
	MobileNo:any=null;
	GSTNumber:any=null;
	ContactType:any =null;
	ContactPersonName:any=null;
	MobileNumber:any=null;
	PhoneNumber:any=null;
	Designation:any=null;
	Remarks:any=null;
	RSABranch:any=null;
	IntermediaryCode:any=null;
	LeadCreatedOn:any=null;
	IntermediaryName:any=null;
	Channel:any=null;
	ProbabilityOfSuccess:any=null;
	TypeofBusiness:any=null;
	CurrentInsurer:any=null;
	
	constructor(data?) {

	}


  model: any = {
    maxDate: "2019-09-25"
};
}
