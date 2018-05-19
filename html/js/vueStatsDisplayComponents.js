Vue.component("stats-display",{
	props:["transactions","text","language","initialAmount"],
	template:`
		<div id="statsDisplay" class="box">
			<box-title>{{text.stats[language]}}</box-title>
			<div class="statsContainer">
				<div id="currentBalance" class="singleStatContainer">
					<div class="subHeader">
						{{text.currentBalance[language]}}
					</div>
					<div class="amount">
						{{currentBalance}}
					</div>
				</div>

				<div id="earnedThisMonth" class="singleStatContainer">
					<div class="subHeader">
						{{text.amountEarnedThisMonth[language]}}
					</div>
					<div class="amount">
						{{earnedThisMonth}}
					</div>
				</div>

				<div id="spentThisMonth" class="singleStatContainer">
					<div class="subHeader">
						{{text.amountSpentThisMonth[language]}}
					</div>
					<div class="amount">
						{{spentThisMonth}}
					</div>
				</div>

				<div id="monthTotal" class="singleStatContainer">
					<div class="subHeader">
						{{text.monthTotal[language]}}
					</div>
					<div class="amount">
						{{monthTotal}}
					</div>
				</div>
			</div>
		</div>`,
	computed:{
		currentBalance:function(){
			var x = this.initialAmount;
			for (d in this.transactions){
				for (t in this.transactions[d]){
					t = this.transactions[d][t];
					if (t.type == "+"){
						x += t.amount;
					} else{
						x -= t.amount;
					}
				}
			}
			return addDecimalSeparators(x);
		},
		transactionsThisMonth:function(){
			var date = new Date();
			var thisMonth = date.getMonth() + 1;
			var thisYear = date.getFullYear();

			var relevantTransactions = [];

			for (key in this.transactions){
				if (thisYear == parseInt(key.split("-")[0]) && thisMonth == parseInt(key.split("-")[1])){
					for (index in this.transactions[key]){
						relevantTransactions.push(this.transactions[key][index]);
					}
				}
			}
			return relevantTransactions;
		},
		earnedThisMonth:function(){
			var relevantTransactions = this.transactionsThisMonth;
			var x = 0;
			for (i in relevantTransactions){
				if (relevantTransactions[i].type == "+"){
					x += relevantTransactions[i].amount;
				}
			}
			return addDecimalSeparators(x);
		},
		spentThisMonth:function(){
			var relevantTransactions = this.transactionsThisMonth;
			var x = 0;
			for (i in relevantTransactions){
				if (relevantTransactions[i].type == "-"){
					x += relevantTransactions[i].amount;
				}
			}
			return addDecimalSeparators(x);
		},
		monthTotal:function(){
			var relevantTransactions = this.transactionsThisMonth;
			var x = 0;
			for (i in relevantTransactions){
				if (relevantTransactions[i].type == "+"){
					x += relevantTransactions[i].amount;
				} else{
					x -= relevantTransactions[i].amount;
				}
			}
			return addDecimalSeparators(x);;
		}
	}
});
