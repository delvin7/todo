// src/components/TodoList.js
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setTasks(tasksList);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "tasks"), { task: newTask });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  const updateTask = async (id, updatedTask) => {
    await updateDoc(doc(db, "tasks", id), { task: updatedTask });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">My To-Do List</h2>
        <form onSubmit={addTask} className="mb-4 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            className="w-full px-4 py-2 border rounded-l-md"
          />
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-r-md">
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center">
              <input
                type="text"
                defaultValue={task.task}
                onBlur={(e) => updateTask(task.id, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
