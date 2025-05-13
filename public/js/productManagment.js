function openForm() {
  document.getElementById("collectionModal").style.display = "block";
}

function closeForm() {
  document.getElementById("collectionModal").style.display = "none";
}

async function addCollection() {
  const collectionName = document.getElementById("collectionName").value;
  const collectionImage = document.getElementById("collectionImage").value;

  // Validate the fields
  if (!collectionName || !collectionImage) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    // Send a POST request to create the collection
    const response = await fetch("/collections/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  name: collectionName,
  image: collectionImage,
}),

    });

    const data = await response.json();

    if (response.ok) {
      alert("Collection added successfully!");
      closeForm();
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error adding collection:", error);
    alert("There was an error adding the collection.");
  }
}
