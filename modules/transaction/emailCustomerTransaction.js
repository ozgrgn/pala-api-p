export const emailCustomerTransaction = (no) => {
  return `
  <h2>Pala Export B2B Sisteminden Göndermiş Olduğunuz Sipariş Oluşturuldu<h2>
  <p>${no} numaralı sipariş talebiniz ile ilgili detaylara <a href="https://b2b.palaexport.de/store/history">buradan</a> ulaşabilirsiniz. <p>
   
  `
}
console.log()
export default emailCustomerTransaction