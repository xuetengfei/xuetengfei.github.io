> The Lorem Ipsum for photos.

[Lorem Picsum](https://picsum.photos/)

> cnode job

```javascript
const api =
  'https://cnodejs.org/api/v1/topics?tab=job&&limit=10&&mdrender=false';
```

> Random User Generator

```javascript
https://www.randomuser.me/
```

```javascript
async () => {
  try {
    let userprofile = await API.get('https://www.randomuser.me/', {
      params: {
        results: 10,
        // inc: payload
      },
    });
    console.log('userprofile: ', userprofile);
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
  }
};
```

```javascript
$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: function (data) {
    console.log(data);
  },
});
```
