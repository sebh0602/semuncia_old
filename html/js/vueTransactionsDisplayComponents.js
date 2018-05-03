Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>{{text.transactions[language]}}</box-title>
			<div id="transactions">

				<transaction-component :transaction="transactions['2018-05-03'][0]" :editMode="true" v-bind="$root.$data"></transaction-component>

				<div v-for="(date,index) in Object.keys(transactions).sort().reverse()" :key="index" class="dateContainer">
					<date-component :date="date" :text="text" :language="language" :editMode="false"></date-component>
					<transaction-component v-for="(transaction, index2) in transactions[date]" :key="index2" :transaction="transaction" :editMode="false" v-bind="$root.$data"></transaction-component>
					<!--Use v-model to bind transaction and boolean for editmode-->
				</div>
			</div>
		</div>`,
	methods:{
	}
});
