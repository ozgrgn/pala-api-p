export const emailTransaction = (customer, phone, date, total, kdv,generalTotal,no) => {
  return `
  <h2>Yeni Satış Kaydı <h2>
    <table>
    <thead>
      <tr>
      <td  style="padding-left: 20px;"><strong>Tarih</strong></td>
      <td  style="padding-left: 20px;"><strong>Satış No</strong></td>
      <td  style="padding-left: 20px;"><strong>Müşteri</strong></td>
      <td  style="padding-left: 20px;"><strong>Telefon</strong></td>
      <td  style="padding-left: 20px;"><strong>Tutar</strong></td>
      <td  style="padding-left: 20px;"><strong>KDV</strong></td>
      <td  style="padding-left: 20px;"><strong>Toplam</strong></td>

      </tr>
    </thead>
    <tbody>
      <tr>
      <td  style="padding-left: 20px;">${date}</td>
      <td  style="padding-left: 20px;">${no}</td>
      <td  style="padding-left: 20px;">${customer}</td>
      <td  style="padding-left: 20px;">${phone}</td>
      <td  style="padding-left: 20px;">${total}</td>
      <td  style="padding-left: 20px;">${kdv}</td>
      <td  style="padding-left: 20px;">${generalTotal}</td>
       
      </tr>
    </tbody>
  </table>
  `
}
console.log()
export default emailTransaction