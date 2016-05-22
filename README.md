fray.parser
===========

Template parser

Usage
-----

### CLI

    echo '<div class="greeting">Hello { user.name }!</div>' | parser

### Programatically

```js
var parser = require('fray.parser');

var template = '<div class="greeting">Hello { user.name }!</div>';
console.log(JSON.stringify(parser.parse(template), null, 2));
```

**Output:**

```json
{
  "type": "Root",
  "root": {
    "type": "ElementNode",
    "name": "div",
    "attrs": {},
    "children": [
      {
        "type": "ElementNode",
        "name": "div",
        "attrs": {
          "class": "greeting"
        },
        "children": [
          {
            "type": "TextNode",
            "value": "Hello"
          },
          {
            "type": "ExpressionNode",
            "value": [
              "user",
              "name"
            ]
          },
          {
            "type": "TextNode",
            "value": "!"
          }
        ]
      }
    ]
  }
}
```

Install
-------

    npm install fray.parser

Contributing
------------

PRs are welcome!

### Unit tests

    git clone https://github.com/frayjs/parser
    cd parser
    npm install
    npm test

References
----------

  * <http://pegjs.org/>

License
-------

MIT
