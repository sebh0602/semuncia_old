Vue.component("transaction-component",{
	props:["transactions","text","language","config","editMode","transaction"],
	data:function(){
		return {
			newCategory:""
		};
	},
	template:`
		<div class="transactionContainer">
			<date-component v-if="editMode" v-model="transaction.date" :editMode="true" v-bind="$root.$data"></date-component>
			<div class="transaction" v-bind:style="[backgroundColor(transaction)]">
				<div class="transactionTop">
					<div class="transactionTitle">
						<span v-if="!editMode">{{transaction["title"]}}</span>
						<span v-else><input type="text" v-model="transaction['title']" :placeholder="text.transactionTitle[language]"></span>
					</div>

					<div class="transactionAmount">
						<span v-if="!editMode">
							{{transaction["type"]}}{{addComma(transaction["amount"])}}
						</span>
						<span v-else>
							<toggle-switch v-model="transaction.type" :valueOne="'+'" :valueTwo="'-'" colorOne="#ccffcc" colorTwo="#ffcccc"></toggle-switch>
							<input type="number" step="any" min="0" v-model="displayAmount" :placeholder="text.transactionAmount[language]" class="amountInput">
						</span>
					</div>
				</div>
				<div class="transactionBottom">
					<div class="category" v-for="(category,index) in transaction['categories']" :key="index" @click="removeCategory(index)">{{category}}</div>
					<div v-if="editMode">
						<input type="text" list="categories" :placeholder="text.categories[language]" v-model="newCategory" @keydown.enter="addCategory">
						<datalist id="categories">
							<option v-for="(category,index) in categories" :key="index" :value="category[0]">{{category[1]}}</option>
						</datalist>
						<button @click="addCategory">{{text.addCategory[language]}}</button>
					</div>
				</div>
			</div>
		</div>`,
	methods:{
		backgroundColor: function(transaction){
			if (this.editMode){
				return {backgroundColor:"#A9BCD0"};
			} else{
				return (transaction['type'] == '+') ? {backgroundColor:'#CCFFCC'}:{backgroundColor:'#FFCCCC'};
			}
		},
		addComma: function(number){
			return addDecimalSeparators(number);
		},
		addCategory:function(){
			if (this.newCategory != ""){
				this.transaction.categories.push(this.newCategory);
				this.newCategory = "";
			}
		},
		removeCategory:function(index){
			if (this.editMode){
				this.transaction.categories.splice(index,1);
			}
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
		},
		displayAmount:{
			get:function(){
				return this.transaction.amount / 100;
			},
			set:function(newValue){
				this.transaction.amount = newValue * 100;
			}
		}
	}
});

Vue.component("date-component",{
	props:["transactions","text","language","config","editMode","value"],
	template:`
		<div class="date" :style="[(editMode) ? {backgroundColor:'#A9BCD0'}:{}]"">
			<span v-if="!editMode">{{value}} ({{weekday(value)}})</span>
			<span v-else><input type="date" :value="value" v-on:input="$emit('input',$event.target.value)"></span>
		</div>`,
	methods:{
		weekday:function(date){
			var date = new Date(date);
			if (date != "Invalid Date"){
				return this.text.weekdays[date.getDay()][this.language];
			} else{
				return "";
			}
		}
	}
});
