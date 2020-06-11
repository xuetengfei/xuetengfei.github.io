调整页面宽度，或者在不同屏幕尺寸的设备上 (PC，手机) 尝试浏览器本页，你会发现下面的表格呈现出自适应布局特征，能够自动的使用不同的屏幕尺寸，数据的表现不会因为屏幕大小变化而变得不合适

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>演示：纯 CSS 实现自适应布局表格</title>
    <style type="text/css">
      body {
        font-family: arial;
      }

      table {
        border: 1px solid #ccc;
        width: 80%;
        margin: 0;
        padding: 0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0 auto;
      }

      table tr {
        border: 1px solid #ddd;
        padding: 5px;
      }

      table th,
      table td {
        padding: 10px;
        text-align: center;
      }

      table th {
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 1px;
      }

      @media screen and (max-width: 600px) {
        table {
          border: 0;
        }

        table thead {
          display: none;
        }

        table tr {
          margin-bottom: 10px;
          display: block;
          border-bottom: 1px solid #ddd;
        }

        table td {
          display: block;
          text-align: right;
          font-size: 13px;
          border-bottom: 1px dotted #ccc;
        }

        table td:last-child {
          border-bottom: 0;
        }

        table td:before {
          content: attr(data-label);
          float: left;
          text-transform: uppercase;
          font-weight: bold;
        }
      }

      .note {
        max-width: 80%;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="note"><h1>演示：纯 CSS 实现自适应布局表格</h1></div>

    <table>
      <thead>
        <tr>
          <th>支付</th>
          <th>日期</th>
          <th>金额</th>
          <th>周期</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="支付">支付-1</td>
          <td data-label="日期">02/01/2015</td>
          <td data-label="金额">￥2,311</td>
          <td data-label="周期">01/01/2015 - 01/31/2015</td>
        </tr>
        <tr>
          <td data-label="支付">支付-2</td>
          <td data-label="日期">03/01/2015</td>
          <td data-label="金额">￥3,211</td>
          <td data-label="周期">02/01/2015 - 02/28/2015</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

<a href="../html/css-custom-data.html"  target="_blank">查看效果</a>
