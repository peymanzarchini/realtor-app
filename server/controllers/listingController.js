import Listing from "../models/listing.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      const error = new Error("Listing not found!");
      error.statusCode = 404;
      throw error;
    }

    if (req.user.id !== listing.userRef) {
      const error = new Error("You can only delete your own listings!");
      error.statusCode = 401;
      throw error;
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (err) {
    next(err);
  }
};
