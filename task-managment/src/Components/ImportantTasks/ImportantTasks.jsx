import React, { useEffect, useState } from 'react';
import './ImportantTasks.css'
import { useAuth } from '../context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';

const ImportantTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/tasks?userId=${user._id}&status=important`)
        .then((response) => {
          setTasks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
          setLoading(false);
          toast.error('Failed to load tasks');
        });
    }
  }, [user]);
  

  return (
    <div><h1>Important Tasks</h1>
    <div className="task-cards">
      
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        tasks.map((task) => (
          <Card key={task._id} className="task-card">
            <Card.Body>
              <Card.Title className='task-title'>{task.title}</Card.Title>
              <Card.Text className='task-description'>{task.description}</Card.Text>
              <div className='task-meta'>
                <span className="task-time">🕒 {new Date(task.createdAt).toLocaleTimeString()}</span>
                <span className='task-type important'>Important</span>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div></div>
  )
}

export default ImportantTasks