Vue.component("graph-display",{
	props:["transactions","text","language"],
	template:`
		<div id="graphDisplay" class="box">
			<box-title>{{text.graph[language]}}</box-title>
		</div>`,
});
