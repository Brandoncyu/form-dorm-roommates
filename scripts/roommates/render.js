const data = require('./data')
const templates = require('./templates')

function showAll (container) {
  const cards = data.map((roommate, index) => templates.card(roommate, index)).join('')
  container.innerHTML = cards
}

function showNewForm (container) {
  container.innerHTML = templates.newRoommate()
}

module.exports = {
  showAll, showNewForm
}
