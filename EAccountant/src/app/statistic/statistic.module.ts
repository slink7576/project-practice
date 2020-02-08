import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { StatisticComponent } from './statistic.component';
import { StatisticRoutingModule } from './statistic-routing.module';

@NgModule({
	declarations: [StatisticComponent],
	imports: [NativeScriptCommonModule, StatisticRoutingModule],
	schemas: [NO_ERRORS_SCHEMA]
})
export class StatisticModule {}
