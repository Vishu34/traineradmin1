
//const query = 'mongodb+srv://user:user@cluster0.0qaiebg.mongodb.net/logixcode?retryWrites=true&w=majority'

exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.NODE_ENV = process.env.NODE_ENV;

exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ORIGIN = process.env.ORIGIN;

exports.FAST2SMS = process.env.FAST2SMS
exports.ADMIN_PHONE = process.env.ADMIN_PHONE

// module.exports = {
//     url: query
// };