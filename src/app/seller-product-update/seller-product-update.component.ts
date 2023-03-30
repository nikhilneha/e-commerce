import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seller-product-update',
  templateUrl: './seller-product-update.component.html',
  styleUrls: ['./seller-product-update.component.css']
})
export class SellerProductUpdateComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute, private prodServe:ProductService){
  }

  updatePro:any

  product:FormGroup=new FormGroup({
    productName:new FormControl(),
    productPrice:new FormControl(),
    productColor:new FormControl(),
    productCategory:new FormControl(),
    productDescription:new FormControl(),
    image:new FormControl(),
    id:new FormControl()
  })

 productUpdate() 
 {
  this.prodServe.updateProduct(this.activateRoute.snapshot.params['id']).subscribe((res)=>{
    console.log(res);
    this.product.setValue(res)

  })
 }

  ngOnInit():void
  {
    this.productUpdate()
  }
}
