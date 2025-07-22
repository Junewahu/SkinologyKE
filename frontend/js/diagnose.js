// Diagnose.js: Handles diagnosis form submission and API call

document.getElementById('diagnosis-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const imageInput = document.getElementById('image');
  const symptoms = document.getElementById('symptoms').value;
  const resultDiv = document.getElementById('result');

  if (!imageInput.files.length) {
    resultDiv.textContent = 'Please upload an image.';
    return;
  }

  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('symptoms', symptoms);

  resultDiv.textContent = 'Diagnosing...';

  try {
    const response = await fetch('https://your-api-url.onrender.com/diagnose', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    resultDiv.textContent = data.result || 'Diagnosis complete.';
  } catch (err) {
    resultDiv.textContent = 'Error: Could not connect to diagnosis API.';
  }
});
