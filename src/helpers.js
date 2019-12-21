/**
 * Функция возвращает рандомное число из заданного диапазона
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
