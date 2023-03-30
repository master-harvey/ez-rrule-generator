import { useState } from "react"
import EzRRule from "../components/ez-rrule"
import './App.css'

export default function App() {
  const [rule, setRule] = useState("")
  return <>
    <p className="centered header">EZ-RRule-Generator <a href="https://github.com/master-harvey/ez-rrule-generator">&lt;github&gt;</a></p>
    <div className="test-wrapper">
      <EzRRule startDate={new Date()} onChange={(c) => setRule(c)} />
    </div>
    <div>
      {rule && <p className="centered">Generated input sent to your onChange method:</p>}
      <p className="centered">{rule}</p>
    </div>
  </>
}