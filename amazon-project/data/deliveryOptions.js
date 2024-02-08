import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  });
  return deliveryOption;
};

// Find delivery date
export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let arrivalDay = dayjs();
  let transitDays = deliveryOption.deliveryDays;
  
  // Takes into consideration business days
  while(transitDays!==0){
    arrivalDay = arrivalDay.add(1, 'days');
    if(!isWeekend(arrivalDay)){
      transitDays-=1;
    }
  };

  const dateString = arrivalDay.format('dddd, MMMM D');
  return dateString;
};

// 15e; Create a function is Weekend(date)
// takes DayJs object and returns whether the date is 'Saturday' or 'Sunday'
export function isWeekend(dayJsObject){
  let dayofweek = dayJsObject.format('dddd');
  if (dayofweek==='Saturday'||dayofweek==='Sunday'){
    return true
  };
  return false;
};
