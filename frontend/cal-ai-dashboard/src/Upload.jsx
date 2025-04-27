import React, { useState } from "react";
import axios from "axios";

async function uploadImage(file, setResponse, onMacrosUpdate) {
  if (!file) return alert("Please choose an image");

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axios.post('http://localhost:3000/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('Gemini Response:', res.data.result);
    console.log(`Cummulate macros: from upload component ${res.data.cummulatedMacros}`)
    setResponse(res.data.result);
    onMacrosUpdate(res.data.cummulatedMacros);  

  } catch (err) {
    console.error(err);
    alert('Failed to process image.');
  }
}

function Upload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [displayFileName, setDisplayFileName] = useState('No image chosen');
  const [displayUploadName, setUploadName] = useState("Your meals will appear here:");
  const [displayUploadDesc, setUploadDesc] = useState("Start tracking today's meals by taking a quick picture");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setDisplayFileName(file ? file.name : 'No image chosen');
  };

  const handleUploadClick = async () => {
    setUploadName("Processing..");
    setUploadDesc("Working on it! Please hold tight for just a second.")
    await uploadImage(selectedFile, setResponse, props.onMacrosUpdate); 
    setDisplayFileName('No image chosen');
    setUploadName("Your meals will appear here:");
    setUploadDesc("Start tracking today's meals by taking a quick picture")
    setSelectedFile(null);
  };

  return (
    <section className="recent">
      <div className="upload-image-div">
        <input 
          type="file" 
          id="imageInput" 
          accept="image/*" 
          hidden 
          onChange={handleFileChange}
        />
        <label htmlFor="imageInput" className="custom-file-label">Choose Image</label>
        <button className="upload-button" onClick={handleUploadClick}>Upload</button>
      </div>

      <p id="image-chosen">{displayFileName}</p>

      <p><strong>{displayUploadName}</strong><br />
        {displayUploadDesc}
      </p>

    </section>
  );
}

export default Upload;
