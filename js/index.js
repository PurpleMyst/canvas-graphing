/* jshint esnext: true, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const STEP = 0.1;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("fullscreen");
  document.body.appendChild(canvas);

  const $graphButton = document.getElementById("graphButton");
  const $function = document.getElementById("function");
  const $inputDomainStart = document.getElementById("inputDomainStart");
  const $inputDomainEnd = document.getElementById("inputDomainEnd");
  const $outputDomainStart = document.getElementById("outputDomainStart");
  const $outputDomainEnd = document.getElementById("outputDomainEnd");

  const mapRange = (input, input_start, input_end, output_start, output_end) =>
      output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);

  const graph = () => {
    const f = (x) => eval($function.value);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    const inputDomainStart = +$inputDomainStart.value;
    const inputDomainEnd = +$inputDomainEnd.value;

    const outputDomainStart = +$outputDomainStart.value;
    const outputDomainEnd = +$outputDomainEnd.value;

    console.time("drawing");
    for (let screenX = 0; screenX < canvas.width; screenX += STEP) {
      const mathX = mapRange(screenX,
                             0, canvas.width,
                             inputDomainStart, inputDomainEnd);
      const mathY = f(mathX);
      const screenY = mapRange(mathY, outputDomainStart, outputDomainEnd, canvas.height, 0);
      console.assert(mathY >= outputDomainStart && mathY <= outputDomainEnd, mathY);
      context.fillRect(screenX, screenY, 1, 1);
    }
    console.timeEnd("drawing");

    context.fill();
  };

  $graphButton.addEventListener("click", graph);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if ($function.value.length === 0) return;
    graph();
  });
});
