import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLandList } from '../actions/landActions';
import MapDraw from '../components/MapDraw';

const MapScreen = () => {
 const dispatch = useDispatch();
 const { landList } = useSelector((state) => state.landList);
 useEffect(() => {
  dispatch(getLandList());
 }, []);

 return (
  <div>
   <MapDraw />
  </div>
 );
};

export default MapScreen;
