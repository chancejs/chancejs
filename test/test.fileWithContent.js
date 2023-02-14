import test from "ava";
import Chance from "../chance.js";
import _ from "lodash";

const chance = new Chance();

test("fileWithContent() returns a random filename but extention of .gif", (t) => {
  _.times(1, () => {
    const file = chance.fileWithContent({
      fileExtension: "gif",
      fileSize: 1024,
    });
    t.true(_.isBuffer(file.fileData));
    t.is(file.fileName.split(".")[1], "gif");
  });
});

test("fileWithContent() returns a file with a distinct name", (t) => {
  _.times(1, () => {
    const file = chance.fileWithContent({
      fileSize: 2048,
      fileName: "coolFileName",
    });
    t.is(file.fileName.split(".")[0], "coolFileName");
  });
});

test("fileWithContent() returns a file of distinct size", (t) => {
  _.times(1, () => {
    const file = chance.fileWithContent({ fileSize: 2048 });
    t.is(file.fileData.length, 2048);
  });
});

test("fileWithContent() throws if fileSize is missing", (t) => {
  _.times(1, () => {
    const fn = () => chance.fileWithContent({});
    t.throws(fn, "File size must be an integer");
  });
});

test("fileWithContent() throws if bad fileSize options is provided", (t) => {
  _.times(1, () => {
    const fn = () => chance.fileWithContent({ fileSize: "Large" });
    t.throws(fn, "File size must be an integer");
  });
});

test("fileWithContent() throws if bad fileSize is less than 0", (t) => {
  _.times(1, () => {
    const fn = () => chance.fileWithContent({ fileSize: -1 });
    t.throws(fn, "Chance: Length cannot be less than zero.");
  });
});
