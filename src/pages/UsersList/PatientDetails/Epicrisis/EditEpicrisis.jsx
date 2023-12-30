  import { Modal, Form, Input, message } from 'antd';
  import axios from 'axios';
  import moment from 'moment';
  import 'moment/locale/ru';
  import { API_URL } from '../../../../components/utils/config';
  import { refreshAccessToken } from '../../../../components/utils/refreshToken';

  export const EditEpicrisisModal = ({ visible, onCancel, epicrisisDetails }) => {
    const [form] = Form.useForm();

    const handleFormSubmission = async () => {
      try {
        moment.locale('ru');
        const values = await form.validateFields();
        values.start_treatment = moment(values.start_treatment).format('YYYY-MM-DD');
        values.end_treatment = moment(values.end_treatment).format('YYYY-MM-DD');
        await refreshAccessToken();

        const headers = {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        };

        const response = await axios.patch(
          `${API_URL}/api/v1/epicrisis/${epicrisisDetails.id}/`,
          values,
          { headers },
        );

        if (response.status === 200) {
          message.success('Эпикриз успешно отредактирован');
        }

        onCancel();
      } catch (error) {
        console.error('Ошибка при редактировании эпикриза:', error);
        message.error('Ошибка при редактировании эпикриза');
      }
    };

    return (
      <Modal
        title="Редактировать эпикриз"
        visible={visible}
        onCancel={onCancel}
        onOk={handleFormSubmission}
        destroyOnClose>
        <Form form={form} initialValues={epicrisisDetails}>
          <Form.Item
            name="start_treatment"
            label="Дата начала лечения"
            rules={[{ required: true, message: 'Пожалуйста, выберите дату начала лечения' }]}>
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="end_treatment"
            label="Дата окончания лечения"
            rules={[{ required: true, message: 'Пожалуйста, выберите дату окончания лечения' }]}>
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="main_diagnosis"
            label="Основной диагноз"
            rules={[
              { required: true, message: 'Пожалуйста, введите основной диагноз' },
              { max: 255, message: 'Основной диагноз должен содержать не более 255 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="concomitant"
            label="Сопутствующее"
            rules={[
              { required: true, message: 'Пожалуйста, введите сопутствующее' },
              { max: 125, message: 'Сопутствующее должно содержать не более 125 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="complications"
            label="Осложнения"
            rules={[
              { required: true, message: 'Пожалуйста, введите осложнения' },
              { max: 255, message: 'Осложнения должны содержать не более 255 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="laboratory_tests"
            label="Лабораторные исследования"
            rules={[
              { required: true, message: 'Пожалуйста, введите лабораторные исследования' },
              {
                max: 255,
                message: 'Лабораторные исследования должны содержать не более 255 символов',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="instrumental_studies"
            label="Инструментальные исследования"
            rules={[
              { required: true, message: 'Пожалуйста, введите инструментальные исследования' },
              {
                max: 255,
                message: 'Инструментальные исследования должны содержать не более 255 символов',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="ecg"
            label="ЭКГ"
            rules={[
              { required: true, message: 'Пожалуйста, введите ЭКГ' },
              { max: 255, message: 'ЭКГ должно содержать не более 255 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="x_ray"
            label="Рентген"
            rules={[
              { required: true, message: 'Пожалуйста, введите Рентген' },
              { max: 125, message: 'Рентген должен содержать не более 125 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="specialist_consultations"
            label="Консультации специалистов"
            rules={[
              { required: true, message: 'Пожалуйста, введите консультации специалистов' },
              {
                max: 255,
                message: 'Консультации специалистов должны содержать не более 255 символов',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="treatment"
            label="Лечение"
            rules={[
              { required: true, message: 'Пожалуйста, введите лечение' },
              { max: 255, message: 'Лечение должно содержать не более 255 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="treatment_results"
            label="Результаты лечения"
            rules={[
              { required: true, message: 'Пожалуйста, введите результаты лечения' },
              { max: 255, message: 'Результаты лечения должны содержать не более 255 символов' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="recommendations"
            label="Рекомендации"
            rules={[{ max: 255, message: 'Рекомендации должны содержать не более 255 символов' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
