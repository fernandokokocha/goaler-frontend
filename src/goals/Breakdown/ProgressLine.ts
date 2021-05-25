import { Milestones, Timeslot } from "../types";
import sortBy from "lodash/sortBy";
import { ProgressCheckpoint } from "./types";

export class ProgressLine {
  constructor(private readonly progressCheckpointList: ProgressCheckpoint[]) {}

  static fromMilestones(milestones: Milestones) {
    return new ProgressLine([
      {
        when: "2021" as Timeslot,
        progressPlanned: milestones.level1,
        level: 1,
      },
      {
        when: "2022" as Timeslot,
        progressPlanned: milestones.level2,
        level: 2,
      },
      { when: "2023" as Timeslot, progressPlanned: milestones.level3 / 2 },
      {
        when: "2024" as Timeslot,
        progressPlanned: milestones.level3,
        level: 3,
      },
      { when: "2025" as Timeslot },
      { when: "2026" as Timeslot },
      { when: "2027" as Timeslot },
      { when: "2028" as Timeslot },
    ]);
  }

  static fromProgressCheckpointList(
    progressCheckpointList: ProgressCheckpoint[]
  ) {
    return new ProgressLine(progressCheckpointList);
  }

  isValid(): boolean {
    const sorted = sortBy(this.progressCheckpointList, "when");
    let lastValue = undefined;
    let level1found = false;
    let level2found = false;
    let level3found = false;
    for (let i = 0; i < sorted.length; i += 1) {
      const item: ProgressCheckpoint = sorted[i];
      if (!item.progressPlanned) continue;

      if (lastValue && item.progressPlanned < lastValue) return false;

      level1found = level1found || item.level === 1;
      level2found = level2found || item.level === 2;
      level3found = level3found || item.level === 3;

      lastValue = item.progressPlanned;
    }
    return level1found && level2found && level3found;
  }

  toArray(): ProgressCheckpoint[] {
    return this.progressCheckpointList;
  }
}
