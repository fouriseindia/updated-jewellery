
  function updateCustomerCount() {
    const customerTableBody = document.getElementById('customerTableBody');
    const customerCount = customerTableBody.getElementsByTagName('tr').length;
    document.getElementById('customerCountValue').innerText = customerCount;
  }

  function handleSubmitCustomer(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll('.input-field');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value) {
        allFilled = false;
        input.style.border = '1px solid red';
      } else {
        input.style.border = '1px solid #ddd';
      }
    });

    if (allFilled) {
      const newCustomerRow = document.createElement('tr');
      newCustomerRow.innerHTML = `
        <td>${form.customerName.value}</td>
        <td>${form.customerSurname.value}</td>
        <td>${form.customerPhone.value}</td>
        <td>${form.customerEmail.value}</td>
        <td>${form.customerAddress.value}</td>
        <td class="action-buttons">
          <button class="edit-btn" onclick="editCustomer(this)">Edit</button>
          <button class="delete-btn" onclick="deleteCustomer(this)">Delete</button>
        </td>
      `;
      document.getElementById('customerTableBody').appendChild(newCustomerRow);
      updateCustomerCount();
      form.reset();
    } else {
      alert('All data are required');
    }
  }

  function deleteCustomer(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCustomerCount();
  }

  function editCustomer(button) {
    // Add your edit logic here
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateCustomerCount();
  });
// former count code
function updateFarmerCount() {
    const farmerTableBody = document.getElementById('farmerTableBody');
    const farmerCount = farmerTableBody.getElementsByTagName('tr').length;
    document.getElementById('farmerCountValue').innerText = farmerCount;
  }

  function handleSubmitFarmer(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll('.input-field');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value) {
        allFilled = false;
        input.style.border = '1px solid red';
      } else {
        input.style.border = '1px solid #ddd';
      }
    });

    if (allFilled) {
      const newFarmerRow = document.createElement('tr');
      newFarmerRow.innerHTML = `
        <td>${form.farmerName.value}</td>
        <td>${form.farmerSurname.value}</td>
        <td>${form.farmerAddress.value}</td>
        <td>${form.farmerPhone.value}</td>
        <td class="action-buttons">
          <button class="edit-btn" onclick="editFarmer(this)">Edit</button>
          <button class="delete-btn" onclick="deleteFarmer(this)">Delete</button>
        </td>
      `;
      document.getElementById('farmerTableBody').appendChild(newFarmerRow);
      updateFarmerCount();
      form.reset();
    } else {
      alert('All data are required');
    }
  }

  function deleteFarmer(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateFarmerCount();
  }

  function editFarmer(button) {
    // Add your edit logic here
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateFarmerCount();
  });
  //// customer count code
  function updateCustomerCount() {
    const customerTableBody = document.getElementById('customerTableBody');
    const customerCount = customerTableBody.getElementsByTagName('tr').length;
    document.getElementById('customerCountValue').innerText = customerCount;
  }

  function handleSubmitCustomer(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll('.input-field');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value) {
        allFilled = false;
        input.style.border = '1px solid red';
      } else {
        input.style.border = '1px solid #ddd';
      }
    });

    if (allFilled) {
      const newCustomerRow = document.createElement('tr');
      newCustomerRow.innerHTML = `
        <td>${form.customerName.value}</td>
        <td>${form.customerSurname.value}</td>
        <td>${form.customerPhone.value}</td>
        <td>${form.customerEmail.value}</td>
        <td>${form.customerAddress.value}</td>
        <td class="action-buttons">
          <button class="edit-btn" onclick="editCustomer(this)">Edit</button>
          <button class="delete-btn" onclick="deleteCustomer(this)">Delete</button>
        </td>
      `;
      document.getElementById('customerTableBody').appendChild(newCustomerRow);
      updateCustomerCount();
      form.reset();
    } else {
      alert('All data are required');
    }
  }

  function deleteCustomer(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCustomerCount();
  }

  function editCustomer(button) {
    // Add your edit logic here
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateCustomerCount();
  });
