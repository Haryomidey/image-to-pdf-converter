import { useState } from 'react';
import Image from './images/image-1.jfif';
import { jsPDF } from 'jspdf';

function App() {
  const [fileOpen, setFileOpen] = useState(true);
  // let image = document.getElementById('image');

  const handleFileOpen = () => {
    if (fileOpen) {
      let fileSelect = document.getElementById('hidden');
      fileSelect.click();
    }
  }

  const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    document.getElementById('hide-text').classList.add('active');
    document.getElementById('image-wrapper').classList.add('active');
    document.getElementById('image').src = URL.createObjectURL(file);
    document.getElementById('image').style.display = "block";
  }

  const convertImage = () => {
    if(document.getElementById('image').src){
      let doc = new jsPDF()
    
      const date = new Date();
      let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ];
      doc.addImage(document.getElementById('image').src,'PNG', 15, 15, 180, 180);
      doc.save(components.join(''))
      }

  }

  return (
    <div className="App">
      <h1>Image to Pdf Converter</h1>
      <div className="container">
        <div className='image-wrapper' id ="image-wrapper" onClick={handleFileOpen}>
          <input  id ="hidden" onChange={loadFile} className='hidden'  type = "file" accept="image/*" />
          <div className='icon-wrapper' id='hide-text'>
            <span className="material-symbols-outlined upload-icon">
            upload_file
            </span>
            <p>Browse to upload image</p>
          </div>
          <img id='image' />
        </div>
        <button type ='button' onClick={convertImage}>CONVERT</button>
      </div>
    </div>
  );
}

export default App;
