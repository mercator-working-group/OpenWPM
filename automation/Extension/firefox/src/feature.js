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
/******/ 	return __webpack_require__(__webpack_require__.s = "./feature.js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./feature.js/index.js":
/*!*****************************!*\
  !*** ./feature.js/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openwpm-webext-instrumentation */ "./node_modules/openwpm-webext-instrumentation/build/module/index.js");
/* harmony import */ var _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loggingdb.js */ "./feature.js/loggingdb.js");




async function main() {
  // Read the browser configuration from file
  let filename = "browser_params.json";
  let config = await browser.profileDirIO.readFile(filename);
  if (config) {
    config = JSON.parse(config);
    console.log("Browser Config:", config);
  } else {
    console.log("WARNING: config not found. Assuming this is a test run of",
                "the extension. Outputting all queries to console.");
    config = {
      navigation_instrument:false,
      cookie_instrument:false,
      js_instrument:true,
      http_instrument:false,
      save_javascript:false,
      save_all_content:false,
      crawl_id:0
    };
  }

  await _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["open"](config['aggregator_address'],
                       config['logger_address'],
                       config['crawl_id']);

  if (config["navigation_instrument"]) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("Navigation instrumentation enabled");
    let navigationInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["NavigationInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    navigationInstrument.run(config["crawl_id"]);
  }

  if (config['cookie_instrument']) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("Cookie instrumentation enabled");
    let cookieInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["CookieInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    cookieInstrument.run(config['crawl_id']);
  }

  if (config['js_instrument']) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("Javascript instrumentation enabled");
    let jsInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["JavascriptInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    jsInstrument.run(config['crawl_id']);
  }

  if (config['http_instrument']) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("HTTP Instrumentation enabled");
    let httpInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["HttpInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    httpInstrument.run(config['crawl_id'],
                       config['save_javascript'],
                       config['save_all_content']);
  }
}

main();


/***/ }),

/***/ "./feature.js/loggingdb.js":
/*!*********************************!*\
  !*** ./feature.js/loggingdb.js ***!
  \*********************************/
/*! exports provided: open, close, logInfo, logDebug, logWarn, logError, logCritical, dataReceiver, saveRecord, saveContent, escapeString, boolToInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logInfo", function() { return logInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logDebug", function() { return logDebug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logWarn", function() { return logWarn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logError", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logCritical", function() { return logCritical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataReceiver", function() { return dataReceiver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveRecord", function() { return saveRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveContent", function() { return saveContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeString", function() { return escapeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boolToInt", function() { return boolToInt; });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./feature.js/socket.js");


let crawlID = null;
let visitID = null;
let debugging = false;
let dataAggregator = null;
let logAggregator = null;
let listeningSocket = null;

let open = async function(aggregatorAddress, logAddress, curr_crawlID) {
    if (aggregatorAddress == null && logAddress == null && curr_crawlID == '') {
        console.log("Debugging, everything will output to console");
        debugging = true;
        return;
    }
    crawlID = curr_crawlID;

    console.log("Opening socket connections...");

    // Connect to MPLogger for extension info/debug/error logging
    if (logAddress != null) {
        logAggregator = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["SendingSocket"]();
        let rv = await logAggregator.connect(logAddress[0], logAddress[1]);
        console.log("logSocket started?", rv)
    }

    // Connect to databases for saving data
    if (aggregatorAddress != null) {
        dataAggregator = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["SendingSocket"]();
        let rv = await dataAggregator.connect(aggregatorAddress[0], aggregatorAddress[1]);
        console.log("sqliteSocket started?",rv);
    }

    // Listen for incomming urls as visit ids
    listeningSocket = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["ListeningSocket"]();
    console.log("Starting socket listening for incomming connections.");
    listeningSocket.startListening().then(() => {
        browser.profileDirIO.writeFile("extension_port.txt", `${listeningSocket.port}`);
    });
};

let close = function() {
    if (dataAggregator != null) {
        dataAggregator.close();
    }
    if (logAggregator != null) {
        logAggregator.close();
    }
};

let makeLogJSON = function(lvl, msg) {
    var log_json = {
        'name': 'Extension-Logger',
        'level': lvl,
        'pathname': 'FirefoxExtension',
        'lineno': 1,
        'msg': escapeString(msg),
        'args': null,
        'exc_info': null,
        'func': null
    }
    return log_json;
}

let logInfo = function(msg) {
    // Always log to browser console
    console.log(msg);

    if (debugging) {
        return;
    }

    // Log level INFO == 20 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(20, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logDebug = function(msg) {
    // Always log to browser console
    console.log(msg);

    if (debugging) {
        return;
    }

    // Log level DEBUG == 10 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(10, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logWarn = function(msg) {
    // Always log to browser console
    console.warn(msg);

    if (debugging) {
        return;
    }

    // Log level WARN == 30 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(30, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logError = function(msg) {
    // Always log to browser console
    console.error(msg);

    if (debugging) {
        return;
    }

    // Log level INFO == 40 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(40, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logCritical = function(msg) {
    // Always log to browser console
    console.error(msg);

    if (debugging) {
        return;
    }

    // Log level CRITICAL == 50 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(50, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let dataReceiver = {
    saveRecord(a, b) {
        console.log(b);
    },
};

let saveRecord = function(instrument, record) {
    // Add visit id if changed
    while (!debugging && listeningSocket.queue.length != 0) {
        visitID = listeningSocket.queue.shift();
        logDebug("Visit Id: " + visitID);
    }
    record["visit_id"] = visitID;


    if (!visitID && !debugging) {
        logCritical('Extension-' + crawlID + ' : visitID is null while attempting to insert ' +
                    JSON.stringify(record));
        record["visit_id"] = -1;
    }

    // send to console if debugging
    if (debugging) {
      console.log("EXTENSION", instrument, JSON.stringify(record), record);
      return;
    }
    dataAggregator.send(JSON.stringify([instrument, record]));
};

// Stub for now
let saveContent = async function(content, contentHash) {
  // Send page content to the data aggregator
  // deduplicated by contentHash in a levelDB database
  if (debugging) {
    console.log("LDB contentHash:",contentHash,"with length",content.length);
    return;
  }
  dataAggregator.send(JSON.stringify(['page_content', [content, contentHash]]));
};

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

let escapeString = function(string) {
    // Convert to string if necessary
    if(typeof string != "string")
        string = "" + string;

    return encode_utf8(string);
};

let boolToInt = function(bool) {
    return bool ? 1 : 0;
};


/***/ }),

/***/ "./feature.js/socket.js":
/*!******************************!*\
  !*** ./feature.js/socket.js ***!
  \******************************/
