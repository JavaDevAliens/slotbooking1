// Replace 'sample-extension' with the id of the extension you
// registered on ExtensionPay.com to test payments. You may need to
// uninstall and reinstall the extension to make it work.
// Don't forget to change the ID in background.js too!
const extpay = ExtPay('us-visa-slot-finder')

// document.querySelector('button').addEventListener('click', extpay.openPaymentPage)
document.getElementById('sampleMinute').addEventListener('click', setTimer);

document.getElementById('consulate').addEventListener('change', changeConsulate);
document.getElementById('stopbutton').addEventListener('click', stopTimer);
document.getElementById('refresh').addEventListener('click', refreshPage);


async function refreshPage(event) {
    let minutes = parseFloat(event.target.value);
    const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    chrome.storage.local.set({ user_values: {"activeTab": activeTab } });
    chrome.runtime.sendMessage({ message: 'refresh' });
    chrome.action.setBadgeText({ text: 'OFF' });
    // console.log("I SET TIMER");
}

async function setTimer(event) {
    let intervel_time =  document.getElementById("intervel_time").value;
    let consulate =  document.getElementById("consulate").value;
    let startDate =  document.getElementById("startDate").value;
    let endDate =  document.getElementById("endDate").value;
    let refresh =  document.getElementById("refresh").value;
    console.log(intervel_time);
    let minutes = parseFloat(event.target.value);
    const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    chrome.storage.local.set({ user_values: { "startDate":startDate,"endDate":endDate,"minutes": minutes,"intervel_time":intervel_time,"consulate":consulate, "activeTab": activeTab } });
    chrome.runtime.sendMessage({ message: 'setTimer' });
    chrome.action.setBadgeText({ text: 'ON' });
    // console.log("I SET TIMER");
}
async function changeConsulate(event) {
    let intervel_time =  document.getElementById("intervel_time").value;
    let consulate =  document.getElementById("consulate").value;
  
    
    console.log(intervel_time)
    let minutes = parseFloat(event.target.value);
    const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    chrome.storage.local.set({ user_values: { "minutes": minutes,"intervel_time":intervel_time,"consulate":consulate, "activeTab": activeTab } });
    chrome.runtime.sendMessage({ message: 'changeconsulate' });
    chrome.action.setBadgeText({ text: 'ON' });
    // console.log("I SET TIMER");
}

async function stopTimer(event) {
    let minutes = parseFloat(event.target.value);
    const [activeTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    chrome.storage.local.set({ user_values: { "minutes": minutes, "activeTab": activeTab } });
    chrome.runtime.sendMessage({ message: 'stop' });
    chrome.action.setBadgeText({ text: 'OFF' });
    // console.log("I SET TIMER");
}

async function turnOff() {
    chrome.action.setBadgeText({ text: 'Stop' });
    window.close();
}

extpay.getUser().then(user => {
    if (user.paid) {
        // document.querySelector('p').innerHTML = 'Premium Options 🎉 More Coming Soon!'
        // document.getElementById('trail_text').remove()
        // document.getElementById('paynow').remove()

        document.getElementById('trailuseroptions').setAttribute("hidden", "hidden");
        document.getElementById('paiduseroptions').removeAttribute("hidden");

        document.getElementById('min1').addEventListener('click', setTimer);
        document.getElementById('min5').addEventListener('click', setTimer);
        document.getElementById('min15').addEventListener('click', setTimer);
        document.getElementById('min30').addEventListener('click', setTimer);
        document.getElementById('min60').addEventListener('click', setTimer);
        document.getElementById('cancel').addEventListener('click', turnOff);
    }
}).catch(err => {
    document.querySelector('p').innerHTML = "Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet" + err.name + err.message
    console.log({ name: err.name, message: err.message })
})

// extpay.onPaid(function() { console.log('popup paid')});
