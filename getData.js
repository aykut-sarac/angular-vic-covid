const csv = require("csvtojson");
const request = require("request");
const data = require("./db.json");

const apiUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9oKYNQhJ6v85dQ9qsybfMfc-eaJ9oKVDZKx-VGUr6szNoTbvsLTzpEaJ3oW_LZTklZbz70hDBUt-d/pub?gid=0&single=true&output=csv";

const rows = {};
rows.data = [];

csv()
  .fromStream(request.get(apiUrl))
  .subscribe((json) => {
    rows.data.push(json);
  });

module.exports = () => {
  //check if it is coming from url or use static db
  if (rows.data.length > 0) return rows;
  else return data;
};
