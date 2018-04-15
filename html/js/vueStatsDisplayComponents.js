Vue.component("stats-display",{
	props:["transactions","text","language","initialAmount"],
	template:`
		<div id="statsDisplay" class="box">
			<box-title>{{text.stats[language]}}</box-title>
			{{text.currentBalance[language]}} : {{currentBalance}}
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
		}
	}
});
