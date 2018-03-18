Vue.component("stats-display",{
	props:["transactions","text","language"],
	template:`
		<div id="statsDisplay" class="box">
			<box-title :title=text.stats[language]></box-title>
		</div>`,
});
