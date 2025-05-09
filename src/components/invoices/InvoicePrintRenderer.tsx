import { Invoice } from "@/types/invoice";

class InvoicePrintRenderer {
  static previewInvoice(invoice: Invoice) {
    // Open in a new window
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(this.generateInvoiceHTML(invoice));
      printWindow.document.close();
    }
  }

  static printInvoice(invoice: Invoice) {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(this.generateInvoiceHTML(invoice));
      printWindow.document.close();
      printWindow.onload = function () {
        printWindow.print();
      };
    }
  }

  static downloadInvoice(invoice: Invoice) {
    const html = this.generateInvoiceHTML(invoice);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${invoice.invoice_number}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static generateInvoiceHTML(invoice: Invoice) {
    try {
      // Parse metadata if present
      const metadata = invoice.metadata
        ? typeof invoice.metadata === "string"
          ? JSON.parse(invoice.metadata)
          : invoice.metadata
        : {};

      // Extract design settings
      const design = metadata.design || {};
      const additional = metadata.additional || {};
      const shipping = metadata.shipping || {};
      const transport = metadata.transport || {};
      const gst = metadata.gst || {};
      const payment = metadata.payment || {};

      // Get business details from metadata
      const businessName = metadata.businessName || "";
      const businessAddress = metadata.businessAddress || "";
      const businessEmail = metadata.businessEmail || "";
      const businessPhone = metadata.businessPhone || "";

      // Get template style variables
      const colorMap = {
        blue: "#3b82f6",
        red: "#ef4444",
        green: "#10b981",
        purple: "#8b5cf6",
        orange: "#f97316",
        yellow: "#eab308",
        pink: "#ec4899",
        teal: "#14b8a6",
      };

      // Get primary color from selected color or default to blue
      const primaryColor =
        colorMap[design.color as keyof typeof colorMap] || colorMap.blue;

      // Get font family
      const fontMap = {
        inter: "'Inter', sans-serif",
        roboto: "'Roboto', sans-serif",
        poppins: "'Poppins', sans-serif",
        lato: "'Lato', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        opensans: "'Open Sans', sans-serif",
        raleway: "'Raleway', sans-serif",
      };

      const fontFamily =
        fontMap[design.font as keyof typeof fontMap] || fontMap.inter;

      // Calculate total amount
      const totalAmount =
        invoice.invoice_items?.reduce(
          (sum, item) => sum + Number(item.amount),
          0,
        ) || 0;

      // Format currency
      const currencySymbol = additional.currency === "usd" ? "$" : "₹";
      const formatCurrency = (amount: number) =>
        `${currencySymbol} ${amount.toFixed(2)}`;

      // Format date
      const formatDate = (dateString: string) => {
        try {
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch (e) {
          return dateString;
        }
      };

      // Construct watermark text
      const watermarkText = design.watermarkText || "";

      // Generate signature HTML
      const signatureHtml = design.signature
        ? `<div class="signature-container">
           <img src="${design.signature}" alt="Signature" style="max-width: 200px; max-height: 80px;" />
           <div class="signature-text">Authorized Signatory</div>
         </div>`
        : `<div class="signature-container">
           <div class="signature-line"></div>
           <div class="signature-text">Authorized Signatory</div>
         </div>`;

      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${invoice.invoice_number}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600;700&family=Lato:wght@400;700&family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: ${fontFamily};
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f9fafb;
            position: relative;
          }
          
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 6em;
            opacity: 0.07;
            color: ${primaryColor};
            white-space: nowrap;
            pointer-events: none;
            z-index: 0;
          }
          
          .invoice-container {
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            background-color: white;
            padding: 40px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: relative;
            z-index: 1;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
          }
          
          .header-left {
            flex: 1;
          }
          
          .header-right {
            flex: 1;
            text-align: right;
          }
          
          .logo {
            max-width: 200px;
            max-height: 80px;
          }
          
          .invoice-title {
            font-size: 28px;
            font-weight: 700;
            color: ${primaryColor};
            margin-bottom: 5px;
          }
          
          .invoice-subtitle {
            font-size: 14px;
            color: #666;
          }
          
          .invoice-details {
            margin-bottom: 20px;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
          }
          
          .label {
            font-weight: 500;
            color: #666;
          }
          
          .value {
            font-weight: 600;
          }
          
          .address-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          
          .address-block {
            flex: 1;
          }
          
          .address-header {
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 8px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }
          
          .table-container {
            margin: 30px 0;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          thead {
            background-color: ${primaryColor};
            color: white;
          }
          
          th {
            padding: 10px;
            text-align: left;
          }
          
          tbody tr:nth-child(even) {
            background-color: #f9fafb;
          }
          
          td {
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          
          .amount-column {
            text-align: right;
          }
          
          .summary {
            margin-left: auto;
            width: 250px;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
          
          .total-row {
            font-weight: 700;
            font-size: 1.1em;
            color: ${primaryColor};
            border-top: 1px solid #ddd;
            padding-top: 10px;
            margin-top: 5px;
          }
          
          .notes {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          
          .notes-header {
            font-weight: 600;
            margin-bottom: 10px;
          }
          
          .terms {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
          }
          
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 0.8em;
            color: #666;
          }

          .signature-container {
            margin-top: 60px;
            text-align: right;
            width: 200px;
            float: right;
          }

          .signature-line {
            border-bottom: 1px solid #666;
            margin-bottom: 10px;
            height: 40px;
          }

          .signature-text {
            font-weight: 500;
          }
          
          .shipping-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #eee;
            background-color: #f9fafb;
          }

          .section-header {
            font-weight: 600;
            color: ${primaryColor};
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }

          .shipping-details {
            display: flex;
            flex-wrap: wrap;
          }

          .shipping-column {
            flex: 1;
            min-width: 200px;
          }

          .transport-details {
            margin-bottom: 5px;
          }

          .gst-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #eee;
          }

          .gst-details {
            display: flex;
            flex-wrap: wrap;
          }

          .gst-column {
            flex: 1;
            min-width: 200px;
            margin-bottom: 10px;
          }

          .payment-section {
            margin: 20px 0;
          }

          .payment-methods {
            display: flex;
            flex-wrap: wrap;
          }

          .payment-column {
            flex: 1;
            min-width: 200px;
          }
          
          @media print {
            body {
              background-color: white;
            }
            .invoice-container {
              box-shadow: none;
              padding: 20px;
              margin: 0;
            }
            @page {
              size: ${design.paperSize === "letter" ? "letter" : "A4"};
              margin: 0.5cm;
            }
          }
        </style>
      </head>
      <body>
        ${watermarkText ? `<div class="watermark">${watermarkText}</div>` : ""}
        <div class="invoice-container">
          <div class="header">
            <div class="header-left">
              ${design.logo ? `<img src="${design.logo}" alt="Business Logo" class="logo">` : ""}
              <div style="margin-top: 10px;">
                <div style="font-weight: bold;">${invoice.client?.name || "Client Name"}</div>
                <div>${invoice.client?.address?.replace(/\n/g, "<br>") || "Client Address"}</div>
                ${invoice.client?.email ? `<div>Email: ${invoice.client.email}</div>` : ""}
                ${invoice.client?.phone ? `<div>Phone: ${invoice.client.phone}</div>` : ""}
              </div>
            </div>
            <div class="header-right">
              <div class="invoice-title">${design.title || "INVOICE"}</div>
              ${design.subtitle ? `<div class="invoice-subtitle">${design.subtitle}</div>` : ""}
              <div class="invoice-details">
                <div class="detail-row">
                  <span class="label">Invoice #:</span>
                  <span class="value">${invoice.invoice_number}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date:</span>
                  <span class="value">${formatDate(invoice.invoice_date)}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Due Date:</span>
                  <span class="value">${formatDate(invoice.due_date)}</span>
                </div>
                ${
                  additional.poNumber
                    ? `
                <div class="detail-row">
                  <span class="label">PO Number:</span>
                  <span class="value">${additional.poNumber}</span>
                </div>
                `
                    : ""
                }
                ${
                  additional.refNumber
                    ? `
                <div class="detail-row">
                  <span class="label">Reference:</span>
                  <span class="value">${additional.refNumber}</span>
                </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
          
          <div class="address-section">
            <div class="address-block">
              <div class="address-header">From</div>
              <div>
                <div style="font-weight: bold;">${businessName || "Your Business"}</div>
                <div>${businessAddress?.replace(/\n/g, "<br>") || "Business Address"}</div>
                ${businessEmail ? `<div>Email: ${businessEmail}</div>` : ""}
                ${businessPhone ? `<div>Phone: ${businessPhone}</div>` : ""}
              </div>
            </div>
            <div class="address-block">
              <div class="address-header">Bill To</div>
              <div>
                <div style="font-weight: bold;">${invoice.client?.name || "Client Name"}</div>
                <div>${invoice.client?.address?.replace(/\n/g, "<br>") || "Client Address"}</div>
                ${invoice.client?.email ? `<div>Email: ${invoice.client.email}</div>` : ""}
                ${invoice.client?.phone ? `<div>Phone: ${invoice.client.phone}</div>` : ""}
              </div>
            </div>
          </div>
          
          ${
            shipping
              ? `
          <div class="shipping-section">
            <div class="section-header">Shipping Information</div>
            <div class="shipping-details">
              ${
                shipping.from
                  ? `
              <div class="shipping-column">
                <div style="font-weight: 600; margin-bottom: 5px;">Ship From:</div>
                <div>${shipping.from.name || ""}</div>
                <div>${shipping.from.address || ""}</div>
                <div>${shipping.from.city || ""}, ${shipping.from.state || ""} ${shipping.from.postal || ""}</div>
                <div>${shipping.from.country || ""}</div>
                ${shipping.from.warehouse ? `<div>Warehouse: ${shipping.from.warehouse}</div>` : ""}
              </div>
              `
                  : ""
              }
              
              ${
                shipping.to
                  ? `
              <div class="shipping-column">
                <div style="font-weight: 600; margin-bottom: 5px;">Ship To:</div>
                <div>${shipping.to.name || ""}</div>
                <div>${shipping.to.address || ""}</div>
                <div>${shipping.to.city || ""}, ${shipping.to.state || ""} ${shipping.to.postal || ""}</div>
                <div>${shipping.to.country || ""}</div>
              </div>
              `
                  : ""
              }
            </div>
          </div>
          `
              : ""
          }
          
          ${
            gst
              ? `
          <div class="gst-section">
            <div class="section-header">GST Details</div>
            <div class="gst-details">
              <div class="gst-column">
                <div><span class="label">Tax Type:</span> ${gst.type || "GST"}</div>
                <div><span class="label">Place of Supply:</span> ${gst.placeOfSupply || "Not specified"}</div>
              </div>
              <div class="gst-column">
                <div><span class="label">GST Type:</span> ${gst.gstType || "Not specified"}</div>
                <div><span class="label">GST Number:</span> ${gst.gstNumber || "Not specified"}</div>
              </div>
              ${
                gst.reverseCharge || gst.nonGstClient
                  ? `
              <div class="gst-column" style="flex-basis: 100%;">
                ${gst.reverseCharge ? `<div>✓ Reverse Charge Applicable</div>` : ""}
                ${gst.nonGstClient ? `<div>✓ Non-GST Registered Client</div>` : ""}
              </div>
              `
                  : ""
              }
            </div>
          </div>
          `
              : ""
          }
          
          ${
            transport
              ? `
          <div class="shipping-section">
            <div class="section-header">Transport Details</div>
            <div class="shipping-details">
              <div class="shipping-column">
                ${transport.transporter ? `<div class="transport-details"><span class="label">Transporter:</span> ${transport.transporter}</div>` : ""}
                ${transport.distance ? `<div class="transport-details"><span class="label">Distance:</span> ${transport.distance}</div>` : ""}
                ${transport.mode ? `<div class="transport-details"><span class="label">Mode:</span> ${transport.mode}</div>` : ""}
              </div>
              <div class="shipping-column">
                ${transport.vehicleType ? `<div class="transport-details"><span class="label">Vehicle Type:</span> ${transport.vehicleType}</div>` : ""}
                ${transport.vehicleNumber ? `<div class="transport-details"><span class="label">Vehicle Number:</span> ${transport.vehicleNumber}</div>` : ""}
                ${transport.transactionType ? `<div class="transport-details"><span class="label">Transaction Type:</span> ${transport.transactionType}</div>` : ""}
              </div>
            </div>
          </div>
          `
              : ""
          }
          
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th class="amount-column">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${
                  invoice.invoice_items
                    ? invoice.invoice_items
                        .map(
                          (item) => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(Number(item.unit_price))}</td>
                  <td class="amount-column">${formatCurrency(Number(item.amount))}</td>
                </tr>
                `,
                        )
                        .join("")
                    : ""
                }
              </tbody>
            </table>
          </div>
          
          <div class="summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>${formatCurrency(totalAmount)}</span>
            </div>
            
            <div class="summary-row total-row">
              <span>Total:</span>
              <span>${formatCurrency(totalAmount)}</span>
            </div>
          </div>
          
          ${
            payment && (payment.bank || payment.upi)
              ? `
          <div class="payment-section">
            <div class="section-header">Payment Information</div>
            <div class="payment-methods">
              ${
                payment.bank && payment.bank.accountNumber
                  ? `
              <div class="payment-column">
                <div style="font-weight: 600; margin-bottom: 5px;">Bank Transfer</div>
                ${payment.bank.bankName ? `<div>Bank Name: ${payment.bank.bankName}</div>` : ""}
                ${payment.bank.accountNumber ? `<div>Account Number: ${payment.bank.accountNumber}</div>` : ""}
                ${payment.bank.accountHolderName ? `<div>Account Name: ${payment.bank.accountHolderName}</div>` : ""}
                ${payment.bank.ifscCode ? `<div>IFSC Code: ${payment.bank.ifscCode}</div>` : ""}
                ${payment.bank.branchName ? `<div>Branch: ${payment.bank.branchName}</div>` : ""}
              </div>
              `
                  : ""
              }
              
              ${
                payment.upi && payment.upi.id
                  ? `
              <div class="payment-column">
                <div style="font-weight: 600; margin-bottom: 5px;">UPI Payment</div>
                ${payment.upi.id ? `<div>UPI ID: ${payment.upi.id}</div>` : ""}
                ${payment.upi.name ? `<div>Name: ${payment.upi.name}</div>` : ""}
              </div>
              `
                  : ""
              }
            </div>
          </div>
          `
              : ""
          }
          
          ${
            invoice.notes
              ? `
          <div class="notes">
            <div class="notes-header">Notes</div>
            <div>${invoice.notes}</div>
          </div>
          `
              : ""
          }
          
          ${
            invoice.terms
              ? `
          <div class="terms">
            <div class="notes-header">Terms & Conditions</div>
            <div>${invoice.terms}</div>
          </div>
          `
              : ""
          }
          
          ${signatureHtml}
          
          <div class="footer">
            Thank you for your business!
          </div>
        </div>
      </body>
      </html>
      `;
    } catch (error) {
      console.error("Error generating invoice HTML:", error);
      return `<html><body><h1>Error generating invoice</h1><p>${error}</p></body></html>`;
    }
  }
}

export default InvoicePrintRenderer;
