#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();

const month = argv.m || today.getMonth() + 1;
const year = argv.y || today.getFullYear();

const firstDay = new Date(year, month - 1, 1).getDay();

const daysInMonth = new Date(year, month, 0).getDate();

const monthLabel = month + "月";

console.log(`      ${monthLabel} ${year}`);
console.log("日 月 火 水 木 金 土");

let line = "   ".repeat(firstDay);
let dayOfWeek = firstDay;

for (let day = 1; day <= daysInMonth; day++) {
  line += day.toString().padStart(2, " ");
  dayOfWeek++;
  if (dayOfWeek === 7) {
    console.log(line);
    line = "";
    dayOfWeek = 0;
  } else {
    line += " ";
  }
}

if (line.trim() !== "") {
  console.log(line);
}
