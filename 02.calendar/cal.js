#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();

const month = argv.m || today.getMonth() + 1;
const year = argv.y || today.getFullYear();

const firstDate = new Date(year, month - 1, 1);

const daysInMonth = new Date(year, month, 0).getDate();

const monthLabel = month + "月";

console.log(`      ${monthLabel} ${year}`);
console.log("日 月 火 水 木 金 土");

let line = "   ".repeat(firstDate.getDay());

for (let day = 1; day <= daysInMonth; day++) {
  if (day > 1 && line !== "") {
    line += " ";
  }
  line += day.toString().padStart(2, " ");
  if ((firstDate.getDay() + (day - 1)) % 7 === 6) {
    console.log(line);
    line = "";
  }
}

if (line.trim() !== "") {
  console.log(line);
}
