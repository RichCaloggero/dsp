document.querySelectorAll("pre > code.language-run, pre > code.language-runJS, pre > code.language-runHiddenJS").forEach(processCodeNode);
removeAnchorLinks();


function processCodeNode (node) {
let _run = null;
let _input = null;

if (node.classList.contains("language-runJS") || node.classList.contains("language-runHiddenJS")) {
//if (!node.hasAttribute("contenteditable")) node.setAttribute("contenteditable", "");
node.tabIndex = 0;
if (node.classList.contains("language-runHiddenJS")) node.hidden = true;
node.insertAdjacentHTML("afterEnd", `<div class="js-controls">
<textarea class="input" cols="80" rows="20" hidden style="zindex:10;"></textarea>
<button class="run">Run</button>
<iframe class="result"></iframe>
</div>
`);

_run = node.nextElementSibling.querySelector(".run");
_input = node.nextElementSibling.querySelector(".input");

_run.addEventListener("click", () => jsRun(node));
node.addEventListener("focus", () => startEditing(node, _input));
_input.addEventListener("blur", () => stopEditing(node, _input));

jsRun(node);

} else {
node.parentElement.insertAdjacentHTML("afterend", `<hr><h3>Demo</h3><br>${node.textContent}<hr>`);
} // if

function jsRun (node) {


const context = node.nextElementSibling.querySelector(".result");
context.srcdoc = `<doctype html>
<html><head>
<meta charset="utf-8">
<title>Results</title>
</head><body>
<script src="lib.js"></script>
<script>
try {
${node.textContent}

} catch (e) {
message(e);
console.error(e);
} // try
</script>
</body></html>
`;

//message("Ready.");
} // jsRun
} // processCodeNode

function addStylesheet (fileName) {
const l = document.createElement("link");
l.setAttribute("href",  fileName);
l.setAttribute("rel", "stylesheet");
l.setAttribute("type", "text/css");
document.querySelector("head").appendChild(l);
} // addStylesheet

function removeAnchorLinks () {
setTimeout(() => {
document.querySelectorAll(".anchorjs-link").forEach(x => x.remove());
}, 0);
} // removeAnchorLinks

function startEditing (node, input) {
const text = node.textContent;
input.value = text;
node.hidden = true;
input.hidden = false;
message("Edit mode enabled.");
input.focus();
} // startEditing

function stopEditing (node, input) {
node.textContent = input.value;
input.hidden = true;
node.hidden = false;
input.parentElement.querySelector(".run").focus();
} // stopEditing

function message (text) {
const _message = document.querySelector("#message");
if (_message) {
_message.textContent = text;
} else {
document.body.insertAdjacentHTML("afterBegin", `<div id="message" aria-live="polite"></div>`);
document.querySelector("#message").textContent = text;
} // if
} // message


