const sequelize = require('./connection');
const User = require('./user.model');
const Auth = require('./auth.model');
const Book = require('./book.model');
const Category = require('./category.model');
const Setting = require('./setting.model');
const LostBook = require('./lostBook.model');
const Review = require('./review.model');
const Rental = require('./rental.model');
const Reservation = require('./reservation.model');

User.hasOne(Auth);

Category.hasMany(Book);
Book.belongsTo(Category);

User.hasMany(LostBook);
Book.hasMany(LostBook);
LostBook.belongsTo(User);
LostBook.belongsTo(Book);

User.hasMany(Review);
Book.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Book);

User.hasMany(Rental);
Book.hasMany(Rental);
Rental.belongsTo(User);
Rental.belongsTo(Book);

User.hasMany(Reservation);
Book.hasMany(Reservation);
Reservation.belongsTo(User);
Reservation.belongsTo(Book);

module.exports = {
  sequelize,
  User,
  Auth,
  Category,
  Book,
  Setting,
  LostBook,
  Review,
  Rental,
  Reservation,
};
