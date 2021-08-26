import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Select } from 'antd';
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { landCol } from '../component/land/tableColumn/landColumn';
import { useDispatch, useSelector } from 'react-redux';
import {
 createLand,
 deleteLand,
 getLandList,
 test,
} from '../actions/landActions';
import { useHistory } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import LandTable from '../component/land/LandTable';
import { RiSearchLine } from 'react-icons/ri';
import queryString from 'query-string';

export default function Land() {
 const dispatch = useDispatch();
 const history = useHistory();
 const location = useLocation();
 const query = queryString.parse(location.search);
 const search = query.search || '';
 const [keyword, setKeyword] = useState(search);

 const { loading } = useSelector((state) => state.landList);

 useEffect(() => {
  dispatch(getLandList(search));
  setKeyword(search);
 }, [dispatch, search]);

 const searchHandler = (e) => {
  e.preventDefault();
  history.push(`/land?search=${keyword}`);
 };

 return (
  <div className="w-100">
   <h4>តារាងដីនីមួយៗ</h4>
   <div className="py-2 d-flex justify-content-between">
    <div>
     <form onSubmit={searchHandler} className="d-inline-block">
      <div class="input-group" style={{ width: '300px' }}>
       <input
        name="searchBox"
        type="text"
        className="form-control"
        placeholder="ស្វែងរកទីនេះ..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
       />
       <button type="submit" className="btn btn-outline-info">
        <RiSearchLine />
       </button>
      </div>
     </form>
     {search && (
      <button
       className="btn btn-outline-info mx-1"
       style={{ marginTop: -3 }}
       onClick={() => {
        history.push('/land');
       }}
      >
       ដីទាំងអស់
      </button>
     )}
    </div>
    <button
     className="btn btn_color shadow text-light"
     onClick={() => history.push('/land/create/newland')}
    >
     <PlusOutlined />
     បញ្ចូលដីថ្មី
    </button>
   </div>
   <div>
    <LandTable loading={loading} />
   </div>
  </div>
 );
}
