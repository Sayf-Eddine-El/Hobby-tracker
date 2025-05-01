import db from "../utils/db.js";
import { progressSchema } from "../utils/schema.js";

export const addProgress = (req, res, next) => {
  try {
    const id = req.id;
    const { timeSpend, hobbieId } = req.body;
    const validation = progressSchema.safeParse({ timeSpend });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }

    const prepareAddQuery = db.prepare(
      "INSERT INTO progress (timespend , userId , hobbieId) VALUES (?,?,?)"
    );
    const prepareGetQuery = db.prepare(
      "SELECT * FROM progress WHERE userId = ? and hobbieId = ?"
    );

    const progress = prepareGetQuery.all(id, hobbieId);
    console.log(progress);
    if (progress[0] == undefined) {
      prepareAddQuery.run([timeSpend, id, hobbieId]);
      return res.status(200).json({
        success: true,
        message: "Progress added successfully",
      });
    }

    let lastProgressCommit = progress[0];

    progress.map((e) => {
      if (
        new Date(lastProgressCommit?.createdAt).getDate() <
        new Date(e.createdAt).getDate()
      )
        lastProgressCommit = e;
    });

    if (
      new Date(lastProgressCommit?.createdAt).getDate() != new Date().getDate()
    ) {
      prepareAddQuery.run([timeSpend, id, hobbieId]);
      return res.status(200).json({
        success: true,
        message: "The progress added successfully",
      });
    }

    return res.status(200).json({
      success: false,
      message: "You can add one progress for each hobbie every day",
    });
  } catch (e) {
    next(e);
  }
};

export const getProgress = (req, res, next) => {
  try {
    const id = req.id;

    const prepareQuery = db.prepare(
      "SELECT progress.createdAt AS progressCreation,progress.id AS progressId,* FROM progress JOIN hobies ON progress.hobbieId = hobies.id WHERE progress.userId = ?"
    );

    const progress = prepareQuery.all(id);

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteProgress = (req, res, next) => {
  try {
    const id = req.id;
    const { progressId } = req.body;
    const prepareQuery = db.prepare("DELETE FROM progress WHERE id = ?");

    prepareQuery.run([progressId]);

    res.status(200).json({
      success: true,
      message: "progress deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const updateProgress = (req, res, next) => {
  try {
    const id = req.id;
    const { progressId, timeSpend } = req.body;

    const validation = progressSchema.safeParse({ timeSpend });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }

    const prepareQuery = db.prepare(
      "UPDATE progress SET timespend = ? WHERE id = ?"
    );

    prepareQuery.run([timeSpend, progressId]);

    res.status(200).json({
      success: true,
      message: "progress updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getStreak = (req, res, next) => {
  try {
    const id = req.id;

    const prepareQuery = db.prepare(
      "SELECT hobies.name,progress.createdAt,progress.timeSpend FROM progress JOIN hobies ON progress.hobbieId = hobies.id  WHERE progress.createdAt > datetime('now','-7 days') AND progress.createdAt <= datetime('now') AND progress.userId = ?"
    );

    const weekProgress = prepareQuery.all([id]);

    const weekProgressDate = weekProgress.map((e) => {
      let day = "Sunday";

      for (let i = 1; i < 7; i++) {
        const date = new Date(e.createdAt).getDay();
        if (date == 1) {
          day = "Monday";
        } else {
          if (date == 2) {
            day = "Tuesday";
          } else {
            if (date == 3) {
              day = "Wednesday";
            } else {
              if (date == 4) {
                day = "Thursday";
              } else {
                if (date == 5) {
                  day = "Friday";
                } else {
                  if (date == 6) {
                    day = "Saturday";
                  }
                }
              }
            }
          }
        }
        const tmp = { ...e };
        tmp.day = day;

        return tmp;
      }

      return;
    });

    res.json({
      success: true,
      data: {
        weekProgressDate,
        misses: 7 - weekProgress.length,
      },
    });
  } catch (e) {
    next(e);
  }
};
