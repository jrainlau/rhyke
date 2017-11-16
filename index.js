import Rhyke from './src/rhyke'

const rhyke = new Rhyke({
  el: 'body',
  rhythm: '.-.',
  matching (arr) {
    console.log(arr)
  },
  matched () {
    console.log('Match!!!')
    // rhyke.removeListener()
  },
  unmatched () {
    console.log('Unmatch!!!')
  },
  onTimeout () {
    console.log('Timeout already, restart matching.')
  }
})
