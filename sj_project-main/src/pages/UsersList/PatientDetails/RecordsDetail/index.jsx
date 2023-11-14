import { useLocation } from 'react-router-dom';
import { Descriptions, Tag, Divider } from 'antd';
import moment from 'moment';
import AnamnesisComponent from './AnamnesisComponent';
import SomaticComponent from './SomaticComponent';
import MentalComponent from './MentalComponent';
import NeurologicalComponent from './NeurologicalComponent';

const RecordsDetail = () => {
  const location = useLocation();
  const { recordData } = location.state;
  const { patientData } = location.state;
  return (
    <div>
      <h1>Детали записи</h1>
      <Divider />

      <AnamnesisComponent anamnesisData={recordData.anamnesis} />
      <SomaticComponent somaticData={recordData.somatic} />
      <MentalComponent mentalData={recordData.mental} />
      <NeurologicalComponent neurologicalData={recordData.neurological} />
    </div>
  );
};

export default RecordsDetail;
