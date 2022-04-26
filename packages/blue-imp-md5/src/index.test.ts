// Ported to jest from https://github.com/blueimp/JavaScript-MD5/blob/master/test/test.js
import { BlueImpMD5 } from ".";

describe("Blue Imp Md5", () => {
  let bimd5: BlueImpMD5;
  beforeEach(() => {
    bimd5 = new BlueImpMD5();
  });

  describe("MD5 Hex-encoding", function () {
    it("should create a hex-encoded MD5 hash of an ASCII value", function () {
      expect(bimd5.md5("value")).toEqual("2063c1608d6e0baf80249c42e2be5804");
    });

    it("should create a hex-encoded MD5 hash of an UTF-8 value", function () {
      expect(bimd5.md5("日本")).toEqual("4dbed2e657457884e67137d3514119b3");
    });
  });

  describe("HMAC-MD5 Hex-encoding", function () {
    it("should create a hex-encoded HMAC-MD5 hash of an ASCII value and key", function () {
      expect(bimd5.md5("value", "key")).toEqual(
        "01433efd5f16327ea4b31144572c67f6"
      );
    });

    it("should create a hex-encoded HMAC-MD5 hash of an UTF-8 value and key", function () {
      expect(bimd5.md5("日本", "日本")).toEqual(
        "c78b8c7357926981cc04740bd3e9d015"
      );
    });
  });

  describe("MD5 raw encoding", function () {
    it("should create a raw MD5 hash of an ASCII value", function () {
      expect(bimd5.md5("value", undefined, true)).toEqual(
        " c\xc1`\x8dn\x0b\xaf\x80$\x9cB\xe2\xbeX\x04"
      );
    });

    it("should create a raw MD5 hash of an UTF-8 value", function () {
      expect(bimd5.md5("日本", undefined, true)).toEqual(
        "M\xbe\xd2\xe6WEx\x84\xe6q7\xd3QA\x19\xb3"
      );
    });
  });

  describe("HMAC-MD5 raw encoding", function () {
    it("should create a raw HMAC-MD5 hash of an ASCII value and key", function () {
      expect(bimd5.md5("value", "key", true)).toEqual(
        "\x01C>\xfd_\x162~\xa4\xb3\x11DW,g\xf6"
      );
    });

    it("should create a raw HMAC-MD5 hash of an UTF-8 value and key", function () {
      expect(bimd5.md5("日本", "日本", true)).toEqual(
        "\xc7\x8b\x8csW\x92i\x81\xcc\x04t\x0b\xd3\xe9\xd0\x15"
      );
    });
  });
});
