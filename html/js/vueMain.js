var app = new Vue({
	el:"#app",
	data:{
		language:"en",
		config:config,
		text:text,
	},
	components:components,
	mounted: function(){ //so it doesn't display the weird vue-less html
		if ("language" in localStorage){
			this.language = JSON.parse(localStorage.language);
		}
		if ("config" in localStorage){
			this.config = JSON.parse(localStorage.config);
		}
		document.getElementById("app").style.display = "flex";
	},
	computed:{
	},
	methods:vueMethods
});
