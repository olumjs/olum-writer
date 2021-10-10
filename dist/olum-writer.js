/**
 * @name olum-writer
 * @version 0.0.5
 * @copyright 2021
 * @author Eissa Saber
 * @license MIT
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else if (typeof define === "function" && define.amd) define(factory);
  else root.OlumWriter = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function OlumWriter(options) {
    var $this = this;

    $this.init = function () {
      function sentence_recursive(sentence_num) {
        $this.text = "";
        var sentence = options.sentences[sentence_num];
        var lettersArr = $this.mkArr(sentence);

        function letter_recursive(letter_num) {
          // inject text to UI
          $this.text += lettersArr[letter_num];
          options.container.textContent = $this.text;

          if (letter_num + 1 <= lettersArr.length - 1) { // next letter
            setTimeout(function () {
              letter_recursive(letter_num + 1);
            }, options.speed / sentence.length);
          } else { // if reached the last letter of a sentence

            // reverse
            if (options.reverse === true) {

              function letter_rev_recursive(letter_rev_num) {

                // inject text to UI
                setTimeout(function () {
                  lettersArr.pop();
                  $this.text = lettersArr.join("");
                  options.container.textContent = $this.text;
                }, options.interval);

                if (letter_rev_num + 1 <= sentence.length - 1) { // prev letter
                  setTimeout(function () {
                    letter_rev_recursive(letter_rev_num + 1);
                  }, options.speed / sentence.length);

                } else { // end ???
                  if (sentence_num + 1 <= options.sentences.length - 1) { // next sentence
                    setTimeout(function () {
                      sentence_recursive(sentence_num + 1);
                    }, options.interval);
                  } else { // if reached the last sentence then start over
                    setTimeout(function () {
                      sentence_recursive(0);
                    }, options.interval);
                  }
                }
              }
              letter_rev_recursive(0);

            } else {
              if (sentence_num + 1 <= options.sentences.length - 1) { // next sentence
                setTimeout(function () {
                  sentence_recursive(sentence_num + 1);
                }, options.interval);
              } else { // if reached the last sentence then start over
                setTimeout(function () {
                  sentence_recursive(0);
                }, options.interval);
              }
            }

          }
        }
        letter_recursive(0);
      }
      sentence_recursive(0);
    };

    $this.mkArr = function (string) {
      var arr = [];
      if (string.length) {
        for (let i = 0; i < string.length; i++) {
          arr.push(string[i]);
        }
      }
      return arr;
    };

    $this.style = function () {
      var style = document.createElement("style");
      var className = options.container.className;
      var id = options.container.id;
      var selector = id ? "#" + id : "." + className;
      style.innerHTML =
        `${selector} {
          position: relative;
          font-weight: bold;
          /* must be the same */
          line-height: 25px;
          display: inline !important;
        }
        ${selector}::after {
          position: absolute;
          content: "";
          width: 10px;
          /* must be the same */
          height: 25px;
          margin-left: 5px;
          background: black;
          -webkit-animation: blink 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          animation: blink 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }
        @-webkit-keyframes blink {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }
        @keyframes blink {
          from {
            visibility: hidden;
          }
          to {
            visibility: visible;
          }
        }`;
      document.body.append(style);
    }

    if (!options) {
      console.error("Missing options object!");
    } else if (!options.container) {
      console.error("Container element is missing or null");
    } else if (!options.sentences) {
      console.error("Missing sentences Array");
    } else if (!options.sentences.length) {
      console.error("Empty array regarding sentences prop @OlumWriter()");
    } else {
      if (!options.interval) options.interval = 3000;
      if (!options.speed) options.speed = 1000;
      if (!options.reverse) options.reverse = false;
      $this.style();
      $this.init();
    }
  }

  return OlumWriter;
});