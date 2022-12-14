const fs = require("fs")
const path = require("path")

module.exports = (io) => {
    // Full path to the current directory
    const listenersPath = path.resolve(__dirname);

    // Reads all the files in a directory
    fs.readdir(listenersPath, (err, files) => {
        if (err) {
            process.exit(1);
        }

        files.map((fileName) => {
            if (fileName !== 'index.js') {
                console.debug('Initializing listener at: %s', fileName);
                // Requires all the files in the directory that is not a index.js.
                const listener = require(path.resolve(__dirname, fileName));
                // Initialize it with io as the parameter.
                listener(io);
            }
        });
    });
}