var components = {
	"side-nav-item":{
		props:["text"],
		template: "<div @click='handle()'>{{text}}</div>",
		methods:{
			handle: function(){
				this.$emit("click");
			}
		}
	}
};
