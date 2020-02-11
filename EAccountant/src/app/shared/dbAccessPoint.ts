import { Couchbase } from 'nativescript-couchbase-plugin';
import { User } from './models/user.model';

export class dbAccessPoint {
	private appSettings = require('tns-core-modules/application-settings');
	private database = new Couchbase('my-database');
	private dataKey = 'userDataId';

	constructor() {}

	saveUserDataToDb(user: User) {
		console.log('SAVE USER');
		let documentId = this.appSettings.getString(this.dataKey);
		if (documentId) {
			this.database.updateDocument(documentId, user);
		} else {
			documentId = this.database.createDocument(user);
			this.appSettings.setString(this.dataKey, documentId);
		}
	}

	getUserDataFromDb() {
		console.log('GET USER');
		const documentId = this.appSettings.getString(this.dataKey);

		if (!documentId) {
			return null;
		}

		const user: User = this.database.getDocument(documentId);

		return user;
	}
}
