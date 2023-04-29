export interface Recipe {
  _id?: string;
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  category: string[];
  cuisine: string[];
  createdAt?: Date;
  updatedAt?: Date;
  photo: string;
  ratings?: Rating[];
  comments?: Comment[];
  createdBy: {
    username: string;
  };
}

export interface Comment {
  username: string;
  text: string;
}

export interface Rating {
  value: number;
}
