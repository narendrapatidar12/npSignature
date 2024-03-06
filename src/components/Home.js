import React, { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function Notepad() {
  const [fontSize, setFontSize] = useState(2);
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const signatureRef = useRef(null);

  const clearSignature = () => {
    signatureRef.current.clear();
    setTextColor('#000000');
    setBackgroundColor('#ffffff');
    setFontSize(2);
  };

  useEffect(() => {
    const canvas = signatureRef.current.getCanvas();
    canvas.style.backgroundColor = backgroundColor;
    signatureRef.current.clear();
  }, [backgroundColor]);

  const saveSignature = () => {
    const signatureData = signatureRef.current.toDataURL();
    const signatureImage = document.createElement('img');
    signatureImage.src = signatureData;
    document.body.appendChild(signatureImage);
    console.log(signatureData);
  };

  const handleSaveDownload = () => {
    const dataURL = signatureRef.current.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fontwidth = (e)=> {
    if(fontSize > 0){
      setFontSize(parseInt(e.target.value))
    } else {
      alert("0 is not a size of cursor")
      setFontSize(1)
    }
  }

  return (
    <div>
      <div>
        <label>Font Size:</label>
        <input
          type="number"
          value={fontSize}
          onChange={fontwidth}
          placeholder={fontSize}
        />
        <label>Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
        <label>Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <SignatureCanvas
        ref={signatureRef}
        minWidth={fontSize}
        penColor={textColor}
        backgroundColor={backgroundColor}
        canvasProps={{ className: 'signature-canvas', style: { cursor: 'pointer'} }}
      />
      <div>
        <button className="btn" id='red' onClick={clearSignature}>Clear</button>
        <button className="btn" id='green' onClick={saveSignature}>Save</button>
        <button className="btn" id='orange' onClick={handleSaveDownload}>Download</button>
      </div>
    </div>
  );
};

export default Notepad;
