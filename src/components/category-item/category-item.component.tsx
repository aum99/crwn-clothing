import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  CategoryItemContainer,
  Body,
  BackgroundImage,
} from "./category-item.styles";

import { DirectoryCategory } from "../category-directory/category-directory.component";

type CategoryItemProps = {
  category: DirectoryCategory;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <CategoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
