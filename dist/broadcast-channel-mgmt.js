// To allow for communication between service worker and main app.
const channel = new BroadcastChannel('sw-messages');
channel.addEventListener('message', event => {
    switch (event.data.action) {
        case "setVersion":
            // Set the version from the cache version
            window.localStorage.setItem("version", event.data.version);
            document.getElementById("version").innerText = event.data.version;
    }
});