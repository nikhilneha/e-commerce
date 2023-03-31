import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProduct:any | product[]
  newProduct:any | product[]
  constructor(private prodServe:ProductService){}

ngOnInit(): void {
  this.prodServe.fewProductAdd().subscribe((res)=>{
    console.log(res);
    this.popularProduct=res
  });
  this.prodServe.latestProducts().subscribe((res)=>{
    console.log(res);
    this.newProduct=res
  })
}
}
