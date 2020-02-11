import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NSEmptyOutletComponent } from 'nativescript-angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo:
			'/(profileTab:profile/default//plannerTab:planner/default//statisticTab:statistic/default)',
		pathMatch: 'full'
	},
	{
		path: 'profile',
		component: NSEmptyOutletComponent,
		loadChildren: () =>
			import('~/app/account/account.module').then(m => m.AccountModule),
		outlet: 'profileTab'
	},
	{
		path: 'planner',
		component: NSEmptyOutletComponent,
		loadChildren: () =>
			import('~/app/planner/planner.module').then(m => m.PlannerModule),
		outlet: 'plannerTab'
	},
	{
		path: 'statistic',
		component: NSEmptyOutletComponent,
		loadChildren: () =>
			import('~/app/statistic/statistic.module').then(m => m.StatisticModule),
		outlet: 'statisticTab'
	}
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
