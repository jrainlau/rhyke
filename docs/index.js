import Rhyke from '../src/rhyke'
import swal from 'sweetalert'
import './style/main.less'

const dot1 = document.querySelector('.input-dot__1')
const dash = document.querySelector('.input-dash')
const dot2 = document.querySelector('.input-dot__2')

function isPC () {
  const ua = navigator.userAgent
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let i = 0, len = agents.length; i < len; i++) {
    if (ua.indexOf(agents[i]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

function watcher (rhykeArr, itemArr) {
  const rhythm = ['.', '-', '.']
  itemArr.forEach((item, index) => {
    if (rhykeArr.length === index + 1) {
      if (rhykeArr[index] === rhythm[index]) {
        item.classList.remove('correct', 'wrong')
        item.classList.add('correct')
      } else {
        item.classList.remove('correct', 'wrong')
        item.classList.add('wrong')
      }
    }
  })
}

function reset (itemArr) {
  itemArr.forEach((item) => {
    item.classList.remove('correct', 'wrong')
  })
}

function allCorrect (itemArr) {
  itemArr.forEach((item) => {
    item.classList.remove('correct', 'wrong')
    item.classList.add('correct')
  })
}

const rhyke = new Rhyke({
  el: '.input',
  rhythm: '.-.',
  tabEvent: !isPC(),
  matching (arr) {
    console.log(arr)
    watcher(arr, [dot1, dash, dot2])
  },
  matched () {
    allCorrect([dot1, dash, dot2])
    console.log('Match!!!')
    swal('Wow', 'Rhythm matched!', 'success', {
      buttons: false,
      timer: 2000
    })
    setTimeout(() => {
      reset([dot1, dash, dot2])
    }, 1000)
    // rhyke.removeListener()
  },
  unmatched () {
    console.log('Unmatch!!!')
    swal('Ooops', 'Rhythm unmatched...', 'error', {
      buttons: false,
      timer: 2000
    })
    setTimeout(() => {
      reset([dot1, dash, dot2])
    }, 1000)
  },
  onTimeout () {
    reset([dot1, dash, dot2])
    console.log('Timeout already, restart matching.')
  }
})

window.rhyke = rhyke
