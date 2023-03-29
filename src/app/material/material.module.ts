import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const materialComponent=[
  MatFormFieldModule,MatButtonModule,MatIconModule
]

@NgModule({
  declarations: [],
  imports: [
    materialComponent
  ],
  exports:[
    materialComponent
  ]
})
export class MaterialModule { }
