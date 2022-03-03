# webpack-useSWR-cache-issue
Created with CodeSandbox

## Installation
npm i

## How to reproduce the bug? 
- npm run start
- browser should open on localhost:8080
- open dev tools
- click on load more
- click on leave page
- you should land in a breakpoint on line 60 in the Test.component.js file
- appCache is '[]'
