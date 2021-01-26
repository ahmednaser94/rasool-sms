# Rasool SMS

Rasool SMS integration module uses `HTTP` to communicate with service providers.

***

## Usage

#### Typescript

```javascript
// current is the latest version
 import { current as RasoolSMS } as from "@bawq/opr-act-sms-rasool";

//  or you can load all versions like this example
 import * as RasoolSMS from "@bawq/opr-act-sms-rasool";
```

#### Javascript

```javascript
// current is the latest version
const { current } = require("@bawq/opr-act-sms-rasool");

//  or you can load all versions like this example
const RasoolSMS = require("@bawq/opr-act-sms-rasool");
```

### `Versioning`

* This package is desined to have all previous versions with the most updated version

* it will be object with many versions and the most updated version will be named `current`

* suppose that we have 3 versions of this package v1, v2, v3 the current will be v3

```javascript
const SMSRasool = { current, v1, v2, v3 } // current is v3 in this case
```

### Create new instance of RasoolSMS

##### Class Options

|       Parameter Name        |   Type   |          Example          |
| :-------------------------: | :------: | :-----------------------: |
|      options.username       | `String` |       `<USERNAME>`        |
|      options.password       | `String` |       `<PASSWORD>`        |
| options.from **`Optional`** | `String` | `<NAME> | <PHONE_NUMBER>` |

#### Example

```javascript
 const rasool = new RasoolSMS({
   username: '<USERNAME>',
   password: '<PASSWORD>',
   from: 'BAWQ'
 })
```

>**NOTE:** in case of there is no `from` property you must provide it inside `send` function

#### RasoolSMS.send(options) `Promise`

##### Method Options

|       Parameter Name        |   Type   |     Example     |
| :-------------------------: | :------: | :-------------: |
| options.from **`Optional`** | `String` |  `<SENDER_ID>`  |
|         options.to          | `String` | `<RECEIVER_ID>` |
|        options.body         | `String` |  `<SMS_BODY>`   |

#### **`Sender ID`**

* Can be in three formats
  * **Phone Number**
    * **Long number** (15 digits without + sign) `+236259124581324`
    * **Short number** like hotline number `19364`
  * **Alphanumeric** max 11 characters `BAWQ`

#### Send Example

```javascript
  rasool.send({
    from: 'BAWQ',
    to: '+XXXXXXXXXXX',
    body: 'this is a test message from bawq'
  }).then((result) => {
    //  implement logic here
  }).catch((error) => {
    // handle error here
  })
```

##### Resolve Example

```txt
{
  statusCode: 200,
  message: 'SMS Sent Succsessfully',
  code: 46571385
}
```

##### Reject Example

```txt
Error: 'Sorry, wrong username or password'
// ...
// ...
// ...
{
  data: 'Sorry, wrong username or password',
  isBoom: true,
  isServer: false,
  output: {
    statusCode: 401,
    payload: {
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Sorry, wrong username or password'
    },
    headers: {}
  }
}
```
