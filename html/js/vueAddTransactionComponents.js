Vue.component("add-transaction",{
	props:["transactions","text","language"],
	template:`
		<div id="addTransaction" class="box">
			<box-title :title=text.addTransaction[language]></box-title>
		</div>`,
});
