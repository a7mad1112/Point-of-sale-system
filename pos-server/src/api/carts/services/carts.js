'use strict';

/**
 * carts service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::carts.carts');
