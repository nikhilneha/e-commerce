import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent  implements OnInit {

  seeProduct:any
  quantity:number=1
  constructor(private activateRoute:ActivatedRoute, private prodServe:ProductService){}
 
  ngOnInit(): void {
    let about=this.activateRoute.snapshot.paramMap.get('productId')
     console.log(about)
     about && this.prodServe.getProductById(about).subscribe((res)=>{
         console.log(res)
         this.seeProduct=res
     })

  }
  decIncQuantity(value:string)
  {
       if(this.quantity<20 && value==="plus")
       {
        this.quantity+=1
       }
       else if(this.quantity>1 && value==="minus")
       {
        this.quantity-=1
       }
  }
}
