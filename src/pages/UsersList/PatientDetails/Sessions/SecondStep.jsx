import { useState } from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
const { Option } = Select;

const SecondStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const [lossOfControlQuantity, setLossOfControlQuantity] = useState('');
  const [lossOfControlSituation, setLossOfControlSituation] = useState('');

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.anamnesis) {
      if (changedValues.anamnesis.lossOfControlQuantity !== undefined) {
        setLossOfControlQuantity(changedValues.anamnesis.lossOfControlQuantity);
      }
      if (changedValues.anamnesis.lossOfControlSituation !== undefined) {
        setLossOfControlSituation(changedValues.anamnesis.lossOfControlSituation);
      }
    }
  };

  const onFinish = (values) => {
    const category = `Количественный контроль: ${lossOfControlQuantity}; Ситуационный контроль: ${lossOfControlSituation}`;

    const updatedValues = {
      ...values,
      anamnesis: {
        ...values.anamnesis,
        category,
      },
    };
    console.log(updatedValues);
    nextStep(updatedValues);
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 18 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <h2>Анамнез жизни</h2>
      <Form.Item
        name={['anamnesis', 'receiving_something']}
        label="Последний приём алкоголя"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о последнем приёме алкоголя' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['anamnesis', 'somatic_disorders']}
        label="Соматические расстройства"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о соматических расстройствах',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'mental_disorders']}
        label="Психические расстройства"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о психических расстройствах' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'daily_tolerance']}
        label="Максимальная суточная толерантность"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о максимальной суточной переносимости',
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        name={['anamnesis', 'light_gaps']}
        label="Светлые промежутки"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о световых промежутках' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'duration_last_binge']}
        label="Продолжительность последнего запоя"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о продолжительности последнего похмелья',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'duration_last_remission']}
        label="Продолжительность последней ремиссии"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о продолжительности последней ремиссии',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'last_treatment']}
        label="Последнее лечение"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о последнем лечении' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['anamnesis', 'dose']}
        label="Дозировка"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дозировке' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'addition']}
        label="Дополнение"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дополнении' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'type_tolerance']}
        label="Толерантность"
        rules={[{ required: true, message: 'Пожалуйста, выберите толерантность' }]}
      >
        <Select placeholder="Выберите толерантность">
          <Option value="Стабильный">Стабильный</Option>
          <Option value="Увеличивается">Увеличивается</Option>
          <Option value="Уменьшается">Уменьшается</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'type_palimpsests']}
        label="Палимпсесты"
        rules={[{ required: true, message: 'Пожалуйста, выберите палимпсесты' }]}
      >
        <Select placeholder="Выберите палимпсесты">
          <Option value="Есть">Есть</Option>
          <Option value="Нет">Нет</Option>
          <Option value="Тотальная амнезия есть">Тотальная амнезия есть</Option>
          <Option value="Тотальная амнезия нет">Тотальная амнезия нет</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'type_intoxication']}
        label="Опьянение"
        rules={[{ required: true, message: 'Пожалуйста, выберите опьянение' }]}
      >
        <Select placeholder="Выберите опьянение">
          <Option value="Эксплозивный">Эксплозивный</Option>
          <Option value="Дисфорический">Дисфорический</Option>
          <Option value="Истерический">Истерический</Option>
          <Option value="Импульсивный">Импульсивный</Option>
          <Option value="Депрессивный">Депрессивный</Option>
          <Option value="Маниакальный">Маниакальный</Option>
          <Option value="Сомнолентный">Сомнолентный</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Количественный контроль"
        name={['anamnesis', 'lossOfControlQuantity']}
        rules={[{ required: true, message: 'Пожалуйста, выберите утрату контроля' }]}
      >
        <Select
          placeholder="Выберите утрату контроля"
          onChange={(value) => setLossOfControlQuantity(value)}
        >
          <Option value="утрачен">Утрачен</Option>
          <Option value="не утрачен">Не утрачен</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ситуационный контроль"
        name={['anamnesis', 'lossOfControlSituation']}
        rules={[{ required: true, message: 'Пожалуйста, выберите утрату контроля' }]}
      >
        <Select
          placeholder="Выберите утрату контроля"
          onChange={(value) => setLossOfControlSituation(value)}
        >
          <Option value="утрачен">Утрачен</Option>
          <Option value="не утрачен">Не утрачен</Option>
        </Select>
      </Form.Item>

      <Button key="back" onClick={prevStep} style={{ width: '140px' }}>
        Назад
      </Button>
      <Button type="primary" htmlType="submit" style={{ width: '140px' }}>
        Продолжить
      </Button>
    </Form>
  );
};

export default SecondStep;
