/**
 * @name Rhyke
 * @author Jrain Lau jrainlau@gmail.com
 * @license MIT
 */

class Rhyke {
  constructor (options = {}) {
    this.options = Object.assign({
      el: 'body',
      rhythm: '...',
      dashTime: 400,
      timeout: 2000,
      tabEvent: false,
      matching: () => {},
      matched: () => {},
      unmatched: () => {},
      onTimeout: () => {}
    }, options)

    this.el = document.querySelector(this.options.el)
    this.timer = null

    this.tabStartEvent = this.options.tabEvent ? 'touchstart' : 'mousedown'
    this.tabEndEvent = this.options.tabEvent ? 'touchend' : 'mouseup'

    this.tabStart = 0
    this.tabTime = 0

    this.userRhythm = []
    this.isTimeout = false

    this._addListener()
  }

  _tabStartFunc () {
    this._stopTimer()
    this.tabStart = new Date().getTime()
  }

  _tabEndFunc () {
    this.tabTime = new Date().getTime() - this.tabStart
    if (!this.isTimeout) {
      this.tabTime < this.options.dashTime ? this.userRhythm.push('.') : this.userRhythm.push('-')
      this.options.matching(this.userRhythm)
      this._matchRhythem(this.userRhythm)
      this._startTimer()
    } else {
      this._reset()
    }
  }

  _startTimer () {
    this.timer = setTimeout(() => {
      this.isTimeout = true
      this._reset()
      this.options.onTimeout()
    }, this.options.timeout)
  }

  _stopTimer () {
    clearTimeout(this.timer)
  }

  _addListener () {
    this.registedTabStartFunc = () => {
      this._tabStartFunc()
    }
    this.registedTabEndFuc = () => {
      this._tabEndFunc()
    }
    this.el.addEventListener(this.tabStartEvent, this.registedTabStartFunc)
    this.el.addEventListener(this.tabEndEvent, this.registedTabEndFuc)
  }

  _matchRhythem (userRhythm) {
    const rhythm = this.options.rhythm
    const testRhythm = userRhythm.join('')
    if (testRhythm.length === rhythm.length && testRhythm === rhythm) {
      this.options.matched()
      this._reset()
    } else if (testRhythm.length === rhythm.length && testRhythm !== rhythm) {
      this.options.unmatched()
      this._reset()
    }
  }

  _reset () {
    this.userRhythm = []
    this.isTimeout = false
    this.timeoutStart = 0
    this.timeout = 0
  }

  removeListener () {
    this.el.removeEventListener(this.tabStartEvent, this.registedTabStartFunc)
    this.el.removeEventListener(this.tabEndEvent, this.registedTabEndFuc)
  }
}

export default Rhyke
