import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navType:string='default'


  sellerName:string=''
  constructor(private router:Router){}

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
}
