import * as fs from "node:fs";
import { describe, expect, test } from "@jest/globals";
import { parse } from ".";
import parsed1 from "./parsed1.json";
import parsed2 from "./parsed2.json";
import parsed3 from "./parsed3.json";

const sample1 = fs.readFileSync("sample1.txt", { encoding: "utf-8" });
const sample2 = fs.readFileSync("sample2.txt", { encoding: "utf-8" });
const sample3 = fs.readFileSync("sample3.txt", { encoding: "utf-8" });

describe("sample1", () => {
  const sample = sample1;
  const correct = parsed1;
  const currentPath = "/";

  test("should throw when dest is not absolute", () => {
    expect(() => parse(sample, ".")).toThrow();
  });

  test("should parse correctly", () => {
    const parsed = parse(sample, currentPath);
    expect(correct).toStrictEqual(parsed);
  });

  test("should throw", () => {
    const parsed = parse(
      sample.replace("-rw-r--r--", "-rw-r--r-x"),
      currentPath
    );
    expect(() => expect(correct).toStrictEqual(parsed)).toThrow();
  });

  test("should throw", () => {
    const parsed = parse(sample, "");
    expect(() => expect(correct).toStrictEqual(parsed)).toThrow();
  });
});

describe("sample2", () => {
  const sample = sample2;
  const correct = parsed2;
  const currentPath = "/etc/";

  test("should parse correctly", () => {
    const parsed = parse(sample, currentPath);
    expect(correct).toStrictEqual(parsed);
  });

  test("should throw", () => {
    const parsed = parse(
      sample.replace("-rw-r--r--", "-rw-r--r-x"),
      currentPath
    );
    expect(() => expect(correct).toStrictEqual(parsed)).toThrow();
  });

  test("should throw", () => {
    const parsed = parse(sample, currentPath.slice(0, -1));
    expect(() => expect(correct).toStrictEqual(parsed)).toThrow();
  });
});

describe("sample3", () => {
  const sample = sample3;
  const correct = parsed3;

  test("should parse correctly", () => {
    const parsed = parse(sample);
    expect(correct).toStrictEqual(parsed);
  });

  test("should parse correctly when path is not same with the output that does not include path", () => {
    const parsed = parse(sample, "/bin");
    expect(correct).toStrictEqual(parsed);
  });

  test("should throw", () => {
    const parsed = parse(sample.replace("-rw-r--r--", "-rw-r--r-x"));
    expect(() => expect(correct).toStrictEqual(parsed)).toThrow();
  });
});
