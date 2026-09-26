// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let minRun = spec.min_run || 3;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，最小游程 " + minRun + "。";

  function draw() {
    const scene = Object.assign({}, spec, { min_run: minRun });
    let view = null;
    try {
      view = render(scene);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.segments.forEach(function (segment, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (segment.kind === "run" ? " ok" : "");
      mark.textContent = segment.kind === "run"
        ? "游程 " + segment.value + " 重复 " + segment.count + " 次"
        : "字面 " + segment.values.join(" ");
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "段数 " + view.segment_count + "，游程段 " + view.runs + " 段，字面段 " + view.literals + " 段";
    parts.log.textContent = "解码与原值一致：" + view.round_trip;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "编码并回填";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const higherButton = document.createElement("button");
  higherButton.textContent = "最小游程加一";
  higherButton.addEventListener("click", function () {
    minRun = minRun + 1;
    draw();
  });
  parts.controls.appendChild(higherButton);

  const lowerButton = document.createElement("button");
  lowerButton.textContent = "最小游程减一";
  lowerButton.addEventListener("click", function () {
    minRun = Math.max(2, minRun - 1);
    draw();
  });
  parts.controls.appendChild(lowerButton);

  const label = document.createElement("label");
  label.textContent = "最小游程";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(minRun);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 2) { minRun = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看段数";
  readButton.addEventListener("click", function () {
    const scene = Object.assign({}, spec, { min_run: minRun });
    const view = render(scene);
    parts.out.textContent = "段数 " + view.segment_count + "，字面值 " + view.literal_values + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
