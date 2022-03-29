/**
 * class payment
 * use to stucture a payment
 * take 4 parameters:
 * *{string} id: id of the payment
 * *{string} imageUrl: the image of the payment
 * *{string} amount: amount of the payment
 * *{string} userId: id of the user who made the payment
 */
class Payment {
  constructor(id, ownerId, imageUrl, amount) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.amount = amount;
  }
}

export default Payment;
