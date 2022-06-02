export function sleep(timer = 3000) {
  return new Promise(resolve => {
    setTimeout(resolve, timer);
  });
}
