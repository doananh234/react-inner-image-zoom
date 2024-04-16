"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ZoomImage = function ZoomImage(_ref) {
  var src = _ref.src,
    fadeDuration = _ref.fadeDuration,
    top = _ref.top,
    left = _ref.left,
    isZoomed = _ref.isZoomed,
    onLoad = _ref.onLoad,
    onDragStart = _ref.onDragStart,
    onDragEnd = _ref.onDragEnd,
    onClose = _ref.onClose,
    onFadeOut = _ref.onFadeOut;
  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("img", {
    className: "iiz__zoom-img " + (isZoomed ? 'iiz__zoom-img--visible' : ''),
    style: {
      top: top,
      left: left,
      transition: "opacity " + fadeDuration + "ms linear, visibility " + fadeDuration + "ms linear"
    },
    src: src,
    onLoad: onLoad,
    onTouchStart: onDragStart,
    onTouchEnd: onDragEnd,
    onMouseDown: onDragStart,
    onMouseUp: onDragEnd,
    onTransitionEnd: onFadeOut,
    draggable: "false",
    alt: ""
  }), onClose && /*#__PURE__*/_react["default"].createElement("button", {
    className: "iiz__btn iiz__close " + (isZoomed ? 'iiz__close--visible' : ''),
    style: {
      transition: "opacity " + fadeDuration + "ms linear, visibility " + fadeDuration + "ms linear"
    },
    onClick: onClose,
    "aria-label": "Zoom Out"
  }));
};
ZoomImage.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes["default"].string,
  fadeDuration: _propTypes["default"].number,
  top: _propTypes["default"].number,
  left: _propTypes["default"].number,
  isZoomed: _propTypes["default"].bool,
  onLoad: _propTypes["default"].func,
  onDragStart: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  onFadeOut: _propTypes["default"].func
} : {};
var _default = exports["default"] = ZoomImage;
module.exports = exports.default;