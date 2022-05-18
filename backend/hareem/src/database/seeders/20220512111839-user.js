const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const testers = [];
    for (let i = 0; i < 20; i += 1) {
      testers.push({
        id: uuidv4(),
        email: `test${i}@barogo.com`,
        password: `test${i}`,
        phone: `010${String(new Date().getTime() + i).substring(5, 13)}`,
        name: `test${i}`,
        warningCount: 0,
        createdAt: new Date(),
        deletedAt: null,
      });
    }

    console.log(testers);

    await queryInterface.bulkInsert('Users', testers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
