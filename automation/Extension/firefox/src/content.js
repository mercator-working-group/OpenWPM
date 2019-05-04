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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWluc3RydW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9jb29raWUtaW5zdHJ1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSzlELE1BQU0sQ0FBQyxNQUFNLHlDQUF5QyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxFQUFzQixDQUFDO0lBRWhELDJCQUEyQjtJQUMzQixzREFBc0Q7SUFDdEQscURBQXFEO0lBQ3JELHlEQUF5RDtJQUN6RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCO0lBQzVELElBQUksZ0JBQWdCLENBQUM7SUFDckIsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNyRCxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztLQUMvQztTQUFNO1FBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQzVFLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNqRDtJQUNELGdCQUFnQixDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV4RCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxnQkFBZ0IsQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUUsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekQsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFdkQsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCLFlBQVksWUFBWTtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRU0sR0FBRyxDQUFDLE9BQU87UUFDaEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsVUFPL0IsRUFBRSxFQUFFO1lBQ0gsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUN0RSxNQUFNLE1BQU0sR0FBMkI7Z0JBQ3JDLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixZQUFZLEVBQUUsVUFBVSxDQUFDLEtBQUs7Z0JBQzlCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixzQkFBc0IsRUFBRSxvQkFBb0I7Z0JBQzVDLGFBQWEsRUFBRSx1QkFBdUIsRUFBRTtnQkFDeEMsR0FBRyx5Q0FBeUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2FBQ2hFLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTztRQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxNQUFNLEdBQTJCO2dCQUNyQyxXQUFXLEVBQUUsZUFBZTtnQkFDNUIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLHNCQUFzQixFQUFFLG9CQUFvQjtnQkFDNUMsR0FBRyx5Q0FBeUMsQ0FBQyxNQUFNLENBQUM7YUFDckQsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztDQUNGIn0=

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
        this.configured = false;
        this.pendingRecords = [];
        this.dataReceiver = dataReceiver;
    }
    /**
     * Converts received call and values data from the JS Instrumentation
     * into the format that the schema expects.
     * @param data
     * @param sender
     */
    static processCallsAndValues(data, sender) {
        const update = {};
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
        return update;
    }
    /**
     * Start listening for messages from page/content/background scripts injected to instrument JavaScript APIs
     */
    listen() {
        this.onMessageListener = (message, sender) => {
            // console.debug("javascript-instrumentation background listener", {message, sender}, this.configured);
            if (message.namespace &&
                message.namespace === "javascript-instrumentation") {
                this.handleJsInstrumentationMessage(message, sender);
            }
        };
        browser.runtime.onMessage.addListener(this.onMessageListener);
    }
    /**
     * Either sends the log data to the dataReceiver or store it in memory
     * as a pending record if the JS instrumentation is not yet configured
     * @param message
     * @param sender
     */
    handleJsInstrumentationMessage(message, sender) {
        switch (message.type) {
            case "logCall":
            case "logValue":
                const update = JavascriptInstrument.processCallsAndValues(message.data, sender);
                if (this.configured) {
                    update.crawl_id = this.crawlID;
                    this.dataReceiver.saveRecord("javascript", update);
                }
                else {
                    this.pendingRecords.push(update);
                }
                break;
        }
    }
    /**
     * Starts listening if haven't done so already, sets the crawl ID,
     * marks the JS instrumentation as configured and sends any pending
     * records that have been received up until this point.
     * @param crawlID
     */
    run(crawlID) {
        if (!this.onMessageListener) {
            this.listen();
        }
        this.crawlID = crawlID;
        this.configured = true;
        this.pendingRecords.map(update => {
            update.crawl_id = this.crawlID;
            this.dataReceiver.saveRecord("javascript", update);
        });
    }
    cleanup() {
        this.pendingRecords = [];
        if (this.onMessageListener) {
            browser.runtime.onMessage.removeListener(this.onMessageListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3pFLE1BQU0sT0FBTyxvQkFBb0I7SUE0Qy9CLFlBQVksWUFBWTtRQUpoQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQTBCLEVBQUUsQ0FBQztRQUlqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBN0NEOzs7OztPQUtHO0lBQ0ssTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxNQUFxQjtRQUM5RCxNQUFNLE1BQU0sR0FBRyxFQUF5QixDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNyRCxNQUFNLENBQUMsYUFBYSxHQUFHLHVCQUF1QixFQUFFLENBQUM7UUFDakQsTUFBTSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFdB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

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
/* harmony import */ var _lib_instrument_fingerprinting_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/instrument-fingerprinting-apis */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/instrument-fingerprinting-apis.js");
/* harmony import */ var _lib_js_instruments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/js-instruments */ "./node_modules/openwpm-webext-instrumentation/build/module/lib/js-instruments.js");
/* harmony import */ var _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./javascript-instrument-page-scope */ "./node_modules/openwpm-webext-instrumentation/build/module/content/javascript-instrument-page-scope.js");



function getPageScriptAsString() {
    return (_lib_js_instruments__WEBPACK_IMPORTED_MODULE_1__["jsInstruments"] +
        "\n" +
        _lib_instrument_fingerprinting_apis__WEBPACK_IMPORTED_MODULE_0__["instrumentFingerprintingApis"] +
        "\n" +
        "(" +
        _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_2__["pageScript"] +
        "({jsInstruments, instrumentFingerprintingApis}));");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWhFLFNBQVMscUJBQXFCO0lBQzVCLE9BQU8sQ0FDTCxhQUFhO1FBQ2IsSUFBSTtRQUNKLDRCQUE0QjtRQUM1QixJQUFJO1FBQ0osR0FBRztRQUNILFVBQVU7UUFDVixtREFBbUQsQ0FDcEQsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSTtJQUM5QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxFQUNyQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUVyQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUN0QixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqRTtJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRztJQUN4QixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDMUIsU0FBUyxFQUFFLDRCQUE0QjtRQUN2QyxJQUFJO1FBQ0osSUFBSSxFQUFFLEdBQUc7S0FDVixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRS9CLDZEQUE2RDtBQUM3RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVMsQ0FBYztJQUNwRSx1Q0FBdUM7SUFDdkMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN0QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUc7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTTtRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLG9DQUFvQyxDQUFDLE9BQU8sR0FBRyxLQUFLO0lBQ2xFLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1FBQ3BDLFFBQVE7UUFDUixPQUFPO0tBQ1IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9

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
// Code below is not a content script: no Firefox APIs should be used
// Also, no webpack/es6 imports may be used in this file since the script
// is exported as a page script as a string
const pageScript = function ({ jsInstruments, }) {
    // messages the injected script
    function sendMessagesToLogger($event_id, messages) {
        document.dispatchEvent(new CustomEvent($event_id, {
            detail: messages,
        }));
    }
    const event_id = document.currentScript.getAttribute("data-event-id");
    const { instrumentObject, 
    // instrumentObjectProperty,
    logCall, } = jsInstruments(event_id, sendMessagesToLogger);
    const testing = document.currentScript.getAttribute("data-testing") === "true";
    if (testing) {
        console.log("OpenWPM: Currently testing");
        window.instrumentObject = instrumentObject;
    }
    /**
     * Prebid.js
     */
    const waitUntil = evaluator => {
        return new Promise(function (resolve) {
            const now = Date.now();
            /**
             * Note: Since best practice for scripts consuming Prebid.js is
             * to set up an window.pbjs object and window.pbjs.que array even
             * before pbjs loads, we can't simply wait for window.pbjs,
             * but instead wait for window.pbjs.onEvent, which only gets set
             * once Prebid.js has loaded.
             */
            function check() {
                if (evaluator()) {
                    return resolve();
                }
                else {
                    // Keep checking for 10 seconds
                    if (Date.now() - now < 10000) {
                        setTimeout(check, 10);
                    }
                    else {
                        console.log("Stopped checking for Prebid.js loading in a frame (10s have passed)");
                    }
                }
            }
            check();
        });
    };
    /**
     * Helper functions to wait for Prebid.js to be available
     *
     * Note: Since best practice for scripts consuming Prebid.js is
     * to set up an window.pbjs object and window.pbjs.que array even
     * before pbjs loads, we can't simply wait for window.pbjs,
     * but instead wait for window.pbjs.onEvent, which only gets set
     * once Prebid.js has loaded.
     */
    const prebidJsPlaceholderAvailable = waitUntil(() => typeof window.pbjs !== "undefined");
    const prebidJsAvailable = waitUntil(() => typeof window.pbjs !== "undefined" &&
        typeof window.pbjs.onEvent !== "undefined");
    let currentlyInstrumentedPbjsVersion;
    prebidJsPlaceholderAvailable.then(function () {
        console.log("Prebid.js placeholder available - instrumenting...");
        currentlyInstrumentedPbjsVersion =
            window.pbjs.version !== undefined
                ? String(window.pbjs.version)
                : "placeholder";
        // Instrument access to object properties and functions
        const objectName = "pbjs<" + currentlyInstrumentedPbjsVersion + ">";
        instrumentObject(window.pbjs, objectName, {});
    });
    prebidJsAvailable.then(function () {
        if (currentlyInstrumentedPbjsVersion === window.pbjs.version) {
            return;
        }
        console.log("Prebid.js loaded and different from what we previously instrumenting - instrumenting anew...");
        currentlyInstrumentedPbjsVersion = window.pbjs.version;
        const objectName = "pbjs<" + currentlyInstrumentedPbjsVersion + ">";
        // Instrument events (Hack, since OpenWPM does not support instrumentation of events currently)
        const instrumentPrebidJsEvent = eventReference => {
            const handler = event => {
                // console.log("Prebid.js event", { eventReference, event }, arguments);
                /*
                Most don't, but some events contains some information about it's call context:
                canonicalUrl: undefined​​​
                numIframes: ​​​0
                reachedTop: true
                referer: "http://localtest.me:8000/test_pages/prebidjs.html"​​
                stack: (1) […]​​​​
                0: "http://localtest.me:8000/test_pages/prebidjs.html"
                length: 1
                */
                const refererInfo = event.refererInfo && event.refererInfo.referer
                    ? event.refererInfo.referer
                    : null;
                const canonicalUrl = event.canonicalUrl
                    ? event.refererInfo.canonicalUrl
                    : null;
                const callContext = {
                    scriptUrl: refererInfo !== null
                        ? refererInfo
                        : canonicalUrl !== null
                            ? canonicalUrl
                            : "",
                    scriptLine: "",
                    scriptCol: "",
                    funcName: "",
                    scriptLocEval: "",
                    callStack: "",
                };
                try {
                    logCall("event:" +
                        objectName +
                        ":" +
                        eventReference, [event], callContext, {});
                }
                catch (err) {
                    console.log("Error occurred when handling event: ", err.message, err.stack);
                }
            };
            window.pbjs.onEvent(eventReference, handler);
        };
        [
            "auctionInit",
            "auctionEnd",
            "bidAdjustment",
            "bidTimeout",
            "bidRequested",
            "bidResponse",
            "bidWon",
            "setTargeting",
            "requestBids",
            "addAdUnits",
            "adRenderFailed",
            "bidderDone",
        ].map(instrumentPrebidJsEvent);
        // Instrument access to object properties and functions
        instrumentObject(window.pbjs, objectName, {});
    });
    /*
     * Start Instrumentation
     */
    // TODO: user should be able to choose what to instrument
    // instrumentFingerprintingApis({ instrumentObjectProperty, instrumentObject });
    if (testing) {
        console.log("OpenWPM: Content-side javascript instrumentation started", new Date().toISOString());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxRUFBcUU7QUFDckUseUVBQXlFO0FBQ3pFLDJDQUEyQztBQUUzQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsVUFBUyxFQUNqQyxhQUFhLEdBRWQ7SUFDQywrQkFBK0I7SUFDL0IsU0FBUyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsUUFBUTtRQUMvQyxRQUFRLENBQUMsYUFBYSxDQUNwQixJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDekIsTUFBTSxFQUFFLFFBQVE7U0FDakIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFdEUsTUFBTSxFQUNKLGdCQUFnQjtJQUNoQiw0QkFBNEI7SUFDNUIsT0FBTyxHQUNSLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBRWxELE1BQU0sT0FBTyxHQUNYLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUNqRSxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN6QyxNQUFjLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7S0FDckQ7SUFFRDs7T0FFRztJQUNILE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxFQUFFO1FBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2Qjs7Ozs7O2VBTUc7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

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

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/instrument-fingerprinting-apis.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/instrument-fingerprinting-apis.js ***!
  \********************************************************************************************************/
/*! exports provided: instrumentFingerprintingApis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instrumentFingerprintingApis", function() { return instrumentFingerprintingApis; });
function instrumentFingerprintingApis({ instrumentObjectProperty, instrumentObject, }) {
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
    navigatorProperties.forEach(function (property) {
        instrumentObjectProperty(window.navigator, "window.navigator", property);
    });
    // Access to screen properties
    // instrumentObject(window.screen, "window.screen");
    // TODO: why do we instrument only two screen properties
    const screenProperties = ["pixelDepth", "colorDepth"];
    screenProperties.forEach(function (property) {
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
        pluginProperties.forEach(function (property) {
            instrumentObjectProperty(window.navigator.plugins[pluginName], "window.navigator.plugins[" + pluginName + "]", property);
        });
    }
    // Access to MIMETypes
    const mimeTypeProperties = ["description", "suffixes", "type"];
    for (let i = 0; i < window.navigator.mimeTypes.length; i++) {
        const mimeTypeName = window.navigator.mimeTypes[i].type; // note: upstream typings seems to be incorrect
        mimeTypeProperties.forEach(function (property) {
            instrumentObjectProperty(window.navigator.mimeTypes[mimeTypeName], "window.navigator.mimeTypes[" + mimeTypeName + "]", property);
        });
    }
    // Name, localStorage, and sessionsStorage logging
    // Instrumenting window.localStorage directly doesn't seem to work, so the Storage
    // prototype must be instrumented instead. Unfortunately this fails to differentiate
    // between sessionStorage and localStorage. Instead, you'll have to look for a sequence
    // of a get for the localStorage object followed by a getItem/setItem for the Storage object.
    const windowProperties = ["name", "localStorage", "sessionStorage"];
    windowProperties.forEach(function (property) {
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
    instrumentObject(window.CanvasRenderingContext2D.prototype, "CanvasRenderingContext2D", { excludedProperties });
    // Access to webRTC
    instrumentObject(window.RTCPeerConnection.prototype, "RTCPeerConnection");
    // Access to Audio API
    instrumentObject(window.AudioContext.prototype, "AudioContext");
    instrumentObject(window.OfflineAudioContext.prototype, "OfflineAudioContext");
    instrumentObject(window.OscillatorNode.prototype, "OscillatorNode");
    instrumentObject(window.AnalyserNode.prototype, "AnalyserNode");
    instrumentObject(window.GainNode.prototype, "GainNode");
    instrumentObject(window.ScriptProcessorNode.prototype, "ScriptProcessorNode");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdHJ1bWVudC1maW5nZXJwcmludGluZy1hcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pbnN0cnVtZW50LWZpbmdlcnByaW50aW5nLWFwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLDRCQUE0QixDQUFDLEVBQzNDLHdCQUF3QixFQUN4QixnQkFBZ0IsR0FDakI7SUFDQyxpQ0FBaUM7SUFDakMsTUFBTSxtQkFBbUIsR0FBRztRQUMxQixhQUFhO1FBQ2IsU0FBUztRQUNULFlBQVk7UUFDWixTQUFTO1FBQ1QsZUFBZTtRQUNmLFlBQVk7UUFDWixhQUFhO1FBQ2IsVUFBVTtRQUNWLFdBQVc7UUFDWCxRQUFRO1FBQ1IsT0FBTztRQUNQLFVBQVU7UUFDVixTQUFTO1FBQ1QsWUFBWTtRQUNaLFdBQVc7UUFDWCxXQUFXO1FBQ1gsUUFBUTtLQUNULENBQUM7SUFDRixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRO1FBQzNDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCxNQUFNLGdCQUFnQixHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3RELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7UUFDeEMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFFSCxvQkFBb0I7SUFDcEIsTUFBTSxnQkFBZ0IsR0FBRztRQUN2QixNQUFNO1FBQ04sVUFBVTtRQUNWLGFBQWE7UUFDYixTQUFTO1FBQ1QsUUFBUTtLQUNULENBQUM7SUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFB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

/***/ }),

/***/ "./node_modules/openwpm-webext-instrumentation/build/module/lib/js-instruments.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/openwpm-webext-instrumentation/build/module/lib/js-instruments.js ***!
  \****************************************************************************************/
/*! exports provided: jsInstruments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsInstruments", function() { return jsInstruments; });
// Intrumentation injection code is based on privacybadgerfirefox
// https://github.com/EFForg/privacybadgerfirefox/blob/master/data/fingerprinting.js
function jsInstruments(event_id, sendMessagesToLogger) {
    /*
     * Instrumentation helpers
     * (Inlined in order for jsInstruments to be easily exportable as a string)
     */
    // debounce - from Underscore v1.6.0
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
    /*
     * Direct instrumentation of javascript objects
     */
    const sendFactory = function ($event_id, $sendMessagesToLogger) {
        let messages = [];
        // debounce sending queued messages
        const _send = debounce(function () {
            $sendMessagesToLogger($event_id, messages);
            // clear the queue
            messages = [];
        }, 100);
        return function (msgType, msg) {
            // queue the message
            messages.push({ type: msgType, content: msg });
            _send();
        };
    };
    const send = sendFactory(event_id, sendMessagesToLogger);
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
    function logErrorToConsole(error) {
        console.log("OpenWPM: Error name: " + error.name);
        console.log("OpenWPM: Error message: " + error.message);
        console.log("OpenWPM: Error filename: " + error.fileName);
        console.log("OpenWPM: Error line number: " + error.lineNumber);
        console.log("OpenWPM: Error stack: " + error.stack);
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
    return {
        instrumentObject,
        instrumentObjectProperty,
        instrumentFunction,
        logCall,
        logValue,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtaW5zdHJ1bWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2pzLWluc3RydW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlFQUFpRTtBQUNqRSxvRkFBb0Y7QUEwQnBGLE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQjtJQUMxRDs7O09BR0c7SUFFSCxvQ0FBb0M7SUFDcEMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUcsS0FBSztRQUM3QyxJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7UUFFOUMsTUFBTSxLQUFLLEdBQUc7WUFDWixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDZixPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ3ZCO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUFFRixPQUFPO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksR0FBRyxTQUFTLENBQUM7WUFDakIsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixNQUFNLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUss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

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29udGVudC5qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9iYWNrZ3JvdW5kL2Nvb2tpZS1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvaHR0cC1wb3N0LXBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvaW5zdHJ1bWVudC1maW5nZXJwcmludGluZy1hcGlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9qcy1pbnN0cnVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvcGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3BlbmRpbmctcmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3Jlc3BvbnNlLWJvZHktbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvc3RyaW5nLXV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi91dWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL3NjaGVtYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBc0Y7O0FBRXRGLDJHQUFvQzs7Ozs7Ozs7Ozs7Ozs7QUNGcEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlGO0FBQ1o7QUFDUDtBQUN2RDtBQUNQO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkYscUJBQXFCO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLCs2SDs7Ozs7Ozs7Ozs7O0FDbEczQztBQUFBO0FBQUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLDJDQUEyQywyc0M7Ozs7Ozs7Ozs7OztBQ3ZCM0M7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMnpEOzs7Ozs7Ozs7Ozs7QUMvQjNDO0FBQUE7QUFBQTtBQUNPO0FBQ1AsMkNBQTJDLG1PIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2NvbnRlbnQuanMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBpbmplY3RKYXZhc2NyaXB0SW5zdHJ1bWVudFBhZ2VTY3JpcHQgfSBmcm9tIFwib3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uXCI7XG5cbmluamVjdEphdmFzY3JpcHRJbnN0cnVtZW50UGFnZVNjcmlwdCgpO1xuXG4iLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nIH0gZnJvbSBcIi4uL2xpYi9zdHJpbmctdXRpbHNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYSA9IChjb29raWUpID0+IHtcbiAgICBjb25zdCBqYXZhc2NyaXB0Q29va2llID0ge307XG4gICAgLy8gRXhwaXJ5IHRpbWUgKGluIHNlY29uZHMpXG4gICAgLy8gTWF5IHJldHVybiB+TWF4KGludDY0KS4gSSBiZWxpZXZlIHRoaXMgaXMgYSBzZXNzaW9uXG4gICAgLy8gY29va2llIHdoaWNoIGRvZXNuJ3QgZXhwaXJlLiBTZXNzaW9ucyBjb29raWVzIHdpdGhcbiAgICAvLyBub24tbWF4IGV4cGlyeSB0aW1lIGV4cGlyZSBhZnRlciBzZXNzaW9uIG9yIGF0IGV4cGlyeS5cbiAgICBjb25zdCBleHBpcnlUaW1lID0gY29va2llLmV4cGlyYXRpb25EYXRlOyAvLyByZXR1cm5zIHNlY29uZHNcbiAgICBsZXQgZXhwaXJ5VGltZVN0cmluZztcbiAgICBjb25zdCBtYXhJbnQ2NCA9IDkyMjMzNzIwMzY4NTQ3NzYwMDA7XG4gICAgaWYgKCFjb29raWUuZXhwaXJhdGlvbkRhdGUgfHwgZXhwaXJ5VGltZSA9PT0gbWF4SW50NjQpIHtcbiAgICAgICAgZXhwaXJ5VGltZVN0cmluZyA9IFwiOTk5OS0xMi0zMVQyMTo1OTo1OS4wMDBaXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBleHBpcnlUaW1lRGF0ZSA9IG5ldyBEYXRlKGV4cGlyeVRpbWUgKiAxMDAwKTsgLy8gcmVxdWlyZXMgbWlsbGlzZWNvbmRzXG4gICAgICAgIGV4cGlyeVRpbWVTdHJpbmcgPSBleHBpcnlUaW1lRGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBqYXZhc2NyaXB0Q29va2llLmV4cGlyeSA9IGV4cGlyeVRpbWVTdHJpbmc7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19odHRwX29ubHkgPSBib29sVG9JbnQoY29va2llLmh0dHBPbmx5KTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmlzX2hvc3Rfb25seSA9IGJvb2xUb0ludChjb29raWUuaG9zdE9ubHkpO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfc2Vzc2lvbiA9IGJvb2xUb0ludChjb29raWUuc2Vzc2lvbik7XG4gICAgamF2YXNjcmlwdENvb2tpZS5ob3N0ID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5kb21haW4pO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfc2VjdXJlID0gYm9vbFRvSW50KGNvb2tpZS5zZWN1cmUpO1xuICAgIGphdmFzY3JpcHRDb29raWUubmFtZSA9IGVzY2FwZVN0cmluZyhjb29raWUubmFtZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5wYXRoID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5wYXRoKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnZhbHVlID0gZXNjYXBlU3RyaW5nKGNvb2tpZS52YWx1ZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5zYW1lX3NpdGUgPSBlc2NhcGVTdHJpbmcoY29va2llLnNhbWVTaXRlKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmZpcnN0X3BhcnR5X2RvbWFpbiA9IGVzY2FwZVN0cmluZyhjb29raWUuZmlyc3RQYXJ0eURvbWFpbik7XG4gICAgamF2YXNjcmlwdENvb2tpZS5zdG9yZV9pZCA9IGVzY2FwZVN0cmluZyhjb29raWUuc3RvcmVJZCk7XG4gICAgamF2YXNjcmlwdENvb2tpZS50aW1lX3N0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHJldHVybiBqYXZhc2NyaXB0Q29va2llO1xufTtcbmV4cG9ydCBjbGFzcyBDb29raWVJbnN0cnVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgfVxuICAgIHJ1bihjcmF3bElEKSB7XG4gICAgICAgIC8vIEluc3RydW1lbnQgY29va2llIGNoYW5nZXNcbiAgICAgICAgdGhpcy5vbkNoYW5nZWRMaXN0ZW5lciA9IGFzeW5jIChjaGFuZ2VJbmZvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBldmVudFR5cGUgPSBjaGFuZ2VJbmZvLnJlbW92ZWQgPyBcImRlbGV0ZWRcIiA6IFwiYWRkZWQtb3ItY2hhbmdlZFwiO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgICAgICAgICAgIHJlY29yZF90eXBlOiBldmVudFR5cGUsXG4gICAgICAgICAgICAgICAgY2hhbmdlX2NhdXNlOiBjaGFuZ2VJbmZvLmNhdXNlLFxuICAgICAgICAgICAgICAgIGNyYXdsX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICAgICAgICAgIGV2ZW50X29yZGluYWw6IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCksXG4gICAgICAgICAgICAgICAgLi4udHJhbnNmb3JtQ29va2llT2JqZWN0VG9NYXRjaE9wZW5XUE1TY2hlbWEoY2hhbmdlSW5mby5jb29raWUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJqYXZhc2NyaXB0X2Nvb2tpZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci5jb29raWVzLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ2hhbmdlZExpc3RlbmVyKTtcbiAgICB9XG4gICAgYXN5bmMgc2F2ZUFsbENvb2tpZXMoY3Jhd2xJRCkge1xuICAgICAgICBjb25zdCBhbGxDb29raWVzID0gYXdhaXQgYnJvd3Nlci5jb29raWVzLmdldEFsbCh7fSk7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFsbENvb2tpZXMubWFwKChjb29raWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHtcbiAgICAgICAgICAgICAgICByZWNvcmRfdHlwZTogXCJtYW51YWwtZXhwb3J0XCIsXG4gICAgICAgICAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZDogZXh0ZW5zaW9uU2Vzc2lvblV1aWQsXG4gICAgICAgICAgICAgICAgLi4udHJhbnNmb3JtQ29va2llT2JqZWN0VG9NYXRjaE9wZW5XUE1TY2hlbWEoY29va2llKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImphdmFzY3JpcHRfY29va2llc1wiLCB1cGRhdGUpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLmNvb2tpZXMub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKHRoaXMub25DaGFuZ2VkTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTI5dmEybGxMV2x1YzNSeWRXMWxiblF1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12WW1GamEyZHliM1Z1WkM5amIyOXJhV1V0YVc1emRISjFiV1Z1ZEM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hQUVVGUExFVkJRVVVzZFVKQlFYVkNMRVZCUVVVc1RVRkJUU3gzUTBGQmQwTXNRMEZCUXp0QlFVTnFSaXhQUVVGUExFVkJRVVVzYjBKQlFXOUNMRVZCUVVVc1RVRkJUU3dyUWtGQkswSXNRMEZCUXp0QlFVTnlSU3hQUVVGUExFVkJRVVVzVTBGQlV5eEZRVUZGTEZsQlFWa3NSVUZCUlN4TlFVRk5MSEZDUVVGeFFpeERRVUZETzBGQlN6bEVMRTFCUVUwc1EwRkJReXhOUVVGTkxIbERRVUY1UXl4SFFVRkhMRU5CUVVNc1RVRkJZeXhGUVVGRkxFVkJRVVU3U1VGRE1VVXNUVUZCVFN4blFrRkJaMElzUjBGQlJ5eEZRVUZ6UWl4RFFVRkRPMGxCUldoRUxESkNRVUV5UWp0SlFVTXpRaXh6UkVGQmMwUTdTVUZEZEVRc2NVUkJRWEZFTzBsQlEzSkVMSGxFUVVGNVJEdEpRVU42UkN4TlFVRk5MRlZCUVZVc1IwRkJSeXhOUVVGTkxFTkJRVU1zWTBGQll5eERRVUZETEVOQlFVTXNhMEpCUVd0Q08wbEJRelZFTEVsQlFVa3NaMEpCUVdkQ0xFTkJRVU03U1VGRGNrSXNUVUZCVFN4UlFVRlJMRWRCUVVjc2JVSkJRVzFDTEVOQlFVTTdTVUZEY2tNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eGpRVUZqTEVsQlFVa3NWVUZCVlN4TFFVRkxMRkZCUVZFc1JVRkJSVHRSUVVOeVJDeG5Ra0ZCWjBJc1IwRkJSeXd3UWtGQk1FSXNRMEZCUXp0TFFVTXZRenRUUVVGTk8xRkJRMHdzVFVGQlRTeGpRVUZqTEVkQlFVY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNkMEpCUVhkQ08xRkJRelZGTEdkQ1FVRm5RaXhIUVVGSExHTkJRV01zUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0TFFVTnFSRHRKUVVORUxHZENRVUZuUWl4RFFVRkRMRTFCUVUwc1IwRkJSeXhuUWtGQlowSXNRMEZCUXp0SlFVTXpReXhuUWtGQlowSXNRMEZCUXl4WlFVRlpMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVTXpSQ3huUWtGQlowSXNRMEZCUXl4WlFVRlpMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVTXpSQ3huUWtGQlowSXNRMEZCUXl4VlFVRlZMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0SlFVVjRSQ3huUWtGQlowSXNRMEZCUXl4SlFVRkpMRWRCUVVjc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVTndSQ3huUWtGQlowSXNRMEZCUXl4VFFVRlRMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVTjBSQ3huUWtGQlowSXNRMEZCUXl4SlFVRkpMRWRCUVVjc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTnNSQ3huUWtGQlowSXNRMEZCUXl4SlFVRkpMRWRCUVVjc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTnNSQ3huUWtGQlowSXNRMEZCUXl4TFFVRkxMRWRCUVVjc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0SlFVTndSQ3huUWtGQlowSXNRMEZCUXl4VFFVRlRMRWRCUVVjc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVTXpSQ3huUWtGQlowSXNRMEZCUXl4clFrRkJhMElzUjBGQlJ5eFpRVUZaTEVOQlFVTXNUVUZCVFN4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTTdTVUZETlVVc1owSkJRV2RDTEVOQlFVTXNVVUZCVVN4SFFVRkhMRmxCUVZrc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZGZWtRc1owSkJRV2RDTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1NVRkJTU3hGUVVGRkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdTVUZGZGtRc1QwRkJUeXhuUWtGQlowSXNRMEZCUXp0QlFVTXhRaXhEUVVGRExFTkJRVU03UVVGRlJpeE5RVUZOTEU5QlFVOHNaMEpCUVdkQ08wbEJTVE5DTEZsQlFWa3NXVUZCV1R0UlFVTjBRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEZsQlFWa3NRMEZCUXp0SlFVTnVReXhEUVVGRE8wbEJSVTBzUjBGQlJ5eERRVUZETEU5QlFVODdVVUZEYUVJc05FSkJRVFJDTzFGQlF6VkNMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNSMEZCUnl4TFFVRkxMRVZCUVVVc1ZVRlBMMElzUlVGQlJTeEZRVUZGTzFsQlEwZ3NUVUZCVFN4VFFVRlRMRWRCUVVjc1ZVRkJWU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJReXhyUWtGQmEwSXNRMEZCUXp0WlFVTjBSU3hOUVVGTkxFMUJRVTBzUjBGQk1rSTdaMEpCUTNKRExGZEJRVmNzUlVGQlJTeFRRVUZUTzJkQ1FVTjBRaXhaUVVGWkxFVkJRVVVzVlVGQlZTeERRVUZETEV0QlFVczdaMEpCUXpsQ0xGRkJRVkVzUlVGQlJTeFBRVUZQTzJkQ1FVTnFRaXh6UWtGQmMwSXNSVUZCUlN4dlFrRkJiMEk3WjBKQlF6VkRMR0ZCUVdFc1JVRkJSU3gxUWtGQmRVSXNSVUZCUlR0blFrRkRlRU1zUjBGQlJ5eDVRMEZCZVVNc1EwRkJReXhWUVVGVkxFTkJRVU1zVFVGQlRTeERRVUZETzJGQlEyaEZMRU5CUVVNN1dVRkRSaXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZWQlFWVXNRMEZCUXl4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0UlFVTTNSQ3hEUVVGRExFTkJRVU03VVVGRFJpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03U1VGRGFFVXNRMEZCUXp0SlFVVk5MRXRCUVVzc1EwRkJReXhqUVVGakxFTkJRVU1zVDBGQlR6dFJRVU5xUXl4TlFVRk5MRlZCUVZVc1IwRkJSeXhOUVVGTkxFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRM0JFTEUxQlFVMHNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkRaaXhWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNUVUZCWXl4RlFVRkZMRVZCUVVVN1dVRkRhRU1zVFVGQlRTeE5RVUZOTEVkQlFUSkNPMmRDUVVOeVF5eFhRVUZYTEVWQlFVVXNaVUZCWlR0blFrRkROVUlzVVVGQlVTeEZRVUZGTEU5QlFVODdaMEpCUTJwQ0xITkNRVUZ6UWl4RlFVRkZMRzlDUVVGdlFqdG5Ra0ZETlVNc1IwRkJSeXg1UTBGQmVVTXNRMEZCUXl4TlFVRk5MRU5CUVVNN1lVRkRja1FzUTBGQlF6dFpRVU5HTEU5QlFVOHNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhWUVVGVkxFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRGNFVXNRMEZCUXl4RFFVRkRMRU5CUTBnc1EwRkJRenRKUVVOS0xFTkJRVU03U1VGRlRTeFBRVUZQTzFGQlExb3NTVUZCU1N4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVTdXVUZETVVJc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMU5CUTJ4Rk8wbEJRMGdzUTBGQlF6dERRVU5HSW4wPSIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgSHR0cFBvc3RQYXJzZXIgfSBmcm9tIFwiLi4vbGliL2h0dHAtcG9zdC1wYXJzZXJcIjtcbmltcG9ydCB7IFBlbmRpbmdSZXF1ZXN0IH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLXJlcXVlc3RcIjtcbmltcG9ydCB7IFBlbmRpbmdSZXNwb25zZSB9IGZyb20gXCIuLi9saWIvcGVuZGluZy1yZXNwb25zZVwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcsIGVzY2FwZVVybCB9IGZyb20gXCIuLi9saWIvc3RyaW5nLXV0aWxzXCI7XG4vKipcbiAqIE5vdGU6IERpZmZlcmVudCBwYXJ0cyBvZiB0aGUgZGVzaXJlZCBpbmZvcm1hdGlvbiBhcnJpdmVzIGluIGRpZmZlcmVudCBldmVudHMgYXMgcGVyIGJlbG93OlxuICogcmVxdWVzdCA9IGhlYWRlcnMgaW4gb25CZWZvcmVTZW5kSGVhZGVycyArIGJvZHkgaW4gb25CZWZvcmVSZXF1ZXN0XG4gKiByZXNwb25zZSA9IGhlYWRlcnMgaW4gb25Db21wbGV0ZWQgKyBib2R5IHZpYSBhIG9uQmVmb3JlUmVxdWVzdCBmaWx0ZXJcbiAqIHJlZGlyZWN0ID0gb3JpZ2luYWwgcmVxdWVzdCBoZWFkZXJzK2JvZHksIGZvbGxvd2VkIGJ5IGEgb25CZWZvcmVSZWRpcmVjdCBhbmQgdGhlbiBhIG5ldyBzZXQgb2YgcmVxdWVzdCBoZWFkZXJzK2JvZHkgYW5kIHJlc3BvbnNlIGhlYWRlcnMrYm9keVxuICogRG9jczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Vc2VyOndiYW1iZXJnL3dlYlJlcXVlc3QuUmVxdWVzdERldGFpbHNcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBJbnN0cnVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVxdWVzdHMgPSB7fTtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzcG9uc2VzID0ge307XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCwgc2F2ZUphdmFzY3JpcHQsIHNhdmVBbGxDb250ZW50KSB7XG4gICAgICAgIGNvbnN0IGFsbFR5cGVzID0gW1xuICAgICAgICAgICAgXCJiZWFjb25cIixcbiAgICAgICAgICAgIFwiY3NwX3JlcG9ydFwiLFxuICAgICAgICAgICAgXCJmb250XCIsXG4gICAgICAgICAgICBcImltYWdlXCIsXG4gICAgICAgICAgICBcImltYWdlc2V0XCIsXG4gICAgICAgICAgICBcIm1haW5fZnJhbWVcIixcbiAgICAgICAgICAgIFwibWVkaWFcIixcbiAgICAgICAgICAgIFwib2JqZWN0XCIsXG4gICAgICAgICAgICBcIm9iamVjdF9zdWJyZXF1ZXN0XCIsXG4gICAgICAgICAgICBcInBpbmdcIixcbiAgICAgICAgICAgIFwic2NyaXB0XCIsXG4gICAgICAgICAgICAvLyBcInNwZWN1bGF0aXZlXCIsXG4gICAgICAgICAgICBcInN0eWxlc2hlZXRcIixcbiAgICAgICAgICAgIFwic3ViX2ZyYW1lXCIsXG4gICAgICAgICAgICBcIndlYl9tYW5pZmVzdFwiLFxuICAgICAgICAgICAgXCJ3ZWJzb2NrZXRcIixcbiAgICAgICAgICAgIFwieGJsXCIsXG4gICAgICAgICAgICBcInhtbF9kdGRcIixcbiAgICAgICAgICAgIFwieG1saHR0cHJlcXVlc3RcIixcbiAgICAgICAgICAgIFwieHNsdFwiLFxuICAgICAgICAgICAgXCJvdGhlclwiLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IHVybHM6IFtcIjxhbGxfdXJscz5cIl0sIHR5cGVzOiBhbGxUeXBlcyB9O1xuICAgICAgICBjb25zdCByZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGRldGFpbHMub3JpZ2luVXJsICYmIGRldGFpbHMub3JpZ2luVXJsLmluZGV4T2YoXCJtb3otZXh0ZW5zaW9uOi8vXCIpID4gLTEpO1xuICAgICAgICB9O1xuICAgICAgICAvKlxuICAgICAgICAgKiBBdHRhY2ggaGFuZGxlcnMgdG8gZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdExpc3RlbmVyID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICBjb25zdCBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nID0ge307XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1JlcXVlc3QgPSB0aGlzLmdldFBlbmRpbmdSZXF1ZXN0KGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVzcG9uc2UgPSB0aGlzLmdldFBlbmRpbmdSZXNwb25zZShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVzcG9uc2UucmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIGlmIChzYXZlQWxsQ29udGVudCkge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5hZGRSZXNwb25zZVJlc3BvbnNlQm9keUxpc3RlbmVyKGRldGFpbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2F2ZUphdmFzY3JpcHQgJiYgdGhpcy5pc0pTKGRldGFpbHMudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUmVzcG9uc2UuYWRkUmVzcG9uc2VSZXNwb25zZUJvZHlMaXN0ZW5lcihkZXRhaWxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZXF1ZXN0LmFkZExpc3RlbmVyKHRoaXMub25CZWZvcmVSZXF1ZXN0TGlzdGVuZXIsIGZpbHRlciwgc2F2ZUphdmFzY3JpcHQgfHwgc2F2ZUFsbENvbnRlbnRcbiAgICAgICAgICAgID8gW1wicmVxdWVzdEJvZHlcIiwgXCJibG9ja2luZ1wiXVxuICAgICAgICAgICAgOiBbXCJyZXF1ZXN0Qm9keVwiXSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXF1ZXN0ID0gdGhpcy5nZXRQZW5kaW5nUmVxdWVzdChkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVxdWVzdC5yZXNvbHZlT25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0hhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVNlbmRIZWFkZXJzLmFkZExpc3RlbmVyKHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyLCBmaWx0ZXIsIFtcInJlcXVlc3RIZWFkZXJzXCJdKTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlZGlyZWN0TGlzdGVuZXIgPSBkZXRhaWxzID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVJlZGlyZWN0SGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVkaXJlY3QuYWRkTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlZGlyZWN0TGlzdGVuZXIsIGZpbHRlciwgW1wicmVzcG9uc2VIZWFkZXJzXCJdKTtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlZExpc3RlbmVyID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5yZXNvbHZlT25Db21wbGV0ZWRFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVkSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpLCBzYXZlSmF2YXNjcmlwdCwgc2F2ZUFsbENvbnRlbnQpO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25Db21wbGV0ZWQuYWRkTGlzdGVuZXIodGhpcy5vbkNvbXBsZXRlZExpc3RlbmVyLCBmaWx0ZXIsIFtcInJlc3BvbnNlSGVhZGVyc1wiXSk7XG4gICAgfVxuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVmb3JlUmVxdWVzdExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZXF1ZXN0LnJlbW92ZUxpc3RlbmVyKHRoaXMub25CZWZvcmVSZXF1ZXN0TGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlU2VuZEhlYWRlcnMucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVkaXJlY3QucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlZGlyZWN0TGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uQ29tcGxldGVkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkNvbXBsZXRlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQ29tcGxldGVkTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFBlbmRpbmdSZXF1ZXN0KHJlcXVlc3RJZCkge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0pIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0gPSBuZXcgUGVuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXTtcbiAgICB9XG4gICAgZ2V0UGVuZGluZ1Jlc3BvbnNlKHJlcXVlc3RJZCkge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1Jlc3BvbnNlc1tyZXF1ZXN0SWRdKSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVxdWVzdElkXSA9IG5ldyBQZW5kaW5nUmVzcG9uc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3JlcXVlc3RJZF07XG4gICAgfVxuICAgIC8qXG4gICAgICogSFRUUCBSZXF1ZXN0IEhhbmRsZXIgYW5kIEhlbHBlciBGdW5jdGlvbnNcbiAgICAgKi9cbiAgICAvKlxuICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICBwcml2YXRlIGdldF9zdGFja190cmFjZV9zdHIoKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIHN0YWNrIHRyYWNlIGFzIGEgc3RyaW5nXG4gICAgICAvLyBUT0RPOiBjaGVjayBpZiBodHRwLW9uLW1vZGlmeS1yZXF1ZXN0IGlzIGEgZ29vZCBwbGFjZSB0byBjYXB0dXJlIHRoZSBzdGFja1xuICAgICAgLy8gSW4gdGhlIG1hbnVhbCB0ZXN0cyB3ZSBjb3VsZCBjYXB0dXJlIGV4YWN0bHkgdGhlIHNhbWUgdHJhY2UgYXMgdGhlXG4gICAgICAvLyBcIkNhdXNlXCIgY29sdW1uIG9mIHRoZSBkZXZ0b29scyBuZXR3b3JrIHBhbmVsLlxuICAgICAgY29uc3Qgc3RhY2t0cmFjZSA9IFtdO1xuICAgICAgbGV0IGZyYW1lID0gY29tcG9uZW50cy5zdGFjaztcbiAgICAgIGlmIChmcmFtZSAmJiBmcmFtZS5jYWxsZXIpIHtcbiAgICAgICAgLy8gaW50ZXJuYWwvY2hyb21lIGNhbGxlcnMgb2NjdXB5IHRoZSBmaXJzdCB0aHJlZSBmcmFtZXMsIHBvcCB0aGVtIVxuICAgICAgICBmcmFtZSA9IGZyYW1lLmNhbGxlci5jYWxsZXIuY2FsbGVyO1xuICAgICAgICB3aGlsZSAoZnJhbWUpIHtcbiAgICAgICAgICAvLyBjaHJvbWUgc2NyaXB0cyBhcHBlYXIgYXMgY2FsbGVycyBpbiBzb21lIGNhc2VzLCBmaWx0ZXIgdGhlbSBvdXRcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSBmcmFtZS5maWxlbmFtZS5zcGxpdChcIjovL1wiKVswXTtcbiAgICAgICAgICBpZiAoW1wicmVzb3VyY2VcIiwgXCJjaHJvbWVcIiwgXCJmaWxlXCJdLmluZGV4T2Yoc2NoZW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjaHJvbWUgc2NyaXB0c1xuICAgICAgICAgICAgc3RhY2t0cmFjZS5wdXNoKFxuICAgICAgICAgICAgICBmcmFtZS5uYW1lICtcbiAgICAgICAgICAgICAgICBcIkBcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUuZmlsZW5hbWUgK1xuICAgICAgICAgICAgICAgIFwiOlwiICtcbiAgICAgICAgICAgICAgICBmcmFtZS5saW5lTnVtYmVyICtcbiAgICAgICAgICAgICAgICBcIjpcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUuY29sdW1uTnVtYmVyICtcbiAgICAgICAgICAgICAgICBcIjtcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUuYXN5bmNDYXVzZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZyYW1lID0gZnJhbWUuY2FsbGVyIHx8IGZyYW1lLmFzeW5jQ2FsbGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhY2t0cmFjZS5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICAqL1xuICAgIGFzeW5jIG9uQmVmb3JlU2VuZEhlYWRlcnNIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGV2ZW50T3JkaW5hbCkge1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm9uQmVmb3JlU2VuZEhlYWRlcnNIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQsIHVybDogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgICAgICB1cGRhdGUuaW5jb2duaXRvID0gYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pO1xuICAgICAgICB1cGRhdGUuY3Jhd2xfaWQgPSBjcmF3bElEO1xuICAgICAgICB1cGRhdGUuZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZCA9IGV4dGVuc2lvblNlc3Npb25VdWlkO1xuICAgICAgICB1cGRhdGUuZXZlbnRfb3JkaW5hbCA9IGV2ZW50T3JkaW5hbDtcbiAgICAgICAgdXBkYXRlLndpbmRvd19pZCA9IHRhYi53aW5kb3dJZDtcbiAgICAgICAgdXBkYXRlLnRhYl9pZCA9IGRldGFpbHMudGFiSWQ7XG4gICAgICAgIHVwZGF0ZS5mcmFtZV9pZCA9IGRldGFpbHMuZnJhbWVJZDtcbiAgICAgICAgLy8gcmVxdWVzdElkIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBsaW5rIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICAgICAgdXBkYXRlLnJlcXVlc3RfaWQgPSBkZXRhaWxzLnJlcXVlc3RJZDtcbiAgICAgICAgLy8gY29uc3Qgc3RhY2t0cmFjZV9zdHIgPSBnZXRfc3RhY2tfdHJhY2Vfc3RyKCk7XG4gICAgICAgIC8vIHVwZGF0ZS5yZXFfY2FsbF9zdGFjayA9IGVzY2FwZVN0cmluZyhzdGFja3RyYWNlX3N0cik7XG4gICAgICAgIGNvbnN0IHVybCA9IGRldGFpbHMudXJsO1xuICAgICAgICB1cGRhdGUudXJsID0gZXNjYXBlVXJsKHVybCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RNZXRob2QgPSBkZXRhaWxzLm1ldGhvZDtcbiAgICAgICAgdXBkYXRlLm1ldGhvZCA9IGVzY2FwZVN0cmluZyhyZXF1ZXN0TWV0aG9kKTtcbiAgICAgICAgY29uc3QgY3VycmVudF90aW1lID0gbmV3IERhdGUoZGV0YWlscy50aW1lU3RhbXApO1xuICAgICAgICB1cGRhdGUudGltZV9zdGFtcCA9IGN1cnJlbnRfdGltZS50b0lTT1N0cmluZygpO1xuICAgICAgICBsZXQgZW5jb2RpbmdUeXBlID0gXCJcIjtcbiAgICAgICAgbGV0IHJlZmVycmVyID0gXCJcIjtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICBsZXQgaXNPY3NwID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXRhaWxzLnJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgICAgICBkZXRhaWxzLnJlcXVlc3RIZWFkZXJzLm1hcChyZXF1ZXN0SGVhZGVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSByZXF1ZXN0SGVhZGVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcl9wYWlyID0gW107XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcobmFtZSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlcl9wYWlyKTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJDb250ZW50LVR5cGVcIikge1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGluZ1R5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuY29kaW5nVHlwZS5pbmRleE9mKFwiYXBwbGljYXRpb24vb2NzcC1yZXF1ZXN0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNPY3NwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJSZWZlcmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUucmVmZXJyZXIgPSBlc2NhcGVTdHJpbmcocmVmZXJyZXIpO1xuICAgICAgICBpZiAocmVxdWVzdE1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgIWlzT2NzcCAvKiBkb24ndCBwcm9jZXNzIE9DU1AgcmVxdWVzdHMgKi8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXF1ZXN0ID0gdGhpcy5nZXRQZW5kaW5nUmVxdWVzdChkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVkV2l0aGluVGltZW91dCgxMDAwKTtcbiAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIlBlbmRpbmcgcmVxdWVzdCB0aW1lZCBvdXQgd2FpdGluZyBmb3IgZGF0YSBmcm9tIGJvdGggb25CZWZvcmVSZXF1ZXN0IGFuZCBvbkJlZm9yZVNlbmRIZWFkZXJzIGV2ZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IGF3YWl0IHBlbmRpbmdSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscztcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscy5yZXF1ZXN0Qm9keTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zdFBhcnNlciA9IG5ldyBIdHRwUG9zdFBhcnNlcihcbiAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWlscyxcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLCB0aGlzLmRhdGFSZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RPYmogPSBwb3N0UGFyc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyc2VQb3N0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgKFBPU1QpIHJlcXVlc3QgaGVhZGVycyBmcm9tIHVwbG9hZCBzdHJlYW1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFwicG9zdF9oZWFkZXJzXCIgaW4gcG9zdE9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBzdG9yZSBQT1NUIGhlYWRlcnMgdGhhdCB3ZSBrbm93IGFuZCBuZWVkLiBXZSBtYXkgbWlzaW50ZXJwcmV0IFBPU1QgZGF0YSBhcyBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcyBkZXRlY3Rpb24gaXMgYmFzZWQgb24gXCJrZXk6dmFsdWVcIiBmb3JtYXQgKG5vbi1oZWFkZXIgUE9TVCBkYXRhIGNhbiBiZSBpbiB0aGlzIGZvcm1hdCBhcyB3ZWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudEhlYWRlcnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtRGlzcG9zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtTGVuZ3RoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHBvc3RPYmoucG9zdF9oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRIZWFkZXJzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcl9wYWlyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKG5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcocG9zdE9iai5wb3N0X2hlYWRlcnNbbmFtZV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlcl9wYWlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugc3RvcmUgUE9TVCBib2R5IGluIEpTT04gZm9ybWF0LCBleGNlcHQgd2hlbiBpdCdzIGEgc3RyaW5nIHdpdGhvdXQgYSAoa2V5LXZhbHVlKSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwicG9zdF9ib2R5XCIgaW4gcG9zdE9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlLnBvc3RfYm9keSA9IHBvc3RPYmoucG9zdF9ib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS5oZWFkZXJzID0gSlNPTi5zdHJpbmdpZnkoaGVhZGVycyk7XG4gICAgICAgIC8vIENoZWNrIGlmIHhoclxuICAgICAgICBjb25zdCBpc1hIUiA9IGRldGFpbHMudHlwZSA9PT0gXCJ4bWxodHRwcmVxdWVzdFwiO1xuICAgICAgICB1cGRhdGUuaXNfWEhSID0gYm9vbFRvSW50KGlzWEhSKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgZnJhbWUgT1IgZnVsbCBwYWdlIGxvYWRcbiAgICAgICAgY29uc3QgaXNGdWxsUGFnZUxvYWQgPSBkZXRhaWxzLmZyYW1lSWQgPT09IDA7XG4gICAgICAgIGNvbnN0IGlzRnJhbWVMb2FkID0gZGV0YWlscy50eXBlID09PSBcInN1Yl9mcmFtZVwiO1xuICAgICAgICB1cGRhdGUuaXNfZnVsbF9wYWdlID0gYm9vbFRvSW50KGlzRnVsbFBhZ2VMb2FkKTtcbiAgICAgICAgdXBkYXRlLmlzX2ZyYW1lX2xvYWQgPSBib29sVG9JbnQoaXNGcmFtZUxvYWQpO1xuICAgICAgICAvLyBHcmFiIHRoZSB0cmlnZ2VyaW5nIGFuZCBsb2FkaW5nIFByaW5jaXBhbHNcbiAgICAgICAgbGV0IHRyaWdnZXJpbmdPcmlnaW47XG4gICAgICAgIGxldCBsb2FkaW5nT3JpZ2luO1xuICAgICAgICBpZiAoZGV0YWlscy5vcmlnaW5VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZE9yaWdpblVybCA9IG5ldyBVUkwoZGV0YWlscy5vcmlnaW5VcmwpO1xuICAgICAgICAgICAgdHJpZ2dlcmluZ09yaWdpbiA9IHBhcnNlZE9yaWdpblVybC5vcmlnaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRldGFpbHMuZG9jdW1lbnRVcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZERvY3VtZW50VXJsID0gbmV3IFVSTChkZXRhaWxzLmRvY3VtZW50VXJsKTtcbiAgICAgICAgICAgIGxvYWRpbmdPcmlnaW4gPSBwYXJzZWREb2N1bWVudFVybC5vcmlnaW47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLnRyaWdnZXJpbmdfb3JpZ2luID0gZXNjYXBlU3RyaW5nKHRyaWdnZXJpbmdPcmlnaW4pO1xuICAgICAgICB1cGRhdGUubG9hZGluZ19vcmlnaW4gPSBlc2NhcGVTdHJpbmcobG9hZGluZ09yaWdpbik7XG4gICAgICAgIC8vIGxvYWRpbmdEb2N1bWVudCdzIGhyZWZcbiAgICAgICAgLy8gVGhlIGxvYWRpbmdEb2N1bWVudCBpcyB0aGUgZG9jdW1lbnQgdGhlIGVsZW1lbnQgcmVzaWRlcywgcmVnYXJkbGVzcyBvZlxuICAgICAgICAvLyBob3cgdGhlIGxvYWQgd2FzIHRyaWdnZXJlZC5cbiAgICAgICAgY29uc3QgbG9hZGluZ0hyZWYgPSBkZXRhaWxzLmRvY3VtZW50VXJsO1xuICAgICAgICB1cGRhdGUubG9hZGluZ19ocmVmID0gZXNjYXBlU3RyaW5nKGxvYWRpbmdIcmVmKTtcbiAgICAgICAgLy8gcmVzb3VyY2VUeXBlIG9mIHRoZSByZXF1ZXN0aW5nIG5vZGUuIFRoaXMgaXMgc2V0IGJ5IHRoZSB0eXBlIG9mXG4gICAgICAgIC8vIG5vZGUgbWFraW5nIHRoZSByZXF1ZXN0IChpLmUuIGFuIDxpbWcgc3JjPS4uLj4gbm9kZSB3aWxsIHNldCB0byB0eXBlIFwiaW1hZ2VcIikuXG4gICAgICAgIC8vIERvY3VtZW50YXRpb246XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3dlYlJlcXVlc3QvUmVzb3VyY2VUeXBlXG4gICAgICAgIHVwZGF0ZS5yZXNvdXJjZV90eXBlID0gZGV0YWlscy50eXBlO1xuICAgICAgICAvKlxuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIGNvbnN0IFRoaXJkUGFydHlVdGlsID0gQ2NbXCJAbW96aWxsYS5vcmcvdGhpcmRwYXJ0eXV0aWw7MVwiXS5nZXRTZXJ2aWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENpLm1veklUaGlyZFBhcnR5VXRpbCk7XG4gICAgICAgIC8vIERvIHRoaXJkLXBhcnR5IGNoZWNrc1xuICAgICAgICAvLyBUaGVzZSBzcGVjaWZpYyBjaGVja3MgYXJlIGRvbmUgYmVjYXVzZSBpdCdzIHdoYXQncyB1c2VkIGluIFRyYWNraW5nIFByb3RlY3Rpb25cbiAgICAgICAgLy8gU2VlOiBodHRwOi8vc2VhcmNoZm94Lm9yZy9tb3ppbGxhLWNlbnRyYWwvc291cmNlL25ldHdlcmsvYmFzZS9uc0NoYW5uZWxDbGFzc2lmaWVyLmNwcCMxMDdcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBpc1RoaXJkUGFydHlDaGFubmVsID0gVGhpcmRQYXJ0eVV0aWwuaXNUaGlyZFBhcnR5Q2hhbm5lbChkZXRhaWxzKTtcbiAgICAgICAgICBjb25zdCB0b3BXaW5kb3cgPSBUaGlyZFBhcnR5VXRpbC5nZXRUb3BXaW5kb3dGb3JDaGFubmVsKGRldGFpbHMpO1xuICAgICAgICAgIGNvbnN0IHRvcFVSSSA9IFRoaXJkUGFydHlVdGlsLmdldFVSSUZyb21XaW5kb3codG9wV2luZG93KTtcbiAgICAgICAgICBpZiAodG9wVVJJKSB7XG4gICAgICAgICAgICBjb25zdCB0b3BVcmwgPSB0b3BVUkkuc3BlYztcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWxVUkkgPSBkZXRhaWxzLlVSSTtcbiAgICAgICAgICAgIGNvbnN0IGlzVGhpcmRQYXJ0eVRvVG9wV2luZG93ID0gVGhpcmRQYXJ0eVV0aWwuaXNUaGlyZFBhcnR5VVJJKFxuICAgICAgICAgICAgICBjaGFubmVsVVJJLFxuICAgICAgICAgICAgICB0b3BVUkksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdXBkYXRlLmlzX3RoaXJkX3BhcnR5X3RvX3RvcF93aW5kb3cgPSBpc1RoaXJkUGFydHlUb1RvcFdpbmRvdztcbiAgICAgICAgICAgIHVwZGF0ZS5pc190aGlyZF9wYXJ0eV9jaGFubmVsID0gaXNUaGlyZFBhcnR5Q2hhbm5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGFuRXJyb3IpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb25zIGV4cGVjdGVkIGZvciBjaGFubmVscyB0cmlnZ2VyZWQgb3IgbG9hZGluZyBpbiBhXG4gICAgICAgICAgLy8gTnVsbFByaW5jaXBhbCBvciBTeXN0ZW1QcmluY2lwYWwuIFRoZXkgYXJlIGFsc28gZXhwZWN0ZWQgZm9yIGZhdmljb25cbiAgICAgICAgICAvLyBsb2Fkcywgd2hpY2ggd2UgYXR0ZW1wdCB0byBmaWx0ZXIuIERlcGVuZGluZyBvbiB0aGUgbmFtaW5nLCBzb21lIGZhdmljb25zXG4gICAgICAgICAgLy8gbWF5IGNvbnRpbnVlIHRvIGxlYWQgdG8gZXJyb3IgbG9ncy5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB1cGRhdGUudHJpZ2dlcmluZ19vcmlnaW4gIT09IFwiW1N5c3RlbSBQcmluY2lwYWxdXCIgJiZcbiAgICAgICAgICAgIHVwZGF0ZS50cmlnZ2VyaW5nX29yaWdpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB1cGRhdGUubG9hZGluZ19vcmlnaW4gIT09IFwiW1N5c3RlbSBQcmluY2lwYWxdXCIgJiZcbiAgICAgICAgICAgIHVwZGF0ZS5sb2FkaW5nX29yaWdpbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAhdXBkYXRlLnVybC5lbmRzV2l0aChcImljb1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXG4gICAgICAgICAgICAgIFwiRXJyb3Igd2hpbGUgcmV0cmlldmluZyBhZGRpdGlvbmFsIGNoYW5uZWwgaW5mb3JtYXRpb24gZm9yIFVSTDogXCIgK1xuICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgdXBkYXRlLnVybCArXG4gICAgICAgICAgICAgIFwiXFxuIEVycm9yIHRleHQ6XCIgK1xuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShhbkVycm9yKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICovXG4gICAgICAgIHVwZGF0ZS50b3BfbGV2ZWxfdXJsID0gZXNjYXBlVXJsKHRhYi51cmwpO1xuICAgICAgICB1cGRhdGUucGFyZW50X2ZyYW1lX2lkID0gZGV0YWlscy5wYXJlbnRGcmFtZUlkO1xuICAgICAgICB1cGRhdGUuZnJhbWVfYW5jZXN0b3JzID0gZXNjYXBlU3RyaW5nKEpTT04uc3RyaW5naWZ5KGRldGFpbHMuZnJhbWVBbmNlc3RvcnMpKTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVxdWVzdHNcIiwgdXBkYXRlKTtcbiAgICB9XG4gICAgYXN5bmMgb25CZWZvcmVSZWRpcmVjdEhhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgZXZlbnRPcmRpbmFsKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwib25CZWZvcmVSZWRpcmVjdEhhbmRsZXIgKHByZXZpb3VzbHkgaHR0cFJlcXVlc3RIYW5kbGVyKVwiLFxuICAgICAgICAgIGRldGFpbHMsXG4gICAgICAgICAgY3Jhd2xJRCxcbiAgICAgICAgKTtcbiAgICAgICAgKi9cbiAgICAgICAgLy8gU2F2ZSBIVFRQIHJlZGlyZWN0IGV2ZW50c1xuICAgICAgICAvLyBFdmVudHMgYXJlIHNhdmVkIHRvIHRoZSBgaHR0cF9yZWRpcmVjdHNgIHRhYmxlXG4gICAgICAgIC8qXG4gICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgLy8gRXZlbnRzIGFyZSBzYXZlZCB0byB0aGUgYGh0dHBfcmVkaXJlY3RzYCB0YWJsZSwgYW5kIG1hcCB0aGUgb2xkXG4gICAgICAgIC8vIHJlcXVlc3QvcmVzcG9uc2UgY2hhbm5lbCBpZCB0byB0aGUgbmV3IHJlcXVlc3QvcmVzcG9uc2UgY2hhbm5lbCBpZC5cbiAgICAgICAgLy8gSW1wbGVtZW50YXRpb24gYmFzZWQgb246IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTI0MDYyN1xuICAgICAgICBjb25zdCBvbGROb3RpZmljYXRpb25zID0gZGV0YWlscy5ub3RpZmljYXRpb25DYWxsYmFja3M7XG4gICAgICAgIGxldCBvbGRFdmVudFNpbmsgPSBudWxsO1xuICAgICAgICBkZXRhaWxzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcyA9IHtcbiAgICAgICAgICBRdWVyeUludGVyZmFjZTogWFBDT01VdGlscy5nZW5lcmF0ZVFJKFtcbiAgICAgICAgICAgIENpLm5zSUludGVyZmFjZVJlcXVlc3RvcixcbiAgICAgICAgICAgIENpLm5zSUNoYW5uZWxFdmVudFNpbmssXG4gICAgICAgICAgXSksXG4gICAgXG4gICAgICAgICAgZ2V0SW50ZXJmYWNlKGlpZCkge1xuICAgICAgICAgICAgLy8gV2UgYXJlIG9ubHkgaW50ZXJlc3RlZCBpbiBuc0lDaGFubmVsRXZlbnRTaW5rLFxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvbGQgY2FsbGJhY2tzIGZvciBhbnkgb3RoZXIgaW50ZXJmYWNlIHJlcXVlc3RzLlxuICAgICAgICAgICAgaWYgKGlpZC5lcXVhbHMoQ2kubnNJQ2hhbm5lbEV2ZW50U2luaykpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBvbGRFdmVudFNpbmsgPSBvbGROb3RpZmljYXRpb25zLlF1ZXJ5SW50ZXJmYWNlKGlpZCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGFuRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcbiAgICAgICAgICAgICAgICAgIFwiRXJyb3IgZHVyaW5nIGNhbGwgdG8gY3VzdG9tIG5vdGlmaWNhdGlvbkNhbGxiYWNrczo6Z2V0SW50ZXJmYWNlLlwiICtcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoYW5FcnJvciksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChvbGROb3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvbGROb3RpZmljYXRpb25zLmdldEludGVyZmFjZShpaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgQ3IuTlNfRVJST1JfTk9fSU5URVJGQUNFO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgXG4gICAgICAgICAgYXN5bmNPbkNoYW5uZWxSZWRpcmVjdChvbGRDaGFubmVsLCBuZXdDaGFubmVsLCBmbGFncywgY2FsbGJhY2spIHtcbiAgICBcbiAgICAgICAgICAgIG5ld0NoYW5uZWwuUXVlcnlJbnRlcmZhY2UoQ2kubnNJSHR0cENoYW5uZWwpO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgaHR0cFJlZGlyZWN0OiBIdHRwUmVkaXJlY3QgPSB7XG4gICAgICAgICAgICAgIGNyYXdsX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgICBvbGRfcmVxdWVzdF9pZDogb2xkQ2hhbm5lbC5jaGFubmVsSWQsXG4gICAgICAgICAgICAgIG5ld19yZXF1ZXN0X2lkOiBuZXdDaGFubmVsLmNoYW5uZWxJZCxcbiAgICAgICAgICAgICAgdGltZV9zdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3JlZGlyZWN0c1wiLCBodHRwUmVkaXJlY3QpO1xuICAgIFxuICAgICAgICAgICAgaWYgKG9sZEV2ZW50U2luaykge1xuICAgICAgICAgICAgICBvbGRFdmVudFNpbmsuYXN5bmNPbkNoYW5uZWxSZWRpcmVjdChcbiAgICAgICAgICAgICAgICBvbGRDaGFubmVsLFxuICAgICAgICAgICAgICAgIG5ld0NoYW5uZWwsXG4gICAgICAgICAgICAgICAgZmxhZ3MsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjay5vblJlZGlyZWN0VmVyaWZ5Q2FsbGJhY2soQ3IuTlNfT0spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gZGV0YWlscy5zdGF0dXNDb2RlO1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1c1RleHQgPSBkZXRhaWxzLnN0YXR1c0xpbmU7XG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgaHR0cFJlZGlyZWN0ID0ge1xuICAgICAgICAgICAgaW5jb2duaXRvOiBib29sVG9JbnQodGFiLmluY29nbml0byksXG4gICAgICAgICAgICBjcmF3bF9pZDogY3Jhd2xJRCxcbiAgICAgICAgICAgIG9sZF9yZXF1ZXN0X3VybDogZXNjYXBlVXJsKGRldGFpbHMudXJsKSxcbiAgICAgICAgICAgIG9sZF9yZXF1ZXN0X2lkOiBkZXRhaWxzLnJlcXVlc3RJZCxcbiAgICAgICAgICAgIG5ld19yZXF1ZXN0X3VybDogZXNjYXBlVXJsKGRldGFpbHMucmVkaXJlY3RVcmwpLFxuICAgICAgICAgICAgbmV3X3JlcXVlc3RfaWQ6IG51bGwsXG4gICAgICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgICAgIGV2ZW50X29yZGluYWw6IGV2ZW50T3JkaW5hbCxcbiAgICAgICAgICAgIHdpbmRvd19pZDogdGFiLndpbmRvd0lkLFxuICAgICAgICAgICAgdGFiX2lkOiBkZXRhaWxzLnRhYklkLFxuICAgICAgICAgICAgZnJhbWVfaWQ6IGRldGFpbHMuZnJhbWVJZCxcbiAgICAgICAgICAgIHJlc3BvbnNlX3N0YXR1czogcmVzcG9uc2VTdGF0dXMsXG4gICAgICAgICAgICByZXNwb25zZV9zdGF0dXNfdGV4dDogZXNjYXBlU3RyaW5nKHJlc3BvbnNlU3RhdHVzVGV4dCksXG4gICAgICAgICAgICB0aW1lX3N0YW1wOiBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVkaXJlY3RzXCIsIGh0dHBSZWRpcmVjdCk7XG4gICAgfVxuICAgIC8qXG4gICAgICogSFRUUCBSZXNwb25zZSBIYW5kbGVycyBhbmQgSGVscGVyIEZ1bmN0aW9uc1xuICAgICAqL1xuICAgIGFzeW5jIGxvZ1dpdGhSZXNwb25zZUJvZHkoZGV0YWlscywgdXBkYXRlKSB7XG4gICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlQm9keUxpc3RlbmVyID0gcGVuZGluZ1Jlc3BvbnNlLnJlc3BvbnNlQm9keUxpc3RlbmVyO1xuICAgICAgICAgICAgY29uc3QgcmVzcEJvZHkgPSBhd2FpdCByZXNwb25zZUJvZHlMaXN0ZW5lci5nZXRSZXNwb25zZUJvZHkoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRIYXNoID0gYXdhaXQgcmVzcG9uc2VCb2R5TGlzdGVuZXIuZ2V0Q29udGVudEhhc2goKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVDb250ZW50KGVzY2FwZVN0cmluZyhyZXNwQm9keSksIGVzY2FwZVN0cmluZyhjb250ZW50SGFzaCkpO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5sb2dFcnJvcihcbiAgICAgICAgICAgICAgXCJVbmFibGUgdG8gcmV0cmlldmUgcmVzcG9uc2UgYm9keS5cIiArIEpTT04uc3RyaW5naWZ5KGFSZWFzb24pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50X2hhc2ggPSBcIjxlcnJvcj5cIjtcbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZXNwb25zZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIlVuYWJsZSB0byByZXRyaWV2ZSByZXNwb25zZSBib2R5LlwiICtcbiAgICAgICAgICAgICAgICBcIkxpa2VseSBjYXVzZWQgYnkgYSBwcm9ncmFtbWluZyBlcnJvci4gRXJyb3IgTWVzc2FnZTpcIiArXG4gICAgICAgICAgICAgICAgZXJyLm5hbWUgK1xuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgICBlcnIuc3RhY2spO1xuICAgICAgICAgICAgdXBkYXRlLmNvbnRlbnRfaGFzaCA9IFwiPGVycm9yPlwiO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhpcyByZXF1ZXN0IGlzIGxvYWRpbmcgamF2YXNjcmlwdFxuICAgICAqIFdlIHJlbHkgbW9zdGx5IG9uIHRoZSBjb250ZW50IHBvbGljeSB0eXBlIHRvIGZpbHRlciByZXNwb25zZXNcbiAgICAgKiBhbmQgZmFsbCBiYWNrIHRvIHRoZSBVUkkgYW5kIGNvbnRlbnQgdHlwZSBzdHJpbmcgZm9yIHR5cGVzIHRoYXQgY2FuXG4gICAgICogbG9hZCB2YXJpb3VzIHJlc291cmNlIHR5cGVzLlxuICAgICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL0FkZC1vbnMvV2ViRXh0ZW5zaW9ucy9BUEkvd2ViUmVxdWVzdC9SZXNvdXJjZVR5cGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZVR5cGVcbiAgICAgKi9cbiAgICBpc0pTKHJlc291cmNlVHlwZSkge1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VUeXBlID09PSBcInNjcmlwdFwiO1xuICAgIH1cbiAgICAvLyBJbnN0cnVtZW50IEhUVFAgcmVzcG9uc2VzXG4gICAgYXN5bmMgb25Db21wbGV0ZWRIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGV2ZW50T3JkaW5hbCwgc2F2ZUphdmFzY3JpcHQsIHNhdmVBbGxDb250ZW50KSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwib25Db21wbGV0ZWRIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICAgc2F2ZUphdmFzY3JpcHQsXG4gICAgICAgICAgc2F2ZUFsbENvbnRlbnQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQodGFiLmluY29nbml0byk7XG4gICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IGNyYXdsSUQ7XG4gICAgICAgIHVwZGF0ZS5leHRlbnNpb25fc2Vzc2lvbl91dWlkID0gZXh0ZW5zaW9uU2Vzc2lvblV1aWQ7XG4gICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gZXZlbnRPcmRpbmFsO1xuICAgICAgICB1cGRhdGUud2luZG93X2lkID0gdGFiLndpbmRvd0lkO1xuICAgICAgICB1cGRhdGUudGFiX2lkID0gZGV0YWlscy50YWJJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2lkID0gZGV0YWlscy5mcmFtZUlkO1xuICAgICAgICAvLyByZXF1ZXN0SWQgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpbmsgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgICAgICB1cGRhdGUucmVxdWVzdF9pZCA9IGRldGFpbHMucmVxdWVzdElkO1xuICAgICAgICBjb25zdCBpc0NhY2hlZCA9IGRldGFpbHMuZnJvbUNhY2hlO1xuICAgICAgICB1cGRhdGUuaXNfY2FjaGVkID0gYm9vbFRvSW50KGlzQ2FjaGVkKTtcbiAgICAgICAgY29uc3QgdXJsID0gZGV0YWlscy51cmw7XG4gICAgICAgIHVwZGF0ZS51cmwgPSBlc2NhcGVVcmwodXJsKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IGRldGFpbHMubWV0aG9kO1xuICAgICAgICB1cGRhdGUubWV0aG9kID0gZXNjYXBlU3RyaW5nKHJlcXVlc3RNZXRob2QpO1xuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIC8vIChyZXF1ZXN0IGhlYWRlcnMgYXJlIG5vdCBhdmFpbGFibGUgaW4gaHR0cCByZXNwb25zZSBldmVudCBsaXN0ZW5lciBvYmplY3QsXG4gICAgICAgIC8vIGJ1dCB0aGUgcmVmZXJyZXIgcHJvcGVydHkgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcmVxdWVzdCBjb3VsZCBiZSBxdWVyaWVkKVxuICAgICAgICAvL1xuICAgICAgICAvLyBsZXQgcmVmZXJyZXIgPSBcIlwiO1xuICAgICAgICAvLyBpZiAoZGV0YWlscy5yZWZlcnJlcikge1xuICAgICAgICAvLyAgIHJlZmVycmVyID0gZGV0YWlscy5yZWZlcnJlci5zcGVjO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHVwZGF0ZS5yZWZlcnJlciA9IGVzY2FwZVN0cmluZyhyZWZlcnJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gZGV0YWlscy5zdGF0dXNDb2RlO1xuICAgICAgICB1cGRhdGUucmVzcG9uc2Vfc3RhdHVzID0gcmVzcG9uc2VTdGF0dXM7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzVGV4dCA9IGRldGFpbHMuc3RhdHVzTGluZTtcbiAgICAgICAgdXBkYXRlLnJlc3BvbnNlX3N0YXR1c190ZXh0ID0gZXNjYXBlU3RyaW5nKHJlc3BvbnNlU3RhdHVzVGV4dCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfdGltZSA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKTtcbiAgICAgICAgdXBkYXRlLnRpbWVfc3RhbXAgPSBjdXJyZW50X3RpbWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICBsZXQgbG9jYXRpb24gPSBcIlwiO1xuICAgICAgICBpZiAoZGV0YWlscy5yZXNwb25zZUhlYWRlcnMpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVzcG9uc2VIZWFkZXJzLm1hcChyZXNwb25zZUhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gcmVzcG9uc2VIZWFkZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyX3BhaXIgPSBbXTtcbiAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhuYW1lKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyX3BhaXIpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwibG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS5oZWFkZXJzID0gSlNPTi5zdHJpbmdpZnkoaGVhZGVycyk7XG4gICAgICAgIHVwZGF0ZS5sb2NhdGlvbiA9IGVzY2FwZVN0cmluZyhsb2NhdGlvbik7XG4gICAgICAgIGlmIChzYXZlQWxsQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5sb2dXaXRoUmVzcG9uc2VCb2R5KGRldGFpbHMsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2F2ZUphdmFzY3JpcHQgJiYgdGhpcy5pc0pTKGRldGFpbHMudHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nV2l0aFJlc3BvbnNlQm9keShkZXRhaWxzLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0MxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZhSFIwY0MxcGJuTjBjblZ0Wlc1MExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeE5RVUZOTEhkRFFVRjNReXhEUVVGRE8wRkJRMnBHTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEN0Q1FVRXJRaXhEUVVGRE8wRkJRM0pGTEU5QlFVOHNSVUZCUlN4alFVRmpMRVZCUVhGQ0xFMUJRVTBzZVVKQlFYbENMRU5CUVVNN1FVRkROVVVzVDBGQlR5eEZRVUZGTEdOQlFXTXNSVUZCUlN4TlFVRk5MSGRDUVVGM1FpeERRVUZETzBGQlEzaEVMRTlCUVU4c1JVRkJSU3hsUVVGbExFVkJRVVVzVFVGQlRTeDVRa0ZCZVVJc1EwRkJRenRCUVVreFJDeFBRVUZQTEVWQlFVVXNVMEZCVXl4RlFVRkZMRmxCUVZrc1JVRkJSU3hUUVVGVExFVkJRVVVzVFVGQlRTeHhRa0ZCY1VJc1EwRkJRenRCUVZONlJUczdPenM3TzBkQlRVYzdRVUZGU0N4TlFVRk5MRTlCUVU4c1kwRkJZenRKUVdGNlFpeFpRVUZaTEZsQlFWazdVVUZZYUVJc2IwSkJRV1VzUjBGRmJrSXNSVUZCUlN4RFFVRkRPMUZCUTBNc2NVSkJRV2RDTEVkQlJYQkNMRVZCUVVVc1EwRkJRenRSUVU5TUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NXVUZCV1N4RFFVRkRPMGxCUTI1RExFTkJRVU03U1VGRlRTeEhRVUZITEVOQlFVTXNUMEZCVHl4RlFVRkZMR05CUVdNc1JVRkJSU3hqUVVGak8xRkJRMmhFTEUxQlFVMHNVVUZCVVN4SFFVRnRRanRaUVVNdlFpeFJRVUZSTzFsQlExSXNXVUZCV1R0WlFVTmFMRTFCUVUwN1dVRkRUaXhQUVVGUE8xbEJRMUFzVlVGQlZUdFpRVU5XTEZsQlFWazdXVUZEV2l4UFFVRlBPMWxCUTFBc1VVRkJVVHRaUVVOU0xHMUNRVUZ0UWp0WlFVTnVRaXhOUVVGTk8xbEJRMDRzVVVGQlVUdFpRVU5TTEdsQ1FVRnBRanRaUVVOcVFpeFpRVUZaTzFsQlExb3NWMEZCVnp0WlFVTllMR05CUVdNN1dVRkRaQ3hYUVVGWE8xbEJRMWdzUzBGQlN6dFpRVU5NTEZOQlFWTTdXVUZEVkN4blFrRkJaMEk3V1VGRGFFSXNUVUZCVFR0WlFVTk9MRTlCUVU4N1UwRkRVaXhEUVVGRE8xRkJSVVlzVFVGQlRTeE5RVUZOTEVkQlFXdENMRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zV1VGQldTeERRVUZETEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJSWGhGTEUxQlFVMHNlVUpCUVhsQ0xFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVTdXVUZETVVNc1QwRkJUeXhEUVVOTUxFOUJRVThzUTBGQlF5eFRRVUZUTEVsQlFVa3NUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGRGVFVXNRMEZCUXp0UlFVTktMRU5CUVVNc1EwRkJRenRSUVVWR096dFhRVVZITzFGQlJVZ3NTVUZCU1N4RFFVRkRMSFZDUVVGMVFpeEhRVUZITEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTNaRExFMUJRVTBzSzBKQlFTdENMRWRCUVhGQ0xFVkJRVVVzUTBGQlF6dFpRVU0zUkN4eFEwRkJjVU03V1VGRGNrTXNTVUZCU1N4NVFrRkJlVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRkRU1zVDBGQlR5d3JRa0ZCSzBJc1EwRkJRenRoUVVONFF6dFpRVU5FTEUxQlFVMHNZMEZCWXl4SFFVRkhMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03V1VGRGFrVXNZMEZCWXl4RFFVRkRMR3REUVVGclF5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUXpORUxFMUJRVTBzWlVGQlpTeEhRVUZITEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRia1VzWlVGQlpTeERRVUZETEd0RFFVRnJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6VkVMRWxCUVVrc1kwRkJZeXhGUVVGRk8yZENRVU5zUWl4bFFVRmxMRU5CUVVNc0swSkJRU3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1lVRkRNVVE3YVVKQlFVMHNTVUZCU1N4alFVRmpMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1owSkJRM0JFTEdWQlFXVXNRMEZCUXl3clFrRkJLMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0aFFVTXhSRHRaUVVORUxFOUJRVThzSzBKQlFTdENMRU5CUVVNN1VVRkRla01zUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhsUVVGbExFTkJRVU1zVjBGQlZ5eERRVU0xUXl4SlFVRkpMRU5CUVVNc2RVSkJRWFZDTEVWQlF6VkNMRTFCUVUwc1JVRkRUaXhqUVVGakxFbEJRVWtzWTBGQll6dFpRVU01UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhoUVVGaExFVkJRVVVzVlVGQlZTeERRVUZETzFsQlF6ZENMRU5CUVVNc1EwRkJReXhEUVVGRExHRkJRV0VzUTBGQlF5eERRVU53UWl4RFFVRkRPMUZCUlVZc1NVRkJTU3hEUVVGRExESkNRVUV5UWl4SFFVRkhMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRek5ETEhGRFFVRnhRenRaUVVOeVF5eEpRVUZKTEhsQ1FVRjVRaXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTjBReXhQUVVGUE8yRkJRMUk3V1VGRFJDeE5RVUZOTEdOQlFXTXNSMEZCUnl4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xbEJRMnBGTEdOQlFXTXNRMEZCUXl4elEwRkJjME1zUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTXZSQ3hKUVVGSkxFTkJRVU1zTUVKQlFUQkNMRU5CUXpkQ0xFOUJRVThzUlVGRFVDeFBRVUZQTEVWQlExQXNkVUpCUVhWQ0xFVkJRVVVzUTBGRE1VSXNRMEZCUXp0UlFVTktMRU5CUVVNc1EwRkJRenRSUVVOR0xFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zVjBGQlZ5eERRVU5vUkN4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVWQlEyaERMRTFCUVUwc1JVRkRUaXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUTI1Q0xFTkJRVU03VVVGRlJpeEpRVUZKTEVOQlFVTXNkMEpCUVhkQ0xFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVTdXVUZEZUVNc2NVTkJRWEZETzFsQlEzSkRMRWxCUVVrc2VVSkJRWGxDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1owSkJRM1JETEU5QlFVODdZVUZEVWp0WlFVTkVMRWxCUVVrc1EwRkJReXgxUWtGQmRVSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxIVkNRVUYxUWl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNMVJTeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRmRCUVZjc1EwRkROME1zU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhGUVVNM1FpeE5RVUZOTEVWQlEwNHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVU53UWl4RFFVRkRPMUZCUlVZc1NVRkJTU3hEUVVGRExHMUNRVUZ0UWl4SFFVRkhMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRMjVETEhGRFFVRnhRenRaUVVOeVF5eEpRVUZKTEhsQ1FVRjVRaXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzJkQ1FVTjBReXhQUVVGUE8yRkJRMUk3V1VGRFJDeE5RVUZOTEdWQlFXVXNSMEZCUnl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xbEJRMjVGTEdWQlFXVXNRMEZCUXl3NFFrRkJPRUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTjRSQ3hKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUTNKQ0xFOUJRVThzUlVGRFVDeFBRVUZQTEVWQlExQXNkVUpCUVhWQ0xFVkJRVVVzUlVGRGVrSXNZMEZCWXl4RlFVTmtMR05CUVdNc1EwRkRaaXhEUVVGRE8xRkJRMG9zUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhYUVVGWExFTkJRVU1zVjBGQlZ5eERRVU40UXl4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVWQlEzaENMRTFCUVUwc1JVRkRUaXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUTNCQ0xFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVMHNUMEZCVHp0UlFVTmFMRWxCUVVrc1NVRkJTU3hEUVVGRExIVkNRVUYxUWl4RlFVRkZPMWxCUTJoRExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNaVUZCWlN4RFFVRkRMR05CUVdNc1EwRkRMME1zU1VGQlNTeERRVUZETEhWQ1FVRjFRaXhEUVVNM1FpeERRVUZETzFOQlEwZzdVVUZEUkN4SlFVRkpMRWxCUVVrc1EwRkJReXd5UWtGQk1rSXNSVUZCUlR0WlFVTndReXhQUVVGUExFTkJRVU1zVlVGQlZTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExHTkJRV01zUTBGRGJrUXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeERRVU5xUXl4RFFVRkRPMU5CUTBnN1VVRkRSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1JVRkJSVHRaUVVOcVF5eFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeERRVUZETEdOQlFXTXNRMEZEYUVRc1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RFFVTTVRaXhEUVVGRE8xTkJRMGc3VVVGRFJDeEpRVUZKTEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUlVGQlJUdFpRVU0xUWl4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExGZEJRVmNzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdVMEZEZWtVN1NVRkRTQ3hEUVVGRE8wbEJSVThzYVVKQlFXbENMRU5CUVVNc1UwRkJVenRSUVVOcVF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhUUVVGVExFTkJRVU1zUlVGQlJUdFpRVU53UXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRExGTkJRVk1zUTBGQlF5eEhRVUZITEVsQlFVa3NZMEZCWXl4RlFVRkZMRU5CUVVNN1UwRkRlRVE3VVVGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03U1VGRGVrTXNRMEZCUXp0SlFVVlBMR3RDUVVGclFpeERRVUZETEZOQlFWTTdVVUZEYkVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFTkJRVU1zUlVGQlJUdFpRVU55UXl4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hsUVVGbExFVkJRVVVzUTBGQlF6dFRRVU14UkR0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8wbEJRekZETEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVWSU96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzAxQmEwTkZPMGxCUlUwc1MwRkJTeXhEUVVGRExEQkNRVUV3UWl4RFFVTjBReXhQUVVGclJDeEZRVU5zUkN4UFFVRlBMRVZCUTFBc1dVRkJiMEk3VVVGRmNFSTdPenM3T3p0VlFVMUZPMUZCUlVZc1RVRkJUU3hIUVVGSExFZEJRMUFzVDBGQlR5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRUlzUTBGQlF5eERRVUZETEUxQlFVMHNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTjJReXhEUVVGRExFTkJRVU1zUlVGQlJTeFJRVUZSTEVWQlFVVXNVMEZCVXl4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUlN4RFFVRkRPMUZCUlhCRkxFMUJRVTBzVFVGQlRTeEhRVUZITEVWQlFXbENMRU5CUVVNN1VVRkZha01zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4VFFVRlRMRU5CUVVNc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzFGQlF6VkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETzFGQlF6RkNMRTFCUVUwc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU55UkN4TlFVRk5MRU5CUVVNc1lVRkJZU3hIUVVGSExGbEJRVmtzUTBGQlF6dFJRVU53UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExFZEJRVWNzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZEYUVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUXpsQ0xFMUJRVTBzUTBGQlF5eFJRVUZSTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVWc1F5eHRSa0ZCYlVZN1VVRkRia1lzVFVGQlRTeERRVUZETEZWQlFWVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJSWFJETEdkRVFVRm5SRHRSUVVOb1JDeDNSRUZCZDBRN1VVRkZlRVFzVFVGQlRTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRSUVVONFFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4SFFVRkhMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVVUxUWl4TlFVRk5MR0ZCUVdFc1IwRkJSeXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETzFGQlEzSkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFZEJRVWNzV1VGQldTeERRVUZETEdGQlFXRXNRMEZCUXl4RFFVRkRPMUZCUlRWRExFMUJRVTBzV1VGQldTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVXZReXhKUVVGSkxGbEJRVmtzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZEZEVJc1NVRkJTU3hSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEyeENMRTFCUVUwc1QwRkJUeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU51UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU03VVVGRGJrSXNTVUZCU1N4UFFVRlBMRU5CUVVNc1kwRkJZeXhGUVVGRk8xbEJRekZDTEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1IwRkJSeXhEUVVGRExHRkJRV0VzUTBGQlF5eEZRVUZGTzJkQ1FVTjZReXhOUVVGTkxFVkJRVVVzU1VGQlNTeEZRVUZGTEV0QlFVc3NSVUZCUlN4SFFVRkhMR0ZCUVdFc1EwRkJRenRuUWtGRGRFTXNUVUZCVFN4WFFVRlhMRWRCUVVjc1JVRkJSU3hEUVVGRE8yZENRVU4yUWl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOeVF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTjBReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMmRDUVVNeFFpeEpRVUZKTEVsQlFVa3NTMEZCU3l4alFVRmpMRVZCUVVVN2IwSkJRek5DTEZsQlFWa3NSMEZCUnl4TFFVRkxMRU5CUVVNN2IwSkJRM0pDTEVsQlFVa3NXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRk8zZENRVU16UkN4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRE8zRkNRVU5tTzJsQ1FVTkdPMmRDUVVORUxFbEJRVWtzU1VGQlNTeExRVUZMTEZOQlFWTXNSVUZCUlR0dlFrRkRkRUlzVVVGQlVTeEhRVUZITEV0QlFVc3NRMEZCUXp0cFFrRkRiRUk3V1VGRFNDeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTktPMUZCUlVRc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFpRVUZaTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkZla01zU1VGQlNTeGhRVUZoTEV0QlFVc3NUVUZCVFN4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExHbERRVUZwUXl4RlFVRkZPMWxCUTNwRkxFMUJRVTBzWTBGQll5eEhRVUZITEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRha1VzVFVGQlRTeFJRVUZSTEVkQlFVY3NUVUZCVFN4alFVRmpMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRiRVVzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0blFrRkRZaXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZGQlFWRXNRMEZEZUVJc2NVZEJRWEZITEVOQlEzUkhMRU5CUVVNN1lVRkRTRHRwUWtGQlRUdG5Ra0ZEVEN4TlFVRk5MREpDUVVFeVFpeEhRVUZITEUxQlFVMHNZMEZCWXl4RFFVRkRMREpDUVVFeVFpeERRVUZETzJkQ1FVTnlSaXhOUVVGTkxGZEJRVmNzUjBGQlJ5d3lRa0ZCTWtJc1EwRkJReXhYUVVGWExFTkJRVU03WjBKQlJUVkVMRWxCUVVrc1YwRkJWeXhGUVVGRk8yOUNRVU5tTEUxQlFVMHNWVUZCVlN4SFFVRkhMRWxCUVVrc1kwRkJZenR2UWtGRGJrTXNWMEZCVnp0dlFrRkRXQ3d5UWtGQk1rSXNSVUZETTBJc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGRGJFSXNRMEZCUXp0dlFrRkRSaXhOUVVGTkxFOUJRVThzUjBGQmMwSXNWVUZCVlR0NVFrRkRNVU1zWjBKQlFXZENMRVZCUldZc1EwRkJRenR2UWtGRlRDeG5SRUZCWjBRN2IwSkJRMmhFTEVsQlFVa3NZMEZCWXl4SlFVRkpMRTlCUVU4c1JVRkJSVHQzUWtGRE4wSXNNRVpCUVRCR08zZENRVU14Uml4dFIwRkJiVWM3ZDBKQlEyNUhMRTFCUVUwc1kwRkJZeXhIUVVGSE96UkNRVU55UWl4alFVRmpPelJDUVVOa0xIRkNRVUZ4UWpzMFFrRkRja0lzWjBKQlFXZENPM2xDUVVOcVFpeERRVUZETzNkQ1FVTkdMRXRCUVVzc1RVRkJUU3hKUVVGSkxFbEJRVWtzVDBGQlR5eERRVUZETEZsQlFWa3NSVUZCUlRzMFFrRkRka01zU1VGQlNTeGpRVUZqTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRk8yZERRVU5xUXl4TlFVRk5MRmRCUVZjc1IwRkJSeXhGUVVGRkxFTkJRVU03WjBOQlEzWkNMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owTkJRM0pETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yZERRVU16UkN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZET3paQ1FVTXpRanQ1UWtGRFJqdHhRa0ZEUmp0dlFrRkRSQ3dyUmtGQkswWTdiMEpCUXk5R0xFbEJRVWtzVjBGQlZ5eEpRVUZKTEU5QlFVOHNSVUZCUlR0M1FrRkRNVUlzVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRE8zRkNRVU4wUXp0cFFrRkRSanRoUVVOR08xTkJRMFk3VVVGRlJDeE5RVUZOTEVOQlFVTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZGZWtNc1pVRkJaVHRSUVVObUxFMUJRVTBzUzBGQlN5eEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRXRCUVVzc1owSkJRV2RDTEVOQlFVTTdVVUZEYUVRc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eFRRVUZUTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1VVRkZha01zYlVOQlFXMURPMUZCUTI1RExFMUJRVTBzWTBGQll5eEhRVUZITEU5QlFVOHNRMEZCUXl4UFFVRlBMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRemRETEUxQlFVMHNWMEZCVnl4SFFVRkhMRTlCUVU4c1EwRkJReXhKUVVGSkxFdEJRVXNzVjBGQlZ5eERRVUZETzFGQlEycEVMRTFCUVUwc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRPMUZCUTJoRUxFMUJRVTBzUTBGQlF5eGhRVUZoTEVkQlFVY3NVMEZCVXl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE8xRkJSVGxETERaRFFVRTJRenRSUVVNM1F5eEpRVUZKTEdkQ1FVRm5RaXhEUVVGRE8xRkJRM0pDTEVsQlFVa3NZVUZCWVN4RFFVRkRPMUZCUTJ4Q0xFbEJRVWtzVDBGQlR5eERRVUZETEZOQlFWTXNSVUZCUlR0WlFVTnlRaXhOUVVGTkxHVkJRV1VzUjBGQlJ5eEpRVUZKTEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03V1VGRGJrUXNaMEpCUVdkQ0xFZEJRVWNzWlVGQlpTeERRVUZETEUxQlFVMHNRMEZCUXp0VFFVTXpRenRSUVVORUxFbEJRVWtzVDBGQlR5eERRVUZETEZkQlFWY3NSVUZCUlR0WlFVTjJRaXhOUVVGTkxHbENRVUZwUWl4SFFVRkhMRWxCUVVrc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXp0WlFVTjJSQ3hoUVVGaExFZEJRVWNzYVVKQlFXbENMRU5CUVVNc1RVRkJUU3hEUVVGRE8xTkJRekZETzFGQlEwUXNUVUZCVFN4RFFVRkRMR2xDUVVGcFFpeEhRVUZITEZsQlFWa3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eERRVUZETzFGQlF6RkVMRTFCUVUwc1EwRkJReXhqUVVGakxFZEJRVWNzV1VGQldTeERRVUZETEdGQlFXRXNRMEZCUXl4RFFVRkRPMUZCUlhCRUxIbENRVUY1UWp0UlFVTjZRaXg1UlVGQmVVVTdVVUZEZWtVc09FSkJRVGhDTzFGQlF6bENMRTFCUVUwc1YwRkJWeXhIUVVGSExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTTdVVUZEZUVNc1RVRkJUU3hEUVVGRExGbEJRVmtzUjBGQlJ5eFpRVUZaTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1VVRkZhRVFzYTBWQlFXdEZPMUZCUTJ4RkxHbEdRVUZwUmp0UlFVTnFSaXhwUWtGQmFVSTdVVUZEYWtJc2NVZEJRWEZITzFGQlEzSkhMRTFCUVUwc1EwRkJReXhoUVVGaExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXp0UlFVVndRenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08xVkJNRU5GTzFGQlEwWXNUVUZCVFN4RFFVRkRMR0ZCUVdFc1IwRkJSeXhUUVVGVExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUXpGRExFMUJRVTBzUTBGQlF5eGxRVUZsTEVkQlFVY3NUMEZCVHl4RFFVRkRMR0ZCUVdFc1EwRkJRenRSUVVNdlF5eE5RVUZOTEVOQlFVTXNaVUZCWlN4SFFVRkhMRmxCUVZrc1EwRkRia01zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRM1pETEVOQlFVTTdVVUZGUml4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGVkJRVlVzUTBGQlF5eGxRVUZsTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRlRVFzUTBGQlF6dEpRVVZQTEV0QlFVc3NRMEZCUXl4MVFrRkJkVUlzUTBGRGJrTXNUMEZCSzBNc1JVRkRMME1zVDBGQlR5eEZRVU5RTEZsQlFXOUNPMUZCUlhCQ096czdPenM3VlVGTlJUdFJRVVZHTERSQ1FVRTBRanRSUVVNMVFpeHBSRUZCYVVRN1VVRkZha1E3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08xVkJNa1JGTzFGQlJVWXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkZPVU1zVFVGQlRTeEhRVUZITEVkQlExQXNUMEZCVHl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGFFSXNRMEZCUXl4RFFVRkRMRTFCUVUwc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOMlF5eERRVUZETEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1UwRkJVeXhGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVXNRMEZCUXp0UlFVTndSQ3hOUVVGTkxGbEJRVmtzUjBGQmFVSTdXVUZEYWtNc1UwRkJVeXhGUVVGRkxGTkJRVk1zUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRPMWxCUTI1RExGRkJRVkVzUlVGQlJTeFBRVUZQTzFsQlEycENMR1ZCUVdVc1JVRkJSU3hUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0WlFVTjJReXhqUVVGakxFVkJRVVVzVDBGQlR5eERRVUZETEZOQlFWTTdXVUZEYWtNc1pVRkJaU3hGUVVGRkxGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRPMWxCUXk5RExHTkJRV01zUlVGQlJTeEpRVUZKTzFsQlEzQkNMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRaUVVNMVF5eGhRVUZoTEVWQlFVVXNXVUZCV1R0WlFVTXpRaXhUUVVGVExFVkJRVVVzUjBGQlJ5eERRVUZETEZGQlFWRTdXVUZEZGtJc1RVRkJUU3hGUVVGRkxFOUJRVThzUTBGQlF5eExRVUZMTzFsQlEzSkNMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVU1zVDBGQlR6dFpRVU42UWl4bFFVRmxMRVZCUVVVc1kwRkJZenRaUVVNdlFpeHZRa0ZCYjBJc1JVRkJSU3haUVVGWkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNN1dVRkRkRVFzVlVGQlZTeEZRVUZGTEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eFhRVUZYTEVWQlFVVTdVMEZEZEVRc1EwRkJRenRSUVVWR0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEZsQlFWa3NRMEZCUXl4RFFVRkRPMGxCUXk5RUxFTkJRVU03U1VGRlJEczdUMEZGUnp0SlFVVkxMRXRCUVVzc1EwRkJReXh0UWtGQmJVSXNRMEZETDBJc1QwRkJPRU1zUlVGRE9VTXNUVUZCVFR0UlFVVk9MRTFCUVUwc1pVRkJaU3hIUVVGSExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEYmtVc1NVRkJTVHRaUVVOR0xFMUJRVTBzYjBKQlFXOUNMRWRCUVVjc1pVRkJaU3hEUVVGRExHOUNRVUZ2UWl4RFFVRkRPMWxCUTJ4RkxFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNiMEpCUVc5Q0xFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTTdXVUZET1VRc1RVRkJUU3hYUVVGWExFZEJRVWNzVFVGQlRTeHZRa0ZCYjBJc1EwRkJReXhqUVVGakxFVkJRVVVzUTBGQlF6dFpRVU5vUlN4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGZEJRVmNzUTBGRE0wSXNXVUZCV1N4RFFVRkRMRkZCUVZFc1EwRkJReXhGUVVOMFFpeFpRVUZaTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUXpGQ0xFTkJRVU03V1VGRFJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXhuUWtGQlowSXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVONFJEdFJRVUZETEU5QlFVOHNSMEZCUnl4RlFVRkZPMWxCUTFvN096czdPenM3WTBGUFJUdFpRVU5HTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1VVRkJVU3hEUVVONFFpeHRRMEZCYlVNN1owSkJRMnBETEhORVFVRnpSRHRuUWtGRGRFUXNSMEZCUnl4RFFVRkRMRWxCUVVrN1owSkJRMUlzUjBGQlJ5eERRVUZETEU5QlFVODdaMEpCUTFnc1NVRkJTVHRuUWtGRFNpeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVTmFMRU5CUVVNN1dVRkRSaXhOUVVGTkxFTkJRVU1zV1VGQldTeEhRVUZITEZOQlFWTXNRMEZCUXp0WlFVTm9ReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTjRSRHRKUVVOSUxFTkJRVU03U1VGRlJEczdPenM3T3pzN1QwRlJSenRKUVVOTExFbEJRVWtzUTBGQlF5eFpRVUV3UWp0UlFVTnlReXhQUVVGUExGbEJRVmtzUzBGQlN5eFJRVUZSTEVOQlFVTTdTVUZEYmtNc1EwRkJRenRKUVVWRUxEUkNRVUUwUWp0SlFVTndRaXhMUVVGTExFTkJRVU1zYTBKQlFXdENMRU5CUXpsQ0xFOUJRVEJETEVWQlF6RkRMRTlCUVU4c1JVRkRVQ3haUVVGWkxFVkJRMW9zWTBGQll5eEZRVU5rTEdOQlFXTTdVVUZGWkRzN096czdPenM3VlVGUlJUdFJRVVZHTEUxQlFVMHNSMEZCUnl4SFFVTlFMRTlCUVU4c1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyaENMRU5CUVVNc1EwRkJReXhOUVVGTkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGRrTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1VVRkJVU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1VVRkZjRVFzVFVGQlRTeE5RVUZOTEVkQlFVY3NSVUZCYTBJc1EwRkJRenRSUVVWc1F5eE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZETlVNc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZETVVJc1RVRkJUU3hEUVVGRExITkNRVUZ6UWl4SFFVRkhMRzlDUVVGdlFpeERRVUZETzFGQlEzSkVMRTFCUVUwc1EwRkJReXhoUVVGaExFZEJRVWNzV1VGQldTeERRVUZETzFGQlEzQkRMRTFCUVUwc1EwRkJReXhUUVVGVExFZEJRVWNzUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTm9ReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkRPVUlzVFVGQlRTeERRVUZETEZGQlFWRXNSMEZCUnl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRE8xRkJSV3hETEcxR1FVRnRSanRSUVVOdVJpeE5RVUZOTEVOQlFVTXNWVUZCVlN4SFFVRkhMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU03VVVGRmRFTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF6dFJRVU51UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVVjJReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRPMUZCUTNoQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NVMEZCVXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJSVFZDTEUxQlFVMHNZVUZCWVN4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGNrTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhaUVVGWkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTTdVVUZGTlVNc01FUkJRVEJFTzFGQlF6RkVMRFpGUVVFMlJUdFJRVU0zUlN3eVJVRkJNa1U3VVVGRE0wVXNSVUZCUlR0UlFVTkdMSEZDUVVGeFFqdFJRVU55UWl3d1FrRkJNRUk3VVVGRE1VSXNjME5CUVhORE8xRkJRM1JETEVsQlFVazdVVUZEU2l3MFEwRkJORU03VVVGRk5VTXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MRU5CUVVNc1pVRkJaU3hIUVVGSExHTkJRV01zUTBGQlF6dFJRVVY0UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRPVU1zVFVGQlRTeERRVUZETEc5Q1FVRnZRaXhIUVVGSExGbEJRVmtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRE8xRkJSUzlFTEUxQlFVMHNXVUZCV1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEZsQlFWa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRSUVVVdlF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRia0lzU1VGQlNTeFJRVUZSTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJ4Q0xFbEJRVWtzVDBGQlR5eERRVUZETEdWQlFXVXNSVUZCUlR0WlFVTXpRaXhQUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1JVRkJSVHRuUWtGRE0wTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hMUVVGTExFVkJRVVVzUjBGQlJ5eGpRVUZqTEVOQlFVTTdaMEpCUTNaRExFMUJRVTBzVjBGQlZ5eEhRVUZITEVWQlFVVXNRMEZCUXp0blFrRkRka0lzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGRFTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEV0QlFVc3NWVUZCVlN4RlFVRkZPMjlDUVVOeVF5eFJRVUZSTEVkQlFVY3NTMEZCU3l4RFFVRkRPMmxDUVVOc1FqdFpRVU5JTEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTBvN1VVRkRSQ3hOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGVrTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdVVUZGZWtNc1NVRkJTU3hqUVVGakxFVkJRVVU3V1VGRGJFSXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVNelF6dGhRVUZOTEVsQlFVa3NZMEZCWXl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMWxCUTNCRUxFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVMEZETTBNN1lVRkJUVHRaUVVOTUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMU5CUTNoRU8wbEJRMGdzUTBGQlF6dERRVU5HSW4wPSIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcsIGVzY2FwZVVybCB9IGZyb20gXCIuLi9saWIvc3RyaW5nLXV0aWxzXCI7XG5leHBvcnQgY2xhc3MgSmF2YXNjcmlwdEluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udmVydHMgcmVjZWl2ZWQgY2FsbCBhbmQgdmFsdWVzIGRhdGEgZnJvbSB0aGUgSlMgSW5zdHJ1bWVudGF0aW9uXG4gICAgICogaW50byB0aGUgZm9ybWF0IHRoYXQgdGhlIHNjaGVtYSBleHBlY3RzLlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIHNlbmRlclxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9jZXNzQ2FsbHNBbmRWYWx1ZXMoZGF0YSwgc2VuZGVyKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgICAgICB1cGRhdGUuZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZCA9IGV4dGVuc2lvblNlc3Npb25VdWlkO1xuICAgICAgICB1cGRhdGUuZXZlbnRfb3JkaW5hbCA9IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCk7XG4gICAgICAgIHVwZGF0ZS5wYWdlX3Njb3BlZF9ldmVudF9vcmRpbmFsID0gZGF0YS5vcmRpbmFsO1xuICAgICAgICB1cGRhdGUud2luZG93X2lkID0gc2VuZGVyLnRhYi53aW5kb3dJZDtcbiAgICAgICAgdXBkYXRlLnRhYl9pZCA9IHNlbmRlci50YWIuaWQ7XG4gICAgICAgIHVwZGF0ZS5mcmFtZV9pZCA9IHNlbmRlci5mcmFtZUlkO1xuICAgICAgICB1cGRhdGUuc2NyaXB0X3VybCA9IGVzY2FwZVVybChkYXRhLnNjcmlwdFVybCk7XG4gICAgICAgIHVwZGF0ZS5zY3JpcHRfbGluZSA9IGVzY2FwZVN0cmluZyhkYXRhLnNjcmlwdExpbmUpO1xuICAgICAgICB1cGRhdGUuc2NyaXB0X2NvbCA9IGVzY2FwZVN0cmluZyhkYXRhLnNjcmlwdENvbCk7XG4gICAgICAgIHVwZGF0ZS5mdW5jX25hbWUgPSBlc2NhcGVTdHJpbmcoZGF0YS5mdW5jTmFtZSk7XG4gICAgICAgIHVwZGF0ZS5zY3JpcHRfbG9jX2V2YWwgPSBlc2NhcGVTdHJpbmcoZGF0YS5zY3JpcHRMb2NFdmFsKTtcbiAgICAgICAgdXBkYXRlLmNhbGxfc3RhY2sgPSBlc2NhcGVTdHJpbmcoZGF0YS5jYWxsU3RhY2spO1xuICAgICAgICB1cGRhdGUuc3ltYm9sID0gZXNjYXBlU3RyaW5nKGRhdGEuc3ltYm9sKTtcbiAgICAgICAgdXBkYXRlLm9wZXJhdGlvbiA9IGVzY2FwZVN0cmluZyhkYXRhLm9wZXJhdGlvbik7XG4gICAgICAgIHVwZGF0ZS52YWx1ZSA9IGVzY2FwZVN0cmluZyhkYXRhLnZhbHVlKTtcbiAgICAgICAgdXBkYXRlLnRpbWVfc3RhbXAgPSBkYXRhLnRpbWVTdGFtcDtcbiAgICAgICAgdXBkYXRlLmluY29nbml0byA9IGJvb2xUb0ludChzZW5kZXIudGFiLmluY29nbml0byk7XG4gICAgICAgIC8vIGRvY3VtZW50X3VybCBpcyB0aGUgY3VycmVudCBmcmFtZSdzIGRvY3VtZW50IGhyZWZcbiAgICAgICAgLy8gdG9wX2xldmVsX3VybCBpcyB0aGUgdG9wLWxldmVsIGZyYW1lJ3MgZG9jdW1lbnQgaHJlZlxuICAgICAgICB1cGRhdGUuZG9jdW1lbnRfdXJsID0gZXNjYXBlVXJsKHNlbmRlci51cmwpO1xuICAgICAgICB1cGRhdGUudG9wX2xldmVsX3VybCA9IGVzY2FwZVVybChzZW5kZXIudGFiLnVybCk7XG4gICAgICAgIGlmIChkYXRhLm9wZXJhdGlvbiA9PT0gXCJjYWxsXCIgJiYgZGF0YS5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHVwZGF0ZS5hcmd1bWVudHMgPSBlc2NhcGVTdHJpbmcoSlNPTi5zdHJpbmdpZnkoZGF0YS5hcmdzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVwZGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgbGlzdGVuaW5nIGZvciBtZXNzYWdlcyBmcm9tIHBhZ2UvY29udGVudC9iYWNrZ3JvdW5kIHNjcmlwdHMgaW5qZWN0ZWQgdG8gaW5zdHJ1bWVudCBKYXZhU2NyaXB0IEFQSXNcbiAgICAgKi9cbiAgICBsaXN0ZW4oKSB7XG4gICAgICAgIHRoaXMub25NZXNzYWdlTGlzdGVuZXIgPSAobWVzc2FnZSwgc2VuZGVyKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRlYnVnKFwiamF2YXNjcmlwdC1pbnN0cnVtZW50YXRpb24gYmFja2dyb3VuZCBsaXN0ZW5lclwiLCB7bWVzc2FnZSwgc2VuZGVyfSwgdGhpcy5jb25maWd1cmVkKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLm5hbWVzcGFjZSAmJlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubmFtZXNwYWNlID09PSBcImphdmFzY3JpcHQtaW5zdHJ1bWVudGF0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUpzSW5zdHJ1bWVudGF0aW9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgc2VuZHMgdGhlIGxvZyBkYXRhIHRvIHRoZSBkYXRhUmVjZWl2ZXIgb3Igc3RvcmUgaXQgaW4gbWVtb3J5XG4gICAgICogYXMgYSBwZW5kaW5nIHJlY29yZCBpZiB0aGUgSlMgaW5zdHJ1bWVudGF0aW9uIGlzIG5vdCB5ZXQgY29uZmlndXJlZFxuICAgICAqIEBwYXJhbSBtZXNzYWdlXG4gICAgICogQHBhcmFtIHNlbmRlclxuICAgICAqL1xuICAgIGhhbmRsZUpzSW5zdHJ1bWVudGF0aW9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIpIHtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsb2dDYWxsXCI6XG4gICAgICAgICAgICBjYXNlIFwibG9nVmFsdWVcIjpcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGUgPSBKYXZhc2NyaXB0SW5zdHJ1bWVudC5wcm9jZXNzQ2FsbHNBbmRWYWx1ZXMobWVzc2FnZS5kYXRhLCBzZW5kZXIpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlLmNyYXdsX2lkID0gdGhpcy5jcmF3bElEO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdFwiLCB1cGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3Jkcy5wdXNoKHVwZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBsaXN0ZW5pbmcgaWYgaGF2ZW4ndCBkb25lIHNvIGFscmVhZHksIHNldHMgdGhlIGNyYXdsIElELFxuICAgICAqIG1hcmtzIHRoZSBKUyBpbnN0cnVtZW50YXRpb24gYXMgY29uZmlndXJlZCBhbmQgc2VuZHMgYW55IHBlbmRpbmdcbiAgICAgKiByZWNvcmRzIHRoYXQgaGF2ZSBiZWVuIHJlY2VpdmVkIHVwIHVudGlsIHRoaXMgcG9pbnQuXG4gICAgICogQHBhcmFtIGNyYXdsSURcbiAgICAgKi9cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICBpZiAoIXRoaXMub25NZXNzYWdlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmF3bElEID0gY3Jhd2xJRDtcbiAgICAgICAgdGhpcy5jb25maWd1cmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3Jkcy5tYXAodXBkYXRlID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IHRoaXMuY3Jhd2xJRDtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJqYXZhc2NyaXB0XCIsIHVwZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnBlbmRpbmdSZWNvcmRzID0gW107XG4gICAgICAgIGlmICh0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZhbUYyWVhOamNtbHdkQzFwYm5OMGNuVnRaVzUwTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVTkJMRTlCUVU4c1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4TlFVRk5MSGREUVVGM1F5eERRVUZETzBGQlEycEdMRTlCUVU4c1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4TlFVRk5MQ3RDUVVFclFpeERRVUZETzBGQlEzSkZMRTlCUVU4c1JVRkJSU3hUUVVGVExFVkJRVVVzV1VGQldTeEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MSEZDUVVGeFFpeERRVUZETzBGQlIzcEZMRTFCUVUwc1QwRkJUeXh2UWtGQmIwSTdTVUUwUXk5Q0xGbEJRVmtzV1VGQldUdFJRVXBvUWl4bFFVRlZMRWRCUVZrc1MwRkJTeXhEUVVGRE8xRkJRelZDTEcxQ1FVRmpMRWRCUVRCQ0xFVkJRVVVzUTBGQlF6dFJRVWxxUkN4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExGbEJRVmtzUTBGQlF6dEpRVU51UXl4RFFVRkRPMGxCTjBORU96czdPenRQUVV0SE8wbEJRMHNzVFVGQlRTeERRVUZETEhGQ1FVRnhRaXhEUVVGRExFbEJRVWtzUlVGQlJTeE5RVUZ4UWp0UlFVTTVSQ3hOUVVGTkxFMUJRVTBzUjBGQlJ5eEZRVUY1UWl4RFFVRkRPMUZCUTNwRExFMUJRVTBzUTBGQlF5eHpRa0ZCYzBJc1IwRkJSeXh2UWtGQmIwSXNRMEZCUXp0UlFVTnlSQ3hOUVVGTkxFTkJRVU1zWVVGQllTeEhRVUZITEhWQ1FVRjFRaXhGUVVGRkxFTkJRVU03VVVGRGFrUXNUVUZCVFN4RFFVRkRMSGxDUVVGNVFpeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1VVRkRhRVFzVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU4yUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRPMUZCUXpsQ0xFMUJRVTBzUTBGQlF5eFJRVUZSTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVOcVF5eE5RVUZOTEVOQlFVTXNWVUZCVlN4SFFVRkhMRk5CUVZNc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZET1VNc1RVRkJUU3hEUVVGRExGZEJRVmNzUjBGQlJ5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8xRkJRMjVFTEUxQlFVMHNRMEZCUXl4VlFVRlZMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFTkJRVU1zVTBGQlV5eEhRVUZITEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGREwwTXNUVUZCVFN4RFFVRkRMR1ZCUVdVc1IwRkJSeXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEdGQlFXRXNRMEZCUXl4RFFVRkRPMUZCUXpGRUxFMUJRVTBzUTBGQlF5eFZRVUZWTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRNVU1zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzFGQlEyaEVMRTFCUVUwc1EwRkJReXhMUVVGTExFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRSUVVONFF5eE5RVUZOTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRGJrTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhUUVVGVExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVWdVJDeHZSRUZCYjBRN1VVRkRjRVFzZFVSQlFYVkVPMUZCUTNaRUxFMUJRVTBzUTBGQlF5eFpRVUZaTEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU0xUXl4TlFVRk5MRU5CUVVNc1lVRkJZU3hIUVVGSExGTkJRVk1zUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJSV3BFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRk5CUVZNc1MwRkJTeXhOUVVGTkxFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhGUVVGRk8xbEJRM0pFTEUxQlFVMHNRMEZCUXl4VFFVRlRMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRE5VUTdVVUZGUkN4UFFVRlBMRTFCUVUwc1EwRkJRenRKUVVOb1FpeERRVUZETzBsQlYwUTdPMDlCUlVjN1NVRkRTU3hOUVVGTk8xRkJRMWdzU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4RlFVRkZPMWxCUXpORExIVkhRVUYxUnp0WlFVTjJSeXhKUVVORkxFOUJRVThzUTBGQlF5eFRRVUZUTzJkQ1FVTnFRaXhQUVVGUExFTkJRVU1zVTBGQlV5eExRVUZMTERSQ1FVRTBRaXhGUVVOc1JEdG5Ra0ZEUVN4SlFVRkpMRU5CUVVNc09FSkJRVGhDTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8yRkJRM1JFTzFGQlEwZ3NRMEZCUXl4RFFVRkRPMUZCUTBZc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RFFVRkRPMGxCUTJoRkxFTkJRVU03U1VGRlJEczdPenM3VDBGTFJ6dEpRVU5KTERoQ1FVRTRRaXhEUVVGRExFOUJRVThzUlVGQlJTeE5RVUZ4UWp0UlFVTnNSU3hSUVVGUkxFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVTdXVUZEY0VJc1MwRkJTeXhUUVVGVExFTkJRVU03V1VGRFppeExRVUZMTEZWQlFWVTdaMEpCUTJJc1RVRkJUU3hOUVVGTkxFZEJRVWNzYjBKQlFXOUNMRU5CUVVNc2NVSkJRWEZDTEVOQlEzWkVMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRMW9zVFVGQlRTeERRVU5RTEVOQlFVTTdaMEpCUTBZc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEZRVUZGTzI5Q1FVTnVRaXhOUVVGTkxFTkJRVU1zVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN2IwSkJReTlDTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1ZVRkJWU3hEUVVGRExGbEJRVmtzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0cFFrRkRjRVE3Y1VKQlFVMDdiMEpCUTB3c1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN2FVSkJRMnhETzJkQ1FVTkVMRTFCUVUwN1UwRkRWRHRKUVVOSUxFTkJRVU03U1VGRlJEczdPenM3VDBGTFJ6dEpRVU5KTEVkQlFVY3NRMEZCUXl4UFFVRlBPMUZCUTJoQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVU3V1VGRE0wSXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRE8xTkJRMlk3VVVGRFJDeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRTlCUVU4c1EwRkJRenRSUVVOMlFpeEpRVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVOMlFpeEpRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJUdFpRVU12UWl4TlFVRk5MRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZETDBJc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFZRVUZWTEVOQlFVTXNXVUZCV1N4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8xRkJRM0pFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWTkxFOUJRVTg3VVVGRFdpeEpRVUZKTEVOQlFVTXNZMEZCWXl4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVONlFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFpRVU14UWl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdVMEZEYkVVN1NVRkRTQ3hEUVVGRE8wTkJRMFlpZlE9PSIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgUGVuZGluZ05hdmlnYXRpb24gfSBmcm9tIFwiLi4vbGliL3BlbmRpbmctbmF2aWdhdGlvblwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcsIGVzY2FwZVVybCB9IGZyb20gXCIuLi9saWIvc3RyaW5nLXV0aWxzXCI7XG5pbXBvcnQgeyBtYWtlVVVJRCB9IGZyb20gXCIuLi9saWIvdXVpZFwiO1xuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVdlYk5hdmlnYXRpb25CYXNlRXZlbnREZXRhaWxzVG9PcGVuV1BNU2NoZW1hID0gYXN5bmMgKGNyYXdsSUQsIGRldGFpbHMpID0+IHtcbiAgICBjb25zdCB0YWIgPSBkZXRhaWxzLnRhYklkID4gLTFcbiAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgIDoge1xuICAgICAgICAgICAgd2luZG93SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGluY29nbml0bzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY29va2llU3RvcmVJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb3BlbmVyVGFiSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBoZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICBjb25zdCB3aW5kb3cgPSB0YWIud2luZG93SWRcbiAgICAgICAgPyBhd2FpdCBicm93c2VyLndpbmRvd3MuZ2V0KHRhYi53aW5kb3dJZClcbiAgICAgICAgOiB7IHdpZHRoOiB1bmRlZmluZWQsIGhlaWdodDogdW5kZWZpbmVkLCB0eXBlOiB1bmRlZmluZWQgfTtcbiAgICBjb25zdCBuYXZpZ2F0aW9uID0ge1xuICAgICAgICBjcmF3bF9pZDogY3Jhd2xJRCxcbiAgICAgICAgaW5jb2duaXRvOiBib29sVG9JbnQodGFiLmluY29nbml0byksXG4gICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICBwcm9jZXNzX2lkOiBkZXRhaWxzLnByb2Nlc3NJZCxcbiAgICAgICAgd2luZG93X2lkOiB0YWIud2luZG93SWQsXG4gICAgICAgIHRhYl9pZDogZGV0YWlscy50YWJJZCxcbiAgICAgICAgdGFiX29wZW5lcl90YWJfaWQ6IHRhYi5vcGVuZXJUYWJJZCxcbiAgICAgICAgZnJhbWVfaWQ6IGRldGFpbHMuZnJhbWVJZCxcbiAgICAgICAgd2luZG93X3dpZHRoOiB3aW5kb3cud2lkdGgsXG4gICAgICAgIHdpbmRvd19oZWlnaHQ6IHdpbmRvdy5oZWlnaHQsXG4gICAgICAgIHdpbmRvd190eXBlOiB3aW5kb3cudHlwZSxcbiAgICAgICAgdGFiX3dpZHRoOiB0YWIud2lkdGgsXG4gICAgICAgIHRhYl9oZWlnaHQ6IHRhYi5oZWlnaHQsXG4gICAgICAgIHRhYl9jb29raWVfc3RvcmVfaWQ6IGVzY2FwZVN0cmluZyh0YWIuY29va2llU3RvcmVJZCksXG4gICAgICAgIHV1aWQ6IG1ha2VVVUlEKCksXG4gICAgICAgIHVybDogZXNjYXBlVXJsKGRldGFpbHMudXJsKSxcbiAgICB9O1xuICAgIHJldHVybiBuYXZpZ2F0aW9uO1xufTtcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uSW5zdHJ1bWVudCB7XG4gICAgY29uc3RydWN0b3IoZGF0YVJlY2VpdmVyKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ05hdmlnYXRpb25zID0ge307XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgIH1cbiAgICBzdGF0aWMgbmF2aWdhdGlvbklkKHByb2Nlc3NJZCwgdGFiSWQsIGZyYW1lSWQpIHtcbiAgICAgICAgcmV0dXJuIGAke3Byb2Nlc3NJZH0tJHt0YWJJZH0tJHtmcmFtZUlkfWA7XG4gICAgfVxuICAgIHJ1bihjcmF3bElEKSB7XG4gICAgICAgIHRoaXMub25CZWZvcmVOYXZpZ2F0ZUxpc3RlbmVyID0gYXN5bmMgKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb25JZCA9IE5hdmlnYXRpb25JbnN0cnVtZW50Lm5hdmlnYXRpb25JZChkZXRhaWxzLnByb2Nlc3NJZCwgZGV0YWlscy50YWJJZCwgZGV0YWlscy5mcmFtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdOYXZpZ2F0aW9uID0gdGhpcy5pbnN0YW50aWF0ZVBlbmRpbmdOYXZpZ2F0aW9uKG5hdmlnYXRpb25JZCk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uID0gYXdhaXQgdHJhbnNmb3JtV2ViTmF2aWdhdGlvbkJhc2VFdmVudERldGFpbHNUb09wZW5XUE1TY2hlbWEoY3Jhd2xJRCwgZGV0YWlscyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnBhcmVudF9mcmFtZV9pZCA9IGRldGFpbHMucGFyZW50RnJhbWVJZDtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX2V2ZW50X29yZGluYWwgPSBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfdGltZV9zdGFtcCA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgcGVuZGluZ05hdmlnYXRpb24ucmVzb2x2ZU9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24obmF2aWdhdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkJlZm9yZU5hdmlnYXRlLmFkZExpc3RlbmVyKHRoaXMub25CZWZvcmVOYXZpZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyID0gYXN5bmMgKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb25JZCA9IE5hdmlnYXRpb25JbnN0cnVtZW50Lm5hdmlnYXRpb25JZChkZXRhaWxzLnByb2Nlc3NJZCwgZGV0YWlscy50YWJJZCwgZGV0YWlscy5mcmFtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb24gPSBhd2FpdCB0cmFuc2Zvcm1XZWJOYXZpZ2F0aW9uQmFzZUV2ZW50RGV0YWlsc1RvT3BlbldQTVNjaGVtYShjcmF3bElELCBkZXRhaWxzKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24udHJhbnNpdGlvbl9xdWFsaWZpZXJzID0gZXNjYXBlU3RyaW5nKEpTT04uc3RyaW5naWZ5KGRldGFpbHMudHJhbnNpdGlvblF1YWxpZmllcnMpKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24udHJhbnNpdGlvbl90eXBlID0gZXNjYXBlU3RyaW5nKGRldGFpbHMudHJhbnNpdGlvblR5cGUpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5jb21taXR0ZWRfZXZlbnRfb3JkaW5hbCA9IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmNvbW1pdHRlZF90aW1lX3N0YW1wID0gbmV3IERhdGUoZGV0YWlscy50aW1lU3RhbXApLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyBpbmNsdWRlIGF0dHJpYnV0ZXMgZnJvbSB0aGUgY29ycmVzcG9uZGluZyBvbkJlZm9yZU5hdmlnYXRpb24gZXZlbnRcbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdOYXZpZ2F0aW9uID0gdGhpcy5nZXRQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpO1xuICAgICAgICAgICAgaWYgKHBlbmRpbmdOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ05hdmlnYXRpb24ucmVzb2x2ZU9uQ29tbWl0dGVkRXZlbnROYXZpZ2F0aW9uKG5hdmlnYXRpb24pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgcGVuZGluZ05hdmlnYXRpb24ucmVzb2x2ZWRXaXRoaW5UaW1lb3V0KDEwMDApO1xuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uID0gYXdhaXQgcGVuZGluZ05hdmlnYXRpb24ub25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbi5wYXJlbnRfZnJhbWVfaWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbi5wYXJlbnRfZnJhbWVfaWQ7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX2V2ZW50X29yZGluYWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfZXZlbnRfb3JkaW5hbDtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfdGltZV9zdGFtcCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV90aW1lX3N0YW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJuYXZpZ2F0aW9uc1wiLCBuYXZpZ2F0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJOYXZpZ2F0aW9uLm9uQ29tbWl0dGVkLmFkZExpc3RlbmVyKHRoaXMub25Db21taXR0ZWRMaXN0ZW5lcik7XG4gICAgfVxuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGUucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkJlZm9yZU5hdmlnYXRlTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uQ29tbWl0dGVkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkNvbW1pdHRlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQ29tbWl0dGVkTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluc3RhbnRpYXRlUGVuZGluZ05hdmlnYXRpb24obmF2aWdhdGlvbklkKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ05hdmlnYXRpb25zW25hdmlnYXRpb25JZF0gPSBuZXcgUGVuZGluZ05hdmlnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ05hdmlnYXRpb25zW25hdmlnYXRpb25JZF07XG4gICAgfVxuICAgIGdldFBlbmRpbmdOYXZpZ2F0aW9uKG5hdmlnYXRpb25JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nTmF2aWdhdGlvbnNbbmF2aWdhdGlvbklkXTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2libUYyYVdkaGRHbHZiaTFwYm5OMGNuVnRaVzUwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJKaFkydG5jbTkxYm1RdmJtRjJhV2RoZEdsdmJpMXBibk4wY25WdFpXNTBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxFOUJRVThzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSU3hOUVVGTkxIZERRVUYzUXl4RFFVRkRPMEZCUTJwR0xFOUJRVThzUlVGQlJTeHZRa0ZCYjBJc1JVRkJSU3hOUVVGTkxDdENRVUVyUWl4RFFVRkRPMEZCUTNKRkxFOUJRVThzUlVGQlJTeHBRa0ZCYVVJc1JVRkJSU3hOUVVGTkxESkNRVUV5UWl4RFFVRkRPMEZCUXpsRUxFOUJRVThzUlVGQlJTeFRRVUZUTEVWQlFVVXNXVUZCV1N4RlFVRkZMRk5CUVZNc1JVRkJSU3hOUVVGTkxIRkNRVUZ4UWl4RFFVRkRPMEZCUTNwRkxFOUJRVThzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4aFFVRmhMRU5CUVVNN1FVRlJka01zVFVGQlRTeERRVUZETEUxQlFVMHNjVVJCUVhGRUxFZEJRVWNzUzBGQlN5eEZRVU40UlN4UFFVRlBMRVZCUTFBc1QwRkJjME1zUlVGRGFrSXNSVUZCUlR0SlFVTjJRaXhOUVVGTkxFZEJRVWNzUjBGRFVDeFBRVUZQTEVOQlFVTXNTMEZCU3l4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVOb1FpeERRVUZETEVOQlFVTXNUVUZCVFN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUTNaRExFTkJRVU1zUTBGQlF6dFpRVU5GTEZGQlFWRXNSVUZCUlN4VFFVRlRPMWxCUTI1Q0xGTkJRVk1zUlVGQlJTeFRRVUZUTzFsQlEzQkNMR0ZCUVdFc1JVRkJSU3hUUVVGVE8xbEJRM2hDTEZkQlFWY3NSVUZCUlN4VFFVRlRPMWxCUTNSQ0xFdEJRVXNzUlVGQlJTeFRRVUZUTzFsQlEyaENMRTFCUVUwc1JVRkJSU3hUUVVGVE8xTkJRMnhDTEVOQlFVTTdTVUZEVWl4TlFVRk5MRTFCUVUwc1IwRkJSeXhIUVVGSExFTkJRVU1zVVVGQlVUdFJRVU42UWl4RFFVRkRMRU5CUVVNc1RVRkJUU3hQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJRM3BETEVOQlFVTXNRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hUUVVGVExFVkJRVVVzVFVGQlRTeEZRVUZGTEZOQlFWTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRkxFTkJRVU03U1VGRE4wUXNUVUZCVFN4VlFVRlZMRWRCUVdVN1VVRkROMElzVVVGQlVTeEZRVUZGTEU5QlFVODdVVUZEYWtJc1UwRkJVeXhGUVVGRkxGTkJRVk1zUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRPMUZCUTI1RExITkNRVUZ6UWl4RlFVRkZMRzlDUVVGdlFqdFJRVU0xUXl4VlFVRlZMRVZCUVVVc1QwRkJUeXhEUVVGRExGTkJRVk03VVVGRE4wSXNVMEZCVXl4RlFVRkZMRWRCUVVjc1EwRkJReXhSUVVGUk8xRkJRM1pDTEUxQlFVMHNSVUZCUlN4UFFVRlBMRU5CUVVNc1MwRkJTenRSUVVOeVFpeHBRa0ZCYVVJc1JVRkJSU3hIUVVGSExFTkJRVU1zVjBGQlZ6dFJRVU5zUXl4UlFVRlJMRVZCUVVVc1QwRkJUeXhEUVVGRExFOUJRVTg3VVVGRGVrSXNXVUZCV1N4RlFVRkZMRTFCUVUwc1EwRkJReXhMUVVGTE8xRkJRekZDTEdGQlFXRXNSVUZCUlN4TlFVRk5MRU5CUVVNc1RVRkJUVHRSUVVNMVFpeFhRVUZYTEVWQlFVVXNUVUZCVFN4RFFVRkRMRWxCUVVrN1VVRkRlRUlzVTBGQlV5eEZRVUZGTEVkQlFVY3NRMEZCUXl4TFFVRkxPMUZCUTNCQ0xGVkJRVlVzUlVGQlJTeEhRVUZITEVOQlFVTXNUVUZCVFR0UlFVTjBRaXh0UWtGQmJVSXNSVUZCUlN4WlFVRlpMRU5CUVVNc1IwRkJSeXhEUVVGRExHRkJRV0VzUTBGQlF6dFJRVU53UkN4SlFVRkpMRVZCUVVVc1VVRkJVU3hGUVVGRk8xRkJRMmhDTEVkQlFVY3NSVUZCUlN4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF6dExRVU0xUWl4RFFVRkRPMGxCUTBZc1QwRkJUeXhWUVVGVkxFTkJRVU03UVVGRGNFSXNRMEZCUXl4RFFVRkRPMEZCUlVZc1RVRkJUU3hQUVVGUExHOUNRVUZ2UWp0SlFWY3ZRaXhaUVVGWkxGbEJRVms3VVVGS2FFSXNkVUpCUVd0Q0xFZEJSWFJDTEVWQlFVVXNRMEZCUXp0UlFVZE1MRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzV1VGQldTeERRVUZETzBsQlEyNURMRU5CUVVNN1NVRmFUU3hOUVVGTkxFTkJRVU1zV1VGQldTeERRVUZETEZOQlFWTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1QwRkJUenRSUVVOc1JDeFBRVUZQTEVkQlFVY3NVMEZCVXl4SlFVRkpMRXRCUVVzc1NVRkJTU3hQUVVGUExFVkJRVVVzUTBGQlF6dEpRVU0xUXl4RFFVRkRPMGxCV1Uwc1IwRkJSeXhEUVVGRExFOUJRVTg3VVVGRGFFSXNTVUZCU1N4RFFVRkRMSGRDUVVGM1FpeEhRVUZITEV0QlFVc3NSVUZEYmtNc1QwRkJhMFFzUlVGRGJFUXNSVUZCUlR0WlFVTkdMRTFCUVUwc1dVRkJXU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRMRmxCUVZrc1EwRkRjRVFzVDBGQlR5eERRVUZETEZOQlFWTXNSVUZEYWtJc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGRFlpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVTm9RaXhEUVVGRE8xbEJRMFlzVFVGQlRTeHBRa0ZCYVVJc1IwRkJSeXhKUVVGSkxFTkJRVU1zTkVKQlFUUkNMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03V1VGRE1VVXNUVUZCVFN4VlFVRlZMRWRCUVdVc1RVRkJUU3h4UkVGQmNVUXNRMEZEZUVZc1QwRkJUeXhGUVVOUUxFOUJRVThzUTBGRFVpeERRVUZETzFsQlEwWXNWVUZCVlN4RFFVRkRMR1ZCUVdVc1IwRkJSeXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETzFsQlEyNUVMRlZCUVZVc1EwRkJReXcyUWtGQk5rSXNSMEZCUnl4MVFrRkJkVUlzUlVGQlJTeERRVUZETzFsQlEzSkZMRlZCUVZVc1EwRkJReXd3UWtGQk1FSXNSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkRPVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZEYkVJc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dFpRVU5vUWl4cFFrRkJhVUlzUTBGQlF5eHpRMEZCYzBNc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dFJRVU4yUlN4RFFVRkRMRU5CUVVNN1VVRkRSaXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExGZEJRVmNzUTBGRGFFUXNTVUZCU1N4RFFVRkRMSGRDUVVGM1FpeERRVU01UWl4RFFVRkRPMUZCUTBZc1NVRkJTU3hEUVVGRExHMUNRVUZ0UWl4SFFVRkhMRXRCUVVzc1JVRkRPVUlzVDBGQk5rTXNSVUZETjBNc1JVRkJSVHRaUVVOR0xFMUJRVTBzV1VGQldTeEhRVUZITEc5Q1FVRnZRaXhEUVVGRExGbEJRVmtzUTBGRGNFUXNUMEZCVHl4RFFVRkRMRk5CUVZNc1JVRkRha0lzVDBGQlR5eERRVUZETEV0QlFVc3NSVUZEWWl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVOb1FpeERRVUZETzFsQlEwWXNUVUZCVFN4VlFVRlZMRWRCUVdVc1RVRkJUU3h4UkVGQmNVUXNRMEZEZUVZc1QwRkJUeXhGUVVOUUxFOUJRVThzUTBGRFVpeERRVUZETzFsQlEwWXNWVUZCVlN4RFFVRkRMSEZDUVVGeFFpeEhRVUZITEZsQlFWa3NRMEZETjBNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNiMEpCUVc5Q0xFTkJRVU1zUTBGRE4wTXNRMEZCUXp0WlFVTkdMRlZCUVZVc1EwRkJReXhsUVVGbExFZEJRVWNzV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRaUVVOc1JTeFZRVUZWTEVOQlFVTXNkVUpCUVhWQ0xFZEJRVWNzZFVKQlFYVkNMRVZCUVVVc1EwRkJRenRaUVVNdlJDeFZRVUZWTEVOQlFVTXNiMEpCUVc5Q0xFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlEzaERMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRMnhDTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1dVRkZhRUlzY1VWQlFYRkZPMWxCUTNKRkxFMUJRVTBzYVVKQlFXbENMRWRCUVVjc1NVRkJTU3hEUVVGRExHOUNRVUZ2UWl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xbEJRMnhGTEVsQlFVa3NhVUpCUVdsQ0xFVkJRVVU3WjBKQlEzSkNMR2xDUVVGcFFpeERRVUZETEdsRFFVRnBReXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzJkQ1FVTm9SU3hOUVVGTkxGRkJRVkVzUjBGQlJ5eE5RVUZOTEdsQ1FVRnBRaXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU55UlN4SlFVRkpMRkZCUVZFc1JVRkJSVHR2UWtGRFdpeE5RVUZOTEN0Q1FVRXJRaXhIUVVGSExFMUJRVTBzYVVKQlFXbENMRU5CUVVNc0swSkJRU3RDTEVOQlFVTTdiMEpCUTJoSExGVkJRVlVzUTBGQlF5eGxRVUZsTzNkQ1FVTjRRaXdyUWtGQkswSXNRMEZCUXl4bFFVRmxMRU5CUVVNN2IwSkJRMnhFTEZWQlFWVXNRMEZCUXl3MlFrRkJOa0k3ZDBKQlEzUkRMQ3RDUVVFclFpeERRVUZETERaQ1FVRTJRaXhEUVVGRE8yOUNRVU5vUlN4VlFVRlZMRU5CUVVNc01FSkJRVEJDTzNkQ1FVTnVReXdyUWtGQkswSXNRMEZCUXl3d1FrRkJNRUlzUTBGQlF6dHBRa0ZET1VRN1lVRkRSanRaUVVWRUxFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMR0ZCUVdFc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dFJRVU14UkN4RFFVRkRMRU5CUVVNN1VVRkRSaXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEZkQlFWY3NRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExHMUNRVUZ0UWl4RFFVRkRMRU5CUVVNN1NVRkRNVVVzUTBGQlF6dEpRVVZOTEU5QlFVODdVVUZEV2l4SlFVRkpMRWxCUVVrc1EwRkJReXgzUWtGQmQwSXNSVUZCUlR0WlFVTnFReXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExHTkJRV01zUTBGRGJrUXNTVUZCU1N4RFFVRkRMSGRDUVVGM1FpeERRVU01UWl4RFFVRkRPMU5CUTBnN1VVRkRSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRaUVVNMVFpeFBRVUZQTEVOQlFVTXNZVUZCWVN4RFFVRkRMRmRCUVZjc1EwRkJReXhqUVVGakxFTkJRemxETEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUTBGRGVrSXNRMEZCUXp0VFFVTklPMGxCUTBnc1EwRkJRenRKUVVWUExEUkNRVUUwUWl4RFFVTnNReXhaUVVGdlFqdFJRVVZ3UWl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hwUWtGQmFVSXNSVUZCUlN4RFFVRkRPMUZCUTJoRkxFOUJRVThzU1VGQlNTeERRVUZETEd0Q1FVRnJRaXhEUVVGRExGbEJRVmtzUTBGQlF5eERRVUZETzBsQlF5OURMRU5CUVVNN1NVRkZUeXh2UWtGQmIwSXNRMEZCUXl4WlFVRnZRanRSUVVNdlF5eFBRVUZQTEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXp0SlFVTXZReXhEUVVGRE8wTkJRMFlpZlE9PSIsImltcG9ydCB7IGluc3RydW1lbnRGaW5nZXJwcmludGluZ0FwaXMgfSBmcm9tIFwiLi4vbGliL2luc3RydW1lbnQtZmluZ2VycHJpbnRpbmctYXBpc1wiO1xuaW1wb3J0IHsganNJbnN0cnVtZW50cyB9IGZyb20gXCIuLi9saWIvanMtaW5zdHJ1bWVudHNcIjtcbmltcG9ydCB7IHBhZ2VTY3JpcHQgfSBmcm9tIFwiLi9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZVwiO1xuZnVuY3Rpb24gZ2V0UGFnZVNjcmlwdEFzU3RyaW5nKCkge1xuICAgIHJldHVybiAoanNJbnN0cnVtZW50cyArXG4gICAgICAgIFwiXFxuXCIgK1xuICAgICAgICBpbnN0cnVtZW50RmluZ2VycHJpbnRpbmdBcGlzICtcbiAgICAgICAgXCJcXG5cIiArXG4gICAgICAgIFwiKFwiICtcbiAgICAgICAgcGFnZVNjcmlwdCArXG4gICAgICAgIFwiKHtqc0luc3RydW1lbnRzLCBpbnN0cnVtZW50RmluZ2VycHJpbnRpbmdBcGlzfSkpO1wiKTtcbn1cbmZ1bmN0aW9uIGluc2VydFNjcmlwdCh0ZXh0LCBkYXRhKSB7XG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHNjcmlwdC50ZXh0ID0gdGV4dDtcbiAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoXCJfXCIsIFwiLVwiKSwgZGF0YVtrZXldKTtcbiAgICB9XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShzY3JpcHQsIHBhcmVudC5maXJzdENoaWxkKTtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbn1cbmZ1bmN0aW9uIGVtaXRNc2codHlwZSwgbXNnKSB7XG4gICAgbXNnLnRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBuYW1lc3BhY2U6IFwiamF2YXNjcmlwdC1pbnN0cnVtZW50YXRpb25cIixcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZGF0YTogbXNnLFxuICAgIH0pO1xufVxuY29uc3QgZXZlbnRfaWQgPSBNYXRoLnJhbmRvbSgpO1xuLy8gbGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHRoZSBzY3JpcHQgd2UgYXJlIGFib3V0IHRvIGluc2VydFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudF9pZC50b1N0cmluZygpLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vIHBhc3MgdGhlc2Ugb24gdG8gdGhlIGJhY2tncm91bmQgcGFnZVxuICAgIGNvbnN0IG1zZ3MgPSBlLmRldGFpbDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtc2dzKSkge1xuICAgICAgICBtc2dzLmZvckVhY2goZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgZW1pdE1zZyhtc2cudHlwZSwgbXNnLmNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVtaXRNc2cobXNncy50eXBlLCBtc2dzLmNvbnRlbnQpO1xuICAgIH1cbn0pO1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEphdmFzY3JpcHRJbnN0cnVtZW50UGFnZVNjcmlwdCh0ZXN0aW5nID0gZmFsc2UpIHtcbiAgICBpbnNlcnRTY3JpcHQoZ2V0UGFnZVNjcmlwdEFzU3RyaW5nKCksIHtcbiAgICAgICAgZXZlbnRfaWQsXG4gICAgICAgIHRlc3RpbmcsXG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhbUYyWVhOamNtbHdkQzFwYm5OMGNuVnRaVzUwTFdOdmJuUmxiblF0YzJOdmNHVXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZZMjl1ZEdWdWRDOXFZWFpoYzJOeWFYQjBMV2x1YzNSeWRXMWxiblF0WTI5dWRHVnVkQzF6WTI5d1pTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc05FSkJRVFJDTEVWQlFVVXNUVUZCVFN4MVEwRkJkVU1zUTBGQlF6dEJRVU55Uml4UFFVRlBMRVZCUVVVc1lVRkJZU3hGUVVGRkxFMUJRVTBzZFVKQlFYVkNMRU5CUVVNN1FVRkRkRVFzVDBGQlR5eEZRVUZGTEZWQlFWVXNSVUZCUlN4TlFVRk5MRzlEUVVGdlF5eERRVUZETzBGQlJXaEZMRk5CUVZNc2NVSkJRWEZDTzBsQlF6VkNMRTlCUVU4c1EwRkRUQ3hoUVVGaE8xRkJRMklzU1VGQlNUdFJRVU5LTERSQ1FVRTBRanRSUVVNMVFpeEpRVUZKTzFGQlEwb3NSMEZCUnp0UlFVTklMRlZCUVZVN1VVRkRWaXh0UkVGQmJVUXNRMEZEY0VRc1EwRkJRenRCUVVOS0xFTkJRVU03UVVGRlJDeFRRVUZUTEZsQlFWa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTVHRKUVVNNVFpeE5RVUZOTEUxQlFVMHNSMEZCUnl4UlFVRlJMRU5CUVVNc1pVRkJaU3hGUVVOeVF5eE5RVUZOTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEpRVU0xUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU51UWl4TlFVRk5MRU5CUVVNc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVVZ5UWl4TFFVRkxMRTFCUVUwc1IwRkJSeXhKUVVGSkxFbEJRVWtzUlVGQlJUdFJRVU4wUWl4TlFVRk5MRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUjBGQlJ5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRMUVVOcVJUdEpRVVZFTEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0SlFVTXZReXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMEZCUXpkQ0xFTkJRVU03UVVGRlJDeFRRVUZUTEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1IwRkJSenRKUVVONFFpeEhRVUZITEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1NVRkJTU3hGUVVGRkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdTVUZEZWtNc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTTdVVUZETVVJc1UwRkJVeXhGUVVGRkxEUkNRVUUwUWp0UlFVTjJReXhKUVVGSk8xRkJRMG9zU1VGQlNTeEZRVUZGTEVkQlFVYzdTMEZEVml4RFFVRkRMRU5CUVVNN1FVRkRUQ3hEUVVGRE8wRkJSVVFzVFVGQlRTeFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRE8wRkJSUzlDTERaRVFVRTJSRHRCUVVNM1JDeFJRVUZSTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVVVGQlVTeERRVUZETEZGQlFWRXNSVUZCUlN4RlFVRkZMRlZCUVZNc1EwRkJZenRKUVVOd1JTeDFRMEZCZFVNN1NVRkRka01zVFVGQlRTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJRenRKUVVOMFFpeEpRVUZKTEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3VVVGRGRrSXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGVExFZEJRVWM3V1VGRGRrSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFVkJRVVVzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUTJwRExFTkJRVU1zUTBGQlF5eERRVUZETzB0QlEwbzdVMEZCVFR0UlFVTk1MRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRMUVVOc1F6dEJRVU5JTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUlVnc1RVRkJUU3hWUVVGVkxHOURRVUZ2UXl4RFFVRkRMRTlCUVU4c1IwRkJSeXhMUVVGTE8wbEJRMnhGTEZsQlFWa3NRMEZCUXl4eFFrRkJjVUlzUlVGQlJTeEZRVUZGTzFGQlEzQkRMRkZCUVZFN1VVRkRVaXhQUVVGUE8wdEJRMUlzUTBGQlF5eERRVUZETzBGQlEwd3NRMEZCUXlKOSIsIi8vIENvZGUgYmVsb3cgaXMgbm90IGEgY29udGVudCBzY3JpcHQ6IG5vIEZpcmVmb3ggQVBJcyBzaG91bGQgYmUgdXNlZFxuLy8gQWxzbywgbm8gd2VicGFjay9lczYgaW1wb3J0cyBtYXkgYmUgdXNlZCBpbiB0aGlzIGZpbGUgc2luY2UgdGhlIHNjcmlwdFxuLy8gaXMgZXhwb3J0ZWQgYXMgYSBwYWdlIHNjcmlwdCBhcyBhIHN0cmluZ1xuZXhwb3J0IGNvbnN0IHBhZ2VTY3JpcHQgPSBmdW5jdGlvbiAoeyBqc0luc3RydW1lbnRzLCB9KSB7XG4gICAgLy8gbWVzc2FnZXMgdGhlIGluamVjdGVkIHNjcmlwdFxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlc1RvTG9nZ2VyKCRldmVudF9pZCwgbWVzc2FnZXMpIHtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJGV2ZW50X2lkLCB7XG4gICAgICAgICAgICBkZXRhaWw6IG1lc3NhZ2VzLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IGV2ZW50X2lkID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV2ZW50LWlkXCIpO1xuICAgIGNvbnN0IHsgaW5zdHJ1bWVudE9iamVjdCwgXG4gICAgLy8gaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5LFxuICAgIGxvZ0NhbGwsIH0gPSBqc0luc3RydW1lbnRzKGV2ZW50X2lkLCBzZW5kTWVzc2FnZXNUb0xvZ2dlcik7XG4gICAgY29uc3QgdGVzdGluZyA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0aW5nXCIpID09PSBcInRydWVcIjtcbiAgICBpZiAodGVzdGluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEN1cnJlbnRseSB0ZXN0aW5nXCIpO1xuICAgICAgICB3aW5kb3cuaW5zdHJ1bWVudE9iamVjdCA9IGluc3RydW1lbnRPYmplY3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZWJpZC5qc1xuICAgICAqL1xuICAgIGNvbnN0IHdhaXRVbnRpbCA9IGV2YWx1YXRvciA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTm90ZTogU2luY2UgYmVzdCBwcmFjdGljZSBmb3Igc2NyaXB0cyBjb25zdW1pbmcgUHJlYmlkLmpzIGlzXG4gICAgICAgICAgICAgKiB0byBzZXQgdXAgYW4gd2luZG93LnBianMgb2JqZWN0IGFuZCB3aW5kb3cucGJqcy5xdWUgYXJyYXkgZXZlblxuICAgICAgICAgICAgICogYmVmb3JlIHBianMgbG9hZHMsIHdlIGNhbid0IHNpbXBseSB3YWl0IGZvciB3aW5kb3cucGJqcyxcbiAgICAgICAgICAgICAqIGJ1dCBpbnN0ZWFkIHdhaXQgZm9yIHdpbmRvdy5wYmpzLm9uRXZlbnQsIHdoaWNoIG9ubHkgZ2V0cyBzZXRcbiAgICAgICAgICAgICAqIG9uY2UgUHJlYmlkLmpzIGhhcyBsb2FkZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgICAgICAgICAgICAgIGlmIChldmFsdWF0b3IoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBjaGVja2luZyBmb3IgMTAgc2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIG5vdyA8IDEwMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0b3BwZWQgY2hlY2tpbmcgZm9yIFByZWJpZC5qcyBsb2FkaW5nIGluIGEgZnJhbWUgKDEwcyBoYXZlIHBhc3NlZClcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbnMgdG8gd2FpdCBmb3IgUHJlYmlkLmpzIHRvIGJlIGF2YWlsYWJsZVxuICAgICAqXG4gICAgICogTm90ZTogU2luY2UgYmVzdCBwcmFjdGljZSBmb3Igc2NyaXB0cyBjb25zdW1pbmcgUHJlYmlkLmpzIGlzXG4gICAgICogdG8gc2V0IHVwIGFuIHdpbmRvdy5wYmpzIG9iamVjdCBhbmQgd2luZG93LnBianMucXVlIGFycmF5IGV2ZW5cbiAgICAgKiBiZWZvcmUgcGJqcyBsb2Fkcywgd2UgY2FuJ3Qgc2ltcGx5IHdhaXQgZm9yIHdpbmRvdy5wYmpzLFxuICAgICAqIGJ1dCBpbnN0ZWFkIHdhaXQgZm9yIHdpbmRvdy5wYmpzLm9uRXZlbnQsIHdoaWNoIG9ubHkgZ2V0cyBzZXRcbiAgICAgKiBvbmNlIFByZWJpZC5qcyBoYXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGNvbnN0IHByZWJpZEpzUGxhY2Vob2xkZXJBdmFpbGFibGUgPSB3YWl0VW50aWwoKCkgPT4gdHlwZW9mIHdpbmRvdy5wYmpzICE9PSBcInVuZGVmaW5lZFwiKTtcbiAgICBjb25zdCBwcmViaWRKc0F2YWlsYWJsZSA9IHdhaXRVbnRpbCgoKSA9PiB0eXBlb2Ygd2luZG93LnBianMgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdy5wYmpzLm9uRXZlbnQgIT09IFwidW5kZWZpbmVkXCIpO1xuICAgIGxldCBjdXJyZW50bHlJbnN0cnVtZW50ZWRQYmpzVmVyc2lvbjtcbiAgICBwcmViaWRKc1BsYWNlaG9sZGVyQXZhaWxhYmxlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWJpZC5qcyBwbGFjZWhvbGRlciBhdmFpbGFibGUgLSBpbnN0cnVtZW50aW5nLi4uXCIpO1xuICAgICAgICBjdXJyZW50bHlJbnN0cnVtZW50ZWRQYmpzVmVyc2lvbiA9XG4gICAgICAgICAgICB3aW5kb3cucGJqcy52ZXJzaW9uICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IFN0cmluZyh3aW5kb3cucGJqcy52ZXJzaW9uKVxuICAgICAgICAgICAgICAgIDogXCJwbGFjZWhvbGRlclwiO1xuICAgICAgICAvLyBJbnN0cnVtZW50IGFjY2VzcyB0byBvYmplY3QgcHJvcGVydGllcyBhbmQgZnVuY3Rpb25zXG4gICAgICAgIGNvbnN0IG9iamVjdE5hbWUgPSBcInBianM8XCIgKyBjdXJyZW50bHlJbnN0cnVtZW50ZWRQYmpzVmVyc2lvbiArIFwiPlwiO1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5wYmpzLCBvYmplY3ROYW1lLCB7fSk7XG4gICAgfSk7XG4gICAgcHJlYmlkSnNBdmFpbGFibGUudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjdXJyZW50bHlJbnN0cnVtZW50ZWRQYmpzVmVyc2lvbiA9PT0gd2luZG93LnBianMudmVyc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJlYmlkLmpzIGxvYWRlZCBhbmQgZGlmZmVyZW50IGZyb20gd2hhdCB3ZSBwcmV2aW91c2x5IGluc3RydW1lbnRpbmcgLSBpbnN0cnVtZW50aW5nIGFuZXcuLi5cIik7XG4gICAgICAgIGN1cnJlbnRseUluc3RydW1lbnRlZFBianNWZXJzaW9uID0gd2luZG93LnBianMudmVyc2lvbjtcbiAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IFwicGJqczxcIiArIGN1cnJlbnRseUluc3RydW1lbnRlZFBianNWZXJzaW9uICsgXCI+XCI7XG4gICAgICAgIC8vIEluc3RydW1lbnQgZXZlbnRzIChIYWNrLCBzaW5jZSBPcGVuV1BNIGRvZXMgbm90IHN1cHBvcnQgaW5zdHJ1bWVudGF0aW9uIG9mIGV2ZW50cyBjdXJyZW50bHkpXG4gICAgICAgIGNvbnN0IGluc3RydW1lbnRQcmViaWRKc0V2ZW50ID0gZXZlbnRSZWZlcmVuY2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlByZWJpZC5qcyBldmVudFwiLCB7IGV2ZW50UmVmZXJlbmNlLCBldmVudCB9LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgTW9zdCBkb24ndCwgYnV0IHNvbWUgZXZlbnRzIGNvbnRhaW5zIHNvbWUgaW5mb3JtYXRpb24gYWJvdXQgaXQncyBjYWxsIGNvbnRleHQ6XG4gICAgICAgICAgICAgICAgY2Fub25pY2FsVXJsOiB1bmRlZmluZWTigIvigIvigItcbiAgICAgICAgICAgICAgICBudW1JZnJhbWVzOiDigIvigIvigIswXG4gICAgICAgICAgICAgICAgcmVhY2hlZFRvcDogdHJ1ZVxuICAgICAgICAgICAgICAgIHJlZmVyZXI6IFwiaHR0cDovL2xvY2FsdGVzdC5tZTo4MDAwL3Rlc3RfcGFnZXMvcHJlYmlkanMuaHRtbFwi4oCL4oCLXG4gICAgICAgICAgICAgICAgc3RhY2s6ICgxKSBb4oCmXeKAi+KAi+KAi+KAi1xuICAgICAgICAgICAgICAgIDA6IFwiaHR0cDovL2xvY2FsdGVzdC5tZTo4MDAwL3Rlc3RfcGFnZXMvcHJlYmlkanMuaHRtbFwiXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAxXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcmVySW5mbyA9IGV2ZW50LnJlZmVyZXJJbmZvICYmIGV2ZW50LnJlZmVyZXJJbmZvLnJlZmVyZXJcbiAgICAgICAgICAgICAgICAgICAgPyBldmVudC5yZWZlcmVySW5mby5yZWZlcmVyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5vbmljYWxVcmwgPSBldmVudC5jYW5vbmljYWxVcmxcbiAgICAgICAgICAgICAgICAgICAgPyBldmVudC5yZWZlcmVySW5mby5jYW5vbmljYWxVcmxcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHRVcmw6IHJlZmVyZXJJbmZvICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHJlZmVyZXJJbmZvXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGNhbm9uaWNhbFVybCAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY2Fub25pY2FsVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMaW5lOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRDb2w6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjYWxsU3RhY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsb2dDYWxsKFwiZXZlbnQ6XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0TmFtZSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjpcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFJlZmVyZW5jZSwgW2V2ZW50XSwgY2FsbENvbnRleHQsIHt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9jY3VycmVkIHdoZW4gaGFuZGxpbmcgZXZlbnQ6IFwiLCBlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LnBianMub25FdmVudChldmVudFJlZmVyZW5jZSwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICAgIFtcbiAgICAgICAgICAgIFwiYXVjdGlvbkluaXRcIixcbiAgICAgICAgICAgIFwiYXVjdGlvbkVuZFwiLFxuICAgICAgICAgICAgXCJiaWRBZGp1c3RtZW50XCIsXG4gICAgICAgICAgICBcImJpZFRpbWVvdXRcIixcbiAgICAgICAgICAgIFwiYmlkUmVxdWVzdGVkXCIsXG4gICAgICAgICAgICBcImJpZFJlc3BvbnNlXCIsXG4gICAgICAgICAgICBcImJpZFdvblwiLFxuICAgICAgICAgICAgXCJzZXRUYXJnZXRpbmdcIixcbiAgICAgICAgICAgIFwicmVxdWVzdEJpZHNcIixcbiAgICAgICAgICAgIFwiYWRkQWRVbml0c1wiLFxuICAgICAgICAgICAgXCJhZFJlbmRlckZhaWxlZFwiLFxuICAgICAgICAgICAgXCJiaWRkZXJEb25lXCIsXG4gICAgICAgIF0ubWFwKGluc3RydW1lbnRQcmViaWRKc0V2ZW50KTtcbiAgICAgICAgLy8gSW5zdHJ1bWVudCBhY2Nlc3MgdG8gb2JqZWN0IHByb3BlcnRpZXMgYW5kIGZ1bmN0aW9uc1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5wYmpzLCBvYmplY3ROYW1lLCB7fSk7XG4gICAgfSk7XG4gICAgLypcbiAgICAgKiBTdGFydCBJbnN0cnVtZW50YXRpb25cbiAgICAgKi9cbiAgICAvLyBUT0RPOiB1c2VyIHNob3VsZCBiZSBhYmxlIHRvIGNob29zZSB3aGF0IHRvIGluc3RydW1lbnRcbiAgICAvLyBpbnN0cnVtZW50RmluZ2VycHJpbnRpbmdBcGlzKHsgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5LCBpbnN0cnVtZW50T2JqZWN0IH0pO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogQ29udGVudC1zaWRlIGphdmFzY3JpcHQgaW5zdHJ1bWVudGF0aW9uIHN0YXJ0ZWRcIiwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExYQmhaMlV0YzJOdmNHVXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZZMjl1ZEdWdWRDOXFZWFpoYzJOeWFYQjBMV2x1YzNSeWRXMWxiblF0Y0dGblpTMXpZMjl3WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3h4UlVGQmNVVTdRVUZEY2tVc2VVVkJRWGxGTzBGQlEzcEZMREpEUVVFeVF6dEJRVVV6UXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hWUVVGVkxFZEJRVWNzVlVGQlV5eEZRVU5xUXl4aFFVRmhMRWRCUldRN1NVRkRReXdyUWtGQkswSTdTVUZETDBJc1UwRkJVeXh2UWtGQmIwSXNRMEZCUXl4VFFVRlRMRVZCUVVVc1VVRkJVVHRSUVVNdlF5eFJRVUZSTEVOQlFVTXNZVUZCWVN4RFFVTndRaXhKUVVGSkxGZEJRVmNzUTBGQlF5eFRRVUZUTEVWQlFVVTdXVUZEZWtJc1RVRkJUU3hGUVVGRkxGRkJRVkU3VTBGRGFrSXNRMEZCUXl4RFFVTklMRU5CUVVNN1NVRkRTaXhEUVVGRE8wbEJSVVFzVFVGQlRTeFJRVUZSTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJReXhaUVVGWkxFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdTVUZGZEVVc1RVRkJUU3hGUVVOS0xHZENRVUZuUWp0SlFVTm9RaXcwUWtGQk5FSTdTVUZETlVJc1QwRkJUeXhIUVVOU0xFZEJRVWNzWVVGQllTeERRVUZETEZGQlFWRXNSVUZCUlN4dlFrRkJiMElzUTBGQlF5eERRVUZETzBsQlJXeEVMRTFCUVUwc1QwRkJUeXhIUVVOWUxGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNXVUZCV1N4RFFVRkRMR05CUVdNc1EwRkJReXhMUVVGTExFMUJRVTBzUTBGQlF6dEpRVU5xUlN4SlFVRkpMRTlCUVU4c1JVRkJSVHRSUVVOWUxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNORUpCUVRSQ0xFTkJRVU1zUTBGQlF6dFJRVU42UXl4TlFVRmpMRU5CUVVNc1owSkJRV2RDTEVkQlFVY3NaMEpCUVdkQ0xFTkJRVU03UzBGRGNrUTdTVUZGUkRzN1QwRkZSenRKUVVOSUxFMUJRVTBzVTBGQlV5eEhRVUZITEZOQlFWTXNRMEZCUXl4RlFVRkZPMUZCUXpWQ0xFOUJRVThzU1VGQlNTeFBRVUZQTEVOQlFVTXNWVUZCVXl4UFFVRlBPMWxCUTJwRExFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRaUVVOMlFqczdPenM3TzJWQlRVYzdXVUZEU0N4VFFVRlRMRXRCUVVzN1owSkJRMW9zU1VGQlNTeFRRVUZUTEVWQlFVVXNSVUZCUlR0dlFrRkRaaXhQUVVGUExFOUJRVThzUlVGQlJTeERRVUZETzJsQ1FVTnNRanR4UWtGQlRUdHZRa0ZEVEN3clFrRkJLMEk3YjBKQlF5OUNMRWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVkQlFVY3NSMEZCUnl4TFFVRkxMRVZCUVVVN2QwSkJRelZDTEZWQlFWVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03Y1VKQlEzWkNPM2xDUVVGTk8zZENRVU5NTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUTFRc2NVVkJRWEZGTEVOQlEzUkZMRU5CUVVNN2NVSkJRMGc3YVVKQlEwWTdXVUZEU0N4RFFVRkRPMWxCUTBRc1MwRkJTeXhGUVVGRkxFTkJRVU03VVVGRFZpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTk1MRU5CUVVNc1EwRkJRenRKUVVWR096czdPenM3T3p0UFFWRkhPMGxCUTBnc1RVRkJUU3cwUWtGQk5FSXNSMEZCUnl4VFFVRlRMRU5CUXpWRExFZEJRVWNzUlVGQlJTeERRVUZETEU5QlFWRXNUVUZCWXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhYUVVGWExFTkJRMnhFTEVOQlFVTTdTVUZEUml4TlFVRk5MR2xDUVVGcFFpeEhRVUZITEZOQlFWTXNRMEZEYWtNc1IwRkJSeXhGUVVGRkxFTkJRMGdzVDBGQlVTeE5RVUZqTEVOQlFVTXNTVUZCU1N4TFFVRkxMRmRCUVZjN1VVRkRNME1zVDBGQlVTeE5RVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1MwRkJTeXhYUVVGWExFTkJRM1JFTEVOQlFVTTdTVUZGUml4SlFVRkpMR2REUVVGblF5eERRVUZETzBsQlEzSkRMRFJDUVVFMFFpeERRVUZETEVsQlFVa3NRMEZCUXp0UlFVTm9ReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEc5RVFVRnZSQ3hEUVVGRExFTkJRVU03VVVGRGJFVXNaME5CUVdkRE8xbEJRemRDTEUxQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhMUVVGTExGTkJRVk03WjBKQlEzaERMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVVVzVFVGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1owSkJRM1JETEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNN1VVRkRjRUlzZFVSQlFYVkVPMUZCUTNaRUxFMUJRVTBzVlVGQlZTeEhRVUZITEU5QlFVOHNSMEZCUnl4blEwRkJaME1zUjBGQlJ5eEhRVUZITEVOQlFVTTdVVUZEY0VVc1owSkJRV2RDTEVOQlFVVXNUVUZCWXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hWUVVGVkxFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdTVUZEZWtRc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeHBRa0ZCYVVJc1EwRkJReXhKUVVGSkxFTkJRVU03VVVGRGNrSXNTVUZCU1N4blEwRkJaME1zUzBGQlRTeE5RVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSVHRaUVVOeVJTeFBRVUZQTzFOQlExSTdVVUZEUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVOVUxEaEdRVUU0Uml4RFFVTXZSaXhEUVVGRE8xRkJRMFlzWjBOQlFXZERMRWRCUVVrc1RVRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdVVUZEYUVVc1RVRkJUU3hWUVVGVkxFZEJRVWNzVDBGQlR5eEhRVUZITEdkRFFVRm5ReXhIUVVGSExFZEJRVWNzUTBGQlF6dFJRVVZ3UlN3clJrRkJLMFk3VVVGREwwWXNUVUZCVFN4MVFrRkJkVUlzUjBGQlJ5eGpRVUZqTEVOQlFVTXNSVUZCUlR0WlFVTXZReXhOUVVGTkxFOUJRVThzUjBGQlJ5eExRVUZMTEVOQlFVTXNSVUZCUlR0blFrRkRkRUlzZDBWQlFYZEZPMmRDUVVONFJUczdPenM3T3pzN08ydENRVk5GTzJkQ1FVTkdMRTFCUVUwc1YwRkJWeXhIUVVObUxFdEJRVXNzUTBGQlF5eFhRVUZYTEVsQlFVa3NTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhQUVVGUE8yOUNRVU0xUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUTBGQlF5eFBRVUZQTzI5Q1FVTXpRaXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzJkQ1FVTllMRTFCUVUwc1dVRkJXU3hIUVVGSExFdEJRVXNzUTBGQlF5eFpRVUZaTzI5Q1FVTnlReXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4WlFVRlpPMjlDUVVOb1F5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRPMmRDUVVOVUxFMUJRVTBzVjBGQlZ5eEhRVUZITzI5Q1FVTnNRaXhUUVVGVExFVkJRMUFzVjBGQlZ5eExRVUZMTEVsQlFVazdkMEpCUTJ4Q0xFTkJRVU1zUTBGQlF5eFhRVUZYTzNkQ1FVTmlMRU5CUVVNc1EwRkJReXhaUVVGWkxFdEJRVXNzU1VGQlNUczBRa0ZEZGtJc1EwRkJReXhEUVVGRExGbEJRVms3TkVKQlEyUXNRMEZCUXl4RFFVRkRMRVZCUVVVN2IwSkJRMUlzVlVGQlZTeEZRVUZGTEVWQlFVVTdiMEpCUTJRc1UwRkJVeXhGUVVGRkxFVkJRVVU3YjBKQlEySXNVVUZCVVN4RlFVRkZMRVZCUVVVN2IwSkJRMW9zWVVGQllTeEZRVUZGTEVWQlFVVTdiMEpCUTJwQ0xGTkJRVk1zUlVGQlJTeEZRVUZGTzJsQ1FVTmtMRU5CUVVNN1owSkJRMFlzU1VGQlNUdHZRa0ZEUml4UFFVRlBMRU5CUTB3c1VVRkJVVHQzUWtGRFRpeFZRVUZWTzNkQ1FVTldMRWRCUVVjN2QwSkJRMGdzWTBGQll5eEZRVU5vUWl4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVOUUxGZEJRVmNzUlVGRFdDeEZRVUZGTEVOQlEwZ3NRMEZCUXp0cFFrRkRTRHRuUWtGQlF5eFBRVUZQTEVkQlFVY3NSVUZCUlR0dlFrRkRXaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVU5VTEhORFFVRnpReXhGUVVOMFF5eEhRVUZITEVOQlFVTXNUMEZCVHl4RlFVTllMRWRCUVVjc1EwRkJReXhMUVVGTExFTkJRMVlzUTBGQlF6dHBRa0ZEU0R0WlFVTklMRU5CUVVNc1EwRkJRenRaUVVORUxFMUJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU40UkN4RFFVRkRMRU5CUVVNN1VVRkRSanRaUVVORkxHRkJRV0U3V1VGRFlpeFpRVUZaTzFsQlExb3NaVUZCWlR0WlFVTm1MRmxCUVZrN1dVRkRXaXhqUVVGak8xbEJRMlFzWVVGQllUdFpRVU5pTEZGQlFWRTdXVUZEVWl4alFVRmpPMWxCUTJRc1lVRkJZVHRaUVVOaUxGbEJRVms3V1VGRFdpeG5Ra0ZCWjBJN1dVRkRhRUlzV1VGQldUdFRRVU5pTEVOQlFVTXNSMEZCUnl4RFFVRkRMSFZDUVVGMVFpeERRVUZETEVOQlFVTTdVVUZGTDBJc2RVUkJRWFZFTzFGQlEzWkVMR2RDUVVGblFpeERRVUZGTEUxQlFXTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzBsQlEzcEVMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJSVWc3TzA5QlJVYzdTVUZEU0N4NVJFRkJlVVE3U1VGRmVrUXNaMFpCUVdkR08wbEJSV2hHTEVsQlFVa3NUMEZCVHl4RlFVRkZPMUZCUTFnc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGRFZDd3dSRUZCTUVRc1JVRkRNVVFzU1VGQlNTeEpRVUZKTEVWQlFVVXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkRla0lzUTBGQlF6dExRVU5JTzBGQlEwZ3NRMEZCUXl4RFFVRkRJbjA9IiwiZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9jb29raWUtaW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9odHRwLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9iYWNrZ3JvdW5kL25hdmlnYXRpb24taW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL2h0dHAtcG9zdC1wYXJzZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9zdHJpbmctdXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NjaGVtYVwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRXNZMEZCWXl4blEwRkJaME1zUTBGQlF6dEJRVU12UXl4alFVRmpMRGhDUVVFNFFpeERRVUZETzBGQlF6ZERMR05CUVdNc2IwTkJRVzlETEVOQlFVTTdRVUZEYmtRc1kwRkJZeXh2UTBGQmIwTXNRMEZCUXp0QlFVTnVSQ3hqUVVGakxDdERRVUVyUXl4RFFVRkRPMEZCUXpsRUxHTkJRV01zZDBKQlFYZENMRU5CUVVNN1FVRkRka01zWTBGQll5eHZRa0ZCYjBJc1EwRkJRenRCUVVOdVF5eGpRVUZqTEZWQlFWVXNRMEZCUXlKOSIsIi8qKlxuICogVGhpcyBlbmFibGVzIHVzIHRvIGtlZXAgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9yaWdpbmFsIG9yZGVyXG4gKiBpbiB3aGljaCBldmVudHMgYXJyaXZlZCB0byBvdXIgZXZlbnQgbGlzdGVuZXJzLlxuICovXG5sZXQgZXZlbnRPcmRpbmFsID0gMDtcbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCA9ICgpID0+IHtcbiAgICByZXR1cm4gZXZlbnRPcmRpbmFsKys7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWlhoMFpXNXphVzl1TFhObGMzTnBiMjR0WlhabGJuUXRiM0prYVc1aGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2WlhoMFpXNXphVzl1TFhObGMzTnBiMjR0WlhabGJuUXRiM0prYVc1aGJDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN08wZEJSMGM3UVVGRFNDeEpRVUZKTEZsQlFWa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1FVRkZja0lzVFVGQlRTeERRVUZETEUxQlFVMHNkVUpCUVhWQ0xFZEJRVWNzUjBGQlJ5eEZRVUZGTzBsQlF6RkRMRTlCUVU4c1dVRkJXU3hGUVVGRkxFTkJRVU03UVVGRGVFSXNRMEZCUXl4RFFVRkRJbjA9IiwiaW1wb3J0IHsgbWFrZVVVSUQgfSBmcm9tIFwiLi91dWlkXCI7XG4vKipcbiAqIFRoaXMgZW5hYmxlcyB1cyB0byBhY2Nlc3MgYSB1bmlxdWUgcmVmZXJlbmNlIHRvIHRoaXMgYnJvd3NlclxuICogc2Vzc2lvbiAtIHJlZ2VuZXJhdGVkIGFueSB0aW1lIHRoZSBiYWNrZ3JvdW5kIHByb2Nlc3MgZ2V0c1xuICogcmVzdGFydGVkICh3aGljaCBzaG91bGQgb25seSBiZSBvbiBicm93c2VyIHJlc3RhcnRzKVxuICovXG5leHBvcnQgY29uc3QgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgPSBtYWtlVVVJRCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWlhoMFpXNXphVzl1TFhObGMzTnBiMjR0ZFhWcFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2WlhoMFpXNXphVzl1TFhObGMzTnBiMjR0ZFhWcFpDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc1VVRkJVU3hGUVVGRkxFMUJRVTBzVVVGQlVTeERRVUZETzBGQlJXeERPenM3TzBkQlNVYzdRVUZEU0N4TlFVRk5MRU5CUVVNc1RVRkJUU3h2UWtGQmIwSXNSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJReUo5IiwiLy8gSW5jb3Jwb3JhdGVzIGNvZGUgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL3JlZGxpbmUxMy9zZWxlbml1bS1qbWV0ZXIvYmxvYi82OTY2ZDRiMzI2Y2Q3ODI2MWUzMWU2ZTMxNzA3NjU2OTA1MWNhYzM3L2NvbnRlbnQvbGlicmFyeS9yZWNvcmRlci9IdHRwUG9zdFBhcnNlci5qc1xuZXhwb3J0IGNsYXNzIEh0dHBQb3N0UGFyc2VyIHtcbiAgICAvKlxuICAgIHByaXZhdGUgaGFzaGVhZGVyczogYm9vbGVhbjtcbiAgICBwcml2YXRlIHNlZWthYmxlc3RyZWFtO1xuICAgIHByaXZhdGUgc3RyZWFtO1xuICAgIHByaXZhdGUgcG9zdEJvZHk7XG4gICAgcHJpdmF0ZSBwb3N0TGluZXM7XG4gICAgcHJpdmF0ZSBwb3N0SGVhZGVycztcbiAgICBwcml2YXRlIGJvZHk7XG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAvLyBvbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzOiBXZWJSZXF1ZXN0T25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyxcbiAgICBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsIGRhdGFSZWNlaXZlcikge1xuICAgICAgICAvLyB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMgPSBvbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzO1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscztcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiSHR0cFBvc3RQYXJzZXJcIixcbiAgICAgICAgICAvLyBvbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzLFxuICAgICAgICAgIG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyxcbiAgICAgICAgKTtcbiAgICAgICAgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGVuY29kaW5nVHlwZSBmcm9tIHRoZSBIVFRQIFJlcXVlc3QgaGVhZGVyc1xuICAgICAqL1xuICAgIHBhcnNlUG9zdFJlcXVlc3QoIC8qZW5jb2RpbmdUeXBlKi8pIHtcbiAgICAgICAgLy8gY29uc3QgcmVxdWVzdEhlYWRlcnMgPSB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMucmVxdWVzdEhlYWRlcnM7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMucmVxdWVzdEJvZHk7XG4gICAgICAgIGlmIChyZXF1ZXN0Qm9keS5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJFeGNlcHRpb246IFVwc3RyZWFtIGZhaWxlZCB0byBwYXJzZSBQT1NUOiBcIiArIHJlcXVlc3RCb2R5LmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdEJvZHkuZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcmVxdWVzdEJvZHkuZm9ybURhdGEgc2hvdWxkIHByb2JhYmx5IGJlIHRyYW5zZm9ybWVkIGludG8gYW5vdGhlciBmb3JtYXRcbiAgICAgICAgICAgICAgICBwb3N0X2JvZHk6IHJlcXVlc3RCb2R5LmZvcm1EYXRhLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gZW1wdHkgcmVzcG9uc2UgdW50aWwgd2UgaGF2ZSBhbGwgaW5zdHJ1bWVudGF0aW9uIGNvbnZlcnRlZFxuICAgICAgICByZXR1cm4ge307XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0RlYnVnKFxuICAgICAgICAgIFwiRXhjZXB0aW9uOiBJbnN0cnVtZW50YXRpb24gdG8gcGFyc2UgUE9TVCByZXF1ZXN0cyB3aXRob3V0IGZvcm1EYXRhIGlzIG5vdCB5ZXQgcmVzdG9yZWRcIixcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuc2V0dXBTdHJlYW0oKTtcbiAgICAgICAgICB0aGlzLnBhcnNlU3RyZWFtKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIkV4Y2VwdGlvbjogRmFpbGVkIHRvIHBhcnNlIFBPU1Q6IFwiICsgZSk7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IHBvc3RCb2R5ID0gdGhpcy5wb3N0Qm9keTtcbiAgICBcbiAgICAgICAgaWYgKCFwb3N0Qm9keSkge1xuICAgICAgICAgIC8vIHNvbWUgc2NyaXB0cyBzdHJhbmdlbHkgc2VuZHMgZW1wdHkgcG9zdCBib2RpZXMgKGNvbmZpcm1lZCB3aXRoIHRoZSBkZXZlbG9wZXIgdG9vbHMpXG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCBpc011bHRpUGFydCA9IGZhbHNlOyAvLyBlbmNUeXBlOiBtdWx0aXBhcnQvZm9ybS1kYXRhXG4gICAgICAgIGNvbnN0IHBvc3RIZWFkZXJzID0gdGhpcy5wb3N0SGVhZGVyczsgLy8gcmVxdWVzdCBoZWFkZXJzIGZyb20gdXBsb2FkIHN0cmVhbVxuICAgICAgICAvLyBTZWUsIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY1NDg1MTcvd2hhdC1pcy1yZXF1ZXN0LWhlYWRlcnMtZnJvbS11cGxvYWQtc3RyZWFtXG4gICAgXG4gICAgICAgIC8vIGFkZCBlbmNvZGluZ1R5cGUgZnJvbSBwb3N0SGVhZGVycyBpZiBpdCdzIG1pc3NpbmdcbiAgICAgICAgaWYgKCFlbmNvZGluZ1R5cGUgJiYgcG9zdEhlYWRlcnMgJiYgXCJDb250ZW50LVR5cGVcIiBpbiBwb3N0SGVhZGVycykge1xuICAgICAgICAgIGVuY29kaW5nVHlwZSA9IHBvc3RIZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChlbmNvZGluZ1R5cGUuaW5kZXhPZihcIm11bHRpcGFydC9mb3JtLWRhdGFcIikgIT09IC0xKSB7XG4gICAgICAgICAgaXNNdWx0aVBhcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCBqc29uUG9zdERhdGEgPSBcIlwiO1xuICAgICAgICBsZXQgZXNjYXBlZEpzb25Qb3N0RGF0YSA9IFwiXCI7XG4gICAgICAgIGlmIChpc011bHRpUGFydCkge1xuICAgICAgICAgIGpzb25Qb3N0RGF0YSA9IHRoaXMucGFyc2VNdWx0aVBhcnREYXRhKHBvc3RCb2R5IC8qLCBlbmNvZGluZ1R5cGUqIC8pO1xuICAgICAgICAgIGVzY2FwZWRKc29uUG9zdERhdGEgPSBlc2NhcGVTdHJpbmcoanNvblBvc3REYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqc29uUG9zdERhdGEgPSB0aGlzLnBhcnNlRW5jb2RlZEZvcm1EYXRhKHBvc3RCb2R5LCBlbmNvZGluZ1R5cGUpO1xuICAgICAgICAgIGVzY2FwZWRKc29uUG9zdERhdGEgPSBlc2NhcGVTdHJpbmcoanNvblBvc3REYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBwb3N0X2hlYWRlcnM6IHBvc3RIZWFkZXJzLCBwb3N0X2JvZHk6IGVzY2FwZWRKc29uUG9zdERhdGEgfTtcbiAgICAgICAgKi9cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0Mxd2IzTjBMWEJoY25ObGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2YUhSMGNDMXdiM04wTFhCaGNuTmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeG5TMEZCWjBzN1FVRmxhRXNzVFVGQlRTeFBRVUZQTEdOQlFXTTdTVUZKZWtJN096czdPenM3TzAxQlVVVTdTVUZGUmp0SlFVTkZMRGhGUVVFNFJUdEpRVU01UlN3eVFrRkJhMFVzUlVGRGJFVXNXVUZCV1R0UlFVVmFMREJGUVVFd1JUdFJRVU14UlN4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVkQlFVY3NNa0pCUVRKQ0xFTkJRVU03VVVGREwwUXNTVUZCU1N4RFFVRkRMRmxCUVZrc1IwRkJSeXhaUVVGWkxFTkJRVU03VVVGRGFrTTdPenM3T3p0VlFVMUZPMGxCUTBvc1EwRkJRenRKUVVWRU96dFBRVVZITzBsQlEwa3NaMEpCUVdkQ0xFVkJRVU1zWjBKQlFXZENPMUZCUTNSRExEaEZRVUU0UlR0UlFVTTVSU3hOUVVGTkxGZEJRVmNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNNa0pCUVRKQ0xFTkJRVU1zVjBGQlZ5eERRVUZETzFGQlEycEZMRWxCUVVrc1YwRkJWeXhEUVVGRExFdEJRVXNzUlVGQlJUdFpRVU55UWl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGRkJRVkVzUTBGRGVFSXNORU5CUVRSRExFZEJRVWNzVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZEYWtVc1EwRkJRenRUUVVOSU8xRkJRMFFzU1VGQlNTeFhRVUZYTEVOQlFVTXNVVUZCVVN4RlFVRkZPMWxCUTNoQ0xFOUJRVTg3WjBKQlEwd3NaMFpCUVdkR08yZENRVU5vUml4VFFVRlRMRVZCUVVVc1YwRkJWeXhEUVVGRExGRkJRVkU3WVVGRGFFTXNRMEZCUXp0VFFVTklPMUZCUlVRc2IwVkJRVzlGTzFGQlEzQkZMRTlCUVU4c1JVRkJSU3hEUVVGRE8xRkJRMVk3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMVZCTkVORk8wbEJRMG9zUTBGQlF6dERRVEpVUmlKOSIsImV4cG9ydCBmdW5jdGlvbiBpbnN0cnVtZW50RmluZ2VycHJpbnRpbmdBcGlzKHsgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5LCBpbnN0cnVtZW50T2JqZWN0LCB9KSB7XG4gICAgLy8gQWNjZXNzIHRvIG5hdmlnYXRvciBwcm9wZXJ0aWVzXG4gICAgY29uc3QgbmF2aWdhdG9yUHJvcGVydGllcyA9IFtcbiAgICAgICAgXCJhcHBDb2RlTmFtZVwiLFxuICAgICAgICBcImFwcE5hbWVcIixcbiAgICAgICAgXCJhcHBWZXJzaW9uXCIsXG4gICAgICAgIFwiYnVpbGRJRFwiLFxuICAgICAgICBcImNvb2tpZUVuYWJsZWRcIixcbiAgICAgICAgXCJkb05vdFRyYWNrXCIsXG4gICAgICAgIFwiZ2VvbG9jYXRpb25cIixcbiAgICAgICAgXCJsYW5ndWFnZVwiLFxuICAgICAgICBcImxhbmd1YWdlc1wiLFxuICAgICAgICBcIm9uTGluZVwiLFxuICAgICAgICBcIm9zY3B1XCIsXG4gICAgICAgIFwicGxhdGZvcm1cIixcbiAgICAgICAgXCJwcm9kdWN0XCIsXG4gICAgICAgIFwicHJvZHVjdFN1YlwiLFxuICAgICAgICBcInVzZXJBZ2VudFwiLFxuICAgICAgICBcInZlbmRvclN1YlwiLFxuICAgICAgICBcInZlbmRvclwiLFxuICAgIF07XG4gICAgbmF2aWdhdG9yUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkod2luZG93Lm5hdmlnYXRvciwgXCJ3aW5kb3cubmF2aWdhdG9yXCIsIHByb3BlcnR5KTtcbiAgICB9KTtcbiAgICAvLyBBY2Nlc3MgdG8gc2NyZWVuIHByb3BlcnRpZXNcbiAgICAvLyBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5zY3JlZW4sIFwid2luZG93LnNjcmVlblwiKTtcbiAgICAvLyBUT0RPOiB3aHkgZG8gd2UgaW5zdHJ1bWVudCBvbmx5IHR3byBzY3JlZW4gcHJvcGVydGllc1xuICAgIGNvbnN0IHNjcmVlblByb3BlcnRpZXMgPSBbXCJwaXhlbERlcHRoXCIsIFwiY29sb3JEZXB0aFwiXTtcbiAgICBzY3JlZW5Qcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cuc2NyZWVuLCBcIndpbmRvdy5zY3JlZW5cIiwgcHJvcGVydHkpO1xuICAgIH0pO1xuICAgIC8vIEFjY2VzcyB0byBwbHVnaW5zXG4gICAgY29uc3QgcGx1Z2luUHJvcGVydGllcyA9IFtcbiAgICAgICAgXCJuYW1lXCIsXG4gICAgICAgIFwiZmlsZW5hbWVcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICBcInZlcnNpb25cIixcbiAgICAgICAgXCJsZW5ndGhcIixcbiAgICBdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBsdWdpbk5hbWUgPSB3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnNbaV0ubmFtZTtcbiAgICAgICAgcGx1Z2luUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5uYXZpZ2F0b3IucGx1Z2luc1twbHVnaW5OYW1lXSwgXCJ3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnNbXCIgKyBwbHVnaW5OYW1lICsgXCJdXCIsIHByb3BlcnR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEFjY2VzcyB0byBNSU1FVHlwZXNcbiAgICBjb25zdCBtaW1lVHlwZVByb3BlcnRpZXMgPSBbXCJkZXNjcmlwdGlvblwiLCBcInN1ZmZpeGVzXCIsIFwidHlwZVwiXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1pbWVUeXBlTmFtZSA9IHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzW2ldLnR5cGU7IC8vIG5vdGU6IHVwc3RyZWFtIHR5cGluZ3Mgc2VlbXMgdG8gYmUgaW5jb3JyZWN0XG4gICAgICAgIG1pbWVUeXBlUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzW21pbWVUeXBlTmFtZV0sIFwid2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXNbXCIgKyBtaW1lVHlwZU5hbWUgKyBcIl1cIiwgcHJvcGVydHkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gTmFtZSwgbG9jYWxTdG9yYWdlLCBhbmQgc2Vzc2lvbnNTdG9yYWdlIGxvZ2dpbmdcbiAgICAvLyBJbnN0cnVtZW50aW5nIHdpbmRvdy5sb2NhbFN0b3JhZ2UgZGlyZWN0bHkgZG9lc24ndCBzZWVtIHRvIHdvcmssIHNvIHRoZSBTdG9yYWdlXG4gICAgLy8gcHJvdG90eXBlIG11c3QgYmUgaW5zdHJ1bWVudGVkIGluc3RlYWQuIFVuZm9ydHVuYXRlbHkgdGhpcyBmYWlscyB0byBkaWZmZXJlbnRpYXRlXG4gICAgLy8gYmV0d2VlbiBzZXNzaW9uU3RvcmFnZSBhbmQgbG9jYWxTdG9yYWdlLiBJbnN0ZWFkLCB5b3UnbGwgaGF2ZSB0byBsb29rIGZvciBhIHNlcXVlbmNlXG4gICAgLy8gb2YgYSBnZXQgZm9yIHRoZSBsb2NhbFN0b3JhZ2Ugb2JqZWN0IGZvbGxvd2VkIGJ5IGEgZ2V0SXRlbS9zZXRJdGVtIGZvciB0aGUgU3RvcmFnZSBvYmplY3QuXG4gICAgY29uc3Qgd2luZG93UHJvcGVydGllcyA9IFtcIm5hbWVcIiwgXCJsb2NhbFN0b3JhZ2VcIiwgXCJzZXNzaW9uU3RvcmFnZVwiXTtcbiAgICB3aW5kb3dQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3csIFwid2luZG93XCIsIHByb3BlcnR5KTtcbiAgICB9KTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5TdG9yYWdlLnByb3RvdHlwZSwgXCJ3aW5kb3cuU3RvcmFnZVwiKTtcbiAgICAvLyBBY2Nlc3MgdG8gZG9jdW1lbnQuY29va2llXG4gICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5kb2N1bWVudCwgXCJ3aW5kb3cuZG9jdW1lbnRcIiwgXCJjb29raWVcIiwge1xuICAgICAgICBsb2dDYWxsU3RhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgLy8gQWNjZXNzIHRvIGRvY3VtZW50LnJlZmVycmVyXG4gICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5kb2N1bWVudCwgXCJ3aW5kb3cuZG9jdW1lbnRcIiwgXCJyZWZlcnJlclwiLCB7XG4gICAgICAgIGxvZ0NhbGxTdGFjazogdHJ1ZSxcbiAgICB9KTtcbiAgICAvLyBBY2Nlc3MgdG8gY2FudmFzXG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLCBcIkhUTUxDYW52YXNFbGVtZW50XCIpO1xuICAgIGNvbnN0IGV4Y2x1ZGVkUHJvcGVydGllcyA9IFtcbiAgICAgICAgXCJxdWFkcmF0aWNDdXJ2ZVRvXCIsXG4gICAgICAgIFwibGluZVRvXCIsXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIFwiZ2xvYmFsQWxwaGFcIixcbiAgICAgICAgXCJtb3ZlVG9cIixcbiAgICAgICAgXCJkcmF3SW1hZ2VcIixcbiAgICAgICAgXCJzZXRUcmFuc2Zvcm1cIixcbiAgICAgICAgXCJjbGVhclJlY3RcIixcbiAgICAgICAgXCJjbG9zZVBhdGhcIixcbiAgICAgICAgXCJiZWdpblBhdGhcIixcbiAgICAgICAgXCJjYW52YXNcIixcbiAgICAgICAgXCJ0cmFuc2xhdGVcIixcbiAgICBdO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC5wcm90b3R5cGUsIFwiQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXCIsIHsgZXhjbHVkZWRQcm9wZXJ0aWVzIH0pO1xuICAgIC8vIEFjY2VzcyB0byB3ZWJSVENcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsIFwiUlRDUGVlckNvbm5lY3Rpb25cIik7XG4gICAgLy8gQWNjZXNzIHRvIEF1ZGlvIEFQSVxuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkF1ZGlvQ29udGV4dC5wcm90b3R5cGUsIFwiQXVkaW9Db250ZXh0XCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93Lk9mZmxpbmVBdWRpb0NvbnRleHQucHJvdG90eXBlLCBcIk9mZmxpbmVBdWRpb0NvbnRleHRcIik7XG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuT3NjaWxsYXRvck5vZGUucHJvdG90eXBlLCBcIk9zY2lsbGF0b3JOb2RlXCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkFuYWx5c2VyTm9kZS5wcm90b3R5cGUsIFwiQW5hbHlzZXJOb2RlXCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkdhaW5Ob2RlLnByb3RvdHlwZSwgXCJHYWluTm9kZVwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5TY3JpcHRQcm9jZXNzb3JOb2RlLnByb3RvdHlwZSwgXCJTY3JpcHRQcm9jZXNzb3JOb2RlXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1emRISjFiV1Z1ZEMxbWFXNW5aWEp3Y21sdWRHbHVaeTFoY0dsekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTlwYm5OMGNuVnRaVzUwTFdacGJtZGxjbkJ5YVc1MGFXNW5MV0Z3YVhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVFVGQlRTeFZRVUZWTERSQ1FVRTBRaXhEUVVGRExFVkJRek5ETEhkQ1FVRjNRaXhGUVVONFFpeG5Ra0ZCWjBJc1IwRkRha0k3U1VGRFF5eHBRMEZCYVVNN1NVRkRha01zVFVGQlRTeHRRa0ZCYlVJc1IwRkJSenRSUVVNeFFpeGhRVUZoTzFGQlEySXNVMEZCVXp0UlFVTlVMRmxCUVZrN1VVRkRXaXhUUVVGVE8xRkJRMVFzWlVGQlpUdFJRVU5tTEZsQlFWazdVVUZEV2l4aFFVRmhPMUZCUTJJc1ZVRkJWVHRSUVVOV0xGZEJRVmM3VVVGRFdDeFJRVUZSTzFGQlExSXNUMEZCVHp0UlFVTlFMRlZCUVZVN1VVRkRWaXhUUVVGVE8xRkJRMVFzV1VGQldUdFJRVU5hTEZkQlFWYzdVVUZEV0N4WFFVRlhPMUZCUTFnc1VVRkJVVHRMUVVOVUxFTkJRVU03U1VGRFJpeHRRa0ZCYlVJc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlV5eFJRVUZSTzFGQlF6TkRMSGRDUVVGM1FpeERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRVZCUVVVc2EwSkJRV3RDTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1NVRkRNMFVzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZGU0N3NFFrRkJPRUk3U1VGRE9VSXNiMFJCUVc5RU8wbEJRM0JFTEhkRVFVRjNSRHRKUVVONFJDeE5RVUZOTEdkQ1FVRm5RaXhIUVVGSExFTkJRVU1zV1VGQldTeEZRVUZGTEZsQlFWa3NRMEZCUXl4RFFVRkRPMGxCUTNSRUxHZENRVUZuUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGVExGRkJRVkU3VVVGRGVFTXNkMEpCUVhkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNSVUZCUlN4bFFVRmxMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRGNrVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkZTQ3h2UWtGQmIwSTdTVUZEY0VJc1RVRkJUU3huUWtGQlowSXNSMEZCUnp0UlFVTjJRaXhOUVVGTk8xRkJRMDRzVlVGQlZUdFJRVU5XTEdGQlFXRTdVVUZEWWl4VFFVRlRPMUZCUTFRc1VVRkJVVHRMUVVOVUxFTkJRVU03U1VGRFJpeExRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzFGQlEzaEVMRTFCUVUwc1ZVRkJWU3hIUVVGSExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU53UkN4blFrRkJaMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCVXl4UlFVRlJPMWxCUTNoRExIZENRVUYzUWl4RFFVTjBRaXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkRjRU1zTWtKQlFUSkNMRWRCUVVjc1ZVRkJWU3hIUVVGSExFZEJRVWNzUlVGRE9VTXNVVUZCVVN4RFFVTlVMRU5CUVVNN1VVRkRTaXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVU5LTzBsQlJVUXNjMEpCUVhOQ08wbEJRM1JDTEUxQlFVMHNhMEpCUVd0Q0xFZEJRVWNzUTBGQlF5eGhRVUZoTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8wbEJReTlFTEV0QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRk5CUVZNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdVVUZETVVRc1RVRkJUU3haUVVGWkxFZEJRVXNzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4VFFVRlRMRU5CUXk5RExFTkJRVU1zUTBGRGRVSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXdyUTBGQkswTTdVVUZEYUVZc2EwSkJRV3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVZNc1VVRkJVVHRaUVVNeFF5eDNRa0ZCZDBJc1EwRkRkRUlzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4VFFVRlRMRU5CUVVNc1dVRkJXU3hEUVVGRExFVkJRM2hETERaQ1FVRTJRaXhIUVVGSExGbEJRVmtzUjBGQlJ5eEhRVUZITEVWQlEyeEVMRkZCUVZFc1EwRkRWQ3hEUVVGRE8xRkJRMG9zUTBGQlF5eERRVUZETEVOQlFVTTdTMEZEU2p0SlFVTkVMR3RFUVVGclJEdEpRVU5zUkN4clJrRkJhMFk3U1VGRGJFWXNiMFpCUVc5R08wbEJRM0JHTEhWR1FVRjFSanRKUVVOMlJpdzJSa0ZCTmtZN1NVRkROMFlzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSeXhEUVVGRExFMUJRVTBzUlVGQlJTeGpRVUZqTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dEpRVU53UlN4blFrRkJaMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCVXl4UlFVRlJPMUZCUTNoRExIZENRVUYzUWl4RFFVRkRMRTFCUVUwc1JVRkJSU3hSUVVGUkxFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdTVUZEZGtRc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeG5Ra0ZCWjBJc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eERRVUZETzBsQlJUZEVMRFJDUVVFMFFqdEpRVU0xUWl4M1FrRkJkMElzUTBGQlF5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkZMR2xDUVVGcFFpeEZRVUZGTEZGQlFWRXNSVUZCUlR0UlFVTnlSU3haUVVGWkxFVkJRVVVzU1VGQlNUdExRVU51UWl4RFFVRkRMRU5CUVVNN1NVRkZTQ3c0UWtGQk9FSTdTVUZET1VJc2QwSkJRWGRDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1JVRkJSU3hwUWtGQmFVSXNSVUZCUlN4VlFVRlZMRVZCUVVVN1VVRkRka1VzV1VGQldTeEZRVUZGTEVsQlFVazdTMEZEYmtJc1EwRkJReXhEUVVGRE8wbEJSVWdzYlVKQlFXMUNPMGxCUTI1Q0xHZENRVUZuUWl4RFFVRkRMRTFCUVUwc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4VFFVRlRMRVZCUVVVc2JVSkJRVzFDTEVOQlFVTXNRMEZCUXp0SlFVVXhSU3hOUVVGTkxHdENRVUZyUWl4SFFVRkhPMUZCUTNwQ0xHdENRVUZyUWp0UlFVTnNRaXhSUVVGUk8xRkJRMUlzVjBGQlZ6dFJRVU5ZTEdGQlFXRTdVVUZEWWl4UlFVRlJPMUZCUTFJc1YwRkJWenRSUVVOWUxHTkJRV003VVVGRFpDeFhRVUZYTzFGQlExZ3NWMEZCVnp0UlFVTllMRmRCUVZjN1VVRkRXQ3hSUVVGUk8xRkJRMUlzVjBGQlZ6dExRVU5hTEVOQlFVTTdTVUZEUml4blFrRkJaMElzUTBGRFpDeE5RVUZOTEVOQlFVTXNkMEpCUVhkQ0xFTkJRVU1zVTBGQlV5eEZRVU42UXl3d1FrRkJNRUlzUlVGRE1VSXNSVUZCUlN4clFrRkJhMElzUlVGQlJTeERRVU4yUWl4RFFVRkRPMGxCUlVZc2JVSkJRVzFDTzBsQlEyNUNMR2RDUVVGblFpeERRVUZETEUxQlFVMHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFRRVUZUTEVWQlFVVXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dEpRVVV4UlN4elFrRkJjMEk3U1VGRGRFSXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4VFFVRlRMRVZCUVVVc1kwRkJZeXhEUVVGRExFTkJRVU03U1VGRGFFVXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExGTkJRVk1zUlVGQlJTeHhRa0ZCY1VJc1EwRkJReXhEUVVGRE8wbEJRemxGTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNVMEZCVXl4RlFVRkZMR2RDUVVGblFpeERRVUZETEVOQlFVTTdTVUZEY0VVc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRmxCUVZrc1EwRkJReXhUUVVGVExFVkJRVVVzWTBGQll5eERRVUZETEVOQlFVTTdTVUZEYUVVc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1EwRkJReXhUUVVGVExFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTTdTVUZEZUVRc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRzFDUVVGdFFpeERRVUZETEZOQlFWTXNSVUZCUlN4eFFrRkJjVUlzUTBGQlF5eERRVUZETzBGQlEyaEdMRU5CUVVNaWZRPT0iLCIvLyBJbnRydW1lbnRhdGlvbiBpbmplY3Rpb24gY29kZSBpcyBiYXNlZCBvbiBwcml2YWN5YmFkZ2VyZmlyZWZveFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0VGRm9yZy9wcml2YWN5YmFkZ2VyZmlyZWZveC9ibG9iL21hc3Rlci9kYXRhL2ZpbmdlcnByaW50aW5nLmpzXG5leHBvcnQgZnVuY3Rpb24ganNJbnN0cnVtZW50cyhldmVudF9pZCwgc2VuZE1lc3NhZ2VzVG9Mb2dnZXIpIHtcbiAgICAvKlxuICAgICAqIEluc3RydW1lbnRhdGlvbiBoZWxwZXJzXG4gICAgICogKElubGluZWQgaW4gb3JkZXIgZm9yIGpzSW5zdHJ1bWVudHMgdG8gYmUgZWFzaWx5IGV4cG9ydGFibGUgYXMgYSBzdHJpbmcpXG4gICAgICovXG4gICAgLy8gZGVib3VuY2UgLSBmcm9tIFVuZGVyc2NvcmUgdjEuNi4wXG4gICAgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuICAgICAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuICAgICAgICAgICAgaWYgKGxhc3QgPCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBnZW5lcmF0ZXMgYSBwYXRoIGZvciBhbiBlbGVtZW50XG4gICAgZnVuY3Rpb24gZ2V0UGF0aFRvRG9tRWxlbWVudChlbGVtZW50LCB2aXNpYmlsaXR5QXR0ciA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIk5VTEwvXCIgKyBlbGVtZW50LnRhZ05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpYmxpbmdJbmRleCA9IDE7XG4gICAgICAgIGNvbnN0IHNpYmxpbmdzID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2libGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSBzaWJsaW5nc1tpXTtcbiAgICAgICAgICAgIGlmIChzaWJsaW5nID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBnZXRQYXRoVG9Eb21FbGVtZW50KGVsZW1lbnQucGFyZW50Tm9kZSwgdmlzaWJpbGl0eUF0dHIpO1xuICAgICAgICAgICAgICAgIHBhdGggKz0gXCIvXCIgKyBlbGVtZW50LnRhZ05hbWUgKyBcIltcIiArIHNpYmxpbmdJbmRleDtcbiAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5pZDtcbiAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHlBdHRyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LmhpZGRlbjtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuc3R5bGUuZGlzcGxheTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gXCJBXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuaHJlZjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIl1cIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSAxICYmIHNpYmxpbmcudGFnTmFtZSA9PT0gZWxlbWVudC50YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2libGluZ0luZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSGVscGVyIGZvciBKU09OaWZ5aW5nIG9iamVjdHNcbiAgICBmdW5jdGlvbiBzZXJpYWxpemVPYmplY3Qob2JqZWN0LCBzdHJpbmdpZnlGdW5jdGlvbnMgPSBmYWxzZSkge1xuICAgICAgICAvLyBIYW5kbGUgcGVybWlzc2lvbnMgZXJyb3JzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmdpZnlGdW5jdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRlVOQ1RJT05cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZWVuT2JqZWN0cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iamVjdCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ2lmeUZ1bmN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJGVU5DVElPTlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHdyYXBwaW5nIG9uIGNvbnRlbnQgb2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICBpZiAoXCJ3cmFwcGVkSlNPYmplY3RcIiBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS53cmFwcGVkSlNPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU2VyaWFsaXplIERPTSBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFBhdGhUb0RvbUVsZW1lbnQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgc2VyaWFsaXphdGlvbiBjeWNsZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJcIiB8fCBzZWVuT2JqZWN0cy5pbmRleE9mKHZhbHVlKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZW5PYmplY3RzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogU0VSSUFMSVpBVElPTiBFUlJPUjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gXCJTRVJJQUxJWkFUSU9OIEVSUk9SOiBcIiArIGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qXG4gICAgICogRGlyZWN0IGluc3RydW1lbnRhdGlvbiBvZiBqYXZhc2NyaXB0IG9iamVjdHNcbiAgICAgKi9cbiAgICBjb25zdCBzZW5kRmFjdG9yeSA9IGZ1bmN0aW9uICgkZXZlbnRfaWQsICRzZW5kTWVzc2FnZXNUb0xvZ2dlcikge1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSBbXTtcbiAgICAgICAgLy8gZGVib3VuY2Ugc2VuZGluZyBxdWV1ZWQgbWVzc2FnZXNcbiAgICAgICAgY29uc3QgX3NlbmQgPSBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2VuZE1lc3NhZ2VzVG9Mb2dnZXIoJGV2ZW50X2lkLCBtZXNzYWdlcyk7XG4gICAgICAgICAgICAvLyBjbGVhciB0aGUgcXVldWVcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gW107XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobXNnVHlwZSwgbXNnKSB7XG4gICAgICAgICAgICAvLyBxdWV1ZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCh7IHR5cGU6IG1zZ1R5cGUsIGNvbnRlbnQ6IG1zZyB9KTtcbiAgICAgICAgICAgIF9zZW5kKCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBzZW5kID0gc2VuZEZhY3RvcnkoZXZlbnRfaWQsIHNlbmRNZXNzYWdlc1RvTG9nZ2VyKTtcbiAgICAvLyBDb3VudGVyIHRvIGNhcCAjIG9mIGNhbGxzIGxvZ2dlZCBmb3IgZWFjaCBzY3JpcHQvYXBpIGNvbWJpbmF0aW9uXG4gICAgY29uc3QgbWF4TG9nQ291bnQgPSA1MDA7XG4gICAgY29uc3QgbG9nQ291bnRlciA9IG5ldyBPYmplY3QoKTtcbiAgICBmdW5jdGlvbiB1cGRhdGVDb3VudGVyQW5kQ2hlY2tJZk92ZXIoc2NyaXB0VXJsLCBzeW1ib2wpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gc2NyaXB0VXJsICsgXCJ8XCIgKyBzeW1ib2w7XG4gICAgICAgIGlmIChrZXkgaW4gbG9nQ291bnRlciAmJiBsb2dDb3VudGVyW2tleV0gPj0gbWF4TG9nQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEoa2V5IGluIGxvZ0NvdW50ZXIpKSB7XG4gICAgICAgICAgICBsb2dDb3VudGVyW2tleV0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nQ291bnRlcltrZXldICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IGxvZ2dpbmcgb2YgZ2V0cyBhcmlzaW5nIGZyb20gbG9nZ2luZ1xuICAgIGxldCBpbkxvZyA9IGZhbHNlO1xuICAgIC8vIFRvIGtlZXAgdHJhY2sgb2YgdGhlIG9yaWdpbmFsIG9yZGVyIG9mIGV2ZW50c1xuICAgIGxldCBvcmRpbmFsID0gMDtcbiAgICAvLyBGb3IgZ2V0cywgc2V0cywgZXRjLiBvbiBhIHNpbmdsZSB2YWx1ZVxuICAgIGZ1bmN0aW9uIGxvZ1ZhbHVlKGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSwgdmFsdWUsIG9wZXJhdGlvbiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIGlmIChpbkxvZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgb3ZlckxpbWl0ID0gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKGNhbGxDb250ZXh0LnNjcmlwdFVybCwgaW5zdHJ1bWVudGVkVmFyaWFibGVOYW1lKTtcbiAgICAgICAgaWYgKG92ZXJMaW1pdCkge1xuICAgICAgICAgICAgaW5Mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgICAgICBvcGVyYXRpb24sXG4gICAgICAgICAgICBzeW1ib2w6IGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBzZXJpYWxpemVPYmplY3QodmFsdWUsICEhbG9nU2V0dGluZ3MubG9nRnVuY3Rpb25zQXNTdHJpbmdzKSxcbiAgICAgICAgICAgIHNjcmlwdFVybDogY2FsbENvbnRleHQuc2NyaXB0VXJsLFxuICAgICAgICAgICAgc2NyaXB0TGluZTogY2FsbENvbnRleHQuc2NyaXB0TGluZSxcbiAgICAgICAgICAgIHNjcmlwdENvbDogY2FsbENvbnRleHQuc2NyaXB0Q29sLFxuICAgICAgICAgICAgZnVuY05hbWU6IGNhbGxDb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICAgICAgc2NyaXB0TG9jRXZhbDogY2FsbENvbnRleHQuc2NyaXB0TG9jRXZhbCxcbiAgICAgICAgICAgIGNhbGxTdGFjazogY2FsbENvbnRleHQuY2FsbFN0YWNrLFxuICAgICAgICAgICAgb3JkaW5hbDogb3JkaW5hbCsrLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2VuZChcImxvZ1ZhbHVlXCIsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFVuc3VjY2Vzc2Z1bCB2YWx1ZSBsb2chXCIpO1xuICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIEZvciBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBsb2dDYWxsKGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSwgYXJncywgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKSB7XG4gICAgICAgIGlmIChpbkxvZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgb3ZlckxpbWl0ID0gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKGNhbGxDb250ZXh0LnNjcmlwdFVybCwgaW5zdHJ1bWVudGVkRnVuY3Rpb25OYW1lKTtcbiAgICAgICAgaWYgKG92ZXJMaW1pdCkge1xuICAgICAgICAgICAgaW5Mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ29udmVydCBzcGVjaWFsIGFyZ3VtZW50cyBhcnJheSB0byBhIHN0YW5kYXJkIGFycmF5IGZvciBKU09OaWZ5aW5nXG4gICAgICAgICAgICBjb25zdCBzZXJpYWxBcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxBcmdzLnB1c2goc2VyaWFsaXplT2JqZWN0KGFyZ3NbaV0sICEhbG9nU2V0dGluZ3MubG9nRnVuY3Rpb25zQXNTdHJpbmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiBcImNhbGxcIixcbiAgICAgICAgICAgICAgICBzeW1ib2w6IGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBzZXJpYWxBcmdzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHNjcmlwdFVybDogY2FsbENvbnRleHQuc2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHNjcmlwdExpbmU6IGNhbGxDb250ZXh0LnNjcmlwdExpbmUsXG4gICAgICAgICAgICAgICAgc2NyaXB0Q29sOiBjYWxsQ29udGV4dC5zY3JpcHRDb2wsXG4gICAgICAgICAgICAgICAgZnVuY05hbWU6IGNhbGxDb250ZXh0LmZ1bmNOYW1lLFxuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWw6IGNhbGxDb250ZXh0LnNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICAgICAgY2FsbFN0YWNrOiBjYWxsQ29udGV4dC5jYWxsU3RhY2ssXG4gICAgICAgICAgICAgICAgb3JkaW5hbDogb3JkaW5hbCsrLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNlbmQoXCJsb2dDYWxsXCIsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFVuc3VjY2Vzc2Z1bCBjYWxsIGxvZzogXCIgKyBpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUpO1xuICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3IgbmFtZTogXCIgKyBlcnJvci5uYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBtZXNzYWdlOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIGZpbGVuYW1lOiBcIiArIGVycm9yLmZpbGVOYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBsaW5lIG51bWJlcjogXCIgKyBlcnJvci5saW5lTnVtYmVyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBzdGFjazogXCIgKyBlcnJvci5zdGFjayk7XG4gICAgfVxuICAgIC8vIFJvdWdoIGltcGxlbWVudGF0aW9ucyBvZiBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yIGFuZCBPYmplY3QuZ2V0UHJvcGVydHlOYW1lc1xuICAgIC8vIFNlZSBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmV4dGVuZGVkX29iamVjdF9hcGlcbiAgICBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKHN1YmplY3QsIG5hbWUpIHtcbiAgICAgICAgbGV0IHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzdWJqZWN0LCBuYW1lKTtcbiAgICAgICAgbGV0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHN1YmplY3QpO1xuICAgICAgICB3aGlsZSAocGQgPT09IHVuZGVmaW5lZCAmJiBwcm90byAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKTtcbiAgICAgICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGQ7XG4gICAgfTtcbiAgICBPYmplY3QuZ2V0UHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN1YmplY3QpO1xuICAgICAgICBsZXQgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3ViamVjdCk7XG4gICAgICAgIHdoaWxlIChwcm90byAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pKTtcbiAgICAgICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGSVhNRTogcmVtb3ZlIGR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lcyBmcm9tIHByb3BzXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9O1xuICAgIC8vIEhlbHBlciB0byBnZXQgb3JpZ2luYXRpbmcgc2NyaXB0IHVybHNcbiAgICBmdW5jdGlvbiBnZXRTdGFja1RyYWNlKCkge1xuICAgICAgICBsZXQgc3RhY2s7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgfVxuICAgIC8vIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTIwMjE4NVxuICAgIFN0cmluZy5wcm90b3R5cGUucnNwbGl0ID0gZnVuY3Rpb24gKHNlcCwgbWF4c3BsaXQpIHtcbiAgICAgICAgY29uc3Qgc3BsaXQgPSB0aGlzLnNwbGl0KHNlcCk7XG4gICAgICAgIHJldHVybiBtYXhzcGxpdFxuICAgICAgICAgICAgPyBbc3BsaXQuc2xpY2UoMCwgLW1heHNwbGl0KS5qb2luKHNlcCldLmNvbmNhdChzcGxpdC5zbGljZSgtbWF4c3BsaXQpKVxuICAgICAgICAgICAgOiBzcGxpdDtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dChnZXRDYWxsU3RhY2sgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB0cmFjZSA9IGdldFN0YWNrVHJhY2UoKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAvLyByZXR1cm4gYSBjb250ZXh0IG9iamVjdCBldmVuIGlmIHRoZXJlIGlzIGFuIGVycm9yXG4gICAgICAgIGNvbnN0IGVtcHR5X2NvbnRleHQgPSB7XG4gICAgICAgICAgICBzY3JpcHRVcmw6IFwiXCIsXG4gICAgICAgICAgICBzY3JpcHRMaW5lOiBcIlwiLFxuICAgICAgICAgICAgc2NyaXB0Q29sOiBcIlwiLFxuICAgICAgICAgICAgZnVuY05hbWU6IFwiXCIsXG4gICAgICAgICAgICBzY3JpcHRMb2NFdmFsOiBcIlwiLFxuICAgICAgICAgICAgY2FsbFN0YWNrOiBcIlwiLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHJhY2UubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5X2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMCwgMSBhbmQgMiBhcmUgT3BlbldQTSdzIG93biBmdW5jdGlvbnMgKGUuZy4gZ2V0U3RhY2tUcmFjZSksIHNraXAgdGhlbS5cbiAgICAgICAgY29uc3QgY2FsbFNpdGUgPSB0cmFjZVszXTtcbiAgICAgICAgaWYgKCFjYWxsU2l0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5X2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgICogU3RhY2sgZnJhbWUgZm9ybWF0IGlzIHNpbXBseTogRlVOQ19OQU1FQEZJTEVOQU1FOkxJTkVfTk86Q09MVU1OX05PXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIGV2YWwgb3IgRnVuY3Rpb24gaXMgaW52b2x2ZWQgd2UgaGF2ZSBhbiBhZGRpdGlvbmFsIHBhcnQgYWZ0ZXIgdGhlIEZJTEVOQU1FLCBlLmcuOlxuICAgICAgICAgKiBGVU5DX05BTUVARklMRU5BTUUgbGluZSAxMjMgPiBldmFsIGxpbmUgMSA+IGV2YWw6TElORV9OTzpDT0xVTU5fTk9cbiAgICAgICAgICogb3IgRlVOQ19OQU1FQEZJTEVOQU1FIGxpbmUgMjM0ID4gRnVuY3Rpb246TElORV9OTzpDT0xVTU5fTk9cbiAgICAgICAgICpcbiAgICAgICAgICogV2Ugc3RvcmUgdGhlIHBhcnQgYmV0d2VlbiB0aGUgRklMRU5BTUUgYW5kIHRoZSBMSU5FX05PIGluIHNjcmlwdExvY0V2YWxcbiAgICAgICAgICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2NyaXB0VXJsID0gXCJcIjtcbiAgICAgICAgICAgIGxldCBzY3JpcHRMb2NFdmFsID0gXCJcIjsgLy8gZm9yIGV2YWwgb3IgRnVuY3Rpb24gY2FsbHNcbiAgICAgICAgICAgIGNvbnN0IGNhbGxTaXRlUGFydHMgPSBjYWxsU2l0ZS5zcGxpdChcIkBcIik7XG4gICAgICAgICAgICBjb25zdCBmdW5jTmFtZSA9IGNhbGxTaXRlUGFydHNbMF0gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gY2FsbFNpdGVQYXJ0c1sxXS5yc3BsaXQoXCI6XCIsIDIpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uTm8gPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVObyA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgY29uc3Qgc2NyaXB0RmlsZU5hbWUgPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAzXSB8fCBcIlwiO1xuICAgICAgICAgICAgY29uc3QgbGluZU5vSWR4ID0gc2NyaXB0RmlsZU5hbWUuaW5kZXhPZihcIiBsaW5lIFwiKTsgLy8gbGluZSBpbiB0aGUgVVJMIG1lYW5zIGV2YWwgb3IgRnVuY3Rpb25cbiAgICAgICAgICAgIGlmIChsaW5lTm9JZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0VXJsID0gc2NyaXB0RmlsZU5hbWU7IC8vIFRPRE86IHNvbWV0aW1lcyB3ZSBoYXZlIGZpbGVuYW1lIG9ubHksIGUuZy4gWFguanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcmlwdFVybCA9IHNjcmlwdEZpbGVOYW1lLnNsaWNlKDAsIGxpbmVOb0lkeCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0TG9jRXZhbCA9IHNjcmlwdEZpbGVOYW1lLnNsaWNlKGxpbmVOb0lkeCArIDEsIHNjcmlwdEZpbGVOYW1lLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmwsXG4gICAgICAgICAgICAgICAgc2NyaXB0TGluZTogbGluZU5vLFxuICAgICAgICAgICAgICAgIHNjcmlwdENvbDogY29sdW1uTm8sXG4gICAgICAgICAgICAgICAgZnVuY05hbWUsXG4gICAgICAgICAgICAgICAgc2NyaXB0TG9jRXZhbCxcbiAgICAgICAgICAgICAgICBjYWxsU3RhY2s6IGdldENhbGxTdGFja1xuICAgICAgICAgICAgICAgICAgICA/IHRyYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gY2FsbENvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3IgcGFyc2luZyB0aGUgc2NyaXB0IGNvbnRleHRcIiwgZSwgY2FsbFNpdGUpO1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5X2NvbnRleHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaXNPYmplY3Qob2JqZWN0LCBwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvcGVydHkgPSBvYmplY3RbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydHkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIG51bGwgaXMgdHlwZSBcIm9iamVjdFwiXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9wZXJ0eSA9PT0gXCJvYmplY3RcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5zdHJ1bWVudE9iamVjdChvYmplY3QsIG9iamVjdE5hbWUsIGxvZ1NldHRpbmdzID0ge30pIHtcbiAgICAgICAgLy8gVXNlIGZvciBvYmplY3RzIG9yIG9iamVjdCBwcm90b3R5cGVzXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFBhcmFtZXRlcnNcbiAgICAgICAgLy8gLS0tLS0tLS0tLVxuICAgICAgICAvLyAgIG9iamVjdCA6IE9iamVjdFxuICAgICAgICAvLyAgICAgT2JqZWN0IHRvIGluc3RydW1lbnRcbiAgICAgICAgLy8gICBvYmplY3ROYW1lIDogU3RyaW5nXG4gICAgICAgIC8vICAgICBOYW1lIG9mIHRoZSBvYmplY3QgdG8gYmUgaW5zdHJ1bWVudGVkIChzYXZlZCB0byBkYXRhYmFzZSlcbiAgICAgICAgLy8gICBsb2dTZXR0aW5ncyA6IE9iamVjdFxuICAgICAgICAvLyAgICAgKG9wdGlvbmFsKSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgbG9nZ2luZ1xuICAgICAgICAvLyAgICAgY29uZmlndXJhdGlvbnMuIFNlZSBhdmFpbGFibGUgb3B0aW9ucyBiZWxvdy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gbG9nU2V0dGluZ3Mgb3B0aW9ucyAoYWxsIG9wdGlvbmFsKVxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vICAgcHJvcGVydGllc1RvSW5zdHJ1bWVudCA6IEFycmF5XG4gICAgICAgIC8vICAgICBBbiBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIGluc3RydW1lbnQgb24gdGhpcyBvYmplY3QuIERlZmF1bHQgaXNcbiAgICAgICAgLy8gICAgIGFsbCBwcm9wZXJ0aWVzLlxuICAgICAgICAvLyAgIGV4Y2x1ZGVkUHJvcGVydGllcyA6IEFycmF5XG4gICAgICAgIC8vICAgICBQcm9wZXJ0aWVzIGV4Y2x1ZGVkIGZyb20gaW5zdHJ1bWVudGF0aW9uLiBEZWZhdWx0IGlzIGFuIGVtcHR5XG4gICAgICAgIC8vICAgICBhcnJheS5cbiAgICAgICAgLy8gICBsb2dDYWxsU3RhY2sgOiBib29sZWFuXG4gICAgICAgIC8vICAgICBTZXQgdG8gdHJ1ZSBzYXZlIHRoZSBjYWxsIHN0YWNrIGluZm8gd2l0aCBlYWNoIHByb3BlcnR5IGNhbGwuXG4gICAgICAgIC8vICAgICBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gICAgICAgIC8vICAgbG9nRnVuY3Rpb25zQXNTdHJpbmdzIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIHRydWUgdG8gc2F2ZSBmdW5jdGlvbmFsIGFyZ3VtZW50cyBhcyBzdHJpbmdzIGR1cmluZ1xuICAgICAgICAvLyAgICAgYXJndW1lbnQgc2VyaWFsaXphdGlvbi4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuICAgICAgICAvLyAgIHByZXZlbnRTZXRzIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIHRydWUgdG8gcHJldmVudCBuZXN0ZWQgb2JqZWN0cyBhbmQgZnVuY3Rpb25zIGZyb20gYmVpbmdcbiAgICAgICAgLy8gICAgIG92ZXJ3cml0dGVuIChhbmQgdGh1cyBoYXZpbmcgdGhlaXIgaW5zdHJ1bWVudGF0aW9uIHJlbW92ZWQpLlxuICAgICAgICAvLyAgICAgT3RoZXIgcHJvcGVydGllcyAoc3RhdGljIHZhbHVlcykgY2FuIHN0aWxsIGJlIHNldCB3aXRoIHRoaXMgaXNcbiAgICAgICAgLy8gICAgIGVuYWJsZWQuIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAgICAgICAgLy8gICByZWN1cnNpdmUgOiBib29sZWFuXG4gICAgICAgIC8vICAgICBTZXQgdG8gYHRydWVgIHRvIHJlY3Vyc2l2ZWx5IGluc3RydW1lbnQgYWxsIG9iamVjdCBwcm9wZXJ0aWVzIG9mXG4gICAgICAgIC8vICAgICB0aGUgZ2l2ZW4gYG9iamVjdGAuIERlZmF1bHQgaXMgYGZhbHNlYFxuICAgICAgICAvLyAgICAgTk9URTpcbiAgICAgICAgLy8gICAgICAgKDEpYGxvZ1NldHRpbmdzWydwcm9wZXJ0aWVzVG9JbnN0cnVtZW50J11gIGRvZXMgbm90IHByb3BhZ2F0ZVxuICAgICAgICAvLyAgICAgICAgICAgdG8gc3ViLW9iamVjdHMuXG4gICAgICAgIC8vICAgICAgICgyKSBTdWItb2JqZWN0cyBvZiBwcm90b3R5cGVzIGNhbiBub3QgYmUgaW5zdHJ1bWVudGVkXG4gICAgICAgIC8vICAgICAgICAgICByZWN1cnNpdmVseSBhcyB0aGVzZSBwcm9wZXJ0aWVzIGNhbiBub3QgYmUgYWNjZXNzZWRcbiAgICAgICAgLy8gICAgICAgICAgIHVudGlsIGFuIGluc3RhbmNlIG9mIHRoZSBwcm90b3R5cGUgaXMgY3JlYXRlZC5cbiAgICAgICAgLy8gICBkZXB0aCA6IGludGVnZXJcbiAgICAgICAgLy8gICAgIFJlY3Vyc2lvbiBsaW1pdCB3aGVuIGluc3RydW1lbnRpbmcgb2JqZWN0IHJlY3Vyc2l2ZWx5LlxuICAgICAgICAvLyAgICAgRGVmYXVsdCBpcyBgNWAuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBsb2dTZXR0aW5ncy5wcm9wZXJ0aWVzVG9JbnN0cnVtZW50XG4gICAgICAgICAgICA/IGxvZ1NldHRpbmdzLnByb3BlcnRpZXNUb0luc3RydW1lbnRcbiAgICAgICAgICAgIDogT2JqZWN0LmdldFByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzICYmXG4gICAgICAgICAgICAgICAgbG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcGVydGllc1tpXSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgYHJlY3Vyc2l2ZWAgZmxhZyBzZXQgd2Ugd2FudCB0byByZWN1cnNpdmVseSBpbnN0cnVtZW50IGFueVxuICAgICAgICAgICAgLy8gb2JqZWN0IHByb3BlcnRpZXMgdGhhdCBhcmVuJ3QgdGhlIHByb3RvdHlwZSBvYmplY3QuIE9ubHkgcmVjdXJzZSBpZlxuICAgICAgICAgICAgLy8gZGVwdGggbm90IHNldCAoYXQgd2hpY2ggcG9pbnQgaXRzIHNldCB0byBkZWZhdWx0KSBvciBub3QgYXQgbGltaXQuXG4gICAgICAgICAgICBpZiAoISFsb2dTZXR0aW5ncy5yZWN1cnNpdmUgJiZcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW2ldICE9PSBcIl9fcHJvdG9fX1wiICYmXG4gICAgICAgICAgICAgICAgaXNPYmplY3Qob2JqZWN0LCBwcm9wZXJ0aWVzW2ldKSAmJlxuICAgICAgICAgICAgICAgICghKFwiZGVwdGhcIiBpbiBsb2dTZXR0aW5ncykgfHwgbG9nU2V0dGluZ3MuZGVwdGggPiAwKSkge1xuICAgICAgICAgICAgICAgIC8vIHNldCByZWN1cnNpb24gbGltaXQgdG8gZGVmYXVsdCBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAgaWYgKCEoXCJkZXB0aFwiIGluIGxvZ1NldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dTZXR0aW5ncy5kZXB0aCA9IDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3Qob2JqZWN0W3Byb3BlcnRpZXNbaV1dLCBvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0aWVzW2ldLCB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVkUHJvcGVydGllczogbG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBsb2dDYWxsU3RhY2s6IGxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayxcbiAgICAgICAgICAgICAgICAgICAgbG9nRnVuY3Rpb25zQXNTdHJpbmdzOiBsb2dTZXR0aW5ncy5sb2dGdW5jdGlvbnNBc1N0cmluZ3MsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRTZXRzOiBsb2dTZXR0aW5ncy5wcmV2ZW50U2V0cyxcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlOiBsb2dTZXR0aW5ncy5yZWN1cnNpdmUsXG4gICAgICAgICAgICAgICAgICAgIGRlcHRoOiBsb2dTZXR0aW5ncy5kZXB0aCAtIDEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShvYmplY3QsIG9iamVjdE5hbWUsIHByb3BlcnRpZXNbaV0sIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBMb2cgY2FsbHMgdG8gYSBnaXZlbiBmdW5jdGlvblxuICAgIC8vIFRoaXMgaGVscGVyIGZ1bmN0aW9uIHJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCBgZnVuY2Agd2hpY2ggbG9ncyBjYWxsc1xuICAgIC8vIHRvIGBmdW5jYC4gYG9iamVjdE5hbWVgIGFuZCBgbWV0aG9kTmFtZWAgYXJlIHVzZWQgc3RyaWN0bHkgdG8gaWRlbnRpZnlcbiAgICAvLyB3aGljaCBvYmplY3QgbWV0aG9kIGBmdW5jYCBpcyBjb21pbmcgZnJvbSBpbiB0aGUgbG9nc1xuICAgIGZ1bmN0aW9uIGluc3RydW1lbnRGdW5jdGlvbihvYmplY3ROYW1lLCBtZXRob2ROYW1lLCBmdW5jLCBsb2dTZXR0aW5ncykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoISFsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgbG9nQ2FsbChvYmplY3ROYW1lICsgXCIuXCIgKyBtZXRob2ROYW1lLCBhcmd1bWVudHMsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBMb2cgcHJvcGVydGllcyBvZiBwcm90b3R5cGVzIGFuZCBvYmplY3RzXG4gICAgZnVuY3Rpb24gaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KG9iamVjdCwgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lLCBsb2dTZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIC8vIFN0b3JlIG9yaWdpbmFsIGRlc2NyaXB0b3IgaW4gY2xvc3VyZVxuICAgICAgICBjb25zdCBwcm9wRGVzYyA9IE9iamVjdC5nZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICBpZiAoIXByb3BEZXNjKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvcGVydHkgZGVzY3JpcHRvciBub3QgZm91bmQgZm9yXCIsIG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgb2JqZWN0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbnN0cnVtZW50IGRhdGEgb3IgYWNjZXNzb3IgcHJvcGVydHkgZGVzY3JpcHRvcnNcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxHZXR0ZXIgPSBwcm9wRGVzYy5nZXQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsU2V0dGVyID0gcHJvcERlc2Muc2V0O1xuICAgICAgICBsZXQgb3JpZ2luYWxWYWx1ZSA9IHByb3BEZXNjLnZhbHVlO1xuICAgICAgICAvLyBXZSBvdmVyd3JpdGUgYm90aCBkYXRhIGFuZCBhY2Nlc3NvciBwcm9wZXJ0aWVzIGFzIGFuIGluc3RydW1lbnRlZFxuICAgICAgICAvLyBhY2Nlc3NvciBwcm9wZXJ0eVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dCghIWxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBvcmlnaW5hbCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxHZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnUHJvcGVydHkgPSBvcmlnaW5hbEdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidmFsdWVcIiBpbiBwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZGF0YSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ1Byb3BlcnR5ID0gb3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBkZXNjcmlwdG9yIGZvclwiLCBvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIFwiZG9lc24ndCBoYXZlIGdldHRlciBvciB2YWx1ZT9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIFwiXCIsIFwiZ2V0KGZhaWxlZClcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgYGdldHNgIGV4Y2VwdCB0aG9zZSB0aGF0IGhhdmUgaW5zdHJ1bWVudGVkIHJldHVybiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gKiBBbGwgcmV0dXJuZWQgZnVuY3Rpb25zIGFyZSBpbnN0cnVtZW50ZWQgd2l0aCBhIHdyYXBwZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gKiBSZXR1cm5lZCBvYmplY3RzIG1heSBiZSBpbnN0cnVtZW50ZWQgaWYgcmVjdXJzaXZlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgaW5zdHJ1bWVudGF0aW9uIGlzIGVuYWJsZWQgYW5kIHRoaXMgaXNuJ3QgYXQgdGhlIGRlcHRoIGxpbWl0LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdQcm9wZXJ0eSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdHJ1bWVudEZ1bmN0aW9uKG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgb3JpZ1Byb3BlcnR5LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9yaWdQcm9wZXJ0eSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgISFsb2dTZXR0aW5ncy5yZWN1cnNpdmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICghKFwiZGVwdGhcIiBpbiBsb2dTZXR0aW5ncykgfHwgbG9nU2V0dGluZ3MuZGVwdGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgb3JpZ1Byb3BlcnR5LCBcImdldFwiLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgc2V0OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoISFsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgc2V0cyBmb3IgZnVuY3Rpb25zIGFuZCBvYmplY3RzIGlmIGVuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhbG9nU2V0dGluZ3MucHJldmVudFNldHMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2Ygb3JpZ2luYWxWYWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9yaWdpbmFsVmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIHZhbHVlLCBcInNldChwcmV2ZW50ZWQpXCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IG5ldyB2YWx1ZSB0byBvcmlnaW5hbCBzZXR0ZXIvbG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsU2V0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBhY2Nlc3NvciBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBvcmlnaW5hbFNldHRlci5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChcInZhbHVlXCIgaW4gcHJvcERlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluTG9nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3QuaXNQcm90b3R5cGVPZih0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eU5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5Mb2cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBkZXNjcmlwdG9yIGZvclwiLCBvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIFwiZG9lc24ndCBoYXZlIHNldHRlciBvciB2YWx1ZT9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIHZhbHVlLCBcInNldChmYWlsZWQpXCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9nIHNldFxuICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIHZhbHVlLCBcInNldFwiLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gbmV3IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGluc3RydW1lbnRPYmplY3QsXG4gICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSxcbiAgICAgICAgaW5zdHJ1bWVudEZ1bmN0aW9uLFxuICAgICAgICBsb2dDYWxsLFxuICAgICAgICBsb2dWYWx1ZSxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW5NdGFXNXpkSEoxYldWdWRITXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZiR2xpTDJwekxXbHVjM1J5ZFcxbGJuUnpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxHbEZRVUZwUlR0QlFVTnFSU3h2UmtGQmIwWTdRVUV3UW5CR0xFMUJRVTBzVlVGQlZTeGhRVUZoTEVOQlFVTXNVVUZCVVN4RlFVRkZMRzlDUVVGdlFqdEpRVU14UkRzN08wOUJSMGM3U1VGRlNDeHZRMEZCYjBNN1NVRkRjRU1zVTBGQlV5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hUUVVGVExFZEJRVWNzUzBGQlN6dFJRVU0zUXl4SlFVRkpMRTlCUVU4c1JVRkJSU3hKUVVGSkxFVkJRVVVzVDBGQlR5eEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNN1VVRkZPVU1zVFVGQlRTeExRVUZMTEVkQlFVYzdXVUZEV2l4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NVMEZCVXl4RFFVRkRPMWxCUTNCRExFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NSVUZCUlR0blFrRkRaaXhQUVVGUExFZEJRVWNzVlVGQlZTeERRVUZETEV0QlFVc3NSVUZCUlN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU03WVVGRE1VTTdhVUpCUVUwN1owSkJRMHdzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXp0blFrRkRaaXhKUVVGSkxFTkJRVU1zVTBGQlV5eEZRVUZGTzI5Q1FVTmtMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenR2UWtGRGJrTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU03YVVKQlEzWkNPMkZCUTBZN1VVRkRTQ3hEUVVGRExFTkJRVU03VVVGRlJpeFBRVUZQTzFsQlEwd3NUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJRenRaUVVObUxFbEJRVWtzUjBGQlJ5eFRRVUZUTEVOQlFVTTdXVUZEYWtJc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0WlFVTjJRaXhOUVVGTkxFOUJRVThzUjBGQlJ5eFRRVUZUTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1dVRkRkRU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkRXaXhQUVVGUExFZEJRVWNzVlVGQlZTeERRVUZETEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRoUVVOdVF6dFpRVU5FTEVsQlFVa3NUMEZCVHl4RlFVRkZPMmRDUVVOWUxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEYmtNc1QwRkJUeXhIUVVGSExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTTdZVUZEZGtJN1dVRkZSQ3hQUVVGUExFMUJRVTBzUTBGQlF6dFJRVU5vUWl4RFFVRkRMRU5CUVVNN1NVRkRTaXhEUVVGRE8wbEJSVVFzT0VOQlFUaERPMGxCUXpsRExGTkJRVk1zYlVKQlFXMUNMRU5CUVVNc1QwRkJUeXhGUVVGRkxHTkJRV01zUjBGQlJ5eExRVUZMTzFGQlF6RkVMRWxCUVVrc1QwRkJUeXhMUVVGTExGRkJRVkVzUTBGQlF5eEpRVUZKTEVWQlFVVTdXVUZETjBJc1QwRkJUeXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETzFOQlEzaENPMUZCUTBRc1NVRkJTU3hQUVVGUExFTkJRVU1zVlVGQlZTeExRVUZMTEVsQlFVa3NSVUZCUlR0WlFVTXZRaXhQUVVGUExFOUJRVThzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRPMU5CUTJ4RE8xRkJSVVFzU1VGQlNTeFpRVUZaTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTNKQ0xFMUJRVTBzVVVGQlVTeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1ZVRkJWU3hEUVVGRE8xRkJReTlETEV0QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8xbEJRM2hETEUxQlFVMHNUMEZCVHl4SFFVRkhMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU0xUWl4SlFVRkpMRTlCUVU4c1MwRkJTeXhQUVVGUExFVkJRVVU3WjBKQlEzWkNMRWxCUVVrc1NVRkJTU3hIUVVGSExHMUNRVUZ0UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGVkxFVkJRVVVzWTBGQll5eERRVUZETEVOQlFVTTdaMEpCUTI1RkxFbEJRVWtzU1VGQlNTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRTlCUVU4c1IwRkJSeXhIUVVGSExFZEJRVWNzV1VGQldTeERRVUZETzJkQ1FVTnVSQ3hKUVVGSkxFbEJRVWtzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4RlFVRkZMRU5CUVVNN1owSkJRM3BDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF6dG5Ra0ZEYUVNc1NVRkJTU3hqUVVGakxFVkJRVVU3YjBKQlEyeENMRWxCUVVrc1NVRkJTU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEUxQlFVMHNRMEZCUXp0dlFrRkROMElzU1VGQlNTeEpRVUZKTEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF6dHZRa0ZEY0VNc1NVRkJTU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJRenRwUWtGRGVFTTdaMEpCUTBRc1NVRkJTU3hQUVVGUExFTkJRVU1zVDBGQlR5eExRVUZMTEVkQlFVY3NSVUZCUlR0dlFrRkRNMElzU1VGQlNTeEpRVUZKTEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRE8ybENRVU0xUWp0blFrRkRSQ3hKUVVGSkxFbEJRVWtzUjBGQlJ5eERRVUZETzJkQ1FVTmFMRTlCUVU4c1NVRkJTU3hEUVVGRE8yRkJRMkk3V1VGRFJDeEpRVUZKTEU5QlFVOHNRMEZCUXl4UlFVRlJMRXRCUVVzc1EwRkJReXhKUVVGSkxFOUJRVThzUTBGQlF5eFBRVUZQTEV0QlFVc3NUMEZCVHl4RFFVRkRMRTlCUVU4c1JVRkJSVHRuUWtGRGFrVXNXVUZCV1N4RlFVRkZMRU5CUVVNN1lVRkRhRUk3VTBGRFJqdEpRVU5JTEVOQlFVTTdTVUZGUkN4blEwRkJaME03U1VGRGFFTXNVMEZCVXl4bFFVRmxMRU5CUVVNc1RVRkJUU3hGUVVGRkxHdENRVUZyUWl4SFFVRkhMRXRCUVVzN1VVRkRla1FzTkVKQlFUUkNPMUZCUXpWQ0xFbEJRVWs3V1VGRFJpeEpRVUZKTEUxQlFVMHNTMEZCU3l4SlFVRkpMRVZCUVVVN1owSkJRMjVDTEU5QlFVOHNUVUZCVFN4RFFVRkRPMkZCUTJZN1dVRkRSQ3hKUVVGSkxFOUJRVThzVFVGQlRTeExRVUZMTEZWQlFWVXNSVUZCUlR0blFrRkRhRU1zU1VGQlNTeHJRa0ZCYTBJc1JVRkJSVHR2UWtGRGRFSXNUMEZCVHl4TlFVRk5MRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU03YVVKQlF6RkNPM0ZDUVVGTk8yOUNRVU5NTEU5QlFVOHNWVUZCVlN4RFFVRkRPMmxDUVVOdVFqdGhRVU5HTzFsQlEwUXNTVUZCU1N4UFFVRlBMRTFCUVUwc1MwRkJTeXhSUVVGUkxFVkJRVVU3WjBKQlF6bENMRTlCUVU4c1RVRkJUU3hEUVVGRE8yRkJRMlk3V1VGRFJDeE5RVUZOTEZkQlFWY3NSMEZCUnl4RlFVRkZMRU5CUVVNN1dVRkRka0lzVDBGQlR5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hWUVVGVExFZEJRVWNzUlVGQlJTeExRVUZMTzJkQ1FVTXZReXhKUVVGSkxFdEJRVXNzUzBGQlN5eEpRVUZKTEVWQlFVVTdiMEpCUTJ4Q0xFOUJRVThzVFVGQlRTeERRVUZETzJsQ1FVTm1PMmRDUVVORUxFbEJRVWtzVDBGQlR5eExRVUZMTEV0QlFVc3NWVUZCVlN4RlFVRkZPMjlDUVVNdlFpeEpRVUZKTEd0Q1FVRnJRaXhGUVVGRk8zZENRVU4wUWl4UFFVRlBMRXRCUVVzc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6dHhRa0ZEZWtJN2VVSkJRVTA3ZDBKQlEwd3NUMEZCVHl4VlFVRlZMRU5CUVVNN2NVSkJRMjVDTzJsQ1FVTkdPMmRDUVVORUxFbEJRVWtzVDBGQlR5eExRVUZMTEV0QlFVc3NVVUZCVVN4RlFVRkZPMjlDUVVNM1FpeHhRMEZCY1VNN2IwSkJRM0pETEVsQlFVa3NhVUpCUVdsQ0xFbEJRVWtzUzBGQlN5eEZRVUZGTzNkQ1FVTTVRaXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETEdWQlFXVXNRMEZCUXp0eFFrRkRMMEk3YjBKQlJVUXNlVUpCUVhsQ08yOUNRVU42UWl4SlFVRkpMRXRCUVVzc1dVRkJXU3hYUVVGWExFVkJRVVU3ZDBKQlEyaERMRTlCUVU4c2JVSkJRVzFDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN2NVSkJRMjVETzI5Q1FVVkVMQ3RDUVVFclFqdHZRa0ZETDBJc1NVRkJTU3hIUVVGSExFdEJRVXNzUlVGQlJTeEpRVUZKTEZkQlFWY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzNkQ1FVTm9SQ3hYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPM2RDUVVONFFpeFBRVUZQTEV0QlFVc3NRMEZCUXp0eFFrRkRaRHQ1UWtGQlRUdDNRa0ZEVEN4UFFVRlBMRTlCUVU4c1MwRkJTeXhEUVVGRE8zRkNRVU55UWp0cFFrRkRSanRuUWtGRFJDeFBRVUZQTEV0QlFVc3NRMEZCUXp0WlFVTm1MRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRMG83VVVGQlF5eFBRVUZQTEV0QlFVc3NSVUZCUlR0WlFVTmtMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zWjBOQlFXZERMRWRCUVVjc1MwRkJTeXhEUVVGRExFTkJRVU03V1VGRGRFUXNUMEZCVHl4MVFrRkJkVUlzUjBGQlJ5eExRVUZMTEVOQlFVTTdVMEZEZUVNN1NVRkRTQ3hEUVVGRE8wbEJSVVE3TzA5QlJVYzdTVUZGU0N4TlFVRk5MRmRCUVZjc1IwRkJSeXhWUVVGVExGTkJRVk1zUlVGQlJTeHhRa0ZCY1VJN1VVRkRNMFFzU1VGQlNTeFJRVUZSTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJ4Q0xHMURRVUZ0UXp0UlFVTnVReXhOUVVGTkxFdEJRVXNzUjBGQlJ5eFJRVUZSTEVOQlFVTTdXVUZEY2tJc2NVSkJRWEZDTEVOQlFVTXNVMEZCVXl4RlFVRkZMRkZCUVZFc1EwRkJReXhEUVVGRE8xbEJSVE5ETEd0Q1FVRnJRanRaUVVOc1FpeFJRVUZSTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJoQ0xFTkJRVU1zUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVVlNMRTlCUVU4c1ZVRkJVeXhQUVVGUExFVkJRVVVzUjBGQlJ6dFpRVU14UWl4dlFrRkJiMEk3V1VGRGNFSXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU03V1VGREwwTXNTMEZCU3l4RlFVRkZMRU5CUVVNN1VVRkRWaXhEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETEVOQlFVTTdTVUZGUml4TlFVRk5MRWxCUVVrc1IwRkJSeXhYUVVGWExFTkJRVU1zVVVGQlVTeEZRVUZGTEc5Q1FVRnZRaXhEUVVGRExFTkJRVU03U1VGRmVrUXNiVVZCUVcxRk8wbEJRMjVGTEUxQlFVMHNWMEZCVnl4SFFVRkhMRWRCUVVjc1EwRkJRenRKUVVONFFpeE5RVUZOTEZWQlFWVXNSMEZCUnl4SlFVRkpMRTFCUVUwc1JVRkJSU3hEUVVGRE8wbEJSV2hETEZOQlFWTXNNa0pCUVRKQ0xFTkJRVU1zVTBGQlV5eEZRVUZGTEUxQlFVMDdVVUZEY0VRc1RVRkJUU3hIUVVGSExFZEJRVWNzVTBGQlV5eEhRVUZITEVkQlFVY3NSMEZCUnl4TlFVRk5MRU5CUVVNN1VVRkRja01zU1VGQlNTeEhRVUZITEVsQlFVa3NWVUZCVlN4SlFVRkpMRlZCUVZVc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeFhRVUZYTEVWQlFVVTdXVUZEZGtRc1QwRkJUeXhKUVVGSkxFTkJRVU03VTBGRFlqdGhRVUZOTEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hWUVVGVkxFTkJRVU1zUlVGQlJUdFpRVU12UWl4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFOQlEzSkNPMkZCUVUwN1dVRkRUQ3hWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTNSQ08xRkJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTTdTVUZEWml4RFFVRkRPMGxCUlVRc0swTkJRU3RETzBsQlF5OURMRWxCUVVrc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVVZzUWl4blJFRkJaMFE3U1VGRGFFUXNTVUZCU1N4UFFVRlBMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJSV2hDTEhsRFFVRjVRenRKUVVONlF5eFRRVUZUTEZGQlFWRXNRMEZEWml4M1FrRkJkMElzUlVGRGVFSXNTMEZCU3l4RlFVTk1MRk5CUVZNc1JVRkRWQ3hYUVVGWExFVkJRMWdzVjBGQlZ6dFJRVVZZTEVsQlFVa3NTMEZCU3l4RlFVRkZPMWxCUTFRc1QwRkJUenRUUVVOU08xRkJRMFFzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVVmlMRTFCUVUwc1UwRkJVeXhIUVVGSExESkNRVUV5UWl4RFFVTXpReXhYUVVGWExFTkJRVU1zVTBGQlV5eEZRVU55UWl4M1FrRkJkMElzUTBGRGVrSXNRMEZCUXp0UlFVTkdMRWxCUVVrc1UwRkJVeXhGUVVGRk8xbEJRMklzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0WlFVTmtMRTlCUVU4N1UwRkRVanRSUVVWRUxFMUJRVTBzUjBGQlJ5eEhRVUZITzFsQlExWXNVMEZCVXp0WlFVTlVMRTFCUVUwc1JVRkJSU3gzUWtGQmQwSTdXVUZEYUVNc1MwRkJTeXhGUVVGRkxHVkJRV1VzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXl4RFFVRkRMRmRCUVZjc1EwRkJReXh4UWtGQmNVSXNRMEZCUXp0WlFVTnNSU3hUUVVGVExFVkJRVVVzVjBGQlZ5eERRVUZETEZOQlFWTTdXVUZEYUVNc1ZVRkJWU3hGUVVGRkxGZEJRVmNzUTBGQlF5eFZRVUZWTzFsQlEyeERMRk5CUVZNc1JVRkJSU3hYUVVGWExFTkJRVU1zVTBGQlV6dFpRVU5vUXl4UlFVRlJMRVZCUVVVc1YwRkJWeXhEUVVGRExGRkJRVkU3V1VGRE9VSXNZVUZCWVN4RlFVRkZMRmRCUVZjc1EwRkJReXhoUVVGaE8xbEJRM2hETEZOQlFWTXNSVUZCUlN4WFFVRlhMRU5CUVVNc1UwRkJVenRaUVVOb1F5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPMU5CUTI1Q0xFTkJRVU03VVVGRlJpeEpRVUZKTzFsQlEwWXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFRRVU4yUWp0UlFVRkRMRTlCUVU4c1MwRkJTeXhGUVVGRk8xbEJRMlFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4clEwRkJhME1zUTBGQlF5eERRVUZETzFsQlEyaEVMR2xDUVVGcFFpeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMU5CUXpGQ08xRkJSVVFzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTm9RaXhEUVVGRE8wbEJSVVFzWjBKQlFXZENPMGxCUTJoQ0xGTkJRVk1zVDBGQlR5eERRVUZETEhkQ1FVRjNRaXhGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVWQlFVVXNWMEZCVnp0UlFVTjJSU3hKUVVGSkxFdEJRVXNzUlVGQlJUdFpRVU5VTEU5QlFVODdVMEZEVWp0UlFVTkVMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU03VVVGRllpeE5RVUZOTEZOQlFWTXNSMEZCUnl3eVFrRkJNa0lzUTBGRE0wTXNWMEZCVnl4RFFVRkRMRk5CUVZNc1JVRkRja0lzZDBKQlFYZENMRU5CUTNwQ0xFTkJRVU03VVVGRFJpeEpRVUZKTEZOQlFWTXNSVUZCUlR0WlFVTmlMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU03V1VGRFpDeFBRVUZQTzFOQlExSTdVVUZGUkN4SlFVRkpPMWxCUTBZc2NVVkJRWEZGTzFsQlEzSkZMRTFCUVUwc1ZVRkJWU3hIUVVGSExFVkJRVVVzUTBGQlF6dFpRVU4wUWl4TFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJUdG5Ra0ZEY0VNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGRFlpeGxRVUZsTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eFhRVUZYTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU1zUTBGRE9VUXNRMEZCUXp0aFFVTklPMWxCUTBRc1RVRkJUU3hIUVVGSExFZEJRVWM3WjBKQlExWXNVMEZCVXl4RlFVRkZMRTFCUVUwN1owSkJRMnBDTEUxQlFVMHNSVUZCUlN4M1FrRkJkMEk3WjBKQlEyaERMRWxCUVVrc1JVRkJSU3hWUVVGVk8yZENRVU5vUWl4TFFVRkxMRVZCUVVVc1JVRkJSVHRuUWtGRFZDeFRRVUZUTEVWQlFVVXNWMEZCVnl4RFFVRkRMRk5CUVZNN1owSkJRMmhETEZWQlFWVXNSVUZCUlN4WFFVRlhMRU5CUVVNc1ZVRkJWVHRuUWtGRGJFTXNVMEZCVXl4RlFVRkZMRmRCUVZjc1EwRkJReXhUUVVGVE8yZENRVU5vUXl4UlFVRlJMRVZCUVVVc1YwRkJWeXhEUVVGRExGRkJRVkU3WjBKQlF6bENMR0ZCUVdFc1JVRkJSU3hYUVVGWExFTkJRVU1zWVVGQllUdG5Ra0ZEZUVNc1UwRkJVeXhGUVVGRkxGZEJRVmNzUTBGQlF5eFRRVUZUTzJkQ1FVTm9ReXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTzJGQlEyNUNMRU5CUVVNN1dVRkRSaXhKUVVGSkxFTkJRVU1zVTBGQlV5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMU5CUTNSQ08xRkJRVU1zVDBGQlR5eExRVUZMTEVWQlFVVTdXVUZEWkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVOVUxHdERRVUZyUXl4SFFVRkhMSGRDUVVGM1FpeERRVU01UkN4RFFVRkRPMWxCUTBZc2FVSkJRV2xDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1UwRkRNVUk3VVVGRFJDeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRPMGxCUTJoQ0xFTkJRVU03U1VGRlJDeFRRVUZUTEdsQ1FVRnBRaXhEUVVGRExFdEJRVXM3VVVGRE9VSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXgxUWtGQmRVSXNSMEZCUnl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJFUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXd3UWtGQk1FSXNSMEZCUnl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGVFUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXd5UWtGQk1rSXNSMEZCUnl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRE1VUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXc0UWtGQk9FSXNSMEZCUnl4TFFVRkxMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03VVVGREwwUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXgzUWtGQmQwSXNSMEZCUnl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03U1VGRGRFUXNRMEZCUXp0SlFVVkVMRzlHUVVGdlJqdEpRVU53Uml4NVJVRkJlVVU3U1VGRGVrVXNUVUZCVFN4RFFVRkRMSEZDUVVGeFFpeEhRVUZITEZWQlFWTXNUMEZCVHl4RlFVRkZMRWxCUVVrN1VVRkRia1FzU1VGQlNTeEZRVUZGTEVkQlFVY3NUVUZCVFN4RFFVRkRMSGRDUVVGM1FpeERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVONFJDeEpRVUZKTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6TkRMRTlCUVU4c1JVRkJSU3hMUVVGTExGTkJRVk1zU1VGQlNTeExRVUZMTEV0QlFVc3NTVUZCU1N4RlFVRkZPMWxCUTNwRExFVkJRVVVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNkMEpCUVhkQ0xFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMWxCUTJ4RUxFdEJRVXNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xTkJRM1JETzFGQlEwUXNUMEZCVHl4RlFVRkZMRU5CUVVNN1NVRkRXaXhEUVVGRExFTkJRVU03U1VGRlJpeE5RVUZOTEVOQlFVTXNaMEpCUVdkQ0xFZEJRVWNzVlVGQlV5eFBRVUZQTzFGQlEzaERMRWxCUVVrc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFJRVU5vUkN4SlFVRkpMRXRCUVVzc1IwRkJSeXhOUVVGTkxFTkJRVU1zWTBGQll5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUXpORExFOUJRVThzUzBGQlN5eExRVUZMTEVsQlFVa3NSVUZCUlR0WlFVTnlRaXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVONFJDeExRVUZMTEVkQlFVY3NUVUZCVFN4RFFVRkRMR05CUVdNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFRRVU4wUXp0UlFVTkVMRzlFUVVGdlJEdFJRVU53UkN4UFFVRlBMRXRCUVVzc1EwRkJRenRKUVVObUxFTkJRVU1zUTBGQlF6dEpRVVZHTEhkRFFVRjNRenRKUVVONFF5eFRRVUZUTEdGQlFXRTdVVUZEY0VJc1NVRkJTU3hMUVVGTExFTkJRVU03VVVGRlZpeEpRVUZKTzFsQlEwWXNUVUZCVFN4SlFVRkpMRXRCUVVzc1JVRkJSU3hEUVVGRE8xTkJRMjVDTzFGQlFVTXNUMEZCVHl4SFFVRkhMRVZCUVVVN1dVRkRXaXhMUVVGTExFZEJRVWNzUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXp0VFFVTnVRanRSUVVWRUxFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyWXNRMEZCUXp0SlFVVkVMREJEUVVFd1F6dEpRVU14UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFMUJRVTBzUjBGQlJ5eFZRVUZUTEVkQlFVY3NSVUZCUlN4UlFVRlJPMUZCUXpsRExFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRE9VSXNUMEZCVHl4UlFVRlJPMWxCUTJJc1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xbEJRM1JGTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1NVRkRXaXhEUVVGRExFTkJRVU03U1VGRlJpeFRRVUZUTERKQ1FVRXlRaXhEUVVGRExGbEJRVmtzUjBGQlJ5eExRVUZMTzFGQlEzWkVMRTFCUVUwc1MwRkJTeXhIUVVGSExHRkJRV0VzUlVGQlJUdGhRVU14UWl4SlFVRkpMRVZCUVVVN1lVRkRUaXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEWml4dlJFRkJiMFE3VVVGRGNFUXNUVUZCVFN4aFFVRmhMRWRCUVVjN1dVRkRjRUlzVTBGQlV5eEZRVUZGTEVWQlFVVTdXVUZEWWl4VlFVRlZMRVZCUVVVc1JVRkJSVHRaUVVOa0xGTkJRVk1zUlVGQlJTeEZRVUZGTzFsQlEySXNVVUZCVVN4RlFVRkZMRVZCUVVVN1dVRkRXaXhoUVVGaExFVkJRVVVzUlVGQlJUdFpRVU5xUWl4VFFVRlRMRVZCUVVVc1JVRkJSVHRUUVVOa0xFTkJRVU03VVVGRFJpeEpRVUZKTEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhGUVVGRk8xbEJRM0JDTEU5QlFVOHNZVUZCWVN4RFFVRkRPMU5CUTNSQ08xRkJRMFFzTUVWQlFUQkZPMUZCUXpGRkxFMUJRVTBzVVVGQlVTeEhRVUZITEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNeFFpeEpRVUZKTEVOQlFVTXNVVUZCVVN4RlFVRkZPMWxCUTJJc1QwRkJUeXhoUVVGaExFTkJRVU03VTBGRGRFSTdVVUZEUkRzN096czdPenM3VjBGUlJ6dFJRVU5JTEVsQlFVazdXVUZEUml4SlFVRkpMRk5CUVZNc1IwRkJSeXhGUVVGRkxFTkJRVU03V1VGRGJrSXNTVUZCU1N4aFFVRmhMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zTmtKQlFUWkNPMWxCUTNKRUxFMUJRVTBzWVVGQllTeEhRVUZITEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRE1VTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1lVRkJZU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXp0WlFVTjRReXhOUVVGTkxFdEJRVXNzUjBGQlJ5eGhRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTVReXhOUVVGTkxGRkJRVkVzUjBGQlJ5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU42UXl4TlFVRk5MRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOMlF5eE5RVUZOTEdOQlFXTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1dVRkRja1FzVFVGQlRTeFRRVUZUTEVkQlFVY3NZMEZCWXl4RFFVRkRMRTlCUVU4c1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETEhsRFFVRjVRenRaUVVNM1JpeEpRVUZKTEZOQlFWTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1JVRkJSVHRuUWtGRGNFSXNVMEZCVXl4SFFVRkhMR05CUVdNc1EwRkJReXhEUVVGRExHOUVRVUZ2UkR0aFFVTnFSanRwUWtGQlRUdG5Ra0ZEVEN4VFFVRlRMRWRCUVVjc1kwRkJZeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNN1owSkJReTlETEdGQlFXRXNSMEZCUnl4alFVRmpMRU5CUVVNc1MwRkJTeXhEUVVOc1F5eFRRVUZUTEVkQlFVY3NRMEZCUXl4RlFVTmlMR05CUVdNc1EwRkJReXhOUVVGTkxFTkJRM1JDTEVOQlFVTTdZVUZEU0R0WlFVTkVMRTFCUVUwc1YwRkJWeXhIUVVGSE8yZENRVU5zUWl4VFFVRlRPMmRDUVVOVUxGVkJRVlVzUlVGQlJTeE5RVUZOTzJkQ1FVTnNRaXhUUVVGVExFVkJRVVVzVVVGQlVUdG5Ra0ZEYmtJc1VVRkJVVHRuUWtGRFVpeGhRVUZoTzJkQ1FVTmlMRk5CUVZNc1JVRkJSU3haUVVGWk8yOUNRVU55UWl4RFFVRkRMRU5CUVVNc1MwRkJTenQ1UWtGRFJpeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPM2xDUVVOU0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdlVUpCUTFZc1NVRkJTU3hGUVVGRk8yOUNRVU5ZTEVOQlFVTXNRMEZCUXl4RlFVRkZPMkZCUTFBc1EwRkJRenRaUVVOR0xFOUJRVThzVjBGQlZ5eERRVUZETzFOQlEzQkNPMUZCUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRFZpeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMREpEUVVFeVF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJRenRaUVVOMFJTeFBRVUZQTEdGQlFXRXNRMEZCUXp0VFFVTjBRanRKUVVOSUxFTkJRVU03U1VGRlJDeFRRVUZUTEZGQlFWRXNRMEZCUXl4TlFVRk5MRVZCUVVVc1dVRkJXVHRSUVVOd1F5eEpRVUZKTEZGQlFWRXNRMEZCUXp0UlFVTmlMRWxCUVVrN1dVRkRSaXhSUVVGUkxFZEJRVWNzVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRPMU5CUTJwRE8xRkJRVU1zVDBGQlR5eExRVUZMTEVWQlFVVTdXVUZEWkN4UFFVRlBMRXRCUVVzc1EwRkJRenRUUVVOa08xRkJRMFFzU1VGQlNTeFJRVUZSTEV0QlFVc3NTVUZCU1N4RlFVRkZPMWxCUTNKQ0xIZENRVUYzUWp0WlFVTjRRaXhQUVVGUExFdEJRVXNzUTBGQlF6dFRRVU5rTzFGQlEwUXNUMEZCVHl4UFFVRlBMRkZCUVZFc1MwRkJTeXhSUVVGUkxFTkJRVU03U1VGRGRFTXNRMEZCUXp0SlFVVkVMRk5CUVZNc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RlFVRkZMRlZCUVZVc1JVRkJSU3hqUVVFeVFpeEZRVUZGTzFGQlEzcEZMSFZEUVVGMVF6dFJRVU4yUXl4RlFVRkZPMUZCUTBZc1lVRkJZVHRSUVVOaUxHRkJRV0U3VVVGRFlpeHZRa0ZCYjBJN1VVRkRjRUlzTWtKQlFUSkNPMUZCUXpOQ0xIZENRVUYzUWp0UlFVTjRRaXhuUlVGQlowVTdVVUZEYUVVc2VVSkJRWGxDTzFGQlEzcENMSFZGUVVGMVJUdFJRVU4yUlN4dFJFRkJiVVE3VVVGRGJrUXNSVUZCUlR0UlFVTkdMSEZEUVVGeFF6dFJRVU55UXl4elFrRkJjMEk3VVVGRGRFSXNiVU5CUVcxRE8xRkJRMjVETEhORlFVRnpSVHRSUVVOMFJTeHpRa0ZCYzBJN1VVRkRkRUlzSzBKQlFTdENPMUZCUXk5Q0xHOUZRVUZ2UlR0UlFVTndSU3hoUVVGaE8xRkJRMklzTWtKQlFUSkNPMUZCUXpOQ0xHOUZRVUZ2UlR0UlFVTndSU3d3UWtGQk1FSTdVVUZETVVJc2IwTkJRVzlETzFGQlEzQkRMR2xGUVVGcFJUdFJRVU5xUlN4clJFRkJhMFE3VVVGRGJFUXNNRUpCUVRCQ08xRkJRekZDTEhGRlFVRnhSVHRSUVVOeVJTeHRSVUZCYlVVN1VVRkRia1VzY1VWQlFYRkZPMUZCUTNKRkxHMURRVUZ0UXp0UlFVTnVReXgzUWtGQmQwSTdVVUZEZUVJc2RVVkJRWFZGTzFGQlEzWkZMRFpEUVVFMlF6dFJRVU0zUXl4WlFVRlpPMUZCUTFvc2MwVkJRWE5GTzFGQlEzUkZMRFJDUVVFMFFqdFJRVU0xUWl3NFJFRkJPRVE3VVVGRE9VUXNaMFZCUVdkRk8xRkJRMmhGTERKRVFVRXlSRHRSUVVNelJDeHZRa0ZCYjBJN1VVRkRjRUlzTmtSQlFUWkVPMUZCUXpkRUxITkNRVUZ6UWp0UlFVTjBRaXhOUVVGTkxGVkJRVlVzUjBGQlJ5eFhRVUZYTEVOQlFVTXNjMEpCUVhOQ08xbEJRMjVFTEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc2MwSkJRWE5DTzFsQlEzQkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRGNFTXNTMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEZWQlFWVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3V1VGRE1VTXNTVUZEUlN4WFFVRlhMRU5CUVVNc2EwSkJRV3RDTzJkQ1FVTTVRaXhYUVVGWExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhGUVVNeFJEdG5Ra0ZEUVN4VFFVRlRPMkZCUTFZN1dVRkRSQ3huUlVGQlowVTdXVUZEYUVVc2MwVkJRWE5GTzFsQlEzUkZMSEZGUVVGeFJUdFpRVU55UlN4SlFVTkZMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zVTBGQlV6dG5Ra0ZEZGtJc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEZkQlFWYzdaMEpCUXpkQ0xGRkJRVkVzUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU12UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFbEJRVWtzVjBGQlZ5eERRVUZETEVsQlFVa3NWMEZCVnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zUlVGRGNFUTdaMEpCUTBFc2EwUkJRV3RFTzJkQ1FVTnNSQ3hKUVVGSkxFTkJRVU1zUTBGQlF5eFBRVUZQTEVsQlFVa3NWMEZCVnl4RFFVRkRMRVZCUVVVN2IwSkJRemRDTEZkQlFWY3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRE8ybENRVU4yUWp0blFrRkRSQ3huUWtGQlowSXNRMEZEWkN4TlFVRk5MRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlEzSkNMRlZCUVZVc1IwRkJSeXhIUVVGSExFZEJRVWNzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVTm9RenR2UWtGRFJTeHJRa0ZCYTBJc1JVRkJSU3hYUVVGWExFTkJRVU1zYTBKQlFXdENPMjlDUVVOc1JDeFpRVUZaTEVWQlFVVXNWMEZCVnl4RFFVRkRMRmxCUVZrN2IwSkJRM1JETEhGQ1FVRnhRaXhGUVVGRkxGZEJRVmNzUTBGQlF5eHhRa0ZCY1VJN2IwSkJRM2hFTEZkQlFWY3NSVUZCUlN4WFFVRlhMRU5CUVVNc1YwRkJWenR2UWtGRGNFTXNVMEZCVXl4RlFVRkZMRmRCUVZjc1EwRkJReXhUUVVGVE8yOUNRVU5vUXl4TFFVRkxMRVZCUVVVc1YwRkJWeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETzJsQ1FVTTNRaXhEUVVOR0xFTkJRVU03WVVGRFNEdFpRVU5FTEVsQlFVazdaMEpCUTBZc2QwSkJRWGRDTEVOQlEzUkNMRTFCUVUwc1JVRkRUaXhWUVVGVkxFVkJRMVlzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVTmlMRmRCUVZjc1EwRkRXaXhEUVVGRE8yRkJRMGc3V1VGQlF5eFBRVUZQTEV0QlFVc3NSVUZCUlR0blFrRkRaQ3hwUWtGQmFVSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRoUVVNeFFqdFRRVU5HTzBsQlEwZ3NRMEZCUXp0SlFVVkVMR2REUVVGblF6dEpRVU5vUXl4M1JVRkJkMFU3U1VGRGVFVXNlVVZCUVhsRk8wbEJRM3BGTEhkRVFVRjNSRHRKUVVONFJDeFRRVUZUTEd0Q1FVRnJRaXhEUVVGRExGVkJRVlVzUlVGQlJTeFZRVUZWTEVWQlFVVXNTVUZCU1N4RlFVRkZMRmRCUVZjN1VVRkRia1VzVDBGQlR6dFpRVU5NTEUxQlFVMHNWMEZCVnl4SFFVRkhMREpDUVVFeVFpeERRVU0zUXl4RFFVRkRMRU5CUVVNc1YwRkJWeXhEUVVGRExGbEJRVmtzUTBGRE0wSXNRMEZCUXp0WlFVTkdMRTlCUVU4c1EwRkRUQ3hWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZWQlFWVXNSVUZETjBJc1UwRkJVeXhGUVVOVUxGZEJRVmNzUlVGRFdDeFhRVUZYTEVOQlExb3NRMEZCUXp0WlFVTkdMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNN1VVRkRja01zUTBGQlF5eERRVUZETzBsQlEwb3NRMEZCUXp0SlFVVkVMREpEUVVFeVF6dEpRVU16UXl4VFFVRlRMSGRDUVVGM1FpeERRVU12UWl4TlFVRk5MRVZCUTA0c1ZVRkJWU3hGUVVOV0xGbEJRVmtzUlVGRFdpeGpRVUV5UWl4RlFVRkZPMUZCUlRkQ0xIVkRRVUYxUXp0UlFVTjJReXhOUVVGTkxGRkJRVkVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU1zVFVGQlRTeEZRVUZGTEZsQlFWa3NRMEZCUXl4RFFVRkRPMUZCUTNCRkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZEWWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVOWUxHMURRVUZ0UXl4RlFVTnVReXhWUVVGVkxFVkJRMVlzV1VGQldTeEZRVU5hTEUxQlFVMHNRMEZEVUN4RFFVRkRPMWxCUTBZc1QwRkJUenRUUVVOU08xRkJSVVFzYlVSQlFXMUVPMUZCUTI1RUxFMUJRVTBzWTBGQll5eEhRVUZITEZGQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNN1VVRkRjRU1zVFVGQlRTeGpRVUZqTEVkQlFVY3NVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJRenRSUVVOd1F5eEpRVUZKTEdGQlFXRXNSMEZCUnl4UlFVRlJMRU5CUVVNc1MwRkJTeXhEUVVGRE8xRkJSVzVETEc5RlFVRnZSVHRSUVVOd1JTeHZRa0ZCYjBJN1VVRkRjRUlzVFVGQlRTeERRVUZETEdOQlFXTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1dVRkJXU3hGUVVGRk8xbEJRekZETEZsQlFWa3NSVUZCUlN4SlFVRkpPMWxCUTJ4Q0xFZEJRVWNzUlVGQlJTeERRVUZETzJkQ1FVTktMRTlCUVU4N2IwSkJRMHdzU1VGQlNTeFpRVUZaTEVOQlFVTTdiMEpCUTJwQ0xFMUJRVTBzVjBGQlZ5eEhRVUZITERKQ1FVRXlRaXhEUVVNM1F5eERRVUZETEVOQlFVTXNWMEZCVnl4RFFVRkRMRmxCUVZrc1EwRkRNMElzUTBGQlF6dHZRa0ZGUml4eFFrRkJjVUk3YjBKQlEzSkNMRWxCUVVrc1kwRkJZeXhGUVVGRk8zZENRVU5zUWl4MVFrRkJkVUk3ZDBKQlEzWkNMRmxCUVZrc1IwRkJSeXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPM0ZDUVVNeFF6dDVRa0ZCVFN4SlFVRkpMRTlCUVU4c1NVRkJTU3hSUVVGUkxFVkJRVVU3ZDBKQlF6bENMRzFDUVVGdFFqdDNRa0ZEYmtJc1dVRkJXU3hIUVVGSExHRkJRV0VzUTBGQlF6dHhRa0ZET1VJN2VVSkJRVTA3ZDBKQlEwd3NUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkRXQ3g1UWtGQmVVSXNSVUZEZWtJc1ZVRkJWU3hIUVVGSExFZEJRVWNzUjBGQlJ5eFpRVUZaTEVWQlF5OUNMQ3RDUVVFclFpeERRVU5vUXl4RFFVRkRPM2RDUVVOR0xGRkJRVkVzUTBGRFRpeFZRVUZWTEVkQlFVY3NSMEZCUnl4SFFVRkhMRmxCUVZrc1JVRkRMMElzUlVGQlJTeEZRVU5HTEdGQlFXRXNSVUZEWWl4WFFVRlhMRVZCUTFnc1YwRkJWeXhEUVVOYUxFTkJRVU03ZDBKQlEwWXNUMEZCVHp0eFFrRkRVanR2UWtGRlJDd3JSRUZCSzBRN2IwSkJReTlFTERKRVFVRXlSRHR2UWtGRE0wUXNjMFJCUVhORU8yOUNRVU4wUkN4clJVRkJhMFU3YjBKQlEyeEZMRWxCUVVrc1QwRkJUeXhaUVVGWkxFdEJRVXNzVlVGQlZTeEZRVUZGTzNkQ1FVTjBReXhQUVVGUExHdENRVUZyUWl4RFFVTjJRaXhWUVVGVkxFVkJRMVlzV1VGQldTeEZRVU5hTEZsQlFWa3NSVUZEV2l4WFFVRlhMRU5CUTFvc1EwRkJRenR4UWtGRFNEdDVRa0ZCVFN4SlFVTk1MRTlCUVU4c1dVRkJXU3hMUVVGTExGRkJRVkU3ZDBKQlEyaERMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zVTBGQlV6dDNRa0ZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEpRVUZKTEZkQlFWY3NRMEZCUXl4SlFVRkpMRmRCUVZjc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlEzQkVPM2RDUVVOQkxFOUJRVThzV1VGQldTeERRVUZETzNGQ1FVTnlRanQ1UWtGQlRUdDNRa0ZEVEN4UlFVRlJMRU5CUTA0c1ZVRkJWU3hIUVVGSExFZEJRVWNzUjBGQlJ5eFpRVUZaTEVWQlF5OUNMRmxCUVZrc1JVRkRXaXhMUVVGTExFVkJRMHdzVjBGQlZ5eEZRVU5ZTEZkQlFWY3NRMEZEV2l4RFFVRkRPM2RDUVVOR0xFOUJRVThzV1VGQldTeERRVUZETzNGQ1FVTnlRanRuUWtGRFNDeERRVUZETEVOQlFVTTdXVUZEU2l4RFFVRkRMRU5CUVVNc1JVRkJSVHRaUVVOS0xFZEJRVWNzUlVGQlJTeERRVUZETzJkQ1FVTktMRTlCUVU4c1ZVRkJVeXhMUVVGTE8yOUNRVU51UWl4TlFVRk5MRmRCUVZjc1IwRkJSeXd5UWtGQk1rSXNRMEZETjBNc1EwRkJReXhEUVVGRExGZEJRVmNzUTBGQlF5eFpRVUZaTEVOQlF6TkNMRU5CUVVNN2IwSkJRMFlzU1VGQlNTeFhRVUZYTEVOQlFVTTdiMEpCUldoQ0xHOUVRVUZ2UkR0dlFrRkRjRVFzU1VGRFJTeERRVUZETEVOQlFVTXNWMEZCVnl4RFFVRkRMRmRCUVZjN2QwSkJRM3BDTEVOQlFVTXNUMEZCVHl4aFFVRmhMRXRCUVVzc1ZVRkJWVHMwUWtGRGJFTXNUMEZCVHl4aFFVRmhMRXRCUVVzc1VVRkJVU3hEUVVGRExFVkJRM0JETzNkQ1FVTkJMRkZCUVZFc1EwRkRUaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc1MwRkJTeXhGUVVOTUxHZENRVUZuUWl4RlFVTm9RaXhYUVVGWExFVkJRMWdzVjBGQlZ5eERRVU5hTEVOQlFVTTdkMEpCUTBZc1QwRkJUeXhMUVVGTExFTkJRVU03Y1VKQlEyUTdiMEpCUlVRc05FTkJRVFJETzI5Q1FVTTFReXhKUVVGSkxHTkJRV01zUlVGQlJUdDNRa0ZEYkVJc2RVSkJRWFZDTzNkQ1FVTjJRaXhYUVVGWExFZEJRVWNzWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03Y1VKQlEyaEVPM2xDUVVGTkxFbEJRVWtzVDBGQlR5eEpRVUZKTEZGQlFWRXNSVUZCUlR0M1FrRkRPVUlzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXp0M1FrRkRZaXhKUVVGSkxFMUJRVTBzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN05FSkJRemxDTEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGbEJRVmtzUlVGQlJUdG5RMEZEZUVNc1MwRkJTenMyUWtGRFRpeERRVUZETEVOQlFVTTdlVUpCUTBvN05rSkJRVTA3TkVKQlEwd3NZVUZCWVN4SFFVRkhMRXRCUVVzc1EwRkJRenQ1UWtGRGRrSTdkMEpCUTBRc1YwRkJWeXhIUVVGSExFdEJRVXNzUTBGQlF6dDNRa0ZEY0VJc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dHhRa0ZEWmp0NVFrRkJUVHQzUWtGRFRDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVTllMSGxDUVVGNVFpeEZRVU42UWl4VlFVRlZMRWRCUVVjc1IwRkJSeXhIUVVGSExGbEJRVmtzUlVGREwwSXNLMEpCUVN0Q0xFTkJRMmhETEVOQlFVTTdkMEpCUTBZc1VVRkJVU3hEUVVOT0xGVkJRVlVzUjBGQlJ5eEhRVUZITEVkQlFVY3NXVUZCV1N4RlFVTXZRaXhMUVVGTExFVkJRMHdzWVVGQllTeEZRVU5pTEZkQlFWY3NSVUZEV0N4WFFVRlhMRU5CUTFvc1EwRkJRenQzUWtGRFJpeFBRVUZQTEV0QlFVc3NRMEZCUXp0eFFrRkRaRHR2UWtGRlJDeFZRVUZWTzI5Q1FVTldMRkZCUVZFc1EwRkRUaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc1MwRkJTeXhGUVVOTUxFdEJRVXNzUlVGRFRDeFhRVUZYTEVWQlExZ3NWMEZCVnl4RFFVTmFMRU5CUVVNN2IwSkJSVVlzYlVKQlFXMUNPMjlDUVVOdVFpeFBRVUZQTEZkQlFWY3NRMEZCUXp0blFrRkRja0lzUTBGQlF5eERRVUZETzFsQlEwb3NRMEZCUXl4RFFVRkRMRVZCUVVVN1UwRkRUQ3hEUVVGRExFTkJRVU03U1VGRFRDeERRVUZETzBsQlJVUXNUMEZCVHp0UlFVTk1MR2RDUVVGblFqdFJRVU5vUWl4M1FrRkJkMEk3VVVGRGVFSXNhMEpCUVd0Q08xRkJRMnhDTEU5QlFVODdVVUZEVUN4UlFVRlJPMHRCUTFRc1EwRkJRenRCUVVOS0xFTkJRVU1pZlE9PSIsIi8qKlxuICogVGllcyB0b2dldGhlciB0aGUgdHdvIHNlcGFyYXRlIG5hdmlnYXRpb24gZXZlbnRzIHRoYXQgdG9nZXRoZXIgaG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgYm90aCBwYXJlbnQgZnJhbWUgaWQgYW5kIHRyYW5zaXRpb24tcmVsYXRlZCBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nTmF2aWdhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uQ29tbWl0dGVkRXZlbnROYXZpZ2F0aW9uID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbiA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbixcbiAgICAgICAgICAgIHRoaXMub25Db21taXR0ZWRFdmVudE5hdmlnYXRpb24sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKiBAcGFyYW0gbXNcbiAgICAgKi9cbiAgICBhc3luYyByZXNvbHZlZFdpdGhpblRpbWVvdXQobXMpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlZCgpLFxuICAgICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSksXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQ7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY0dWdVpHbHVaeTF1WVhacFoyRjBhVzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXdaVzVrYVc1bkxXNWhkbWxuWVhScGIyNHVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUlVFN08wZEJSVWM3UVVGRFNDeE5RVUZOTEU5QlFVOHNhVUpCUVdsQ08wbEJTelZDTzFGQlEwVXNTVUZCU1N4RFFVRkRMQ3RDUVVFclFpeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRek5FTEVsQlFVa3NRMEZCUXl4elEwRkJjME1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEZUVRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEpRVUZKTEVOQlFVTXNNRUpCUVRCQ0xFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRkRVFzU1VGQlNTeERRVUZETEdsRFFVRnBReXhIUVVGSExFOUJRVThzUTBGQlF6dFJRVU51UkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRFRTeFJRVUZSTzFGQlEySXNUMEZCVHl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRE8xbEJRMnBDTEVsQlFVa3NRMEZCUXl3clFrRkJLMEk3V1VGRGNFTXNTVUZCU1N4RFFVRkRMREJDUVVFd1FqdFRRVU5vUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJSVVE3T3pzN1QwRkpSenRKUVVOSkxFdEJRVXNzUTBGQlF5eHhRa0ZCY1VJc1EwRkJReXhGUVVGRk8xRkJRMjVETEUxQlFVMHNVVUZCVVN4SFFVRkhMRTFCUVUwc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF6dFpRVU5zUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRk8xbEJRMllzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMU5CUTJoRUxFTkJRVU1zUTBGQlF6dFJRVU5JTEU5QlFVOHNVVUZCVVN4RFFVRkRPMGxCUTJ4Q0xFTkJRVU03UTBGRFJpSjkiLCIvKipcbiAqIFRpZXMgdG9nZXRoZXIgdGhlIHR3byBzZXBhcmF0ZSBldmVudHMgdGhhdCB0b2dldGhlciBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCBib3RoIHJlcXVlc3QgaGVhZGVycyBhbmQgYm9keVxuICovXG5leHBvcnQgY2xhc3MgUGVuZGluZ1JlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWl0aGVyIHJldHVybnMgb3IgdGltZXMgb3V0IGFuZCByZXR1cm5zIHVuZGVmaW5lZCBvclxuICAgICAqIHJldHVybnMgdGhlIHJlc3VsdHMgZnJvbSByZXNvbHZlZCgpIGFib3ZlXG4gICAgICogQHBhcmFtIG1zXG4gICAgICovXG4gICAgYXN5bmMgcmVzb2x2ZWRXaXRoaW5UaW1lb3V0KG1zKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZWQoKSxcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxeVpYRjFaWE4wTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXdaVzVrYVc1bkxYSmxjWFZsYzNRdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJTMEU3TzBkQlJVYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1kwRkJZenRKUVdGNlFqdFJRVU5GTEVsQlFVa3NRMEZCUXl3eVFrRkJNa0lzUjBGQlJ5eEpRVUZKTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSVHRaUVVOMlJDeEpRVUZKTEVOQlFVTXNhME5CUVd0RExFZEJRVWNzVDBGQlR5eERRVUZETzFGQlEzQkVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzU1VGQlNTeERRVUZETEN0Q1FVRXJRaXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUXpORUxFbEJRVWtzUTBGQlF5eHpRMEZCYzBNc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGVFUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJRMDBzVVVGQlVUdFJRVU5pTEU5QlFVOHNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRaUVVOcVFpeEpRVUZKTEVOQlFVTXNNa0pCUVRKQ08xbEJRMmhETEVsQlFVa3NRMEZCUXl3clFrRkJLMEk3VTBGRGNrTXNRMEZCUXl4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTU3hMUVVGTExFTkJRVU1zY1VKQlFYRkNMRU5CUVVNc1JVRkJSVHRSUVVOdVF5eE5RVUZOTEZGQlFWRXNSMEZCUnl4TlFVRk5MRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRGJFTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSVHRaUVVObUxFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0VFFVTm9SQ3hEUVVGRExFTkJRVU03VVVGRFNDeFBRVUZQTEZGQlFWRXNRMEZCUXp0SlFVTnNRaXhEUVVGRE8wTkJRMFlpZlE9PSIsImltcG9ydCB7IFJlc3BvbnNlQm9keUxpc3RlbmVyIH0gZnJvbSBcIi4vcmVzcG9uc2UtYm9keS1saXN0ZW5lclwiO1xuLyoqXG4gKiBUaWVzIHRvZ2V0aGVyIHRoZSB0d28gc2VwYXJhdGUgZXZlbnRzIHRoYXQgdG9nZXRoZXIgaG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgYm90aCByZXNwb25zZSBoZWFkZXJzIGFuZCBib2R5XG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nUmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZWRFdmVudERldGFpbHMgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQ29tcGxldGVkRXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZFJlc3BvbnNlUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscykge1xuICAgICAgICB0aGlzLnJlc3BvbnNlQm9keUxpc3RlbmVyID0gbmV3IFJlc3BvbnNlQm9keUxpc3RlbmVyKGRldGFpbHMpO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlZEV2ZW50RGV0YWlscyxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVpdGhlciByZXR1cm5zIG9yIHRpbWVzIG91dCBhbmQgcmV0dXJucyB1bmRlZmluZWQgb3JcbiAgICAgKiByZXR1cm5zIHRoZSByZXN1bHRzIGZyb20gcmVzb2x2ZWQoKSBhYm92ZVxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKSxcbiAgICAgICAgXSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlZDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljR1Z1WkdsdVp5MXlaWE53YjI1elpTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2Y0dWdVpHbHVaeTF5WlhOd2IyNXpaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGSlFTeFBRVUZQTEVWQlFVVXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTd3dRa0ZCTUVJc1EwRkJRenRCUVVWb1JUczdSMEZGUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhsUVVGbE8wbEJZekZDTzFGQlEwVXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRM1pFTEVsQlFVa3NRMEZCUXl4clEwRkJhME1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEY0VRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEpRVUZKTEVOQlFVTXNkVUpCUVhWQ0xFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRia1FzU1VGQlNTeERRVUZETERoQ1FVRTRRaXhIUVVGSExFOUJRVThzUTBGQlF6dFJRVU5vUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRFRTd3JRa0ZCSzBJc1EwRkRjRU1zVDBGQk9FTTdVVUZGT1VNc1NVRkJTU3hEUVVGRExHOUNRVUZ2UWl4SFFVRkhMRWxCUVVrc2IwSkJRVzlDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzUTBGQlF6dEpRVU5OTEZGQlFWRTdVVUZEWWl4UFFVRlBMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU03V1VGRGFrSXNTVUZCU1N4RFFVRkRMREpDUVVFeVFqdFpRVU5vUXl4SlFVRkpMRU5CUVVNc2RVSkJRWFZDTzFOQlF6ZENMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRlJEczdPenRQUVVsSE8wbEJRMGtzUzBGQlN5eERRVUZETEhGQ1FVRnhRaXhEUVVGRExFVkJRVVU3VVVGRGJrTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1RVRkJUU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETzFsQlEyeERMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVU3V1VGRFppeEpRVUZKTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSU3hEUVVGRExGVkJRVlVzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkRhRVFzUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4UlFVRlJMRU5CUVVNN1NVRkRiRUlzUTBGQlF6dERRVU5HSW4wPSIsImltcG9ydCB7IHNoYTI1NkJ1ZmZlciB9IGZyb20gXCIuL3NoYTI1NlwiO1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlQm9keUxpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXRhaWxzKSB7XG4gICAgICAgIHRoaXMucmVzcG9uc2VCb2R5ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVSZXNwb25zZUJvZHkgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250ZW50SGFzaCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlQ29udGVudEhhc2ggPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVXNlZCB0byBwYXJzZSBSZXNwb25zZSBzdHJlYW1cbiAgICAgICAgY29uc3QgZmlsdGVyID0gYnJvd3Nlci53ZWJSZXF1ZXN0LmZpbHRlclJlc3BvbnNlRGF0YShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKTtcbiAgICAgICAgLy8gY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgICAgICBsZXQgcmVzcG9uc2VCb2R5ID0gXCJcIjtcbiAgICAgICAgZmlsdGVyLm9uZGF0YSA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHNoYTI1NkJ1ZmZlcihldmVudC5kYXRhKS50aGVuKGRpZ2VzdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlQ29udGVudEhhc2goZGlnZXN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qgc3RyID0gZGVjb2Rlci5kZWNvZGUoZXZlbnQuZGF0YSwgeyBzdHJlYW06IHRydWUgfSk7XG4gICAgICAgICAgICByZXNwb25zZUJvZHkgPSByZXNwb25zZUJvZHkgKyBzdHI7XG4gICAgICAgICAgICAvLyBwYXNzIHRocm91Z2ggYWxsIHRoZSByZXNwb25zZSBkYXRhXG4gICAgICAgICAgICBmaWx0ZXIud3JpdGUoZXZlbnQuZGF0YSk7XG4gICAgICAgIH07XG4gICAgICAgIGZpbHRlci5vbnN0b3AgPSBfZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUmVzcG9uc2VCb2R5KHJlc3BvbnNlQm9keSk7XG4gICAgICAgICAgICBmaWx0ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBnZXRSZXNwb25zZUJvZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3BvbnNlQm9keTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0Q29udGVudEhhc2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRIYXNoO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNtVnpjRzl1YzJVdFltOWtlUzFzYVhOMFpXNWxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTlzYVdJdmNtVnpjRzl1YzJVdFltOWtlUzFzYVhOMFpXNWxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGRFFTeFBRVUZQTEVWQlFVVXNXVUZCV1N4RlFVRkZMRTFCUVUwc1ZVRkJWU3hEUVVGRE8wRkJSWGhETEUxQlFVMHNUMEZCVHl4dlFrRkJiMEk3U1VGTkwwSXNXVUZCV1N4UFFVRTRRenRSUVVONFJDeEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlEzaERMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRja01zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4SlFVRkpMRU5CUVVNc1YwRkJWeXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTNaRExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGNFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZTQ3huUTBGQlowTTdVVUZEYUVNc1RVRkJUU3hOUVVGTkxFZEJRVkVzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4clFrRkJhMElzUTBGRGRrUXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkRXQ3hEUVVGRE8xRkJSVlFzVFVGQlRTeFBRVUZQTEVkQlFVY3NTVUZCU1N4WFFVRlhMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGVrTXNjVU5CUVhGRE8xRkJSWEpETEVsQlFVa3NXVUZCV1N4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOMFFpeE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRXRCUVVzc1EwRkJReXhGUVVGRk8xbEJRM1JDTEZsQlFWa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZPMmRDUVVOeVF5eEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdXVUZEYkVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeE5RVUZOTEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVWQlFVVXNSVUZCUlN4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU42UkN4WlFVRlpMRWRCUVVjc1dVRkJXU3hIUVVGSExFZEJRVWNzUTBGQlF6dFpRVU5zUXl4eFEwRkJjVU03V1VGRGNrTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBJc1EwRkJReXhEUVVGRE8xRkJSVVlzVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4TlFVRk5MRU5CUVVNc1JVRkJSVHRaUVVOMlFpeEpRVUZKTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTTdXVUZEZGtNc1RVRkJUU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzFGQlEzUkNMRU5CUVVNc1EwRkJRenRKUVVOS0xFTkJRVU03U1VGRlRTeExRVUZMTEVOQlFVTXNaVUZCWlR0UlFVTXhRaXhQUVVGUExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTTdTVUZETTBJc1EwRkJRenRKUVVWTkxFdEJRVXNzUTBGQlF5eGpRVUZqTzFGQlEzcENMRTlCUVU4c1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dEpRVU14UWl4RFFVRkRPME5CUTBZaWZRPT0iLCIvKipcbiAqIENvZGUgb3JpZ2luYWxseSBmcm9tIHRoZSBleGFtcGxlIGF0XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU3VidGxlQ3J5cHRvL2RpZ2VzdFxuICpcbiAqIE5vdGU6IFVzaW5nIFNIQTI1NiBpbnN0ZWFkIG9mIHRoZSBwcmV2aW91c2x5IHVzZWQgTUQ1IGR1ZSB0b1xuICogdGhlIGZvbGxvd2luZyBjb21tZW50IGZvdW5kIGF0IHRoZSBkb2N1bWVudGF0aW9uIHBhZ2UgbGlua2VkIGFib3ZlOlxuICpcbiAqIFdhcm5pbmc6IE9sZGVyIGluc2VjdXJlIGhhc2ggZnVuY3Rpb25zLCBsaWtlIE1ENSwgYXJlIG5vdCBzdXBwb3J0ZWRcbiAqIGJ5IHRoaXMgbWV0aG9kLiBFdmVuIGEgc3VwcG9ydGVkIG1ldGhvZCwgU0hBLTEsIGlzIGNvbnNpZGVyZWQgd2VhayxcbiAqIGhhcyBiZWVuIGJyb2tlbiBhbmQgc2hvdWxkIGJlIGF2b2lkZWQgZm9yIGNyeXB0b2dyYXBoaWMgYXBwbGljYXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hhMjU2KHN0cikge1xuICAgIC8vIFdlIHRyYW5zZm9ybSB0aGUgc3RyaW5nIGludG8gYW4gYXJyYXlidWZmZXIuXG4gICAgY29uc3QgYnVmZmVyID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHN0cik7XG4gICAgcmV0dXJuIHNoYTI1NkJ1ZmZlcihidWZmZXIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNoYTI1NkJ1ZmZlcihidWZmZXIpIHtcbiAgICByZXR1cm4gY3J5cHRvLnN1YnRsZS5kaWdlc3QoXCJTSEEtMjU2XCIsIGJ1ZmZlcikudGhlbihmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICByZXR1cm4gaGV4KGhhc2gpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gaGV4KGJ1ZmZlcikge1xuICAgIGNvbnN0IGhleENvZGVzID0gW107XG4gICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlldy5ieXRlTGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgLy8gVXNpbmcgZ2V0VWludDMyIHJlZHVjZXMgdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIG5lZWRlZCAod2UgcHJvY2VzcyA0IGJ5dGVzIGVhY2ggdGltZSlcbiAgICAgICAgY29uc3QgdmFsdWUgPSB2aWV3LmdldFVpbnQzMihpKTtcbiAgICAgICAgLy8gdG9TdHJpbmcoMTYpIHdpbGwgZ2l2ZSB0aGUgaGV4IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIgd2l0aG91dCBwYWRkaW5nXG4gICAgICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoMTYpO1xuICAgICAgICAvLyBXZSB1c2UgY29uY2F0ZW5hdGlvbiBhbmQgc2xpY2UgZm9yIHBhZGRpbmdcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IFwiMDAwMDAwMDBcIjtcbiAgICAgICAgY29uc3QgcGFkZGVkVmFsdWUgPSAocGFkZGluZyArIHN0cmluZ1ZhbHVlKS5zbGljZSgtcGFkZGluZy5sZW5ndGgpO1xuICAgICAgICBoZXhDb2Rlcy5wdXNoKHBhZGRlZFZhbHVlKTtcbiAgICB9XG4gICAgLy8gSm9pbiBhbGwgdGhlIGhleCBzdHJpbmdzIGludG8gb25lXG4gICAgcmV0dXJuIGhleENvZGVzLmpvaW4oXCJcIik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMmhoTWpVMkxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTl6YUdFeU5UWXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdPenM3T3pzN1IwRlZSenRCUVVWSUxFMUJRVTBzVlVGQlZTeE5RVUZOTEVOQlFVTXNSMEZCUnp0SlFVTjRRaXdyUTBGQkswTTdTVUZETDBNc1RVRkJUU3hOUVVGTkxFZEJRVWNzU1VGQlNTeFhRVUZYTEVWQlFVVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03U1VGRE4wTXNUMEZCVHl4WlFVRlpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03UVVGRE9VSXNRMEZCUXp0QlFVVkVMRTFCUVUwc1ZVRkJWU3haUVVGWkxFTkJRVU1zVFVGQlRUdEpRVU5xUXl4UFFVRlBMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlV5eEpRVUZKTzFGQlF5OUVMRTlCUVU4c1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBsQlEyNUNMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRMHdzUTBGQlF6dEJRVVZFTEZOQlFWTXNSMEZCUnl4RFFVRkRMRTFCUVUwN1NVRkRha0lzVFVGQlRTeFJRVUZSTEVkQlFVY3NSVUZCUlN4RFFVRkRPMGxCUTNCQ0xFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRE8wbEJRMnhETEV0QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3VVVGRE0wTXNlVVpCUVhsR08xRkJRM3BHTEUxQlFVMHNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYUVNc09FVkJRVGhGTzFGQlF6bEZMRTFCUVUwc1YwRkJWeXhIUVVGSExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRka01zTmtOQlFUWkRPMUZCUXpkRExFMUJRVTBzVDBGQlR5eEhRVUZITEZWQlFWVXNRMEZCUXp0UlFVTXpRaXhOUVVGTkxGZEJRVmNzUjBGQlJ5eERRVUZETEU5QlFVOHNSMEZCUnl4WFFVRlhMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRia1VzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRMUVVNMVFqdEpRVVZFTEc5RFFVRnZRenRKUVVOd1F5eFBRVUZQTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03UVVGRE0wSXNRMEZCUXlKOSIsImV4cG9ydCBmdW5jdGlvbiBlbmNvZGVfdXRmOChzKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzKSk7XG59XG5leHBvcnQgY29uc3QgZXNjYXBlU3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICAgIC8vIENvbnZlcnQgdG8gc3RyaW5nIGlmIG5lY2Vzc2FyeVxuICAgIGlmICh0eXBlb2Ygc3RyICE9IFwic3RyaW5nXCIpIHtcbiAgICAgICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVfdXRmOChzdHIpO1xufTtcbmV4cG9ydCBjb25zdCBlc2NhcGVVcmwgPSBmdW5jdGlvbiAodXJsLCBzdHJpcERhdGFVcmxEYXRhID0gdHJ1ZSkge1xuICAgIHVybCA9IGVzY2FwZVN0cmluZyh1cmwpO1xuICAgIC8vIGRhdGE6WzxtZWRpYXR5cGU+XVs7YmFzZTY0XSw8ZGF0YT5cbiAgICBpZiAodXJsLnN1YnN0cigwLCA1KSA9PT0gXCJkYXRhOlwiICYmXG4gICAgICAgIHN0cmlwRGF0YVVybERhdGEgJiZcbiAgICAgICAgdXJsLmluZGV4T2YoXCIsXCIpID4gLTEpIHtcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cigwLCB1cmwuaW5kZXhPZihcIixcIikgKyAxKSArIFwiPGRhdGEtc3RyaXBwZWQ+XCI7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG59O1xuZXhwb3J0IGNvbnN0IGJvb2xUb0ludCA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgcmV0dXJuIGJvb2wgPyAxIDogMDtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljM1J5YVc1bkxYVjBhV3h6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXpkSEpwYm1jdGRYUnBiSE11ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRXNUVUZCVFN4VlFVRlZMRmRCUVZjc1EwRkJReXhEUVVGRE8wbEJRek5DTEU5QlFVOHNVVUZCVVN4RFFVRkRMR3RDUVVGclFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRla01zUTBGQlF6dEJRVVZFTEUxQlFVMHNRMEZCUXl4TlFVRk5MRmxCUVZrc1IwRkJSeXhWUVVGVExFZEJRVkU3U1VGRE0wTXNhVU5CUVdsRE8wbEJRMnBETEVsQlFVa3NUMEZCVHl4SFFVRkhMRWxCUVVrc1VVRkJVU3hGUVVGRk8xRkJRekZDTEVkQlFVY3NSMEZCUnl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03UzBGRGJrSTdTVUZGUkN4UFFVRlBMRmRCUVZjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEJRVU14UWl4RFFVRkRMRU5CUVVNN1FVRkZSaXhOUVVGTkxFTkJRVU1zVFVGQlRTeFRRVUZUTEVkQlFVY3NWVUZEZGtJc1IwRkJWeXhGUVVOWUxHMUNRVUUwUWl4SlFVRkpPMGxCUldoRExFZEJRVWNzUjBGQlJ5eFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRlRUlzY1VOQlFYRkRPMGxCUTNKRExFbEJRMFVzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzVDBGQlR6dFJRVU0xUWl4blFrRkJaMEk3VVVGRGFFSXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZEY2tJN1VVRkRRU3hIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRVZCUVVVc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhwUWtGQmFVSXNRMEZCUXp0TFFVTXZSRHRKUVVORUxFOUJRVThzUjBGQlJ5eERRVUZETzBGQlEySXNRMEZCUXl4RFFVRkRPMEZCUlVZc1RVRkJUU3hEUVVGRExFMUJRVTBzVTBGQlV5eEhRVUZITEZWQlFWTXNTVUZCWVR0SlFVTTNReXhQUVVGUExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGRFSXNRMEZCUXl4RFFVRkRJbjA9IiwiLyogdHNsaW50OmRpc2FibGU6bm8tYml0d2lzZSAqL1xuLy8gZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzI2dpc3Rjb21tZW50LTI0MDMzNjlcbmNvbnN0IGhleCA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgIGhleFtpXSA9IChpIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgaS50b1N0cmluZygxNik7XG59XG5leHBvcnQgY29uc3QgbWFrZVVVSUQgPSAoKSA9PiB7XG4gICAgY29uc3QgciA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTYpKTtcbiAgICByWzZdID0gKHJbNl0gJiAweDBmKSB8IDB4NDA7XG4gICAgcls4XSA9IChyWzhdICYgMHgzZikgfCAweDgwO1xuICAgIHJldHVybiAoaGV4W3JbMF1dICtcbiAgICAgICAgaGV4W3JbMV1dICtcbiAgICAgICAgaGV4W3JbMl1dICtcbiAgICAgICAgaGV4W3JbM11dICtcbiAgICAgICAgXCItXCIgK1xuICAgICAgICBoZXhbcls0XV0gK1xuICAgICAgICBoZXhbcls1XV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzZdXSArXG4gICAgICAgIGhleFtyWzddXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbOF1dICtcbiAgICAgICAgaGV4W3JbOV1dICtcbiAgICAgICAgXCItXCIgK1xuICAgICAgICBoZXhbclsxMF1dICtcbiAgICAgICAgaGV4W3JbMTFdXSArXG4gICAgICAgIGhleFtyWzEyXV0gK1xuICAgICAgICBoZXhbclsxM11dICtcbiAgICAgICAgaGV4W3JbMTRdXSArXG4gICAgICAgIGhleFtyWzE1XV0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWRYVnBaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTlzYVdJdmRYVnBaQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTd3JRa0ZCSzBJN1FVRkZMMElzT0VSQlFUaEVPMEZCUXpsRUxFMUJRVTBzUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXp0QlFVVm1MRXRCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3U1VGRE5VSXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzBOQlF5OURPMEZCUlVRc1RVRkJUU3hEUVVGRExFMUJRVTBzVVVGQlVTeEhRVUZITEVkQlFVY3NSVUZCUlR0SlFVTXpRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNaVUZCWlN4RFFVRkRMRWxCUVVrc1ZVRkJWU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZGY2tRc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTTFRaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRPMGxCUlRWQ0xFOUJRVThzUTBGRFRDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOVUxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRWQ3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFRc1IwRkJSenRSUVVOSUxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRWQ3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFRc1IwRkJSenRSUVVOSUxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRWQ3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFRc1IwRkJSenRSUVVOSUxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRWQ3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFRc1IwRkJSenRSUVVOSUxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRWaXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTFZc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTldMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEVml4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlExWXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVU5ZTEVOQlFVTTdRVUZEU2l4RFFVRkRMRU5CUVVNaWZRPT0iLCIvLyBodHRwczovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS1kYXRlcy5odG1sI0RhdGVfRmllbGRfU3ltYm9sX1RhYmxlXG5leHBvcnQgY29uc3QgZGF0ZVRpbWVVbmljb2RlRm9ybWF0U3RyaW5nID0gXCJ5eXl5LU1NLWRkJ1QnSEg6bW06c3MuU1NTWFhcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWMyTm9aVzFoTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM05qYUdWdFlTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZKUVN3clJVRkJLMFU3UVVGREwwVXNUVUZCVFN4RFFVRkRMRTFCUVUwc01rSkJRVEpDTEVkQlFVY3NOa0pCUVRaQ0xFTkJRVU1pZlE9PSJdLCJzb3VyY2VSb290IjoiIn0=