const colors = require("colors");
const prettier = require("prettier");
const jsdiff = require("diff");
const fs = require("fs");

if (!process.argv[2]) {
  console.error("Please specify a filename");
  process.exit(1);
}
const [x, y, filename] = process.argv;

const source = fs.readFileSync(filename).toString();

let pass1;
try {
  pass1 = prettier.format(source);
} catch (e) {
  console.error(`Could not parse ${filename}`);
  process.exit(1);
}
const pass2 = prettier.format(pass1);

if (pass1 !== pass2) {
  console.error(`------ ${filename} ------`);
  let diff = jsdiff.createTwoFilesPatch('', '', pass1, pass2, '', '', {context: 2});

  diff = diff.replace(/(^\+[^\+].*\n)|(^\-[^\-].*\n)/gm, (_, m1, m2) => m1 ? colors.green(m1) : colors.red(m2))

  console.log(diff);
}
