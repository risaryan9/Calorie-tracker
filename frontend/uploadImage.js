async function uploadImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
  
    if (!file) return alert("Please choose an image");
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const res = await axios.post('http://localhost:3000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Gemini Response:', res.data.result);

    } catch (err) {
      console.error(err);
      alert('Failed to process image.');
    }
  }

export default uploadImage;