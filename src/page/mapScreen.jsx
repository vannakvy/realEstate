import React, { useState, useEffect, Fragment } from 'react';

import '../static/mapScreen.css';
import {
 MenuItem,
 FormControl,
 Select,
 Card,
 CardContent,
} from '@material-ui/core';

import { ListSelect } from '../static/own-comp';
import { convertToDistrict } from '../function/fn';
import InfoBox from '../component/maps/InfoBox';
import LineGraph from '../component/maps/LineGraph';
import Table from '../component/maps/Table';

import numeral from 'numeral';
// import Map from "../component/covideComponents/Map";

import { Form, Divider } from 'antd';

import ImageCovid from '../asset/covid19.png';
import ImageRecover from '../asset/recover.png';
import ImageDeath from '../asset/death.png';
import MapDraw from '../components/MapDraw';
import { useDispatch, useSelector } from 'react-redux';
import { getLandList } from '../actions/landActions';

const MapScreen = () => {
 const [countryInfo, setCountryInfo] = useState({});
 const [countries, setCountries] = useState([]);
 const [mapCountries, setMapCountries] = useState([]);
 const [tableData, setTableData] = useState([]);
 const [casesType, setCasesType] = useState('cases');
 const [mapCenter, setMapCenter] = useState({ lat: 13.3633, lng: 103.8564 });
 const [mapZoom, setMapZoom] = useState(9);
 const [districtInfo, setDistrictInfo] = useState([]);

 //update the data
 const [district, setDistrict] = useState('');
 const [districtDatas, setDistrictDatas] = useState({});
 let [form] = Form.useForm();

 const dispatch = useDispatch();
 const { landList } = useSelector((state) => state.landList);

 useEffect(() => {
  dispatch(getLandList('dsfsd', 'dsf'));
 }, []);

 const setToDistrictFn = (e) => {
  form.setFieldsValue({
   district: e,
   commune: null,
   village: null,
  });
  setDistrict(e);
 };

 return (
  <Fragment>
   <div className="app">
    <div className="app__left">
     <div className="app__header">
      <FormControl className="app__dropdown">
       <Form.Item
        name="district"
        rules={[{ required: true, message: 'Please input your username!' }]}
       >
        <ListSelect
         type={0}
         data={convertToDistrict(['ddd', 'ddd'])}
         title="ស្រុក/ខណ្ឌ"
         setValue={setToDistrictFn}
        />
       </Form.Item>
      </FormControl>
     </div>
     <div className="app__stats">
      <InfoBox
       onClick={(e) => setCasesType('ដីសរុប')}
       title="ដីសរុប"
       isRed
       active={casesType === 'ដីសរុប'}
       cases={districtDatas.confirmedCaseToday}
       total={numeral(districtDatas.confirmedCase).format('0')}
       //  ImageShow={ImageCovid}
      />
      <InfoBox
       onClick={(e) => setCasesType('ដីបានដាក់លក់')}
       title="ដីបានដាក់លក់"
       active={casesType === 'ដីបានដាក់លក់'}
       cases={districtDatas.recoveredToday}
       total={numeral(districtDatas.recovered).format('0')}
       //  ImageShow={ImageRecover}
      />
      <InfoBox
       onClick={(e) => setCasesType('ដីមិនទាន់បានដាក់លក់')}
       title="ដីមិនទាន់បានដាក់លក់"
       isRed
       active={casesType === 'ដីមិនទាន់បានដាក់លក់'}
       cases={districtDatas.deathToday}
       total={numeral(districtDatas.death).format('0')}
       //  ImageShow={ImageDeath}
      />
     </div>

     <MapDraw landList={landList} edit={false} />
    </div>
    <div className="app__right">
     <Card style={{ marginTop: '70px' }}>
      <CardContent>
       <div className="app__information">
        <h3 className="covid_table">By Province</h3>
        <Divider />
        <Table />
       </div>
      </CardContent>
     </Card>
     <Card style={{ marginTop: '10px' }}>
      <CardContent>
       <LineGraph casesType={casesType} />
      </CardContent>
     </Card>
    </div>
   </div>
   {/* graph three datasets  */}
  </Fragment>
 );
};

export default MapScreen;
