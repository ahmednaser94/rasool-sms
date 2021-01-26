export default {
  post: (data: string) => {
    return new Promise((resolve, reject) => {
      // return success message sending if parameters include the word 'BAWQ'
      if (data.includes('BAWQ')) {
        return resolve({
          data: Buffer.from('3621541', 'ascii')
        })
      }

      // return failed message sending because username or password are wrong if parameters include the word 'wrongUsername'
      if (data.includes('wrongUsername')) {
        return reject(Error('Sorry, wrong username or password'))
      }
    })

  }
}
