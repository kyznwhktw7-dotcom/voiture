// script.js - to-do list with localStorage
const STORAGE_KEY = 'todo-app-tasks'
let tasks = []

const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')
const clearCompletedBtn = document.getElementById('clear-completed')
const clearAllBtn = document.getElementById('clear-all')

// Load tasks from localStorage
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    tasks = raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Impossible de charger les tâches:', e)
    tasks = []
  }
}

// Save tasks to localStorage
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

// Create a DOM node for a task
function renderTask(task) {
  const li = document.createElement('li')
  li.dataset.id = task.id
  if (task.done) li.classList.add('completed')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = task.done
  checkbox.addEventListener('change', () => {
    task.done = checkbox.checked
    save()
    render()
  })

  const label = document.createElement('span')
  label.className = 'todo-label'
  label.textContent = task.text
  label.title = 'Double-cliquez pour éditer'
  label.addEventListener('dblclick', () => startEdit(task, label))

  const actions = document.createElement('div')
  actions.className = 'todo-actions'

  const editBtn = document.createElement('button')
  editBtn.title = 'Éditer'
  editBtn.textContent = '✏️'
  editBtn.addEventListener('click', () => startEdit(task, label))

  const delBtn = document.createElement('button')
  delBtn.title = 'Supprimer'
  delBtn.textContent = '🗑️'
  delBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id)
    save()
    render()
  })

  actions.appendChild(editBtn)
  actions.appendChild(delBtn)

  li.appendChild(checkbox)
  li.appendChild(label)
  li.appendChild(actions)
  return li
}

function startEdit(task, labelEl) {
  const input = document.createElement('input')
  input.type = 'text'
  input.value = task.text
  input.className = 'edit-input'
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finishEdit()
    if (e.key === 'Escape') render()
  })
  input.addEventListener('blur', finishEdit)

  function finishEdit() {
    const v = input.value.trim()
    if (v) {
      task.text = v
      save()
    } else {
      // empty -> delete
      tasks = tasks.filter(t => t.id !== task.id)
      save()
    }
    render()
  }

  labelEl.replaceWith(input)
  input.focus()
  input.select()
}

function render() {
  list.innerHTML = ''
  if (tasks.length === 0) {
    const empty = document.createElement('p')
    empty.textContent = "Aucune tâche — ajoutez-en une !"
    empty.className = 'hint'
    list.appendChild(empty)
    return
  }
  tasks.forEach(t => list.appendChild(renderTask(t)))
}

function addTask(text) {
  const task = { id: Date.now().toString(), text: text.trim(), done: false }
  tasks.unshift(task)
  save()
  render()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const v = input.value.trim()
  if (!v) return
  addTask(v)
  input.value = ''
})

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done)
  save()
  render()
})

clearAllBtn.addEventListener('click', () => {
  if (!confirm('Supprimer toutes les tâches ?')) return
  tasks = []
  save()
  render()
})

// Initialize
load()
render()
