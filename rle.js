// rle.js：游程编码（单次扫描，连续相同达到最小游程压成游程段，其余并入字面段）
export function encode(values, minRun) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("values must be a non-empty array");
    error.code = "E_EMPTY_INPUT";
    throw error;
  }
  if (typeof minRun !== "number" || minRun < 2) {
    const error = new Error("minRun must be at least 2");
    error.code = "E_BAD_MIN_RUN";
    throw error;
  }
  const segments = [];
  let literals = [];
  function flushLiterals() {
    if (literals.length > 0) {
      segments.push({ kind: "literal", values: literals });
      literals = [];
    }
  }
  let start = 0;
  while (start < values.length) {
    let end = start + 1;
    while (end < values.length && values[end] === values[start]) {
      end += 1;
    }
    const count = end - start;
    if (count >= minRun) {
      flushLiterals();
      segments.push({ kind: "run", value: values[start], count: count });
    } else {
      for (let spot = start; spot < end; spot += 1) {
        literals.push(values[spot]);
      }
    }
    start = end;
  }
  flushLiterals();
  return segments;
}
