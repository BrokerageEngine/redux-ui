'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "reducer", {
  enumerable: true,
  get: function get() {
    return _actionReducer.default;
  }
});
exports.default = void 0;

var _ui = _interopRequireDefault(require("./ui"));

var _actionReducer = _interopRequireDefault(require("./action-reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _ui.default;
exports.default = _default;