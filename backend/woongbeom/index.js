require('./src/lib/common/env');

const app = require('./src/app');

Promise.resolve(app.start());
