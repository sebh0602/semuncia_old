Vue.component("transactions-display",{
	props:["transactions","text","language","config"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>
				{{text.transactions[language]}}
				<template slot="navigation">
					<span @click="config.showNewTransactionContainer = !config.showNewTransactionContainer">+</span>
				</template>
			</box-title>

			<div id="transactions">
				<div id="newTransactionContainer" v-if="config.showNewTransactionContainer">
					<transaction-component :transaction="config.newTransaction" :editMode="true" v-bind="$root.$data"></transaction-component>
					<button @click="addTransaction()">Add</button>
				</div>

				<div v-for="(date,index) in transactionDates" :key="index" class="dateContainer">
					<date-component :value="date" :text="text" :language="language" :editMode="false"></date-component>
					<transaction-component v-for="(transaction, index2) in transactions[date]" :key="index2" :transaction="transaction" :editMode="false" v-bind="$root.$data"></transaction-component>
				</div>
			</div>
		</div>`,
	methods:{
		addTransaction:function(){
			var date = this.config.newTransaction.date;
			if (!this.transactions.hasOwnProperty(date)){
				//this.transactions[date] = []; - this does not work, because it is not reactive
				Vue.set(this.transactions,date,[]);
			}
			var nT = this.config.newTransaction;
		 	var nT2 = { //I need to do this to make it not reactive
				date:nT.date,
				type:nT.type,
				amount:this.newTransactionAmountInCents,
				title:nT.title,
				categories:nT.categories
			};
			//this.transactions[date].push(nT); - this does not work, because it is not reactive
			Vue.set(this.transactions[date],this.transactions[date].length,nT2);
		}
	},
	computed:{
		newTransactionAmountInCents:function(){
			return parseFloat(this.config.newTransaction.amount) * 100;
		},
		transactionDates:function(){
			return Object.keys(this.transactions).sort().reverse();
		}
	}
});
