{

	let a = getAllElementsById({
		"url" : "input-url",
		"sid" : "input-series-id",
		"mid" : "input-match-id"
	});
	
	document.getElementById("input-clear").addEventListener("click", function() {
		for (let k in a) {
			a[k].value = "";
		}
	});

	document.getElementById("input-submit").addEventListener("click", function() {
		if ( checkInputValues({
			"url" : a.url.value,
			"matchId" : a.mid.value,
			"seriesId" : a.sid.value
		}) === false ) {
			alert("Neither the URL or the IDs where any good. Have another go.");
		} else {
			showPanel("main");
			nuffy.dom.videoButton.style.display = "inline";
		}
	});

	function checkInputValues(i) {
		let m = nuffy.regexp.matchId;
		let s = nuffy.regexp.seriesId;
		let u = (nuffy.regexp.url.exec(i.url));
		if (u !== null) {
			nuffy.input.seriesId = u[1];
			nuffy.input.matchId = u[2];
			nuffy.functions.generateUrl();
			return true;
		} else if (s.test(i.seriesId) === true && m.test(i.matchId) === true) {
			nuffy.input.seriesId = i.seriesId;
			nuffy.input.matchId = i.matchId;
			nuffy.functions.generateUrl();
			return true;
		}
		return false;
	}

	document.getElementById("inputButton").addEventListener("click", function() {
		showPanel("input");
	});

	document.getElementById("input-cancel").addEventListener("click", function() {
		showPanel("main");
	});

}
