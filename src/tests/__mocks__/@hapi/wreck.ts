export default {
  post: (data: string) => {
    // return success message sending if parameters include the word 'BAWQ'
    if (data.includes('Rasool')) {
      return Promise.resolve({
        payload: Buffer.from('3621541', 'ascii')
      })
    }
    
    // return failed message sending because username or password are wrong if parameters include the word 'wrongUsername'
    if (data.includes('wrongUsername')) {
      return Promise.resolve({
        payload: Buffer.from('Sorry, wrong username or password', 'ascii')
      })
    }
  }
}
