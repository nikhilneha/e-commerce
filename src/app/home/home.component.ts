import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProduct: undefined | product[]
  newProduct: undefined | product[]
  removeCart:boolean=false
  seeProduct:any
  prodQuantity:number=1
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
addToCart()
{
  if(this.seeProduct)
  {
    this.seeProduct.quantity=this.prodQuantity
    if(!localStorage.getItem('user'))
    {
      this.prodServe.localAddToCart(this.seeProduct)
      this.removeCart=true
    }
    
  }
}
removeFromCart(productId:number)
{
       this.prodServe.removeItemFromCart(productId)
       this.removeCart=false
}
}

