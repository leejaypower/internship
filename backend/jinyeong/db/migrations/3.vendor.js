module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vendors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vendorName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '거래처명',
      },
      managerName: {
        type: Sequelize.STRING(10),
        comment: '담당자 이름',
      },
      contact: {
        type: Sequelize.STRING(13),
        allowNull: false,
        comment: '연락처',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Vendors');
  },
};
