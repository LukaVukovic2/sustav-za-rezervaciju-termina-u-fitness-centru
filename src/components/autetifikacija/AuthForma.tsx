import { Button, Form, Input, Radio, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import type { AuthPolja, Uloga } from "../../types";
import { useState } from "react";
import { useAutentificirajKorisnika } from "../../hooks/useAutentificirajKorisnika";


const uloge: Uloga[] = [
  "Korisnik",
  "Trener"
]

export default function AuthForma() {
  const { mutate } = useAutentificirajKorisnika();
  const [form] = useForm<AuthPolja>();
  const uloga = Form.useWatch('uloga', form);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onFinish = (values: AuthPolja) => {
    mutate({ korisnik: values, isLogin })
  }
  
  return (
    <div style={{padding: "50px 0"}}>
      <h2>{isLogin ? "Prijava " : "Registracija"}</h2>
      <Form
        form={form}
        onFinish={onFinish}
        wrapperCol={{ span: 15 }}
        labelCol={{ span: 4}}
        initialValues={{
          uloga: "Korisnik"
        }}
        style={{ maxWidth: 600, margin: "0 auto", padding: "30px" }}
      >
        {
          !isLogin && (
            <Form.Item
              name="ime"
              label="Ime"
              rules={[{ required: true, message: "Ime mora biti uneseno" }]}
            >
              <Input placeholder="Ime" />
            </Form.Item>
          )
        }

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email mora biti unesen" }]}
        >
          <Input placeholder="Email" type="email" autoComplete="off"/>
        </Form.Item>

        <Form.Item
          name="lozinka"
          label="Lozinka"
          rules={[{ required: true, message: "Lozinka mora biti unesena" }]}
        >
          <Input placeholder="Lozinka" type="password" />
        </Form.Item>

        {
          !isLogin && (
            <Form.Item 
              name="uloga"
              label="Uloga"
              rules={[{ required: true, message: "Uloga mora biti odabrana" }]}
            >
              <Radio.Group>
                {
                  uloge.map(uloga => (<Radio key={uloga} value={uloga}>{uloga}</Radio>))
                }
              </Radio.Group>
            </Form.Item>
          )
        }

        {
          uloga === "Trener" && !isLogin && (
            <Form.Item
              name="specijalnost"
              label="Specijalnost"
              rules={[{ required: true, message: "Specijalnost mora biti unesena" }]}
            >
              <Input placeholder="Specijalnost" />
            </Form.Item>
          )
        }

          <Space align="center" >
            <Button
              type="primary"
              htmlType="submit"
            >
              {isLogin ? "Prijavi se" : "Registriraj se"}
            </Button>
            <Button
              htmlType="button"
              onClick={() => setIsLogin(prev => !prev)}
            >
              {isLogin ? "Nemaš još račun? Registriraj se" : "Imaš već račun? Prijavi se"}
            </Button>
          </Space>
      </Form>
    </div>
  );
}
