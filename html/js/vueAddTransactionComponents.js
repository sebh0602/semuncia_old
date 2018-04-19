Vue.component("add-transaction",{
	props:["transactions","text","language","config"],
	template:`
		<div id="addTransaction" class="box">
			<box-title>{{text.addTransaction[language]}}</box-title>

			<input type="text" v-model="config.newTransactionTitle" :placeholder="text.transactionTitle[language]">
			<input type="number" v-model="config.newTransactionAmount" :placeholder="text.transactionAmount[language]">

			<input type="radio" id="typeRadioOne" value="+" v-model="config.newTransactionType">
			<label for="typeRadioOne">+</label>
			<input type="radio" id="typeRadioTwo" value="-" v-model="config.newTransactionType">
			<label for="typeRadioTwo">-</label>

			<toggle-switch v-model="config.newTransactionType" :valueOne="'+'" :valueTwo="'-'"></toggle-switch>
		</div>`,
});
