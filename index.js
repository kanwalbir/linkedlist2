const express = require("express");
const bodyParse = require("body-parser");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { companyRouter, jobRouter, userRouter } = require("./routes");
const app = express();
let port = 4000;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.use("/company", companyRouter);
app.use("/jobs", jobRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  return res.redirect("welcome");
});

app.get("/404", (req, res) => {
  return res.redirect("404");
});

//DRAFT
app.get("/search", function(req, res, next) {
  let db = User || Company || Job;
  let searchValue = req.query;
  return db.find(searchValue).then(results => {
    return res.redirect("/search/results", { results, searchValue });
  });
});

//MAKES search/results routes

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
