var Greeting = /** @class */ (function () {
    function Greeting(name) {
        console.log("in constructor");
    }
    Greeting.prototype.greet = function () {
        console.log("Hello World!!!");
    };
    return Greeting;
}());
var obj = new Greeting(3);
obj.greet();
//# sourceMappingURL=C:/Users/92717/trainAPI/app.js.map