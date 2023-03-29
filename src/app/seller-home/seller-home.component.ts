import { Component,OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private prodServe:ProductService){}

  addProduct:any 
 
  ngOnInit():void
  {
   this.prodServe.listProduct().subscribe((res)=>{
    console.log(res)
    this.addProduct=res
  })
  
  }

  delProduct(id:number)
  {
    this.prodServe.deleteProduct(id).subscribe((res)=>console.log(res))
  }

}
