import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';

const RadioButton = (props) => {
  const { cohort, handleRadioButtonChange } = props;
  return (
    <div data-testid="radio-button">
      <Form.Field>
        <Radio
          data-testid="radio"
          label={cohort.name}
          name="cohortList"
          value={cohort.name}
          checked={cohort.isChecked}
          onChange={() => handleRadioButtonChange(cohort.name)}
        />
      </Form.Field>
    </div>
  );
};

RadioButton.propTypes = {
  cohort: PropTypes.instanceOf(Object).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired
};

export default RadioButton;
