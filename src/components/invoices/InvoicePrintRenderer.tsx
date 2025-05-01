
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
    return `
      <html>
        <head>
          <title>Invoice #${invoice.invoice_number}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 30px; }
            .invoice { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 30px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; }
            .title { text-align: center; margin: 20px 0; }
            .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .info-block { width: 45%; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
            th { background-color: #f8f9fa; }
            .total { text-align: right; margin-top: 20px; }
            .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <div class="logo">BizzTrack</div>
              <div>
                <h1>INVOICE</h1>
                <p>#${invoice.invoice_number}</p>
              </div>
            </div>
            
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
                ${invoice.client?.email || ""}</p>
              </div>
            </div>
            
            <div class="info">
              <div class="info-block">
                <h3>Invoice Date:</h3>
                <p>${new Date(invoice.invoice_date).toLocaleDateString()}</p>
              </div>
              <div class="info-block">
                <h3>Due Date:</h3>
                <p>${new Date(invoice.due_date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Rate (₹)</th>
                  <th>Amount (₹)</th>
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
                <tr>
                  <th colspan="3">Total:</th>
                  <th>₹ ${invoice.total_amount.toLocaleString("en-IN")}</th>
                </tr>
              </tfoot>
            </table>
            
            ${invoice.notes ? `<div><h3>Notes:</h3><p>${invoice.notes}</p></div>` : ""}
            ${invoice.terms ? `<div><h3>Terms and Conditions:</h3><p>${invoice.terms}</p></div>` : ""}
            
            <div class="footer">
              <p>Thank you for your business!</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

export default InvoicePrintRenderer;
