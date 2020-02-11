// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppModule } from './app/app.module';
import {
	on as applicationOn,
	launchEvent,
	exitEvent,
	ApplicationEventData,
	suspendEvent,
	resumeEvent
} from 'tns-core-modules/application';
import { dbAccessPoint } from './app/shared/dbAccessPoint';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { UserDataService } from './app/shared/userData.service';
import { User } from './app/shared/models/user.model';

// const db = new dbAccessPoint();

// const saveUser = () => {
// 	const injector = ReflectiveInjector.resolveAndCreate([UserDataService]);
// 	const userDataService = injector.get(UserDataService);

// 	const user = new User(
// 		userDataService.surname,
// 		userDataService.income,
// 		userDataService.getExpenses()
// 	);
// 	db.saveUserDataToDb(user);
// };

// const loadUser = () => {
// 	const injector = ReflectiveInjector.resolveAndCreate([UserDataService]);
// 	const userDataService = injector.get(UserDataService);

// 	const user = db.getUserDataFromDb();

// 	console.log(user);

// 	if (user) {
// 		console.log('!!!YES!!!');
// 		userDataService.surname = user.surname;
// 		userDataService.income = user.income;
// 		userDataService.setExpenses(user.expenses);
// 	}
// };

// applicationOn(launchEvent, (args: ApplicationEventData) => {
// 	console.log('LAUNCH');
// 	loadUser();
// });

// applicationOn(suspendEvent, (args: ApplicationEventData) => {
// 	console.log('SUSPEND');
// 	saveUser();
// });

// applicationOn(resumeEvent, (args: ApplicationEventData) => {
// 	console.log('RESUME');
// 	loadUser();
// });

// applicationOn(exitEvent, (args: ApplicationEventData) => {
// 	console.log('EXIT');
// 	saveUser();
// });

platformNativeScriptDynamic().bootstrapModule(AppModule);
