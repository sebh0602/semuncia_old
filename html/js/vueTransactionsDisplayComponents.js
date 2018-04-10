Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>{{text.transactions[language]}}</box-title>
			<div id="transactions">
				<div v-for="(dayTransactions,date,index) in transactions" :key="index" class="dateContainer">
					<div class="date">
						{{date}}
					</div>

					<div v-for="(transaction, index) in dayTransactions" :key="index" class="transaction">
						<div class="transactionTop">
							<div class="transactionTitle">
								{{transaction["title"]}}
							</div>

							<div class="transactionAmount">
								{{transaction["type"]}}
								{{this.addDecimalSeparators(transaction["amount"])}}
							</div>
						</div>
						<div>
							{{transaction["categories"].join(", ")}}
						</div>
					</div>
				</div>
			</div>
		</div>`,
});
