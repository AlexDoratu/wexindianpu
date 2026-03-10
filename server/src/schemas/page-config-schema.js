const AppError = require('../utils/app-error');

const VALID_TYPES = new Set(['banner', 'series', 'products', 'custom']);
const VALID_SOURCES = new Set(['static', 'api']);

function assertString(value, message, maxLength = 120) {
  if (typeof value !== 'string' || !value.trim() || value.length > maxLength) {
    throw new AppError(400, message);
  }
}

function validatePageConfigPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new AppError(400, '配置体必须是对象');
  }

  if (!Number.isInteger(payload.version) || payload.version < 0) {
    throw new AppError(400, 'version 必须是大于等于 0 的整数');
  }

  if (!Array.isArray(payload.sections)) {
    throw new AppError(400, 'sections 必须是数组');
  }

  payload.sections.forEach((section, index) => {
    if (!section || typeof section !== 'object' || Array.isArray(section)) {
      throw new AppError(400, `sections[${index}] 必须是对象`);
    }

    assertString(section.id, `sections[${index}].id 非法`, 64);
    assertString(section.type, `sections[${index}].type 非法`, 32);

    if (!VALID_TYPES.has(section.type)) {
      throw new AppError(400, `sections[${index}].type 不支持`);
    }

    if (typeof section.enabled !== 'boolean') {
      throw new AppError(400, `sections[${index}].enabled 必须是布尔值`);
    }

    assertString(section.title, `sections[${index}].title 非法`, 40);

    if (!section.data || typeof section.data !== 'object' || Array.isArray(section.data)) {
      throw new AppError(400, `sections[${index}].data 必须是对象`);
    }

    if (!VALID_SOURCES.has(section.data.source)) {
      throw new AppError(400, `sections[${index}].data.source 不支持`);
    }

    if (section.data.source === 'api') {
      assertString(section.data.api, `sections[${index}].data.api 非法`, 100);
    }
  });
}

module.exports = {
  validatePageConfigPayload
};
