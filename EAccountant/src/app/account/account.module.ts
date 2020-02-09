import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
	declarations: [AccountComponent],
	imports: [NativeScriptCommonModule, AccountRoutingModule],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AccountModule {}
