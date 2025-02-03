export interface CardProps {
  color?: string;
  rowSpan?: string;
  colSpan?: string;
  gridRow?: string;
  gridCol?: string;
  children?: React.ReactNode | React.ReactNode[] | string | string[];
}
