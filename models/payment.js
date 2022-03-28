/**
 * class payment
 * use to stucture a payment
 * take 3 parameters:
 * *{string} id: id of the payment
 * *{string} imageUrl: the image of the payment
 * *{string} amount: amount of the payment
 */
class Payment {
  constructor(id, imageUrl, amount) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.amount = amount;
  }
}

export default Payment;
