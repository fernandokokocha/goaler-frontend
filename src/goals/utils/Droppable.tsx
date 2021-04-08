import React, { FC } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./types";

export const Droppable: FC<{
  id: string;
}> = ({ id, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.LEVEL,
    drop: () => moveKnight(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveKnight = () => {
    console.log(`dropped! ${id}`);
  };

  return (
    <div ref={drop} style={{ height: "50px" }}>
      {children}
    </div>
  );
};

export default Droppable;
