import { CategoryType } from './categoryType';

export class Expense {
	constructor(
		public name: string,
		public category: CategoryType,
		public sum: number,
		public importance: boolean
	) {}
}
