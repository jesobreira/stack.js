var stackJS = /** @class */ (function () {
    function stackJS(limit, persistence) {
        if (limit === void 0) { limit = Infinity; }
        if (persistence === void 0) { persistence = undefined; }
        this.limit = limit;
        this.persistence = persistence;
        this.stack = [];
        if (typeof persistence !== 'undefined' && typeof persistence.getItem === 'function' && typeof persistence.setItem === 'function') {
            var savedStack = persistence.getItem('stack');
            var savedLimit = persistence.getItem('limit');
            if (typeof savedLimit === 'number')
                this.limit = savedLimit;
            if (savedStack) {
                savedStack = JSON.parse(savedStack);
                if (Array.isArray(savedStack))
                    this.stack = savedStack;
            }
            this.persistence = persistence;
            this.normalize();
        }
        else if (typeof persistence !== 'undefined') {
            throw new Error('Persistence argument object must implement the Storage interface');
        }
    }
    stackJS.prototype.push = function (value) {
        this.stack.push(value);
        this.normalize();
    };
    stackJS.prototype.pop = function () {
        var ret = this.stack.pop();
        this.normalize();
        return ret;
    };
    stackJS.prototype.size = function () {
        return this.stack.length;
    };
    stackJS.prototype.empty = function () {
        return this.stack.length === 0;
    };
    stackJS.prototype.setlimit = function (limit) {
        this.limit = limit;
        this.normalize();
    };
    stackJS.prototype.getlimit = function () {
        return this.limit;
    };
    stackJS.prototype.swap = function (instance) {
        if (!(instance instanceof stackJS))
            throw new Error("Variable must be instance of stack.js");
        var stack1 = this.get();
        var stack2 = instance.get();
        this.set(stack2);
        instance.set(stack1);
    };
    stackJS.prototype.get = function () {
        return this.stack;
    };
    stackJS.prototype.set = function (arr) {
        if (!Array.isArray(arr))
            throw new Error("Variable must be array");
        this.stack = arr;
        this.normalize();
    };
    stackJS.prototype.normalize = function () {
        while (this.stack.length > this.limit) {
            this.stack.shift();
        }
        if (this.persistence) {
            this.persistence.setItem('stack', JSON.stringify(this.stack));
            this.persistence.setItem('limit', JSON.stringify(this.limit));
        }
    };
    return stackJS;
}());
if (typeof window === 'undefined')
    module.exports = stackJS;
