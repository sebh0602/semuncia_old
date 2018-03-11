var app = new Vue({
	el:"#app",
	data:{
		moneyObject:{

		}
	},
	mounted: function(){ //so it doesn't display the weird vue-less html
		document.getElementById("app").style.display = "block";
	}
});
