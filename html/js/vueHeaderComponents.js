Vue.component("custom-header",{
	props:["config","text","language"],
	template:`
		<div id="header">
			<div @click="showSideNav">&#x2630;</div>
			<div id="title">Semuncia</div>
			<div>{{text.login[language]}}</div>
		</div>`,
	methods:{
		showSideNav:function(){
			app.config.showSideNav = true;
		}
	}
});
