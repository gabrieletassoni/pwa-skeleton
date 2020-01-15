if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function (registration) {
        console.info('ServiceWorker registration successful with scope:', registration.scope);

        // if there's no controller, this page wasn't loaded
        // via a service worker, so they're looking at the latest version.
        // In that case, exit early
        if (!navigator.serviceWorker.controller) return;

        // if there's an updated worker already waiting, update
        // Understands if there's a new version of the app
        // and if found, it reloads the page to install it as soon
        // as it can
        if (registration.waiting) {
            window.snackbar.labelText = 'App update found: reloading.';
            window.snackbar.open();
            registration.waiting.postMessage({
                updateSw: true
            });
            return;
        }

        // if there's an updated worker installing, track its
        // progress. If it becomes "installed", update
        if (registration.installing) {
            registration.addEventListener('statechange', function () {
                if (registration.installing.state == 'installed') {
                    window.snackbar.labelText = 'App update found: state changed to Installed.';
                    window.snackbar.open();
                    registration.installing.postMessage({
                        updateSw: true
                    });
                    return;
                }
            });
        }

        // otherwise, listen for new installing workers arriving.
        // If one arrives, track its progress.
        // If it becomes "installed", update
        registration.addEventListener('updatefound', function () {
            let newServiceWorker = registration.installing;

            newServiceWorker.addEventListener('statechange', function () {
                if (newServiceWorker.state == 'installed') {
                    window.snackbar.labelText = 'App update found: reloading.';
                    window.snackbar.open();
                    newServiceWorker.postMessage({
                        updateSw: true
                    });
                }
            });
        });
    }).catch(function (error) {
        console.info('ServiceWorker registration failed:', error);
    });
    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}
// sw script
self.addEventListener('message', function (e) {
    if (e.data.updateSw) {
        self.skipWaiting();
    }
});