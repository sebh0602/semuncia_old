Vue.component("transactions-display",{
	props:["transactions","text","language","config"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>{{text.transactions[language]}}</box-title>
			<div id="transactions">

				<date-component :transaction="config.newTransaction" :editMode="true"></date-component>
				<transaction-component :transaction="config.newTransaction" :editMode="true" v-bind="$root.$data"></transaction-component>

				<div v-for="(date,index) in Object.keys(transactions).sort().reverse()" :key="index" class="dateContainer">
					<date-component :date="date" :text="text" :language="language" :editMode="false"></date-component>
					<transaction-component v-for="(transaction, index2) in transactions[date]" :key="index2" :transaction="transaction" :editMode="false" v-bind="$root.$data"></transaction-component>
				</div>
			</div>
		</div>`,
	methods:{
	}
});
