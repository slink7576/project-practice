import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PlannerComponent } from './planner.component';
import { PlannerRoutingModule } from './planner-routing.module';
import { NativeScriptFormsModule } from 'nativescript-angular';

@NgModule({
	declarations: [PlannerComponent],
	imports: [
		NativeScriptCommonModule,
		PlannerRoutingModule,
		NativeScriptFormsModule
	],
	schemas: [NO_ERRORS_SCHEMA]
})
export class PlannerModule {}
