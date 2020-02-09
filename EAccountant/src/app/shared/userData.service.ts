import { Injectable } from '@angular/core';
import { Expense } from './models/expense.model';
import { Subject } from 'rxjs';
import { CategoryType } from './models/categoryType';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	//surname
	public _surname = 'Default User';
	get surname() {
		return this._surname;
	}
	set surname(value: string) {
		this._surname = value;
	}
	//income
	private _income: number = 1000;
	incomeChanged = new Subject<number>();

	get income() {
		return this._income;
	}
	set income(value: number) {
		this._income = value;
		this.incomeChanged.next(this.income);
	}
	//expenses
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
