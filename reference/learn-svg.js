/*
	<svg version="1.1"
		 baseProfile="full"
		 width="300" height="200"
		 xmlns="http://www.w3.org/2000/svg">

	  <!--circle cx="50%" cy="50%" r="80" fill="green" />

	  <text x="50%" y="130" font-size="60" text-anchor="middle" fill="white">SVG</text-->

	  <polyline points="0 200, 300 0" stroke="black" stroke-width="2" stroke-linecap="round" fill="none" />

	</svg>
*/

var svgns = "http://www.w3.org/2000/svg";

var svg = document.createElementNS(svgns, "svg");
svg.setAttribute("width", "500");
svg.setAttribute("height", "500");
document.body.appendChild(svg);

var r1 = document.createElementNS(svgns, "rect");
r1.setAttribute("width", "100%");
r1.setAttribute("height", "100%");
r1.setAttribute("fill", "yellow");
svg.appendChild(r1);

var c1 = document.createElementNS(svgns, "circle");
c1.setAttribute("cx", "50%");
c1.setAttribute("cy", "50%");
c1.setAttribute("r", "100");
c1.setAttribute("fill", "green");
svg.appendChild(c1);

var a = [ 0, 2, 6, 6, 6, 7, 10, 12, 16, 16, 16, 17, 20, 22, 24, 25, 25, 25, 26, 26, 27, 30 ]

var xT = svg.getAttribute("width");
console.log(">>> xT = " + xT);
var xI = xT / (a.length - 1);
console.log(">>> xI = " + xI);
yT = svg.getAttribute("height");
yI = yT / a[a.length - 1];

var p = "";

for (let i = 0; i < a.length; i++) {
	let x = ( i * xI );
	let y = yT - ( a[i] * yI );
	if (p != "") p = p + ", ";
	p = p + x + " " + y;
}
	
console.log(p);

var l1 = document.createElementNS(svgns, "polyline");
l1.setAttribute("stroke", "black");
l1.setAttribute("stroke-width", "2");
l1.setAttribute("stroke-linecap", "round");
l1.setAttribute("fill", "none");
l1.setAttribute("points", p);
svg.appendChild(l1);

////////////////////////////

var b = [
	[ 0, 1, 2, 0, 4, 0, 1 ],
	[ 2, 3, 1, 0, 0, 2 ],
	[ 4, 1, 0, 6, 0, 4, 0, 2, 4, 6 ],
	[ 2, 3, 1, 0, 0, 2, 4, 0 ],
	[ 4, 1, 0, 6, 0, 4 ]
]

var rT = 0; // total runs scored in the game
for (let i of b) {
	for (let j of i) {
		rT = rT + j;
	}
}
console.log(">>> rT = " + rT);
var yT = svg.getAttribute("height"); // total length of the Y axis
var yI = yT / ( rT - 1 ); // length of a single run interval on the Y axis
console.log(">>> yI = " + yI);

var xT = svg.getAttribute("width"); // total length of the X axis
var oI = xT / (b.length); // length of a single over interval on the X axis
console.log(">>> oI = " + oI);

var p = "";
console.log(">>> p = " + p);

var rS = 0; // runs subtotal
var oS = 0; // overs subtotal
for (let i = 0; i < b.length; i++) {
	let bI = oI / ( b[i].length );
	console.log(">>> b[i].length = " + b[i].length);
	for (let j = 0; j < b[i].length; j++) {
		rS = rS + b[i][j];
		console.log(">>> rS = " + rS);
		let y = yT - ( yI * rS );
		let x = ( i * oI) + ( bI * j );
		console.log(">>> x = " + x);
		console.log(">>> x = (" + i + " * " + oI + ") + (" + j + " * " + bI + ")" );
		if (p != "") p = p + ", ";
		p = p + x + " " + y;
	}
}

//console.log(p);

var l2 = document.createElementNS(svgns, "polyline");
l2.setAttribute("stroke", "red");
l2.setAttribute("stroke-width", "2");
l2.setAttribute("stroke-linecap", "round");
l2.setAttribute("fill", "none");
l2.setAttribute("points", p);
svg.appendChild(l2);

/*
///////////

var xI = xT / (a.length - 1);
var yT = svg.getAttribute("height");
var yI = yT / a[a.length - 1];

var p = "";

for (let i = 0; i < a.length; i++) {
	let x = ( i * xI );
	let y = yT - ( a[i] * yI );
	if (p != "") p = p + ", ";
	p = p + x + " " + y;
}
	
console.log(p);
*/
