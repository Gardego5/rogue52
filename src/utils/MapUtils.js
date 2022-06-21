export function keyToCoords(key) {
  let parts = key.split(',');
  return {
    x: parseInt(parts[0]),
    y: parseInt(parts[1]),
  };
}