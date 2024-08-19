// import { CardWrapper } from "./card-wrapper";
import { CardWrapper } from '@/components/auth/card-wrapper';


export const LoginForm = () => {
  return (
    <CardWrapper
        headerLabel='Welcom Back'
        backButtonLabel="Dont have an account?"
        backButtonHref="/auth/register"
        showSocials
    >
      Login Form
    </CardWrapper>
  )
}
