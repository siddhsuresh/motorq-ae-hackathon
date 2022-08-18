// @ts-nocheck
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

// export const LoginForm = (props: LoginFormProps) => {
//   const [loginMutation] = useMutation(login)
//   return (
//     <div>
//       <h1>Login</h1>

//       <Form
//         submitText="Login"
//         schema={Login}
//         initialValues={{ email: "", password: "" }}
//         onSubmit={async (values) => {
//           try {
//             const user = await loginMutation(values)
//             props.onSuccess?.(user)
//           } catch (error: any) {
//             if (error instanceof AuthenticationError) {
//               return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
//             } else {
//               return {
//                 [FORM_ERROR]:
//                   "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
//               }
//             }
//           }
//         }}
//       >
//         <LabeledTextField name="email" label="Email" placeholder="Email" />
//         <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
//         <div>
//           <Link href={Routes.ForgotPasswordPage()}>
//             <a>Forgot your password?</a>
//           </Link>
//         </div>
//       </Form>

//       <div style={{ marginTop: "1rem" }}>
//         Or{" "}
//         <Link href={Routes.SignupPage()}>
//           <a>Sign Up</a>
//         </Link>
//       </div>
//     </div>
//   )
// }

import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core"

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}))

export function LoginForm(props: LoginFormProps) {
  const [loginMutation] = useMutation(login)
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Welcome Back To Riviera
        </Title>

        <Form
          // submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values)
              props.onSuccess?.(user)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <div>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>Forgot your password?</a>
            </Link>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
          </button>
        </Form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{" "}
          <Link href={Routes.SignupPage()}>
            <a>Sign Up</a>
          </Link>
        </Text>
      </Paper>
    </div>
  )
}
export default LoginForm
