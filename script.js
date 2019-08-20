// Create needed constants
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
const list = document.querySelector('ul');

const clientNameInput = document.querySelector('#clientName');
const invoiceNumberInput = document.querySelector('#invoiceNumber');
const paymentMethodInput = document.querySelector('#paymentMethod');

const paymentDateInput = document.querySelector('#paymentDate');
const paiedByInput = document.querySelector('#paiedBy');
const amountInput = document.querySelector('#amount');

const summaryInput = document.querySelector('#summary');


// Create an instance of a db object for us to store the open database in
let db;
var totalAmount = Number("0");


console.log("FORM");
console.log(form);

console.log("UL");
console.log(list);

document.getElementById("clientName").focus();




window.onload = function() {
  // Open our database; it is created if it doesn't already exist
  // (see onupgradeneeded below)
  let request = window.indexedDB.open('shearim_db', 1);

  // onerror handler signifies that the database didn't open successfully
  request.onerror = function() {
    console.log('Database failed to open');
  };

  // onsuccess handler signifies that the database opened successfully
  request.onsuccess = function() {
    console.log('Database opened succesfully');

    // Store the opened database object in the db variable. This is used a lot below
    db = request.result;

    // Run the displayData() function to display the notes already in the IDB
    displayData();
  };



  // Setup the database tables if this has not already been done
  request.onupgradeneeded = function(e) {

    // Grab a reference to the opened database
    let db = e.target.result;

    // Create an objectStore to store our notes in (basically like a single table)
    // including a auto-incrementing key
    let objectStore = db.createObjectStore('shearim_os', { keyPath: 'id', autoIncrement:true });

    // Define what data items the objectStore will contain
    objectStore.createIndex('clientName', 'clientName', { unique: false });
    objectStore.createIndex('invoiceNumber', 'invoiceNumber', { unique: false });
    objectStore.createIndex('paymentMethod', 'paymentMethod', { unique: false });

    objectStore.createIndex('paymentDate', 'paymentDate', { unique: false });
    objectStore.createIndex('paiedBy', 'paiedBy', { unique: false });
    objectStore.createIndex('amount', 'amount', { unique: false });

    console.log('Database setup complete');
  };

  // Create an onsubmit handler so that when the form is submitted the addData() function is run
  form.onsubmit = addData;

  // Define the addData() function
  function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();

    // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
    let newItem = { clientName: clientNameInput.value, 
                    invoiceNumber: invoiceNumberInput.value, 
                    paymentMethod: paymentMethodInput.value,
                    paymentDate: paymentDateInput.value,
                    paiedBy: paiedByInput.value,
                    amount: amountInput.value
                  };

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(['shearim_os'], 'readwrite');

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('shearim_os');

    // Make a request to add our newItem object to the object store
    var request = objectStore.add(newItem);
    request.onsuccess = function() {
      // Clear the form, ready for adding the next entry
      clientNameInput.value = '';
      invoiceNumberInput.value = '';
      paymentMethodInput.value = '';
      paymentDateInput.value = '';
      paiedByInput.value = '';
      amountInput.value = '';
    };

    // Report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');

      // update the display of data to show the newly added item, by running displayData() again.
      displayData();
    };

    transaction.onerror = function() {
      console.log('Transaction not opened due to error');
    };
  }



  // Define the displayData() function
  function displayData() {
    // Here we empty the contents of the list element each time the display is updated
    // If you ddn't do this, you'd get duplicates listed each time a new note is added
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // Open our object store and then get a cursor - which iterates through all the
    // different data items in the store
    let objectStore = db.transaction('shearim_os').objectStore('shearim_os');
    objectStore.openCursor().onsuccess = function(e) {
      // Get a reference to the cursor
      let cursor = e.target.result;

      console.log("CURSOR");
      console.log(cursor);

      // If there is still another data item to iterate through, keep running this code
      if(cursor) {
        // Create a list item, h3, and p to put each data item inside when displaying it
        // structure the HTML fragment, and append it inside the list
        let listItem = document.createElement('li');
        listItem.classList.add("mystyle");

        let h3 = document.createElement('h3');
        let para = document.createElement('p');

        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);

        // Put the data from the cursor inside the h3 and para
        h3.innerHTML = cursor.value.clientName;
        para.innerHTML = "Invoice number: " + cursor.value.invoiceNumber + "<br>" + 
        				"Payment method: " + cursor.value.paymentMethod + "<br>" + 
        				"Payment date: " + cursor.value.paymentDate + "<br>" + 
        				"Paid by: " +cursor.value.paiedBy + "<br>" + 
        				"Amount: " + cursor.value.amount;


        console.log("totalAmount: " + totalAmount);

        console.log("cursor.value.amount is: " + cursor.value.amount);

        var number = Number(cursor.value.amount);
        console.log("cursor.value.amount converted to number");

        console.log("number isInteger? " + Number.isInteger(number));
        console.log("number: " + number);


        console.log("totalAmount isInteger? " + Number.isInteger(totalAmount));

        totalAmount += number;
        console.log("totalAmount: " + totalAmount);



        summaryInput.setAttribute("value", totalAmount.toString(10));


        // Store the ID of the data item inside an attribute on the listItem, so we know
        // which item it corresponds to. This will be useful later when we want to delete items
        listItem.setAttribute('data-note-id', cursor.value.id);

        // Create a button and place it inside each listItem
        let deleteBtn = document.createElement('button');
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = 'Delete';

        // Set an event handler so that when the button is clicked, the deleteItem()
        // function is run
        deleteBtn.onclick = deleteItem;

        // Iterate to the next item in the cursor
        cursor.continue();
      } else {
        // Again, if list item is empty, display a 'No notes stored' message
        if(!list.firstChild) {
          let listItem = document.createElement('li');
          listItem.textContent = 'No notes stored.'
          list.appendChild(listItem);
        }
        // if there are no more cursor items to iterate through, say so
        console.log('Notes all displayed');
      }
    };
  }

  // Define the deleteItem() function
  function deleteItem(e) {
    // retrieve the name of the task we want to delete. We need
    // to convert it to a number before trying it use it with IDB; IDB key
    // values are type-sensitive.
    let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

    // open a database transaction and delete the task, finding it using the id we retrieved above
    let transaction = db.transaction(['shearim_os'], 'readwrite');
    let objectStore = transaction.objectStore('shearim_os');
    let request = objectStore.delete(noteId);

    // report that the data item has been deleted
    transaction.oncomplete = function() {
      // delete the parent of the button
      // which is the list item, so it is no longer displayed
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log('Note ' + noteId + ' deleted.');

      // Again, if list item is empty, display a 'No notes stored' message
      if(!list.firstChild) {
        let listItem = document.createElement('li');
        listItem.textContent = 'No notes stored.';
        list.appendChild(listItem);
      }
    };
  }


};

