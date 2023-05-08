import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Cart, product } from '../data-type';
import { UserService } from '../user.service';


@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent  implements OnInit {

  productData: undefined | product;
  prodQuantity:number=1
  removeCart:boolean=false
  cartData: product |undefined
  
  
  constructor(private activateRoute:ActivatedRoute, private prodServe:ProductService){}
 
  ngOnInit(): void {
    let productId=this.activateRoute.snapshot.paramMap.get('productId')
    productId && this.prodServe.getProductById(productId).subscribe((res)=>{
         console.log(res)
         this.productData=res

         let cartData = localStorage.getItem('localCart');
         if(productId && cartData)
         {
          let items = JSON.parse(cartData);
          items = items.filter((item:product)=>productId==item.id.toString())
          if(items.length)
          {
            this.removeCart=true
          }
          else
          {
            this.removeCart=false
          }
         }
         let user = localStorage.getItem('user');
          
         if(user)
         {
          let userId = user && JSON.parse(user).id
          this.prodServe.getCartList(userId);
          this.prodServe.dataCart.subscribe((res)=>{
          let item = res.filter((item:product)=>productId?.toString()===item.productId?.toString());
          if(item.length)
          {
            this.cartData = item[0]
            this.removeCart=true
          }
          })
         }

         
     })

  }
  
  decIncQuantity(value:string)
  {
       if(this.prodQuantity<20 && value==="plus")
       {
        this.prodQuantity+=1
       }
       else if(this.prodQuantity>1 && value==="minus")
       {
        this.prodQuantity-=1
       }
  }
  addToCart()
  {
    if(this.productData)
    {
      this.productData.quantity=this.prodQuantity
      if(!localStorage.getItem('user'))
      {
        this.prodServe.localAddToCart(this.productData)
        this.removeCart=true
      }
      else{
        console.log("user logged in")
        let user = localStorage.getItem('user');
        
        let userId = user && JSON.parse(user).id
        console.log(userId)
        let cartData:Cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id
        console.log(cartData)
        this.prodServe.addCart(cartData).subscribe((res)=>{
          if(res)
          {
            // alert("product is added in cart")
            this.prodServe.getCartList(userId);
            this.removeCart=true
          }
        })
      }
      // else
      // {
      //   // console.log("user is logged in")
      //   let user = localStorage.getItem('user');
      //   let userId = user && JSON.parse(user).id;
      //   console.log(userId)
      //   let cartData:Cart ={
      //     ...this.seeProduct,
      //     userId,
      //     productId:this.seeProduct.id
      //   }
      //   delete cartData.id
        
      //   this.prodServe.addCart(cartData).subscribe((res)=>{
      //     if(res)
      //     {
      //       alert("product is added to cart")
      //     }
      //   })
      // }
    }
  }
  removeFromCart(productId:number)
  {
        if(!localStorage.getItem('user'))
        {
          this.prodServe.removeItemFromCart(productId)
         
        }
        else{
          
               console.log(this.cartData);
            this.cartData && this.prodServe.removeToCart(this.cartData.id).subscribe((res)=>{
              if(res)
              {
                let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id
                this.prodServe.getCartList(userId)
              }
            })
            this.removeCart=false
        }
  }

    }
  