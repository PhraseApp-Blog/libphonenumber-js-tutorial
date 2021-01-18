let numberObj1 = libphonenumber.parsePhoneNumber('9098765432', 'IN')
let numberObj2 = libphonenumber.parsePhoneNumber('08212345654', 'IN')
let numberObj3 = libphonenumber.parsePhoneNumber('+80030009009')

console.log(numberObj1.format('NATIONAL'))
console.log(numberObj1.format('INTERNATIONAL'))
console.log(numberObj1.format('RFC3966'))
console.log(numberObj1.format('IDD', {fromCountry: 'US'}))
console.log(numberObj1.format('NATIONAL', {nationalPrefix: false}))



console.log(numberObj1.getType())
console.log(numberObj2.getType())
console.log(numberObj3.getType())

console.log(numberObj1.isEqual({number:"+919098765432"}))

console.log(numberObj1.getURI())
console.log(numberObj2.getURI())
console.log(numberObj3.getURI())

console.log(numberObj1.isNonGeographic())
console.log(numberObj2.isNonGeographic())
console.log(numberObj3.isNonGeographic())

console.log(numberObj1.isPossible())
console.log(numberObj2.isPossible())
console.log(numberObj3.isPossible())

console.log(libphonenumber.parseIncompletePhoneNumber('+7 800 555'))


console.log(libphonenumber.formatIncompletePhoneNumber('+800300090'))
console.log(libphonenumber.formatIncompletePhoneNumber('9876556', 'IN'))

let text = `
For tech support call +7 (800) 555-35-35 internationally
or reach a local US branch at (213) 373-4253 ext. 1234.
`
console.log(libphonenumber.findPhoneNumbersInText(text, 'US'))
 
console.log('Is US supported?', libphonenumber.isSupportedCountry('US'))


console.log('Supported Countries', libphonenumber.getCountries())

console.log('ext prefix of US', libphonenumber.getExtPrefix('US'))
console.log('ext prefix of UK', libphonenumber.getExtPrefix('GB'))
console.log('ext prefix of AU', libphonenumber.getExtPrefix('IN'))


let examples
let xmlhttp = new XMLHttpRequest();
let url = "https://unpkg.com/libphonenumber-js@1.9.6/examples.mobile.json";

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    examples = JSON.parse(this.responseText);
    console.log('Example phone no. of US', libphonenumber.getExampleNumber('US', examples))
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

console.log(libphonenumber.parseIncompletePhoneNumber('8 (800) 555'))
console.log(libphonenumber.parseIncompletePhoneNumber('+7 800 555'))
console.log(libphonenumber.formatIncompletePhoneNumber('8800555', 'RU'))
console.log(libphonenumber.formatIncompletePhoneNumber('+7800555'))


let mData = new libphonenumber.Metadata()
console.log(mData)


function changePhone() {
  console.log('change')
}

const asYouType = new libphonenumber.AsYouType('US')
console.log('asyoutype', asYouType.input('2133734'))
console.log('asyoutype', asYouType.getChars())
console.log('asyoutype', asYouType.getTemplate())

console.log('asyoutype', asYouType.input('+12133734'))
console.log('asyoutype', asYouType.getChars())
console.log('asyoutype', asYouType.getTemplate())
function myFunction() {
  let number = document.getElementById('phone').value
  console.log('asyoutype', asYouType.input(number))
  console.log('asyoutype', asYouType.getChars())
  console.log('asyoutype', asYouType.getTemplate())

}