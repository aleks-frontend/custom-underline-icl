# Custom Underline (ICL)
## Description
Function is dynamically setting the specific ICL underline, with its specific offset and thickness and also the fact that punctuation marks aren't supposed to be underlined.

## Initialization
### HTML
HTML element with the actual text input inside will need to have the following data attribute: `data-cu-src-id="n"`.  
And the target/output element will need to have this data attribute: `data-cu-output-id="n"`.

ID of the source and output elements need to match (`n`).
#### Example
```
<div data-cu-src-id="1">{{{some-text-input}}}</div>
<div data-cu-output-id="1"></div>
```
### Javascript
`customUnderline()` function is stored in the snippet.
#### Example
```
{{{account.snippets.customUnderline}}}
customUnderline(); 
```
