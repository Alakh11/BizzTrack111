
export interface Invoice {
  id?: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  total_amount: number;
  client: {
    name?: string;
    address?: string;
    email?: string;
    phone?: string;
  };
  invoice_items?: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
  }>;
  notes?: string;
  terms?: string;
  metadata?: string;
}

class InvoicePrintRenderer {
  static getHtml(invoice: Invoice): string {
    // Parse metadata if available
    let metadata: any = {};
    try {
      if (invoice.metadata) {
        metadata = JSON.parse(invoice.metadata);
      }
    } catch (e) {
      console.error("Error parsing invoice metadata", e);
    }

    // Get design settings
    const design = metadata.design || {};
    const additional = metadata.additional || {};
    const gst = metadata.gst || {};
    const payment = metadata.payment || {};
    const shipping = metadata.shipping || {};
    const transport = metadata.transport || {};

    // Format currency
    const currencySymbol = additional.currency === 'usd' ? '$' : 
                          additional.currency === 'eur' ? '€' : 
                          additional.currency === 'gbp' ? '£' : '₹';

    return `
      <html>
        <head>
          <title>Invoice #${invoice.invoice_number}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap');
            
            body { 
              font-family: ${design.font === 'inter' ? "'Inter'" : 
                          design.font === 'playfair' ? "'Playfair Display'" : 
                          design.font === 'roboto' ? "'Roboto'" : "'Poppins'"}, sans-serif; 
              margin: 0; 
              padding: 30px; 
              color: #333;
            }
            .invoice { 
              max-width: 800px; 
              margin: 0 auto; 
              border: 1px solid #eee; 
              padding: 30px; 
              position: relative;
              background-color: white;
            }
            .color-accent {
              color: ${design.color === 'blue' ? '#4A90E2' : 
                      design.color === 'green' ? '#4CAF50' : 
                      design.color === 'purple' ? '#9C27B0' : 
                      design.color === 'red' ? '#F44336' : '#4A90E2'};
            }
            .bg-accent {
              background-color: ${design.color === 'blue' ? '#4A90E2' : 
                              design.color === 'green' ? '#4CAF50' : 
                              design.color === 'purple' ? '#9C27B0' : 
                              design.color === 'red' ? '#F44336' : '#4A90E2'};
              color: white;
              padding: 10px;
            }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; }
            .logo img { max-height: 80px; max-width: 200px; }
            .title { text-align: ${design.template === 'modern' ? 'left' : 'center'}; margin: 20px 0; }
            .title h1 { 
              color: ${design.color === 'blue' ? '#4A90E2' : 
                      design.color === 'green' ? '#4CAF50' : 
                      design.color === 'purple' ? '#9C27B0' : 
                      design.color === 'red' ? '#F44336' : '#4A90E2'};
              margin: 0; 
              font-size: 36px;
            }
            .title h2 { 
              color: #666; 
              margin: 5px 0 0 0; 
              font-weight: normal;
              font-size: 18px;
            }
            .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .info-block { width: 45%; }
            .info-block h3 { margin-top: 0; color: #666; }
            .dates { display: flex; justify-content: space-between; flex-wrap: wrap; margin: 20px 0; }
            .date-block { width: 30%; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
            th { 
              background-color: ${design.color === 'blue' ? '#EBF4FF' : 
                              design.color === 'green' ? '#E8F5E9' : 
                              design.color === 'purple' ? '#F3E5F5' : 
                              design.color === 'red' ? '#FFEBEE' : '#EBF4FF'}; 
            }
            .total { text-align: right; margin-top: 20px; }
            .total-row { font-weight: bold; font-size: 1.2em; }
            .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
            .payment { margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
            .signature { margin-top: 50px; text-align: right; }
            .signature img { max-width: 200px; max-height: 50px; margin-left: auto; margin-right: 0; display: block; }
            .signature p { margin-top: 10px; border-top: 1px solid #ccc; display: inline-block; padding-top: 5px; }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 100px;
              opacity: 0.03;
              pointer-events: none;
              white-space: nowrap;
              font-weight: bold;
              color: #000;
              z-index: 0;
            }
            .gst-details { border-top: 1px solid #eee; margin-top: 20px; padding-top: 10px; }
            .gst-details h3 { margin-top: 0; }
            .additional-fields { margin-top: 10px; font-size: 0.9em; color: #666; }
            .additional-fields span { margin-right: 20px; }
            .shipping-details, .transport-details { margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
            
            @media print {
              body { padding: 0; }
              .invoice { border: none; max-width: 100%; }
              .page-break { page-break-after: always; }
            }
          </style>
        </head>
        <body>
          <div class="invoice">
            ${design.template === 'classic' || design.template === 'modern' ? 
              `<div class="watermark">${design.watermarkText || 'PREMIUM'}</div>` : ''}
            
            ${design.template === 'modern' ? 
              `<div class="bg-accent" style="margin: -30px -30px 30px -30px; padding: 20px 30px;">
                <div class="header">
                  <div class="logo">${design.logo ? `<img src="${design.logo}" alt="Business Logo">` : 'Invoice App'}</div>
                  <div>
                    <h1 style="color: white; font-size: 28px;">${design.title || 'INVOICE'}</h1>
                    <p style="color: white; opacity: 0.8;">#${invoice.invoice_number}</p>
                  </div>
                </div>
              </div>` 
            : 
              `<div class="header">
                <div class="logo">${design.logo ? `<img src="${design.logo}" alt="Business Logo">` : 'Invoice App'}</div>
                <div class="title">
                  <h1>${design.title || 'INVOICE'}</h1>
                  ${design.subtitle ? `<h2>${design.subtitle}</h2>` : ''}
                  <p>#${invoice.invoice_number}</p>
                </div>
              </div>`
            }
            
            <div class="info">
              <div class="info-block">
                <h3>From:</h3>
                <p>Alakh Corporation<br>
                Mirzapur, UP, India - 231312<br>
                +91 9580813770<br>
                alakh1304@gmail.com</p>
              </div>
              <div class="info-block">
                <h3>To:</h3>
                <p>${invoice.client?.name || "Client"}<br>
                ${invoice.client?.address || ""}<br>
                ${invoice.client?.email || ""}<br>
                ${invoice.client?.phone || ""}</p>
              </div>
            </div>
            
            <div class="dates">
              <div class="date-block">
                <h3>Invoice Date:</h3>
                <p>${new Date(invoice.invoice_date).toLocaleDateString()}</p>
              </div>
              <div class="date-block">
                <h3>Due Date:</h3>
                <p>${new Date(invoice.due_date).toLocaleDateString()}</p>
              </div>
              ${additional.poNumber ? `
              <div class="date-block">
                <h3>PO Number:</h3>
                <p>${additional.poNumber}</p>
              </div>` : ''}
            </div>
            
            ${additional.refNumber ? `
            <div class="additional-fields">
              <span><strong>Reference:</strong> ${additional.refNumber}</span>
            </div>` : ''}
            
            ${gst.gstNumber ? `
            <div class="gst-details">
              <h3>GST Details</h3>
              <p><strong>GST Number:</strong> ${gst.gstNumber}</p>
              <p><strong>GST Type:</strong> ${gst.gstType}</p>
              ${gst.placeOfSupply ? `<p><strong>Place of Supply:</strong> ${gst.placeOfSupply}</p>` : ''}
              ${gst.reverseCharge ? `<p><strong>Reverse Charge:</strong> Yes</p>` : ''}
              ${gst.nonGstClient ? `<p><strong>Non-GST Client:</strong> Yes</p>` : ''}
            </div>` : ''}
            
            ${shipping && shipping.from ? `
            <div class="shipping-details">
              <h3>Shipping Details</h3>
              <div style="display: flex; justify-content: space-between;">
                <div style="width: 48%;">
                  <h4>From:</h4>
                  <p>
                    ${shipping.from.name || ''}<br>
                    ${shipping.from.address || ''}<br>
                    ${shipping.from.city || ''}, ${shipping.from.state || ''} ${shipping.from.postal || ''}<br>
                    ${shipping.from.country || ''}
                    ${shipping.from.warehouse ? `<br>Warehouse: ${shipping.from.warehouse}` : ''}
                  </p>
                </div>
                <div style="width: 48%;">
                  <h4>To:</h4>
                  <p>
                    ${shipping.to.name || ''}<br>
                    ${shipping.to.address || ''}<br>
                    ${shipping.to.city || ''}, ${shipping.to.state || ''} ${shipping.to.postal || ''}<br>
                    ${shipping.to.country || ''}
                  </p>
                </div>
              </div>
            </div>` : ''}
            
            ${transport && transport.transporter ? `
            <div class="transport-details">
              <h3>Transport Details</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                ${transport.transporter ? `<p><strong>Transporter:</strong> ${transport.transporter}</p>` : ''}
                ${transport.distance ? `<p><strong>Distance:</strong> ${transport.distance} km</p>` : ''}
                ${transport.mode ? `<p><strong>Mode:</strong> ${transport.mode}</p>` : ''}
                ${transport.docNo ? `<p><strong>Doc No:</strong> ${transport.docNo}</p>` : ''}
                ${transport.docDate ? `<p><strong>Doc Date:</strong> ${transport.docDate}</p>` : ''}
                ${transport.vehicleType ? `<p><strong>Vehicle Type:</strong> ${transport.vehicleType}</p>` : ''}
                ${transport.vehicleNumber ? `<p><strong>Vehicle Number:</strong> ${transport.vehicleNumber}</p>` : ''}
                ${transport.transactionType ? `<p><strong>Transaction Type:</strong> ${transport.transactionType}</p>` : ''}
                ${transport.supplyType ? `<p><strong>Supply Type:</strong> ${transport.supplyType}</p>` : ''}
              </div>
            </div>` : ''}
            
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Rate (${currencySymbol})</th>
                  <th>Amount (${currencySymbol})</th>
                </tr>
              </thead>
              <tbody>
                ${
                  invoice.invoice_items
                    ?.map(
                      (item) => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>${item.unit_price}</td>
                  <td>${item.amount}</td>
                </tr>
                `,
                    )
                    .join("") || ""
                }
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <th colspan="3">Total:</th>
                  <th>${currencySymbol} ${invoice.total_amount.toLocaleString()}</th>
                </tr>
              </tfoot>
            </table>
            
            ${invoice.notes ? `<div><h3>Notes:</h3><p>${invoice.notes}</p></div>` : ""}
            ${invoice.terms ? `<div><h3>Terms and Conditions:</h3><p>${invoice.terms}</p></div>` : ""}
            
            ${(payment.bank?.accountNumber || payment.upi?.id) ? `
            <div class="payment">
              <h3>Payment Details</h3>
              ${payment.bank?.accountNumber ? `
              <p><strong>Bank:</strong> ${payment.bank.name || 'N/A'}<br>
              <strong>Account Number:</strong> ${payment.bank.accountNumber}<br>
              <strong>Account Holder:</strong> ${payment.bank.accountHolderName || 'N/A'}<br>
              <strong>IFSC Code:</strong> ${payment.bank.ifscCode || 'N/A'}<br>
              <strong>Branch:</strong> ${payment.bank.branchName || 'N/A'}</p>
              ` : ''}
              
              ${payment.upi?.id ? `
              <p><strong>UPI ID:</strong> ${payment.upi.id}<br>
              ${payment.upi.name ? `<strong>UPI Name:</strong> ${payment.upi.name}` : ''}</p>
              ` : ''}
            </div>
            ` : ''}
            
            ${design.signature ? `
            <div class="signature">
              <img src="${design.signature}" alt="Digital Signature" />
              <p>Authorized Signature</p>
            </div>
            ` : ''}
            
            <div class="footer">
              <p>Thank you for your business!</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  static printInvoice(invoice: Invoice) {
    const html = this.getHtml(invoice);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  }
  
  static downloadInvoice(invoice: Invoice) {
    const html = this.getHtml(invoice);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${invoice.invoice_number}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  static previewInvoice(invoice: Invoice) {
    const html = this.getHtml(invoice);
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(html);
      previewWindow.document.close();
    }
  }
}

export default InvoicePrintRenderer;
