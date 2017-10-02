const expect = chai.expect;

describe('index', () => {
  beforeEach(function(){
    preventRefreshOnSubmit()
  })
  afterEach(function(){
    let form = `
    <h1> Admin Page of Scuber </h1>
    <form class="" action="/customers" method="post"  >
      <label for=""> Customer Name</label>
      <input type="text" name="name" value="" />
      <label for=""> Customer Revenue</label>
      <input type="text" name="revenue" value="" />
      <input type="submit" name="" value="Add customer" />
    </form>
    `.trim()
    document.querySelector('main').innerHTML = form;
    let table = `<table> <tr> <th>Name</th> <th>Revenue</th> </tr> <tr> <td>Bobby</td> <td>4000</td> <td> <button>X</button> </td> </tr> </table> `
    document.querySelector('main').insertAdjacentHTML('beforeend', table)
    let searchForm = `<form action="/customers" method="get">
      <label for="">Name Filter</label>
      <input type="text" name="name" value="" />
      <label for="">Revenue Filter </label>
      <input type="text" name="revenue" value="" />
      <input type="submit" name="" value="Filter Customers" />
    </form>`.trim()
    document.querySelector('main').insertAdjacentHTML('beforeend', searchForm)
    let searchTable = `<table>
      <h3>Matching Customers</h3>
    </table>`.trim()
    document.querySelector('main').insertAdjacentHTML('beforeend', searchTable)
    preventRefreshOnSubmit()
    if(window.removeTrOnClick){
      removeTrOnClick()
    }
    if(window.addNewTrOnClick){
      addNewTrOnClick()
    }
    if(window.editOnDblClick){
      editOnDblClick()
    }
    if(window.removeTdInputOnFocusOut){
      removeTdInputOnFocusOut()
    }
    if(window.displayMatchingCustomerOnSearch){
      displayMatchingCustomerOnSearch()
    }
  })

  describe('addNewTrOnClick()', () => {
    let submit;
    let event;
    let customerNameInput;
    let customerRevenueInput;
    let customerTable;

    beforeEach(function(){
      submit = document.querySelector('input[type="submit"]')
      event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      customerNameInput = document.querySelector('input[name="name"]')
      customerRevenueInput = document.querySelector('input[name="revenue"]')
      customerTable = document.querySelector('table')
    })

    it('adds the employee name as a tr element on click', () => {
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)
      setTimeout(function(){
        expect(customerTable.innerHTML).to.include('Fred')
        expect(customerTable.innerHTML).to.include(3000)
      }, 500)
    })

    it('adds a button with an X as the last "td" of each employee row', () => {
      // addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)
      expect(document.querySelectorAll('tr button').length).to.equal(2)
    })

    it('does not add a new tbody', () => {

      // addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)
      expect(document.querySelectorAll('tbody').length).to.equal(1)
    })

    it('clears the input value', () => {
      // addNewTrOnClick()
      submit.dispatchEvent(event)
      expect(customerNameInput.value).to.equal('')
      expect(customerRevenueInput.value).to.equal('')
    })
  })

  describe('removeTrOnClick', function(){
    let submit;
    let event;
    let customerNameInput;
    let customerRevenueInput;
    let customerTable;
    let bobbyTr;

    beforeEach(function(){
      submit = document.querySelector('input[type="submit"]')
      event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });

      customerNameInput = document.querySelector('input[name="name"]')
      customerRevenueInput = document.querySelector('input[name="revenue"]')
      customerTable = document.querySelector('table')
      bobbyTr = document.querySelectorAll('tr')[1]
    })

    it('removes the Tr that exists on page load when the X is clicked', function(){
      let deleteButton = bobbyTr.querySelector('button')
      expect(customerTable.querySelectorAll('tr').length).to.equal(2)
      // removeTrOnClick()
      deleteButton.dispatchEvent(event)
      expect(customerTable.querySelectorAll('tr').length).to.equal(1)
    })

    it('removes the Tr that DOES NOT exist on page load when the X is clicked', function(){
      // addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)
      let fredTr = document.querySelectorAll('tr')[2]
      let deleteButton = fredTr.querySelector('button')
      expect(customerTable.querySelectorAll('tr').length).to.equal(3)
      // removeTrOnClick()
      deleteButton.dispatchEvent(event)
      expect(customerTable.querySelectorAll('tr').length).to.equal(2)
    })
  })

  describe('editOnDblClick', function(){
    let submit;
    let dblClickEvent;
    let customerNameInput;
    let customerRevenueInput;
    let customerTable;
    let bobTr;
    let bobTd;
    let revenueTd;

    beforeEach(function(){
      submit = document.querySelector('input[type="submit"]')
      dblClickEvent = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });

      customerNameInput = document.querySelector('input[name="name"]')
      customerRevenueInput = document.querySelector('input[name="revenue"]')
      customerTable = document.querySelector('table')
      bobTr = document.querySelectorAll('tr')[1]
      bobTd = bobTr.querySelector('td')
      revenueTd = bobTr.querySelectorAll('td')[1]
    })

    it('replaces text of a name Td with an input when double clicked on', function(){
      expect(bobTr.querySelectorAll('td').length).to.equal(3)
      expect(bobTr.querySelectorAll('input').length).to.equal(0)
      // editOnDblClick()
      bobTd.dispatchEvent(dblClickEvent)
      expect(bobTr.querySelectorAll('input').length).to.equal(1)
    })

    it('replaces text of a revenue Td with an input when double clicked on', function(){
      expect(bobTr.querySelectorAll('td').length).to.equal(3)
      expect(bobTr.querySelectorAll('input').length).to.equal(0)
      // editOnDblClick()
      revenueTd.dispatchEvent(dblClickEvent)
      expect(bobTr.querySelectorAll('input').length).to.equal(1)
    })

    it('replaces with an input on dblclick on new Tds added to the page', function(){
      let clickEvent = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      // addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(clickEvent)
      expect(bobTr.querySelectorAll('td').length).to.equal(3)
      expect(bobTr.querySelectorAll('input').length).to.equal(0)
      // editOnDblClick()
      revenueTd.dispatchEvent(dblClickEvent)
      expect(bobTr.querySelectorAll('input').length).to.equal(1)
    })
  })

  describe('removeTdInputOnFocusOut', function(){

    let submit;
    let dblClickEvent;
    let customerNameInput;
    let customerRevenueInput;
    let customerTable;
    let bobTr;
    let bobTd;
    let revenueTd;

    beforeEach(function(){
      submit = document.querySelector('input[type="submit"]')
      dblClickEvent = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });

      customerNameInput = document.querySelector('input[name="name"]')
      customerRevenueInput = document.querySelector('input[name="revenue"]')
      customerTable = document.querySelector('table')
      bobTr = document.querySelectorAll('tr')[1]
      bobTd = bobTr.querySelector('td')
      revenueTd = bobTr.querySelectorAll('td')[1]
    })

    it('removes the input when clicked away from (that is, on a blur event)', function(){
      let blurEvent = new FocusEvent('focusout', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      // editOnDblClick()
      // removeTdInputOnFocusOut()
      revenueTd.dispatchEvent(dblClickEvent)
      expect(revenueTd.querySelectorAll('input').length).to.equal(1)
      revenueTd.querySelector('input').dispatchEvent(blurEvent)
      expect(revenueTd.querySelectorAll('input').length).to.equal(0)
    })

    it('leaves the td with the text of the input', function(){
      let blurEvent = new FocusEvent('focusout', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });

      // editOnDblClick()
      // removeTdInputOnFocusOut()
      revenueTd.dispatchEvent(dblClickEvent)
      expect(revenueTd.querySelectorAll('input').length).to.equal(1)

      revenueTd.querySelector('input').value = '20'
      revenueTd.querySelector('input').dispatchEvent(blurEvent)
      expect(revenueTd.innerText).to.equal("20")
    })
  })

  describe('customerNames', function(){
    let customerNameInput;
    let customerRevenueInput;
    let submit;
    beforeEach(function(){
      customerNameInput = document.querySelector('input[name="name"]')
      customerRevenueInput = document.querySelector('input[name="revenue"]')
      submit = document.querySelector('input[type="submit"]')
      event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)
    })

    it('returns a list of customer names', function(){
      expect(customers()[0]).to.deep.equal({name: "Bobby", revenue: "4000"})
      expect(customers()[1]).to.deep.equal({name: "Fred", revenue: "3000"})
    })
  })

  describe('findByName', function(){
    let customerNameInput;
    let customerRevenueInput;
    let submit;
    let inputForm

    beforeEach(function(){
      inputForm = document.querySelectorAll('form')[0]
      customerNameInput = inputForm.querySelector('input[name="name"]')
      customerRevenueInput = inputForm.querySelector('input[name="revenue"]')
      submit = inputForm.querySelector('input[type="submit"]')
      event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)
    })

    it('finds the customers with the matching name', function(){
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 6000
      submit.dispatchEvent(event)
      expect(findByName("Fred")[0]).to.deep.equal({name: "Fred", revenue: "3000"})
      expect(findByName("Fred")[1]).to.deep.equal({name: "Fred", revenue: "6000"})
    })

    it('returns an empty array when no matching customers', function(){
      expect(findByName('Sally')).to.eql([])
    })
  })

  describe('displayMatchingCustomerOnSearch', function(){
    let customerNameSearchInput;
    let customerRevenueSearchInput;
    let submit;
    let searchTable
    let inputForm;
    let customerNameInput;
    let customerRevenueInput;

    beforeEach(function(){
      customerNameInput = document.querySelector('input[name="name"]')
      customerRevenueInput = document.querySelector('input[name="revenue"]')
      submit = document.querySelector('input[type="submit"]')
      event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000
      submit.dispatchEvent(event)

      searchTable = document.querySelectorAll('table')[1]
      searchForm = document.querySelectorAll('form')[1]
      inputForm = document.querySelectorAll('form')[0]
      customerNameSearchInput = inputForm.querySelector('input[name="name"]')
      customerRevenueSearchInput = inputForm.querySelector('input[name="revenue"]')

      customerNameSearchInput = searchForm.querySelector('input[name="name"]')
      customerRevenueSearchInput = searchForm.querySelector('input[name="revenue"]')
      inputSubmit = inputForm.querySelector('input[type="submit"]')

      event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      addNewTrOnClick()
      customerNameInput.value = 'Fred'
      customerRevenueInput.value = 3000

      inputSubmit.dispatchEvent(event)
    })

    it('attaches an event listener to display the matching customers below when the form is submitted', function(){
      customerNameInput.value = 'Fred'
      displayMatchingCustomerOnSearch()

      expect(searchTable.innerHTML).to.include('Fred')
    })
  })
})
