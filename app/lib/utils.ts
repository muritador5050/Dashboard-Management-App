export interface NavigationItem {
  title?: string | null;
  segment?: string;
  icon?: React.ReactElement;
  kind?: 'header';
  children?: NavigationItem[];
}
