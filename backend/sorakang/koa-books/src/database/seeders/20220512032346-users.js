const bcrypt = require('bcrypt');

module.exports = {

  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('1111', 10);
    const users = [];
    for (let i = 0; i < 20; i += 1) {
      if (i > 5) {
        const user = { // 일반 사용자
          name: `sora${i}`,
          email: `sora${i}@barogo.com`,
          password,
          phone: `0101111111${i}`,
          groupName: 'user',
          deleteDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        users.push(user);
      } else { // 관리자
        const adminUsers = {
          name: `sora${i}`,
          email: `sora${i}@barogo.com`,
          password,
          phone: `0101111111${i}`,
          groupName: 'admin',
          deleteDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        users.push(adminUsers);
      }
    }

    return queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },

  // npx sequelize-cli db:seed --seed 20220512032346-users.js

};
