Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>{{text.transactions[language]}}</box-title>
			<add-transaction v-bind="$root.$data"></add-transaction>
			<div id="transactions">
				<div v-for="(date,index) in Object.keys(transactions).sort().reverse()" :key="index" class="dateContainer">
					<div class="date">
						{{date}} ({{weekday(date)}})
					</div>

					<transaction-component v-for="(transaction, index2) in transactions[date]" :key="index2" v-bind:transaction="transaction"></transaction-component>
				</div>
			</div>
		</div>`,
	methods:{
		weekday:function(date){
			var date = new Date(date);
			return this.text.weekdays[date.getDay()][this.language];
		},
		backgroundColor: function(transaction){
			return (transaction['type'] == '+') ? {backgroundColor:'#CCFFCC'}:{backgroundColor:'#FFCCCC'};
		}
	}
});
