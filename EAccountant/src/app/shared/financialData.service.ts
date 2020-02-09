import { Injectable } from '@angular/core';
import { Expense } from './models/expense.model';
import { Subject } from 'rxjs';
import { CategoryType } from './categoryType';

@Injectable({
	providedIn: 'root'
})
export class FinancialDataService {
	private expenses: Expense[] = [
		new Expense('Burger', CategoryType.Food, 25),
		new Expense('Jacket', CategoryType.Cloth, 500),
		new Expense('Cinema', CategoryType.Entertainment, 120),
		new Expense('Electricity', CategoryType.Bills, 120)
	];
	expensesChanged = new Subject<Expense[]>();

	expensesChangedNotifier() {
		this.expensesChanged.next(this.expenses.slice());
	}

	private _income: number = 0;
	incomeChanged = new Subject<number>();

	get income() {
		return this._income;
	}
	set income(value: number) {
		this._income = value;
		this.incomeChanged.next(this.income);
	}

	setExpenses(expenses: Expense[]) {
		this.expenses = expenses;
		this.expensesChangedNotifier();
	}

	getExpenses() {
		return this.expenses.slice();
	}

	addExpense(expense: Expense) {
		this.expenses.push(expense);
		this.expensesChangedNotifier();
	}

	deleteExpense(index: number) {
		this.expenses.splice(index, 1);
		this.expensesChangedNotifier();
	}
}
