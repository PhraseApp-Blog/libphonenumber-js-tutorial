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


let mData = new libphonenumber.Metadata()
console.log(mData)


var country 
setTimeout(() => {
  country = document.getElementById("countrySelect").value;
}, 1000)
function changeCountry(e) {
  console.log(e.value)
  country = e.value
  parseNo(document.getElementById('phone'))
}
var numberObjEvt
function parseNo(e) {
  numberObjEvt = libphonenumber.parsePhoneNumber(e.value, country)

  document.querySelector('.output1').innerText = `
  National Format: ${numberObjEvt.format('NATIONAL')}
  International Format: ${numberObjEvt.format('INTERNATIONAL')}
  RFC3966: ${numberObjEvt.format('RFC3966')}
  IDD: ${numberObjEvt.format('IDD', {fromCountry: 'US'})}
  National without Prefix: ${numberObjEvt.format('NATIONAL', {nationalPrefix: false})}
  Type: ${numberObjEvt.getType()}
  URI: ${numberObjEvt.getURI()}
  Is Non Geographic: ${numberObjEvt.isNonGeographic()}
  Is Possible: ${numberObjEvt.isPossible()}
  Is Valid: ${numberObjEvt.isValid()}
  Parse Incomplete Number: ${libphonenumber.parseIncompletePhoneNumber(e.value)}
  Format Incomplete Number (without Country code): ${libphonenumber.formatIncompletePhoneNumber(e.value)}
  Format Incomplete Number (with country code): ${libphonenumber.formatIncompletePhoneNumber(e.value, country)}
  Is ${country} Supported: ${libphonenumber.isSupportedCountry(country)}
  ext prefix of ${country}: ${libphonenumber.getExtPrefix(country)}
  ext prefix of ${country}: ${libphonenumber.getExtPrefix(country)}
  `
}

var country2
setTimeout(() => {
  country2 = document.getElementById("countrySelect2").value;
  document.getElementById('textbox').value = 'For tech support call +7 (800) 555-35-35 internationally or reach a local US branch at (213) 373-4253 ext. 1234'
  let val = libphonenumber.findPhoneNumbersInText(document.getElementById('textbox').value, country2)
  displayValue(val)
}, 1000)

function changeCountry2(e) {
  console.log(e.value)
  country2 = e.value
  let val = libphonenumber.findPhoneNumbersInText(document.getElementById('textbox').value, country2)
  displayValue(val)
}

function findPhoneNumber(e) {
  let val = libphonenumber.findPhoneNumbersInText(e.value, country2)
  displayValue(val)
}

function displayValue(value) {
  console.log(value)
  let text = ''
  for(let i = 0; i < value.length; i++) {
    text += `
    country: ${value[i].number.country}
    countryCallingCode: ${value[i].number.countryCallingCode}
    nationalNumber: ${value[i].number.nationalNumber}
    number: ${value[i].number.number}
    `
  }
  document.querySelector('.output2').innerText = text
}