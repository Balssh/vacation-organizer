export interface LoginUser {
  email: string;
  password: string;
}

export interface Vacation {
  id?: string;
  name: string;
  completed: boolean;
  cost: number;
  location: string;
  ownerID: string;
  participants: [{ name: string; paid: boolean }];
}
