import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PlannerComponent } from './planner.component';

const routes: Routes = [{ path: 'default', component: PlannerComponent }];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	exports: [NativeScriptRouterModule]
})
export class PlannerRoutingModule {}
