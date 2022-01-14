# DSP

```runHiddenJS
const window.c = new AudioContext();
const window.hello = "Hello world.";
```

## First visible code block

```runJS

play(window.c, sum(sine(300, .5), sine(600, 0.25, .3), sine(1200, 0.15, 0.6), sine(2400, 0.07)), 0.5);


```


## Second code block

```runJS
message(window.hello);
play(window.c, square(300));
```


<script src="lib.js"></script>
<script src="make-runnable.js"></script>

