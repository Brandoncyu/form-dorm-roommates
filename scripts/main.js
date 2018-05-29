const data = require('./roommates/data')
const roommates = require('./roommates/render')

//this exports each of the cards
const roommatesContainer = document.querySelector('#roommates')
roommates.showAll(roommatesContainer)

//this is the function itself of deleting
const deleteRoommate = (event) => {
  //this sets the index attribute to each item
  const index = event.target.getAttribute('data-id')
  //this splices out the card you want to delete out of the array.
  data.splice(index, 1)

  //this re-renders the cards
  roommates.showAll(roommatesContainer)

  //this puts puts the delete button back on the re-rendered set of cards.
  const deleteButtons = Array.from(document.querySelectorAll('.roommate-delete-button'))
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', deleteRoommate)
  })
}

//this adds the function of deleting each card in its inital stage.
const deleteButtons = Array.from(document.querySelectorAll('.roommate-delete-button'))
deleteButtons.forEach(btn => {
  btn.addEventListener('click', deleteRoommate)
})


//This sets the new roommate button to a vairable.
const newRoommateButton = document.querySelector('#new-roommate-button')
//This adds an event click to the new roommate button.
newRoommateButton.addEventListener('click', (event) => {
  //after you click it, this prevents the page from loading to the top.
  event.preventDefault()

  //that loads the form
  const sidebar = document.querySelector('#sidebar')
  roommates.showNewForm(sidebar)

  //this sets the submit button equal to the variable submitButton
  const submitButton = document.querySelector('#new-roommate-form')

  //Since we don't have a server, this does prevents information from being submitted towards towards one.
  submitButton.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = event.target.username;
    const avatar = event.target.avatar;
    const faction = event.target.faction;
    const street = event.target.street;
    const suite = event.target.suite;
    const city = event.target.city;
    const inputZip = event.target.inputZip;

    data.push(
      {'username': username.value,
      'avatar': avatar.value,
      'faction': faction.value,
      'address': {
        'street': street.value,
        'suite': suite.value,
        'city': city.value,
        'zipcode': inputZip.value
      }
    })
    roommates.showAll(roommatesContainer)
  })
})

const updateRoommate = (event) =>{
  let index = event.target.getAttribute('data-id')
  const object = data[index]
  let address = object.address
  let username = object.username
  let avatar = object.avatar
  let faction = object.faction
  let street = address.street
  let suite = address.suite
  let city = address.city
  let zipcode = address.zipcode

  const sidebar = document.querySelector('#sidebar')

  roommates.showNewForm(sidebar)
  sidebar.querySelector('.h5').innerHTML = 'Update Roomate'
  sidebar.querySelector('#username').value = username
  sidebar.querySelector('#avatar').value = avatar
  sidebar.querySelector('#faction').value = faction
  sidebar.querySelector('#street').value = street
  sidebar.querySelector('#suite').value = suite
  sidebar.querySelector('#city').value = city
  sidebar.querySelector('#inputZip').value = zipcode



  const newSubmitButton = document.querySelector('#new-roommate-form')

  //Since we don't have a server, this does prevents information from being submitted towards towards one.
  newSubmitButton.addEventListener('submit', (event) => {
    event.preventDefault()

    object.username = sidebar.querySelector('#username').value
    object.avatar = sidebar.querySelector('#avatar').value
    object.faction = sidebar.querySelector('#faction').value
    object.address.street = sidebar.querySelector('#street').value
    object.address.suite = sidebar.querySelector('#suite').value
    object.address.city = sidebar.querySelector('#city').value
    object.address.zipcode = sidebar.querySelector('#inputZip').value

    console.log(object)
    roommates.showAll(roommatesContainer)
  })



  const updateButtons = Array.from(document.querySelectorAll('.roommate-edit-button'))
  updateButtons.forEach(btn => {
    btn.addEventListener('click', updateRoommate)
  })
}

const updateButtons = Array.from(document.querySelectorAll('.roommate-edit-button'))
updateButtons.forEach(btn => {
  btn.addEventListener('click', updateRoommate)
})
