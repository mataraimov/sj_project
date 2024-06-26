import { Form, Select, InputNumber, Input, DatePicker, Button } from 'antd';
import moment from 'moment';
const { Option } = Select;

const FirstStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    nextStep(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <h2>Общие данные</h2>
      <Form.Item
        name={['arrives']}
        label="Поступление на лечение"
        rules={[
          { required: true, message: 'Пожалуйста, укажите поступление на стационарное лечение ' },
        ]}
      >
        <Select placeholder="Выберите поступление на стационарное лечение ">
          {statusOptions['arrives_list'] &&
            statusOptions['arrives_list'].map((option, i) => (
              <Option key={i} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['price']}
        label="Цена"
        rules={[{ required: true, message: 'Пожалуйста, укажите цену' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name={['conditions']}
        label="Условия"
        rules={[{ required: true, message: 'Пожалуйста, укажите условия' }]}
      >
        <Select placeholder="Выберите прибытие">
          {statusOptions['conditions_list'] &&
            statusOptions['conditions_list'].map((option, i) => (
              <Option key={i} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['escorts']}
        label="Сопровождение"
        rules={[{ required: true, message: 'Пожалуйста, укажите сопровождение' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['complaints']}
        label="Жалобы"
        rules={[{ required: true, message: 'Пожалуйста, укажите жалобы' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['date_of_admission']}
        label="Дата поступления"
        rules={[{ required: true, message: 'Пожалуйста, укажите дату поступления' }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={(current) => {
            const startOfMonth = moment().startOf('month');
            if (current.isBefore(startOfMonth)) {
              return true;
            }

            const endOfMonth = moment().endOf('month');
            if (current.isAfter(endOfMonth)) {
              return true;
            }

            return false;
          }}
        />
      </Form.Item>
      <Form.Item
        name={['date_of_discharge']}
        label="Дата выписки"
        rules={[{ required: true, message: 'Пожалуйста, укажите дату выписки' }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={(current) => {
            return current && current < moment().startOf('day');
          }}
        />
      </Form.Item>
      <Form.Item
        name={['departament']}
        label="Номер палаты"
        rules={[{ required: true, message: 'Пожалуйста, укажите номер отделения' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name={['number_of_days']}
        label="Количество дней"
        rules={[{ required: true, message: 'Пожалуйста, укажите количество дней' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Button type="primary" htmlType="submit" style={{ width: '140px' }}>
        Продолжить
      </Button>
    </Form>
  );
};

export default FirstStep;
