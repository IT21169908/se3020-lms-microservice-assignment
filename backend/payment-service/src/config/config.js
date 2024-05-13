const dbSettings = {
    db: process.env.DB || '',
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || '',
    repl: process.env.DB_REPLS || '',
    servers: process.env.DB_SERVERS,
    dbParameters: () => ({
        w: 'majority',
        wtimeout: 10000,
        j: true,
        readPreference: 'ReadPreference.SECONDARY_PREFERRED',
        native_parser: false
    }),
    serverParameters: () => ({
        autoReconnect: true,
        poolSize: 10,
        socketoptions: {
            keepAlive: 300,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000
        }
    }),

}

const serverSettings = {
    port: process.env.PORT || 8005,
    ssl: require('./ssl')
}

const stripeSettings = {
    secret: process.env.STRIPE_SECRET,
    public: process.env.STRIPE_PUBLIC
}

module.exports = Object.assign({}, {dbSettings, serverSettings, stripeSettings})
