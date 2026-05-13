import { Button, Form, Input, Radio, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import type { Korisnik, Uloga } from "../../types";

type AuthPolja = Korisnik & { lozinka: string }

const uloge: Uloga[] = [
  "Korisnik",
  "Trener"
]

export default function AuthForma() {
  const [form] = useForm<AuthPolja>();
  const uloga = Form.useWatch('uloga', form);

  const promijeniTipForme = () => {
    //setter stanja za mijenjanje tipa forme
  }

  const onFinish = (values: AuthPolja) => {
    console.log(values)
  }
  
  return (
    <Form
      form={form}
      onFinish={onFinish}
      wrapperCol={{ span: 15 }}
      initialValues={{
        uloga: "Korisnik"
      }}
      style={{ maxWidth: 600, margin: "0 auto", padding: "30px" }}
    >
      <Form.Item
        name="ime"
        label="Ime"
        rules={[{ required: true, message: "Ime mora biti uneseno" }]}
      >
        <Input placeholder="Ime" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Email mora biti unesen" }]}
      >
        <Input placeholder="Email" type="email" />
      </Form.Item>

      <Form.Item
        name="lozinka"
        label="Lozinka"
        rules={[{ required: true, message: "Lozinka mora biti unesena" }]}
      >
        <Input placeholder="Lozinka" type="password" />
      </Form.Item>

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

      {
        uloga === "Trener" && (
          <Form.Item
            name="specijalnost"
            label="Specijalnost"
            rules={[{ required: true, message: "Specijalnost mora biti unesena" }]}
          >
            <Input placeholder="Specijalnost" />
          </Form.Item>
        )
      }

      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
          >
            Registriraj se
          </Button>
          <Button
            htmlType="button"
            onClick={promijeniTipForme}
          >
            Imaš već račun? Prijavi se
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
