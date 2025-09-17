// migrate.js
import { MongoClient } from "mongodb";
import { sequelize } from "./config/db.js";
import Resume from "./models/Resume.js";

const mongoUri = "mongodb://localhost:27017/resumeDB";

async function migrate() {
  try {
    // Ensure Postgres has the table before inserting
    await sequelize.sync({ alter: true });
    console.log("✅ Postgres tables synced");

    // Connect to MongoDB
    const client = new MongoClient(mongoUri);
    await client.connect();
    const resumes = await client.db().collection("resumes").find().toArray();

    console.log(`📦 Found ${resumes.length} resumes in MongoDB`);

    // Insert into Postgres
    for (const r of resumes) {
        await Resume.create({
            userId: r.userId,
            title: r.title || "",
            content: r.content || {},          // ✅ fallback to empty object
            templateId: r.templateId || null,
            sections: r.sections || [],
            customization: r.customization || {},
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
          });
          
    }

    console.log("✅ Migration complete");

    await client.close();
    await sequelize.close();
  } catch (err) {
    console.error("❌ Migration failed:", err);
  }
}

migrate();
