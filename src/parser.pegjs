start = Root

ws = [ \t\n]*
singlequote = "'"
doublequote = '"'

word = ws word:[^<>{}" \t\n]+ {
  return word.join('');
}

text = text:word+ {
  return text.join(' ');
}

identifier = first:[a-zA-Z_] rest:[a-zA-Z0-9_]* {
  return first + rest.join('');
}

member = "." member:identifier {
  return member;
}

dotexpr = first:identifier rest:member* {
  return [ first ].concat(rest);
}

expr = ws "{{" ws expr:dotexpr ws "}}" {
  return expr;
}

tagattr = ws name:identifier "=" doublequote value:text? doublequote {
  return { name: name, value: value || '' };
}

tagattrs = attrs:tagattr* {
  return attrs.reduce(function (acc, attr) {
    acc[attr.name] = attr.value;
    return acc;
  }, {});
}

TextNode = value:text {
  return { type: 'TextNode', value: value };
}

ExprNode = value:expr {
  return { type: 'ExprNode', value: value };
}

TagNode = ws "<" name:identifier attrs:tagattrs ">" children:Node* ws "</" identifier? ">" {
  return { type: 'TagNode', name: name, attrs: attrs, children: children };
}

Node = node:(TextNode / ExprNode / TagNode) {
  return node;
}

Root = nodes:Node* ws {
  var root = { type: 'TagNode', name: 'div', attrs: {}, children: nodes };
  return { type: 'Root', root: root };
}

