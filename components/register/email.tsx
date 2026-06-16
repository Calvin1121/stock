import { emailRegex, pwdRegex, sixverifyCode } from "@/utils/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import { RegisterFormBase } from "./form";

interface EmailRegisterProps {

}
export interface EmailRegisterRef {
    handleSubmit: (callback: (values: EmailRegisterFormValues) => void) => () => void

}
const emialSchema = z.object({
    emailType: z.string().min(1, 'register.emailType.require').refine(value => emailRegex.test(value), {message: 'register.emailType.invalid'}),
    verifyCode: z.string().min(1, 'register.verifyCode.require').refine((value) => sixverifyCode.test(value.toString()), { message: 'register.verifyCode.invalid' }),
    invitationCode: z.string(),
    password: z.string().refine(value => pwdRegex.test(value), { message: 'register.password.invalid' }),
    comfirmPassword: z.string().min(1, 'register.comfirmPassword.require'),
}).superRefine((data, ctx) => {
    if (data.password !== data.comfirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'register.comfirmPassword.invalid',
            path: ['comfirmPassword'],
        });
    }
})
export type EmailRegisterFormValues = z.infer<typeof emialSchema>;

export const EmailRegister = forwardRef<EmailRegisterRef, EmailRegisterProps>((props, ref) => {
    const { t } = useTranslation('auth');
    const formKeys = Object.keys(emialSchema.shape) as (keyof EmailRegisterFormValues)[]
    const { control, handleSubmit, formState: { errors } } = useForm<EmailRegisterFormValues>({
        resolver: zodResolver(emialSchema),
        defaultValues: formKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {}) as EmailRegisterFormValues,
        mode: 'onChange'
    })
    useImperativeHandle(ref, () => ({
        handleSubmit
    }))
    return <RegisterFormBase control={control} errors={errors}  formKeys={formKeys} />
})

EmailRegister.displayName = 'EmailRegister'