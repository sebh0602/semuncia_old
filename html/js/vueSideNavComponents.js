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
				<side-nav-item v-bind:text="text.exportJSON[language]" @click="exportTransactions"></side-nav-item>

				<side-nav-item v-bind:text="text.setInitialAmount[language]" @click="setInitialAmount"></side-nav-item>

				<side-nav-item v-bind:text="text.github[language]" @click="openGithub"></side-nav-item>
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
			}
			reader.readAsText(event.target.files[0]);
			document.getElementById("transactionsInput").value = ""; //so the onchange event works
		},
		exportTransactions:function(){
			var exportableJSON = {};
			exportableJSON.transactions = app.transactions;
			exportableJSON.initialAmount = app.initialAmount;
			exportableJSON.recurringTransactions = app.recurringTransactions;
			exportableJSON.config = app.config;
			exportableJSON.language = app.language;

			var fileName = "JSON_export_" + new Date().toISOString().split("T")[0] + ".json";
			var stringified = JSON.stringify(exportableJSON,null,"\t");
			var blob = new Blob([stringified], {type:"application/json"});
			var a = document.createElement("a");
			var url = URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() { //not sure why this is done like this (copied from SO)
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
			app.config.showSideNav = false;
		},
		setInitialAmount:function(){
			var val = prompt(text.enterInitialAmount[this.language],app.initialAmount/100);
			val = val.split(",").join(".");
			val = parseFloat(val);
			if (isNaN(val)){
				this.setInitialAmount(); //try again
				return;
			}
			val *= 100;
			val = Math.round(val);
			app.initialAmount = val;
			app.config.showSideNav = false;
		},
		openGithub:function(){
			window.open("https://github.com/sebh0602/semuncia");
			app.config.showSideNav = false;
		}
	}
});
