import { ParagraphProps } from "../interfaces/ParagraphProps";

export const Paragraph = (props: ParagraphProps) => {
  return (
    <>
      <p className="text-2xl md:text-3xl lg:text-4xl">{props.text}</p>
    </>
  );
};
