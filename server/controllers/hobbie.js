import db from "../utils/db.js";
import { hobbieSchema } from "../utils/schema.js";

export const getHobbie = (req, res, next) => {
  try {
    const id = req.id;

    const prepareQuery = db.prepare("SELECT * FROM hobies WHERE userId = ?");

    const hobbie = prepareQuery.all(id);

    res.status(200).json({
      success: true,
      data: hobbie,
    });
  } catch (e) {
    next(e);
  }
};

export const postHobbie = (req, res, next) => {
  try {
    const id = req.id;

    const { name } = req.body;
    const validation = hobbieSchema.safeParse({ name });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }

    const prepareQuery = db.prepare(
      "INSERT INTO hobies (name,userId) VALUES (?,?)"
    );

    prepareQuery.run([name, id]);

    res.status(200).json({
      success: true,
      message: "The Hobbie created successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const deleteHobbie = (req, res, next) => {
  try {
    const id = req.id;

    const { hobbieId } = req.body;
    console.log(hobbieId);
    const prepareQuery = db.prepare(
      "DELETE FROM hobies WHERE id = ? and userId = ?"
    );

    const prepareCleanUpProgressQuery = db.prepare(
      "DELETE FROM progress WHERE hobbieId = ? and userId = ?"
    );
    const prepareCleanUpGoalsQuery = db.prepare(
      "DELETE FROM goals WHERE hobbieId = ? and userId = ?"
    );

    prepareCleanUpProgressQuery.run([hobbieId, id]);
    prepareCleanUpGoalsQuery.run([hobbieId, id]);
    prepareQuery.run([hobbieId, id]);

    res.status(200).json({
      success: true,
      message: "The Hobbie deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const updateHobbie = (req, res, next) => {
  try {
    const id = req.id;

    const { name, hobbieId } = req.body;

    const validation = hobbieSchema.safeParse({ name });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }

    const prepareQuery = db.prepare(
      "UPDATE hobies SET name = ? WHERE id = ? and userId = ?"
    );

    prepareQuery.run([name, hobbieId, id]);

    res.status(200).json({
      success: true,
      message: "The Hobbie updated successfully",
    });
  } catch (e) {
    next(e);
  }
};
