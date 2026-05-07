
// Стан додатку (state)
const state = {
    tasks: JSON.parse(localStorage.getItem('tasksData')) || [], 
    editingId: null, // id запису
    searchQuery: '', // рядок пошуку
    filterPriority: 'all' // поточний фільтр
};

// Рендер
render();


// Сабміт форми 
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = readForm();

    if (validate(formData)) {
        if (state.editingId !== null) {
            updateItem(state.editingId, formData); // оновлюємо існуючий
            state.editingId = null;
            document.getElementById('submitBtn').innerText = "Зберегти запис";
        } else {
            addItem(formData); // додаємо новий
        }
        document.getElementById('taskForm').reset();
    }
});

// Пошук
document.getElementById('searchInput').addEventListener('input', function(e) {
    state.searchQuery = e.target.value.toLowerCase();
    render();
});

// Фільтр за пріоритетом
document.getElementById('priorityFilter').addEventListener('change', function(e) {
    state.filterPriority = e.target.value;
    render();
});

// Делегування подій для кнопок в таблиці
document.getElementById('tableBody').addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const action = e.target.getAttribute('data-action');
        const id = Number(e.target.getAttribute('data-id'));
        
        if (action === 'delete') deleteItem(id);
        if (action === 'edit') editItem(id);
    }
});



// Зчитування даних з форми
function readForm() {
    return {
        title: document.getElementById('title').value.trim(),
        email: document.getElementById('email').value.trim(),
        priority: Number(document.getElementById('priority').value),
        date: document.getElementById('date').value
    };
}

// Валідація
function validate(data) {
    let isValid = true;
    
    // Очищ
    document.querySelectorAll('input').forEach(input => input.classList.remove('input-error'));
    document.querySelectorAll('.error-msg').forEach(span => span.innerText = '');

    if (!data.title) { showError('title', 'Введіть назву'); isValid = false; }
    if (!data.email || !data.email.includes('@')) { showError('email', 'Некоректний email'); isValid = false; }
    if (!data.priority || data.priority < 1 || data.priority > 10) { showError('priority', 'Від 1 до 10'); isValid = false; }
    if (!data.date) { showError('date', 'Оберіть дату'); isValid = false; }

    return isValid;
}

// Вивід помилки під інпутом
function showError(fieldId, msg) {
    document.getElementById(fieldId).classList.add('input-error');
    document.getElementById('error-' + fieldId).innerText = msg;
}

// Збереження в пам'ять браузера
function saveToStorage() {
    localStorage.setItem('tasksData', JSON.stringify(state.tasks));
}

// Додавання завдання
function addItem(data) {
    const newItem = { id: Date.now(), ...data };
    state.tasks.push(newItem);
    saveToStorage();
    render();
}

// Видалення завдання
function deleteItem(id) {
    state.tasks = state.tasks.filter(task => task.id !== id);
    saveToStorage();
    render();
}

// Підготовка до редагування 
function editItem(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('title').value = task.title;
    document.getElementById('email').value = task.email;
    document.getElementById('priority').value = task.priority;
    document.getElementById('date').value = task.date;

    state.editingId = id; 
    document.getElementById('submitBtn').innerText = "Оновити запис";
}

// Оновлення відредагованого запису
function updateItem(id, data) {
    const index = state.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        state.tasks[index] = { id: id, ...data };
        saveToStorage();
        render();
    }
}

// Відмальовка таблиці
function render() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = ''; 

    // Фільтр масиву 
    const filteredTasks = state.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(state.searchQuery);
        
        let matchesFilter = true