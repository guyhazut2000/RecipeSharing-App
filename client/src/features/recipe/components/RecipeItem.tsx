import React from "react";

type Props = {
  title: string;
};

const RecipeItem = ({ title }: Props) => {
  return <div>{title}</div>;
};

export default RecipeItem;
