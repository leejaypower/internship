// common의 용도
// base가 되는 schema (extend 해야할 것들?)
// 공통으로 사용하는 schema (Date 와 같은 custom scalar)
// Fragments 가 필요하다면 이곳에..
const fragments = require('./fragment');
const base = require('./base');

module.exports = [fragments, base];
