

function sine (frequency, amplitude = 1, phase = 0) {return t => amplitude * Math.sin(frequency * 2*Math.PI * t + phase);}

function periodic (func = Math.sin, frequency = t => 300, amplitude = t => 1, phase = t => 0) {
const p2 = 2*Math.PI;
return t => amplitude(t) * func(frequency(t) * p2 * t + phase(t));
} // periodic




function square (frequency, amplitude = 1, phase = 0) {return t => amplitude * Math.sign(Math.sin(frequency * 2 * Math.PI * t + phase));}
 
function square1 (frequency, amplitude = 1, phase = 0) {return sum(
sine(frequency, amplitude/2, phase),
sine(3*frequency, amplitude/4, phase),
sine(5*frequency, amplitude/8, phase),
sine(7*frequency, amplitude/16, phase)
);} // square1


function sum (...signals) {
return t => signals.reduce(
(_sum, signal) => _sum += signal(t),
0) // reduce
} // sum

function series (frequency, type = 0, count = 1,
freqDecay = f => 2*f,
ampDecay = a => 1/Math.pow(Math.E,a)
) {
const signals = [];
for (let i=0; i<count; i++) {
const a = ampDecay(i);
let f = freqDecay(i) + type%2;
if (f === 0) f = 1;
signals[i] = sine(f * frequency, a);
} // for
return sum(...signals);
} // series

function play (context, func, duration = 1) {
const sampleRate = context.sampleRate;
const sig = func instanceof Function? signal(func, 1/sampleRate)
: func;

const buffer = context.createBuffer(1, duration * sampleRate, sampleRate);
buffer.copyToChannel(eval(sig, duration, sampleRate), 0);

const node = context.createBufferSource();
node.buffer = buffer;
node.connect(context.destination);
node.onended = () => node.disconnect();
node.start();
} // play

function eval (sig, duration, sampleRate) {
const count = duration * sampleRate;
const data = new Float32Array(count);
for (let i=0; i<count; i++) data[i] = sig.next().value;
return data;
} // eval

function* signal (func, dt, t = 0) {
while (true) {
try {
const sample = func(t);
t += dt;
yield sample;

} catch (e) {
if (typeof(e) === "number") {
t = e;
yield true;
} else if (e instanceof Object && not(e instanceof Array)) {
({dt, t} = e);
dt = e.dt;
yield true;
} else {
throw new Error("signal generator needs numeric or object to reset");
} // if
} // catch
} // while
} // signal

function* signal1 (func, stepper, t = 0) {
if (not(stepper instanceof Function) || not(func instanceof Function)) throw new Error("both arguments must be functions of a single variable");
while (true) {
const sample = func(t);
t = stepper(t);
yield sample;
} // while
} // signal1



function sin_s (x, l = -1.0, u = 1.0) {return scale(Math.sin(x), -1,1, l,u);}
function cos_s (x, l=-1.0, u=1.0) {return scale(Math.cos(x), -1,1, l,u);}
function random_s (a=0, b=1) {return scale(Math.random(), 0,1, a,b);}

function scale (x, _in1,_in2, _out1,_out2) {
const in1 = Math.min(_in1, _in2);
const in2 = Math.max(_in1, _in2);
const out1 = Math.min(_out1, _out2);
const out2 = Math.max(_out1, _out2);
const f = Math.abs(out1-out2) / Math.abs(in1-in2);
//console.debug("factor: ", f);

return f * (x-in1) + out1;
} // scale

function not(x) {return !Boolean(x);}



function compileFunction (text, parameter = "t") {
let _function = null;

try {
_function = new Function (parameter,
`with (automationData) {
function  scale (x, _in1,_in2, _out1,_out2) {
const in1 = Math.min(_in1, _in2);
const in2 = Math.max(_in1, _in2);
const out1 = Math.min(_out1, _out2);
const out2 = Math.max(_out1, _out2);
const f = Math.abs(out1-out2) / Math.abs(in1-in2);

return f * Math.abs(x-in1) + out1;
} // scale

function s (x, l=-1.0, u=1.0) {return scale(Math.sin(x), -1,1, l,u);}
function c (x, l=-1.0, u=1.0) {return scale(Math.cos(x), -1,1, l,u);}
function r(a=0, b=1) {return scale(Math.random(), 0,1, a,b);}

return (${text});
} // with automationData
`); // new Function
_function(0); // test
return _function;

} catch (e) {
console.error(`invalid function : ${text};
${e}
`);
return null;
} // try

return _function;
} // compileFunction


function button (label = "", controls, on, off) {
const b = document.createElement("button");
b.textContent = label;

if (not(on) && not(off)) throw new Error("button needs at least on or off callbacks");
if (on instanceof Function && off instanceof Function) {
b.setAttribute("aria-pressed", "false");
b.addEventListener("click", e => {
const element = toggle(e.target, controls);
if (element) controls = element;
});

} else if (on instanceof Function) {
b.addEventListener("click", () => () => {
const element = on(controls)
if (element) controls = element;
});
} // if
return b;

function toggle (button, controls) {
const state = getState(button);
const element = state? off(controls) : on(controls);
setState(button, not(state));
return element;
} // toggle
} // button



function $ (s, c = document) {return c.querySelector(s);}

function $$ (s, c = document) {return [...c.querySelectorAll(s)];}


function getState (b) {return b.getAttribute("aria-pressed") === "true";}
function setState (b, state) {b.setAttribute("aria-pressed", state? "true" : "false");}

