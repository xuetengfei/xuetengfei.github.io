```javascript
/**
|--------------------------------------------------
| 电话、短信验证码、图片验证码校验
|--------------------------------------------------
*/
export const verifyMobile = param => {
  const Pattern = /0?(13|14|15|16|17|18|19)[0-9]{9}/;
  return Pattern.test(param);
};

export const verifyMessageCode = param => {
  const Pattern = /^\d{6}$/;
  return Pattern.test(param);
};

export const verifyImgCode = param => {
  const Pattern = /^\d{4}$/;
  return Pattern.test(param);
};
```

```javascript
if (!verifyMoViewile(phone)) {
  ShowToast({
    title: '请检查手机号码格式',
    duration: 2000,
  });
  return;
}

if (!verifyImgCode(imgCode)) {
  ShowToast({
    title: '请填写图片验证码',
    duration: 2000,
  });
  return;
}
```
