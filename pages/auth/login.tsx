// @ts-nocheck
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import { useRedirectAuthenticated } from "@blitzjs/auth"

const LoginPage = () => {
  const router = useRouter()
  useRedirectAuthenticated("/")
  return (
    <Layout title="Log In">
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    </Layout>
  )
}

LoginPage.redirectAuthenticated = true


export default LoginPage
