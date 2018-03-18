Vue.component("transactions-display",{
	props:["transactions","text","language"],
	template:`
		<div id="transactionsDisplay" class="box">
			<box-title :title=text.transactions[language]></box-title>
		</div>`,
});
