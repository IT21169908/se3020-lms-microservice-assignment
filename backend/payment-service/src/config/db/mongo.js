const MongoClient = require('mongodb')

function getMongooseUri() {
    return process.env.NODE_ENV !== 'test' ? process.env.MONGOOSE_URI : process.env.TEST_MONGOOSE_URI;
}

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {
        MongoClient.connect(
            getMongooseUri(options), {
                db: options.dbParameters(),
                server: options.serverParameters(),
            }, (err, db) => {
                if (err) {
                    mediator.emit('db.error', err)
                }

                db.admin().authenticate(options.user, options.pass, (err, result) => {
                    if (err) {
                        mediator.emit('db.error', err)
                    }
                    mediator.emit('db.ready', db)
                })
            })
    })
}

module.exports = Object.assign({}, {connect})
