function getLatestDay(): number {
  const files = Deno.readDirSync('./src/days');
  const days = Array.from(files).map((file) => parseInt(file.name));
  return Math.max(...days);
}

function copyFiles(day: number) {
  // Copy files from template folder, paste them into days folder
  const templateFiles = Deno.readDirSync('./scripts/newDay/template');
  const templateFilesArray = Array.from(templateFiles);
  templateFilesArray.forEach((file) => {
    const templateFile = Deno.readTextFileSync(`./scripts/new

}

const currentDay = getLatestDay() + 1;
