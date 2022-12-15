
type ColorHashProps = {
  r: number
  g: number
  b: number
  rgb: string
  hex: string
}

function colorHash(inputString: string): ColorHashProps {
  let sum = 0;

  for (let i=0;i<inputString.length;i++) {
    sum += inputString.charCodeAt(i);
  }
  /* tslint:disable:no-bitwise */
  const r = ~~(Number(`0.${Math.sin(sum + 1).toString().substr(6)}`)*256);
  const g = ~~(Number(`0.${Math.sin(sum + 2).toString().substr(6)}`)*256);
  const b = ~~(Number(`0.${Math.sin(sum + 3).toString().substr(6)}`)*256);

  const rgb = "rgb("+r+", "+g+", "+b+")";

  let hex = "#";

  hex += ("00" + r.toString(16)).substr(-2,2).toUpperCase();
  hex += ("00" + g.toString(16)).substr(-2,2).toUpperCase();
  hex += ("00" + b.toString(16)).substr(-2,2).toUpperCase();

  return {
    r,
    g,
    b,
    rgb,
    hex
  };
}
export default colorHash;