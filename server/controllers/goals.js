import { date } from "zod";
import db from "../utils/db.js";
import { goalSchema } from "../utils/schema.js";

export const addGoal = (req, res, next) => {
  try {
    const id = req.id;

    const { name, deadLine, timeToSpend, hobbieId } = req.body;
    const validation = goalSchema.safeParse({
      name,
      deadLine,
      timeToSpend,
      hobbieId,
    });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }

    const prepareValidQuery = db.prepare(
      "SELECT * FROM goals WHERE name = ? AND hobbieId = ?"
    );

    const prepareGetQuery = db.prepare(
      "INSERT INTO goals (name , deadLine,timeToSpend,hobbieId , userId) VALUES (?,?,?,?,?)"
    );
    if (!prepareValidQuery.get([name, hobbieId])) {
      prepareGetQuery.run([name, deadLine, timeToSpend, hobbieId, id]);
      res.status(200).json({
        success: true,
        message: "The Goal added successfully",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "The Goal already exist",
      });
    }
  } catch (e) {
    next(e);
  }
};

export const getGoal = (req, res, next) => {
  try {
    const id = req.id;

    const prepareQuery = db.prepare(
      "SELECT goals.id,goals.name,goals.hobbieId,goals.deadLine,goals.timeToSpend,progress.timespend FROM goals JOIN progress ON progress.hobbieId = goals.hobbieId WHERE goals.userId = ? and progress.createdAt >= goals.createdAt AND progress.createdAt <= goals.deadLine"
    );

    const goals = prepareQuery.all(id);
    let goalsData = [
      {
        goalId: goals[0].id,
        name: goals[0].name,
        hobbieId: goals[0].hobbieId,
        totalTimeSpend: 0,
        deadLine: goals[0].deadLine,
        timeToSpend: goals[0].timeToSpend,
      },
    ];

    goals.map((goal) => {
      const existingGoal = goalsData.find(
        (g) => g.name === goal.name && g.hobbieId === goal.hobbieId
      );

      if (existingGoal) {
        existingGoal.totalTimeSpend += goal.timespend;
      } else {
        goalsData.push({
          goalId: goal.id,
          name: goal.name,
          hobbieId: goal.hobbieId,
          totalTimeSpend: goal.timespend,
          deadLine: goal.deadLine,
          timeToSpend: goal.timeToSpend,
        });
      }
    });
    res.status(200).json({
      success: true,
      data: goalsData,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteGoal = (req, res, next) => {
  try {
    const id = req.id;

    const { goalId } = req.body;

    const prepareQuery = db.prepare(
      "DELETE FROM goals WHERE userId = ? and id = ?"
    );

    prepareQuery.run([id, goalId]);

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export const updateGoal = (req, res, next) => {
  try {
    const id = req.id;

    const { name, deadLine, timeToSpend, goalId } = req.body;
    const validation = goalSchema.safeParse({
      name,
      deadLine,
      timeToSpend,
    });
    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }

    const prepareQuery = db.prepare(
      "UPDATE goals SET name = ? , deadLine = ? , timeToSpend = ?  WHERE userId = ? and id = ?"
    );

    prepareQuery.run([name, deadLine, timeToSpend, id, goalId]);

    res.status(200).json({
      success: true,
      message: "The goal updated successfully",
    });
  } catch (e) {
    next(e);
  }
};
