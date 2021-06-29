import React, { useMemo, useState } from "react";
import { AddGoal } from "./AddGoal";
import { GoalList } from "./GoalList";
import { Visualization } from "./Visualization";
import { YearByYear } from "./YearByYear";
import { Switch, Route } from "react-router-dom";
import { Goal, GoalWithBreakdown, Timeslot } from "./types";
import { ProgressLine } from "./Breakdown/ProgressLine";
import { Calendar } from "./Calendar";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";

const rows: Goal[] = [
  {
    name: "Video is king",
    inspiration: {
      name: "Dawid Czerw",
      link: null,
    },
    explanation: "Nagrane video na YouTube",
    milestones: {
      level1: 10,
      level2: 100,
      level3: 1000,
    },
    progress: 5,
    visualization: "https://i.ytimg.com/vi/hZm_WKd1POM/mqdefault.jpg",
  },
  {
    name: "Blogger",
    inspiration: {
      name: "Andrzej Krzywda",
      link: null,
    },
    explanation: "Napisane blog posty",
    milestones: {
      level1: 10,
      level2: 100,
      level3: 1000,
    },
    progress: 1,
    visualization:
      "https://blog-arkency.imgix.net/~text?bg=C41D48&fit=max&h=315&txt=Most%20controversial%20rules%20in%20Arkency&txtalign=middle%2Ccenter&txtclr=FFF&txtfont=Georgia%2CBold&txtpad=30&txtsize=42&w=640",
  },
  {
    name: "1000 true fans",
    inspiration: {
      name: "Kevin Kelly",
      link: "https://kk.org/thetechnium/1000-true-fans/",
    },
    explanation: "Fani - ktoś kto kupił 2 produkty",
    milestones: {
      level1: 1,
      level2: 33,
      level3: 1000,
    },
    progress: 0,
    visualization: "https://kk.org/mt-files/thetechnium-mt/TrueFans-1.jpg",
  },
  {
    name: "Architekt",
    inspiration: {
      name: "Darek",
      link: null,
    },
    explanation: "Liczba side projektów, z których ktoś korzysta",
    milestones: {
      level1: 1,
      level2: 3,
      level3: 10,
    },
    progress: 5,
    visualization:
      "http://dreamlevels.com/wp-content/uploads/2020/02/programming-languages.jpeg",
  },
  {
    name: "Miracle morning",
    inspiration: {
      name: "Hal Elrod",
      link: null,
    },
    explanation: "Miracle Morning z rzędu",
    milestones: {
      level1: 30,
      level2: 90,
      level3: 365,
    },
    progress: 11,
    visualization:
      "https://www.usastaffingservices.com/wp-content/uploads/2019/08/Staffing-Resource-Center-August-2019.png",
  },
];

const getInitialGoalsWithBreakdown = (goals: Goal[]): GoalWithBreakdown[] => {
  return goals.map((goal) => ({
    goal,
    breakdown: ProgressLine.fromMilestones(goal.milestones).toArray(),
  }));
};

const initialData = getInitialGoalsWithBreakdown(rows);

export const initialColumns: Timeslot[] = [
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
];

export const Goals = () => {
  const [goalsWithBreakdown, setGoalsWithBreakdown] =
    useState<GoalWithBreakdown[]>(initialData);
  const [columns, setColumns] = useState(initialColumns);

  useMemo(() => {
    const newGoalsWithBreakdown = cloneDeep(goalsWithBreakdown);
    newGoalsWithBreakdown.forEach((goalWithBreakdown) => {
      columns.forEach((column) => {
        const found = goalWithBreakdown.breakdown.find(
          ({ when }) => when === column
        );
        if (!found) {
          goalWithBreakdown.breakdown.push({ when: column });
        }
      });
      goalWithBreakdown.breakdown = sortBy(goalWithBreakdown.breakdown, "when");
    });
    setGoalsWithBreakdown(newGoalsWithBreakdown);
  }, [columns]);

  const addGoal = (goal: Goal) => {
    const goalWithBreakdown = [
      {
        goal,
        breakdown: getInitialGoalsWithBreakdown([goal])[0].breakdown,
      },
    ];
    const newGoalsWithBreakdown = [...goalsWithBreakdown, ...goalWithBreakdown];
    setGoalsWithBreakdown(newGoalsWithBreakdown);
  };

  return (
    <Switch>
      <Route path="/visualization">
        <Visualization goalsWithBreakdown={goalsWithBreakdown} />
      </Route>
      <Route path="/table">
        <GoalList goalsWithBreakdown={goalsWithBreakdown} />
      </Route>
      <Route path="/add">
        <AddGoal addGoal={addGoal} />
      </Route>
      <Route path="/year-by-year">
        <YearByYear
          goalsWithBreakdown={goalsWithBreakdown}
          setGoalsWithBreakdown={setGoalsWithBreakdown}
          columns={columns}
          setColumns={setColumns}
        />
      </Route>
      <Route path="/calendar">
        <Calendar goalsWithBreakdown={goalsWithBreakdown} columns={columns} />
      </Route>
      <Route path="/">
        <div>:)</div>
      </Route>
    </Switch>
  );
};
