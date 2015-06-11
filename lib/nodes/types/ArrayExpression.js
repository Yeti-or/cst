import Expression from '../Expression';
import ElementList from '../ElementList';

export default class ArrayExpression extends Expression {
    constructor(childNodes) {
        super('ArrayExpression', childNodes);
    }

    _acceptChildren(children) {
        var elements = [];
        children.passToken('Punctuator', '[');
        children.skipNonCode();
        while (!children.isToken('Punctuator', ']')) {
            if (children.isToken('Punctuator', ',')) {
                elements.push(null);
                children.moveNext();
                children.skipNonCode();
            } else {
                elements.push(children.getExpression());
                children.skipNonCode();
                if (children.isToken('Punctuator', ',')) {
                    children.moveNext();
                    children.skipNonCode();
                }
            }
        }
        children.passToken('Punctuator', ']');
        children.assertEnd();
        this._elements = new ElementList(elements);
    }

    get elements() {
        return this._elements;
    }
}