import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private prodServe:ProductService,private activateroute:ActivatedRoute){}

  result:undefined | product[]
 
  ngOnInit(): void {
     let query=this.activateroute.snapshot.paramMap.get('query')
     query && this.prodServe.searchProduct(query).subscribe((res)=>{
        this.result=res
      
      })

  }
}

