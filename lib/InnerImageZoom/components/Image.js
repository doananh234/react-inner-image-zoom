"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var Image = function Image(_ref) {
  var src = _ref.src,
    sources = _ref.sources,
    width = _ref.width,
    height = _ref.height,
    hasSpacer = _ref.hasSpacer,
    imgAttributes = _ref.imgAttributes,
    isZoomed = _ref.isZoomed,
    fadeDuration = _ref.fadeDuration;
  var createSpacer = width && height && hasSpacer;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      paddingTop: createSpacer ? height / width * 100 + "%" : null
    }
  }, sources && sources.length > 0 ? /*#__PURE__*/_react["default"].createElement("picture", null, sources.map(function (source, i) {
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: i
    }, source.srcSet && /*#__PURE__*/_react["default"].createElement("source", source));
  }), /*#__PURE__*/_react["default"].createElement("img", _extends({}, imgAttributes, {
    className: "iiz__img " + (imgAttributes.className || '') + " " + (isZoomed ? 'iiz__img--hidden' : '') + " " + (createSpacer ? 'iiz__img--abs' : ''),
    style: {
      transition: "opacity 0ms linear " + (isZoomed ? fadeDuration : 0) + "ms, visibility 0ms linear " + (isZoomed ? fadeDuration : 0) + "ms"
    },
    src: src,
    width: width,
    height: height
  }))) : /*#__PURE__*/_react["default"].createElement("img", _extends({}, imgAttributes, {
    className: "iiz__img " + (imgAttributes.className || '') + " " + (isZoomed ? 'iiz__img--hidden' : '') + " " + (createSpacer ? 'iiz__img--abs' : ''),
    style: {
      transition: "opacity 0ms linear " + (isZoomed ? fadeDuration : 0) + "ms, visibility 0ms linear " + (isZoomed ? fadeDuration : 0) + "ms"
    },
    src: src,
    width: width,
    height: height
  })));
};
Image.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes["default"].string.isRequired,
  sources: _propTypes["default"].array,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  hasSpacer: _propTypes["default"].bool,
  imgAttributes: _propTypes["default"].object,
  fadeDuration: _propTypes["default"].number,
  isZoomed: _propTypes["default"].bool
} : {};
var _default = exports["default"] = Image;
module.exports = exports.default;