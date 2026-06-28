import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Experience from "./models/Experience.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    const exists = await Experience.findOne({ companyName: "Accenture" });
    if (!exists) {
      await Experience.create({
        companyName: "Accenture",
        role: "Product Designer (Virtual Experience)",
        employmentType: "Virtual Experience",
        location: "Remote",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-02-01"),
        currentCompany: false,
        description:
          "Completed Accenture's Product Designer Virtual Experience Program, focused on product thinking, design fundamentals, and stakeholder communication.",
        skillsUsed: ["Product Thinking", "UI/UX", "Communication", "Problem Solving"],
      });
      console.log("Accenture experience seeded.");
    } else {
      console.log("Accenture experience already exists.");
    }
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
