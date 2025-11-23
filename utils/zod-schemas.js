import * as z from "zod";

export const order = z.object({
    user_id: z.int32("User ID must be integer").min(0, {error: "User ID must be positive"}),
    total_amount: z.int32().min(0),
    status: z.string().max(20).optional(),
})