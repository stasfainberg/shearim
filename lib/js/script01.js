// IE does not know about the target attribute. It looks for srcElement
// This function will get the event target in a browser-compatible way
function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement; 
}


var ulFilterListClient = document.getElementById('filterListClient');
var ulFilterListInvoice = document.getElementById('filterListInvoice');
var ulFilterListPaymentMethodt = document.getElementById('filterListPaymentMethod');
var ulFilterListPaiedBy = document.getElementById('filterListPaiedBy');
var ulFilterListDate = document.getElementById('filterListDate');
var ulFilterListAmount = document.getElementById('filterListAmount');


var target;
var input, filter, tableBody01, tr, td, i, txtValue;


ulFilterListClient.onclick = function(event) {
  target = getEventTarget(event);
  filterByClientName();
};

ulFilterListInvoice.onclick = function(event) {
  target = getEventTarget(event);
  filterByInvoiceNumber();
};

ulFilterListPaymentMethodt.onclick = function(event) {
  target = getEventTarget(event);
  filterByPaymentMethod();
};

ulFilterListPaiedBy.onclick = function(event) {
  target = getEventTarget(event);
  filterByPaiedBy();
};

ulFilterListDate.onclick = function(event) {
  target = getEventTarget(event);
  filterByDate();
};

ulFilterListAmount.onclick = function(event) {
  target = getEventTarget(event);
  filterByAmount();
};





function filterByClientName() {

    input = target.innerHTML;
    filter = input.toUpperCase();

    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[6];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }


  
  function filterByInvoiceNumber() {
    
    input = target.innerHTML;
    filter = input.toUpperCase();

    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[5];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  function filterByPaymentMethod() {

    input = target.innerHTML;
    filter = input.toUpperCase();

    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  function filterByPaiedBy() {

    input = target.innerHTML;
    filter = input.toUpperCase();
    
    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  function filterByDate() {

    input = target.innerHTML;
    filter = input.toUpperCase();

    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  function filterByAmount() {

    input = target.innerHTML;
    filter = input.toUpperCase();

    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }


  clearFilterBtn.onclick = clearFilterInput;

  function clearFilterInput(){
    tableBody01 = document.getElementById("tableBody");
    tr = tableBody01.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      tr[i].style.display = "";
    }
  }


