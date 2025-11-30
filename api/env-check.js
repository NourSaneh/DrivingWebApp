export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    has_MONGODB_URI: Boolean(process.env.MONGODB_URI),
    has_MONGO_URI: Boolean(process.env.MONGO_URI),
  });
}
