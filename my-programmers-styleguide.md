# My programmers styleguide

## Good to remember
- Data goes down.
- Events go up. (use callbacks)


## What to use and what not to use
1. Arrow functions NOT Regular functions
2. Backticks `` OR double quotes "" NOT Single quotes''
3.

## Naming conventions
1. Don't use generic names
2. Use clickHandler etc. so that it is clear that it is not a function that is 
called by us somewhere in my code but it is a function attached to an event listener


## Structure
1. Use camel case for file names

## Data
1. Fetching data should be done in a separate file in the data folder


## Inline coding
1. Make sure the logic inside the JSX doesn't get unreadable
<div>{date.toLocaleString('en-US', { month: 'long' })}</div> || this is too long
When it get's too long or harder to read, create a variable for it like so:

const month = date.toLocaleString('en-US', { month: 'long' })
<div>{month}</div>




## How to write..
1. event handlers: 'onChange={e => titleChangeHandler(e)}' rather than 
'onChange={titleChangeHandler}' this way we know that it's a function we are calling

1. When a tag contains a full closing tag like '</button>' write the opening and closing like this:
                        <button
                            type="submit"
                            value="Submit"
                            className={`btn btn-dark`}>
                            Zoek adviseurs
                        </button>
2. When a tag doesn't contain a full closing tag, write it like this:
            <li
                className={className}
                value={suggestion}
                key={suggestion}
                onClick={(e) => onClickHandler(e)}
            >