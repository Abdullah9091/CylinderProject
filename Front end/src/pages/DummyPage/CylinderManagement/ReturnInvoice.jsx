import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import HeaderImage from '../../../assets/HeaderReturninvoice.PNG';
import FooterImage from '../../../assets/footer.PNG'; // 👈 Add this line

const InvoicePreview = ({ invoiceData, signature, onEdit, onClose }) => {
  const invoiceRef = useRef(null);

  const handleDownloadPDF = async () => {
    const clone = invoiceRef.current.cloneNode(true);

    clone.style.fontFamily = 'Arial, sans-serif';
    clone.style.fontSize = '12px';
    clone.style.color = '#000';
    clone.style.padding = '20px';
    clone.style.width = '800px';
    clone.style.background = '#fff';

    const table = clone.querySelector('table');
    if (table) {
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.querySelectorAll('th, td').forEach(cell => {
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '6px';
        cell.style.textAlign = 'left';
      });
    }

    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.position = 'fixed';
    hiddenDiv.style.top = '0';
    hiddenDiv.style.left = '-10000px';
    hiddenDiv.style.zIndex = '-1';
    hiddenDiv.appendChild(clone);
    document.body.appendChild(hiddenDiv);

    try {
      const canvas = await html2canvas(clone, {
        useCORS: true,
        scale: 2
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = 595.28;
      const imgRatio = canvas.width / canvas.height;
      const imgHeight = pdfWidth / imgRatio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`${invoiceData.invoice}.pdf`);
    } catch (error) {
      alert('Failed to generate PDF: ' + error.message);
      console.error(error);
    } finally {
      document.body.removeChild(hiddenDiv);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=900,height=700');
    const content = invoiceRef.current.outerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; color: #000; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
            .signature-img { width: 160px; height: 80px; object-fit: contain; border: 1px solid #000; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)', display: 'flex',
      justifyContent: 'center', alignItems: 'flex-start',
      paddingTop: '24px', zIndex: 50, overflowY: 'auto'
    }}>
      <div style={{
        background: '#fff', borderRadius: '8px', padding: '24px',
        maxWidth: '850px', width: '95%', position: 'relative', boxShadow: '0 0 20px rgba(0,0,0,0.2)'
      }}>
        <div ref={invoiceRef} style={{ fontSize: '14px', color: '#000', background: '#fff' }}>
          {/* Header Image */}
          <div style={{ width: '100%', marginBottom: '16px' }}>
            <img src={HeaderImage} alt="Header" style={{ width: '100%', height: 'auto' }} />
          </div>

          {/* Invoice Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Invoice #{invoiceData.invoice}</h2>
            <p style={{ color: '#666' }}>Invoice ready for printing</p>
          </div>

          {/* Billing Details */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '16px', flexWrap: 'wrap', gap: '12px'
          }}>
            <div>
              <p style={{ fontWeight: 'bold' }}>Bill To:</p>
              <p>{invoiceData.customer}</p>
              <p>TRN: 100123456789012</p>
              <p>Dubai Marina, Block A, Apt 1205</p>
            </div>
            <div>
              <p>Invoice #: {invoiceData.invoice}</p>
              <p>Date: {invoiceData.date}</p>
              <p>Due Date: {invoiceData.date}</p>
            </div>
          </div>

          {/* Table */}
          <table>
            <thead>
              <tr style={{ background: '#f1f1f1' }}>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.products.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>AED {item.price.toFixed(2)}</td>
                  <td>AED {(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ textAlign: 'right', marginTop: '16px' }}>
            <p>Subtotal: AED {invoiceData.total.toFixed(2)}</p>
            <p>VAT (5%): AED {(invoiceData.total * 0.05).toFixed(2)}</p>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
              Total: AED {(invoiceData.total * 1.05).toFixed(2)}
            </p>
          </div>

          {/* Signature */}
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>Authorized Signature:</p>
            {signature ? (
              <img src={signature} alt="signature" className="signature-img" />
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No signature captured.</p>
            )}
          </div>

          {/* Footer Image */}
          <div style={{ marginTop: '40px' }}>
            <img src={FooterImage} alt="Footer" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
          <button onClick={onEdit} style={{ background: '#f59e0b', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>
            Edit Signature
          </button>
          <button onClick={handleDownloadPDF} style={{ background: '#16a34a', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>
            Download PDF
          </button>
          <button onClick={handlePrint} style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '4px' }}>
            Print Invoice
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            fontSize: '24px', color: '#888', background: 'none', border: 'none'
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;
