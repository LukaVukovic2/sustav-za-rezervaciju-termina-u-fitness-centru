import { Button, DatePicker, Form, Input, Slider, Space } from "antd";
import { useUrediTermin } from "../hooks/useUrediTermin";
import TextArea from "antd/es/input/TextArea";
import type { TerminForm } from "../types";
import { useForm } from "antd/es/form/Form";
import dayjs, { Dayjs } from "dayjs";
import { useDohvatiDetaljeTermina } from "../hooks/useDohvatiDetaljeTermina";
import { useParams } from "react-router";
import { useEffect } from "react";

const UrediTerminPage = () => {
  const [form] = useForm<TerminForm>();
  const { id } = useParams();
  const { data: termin } = useDohvatiDetaljeTermina(String(id));
  const { mutate } = useUrediTermin();
  const onFinish = (values: TerminForm) => {
    mutate(values);
  };

  useEffect(() => {
    if (termin) {
      form.setFieldsValue({
        _id: termin._id,
        naziv: termin.naziv,
        brojMjesta: termin.brojMjesta,
        trajanjeMin: termin.trajanjeMin,
        opis: termin.opis,
        vrijeme: termin.vrijeme ? dayjs(termin.vrijeme) : undefined,
      });
    }
  }, [termin, form]);

  const disabledDateTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 23],
  });

  const disabledDate = (current: Dayjs) => {
    const day = current.day();
    return current < dayjs().startOf("day") || day === 0 || day === 6;
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      wrapperCol={{ span: 15 }}
      style={{ maxWidth: 600, margin: "0 auto", padding: "30px" }}
    >
      <Form.Item
        name="_id"
        hidden={true}
      >
        <Input type="hidden" />
      </Form.Item>
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
        rules={[
          { required: true, message: "Vrijeme termina mora biti uneseno" },
        ]}
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
            Uredi
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UrediTerminPage;
