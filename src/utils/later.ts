export function later(delay: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
