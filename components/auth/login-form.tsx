"use client"
// import { CardWrapper } from "./card-wrapper";
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition , useState } from "react";
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { LoginSchema } from '@/lib/models/schema';
import { Input } from '@/components/ui/input';
import {Button} from '@/components/ui/button' ;
import { FormError} from '@/components/form-error'
import { FormSuccess } from '@/components/form-success';
import { login } from '@/lib/actions';
 
export const LoginForm = () => {
  const [isPending, startTransition] =  useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password : "",
    },
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const data = await login(values);
        console.log("Login result:", data); // Add this line to debug
  
        if (data.success) {
          setSuccess("Login successful");
          setError("");
          // Optionally redirect or handle successful login
        } else {
          setSuccess("");
          setError(data.error || "Unexpected error occurred");
        }
      } catch (error) {
        setSuccess("");
        setError("An unexpected error occurred");
        console.error("Login error:", error);
      }
    });
  };
  return (
    <CardWrapper
        headerLabel='Welcom Back'
        backButtonLabel="Dont have an account?"
        backButtonHref="/auth/register"
        showSocials
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='jhon@gmail.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
               />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='********'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
               />

            </div>
            <FormError message= {error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
