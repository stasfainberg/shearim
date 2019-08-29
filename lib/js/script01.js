


function myFilterFunction00() {
    // Declare variables 
    var input, filter, tableBody, tr, td, i, txtValue;
    input = document.getElementById("myInput00");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
  
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


  
  function myFilterFunction01() {
    // Declare variables 
    var input, filter, tableBody, tr, td, i, txtValue;
    input = document.getElementById("myInput01");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
  
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

  function myFilterFunction02() {
    // Declare variables 
    var input, filter, tableBody, tr, td, i, txtValue;
    input = document.getElementById("myInput02");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
  
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

  function myFilterFunction03() {
    // Declare variables 
    var input, filter, tableBody, tr, td, i, txtValue;
    input = document.getElementById("myInput03");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
  
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

  function myFilterFunction04() {
    // Declare variables 
    var input, filter, tableBody, tr, td, i, txtValue;
    input = document.getElementById("myInput04");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
  
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

  function myFilterFunction05() {
    // Declare variables 
    var input, filter, tableBody, tr, td, i, txtValue;
    input = document.getElementById("myInput05");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
  
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




