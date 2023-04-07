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

  searchResult:undefined | product[]
  constructor(private router:Router,private prodServe:ProductService){}

  ngOnInit(): void {
    this.router.events.subscribe((res:any)=>{
        if(res.url)
        {
          if(localStorage.getItem('seller') && res.url.includes('seller'))
          {  
            let StoreSellerValue=localStorage.getItem('seller');
            let setSellerValue= StoreSellerValue && JSON.parse(StoreSellerValue)[0]
             this.sellerName=setSellerValue.name

             this.navType='seller'
        }
          else{
            this.navType='default'
          }
        }
    })
  }
   logout()
   {
    localStorage.removeItem('seller');
    this.router.navigate([''])
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
