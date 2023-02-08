import React, { Component } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies

import './Main.css';
import Form from './Form';
import Tarefas from './Tarefas';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefa: [],
    index: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({
      tarefa: tarefas,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefa } = this.state;

    if (tarefa === prevState.tarefa) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefa));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefa, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefa.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefa];

    if (index === -1) {
      this.setState({
        tarefa: [...novasTarefas, novaTarefa],
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefa: [...novasTarefas],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tarefa } = this.state;
    this.setState({
      index,
      novaTarefa: tarefa[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefa } = this.state;
    const novasTarefas = [...tarefa];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefa: [...novasTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefa } = this.state;

    return (

      <div className="main">
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas handleEdit={this.handleEdit} handleDelete={this.handleDelete} tarefa={tarefa} />

      </div>
    );
  }
}
