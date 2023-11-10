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

/***/ "./src/components/modals/EditAppListModal.tsx":
/*!****************************************************!*\
  !*** ./src/components/modals/EditAppListModal.tsx ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../localStorage */ \"./src/components/localStorage.ts\");\n\nvar _s = $RefreshSig$();\n\n\nfunction unEscapeAppList(escapedList) {\n    return escapedList.replaceAll(\"\\\\n\", \"\\n\").replaceAll(\"\\\\t\", \"\t\");\n}\nconst EditAppListModal = (param)=>{\n    let { isOpen, onClose, listProp } = param;\n    _s();\n    const [list, setList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(listProp ? {\n        ...listProp\n    } : null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        var _listProp, _list;\n        console.log(\"useEffect props: \", listProp);\n        if (((_listProp = listProp) === null || _listProp === void 0 ? void 0 : _listProp.listname) !== ((_list = list) === null || _list === void 0 ? void 0 : _list.listname) && listProp !== null && listProp !== undefined) setList({\n            ...listProp\n        });\n    }, [\n        listProp\n    ]);\n    const onChange = (text)=>{\n        const cList = {\n            ...list\n        };\n        cList[\"apps\"] = text;\n        setList(cList);\n    };\n    const onChangeDriveURL = (text)=>{\n        const cList = {\n            ...list\n        };\n        cList[\"driveURL\"] = text;\n        setList(cList);\n    };\n    const updateList = ()=>{\n        if (list && list.listname) {\n            if (!list.driveURL && !list.apps) {\n                return alert(\"Entry must have either Folder ID or List of apps!\");\n            }\n            try {\n                console.log(\"Updating: \", list);\n                (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.updateAppListInLocalStorage)(list.listname, list.apps);\n                onClose();\n            } catch (err) {\n                alert(\"Failed to create app list: \".concat(err.toString()));\n            }\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"fixed inset-0 z-50 flex items-center justify-center\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"fixed inset-0 bg-gray-900 opacity-70\",\n                    onClick: onClose\n                }, void 0, false, {\n                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                    lineNumber: 65,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"z-50 flex h-[475px] w-[600px] flex-col justify-between rounded-md bg-white p-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"mb-2 justify-center text-center  text-lg font-bold\",\n                            children: \"App Val\"\n                        }, void 0, false, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                            lineNumber: 70,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            className: \"text-center font-bold\",\n                            children: \"Update App List\"\n                        }, void 0, false, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                            lineNumber: 73,\n                            columnNumber: 13\n                        }, undefined),\n                        list !== null && list !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex flex-col justify-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"font-medium\",\n                                    children: [\n                                        \"Editing: \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"font-light\",\n                                            children: list.listname\n                                        }, void 0, false, {\n                                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                            lineNumber: 78,\n                                            columnNumber: 28\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                    lineNumber: 77,\n                                    columnNumber: 17\n                                }, undefined),\n                                list.playstore ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"font-medium\",\n                                    children: [\n                                        \"Folder:\",\n                                        \" \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                            className: \"w-full  bg-slate-300 font-light\",\n                                            placeholder: \"Drive URL\",\n                                            value: list.driveURL,\n                                            onChange: (event)=>onChangeDriveURL(event.target.value)\n                                        }, void 0, false, {\n                                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                            lineNumber: 85,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                    lineNumber: 83,\n                                    columnNumber: 19\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"pb-1 pt-4 font-light\",\n                                    children: \"Apps\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                    lineNumber: 96,\n                                    columnNumber: 17\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                    className: \"bg-slate-300 pl-1\",\n                                    rows: 9,\n                                    cols: 80,\n                                    placeholder: \"Apps\",\n                                    value: unEscapeAppList(list.apps),\n                                    onChange: (event)=>onChange(event.target.value)\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                    lineNumber: 98,\n                                    columnNumber: 17\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                            lineNumber: 76,\n                            columnNumber: 15\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: \"Select list to edit\"\n                        }, void 0, false, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                            lineNumber: 110,\n                            columnNumber: 15\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex w-full justify-around\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: onClose,\n                                    className: \"w-1/3 rounded  bg-slate-600 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800\",\n                                    children: \"Cancel\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                    lineNumber: 114,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>updateList(),\n                                    className: \"w-1/3 rounded  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700\",\n                                    children: \"Update\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                                    lineNumber: 120,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                            lineNumber: 113,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n                    lineNumber: 69,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/modals/EditAppListModal.tsx\",\n            lineNumber: 64,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false);\n};\n_s(EditAppListModal, \"00q7A2pw01j2j39c05tpvmcNGTg=\");\n_c = EditAppListModal;\n/* harmony default export */ __webpack_exports__[\"default\"] = (EditAppListModal);\nvar _c;\n$RefreshReg$(_c, \"EditAppListModal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9tb2RhbHMvRWRpdEFwcExpc3RNb2RhbC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBNkU7QUFFZjtBQVE5RCxTQUFTRyxnQkFBZ0JDLFdBQW1CO0lBQzFDLE9BQU9BLFlBQVlDLFVBQVUsQ0FBQyxPQUFPLE1BQU1BLFVBQVUsQ0FBQyxPQUFPO0FBQy9EO0FBRUEsTUFBTUMsbUJBQW9EO1FBQUMsRUFDekRDLE1BQU0sRUFDTkMsT0FBTyxFQUNQQyxRQUFRLEVBQ1Q7O0lBQ0MsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdWLCtDQUFRQSxDQUM5QlEsV0FBVztRQUFFLEdBQUdBLFFBQVE7SUFBQyxJQUFJO0lBRy9CVCxnREFBU0EsQ0FBQztZQUdOUyxXQUF1QkM7UUFGekJFLFFBQVFDLEdBQUcsQ0FBQyxxQkFBcUJKO1FBQ2pDLElBQ0VBLEVBQUFBLFlBQUFBLHNCQUFBQSxnQ0FBQUEsVUFBVUssUUFBUSxRQUFLSixRQUFBQSxrQkFBQUEsNEJBQUFBLE1BQU1JLFFBQVEsS0FDckNMLGFBQWEsUUFDYkEsYUFBYU0sV0FFYkosUUFBUTtZQUFFLEdBQUdGLFFBQVE7UUFBQztJQUMxQixHQUFHO1FBQUNBO0tBQVM7SUFFYixNQUFNTyxXQUFXLENBQUNDO1FBQ2hCLE1BQU1DLFFBQXNCO1lBQUUsR0FBR1IsSUFBSTtRQUFDO1FBQ3RDUSxLQUFLLENBQUMsT0FBTyxHQUFHRDtRQUNoQk4sUUFBUU87SUFDVjtJQUVBLE1BQU1DLG1CQUFtQixDQUFDRjtRQUN4QixNQUFNQyxRQUFzQjtZQUFFLEdBQUdSLElBQUk7UUFBQztRQUN0Q1EsS0FBSyxDQUFDLFdBQVcsR0FBR0Q7UUFDcEJOLFFBQVFPO0lBQ1Y7SUFFQSxNQUFNRSxhQUFhO1FBQ2pCLElBQUlWLFFBQVFBLEtBQUtJLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUNKLEtBQUtXLFFBQVEsSUFBSSxDQUFDWCxLQUFLWSxJQUFJLEVBQUU7Z0JBQ2hDLE9BQU9DLE1BQU07WUFDZjtZQUNBLElBQUk7Z0JBQ0ZYLFFBQVFDLEdBQUcsQ0FBQyxjQUFjSDtnQkFDMUJSLDBFQUEyQkEsQ0FBQ1EsS0FBS0ksUUFBUSxFQUFFSixLQUFLWSxJQUFJO2dCQUNwRGQ7WUFDRixFQUFFLE9BQU9nQixLQUFLO2dCQUNaRCxNQUFNLDhCQUF5RCxPQUEzQixJQUFnQkUsUUFBUTtZQUM5RDtRQUNGO0lBQ0Y7SUFFQSxxQkFDRTtrQkFDR2xCLHdCQUNDLDhEQUFDbUI7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNEO29CQUNDQyxXQUFVO29CQUNWQyxTQUFTcEI7Ozs7Ozs4QkFFWCw4REFBQ2tCO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ0U7NEJBQUdGLFdBQVU7c0NBQXFEOzs7Ozs7c0NBR25FLDhEQUFDRzs0QkFBR0gsV0FBVTtzQ0FBd0I7Ozs7Ozt3QkFFckNqQixTQUFTLFFBQVFBLFNBQVNLLDBCQUN6Qiw4REFBQ1c7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDSTtvQ0FBRUosV0FBVTs7d0NBQWM7c0RBQ2hCLDhEQUFDSzs0Q0FBS0wsV0FBVTtzREFBY2pCLEtBQUtJLFFBQVE7Ozs7Ozs7Ozs7OztnQ0FFckRKLEtBQUt1QixTQUFTLGlCQUNiLDhKQUVBLDhEQUFDRjtvQ0FBRUosV0FBVTs7d0NBQWM7d0NBQ2pCO3NEQUNSLDhEQUFDTzs0Q0FDQ1AsV0FBVTs0Q0FDVlEsYUFBWTs0Q0FDWkMsT0FBTzFCLEtBQUtXLFFBQVE7NENBQ3BCTCxVQUFVLENBQUNxQixRQUNUbEIsaUJBQWlCa0IsTUFBTUMsTUFBTSxDQUFDRixLQUFLOzs7Ozs7Ozs7Ozs7OENBTTNDLDhEQUFDTDtvQ0FBRUosV0FBVTs4Q0FBdUI7Ozs7Ozs4Q0FFcEMsOERBQUNZO29DQUNDWixXQUFVO29DQUNWYSxNQUFNO29DQUNOQyxNQUFNO29DQUNOTixhQUFZO29DQUNaQyxPQUFPakMsZ0JBQWdCTyxLQUFLWSxJQUFJO29DQUNoQ04sVUFBVSxDQUFDcUIsUUFDVHJCLFNBQVNxQixNQUFNQyxNQUFNLENBQUNGLEtBQUs7Ozs7Ozs7Ozs7O3NEQUtqQyw4REFBQ0w7c0NBQUU7Ozs7OztzQ0FHTCw4REFBQ0w7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDZTtvQ0FDQ2QsU0FBU3BCO29DQUNUbUIsV0FBVTs4Q0FDWDs7Ozs7OzhDQUdELDhEQUFDZTtvQ0FDQ2QsU0FBUyxJQUFNUjtvQ0FDZk8sV0FBVTs4Q0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNmO0dBckhNckI7S0FBQUE7QUF1SE4sK0RBQWVBLGdCQUFnQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9tb2RhbHMvRWRpdEFwcExpc3RNb2RhbC50c3g/NTFiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VFdmVudCwgQ2hhbmdlRXZlbnRIYW5kbGVyLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwifi91dGlscy9hcGlcIjtcbmltcG9ydCB7IHVwZGF0ZUFwcExpc3RJbkxvY2FsU3RvcmFnZSB9IGZyb20gXCIuLi9sb2NhbFN0b3JhZ2VcIjtcblxuaW50ZXJmYWNlIEVkaXRBcHBMaXN0TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZSgpOiB2b2lkO1xuICBsaXN0UHJvcDogQXBwTGlzdEVudHJ5IHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gdW5Fc2NhcGVBcHBMaXN0KGVzY2FwZWRMaXN0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZXNjYXBlZExpc3QucmVwbGFjZUFsbChcIlxcXFxuXCIsIFwiXFxuXCIpLnJlcGxhY2VBbGwoXCJcXFxcdFwiLCBcIlxcdFwiKTtcbn1cblxuY29uc3QgRWRpdEFwcExpc3RNb2RhbDogUmVhY3QuRkM8RWRpdEFwcExpc3RNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbiAgbGlzdFByb3AsXG59KSA9PiB7XG4gIGNvbnN0IFtsaXN0LCBzZXRMaXN0XSA9IHVzZVN0YXRlPEFwcExpc3RFbnRyeSB8IG51bGw+KFxuICAgIGxpc3RQcm9wID8geyAuLi5saXN0UHJvcCB9IDogbnVsbFxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ1c2VFZmZlY3QgcHJvcHM6IFwiLCBsaXN0UHJvcCk7XG4gICAgaWYgKFxuICAgICAgbGlzdFByb3A/Lmxpc3RuYW1lICE9PSBsaXN0Py5saXN0bmFtZSAmJlxuICAgICAgbGlzdFByb3AgIT09IG51bGwgJiZcbiAgICAgIGxpc3RQcm9wICE9PSB1bmRlZmluZWRcbiAgICApXG4gICAgICBzZXRMaXN0KHsgLi4ubGlzdFByb3AgfSk7XG4gIH0sIFtsaXN0UHJvcF0pO1xuXG4gIGNvbnN0IG9uQ2hhbmdlID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNMaXN0OiBBcHBMaXN0RW50cnkgPSB7IC4uLmxpc3QgfSBhcyBBcHBMaXN0RW50cnk7XG4gICAgY0xpc3RbXCJhcHBzXCJdID0gdGV4dDtcbiAgICBzZXRMaXN0KGNMaXN0KTtcbiAgfTtcblxuICBjb25zdCBvbkNoYW5nZURyaXZlVVJMID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGNMaXN0OiBBcHBMaXN0RW50cnkgPSB7IC4uLmxpc3QgfSBhcyBBcHBMaXN0RW50cnk7XG4gICAgY0xpc3RbXCJkcml2ZVVSTFwiXSA9IHRleHQ7XG4gICAgc2V0TGlzdChjTGlzdCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlTGlzdCA9ICgpID0+IHtcbiAgICBpZiAobGlzdCAmJiBsaXN0Lmxpc3RuYW1lKSB7XG4gICAgICBpZiAoIWxpc3QuZHJpdmVVUkwgJiYgIWxpc3QuYXBwcykge1xuICAgICAgICByZXR1cm4gYWxlcnQoXCJFbnRyeSBtdXN0IGhhdmUgZWl0aGVyIEZvbGRlciBJRCBvciBMaXN0IG9mIGFwcHMhXCIpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZzogXCIsIGxpc3QpO1xuICAgICAgICB1cGRhdGVBcHBMaXN0SW5Mb2NhbFN0b3JhZ2UobGlzdC5saXN0bmFtZSwgbGlzdC5hcHBzKTtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGFsZXJ0KGBGYWlsZWQgdG8gY3JlYXRlIGFwcCBsaXN0OiAkeyhlcnIgYXMgc3RyaW5nKS50b1N0cmluZygpfWApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWdyYXktOTAwIG9wYWNpdHktNzBcIlxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ6LTUwIGZsZXggaC1bNDc1cHhdIHctWzYwMHB4XSBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcm91bmRlZC1tZCBiZy13aGl0ZSBwLTRcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJtYi0yIGp1c3RpZnktY2VudGVyIHRleHQtY2VudGVyICB0ZXh0LWxnIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICBBcHAgVmFsXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGZvbnQtYm9sZFwiPlVwZGF0ZSBBcHAgTGlzdDwvaDM+XG5cbiAgICAgICAgICAgIHtsaXN0ICE9PSBudWxsICYmIGxpc3QgIT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgIEVkaXRpbmc6IDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGlnaHRcIj57bGlzdC5saXN0bmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIHtsaXN0LnBsYXlzdG9yZSA/IChcbiAgICAgICAgICAgICAgICAgIDw+PC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgIEZvbGRlcjp7XCIgXCJ9XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCAgYmctc2xhdGUtMzAwIGZvbnQtbGlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRHJpdmUgVVJMXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGlzdC5kcml2ZVVSTH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlRHJpdmVVUkwoZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicGItMSBwdC00IGZvbnQtbGlnaHRcIj5BcHBzPC9wPlxuXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS0zMDAgcGwtMVwiXG4gICAgICAgICAgICAgICAgICByb3dzPXs5fVxuICAgICAgICAgICAgICAgICAgY29scz17ODB9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwcHNcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3VuRXNjYXBlQXBwTGlzdChsaXN0LmFwcHMpfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudDogQ2hhbmdlRXZlbnQ8SFRNTFRleHRBcmVhRWxlbWVudD4pID0+XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxwPlNlbGVjdCBsaXN0IHRvIGVkaXQ8L3A+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggdy1mdWxsIGp1c3RpZnktYXJvdW5kXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMS8zIHJvdW5kZWQgIGJnLXNsYXRlLTYwMCBweC00IHB5LTIgZm9udC1ib2xkIHRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtNzAwIGZvY3VzOmJnLXNsYXRlLTcwMCBhY3RpdmU6Ymctc2xhdGUtODAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZUxpc3QoKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEvMyByb3VuZGVkICBiZy1ibHVlLTUwMCBweC00IHB5LTIgZm9udC1ib2xkIHRleHQtd2hpdGUgaG92ZXI6YmctYmx1ZS03MDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgVXBkYXRlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRBcHBMaXN0TW9kYWw7XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1cGRhdGVBcHBMaXN0SW5Mb2NhbFN0b3JhZ2UiLCJ1bkVzY2FwZUFwcExpc3QiLCJlc2NhcGVkTGlzdCIsInJlcGxhY2VBbGwiLCJFZGl0QXBwTGlzdE1vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsImxpc3RQcm9wIiwibGlzdCIsInNldExpc3QiLCJjb25zb2xlIiwibG9nIiwibGlzdG5hbWUiLCJ1bmRlZmluZWQiLCJvbkNoYW5nZSIsInRleHQiLCJjTGlzdCIsIm9uQ2hhbmdlRHJpdmVVUkwiLCJ1cGRhdGVMaXN0IiwiZHJpdmVVUkwiLCJhcHBzIiwiYWxlcnQiLCJlcnIiLCJ0b1N0cmluZyIsImRpdiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJoMiIsImgzIiwicCIsInNwYW4iLCJwbGF5c3RvcmUiLCJpbnB1dCIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJldmVudCIsInRhcmdldCIsInRleHRhcmVhIiwicm93cyIsImNvbHMiLCJidXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/modals/EditAppListModal.tsx\n"));

/***/ })

});