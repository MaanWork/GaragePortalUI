export class Product {
	ref: any = null
	ts: number = 0
	data: NonMotorProducts = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new NonMotorProducts(product)
	}
}

export class NonMotorProducts {
    LocationList:any[]= [
        {
            "LocationId": null,
            "LocationName": null,
            "SectionList": [
                {
                    "SectionId": null,
                    "SectionName": null,
                    "IndustryType": null,
                    "RiskId": null,
                    //Bond
                    "BondType": null,
                    "BondYear": null,
                    "BondSuminsured": 0,
                    //ElectronicEquipment
                    "ElecEquipSuminsured": 0,
                    "ContentId": null,
                    "ContentDesc": null,
                    "Description": null,
                    "SerialNo": null,
                    //Money
                    "MoneyAnnualEstimate": '0',
                    "StrongroomSi": '0',
                    "MoneyCollector": '0',
                    "MoneyMajorLoss": '0',
                    "MoneyOutofSafe": '0',
                    "MoneyDirectorResidence": '0',
                    "MoneySafeLimit": '0',
                    "MoneyInSafe": '0',
                    "RegionCode": null,
                    "DistrictCode": null,
                    //Burglary
                    "CoveringDetails": null,
                    "DescriptionOfRisk": null,
                    "FirstLossPercentId": null,
                    //EmployersLiability
                    "OccupationId": null,
                    "TotalNoOfEmployees": null,
                    "EmpLiabilitySi": null,
                    "OtherOccupation": null,
                    //Fidelity
                    "FidEmpSi": null,
                    "FidEmpCount":null,
                    //FireAlliedPerils
                    "SectionDesc": null,
                    "Status": null,
                    "LocationName": null,
                    "BuildingAddress":  null,
                    "IndustryTypeDesc": null,
                    "OccupationDesc": null,
                    'Business_Interruption' : null,
                    'BusinessNameDesc' : null,
                    "BuildingSumInsured":  null,
                    //Machinery
                    
                }
            ]
        }
    ]
    constructor(data?) {
        if(data?.LocationList){
            this.LocationList = data.LocationList
        } 
    }

}