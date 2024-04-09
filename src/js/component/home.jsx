import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  // Estados del componente
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Trae los todos del storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Guarda los todos en el storage storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') { //si el input limpio de espacios es distinto a string vacío
      setTodos([inputValue, ...todos]); //lo agrega al array todos
      setInputValue(''); // Limpia el input
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos]; // Hace una copia del array en la variable
    newTodos.splice(index, 1); //recorta del array, según el index dado
    setTodos(newTodos); //El array sin el elemento recortado es el nuevo valor de todos
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div>
      <h1 className="project-title">ToDo List - Agustin Trezza - 4Geeks</h1>
      <div className="d-flex justify-content-center align-items-center vh-100 container-custom">
        <div className="title-container">
          <h1 className="title">¡Creá una lista de Tareas!</h1>
        </div>
        <div className="todo-input">
          {/* <label htmlFor="todoInput" className="form-label">¡Creá tu lista de Tareas!</label> */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            placeholder="Ingresá un toDo"
            className="form-control"
          />
        </div>


        <div className="todo-container">

          <ul className="list-group todo-item">
            {todos.map((todo, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {todo}
                <button onClick={() => handleDeleteTodo(index)} className="btn btn-danger btn-delete delete-symbol">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
            <div className="container-tareas">

              {todos.length > 0 ? (
                <p className="ms-2 tareas-message">Cantidad de Tareas: {todos.length}</p>
              ) : (
                <p className="ms-2 tareas-message">Aún no hay tareas agregadas</p>
              )}
            </div>
          </ul>

        </div>

      </div>
    </div>
  );
};

export default Home;
