This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Purpose of this projcect is to immitate todo-list web application, thats available online, using reactJS.

## REST API Server

This project uses JSON REST APIs to fetch user's to do list.

### `Fake REST API` - [json-server](https://www.npmjs.com/package/json-server)

For the purpose of this project, which is to create front-end of a web application,
used placeholder for the REST API instead of using actual server.<br />

However, as long as format of json matches requirement for this project, actual server can be used for the project.

### `json Format`


```javascript
{
“id”: someNumber,
“Tasks”: [ list of json format tasks]
}
```

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


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
