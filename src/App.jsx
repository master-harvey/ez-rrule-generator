import { useState } from "react";
import githubLogo from './github.svg'
import './App.css'

import EzRRule from 'ez-rrule-generator'

export default function App() {
    const [rule, setRule] = useState("")
    return <>
        <div className="wrapper">
            <h1>Ez RRule Generator <a href="https://github.com/master-harvey/ez-rrule-generator"><img src={githubLogo} alt="github" width={25} /></a></h1>
            <EzRRule onChange={(r) => setRule(r)} />
        </div>
        <p className="centered">Generated RRule sent to your onChange Callback:<br />{rule}</p>
    </>
}