const hashMiddleware = require('./hashMiddleware');
const authMiddleware = require('./authMiddleware');
const { errorMiddleware } = require('./errorMiddleware');

module.exports = { hashMiddleware, authMiddleware, errorMiddleware };
