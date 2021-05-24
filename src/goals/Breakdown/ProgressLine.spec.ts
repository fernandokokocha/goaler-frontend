import { Goal } from "../types";
import { ProgressCheckpoint } from "./types";
import { getInitialProgressLine, validateProgressLine } from "./ProgressLine";

const goal: Goal = {
  name: "Video is king",
  inspiration: {
    name: "Dawid Czerw",
    link: null,
  },
  explanation: "Nagrane video na YouTube",
  level1: 10,
  level2: 100,
  level3: 1000,
  progress: 5,
  visualization: "https://i.ytimg.com/vi/hZm_WKd1POM/mqdefault.jpg",
};

describe("getInitialProgressLine", () => {
  it("generates dummy progress line based on goal", () => {
    expect(getInitialProgressLine(goal)).toEqual([
      { level: 1, progressPlanned: 10, when: "2021" },
      { level: 2, progressPlanned: 100, when: "2022" },
      { progressPlanned: 500, when: "2023" },
      { level: 3, progressPlanned: 1000, when: "2024" },
      { when: "2025" },
      { when: "2026" },
      { when: "2027" },
      { when: "2028" },
    ]);
  });
});

describe("validateProgressLine", () => {
  it("validates positive initial progress line", () => {
    const initialProgressLine = getInitialProgressLine(goal);
    expect(validateProgressLine(initialProgressLine)).toBe(true);
  });

  it("validates positive simplest progress line", () => {
    const progressLine: ProgressCheckpoint[] = [
      { level: 1, progressPlanned: 10, when: "2021" },
      { level: 2, progressPlanned: 100, when: "2022" },
      { level: 3, progressPlanned: 1000, when: "2023" },
    ];
    expect(validateProgressLine(progressLine)).toBe(true);
  });

  it("validates negative not sorted values", () => {
    const progressLine: ProgressCheckpoint[] = [
      { level: 1, progressPlanned: 10, when: "2021" },
      { level: 2, progressPlanned: 100, when: "2022" },
      { level: 3, progressPlanned: 1000, when: "2023" },
      { progressPlanned: 500, when: "2024" },
    ];
    expect(validateProgressLine(progressLine)).toBe(false);
  });

  it("validates negative missing level 1", () => {
    const progressLine: ProgressCheckpoint[] = [
      { level: 2, progressPlanned: 100, when: "2022" },
      { level: 3, progressPlanned: 1000, when: "2023" },
    ];
    expect(validateProgressLine(progressLine)).toBe(false);
  });

  it("validates negative missing level 2", () => {
    const progressLine: ProgressCheckpoint[] = [
      { level: 1, progressPlanned: 10, when: "2021" },
      { level: 3, progressPlanned: 1000, when: "2023" },
    ];
    expect(validateProgressLine(progressLine)).toBe(false);
  });

  it("validates negative missing level 3", () => {
    const progressLine: ProgressCheckpoint[] = [
      { level: 1, progressPlanned: 10, when: "2021" },
      { level: 2, progressPlanned: 100, when: "2022" },
    ];
    expect(validateProgressLine(progressLine)).toBe(false);
  });
});
