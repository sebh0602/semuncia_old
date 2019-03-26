Vue.component("custom-header",{
	props:["config","text","language"],
	template:`
		<div id="header">
			<div @click="showSideNav" id="showSideNavDiv"><menu-icon></menu-icon></div>
			<div id="title">Semuncia</div>
			<div @click="showSyncMenu">{{text.sync[language]}}</div>
		</div>
		`,
	methods:{
		showSideNav:function(){
			app.config.showSideNav = true;
		},
		showSyncMenu:function(){
			app.config.popup = "sync";
		}
	}
});
