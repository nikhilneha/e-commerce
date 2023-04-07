import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerProductAddComponent } from './seller-product-add/seller-product-add.component';
import { SellerProductUpdateComponent } from './seller-product-update/seller-product-update.component';
import { SearchComponent } from './search/search.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"seller-auth", component:SellerAuthComponent
  },
  {
    path:"seller-home", component:SellerHomeComponent,canActivate:[AuthGuard]
  },
  {
    path:'seller-product-add', component:SellerProductAddComponent,canActivate:[AuthGuard] 
  },
  {
    path:'seller-update-product/:id', component:SellerProductUpdateComponent, canActivate:[AuthGuard]
  },
  {
    path:'search/:query', component:SearchComponent
  },
  {
    path:'about-product/:productId', component:AboutProductComponent
  },
  {
    path:'user-auth', component:UserAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
