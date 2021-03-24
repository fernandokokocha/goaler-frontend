import React, { useState } from "react";
import { AddGoal } from "./AddGoal";
import { GoalList } from "./GoalList";

const rows = [
  {
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
  },
  {
    name: "Blogger",
    inspiration: {
      name: "Andrzej Krzywda",
      link: null,
    },
    explanation: "Napisane blog posty",
    level1: 10,
    level2: 100,
    level3: 1000,
    progress: 1,
  },
  {
    name: "1000 true fans",
    inspiration: {
      name: "Kevin Kelly",
      link: "https://kk.org/thetechnium/1000-true-fans/",
    },
    explanation: "Fani - ktoś kto kupił 2 produkty",
    level1: 1,
    level2: 33,
    level3: 1000,
    progress: 0,
  },
  {
    name: "Architekt",
    inspiration: {
      name: "Darek",
      link: null,
    },
    explanation: "Liczba side projektów, z których ktoś korzysta",
    level1: 1,
    level2: 3,
    level3: 10,
    progress: 5,
  },
];

export const Goals = () => {
  const [goals, setGoals] = useState(rows);

  const addGoal = (goal: any) => {
    const newGoals = [...goals, goal];
    setGoals(newGoals);
  };

  return (
    <>
      <GoalList goals={goals} />
      <AddGoal addGoal={addGoal} />
    </>
  );
};
