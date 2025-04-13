export interface NavProps {
  title?: string | null;
  segment?: string;
  icon?: React.ReactElement;
  kind?: 'header';
  children?: NavProps[];
}
