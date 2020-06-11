[css-in-js:css Module ](/CSS/css-Module)

## 1. Styled Components

```javascript
// component.js
import React from 'react';
import styled from 'styled-components';
const Heading = styled.h1`
  color: gray;
  font-size: 1.5em;
`;
const Paragraph = styled.p`
  font-size: 1.1em;
`;
const Article = () => {
  return (
    <div>
      <Heading>Heading</Heading>
      <Paragraph>Article's text</Paragraph>
    </div>
  );
};
```

---
