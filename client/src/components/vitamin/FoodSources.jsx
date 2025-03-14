// import React, { useState } from 'react';
// import carrotsImg from './assets/carrots.jpg';
// import orangesImg from './assets/oranges.jpg';
// import fishImg from './assets/fish.jpg';
// import spinachImg from './assets/spinach.jpg';
// import almondsImg from './assets/almonds.jpg';
// import sweetPotatoesImg from './assets/sweet-potatoes.jpeg';
// import blueberriesImg from './assets/blueberries.jpeg';
// import broccoliImg from './assets/broccoli.jpeg';
// import milkImg from './assets/milk.jpg';
// import eggsImg from './assets/eggs.jpg';
// import kaleImg from './assets/kale.jpeg';
// import mangoImg from './assets/mango.jpeg';
// import bananasImg from './assets/banana.jpeg';
// import tomatoesImg from './assets/tomatoes.jpg';
// import chickpeasImg from './assets/chickpeas.jpg';
// import lentilsImg from './assets/lentils.jpeg';
// import pumpkinImg from './assets/pumpkin.jpeg';
// import strawberriesImg from './assets/strawberries.jpeg';
// import avocadosImg from './assets/avocados.jpeg';
// import applesImg from './assets/apples.jpeg';
// import brusselsSproutsImg from './assets/brussels-sprouts.jpeg';
// import chickenBreastImg from './assets/chicken-breast.jpeg';
// import salmonImg from './assets/salmon.jpeg';
// import walnutsImg from './assets/walnuts.jpg';
// import brownRiceImg from './assets/brown-rice.jpg';
// import cucumberImg from './assets/cucumber.jpg';
// import peppersImg from './assets/peppers.jpeg';
// import peanutsImg from './assets/peanuts.jpg';
// import quinoaImg from './assets/quinoa.jpeg';
// import cauliflowerImg from './assets/cauliflower.jpg';
// import yogurtImg from './assets/yogurt.jpeg';
// import lemonsImg from './assets/lemons.jpeg';
// import oatsImg from './assets/oats.jpeg';
// import pineappleImg from './assets/pineapple.jpg';
// import pomegranatesImg from './assets/pomegranates.jpeg';
// import chiaSeedsImg from './assets/chia-seeds.jpeg';
// import mushroomsImg from './assets/mushrooms.jpeg';
// import asparagusImg from './assets/asparagus.jpeg';
// import cabbageImg from './assets/cabbage.jpg';
// import radishesImg from './assets/radishes.jpg';
// import figsImg from './assets/figs.jpg';
// import gooseberriesImg from './assets/gooseberries.jpeg';
// import pearsImg from './assets/pears.jpg';
// import potatoesImg from './assets/potatoes.jpg';
// import beetsImg from './assets/beets.jpg';
// import coconutImg from './assets/coconut.jpeg';
// import zucchiniImg from './assets/zucchini.jpeg';
// import tunaImg from './assets/tuna.jpg';
// import cherriesImg from './assets/cherries.jpeg';
// import raspberriesImg from './assets/raspberries.jpeg';
// import walnutOilImg from './assets/walnut-oil.jpg';
// import mapleSyrupImg from './assets/maple-syrup.jpeg';
// import hempSeedsImg from './assets/hemp-seeds.jpeg';
// import turkeyImg from './assets/turkey.jpeg';
// import baconImg from './assets/bacon.jpeg';
// import duckImg from './assets/duck.jpg';
// import shrimpImg from './assets/shrimp.jpeg';
// import sardinesImg from './assets/sardines.jpeg';
// import octopusImg from './assets/octopus.jpg';
// import tofuImg from './assets/tofu.jpg';
// import tempehImg from './assets/tempeh.jpeg';
// import seitanImg from './assets/seitan.jpeg';
// import lentilPastaImg from './assets/lentil-pasta.jpeg';
// import wholeWheatBreadImg from './assets/whole-wheat-bread.jpg';
// import couscousImg from './assets/couscous.jpg';
// import pastaImg from './assets/pasta.jpg';
// import riceCakesImg from './assets/rice-cakes.jpg';
// import granolaImg from './assets/granola.jpg';
// import nutButterImg from './assets/nut-butter.jpg';
// import peaProteinImg from './assets/pea-protein.jpeg';
// import soyMilkImg from './assets/soy-milk.jpg';
// import almondMilkImg from './assets/almond-milk.jpeg';
// import riceMilkImg from './assets/rice-milk.jpg';
// import coconutWaterImg from './assets/coconut-water.jpeg';
// import greenTeaImg from './assets/green-tea.jpg';
// import herbalTeaImg from './assets/herbal-tea.jpeg';
// import coffeeImg from './assets/coffee.jpg';
// import matchaImg from './assets/matcha.jpeg';
// import darkChocolateImg from './assets/dark-chocolate.jpeg';
// import honeyImg from './assets/honey.jpeg';
// import agaveSyrupImg from './assets/agave-syrup.jpeg';
// import cinnamonImg from './assets/cinnamon.jpg';
// import turmericImg from './assets/turmeric.jpeg';
// import gingerImg from './assets/ginger.jpeg';
// import garlicImg from './assets/garlic.jpeg';
// import onionsImg from './assets/onions.jpeg';



