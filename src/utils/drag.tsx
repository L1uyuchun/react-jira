import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProps,
  DraggableProvided,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  Direction,
} from "react-beautiful-dnd";
import React, { ReactElement, ReactNode } from "react";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };
export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided: DroppableProvided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
            direction: props.direction,
          });
        }

        return <div></div>;
      }}
    </Droppable>
  );
};

type DropchildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps & {
      direction: Direction;
    }
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropchildProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          display: "flex",
          width: "100%",
          flexDirection: props?.direction === "vertical" ? "column" : "row",
        }}
      >
        {props.children}
        {props.provided?.placeholder}
      </div>
    );
  }
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Draggle = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ref: provided.innerRef,
            ...provided.draggableProps,
            ...provided.dragHandleProps,
          });
        }
        return <div></div>;
      }}
    </Draggable>
  );
};
