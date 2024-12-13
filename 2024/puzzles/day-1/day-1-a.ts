import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let array1 = [];
  let array2 = [];
  data.forEach((currRow) => {
    let parsed = currRow.split(/\s+/);
    array1.push(parseInt(parsed[0]));
    array2.push(parseInt(parsed[1]));
  });
  array1.sort((a, b) => a - b);
  array2.sort((a, b) => a - b);

  let output = 0;

  for (let i = 0; i < array1.length; i++) {
    output += Math.abs(array2[i] - array1[i]);
  }

  return output;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
