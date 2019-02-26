function loadPage() {
	console.log(">>> Loading Page");
	browser.tabs.create({
		url : "main.html",
		active : true
	}).then(
		function(tab){
			console.log(">>> Created tag");
		}
	).catch(
		function(error){
			console.log(">>> ERROR: " + error);
		}
	);
			
}

browser.browserAction.onClicked.addListener(loadPage);
