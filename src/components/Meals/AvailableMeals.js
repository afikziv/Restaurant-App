import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, sethttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("dbURL/meals.json");

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const resposeData = await response.json();

      const loadedMeals = [];

      for (const key in resposeData) {
        loadedMeals.push({
          id: key,
          name: resposeData[key].name,
          description: resposeData[key].description,
          price: resposeData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsloading(false);
    };

    fetchMeals().catch((error) => {
      setIsloading(false);
      sethttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading ...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
