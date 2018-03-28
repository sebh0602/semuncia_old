Vue.component("add-transaction",{
	props:["transactions","text","language"],
	template:`
		<div id="addTransaction" class="box">
			<box-title :title=text.addTransaction[language]></box-title>
			<div style="width:300px;height:300px;background-color:black;">
				<close-icon></close-icon>
			</div>
		</div>`,
});
