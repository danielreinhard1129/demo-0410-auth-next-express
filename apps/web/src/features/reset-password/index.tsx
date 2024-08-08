"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useFormik } from "formik";
import { FC } from "react";
import { ResetPasswordSchema } from "./schemas/ResetPasswordSchema";

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { resetPassword, isLoading } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword(values.password, token);
    },
  });

  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.password && !!formik.errors.password ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Your Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
            </div>

            <Button className="mt-6 w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPasswordPage;
