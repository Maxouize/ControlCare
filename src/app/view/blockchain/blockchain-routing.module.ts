import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainComponent } from './blockchain.component';

const routes: Routes = [
  {
    path: "",
    component: BlockchainComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockchainRoutingModule { }
