"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/manageRuns",{

/***/ "./src/components/localStorage.ts":
/*!****************************************!*\
  !*** ./src/components/localStorage.ts ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   storeDataInLocalStorage: function() { return /* binding */ storeDataInLocalStorage; }\n/* harmony export */ });\nconst storeDataInLocalStorage = (key, data)=>{\n    // Check if the key already exists in local storage\n    if (localStorage.getItem(key)) {\n        return \"Key already exists in local storage.\";\n    }\n    // If the key doesn't exist, store the data\n    localStorage.setItem(key, data);\n    return null; // No error, data stored successfully\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9sb2NhbFN0b3JhZ2UudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLDBCQUEwQixDQUFDQyxLQUFhQztJQUM1QyxtREFBbUQ7SUFDbkQsSUFBSUMsYUFBYUMsT0FBTyxDQUFDSCxNQUFNO1FBQzdCLE9BQU87SUFDVDtJQUVBLDJDQUEyQztJQUMzQ0UsYUFBYUUsT0FBTyxDQUFDSixLQUFLQztJQUUxQixPQUFPLE1BQU0scUNBQXFDO0FBQ3BEO0FBRW1DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2xvY2FsU3RvcmFnZS50cz84NTVjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0b3JlRGF0YUluTG9jYWxTdG9yYWdlID0gKGtleTogc3RyaW5nLCBkYXRhOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgLy8gQ2hlY2sgaWYgdGhlIGtleSBhbHJlYWR5IGV4aXN0cyBpbiBsb2NhbCBzdG9yYWdlXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XG4gICAgcmV0dXJuIFwiS2V5IGFscmVhZHkgZXhpc3RzIGluIGxvY2FsIHN0b3JhZ2UuXCI7XG4gIH1cblxuICAvLyBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3QsIHN0b3JlIHRoZSBkYXRhXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZGF0YSk7XG5cbiAgcmV0dXJuIG51bGw7IC8vIE5vIGVycm9yLCBkYXRhIHN0b3JlZCBzdWNjZXNzZnVsbHlcbn07XG5cbmV4cG9ydCB7IHN0b3JlRGF0YUluTG9jYWxTdG9yYWdlIH07XG4iXSwibmFtZXMiOlsic3RvcmVEYXRhSW5Mb2NhbFN0b3JhZ2UiLCJrZXkiLCJkYXRhIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNldEl0ZW0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/localStorage.ts\n"));

/***/ }),

/***/ "./src/components/modals/CreateAppListModal.tsx":
/*!******************************************************!*\
  !*** ./src/components/modals/CreateAppListModal.tsx ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../localStorage */ \"./src/components/localStorage.ts\");\n\nvar _s = $RefreshSig$();\n\n\nconst CreateAppListModal = (param)=>{\n    let { isOpen, currentNames, onClose } = param;\n    _s();\n    const [list, setList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        listname: \"\",\n        driveURL: \"\",\n        playstore: false,\n        apps: \"\"\n    });\n    const onChangeName = (text)=>{\n        const cList = {\n            ...list\n        };\n        cList[\"listname\"] = text;\n        setList(cList);\n    };\n    const onChangeApps = (text)=>{\n        const cList = {\n            ...list\n        };\n        cList[\"apps\"] = text;\n        setList(cList);\n    };\n    const onChangeDriveURL = (text)=>{\n        const cList = {\n            ...list\n        };\n        cList[\"driveURL\"] = text;\n        setList(cList);\n    };\n    const createList = ()=>{\n        if (list.listname && list.apps) {\n            // Ensure list does not already exist.\n            if (currentNames.indexOf(list.listname.toLocaleLowerCase().replaceAll(\" \", \"\")) >= 0) return alert(\"List with \".concat(list.listname, \" already exists!\"));\n            try {\n                console.log(\"Creating: \", list);\n                if ((0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.storeDataInLocalStorage)(list.listname, list.apps)) {\n                    console.log(\"\");\n                    throw new Error(\"Failed to create list\");\n                }\n                console.log(\"Created app list!\");\n            } catch (err) {\n                alert(\"Failed to create app list: \".concat(err.toString()));\n            }\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"fixed inset-0 z-50 flex items-center justify-center\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"fixed inset-0 bg-gray-900 opacity-70\",\n                    onClick: onClose\n                }, void 0, false, {\n                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                    lineNumber: 65,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"z-50 flex h-[650px] w-[600px] flex-col justify-between rounded-md bg-white p-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"mb-2 justify-center text-center  text-lg font-bold\",\n                            children: \"App Val\"\n                        }, void 0, false, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                            lineNumber: 70,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            className: \"text-center font-bold\",\n                            children: \"Create App List\"\n                        }, void 0, false, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                            lineNumber: 73,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex flex-col justify-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"pb-1 pt-4 font-light\",\n                                    children: \"List name\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 76,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    className: \"bg-slate-300  font-light\",\n                                    placeholder: \"List name\",\n                                    value: list.listname,\n                                    onChange: (event)=>onChangeName(event.target.value)\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 77,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"pb-1 pt-4 font-light\",\n                                    children: \"Drive URL\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    className: \"bg-slate-300  font-light\",\n                                    placeholder: \"Drive URL\",\n                                    value: list.driveURL,\n                                    onChange: (event)=>onChangeDriveURL(event.target.value)\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 86,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"pb-1 pt-4 font-light\",\n                                    children: \"Apps\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 94,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                    className: \"bg-slate-300 pl-1  font-light\",\n                                    rows: 9,\n                                    cols: 80,\n                                    placeholder: \"Apps\",\n                                    value: list.apps,\n                                    onChange: (event)=>onChangeApps(event.target.value)\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 95,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                            lineNumber: 75,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex w-full justify-around\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: onClose,\n                                    className: \"w-1/3 rounded  bg-slate-600 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800\",\n                                    children: \"Cancel\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 108,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>createList(),\n                                    className: \"w-1/3 rounded  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700\",\n                                    children: \"Create\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                                    lineNumber: 114,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                            lineNumber: 107,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n                    lineNumber: 69,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/CreateAppListModal.tsx\",\n            lineNumber: 64,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false);\n};\n_s(CreateAppListModal, \"qcOjaiB0ckQxxelnjRnICtsF85Y=\");\n_c = CreateAppListModal;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CreateAppListModal);\nvar _c;\n$RefreshReg$(_c, \"CreateAppListModal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9tb2RhbHMvQ3JlYXRlQXBwTGlzdE1vZGFsLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE2RTtBQUVuQjtBQU8xRCxNQUFNRSxxQkFBd0Q7UUFBQyxFQUM3REMsTUFBTSxFQUNOQyxZQUFZLEVBQ1pDLE9BQU8sRUFDUjs7SUFDQyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1AsK0NBQVFBLENBQWU7UUFDN0NRLFVBQVU7UUFDVkMsVUFBVTtRQUNWQyxXQUFXO1FBQ1hDLE1BQU07SUFDUjtJQUVBLE1BQU1DLGVBQWUsQ0FBQ0M7UUFDcEIsTUFBTUMsUUFBc0I7WUFBRSxHQUFHUixJQUFJO1FBQUM7UUFDdENRLEtBQUssQ0FBQyxXQUFXLEdBQUdEO1FBQ3BCTixRQUFRTztJQUNWO0lBQ0EsTUFBTUMsZUFBZSxDQUFDRjtRQUNwQixNQUFNQyxRQUFzQjtZQUFFLEdBQUdSLElBQUk7UUFBQztRQUN0Q1EsS0FBSyxDQUFDLE9BQU8sR0FBR0Q7UUFDaEJOLFFBQVFPO0lBQ1Y7SUFDQSxNQUFNRSxtQkFBbUIsQ0FBQ0g7UUFDeEIsTUFBTUMsUUFBc0I7WUFBRSxHQUFHUixJQUFJO1FBQUM7UUFDdENRLEtBQUssQ0FBQyxXQUFXLEdBQUdEO1FBQ3BCTixRQUFRTztJQUNWO0lBRUEsTUFBTUcsYUFBYTtRQUNqQixJQUFJWCxLQUFLRSxRQUFRLElBQUlGLEtBQUtLLElBQUksRUFBRTtZQUM5QixzQ0FBc0M7WUFDdEMsSUFDRVAsYUFBYWMsT0FBTyxDQUNsQlosS0FBS0UsUUFBUSxDQUFDVyxpQkFBaUIsR0FBR0MsVUFBVSxDQUFDLEtBQUssUUFDL0MsR0FFTCxPQUFPQyxNQUFNLGFBQTJCLE9BQWRmLEtBQUtFLFFBQVEsRUFBQztZQUMxQyxJQUFJO2dCQUNGYyxRQUFRQyxHQUFHLENBQUMsY0FBY2pCO2dCQUUxQixJQUFJTCxzRUFBdUJBLENBQUNLLEtBQUtFLFFBQVEsRUFBRUYsS0FBS0ssSUFBSSxHQUFHO29CQUNyRFcsUUFBUUMsR0FBRyxDQUFDO29CQUNaLE1BQU0sSUFBSUMsTUFBTTtnQkFDbEI7Z0JBQ0FGLFFBQVFDLEdBQUcsQ0FBQztZQUNkLEVBQUUsT0FBT0UsS0FBSztnQkFDWkosTUFBTSw4QkFBeUQsT0FBM0IsSUFBZ0JLLFFBQVE7WUFDOUQ7UUFDRjtJQUNGO0lBRUEscUJBQ0U7a0JBQ0d2Qix3QkFDQyw4REFBQ3dCO1lBQUlDLFdBQVU7OzhCQUNiLDhEQUFDRDtvQkFDQ0MsV0FBVTtvQkFDVkMsU0FBU3hCOzs7Ozs7OEJBRVgsOERBQUNzQjtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNFOzRCQUFHRixXQUFVO3NDQUFxRDs7Ozs7O3NDQUduRSw4REFBQ0c7NEJBQUdILFdBQVU7c0NBQXdCOzs7Ozs7c0NBRXRDLDhEQUFDRDs0QkFBSUMsV0FBVTs7OENBQ2IsOERBQUNJO29DQUFFSixXQUFVOzhDQUF1Qjs7Ozs7OzhDQUNwQyw4REFBQ0s7b0NBQ0NMLFdBQVU7b0NBQ1ZNLGFBQVk7b0NBQ1pDLE9BQU83QixLQUFLRSxRQUFRO29DQUNwQjRCLFVBQVUsQ0FBQ0MsUUFDVHpCLGFBQWF5QixNQUFNQyxNQUFNLENBQUNILEtBQUs7Ozs7Ozs4Q0FHbkMsOERBQUNIO29DQUFFSixXQUFVOzhDQUF1Qjs7Ozs7OzhDQUNwQyw4REFBQ0s7b0NBQ0NMLFdBQVU7b0NBQ1ZNLGFBQVk7b0NBQ1pDLE9BQU83QixLQUFLRyxRQUFRO29DQUNwQjJCLFVBQVUsQ0FBQ0MsUUFDVHJCLGlCQUFpQnFCLE1BQU1DLE1BQU0sQ0FBQ0gsS0FBSzs7Ozs7OzhDQUd2Qyw4REFBQ0g7b0NBQUVKLFdBQVU7OENBQXVCOzs7Ozs7OENBQ3BDLDhEQUFDVztvQ0FDQ1gsV0FBVTtvQ0FDVlksTUFBTTtvQ0FDTkMsTUFBTTtvQ0FDTlAsYUFBWTtvQ0FDWkMsT0FBTzdCLEtBQUtLLElBQUk7b0NBQ2hCeUIsVUFBVSxDQUFDQyxRQUNUdEIsYUFBYXNCLE1BQU1DLE1BQU0sQ0FBQ0gsS0FBSzs7Ozs7Ozs7Ozs7O3NDQUtyQyw4REFBQ1I7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDYztvQ0FDQ2IsU0FBU3hCO29DQUNUdUIsV0FBVTs4Q0FDWDs7Ozs7OzhDQUdELDhEQUFDYztvQ0FDQ2IsU0FBUyxJQUFNWjtvQ0FDZlcsV0FBVTs4Q0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNmO0dBcEhNMUI7S0FBQUE7QUFzSE4sK0RBQWVBLGtCQUFrQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9tb2RhbHMvQ3JlYXRlQXBwTGlzdE1vZGFsLnRzeD9mYzY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZUV2ZW50LCBDaGFuZ2VFdmVudEhhbmRsZXIsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJ+L3V0aWxzL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmVEYXRhSW5Mb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi4vbG9jYWxTdG9yYWdlXCI7XG5cbmludGVyZmFjZSBDcmVhdGVBcHBMaXN0TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgY3VycmVudE5hbWVzOiBzdHJpbmdbXTtcbiAgb25DbG9zZSgpOiB2b2lkO1xufVxuY29uc3QgQ3JlYXRlQXBwTGlzdE1vZGFsOiBSZWFjdC5GQzxDcmVhdGVBcHBMaXN0TW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIGN1cnJlbnROYW1lcywgLy8gdG9Mb3dlciAmJiBzcGFjZXMgcmVtb3ZlZC5cbiAgb25DbG9zZSxcbn0pID0+IHtcbiAgY29uc3QgW2xpc3QsIHNldExpc3RdID0gdXNlU3RhdGU8QXBwTGlzdEVudHJ5Pih7XG4gICAgbGlzdG5hbWU6IFwiXCIsXG4gICAgZHJpdmVVUkw6IFwiXCIsXG4gICAgcGxheXN0b3JlOiBmYWxzZSxcbiAgICBhcHBzOiBcIlwiLFxuICB9IGFzIEFwcExpc3RFbnRyeSk7XG5cbiAgY29uc3Qgb25DaGFuZ2VOYW1lID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNMaXN0OiBBcHBMaXN0RW50cnkgPSB7IC4uLmxpc3QgfSBhcyBBcHBMaXN0RW50cnk7XG4gICAgY0xpc3RbXCJsaXN0bmFtZVwiXSA9IHRleHQ7XG4gICAgc2V0TGlzdChjTGlzdCk7XG4gIH07XG4gIGNvbnN0IG9uQ2hhbmdlQXBwcyA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjTGlzdDogQXBwTGlzdEVudHJ5ID0geyAuLi5saXN0IH0gYXMgQXBwTGlzdEVudHJ5O1xuICAgIGNMaXN0W1wiYXBwc1wiXSA9IHRleHQ7XG4gICAgc2V0TGlzdChjTGlzdCk7XG4gIH07XG4gIGNvbnN0IG9uQ2hhbmdlRHJpdmVVUkwgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY0xpc3Q6IEFwcExpc3RFbnRyeSA9IHsgLi4ubGlzdCB9IGFzIEFwcExpc3RFbnRyeTtcbiAgICBjTGlzdFtcImRyaXZlVVJMXCJdID0gdGV4dDtcbiAgICBzZXRMaXN0KGNMaXN0KTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVMaXN0ID0gKCkgPT4ge1xuICAgIGlmIChsaXN0Lmxpc3RuYW1lICYmIGxpc3QuYXBwcykge1xuICAgICAgLy8gRW5zdXJlIGxpc3QgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgIGlmIChcbiAgICAgICAgY3VycmVudE5hbWVzLmluZGV4T2YoXG4gICAgICAgICAgbGlzdC5saXN0bmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpXG4gICAgICAgICkgPj0gMFxuICAgICAgKVxuICAgICAgICByZXR1cm4gYWxlcnQoYExpc3Qgd2l0aCAke2xpc3QubGlzdG5hbWV9IGFscmVhZHkgZXhpc3RzIWApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGluZzogXCIsIGxpc3QpO1xuXG4gICAgICAgIGlmIChzdG9yZURhdGFJbkxvY2FsU3RvcmFnZShsaXN0Lmxpc3RuYW1lLCBsaXN0LmFwcHMpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBsaXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCBhcHAgbGlzdCFcIik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgYWxlcnQoYEZhaWxlZCB0byBjcmVhdGUgYXBwIGxpc3Q6ICR7KGVyciBhcyBzdHJpbmcpLnRvU3RyaW5nKCl9YCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctZ3JheS05MDAgb3BhY2l0eS03MFwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInotNTAgZmxleCBoLVs2NTBweF0gdy1bNjAwcHhdIGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiByb3VuZGVkLW1kIGJnLXdoaXRlIHAtNFwiPlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm1iLTIganVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXIgIHRleHQtbGcgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIEFwcCBWYWxcbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgZm9udC1ib2xkXCI+Q3JlYXRlIEFwcCBMaXN0PC9oMz5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInBiLTEgcHQtNCBmb250LWxpZ2h0XCI+TGlzdCBuYW1lPC9wPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS0zMDAgIGZvbnQtbGlnaHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTGlzdCBuYW1lXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bGlzdC5saXN0bmFtZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT5cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlTmFtZShldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwYi0xIHB0LTQgZm9udC1saWdodFwiPkRyaXZlIFVSTDwvcD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtMzAwICBmb250LWxpZ2h0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRyaXZlIFVSTFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2xpc3QuZHJpdmVVUkx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZURyaXZlVVJMKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInBiLTEgcHQtNCBmb250LWxpZ2h0XCI+QXBwczwvcD5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtMzAwIHBsLTEgIGZvbnQtbGlnaHRcIlxuICAgICAgICAgICAgICAgIHJvd3M9ezl9XG4gICAgICAgICAgICAgICAgY29scz17ODB9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBcHBzXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bGlzdC5hcHBzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxUZXh0QXJlYUVsZW1lbnQ+KSA9PlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBcHBzKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBqdXN0aWZ5LWFyb3VuZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEvMyByb3VuZGVkICBiZy1zbGF0ZS02MDAgcHgtNCBweS0yIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTcwMCBmb2N1czpiZy1zbGF0ZS03MDAgYWN0aXZlOmJnLXNsYXRlLTgwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjcmVhdGVMaXN0KCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xLzMgcm91bmRlZCAgYmctYmx1ZS01MDAgcHgtNCBweS0yIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGhvdmVyOmJnLWJsdWUtNzAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIENyZWF0ZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVBcHBMaXN0TW9kYWw7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJzdG9yZURhdGFJbkxvY2FsU3RvcmFnZSIsIkNyZWF0ZUFwcExpc3RNb2RhbCIsImlzT3BlbiIsImN1cnJlbnROYW1lcyIsIm9uQ2xvc2UiLCJsaXN0Iiwic2V0TGlzdCIsImxpc3RuYW1lIiwiZHJpdmVVUkwiLCJwbGF5c3RvcmUiLCJhcHBzIiwib25DaGFuZ2VOYW1lIiwidGV4dCIsImNMaXN0Iiwib25DaGFuZ2VBcHBzIiwib25DaGFuZ2VEcml2ZVVSTCIsImNyZWF0ZUxpc3QiLCJpbmRleE9mIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJyZXBsYWNlQWxsIiwiYWxlcnQiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJlcnIiLCJ0b1N0cmluZyIsImRpdiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJoMiIsImgzIiwicCIsImlucHV0IiwicGxhY2Vob2xkZXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ0ZXh0YXJlYSIsInJvd3MiLCJjb2xzIiwiYnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/modals/CreateAppListModal.tsx\n"));

/***/ })

});