function splitStringWithColor(dateString: string): string {
  const chunks: string[] = dateString.split(" ");

  const colors: string[] = [
    "red",
    "blue",
    "green",
    "purple",
    "orange",
    "pink",
    "yellow",
    "teal",
    "gray",
    "brown",
  ];

  let result: string = "";

  for (let i = 0; i < chunks.length; i++) {
    const chunk: string = chunks[i] ?? "";
    const color: string = colors[i % colors.length] ?? "";
    result += `<span style="color: ${color}">${chunk}</span> `;
  }

  return result.trim();
}

const dateString: string = "May 15, 2023 7:31:46 PM";
const formattedString: string = splitStringWithColor(dateString);
console.log(formattedString);

const a = new Map();
a.set(1, "1");
console.log(a.get(1));
