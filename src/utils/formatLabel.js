export default function formatLabel(text = "") {
  return text
    .replace(/[_-]/g, " ")        // replace _ and - with space
    .split(" ")                    // split by space
    .filter(Boolean)               // remove empty strings
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");                    // join with space
}
