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
						{{text.currentBalance[language]}}
					</div>
					<div class="amount">
						{{earnedThisMonth}}
					</div>
				</div>

				<div id="spentThisMonth" class="singleStatContainer">
					<div class="subHeader">
						{{text.currentBalance[language]}}
					</div>
					<div class="amount">
						{{spentThisMonth}}
					</div>
				</div>

				<div id="monthTotal" class="singleStatContainer">
					<div class="subHeader">
						{{text.currentBalance[language]}}
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
		earnedThisMonth:function(){
			var relevantTransactions = [];
			return 100;
		},
		spentThisMonth:function(){
			return 200;
		},
		monthTotal:function(){
			return -100;
		}
	}
});
