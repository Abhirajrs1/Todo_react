import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import './Heading.css'
function Heading() {
    const [isCompleScreen, setIsCompleteScreen] = useState(false)
    const [toDo, setToDo] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [completedTodos, setCompletedTodos] = useState([])

    const todo = useCallback(() => {
        setIsCompleteScreen(false)
    },[])

    const completed = useCallback(() => {
        setIsCompleteScreen(true)
    },[])

    const setTitle = useCallback((e) => {
        setNewTitle(e.target.value)
    },[])

    const setDescription =useCallback((e) => {
        setNewDescription(e.target.value)
    },[]) 

    const handleAddTodo = useCallback(() => {
        let newTodo = {
            title: newTitle,
            description: newDescription
        }
        let updatedTodoArray = [...toDo]
        updatedTodoArray.unshift(newTodo)
        setToDo(updatedTodoArray)
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArray))
        setNewTitle('')
        setNewDescription("")

    }
    ,[toDo,newTitle,newDescription])

    const handleDeleteTodo = useCallback((index) => {
        const updatedTodoArray = toDo.filter((_, i) => i !== index)
        setToDo(updatedTodoArray)
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArray))
    },[toDo])

    const handleComplete = useCallback((index) => {
        let now = new Date()
        let dd = now.getDate()
        let mm = now.getMonth() + 1
        let yyyy = now.getFullYear()
        let h = now.getHours()
        let m = now.getMinutes()
        let s = now.getSeconds()
        let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s
        let filteredItem = {
            ...toDo[index],
            completedOn: completedOn
        }
        let updatedCompleteArr = [...completedTodos]
        updatedCompleteArr.unshift(filteredItem)   
        setCompletedTodos(updatedCompleteArr)
        handleDeleteTodo(index)
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr))
    },[toDo,completedTodos,handleDeleteTodo])

    const handleDeleteCompletedTodo = useCallback((index) => {
        let reducedTodoArray = completedTodos.filter((_, i) => i !== index);
        setCompletedTodos(reducedTodoArray);
        localStorage.setItem('completedTodos', JSON.stringify(reducedTodoArray));
    },[completedTodos])

   
    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'))
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
        if (savedTodo) {
            setToDo(savedTodo)
        }
        if (savedCompletedTodo) {
            setCompletedTodos(savedCompletedTodo)
        }
    }, [])



    return (
        <div className="Main">
            <h1>MY TODO</h1>
            <div className="Wrapper">
                <div className="todo_input">
                    <div className="input_items">
                        <label htmlFor="">TITLE:</label>
                        <input type="text" value={newTitle} placeholder="Title of your Todo" onChange={setTitle} />
                    </div>
                    <div className="input_items">
                        <label htmlFor="">DESCRIPTION:</label>
                        <input type="text" value={newDescription} placeholder="Please enter the description" onChange={setDescription} />
                    </div>
                    <div className="input_items">
                        <button type="button" className="primarybutton" onClick={handleAddTodo}>ADD</button>
                    </div>
                </div>

                <div className="button_area">
                    <button className={`secondaryButton ${isCompleScreen === false && 'active'}`} onClick={todo}>To-DO</button>
                    <button className={`secondaryButton ${isCompleScreen === true && 'active'}`} onClick={completed}>COMPLETED</button>
                </div>

                <div className="todo_list">

                    {isCompleScreen === false && toDo.map((item, index) => {
                        return (
                            <div className="todo_list_items" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <MdDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                                    <TiTick className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
                                </div>


                            </div>
                        )
                    })}

                    {isCompleScreen === true && completedTodos.map((item, index) => {
                        return (
                            <div className="todo_list_items" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed on : {item.completedOn}</small></p>

                                </div>

                                <div>
                                    <MdDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete?" />
                                </div>


                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Heading;