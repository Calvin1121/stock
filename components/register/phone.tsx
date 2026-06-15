import { globalPhoneRegex, pwdRegex, sixverifyCode } from "@/constants/utils";
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
    smsCode: z.string().min(1, 'register.smsCode.require').refine((value) => sixverifyCode.test(value.toString()), { message: 'register.smsCode.invalid' }),
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