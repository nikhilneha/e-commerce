import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

   cartData: Cart[] | undefined
   priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
   }

  constructor(private prodServe:ProductService, private router:Router){}
  
  ngOnInit(): void {
    this.loadDetails()
  }

  loadDetails()
  {
    this.prodServe.currentCart().subscribe((res)=>{
      console.log(res)
      this.cartData=res;
      
      let price = 0;
      res.forEach((item)=>{
        if(item.quantity)
        {
          price=price+(+item.productPrice* + item.quantity)
        }
       
      })
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=100
      this.priceSummary.total=price+(price/10)+100-(price/10);

      if(this.cartData.length===0)
      {
        this.router.navigate([''])
      }
      
     })
  }
  checkout()
  {
    this.router.navigate(['/checkout'])
  }
  removeToCart(cartId:number|undefined){
  cartId && this.cartData && this.prodServe.removeToCart(cartId).subscribe((res)=>{
      if(res)
     this.loadDetails()
    })
  }
}
