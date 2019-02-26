{

	let e = getAllElementsById({
		"head" : "message-header",
		"body" : "message-body"
	});

	function showMessage(body, head) {
		e.head.textContent = head;
		e.body.textContent = body;
		nuffy.dom.messages.style.display = "block";
	}

	document.getElementById("message-dismiss").addEventListener("click", function() {
		nuffy.dom.messages.style.display = "none";
	});

	document.getElementById("message-clipboard").addEventListener("click", function() {
		return;
	});

}
