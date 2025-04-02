import * as z from 'zod'

export const SchemaSignUp = z.object({
    name: z.string().min(2,{
        message: 'Please enter your name',
    }).max(32),
    email: z.string().email({
        message: 'Please enter your email',
    }),
    password: z.string().min(8,{
        message: 'Password must be at least 8 characters',
    }).max(32),
    confirmPassword: z.string().min(8,{
        message: 'Password must be at least 8 characters',
    }).max(32),
})

export const SchemaLogin = z.object({
    email: z.string().email({
        message: 'Please enter your email',
    }),
    password: z.string().min(8,{
        message: 'Password must be at least 8 characters',
    }).max(32),
})