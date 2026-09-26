// rle.js：游程编码（单次扫描，连续相同值达到最小游程压成游程段，其余并入字面段）
export function encode(values, minRun) {
  if (minRun < 2) {
    const error = new Error("min_run must be at least 2");
    error.code = "E_BAD_MIN_RUN";
    throw error;
  }
  if (!values || values.length === 0) {
    const error = new Error("values must not be empty");
    error.code = "E_EMPTY_INPUT";
    throw error;
  }
  const segments = [];
  let literals = [];
  let index = 0;
  while (index < values.length) {
    const value = values[index];
    let end = index + 1;
    while (end < values.length && values[end] === value) end += 1;
    const count = end - index;
    if (count >= minRun) {
      if (literals.length > 0) {
        segments.push({ kind: "literal", values: literals });
        literals = [];
      }
      segments.push({ kind: "run", value: value, count: count });
    } else {
      for (let at = index; at < end; at += 1) literals.push(values[at]);
    }
    index = end;
  }
  if (literals.length > 0) segments.push({ kind: "literal", values: literals });
  return segments;
}
