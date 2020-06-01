const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Search = require("../../models/Search");

/**
 * @route  POST api/searches
 * @desc Create a place search
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    let newSearch = new Search(req.body);

    //Display real time searches in client
    var socketio = require("../../server");
    socketio.emit("newSearch", newSearch);

    newSearch = await newSearch.save();

    res.json(newSearch);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route GET api/searches/place/:placeId
 * @desc Get searches of specified place
 * @access Public
 */
router.get("/place/:placeId", async (req, res) => {
  let { placeId } = req.params;

  try {
    Search.find({ place: placeId }).then((searches) => {
      return res.status(200).json({
        success: true,
        msg: "Searches retrieved. Quantity: " + searches.length,
        result: searches,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route GET api/searches/user/:userId
 * @desc Get searches of specified user
 * @access Private
 */
router.get("/user/:userId", auth, async (req, res) => {
  let { userId } = req.params;

  try {
    Search.find({ user: userId }).then((searches) => {
      return res.status(200).json({
        success: true,
        msg: "Searches retrieved. Quantity: " + searches.length,
        result: searches,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
