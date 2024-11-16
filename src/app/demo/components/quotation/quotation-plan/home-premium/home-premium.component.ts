import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-premium',
  templateUrl: './home-premium.component.html',
  styleUrls: ['./home-premium.component.scss']
})
export class HomePremiumComponent implements OnInit {
  buildingColumnHeader: any[]=[];
  SIColumnHeader:any[]=[];
  LocationName: any[]=[];
  visible:boolean=false;
  ngOnInit()  {
    this.buildingColumnHeader =['Location','Address','Delete']
    this.SIColumnHeader=['Location','Building SI','Content SI','All Risk SI','Personal Liability SI','Personal Accident SI','Domestic Servant SI']
    this.LocationName=['Chennai','Mumbai']
  }

}
