let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById("taskinput");
    const text = taskInput.value.trim();  // Fix: value, not ariaValueMax
    
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStatement();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;  // Fix: completed instead of complete
    updateTasksList();
    updateStatement();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);  // Fix: correct syntax
    updateTasksList();
    updateStatement();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskinput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTasksList();
    updateStatement();
    saveTasks();
};

const updateStatement = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById("progress");
    
    progressBar.style.width = `${progress}%`;  // Fix: width instead of widows
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;  // Fix: no jQuery needed

    if (tasks.length && completeTasks === totalTasks) {
        blaskConfetti();
    }
};

const updateTasksList = () => {
    const TasksList = document.getElementById('TasksList');  // Fix: should reference TasksList in HTML
    TasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} /> 
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="/image/edit.png" onClick="editTask(${index})" />
                    <img src="/image/garbage.png" onClick="deleteTask(${index})" />
                </div>
            </div>`;

        listItem.querySelector('.checkbox').addEventListener("change", () => toggleTaskComplete(index));

        TasksList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});



// Animation

const blaskConfetti = ()=> {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}