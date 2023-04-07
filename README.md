# Ez RRule Generator

An alternative RRule Generator made using React, Tailwind, and daisyUI. Simply supply a callback function to the component's onChange attribute to handle the created date repetition rule. Optionally supply a start date object using the component's startDate attribute, today's date is used by default.

Ex: `<EzRRule onChange={(c) => console.log(c)} startDate={new Date()} />`

[Try it out](https://codesandbox.io/p/github/master-harvey/ez-rrule-generator/ "&lt;Code Sandbox&gt;")
