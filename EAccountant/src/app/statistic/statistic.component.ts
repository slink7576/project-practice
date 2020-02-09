import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDataService } from '../shared/userData.service';
import { Expense } from '../shared/models/expense.model';
import { Subscription } from 'rxjs';
import { CategoryType } from '../shared/models/categoryType';
import { alert } from 'tns-core-modules/ui/dialogs';

class CategoryData {
	constructor(public category: CategoryType, public sum: number) {}
}

@Component({
	selector: 'ns-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit, OnDestroy {
	statisticData: CategoryData[];
	statisticDataSubscription: Subscription;

	income: number;
	incomeSubscription: Subscription;

	expensesTotal;

	mostSpendCategory: string = 'entertainment';

	constructor(private userDataService: UserDataService) {}

	ngOnInit() {
		//statisticData setup
		this.statisticDataSubscription = this.userDataService.expensesChanged.subscribe(
			(expenses: Expense[]) => {
				this.statisticData = this.generateStatistic(expenses);
			}
		);
		this.statisticData = this.generateStatistic(
			this.userDataService.getExpenses()
		);

		//expensesTotal setup
		this.expensesTotal = 0;
		this.statisticData.forEach(element => {
			this.expensesTotal += element.sum;
		});

		//mostSpendCategory setup
		let arr = this.statisticData.slice();
		arr.sort((a, b) => {
			return b.sum - a.sum;
		});
		this.mostSpendCategory = arr[0].category.toString().toLowerCase();

		//income setup
		this.incomeSubscription = this.userDataService.incomeChanged.subscribe(
			(income: number) => {
				this.income = income;
			}
		);
		this.income = this.userDataService.income;
	}

	private generateStatistic(expenses: Expense[]) {
		let resArr: CategoryData[] = [];

		expenses.forEach(expense => {
			let found = resArr.find(element => element.category === expense.category);
			if (found) {
				found.sum += expense.sum;
			} else {
				resArr.push(new CategoryData(expense.category, expense.sum));
			}
		});
		return resArr;
	}

	onGetAdvice() {
		let options = {
			title: 'Advice',
			message:
				'After analyzing your financial statistic, we can recommend you to reduce amount of money you spend on ' +
				this.mostSpendCategory,
			okButtonText: 'OK'
		};

		alert(options);
	}

	ngOnDestroy() {
		this.incomeSubscription.unsubscribe();
		this.statisticDataSubscription.unsubscribe();
	}
}
