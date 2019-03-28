Vue.component("sync-popup",{
	props:["config","text","language"],
	template:`
		<div class="popupBackground" v-show="config.popup == 'sync'" @click.self="config.popup = null;">
			<div class="popup" id="syncpopup">
				<div class="popupTitle">
					<div>{{text.synchronisation[language]}}</div>
					<div @click="config.popup = null;" class="popupCloseButton">
						<close-icon></close-icon>
					</div>
				</div>
				<div class="popupContent">
					{{text.synchronisation[language]}}:
						<toggle-switch v-model="config.sync.isActivated" :valueOne="false" :valueTwo="true" :symbolOne="'❌'" :symbolTwo="'✔️'" :colorOne="'#ffcccc'" :colorTwo="'#ccffcc'"></toggle-switch>
					<br>
					<input type="text" v-model="config.sync.id" :placeholder="text.id[language]" size="10">
					<button @click="generateID">{{text.newID[language]}}</button>
					<button @click="copyID">{{text.copy[language]}}</button>
					<br>
					<input type="password" :placeholder="text.password[language]">
					<button>{{text.submit[language]}}</button>
				</div>
			</div>
		</div>
		`,
	methods:{
		connectionTest:function(){
			var hostname = (window.location.protocol == "https:") ? "wss://" : "ws://" + window.location.hostname + "/ws/";
			var wSocket = new WebSocket(hostname);
			wSocket.onopen = function(event){
				wSocket.send(new Date().toISOString());
				console.log("sent date")
			}
		},
		generateID:function(){
			var array = new Uint8Array(10);
			window.crypto.getRandomValues(array);
			var s = "";
			for (var i = 0; i < array.length; i++){
				s += String.fromCharCode(array[i]);
			}
			this.config.sync.id = btoa(s).split("+").join("-").split("/").join("_").slice(0,10);
		},
		copyID:function(){
			//doesn't work in edge
			navigator.clipboard.writeText(this.config.sync.id).then(function(){
			},function(err){
				console.log(err); //I could add a fallback here
			});
		}
	}
});
