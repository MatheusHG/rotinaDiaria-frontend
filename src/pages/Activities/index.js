import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify';

import api from './../../services/api'

import Exit from '../../assets/exit.png'
import IconPurple from '../../assets/purple.png'
import IconBlue from '../../assets/blue.png'
import Search from '../../assets/search.svg'
import Quit from '../../assets/quit.svg'

import './styles.css'
import './response.css'

toast.configure()

export default function () {

    const [atividades, setAtividades] = useState([])
    const [pesquisa, setPesquisa] = useState("")

    const history = useHistory()
    const userName = localStorage.getItem('user')
    const acesso = localStorage.getItem('token')

    async function loadModalExit() {
        //Modal do botão de Sair
        const modal = document.querySelector(".activity-container #modal.hide")
        const buttonInicial = document.querySelector(".activity-container .container-top .exit")
        const buttonBack = document.querySelector("#modal.hide .modal-content .modal-button .button-back ")
        const buttonExit = document.querySelector("#modal.hide .modal-content .modal-button .button-exit ")

        await buttonBack.addEventListener("click", () => {
            modal.classList.add("hide")
        })
        await buttonInicial.addEventListener("click", () => {
            modal.classList.remove("hide")
        })
        await buttonExit.addEventListener("click", () => {
            modal.classList.add("hide")
            history.push('/')
        })
    }

    useEffect(() => {
        loadModalExit()
        api.get('/activity', {
            headers: {
                Authorization: 'Bearer ' + acesso,
            }
        }).then(response => {
            setAtividades(response.data.activitys)
        })
    }, [])

    async function handleSearch() {
        const response = await api.get(`activity/search?title=${pesquisa}`, {
            headers: {
                Authorization: 'Bearer ' + acesso,
            }
        })
        setAtividades(response.data)
    }


    const quantityActivities = atividades.length

    async function DeleteActivity(id) {
        try {
            await api.delete(`/activity/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + acesso,
                }
            })
            setAtividades(atividades.filter(atividade => atividade._id !== id))
        } catch (err) {
            toast('Error deleting the Activity, try again.')
        }
    }

    return (
        <div className="activity-container">
            <div className="container-top">
                <span>Welcome, {userName}</span>
                <Link className="button" to="/activity/new">Add new Activity</Link>
                <Link className="exit" to="#">
                    <img src={Exit} alt="Exit" width="50px" height="50px" className="exit" />
                </Link>
            </div>

            <div className="menu-container">
                <h1>Activity Feed</h1>
                <div className="info-priority">

                    <div className="search-field">

                        <input onChange={(e) => {
                            e.preventDefault()
                            setPesquisa(e.target.value)
                        }} type="text" name="search" placeholder="Search Task"/>


                        <button onClick={() => handleSearch()} >
                            <img src={Search} alt="Buscar" />
                        </button>


                    </div>

                    <div className="info-bottom">
                        <img src={IconPurple} alt="Icon-Blue" />
                        <h2>High Priority</h2>
                        <img src={IconBlue} alt="Icon-Purple" />
                        <h2>Low Priority</h2>
                    </div>
                </div>
            </div>

            <div className="containerCards">
                <h5>Total of <strong>{quantityActivities} sticky notes</strong></h5>
                <ul>
                    {atividades.map(activity => (
                        <li
                            key={activity._id}
                            style={{
                                background: activity.priority === 'Low' ?
                                    '#5ad0c6'
                                    :
                                    '#7e42e0'
                            }}
                        >
                            <strong>Task Name</strong>
                            <p>{activity.title}</p>

                            <div className="dateTime">
                                <strong>Date</strong>
                                <p>{activity.date}</p>
                                <strong>Schedule</strong>
                                <p>{activity.time}</p>
                            </div>

                            <strong>Location / Description</strong>
                            <p>{activity.description}</p>

                            <button type="button" className="buttonDetails" data-toggle="modal" data-target="#exampleModal">
                                <img
                                    src={Quit}
                                    alt="Quit"
                                    height="20px"
                                    width="20px" />
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Deseja realmente excluir?</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            A atividade '{activity.title}' será excluida da sua Agenda.
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-warning" data-dismiss="modal">Voltar</button>
                                            <button type="button" className="btn btn-outline-danger" onClick={() => { DeleteActivity(activity._id) }} data-dismiss="modal">Deletar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="modal" className="hide">
                <div className="modal-content">
                    <div className="modal-box">
                        <div className="modal-title">
                            <h1>
                                Want to Exit, {userName}? :(
                            </h1>
                        </div>
                        <div className="modal-text">
                            <p>
                                Take advantage of our website and schedule your tasks with us!
                            </p>
                        </div>
                        <div className="modal-button">
                            <Link className="button-back" to="/activity">Back</Link>
                            <button className="button-exit">Exit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}