import { useEffect, useState } from 'react'
import { RRule } from 'rrule'
import './ez-rrule.css'

export default function EzRRule(props) {
    const week = {
        MO: { enabled: false, day: RRule.MO },
        TU: { enabled: false, day: RRule.TU },
        WE: { enabled: false, day: RRule.WE },
        TH: { enabled: false, day: RRule.TH },
        FR: { enabled: false, day: RRule.FR },
        SA: { enabled: false, day: RRule.SA },
        SU: { enabled: false, day: RRule.SU }
    }

    const startDate = props.startDate ?? new Date()

    const [interval, setInterval] = useState(1)
    const [frequency, setFrequency] = useState("Year")

    const [daysOfWeek, setDaysOfWeek] = useState(week)

    const [end, setEnd] = useState("Never")
    const [endInt, setEndInt] = useState(1)
    const [endDate, setEndDate] = useState(Date())

    useEffect(() => setRRule(), [interval, frequency, daysOfWeek, end, endInt, endDate])

    function setRRule() {
        let freq;
        switch (frequency) {
            case "Year":
                freq = RRule.YEARLY
                break;
            case "Month":
                freq = RRule.MONTHLY
                break;
            case "Week":
                freq = RRule.WEEKLY
                break;
            case "Day":
                freq = RRule.DAILY
                break;
            case "Hour":
                freq = RRule.HOURLY
                break;
        }
        const rule = new RRule({
            freq, interval, dtstart: props.startDate ?? new Date(),
            byweekday: frequency == "Week" ? Object.entries(daysOfWeek).filter(d => { return d[1].enabled }).map(d => d[1].day) : undefined,
            until: end == "On" ? new Date(endDate) : undefined,
            count: end == "After" ? endInt : undefined
        })
        props.onChange(rule.toString())
    }

    return <div className="grid grid-cols-3 gap-1.5 items-center justify-items-end p-2 wrapper">
        <p className="w-28">Repeat Every</p>
        <input type="number" className="input input-bordered w-28" value={interval}
            onChange={(e) => {
                if (e.target.valueAsNumber > 0) { setInterval(e.target.valueAsNumber) }
            }}
        />
        <select className="select select-bordered w-28" onChange={(e) => { setFrequency(e.target.value) }}>
            {["Year", "Month", "Week", "Day", "Hour"].map((d) => (<option key={d} value={d}>{d}{interval > 1 ? "s" : ""}</option>))}
        </select>
        {(frequency == "Week") && <div className="flex flex-row space-x-1 col-span-3 mx-auto">
            {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((d) => (
                <div
                    className={`badge hover:cursor-pointer ${daysOfWeek[d].enabled ? "" : "badge-outline"}`} key={d}
                    onClick={() => { setDaysOfWeek({ ...daysOfWeek, [d]: { enabled: !daysOfWeek[d].enabled, day: daysOfWeek[d].day } }) }}
                >{d}</div>
            ))}
        </div>}

        <p className="w-28">Quit Repeating</p>
        <select className="select select-bordered w-28" onChange={(e) => { setEnd(e.target.value) }}>
            <option value="Never">Never</option>
            <option value="On">On</option>
            <option value="After">After</option>
        </select>
        {(end == "On") && <input type="date" value={endDate} onChange={(e) => { if (new Date(e.target.value) > startDate) { setEndDate(e.target.value) } }} className="input input-bordered w-28" />}
        {(end == "After") && <input type="number" value={endInt} onChange={(e) => { if (e.target.valueAsNumber > 0) { setEndInt(e.target.valueAsNumber) } }} className="input input-bordered w-28" />}
    </div>
}