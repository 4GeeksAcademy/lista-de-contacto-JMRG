import React, { useState,useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


//create your first component
const Home = () => {
	const [tarea,setTarea] = useState("");
	const [state,setState] = useState([])
	
const getTodos = async() => {
    try {
        const result =await fetch("https://playground.4geeks.com/todo/users/todo1")
        const data =await result.json();
		console.log(data)
        setState(data.todos)
    }catch(error){
        console.log("error 257",error)
    }
}

const postTodos = async () => {
	try {
		await fetch('https://playground.4geeks.com/todo/todos/todo1',{
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify({
			"label": tarea,
			"is_done": false
		})
	})
	setTarea("");
	await getTodos();
	} catch (error) {
		console.log('error 404:',error)
	}
	
}
	
const deleteTodos = async(id)=>{
	await fetch(`https://playground.4geeks.com/todo/todos/${id}` ,{
		method: "DELETE",
	})

}

useEffect(()=>{
getTodos()
},[])


	return (
		<div className="text-center m-5">
			<form className="mb-3" onSubmit={(e)=>{e.preventDefault(); postTodos()}}>
				<label 
				htmlFor="tareas" 
				className="form-label"
				
				>Tareas</label>
				<input 
				type="text" 
				className="form-control" 
				id="tareas" 
				placeholder="Sacar la basura"
				value={tarea}
				onChange={(e)=>setTarea(e.target.value)}
				
				/>
			<div className="col-auto">
    			<button 
				type="submit" 
				className="btn btn-primary mb-3"
				>Confirmar Tarea</button>
  			</div>			
				</form>
				
				{
					state.map((item)=>{
						return(
							<div className="mb-3" key={item.id}>
								<span>{item.label}</span>
								<button className="btn btn-primary" onClick={()=>{deleteTodos(item.id); getTodos()}}>Borrar tarea</button>
							</div>
						)
					}
				)
				}
		</div>
	);
};

export default Home;