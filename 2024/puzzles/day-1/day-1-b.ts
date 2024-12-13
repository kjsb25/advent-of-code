import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);
  let array1 = [];
  let array2 = [];
  data.forEach((currRow) => {
    let parsed = currRow.split(/\s+/);
    array1.push(parseInt(parsed[0]));
    array2.push(parseInt(parsed[1]));
  });

  let output = 0;
  for (let i = 0; i < array1.length; i++) {
    let times = 0;
    for (let j = 0; j < array2.length; j++) {
      times += array1[i] == array2[j] ? 1 : 0;
    }

    output += array1[i] * times;
  }

  return output;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
