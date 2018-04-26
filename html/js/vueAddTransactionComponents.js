Vue.component("add-transaction",{
	props:["transactions","text","language","config"],
	template:`
		<div id="addTransaction" class="box">
			<box-title>{{text.addTransaction[language]}}</box-title>

			<input type="text" v-model="config.newTransactionTitle" :placeholder="text.transactionTitle[language]">
			<input type="number" step="any" min="0" v-model="config.newTransactionAmount" :placeholder="text.transactionAmount[language]">

			<toggle-switch v-model="config.newTransactionType" :valueOne="'+'" :valueTwo="'-'" colorOne="#ccffcc" colorTwo="#ffcccc"></toggle-switch>
			<input type="text" list="categories">
			<datalist id="categories">
  				<option>Oxford</option>
				<option>Stanford</option>
				<option>Cambridge</option>
				<option>Harvard</option>
				<option>Princeton</option>
				<option>Yale</option>
			</datalist>
		</div>`,
	methods:{

	}
});
