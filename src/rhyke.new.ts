/**
 * @name Rhyke
 * @author Jrain Lau jrainlau@gmail.com
 * @license MIT
 */

interface Options {
  el?: string
  rhythm?: string
  dashTime?: number
  timeout?: number
  tabEvent?: boolean
  matching?: (arr: Array<string>) => void
  matched?: () => void
  unmatched?: () => void
  onTimeout?: () => void
}

const defaultOptions: Options = {
  el: 'body',
  rhythm: '...',
  dashTime: 400,
  timeout: 2000,
  tabEvent: false
}

class Rhyke {
  options: Options
  el: HTMLElement
  timer: any
  tabStartEvent: string
  tabEndEvent: string
  tabStart: number
  tabTime: number
  userRhythm: Array<string>
  isTimeout: Boolean

  registedTabStartFunc: () => void
  registedTabEndFuc: () => void

  timeoutStart: number
  timeout: number

  private constructor (options: Options = {}) {
    this.options = Object.assign(defaultOptions, options)

    this.el = document.querySelector(this.options.el)
    this.timer = null

    this.tabStartEvent = this.options.tabEvent ? 'touchstart' : 'mousedown'
    this.tabEndEvent = this.options.tabEvent ? 'touchend' : 'mouseup'

    this.tabStart = 0
    this.tabTime = 0

    this.userRhythm = []
    this.isTimeout = false
  }

  public removeListener () {
    this.el.removeEventListener(this.tabStartEvent, this.registedTabStartFunc)
    this.el.removeEventListener(this.tabEndEvent, this.registedTabEndFuc)
  }

  private _tabStartFunc () {
    this._stopTimer()
    this.tabStart = new Date().getTime()
  }

  private _tabEndFunc () {
    this.tabTime = new Date().getTime() - this.tabStart
    if (!this.isTimeout) {
      this.tabTime < this.options.dashTime
        ? this.userRhythm.push('.')
        : this.userRhythm.push('-')
      this.options.matching(this.userRhythm)
      this._matchRhythem(this.userRhythm)
      this._startTimer()
    } else {
      this._reset()
    }
  }

  private _startTimer () {
    this.timer = setTimeout(() => {
      this.isTimeout = true
      this._reset()
      this.options.onTimeout()
    }, this.options.timeout)
  }

  private _stopTimer () {
    clearTimeout(this.timer)
  }

  private _addListener () {
    this.registedTabStartFunc = () => {
      this._tabStartFunc()
    }
    this.registedTabEndFuc = () => {
      this._tabEndFunc()
    }
    this.el.addEventListener(this.tabStartEvent, this.registedTabStartFunc)
    this.el.addEventListener(this.tabEndEvent, this.registedTabEndFuc)
  }

  private _matchRhythem (userRhythm) {
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

  private _reset () {
    this.userRhythm = []
    this.isTimeout = false
    this.timeoutStart = 0
    this.timeout = 0
  }
}

export default Rhyke
