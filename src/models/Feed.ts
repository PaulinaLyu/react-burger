export interface FeedItem {
  ingredients: string[];
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  name: string;
}

export interface IOrdersFeed {
  orders: FeedItem[];
  total: number;
  totalToday: number;
}
