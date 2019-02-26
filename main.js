function getData(url, job) {
	fetch( url )
		.then( function (response) {
			return response.json();
		}).then( function (data) {
			console.log(data);
			if (job == "init") sortData(data);
			if (job == "update") updateData(data);
		}).catch( function (error) {
			console.log(">>> ERROR GETTING JSON: " + error);
		});
}

function sortData(data) {
	fillOvers(data.commentary.innings[0].overs.reverse() );
	/*
	if (typeof nuffy.timer != "number") {
		nuffy.timer = setInterval(getUpdate, 30000);
	}
	*/
	console.log(ballTypes);
	console.log(nuffy);
}

function getUpdate() {
	console.log(">>> GETTING UPDATE");
	getData( "https://origin-apinew.cricket.com.au/matches/2170/43635/live", "update" );
}

/* >>> BEGIN DEFINE GENERIC REUSABLE FUNCTIONS */

/*
Create new DOM element and optionally append it to another element. Takes one argument: i
i is an object with the following values:
type [string] (mandatory): the type of DOM element to create
parent [DOM element]: the DOM element to attach new element to
id [string]: element id
attributes [object]: uses element.setAttribute. key:value pairs must be strings
classNames [string OR array]: sets classList of element. Strings are split on whitespace
*/
function appendNewElement(i) {
	// i is an object with values: type, text, parent, classname, id, attributes
	let element = document.createElement(i.type);
	if (typeof i.parent == "object" && typeof i.parent.appendChild == "function") i.parent.appendChild(element);
	if (typeof i.text == "string") element.textContent = i.text;
	if (typeof i.id == "string") element.id = i.id;
	if (typeof i.attributes == "object") {
		for (let a in i.attributes) {
			element.setAttribute( a, i.attributes[a] )
		}
	}
	if (typeof i.classNames == "string") i.classNames = i.classNames.match(/[^\s]+/g);
	if (Array.isArray(i.classNames) == true ) {
		for (let c of i.classNames) {
			element.classList.add(c);
		}
	}
	return element;
}

/*
Accepts 1 argument, which is an object (i).
Each value in i must be a string that represents the ID of a DOM element.
The return object will use the same keys as the input object. 
*/
function getAllElementsById(i) {
	let o = { };
	for (let k in i) {
		o[k] = document.getElementById(i[k]);
	}
	return o;
}

/* >>> END DEFINE GENERIC REUSABLE FUNCTIONS */

var ballTypes = new Set();

/* >>> BEGIN DEFINE NUFFY NAMESPACE DATA */

var nuffy = {
	"data" : { },
	"urls" : {
		"template" : "https://live.cricket.com.au/match/_SERIES-ID_/_MATCH-ID_/scorecard",
		"regex" : "^.*(cricket\.com\.au\/match\/(\d+)\/(\d+)\/.*$"
	},
	"regexp" : {
		"url" : /^.*cricket\.com\.au\/match\/(\d+)\/(\d+)\/.*$/,
		"seriesId" : /^\d{4}$/,
		"matchId" : /^\d{5}$/,
	},
	"input" : {
		"url" : null,
		"matchId" : null,
		"seriesId" : null,
		"balls" : null,
		"updates" : null,
		"video" : null
	},
	"dom" : { },
	"over" : 1,
	"ball" : 1,
	"scripts" : [ "balls.js", "input.js" ],
	"elements" : [ "balls" ],
	"sections" : {
		"balls" : "balls.js",
		"input" : "input.js",
		"welcome" : "welcome.js",
		"video" : "video.js",
		"messages" : "messages.js",
		"graphs" : null,
		"admin" : null,
		"players" : null,
		"innings" : null,
		"games" : null,
		"status" : null,
		"videos" : null
	},
	"functions" : {
		"generateUrl" : function() {
			nuffy.input.url = "https://live.cricket.com.au/match/" + nuffy.input.seriesId + "/" + nuffy.input.matchId + "/scorecard"
		}
	},
	"todo" : [
		"close tab after getting video",
		"update main url, and api urls when parsing input data",
		"select match panel"
	]
}

nuffy.dom.videoButton = document.getElementById("videoButton");

/* >>> END DEFINE NUFFY NAMESPACE DATA */

/* >>> BEGIN BASIC SETUP */

for (let e in nuffy.sections) {
	if (nuffy.sections[e] !== null) {
		nuffy.dom[e] = document.getElementById(e);
		appendNewElement({
			"type" : "script",
			"parent" : document.body,
			"attributes" : {
				"src" : browser.extension.getURL(nuffy.sections[e])
			}
		});
	}
}

/* >>> END BASIC SETUP */

getData( browser.extension.getURL("test-data/comments3.json"), "init" );

document.getElementById("updateButton1").addEventListener("click", function() {
	getData( browser.extension.getURL("test-data/live1.json"), "update" );
});

document.getElementById("updateButton2").addEventListener("click", function() {
	getData( browser.extension.getURL("test-data/live2.json"), "update" );
});


// var data = getData( "https://origin-apinew.cricket.com.au/matches/2170/43634/live" );
// getData( "https://origin-apinew.cricket.com.au/comments/2170/43635", "init" );

/* SHOW AND HIDE PANELS */
{
	let panels = {
		 "welcome" : nuffy.dom.welcome ,
		 "video" : nuffy.dom.video ,
		 "input" : nuffy.dom.input ,
		 "messages" : nuffy.dom.messages 
	}

	function showPanel(a) {
		for (let i in panels) {
			if (a == i) {
				panels[i].style.display = "block";
			} else {
				panels[i].style.display = "none";
			}
		}
	}
}
