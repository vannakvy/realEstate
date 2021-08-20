import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({ title = 'Title', total, bg = '#fff' }) {
 return (
  <Card
   className={`infoBox pt-2`}
   style={{
    position: 'relative',
    borderRadius: 15,
    background: bg,
    cursor: 'pointer',
   }}
  >
   <CardContent style={{ height: 150 }}>
    <h4 className="infoBox_font">{title}</h4>
    <p className="text-end m-0 mt-4">ក្បលដី</p>
    <h1 className="text-end m-0 text-light" style={{ fontSize: '3.5rem' }}>
     {total}
    </h1>
   </CardContent>
  </Card>
 );
}

export default InfoBox;
