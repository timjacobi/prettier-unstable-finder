require('colors')
const prettier = require("prettier");
const jsdiff = require('diff');
const fs = require('fs');

if(!process.argv[2]){
  console.error("Please specify a filename");
  process.exit(1)
}
const [x, y, filename] = process.argv;

const source = fs.readFileSync(filename).toString();

let pass1 
try {
  pass1 = prettier.format(source);
} catch(e) {
  console.error(`Could not parse ${filename}`);
  process.exit(1);
}
const pass2 = prettier.format(pass1);

if(pass1 !== pass2){
  console.error(`------ ${filename} ------`)
  const diff = jsdiff.diffLines(pass1, pass2);

  diff.forEach(function(part){
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    if(part.added || part.removed){
      process.stderr.write(part.value[color]);
    }
  });

  console.log()
}