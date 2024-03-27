import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addJob, deleteJob, changeStatus, filterData } from '../redux/reducers/todoList.js';
import './toDoList.css'

export default function TodoListApp() {
  const [job, setJob] = useState({
    name: '',
    id: '',
    status: false
  });

  const [switchOn, setSwitchOn] = useState(false);

  const handleChange = (event) => {
    setJob({
      ...job,
      name: event.target.value,
    });
  };

  const getJobs = useSelector((state) => state.todoList);
  
  const dispatch = useDispatch();

  const addTodo = () => {
    dispatch(addJob(job));
    setJob({
      name: '',
      id: '',
      status: false
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const handleCheckboxChange = (id) => {
    dispatch(changeStatus(id));
  };

  const filterJob = () => {
    dispatch(filterData());
  };
 
  useEffect(() => {
    const todoList = document.querySelector('.todo-list');
    if (switchOn) {
      todoList.classList.add('crossed-out');
    } else {
      todoList.classList.remove('crossed-out');
    }
  }, [switchOn]);

  return (
    <div className='todo-list-container'>
      <div className='header'>
        <h1 className='font-mono'>Todo List</h1>
        <p className='sub-header'>Get things done, one item at a time</p>
        <hr className='hr' />
      </div>

      <ul className='todo-list'>
        {getJobs.map((item, index) => (
          <li key={index}>
            <span style={{ textDecoration: item.status ? 'line-through' : '' }}>
              {item.name}
            </span>
            <div className='control-panel'>
              <input
                checked={item.status}
                className='checkbox'
                type='checkbox'
                onChange={() => handleCheckboxChange(item.id)}
              />
              <span
                className='material-symbols-outlined delete-button'
                onClick={() => dispatch(deleteJob(index))}
              >
                delete
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className='footer'>
        <p>Move done items at the end?</p>
        <div className='switch'>
          <input
            type='checkbox'
            id='toggleSwitch'
            checked={switchOn}
            onChange={() => {
              setSwitchOn(!switchOn);
              filterJob();
            }}
          />
          <label htmlFor='toggleSwitch'></label>
        </div>
      </div>
      <h3>Add to the todo list</h3>
      <div>
        <input
          type='text'
          value={job.name}
          onChange={handleChange}
          className='text-input'
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTodo}>ADD ITEM</button>
      </div>
    </div>
  );
}
