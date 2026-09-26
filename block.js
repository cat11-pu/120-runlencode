// block.js：回填（按段展开，游程段重复 value 共 count 个，字面段照抄 values）
export function decode(segments) {
  const values = [];
  for (const segment of segments) {
    if (segment.kind === "run") {
      for (let at = 0; at < segment.count; at += 1) values.push(segment.value);
    } else {
      for (const value of segment.values) values.push(value);
    }
  }
  return values;
}
