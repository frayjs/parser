start = Root

Space = [ \t\n]*
Quot = '"'

Word = Space word:[^<>{}" \t\n]+ {
  return word.join('');
}

Text = text:Word+ {
  return text.join(' ');
}

Identifier = first:[a-zA-Z_] rest:[a-zA-Z0-9_]* {
  return first + rest.join('');
}

Member = "." member:Identifier {
  return member;
}

DotExpression = first:Identifier rest:Member* {
  return [ first ].concat(rest);
}

Expression = Space "{" Space expr:DotExpression Space "}" {
  return expr;
}

ElementAttribute = Space name:Identifier "=" Quot value:Text? Quot {
  return { name: name, value: value || '' };
}

ElementAttributes = attrs:ElementAttribute* {
  return attrs.reduce(function (acc, attr) {
    acc[attr.name] = attr.value;
    return acc;
  }, {});
}

TextNode = value:Text {
  return { type: 'TextNode', value: value };
}

ExpressionNode = value:Expression {
  return { type: 'ExpressionNode', value: value };
}

ElementNode = Space "<" name:Identifier attrs:ElementAttributes ">" children:Node* Space "</" Identifier? ">" {
  return { type: 'ElementNode', name: name, attrs: attrs, children: children };
}

Node = node:(TextNode / ExpressionNode / ElementNode) {
  return node;
}

Root = nodes:Node* Space {
  var root = { type: 'ElementNode', name: 'div', attrs: {}, children: nodes };
  return { type: 'Root', root: root };
}

