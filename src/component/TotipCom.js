import React from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';

const useStylesBootstrap = makeStyles((theme) => ({
 arrow: {
  color: theme.palette.common.black,
 },
 tooltip: {
  backgroundColor: theme.palette.common.black,
 },
}));

function BootstrapTooltip(props) {
 const classes = useStylesBootstrap();

 return <Tooltip arrow placement="top" classes={classes} {...props}></Tooltip>;
}

const TotipCom = (props) => {
 return (
  <BootstrapTooltip title={props.title}>{props.children}</BootstrapTooltip>
 );
};

export default TotipCom;
