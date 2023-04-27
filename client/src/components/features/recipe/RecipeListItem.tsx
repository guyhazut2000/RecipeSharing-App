import React from "react";

type Props = {
  title: string;
};

const RecipeListItem = ({ title }: Props) => {
  return <div>{title}</div>;
};

export default RecipeListItem;
