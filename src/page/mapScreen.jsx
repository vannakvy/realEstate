import React, { useState, useEffect, Fragment } from 'react';

import '../static/mapScreen.css';
import {
 MenuItem,
 FormControl,
 Select,
 Card,
 CardContent,
} from '@material-ui/core';

import InfoBox from '../component/maps/InfoBox';
import Table from '../component/maps/Table';
import numeral from 'numeral';
// import Map from "../component/covideComponents/Map";

import { Form } from 'antd';
import MapDraw from '../components/MapDraw';
import { useDispatch, useSelector } from 'react-redux';
import { getLandList } from '../actions/landActions';
import { BsGrid } from 'react-icons/bs';

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

 const findStateLand = (arr, state) => {
  let newArr = arr?.filter((a) => a?.landType === state);
  return newArr?.length;
 };

 return (
  <Fragment>
   <h6 className="fw-bold">ទំព័រដើម</h6>
   <span>
    <BsGrid style={{ marginTop: -5 }} /> /​​ ទំព័រដើម
   </span>
   <div className="app">
    <div className="app__left">
     <div className="app__stats">
      <InfoBox
       bg="rgb(93,169,221)"
       title="ដីសរុប"
       total={numeral(landList?.length).format('0,0')}
      />
      <InfoBox
       bg="rgb(255,195,172)"
       title="ដីបានដាក់លក់"
       total={numeral(findStateLand(landList, 'ដាក់លក់')).format('0,0')}
      />
      <InfoBox
       bg="rgb(250,108,126)"
       title="ដីមិនទាន់បានដាក់លក់"
       total={numeral(findStateLand(landList, 'មិនដាក់លក់')).format('0,0')}
      />
     </div>

     <MapDraw landList={landList} edit={false} />
    </div>
    <div className="app__right">
     <Card style={{ marginTop: '10px', width: '350px' }}>
      <CardContent>
       <div className="app__information">
        <h5 className="covid_table fw-bold m-0 pb-0">ដីតាមបណ្ដាខេត្ដ</h5>
        <hr className="p-0 mb-0" />
        <Table />
       </div>
      </CardContent>
     </Card>
    </div>
   </div>
   {/* graph three datasets  */}
  </Fragment>
 );
};

export default MapScreen;
