```javascript
const arr = [
  {
    weather: 'Sunny',
    date: '01-01',
  },
  {
    weather: 'Cloudy',
    date: '01-02',
  },
  {
    weather: 'Rainy',
    date: '01-03',
  },
  {
    weather: 'Cloudy',
    date: '01-04',
  },
  {
    weather: 'Rainy',
    date: '01-05',
  },
  {
    weather: 'Cloudy',
    date: '01-06',
  },
  {
    weather: 'Rainy',
    date: '01-07',
  },
  {
    weather: 'Sunny',
    date: '01-08',
  },
];

const groupByWeather = arr => {
  const result = {};

  arr.forEach(element => {
    if (!result.hasOwnProperty(element.weather)) {
      result[element.weather] = [];
    }
    result[element.weather].push(element);
  });

  return result;
};
console.log(groupByWeather(arr));

/* 

 {
  Sunny: [
    { weather: 'Sunny', date: '01-01' },
    { weather: 'Sunny', date: '01-08' }
  ],
  Cloudy: [
    { weather: 'Cloudy', date: '01-02' },
    { weather: 'Cloudy', date: '01-04' },
    { weather: 'Cloudy', date: '01-06' }
  ],
  Rainy: [
    { weather: 'Rainy', date: '01-03' },
    { weather: 'Rainy', date: '01-05' },
    { weather: 'Rainy', date: '01-07' }
  ]
}

*/
```
