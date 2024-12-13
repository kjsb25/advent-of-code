import { readData } from '../../shared.ts';
import chalk from 'chalk';

let regex = /^mul\((\d{1,3}),(\d{1,3})\)/;

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  let inputString = data[0];
  let output = 0;

  data.forEach((inputString) => {
    for (let i = 0; i <= inputString.length; i++) {
      if (inputString[i] == 'm') {
        let match = inputString.substring(i, i + 12).match(regex);
        if (match) {
          console.log(parseInt(match[1]) + ' ' + parseInt(match[2]));
          output += parseInt(match[1]) * parseInt(match[2]);
        }
      }
    }
  });

  return output;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
