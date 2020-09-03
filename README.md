# Rasool SMS

***

## Usage

#### Typescript

```javascript
 import RasoolSMS from "rasool-sms-api";
```

#### Javascript

```javascript
const RasoolSMS = require("rasool-sms-api");
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
   from: 'Rasool'
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
  * **Alphanumeric** max 11 characters `Rasool`

#### Send Example

```javascript
  rasool.send({
    from: 'Rasool',
    to: '+XXXXXXXXXXX',
    body: 'this is a test message from rasool'
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
