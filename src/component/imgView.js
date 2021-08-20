import * as React from 'react';
import Viewer from 'react-viewer';
import logo from '../asset/logoo.png';

export default function ImgView(props) {
 const [visible, setVisible] = React.useState(false);

 return (
  <div>
   <button
    onClick={() => {
     setVisible(true);
    }}
   >
    show
   </button>
   <Viewer
    visible={visible}
    onClose={() => {
     setVisible(false);
    }}
    images={[
     { src: logo, alt: '' },
     { src: logo, alt: '' },
    ]}
   />
  </div>
 );
}
