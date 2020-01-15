const config = {
    // "dav": {
    //     "url": "https://lmbgsasa0231.lmbg.audi.vwg/webdav/",
    //     "authenticator": new window.webdavClient.BasicAuthenticator(),
    //     "username": "dev",
    //     "password": "dev"
    // },
    "dav": {
        "url": "https://test.bancolini.com/owncloud/remote.php/dav/files/admin/",
        "authenticator": new window.webdavClient.BasicAuthenticator(),
        "username": "admin",
        "password": "hXwijhVW8M8DYrV"
    },
    "datawedge": {
        "websocket": {
            "address": "localhost",
            "port": "12345"
        }
    },
    "import": {
        "file": "export_biw_inventory.XLSX",
        "directory": "tests/lambopoc"
    },
    "export": {
        "file": "out.csv",
        "directory": "tests/lambopoc"
    }
}