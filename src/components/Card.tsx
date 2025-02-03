import { CardProps } from "../interfaces/CardProps";

export const Card = (props: CardProps) => {
  return (
    <>
      <div
        className={`grid h-full w-full items-center justify-center text-center gap-1 rounded-lg
          ${props.shadow ? "shadow-lg" : ""} ${
          props.gridCol ? props.gridCol : "grid-cols-1"
        } ${props.gridRow ? props.gridRow : "grid-rows-1"} ${props.color} ${
          props.rowSpan
        } ${props.colSpan}`}
      >
        {props.children ? props.children : <></>}
      </div>
    </>
  );
};
