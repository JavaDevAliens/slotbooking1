
importScripts('ExtPay.js')


function reddenPage() {
	document.body.style.backgroundColor = 'red';
}


function sleep(num) {
	let now = new Date();
	const stop = now.getTime() + num;
	while (true) {
		now = new Date();
		if (now.getTime() > stop) return;
	}
}
var getDaysArray = function (start, end) {
	for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
		arr.push(new Date(dt));
	}
	return arr;
};

var timer = false;
var waitTimer;
function reloadingfunction(activetab) {
	console.log("waitTimer:", waitTimer);
	chrome.scripting.executeScript({
		target: { tabId: activetab.id },
       	function: () => {document.location.reload();
           
           chrome.storage.sync.get('value', function() {
                 console.log('Settings saved');
                  });
                  
             console.log(chrome.storage.sync.get('value'));
           }
	});
	
	const rndInt = randomIntFromInterval(3.1, 6.6)
	console.log(rndInt," waiting");
	console.log("Stopped...");
	
	clearInterval(waitTimer);
	waitTimer  = setInterval(reloadingfunction,rndInt*1000,activetab);
	console.log("Restarted ...");
	
}
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function call_main_func_main(minutes, activetab, intervel_time, startDate, endDate) {
	// main core logic in production
	chrome.action.setBadgeText({ text: 'ON' });

	if (!timer) {
		timer = true;
		if (!activetab.url.includes("chrome://")) {
			var i = 0;
			var total_runtime_in_seconds = 0.1 * 60;
			var time_to_wait_in_seconds = intervel_time * 1000;
			if (time_to_wait_in_seconds == 0) {
				time_to_wait_in_seconds = 1000;
			}
		
			//var dates = [startDate, endDate];
			//console.log(dates);
			//setTimeout
			console.log("start call_main_func_main");
			waitTimer  = setInterval(reloadingfunction,time_to_wait_in_seconds,activetab);
		
			
			
			var theValue='jaes';
            chrome.storage.sync.set({'value': theValue}, function() {
                 console.log('Settings saved');
                  });
			
			
		}

	}
	else return

	chrome.action.setBadgeText({ text: 'OFF' });
	console.log(`===================================`)

}

function changeLocation(consulate) {
	console.log("consulate :" + consulate);
	var consulate_select = document.querySelector("select");
	consulate_select.setAttribute('id', 'consulate');
	//document.getElementById("consulate").selectedIndex = consulate;
	consulate_select.options[consulate].selected = true;
	//consulate_select.onchange();

	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("change", false, true);
	consulate_select.dispatchEvent(evt);
	//document.querySelectorAll(".ui-datepicker-calendar");
}
function call_main_func_main1(minutes, activetab, intervel_time, consulate) {
	// main core logic in production
	chrome.action.setBadgeText({ text: 'ON' });
	if (!activetab.url.includes("chrome://")) {
		var i = 0;
		var total_runtime_in_seconds = 0.1 * 60;
		var time_to_wait_in_seconds = intervel_time * 1000;
		if (time_to_wait_in_seconds == 0) {
			time_to_wait_in_seconds = 1000;
		}
		chrome.scripting.executeScript({
			target: { tabId: activetab.id },
			function: changeLocation,
			args: [consulate]
		});
	}
	chrome.action.setBadgeText({ text: 'OFF' });
	console.log(`===================================`)
}
function call_main_func_main_refresh(activetab) {
	// main core logic in production
	chrome.action.setBadgeText({ text: 'ON' });
	

	chrome.tabs.query({}, function(tabs) { 
		tabs.forEach(element => {
		console.log(element.id);
		chrome.scripting.executeScript({
			target: { tabId: element.id },
			function: () => document.location.reload()

		});
	});
	} );


	if (!activetab.url.includes("chrome://")) {

		chrome.scripting.executeScript({
			target: { tabId: activetab.id },
			function: () => document.location.reload()

		});
	}
	chrome.action.setBadgeText({ text: 'OFF' });
	console.log(`===================================`)
}

