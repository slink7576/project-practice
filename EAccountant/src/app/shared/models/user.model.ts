import { Expense } from './expense.model';

export class User {
	constructor(
		public surname: string,
		public income: number,
		public expenses: Expense[],
		private login: string,
		private password: string
	) {}
}
