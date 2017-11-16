# RhykeJS

Use morse code rhythm to awake something.

## Install
```
yarn add rhyke
```

## Usage
`RhykeJS` was built in `umd`, you can use it in different way:

- ES6 modules
```javascript
import Rhyke from 'rhyke'
```

- CommonJS
```javascript
const Rhyke = require('rhyke').default
```

- Web broswer
```javascript
<script src="rhyke.js"></script>
<script>
    const Rhyke = window.Rhyke.default
</script>
```

The `Rhyke` instance is a constructor, you must use `new` operator to get initialization.

```javascript
const rhyke = new Rhyke({
    el: 'body',
    rhythm: '...---...',
    matching (rhyArr) {
      // get user input rhythm array
      // such as [".", ".", "-", "-", "-", "."]
    },
    matched () {
      // trigger when rhythm matched
    },
    unmatched () {
      // trigger when rhythm unmatched
    },
    onTimeout () {
      // trigger when timeout
    }
})
```

## Options
`Rhyke` accepts one object as its options:
```
defaultOptions = {
    // morse code listening area
    el: 'body',
    // define your rhythm, use "." as dots and "-" as dashes
    rhythm: '...',
    // how long from "dot" to "dash"
    dashTime: 400,
    // timeout for resetting input
    timeout: 2000,
    // RhykeJS uses mouse event in default; once the page was in mobile mode,
    // you should set `tabEvent` to `true`, then RhykeJS would use touch event in replace.
    tabEvent: false,
    // get user input rhythm array
    matching: () => {},
    // trigger when rhythm matched
    matched: () => {},
    // trigger when rhythm unmatched
    unmatched: () => {},
    // trigger when timeout
    onTimeout: () => {}
}
```

## API
Once the `matched` or `unmatched` triggered, you may want to remove the event listener of the element you bind:
```
matched () {
  // something was awoke
  rhyke.removeListener()
}
```

## License
MIT
