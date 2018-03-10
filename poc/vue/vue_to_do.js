Vue.component("indexDisplay", {
	props:["index"],
	template:"<div style='font-weight:bold;float:left;width:35px;'>{{index + 1}} </div>"
});

Vue.component("itemText", {
	props:["todo","index"],
	template:"<div v-bind:title='\"Length: \" + todo.text.length' class='itemText'><indexDisplay v-bind:index='index'></indexDisplay>{{todo.text}}</div>" //v-bind:title = :title
}
);

Vue.component("deleteButton",{
	props:["todo"],
	template:"<div class='deleteButton' v-on:click='handleClick'><img src='images/trash_256.png'></div>", //v-on:click = @click;
	methods:{
		handleClick: function(){
			this.$emit("delete-click",this.todo.id);
		}
	}
}
);

Vue.component("todo-item",{
	props: ["todo","index"], //prop is a custom attribute
	template: "<div class='listItem flex'><itemText v-bind:todo='todo' v-bind:index='index'></itemText><deleteButton v-bind:todo='todo' @delete-click='passOnDeleteClick'></deleteButton></div>",
	methods:{
		passOnDeleteClick: function(id){
			this.$emit("delete-click",id);
		}
	}
});

var data = {
	myTitle: "Vue To Do",
	todos: [],
	newTodo:"",
	idIterator:0,
	overlay:false,
	yesColor:"#870000",
	cursiveStyle:{fontStyle:"italic"}
};

var app = new Vue({
	el:"#app",
	data:data,
	mounted: function(){ //so it doesn't display the weird vue-less html
		document.getElementById("app").style.display = "block";
	},
	computed:{
		numberOfTodos: function(){
			return this.todos.length;
		}
	},
	methods:{
		saveItem: function(){
			this.todos.push({text:this.newTodo, id:this.idIterator});
			this.idIterator += 1;
			this.newTodo = "";
			localStorage.todoData = JSON.stringify(this.$root.$data);
		},
		deleteItem: function(id){
			for (var i = 0; i < this.todos.length; i++){
				if (this.todos[i].id == id){
					if (confirm("Do you really want to delete '" + this.todos[i].text + "'?"))
					this.todos.splice(i,1); //1 is the number of elements to remove
					break;
				}
			}
			localStorage.todoData = JSON.stringify(this.$root.$data);
		},
		saveText: function(){
			localStorage.todoData = JSON.stringify(this.$root.$data);
		},
		deleteAll: function(){
			this.todos = [];
			this.overlay = false;
			localStorage.todoData = JSON.stringify(this.$root.$data);
		}
	}
});
var myData;
if (localStorage.todoData){
	myData = JSON.parse(localStorage.todoData);
	app.idIterator = myData.idIterator;
	app.todos = myData.todos;
	app.newTodo = myData.newTodo;
}
