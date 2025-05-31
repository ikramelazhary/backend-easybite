import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// add food item
const addFood = async (req, res) => {
  try {
    // Avec Cloudinary, l'URL de l'image est dans req.file.path
    const imageUrl = req.file.path;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Supprimer l'image de Cloudinary
    // L'url image ressemble à : https://res.cloudinary.com/xxxx/image/upload/v123456/food_images/abc123.jpg
    // Il faut extraire le public_id pour la suppression

    // Exemple d'extraction du public_id :
    const publicId = food.image
      .split('/')
      .slice(-2)
      .join('/')
      .split('.')[0]; // "food_images/abc123"

    await cloudinary.uploader.destroy(publicId);

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
