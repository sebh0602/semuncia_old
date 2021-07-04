Vue.component("analysis-display",{
	props:["transactions","text","language","config"],
	template:`
		<div class="box" id="analysis">
			<box-title>{{text.analysis[language]}}</box-title>
			<div id="content">
				<div id="inputs">
					<input type="text" v-model="config.analysisSearchText" placeholder="🔍">
					<div><span v-for="r in exampleResults">{{r}}, </span>...</div>
				</div>
				<div id="results">
					<div class="singleStatContainer">
						<div class="subHeader">
							{{text.totalValue[language]}}
						</div>
						<div class="amount">
							{{totalValue}}
						</div>
					</div>
					<div class="singleStatContainer">
						<div class="subHeader">
							{{text.totalEarned[language]}}
						</div>
						<div class="amount">
							{{totalEarned}}
						</div>
					</div>
					<div class="singleStatContainer">
						<div class="subHeader">
							{{text.totalSpent[language]}}
						</div>
						<div class="amount">
							{{totalSpent}}
						</div>
					</div>
					<div class="singleStatContainer">
						<div class="subHeader">
							{{text.numberOfTransactions[language]}}
						</div>
						<div class="amount">
							{{numberOfTransactions}}
						</div>
					</div>
				</div>
			</div>
		</div>`,
	computed:{
		matchingTransactions:function(){
			var matches = [];
			var sT = this.config.analysisSearchText.toLowerCase();

			for (d in this.transactions){
				for (t in this.transactions[d]){
					t = this.transactions[d][t];
					var categories = [];
					for (c in t.categories){
						categories.push(t.categories[c].toLowerCase());
					}
					if (t.title.toLowerCase().indexOf(sT) != -1 || categories.indexOf(sT) != -1){
						matches.push(t);
					}
				}
			}
			return matches;
		},
		exampleResults:function(){
			var match = this.matchingTransactions;
			var results = [];
			for (var i = 0; i < match.length && i < 3; i++){
				results.push(match[i].title);
			}
			return results;
		},
		totalValue:function(){
			var total = 0;
			for (t in this.matchingTransactions){
				t = this.matchingTransactions[t];
				total += t.amount;
			}
			return addDecimalSeparators(total);
		},
		totalEarned:function(){
			var total = 0;
			for (t in this.matchingTransactions){
				t = this.matchingTransactions[t];
				if (t.type == "+"){
					total += t.amount;
				}
			}
			return addDecimalSeparators(total);
		},
		totalSpent:function(){
			var total = 0;
			for (t in this.matchingTransactions){
				t = this.matchingTransactions[t];
				if (t.type == "-"){
					total += t.amount;
				}
			}
			return addDecimalSeparators(total);
		},
		numberOfTransactions:function(){
			return this.matchingTransactions.length;
		}
	}
});
