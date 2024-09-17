//function to convert camelCase to titleCase
export function camelCaseToTitleCase(camelCaseString: string): string {
  // Insert a space before each uppercase letter and convert the first letter to uppercase
  return camelCaseString
    .replace(/([A-Z])/g, " $1") // Insert space before each uppercase letter
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export function sortByKey(
  array: any[],
  key: string,
  direction: "asc" | "desc" | undefined,
) {
  const dir = direction === "desc" ? -1 : 1;
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 * dir : x > y ? 1 * dir : 0;
  });
}
