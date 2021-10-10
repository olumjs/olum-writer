# olum-writer

OlumWriter is a lightweight and flexible library for adding an amazing writing effect to your web apps, written in vanilla js

<p align="center">
 <a href="https://www.npmjs.com/package/olum-writer" target="_blank"><img src="https://img.shields.io/npm/v/olum-writer" alt="npm"></a>
 <img src="https://img.shields.io/npm/dm/olum-writer" alt="npm">
 <img src="https://img.shields.io/npm/l/olum-writer" alt="npm">
</p>

# Documentation

### CDN

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Olum Writer</title>
  </head>

  <body>
    <div id="writer"></div>

    <script src="https://unpkg.com/olum-writer@latest/dist/olum-writer.min.js"></script>
    <script>
      new OlumWriter({
        container: document.getElementById("writer"),
        sentences: ["content one", "content two", "content three"],
        interval: 3000, // optional (time between each sentence)
        speed: 1000, // optional (speed of writing each sentence)
        reverse: false, // optional (enable/disable backward writing), default is false
      });
    </script>
  </body>
</html>
```

### ES6 Module

```javascript
import OlumWriter from "olum-writer";

new OlumWriter({
  container: document.getElementById("writer"),
  sentences: ["content one", "content two", "content three"],
});
```
