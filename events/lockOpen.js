module.exports = (io, lockID, tagUID) => {
	io.sockets.emit('lockOpened', {
		lockID,
		tagUID
	})
}