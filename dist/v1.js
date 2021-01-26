"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const axios_1 = __importDefault(require("axios"));
class RasoolSMS {
    /**
     * configure class options
     *
     * @param options constructorOptions
     */
    constructor(options) {
        this.options = options;
        // base URL to send SMS via Rasool
        this.uri = new url_1.URL('https://rasoolsms.com/control/send.php');
        this.uri.searchParams.append('usr', this.options.username);
        this.uri.searchParams.append('pass', this.options.password);
        this.uri.searchParams.append('datacoding', '0');
        /**
         * if provider provided the fixed Sender ID in constructing the class, it is added to the parameters
         */
        if (this.options.from) {
            this.uri.searchParams.append('sid', this.options.from);
        }
    }
    /**
     * Send a SMS content to specific number
     */
    send(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.uri.searchParams.append('msg', options.body);
            this.uri.searchParams.append('msisdn', options.to);
            if (!this.options.from && !options.from) {
                throw Error('(From) field is required');
            }
            // if there is already from
            if (options.from) {
                this.uri.searchParams.append('sid', options.from);
            }
            const result = yield axios_1.default.post(this.uri.toString());
            // if returned is only digits it means SMS was sent successfully
            const body = result.data;
            if (/^\d*$/.test(body)) {
                return {
                    statusCode: 200,
                    message: 'SMS Sent Successfully',
                    response: +body
                };
            }
            else {
                // is returned value is string it means username or password is not correct
                //! Lack of API Documentation and Bad API implementation
                throw Error('Sorry, wrong username or password');
            }
        });
    }
}
exports.default = RasoolSMS;
