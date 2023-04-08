import React, { useState, useRef, useEffect } from 'react'

const Home = () => {
    // to store title
    const title = useRef('')
    // to store description
    const description = useRef('')
    // to store all notes
    const [notes, setNotes] = useState([])

    // to fetch all notes from server
    useEffect(() => {
        fetch('http://localhost:8080/notes')
            .then(response => response.json())
            .then(data => setNotes(data));
    }, [])

    // to add new notes
    function addNotes() {
        const url = 'http://localhost:8080/notes'
        let temp_obj = { title: title.current.value, detail: description.current.value }
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(temp_obj)
        },)
            .then(response => response.json())
            .then(data => {
                let temp_obj2 = { ...temp_obj, id: data.id, created_date: data.created_date }
                console.log("temp_obj2", temp_obj2);
                setNotes([...notes, temp_obj2])
            })
    }

    // to delete a note
    function deleteBtn(e, id) {
        console.log("id: ", id);
        const url = 'http://localhost:8080/notes/' + id
        fetch(url, {
            method: 'delete'
        },)
            .then(response => {
                const newArr = notes.filter(obj => {
                    return obj.id != id
                })
                setNotes(newArr)
            });
    }

    return (
        <div>
            <div><h1>Notes</h1></div>
            <div>
                <label htmlFor="">Title</label>
                <input ref={title} type="text" />
                <label htmlFor="">Description</label>
                <input ref={description} type="text" />
                <button onClick={() => addNotes()}>Add</button>
            </div>
            <div className='container'>
                {console.log("notes", notes)}
                {notes.map((item, i) => {
                    return (
                        <div className='container-child'>
                            <div className='title'><h6>{item.title}</h6></div>
                            <div className='description'><p>{item.detail}</p></div>
                            <div className='date-created'><h6>Date Created: </h6><p>{item.created_date}</p></div>
                            <div className='delete-btn'><button onClick={(e) => deleteBtn(e, item.id)}>delete</button></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home