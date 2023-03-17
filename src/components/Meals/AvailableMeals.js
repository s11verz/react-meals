import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [menus, setMenus] = useState([]);
  const { isLoading, error, sendRequest: fetchMenus } = useHttp();

  useEffect(() => {
    const transformMenus = (menusObj) => {
      const loadedMenus = [];
      for (const menuKey in menusObj) {
        loadedMenus.push({
          id: menuKey,
          name: menusObj[menuKey].name,
          price: menusObj[menuKey].price,
          description: menusObj[menuKey].description,
        });
      }
      setMenus(loadedMenus);
    };
    fetchMenus(
      {
        url: "https://react-meals-e1916-default-rtdb.firebaseio.com/meals.json",
      },
      transformMenus
    );
  }, [fetchMenus]);

  let content = <p className={classes.loading}>Loading tasks...</p>;

  if (error) {
    content = <p className={classes.loading}>Error Occurs!</p>;
  }

  const mealList = menus.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  if (!isLoading && menus.length === 0) {
    content = <p className={classes.loading}>No Menus!</p>;
  }

  if (!isLoading && menus.length > 0) {
    content = <ul>{mealList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
