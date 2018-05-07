Vue.component("box-title",{
	template:`
		<div class="boxTitle">
			<div>
				<slot></slot>
			</div>
			<div>
				<slot name="navigation"></slot>
			</div>
		</div>
	`,
});

Vue.component("toggle-switch",{
	props:["value","valueOne","valueTwo","colorOne","colorTwo"],
	template:`
		<div class="toggle" v-on:click="handleClick">
			<div class="toggleBackground">
				<div class="toggleToggle" v-bind:class="[valueOne == value ? 'firstOption':'secondOption']" v-bind:style={backgroundColor:displayColor}></div>
				<div class="toggleValueDisplay">{{displayValue}}</div>
			</div>
		</div>
	`,
	methods:{
		handleClick:function(){
			var v;
			if (this.value == this.valueOne){
				v = this.valueTwo;
			} else{
				v = this.valueOne;
			}
			this.$emit('input', v);
		}
	},
	computed:{
		displayValue:function(){
			return this.value;
		},
		displayColor:function(){
			return (this.value == this.valueOne) ? this.colorOne : this.colorTwo;
		}
	}
});
