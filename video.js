{
	//https://cricketalive2-a.akamaihd.net/724630281c064728ae3aa929ad33c951/ap-southeast-2/5833133822001/profile_2/chunklist_dvr.m3u8?hdnea=st=1551139200~exp=1551153600~acl=/*~hmac=6fa4fde84add28df66d5f768cd620367c1d1cb147ae52fcc09a24dc4e76f362b

	let listenPanel = document.getElementById("video-listening");
	let foundPanel = document.getElementById("video-found");
	let videoUrl = document.getElementById("video-url");

	let showListen = function() {
		foundPanel.style.display = "none";
		listenPanel.style.display = "block";
	}

	let showFound = function() {
		videoUrl.textContent = nuffy.input.video;
		listenPanel.style.display = "none";
		foundPanel.style.display = "block";
	}
		
	let videoListener = function(input) {
		console.log(">>> Video Listener found match.");
		let v = input.url.replace(
				/^https?:\/\/.*\.(akamaihd.net\/.*\/ap-southeast-2\/\d+\/profile)_.\/(chunklist_dvr.m3u8).*/,
			"https://cricketalive1-a.$1_0/$2" );
		nuffy.input.video = v ;
		showFound();
		killVideoListener();
	}

	let startVideoListener = function() {
		if (browser.webRequest.onBeforeRequest.hasListener(videoListener)) {
			console.log(">>> WARNING: Attempted to start listener when listener already running.");
		} else {
			browser.webRequest.onBeforeRequest.addListener(
				videoListener,
				{urls: ["*://*.akamaihd.net/*/ap-southeast-2/*/profile_*/chunklist_dvr.m3u8*"]}
			);
			console.log(">>> Video listener started.");
		}
	}
	
	let killVideoListener = function() {
		if (browser.webRequest.onBeforeRequest.hasListener(videoListener)) {
			browser.webRequest.onBeforeRequest.removeListener(videoListener);
			console.log(">>> Video listener removed.");
		}
	}

	document.getElementById("videoButton").addEventListener("click", function() {

		if (nuffy.input.video !== null) {
			showPanel("video");
			showFound();
		} else {
			showPanel("video");
			showListen();
			startVideoListener();
		}

	});

	document.getElementById("video-open-tab").addEventListener("click", function() {
		browser.tabs.create({
			url : nuffy.input.url,
			active : true
		})
	});

	document.getElementById("video-quit").addEventListener("click", function() {
		killVideoListener();
		showPanel("main");
	});

	document.getElementById("video-clipboard").addEventListener("click", function() {
		navigator.clipboard.writeText(nuffy.input.url)
			.then(function() {
				showPanel("main");
			})
			.catch(function() {
				alert("Failed to write to clipboard");
				showPanel("main");
			});
	});

	document.getElementById("video-try-again").addEventListener("click", function() {
		nuffy.input.video.url = null;
		showListen();
		startVideoListener();
	});
}
