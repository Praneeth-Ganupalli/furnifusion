const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits:0
  });
export const getFormattedPrice=(price)=>formatter.format(price);