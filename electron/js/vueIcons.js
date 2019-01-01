Vue.component("menu-icon",{
	props:[],
	template:`
	<svg width="100%" height="100%">
		<line x1="25%" x2="75%" y1="35%" y2="35%" style="stroke:white;stroke-width:5%"/>
		<line x1="25%" x2="75%" y1="50%" y2="50%" style="stroke:white;stroke-width:5%"/>
		<line x1="25%" x2="75%" y1="65%" y2="65%" style="stroke:white;stroke-width:5%"/>
	</svg>`,
});

Vue.component("close-icon",{
	props:[],
	template:`
	<svg width="100%" height="100%">
		<line x1="30%" x2="70%" y1="30%" y2="70%" style="stroke:white;stroke-width:5%"/>
		<line x1="30%" x2="70%" y1="70%" y2="30%" style="stroke:white;stroke-width:5%"/>
	</svg>`,
});
