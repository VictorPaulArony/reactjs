import React, { useRef, useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';


const QRCodeReader = () => {
  const [qrData, setQrData] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [infoText, setInfoText] = useState('Scan or Upload QR Code');
  const [active, setActive] = useState(false);
  const [scanning, setScanning] = useState(false);

  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  //function to handle Upload image Logic 
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    setInfoText('Scanning QR Code from image...');
    setScanning(false);

    try {
      const res = await fetch('https://api.qrserver.com/v1/read-qr-code/', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      const data = result[0]?.symbol[0]?.data;
      setQrData(data || '');
      setImageURL(URL.createObjectURL(file));
      setInfoText(data ? 'Scan or Upload Another QR Code' : "Couldn't Scan QR Code");
      setActive(!!data);
    } catch {
      setInfoText("Couldn't Scan QR Code...");
    }
  };

  // function to handle Camera Logic 
  const startCameraScan = async () => {
    setScanning(true);           
    setActive(false);
    setInfoText('Initializing camera...');
  
    // Delay execution to wait for the DOM to render the scanner div
    setTimeout(async () => {
      const qrReaderElement = document.getElementById("qr-reader");
      if (!qrReaderElement) {
        console.error("QR reader div not found.");
        return;
      }
  
      html5QrCodeRef.current = new Html5Qrcode("qr-reader");
  
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          const cameraId = cameras[0].id;
  
          html5QrCodeRef.current.start(
            cameraId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              setQrData(decodedText);
              stopCameraScan();
              setActive(true);
              setInfoText('Scan or Upload Another QR Code');
            },
          );
        } else {
          alert('No camera found');
          setScanning(false);
        }
      } catch (err) {
        alert('Camera access failed.');
        console.error(err);
        setScanning(false);
      }
    }, 100); // Wait 100ms for the DOM to render
  };
  

  const stopCameraScan = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
        setScanning(false);
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCameraScan();
  }, []);

  const handleCopy = () => {
    if (qrData) navigator.clipboard.writeText(qrData);
  };

  const handleClose = () => {
    stopCameraScan();
    setQrData('');
    setImageURL('');
    setActive(false);
    setInfoText('Scan or Upload QR Code');
  };

  return (
    <div className={`wrapper ${active ? 'active' : ''}`}>
      <h2>QR Code Reader</h2>

      <div className="buttons">
        {!scanning && <button onClick={startCameraScan}>Start Camera Scan</button>}
        <button onClick={() => fileInputRef.current.click()}>Upload QR Code Image</button>
        {(scanning || active) && <button onClick={handleClose}>Reset</button>}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <p>{infoText}</p>

      {scanning && <div id="qr-reader" ref={qrRef} style={{ width: '300px', margin: 'auto' }} />}

      {imageURL && <img src={imageURL} alt="QR preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}

      {qrData && (
        <div style={{ marginTop: '20px' }}>
          <textarea ref={textAreaRef} readOnly value={qrData} rows={4} cols={40} />
          <br />
          <button className="copy" onClick={handleCopy}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default QRCodeReader;
