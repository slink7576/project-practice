import { Component, OnInit, OnDestroy } from '@angular/core';
import { GestureEventData } from 'tns-core-modules/ui/gestures';
import { UserDataService } from '../shared/userData.service';
import { Expense } from '../shared/models/expense.model';
import { Subscription } from 'rxjs';
import {
	confirm,
	prompt,
	PromptOptions,
	inputType,
	capitalizationType,
	PromptResult,
	action,
	alert
} from 'tns-core-modules/ui/dialogs';
import { CategoryType } from '../shared/models/categoryType';
import { EventData } from 'tns-core-modules/data/observable/observable';

@Component({
	selector: 'ns-planner',
	templateUrl: './planner.component.html',
	styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {
	expenses: Expense[];
	subscription: Subscription;

	constructor(private userDataService: UserDataService) {}

	ngOnInit() {
		this.subscription = this.userDataService.expensesChanged.subscribe(
			(expenses: Expense[]) => {
				this.expenses = expenses;
			}
		);
		this.expenses = this.userDataService.getExpenses();
	}

	onDoubleTap(index: number) {
		let options = {
			message: 'Are you sure you want to delete one of your expense points?',
			okButtonText: 'Yes',
			cancelButtonText: 'No'
		};

		confirm(options).then((result: boolean) => {
			if (result === true) {
				// console.log(index);
				this.userDataService.deleteExpense(index);
			}
		});
	}

	onItemTap(index: number) {
		this.userDataService.changeImportance(index);
	}

	onAddExpense() {
		let name: string;
		let category: CategoryType;
		let sum: number;
		let importance: boolean;

		let options: PromptOptions = {
			title: 'Expense point name:',
			defaultText: 'Expense',
			okButtonText: 'OK',
			cancelButtonText: 'Cancel',
			cancelable: true,
			inputType: inputType.text, // email, number, text, password, or email
			capitalizationType: capitalizationType.sentences // all. none, sentences or words
		};

		prompt(options).then((response: PromptResult) => {
			if (response.result === false) {
				return;
			} else {
				name = response.text;
			}

			let options = {
				title: 'Category selection',
				message: 'Select an expense category',
				cancelButtonText: 'Cancel',
				actions: [
					CategoryType.Food.toString(),
					CategoryType.Cloth.toString(),
					CategoryType.Entertainment.toString(),
					CategoryType.Bills.toString()
				]
			};

			action(options).then(result => {
				if (result === 'Cancel') {
					return;
				} else {
					category = CategoryType[result.toString()];
				}

				let options: PromptOptions = {
					title: 'Sum',
					defaultText: '0',
					okButtonText: 'OK',
					cancelButtonText: 'Cancel',
					cancelable: true,
					inputType: inputType.number, // email, number, text, password, or email
					capitalizationType: capitalizationType.sentences // all. none, sentences or words
				};

				prompt(options).then((response: PromptResult) => {
					if (response.result === false) {
						return;
					} else {
						sum = +response.text;
					}

					let options = {
						message: 'Is this expense point important?',
						okButtonText: 'Yes',
						cancelButtonText: 'No'
					};

					confirm(options).then((result: boolean) => {
						if (result === true) {
							importance = true;
						} else {
							false;
						}
						const expense = new Expense(name, category, sum, importance);
						this.userDataService.addExpense(expense);

						if (
							this.userDataService.expensesSum > this.userDataService.income
						) {
							let options = {
								title: 'You have run out of money!',
								message: 'Amount of money you spend is bigger than your income',
								okButtonText: 'OK'
							};
							alert(options);
						}
					});
				});
			});
		});
	}

	onHowToUse() {
		let options = {
			title: 'Usage Notes',
			message:
				' Tap once on expense item to mark it as important(makes it bold);\n Tap twice on expense item to delete it;\n Tap on "Add expense point" button to add expense item;',
			okButtonText: 'OK'
		};
		alert(options);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
