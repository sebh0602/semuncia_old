Vue.component("graph-display",{
	props:["transactions","text","language","initialAmount"],
	template:`
		<div id="graphDisplay" class="box">
			<box-title>{{text.graph[language]}}</box-title>
			<div>
				<canvas id="graphCanvas"></canvas>
			</div>
		</div>`,
	watch:{
		transactions:function(val){
			var data = [];
			var labels = [];
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
				labels.push(d);
				data.push(x/100);
			}
			var ctx = document.getElementById("graphCanvas");
			var lineChart = new Chart(ctx,{
				type:"line",
				data:{
					labels:labels,
					datasets:[
						{
							data:data,
						}
					]
				},
				options: {
  					responsive: true,
  					maintainAspectRatio: false
				}
			});
		}
	}
});
