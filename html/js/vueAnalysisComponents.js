Vue.component("analysis-display",{
	props:["transactions","text","language","config"],
	template:`
		<div class="box" id="analysis">
			<box-title>{{text.analysis[language]}}</box-title>
			<div id="content"></div>
		</div>`,

});
