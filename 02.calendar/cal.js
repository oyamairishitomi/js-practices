#!/usr/bin/env node
import minimist from "minimist";

// =====変数設定：日付の取得
const argv = minimist(process.argv.slice(2));
const today = new Date();

// -m/-y 未指定なら今月・今年を使う
const month = argv.m || today.getMonth() + 1; // getMonth()は0始まりなので+1
const year = argv.y || today.getFullYear();

// =====

// getDay()は0=日〜6=土を返す。月は0始まりなので-1
const firstDay = new Date(year, month - 1, 1).getDay();

// 翌月の0日目 = その月の最終日になる
const daysInMonth = new Date(year, month, 0).getDate();

// =====ヘッダー
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
// =====ヘッダー終わり

// 1日が始まる曜日の分だけ先頭を空白
let line = "   ".repeat(firstDay);
let dayOfWeek = firstDay;

for (let day = 1; day <= daysInMonth; day++) {
  // その月の最終日まで繰り返す
  line += day.toString().padStart(2, " "); // padStart(2)で1桁の日付を2文字に揃える
  dayOfWeek++;
  if (dayOfWeek === 7) {
    // 土曜まで埋まったら出力
    console.log(line);
    line = ""; // リセット。次の週へ
    dayOfWeek = 0;
  } else {
    line += " "; // 日付と日付の間のスペース
  }
}

// 最終週が土曜で終わらない場合の残り
if (line.trim() !== "") {
  console.log(line);
}
