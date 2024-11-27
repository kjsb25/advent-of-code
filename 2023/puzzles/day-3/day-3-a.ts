import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const numbers = data[i].match(/\d+/g);
    numbers && console.log(i + ': ' + hasDuplicates(numbers));
    numbers &&
      numbers.forEach((partNumber) => {
        // console.log(partNumber + ': ' + isPartNumber(i, data, partNumber));
        if (isPartNumber(i, data, partNumber)) {
          sum += parseInt(partNumber);
        }
      });
  }

  return sum;
}

function hasDuplicates(array: string[]) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}

function isPartNumber(
  lineNumber: number,
  schematic: string[],
  partNumber: string,
) {
  const partStartingIndex = schematic[lineNumber].indexOf(partNumber);
  const partEndingIndex = partStartingIndex + partNumber.length;
  //find x range
  // const searchStartingX = partStartingIndex < 0 ? partStartingIndex - 1 : 0;
  // const searchEndingX =
  //   searchStartingX + partNumber.length < schematic[lineNumber].length
  //     ? searchStartingX + partNumber.length +1
  //     : schematic[lineNumber].length - 1;
  const searchStartingX = partStartingIndex - 1;
  const searchEndingX = searchStartingX + partNumber.length + 1;

  //find y range
  // const searchStartingY = lineNumber < 0 ? lineNumber - 1 : 0;
  // const searchEndingY =
  //   lineNumber < schematic.length - 2 ? lineNumber - 1 : lineNumber;
  const searchStartingY = lineNumber - 1;
  const searchEndingY = lineNumber + 1;

  // console.log('X: ' + searchStartingX + '=>' + searchEndingX);
  // console.log('Y: ' + searchStartingY + '=>' + searchEndingY);
  for (let i = searchStartingY; i <= searchEndingY; i++) {
    for (let j = searchStartingX; j <= searchEndingX; j++) {
      //check if valid index
      if (j in schematic && i in schematic[j].split('')) {
        // console.log('Testing ' + i + ' ' + j);
        if (
          schematic[i] &&
          schematic[i][j] &&
          /[^\w\s.]/.test(schematic[i][j])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
