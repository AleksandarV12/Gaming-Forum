const Theme = require("../models/themeModel");

// Get all themes
exports.getThemes = async (req, res) => {
  try {
    console.log("Fetching all themes...");
    //const themes = await Theme.find().populate("creatorId", "username");
    res.json({
      postIds: ["1", "4"],
      _id: "67590aa57c4ee20fb201fb84",
      id: "1",
      title: "Action Games",
      description:
        "Discuss your favorite action games, from platformers to shooters.",
      creatorId: "1",
      createdAt: "2024-01-10T08:00:00.000Z",
    });
  } catch (error) {
    console.error("Error fetching themes:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching themes", error: error.message });
  }
};

// Get a specific theme by ID or custom id
exports.getTheme = async (req, res) => {
  const { themeId } = req.params;
  try {
    let theme;

    // Check if themeId is a valid ObjectId or fallback to custom id
    if (themeId.match(/^[0-9a-fA-F]{24}$/)) {
      theme = await Theme.findById(themeId);
    } else {
      theme = await Theme.findOne({ id: themeId });
    }

    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: "Error fetching theme", error });
  }
};

// Create a new theme
exports.createTheme = async (req, res) => {
  const { id, title, description, creatorId } = req.body;
  try {
    const newTheme = new Theme({
      id,
      title,
      description,
      creatorId,
      createdAt: new Date(),
    });

    await newTheme.save();
    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ message: "Error creating theme", error });
  }
};

// Subscribe to a theme
exports.subscribe = async (req, res) => {
  const { themeId } = req.params;
  const { userId } = req.body;

  try {
    const theme = await Theme.findById(themeId);

    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    if (!theme.subscribers.includes(userId)) {
      theme.subscribers.push(userId);
      await theme.save();
    }

    res.json({ message: "Subscribed successfully", theme });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing to theme", error });
  }
};
