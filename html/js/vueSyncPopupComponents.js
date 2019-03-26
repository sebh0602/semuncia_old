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
				<ul>
					<li>Toggle</li>
					<li>ID</li>
					<li>Password</li>
				</ul>
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
		}
	}
});
