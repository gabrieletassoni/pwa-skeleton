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
window.moment = require('moment');

// Persistent Storage 2GB
navigator.webkitPersistentStorage.requestQuota(2000 * 1024 * 1024,
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
