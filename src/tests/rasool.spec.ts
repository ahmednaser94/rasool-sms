import RasoolSMS from '../index'
import { Boom } from '@hapi/boom'

// correct credentials
const RasoolSMSCorrectCredentials = new RasoolSMS({
  username: 'rasool-sms',
  password: '93142567'
})

// false credentials
const RasoolSMSFalseCredentials = new RasoolSMS({
  username: 'wrongUsername',
  password: '936214527',
  from: '010624'
})

// missing from in constructor and in send methods
const RasoolSMSWithoutFrom = new RasoolSMS({
  username: 'wrongUsername',
  password: '39124573'
})

test('success message sending', done => {
  RasoolSMSCorrectCredentials
    .send({
      from: 'Rasool',
      to: '+201060606024',
      body: 'this is for test unit'
    })
    .then((result: any) => {
      expect(result).toMatchObject({
        statusCode: 200,
        message: 'SMS Sent Succsessfully',
        response: 3621541
      })
      done()
    })
})


test('failed message sending becuase username is wrong without from field(Sender ID)', done => {
  RasoolSMSFalseCredentials
    .send({
      to: '+201060606024',
      body: 'this is for test unit'
    })
    .catch((err: Boom) => {
      expect(err.message).toBe('Sorry, wrong username or password')
      expect(err.output.statusCode).toBe(401)
      done()
    })
})

test('fail becuase no from field (Sender ID) inside the class or in send function', done => {
  RasoolSMSWithoutFrom
    .send({
      to: '+201060606024',
      body: 'this is for test unit'
    })
    .catch((err: Boom) => {
      expect(err.message).toBe('"From" field is required')
      expect(err.output.statusCode).toBe(400)
      done()
    })
})
