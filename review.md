# Sinh models từ database
- Sử dụng sequelize-auto (cài đặt bằng npm install -d)
- Câu lệnh: `npx sequelize-auto -o \"./models\" -d midterm-review-1 -h localhost -u myuser -x mypassword -p 5432 -e postgres -l esm`
- sử dụng model sequelize được config => xem file `utils/db` => initialize models bằng hàm `initModels` trước khi sử dụng.

# Zod validator
```
validator.js
import { failResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) 
    return failResponse(res, result.error.issues, 400)
  
  req.body = result.data;
  next();
};

trong route.js
import { validate } from '../middlewares/validator.js'
import { filmSchema } from '../schemas/film.schema.js'
filmRouter.post("/", validate(filmSchema), addFilm)

filmSchema
import { z } from "zod";

export const filmSchema = z.object({
    title: z.string({
        required_error: "Title is a required",
        invalid_type_error: "Title must be a string"
    }).min(1, "Title cannot be empty"),

    description: z.string().optional(),

    release_year: z.int().max(new Date().getFullYear(), "Year cannot be in the future").optional(),

    language_id: z.int("Language ID must be a string").min(1, "Language ID is required"),

    special_features: z
    .array(
        z.enum([
            "Trailers", 
            "Commentaries", 
            "Deleted Scenes", 
            "Behind the Scenes"
        ])
    )
    .optional()
    .refine(
      (arr) => !arr || new Set(arr).size === arr.length,
      { message: "Special features must be unique" }
    ),

    rating: z.enum(["G", "PG", "PG-13", "R", "NC-17"]).optional(),
}).strict()
```