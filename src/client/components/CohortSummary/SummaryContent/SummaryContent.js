import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Segment } from 'semantic-ui-react';

const sectionsList = require('../../../../../config/sectionsList');

const SummaryContent = (props) => {
  const { curriculum } = props;
  const { cohort_title: title, sections } = curriculum;
  const sectionDetails = sections ? sections.map((section) => ({ title: section.title, units: section.units })) : [];
  const sortedSections = sectionDetails.sort((a, b) => sectionsList.indexOf(a.title) - sectionsList.indexOf(b.title));

  return (
    <div data-testid="summary-content">
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      <>
        {sortedSections.map((section) => (
          <Segment.Group key={section.title}>
            <Segment>
              <Header as="h3">{section.title}</Header>
            </Segment>
            <Segment.Group>
              {section.units.map((unit) =>
                unit.visible ? (
                  <Segment key={unit.title} style={{ color: 'green' }}>
                    <span>
                      <Icon color="grey" name="hide" style={{ cursor: 'pointer' }} />
                    </span>
                    <span style={{ marginLeft: '16px' }}>{unit.title}</span>
                  </Segment>
                ) : (
                  <Segment key={unit.title} style={{ color: 'grey' }}>
                    <span>
                      <Icon color="green" name="unhide" style={{ cursor: 'pointer' }} />
                    </span>
                    <span style={{ marginLeft: '16px' }}>{unit.title}</span>
                  </Segment>
                )
              )}
            </Segment.Group>
          </Segment.Group>
        ))}
      </>
    </div>
  );
};

export default SummaryContent;
