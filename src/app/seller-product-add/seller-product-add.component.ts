import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seller-product-add',
  templateUrl: './seller-product-add.component.html',
  styleUrls: ['./seller-product-add.component.css']
})
export class SellerProductAddComponent {
 
  constructor(private prodServ:ProductService,private router:Router){}

  product:FormGroup=new FormGroup({
    productName:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(8)]),
    productPrice:new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(13)]),
    productColor:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    productCategory:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(9)]),
    productDescription:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(20)]),
    image:new FormControl('',[Validators.required])
  })

  submit(data:product)
  {
    this.prodServ.addProduct(this.product.value).subscribe((res)=>{
      alert("Product Added Successfully")
      this.router.navigate(['seller-home'])
    })
  }

}




