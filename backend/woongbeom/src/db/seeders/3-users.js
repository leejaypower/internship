module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Heo Woong Beom',
        email: 'gigyesik@barogo.com',
        password: '$2b$10$xp8EMz1xth.fhee9b6weze./SOOHHKdcmnTkXTym9M.dS9ewoMC1q', // 9252
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kang So Ra',
        email: 'jaeng9@barogo.com',
        password: '$2b$10$W2.oejTWe8c/G9yn3Z.QPuKW.TaqTQocFD7FMzkcgHTmiaWLayDaG', // 2515
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yang Jin Yeong',
        email: 'bothsides@barogo.com',
        password: '$2b$10$tyFRjcG/.AnMU1vO4wrUJ.YXu6rPXac1uNZ1Nf7FxXXFqspq6aUkm', // 7740
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Park Jeong Hyun',
        email: 'haileypark@barogo.com',
        password: '$2b$10$1JeyVMYbOZoDDP.hX0NIwOSzZUaYiuYWGWYim/ucAuZNJLDiTmKmG', // 5601
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Song Ha Rim',
        email: 'hrsong@barogo.com',
        password: '$2b$10$UGVXa9Kf1.UuA1DZoP3k4eO0TjcAflSQwzQvPXyxEbNjpB7J.Qwe6', // 9549
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heo Deok Hyeong',
        email: 'heodh@barogo.com',
        password: '$2b$10$tz8JDX5TAdSOwRMRcWW9je4BGLGrH1hM172vZMuq9ahMlycX/IgnO', // 2666
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kim Ki Min',
        email: 'kimin.kim@barogo.com',
        password: '$2b$10$iSJM5vkzOlplp4rz.GtlIuXy.ldz7TXJaIIn2bh01LHCWE3Hyq7CK', // 6885
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jeong Joo Yeong',
        email: 'maliethy@barogo.com',
        password: '$2b$10$lQ5ZS0FU/RceZFZblylbJ.frbT.YsDDR89/bxZ/Es8a9Yeusxv8KG', // 2288
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ahn Gi Hwan',
        email: 'ahngh0113@barogo.com',
        password: '$2b$10$SYuapICpPLO0GBEyhYXnaOFy4sbZXEDjsKAWkXoZ938S484SMxLG2', // 8543
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lee Jay',
        email: 'jayloper@barogo.com',
        password: '$2b$10$66cUniL64/GmATfp2NhX7ONPU1PlzloNAPhOPtHrHX7boCepLGFDS', // 3401
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
