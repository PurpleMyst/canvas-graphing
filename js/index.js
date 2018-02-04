/* jshint esnext: true, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const STEP = 0.001;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("fullscreen");
  document.body.appendChild(canvas);

  const mapRange = (input, input_start, input_end, output_start, output_end) =>
      output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);

  const graph = () => {
    // TODO: This is horrible. Can we have something like Python's
    // ast.literal_eval?
    const f = (x) => eval(functionInput.value);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    console.info("Began drawing");
    for (let x = 0; x < canvas.width; x += STEP) {
      context.fillRect(x, canvas.height - f(mapRange(x, 0, canvas.width, -(canvas.width / 2), canvas.width / 2)), 1, 1);
    }
    console.info("Finished drawing");

    context.fill();
  };
  const button = document.createElement("button");
  button.textContent = "Redraw";
  button.addEventListener("click", graph);

  const functionInput = document.createElement("input");
  functionInput.value = "x";

  document.body.appendChild(button);
  document.body.appendChild(functionInput);

  graph();
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    graph();
  });
});
