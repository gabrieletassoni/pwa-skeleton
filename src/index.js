import {
  MDCList
} from "@material/list/index";
import {
  MDCDrawer
} from "@material/drawer/index";
import {
  MDCTopAppBar
} from "@material/top-app-bar/index";
import './style.scss';

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;
list.listen('MDCList:action', (event) => {
  drawer.open = false;
});
import {
  MDCLinearProgress
} from '@material/linear-progress';
window.linearProgress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
window.linearProgress.determinate = false;
window.linearProgress.close();

import {
  MDCSnackbar
} from '@material/snackbar';
window.snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

// Browserified libraries
require('webdav-client/lib/browserified');
window.XLSX = require('xlsx/dist/xlsx.full.min');
window.Papa = require('papaparse/papaparse.min');
window.moment = require('moment');

// 1GB
navigator.webkitPersistentStorage.requestQuota(1000 * 1024 * 1024,
  function (grantedBytes) {
    window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, (fs) => {
      console.log('Opened file system: ' + fs.name);
    }, (e) => {
      console.log("Error");
    });
  },
  function (errorCode) {
    alert("Storage not granted.");
  }
);

let websocket = {
  // WEBSOCKET ----------------------------------------------------------------------------------
  socketClosed: true,
  address: null, // config.datawedge.websocket.address;
  port: null, // config.datawedge.websocket.port;
  ws: null,
  isAndroid: false,

  setSocketStatus: function (event) {
    console.log(`Socket going to ${event.type}`)
    websocket.socketClosed = (event.type == "close");
    document.getElementById('online-indicator').innerHTML = `flash_${event.type == "close" ? "off" : "on"}`;
  },
  socketClose: function () {
    if (websocket.ws) websocket.ws.close();
    websocket.setSocketStatus({
      type: "close"
    });
  },
  socketOnError: function (e) {
    console.log(`Closing because of Error ${e}`)
    websocket.socketClose()
  },
  socketOnMessage: function (event) {
    console.log(event.data);
    // document.getElementById("body").innerHTML += `<br>${JSON.stringify(event.data)}`;
  },
  thecoreWsInit: function () {
    // console.log("Connecting to websocket");
    websocket.ws = new WebSocket("ws://" + websocket.address + ":" + websocket.port + "/");
    websocket.ws.onmessage = websocket.socketOnMessage;
    //  In production you would want this to be resilient against the server being killed by Android, by the user navigating between pages or any other unexpected error related to connection.
    websocket.ws.onclose = websocket.socketClose;
    websocket.ws.onopen = websocket.setSocketStatus;
    websocket.ws.onerror = websocket.socketOnError;
  },
  tryInit: function () {
    // Solo se la socket è chiusa e siamo in ambiente android
    // console.log(`init della websocket ${websocket.socketClosed}`);
    if (websocket.socketClosed) {
      websocket.thecoreWsInit();
    }
  },
  // Creating the websocket
  startWS: function (address, port) {
    websocket.address = address;
    websocket.port = port;

    websocket.tryInit();
    setInterval(websocket.tryInit, 30000);
    // const ua = navigator.userAgent.toLowerCase();
    // websocket.isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    // // Only android has the right to use websocket to obtain 
    // // data from datawedge... 
    // if (websocket.isAndroid) {
    //   websocket.tryInit();
    //   setInterval(websocket.tryInit, 30000);
    // }
  }
}
window.websocket = websocket;

// CONFIG
// fetch("./config.json").then(res => res.json()).then(data => {
//   const channel = new BroadcastChannel('sw-messages');
//   channel.postMessage({action: "configInitialized"});
// })

import {
  Buffer
} from 'buffer';
window.buffer = Buffer;