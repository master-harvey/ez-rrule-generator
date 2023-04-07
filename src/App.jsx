import { useState } from "react";
import githubLogo from './github.svg'

import EzRRule from 'ez-rrule-generator'

export default function App() {
    const [rule, setRule] = useState("")
    return <>
        <br />
        <h1 className="centered">Ez RRule Generator</h1>
        <EzRRule onChange={(r) => setRule(r)} className="wrapper" />
        <p className="centered">Generated RRule sent to your onChange Callback:<br />{rule}</p>
        <br />
        <p align="center">
            <a href="https://github.com/master-harvey/ez-rrule-generator" target="_blank">
                <img src={githubLogo} alt="github" width={25} />
            </a>
        </p>
    </>
}