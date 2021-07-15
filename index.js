const fs = require('fs')
const axios = require('axios')
const HTMLParser = require('fast-html-parser')
const { isValidID, wait } = require('./utils.js')
const { CLIEngine } = require('eslint')

// Program constants
const STATUS_LINK = `https://egov.uscis.gov/casestatus/mycasestatus.do`
const FILE_NAME = 'data.txt'

// Check the case statuses
async function checkCaseStatus() {
  // Check if file with IDs exists
  if (!fs.existsSync(FILE_NAME)) {
    return console.error(`Could not find file ${FILE_NAME} to read IDs from.`)
  }

  // Read IDs and validate them
  const IDs = fs.readFileSync(FILE_NAME, 'utf-8').split('\n').map(id => id.trim())

  // Make sure all IDs are valid
  if (!IDs.every(id => isValidID(id)))
    return console.error('One of your IDs is not formatted properly.')

  // Make a POST request to USCIS for each ID
  const statuses = {}
  for (const ID of IDs) {
    const response = await axios
      .get(`${STATUS_LINK}?appReceiptNum=${ID}`)
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