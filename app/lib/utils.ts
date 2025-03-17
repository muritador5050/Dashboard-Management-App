export interface NavigationItem {
  title?: string;
  segment?: string;
  icon?: React.ReactElement;
  kind?: 'header';
  children?: NavigationItem[];
}
