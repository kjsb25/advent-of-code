import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let answer = 0
  data.forEach((currWord) => {
    const chars = [...currWord];
    //find first digit
    const firstDigit=parseInt(chars.find(isCharNumber));
    //find last digit
    const lastDigit=parseInt(chars.reverse().find(isCharNumber));
    let result =10*firstDigit+lastDigit;
    answer+=result;
  })
  return answer;
}

function isCharNumber(c) {
  return c >= '0' && c <= '9';
}
const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
