module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'hailey@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010010101010',
        userName: 'hailey park',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'hailey2@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '0108907784545',
        userName: 'hailey kim',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'hailey3@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010056758430',
        userName: 'hailey lee',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'hailey4@barogo.com',
        password: '$2b$10$sq1S9X72seMmCXa8cT2qJe0xl1e63uZeJni3zTUB4NqAltKqNQVvC',
        phoneNumber: '010045733646',
        userName: 'hailey choi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