// To test payments, replace 'sample-extension' with the ID of
// the extension you registered on ExtensionPay.com. You may
// need to uninstall and reinstall the extension.
// And don't forget to change the ID in popup.js too!
var extpay = ExtPay('us-visa-slot-finder');
extpay.startBackground(); // this line is required to use ExtPay in the rest of your extension

extpay.getUser().then(user => {
	console.log(user)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	if (request.message === 'stop') {
		clearInterval(waitTimer);
        timer = false;
	}
	else if (request.message === 'refresh') {
		chrome.storage.local.get("user_values", value => {
			console.log(value); // remove

			activetab = value["user_values"]["activeTab"];

			call_main_func_main_refresh(activetab);

		})
	}
	else if (request.message === 'changeconsulate') {
		//clearInterval(waitTimer);
		chrome.runtime.sendMessage({ message: 'stop' });
		var current_timer;
		
			chrome.storage.local.get("user_values", value => {
				console.log(value); // remove
				current_timer = value["user_values"]["minutes"];
				activetab = value["user_values"]["activeTab"];
				intervel_time = value["user_values"]["intervel_time"]
				consulate = value["user_values"]["consulate"]
				// chrome.tabs.get(activetab.id, current_tab_info => {
				// 	if (!current_tab_info.url.includes("chrome://")) {
				// 		console.log(current_tab_info.url)
				// 		chrome.scripting.executeScript({ target: { tabId: activetab.id, allFrames: true }, files: ['./foreground.js'] })
				// 	}
				// 	else {
				// 		console.log('chrome url')
				// 	}
				// })

				// chrome.scripting.executeScript({ target: { tabId: activetab.id }, files: ['foreground.js'] });
				// chrome.runtime.sendMessage({ message: 'foreground-updatelocation' });
				// console.log(current_timer); // remove
				// console.log(sender, sendResponse);
				call_main_func_main1(current_timer, activetab, intervel_time, consulate)
				// chrome.runtime.sendMessage({ message: 'foreground-setTimer' });
			})
		

	}
	else if (request.message === 'setTimer') {
		var current_timer;
		timer=false;
		chrome.storage.local.get("user_values", value => {
			console.log(value); // remove
			current_timer = value["user_values"]["minutes"];
			activetab = value["user_values"]["activeTab"];
			intervel_time = value["user_values"]["intervel_time"]
			startDate = value["user_values"]["startDate"]
			endDate = value["user_values"]["endDate"]
			// chrome.tabs.get(activetab.id, current_tab_info => {
			// 	if (!current_tab_info.url.includes("chrome://")) {
			// 		console.log(current_tab_info.url)
			// 		chrome.scripting.executeScript({ target: { tabId: activetab.id, allFrames: true }, files: ['./foreground.js'] })
			// 	}
			// 	else {
			// 		console.log('chrome url')
			// 	}
			// })

			// chrome.scripting.executeScript({ target: { tabId: activetab.id }, files: ['foreground.js'] });
			// chrome.runtime.sendMessage({ message: 'foreground-updatelocation' });
			// console.log(current_timer); // remove
			// console.log(sender, sendResponse);
			call_main_func_main(current_timer, activetab, intervel_time, startDate, endDate)
			// chrome.runtime.sendMessage({ message: 'foreground-setTimer' });
		})
	}
});

chrome.runtime.onInstalled.addListener(async () => {

	// While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
	// it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
	// runtime.
	let url = chrome.runtime.getURL("options.html");

	// Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
	//
	// Many of the extension platform's APIs are asynchronous and can either take a callback argument
	// or return a promise. Since we're inside an async function, we can await the resolution of the
	// promise returned by the tabs.create call. See the following link for more info on async/await.
	// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
	let tab = await chrome.tabs.create({ url });

	// Finally, let's log the ID of the newly created tab using a template literal.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	//
	// To view this log message, open chrome://extensions, find "Hello, World!", and click the
	// "service worker" link in the card to open DevTools.
	console.log(`Created tab ${tab.id}`);
});
