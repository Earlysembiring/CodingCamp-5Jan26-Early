const tasks = [];
let currentFilter = 'all';

function addTask() {
    const textEl = document.getElementById('input-box');
    const dateEl = document.getElementById('date-input');
    const text = textEl.value.trim();
    const date = dateEl.value;
    if (!text) return;
    tasks.push({ id: Date.now(), text, date, status: 'active' });
    textEl.value = '';
    dateEl.value = '';
    render();
}

function toggleStatus(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.status = task.status === 'active' ? 'done' : 'active';
    render();
}

function deleteTask(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx > -1) {
        tasks.splice(idx, 1);
        render();
    }
}

function deleteAll() {
    tasks.length = 0;
    render();
}

function onFilterChange() {
    const select = document.getElementById('filter-select');
    currentFilter = select.value;
    render();
}

function getVisibleTasks() {
    if (currentFilter === 'active') return tasks.filter(t => t.status === 'active');
    if (currentFilter === 'done') return tasks.filter(t => t.status === 'done');
    return tasks;
}

function render() {
    const tbody = document.getElementById('list-container');
    tbody.innerHTML = '';
    const visible = getVisibleTasks();
    if (visible.length === 0) {
        const tr = document.createElement('tr');
        tr.className = 'empty-row';
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'No task found';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }
    visible.forEach(task => {
        const tr = document.createElement('tr');
        tr.className = task.status === 'done' ? 'row-done' : '';

        const tdTask = document.createElement('td');
        tdTask.textContent = task.text;

        const tdDate = document.createElement('td');
        tdDate.textContent = task.date || '-';

        const tdStatus = document.createElement('td');
        tdStatus.textContent = task.status === 'done' ? 'Done' : 'Active';

        const tdActions = document.createElement('td');
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.status === 'done' ? 'Undo' : 'Done';
        toggleBtn.onclick = () => toggleStatus(task.id);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTask(task.id);
        tdActions.appendChild(toggleBtn);
        tdActions.appendChild(delBtn);

        tr.appendChild(tdTask);
        tr.appendChild(tdDate);
        tr.appendChild(tdStatus);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    });
}

// initial render on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filter-select').value = currentFilter;
    render();
});
