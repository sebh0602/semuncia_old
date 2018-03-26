Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title :title=text.transactions[language]></box-title>
			<div id="transactions">
				<div v-for="(dayTransactions,date,index) in transactions" :key="index">
					{{date}}
					<div v-for="(transaction, index) in dayTransactions" :key="index">
						{{transaction}}
					</div>
				</div>
			</div>
		</div>`,
});
