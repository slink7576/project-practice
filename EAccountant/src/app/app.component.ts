import { Component, OnInit, OnDestroy } from '@angular/core';
import { dbAccessPoint } from './shared/dbAccessPoint';
import { User } from './shared/models/user.model';
import { UserDataService } from './shared/userData.service';

@Component({
	selector: 'ns-app',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	constructor() {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		// Init your component properties here.
	}
}
