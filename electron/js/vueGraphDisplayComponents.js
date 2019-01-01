Vue.component("graph-display",{
	props:["transactions","text","language","initialAmount"],
	template:`
		<div id="graphDisplay" class="box">
			<box-title>{{text.graph[language]}}</box-title>
			<div>
				<canvas id="graphCanvas"></canvas>
			</div>
		</div>`,
	methods:{
		updateGraph:function(val){
			if (this.transactions.length == 0){
				return;
			}
			var data = [];
			var days = [];

			//this makes a list of all days from the first transaction to the last/today (whichever is later) and calculates the amount of money at those times
			var x = this.initialAmount;
			var transactionDates = Object.keys(this.transactions).sort();
			var oldest = transactionDates[0];
			var newest = transactionDates[transactionDates.length - 1];
			if (new Date(newest) < new Date()){ //today is more current
				newest = new Date().toISOString().split("T")[0];
			}

			var currentDate = oldest;
			var cD = new Date(currentDate);
			cD.setHours(12); //this is to avoid issues with DST
			var nD = new Date(newest);
			nD.setHours(12);

			while (cD <= nD){
				days.push(cD.toISOString().split("T")[0]);
				cD.setDate(cD.getDate() + 1); //add one day
			}

			for (d in days){
				for (t in this.transactions[days[d]]){
					t = this.transactions[days[d]][t];
					if (t.type == "+"){
						x += t.amount;
					} else{
						x -= t.amount;
					}
				}
				data.push(x/100);
			}
			var ctx = document.getElementById("graphCanvas");
			var lineChart = new Chart(ctx,{
				type:"line",
				data:{
					labels:days,
					datasets:[
						{
							label:this.text.balanceOverTime[this.language],
							data:data,
							borderColor:"#000888",
							backgroundColor:"#a9bcd0",
							pointHoverBackgroundColor:"#000888",
							pointHoverBorderColor:"#a9bcd0",
							pointHitRadius:3,
							pointHoverRadius:0,
							pointRadius:0,
						}
					]
				},
				options: {
  					responsive: true,
  					maintainAspectRatio: false,
					animation: {
						duration: 0,
					},
					hover: {
						animationDuration: 0,
					},
					responsiveAnimationDuration: 0,
					tooltips:{
						mode:"index",
						intersect:false,
					},
					layout:{
						padding:{
							left:20,
							right:20,
							top:20,
							bottom:20
						}
					},
					scales:{
						yAxes:[{
							type:"linear",
							ticks:{
								beginAtZero:true,
								stepSize:100,
							}
						}]
					}
				}
			});
		}
	},
	watch:{
		transactions:function(){this.updateGraph()},
		language:function(){this.updateGraph()}, //for the label
	}
});
