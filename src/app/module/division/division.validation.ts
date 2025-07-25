import z from "zod";

export const createDivisionSchema = z.object({
  name: z.string({ error: "name must be string" }).min(1),
  thumbnail: z.string({ error: "thumbnail must be string" }).optional(),
  description: z.string({ error: "description must be string" }).optional(),
});

export const updateDivisionSchema = z.object({
  name: z.string({ error: "name must be string" }).min(1).optional(),
  thumbnail: z.string({ error: "thumbnail must be string" }).optional(),
  description: z.string({ error: "description must be string" }).optional(),
});



