/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./content.js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./content.js/index.js":
/*!*****************************!*\
  !*** ./content.js/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openwpm-webext-instrumentation */ "./node_modules/openwpm-webext-instrumentation/build/module/index.js");


Object(openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["injectJavascriptInstrumentPageScript"])();



/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/background/cookie-instrument.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/background/cookie-instrument.js ***!
  \**************************************************************************************************/
/*! exports provided: transformCookieObjectToMatchOpenWPMSchema, CookieInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformCookieObjectToMatchOpenWPMSchema", function() { return transformCookieObjectToMatchOpenWPMSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieInstrument", function() { return CookieInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/string-utils */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js");



const transformCookieObjectToMatchOpenWPMSchema = (cookie) => {
    const javascriptCookie = {};
    // Expiry time (in seconds)
    // May return ~Max(int64). I believe this is a session
    // cookie which doesn't expire. Sessions cookies with
    // non-max expiry time expire after session or at expiry.
    const expiryTime = cookie.expirationDate; // returns seconds
    let expiryTimeString;
    const maxInt64 = 9223372036854776000;
    if (!cookie.expirationDate || expiryTime === maxInt64) {
        expiryTimeString = "9999-12-31T21:59:59.000Z";
    }
    else {
        const expiryTimeDate = new Date(expiryTime * 1000); // requires milliseconds
        expiryTimeString = expiryTimeDate.toISOString();
    }
    javascriptCookie.expiry = expiryTimeString;
    javascriptCookie.is_http_only = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.httpOnly);
    javascriptCookie.is_host_only = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.hostOnly);
    javascriptCookie.is_session = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.session);
    javascriptCookie.host = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.domain);
    javascriptCookie.is_secure = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.secure);
    javascriptCookie.name = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.name);
    javascriptCookie.path = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.path);
    javascriptCookie.value = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.value);
    javascriptCookie.same_site = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.sameSite);
    javascriptCookie.first_party_domain = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.firstPartyDomain);
    javascriptCookie.store_id = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.storeId);
    javascriptCookie.time_stamp = new Date().toISOString();
    return javascriptCookie;
};
class CookieInstrument {
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        // Instrument cookie changes
        this.onChangedListener = async (changeInfo) => {
            const eventType = changeInfo.removed ? "deleted" : "added-or-changed";
            const update = {
                record_type: eventType,
                change_cause: changeInfo.cause,
                crawl_id: crawlID,
                extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
                event_ordinal: Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])(),
                ...transformCookieObjectToMatchOpenWPMSchema(changeInfo.cookie),
            };
            this.dataReceiver.saveRecord("javascript_cookies", update);
        };
        browser.cookies.onChanged.addListener(this.onChangedListener);
    }
    async saveAllCookies(crawlID) {
        const allCookies = await browser.cookies.getAll({});
        await Promise.all(allCookies.map((cookie) => {
            const update = {
                record_type: "manual-export",
                crawl_id: crawlID,
                extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
                ...transformCookieObjectToMatchOpenWPMSchema(cookie),
            };
            return this.dataReceiver.saveRecord("javascript_cookies", update);
        }));
    }
    cleanup() {
        if (this.onChangedListener) {
            browser.cookies.onChanged.removeListener(this.onChangedListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWluc3RydW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9jb29raWUtaW5zdHJ1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSzlELE1BQU0sQ0FBQyxNQUFNLHlDQUF5QyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxFQUFzQixDQUFDO0lBRWhELDJCQUEyQjtJQUMzQixzREFBc0Q7SUFDdEQscURBQXFEO0lBQ3JELHlEQUF5RDtJQUN6RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCO0lBQzVELElBQUksZ0JBQWdCLENBQUM7SUFDckIsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNyRCxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztLQUMvQztTQUFNO1FBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQzVFLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNqRDtJQUNELGdCQUFnQixDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxR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

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/background/http-instrument.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/background/http-instrument.js ***!
  \************************************************************************************************/
/*! exports provided: HttpInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpInstrument", function() { return HttpInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/http-post-parser */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/http-post-parser.js");
/* harmony import */ var _lib_pending_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/pending-request */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-request.js");
/* harmony import */ var _lib_pending_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/pending-response */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-response.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/string-utils */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js");






/**
 * Note: Different parts of the desired information arrives in different events as per below:
 * request = headers in onBeforeSendHeaders + body in onBeforeRequest
 * response = headers in onCompleted + body via a onBeforeRequest filter
 * redirect = original request headers+body, followed by a onBeforeRedirect and then a new set of request headers+body and response headers+body
 * Docs: https://developer.mozilla.org/en-US/docs/User:wbamberg/webRequest.RequestDetails
 */
class HttpInstrument {
    constructor(dataReceiver) {
        this.pendingRequests = {};
        this.pendingResponses = {};
        this.dataReceiver = dataReceiver;
    }
    run(crawlID, saveJavascript, saveAllContent) {
        const allTypes = [
            "beacon",
            "csp_report",
            "font",
            "image",
            "imageset",
            "main_frame",
            "media",
            "object",
            "object_subrequest",
            "ping",
            "script",
            // "speculative",
            "stylesheet",
            "sub_frame",
            "web_manifest",
            "websocket",
            "xbl",
            "xml_dtd",
            "xmlhttprequest",
            "xslt",
            "other",
        ];
        const filter = { urls: ["<all_urls>"], types: allTypes };
        const requestStemsFromExtension = details => {
            return (details.originUrl && details.originUrl.indexOf("moz-extension://") > -1);
        };
        /*
         * Attach handlers to event listeners
         */
        this.onBeforeRequestListener = details => {
            const blockingResponseThatDoesNothing = {};
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return blockingResponseThatDoesNothing;
            }
            const pendingRequest = this.getPendingRequest(details.requestId);
            pendingRequest.resolveOnBeforeRequestEventDetails(details);
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnBeforeRequestEventDetails(details);
            if (saveAllContent) {
                pendingResponse.addResponseResponseBodyListener(details);
            }
            else if (saveJavascript && this.isJS(details.type)) {
                pendingResponse.addResponseResponseBodyListener(details);
            }
            return blockingResponseThatDoesNothing;
        };
        browser.webRequest.onBeforeRequest.addListener(this.onBeforeRequestListener, filter, saveJavascript || saveAllContent
            ? ["requestBody", "blocking"]
            : ["requestBody"]);
        this.onBeforeSendHeadersListener = details => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingRequest = this.getPendingRequest(details.requestId);
            pendingRequest.resolveOnBeforeSendHeadersEventDetails(details);
            this.onBeforeSendHeadersHandler(details, crawlID, Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])());
        };
        browser.webRequest.onBeforeSendHeaders.addListener(this.onBeforeSendHeadersListener, filter, ["requestHeaders"]);
        this.onBeforeRedirectListener = details => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            this.onBeforeRedirectHandler(details, crawlID, Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])());
        };
        browser.webRequest.onBeforeRedirect.addListener(this.onBeforeRedirectListener, filter, ["responseHeaders"]);
        this.onCompletedListener = details => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnCompletedEventDetails(details);
            this.onCompletedHandler(details, crawlID, Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])(), saveJavascript, saveAllContent);
        };
        browser.webRequest.onCompleted.addListener(this.onCompletedListener, filter, ["responseHeaders"]);
    }
    cleanup() {
        if (this.onBeforeRequestListener) {
            browser.webRequest.onBeforeRequest.removeListener(this.onBeforeRequestListener);
        }
        if (this.onBeforeSendHeadersListener) {
            browser.webRequest.onBeforeSendHeaders.removeListener(this.onBeforeSendHeadersListener);
        }
        if (this.onBeforeRedirectListener) {
            browser.webRequest.onBeforeRedirect.removeListener(this.onBeforeRedirectListener);
        }
        if (this.onCompletedListener) {
            browser.webRequest.onCompleted.removeListener(this.onCompletedListener);
        }
    }
    getPendingRequest(requestId) {
        if (!this.pendingRequests[requestId]) {
            this.pendingRequests[requestId] = new _lib_pending_request__WEBPACK_IMPORTED_MODULE_3__["PendingRequest"]();
        }
        return this.pendingRequests[requestId];
    }
    getPendingResponse(requestId) {
        if (!this.pendingResponses[requestId]) {
            this.pendingResponses[requestId] = new _lib_pending_response__WEBPACK_IMPORTED_MODULE_4__["PendingResponse"]();
        }
        return this.pendingResponses[requestId];
    }
    /*
     * HTTP Request Handler and Helper Functions
     */
    /*
    // TODO: Refactor to corresponding webext logic or discard
    private get_stack_trace_str() {
      // return the stack trace as a string
      // TODO: check if http-on-modify-request is a good place to capture the stack
      // In the manual tests we could capture exactly the same trace as the
      // "Cause" column of the devtools network panel.
      const stacktrace = [];
      let frame = components.stack;
      if (frame && frame.caller) {
        // internal/chrome callers occupy the first three frames, pop them!
        frame = frame.caller.caller.caller;
        while (frame) {
          // chrome scripts appear as callers in some cases, filter them out
          const scheme = frame.filename.split("://")[0];
          if (["resource", "chrome", "file"].indexOf(scheme) === -1) {
            // ignore chrome scripts
            stacktrace.push(
              frame.name +
                "@" +
                frame.filename +
                ":" +
                frame.lineNumber +
                ":" +
                frame.columnNumber +
                ";" +
                frame.asyncCause,
            );
          }
          frame = frame.caller || frame.asyncCaller;
        }
      }
      return stacktrace.join("\n");
    }
    */
    async onBeforeSendHeadersHandler(details, crawlID, eventOrdinal) {
        /*
        console.log(
          "onBeforeSendHeadersHandler (previously httpRequestHandler)",
          details,
          crawlID,
        );
        */
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined, url: undefined };
        const update = {};
        update.incognito = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(tab.incognito);
        update.crawl_id = crawlID;
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"];
        update.event_ordinal = eventOrdinal;
        update.window_id = tab.windowId;
        update.tab_id = details.tabId;
        update.frame_id = details.frameId;
        // requestId is a unique identifier that can be used to link requests and responses
        update.request_id = details.requestId;
        // const stacktrace_str = get_stack_trace_str();
        // update.req_call_stack = escapeString(stacktrace_str);
        const url = details.url;
        update.url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(url);
        const requestMethod = details.method;
        update.method = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(requestMethod);
        const current_time = new Date(details.timeStamp);
        update.time_stamp = current_time.toISOString();
        let encodingType = "";
        let referrer = "";
        const headers = [];
        let isOcsp = false;
        if (details.requestHeaders) {
            details.requestHeaders.map(requestHeader => {
                const { name, value } = requestHeader;
                const header_pair = [];
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(name));
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(value));
                headers.push(header_pair);
                if (name === "Content-Type") {
                    encodingType = value;
                    if (encodingType.indexOf("application/ocsp-request") !== -1) {
                        isOcsp = true;
                    }
                }
                if (name === "Referer") {
                    referrer = value;
                }
            });
        }
        update.referrer = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(referrer);
        if (requestMethod === "POST" && !isOcsp /* don't process OCSP requests */) {
            const pendingRequest = this.getPendingRequest(details.requestId);
            const resolved = await pendingRequest.resolvedWithinTimeout(1000);
            if (!resolved) {
                this.dataReceiver.logError("Pending request timed out waiting for data from both onBeforeRequest and onBeforeSendHeaders events");
            }
            else {
                const onBeforeRequestEventDetails = await pendingRequest.onBeforeRequestEventDetails;
                const requestBody = onBeforeRequestEventDetails.requestBody;
                if (requestBody) {
                    const postParser = new _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_2__["HttpPostParser"](
                    // details,
                    onBeforeRequestEventDetails, this.dataReceiver);
                    const postObj = postParser
                        .parsePostRequest();
                    // Add (POST) request headers from upload stream
                    if ("post_headers" in postObj) {
                        // Only store POST headers that we know and need. We may misinterpret POST data as headers
                        // as detection is based on "key:value" format (non-header POST data can be in this format as well)
                        const contentHeaders = [
                            "Content-Type",
                            "Content-Disposition",
                            "Content-Length",
                        ];
                        for (const name in postObj.post_headers) {
                            if (contentHeaders.includes(name)) {
                                const header_pair = [];
                                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(name));
                                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(postObj.post_headers[name]));
                                headers.push(header_pair);
                            }
                        }
                    }
                    // we store POST body in JSON format, except when it's a string without a (key-value) structure
                    if ("post_body" in postObj) {
                        update.post_body = postObj.post_body;
                    }
                }
            }
        }
        update.headers = JSON.stringify(headers);
        // Check if xhr
        const isXHR = details.type === "xmlhttprequest";
        update.is_XHR = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isXHR);
        // Check if frame OR full page load
        const isFullPageLoad = details.frameId === 0;
        const isFrameLoad = details.type === "sub_frame";
        update.is_full_page = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isFullPageLoad);
        update.is_frame_load = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isFrameLoad);
        // Grab the triggering and loading Principals
        let triggeringOrigin;
        let loadingOrigin;
        if (details.originUrl) {
            const parsedOriginUrl = new URL(details.originUrl);
            triggeringOrigin = parsedOriginUrl.origin;
        }
        if (details.documentUrl) {
            const parsedDocumentUrl = new URL(details.documentUrl);
            loadingOrigin = parsedDocumentUrl.origin;
        }
        update.triggering_origin = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(triggeringOrigin);
        update.loading_origin = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(loadingOrigin);
        // loadingDocument's href
        // The loadingDocument is the document the element resides, regardless of
        // how the load was triggered.
        const loadingHref = details.documentUrl;
        update.loading_href = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(loadingHref);
        // resourceType of the requesting node. This is set by the type of
        // node making the request (i.e. an <img src=...> node will set to type "image").
        // Documentation:
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
        update.resource_type = details.type;
        /*
        // TODO: Refactor to corresponding webext logic or discard
        const ThirdPartyUtil = Cc["@mozilla.org/thirdpartyutil;1"].getService(
                               Ci.mozIThirdPartyUtil);
        // Do third-party checks
        // These specific checks are done because it's what's used in Tracking Protection
        // See: http://searchfox.org/mozilla-central/source/netwerk/base/nsChannelClassifier.cpp#107
        try {
          const isThirdPartyChannel = ThirdPartyUtil.isThirdPartyChannel(details);
          const topWindow = ThirdPartyUtil.getTopWindowForChannel(details);
          const topURI = ThirdPartyUtil.getURIFromWindow(topWindow);
          if (topURI) {
            const topUrl = topURI.spec;
            const channelURI = details.URI;
            const isThirdPartyToTopWindow = ThirdPartyUtil.isThirdPartyURI(
              channelURI,
              topURI,
            );
            update.is_third_party_to_top_window = isThirdPartyToTopWindow;
            update.is_third_party_channel = isThirdPartyChannel;
          }
        } catch (anError) {
          // Exceptions expected for channels triggered or loading in a
          // NullPrincipal or SystemPrincipal. They are also expected for favicon
          // loads, which we attempt to filter. Depending on the naming, some favicons
          // may continue to lead to error logs.
          if (
            update.triggering_origin !== "[System Principal]" &&
            update.triggering_origin !== undefined &&
            update.loading_origin !== "[System Principal]" &&
            update.loading_origin !== undefined &&
            !update.url.endsWith("ico")
          ) {
            this.dataReceiver.logError(
              "Error while retrieving additional channel information for URL: " +
              "\n" +
              update.url +
              "\n Error text:" +
              JSON.stringify(anError),
            );
          }
        }
        */
        update.top_level_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(tab.url);
        update.parent_frame_id = details.parentFrameId;
        update.frame_ancestors = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(JSON.stringify(details.frameAncestors));
        this.dataReceiver.saveRecord("http_requests", update);
    }
    async onBeforeRedirectHandler(details, crawlID, eventOrdinal) {
        /*
        console.log(
          "onBeforeRedirectHandler (previously httpRequestHandler)",
          details,
          crawlID,
        );
        */
        // Save HTTP redirect events
        // Events are saved to the `http_redirects` table
        /*
        // TODO: Refactor to corresponding webext logic or discard
        // Events are saved to the `http_redirects` table, and map the old
        // request/response channel id to the new request/response channel id.
        // Implementation based on: https://stackoverflow.com/a/11240627
        const oldNotifications = details.notificationCallbacks;
        let oldEventSink = null;
        details.notificationCallbacks = {
          QueryInterface: XPCOMUtils.generateQI([
            Ci.nsIInterfaceRequestor,
            Ci.nsIChannelEventSink,
          ]),
    
          getInterface(iid) {
            // We are only interested in nsIChannelEventSink,
            // return the old callbacks for any other interface requests.
            if (iid.equals(Ci.nsIChannelEventSink)) {
              try {
                oldEventSink = oldNotifications.QueryInterface(iid);
              } catch (anError) {
                this.dataReceiver.logError(
                  "Error during call to custom notificationCallbacks::getInterface." +
                    JSON.stringify(anError),
                );
              }
              return this;
            }
    
            if (oldNotifications) {
              return oldNotifications.getInterface(iid);
            } else {
              throw Cr.NS_ERROR_NO_INTERFACE;
            }
          },
    
          asyncOnChannelRedirect(oldChannel, newChannel, flags, callback) {
    
            newChannel.QueryInterface(Ci.nsIHttpChannel);
    
            const httpRedirect: HttpRedirect = {
              crawl_id: crawlID,
              old_request_id: oldChannel.channelId,
              new_request_id: newChannel.channelId,
              time_stamp: new Date().toISOString(),
            };
            this.dataReceiver.saveRecord("http_redirects", httpRedirect);
    
            if (oldEventSink) {
              oldEventSink.asyncOnChannelRedirect(
                oldChannel,
                newChannel,
                flags,
                callback,
              );
            } else {
              callback.onRedirectVerifyCallback(Cr.NS_OK);
            }
          },
        };
        */
        const responseStatus = details.statusCode;
        const responseStatusText = details.statusLine;
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined };
        const httpRedirect = {
            incognito: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(tab.incognito),
            crawl_id: crawlID,
            old_request_url: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(details.url),
            old_request_id: details.requestId,
            new_request_url: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(details.redirectUrl),
            new_request_id: null,
            extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
            event_ordinal: eventOrdinal,
            window_id: tab.windowId,
            tab_id: details.tabId,
            frame_id: details.frameId,
            response_status: responseStatus,
            response_status_text: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(responseStatusText),
            time_stamp: new Date(details.timeStamp).toISOString(),
        };
        this.dataReceiver.saveRecord("http_redirects", httpRedirect);
    }
    /*
    * HTTP Response Handlers and Helper Functions
    */
    async logWithResponseBody(details, update) {
        const pendingResponse = this.getPendingResponse(details.requestId);
        try {
            const responseBodyListener = pendingResponse.responseBodyListener;
            const respBody = await responseBodyListener.getResponseBody();
            const contentHash = await responseBodyListener.getContentHash();
            this.dataReceiver.saveContent(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(respBody), Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(contentHash));
            this.dataReceiver.saveRecord("http_responses", update);
        }
        catch (err) {
            /*
            // TODO: Refactor to corresponding webext logic or discard
            dataReceiver.logError(
              "Unable to retrieve response body." + JSON.stringify(aReason),
            );
            update.content_hash = "<error>";
            dataReceiver.saveRecord("http_responses", update);
            */
            this.dataReceiver.logError("Unable to retrieve response body." +
                "Likely caused by a programming error. Error Message:" +
                err.name +
                err.message +
                "\n" +
                err.stack);
            update.content_hash = "<error>";
            this.dataReceiver.saveRecord("http_responses", update);
        }
    }
    /**
     * Return true if this request is loading javascript
     * We rely mostly on the content policy type to filter responses
     * and fall back to the URI and content type string for types that can
     * load various resource types.
     * See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
     *
     * @param resourceType
     */
    isJS(resourceType) {
        return resourceType === "script";
    }
    // Instrument HTTP responses
    async onCompletedHandler(details, crawlID, eventOrdinal, saveJavascript, saveAllContent) {
        /*
        console.log(
          "onCompletedHandler (previously httpRequestHandler)",
          details,
          crawlID,
          saveJavascript,
          saveAllContent,
        );
        */
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined };
        const update = {};
        update.incognito = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(tab.incognito);
        update.crawl_id = crawlID;
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"];
        update.event_ordinal = eventOrdinal;
        update.window_id = tab.windowId;
        update.tab_id = details.tabId;
        update.frame_id = details.frameId;
        // requestId is a unique identifier that can be used to link requests and responses
        update.request_id = details.requestId;
        const isCached = details.fromCache;
        update.is_cached = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isCached);
        const url = details.url;
        update.url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(url);
        const requestMethod = details.method;
        update.method = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(requestMethod);
        // TODO: Refactor to corresponding webext logic or discard
        // (request headers are not available in http response event listener object,
        // but the referrer property of the corresponding request could be queried)
        //
        // let referrer = "";
        // if (details.referrer) {
        //   referrer = details.referrer.spec;
        // }
        // update.referrer = escapeString(referrer);
        const responseStatus = details.statusCode;
        update.response_status = responseStatus;
        const responseStatusText = details.statusLine;
        update.response_status_text = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(responseStatusText);
        const current_time = new Date(details.timeStamp);
        update.time_stamp = current_time.toISOString();
        const headers = [];
        let location = "";
        if (details.responseHeaders) {
            details.responseHeaders.map(responseHeader => {
                const { name, value } = responseHeader;
                const header_pair = [];
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(name));
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(value));
                headers.push(header_pair);
                if (name.toLowerCase() === "location") {
                    location = value;
                }
            });
        }
        update.headers = JSON.stringify(headers);
        update.location = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(location);
        if (saveAllContent) {
            this.logWithResponseBody(details, update);
        }
        else if (saveJavascript && this.isJS(details.type)) {
            this.logWithResponseBody(details, update);
        }
        else {
            this.dataReceiver.saveRecord("http_responses", update);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQXFCLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUkxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVN6RTs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sY0FBYztJQWF6QixZQUFZLFlBQVk7UUFYaEIsb0JBQWUsR0FFbkIsRUFBRSxDQUFDO1FBQ0MscUJBQWdCLEdBRXBCLEVBQUUsQ0FBQztRQU9MLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjO1FBQ2hELE1BQU0sUUFBUSxHQUFtQjtZQUMvQixRQUFRO1lBQ1IsWUFBWTtZQUNaLE1BQU07WUFDTixPQUFPO1lBQ1AsVUFBVTtZQUNWLFlBQVk7WUFDWixPQUFPO1lBQ1AsUUFBUTtZQUNSLG1CQUFtQjtZQUNuQixNQUFNO1lBQ04sUUFBUTtZQUNSLGlCQUFpQjtZQUNqQixZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWM7WUFDZCxXQUFXO1lBQ1gsS0FBSztZQUNMLFNBQVM7WUFDVCxnQkFBZ0I7WUFDaEIsTUFBTTtZQUNOLE9BQU87U0FDUixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQWtCLEVBQUUsSUFBSSxFQUFF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

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/background/javascript-instrument.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/background/javascript-instrument.js ***!
  \******************************************************************************************************/
/*! exports provided: JavascriptInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JavascriptInstrument", function() { return JavascriptInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/string-utils */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js");



class JavascriptInstrument {
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        const processCallsAndValues = (data, sender) => {
            const update = {};
            update.crawl_id = crawlID;
            update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"];
            update.event_ordinal = Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])();
            update.page_scoped_event_ordinal = data.ordinal;
            update.window_id = sender.tab.windowId;
            update.tab_id = sender.tab.id;
            update.frame_id = sender.frameId;
            update.script_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeUrl"])(data.scriptUrl);
            update.script_line = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.scriptLine);
            update.script_col = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.scriptCol);
            update.func_name = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.funcName);
            update.script_loc_eval = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.scriptLocEval);
            update.call_stack = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.callStack);
            update.symbol = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.symbol);
            update.operation = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.operation);
            update.value = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.value);
            update.time_stamp = data.timeStamp;
            update.incognito = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(sender.tab.incognito);
            // document_url is the current frame's document href
            // top_level_url is the top-level frame's document href
            update.document_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeUrl"])(sender.url);
            update.top_level_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeUrl"])(sender.tab.url);
            if (data.operation === "call" && data.args.length > 0) {
                update.arguments = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(JSON.stringify(data.args));
            }
            this.dataReceiver.saveRecord("javascript", update);
        };
        // Listen for messages from content script injected to instrument JavaScript API
        this.onMessageListener = (msg, sender) => {
            // console.debug("javascript-instrumentation background listener - msg, sender, sendReply", msg, sender, sendReply);
            if (msg.namespace && msg.namespace === "javascript-instrumentation") {
                switch (msg.type) {
                    case "logCall":
                    case "logValue":
                        processCallsAndValues(msg.data, sender);
                        break;
                }
            }
        };
        browser.runtime.onMessage.addListener(this.onMessageListener);
    }
    cleanup() {
        if (this.onMessageListener) {
            browser.runtime.onMessage.removeListener(this.onMessageListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3pFLE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFBWSxZQUFZO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBTztRQUNoQixNQUFNLHFCQUFxQixHQUFHLENBQUMsSUFBSSxFQUFFLE1BQXFCLEVBQUUsRUFBRTtZQUM1RCxNQUFNLE1BQU0sR0FBRyxFQUF5QixDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQztZQUNyRCxNQUFNLENBQUMsYUFBYSxHQUFHLHVCQUF1QixFQUFFLENBQUM7WUFDakQsTUFBTSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDaEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLFdBQVcs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

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/background/navigation-instrument.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/background/navigation-instrument.js ***!
  \******************************************************************************************************/
/*! exports provided: transformWebNavigationBaseEventDetailsToOpenWPMSchema, NavigationInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformWebNavigationBaseEventDetailsToOpenWPMSchema", function() { return transformWebNavigationBaseEventDetailsToOpenWPMSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationInstrument", function() { return NavigationInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_pending_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/pending-navigation */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-navigation.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/string-utils */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js");
/* harmony import */ var _lib_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/uuid */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/uuid.js");





const transformWebNavigationBaseEventDetailsToOpenWPMSchema = async (crawlID, details) => {
    const tab = details.tabId > -1
        ? await browser.tabs.get(details.tabId)
        : {
            windowId: undefined,
            incognito: undefined,
            cookieStoreId: undefined,
            openerTabId: undefined,
            width: undefined,
            height: undefined,
        };
    const window = tab.windowId
        ? await browser.windows.get(tab.windowId)
        : { width: undefined, height: undefined, type: undefined };
    const navigation = {
        crawl_id: crawlID,
        incognito: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["boolToInt"])(tab.incognito),
        extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
        process_id: details.processId,
        window_id: tab.windowId,
        tab_id: details.tabId,
        tab_opener_tab_id: tab.openerTabId,
        frame_id: details.frameId,
        window_width: window.width,
        window_height: window.height,
        window_type: window.type,
        tab_width: tab.width,
        tab_height: tab.height,
        tab_cookie_store_id: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeString"])(tab.cookieStoreId),
        uuid: Object(_lib_uuid__WEBPACK_IMPORTED_MODULE_4__["makeUUID"])(),
        url: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeUrl"])(details.url),
    };
    return navigation;
};
class NavigationInstrument {
    constructor(dataReceiver) {
        this.pendingNavigations = {};
        this.dataReceiver = dataReceiver;
    }
    static navigationId(processId, tabId, frameId) {
        return `${processId}-${tabId}-${frameId}`;
    }
    run(crawlID) {
        this.onBeforeNavigateListener = async (details) => {
            const navigationId = NavigationInstrument.navigationId(details.processId, details.tabId, details.frameId);
            const pendingNavigation = this.instantiatePendingNavigation(navigationId);
            const navigation = await transformWebNavigationBaseEventDetailsToOpenWPMSchema(crawlID, details);
            navigation.parent_frame_id = details.parentFrameId;
            navigation.before_navigate_event_ordinal = Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])();
            navigation.before_navigate_time_stamp = new Date(details.timeStamp).toISOString();
            pendingNavigation.resolveOnBeforeNavigateEventNavigation(navigation);
        };
        browser.webNavigation.onBeforeNavigate.addListener(this.onBeforeNavigateListener);
        this.onCommittedListener = async (details) => {
            const navigationId = NavigationInstrument.navigationId(details.processId, details.tabId, details.frameId);
            const navigation = await transformWebNavigationBaseEventDetailsToOpenWPMSchema(crawlID, details);
            navigation.transition_qualifiers = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeString"])(JSON.stringify(details.transitionQualifiers));
            navigation.transition_type = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeString"])(details.transitionType);
            navigation.committed_event_ordinal = Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])();
            navigation.committed_time_stamp = new Date(details.timeStamp).toISOString();
            // include attributes from the corresponding onBeforeNavigation event
            const pendingNavigation = this.getPendingNavigation(navigationId);
            if (pendingNavigation) {
                pendingNavigation.resolveOnCommittedEventNavigation(navigation);
                const resolved = await pendingNavigation.resolvedWithinTimeout(1000);
                if (resolved) {
                    const onBeforeNavigateEventNavigation = await pendingNavigation.onBeforeNavigateEventNavigation;
                    navigation.parent_frame_id =
                        onBeforeNavigateEventNavigation.parent_frame_id;
                    navigation.before_navigate_event_ordinal =
                        onBeforeNavigateEventNavigation.before_navigate_event_ordinal;
                    navigation.before_navigate_time_stamp =
                        onBeforeNavigateEventNavigation.before_navigate_time_stamp;
                }
            }
            this.dataReceiver.saveRecord("navigations", navigation);
        };
        browser.webNavigation.onCommitted.addListener(this.onCommittedListener);
    }
    cleanup() {
        if (this.onBeforeNavigateListener) {
            browser.webNavigation.onBeforeNavigate.removeListener(this.onBeforeNavigateListener);
        }
        if (this.onCommittedListener) {
            browser.webNavigation.onCommitted.removeListener(this.onCommittedListener);
        }
    }
    instantiatePendingNavigation(navigationId) {
        this.pendingNavigations[navigationId] = new _lib_pending_navigation__WEBPACK_IMPORTED_MODULE_2__["PendingNavigation"]();
        return this.pendingNavigations[navigationId];
    }
    getPendingNavigation(navigationId) {
        return this.pendingNavigations[navigationId];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFRdkMsTUFBTSxDQUFDLE1BQU0scURBQXFELEdBQUcsS0FBSyxFQUN4RSxPQUFPLEVBQ1AsT0FBc0MsRUFDakIsRUFBRTtJQUN2QixNQUFNLEdBQUcsR0FDUCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztZQUNFLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7SUFDUixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUTtRQUN6QixDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJ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

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-content-scope.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-content-scope.js ***!
  \*****************************************************************************************************************/
/*! exports provided: injectJavascriptInstrumentPageScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectJavascriptInstrumentPageScript", function() { return injectJavascriptInstrumentPageScript; });
/* harmony import */ var _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./javascript-instrument-page-scope */ "./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-page-scope.js");

function getPageScriptAsString() {
    // return a string
    return "(" + _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_0__["pageScript"] + "());";
}
function insertScript(text, data) {
    const parent = document.documentElement, script = document.createElement("script");
    script.text = text;
    script.async = false;
    for (const key in data) {
        script.setAttribute("data-" + key.replace("_", "-"), data[key]);
    }
    parent.insertBefore(script, parent.firstChild);
    parent.removeChild(script);
}
function emitMsg(type, msg) {
    msg.timeStamp = new Date().toISOString();
    browser.runtime.sendMessage({
        namespace: "javascript-instrumentation",
        type,
        data: msg,
    });
}
const event_id = Math.random();
// listen for messages from the script we are about to insert
document.addEventListener(event_id.toString(), function (e) {
    // pass these on to the background page
    const msgs = e.detail;
    if (Array.isArray(msgs)) {
        msgs.forEach(function (msg) {
            emitMsg(msg.type, msg.content);
        });
    }
    else {
        emitMsg(msgs.type, msgs.content);
    }
});
function injectJavascriptInstrumentPageScript(testing = false) {
    insertScript(getPageScriptAsString(), {
        event_id,
        testing,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFaEUsU0FBUyxxQkFBcUI7SUFDNUIsa0JBQWtCO0lBQ2xCLE9BQU8sR0FBRyxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDbkMsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJO0lBQzlCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLEVBQ3JDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXJCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHO0lBQ3hCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUMxQixTQUFTLEVBQUUsNEJBQTRCO1FBQ3ZDLElBQUk7UUFDSixJQUFJLEVBQUUsR0FBRztLQUNWLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFL0IsNkRBQTZEO0FBQzdELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBUyxDQUFjO0lBQ3BFLHVDQUF1QztJQUN2QyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVMsR0FBRztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsb0NBQW9DLENBQUMsT0FBTyxHQUFHLEtBQUs7SUFDbEUsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUU7UUFDcEMsUUFBUTtRQUNSLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDIn0=

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-page-scope.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-page-scope.js ***!
  \**************************************************************************************************************/
/*! exports provided: pageScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageScript", function() { return pageScript; });
// Intrumentation injection code is based on privacybadgerfirefox
// https://github.com/EFForg/privacybadgerfirefox/blob/master/data/fingerprinting.js
const pageScript = function () {
    // from Underscore v1.6.0
    function debounce(func, wait, immediate = false) {
        let timeout, args, context, timestamp, result;
        const later = function () {
            const last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            const callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
    // End of Debounce
    // messages the injected script
    const send = (function () {
        let messages = [];
        // debounce sending queued messages
        const _send = debounce(function () {
            document.dispatchEvent(new CustomEvent(event_id, {
                detail: messages,
            }));
            // clear the queue
            messages = [];
        }, 100);
        return function (msgType, msg) {
            // queue the message
            messages.push({ type: msgType, content: msg });
            _send();
        };
    })();
    const event_id = document.currentScript.getAttribute("data-event-id");
    /*
     * Instrumentation helpers
     */
    const testing = document.currentScript.getAttribute("data-testing") === "true";
    if (testing) {
        console.log("OpenWPM: Currently testing?", testing);
    }
    // Recursively generates a path for an element
    function getPathToDomElement(element, visibilityAttr = false) {
        if (element === document.body) {
            return element.tagName;
        }
        if (element.parentNode === null) {
            return "NULL/" + element.tagName;
        }
        let siblingIndex = 1;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                let path = getPathToDomElement(element.parentNode, visibilityAttr);
                path += "/" + element.tagName + "[" + siblingIndex;
                path += "," + element.id;
                path += "," + element.className;
                if (visibilityAttr) {
                    path += "," + element.hidden;
                    path += "," + element.style.display;
                    path += "," + element.style.visibility;
                }
                if (element.tagName === "A") {
                    path += "," + element.href;
                }
                path += "]";
                return path;
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                siblingIndex++;
            }
        }
    }
    // Helper for JSONifying objects
    function serializeObject(object, stringifyFunctions = false) {
        // Handle permissions errors
        try {
            if (object === null) {
                return "null";
            }
            if (typeof object === "function") {
                if (stringifyFunctions) {
                    return object.toString();
                }
                else {
                    return "FUNCTION";
                }
            }
            if (typeof object !== "object") {
                return object;
            }
            const seenObjects = [];
            return JSON.stringify(object, function (key, value) {
                if (value === null) {
                    return "null";
                }
                if (typeof value === "function") {
                    if (stringifyFunctions) {
                        return value.toString();
                    }
                    else {
                        return "FUNCTION";
                    }
                }
                if (typeof value === "object") {
                    // Remove wrapping on content objects
                    if ("wrappedJSObject" in value) {
                        value = value.wrappedJSObject;
                    }
                    // Serialize DOM elements
                    if (value instanceof HTMLElement) {
                        return getPathToDomElement(value);
                    }
                    // Prevent serialization cycles
                    if (key === "" || seenObjects.indexOf(value) < 0) {
                        seenObjects.push(value);
                        return value;
                    }
                    else {
                        return typeof value;
                    }
                }
                return value;
            });
        }
        catch (error) {
            console.log("OpenWPM: SERIALIZATION ERROR: " + error);
            return "SERIALIZATION ERROR: " + error;
        }
    }
    function logErrorToConsole(error) {
        console.log("OpenWPM: Error name: " + error.name);
        console.log("OpenWPM: Error message: " + error.message);
        console.log("OpenWPM: Error filename: " + error.fileName);
        console.log("OpenWPM: Error line number: " + error.lineNumber);
        console.log("OpenWPM: Error stack: " + error.stack);
    }
    // Helper to get originating script urls
    function getStackTrace() {
        let stack;
        try {
            throw new Error();
        }
        catch (err) {
            stack = err.stack;
        }
        return stack;
    }
    // from http://stackoverflow.com/a/5202185
    String.prototype.rsplit = function (sep, maxsplit) {
        const split = this.split(sep);
        return maxsplit
            ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit))
            : split;
    };
    function getOriginatingScriptContext(getCallStack = false) {
        const trace = getStackTrace()
            .trim()
            .split("\n");
        // return a context object even if there is an error
        const empty_context = {
            scriptUrl: "",
            scriptLine: "",
            scriptCol: "",
            funcName: "",
            scriptLocEval: "",
            callStack: "",
        };
        if (trace.length < 4) {
            return empty_context;
        }
        // 0, 1 and 2 are OpenWPM's own functions (e.g. getStackTrace), skip them.
        const callSite = trace[3];
        if (!callSite) {
            return empty_context;
        }
        /*
         * Stack frame format is simply: FUNC_NAME@FILENAME:LINE_NO:COLUMN_NO
         *
         * If eval or Function is involved we have an additional part after the FILENAME, e.g.:
         * FUNC_NAME@FILENAME line 123 > eval line 1 > eval:LINE_NO:COLUMN_NO
         * or FUNC_NAME@FILENAME line 234 > Function:LINE_NO:COLUMN_NO
         *
         * We store the part between the FILENAME and the LINE_NO in scriptLocEval
         */
        try {
            let scriptUrl = "";
            let scriptLocEval = ""; // for eval or Function calls
            const callSiteParts = callSite.split("@");
            const funcName = callSiteParts[0] || "";
            const items = callSiteParts[1].rsplit(":", 2);
            const columnNo = items[items.length - 1];
            const lineNo = items[items.length - 2];
            const scriptFileName = items[items.length - 3] || "";
            const lineNoIdx = scriptFileName.indexOf(" line "); // line in the URL means eval or Function
            if (lineNoIdx === -1) {
                scriptUrl = scriptFileName; // TODO: sometimes we have filename only, e.g. XX.js
            }
            else {
                scriptUrl = scriptFileName.slice(0, lineNoIdx);
                scriptLocEval = scriptFileName.slice(lineNoIdx + 1, scriptFileName.length);
            }
            const callContext = {
                scriptUrl,
                scriptLine: lineNo,
                scriptCol: columnNo,
                funcName,
                scriptLocEval,
                callStack: getCallStack
                    ? trace
                        .slice(3)
                        .join("\n")
                        .trim()
                    : "",
            };
            return callContext;
        }
        catch (e) {
            console.log("OpenWPM: Error parsing the script context", e, callSite);
            return empty_context;
        }
    }
    // Counter to cap # of calls logged for each script/api combination
    const maxLogCount = 500;
    const logCounter = new Object();
    function updateCounterAndCheckIfOver(scriptUrl, symbol) {
        const key = scriptUrl + "|" + symbol;
        if (key in logCounter && logCounter[key] >= maxLogCount) {
            return true;
        }
        else if (!(key in logCounter)) {
            logCounter[key] = 1;
        }
        else {
            logCounter[key] += 1;
        }
        return false;
    }
    // Prevent logging of gets arising from logging
    let inLog = false;
    // To keep track of the original order of events
    let ordinal = 0;
    // For gets, sets, etc. on a single value
    function logValue(instrumentedVariableName, value, operation, callContext, logSettings) {
        if (inLog) {
            return;
        }
        inLog = true;
        const overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedVariableName);
        if (overLimit) {
            inLog = false;
            return;
        }
        const msg = {
            operation,
            symbol: instrumentedVariableName,
            value: serializeObject(value, !!logSettings.logFunctionsAsStrings),
            scriptUrl: callContext.scriptUrl,
            scriptLine: callContext.scriptLine,
            scriptCol: callContext.scriptCol,
            funcName: callContext.funcName,
            scriptLocEval: callContext.scriptLocEval,
            callStack: callContext.callStack,
            ordinal: ordinal++,
        };
        try {
            send("logValue", msg);
        }
        catch (error) {
            console.log("OpenWPM: Unsuccessful value log!");
            logErrorToConsole(error);
        }
        inLog = false;
    }
    // For functions
    function logCall(instrumentedFunctionName, args, callContext, logSettings) {
        if (inLog) {
            return;
        }
        inLog = true;
        const overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedFunctionName);
        if (overLimit) {
            inLog = false;
            return;
        }
        try {
            // Convert special arguments array to a standard array for JSONifying
            const serialArgs = [];
            for (let i = 0; i < args.length; i++) {
                serialArgs.push(serializeObject(args[i], !!logSettings.logFunctionsAsStrings));
            }
            const msg = {
                operation: "call",
                symbol: instrumentedFunctionName,
                args: serialArgs,
                value: "",
                scriptUrl: callContext.scriptUrl,
                scriptLine: callContext.scriptLine,
                scriptCol: callContext.scriptCol,
                funcName: callContext.funcName,
                scriptLocEval: callContext.scriptLocEval,
                callStack: callContext.callStack,
                ordinal: ordinal++,
            };
            send("logCall", msg);
        }
        catch (error) {
            console.log("OpenWPM: Unsuccessful call log: " + instrumentedFunctionName);
            logErrorToConsole(error);
        }
        inLog = false;
    }
    // Rough implementations of Object.getPropertyDescriptor and Object.getPropertyNames
    // See http://wiki.ecmascript.org/doku.php?id=harmony:extended_object_api
    Object.getPropertyDescriptor = function (subject, name) {
        let pd = Object.getOwnPropertyDescriptor(subject, name);
        let proto = Object.getPrototypeOf(subject);
        while (pd === undefined && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return pd;
    };
    Object.getPropertyNames = function (subject) {
        let props = Object.getOwnPropertyNames(subject);
        let proto = Object.getPrototypeOf(subject);
        while (proto !== null) {
            props = props.concat(Object.getOwnPropertyNames(proto));
            proto = Object.getPrototypeOf(proto);
        }
        // FIXME: remove duplicate property names from props
        return props;
    };
    /*
     *  Direct instrumentation of javascript objects
     */
    function isObject(object, propertyName) {
        let property;
        try {
            property = object[propertyName];
        }
        catch (error) {
            return false;
        }
        if (property === null) {
            // null is type "object"
            return false;
        }
        return typeof property === "object";
    }
    function instrumentObject(object, objectName, logSettings = {}) {
        // Use for objects or object prototypes
        //
        // Parameters
        // ----------
        //   object : Object
        //     Object to instrument
        //   objectName : String
        //     Name of the object to be instrumented (saved to database)
        //   logSettings : Object
        //     (optional) object that can be used to specify additional logging
        //     configurations. See available options below.
        //
        // logSettings options (all optional)
        // -------------------
        //   propertiesToInstrument : Array
        //     An array of properties to instrument on this object. Default is
        //     all properties.
        //   excludedProperties : Array
        //     Properties excluded from instrumentation. Default is an empty
        //     array.
        //   logCallStack : boolean
        //     Set to true save the call stack info with each property call.
        //     Default is `false`.
        //   logFunctionsAsStrings : boolean
        //     Set to true to save functional arguments as strings during
        //     argument serialization. Default is `false`.
        //   preventSets : boolean
        //     Set to true to prevent nested objects and functions from being
        //     overwritten (and thus having their instrumentation removed).
        //     Other properties (static values) can still be set with this is
        //     enabled. Default is `false`.
        //   recursive : boolean
        //     Set to `true` to recursively instrument all object properties of
        //     the given `object`. Default is `false`
        //     NOTE:
        //       (1)`logSettings['propertiesToInstrument']` does not propagate
        //           to sub-objects.
        //       (2) Sub-objects of prototypes can not be instrumented
        //           recursively as these properties can not be accessed
        //           until an instance of the prototype is created.
        //   depth : integer
        //     Recursion limit when instrumenting object recursively.
        //     Default is `5`.
        const properties = logSettings.propertiesToInstrument
            ? logSettings.propertiesToInstrument
            : Object.getPropertyNames(object);
        for (let i = 0; i < properties.length; i++) {
            if (logSettings.excludedProperties &&
                logSettings.excludedProperties.indexOf(properties[i]) > -1) {
                continue;
            }
            // If `recursive` flag set we want to recursively instrument any
            // object properties that aren't the prototype object. Only recurse if
            // depth not set (at which point its set to default) or not at limit.
            if (!!logSettings.recursive &&
                properties[i] !== "__proto__" &&
                isObject(object, properties[i]) &&
                (!("depth" in logSettings) || logSettings.depth > 0)) {
                // set recursion limit to default if not specified
                if (!("depth" in logSettings)) {
                    logSettings.depth = 5;
                }
                instrumentObject(object[properties[i]], objectName + "." + properties[i], {
                    excludedProperties: logSettings.excludedProperties,
                    logCallStack: logSettings.logCallStack,
                    logFunctionsAsStrings: logSettings.logFunctionsAsStrings,
                    preventSets: logSettings.preventSets,
                    recursive: logSettings.recursive,
                    depth: logSettings.depth - 1,
                });
            }
            try {
                instrumentObjectProperty(object, objectName, properties[i], logSettings);
            }
            catch (error) {
                logErrorToConsole(error);
            }
        }
    }
    if (testing) {
        window.instrumentObject = instrumentObject;
    }
    // Log calls to a given function
    // This helper function returns a wrapper around `func` which logs calls
    // to `func`. `objectName` and `methodName` are used strictly to identify
    // which object method `func` is coming from in the logs
    function instrumentFunction(objectName, methodName, func, logSettings) {
        return function () {
            const callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
            logCall(objectName + "." + methodName, arguments, callContext, logSettings);
            return func.apply(this, arguments);
        };
    }
    // Log properties of prototypes and objects
    function instrumentObjectProperty(object, objectName, propertyName, logSettings = {}) {
        // Store original descriptor in closure
        const propDesc = Object.getPropertyDescriptor(object, propertyName);
        if (!propDesc) {
            console.error("Property descriptor not found for", objectName, propertyName, object);
            return;
        }
        // Instrument data or accessor property descriptors
        const originalGetter = propDesc.get;
        const originalSetter = propDesc.set;
        let originalValue = propDesc.value;
        // We overwrite both data and accessor properties as an instrumented
        // accessor property
        Object.defineProperty(object, propertyName, {
            configurable: true,
            get: (function () {
                return function () {
                    let origProperty;
                    const callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
                    // get original value
                    if (originalGetter) {
                        // if accessor property
                        origProperty = originalGetter.call(this);
                    }
                    else if ("value" in propDesc) {
                        // if data property
                        origProperty = originalValue;
                    }
                    else {
                        console.error("Property descriptor for", objectName + "." + propertyName, "doesn't have getter or value?");
                        logValue(objectName + "." + propertyName, "", "get(failed)", callContext, logSettings);
                        return;
                    }
                    // Log `gets` except those that have instrumented return values
                    // * All returned functions are instrumented with a wrapper
                    // * Returned objects may be instrumented if recursive
                    //   instrumentation is enabled and this isn't at the depth limit.
                    if (typeof origProperty === "function") {
                        return instrumentFunction(objectName, propertyName, origProperty, logSettings);
                    }
                    else if (typeof origProperty === "object" &&
                        !!logSettings.recursive &&
                        (!("depth" in logSettings) || logSettings.depth > 0)) {
                        return origProperty;
                    }
                    else {
                        logValue(objectName + "." + propertyName, origProperty, "get", callContext, logSettings);
                        return origProperty;
                    }
                };
            })(),
            set: (function () {
                return function (value) {
                    const callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
                    let returnValue;
                    // Prevent sets for functions and objects if enabled
                    if (!!logSettings.preventSets &&
                        (typeof originalValue === "function" ||
                            typeof originalValue === "object")) {
                        logValue(objectName + "." + propertyName, value, "set(prevented)", callContext, logSettings);
                        return value;
                    }
                    // set new value to original setter/location
                    if (originalSetter) {
                        // if accessor property
                        returnValue = originalSetter.call(this, value);
                    }
                    else if ("value" in propDesc) {
                        inLog = true;
                        if (object.isPrototypeOf(this)) {
                            Object.defineProperty(this, propertyName, {
                                value,
                            });
                        }
                        else {
                            originalValue = value;
                        }
                        returnValue = value;
                        inLog = false;
                    }
                    else {
                        console.error("Property descriptor for", objectName + "." + propertyName, "doesn't have setter or value?");
                        logValue(objectName + "." + propertyName, value, "set(failed)", callContext, logSettings);
                        return value;
                    }
                    // log set
                    logValue(objectName + "." + propertyName, value, "set", callContext, logSettings);
                    // return new value
                    return returnValue;
                };
            })(),
        });
    }
    /**
     * Prebid.js
     */
    // Wait for window.pbjs to be available
    const prebidJsAvailable = new Promise(function (resolve) {
        const now = Date.now();
        function check() {
            if (typeof window.pbjs !== "undefined") {
                return resolve();
            }
            else {
                // Keep checking for 10 seconds
                if (Date.now() - now < 10000) {
                    setTimeout(check, 10);
                }
                else {
                    console.log("Stopped checking for Prebid.js loading on this page (10s have passed)");
                }
            }
        }
        check();
    });
    prebidJsAvailable.then(function () {
        console.log("Prebis.js available - instrumenting...");
        instrumentObject(window.pbjs, "pbjs", {});
    });
    // TODO instrument prebid.js events
    //
    /*
     * Start Instrumentation
     */
    // TODO: user should be able to choose what to instrument
    /*
    // Access to navigator properties
    const navigatorProperties = [
      "appCodeName",
      "appName",
      "appVersion",
      "buildID",
      "cookieEnabled",
      "doNotTrack",
      "geolocation",
      "language",
      "languages",
      "onLine",
      "oscpu",
      "platform",
      "product",
      "productSub",
      "userAgent",
      "vendorSub",
      "vendor",
    ];
    navigatorProperties.forEach(function(property) {
      instrumentObjectProperty(window.navigator, "window.navigator", property);
    });
  
    // Access to screen properties
    // instrumentObject(window.screen, "window.screen");
    // TODO: why do we instrument only two screen properties
    const screenProperties = ["pixelDepth", "colorDepth"];
    screenProperties.forEach(function(property) {
      instrumentObjectProperty(window.screen, "window.screen", property);
    });
  
    // Access to plugins
    const pluginProperties = [
      "name",
      "filename",
      "description",
      "version",
      "length",
    ];
    for (let i = 0; i < window.navigator.plugins.length; i++) {
      const pluginName = window.navigator.plugins[i].name;
      pluginProperties.forEach(function(property) {
        instrumentObjectProperty(
          window.navigator.plugins[pluginName],
          "window.navigator.plugins[" + pluginName + "]",
          property,
        );
      });
    }
  
    // Access to MIMETypes
    const mimeTypeProperties = ["description", "suffixes", "type"];
    for (let i = 0; i < window.navigator.mimeTypes.length; i++) {
      const mimeTypeName = ((window.navigator.mimeTypes[
        i
      ] as unknown) as MimeType).type; // note: upstream typings seems to be incorrect
      mimeTypeProperties.forEach(function(property) {
        instrumentObjectProperty(
          window.navigator.mimeTypes[mimeTypeName],
          "window.navigator.mimeTypes[" + mimeTypeName + "]",
          property,
        );
      });
    }
    // Name, localStorage, and sessionsStorage logging
    // Instrumenting window.localStorage directly doesn't seem to work, so the Storage
    // prototype must be instrumented instead. Unfortunately this fails to differentiate
    // between sessionStorage and localStorage. Instead, you'll have to look for a sequence
    // of a get for the localStorage object followed by a getItem/setItem for the Storage object.
    const windowProperties = ["name", "localStorage", "sessionStorage"];
    windowProperties.forEach(function(property) {
      instrumentObjectProperty(window, "window", property);
    });
    instrumentObject(window.Storage.prototype, "window.Storage");
  
    // Access to document.cookie
    instrumentObjectProperty(window.document, "window.document", "cookie", {
      logCallStack: true,
    });
  
    // Access to document.referrer
    instrumentObjectProperty(window.document, "window.document", "referrer", {
      logCallStack: true,
    });
  
    // Access to canvas
    instrumentObject(window.HTMLCanvasElement.prototype, "HTMLCanvasElement");
  
    const excludedProperties = [
      "quadraticCurveTo",
      "lineTo",
      "transform",
      "globalAlpha",
      "moveTo",
      "drawImage",
      "setTransform",
      "clearRect",
      "closePath",
      "beginPath",
      "canvas",
      "translate",
    ];
    instrumentObject(
      window.CanvasRenderingContext2D.prototype,
      "CanvasRenderingContext2D",
      { excludedProperties },
    );
  
    // Access to webRTC
    instrumentObject(window.RTCPeerConnection.prototype, "RTCPeerConnection");
  
    // Access to Audio API
    instrumentObject(window.AudioContext.prototype, "AudioContext");
    instrumentObject(window.OfflineAudioContext.prototype, "OfflineAudioContext");
    instrumentObject(window.OscillatorNode.prototype, "OscillatorNode");
    instrumentObject(window.AnalyserNode.prototype, "AnalyserNode");
    instrumentObject(window.GainNode.prototype, "GainNode");
    instrumentObject(window.ScriptProcessorNode.prototype, "ScriptProcessorNode");
    */
    if (testing) {
        console.log("OpenWPM: Content-side javascript instrumentation started", new Date().toISOString());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsb0ZBQW9GO0FBZ0JwRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDeEIseUJBQXlCO0lBQ3pCLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUs7UUFDN0MsSUFBSSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDO1FBRTlDLE1BQU0sS0FBSyxHQUFHO1lBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7Z0JBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDZCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO2lCQUN2QjthQUNGO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsT0FBTztZQUNMLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ2pCLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsTUFBTSxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBRUQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFrQjtJQUVsQiwrQkFBK0I7SUFDL0IsTUFBTSxJQUFJLEdBQUcsQ0FBQztRQUNaLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixtQ0FBbUM7UUFDbkMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsTUFBTSxFQUFFLFFBQVE7YUFDakIsQ0FBQyxDQUNILENBQUM7WUFFRixrQkFBa0I7WUFDbEIsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixPQUFPLFVBQVMsT0FBTyxFQUFFLEdBQUc7WUFDMUIsb0JBQW9CO1lBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLEtBQUssRUFBRSxDQUFDO1FBQ1YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVMLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXRFOztPQUVHO0lBRUgsTUFBTSxPQUFPLEdBQ1gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQ2pFLElBQUksT0FBTyxFQUFFO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyRDtJQUVELDhDQUE4QztJQUM5QyxTQUFTLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxjQUFjLEdBQUcsS0FBSztRQUMxRCxJQUFJLE9BQU8sS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUN4QjtRQUNELElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDL0IsT0FBTyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNsQztRQUVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO2dCQUN2QixJQUFJLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQztnQkFDbkQsSUFBSSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN6QixJQUFJLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLElBQUksY0FBYyxFQUFFO29CQUNsQixJQUFJLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQzdCLElBQUksSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQ3BDLElBQUksSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7aUJBQ3hDO2dCQUNELElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7b0JBQzNCLElBQUksSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFDNUI7Z0JBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQztnQkFDWixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pFLFlBQVksRUFBRSxDQUFDO2FBQ2hCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsZ0NBQWdDO0lBQ2hDLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsR0FBRyxLQUFLO1FBQ3pELDRCQUE0QjtRQUM1QixJQUFJO1lBQ0YsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNuQixPQUFPLE1BQU0sQ0FBQzthQUNmO1lBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7Z0JBQ2hDLElBQUksa0JBQWtCLEVBQUU7b0JBQ3RCLE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDTCxPQUFPLFVBQVUsQ0FBQztpQkFDbkI7YUFDRjtZQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QixPQUFPLE1BQU0sQ0FBQzthQUNmO1lBQ0QsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSztnQkFDL0MsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUNsQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtnQkFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTtvQkFDL0IsSUFBSSxrQkFBa0IsRUFBRTt3QkFDdEIsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNMLE9BQU8sVUFBVSxDQUFDO3FCQUNuQjtpQkFDRjtnQkFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDN0IscUNBQXFDO29CQUNyQyxJQUFJLGlCQUFpQixJQUFJLEtBQUssRUFBRTt3QkFDOUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7cUJBQy9CO29CQUVELHlCQUF5QjtvQkFDekIsSUFBSSxLQUFLLFlBQVksV0FBVyxFQUFFO3dCQUNoQyxPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNuQztvQkFFRCwrQkFBK0I7b0JBQy9CLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDaEQsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7eUJBQU07d0JBQ0wsT0FBTyxPQUFPLEtBQUssQ0FBQztxQkFDckI7aUJBQ0Y7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE9BQU8sdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELFNBQVMsaUJBQWlCLENBQUMsS0FBSztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLFNBQVMsYUFBYTtRQUNwQixJQUFJLEtBQUssQ0FBQztRQUVWLElBQUk7WUFDRixNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FDbkI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMENBQTBDO0lBQzFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVMsR0FBRyxFQUFFLFFBQVE7UUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLFFBQVE7WUFDYixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNaLENBQUMsQ0FBQztJQUVGLFNBQVMsMkJBQTJCLENBQUMsWUFBWSxHQUFHLEtBQUs7UUFDdkQsTUFBTSxLQUFLLEdBQUcsYUFBYSxFQUFFO2FBQzFCLElBQUksRUFBRTthQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNmLG9EQUFvRDtRQUNwRCxNQUFNLGFBQWEsR0FBRztZQUNwQixTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxFQUFFO1lBQ2QsU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsRUFBRTtZQUNaLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxhQUFhLENBQUM7U0FDdEI7UUFDRCwwRUFBMEU7UUFDMUUsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPLGFBQWEsQ0FBQztTQUN0QjtRQUNEOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSTtZQUNGLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7WUFDckQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hDLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRCxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMseUNBQXlDO1lBQzdGLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNwQixTQUFTLEdBQUcsY0FBYyxDQUFDLENBQUMsb0RBQW9EO2FBQ2pGO2lCQUFNO2dCQUNMLFNBQVMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0MsYUFBYSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQ2xDLFNBQVMsR0FBRyxDQUFDLEVBQ2IsY0FBYyxDQUFDLE1BQU0sQ0FDdEIsQ0FBQzthQUNIO1lBQ0QsTUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFNBQVM7Z0JBQ1QsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixRQUFRO2dCQUNSLGFBQWE7Z0JBQ2IsU0FBUyxFQUFFLFlBQVk7b0JBQ3JCLENBQUMsQ0FBQyxLQUFLO3lCQUNGLEtBQUssQ0FBQyxDQUFDLENBQUM7eUJBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVixJQUFJLEVBQUU7b0JBQ1gsQ0FBQyxDQUFDLEVBQUU7YUFDUCxDQUFDO1lBQ0YsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELG1FQUFtRTtJQUNuRSxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUNoQyxTQUFTLDJCQUEyQixDQUFDLFNBQVMsRUFBRSxNQUFNO1FBQ3BELE1BQU0sR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksR0FBRyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxFQUFFO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUU7WUFDL0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0wsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELCtDQUErQztJQUMvQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFbEIsZ0RBQWdEO0lBQ2hELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVoQix5Q0FBeUM7SUFDekMsU0FBUyxRQUFRLENBQ2Ysd0JBQXdCLEVBQ3hCLEtBQUssRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVc7UUFFWCxJQUFJLEtBQUssRUFBRTtZQUNULE9BQU87U0FDUjtRQUNELEtBQUssR0FBRyxJQUFJLENBQUM7UUFFYixNQUFNLFNBQVMsR0FBRywyQkFBMkIsQ0FDM0MsV0FBVyxDQUFDLFNBQVMsRUFDckIsd0JBQXdCLENBQ3pCLENBQUM7UUFDRixJQUFJLFNBQVMsRUFBRTtZQUNiLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxPQUFPO1NBQ1I7UUFFRCxNQUFNLEdBQUcsR0FBRztZQUNWLFNBQVM7WUFDVCxNQUFNLEVBQUUsd0JBQXdCO1lBQ2hDLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUM7WUFDbEUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO1lBQ2hDLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVTtZQUNsQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVM7WUFDaEMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO1lBQzlCLGFBQWEsRUFBRSxXQUFXLENBQUMsYUFBYTtZQUN4QyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVM7WUFDaEMsT0FBTyxFQUFFLE9BQU8sRUFBRTtTQUNuQixDQUFDO1FBRUYsSUFBSTtZQUNGLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNoRCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUVELEtBQUssR0FBRyxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixTQUFTLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVc7UUFDdkUsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPO1NBQ1I7UUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWIsTUFBTSxTQUFTLEdBQUcsMkJBQTJCLENBQzNDLFdBQVcsQ0FBQyxTQUFTLEVBQ3JCLHdCQUF3QixDQUN6QixDQUFDO1FBQ0YsSUFBSSxTQUFTLEVBQUU7WUFDYixLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2QsT0FBTztTQUNSO1FBRUQsSUFBSTtZQUNGLHFFQUFxRTtZQUNyRSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLFVBQVUsQ0FBQyxJQUFJLENBQ2IsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQzlELENBQUM7YUFDSDtZQUNELE1BQU0sR0FBRyxHQUFHO2dCQUNWLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixNQUFNLEVBQUUsd0JBQXdCO2dCQUNoQyxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO2dCQUNoQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVU7Z0JBQ2xDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUztnQkFDaEMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2dCQUM5QixhQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWE7Z0JBQ3hDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUztnQkFDaEMsT0FBTyxFQUFFLE9BQU8sRUFBRTthQUNuQixDQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrQ0FBa0MsR0FBRyx3QkFBd0IsQ0FDOUQsQ0FBQztZQUNGLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNoQixDQUFDO0lBRUQsb0ZBQW9GO0lBQ3BGLHlFQUF5RTtJQUN6RSxNQUFNLENBQUMscUJBQXFCLEdBQUcsVUFBUyxPQUFPLEVBQUUsSUFBSTtRQUNuRCxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsT0FBTyxFQUFFLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekMsRUFBRSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFTLE9BQU87UUFDeEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsT0FBTyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO1FBQ0Qsb0RBQW9EO1FBQ3BELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWTtRQUNwQyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUk7WUFDRixRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2pDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3JCLHdCQUF3QjtZQUN4QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxPQUFPLFFBQVEsS0FBSyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQVlELFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUEyQixFQUFFO1FBQ3pFLHVDQUF1QztRQUN2QyxFQUFFO1FBQ0YsYUFBYTtRQUNiLGFBQWE7UUFDYixvQkFBb0I7UUFDcEIsMkJBQTJCO1FBQzNCLHdCQUF3QjtRQUN4QixnRUFBZ0U7UUFDaEUseUJBQXlCO1FBQ3pCLHVFQUF1RTtRQUN2RSxtREFBbUQ7UUFDbkQsRUFBRTtRQUNGLHFDQUFxQztRQUNyQyxzQkFBc0I7UUFDdEIsbUNBQW1DO1FBQ25DLHNFQUFzRTtRQUN0RSxzQkFBc0I7UUFDdEIsK0JBQStCO1FBQy9CLG9FQUFvRTtRQUNwRSxhQUFhO1FBQ2IsMkJBQTJCO1FBQzNCLG9FQUFvRTtRQUNwRSwwQkFBMEI7UUFDMUIsb0NBQW9DO1FBQ3BDLGlFQUFpRTtRQUNqRSxrREFBa0Q7UUFDbEQsMEJBQTBCO1FBQzFCLHFFQUFxRTtRQUNyRSxtRUFBbUU7UUFDbkUscUVBQXFFO1FBQ3JFLG1DQUFtQztRQUNuQyx3QkFBd0I7UUFDeEIsdUVBQXVFO1FBQ3ZFLDZDQUE2QztRQUM3QyxZQUFZO1FBQ1osc0VBQXNFO1FBQ3RFLDRCQUE0QjtRQUM1Qiw4REFBOEQ7UUFDOUQsZ0VBQWdFO1FBQ2hFLDJEQUEyRDtRQUMzRCxvQkFBb0I7UUFDcEIsNkRBQTZEO1FBQzdELHNCQUFzQjtRQUN0QixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsc0JBQXNCO1lBQ25ELENBQUMsQ0FBQyxXQUFXLENBQUMsc0JBQXNCO1lBQ3BDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFDRSxXQUFXLENBQUMsa0JBQWtCO2dCQUM5QixXQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMxRDtnQkFDQSxTQUFTO2FBQ1Y7WUFDRCxnRUFBZ0U7WUFDaEUsc0VBQXNFO1lBQ3RFLHFFQUFxRTtZQUNyRSxJQUNFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUztnQkFDdkIsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVc7Z0JBQzdCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFDcEQ7Z0JBQ0Esa0RBQWtEO2dCQUNsRCxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLEVBQUU7b0JBQzdCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxnQkFBZ0IsQ0FDZCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3JCLFVBQVUsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUNoQztvQkFDRSxrQkFBa0IsRUFBRSxXQUFXLENBQUMsa0JBQWtCO29CQUNsRCxZQUFZLEVBQUUsV0FBVyxDQUFDLFlBQVk7b0JBQ3RDLHFCQUFxQixFQUFFLFdBQVcsQ0FBQyxxQkFBcUI7b0JBQ3hELFdBQVcsRUFBRSxXQUFXLENBQUMsV0FBVztvQkFDcEMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO29CQUNoQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDO2lCQUM3QixDQUNGLENBQUM7YUFDSDtZQUNELElBQUk7Z0JBQ0Ysd0JBQXdCLENBQ3RCLE1BQU0sRUFDTixVQUFVLEVBQ1YsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUNiLFdBQVcsQ0FDWixDQUFDO2FBQ0g7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQztJQUNELElBQUksT0FBTyxFQUFFO1FBQ1YsTUFBYyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0tBQ3JEO0lBRUQsZ0NBQWdDO0lBQ2hDLHdFQUF3RTtJQUN4RSx5RUFBeUU7SUFDekUsd0RBQXdEO0lBQ3hELFNBQVMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVztRQUNuRSxPQUFPO1lBQ0wsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQzdDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUMzQixDQUFDO1lBQ0YsT0FBTyxDQUNMLFVBQVUsR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUM3QixTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsQ0FDWixDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLFNBQVMsd0JBQXdCLENBQy9CLE1BQU0sRUFDTixVQUFVLEVBQ1YsWUFBWSxFQUNaLGNBQTJCLEVBQUU7UUFFN0IsdUNBQXVDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQ1gsbUNBQW1DLEVBQ25DLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxDQUNQLENBQUM7WUFDRixPQUFPO1NBQ1I7UUFFRCxtREFBbUQ7UUFDbkQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUNwQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3BDLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFFbkMsb0VBQW9FO1FBQ3BFLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUU7WUFDMUMsWUFBWSxFQUFFLElBQUk7WUFDbEIsR0FBRyxFQUFFLENBQUM7Z0JBQ0osT0FBTztvQkFDTCxJQUFJLFlBQVksQ0FBQztvQkFDakIsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQzdDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUMzQixDQUFDO29CQUVGLHFCQUFxQjtvQkFDckIsSUFBSSxjQUFjLEVBQUU7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsWUFBWSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzFDO3lCQUFNLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTt3QkFDOUIsbUJBQW1CO3dCQUNuQixZQUFZLEdBQUcsYUFBYSxDQUFDO3FCQUM5Qjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUNYLHlCQUF5QixFQUN6QixVQUFVLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFDL0IsK0JBQStCLENBQ2hDLENBQUM7d0JBQ0YsUUFBUSxDQUNOLFVBQVUsR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUMvQixFQUFFLEVBQ0YsYUFBYSxFQUNiLFdBQVcsRUFDWCxXQUFXLENBQ1osQ0FBQzt3QkFDRixPQUFPO3FCQUNSO29CQUVELCtEQUErRDtvQkFDL0QsMkRBQTJEO29CQUMzRCxzREFBc0Q7b0JBQ3RELGtFQUFrRTtvQkFDbEUsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7d0JBQ3RDLE9BQU8sa0JBQWtCLENBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsQ0FDWixDQUFDO3FCQUNIO3lCQUFNLElBQ0wsT0FBTyxZQUFZLEtBQUssUUFBUTt3QkFDaEMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO3dCQUN2QixDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFDcEQ7d0JBQ0EsT0FBTyxZQUFZLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNMLFFBQVEsQ0FDTixVQUFVLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFDL0IsWUFBWSxFQUNaLEtBQUssRUFDTCxXQUFXLEVBQ1gsV0FBVyxDQUNaLENBQUM7d0JBQ0YsT0FBTyxZQUFZLENBQUM7cUJBQ3JCO2dCQUNILENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUFFO1lBQ0osR0FBRyxFQUFFLENBQUM7Z0JBQ0osT0FBTyxVQUFTLEtBQUs7b0JBQ25CLE1BQU0sV0FBVyxHQUFHLDJCQUEyQixDQUM3QyxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FDM0IsQ0FBQztvQkFDRixJQUFJLFdBQVcsQ0FBQztvQkFFaEIsb0RBQW9EO29CQUNwRCxJQUNFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVzt3QkFDekIsQ0FBQyxPQUFPLGFBQWEsS0FBSyxVQUFVOzRCQUNsQyxPQUFPLGFBQWEsS0FBSyxRQUFRLENBQUMsRUFDcEM7d0JBQ0EsUUFBUSxDQUNOLFVBQVUsR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUMvQixLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxXQUFXLENBQ1osQ0FBQzt3QkFDRixPQUFPLEtBQUssQ0FBQztxQkFDZDtvQkFFRCw0Q0FBNEM7b0JBQzVDLElBQUksY0FBYyxFQUFFO3dCQUNsQix1QkFBdUI7d0JBQ3ZCLFdBQVcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDaEQ7eUJBQU0sSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO3dCQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNiLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDOUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO2dDQUN4QyxLQUFLOzZCQUNOLENBQUMsQ0FBQzt5QkFDSjs2QkFBTTs0QkFDTCxhQUFhLEdBQUcsS0FBSyxDQUFDO3lCQUN2Qjt3QkFDRCxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQ1gseUJBQXlCLEVBQ3pCLFVBQVUsR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUMvQiwrQkFBK0IsQ0FDaEMsQ0FBQzt3QkFDRixRQUFRLENBQ04sVUFBVSxHQUFHLEdBQUcsR0FBRyxZQUFZLEVBQy9CLEtBQUssRUFDTCxhQUFhLEVBQ2IsV0FBVyxFQUNYLFdBQVcsQ0FDWixDQUFDO3dCQUNGLE9BQU8sS0FBSyxDQUFDO3FCQUNkO29CQUVELFVBQVU7b0JBQ1YsUUFBUSxDQUNOLFVBQVUsR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUMvQixLQUFLLEVBQ0wsS0FBSyxFQUNMLFdBQVcsRUFDWCxXQUFXLENBQ1osQ0FBQztvQkFFRixtQkFBbUI7b0JBQ25CLE9BQU8sV0FBVyxDQUFDO2dCQUNyQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsRUFBRTtTQUNMLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUVILHVDQUF1QztJQUN2QyxNQUFNLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTztRQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsU0FBUyxLQUFLO1lBQ1osSUFBSSxPQUFRLE1BQWMsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO2dCQUMvQyxPQUFPLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNMLCtCQUErQjtnQkFDL0IsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRTtvQkFDNUIsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO2lCQUN0RjthQUNGO1FBQ0gsQ0FBQztRQUNELEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQyxDQUFDLENBQUM7SUFFTCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3RELGdCQUFnQixDQUNiLE1BQWMsQ0FBQyxJQUFJLEVBQ3BCLE1BQU0sRUFDTixFQUFFLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsbUNBQW1DO0lBQ25DLEVBQUU7SUFFRjs7T0FFRztJQUNILHlEQUF5RDtJQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bd0hFO0lBRUYsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUNULDBEQUEwRCxFQUMxRCxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUN6QixDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUMifQ==

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/index.js ***!
  \***************************************************************************/
/*! exports provided: transformCookieObjectToMatchOpenWPMSchema, CookieInstrument, HttpInstrument, JavascriptInstrument, transformWebNavigationBaseEventDetailsToOpenWPMSchema, NavigationInstrument, injectJavascriptInstrumentPageScript, HttpPostParser, encode_utf8, escapeString, escapeUrl, boolToInt, dateTimeUnicodeFormatString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/cookie-instrument */ "./node_modules/openwpm-webext-instrumentation/build/module/background/cookie-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformCookieObjectToMatchOpenWPMSchema", function() { return _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__["transformCookieObjectToMatchOpenWPMSchema"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookieInstrument", function() { return _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__["CookieInstrument"]; });

/* harmony import */ var _background_http_instrument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background/http-instrument */ "./node_modules/openwpm-webext-instrumentation/build/module/background/http-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpInstrument", function() { return _background_http_instrument__WEBPACK_IMPORTED_MODULE_1__["HttpInstrument"]; });

/* harmony import */ var _background_javascript_instrument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background/javascript-instrument */ "./node_modules/openwpm-webext-instrumentation/build/module/background/javascript-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavascriptInstrument", function() { return _background_javascript_instrument__WEBPACK_IMPORTED_MODULE_2__["JavascriptInstrument"]; });

/* harmony import */ var _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./background/navigation-instrument */ "./node_modules/openwpm-webext-instrumentation/build/module/background/navigation-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformWebNavigationBaseEventDetailsToOpenWPMSchema", function() { return _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_3__["transformWebNavigationBaseEventDetailsToOpenWPMSchema"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigationInstrument", function() { return _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_3__["NavigationInstrument"]; });

/* harmony import */ var _content_javascript_instrument_content_scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/javascript-instrument-content-scope */ "./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-content-scope.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "injectJavascriptInstrumentPageScript", function() { return _content_javascript_instrument_content_scope__WEBPACK_IMPORTED_MODULE_4__["injectJavascriptInstrumentPageScript"]; });

/* harmony import */ var _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/http-post-parser */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/http-post-parser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpPostParser", function() { return _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_5__["HttpPostParser"]; });

/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/string-utils */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encode_utf8", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["encode_utf8"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeString", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["escapeString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeUrl", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["escapeUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolToInt", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["boolToInt"]; });

/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./schema */ "./node_modules/openwpm-webext-instrumentation/build/module/schema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeUnicodeFormatString", function() { return _schema__WEBPACK_IMPORTED_MODULE_7__["dateTimeUnicodeFormatString"]; });









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxjQUFjLDhCQUE4QixDQUFDO0FBQzdDLGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxjQUFjLCtDQUErQyxDQUFDO0FBQzlELGNBQWMsd0JBQXdCLENBQUM7QUFDdkMsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLFVBQVUsQ0FBQyJ9

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-event-ordinal.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-event-ordinal.js ***!
  \*********************************************************************************************************/
/*! exports provided: incrementedEventOrdinal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "incrementedEventOrdinal", function() { return incrementedEventOrdinal; });
/**
 * This enables us to keep information about the original order
 * in which events arrived to our event listeners.
 */
let eventOrdinal = 0;
const incrementedEventOrdinal = () => {
    return eventOrdinal++;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO0lBQzFDLE9BQU8sWUFBWSxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-uuid.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/extension-session-uuid.js ***!
  \************************************************************************************************/
/*! exports provided: extensionSessionUuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extensionSessionUuid", function() { return extensionSessionUuid; });
/* harmony import */ var _uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/uuid.js");

/**
 * This enables us to access a unique reference to this browser
 * session - regenerated any time the background process gets
 * restarted (which should only be on browser restarts)
 */
const extensionSessionUuid = Object(_uuid__WEBPACK_IMPORTED_MODULE_0__["makeUUID"])();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLEVBQUUsQ0FBQyJ9

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/http-post-parser.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/http-post-parser.js ***!
  \******************************************************************************************/
/*! exports provided: HttpPostParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpPostParser", function() { return HttpPostParser; });
// Incorporates code from: https://github.com/redline13/selenium-jmeter/blob/6966d4b326cd78261e31e6e317076569051cac37/content/library/recorder/HttpPostParser.js
class HttpPostParser {
    /*
    private hasheaders: boolean;
    private seekablestream;
    private stream;
    private postBody;
    private postLines;
    private postHeaders;
    private body;
    */
    constructor(
    // onBeforeSendHeadersEventDetails: WebRequestOnBeforeSendHeadersEventDetails,
    onBeforeRequestEventDetails, dataReceiver) {
        // this.onBeforeSendHeadersEventDetails = onBeforeSendHeadersEventDetails;
        this.onBeforeRequestEventDetails = onBeforeRequestEventDetails;
        this.dataReceiver = dataReceiver;
        /*
        console.log(
          "HttpPostParser",
          // onBeforeSendHeadersEventDetails,
          onBeforeRequestEventDetails,
        );
        */
    }
    /**
     * @param encodingType from the HTTP Request headers
     */
    parsePostRequest( /*encodingType*/) {
        // const requestHeaders = this.onBeforeSendHeadersEventDetails.requestHeaders;
        const requestBody = this.onBeforeRequestEventDetails.requestBody;
        if (requestBody.error) {
            this.dataReceiver.logError("Exception: Upstream failed to parse POST: " + requestBody.error);
        }
        if (requestBody.formData) {
            return {
                // TODO: requestBody.formData should probably be transformed into another format
                post_body: requestBody.formData,
            };
        }
        // Return empty response until we have all instrumentation converted
        return {};
        /*
        this.dataReceiver.logDebug(
          "Exception: Instrumentation to parse POST requests without formData is not yet restored",
        );
    
        // TODO: Refactor to corresponding webext logic or discard
        try {
          this.setupStream();
          this.parseStream();
        } catch (e) {
          this.dataReceiver.logError("Exception: Failed to parse POST: " + e);
          return {};
        }
    
        const postBody = this.postBody;
    
        if (!postBody) {
          // some scripts strangely sends empty post bodies (confirmed with the developer tools)
          return {};
        }
    
        let isMultiPart = false; // encType: multipart/form-data
        const postHeaders = this.postHeaders; // request headers from upload stream
        // See, http://stackoverflow.com/questions/16548517/what-is-request-headers-from-upload-stream
    
        // add encodingType from postHeaders if it's missing
        if (!encodingType && postHeaders && "Content-Type" in postHeaders) {
          encodingType = postHeaders["Content-Type"];
        }
    
        if (encodingType.indexOf("multipart/form-data") !== -1) {
          isMultiPart = true;
        }
    
        let jsonPostData = "";
        let escapedJsonPostData = "";
        if (isMultiPart) {
          jsonPostData = this.parseMultiPartData(postBody /*, encodingType* /);
          escapedJsonPostData = escapeString(jsonPostData);
        } else {
          jsonPostData = this.parseEncodedFormData(postBody, encodingType);
          escapedJsonPostData = escapeString(jsonPostData);
        }
        return { post_headers: postHeaders, post_body: escapedJsonPostData };
        */
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wb3N0LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaHR0cC1wb3N0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnS0FBZ0s7QUFlaEssTUFBTSxPQUFPLGNBQWM7SUFJekI7Ozs7Ozs7O01BUUU7SUFFRjtJQUNFLDhFQUE4RTtJQUM5RSwyQkFBa0UsRUFDbEUsWUFBWTtRQUVaLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakM7Ozs7OztVQU1FO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksZ0JBQWdCLEVBQUMsZ0JBQWdCO1FBQ3RDLDhFQUE4RTtRQUM5RSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDO1FBQ2pFLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDeEIsNENBQTRDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FDakUsQ0FBQztTQUNIO1FBQ0QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3hCLE9BQU87Z0JBQ0wsZ0ZBQWdGO2dCQUNoRixTQUFTLEVBQUUsV0FBVyxDQUFDLFFBQVE7YUFDaEMsQ0FBQztTQUNIO1FBRUQsb0VBQW9FO1FBQ3BFLE9BQU8sRUFBRSxDQUFDO1FBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBNENFO0lBQ0osQ0FBQztDQTJURiJ9

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-navigation.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-navigation.js ***!
  \********************************************************************************************/
/*! exports provided: PendingNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingNavigation", function() { return PendingNavigation; });
/**
 * Ties together the two separate navigation events that together holds information about both parent frame id and transition-related attributes
 */
class PendingNavigation {
    constructor() {
        this.onBeforeNavigateEventNavigation = new Promise(resolve => {
            this.resolveOnBeforeNavigateEventNavigation = resolve;
        });
        this.onCommittedEventNavigation = new Promise(resolve => {
            this.resolveOnCommittedEventNavigation = resolve;
        });
    }
    resolved() {
        return Promise.all([
            this.onBeforeNavigateEventNavigation,
            this.onCommittedEventNavigation,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise(resolve => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wZW5kaW5nLW5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBSzVCO1FBQ0UsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSxRQUFRO1FBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQywrQkFBK0I7WUFDcEMsSUFBSSxDQUFDLDBCQUEwQjtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRiJ9

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-request.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-request.js ***!
  \*****************************************************************************************/
/*! exports provided: PendingRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingRequest", function() { return PendingRequest; });
/**
 * Ties together the two separate events that together holds information about both request headers and body
 */
class PendingRequest {
    constructor() {
        this.onBeforeRequestEventDetails = new Promise(resolve => {
            this.resolveOnBeforeRequestEventDetails = resolve;
        });
        this.onBeforeSendHeadersEventDetails = new Promise(resolve => {
            this.resolveOnBeforeSendHeadersEventDetails = resolve;
        });
    }
    resolved() {
        return Promise.all([
            this.onBeforeRequestEventDetails,
            this.onBeforeSendHeadersEventDetails,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise(resolve => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wZW5kaW5nLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQWF6QjtRQUNFLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsa0NBQWtDLEdBQUcsT0FBTyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ00sUUFBUTtRQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsMkJBQTJCO1lBQ2hDLElBQUksQ0FBQywrQkFBK0I7U0FDckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRCxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-response.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/pending-response.js ***!
  \******************************************************************************************/
/*! exports provided: PendingResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingResponse", function() { return PendingResponse; });
/* harmony import */ var _response_body_listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./response-body-listener */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/response-body-listener.js");

/**
 * Ties together the two separate events that together holds information about both response headers and body
 */
class PendingResponse {
    constructor() {
        this.onBeforeRequestEventDetails = new Promise(resolve => {
            this.resolveOnBeforeRequestEventDetails = resolve;
        });
        this.onCompletedEventDetails = new Promise(resolve => {
            this.resolveOnCompletedEventDetails = resolve;
        });
    }
    addResponseResponseBodyListener(details) {
        this.responseBodyListener = new _response_body_listener__WEBPACK_IMPORTED_MODULE_0__["ResponseBodyListener"](details);
    }
    resolved() {
        return Promise.all([
            this.onBeforeRequestEventDetails,
            this.onCompletedEventDetails,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise(resolve => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGVuZGluZy1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBYzFCO1FBQ0UsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxPQUFPLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLDhCQUE4QixHQUFHLE9BQU8sQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSwrQkFBK0IsQ0FDcEMsT0FBOEM7UUFFOUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNNLFFBQVE7UUFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLDJCQUEyQjtZQUNoQyxJQUFJLENBQUMsdUJBQXVCO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/response-body-listener.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/response-body-listener.js ***!
  \************************************************************************************************/
/*! exports provided: ResponseBodyListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseBodyListener", function() { return ResponseBodyListener; });
/* harmony import */ var _sha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha256 */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/sha256.js");

class ResponseBodyListener {
    constructor(details) {
        this.responseBody = new Promise(resolve => {
            this.resolveResponseBody = resolve;
        });
        this.contentHash = new Promise(resolve => {
            this.resolveContentHash = resolve;
        });
        // Used to parse Response stream
        const filter = browser.webRequest.filterResponseData(details.requestId);
        const decoder = new TextDecoder("utf-8");
        // const encoder = new TextEncoder();
        let responseBody = "";
        filter.ondata = event => {
            Object(_sha256__WEBPACK_IMPORTED_MODULE_0__["sha256Buffer"])(event.data).then(digest => {
                this.resolveContentHash(digest);
            });
            const str = decoder.decode(event.data, { stream: true });
            responseBody = responseBody + str;
            // pass through all the response data
            filter.write(event.data);
        };
        filter.onstop = _event => {
            this.resolveResponseBody(responseBody);
            filter.disconnect();
        };
    }
    async getResponseBody() {
        return this.responseBody;
    }
    async getContentHash() {
        return this.contentHash;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UtYm9keS1saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmVzcG9uc2UtYm9keS1saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXhDLE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsWUFBWSxPQUE4QztRQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxNQUFNLEdBQVEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FDdkQsT0FBTyxDQUFDLFNBQVMsQ0FDWCxDQUFDO1FBRVQsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMscUNBQXFDO1FBRXJDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RCxZQUFZLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUNsQyxxQ0FBcUM7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/sha256.js":
/*!********************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/sha256.js ***!
  \********************************************************************************/
/*! exports provided: sha256, sha256Buffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256Buffer", function() { return sha256Buffer; });
/**
 * Code originally from the example at
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 *
 * Note: Using SHA256 instead of the previously used MD5 due to
 * the following comment found at the documentation page linked above:
 *
 * Warning: Older insecure hash functions, like MD5, are not supported
 * by this method. Even a supported method, SHA-1, is considered weak,
 * has been broken and should be avoided for cryptographic applications.
 */
function sha256(str) {
    // We transform the string into an arraybuffer.
    const buffer = new TextEncoder().encode(str);
    return sha256Buffer(buffer);
}
function sha256Buffer(buffer) {
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
        return hex(hash);
    });
}
function hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        const value = view.getUint32(i);
        // toString(16) will give the hex representation of the number without padding
        const stringValue = value.toString(16);
        // We use concatenation and slice for padding
        const padding = "00000000";
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    // Join all the hex strings into one
    return hexCodes.join("");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMjU2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zaGEyNTYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sVUFBVSxNQUFNLENBQUMsR0FBRztJQUN4QiwrQ0FBK0M7SUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBTTtJQUNqQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxJQUFJO1FBQy9ELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsR0FBRyxDQUFDLE1BQU07SUFDakIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDM0MseUZBQXlGO1FBQ3pGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsOEVBQThFO1FBQzlFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsNkNBQTZDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM1QjtJQUVELG9DQUFvQztJQUNwQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0IsQ0FBQyJ9

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/string-utils.js ***!
  \**************************************************************************************/
/*! exports provided: encode_utf8, escapeString, escapeUrl, boolToInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode_utf8", function() { return encode_utf8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeString", function() { return escapeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeUrl", function() { return escapeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boolToInt", function() { return boolToInt; });
function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}
const escapeString = function (str) {
    // Convert to string if necessary
    if (typeof str != "string") {
        str = String(str);
    }
    return encode_utf8(str);
};
const escapeUrl = function (url, stripDataUrlData = true) {
    url = escapeString(url);
    // data:[<mediatype>][;base64],<data>
    if (url.substr(0, 5) === "data:" &&
        stripDataUrlData &&
        url.indexOf(",") > -1) {
        url = url.substr(0, url.indexOf(",") + 1) + "<data-stripped>";
    }
    return url;
};
const boolToInt = function (bool) {
    return bool ? 1 : 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zdHJpbmctdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxVQUFTLEdBQVE7SUFDM0MsaUNBQWlDO0lBQ2pDLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFO1FBQzFCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFFRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFDdkIsR0FBVyxFQUNYLG1CQUE0QixJQUFJO0lBRWhDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIscUNBQXFDO0lBQ3JDLElBQ0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTztRQUM1QixnQkFBZ0I7UUFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDckI7UUFDQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztLQUMvRDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFVBQVMsSUFBYTtJQUM3QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/uuid.js":
/*!******************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/uuid.js ***!
  \******************************************************************************/
/*! exports provided: makeUUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUUID", function() { return makeUUID; });
/* tslint:disable:no-bitwise */
// from https://gist.github.com/jed/982883#gistcomment-2403369
const hex = [];
for (let i = 0; i < 256; i++) {
    hex[i] = (i < 16 ? "0" : "") + i.toString(16);
}
const makeUUID = () => {
    const r = crypto.getRandomValues(new Uint8Array(16));
    r[6] = (r[6] & 0x0f) | 0x40;
    r[8] = (r[8] & 0x3f) | 0x80;
    return (hex[r[0]] +
        hex[r[1]] +
        hex[r[2]] +
        hex[r[3]] +
        "-" +
        hex[r[4]] +
        hex[r[5]] +
        "-" +
        hex[r[6]] +
        hex[r[7]] +
        "-" +
        hex[r[8]] +
        hex[r[9]] +
        "-" +
        hex[r[10]] +
        hex[r[11]] +
        hex[r[12]] +
        hex[r[13]] +
        hex[r[14]] +
        hex[r[15]]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFFL0IsOERBQThEO0FBQzlELE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQy9DO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRTVCLE9BQU8sQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNYLENBQUM7QUFDSixDQUFDLENBQUMifQ==

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/schema.js":
/*!****************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/schema.js ***!
  \****************************************************************************/
/*! exports provided: dateTimeUnicodeFormatString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateTimeUnicodeFormatString", function() { return dateTimeUnicodeFormatString; });
// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
const dateTimeUnicodeFormatString = "yyyy-MM-dd'T'HH:mm:ss.SSSXX";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSwrRUFBK0U7QUFDL0UsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsNkJBQTZCLENBQUMifQ==

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGVudC5qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9iYWNrZ3JvdW5kL2Nvb2tpZS1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvaHR0cC1wb3N0LXBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvcGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3BlbmRpbmctcmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3Jlc3BvbnNlLWJvZHktbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvc3RyaW5nLXV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi91dWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL3NjaGVtYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBc0Y7O0FBRXRGLDJHQUFvQzs7Ozs7Ozs7Ozs7Ozs7QUNGcEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlGO0FBQ1o7QUFDUDtBQUN2RDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxtRUFBUztBQUM3QyxvQ0FBb0MsbUVBQVM7QUFDN0Msa0NBQWtDLG1FQUFTO0FBQzNDLDRCQUE0QixzRUFBWTtBQUN4QyxpQ0FBaUMsbUVBQVM7QUFDMUMsNEJBQTRCLHNFQUFZO0FBQ3hDLDRC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Ozs7O0FDM0MzQztBQUFBO0FBQUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUNBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsdUNBQXVDO0FBQzFEO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FB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QTtBQUFBO0FBQ087QUFDUCwyQ0FBMkMsbU8iLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY29udGVudC5qcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IGluamVjdEphdmFzY3JpcHRJbnN0cnVtZW50UGFnZVNjcmlwdCB9IGZyb20gXCJvcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb25cIjtcblxuaW5qZWN0SmF2YXNjcmlwdEluc3RydW1lbnRQYWdlU2NyaXB0KCk7XG5cbiIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUNvb2tpZU9iamVjdFRvTWF0Y2hPcGVuV1BNU2NoZW1hID0gKGNvb2tpZSkgPT4ge1xuICAgIGNvbnN0IGphdmFzY3JpcHRDb29raWUgPSB7fTtcbiAgICAvLyBFeHBpcnkgdGltZSAoaW4gc2Vjb25kcylcbiAgICAvLyBNYXkgcmV0dXJuIH5NYXgoaW50NjQpLiBJIGJlbGlldmUgdGhpcyBpcyBhIHNlc3Npb25cbiAgICAvLyBjb29raWUgd2hpY2ggZG9lc24ndCBleHBpcmUuIFNlc3Npb25zIGNvb2tpZXMgd2l0aFxuICAgIC8vIG5vbi1tYXggZXhwaXJ5IHRpbWUgZXhwaXJlIGFmdGVyIHNlc3Npb24gb3IgYXQgZXhwaXJ5LlxuICAgIGNvbnN0IGV4cGlyeVRpbWUgPSBjb29raWUuZXhwaXJhdGlvbkRhdGU7IC8vIHJldHVybnMgc2Vjb25kc1xuICAgIGxldCBleHBpcnlUaW1lU3RyaW5nO1xuICAgIGNvbnN0IG1heEludDY0ID0gOTIyMzM3MjAzNjg1NDc3NjAwMDtcbiAgICBpZiAoIWNvb2tpZS5leHBpcmF0aW9uRGF0ZSB8fCBleHBpcnlUaW1lID09PSBtYXhJbnQ2NCkge1xuICAgICAgICBleHBpcnlUaW1lU3RyaW5nID0gXCI5OTk5LTEyLTMxVDIxOjU5OjU5LjAwMFpcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4cGlyeVRpbWVEYXRlID0gbmV3IERhdGUoZXhwaXJ5VGltZSAqIDEwMDApOyAvLyByZXF1aXJlcyBtaWxsaXNlY29uZHNcbiAgICAgICAgZXhwaXJ5VGltZVN0cmluZyA9IGV4cGlyeVRpbWVEYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGphdmFzY3JpcHRDb29raWUuZXhwaXJ5ID0gZXhwaXJ5VGltZVN0cmluZztcbiAgICBqYXZhc2NyaXB0Q29va2llLmlzX2h0dHBfb25seSA9IGJvb2xUb0ludChjb29raWUuaHR0cE9ubHkpO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfaG9zdF9vbmx5ID0gYm9vbFRvSW50KGNvb2tpZS5ob3N0T25seSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19zZXNzaW9uID0gYm9vbFRvSW50KGNvb2tpZS5zZXNzaW9uKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmhvc3QgPSBlc2NhcGVTdHJpbmcoY29va2llLmRvbWFpbik7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19zZWN1cmUgPSBib29sVG9JbnQoY29va2llLnNlY3VyZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5uYW1lID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5uYW1lKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnBhdGggPSBlc2NhcGVTdHJpbmcoY29va2llLnBhdGgpO1xuICAgIGphdmFzY3JpcHRDb29raWUudmFsdWUgPSBlc2NhcGVTdHJpbmcoY29va2llLnZhbHVlKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnNhbWVfc2l0ZSA9IGVzY2FwZVN0cmluZyhjb29raWUuc2FtZVNpdGUpO1xuICAgIGphdmFzY3JpcHRDb29raWUuZmlyc3RfcGFydHlfZG9tYWluID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5maXJzdFBhcnR5RG9tYWluKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnN0b3JlX2lkID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5zdG9yZUlkKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnRpbWVfc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIGphdmFzY3JpcHRDb29raWU7XG59O1xuZXhwb3J0IGNsYXNzIENvb2tpZUluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgcnVuKGNyYXdsSUQpIHtcbiAgICAgICAgLy8gSW5zdHJ1bWVudCBjb29raWUgY2hhbmdlc1xuICAgICAgICB0aGlzLm9uQ2hhbmdlZExpc3RlbmVyID0gYXN5bmMgKGNoYW5nZUluZm8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGNoYW5nZUluZm8ucmVtb3ZlZCA/IFwiZGVsZXRlZFwiIDogXCJhZGRlZC1vci1jaGFuZ2VkXCI7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGUgPSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkX3R5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICBjaGFuZ2VfY2F1c2U6IGNoYW5nZUluZm8uY2F1c2UsXG4gICAgICAgICAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZDogZXh0ZW5zaW9uU2Vzc2lvblV1aWQsXG4gICAgICAgICAgICAgICAgZXZlbnRfb3JkaW5hbDogaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSxcbiAgICAgICAgICAgICAgICAuLi50cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYShjaGFuZ2VJbmZvLmNvb2tpZSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImphdmFzY3JpcHRfY29va2llc1wiLCB1cGRhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLmNvb2tpZXMub25DaGFuZ2VkLmFkZExpc3RlbmVyKHRoaXMub25DaGFuZ2VkTGlzdGVuZXIpO1xuICAgIH1cbiAgICBhc3luYyBzYXZlQWxsQ29va2llcyhjcmF3bElEKSB7XG4gICAgICAgIGNvbnN0IGFsbENvb2tpZXMgPSBhd2FpdCBicm93c2VyLmNvb2tpZXMuZ2V0QWxsKHt9KTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYWxsQ29va2llcy5tYXAoKGNvb2tpZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgICAgICAgICAgIHJlY29yZF90eXBlOiBcIm1hbnVhbC1leHBvcnRcIixcbiAgICAgICAgICAgICAgICBjcmF3bF9pZDogY3Jhd2xJRCxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgICAgICAgICAuLi50cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYShjb29raWUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdF9jb29raWVzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25DaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIuY29va2llcy5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNoYW5nZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMjl2YTJsbExXbHVjM1J5ZFcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZZbUZqYTJkeWIzVnVaQzlqYjI5cmFXVXRhVzV6ZEhKMWJXVnVkQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEVWQlFVVXNkVUpCUVhWQ0xFVkJRVVVzVFVGQlRTeDNRMEZCZDBNc1EwRkJRenRCUVVOcVJpeFBRVUZQTEVWQlFVVXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTd3JRa0ZCSzBJc1EwRkJRenRCUVVOeVJTeFBRVUZQTEVWQlFVVXNVMEZCVXl4RlFVRkZMRmxCUVZrc1JVRkJSU3hOUVVGTkxIRkNRVUZ4UWl4RFFVRkRPMEZCU3psRUxFMUJRVTBzUTBGQlF5eE5RVUZOTEhsRFFVRjVReXhIUVVGSExFTkJRVU1zVFVGQll5eEZRVUZGTEVWQlFVVTdTVUZETVVVc1RVRkJUU3huUWtGQlowSXNSMEZCUnl4RlFVRnpRaXhEUVVGRE8wbEJSV2hFTERKQ1FVRXlRanRKUVVNelFpeHpSRUZCYzBRN1NVRkRkRVFzY1VSQlFYRkVPMGxCUTNKRUxIbEVRVUY1UkR0SlFVTjZSQ3hOUVVGTkxGVkJRVlVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc2EwSkJRV3RDTzBsQlF6VkVMRWxCUVVrc1owSkJRV2RDTEVOQlFVTTdTVUZEY2tJc1RVRkJUU3hSUVVGUkxFZEJRVWNzYlVKQlFXMUNMRU5CUVVNN1NVRkRja01zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4alFVRmpMRWxCUVVrc1ZVRkJWU3hMUVVGTExGRkJRVkVzUlVGQlJUdFJRVU55UkN4blFrRkJaMElzUjBGQlJ5d3dRa0ZCTUVJc1EwRkJRenRMUVVNdlF6dFRRVUZOTzFGQlEwd3NUVUZCVFN4alFVRmpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc2QwSkJRWGRDTzFGQlF6VkZMR2RDUVVGblFpeEhRVUZITEdOQlFXTXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRMUVVOcVJEdEpRVU5FTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUjBGQlJ5eG5Ra0ZCWjBJc1EwRkJRenRKUVVNelF5eG5Ra0ZCWjBJc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhWUVVGVkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRKUVVWNFJDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOMFJDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1JDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1JDeG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRKUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4WlFVRlpMRU5CUVVNc1RVRkJUU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1NVRkROVVVzWjBKQlFXZENMRU5CUVVNc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkZla1FzWjBKQlFXZENMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1NVRkZka1FzVDBGQlR5eG5Ra0ZCWjBJc1EwRkJRenRCUVVNeFFpeERRVUZETEVOQlFVTTdRVUZGUml4TlFVRk5MRTlCUVU4c1owSkJRV2RDTzBsQlNUTkNMRmxCUVZrc1dVRkJXVHRSUVVOMFFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMRmxCUVZrc1EwRkJRenRKUVVOdVF5eERRVUZETzBsQlJVMHNSMEZCUnl4RFFVRkRMRTlCUVU4N1VVRkRhRUlzTkVKQlFUUkNPMUZCUXpWQ0xFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1IwRkJSeXhMUVVGTExFVkJRVVVzVlVGUEwwSXNSVUZCUlN4RlFVRkZPMWxCUTBnc1RVRkJUU3hUUVVGVExFZEJRVWNzVlVGQlZTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRaUVVOMFJTeE5RVUZOTEUxQlFVMHNSMEZCTWtJN1owSkJRM0pETEZkQlFWY3NSVUZCUlN4VFFVRlRPMmRDUVVOMFFpeFpRVUZaTEVWQlFVVXNWVUZCVlN4RFFVRkRMRXRCUVVzN1owSkJRemxDTEZGQlFWRXNSVUZCUlN4UFFVRlBPMmRDUVVOcVFpeHpRa0ZCYzBJc1JVRkJSU3h2UWtGQmIwSTdaMEpCUXpWRExHRkJRV0VzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSVHRuUWtGRGVFTXNSMEZCUnl4NVEwRkJlVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RFFVRkRPMkZCUTJoRkxFTkJRVU03V1VGRFJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXh2UWtGQmIwSXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVNM1JDeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdTVUZEYUVVc1EwRkJRenRKUVVWTkxFdEJRVXNzUTBGQlF5eGpRVUZqTEVOQlFVTXNUMEZCVHp0UlFVTnFReXhOUVVGTkxGVkJRVlVzUjBGQlJ5eE5RVUZOTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzQkVMRTFCUVUwc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGRFppeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1RVRkJZeXhGUVVGRkxFVkJRVVU3V1VGRGFFTXNUVUZCVFN4TlFVRk5MRWRCUVRKQ08yZENRVU55UXl4WFFVRlhMRVZCUVVVc1pVRkJaVHRuUWtGRE5VSXNVVUZCVVN4RlFVRkZMRTlCUVU4N1owSkJRMnBDTEhOQ1FVRnpRaXhGUVVGRkxHOUNRVUZ2UWp0blFrRkROVU1zUjBGQlJ5eDVRMEZCZVVNc1EwRkJReXhOUVVGTkxFTkJRVU03WVVGRGNrUXNRMEZCUXp0WlFVTkdMRTlCUVU4c1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFZRVUZWTEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEY0VVc1EwRkJReXhEUVVGRExFTkJRMGdzUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVFN4UFFVRlBPMUZCUTFvc1NVRkJTU3hKUVVGSkxFTkJRVU1zYVVKQlFXbENMRVZCUVVVN1dVRkRNVUlzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8xTkJRMnhGTzBsQlEwZ3NRMEZCUXp0RFFVTkdJbjA9IiwiaW1wb3J0IHsgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLWV2ZW50LW9yZGluYWxcIjtcbmltcG9ydCB7IGV4dGVuc2lvblNlc3Npb25VdWlkIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi11dWlkXCI7XG5pbXBvcnQgeyBIdHRwUG9zdFBhcnNlciB9IGZyb20gXCIuLi9saWIvaHR0cC1wb3N0LXBhcnNlclwiO1xuaW1wb3J0IHsgUGVuZGluZ1JlcXVlc3QgfSBmcm9tIFwiLi4vbGliL3BlbmRpbmctcmVxdWVzdFwiO1xuaW1wb3J0IHsgUGVuZGluZ1Jlc3BvbnNlIH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLXJlc3BvbnNlXCI7XG5pbXBvcnQgeyBib29sVG9JbnQsIGVzY2FwZVN0cmluZywgZXNjYXBlVXJsIH0gZnJvbSBcIi4uL2xpYi9zdHJpbmctdXRpbHNcIjtcbi8qKlxuICogTm90ZTogRGlmZmVyZW50IHBhcnRzIG9mIHRoZSBkZXNpcmVkIGluZm9ybWF0aW9uIGFycml2ZXMgaW4gZGlmZmVyZW50IGV2ZW50cyBhcyBwZXIgYmVsb3c6XG4gKiByZXF1ZXN0ID0gaGVhZGVycyBpbiBvbkJlZm9yZVNlbmRIZWFkZXJzICsgYm9keSBpbiBvbkJlZm9yZVJlcXVlc3RcbiAqIHJlc3BvbnNlID0gaGVhZGVycyBpbiBvbkNvbXBsZXRlZCArIGJvZHkgdmlhIGEgb25CZWZvcmVSZXF1ZXN0IGZpbHRlclxuICogcmVkaXJlY3QgPSBvcmlnaW5hbCByZXF1ZXN0IGhlYWRlcnMrYm9keSwgZm9sbG93ZWQgYnkgYSBvbkJlZm9yZVJlZGlyZWN0IGFuZCB0aGVuIGEgbmV3IHNldCBvZiByZXF1ZXN0IGhlYWRlcnMrYm9keSBhbmQgcmVzcG9uc2UgaGVhZGVycytib2R5XG4gKiBEb2NzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1VzZXI6d2JhbWJlcmcvd2ViUmVxdWVzdC5SZXF1ZXN0RGV0YWlsc1xuICovXG5leHBvcnQgY2xhc3MgSHR0cEluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cyA9IHt9O1xuICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXMgPSB7fTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgfVxuICAgIHJ1bihjcmF3bElELCBzYXZlSmF2YXNjcmlwdCwgc2F2ZUFsbENvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgYWxsVHlwZXMgPSBbXG4gICAgICAgICAgICBcImJlYWNvblwiLFxuICAgICAgICAgICAgXCJjc3BfcmVwb3J0XCIsXG4gICAgICAgICAgICBcImZvbnRcIixcbiAgICAgICAgICAgIFwiaW1hZ2VcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzZXRcIixcbiAgICAgICAgICAgIFwibWFpbl9mcmFtZVwiLFxuICAgICAgICAgICAgXCJtZWRpYVwiLFxuICAgICAgICAgICAgXCJvYmplY3RcIixcbiAgICAgICAgICAgIFwib2JqZWN0X3N1YnJlcXVlc3RcIixcbiAgICAgICAgICAgIFwicGluZ1wiLFxuICAgICAgICAgICAgXCJzY3JpcHRcIixcbiAgICAgICAgICAgIC8vIFwic3BlY3VsYXRpdmVcIixcbiAgICAgICAgICAgIFwic3R5bGVzaGVldFwiLFxuICAgICAgICAgICAgXCJzdWJfZnJhbWVcIixcbiAgICAgICAgICAgIFwid2ViX21hbmlmZXN0XCIsXG4gICAgICAgICAgICBcIndlYnNvY2tldFwiLFxuICAgICAgICAgICAgXCJ4YmxcIixcbiAgICAgICAgICAgIFwieG1sX2R0ZFwiLFxuICAgICAgICAgICAgXCJ4bWxodHRwcmVxdWVzdFwiLFxuICAgICAgICAgICAgXCJ4c2x0XCIsXG4gICAgICAgICAgICBcIm90aGVyXCIsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgdXJsczogW1wiPGFsbF91cmxzPlwiXSwgdHlwZXM6IGFsbFR5cGVzIH07XG4gICAgICAgIGNvbnN0IHJlcXVlc3RTdGVtc0Zyb21FeHRlbnNpb24gPSBkZXRhaWxzID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoZGV0YWlscy5vcmlnaW5VcmwgJiYgZGV0YWlscy5vcmlnaW5VcmwuaW5kZXhPZihcIm1vei1leHRlbnNpb246Ly9cIikgPiAtMSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qXG4gICAgICAgICAqIEF0dGFjaCBoYW5kbGVycyB0byBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0TGlzdGVuZXIgPSBkZXRhaWxzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NraW5nUmVzcG9uc2VUaGF0RG9lc05vdGhpbmcgPSB7fTtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJsb2NraW5nUmVzcG9uc2VUaGF0RG9lc05vdGhpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVxdWVzdCA9IHRoaXMuZ2V0UGVuZGluZ1JlcXVlc3QoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3QucmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzKGRldGFpbHMpO1xuICAgICAgICAgICAgaWYgKHNhdmVBbGxDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLmFkZFJlc3BvbnNlUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYXZlSmF2YXNjcmlwdCAmJiB0aGlzLmlzSlMoZGV0YWlscy50eXBlKSkge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5hZGRSZXNwb25zZVJlc3BvbnNlQm9keUxpc3RlbmVyKGRldGFpbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJsb2NraW5nUmVzcG9uc2VUaGF0RG9lc05vdGhpbmc7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QuYWRkTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lciwgZmlsdGVyLCBzYXZlSmF2YXNjcmlwdCB8fCBzYXZlQWxsQ29udGVudFxuICAgICAgICAgICAgPyBbXCJyZXF1ZXN0Qm9keVwiLCBcImJsb2NraW5nXCJdXG4gICAgICAgICAgICA6IFtcInJlcXVlc3RCb2R5XCJdKTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzTGlzdGVuZXIgPSBkZXRhaWxzID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1JlcXVlc3QgPSB0aGlzLmdldFBlbmRpbmdSZXF1ZXN0KGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVPbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzKGRldGFpbHMpO1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlU2VuZEhlYWRlcnMuYWRkTGlzdGVuZXIodGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzTGlzdGVuZXIsIGZpbHRlciwgW1wicmVxdWVzdEhlYWRlcnNcIl0pO1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lciA9IGRldGFpbHMgPT4ge1xuICAgICAgICAgICAgLy8gSWdub3JlIHJlcXVlc3RzIG1hZGUgYnkgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RTdGVtc0Zyb21FeHRlbnNpb24oZGV0YWlscykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlUmVkaXJlY3RIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCkpO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZWRpcmVjdC5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lciwgZmlsdGVyLCBbXCJyZXNwb25zZUhlYWRlcnNcIl0pO1xuICAgICAgICB0aGlzLm9uQ29tcGxldGVkTGlzdGVuZXIgPSBkZXRhaWxzID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1Jlc3BvbnNlID0gdGhpcy5nZXRQZW5kaW5nUmVzcG9uc2UoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLnJlc29sdmVPbkNvbXBsZXRlZEV2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZWRIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCksIHNhdmVKYXZhc2NyaXB0LCBzYXZlQWxsQ29udGVudCk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tcGxldGVkTGlzdGVuZXIsIGZpbHRlciwgW1wicmVzcG9uc2VIZWFkZXJzXCJdKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVSZXF1ZXN0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVTZW5kSGVhZGVycy5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZWRpcmVjdC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQ29tcGxldGVkLnJlbW92ZUxpc3RlbmVyKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0UGVuZGluZ1JlcXVlc3QocmVxdWVzdElkKSB7XG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXSkge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXSA9IG5ldyBQZW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdSZXF1ZXN0c1tyZXF1ZXN0SWRdO1xuICAgIH1cbiAgICBnZXRQZW5kaW5nUmVzcG9uc2UocmVxdWVzdElkKSB7XG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3JlcXVlc3RJZF0pIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1Jlc3BvbnNlc1tyZXF1ZXN0SWRdID0gbmV3IFBlbmRpbmdSZXNwb25zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVxdWVzdElkXTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBIVFRQIFJlcXVlc3QgSGFuZGxlciBhbmQgSGVscGVyIEZ1bmN0aW9uc1xuICAgICAqL1xuICAgIC8qXG4gICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgIHByaXZhdGUgZ2V0X3N0YWNrX3RyYWNlX3N0cigpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgc3RhY2sgdHJhY2UgYXMgYSBzdHJpbmdcbiAgICAgIC8vIFRPRE86IGNoZWNrIGlmIGh0dHAtb24tbW9kaWZ5LXJlcXVlc3QgaXMgYSBnb29kIHBsYWNlIHRvIGNhcHR1cmUgdGhlIHN0YWNrXG4gICAgICAvLyBJbiB0aGUgbWFudWFsIHRlc3RzIHdlIGNvdWxkIGNhcHR1cmUgZXhhY3RseSB0aGUgc2FtZSB0cmFjZSBhcyB0aGVcbiAgICAgIC8vIFwiQ2F1c2VcIiBjb2x1bW4gb2YgdGhlIGRldnRvb2xzIG5ldHdvcmsgcGFuZWwuXG4gICAgICBjb25zdCBzdGFja3RyYWNlID0gW107XG4gICAgICBsZXQgZnJhbWUgPSBjb21wb25lbnRzLnN0YWNrO1xuICAgICAgaWYgKGZyYW1lICYmIGZyYW1lLmNhbGxlcikge1xuICAgICAgICAvLyBpbnRlcm5hbC9jaHJvbWUgY2FsbGVycyBvY2N1cHkgdGhlIGZpcnN0IHRocmVlIGZyYW1lcywgcG9wIHRoZW0hXG4gICAgICAgIGZyYW1lID0gZnJhbWUuY2FsbGVyLmNhbGxlci5jYWxsZXI7XG4gICAgICAgIHdoaWxlIChmcmFtZSkge1xuICAgICAgICAgIC8vIGNocm9tZSBzY3JpcHRzIGFwcGVhciBhcyBjYWxsZXJzIGluIHNvbWUgY2FzZXMsIGZpbHRlciB0aGVtIG91dFxuICAgICAgICAgIGNvbnN0IHNjaGVtZSA9IGZyYW1lLmZpbGVuYW1lLnNwbGl0KFwiOi8vXCIpWzBdO1xuICAgICAgICAgIGlmIChbXCJyZXNvdXJjZVwiLCBcImNocm9tZVwiLCBcImZpbGVcIl0uaW5kZXhPZihzY2hlbWUpID09PSAtMSkge1xuICAgICAgICAgICAgLy8gaWdub3JlIGNocm9tZSBzY3JpcHRzXG4gICAgICAgICAgICBzdGFja3RyYWNlLnB1c2goXG4gICAgICAgICAgICAgIGZyYW1lLm5hbWUgK1xuICAgICAgICAgICAgICAgIFwiQFwiICtcbiAgICAgICAgICAgICAgICBmcmFtZS5maWxlbmFtZSArXG4gICAgICAgICAgICAgICAgXCI6XCIgK1xuICAgICAgICAgICAgICAgIGZyYW1lLmxpbmVOdW1iZXIgK1xuICAgICAgICAgICAgICAgIFwiOlwiICtcbiAgICAgICAgICAgICAgICBmcmFtZS5jb2x1bW5OdW1iZXIgK1xuICAgICAgICAgICAgICAgIFwiO1wiICtcbiAgICAgICAgICAgICAgICBmcmFtZS5hc3luY0NhdXNlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZnJhbWUgPSBmcmFtZS5jYWxsZXIgfHwgZnJhbWUuYXN5bmNDYWxsZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGFja3RyYWNlLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgICovXG4gICAgYXN5bmMgb25CZWZvcmVTZW5kSGVhZGVyc0hhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgZXZlbnRPcmRpbmFsKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwib25CZWZvcmVTZW5kSGVhZGVyc0hhbmRsZXIgKHByZXZpb3VzbHkgaHR0cFJlcXVlc3RIYW5kbGVyKVwiLFxuICAgICAgICAgIGRldGFpbHMsXG4gICAgICAgICAgY3Jhd2xJRCxcbiAgICAgICAgKTtcbiAgICAgICAgKi9cbiAgICAgICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgICAgICA/IGF3YWl0IGJyb3dzZXIudGFicy5nZXQoZGV0YWlscy50YWJJZClcbiAgICAgICAgICAgIDogeyB3aW5kb3dJZDogdW5kZWZpbmVkLCBpbmNvZ25pdG86IHVuZGVmaW5lZCwgdXJsOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQodGFiLmluY29nbml0byk7XG4gICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IGNyYXdsSUQ7XG4gICAgICAgIHVwZGF0ZS5leHRlbnNpb25fc2Vzc2lvbl91dWlkID0gZXh0ZW5zaW9uU2Vzc2lvblV1aWQ7XG4gICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gZXZlbnRPcmRpbmFsO1xuICAgICAgICB1cGRhdGUud2luZG93X2lkID0gdGFiLndpbmRvd0lkO1xuICAgICAgICB1cGRhdGUudGFiX2lkID0gZGV0YWlscy50YWJJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2lkID0gZGV0YWlscy5mcmFtZUlkO1xuICAgICAgICAvLyByZXF1ZXN0SWQgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpbmsgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgICAgICB1cGRhdGUucmVxdWVzdF9pZCA9IGRldGFpbHMucmVxdWVzdElkO1xuICAgICAgICAvLyBjb25zdCBzdGFja3RyYWNlX3N0ciA9IGdldF9zdGFja190cmFjZV9zdHIoKTtcbiAgICAgICAgLy8gdXBkYXRlLnJlcV9jYWxsX3N0YWNrID0gZXNjYXBlU3RyaW5nKHN0YWNrdHJhY2Vfc3RyKTtcbiAgICAgICAgY29uc3QgdXJsID0gZGV0YWlscy51cmw7XG4gICAgICAgIHVwZGF0ZS51cmwgPSBlc2NhcGVVcmwodXJsKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IGRldGFpbHMubWV0aG9kO1xuICAgICAgICB1cGRhdGUubWV0aG9kID0gZXNjYXBlU3RyaW5nKHJlcXVlc3RNZXRob2QpO1xuICAgICAgICBjb25zdCBjdXJyZW50X3RpbWUgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCk7XG4gICAgICAgIHVwZGF0ZS50aW1lX3N0YW1wID0gY3VycmVudF90aW1lLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGxldCBlbmNvZGluZ1R5cGUgPSBcIlwiO1xuICAgICAgICBsZXQgcmVmZXJyZXIgPSBcIlwiO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gW107XG4gICAgICAgIGxldCBpc09jc3AgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRldGFpbHMucmVxdWVzdEhlYWRlcnMpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVxdWVzdEhlYWRlcnMubWFwKHJlcXVlc3RIZWFkZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IHJlcXVlc3RIZWFkZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyX3BhaXIgPSBbXTtcbiAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhuYW1lKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyX3BhaXIpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBcIkNvbnRlbnQtVHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nVHlwZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW5jb2RpbmdUeXBlLmluZGV4T2YoXCJhcHBsaWNhdGlvbi9vY3NwLXJlcXVlc3RcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc09jc3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBcIlJlZmVyZXJcIikge1xuICAgICAgICAgICAgICAgICAgICByZWZlcnJlciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS5yZWZlcnJlciA9IGVzY2FwZVN0cmluZyhyZWZlcnJlcik7XG4gICAgICAgIGlmIChyZXF1ZXN0TWV0aG9kID09PSBcIlBPU1RcIiAmJiAhaXNPY3NwIC8qIGRvbid0IHByb2Nlc3MgT0NTUCByZXF1ZXN0cyAqLykge1xuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1JlcXVlc3QgPSB0aGlzLmdldFBlbmRpbmdSZXF1ZXN0KGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgcGVuZGluZ1JlcXVlc3QucmVzb2x2ZWRXaXRoaW5UaW1lb3V0KDEwMDApO1xuICAgICAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFwiUGVuZGluZyByZXF1ZXN0IHRpbWVkIG91dCB3YWl0aW5nIGZvciBkYXRhIGZyb20gYm90aCBvbkJlZm9yZVJlcXVlc3QgYW5kIG9uQmVmb3JlU2VuZEhlYWRlcnMgZXZlbnRzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gYXdhaXQgcGVuZGluZ1JlcXVlc3Qub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLnJlcXVlc3RCb2R5O1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0Qm9keSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3N0UGFyc2VyID0gbmV3IEh0dHBQb3N0UGFyc2VyKFxuICAgICAgICAgICAgICAgICAgICAvLyBkZXRhaWxzLFxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsIHRoaXMuZGF0YVJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zdE9iaiA9IHBvc3RQYXJzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJzZVBvc3RSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCAoUE9TVCkgcmVxdWVzdCBoZWFkZXJzIGZyb20gdXBsb2FkIHN0cmVhbVxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJwb3N0X2hlYWRlcnNcIiBpbiBwb3N0T2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHN0b3JlIFBPU1QgaGVhZGVycyB0aGF0IHdlIGtub3cgYW5kIG5lZWQuIFdlIG1heSBtaXNpbnRlcnByZXQgUE9TVCBkYXRhIGFzIGhlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFzIGRldGVjdGlvbiBpcyBiYXNlZCBvbiBcImtleTp2YWx1ZVwiIGZvcm1hdCAobm9uLWhlYWRlciBQT1NUIGRhdGEgY2FuIGJlIGluIHRoaXMgZm9ybWF0IGFzIHdlbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50SGVhZGVycyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1EaXNwb3NpdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1MZW5ndGhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gcG9zdE9iai5wb3N0X2hlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudEhlYWRlcnMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyX3BhaXIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcobmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhwb3N0T2JqLnBvc3RfaGVhZGVyc1tuYW1lXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyX3BhaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBzdG9yZSBQT1NUIGJvZHkgaW4gSlNPTiBmb3JtYXQsIGV4Y2VwdCB3aGVuIGl0J3MgYSBzdHJpbmcgd2l0aG91dCBhIChrZXktdmFsdWUpIHN0cnVjdHVyZVxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJwb3N0X2JvZHlcIiBpbiBwb3N0T2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUucG9zdF9ib2R5ID0gcG9zdE9iai5wb3N0X2JvZHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLmhlYWRlcnMgPSBKU09OLnN0cmluZ2lmeShoZWFkZXJzKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgeGhyXG4gICAgICAgIGNvbnN0IGlzWEhSID0gZGV0YWlscy50eXBlID09PSBcInhtbGh0dHByZXF1ZXN0XCI7XG4gICAgICAgIHVwZGF0ZS5pc19YSFIgPSBib29sVG9JbnQoaXNYSFIpO1xuICAgICAgICAvLyBDaGVjayBpZiBmcmFtZSBPUiBmdWxsIHBhZ2UgbG9hZFxuICAgICAgICBjb25zdCBpc0Z1bGxQYWdlTG9hZCA9IGRldGFpbHMuZnJhbWVJZCA9PT0gMDtcbiAgICAgICAgY29uc3QgaXNGcmFtZUxvYWQgPSBkZXRhaWxzLnR5cGUgPT09IFwic3ViX2ZyYW1lXCI7XG4gICAgICAgIHVwZGF0ZS5pc19mdWxsX3BhZ2UgPSBib29sVG9JbnQoaXNGdWxsUGFnZUxvYWQpO1xuICAgICAgICB1cGRhdGUuaXNfZnJhbWVfbG9hZCA9IGJvb2xUb0ludChpc0ZyYW1lTG9hZCk7XG4gICAgICAgIC8vIEdyYWIgdGhlIHRyaWdnZXJpbmcgYW5kIGxvYWRpbmcgUHJpbmNpcGFsc1xuICAgICAgICBsZXQgdHJpZ2dlcmluZ09yaWdpbjtcbiAgICAgICAgbGV0IGxvYWRpbmdPcmlnaW47XG4gICAgICAgIGlmIChkZXRhaWxzLm9yaWdpblVybCkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkT3JpZ2luVXJsID0gbmV3IFVSTChkZXRhaWxzLm9yaWdpblVybCk7XG4gICAgICAgICAgICB0cmlnZ2VyaW5nT3JpZ2luID0gcGFyc2VkT3JpZ2luVXJsLm9yaWdpbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGV0YWlscy5kb2N1bWVudFVybCkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkRG9jdW1lbnRVcmwgPSBuZXcgVVJMKGRldGFpbHMuZG9jdW1lbnRVcmwpO1xuICAgICAgICAgICAgbG9hZGluZ09yaWdpbiA9IHBhcnNlZERvY3VtZW50VXJsLm9yaWdpbjtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUudHJpZ2dlcmluZ19vcmlnaW4gPSBlc2NhcGVTdHJpbmcodHJpZ2dlcmluZ09yaWdpbik7XG4gICAgICAgIHVwZGF0ZS5sb2FkaW5nX29yaWdpbiA9IGVzY2FwZVN0cmluZyhsb2FkaW5nT3JpZ2luKTtcbiAgICAgICAgLy8gbG9hZGluZ0RvY3VtZW50J3MgaHJlZlxuICAgICAgICAvLyBUaGUgbG9hZGluZ0RvY3VtZW50IGlzIHRoZSBkb2N1bWVudCB0aGUgZWxlbWVudCByZXNpZGVzLCByZWdhcmRsZXNzIG9mXG4gICAgICAgIC8vIGhvdyB0aGUgbG9hZCB3YXMgdHJpZ2dlcmVkLlxuICAgICAgICBjb25zdCBsb2FkaW5nSHJlZiA9IGRldGFpbHMuZG9jdW1lbnRVcmw7XG4gICAgICAgIHVwZGF0ZS5sb2FkaW5nX2hyZWYgPSBlc2NhcGVTdHJpbmcobG9hZGluZ0hyZWYpO1xuICAgICAgICAvLyByZXNvdXJjZVR5cGUgb2YgdGhlIHJlcXVlc3Rpbmcgbm9kZS4gVGhpcyBpcyBzZXQgYnkgdGhlIHR5cGUgb2ZcbiAgICAgICAgLy8gbm9kZSBtYWtpbmcgdGhlIHJlcXVlc3QgKGkuZS4gYW4gPGltZyBzcmM9Li4uPiBub2RlIHdpbGwgc2V0IHRvIHR5cGUgXCJpbWFnZVwiKS5cbiAgICAgICAgLy8gRG9jdW1lbnRhdGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvd2ViUmVxdWVzdC9SZXNvdXJjZVR5cGVcbiAgICAgICAgdXBkYXRlLnJlc291cmNlX3R5cGUgPSBkZXRhaWxzLnR5cGU7XG4gICAgICAgIC8qXG4gICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgY29uc3QgVGhpcmRQYXJ0eVV0aWwgPSBDY1tcIkBtb3ppbGxhLm9yZy90aGlyZHBhcnR5dXRpbDsxXCJdLmdldFNlcnZpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2kubW96SVRoaXJkUGFydHlVdGlsKTtcbiAgICAgICAgLy8gRG8gdGhpcmQtcGFydHkgY2hlY2tzXG4gICAgICAgIC8vIFRoZXNlIHNwZWNpZmljIGNoZWNrcyBhcmUgZG9uZSBiZWNhdXNlIGl0J3Mgd2hhdCdzIHVzZWQgaW4gVHJhY2tpbmcgUHJvdGVjdGlvblxuICAgICAgICAvLyBTZWU6IGh0dHA6Ly9zZWFyY2hmb3gub3JnL21vemlsbGEtY2VudHJhbC9zb3VyY2UvbmV0d2Vyay9iYXNlL25zQ2hhbm5lbENsYXNzaWZpZXIuY3BwIzEwN1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGlzVGhpcmRQYXJ0eUNoYW5uZWwgPSBUaGlyZFBhcnR5VXRpbC5pc1RoaXJkUGFydHlDaGFubmVsKGRldGFpbHMpO1xuICAgICAgICAgIGNvbnN0IHRvcFdpbmRvdyA9IFRoaXJkUGFydHlVdGlsLmdldFRvcFdpbmRvd0ZvckNoYW5uZWwoZGV0YWlscyk7XG4gICAgICAgICAgY29uc3QgdG9wVVJJID0gVGhpcmRQYXJ0eVV0aWwuZ2V0VVJJRnJvbVdpbmRvdyh0b3BXaW5kb3cpO1xuICAgICAgICAgIGlmICh0b3BVUkkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcFVybCA9IHRvcFVSSS5zcGVjO1xuICAgICAgICAgICAgY29uc3QgY2hhbm5lbFVSSSA9IGRldGFpbHMuVVJJO1xuICAgICAgICAgICAgY29uc3QgaXNUaGlyZFBhcnR5VG9Ub3BXaW5kb3cgPSBUaGlyZFBhcnR5VXRpbC5pc1RoaXJkUGFydHlVUkkoXG4gICAgICAgICAgICAgIGNoYW5uZWxVUkksXG4gICAgICAgICAgICAgIHRvcFVSSSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1cGRhdGUuaXNfdGhpcmRfcGFydHlfdG9fdG9wX3dpbmRvdyA9IGlzVGhpcmRQYXJ0eVRvVG9wV2luZG93O1xuICAgICAgICAgICAgdXBkYXRlLmlzX3RoaXJkX3BhcnR5X2NoYW5uZWwgPSBpc1RoaXJkUGFydHlDaGFubmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoYW5FcnJvcikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbnMgZXhwZWN0ZWQgZm9yIGNoYW5uZWxzIHRyaWdnZXJlZCBvciBsb2FkaW5nIGluIGFcbiAgICAgICAgICAvLyBOdWxsUHJpbmNpcGFsIG9yIFN5c3RlbVByaW5jaXBhbC4gVGhleSBhcmUgYWxzbyBleHBlY3RlZCBmb3IgZmF2aWNvblxuICAgICAgICAgIC8vIGxvYWRzLCB3aGljaCB3ZSBhdHRlbXB0IHRvIGZpbHRlci4gRGVwZW5kaW5nIG9uIHRoZSBuYW1pbmcsIHNvbWUgZmF2aWNvbnNcbiAgICAgICAgICAvLyBtYXkgY29udGludWUgdG8gbGVhZCB0byBlcnJvciBsb2dzLlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHVwZGF0ZS50cmlnZ2VyaW5nX29yaWdpbiAhPT0gXCJbU3lzdGVtIFByaW5jaXBhbF1cIiAmJlxuICAgICAgICAgICAgdXBkYXRlLnRyaWdnZXJpbmdfb3JpZ2luICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHVwZGF0ZS5sb2FkaW5nX29yaWdpbiAhPT0gXCJbU3lzdGVtIFByaW5jaXBhbF1cIiAmJlxuICAgICAgICAgICAgdXBkYXRlLmxvYWRpbmdfb3JpZ2luICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICF1cGRhdGUudXJsLmVuZHNXaXRoKFwiaWNvXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcbiAgICAgICAgICAgICAgXCJFcnJvciB3aGlsZSByZXRyaWV2aW5nIGFkZGl0aW9uYWwgY2hhbm5lbCBpbmZvcm1hdGlvbiBmb3IgVVJMOiBcIiArXG4gICAgICAgICAgICAgIFwiXFxuXCIgK1xuICAgICAgICAgICAgICB1cGRhdGUudXJsICtcbiAgICAgICAgICAgICAgXCJcXG4gRXJyb3IgdGV4dDpcIiArXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGFuRXJyb3IpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlLnRvcF9sZXZlbF91cmwgPSBlc2NhcGVVcmwodGFiLnVybCk7XG4gICAgICAgIHVwZGF0ZS5wYXJlbnRfZnJhbWVfaWQgPSBkZXRhaWxzLnBhcmVudEZyYW1lSWQ7XG4gICAgICAgIHVwZGF0ZS5mcmFtZV9hbmNlc3RvcnMgPSBlc2NhcGVTdHJpbmcoSlNPTi5zdHJpbmdpZnkoZGV0YWlscy5mcmFtZUFuY2VzdG9ycykpO1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZXF1ZXN0c1wiLCB1cGRhdGUpO1xuICAgIH1cbiAgICBhc3luYyBvbkJlZm9yZVJlZGlyZWN0SGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBldmVudE9yZGluYWwpIHtcbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJvbkJlZm9yZVJlZGlyZWN0SGFuZGxlciAocHJldmlvdXNseSBodHRwUmVxdWVzdEhhbmRsZXIpXCIsXG4gICAgICAgICAgZGV0YWlscyxcbiAgICAgICAgICBjcmF3bElELFxuICAgICAgICApO1xuICAgICAgICAqL1xuICAgICAgICAvLyBTYXZlIEhUVFAgcmVkaXJlY3QgZXZlbnRzXG4gICAgICAgIC8vIEV2ZW50cyBhcmUgc2F2ZWQgdG8gdGhlIGBodHRwX3JlZGlyZWN0c2AgdGFibGVcbiAgICAgICAgLypcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICAvLyBFdmVudHMgYXJlIHNhdmVkIHRvIHRoZSBgaHR0cF9yZWRpcmVjdHNgIHRhYmxlLCBhbmQgbWFwIHRoZSBvbGRcbiAgICAgICAgLy8gcmVxdWVzdC9yZXNwb25zZSBjaGFubmVsIGlkIHRvIHRoZSBuZXcgcmVxdWVzdC9yZXNwb25zZSBjaGFubmVsIGlkLlxuICAgICAgICAvLyBJbXBsZW1lbnRhdGlvbiBiYXNlZCBvbjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExMjQwNjI3XG4gICAgICAgIGNvbnN0IG9sZE5vdGlmaWNhdGlvbnMgPSBkZXRhaWxzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcztcbiAgICAgICAgbGV0IG9sZEV2ZW50U2luayA9IG51bGw7XG4gICAgICAgIGRldGFpbHMubm90aWZpY2F0aW9uQ2FsbGJhY2tzID0ge1xuICAgICAgICAgIFF1ZXJ5SW50ZXJmYWNlOiBYUENPTVV0aWxzLmdlbmVyYXRlUUkoW1xuICAgICAgICAgICAgQ2kubnNJSW50ZXJmYWNlUmVxdWVzdG9yLFxuICAgICAgICAgICAgQ2kubnNJQ2hhbm5lbEV2ZW50U2luayxcbiAgICAgICAgICBdKSxcbiAgICBcbiAgICAgICAgICBnZXRJbnRlcmZhY2UoaWlkKSB7XG4gICAgICAgICAgICAvLyBXZSBhcmUgb25seSBpbnRlcmVzdGVkIGluIG5zSUNoYW5uZWxFdmVudFNpbmssXG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9sZCBjYWxsYmFja3MgZm9yIGFueSBvdGhlciBpbnRlcmZhY2UgcmVxdWVzdHMuXG4gICAgICAgICAgICBpZiAoaWlkLmVxdWFscyhDaS5uc0lDaGFubmVsRXZlbnRTaW5rKSkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG9sZEV2ZW50U2luayA9IG9sZE5vdGlmaWNhdGlvbnMuUXVlcnlJbnRlcmZhY2UoaWlkKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoYW5FcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFxuICAgICAgICAgICAgICAgICAgXCJFcnJvciBkdXJpbmcgY2FsbCB0byBjdXN0b20gbm90aWZpY2F0aW9uQ2FsbGJhY2tzOjpnZXRJbnRlcmZhY2UuXCIgK1xuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShhbkVycm9yKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKG9sZE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9sZE5vdGlmaWNhdGlvbnMuZ2V0SW50ZXJmYWNlKGlpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBDci5OU19FUlJPUl9OT19JTlRFUkZBQ0U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICBcbiAgICAgICAgICBhc3luY09uQ2hhbm5lbFJlZGlyZWN0KG9sZENoYW5uZWwsIG5ld0NoYW5uZWwsIGZsYWdzLCBjYWxsYmFjaykge1xuICAgIFxuICAgICAgICAgICAgbmV3Q2hhbm5lbC5RdWVyeUludGVyZmFjZShDaS5uc0lIdHRwQ2hhbm5lbCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBodHRwUmVkaXJlY3Q6IEh0dHBSZWRpcmVjdCA9IHtcbiAgICAgICAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgICAgICAgIG9sZF9yZXF1ZXN0X2lkOiBvbGRDaGFubmVsLmNoYW5uZWxJZCxcbiAgICAgICAgICAgICAgbmV3X3JlcXVlc3RfaWQ6IG5ld0NoYW5uZWwuY2hhbm5lbElkLFxuICAgICAgICAgICAgICB0aW1lX3N0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVkaXJlY3RzXCIsIGh0dHBSZWRpcmVjdCk7XG4gICAgXG4gICAgICAgICAgICBpZiAob2xkRXZlbnRTaW5rKSB7XG4gICAgICAgICAgICAgIG9sZEV2ZW50U2luay5hc3luY09uQ2hhbm5lbFJlZGlyZWN0KFxuICAgICAgICAgICAgICAgIG9sZENoYW5uZWwsXG4gICAgICAgICAgICAgICAgbmV3Q2hhbm5lbCxcbiAgICAgICAgICAgICAgICBmbGFncyxcbiAgICAgICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLm9uUmVkaXJlY3RWZXJpZnlDYWxsYmFjayhDci5OU19PSyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcmVzcG9uc2VTdGF0dXMgPSBkZXRhaWxzLnN0YXR1c0NvZGU7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzVGV4dCA9IGRldGFpbHMuc3RhdHVzTGluZTtcbiAgICAgICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgICAgICA/IGF3YWl0IGJyb3dzZXIudGFicy5nZXQoZGV0YWlscy50YWJJZClcbiAgICAgICAgICAgIDogeyB3aW5kb3dJZDogdW5kZWZpbmVkLCBpbmNvZ25pdG86IHVuZGVmaW5lZCB9O1xuICAgICAgICBjb25zdCBodHRwUmVkaXJlY3QgPSB7XG4gICAgICAgICAgICBpbmNvZ25pdG86IGJvb2xUb0ludCh0YWIuaW5jb2duaXRvKSxcbiAgICAgICAgICAgIGNyYXdsX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgb2xkX3JlcXVlc3RfdXJsOiBlc2NhcGVVcmwoZGV0YWlscy51cmwpLFxuICAgICAgICAgICAgb2xkX3JlcXVlc3RfaWQ6IGRldGFpbHMucmVxdWVzdElkLFxuICAgICAgICAgICAgbmV3X3JlcXVlc3RfdXJsOiBlc2NhcGVVcmwoZGV0YWlscy5yZWRpcmVjdFVybCksXG4gICAgICAgICAgICBuZXdfcmVxdWVzdF9pZDogbnVsbCxcbiAgICAgICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICAgICAgZXZlbnRfb3JkaW5hbDogZXZlbnRPcmRpbmFsLFxuICAgICAgICAgICAgd2luZG93X2lkOiB0YWIud2luZG93SWQsXG4gICAgICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgICAgICBmcmFtZV9pZDogZGV0YWlscy5mcmFtZUlkLFxuICAgICAgICAgICAgcmVzcG9uc2Vfc3RhdHVzOiByZXNwb25zZVN0YXR1cyxcbiAgICAgICAgICAgIHJlc3BvbnNlX3N0YXR1c190ZXh0OiBlc2NhcGVTdHJpbmcocmVzcG9uc2VTdGF0dXNUZXh0KSxcbiAgICAgICAgICAgIHRpbWVfc3RhbXA6IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZWRpcmVjdHNcIiwgaHR0cFJlZGlyZWN0KTtcbiAgICB9XG4gICAgLypcbiAgICAqIEhUVFAgUmVzcG9uc2UgSGFuZGxlcnMgYW5kIEhlbHBlciBGdW5jdGlvbnNcbiAgICAqL1xuICAgIGFzeW5jIGxvZ1dpdGhSZXNwb25zZUJvZHkoZGV0YWlscywgdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQm9keUxpc3RlbmVyID0gcGVuZGluZ1Jlc3BvbnNlLnJlc3BvbnNlQm9keUxpc3RlbmVyO1xuICAgICAgICAgICAgY29uc3QgcmVzcEJvZHkgPSBhd2FpdCByZXNwb25zZUJvZHlMaXN0ZW5lci5nZXRSZXNwb25zZUJvZHkoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRIYXNoID0gYXdhaXQgcmVzcG9uc2VCb2R5TGlzdGVuZXIuZ2V0Q29udGVudEhhc2goKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVDb250ZW50KGVzY2FwZVN0cmluZyhyZXNwQm9keSksIGVzY2FwZVN0cmluZyhjb250ZW50SGFzaCkpO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5sb2dFcnJvcihcbiAgICAgICAgICAgICAgXCJVbmFibGUgdG8gcmV0cmlldmUgcmVzcG9uc2UgYm9keS5cIiArIEpTT04uc3RyaW5naWZ5KGFSZWFzb24pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50X2hhc2ggPSBcIjxlcnJvcj5cIjtcbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZXNwb25zZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIlVuYWJsZSB0byByZXRyaWV2ZSByZXNwb25zZSBib2R5LlwiICtcbiAgICAgICAgICAgICAgICBcIkxpa2VseSBjYXVzZWQgYnkgYSBwcm9ncmFtbWluZyBlcnJvci4gRXJyb3IgTWVzc2FnZTpcIiArXG4gICAgICAgICAgICAgICAgZXJyLm5hbWUgK1xuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgICBlcnIuc3RhY2spO1xuICAgICAgICAgICAgdXBkYXRlLmNvbnRlbnRfaGFzaCA9IFwiPGVycm9yPlwiO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhpcyByZXF1ZXN0IGlzIGxvYWRpbmcgamF2YXNjcmlwdFxuICAgICAqIFdlIHJlbHkgbW9zdGx5IG9uIHRoZSBjb250ZW50IHBvbGljeSB0eXBlIHRvIGZpbHRlciByZXNwb25zZXNcbiAgICAgKiBhbmQgZmFsbCBiYWNrIHRvIHRoZSBVUkkgYW5kIGNvbnRlbnQgdHlwZSBzdHJpbmcgZm9yIHR5cGVzIHRoYXQgY2FuXG4gICAgICogbG9hZCB2YXJpb3VzIHJlc291cmNlIHR5cGVzLlxuICAgICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvd2ViUmVxdWVzdC9SZXNvdXJjZVR5cGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZVR5cGVcbiAgICAgKi9cbiAgICBpc0pTKHJlc291cmNlVHlwZSkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VUeXBlID09PSBcInNjcmlwdFwiO1xuICAgIH1cbiAgICAvLyBJbnN0cnVtZW50IEhUVFAgcmVzcG9uc2VzXG4gICAgYXN5bmMgb25Db21wbGV0ZWRIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGV2ZW50T3JkaW5hbCwgc2F2ZUphdmFzY3JpcHQsIHNhdmVBbGxDb250ZW50KSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwib25Db21wbGV0ZWRIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICAgc2F2ZUphdmFzY3JpcHQsXG4gICAgICAgICAgc2F2ZUFsbENvbnRlbnQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQodGFiLmluY29nbml0byk7XG4gICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IGNyYXdsSUQ7XG4gICAgICAgIHVwZGF0ZS5leHRlbnNpb25fc2Vzc2lvbl91dWlkID0gZXh0ZW5zaW9uU2Vzc2lvblV1aWQ7XG4gICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gZXZlbnRPcmRpbmFsO1xuICAgICAgICB1cGRhdGUud2luZG93X2lkID0gdGFiLndpbmRvd0lkO1xuICAgICAgICB1cGRhdGUudGFiX2lkID0gZGV0YWlscy50YWJJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2lkID0gZGV0YWlscy5mcmFtZUlkO1xuICAgICAgICAvLyByZXF1ZXN0SWQgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpbmsgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgICAgICB1cGRhdGUucmVxdWVzdF9pZCA9IGRldGFpbHMucmVxdWVzdElkO1xuICAgICAgICBjb25zdCBpc0NhY2hlZCA9IGRldGFpbHMuZnJvbUNhY2hlO1xuICAgICAgICB1cGRhdGUuaXNfY2FjaGVkID0gYm9vbFRvSW50KGlzQ2FjaGVkKTtcbiAgICAgICAgY29uc3QgdXJsID0gZGV0YWlscy51cmw7XG4gICAgICAgIHVwZGF0ZS51cmwgPSBlc2NhcGVVcmwodXJsKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IGRldGFpbHMubWV0aG9kO1xuICAgICAgICB1cGRhdGUubWV0aG9kID0gZXNjYXBlU3RyaW5nKHJlcXVlc3RNZXRob2QpO1xuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIC8vIChyZXF1ZXN0IGhlYWRlcnMgYXJlIG5vdCBhdmFpbGFibGUgaW4gaHR0cCByZXNwb25zZSBldmVudCBsaXN0ZW5lciBvYmplY3QsXG4gICAgICAgIC8vIGJ1dCB0aGUgcmVmZXJyZXIgcHJvcGVydHkgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcmVxdWVzdCBjb3VsZCBiZSBxdWVyaWVkKVxuICAgICAgICAvL1xuICAgICAgICAvLyBsZXQgcmVmZXJyZXIgPSBcIlwiO1xuICAgICAgICAvLyBpZiAoZGV0YWlscy5yZWZlcnJlcikge1xuICAgICAgICAvLyAgIHJlZmVycmVyID0gZGV0YWlscy5yZWZlcnJlci5zcGVjO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHVwZGF0ZS5yZWZlcnJlciA9IGVzY2FwZVN0cmluZyhyZWZlcnJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gZGV0YWlscy5zdGF0dXNDb2RlO1xuICAgICAgICB1cGRhdGUucmVzcG9uc2Vfc3RhdHVzID0gcmVzcG9uc2VTdGF0dXM7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzVGV4dCA9IGRldGFpbHMuc3RhdHVzTGluZTtcbiAgICAgICAgdXBkYXRlLnJlc3BvbnNlX3N0YXR1c190ZXh0ID0gZXNjYXBlU3RyaW5nKHJlc3BvbnNlU3RhdHVzVGV4dCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfdGltZSA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKTtcbiAgICAgICAgdXBkYXRlLnRpbWVfc3RhbXAgPSBjdXJyZW50X3RpbWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICBsZXQgbG9jYXRpb24gPSBcIlwiO1xuICAgICAgICBpZiAoZGV0YWlscy5yZXNwb25zZUhlYWRlcnMpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVzcG9uc2VIZWFkZXJzLm1hcChyZXNwb25zZUhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gcmVzcG9uc2VIZWFkZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyX3BhaXIgPSBbXTtcbiAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhuYW1lKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyX3BhaXIpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwibG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS5oZWFkZXJzID0gSlNPTi5zdHJpbmdpZnkoaGVhZGVycyk7XG4gICAgICAgIHVwZGF0ZS5sb2NhdGlvbiA9IGVzY2FwZVN0cmluZyhsb2NhdGlvbik7XG4gICAgICAgIGlmIChzYXZlQWxsQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5sb2dXaXRoUmVzcG9uc2VCb2R5KGRldGFpbHMsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2F2ZUphdmFzY3JpcHQgJiYgdGhpcy5pc0pTKGRldGFpbHMudHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nV2l0aFJlc3BvbnNlQm9keShkZXRhaWxzLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0MxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZhSFIwY0MxcGJuTjBjblZ0Wlc1MExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeE5RVUZOTEhkRFFVRjNReXhEUVVGRE8wRkJRMnBHTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEN0Q1FVRXJRaXhEUVVGRE8wRkJRM0pGTEU5QlFVOHNSVUZCUlN4alFVRmpMRVZCUVhGQ0xFMUJRVTBzZVVKQlFYbENMRU5CUVVNN1FVRkROVVVzVDBGQlR5eEZRVUZGTEdOQlFXTXNSVUZCUlN4TlFVRk5MSGRDUVVGM1FpeERRVUZETzBGQlEzaEVMRTlCUVU4c1JVRkJSU3hsUVVGbExFVkJRVVVzVFVGQlRTeDVRa0ZCZVVJc1EwRkJRenRCUVVreFJDeFBRVUZQTEVWQlFVVXNVMEZCVXl4RlFVRkZMRmxCUVZrc1JVRkJSU3hUUVVGVExFVkJRVVVzVFVGQlRTeHhRa0ZCY1VJc1EwRkJRenRCUVZONlJUczdPenM3TzBkQlRVYzdRVUZGU0N4TlFVRk5MRTlCUVU4c1kwRkJZenRKUVdGNlFpeFpRVUZaTEZsQlFWazdVVUZZYUVJc2IwSkJRV1VzUjBGRmJrSXNSVUZCUlN4RFFVRkRPMUZCUTBNc2NVSkJRV2RDTEVkQlJYQkNMRVZCUVVVc1EwRkJRenRSUVU5TUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NXVUZCV1N4RFFVRkRPMGxCUTI1RExFTkJRVU03U1VGRlRTeEhRVUZITEVOQlFVTXNUMEZCVHl4RlFVRkZMR05CUVdNc1JVRkJSU3hqUVVGak8xRkJRMmhFTEUxQlFVMHNVVUZCVVN4SFFVRnRRanRaUVVNdlFpeFJRVUZSTzFsQlExSXNXVUZCV1R0WlFVTmFMRTFCUVUwN1dVRkRUaXhQUVVGUE8xbEJRMUFzVlVGQlZUdFpRVU5XTEZsQlFWazdXVUZEV2l4UFFVRlBPMWxCUTFBc1VVRkJVVHRaUVVOU0xHMUNRVUZ0UWp0WlFVTnVRaXhOUVVGTk8xbEJRMDRzVVVGQlVUdFpRVU5TTEdsQ1FVRnBRanRaUVVOcVFpeFpRVUZaTzFsQlExb3NWMEZCVnp0WlFVTllMR05CUVdNN1dVRkRaQ3hYUVVGWE8xbEJRMWdzUzBGQlN6dFpRVU5NTEZOQlFWTTdXVUZEVkN4blFrRkJaMEk3V1VGRGFFSXNUVUZCVFR0WlFVTk9MRTlCUVU4N1UwRkRVaXhEUVVGRE8xRkJSVVlzVFVGQlRTeE5RVUZOTEVkQlFXdENMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zV1VGQldTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJSWGhGTEUxQlFVMHNlVUpCUVhsQ0xFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVTdXVUZETVVNc1QwRkJUeXhEUVVOTUxFOUJRVThzUTBGQlF5eFRRVUZUTEVsQlFVa3NUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGRGVFVXNRMEZCUXp0UlFVTktMRU5CUVVNc1EwRkJRenRSUVVWR096dFhRVVZITzFGQlJVZ3NTVUZCU1N4RFFVRkRMSFZDUVVGMVFpeEhRVUZITEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTNaRExFMUJRVTBzSzBKQlFTdENMRWRCUVhGQ0xFVkJRVVVzUTBGQlF6dFpRVU0zUkN4eFEwRkJjVU03V1VGRGNrTXNTVUZCU1N4NVFrRkJlVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRkRU1zVDBGQlR5d3JRa0ZCSzBJc1EwRkJRenRoUVVONFF6dFpRVU5FTEUxQlFVMHNZMEZCWXl4SFFVRkhMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03V1VGRGFrVXNZMEZCWXl4RFFVRkRMR3REUVVGclF5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUXpORUxFMUJRVTBzWlVGQlpTeEhRVUZITEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRia1VzWlVGQlpTeERRVUZETEd0RFFVRnJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6VkVMRWxCUVVrc1kwRkJZeXhGUVVGRk8yZENRVU5zUWl4bFFVRmxMRU5CUVVNc0swSkJRU3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1lVRkRNVVE3YVVKQlFVMHNTVUZCU1N4alFVRmpMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1owSkJRM0JFTEdWQlFXVXNRMEZCUXl3clFrRkJLMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0aFFVTXhSRHRaUVVORUxFOUJRVThzSzBKQlFTdENMRU5CUVVNN1VVRkRla01zUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zVjBGQlZ5eERRVU0xUXl4SlFVRkpMRU5CUVVNc2RVSkJRWFZDTEVWQlF6VkNMRTFCUVUwc1JVRkRUaXhqUVVGakxFbEJRVWtzWTBGQll6dFpRVU01UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhoUVVGaExFVkJRVVVzVlVGQlZTeERRVUZETzFsQlF6ZENMRU5CUVVNc1EwRkJReXhEUVVGRExHRkJRV0VzUTBGQlF5eERRVU53UWl4RFFVRkRPMUZCUlVZc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4SFFVRkhMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRek5ETEhGRFFVRnhRenRaUVVOeVF5eEpRVUZKTEhsQ1FVRjVRaXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTjBReXhQUVVGUE8yRkJRMUk3V1VGRFJDeE5RVUZOTEdOQlFXTXNSMEZCUnl4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEdOQlFXTXNRMEZCUXl4elEwRkJjME1zUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTXZSQ3hKUVVGSkxFTkJRVU1zTUVKQlFUQkNMRU5CUXpkQ0xFOUJRVThzUlVGRFVDeFBRVUZQTEVWQlExQXNkVUpCUVhWQ0xFVkJRVVVzUTBGRE1VSXNRMEZCUXp0UlFVTktMRU5CUVVNc1EwRkJRenRSUVVOR0xFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zVjBGQlZ5eERRVU5vUkN4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVWQlEyaERMRTFCUVUwc1JVRkRUaXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUTI1Q0xFTkJRVU03VVVGRlJpeEpRVUZKTEVOQlFVTXNkMEpCUVhkQ0xFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVTdXVUZEZUVNc2NVTkJRWEZETzFsQlEzSkRMRWxCUVVrc2VVSkJRWGxDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1owSkJRM1JETEU5QlFVODdZVUZEVWp0WlFVTkVMRWxCUVVrc1EwRkJReXgxUWtGQmRVSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxIVkNRVUYxUWl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNMVJTeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRmRCUVZjc1EwRkROME1zU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhGUVVNM1FpeE5RVUZOTEVWQlEwNHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVU53UWl4RFFVRkRPMUZCUlVZc1NVRkJTU3hEUVVGRExHMUNRVUZ0UWl4SFFVRkhMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRMjVETEhGRFFVRnhRenRaUVVOeVF5eEpRVUZKTEhsQ1FVRjVRaXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTjBReXhQUVVGUE8yRkJRMUk3V1VGRFJDeE5RVUZOTEdWQlFXVXNSMEZCUnl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xbEJRMjVGTEdWQlFXVXNRMEZCUXl3NFFrRkJPRUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTjRSQ3hKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUTNKQ0xFOUJRVThzUlVGRFVDeFBRVUZQTEVWQlExQXNkVUpCUVhWQ0xFVkJRVVVzUlVGRGVrSXNZMEZCWXl4RlFVTmtMR05CUVdNc1EwRkRaaXhEUVVGRE8xRkJRMG9zUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhYUVVGWExFTkJRVU1zVjBGQlZ5eERRVU40UXl4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVWQlEzaENMRTFCUVUwc1JVRkRUaXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUTNCQ0xFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVMHNUMEZCVHp0UlFVTmFMRWxCUVVrc1NVRkJTU3hEUVVGRExIVkNRVUYxUWl4RlFVRkZPMWxCUTJoRExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNaVUZCWlN4RFFVRkRMR05CUVdNc1EwRkRMME1zU1VGQlNTeERRVUZETEhWQ1FVRjFRaXhEUVVNM1FpeERRVUZETzFOQlEwZzdVVUZEUkN4SlFVRkpMRWxCUVVrc1EwRkJReXd5UWtGQk1rSXNSVUZCUlR0WlFVTndReXhQUVVGUExFTkJRVU1zVlVGQlZTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExHTkJRV01zUTBGRGJrUXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVU5xUXl4RFFVRkRPMU5CUTBnN1VVRkRSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSVHRaUVVOcVF5eFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeERRVUZETEdOQlFXTXNRMEZEYUVRc1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RFFVTTVRaXhEUVVGRE8xTkJRMGc3VVVGRFJDeEpRVUZKTEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUlVGQlJUdFpRVU0xUWl4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExGZEJRVmNzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdVMEZEZWtVN1NVRkRTQ3hEUVVGRE8wbEJSVThzYVVKQlFXbENMRU5CUVVNc1UwRkJVenRSUVVOcVF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhUUVVGVExFTkJRVU1zUlVGQlJUdFpRVU53UXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRExGTkJRVk1zUTBGQlF5eEhRVUZITEVsQlFVa3NZMEZCWXl4RlFVRkZMRU5CUVVNN1UwRkRlRVE3VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03U1VGRGVrTXNRMEZCUXp0SlFVVlBMR3RDUVVGclFpeERRVUZETEZOQlFWTTdVVUZEYkVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFTkJRVU1zUlVGQlJUdFpRVU55UXl4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hsUVVGbExFVkJRVVVzUTBGQlF6dFRRVU14UkR0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8wbEJRekZETEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVWSU96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzAxQmEwTkZPMGxCUlUwc1MwRkJTeXhEUVVGRExEQkNRVUV3UWl4RFFVTjBReXhQUVVGclJDeEZRVU5zUkN4UFFVRlBMRVZCUTFBc1dVRkJiMEk3VVVGRmNFSTdPenM3T3p0VlFVMUZPMUZCUlVZc1RVRkJUU3hIUVVGSExFZEJRMUFzVDBGQlR5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRUlzUTBGQlF5eERRVUZETEUxQlFVMHNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTjJReXhEUVVGRExFTkJRVU1zUlVGQlJTeFJRVUZSTEVWQlFVVXNVMEZCVXl4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUlN4RFFVRkRPMUZCUlhCRkxFMUJRVTBzVFVGQlRTeEhRVUZITEVWQlFXbENMRU5CUVVNN1VVRkZha01zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4VFFVRlRMRU5CUVVNc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzFGQlF6VkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETzFGQlF6RkNMRTFCUVUwc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU55UkN4TlFVRk5MRU5CUVVNc1lVRkJZU3hIUVVGSExGbEJRVmtzUTBGQlF6dFJRVU53UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZEYUVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUXpsQ0xFMUJRVTBzUTBGQlF5eFJRVUZSTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVWc1F5eHRSa0ZCYlVZN1VVRkRia1lzVFVGQlRTeERRVUZETEZWQlFWVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJSWFJETEdkRVFVRm5SRHRSUVVOb1JDeDNSRUZCZDBRN1VVRkZlRVFzVFVGQlRTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRSUVVONFFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4SFFVRkhMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVVUxUWl4TlFVRk5MR0ZCUVdFc1IwRkJSeXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETzFGQlEzSkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFZEJRVWNzV1VGQldTeERRVUZETEdGQlFXRXNRMEZCUXl4RFFVRkRPMUZCUlRWRExFMUJRVTBzV1VGQldTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVXZReXhKUVVGSkxGbEJRVmtzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZEZEVJc1NVRkJTU3hSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEyeENMRTFCUVUwc1QwRkJUeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU51UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU03VVVGRGJrSXNTVUZCU1N4UFFVRlBMRU5CUVVNc1kwRkJZeXhGUVVGRk8xbEJRekZDTEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1IwRkJSeXhEUVVGRExHRkJRV0VzUTBGQlF5eEZRVUZGTzJkQ1FVTjZReXhOUVVGTkxFVkJRVVVzU1VGQlNTeEZRVUZGTEV0QlFVc3NSVUZCUlN4SFFVRkhMR0ZCUVdFc1EwRkJRenRuUWtGRGRFTXNUVUZCVFN4WFFVRlhMRWRCUVVjc1JVRkJSU3hEUVVGRE8yZENRVU4yUWl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTjBReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeEpRVUZKTEVsQlFVa3NTMEZCU3l4alFVRmpMRVZCUVVVN2IwSkJRek5DTEZsQlFWa3NSMEZCUnl4TFFVRkxMRU5CUVVNN2IwSkJRM0pDTEVsQlFVa3NXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRk8zZENRVU16UkN4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRE8zRkNRVU5tTzJsQ1FVTkdPMmRDUVVORUxFbEJRVWtzU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCUlR0dlFrRkRkRUlzVVVGQlVTeEhRVUZITEV0QlFVc3NRMEZCUXp0cFFrRkRiRUk3V1VGRFNDeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTktPMUZCUlVRc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFpRVUZaTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkZla01zU1VGQlNTeGhRVUZoTEV0QlFVc3NUVUZCVFN4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExHbERRVUZwUXl4RlFVRkZPMWxCUTNwRkxFMUJRVTBzWTBGQll5eEhRVUZITEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRha1VzVFVGQlRTeFJRVUZSTEVkQlFVY3NUVUZCVFN4alFVRmpMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRiRVVzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0blFrRkRZaXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZGQlFWRXNRMEZEZUVJc2NVZEJRWEZITEVOQlEzUkhMRU5CUVVNN1lVRkRTRHRwUWtGQlRUdG5Ra0ZEVEN4TlFVRk5MREpDUVVFeVFpeEhRVUZITEUxQlFVMHNZMEZCWXl4RFFVRkRMREpDUVVFeVFpeERRVUZETzJkQ1FVTnlSaXhOUVVGTkxGZEJRVmNzUjBGQlJ5d3lRa0ZCTWtJc1EwRkJReXhYUVVGWExFTkJRVU03WjBKQlJUVkVMRWxCUVVrc1YwRkJWeXhGUVVGRk8yOUNRVU5tTEUxQlFVMHNWVUZCVlN4SFFVRkhMRWxCUVVrc1kwRkJZenR2UWtGRGJrTXNWMEZCVnp0dlFrRkRXQ3d5UWtGQk1rSXNSVUZETTBJc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGRGJFSXNRMEZCUXp0dlFrRkRSaXhOUVVGTkxFOUJRVThzUjBGQmMwSXNWVUZCVlR0NVFrRkRNVU1zWjBKQlFXZENMRVZCUldZc1EwRkJRenR2UWtGRlRDeG5SRUZCWjBRN2IwSkJRMmhFTEVsQlFVa3NZMEZCWXl4SlFVRkpMRTlCUVU4c1JVRkJSVHQzUWtGRE4wSXNNRVpCUVRCR08zZENRVU14Uml4dFIwRkJiVWM3ZDBKQlEyNUhMRTFCUVUwc1kwRkJZeXhIUVVGSE96UkNRVU55UWl4alFVRmpPelJDUVVOa0xIRkNRVUZ4UWpzMFFrRkRja0lzWjBKQlFXZENPM2xDUVVOcVFpeERRVUZETzNkQ1FVTkdMRXRCUVVzc1RVRkJUU3hKUVVGSkxFbEJRVWtzVDBGQlR5eERRVUZETEZsQlFWa3NSVUZCUlRzMFFrRkRka01zU1VGQlNTeGpRVUZqTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRk8yZERRVU5xUXl4TlFVRk5MRmRCUVZjc1IwRkJSeXhGUVVGRkxFTkJRVU03WjBOQlEzWkNMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owTkJRM0pETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yZERRVU16UkN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZET3paQ1FVTXpRanQ1UWtGRFJqdHhRa0ZEUmp0dlFrRkRSQ3dyUmtGQkswWTdiMEpCUXk5R0xFbEJRVWtzVjBGQlZ5eEpRVUZKTEU5QlFVOHNSVUZCUlR0M1FrRkRNVUlzVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8zRkNRVU4wUXp0cFFrRkRSanRoUVVOR08xTkJRMFk3VVVGRlJDeE5RVUZOTEVOQlFVTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZGZWtNc1pVRkJaVHRSUVVObUxFMUJRVTBzUzBGQlN5eEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRXRCUVVzc1owSkJRV2RDTEVOQlFVTTdVVUZEYUVRc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eFRRVUZUTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1VVRkZha01zYlVOQlFXMURPMUZCUTI1RExFMUJRVTBzWTBGQll5eEhRVUZITEU5QlFVOHNRMEZCUXl4UFFVRlBMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRemRETEUxQlFVMHNWMEZCVnl4SFFVRkhMRTlCUVU4c1EwRkJReXhKUVVGSkxFdEJRVXNzVjBGQlZ5eERRVUZETzFGQlEycEVMRTFCUVUwc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRPMUZCUTJoRUxFMUJRVTBzUTBGQlF5eGhRVUZoTEVkQlFVY3NVMEZCVXl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8xRkJSVGxETERaRFFVRTJRenRSUVVNM1F5eEpRVUZKTEdkQ1FVRm5RaXhEUVVGRE8xRkJRM0pDTEVsQlFVa3NZVUZCWVN4RFFVRkRPMUZCUTJ4Q0xFbEJRVWtzVDBGQlR5eERRVUZETEZOQlFWTXNSVUZCUlR0WlFVTnlRaXhOUVVGTkxHVkJRV1VzUjBGQlJ5eEpRVUZKTEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03V1VGRGJrUXNaMEpCUVdkQ0xFZEJRVWNzWlVGQlpTeERRVUZETEUxQlFVMHNRMEZCUXp0VFFVTXpRenRSUVVORUxFbEJRVWtzVDBGQlR5eERRVUZETEZkQlFWY3NSVUZCUlR0WlFVTjJRaXhOUVVGTkxHbENRVUZwUWl4SFFVRkhMRWxCUVVrc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXp0WlFVTjJSQ3hoUVVGaExFZEJRVWNzYVVKQlFXbENMRU5CUVVNc1RVRkJUU3hEUVVGRE8xTkJRekZETzFGQlEwUXNUVUZCVFN4RFFVRkRMR2xDUVVGcFFpeEhRVUZITEZsQlFWa3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eERRVUZETzFGQlF6RkVMRTFCUVUwc1EwRkJReXhqUVVGakxFZEJRVWNzV1VGQldTeERRVUZETEdGQlFXRXNRMEZCUXl4RFFVRkRPMUZCUlhCRUxIbENRVUY1UWp0UlFVTjZRaXg1UlVGQmVVVTdVVUZEZWtVc09FSkJRVGhDTzFGQlF6bENMRTFCUVUwc1YwRkJWeXhIUVVGSExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTTdVVUZEZUVNc1RVRkJUU3hEUVVGRExGbEJRVmtzUjBGQlJ5eFpRVUZaTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1VVRkZhRVFzYTBWQlFXdEZPMUZCUTJ4RkxHbEdRVUZwUmp0UlFVTnFSaXhwUWtGQmFVSTdVVUZEYWtJc2NVZEJRWEZITzFGQlEzSkhMRTFCUVUwc1EwRkJReXhoUVVGaExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXp0UlFVVndRenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08xVkJNRU5GTzFGQlEwWXNUVUZCVFN4RFFVRkRMR0ZCUVdFc1IwRkJSeXhUUVVGVExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUXpGRExFMUJRVTBzUTBGQlF5eGxRVUZsTEVkQlFVY3NUMEZCVHl4RFFVRkRMR0ZCUVdFc1EwRkJRenRSUVVNdlF5eE5RVUZOTEVOQlFVTXNaVUZCWlN4SFFVRkhMRmxCUVZrc1EwRkRia01zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRM1pETEVOQlFVTTdVVUZGUml4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGVkJRVlVzUTBGQlF5eGxRVUZsTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRlRVFzUTBGQlF6dEpRVVZQTEV0QlFVc3NRMEZCUXl4MVFrRkJkVUlzUTBGRGJrTXNUMEZCSzBNc1JVRkRMME1zVDBGQlR5eEZRVU5RTEZsQlFXOUNPMUZCUlhCQ096czdPenM3VlVGTlJUdFJRVVZHTERSQ1FVRTBRanRSUVVNMVFpeHBSRUZCYVVRN1VVRkZha1E3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08xVkJNa1JGTzFGQlJVWXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkZPVU1zVFVGQlRTeEhRVUZITEVkQlExQXNUMEZCVHl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGFFSXNRMEZCUXl4RFFVRkRMRTFCUVUwc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOMlF5eERRVUZETEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1UwRkJVeXhGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVXNRMEZCUXp0UlFVTndSQ3hOUVVGTkxGbEJRVmtzUjBGQmFVSTdXVUZEYWtNc1UwRkJVeXhGUVVGRkxGTkJRVk1zUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRPMWxCUTI1RExGRkJRVkVzUlVGQlJTeFBRVUZQTzFsQlEycENMR1ZCUVdVc1JVRkJSU3hUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0WlFVTjJReXhqUVVGakxFVkJRVVVzVDBGQlR5eERRVUZETEZOQlFWTTdXVUZEYWtNc1pVRkJaU3hGUVVGRkxGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRPMWxCUXk5RExHTkJRV01zUlVGQlJTeEpRVUZKTzFsQlEzQkNMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRaUVVNMVF5eGhRVUZoTEVWQlFVVXNXVUZCV1R0WlFVTXpRaXhUUVVGVExFVkJRVVVzUjBGQlJ5eERRVUZETEZGQlFWRTdXVUZEZGtJc1RVRkJUU3hGUVVGRkxFOUJRVThzUTBGQlF5eExRVUZMTzFsQlEzSkNMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVU1zVDBGQlR6dFpRVU42UWl4bFFVRmxMRVZCUVVVc1kwRkJZenRaUVVNdlFpeHZRa0ZCYjBJc1JVRkJSU3haUVVGWkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNN1dVRkRkRVFzVlVGQlZTeEZRVUZGTEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eFhRVUZYTEVWQlFVVTdVMEZEZEVRc1EwRkJRenRSUVVWR0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEZsQlFWa3NRMEZCUXl4RFFVRkRPMGxCUXk5RUxFTkJRVU03U1VGRlJEczdUVUZGUlR0SlFVVk5MRXRCUVVzc1EwRkJReXh0UWtGQmJVSXNRMEZETDBJc1QwRkJPRU1zUlVGRE9VTXNUVUZCVFR0UlFVVk9MRTFCUVUwc1pVRkJaU3hIUVVGSExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEYmtVc1NVRkJTVHRaUVVOR0xFMUJRVTBzYjBKQlFXOUNMRWRCUVVjc1pVRkJaU3hEUVVGRExHOUNRVUZ2UWl4RFFVRkRPMWxCUTJ4RkxFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNiMEpCUVc5Q0xFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTTdXVUZET1VRc1RVRkJUU3hYUVVGWExFZEJRVWNzVFVGQlRTeHZRa0ZCYjBJc1EwRkJReXhqUVVGakxFVkJRVVVzUTBGQlF6dFpRVU5vUlN4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGZEJRVmNzUTBGRE0wSXNXVUZCV1N4RFFVRkRMRkZCUVZFc1EwRkJReXhGUVVOMFFpeFpRVUZaTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUXpGQ0xFTkJRVU03V1VGRFJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVONFJEdFJRVUZETEU5QlFVOHNSMEZCUnl4RlFVRkZPMWxCUTFvN096czdPenM3WTBGUFJUdFpRVU5HTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1VVRkJVU3hEUVVONFFpeHRRMEZCYlVNN1owSkJRMnBETEhORVFVRnpSRHRuUWtGRGRFUXNSMEZCUnl4RFFVRkRMRWxCUVVrN1owSkJRMUlzUjBGQlJ5eERRVUZETEU5QlFVODdaMEpCUTFnc1NVRkJTVHRuUWtGRFNpeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVTmFMRU5CUVVNN1dVRkRSaXhOUVVGTkxFTkJRVU1zV1VGQldTeEhRVUZITEZOQlFWTXNRMEZCUXp0WlFVTm9ReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTjRSRHRKUVVOSUxFTkJRVU03U1VGRlJEczdPenM3T3pzN1QwRlJSenRKUVVOTExFbEJRVWtzUTBGQlF5eFpRVUV3UWp0UlFVTnlReXhQUVVGUExGbEJRVmtzUzBGQlN5eFJRVUZSTEVOQlFVTTdTVUZEYmtNc1EwRkJRenRKUVVWRUxEUkNRVUUwUWp0SlFVTndRaXhMUVVGTExFTkJRVU1zYTBKQlFXdENMRU5CUXpsQ0xFOUJRVEJETEVWQlF6RkRMRTlCUVU4c1JVRkRVQ3haUVVGWkxFVkJRMW9zWTBGQll5eEZRVU5rTEdOQlFXTTdVVUZGWkRzN096czdPenM3VlVGUlJUdFJRVVZHTEUxQlFVMHNSMEZCUnl4SFFVTlFMRTlCUVU4c1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyaENMRU5CUVVNc1EwRkJReXhOUVVGTkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGRrTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1VVRkJVU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1VVRkZjRVFzVFVGQlRTeE5RVUZOTEVkQlFVY3NSVUZCYTBJc1EwRkJRenRSUVVWc1F5eE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZETlVNc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZETVVJc1RVRkJUU3hEUVVGRExITkNRVUZ6UWl4SFFVRkhMRzlDUVVGdlFpeERRVUZETzFGQlEzSkVMRTFCUVUwc1EwRkJReXhoUVVGaExFZEJRVWNzV1VGQldTeERRVUZETzFGQlEzQkRMRTFCUVUwc1EwRkJReXhUUVVGVExFZEJRVWNzUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTm9ReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkRPVUlzVFVGQlRTeERRVUZETEZGQlFWRXNSMEZCUnl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRE8xRkJSV3hETEcxR1FVRnRSanRSUVVOdVJpeE5RVUZOTEVOQlFVTXNWVUZCVlN4SFFVRkhMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU03VVVGRmRFTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF6dFJRVU51UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVVjJReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRPMUZCUTNoQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NVMEZCVXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJSVFZDTEUxQlFVMHNZVUZCWVN4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGNrTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhaUVVGWkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTTdVVUZGTlVNc01FUkJRVEJFTzFGQlF6RkVMRFpGUVVFMlJUdFJRVU0zUlN3eVJVRkJNa1U3VVVGRE0wVXNSVUZCUlR0UlFVTkdMSEZDUVVGeFFqdFJRVU55UWl3d1FrRkJNRUk3VVVGRE1VSXNjME5CUVhORE8xRkJRM1JETEVsQlFVazdVVUZEU2l3MFEwRkJORU03VVVGRk5VTXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MRU5CUVVNc1pVRkJaU3hIUVVGSExHTkJRV01zUTBGQlF6dFJRVVY0UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRPVU1zVFVGQlRTeERRVUZETEc5Q1FVRnZRaXhIUVVGSExGbEJRVmtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRE8xRkJSUzlFTEUxQlFVMHNXVUZCV1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEZsQlFWa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRSUVVVdlF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRia0lzU1VGQlNTeFJRVUZSTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJ4Q0xFbEJRVWtzVDBGQlR5eERRVUZETEdWQlFXVXNSVUZCUlR0WlFVTXpRaXhQUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1JVRkJSVHRuUWtGRE0wTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hMUVVGTExFVkJRVVVzUjBGQlJ5eGpRVUZqTEVOQlFVTTdaMEpCUTNaRExFMUJRVTBzVjBGQlZ5eEhRVUZITEVWQlFVVXNRMEZCUXp0blFrRkRka0lzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGRFTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEV0QlFVc3NWVUZCVlN4RlFVRkZPMjlDUVVOeVF5eFJRVUZSTEVkQlFVY3NTMEZCU3l4RFFVRkRPMmxDUVVOc1FqdFpRVU5JTEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTBvN1VVRkRSQ3hOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGVrTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdVVUZGZWtNc1NVRkJTU3hqUVVGakxFVkJRVVU3V1VGRGJFSXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVNelF6dGhRVUZOTEVsQlFVa3NZMEZCWXl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMWxCUTNCRUxFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVMEZETTBNN1lVRkJUVHRaUVVOTUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMU5CUTNoRU8wbEJRMGdzUTBGQlF6dERRVU5HSW4wPSIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcsIGVzY2FwZVVybCB9IGZyb20gXCIuLi9saWIvc3RyaW5nLXV0aWxzXCI7XG5leHBvcnQgY2xhc3MgSmF2YXNjcmlwdEluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgcnVuKGNyYXdsSUQpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc0NhbGxzQW5kVmFsdWVzID0gKGRhdGEsIHNlbmRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgICAgICB1cGRhdGUuY3Jhd2xfaWQgPSBjcmF3bElEO1xuICAgICAgICAgICAgdXBkYXRlLmV4dGVuc2lvbl9zZXNzaW9uX3V1aWQgPSBleHRlbnNpb25TZXNzaW9uVXVpZDtcbiAgICAgICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKTtcbiAgICAgICAgICAgIHVwZGF0ZS5wYWdlX3Njb3BlZF9ldmVudF9vcmRpbmFsID0gZGF0YS5vcmRpbmFsO1xuICAgICAgICAgICAgdXBkYXRlLndpbmRvd19pZCA9IHNlbmRlci50YWIud2luZG93SWQ7XG4gICAgICAgICAgICB1cGRhdGUudGFiX2lkID0gc2VuZGVyLnRhYi5pZDtcbiAgICAgICAgICAgIHVwZGF0ZS5mcmFtZV9pZCA9IHNlbmRlci5mcmFtZUlkO1xuICAgICAgICAgICAgdXBkYXRlLnNjcmlwdF91cmwgPSBlc2NhcGVVcmwoZGF0YS5zY3JpcHRVcmwpO1xuICAgICAgICAgICAgdXBkYXRlLnNjcmlwdF9saW5lID0gZXNjYXBlU3RyaW5nKGRhdGEuc2NyaXB0TGluZSk7XG4gICAgICAgICAgICB1cGRhdGUuc2NyaXB0X2NvbCA9IGVzY2FwZVN0cmluZyhkYXRhLnNjcmlwdENvbCk7XG4gICAgICAgICAgICB1cGRhdGUuZnVuY19uYW1lID0gZXNjYXBlU3RyaW5nKGRhdGEuZnVuY05hbWUpO1xuICAgICAgICAgICAgdXBkYXRlLnNjcmlwdF9sb2NfZXZhbCA9IGVzY2FwZVN0cmluZyhkYXRhLnNjcmlwdExvY0V2YWwpO1xuICAgICAgICAgICAgdXBkYXRlLmNhbGxfc3RhY2sgPSBlc2NhcGVTdHJpbmcoZGF0YS5jYWxsU3RhY2spO1xuICAgICAgICAgICAgdXBkYXRlLnN5bWJvbCA9IGVzY2FwZVN0cmluZyhkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB1cGRhdGUub3BlcmF0aW9uID0gZXNjYXBlU3RyaW5nKGRhdGEub3BlcmF0aW9uKTtcbiAgICAgICAgICAgIHVwZGF0ZS52YWx1ZSA9IGVzY2FwZVN0cmluZyhkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZS50aW1lX3N0YW1wID0gZGF0YS50aW1lU3RhbXA7XG4gICAgICAgICAgICB1cGRhdGUuaW5jb2duaXRvID0gYm9vbFRvSW50KHNlbmRlci50YWIuaW5jb2duaXRvKTtcbiAgICAgICAgICAgIC8vIGRvY3VtZW50X3VybCBpcyB0aGUgY3VycmVudCBmcmFtZSdzIGRvY3VtZW50IGhyZWZcbiAgICAgICAgICAgIC8vIHRvcF9sZXZlbF91cmwgaXMgdGhlIHRvcC1sZXZlbCBmcmFtZSdzIGRvY3VtZW50IGhyZWZcbiAgICAgICAgICAgIHVwZGF0ZS5kb2N1bWVudF91cmwgPSBlc2NhcGVVcmwoc2VuZGVyLnVybCk7XG4gICAgICAgICAgICB1cGRhdGUudG9wX2xldmVsX3VybCA9IGVzY2FwZVVybChzZW5kZXIudGFiLnVybCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5vcGVyYXRpb24gPT09IFwiY2FsbFwiICYmIGRhdGEuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlLmFyZ3VtZW50cyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkYXRhLmFyZ3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJqYXZhc2NyaXB0XCIsIHVwZGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIExpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSBjb250ZW50IHNjcmlwdCBpbmplY3RlZCB0byBpbnN0cnVtZW50IEphdmFTY3JpcHQgQVBJXG4gICAgICAgIHRoaXMub25NZXNzYWdlTGlzdGVuZXIgPSAobXNnLCBzZW5kZXIpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJqYXZhc2NyaXB0LWluc3RydW1lbnRhdGlvbiBiYWNrZ3JvdW5kIGxpc3RlbmVyIC0gbXNnLCBzZW5kZXIsIHNlbmRSZXBseVwiLCBtc2csIHNlbmRlciwgc2VuZFJlcGx5KTtcbiAgICAgICAgICAgIGlmIChtc2cubmFtZXNwYWNlICYmIG1zZy5uYW1lc3BhY2UgPT09IFwiamF2YXNjcmlwdC1pbnN0cnVtZW50YXRpb25cIikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxvZ0NhbGxcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxvZ1ZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzQ2FsbHNBbmRWYWx1ZXMobXNnLmRhdGEsIHNlbmRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIodGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgfVxuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZhbUYyWVhOamNtbHdkQzFwYm5OMGNuVnRaVzUwTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVTkJMRTlCUVU4c1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4TlFVRk5MSGREUVVGM1F5eERRVUZETzBGQlEycEdMRTlCUVU4c1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4TlFVRk5MQ3RDUVVFclFpeERRVUZETzBGQlEzSkZMRTlCUVU4c1JVRkJSU3hUUVVGVExFVkJRVVVzV1VGQldTeEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MSEZDUVVGeFFpeERRVUZETzBGQlIzcEZMRTFCUVUwc1QwRkJUeXh2UWtGQmIwSTdTVUZKTDBJc1dVRkJXU3haUVVGWk8xRkJRM1JDTEVsQlFVa3NRMEZCUXl4WlFVRlpMRWRCUVVjc1dVRkJXU3hEUVVGRE8wbEJRMjVETEVOQlFVTTdTVUZGVFN4SFFVRkhMRU5CUVVNc1QwRkJUenRSUVVOb1FpeE5RVUZOTEhGQ1FVRnhRaXhIUVVGSExFTkJRVU1zU1VGQlNTeEZRVUZGTEUxQlFYRkNMRVZCUVVVc1JVRkJSVHRaUVVNMVJDeE5RVUZOTEUxQlFVMHNSMEZCUnl4RlFVRjVRaXhEUVVGRE8xbEJRM3BETEUxQlFVMHNRMEZCUXl4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRE8xbEJRekZDTEUxQlFVMHNRMEZCUXl4elFrRkJjMElzUjBGQlJ5eHZRa0ZCYjBJc1EwRkJRenRaUVVOeVJDeE5RVUZOTEVOQlFVTXNZVUZCWVN4SFFVRkhMSFZDUVVGMVFpeEZRVUZGTEVOQlFVTTdXVUZEYWtRc1RVRkJUU3hEUVVGRExIbENRVUY1UWl4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03V1VGRGFFUXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXp0WlFVTjJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRE8xbEJRemxDTEUxQlFVMHNRMEZCUXl4UlFVRlJMRWRCUVVjc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF6dFpRVU5xUXl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExGTkJRVk1zUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRPVU1zVFVGQlRTeERRVUZETEZkQlFWY3NSMEZCUnl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFsQlEyNUVMRTFCUVUwc1EwRkJReXhWUVVGVkxFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRaUVVOcVJDeE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdXVUZETDBNc1RVRkJUU3hEUVVGRExHVkJRV1VzUjBGQlJ5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhEUVVGRE8xbEJRekZFTEUxQlFVMHNRMEZCUXl4VlFVRlZMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0WlFVTnFSQ3hOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03V1VGRE1VTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMWxCUTJoRUxFMUJRVTBzUTBGQlF5eExRVUZMTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU40UXl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTTdXVUZEYmtNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFRRVUZUTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFpRVVZ1UkN4dlJFRkJiMFE3V1VGRGNFUXNkVVJCUVhWRU8xbEJRM1pFTEUxQlFVMHNRMEZCUXl4WlFVRlpMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTTFReXhOUVVGTkxFTkJRVU1zWVVGQllTeEhRVUZITEZOQlFWTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlJXcEVMRWxCUVVrc1NVRkJTU3hEUVVGRExGTkJRVk1zUzBGQlN5eE5RVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eEZRVUZGTzJkQ1FVTnlSQ3hOUVVGTkxFTkJRVU1zVTBGQlV5eEhRVUZITEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUXpWRU8xbEJSVVFzU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1dVRkJXU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFGQlEzSkVMRU5CUVVNc1EwRkJRenRSUVVWR0xHZEdRVUZuUmp0UlFVTm9SaXhKUVVGSkxFTkJRVU1zYVVKQlFXbENMRWRCUVVjc1EwRkJReXhIUVVGSExFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVTdXVUZEZGtNc2IwaEJRVzlJTzFsQlEzQklMRWxCUVVrc1IwRkJSeXhEUVVGRExGTkJRVk1zU1VGQlNTeEhRVUZITEVOQlFVTXNVMEZCVXl4TFFVRkxMRFJDUVVFMFFpeEZRVUZGTzJkQ1FVTnVSU3hSUVVGUkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVTdiMEpCUTJoQ0xFdEJRVXNzVTBGQlV5eERRVUZETzI5Q1FVTm1MRXRCUVVzc1ZVRkJWVHQzUWtGRFlpeHhRa0ZCY1VJc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPM2RDUVVONFF5eE5RVUZOTzJsQ1FVTlVPMkZCUTBZN1VVRkRTQ3hEUVVGRExFTkJRVU03VVVGRFJpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03U1VGRGFFVXNRMEZCUXp0SlFVVk5MRTlCUVU4N1VVRkRXaXhKUVVGSkxFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1JVRkJSVHRaUVVNeFFpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03VTBGRGJFVTdTVUZEU0N4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IFBlbmRpbmdOYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLW5hdmlnYXRpb25cIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuaW1wb3J0IHsgbWFrZVVVSUQgfSBmcm9tIFwiLi4vbGliL3V1aWRcIjtcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1XZWJOYXZpZ2F0aW9uQmFzZUV2ZW50RGV0YWlsc1RvT3BlbldQTVNjaGVtYSA9IGFzeW5jIChjcmF3bElELCBkZXRhaWxzKSA9PiB7XG4gICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHdpbmRvd0lkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbmNvZ25pdG86IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvb2tpZVN0b3JlSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9wZW5lclRhYklkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgY29uc3Qgd2luZG93ID0gdGFiLndpbmRvd0lkXG4gICAgICAgID8gYXdhaXQgYnJvd3Nlci53aW5kb3dzLmdldCh0YWIud2luZG93SWQpXG4gICAgICAgIDogeyB3aWR0aDogdW5kZWZpbmVkLCBoZWlnaHQ6IHVuZGVmaW5lZCwgdHlwZTogdW5kZWZpbmVkIH07XG4gICAgY29uc3QgbmF2aWdhdGlvbiA9IHtcbiAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgIGluY29nbml0bzogYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pLFxuICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgcHJvY2Vzc19pZDogZGV0YWlscy5wcm9jZXNzSWQsXG4gICAgICAgIHdpbmRvd19pZDogdGFiLndpbmRvd0lkLFxuICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgIHRhYl9vcGVuZXJfdGFiX2lkOiB0YWIub3BlbmVyVGFiSWQsXG4gICAgICAgIGZyYW1lX2lkOiBkZXRhaWxzLmZyYW1lSWQsXG4gICAgICAgIHdpbmRvd193aWR0aDogd2luZG93LndpZHRoLFxuICAgICAgICB3aW5kb3dfaGVpZ2h0OiB3aW5kb3cuaGVpZ2h0LFxuICAgICAgICB3aW5kb3dfdHlwZTogd2luZG93LnR5cGUsXG4gICAgICAgIHRhYl93aWR0aDogdGFiLndpZHRoLFxuICAgICAgICB0YWJfaGVpZ2h0OiB0YWIuaGVpZ2h0LFxuICAgICAgICB0YWJfY29va2llX3N0b3JlX2lkOiBlc2NhcGVTdHJpbmcodGFiLmNvb2tpZVN0b3JlSWQpLFxuICAgICAgICB1dWlkOiBtYWtlVVVJRCgpLFxuICAgICAgICB1cmw6IGVzY2FwZVVybChkZXRhaWxzLnVybCksXG4gICAgfTtcbiAgICByZXR1cm4gbmF2aWdhdGlvbjtcbn07XG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgc3RhdGljIG5hdmlnYXRpb25JZChwcm9jZXNzSWQsIHRhYklkLCBmcmFtZUlkKSB7XG4gICAgICAgIHJldHVybiBgJHtwcm9jZXNzSWR9LSR7dGFiSWR9LSR7ZnJhbWVJZH1gO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lciA9IGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uSWQgPSBOYXZpZ2F0aW9uSW5zdHJ1bWVudC5uYXZpZ2F0aW9uSWQoZGV0YWlscy5wcm9jZXNzSWQsIGRldGFpbHMudGFiSWQsIGRldGFpbHMuZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nTmF2aWdhdGlvbiA9IHRoaXMuaW5zdGFudGlhdGVQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbiA9IGF3YWl0IHRyYW5zZm9ybVdlYk5hdmlnYXRpb25CYXNlRXZlbnREZXRhaWxzVG9PcGVuV1BNU2NoZW1hKGNyYXdsSUQsIGRldGFpbHMpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5wYXJlbnRfZnJhbWVfaWQgPSBkZXRhaWxzLnBhcmVudEZyYW1lSWQ7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsID0gaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXAgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVPbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uKG5hdmlnYXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25CZWZvcmVOYXZpZ2F0ZS5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMub25Db21taXR0ZWRMaXN0ZW5lciA9IGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uSWQgPSBOYXZpZ2F0aW9uSW5zdHJ1bWVudC5uYXZpZ2F0aW9uSWQoZGV0YWlscy5wcm9jZXNzSWQsIGRldGFpbHMudGFiSWQsIGRldGFpbHMuZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uID0gYXdhaXQgdHJhbnNmb3JtV2ViTmF2aWdhdGlvbkJhc2VFdmVudERldGFpbHNUb09wZW5XUE1TY2hlbWEoY3Jhd2xJRCwgZGV0YWlscyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRyYW5zaXRpb25fcXVhbGlmaWVycyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkZXRhaWxzLnRyYW5zaXRpb25RdWFsaWZpZXJzKSk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRyYW5zaXRpb25fdHlwZSA9IGVzY2FwZVN0cmluZyhkZXRhaWxzLnRyYW5zaXRpb25UeXBlKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uY29tbWl0dGVkX2V2ZW50X29yZGluYWwgPSBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5jb21taXR0ZWRfdGltZV9zdGFtcCA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgLy8gaW5jbHVkZSBhdHRyaWJ1dGVzIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgb25CZWZvcmVOYXZpZ2F0aW9uIGV2ZW50XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nTmF2aWdhdGlvbiA9IHRoaXMuZ2V0UGVuZGluZ05hdmlnYXRpb24obmF2aWdhdGlvbklkKTtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbihuYXZpZ2F0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVkV2l0aGluVGltZW91dCgxMDAwKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IGF3YWl0IHBlbmRpbmdOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb247XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX2V2ZW50X29yZGluYWw7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXAgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfdGltZV9zdGFtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwibmF2aWdhdGlvbnNcIiwgbmF2aWdhdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkNvbW1pdHRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tbWl0dGVkTGlzdGVuZXIpO1xuICAgIH1cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZU5hdmlnYXRlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkJlZm9yZU5hdmlnYXRlLnJlbW92ZUxpc3RlbmVyKHRoaXMub25CZWZvcmVOYXZpZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW50aWF0ZVBlbmRpbmdOYXZpZ2F0aW9uKG5hdmlnYXRpb25JZCkge1xuICAgICAgICB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdID0gbmV3IFBlbmRpbmdOYXZpZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdO1xuICAgIH1cbiAgICBnZXRQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ05hdmlnYXRpb25zW25hdmlnYXRpb25JZF07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm1GMmFXZGhkR2x2YmkxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZibUYyYVdkaGRHbHZiaTFwYm5OMGNuVnRaVzUwTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMRTlCUVU4c1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4TlFVRk5MSGREUVVGM1F5eERRVUZETzBGQlEycEdMRTlCUVU4c1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4TlFVRk5MQ3RDUVVFclFpeERRVUZETzBGQlEzSkZMRTlCUVU4c1JVRkJSU3hwUWtGQmFVSXNSVUZCUlN4TlFVRk5MREpDUVVFeVFpeERRVUZETzBGQlF6bEVMRTlCUVU4c1JVRkJSU3hUUVVGVExFVkJRVVVzV1VGQldTeEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MSEZDUVVGeFFpeERRVUZETzBGQlEzcEZMRTlCUVU4c1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeGhRVUZoTEVOQlFVTTdRVUZSZGtNc1RVRkJUU3hEUVVGRExFMUJRVTBzY1VSQlFYRkVMRWRCUVVjc1MwRkJTeXhGUVVONFJTeFBRVUZQTEVWQlExQXNUMEZCYzBNc1JVRkRha0lzUlVGQlJUdEpRVU4yUWl4TlFVRk5MRWRCUVVjc1IwRkRVQ3hQUVVGUExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTm9RaXhEUVVGRExFTkJRVU1zVFVGQlRTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlEzWkRMRU5CUVVNc1EwRkJRenRaUVVORkxGRkJRVkVzUlVGQlJTeFRRVUZUTzFsQlEyNUNMRk5CUVZNc1JVRkJSU3hUUVVGVE8xbEJRM0JDTEdGQlFXRXNSVUZCUlN4VFFVRlRPMWxCUTNoQ0xGZEJRVmNzUlVGQlJTeFRRVUZUTzFsQlEzUkNMRXRCUVVzc1JVRkJSU3hUUVVGVE8xbEJRMmhDTEUxQlFVMHNSVUZCUlN4VFFVRlRPMU5CUTJ4Q0xFTkJRVU03U1VGRFVpeE5RVUZOTEUxQlFVMHNSMEZCUnl4SFFVRkhMRU5CUVVNc1VVRkJVVHRSUVVONlFpeERRVUZETEVOQlFVTXNUVUZCVFN4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTNwRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4VFFVRlRMRVZCUVVVc1RVRkJUU3hGUVVGRkxGTkJRVk1zUlVGQlJTeEpRVUZKTEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1NVRkROMFFzVFVGQlRTeFZRVUZWTEVkQlFXVTdVVUZETjBJc1VVRkJVU3hGUVVGRkxFOUJRVTg3VVVGRGFrSXNVMEZCVXl4RlFVRkZMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEyNURMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRSUVVNMVF5eFZRVUZWTEVWQlFVVXNUMEZCVHl4RFFVRkRMRk5CUVZNN1VVRkROMElzVTBGQlV5eEZRVUZGTEVkQlFVY3NRMEZCUXl4UlFVRlJPMUZCUTNaQ0xFMUJRVTBzUlVGQlJTeFBRVUZQTEVOQlFVTXNTMEZCU3p0UlFVTnlRaXhwUWtGQmFVSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1YwRkJWenRSUVVOc1F5eFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkRMRTlCUVU4N1VVRkRla0lzV1VGQldTeEZRVUZGTEUxQlFVMHNRMEZCUXl4TFFVRkxPMUZCUXpGQ0xHRkJRV0VzUlVGQlJTeE5RVUZOTEVOQlFVTXNUVUZCVFR0UlFVTTFRaXhYUVVGWExFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVazdVVUZEZUVJc1UwRkJVeXhGUVVGRkxFZEJRVWNzUTBGQlF5eExRVUZMTzFGQlEzQkNMRlZCUVZVc1JVRkJSU3hIUVVGSExFTkJRVU1zVFVGQlRUdFJRVU4wUWl4dFFrRkJiVUlzUlVGQlJTeFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJRenRSUVVOd1JDeEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkZPMUZCUTJoQ0xFZEJRVWNzUlVGQlJTeFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRMUVVNMVFpeERRVUZETzBsQlEwWXNUMEZCVHl4VlFVRlZMRU5CUVVNN1FVRkRjRUlzUTBGQlF5eERRVUZETzBGQlJVWXNUVUZCVFN4UFFVRlBMRzlDUVVGdlFqdEpRVmN2UWl4WlFVRlpMRmxCUVZrN1VVRkthRUlzZFVKQlFXdENMRWRCUlhSQ0xFVkJRVVVzUTBGQlF6dFJRVWRNTEVsQlFVa3NRMEZCUXl4WlFVRlpMRWRCUVVjc1dVRkJXU3hEUVVGRE8wbEJRMjVETEVOQlFVTTdTVUZhVFN4TlFVRk5MRU5CUVVNc1dVRkJXU3hEUVVGRExGTkJRVk1zUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHp0UlFVTnNSQ3hQUVVGUExFZEJRVWNzVTBGQlV5eEpRVUZKTEV0QlFVc3NTVUZCU1N4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVNMVF5eERRVUZETzBsQldVMHNSMEZCUnl4RFFVRkRMRTlCUVU4N1VVRkRhRUlzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhIUVVGSExFdEJRVXNzUlVGRGJrTXNUMEZCYTBRc1JVRkRiRVFzUlVGQlJUdFpRVU5HTEUxQlFVMHNXVUZCV1N4SFFVRkhMRzlDUVVGdlFpeERRVUZETEZsQlFWa3NRMEZEY0VRc1QwRkJUeXhEUVVGRExGTkJRVk1zUlVGRGFrSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1JVRkRZaXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVU5vUWl4RFFVRkRPMWxCUTBZc1RVRkJUU3hwUWtGQmFVSXNSMEZCUnl4SlFVRkpMRU5CUVVNc05FSkJRVFJDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1dVRkRNVVVzVFVGQlRTeFZRVUZWTEVkQlFXVXNUVUZCVFN4eFJFRkJjVVFzUTBGRGVFWXNUMEZCVHl4RlFVTlFMRTlCUVU4c1EwRkRVaXhEUVVGRE8xbEJRMFlzVlVGQlZTeERRVUZETEdWQlFXVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRE8xbEJRMjVFTEZWQlFWVXNRMEZCUXl3MlFrRkJOa0lzUjBGQlJ5eDFRa0ZCZFVJc1JVRkJSU3hEUVVGRE8xbEJRM0pGTEZWQlFWVXNRMEZCUXl3d1FrRkJNRUlzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZET1VNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGRGJFSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRaUVVOb1FpeHBRa0ZCYVVJc1EwRkJReXh6UTBGQmMwTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOMlJTeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRmRCUVZjc1EwRkRhRVFzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhEUVVNNVFpeERRVUZETzFGQlEwWXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEhRVUZITEV0QlFVc3NSVUZET1VJc1QwRkJOa01zUlVGRE4wTXNSVUZCUlR0WlFVTkdMRTFCUVUwc1dVRkJXU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRMRmxCUVZrc1EwRkRjRVFzVDBGQlR5eERRVUZETEZOQlFWTXNSVUZEYWtJc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGRFlpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVTm9RaXhEUVVGRE8xbEJRMFlzVFVGQlRTeFZRVUZWTEVkQlFXVXNUVUZCVFN4eFJFRkJjVVFzUTBGRGVFWXNUMEZCVHl4RlFVTlFMRTlCUVU4c1EwRkRVaXhEUVVGRE8xbEJRMFlzVlVGQlZTeERRVUZETEhGQ1FVRnhRaXhIUVVGSExGbEJRVmtzUTBGRE4wTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zYjBKQlFXOUNMRU5CUVVNc1EwRkROME1zUTBGQlF6dFpRVU5HTEZWQlFWVXNRMEZCUXl4bFFVRmxMRWRCUVVjc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0WlFVTnNSU3hWUVVGVkxFTkJRVU1zZFVKQlFYVkNMRWRCUVVjc2RVSkJRWFZDTEVWQlFVVXNRMEZCUXp0WlFVTXZSQ3hWUVVGVkxFTkJRVU1zYjBKQlFXOUNMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRM2hETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUTJ4Q0xFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZGYUVJc2NVVkJRWEZGTzFsQlEzSkZMRTFCUVUwc2FVSkJRV2xDTEVkQlFVY3NTVUZCU1N4RFFVRkRMRzlDUVVGdlFpeERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRPMWxCUTJ4RkxFbEJRVWtzYVVKQlFXbENMRVZCUVVVN1owSkJRM0pDTEdsQ1FVRnBRaXhEUVVGRExHbERRVUZwUXl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8yZENRVU5vUlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhOUVVGTkxHbENRVUZwUWl4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOeVJTeEpRVUZKTEZGQlFWRXNSVUZCUlR0dlFrRkRXaXhOUVVGTkxDdENRVUVyUWl4SFFVRkhMRTFCUVUwc2FVSkJRV2xDTEVOQlFVTXNLMEpCUVN0Q0xFTkJRVU03YjBKQlEyaEhMRlZCUVZVc1EwRkJReXhsUVVGbE8zZENRVU40UWl3clFrRkJLMElzUTBGQlF5eGxRVUZsTEVOQlFVTTdiMEpCUTJ4RUxGVkJRVlVzUTBGQlF5dzJRa0ZCTmtJN2QwSkJRM1JETEN0Q1FVRXJRaXhEUVVGRExEWkNRVUUyUWl4RFFVRkRPMjlDUVVOb1JTeFZRVUZWTEVOQlFVTXNNRUpCUVRCQ08zZENRVU51UXl3clFrRkJLMElzUTBGQlF5d3dRa0ZCTUVJc1EwRkJRenRwUWtGRE9VUTdZVUZEUmp0WlFVVkVMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEdGQlFXRXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVNeFJDeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExGZEJRVmNzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdTVUZETVVVc1EwRkJRenRKUVVWTkxFOUJRVTg3VVVGRFdpeEpRVUZKTEVsQlFVa3NRMEZCUXl4M1FrRkJkMElzUlVGQlJUdFpRVU5xUXl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMR05CUVdNc1EwRkRia1FzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhEUVVNNVFpeERRVUZETzFOQlEwZzdVVUZEUkN4SlFVRkpMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNSVUZCUlR0WlFVTTFRaXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEZkQlFWY3NRMEZCUXl4alFVRmpMRU5CUXpsRExFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1EwRkRla0lzUTBGQlF6dFRRVU5JTzBsQlEwZ3NRMEZCUXp0SlFVVlBMRFJDUVVFMFFpeERRVU5zUXl4WlFVRnZRanRSUVVWd1FpeEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zV1VGQldTeERRVUZETEVkQlFVY3NTVUZCU1N4cFFrRkJhVUlzUlVGQlJTeERRVUZETzFGQlEyaEZMRTlCUVU4c1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8wbEJReTlETEVOQlFVTTdTVUZGVHl4dlFrRkJiMElzUTBGQlF5eFpRVUZ2UWp0UlFVTXZReXhQUVVGUExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dEpRVU12UXl4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBwYWdlU2NyaXB0IH0gZnJvbSBcIi4vamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGVcIjtcbmZ1bmN0aW9uIGdldFBhZ2VTY3JpcHRBc1N0cmluZygpIHtcbiAgICAvLyByZXR1cm4gYSBzdHJpbmdcbiAgICByZXR1cm4gXCIoXCIgKyBwYWdlU2NyaXB0ICsgXCIoKSk7XCI7XG59XG5mdW5jdGlvbiBpbnNlcnRTY3JpcHQodGV4dCwgZGF0YSkge1xuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzY3JpcHQudGV4dCA9IHRleHQ7XG4gICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIGtleS5yZXBsYWNlKFwiX1wiLCBcIi1cIiksIGRhdGFba2V5XSk7XG4gICAgfVxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoc2NyaXB0LCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHNjcmlwdCk7XG59XG5mdW5jdGlvbiBlbWl0TXNnKHR5cGUsIG1zZykge1xuICAgIG1zZy50aW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgbmFtZXNwYWNlOiBcImphdmFzY3JpcHQtaW5zdHJ1bWVudGF0aW9uXCIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGRhdGE6IG1zZyxcbiAgICB9KTtcbn1cbmNvbnN0IGV2ZW50X2lkID0gTWF0aC5yYW5kb20oKTtcbi8vIGxpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgc2NyaXB0IHdlIGFyZSBhYm91dCB0byBpbnNlcnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRfaWQudG9TdHJpbmcoKSwgZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBwYXNzIHRoZXNlIG9uIHRvIHRoZSBiYWNrZ3JvdW5kIHBhZ2VcbiAgICBjb25zdCBtc2dzID0gZS5kZXRhaWw7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobXNncykpIHtcbiAgICAgICAgbXNncy5mb3JFYWNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGVtaXRNc2cobXNnLnR5cGUsIG1zZy5jb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlbWl0TXNnKG1zZ3MudHlwZSwgbXNncy5jb250ZW50KTtcbiAgICB9XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RKYXZhc2NyaXB0SW5zdHJ1bWVudFBhZ2VTY3JpcHQodGVzdGluZyA9IGZhbHNlKSB7XG4gICAgaW5zZXJ0U2NyaXB0KGdldFBhZ2VTY3JpcHRBc1N0cmluZygpLCB7XG4gICAgICAgIGV2ZW50X2lkLFxuICAgICAgICB0ZXN0aW5nLFxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExXTnZiblJsYm5RdGMyTnZjR1V1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12WTI5dWRHVnVkQzlxWVhaaGMyTnlhWEIwTFdsdWMzUnlkVzFsYm5RdFkyOXVkR1Z1ZEMxelkyOXdaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc2IwTkJRVzlETEVOQlFVTTdRVUZGYUVVc1UwRkJVeXh4UWtGQmNVSTdTVUZETlVJc2EwSkJRV3RDTzBsQlEyeENMRTlCUVU4c1IwRkJSeXhIUVVGSExGVkJRVlVzUjBGQlJ5eE5RVUZOTEVOQlFVTTdRVUZEYmtNc1EwRkJRenRCUVVWRUxGTkJRVk1zV1VGQldTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpPMGxCUXpsQ0xFMUJRVTBzVFVGQlRTeEhRVUZITEZGQlFWRXNRMEZCUXl4bFFVRmxMRVZCUTNKRExFMUJRVTBzUjBGQlJ5eFJRVUZSTEVOQlFVTXNZVUZCWVN4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wbEJRelZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJRMjVDTEUxQlFVMHNRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wbEJSWEpDTEV0QlFVc3NUVUZCVFN4SFFVRkhMRWxCUVVrc1NVRkJTU3hGUVVGRk8xRkJRM1JDTEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1QwRkJUeXhIUVVGSExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMHRCUTJwRk8wbEJSVVFzVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzBsQlF5OURMRTFCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdRVUZETjBJc1EwRkJRenRCUVVWRUxGTkJRVk1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4SFFVRkhPMGxCUTNoQ0xFZEJRVWNzUTBGQlF5eFRRVUZUTEVkQlFVY3NTVUZCU1N4SlFVRkpMRVZCUVVVc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dEpRVU42UXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExGZEJRVmNzUTBGQlF6dFJRVU14UWl4VFFVRlRMRVZCUVVVc05FSkJRVFJDTzFGQlEzWkRMRWxCUVVrN1VVRkRTaXhKUVVGSkxFVkJRVVVzUjBGQlJ6dExRVU5XTEVOQlFVTXNRMEZCUXp0QlFVTk1MRU5CUVVNN1FVRkZSQ3hOUVVGTkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNN1FVRkZMMElzTmtSQlFUWkVPMEZCUXpkRUxGRkJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhSUVVGUkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVWQlFVVXNWVUZCVXl4RFFVRmpPMGxCUTNCRkxIVkRRVUYxUXp0SlFVTjJReXhOUVVGTkxFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRPMGxCUTNSQ0xFbEJRVWtzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHRSUVVOMlFpeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVZNc1IwRkJSenRaUVVOMlFpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEYWtNc1EwRkJReXhEUVVGRExFTkJRVU03UzBGRFNqdFRRVUZOTzFGQlEwd3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMHRCUTJ4RE8wRkJRMGdzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZGU0N4TlFVRk5MRlZCUVZVc2IwTkJRVzlETEVOQlFVTXNUMEZCVHl4SFFVRkhMRXRCUVVzN1NVRkRiRVVzV1VGQldTeERRVUZETEhGQ1FVRnhRaXhGUVVGRkxFVkJRVVU3VVVGRGNFTXNVVUZCVVR0UlFVTlNMRTlCUVU4N1MwRkRVaXhEUVVGRExFTkJRVU03UVVGRFRDeERRVUZESW4wPSIsIi8vIEludHJ1bWVudGF0aW9uIGluamVjdGlvbiBjb2RlIGlzIGJhc2VkIG9uIHByaXZhY3liYWRnZXJmaXJlZm94XG4vLyBodHRwczovL2dpdGh1Yi5jb20vRUZGb3JnL3ByaXZhY3liYWRnZXJmaXJlZm94L2Jsb2IvbWFzdGVyL2RhdGEvZmluZ2VycHJpbnRpbmcuanNcbmV4cG9ydCBjb25zdCBwYWdlU2NyaXB0ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIGZyb20gVW5kZXJzY29yZSB2MS42LjBcbiAgICBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUgPSBmYWxzZSkge1xuICAgICAgICBsZXQgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG4gICAgICAgIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IERhdGUubm93KCkgLSB0aW1lc3RhbXA7XG4gICAgICAgICAgICBpZiAobGFzdCA8IHdhaXQpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIEVuZCBvZiBEZWJvdW5jZVxuICAgIC8vIG1lc3NhZ2VzIHRoZSBpbmplY3RlZCBzY3JpcHRcbiAgICBjb25zdCBzZW5kID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gW107XG4gICAgICAgIC8vIGRlYm91bmNlIHNlbmRpbmcgcXVldWVkIG1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IF9zZW5kID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnRfaWQsIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IG1lc3NhZ2VzLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIHF1ZXVlXG4gICAgICAgICAgICBtZXNzYWdlcyA9IFtdO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1zZ1R5cGUsIG1zZykge1xuICAgICAgICAgICAgLy8gcXVldWUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goeyB0eXBlOiBtc2dUeXBlLCBjb250ZW50OiBtc2cgfSk7XG4gICAgICAgICAgICBfc2VuZCgpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG4gICAgY29uc3QgZXZlbnRfaWQgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtZXZlbnQtaWRcIik7XG4gICAgLypcbiAgICAgKiBJbnN0cnVtZW50YXRpb24gaGVscGVyc1xuICAgICAqL1xuICAgIGNvbnN0IHRlc3RpbmcgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtdGVzdGluZ1wiKSA9PT0gXCJ0cnVlXCI7XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBDdXJyZW50bHkgdGVzdGluZz9cIiwgdGVzdGluZyk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGdlbmVyYXRlcyBhIHBhdGggZm9yIGFuIGVsZW1lbnRcbiAgICBmdW5jdGlvbiBnZXRQYXRoVG9Eb21FbGVtZW50KGVsZW1lbnQsIHZpc2liaWxpdHlBdHRyID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiTlVMTC9cIiArIGVsZW1lbnQudGFnTmFtZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2libGluZ0luZGV4ID0gMTtcbiAgICAgICAgY29uc3Qgc2libGluZ3MgPSBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWJsaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHNpYmxpbmdzW2ldO1xuICAgICAgICAgICAgaWYgKHNpYmxpbmcgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IGdldFBhdGhUb0RvbUVsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlLCB2aXNpYmlsaXR5QXR0cik7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIi9cIiArIGVsZW1lbnQudGFnTmFtZSArIFwiW1wiICsgc2libGluZ0luZGV4O1xuICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LmlkO1xuICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eUF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuaGlkZGVuO1xuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSBcIkFcIikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5ocmVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoICs9IFwiXVwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDEgJiYgc2libGluZy50YWdOYW1lID09PSBlbGVtZW50LnRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5nSW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBIZWxwZXIgZm9yIEpTT05pZnlpbmcgb2JqZWN0c1xuICAgIGZ1bmN0aW9uIHNlcmlhbGl6ZU9iamVjdChvYmplY3QsIHN0cmluZ2lmeUZ1bmN0aW9ucyA9IGZhbHNlKSB7XG4gICAgICAgIC8vIEhhbmRsZSBwZXJtaXNzaW9ucyBlcnJvcnNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChvYmplY3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJudWxsXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ2lmeUZ1bmN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJGVU5DVElPTlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlZW5PYmplY3RzID0gW107XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqZWN0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJudWxsXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5naWZ5RnVuY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkZVTkNUSU9OXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgd3JhcHBpbmcgb24gY29udGVudCBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgIGlmIChcIndyYXBwZWRKU09iamVjdFwiIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLndyYXBwZWRKU09iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBTZXJpYWxpemUgRE9NIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0UGF0aFRvRG9tRWxlbWVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBzZXJpYWxpemF0aW9uIGN5Y2xlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIlwiIHx8IHNlZW5PYmplY3RzLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vlbk9iamVjdHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBTRVJJQUxJWkFUSU9OIEVSUk9SOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBcIlNFUklBTElaQVRJT04gRVJST1I6IFwiICsgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBuYW1lOiBcIiArIGVycm9yLm5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIG1lc3NhZ2U6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3IgZmlsZW5hbWU6IFwiICsgZXJyb3IuZmlsZU5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIGxpbmUgbnVtYmVyOiBcIiArIGVycm9yLmxpbmVOdW1iZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIHN0YWNrOiBcIiArIGVycm9yLnN0YWNrKTtcbiAgICB9XG4gICAgLy8gSGVscGVyIHRvIGdldCBvcmlnaW5hdGluZyBzY3JpcHQgdXJsc1xuICAgIGZ1bmN0aW9uIGdldFN0YWNrVHJhY2UoKSB7XG4gICAgICAgIGxldCBzdGFjaztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGFjaztcbiAgICB9XG4gICAgLy8gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81MjAyMTg1XG4gICAgU3RyaW5nLnByb3RvdHlwZS5yc3BsaXQgPSBmdW5jdGlvbiAoc2VwLCBtYXhzcGxpdCkge1xuICAgICAgICBjb25zdCBzcGxpdCA9IHRoaXMuc3BsaXQoc2VwKTtcbiAgICAgICAgcmV0dXJuIG1heHNwbGl0XG4gICAgICAgICAgICA/IFtzcGxpdC5zbGljZSgwLCAtbWF4c3BsaXQpLmpvaW4oc2VwKV0uY29uY2F0KHNwbGl0LnNsaWNlKC1tYXhzcGxpdCkpXG4gICAgICAgICAgICA6IHNwbGl0O1xuICAgIH07XG4gICAgZnVuY3Rpb24gZ2V0T3JpZ2luYXRpbmdTY3JpcHRDb250ZXh0KGdldENhbGxTdGFjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHRyYWNlID0gZ2V0U3RhY2tUcmFjZSgpXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIC8vIHJldHVybiBhIGNvbnRleHQgb2JqZWN0IGV2ZW4gaWYgdGhlcmUgaXMgYW4gZXJyb3JcbiAgICAgICAgY29uc3QgZW1wdHlfY29udGV4dCA9IHtcbiAgICAgICAgICAgIHNjcmlwdFVybDogXCJcIixcbiAgICAgICAgICAgIHNjcmlwdExpbmU6IFwiXCIsXG4gICAgICAgICAgICBzY3JpcHRDb2w6IFwiXCIsXG4gICAgICAgICAgICBmdW5jTmFtZTogXCJcIixcbiAgICAgICAgICAgIHNjcmlwdExvY0V2YWw6IFwiXCIsXG4gICAgICAgICAgICBjYWxsU3RhY2s6IFwiXCIsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0cmFjZS5sZW5ndGggPCA0KSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlfY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICAvLyAwLCAxIGFuZCAyIGFyZSBPcGVuV1BNJ3Mgb3duIGZ1bmN0aW9ucyAoZS5nLiBnZXRTdGFja1RyYWNlKSwgc2tpcCB0aGVtLlxuICAgICAgICBjb25zdCBjYWxsU2l0ZSA9IHRyYWNlWzNdO1xuICAgICAgICBpZiAoIWNhbGxTaXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlfY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICAgKiBTdGFjayBmcmFtZSBmb3JtYXQgaXMgc2ltcGx5OiBGVU5DX05BTUVARklMRU5BTUU6TElORV9OTzpDT0xVTU5fTk9cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgZXZhbCBvciBGdW5jdGlvbiBpcyBpbnZvbHZlZCB3ZSBoYXZlIGFuIGFkZGl0aW9uYWwgcGFydCBhZnRlciB0aGUgRklMRU5BTUUsIGUuZy46XG4gICAgICAgICAqIEZVTkNfTkFNRUBGSUxFTkFNRSBsaW5lIDEyMyA+IGV2YWwgbGluZSAxID4gZXZhbDpMSU5FX05POkNPTFVNTl9OT1xuICAgICAgICAgKiBvciBGVU5DX05BTUVARklMRU5BTUUgbGluZSAyMzQgPiBGdW5jdGlvbjpMSU5FX05POkNPTFVNTl9OT1xuICAgICAgICAgKlxuICAgICAgICAgKiBXZSBzdG9yZSB0aGUgcGFydCBiZXR3ZWVuIHRoZSBGSUxFTkFNRSBhbmQgdGhlIExJTkVfTk8gaW4gc2NyaXB0TG9jRXZhbFxuICAgICAgICAgKi9cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzY3JpcHRVcmwgPSBcIlwiO1xuICAgICAgICAgICAgbGV0IHNjcmlwdExvY0V2YWwgPSBcIlwiOyAvLyBmb3IgZXZhbCBvciBGdW5jdGlvbiBjYWxsc1xuICAgICAgICAgICAgY29uc3QgY2FsbFNpdGVQYXJ0cyA9IGNhbGxTaXRlLnNwbGl0KFwiQFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmNOYW1lID0gY2FsbFNpdGVQYXJ0c1swXSB8fCBcIlwiO1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBjYWxsU2l0ZVBhcnRzWzFdLnJzcGxpdChcIjpcIiwgMik7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5ObyA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbGluZU5vID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICBjb25zdCBzY3JpcHRGaWxlTmFtZSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDNdIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBsaW5lTm9JZHggPSBzY3JpcHRGaWxlTmFtZS5pbmRleE9mKFwiIGxpbmUgXCIpOyAvLyBsaW5lIGluIHRoZSBVUkwgbWVhbnMgZXZhbCBvciBGdW5jdGlvblxuICAgICAgICAgICAgaWYgKGxpbmVOb0lkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmwgPSBzY3JpcHRGaWxlTmFtZTsgLy8gVE9ETzogc29tZXRpbWVzIHdlIGhhdmUgZmlsZW5hbWUgb25seSwgZS5nLiBYWC5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0VXJsID0gc2NyaXB0RmlsZU5hbWUuc2xpY2UoMCwgbGluZU5vSWR4KTtcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsID0gc2NyaXB0RmlsZU5hbWUuc2xpY2UobGluZU5vSWR4ICsgMSwgc2NyaXB0RmlsZU5hbWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgIHNjcmlwdFVybCxcbiAgICAgICAgICAgICAgICBzY3JpcHRMaW5lOiBsaW5lTm8sXG4gICAgICAgICAgICAgICAgc2NyaXB0Q29sOiBjb2x1bW5ObyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZSxcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsLFxuICAgICAgICAgICAgICAgIGNhbGxTdGFjazogZ2V0Q2FsbFN0YWNrXG4gICAgICAgICAgICAgICAgICAgID8gdHJhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgOiBcIlwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsQ29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBwYXJzaW5nIHRoZSBzY3JpcHQgY29udGV4dFwiLCBlLCBjYWxsU2l0ZSk7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlfY29udGV4dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBDb3VudGVyIHRvIGNhcCAjIG9mIGNhbGxzIGxvZ2dlZCBmb3IgZWFjaCBzY3JpcHQvYXBpIGNvbWJpbmF0aW9uXG4gICAgY29uc3QgbWF4TG9nQ291bnQgPSA1MDA7XG4gICAgY29uc3QgbG9nQ291bnRlciA9IG5ldyBPYmplY3QoKTtcbiAgICBmdW5jdGlvbiB1cGRhdGVDb3VudGVyQW5kQ2hlY2tJZk92ZXIoc2NyaXB0VXJsLCBzeW1ib2wpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gc2NyaXB0VXJsICsgXCJ8XCIgKyBzeW1ib2w7XG4gICAgICAgIGlmIChrZXkgaW4gbG9nQ291bnRlciAmJiBsb2dDb3VudGVyW2tleV0gPj0gbWF4TG9nQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEoa2V5IGluIGxvZ0NvdW50ZXIpKSB7XG4gICAgICAgICAgICBsb2dDb3VudGVyW2tleV0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nQ291bnRlcltrZXldICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IGxvZ2dpbmcgb2YgZ2V0cyBhcmlzaW5nIGZyb20gbG9nZ2luZ1xuICAgIGxldCBpbkxvZyA9IGZhbHNlO1xuICAgIC8vIFRvIGtlZXAgdHJhY2sgb2YgdGhlIG9yaWdpbmFsIG9yZGVyIG9mIGV2ZW50c1xuICAgIGxldCBvcmRpbmFsID0gMDtcbiAgICAvLyBGb3IgZ2V0cywgc2V0cywgZXRjLiBvbiBhIHNpbmdsZSB2YWx1ZVxuICAgIGZ1bmN0aW9uIGxvZ1ZhbHVlKGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSwgdmFsdWUsIG9wZXJhdGlvbiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIGlmIChpbkxvZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgb3ZlckxpbWl0ID0gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKGNhbGxDb250ZXh0LnNjcmlwdFVybCwgaW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lKTtcbiAgICAgICAgaWYgKG92ZXJMaW1pdCkge1xuICAgICAgICAgICAgaW5Mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgICAgICBvcGVyYXRpb24sXG4gICAgICAgICAgICBzeW1ib2w6IGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBzZXJpYWxpemVPYmplY3QodmFsdWUsICEhbG9nU2V0dGluZ3MubG9nRnVuY3Rpb25zQXNTdHJpbmdzKSxcbiAgICAgICAgICAgIHNjcmlwdFVybDogY2FsbENvbnRleHQuc2NyaXB0VXJsLFxuICAgICAgICAgICAgc2NyaXB0TGluZTogY2FsbENvbnRleHQuc2NyaXB0TGluZSxcbiAgICAgICAgICAgIHNjcmlwdENvbDogY2FsbENvbnRleHQuc2NyaXB0Q29sLFxuICAgICAgICAgICAgZnVuY05hbWU6IGNhbGxDb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICAgICAgc2NyaXB0TG9jRXZhbDogY2FsbENvbnRleHQuc2NyaXB0TG9jRXZhbCxcbiAgICAgICAgICAgIGNhbGxTdGFjazogY2FsbENvbnRleHQuY2FsbFN0YWNrLFxuICAgICAgICAgICAgb3JkaW5hbDogb3JkaW5hbCsrLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2VuZChcImxvZ1ZhbHVlXCIsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFVuc3VjY2Vzc2Z1bCB2YWx1ZSBsb2chXCIpO1xuICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIEZvciBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBsb2dDYWxsKGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSwgYXJncywgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIGlmIChpbkxvZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgb3ZlckxpbWl0ID0gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKGNhbGxDb250ZXh0LnNjcmlwdFVybCwgaW5zdHJ1bWVudGVkRnVuY3Rpb25OYW1lKTtcbiAgICAgICAgaWYgKG92ZXJMaW1pdCkge1xuICAgICAgICAgICAgaW5Mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ29udmVydCBzcGVjaWFsIGFyZ3VtZW50cyBhcnJheSB0byBhIHN0YW5kYXJkIGFycmF5IGZvciBKU09OaWZ5aW5nXG4gICAgICAgICAgICBjb25zdCBzZXJpYWxBcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxBcmdzLnB1c2goc2VyaWFsaXplT2JqZWN0KGFyZ3NbaV0sICEhbG9nU2V0dGluZ3MubG9nRnVuY3Rpb25zQXNTdHJpbmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiBcImNhbGxcIixcbiAgICAgICAgICAgICAgICBzeW1ib2w6IGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBzZXJpYWxBcmdzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHNjcmlwdFVybDogY2FsbENvbnRleHQuc2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHNjcmlwdExpbmU6IGNhbGxDb250ZXh0LnNjcmlwdExpbmUsXG4gICAgICAgICAgICAgICAgc2NyaXB0Q29sOiBjYWxsQ29udGV4dC5zY3JpcHRDb2wsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IGNhbGxDb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWw6IGNhbGxDb250ZXh0LnNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICAgICAgY2FsbFN0YWNrOiBjYWxsQ29udGV4dC5jYWxsU3RhY2ssXG4gICAgICAgICAgICAgICAgb3JkaW5hbDogb3JkaW5hbCsrLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbmQoXCJsb2dDYWxsXCIsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFVuc3VjY2Vzc2Z1bCBjYWxsIGxvZzogXCIgKyBpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUpO1xuICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJvdWdoIGltcGxlbWVudGF0aW9ucyBvZiBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yIGFuZCBPYmplY3QuZ2V0UHJvcGVydHlOYW1lc1xuICAgIC8vIFNlZSBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmV4dGVuZGVkX29iamVjdF9hcGlcbiAgICBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKHN1YmplY3QsIG5hbWUpIHtcbiAgICAgICAgbGV0IHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzdWJqZWN0LCBuYW1lKTtcbiAgICAgICAgbGV0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHN1YmplY3QpO1xuICAgICAgICB3aGlsZSAocGQgPT09IHVuZGVmaW5lZCAmJiBwcm90byAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKTtcbiAgICAgICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGQ7XG4gICAgfTtcbiAgICBPYmplY3QuZ2V0UHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN1YmplY3QpO1xuICAgICAgICBsZXQgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3ViamVjdCk7XG4gICAgICAgIHdoaWxlIChwcm90byAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pKTtcbiAgICAgICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGSVhNRTogcmVtb3ZlIGR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lcyBmcm9tIHByb3BzXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9O1xuICAgIC8qXG4gICAgICogIERpcmVjdCBpbnN0cnVtZW50YXRpb24gb2YgamF2YXNjcmlwdCBvYmplY3RzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNPYmplY3Qob2JqZWN0LCBwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvcGVydHkgPSBvYmplY3RbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIG51bGwgaXMgdHlwZSBcIm9iamVjdFwiXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9wZXJ0eSA9PT0gXCJvYmplY3RcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5zdHJ1bWVudE9iamVjdChvYmplY3QsIG9iamVjdE5hbWUsIGxvZ1NldHRpbmdzID0ge30pIHtcbiAgICAgICAgLy8gVXNlIGZvciBvYmplY3RzIG9yIG9iamVjdCBwcm90b3R5cGVzXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFBhcmFtZXRlcnNcbiAgICAgICAgLy8gLS0tLS0tLS0tLVxuICAgICAgICAvLyAgIG9iamVjdCA6IE9iamVjdFxuICAgICAgICAvLyAgICAgT2JqZWN0IHRvIGluc3RydW1lbnRcbiAgICAgICAgLy8gICBvYmplY3ROYW1lIDogU3RyaW5nXG4gICAgICAgIC8vICAgICBOYW1lIG9mIHRoZSBvYmplY3QgdG8gYmUgaW5zdHJ1bWVudGVkIChzYXZlZCB0byBkYXRhYmFzZSlcbiAgICAgICAgLy8gICBsb2dTZXR0aW5ncyA6IE9iamVjdFxuICAgICAgICAvLyAgICAgKG9wdGlvbmFsKSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgbG9nZ2luZ1xuICAgICAgICAvLyAgICAgY29uZmlndXJhdGlvbnMuIFNlZSBhdmFpbGFibGUgb3B0aW9ucyBiZWxvdy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gbG9nU2V0dGluZ3Mgb3B0aW9ucyAoYWxsIG9wdGlvbmFsKVxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vICAgcHJvcGVydGllc1RvSW5zdHJ1bWVudCA6IEFycmF5XG4gICAgICAgIC8vICAgICBBbiBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIGluc3RydW1lbnQgb24gdGhpcyBvYmplY3QuIERlZmF1bHQgaXNcbiAgICAgICAgLy8gICAgIGFsbCBwcm9wZXJ0aWVzLlxuICAgICAgICAvLyAgIGV4Y2x1ZGVkUHJvcGVydGllcyA6IEFycmF5XG4gICAgICAgIC8vICAgICBQcm9wZXJ0aWVzIGV4Y2x1ZGVkIGZyb20gaW5zdHJ1bWVudGF0aW9uLiBEZWZhdWx0IGlzIGFuIGVtcHR5XG4gICAgICAgIC8vICAgICBhcnJheS5cbiAgICAgICAgLy8gICBsb2dDYWxsU3RhY2sgOiBib29sZWFuXG4gICAgICAgIC8vICAgICBTZXQgdG8gdHJ1ZSBzYXZlIHRoZSBjYWxsIHN0YWNrIGluZm8gd2l0aCBlYWNoIHByb3BlcnR5IGNhbGwuXG4gICAgICAgIC8vICAgICBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gICAgICAgIC8vICAgbG9nRnVuY3Rpb25zQXNTdHJpbmdzIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIHRydWUgdG8gc2F2ZSBmdW5jdGlvbmFsIGFyZ3VtZW50cyBhcyBzdHJpbmdzIGR1cmluZ1xuICAgICAgICAvLyAgICAgYXJndW1lbnQgc2VyaWFsaXphdGlvbi4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuICAgICAgICAvLyAgIHByZXZlbnRTZXRzIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIHRydWUgdG8gcHJldmVudCBuZXN0ZWQgb2JqZWN0cyBhbmQgZnVuY3Rpb25zIGZyb20gYmVpbmdcbiAgICAgICAgLy8gICAgIG92ZXJ3cml0dGVuIChhbmQgdGh1cyBoYXZpbmcgdGhlaXIgaW5zdHJ1bWVudGF0aW9uIHJlbW92ZWQpLlxuICAgICAgICAvLyAgICAgT3RoZXIgcHJvcGVydGllcyAoc3RhdGljIHZhbHVlcykgY2FuIHN0aWxsIGJlIHNldCB3aXRoIHRoaXMgaXNcbiAgICAgICAgLy8gICAgIGVuYWJsZWQuIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAgICAgICAgLy8gICByZWN1cnNpdmUgOiBib29sZWFuXG4gICAgICAgIC8vICAgICBTZXQgdG8gYHRydWVgIHRvIHJlY3Vyc2l2ZWx5IGluc3RydW1lbnQgYWxsIG9iamVjdCBwcm9wZXJ0aWVzIG9mXG4gICAgICAgIC8vICAgICB0aGUgZ2l2ZW4gYG9iamVjdGAuIERlZmF1bHQgaXMgYGZhbHNlYFxuICAgICAgICAvLyAgICAgTk9URTpcbiAgICAgICAgLy8gICAgICAgKDEpYGxvZ1NldHRpbmdzWydwcm9wZXJ0aWVzVG9JbnN0cnVtZW50J11gIGRvZXMgbm90IHByb3BhZ2F0ZVxuICAgICAgICAvLyAgICAgICAgICAgdG8gc3ViLW9iamVjdHMuXG4gICAgICAgIC8vICAgICAgICgyKSBTdWItb2JqZWN0cyBvZiBwcm90b3R5cGVzIGNhbiBub3QgYmUgaW5zdHJ1bWVudGVkXG4gICAgICAgIC8vICAgICAgICAgICByZWN1cnNpdmVseSBhcyB0aGVzZSBwcm9wZXJ0aWVzIGNhbiBub3QgYmUgYWNjZXNzZWRcbiAgICAgICAgLy8gICAgICAgICAgIHVudGlsIGFuIGluc3RhbmNlIG9mIHRoZSBwcm90b3R5cGUgaXMgY3JlYXRlZC5cbiAgICAgICAgLy8gICBkZXB0aCA6IGludGVnZXJcbiAgICAgICAgLy8gICAgIFJlY3Vyc2lvbiBsaW1pdCB3aGVuIGluc3RydW1lbnRpbmcgb2JqZWN0IHJlY3Vyc2l2ZWx5LlxuICAgICAgICAvLyAgICAgRGVmYXVsdCBpcyBgNWAuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBsb2dTZXR0aW5ncy5wcm9wZXJ0aWVzVG9JbnN0cnVtZW50XG4gICAgICAgICAgICA/IGxvZ1NldHRpbmdzLnByb3BlcnRpZXNUb0luc3RydW1lbnRcbiAgICAgICAgICAgIDogT2JqZWN0LmdldFByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzICYmXG4gICAgICAgICAgICAgICAgbG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcGVydGllc1tpXSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgYHJlY3Vyc2l2ZWAgZmxhZyBzZXQgd2Ugd2FudCB0byByZWN1cnNpdmVseSBpbnN0cnVtZW50IGFueVxuICAgICAgICAgICAgLy8gb2JqZWN0IHByb3BlcnRpZXMgdGhhdCBhcmVuJ3QgdGhlIHByb3RvdHlwZSBvYmplY3QuIE9ubHkgcmVjdXJzZSBpZlxuICAgICAgICAgICAgLy8gZGVwdGggbm90IHNldCAoYXQgd2hpY2ggcG9pbnQgaXRzIHNldCB0byBkZWZhdWx0KSBvciBub3QgYXQgbGltaXQuXG4gICAgICAgICAgICBpZiAoISFsb2dTZXR0aW5ncy5yZWN1cnNpdmUgJiZcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2ldICE9PSBcIl9fcHJvdG9fX1wiICYmXG4gICAgICAgICAgICAgICAgaXNPYmplY3Qob2JqZWN0LCBwcm9wZXJ0aWVzW2ldKSAmJlxuICAgICAgICAgICAgICAgICghKFwiZGVwdGhcIiBpbiBsb2dTZXR0aW5ncykgfHwgbG9nU2V0dGluZ3MuZGVwdGggPiAwKSkge1xuICAgICAgICAgICAgICAgIC8vIHNldCByZWN1cnNpb24gbGltaXQgdG8gZGVmYXVsdCBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAgaWYgKCEoXCJkZXB0aFwiIGluIGxvZ1NldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dTZXR0aW5ncy5kZXB0aCA9IDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3Qob2JqZWN0W3Byb3BlcnRpZXNbaV1dLCBvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0aWVzW2ldLCB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVkUHJvcGVydGllczogbG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBsb2dDYWxsU3RhY2s6IGxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayxcbiAgICAgICAgICAgICAgICAgICAgbG9nRnVuY3Rpb25zQXNTdHJpbmdzOiBsb2dTZXR0aW5ncy5sb2dGdW5jdGlvbnNBc1N0cmluZ3MsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRTZXRzOiBsb2dTZXR0aW5ncy5wcmV2ZW50U2V0cyxcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlOiBsb2dTZXR0aW5ncy5yZWN1cnNpdmUsXG4gICAgICAgICAgICAgICAgICAgIGRlcHRoOiBsb2dTZXR0aW5ncy5kZXB0aCAtIDEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShvYmplY3QsIG9iamVjdE5hbWUsIHByb3BlcnRpZXNbaV0sIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGVzdGluZykge1xuICAgICAgICB3aW5kb3cuaW5zdHJ1bWVudE9iamVjdCA9IGluc3RydW1lbnRPYmplY3Q7XG4gICAgfVxuICAgIC8vIExvZyBjYWxscyB0byBhIGdpdmVuIGZ1bmN0aW9uXG4gICAgLy8gVGhpcyBoZWxwZXIgZnVuY3Rpb24gcmV0dXJucyBhIHdyYXBwZXIgYXJvdW5kIGBmdW5jYCB3aGljaCBsb2dzIGNhbGxzXG4gICAgLy8gdG8gYGZ1bmNgLiBgb2JqZWN0TmFtZWAgYW5kIGBtZXRob2ROYW1lYCBhcmUgdXNlZCBzdHJpY3RseSB0byBpZGVudGlmeVxuICAgIC8vIHdoaWNoIG9iamVjdCBtZXRob2QgYGZ1bmNgIGlzIGNvbWluZyBmcm9tIGluIHRoZSBsb2dzXG4gICAgZnVuY3Rpb24gaW5zdHJ1bWVudEZ1bmN0aW9uKG9iamVjdE5hbWUsIG1ldGhvZE5hbWUsIGZ1bmMsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dCghIWxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayk7XG4gICAgICAgICAgICBsb2dDYWxsKG9iamVjdE5hbWUgKyBcIi5cIiArIG1ldGhvZE5hbWUsIGFyZ3VtZW50cywgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIExvZyBwcm9wZXJ0aWVzIG9mIHByb3RvdHlwZXMgYW5kIG9iamVjdHNcbiAgICBmdW5jdGlvbiBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkob2JqZWN0LCBvYmplY3ROYW1lLCBwcm9wZXJ0eU5hbWUsIGxvZ1NldHRpbmdzID0ge30pIHtcbiAgICAgICAgLy8gU3RvcmUgb3JpZ2luYWwgZGVzY3JpcHRvciBpbiBjbG9zdXJlXG4gICAgICAgIGNvbnN0IHByb3BEZXNjID0gT2JqZWN0LmdldFByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIGlmICghcHJvcERlc2MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBkZXNjcmlwdG9yIG5vdCBmb3VuZCBmb3JcIiwgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lLCBvYmplY3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluc3RydW1lbnQgZGF0YSBvciBhY2Nlc3NvciBwcm9wZXJ0eSBkZXNjcmlwdG9yc1xuICAgICAgICBjb25zdCBvcmlnaW5hbEdldHRlciA9IHByb3BEZXNjLmdldDtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxTZXR0ZXIgPSBwcm9wRGVzYy5zZXQ7XG4gICAgICAgIGxldCBvcmlnaW5hbFZhbHVlID0gcHJvcERlc2MudmFsdWU7XG4gICAgICAgIC8vIFdlIG92ZXJ3cml0ZSBib3RoIGRhdGEgYW5kIGFjY2Vzc29yIHByb3BlcnRpZXMgYXMgYW4gaW5zdHJ1bWVudGVkXG4gICAgICAgIC8vIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5TmFtZSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcmlnUHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0gZ2V0T3JpZ2luYXRpbmdTY3JpcHRDb250ZXh0KCEhbG9nU2V0dGluZ3MubG9nQ2FsbFN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9yaWdpbmFsIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbEdldHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWNjZXNzb3IgcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdQcm9wZXJ0eSA9IG9yaWdpbmFsR2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIHByb3BEZXNjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBkYXRhIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnUHJvcGVydHkgPSBvcmlnaW5hbFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb3BlcnR5IGRlc2NyaXB0b3IgZm9yXCIsIG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgXCJkb2Vzbid0IGhhdmUgZ2V0dGVyIG9yIHZhbHVlP1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgXCJcIiwgXCJnZXQoZmFpbGVkKVwiLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIExvZyBgZ2V0c2AgZXhjZXB0IHRob3NlIHRoYXQgaGF2ZSBpbnN0cnVtZW50ZWQgcmV0dXJuIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAvLyAqIEFsbCByZXR1cm5lZCBmdW5jdGlvbnMgYXJlIGluc3RydW1lbnRlZCB3aXRoIGEgd3JhcHBlclxuICAgICAgICAgICAgICAgICAgICAvLyAqIFJldHVybmVkIG9iamVjdHMgbWF5IGJlIGluc3RydW1lbnRlZCBpZiByZWN1cnNpdmVcbiAgICAgICAgICAgICAgICAgICAgLy8gICBpbnN0cnVtZW50YXRpb24gaXMgZW5hYmxlZCBhbmQgdGhpcyBpc24ndCBhdCB0aGUgZGVwdGggbGltaXQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3JpZ1Byb3BlcnR5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0cnVtZW50RnVuY3Rpb24ob2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lLCBvcmlnUHJvcGVydHksIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3JpZ1Byb3BlcnR5ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhIWxvZ1NldHRpbmdzLnJlY3Vyc2l2ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKCEoXCJkZXB0aFwiIGluIGxvZ1NldHRpbmdzKSB8fCBsb2dTZXR0aW5ncy5kZXB0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCBvcmlnUHJvcGVydHksIFwiZ2V0XCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICBzZXQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dCghIWxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBzZXRzIGZvciBmdW5jdGlvbnMgYW5kIG9iamVjdHMgaWYgZW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoISFsb2dTZXR0aW5ncy5wcmV2ZW50U2V0cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBvcmlnaW5hbFZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb3JpZ2luYWxWYWx1ZSA9PT0gXCJvYmplY3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgdmFsdWUsIFwic2V0KHByZXZlbnRlZClcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHZhbHVlIHRvIG9yaWdpbmFsIHNldHRlci9sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG9yaWdpbmFsU2V0dGVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidmFsdWVcIiBpbiBwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5Mb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdC5pc1Byb3RvdHlwZU9mKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb3BlcnR5IGRlc2NyaXB0b3IgZm9yXCIsIG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgXCJkb2Vzbid0IGhhdmUgc2V0dGVyIG9yIHZhbHVlP1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgdmFsdWUsIFwic2V0KGZhaWxlZClcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBsb2cgc2V0XG4gICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgdmFsdWUsIFwic2V0XCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBuZXcgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlYmlkLmpzXG4gICAgICovXG4gICAgLy8gV2FpdCBmb3Igd2luZG93LnBianMgdG8gYmUgYXZhaWxhYmxlXG4gICAgY29uc3QgcHJlYmlkSnNBdmFpbGFibGUgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBmdW5jdGlvbiBjaGVjaygpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93LnBianMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gS2VlcCBjaGVja2luZyBmb3IgMTAgc2Vjb25kc1xuICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gbm93IDwgMTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVjaywgMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdG9wcGVkIGNoZWNraW5nIGZvciBQcmViaWQuanMgbG9hZGluZyBvbiB0aGlzIHBhZ2UgKDEwcyBoYXZlIHBhc3NlZClcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrKCk7XG4gICAgfSk7XG4gICAgcHJlYmlkSnNBdmFpbGFibGUudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJlYmlzLmpzIGF2YWlsYWJsZSAtIGluc3RydW1lbnRpbmcuLi5cIik7XG4gICAgICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LnBianMsIFwicGJqc1wiLCB7fSk7XG4gICAgfSk7XG4gICAgLy8gVE9ETyBpbnN0cnVtZW50IHByZWJpZC5qcyBldmVudHNcbiAgICAvL1xuICAgIC8qXG4gICAgICogU3RhcnQgSW5zdHJ1bWVudGF0aW9uXG4gICAgICovXG4gICAgLy8gVE9ETzogdXNlciBzaG91bGQgYmUgYWJsZSB0byBjaG9vc2Ugd2hhdCB0byBpbnN0cnVtZW50XG4gICAgLypcbiAgICAvLyBBY2Nlc3MgdG8gbmF2aWdhdG9yIHByb3BlcnRpZXNcbiAgICBjb25zdCBuYXZpZ2F0b3JQcm9wZXJ0aWVzID0gW1xuICAgICAgXCJhcHBDb2RlTmFtZVwiLFxuICAgICAgXCJhcHBOYW1lXCIsXG4gICAgICBcImFwcFZlcnNpb25cIixcbiAgICAgIFwiYnVpbGRJRFwiLFxuICAgICAgXCJjb29raWVFbmFibGVkXCIsXG4gICAgICBcImRvTm90VHJhY2tcIixcbiAgICAgIFwiZ2VvbG9jYXRpb25cIixcbiAgICAgIFwibGFuZ3VhZ2VcIixcbiAgICAgIFwibGFuZ3VhZ2VzXCIsXG4gICAgICBcIm9uTGluZVwiLFxuICAgICAgXCJvc2NwdVwiLFxuICAgICAgXCJwbGF0Zm9ybVwiLFxuICAgICAgXCJwcm9kdWN0XCIsXG4gICAgICBcInByb2R1Y3RTdWJcIixcbiAgICAgIFwidXNlckFnZW50XCIsXG4gICAgICBcInZlbmRvclN1YlwiLFxuICAgICAgXCJ2ZW5kb3JcIixcbiAgICBdO1xuICAgIG5hdmlnYXRvclByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5uYXZpZ2F0b3IsIFwid2luZG93Lm5hdmlnYXRvclwiLCBwcm9wZXJ0eSk7XG4gICAgfSk7XG4gIFxuICAgIC8vIEFjY2VzcyB0byBzY3JlZW4gcHJvcGVydGllc1xuICAgIC8vIGluc3RydW1lbnRPYmplY3Qod2luZG93LnNjcmVlbiwgXCJ3aW5kb3cuc2NyZWVuXCIpO1xuICAgIC8vIFRPRE86IHdoeSBkbyB3ZSBpbnN0cnVtZW50IG9ubHkgdHdvIHNjcmVlbiBwcm9wZXJ0aWVzXG4gICAgY29uc3Qgc2NyZWVuUHJvcGVydGllcyA9IFtcInBpeGVsRGVwdGhcIiwgXCJjb2xvckRlcHRoXCJdO1xuICAgIHNjcmVlblByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5zY3JlZW4sIFwid2luZG93LnNjcmVlblwiLCBwcm9wZXJ0eSk7XG4gICAgfSk7XG4gIFxuICAgIC8vIEFjY2VzcyB0byBwbHVnaW5zXG4gICAgY29uc3QgcGx1Z2luUHJvcGVydGllcyA9IFtcbiAgICAgIFwibmFtZVwiLFxuICAgICAgXCJmaWxlbmFtZVwiLFxuICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgXCJ2ZXJzaW9uXCIsXG4gICAgICBcImxlbmd0aFwiLFxuICAgIF07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBsdWdpbk5hbWUgPSB3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnNbaV0ubmFtZTtcbiAgICAgIHBsdWdpblByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkoXG4gICAgICAgICAgd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW3BsdWdpbk5hbWVdLFxuICAgICAgICAgIFwid2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW1wiICsgcGx1Z2luTmFtZSArIFwiXVwiLFxuICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICBcbiAgICAvLyBBY2Nlc3MgdG8gTUlNRVR5cGVzXG4gICAgY29uc3QgbWltZVR5cGVQcm9wZXJ0aWVzID0gW1wiZGVzY3JpcHRpb25cIiwgXCJzdWZmaXhlc1wiLCBcInR5cGVcIl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWltZVR5cGVOYW1lID0gKCh3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1tcbiAgICAgICAgaVxuICAgICAgXSBhcyB1bmtub3duKSBhcyBNaW1lVHlwZSkudHlwZTsgLy8gbm90ZTogdXBzdHJlYW0gdHlwaW5ncyBzZWVtcyB0byBiZSBpbmNvcnJlY3RcbiAgICAgIG1pbWVUeXBlUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShcbiAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1ttaW1lVHlwZU5hbWVdLFxuICAgICAgICAgIFwid2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXNbXCIgKyBtaW1lVHlwZU5hbWUgKyBcIl1cIixcbiAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBOYW1lLCBsb2NhbFN0b3JhZ2UsIGFuZCBzZXNzaW9uc1N0b3JhZ2UgbG9nZ2luZ1xuICAgIC8vIEluc3RydW1lbnRpbmcgd2luZG93LmxvY2FsU3RvcmFnZSBkaXJlY3RseSBkb2Vzbid0IHNlZW0gdG8gd29yaywgc28gdGhlIFN0b3JhZ2VcbiAgICAvLyBwcm90b3R5cGUgbXVzdCBiZSBpbnN0cnVtZW50ZWQgaW5zdGVhZC4gVW5mb3J0dW5hdGVseSB0aGlzIGZhaWxzIHRvIGRpZmZlcmVudGlhdGVcbiAgICAvLyBiZXR3ZWVuIHNlc3Npb25TdG9yYWdlIGFuZCBsb2NhbFN0b3JhZ2UuIEluc3RlYWQsIHlvdSdsbCBoYXZlIHRvIGxvb2sgZm9yIGEgc2VxdWVuY2VcbiAgICAvLyBvZiBhIGdldCBmb3IgdGhlIGxvY2FsU3RvcmFnZSBvYmplY3QgZm9sbG93ZWQgYnkgYSBnZXRJdGVtL3NldEl0ZW0gZm9yIHRoZSBTdG9yYWdlIG9iamVjdC5cbiAgICBjb25zdCB3aW5kb3dQcm9wZXJ0aWVzID0gW1wibmFtZVwiLCBcImxvY2FsU3RvcmFnZVwiLCBcInNlc3Npb25TdG9yYWdlXCJdO1xuICAgIHdpbmRvd1Byb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdywgXCJ3aW5kb3dcIiwgcHJvcGVydHkpO1xuICAgIH0pO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LlN0b3JhZ2UucHJvdG90eXBlLCBcIndpbmRvdy5TdG9yYWdlXCIpO1xuICBcbiAgICAvLyBBY2Nlc3MgdG8gZG9jdW1lbnQuY29va2llXG4gICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5kb2N1bWVudCwgXCJ3aW5kb3cuZG9jdW1lbnRcIiwgXCJjb29raWVcIiwge1xuICAgICAgbG9nQ2FsbFN0YWNrOiB0cnVlLFxuICAgIH0pO1xuICBcbiAgICAvLyBBY2Nlc3MgdG8gZG9jdW1lbnQucmVmZXJyZXJcbiAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkod2luZG93LmRvY3VtZW50LCBcIndpbmRvdy5kb2N1bWVudFwiLCBcInJlZmVycmVyXCIsIHtcbiAgICAgIGxvZ0NhbGxTdGFjazogdHJ1ZSxcbiAgICB9KTtcbiAgXG4gICAgLy8gQWNjZXNzIHRvIGNhbnZhc1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZSwgXCJIVE1MQ2FudmFzRWxlbWVudFwiKTtcbiAgXG4gICAgY29uc3QgZXhjbHVkZWRQcm9wZXJ0aWVzID0gW1xuICAgICAgXCJxdWFkcmF0aWNDdXJ2ZVRvXCIsXG4gICAgICBcImxpbmVUb1wiLFxuICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgIFwiZ2xvYmFsQWxwaGFcIixcbiAgICAgIFwibW92ZVRvXCIsXG4gICAgICBcImRyYXdJbWFnZVwiLFxuICAgICAgXCJzZXRUcmFuc2Zvcm1cIixcbiAgICAgIFwiY2xlYXJSZWN0XCIsXG4gICAgICBcImNsb3NlUGF0aFwiLFxuICAgICAgXCJiZWdpblBhdGhcIixcbiAgICAgIFwiY2FudmFzXCIsXG4gICAgICBcInRyYW5zbGF0ZVwiLFxuICAgIF07XG4gICAgaW5zdHJ1bWVudE9iamVjdChcbiAgICAgIHdpbmRvdy5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLFxuICAgICAgXCJDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcIixcbiAgICAgIHsgZXhjbHVkZWRQcm9wZXJ0aWVzIH0sXG4gICAgKTtcbiAgXG4gICAgLy8gQWNjZXNzIHRvIHdlYlJUQ1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgXCJSVENQZWVyQ29ubmVjdGlvblwiKTtcbiAgXG4gICAgLy8gQWNjZXNzIHRvIEF1ZGlvIEFQSVxuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkF1ZGlvQ29udGV4dC5wcm90b3R5cGUsIFwiQXVkaW9Db250ZXh0XCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93Lk9mZmxpbmVBdWRpb0NvbnRleHQucHJvdG90eXBlLCBcIk9mZmxpbmVBdWRpb0NvbnRleHRcIik7XG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuT3NjaWxsYXRvck5vZGUucHJvdG90eXBlLCBcIk9zY2lsbGF0b3JOb2RlXCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkFuYWx5c2VyTm9kZS5wcm90b3R5cGUsIFwiQW5hbHlzZXJOb2RlXCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkdhaW5Ob2RlLnByb3RvdHlwZSwgXCJHYWluTm9kZVwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5TY3JpcHRQcm9jZXNzb3JOb2RlLnByb3RvdHlwZSwgXCJTY3JpcHRQcm9jZXNzb3JOb2RlXCIpO1xuICAgICovXG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBDb250ZW50LXNpZGUgamF2YXNjcmlwdCBpbnN0cnVtZW50YXRpb24gc3RhcnRlZFwiLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhbUYyWVhOamNtbHdkQzFwYm5OMGNuVnRaVzUwTFhCaFoyVXRjMk52Y0dVdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdlkyOXVkR1Z1ZEM5cVlYWmhjMk55YVhCMExXbHVjM1J5ZFcxbGJuUXRjR0ZuWlMxelkyOXdaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeHBSVUZCYVVVN1FVRkRha1VzYjBaQlFXOUdPMEZCWjBKd1JpeE5RVUZOTEVOQlFVTXNUVUZCVFN4VlFVRlZMRWRCUVVjN1NVRkRlRUlzZVVKQlFYbENPMGxCUTNwQ0xGTkJRVk1zVVVGQlVTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhIUVVGSExFdEJRVXM3VVVGRE4wTXNTVUZCU1N4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFRRVUZUTEVWQlFVVXNUVUZCVFN4RFFVRkRPMUZCUlRsRExFMUJRVTBzUzBGQlN5eEhRVUZITzFsQlExb3NUVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEZOQlFWTXNRMEZCUXp0WlFVTndReXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVWQlFVVTdaMEpCUTJZc1QwRkJUeXhIUVVGSExGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRE8yRkJRekZETzJsQ1FVRk5PMmRDUVVOTUxFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTTdaMEpCUTJZc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlJUdHZRa0ZEWkN4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN2IwSkJRMjVETEU5QlFVOHNSMEZCUnl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE8ybENRVU4yUWp0aFFVTkdPMUZCUTBnc1EwRkJReXhEUVVGRE8xRkJSVVlzVDBGQlR6dFpRVU5NTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNN1dVRkRaaXhKUVVGSkxFZEJRVWNzVTBGQlV5eERRVUZETzFsQlEycENMRk5CUVZNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTTdXVUZEZGtJc1RVRkJUU3hQUVVGUExFZEJRVWNzVTBGQlV5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMWxCUTNSRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVTdaMEpCUTFvc1QwRkJUeXhIUVVGSExGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1lVRkRia003V1VGRFJDeEpRVUZKTEU5QlFVOHNSVUZCUlR0blFrRkRXQ3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03WjBKQlEyNURMRTlCUVU4c1IwRkJSeXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETzJGQlEzWkNPMWxCUlVRc1QwRkJUeXhOUVVGTkxFTkJRVU03VVVGRGFFSXNRMEZCUXl4RFFVRkRPMGxCUTBvc1EwRkJRenRKUVVORUxHdENRVUZyUWp0SlFVVnNRaXdyUWtGQkswSTdTVUZETDBJc1RVRkJUU3hKUVVGSkxFZEJRVWNzUTBGQlF6dFJRVU5hTEVsQlFVa3NVVUZCVVN4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOc1FpeHRRMEZCYlVNN1VVRkRia01zVFVGQlRTeExRVUZMTEVkQlFVY3NVVUZCVVN4RFFVRkRPMWxCUTNKQ0xGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlEzQkNMRWxCUVVrc1YwRkJWeXhEUVVGRExGRkJRVkVzUlVGQlJUdG5Ra0ZEZUVJc1RVRkJUU3hGUVVGRkxGRkJRVkU3WVVGRGFrSXNRMEZCUXl4RFFVTklMRU5CUVVNN1dVRkZSaXhyUWtGQmEwSTdXVUZEYkVJc1VVRkJVU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU5vUWl4RFFVRkRMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRlVpeFBRVUZQTEZWQlFWTXNUMEZCVHl4RlFVRkZMRWRCUVVjN1dVRkRNVUlzYjBKQlFXOUNPMWxCUTNCQ0xGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXk5RExFdEJRVXNzUlVGQlJTeERRVUZETzFGQlExWXNRMEZCUXl4RFFVRkRPMGxCUTBvc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF6dEpRVVZNTEUxQlFVMHNVVUZCVVN4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zV1VGQldTeERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMGxCUlhSRk96dFBRVVZITzBsQlJVZ3NUVUZCVFN4UFFVRlBMRWRCUTFnc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eFpRVUZaTEVOQlFVTXNZMEZCWXl4RFFVRkRMRXRCUVVzc1RVRkJUU3hEUVVGRE8wbEJRMnBGTEVsQlFVa3NUMEZCVHl4RlFVRkZPMUZCUTFnc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5dzJRa0ZCTmtJc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dExRVU55UkR0SlFVVkVMRGhEUVVFNFF6dEpRVU01UXl4VFFVRlRMRzFDUVVGdFFpeERRVUZETEU5QlFVOHNSVUZCUlN4alFVRmpMRWRCUVVjc1MwRkJTenRSUVVNeFJDeEpRVUZKTEU5QlFVOHNTMEZCU3l4UlFVRlJMRU5CUVVNc1NVRkJTU3hGUVVGRk8xbEJRemRDTEU5QlFVOHNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJRenRUUVVONFFqdFJRVU5FTEVsQlFVa3NUMEZCVHl4RFFVRkRMRlZCUVZVc1MwRkJTeXhKUVVGSkxFVkJRVVU3V1VGREwwSXNUMEZCVHl4UFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF6dFRRVU5zUXp0UlFVVkVMRWxCUVVrc1dVRkJXU3hIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU55UWl4TlFVRk5MRkZCUVZFc1IwRkJSeXhQUVVGUExFTkJRVU1zVlVGQlZTeERRVUZETEZWQlFWVXNRMEZCUXp0UlFVTXZReXhMUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1VVRkJVU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0WlFVTjRReXhOUVVGTkxFOUJRVThzUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkROVUlzU1VGQlNTeFBRVUZQTEV0QlFVc3NUMEZCVHl4RlFVRkZPMmRDUVVOMlFpeEpRVUZKTEVsQlFVa3NSMEZCUnl4dFFrRkJiVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCVlN4RlFVRkZMR05CUVdNc1EwRkJReXhEUVVGRE8yZENRVU51UlN4SlFVRkpMRWxCUVVrc1IwRkJSeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEVkQlFVY3NSMEZCUnl4SFFVRkhMRmxCUVZrc1EwRkJRenRuUWtGRGJrUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETzJkQ1FVTjZRaXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNN1owSkJRMmhETEVsQlFVa3NZMEZCWXl4RlFVRkZPMjlDUVVOc1FpeEpRVUZKTEVsQlFVa3NSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03YjBKQlF6ZENMRWxCUVVrc1NVRkJTU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNN2IwSkJRM0JETEVsQlFVa3NTVUZCU1N4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eFZRVUZWTEVOQlFVTTdhVUpCUTNoRE8yZENRVU5FTEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1MwRkJTeXhIUVVGSExFVkJRVVU3YjBKQlF6TkNMRWxCUVVrc1NVRkJTU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXp0cFFrRkROVUk3WjBKQlEwUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1EwRkJRenRuUWtGRFdpeFBRVUZQTEVsQlFVa3NRMEZCUXp0aFFVTmlPMWxCUTBRc1NVRkJTU3hQUVVGUExFTkJRVU1zVVVGQlVTeExRVUZMTEVOQlFVTXNTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhMUVVGTExFOUJRVThzUTBGQlF5eFBRVUZQTEVWQlFVVTdaMEpCUTJwRkxGbEJRVmtzUlVGQlJTeERRVUZETzJGQlEyaENPMU5CUTBZN1NVRkRTQ3hEUVVGRE8wbEJSVVFzWjBOQlFXZERPMGxCUTJoRExGTkJRVk1zWlVGQlpTeERRVUZETEUxQlFVMHNSVUZCUlN4clFrRkJhMElzUjBGQlJ5eExRVUZMTzFGQlEzcEVMRFJDUVVFMFFqdFJRVU0xUWl4SlFVRkpPMWxCUTBZc1NVRkJTU3hOUVVGTkxFdEJRVXNzU1VGQlNTeEZRVUZGTzJkQ1FVTnVRaXhQUVVGUExFMUJRVTBzUTBGQlF6dGhRVU5tTzFsQlEwUXNTVUZCU1N4UFFVRlBMRTFCUVUwc1MwRkJTeXhWUVVGVkxFVkJRVVU3WjBKQlEyaERMRWxCUVVrc2EwSkJRV3RDTEVWQlFVVTdiMEpCUTNSQ0xFOUJRVThzVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRPMmxDUVVNeFFqdHhRa0ZCVFR0dlFrRkRUQ3hQUVVGUExGVkJRVlVzUTBGQlF6dHBRa0ZEYmtJN1lVRkRSanRaUVVORUxFbEJRVWtzVDBGQlR5eE5RVUZOTEV0QlFVc3NVVUZCVVN4RlFVRkZPMmRDUVVNNVFpeFBRVUZQTEUxQlFVMHNRMEZCUXp0aFFVTm1PMWxCUTBRc1RVRkJUU3hYUVVGWExFZEJRVWNzUlVGQlJTeERRVUZETzFsQlEzWkNMRTlCUVU4c1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVXl4SFFVRkhMRVZCUVVVc1MwRkJTenRuUWtGREwwTXNTVUZCU1N4TFFVRkxMRXRCUVVzc1NVRkJTU3hGUVVGRk8yOUNRVU5zUWl4UFFVRlBMRTFCUVUwc1EwRkJRenRwUWtGRFpqdG5Ra0ZEUkN4SlFVRkpMRTlCUVU4c1MwRkJTeXhMUVVGTExGVkJRVlVzUlVGQlJUdHZRa0ZETDBJc1NVRkJTU3hyUWtGQmEwSXNSVUZCUlR0M1FrRkRkRUlzVDBGQlR5eExRVUZMTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNN2NVSkJRM3BDTzNsQ1FVRk5PM2RDUVVOTUxFOUJRVThzVlVGQlZTeERRVUZETzNGQ1FVTnVRanRwUWtGRFJqdG5Ra0ZEUkN4SlFVRkpMRTlCUVU4c1MwRkJTeXhMUVVGTExGRkJRVkVzUlVGQlJUdHZRa0ZETjBJc2NVTkJRWEZETzI5Q1FVTnlReXhKUVVGSkxHbENRVUZwUWl4SlFVRkpMRXRCUVVzc1JVRkJSVHQzUWtGRE9VSXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJReXhsUVVGbExFTkJRVU03Y1VKQlF5OUNPMjlDUVVWRUxIbENRVUY1UWp0dlFrRkRla0lzU1VGQlNTeExRVUZMTEZsQlFWa3NWMEZCVnl4RlFVRkZPM2RDUVVOb1F5eFBRVUZQTEcxQ1FVRnRRaXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzNGQ1FVTnVRenR2UWtGRlJDd3JRa0ZCSzBJN2IwSkJReTlDTEVsQlFVa3NSMEZCUnl4TFFVRkxMRVZCUVVVc1NVRkJTU3hYUVVGWExFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSVHQzUWtGRGFFUXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dDNRa0ZEZUVJc1QwRkJUeXhMUVVGTExFTkJRVU03Y1VKQlEyUTdlVUpCUVUwN2QwSkJRMHdzVDBGQlR5eFBRVUZQTEV0QlFVc3NRMEZCUXp0eFFrRkRja0k3YVVKQlEwWTdaMEpCUTBRc1QwRkJUeXhMUVVGTExFTkJRVU03V1VGRFppeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTktPMUZCUVVNc1QwRkJUeXhMUVVGTExFVkJRVVU3V1VGRFpDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMR2REUVVGblF5eEhRVUZITEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUTNSRUxFOUJRVThzZFVKQlFYVkNMRWRCUVVjc1MwRkJTeXhEUVVGRE8xTkJRM2hETzBsQlEwZ3NRMEZCUXp0SlFVVkVMRk5CUVZNc2FVSkJRV2xDTEVOQlFVTXNTMEZCU3p0UlFVTTVRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhWQ1FVRjFRaXhIUVVGSExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnNSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERCQ1FVRXdRaXhIUVVGSExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTjRSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERKQ1FVRXlRaXhIUVVGSExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVTXhSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERoQ1FVRTRRaXhIUVVGSExFdEJRVXNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UlFVTXZSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEhkQ1FVRjNRaXhIUVVGSExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0SlFVTjBSQ3hEUVVGRE8wbEJSVVFzZDBOQlFYZERPMGxCUTNoRExGTkJRVk1zWVVGQllUdFJRVU53UWl4SlFVRkpMRXRCUVVzc1EwRkJRenRSUVVWV0xFbEJRVWs3V1VGRFJpeE5RVUZOTEVsQlFVa3NTMEZCU3l4RlFVRkZMRU5CUVVNN1UwRkRia0k3VVVGQlF5eFBRVUZQTEVkQlFVY3NSVUZCUlR0WlFVTmFMRXRCUVVzc1IwRkJSeXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETzFOQlEyNUNPMUZCUlVRc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRFppeERRVUZETzBsQlJVUXNNRU5CUVRCRE8wbEJRekZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1RVRkJUU3hIUVVGSExGVkJRVk1zUjBGQlJ5eEZRVUZGTEZGQlFWRTdVVUZET1VNc1RVRkJUU3hMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVNNVFpeFBRVUZQTEZGQlFWRTdXVUZEWWl4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1dVRkRkRVVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0SlFVTmFMRU5CUVVNc1EwRkJRenRKUVVWR0xGTkJRVk1zTWtKQlFUSkNMRU5CUVVNc1dVRkJXU3hIUVVGSExFdEJRVXM3VVVGRGRrUXNUVUZCVFN4TFFVRkxMRWRCUVVjc1lVRkJZU3hGUVVGRk8yRkJRekZDTEVsQlFVa3NSVUZCUlR0aFFVTk9MRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU5tTEc5RVFVRnZSRHRSUVVOd1JDeE5RVUZOTEdGQlFXRXNSMEZCUnp0WlFVTndRaXhUUVVGVExFVkJRVVVzUlVGQlJUdFpRVU5pTEZWQlFWVXNSVUZCUlN4RlFVRkZPMWxCUTJRc1UwRkJVeXhGUVVGRkxFVkJRVVU3V1VGRFlpeFJRVUZSTEVWQlFVVXNSVUZCUlR0WlFVTmFMR0ZCUVdFc1JVRkJSU3hGUVVGRk8xbEJRMnBDTEZOQlFWTXNSVUZCUlN4RlFVRkZPMU5CUTJRc1EwRkJRenRSUVVOR0xFbEJRVWtzUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVN1dVRkRjRUlzVDBGQlR5eGhRVUZoTEVOQlFVTTdVMEZEZEVJN1VVRkRSQ3d3UlVGQk1FVTdVVUZETVVVc1RVRkJUU3hSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpGQ0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZEWWl4UFFVRlBMR0ZCUVdFc1EwRkJRenRUUVVOMFFqdFJRVU5FT3pzN096czdPenRYUVZGSE8xRkJRMGdzU1VGQlNUdFpRVU5HTEVsQlFVa3NVMEZCVXl4SFFVRkhMRVZCUVVVc1EwRkJRenRaUVVOdVFpeEpRVUZKTEdGQlFXRXNSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJReXcyUWtGQk5rSTdXVUZEY2tRc1RVRkJUU3hoUVVGaExFZEJRVWNzVVVGQlVTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVNeFF5eE5RVUZOTEZGQlFWRXNSMEZCUnl4aFFVRmhMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlEzaERMRTFCUVUwc1MwRkJTeXhIUVVGSExHRkJRV0VzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFsQlF6bERMRTFCUVUwc1VVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM3BETEUxQlFVMHNUVUZCVFN4SFFVRkhMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUTNaRExFMUJRVTBzWTBGQll5eEhRVUZITEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTnlSQ3hOUVVGTkxGTkJRVk1zUjBGQlJ5eGpRVUZqTEVOQlFVTXNUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zZVVOQlFYbERPMWxCUXpkR0xFbEJRVWtzVTBGQlV5eExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZPMmRDUVVOd1FpeFRRVUZUTEVkQlFVY3NZMEZCWXl4RFFVRkRMRU5CUVVNc2IwUkJRVzlFTzJGQlEycEdPMmxDUVVGTk8yZENRVU5NTEZOQlFWTXNSMEZCUnl4alFVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUlVGQlJTeFRRVUZUTEVOQlFVTXNRMEZCUXp0blFrRkRMME1zWVVGQllTeEhRVUZITEdOQlFXTXNRMEZCUXl4TFFVRkxMRU5CUTJ4RExGTkJRVk1zUjBGQlJ5eERRVUZETEVWQlEySXNZMEZCWXl4RFFVRkRMRTFCUVUwc1EwRkRkRUlzUTBGQlF6dGhRVU5JTzFsQlEwUXNUVUZCVFN4WFFVRlhMRWRCUVVjN1owSkJRMnhDTEZOQlFWTTdaMEpCUTFRc1ZVRkJWU3hGUVVGRkxFMUJRVTA3WjBKQlEyeENMRk5CUVZNc1JVRkJSU3hSUVVGUk8yZENRVU51UWl4UlFVRlJPMmRDUVVOU0xHRkJRV0U3WjBKQlEySXNVMEZCVXl4RlFVRkZMRmxCUVZrN2IwSkJRM0pDTEVOQlFVTXNRMEZCUXl4TFFVRkxPM2xDUVVOR0xFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdlVUpCUTFJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dDVRa0ZEVml4SlFVRkpMRVZCUVVVN2IwSkJRMWdzUTBGQlF5eERRVUZETEVWQlFVVTdZVUZEVUN4RFFVRkRPMWxCUTBZc1QwRkJUeXhYUVVGWExFTkJRVU03VTBGRGNFSTdVVUZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSVHRaUVVOV0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNNa05CUVRKRExFVkJRVVVzUTBGQlF5eEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUTNSRkxFOUJRVThzWVVGQllTeERRVUZETzFOQlEzUkNPMGxCUTBnc1EwRkJRenRKUVVWRUxHMUZRVUZ0UlR0SlFVTnVSU3hOUVVGTkxGZEJRVmNzUjBGQlJ5eEhRVUZITEVOQlFVTTdTVUZEZUVJc1RVRkJUU3hWUVVGVkxFZEJRVWNzU1VGQlNTeE5RVUZOTEVWQlFVVXNRMEZCUXp0SlFVTm9ReXhUUVVGVExESkNRVUV5UWl4RFFVRkRMRk5CUVZNc1JVRkJSU3hOUVVGTk8xRkJRM0JFTEUxQlFVMHNSMEZCUnl4SFFVRkhMRk5CUVZNc1IwRkJSeXhIUVVGSExFZEJRVWNzVFVGQlRTeERRVUZETzFGQlEzSkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxGVkJRVlVzU1VGQlNTeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1YwRkJWeXhGUVVGRk8xbEJRM1pFTEU5QlFVOHNTVUZCU1N4RFFVRkRPMU5CUTJJN1lVRkJUU3hKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NWVUZCVlN4RFFVRkRMRVZCUVVVN1dVRkRMMElzVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRUUVVOeVFqdGhRVUZOTzFsQlEwd3NWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFRRVU4wUWp0UlFVTkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF6dEpRVVZFTEN0RFFVRXJRenRKUVVNdlF5eEpRVUZKTEV0QlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNN1NVRkZiRUlzWjBSQlFXZEVPMGxCUTJoRUxFbEJRVWtzVDBGQlR5eEhRVUZITEVOQlFVTXNRMEZCUXp0SlFVVm9RaXg1UTBGQmVVTTdTVUZEZWtNc1UwRkJVeXhSUVVGUkxFTkJRMllzZDBKQlFYZENMRVZCUTNoQ0xFdEJRVXNzUlVGRFRDeFRRVUZUTEVWQlExUXNWMEZCVnl4RlFVTllMRmRCUVZjN1VVRkZXQ3hKUVVGSkxFdEJRVXNzUlVGQlJUdFpRVU5VTEU5QlFVODdVMEZEVWp0UlFVTkVMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU03VVVGRllpeE5RVUZOTEZOQlFWTXNSMEZCUnl3eVFrRkJNa0lzUTBGRE0wTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1JVRkRja0lzZDBKQlFYZENMRU5CUTNwQ0xFTkJRVU03VVVGRFJpeEpRVUZKTEZOQlFWTXNSVUZCUlR0WlFVTmlMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU03V1VGRFpDeFBRVUZQTzFOQlExSTdVVUZGUkN4TlFVRk5MRWRCUVVjc1IwRkJSenRaUVVOV0xGTkJRVk03V1VGRFZDeE5RVUZOTEVWQlFVVXNkMEpCUVhkQ08xbEJRMmhETEV0QlFVc3NSVUZCUlN4bFFVRmxMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zUTBGQlF5eFhRVUZYTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU03V1VGRGJFVXNVMEZCVXl4RlFVRkZMRmRCUVZjc1EwRkJReXhUUVVGVE8xbEJRMmhETEZWQlFWVXNSVUZCUlN4WFFVRlhMRU5CUVVNc1ZVRkJWVHRaUVVOc1F5eFRRVUZUTEVWQlFVVXNWMEZCVnl4RFFVRkRMRk5CUVZNN1dVRkRhRU1zVVVGQlVTeEZRVUZGTEZkQlFWY3NRMEZCUXl4UlFVRlJPMWxCUXpsQ0xHRkJRV0VzUlVGQlJTeFhRVUZYTEVOQlFVTXNZVUZCWVR0WlFVTjRReXhUUVVGVExFVkJRVVVzVjBGQlZ5eERRVUZETEZOQlFWTTdXVUZEYUVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJUdFRRVU51UWl4RFFVRkRPMUZCUlVZc1NVRkJTVHRaUVVOR0xFbEJRVWtzUTBGQlF5eFZRVUZWTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRka0k3VVVGQlF5eFBRVUZQTEV0QlFVc3NSVUZCUlR0WlFVTmtMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zYTBOQlFXdERMRU5CUVVNc1EwRkJRenRaUVVOb1JDeHBRa0ZCYVVJc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFRRVU14UWp0UlFVVkVMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU03U1VGRGFFSXNRMEZCUXp0SlFVVkVMR2RDUVVGblFqdEpRVU5vUWl4VFFVRlRMRTlCUVU4c1EwRkJReXgzUWtGQmQwSXNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRkxGZEJRVmM3VVVGRGRrVXNTVUZCU1N4TFFVRkxMRVZCUVVVN1dVRkRWQ3hQUVVGUE8xTkJRMUk3VVVGRFJDeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUldJc1RVRkJUU3hUUVVGVExFZEJRVWNzTWtKQlFUSkNMRU5CUXpORExGZEJRVmNzUTBGQlF5eFRRVUZUTEVWQlEzSkNMSGRDUVVGM1FpeERRVU42UWl4RFFVRkRPMUZCUTBZc1NVRkJTU3hUUVVGVExFVkJRVVU3V1VGRFlpeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRPMWxCUTJRc1QwRkJUenRUUVVOU08xRkJSVVFzU1VGQlNUdFpRVU5HTEhGRlFVRnhSVHRaUVVOeVJTeE5RVUZOTEZWQlFWVXNSMEZCUnl4RlFVRkZMRU5CUVVNN1dVRkRkRUlzUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1owSkJRM0JETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUTJJc1pVRkJaU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1YwRkJWeXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRU5CUXpsRUxFTkJRVU03WVVGRFNEdFpRVU5FTEUxQlFVMHNSMEZCUnl4SFFVRkhPMmRDUVVOV0xGTkJRVk1zUlVGQlJTeE5RVUZOTzJkQ1FVTnFRaXhOUVVGTkxFVkJRVVVzZDBKQlFYZENPMmRDUVVOb1F5eEpRVUZKTEVWQlFVVXNWVUZCVlR0blFrRkRhRUlzUzBGQlN5eEZRVUZGTEVWQlFVVTdaMEpCUTFRc1UwRkJVeXhGUVVGRkxGZEJRVmNzUTBGQlF5eFRRVUZUTzJkQ1FVTm9ReXhWUVVGVkxFVkJRVVVzVjBGQlZ5eERRVUZETEZWQlFWVTdaMEpCUTJ4RExGTkJRVk1zUlVGQlJTeFhRVUZYTEVOQlFVTXNVMEZCVXp0blFrRkRhRU1zVVVGQlVTeEZRVUZGTEZkQlFWY3NRMEZCUXl4UlFVRlJPMmRDUVVNNVFpeGhRVUZoTEVWQlFVVXNWMEZCVnl4RFFVRkRMR0ZCUVdFN1owSkJRM2hETEZOQlFWTXNSVUZCUlN4WFFVRlhMRU5CUVVNc1UwRkJVenRuUWtGRGFFTXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSVHRoUVVOdVFpeERRVUZETzFsQlEwWXNTVUZCU1N4RFFVRkRMRk5CUVZNc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFRRVU4wUWp0UlFVRkRMRTlCUVU4c1MwRkJTeXhGUVVGRk8xbEJRMlFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZEVkN4clEwRkJhME1zUjBGQlJ5eDNRa0ZCZDBJc1EwRkRPVVFzUTBGQlF6dFpRVU5HTEdsQ1FVRnBRaXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFOQlF6RkNPMUZCUTBRc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVU5vUWl4RFFVRkRPMGxCUlVRc2IwWkJRVzlHTzBsQlEzQkdMSGxGUVVGNVJUdEpRVU42UlN4TlFVRk5MRU5CUVVNc2NVSkJRWEZDTEVkQlFVY3NWVUZCVXl4UFFVRlBMRVZCUVVVc1NVRkJTVHRSUVVOdVJDeEpRVUZKTEVWQlFVVXNSMEZCUnl4TlFVRk5MRU5CUVVNc2QwSkJRWGRDTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM2hFTEVsQlFVa3NTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZETTBNc1QwRkJUeXhGUVVGRkxFdEJRVXNzVTBGQlV5eEpRVUZKTEV0QlFVc3NTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkRla01zUlVGQlJTeEhRVUZITEUxQlFVMHNRMEZCUXl4M1FrRkJkMElzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRiRVFzUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VTBGRGRFTTdVVUZEUkN4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU1zUTBGQlF6dEpRVVZHTEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUjBGQlJ5eFZRVUZUTEU5QlFVODdVVUZEZUVNc1NVRkJTU3hMUVVGTExFZEJRVWNzVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlEyaEVMRWxCUVVrc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRNME1zVDBGQlR5eExRVUZMTEV0QlFVc3NTVUZCU1N4RlFVRkZPMWxCUTNKQ0xFdEJRVXNzUjBGQlJ5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRM2hFTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFOQlEzUkRPMUZCUTBRc2IwUkJRVzlFTzFGQlEzQkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF5eERRVUZETzBsQlJVWTdPMDlCUlVjN1NVRkRTQ3hUUVVGVExGRkJRVkVzUTBGQlF5eE5RVUZOTEVWQlFVVXNXVUZCV1R0UlFVTndReXhKUVVGSkxGRkJRVkVzUTBGQlF6dFJRVU5pTEVsQlFVazdXVUZEUml4UlFVRlJMRWRCUVVjc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eERRVUZETzFOQlEycERPMUZCUVVNc1QwRkJUeXhMUVVGTExFVkJRVVU3V1VGRFpDeFBRVUZQTEV0QlFVc3NRMEZCUXp0VFFVTmtPMUZCUTBRc1NVRkJTU3hSUVVGUkxFdEJRVXNzU1VGQlNTeEZRVUZGTzFsQlEzSkNMSGRDUVVGM1FqdFpRVU40UWl4UFFVRlBMRXRCUVVzc1EwRkJRenRUUVVOa08xRkJRMFFzVDBGQlR5eFBRVUZQTEZGQlFWRXNTMEZCU3l4UlFVRlJMRU5CUVVNN1NVRkRkRU1zUTBGQlF6dEpRVmxFTEZOQlFWTXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeEZRVUZGTEZWQlFWVXNSVUZCUlN4alFVRXlRaXhGUVVGRk8xRkJRM3BGTEhWRFFVRjFRenRSUVVOMlF5eEZRVUZGTzFGQlEwWXNZVUZCWVR0UlFVTmlMR0ZCUVdFN1VVRkRZaXh2UWtGQmIwSTdVVUZEY0VJc01rSkJRVEpDTzFGQlF6TkNMSGRDUVVGM1FqdFJRVU40UWl4blJVRkJaMFU3VVVGRGFFVXNlVUpCUVhsQ08xRkJRM3BDTEhWRlFVRjFSVHRSUVVOMlJTeHRSRUZCYlVRN1VVRkRia1FzUlVGQlJUdFJRVU5HTEhGRFFVRnhRenRSUVVOeVF5eHpRa0ZCYzBJN1VVRkRkRUlzYlVOQlFXMURPMUZCUTI1RExITkZRVUZ6UlR0UlFVTjBSU3h6UWtGQmMwSTdVVUZEZEVJc0swSkJRU3RDTzFGQlF5OUNMRzlGUVVGdlJUdFJRVU53UlN4aFFVRmhPMUZCUTJJc01rSkJRVEpDTzFGQlF6TkNMRzlGUVVGdlJUdFJRVU53UlN3d1FrRkJNRUk3VVVGRE1VSXNiME5CUVc5RE8xRkJRM0JETEdsRlFVRnBSVHRSUVVOcVJTeHJSRUZCYTBRN1VVRkRiRVFzTUVKQlFUQkNPMUZCUXpGQ0xIRkZRVUZ4UlR0UlFVTnlSU3h0UlVGQmJVVTdVVUZEYmtVc2NVVkJRWEZGTzFGQlEzSkZMRzFEUVVGdFF6dFJRVU51UXl4M1FrRkJkMEk3VVVGRGVFSXNkVVZCUVhWRk8xRkJRM1pGTERaRFFVRTJRenRSUVVNM1F5eFpRVUZaTzFGQlExb3NjMFZCUVhORk8xRkJRM1JGTERSQ1FVRTBRanRSUVVNMVFpdzRSRUZCT0VRN1VVRkRPVVFzWjBWQlFXZEZPMUZCUTJoRkxESkVRVUV5UkR0UlFVTXpSQ3h2UWtGQmIwSTdVVUZEY0VJc05rUkJRVFpFTzFGQlF6ZEVMSE5DUVVGelFqdFJRVU4wUWl4TlFVRk5MRlZCUVZVc1IwRkJSeXhYUVVGWExFTkJRVU1zYzBKQlFYTkNPMWxCUTI1RUxFTkJRVU1zUTBGQlF5eFhRVUZYTEVOQlFVTXNjMEpCUVhOQ08xbEJRM0JETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRjRU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExGVkJRVlVzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1dVRkRNVU1zU1VGRFJTeFhRVUZYTEVOQlFVTXNhMEpCUVd0Q08yZENRVU01UWl4WFFVRlhMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVTXhSRHRuUWtGRFFTeFRRVUZUTzJGQlExWTdXVUZEUkN4blJVRkJaMFU3V1VGRGFFVXNjMFZCUVhORk8xbEJRM1JGTEhGRlFVRnhSVHRaUVVOeVJTeEpRVU5GTEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1UwRkJVenRuUWtGRGRrSXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExGZEJRVmM3WjBKQlF6ZENMRkZCUVZFc1EwRkJReXhOUVVGTkxFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWxCUVVrc1YwRkJWeXhEUVVGRExFbEJRVWtzVjBGQlZ5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkRjRVE3WjBKQlEwRXNhMFJCUVd0RU8yZENRVU5zUkN4SlFVRkpMRU5CUVVNc1EwRkJReXhQUVVGUExFbEJRVWtzVjBGQlZ5eERRVUZETEVWQlFVVTdiMEpCUXpkQ0xGZEJRVmNzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkRPMmxDUVVOMlFqdG5Ra0ZEUkN4blFrRkJaMElzUTBGRFpDeE5RVUZOTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRM0pDTEZWQlFWVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVU5vUXp0dlFrRkRSU3hyUWtGQmEwSXNSVUZCUlN4WFFVRlhMRU5CUVVNc2EwSkJRV3RDTzI5Q1FVTnNSQ3haUVVGWkxFVkJRVVVzVjBGQlZ5eERRVUZETEZsQlFWazdiMEpCUTNSRExIRkNRVUZ4UWl4RlFVRkZMRmRCUVZjc1EwRkJReXh4UWtGQmNVSTdiMEpCUTNoRUxGZEJRVmNzUlVGQlJTeFhRVUZYTEVOQlFVTXNWMEZCVnp0dlFrRkRjRU1zVTBGQlV5eEZRVUZGTEZkQlFWY3NRMEZCUXl4VFFVRlRPMjlDUVVOb1F5eExRVUZMTEVWQlFVVXNWMEZCVnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRE8ybENRVU0zUWl4RFFVTkdMRU5CUVVNN1lVRkRTRHRaUVVORUxFbEJRVWs3WjBKQlEwWXNkMEpCUVhkQ0xFTkJRM1JDTEUxQlFVMHNSVUZEVGl4VlFVRlZMRVZCUTFZc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVU5pTEZkQlFWY3NRMEZEV2l4RFFVRkRPMkZCUTBnN1dVRkJReXhQUVVGUExFdEJRVXNzUlVGQlJUdG5Ra0ZEWkN4cFFrRkJhVUlzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTXhRanRUUVVOR08wbEJRMGdzUTBGQlF6dEpRVU5FTEVsQlFVa3NUMEZCVHl4RlFVRkZPMUZCUTFZc1RVRkJZeXhEUVVGRExHZENRVUZuUWl4SFFVRkhMR2RDUVVGblFpeERRVUZETzB0QlEzSkVPMGxCUlVRc1owTkJRV2RETzBsQlEyaERMSGRGUVVGM1JUdEpRVU40UlN4NVJVRkJlVVU3U1VGRGVrVXNkMFJCUVhkRU8wbEJRM2hFTEZOQlFWTXNhMEpCUVd0Q0xFTkJRVU1zVlVGQlZTeEZRVUZGTEZWQlFWVXNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWenRSUVVOdVJTeFBRVUZQTzFsQlEwd3NUVUZCVFN4WFFVRlhMRWRCUVVjc01rSkJRVEpDTEVOQlF6ZERMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zV1VGQldTeERRVU16UWl4RFFVRkRPMWxCUTBZc1QwRkJUeXhEUVVOTUxGVkJRVlVzUjBGQlJ5eEhRVUZITEVkQlFVY3NWVUZCVlN4RlFVTTNRaXhUUVVGVExFVkJRMVFzVjBGQlZ5eEZRVU5ZTEZkQlFWY3NRMEZEV2l4RFFVRkRPMWxCUTBZc1QwRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NSVUZCUlN4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOeVF5eERRVUZETEVOQlFVTTdTVUZEU2l4RFFVRkRPMGxCUlVRc01rTkJRVEpETzBsQlF6TkRMRk5CUVZNc2QwSkJRWGRDTEVOQlF5OUNMRTFCUVUwc1JVRkRUaXhWUVVGVkxFVkJRMVlzV1VGQldTeEZRVU5hTEdOQlFUSkNMRVZCUVVVN1VVRkZOMElzZFVOQlFYVkRPMUZCUTNaRExFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNRMEZCUXl4eFFrRkJjVUlzUTBGQlF5eE5RVUZOTEVWQlFVVXNXVUZCV1N4RFFVRkRMRU5CUVVNN1VVRkRjRVVzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0WlFVTmlMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRMWdzYlVOQlFXMURMRVZCUTI1RExGVkJRVlVzUlVGRFZpeFpRVUZaTEVWQlExb3NUVUZCVFN4RFFVTlFMRU5CUVVNN1dVRkRSaXhQUVVGUE8xTkJRMUk3VVVGRlJDeHRSRUZCYlVRN1VVRkRia1FzVFVGQlRTeGpRVUZqTEVkQlFVY3NVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJRenRSUVVOd1F5eE5RVUZOTEdOQlFXTXNSMEZCUnl4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRE8xRkJRM0JETEVsQlFVa3NZVUZCWVN4SFFVRkhMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU03VVVGRmJrTXNiMFZCUVc5Rk8xRkJRM0JGTEc5Q1FVRnZRanRSUVVOd1FpeE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRTFCUVUwc1JVRkJSU3haUVVGWkxFVkJRVVU3V1VGRE1VTXNXVUZCV1N4RlFVRkZMRWxCUVVrN1dVRkRiRUlzUjBGQlJ5eEZRVUZGTEVOQlFVTTdaMEpCUTBvc1QwRkJUenR2UWtGRFRDeEpRVUZKTEZsQlFWa3NRMEZCUXp0dlFrRkRha0lzVFVGQlRTeFhRVUZYTEVkQlFVY3NNa0pCUVRKQ0xFTkJRemRETEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1dVRkJXU3hEUVVNelFpeERRVUZETzI5Q1FVVkdMSEZDUVVGeFFqdHZRa0ZEY2tJc1NVRkJTU3hqUVVGakxFVkJRVVU3ZDBKQlEyeENMSFZDUVVGMVFqdDNRa0ZEZGtJc1dVRkJXU3hIUVVGSExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN2NVSkJRekZETzNsQ1FVRk5MRWxCUVVrc1QwRkJUeXhKUVVGSkxGRkJRVkVzUlVGQlJUdDNRa0ZET1VJc2JVSkJRVzFDTzNkQ1FVTnVRaXhaUVVGWkxFZEJRVWNzWVVGQllTeERRVUZETzNGQ1FVTTVRanQ1UWtGQlRUdDNRa0ZEVEN4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVOWUxIbENRVUY1UWl4RlFVTjZRaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc0swSkJRU3RDTEVOQlEyaERMRU5CUVVNN2QwSkJRMFlzVVVGQlVTeERRVU5PTEZWQlFWVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1dVRkJXU3hGUVVNdlFpeEZRVUZGTEVWQlEwWXNZVUZCWVN4RlFVTmlMRmRCUVZjc1JVRkRXQ3hYUVVGWExFTkJRMW9zUTBGQlF6dDNRa0ZEUml4UFFVRlBPM0ZDUVVOU08yOUNRVVZFTEN0RVFVRXJSRHR2UWtGREwwUXNNa1JCUVRKRU8yOUNRVU16UkN4elJFRkJjMFE3YjBKQlEzUkVMR3RGUVVGclJUdHZRa0ZEYkVVc1NVRkJTU3hQUVVGUExGbEJRVmtzUzBGQlN5eFZRVUZWTEVWQlFVVTdkMEpCUTNSRExFOUJRVThzYTBKQlFXdENMRU5CUTNaQ0xGVkJRVlVzUlVGRFZpeFpRVUZaTEVWQlExb3NXVUZCV1N4RlFVTmFMRmRCUVZjc1EwRkRXaXhEUVVGRE8zRkNRVU5JTzNsQ1FVRk5MRWxCUTB3c1QwRkJUeXhaUVVGWkxFdEJRVXNzVVVGQlVUdDNRa0ZEYUVNc1EwRkJReXhEUVVGRExGZEJRVmNzUTBGQlF5eFRRVUZUTzNkQ1FVTjJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVsQlFVa3NWMEZCVnl4RFFVRkRMRWxCUVVrc1YwRkJWeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZEY0VRN2QwSkJRMEVzVDBGQlR5eFpRVUZaTEVOQlFVTTdjVUpCUTNKQ08zbENRVUZOTzNkQ1FVTk1MRkZCUVZFc1EwRkRUaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc1dVRkJXU3hGUVVOYUxFdEJRVXNzUlVGRFRDeFhRVUZYTEVWQlExZ3NWMEZCVnl4RFFVTmFMRU5CUVVNN2QwSkJRMFlzVDBGQlR5eFpRVUZaTEVOQlFVTTdjVUpCUTNKQ08yZENRVU5JTEVOQlFVTXNRMEZCUXp0WlFVTktMRU5CUVVNc1EwRkJReXhGUVVGRk8xbEJRMG9zUjBGQlJ5eEZRVUZGTEVOQlFVTTdaMEpCUTBvc1QwRkJUeXhWUVVGVExFdEJRVXM3YjBKQlEyNUNMRTFCUVUwc1YwRkJWeXhIUVVGSExESkNRVUV5UWl4RFFVTTNReXhEUVVGRExFTkJRVU1zVjBGQlZ5eERRVUZETEZsQlFWa3NRMEZETTBJc1EwRkJRenR2UWtGRFJpeEpRVUZKTEZkQlFWY3NRMEZCUXp0dlFrRkZhRUlzYjBSQlFXOUVPMjlDUVVOd1JDeEpRVU5GTEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1YwRkJWenQzUWtGRGVrSXNRMEZCUXl4UFFVRlBMR0ZCUVdFc1MwRkJTeXhWUVVGVk96UkNRVU5zUXl4UFFVRlBMR0ZCUVdFc1MwRkJTeXhSUVVGUkxFTkJRVU1zUlVGRGNFTTdkMEpCUTBFc1VVRkJVU3hEUVVOT0xGVkJRVlVzUjBGQlJ5eEhRVUZITEVkQlFVY3NXVUZCV1N4RlFVTXZRaXhMUVVGTExFVkJRMHdzWjBKQlFXZENMRVZCUTJoQ0xGZEJRVmNzUlVGRFdDeFhRVUZYTEVOQlExb3NRMEZCUXp0M1FrRkRSaXhQUVVGUExFdEJRVXNzUTBGQlF6dHhRa0ZEWkR0dlFrRkZSQ3cwUTBGQk5FTTdiMEpCUXpWRExFbEJRVWtzWTBGQll5eEZRVUZGTzNkQ1FVTnNRaXgxUWtGQmRVSTdkMEpCUTNaQ0xGZEJRVmNzUjBGQlJ5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF6dHhRa0ZEYUVRN2VVSkJRVTBzU1VGQlNTeFBRVUZQTEVsQlFVa3NVVUZCVVN4RlFVRkZPM2RDUVVNNVFpeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRPM2RDUVVOaUxFbEJRVWtzVFVGQlRTeERRVUZETEdGQlFXRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHMwUWtGRE9VSXNUVUZCVFN4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFVkJRVVVzV1VGQldTeEZRVUZGTzJkRFFVTjRReXhMUVVGTE96WkNRVU5PTEVOQlFVTXNRMEZCUXp0NVFrRkRTanMyUWtGQlRUczBRa0ZEVEN4aFFVRmhMRWRCUVVjc1MwRkJTeXhEUVVGRE8zbENRVU4yUWp0M1FrRkRSQ3hYUVVGWExFZEJRVWNzUzBGQlN5eERRVUZETzNkQ1FVTndRaXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETzNGQ1FVTm1PM2xDUVVGTk8zZENRVU5NTEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUTFnc2VVSkJRWGxDTEVWQlEzcENMRlZCUVZVc1IwRkJSeXhIUVVGSExFZEJRVWNzV1VGQldTeEZRVU12UWl3clFrRkJLMElzUTBGRGFFTXNRMEZCUXp0M1FrRkRSaXhSUVVGUkxFTkJRMDRzVlVGQlZTeEhRVUZITEVkQlFVY3NSMEZCUnl4WlFVRlpMRVZCUXk5Q0xFdEJRVXNzUlVGRFRDeGhRVUZoTEVWQlEySXNWMEZCVnl4RlFVTllMRmRCUVZjc1EwRkRXaXhEUVVGRE8zZENRVU5HTEU5QlFVOHNTMEZCU3l4RFFVRkRPM0ZDUVVOa08yOUNRVVZFTEZWQlFWVTdiMEpCUTFZc1VVRkJVU3hEUVVOT0xGVkJRVlVzUjBGQlJ5eEhRVUZITEVkQlFVY3NXVUZCV1N4RlFVTXZRaXhMUVVGTExFVkJRMHdzUzBGQlN5eEZRVU5NTEZkQlFWY3NSVUZEV0N4WFFVRlhMRU5CUTFvc1EwRkJRenR2UWtGRlJpeHRRa0ZCYlVJN2IwSkJRMjVDTEU5QlFVOHNWMEZCVnl4RFFVRkRPMmRDUVVOeVFpeERRVUZETEVOQlFVTTdXVUZEU2l4RFFVRkRMRU5CUVVNc1JVRkJSVHRUUVVOTUxFTkJRVU1zUTBGQlF6dEpRVU5NTEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVWSUxIVkRRVUYxUXp0SlFVTjJReXhOUVVGTkxHbENRVUZwUWl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExGVkJRVlVzVDBGQlR6dFJRVU55UkN4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZEY2tJc1UwRkJVeXhMUVVGTE8xbEJRMW9zU1VGQlNTeFBRVUZSTEUxQlFXTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1YwRkJWeXhGUVVGRk8yZENRVU12UXl4UFFVRlBMRTlCUVU4c1JVRkJSU3hEUVVGRE8yRkJRMnhDTzJsQ1FVRk5PMmRDUVVOTUxDdENRVUVyUWp0blFrRkRMMElzU1VGQlNTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1IwRkJSeXhIUVVGSExFdEJRVXNzUlVGQlJUdHZRa0ZETlVJc1ZVRkJWU3hEUVVGRExFdEJRVXNzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0cFFrRkRka0k3Y1VKQlFVMDdiMEpCUTB3c1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDFSVUZCZFVVc1EwRkJReXhEUVVGRE8ybENRVU4wUmp0aFFVTkdPMUZCUTBnc1EwRkJRenRSUVVORUxFdEJRVXNzUlVGQlJTeERRVUZETzBsQlExWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkZUQ3hwUWtGQmFVSXNRMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkRja0lzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4M1EwRkJkME1zUTBGQlF5eERRVUZETzFGQlEzUkVMR2RDUVVGblFpeERRVU5pTEUxQlFXTXNRMEZCUXl4SlFVRkpMRVZCUTNCQ0xFMUJRVTBzUlVGRFRpeEZRVUZGTEVOQlEwZ3NRMEZCUXp0SlFVTktMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJSVWdzYlVOQlFXMURPMGxCUTI1RExFVkJRVVU3U1VGRlJqczdUMEZGUnp0SlFVTklMSGxFUVVGNVJEdEpRVVY2UkRzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wMUJkMGhGTzBsQlJVWXNTVUZCU1N4UFFVRlBMRVZCUVVVN1VVRkRXQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVU5VTERCRVFVRXdSQ3hGUVVNeFJDeEpRVUZKTEVsQlFVa3NSVUZCUlN4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVONlFpeERRVUZETzB0QlEwZzdRVUZEU0N4RFFVRkRMRU5CUVVNaWZRPT0iLCJleHBvcnQgKiBmcm9tIFwiLi9iYWNrZ3JvdW5kL2Nvb2tpZS1pbnN0cnVtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9iYWNrZ3JvdW5kL2h0dHAtaW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9qYXZhc2NyaXB0LWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9jb250ZW50L2phdmFzY3JpcHQtaW5zdHJ1bWVudC1jb250ZW50LXNjb3BlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvaHR0cC1wb3N0LXBhcnNlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL3N0cmluZy11dGlsc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vc2NoZW1hXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12YVc1a1pYZ3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1kwRkJZeXhuUTBGQlowTXNRMEZCUXp0QlFVTXZReXhqUVVGakxEaENRVUU0UWl4RFFVRkRPMEZCUXpkRExHTkJRV01zYjBOQlFXOURMRU5CUVVNN1FVRkRia1FzWTBGQll5eHZRMEZCYjBNc1EwRkJRenRCUVVOdVJDeGpRVUZqTEN0RFFVRXJReXhEUVVGRE8wRkJRemxFTEdOQlFXTXNkMEpCUVhkQ0xFTkJRVU03UVVGRGRrTXNZMEZCWXl4dlFrRkJiMElzUTBGQlF6dEJRVU51UXl4alFVRmpMRlZCUVZVc1EwRkJReUo5IiwiLyoqXG4gKiBUaGlzIGVuYWJsZXMgdXMgdG8ga2VlcCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3JpZ2luYWwgb3JkZXJcbiAqIGluIHdoaWNoIGV2ZW50cyBhcnJpdmVkIHRvIG91ciBldmVudCBsaXN0ZW5lcnMuXG4gKi9cbmxldCBldmVudE9yZGluYWwgPSAwO1xuZXhwb3J0IGNvbnN0IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsID0gKCkgPT4ge1xuICAgIHJldHVybiBldmVudE9yZGluYWwrKztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laWGgwWlc1emFXOXVMWE5sYzNOcGIyNHRaWFpsYm5RdGIzSmthVzVoYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZaWGgwWlc1emFXOXVMWE5sYzNOcGIyNHRaWFpsYm5RdGIzSmthVzVoYkM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3TzBkQlIwYzdRVUZEU0N4SlFVRkpMRmxCUVZrc1IwRkJSeXhEUVVGRExFTkJRVU03UVVGRmNrSXNUVUZCVFN4RFFVRkRMRTFCUVUwc2RVSkJRWFZDTEVkQlFVY3NSMEZCUnl4RlFVRkZPMGxCUXpGRExFOUJRVThzV1VGQldTeEZRVUZGTEVOQlFVTTdRVUZEZUVJc1EwRkJReXhEUVVGREluMD0iLCJpbXBvcnQgeyBtYWtlVVVJRCB9IGZyb20gXCIuL3V1aWRcIjtcbi8qKlxuICogVGhpcyBlbmFibGVzIHVzIHRvIGFjY2VzcyBhIHVuaXF1ZSByZWZlcmVuY2UgdG8gdGhpcyBicm93c2VyXG4gKiBzZXNzaW9uIC0gcmVnZW5lcmF0ZWQgYW55IHRpbWUgdGhlIGJhY2tncm91bmQgcHJvY2VzcyBnZXRzXG4gKiByZXN0YXJ0ZWQgKHdoaWNoIHNob3VsZCBvbmx5IGJlIG9uIGJyb3dzZXIgcmVzdGFydHMpXG4gKi9cbmV4cG9ydCBjb25zdCBleHRlbnNpb25TZXNzaW9uVXVpZCA9IG1ha2VVVUlEKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laWGgwWlc1emFXOXVMWE5sYzNOcGIyNHRkWFZwWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZaWGgwWlc1emFXOXVMWE5sYzNOcGIyNHRkWFZwWkM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hQUVVGUExFVkJRVVVzVVVGQlVTeEZRVUZGTEUxQlFVMHNVVUZCVVN4RFFVRkRPMEZCUld4RE96czdPMGRCU1VjN1FVRkRTQ3hOUVVGTkxFTkJRVU1zVFVGQlRTeHZRa0ZCYjBJc1IwRkJSeXhSUVVGUkxFVkJRVVVzUTBGQlF5SjkiLCIvLyBJbmNvcnBvcmF0ZXMgY29kZSBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vcmVkbGluZTEzL3NlbGVuaXVtLWptZXRlci9ibG9iLzY5NjZkNGIzMjZjZDc4MjYxZTMxZTZlMzE3MDc2NTY5MDUxY2FjMzcvY29udGVudC9saWJyYXJ5L3JlY29yZGVyL0h0dHBQb3N0UGFyc2VyLmpzXG5leHBvcnQgY2xhc3MgSHR0cFBvc3RQYXJzZXIge1xuICAgIC8qXG4gICAgcHJpdmF0ZSBoYXNoZWFkZXJzOiBib29sZWFuO1xuICAgIHByaXZhdGUgc2Vla2FibGVzdHJlYW07XG4gICAgcHJpdmF0ZSBzdHJlYW07XG4gICAgcHJpdmF0ZSBwb3N0Qm9keTtcbiAgICBwcml2YXRlIHBvc3RMaW5lcztcbiAgICBwcml2YXRlIHBvc3RIZWFkZXJzO1xuICAgIHByaXZhdGUgYm9keTtcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgIC8vIG9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHM6IFdlYlJlcXVlc3RPbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzLFxuICAgIG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscywgZGF0YVJlY2VpdmVyKSB7XG4gICAgICAgIC8vIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyA9IG9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHM7XG4gICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzO1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJIdHRwUG9zdFBhcnNlclwiLFxuICAgICAgICAgIC8vIG9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMsXG4gICAgICAgICAgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLFxuICAgICAgICApO1xuICAgICAgICAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZW5jb2RpbmdUeXBlIGZyb20gdGhlIEhUVFAgUmVxdWVzdCBoZWFkZXJzXG4gICAgICovXG4gICAgcGFyc2VQb3N0UmVxdWVzdCggLyplbmNvZGluZ1R5cGUqLykge1xuICAgICAgICAvLyBjb25zdCByZXF1ZXN0SGVhZGVycyA9IHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscy5yZXF1ZXN0SGVhZGVycztcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscy5yZXF1ZXN0Qm9keTtcbiAgICAgICAgaWYgKHJlcXVlc3RCb2R5LmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIkV4Y2VwdGlvbjogVXBzdHJlYW0gZmFpbGVkIHRvIHBhcnNlIFBPU1Q6IFwiICsgcmVxdWVzdEJvZHkuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1ZXN0Qm9keS5mb3JtRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiByZXF1ZXN0Qm9keS5mb3JtRGF0YSBzaG91bGQgcHJvYmFibHkgYmUgdHJhbnNmb3JtZWQgaW50byBhbm90aGVyIGZvcm1hdFxuICAgICAgICAgICAgICAgIHBvc3RfYm9keTogcmVxdWVzdEJvZHkuZm9ybURhdGEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiBlbXB0eSByZXNwb25zZSB1bnRpbCB3ZSBoYXZlIGFsbCBpbnN0cnVtZW50YXRpb24gY29udmVydGVkXG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRGVidWcoXG4gICAgICAgICAgXCJFeGNlcHRpb246IEluc3RydW1lbnRhdGlvbiB0byBwYXJzZSBQT1NUIHJlcXVlc3RzIHdpdGhvdXQgZm9ybURhdGEgaXMgbm90IHlldCByZXN0b3JlZFwiLFxuICAgICAgICApO1xuICAgIFxuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5zZXR1cFN0cmVhbSgpO1xuICAgICAgICAgIHRoaXMucGFyc2VTdHJlYW0oKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFwiRXhjZXB0aW9uOiBGYWlsZWQgdG8gcGFyc2UgUE9TVDogXCIgKyBlKTtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgcG9zdEJvZHkgPSB0aGlzLnBvc3RCb2R5O1xuICAgIFxuICAgICAgICBpZiAoIXBvc3RCb2R5KSB7XG4gICAgICAgICAgLy8gc29tZSBzY3JpcHRzIHN0cmFuZ2VseSBzZW5kcyBlbXB0eSBwb3N0IGJvZGllcyAoY29uZmlybWVkIHdpdGggdGhlIGRldmVsb3BlciB0b29scylcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IGlzTXVsdGlQYXJ0ID0gZmFsc2U7IC8vIGVuY1R5cGU6IG11bHRpcGFydC9mb3JtLWRhdGFcbiAgICAgICAgY29uc3QgcG9zdEhlYWRlcnMgPSB0aGlzLnBvc3RIZWFkZXJzOyAvLyByZXF1ZXN0IGhlYWRlcnMgZnJvbSB1cGxvYWQgc3RyZWFtXG4gICAgICAgIC8vIFNlZSwgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjU0ODUxNy93aGF0LWlzLXJlcXVlc3QtaGVhZGVycy1mcm9tLXVwbG9hZC1zdHJlYW1cbiAgICBcbiAgICAgICAgLy8gYWRkIGVuY29kaW5nVHlwZSBmcm9tIHBvc3RIZWFkZXJzIGlmIGl0J3MgbWlzc2luZ1xuICAgICAgICBpZiAoIWVuY29kaW5nVHlwZSAmJiBwb3N0SGVhZGVycyAmJiBcIkNvbnRlbnQtVHlwZVwiIGluIHBvc3RIZWFkZXJzKSB7XG4gICAgICAgICAgZW5jb2RpbmdUeXBlID0gcG9zdEhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl07XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKGVuY29kaW5nVHlwZS5pbmRleE9mKFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiKSAhPT0gLTEpIHtcbiAgICAgICAgICBpc011bHRpUGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IGpzb25Qb3N0RGF0YSA9IFwiXCI7XG4gICAgICAgIGxldCBlc2NhcGVkSnNvblBvc3REYXRhID0gXCJcIjtcbiAgICAgICAgaWYgKGlzTXVsdGlQYXJ0KSB7XG4gICAgICAgICAganNvblBvc3REYXRhID0gdGhpcy5wYXJzZU11bHRpUGFydERhdGEocG9zdEJvZHkgLyosIGVuY29kaW5nVHlwZSogLyk7XG4gICAgICAgICAgZXNjYXBlZEpzb25Qb3N0RGF0YSA9IGVzY2FwZVN0cmluZyhqc29uUG9zdERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGpzb25Qb3N0RGF0YSA9IHRoaXMucGFyc2VFbmNvZGVkRm9ybURhdGEocG9zdEJvZHksIGVuY29kaW5nVHlwZSk7XG4gICAgICAgICAgZXNjYXBlZEpzb25Qb3N0RGF0YSA9IGVzY2FwZVN0cmluZyhqc29uUG9zdERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBvc3RfaGVhZGVyczogcG9zdEhlYWRlcnMsIHBvc3RfYm9keTogZXNjYXBlZEpzb25Qb3N0RGF0YSB9O1xuICAgICAgICAqL1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFIUjBjQzF3YjNOMExYQmhjbk5sY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZhSFIwY0Mxd2IzTjBMWEJoY25ObGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4blMwRkJaMHM3UVVGbGFFc3NUVUZCVFN4UFFVRlBMR05CUVdNN1NVRkpla0k3T3pzN096czdPMDFCVVVVN1NVRkZSanRKUVVORkxEaEZRVUU0UlR0SlFVTTVSU3d5UWtGQmEwVXNSVUZEYkVVc1dVRkJXVHRSUVVWYUxEQkZRVUV3UlR0UlFVTXhSU3hKUVVGSkxFTkJRVU1zTWtKQlFUSkNMRWRCUVVjc01rSkJRVEpDTEVOQlFVTTdVVUZETDBRc1NVRkJTU3hEUVVGRExGbEJRVmtzUjBGQlJ5eFpRVUZaTEVOQlFVTTdVVUZEYWtNN096czdPenRWUVUxRk8wbEJRMG9zUTBGQlF6dEpRVVZFT3p0UFFVVkhPMGxCUTBrc1owSkJRV2RDTEVWQlFVTXNaMEpCUVdkQ08xRkJRM1JETERoRlFVRTRSVHRSUVVNNVJTeE5RVUZOTEZkQlFWY3NSMEZCUnl4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVOQlFVTXNWMEZCVnl4RFFVRkRPMUZCUTJwRkxFbEJRVWtzVjBGQlZ5eERRVUZETEV0QlFVc3NSVUZCUlR0WlFVTnlRaXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZGQlFWRXNRMEZEZUVJc05FTkJRVFJETEVkQlFVY3NWMEZCVnl4RFFVRkRMRXRCUVVzc1EwRkRha1VzUTBGQlF6dFRRVU5JTzFGQlEwUXNTVUZCU1N4WFFVRlhMRU5CUVVNc1VVRkJVU3hGUVVGRk8xbEJRM2hDTEU5QlFVODdaMEpCUTB3c1owWkJRV2RHTzJkQ1FVTm9SaXhUUVVGVExFVkJRVVVzVjBGQlZ5eERRVUZETEZGQlFWRTdZVUZEYUVNc1EwRkJRenRUUVVOSU8xRkJSVVFzYjBWQlFXOUZPMUZCUTNCRkxFOUJRVThzUlVGQlJTeERRVUZETzFGQlExWTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08xVkJORU5GTzBsQlEwb3NRMEZCUXp0RFFUSlVSaUo5IiwiLyoqXG4gKiBUaWVzIHRvZ2V0aGVyIHRoZSB0d28gc2VwYXJhdGUgbmF2aWdhdGlvbiBldmVudHMgdGhhdCB0b2dldGhlciBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCBib3RoIHBhcmVudCBmcmFtZSBpZCBhbmQgdHJhbnNpdGlvbi1yZWxhdGVkIGF0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFBlbmRpbmdOYXZpZ2F0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Db21taXR0ZWRFdmVudE5hdmlnYXRpb24gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQ29tbWl0dGVkRXZlbnROYXZpZ2F0aW9uID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc29sdmVkKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uLFxuICAgICAgICAgICAgdGhpcy5vbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbixcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVpdGhlciByZXR1cm5zIG9yIHRpbWVzIG91dCBhbmQgcmV0dXJucyB1bmRlZmluZWQgb3JcbiAgICAgKiByZXR1cm5zIHRoZSByZXN1bHRzIGZyb20gcmVzb2x2ZWQoKSBhYm92ZVxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKSxcbiAgICAgICAgXSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlZDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljR1Z1WkdsdVp5MXVZWFpwWjJGMGFXOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5d1pXNWthVzVuTFc1aGRtbG5ZWFJwYjI0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJSVUU3TzBkQlJVYzdRVUZEU0N4TlFVRk5MRTlCUVU4c2FVSkJRV2xDTzBsQlN6VkNPMUZCUTBVc1NVRkJTU3hEUVVGRExDdENRVUVyUWl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlF6TkVMRWxCUVVrc1EwRkJReXh6UTBGQmMwTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRlRVFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4SlFVRkpMRU5CUVVNc01FSkJRVEJDTEVkQlFVY3NTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRGRFUXNTVUZCU1N4RFFVRkRMR2xEUVVGcFF5eEhRVUZITEU5QlFVOHNRMEZCUXp0UlFVTnVSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5NTEVOQlFVTTdTVUZEVFN4UlFVRlJPMUZCUTJJc1QwRkJUeXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETzFsQlEycENMRWxCUVVrc1EwRkJReXdyUWtGQkswSTdXVUZEY0VNc1NVRkJTU3hEUVVGRExEQkNRVUV3UWp0VFFVTm9ReXhEUVVGRExFTkJRVU03U1VGRFRDeERRVUZETzBsQlJVUTdPenM3VDBGSlJ6dEpRVU5KTEV0QlFVc3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF5eEZRVUZGTzFGQlEyNURMRTFCUVUwc1VVRkJVU3hIUVVGSExFMUJRVTBzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTnNReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTzFsQlEyWXNTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRVVVzUTBGQlF5eFZRVUZWTEVOQlFVTXNUMEZCVHl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8xTkJRMmhFTEVOQlFVTXNRMEZCUXp0UlFVTklMRTlCUVU4c1VVRkJVU3hEUVVGRE8wbEJRMnhDTEVOQlFVTTdRMEZEUmlKOSIsIi8qKlxuICogVGllcyB0b2dldGhlciB0aGUgdHdvIHNlcGFyYXRlIGV2ZW50cyB0aGF0IHRvZ2V0aGVyIGhvbGRzIGluZm9ybWF0aW9uIGFib3V0IGJvdGggcmVxdWVzdCBoZWFkZXJzIGFuZCBib2R5XG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc29sdmVkKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMsXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKiBAcGFyYW0gbXNcbiAgICAgKi9cbiAgICBhc3luYyByZXNvbHZlZFdpdGhpblRpbWVvdXQobXMpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlZCgpLFxuICAgICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSksXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQ7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY0dWdVpHbHVaeTF5WlhGMVpYTjBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5d1pXNWthVzVuTFhKbGNYVmxjM1F1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlMwRTdPMGRCUlVjN1FVRkRTQ3hOUVVGTkxFOUJRVThzWTBGQll6dEpRV0Y2UWp0UlFVTkZMRWxCUVVrc1EwRkJReXd5UWtGQk1rSXNSMEZCUnl4SlFVRkpMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJUdFpRVU4yUkN4SlFVRkpMRU5CUVVNc2EwTkJRV3RETEVkQlFVY3NUMEZCVHl4RFFVRkRPMUZCUTNCRUxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NTVUZCU1N4RFFVRkRMQ3RDUVVFclFpeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRek5FTEVsQlFVa3NRMEZCUXl4elEwRkJjME1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEZUVRc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFRDeERRVUZETzBsQlEwMHNVVUZCVVR0UlFVTmlMRTlCUVU4c1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF6dFpRVU5xUWl4SlFVRkpMRU5CUVVNc01rSkJRVEpDTzFsQlEyaERMRWxCUVVrc1EwRkJReXdyUWtGQkswSTdVMEZEY2tNc1EwRkJReXhEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZFT3pzN08wOUJTVWM3U1VGRFNTeExRVUZMTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU1zUlVGQlJUdFJRVU51UXl4TlFVRk5MRkZCUVZFc1IwRkJSeXhOUVVGTkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZEYkVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJUdFpRVU5tTEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRkxFTkJRVU1zVlVGQlZTeERRVUZETEU5QlFVOHNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRUUVVOb1JDeERRVUZETEVOQlFVTTdVVUZEU0N4UFFVRlBMRkZCUVZFc1EwRkJRenRKUVVOc1FpeERRVUZETzBOQlEwWWlmUT09IiwiaW1wb3J0IHsgUmVzcG9uc2VCb2R5TGlzdGVuZXIgfSBmcm9tIFwiLi9yZXNwb25zZS1ib2R5LWxpc3RlbmVyXCI7XG4vKipcbiAqIFRpZXMgdG9nZXRoZXIgdGhlIHR3byBzZXBhcmF0ZSBldmVudHMgdGhhdCB0b2dldGhlciBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCBib3RoIHJlc3BvbnNlIGhlYWRlcnMgYW5kIGJvZHlcbiAqL1xuZXhwb3J0IGNsYXNzIFBlbmRpbmdSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlZEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25Db21wbGV0ZWRFdmVudERldGFpbHMgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkUmVzcG9uc2VSZXNwb25zZUJvZHlMaXN0ZW5lcihkZXRhaWxzKSB7XG4gICAgICAgIHRoaXMucmVzcG9uc2VCb2R5TGlzdGVuZXIgPSBuZXcgUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscyk7XG4gICAgfVxuICAgIHJlc29sdmVkKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsXG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVkRXZlbnREZXRhaWxzLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWl0aGVyIHJldHVybnMgb3IgdGltZXMgb3V0IGFuZCByZXR1cm5zIHVuZGVmaW5lZCBvclxuICAgICAqIHJldHVybnMgdGhlIHJlc3VsdHMgZnJvbSByZXNvbHZlZCgpIGFib3ZlXG4gICAgICogQHBhcmFtIG1zXG4gICAgICovXG4gICAgYXN5bmMgcmVzb2x2ZWRXaXRoaW5UaW1lb3V0KG1zKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZWQoKSxcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxeVpYTndiMjV6WlM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZjR1Z1WkdsdVp5MXlaWE53YjI1elpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZKUVN4UFFVRlBMRVZCUVVVc2IwSkJRVzlDTEVWQlFVVXNUVUZCVFN3d1FrRkJNRUlzUTBGQlF6dEJRVVZvUlRzN1IwRkZSenRCUVVOSUxFMUJRVTBzVDBGQlR5eGxRVUZsTzBsQll6RkNPMUZCUTBVc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlEzWkVMRWxCUVVrc1EwRkJReXhyUTBGQmEwTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRjRVFzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4SlFVRkpMRU5CUVVNc2RVSkJRWFZDTEVkQlFVY3NTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRGJrUXNTVUZCU1N4RFFVRkRMRGhDUVVFNFFpeEhRVUZITEU5QlFVOHNRMEZCUXp0UlFVTm9SQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5NTEVOQlFVTTdTVUZEVFN3clFrRkJLMElzUTBGRGNFTXNUMEZCT0VNN1VVRkZPVU1zU1VGQlNTeERRVUZETEc5Q1FVRnZRaXhIUVVGSExFbEJRVWtzYjBKQlFXOUNMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRGFFVXNRMEZCUXp0SlFVTk5MRkZCUVZFN1VVRkRZaXhQUVVGUExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTTdXVUZEYWtJc1NVRkJTU3hEUVVGRExESkNRVUV5UWp0WlFVTm9ReXhKUVVGSkxFTkJRVU1zZFVKQlFYVkNPMU5CUXpkQ0xFTkJRVU1zUTBGQlF6dEpRVU5NTEVOQlFVTTdTVUZGUkRzN096dFBRVWxITzBsQlEwa3NTMEZCU3l4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVWQlFVVTdVVUZEYmtNc1RVRkJUU3hSUVVGUkxFZEJRVWNzVFVGQlRTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTJ4RExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZEWml4SlFVRkpMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEZWQlFWVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03VTBGRGFFUXNRMEZCUXl4RFFVRkRPMUZCUTBnc1QwRkJUeXhSUVVGUkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0RFFVTkdJbjA9IiwiaW1wb3J0IHsgc2hhMjU2QnVmZmVyIH0gZnJvbSBcIi4vc2hhMjU2XCI7XG5leHBvcnQgY2xhc3MgUmVzcG9uc2VCb2R5TGlzdGVuZXIge1xuICAgIGNvbnN0cnVjdG9yKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZXNwb25zZUJvZHkgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVJlc3BvbnNlQm9keSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRlbnRIYXNoID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVDb250ZW50SGFzaCA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBVc2VkIHRvIHBhcnNlIFJlc3BvbnNlIHN0cmVhbVxuICAgICAgICBjb25zdCBmaWx0ZXIgPSBicm93c2VyLndlYlJlcXVlc3QuZmlsdGVyUmVzcG9uc2VEYXRhKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpO1xuICAgICAgICAvLyBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIGxldCByZXNwb25zZUJvZHkgPSBcIlwiO1xuICAgICAgICBmaWx0ZXIub25kYXRhID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgc2hhMjU2QnVmZmVyKGV2ZW50LmRhdGEpLnRoZW4oZGlnZXN0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVDb250ZW50SGFzaChkaWdlc3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBzdHIgPSBkZWNvZGVyLmRlY29kZShldmVudC5kYXRhLCB7IHN0cmVhbTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJlc3BvbnNlQm9keSA9IHJlc3BvbnNlQm9keSArIHN0cjtcbiAgICAgICAgICAgIC8vIHBhc3MgdGhyb3VnaCBhbGwgdGhlIHJlc3BvbnNlIGRhdGFcbiAgICAgICAgICAgIGZpbHRlci53cml0ZShldmVudC5kYXRhKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsdGVyLm9uc3RvcCA9IF9ldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVSZXNwb25zZUJvZHkocmVzcG9uc2VCb2R5KTtcbiAgICAgICAgICAgIGZpbHRlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGdldFJlc3BvbnNlQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzcG9uc2VCb2R5O1xuICAgIH1cbiAgICBhc3luYyBnZXRDb250ZW50SGFzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudEhhc2g7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY21WemNHOXVjMlV0WW05a2VTMXNhWE4wWlc1bGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2Y21WemNHOXVjMlV0WW05a2VTMXNhWE4wWlc1bGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZEUVN4UFFVRlBMRVZCUVVVc1dVRkJXU3hGUVVGRkxFMUJRVTBzVlVGQlZTeERRVUZETzBGQlJYaERMRTFCUVUwc1QwRkJUeXh2UWtGQmIwSTdTVUZOTDBJc1dVRkJXU3hQUVVFNFF6dFJRVU40UkN4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTNoRExFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGNrTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRM1pETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEY0VNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRlNDeG5RMEZCWjBNN1VVRkRhRU1zVFVGQlRTeE5RVUZOTEVkQlFWRXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhyUWtGQmEwSXNRMEZEZGtRc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGRFdDeERRVUZETzFGQlJWUXNUVUZCVFN4UFFVRlBMRWRCUVVjc1NVRkJTU3hYUVVGWExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEZWtNc2NVTkJRWEZETzFGQlJYSkRMRWxCUVVrc1dVRkJXU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU4wUWl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlEzUkNMRmxCUVZrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRk8yZENRVU55UXl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1dVRkRiRU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4TlFVRk5MRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJSU3hOUVVGTkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTjZSQ3haUVVGWkxFZEJRVWNzV1VGQldTeEhRVUZITEVkQlFVY3NRMEZCUXp0WlFVTnNReXh4UTBGQmNVTTdXVUZEY2tNc1RVRkJUU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRNMElzUTBGQlF5eERRVUZETzFGQlJVWXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU1zUlVGQlJUdFpRVU4yUWl4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1dVRkRka01zVFVGQlRTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMUZCUTNSQ0xFTkJRVU1zUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVFN4TFFVRkxMRU5CUVVNc1pVRkJaVHRSUVVNeFFpeFBRVUZQTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNN1NVRkRNMElzUTBGQlF6dEpRVVZOTEV0QlFVc3NRMEZCUXl4alFVRmpPMUZCUTNwQ0xFOUJRVThzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0SlFVTXhRaXhEUVVGRE8wTkJRMFlpZlE9PSIsIi8qKlxuICogQ29kZSBvcmlnaW5hbGx5IGZyb20gdGhlIGV4YW1wbGUgYXRcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TdWJ0bGVDcnlwdG8vZGlnZXN0XG4gKlxuICogTm90ZTogVXNpbmcgU0hBMjU2IGluc3RlYWQgb2YgdGhlIHByZXZpb3VzbHkgdXNlZCBNRDUgZHVlIHRvXG4gKiB0aGUgZm9sbG93aW5nIGNvbW1lbnQgZm91bmQgYXQgdGhlIGRvY3VtZW50YXRpb24gcGFnZSBsaW5rZWQgYWJvdmU6XG4gKlxuICogV2FybmluZzogT2xkZXIgaW5zZWN1cmUgaGFzaCBmdW5jdGlvbnMsIGxpa2UgTUQ1LCBhcmUgbm90IHN1cHBvcnRlZFxuICogYnkgdGhpcyBtZXRob2QuIEV2ZW4gYSBzdXBwb3J0ZWQgbWV0aG9kLCBTSEEtMSwgaXMgY29uc2lkZXJlZCB3ZWFrLFxuICogaGFzIGJlZW4gYnJva2VuIGFuZCBzaG91bGQgYmUgYXZvaWRlZCBmb3IgY3J5cHRvZ3JhcGhpYyBhcHBsaWNhdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGEyNTYoc3RyKSB7XG4gICAgLy8gV2UgdHJhbnNmb3JtIHRoZSBzdHJpbmcgaW50byBhbiBhcnJheWJ1ZmZlci5cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoc3RyKTtcbiAgICByZXR1cm4gc2hhMjU2QnVmZmVyKGJ1ZmZlcik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hhMjU2QnVmZmVyKGJ1ZmZlcikge1xuICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmRpZ2VzdChcIlNIQS0yNTZcIiwgYnVmZmVyKS50aGVuKGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIHJldHVybiBoZXgoaGFzaCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoZXgoYnVmZmVyKSB7XG4gICAgY29uc3QgaGV4Q29kZXMgPSBbXTtcbiAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWV3LmJ5dGVMZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAvLyBVc2luZyBnZXRVaW50MzIgcmVkdWNlcyB0aGUgbnVtYmVyIG9mIGl0ZXJhdGlvbnMgbmVlZGVkICh3ZSBwcm9jZXNzIDQgYnl0ZXMgZWFjaCB0aW1lKVxuICAgICAgICBjb25zdCB2YWx1ZSA9IHZpZXcuZ2V0VWludDMyKGkpO1xuICAgICAgICAvLyB0b1N0cmluZygxNikgd2lsbCBnaXZlIHRoZSBoZXggcmVwcmVzZW50YXRpb24gb2YgdGhlIG51bWJlciB3aXRob3V0IHBhZGRpbmdcbiAgICAgICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygxNik7XG4gICAgICAgIC8vIFdlIHVzZSBjb25jYXRlbmF0aW9uIGFuZCBzbGljZSBmb3IgcGFkZGluZ1xuICAgICAgICBjb25zdCBwYWRkaW5nID0gXCIwMDAwMDAwMFwiO1xuICAgICAgICBjb25zdCBwYWRkZWRWYWx1ZSA9IChwYWRkaW5nICsgc3RyaW5nVmFsdWUpLnNsaWNlKC1wYWRkaW5nLmxlbmd0aCk7XG4gICAgICAgIGhleENvZGVzLnB1c2gocGFkZGVkVmFsdWUpO1xuICAgIH1cbiAgICAvLyBKb2luIGFsbCB0aGUgaGV4IHN0cmluZ3MgaW50byBvbmVcbiAgICByZXR1cm4gaGV4Q29kZXMuam9pbihcIlwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyaGhNalUyTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXphR0V5TlRZdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN096czdPenM3UjBGVlJ6dEJRVVZJTEUxQlFVMHNWVUZCVlN4TlFVRk5MRU5CUVVNc1IwRkJSenRKUVVONFFpd3JRMEZCSzBNN1NVRkRMME1zVFVGQlRTeE5RVUZOTEVkQlFVY3NTVUZCU1N4WFFVRlhMRVZCUVVVc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZETjBNc1QwRkJUeXhaUVVGWkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdRVUZET1VJc1EwRkJRenRCUVVWRUxFMUJRVTBzVlVGQlZTeFpRVUZaTEVOQlFVTXNUVUZCVFR0SlFVTnFReXhQUVVGUExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNWVUZCVXl4SlFVRkpPMUZCUXk5RUxFOUJRVThzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTI1Q0xFTkJRVU1zUTBGQlF5eERRVUZETzBGQlEwd3NRMEZCUXp0QlFVVkVMRk5CUVZNc1IwRkJSeXhEUVVGRExFMUJRVTA3U1VGRGFrSXNUVUZCVFN4UlFVRlJMRWRCUVVjc1JVRkJSU3hEUVVGRE8wbEJRM0JDTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1VVRkJVU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETzBsQlEyeERMRXRCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdVVUZETTBNc2VVWkJRWGxHTzFGQlEzcEdMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRhRU1zT0VWQlFUaEZPMUZCUXpsRkxFMUJRVTBzVjBGQlZ5eEhRVUZITEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRGRrTXNOa05CUVRaRE8xRkJRemRETEUxQlFVMHNUMEZCVHl4SFFVRkhMRlZCUVZVc1EwRkJRenRSUVVNelFpeE5RVUZOTEZkQlFWY3NSMEZCUnl4RFFVRkRMRTlCUVU4c1IwRkJSeXhYUVVGWExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRGJrVXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dExRVU0xUWp0SlFVVkVMRzlEUVVGdlF6dEpRVU53UXl4UFFVRlBMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdRVUZETTBJc1EwRkJReUo5IiwiZXhwb3J0IGZ1bmN0aW9uIGVuY29kZV91dGY4KHMpIHtcbiAgICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcbn1cbmV4cG9ydCBjb25zdCBlc2NhcGVTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgLy8gQ29udmVydCB0byBzdHJpbmcgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHR5cGVvZiBzdHIgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZV91dGY4KHN0cik7XG59O1xuZXhwb3J0IGNvbnN0IGVzY2FwZVVybCA9IGZ1bmN0aW9uICh1cmwsIHN0cmlwRGF0YVVybERhdGEgPSB0cnVlKSB7XG4gICAgdXJsID0gZXNjYXBlU3RyaW5nKHVybCk7XG4gICAgLy8gZGF0YTpbPG1lZGlhdHlwZT5dWztiYXNlNjRdLDxkYXRhPlxuICAgIGlmICh1cmwuc3Vic3RyKDAsIDUpID09PSBcImRhdGE6XCIgJiZcbiAgICAgICAgc3RyaXBEYXRhVXJsRGF0YSAmJlxuICAgICAgICB1cmwuaW5kZXhPZihcIixcIikgPiAtMSkge1xuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyKDAsIHVybC5pbmRleE9mKFwiLFwiKSArIDEpICsgXCI8ZGF0YS1zdHJpcHBlZD5cIjtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbn07XG5leHBvcnQgY29uc3QgYm9vbFRvSW50ID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICByZXR1cm4gYm9vbCA/IDEgOiAwO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMzUnlhVzVuTFhWMGFXeHpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5emRISnBibWN0ZFhScGJITXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1RVRkJUU3hWUVVGVkxGZEJRVmNzUTBGQlF5eERRVUZETzBsQlF6TkNMRTlCUVU4c1VVRkJVU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGVrTXNRMEZCUXp0QlFVVkVMRTFCUVUwc1EwRkJReXhOUVVGTkxGbEJRVmtzUjBGQlJ5eFZRVUZUTEVkQlFWRTdTVUZETTBNc2FVTkJRV2xETzBsQlEycERMRWxCUVVrc1QwRkJUeXhIUVVGSExFbEJRVWtzVVVGQlVTeEZRVUZGTzFGQlF6RkNMRWRCUVVjc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdTMEZEYmtJN1NVRkZSQ3hQUVVGUExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0QlFVTXhRaXhEUVVGRExFTkJRVU03UVVGRlJpeE5RVUZOTEVOQlFVTXNUVUZCVFN4VFFVRlRMRWRCUVVjc1ZVRkRka0lzUjBGQlZ5eEZRVU5ZTEcxQ1FVRTBRaXhKUVVGSk8wbEJSV2hETEVkQlFVY3NSMEZCUnl4WlFVRlpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03U1VGRGVFSXNjVU5CUVhGRE8wbEJRM0pETEVsQlEwVXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVc3NUMEZCVHp0UlFVTTFRaXhuUWtGQlowSTdVVUZEYUVJc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkRja0k3VVVGRFFTeEhRVUZITEVkQlFVY3NSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFVkJRVVVzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eHBRa0ZCYVVJc1EwRkJRenRMUVVNdlJEdEpRVU5FTEU5QlFVOHNSMEZCUnl4RFFVRkRPMEZCUTJJc1EwRkJReXhEUVVGRE8wRkJSVVlzVFVGQlRTeERRVUZETEUxQlFVMHNVMEZCVXl4SFFVRkhMRlZCUVZNc1NVRkJZVHRKUVVNM1F5eFBRVUZQTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEZEVJc1EwRkJReXhEUVVGREluMD0iLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1iaXR3aXNlICovXG4vLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMjZ2lzdGNvbW1lbnQtMjQwMzM2OVxuY29uc3QgaGV4ID0gW107XG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgaGV4W2ldID0gKGkgPCAxNiA/IFwiMFwiIDogXCJcIikgKyBpLnRvU3RyaW5nKDE2KTtcbn1cbmV4cG9ydCBjb25zdCBtYWtlVVVJRCA9ICgpID0+IHtcbiAgICBjb25zdCByID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxNikpO1xuICAgIHJbNl0gPSAocls2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICByWzhdID0gKHJbOF0gJiAweDNmKSB8IDB4ODA7XG4gICAgcmV0dXJuIChoZXhbclswXV0gK1xuICAgICAgICBoZXhbclsxXV0gK1xuICAgICAgICBoZXhbclsyXV0gK1xuICAgICAgICBoZXhbclszXV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzRdXSArXG4gICAgICAgIGhleFtyWzVdXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbNl1dICtcbiAgICAgICAgaGV4W3JbN11dICtcbiAgICAgICAgXCItXCIgK1xuICAgICAgICBoZXhbcls4XV0gK1xuICAgICAgICBoZXhbcls5XV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzEwXV0gK1xuICAgICAgICBoZXhbclsxMV1dICtcbiAgICAgICAgaGV4W3JbMTJdXSArXG4gICAgICAgIGhleFtyWzEzXV0gK1xuICAgICAgICBoZXhbclsxNF1dICtcbiAgICAgICAgaGV4W3JbMTVdXSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhWcFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2ZFhWcFpDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN3clFrRkJLMEk3UVVGRkwwSXNPRVJCUVRoRU8wRkJRemxFTEUxQlFVMHNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJRenRCUVVWbUxFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdTVUZETlVJc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPME5CUXk5RE8wRkJSVVFzVFVGQlRTeERRVUZETEUxQlFVMHNVVUZCVVN4SFFVRkhMRWRCUVVjc1JVRkJSVHRKUVVNelFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFbEJRVWtzVlVGQlZTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkZja1FzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVNMVFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJSVFZDTEU5QlFVOHNRMEZEVEN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5VTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRFZpeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMVlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOV0xFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRWaXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTFZc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVTllMRU5CUVVNN1FVRkRTaXhEUVVGRExFTkJRVU1pZlE9PSIsIi8vIGh0dHBzOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9GaWVsZF9TeW1ib2xfVGFibGVcbmV4cG9ydCBjb25zdCBkYXRlVGltZVVuaWNvZGVGb3JtYXRTdHJpbmcgPSBcInl5eXktTU0tZGQnVCdISDptbTpzcy5TU1NYWFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJOb1pXMWhMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwzTmphR1Z0WVM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkpRU3dyUlVGQkswVTdRVUZETDBVc1RVRkJUU3hEUVVGRExFMUJRVTBzTWtKQlFUSkNMRWRCUVVjc05rSkJRVFpDTEVOQlFVTWlmUT09Il0sInNvdXJjZVJvb3QiOiIifQ==