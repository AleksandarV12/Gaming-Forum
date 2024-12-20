const Theme = require("../models/themeModel");

// Create a new theme
exports.createTheme = async (req, res) => {
  const { description, userId, themeName } = req.body;
  const theme = new Theme({ description, userId, themeName });

  try {
    await theme.save();
    res.status(201).json({ message: "Theme created", theme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all themes
exports.getThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single theme
exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a theme
exports.updateTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    res.json({ message: "Theme updated", theme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a theme
exports.deleteTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    res.json({ message: "Theme deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
