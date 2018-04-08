Vue.component("add-transaction",{
	props:["transactions","text","language"],
	template:`
		<div id="addTransaction" class="box">
			<box-title>{{text.addTransaction[language]}}</box-title>
		</div>`,
});
