"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/ProfileMenu.tsx":
/*!****************************************!*\
  !*** ./src/components/ProfileMenu.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nconst ProfileMenu = ()=>{\n    var _sessionData_user, _sessionData_user1;\n    _s();\n    const [showDropdown, setShowDropdown] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n    const ref = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);\n    const iconRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);\n    const { data: sessionData } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        if (ref.current) return;\n        console.log(\"INit\", ref.current);\n        window.document.addEventListener(\"click\", (ev)=>{\n            if (!showDropdown && ev.target !== iconRef.current) {\n                setShowDropdown(false);\n            }\n        });\n        ref.current = true;\n    }, [\n        ref.current\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"z-50 flex  items-center\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"ml-3 flex flex-col items-end\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"button\",\n                        id: \"profileBtn\",\n                        className: \"flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600\",\n                        \"aria-expanded\": \"false\",\n                        \"data-dropdown-toggle\": \"dropdown-user\",\n                        onClick: ()=>{\n                            setShowDropdown(!showDropdown);\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"sr-only\",\n                                children: \"Open user menu\"\n                            }, void 0, false, {\n                                fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                ref: iconRef,\n                                className: \"h-10 w-10 rounded-full\",\n                                src: sessionData && sessionData.user && sessionData.user.image ? sessionData.user.image : \"https://flowbite.com/docs/images/people/profile-picture-5.jpg\",\n                                alt: \"user photo\"\n                            }, void 0, false, {\n                                fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"my-10  \".concat(showDropdown ? \"\" : \"hidden\", \" absolute list-none divide-y divide-gray-100 rounded bg-slate-900 text-base  shadow \"),\n                    id: \"dropdown-user\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"px-4 py-3\",\n                            role: \"none\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-sm text-white \",\n                                    role: \"none\",\n                                    children: sessionData ? (_sessionData_user = sessionData.user) === null || _sessionData_user === void 0 ? void 0 : _sessionData_user.name : \"not signed in\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                                    lineNumber: 56,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"truncate text-sm font-medium text-slate-500\",\n                                    role: \"none\",\n                                    children: sessionData ? (_sessionData_user1 = sessionData.user) === null || _sessionData_user1 === void 0 ? void 0 : _sessionData_user1.email : \"not signed in\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                                    lineNumber: 59,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                            lineNumber: 55,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                            className: \"py-1\",\n                            role: \"none\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: \"/settings\",\n                                    className: \"block px-4 py-2 text-sm text-slate-200 hover:bg-slate-800\",\n                                    role: \"menuitem\",\n                                    children: \"Settings\"\n                                }, void 0, false, {\n                                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                                    lineNumber: 68,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                                lineNumber: 67,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                            lineNumber: 66,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n            lineNumber: 24,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/killuh/ws_go/apiLessAmaceValidator/dashboard/src/components/ProfileMenu.tsx\",\n        lineNumber: 23,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ProfileMenu, \"TNcmxhpEQ8fx86CWYTZBmoOIqro=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession\n    ];\n});\n_c = ProfileMenu;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProfileMenu);\nvar _c;\n$RefreshReg$(_c, \"ProfileMenu\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Qcm9maWxlTWVudS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBOEQ7QUFDakM7QUFDdUI7QUFFcEQsTUFBTUssY0FBd0I7UUFvRERDLG1CQU1BQTs7SUF6RDNCLE1BQU0sQ0FBQ0MsY0FBY0MsZ0JBQWdCLEdBQUdKLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU1LLE1BQU1OLDZDQUFNQSxDQUFDO0lBQ25CLE1BQU1PLFVBQVVQLDZDQUFNQSxDQUFtQjtJQUN6QyxNQUFNLEVBQUVRLE1BQU1MLFdBQVcsRUFBRSxHQUFHTiwyREFBVUE7SUFFeENFLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSU8sSUFBSUcsT0FBTyxFQUFFO1FBQ2pCQyxRQUFRQyxHQUFHLENBQUMsUUFBUUwsSUFBSUcsT0FBTztRQUMvQkcsT0FBT0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUNDO1lBQ3pDLElBQUksQ0FBQ1gsZ0JBQWdCVyxHQUFHQyxNQUFNLEtBQUtULFFBQVFFLE9BQU8sRUFBRTtnQkFDbERKLGdCQUFnQjtZQUNsQjtRQUNGO1FBQ0FDLElBQUlHLE9BQU8sR0FBRztJQUNoQixHQUFHO1FBQUNILElBQUlHLE9BQU87S0FBQztJQUVoQixxQkFDRSw4REFBQ1E7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0Q7WUFBSUMsV0FBVTs7OEJBQ2IsOERBQUNEOzhCQUNDLDRFQUFDRTt3QkFDQ0MsTUFBSzt3QkFDTEMsSUFBRzt3QkFDSEgsV0FBVTt3QkFDVkksaUJBQWM7d0JBQ2RDLHdCQUFxQjt3QkFDckJDLFNBQVM7NEJBQ1BuQixnQkFBZ0IsQ0FBQ0Q7d0JBQ25COzswQ0FFQSw4REFBQ3FCO2dDQUFLUCxXQUFVOzBDQUFVOzs7Ozs7MENBQzFCLDhEQUFDUTtnQ0FDQ3BCLEtBQUtDO2dDQUNMVyxXQUFVO2dDQUNWUyxLQUNFeEIsZUFBZUEsWUFBWXlCLElBQUksSUFBSXpCLFlBQVl5QixJQUFJLENBQUNDLEtBQUssR0FDckQxQixZQUFZeUIsSUFBSSxDQUFDQyxLQUFLLEdBQ3RCO2dDQUVOQyxLQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFJViw4REFBQ2I7b0JBQ0NDLFdBQVcsVUFFVixPQURDZCxlQUFlLEtBQUssVUFDckI7b0JBQ0RpQixJQUFHOztzQ0FFSCw4REFBQ0o7NEJBQUlDLFdBQVU7NEJBQVlhLE1BQUs7OzhDQUM5Qiw4REFBQ0M7b0NBQUVkLFdBQVU7b0NBQXNCYSxNQUFLOzhDQUNyQzVCLGVBQWNBLG9CQUFBQSxZQUFZeUIsSUFBSSxjQUFoQnpCLHdDQUFBQSxrQkFBa0I4QixJQUFJLEdBQUc7Ozs7Ozs4Q0FFMUMsOERBQUNEO29DQUNDZCxXQUFVO29DQUNWYSxNQUFLOzhDQUVKNUIsZUFBY0EscUJBQUFBLFlBQVl5QixJQUFJLGNBQWhCekIseUNBQUFBLG1CQUFrQitCLEtBQUssR0FBRzs7Ozs7Ozs7Ozs7O3NDQUc3Qyw4REFBQ0M7NEJBQUdqQixXQUFVOzRCQUFPYSxNQUFLO3NDQUN4Qiw0RUFBQ0s7MENBQ0MsNEVBQUN0QyxrREFBSUE7b0NBQ0h1QyxNQUFLO29DQUNMbkIsV0FBVTtvQ0FDVmEsTUFBSzs4Q0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU2Y7R0E1RU03Qjs7UUFJMEJMLHVEQUFVQTs7O0tBSnBDSztBQThFTiwrREFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9Qcm9maWxlTWVudS50c3g/YzYwZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaWduSW4sIHNpZ25PdXQsIHVzZVNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgUHJvZmlsZU1lbnU6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbc2hvd0Ryb3Bkb3duLCBzZXRTaG93RHJvcGRvd25dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCByZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBpY29uUmVmID0gdXNlUmVmPEhUTUxJbWFnZUVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhIH0gPSB1c2VTZXNzaW9uKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zb2xlLmxvZyhcIklOaXRcIiwgcmVmLmN1cnJlbnQpO1xuICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2KSA9PiB7XG4gICAgICBpZiAoIXNob3dEcm9wZG93biAmJiBldi50YXJnZXQgIT09IGljb25SZWYuY3VycmVudCkge1xuICAgICAgICBzZXRTaG93RHJvcGRvd24oZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgfSwgW3JlZi5jdXJyZW50XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInotNTAgZmxleCAgaXRlbXMtY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLTMgZmxleCBmbGV4LWNvbCBpdGVtcy1lbmRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGlkPVwicHJvZmlsZUJ0blwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IHJvdW5kZWQtZnVsbCBiZy1ncmF5LTgwMCB0ZXh0LXNtIGZvY3VzOnJpbmctNCBmb2N1czpyaW5nLWdyYXktMzAwIGRhcms6Zm9jdXM6cmluZy1ncmF5LTYwMFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgICAgICAgZGF0YS1kcm9wZG93bi10b2dnbGU9XCJkcm9wZG93bi11c2VyXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0U2hvd0Ryb3Bkb3duKCFzaG93RHJvcGRvd24pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+T3BlbiB1c2VyIG1lbnU8L3NwYW4+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHJlZj17aWNvblJlZn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIHJvdW5kZWQtZnVsbFwiXG4gICAgICAgICAgICAgIHNyYz17XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGEgJiYgc2Vzc2lvbkRhdGEudXNlciAmJiBzZXNzaW9uRGF0YS51c2VyLmltYWdlXG4gICAgICAgICAgICAgICAgICA/IHNlc3Npb25EYXRhLnVzZXIuaW1hZ2VcbiAgICAgICAgICAgICAgICAgIDogXCJodHRwczovL2Zsb3diaXRlLmNvbS9kb2NzL2ltYWdlcy9wZW9wbGUvcHJvZmlsZS1waWN0dXJlLTUuanBnXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhbHQ9XCJ1c2VyIHBob3RvXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgbXktMTAgICR7XG4gICAgICAgICAgICBzaG93RHJvcGRvd24gPyBcIlwiIDogXCJoaWRkZW5cIlxuICAgICAgICAgIH0gYWJzb2x1dGUgbGlzdC1ub25lIGRpdmlkZS15IGRpdmlkZS1ncmF5LTEwMCByb3VuZGVkIGJnLXNsYXRlLTkwMCB0ZXh0LWJhc2UgIHNoYWRvdyBgfVxuICAgICAgICAgIGlkPVwiZHJvcGRvd24tdXNlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktM1wiIHJvbGU9XCJub25lXCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtd2hpdGUgXCIgcm9sZT1cIm5vbmVcIj5cbiAgICAgICAgICAgICAge3Nlc3Npb25EYXRhID8gc2Vzc2lvbkRhdGEudXNlcj8ubmFtZSA6IFwibm90IHNpZ25lZCBpblwifVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJ1bmNhdGUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgIHJvbGU9XCJub25lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3Nlc3Npb25EYXRhID8gc2Vzc2lvbkRhdGEudXNlcj8uZW1haWwgOiBcIm5vdCBzaWduZWQgaW5cIn1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicHktMVwiIHJvbGU9XCJub25lXCI+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgaHJlZj1cIi9zZXR0aW5nc1wiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgcHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS0yMDAgaG92ZXI6Ymctc2xhdGUtODAwXCJcbiAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgU2V0dGluZ3NcbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZU1lbnU7XG4iXSwibmFtZXMiOlsidXNlU2Vzc2lvbiIsIkxpbmsiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsIlByb2ZpbGVNZW51Iiwic2Vzc2lvbkRhdGEiLCJzaG93RHJvcGRvd24iLCJzZXRTaG93RHJvcGRvd24iLCJyZWYiLCJpY29uUmVmIiwiZGF0YSIsImN1cnJlbnQiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJ0YXJnZXQiLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJ0eXBlIiwiaWQiLCJhcmlhLWV4cGFuZGVkIiwiZGF0YS1kcm9wZG93bi10b2dnbGUiLCJvbkNsaWNrIiwic3BhbiIsImltZyIsInNyYyIsInVzZXIiLCJpbWFnZSIsImFsdCIsInJvbGUiLCJwIiwibmFtZSIsImVtYWlsIiwidWwiLCJsaSIsImhyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/ProfileMenu.tsx\n"));

/***/ })

});