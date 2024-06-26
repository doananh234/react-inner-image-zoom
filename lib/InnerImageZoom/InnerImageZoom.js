"use strict";
"use client";

exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Image = _interopRequireDefault(require("./components/Image"));
var _ZoomImage = _interopRequireDefault(require("./components/ZoomImage"));
var _FullscreenPortal = _interopRequireDefault(require("./components/FullscreenPortal"));
var _this = void 0;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var InnerImageZoom = function InnerImageZoom(_ref) {
  var _ref$moveType = _ref.moveType,
    moveType = _ref$moveType === void 0 ? 'pan' : _ref$moveType,
    _ref$zoomType = _ref.zoomType,
    zoomType = _ref$zoomType === void 0 ? 'click' : _ref$zoomType,
    src = _ref.src,
    sources = _ref.sources,
    width = _ref.width,
    height = _ref.height,
    hasSpacer = _ref.hasSpacer,
    _ref$imgAttributes = _ref.imgAttributes,
    imgAttributes = _ref$imgAttributes === void 0 ? {} : _ref$imgAttributes,
    zoomSrc = _ref.zoomSrc,
    _ref$zoomScale = _ref.zoomScale,
    zoomScale = _ref$zoomScale === void 0 ? 1 : _ref$zoomScale,
    zoomPreload = _ref.zoomPreload,
    _ref$fadeDuration = _ref.fadeDuration,
    fadeDuration = _ref$fadeDuration === void 0 ? 150 : _ref$fadeDuration,
    fullscreenOnMobile = _ref.fullscreenOnMobile,
    _ref$mobileBreakpoint = _ref.mobileBreakpoint,
    mobileBreakpoint = _ref$mobileBreakpoint === void 0 ? 640 : _ref$mobileBreakpoint,
    hideCloseButton = _ref.hideCloseButton,
    hideHint = _ref.hideHint,
    className = _ref.className,
    afterZoomIn = _ref.afterZoomIn,
    afterZoomOut = _ref.afterZoomOut;
  var img = (0, _react.useRef)(null);
  var zoomImg = (0, _react.useRef)(null);
  var imgProps = (0, _react.useRef)({});
  var _useState = (0, _react.useState)(zoomPreload),
    isActive = _useState[0],
    setIsActive = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    isTouch = _useState2[0],
    setIsTouch = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    isZoomed = _useState3[0],
    setIsZoomed = _useState3[1];
  var _useState4 = (0, _react.useState)(false),
    isFullscreen = _useState4[0],
    setIsFullscreen = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    isDragging = _useState5[0],
    setIsDragging = _useState5[1];
  var _useState6 = (0, _react.useState)(false),
    isValidDrag = _useState6[0],
    setIsValidDrag = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    isFading = _useState7[0],
    setIsFading = _useState7[1];
  var _useState8 = (0, _react.useState)(moveType),
    currentMoveType = _useState8[0],
    setCurrentMoveType = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    left = _useState9[0],
    setLeft = _useState9[1];
  var _useState10 = (0, _react.useState)(0),
    top = _useState10[0],
    setTop = _useState10[1];
  var handleMouseEnter = function handleMouseEnter(e) {
    setIsActive(true);
    setIsFading(false);
    zoomType === 'hover' && !isZoomed && handleClick(e);
  };
  var handleTouchStart = function handleTouchStart() {
    setIsTouch(true);
    setIsFullscreen(getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint));
    setCurrentMoveType('drag');
  };
  var handleClick = function handleClick(e) {
    if (isZoomed) {
      if (isTouch) {
        hideCloseButton && handleClose(e);
      } else {
        !isValidDrag && zoomOut();
      }
      return;
    }
    isTouch && setIsActive(true);
    if (zoomImg.current) {
      handleLoad({
        target: zoomImg.current
      });
      zoomIn(e.pageX, e.pageY);
    } else {
      imgProps.current.onLoadCallback = zoomIn.bind(_this, e.pageX, e.pageY);
    }
  };
  var handleLoad = function handleLoad(e) {
    var scaledDimensions = getScaledDimensions(e.target, zoomScale);
    zoomImg.current = e.target;
    zoomImg.current.setAttribute('width', scaledDimensions.width);
    zoomImg.current.setAttribute('height', scaledDimensions.height);
    imgProps.current.scaledDimensions = scaledDimensions;
    imgProps.current.bounds = getBounds(img.current, false);
    imgProps.current.ratios = getRatios(imgProps.current.bounds, scaledDimensions);
    if (imgProps.current.onLoadCallback) {
      imgProps.current.onLoadCallback();
      imgProps.current.onLoadCallback = null;
    }
  };
  var handleMouseMove = function handleMouseMove(e) {
    var left = e.pageX - imgProps.current.offsets.x;
    var top = e.pageY - imgProps.current.offsets.y;
    left = Math.max(Math.min(left, imgProps.current.bounds.width), 0);
    top = Math.max(Math.min(top, imgProps.current.bounds.height), 0);
    setLeft(left * -imgProps.current.ratios.x);
    setTop(top * -imgProps.current.ratios.y);
  };
  var handleDragStart = function handleDragStart(e) {
    var pageX = typeof e.pageX === 'number' ? e.pageX : e.changedTouches[0].pageX;
    var pageY = typeof e.pageY === 'number' ? e.pageY : e.changedTouches[0].pageY;
    imgProps.current.offsets = getOffsets(pageX, pageY, zoomImg.current.offsetLeft, zoomImg.current.offsetTop);
    setIsDragging(true);
    if (!isTouch) {
      imgProps.current.eventPosition = {
        x: e.pageX,
        y: e.pageY
      };
    }
  };
  var handleDragMove = (0, _react.useCallback)(function (e) {
    e.stopPropagation();
    var pageX = typeof e.pageX === 'number' ? e.pageX : e.changedTouches[0].pageX;
    var pageY = typeof e.pageY === 'number' ? e.pageY : e.changedTouches[0].pageY;
    var left = pageX - imgProps.current.offsets.x;
    var top = pageY - imgProps.current.offsets.y;
    left = Math.max(Math.min(left, 0), (imgProps.current.scaledDimensions.width - imgProps.current.bounds.width) * -1);
    top = Math.max(Math.min(top, 0), (imgProps.current.scaledDimensions.height - imgProps.current.bounds.height) * -1);
    setLeft(left);
    setTop(top);
  }, []);
  var handleDragEnd = function handleDragEnd(e) {
    setIsDragging(false);
    if (!isTouch) {
      var moveX = Math.abs(e.pageX - imgProps.current.eventPosition.x);
      var moveY = Math.abs(e.pageY - imgProps.current.eventPosition.y);
      setIsValidDrag(moveX > 5 || moveY > 5);
    }
  };
  var handleMouseLeave = function handleMouseLeave(e) {
    currentMoveType === 'drag' && isZoomed ? handleDragEnd(e) : handleClose(e);
  };
  var handleClose = function handleClose(e) {
    if (!(!isTouch && e.target.classList.contains('iiz__close'))) {
      if (!isZoomed || isFullscreen || !fadeDuration) {
        handleFadeOut({}, true);
      } else {
        setIsFading(true);
      }
    }
    zoomOut();
  };
  var handleFadeOut = function handleFadeOut(e, noTransition) {
    if (noTransition || e.propertyName === 'opacity' && img.current.contains(e.target)) {
      if (zoomPreload && isTouch || !zoomPreload) {
        zoomImg.current = null;
        imgProps.current = getDefaults();
        setIsActive(false);
      }
      setIsTouch(false);
      setIsFullscreen(false);
      setCurrentMoveType(moveType);
      setIsFading(false);
    }
  };
  var initialMove = function initialMove(pageX, pageY) {
    imgProps.current.offsets = getOffsets(window.pageXOffset, window.pageYOffset, -imgProps.current.bounds.left, -imgProps.current.bounds.top);
    handleMouseMove({
      pageX: pageX,
      pageY: pageY
    });
  };
  var initialDrag = function initialDrag(pageX, pageY) {
    var initialPageX = (pageX - (window.pageXOffset + imgProps.current.bounds.left)) * -imgProps.current.ratios.x;
    var initialPageY = (pageY - (window.pageYOffset + imgProps.current.bounds.top)) * -imgProps.current.ratios.y;
    initialPageX = initialPageX + (isFullscreen ? (window.innerWidth - imgProps.current.bounds.width) / 2 : 0);
    initialPageY = initialPageY + (isFullscreen ? (window.innerHeight - imgProps.current.bounds.height) / 2 : 0);
    imgProps.current.bounds = getBounds(img.current, isFullscreen);
    imgProps.current.offsets = getOffsets(0, 0, 0, 0);
    handleDragMove({
      changedTouches: [{
        pageX: initialPageX,
        pageY: initialPageY
      }],
      preventDefault: function preventDefault() {},
      stopPropagation: function stopPropagation() {}
    });
  };
  var zoomIn = function zoomIn(pageX, pageY) {
    setIsZoomed(true);
    currentMoveType === 'drag' ? initialDrag(pageX, pageY) : initialMove(pageX, pageY);
    afterZoomIn && afterZoomIn();
  };
  var zoomOut = function zoomOut() {
    setIsZoomed(false);
    afterZoomOut && afterZoomOut();
  };
  var getDefaults = function getDefaults() {
    return {
      onLoadCallback: null,
      bounds: {},
      offsets: {},
      ratios: {},
      eventPosition: {},
      scaledDimensions: {}
    };
  };
  var getBounds = function getBounds(img, isFullscreen) {
    if (isFullscreen) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        left: 0,
        top: 0
      };
    }
    return img.getBoundingClientRect();
  };
  var getOffsets = function getOffsets(pageX, pageY, left, top) {
    return {
      x: pageX - left,
      y: pageY - top
    };
  };
  var getRatios = function getRatios(bounds, dimensions) {
    return {
      x: (dimensions.width - bounds.width) / bounds.width,
      y: (dimensions.height - bounds.height) / bounds.height
    };
  };
  var getFullscreenStatus = function getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) {
    return fullscreenOnMobile && window.matchMedia && window.matchMedia("(max-width: " + mobileBreakpoint + "px)").matches;
  };
  var getScaledDimensions = function getScaledDimensions(zoomImg, zoomScale) {
    return {
      width: zoomImg.naturalWidth * zoomScale,
      height: zoomImg.naturalHeight * zoomScale
    };
  };
  var zoomImageProps = {
    src: zoomSrc || src,
    fadeDuration: isFullscreen ? 0 : fadeDuration,
    top: top,
    left: left,
    isZoomed: isZoomed,
    onLoad: handleLoad,
    onDragStart: currentMoveType === 'drag' ? handleDragStart : null,
    onDragEnd: currentMoveType === 'drag' ? handleDragEnd : null,
    onClose: !hideCloseButton && currentMoveType === 'drag' ? handleClose : null,
    onFadeOut: isFading ? handleFadeOut : null
  };
  (0, _react.useEffect)(function () {
    imgProps.current = getDefaults();
  }, []);
  (0, _react.useEffect)(function () {
    getFullscreenStatus(fullscreenOnMobile, mobileBreakpoint) && setIsActive(false);
  }, [fullscreenOnMobile, mobileBreakpoint]);
  (0, _react.useEffect)(function () {
    if (!zoomImg.current) {
      return;
    }
    var eventType = isTouch ? 'touchmove' : 'mousemove';
    if (isDragging) {
      zoomImg.current.addEventListener(eventType, handleDragMove, {
        passive: true
      });
    } else {
      zoomImg.current.removeEventListener(eventType, handleDragMove);
    }
  }, [isDragging, isTouch, handleDragMove]);
  return /*#__PURE__*/_react["default"].createElement("figure", {
    className: "iiz " + (currentMoveType === 'drag' ? 'iiz--drag' : '') + " " + (className ? className : ''),
    style: {
      width: width
    },
    ref: img,
    onTouchStart: isZoomed ? null : handleTouchStart,
    onClick: handleClick,
    onMouseEnter: isTouch ? null : handleMouseEnter,
    onMouseMove: currentMoveType === 'drag' || !isZoomed ? null : handleMouseMove,
    onMouseLeave: isTouch ? null : handleMouseLeave
  }, /*#__PURE__*/_react["default"].createElement(_Image["default"], {
    src: src,
    sources: sources,
    width: width,
    height: height,
    hasSpacer: hasSpacer,
    imgAttributes: imgAttributes,
    fadeDuration: fadeDuration,
    isZoomed: isZoomed
  }), isActive && /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, isFullscreen ? /*#__PURE__*/_react["default"].createElement(_FullscreenPortal["default"], null, /*#__PURE__*/_react["default"].createElement(_ZoomImage["default"], zoomImageProps)) : /*#__PURE__*/_react["default"].createElement(_ZoomImage["default"], zoomImageProps)), !hideHint && !isZoomed && /*#__PURE__*/_react["default"].createElement("span", {
    className: "iiz__btn iiz__hint"
  }));
};
InnerImageZoom.propTypes = process.env.NODE_ENV !== "production" ? {
  moveType: _propTypes["default"].string,
  zoomType: _propTypes["default"].string,
  src: _propTypes["default"].string.isRequired,
  sources: _propTypes["default"].array,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  hasSpacer: _propTypes["default"].bool,
  imgAttributes: _propTypes["default"].object,
  zoomSrc: _propTypes["default"].string,
  zoomScale: _propTypes["default"].number,
  zoomPreload: _propTypes["default"].bool,
  fadeDuration: _propTypes["default"].number,
  fullscreenOnMobile: _propTypes["default"].bool,
  mobileBreakpoint: _propTypes["default"].number,
  hideCloseButton: _propTypes["default"].bool,
  hideHint: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  afterZoomIn: _propTypes["default"].func,
  afterZoomOut: _propTypes["default"].func
} : {};
var _default = exports["default"] = InnerImageZoom;
module.exports = exports.default;