/*! exports provided: ListeningSocket, SendingSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListeningSocket", function() { return ListeningSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendingSocket", function() { return SendingSocket; });
let DataReceiver = {
  callbacks: new Map(),
  onDataReceived: (aSocketId, aData, aJSON) => {
    if (!DataReceiver.callbacks.has(aSocketId)) {
      return;
    }
    if (aJSON) {
      aData = JSON.parse(aData);
    }
    DataReceiver.callbacks.get(aSocketId)._updateQueue(aData);
  },
};

browser.sockets.onDataReceived.addListener(DataReceiver.onDataReceived);

let ListeningSockets = new Map();

class ListeningSocket {
  constructor() {
    this.queue = []; // stores messages sent to socket
  }

  async startListening() {
    this.port = await browser.sockets.createServerSocket();
    DataReceiver.callbacks.set(this.port, this);
    browser.sockets.startListening(this.port);
    console.log('Listening on port ' + this.port);
  }

  _updateQueue(data) {
    this.queue.push(data);
  }
}

class SendingSocket {
  constructor() {
  }

  async connect(host, port) {
    this.id = await browser.sockets.createSendingSocket();
    browser.sockets.connect(this.id, host, port);
    console.log(`Connected to ${host}:${port}`);
  }

  send(aData, aJSON=true) {
    try {
      browser.sockets.sendData(this.id, aData, !!aJSON);
      return true;
    } catch (err) {
      console.error(err,err.message);
      return false;
    }
  }

  close() {
    browser.sockets.close(this.id);
  }
}



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZmVhdHVyZS5qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9mZWF0dXJlLmpzL2xvZ2dpbmdkYi5qcyIsIndlYnBhY2s6Ly8vLi9mZWF0dXJlLmpzL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9iYWNrZ3JvdW5kL2Nvb2tpZS1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvaHR0cC1wb3N0LXBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvaW5zdHJ1bWVudC1maW5nZXJwcmludGluZy1hcGlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9qcy1pbnN0cnVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvcGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3BlbmRpbmctcmVzcG9uc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3Jlc3BvbnNlLWJvZHktbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3BlbndwbS13ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvc3RyaW5nLXV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi91dWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcGVud3BtLXdlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL3NjaGVtYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUt3Qzs7QUFFSTs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsa0RBQWM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBLElBQUksc0RBQWtCO0FBQ3RCLG1DQUFtQyxtRkFBb0IsQ0FBQywwQ0FBUztBQUNqRTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxzREFBa0I7QUFDdEIsK0JBQStCLCtFQUFnQixDQUFDLDBDQUFTO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHNEQUFrQjtBQUN0QiwyQkFBMkIsbUZBQW9CLENBQUMsMENBQVM7QUFDekQ7QUFDQTs7QUFFQTtBQUNBLElBQUksc0RBQWtCO0FBQ3RCLDZCQUE2Qiw2RUFBYyxDQUFDLDBDQUFTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsd0RBQW9CO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLHdEQUFvQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsMERBQXNCO0FBQ2hEO0FBQ0E7QUFDQSxnRUFBZ0UscUJBQXFCO0FBQ3JGLEtBQUs7QUFDTDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVPO0FBQ1A7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSyxHQUFHLEtBQUs7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpRjtBQUNaO0FBQ1A7QUFDdkQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkZBQTZGLHFCQUFxQjtBQUNsSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywrNkg7Ozs7Ozs7Ozs7OztBQ2xHM0M7QUFBQTtBQUFBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwyQkFBMkIsOEJBQThCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Ozs7Ozs7QUN2QjNDO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDJ6RDs7Ozs7Ozs7Ozs7O0FDL0IzQztBQUFBO0FBQUE7QUFDTztBQUNQLDJDQUEyQyxtTyIsImZpbGUiOiJmZWF0dXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9mZWF0dXJlLmpzL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHtcbiAgQ29va2llSW5zdHJ1bWVudCxcbiAgSmF2YXNjcmlwdEluc3RydW1lbnQsXG4gIEh0dHBJbnN0cnVtZW50LFxuICBOYXZpZ2F0aW9uSW5zdHJ1bWVudCxcbn0gZnJvbSBcIm9wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvblwiO1xuXG5pbXBvcnQgKiBhcyBsb2dnaW5nREIgZnJvbSBcIi4vbG9nZ2luZ2RiLmpzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIC8vIFJlYWQgdGhlIGJyb3dzZXIgY29uZmlndXJhdGlvbiBmcm9tIGZpbGVcbiAgbGV0IGZpbGVuYW1lID0gXCJicm93c2VyX3BhcmFtcy5qc29uXCI7XG4gIGxldCBjb25maWcgPSBhd2FpdCBicm93c2VyLnByb2ZpbGVEaXJJTy5yZWFkRmlsZShmaWxlbmFtZSk7XG4gIGlmIChjb25maWcpIHtcbiAgICBjb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZyk7XG4gICAgY29uc29sZS5sb2coXCJCcm93c2VyIENvbmZpZzpcIiwgY29uZmlnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IGNvbmZpZyBub3QgZm91bmQuIEFzc3VtaW5nIHRoaXMgaXMgYSB0ZXN0IHJ1biBvZlwiLFxuICAgICAgICAgICAgICAgIFwidGhlIGV4dGVuc2lvbi4gT3V0cHV0dGluZyBhbGwgcXVlcmllcyB0byBjb25zb2xlLlwiKTtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uX2luc3RydW1lbnQ6ZmFsc2UsXG4gICAgICBjb29raWVfaW5zdHJ1bWVudDpmYWxzZSxcbiAgICAgIGpzX2luc3RydW1lbnQ6dHJ1ZSxcbiAgICAgIGh0dHBfaW5zdHJ1bWVudDpmYWxzZSxcbiAgICAgIHNhdmVfamF2YXNjcmlwdDpmYWxzZSxcbiAgICAgIHNhdmVfYWxsX2NvbnRlbnQ6ZmFsc2UsXG4gICAgICBjcmF3bF9pZDowXG4gICAgfTtcbiAgfVxuXG4gIGF3YWl0IGxvZ2dpbmdEQi5vcGVuKGNvbmZpZ1snYWdncmVnYXRvcl9hZGRyZXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snbG9nZ2VyX2FkZHJlc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydjcmF3bF9pZCddKTtcblxuICBpZiAoY29uZmlnW1wibmF2aWdhdGlvbl9pbnN0cnVtZW50XCJdKSB7XG4gICAgbG9nZ2luZ0RCLmxvZ0RlYnVnKFwiTmF2aWdhdGlvbiBpbnN0cnVtZW50YXRpb24gZW5hYmxlZFwiKTtcbiAgICBsZXQgbmF2aWdhdGlvbkluc3RydW1lbnQgPSBuZXcgTmF2aWdhdGlvbkluc3RydW1lbnQobG9nZ2luZ0RCKTtcbiAgICBuYXZpZ2F0aW9uSW5zdHJ1bWVudC5ydW4oY29uZmlnW1wiY3Jhd2xfaWRcIl0pO1xuICB9XG5cbiAgaWYgKGNvbmZpZ1snY29va2llX2luc3RydW1lbnQnXSkge1xuICAgIGxvZ2dpbmdEQi5sb2dEZWJ1ZyhcIkNvb2tpZSBpbnN0cnVtZW50YXRpb24gZW5hYmxlZFwiKTtcbiAgICBsZXQgY29va2llSW5zdHJ1bWVudCA9IG5ldyBDb29raWVJbnN0cnVtZW50KGxvZ2dpbmdEQik7XG4gICAgY29va2llSW5zdHJ1bWVudC5ydW4oY29uZmlnWydjcmF3bF9pZCddKTtcbiAgfVxuXG4gIGlmIChjb25maWdbJ2pzX2luc3RydW1lbnQnXSkge1xuICAgIGxvZ2dpbmdEQi5sb2dEZWJ1ZyhcIkphdmFzY3JpcHQgaW5zdHJ1bWVudGF0aW9uIGVuYWJsZWRcIik7XG4gICAgbGV0IGpzSW5zdHJ1bWVudCA9IG5ldyBKYXZhc2NyaXB0SW5zdHJ1bWVudChsb2dnaW5nREIpO1xuICAgIGpzSW5zdHJ1bWVudC5ydW4oY29uZmlnWydjcmF3bF9pZCddKTtcbiAgfVxuXG4gIGlmIChjb25maWdbJ2h0dHBfaW5zdHJ1bWVudCddKSB7XG4gICAgbG9nZ2luZ0RCLmxvZ0RlYnVnKFwiSFRUUCBJbnN0cnVtZW50YXRpb24gZW5hYmxlZFwiKTtcbiAgICBsZXQgaHR0cEluc3RydW1lbnQgPSBuZXcgSHR0cEluc3RydW1lbnQobG9nZ2luZ0RCKTtcbiAgICBodHRwSW5zdHJ1bWVudC5ydW4oY29uZmlnWydjcmF3bF9pZCddLFxuICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ3NhdmVfamF2YXNjcmlwdCddLFxuICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ3NhdmVfYWxsX2NvbnRlbnQnXSk7XG4gIH1cbn1cblxubWFpbigpO1xuIiwiaW1wb3J0ICogYXMgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuXG5sZXQgY3Jhd2xJRCA9IG51bGw7XG5sZXQgdmlzaXRJRCA9IG51bGw7XG5sZXQgZGVidWdnaW5nID0gZmFsc2U7XG5sZXQgZGF0YUFnZ3JlZ2F0b3IgPSBudWxsO1xubGV0IGxvZ0FnZ3JlZ2F0b3IgPSBudWxsO1xubGV0IGxpc3RlbmluZ1NvY2tldCA9IG51bGw7XG5cbmV4cG9ydCBsZXQgb3BlbiA9IGFzeW5jIGZ1bmN0aW9uKGFnZ3JlZ2F0b3JBZGRyZXNzLCBsb2dBZGRyZXNzLCBjdXJyX2NyYXdsSUQpIHtcbiAgICBpZiAoYWdncmVnYXRvckFkZHJlc3MgPT0gbnVsbCAmJiBsb2dBZGRyZXNzID09IG51bGwgJiYgY3Vycl9jcmF3bElEID09ICcnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnaW5nLCBldmVyeXRoaW5nIHdpbGwgb3V0cHV0IHRvIGNvbnNvbGVcIik7XG4gICAgICAgIGRlYnVnZ2luZyA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3Jhd2xJRCA9IGN1cnJfY3Jhd2xJRDtcblxuICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBzb2NrZXQgY29ubmVjdGlvbnMuLi5cIik7XG5cbiAgICAvLyBDb25uZWN0IHRvIE1QTG9nZ2VyIGZvciBleHRlbnNpb24gaW5mby9kZWJ1Zy9lcnJvciBsb2dnaW5nXG4gICAgaWYgKGxvZ0FkZHJlc3MgIT0gbnVsbCkge1xuICAgICAgICBsb2dBZ2dyZWdhdG9yID0gbmV3IHNvY2tldC5TZW5kaW5nU29ja2V0KCk7XG4gICAgICAgIGxldCBydiA9IGF3YWl0IGxvZ0FnZ3JlZ2F0b3IuY29ubmVjdChsb2dBZGRyZXNzWzBdLCBsb2dBZGRyZXNzWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dTb2NrZXQgc3RhcnRlZD9cIiwgcnYpXG4gICAgfVxuXG4gICAgLy8gQ29ubmVjdCB0byBkYXRhYmFzZXMgZm9yIHNhdmluZyBkYXRhXG4gICAgaWYgKGFnZ3JlZ2F0b3JBZGRyZXNzICE9IG51bGwpIHtcbiAgICAgICAgZGF0YUFnZ3JlZ2F0b3IgPSBuZXcgc29ja2V0LlNlbmRpbmdTb2NrZXQoKTtcbiAgICAgICAgbGV0IHJ2ID0gYXdhaXQgZGF0YUFnZ3JlZ2F0b3IuY29ubmVjdChhZ2dyZWdhdG9yQWRkcmVzc1swXSwgYWdncmVnYXRvckFkZHJlc3NbMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNxbGl0ZVNvY2tldCBzdGFydGVkP1wiLHJ2KTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW4gZm9yIGluY29tbWluZyB1cmxzIGFzIHZpc2l0IGlkc1xuICAgIGxpc3RlbmluZ1NvY2tldCA9IG5ldyBzb2NrZXQuTGlzdGVuaW5nU29ja2V0KCk7XG4gICAgY29uc29sZS5sb2coXCJTdGFydGluZyBzb2NrZXQgbGlzdGVuaW5nIGZvciBpbmNvbW1pbmcgY29ubmVjdGlvbnMuXCIpO1xuICAgIGxpc3RlbmluZ1NvY2tldC5zdGFydExpc3RlbmluZygpLnRoZW4oKCkgPT4ge1xuICAgICAgICBicm93c2VyLnByb2ZpbGVEaXJJTy53cml0ZUZpbGUoXCJleHRlbnNpb25fcG9ydC50eHRcIiwgYCR7bGlzdGVuaW5nU29ja2V0LnBvcnR9YCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgbGV0IGNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGRhdGFBZ2dyZWdhdG9yICE9IG51bGwpIHtcbiAgICAgICAgZGF0YUFnZ3JlZ2F0b3IuY2xvc2UoKTtcbiAgICB9XG4gICAgaWYgKGxvZ0FnZ3JlZ2F0b3IgIT0gbnVsbCkge1xuICAgICAgICBsb2dBZ2dyZWdhdG9yLmNsb3NlKCk7XG4gICAgfVxufTtcblxubGV0IG1ha2VMb2dKU09OID0gZnVuY3Rpb24obHZsLCBtc2cpIHtcbiAgICB2YXIgbG9nX2pzb24gPSB7XG4gICAgICAgICduYW1lJzogJ0V4dGVuc2lvbi1Mb2dnZXInLFxuICAgICAgICAnbGV2ZWwnOiBsdmwsXG4gICAgICAgICdwYXRobmFtZSc6ICdGaXJlZm94RXh0ZW5zaW9uJyxcbiAgICAgICAgJ2xpbmVubyc6IDEsXG4gICAgICAgICdtc2cnOiBlc2NhcGVTdHJpbmcobXNnKSxcbiAgICAgICAgJ2FyZ3MnOiBudWxsLFxuICAgICAgICAnZXhjX2luZm8nOiBudWxsLFxuICAgICAgICAnZnVuYyc6IG51bGxcbiAgICB9XG4gICAgcmV0dXJuIGxvZ19qc29uO1xufVxuXG5leHBvcnQgbGV0IGxvZ0luZm8gPSBmdW5jdGlvbihtc2cpIHtcbiAgICAvLyBBbHdheXMgbG9nIHRvIGJyb3dzZXIgY29uc29sZVxuICAgIGNvbnNvbGUubG9nKG1zZyk7XG5cbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBMb2cgbGV2ZWwgSU5GTyA9PSAyMCAoaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMi9saWJyYXJ5L2xvZ2dpbmcuaHRtbCNsb2dnaW5nLWxldmVscylcbiAgICB2YXIgbG9nX2pzb24gPSBtYWtlTG9nSlNPTigyMCwgbXNnKTtcbiAgICBsb2dBZ2dyZWdhdG9yLnNlbmQoSlNPTi5zdHJpbmdpZnkoWydFWFQnLCBKU09OLnN0cmluZ2lmeShsb2dfanNvbildKSk7XG59O1xuXG5leHBvcnQgbGV0IGxvZ0RlYnVnID0gZnVuY3Rpb24obXNnKSB7XG4gICAgLy8gQWx3YXlzIGxvZyB0byBicm93c2VyIGNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhtc2cpO1xuXG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTG9nIGxldmVsIERFQlVHID09IDEwIChodHRwczovL2RvY3MucHl0aG9uLm9yZy8yL2xpYnJhcnkvbG9nZ2luZy5odG1sI2xvZ2dpbmctbGV2ZWxzKVxuICAgIHZhciBsb2dfanNvbiA9IG1ha2VMb2dKU09OKDEwLCBtc2cpO1xuICAgIGxvZ0FnZ3JlZ2F0b3Iuc2VuZChKU09OLnN0cmluZ2lmeShbJ0VYVCcsIEpTT04uc3RyaW5naWZ5KGxvZ19qc29uKV0pKTtcbn07XG5cbmV4cG9ydCBsZXQgbG9nV2FybiA9IGZ1bmN0aW9uKG1zZykge1xuICAgIC8vIEFsd2F5cyBsb2cgdG8gYnJvd3NlciBjb25zb2xlXG4gICAgY29uc29sZS53YXJuKG1zZyk7XG5cbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBMb2cgbGV2ZWwgV0FSTiA9PSAzMCAoaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMi9saWJyYXJ5L2xvZ2dpbmcuaHRtbCNsb2dnaW5nLWxldmVscylcbiAgICB2YXIgbG9nX2pzb24gPSBtYWtlTG9nSlNPTigzMCwgbXNnKTtcbiAgICBsb2dBZ2dyZWdhdG9yLnNlbmQoSlNPTi5zdHJpbmdpZnkoWydFWFQnLCBKU09OLnN0cmluZ2lmeShsb2dfanNvbildKSk7XG59O1xuXG5leHBvcnQgbGV0IGxvZ0Vycm9yID0gZnVuY3Rpb24obXNnKSB7XG4gICAgLy8gQWx3YXlzIGxvZyB0byBicm93c2VyIGNvbnNvbGVcbiAgICBjb25zb2xlLmVycm9yKG1zZyk7XG5cbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBMb2cgbGV2ZWwgSU5GTyA9PSA0MCAoaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMi9saWJyYXJ5L2xvZ2dpbmcuaHRtbCNsb2dnaW5nLWxldmVscylcbiAgICB2YXIgbG9nX2pzb24gPSBtYWtlTG9nSlNPTig0MCwgbXNnKTtcbiAgICBsb2dBZ2dyZWdhdG9yLnNlbmQoSlNPTi5zdHJpbmdpZnkoWydFWFQnLCBKU09OLnN0cmluZ2lmeShsb2dfanNvbildKSk7XG59O1xuXG5leHBvcnQgbGV0IGxvZ0NyaXRpY2FsID0gZnVuY3Rpb24obXNnKSB7XG4gICAgLy8gQWx3YXlzIGxvZyB0byBicm93c2VyIGNvbnNvbGVcbiAgICBjb25zb2xlLmVycm9yKG1zZyk7XG5cbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBMb2cgbGV2ZWwgQ1JJVElDQUwgPT0gNTAgKGh0dHBzOi8vZG9jcy5weXRob24ub3JnLzIvbGlicmFyeS9sb2dnaW5nLmh0bWwjbG9nZ2luZy1sZXZlbHMpXG4gICAgdmFyIGxvZ19qc29uID0gbWFrZUxvZ0pTT04oNTAsIG1zZyk7XG4gICAgbG9nQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFsnRVhUJywgSlNPTi5zdHJpbmdpZnkobG9nX2pzb24pXSkpO1xufTtcblxuZXhwb3J0IGxldCBkYXRhUmVjZWl2ZXIgPSB7XG4gICAgc2F2ZVJlY29yZChhLCBiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGIpO1xuICAgIH0sXG59O1xuXG5leHBvcnQgbGV0IHNhdmVSZWNvcmQgPSBmdW5jdGlvbihpbnN0cnVtZW50LCByZWNvcmQpIHtcbiAgICAvLyBBZGQgdmlzaXQgaWQgaWYgY2hhbmdlZFxuICAgIHdoaWxlICghZGVidWdnaW5nICYmIGxpc3RlbmluZ1NvY2tldC5xdWV1ZS5sZW5ndGggIT0gMCkge1xuICAgICAgICB2aXNpdElEID0gbGlzdGVuaW5nU29ja2V0LnF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGxvZ0RlYnVnKFwiVmlzaXQgSWQ6IFwiICsgdmlzaXRJRCk7XG4gICAgfVxuICAgIHJlY29yZFtcInZpc2l0X2lkXCJdID0gdmlzaXRJRDtcblxuXG4gICAgaWYgKCF2aXNpdElEICYmICFkZWJ1Z2dpbmcpIHtcbiAgICAgICAgbG9nQ3JpdGljYWwoJ0V4dGVuc2lvbi0nICsgY3Jhd2xJRCArICcgOiB2aXNpdElEIGlzIG51bGwgd2hpbGUgYXR0ZW1wdGluZyB0byBpbnNlcnQgJyArXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgICAgICByZWNvcmRbXCJ2aXNpdF9pZFwiXSA9IC0xO1xuICAgIH1cblxuICAgIC8vIHNlbmQgdG8gY29uc29sZSBpZiBkZWJ1Z2dpbmdcbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVYVEVOU0lPTlwiLCBpbnN0cnVtZW50LCBKU09OLnN0cmluZ2lmeShyZWNvcmQpLCByZWNvcmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFtpbnN0cnVtZW50LCByZWNvcmRdKSk7XG59O1xuXG4vLyBTdHViIGZvciBub3dcbmV4cG9ydCBsZXQgc2F2ZUNvbnRlbnQgPSBhc3luYyBmdW5jdGlvbihjb250ZW50LCBjb250ZW50SGFzaCkge1xuICAvLyBTZW5kIHBhZ2UgY29udGVudCB0byB0aGUgZGF0YSBhZ2dyZWdhdG9yXG4gIC8vIGRlZHVwbGljYXRlZCBieSBjb250ZW50SGFzaCBpbiBhIGxldmVsREIgZGF0YWJhc2VcbiAgaWYgKGRlYnVnZ2luZykge1xuICAgIGNvbnNvbGUubG9nKFwiTERCIGNvbnRlbnRIYXNoOlwiLGNvbnRlbnRIYXNoLFwid2l0aCBsZW5ndGhcIixjb250ZW50Lmxlbmd0aCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRhdGFBZ2dyZWdhdG9yLnNlbmQoSlNPTi5zdHJpbmdpZnkoWydwYWdlX2NvbnRlbnQnLCBbY29udGVudCwgY29udGVudEhhc2hdXSkpO1xufTtcblxuZnVuY3Rpb24gZW5jb2RlX3V0Zjgocykge1xuICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcbn1cblxuZXhwb3J0IGxldCBlc2NhcGVTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZyBpZiBuZWNlc3NhcnlcbiAgICBpZih0eXBlb2Ygc3RyaW5nICE9IFwic3RyaW5nXCIpXG4gICAgICAgIHN0cmluZyA9IFwiXCIgKyBzdHJpbmc7XG5cbiAgICByZXR1cm4gZW5jb2RlX3V0Zjgoc3RyaW5nKTtcbn07XG5cbmV4cG9ydCBsZXQgYm9vbFRvSW50ID0gZnVuY3Rpb24oYm9vbCkge1xuICAgIHJldHVybiBib29sID8gMSA6IDA7XG59O1xuIiwibGV0IERhdGFSZWNlaXZlciA9IHtcbiAgY2FsbGJhY2tzOiBuZXcgTWFwKCksXG4gIG9uRGF0YVJlY2VpdmVkOiAoYVNvY2tldElkLCBhRGF0YSwgYUpTT04pID0+IHtcbiAgICBpZiAoIURhdGFSZWNlaXZlci5jYWxsYmFja3MuaGFzKGFTb2NrZXRJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFKU09OKSB7XG4gICAgICBhRGF0YSA9IEpTT04ucGFyc2UoYURhdGEpO1xuICAgIH1cbiAgICBEYXRhUmVjZWl2ZXIuY2FsbGJhY2tzLmdldChhU29ja2V0SWQpLl91cGRhdGVRdWV1ZShhRGF0YSk7XG4gIH0sXG59O1xuXG5icm93c2VyLnNvY2tldHMub25EYXRhUmVjZWl2ZWQuYWRkTGlzdGVuZXIoRGF0YVJlY2VpdmVyLm9uRGF0YVJlY2VpdmVkKTtcblxubGV0IExpc3RlbmluZ1NvY2tldHMgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBMaXN0ZW5pbmdTb2NrZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1ZXVlID0gW107IC8vIHN0b3JlcyBtZXNzYWdlcyBzZW50IHRvIHNvY2tldFxuICB9XG5cbiAgYXN5bmMgc3RhcnRMaXN0ZW5pbmcoKSB7XG4gICAgdGhpcy5wb3J0ID0gYXdhaXQgYnJvd3Nlci5zb2NrZXRzLmNyZWF0ZVNlcnZlclNvY2tldCgpO1xuICAgIERhdGFSZWNlaXZlci5jYWxsYmFja3Muc2V0KHRoaXMucG9ydCwgdGhpcyk7XG4gICAgYnJvd3Nlci5zb2NrZXRzLnN0YXJ0TGlzdGVuaW5nKHRoaXMucG9ydCk7XG4gICAgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiBwb3J0ICcgKyB0aGlzLnBvcnQpO1xuICB9XG5cbiAgX3VwZGF0ZVF1ZXVlKGRhdGEpIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlbmRpbmdTb2NrZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3QoaG9zdCwgcG9ydCkge1xuICAgIHRoaXMuaWQgPSBhd2FpdCBicm93c2VyLnNvY2tldHMuY3JlYXRlU2VuZGluZ1NvY2tldCgpO1xuICAgIGJyb3dzZXIuc29ja2V0cy5jb25uZWN0KHRoaXMuaWQsIGhvc3QsIHBvcnQpO1xuICAgIGNvbnNvbGUubG9nKGBDb25uZWN0ZWQgdG8gJHtob3N0fToke3BvcnR9YCk7XG4gIH1cblxuICBzZW5kKGFEYXRhLCBhSlNPTj10cnVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGJyb3dzZXIuc29ja2V0cy5zZW5kRGF0YSh0aGlzLmlkLCBhRGF0YSwgISFhSlNPTik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBicm93c2VyLnNvY2tldHMuY2xvc2UodGhpcy5pZCk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLWV2ZW50LW9yZGluYWxcIjtcbmltcG9ydCB7IGV4dGVuc2lvblNlc3Npb25VdWlkIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi11dWlkXCI7XG5pbXBvcnQgeyBib29sVG9JbnQsIGVzY2FwZVN0cmluZyB9IGZyb20gXCIuLi9saWIvc3RyaW5nLXV0aWxzXCI7XG5leHBvcnQgY29uc3QgdHJhbnNmb3JtQ29va2llT2JqZWN0VG9NYXRjaE9wZW5XUE1TY2hlbWEgPSAoY29va2llKSA9PiB7XG4gICAgY29uc3QgamF2YXNjcmlwdENvb2tpZSA9IHt9O1xuICAgIC8vIEV4cGlyeSB0aW1lIChpbiBzZWNvbmRzKVxuICAgIC8vIE1heSByZXR1cm4gfk1heChpbnQ2NCkuIEkgYmVsaWV2ZSB0aGlzIGlzIGEgc2Vzc2lvblxuICAgIC8vIGNvb2tpZSB3aGljaCBkb2Vzbid0IGV4cGlyZS4gU2Vzc2lvbnMgY29va2llcyB3aXRoXG4gICAgLy8gbm9uLW1heCBleHBpcnkgdGltZSBleHBpcmUgYWZ0ZXIgc2Vzc2lvbiBvciBhdCBleHBpcnkuXG4gICAgY29uc3QgZXhwaXJ5VGltZSA9IGNvb2tpZS5leHBpcmF0aW9uRGF0ZTsgLy8gcmV0dXJucyBzZWNvbmRzXG4gICAgbGV0IGV4cGlyeVRpbWVTdHJpbmc7XG4gICAgY29uc3QgbWF4SW50NjQgPSA5MjIzMzcyMDM2ODU0Nzc2MDAwO1xuICAgIGlmICghY29va2llLmV4cGlyYXRpb25EYXRlIHx8IGV4cGlyeVRpbWUgPT09IG1heEludDY0KSB7XG4gICAgICAgIGV4cGlyeVRpbWVTdHJpbmcgPSBcIjk5OTktMTItMzFUMjE6NTk6NTkuMDAwWlwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgZXhwaXJ5VGltZURhdGUgPSBuZXcgRGF0ZShleHBpcnlUaW1lICogMTAwMCk7IC8vIHJlcXVpcmVzIG1pbGxpc2Vjb25kc1xuICAgICAgICBleHBpcnlUaW1lU3RyaW5nID0gZXhwaXJ5VGltZURhdGUudG9JU09TdHJpbmcoKTtcbiAgICB9XG4gICAgamF2YXNjcmlwdENvb2tpZS5leHBpcnkgPSBleHBpcnlUaW1lU3RyaW5nO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfaHR0cF9vbmx5ID0gYm9vbFRvSW50KGNvb2tpZS5odHRwT25seSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19ob3N0X29ubHkgPSBib29sVG9JbnQoY29va2llLmhvc3RPbmx5KTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmlzX3Nlc3Npb24gPSBib29sVG9JbnQoY29va2llLnNlc3Npb24pO1xuICAgIGphdmFzY3JpcHRDb29raWUuaG9zdCA9IGVzY2FwZVN0cmluZyhjb29raWUuZG9tYWluKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmlzX3NlY3VyZSA9IGJvb2xUb0ludChjb29raWUuc2VjdXJlKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLm5hbWUgPSBlc2NhcGVTdHJpbmcoY29va2llLm5hbWUpO1xuICAgIGphdmFzY3JpcHRDb29raWUucGF0aCA9IGVzY2FwZVN0cmluZyhjb29raWUucGF0aCk7XG4gICAgamF2YXNjcmlwdENvb2tpZS52YWx1ZSA9IGVzY2FwZVN0cmluZyhjb29raWUudmFsdWUpO1xuICAgIGphdmFzY3JpcHRDb29raWUuc2FtZV9zaXRlID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5zYW1lU2l0ZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5maXJzdF9wYXJ0eV9kb21haW4gPSBlc2NhcGVTdHJpbmcoY29va2llLmZpcnN0UGFydHlEb21haW4pO1xuICAgIGphdmFzY3JpcHRDb29raWUuc3RvcmVfaWQgPSBlc2NhcGVTdHJpbmcoY29va2llLnN0b3JlSWQpO1xuICAgIGphdmFzY3JpcHRDb29raWUudGltZV9zdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICByZXR1cm4gamF2YXNjcmlwdENvb2tpZTtcbn07XG5leHBvcnQgY2xhc3MgQ29va2llSW5zdHJ1bWVudCB7XG4gICAgY29uc3RydWN0b3IoZGF0YVJlY2VpdmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICAvLyBJbnN0cnVtZW50IGNvb2tpZSBjaGFuZ2VzXG4gICAgICAgIHRoaXMub25DaGFuZ2VkTGlzdGVuZXIgPSBhc3luYyAoY2hhbmdlSW5mbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gY2hhbmdlSW5mby5yZW1vdmVkID8gXCJkZWxldGVkXCIgOiBcImFkZGVkLW9yLWNoYW5nZWRcIjtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IHtcbiAgICAgICAgICAgICAgICByZWNvcmRfdHlwZTogZXZlbnRUeXBlLFxuICAgICAgICAgICAgICAgIGNoYW5nZV9jYXVzZTogY2hhbmdlSW5mby5jYXVzZSxcbiAgICAgICAgICAgICAgICBjcmF3bF9pZDogY3Jhd2xJRCxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgICAgICAgICBldmVudF9vcmRpbmFsOiBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpLFxuICAgICAgICAgICAgICAgIC4uLnRyYW5zZm9ybUNvb2tpZU9iamVjdFRvTWF0Y2hPcGVuV1BNU2NoZW1hKGNoYW5nZUluZm8uY29va2llKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdF9jb29raWVzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIuY29va2llcy5vbkNoYW5nZWQuYWRkTGlzdGVuZXIodGhpcy5vbkNoYW5nZWRMaXN0ZW5lcik7XG4gICAgfVxuICAgIGFzeW5jIHNhdmVBbGxDb29raWVzKGNyYXdsSUQpIHtcbiAgICAgICAgY29uc3QgYWxsQ29va2llcyA9IGF3YWl0IGJyb3dzZXIuY29va2llcy5nZXRBbGwoe30pO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChhbGxDb29raWVzLm1hcCgoY29va2llKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGUgPSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkX3R5cGU6IFwibWFudWFsLWV4cG9ydFwiLFxuICAgICAgICAgICAgICAgIGNyYXdsX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICAgICAgICAgIC4uLnRyYW5zZm9ybUNvb2tpZU9iamVjdFRvTWF0Y2hPcGVuV1BNU2NoZW1hKGNvb2tpZSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJqYXZhc2NyaXB0X2Nvb2tpZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5vbkNoYW5nZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci5jb29raWVzLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQ2hhbmdlZExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyOXZhMmxsTFdsdWMzUnlkVzFsYm5RdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdlltRmphMmR5YjNWdVpDOWpiMjlyYVdVdGFXNXpkSEoxYldWdWRDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc2RVSkJRWFZDTEVWQlFVVXNUVUZCVFN4M1EwRkJkME1zUTBGQlF6dEJRVU5xUml4UFFVRlBMRVZCUVVVc2IwSkJRVzlDTEVWQlFVVXNUVUZCVFN3clFrRkJLMElzUTBGQlF6dEJRVU55UlN4UFFVRlBMRVZCUVVVc1UwRkJVeXhGUVVGRkxGbEJRVmtzUlVGQlJTeE5RVUZOTEhGQ1FVRnhRaXhEUVVGRE8wRkJTemxFTEUxQlFVMHNRMEZCUXl4TlFVRk5MSGxEUVVGNVF5eEhRVUZITEVOQlFVTXNUVUZCWXl4RlFVRkZMRVZCUVVVN1NVRkRNVVVzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSeXhGUVVGelFpeERRVUZETzBsQlJXaEVMREpDUVVFeVFqdEpRVU16UWl4elJFRkJjMFE3U1VGRGRFUXNjVVJCUVhGRU8wbEJRM0pFTEhsRVFVRjVSRHRKUVVONlJDeE5RVUZOTEZWQlFWVXNSMEZCUnl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFTkJRVU1zYTBKQlFXdENPMGxCUXpWRUxFbEJRVWtzWjBKQlFXZENMRU5CUVVNN1NVRkRja0lzVFVGQlRTeFJRVUZSTEVkQlFVY3NiVUpCUVcxQ0xFTkJRVU03U1VGRGNrTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhqUVVGakxFbEJRVWtzVlVGQlZTeExRVUZMTEZGQlFWRXNSVUZCUlR0UlFVTnlSQ3huUWtGQlowSXNSMEZCUnl3d1FrRkJNRUlzUTBGQlF6dExRVU12UXp0VFFVRk5PMUZCUTB3c1RVRkJUU3hqUVVGakxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zZDBKQlFYZENPMUZCUXpWRkxHZENRVUZuUWl4SFFVRkhMR05CUVdNc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dExRVU5xUkR0SlFVTkVMR2RDUVVGblFpeERRVUZETEUxQlFVMHNSMEZCUnl4blFrRkJaMElzUTBGQlF6dEpRVU16UXl4blFrRkJaMElzUTBGQlF5eFpRVUZaTEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEpRVU16UkN4blFrRkJaMElzUTBGQlF5eFpRVUZaTEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEpRVU16UkN4blFrRkJaMElzUTBGQlF5eFZRVUZWTEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dEpRVVY0UkN4blFrRkJaMElzUTBGQlF5eEpRVUZKTEVkQlFVY3NXVUZCV1N4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU53UkN4blFrRkJaMElzUTBGQlF5eFRRVUZUTEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU4wUkN4blFrRkJaMElzUTBGQlF5eEpRVUZKTEVkQlFVY3NXVUZCV1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU5zUkN4blFrRkJaMElzUTBGQlF5eEpRVUZKTEVkQlFVY3NXVUZCV1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU5zUkN4blFrRkJaMElzUTBGQlF5eExRVUZMTEVkQlFVY3NXVUZCV1N4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEpRVU53UkN4blFrRkJaMElzUTBGQlF5eFRRVUZUTEVkQlFVY3NXVUZCV1N4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEpRVU16UkN4blFrRkJaMElzUTBGQlF5eHJRa0ZCYTBJc1IwRkJSeXhaUVVGWkxFTkJRVU1zVFVGQlRTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03U1VGRE5VVXNaMEpCUVdkQ0xFTkJRVU1zVVVGQlVTeEhRVUZITEZsQlFWa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRmVrUXNaMEpCUVdkQ0xFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NTVUZCU1N4RlFVRkZMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03U1VGRmRrUXNUMEZCVHl4blFrRkJaMElzUTBGQlF6dEJRVU14UWl4RFFVRkRMRU5CUVVNN1FVRkZSaXhOUVVGTkxFOUJRVThzWjBKQlFXZENPMGxCU1ROQ0xGbEJRVmtzV1VGQldUdFJRVU4wUWl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExGbEJRVmtzUTBGQlF6dEpRVU51UXl4RFFVRkRPMGxCUlUwc1IwRkJSeXhEUVVGRExFOUJRVTg3VVVGRGFFSXNORUpCUVRSQ08xRkJRelZDTEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUjBGQlJ5eExRVUZMTEVWQlFVVXNWVUZQTDBJc1JVRkJSU3hGUVVGRk8xbEJRMGdzVFVGQlRTeFRRVUZUTEVkQlFVY3NWVUZCVlN4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4clFrRkJhMElzUTBGQlF6dFpRVU4wUlN4TlFVRk5MRTFCUVUwc1IwRkJNa0k3WjBKQlEzSkRMRmRCUVZjc1JVRkJSU3hUUVVGVE8yZENRVU4wUWl4WlFVRlpMRVZCUVVVc1ZVRkJWU3hEUVVGRExFdEJRVXM3WjBKQlF6bENMRkZCUVZFc1JVRkJSU3hQUVVGUE8yZENRVU5xUWl4elFrRkJjMElzUlVGQlJTeHZRa0ZCYjBJN1owSkJRelZETEdGQlFXRXNSVUZCUlN4MVFrRkJkVUlzUlVGQlJUdG5Ra0ZEZUVNc1IwRkJSeXg1UTBGQmVVTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1RVRkJUU3hEUVVGRE8yRkJRMmhGTEVOQlFVTTdXVUZEUml4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGVkJRVlVzUTBGQlF5eHZRa0ZCYjBJc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dFJRVU0zUkN4RFFVRkRMRU5CUVVNN1VVRkRSaXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzUTBGQlF6dEpRVVZOTEV0QlFVc3NRMEZCUXl4alFVRmpMRU5CUVVNc1QwRkJUenRSUVVOcVF5eE5RVUZOTEZWQlFWVXNSMEZCUnl4TlFVRk5MRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTNCRUxFMUJRVTBzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZEWml4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVFVGQll5eEZRVUZGTEVWQlFVVTdXVUZEYUVNc1RVRkJUU3hOUVVGTkxFZEJRVEpDTzJkQ1FVTnlReXhYUVVGWExFVkJRVVVzWlVGQlpUdG5Ra0ZETlVJc1VVRkJVU3hGUVVGRkxFOUJRVTg3WjBKQlEycENMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRuUWtGRE5VTXNSMEZCUnl4NVEwRkJlVU1zUTBGQlF5eE5RVUZOTEVOQlFVTTdZVUZEY2tRc1EwRkJRenRaUVVOR0xFOUJRVThzU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc2IwSkJRVzlDTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRjRVVzUTBGQlF5eERRVUZETEVOQlEwZ3NRMEZCUXp0SlFVTktMRU5CUVVNN1NVRkZUU3hQUVVGUE8xRkJRMW9zU1VGQlNTeEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVU3V1VGRE1VSXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzFOQlEyeEZPMGxCUTBnc1EwRkJRenREUVVOR0luMD0iLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IEh0dHBQb3N0UGFyc2VyIH0gZnJvbSBcIi4uL2xpYi9odHRwLXBvc3QtcGFyc2VyXCI7XG5pbXBvcnQgeyBQZW5kaW5nUmVxdWVzdCB9IGZyb20gXCIuLi9saWIvcGVuZGluZy1yZXF1ZXN0XCI7XG5pbXBvcnQgeyBQZW5kaW5nUmVzcG9uc2UgfSBmcm9tIFwiLi4vbGliL3BlbmRpbmctcmVzcG9uc2VcIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuLyoqXG4gKiBOb3RlOiBEaWZmZXJlbnQgcGFydHMgb2YgdGhlIGRlc2lyZWQgaW5mb3JtYXRpb24gYXJyaXZlcyBpbiBkaWZmZXJlbnQgZXZlbnRzIGFzIHBlciBiZWxvdzpcbiAqIHJlcXVlc3QgPSBoZWFkZXJzIGluIG9uQmVmb3JlU2VuZEhlYWRlcnMgKyBib2R5IGluIG9uQmVmb3JlUmVxdWVzdFxuICogcmVzcG9uc2UgPSBoZWFkZXJzIGluIG9uQ29tcGxldGVkICsgYm9keSB2aWEgYSBvbkJlZm9yZVJlcXVlc3QgZmlsdGVyXG4gKiByZWRpcmVjdCA9IG9yaWdpbmFsIHJlcXVlc3QgaGVhZGVycytib2R5LCBmb2xsb3dlZCBieSBhIG9uQmVmb3JlUmVkaXJlY3QgYW5kIHRoZW4gYSBuZXcgc2V0IG9mIHJlcXVlc3QgaGVhZGVycytib2R5IGFuZCByZXNwb25zZSBoZWFkZXJzK2JvZHlcbiAqIERvY3M6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVXNlcjp3YmFtYmVyZy93ZWJSZXF1ZXN0LlJlcXVlc3REZXRhaWxzXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwSW5zdHJ1bWVudCB7XG4gICAgY29uc3RydWN0b3IoZGF0YVJlY2VpdmVyKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzID0ge307XG4gICAgICAgIHRoaXMucGVuZGluZ1Jlc3BvbnNlcyA9IHt9O1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgcnVuKGNyYXdsSUQsIHNhdmVKYXZhc2NyaXB0LCBzYXZlQWxsQ29udGVudCkge1xuICAgICAgICBjb25zdCBhbGxUeXBlcyA9IFtcbiAgICAgICAgICAgIFwiYmVhY29uXCIsXG4gICAgICAgICAgICBcImNzcF9yZXBvcnRcIixcbiAgICAgICAgICAgIFwiZm9udFwiLFxuICAgICAgICAgICAgXCJpbWFnZVwiLFxuICAgICAgICAgICAgXCJpbWFnZXNldFwiLFxuICAgICAgICAgICAgXCJtYWluX2ZyYW1lXCIsXG4gICAgICAgICAgICBcIm1lZGlhXCIsXG4gICAgICAgICAgICBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJvYmplY3Rfc3VicmVxdWVzdFwiLFxuICAgICAgICAgICAgXCJwaW5nXCIsXG4gICAgICAgICAgICBcInNjcmlwdFwiLFxuICAgICAgICAgICAgLy8gXCJzcGVjdWxhdGl2ZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXNoZWV0XCIsXG4gICAgICAgICAgICBcInN1Yl9mcmFtZVwiLFxuICAgICAgICAgICAgXCJ3ZWJfbWFuaWZlc3RcIixcbiAgICAgICAgICAgIFwid2Vic29ja2V0XCIsXG4gICAgICAgICAgICBcInhibFwiLFxuICAgICAgICAgICAgXCJ4bWxfZHRkXCIsXG4gICAgICAgICAgICBcInhtbGh0dHByZXF1ZXN0XCIsXG4gICAgICAgICAgICBcInhzbHRcIixcbiAgICAgICAgICAgIFwib3RoZXJcIixcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyB1cmxzOiBbXCI8YWxsX3VybHM+XCJdLCB0eXBlczogYWxsVHlwZXMgfTtcbiAgICAgICAgY29uc3QgcmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbiA9IGRldGFpbHMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChkZXRhaWxzLm9yaWdpblVybCAmJiBkZXRhaWxzLm9yaWdpblVybC5pbmRleE9mKFwibW96LWV4dGVuc2lvbjovL1wiKSA+IC0xKTtcbiAgICAgICAgfTtcbiAgICAgICAgLypcbiAgICAgICAgICogQXR0YWNoIGhhbmRsZXJzIHRvIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lciA9IGRldGFpbHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmxvY2tpbmdSZXNwb25zZVRoYXREb2VzTm90aGluZyA9IHt9O1xuICAgICAgICAgICAgLy8gSWdub3JlIHJlcXVlc3RzIG1hZGUgYnkgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RTdGVtc0Zyb21FeHRlbnNpb24oZGV0YWlscykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmxvY2tpbmdSZXNwb25zZVRoYXREb2VzTm90aGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXF1ZXN0ID0gdGhpcy5nZXRQZW5kaW5nUmVxdWVzdChkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVxdWVzdC5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzKGRldGFpbHMpO1xuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1Jlc3BvbnNlID0gdGhpcy5nZXRQZW5kaW5nUmVzcG9uc2UoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICBpZiAoc2F2ZUFsbENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUmVzcG9uc2UuYWRkUmVzcG9uc2VSZXNwb25zZUJvZHlMaXN0ZW5lcihkZXRhaWxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhdmVKYXZhc2NyaXB0ICYmIHRoaXMuaXNKUyhkZXRhaWxzLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLmFkZFJlc3BvbnNlUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tpbmdSZXNwb25zZVRoYXREb2VzTm90aGluZztcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdC5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVxdWVzdExpc3RlbmVyLCBmaWx0ZXIsIHNhdmVKYXZhc2NyaXB0IHx8IHNhdmVBbGxDb250ZW50XG4gICAgICAgICAgICA/IFtcInJlcXVlc3RCb2R5XCIsIFwiYmxvY2tpbmdcIl1cbiAgICAgICAgICAgIDogW1wicmVxdWVzdEJvZHlcIl0pO1xuICAgICAgICB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNMaXN0ZW5lciA9IGRldGFpbHMgPT4ge1xuICAgICAgICAgICAgLy8gSWdub3JlIHJlcXVlc3RzIG1hZGUgYnkgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RTdGVtc0Zyb21FeHRlbnNpb24oZGV0YWlscykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVxdWVzdCA9IHRoaXMuZ2V0UGVuZGluZ1JlcXVlc3QoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3QucmVzb2x2ZU9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGluY3JlbWVudGVkRXZlbnRPcmRpbmFsKCkpO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVTZW5kSGVhZGVycy5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNMaXN0ZW5lciwgZmlsdGVyLCBbXCJyZXF1ZXN0SGVhZGVyc1wiXSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVSZWRpcmVjdEhhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlZGlyZWN0LmFkZExpc3RlbmVyKHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyLCBmaWx0ZXIsIFtcInJlc3BvbnNlSGVhZGVyc1wiXSk7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lciA9IGRldGFpbHMgPT4ge1xuICAgICAgICAgICAgLy8gSWdub3JlIHJlcXVlc3RzIG1hZGUgYnkgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RTdGVtc0Zyb21FeHRlbnNpb24oZGV0YWlscykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVzcG9uc2UgPSB0aGlzLmdldFBlbmRpbmdSZXNwb25zZShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVzcG9uc2UucmVzb2x2ZU9uQ29tcGxldGVkRXZlbnREZXRhaWxzKGRldGFpbHMpO1xuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlZEhhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSwgc2F2ZUphdmFzY3JpcHQsIHNhdmVBbGxDb250ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lciwgZmlsdGVyLCBbXCJyZXNwb25zZUhlYWRlcnNcIl0pO1xuICAgIH1cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVxdWVzdExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVNlbmRIZWFkZXJzLnJlbW92ZUxpc3RlbmVyKHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZVJlZGlyZWN0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlZGlyZWN0LnJlbW92ZUxpc3RlbmVyKHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkNvbXBsZXRlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25Db21wbGV0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNvbXBsZXRlZExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRQZW5kaW5nUmVxdWVzdChyZXF1ZXN0SWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdSZXF1ZXN0c1tyZXF1ZXN0SWRdKSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0c1tyZXF1ZXN0SWRdID0gbmV3IFBlbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF07XG4gICAgfVxuICAgIGdldFBlbmRpbmdSZXNwb25zZShyZXF1ZXN0SWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVxdWVzdElkXSkge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3JlcXVlc3RJZF0gPSBuZXcgUGVuZGluZ1Jlc3BvbnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ1Jlc3BvbnNlc1tyZXF1ZXN0SWRdO1xuICAgIH1cbiAgICAvKlxuICAgICAqIEhUVFAgUmVxdWVzdCBIYW5kbGVyIGFuZCBIZWxwZXIgRnVuY3Rpb25zXG4gICAgICovXG4gICAgLypcbiAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgcHJpdmF0ZSBnZXRfc3RhY2tfdHJhY2Vfc3RyKCkge1xuICAgICAgLy8gcmV0dXJuIHRoZSBzdGFjayB0cmFjZSBhcyBhIHN0cmluZ1xuICAgICAgLy8gVE9ETzogY2hlY2sgaWYgaHR0cC1vbi1tb2RpZnktcmVxdWVzdCBpcyBhIGdvb2QgcGxhY2UgdG8gY2FwdHVyZSB0aGUgc3RhY2tcbiAgICAgIC8vIEluIHRoZSBtYW51YWwgdGVzdHMgd2UgY291bGQgY2FwdHVyZSBleGFjdGx5IHRoZSBzYW1lIHRyYWNlIGFzIHRoZVxuICAgICAgLy8gXCJDYXVzZVwiIGNvbHVtbiBvZiB0aGUgZGV2dG9vbHMgbmV0d29yayBwYW5lbC5cbiAgICAgIGNvbnN0IHN0YWNrdHJhY2UgPSBbXTtcbiAgICAgIGxldCBmcmFtZSA9IGNvbXBvbmVudHMuc3RhY2s7XG4gICAgICBpZiAoZnJhbWUgJiYgZnJhbWUuY2FsbGVyKSB7XG4gICAgICAgIC8vIGludGVybmFsL2Nocm9tZSBjYWxsZXJzIG9jY3VweSB0aGUgZmlyc3QgdGhyZWUgZnJhbWVzLCBwb3AgdGhlbSFcbiAgICAgICAgZnJhbWUgPSBmcmFtZS5jYWxsZXIuY2FsbGVyLmNhbGxlcjtcbiAgICAgICAgd2hpbGUgKGZyYW1lKSB7XG4gICAgICAgICAgLy8gY2hyb21lIHNjcmlwdHMgYXBwZWFyIGFzIGNhbGxlcnMgaW4gc29tZSBjYXNlcywgZmlsdGVyIHRoZW0gb3V0XG4gICAgICAgICAgY29uc3Qgc2NoZW1lID0gZnJhbWUuZmlsZW5hbWUuc3BsaXQoXCI6Ly9cIilbMF07XG4gICAgICAgICAgaWYgKFtcInJlc291cmNlXCIsIFwiY2hyb21lXCIsIFwiZmlsZVwiXS5pbmRleE9mKHNjaGVtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgY2hyb21lIHNjcmlwdHNcbiAgICAgICAgICAgIHN0YWNrdHJhY2UucHVzaChcbiAgICAgICAgICAgICAgZnJhbWUubmFtZSArXG4gICAgICAgICAgICAgICAgXCJAXCIgK1xuICAgICAgICAgICAgICAgIGZyYW1lLmZpbGVuYW1lICtcbiAgICAgICAgICAgICAgICBcIjpcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUubGluZU51bWJlciArXG4gICAgICAgICAgICAgICAgXCI6XCIgK1xuICAgICAgICAgICAgICAgIGZyYW1lLmNvbHVtbk51bWJlciArXG4gICAgICAgICAgICAgICAgXCI7XCIgK1xuICAgICAgICAgICAgICAgIGZyYW1lLmFzeW5jQ2F1c2UsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmcmFtZSA9IGZyYW1lLmNhbGxlciB8fCBmcmFtZS5hc3luY0NhbGxlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YWNrdHJhY2Uuam9pbihcIlxcblwiKTtcbiAgICB9XG4gICAgKi9cbiAgICBhc3luYyBvbkJlZm9yZVNlbmRIZWFkZXJzSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBldmVudE9yZGluYWwpIHtcbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJvbkJlZm9yZVNlbmRIZWFkZXJzSGFuZGxlciAocHJldmlvdXNseSBodHRwUmVxdWVzdEhhbmRsZXIpXCIsXG4gICAgICAgICAgZGV0YWlscyxcbiAgICAgICAgICBjcmF3bElELFxuICAgICAgICApO1xuICAgICAgICAqL1xuICAgICAgICBjb25zdCB0YWIgPSBkZXRhaWxzLnRhYklkID4gLTFcbiAgICAgICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICAgICAgOiB7IHdpbmRvd0lkOiB1bmRlZmluZWQsIGluY29nbml0bzogdW5kZWZpbmVkLCB1cmw6IHVuZGVmaW5lZCB9O1xuICAgICAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICAgICAgdXBkYXRlLmluY29nbml0byA9IGJvb2xUb0ludCh0YWIuaW5jb2duaXRvKTtcbiAgICAgICAgdXBkYXRlLmNyYXdsX2lkID0gY3Jhd2xJRDtcbiAgICAgICAgdXBkYXRlLmV4dGVuc2lvbl9zZXNzaW9uX3V1aWQgPSBleHRlbnNpb25TZXNzaW9uVXVpZDtcbiAgICAgICAgdXBkYXRlLmV2ZW50X29yZGluYWwgPSBldmVudE9yZGluYWw7XG4gICAgICAgIHVwZGF0ZS53aW5kb3dfaWQgPSB0YWIud2luZG93SWQ7XG4gICAgICAgIHVwZGF0ZS50YWJfaWQgPSBkZXRhaWxzLnRhYklkO1xuICAgICAgICB1cGRhdGUuZnJhbWVfaWQgPSBkZXRhaWxzLmZyYW1lSWQ7XG4gICAgICAgIC8vIHJlcXVlc3RJZCBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gbGluayByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICAgICAgIHVwZGF0ZS5yZXF1ZXN0X2lkID0gZGV0YWlscy5yZXF1ZXN0SWQ7XG4gICAgICAgIC8vIGNvbnN0IHN0YWNrdHJhY2Vfc3RyID0gZ2V0X3N0YWNrX3RyYWNlX3N0cigpO1xuICAgICAgICAvLyB1cGRhdGUucmVxX2NhbGxfc3RhY2sgPSBlc2NhcGVTdHJpbmcoc3RhY2t0cmFjZV9zdHIpO1xuICAgICAgICBjb25zdCB1cmwgPSBkZXRhaWxzLnVybDtcbiAgICAgICAgdXBkYXRlLnVybCA9IGVzY2FwZVVybCh1cmwpO1xuICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kID0gZGV0YWlscy5tZXRob2Q7XG4gICAgICAgIHVwZGF0ZS5tZXRob2QgPSBlc2NhcGVTdHJpbmcocmVxdWVzdE1ldGhvZCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfdGltZSA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKTtcbiAgICAgICAgdXBkYXRlLnRpbWVfc3RhbXAgPSBjdXJyZW50X3RpbWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgbGV0IGVuY29kaW5nVHlwZSA9IFwiXCI7XG4gICAgICAgIGxldCByZWZlcnJlciA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBbXTtcbiAgICAgICAgbGV0IGlzT2NzcCA9IGZhbHNlO1xuICAgICAgICBpZiAoZGV0YWlscy5yZXF1ZXN0SGVhZGVycykge1xuICAgICAgICAgICAgZGV0YWlscy5yZXF1ZXN0SGVhZGVycy5tYXAocmVxdWVzdEhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gcmVxdWVzdEhlYWRlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJfcGFpciA9IFtdO1xuICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKG5hbWUpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXJfcGFpcik7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiQ29udGVudC1UeXBlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RpbmdUeXBlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmNvZGluZ1R5cGUuaW5kZXhPZihcImFwcGxpY2F0aW9uL29jc3AtcmVxdWVzdFwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT2NzcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiUmVmZXJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLnJlZmVycmVyID0gZXNjYXBlU3RyaW5nKHJlZmVycmVyKTtcbiAgICAgICAgaWYgKHJlcXVlc3RNZXRob2QgPT09IFwiUE9TVFwiICYmICFpc09jc3AgLyogZG9uJ3QgcHJvY2VzcyBPQ1NQIHJlcXVlc3RzICovKSB7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVxdWVzdCA9IHRoaXMuZ2V0UGVuZGluZ1JlcXVlc3QoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBwZW5kaW5nUmVxdWVzdC5yZXNvbHZlZFdpdGhpblRpbWVvdXQoMTAwMCk7XG4gICAgICAgICAgICBpZiAoIXJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJQZW5kaW5nIHJlcXVlc3QgdGltZWQgb3V0IHdhaXRpbmcgZm9yIGRhdGEgZnJvbSBib3RoIG9uQmVmb3JlUmVxdWVzdCBhbmQgb25CZWZvcmVTZW5kSGVhZGVycyBldmVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBhd2FpdCBwZW5kaW5nUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHM7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMucmVxdWVzdEJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RQYXJzZXIgPSBuZXcgSHR0cFBvc3RQYXJzZXIoXG4gICAgICAgICAgICAgICAgICAgIC8vIGRldGFpbHMsXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscywgdGhpcy5kYXRhUmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3N0T2JqID0gcG9zdFBhcnNlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcnNlUG9zdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIChQT1NUKSByZXF1ZXN0IGhlYWRlcnMgZnJvbSB1cGxvYWQgc3RyZWFtXG4gICAgICAgICAgICAgICAgICAgIGlmIChcInBvc3RfaGVhZGVyc1wiIGluIHBvc3RPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgc3RvcmUgUE9TVCBoZWFkZXJzIHRoYXQgd2Uga25vdyBhbmQgbmVlZC4gV2UgbWF5IG1pc2ludGVycHJldCBQT1NUIGRhdGEgYXMgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXMgZGV0ZWN0aW9uIGlzIGJhc2VkIG9uIFwia2V5OnZhbHVlXCIgZm9ybWF0IChub24taGVhZGVyIFBPU1QgZGF0YSBjYW4gYmUgaW4gdGhpcyBmb3JtYXQgYXMgd2VsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRIZWFkZXJzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LURpc3Bvc2l0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LUxlbmd0aFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBwb3N0T2JqLnBvc3RfaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50SGVhZGVycy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJfcGFpciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhuYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKHBvc3RPYmoucG9zdF9oZWFkZXJzW25hbWVdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChoZWFkZXJfcGFpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIHN0b3JlIFBPU1QgYm9keSBpbiBKU09OIGZvcm1hdCwgZXhjZXB0IHdoZW4gaXQncyBhIHN0cmluZyB3aXRob3V0IGEgKGtleS12YWx1ZSkgc3RydWN0dXJlXG4gICAgICAgICAgICAgICAgICAgIGlmIChcInBvc3RfYm9keVwiIGluIHBvc3RPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5wb3N0X2JvZHkgPSBwb3N0T2JqLnBvc3RfYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUuaGVhZGVycyA9IEpTT04uc3RyaW5naWZ5KGhlYWRlcnMpO1xuICAgICAgICAvLyBDaGVjayBpZiB4aHJcbiAgICAgICAgY29uc3QgaXNYSFIgPSBkZXRhaWxzLnR5cGUgPT09IFwieG1saHR0cHJlcXVlc3RcIjtcbiAgICAgICAgdXBkYXRlLmlzX1hIUiA9IGJvb2xUb0ludChpc1hIUik7XG4gICAgICAgIC8vIENoZWNrIGlmIGZyYW1lIE9SIGZ1bGwgcGFnZSBsb2FkXG4gICAgICAgIGNvbnN0IGlzRnVsbFBhZ2VMb2FkID0gZGV0YWlscy5mcmFtZUlkID09PSAwO1xuICAgICAgICBjb25zdCBpc0ZyYW1lTG9hZCA9IGRldGFpbHMudHlwZSA9PT0gXCJzdWJfZnJhbWVcIjtcbiAgICAgICAgdXBkYXRlLmlzX2Z1bGxfcGFnZSA9IGJvb2xUb0ludChpc0Z1bGxQYWdlTG9hZCk7XG4gICAgICAgIHVwZGF0ZS5pc19mcmFtZV9sb2FkID0gYm9vbFRvSW50KGlzRnJhbWVMb2FkKTtcbiAgICAgICAgLy8gR3JhYiB0aGUgdHJpZ2dlcmluZyBhbmQgbG9hZGluZyBQcmluY2lwYWxzXG4gICAgICAgIGxldCB0cmlnZ2VyaW5nT3JpZ2luO1xuICAgICAgICBsZXQgbG9hZGluZ09yaWdpbjtcbiAgICAgICAgaWYgKGRldGFpbHMub3JpZ2luVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRPcmlnaW5VcmwgPSBuZXcgVVJMKGRldGFpbHMub3JpZ2luVXJsKTtcbiAgICAgICAgICAgIHRyaWdnZXJpbmdPcmlnaW4gPSBwYXJzZWRPcmlnaW5Vcmwub3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXRhaWxzLmRvY3VtZW50VXJsKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWREb2N1bWVudFVybCA9IG5ldyBVUkwoZGV0YWlscy5kb2N1bWVudFVybCk7XG4gICAgICAgICAgICBsb2FkaW5nT3JpZ2luID0gcGFyc2VkRG9jdW1lbnRVcmwub3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS50cmlnZ2VyaW5nX29yaWdpbiA9IGVzY2FwZVN0cmluZyh0cmlnZ2VyaW5nT3JpZ2luKTtcbiAgICAgICAgdXBkYXRlLmxvYWRpbmdfb3JpZ2luID0gZXNjYXBlU3RyaW5nKGxvYWRpbmdPcmlnaW4pO1xuICAgICAgICAvLyBsb2FkaW5nRG9jdW1lbnQncyBocmVmXG4gICAgICAgIC8vIFRoZSBsb2FkaW5nRG9jdW1lbnQgaXMgdGhlIGRvY3VtZW50IHRoZSBlbGVtZW50IHJlc2lkZXMsIHJlZ2FyZGxlc3Mgb2ZcbiAgICAgICAgLy8gaG93IHRoZSBsb2FkIHdhcyB0cmlnZ2VyZWQuXG4gICAgICAgIGNvbnN0IGxvYWRpbmdIcmVmID0gZGV0YWlscy5kb2N1bWVudFVybDtcbiAgICAgICAgdXBkYXRlLmxvYWRpbmdfaHJlZiA9IGVzY2FwZVN0cmluZyhsb2FkaW5nSHJlZik7XG4gICAgICAgIC8vIHJlc291cmNlVHlwZSBvZiB0aGUgcmVxdWVzdGluZyBub2RlLiBUaGlzIGlzIHNldCBieSB0aGUgdHlwZSBvZlxuICAgICAgICAvLyBub2RlIG1ha2luZyB0aGUgcmVxdWVzdCAoaS5lLiBhbiA8aW1nIHNyYz0uLi4+IG5vZGUgd2lsbCBzZXQgdG8gdHlwZSBcImltYWdlXCIpLlxuICAgICAgICAvLyBEb2N1bWVudGF0aW9uOlxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0FQSS93ZWJSZXF1ZXN0L1Jlc291cmNlVHlwZVxuICAgICAgICB1cGRhdGUucmVzb3VyY2VfdHlwZSA9IGRldGFpbHMudHlwZTtcbiAgICAgICAgLypcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICBjb25zdCBUaGlyZFBhcnR5VXRpbCA9IENjW1wiQG1vemlsbGEub3JnL3RoaXJkcGFydHl1dGlsOzFcIl0uZ2V0U2VydmljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaS5tb3pJVGhpcmRQYXJ0eVV0aWwpO1xuICAgICAgICAvLyBEbyB0aGlyZC1wYXJ0eSBjaGVja3NcbiAgICAgICAgLy8gVGhlc2Ugc3BlY2lmaWMgY2hlY2tzIGFyZSBkb25lIGJlY2F1c2UgaXQncyB3aGF0J3MgdXNlZCBpbiBUcmFja2luZyBQcm90ZWN0aW9uXG4gICAgICAgIC8vIFNlZTogaHR0cDovL3NlYXJjaGZveC5vcmcvbW96aWxsYS1jZW50cmFsL3NvdXJjZS9uZXR3ZXJrL2Jhc2UvbnNDaGFubmVsQ2xhc3NpZmllci5jcHAjMTA3XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaXNUaGlyZFBhcnR5Q2hhbm5lbCA9IFRoaXJkUGFydHlVdGlsLmlzVGhpcmRQYXJ0eUNoYW5uZWwoZGV0YWlscyk7XG4gICAgICAgICAgY29uc3QgdG9wV2luZG93ID0gVGhpcmRQYXJ0eVV0aWwuZ2V0VG9wV2luZG93Rm9yQ2hhbm5lbChkZXRhaWxzKTtcbiAgICAgICAgICBjb25zdCB0b3BVUkkgPSBUaGlyZFBhcnR5VXRpbC5nZXRVUklGcm9tV2luZG93KHRvcFdpbmRvdyk7XG4gICAgICAgICAgaWYgKHRvcFVSSSkge1xuICAgICAgICAgICAgY29uc3QgdG9wVXJsID0gdG9wVVJJLnNwZWM7XG4gICAgICAgICAgICBjb25zdCBjaGFubmVsVVJJID0gZGV0YWlscy5VUkk7XG4gICAgICAgICAgICBjb25zdCBpc1RoaXJkUGFydHlUb1RvcFdpbmRvdyA9IFRoaXJkUGFydHlVdGlsLmlzVGhpcmRQYXJ0eVVSSShcbiAgICAgICAgICAgICAgY2hhbm5lbFVSSSxcbiAgICAgICAgICAgICAgdG9wVVJJLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwZGF0ZS5pc190aGlyZF9wYXJ0eV90b190b3Bfd2luZG93ID0gaXNUaGlyZFBhcnR5VG9Ub3BXaW5kb3c7XG4gICAgICAgICAgICB1cGRhdGUuaXNfdGhpcmRfcGFydHlfY2hhbm5lbCA9IGlzVGhpcmRQYXJ0eUNoYW5uZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChhbkVycm9yKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9ucyBleHBlY3RlZCBmb3IgY2hhbm5lbHMgdHJpZ2dlcmVkIG9yIGxvYWRpbmcgaW4gYVxuICAgICAgICAgIC8vIE51bGxQcmluY2lwYWwgb3IgU3lzdGVtUHJpbmNpcGFsLiBUaGV5IGFyZSBhbHNvIGV4cGVjdGVkIGZvciBmYXZpY29uXG4gICAgICAgICAgLy8gbG9hZHMsIHdoaWNoIHdlIGF0dGVtcHQgdG8gZmlsdGVyLiBEZXBlbmRpbmcgb24gdGhlIG5hbWluZywgc29tZSBmYXZpY29uc1xuICAgICAgICAgIC8vIG1heSBjb250aW51ZSB0byBsZWFkIHRvIGVycm9yIGxvZ3MuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdXBkYXRlLnRyaWdnZXJpbmdfb3JpZ2luICE9PSBcIltTeXN0ZW0gUHJpbmNpcGFsXVwiICYmXG4gICAgICAgICAgICB1cGRhdGUudHJpZ2dlcmluZ19vcmlnaW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdXBkYXRlLmxvYWRpbmdfb3JpZ2luICE9PSBcIltTeXN0ZW0gUHJpbmNpcGFsXVwiICYmXG4gICAgICAgICAgICB1cGRhdGUubG9hZGluZ19vcmlnaW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgIXVwZGF0ZS51cmwuZW5kc1dpdGgoXCJpY29cIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFxuICAgICAgICAgICAgICBcIkVycm9yIHdoaWxlIHJldHJpZXZpbmcgYWRkaXRpb25hbCBjaGFubmVsIGluZm9ybWF0aW9uIGZvciBVUkw6IFwiICtcbiAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgIHVwZGF0ZS51cmwgK1xuICAgICAgICAgICAgICBcIlxcbiBFcnJvciB0ZXh0OlwiICtcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoYW5FcnJvciksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgICAgICB1cGRhdGUudG9wX2xldmVsX3VybCA9IGVzY2FwZVVybCh0YWIudXJsKTtcbiAgICAgICAgdXBkYXRlLnBhcmVudF9mcmFtZV9pZCA9IGRldGFpbHMucGFyZW50RnJhbWVJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2FuY2VzdG9ycyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkZXRhaWxzLmZyYW1lQW5jZXN0b3JzKSk7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3JlcXVlc3RzXCIsIHVwZGF0ZSk7XG4gICAgfVxuICAgIGFzeW5jIG9uQmVmb3JlUmVkaXJlY3RIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGV2ZW50T3JkaW5hbCkge1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm9uQmVmb3JlUmVkaXJlY3RIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIC8vIFNhdmUgSFRUUCByZWRpcmVjdCBldmVudHNcbiAgICAgICAgLy8gRXZlbnRzIGFyZSBzYXZlZCB0byB0aGUgYGh0dHBfcmVkaXJlY3RzYCB0YWJsZVxuICAgICAgICAvKlxuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIC8vIEV2ZW50cyBhcmUgc2F2ZWQgdG8gdGhlIGBodHRwX3JlZGlyZWN0c2AgdGFibGUsIGFuZCBtYXAgdGhlIG9sZFxuICAgICAgICAvLyByZXF1ZXN0L3Jlc3BvbnNlIGNoYW5uZWwgaWQgdG8gdGhlIG5ldyByZXF1ZXN0L3Jlc3BvbnNlIGNoYW5uZWwgaWQuXG4gICAgICAgIC8vIEltcGxlbWVudGF0aW9uIGJhc2VkIG9uOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTEyNDA2MjdcbiAgICAgICAgY29uc3Qgb2xkTm90aWZpY2F0aW9ucyA9IGRldGFpbHMubm90aWZpY2F0aW9uQ2FsbGJhY2tzO1xuICAgICAgICBsZXQgb2xkRXZlbnRTaW5rID0gbnVsbDtcbiAgICAgICAgZGV0YWlscy5ub3RpZmljYXRpb25DYWxsYmFja3MgPSB7XG4gICAgICAgICAgUXVlcnlJbnRlcmZhY2U6IFhQQ09NVXRpbHMuZ2VuZXJhdGVRSShbXG4gICAgICAgICAgICBDaS5uc0lJbnRlcmZhY2VSZXF1ZXN0b3IsXG4gICAgICAgICAgICBDaS5uc0lDaGFubmVsRXZlbnRTaW5rLFxuICAgICAgICAgIF0pLFxuICAgIFxuICAgICAgICAgIGdldEludGVyZmFjZShpaWQpIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gbnNJQ2hhbm5lbEV2ZW50U2luayxcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgb2xkIGNhbGxiYWNrcyBmb3IgYW55IG90aGVyIGludGVyZmFjZSByZXF1ZXN0cy5cbiAgICAgICAgICAgIGlmIChpaWQuZXF1YWxzKENpLm5zSUNoYW5uZWxFdmVudFNpbmspKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkRXZlbnRTaW5rID0gb2xkTm90aWZpY2F0aW9ucy5RdWVyeUludGVyZmFjZShpaWQpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChhbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIkVycm9yIGR1cmluZyBjYWxsIHRvIGN1c3RvbSBub3RpZmljYXRpb25DYWxsYmFja3M6OmdldEludGVyZmFjZS5cIiArXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGFuRXJyb3IpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAob2xkTm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICByZXR1cm4gb2xkTm90aWZpY2F0aW9ucy5nZXRJbnRlcmZhY2UoaWlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IENyLk5TX0VSUk9SX05PX0lOVEVSRkFDRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgIFxuICAgICAgICAgIGFzeW5jT25DaGFubmVsUmVkaXJlY3Qob2xkQ2hhbm5lbCwgbmV3Q2hhbm5lbCwgZmxhZ3MsIGNhbGxiYWNrKSB7XG4gICAgXG4gICAgICAgICAgICBuZXdDaGFubmVsLlF1ZXJ5SW50ZXJmYWNlKENpLm5zSUh0dHBDaGFubmVsKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGh0dHBSZWRpcmVjdDogSHR0cFJlZGlyZWN0ID0ge1xuICAgICAgICAgICAgICBjcmF3bF9pZDogY3Jhd2xJRCxcbiAgICAgICAgICAgICAgb2xkX3JlcXVlc3RfaWQ6IG9sZENoYW5uZWwuY2hhbm5lbElkLFxuICAgICAgICAgICAgICBuZXdfcmVxdWVzdF9pZDogbmV3Q2hhbm5lbC5jaGFubmVsSWQsXG4gICAgICAgICAgICAgIHRpbWVfc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZWRpcmVjdHNcIiwgaHR0cFJlZGlyZWN0KTtcbiAgICBcbiAgICAgICAgICAgIGlmIChvbGRFdmVudFNpbmspIHtcbiAgICAgICAgICAgICAgb2xkRXZlbnRTaW5rLmFzeW5jT25DaGFubmVsUmVkaXJlY3QoXG4gICAgICAgICAgICAgICAgb2xkQ2hhbm5lbCxcbiAgICAgICAgICAgICAgICBuZXdDaGFubmVsLFxuICAgICAgICAgICAgICAgIGZsYWdzLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sub25SZWRpcmVjdFZlcmlmeUNhbGxiYWNrKENyLk5TX09LKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICAqL1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1cyA9IGRldGFpbHMuc3RhdHVzQ29kZTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VTdGF0dXNUZXh0ID0gZGV0YWlscy5zdGF0dXNMaW5lO1xuICAgICAgICBjb25zdCB0YWIgPSBkZXRhaWxzLnRhYklkID4gLTFcbiAgICAgICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICAgICAgOiB7IHdpbmRvd0lkOiB1bmRlZmluZWQsIGluY29nbml0bzogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IGh0dHBSZWRpcmVjdCA9IHtcbiAgICAgICAgICAgIGluY29nbml0bzogYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pLFxuICAgICAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgICAgICBvbGRfcmVxdWVzdF91cmw6IGVzY2FwZVVybChkZXRhaWxzLnVybCksXG4gICAgICAgICAgICBvbGRfcmVxdWVzdF9pZDogZGV0YWlscy5yZXF1ZXN0SWQsXG4gICAgICAgICAgICBuZXdfcmVxdWVzdF91cmw6IGVzY2FwZVVybChkZXRhaWxzLnJlZGlyZWN0VXJsKSxcbiAgICAgICAgICAgIG5ld19yZXF1ZXN0X2lkOiBudWxsLFxuICAgICAgICAgICAgZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZDogZXh0ZW5zaW9uU2Vzc2lvblV1aWQsXG4gICAgICAgICAgICBldmVudF9vcmRpbmFsOiBldmVudE9yZGluYWwsXG4gICAgICAgICAgICB3aW5kb3dfaWQ6IHRhYi53aW5kb3dJZCxcbiAgICAgICAgICAgIHRhYl9pZDogZGV0YWlscy50YWJJZCxcbiAgICAgICAgICAgIGZyYW1lX2lkOiBkZXRhaWxzLmZyYW1lSWQsXG4gICAgICAgICAgICByZXNwb25zZV9zdGF0dXM6IHJlc3BvbnNlU3RhdHVzLFxuICAgICAgICAgICAgcmVzcG9uc2Vfc3RhdHVzX3RleHQ6IGVzY2FwZVN0cmluZyhyZXNwb25zZVN0YXR1c1RleHQpLFxuICAgICAgICAgICAgdGltZV9zdGFtcDogbmV3IERhdGUoZGV0YWlscy50aW1lU3RhbXApLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3JlZGlyZWN0c1wiLCBodHRwUmVkaXJlY3QpO1xuICAgIH1cbiAgICAvKlxuICAgICAqIEhUVFAgUmVzcG9uc2UgSGFuZGxlcnMgYW5kIEhlbHBlciBGdW5jdGlvbnNcbiAgICAgKi9cbiAgICBhc3luYyBsb2dXaXRoUmVzcG9uc2VCb2R5KGRldGFpbHMsIHVwZGF0ZSkge1xuICAgICAgICBjb25zdCBwZW5kaW5nUmVzcG9uc2UgPSB0aGlzLmdldFBlbmRpbmdSZXNwb25zZShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZUJvZHlMaXN0ZW5lciA9IHBlbmRpbmdSZXNwb25zZS5yZXNwb25zZUJvZHlMaXN0ZW5lcjtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BCb2R5ID0gYXdhaXQgcmVzcG9uc2VCb2R5TGlzdGVuZXIuZ2V0UmVzcG9uc2VCb2R5KCk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50SGFzaCA9IGF3YWl0IHJlc3BvbnNlQm9keUxpc3RlbmVyLmdldENvbnRlbnRIYXNoKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlQ29udGVudChlc2NhcGVTdHJpbmcocmVzcEJvZHkpLCBlc2NhcGVTdHJpbmcoY29udGVudEhhc2gpKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3Jlc3BvbnNlc1wiLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgICAgICBkYXRhUmVjZWl2ZXIubG9nRXJyb3IoXG4gICAgICAgICAgICAgIFwiVW5hYmxlIHRvIHJldHJpZXZlIHJlc3BvbnNlIGJvZHkuXCIgKyBKU09OLnN0cmluZ2lmeShhUmVhc29uKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1cGRhdGUuY29udGVudF9oYXNoID0gXCI8ZXJyb3I+XCI7XG4gICAgICAgICAgICBkYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJVbmFibGUgdG8gcmV0cmlldmUgcmVzcG9uc2UgYm9keS5cIiArXG4gICAgICAgICAgICAgICAgXCJMaWtlbHkgY2F1c2VkIGJ5IGEgcHJvZ3JhbW1pbmcgZXJyb3IuIEVycm9yIE1lc3NhZ2U6XCIgK1xuICAgICAgICAgICAgICAgIGVyci5uYW1lICtcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgICAgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50X2hhc2ggPSBcIjxlcnJvcj5cIjtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3Jlc3BvbnNlc1wiLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoaXMgcmVxdWVzdCBpcyBsb2FkaW5nIGphdmFzY3JpcHRcbiAgICAgKiBXZSByZWx5IG1vc3RseSBvbiB0aGUgY29udGVudCBwb2xpY3kgdHlwZSB0byBmaWx0ZXIgcmVzcG9uc2VzXG4gICAgICogYW5kIGZhbGwgYmFjayB0byB0aGUgVVJJIGFuZCBjb250ZW50IHR5cGUgc3RyaW5nIGZvciB0eXBlcyB0aGF0IGNhblxuICAgICAqIGxvYWQgdmFyaW91cyByZXNvdXJjZSB0eXBlcy5cbiAgICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3dlYlJlcXVlc3QvUmVzb3VyY2VUeXBlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VUeXBlXG4gICAgICovXG4gICAgaXNKUyhyZXNvdXJjZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHJlc291cmNlVHlwZSA9PT0gXCJzY3JpcHRcIjtcbiAgICB9XG4gICAgLy8gSW5zdHJ1bWVudCBIVFRQIHJlc3BvbnNlc1xuICAgIGFzeW5jIG9uQ29tcGxldGVkSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBldmVudE9yZGluYWwsIHNhdmVKYXZhc2NyaXB0LCBzYXZlQWxsQ29udGVudCkge1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm9uQ29tcGxldGVkSGFuZGxlciAocHJldmlvdXNseSBodHRwUmVxdWVzdEhhbmRsZXIpXCIsXG4gICAgICAgICAgZGV0YWlscyxcbiAgICAgICAgICBjcmF3bElELFxuICAgICAgICAgIHNhdmVKYXZhc2NyaXB0LFxuICAgICAgICAgIHNhdmVBbGxDb250ZW50LFxuICAgICAgICApO1xuICAgICAgICAqL1xuICAgICAgICBjb25zdCB0YWIgPSBkZXRhaWxzLnRhYklkID4gLTFcbiAgICAgICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICAgICAgOiB7IHdpbmRvd0lkOiB1bmRlZmluZWQsIGluY29nbml0bzogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgICAgICB1cGRhdGUuaW5jb2duaXRvID0gYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pO1xuICAgICAgICB1cGRhdGUuY3Jhd2xfaWQgPSBjcmF3bElEO1xuICAgICAgICB1cGRhdGUuZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZCA9IGV4dGVuc2lvblNlc3Npb25VdWlkO1xuICAgICAgICB1cGRhdGUuZXZlbnRfb3JkaW5hbCA9IGV2ZW50T3JkaW5hbDtcbiAgICAgICAgdXBkYXRlLndpbmRvd19pZCA9IHRhYi53aW5kb3dJZDtcbiAgICAgICAgdXBkYXRlLnRhYl9pZCA9IGRldGFpbHMudGFiSWQ7XG4gICAgICAgIHVwZGF0ZS5mcmFtZV9pZCA9IGRldGFpbHMuZnJhbWVJZDtcbiAgICAgICAgLy8gcmVxdWVzdElkIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBsaW5rIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICAgICAgdXBkYXRlLnJlcXVlc3RfaWQgPSBkZXRhaWxzLnJlcXVlc3RJZDtcbiAgICAgICAgY29uc3QgaXNDYWNoZWQgPSBkZXRhaWxzLmZyb21DYWNoZTtcbiAgICAgICAgdXBkYXRlLmlzX2NhY2hlZCA9IGJvb2xUb0ludChpc0NhY2hlZCk7XG4gICAgICAgIGNvbnN0IHVybCA9IGRldGFpbHMudXJsO1xuICAgICAgICB1cGRhdGUudXJsID0gZXNjYXBlVXJsKHVybCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RNZXRob2QgPSBkZXRhaWxzLm1ldGhvZDtcbiAgICAgICAgdXBkYXRlLm1ldGhvZCA9IGVzY2FwZVN0cmluZyhyZXF1ZXN0TWV0aG9kKTtcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICAvLyAocmVxdWVzdCBoZWFkZXJzIGFyZSBub3QgYXZhaWxhYmxlIGluIGh0dHAgcmVzcG9uc2UgZXZlbnQgbGlzdGVuZXIgb2JqZWN0LFxuICAgICAgICAvLyBidXQgdGhlIHJlZmVycmVyIHByb3BlcnR5IG9mIHRoZSBjb3JyZXNwb25kaW5nIHJlcXVlc3QgY291bGQgYmUgcXVlcmllZClcbiAgICAgICAgLy9cbiAgICAgICAgLy8gbGV0IHJlZmVycmVyID0gXCJcIjtcbiAgICAgICAgLy8gaWYgKGRldGFpbHMucmVmZXJyZXIpIHtcbiAgICAgICAgLy8gICByZWZlcnJlciA9IGRldGFpbHMucmVmZXJyZXIuc3BlYztcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB1cGRhdGUucmVmZXJyZXIgPSBlc2NhcGVTdHJpbmcocmVmZXJyZXIpO1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1cyA9IGRldGFpbHMuc3RhdHVzQ29kZTtcbiAgICAgICAgdXBkYXRlLnJlc3BvbnNlX3N0YXR1cyA9IHJlc3BvbnNlU3RhdHVzO1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1c1RleHQgPSBkZXRhaWxzLnN0YXR1c0xpbmU7XG4gICAgICAgIHVwZGF0ZS5yZXNwb25zZV9zdGF0dXNfdGV4dCA9IGVzY2FwZVN0cmluZyhyZXNwb25zZVN0YXR1c1RleHQpO1xuICAgICAgICBjb25zdCBjdXJyZW50X3RpbWUgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCk7XG4gICAgICAgIHVwZGF0ZS50aW1lX3N0YW1wID0gY3VycmVudF90aW1lLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBbXTtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gXCJcIjtcbiAgICAgICAgaWYgKGRldGFpbHMucmVzcG9uc2VIZWFkZXJzKSB7XG4gICAgICAgICAgICBkZXRhaWxzLnJlc3BvbnNlSGVhZGVycy5tYXAocmVzcG9uc2VIZWFkZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IHJlc3BvbnNlSGVhZGVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcl9wYWlyID0gW107XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcobmFtZSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlcl9wYWlyKTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImxvY2F0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUuaGVhZGVycyA9IEpTT04uc3RyaW5naWZ5KGhlYWRlcnMpO1xuICAgICAgICB1cGRhdGUubG9jYXRpb24gPSBlc2NhcGVTdHJpbmcobG9jYXRpb24pO1xuICAgICAgICBpZiAoc2F2ZUFsbENvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nV2l0aFJlc3BvbnNlQm9keShkZXRhaWxzLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNhdmVKYXZhc2NyaXB0ICYmIHRoaXMuaXNKUyhkZXRhaWxzLnR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ1dpdGhSZXNwb25zZUJvZHkoZGV0YWlscywgdXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3Jlc3BvbnNlc1wiLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXBibk4wY25WdFpXNTBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMkpoWTJ0bmNtOTFibVF2YUhSMGNDMXBibk4wY25WdFpXNTBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxFOUJRVThzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSU3hOUVVGTkxIZERRVUYzUXl4RFFVRkRPMEZCUTJwR0xFOUJRVThzUlVGQlJTeHZRa0ZCYjBJc1JVRkJSU3hOUVVGTkxDdENRVUVyUWl4RFFVRkRPMEZCUTNKRkxFOUJRVThzUlVGQlJTeGpRVUZqTEVWQlFYRkNMRTFCUVUwc2VVSkJRWGxDTEVOQlFVTTdRVUZETlVVc1QwRkJUeXhGUVVGRkxHTkJRV01zUlVGQlJTeE5RVUZOTEhkQ1FVRjNRaXhEUVVGRE8wRkJRM2hFTEU5QlFVOHNSVUZCUlN4bFFVRmxMRVZCUVVVc1RVRkJUU3g1UWtGQmVVSXNRMEZCUXp0QlFVa3hSQ3hQUVVGUExFVkJRVVVzVTBGQlV5eEZRVUZGTEZsQlFWa3NSVUZCUlN4VFFVRlRMRVZCUVVVc1RVRkJUU3h4UWtGQmNVSXNRMEZCUXp0QlFWTjZSVHM3T3pzN08wZEJUVWM3UVVGRlNDeE5RVUZOTEU5QlFVOHNZMEZCWXp0SlFXRjZRaXhaUVVGWkxGbEJRVms3VVVGWWFFSXNiMEpCUVdVc1IwRkZia0lzUlVGQlJTeERRVUZETzFGQlEwTXNjVUpCUVdkQ0xFZEJSWEJDTEVWQlFVVXNRMEZCUXp0UlFVOU1MRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzV1VGQldTeERRVUZETzBsQlEyNURMRU5CUVVNN1NVRkZUU3hIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTEdOQlFXTXNSVUZCUlN4alFVRmpPMUZCUTJoRUxFMUJRVTBzVVVGQlVTeEhRVUZ0UWp0WlFVTXZRaXhSUVVGUk8xbEJRMUlzV1VGQldUdFpRVU5hTEUxQlFVMDdXVUZEVGl4UFFVRlBPMWxCUTFBc1ZVRkJWVHRaUVVOV0xGbEJRVms3V1VGRFdpeFBRVUZQTzFsQlExQXNVVUZCVVR0WlFVTlNMRzFDUVVGdFFqdFpRVU51UWl4TlFVRk5PMWxCUTA0c1VVRkJVVHRaUVVOU0xHbENRVUZwUWp0WlFVTnFRaXhaUVVGWk8xbEJRMW9zVjBGQlZ6dFpRVU5ZTEdOQlFXTTdXVUZEWkN4WFFVRlhPMWxCUTFnc1MwRkJTenRaUVVOTUxGTkJRVk03V1VGRFZDeG5Ra0ZCWjBJN1dVRkRhRUlzVFVGQlRUdFpRVU5PTEU5QlFVODdVMEZEVWl4RFFVRkRPMUZCUlVZc1RVRkJUU3hOUVVGTkxFZEJRV3RDTEVWQlFVVXNTVUZCU1N4RlFVRkZMRU5CUVVNc1dVRkJXU3hEUVVGRExFVkJRVVVzUzBGQlN5eEZRVUZGTEZGQlFWRXNSVUZCUlN4RFFVRkRPMUZCUlhoRkxFMUJRVTBzZVVKQlFYbENMRWRCUVVjc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRE1VTXNUMEZCVHl4RFFVTk1MRTlCUVU4c1EwRkJReXhUUVVGVExFbEJRVWtzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4UFFVRlBMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkRlRVVzUTBGQlF6dFJRVU5LTEVOQlFVTXNRMEZCUXp0UlFVVkdPenRYUVVWSE8xRkJSVWdzU1VGQlNTeERRVUZETEhWQ1FVRjFRaXhIUVVGSExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlEzWkRMRTFCUVUwc0swSkJRU3RDTEVkQlFYRkNMRVZCUVVVc1EwRkJRenRaUVVNM1JDeHhRMEZCY1VNN1dVRkRja01zU1VGQlNTeDVRa0ZCZVVJc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJUdG5Ra0ZEZEVNc1QwRkJUeXdyUWtGQkswSXNRMEZCUXp0aFFVTjRRenRaUVVORUxFMUJRVTBzWTBGQll5eEhRVUZITEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRha1VzWTBGQll5eERRVUZETEd0RFFVRnJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6TkVMRTFCUVUwc1pVRkJaU3hIUVVGSExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdXVUZEYmtVc1pVRkJaU3hEUVVGRExHdERRVUZyUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRelZFTEVsQlFVa3NZMEZCWXl4RlFVRkZPMmRDUVVOc1FpeGxRVUZsTEVOQlFVTXNLMEpCUVN0Q0xFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdZVUZETVVRN2FVSkJRVTBzU1VGQlNTeGpRVUZqTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdaMEpCUTNCRUxHVkJRV1VzUTBGQlF5d3JRa0ZCSzBJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dGhRVU14UkR0WlFVTkVMRTlCUVU4c0swSkJRU3RDTEVOQlFVTTdVVUZEZWtNc1EwRkJReXhEUVVGRE8xRkJRMFlzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4bFFVRmxMRU5CUVVNc1YwRkJWeXhEUVVNMVF5eEpRVUZKTEVOQlFVTXNkVUpCUVhWQ0xFVkJRelZDTEUxQlFVMHNSVUZEVGl4alFVRmpMRWxCUVVrc1kwRkJZenRaUVVNNVFpeERRVUZETEVOQlFVTXNRMEZCUXl4aFFVRmhMRVZCUVVVc1ZVRkJWU3hEUVVGRE8xbEJRemRDTEVOQlFVTXNRMEZCUXl4RFFVRkRMR0ZCUVdFc1EwRkJReXhEUVVOd1FpeERRVUZETzFGQlJVWXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeEhRVUZITEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUXpORExIRkRRVUZ4UXp0WlFVTnlReXhKUVVGSkxIbENRVUY1UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8yZENRVU4wUXl4UFFVRlBPMkZCUTFJN1dVRkRSQ3hOUVVGTkxHTkJRV01zUjBGQlJ5eEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMWxCUTJwRkxHTkJRV01zUTBGQlF5eHpRMEZCYzBNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU12UkN4SlFVRkpMRU5CUVVNc01FSkJRVEJDTEVOQlF6ZENMRTlCUVU4c1JVRkRVQ3hQUVVGUExFVkJRMUFzZFVKQlFYVkNMRVZCUVVVc1EwRkRNVUlzUTBGQlF6dFJRVU5LTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zYlVKQlFXMUNMRU5CUVVNc1YwRkJWeXhEUVVOb1JDeEpRVUZKTEVOQlFVTXNNa0pCUVRKQ0xFVkJRMmhETEUxQlFVMHNSVUZEVGl4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlEyNUNMRU5CUVVNN1VVRkZSaXhKUVVGSkxFTkJRVU1zZDBKQlFYZENMRWRCUVVjc1QwRkJUeXhEUVVGRExFVkJRVVU3V1VGRGVFTXNjVU5CUVhGRE8xbEJRM0pETEVsQlFVa3NlVUpCUVhsQ0xFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVTdaMEpCUTNSRExFOUJRVTg3WVVGRFVqdFpRVU5FTEVsQlFVa3NRMEZCUXl4MVFrRkJkVUlzUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMSFZDUVVGMVFpeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTTFSU3hEUVVGRExFTkJRVU03VVVGRFJpeFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeERRVUZETEZkQlFWY3NRMEZETjBNc1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RlFVTTNRaXhOUVVGTkxFVkJRMDRzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVOd1FpeERRVUZETzFGQlJVWXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEhRVUZITEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTI1RExIRkRRVUZ4UXp0WlFVTnlReXhKUVVGSkxIbENRVUY1UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8yZENRVU4wUXl4UFFVRlBPMkZCUTFJN1dVRkRSQ3hOUVVGTkxHVkJRV1VzUjBGQlJ5eEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMWxCUTI1RkxHVkJRV1VzUTBGQlF5dzRRa0ZCT0VJc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU40UkN4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlEzSkNMRTlCUVU4c1JVRkRVQ3hQUVVGUExFVkJRMUFzZFVKQlFYVkNMRVZCUVVVc1JVRkRla0lzWTBGQll5eEZRVU5rTEdOQlFXTXNRMEZEWml4RFFVRkRPMUZCUTBvc1EwRkJReXhEUVVGRE8xRkJRMFlzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4WFFVRlhMRU5CUVVNc1YwRkJWeXhEUVVONFF5eEpRVUZKTEVOQlFVTXNiVUpCUVcxQ0xFVkJRM2hDTEUxQlFVMHNSVUZEVGl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlEzQkNMRU5CUVVNN1NVRkRTaXhEUVVGRE8wbEJSVTBzVDBGQlR6dFJRVU5hTEVsQlFVa3NTVUZCU1N4RFFVRkRMSFZDUVVGMVFpeEZRVUZGTzFsQlEyaERMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zWlVGQlpTeERRVUZETEdOQlFXTXNRMEZETDBNc1NVRkJTU3hEUVVGRExIVkNRVUYxUWl4RFFVTTNRaXhEUVVGRE8xTkJRMGc3VVVGRFJDeEpRVUZKTEVsQlFVa3NRMEZCUXl3eVFrRkJNa0lzUlVGQlJUdFpRVU53UXl4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExHMUNRVUZ0UWl4RFFVRkRMR05CUVdNc1EwRkRia1FzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhEUVVOcVF5eERRVUZETzFOQlEwZzdVVUZEUkN4SlFVRkpMRWxCUVVrc1EwRkJReXgzUWtGQmQwSXNSVUZCUlR0WlFVTnFReXhQUVVGUExFTkJRVU1zVlVGQlZTeERRVUZETEdkQ1FVRm5RaXhEUVVGRExHTkJRV01zUTBGRGFFUXNTVUZCU1N4RFFVRkRMSGRDUVVGM1FpeERRVU01UWl4RFFVRkRPMU5CUTBnN1VVRkRSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRaUVVNMVFpeFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMRmRCUVZjc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExFTkJRVU03VTBGRGVrVTdTVUZEU0N4RFFVRkRPMGxCUlU4c2FVSkJRV2xDTEVOQlFVTXNVMEZCVXp0UlFVTnFReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXl4VFFVRlRMRU5CUVVNc1JVRkJSVHRaUVVOd1F5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRMRk5CUVZNc1EwRkJReXhIUVVGSExFbEJRVWtzWTBGQll5eEZRVUZGTEVOQlFVTTdVMEZEZUVRN1VVRkRSQ3hQUVVGUExFbEJRVWtzUTBGQlF5eGxRVUZsTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1NVRkRla01zUTBGQlF6dEpRVVZQTEd0Q1FVRnJRaXhEUVVGRExGTkJRVk03VVVGRGJFTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4VFFVRlRMRU5CUVVNc1JVRkJSVHRaUVVOeVF5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVTBGQlV5eERRVUZETEVkQlFVY3NTVUZCU1N4bFFVRmxMRVZCUVVVc1EwRkJRenRUUVVNeFJEdFJRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRMR2RDUVVGblFpeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMGxCUXpGRExFTkJRVU03U1VGRlJEczdUMEZGUnp0SlFVVklPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08wMUJhME5GTzBsQlJVMHNTMEZCU3l4RFFVRkRMREJDUVVFd1FpeERRVU4wUXl4UFFVRnJSQ3hGUVVOc1JDeFBRVUZQTEVWQlExQXNXVUZCYjBJN1VVRkZjRUk3T3pzN096dFZRVTFGTzFGQlJVWXNUVUZCVFN4SFFVRkhMRWRCUTFBc1QwRkJUeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZEYUVJc1EwRkJReXhEUVVGRExFMUJRVTBzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF6dFpRVU4yUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hSUVVGUkxFVkJRVVVzVTBGQlV5eEZRVUZGTEZOQlFWTXNSVUZCUlN4VFFVRlRMRVZCUVVVc1IwRkJSeXhGUVVGRkxGTkJRVk1zUlVGQlJTeERRVUZETzFGQlJYQkZMRTFCUVUwc1RVRkJUU3hIUVVGSExFVkJRV2xDTEVOQlFVTTdVVUZGYWtNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFRRVUZUTEVOQlFVTXNSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRelZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRE8xRkJRekZDTEUxQlFVMHNRMEZCUXl4elFrRkJjMElzUjBGQlJ5eHZRa0ZCYjBJc1EwRkJRenRSUVVOeVJDeE5RVUZOTEVOQlFVTXNZVUZCWVN4SFFVRkhMRmxCUVZrc1EwRkJRenRSUVVOd1F5eE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU03VVVGRGFFTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlF6bENMRTFCUVUwc1EwRkJReXhSUVVGUkxFZEJRVWNzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXp0UlFVVnNReXh0UmtGQmJVWTdVVUZEYmtZc1RVRkJUU3hEUVVGRExGVkJRVlVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRPMUZCUlhSRExHZEVRVUZuUkR0UlFVTm9SQ3gzUkVGQmQwUTdVVUZGZUVRc1RVRkJUU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTjRRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEhRVUZITEZOQlFWTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVVMVFpeE5RVUZOTEdGQlFXRXNSMEZCUnl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRE8xRkJRM0pETEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1dVRkJXU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzFGQlJUVkRMRTFCUVUwc1dVRkJXU3hIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeE5RVUZOTEVOQlFVTXNWVUZCVlN4SFFVRkhMRmxCUVZrc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dFJRVVV2UXl4SlFVRkpMRmxCUVZrc1IwRkJSeXhGUVVGRkxFTkJRVU03VVVGRGRFSXNTVUZCU1N4UlFVRlJMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMnhDTEUxQlFVMHNUMEZCVHl4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOdVFpeEpRVUZKTEUxQlFVMHNSMEZCUnl4TFFVRkxMRU5CUVVNN1VVRkRia0lzU1VGQlNTeFBRVUZQTEVOQlFVTXNZMEZCWXl4RlFVRkZPMWxCUXpGQ0xFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJReXhGUVVGRk8yZENRVU42UXl4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEhRVUZITEdGQlFXRXNRMEZCUXp0blFrRkRkRU1zVFVGQlRTeFhRVUZYTEVkQlFVY3NSVUZCUlN4RFFVRkRPMmRDUVVOMlFpeFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTnlReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU4wUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzJkQ1FVTXhRaXhKUVVGSkxFbEJRVWtzUzBGQlN5eGpRVUZqTEVWQlFVVTdiMEpCUXpOQ0xGbEJRVmtzUjBGQlJ5eExRVUZMTEVOQlFVTTdiMEpCUTNKQ0xFbEJRVWtzV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl3d1FrRkJNRUlzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZPM2RDUVVNelJDeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRPM0ZDUVVObU8ybENRVU5HTzJkQ1FVTkVMRWxCUVVrc1NVRkJTU3hMUVVGTExGTkJRVk1zUlVGQlJUdHZRa0ZEZEVJc1VVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF6dHBRa0ZEYkVJN1dVRkRTQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU5LTzFGQlJVUXNUVUZCVFN4RFFVRkRMRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdVVUZGZWtNc1NVRkJTU3hoUVVGaExFdEJRVXNzVFVGQlRTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMR2xEUVVGcFF5eEZRVUZGTzFsQlEzcEZMRTFCUVUwc1kwRkJZeXhIUVVGSExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdXVUZEYWtVc1RVRkJUU3hSUVVGUkxFZEJRVWNzVFVGQlRTeGpRVUZqTEVOQlFVTXNjVUpCUVhGQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEYkVVc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJUdG5Ra0ZEWWl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGRkJRVkVzUTBGRGVFSXNjVWRCUVhGSExFTkJRM1JITEVOQlFVTTdZVUZEU0R0cFFrRkJUVHRuUWtGRFRDeE5RVUZOTERKQ1FVRXlRaXhIUVVGSExFMUJRVTBzWTBGQll5eERRVUZETERKQ1FVRXlRaXhEUVVGRE8yZENRVU55Uml4TlFVRk5MRmRCUVZjc1IwRkJSeXd5UWtGQk1rSXNRMEZCUXl4WFFVRlhMRU5CUVVNN1owSkJSVFZFTEVsQlFVa3NWMEZCVnl4RlFVRkZPMjlDUVVObUxFMUJRVTBzVlVGQlZTeEhRVUZITEVsQlFVa3NZMEZCWXp0dlFrRkRia01zVjBGQlZ6dHZRa0ZEV0N3eVFrRkJNa0lzUlVGRE0wSXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkRiRUlzUTBGQlF6dHZRa0ZEUml4TlFVRk5MRTlCUVU4c1IwRkJjMElzVlVGQlZUdDVRa0ZETVVNc1owSkJRV2RDTEVWQlJXWXNRMEZCUXp0dlFrRkZUQ3huUkVGQlowUTdiMEpCUTJoRUxFbEJRVWtzWTBGQll5eEpRVUZKTEU5QlFVOHNSVUZCUlR0M1FrRkROMElzTUVaQlFUQkdPM2RDUVVNeFJpeHRSMEZCYlVjN2QwSkJRMjVITEUxQlFVMHNZMEZCWXl4SFFVRkhPelJDUVVOeVFpeGpRVUZqT3pSQ1FVTmtMSEZDUVVGeFFqczBRa0ZEY2tJc1owSkJRV2RDTzNsQ1FVTnFRaXhEUVVGRE8zZENRVU5HTEV0QlFVc3NUVUZCVFN4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRExGbEJRVmtzUlVGQlJUczBRa0ZEZGtNc1NVRkJTU3hqUVVGakxFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZPMmREUVVOcVF5eE5RVUZOTEZkQlFWY3NSMEZCUnl4RlFVRkZMRU5CUVVNN1owTkJRM1pDTEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdaME5CUTNKRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmREUVVNelJDeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRE96WkNRVU16UWp0NVFrRkRSanR4UWtGRFJqdHZRa0ZEUkN3clJrRkJLMFk3YjBKQlF5OUdMRWxCUVVrc1YwRkJWeXhKUVVGSkxFOUJRVThzUlVGQlJUdDNRa0ZETVVJc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRPM0ZDUVVOMFF6dHBRa0ZEUmp0aFFVTkdPMU5CUTBZN1VVRkZSQ3hOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRmVrTXNaVUZCWlR0UlFVTm1MRTFCUVUwc1MwRkJTeXhIUVVGSExFOUJRVThzUTBGQlF5eEpRVUZKTEV0QlFVc3NaMEpCUVdkQ0xFTkJRVU03VVVGRGFFUXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhUUVVGVExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdVVUZGYWtNc2JVTkJRVzFETzFGQlEyNURMRTFCUVUwc1kwRkJZeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUXpkRExFMUJRVTBzVjBGQlZ5eEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRXRCUVVzc1YwRkJWeXhEUVVGRE8xRkJRMnBFTEUxQlFVMHNRMEZCUXl4WlFVRlpMRWRCUVVjc1UwRkJVeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzFGQlEyaEVMRTFCUVUwc1EwRkJReXhoUVVGaExFZEJRVWNzVTBGQlV5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMUZCUlRsRExEWkRRVUUyUXp0UlFVTTNReXhKUVVGSkxHZENRVUZuUWl4RFFVRkRPMUZCUTNKQ0xFbEJRVWtzWVVGQllTeERRVUZETzFGQlEyeENMRWxCUVVrc1QwRkJUeXhEUVVGRExGTkJRVk1zUlVGQlJUdFpRVU55UWl4TlFVRk5MR1ZCUVdVc1IwRkJSeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRia1FzWjBKQlFXZENMRWRCUVVjc1pVRkJaU3hEUVVGRExFMUJRVTBzUTBGQlF6dFRRVU16UXp0UlFVTkVMRWxCUVVrc1QwRkJUeXhEUVVGRExGZEJRVmNzUlVGQlJUdFpRVU4yUWl4TlFVRk5MR2xDUVVGcFFpeEhRVUZITEVsQlFVa3NSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dFpRVU4yUkN4aFFVRmhMRWRCUVVjc2FVSkJRV2xDTEVOQlFVTXNUVUZCVFN4RFFVRkRPMU5CUXpGRE8xRkJRMFFzVFVGQlRTeERRVUZETEdsQ1FVRnBRaXhIUVVGSExGbEJRVmtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhEUVVGRE8xRkJRekZFTEUxQlFVMHNRMEZCUXl4alFVRmpMRWRCUVVjc1dVRkJXU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzFGQlJYQkVMSGxDUVVGNVFqdFJRVU42UWl4NVJVRkJlVVU3VVVGRGVrVXNPRUpCUVRoQ08xRkJRemxDTEUxQlFVMHNWMEZCVnl4SFFVRkhMRTlCUVU4c1EwRkJReXhYUVVGWExFTkJRVU03VVVGRGVFTXNUVUZCVFN4RFFVRkRMRmxCUVZrc1IwRkJSeXhaUVVGWkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdVVUZGYUVRc2EwVkJRV3RGTzFGQlEyeEZMR2xHUVVGcFJqdFJRVU5xUml4cFFrRkJhVUk3VVVGRGFrSXNjVWRCUVhGSE8xRkJRM0pITEUxQlFVMHNRMEZCUXl4aFFVRmhMRWRCUVVjc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF6dFJRVVZ3UXpzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMVZCTUVORk8xRkJRMFlzVFVGQlRTeERRVUZETEdGQlFXRXNSMEZCUnl4VFFVRlRMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlF6RkRMRTFCUVUwc1EwRkJReXhsUVVGbExFZEJRVWNzVDBGQlR5eERRVUZETEdGQlFXRXNRMEZCUXp0UlFVTXZReXhOUVVGTkxFTkJRVU1zWlVGQlpTeEhRVUZITEZsQlFWa3NRMEZEYmtNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUTNaRExFTkJRVU03VVVGRlJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXhsUVVGbExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdTVUZEZUVRc1EwRkJRenRKUVVWUExFdEJRVXNzUTBGQlF5eDFRa0ZCZFVJc1EwRkRia01zVDBGQkswTXNSVUZETDBNc1QwRkJUeXhGUVVOUUxGbEJRVzlDTzFGQlJYQkNPenM3T3pzN1ZVRk5SVHRSUVVWR0xEUkNRVUUwUWp0UlFVTTFRaXhwUkVGQmFVUTdVVUZGYWtRN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMVZCTWtSRk8xRkJSVVlzVFVGQlRTeGpRVUZqTEVkQlFVY3NUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJRenRSUVVNeFF5eE5RVUZOTEd0Q1FVRnJRaXhIUVVGSExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTTdVVUZGT1VNc1RVRkJUU3hIUVVGSExFZEJRMUFzVDBGQlR5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRUlzUTBGQlF5eERRVUZETEUxQlFVMHNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTjJReXhEUVVGRExFTkJRVU1zUlVGQlJTeFJRVUZSTEVWQlFVVXNVMEZCVXl4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVVzUTBGQlF6dFJRVU53UkN4TlFVRk5MRmxCUVZrc1IwRkJhVUk3V1VGRGFrTXNVMEZCVXl4RlFVRkZMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETzFsQlEyNURMRkZCUVZFc1JVRkJSU3hQUVVGUE8xbEJRMnBDTEdWQlFXVXNSVUZCUlN4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF6dFpRVU4yUXl4alFVRmpMRVZCUVVVc1QwRkJUeXhEUVVGRExGTkJRVk03V1VGRGFrTXNaVUZCWlN4RlFVRkZMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZETzFsQlF5OURMR05CUVdNc1JVRkJSU3hKUVVGSk8xbEJRM0JDTEhOQ1FVRnpRaXhGUVVGRkxHOUNRVUZ2UWp0WlFVTTFReXhoUVVGaExFVkJRVVVzV1VGQldUdFpRVU16UWl4VFFVRlRMRVZCUVVVc1IwRkJSeXhEUVVGRExGRkJRVkU3V1VGRGRrSXNUVUZCVFN4RlFVRkZMRTlCUVU4c1EwRkJReXhMUVVGTE8xbEJRM0pDTEZGQlFWRXNSVUZCUlN4UFFVRlBMRU5CUVVNc1QwRkJUenRaUVVONlFpeGxRVUZsTEVWQlFVVXNZMEZCWXp0WlFVTXZRaXh2UWtGQmIwSXNSVUZCUlN4WlFVRlpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTTdXVUZEZEVRc1ZVRkJWU3hGUVVGRkxFbEJRVWtzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhYUVVGWExFVkJRVVU3VTBGRGRFUXNRMEZCUXp0UlFVVkdMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEdkQ1FVRm5RaXhGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZETzBsQlF5OUVMRU5CUVVNN1NVRkZSRHM3VDBGRlJ6dEpRVVZMTEV0QlFVc3NRMEZCUXl4dFFrRkJiVUlzUTBGREwwSXNUMEZCT0VNc1JVRkRPVU1zVFVGQlRUdFJRVVZPTEUxQlFVMHNaVUZCWlN4SFFVRkhMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRGJrVXNTVUZCU1R0WlFVTkdMRTFCUVUwc2IwSkJRVzlDTEVkQlFVY3NaVUZCWlN4RFFVRkRMRzlDUVVGdlFpeERRVUZETzFsQlEyeEZMRTFCUVUwc1VVRkJVU3hIUVVGSExFMUJRVTBzYjBKQlFXOUNMRU5CUVVNc1pVRkJaU3hGUVVGRkxFTkJRVU03V1VGRE9VUXNUVUZCVFN4WFFVRlhMRWRCUVVjc1RVRkJUU3h2UWtGQmIwSXNRMEZCUXl4alFVRmpMRVZCUVVVc1EwRkJRenRaUVVOb1JTeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRmRCUVZjc1EwRkRNMElzV1VGQldTeERRVUZETEZGQlFWRXNRMEZCUXl4RlFVTjBRaXhaUVVGWkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlF6RkNMRU5CUVVNN1dVRkRSaXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTjRSRHRSUVVGRExFOUJRVThzUjBGQlJ5eEZRVUZGTzFsQlExbzdPenM3T3pzN1kwRlBSVHRaUVVOR0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNVVUZCVVN4RFFVTjRRaXh0UTBGQmJVTTdaMEpCUTJwRExITkVRVUZ6UkR0blFrRkRkRVFzUjBGQlJ5eERRVUZETEVsQlFVazdaMEpCUTFJc1IwRkJSeXhEUVVGRExFOUJRVTg3WjBKQlExZ3NTVUZCU1R0blFrRkRTaXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVU5hTEVOQlFVTTdXVUZEUml4TlFVRk5MRU5CUVVNc1dVRkJXU3hIUVVGSExGTkJRVk1zUTBGQlF6dFpRVU5vUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGVkJRVlVzUTBGQlF5eG5Ra0ZCWjBJc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dFRRVU40UkR0SlFVTklMRU5CUVVNN1NVRkZSRHM3T3pzN096czdUMEZSUnp0SlFVTkxMRWxCUVVrc1EwRkJReXhaUVVFd1FqdFJRVU55UXl4UFFVRlBMRmxCUVZrc1MwRkJTeXhSUVVGUkxFTkJRVU03U1VGRGJrTXNRMEZCUXp0SlFVVkVMRFJDUVVFMFFqdEpRVU53UWl4TFFVRkxMRU5CUVVNc2EwSkJRV3RDTEVOQlF6bENMRTlCUVRCRExFVkJRekZETEU5QlFVOHNSVUZEVUN4WlFVRlpMRVZCUTFvc1kwRkJZeXhGUVVOa0xHTkJRV003VVVGRlpEczdPenM3T3pzN1ZVRlJSVHRSUVVWR0xFMUJRVTBzUjBGQlJ5eEhRVU5RTEU5QlFVOHNRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMmhDTEVOQlFVTXNRMEZCUXl4TlFVRk5MRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRka01zUTBGQlF5eERRVUZETEVWQlFVVXNVVUZCVVN4RlFVRkZMRk5CUVZNc1JVRkJSU3hUUVVGVExFVkJRVVVzVTBGQlV5eEZRVUZGTEVOQlFVTTdVVUZGY0VRc1RVRkJUU3hOUVVGTkxFZEJRVWNzUlVGQmEwSXNRMEZCUXp0UlFVVnNReXhOUVVGTkxFTkJRVU1zVTBGQlV5eEhRVUZITEZOQlFWTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRE5VTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRE1VSXNUVUZCVFN4RFFVRkRMSE5DUVVGelFpeEhRVUZITEc5Q1FVRnZRaXhEUVVGRE8xRkJRM0pFTEUxQlFVMHNRMEZCUXl4aFFVRmhMRWRCUVVjc1dVRkJXU3hEUVVGRE8xRkJRM0JETEUxQlFVMHNRMEZCUXl4VFFVRlRMRWRCUVVjc1IwRkJSeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU5vUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTTdVVUZET1VJc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRPMUZCUld4RExHMUdRVUZ0Ump0UlFVTnVSaXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNN1VVRkZkRU1zVFVGQlRTeFJRVUZSTEVkQlFVY3NUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJRenRSUVVOdVF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVVYyUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEzaENMRTFCUVUwc1EwRkJReXhIUVVGSExFZEJRVWNzVTBGQlV5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUlRWQ0xFMUJRVTBzWVVGQllTeEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkRja01zVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4WlFVRlpMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU03VVVGRk5VTXNNRVJCUVRCRU8xRkJRekZFTERaRlFVRTJSVHRSUVVNM1JTd3lSVUZCTWtVN1VVRkRNMFVzUlVGQlJUdFJRVU5HTEhGQ1FVRnhRanRSUVVOeVFpd3dRa0ZCTUVJN1VVRkRNVUlzYzBOQlFYTkRPMUZCUTNSRExFbEJRVWs3VVVGRFNpdzBRMEZCTkVNN1VVRkZOVU1zVFVGQlRTeGpRVUZqTEVkQlFVY3NUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJRenRSUVVNeFF5eE5RVUZOTEVOQlFVTXNaVUZCWlN4SFFVRkhMR05CUVdNc1EwRkJRenRSUVVWNFF5eE5RVUZOTEd0Q1FVRnJRaXhIUVVGSExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTTdVVUZET1VNc1RVRkJUU3hEUVVGRExHOUNRVUZ2UWl4SFFVRkhMRmxCUVZrc1EwRkJReXhyUWtGQmEwSXNRMEZCUXl4RFFVRkRPMUZCUlM5RUxFMUJRVTBzV1VGQldTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVXZReXhOUVVGTkxFOUJRVThzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZEYmtJc1NVRkJTU3hSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEyeENMRWxCUVVrc1QwRkJUeXhEUVVGRExHVkJRV1VzUlVGQlJUdFpRVU16UWl4UFFVRlBMRU5CUVVNc1pVRkJaU3hEUVVGRExFZEJRVWNzUTBGQlF5eGpRVUZqTEVOQlFVTXNSVUZCUlR0blFrRkRNME1zVFVGQlRTeEZRVUZGTEVsQlFVa3NSVUZCUlN4TFFVRkxMRVZCUVVVc1IwRkJSeXhqUVVGakxFTkJRVU03WjBKQlEzWkRMRTFCUVUwc1YwRkJWeXhIUVVGSExFVkJRVVVzUTBGQlF6dG5Ra0ZEZGtJc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGNrTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRkRU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRuUWtGRE1VSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRkxFdEJRVXNzVlVGQlZTeEZRVUZGTzI5Q1FVTnlReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETzJsQ1FVTnNRanRaUVVOSUxFTkJRVU1zUTBGQlF5eERRVUZETzFOQlEwbzdVVUZEUkN4TlFVRk5MRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRla01zVFVGQlRTeERRVUZETEZGQlFWRXNSMEZCUnl4WlFVRlpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRmVrTXNTVUZCU1N4alFVRmpMRVZCUVVVN1dVRkRiRUlzU1VGQlNTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExFOUJRVThzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTXpRenRoUVVGTkxFbEJRVWtzWTBGQll5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTzFsQlEzQkVMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03VTBGRE0wTTdZVUZCVFR0WlFVTk1MRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEdkQ1FVRm5RaXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFOQlEzaEVPMGxCUTBnc1EwRkJRenREUVVOR0luMD0iLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuZXhwb3J0IGNsYXNzIEphdmFzY3JpcHRJbnN0cnVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHJlY2VpdmVkIGNhbGwgYW5kIHZhbHVlcyBkYXRhIGZyb20gdGhlIEpTIEluc3RydW1lbnRhdGlvblxuICAgICAqIGludG8gdGhlIGZvcm1hdCB0aGF0IHRoZSBzY2hlbWEgZXhwZWN0cy5cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSBzZW5kZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgcHJvY2Vzc0NhbGxzQW5kVmFsdWVzKGRhdGEsIHNlbmRlcikge1xuICAgICAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICAgICAgdXBkYXRlLmV4dGVuc2lvbl9zZXNzaW9uX3V1aWQgPSBleHRlbnNpb25TZXNzaW9uVXVpZDtcbiAgICAgICAgdXBkYXRlLmV2ZW50X29yZGluYWwgPSBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpO1xuICAgICAgICB1cGRhdGUucGFnZV9zY29wZWRfZXZlbnRfb3JkaW5hbCA9IGRhdGEub3JkaW5hbDtcbiAgICAgICAgdXBkYXRlLndpbmRvd19pZCA9IHNlbmRlci50YWIud2luZG93SWQ7XG4gICAgICAgIHVwZGF0ZS50YWJfaWQgPSBzZW5kZXIudGFiLmlkO1xuICAgICAgICB1cGRhdGUuZnJhbWVfaWQgPSBzZW5kZXIuZnJhbWVJZDtcbiAgICAgICAgdXBkYXRlLnNjcmlwdF91cmwgPSBlc2NhcGVVcmwoZGF0YS5zY3JpcHRVcmwpO1xuICAgICAgICB1cGRhdGUuc2NyaXB0X2xpbmUgPSBlc2NhcGVTdHJpbmcoZGF0YS5zY3JpcHRMaW5lKTtcbiAgICAgICAgdXBkYXRlLnNjcmlwdF9jb2wgPSBlc2NhcGVTdHJpbmcoZGF0YS5zY3JpcHRDb2wpO1xuICAgICAgICB1cGRhdGUuZnVuY19uYW1lID0gZXNjYXBlU3RyaW5nKGRhdGEuZnVuY05hbWUpO1xuICAgICAgICB1cGRhdGUuc2NyaXB0X2xvY19ldmFsID0gZXNjYXBlU3RyaW5nKGRhdGEuc2NyaXB0TG9jRXZhbCk7XG4gICAgICAgIHVwZGF0ZS5jYWxsX3N0YWNrID0gZXNjYXBlU3RyaW5nKGRhdGEuY2FsbFN0YWNrKTtcbiAgICAgICAgdXBkYXRlLnN5bWJvbCA9IGVzY2FwZVN0cmluZyhkYXRhLnN5bWJvbCk7XG4gICAgICAgIHVwZGF0ZS5vcGVyYXRpb24gPSBlc2NhcGVTdHJpbmcoZGF0YS5vcGVyYXRpb24pO1xuICAgICAgICB1cGRhdGUudmFsdWUgPSBlc2NhcGVTdHJpbmcoZGF0YS52YWx1ZSk7XG4gICAgICAgIHVwZGF0ZS50aW1lX3N0YW1wID0gZGF0YS50aW1lU3RhbXA7XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQoc2VuZGVyLnRhYi5pbmNvZ25pdG8pO1xuICAgICAgICAvLyBkb2N1bWVudF91cmwgaXMgdGhlIGN1cnJlbnQgZnJhbWUncyBkb2N1bWVudCBocmVmXG4gICAgICAgIC8vIHRvcF9sZXZlbF91cmwgaXMgdGhlIHRvcC1sZXZlbCBmcmFtZSdzIGRvY3VtZW50IGhyZWZcbiAgICAgICAgdXBkYXRlLmRvY3VtZW50X3VybCA9IGVzY2FwZVVybChzZW5kZXIudXJsKTtcbiAgICAgICAgdXBkYXRlLnRvcF9sZXZlbF91cmwgPSBlc2NhcGVVcmwoc2VuZGVyLnRhYi51cmwpO1xuICAgICAgICBpZiAoZGF0YS5vcGVyYXRpb24gPT09IFwiY2FsbFwiICYmIGRhdGEuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1cGRhdGUuYXJndW1lbnRzID0gZXNjYXBlU3RyaW5nKEpTT04uc3RyaW5naWZ5KGRhdGEuYXJncykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgbWVzc2FnZXMgZnJvbSBwYWdlL2NvbnRlbnQvYmFja2dyb3VuZCBzY3JpcHRzIGluamVjdGVkIHRvIGluc3RydW1lbnQgSmF2YVNjcmlwdCBBUElzXG4gICAgICovXG4gICAgbGlzdGVuKCkge1xuICAgICAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gKG1lc3NhZ2UsIHNlbmRlcikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcImphdmFzY3JpcHQtaW5zdHJ1bWVudGF0aW9uIGJhY2tncm91bmQgbGlzdGVuZXJcIiwge21lc3NhZ2UsIHNlbmRlcn0sIHRoaXMuY29uZmlndXJlZCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5uYW1lc3BhY2UgJiZcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm5hbWVzcGFjZSA9PT0gXCJqYXZhc2NyaXB0LWluc3RydW1lbnRhdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVKc0luc3RydW1lbnRhdGlvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcih0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWl0aGVyIHNlbmRzIHRoZSBsb2cgZGF0YSB0byB0aGUgZGF0YVJlY2VpdmVyIG9yIHN0b3JlIGl0IGluIG1lbW9yeVxuICAgICAqIGFzIGEgcGVuZGluZyByZWNvcmQgaWYgdGhlIEpTIGluc3RydW1lbnRhdGlvbiBpcyBub3QgeWV0IGNvbmZpZ3VyZWRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBzZW5kZXJcbiAgICAgKi9cbiAgICBoYW5kbGVKc0luc3RydW1lbnRhdGlvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyKSB7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9nQ2FsbFwiOlxuICAgICAgICAgICAgY2FzZSBcImxvZ1ZhbHVlXCI6XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gSmF2YXNjcmlwdEluc3RydW1lbnQucHJvY2Vzc0NhbGxzQW5kVmFsdWVzKG1lc3NhZ2UuZGF0YSwgc2VuZGVyKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IHRoaXMuY3Jhd2xJRDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImphdmFzY3JpcHRcIiwgdXBkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMucHVzaCh1cGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgbGlzdGVuaW5nIGlmIGhhdmVuJ3QgZG9uZSBzbyBhbHJlYWR5LCBzZXRzIHRoZSBjcmF3bCBJRCxcbiAgICAgKiBtYXJrcyB0aGUgSlMgaW5zdHJ1bWVudGF0aW9uIGFzIGNvbmZpZ3VyZWQgYW5kIHNlbmRzIGFueSBwZW5kaW5nXG4gICAgICogcmVjb3JkcyB0aGF0IGhhdmUgYmVlbiByZWNlaXZlZCB1cCB1bnRpbCB0aGlzIHBvaW50LlxuICAgICAqIEBwYXJhbSBjcmF3bElEXG4gICAgICovXG4gICAgcnVuKGNyYXdsSUQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Jhd2xJRCA9IGNyYXdsSUQ7XG4gICAgICAgIHRoaXMuY29uZmlndXJlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMubWFwKHVwZGF0ZSA9PiB7XG4gICAgICAgICAgICB1cGRhdGUuY3Jhd2xfaWQgPSB0aGlzLmNyYXdsSUQ7XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdFwiLCB1cGRhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVjb3JkcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMkpoWTJ0bmNtOTFibVF2YW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVU5CTEU5QlFVOHNSVUZCUlN4MVFrRkJkVUlzUlVGQlJTeE5RVUZOTEhkRFFVRjNReXhEUVVGRE8wRkJRMnBHTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzUlVGQlJTeE5RVUZOTEN0Q1FVRXJRaXhEUVVGRE8wRkJRM0pGTEU5QlFVOHNSVUZCUlN4VFFVRlRMRVZCUVVVc1dVRkJXU3hGUVVGRkxGTkJRVk1zUlVGQlJTeE5RVUZOTEhGQ1FVRnhRaXhEUVVGRE8wRkJSM3BGTEUxQlFVMHNUMEZCVHl4dlFrRkJiMEk3U1VFMFF5OUNMRmxCUVZrc1dVRkJXVHRSUVVwb1FpeGxRVUZWTEVkQlFWa3NTMEZCU3l4RFFVRkRPMUZCUXpWQ0xHMUNRVUZqTEVkQlFUQkNMRVZCUVVVc1EwRkJRenRSUVVscVJDeEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMRmxCUVZrc1EwRkJRenRKUVVOdVF5eERRVUZETzBsQk4wTkVPenM3T3p0UFFVdEhPMGxCUTBzc1RVRkJUU3hEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRWxCUVVrc1JVRkJSU3hOUVVGeFFqdFJRVU01UkN4TlFVRk5MRTFCUVUwc1IwRkJSeXhGUVVGNVFpeERRVUZETzFGQlEzcERMRTFCUVUwc1EwRkJReXh6UWtGQmMwSXNSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU55UkN4TlFVRk5MRU5CUVVNc1lVRkJZU3hIUVVGSExIVkNRVUYxUWl4RlFVRkZMRU5CUVVNN1VVRkRha1FzVFVGQlRTeERRVUZETEhsQ1FVRjVRaXhIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdVVUZEYUVRc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVOMlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETzFGQlF6bENMRTFCUVUwc1EwRkJReXhSUVVGUkxFZEJRVWNzVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXp0UlFVTnFReXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEZOQlFWTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03VVVGRE9VTXNUVUZCVFN4RFFVRkRMRmRCUVZjc1IwRkJSeXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMUZCUTI1RUxFMUJRVTBzUTBGQlF5eFZRVUZWTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVU5xUkN4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkRMME1zVFVGQlRTeERRVUZETEdWQlFXVXNSMEZCUnl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzFGQlF6RkVMRTFCUVUwc1EwRkJReXhWUVVGVkxFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZETVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRMmhFTEUxQlFVMHNRMEZCUXl4TFFVRkxMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0UlFVTjRReXhOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNN1VVRkRia01zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4VFFVRlRMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVVnVSQ3h2UkVGQmIwUTdVVUZEY0VRc2RVUkJRWFZFTzFGQlEzWkVMRTFCUVUwc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVNMVF5eE5RVUZOTEVOQlFVTXNZVUZCWVN4SFFVRkhMRk5CUVZNc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUldwRUxFbEJRVWtzU1VGQlNTeERRVUZETEZOQlFWTXNTMEZCU3l4TlFVRk5MRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RlFVRkZPMWxCUTNKRUxFMUJRVTBzUTBGQlF5eFRRVUZUTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkROVVE3VVVGRlJDeFBRVUZQTEUxQlFVMHNRMEZCUXp0SlFVTm9RaXhEUVVGRE8wbEJWMFE3TzA5QlJVYzdTVUZEU1N4TlFVRk5PMUZCUTFnc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4SFFVRkhMRU5CUVVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUlVGQlJTeEZRVUZGTzFsQlF6TkRMSFZIUVVGMVJ6dFpRVU4yUnl4SlFVTkZMRTlCUVU4c1EwRkJReXhUUVVGVE8yZENRVU5xUWl4UFFVRlBMRU5CUVVNc1UwRkJVeXhMUVVGTExEUkNRVUUwUWl4RlFVTnNSRHRuUWtGRFFTeEpRVUZKTEVOQlFVTXNPRUpCUVRoQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMkZCUTNSRU8xRkJRMGdzUTBGQlF5eERRVUZETzFGQlEwWXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzBsQlEyaEZMRU5CUVVNN1NVRkZSRHM3T3pzN1QwRkxSenRKUVVOSkxEaENRVUU0UWl4RFFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGeFFqdFJRVU5zUlN4UlFVRlJMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVU3V1VGRGNFSXNTMEZCU3l4VFFVRlRMRU5CUVVNN1dVRkRaaXhMUVVGTExGVkJRVlU3WjBKQlEySXNUVUZCVFN4TlFVRk5MRWRCUVVjc2IwSkJRVzlDTEVOQlFVTXNjVUpCUVhGQ0xFTkJRM1pFTEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUTFvc1RVRkJUU3hEUVVOUUxFTkJRVU03WjBKQlEwWXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hGUVVGRk8yOUNRVU51UWl4TlFVRk5MRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdiMEpCUXk5Q0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMRmxCUVZrc1JVRkJSU3hOUVVGTkxFTkJRVU1zUTBGQlF6dHBRa0ZEY0VRN2NVSkJRVTA3YjBKQlEwd3NTVUZCU1N4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdhVUpCUTJ4RE8yZENRVU5FTEUxQlFVMDdVMEZEVkR0SlFVTklMRU5CUVVNN1NVRkZSRHM3T3pzN1QwRkxSenRKUVVOSkxFZEJRVWNzUTBGQlF5eFBRVUZQTzFGQlEyaENMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zYVVKQlFXbENMRVZCUVVVN1dVRkRNMElzU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRPMU5CUTJZN1VVRkRSQ3hKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEU5QlFVOHNRMEZCUXp0UlFVTjJRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTjJRaXhKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSVHRaUVVNdlFpeE5RVUZOTEVOQlFVTXNVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03V1VGREwwSXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhWUVVGVkxFTkJRVU1zV1VGQldTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMUZCUTNKRUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEwd3NRMEZCUXp0SlFVVk5MRTlCUVU4N1VVRkRXaXhKUVVGSkxFTkJRVU1zWTBGQll5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1JVRkJSVHRaUVVNeFFpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03VTBGRGJFVTdTVUZEU0N4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IFBlbmRpbmdOYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLW5hdmlnYXRpb25cIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuaW1wb3J0IHsgbWFrZVVVSUQgfSBmcm9tIFwiLi4vbGliL3V1aWRcIjtcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1XZWJOYXZpZ2F0aW9uQmFzZUV2ZW50RGV0YWlsc1RvT3BlbldQTVNjaGVtYSA9IGFzeW5jIChjcmF3bElELCBkZXRhaWxzKSA9PiB7XG4gICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHdpbmRvd0lkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbmNvZ25pdG86IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvb2tpZVN0b3JlSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9wZW5lclRhYklkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgY29uc3Qgd2luZG93ID0gdGFiLndpbmRvd0lkXG4gICAgICAgID8gYXdhaXQgYnJvd3Nlci53aW5kb3dzLmdldCh0YWIud2luZG93SWQpXG4gICAgICAgIDogeyB3aWR0aDogdW5kZWZpbmVkLCBoZWlnaHQ6IHVuZGVmaW5lZCwgdHlwZTogdW5kZWZpbmVkIH07XG4gICAgY29uc3QgbmF2aWdhdGlvbiA9IHtcbiAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgIGluY29nbml0bzogYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pLFxuICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgcHJvY2Vzc19pZDogZGV0YWlscy5wcm9jZXNzSWQsXG4gICAgICAgIHdpbmRvd19pZDogdGFiLndpbmRvd0lkLFxuICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgIHRhYl9vcGVuZXJfdGFiX2lkOiB0YWIub3BlbmVyVGFiSWQsXG4gICAgICAgIGZyYW1lX2lkOiBkZXRhaWxzLmZyYW1lSWQsXG4gICAgICAgIHdpbmRvd193aWR0aDogd2luZG93LndpZHRoLFxuICAgICAgICB3aW5kb3dfaGVpZ2h0OiB3aW5kb3cuaGVpZ2h0LFxuICAgICAgICB3aW5kb3dfdHlwZTogd2luZG93LnR5cGUsXG4gICAgICAgIHRhYl93aWR0aDogdGFiLndpZHRoLFxuICAgICAgICB0YWJfaGVpZ2h0OiB0YWIuaGVpZ2h0LFxuICAgICAgICB0YWJfY29va2llX3N0b3JlX2lkOiBlc2NhcGVTdHJpbmcodGFiLmNvb2tpZVN0b3JlSWQpLFxuICAgICAgICB1dWlkOiBtYWtlVVVJRCgpLFxuICAgICAgICB1cmw6IGVzY2FwZVVybChkZXRhaWxzLnVybCksXG4gICAgfTtcbiAgICByZXR1cm4gbmF2aWdhdGlvbjtcbn07XG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgc3RhdGljIG5hdmlnYXRpb25JZChwcm9jZXNzSWQsIHRhYklkLCBmcmFtZUlkKSB7XG4gICAgICAgIHJldHVybiBgJHtwcm9jZXNzSWR9LSR7dGFiSWR9LSR7ZnJhbWVJZH1gO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lciA9IGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uSWQgPSBOYXZpZ2F0aW9uSW5zdHJ1bWVudC5uYXZpZ2F0aW9uSWQoZGV0YWlscy5wcm9jZXNzSWQsIGRldGFpbHMudGFiSWQsIGRldGFpbHMuZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nTmF2aWdhdGlvbiA9IHRoaXMuaW5zdGFudGlhdGVQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbiA9IGF3YWl0IHRyYW5zZm9ybVdlYk5hdmlnYXRpb25CYXNlRXZlbnREZXRhaWxzVG9PcGVuV1BNU2NoZW1hKGNyYXdsSUQsIGRldGFpbHMpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5wYXJlbnRfZnJhbWVfaWQgPSBkZXRhaWxzLnBhcmVudEZyYW1lSWQ7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsID0gaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXAgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVPbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uKG5hdmlnYXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25CZWZvcmVOYXZpZ2F0ZS5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMub25Db21taXR0ZWRMaXN0ZW5lciA9IGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uSWQgPSBOYXZpZ2F0aW9uSW5zdHJ1bWVudC5uYXZpZ2F0aW9uSWQoZGV0YWlscy5wcm9jZXNzSWQsIGRldGFpbHMudGFiSWQsIGRldGFpbHMuZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uID0gYXdhaXQgdHJhbnNmb3JtV2ViTmF2aWdhdGlvbkJhc2VFdmVudERldGFpbHNUb09wZW5XUE1TY2hlbWEoY3Jhd2xJRCwgZGV0YWlscyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRyYW5zaXRpb25fcXVhbGlmaWVycyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkZXRhaWxzLnRyYW5zaXRpb25RdWFsaWZpZXJzKSk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRyYW5zaXRpb25fdHlwZSA9IGVzY2FwZVN0cmluZyhkZXRhaWxzLnRyYW5zaXRpb25UeXBlKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uY29tbWl0dGVkX2V2ZW50X29yZGluYWwgPSBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5jb21taXR0ZWRfdGltZV9zdGFtcCA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgLy8gaW5jbHVkZSBhdHRyaWJ1dGVzIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgb25CZWZvcmVOYXZpZ2F0aW9uIGV2ZW50XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nTmF2aWdhdGlvbiA9IHRoaXMuZ2V0UGVuZGluZ05hdmlnYXRpb24obmF2aWdhdGlvbklkKTtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbihuYXZpZ2F0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVkV2l0aGluVGltZW91dCgxMDAwKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IGF3YWl0IHBlbmRpbmdOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb247XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX2V2ZW50X29yZGluYWw7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXAgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfdGltZV9zdGFtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwibmF2aWdhdGlvbnNcIiwgbmF2aWdhdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkNvbW1pdHRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tbWl0dGVkTGlzdGVuZXIpO1xuICAgIH1cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZU5hdmlnYXRlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkJlZm9yZU5hdmlnYXRlLnJlbW92ZUxpc3RlbmVyKHRoaXMub25CZWZvcmVOYXZpZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW50aWF0ZVBlbmRpbmdOYXZpZ2F0aW9uKG5hdmlnYXRpb25JZCkge1xuICAgICAgICB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdID0gbmV3IFBlbmRpbmdOYXZpZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdO1xuICAgIH1cbiAgICBnZXRQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ05hdmlnYXRpb25zW25hdmlnYXRpb25JZF07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm1GMmFXZGhkR2x2YmkxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZibUYyYVdkaGRHbHZiaTFwYm5OMGNuVnRaVzUwTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMRTlCUVU4c1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4TlFVRk5MSGREUVVGM1F5eERRVUZETzBGQlEycEdMRTlCUVU4c1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4TlFVRk5MQ3RDUVVFclFpeERRVUZETzBGQlEzSkZMRTlCUVU4c1JVRkJSU3hwUWtGQmFVSXNSVUZCUlN4TlFVRk5MREpDUVVFeVFpeERRVUZETzBGQlF6bEVMRTlCUVU4c1JVRkJSU3hUUVVGVExFVkJRVVVzV1VGQldTeEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MSEZDUVVGeFFpeERRVUZETzBGQlEzcEZMRTlCUVU4c1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeGhRVUZoTEVOQlFVTTdRVUZSZGtNc1RVRkJUU3hEUVVGRExFMUJRVTBzY1VSQlFYRkVMRWRCUVVjc1MwRkJTeXhGUVVONFJTeFBRVUZQTEVWQlExQXNUMEZCYzBNc1JVRkRha0lzUlVGQlJUdEpRVU4yUWl4TlFVRk5MRWRCUVVjc1IwRkRVQ3hQUVVGUExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTm9RaXhEUVVGRExFTkJRVU1zVFVGQlRTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlEzWkRMRU5CUVVNc1EwRkJRenRaUVVORkxGRkJRVkVzUlVGQlJTeFRRVUZUTzFsQlEyNUNMRk5CUVZNc1JVRkJSU3hUUVVGVE8xbEJRM0JDTEdGQlFXRXNSVUZCUlN4VFFVRlRPMWxCUTNoQ0xGZEJRVmNzUlVGQlJTeFRRVUZUTzFsQlEzUkNMRXRCUVVzc1JVRkJSU3hUUVVGVE8xbEJRMmhDTEUxQlFVMHNSVUZCUlN4VFFVRlRPMU5CUTJ4Q0xFTkJRVU03U1VGRFVpeE5RVUZOTEUxQlFVMHNSMEZCUnl4SFFVRkhMRU5CUVVNc1VVRkJVVHRSUVVONlFpeERRVUZETEVOQlFVTXNUVUZCVFN4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTNwRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4VFFVRlRMRVZCUVVVc1RVRkJUU3hGUVVGRkxGTkJRVk1zUlVGQlJTeEpRVUZKTEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1NVRkROMFFzVFVGQlRTeFZRVUZWTEVkQlFXVTdVVUZETjBJc1VVRkJVU3hGUVVGRkxFOUJRVTg3VVVGRGFrSXNVMEZCVXl4RlFVRkZMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEyNURMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRSUVVNMVF5eFZRVUZWTEVWQlFVVXNUMEZCVHl4RFFVRkRMRk5CUVZNN1VVRkROMElzVTBGQlV5eEZRVUZGTEVkQlFVY3NRMEZCUXl4UlFVRlJPMUZCUTNaQ0xFMUJRVTBzUlVGQlJTeFBRVUZQTEVOQlFVTXNTMEZCU3p0UlFVTnlRaXhwUWtGQmFVSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1YwRkJWenRSUVVOc1F5eFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkRMRTlCUVU4N1VVRkRla0lzV1VGQldTeEZRVUZGTEUxQlFVMHNRMEZCUXl4TFFVRkxPMUZCUXpGQ0xHRkJRV0VzUlVGQlJTeE5RVUZOTEVOQlFVTXNUVUZCVFR0UlFVTTFRaXhYUVVGWExFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVazdVVUZEZUVJc1UwRkJVeXhGUVVGRkxFZEJRVWNzUTBGQlF5eExRVUZMTzFGQlEzQkNMRlZCUVZVc1JVRkJSU3hIUVVGSExFTkJRVU1zVFVGQlRUdFJRVU4wUWl4dFFrRkJiVUlzUlVGQlJTeFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJRenRSUVVOd1JDeEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkZPMUZCUTJoQ0xFZEJRVWNzUlVGQlJTeFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRMUVVNMVFpeERRVUZETzBsQlEwWXNUMEZCVHl4VlFVRlZMRU5CUVVNN1FVRkRjRUlzUTBGQlF5eERRVUZETzBGQlJVWXNUVUZCVFN4UFFVRlBMRzlDUVVGdlFqdEpRVmN2UWl4WlFVRlpMRmxCUVZrN1VVRkthRUlzZFVKQlFXdENMRWRCUlhSQ0xFVkJRVVVzUTBGQlF6dFJRVWRNTEVsQlFVa3NRMEZCUXl4WlFVRlpMRWRCUVVjc1dVRkJXU3hEUVVGRE8wbEJRMjVETEVOQlFVTTdTVUZhVFN4TlFVRk5MRU5CUVVNc1dVRkJXU3hEUVVGRExGTkJRVk1zUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHp0UlFVTnNSQ3hQUVVGUExFZEJRVWNzVTBGQlV5eEpRVUZKTEV0QlFVc3NTVUZCU1N4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVNMVF5eERRVUZETzBsQldVMHNSMEZCUnl4RFFVRkRMRTlCUVU4N1VVRkRhRUlzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhIUVVGSExFdEJRVXNzUlVGRGJrTXNUMEZCYTBRc1JVRkRiRVFzUlVGQlJUdFpRVU5HTEUxQlFVMHNXVUZCV1N4SFFVRkhMRzlDUVVGdlFpeERRVUZETEZsQlFWa3NRMEZEY0VRc1QwRkJUeXhEUVVGRExGTkJRVk1zUlVGRGFrSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1JVRkRZaXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVU5vUWl4RFFVRkRPMWxCUTBZc1RVRkJUU3hwUWtGQmFVSXNSMEZCUnl4SlFVRkpMRU5CUVVNc05FSkJRVFJDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1dVRkRNVVVzVFVGQlRTeFZRVUZWTEVkQlFXVXNUVUZCVFN4eFJFRkJjVVFzUTBGRGVFWXNUMEZCVHl4RlFVTlFMRTlCUVU4c1EwRkRVaXhEUVVGRE8xbEJRMFlzVlVGQlZTeERRVUZETEdWQlFXVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRE8xbEJRMjVFTEZWQlFWVXNRMEZCUXl3MlFrRkJOa0lzUjBGQlJ5eDFRa0ZCZFVJc1JVRkJSU3hEUVVGRE8xbEJRM0pGTEZWQlFWVXNRMEZCUXl3d1FrRkJNRUlzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZET1VNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGRGJFSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRaUVVOb1FpeHBRa0ZCYVVJc1EwRkJReXh6UTBGQmMwTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOMlJTeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRmRCUVZjc1EwRkRhRVFzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhEUVVNNVFpeERRVUZETzFGQlEwWXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEhRVUZITEV0QlFVc3NSVUZET1VJc1QwRkJOa01zUlVGRE4wTXNSVUZCUlR0WlFVTkdMRTFCUVUwc1dVRkJXU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRMRmxCUVZrc1EwRkRjRVFzVDBGQlR5eERRVUZETEZOQlFWTXNSVUZEYWtJc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGRFlpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVTm9RaXhEUVVGRE8xbEJRMFlzVFVGQlRTeFZRVUZWTEVkQlFXVXNUVUZCVFN4eFJFRkJjVVFzUTBGRGVFWXNUMEZCVHl4RlFVTlFMRTlCUVU4c1EwRkRVaXhEUVVGRE8xbEJRMFlzVlVGQlZTeERRVUZETEhGQ1FVRnhRaXhIUVVGSExGbEJRVmtzUTBGRE4wTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zYjBKQlFXOUNMRU5CUVVNc1EwRkROME1zUTBGQlF6dFpRVU5HTEZWQlFWVXNRMEZCUXl4bFFVRmxMRWRCUVVjc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0WlFVTnNSU3hWUVVGVkxFTkJRVU1zZFVKQlFYVkNMRWRCUVVjc2RVSkJRWFZDTEVWQlFVVXNRMEZCUXp0WlFVTXZSQ3hWUVVGVkxFTkJRVU1zYjBKQlFXOUNMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRM2hETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUTJ4Q0xFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZGYUVJc2NVVkJRWEZGTzFsQlEzSkZMRTFCUVUwc2FVSkJRV2xDTEVkQlFVY3NTVUZCU1N4RFFVRkRMRzlDUVVGdlFpeERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRPMWxCUTJ4RkxFbEJRVWtzYVVKQlFXbENMRVZCUVVVN1owSkJRM0pDTEdsQ1FVRnBRaXhEUVVGRExHbERRVUZwUXl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8yZENRVU5vUlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhOUVVGTkxHbENRVUZwUWl4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOeVJTeEpRVUZKTEZGQlFWRXNSVUZCUlR0dlFrRkRXaXhOUVVGTkxDdENRVUVyUWl4SFFVRkhMRTFCUVUwc2FVSkJRV2xDTEVOQlFVTXNLMEpCUVN0Q0xFTkJRVU03YjBKQlEyaEhMRlZCUVZVc1EwRkJReXhsUVVGbE8zZENRVU40UWl3clFrRkJLMElzUTBGQlF5eGxRVUZsTEVOQlFVTTdiMEpCUTJ4RUxGVkJRVlVzUTBGQlF5dzJRa0ZCTmtJN2QwSkJRM1JETEN0Q1FVRXJRaXhEUVVGRExEWkNRVUUyUWl4RFFVRkRPMjlDUVVOb1JTeFZRVUZWTEVOQlFVTXNNRUpCUVRCQ08zZENRVU51UXl3clFrRkJLMElzUTBGQlF5d3dRa0ZCTUVJc1EwRkJRenRwUWtGRE9VUTdZVUZEUmp0WlFVVkVMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEdGQlFXRXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVNeFJDeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExGZEJRVmNzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdTVUZETVVVc1EwRkJRenRKUVVWTkxFOUJRVTg3VVVGRFdpeEpRVUZKTEVsQlFVa3NRMEZCUXl4M1FrRkJkMElzUlVGQlJUdFpRVU5xUXl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMR05CUVdNc1EwRkRia1FzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhEUVVNNVFpeERRVUZETzFOQlEwZzdVVUZEUkN4SlFVRkpMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNSVUZCUlR0WlFVTTFRaXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEZkQlFWY3NRMEZCUXl4alFVRmpMRU5CUXpsRExFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1EwRkRla0lzUTBGQlF6dFRRVU5JTzBsQlEwZ3NRMEZCUXp0SlFVVlBMRFJDUVVFMFFpeERRVU5zUXl4WlFVRnZRanRSUVVWd1FpeEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zV1VGQldTeERRVUZETEVkQlFVY3NTVUZCU1N4cFFrRkJhVUlzUlVGQlJTeERRVUZETzFGQlEyaEZMRTlCUVU4c1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8wbEJReTlETEVOQlFVTTdTVUZGVHl4dlFrRkJiMElzUTBGQlF5eFpRVUZ2UWp0UlFVTXZReXhQUVVGUExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dEpRVU12UXl4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBpbnN0cnVtZW50RmluZ2VycHJpbnRpbmdBcGlzIH0gZnJvbSBcIi4uL2xpYi9pbnN0cnVtZW50LWZpbmdlcnByaW50aW5nLWFwaXNcIjtcbmltcG9ydCB7IGpzSW5zdHJ1bWVudHMgfSBmcm9tIFwiLi4vbGliL2pzLWluc3RydW1lbnRzXCI7XG5pbXBvcnQgeyBwYWdlU2NyaXB0IH0gZnJvbSBcIi4vamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGVcIjtcbmZ1bmN0aW9uIGdldFBhZ2VTY3JpcHRBc1N0cmluZygpIHtcbiAgICByZXR1cm4gKGpzSW5zdHJ1bWVudHMgK1xuICAgICAgICBcIlxcblwiICtcbiAgICAgICAgaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpcyArXG4gICAgICAgIFwiXFxuXCIgK1xuICAgICAgICBcIihcIiArXG4gICAgICAgIHBhZ2VTY3JpcHQgK1xuICAgICAgICBcIih7anNJbnN0cnVtZW50cywgaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpc30pKTtcIik7XG59XG5mdW5jdGlvbiBpbnNlcnRTY3JpcHQodGV4dCwgZGF0YSkge1xuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzY3JpcHQudGV4dCA9IHRleHQ7XG4gICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIGtleS5yZXBsYWNlKFwiX1wiLCBcIi1cIiksIGRhdGFba2V5XSk7XG4gICAgfVxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoc2NyaXB0LCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHNjcmlwdCk7XG59XG5mdW5jdGlvbiBlbWl0TXNnKHR5cGUsIG1zZykge1xuICAgIG1zZy50aW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgbmFtZXNwYWNlOiBcImphdmFzY3JpcHQtaW5zdHJ1bWVudGF0aW9uXCIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGRhdGE6IG1zZyxcbiAgICB9KTtcbn1cbmNvbnN0IGV2ZW50X2lkID0gTWF0aC5yYW5kb20oKTtcbi8vIGxpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgc2NyaXB0IHdlIGFyZSBhYm91dCB0byBpbnNlcnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRfaWQudG9TdHJpbmcoKSwgZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBwYXNzIHRoZXNlIG9uIHRvIHRoZSBiYWNrZ3JvdW5kIHBhZ2VcbiAgICBjb25zdCBtc2dzID0gZS5kZXRhaWw7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobXNncykpIHtcbiAgICAgICAgbXNncy5mb3JFYWNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGVtaXRNc2cobXNnLnR5cGUsIG1zZy5jb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlbWl0TXNnKG1zZ3MudHlwZSwgbXNncy5jb250ZW50KTtcbiAgICB9XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RKYXZhc2NyaXB0SW5zdHJ1bWVudFBhZ2VTY3JpcHQodGVzdGluZyA9IGZhbHNlKSB7XG4gICAgaW5zZXJ0U2NyaXB0KGdldFBhZ2VTY3JpcHRBc1N0cmluZygpLCB7XG4gICAgICAgIGV2ZW50X2lkLFxuICAgICAgICB0ZXN0aW5nLFxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW1GMllYTmpjbWx3ZEMxcGJuTjBjblZ0Wlc1MExXTnZiblJsYm5RdGMyTnZjR1V1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12WTI5dWRHVnVkQzlxWVhaaGMyTnlhWEIwTFdsdWMzUnlkVzFsYm5RdFkyOXVkR1Z1ZEMxelkyOXdaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEVWQlFVVXNORUpCUVRSQ0xFVkJRVVVzVFVGQlRTeDFRMEZCZFVNc1EwRkJRenRCUVVOeVJpeFBRVUZQTEVWQlFVVXNZVUZCWVN4RlFVRkZMRTFCUVUwc2RVSkJRWFZDTEVOQlFVTTdRVUZEZEVRc1QwRkJUeXhGUVVGRkxGVkJRVlVzUlVGQlJTeE5RVUZOTEc5RFFVRnZReXhEUVVGRE8wRkJSV2hGTEZOQlFWTXNjVUpCUVhGQ08wbEJRelZDTEU5QlFVOHNRMEZEVEN4aFFVRmhPMUZCUTJJc1NVRkJTVHRSUVVOS0xEUkNRVUUwUWp0UlFVTTFRaXhKUVVGSk8xRkJRMG9zUjBGQlJ6dFJRVU5JTEZWQlFWVTdVVUZEVml4dFJFRkJiVVFzUTBGRGNFUXNRMEZCUXp0QlFVTktMRU5CUVVNN1FVRkZSQ3hUUVVGVExGbEJRVmtzUTBGQlF5eEpRVUZKTEVWQlFVVXNTVUZCU1R0SlFVTTVRaXhOUVVGTkxFMUJRVTBzUjBGQlJ5eFJRVUZSTEVOQlFVTXNaVUZCWlN4RlFVTnlReXhOUVVGTkxFZEJRVWNzVVVGQlVTeERRVUZETEdGQlFXRXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNMVF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVOdVFpeE5RVUZOTEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVWeVFpeExRVUZMTEUxQlFVMHNSMEZCUnl4SlFVRkpMRWxCUVVrc1JVRkJSVHRSUVVOMFFpeE5RVUZOTEVOQlFVTXNXVUZCV1N4RFFVRkRMRTlCUVU4c1IwRkJSeXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0TFFVTnFSVHRKUVVWRUxFMUJRVTBzUTBGQlF5eFpRVUZaTEVOQlFVTXNUVUZCVFN4RlFVRkZMRTFCUVUwc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dEpRVU12UXl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETzBGQlF6ZENMRU5CUVVNN1FVRkZSQ3hUUVVGVExFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVXNSMEZCUnp0SlFVTjRRaXhIUVVGSExFTkJRVU1zVTBGQlV5eEhRVUZITEVsQlFVa3NTVUZCU1N4RlFVRkZMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03U1VGRGVrTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhYUVVGWExFTkJRVU03VVVGRE1VSXNVMEZCVXl4RlFVRkZMRFJDUVVFMFFqdFJRVU4yUXl4SlFVRkpPMUZCUTBvc1NVRkJTU3hGUVVGRkxFZEJRVWM3UzBGRFZpeERRVUZETEVOQlFVTTdRVUZEVEN4RFFVRkRPMEZCUlVRc1RVRkJUU3hSUVVGUkxFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRPMEZCUlM5Q0xEWkVRVUUyUkR0QlFVTTNSQ3hSUVVGUkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1VVRkJVU3hEUVVGRExGRkJRVkVzUlVGQlJTeEZRVUZGTEZWQlFWTXNRMEZCWXp0SlFVTndSU3gxUTBGQmRVTTdTVUZEZGtNc1RVRkJUU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXp0SlFVTjBRaXhKUVVGSkxFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1VVRkRka0lzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlRMRWRCUVVjN1dVRkRka0lzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlEycERMRU5CUVVNc1EwRkJReXhEUVVGRE8wdEJRMG83VTBGQlRUdFJRVU5NTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0TFFVTnNRenRCUVVOSUxFTkJRVU1zUTBGQlF5eERRVUZETzBGQlJVZ3NUVUZCVFN4VlFVRlZMRzlEUVVGdlF5eERRVUZETEU5QlFVOHNSMEZCUnl4TFFVRkxPMGxCUTJ4RkxGbEJRVmtzUTBGQlF5eHhRa0ZCY1VJc1JVRkJSU3hGUVVGRk8xRkJRM0JETEZGQlFWRTdVVUZEVWl4UFFVRlBPMHRCUTFJc1EwRkJReXhEUVVGRE8wRkJRMHdzUTBGQlF5SjkiLCIvLyBDb2RlIGJlbG93IGlzIG5vdCBhIGNvbnRlbnQgc2NyaXB0OiBubyBGaXJlZm94IEFQSXMgc2hvdWxkIGJlIHVzZWRcbi8vIEFsc28sIG5vIHdlYnBhY2svZXM2IGltcG9ydHMgbWF5IGJlIHVzZWQgaW4gdGhpcyBmaWxlIHNpbmNlIHRoZSBzY3JpcHRcbi8vIGlzIGV4cG9ydGVkIGFzIGEgcGFnZSBzY3JpcHQgYXMgYSBzdHJpbmdcbmV4cG9ydCBjb25zdCBwYWdlU2NyaXB0ID0gZnVuY3Rpb24gKHsganNJbnN0cnVtZW50cywgfSkge1xuICAgIC8vIG1lc3NhZ2VzIHRoZSBpbmplY3RlZCBzY3JpcHRcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZXNUb0xvZ2dlcigkZXZlbnRfaWQsIG1lc3NhZ2VzKSB7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCRldmVudF9pZCwge1xuICAgICAgICAgICAgZGV0YWlsOiBtZXNzYWdlcyxcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCBldmVudF9pZCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ldmVudC1pZFwiKTtcbiAgICBjb25zdCB7IGluc3RydW1lbnRPYmplY3QsIFxuICAgIC8vIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSxcbiAgICBsb2dDYWxsLCB9ID0ganNJbnN0cnVtZW50cyhldmVudF9pZCwgc2VuZE1lc3NhZ2VzVG9Mb2dnZXIpO1xuICAgIGNvbnN0IHRlc3RpbmcgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtdGVzdGluZ1wiKSA9PT0gXCJ0cnVlXCI7XG4gICAgaWYgKHRlc3RpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBDdXJyZW50bHkgdGVzdGluZ1wiKTtcbiAgICAgICAgd2luZG93Lmluc3RydW1lbnRPYmplY3QgPSBpbnN0cnVtZW50T2JqZWN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmViaWQuanNcbiAgICAgKi9cbiAgICBjb25zdCB3YWl0VW50aWwgPSBldmFsdWF0b3IgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE5vdGU6IFNpbmNlIGJlc3QgcHJhY3RpY2UgZm9yIHNjcmlwdHMgY29uc3VtaW5nIFByZWJpZC5qcyBpc1xuICAgICAgICAgICAgICogdG8gc2V0IHVwIGFuIHdpbmRvdy5wYmpzIG9iamVjdCBhbmQgd2luZG93LnBianMucXVlIGFycmF5IGV2ZW5cbiAgICAgICAgICAgICAqIGJlZm9yZSBwYmpzIGxvYWRzLCB3ZSBjYW4ndCBzaW1wbHkgd2FpdCBmb3Igd2luZG93LnBianMsXG4gICAgICAgICAgICAgKiBidXQgaW5zdGVhZCB3YWl0IGZvciB3aW5kb3cucGJqcy5vbkV2ZW50LCB3aGljaCBvbmx5IGdldHMgc2V0XG4gICAgICAgICAgICAgKiBvbmNlIFByZWJpZC5qcyBoYXMgbG9hZGVkLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVjaygpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZhbHVhdG9yKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgY2hlY2tpbmcgZm9yIDEwIHNlY29uZHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBub3cgPCAxMDAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVjaywgMTApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdG9wcGVkIGNoZWNraW5nIGZvciBQcmViaWQuanMgbG9hZGluZyBpbiBhIGZyYW1lICgxMHMgaGF2ZSBwYXNzZWQpXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb25zIHRvIHdhaXQgZm9yIFByZWJpZC5qcyB0byBiZSBhdmFpbGFibGVcbiAgICAgKlxuICAgICAqIE5vdGU6IFNpbmNlIGJlc3QgcHJhY3RpY2UgZm9yIHNjcmlwdHMgY29uc3VtaW5nIFByZWJpZC5qcyBpc1xuICAgICAqIHRvIHNldCB1cCBhbiB3aW5kb3cucGJqcyBvYmplY3QgYW5kIHdpbmRvdy5wYmpzLnF1ZSBhcnJheSBldmVuXG4gICAgICogYmVmb3JlIHBianMgbG9hZHMsIHdlIGNhbid0IHNpbXBseSB3YWl0IGZvciB3aW5kb3cucGJqcyxcbiAgICAgKiBidXQgaW5zdGVhZCB3YWl0IGZvciB3aW5kb3cucGJqcy5vbkV2ZW50LCB3aGljaCBvbmx5IGdldHMgc2V0XG4gICAgICogb25jZSBQcmViaWQuanMgaGFzIGxvYWRlZC5cbiAgICAgKi9cbiAgICBjb25zdCBwcmViaWRKc1BsYWNlaG9sZGVyQXZhaWxhYmxlID0gd2FpdFVudGlsKCgpID0+IHR5cGVvZiB3aW5kb3cucGJqcyAhPT0gXCJ1bmRlZmluZWRcIik7XG4gICAgY29uc3QgcHJlYmlkSnNBdmFpbGFibGUgPSB3YWl0VW50aWwoKCkgPT4gdHlwZW9mIHdpbmRvdy5wYmpzICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cucGJqcy5vbkV2ZW50ICE9PSBcInVuZGVmaW5lZFwiKTtcbiAgICBsZXQgY3VycmVudGx5SW5zdHJ1bWVudGVkUGJqc1ZlcnNpb247XG4gICAgcHJlYmlkSnNQbGFjZWhvbGRlckF2YWlsYWJsZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmViaWQuanMgcGxhY2Vob2xkZXIgYXZhaWxhYmxlIC0gaW5zdHJ1bWVudGluZy4uLlwiKTtcbiAgICAgICAgY3VycmVudGx5SW5zdHJ1bWVudGVkUGJqc1ZlcnNpb24gPVxuICAgICAgICAgICAgd2luZG93LnBianMudmVyc2lvbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBTdHJpbmcod2luZG93LnBianMudmVyc2lvbilcbiAgICAgICAgICAgICAgICA6IFwicGxhY2Vob2xkZXJcIjtcbiAgICAgICAgLy8gSW5zdHJ1bWVudCBhY2Nlc3MgdG8gb2JqZWN0IHByb3BlcnRpZXMgYW5kIGZ1bmN0aW9uc1xuICAgICAgICBjb25zdCBvYmplY3ROYW1lID0gXCJwYmpzPFwiICsgY3VycmVudGx5SW5zdHJ1bWVudGVkUGJqc1ZlcnNpb24gKyBcIj5cIjtcbiAgICAgICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cucGJqcywgb2JqZWN0TmFtZSwge30pO1xuICAgIH0pO1xuICAgIHByZWJpZEpzQXZhaWxhYmxlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudGx5SW5zdHJ1bWVudGVkUGJqc1ZlcnNpb24gPT09IHdpbmRvdy5wYmpzLnZlcnNpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWJpZC5qcyBsb2FkZWQgYW5kIGRpZmZlcmVudCBmcm9tIHdoYXQgd2UgcHJldmlvdXNseSBpbnN0cnVtZW50aW5nIC0gaW5zdHJ1bWVudGluZyBhbmV3Li4uXCIpO1xuICAgICAgICBjdXJyZW50bHlJbnN0cnVtZW50ZWRQYmpzVmVyc2lvbiA9IHdpbmRvdy5wYmpzLnZlcnNpb247XG4gICAgICAgIGNvbnN0IG9iamVjdE5hbWUgPSBcInBianM8XCIgKyBjdXJyZW50bHlJbnN0cnVtZW50ZWRQYmpzVmVyc2lvbiArIFwiPlwiO1xuICAgICAgICAvLyBJbnN0cnVtZW50IGV2ZW50cyAoSGFjaywgc2luY2UgT3BlbldQTSBkb2VzIG5vdCBzdXBwb3J0IGluc3RydW1lbnRhdGlvbiBvZiBldmVudHMgY3VycmVudGx5KVxuICAgICAgICBjb25zdCBpbnN0cnVtZW50UHJlYmlkSnNFdmVudCA9IGV2ZW50UmVmZXJlbmNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQcmViaWQuanMgZXZlbnRcIiwgeyBldmVudFJlZmVyZW5jZSwgZXZlbnQgfSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIE1vc3QgZG9uJ3QsIGJ1dCBzb21lIGV2ZW50cyBjb250YWlucyBzb21lIGluZm9ybWF0aW9uIGFib3V0IGl0J3MgY2FsbCBjb250ZXh0OlxuICAgICAgICAgICAgICAgIGNhbm9uaWNhbFVybDogdW5kZWZpbmVk4oCL4oCL4oCLXG4gICAgICAgICAgICAgICAgbnVtSWZyYW1lczog4oCL4oCL4oCLMFxuICAgICAgICAgICAgICAgIHJlYWNoZWRUb3A6IHRydWVcbiAgICAgICAgICAgICAgICByZWZlcmVyOiBcImh0dHA6Ly9sb2NhbHRlc3QubWU6ODAwMC90ZXN0X3BhZ2VzL3ByZWJpZGpzLmh0bWxcIuKAi+KAi1xuICAgICAgICAgICAgICAgIHN0YWNrOiAoMSkgW+KApl3igIvigIvigIvigItcbiAgICAgICAgICAgICAgICAwOiBcImh0dHA6Ly9sb2NhbHRlc3QubWU6ODAwMC90ZXN0X3BhZ2VzL3ByZWJpZGpzLmh0bWxcIlxuICAgICAgICAgICAgICAgIGxlbmd0aDogMVxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJlckluZm8gPSBldmVudC5yZWZlcmVySW5mbyAmJiBldmVudC5yZWZlcmVySW5mby5yZWZlcmVyXG4gICAgICAgICAgICAgICAgICAgID8gZXZlbnQucmVmZXJlckluZm8ucmVmZXJlclxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgY2Fub25pY2FsVXJsID0gZXZlbnQuY2Fub25pY2FsVXJsXG4gICAgICAgICAgICAgICAgICAgID8gZXZlbnQucmVmZXJlckluZm8uY2Fub25pY2FsVXJsXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0VXJsOiByZWZlcmVySW5mbyAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgPyByZWZlcmVySW5mb1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBjYW5vbmljYWxVcmwgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGNhbm9uaWNhbFVybFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0TGluZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0Q29sOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0TG9jRXZhbDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY2FsbFN0YWNrOiBcIlwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nQ2FsbChcImV2ZW50OlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdE5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCI6XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRSZWZlcmVuY2UsIFtldmVudF0sIGNhbGxDb250ZXh0LCB7fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvY2N1cnJlZCB3aGVuIGhhbmRsaW5nIGV2ZW50OiBcIiwgZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5wYmpzLm9uRXZlbnQoZXZlbnRSZWZlcmVuY2UsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgICBbXG4gICAgICAgICAgICBcImF1Y3Rpb25Jbml0XCIsXG4gICAgICAgICAgICBcImF1Y3Rpb25FbmRcIixcbiAgICAgICAgICAgIFwiYmlkQWRqdXN0bWVudFwiLFxuICAgICAgICAgICAgXCJiaWRUaW1lb3V0XCIsXG4gICAgICAgICAgICBcImJpZFJlcXVlc3RlZFwiLFxuICAgICAgICAgICAgXCJiaWRSZXNwb25zZVwiLFxuICAgICAgICAgICAgXCJiaWRXb25cIixcbiAgICAgICAgICAgIFwic2V0VGFyZ2V0aW5nXCIsXG4gICAgICAgICAgICBcInJlcXVlc3RCaWRzXCIsXG4gICAgICAgICAgICBcImFkZEFkVW5pdHNcIixcbiAgICAgICAgICAgIFwiYWRSZW5kZXJGYWlsZWRcIixcbiAgICAgICAgICAgIFwiYmlkZGVyRG9uZVwiLFxuICAgICAgICBdLm1hcChpbnN0cnVtZW50UHJlYmlkSnNFdmVudCk7XG4gICAgICAgIC8vIEluc3RydW1lbnQgYWNjZXNzIHRvIG9iamVjdCBwcm9wZXJ0aWVzIGFuZCBmdW5jdGlvbnNcbiAgICAgICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cucGJqcywgb2JqZWN0TmFtZSwge30pO1xuICAgIH0pO1xuICAgIC8qXG4gICAgICogU3RhcnQgSW5zdHJ1bWVudGF0aW9uXG4gICAgICovXG4gICAgLy8gVE9ETzogdXNlciBzaG91bGQgYmUgYWJsZSB0byBjaG9vc2Ugd2hhdCB0byBpbnN0cnVtZW50XG4gICAgLy8gaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpcyh7IGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSwgaW5zdHJ1bWVudE9iamVjdCB9KTtcbiAgICBpZiAodGVzdGluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IENvbnRlbnQtc2lkZSBqYXZhc2NyaXB0IGluc3RydW1lbnRhdGlvbiBzdGFydGVkXCIsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMWEJoWjJVdGMyTnZjR1V1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12WTI5dWRHVnVkQzlxWVhaaGMyTnlhWEIwTFdsdWMzUnlkVzFsYm5RdGNHRm5aUzF6WTI5d1pTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4eFJVRkJjVVU3UVVGRGNrVXNlVVZCUVhsRk8wRkJRM3BGTERKRFFVRXlRenRCUVVVelF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4VlFVRlZMRWRCUVVjc1ZVRkJVeXhGUVVOcVF5eGhRVUZoTEVkQlJXUTdTVUZEUXl3clFrRkJLMEk3U1VGREwwSXNVMEZCVXl4dlFrRkJiMElzUTBGQlF5eFRRVUZUTEVWQlFVVXNVVUZCVVR0UlFVTXZReXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVU53UWl4SlFVRkpMRmRCUVZjc1EwRkJReXhUUVVGVExFVkJRVVU3V1VGRGVrSXNUVUZCVFN4RlFVRkZMRkZCUVZFN1UwRkRha0lzUTBGQlF5eERRVU5JTEVOQlFVTTdTVUZEU2l4RFFVRkRPMGxCUlVRc1RVRkJUU3hSUVVGUkxFZEJRVWNzVVVGQlVTeERRVUZETEdGQlFXRXNRMEZCUXl4WlFVRlpMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03U1VGRmRFVXNUVUZCVFN4RlFVTktMR2RDUVVGblFqdEpRVU5vUWl3MFFrRkJORUk3U1VGRE5VSXNUMEZCVHl4SFFVTlNMRWRCUVVjc1lVRkJZU3hEUVVGRExGRkJRVkVzUlVGQlJTeHZRa0ZCYjBJc1EwRkJReXhEUVVGRE8wbEJSV3hFTEUxQlFVMHNUMEZCVHl4SFFVTllMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zV1VGQldTeERRVUZETEdOQlFXTXNRMEZCUXl4TFFVRkxMRTFCUVUwc1EwRkJRenRKUVVOcVJTeEpRVUZKTEU5QlFVOHNSVUZCUlR0UlFVTllMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zTkVKQlFUUkNMRU5CUVVNc1EwRkJRenRSUVVONlF5eE5RVUZqTEVOQlFVTXNaMEpCUVdkQ0xFZEJRVWNzWjBKQlFXZENMRU5CUVVNN1MwRkRja1E3U1VGRlJEczdUMEZGUnp0SlFVTklMRTFCUVUwc1UwRkJVeXhIUVVGSExGTkJRVk1zUTBGQlF5eEZRVUZGTzFGQlF6VkNMRTlCUVU4c1NVRkJTU3hQUVVGUExFTkJRVU1zVlVGQlV5eFBRVUZQTzFsQlEycERMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0WlFVTjJRanM3T3pzN08yVkJUVWM3V1VGRFNDeFRRVUZUTEV0QlFVczdaMEpCUTFvc1NVRkJTU3hUUVVGVExFVkJRVVVzUlVGQlJUdHZRa0ZEWml4UFFVRlBMRTlCUVU4c1JVRkJSU3hEUVVGRE8ybENRVU5zUWp0eFFrRkJUVHR2UWtGRFRDd3JRa0ZCSzBJN2IwSkJReTlDTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFZEJRVWNzUjBGQlJ5eExRVUZMTEVWQlFVVTdkMEpCUXpWQ0xGVkJRVlVzUTBGQlF5eExRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN2NVSkJRM1pDTzNsQ1FVRk5PM2RDUVVOTUxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlExUXNjVVZCUVhGRkxFTkJRM1JGTEVOQlFVTTdjVUpCUTBnN2FVSkJRMFk3V1VGRFNDeERRVUZETzFsQlEwUXNTMEZCU3l4RlFVRkZMRU5CUVVNN1VVRkRWaXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5NTEVOQlFVTXNRMEZCUXp0SlFVVkdPenM3T3pzN096dFBRVkZITzBsQlEwZ3NUVUZCVFN3MFFrRkJORUlzUjBGQlJ5eFRRVUZUTEVOQlF6VkRMRWRCUVVjc1JVRkJSU3hEUVVGRExFOUJRVkVzVFVGQll5eERRVUZETEVsQlFVa3NTMEZCU3l4WFFVRlhMRU5CUTJ4RUxFTkJRVU03U1VGRFJpeE5RVUZOTEdsQ1FVRnBRaXhIUVVGSExGTkJRVk1zUTBGRGFrTXNSMEZCUnl4RlFVRkZMRU5CUTBnc1QwRkJVU3hOUVVGakxFTkJRVU1zU1VGQlNTeExRVUZMTEZkQlFWYzdVVUZETTBNc1QwRkJVU3hOUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTMEZCU3l4WFFVRlhMRU5CUTNSRUxFTkJRVU03U1VGRlJpeEpRVUZKTEdkRFFVRm5ReXhEUVVGRE8wbEJRM0pETERSQ1FVRTBRaXhEUVVGRExFbEJRVWtzUTBGQlF6dFJRVU5vUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExHOUVRVUZ2UkN4RFFVRkRMRU5CUVVNN1VVRkRiRVVzWjBOQlFXZERPMWxCUXpkQ0xFMUJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4TFFVRkxMRk5CUVZNN1owSkJRM2hETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVVc1RVRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdaMEpCUTNSRExFTkJRVU1zUTBGQlF5eGhRVUZoTEVOQlFVTTdVVUZEY0VJc2RVUkJRWFZFTzFGQlEzWkVMRTFCUVUwc1ZVRkJWU3hIUVVGSExFOUJRVThzUjBGQlJ5eG5RMEZCWjBNc1IwRkJSeXhIUVVGSExFTkJRVU03VVVGRGNFVXNaMEpCUVdkQ0xFTkJRVVVzVFVGQll5eERRVUZETEVsQlFVa3NSVUZCUlN4VlFVRlZMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03U1VGRGVrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hwUWtGQmFVSXNRMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkRja0lzU1VGQlNTeG5RMEZCWjBNc1MwRkJUU3hOUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlR0WlFVTnlSU3hQUVVGUE8xTkJRMUk3VVVGRFJDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVTlVMRGhHUVVFNFJpeERRVU12Uml4RFFVRkRPMUZCUTBZc1owTkJRV2RETEVkQlFVa3NUVUZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03VVVGRGFFVXNUVUZCVFN4VlFVRlZMRWRCUVVjc1QwRkJUeXhIUVVGSExHZERRVUZuUXl4SFFVRkhMRWRCUVVjc1EwRkJRenRSUVVWd1JTd3JSa0ZCSzBZN1VVRkRMMFlzVFVGQlRTeDFRa0ZCZFVJc1IwRkJSeXhqUVVGakxFTkJRVU1zUlVGQlJUdFpRVU12UXl4TlFVRk5MRTlCUVU4c1IwRkJSeXhMUVVGTExFTkJRVU1zUlVGQlJUdG5Ra0ZEZEVJc2QwVkJRWGRGTzJkQ1FVTjRSVHM3T3pzN096czdPMnRDUVZORk8yZENRVU5HTEUxQlFVMHNWMEZCVnl4SFFVTm1MRXRCUVVzc1EwRkJReXhYUVVGWExFbEJRVWtzUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4UFFVRlBPMjlDUVVNMVF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhQUVVGUE8yOUNRVU16UWl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8yZENRVU5ZTEUxQlFVMHNXVUZCV1N4SFFVRkhMRXRCUVVzc1EwRkJReXhaUVVGWk8yOUNRVU55UXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUTBGQlF5eFpRVUZaTzI5Q1FVTm9ReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzJkQ1FVTlVMRTFCUVUwc1YwRkJWeXhIUVVGSE8yOUNRVU5zUWl4VFFVRlRMRVZCUTFBc1YwRkJWeXhMUVVGTExFbEJRVWs3ZDBKQlEyeENMRU5CUVVNc1EwRkJReXhYUVVGWE8zZENRVU5pTEVOQlFVTXNRMEZCUXl4WlFVRlpMRXRCUVVzc1NVRkJTVHMwUWtGRGRrSXNRMEZCUXl4RFFVRkRMRmxCUVZrN05FSkJRMlFzUTBGQlF5eERRVUZETEVWQlFVVTdiMEpCUTFJc1ZVRkJWU3hGUVVGRkxFVkJRVVU3YjBKQlEyUXNVMEZCVXl4RlFVRkZMRVZCUVVVN2IwSkJRMklzVVVGQlVTeEZRVUZGTEVWQlFVVTdiMEpCUTFvc1lVRkJZU3hGUVVGRkxFVkJRVVU3YjBKQlEycENMRk5CUVZNc1JVRkJSU3hGUVVGRk8ybENRVU5rTEVOQlFVTTdaMEpCUTBZc1NVRkJTVHR2UWtGRFJpeFBRVUZQTEVOQlEwd3NVVUZCVVR0M1FrRkRUaXhWUVVGVk8zZENRVU5XTEVkQlFVYzdkMEpCUTBnc1kwRkJZeXhGUVVOb1FpeERRVUZETEV0QlFVc3NRMEZCUXl4RlFVTlFMRmRCUVZjc1JVRkRXQ3hGUVVGRkxFTkJRMGdzUTBGQlF6dHBRa0ZEU0R0blFrRkJReXhQUVVGUExFZEJRVWNzUlVGQlJUdHZRa0ZEV2l4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVOVUxITkRRVUZ6UXl4RlFVTjBReXhIUVVGSExFTkJRVU1zVDBGQlR5eEZRVU5ZTEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUTFZc1EwRkJRenRwUWtGRFNEdFpRVU5JTEVOQlFVTXNRMEZCUXp0WlFVTkVMRTFCUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTXNSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRSUVVONFJDeERRVUZETEVOQlFVTTdVVUZEUmp0WlFVTkZMR0ZCUVdFN1dVRkRZaXhaUVVGWk8xbEJRMW9zWlVGQlpUdFpRVU5tTEZsQlFWazdXVUZEV2l4alFVRmpPMWxCUTJRc1lVRkJZVHRaUVVOaUxGRkJRVkU3V1VGRFVpeGpRVUZqTzFsQlEyUXNZVUZCWVR0WlFVTmlMRmxCUVZrN1dVRkRXaXhuUWtGQlowSTdXVUZEYUVJc1dVRkJXVHRUUVVOaUxFTkJRVU1zUjBGQlJ5eERRVUZETEhWQ1FVRjFRaXhEUVVGRExFTkJRVU03VVVGRkwwSXNkVVJCUVhWRU8xRkJRM1pFTEdkQ1FVRm5RaXhEUVVGRkxFMUJRV01zUTBGQlF5eEpRVUZKTEVWQlFVVXNWVUZCVlN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJRM3BFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUlVnN08wOUJSVWM3U1VGRFNDeDVSRUZCZVVRN1NVRkZla1FzWjBaQlFXZEdPMGxCUldoR0xFbEJRVWtzVDBGQlR5eEZRVUZGTzFGQlExZ3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkRWQ3d3UkVGQk1FUXNSVUZETVVRc1NVRkJTU3hKUVVGSkxFVkJRVVVzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZEZWtJc1EwRkJRenRMUVVOSU8wRkJRMGdzUTBGQlF5eERRVUZESW4wPSIsImV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvY29va2llLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9iYWNrZ3JvdW5kL2phdmFzY3JpcHQtaW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9uYXZpZ2F0aW9uLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9odHRwLXBvc3QtcGFyc2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9saWIvc3RyaW5nLXV0aWxzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zY2hlbWFcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzWTBGQll5eG5RMEZCWjBNc1EwRkJRenRCUVVNdlF5eGpRVUZqTERoQ1FVRTRRaXhEUVVGRE8wRkJRemRETEdOQlFXTXNiME5CUVc5RExFTkJRVU03UVVGRGJrUXNZMEZCWXl4dlEwRkJiME1zUTBGQlF6dEJRVU51UkN4alFVRmpMQ3REUVVFclF5eERRVUZETzBGQlF6bEVMR05CUVdNc2QwSkJRWGRDTEVOQlFVTTdRVUZEZGtNc1kwRkJZeXh2UWtGQmIwSXNRMEZCUXp0QlFVTnVReXhqUVVGakxGVkJRVlVzUTBGQlF5SjkiLCIvKipcbiAqIFRoaXMgZW5hYmxlcyB1cyB0byBrZWVwIGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcmlnaW5hbCBvcmRlclxuICogaW4gd2hpY2ggZXZlbnRzIGFycml2ZWQgdG8gb3VyIGV2ZW50IGxpc3RlbmVycy5cbiAqL1xubGV0IGV2ZW50T3JkaW5hbCA9IDA7XG5leHBvcnQgY29uc3QgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGV2ZW50T3JkaW5hbCsrO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpYaDBaVzV6YVc5dUxYTmxjM05wYjI0dFpYWmxiblF0YjNKa2FXNWhiQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTlzYVdJdlpYaDBaVzV6YVc5dUxYTmxjM05wYjI0dFpYWmxiblF0YjNKa2FXNWhiQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPMGRCUjBjN1FVRkRTQ3hKUVVGSkxGbEJRVmtzUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZGY2tJc1RVRkJUU3hEUVVGRExFMUJRVTBzZFVKQlFYVkNMRWRCUVVjc1IwRkJSeXhGUVVGRk8wbEJRekZETEU5QlFVOHNXVUZCV1N4RlFVRkZMRU5CUVVNN1FVRkRlRUlzUTBGQlF5eERRVUZESW4wPSIsImltcG9ydCB7IG1ha2VVVUlEIH0gZnJvbSBcIi4vdXVpZFwiO1xuLyoqXG4gKiBUaGlzIGVuYWJsZXMgdXMgdG8gYWNjZXNzIGEgdW5pcXVlIHJlZmVyZW5jZSB0byB0aGlzIGJyb3dzZXJcbiAqIHNlc3Npb24gLSByZWdlbmVyYXRlZCBhbnkgdGltZSB0aGUgYmFja2dyb3VuZCBwcm9jZXNzIGdldHNcbiAqIHJlc3RhcnRlZCAod2hpY2ggc2hvdWxkIG9ubHkgYmUgb24gYnJvd3NlciByZXN0YXJ0cylcbiAqL1xuZXhwb3J0IGNvbnN0IGV4dGVuc2lvblNlc3Npb25VdWlkID0gbWFrZVVVSUQoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpYaDBaVzV6YVc5dUxYTmxjM05wYjI0dGRYVnBaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTlzYVdJdlpYaDBaVzV6YVc5dUxYTmxjM05wYjI0dGRYVnBaQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEVWQlFVVXNVVUZCVVN4RlFVRkZMRTFCUVUwc1VVRkJVU3hEUVVGRE8wRkJSV3hET3pzN08wZEJTVWM3UVVGRFNDeE5RVUZOTEVOQlFVTXNUVUZCVFN4dlFrRkJiMElzUjBGQlJ5eFJRVUZSTEVWQlFVVXNRMEZCUXlKOSIsIi8vIEluY29ycG9yYXRlcyBjb2RlIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWRsaW5lMTMvc2VsZW5pdW0tam1ldGVyL2Jsb2IvNjk2NmQ0YjMyNmNkNzgyNjFlMzFlNmUzMTcwNzY1NjkwNTFjYWMzNy9jb250ZW50L2xpYnJhcnkvcmVjb3JkZXIvSHR0cFBvc3RQYXJzZXIuanNcbmV4cG9ydCBjbGFzcyBIdHRwUG9zdFBhcnNlciB7XG4gICAgLypcbiAgICBwcml2YXRlIGhhc2hlYWRlcnM6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzZWVrYWJsZXN0cmVhbTtcbiAgICBwcml2YXRlIHN0cmVhbTtcbiAgICBwcml2YXRlIHBvc3RCb2R5O1xuICAgIHByaXZhdGUgcG9zdExpbmVzO1xuICAgIHByaXZhdGUgcG9zdEhlYWRlcnM7XG4gICAgcHJpdmF0ZSBib2R5O1xuICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgLy8gb25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlsczogV2ViUmVxdWVzdE9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMsXG4gICAgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLCBkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgLy8gdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzID0gb25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscztcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHM7XG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyID0gZGF0YVJlY2VpdmVyO1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIkh0dHBQb3N0UGFyc2VyXCIsXG4gICAgICAgICAgLy8gb25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyxcbiAgICAgICAgICBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlbmNvZGluZ1R5cGUgZnJvbSB0aGUgSFRUUCBSZXF1ZXN0IGhlYWRlcnNcbiAgICAgKi9cbiAgICBwYXJzZVBvc3RSZXF1ZXN0KCAvKmVuY29kaW5nVHlwZSovKSB7XG4gICAgICAgIC8vIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzLnJlcXVlc3RIZWFkZXJzO1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLnJlcXVlc3RCb2R5O1xuICAgICAgICBpZiAocmVxdWVzdEJvZHkuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFwiRXhjZXB0aW9uOiBVcHN0cmVhbSBmYWlsZWQgdG8gcGFyc2UgUE9TVDogXCIgKyByZXF1ZXN0Qm9keS5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcXVlc3RCb2R5LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IHJlcXVlc3RCb2R5LmZvcm1EYXRhIHNob3VsZCBwcm9iYWJseSBiZSB0cmFuc2Zvcm1lZCBpbnRvIGFub3RoZXIgZm9ybWF0XG4gICAgICAgICAgICAgICAgcG9zdF9ib2R5OiByZXF1ZXN0Qm9keS5mb3JtRGF0YSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV0dXJuIGVtcHR5IHJlc3BvbnNlIHVudGlsIHdlIGhhdmUgYWxsIGluc3RydW1lbnRhdGlvbiBjb252ZXJ0ZWRcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAvKlxuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dEZWJ1ZyhcbiAgICAgICAgICBcIkV4Y2VwdGlvbjogSW5zdHJ1bWVudGF0aW9uIHRvIHBhcnNlIFBPU1QgcmVxdWVzdHMgd2l0aG91dCBmb3JtRGF0YSBpcyBub3QgeWV0IHJlc3RvcmVkXCIsXG4gICAgICAgICk7XG4gICAgXG4gICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLnNldHVwU3RyZWFtKCk7XG4gICAgICAgICAgdGhpcy5wYXJzZVN0cmVhbSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJFeGNlcHRpb246IEZhaWxlZCB0byBwYXJzZSBQT1NUOiBcIiArIGUpO1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBwb3N0Qm9keSA9IHRoaXMucG9zdEJvZHk7XG4gICAgXG4gICAgICAgIGlmICghcG9zdEJvZHkpIHtcbiAgICAgICAgICAvLyBzb21lIHNjcmlwdHMgc3RyYW5nZWx5IHNlbmRzIGVtcHR5IHBvc3QgYm9kaWVzIChjb25maXJtZWQgd2l0aCB0aGUgZGV2ZWxvcGVyIHRvb2xzKVxuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBsZXQgaXNNdWx0aVBhcnQgPSBmYWxzZTsgLy8gZW5jVHlwZTogbXVsdGlwYXJ0L2Zvcm0tZGF0YVxuICAgICAgICBjb25zdCBwb3N0SGVhZGVycyA9IHRoaXMucG9zdEhlYWRlcnM7IC8vIHJlcXVlc3QgaGVhZGVycyBmcm9tIHVwbG9hZCBzdHJlYW1cbiAgICAgICAgLy8gU2VlLCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NTQ4NTE3L3doYXQtaXMtcmVxdWVzdC1oZWFkZXJzLWZyb20tdXBsb2FkLXN0cmVhbVxuICAgIFxuICAgICAgICAvLyBhZGQgZW5jb2RpbmdUeXBlIGZyb20gcG9zdEhlYWRlcnMgaWYgaXQncyBtaXNzaW5nXG4gICAgICAgIGlmICghZW5jb2RpbmdUeXBlICYmIHBvc3RIZWFkZXJzICYmIFwiQ29udGVudC1UeXBlXCIgaW4gcG9zdEhlYWRlcnMpIHtcbiAgICAgICAgICBlbmNvZGluZ1R5cGUgPSBwb3N0SGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoZW5jb2RpbmdUeXBlLmluZGV4T2YoXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIpICE9PSAtMSkge1xuICAgICAgICAgIGlzTXVsdGlQYXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBsZXQganNvblBvc3REYXRhID0gXCJcIjtcbiAgICAgICAgbGV0IGVzY2FwZWRKc29uUG9zdERhdGEgPSBcIlwiO1xuICAgICAgICBpZiAoaXNNdWx0aVBhcnQpIHtcbiAgICAgICAgICBqc29uUG9zdERhdGEgPSB0aGlzLnBhcnNlTXVsdGlQYXJ0RGF0YShwb3N0Qm9keSAvKiwgZW5jb2RpbmdUeXBlKiAvKTtcbiAgICAgICAgICBlc2NhcGVkSnNvblBvc3REYXRhID0gZXNjYXBlU3RyaW5nKGpzb25Qb3N0RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAganNvblBvc3REYXRhID0gdGhpcy5wYXJzZUVuY29kZWRGb3JtRGF0YShwb3N0Qm9keSwgZW5jb2RpbmdUeXBlKTtcbiAgICAgICAgICBlc2NhcGVkSnNvblBvc3REYXRhID0gZXNjYXBlU3RyaW5nKGpzb25Qb3N0RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcG9zdF9oZWFkZXJzOiBwb3N0SGVhZGVycywgcG9zdF9ib2R5OiBlc2NhcGVkSnNvblBvc3REYXRhIH07XG4gICAgICAgICovXG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXdiM04wTFhCaGNuTmxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTlzYVdJdmFIUjBjQzF3YjNOMExYQmhjbk5sY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3huUzBGQlowczdRVUZsYUVzc1RVRkJUU3hQUVVGUExHTkJRV003U1VGSmVrSTdPenM3T3pzN08wMUJVVVU3U1VGRlJqdEpRVU5GTERoRlFVRTRSVHRKUVVNNVJTd3lRa0ZCYTBVc1JVRkRiRVVzV1VGQldUdFJRVVZhTERCRlFVRXdSVHRSUVVNeFJTeEpRVUZKTEVOQlFVTXNNa0pCUVRKQ0xFZEJRVWNzTWtKQlFUSkNMRU5CUVVNN1VVRkRMMFFzU1VGQlNTeERRVUZETEZsQlFWa3NSMEZCUnl4WlFVRlpMRU5CUVVNN1VVRkRha003T3pzN096dFZRVTFGTzBsQlEwb3NRMEZCUXp0SlFVVkVPenRQUVVWSE8wbEJRMGtzWjBKQlFXZENMRVZCUVVNc1owSkJRV2RDTzFGQlEzUkRMRGhGUVVFNFJUdFJRVU01UlN4TlFVRk5MRmRCUVZjc1IwRkJSeXhKUVVGSkxFTkJRVU1zTWtKQlFUSkNMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRMnBGTEVsQlFVa3NWMEZCVnl4RFFVRkRMRXRCUVVzc1JVRkJSVHRaUVVOeVFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRkZCUVZFc1EwRkRlRUlzTkVOQlFUUkRMRWRCUVVjc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGRGFrVXNRMEZCUXp0VFFVTklPMUZCUTBRc1NVRkJTU3hYUVVGWExFTkJRVU1zVVVGQlVTeEZRVUZGTzFsQlEzaENMRTlCUVU4N1owSkJRMHdzWjBaQlFXZEdPMmRDUVVOb1JpeFRRVUZUTEVWQlFVVXNWMEZCVnl4RFFVRkRMRkZCUVZFN1lVRkRhRU1zUTBGQlF6dFRRVU5JTzFGQlJVUXNiMFZCUVc5Rk8xRkJRM0JGTEU5QlFVOHNSVUZCUlN4RFFVRkRPMUZCUTFZN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzFWQk5FTkZPMGxCUTBvc1EwRkJRenREUVRKVVJpSjkiLCJleHBvcnQgZnVuY3Rpb24gaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpcyh7IGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSwgaW5zdHJ1bWVudE9iamVjdCwgfSkge1xuICAgIC8vIEFjY2VzcyB0byBuYXZpZ2F0b3IgcHJvcGVydGllc1xuICAgIGNvbnN0IG5hdmlnYXRvclByb3BlcnRpZXMgPSBbXG4gICAgICAgIFwiYXBwQ29kZU5hbWVcIixcbiAgICAgICAgXCJhcHBOYW1lXCIsXG4gICAgICAgIFwiYXBwVmVyc2lvblwiLFxuICAgICAgICBcImJ1aWxkSURcIixcbiAgICAgICAgXCJjb29raWVFbmFibGVkXCIsXG4gICAgICAgIFwiZG9Ob3RUcmFja1wiLFxuICAgICAgICBcImdlb2xvY2F0aW9uXCIsXG4gICAgICAgIFwibGFuZ3VhZ2VcIixcbiAgICAgICAgXCJsYW5ndWFnZXNcIixcbiAgICAgICAgXCJvbkxpbmVcIixcbiAgICAgICAgXCJvc2NwdVwiLFxuICAgICAgICBcInBsYXRmb3JtXCIsXG4gICAgICAgIFwicHJvZHVjdFwiLFxuICAgICAgICBcInByb2R1Y3RTdWJcIixcbiAgICAgICAgXCJ1c2VyQWdlbnRcIixcbiAgICAgICAgXCJ2ZW5kb3JTdWJcIixcbiAgICAgICAgXCJ2ZW5kb3JcIixcbiAgICBdO1xuICAgIG5hdmlnYXRvclByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5uYXZpZ2F0b3IsIFwid2luZG93Lm5hdmlnYXRvclwiLCBwcm9wZXJ0eSk7XG4gICAgfSk7XG4gICAgLy8gQWNjZXNzIHRvIHNjcmVlbiBwcm9wZXJ0aWVzXG4gICAgLy8gaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuc2NyZWVuLCBcIndpbmRvdy5zY3JlZW5cIik7XG4gICAgLy8gVE9ETzogd2h5IGRvIHdlIGluc3RydW1lbnQgb25seSB0d28gc2NyZWVuIHByb3BlcnRpZXNcbiAgICBjb25zdCBzY3JlZW5Qcm9wZXJ0aWVzID0gW1wicGl4ZWxEZXB0aFwiLCBcImNvbG9yRGVwdGhcIl07XG4gICAgc2NyZWVuUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkod2luZG93LnNjcmVlbiwgXCJ3aW5kb3cuc2NyZWVuXCIsIHByb3BlcnR5KTtcbiAgICB9KTtcbiAgICAvLyBBY2Nlc3MgdG8gcGx1Z2luc1xuICAgIGNvbnN0IHBsdWdpblByb3BlcnRpZXMgPSBbXG4gICAgICAgIFwibmFtZVwiLFxuICAgICAgICBcImZpbGVuYW1lXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgXCJ2ZXJzaW9uXCIsXG4gICAgICAgIFwibGVuZ3RoXCIsXG4gICAgXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvdy5uYXZpZ2F0b3IucGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwbHVnaW5OYW1lID0gd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW2ldLm5hbWU7XG4gICAgICAgIHBsdWdpblByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnNbcGx1Z2luTmFtZV0sIFwid2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW1wiICsgcGx1Z2luTmFtZSArIFwiXVwiLCBwcm9wZXJ0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBBY2Nlc3MgdG8gTUlNRVR5cGVzXG4gICAgY29uc3QgbWltZVR5cGVQcm9wZXJ0aWVzID0gW1wiZGVzY3JpcHRpb25cIiwgXCJzdWZmaXhlc1wiLCBcInR5cGVcIl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtaW1lVHlwZU5hbWUgPSB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1tpXS50eXBlOyAvLyBub3RlOiB1cHN0cmVhbSB0eXBpbmdzIHNlZW1zIHRvIGJlIGluY29ycmVjdFxuICAgICAgICBtaW1lVHlwZVByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1ttaW1lVHlwZU5hbWVdLCBcIndpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzW1wiICsgbWltZVR5cGVOYW1lICsgXCJdXCIsIHByb3BlcnR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIE5hbWUsIGxvY2FsU3RvcmFnZSwgYW5kIHNlc3Npb25zU3RvcmFnZSBsb2dnaW5nXG4gICAgLy8gSW5zdHJ1bWVudGluZyB3aW5kb3cubG9jYWxTdG9yYWdlIGRpcmVjdGx5IGRvZXNuJ3Qgc2VlbSB0byB3b3JrLCBzbyB0aGUgU3RvcmFnZVxuICAgIC8vIHByb3RvdHlwZSBtdXN0IGJlIGluc3RydW1lbnRlZCBpbnN0ZWFkLiBVbmZvcnR1bmF0ZWx5IHRoaXMgZmFpbHMgdG8gZGlmZmVyZW50aWF0ZVxuICAgIC8vIGJldHdlZW4gc2Vzc2lvblN0b3JhZ2UgYW5kIGxvY2FsU3RvcmFnZS4gSW5zdGVhZCwgeW91J2xsIGhhdmUgdG8gbG9vayBmb3IgYSBzZXF1ZW5jZVxuICAgIC8vIG9mIGEgZ2V0IGZvciB0aGUgbG9jYWxTdG9yYWdlIG9iamVjdCBmb2xsb3dlZCBieSBhIGdldEl0ZW0vc2V0SXRlbSBmb3IgdGhlIFN0b3JhZ2Ugb2JqZWN0LlxuICAgIGNvbnN0IHdpbmRvd1Byb3BlcnRpZXMgPSBbXCJuYW1lXCIsIFwibG9jYWxTdG9yYWdlXCIsIFwic2Vzc2lvblN0b3JhZ2VcIl07XG4gICAgd2luZG93UHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkod2luZG93LCBcIndpbmRvd1wiLCBwcm9wZXJ0eSk7XG4gICAgfSk7XG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuU3RvcmFnZS5wcm90b3R5cGUsIFwid2luZG93LlN0b3JhZ2VcIik7XG4gICAgLy8gQWNjZXNzIHRvIGRvY3VtZW50LmNvb2tpZVxuICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cuZG9jdW1lbnQsIFwid2luZG93LmRvY3VtZW50XCIsIFwiY29va2llXCIsIHtcbiAgICAgICAgbG9nQ2FsbFN0YWNrOiB0cnVlLFxuICAgIH0pO1xuICAgIC8vIEFjY2VzcyB0byBkb2N1bWVudC5yZWZlcnJlclxuICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cuZG9jdW1lbnQsIFwid2luZG93LmRvY3VtZW50XCIsIFwicmVmZXJyZXJcIiwge1xuICAgICAgICBsb2dDYWxsU3RhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgLy8gQWNjZXNzIHRvIGNhbnZhc1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZSwgXCJIVE1MQ2FudmFzRWxlbWVudFwiKTtcbiAgICBjb25zdCBleGNsdWRlZFByb3BlcnRpZXMgPSBbXG4gICAgICAgIFwicXVhZHJhdGljQ3VydmVUb1wiLFxuICAgICAgICBcImxpbmVUb1wiLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcImdsb2JhbEFscGhhXCIsXG4gICAgICAgIFwibW92ZVRvXCIsXG4gICAgICAgIFwiZHJhd0ltYWdlXCIsXG4gICAgICAgIFwic2V0VHJhbnNmb3JtXCIsXG4gICAgICAgIFwiY2xlYXJSZWN0XCIsXG4gICAgICAgIFwiY2xvc2VQYXRoXCIsXG4gICAgICAgIFwiYmVnaW5QYXRoXCIsXG4gICAgICAgIFwiY2FudmFzXCIsXG4gICAgICAgIFwidHJhbnNsYXRlXCIsXG4gICAgXTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLCBcIkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFwiLCB7IGV4Y2x1ZGVkUHJvcGVydGllcyB9KTtcbiAgICAvLyBBY2Nlc3MgdG8gd2ViUlRDXG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCBcIlJUQ1BlZXJDb25uZWN0aW9uXCIpO1xuICAgIC8vIEFjY2VzcyB0byBBdWRpbyBBUElcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5BdWRpb0NvbnRleHQucHJvdG90eXBlLCBcIkF1ZGlvQ29udGV4dFwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5PZmZsaW5lQXVkaW9Db250ZXh0LnByb3RvdHlwZSwgXCJPZmZsaW5lQXVkaW9Db250ZXh0XCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93Lk9zY2lsbGF0b3JOb2RlLnByb3RvdHlwZSwgXCJPc2NpbGxhdG9yTm9kZVwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5BbmFseXNlck5vZGUucHJvdG90eXBlLCBcIkFuYWx5c2VyTm9kZVwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5HYWluTm9kZS5wcm90b3R5cGUsIFwiR2Fpbk5vZGVcIik7XG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuU2NyaXB0UHJvY2Vzc29yTm9kZS5wcm90b3R5cGUsIFwiU2NyaXB0UHJvY2Vzc29yTm9kZVwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNXpkSEoxYldWdWRDMW1hVzVuWlhKd2NtbHVkR2x1WnkxaGNHbHpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5cGJuTjBjblZ0Wlc1MExXWnBibWRsY25CeWFXNTBhVzVuTFdGd2FYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1RVRkJUU3hWUVVGVkxEUkNRVUUwUWl4RFFVRkRMRVZCUXpORExIZENRVUYzUWl4RlFVTjRRaXhuUWtGQlowSXNSMEZEYWtJN1NVRkRReXhwUTBGQmFVTTdTVUZEYWtNc1RVRkJUU3h0UWtGQmJVSXNSMEZCUnp0UlFVTXhRaXhoUVVGaE8xRkJRMklzVTBGQlV6dFJRVU5VTEZsQlFWazdVVUZEV2l4VFFVRlRPMUZCUTFRc1pVRkJaVHRSUVVObUxGbEJRVms3VVVGRFdpeGhRVUZoTzFGQlEySXNWVUZCVlR0UlFVTldMRmRCUVZjN1VVRkRXQ3hSUVVGUk8xRkJRMUlzVDBGQlR6dFJRVU5RTEZWQlFWVTdVVUZEVml4VFFVRlRPMUZCUTFRc1dVRkJXVHRSUVVOYUxGZEJRVmM3VVVGRFdDeFhRVUZYTzFGQlExZ3NVVUZCVVR0TFFVTlVMRU5CUVVNN1NVRkRSaXh0UWtGQmJVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJVeXhSUVVGUk8xRkJRek5ETEhkQ1FVRjNRaXhEUVVGRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVWQlFVVXNhMEpCUVd0Q0xFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdTVUZETTBVc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRlNDdzRRa0ZCT0VJN1NVRkRPVUlzYjBSQlFXOUVPMGxCUTNCRUxIZEVRVUYzUkR0SlFVTjRSQ3hOUVVGTkxHZENRVUZuUWl4SFFVRkhMRU5CUVVNc1dVRkJXU3hGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZETzBsQlEzUkVMR2RDUVVGblFpeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlRMRkZCUVZFN1VVRkRlRU1zZDBKQlFYZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUlVGQlJTeGxRVUZsTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1NVRkRja1VzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZGU0N4dlFrRkJiMEk3U1VGRGNFSXNUVUZCVFN4blFrRkJaMElzUjBGQlJ6dFJRVU4yUWl4TlFVRk5PMUZCUTA0c1ZVRkJWVHRSUVVOV0xHRkJRV0U3VVVGRFlpeFRRVUZUTzFGQlExUXNVVUZCVVR0TFFVTlVMRU5CUVVNN1NVRkRSaXhMUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8xRkJRM2hFTEUxQlFVMHNWVUZCVlN4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlV5eFJRVUZSTzFsQlEzaERMSGRDUVVGM1FpeERRVU4wUWl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNSVUZEY0VNc01rSkJRVEpDTEVkQlFVY3NWVUZCVlN4SFFVRkhMRWRCUVVjc1JVRkRPVU1zVVVGQlVTeERRVU5VTEVOQlFVTTdVVUZEU2l4RFFVRkRMRU5CUVVNc1EwRkJRenRMUVVOS08wbEJSVVFzYzBKQlFYTkNPMGxCUTNSQ0xFMUJRVTBzYTBKQlFXdENMRWRCUVVjc1EwRkJReXhoUVVGaExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMGxCUXk5RUxFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3VVVGRE1VUXNUVUZCVFN4WlFVRlpMRWRCUVVzc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFRRVUZUTEVOQlF5OURMRU5CUVVNc1EwRkRkVUlzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl3clEwRkJLME03VVVGRGFFWXNhMEpCUVd0Q0xFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFWTXNVVUZCVVR0WlFVTXhReXgzUWtGQmQwSXNRMEZEZEVJc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFRRVUZUTEVOQlFVTXNXVUZCV1N4RFFVRkRMRVZCUTNoRExEWkNRVUUyUWl4SFFVRkhMRmxCUVZrc1IwRkJSeXhIUVVGSExFVkJRMnhFTEZGQlFWRXNRMEZEVkN4RFFVRkRPMUZCUTBvc1EwRkJReXhEUVVGRExFTkJRVU03UzBGRFNqdEpRVU5FTEd0RVFVRnJSRHRKUVVOc1JDeHJSa0ZCYTBZN1NVRkRiRVlzYjBaQlFXOUdPMGxCUTNCR0xIVkdRVUYxUmp0SlFVTjJSaXcyUmtGQk5rWTdTVUZETjBZc1RVRkJUU3huUWtGQlowSXNSMEZCUnl4RFFVRkRMRTFCUVUwc1JVRkJSU3hqUVVGakxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJRenRKUVVOd1JTeG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlV5eFJRVUZSTzFGQlEzaERMSGRDUVVGM1FpeERRVUZETEUxQlFVMHNSVUZCUlN4UlFVRlJMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRGRrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3huUWtGQlowSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRE8wbEJSVGRFTERSQ1FVRTBRanRKUVVNMVFpeDNRa0ZCZDBJc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeEZRVUZGTEdsQ1FVRnBRaXhGUVVGRkxGRkJRVkVzUlVGQlJUdFJRVU55UlN4WlFVRlpMRVZCUVVVc1NVRkJTVHRMUVVOdVFpeERRVUZETEVOQlFVTTdTVUZGU0N3NFFrRkJPRUk3U1VGRE9VSXNkMEpCUVhkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUlN4cFFrRkJhVUlzUlVGQlJTeFZRVUZWTEVWQlFVVTdVVUZEZGtVc1dVRkJXU3hGUVVGRkxFbEJRVWs3UzBGRGJrSXNRMEZCUXl4RFFVRkRPMGxCUlVnc2JVSkJRVzFDTzBsQlEyNUNMR2RDUVVGblFpeERRVUZETEUxQlFVMHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFRRVUZUTEVWQlFVVXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dEpRVVV4UlN4TlFVRk5MR3RDUVVGclFpeEhRVUZITzFGQlEzcENMR3RDUVVGclFqdFJRVU5zUWl4UlFVRlJPMUZCUTFJc1YwRkJWenRSUVVOWUxHRkJRV0U3VVVGRFlpeFJRVUZSTzFGQlExSXNWMEZCVnp0UlFVTllMR05CUVdNN1VVRkRaQ3hYUVVGWE8xRkJRMWdzVjBGQlZ6dFJRVU5ZTEZkQlFWYzdVVUZEV0N4UlFVRlJPMUZCUTFJc1YwRkJWenRMUVVOYUxFTkJRVU03U1VGRFJpeG5Ra0ZCWjBJc1EwRkRaQ3hOUVVGTkxFTkJRVU1zZDBKQlFYZENMRU5CUVVNc1UwRkJVeXhGUVVONlF5d3dRa0ZCTUVJc1JVRkRNVUlzUlVGQlJTeHJRa0ZCYTBJc1JVRkJSU3hEUVVOMlFpeERRVUZETzBsQlJVWXNiVUpCUVcxQ08wbEJRMjVDTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhUUVVGVExFVkJRVVVzYlVKQlFXMUNMRU5CUVVNc1EwRkJRenRKUVVVeFJTeHpRa0ZCYzBJN1NVRkRkRUlzWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eFRRVUZUTEVWQlFVVXNZMEZCWXl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExHMUNRVUZ0UWl4RFFVRkRMRk5CUVZNc1JVRkJSU3h4UWtGQmNVSXNRMEZCUXl4RFFVRkRPMGxCUXpsRkxHZENRVUZuUWl4RFFVRkRMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zVTBGQlV5eEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03U1VGRGNFVXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4VFFVRlRMRVZCUVVVc1kwRkJZeXhEUVVGRExFTkJRVU03U1VGRGFFVXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZGQlFWRXNRMEZCUXl4VFFVRlRMRVZCUVVVc1ZVRkJWU3hEUVVGRExFTkJRVU03U1VGRGVFUXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExGTkJRVk1zUlVGQlJTeHhRa0ZCY1VJc1EwRkJReXhEUVVGRE8wRkJRMmhHTEVOQlFVTWlmUT09IiwiLy8gSW50cnVtZW50YXRpb24gaW5qZWN0aW9uIGNvZGUgaXMgYmFzZWQgb24gcHJpdmFjeWJhZGdlcmZpcmVmb3hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9FRkZvcmcvcHJpdmFjeWJhZGdlcmZpcmVmb3gvYmxvYi9tYXN0ZXIvZGF0YS9maW5nZXJwcmludGluZy5qc1xuZXhwb3J0IGZ1bmN0aW9uIGpzSW5zdHJ1bWVudHMoZXZlbnRfaWQsIHNlbmRNZXNzYWdlc1RvTG9nZ2VyKSB7XG4gICAgLypcbiAgICAgKiBJbnN0cnVtZW50YXRpb24gaGVscGVyc1xuICAgICAqIChJbmxpbmVkIGluIG9yZGVyIGZvciBqc0luc3RydW1lbnRzIHRvIGJlIGVhc2lseSBleHBvcnRhYmxlIGFzIGEgc3RyaW5nKVxuICAgICAqL1xuICAgIC8vIGRlYm91bmNlIC0gZnJvbSBVbmRlcnNjb3JlIHYxLjYuMFxuICAgIGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCB0aW1lb3V0LCBhcmdzLCBjb250ZXh0LCB0aW1lc3RhbXAsIHJlc3VsdDtcbiAgICAgICAgY29uc3QgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgZ2VuZXJhdGVzIGEgcGF0aCBmb3IgYW4gZWxlbWVudFxuICAgIGZ1bmN0aW9uIGdldFBhdGhUb0RvbUVsZW1lbnQoZWxlbWVudCwgdmlzaWJpbGl0eUF0dHIgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOVUxML1wiICsgZWxlbWVudC50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nSW5kZXggPSAxO1xuICAgICAgICBjb25zdCBzaWJsaW5ncyA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpYmxpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gc2libGluZ3NbaV07XG4gICAgICAgICAgICBpZiAoc2libGluZyA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gZ2V0UGF0aFRvRG9tRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUsIHZpc2liaWxpdHlBdHRyKTtcbiAgICAgICAgICAgICAgICBwYXRoICs9IFwiL1wiICsgZWxlbWVudC50YWdOYW1lICsgXCJbXCIgKyBzaWJsaW5nSW5kZXg7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5QXR0cikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5oaWRkZW47XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiQVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LmhyZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggKz0gXCJdXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiBzaWJsaW5nLnRhZ05hbWUgPT09IGVsZW1lbnQudGFnTmFtZSkge1xuICAgICAgICAgICAgICAgIHNpYmxpbmdJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhlbHBlciBmb3IgSlNPTmlmeWluZyBvYmplY3RzXG4gICAgZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KG9iamVjdCwgc3RyaW5naWZ5RnVuY3Rpb25zID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSGFuZGxlIHBlcm1pc3Npb25zIGVycm9yc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5naWZ5RnVuY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkZVTkNUSU9OXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2Vlbk9iamVjdHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdpZnlGdW5jdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRlVOQ1RJT05cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB3cmFwcGluZyBvbiBjb250ZW50IG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwid3JhcHBlZEpTT2JqZWN0XCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUud3JhcHBlZEpTT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBET00gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRQYXRoVG9Eb21FbGVtZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHNlcmlhbGl6YXRpb24gY3ljbGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiXCIgfHwgc2Vlbk9iamVjdHMuaW5kZXhPZih2YWx1ZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVuT2JqZWN0cy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFNFUklBTElaQVRJT04gRVJST1I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFwiU0VSSUFMSVpBVElPTiBFUlJPUjogXCIgKyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIERpcmVjdCBpbnN0cnVtZW50YXRpb24gb2YgamF2YXNjcmlwdCBvYmplY3RzXG4gICAgICovXG4gICAgY29uc3Qgc2VuZEZhY3RvcnkgPSBmdW5jdGlvbiAoJGV2ZW50X2lkLCAkc2VuZE1lc3NhZ2VzVG9Mb2dnZXIpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gW107XG4gICAgICAgIC8vIGRlYm91bmNlIHNlbmRpbmcgcXVldWVkIG1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IF9zZW5kID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNlbmRNZXNzYWdlc1RvTG9nZ2VyKCRldmVudF9pZCwgbWVzc2FnZXMpO1xuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIHF1ZXVlXG4gICAgICAgICAgICBtZXNzYWdlcyA9IFtdO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1zZ1R5cGUsIG1zZykge1xuICAgICAgICAgICAgLy8gcXVldWUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goeyB0eXBlOiBtc2dUeXBlLCBjb250ZW50OiBtc2cgfSk7XG4gICAgICAgICAgICBfc2VuZCgpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgY29uc3Qgc2VuZCA9IHNlbmRGYWN0b3J5KGV2ZW50X2lkLCBzZW5kTWVzc2FnZXNUb0xvZ2dlcik7XG4gICAgLy8gQ291bnRlciB0byBjYXAgIyBvZiBjYWxscyBsb2dnZWQgZm9yIGVhY2ggc2NyaXB0L2FwaSBjb21iaW5hdGlvblxuICAgIGNvbnN0IG1heExvZ0NvdW50ID0gNTAwO1xuICAgIGNvbnN0IGxvZ0NvdW50ZXIgPSBuZXcgT2JqZWN0KCk7XG4gICAgZnVuY3Rpb24gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKHNjcmlwdFVybCwgc3ltYm9sKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHNjcmlwdFVybCArIFwifFwiICsgc3ltYm9sO1xuICAgICAgICBpZiAoa2V5IGluIGxvZ0NvdW50ZXIgJiYgbG9nQ291bnRlcltrZXldID49IG1heExvZ0NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghKGtleSBpbiBsb2dDb3VudGVyKSkge1xuICAgICAgICAgICAgbG9nQ291bnRlcltrZXldID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0NvdW50ZXJba2V5XSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCBsb2dnaW5nIG9mIGdldHMgYXJpc2luZyBmcm9tIGxvZ2dpbmdcbiAgICBsZXQgaW5Mb2cgPSBmYWxzZTtcbiAgICAvLyBUbyBrZWVwIHRyYWNrIG9mIHRoZSBvcmlnaW5hbCBvcmRlciBvZiBldmVudHNcbiAgICBsZXQgb3JkaW5hbCA9IDA7XG4gICAgLy8gRm9yIGdldHMsIHNldHMsIGV0Yy4gb24gYSBzaW5nbGUgdmFsdWVcbiAgICBmdW5jdGlvbiBsb2dWYWx1ZShpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUsIHZhbHVlLCBvcGVyYXRpb24sIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncykge1xuICAgICAgICBpZiAoaW5Mb2cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IG92ZXJMaW1pdCA9IHVwZGF0ZUNvdW50ZXJBbmRDaGVja0lmT3ZlcihjYWxsQ29udGV4dC5zY3JpcHRVcmwsIGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSk7XG4gICAgICAgIGlmIChvdmVyTGltaXQpIHtcbiAgICAgICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXNnID0ge1xuICAgICAgICAgICAgb3BlcmF0aW9uLFxuICAgICAgICAgICAgc3ltYm9sOiBpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogc2VyaWFsaXplT2JqZWN0KHZhbHVlLCAhIWxvZ1NldHRpbmdzLmxvZ0Z1bmN0aW9uc0FzU3RyaW5ncyksXG4gICAgICAgICAgICBzY3JpcHRVcmw6IGNhbGxDb250ZXh0LnNjcmlwdFVybCxcbiAgICAgICAgICAgIHNjcmlwdExpbmU6IGNhbGxDb250ZXh0LnNjcmlwdExpbmUsXG4gICAgICAgICAgICBzY3JpcHRDb2w6IGNhbGxDb250ZXh0LnNjcmlwdENvbCxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBjYWxsQ29udGV4dC5mdW5jTmFtZSxcbiAgICAgICAgICAgIHNjcmlwdExvY0V2YWw6IGNhbGxDb250ZXh0LnNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICBjYWxsU3RhY2s6IGNhbGxDb250ZXh0LmNhbGxTdGFjayxcbiAgICAgICAgICAgIG9yZGluYWw6IG9yZGluYWwrKyxcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbmQoXCJsb2dWYWx1ZVwiLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBVbnN1Y2Nlc3NmdWwgdmFsdWUgbG9nIVwiKTtcbiAgICAgICAgICAgIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBGb3IgZnVuY3Rpb25zXG4gICAgZnVuY3Rpb24gbG9nQ2FsbChpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUsIGFyZ3MsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncykge1xuICAgICAgICBpZiAoaW5Mb2cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IG92ZXJMaW1pdCA9IHVwZGF0ZUNvdW50ZXJBbmRDaGVja0lmT3ZlcihjYWxsQ29udGV4dC5zY3JpcHRVcmwsIGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSk7XG4gICAgICAgIGlmIChvdmVyTGltaXQpIHtcbiAgICAgICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgc3BlY2lhbCBhcmd1bWVudHMgYXJyYXkgdG8gYSBzdGFuZGFyZCBhcnJheSBmb3IgSlNPTmlmeWluZ1xuICAgICAgICAgICAgY29uc3Qgc2VyaWFsQXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2VyaWFsQXJncy5wdXNoKHNlcmlhbGl6ZU9iamVjdChhcmdzW2ldLCAhIWxvZ1NldHRpbmdzLmxvZ0Z1bmN0aW9uc0FzU3RyaW5ncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbXNnID0ge1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogXCJjYWxsXCIsXG4gICAgICAgICAgICAgICAgc3ltYm9sOiBpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgYXJnczogc2VyaWFsQXJncyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmw6IGNhbGxDb250ZXh0LnNjcmlwdFVybCxcbiAgICAgICAgICAgICAgICBzY3JpcHRMaW5lOiBjYWxsQ29udGV4dC5zY3JpcHRMaW5lLFxuICAgICAgICAgICAgICAgIHNjcmlwdENvbDogY2FsbENvbnRleHQuc2NyaXB0Q29sLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBjYWxsQ29udGV4dC5mdW5jTmFtZSxcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsOiBjYWxsQ29udGV4dC5zY3JpcHRMb2NFdmFsLFxuICAgICAgICAgICAgICAgIGNhbGxTdGFjazogY2FsbENvbnRleHQuY2FsbFN0YWNrLFxuICAgICAgICAgICAgICAgIG9yZGluYWw6IG9yZGluYWwrKyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZW5kKFwibG9nQ2FsbFwiLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBVbnN1Y2Nlc3NmdWwgY2FsbCBsb2c6IFwiICsgaW5zdHJ1bWVudGVkRnVuY3Rpb25OYW1lKTtcbiAgICAgICAgICAgIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb2dFcnJvclRvQ29uc29sZShlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIG5hbWU6IFwiICsgZXJyb3IubmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3IgbWVzc2FnZTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBmaWxlbmFtZTogXCIgKyBlcnJvci5maWxlTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3IgbGluZSBudW1iZXI6IFwiICsgZXJyb3IubGluZU51bWJlcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3Igc3RhY2s6IFwiICsgZXJyb3Iuc3RhY2spO1xuICAgIH1cbiAgICAvLyBSb3VnaCBpbXBsZW1lbnRhdGlvbnMgb2YgT2JqZWN0LmdldFByb3BlcnR5RGVzY3JpcHRvciBhbmQgT2JqZWN0LmdldFByb3BlcnR5TmFtZXNcbiAgICAvLyBTZWUgaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTpleHRlbmRlZF9vYmplY3RfYXBpXG4gICAgT2JqZWN0LmdldFByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChzdWJqZWN0LCBuYW1lKSB7XG4gICAgICAgIGxldCBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc3ViamVjdCwgbmFtZSk7XG4gICAgICAgIGxldCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdWJqZWN0KTtcbiAgICAgICAgd2hpbGUgKHBkID09PSB1bmRlZmluZWQgJiYgcHJvdG8gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XG4gICAgICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBkO1xuICAgIH07XG4gICAgT2JqZWN0LmdldFByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzdWJqZWN0KTtcbiAgICAgICAgbGV0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHN1YmplY3QpO1xuICAgICAgICB3aGlsZSAocHJvdG8gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHByb3BzID0gcHJvcHMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKSk7XG4gICAgICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRklYTUU6IHJlbW92ZSBkdXBsaWNhdGUgcHJvcGVydHkgbmFtZXMgZnJvbSBwcm9wc1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfTtcbiAgICAvLyBIZWxwZXIgdG8gZ2V0IG9yaWdpbmF0aW5nIHNjcmlwdCB1cmxzXG4gICAgZnVuY3Rpb24gZ2V0U3RhY2tUcmFjZSgpIHtcbiAgICAgICAgbGV0IHN0YWNrO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH1cbiAgICAvLyBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUyMDIxODVcbiAgICBTdHJpbmcucHJvdG90eXBlLnJzcGxpdCA9IGZ1bmN0aW9uIChzZXAsIG1heHNwbGl0KSB7XG4gICAgICAgIGNvbnN0IHNwbGl0ID0gdGhpcy5zcGxpdChzZXApO1xuICAgICAgICByZXR1cm4gbWF4c3BsaXRcbiAgICAgICAgICAgID8gW3NwbGl0LnNsaWNlKDAsIC1tYXhzcGxpdCkuam9pbihzZXApXS5jb25jYXQoc3BsaXQuc2xpY2UoLW1heHNwbGl0KSlcbiAgICAgICAgICAgIDogc3BsaXQ7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoZ2V0Q2FsbFN0YWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdHJhY2UgPSBnZXRTdGFja1RyYWNlKClcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgLy8gcmV0dXJuIGEgY29udGV4dCBvYmplY3QgZXZlbiBpZiB0aGVyZSBpcyBhbiBlcnJvclxuICAgICAgICBjb25zdCBlbXB0eV9jb250ZXh0ID0ge1xuICAgICAgICAgICAgc2NyaXB0VXJsOiBcIlwiLFxuICAgICAgICAgICAgc2NyaXB0TGluZTogXCJcIixcbiAgICAgICAgICAgIHNjcmlwdENvbDogXCJcIixcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBcIlwiLFxuICAgICAgICAgICAgc2NyaXB0TG9jRXZhbDogXCJcIixcbiAgICAgICAgICAgIGNhbGxTdGFjazogXCJcIixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRyYWNlLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eV9jb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIC8vIDAsIDEgYW5kIDIgYXJlIE9wZW5XUE0ncyBvd24gZnVuY3Rpb25zIChlLmcuIGdldFN0YWNrVHJhY2UpLCBza2lwIHRoZW0uXG4gICAgICAgIGNvbnN0IGNhbGxTaXRlID0gdHJhY2VbM107XG4gICAgICAgIGlmICghY2FsbFNpdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eV9jb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgICAqIFN0YWNrIGZyYW1lIGZvcm1hdCBpcyBzaW1wbHk6IEZVTkNfTkFNRUBGSUxFTkFNRTpMSU5FX05POkNPTFVNTl9OT1xuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBldmFsIG9yIEZ1bmN0aW9uIGlzIGludm9sdmVkIHdlIGhhdmUgYW4gYWRkaXRpb25hbCBwYXJ0IGFmdGVyIHRoZSBGSUxFTkFNRSwgZS5nLjpcbiAgICAgICAgICogRlVOQ19OQU1FQEZJTEVOQU1FIGxpbmUgMTIzID4gZXZhbCBsaW5lIDEgPiBldmFsOkxJTkVfTk86Q09MVU1OX05PXG4gICAgICAgICAqIG9yIEZVTkNfTkFNRUBGSUxFTkFNRSBsaW5lIDIzNCA+IEZ1bmN0aW9uOkxJTkVfTk86Q09MVU1OX05PXG4gICAgICAgICAqXG4gICAgICAgICAqIFdlIHN0b3JlIHRoZSBwYXJ0IGJldHdlZW4gdGhlIEZJTEVOQU1FIGFuZCB0aGUgTElORV9OTyBpbiBzY3JpcHRMb2NFdmFsXG4gICAgICAgICAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNjcmlwdFVybCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgc2NyaXB0TG9jRXZhbCA9IFwiXCI7IC8vIGZvciBldmFsIG9yIEZ1bmN0aW9uIGNhbGxzXG4gICAgICAgICAgICBjb25zdCBjYWxsU2l0ZVBhcnRzID0gY2FsbFNpdGUuc3BsaXQoXCJAXCIpO1xuICAgICAgICAgICAgY29uc3QgZnVuY05hbWUgPSBjYWxsU2l0ZVBhcnRzWzBdIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGNhbGxTaXRlUGFydHNbMV0ucnNwbGl0KFwiOlwiLCAyKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbk5vID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBsaW5lTm8gPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgIGNvbnN0IHNjcmlwdEZpbGVOYW1lID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gM10gfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVOb0lkeCA9IHNjcmlwdEZpbGVOYW1lLmluZGV4T2YoXCIgbGluZSBcIik7IC8vIGxpbmUgaW4gdGhlIFVSTCBtZWFucyBldmFsIG9yIEZ1bmN0aW9uXG4gICAgICAgICAgICBpZiAobGluZU5vSWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNjcmlwdFVybCA9IHNjcmlwdEZpbGVOYW1lOyAvLyBUT0RPOiBzb21ldGltZXMgd2UgaGF2ZSBmaWxlbmFtZSBvbmx5LCBlLmcuIFhYLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmwgPSBzY3JpcHRGaWxlTmFtZS5zbGljZSgwLCBsaW5lTm9JZHgpO1xuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWwgPSBzY3JpcHRGaWxlTmFtZS5zbGljZShsaW5lTm9JZHggKyAxLCBzY3JpcHRGaWxlTmFtZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHNjcmlwdExpbmU6IGxpbmVObyxcbiAgICAgICAgICAgICAgICBzY3JpcHRDb2w6IGNvbHVtbk5vLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lLFxuICAgICAgICAgICAgICAgIHNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICAgICAgY2FsbFN0YWNrOiBnZXRDYWxsU3RhY2tcbiAgICAgICAgICAgICAgICAgICAgPyB0cmFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICA6IFwiXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIHBhcnNpbmcgdGhlIHNjcmlwdCBjb250ZXh0XCIsIGUsIGNhbGxTaXRlKTtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eV9jb250ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KG9iamVjdCwgcHJvcGVydHlOYW1lKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb3BlcnR5ID0gb2JqZWN0W3Byb3BlcnR5TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnR5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBudWxsIGlzIHR5cGUgXCJvYmplY3RcIlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvcGVydHkgPT09IFwib2JqZWN0XCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluc3RydW1lbnRPYmplY3Qob2JqZWN0LCBvYmplY3ROYW1lLCBsb2dTZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIC8vIFVzZSBmb3Igb2JqZWN0cyBvciBvYmplY3QgcHJvdG90eXBlc1xuICAgICAgICAvL1xuICAgICAgICAvLyBQYXJhbWV0ZXJzXG4gICAgICAgIC8vIC0tLS0tLS0tLS1cbiAgICAgICAgLy8gICBvYmplY3QgOiBPYmplY3RcbiAgICAgICAgLy8gICAgIE9iamVjdCB0byBpbnN0cnVtZW50XG4gICAgICAgIC8vICAgb2JqZWN0TmFtZSA6IFN0cmluZ1xuICAgICAgICAvLyAgICAgTmFtZSBvZiB0aGUgb2JqZWN0IHRvIGJlIGluc3RydW1lbnRlZCAoc2F2ZWQgdG8gZGF0YWJhc2UpXG4gICAgICAgIC8vICAgbG9nU2V0dGluZ3MgOiBPYmplY3RcbiAgICAgICAgLy8gICAgIChvcHRpb25hbCkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBhZGRpdGlvbmFsIGxvZ2dpbmdcbiAgICAgICAgLy8gICAgIGNvbmZpZ3VyYXRpb25zLiBTZWUgYXZhaWxhYmxlIG9wdGlvbnMgYmVsb3cuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGxvZ1NldHRpbmdzIG9wdGlvbnMgKGFsbCBvcHRpb25hbClcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyAgIHByb3BlcnRpZXNUb0luc3RydW1lbnQgOiBBcnJheVxuICAgICAgICAvLyAgICAgQW4gYXJyYXkgb2YgcHJvcGVydGllcyB0byBpbnN0cnVtZW50IG9uIHRoaXMgb2JqZWN0LiBEZWZhdWx0IGlzXG4gICAgICAgIC8vICAgICBhbGwgcHJvcGVydGllcy5cbiAgICAgICAgLy8gICBleGNsdWRlZFByb3BlcnRpZXMgOiBBcnJheVxuICAgICAgICAvLyAgICAgUHJvcGVydGllcyBleGNsdWRlZCBmcm9tIGluc3RydW1lbnRhdGlvbi4gRGVmYXVsdCBpcyBhbiBlbXB0eVxuICAgICAgICAvLyAgICAgYXJyYXkuXG4gICAgICAgIC8vICAgbG9nQ2FsbFN0YWNrIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIHRydWUgc2F2ZSB0aGUgY2FsbCBzdGFjayBpbmZvIHdpdGggZWFjaCBwcm9wZXJ0eSBjYWxsLlxuICAgICAgICAvLyAgICAgRGVmYXVsdCBpcyBgZmFsc2VgLlxuICAgICAgICAvLyAgIGxvZ0Z1bmN0aW9uc0FzU3RyaW5ncyA6IGJvb2xlYW5cbiAgICAgICAgLy8gICAgIFNldCB0byB0cnVlIHRvIHNhdmUgZnVuY3Rpb25hbCBhcmd1bWVudHMgYXMgc3RyaW5ncyBkdXJpbmdcbiAgICAgICAgLy8gICAgIGFyZ3VtZW50IHNlcmlhbGl6YXRpb24uIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAgICAgICAgLy8gICBwcmV2ZW50U2V0cyA6IGJvb2xlYW5cbiAgICAgICAgLy8gICAgIFNldCB0byB0cnVlIHRvIHByZXZlbnQgbmVzdGVkIG9iamVjdHMgYW5kIGZ1bmN0aW9ucyBmcm9tIGJlaW5nXG4gICAgICAgIC8vICAgICBvdmVyd3JpdHRlbiAoYW5kIHRodXMgaGF2aW5nIHRoZWlyIGluc3RydW1lbnRhdGlvbiByZW1vdmVkKS5cbiAgICAgICAgLy8gICAgIE90aGVyIHByb3BlcnRpZXMgKHN0YXRpYyB2YWx1ZXMpIGNhbiBzdGlsbCBiZSBzZXQgd2l0aCB0aGlzIGlzXG4gICAgICAgIC8vICAgICBlbmFibGVkLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gICAgICAgIC8vICAgcmVjdXJzaXZlIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIGB0cnVlYCB0byByZWN1cnNpdmVseSBpbnN0cnVtZW50IGFsbCBvYmplY3QgcHJvcGVydGllcyBvZlxuICAgICAgICAvLyAgICAgdGhlIGdpdmVuIGBvYmplY3RgLiBEZWZhdWx0IGlzIGBmYWxzZWBcbiAgICAgICAgLy8gICAgIE5PVEU6XG4gICAgICAgIC8vICAgICAgICgxKWBsb2dTZXR0aW5nc1sncHJvcGVydGllc1RvSW5zdHJ1bWVudCddYCBkb2VzIG5vdCBwcm9wYWdhdGVcbiAgICAgICAgLy8gICAgICAgICAgIHRvIHN1Yi1vYmplY3RzLlxuICAgICAgICAvLyAgICAgICAoMikgU3ViLW9iamVjdHMgb2YgcHJvdG90eXBlcyBjYW4gbm90IGJlIGluc3RydW1lbnRlZFxuICAgICAgICAvLyAgICAgICAgICAgcmVjdXJzaXZlbHkgYXMgdGhlc2UgcHJvcGVydGllcyBjYW4gbm90IGJlIGFjY2Vzc2VkXG4gICAgICAgIC8vICAgICAgICAgICB1bnRpbCBhbiBpbnN0YW5jZSBvZiB0aGUgcHJvdG90eXBlIGlzIGNyZWF0ZWQuXG4gICAgICAgIC8vICAgZGVwdGggOiBpbnRlZ2VyXG4gICAgICAgIC8vICAgICBSZWN1cnNpb24gbGltaXQgd2hlbiBpbnN0cnVtZW50aW5nIG9iamVjdCByZWN1cnNpdmVseS5cbiAgICAgICAgLy8gICAgIERlZmF1bHQgaXMgYDVgLlxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gbG9nU2V0dGluZ3MucHJvcGVydGllc1RvSW5zdHJ1bWVudFxuICAgICAgICAgICAgPyBsb2dTZXR0aW5ncy5wcm9wZXJ0aWVzVG9JbnN0cnVtZW50XG4gICAgICAgICAgICA6IE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGxvZ1NldHRpbmdzLmV4Y2x1ZGVkUHJvcGVydGllcyAmJlxuICAgICAgICAgICAgICAgIGxvZ1NldHRpbmdzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BlcnRpZXNbaV0pID4gLTEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGByZWN1cnNpdmVgIGZsYWcgc2V0IHdlIHdhbnQgdG8gcmVjdXJzaXZlbHkgaW5zdHJ1bWVudCBhbnlcbiAgICAgICAgICAgIC8vIG9iamVjdCBwcm9wZXJ0aWVzIHRoYXQgYXJlbid0IHRoZSBwcm90b3R5cGUgb2JqZWN0LiBPbmx5IHJlY3Vyc2UgaWZcbiAgICAgICAgICAgIC8vIGRlcHRoIG5vdCBzZXQgKGF0IHdoaWNoIHBvaW50IGl0cyBzZXQgdG8gZGVmYXVsdCkgb3Igbm90IGF0IGxpbWl0LlxuICAgICAgICAgICAgaWYgKCEhbG9nU2V0dGluZ3MucmVjdXJzaXZlICYmXG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1tpXSAhPT0gXCJfX3Byb3RvX19cIiAmJlxuICAgICAgICAgICAgICAgIGlzT2JqZWN0KG9iamVjdCwgcHJvcGVydGllc1tpXSkgJiZcbiAgICAgICAgICAgICAgICAoIShcImRlcHRoXCIgaW4gbG9nU2V0dGluZ3MpIHx8IGxvZ1NldHRpbmdzLmRlcHRoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgcmVjdXJzaW9uIGxpbWl0IHRvIGRlZmF1bHQgaWYgbm90IHNwZWNpZmllZFxuICAgICAgICAgICAgICAgIGlmICghKFwiZGVwdGhcIiBpbiBsb2dTZXR0aW5ncykpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nU2V0dGluZ3MuZGVwdGggPSA1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50T2JqZWN0KG9iamVjdFtwcm9wZXJ0aWVzW2ldXSwgb2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydGllc1tpXSwge1xuICAgICAgICAgICAgICAgICAgICBleGNsdWRlZFByb3BlcnRpZXM6IGxvZ1NldHRpbmdzLmV4Y2x1ZGVkUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgbG9nQ2FsbFN0YWNrOiBsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2ssXG4gICAgICAgICAgICAgICAgICAgIGxvZ0Z1bmN0aW9uc0FzU3RyaW5nczogbG9nU2V0dGluZ3MubG9nRnVuY3Rpb25zQXNTdHJpbmdzLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50U2V0czogbG9nU2V0dGluZ3MucHJldmVudFNldHMsXG4gICAgICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZTogbG9nU2V0dGluZ3MucmVjdXJzaXZlLFxuICAgICAgICAgICAgICAgICAgICBkZXB0aDogbG9nU2V0dGluZ3MuZGVwdGggLSAxLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkob2JqZWN0LCBvYmplY3ROYW1lLCBwcm9wZXJ0aWVzW2ldLCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2dFcnJvclRvQ29uc29sZShlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gTG9nIGNhbGxzIHRvIGEgZ2l2ZW4gZnVuY3Rpb25cbiAgICAvLyBUaGlzIGhlbHBlciBmdW5jdGlvbiByZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgYGZ1bmNgIHdoaWNoIGxvZ3MgY2FsbHNcbiAgICAvLyB0byBgZnVuY2AuIGBvYmplY3ROYW1lYCBhbmQgYG1ldGhvZE5hbWVgIGFyZSB1c2VkIHN0cmljdGx5IHRvIGlkZW50aWZ5XG4gICAgLy8gd2hpY2ggb2JqZWN0IG1ldGhvZCBgZnVuY2AgaXMgY29taW5nIGZyb20gaW4gdGhlIGxvZ3NcbiAgICBmdW5jdGlvbiBpbnN0cnVtZW50RnVuY3Rpb24ob2JqZWN0TmFtZSwgbWV0aG9kTmFtZSwgZnVuYywgbG9nU2V0dGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0gZ2V0T3JpZ2luYXRpbmdTY3JpcHRDb250ZXh0KCEhbG9nU2V0dGluZ3MubG9nQ2FsbFN0YWNrKTtcbiAgICAgICAgICAgIGxvZ0NhbGwob2JqZWN0TmFtZSArIFwiLlwiICsgbWV0aG9kTmFtZSwgYXJndW1lbnRzLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gTG9nIHByb3BlcnRpZXMgb2YgcHJvdG90eXBlcyBhbmQgb2JqZWN0c1xuICAgIGZ1bmN0aW9uIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShvYmplY3QsIG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgbG9nU2V0dGluZ3MgPSB7fSkge1xuICAgICAgICAvLyBTdG9yZSBvcmlnaW5hbCBkZXNjcmlwdG9yIGluIGNsb3N1cmVcbiAgICAgICAgY29uc3QgcHJvcERlc2MgPSBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgaWYgKCFwcm9wRGVzYykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb3BlcnR5IGRlc2NyaXB0b3Igbm90IGZvdW5kIGZvclwiLCBvYmplY3ROYW1lLCBwcm9wZXJ0eU5hbWUsIG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW5zdHJ1bWVudCBkYXRhIG9yIGFjY2Vzc29yIHByb3BlcnR5IGRlc2NyaXB0b3JzXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsR2V0dGVyID0gcHJvcERlc2MuZ2V0O1xuICAgICAgICBjb25zdCBvcmlnaW5hbFNldHRlciA9IHByb3BEZXNjLnNldDtcbiAgICAgICAgbGV0IG9yaWdpbmFsVmFsdWUgPSBwcm9wRGVzYy52YWx1ZTtcbiAgICAgICAgLy8gV2Ugb3ZlcndyaXRlIGJvdGggZGF0YSBhbmQgYWNjZXNzb3IgcHJvcGVydGllcyBhcyBhbiBpbnN0cnVtZW50ZWRcbiAgICAgICAgLy8gYWNjZXNzb3IgcHJvcGVydHlcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9yaWdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoISFsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb3JpZ2luYWwgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsR2V0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBhY2Nlc3NvciBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ1Byb3BlcnR5ID0gb3JpZ2luYWxHZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChcInZhbHVlXCIgaW4gcHJvcERlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGRhdGEgcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdQcm9wZXJ0eSA9IG9yaWdpbmFsVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvcGVydHkgZGVzY3JpcHRvciBmb3JcIiwgb2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCBcImRvZXNuJ3QgaGF2ZSBnZXR0ZXIgb3IgdmFsdWU/XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCBcIlwiLCBcImdldChmYWlsZWQpXCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nIGBnZXRzYCBleGNlcHQgdGhvc2UgdGhhdCBoYXZlIGluc3RydW1lbnRlZCByZXR1cm4gdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIC8vICogQWxsIHJldHVybmVkIGZ1bmN0aW9ucyBhcmUgaW5zdHJ1bWVudGVkIHdpdGggYSB3cmFwcGVyXG4gICAgICAgICAgICAgICAgICAgIC8vICogUmV0dXJuZWQgb2JqZWN0cyBtYXkgYmUgaW5zdHJ1bWVudGVkIGlmIHJlY3Vyc2l2ZVxuICAgICAgICAgICAgICAgICAgICAvLyAgIGluc3RydW1lbnRhdGlvbiBpcyBlbmFibGVkIGFuZCB0aGlzIGlzbid0IGF0IHRoZSBkZXB0aCBsaW1pdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnUHJvcGVydHkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RydW1lbnRGdW5jdGlvbihvYmplY3ROYW1lLCBwcm9wZXJ0eU5hbWUsIG9yaWdQcm9wZXJ0eSwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcmlnUHJvcGVydHkgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICEhbG9nU2V0dGluZ3MucmVjdXJzaXZlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoIShcImRlcHRoXCIgaW4gbG9nU2V0dGluZ3MpIHx8IGxvZ1NldHRpbmdzLmRlcHRoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnUHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIG9yaWdQcm9wZXJ0eSwgXCJnZXRcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnUHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkoKSxcbiAgICAgICAgICAgIHNldDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0gZ2V0T3JpZ2luYXRpbmdTY3JpcHRDb250ZXh0KCEhbG9nU2V0dGluZ3MubG9nQ2FsbFN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHNldHMgZm9yIGZ1bmN0aW9ucyBhbmQgb2JqZWN0cyBpZiBlbmFibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmICghIWxvZ1NldHRpbmdzLnByZXZlbnRTZXRzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIG9yaWdpbmFsVmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvcmlnaW5hbFZhbHVlID09PSBcIm9iamVjdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCB2YWx1ZSwgXCJzZXQocHJldmVudGVkKVwiLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBuZXcgdmFsdWUgdG8gb3JpZ2luYWwgc2V0dGVyL2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFNldHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWNjZXNzb3IgcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gb3JpZ2luYWxTZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIHByb3BEZXNjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbkxvZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmlzUHJvdG90eXBlT2YodGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUHJvcGVydHkgZGVzY3JpcHRvciBmb3JcIiwgb2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCBcImRvZXNuJ3QgaGF2ZSBzZXR0ZXIgb3IgdmFsdWU/XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCB2YWx1ZSwgXCJzZXQoZmFpbGVkKVwiLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGxvZyBzZXRcbiAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCB2YWx1ZSwgXCJzZXRcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIG5ldyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0LFxuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHksXG4gICAgICAgIGluc3RydW1lbnRGdW5jdGlvbixcbiAgICAgICAgbG9nQ2FsbCxcbiAgICAgICAgbG9nVmFsdWUsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFuTXRhVzV6ZEhKMWJXVnVkSE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12YkdsaUwycHpMV2x1YzNSeWRXMWxiblJ6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMR2xGUVVGcFJUdEJRVU5xUlN4dlJrRkJiMFk3UVVFd1FuQkdMRTFCUVUwc1ZVRkJWU3hoUVVGaExFTkJRVU1zVVVGQlVTeEZRVUZGTEc5Q1FVRnZRanRKUVVNeFJEczdPMDlCUjBjN1NVRkZTQ3h2UTBGQmIwTTdTVUZEY0VNc1UwRkJVeXhSUVVGUkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUlN4VFFVRlRMRWRCUVVjc1MwRkJTenRSUVVNM1F5eEpRVUZKTEU5QlFVOHNSVUZCUlN4SlFVRkpMRVZCUVVVc1QwRkJUeXhGUVVGRkxGTkJRVk1zUlVGQlJTeE5RVUZOTEVOQlFVTTdVVUZGT1VNc1RVRkJUU3hMUVVGTExFZEJRVWM3V1VGRFdpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzVTBGQlV5eERRVUZETzFsQlEzQkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFbEJRVWtzUlVGQlJUdG5Ra0ZEWml4UFFVRlBMRWRCUVVjc1ZVRkJWU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNN1lVRkRNVU03YVVKQlFVMDdaMEpCUTB3c1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF6dG5Ra0ZEWml4SlFVRkpMRU5CUVVNc1UwRkJVeXhGUVVGRk8yOUNRVU5rTEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0dlFrRkRia01zVDBGQlR5eEhRVUZITEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNN2FVSkJRM1pDTzJGQlEwWTdVVUZEU0N4RFFVRkRMRU5CUVVNN1VVRkZSaXhQUVVGUE8xbEJRMHdzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXp0WlFVTm1MRWxCUVVrc1IwRkJSeXhUUVVGVExFTkJRVU03V1VGRGFrSXNVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF6dFpRVU4yUWl4TlFVRk5MRTlCUVU4c1IwRkJSeXhUUVVGVExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZEZEVNc1NVRkJTU3hEUVVGRExFOUJRVThzUlVGQlJUdG5Ra0ZEV2l4UFFVRlBMRWRCUVVjc1ZVRkJWU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0aFFVTnVRenRaUVVORUxFbEJRVWtzVDBGQlR5eEZRVUZGTzJkQ1FVTllMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRuUWtGRGJrTXNUMEZCVHl4SFFVRkhMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU03WVVGRGRrSTdXVUZGUkN4UFFVRlBMRTFCUVUwc1EwRkJRenRSUVVOb1FpeERRVUZETEVOQlFVTTdTVUZEU2l4RFFVRkRPMGxCUlVRc09FTkJRVGhETzBsQlF6bERMRk5CUVZNc2JVSkJRVzFDTEVOQlFVTXNUMEZCVHl4RlFVRkZMR05CUVdNc1IwRkJSeXhMUVVGTE8xRkJRekZFTEVsQlFVa3NUMEZCVHl4TFFVRkxMRkZCUVZFc1EwRkJReXhKUVVGSkxFVkJRVVU3V1VGRE4wSXNUMEZCVHl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRE8xTkJRM2hDTzFGQlEwUXNTVUZCU1N4UFFVRlBMRU5CUVVNc1ZVRkJWU3hMUVVGTExFbEJRVWtzUlVGQlJUdFpRVU12UWl4UFFVRlBMRTlCUVU4c1IwRkJSeXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETzFOQlEyeERPMUZCUlVRc1NVRkJTU3haUVVGWkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzSkNMRTFCUVUwc1VVRkJVU3hIUVVGSExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNWVUZCVlN4RFFVRkRPMUZCUXk5RExFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhSUVVGUkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZPMWxCUTNoRExFMUJRVTBzVDBGQlR5eEhRVUZITEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNMVFpeEpRVUZKTEU5QlFVOHNTMEZCU3l4UFFVRlBMRVZCUVVVN1owSkJRM1pDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRzFDUVVGdFFpeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlZMRVZCUVVVc1kwRkJZeXhEUVVGRExFTkJRVU03WjBKQlEyNUZMRWxCUVVrc1NVRkJTU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEU5QlFVOHNSMEZCUnl4SFFVRkhMRWRCUVVjc1dVRkJXU3hEUVVGRE8yZENRVU51UkN4SlFVRkpMRWxCUVVrc1IwRkJSeXhIUVVGSExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTTdaMEpCUTNwQ0xFbEJRVWtzU1VGQlNTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJRenRuUWtGRGFFTXNTVUZCU1N4alFVRmpMRVZCUVVVN2IwSkJRMnhDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExFMUJRVTBzUTBGQlF6dHZRa0ZETjBJc1NVRkJTU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJRenR2UWtGRGNFTXNTVUZCU1N4SlFVRkpMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEZWQlFWVXNRMEZCUXp0cFFrRkRlRU03WjBKQlEwUXNTVUZCU1N4UFFVRlBMRU5CUVVNc1QwRkJUeXhMUVVGTExFZEJRVWNzUlVGQlJUdHZRa0ZETTBJc1NVRkJTU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRPMmxDUVVNMVFqdG5Ra0ZEUkN4SlFVRkpMRWxCUVVrc1IwRkJSeXhEUVVGRE8yZENRVU5hTEU5QlFVOHNTVUZCU1N4RFFVRkRPMkZCUTJJN1dVRkRSQ3hKUVVGSkxFOUJRVThzUTBGQlF5eFJRVUZSTEV0QlFVc3NRMEZCUXl4SlFVRkpMRTlCUVU4c1EwRkJReXhQUVVGUExFdEJRVXNzVDBGQlR5eERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkRha1VzV1VGQldTeEZRVUZGTEVOQlFVTTdZVUZEYUVJN1UwRkRSanRKUVVOSUxFTkJRVU03U1VGRlJDeG5RMEZCWjBNN1NVRkRhRU1zVTBGQlV5eGxRVUZsTEVOQlFVTXNUVUZCVFN4RlFVRkZMR3RDUVVGclFpeEhRVUZITEV0QlFVczdVVUZEZWtRc05FSkJRVFJDTzFGQlF6VkNMRWxCUVVrN1dVRkRSaXhKUVVGSkxFMUJRVTBzUzBGQlN5eEpRVUZKTEVWQlFVVTdaMEpCUTI1Q0xFOUJRVThzVFVGQlRTeERRVUZETzJGQlEyWTdXVUZEUkN4SlFVRkpMRTlCUVU4c1RVRkJUU3hMUVVGTExGVkJRVlVzUlVGQlJUdG5Ra0ZEYUVNc1NVRkJTU3hyUWtGQmEwSXNSVUZCUlR0dlFrRkRkRUlzVDBGQlR5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNN2FVSkJRekZDTzNGQ1FVRk5PMjlDUVVOTUxFOUJRVThzVlVGQlZTeERRVUZETzJsQ1FVTnVRanRoUVVOR08xbEJRMFFzU1VGQlNTeFBRVUZQTEUxQlFVMHNTMEZCU3l4UlFVRlJMRVZCUVVVN1owSkJRemxDTEU5QlFVOHNUVUZCVFN4RFFVRkRPMkZCUTJZN1dVRkRSQ3hOUVVGTkxGZEJRVmNzUjBGQlJ5eEZRVUZGTEVOQlFVTTdXVUZEZGtJc1QwRkJUeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEUxQlFVMHNSVUZCUlN4VlFVRlRMRWRCUVVjc1JVRkJSU3hMUVVGTE8yZENRVU12UXl4SlFVRkpMRXRCUVVzc1MwRkJTeXhKUVVGSkxFVkJRVVU3YjBKQlEyeENMRTlCUVU4c1RVRkJUU3hEUVVGRE8ybENRVU5tTzJkQ1FVTkVMRWxCUVVrc1QwRkJUeXhMUVVGTExFdEJRVXNzVlVGQlZTeEZRVUZGTzI5Q1FVTXZRaXhKUVVGSkxHdENRVUZyUWl4RlFVRkZPM2RDUVVOMFFpeFBRVUZQTEV0QlFVc3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJRenR4UWtGRGVrSTdlVUpCUVUwN2QwSkJRMHdzVDBGQlR5eFZRVUZWTEVOQlFVTTdjVUpCUTI1Q08ybENRVU5HTzJkQ1FVTkVMRWxCUVVrc1QwRkJUeXhMUVVGTExFdEJRVXNzVVVGQlVTeEZRVUZGTzI5Q1FVTTNRaXh4UTBGQmNVTTdiMEpCUTNKRExFbEJRVWtzYVVKQlFXbENMRWxCUVVrc1MwRkJTeXhGUVVGRk8zZENRVU01UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExHVkJRV1VzUTBGQlF6dHhRa0ZETDBJN2IwSkJSVVFzZVVKQlFYbENPMjlDUVVONlFpeEpRVUZKTEV0QlFVc3NXVUZCV1N4WFFVRlhMRVZCUVVVN2QwSkJRMmhETEU5QlFVOHNiVUpCUVcxQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdjVUpCUTI1RE8yOUNRVVZFTEN0Q1FVRXJRanR2UWtGREwwSXNTVUZCU1N4SFFVRkhMRXRCUVVzc1JVRkJSU3hKUVVGSkxGZEJRVmNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRk8zZENRVU5vUkN4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzNkQ1FVTjRRaXhQUVVGUExFdEJRVXNzUTBGQlF6dHhRa0ZEWkR0NVFrRkJUVHQzUWtGRFRDeFBRVUZQTEU5QlFVOHNTMEZCU3l4RFFVRkRPM0ZDUVVOeVFqdHBRa0ZEUmp0blFrRkRSQ3hQUVVGUExFdEJRVXNzUTBGQlF6dFpRVU5tTEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTBvN1VVRkJReXhQUVVGUExFdEJRVXNzUlVGQlJUdFpRVU5rTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1owTkJRV2RETEVkQlFVY3NTMEZCU3l4RFFVRkRMRU5CUVVNN1dVRkRkRVFzVDBGQlR5eDFRa0ZCZFVJc1IwRkJSeXhMUVVGTExFTkJRVU03VTBGRGVFTTdTVUZEU0N4RFFVRkRPMGxCUlVRN08wOUJSVWM3U1VGRlNDeE5RVUZOTEZkQlFWY3NSMEZCUnl4VlFVRlRMRk5CUVZNc1JVRkJSU3h4UWtGQmNVSTdVVUZETTBRc1NVRkJTU3hSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEyeENMRzFEUVVGdFF6dFJRVU51UXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhSUVVGUkxFTkJRVU03V1VGRGNrSXNjVUpCUVhGQ0xFTkJRVU1zVTBGQlV5eEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUlRORExHdENRVUZyUWp0WlFVTnNRaXhSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEyaENMRU5CUVVNc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFJRVVZTTEU5QlFVOHNWVUZCVXl4UFFVRlBMRVZCUVVVc1IwRkJSenRaUVVNeFFpeHZRa0ZCYjBJN1dVRkRjRUlzVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRMME1zUzBGQlN5eEZRVUZGTEVOQlFVTTdVVUZEVml4RFFVRkRMRU5CUVVNN1NVRkRTaXhEUVVGRExFTkJRVU03U1VGRlJpeE5RVUZOTEVsQlFVa3NSMEZCUnl4WFFVRlhMRU5CUVVNc1VVRkJVU3hGUVVGRkxHOUNRVUZ2UWl4RFFVRkRMRU5CUVVNN1NVRkZla1FzYlVWQlFXMUZPMGxCUTI1RkxFMUJRVTBzVjBGQlZ5eEhRVUZITEVkQlFVY3NRMEZCUXp0SlFVTjRRaXhOUVVGTkxGVkJRVlVzUjBGQlJ5eEpRVUZKTEUxQlFVMHNSVUZCUlN4RFFVRkRPMGxCUldoRExGTkJRVk1zTWtKQlFUSkNMRU5CUVVNc1UwRkJVeXhGUVVGRkxFMUJRVTA3VVVGRGNFUXNUVUZCVFN4SFFVRkhMRWRCUVVjc1UwRkJVeXhIUVVGSExFZEJRVWNzUjBGQlJ5eE5RVUZOTEVOQlFVTTdVVUZEY2tNc1NVRkJTU3hIUVVGSExFbEJRVWtzVlVGQlZTeEpRVUZKTEZWQlFWVXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hYUVVGWExFVkJRVVU3V1VGRGRrUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1UwRkRZanRoUVVGTkxFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4VlFVRlZMRU5CUVVNc1JVRkJSVHRaUVVNdlFpeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xTkJRM0pDTzJGQlFVMDdXVUZEVEN4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFOQlEzUkNPMUZCUTBRc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRFppeERRVUZETzBsQlJVUXNLME5CUVN0RE8wbEJReTlETEVsQlFVa3NTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVWc1FpeG5SRUZCWjBRN1NVRkRhRVFzU1VGQlNTeFBRVUZQTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUldoQ0xIbERRVUY1UXp0SlFVTjZReXhUUVVGVExGRkJRVkVzUTBGRFppeDNRa0ZCZDBJc1JVRkRlRUlzUzBGQlN5eEZRVU5NTEZOQlFWTXNSVUZEVkN4WFFVRlhMRVZCUTFnc1YwRkJWenRSUVVWWUxFbEJRVWtzUzBGQlN5eEZRVUZGTzFsQlExUXNUMEZCVHp0VFFVTlNPMUZCUTBRc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF6dFJRVVZpTEUxQlFVMHNVMEZCVXl4SFFVRkhMREpDUVVFeVFpeERRVU16UXl4WFFVRlhMRU5CUVVNc1UwRkJVeXhGUVVOeVFpeDNRa0ZCZDBJc1EwRkRla0lzUTBGQlF6dFJRVU5HTEVsQlFVa3NVMEZCVXl4RlFVRkZPMWxCUTJJc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dFpRVU5rTEU5QlFVODdVMEZEVWp0UlFVVkVMRTFCUVUwc1IwRkJSeXhIUVVGSE8xbEJRMVlzVTBGQlV6dFpRVU5VTEUxQlFVMHNSVUZCUlN4M1FrRkJkMEk3V1VGRGFFTXNTMEZCU3l4RlFVRkZMR1ZCUVdVc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF5eERRVUZETEZkQlFWY3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dFpRVU5zUlN4VFFVRlRMRVZCUVVVc1YwRkJWeXhEUVVGRExGTkJRVk03V1VGRGFFTXNWVUZCVlN4RlFVRkZMRmRCUVZjc1EwRkJReXhWUVVGVk8xbEJRMnhETEZOQlFWTXNSVUZCUlN4WFFVRlhMRU5CUVVNc1UwRkJVenRaUVVOb1F5eFJRVUZSTEVWQlFVVXNWMEZCVnl4RFFVRkRMRkZCUVZFN1dVRkRPVUlzWVVGQllTeEZRVUZGTEZkQlFWY3NRMEZCUXl4aFFVRmhPMWxCUTNoRExGTkJRVk1zUlVGQlJTeFhRVUZYTEVOQlFVTXNVMEZCVXp0WlFVTm9ReXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTzFOQlEyNUNMRU5CUVVNN1VVRkZSaXhKUVVGSk8xbEJRMFlzU1VGQlNTeERRVUZETEZWQlFWVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRUUVVOMlFqdFJRVUZETEU5QlFVOHNTMEZCU3l4RlFVRkZPMWxCUTJRc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eHJRMEZCYTBNc1EwRkJReXhEUVVGRE8xbEJRMmhFTEdsQ1FVRnBRaXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFOQlF6RkNPMUZCUlVRc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVU5vUWl4RFFVRkRPMGxCUlVRc1owSkJRV2RDTzBsQlEyaENMRk5CUVZNc1QwRkJUeXhEUVVGRExIZENRVUYzUWl4RlFVRkZMRWxCUVVrc1JVRkJSU3hYUVVGWExFVkJRVVVzVjBGQlZ6dFJRVU4yUlN4SlFVRkpMRXRCUVVzc1JVRkJSVHRaUVVOVUxFOUJRVTg3VTBGRFVqdFJRVU5FTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNN1VVRkZZaXhOUVVGTkxGTkJRVk1zUjBGQlJ5d3lRa0ZCTWtJc1EwRkRNME1zVjBGQlZ5eERRVUZETEZOQlFWTXNSVUZEY2tJc2QwSkJRWGRDTEVOQlEzcENMRU5CUVVNN1VVRkRSaXhKUVVGSkxGTkJRVk1zUlVGQlJUdFpRVU5pTEV0QlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNN1dVRkRaQ3hQUVVGUE8xTkJRMUk3VVVGRlJDeEpRVUZKTzFsQlEwWXNjVVZCUVhGRk8xbEJRM0pGTEUxQlFVMHNWVUZCVlN4SFFVRkhMRVZCUVVVc1EwRkJRenRaUVVOMFFpeExRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRuUWtGRGNFTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkRZaXhsUVVGbExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zY1VKQlFYRkNMRU5CUVVNc1EwRkRPVVFzUTBGQlF6dGhRVU5JTzFsQlEwUXNUVUZCVFN4SFFVRkhMRWRCUVVjN1owSkJRMVlzVTBGQlV5eEZRVUZGTEUxQlFVMDdaMEpCUTJwQ0xFMUJRVTBzUlVGQlJTeDNRa0ZCZDBJN1owSkJRMmhETEVsQlFVa3NSVUZCUlN4VlFVRlZPMmRDUVVOb1FpeExRVUZMTEVWQlFVVXNSVUZCUlR0blFrRkRWQ3hUUVVGVExFVkJRVVVzVjBGQlZ5eERRVUZETEZOQlFWTTdaMEpCUTJoRExGVkJRVlVzUlVGQlJTeFhRVUZYTEVOQlFVTXNWVUZCVlR0blFrRkRiRU1zVTBGQlV5eEZRVUZGTEZkQlFWY3NRMEZCUXl4VFFVRlRPMmRDUVVOb1F5eFJRVUZSTEVWQlFVVXNWMEZCVnl4RFFVRkRMRkZCUVZFN1owSkJRemxDTEdGQlFXRXNSVUZCUlN4WFFVRlhMRU5CUVVNc1lVRkJZVHRuUWtGRGVFTXNVMEZCVXl4RlFVRkZMRmRCUVZjc1EwRkJReXhUUVVGVE8yZENRVU5vUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8yRkJRMjVDTEVOQlFVTTdXVUZEUml4SlFVRkpMRU5CUVVNc1UwRkJVeXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFOQlEzUkNPMUZCUVVNc1QwRkJUeXhMUVVGTExFVkJRVVU3V1VGRFpDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVTlVMR3REUVVGclF5eEhRVUZITEhkQ1FVRjNRaXhEUVVNNVJDeERRVUZETzFsQlEwWXNhVUpCUVdsQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdVMEZETVVJN1VVRkRSQ3hMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETzBsQlEyaENMRU5CUVVNN1NVRkZSQ3hUUVVGVExHbENRVUZwUWl4RFFVRkRMRXRCUVVzN1VVRkRPVUlzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4MVFrRkJkVUlzUjBGQlJ5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRiRVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3d1FrRkJNRUlzUjBGQlJ5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRlRVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3eVFrRkJNa0lzUjBGQlJ5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkRNVVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3NFFrRkJPRUlzUjBGQlJ5eExRVUZMTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNN1VVRkRMMFFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4M1FrRkJkMElzUjBGQlJ5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1NVRkRkRVFzUTBGQlF6dEpRVVZFTEc5R1FVRnZSanRKUVVOd1JpeDVSVUZCZVVVN1NVRkRla1VzVFVGQlRTeERRVUZETEhGQ1FVRnhRaXhIUVVGSExGVkJRVk1zVDBGQlR5eEZRVUZGTEVsQlFVazdVVUZEYmtRc1NVRkJTU3hGUVVGRkxFZEJRVWNzVFVGQlRTeERRVUZETEhkQ1FVRjNRaXhEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTjRSQ3hKUVVGSkxFdEJRVXNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRek5ETEU5QlFVOHNSVUZCUlN4TFFVRkxMRk5CUVZNc1NVRkJTU3hMUVVGTExFdEJRVXNzU1VGQlNTeEZRVUZGTzFsQlEzcERMRVZCUVVVc1IwRkJSeXhOUVVGTkxFTkJRVU1zZDBKQlFYZENMRU5CUVVNc1MwRkJTeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFsQlEyeEVMRXRCUVVzc1IwRkJSeXhOUVVGTkxFTkJRVU1zWTBGQll5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMU5CUTNSRE8xRkJRMFFzVDBGQlR5eEZRVUZGTEVOQlFVTTdTVUZEV2l4RFFVRkRMRU5CUVVNN1NVRkZSaXhOUVVGTkxFTkJRVU1zWjBKQlFXZENMRWRCUVVjc1ZVRkJVeXhQUVVGUE8xRkJRM2hETEVsQlFVa3NTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRSUVVOb1JDeEpRVUZKTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6TkRMRTlCUVU4c1MwRkJTeXhMUVVGTExFbEJRVWtzUlVGQlJUdFpRVU55UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRSQ3hMUVVGTExFZEJRVWNzVFVGQlRTeERRVUZETEdOQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRUUVVOMFF6dFJRVU5FTEc5RVFVRnZSRHRSUVVOd1JDeFBRVUZQTEV0QlFVc3NRMEZCUXp0SlFVTm1MRU5CUVVNc1EwRkJRenRKUVVWR0xIZERRVUYzUXp0SlFVTjRReXhUUVVGVExHRkJRV0U3VVVGRGNFSXNTVUZCU1N4TFFVRkxMRU5CUVVNN1VVRkZWaXhKUVVGSk8xbEJRMFlzVFVGQlRTeEpRVUZKTEV0QlFVc3NSVUZCUlN4RFFVRkRPMU5CUTI1Q08xRkJRVU1zVDBGQlR5eEhRVUZITEVWQlFVVTdXVUZEV2l4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF6dFRRVU51UWp0UlFVVkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF6dEpRVVZFTERCRFFVRXdRenRKUVVNeFF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRTFCUVUwc1IwRkJSeXhWUVVGVExFZEJRVWNzUlVGQlJTeFJRVUZSTzFGQlF6bERMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkRPVUlzVDBGQlR5eFJRVUZSTzFsQlEySXNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMWxCUTNSRkxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTTdTVUZEV2l4RFFVRkRMRU5CUVVNN1NVRkZSaXhUUVVGVExESkNRVUV5UWl4RFFVRkRMRmxCUVZrc1IwRkJSeXhMUVVGTE8xRkJRM1pFTEUxQlFVMHNTMEZCU3l4SFFVRkhMR0ZCUVdFc1JVRkJSVHRoUVVNeFFpeEpRVUZKTEVWQlFVVTdZVUZEVGl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRFppeHZSRUZCYjBRN1VVRkRjRVFzVFVGQlRTeGhRVUZoTEVkQlFVYzdXVUZEY0VJc1UwRkJVeXhGUVVGRkxFVkJRVVU3V1VGRFlpeFZRVUZWTEVWQlFVVXNSVUZCUlR0WlFVTmtMRk5CUVZNc1JVRkJSU3hGUVVGRk8xbEJRMklzVVVGQlVTeEZRVUZGTEVWQlFVVTdXVUZEV2l4aFFVRmhMRVZCUVVVc1JVRkJSVHRaUVVOcVFpeFRRVUZUTEVWQlFVVXNSVUZCUlR0VFFVTmtMRU5CUVVNN1VVRkRSaXhKUVVGSkxFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RlFVRkZPMWxCUTNCQ0xFOUJRVThzWVVGQllTeERRVUZETzFOQlEzUkNPMUZCUTBRc01FVkJRVEJGTzFGQlF6RkZMRTFCUVUwc1VVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTXhRaXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTzFsQlEySXNUMEZCVHl4aFFVRmhMRU5CUVVNN1UwRkRkRUk3VVVGRFJEczdPenM3T3pzN1YwRlJSenRSUVVOSUxFbEJRVWs3V1VGRFJpeEpRVUZKTEZOQlFWTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1dVRkRia0lzU1VGQlNTeGhRVUZoTEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc05rSkJRVFpDTzFsQlEzSkVMRTFCUVUwc1lVRkJZU3hIUVVGSExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRNVU1zVFVGQlRTeFJRVUZSTEVkQlFVY3NZVUZCWVN4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF6dFpRVU40UXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhoUVVGaExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU01UXl4TlFVRk5MRkZCUVZFc1IwRkJSeXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVONlF5eE5RVUZOTEUxQlFVMHNSMEZCUnl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjJReXhOUVVGTkxHTkJRV01zUjBGQlJ5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEY2tRc1RVRkJUU3hUUVVGVExFZEJRVWNzWTBGQll5eERRVUZETEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExIbERRVUY1UXp0WlFVTTNSaXhKUVVGSkxGTkJRVk1zUzBGQlN5eERRVUZETEVOQlFVTXNSVUZCUlR0blFrRkRjRUlzVTBGQlV5eEhRVUZITEdOQlFXTXNRMEZCUXl4RFFVRkRMRzlFUVVGdlJEdGhRVU5xUmp0cFFrRkJUVHRuUWtGRFRDeFRRVUZUTEVkQlFVY3NZMEZCWXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFVkJRVVVzVTBGQlV5eERRVUZETEVOQlFVTTdaMEpCUXk5RExHRkJRV0VzUjBGQlJ5eGpRVUZqTEVOQlFVTXNTMEZCU3l4RFFVTnNReXhUUVVGVExFZEJRVWNzUTBGQlF5eEZRVU5pTEdOQlFXTXNRMEZCUXl4TlFVRk5MRU5CUTNSQ0xFTkJRVU03WVVGRFNEdFpRVU5FTEUxQlFVMHNWMEZCVnl4SFFVRkhPMmRDUVVOc1FpeFRRVUZUTzJkQ1FVTlVMRlZCUVZVc1JVRkJSU3hOUVVGTk8yZENRVU5zUWl4VFFVRlRMRVZCUVVVc1VVRkJVVHRuUWtGRGJrSXNVVUZCVVR0blFrRkRVaXhoUVVGaE8yZENRVU5pTEZOQlFWTXNSVUZCUlN4WlFVRlpPMjlDUVVOeVFpeERRVUZETEVOQlFVTXNTMEZCU3p0NVFrRkRSaXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzNsQ1FVTlNMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU03ZVVKQlExWXNTVUZCU1N4RlFVRkZPMjlDUVVOWUxFTkJRVU1zUTBGQlF5eEZRVUZGTzJGQlExQXNRMEZCUXp0WlFVTkdMRTlCUVU4c1YwRkJWeXhEUVVGRE8xTkJRM0JDTzFGQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRWaXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETERKRFFVRXlReXhGUVVGRkxFTkJRVU1zUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0WlFVTjBSU3hQUVVGUExHRkJRV0VzUTBGQlF6dFRRVU4wUWp0SlFVTklMRU5CUVVNN1NVRkZSQ3hUUVVGVExGRkJRVkVzUTBGQlF5eE5RVUZOTEVWQlFVVXNXVUZCV1R0UlFVTndReXhKUVVGSkxGRkJRVkVzUTBGQlF6dFJRVU5pTEVsQlFVazdXVUZEUml4UlFVRlJMRWRCUVVjc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eERRVUZETzFOQlEycERPMUZCUVVNc1QwRkJUeXhMUVVGTExFVkJRVVU3V1VGRFpDeFBRVUZQTEV0QlFVc3NRMEZCUXp0VFFVTmtPMUZCUTBRc1NVRkJTU3hSUVVGUkxFdEJRVXNzU1VGQlNTeEZRVUZGTzFsQlEzSkNMSGRDUVVGM1FqdFpRVU40UWl4UFFVRlBMRXRCUVVzc1EwRkJRenRUUVVOa08xRkJRMFFzVDBGQlR5eFBRVUZQTEZGQlFWRXNTMEZCU3l4UlFVRlJMRU5CUVVNN1NVRkRkRU1zUTBGQlF6dEpRVVZFTEZOQlFWTXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeEZRVUZGTEZWQlFWVXNSVUZCUlN4alFVRXlRaXhGUVVGRk8xRkJRM3BGTEhWRFFVRjFRenRSUVVOMlF5eEZRVUZGTzFGQlEwWXNZVUZCWVR0UlFVTmlMR0ZCUVdFN1VVRkRZaXh2UWtGQmIwSTdVVUZEY0VJc01rSkJRVEpDTzFGQlF6TkNMSGRDUVVGM1FqdFJRVU40UWl4blJVRkJaMFU3VVVGRGFFVXNlVUpCUVhsQ08xRkJRM3BDTEhWRlFVRjFSVHRSUVVOMlJTeHRSRUZCYlVRN1VVRkRia1FzUlVGQlJUdFJRVU5HTEhGRFFVRnhRenRSUVVOeVF5eHpRa0ZCYzBJN1VVRkRkRUlzYlVOQlFXMURPMUZCUTI1RExITkZRVUZ6UlR0UlFVTjBSU3h6UWtGQmMwSTdVVUZEZEVJc0swSkJRU3RDTzFGQlF5OUNMRzlGUVVGdlJUdFJRVU53UlN4aFFVRmhPMUZCUTJJc01rSkJRVEpDTzFGQlF6TkNMRzlGUVVGdlJUdFJRVU53UlN3d1FrRkJNRUk3VVVGRE1VSXNiME5CUVc5RE8xRkJRM0JETEdsRlFVRnBSVHRSUVVOcVJTeHJSRUZCYTBRN1VVRkRiRVFzTUVKQlFUQkNPMUZCUXpGQ0xIRkZRVUZ4UlR0UlFVTnlSU3h0UlVGQmJVVTdVVUZEYmtVc2NVVkJRWEZGTzFGQlEzSkZMRzFEUVVGdFF6dFJRVU51UXl4M1FrRkJkMEk3VVVGRGVFSXNkVVZCUVhWRk8xRkJRM1pGTERaRFFVRTJRenRSUVVNM1F5eFpRVUZaTzFGQlExb3NjMFZCUVhORk8xRkJRM1JGTERSQ1FVRTBRanRSUVVNMVFpdzRSRUZCT0VRN1VVRkRPVVFzWjBWQlFXZEZPMUZCUTJoRkxESkVRVUV5UkR0UlFVTXpSQ3h2UWtGQmIwSTdVVUZEY0VJc05rUkJRVFpFTzFGQlF6ZEVMSE5DUVVGelFqdFJRVU4wUWl4TlFVRk5MRlZCUVZVc1IwRkJSeXhYUVVGWExFTkJRVU1zYzBKQlFYTkNPMWxCUTI1RUxFTkJRVU1zUTBGQlF5eFhRVUZYTEVOQlFVTXNjMEpCUVhOQ08xbEJRM0JETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRjRU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExGVkJRVlVzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1dVRkRNVU1zU1VGRFJTeFhRVUZYTEVOQlFVTXNhMEpCUVd0Q08yZENRVU01UWl4WFFVRlhMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVTXhSRHRuUWtGRFFTeFRRVUZUTzJGQlExWTdXVUZEUkN4blJVRkJaMFU3V1VGRGFFVXNjMFZCUVhORk8xbEJRM1JGTEhGRlFVRnhSVHRaUVVOeVJTeEpRVU5GTEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1UwRkJVenRuUWtGRGRrSXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExGZEJRVmM3WjBKQlF6ZENMRkZCUVZFc1EwRkJReXhOUVVGTkxFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVNdlFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWxCUVVrc1YwRkJWeXhEUVVGRExFbEJRVWtzVjBGQlZ5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkRjRVE3WjBKQlEwRXNhMFJCUVd0RU8yZENRVU5zUkN4SlFVRkpMRU5CUVVNc1EwRkJReXhQUVVGUExFbEJRVWtzVjBGQlZ5eERRVUZETEVWQlFVVTdiMEpCUXpkQ0xGZEJRVmNzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkRPMmxDUVVOMlFqdG5Ra0ZEUkN4blFrRkJaMElzUTBGRFpDeE5RVUZOTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRM0pDTEZWQlFWVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVU5vUXp0dlFrRkRSU3hyUWtGQmEwSXNSVUZCUlN4WFFVRlhMRU5CUVVNc2EwSkJRV3RDTzI5Q1FVTnNSQ3haUVVGWkxFVkJRVVVzVjBGQlZ5eERRVUZETEZsQlFWazdiMEpCUTNSRExIRkNRVUZ4UWl4RlFVRkZMRmRCUVZjc1EwRkJReXh4UWtGQmNVSTdiMEpCUTNoRUxGZEJRVmNzUlVGQlJTeFhRVUZYTEVOQlFVTXNWMEZCVnp0dlFrRkRjRU1zVTBGQlV5eEZRVUZGTEZkQlFWY3NRMEZCUXl4VFFVRlRPMjlDUVVOb1F5eExRVUZMTEVWQlFVVXNWMEZCVnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRE8ybENRVU0zUWl4RFFVTkdMRU5CUVVNN1lVRkRTRHRaUVVORUxFbEJRVWs3WjBKQlEwWXNkMEpCUVhkQ0xFTkJRM1JDTEUxQlFVMHNSVUZEVGl4VlFVRlZMRVZCUTFZc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVU5pTEZkQlFWY3NRMEZEV2l4RFFVRkRPMkZCUTBnN1dVRkJReXhQUVVGUExFdEJRVXNzUlVGQlJUdG5Ra0ZEWkN4cFFrRkJhVUlzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTXhRanRUUVVOR08wbEJRMGdzUTBGQlF6dEpRVVZFTEdkRFFVRm5RenRKUVVOb1F5eDNSVUZCZDBVN1NVRkRlRVVzZVVWQlFYbEZPMGxCUTNwRkxIZEVRVUYzUkR0SlFVTjRSQ3hUUVVGVExHdENRVUZyUWl4RFFVRkRMRlZCUVZVc1JVRkJSU3hWUVVGVkxFVkJRVVVzU1VGQlNTeEZRVUZGTEZkQlFWYzdVVUZEYmtVc1QwRkJUenRaUVVOTUxFMUJRVTBzVjBGQlZ5eEhRVUZITERKQ1FVRXlRaXhEUVVNM1F5eERRVUZETEVOQlFVTXNWMEZCVnl4RFFVRkRMRmxCUVZrc1EwRkRNMElzUTBGQlF6dFpRVU5HTEU5QlFVOHNRMEZEVEN4VlFVRlZMRWRCUVVjc1IwRkJSeXhIUVVGSExGVkJRVlVzUlVGRE4wSXNVMEZCVXl4RlFVTlVMRmRCUVZjc1JVRkRXQ3hYUVVGWExFTkJRMW9zUTBGQlF6dFpRVU5HTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVVVzVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEY2tNc1EwRkJReXhEUVVGRE8wbEJRMG9zUTBGQlF6dEpRVVZFTERKRFFVRXlRenRKUVVNelF5eFRRVUZUTEhkQ1FVRjNRaXhEUVVNdlFpeE5RVUZOTEVWQlEwNHNWVUZCVlN4RlFVTldMRmxCUVZrc1JVRkRXaXhqUVVFeVFpeEZRVUZGTzFGQlJUZENMSFZEUVVGMVF6dFJRVU4yUXl4TlFVRk5MRkZCUVZFc1IwRkJSeXhOUVVGTkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNc1RVRkJUU3hGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZETzFGQlEzQkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVU3V1VGRFlpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVTllMRzFEUVVGdFF5eEZRVU51UXl4VlFVRlZMRVZCUTFZc1dVRkJXU3hGUVVOYUxFMUJRVTBzUTBGRFVDeERRVUZETzFsQlEwWXNUMEZCVHp0VFFVTlNPMUZCUlVRc2JVUkJRVzFFTzFGQlEyNUVMRTFCUVUwc1kwRkJZeXhIUVVGSExGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTTdVVUZEY0VNc1RVRkJUU3hqUVVGakxFZEJRVWNzVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTndReXhKUVVGSkxHRkJRV0VzUjBGQlJ5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUlc1RExHOUZRVUZ2UlR0UlFVTndSU3h2UWtGQmIwSTdVVUZEY0VJc1RVRkJUU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVWQlFVVXNXVUZCV1N4RlFVRkZPMWxCUXpGRExGbEJRVmtzUlVGQlJTeEpRVUZKTzFsQlEyeENMRWRCUVVjc1JVRkJSU3hEUVVGRE8yZENRVU5LTEU5QlFVODdiMEpCUTB3c1NVRkJTU3haUVVGWkxFTkJRVU03YjBKQlEycENMRTFCUVUwc1YwRkJWeXhIUVVGSExESkNRVUV5UWl4RFFVTTNReXhEUVVGRExFTkJRVU1zVjBGQlZ5eERRVUZETEZsQlFWa3NRMEZETTBJc1EwRkJRenR2UWtGRlJpeHhRa0ZCY1VJN2IwSkJRM0pDTEVsQlFVa3NZMEZCWXl4RlFVRkZPM2RDUVVOc1FpeDFRa0ZCZFVJN2QwSkJRM1pDTEZsQlFWa3NSMEZCUnl4alFVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzNGQ1FVTXhRenQ1UWtGQlRTeEpRVUZKTEU5QlFVOHNTVUZCU1N4UlFVRlJMRVZCUVVVN2QwSkJRemxDTEcxQ1FVRnRRanQzUWtGRGJrSXNXVUZCV1N4SFFVRkhMR0ZCUVdFc1EwRkJRenR4UWtGRE9VSTdlVUpCUVUwN2QwSkJRMHdzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZEV0N4NVFrRkJlVUlzUlVGRGVrSXNWVUZCVlN4SFFVRkhMRWRCUVVjc1IwRkJSeXhaUVVGWkxFVkJReTlDTEN0Q1FVRXJRaXhEUVVOb1F5eERRVUZETzNkQ1FVTkdMRkZCUVZFc1EwRkRUaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc1JVRkJSU3hGUVVOR0xHRkJRV0VzUlVGRFlpeFhRVUZYTEVWQlExZ3NWMEZCVnl4RFFVTmFMRU5CUVVNN2QwSkJRMFlzVDBGQlR6dHhRa0ZEVWp0dlFrRkZSQ3dyUkVGQkswUTdiMEpCUXk5RUxESkVRVUV5UkR0dlFrRkRNMFFzYzBSQlFYTkVPMjlDUVVOMFJDeHJSVUZCYTBVN2IwSkJRMnhGTEVsQlFVa3NUMEZCVHl4WlFVRlpMRXRCUVVzc1ZVRkJWU3hGUVVGRk8zZENRVU4wUXl4UFFVRlBMR3RDUVVGclFpeERRVU4yUWl4VlFVRlZMRVZCUTFZc1dVRkJXU3hGUVVOYUxGbEJRVmtzUlVGRFdpeFhRVUZYTEVOQlExb3NRMEZCUXp0eFFrRkRTRHQ1UWtGQlRTeEpRVU5NTEU5QlFVOHNXVUZCV1N4TFFVRkxMRkZCUVZFN2QwSkJRMmhETEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1UwRkJVenQzUWtGRGRrSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhKUVVGSkxGZEJRVmNzUTBGQlF5eEpRVUZKTEZkQlFWY3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRExFVkJRM0JFTzNkQ1FVTkJMRTlCUVU4c1dVRkJXU3hEUVVGRE8zRkNRVU55UWp0NVFrRkJUVHQzUWtGRFRDeFJRVUZSTEVOQlEwNHNWVUZCVlN4SFFVRkhMRWRCUVVjc1IwRkJSeXhaUVVGWkxFVkJReTlDTEZsQlFWa3NSVUZEV2l4TFFVRkxMRVZCUTB3c1YwRkJWeXhGUVVOWUxGZEJRVmNzUTBGRFdpeERRVUZETzNkQ1FVTkdMRTlCUVU4c1dVRkJXU3hEUVVGRE8zRkNRVU55UWp0blFrRkRTQ3hEUVVGRExFTkJRVU03V1VGRFNpeERRVUZETEVOQlFVTXNSVUZCUlR0WlFVTktMRWRCUVVjc1JVRkJSU3hEUVVGRE8yZENRVU5LTEU5QlFVOHNWVUZCVXl4TFFVRkxPMjlDUVVOdVFpeE5RVUZOTEZkQlFWY3NSMEZCUnl3eVFrRkJNa0lzUTBGRE4wTXNRMEZCUXl4RFFVRkRMRmRCUVZjc1EwRkJReXhaUVVGWkxFTkJRek5DTEVOQlFVTTdiMEpCUTBZc1NVRkJTU3hYUVVGWExFTkJRVU03YjBKQlJXaENMRzlFUVVGdlJEdHZRa0ZEY0VRc1NVRkRSU3hEUVVGRExFTkJRVU1zVjBGQlZ5eERRVUZETEZkQlFWYzdkMEpCUTNwQ0xFTkJRVU1zVDBGQlR5eGhRVUZoTEV0QlFVc3NWVUZCVlRzMFFrRkRiRU1zVDBGQlR5eGhRVUZoTEV0QlFVc3NVVUZCVVN4RFFVRkRMRVZCUTNCRE8zZENRVU5CTEZGQlFWRXNRMEZEVGl4VlFVRlZMRWRCUVVjc1IwRkJSeXhIUVVGSExGbEJRVmtzUlVGREwwSXNTMEZCU3l4RlFVTk1MR2RDUVVGblFpeEZRVU5vUWl4WFFVRlhMRVZCUTFnc1YwRkJWeXhEUVVOYUxFTkJRVU03ZDBKQlEwWXNUMEZCVHl4TFFVRkxMRU5CUVVNN2NVSkJRMlE3YjBKQlJVUXNORU5CUVRSRE8yOUNRVU0xUXl4SlFVRkpMR05CUVdNc1JVRkJSVHQzUWtGRGJFSXNkVUpCUVhWQ08zZENRVU4yUWl4WFFVRlhMRWRCUVVjc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNN2NVSkJRMmhFTzNsQ1FVRk5MRWxCUVVrc1QwRkJUeXhKUVVGSkxGRkJRVkVzUlVGQlJUdDNRa0ZET1VJc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF6dDNRa0ZEWWl4SlFVRkpMRTFCUVUwc1EwRkJReXhoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdORUpCUXpsQ0xFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RlFVRkZMRmxCUVZrc1JVRkJSVHRuUTBGRGVFTXNTMEZCU3pzMlFrRkRUaXhEUVVGRExFTkJRVU03ZVVKQlEwbzdOa0pCUVUwN05FSkJRMHdzWVVGQllTeEhRVUZITEV0QlFVc3NRMEZCUXp0NVFrRkRka0k3ZDBKQlEwUXNWMEZCVnl4SFFVRkhMRXRCUVVzc1EwRkJRenQzUWtGRGNFSXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenR4UWtGRFpqdDVRa0ZCVFR0M1FrRkRUQ3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVU5ZTEhsQ1FVRjVRaXhGUVVONlFpeFZRVUZWTEVkQlFVY3NSMEZCUnl4SFFVRkhMRmxCUVZrc1JVRkRMMElzSzBKQlFTdENMRU5CUTJoRExFTkJRVU03ZDBKQlEwWXNVVUZCVVN4RFFVTk9MRlZCUVZVc1IwRkJSeXhIUVVGSExFZEJRVWNzV1VGQldTeEZRVU12UWl4TFFVRkxMRVZCUTB3c1lVRkJZU3hGUVVOaUxGZEJRVmNzUlVGRFdDeFhRVUZYTEVOQlExb3NRMEZCUXp0M1FrRkRSaXhQUVVGUExFdEJRVXNzUTBGQlF6dHhRa0ZEWkR0dlFrRkZSQ3hWUVVGVk8yOUNRVU5XTEZGQlFWRXNRMEZEVGl4VlFVRlZMRWRCUVVjc1IwRkJSeXhIUVVGSExGbEJRVmtzUlVGREwwSXNTMEZCU3l4RlFVTk1MRXRCUVVzc1JVRkRUQ3hYUVVGWExFVkJRMWdzVjBGQlZ5eERRVU5hTEVOQlFVTTdiMEpCUlVZc2JVSkJRVzFDTzI5Q1FVTnVRaXhQUVVGUExGZEJRVmNzUTBGQlF6dG5Ra0ZEY2tJc1EwRkJReXhEUVVGRE8xbEJRMG9zUTBGQlF5eERRVUZETEVWQlFVVTdVMEZEVEN4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJSVVFzVDBGQlR6dFJRVU5NTEdkQ1FVRm5RanRSUVVOb1FpeDNRa0ZCZDBJN1VVRkRlRUlzYTBKQlFXdENPMUZCUTJ4Q0xFOUJRVTg3VVVGRFVDeFJRVUZSTzB0QlExUXNRMEZCUXp0QlFVTktMRU5CUVVNaWZRPT0iLCIvKipcbiAqIFRpZXMgdG9nZXRoZXIgdGhlIHR3byBzZXBhcmF0ZSBuYXZpZ2F0aW9uIGV2ZW50cyB0aGF0IHRvZ2V0aGVyIGhvbGRzIGluZm9ybWF0aW9uIGFib3V0IGJvdGggcGFyZW50IGZyYW1lIGlkIGFuZCB0cmFuc2l0aW9uLXJlbGF0ZWQgYXR0cmlidXRlc1xuICovXG5leHBvcnQgY2xhc3MgUGVuZGluZ05hdmlnYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24gPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbiA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25Db21taXR0ZWRFdmVudE5hdmlnYXRpb24gPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzb2x2ZWQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24sXG4gICAgICAgICAgICB0aGlzLm9uQ29tbWl0dGVkRXZlbnROYXZpZ2F0aW9uLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWl0aGVyIHJldHVybnMgb3IgdGltZXMgb3V0IGFuZCByZXR1cm5zIHVuZGVmaW5lZCBvclxuICAgICAqIHJldHVybnMgdGhlIHJlc3VsdHMgZnJvbSByZXNvbHZlZCgpIGFib3ZlXG4gICAgICogQHBhcmFtIG1zXG4gICAgICovXG4gICAgYXN5bmMgcmVzb2x2ZWRXaXRoaW5UaW1lb3V0KG1zKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZWQoKSxcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxdVlYWnBaMkYwYVc5dUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTl3Wlc1a2FXNW5MVzVoZG1sbllYUnBiMjR1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlJVRTdPMGRCUlVjN1FVRkRTQ3hOUVVGTkxFOUJRVThzYVVKQlFXbENPMGxCU3pWQ08xRkJRMFVzU1VGQlNTeERRVUZETEN0Q1FVRXJRaXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUXpORUxFbEJRVWtzUTBGQlF5eHpRMEZCYzBNc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGVFUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hKUVVGSkxFTkJRVU1zTUVKQlFUQkNMRWRCUVVjc1NVRkJTU3hQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVTdXVUZEZEVRc1NVRkJTU3hEUVVGRExHbERRVUZwUXl4SFFVRkhMRTlCUVU4c1EwRkJRenRSUVVOdVJDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTk1MRU5CUVVNN1NVRkRUU3hSUVVGUk8xRkJRMklzVDBGQlR5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRPMWxCUTJwQ0xFbEJRVWtzUTBGQlF5d3JRa0ZCSzBJN1dVRkRjRU1zU1VGQlNTeERRVUZETERCQ1FVRXdRanRUUVVOb1F5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUlVRN096czdUMEZKUnp0SlFVTkpMRXRCUVVzc1EwRkJReXh4UWtGQmNVSXNRMEZCUXl4RlFVRkZPMUZCUTI1RExFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJRenRaUVVOc1F5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RlFVRkZPMWxCUTJZc1NVRkJTU3hQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVXNRMEZCUXl4VlFVRlZMRU5CUVVNc1QwRkJUeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFOQlEyaEVMRU5CUVVNc1EwRkJRenRSUVVOSUxFOUJRVThzVVVGQlVTeERRVUZETzBsQlEyeENMRU5CUVVNN1EwRkRSaUo5IiwiLyoqXG4gKiBUaWVzIHRvZ2V0aGVyIHRoZSB0d28gc2VwYXJhdGUgZXZlbnRzIHRoYXQgdG9nZXRoZXIgaG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgYm90aCByZXF1ZXN0IGhlYWRlcnMgYW5kIGJvZHlcbiAqL1xuZXhwb3J0IGNsYXNzIFBlbmRpbmdSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzb2x2ZWQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVpdGhlciByZXR1cm5zIG9yIHRpbWVzIG91dCBhbmQgcmV0dXJucyB1bmRlZmluZWQgb3JcbiAgICAgKiByZXR1cm5zIHRoZSByZXN1bHRzIGZyb20gcmVzb2x2ZWQoKSBhYm92ZVxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKSxcbiAgICAgICAgXSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlZDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljR1Z1WkdsdVp5MXlaWEYxWlhOMExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTl3Wlc1a2FXNW5MWEpsY1hWbGMzUXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUzBFN08wZEJSVWM3UVVGRFNDeE5RVUZOTEU5QlFVOHNZMEZCWXp0SlFXRjZRanRSUVVORkxFbEJRVWtzUTBGQlF5d3lRa0ZCTWtJc1IwRkJSeXhKUVVGSkxFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0WlFVTjJSQ3hKUVVGSkxFTkJRVU1zYTBOQlFXdERMRWRCUVVjc1QwRkJUeXhEUVVGRE8xRkJRM0JFTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1NVRkJTU3hEUVVGRExDdENRVUVyUWl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlF6TkVMRWxCUVVrc1EwRkJReXh6UTBGQmMwTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRlRVFzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVEN4RFFVRkRPMGxCUTAwc1VVRkJVVHRSUVVOaUxFOUJRVThzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0WlFVTnFRaXhKUVVGSkxFTkJRVU1zTWtKQlFUSkNPMWxCUTJoRExFbEJRVWtzUTBGQlF5d3JRa0ZCSzBJN1UwRkRja01zUTBGQlF5eERRVUZETzBsQlEwd3NRMEZCUXp0SlFVVkVPenM3TzA5QlNVYzdTVUZEU1N4TFFVRkxMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNSVUZCUlR0UlFVTnVReXhOUVVGTkxGRkJRVkVzUjBGQlJ5eE5RVUZOTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkRiRU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0WlFVTm1MRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFRRVU5vUkN4RFFVRkRMRU5CUVVNN1VVRkRTQ3hQUVVGUExGRkJRVkVzUTBGQlF6dEpRVU5zUWl4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBSZXNwb25zZUJvZHlMaXN0ZW5lciB9IGZyb20gXCIuL3Jlc3BvbnNlLWJvZHktbGlzdGVuZXJcIjtcbi8qKlxuICogVGllcyB0b2dldGhlciB0aGUgdHdvIHNlcGFyYXRlIGV2ZW50cyB0aGF0IHRvZ2V0aGVyIGhvbGRzIGluZm9ybWF0aW9uIGFib3V0IGJvdGggcmVzcG9uc2UgaGVhZGVycyBhbmQgYm9keVxuICovXG5leHBvcnQgY2xhc3MgUGVuZGluZ1Jlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uQ29tcGxldGVkRXZlbnREZXRhaWxzID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkNvbXBsZXRlZEV2ZW50RGV0YWlscyA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRSZXNwb25zZVJlc3BvbnNlQm9keUxpc3RlbmVyKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZXNwb25zZUJvZHlMaXN0ZW5lciA9IG5ldyBSZXNwb25zZUJvZHlMaXN0ZW5lcihkZXRhaWxzKTtcbiAgICB9XG4gICAgcmVzb2x2ZWQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyxcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZWRFdmVudERldGFpbHMsXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKiBAcGFyYW0gbXNcbiAgICAgKi9cbiAgICBhc3luYyByZXNvbHZlZFdpdGhpblRpbWVvdXQobXMpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlZCgpLFxuICAgICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSksXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQ7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY0dWdVpHbHVaeTF5WlhOd2IyNXpaUzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTlzYVdJdmNHVnVaR2x1WnkxeVpYTndiMjV6WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkpRU3hQUVVGUExFVkJRVVVzYjBKQlFXOUNMRVZCUVVVc1RVRkJUU3d3UWtGQk1FSXNRMEZCUXp0QlFVVm9SVHM3UjBGRlJ6dEJRVU5JTEUxQlFVMHNUMEZCVHl4bFFVRmxPMGxCWXpGQ08xRkJRMFVzU1VGQlNTeERRVUZETERKQ1FVRXlRaXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTNaRUxFbEJRVWtzUTBGQlF5eHJRMEZCYTBNc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGNFUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hKUVVGSkxFTkJRVU1zZFVKQlFYVkNMRWRCUVVjc1NVRkJTU3hQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVTdXVUZEYmtRc1NVRkJTU3hEUVVGRExEaENRVUU0UWl4SFFVRkhMRTlCUVU4c1EwRkJRenRSUVVOb1JDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTk1MRU5CUVVNN1NVRkRUU3dyUWtGQkswSXNRMEZEY0VNc1QwRkJPRU03VVVGRk9VTXNTVUZCU1N4RFFVRkRMRzlDUVVGdlFpeEhRVUZITEVsQlFVa3NiMEpCUVc5Q0xFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZEYUVVc1EwRkJRenRKUVVOTkxGRkJRVkU3VVVGRFlpeFBRVUZQTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNN1dVRkRha0lzU1VGQlNTeERRVUZETERKQ1FVRXlRanRaUVVOb1F5eEpRVUZKTEVOQlFVTXNkVUpCUVhWQ08xTkJRemRDTEVOQlFVTXNRMEZCUXp0SlFVTk1MRU5CUVVNN1NVRkZSRHM3T3p0UFFVbEhPMGxCUTBrc1MwRkJTeXhEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRVZCUVVVN1VVRkRia01zVFVGQlRTeFJRVUZSTEVkQlFVY3NUVUZCVFN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRMnhETEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVN1dVRkRaaXhKUVVGSkxFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdVMEZEYUVRc1EwRkJReXhEUVVGRE8xRkJRMGdzVDBGQlR5eFJRVUZSTEVOQlFVTTdTVUZEYkVJc1EwRkJRenREUVVOR0luMD0iLCJpbXBvcnQgeyBzaGEyNTZCdWZmZXIgfSBmcm9tIFwiLi9zaGEyNTZcIjtcbmV4cG9ydCBjbGFzcyBSZXNwb25zZUJvZHlMaXN0ZW5lciB7XG4gICAgY29uc3RydWN0b3IoZGV0YWlscykge1xuICAgICAgICB0aGlzLnJlc3BvbnNlQm9keSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUmVzcG9uc2VCb2R5ID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGVudEhhc2ggPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZUNvbnRlbnRIYXNoID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFVzZWQgdG8gcGFyc2UgUmVzcG9uc2Ugc3RyZWFtXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IGJyb3dzZXIud2ViUmVxdWVzdC5maWx0ZXJSZXNwb25zZURhdGEoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIik7XG4gICAgICAgIC8vIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICAgICAgbGV0IHJlc3BvbnNlQm9keSA9IFwiXCI7XG4gICAgICAgIGZpbHRlci5vbmRhdGEgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBzaGEyNTZCdWZmZXIoZXZlbnQuZGF0YSkudGhlbihkaWdlc3QgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZUNvbnRlbnRIYXNoKGRpZ2VzdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IGRlY29kZXIuZGVjb2RlKGV2ZW50LmRhdGEsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgICAgICAgICAgcmVzcG9uc2VCb2R5ID0gcmVzcG9uc2VCb2R5ICsgc3RyO1xuICAgICAgICAgICAgLy8gcGFzcyB0aHJvdWdoIGFsbCB0aGUgcmVzcG9uc2UgZGF0YVxuICAgICAgICAgICAgZmlsdGVyLndyaXRlKGV2ZW50LmRhdGEpO1xuICAgICAgICB9O1xuICAgICAgICBmaWx0ZXIub25zdG9wID0gX2V2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVJlc3BvbnNlQm9keShyZXNwb25zZUJvZHkpO1xuICAgICAgICAgICAgZmlsdGVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZUJvZHk7XG4gICAgfVxuICAgIGFzeW5jIGdldENvbnRlbnRIYXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50SGFzaDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljbVZ6Y0c5dWMyVXRZbTlrZVMxc2FYTjBaVzVsY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZjbVZ6Y0c5dWMyVXRZbTlrZVMxc2FYTjBaVzVsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkRRU3hQUVVGUExFVkJRVVVzV1VGQldTeEZRVUZGTEUxQlFVMHNWVUZCVlN4RFFVRkRPMEZCUlhoRExFMUJRVTBzVDBGQlR5eHZRa0ZCYjBJN1NVRk5MMElzV1VGQldTeFBRVUU0UXp0UlFVTjRSQ3hKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRM2hETEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEY2tNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMRWxCUVVrc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlEzWkRMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRjRU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGU0N4blEwRkJaME03VVVGRGFFTXNUVUZCVFN4TlFVRk5MRWRCUVZFc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eHJRa0ZCYTBJc1EwRkRka1FzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZEV0N4RFFVRkRPMUZCUlZRc1RVRkJUU3hQUVVGUExFZEJRVWNzU1VGQlNTeFhRVUZYTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRla01zY1VOQlFYRkRPMUZCUlhKRExFbEJRVWtzV1VGQldTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjBRaXhOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEV0QlFVc3NRMEZCUXl4RlFVRkZPMWxCUTNSQ0xGbEJRVmtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTzJkQ1FVTnlReXhKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03V1VGRGJFTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJTeE5RVUZOTEVWQlFVVXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVONlJDeFpRVUZaTEVkQlFVY3NXVUZCV1N4SFFVRkhMRWRCUVVjc1EwRkJRenRaUVVOc1F5eHhRMEZCY1VNN1dVRkRja01zVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE0wSXNRMEZCUXl4RFFVRkRPMUZCUlVZc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTXNSVUZCUlR0WlFVTjJRaXhKUVVGSkxFTkJRVU1zYlVKQlFXMUNMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03V1VGRGRrTXNUVUZCVFN4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8xRkJRM1JDTEVOQlFVTXNRMEZCUXp0SlFVTktMRU5CUVVNN1NVRkZUU3hMUVVGTExFTkJRVU1zWlVGQlpUdFJRVU14UWl4UFFVRlBMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU03U1VGRE0wSXNRMEZCUXp0SlFVVk5MRXRCUVVzc1EwRkJReXhqUVVGak8xRkJRM3BDTEU5QlFVOHNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJRenRKUVVNeFFpeERRVUZETzBOQlEwWWlmUT09IiwiLyoqXG4gKiBDb2RlIG9yaWdpbmFsbHkgZnJvbSB0aGUgZXhhbXBsZSBhdFxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1N1YnRsZUNyeXB0by9kaWdlc3RcbiAqXG4gKiBOb3RlOiBVc2luZyBTSEEyNTYgaW5zdGVhZCBvZiB0aGUgcHJldmlvdXNseSB1c2VkIE1ENSBkdWUgdG9cbiAqIHRoZSBmb2xsb3dpbmcgY29tbWVudCBmb3VuZCBhdCB0aGUgZG9jdW1lbnRhdGlvbiBwYWdlIGxpbmtlZCBhYm92ZTpcbiAqXG4gKiBXYXJuaW5nOiBPbGRlciBpbnNlY3VyZSBoYXNoIGZ1bmN0aW9ucywgbGlrZSBNRDUsIGFyZSBub3Qgc3VwcG9ydGVkXG4gKiBieSB0aGlzIG1ldGhvZC4gRXZlbiBhIHN1cHBvcnRlZCBtZXRob2QsIFNIQS0xLCBpcyBjb25zaWRlcmVkIHdlYWssXG4gKiBoYXMgYmVlbiBicm9rZW4gYW5kIHNob3VsZCBiZSBhdm9pZGVkIGZvciBjcnlwdG9ncmFwaGljIGFwcGxpY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYTI1NihzdHIpIHtcbiAgICAvLyBXZSB0cmFuc2Zvcm0gdGhlIHN0cmluZyBpbnRvIGFuIGFycmF5YnVmZmVyLlxuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzdHIpO1xuICAgIHJldHVybiBzaGEyNTZCdWZmZXIoYnVmZmVyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaGEyNTZCdWZmZXIoYnVmZmVyKSB7XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTI1NlwiLCBidWZmZXIpLnRoZW4oZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgICAgcmV0dXJuIGhleChoYXNoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGhleChidWZmZXIpIHtcbiAgICBjb25zdCBoZXhDb2RlcyA9IFtdO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXcuYnl0ZUxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIC8vIFVzaW5nIGdldFVpbnQzMiByZWR1Y2VzIHRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyBuZWVkZWQgKHdlIHByb2Nlc3MgNCBieXRlcyBlYWNoIHRpbWUpXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmlldy5nZXRVaW50MzIoaSk7XG4gICAgICAgIC8vIHRvU3RyaW5nKDE2KSB3aWxsIGdpdmUgdGhlIGhleCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyIHdpdGhvdXQgcGFkZGluZ1xuICAgICAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgLy8gV2UgdXNlIGNvbmNhdGVuYXRpb24gYW5kIHNsaWNlIGZvciBwYWRkaW5nXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSBcIjAwMDAwMDAwXCI7XG4gICAgICAgIGNvbnN0IHBhZGRlZFZhbHVlID0gKHBhZGRpbmcgKyBzdHJpbmdWYWx1ZSkuc2xpY2UoLXBhZGRpbmcubGVuZ3RoKTtcbiAgICAgICAgaGV4Q29kZXMucHVzaChwYWRkZWRWYWx1ZSk7XG4gICAgfVxuICAgIC8vIEpvaW4gYWxsIHRoZSBoZXggc3RyaW5ncyBpbnRvIG9uZVxuICAgIHJldHVybiBoZXhDb2Rlcy5qb2luKFwiXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJoaE1qVTJMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5emFHRXlOVFl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3T3pzN096czdSMEZWUnp0QlFVVklMRTFCUVUwc1ZVRkJWU3hOUVVGTkxFTkJRVU1zUjBGQlJ6dEpRVU40UWl3clEwRkJLME03U1VGREwwTXNUVUZCVFN4TlFVRk5MRWRCUVVjc1NVRkJTU3hYUVVGWExFVkJRVVVzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkROME1zVDBGQlR5eFpRVUZaTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1FVRkRPVUlzUTBGQlF6dEJRVVZFTEUxQlFVMHNWVUZCVlN4WlFVRlpMRU5CUVVNc1RVRkJUVHRKUVVOcVF5eFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJVeXhKUVVGSk8xRkJReTlFTEU5QlFVOHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMjVDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zUjBGQlJ5eERRVUZETEUxQlFVMDdTVUZEYWtJc1RVRkJUU3hSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzBsQlEzQkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMGxCUTJ4RExFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1VVRkRNME1zZVVaQlFYbEdPMUZCUTNwR0xFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGFFTXNPRVZCUVRoRk8xRkJRemxGTEUxQlFVMHNWMEZCVnl4SFFVRkhMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEZGtNc05rTkJRVFpETzFGQlF6ZERMRTFCUVUwc1QwRkJUeXhIUVVGSExGVkJRVlVzUTBGQlF6dFJRVU16UWl4TlFVRk5MRmRCUVZjc1IwRkJSeXhEUVVGRExFOUJRVThzUjBGQlJ5eFhRVUZYTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEYmtVc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXp0TFFVTTFRanRKUVVWRUxHOURRVUZ2UXp0SlFVTndReXhQUVVGUExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1FVRkRNMElzUTBGQlF5SjkiLCJleHBvcnQgZnVuY3Rpb24gZW5jb2RlX3V0Zjgocykge1xuICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQocykpO1xufVxuZXhwb3J0IGNvbnN0IGVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZyBpZiBuZWNlc3NhcnlcbiAgICBpZiAodHlwZW9mIHN0ciAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlX3V0Zjgoc3RyKTtcbn07XG5leHBvcnQgY29uc3QgZXNjYXBlVXJsID0gZnVuY3Rpb24gKHVybCwgc3RyaXBEYXRhVXJsRGF0YSA9IHRydWUpIHtcbiAgICB1cmwgPSBlc2NhcGVTdHJpbmcodXJsKTtcbiAgICAvLyBkYXRhOls8bWVkaWF0eXBlPl1bO2Jhc2U2NF0sPGRhdGE+XG4gICAgaWYgKHVybC5zdWJzdHIoMCwgNSkgPT09IFwiZGF0YTpcIiAmJlxuICAgICAgICBzdHJpcERhdGFVcmxEYXRhICYmXG4gICAgICAgIHVybC5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XG4gICAgICAgIHVybCA9IHVybC5zdWJzdHIoMCwgdXJsLmluZGV4T2YoXCIsXCIpICsgMSkgKyBcIjxkYXRhLXN0cmlwcGVkPlwiO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufTtcbmV4cG9ydCBjb25zdCBib29sVG9JbnQgPSBmdW5jdGlvbiAoYm9vbCkge1xuICAgIHJldHVybiBib29sID8gMSA6IDA7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzNSeWFXNW5MWFYwYVd4ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTl6ZEhKcGJtY3RkWFJwYkhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVFVGQlRTeFZRVUZWTEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUXpOQ0xFOUJRVThzVVVGQlVTeERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEZWtNc1EwRkJRenRCUVVWRUxFMUJRVTBzUTBGQlF5eE5RVUZOTEZsQlFWa3NSMEZCUnl4VlFVRlRMRWRCUVZFN1NVRkRNME1zYVVOQlFXbERPMGxCUTJwRExFbEJRVWtzVDBGQlR5eEhRVUZITEVsQlFVa3NVVUZCVVN4RlFVRkZPMUZCUXpGQ0xFZEJRVWNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1MwRkRia0k3U1VGRlJDeFBRVUZQTEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRCUVVNeFFpeERRVUZETEVOQlFVTTdRVUZGUml4TlFVRk5MRU5CUVVNc1RVRkJUU3hUUVVGVExFZEJRVWNzVlVGRGRrSXNSMEZCVnl4RlFVTllMRzFDUVVFMFFpeEpRVUZKTzBsQlJXaERMRWRCUVVjc1IwRkJSeXhaUVVGWkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZEZUVJc2NVTkJRWEZETzBsQlEzSkRMRWxCUTBVc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1QwRkJUenRSUVVNMVFpeG5Ra0ZCWjBJN1VVRkRhRUlzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUlVGRGNrSTdVVUZEUVN4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4cFFrRkJhVUlzUTBGQlF6dExRVU12UkR0SlFVTkVMRTlCUVU4c1IwRkJSeXhEUVVGRE8wRkJRMklzUTBGQlF5eERRVUZETzBGQlJVWXNUVUZCVFN4RFFVRkRMRTFCUVUwc1UwRkJVeXhIUVVGSExGVkJRVk1zU1VGQllUdEpRVU0zUXl4UFFVRlBMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRkRUlzUTBGQlF5eERRVUZESW4wPSIsIi8qIHRzbGludDpkaXNhYmxlOm5vLWJpdHdpc2UgKi9cbi8vIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4MyNnaXN0Y29tbWVudC0yNDAzMzY5XG5jb25zdCBoZXggPSBbXTtcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBoZXhbaV0gPSAoaSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIGkudG9TdHJpbmcoMTYpO1xufVxuZXhwb3J0IGNvbnN0IG1ha2VVVUlEID0gKCkgPT4ge1xuICAgIGNvbnN0IHIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDE2KSk7XG4gICAgcls2XSA9IChyWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJbOF0gPSAocls4XSAmIDB4M2YpIHwgMHg4MDtcbiAgICByZXR1cm4gKGhleFtyWzBdXSArXG4gICAgICAgIGhleFtyWzFdXSArXG4gICAgICAgIGhleFtyWzJdXSArXG4gICAgICAgIGhleFtyWzNdXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbNF1dICtcbiAgICAgICAgaGV4W3JbNV1dICtcbiAgICAgICAgXCItXCIgK1xuICAgICAgICBoZXhbcls2XV0gK1xuICAgICAgICBoZXhbcls3XV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzhdXSArXG4gICAgICAgIGhleFtyWzldXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbMTBdXSArXG4gICAgICAgIGhleFtyWzExXV0gK1xuICAgICAgICBoZXhbclsxMl1dICtcbiAgICAgICAgaGV4W3JbMTNdXSArXG4gICAgICAgIGhleFtyWzE0XV0gK1xuICAgICAgICBoZXhbclsxNV1dKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lkWFZwWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5c2FXSXZkWFZwWkM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3dyUWtGQkswSTdRVUZGTDBJc09FUkJRVGhFTzBGQlF6bEVMRTFCUVUwc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF6dEJRVVZtTEV0QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1NVRkROVUlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8wTkJReTlETzBGQlJVUXNUVUZCVFN4RFFVRkRMRTFCUVUwc1VVRkJVU3hIUVVGSExFZEJRVWNzUlVGQlJUdEpRVU16UWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zWlVGQlpTeERRVUZETEVsQlFVa3NWVUZCVlN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRmNrUXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dEpRVU0xUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETzBsQlJUVkNMRTlCUVU4c1EwRkRUQ3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFRc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTlVMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVkN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnp0UlFVTklMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEVml4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlExWXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU5XTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRFZpeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMVlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVOWUxFTkJRVU03UVVGRFNpeERRVUZETEVOQlFVTWlmUT09IiwiLy8gaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuZXhwb3J0IGNvbnN0IGRhdGVUaW1lVW5pY29kZUZvcm1hdFN0cmluZyA9IFwieXl5eS1NTS1kZCdUJ0hIOm1tOnNzLlNTU1hYXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMk5vWlcxaExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNOamFHVnRZUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGSlFTd3JSVUZCSzBVN1FVRkRMMFVzVFVGQlRTeERRVUZETEUxQlFVMHNNa0pCUVRKQ0xFZEJRVWNzTmtKQlFUWkNMRU5CUVVNaWZRPT0iXSwic291cmNlUm9vdCI6IiJ9