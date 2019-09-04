/***************************************** Create needed constants *************************************/

/****************** Form Section *****************/
const form = document.querySelector('form');
//const submitBtn = document.querySelector('form button');
const clearFilterBtn = document.getElementById("#clearFilter");


/*************** New Client Section **************/
//First Row
const clientNameInput = document.querySelector('#clientName');
const invoiceNumberInput = document.querySelector('#invoiceNumber');
const paymentMethodSelectInput = document.querySelector('#paymentMethodSelect');

//Second Row 
const paiedBySelectInput = document.querySelector('#paiedBySelect');
const paymentDateInput = document.querySelector('#paymentDateInput');
const amountInput = document.querySelector('#amount');

/*************** Summary Section **************/
//First Row
const totalAmountInput = document.querySelector('#totalAmount');
const totalAmountPaiedInput = document.querySelector('#totalAmountPaied');
const totalAmountShouldPayInput = document.querySelector('#totalAmountShouldPay');

//Second Row 
const totalClientsInput = document.querySelector('#totalClients');
const totalClientsPaiedInput = document.querySelector('#totalClientsPaied');
const totalClientsUnPaiedInput = document.querySelector('#totalClientsUnPaied');

/*************** Data Table Section **************/
//const list = document.querySelector('ul');
const tbody = document.querySelector('tbody');
const table = document.querySelector('#myTable');
const tableBody = document.getElementById('tableBody');
var deleteAllBtn = document.getElementById('deleteAllBtn');
var allPaiedBtn = document.getElementById('allPaiedBtn');


const tableThead = table.getElementsByTagName("thead");
const tableTheadElement = tableThead[0];
const tableTheadRows = tableTheadElement.getElementsByTagName("tr");
const tableHeadFirstRow = tableTheadRows[0];
const tableHeadFirstRowTh = tableHeadFirstRow.getElementsByTagName("th");

var filterListClient = document.getElementById("filterListClient");
var filterListInvoice = document.getElementById("filterListInvoice");
var filterListPaymentMethod = document.getElementById("filterListPaymentMethod");
var filterListPaiedBy = document.getElementById("filterListPaiedBy");
var filterListDate = document.getElementById("filterListDate");
var filterListAmount = document.getElementById("filterListAmount");


var filterListClientArray = [];
var filterListInvoiceArray = [];
var filterListPaymentMethodArray = [];
var filterListPaiedByArray = [];
var filterListDateArray = [];
var filterListAmountArray = [];


/******************************************** Define Variables ****************************************/
// Create an instance of a db object for us to store the open database in
let db;

/*************** New Client Section **************/
var paymentMethodValue;
var paiedByValue;

/*************** Summary Section **************/
//First Row
var totalAmountValue = Number("0");
var totalAmountPaiedValue = Number("0");
var totalAmountShuoldPayValue = Number("0");

//Second Row
var totalClientsValuelist;
var totalClientsValue = Number("0");
var totalClientsPaiedValue = Number("0");
var totalClientsUnPaiedValue = Number("0");

//displayDate function - set timeout variable
var myVar;




/******************************************** Initial Setup ****************************************/
//Focus page on first input
document.getElementById("clientName").focus();



/************************************* DataBase Creation | DataBase Modification ***************************************/

