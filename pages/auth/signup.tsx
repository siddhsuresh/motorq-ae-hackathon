// @ts-nocheck
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Routes } from "@blitzjs/next"
import { useRedirectAuthenticated } from "@blitzjs/auth"

const SignupPage = () => {
  const router = useRouter()
  useRedirectAuthenticated("/")

  return (
    <Layout title="Sign Up">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Layout>
  )
}

export default SignupPage
