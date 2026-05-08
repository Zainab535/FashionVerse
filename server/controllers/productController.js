import Product from '../models/Product.js';
import Brand from '../models/Brand.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { category, subCategory, brand, page = 1, limit = 10, days, isNewArrival } = req.query;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (brand) query.brand = brand;

    if (days || isNewArrival) {
      const dayCount = days ? parseInt(days) : 7;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dayCount);
      query.createdAt = { $gte: startDate };
    }

    const products = await Product.find(query)
      .populate("brand", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand", "name")
      .populate("reviews.userId", "name username");
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add review to product
export const addReview = async (req, res) => {
  try {
    const { rating, comment, title } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = {
      userId: req.user._id,
      rating: Number(rating),
      comment,
      title,
      createdAt: new Date(),
    };

    product.reviews.push(review);

    // Update product rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    // Populate before sending back so frontend has user details immediately
    const populatedProduct = await Product.findById(product._id)
      .populate("brand", "name")
      .populate("reviews.userId", "name username");

    res.status(201).json({ message: 'Review added successfully', product: populatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COLOR FAMILIES MAPPING
// COLOR FAMILIES MAPPING (EXPERTLY CURATED FOR FASHION)
const COLOR_FAMILIES = {
  red: ['red', 'vermillion', 'carmine', 'raspberry', 'tomato', 'wine', 'candy apple', 'fire red', 'poppy', 'amaranth', 'cerise', 'falu red', 'persian red', 'indian red', 'venetian red', 'terra cotta red', 'maroon', 'burgundy', 'crimson', 'ruby', 'scarlet', 'cherry', 'rust', 'brick', 'garnet', 'merlot', 'sangria', 'berry', 'currant', 'lal', 'surkh', 'mahogany', 'terracotta', 'chili', 'blood red'],
  blue: ['blue', 'aquamarine', 'turquoise', 'prussian blue', 'ultamarine', 'denim', 'cornflower', 'sapphire', 'midnight blue', 'cadet blue', 'dodger blue', 'electric blue', 'azure', 'cyan', 'slate blue', 'carolina blue', 'navy', 'sky blue', 'royal blue', 'teal', 'cobalt', 'indigo'],
  yellow: ['yellow', 'saffron yellow', 'goldenrod', 'flax', 'ecru', 'naples yellow', 'aureolin', 'citrine', 'straw', 'banana', 'jasmine', 'corn', 'jonquil', 'laser lemon', 'pear', 'gold', 'lemon', 'mustard', 'amber', 'canary'],
  orange: ['orange', 'vermillion orange', 'ochre', 'cadmium orange', 'tiger orange', 'papaya', 'persimmon', 'flame', 'amber orange', 'cider', 'cinnabar', 'tuscan', 'dark salmon', 'peach', 'coral', 'apricot', 'tangerine', 'burnt orange'],
  green: ['green', 'viridian', 'fern', 'moss', 'pine', 'bottle green', 'celadon', 'shamrock', 'malachite', 'jungle green', 'hooker green', 'asparagus', 'artichoke', 'screamin green', 'tea green', 'rifle green', 'olive', 'emerald', 'lime', 'mint', 'sage', 'forest green', 'olive green'],
  purple: ['purple', 'byzantium', 'heliotrope', 'mulberry', 'thistle', 'wisteria', 'palatinate', 'tyrian purple', 'royal purple', 'african violet', 'iris', 'fuchsia', 'puce', 'ube', 'dust storm', 'medium purple', 'violet', 'lavender', 'magenta', 'plum', 'orchid', 'lilac'],
  black: ['black', 'licorice', 'dark slate', 'raisin black', 'eerie black', 'chinese black', 'oil black', 'gunmetal', 'dark charcoal', 'black olive', 'black coral', 'outer space', 'dark jungle green', 'rich black', 'smoky black', 'lamp black', 'charcoal', 'ebony', 'jet black', 'obsidian', 'onyx'],
  white: ['white', 'floral white', 'seashell', 'mint cream', 'azure white', 'honeydew', 'lavender white', 'cornsilk', 'old lace', 'antique white', 'cosmic latte', 'magnolia', 'porcelain', 'cotton', 'smoke white', 'navajo white', 'ivory', 'snow', 'off-white', 'cream', 'pearl', 'alabaster'],
  brown: ['brown', 'tan', 'beige', 'coffee', 'chocolate', 'cocoa', 'camel', 'taupe', 'sand', 'nude', 'copper', 'sepia', 'russet', 'khaki', 'mocha', 'latte', 'espresso', 'caramel', 'walnut', 'cedar', 'brunette', 'auburn', 'chestnut', 'amber', 'skin', 'bhura', 'matti', 'biscuit', 'fawn', 'sienna', 'bronze'],
  pink: ['pink', 'rose', 'blush', 'hot pink', 'salmon', 'flamingo', 'strawberry', 'bubblegum', 'watermelon', 'magenta pink', 'fuchsia pink'],
  grey: ['grey', 'gray', 'silver', 'slate', 'ash', 'lead', 'pewter', 'charcoal grey', 'smoke']
};

// HEX TO FAMILY HELPER (PROPRIETARY ALGORITHM)
const hexToFamily = (hexCode) => {
  if (!hexCode || !hexCode.startsWith("#")) return null;
  const hex = hexCode.replace('#', '');
  if (hex.length !== 6 && hex.length !== 3) return null;

  let r, g, b;
  if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  }

  // Grayscale / Black / White
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  if (diff < 50) {
    if (max < 85) return "black";
    if (min > 200) return "white";
    return "grey";
  }

  // Pure Hue Detection
  if (r > g && r > b) {
    if (g > 140 && b < 110) return "orange";
    if (b > 140 && g < 140) return "purple";
    if (g < 160 && b < 160 && r - Math.max(g, b) > 40) return "red";
    if (r > 190 && g > 90 && b > 90) return "pink";
  }
  if (g > r && g > b) {
    if (r > 140 && b < 110) return "yellow";
    return "green";
  }
  if (b > r && b > g) {
    if (r > 140) return "purple";
    return "blue";
  }

  // Specific Brown/Beige logic
  if (r > 60 && g > 40 && b < 150 && r > g && (r - g) < 100) return "brown";

  return null;
};

const getColorFamilies = (productColors) => {
  if (!productColors || !Array.isArray(productColors)) return [];
  const families = new Set();

  productColors.forEach(color => {
    const lowerColor = color.toLowerCase().trim();

    // Check if it's hex
    if (lowerColor.startsWith('#')) {
      const family = hexToFamily(lowerColor);
      if (family) families.add(family);
    } else {
      // Check in map
      for (const [family, members] of Object.entries(COLOR_FAMILIES)) {
        if (members.some(member => lowerColor === member || lowerColor.split(' ').includes(member))) {
          families.add(family);
        }
      }
    }
  });
  return Array.from(families);
};

const getColorMatchQuery = (product, families) => {
  const queryParts = [];

  // 1. Family Match (Regex)
  if (families && families.length > 0) {
    const allRelatedColors = [];
    families.forEach(family => {
      if (COLOR_FAMILIES[family]) {
        allRelatedColors.push(...COLOR_FAMILIES[family]);
      }
    });
    const regexes = allRelatedColors.map(color => new RegExp(`(^|\\s)${color}(\\s|$)`, 'i'));
    queryParts.push({ colors: { $in: regexes } });

    // Also include hex codes for black/white if family matches
    if (families.includes('black')) {
      queryParts.push({ colors: { $in: [/^#[0-5][0-9a-f]{5}$/i, /^#[0-5][0-9a-f]{2}$/i] } });
    }
    if (families.includes('white')) {
      queryParts.push({ colors: { $in: [/^#[c-f][0-9a-f]{5}$/i, /^#[c-f][0-9a-f]{2}$/i] } });
    }
  }

  // 2. Exact Match Fallback
  if (product.colors && product.colors.length > 0) {
    const exactRegexes = product.colors.map(color => {
      if (color.startsWith('#')) return color; // Exact hex
      return new RegExp(`(^|\\s)${color}(\\s|$)`, 'i');
    });
    queryParts.push({ colors: { $in: exactRegexes } });
  }

  // If we have parts, join them with $or
  if (queryParts.length > 0) {
    return { $or: queryParts };
  }

  return {};
};

// GET BRANDS FOR COMPARISON
export const getComparisonBrands = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const families = getColorFamilies(product.colors);

    // 1. Fetch all potential candidates (Strict Category + SubCategory)
    const query = {
      _id: { $ne: product._id },
      category: product.category,
      subCategory: product.subCategory, 
      brand: { $ne: product.brand },
      isActive: true
    };

    const candidates = await Product.find(query);
    
    // 2. Filter candidates by matching any color family
    const matchingBrands = new Set();
    candidates.forEach(p => {
      const pFamilies = getColorFamilies(p.colors);
      const hasMatch = pFamilies.some(f => families.includes(f));
      if (hasMatch) {
        matchingBrands.add(p.brand.toString());
      }
    });

    const brands = await Brand.find({ _id: { $in: Array.from(matchingBrands) } });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCTS FOR COMPARISON BY BRANDS
export const getComparisonProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const { brandIds } = req.query;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const families = getColorFamilies(product.colors);
    const brandIdArray = brandIds ? brandIds.split(',') : [];

    const query = {
      _id: { $ne: product._id },
      category: product.category,
      subCategory: product.subCategory,
      brand: { $in: brandIdArray, $ne: product.brand },
      isActive: true
    };

    const candidates = await Product.find(query).populate("brand", "name");
    
    // 2. Filter by color family match
    const matchingProducts = candidates.filter(p => {
      const pFamilies = getColorFamilies(p.colors);
      return pFamilies.some(f => families.includes(f));
    });

    res.json(matchingProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
