var vueMethods = {
	saveData:function(){
		localStorage.language = JSON.stringify(this.language);
		localStorage.config = JSON.stringify(this.config);
	}
};
