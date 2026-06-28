// Simple owner-auth middleware using a shared secret header.
// In production, replace with JWT-based auth.
export const ownerAuth = (req, res, next) => {
  const secret = req.headers["x-owner-secret"];
  if (!secret || secret !== process.env.OWNER_SECRET) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
