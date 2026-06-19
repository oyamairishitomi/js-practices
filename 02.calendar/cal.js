#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();

const month = argv.m ?? today.getMonth() + 1;
const year = argv.y ?? today.getFullYear();

const firstDate = new Date(year, month - 1, 1);

const lastDate = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

let line = "   ".repeat(firstDate.getDay());

for (let day = 1; day <= lastDate.getDate(); day++) {
  const currentDate = new Date(year, month - 1, day);
  line += day.toString().padStart(2, " ");
  if (currentDate.getDay() === 6 || day === lastDate.getDate()) {
    console.log(line);
    line = "";
  } else {
    line += " ";
  }
}
