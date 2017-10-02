## Instructions

In this lab, you will creating a form that adds Scuber employees.  It also allows us to clear the list of employees upon a click to the "Clear Employee List" link.  We will build up to this functionality with small functions, so read the tests carefully.

You will find your tests underneath the HTML after you run `learn-test`.  We'll be testing against this with the `index.html` document, but you should still write your code in `index.js`.  Write the following functions:



+ `addNewTrOnClick()`: This function adds functionality such that when the submit button "Add customer" is clicked, the name and revenue of the customer is retrieved from the respective fields in the form and the values are added to a new row customer table.  After the click to "Add customer", the input fields should be cleared.
+ `removeTrOnClick()`: This function adds functionality such that when the button with an X in the customer row is clicked, it removes the respective row from the page.  This functionality should work with rows already on the `index.html` when the document is loaded, and those added afterwards.
+ `editOnDblClick()`: This function adds functionality so that when a row cell is double clicked on, the cell is replaced with an input.  Javascript has `dblclick` event that can be listened for, just like a `click` event.
+ `removeTdInputOnFocusOut`: This function adds functionality so that when the newly added input is no longer focused on (via a tab or a mouse click), the newly added input is replaced with the value updated from the input for editing.  Javascript has a `blur` event, that can be listened to on an input for this functionality.
+ `customerNames`: This function returns an array of customer names, retrieved from the data in the table.
+ `findByName`: This function returns an array of customer names that match the string passed as an argument to the function.
+ `displayMatchingCustomerOnSearch`: This function adds functionality so that when the "Filter Customers" button is clicked, only the customers matching the search criteria are displayed in the table.

Have fun, and good luck!

## Resources

- [dblclick](https://developer.mozilla.org/en-US/docs/Web/Events/dblclick)
- [blur](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur)
