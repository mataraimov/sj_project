import { useLocation } from 'react-router-dom';
import { Descriptions, Tag, Divider } from 'antd';
import AnamnesisComponent from './AnamnesisComponent';
import SomaticComponent from './SomaticComponent';
import MentalComponent from './MentalComponent';
import NeurologicalComponent from './NeurologicalComponent';
import { useEffect } from 'react';
import GeneralState from './GeneralState';

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
      <GeneralState recordData={recordData} />
    </div>
  );
};

export default RecordsDetail;
