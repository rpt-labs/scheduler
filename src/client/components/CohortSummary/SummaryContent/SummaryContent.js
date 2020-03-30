
import React from 'react';
import PropTypes from 'prop-types';
import { Header, List} from 'semantic-ui-react';

const SummaryContent = props => {
  const { curriculum } = props;
  const { cohort_title: title, sections } = curriculum;
  const sectionTitles = sections ? sections.map(section => section.title) : [];

  return (
    <div data-testid="summary-content">
        <div>
          <Header as='h1' textAlign='center'>{title}</Header>
          <List link>
            {sectionTitles.map(title => <List.Item active key={title}>{title}</List.Item>)}
          </List>
        </div>
    </div>
  );
};

export default SummaryContent;
