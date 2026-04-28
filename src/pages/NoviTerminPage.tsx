import { Button, DatePicker, Form, Input, Slider, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import type { Dayjs } from "dayjs";
import type { TerminForm } from "../types";
import dayjs from "dayjs";
import { useDodajTermin } from "../hooks/useDodajTermin";

const NoviTerminPage = () => {
  const [form] = useForm<TerminForm>();
  const { mutate } = useDodajTermin();

  const onFinish = (values: TerminForm) => {
    mutate(values);
  };

  const onReset = () => form.resetFields();
  const disabledDateTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 23],
  });

  const disabledDate = (current: Dayjs) => {
    const day = current.day();
    return (current < dayjs().startOf('day')) || day === 0 || day === 6;
  };

  return (
    <Form
      form={form}
      initialValues={{
        brojMjesta: 10,
        trajanjeMin: 60,
        opis: null
      }}
      name="control-hooks"
      onFinish={onFinish}
      wrapperCol={{ span: 15 }}
      style={{ maxWidth: 600, margin: "0 auto", padding: "30px" }}
    >
      <Form.Item
        name="naziv"
        label="Naziv"
        rules={[{ required: true, message: "Naziv mora biti unesen" }]}
      >
        <Input placeholder="Naziv termina" />
      </Form.Item>

      <Form.Item
        label="Vrijeme termina"
        name="vrijeme"
        rules={[{ required: true, message: "Vrijeme termina mora biti uneseno" }]}
      >
        <DatePicker
          showTime
          disabledTime={disabledDateTime}
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        label="Trajanje"
        name="trajanjeMin"
        rules={[{ required: true, message: "Trajanje mora biti uneseno" }]}
      >
        <Input
          type="number"
          placeholder="Trajanje termina u minutama"
          suffix="min"
        />
      </Form.Item>

      <Form.Item
        name="brojMjesta"
        label="Broj mjesta"
        rules={[{ required: true, message: "Broj mjesta mora biti unesen" }]}
      >
        <Slider
          min={1}
          max={30}
          tooltip={{ open: true, placement: "right" }}
        />
      </Form.Item>

      <Form.Item
        name="opis"
        label="Opis"
      >
        <TextArea />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
          >
            Dodaj
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
          >
            Resetiraj
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default NoviTerminPage;
