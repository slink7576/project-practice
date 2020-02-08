import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PlannerComponent } from './planner.component';
import { PlannerRoutingModule } from './planner-routing.module';

@NgModule({
	declarations: [PlannerComponent],
	imports: [NativeScriptCommonModule, PlannerRoutingModule],
	schemas: [NO_ERRORS_SCHEMA]
})
export class PlannerModule {}
