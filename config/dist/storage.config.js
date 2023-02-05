"use strict";
exports.__esModule = true;
exports.StorageConfig = {
    photo: {
        destination: '../storage/photos/',
        urlPrefix: 'assets/photos/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        maxSize: 3 * 1024 * 1024,
        resize: {
            thumb: {
                width: 120,
                height: 100,
                directory: 'thumb/'
            },
            small: {
                width: 320,
                height: 240,
                directory: 'small/'
            }
        }
    }
};

//# sourceMappingURL=storage.config.js.map
