Vue.component("analysis-display",{
	props:["transactions","text","language","config"],
	template:`
		<div class="box">
			<box-title>{{text.analysis[language]}}</box-title>

		</div>`,

});
