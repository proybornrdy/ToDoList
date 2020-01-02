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

- When program is first loaded, it is initially set to display user input field for the server address.
  - After the first load, the application will display users tasks instead.
- If valid address that meets the expectation of JSON format is entered, this function is fired to fetch data from the server.
- Fetched data is converted to appropriate format within the application and can be accessed in future usage without requesting to the server.
- The server address is also stored within application for future request to server.

### `showTasks()`and `divideTasks()`
- showTasks() calls divideTasks() to divide users tasks into three different categories.
- Depending on which sorting method is selected, tasks are split into three according to their urgency or progression.
- If sorted in urgency, tasks are divided into `critical`, `urgent` and `normal`
  - Critical: 24hr and less 
  - Urgent: less than 7 days
  - Normal: more than a week
- Otherwise, tasks are sorted by progression (their status).Tasks are divided into `Pending`, `in-progress` and `completed`
- showTasks() then creates its html element with three divisions, each division containing appropriate tasks.

### `addUserTask()` and `taskIDGenerator()`
- Users can add their tasks by filling in the input fields in designated area at the top.
- For the due-date field, [react-datepicker](https://www.npmjs.com/package/react-datepicker) plugin was used.
- Upon user pressing the `add` button, addUserTask() creates JSON format string for the Task.
  - each created task is assigned with unique `taskID`, which is based off from time task is created.
- Once task is created, application request PUT method to server to update user's tasks.

### `editUserTask(taskID)` and `removeUserTask(taskID)` 

- Once editUserTask() is called, user can access within html element of the specific task to make change.
  - If the field is left blank, no change will be made
- changing task among list of tasks can be identified by unique taskID
- removeUserTask() works similar to editUserTask() except it removes task with unique taskID
- At the end of each function, application request PUT method to update user's tasks.


## Possible Improvements
Due to limited time (5hr) I have set for this project, there are many areas which can be improved.

### Program-wise
- With larger scale of tasks, using multi-thread for the sorting or dividing tasks would benefit in run-time.
  - Current application uses linear search since its scale is small
- Support multiple users by adding authetication method for each users
- change HTTP request to more secured connection 
- change to Object Oriented Programming along with modular design

### Feature-wise
- color code tasks' statuses and each task card depending on urgency
- calendar view of the user's task
- responsive web design
- Mail or sms notification
- Login system

