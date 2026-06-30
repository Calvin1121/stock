import { globalPhoneRegex, pwdRegex, sixverifyCode } from "@/utils/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { RegisterFormBase } from "./form";

interface PhoneRegisterProps {

}
export interface PhoneRegisterRef {
    handleSubmit: (callback: (values: PhoneRegisterFormValues) => void) => () => void
}
const emialSchema = z.object({
    phoneType: z.string().min(1, 'register.phoneType.require').refine(value => globalPhoneRegex.test(value), {message: 'register.phoneType.invalid'}),
    verifyCode: z.string().min(1, 'register.verifyCode.require').refine((value) => sixverifyCode.test(value.toString()), { message: 'register.verifyCode.invalid' }),
    invitationCode: z.string(),
    password: z.string().refine(value => pwdRegex.test(value), { message: 'register.password.invalid' }),
    confirmPassword: z.string().min(1, 'register.confirmPassword.require'),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'register.confirmPassword.invalid',
            path: ['confirmPassword'],
        });
    }
})
export type PhoneRegisterFormValues = z.infer<typeof emialSchema>;

export const PhoneRegister = forwardRef<PhoneRegisterRef, PhoneRegisterProps>((props, ref) => {
    const formKeys = Object.keys(emialSchema.shape) as (keyof PhoneRegisterFormValues)[]
    const { handleSubmit, control, formState: { errors } } = useForm<PhoneRegisterFormValues>({
        resolver: zodResolver(emialSchema),
        defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as PhoneRegisterFormValues,
        mode: 'onChange'
    })
    useImperativeHandle(ref, () => ({
        handleSubmit
    }))
    return <RegisterFormBase control={control} errors={errors}  formKeys={formKeys} />
})

PhoneRegister.displayName = 'PhoneRegister'