Vue.component("box-title",{
	template:`
		<div class="boxTitle">
			<slot></slot>
		</div>
	`,
});

Vue.component("toggle-switch",{
	model:{
		prop:"variable",
		event:"userInput"
	},
	props:["variable","valueOne","valueTwo"],
	template:`
		<div>
			<button v-on:userInput="$emit('userInput', $event.target.variable)" v-bind:variable="valueOne">{{valueOne}}</button>
			<button v-on:userInput="$emit('userInput', $event.target.variable)" v-bind:variable="valueTwo">{{valueTwo}}</button>
			<span>{{variable}}</span>
		</div>
	`
});
