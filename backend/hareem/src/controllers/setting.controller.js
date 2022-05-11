const { createSettingDto, updateSettingDto } = require('../dtos/setting.dtos');
const { settingService } = require('../services');

// Controller 역할
// data 검증 (dto logic)
// status code 및 res return

const settingController = {
  async getSettings(ctx) {
    ctx.body = await settingService.getSettings();
  },
  async getSetting(ctx) {
    const { id } = ctx.params;
    ctx.body = await settingService.getSetting(id);
  },
  async createSetting(ctx) {
    const settingData = createSettingDto({ ...ctx.request.body });
    ctx.body = await settingService.createSetting(settingData);
  },
  async updateSetting(ctx) {
    const { id } = ctx.params;
    const settingData = updateSettingDto({ ...ctx.request.body });
    ctx.body = await settingService.updateSetting(id, settingData);
  },
  async deleteSetting(ctx) {
    const { id } = ctx.params;
    ctx.body = await settingService.deleteSetting(id);
  },
  async selectSetting(ctx) {
    const { id } = ctx.params;
    ctx.body = await settingService.selectSetting(id);
  },
};

module.exports = settingController;
