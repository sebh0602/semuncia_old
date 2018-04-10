var vueMethods = {
	saveData:function(){
		localStorage.language = JSON.stringify(this.language);
		localStorage.config = JSON.stringify(this.config);
		localStorage.transactions = JSON.stringify(this.transactions);
		localStorage.initialAmount = JSON.stringify(this.initialAmount);
		localStorage.recurringTransactions = JSON.stringify(this.recurringTransactions);
	},

};
