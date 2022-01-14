# DSP

```runHiddenJS
global.c = new AudioContext();
global.hello = "Hello world.";
```

## First visible code block

```runJS
play(global.c, sum(sine(300, .5), sine(600, 0.25, .3), sine(1200, 0.15, 0.6), sine(2400, 0.07)), 0.5);
```


## Second code block

```runJS
message(global.hello);
play(global.c, square(300));
```


<script src="lib.js"></script>
<script src="make-runnable.js"></script>

