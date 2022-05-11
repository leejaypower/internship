const createSettingDto = ({
  name,
  rentalDays,
  extensionDays,
  maxRentalBookNum,
  maxExtensionCount,
}) => {
  const result = {};
  if (name) { result.name = name; }
  if (rentalDays) { result.rentalDays = rentalDays; }
  if (extensionDays) { result.extensionDays = extensionDays; }
  if (maxRentalBookNum) { result.maxRentalBookNum = maxRentalBookNum; }
  if (extensionDays) { result.maxExtensionCount = maxExtensionCount; }

  return result;
};

const updateSettingDto = ({
  name,
  rentalDays,
  extensionDays,
  maxRentalBookNum,
  maxExtensionCount,
}) => {
  const result = {};
  if (name) { result.name = name; }
  if (rentalDays) { result.rentalDays = rentalDays; }
  if (extensionDays) { result.extensionDays = extensionDays; }
  if (maxRentalBookNum) { result.maxRentalBookNum = maxRentalBookNum; }
  if (extensionDays) { result.maxExtensionCount = maxExtensionCount; }
  return result;
};

module.exports = {
  createSettingDto,
  updateSettingDto,
};
