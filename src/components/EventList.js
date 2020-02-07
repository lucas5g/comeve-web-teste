import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../service/api'

function EventList() {

  const [events, setEvents] = useState([])
  let cont = 1

  useEffect(() => {
    document.title = 'Eventos'
    async function loadEvents() {
      const response = await api.get('/events')

      setEvents(response.data)
      //console.log(response.data)
    }

    loadEvents()
  }, [])

  const dateFormat = (dateString) => {
    let d = new Date(dateString)
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
  }


  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12 border-bottom">
          <Link type="button" className="btn btn-indigo float-right" to='/eventos/cadastrar'>Cadastrar Evento</Link>

          <h2>Eventos</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {events.map(r =>
              <li class="list-group-item">
                <div className="float-right">
                  <sub className="float-right">{dateFormat(r.date)}</sub><br/>
                  <sub className="float-right">{r.start} - {r.end}</sub>
                  <Link type="button" className="btn btn-outline-indigo" to='/eventos/"'+{r.id}+'"/recursos'>+ Recursos</Link>
                </div>

                <h4>{r.name}</h4>
                <p>{r.user.username} | {r.place.name} </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EventList