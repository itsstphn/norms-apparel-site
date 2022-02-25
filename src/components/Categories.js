import "./Categories.css";
import { useDataContext } from "./../hooks/useDataContext";

const Categories = ({ handleSelectedCategory, selectedCategory }) => {
  const { categories } = useDataContext();

  return (
    <div className="categories">
      <ul>
        {categories.map((cat) => (
          <li
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => handleSelectedCategory(cat)}
            key={cat}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
