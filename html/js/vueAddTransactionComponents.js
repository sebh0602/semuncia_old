Vue.component("add-transaction",{
	props:["transactions","text","language","config"],
	template:`
		<div>
			<input type="text" v-model="config.newTransactionTitle" :placeholder="text.transactionTitle[language]">
			<input type="number" step="any" min="0" v-model="config.newTransactionAmount" :placeholder="text.transactionAmount[language]">

			<toggle-switch v-model="config.newTransactionType" :valueOne="'+'" :valueTwo="'-'" colorOne="#ccffcc" colorTwo="#ffcccc"></toggle-switch>
			<input type="text" list="categories" :placeholder="text.categories[language]">
			<datalist id="categories">
				<option v-for="(category,index) in categories" :key="index" :value="category[0]">{{category[1]}}</option>
			</datalist>
			<button>{{text.addCategory[language]}}</button>
			<input type="dates">
		</div>`,
	methods:{

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
