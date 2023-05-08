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

  addProduct: undefined | product[] 

 
  ngOnInit():void
  {
   this.listProduct()
  
  }

  delProduct(id:number)
  {
    alert('Product is successfully deleted')
    this.prodServe.deleteProduct(id).subscribe((res)=>console.log(res))
    this.listProduct()                                              //To refresh the page after delete
  }
  listProduct()
  {
    this.prodServe.listProduct().subscribe((res)=>{
      console.log(res)
      this.addProduct=res
    })
  }

}


