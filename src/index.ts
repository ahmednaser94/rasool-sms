import client from '@hapi/wreck'
import { Boom } from '@hapi/boom'
import { URL } from 'url'
import { isValidPhoneNumber, validaFromField } from './validation'

export interface sendOptions {
  from?: string
  to: string
  body: string
}

export interface constructorOptions {
  username: string
  password: string
  from?: string
}

export default class RasoolSMS {
  // base URL to send SMS via Rasool
  private uri: URL = new URL('https://www.rasoolsms.com/control/send.php')

  /**
   * configure class options
   *
   * @param options constructorOptions
   */
  constructor (private options: constructorOptions) {
    this.uri.searchParams.append('usr', this.options.username)
    this.uri.searchParams.append('pass', this.options.password)
    this.uri.searchParams.append('datacoding', '0')

    /**
     * if provider provided the fixed Sender ID in constructing the class, it is added to the parameters
     */

    if (this.options.from) {
      if (!validaFromField(this.options.from)) {
        throw new Error('"From" field is not valid!')
      }

      this.uri.searchParams.append('sid', this.options.from)
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
  send (options: sendOptions) {
    return new Promise((resolve, reject) => {

      if (!isValidPhoneNumber(options.to)) {
        reject(
        new Boom('"To" field is not valid', {
          statusCode: 400,
          data: '"To" field is not valid',
          message: '"To" field is not valid'
        })
      )
      }


      this.uri.searchParams.append('msg', options.body)
      this.uri.searchParams.append('msisdn', options.to)

      if (!this.options.from && !options.from) {
        reject(
          new Boom('"From" field is required', {
            statusCode: 400,
            data: '"From" field is required',
            message: '"From" field is required'
          })
        )
      }

      // if there is already from
      if (options.from) {
        if (!validaFromField(options.from)) {
          reject(
          new Boom('"From" field is not valid', {
            statusCode: 400,
            data: '"From" field is not valid',
            message: '"From" field is not valid'
          })
        )
        }

        this.uri.searchParams.append('sid', options.from)
      }

      client
        .post(this.uri.toString())
        .then((result: any) => {
          // if returned is only digits it means SMS was sent succsessfully
          const payload = result.payload.toString()

          if (/^\d*$/.test(payload)) {
            resolve({
              statusCode: 200,
              message: 'SMS Sent Succsessfully',
              response: +payload
            })
          } else {
            // is returned value is string it means username or password is not correct
            //! Lack of API Documentation and Bad API implementation
            reject(
              new Boom(payload, {
                statusCode: 401,
                data: payload,
                message: payload
              })
            )
          }
        })
        .catch(reject)
    })
  }
}
