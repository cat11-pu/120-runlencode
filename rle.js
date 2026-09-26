// rle.js：游程编码（基线：每个值一段，不合并）
export function encode(values, minRun) {
  return values.map((value) => ({ kind: "literal", values: [value] }));
}
