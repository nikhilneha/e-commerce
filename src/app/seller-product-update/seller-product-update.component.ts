import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  updatePro:undefined | product

  product:FormGroup=new FormGroup({
    productName:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(8)]),
    productPrice:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(13)]),
    productColor:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    productCategory:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    productDescription:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(20)]),
    image:new FormControl('',[Validators.required]),
    id:new FormControl('',[Validators.required])
  })

 productEdit() 
 {
  // this.prodServe.getProductById(this.activateRoute.snapshot.params['id']).subscribe((res)=>{
  //   console.log(res);
  //   this.product.setValue(res)
 
  let productId = this.activateRoute.snapshot.paramMap.get('id');

  productId && this.prodServe.getProductById(productId).subscribe((res)=>{
    console.log(res)
    this.updatePro=res
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