// const FoodSources = () => {
//     const [searchTerm, setSearchTerm] = useState('');

//     const foodItems = [
//         { name: 'Carrots', img: carrotsImg, info: 'Rich in Vitamin A.', calories: 41 },
//         { name: 'Oranges', img: orangesImg, info: 'High in Vitamin C.', calories: 47 },
//         { name: 'Fish', img: fishImg, info: 'Great source of Vitamin D and B12.', calories: 206 },
//         { name: 'Spinach', img: spinachImg, info: 'High in Vitamin K and A.', calories: 23 },
//         { name: 'Almonds', img: almondsImg, info: 'Rich in Vitamin E.', calories: 579 },
//         { name: 'Sweet Potatoes', img: sweetPotatoesImg, info: 'Good source of Vitamin A and C.', calories: 86 },
//         { name: 'Blueberries', img: blueberriesImg, info: 'Contains Vitamin C and K.', calories: 57 },
//         { name: 'Broccoli', img: broccoliImg, info: 'Rich in Vitamin C and K.', calories: 55 },
//         { name: 'Milk', img: milkImg, info: 'Great source of Vitamin D and Calcium.', calories: 42 },
//         { name: 'Eggs', img: eggsImg, info: 'Rich in Vitamin D and B12.', calories: 155 },
//         { name: 'Kale', img: kaleImg, info: 'High in Vitamin A, C, and K.', calories: 49 },
//         { name: 'Mango', img: mangoImg, info: 'Rich in Vitamin A and C.', calories: 60 },
//         { name: 'Bananas', img: bananasImg, info: 'Contains Vitamin B6 and C.', calories: 89 },
//         { name: 'Tomatoes', img: tomatoesImg, info: 'High in Vitamin C and K.', calories: 18 },
//         { name: 'Chickpeas', img: chickpeasImg, info: 'Good source of Vitamin B6 and Folate.', calories: 164 },
//         { name: 'Lentils', img: lentilsImg, info: 'Rich in Folate and Iron.', calories: 116 },
//         { name: 'Pumpkin', img: pumpkinImg, info: 'High in Vitamin A and C.', calories: 26 },
//         { name: 'Strawberries', img: strawberriesImg, info: 'Rich in Vitamin C and Manganese.', calories: 32 },
//         { name: 'Avocados', img: avocadosImg, info: 'High in Vitamin E and K.', calories: 160 },
//         { name: 'Apples', img: applesImg, info: 'Contains Vitamin C and Potassium.', calories: 52 },
//         { name: 'Brussels Sprouts', img: brusselsSproutsImg, info: 'High in Vitamin C and K.', calories: 43 },
//         { name: 'Chicken Breast', img: chickenBreastImg, info: 'Rich in Vitamin B6 and Niacin.', calories: 165 },
//         { name: 'Salmon', img: salmonImg, info: 'Great source of Vitamin D and Omega-3 fatty acids.', calories: 208 },
//         { name: 'Walnuts', img: walnutsImg, info: 'Rich in Vitamin E and Omega-3 fatty acids.', calories: 654 },
//         { name: 'Brown Rice', img: brownRiceImg, info: 'Good source of Vitamin B6 and Magnesium.', calories: 123 },
//         { name: 'Cucumber', img: cucumberImg, info: 'Low in calories and contains Vitamin K.', calories: 16 },
//         { name: 'Peppers', img: peppersImg, info: 'High in Vitamin C and A.', calories: 31 },
//         { name: 'Peanuts', img: peanutsImg, info: 'Rich in Vitamin E and Niacin.', calories: 567 },
//         { name: 'Quinoa', img: quinoaImg, info: 'Good source of Folate and Magnesium.', calories: 120 },
//         { name: 'Cauliflower', img: cauliflowerImg, info: 'Contains Vitamin C and K.', calories: 25 },
//         { name: 'Yogurt', img: yogurtImg, info: 'High in Vitamin B12 and Calcium.', calories: 59 },
//         { name: 'Lemons', img: lemonsImg, info: 'Excellent source of Vitamin C.', calories: 29 },
//         { name: 'Oats', img: oatsImg, info: 'Rich in Vitamin B1 and Fiber.', calories: 68 },
//         { name: 'Pineapple', img: pineappleImg, info: 'Contains Vitamin C and Manganese.', calories: 50 },
//         { name: 'Pomegranates', img: pomegranatesImg, info: 'High in Vitamin C and K.', calories: 83 },
//         { name: 'Chia Seeds', img: chiaSeedsImg, info: 'Rich in Omega-3 fatty acids and Fiber.', calories: 486 },
//         { name: 'Mushrooms', img: mushroomsImg, info: 'Good source of Vitamin D.', calories: 22 },
//         { name: 'Asparagus', img: asparagusImg, info: 'High in Vitamin K and Folate.', calories: 20 },
//         { name: 'Cabbage', img: cabbageImg, info: 'Contains Vitamin K and C.', calories: 25 },
//         { name: 'Radishes', img: radishesImg, info: 'Low in calories and contains Vitamin C.', calories: 16 },
//         { name: 'Figs', img: figsImg, info: 'Rich in Vitamin B6 and Manganese.', calories: 74 },
//         { name: 'Gooseberries', img: gooseberriesImg, info: 'High in Vitamin C.', calories: 44 },
//         { name: 'Pears', img: pearsImg, info: 'Contains Vitamin C and K.', calories: 57 },
//         { name: 'Potatoes', img: potatoesImg, info: 'Rich in Vitamin C and B6.', calories: 77 },
//         { name: 'Beets', img: beetsImg, info: 'High in Folate and Manganese.', calories: 43 },
//         { name: 'Coconut', img: coconutImg, info: 'Rich in Fiber and healthy fats.', calories: 354 },
//         { name: 'Zucchini', img: zucchiniImg, info: 'Low in calories and contains Vitamin C.', calories: 17 },
//         { name: 'Tuna', img: tunaImg, info: 'Great source of Vitamin D and B12.', calories: 132 },
//         { name: 'Cherries', img: cherriesImg, info: 'High in Vitamin C and K.', calories: 63 },
//         { name: 'Raspberries', img: raspberriesImg, info: 'Rich in Fiber and Vitamin C.', calories: 52 },
//         { name: 'Walnut Oil', img: walnutOilImg, info: 'High in Omega-3 fatty acids.', calories: 884 },
//         { name: 'Maple Syrup', img: mapleSyrupImg, info: 'Natural sweetener rich in minerals.', calories: 260 },
//         { name: 'Hemp Seeds', img: hempSeedsImg, info: 'Rich in Omega-3 and Omega-6.', calories: 553 },
//         { name: 'Turkey', img: turkeyImg, info: 'Low in fat and high in Protein.', calories: 135 },
//         { name: 'Bacon', img: baconImg, info: 'High in Fat and Protein.', calories: 541 },
//         { name: 'Duck', img: duckImg, info: 'Rich in Protein and Iron.', calories: 337 },
//         { name: 'Shrimp', img: shrimpImg, info: 'Low in calories and high in Protein.', calories: 99 },
//         { name: 'Sardines', img: sardinesImg, info: 'Rich in Omega-3 and Protein.', calories: 208 },
//         { name: 'Octopus', img: octopusImg, info: 'High in Protein and low in fat.', calories: 164 },
//         { name: 'Tofu', img: tofuImg, info: 'Great plant-based protein source.', calories: 76 },
//         { name: 'Tempeh', img: tempehImg, info: 'Rich in Protein and Fiber.', calories: 193 },
//         { name: 'Seitan', img: seitanImg, info: 'High in Protein.', calories: 142 },
//         { name: 'Lentil Pasta', img: lentilPastaImg, info: 'Gluten-free alternative rich in Protein.', calories: 364 },
//         { name: 'Whole Wheat Bread', img: wholeWheatBreadImg, info: 'High in Fiber.', calories: 247 },
//         { name: 'Couscous', img: couscousImg, info: 'Rich in Selenium and Protein.', calories: 176 },
//         { name: 'Pasta', img: pastaImg, info: 'High in Carbohydrates.', calories: 157 },
//         { name: 'Rice Cakes', img: riceCakesImg, info: 'Low-calorie snack.', calories: 35 },
//         { name: 'Granola', img: granolaImg, info: 'High in Fiber and Protein.', calories: 471 },
//         { name: 'Nut Butter', img: nutButterImg, info: 'Rich in healthy fats and protein.', calories: 588 },
//         { name: 'Pea Protein', img: peaProteinImg, info: 'Plant-based protein source.', calories: 80 },
//         { name: 'Soy Milk', img: soyMilkImg, info: 'Good source of Protein and Calcium.', calories: 33 },
//         { name: 'Almond Milk', img: almondMilkImg, info: 'Low-calorie dairy alternative.', calories: 30 },
//         { name: 'Rice Milk', img: riceMilkImg, info: 'Dairy-free alternative.', calories: 50 },
//         { name: 'Coconut Water', img: coconutWaterImg, info: 'Low in calories and hydrating.', calories: 19 },
//         { name: 'Green Tea', img: greenTeaImg, info: 'Rich in antioxidants.', calories: 0 },
//         { name: 'Herbal Tea', img: herbalTeaImg, info: 'Variety of health benefits.', calories: 0 },
//         { name: 'Coffee', img: coffeeImg, info: 'Rich in antioxidants and caffeine.', calories: 2 },
//         { name: 'Matcha', img: matchaImg, info: 'High in antioxidants.', calories: 3 },
//         { name: 'Dark Chocolate', img: darkChocolateImg, info: 'Rich in antioxidants and iron.', calories: 546 },
//         { name: 'Honey', img: honeyImg, info: 'Natural sweetener with antioxidants.', calories: 304 },
//         { name: 'Agave Syrup', img: agaveSyrupImg, info: 'Natural sweetener, low glycemic.', calories: 310 },
//         { name: 'Cinnamon', img: cinnamonImg, info: 'Rich in antioxidants.', calories: 247 },
//         { name: 'Turmeric', img: turmericImg, info: 'Contains curcumin, anti-inflammatory.', calories: 354 },
//         { name: 'Ginger', img: gingerImg, info: 'Anti-inflammatory and antioxidant properties.', calories: 80 },
//         { name: 'Garlic', img: garlicImg, info: 'Rich in vitamins and antioxidants.', calories: 149 },
//         { name: 'Onions', img: onionsImg, info: 'Rich in antioxidants and Vitamin C.', calories: 40 },
//     ];