//Main function
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
    //displayData();
    myVar = setTimeout(displayData, 1000);
    
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

    objectStore.createIndex('isPaied', 'isPaied', { unique: false });

    console.log('Database setup complete');
  };





    


  
  


  /************************************************ Add Data to Database ***************************************************/

  // Create an onsubmit handler so that when the form is submitted the addData() function is run
  form.onsubmit = addData;

  // Define the addData() function
  function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();




  /*********************** Payment Method Selection ***********************/
    var paymentMethodSelectSelector = document.getElementById('paymentMethodSelect');
    var paymentMethodSelectValue = paymentMethodSelectSelector[paymentMethodSelectSelector.selectedIndex].value;
  
    switch (Number(paymentMethodSelectValue)) {
      case 1:
        paymentMethodValue = "מזומן";
        break;
      case 2:
        paymentMethodValue = "צ'ק";
        break;
      case 3:
        paymentMethodValue = "כרטיס אשראי";
        break;
      case 4:
        paymentMethodValue = "העברה בנקאית";
        break;
      default:
        paymentMethodValue = "אחר";
    }

  /*********************** Paied By Selection ***********************/
    var paiedBySelectInputSelector = document.getElementById('paiedBySelect');
    var paiedBySelectInputValue = paiedBySelectInputSelector[paiedBySelectInputSelector.selectedIndex].value;

    switch (Number(paiedBySelectInputValue)) {
      case 1:
        paiedByValue = "שליח";
        break;
      case 2:
        paiedByValue = "דואר";
        break;
      case 3:
        paiedByValue = "טכנאי";
        break;
      default:
          paiedByValue = "אחר";
    }


    // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
    let newItem = { clientName: clientNameInput.value, 
                    invoiceNumber: invoiceNumberInput.value, 
                    paymentMethod: paymentMethodValue,
                    paymentDate: paymentDateInput.value,
                    paiedBy: paiedByValue,
                    amount: amountInput.value,
                    isPaied: 0
                  };

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(['shearim_os'], 'readwrite');

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('shearim_os');

    // Make a request to add our newItem object to the object store
    var request = objectStore.add(newItem);


    filterListClientArray.push(clientNameInput.value);
    filterListInvoiceArray.push(invoiceNumberInput.value);
    filterListPaymentMethodArray.push(paymentMethodValue);
    filterListPaiedByArray.push(paiedByValue);
    filterListDateArray.push(paymentDateInput.value);
    filterListAmountArray.push(amountInput.value);




    request.onsuccess = function() {
      // Clear the form, ready for adding the next entry
      clientNameInput.value = '';
      invoiceNumberInput.value = '';
      paymentMethodSelectInput.value = 'שולם באמצעות';
      paymentDateInput.value = '';
      paiedBySelectInput.value = 'שולם על ידי';
      amountInput.value = '';
      totalAmountValue = Number("0");
      totalAmountPaiedValue = Number("0");
      totalAmountShuoldPayValue = Number("0");
      totalClientsValue = Number("0");
      totalClientsPaiedValue = Number("0");
      totalClientsUnPaiedValue = Number("0");
    };

    // Report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');

      // update the display of data to show the newly added item, by running displayData() again.
      //displayData();
      document.getElementById("loader").style.display = "block";
      document.getElementById("myDiv").style.display = "none";
      myVar = setTimeout(displayData, 1000);

    };

    transaction.onerror = function() {
      console.log('Transaction not opened due to error');
    };
  }







  /************************************************ Display Data in Browser ***************************************************/

  // Define the displayData() function
  function displayData() {
    // Here we empty the contents of the table element each time the display is updated
    // If you don't do this, you'd get duplicates listed each time a new note is added
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
      filterListClient.removeChild(filterListClient.firstChild);
      filterListInvoice.removeChild(filterListInvoice.firstChild);
      filterListPaymentMethod.removeChild(filterListPaymentMethod.firstChild);
      filterListPaiedBy.removeChild(filterListPaiedBy.firstChild);
      filterListDate.removeChild(filterListDate.firstChild);
      filterListAmount.removeChild(filterListAmount.firstChild);
      
    }
    
    //filterListClient = null;

    console.log("filterListClient");
    console.log(filterListClient);

    // Open our object store and then get a cursor - which iterates through all the
    // different data items in the store
    let objectStore = db.transaction('shearim_os').objectStore('shearim_os');


    //Show total clients in total clients input
    totalClientsValuelist = objectStore.count();
    
    totalClientsValuelist.onsuccess = function() {      
      totalClientsValue = totalClientsValuelist.result;
      totalClientsInput.setAttribute("value", totalClientsValue);
    }





    objectStore.openCursor().onsuccess = function(e) {
      // Get a reference to the cursor
      let cursor = e.target.result;

      // If there is still another data item to iterate through, keep running this code
      if(cursor) {
        // Create a list item, h3, and p to put each data item inside when displaying it
        // structure the HTML fragment, and append it inside the list


        /************************************* Create Table Data ****************************************/
        //Create row element
        let tableRow = document.createElement('tr');

        //Create columns elements
        let tableColumnActions = document.createElement('td');
        let tableColumnAmount = document.createElement('td');
        let tableColumnDate = document.createElement('td');
        let tableColumnPaiedBy = document.createElement('td');
        let tableColumnPaymentMethod = document.createElement('td');
        let tableColumnInvoiceNumber = document.createElement('td');
        let tableColumnClientName = document.createElement('td');

        
        //Create Confirm Button
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('btn', 'btn-success', 'btn-sm');
        confirmButton.setAttribute("id", "confirmButton");
        confirmButton.setAttribute("style", "font-size:4px");

        //Create Confirm Icon
        let confirmIconTag = document.createElement('i');
        confirmIconTag.classList.add("material-icons");
        confirmIconTag.innerText = "done";



        //Create Delete Button
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-secondary', 'btn-sm');
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("style", "font-size:4px");
        //deleteButton.setAttribute("onclick", deleteItem);

        //Create Delete Icon
        let deleteIconTag = document.createElement('i');
        deleteIconTag.classList.add("material-icons");
        deleteIconTag.innerText = "delete";



        //Inseart Delete and Confirm icons into Delete and Confirm buttons 
        confirmButton.appendChild(confirmIconTag);
        deleteButton.appendChild(deleteIconTag);
        

        //Inseart Delete and Confirm buttons into Action column 
        tableColumnActions.appendChild(confirmButton)
        tableColumnActions.appendChild(deleteButton)


        //Append all created columns in to one row
        tableRow.appendChild(tableColumnActions);
        tableRow.appendChild(tableColumnAmount);
        tableRow.appendChild(tableColumnDate);
        tableRow.appendChild(tableColumnPaiedBy);
        tableRow.appendChild(tableColumnPaymentMethod);
        tableRow.appendChild(tableColumnInvoiceNumber);
        tableRow.appendChild(tableColumnClientName);


        //Append the row in to the table
        tbody.appendChild(tableRow);


        //Inseart data in to the columns of the row         
        tableColumnAmount.innerHTML = cursor.value.amount;
        tableColumnDate.innerHTML = cursor.value.paymentDate;
        tableColumnPaiedBy.innerHTML = cursor.value.paiedBy;
        tableColumnPaymentMethod.innerHTML = cursor.value.paymentMethod;
        tableColumnInvoiceNumber.innerHTML = cursor.value.invoiceNumber;
        tableColumnClientName.innerHTML = cursor.value.clientName;



        // Store the ID of the data item inside an attribute on the listItem, so we know
        // which item it corresponds to. This will be useful later when we want to delete items
        //listItem.setAttribute('data-note-id', cursor.value.id);
        tableRow.setAttribute('data-note-id', cursor.value.id);
        tableRow.setAttribute('id', cursor.value.id);
        

        // Set an event handler so that when the button is clicked, the deleteItem()
        // function is run
        deleteButton.onclick = deleteItem;
        
        //confirmBtn.onclick = deleteItem;
        confirmButton.onclick = clientConfirm;



        /*************************************** Filter List ******************************************/
        //Create a list item elements
        let filterListListItemClientName = document.createElement('li');
        let filterListListItemInvoiceNumber = document.createElement('li');
        let filterListListItemPaymentMethod = document.createElement('li');
        let filterListListItemPaiedBy = document.createElement('li');
        let filterListListItemDate = document.createElement('li');
        let filterListListItemAmount = document.createElement('li');

        //Create an <a> elements
        let filterListAnchorClientName = document.createElement('a');
        let filterListAnchorInvoiceNumber = document.createElement('a');
        let filterListAnchorPaymentMethod = document.createElement('a');
        let filterListAnchorPaiedBy = document.createElement('a');
        let filterListAnchorDate = document.createElement('a');
        let filterListAnchorAmount = document.createElement('a');

        //Inseart data from database into the <a> elements
        filterListAnchorClientName.innerText = cursor.value.clientName;
        filterListAnchorInvoiceNumber.innerText = cursor.value.invoiceNumber;
        filterListAnchorPaymentMethod.innerText = cursor.value.paymentMethod;
        filterListAnchorPaiedBy.innerText = cursor.value.paiedBy;
        filterListAnchorDate.innerText = cursor.value.data;
        filterListAnchorAmount.innerText = cursor.value.amount;


        //Inseart the <a> elements into list item elements
        filterListListItemClientName.appendChild(filterListAnchorClientName);
        filterListListItemInvoiceNumber.appendChild(filterListAnchorInvoiceNumber);
        filterListListItemPaymentMethod.appendChild(filterListAnchorPaymentMethod);
        filterListListItemPaiedBy.appendChild(filterListAnchorPaiedBy);
        filterListListItemDate.appendChild(filterListAnchorDate);
        filterListListItemAmount.appendChild(filterListAnchorAmount);

        //Inseart li with all data into dropdown filter list
        filterListClient.appendChild(filterListListItemClientName);
        filterListInvoice.appendChild(filterListListItemInvoiceNumber);
        filterListPaymentMethod.appendChild(filterListListItemPaymentMethod);
        filterListPaiedBy.appendChild(filterListListItemPaiedBy);
        filterListDate.appendChild(filterListListItemDate);
        filterListAmount.appendChild(filterListListItemAmount);
        




        //Create Confirm Button
        /*
        let deleteAllBtn = document.createElement('button');
        deleteAllBtn.classList.add('btn', 'btn-outline-secondary', 'btn-md');
        deleteAllBtn.setAttribute("id", "deleteAllBtn");
        deleteAllBtn.setAttribute("style", "font-size:4px");

        dataTableButtons.appendChild(deleteAllBtn)

        deleteAllBtn.onclick = deleteAllData;
        */



        
        /************************* Paint table's row if client marked as paied ********************************/
        if(cursor.value.isPaied == 1)
        {       
          document.getElementById(cursor.value.id).classList.add("clicked");
          totalAmountPaiedValue += Number(cursor.value.amount);
          totalClientsPaiedValue++;
        }
        



        



        /************************* Display Data in Summary Section ********************************/
        /****** First Row *****/
        //Getting the amount from database and adding it to the total amount
        totalAmountValue += Number(cursor.value.amount);
        //Setting the value of total amount input
        totalAmountInput.setAttribute("value", totalAmountValue.toString(10));  
        
        //Shows the amount was already paied
        totalAmountPaiedInput.setAttribute("value", totalAmountPaiedValue.toString(10));
        
        //Shows the amount which left to be paied
        totalAmountShouldPayValue = totalAmountValue - totalAmountPaiedValue;
        //Setting the value of client who should pay
        totalAmountShouldPayInput.setAttribute("value", totalAmountShouldPayValue.toString(10));

        
        /****** Second Row *****/
        //
        totalClientsInput.setAttribute("value", totalClientsValue.toString(10));
        
        //
        totalClientsPaiedInput.setAttribute("value", totalClientsPaiedValue.toString(10));
        
        //Settings the total amount of clients which didn't pay yet by substructing the total amount of clients which paied 
        //from total amount of clients
        totalClientsUnPaiedValue = totalClientsValue - totalClientsPaiedValue;
        //Setting the value of total amount of clients which didn't pay input
        totalClientsUnPaiedInput.setAttribute("value", totalClientsUnPaiedValue.toString(10));







        
        



        // Iterate to the next item in the cursor
        cursor.continue();
      } else {
        // Again, if table is empty, display a 'No notes stored' message
        if(!tbody.firstChild) {
          //let listItem = document.createElement('li');
          //listItem.textContent = 'No notes stored.'
          //list.appendChild(listItem);
          totalAmountValue = 0;
          totalAmountInput.setAttribute("value", totalAmountValue.toString(10));

          totalAmountPaiedValue = 0;
          totalAmountPaiedInput.setAttribute("value", totalAmountPaiedValue.toString(10));

          totalAmountShouldPayValue = 0;
          totalAmountShouldPayInput.setAttribute("value", totalAmountShouldPayValue.toString(10));



          totalClientsValue = 0;
          totalClientsInput.setAttribute("value", totalClientsValue.toString(10));

          totalClientsPaiedValue = 0;
          totalClientsPaiedInput.setAttribute("value", totalClientsPaiedValue.toString(10));

          totalClientsUnPaiedValue = 0;
          totalClientsUnPaiedInput.setAttribute("value", totalClientsUnPaiedValue.toString(10));





        }
        // if there are no more cursor items to iterate through, say so
        console.log('Notes all displayed');

      }




    };
          
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";

    document.getElementById("clientName").focus();

  }


  deleteAllBtn.onclick = deleteAllData;


  /************************************************ Delete Data from DataBase ***************************************************/

  // Define the deleteItem() function
  function deleteItem(e) {

    var result = confirm("האם בטוח למחוק?");
    if (result) {
      // prevent default - we don't want to catch the the Button event.
      e.preventDefault();

      // retrieve the name of the task we want to delete. We need
      // to convert it to a number before trying it use it with IDB; IDB key
      // values are type-sensitive.
      let noteId = Number(e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id'));

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


        document.getElementById("loader").style.display = "block";
        document.getElementById("myDiv").style.display = "none";

        totalAmountValue = 0;
        totalAmountPaiedValue = 0;
        totalClientsPaiedValue = 0;

        myVar = setTimeout(displayData, 1000);

        // Again, if table is empty, display a 'No notes stored' message
        if(!tbody.firstChild) {
                    //let listItem = document.createElement('li');
          //listItem.textContent = 'No notes stored.'
          //list.appendChild(listItem);
          totalAmountValue = 0;
          totalAmountInput.setAttribute("value", totalAmountValue.toString(10));

          totalAmountPaiedValue = 0;
          totalAmountPaiedInput.setAttribute("value", totalAmountPaiedValue.toString(10));

          totalAmountShouldPayValue = 0;
          totalAmountShouldPayInput.setAttribute("value", totalAmountShouldPayValue.toString(10));



          totalClientsValue = 0;
          totalClientsInput.setAttribute("value", totalClientsValue.toString(10));

          totalClientsPaiedValue = 0;
          totalClientsPaiedInput.setAttribute("value", totalClientsPaiedValue.toString(10));

          totalClientsUnPaiedValue = 0;
          totalClientsUnPaiedInput.setAttribute("value", totalClientsUnPaiedValue.toString(10));

        }
      };
    }
  }


  function clientConfirm(e){

    // prevent default - we don't want to catch the the Button event.
    e.preventDefault();

    // retrieve the name of the client we want to mark as paied. We need
    // to convert it to a number before trying it use it with IDB; IDB key
    // values are type-sensitive.
    let noteId = Number(e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id'));

    let transaction = db.transaction(['shearim_os'], 'readwrite');
    
    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('shearim_os');

    // Get the to-do list object that has this id
    var objectStoreIDRequest = objectStore.get(noteId);


    objectStoreIDRequest.onsuccess = function() {
      // Grab the data object returned as the result
      var data = objectStoreIDRequest.result;
      
      var ClientPaiedResult = confirm("האם בטוח לסמן את  " + data.clientName + "?");
      if (ClientPaiedResult) {

        if(data.isPaied == 0)
        {
          // Update the isPaied value in the object to 1
          data.isPaied = 1;
          totalClientsPaiedValue++;
          
          // Create another request that inserts the item back into the database
          var updateIDRequest = objectStore.put(data);
        
          // Log the transaction that originated this request
          console.log("The transaction that originated this request is " + updateIDRequest.transaction);
        
          // When this new request succeeds, run the displayData() function again to update the display
          updateIDRequest.onsuccess = function() {
            totalAmountValue = 0;
            totalAmountPaiedValue = 0;
            totalClientsPaiedValue = 0;

            displayData();
          };

        } else if (data.isPaied == 1)
        {
          // Update the isPaied value in the object to 0
          data.isPaied = 0;
          totalClientsPaiedValue--;



          // Create another request that inserts the item back into the database
          var updateIDRequest = objectStore.put(data);
        
          // Log the transaction that originated this request
          console.log("The transaction that originated this request is " + updateIDRequest.transaction);
        
          // When this new request succeeds, run the displayData() function again to update the display
          updateIDRequest.onsuccess = function() {
            totalAmountValue = 0;
            totalAmountPaiedValue = 0;
            totalClientsPaiedValue = 0;

            displayData();
          }
        }
      }
    }
  }



  function deleteAllData(e){

    // prevent default - we don't want to catch the the Button event.
    e.preventDefault();


    var result = confirm("האם בטוח למחוק?");
    if (result) 
    {
      var DBDeleteRequest = window.indexedDB.deleteDatabase("shearim_db");

      DBDeleteRequest.onerror = function(event) {
        console.log("Error deleting database.");
      };
  
      DBDeleteRequest.onsuccess = function(event) {
        console.log("Database deleted successfully");
      
        console.log(event.result); // should be undefined
        displayData();
      };

    }
    
  }


  //clearFilterBtn.onclick = clearFilterInput;

  function clearFilterInput(){
    console.log("clear Filter Input");

  }



};





