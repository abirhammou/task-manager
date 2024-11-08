import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './AllTasks.css';
import { Button } from 'react-bootstrap';
import AddTask from '../AddTasks/AddTasks';
import { useAuth } from '../context/ContextProvider';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditTasks from '../EditTasks/EditTasks';

const AllTasks = () => {
  const { user } = useAuth();

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleOpenModal = () => setShowAddTaskModal(true);
  const handleCloseModal = () => setShowAddTaskModal(false);

  const handleOpenEditModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowEditTaskModal(true);
  };

  const handleCloseEditModal = () => setShowEditTaskModal(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/tasks?userId=${user._id}`)
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

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/tasks/${taskId}`);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); 
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task!');
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <div className='tasks'>
      {user ? (
        <h1 className='welcome-title'>Welcome, {user.name}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}

      <div className="tasks">
        <Button onClick={handleOpenModal}><Plus /></Button>

        <AddTask show={showAddTaskModal} handleClose={handleCloseModal} />

        <EditTasks
          show={showEditTaskModal}
          handleClose={handleCloseEditModal}
          taskId={selectedTaskId}
          onTaskUpdated={handleTaskUpdated}  // Pass the update handler here
        />
      </div>

      <div className="task-cards">
        {loading ? (
          <h3>Loading tasks...</h3>
        ) : (
          tasks.length > 0 ? (
            tasks.map((task) => (
              <Card key={task._id} className="task-card">
                <Card.Body>
                  <div className='task-header'>
                    <Card.Title className="task-title">{task.title}</Card.Title>
                    <div className='edit'>
                      <Pencil
                        className='edit-icon'
                        color="#4F46E5"
                        onClick={() => handleOpenEditModal(task._id)} 
                      />
                      <Trash2
                        className='edit-icon'
                        color="#fa0000"
                        onClick={() => handleDeleteTask(task._id)}
                      />
                    </div>
                  </div>
                  <Card.Text className="task-description">
                    {task.description}
                  </Card.Text>
                  <div className="task-meta">
                    <span className="task-time">🕒 {new Date(task.createdAt).toLocaleTimeString()}</span>
                    <span className={`task-type ${task.status === 'complete' ? 'completed' : ''}`}>
                      {task.status === 'complete' ? '✅ Completed' : '⏳ Incomplete'}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h3>No tasks available</h3>
          )
        )}
      </div>
    </div>
  );
};

export default AllTasks;
