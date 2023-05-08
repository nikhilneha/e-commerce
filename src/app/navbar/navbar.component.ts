import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navType:string='default'

  sellerName:string=''
  userName:string=''
  cartItem=0
  cartLength!:number
  searchResult:undefined|product[]
  constructor(private router:Router,private prodServe:ProductService){}

  

  ngOnInit(): void {
    this.router.events.subscribe((res:any)=>{
        if(res.url)
        {
          if(localStorage.getItem('seller') && res.url.includes('seller'))
          {  
            this.navType='seller' 
            if(localStorage.getItem('seller'))
            {
              let StoreSellerValue=localStorage.getItem('seller');
            let setSellerValue= StoreSellerValue && JSON.parse(StoreSellerValue)[0]
             this.sellerName=setSellerValue.name

            }
          }


        else if(localStorage.getItem('user'))
        {
          this.navType='user'
          if(localStorage.getItem('user')){
          let storeUserValue=localStorage.getItem('user');
          let setUserValue=storeUserValue && JSON.parse(storeUserValue)
            this.userName=setUserValue.name
            this.prodServe.getCartList(setUserValue.id)
          }
           }
          else{
            this.navType='default'
          }
        } 
    });
   
    let cartData = localStorage.getItem('localCart');
    if(cartData)
    {
      this.cartItem = JSON.parse(cartData).length
    }
    this.prodServe.dataCart.subscribe((res)=>{
      this.cartItem = res.length
    })
  
  }
   logout()
   {
    localStorage.removeItem('seller');
    this.router.navigate([''])
   }

   userLogout()
   {
    localStorage.removeItem('user')
    this.router.navigate(['user-auth']);
    this.prodServe.dataCart.emit([])
   }

   productSearch(query:KeyboardEvent)
   {
      if(query)
      {
        const data=query.target as HTMLInputElement
        this.prodServe.searchProduct(data.value).subscribe((res:any)=>{
         if(res.length>5)
         {
          res.length=4
         }
          this.searchResult=res 
        })
      }
   }
   hideSearch()
  {
    this.searchResult=undefined
  }
  searchAll(val:string)
  {
      this.router.navigate([`search/${val}`])
  }
  sendToAbout(id:number)
  {
    this.router.navigate(['/about-product/'+id])
  }
}


