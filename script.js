var donor;
function showDonorForm() {
  document.getElementById("donor-form").style.display = "block";
  document.getElementById("needer-form").style.display = "none";
  donor=true;
}

function showNeederForm() {
  document.getElementById("needer-form").style.display = "block";
  document.getElementById("donor-form").style.display = "none";
  donor=false;
}

if(donor){
   
document.getElementById("donor-form-data").addEventListener("submit", function(e){
  e.preventDefault();

  const formData = new FormData(this);
  const donorData = Object.fromEntries(formData);

  // Get existing dataset
  const dataset = JSON.parse(localStorage.getItem('dataset')) || [];

  // Add new donor
  dataset.push(donorData);

  // Save updated dataset
  localStorage.setItem('dataset', JSON.stringify(dataset));

  alert("Donor Form Submitted Successfully!");
  this.reset();
});
 
}
if(!donor){
document.getElementById("needer-form-data").addEventListener("submit", function(e){
  e.preventDefault();

  const formData = new FormData(this);
  const neederData = Object.fromEntries(formData);

  const dataset = JSON.parse(localStorage.getItem('dataset')) || [];

  // Filter donors by blood group
  const filteredDonors = dataset.filter(donor => 
    donor.bloodGroup === neederData.bloodGroup
  );

  displayDataset(filteredDonors);

  alert("Matching Donors Displayed Below!");
  this.reset();
});
}

function displayDataset(dataArray) {
  const datasetBody = document.getElementById("dataset-body");
  datasetBody.innerHTML = ""; // Clear previous data

  if (dataArray.length === 0) {
    datasetBody.innerHTML = `<tr><td colspan="6">No matching donors found</td></tr>`;
    document.getElementById("dataset-table").style.display = "none";       
    return;
  }

  document.getElementById("dataset-table").style.display = "table"; // Show table if data exists

  dataArray.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.age}</td>
      <td>${data.address}</td>
      <td>${data.phone1}</td>
      <td>${data.bloodGroup}</td>
      <td>${data.payment}</td>
    `;
    datasetBody.appendChild(row);
  });
}


window.onload = function() {
  alert("Welcome to the Blood Donation Portal!\n\nDid you know? Donating blood can help save up to 3 lives! 😊\n\nTips to boost blood count:\n- Eat iron-rich foods (spinach, beans, red meat)\n- Stay hydrated\n- Include Vitamin C (oranges, tomatoes)\n\nLet's help save lives!");
};
