import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import { themeColor, white } from 'app/css/colors';
import Wrapper from './Wrapper';

function PlayerButton({ active, ...rest }) {
  return (
    <Wrapper>
      <Icon
        iconSize="1.5rem"
        hoverColor={themeColor}
        color={white}
        activeColor={active ? themeColor : ''}
        {...rest}
      />
    </Wrapper>
  );
}

PlayerButton.defaultProps = {
  active: false,
};

PlayerButton.propTypes = {
  active: PropTypes.bool,
};

export default PlayerButton;
