Vue.component("itemText", {
	props:["todo"],
	template:"<div v-bind:title='\"Length: \" + todo.text.length' class='itemText'>{{todo.text}}</div>"
}
);

Vue.component("deleteButton",{
	props:["todo"],
	template:"<div class='deleteButton' v-on:click='handleClick'>X</div>",
	methods:{
		handleClick: function(){
			this.$emit("delete-click",this.todo.id);
		}
	}
}
);

Vue.component("todo-item",{
	props: ["todo"], //prop is a custom attribute
	template: "<div class='listItem flex'><itemText v-bind:todo='todo'></itemText><deleteButton v-bind:todo='todo' @delete-click='passOnDeleteClick'></deleteButton></div>",
	methods:{
		passOnDeleteClick: function(id){
			this.$emit("delete-click",id);
		}
	}
});

var app = new Vue({
	el:"#app",
	data:{
		myTitle: "Vue To Do",
		todos: [],
		newTodo:"",
		idIterator:0
	},
	methods:{
		saveItem: function(){
			this.todos.push({text:this.newTodo, id:this.idIterator});
			this.idIterator += 1;
			this.newTodo = "";
			localStorage.data = JSON.stringify(this.$root.$data);
		},
		deleteItem: function(id){
			for (var i = 0; i < this.todos.length; i++){
				if (this.todos[i].id == id){
					if (confirm("Do you really want to delete '" + this.todos[i].text + "'?"))
					this.todos.splice(i,1); //1 is the number of elements to remove
					break;
				}
			}
			localStorage.data = JSON.stringify(this.$root.$data);
		},
		saveText: function(){
			localStorage.data = JSON.stringify(this.$root.$data);
		}
	}
});
var myData;
if (localStorage.data){
	myData = JSON.parse(localStorage.data);
	app.idIterator = myData.idIterator;
	app.todos = myData.todos;
	app.newTodo = myData.newTodo;
}
