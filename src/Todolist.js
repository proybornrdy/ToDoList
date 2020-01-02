import React from 'react'
import './Todolist.css'
import Datepicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class Todolist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      userData: null,
      curUser: "admin",
      tasks:[],
      urgency: true,
      date:new Date(),
      dataLink: ""

    }
    this.addUserTask = this.addUserTask.bind(this)
    this.selectDate = this.selectDate.bind(this)
    this.getData = this.getData.bind(this)
  }



  getData(e){
    e.preventDefault()
    const data = new FormData(e.target)

    var dblink = data.get("dblink");
    fetch(dblink)
    .then(response => response.json())
    .then(
      (response) =>{
        this.setState({
          isLoaded: true,
          userData:response,
          curUser:response.username,
          tasks: response.tasks,
          dataLink:dblink
        })
      }
    )
  }
  selectDate(e){
    this.setState({date: e})
  }

  changeStatus(e, taskID){
    var tasks = [...this.state.tasks]
    for (var task in tasks ){
      if(tasks[task].id === taskID){
        var curStat = tasks[task].status
        if(curStat === "pending"){
          tasks[task].status = "inprogress"
        }else if(curStat === "inprogress"){
          tasks[task].status = "complete"
        }else{
          tasks[task].status = "pending"
        }
        break
      }
    }
    this.setState({tasks: tasks})
    fetch(this.state.dataLink, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "tasks": tasks
      })
    })
  }

  divideTasks(){
    var tasks = [...this.state.tasks]
    var div = {}

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    div[0] =[];
    div[1]=[];
    div[2]=[];

    if (this.state.urgency){


      for (var task in tasks){

        var taskdue = tasks[task].due.split('/')
        var taskdd = parseInt(taskdue[1]);
        var taskmm = parseInt(taskdue[0]);
        var taskyyyy= parseInt(taskdue[2]);

        if (taskyyyy===yyyy){
          if(taskmm === mm){
            if (taskdd <= dd){
              div[0].push(tasks[task])
            } else if( taskdd <= dd+7){
              div[1].push(tasks[task])
            }else{
              div[2].push(tasks[task])
            }
          }else{
            div[2].push(tasks[task])
          }
        }else{
          div[2].push(tasks[task])
        }
      }

    }
    else{
      for (var task in tasks){
        var taskStat = tasks[task].status
        if(taskStat ==='pending'){
          div[0].push(tasks[task])
        }else if( taskStat ==='inprogress'){
          div[1].push(tasks[task])
        }else{
          div[2].push(tasks[task])
        }
      }
    }
    return div;


  }

  showTasks(){
    var sortedTask = this.divideTasks();
    var div1 = '';
    var div2 = '';
    var div3 = '';
    if (this.state.urgency){
      div1 = "critical"
      div2 = "urgent"
      div3 = "normal"
    }else{
      div1 = "pending"
      div2= "inprogress"
      div3 = "complete"
    }
    return(
      <div className = "division">
        <div className="div1">
          <div>{div1}</div>
          {this.getUserTasks(sortedTask['0'])}
        </div>
        <div className="div2">
          <div>{div2}</div>
          {this.getUserTasks(sortedTask['1'])}
        </div>
        <div className="div3">
          <div>{div3}</div>
          {this.getUserTasks(sortedTask['2'])}
        </div>
      </div>
    )
  }


  getUserTasks(tasks){



    return(
      tasks.map(task=>
        !task.edit ?
        (
          <div key = {task.id} className="task">
            <div className = "title">
              <h3>{task.title}</h3>
            </div>
            <div className = "datestatus">
              <button className ="status" onClick={(e)=>{this.changeStatus(e,task.id)}}>
                {task.status}
              </button>
              <div className="space"/>
              <div className = "date">
                <p>{task.due}</p>
              </div>
            </div>
            <div className = "desc">
              <textarea disabled value={task.desc}>{task.desc}</textarea>
            </div>

          <form onSubmit = {(e)=>{this.editUserTask(e,task.id)}}>
            <button>edit</button>
          </form>
          <button onClick={()=>{this.removeUserTask(task.id)}}> remove</button>
          </div>
        )
        :(
          <div key = {task.id} className="task">

          <form onSubmit = {(e)=>{this.editUserTask(e,task.id)}}>

            <div className = "title">
            <input id="title" name="title" type="text" placeholder ="Title"/>
            </div>

            <div className = "datestatus">
              <div className ="status">
                <p>{task.status}</p>
              </div>
              <div className="space"/>
              <div className = "date">
              <Datepicker id="duedate" name="duedate" type="text" autoComplete='off' selected = {this.state.date} onSelect={this.selectDate}/>
              </div>
            </div>
            <div className = "desc">
            <textarea id="desc" name="desc" cols="50" rows="10" placeholder="description"></textarea>
            </div>


            <button>edit</button>
          </form>

          <button onClick={()=>{this.removeUserTask(task.id)}}> remove</button>
          </div>
        )
      )
    )

  }

  addUserTask(e){
    e.preventDefault()
    const data = new FormData(e.target)
    e.target.elements.title.value = ''
    e.target.elements.desc.value = ''
    e.target.elements.duedate.value = ''
    var currentTask = [...this.state.tasks]
    var newTask = {}


    newTask['title'] = data.get("title")
    newTask['desc'] = data.get("desc")
    newTask['due'] = data.get("duedate")
    newTask['id'] = this.taskIDGenerator()
    newTask['status'] = "pending"
    newTask['edit'] = false


    currentTask.push(newTask)

    this.setState({tasks: currentTask})


    fetch(this.state.dataLink, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "tasks": currentTask
      })
    })
  }

  editUserTask(e,taskID){
    var tasks = [...this.state.tasks]
    for (var task in tasks ){
      if(tasks[task].id === taskID){
        if(!tasks[task].edit){
          tasks[task].edit = true
        }else{
          e.preventDefault()
          const data = new FormData(e.target)

          if(/\S/.test(data.get("title")))
            tasks[task].title = data.get("title")
          if(/\S/.test(data.get("desc")))
            tasks[task].desc = data.get("desc")
          if(/\S/.test(data.get("duedate")))
            tasks[task].due = data.get("duedate")

          tasks[task].edit = false
        }
        break
      }
    }
    this.setState({tasks: tasks})
    fetch(this.state.dataLink, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "tasks": tasks
      })
    })
  }

  removeUserTask(taskID){
    var currentTask = [...this.state.tasks]

    for (var task in currentTask){
      if (currentTask[task].id === taskID){
        currentTask.splice(task,1)
        break;
      }
    }
    this.setState({tasks: currentTask})


    fetch(this.state.dataLink, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "tasks": currentTask
      })
    })


  }

  taskIDGenerator(){
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var millisec = new Date().getMilliseconds();

    return(year+hours+min+sec+millisec)
  }


  render(){
    const isLoaded = this.state.isLoaded;


    if (!isLoaded) {
      return(

       <div>
         <form onSubmit = {this.getData}>
           <label htmlFor="dblink">JSON format DB Link</label>
           <input id="dblink" name="dblink" type="text" autoComplete='off'placeholder="ex)http://localhost:3004/users/1/"/>
           <button>load</button>
         </form>
       </div>
    )
    } else {
      return(
        <div className = "mainContainer">
        <div>

        <form onSubmit={this.addUserTask}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" autoComplete='off'/>

          <label htmlFor="desc">description</label>
          <input id="desc" name="desc" type="text" autoComplete='off'/>

          <label htmlFor="duedate">duedate</label>
          <Datepicker id="duedate" name="duedate" type="text" autoComplete='off' selected = {this.state.date} onSelect={this.selectDate}/>

          <button>add</button>
        </form>
        </div>
        <div>
        <button onClick={()=>{this.setState({urgency:true})}}>by urgency</button>
        <button onClick={()=>{this.setState({urgency:false})}}>by progression</button>
        </div>


        {this.showTasks()}


        </div>
      )
    }

  }



}
export default Todolist;
