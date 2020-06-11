switch...case 想必也是经常会用到的句式，其实稍微细看一下就会发现，这和对象键值对很像，改成 Object 或者 map 简洁多了。代码更少，不需要考虑 switch break case,提高可读性。

```javascript
/* apply - 1 */
const dogSwitch = breed => {
    switch (breed) {
        case 'border':
            return 'Border Collies are good boys and girls.';
            break;
        case 'pitbull':
            return 'Pit Bulls are good boys and girls.';
            break;
        case 'german':
            return 'German Shepherds are good boys and girls.';
            break;
    }
};
dogSwitch('border'); // "Border Collies are good boys and girls."

const dogSwitch = breed =>
    ({
        border: 'Border Collies are good boys and girls.',
        pitbull: 'Pit Bulls are good boys and girls.',
        german: 'German Shepherds are good boys and girls.',
    }[breed]);
dogSwitch('border'); // "Border Collies are good boys and girls."
```

```javascript
/* apply - 2 */
// Switch
let createType = null;
switch (contentType) {
    case 'post':
        createType = () => console.log('creating a post...');
        break;
    case 'video':
        createType = () => console.log('creating a video...');
        break;
    default:
        createType = () => console.log('unrecognized content type');
}

createType();

// Object literal
const contentTypes = {
    post: () => console.log('creating a post...'),
    video: () => console.log('creatinga  video...'),
    default: () => console.log('unrecognized content type'),
};

const createType = contentTypes[contentType] || contentTypes['default'];
createType();
```
