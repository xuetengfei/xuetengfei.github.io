function sumFloat(a, b) {
  const MIN = Math.min(a, b).toString();
  const SIZE = MIN.slice(MIN.indexOf('.') + 1).length;
  const ZOOMIN = Math.pow(10, SIZE);
  return (a * ZOOMIN + b * ZOOMIN) / ZOOMIN;
}
console.log(sumFloat(0.1, 0.2)); // 0.3
console.log(0.1 + 0.2); // 0.30000000000000004
