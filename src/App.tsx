import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const addTask = (name: string): void => {
    setTasks((tasks) => [...tasks, { name, done: false }]);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                  ref={taskInput}
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>

          {tasks.map((task: ITask, i: number) => {
            return (
              <div key={i} className="card card-body mt-2">
                <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>
                  {task.name}
                </h2>
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {task.done ? '✓' : '✗'}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTask(i)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
