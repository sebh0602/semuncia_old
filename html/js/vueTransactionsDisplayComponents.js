Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title>{{text.transactions[language]}}</box-title>
			<div id="transactions">
				<div v-for="(date,index) in Object.keys(transactions).reverse()" :key="index" class="dateContainer">
					<div class="date">
						{{date}}
					</div>

					<div v-for="(transaction, index2) in transactions[date]" :key="index2" class="transaction">
						<div class="transactionTop">
							<div class="transactionTitle">
								{{transaction["title"]}}
							</div>

							<div class="transactionAmount">
								{{transaction["type"]}}
								{{this.addDecimalSeparators(transaction["amount"])}}
							</div>
						</div>
						<div class="transactionBottom">
							<div class="category" v-for="(category,index) in transaction['categories']" :key="index">{{category}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`,
});
