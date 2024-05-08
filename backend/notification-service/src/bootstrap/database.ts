const mongoose = require('mongoose');

mongoose.ObjectId.get((v: any) => v ? v.toString() : v);

export default async function databaseSetup() {
    await mongoose.connect(getMongooseUri(), {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });
}

function getMongooseUri() {
    return process.env.NODE_ENV !== 'test' ? process.env.MONGOOSE_URI : process.env.TEST_MONGOOSE_URI;
}
