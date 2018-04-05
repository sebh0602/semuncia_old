Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title :title=text.transactions[language]></box-title>
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
								{{transaction["amount"]}}
							</div>
						</div>
						<div>
							{{transaction["categories"]}}
						</div>
					</div>
				</div>
			</div>
		</div>`,
});
