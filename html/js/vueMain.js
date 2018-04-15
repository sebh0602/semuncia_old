var app = new Vue({
	el:"#app",
	data:{
		language:"en",
		config:config,
		text:text,
		initialAmount:0,
		transactions:{},
		recurringTransactions:[]
	},
	mounted: function(){ //so it doesn't display the weird vue-less html
		if ("language" in localStorage){
			this.language = JSON.parse(localStorage.language);
		}
		if ("config" in localStorage){
			this.config = JSON.parse(localStorage.config);
		}
		if ("transactions" in localStorage){
			this.transactions = JSON.parse(localStorage.transactions);
		}
		if ("recurringTransactions" in localStorage){
			this.recurringTransactions = JSON.parse(localStorage.recurringTransactions);
		}
		if ("initialAmount" in localStorage){
			this.initialAmount = JSON.parse(localStorage.initialAmount);
		}
		document.getElementById("app").style.display = "flex";
	},
	computed:{
	},
	watch:{
		language:function(val){
			localStorage.language = JSON.stringify(val);
		},
		config:{
			handler:function(val){
				localStorage.config = JSON.stringify(val);
			},
			deep:true //nested
		},
		initialAmount:function(val){
			localStorage.initialAmount = JSON.stringify(val);
		},
		transactions:function(val){
			localStorage.transactions = JSON.stringify(val);
		},
		recurringTransactions:function(val){
			localStorage.recurringTransactions = JSON.stringify(val);
		}
	},
	methods:vueMethods
});
