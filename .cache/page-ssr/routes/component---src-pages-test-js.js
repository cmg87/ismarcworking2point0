"use strict";
exports.id = "component---src-pages-test-js";
exports.ids = ["component---src-pages-test-js"];
exports.modules = {

/***/ "./src/pages/test.js?export=default":
/*!******************************************!*\
  !*** ./src/pages/test.js?export=default ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const TestPage = () => {
  const handleDownload = () => {
    // Create a dummy file URL
    const fileUrl = "https://example.com/path/to/file.pdf";

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "file.pdf";

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger the click event on the link
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: handleDownload
  }, "Download File"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TestPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-test-js.js.map