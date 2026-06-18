#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();

const month = argv.m || today.getMonth() + 1;
const year = argv.y || today.getFullYear();

const firstDay = new Date(year, month - 1, 1).getDay();

const daysInMonth = new Date(year, month, 0).getDate();

const monthNames = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
console.log(`      ${monthNames[month - 1]} ${year}`);
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
