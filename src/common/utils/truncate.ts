export function truncate(text, length) {
  if (text.toString().length > length) {
    return text.toString().substring(0, length) + "...";
  } else {
    return text;
  }
}
