export const emailNewCustomer = (date,name, person,phone,mail,country,city) => {
  return `
    <table>
    <thead>
      <tr>
      <td  style="padding-left: 20px;"><strong>Tarih</strong></td>
      <td  style="padding-left: 20px;"><strong>Firma</strong></td>
      <td  style="padding-left: 20px;"><strong>Yetkili</strong></td>
      <td  style="padding-left: 20px;"><strong>Telefon</strong></td>
      <td  style="padding-left: 20px;"><strong>Mail</strong></td>
      <td  style="padding-left: 20px;"><strong>Ülke</strong></td>
      <td  style="padding-left: 20px;"><strong>Şehir</strong></td>


      </tr>
    </thead>
    <tbody>
      <tr>
      <td  style="padding-left: 20px;">${date}</td>
      <td  style="padding-left: 20px;">${name}</td>
      <td  style="padding-left: 20px;">${person}</td>
      <td  style="padding-left: 20px;">${phone}</td>
      <td  style="padding-left: 20px;">${mail}</td>
      <td  style="padding-left: 20px;">${country}</td>
      <td  style="padding-left: 20px;">${city}</td>

       
      </tr>
    </tbody>
  </table>
  `
}
console.log()
export default emailNewCustomer