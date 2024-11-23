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
	UserName:any=''
	CoreAppCode:any=''
	TINNumber: any=''
	Address:any=''
	City: string = ''
	MobileNumber:string = ''
	EmailId:any=''
	LoginId:any
	Password:any=''
	RePassword:any=''
	Branch:any =''
	ContactPersonName:any=''
	EffectiveDate:any=''
	Remarks:any=''
	Country:any=''
	status:any='N'
	OaCode:any=''
	changePassYN:any='N'
  /*const currentYear = new Date().getFullYear();
  minDate= new Date(currentYear - 20, 0, 1);*/

	constructor(data?) {

	}


  model: any = {
    maxDate: "2019-09-25"
};
}
