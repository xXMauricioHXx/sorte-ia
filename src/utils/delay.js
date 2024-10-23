export default function delay(func, time) {
  setTimeout(() => {
    func();
  }, time);
}
