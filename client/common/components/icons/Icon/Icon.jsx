import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { FONT_COLOR_PRIMARY } from 'app/css/colors';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';

// Filter props to get rid of unknown props warning:
// https://github.com/styled-components/styled-components/issues/305
const StyledIcon = styled(({ color, hoverColor, active, activeColor, iconSize, ...rest }) => (
  <FontAwesome {...rest} />
)).attrs({
  color: props => props.color || FONT_COLOR_PRIMARY,
  activeColor: props => props.activeColor || FONT_COLOR_PRIMARY,
  hoverColor: props => props.hoverColor || FONT_COLOR_PRIMARY,
  iconSize: '1rem',
})`
  color: ${props => (props.active ? props.activeColor : props.color)};
  font-size: ${props => props.iconSize || '1rem'};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;

function Icon(props) {
  const { tooltipDelayShow, tooltipDelayHide, tooltipPlacement, tooltipText, ...rest } = props;
  const tooltip = <Tooltip id={`tooltip-${shortid.generate()}`}>{tooltipText}</Tooltip>;

  return (
    <OverlayTrigger
      delayShow={tooltipDelayShow}
      delayHide={tooltipDelayHide}
      placement={tooltipPlacement}
      overlay={tooltip}
    >
      <StyledIcon {...rest} />
    </OverlayTrigger>
  );
}

Icon.defaultProps = {
  tooltipDelayHide: 200,
  tooltipDelayShow: 1000,
  tooltipPlacement: 'top',
  tooltipText: '',
};

Icon.propTypes = {
  tooltipDelayHide: PropTypes.number,
  tooltipDelayShow: PropTypes.number,
  tooltipPlacement: PropTypes.string,
  tooltipText: PropTypes.string,
};

export default Icon;
