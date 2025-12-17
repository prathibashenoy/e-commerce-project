//utils/emailTemplates.js


export const orderSuccessTemplate = ({ name, orderId, items, total }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
      }
      .header {
        text-align: center;
        color: #2c7be5;
      }
      .order-box {
        margin-top: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
      th {
        background-color: #f1f1f1;
      }
      .total {
        text-align: right;
        font-size: 18px;
        font-weight: bold;
        margin-top: 15px;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h2 class="header">🎉 Payment Successful!</h2>

      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for your order. Your payment was successful.</p>

      <p><strong>Order ID:</strong> ${orderId}</p>

      <div class="order-box">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>

        <p class="total">Total Paid: ₹${total}</p>
      </div>

      <p>We’ll notify you once your order is shipped.</p>

      <p>Happy Shopping! 🛍️</p>

      <div class="footer">
        © ${new Date().getFullYear()} Demo Shop. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
