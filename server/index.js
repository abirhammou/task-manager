const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SignupModel = require('./models/Signup'); 
const Task = require('./models/Task');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/task-manager")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

    app.post("/login", (req, res) => {
        const { email, password } = req.body;
        SignupModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        res.json({ success: true, user });
                    } else {
                        res.json({ success: false, message: "The password is incorrect" });
                    }
                } else {
                    res.json({ success: false, message: "No record existed!" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ success: false, message: "Internal server error" });
            });
    });
    

    app.post('/register', (req, res) => {
        console.log('Received data:', req.body); 
        SignupModel.create(req.body)
        .then(user => {
            console.log('User created:', user); 
            res.json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        });
    });
    
    app.post('/tasks', (req, res) => {
        const { title, description, status, userId } = req.body;
    
        if (!userId) {
            return res.status(400).json({ message: 'You must be logged in to add a task' });
        }
        SignupModel.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(400).json({ message: 'User not found, please log in again' });
                }
                const newTask = new Task({
                    title,
                    description,
                    status,
                    userId,
                });
    
                newTask.save()
                    .then(task => res.json(task))
                    .catch(err => res.status(500).json({ message: 'Error adding task', error: err }));
            })
            .catch(err => res.status(500).json({ message: 'Server error', error: err }));
    });

    app.get('/tasks', (req, res) => {
        const { userId, status } = req.query;
      
        if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
        }
      
        const filter = { userId };
      
        if (status) {
          filter.status = status;  
        }
      
        Task.find(filter)
          .then(tasks => {
            res.json(tasks); 
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching tasks', error: err });
          });
      });
      
      app.delete('/tasks/:taskId', (req, res) => {
        const { taskId } = req.params;
      
        Task.findByIdAndDelete(taskId)
          .then((deletedTask) => {
            if (deletedTask) {
              res.json({ message: 'Task deleted successfully' });
            } else {
              res.status(404).json({ message: 'Task not found' });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: 'Error deleting task', error });
          });
      });
    
      // Update Task
app.put('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    // Ensure all fields are provided
    if (!title || !description || !status) {
        return res.status(400).json({ message: 'All fields (title, description, status) are required.' });
    }

    Task.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true }  
        )
        .then((updatedTask) => {
            if (updatedTask) {
                res.json(updatedTask);  
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error updating task', error });
        });
    });

app.listen(3001, () => {
    console.log("Server is running");
});
