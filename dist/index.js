"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wreck_1 = __importDefault(require("@hapi/wreck"));
const boom_1 = require("@hapi/boom");
const url_1 = require("url");
const validation_1 = require("./validation");
class RasoolSMS {
    /**
     * configure class options
     *
     * @param options constructorOptions
     */
    constructor(options) {
        this.options = options;
        // base URL to send SMS via Rasool
        this.uri = new url_1.URL('https://www.rasoolsms.com/control/send.php');
        this.uri.searchParams.append('usr', this.options.username);
        this.uri.searchParams.append('pass', this.options.password);
        this.uri.searchParams.append('datacoding', '0');
        /**
         * if provider provided the fixed Sender ID in constructing the class, it is added to the parameters
         */
        if (this.options.from) {
            if (!validation_1.validaFromField(this.options.from)) {
                throw new Error('"From" field is not valid!');
            }
            this.uri.searchParams.append('sid', this.options.from);
        }
    }
    /**
     * Send a SMS content to specific number
     *
     * @method
     * @public
     * @param options sendOptions
     * @returns object
     */
    send(options) {
        return new Promise((resolve, reject) => {
            if (!validation_1.isValidPhoneNumber(options.to)) {
                reject(new boom_1.Boom('"To" field is not valid', {
                    statusCode: 400,
                    data: '"To" field is not valid',
                    message: '"To" field is not valid'
                }));
            }
            this.uri.searchParams.append('msg', options.body);
            this.uri.searchParams.append('msisdn', options.to);
            if (!this.options.from && !options.from) {
                reject(new boom_1.Boom('"From" field is required', {
                    statusCode: 400,
                    data: '"From" field is required',
                    message: '"From" field is required'
                }));
            }
            // if there is already from
            if (options.from) {
                if (!validation_1.validaFromField(options.from)) {
                    reject(new boom_1.Boom('"From" field is not valid', {
                        statusCode: 400,
                        data: '"From" field is not valid',
                        message: '"From" field is not valid'
                    }));
                }
                this.uri.searchParams.append('sid', options.from);
            }
            wreck_1.default
                .post(this.uri.toString())
                .then((result) => {
                // if returned is only digits it means SMS was sent succsessfully
                const payload = result.payload.toString();
                if (/^\d*$/.test(payload)) {
                    resolve({
                        statusCode: 200,
                        message: 'SMS Sent Succsessfully',
                        response: +payload
                    });
                }
                else {
                    // is returned value is string it means username or password is not correct
                    //! Lack of API Documentation and Bad API implementation
                    reject(new boom_1.Boom(payload, {
                        statusCode: 401,
                        data: payload,
                        message: payload
                    }));
                }
            })
                .catch(reject);
        });
    }
}
exports.default = RasoolSMS;
