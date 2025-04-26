function cummulatemacros(parsedObject){
    let calories = 0;
    let fats_g = 0;
    let protein_g = 0;
    let carbs_g = 0;

    parsedObject.food_items.forEach(element => {
        calories += element.calories;
        fats_g += element.fats_g;
        protein_g += element.protein_g;
        carbs_g += element.carbs_g;
    });

    return [calories, fats_g, protein_g, carbs_g]
}




export default cummulatemacros