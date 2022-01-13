# DSP

This is a test. When this page loaded, you should have heard a tone, if you didn't, then either your audio system isn't working correctly, or for some reason your browser doesn't like this page.  If other audio plays on your machine, then it's most likely the browser.

This page has been tested in recent chrome and firefox and seems to work in both browsers. It has not been tested in Microsoft browsers!


Try to modify the following code:

- either tab till the code appears in a text input area, or click on it and see if it appears
- add a double slash (//) in front of the first "play(" line
- remove the double slash in front of the second
- click "run" or simply tab and run will be automatically focused
- click or press enter on run

You should hear a different sounding tone.


```runJS
const c = new AudioContext();

play(c, sum(sine(300, .5), sine(600, 0.25, .3), sine(1200, 0.15, 0.6), sine(2400, 0.07)), 0.5);

//play(c, square(300), 0.5);

```

<script src="../make-runnable.js"></script>

