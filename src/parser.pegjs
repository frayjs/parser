start = tree

tree = tree:node+ {
  var root = { type: 'tag', name: 'div', attrs: {}, children: tree };
  return { type: 'component', root: root };
}

text = text:[^<>{}]+ {
  var value = text.join('').replace(/[ \t\n]+/g, ' ');
  return { type: 'text', value: value };
}

expr = "{{" ws expr:[^{}]* ws "}}" {
  return { type: 'expr', value: expr.join('').replace(/[ \t\n]*$/, '') };
}

tag = "<" name:identifier attributes:attribute* ">" children:node* "</" identifier? ">" {
  var attrs = attributes.reduce(function (acc, attr) {
    acc[attr.name] = attr.value;
    return acc;
  }, {});

  return { type: 'tag', name: name, attrs: attrs, children: children };
}

ws = [ \t\n]*

node = node:(text / expr / tag) {
  return node;
}

identifier = first:[a-z] rest:[a-z0-9]* {
  return first + rest.join('');
}

string = ["] string:([^"]*) ["] {
  return string.join('');
}

attribute = ws name:identifier "=" value:string {
  return { name: name, value: value };
}
