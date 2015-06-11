import Statement from '../Statement';
import ElementList from '../ElementList';

export default class Program extends Statement {
    constructor(childNodes) {
        super('Program', childNodes);
    }

    _acceptChildren(children) {
        var body = [];
        children.skipNonCode();
        while (!children.isEnd) {
            children.assertStatement();
            body.push(children.currentElement);
            children.moveNext();
            children.skipNonCode();
        }
        children.assertEnd();
        this._body = new ElementList(body);
    }

    get body() {
        return this._body;
    }
}