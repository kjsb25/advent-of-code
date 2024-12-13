import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);

  let reports: number[][] = [];
  data.forEach((currRow) => {
    let parsed = currRow.split(/\s+/);
    let report: number[] = [];
    parsed.forEach((level) => {
      let parsedLevel = parseInt(level);
      if (!Number.isNaN(parsedLevel)) {
        report.push(parsedLevel);
      }
    });
    reports.push(report);
  });
  let output = 0;
  let count = 0;
  reports.forEach((report) => {
    console.log('Report ' + count);
    if (isSafe(report)) {
      console.log('Safe');
      output++;
    } else {
      for (let i = 0; i <= report.length - 1; i++) {
        let dampedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafe(dampedReport)) {
          console.log('Dampened Safe');
          output++;
          break;
        }
      }
    }
    count++;
  });

  return output;
}

//SAFE is determined if it's always moving in the same direction, and if it never changes by more than 3.
function isSafe(report: number[]): boolean {
  let ascending = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    if (ascending != report[i] < report[i + 1]) {
      return false;
    }
    if (Math.abs(report[i] - report[i + 1]) > 3) {
      return false;
    }
    //cover the match case
    if (report[i] == report[i + 1]) {
      return false;
    }
  }

  return true;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
