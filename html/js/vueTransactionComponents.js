Vue.component("transaction-component",{
	props:["transactions","text","language","config","transaction"],
	template:`
		<div class="transaction" v-bind:style="[backgroundColor(transaction)]">
			<div class="transactionTop">
				<div class="transactionTitle">
					{{transaction["title"]}}
				</div>

				<div class="transactionAmount">
					{{transaction["type"]}}
					{{addComma(transaction["amount"])}}
				</div>
			</div>
			<div class="transactionBottom">
				<div class="category" v-for="(category,index) in transaction['categories']" :key="index+1000">{{category}}</div>
			</div>
		</div>`,
	methods:{
		backgroundColor: function(transaction){
			return (transaction['type'] == '+') ? {backgroundColor:'#CCFFCC'}:{backgroundColor:'#FFCCCC'};
		},
		addComma: function(number){
			return addDecimalSeparators(number);
		}
	}
});
