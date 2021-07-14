const fs = require('fs')
const axios = require('axios')
const HTMLParser = require('fast-html-parser')

const caseStatusLink = `https://egov.uscis.gov/casestatus/mycasestatus.do`
const fileName = 'data.txt'

// Pause an async function for a given number of milliseconds
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

// Check if an ID is valid by matching it to a regular expression
// eslint-disable-next-line
const IDRegex = new RegExp(/^MSC2190\d{6}$/)
function isValidID(id) {
  return IDRegex.test(id)
}

// Check the case statuses
async function checkCaseStatus() {
  // Check if file with IDs exists
  if (!fs.existsSync(fileName)) {
    return console.error(`Could not find file ${fileName} to read IDs from.`)
  }

  // Read IDs and validate them
  const IDs = fs.readFileSync(fileName, 'utf-8').split('\n').map(id => id.trim())

  // Make sure all IDs are valid
  if (!IDs.every(id => isValidID(id)))
    return console.error('One of your IDs is not formatted properly.')

  // Make a POST request to USCIS for each ID
  const statuses = {}
  for (const ID of IDs) {
    const response = await axios
      .get(`${caseStatusLink}?appReceiptNum=${ID}`)
      .catch(() => console.error('Error contacting the USCIS website.'))
      .then(await wait(500))

    // Parse returned HTML data and get the h1 element
    const root = HTMLParser.parse(response.data)
    const statusElement = root.querySelector('h1')
    if (statusElement == null)
      return console.error('Could not find a valid status for this ID')

    // Extract text from h1 element, place into object
    const statusText = statusElement.childNodes[0].rawText
    statuses[ID] = statusText
  }

  // Log the statuses before exiting
  console.log(statuses)

  // Get back stasus for all IDs
  return statuses
}

checkCaseStatus()
