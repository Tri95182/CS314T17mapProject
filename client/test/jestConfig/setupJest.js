
global.fetch = require('jest-fetch-mock');

// Subdue Console Messages in Jest Output (Console.error WILL get through for Testing!)

console.log = jest.fn();
console.info = jest.fn();
console.debug = jest.fn();
console.trace = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();


//code taken from
//https://stackoverflow.com/questions/54382414/fixing-react-leaflet-testing-error-cannot-read-property-layeradd-of-null
var createElementNSOrig = global.document.createElementNS
global.document.createElementNS = function(namespaceURI, qualifiedName) {
    if (namespaceURI==='http://www.w3.org/2000/svg' && qualifiedName==='svg'){
        var element = createElementNSOrig.apply(this,arguments)
        element.createSVGRect = function(){};
        return element;
    }
    return createElementNSOrig.apply(this,arguments)
}



