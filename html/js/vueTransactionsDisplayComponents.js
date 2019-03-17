Vue.component("transactions-display",{
	props:["transactions","text","language","config"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>
				{{text.transactions[language]}}
				<template slot="navigation">
					<div @click="config.showNewTransactionContainer = !config.showNewTransactionContainer">+</div>
				</template>
			</box-title>

			<div id="transactions">
				<div id="newTransactionContainer" v-if="config.showNewTransactionContainer">
					<transaction-component :transaction="config.newTransaction" :editMode="true" v-bind="$root.$data" :index="'newTransaction'"></transaction-component>
					<button @click="addTransaction()" class="addButton">Add</button>
				</div>

				<div v-for="(date,index) in transactionDates" :key="date + '_container'" class="dateContainer">
					<date-component :value="date" :text="text" :language="language" :editMode="false" :key="date + '_component'"></date-component>
					<transaction-component v-for="(transaction, index2) in transactions[date]" :key="date + '_' + index2.toString()" :transaction="transaction" :index="[date,index2]" v-bind="$root.$data" v-on:delete-transaction="deleteTransaction"></transaction-component>
				</div>
			</div>
		</div>`,
	methods:{
		addTransaction:function(){
			var date = this.config.newTransaction.date;
			if (date == ""){
				date = new Date().toISOString().split("T")[0]; //split because the output is 2018-05-28T20:58:38.835Z
			}
			if (!this.transactions.hasOwnProperty(date)){
				//this.transactions[date] = []; - this does not work, because it is not reactive
				Vue.set(this.transactions,date,[]);
			}
			var nT = this.config.newTransaction;
			var amount = (nT.amount != "") ? nT.amount:0;
		 	var nT2 = { //I need to do this to make it not reactive
				date:date,
				type:nT.type,
				amount:amount,
				title:nT.title,
				categories:nT.categories
			};
			//this.transactions[date].push(nT); - this does not work, because it is not reactive
			Vue.set(this.transactions[date],this.transactions[date].length,nT2);
			this.config.newTransaction = {
				date:"",
				title:"",
				type:"-",
				amount:"",
				categories:[],
				editMode:true
			};
		},
		deleteTransaction:function(i){
			var dateTransactions = this.transactions[i[0]];
			if (dateTransactions.length == 1){
				Vue.delete(this.transactions,i[0]);
			} else{
				dateTransactions.splice(i[1],1);
			}
		}
	},
	computed:{
		transactionDates:function(){
			return Object.keys(this.transactions).sort().reverse();
		}
	}
});
