// app.js：渲染结果
import { encode } from "./rle.js";
import { decode } from "./block.js";

export function render(spec) {
  const values = spec.values || [];
  const segments = encode(values, spec.min_run || 0);
  const back = decode(segments);
  return { segments: segments, segment_count: segments.length,
           runs: segments.filter((item) => item.kind === "run").length,
           literals: segments.filter((item) => item.kind === "literal").length,
           literal_values: segments.reduce((total, item) => total + (item.kind === "literal" ? item.values.length : 0), 0),
           round_trip: JSON.stringify(back) === JSON.stringify(values) };
}
