//import logo from './logo.svg';
import React, {useState, useRef, useEffect} from "react"
import { nanoid } from "nanoid"
import Todo from "./components/Todo"
import Form from "./components/Form"
import FilterButton from "./components/FilterButton"
// import { usePrevious } from "./components/Todo"
import usePrevious from "./functions/usePrevious"
const FILTER_MAP = {
	All: ()=> true,
	Active: (task)=> !task.completed,
	Completed: (task)=> task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
	//filter behavior
	const [filter, setFilter] = useState("All")

	//edit a task from the list
	const editTask=(id, newName)=>{
		// console.log("edit task: ", id, newName)
		const editTaskList = tasks.map(task=>{
			if(id === task.id){
				return{
					...task, name: newName
				}
			}
			return task
		})
		setTasks(editTaskList)
	}

	//toggle test
	const toggleTaskCompleted = (id) =>{
		// console.log("toggle test",id, task.completed)
		const updateTask = tasks.map(task=>{
			if(id === task.id){
				return{
					...task, completed: !task.completed
				}
			}
			return task
		})
		setTasks(updateTask)
		console.log("updateTask: ", updateTask)
	}

	//delete Todo
	const deleteTask=(id)=>{
		// console.log("deleting: ",id)
		const remainingTasks = tasks.filter(task => {
			if (task.id !==id){
				return{
					...task
				}
			}
			return 0
		})
		setTasks(remainingTasks)
		// console.log("remaining Task: ", remainingTasks)
	}

	//setting the todo list
	const [tasks, setTasks] = useState(props.tasks)
	const taskList = tasks?.filter(FILTER_MAP[filter])
	.map((task)=> (
	<Todo key={task.id} 
		id={task.id} name={task.name} 
		completed={task.completed} 
		toggleTaskCompleted={toggleTaskCompleted}
		deleteTask={deleteTask}
		editTask={editTask}
	/>))
	// console.log("tasks: ",tasks) //output the list to console
	
	//sort filter buttons
	const filterList = FILTER_NAMES.map(name =>(
		<FilterButton 
		key={name} 
		name={name} 
		isPressed={name === filter} 
		setFilter={setFilter}/>
	))

	//checking the number of todo left and setting the correct Grammar and text heading
	const taskNoun = taskList.length !==1 ? "tasks": "task";
	const headingText = `${taskList.length} ${taskNoun} remaining`
	
	//add a new todo to the list
	const addTask =(name)=>{
		const newTask = {id:`todo-${nanoid()}`,name:name , completed:false}; setTasks([...tasks, newTask])
	}

	const listHeadingRef = useRef(null);
	const prevTaskLength = usePrevious(tasks.length)
	useEffect(()=>{
		if(tasks.length- prevTaskLength===-1){
			listHeadingRef.current.focus()
		}
	},[tasks.length, prevTaskLength])
  	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<Form addTask={addTask}/>
			<div className="filters btn-group stack-exception">
				{/* {filterButtonList} */}
				{filterList}
			</div>
			<h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>{headingText}</h2>
			<ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
				{taskList}
			</ul> 
		</div>
  	);
}

export default App;
