import v1 from '../v1'

// correct credentials
const v1CorrectCredentials = new v1({
  username: 'BAWQ',
  password: 'XXXXXXXXX'
})

// false credentials
const v1FalseCredentials = new v1({
  username: 'wrongUsername',
  password: '123456',
  from: '010624'
})

// missing from in constructor and in send methods
const v1WithoutFrom = new v1({
  username: 'wrongUsername',
  password: '123456'
})


test('fail because no from field (Sender ID) inside the class or in send function', async () => {
  try {
    const result = await v1WithoutFrom
      .send({
        to: '+201068504540',
        body: 'this is for test unit'
      })
  } catch (error) {
    expect(error.message).toBe('(From) field is required')
  }
})



test('failed message sending because username is wrong without from field(Sender ID)', async () => {
  try {
    const result = await v1FalseCredentials
      .send({
        to: '+201060606024',
        body: 'this is for test unit'
      })
  } catch (error) {
    expect(error.message).toBe('Sorry, wrong username or password')
  }
})


test('success message sending', async () => {
  const result = await v1CorrectCredentials
    .send({
      from: 'BAWQ',
      to: '+201060606024',
      body: 'this is for test unit'
    })

  expect(result).toMatchObject({
    statusCode: 200,
    message: 'SMS Sent Successfully'
  })

  expect(typeof result.response).toBe('number')
})
