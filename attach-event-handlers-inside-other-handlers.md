# Attach Event Handlers Inside Other Handlers

```javascript
const handleClick = function () {
  // Open the modal
};

const handleKeydown = function (e) {
  // Close the modal if the Escape key ispressed
};

// Assume that `buttonEle` represents the button element
buttonEle.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
```

The handleKeydown handler depends on handleClick because we only check the
pressed key if the modal is already opened. It's a common way to add a flag to
track if the modal is opened or not:

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

More elements, more dependent events and more flags! As the result, it's more
difficult to maintain the code.

Instead of adding event separately at first, we add an event handler right
inside another one which it depends on. Here is how the tip approaches:

```javascript
const handleClick = function () {
  document.addEventListener('keydown', handleKeydown);
};
```

No flag at all! The code is more readable and easier to understand.

from network blog
