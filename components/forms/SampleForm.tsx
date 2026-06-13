import FormControl from '@/components/ui/form-control';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, View } from 'react-native';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, '请输入用户名'),
  email: z.string().email('邮箱格式不正确').optional(),
});

type FormValues = z.infer<typeof schema>;

export default function SampleForm() {
  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', email: '' },
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    // replace with your submit logic
    console.log('submit', data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { value, onChange, onBlur } }) => (
          <FormControl label="用户名" error={errors.username?.message} required>
            <Input
              value={value}
              onChangeText={(text) => {
                onChange(text);
                if (errors.username) clearErrors('username');
              }}
              onBlur={onBlur}
              placeholder="请输入用户名"
            />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <FormControl label="邮箱" error={errors.email?.message}>
            <Input
              value={value}
              onChangeText={(text) => {
                onChange(text);
                if (errors.email) clearErrors('email');
              }}
              onBlur={onBlur}
              placeholder="可选，邮箱"
            />
          </FormControl>
        )}
      />

      <Button title="提交" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
