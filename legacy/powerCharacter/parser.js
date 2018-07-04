/*jshint esversion:6*/
var consoleSettings={
    fullInfo:true,
    pos:false,
    called:true
};
var tt = { // Token types
    eof: 'end of file',
    word: 'word',
    op: 'binary operator',
    brace: 'curly brace',
    paren: 'parentheses',
    bracket: 'square bracket',
    comp: 'compare',
    assign: 'assignment',
    key: 'key pipe thingy',
    num: 'number',
    semi: 'semicolon',
    string: 'string'
    // Will be more in future, only doing vars and math right now :)
};
function isSpace(ch) {
    return /\s/.test(ch);
}

function isNumber(ch) {
   return /[\d-.]/.test(ch);
}

function Parser(input) {
    this.input = input;
    this.pos = -1;
    this.token={};
    this.program = {type: 'Program', body: []};
    this.tokens = [];
}

Object.assign(Parser.prototype,{
    parse(){
        /*Parse checks for the end of file. If it's not, it runs this.parseStatment*/
        while (this.token.type !== tt.eof) {
            this.program.body.push(this.parseStatement());
        }
        this.program.tokens = this.tokens;
        return this.program;
    },
    parseStatement() {
        var node = this.startNode();//{loc:{start:-1}}
        var token = this.next();//
        console.warn(this.token);
        switch (token.type) {
            case tt.key: return this.parseKey();
            case tt.semi: return this.parseEmpty();
            case tt.eof: return;
            default:
                return this.parseExpressionStatement();
        }
    },
    parseKey() {
        var token = this.token;
        switch (token.key) {
            case 'F':
                return this.parseFunc();
            case 'V':
                return this.parseVar();
            case 'C':
                return this.parseClass();
        }
    },
    parseVar() { // A variable delcaration Vname
        var token = this.next(), node = this.startNode();
        if (this.token.type !== tt.word) {
            this.ue();
        }
        node.id = this.token.value;
        this.next();
        if (this.eat('assign')) {
            node.init = this.parseExpression();
        }
        return this.finishNode(node, 'VariableDelcaration');
    },
    parseExpressionStatement() {
        var node = this.startNode();
        node.expression = this.parseExpression();
        return this.finishNode(node, 'ExpressionStatement');
    },
    parseExpression() {
        console.error(this.token);
        return this.parseMaybeAssign();
    },
    parseMaybeAssign () {
        var pos = this.pos, left = this.parseMaybeBinary();
        if (this.eat(tt.assign)) {
            var node = this.startNodeAt(pos);
            node.left = left;
            node.op = this.token.value;
            node.right = this.parseExpression();
            return this.finishNode(node, 'AssignmentExpression');
        }
        return left;
    },
    parseMaybeBinary () {
        var pos = this.pos, left = this.parseAtom();
        if (this.token.type === tt.op) {
            var node = this.startNodeAt(pos);
            node.left = left;
            node.op = this.token.value;
            this.next();
            node.right = this.parseExpression();
            return this.finishNode(node, "BinaryOperation");
        }
        return left;
    },
    parseAtom () {
        var token = this.token;
        switch (token.type) {
            default:
                return this.parseLiteralOrVar();
        }
    },
    parseLiteralOrVar () {
        var node;
        if (this.eat(tt.word)) {
            node = this.startNode();
            node.id = this.token.value;
            this.next();
            return this.finishNode(node, 'Identifier');
        }
        node = this.startNode();
        if (this.token.type !== tt.num) this.ue();
        node.value = this.token.value;
        this.finishNode(node, 'Literal');
        this.next();
        return node;
    },
    startNode() {
        return {
            loc: {
                start: this.pos
            }
        };
    },
    startNodeAt(pos) {
        return {
            loc: {
                start: pos
            }
        };
    },
    finishNode (node, type) {
        node.type = type;
        node.loc.end = this.pos;
        return node;
    },
    eat (type) {
        console.info("Eating:", tt[type], "actual", this.token);
       if (this.token.type === tt[type]) {
           this.next();
           return true;
       }
       return false;
    },
    expect (type) {
        this.eat(type) || this.ue();
    },
    next () {
        var ch = this.nextChar();//"1"
        if (!ch) {
            return this.createToken('eof', null);
        }
        while (isSpace(ch)) {
            ch = this.nextChar();
        }
        console.log();
        //ch="1";
        switch (ch) { // Op: +-/^*; eq: =,==,===;
            case '+':
            case '-':
            case '/':
            case '*':
            case '^':
               return this.tokenOp();
            case '=':
                return this.tokenEq();
            case 'C':
            case 'V':
            case 'F':
                return this.tokenMaybeKey();
            case ';':
                return this.tokenSemi();
            default:
                return isNumber(ch)?this.tokenNumber():this.tokenWord();//this.tokenNumber;
        }
    },
    createToken (type, value) {
        var token = {
            type: tt[type],
            value: value,
            end: this.pos
        };
        this.token = token;
        this.tokens.push(token);
        console.trace("Token:", token, "Tokens:", this.tokens);
        return token;
    },
    nextChar () {
        return this.input[++this.pos]; //Marcus code
    },
    peek (num) {
        num = num || 1;
        return this.input[this.pos + num];
    },
    ch () {
        return this.input[this.pos];
    },
    moveBack () {
        this.pos--;
    },
    raise (err) {
        err = new SyntaxError(err);
        err.pos = this.pos;
        err.token = Object.assign({}, this.token);
        throw err;
    },
    ue () { // Unexpected
        this.raise("Unexpected '" + this.ch() + "'");
    },
    tokenOp () { // Could be + - * / ^
        return this.createToken('op', this.ch());
    },
    tokenEq () { // could be '=' '==' or '==='
        if (this.ch() === this.peek()) { // test for '==' or '==='
            if (this.ch() === this.peek(2)) { // test for '==='
                return this.createToken('comp', '===');
            }
            return this.createToken('comp', '===');
        }
        return this.createToken('assign', '=');
    },
    tokenMaybeKey () {
        if (this.peek() !== '|') {
            this.moveBack();
            return this.tokenWord();
        }
        console.log(this);
        var token = this.createToken('key', this.ch() + '|');
        token.key = this.ch();
        this.nextChar();
        return token;
    },
    tokenNumber () {
        var ch = this.ch(), str = '', prevChar = '', first = true, hasDot, hasE;
        //ch="1";
        function test() {
            if (ch === '+' || ch === '-') {
                return /E/.test(prevChar) || first;
            }
            if (ch === '.') {
                if (hasDot) {
                    this.ue();
                }
                hasDot = true;
            }
            if (/E/.test(ch)) {
                if (hasE) {
                    this.ue();
                }
                hasE = true;
            }
            return /\d/.test(ch);
        }
        //true
        while (test()) {
            str += ch;//str=1;

            first = false;
            ch = this.nextChar();
        }
        //this.moveBack();//pos=0
        return this.createToken('num', parseFloat(str, 10));
    },
    tokenWord () {
        var ch = this.ch(), str = '';
        console.info('tokenWord:', this.ch(), isSpace(ch) ? 'is space' : 'is not space');
        while (!isSpace(ch)) {
            str += ch;
            ch = this.nextChar();
        }
        // this.moveBack();
        return this.createToken('word', str);
    },
    tokenSemi () {
        console.log("semicolon");
        return this.createToken('semi', ';');
    }
});
function parse(input) {
    return new Parser(input).parse();
}
for(let k in Parser.prototype){
    let o=Parser.prototype,v=o[k];
    if(o.hasOwnProperty(k)&&typeof v=="function"){
        o[k]=function(...args){
            var state={token:this.token,tokens:this.tokens,ch:this.input[this.pos],pos:this.pos};
            consoleSettings.called&&console.info(v.name, "called");
            var res=v.apply(this,args);
            consoleSettings.called&&console.info(v.name, "returned");
            consoleSettings.fullInfo&&console.log(v.name,'with args:', ...args,'produced:',res,'state before:',state,'state now:',{
                token:this.token,
                tokens:this.tokens,
                ch:this.input[this.pos],
                pos:this.pos
            });
            consoleSettings.pos&&console.debug(this.pos);
            return res;
        };
    }
}
