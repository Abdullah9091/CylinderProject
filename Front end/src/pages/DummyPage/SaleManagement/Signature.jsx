// src/components/Sales/SignatureModal.jsx
import React, { useRef } from 'react';

const SignatureModal = ({ invoice, onClose, onConfirm }) => {
  const canvasRef = useRef(null);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    onConfirm(dataURL); // send image to parent or save
    onClose();
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.onmousemove = draw;
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    canvas.onmousemove = null;
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-2xl relative">
        <h2 className="text-lg font-bold mb-1">Invoice #{invoice}</h2>
        <p className="text-sm text-gray-500 mb-4">Please add your signature to complete the invoice</p>

        <div className="border border-dashed p-4 rounded mb-4">
          <p className="font-semibold mb-1">Digital Signature Required</p>
          <p className="text-sm text-gray-500 mb-2">Draw your signature in the box below to authorize this invoice</p>
          <canvas
            ref={canvasRef}
            width={800}
            height={250}
            className="border border-dashed w-full"
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
          />
        </div>

        <div className="flex justify-between mt-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Clear Signature
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Confirm Signature
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignatureModal;
