import { IndicatorProps } from "../interfaces/IndicatorProps";

// Se a direção for up, o valor deve ser maior ou igual a meta, se for down, o valor deve ser menor ou igual a meta
export const Indicator = (props: IndicatorProps) => {
  return (
    <>
      <div
        className={` ${
          props.goal !== undefined && props.direction
            ? props.direction === "up"
              ? props.value >= props.goal
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : props.value <= props.goal
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
            : " text-black"
        } grid grid-rows-2 justify-around items-center text-center shadow-md`}
      >
        <p className="font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {props.name}
        </p>
        <p className="text-3xl md:text-5xl lg:text-3xl xl:text-6xl">
          {props.value}
        </p>
      </div>
    </>
  );
};
