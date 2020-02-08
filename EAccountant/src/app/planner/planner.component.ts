import { Component, OnInit, OnDestroy } from '@angular/core';
import { GestureEventData } from 'tns-core-modules/ui/gestures';
import { FinancialDataService } from '../shared/financialData.service';
import { Expense } from '../shared/models/expense.model';
import { Subscription } from 'rxjs';
import {
	confirm,
	prompt,
	PromptOptions,
	inputType,
	capitalizationType,
	PromptResult,
	action
} from 'tns-core-modules/ui/dialogs';
import { CategoryType } from '../shared/categoryType';

@Component({
	selector: 'ns-planner',
	templateUrl: './planner.component.html',
	styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {
	expenses: Expense[];
	subscription: Subscription;

	constructor(private financialDataService: FinancialDataService) {}

	ngOnInit() {
		this.subscription = this.financialDataService.expensesChanged.subscribe(
			(expenses: Expense[]) => {
				this.expenses = expenses;
			}
		);
		this.expenses = this.financialDataService.getExpenses();
	}

	onItemTap(index: number) {
		let options = {
			message: 'Are you sure you want to delete one of your expense points?',
			okButtonText: 'Yes',
			cancelButtonText: 'No'
		};

		confirm(options).then((result: boolean) => {
			if (result === true) {
				// console.log(index);
				this.financialDataService.deleteExpense(index);
			}
		});
	}

	onAddExpense() {
		let name: string;
		let category: CategoryType;
		let sum: number;

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

					const expense = new Expense(name, category, sum);
					this.financialDataService.addExpense(expense);
				});
			});
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
