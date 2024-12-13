import { readData } from '../../shared.ts';
import chalk from 'chalk';

let mulRegex = /^mul\((\d{1,3}),(\d{1,3})\)/;
let doRegex = /do\(\).*/;
let dontRegex = /don't\(\).*/;

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  let inputString = data[0];
  let output = 0;
  let doState = true;

  data.forEach((inputString) => {
    for (let i = 0; i <= inputString.length; i++) {
      if (inputString[i] == 'd') {
        if (inputString.substring(i, i + 4).match(doRegex)) {
          // console.log('do');
          doState = true;
        }
        if (inputString.substring(i, i + 7).match(dontRegex)) {
          // console.log('dont');
          doState = false;
        }
      }
      if (inputString[i] == 'm') {
        let match = inputString.substring(i, i + 12).match(mulRegex);
        if (match && doState) {
          // console.log('mul');
          // console.log(parseInt(match[1]) + ' ' + parseInt(match[2]));
          output += parseInt(match[1]) * parseInt(match[2]);
        }
      }
    }
  });

  return output;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
