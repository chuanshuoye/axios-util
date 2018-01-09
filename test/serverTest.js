const expect = require("chai").expect;
let request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const zaRequest = require("../src/index");

process.env.NODE_ENV = "test";
const router = express.Router();

const baseURL = "https://www.easy-mock.com/mock/599e3dbd059b9c566dcde782/link";
const imgURL =
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513166971517&di=d4429abd2c482195090a666937bb3aa1&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110925%2F0010023291781194_b.jpg";
const ContentType = "application/json;charset=utf-8";
const AcceptType = "application/json;charset=utf-8";

router.get("/api/test/get", function(req, res, next) {
  zaRequest
    .request({
      method: "get",
      url: baseURL + "/mock/link/v1/insured/calculationDate",
      query: {
        a: 1
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {});
});

router.post("/api/test/post", function(req, res, next) {
  zaRequest
    .request({
      url: baseURL + "/mock/link/v1/insured/getInsuredAndAttachedInfo",
      data: {
        a: 2
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {});
});

const app = express();
app.use(router);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.listen(3000, function() {
  console.log("app running at 3000");
  testRoot();
});

function testRoot() {
  describe("za-axios mocha test", function() {
    it("api test get", function(done) {
      request(app)
        .get("/api/test/get")
        .query({
          key: 1,
          value: "test"
        })
        .set("Content-Type", ContentType)
        .set("Accept", AcceptType)
        .end((err, ret) => {
          if (err) throw err;
          const body = JSON.parse(ret.text);
          expect(body.success).to.equal(true);
          done();
        });
    });

    it("api test post", function(done) {
      request(app)
        .post("/api/test/post")
        .query({
          key: 1,
          value: "test"
        })
        .set("Content-Type", ContentType)
        .set("Accept", AcceptType)
        .end((err, ret) => {
          if (err) throw err;
          const body = JSON.parse(ret.text);
          expect(body.success).to.equal(true);
          done();
        });
    });
  });
  run();
}
