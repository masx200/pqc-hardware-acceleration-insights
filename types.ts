
export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface SlideContent {
  id: string;
  title: string;
  subtitle?: string;
  type: 'title' | 'content' | 'comparison' | 'chart' | 'summary';
  points?: string[];
  data?: ChartData[];
  comparison?: {
    left: { title: string; points: string[] };
    right: { title: string; points: string[] };
  };
  details?: string;
}
