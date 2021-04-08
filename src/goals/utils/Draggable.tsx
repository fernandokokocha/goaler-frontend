import { FC } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";

export const Draggable: FC<{
  id: string;
}> = ({ id, children }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.LEVEL,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      {children}
    </div>
  );
};