//     // Filter food items based on the search term
// const filteredFoodItems = foodItems.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
// );

//     return (
//         <div className="w-full p-5">
//             <h1 className="text-2xl font-bold mb-4">Food Sources</h1>

//             {/* Search Bar */}
//             <input
//                 type="text"
//                 placeholder="Search for food items..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />

//             {/* Food Items Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredFoodItems.map((item, index) => (
//                     <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
//                         <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded" />
//                         <h2 className="text-xl font-bold mt-2">{item.name}</h2>
//                         <p>{item.info}</p>
//                         <p className="text-gray-600">Calories: {item.calories} kcal per 100g</p>
//                     </div>
//                 ))}
//             </div>

//             {filteredFoodItems.length === 0 && (
//                 <p className="text-gray-500 mt-4">No food items found matching your search.</p>
//             )}
//         </div>
//     );
// };

// export default FoodSources;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/l.png';
import carrotsImg from '../../assets/carrots.jpg';
import orangesImg from '../../assets/oranges.jpg';
import fishImg from '../../assets/fish.jpg';
import spinachImg from '../../assets/spinach.jpg';
import almondsImg from '../../assets/almonds.jpg';
import sweetPotatoesImg from '../../assets/sweet-potatoes.jpeg';
import blueberriesImg from '../../assets/blueberries.jpeg';
import broccoliImg from '../../assets/broccoli.jpeg';
import milkImg from '../../assets/milk.jpg';
import eggsImg from '../../assets/eggs.jpg';
import kaleImg from '../../assets/kale.jpeg';
import mangoImg from '../../assets/mango.jpeg';
import bananasImg from '../../assets/banana.jpeg';
import tomatoesImg from '../../assets/tomatoes.jpg';
import chickpeasImg from '../../assets/chickpeas.jpg';
import lentilsImg from '../../assets/lentils.jpeg';
import pumpkinImg from '../../assets/pumpkin.jpeg';
import strawberriesImg from '../../assets/strawberries.jpeg';
import avocadosImg from '../../assets/avocados.jpeg';
import applesImg from '../../assets/apples.jpeg';
import brusselsSproutsImg from '../../assets/brussels-sprouts.jpeg';
import chickenBreastImg from '../../assets/chicken-breast.jpeg';
import salmonImg from '../../assets/salmon.jpeg';
import walnutsImg from '../../assets/walnuts.jpg';
import brownRiceImg from '../../assets/brown-rice.jpg';
import cucumberImg from '../../assets/cucumber.jpg';
import peppersImg from '../../assets/peppers.jpeg';
import peanutsImg from '../../assets/peanuts.jpg';
import quinoaImg from '../../assets/quinoa.jpeg';
import cauliflowerImg from '../../assets/cauliflower.jpg';
import yogurtImg from '../../assets/yogurt.jpeg';
import lemonsImg from '../../assets/lemons.jpeg';
import oatsImg from '../../assets/oats.jpeg';
import pineappleImg from '../../assets/pineapple.jpg';
import pomegranatesImg from '../../assets/pomegranates.jpeg';
import chiaSeedsImg from '../../assets/chia-seeds.jpeg';
import mushroomsImg from '../../assets/mushrooms.jpeg';
import asparagusImg from '../../assets/asparagus.jpeg';
import cabbageImg from '../../assets/cabbage.jpg';
import radishesImg from '../../assets/radishes.jpg';
import figsImg from '../../assets/figs.jpg';
import gooseberriesImg from '../../assets/gooseberries.jpeg';
import pearsImg from '../../assets/pears.jpg';
import potatoesImg from '../../assets/potatoes.jpg';
import beetsImg from '../../assets/beets.jpg';
import coconutImg from '../../assets/coconut.jpeg';
import zucchiniImg from '../../assets/zucchini.jpeg';
import tunaImg from '../../assets/tuna.jpg';
import cherriesImg from '../../assets/cherries.jpeg';
import raspberriesImg from '../../assets/raspberries.jpeg';
import walnutOilImg from '../../assets/walnut-oil.jpg';
import mapleSyrupImg from '../../assets/maple-syrup.jpeg';
import hempSeedsImg from '../../assets/hemp-seeds.jpeg';
import turkeyImg from '../../assets/turkey.jpeg';
import baconImg from '../../assets/bacon.jpeg';
import duckImg from '../../assets/duck.jpg';
import shrimpImg from '../../assets/shrimp.jpeg';
import sardinesImg from '../../assets/sardines.jpeg';
import octopusImg from '../../assets/octopus.jpg';
import tofuImg from '../../assets/tofu.jpg';
import tempehImg from '../../assets/tempeh.jpeg';
import seitanImg from '../../assets/seitan.jpeg';
import lentilPastaImg from '../../assets/lentil-pasta.jpeg';
import wholeWheatBreadImg from '../../assets/whole-wheat-bread.jpg';
import couscousImg from '../../assets/couscous.jpg';
import pastaImg from '../../assets/pasta.jpg';
import riceCakesImg from '../../assets/rice-cakes.jpg';
import granolaImg from '../../assets/granola.jpg';
import nutButterImg from '../../assets/nut-butter.jpg';
import peaProteinImg from '../../assets/pea-protein.jpeg';
import soyMilkImg from '../../assets/soy-milk.jpg';
import almondMilkImg from '../../assets/almond-milk.jpeg';
import riceMilkImg from '../../assets/rice-milk.jpg';
import coconutWaterImg from '../../assets/coconut-water.jpeg';
import greenTeaImg from '../../assets/green-tea.jpg';
import herbalTeaImg from '../../assets/herbal-tea.jpeg';
import coffeeImg from '../../assets/coffee.jpg';
import matchaImg from '../../assets/matcha.jpeg';
import darkChocolateImg from '../../assets/dark-chocolate.jpeg';
import honeyImg from '../../assets/honey.jpeg';
import agaveSyrupImg from '../../assets/agave-syrup.jpeg';
import cinnamonImg from '../../assets/cinnamon.jpg';
import turmericImg from '../../assets/turmeric.jpeg';
import gingerImg from '../../assets/ginger.jpeg';
import garlicImg from '../../assets/garlic.jpeg';
import onionsImg from '../../assets/onions.jpeg';
const FoodSources = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Add all food items here as you did in your array
    const foodItems = [
        { name: 'Carrots', img: carrotsImg, info: 'Rich in Vitamin A.', calories: 41 },
        { name: 'Oranges', img: orangesImg, info: 'High in Vitamin C.', calories: 47 },
        { name: 'Fish', img: fishImg, info: 'Great source of Vitamin D and B12.', calories: 206 },
        { name: 'Spinach', img: spinachImg, info: 'High in Vitamin K and A.', calories: 23 },
        { name: 'Almonds', img: almondsImg, info: 'Rich in Vitamin E.', calories: 579 },
        { name: 'Sweet Potatoes', img: sweetPotatoesImg, info: 'Good source of Vitamin A and C.', calories: 86 },
        { name: 'Blueberries', img: blueberriesImg, info: 'Contains Vitamin C and K.', calories: 57 },
        { name: 'Broccoli', img: broccoliImg, info: 'Rich in Vitamin C and K.', calories: 55 },
        { name: 'Milk', img: milkImg, info: 'Great source of Vitamin D and Calcium.', calories: 42 },
        { name: 'Eggs', img: eggsImg, info: 'Rich in Vitamin D and B12.', calories: 155 },
        { name: 'Kale', img: kaleImg, info: 'High in Vitamin A, C, and K.', calories: 49 },
        { name: 'Mango', img: mangoImg, info: 'Rich in Vitamin A and C.', calories: 60 },
        { name: 'Bananas', img: bananasImg, info: 'Contains Vitamin B6 and C.', calories: 89 },
        { name: 'Tomatoes', img: tomatoesImg, info: 'High in Vitamin C and K.', calories: 18 },
        { name: 'Chickpeas', img: chickpeasImg, info: 'Good source of Vitamin B6 and Folate.', calories: 164 },
        { name: 'Lentils', img: lentilsImg, info: 'Rich in Folate and Iron.', calories: 116 },
        { name: 'Pumpkin', img: pumpkinImg, info: 'High in Vitamin A and C.', calories: 26 },
        { name: 'Strawberries', img: strawberriesImg, info: 'Rich in Vitamin C and Manganese.', calories: 32 },
        { name: 'Avocados', img: avocadosImg, info: 'High in Vitamin E and K.', calories: 160 },
        { name: 'Apples', img: applesImg, info: 'Contains Vitamin C and Potassium.', calories: 52 },
        { name: 'Brussels Sprouts', img: brusselsSproutsImg, info: 'High in Vitamin C and K.', calories: 43 },
        { name: 'Chicken Breast', img: chickenBreastImg, info: 'Rich in Vitamin B6 and Niacin.', calories: 165 },
        { name: 'Salmon', img: salmonImg, info: 'Great source of Vitamin D and Omega-3 fatty acids.', calories: 208 },
        { name: 'Walnuts', img: walnutsImg, info: 'Rich in Vitamin E and Omega-3 fatty acids.', calories: 654 },
        { name: 'Brown Rice', img: brownRiceImg, info: 'Good source of Vitamin B6 and Magnesium.', calories: 123 },
        { name: 'Cucumber', img: cucumberImg, info: 'Low in calories and contains Vitamin K.', calories: 16 },
        { name: 'Peppers', img: peppersImg, info: 'High in Vitamin C and A.', calories: 31 },
        { name: 'Peanuts', img: peanutsImg, info: 'Rich in Vitamin E and Niacin.', calories: 567 },
        { name: 'Quinoa', img: quinoaImg, info: 'Good source of Folate and Magnesium.', calories: 120 },
        { name: 'Cauliflower', img: cauliflowerImg, info: 'Contains Vitamin C and K.', calories: 25 },
        { name: 'Yogurt', img: yogurtImg, info: 'High in Vitamin B12 and Calcium.', calories: 59 },
        { name: 'Lemons', img: lemonsImg, info: 'Excellent source of Vitamin C.', calories: 29 },
        { name: 'Oats', img: oatsImg, info: 'Rich in Vitamin B1 and Fiber.', calories: 68 },
        { name: 'Pineapple', img: pineappleImg, info: 'Contains Vitamin C and Manganese.', calories: 50 },
        { name: 'Pomegranates', img: pomegranatesImg, info: 'High in Vitamin C and K.', calories: 83 },
        { name: 'Chia Seeds', img: chiaSeedsImg, info: 'Rich in Omega-3 fatty acids and Fiber.', calories: 486 },
        { name: 'Mushrooms', img: mushroomsImg, info: 'Good source of Vitamin D.', calories: 22 },
        { name: 'Asparagus', img: asparagusImg, info: 'High in Vitamin K and Folate.', calories: 20 },
        { name: 'Cabbage', img: cabbageImg, info: 'Contains Vitamin K and C.', calories: 25 },
        { name: 'Radishes', img: radishesImg, info: 'Low in calories and contains Vitamin C.', calories: 16 },
        { name: 'Figs', img: figsImg, info: 'Rich in Vitamin B6 and Manganese.', calories: 74 },
        { name: 'Gooseberries', img: gooseberriesImg, info: 'High in Vitamin C.', calories: 44 },
        { name: 'Pears', img: pearsImg, info: 'Contains Vitamin C and K.', calories: 57 },
        { name: 'Potatoes', img: potatoesImg, info: 'Rich in Vitamin C and B6.', calories: 77 },
        { name: 'Beets', img: beetsImg, info: 'High in Folate and Manganese.', calories: 43 },
        { name: 'Coconut', img: coconutImg, info: 'Rich in Fiber and healthy fats.', calories: 354 },
        { name: 'Zucchini', img: zucchiniImg, info: 'Low in calories and contains Vitamin C.', calories: 17 },
        { name: 'Tuna', img: tunaImg, info: 'Great source of Vitamin D and B12.', calories: 132 },
        { name: 'Cherries', img: cherriesImg, info: 'High in Vitamin C and K.', calories: 63 },
        { name: 'Raspberries', img: raspberriesImg, info: 'Rich in Fiber and Vitamin C.', calories: 52 },
        { name: 'Walnut Oil', img: walnutOilImg, info: 'High in Omega-3 fatty acids.', calories: 884 },
        { name: 'Maple Syrup', img: mapleSyrupImg, info: 'Natural sweetener rich in minerals.', calories: 260 },
        { name: 'Hemp Seeds', img: hempSeedsImg, info: 'Rich in Omega-3 and Omega-6.', calories: 553 },
        { name: 'Turkey', img: turkeyImg, info: 'Low in fat and high in Protein.', calories: 135 },
        { name: 'Bacon', img: baconImg, info: 'High in Fat and Protein.', calories: 541 },
        { name: 'Duck', img: duckImg, info: 'Rich in Protein and Iron.', calories: 337 },
        { name: 'Shrimp', img: shrimpImg, info: 'Low in calories and high in Protein.', calories: 99 },
        { name: 'Sardines', img: sardinesImg, info: 'Rich in Omega-3 and Protein.', calories: 208 },
        { name: 'Octopus', img: octopusImg, info: 'High in Protein and low in fat.', calories: 164 },
        { name: 'Tofu', img: tofuImg, info: 'Great plant-based protein source.', calories: 76 },
        { name: 'Tempeh', img: tempehImg, info: 'Rich in Protein and Fiber.', calories: 193 },
        { name: 'Seitan', img: seitanImg, info: 'High in Protein.', calories: 142 },
        { name: 'Lentil Pasta', img: lentilPastaImg, info: 'Gluten-free alternative rich in Protein.', calories: 364 },
        { name: 'Whole Wheat Bread', img: wholeWheatBreadImg, info: 'High in Fiber.', calories: 247 },
        { name: 'Couscous', img: couscousImg, info: 'Rich in Selenium and Protein.', calories: 176 },
        { name: 'Pasta', img: pastaImg, info: 'High in Carbohydrates.', calories: 157 },
        { name: 'Rice Cakes', img: riceCakesImg, info: 'Low-calorie snack.', calories: 35 },
        { name: 'Granola', img: granolaImg, info: 'High in Fiber and Protein.', calories: 471 },
        { name: 'Nut Butter', img: nutButterImg, info: 'Rich in healthy fats and protein.', calories: 588 },
        { name: 'Pea Protein', img: peaProteinImg, info: 'Plant-based protein source.', calories: 80 },
        { name: 'Soy Milk', img: soyMilkImg, info: 'Good source of Protein and Calcium.', calories: 33 },
        { name: 'Almond Milk', img: almondMilkImg, info: 'Low-calorie dairy alternative.', calories: 30 },
        { name: 'Rice Milk', img: riceMilkImg, info: 'Dairy-free alternative.', calories: 50 },
        { name: 'Coconut Water', img: coconutWaterImg, info: 'Low in calories and hydrating.', calories: 19 },
        { name: 'Green Tea', img: greenTeaImg, info: 'Rich in antioxidants.', calories: 0 },
        { name: 'Herbal Tea', img: herbalTeaImg, info: 'Variety of health benefits.', calories: 0 },
        { name: 'Coffee', img: coffeeImg, info: 'Rich in antioxidants and caffeine.', calories: 2 },
        { name: 'Matcha', img: matchaImg, info: 'High in antioxidants.', calories: 3 },
        { name: 'Dark Chocolate', img: darkChocolateImg, info: 'Rich in antioxidants and iron.', calories: 546 },
        { name: 'Honey', img: honeyImg, info: 'Natural sweetener with antioxidants.', calories: 304 },
        { name: 'Agave Syrup', img: agaveSyrupImg, info: 'Natural sweetener, low glycemic.', calories: 310 },
        { name: 'Cinnamon', img: cinnamonImg, info: 'Rich in antioxidants.', calories: 247 },
        { name: 'Turmeric', img: turmericImg, info: 'Contains curcumin, anti-inflammatory.', calories: 354 },
        { name: 'Ginger', img: gingerImg, info: 'Anti-inflammatory and antioxidant properties.', calories: 80 },
        { name: 'Garlic', img: garlicImg, info: 'Rich in vitamins and antioxidants.', calories: 149 },
        { name: 'Onions', img: onionsImg, info: 'Rich in antioxidants and Vitamin C.', calories: 40 },
    ];

    // Filter food items based on search term
    const filteredItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <nav className="bg-white shadow-md sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="VitaGuide Logo" className="h-10 mr-3" />
            <span className="text-2xl font-bold text-gray-800">VitaGuide</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
          </div>
          
        </div>
      </nav>
        <div style={{ padding: '2rem', background: '#f9fafb' }}>
            
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    fontSize: '2rem', // Adjust the size as needed
                    color: '#4A90E2', // Change to your preferred color
                    textTransform: 'uppercase', // Optional: make the text uppercase
                    letterSpacing: '1px' // Optional: add some spacing between letters
                }}
            >
                Food Sources
            </h2>
            <input
                type="text"
                placeholder="Search for a food item..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                    display: 'block',
                    margin: '0 auto 2rem auto',
                    padding: '0.5rem',
                    width: '80%',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            width: '200px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                            }}
                        />
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{item.name}</h3>
                            <p style={{ margin: '0 0 0.5rem', color: '#4b5563' }}>{item.info}</p>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#2563eb' }}>{item.calories} kcal</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default FoodSources;
