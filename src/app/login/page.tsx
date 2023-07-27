"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<any>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async (values: { email: string; password: string }) => {
    const response = await supabase.auth.signInWithPassword(values);
    router.push("/dashboard");
  };

  const handleSignOut = async () => {
    const response = await supabase.auth.signOut();
    console.log("🚀 ~ file: page.tsx:34 ~ handleSignOut ~ response:", response);
    router.refresh();
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {/* <section
        style={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        <section style={{ width: "40%" }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            redirectTo="/dashboard"
            showLinks={false}
            view="sign_in"
            theme="dark"
            otpType="email"
            localization={{
              variables: {
                sign_in: {
                  email_label: "Your email address",
                  password_label: "Your strong password",
                },
              },
            }}
          />
        </section>
      </section> */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: 'center'
        }}
      >
        <Card style={{ width: 400, height: 200 }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSignIn}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </section>
    </>
  );
}
