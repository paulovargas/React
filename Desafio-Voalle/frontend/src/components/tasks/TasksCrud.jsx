import axios from 'axios'
import React, { Component, useState } from 'react'
import Main from '../template/Main'

import './ProgressBar.css'


/* CODIGO TESTE*/


const headerProps = {
    icon: 'tasks',
    title: 'Tarefas',
    subtitle: 'Cadastro de tarefas: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/tasks'
const initialState = {
    tasks: { titulo: '', descri: '', prazo: '', priori: '', progre: parseInt('') },

    list: []
}

export default class TasksCrud extends Component {

    state = { ...initialState, percent: 0}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ tasks: initialState.tasks })
        this.state.percent = 0
    }

    save() {
        const tasks = this.state.tasks
        const method = tasks.id ? 'put' : 'post'
        const url = tasks.id ? `${baseUrl}/${tasks.id}` : baseUrl
        axios[method](url, tasks)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ tasks: initialState.tasks, list }) 
            })
            this.state.percent = 0
    }

    getUpdatedList(tasks, add = true) {
        const list = this.state.list.filter(t => t.id !== tasks.id)
        if (add) list.unshift(tasks)
        return list
    }

    updateField(event) {
        const tasks = { ...this.state.tasks }
        tasks[event.target.name] = event.target.value
        this.setState({ tasks })
    }
    updateProgress = (field, val) => {
        this.setState({ [field]: val });
       
    };


    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Titulo</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="titulo"
                                value={this.state.tasks.titulo}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o título..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="descri"
                                    value={this.state.tasks.descri}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite a descrição..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Prazo</label>
                                <input 
                                    type="date" 
                                    className="form-control"
                                    name="prazo"
                                    value={this.state.tasks.prazo}
                                    onChange={e => this.updateField(e)}
                                    placeholder= ""/>
                        </div>
                    </div>                    

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Prioridade</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="priori"
                                    value={this.state.tasks.priori}
                                    onChange={e => this.updateField(e)}
                                    placeholder={this.priori}>

                                <option value="Baixa" selected>Baixa</option>
                                <option value="Média" >Media</option>
                                <option value="Alta" >Alta</option>
                            </select>
                        </div>
                    </div>                   

                    <div className="col-12 col-md-6">

                        <div className="form-group">
                            
                            <div className={"progressComp"}>
                                
                                <h1 className="percent-number">{this.state.percent}%
                                
                                <div className="progress-div" style={{width: 400}}>
                                    
                                    <div
                                        className="progress"
                                        
                                        style={{width: `${this.state.percent * 4}px`}}
                                        onChange={e => this.updateField(e)}
                                        
                                        />
                                    </div>                                
                                </h1>

</div>

<div className="col-12 col-md-6">

    <div className="form-group">

        <input

            type="hidden"
            className="form-control"
            name="progre"
            value= {this.state.tasks.progre = this.state.percent}
            onChange={e => this.updateField(e)}
            placeholder=""
                             >

        </input>
    
    </div>
    <div className="row">
    
    <div className="col-12 d-flex justify-content-end">
        
        <button className="btn btn-primary"
        
        onClick={() => this.updateProgress("percent", this.state.percent + 10)}>
                
                +   10%
                
        </button>
        <div></div>
        
        <button 
        
            className="btn btn-primary"
            
            onClick={() => this.updateProgress("percent", this.state.percent - 10)}>
                
                - 10%
                
        </button>
    
    </div>
    
</div>
</div>


</div>

</div>

</div>


<hr/>


<div className="row">
    
    <div className="col-12 d-flex justify-content-end">
        
        <button className="btn btn-primary"
        
            onClick={e => this.save(e)}>
                
                Salvar
                
        </button>
        
        <button 
        
            className="btn btn-secondary ml-2"
            
            onClick={e => this.clear(e)}>
                
                Cancelar
                
        </button>
    
    </div>
    
</div>

</div>

)

}

load(tasks){
    
    this.setState({ tasks })
    
    this.state.percent = tasks.progre
                                        }

    remove(tasks){
        
        axios.delete(`${baseUrl}/${tasks.id}`).then(resp => {
        
            const list = this.getUpdatedList(tasks, false)
            this.setState({ list })

        })
    }

    renderTable(){

        return(

            <table className="table mt-4">

                <thead>

                <tr>                     
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Prazo</th>
                        <th>Prioridade</th>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Progresso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map( tasks => {
            return (
                <tr key={tasks.id}>
                    <td>{tasks.prazo}</td>
                    <td>{tasks.priori}</td>
                    <td>{tasks.titulo}</td>
                    <td>{tasks.descri}</td>                   
                    <td>{tasks.progre}%

                        <div className="progress-div" style={{width: 100}}>

                        <div style={{width: `${tasks.progre * 1.1}px`}}className="progress" /></div></td>

                    <td>

                        <button className="btn btn-warning"
                            onClick={() => this.load(tasks)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(tasks)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}