const caseStatuses = [
  {
    ID: 'MSC019940',
    name: 'John Doe',
    caseStatus: 'Your case was approved',
    lastChecked: 'July 27, 2021',
    previousStatus: 'Your case was approved',
  },
  {
    ID: 'MSC120498',
    name: 'Reallyreallylong Name',
    caseStatus: 'Your case was approved',
    lastChecked: 'July 28, 2021',
    previousStatus: 'Your case was approved',
  },
  {
    ID: 'MSC10249',
    name: 'Anotherreally long Name',
    caseStatus: 'Your case was received in the mail',
    lastChecked: 'July 28, 2021',
    previousStatus: 'Your case is to be reviewed',
  },
]

const defaultStatus = [
  {
    ID: 'AAA00000',
    name: 'Your Name',
    caseStatus: 'Unknown',
    lastChecked: 'Never',
    previousStatus: null,
  },
]

module.exports = { caseStatuses, defaultStatus }
