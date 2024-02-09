const { JSDOM } = require('jsdom');
const jquery = require('jquery');

const { window } = new JSDOM('');
const $ = jquery(window);

global.$ = $;
global.window = window;
global.document = window.document;
