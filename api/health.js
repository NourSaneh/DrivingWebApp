import { getDB } from "./_db.js";

export default async function handler(req, res) {
  try {
    const db = await getDB();
    res.status(200).json({ ok: true, database: db.databaseName });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
