import { z } from "zod"

const studentSchema = z.object({
    name: z.string().min(3),
    email: z.string().email()
})

export default studentSchema;