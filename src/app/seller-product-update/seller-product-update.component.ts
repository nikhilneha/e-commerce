import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seller-product-update',
  templateUrl: './seller-product-update.component.html',
  styleUrls: ['./seller-product-update.component.css']
})
export class SellerProductUpdateComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute, private prodServe:ProductService, private router:Router){
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

 productEdit() 
 {
  this.prodServe.getProductById(this.activateRoute.snapshot.params['id']).subscribe((res)=>{
    console.log(res);
    this.product.setValue(res)

  })
 }
 productUpdate(data:product)
 {
  this.prodServe.updateProduct(this.product.value).subscribe((res)=>{
     alert("Product Update Successfully")
     this.router.navigate(['seller-home'])
  })
 }

  ngOnInit():void
  {
    this.productEdit()
  }
}
