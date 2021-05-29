import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitRoutingModule } from './init-routing.module';
import { MaterialModule } from 'src/material/material.module';

import { InitComponent } from './components/init/init.component';

@NgModule({
  declarations: [
    InitComponent
  ],
  imports: [
    CommonModule,
    InitRoutingModule,
    MaterialModule    
  ]
})
export class InitModule { }
