const caseStatuses = [
  {
    ID: 'MSC2190000001',
    name: 'John Doe',
    caseStatus: 'Your case was approved',
    lastChecked: 'July 27, 2021',
    previousStatus: 'Your case was approved',
  },
  {
    ID: 'MSC2190000002',
    name: 'Reallyreallylong Name',
    caseStatus: 'Your case was approved',
    lastChecked: 'July 28, 2021',
    previousStatus: 'Your case was approved',
  },
  {
    ID: 'MSC219000003',
    name: 'Anotherreally long Name',
    caseStatus: 'Your case was received in the mail',
    lastChecked: 'July 28, 2021',
    previousStatus: 'Your case is to be reviewed',
  },
]

const defaultStatus = [
  {
    ID: 'MSC219000000',
    name: 'Your Name',
    caseStatus: 'Unknown',
    lastChecked: 'Never',
    previousStatus: null,
  },
]

module.exports = { caseStatuses, defaultStatus }
