class Greeting {

    constructor(name: any){
        console.log("in constructor")
    }
    greet(): void {
        console.log("Hello World!!!")
    }
}

var obj = new Greeting(3)
obj.greet();
