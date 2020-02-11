import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Expense } from './models/expense.model';
import { Subject } from 'rxjs';
import { CategoryType } from './models/categoryType';
import { User } from './models/user.model';
import { dbAccessPoint } from './dbAccessPoint';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	//surname
	private _surname = 'Default';

	get surname() {
		return this._surname;
	}
	set surname(value: string) {
		this._surname = value;
		this.SaveChangesInDb();
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
		this.SaveChangesInDb();
	}
	//expenses
	private expenses: Expense[] = [
		new Expense('Burger', CategoryType.Food, 25, true),
		new Expense('Jacket', CategoryType.Cloth, 500, false),
		new Expense('Cinema', CategoryType.Entertainment, 120, true),
		new Expense('Electricity', CategoryType.Bills, 120, false)
	];
	expensesChanged = new Subject<Expense[]>();

	db = new dbAccessPoint();

	constructor() {
		const user = this.db.getUserDataFromDb();

		console.log(user);

		if (user) {
			this.surname = user.surname;
			this.income = user.income;
			this.expenses = user.expenses;
		}
	}

	private SaveChangesInDb() {
		const user = new User(this.surname, this.income, this.expenses.slice());
		this.db.saveUserDataToDb(user);
	}

	get expensesSum() {
		let expensesTotal = 0;
		this.expenses.forEach(element => {
			expensesTotal += element.sum;
		});
		return expensesTotal;
	}

	expensesChangedNotifier() {
		this.expensesChanged.next(this.expenses.slice());
		this.SaveChangesInDb();
	}

	setExpenses(expenses: Expense[]) {
		this.expenses = expenses;
		this.expensesChangedNotifier();
	}

	changeImportance(index: number) {
		this.expenses[index].importance = !this.expenses[index].importance;
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
