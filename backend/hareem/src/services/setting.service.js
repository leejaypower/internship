// Service 역할
// DB와 데이터 통신

const { Setting } = require('../database/models');

const settingService = {
  async getSettings() {
    const settings = await Setting.findAll();
    return settings;
  },
  async getSetting(id) {
    const setting = await Setting.findByPk(id);
    if (!setting) {
      // Not Found Error
    }
    return setting;
  },
  async createSetting(settingData) {
    const setting = await Setting.findOne({
      where: { name: settingData.name },
    });
    if (setting) {
      // Already exist! (400 or 409)
      return 'Already exist!';
    }
    const newSetting = await Setting.create(settingData);
    return newSetting;
  },
  async updateSetting(id, settingData) {
    const setting = await Setting.findByPk(id);
    if (!setting) {
      // Not Found error
    }
    await setting.set({
      ...settingData,
    });
    const updatedSetting = await setting.save();
    return updatedSetting;
  },
  async deleteSetting(id) {
    const setting = await Setting.findByPk(id);
    if (!setting) {
      // Not Found error
    }
    await setting.destroy();
    return setting;
  },
  async selectedSetting(id) {
    // transaction 필요
    const oldSetting = await Setting.findOne({
      where: { isSelected: true },
    });

    await oldSetting.set({
      isSelected: false,
    });

    const selectedSetting = await Setting.findByPk(id);
    selectedSetting.set({
      isSelected: true,
    });
  },
};

module.exports = settingService;
