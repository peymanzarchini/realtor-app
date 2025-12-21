import { FeatureService } from "../services/feature.service.js";

const featureService = new FeatureService();

export const seedDefaultFeatures = async () => {
  const amenities = [
    "Parking",
    "Elevator",
    "Swimming Pool",
    "Central Heating",
    "Balcony",
    "Gym",
    "Security",
  ];

  try {
    for (const name of amenities) {
      await featureService.createFeature(name);
    }
    console.log("✅ Amenities seeded successfully.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};
