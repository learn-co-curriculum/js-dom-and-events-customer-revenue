function preventRefreshOnSubmit(){
    let forms = document.querySelectorAll('form')
    forms.forEach(function(form){
      form.addEventListener('submit', function(event){
        event.preventDefault()
      })
    })
}

preventRefreshOnSubmit()

function addNewTrOnClick(){


  let submit = document.querySelector('input[type="submit"]'  )
  let customerTable = document.querySelector('table')
  let customerNameInput = document.querySelector('input[name="name"]')
  let customerRevenueInput = document.querySelector('input[name="revenue"]')

  submit.addEventListener('click', function(event){
    let name = customerNameInput.value
    let revenue = customerRevenueInput.value
    
    let tbody = document.querySelector('tbody')
    tbody.insertAdjacentHTML('beforeend', `<tr><td>${name}</td> <td>${revenue}</td><td><button>X</button></td></tr>`)

    customerNameInput.value = ''
    customerRevenueInput.value = ''
  })
}

function removeTrOnClick(){
  let customerTable = document.querySelector('table')
  customerTable.addEventListener('click', function(event){
    if(event.target.tagName == 'BUTTON'){
      event.target.closest('tr').remove()
    }
  })
}

function editOnDblClick(){
  let table = document.querySelector('table')
  table.addEventListener('dblclick', function(event){
    if(event.target.tagName !== 'BUTTON'){
      let input = `<input type='text' value=''  />`

      event.target.innerHTML = input

    }
  })
}

function removeTdInputOnFocusOut(){
  let table = document.querySelector('table')
  table.addEventListener('focusout', function(event){
    console.log('blur event')
    if(event.target.tagName == 'INPUT'){
      console.log('blur on input')
      let val = event.target.value
      event.target.closest('td').innerHTML = `${val}`
    }
  })
}


function customers(){
  let customerTable = document.querySelector('table')
  let nameRows = customerTable.querySelectorAll('tr:not(:first-child)')

  let names = Array.from(nameRows).map(function(tr){
    return {name: tr.querySelectorAll('td')[0].innerText, revenue: tr.querySelectorAll('td')[1].innerText}
  })
  return names;
}

function findByName(name){
  return customers().filter(function(customer){
    return customer.name.toLowerCase() == name.toLowerCase()
  })
}

function displayMatchingCustomerOnSearch(){
  let searchForm = document.querySelectorAll('form')[1]
  let searchTable = document.querySelectorAll('table')[1]
  let nameFilterInput = searchForm.querySelectorAll('input')[0]
  let revenueFilterInput = searchForm.querySelectorAll('input')[1]

  searchForm.addEventListener('submit', function(){
    let name = nameFilterInput.value
    let customers = findByName(name)
    let trs = customers.map((customer) => {
      return `<tr><td>${customer.name}</td> <td>${customer.revenue}</td></tr>`
    }).join(' ')

    searchTable.insertAdjacentHTML('beforeend', trs)
  })
}
