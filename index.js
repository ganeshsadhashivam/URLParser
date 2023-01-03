const url = require("url");

const address =
  "http://localhost:8080/index.php?type=page&action=update&id=5221";

const q = url.parse(address, true);

const qdata = q.query;

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

console.log(qdata.type);
console.log(qdata.action);
console.log(qdata.id);
