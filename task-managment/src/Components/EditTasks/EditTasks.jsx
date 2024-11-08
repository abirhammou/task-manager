import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { toast } from 'react-toastify';
import axios from 'axios';
import './EditTasks.css'; 

const EditTasks = ({ show, handleClose, taskId, onTaskUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskId) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/tasks/${taskId}`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching task:', error);
          setLoading(false);
          toast.error('Failed to load task data');
        });
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedTask = {
      title,
      description,
      status,
    };
  
    setLoading(true);
  
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${taskId}`, updatedTask);
  
      if (response.status === 200 && response.data) {
        toast.success('Task updated successfully!');
        onTaskUpdated(response.data); 
        handleClose(); 
      } else {
        toast.error('Failed to update task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };
  

  Modal.setAppElement('#root'); 

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Edit Task"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Edit Task</h2>
        <button onClick={handleClose} className="modal-close-btn">X</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
            <option value="important">Important</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </Modal>
  );
};

export default EditTasks;
