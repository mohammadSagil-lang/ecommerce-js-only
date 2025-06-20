export let deliveryOptions = [
  {
    deliveryId: '1',
    days: 7,
    priceCents: 0,
  },
  {
    deliveryId: '2',
    days: 3,
    priceCents: 499,
  },
  {
    deliveryId: '3',
    days: 1,
    priceCents: 999,
  },
];
export function getOption(cartItem){
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.deliveryId === cartItem.deliveryId) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
}