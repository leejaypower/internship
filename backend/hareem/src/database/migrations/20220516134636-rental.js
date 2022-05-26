module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rentals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      state: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'START',
        comment: '해당 컬럼은 도서의 대여 또는 연장 또는 반납 상태를 나타냅니다. (START, EXTEND, END)',
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '해당 컬럼은 도서의 반납 예정일을 나타냅니다.',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
        onDelete: 'set null',
        onUpdate: 'cascade',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'set null',
        onUpdate: 'cascade',
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rentals',
          key: 'id',
        },
        onDelete: 'set null',
        onUpdate: 'cascade',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rentals');
  },
};
