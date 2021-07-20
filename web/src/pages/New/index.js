import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import './styles.css'

import camera from '../../assets/camera.png'

export default function New({ history }){
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault()
        const user_id = localStorage.getItem('user')
        const data = new FormData()
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)
        data.append('thumbnail', thumbnail)
        await api.post('/spots', data, {
            headers: { user_id }
        })
        history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecione uma imagem"/>
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input id="company" value={company} onChange={event => setCompany(event.target.value)} placeholder="Sua empresa"/>
            <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
            <input id="techs" value={techs} onChange={event => setTechs(event.target.value)} placeholder="Suas tecnologias"/>
            <label htmlFor="price">Valor da diária * <span>(em branco para gratuito)</span></label>
            <input id="price" value={price} onChange={event => setPrice(event.target.value)} placeholder="Valor da diária"/>
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}