export interface CardProps {
  color?: string;
  shadow?: boolean;
  rowSpan?: string;
  colSpan?: string;
  gridRow?: string;
  gridCol?: string;
  children?: React.ReactNode | React.ReactNode[] | string | string[];
}
