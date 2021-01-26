import { URL } from 'url'
import axios from 'axios'
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
  private uri: URL = new URL('https://rasoolsms.com/control/send.php')

  /**
   * configure class options
   *
   * @param options constructorOptions
   */
  constructor(private options: constructorOptions) {
    this.uri.searchParams.append('usr', this.options.username)
    this.uri.searchParams.append('pass', this.options.password)
    this.uri.searchParams.append('datacoding', '0')

    /**
     * if provider provided the fixed Sender ID in constructing the class, it is added to the parameters
     */

    if (this.options.from) {
      this.uri.searchParams.append('sid', this.options.from)
    }
  }

  /**
   * Send a SMS content to specific number
   */
  async send(options: sendOptions) {
    this.uri.searchParams.append('msg', options.body)
    this.uri.searchParams.append('msisdn', options.to)

    if (!this.options.from && !options.from) {
      throw Error('(From) field is required')
    }

    // if there is already from
    if (options.from) {
      this.uri.searchParams.append('sid', options.from)
    }
    
    const result = await axios.post(this.uri.toString())

    // if returned is only digits it means SMS was sent successfully
    const body = result.data

    if (/^\d*$/.test(body)) {
      return {
        statusCode: 200,
        message: 'SMS Sent Successfully',
        response: +body
      }
    } else {
      // is returned value is string it means username or password is not correct
      //! Lack of API Documentation and Bad API implementation
      throw Error('Sorry, wrong username or password')
    }
  }
}
