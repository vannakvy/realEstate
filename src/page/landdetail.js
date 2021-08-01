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
import MapDraw from '../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLandById } from '../actions/landActions';

const LandDetail = (props) => {
 const { id } = useParams();
 const dispatch = useDispatch();
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

 const { landById: land } = useSelector((state) => state.landById);
 console.log(land);
 useEffect(() => {
  dispatch(getLandById(id));
 }, [dispatch, id]);

 const setToDistrictFn = (e) => {
  form.setFieldsValue({
   district: e,
   commune: null,
   village: null,
  });
  setDistrict(e);
  // setCommune("")
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

     <MapDraw />
    </div>
    <div className="app__right">
     <Card style={{ marginTop: '70px' }}>
      <CardContent>
       <div className="app__information">
        <h3 className="covid_table kh">ព័ត៌មានអំពីក្បាលដី</h3>
        <Divider />
        <h5>ម្ចាស់ដី: {land && land.owner && land.owner.name}</h5>
        <h5>LandType: {land && land.landType}</h5>
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

export default LandDetail;
