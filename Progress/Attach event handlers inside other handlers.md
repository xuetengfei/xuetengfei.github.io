```javascript
const handleClick = function () {
  // Open the modal
};

const handleKeydown = function (e) {
  // Close the modal if the Escape key is pressed
};

// Assume that `buttonEle` represents the button element
buttonEle.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
```

```javascript
let isModalOpened = false;

const handleClick = function () {
  // Turn on the flag
  isModalOpened = true;
  // Open the modal ...
};

const handleKeydown = function (e) {
  // Check if the modal is opened first
  if (isModalOpened) {
    // Check the pressed key ...
  }
};
```

```javascript
const handleClick = function () {
  document.addEventListener('keydown', handleKeydown);
};
```
