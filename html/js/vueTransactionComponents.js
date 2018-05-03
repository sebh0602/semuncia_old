Vue.component("transaction-component",{
	props:["transactions","text","language","config","editMode","transaction"],
	model: {
		prop: 'transaction',
 		event: 'change'
 	},
	template:`
		<div class="transaction" v-bind:style="[backgroundColor(transaction)]">
			<div class="transactionTop">
				<div class="transactionTitle">
					<span v-if="!editMode">{{transaction["title"]}}</span>
					<span v-else><input type="text" v-model="transaction['title']" :placeholder="text.transactionTitle[language]"></span>
				</div>

				<div class="transactionAmount">
					<span v-if="!editMode">
						{{transaction["type"]}}
						{{addComma(transaction["amount"])}}</span>
					<span v-else>
						<toggle-switch v-model="transaction.type" :valueOne="'+'" :valueTwo="'-'" colorOne="#ccffcc" colorTwo="#ffcccc"></toggle-switch>
						<input type="number" step="any" min="0" v-model="config.newTransactionAmount" :placeholder="text.transactionAmount[language]" class="amountInput">
					</span>
				</div>
			</div>
			<div class="transactionBottom">
				<div v-if="!editMode" class="category" v-for="(category,index) in transaction['categories']" :key="index+1000">{{category}}</div>
				<div v-else>
					<input type="text" list="categories" :placeholder="text.categories[language]">
					<datalist id="categories">
						<option v-for="(category,index) in categories" :key="index" :value="category[0]">{{category[1]}}</option>
					</datalist>
					<button>{{text.addCategory[language]}}</button>
				</div>
			</div>
		</div>`,
	methods:{
		backgroundColor: function(transaction){
			return (transaction['type'] == '+') ? {backgroundColor:'#CCFFCC'}:{backgroundColor:'#FFCCCC'};
		},
		addComma: function(number){
			return addDecimalSeparators(number);
		}
	},
	computed:{
		categories:function(){
			var categoriesObject = {};
			var prop;

			for (date in this.transactions){
				for (transaction in this.transactions[date]){
					for (cat in this.transactions[date][transaction]["categories"]){
						prop = this.transactions[date][transaction]["categories"][cat];

						if (!categoriesObject.hasOwnProperty(prop)){
							categoriesObject[prop] = 1;
						} else{
							categoriesObject[prop] += 1;
						}
					}
				}
			}

			var sortedKeys = Object.keys(categoriesObject).sort(function(a,b){
				return categoriesObject[b]-categoriesObject[a];
			});

			var categoriesArray = [];
			for (var i = 0; i < sortedKeys.length; i++){
				categoriesArray.push([sortedKeys[i],categoriesObject[sortedKeys[i]]]);
			}
			return categoriesArray;
		}
	}
});

Vue.component("date-component",{
	props:["transactions","text","language","config","date","editMode"],
	template:`
		<div class="date">
			<span v-if="!editMode">{{date}} ({{weekday(date)}})</span>
			<span v-else><input type="date"></span>
		</div>`,
	methods:{
		weekday:function(date){
			var date = new Date(date);
			return this.text.weekdays[date.getDay()][this.language];
		}
	}
});
