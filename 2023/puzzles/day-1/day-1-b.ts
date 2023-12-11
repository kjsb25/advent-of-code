import { readData } from '../../shared.ts';
import chalk from 'chalk';

const numberStrings : Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0
}

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let answer = 0
  data.forEach((currWord) => {
    const chars = [...currWord];
    //find first digit
    const firstDigit=findFirstNumber(currWord)
    //find last digit
    const lastDigit=findLastNumber(currWord)
    let result =10*firstDigit+lastDigit;
    console.log(result)
    answer+=result;
  })
  return answer;
}

function isCharNumber(c) {
  return c >= '0' && c <= '9';
}


// Grow substring from the front, checking for digits and words along the way
function findFirstNumber(input: string):  number {
  //gradually growing substring
  let i=0;
  while(i<=input.length-1){
    //check if new char is a digit, return if so
    if(isCharNumber(input[i])){
      return parseInt(input[i])
    }
    //shortest word is three letters long, so only check words once we hit that
    if(i>=2){
      let currTest=input.substring(0,i+1);
      //test substrings with a moving start until the end of the current test.
      let j=0;
      //stop testing once the chars left is less than 3
      while(j<=currTest.length-1){
        if(numberStrings[currTest.substring(j,currTest.length)]){
          return numberStrings[currTest.substring(j,currTest.length)]
        }
        j++;
      }
    }
    i++;
  }
  //none found
  return -1;
}

//grow substring from the back, checking for digits and substrings along the way.
function findLastNumber(input: string):  number {
  //index of final char
  let i=input.length-1;
  while(i>=0){
    //check if new char is a digit, return if so
    if(isCharNumber(input[i])){
      return parseInt(input[i])
    }
    //shortest word is three letters long, so only check words once we hit that
    if(i<=(input.length-3)){
      let currTest=input.substring(i,input.length);
      //test substrings with a moving start until the end of the current test.
      let j=currTest.length;
      //stop testing once the chars left is less than 3
      while(j>2){
        if(numberStrings[currTest.substring(0,j)]){
          return numberStrings[currTest.substring(0,j)]
        }
        j--;
      }
    }
    i--;
  }
  //none found
  return -1;
}


const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
