import { readData } from '../../shared.ts';
import chalk from 'chalk';

const bagState = {
  red: 12,
  green: 13,
  blue: 14,
};

type gameType = {
  id: number;
  rounds: roundType[];
};

type roundType = {
  red: number;
  green: number;
  blue: number;
};

export async function day2a(dataPath?: string) {
  //Build out game objects
  const data = await readData(dataPath);
  const games = parseGameData(data);

  let sum = 0;
  games.forEach((game) => {
    //check if all values of current round are lesser than bagstate
    if (
      game.rounds.every((round) => {
        return Object.keys(round).every((key) => round[key] <= bagState[key]);
      })
    ) {
      sum += game.id;
    }
  });
  return sum;
}

function parseGameData(data: string[]): gameType[] {
  let output: gameType[] = [];
  data.forEach((currLine) => {
    let gameNum = parseInt(currLine.match(/^Game (\d+):/)[1]);
    let currRounds = [];
    //parse out and divide rounds
    let roundStrings = currLine.split(':')[1].split(';');
    roundStrings.forEach((roundString) => {
      const currRound: roundType = {
        red: parseColorNum(roundString, 'red'),
        green: parseColorNum(roundString, 'green'),
        blue: parseColorNum(roundString, 'blue'),
      };
      currRounds.push(currRound);
    });
    output.push({ id: gameNum, rounds: currRounds });
  });
  return output;
}

function parseColorNum(input: string, colorName: string): number {
  //parse for the color name
  const colorRegex = new RegExp(`(\\d+)\\s*${colorName}`);
  let colorNum = input.match(colorRegex);
  return colorNum && colorNum.length > 0 ? parseInt(colorNum[0]) : 0;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
