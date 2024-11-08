import React, { useState } from 'react';
import Modal from 'react-modal';  // Import react-modal
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddTasks.css';

const AddTask = ({ show, handleClose, onTaskAdded }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to add a task');
      return;
    }

    const newTask = {
      title,
      description,
      status,
      userId: user._id,  
    };

    setLoading(true);

    try {
        const response = await axios.post('http://localhost:3001/tasks', newTask);
  
        if (response.status === 200 && response.data) {
          toast.success('Task created successfully!');
          onTaskAdded();  
          handleClose();   
        } else {
          toast.error('Failed to add task. Please try again.');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      } finally {
        setLoading(false);
      }
    };

  Modal.setAppElement('#root');  

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Add New Task"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Add New Task</h2>
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
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </Modal>
  );
};

export default AddTask;
