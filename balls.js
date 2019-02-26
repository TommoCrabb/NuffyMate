function updateData(data) {
	let n = data.liveMatch.commentary.overs.reverse()[0].number;
	let elements = document.getElementById("balls").getElementsByClassName("over");
	for (let i = elements.length - 1 ; i > -1 ; i--) {
		let en = elements[i].getAttribute("data-over-number");
		if (n <= en) {
			elements[i].parentNode.removeChild(elements[i]);
		} else {
			break;
		}
	}
	fillOvers(data.liveMatch.commentary.overs);
}

function fillOvers(overs) {
	console.log(overs);
	let grandparent = document.getElementById("balls");
	for (let over of overs) {
		if (over.number > 0) {

			var parent = appendNewElement({
				type : "div",
				parent : grandparent,
				classNames : "over",
				attributes : {
					"data-over-number" : over.number
				}
			});

			var header = appendNewElement({
				type : "div",
				parent : parent,
				classNames : "over-header",
			});
			fillOverHeader(header, over);

			var balls = appendNewElement({
				type : "div",
				parent : parent,
				classNames : "over-balls"
			});
			fillBalls(balls, over);
		}
	}
	grandparent.scrollTop = grandparent.scrollHeight;
}

function fillOverHeader(header, data) {
	appendNewElement({
		type : "div",
		parent : header,
		text : data.number.toString(),
		classNames : "over-number"
	});
	appendNewElement({
		type : "div",
		parent : header,
		text : data.overSummary.bowlersName,
		classNames : "bowler"
	});
	appendNewElement({
		type : "div",
		parent : header,
		text : data.overSummary.runsConcededinOver + " (" + data.overSummary.wicketsTakeninOver + ")"
	});
	nuffy.over = data.number;
	return header;
}

function fillBalls(output, data) {
	for (let ballData of data.balls.reverse() ) {
		var ball = appendNewElement({
			type : "div",
			text : ballData.result,
			parent : output,
			classNames : "balls-ball"
		});
		nuffy.ball = ballData.id;
		if (ball.textContent == "0") {
			ball.textContent = "-";
			ball.classList.add("dot");
		}
		for (let comment of ballData.comments) {
			if (comment.ballType != "NonBallComment") {
				ballTypes.add(comment.ballType);
				ball.classList.add(comment.ballType);
				if (comment.isFallOfWicket == true) {
					ball.classList.add("wicket");
				}
			}
		}
	}
	return output;
}
