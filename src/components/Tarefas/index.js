import React from 'react';
import PropTypes from 'prop-types';

import './Tarefas.css';

import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default function Tarefas({ tarefa, handleDelete, handleEdit }) {
  return (
    <ul className="tarefas">
      {tarefa.map((tarefas, index) => (
        <li key={tarefas}>
          {tarefas}
          <div>
            <FaEdit className="edit" onClick={(e) => handleEdit(e, index)} />
            <FaWindowClose className="close" onClick={(e) => handleDelete(e, index)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  tarefa: PropTypes.array.isRequired,
};
