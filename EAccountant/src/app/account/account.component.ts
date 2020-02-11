import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDataService } from '../shared/userData.service';
import { Subscription } from 'rxjs';
import {
	prompt,
	inputType,
	PromptOptions,
	capitalizationType,
	PromptResult
} from 'tns-core-modules/ui/dialogs/dialogs';
import { exit } from 'nativescript-exit';

@Component({
	selector: 'ns-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
	surname: string;

	income: number;
	incomeSubscription: Subscription;

	constructor(private userDataService: UserDataService) {}

	ngOnInit() {
		this.surname = this.userDataService.surname;
		this.incomeSubscription = this.userDataService.incomeChanged.subscribe(
			(income: number) => {
				this.income = income;
			}
		);
		this.income = this.userDataService.income;
	}

	onChangeIncome() {
		let options: PromptOptions = {
			title: 'Enter new income value:',
			defaultText: '0',
			okButtonText: 'OK',
			cancelButtonText: 'Cancel',
			cancelable: true,
			inputType: inputType.number, // email, number, text, password, or email
			capitalizationType: capitalizationType.sentences // all. none, sentences or words
		};

		prompt(options).then((response: PromptResult) => {
			if (response.result) {
				this.userDataService.income = +response.text;
			}
		});
	}

	onChangeSurname() {
		let options: PromptOptions = {
			title: 'Enter new surname:',
			defaultText: 'User',
			okButtonText: 'OK',
			cancelButtonText: 'Cancel',
			cancelable: true,
			inputType: inputType.text, // email, number, text, password, or email
			capitalizationType: capitalizationType.sentences // all. none, sentences or words
		};

		prompt(options).then((response: PromptResult) => {
			if (response.result) {
				this.surname = response.text;
				this.userDataService.surname = this.surname;
			}
		});
	}

	onExit() {
		exit();
	}

	ngOnDestroy() {
		this.incomeSubscription.unsubscribe();
	}
}
