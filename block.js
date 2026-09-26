// block.js：回填（按段展开：游程段重复 count 次，字面段照抄）
export function decode(segments) {
  const values = [];
  for (const segment of segments) {
    if (segment.kind === "run") {
      for (let times = 0; times < segment.count; times += 1) {
        values.push(segment.value);
      }
    } else if (segment.kind === "literal") {
      for (const value of segment.values) {
        values.push(value);
      }
    }
  }
  return values;
}
