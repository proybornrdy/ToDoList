This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
Purpose of this projcect is to immitate todo-list web application, thats available online, using reactJS.<br />
The project was time limited and has potential to be upgraded in the future.

## REST API Server

This project uses JSON REST APIs to fetch user's to do list.

### `Fake REST API` - [json-server](https://www.npmjs.com/package/json-server)

For the purpose of this project, which is to create front-end of a web application,
used placeholder for the REST API instead of using actual server.<br />

However, as long as format of json matches requirement for this project, actual server can be used for the project.

### `Json Format`

As mentioned in above section, any server (or placeholder) can be used for the project,<br />
as long as json follows the following format.

```javascript
{
“id”: someNumber,
“Tasks”: [ list of json format tasks]
}
```
Json format tasks:
```javascript
{
"title": some string,
      	"desc": some string,
      	"due": string in mm/dd/yyyy,
      	"id": some unique number,
      	"status": "pending"||”inprogress”||”complete”,
      	"edit": true||false
}

```


## Code Breakdown 

Currently code is designed in procedural programming but with Object oriented programming in mind.<br />

In this section, each function will be described breifly for better understanding of this web-application.

### `getData()`

When program is first loaded, it is initially set to display user input field for the server address.<br />
If valid address that meets the expectation of JSON format is entered, this function is fired to fetch data from the server.<br />
Fetched data is converted to appropriate format within the application and can be accessed in future usage without requesting to the server.<br />
The server address is also stored within application for future request to server.

### `getUserTasks()`

### `showTasks()`and `divideTasks()`

### `addUserTask()` and `taskIDGenerator()`


### `editUserTask(taskID)` and `removeUserTask(taskID)` 

## Possible Improvements

