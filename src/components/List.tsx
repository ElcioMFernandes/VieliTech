import React from "react";
import { ListProps } from "../interfaces/ListProps";

export const List = (props: ListProps) => {
  return (
    <>
      <div
        className={`flex flex-col h-full justify-around rounded-lg ${props.color}`}
      >
        {props.title ? (
          <h1 className="text-2xl py-2 font-semibold">{props.title}</h1>
        ) : (
          <></>
        )}
        <ul className="flex flex-col h-full justify-evenly">
          {props.children ? (
            React.Children.count(props.children) == 1 ? (
              props.children
            ) : (
              React.Children.map(props.children, (item, index) => (
                <li key={index}>{item}</li>
              ))
            )
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};
