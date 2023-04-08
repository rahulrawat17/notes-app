import React, { useState, useRef, useEffect } from 'react'

const Home = () => {

    // URL
    const URL = 'http://localhost:8080/notes/'

    // to store title
    const title = useRef('')
    // to store description
    const description = useRef('')
    // to store all notes
    const [notes, setNotes] = useState([])

    // to fetch all notes from server
    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setNotes(data));
    }, [])

    // to format the datetime
    function formatDateTime(date) {
        let new_date = new Date(Date.parse(date));
        return new_date.toUTCString()
    }

    // to add new notes
    function addNotes() {
        let temp_obj = { title: title.current.value, detail: description.current.value }
        fetch(URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(temp_obj)
        },)
            .then(response => response.json())
            .then(data => {
                let temp_obj2 = { ...temp_obj, id: data.id, created_date: data.created_date }
                setNotes([...notes, temp_obj2])
            })
    }

    // to delete a note
    function deleteBtn(e, id) {
        fetch(URL + id, {
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
            {notes.length > 0 ?
                <div className='container'>
                    {notes.map((item, i) => {
                        return (
                            <div className='container-child'>
                                <div className='title'><h2>{item.title}</h2></div>
                                <div className='description'><p>{item.detail}</p></div>
                                <div className='date-created'><h5>Date Created: </h5><p>{formatDateTime(item.created_date)}</p></div>
                                <div className='delete-btn'><button onClick={(e) => deleteBtn(e, item.id)}>delete</button></div>
                            </div>
                        )
                    })}
                </div>
                :
                <div className='no-notes-div'>
                    <h4>No Notes to display</h4>
                </div>
            }
        </div>
    )
}

export default Home
