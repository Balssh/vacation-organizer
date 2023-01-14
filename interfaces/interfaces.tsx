export interface LoginUser {
  email: string;
  password: string;
}

export interface Vacation {
  id?: string;
  name: string;
  description?: string;
  ownerID: string;
  cost: number;
  location: string;
  participants: string;
}
