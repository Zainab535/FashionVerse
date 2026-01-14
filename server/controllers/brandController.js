import Brand from "../models/Brand.js";

// 👮 ADMIN → Get all brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
      .populate("owner", "name email role");

    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👮 ADMIN → Approve / Reject brand
export const updateBrandStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;

    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.isApproved = isApproved;
    await brand.save();

    res.json({
      message: `Brand ${isApproved ? "approved" : "rejected"} successfully`,
      brand
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
