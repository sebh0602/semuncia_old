Vue.component("side-nav-item",{
	props:["text"],
	template: "<div @click='handle()'>{{text}}</div>",
	methods:{
		handle: function(){
			this.$emit("click");
		}
	}
});

Vue.component("side-nav",{
	props:["language","config","transactions","recurringTransactions","initialAmount","text"],
	template:`
		<div id="sideNav" v-show="config.showSideNav" @click.self="config.showSideNav = false;">
			<div id="nav">
				<div id="sideNavTitle">
					<div>{{text.menu[language]}}</div>
					<div @click="config.showSideNav = false;" id="sideNavCloseButton">
						<close-icon></close-icon>
					</div>
				</div>
				<side-nav-item v-bind:text="text.en[language]" @click="changeLanguage('en')"></side-nav-item>
				<side-nav-item v-bind:text="text.de[language]" @click="changeLanguage('de')"></side-nav-item>

				<side-nav-item v-bind:text="text.importJSON[language]" @click="selectImportTransactionsFile"></side-nav-item>
				<input type="file" v-on:change="importTransactions" id="transactionsInput" accept=".json">
				<side-nav-item v-bind:text="text.exportJSON[language]"></side-nav-item>

			</div>
		</div>`,
	methods:{
		changeLanguage:function(lang){
			app.language = lang;
			app.config.showSideNav = false;
		},
		selectImportTransactionsFile:function(){
			document.getElementById("transactionsInput").click();
		},
		importTransactions:function(event){
			var reader = new FileReader();
			reader.onload = function(event){
				var result = JSON.parse(event.target.result);
				if ("transactions" in result){
					app.transactions = result.transactions;
				}
				if ("initialAmount" in result){
					app.initialAmount = result.initialAmount;
				}
				if ("recurringTransactions" in result){
					app.recurringTransactions = result.recurringTransactions;
				}
				if ("config" in result){
					app.config = result.config;
				}
				if ("language" in result){
					app.language = result.language;
				}
				app.config.showSideNav = false;
				app.saveData();
			}
			reader.readAsText(event.target.files[0]);
			document.getElementById("transactionsInput").value = ""; //so the onchange event works
		}
	}
});
