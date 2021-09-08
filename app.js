let examples = [], country = '', country2 = '', useCountryCode = false
let inputText = 'For tech support call +7 (800) 555-35-35 internationally or reach a local US branch at (213) 373-4253 ext. 1234.'
let xmlhttp = new XMLHttpRequest();
let url = "https://unpkg.com/libphonenumber-js@1.9.6/examples.mobile.json";

fetch(url)
  .then(response => response.json())
  .then(response => {
    example = response
  })


let mData = new libphonenumber.Metadata()
let countryListHTML
function fetchCountries() {
  let countries = libphonenumber.getCountries()
  console.log(countries)
  for (let i = 0; i < countries.length; i++) {
    countryListHTML += `<option value="${countries[i]}" >${countries[i]}</option>`
  }
}
fetchCountries()

setTimeout(() => {
  document.getElementById("countrySelect").innerHTML = countryListHTML
  document.getElementById("countrySelect2").innerHTML = countryListHTML
  document.getElementById("textbox").value = inputText
  country = document.getElementById("countrySelect").value;
  country2 = document.getElementById("countrySelect2").value;
  let val = libphonenumber.findPhoneNumbersInText(inputText)
  displayValue(val)
}, 1000)

function parseNo(e) {
  try {

    let numberObjEvt = libphonenumber.parsePhoneNumber(e.value, country)
    document.querySelector('.output1').innerHTML = `
  <span class="font-weight-bold">National Format:</span> ${numberObjEvt.format('NATIONAL')}
  <br><span class="font-weight-bold">International Format:</span> ${numberObjEvt.format('INTERNATIONAL')}
  <br><span class="font-weight-bold">RFC3966:</span>  ${numberObjEvt.format('RFC3966')}
  <br><span class="font-weight-bold">IDD:</span>  ${numberObjEvt.format('IDD', { fromCountry: 'US' })}
  <br><span class="font-weight-bold">National without Prefix:</span>  ${numberObjEvt.format('NATIONAL', { nationalPrefix: false })}
  <br><span class="font-weight-bold">Type:</span>  ${numberObjEvt.getType()}
  <br><span class="font-weight-bold">URI:</span>  ${numberObjEvt.getURI()}
  <br><span class="font-weight-bold">Non Geographic (Global):</span>  ${numberObjEvt.isNonGeographic()}
  <br><span class="font-weight-bold">Possible:</span>  ${numberObjEvt.isPossible()}
  <br><span class="font-weight-bold">Valid:</span>  ${numberObjEvt.isValid()}
  <br><span class="font-weight-bold">Parse Incomplete Number:</span>  ${libphonenumber.parseIncompletePhoneNumber(e.value)}
  <br><span class="font-weight-bold">Format Incomplete Number (without Country code):</span>  ${libphonenumber.formatIncompletePhoneNumber(e.value)}
  <br><span class="font-weight-bold">Format Incomplete Number (with country code):</span>  ${libphonenumber.formatIncompletePhoneNumber(e.value, country)}
  <br><span class="font-weight-bold">Is country code (${country}) Supported:</span>  ${libphonenumber.isSupportedCountry(country)}
  `
  }
  catch (err) {
    console.log(err)
    if (e.value) {
      document.querySelector('.output1').innerHTML = `<h5> ${err.message} </h5>`
    } else {
      document.querySelector('.output1').innerHTML = ''
    }
  }
}

function changeCountry(e) {
  country = e.value
  parseNo(document.getElementById('phone'))
}

function changeCountry2(e) {
  country2 = e.value
  fetchPhoneNumberInText()
}

function findPhoneNumber(e) {
  inputText = e.value
  fetchPhoneNumberInText()
}

function fetchPhoneNumberInText() {
  let val
  if (useCountryCode) {
    val = libphonenumber.findPhoneNumbersInText(inputText, country2)
  } else {
    val = libphonenumber.findPhoneNumbersInText(inputText)
  }
  displayValue(val)
}

function updateCountryRequired(e) {
  useCountryCode = e.checked
  fetchPhoneNumberInText()
}

function displayValue(foundList) {
  console.log(foundList)
  let text = ''
  foundList.forEach(item => {
    text += `
    <span class="font-weight-bold">country: </span>${item.number.country}
     <br><span class="font-weight-bold">countryCallingCode: </span> ${item.number.countryCallingCode}
     <br><span class="font-weight-bold">nationalNumber: </span>${item.number.nationalNumber}
     <br><span class="font-weight-bold">number: </span>${item.number.number}
     ${item.number.ext ? `<br><span class="font-weight-bold">Extension: </span>${item.number.ext}` : ''}<br> <br>
     `
  })
  document.querySelector('.output2').innerHTML = text
}