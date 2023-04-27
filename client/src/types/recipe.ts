interface Recipe {
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

interface Comment {
  username: string;
  text: string;
}

interface Rating {
  value: number;
}
