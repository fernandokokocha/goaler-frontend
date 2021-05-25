import React, { useState } from "react";
import { AddGoal } from "./AddGoal";
import { GoalList } from "./GoalList";
import { Visualization } from "./Visualization";
import { Breakdown } from "./Breakdown";
import { Switch, Route } from "react-router-dom";
import { Goal } from "./types";

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

export const Goals = () => {
  const [goals, setGoals] = useState(rows);

  const addGoal = (goal: Goal) => {
    const newGoals = [...goals, goal];
    setGoals(newGoals);
  };

  return (
    <Switch>
      <Route path="/visualization">
        <Visualization goals={goals} />
      </Route>
      <Route path="/table">
        <GoalList goals={goals} />
      </Route>
      <Route path="/add">
        <AddGoal addGoal={addGoal} />
      </Route>
      <Route path="/breakdown">
        <Breakdown goals={goals} />
      </Route>
      <Route path="/">
        <div>:)</div>
      </Route>
    </Switch>
  );
};
