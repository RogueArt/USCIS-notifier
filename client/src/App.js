import "./styles.scss";

import Table from "./Table.js";

const data = [
  {
    ID: "MSC019940",
    name: "John Doe",
    caseStatus: "Your case was approved",
    lastChecked: "July 27, 2021",
    previousStatus: "Your case was approved"
  },
  {
    ID: "MSC120498",
    name: "Reallyreallylong Name",
    caseStatus: "Your case was approved",
    lastChecked: "July 28, 2021",
    previousStatus: "Your case was approved"
  },
  {
    ID: "MSC10249",
    name: "Anotherreally long Name",
    caseStatus: "Your case was received in the mail",
    lastChecked: "July 28, 2021",
    previousStatus: "Your case is to be reviewed"
  }
];

export default function App() {
  return (
    <div className="App">
      <h1 className="title" unselectable="on">
        USCIS Case Status Notifier
      </h1>
      <Table people={data} />
    </div>
  );
}
