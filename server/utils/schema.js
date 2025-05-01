import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const hobbieSchema = z.object({
  name: z.string().min(4),
});

export const progressSchema = z.object({
  timeSpend: z.number().min(1).max(23),
});

export const goalSchema = z.object({
  name: z.string().min(1),
  deadLine: z.string(),
  timeToSpend: z.number().min(1),
});
