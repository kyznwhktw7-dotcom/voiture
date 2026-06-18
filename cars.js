// cars.js - charge index.json et affiche les voitures
const container = document.getElementById('cars')
const countEl = document.getElementById('count')
const searchInput = document.getElementById('search')
let data = {}

function render(filter = ''){
  container.innerHTML = ''
  const values = Object.entries(data).map(([id, item])=>({id,...item}))
    .filter(it => it.name.toLowerCase().includes(filter.toLowerCase()))

  countEl.textContent = `${values.length} voiture(s)`
  if(values.length === 0){
    container.innerHTML = '<p class="hint">Aucune voiture trouvée.</p>'
    return
  }

  values.forEach(item => {
    const el = document.createElement('div')
    el.className = 'car-card'
    el.innerHTML = `<h3>${escapeHtml(item.name)}</h3><p>Version: ${escapeHtml(item.ver)}</p><p class="muted">ID: ${escapeHtml(item.id)}</p>`
    container.appendChild(el)
  })
}

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

fetch('index.json')
  .then(r=>{
    if(!r.ok) throw new Error('HTTP '+r.status)
    return r.json()
  })
  .then(j=>{ data = j; render(); })
  .catch(err=>{ console.error('Erreur chargement index.json', err); countEl.textContent = 'Impossible de charger les données.' })

searchInput.addEventListener('input', e => render(e.target.value))
