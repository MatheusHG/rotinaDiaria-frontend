import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

import api from '../../services/api'

import Heart from '../../assets/loginPhoto.png'
import Back from '../../assets/back.png'

import './styles.css'
import './response.css'

toast.configure()

export default function NewActivity() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const list = [
        {name: 'High'},
        {name: 'Low'},
    ];

    const history = useHistory()

    const token = localStorage.getItem('token')

    async function newActivity(e){
        e.preventDefault()

        const data = {
            title, 
            date, 
            time,
            description,
            priority
        }

        try {
            api.post('activity', data, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            history.push('/activity')
            toast.success('Activity successfully registered!', {position: "bottom-right", autoClose: 2500})
        } catch(err) {
            toast.error('Error Registering Activity!', {position: "bottom-right", autoClose: 2500})
        }
    }

    return(
        <div className="content">
            
            <Link className="content-top" to="/activity">
                <img src={Back} alt="Back" width="20px" height="20px"/>
                <h4>Back to Feed</h4>
            </Link>
           
            <div className="block">
                <div className="content-left">
                    <img src={Heart} alt="Heart" width= "300px" height= "250px" />
                    <strong>
                        Schedule your appointments and stay in control of all your activities <br/>
                        <br/>
                        And the best, all online!
                    </strong>
                </div>

                <div className="content-right">

                    <h1>Add new Task</h1>

                    <form className="content-form" onSubmit={newActivity}>

                        <div className="field">
                            <input 
                                placeholder="Task Name" 
                                value = {title}
                                onChange={e => setTitle(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="field-group">
                            <input 
                                type="date"
                                placeholder="Date - dd / mm / aaaa" 
                                value = {date}
                                onChange={e => setDate(e.target.value)}
                                required 
                            />
                            <input 
                                type="time"
                                placeholder="Time - hh : mm" 
                                value = {time}
                                onChange={e => setTime(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="field">
                            <input 
                                placeholder="Description" 
                                value = {description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <select value={priority} onChange={e => setPriority(e.target.value)} required>
                            <option defaultValue hidden > Select the Priority level </option>
                            {list.map((item, index) => (
                                <option 
                                    key={item.name}
                                    value={item.name} 
                                    style={{ 
                                        background: item.name === 'Low' ?
                                            '#5ad0c6'
                                            :
                                            '#7e42e0' 
                                    }}> {item.name} </option>
                            ))}
                        </select>
                        
                        <button id="button-submit" type="submit">Salvar tarefa</button>

                    </form>
                </div>  
            </div>
        </div>
    )
}