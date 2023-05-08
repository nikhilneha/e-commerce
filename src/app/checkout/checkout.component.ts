import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  totalPrice:number | undefined
  cartData:Cart[] | undefined
  constructor(private prodServe:ProductService, private router:Router){}
  
  ngOnInit(): void {
   
    this.prodServe.currentCart().subscribe((res)=>{
      this.cartData=res
      let price = 0;
      
      res.forEach((item)=>{
        if(item.quantity)
        {
          price=price+(+item.productPrice* + item.quantity)
        }
       })
         this.totalPrice=price+(price/10)+100-(price/10);
         console.log(this.totalPrice)
      
     })
  }

  orderProd:FormGroup=new FormGroup({
    email:new FormControl(),
    adress:new FormControl(),
    contact:new FormControl()
  })

  orderNow(data:order)
  {
      console.log(this.orderProd.value)
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      if(this.totalPrice)
      {
        let orderData:order={
          ...data,
          totalPrice: this.totalPrice,
          userId,
          id:undefined
        }
        this.cartData?.forEach((item)=>{
         setTimeout(()=>{
        item.id && this.prodServe.deleteCartItems(item.id)
         },4000)
        })
        this.prodServe.orderNow(orderData).subscribe((res)=>{
          if(res)
          {
            alert("order Placed")
             setTimeout(()=>{
              this.router.navigate(['my-orders'])
             },2000)
          }
        })
      }

  }
}
