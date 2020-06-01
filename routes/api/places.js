const express = require("express");
const router = express.Router();

const Place = require("../../models/Place");
const Search = require("../../models/Search");

/**
 * @route POST api/places
 * @desc Create a place
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    let { id, name } = req.body;
    //Check if place exists
    let place = await Place.findOne({ openWeatherId: id });
    if (place) {
      //Get search quantity
      let searchQtty = await Search.countDocuments({ place: place._id });
      searchQtty++; //Increment search quantity because new search has not been added yet

      return res.status(200).json({
        result: place,
        errors: [{ msg: "Place already exists" }],
        searchQtty: searchQtty,
      });
    }

    let newPlace = new Place({
      name: name,
      openWeatherId: id,
    });

    newPlace = await newPlace.save();

    return res
      .status(200)
      .json({ result: newPlace, msg: "Place created", searchQtty: 1 });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route GET api/places
 * @desc Get all places
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    Place.find().then((places) => {
      return res.status(200).json({
        success: true,
        msg: "All places retrieved. Quantity: " + places.length,
        result: places,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route GET api/places/:placeId
 * @desc Get place by Id
 * @access Public
 */
router.get("/:placeId", async (req, res) => {
  let placeId = req.params.placeId;

  try {
    Place.findById(placeId).then((place) => {
      return res.status(200).json({
        success: true,
        msg: "Place retrieved",
        result: place,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
