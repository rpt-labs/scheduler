/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, List, Segment } from 'semantic-ui-react';

const sectionsList = require('../../../../../config/sectionsList');

const SummaryContent = (props) => {
  const { curriculum } = props;
  const { cohort_title: title, sections } = curriculum;
  const sectionDetails = sections ? sections.map((section) => ({ title: section.title, units: section.units })) : [];
  const sortedSections = sectionDetails.sort((a, b) => sectionsList.indexOf(a.title) - sectionsList.indexOf(b.title));

  const getUnitTitle = (unit) => (
    <Segment.Group>
      {unit.content_files.map((file) =>
        file.visible ? (
          <Segment key={file.title}>
            <Icon name="hide" style={{ cursor: 'pointer', marginRight: '16px', color: 'grey' }} />
            <span style={{ color: '#006600' }}>{file.title}</span>
          </Segment>
        ) : (
          <Segment key={file.title}>
            <Icon name="unhide" style={{ cursor: 'pointer', marginRight: '16px', color: '#006600' }} />
            <span style={{ color: 'grey' }}>{file.title}</span>
          </Segment>
        )
      )}
    </Segment.Group>
  );

  return (
    <div data-testid="summary-content">
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      <>
        {sortedSections.map((section) => (
          <Segment.Group key={section.title}>
            <Segment>
              <Header as="h2">{section.title}</Header>
            </Segment>
            <Segment.Group>
              {section.units.map((unit) =>
                unit.visible && unit.content_files.every((file) => file.visible === true) ? (
                  <Segment key={unit.title}>
                    <Icon name="hide" style={{ cursor: 'pointer', marginRight: '8px', color: 'grey' }} />
                    <span style={{ color: '#006600', fontSize: '20px' }}>{unit.title}</span>
                    {getUnitTitle(unit)}
                  </Segment>
                ) : unit.visible && unit.content_files.some((file) => file.visible === true) ? (
                  <Segment key={unit.title}>
                    <Icon name="hide" style={{ cursor: 'pointer', marginRight: '8px', color: 'grey' }} />
                    <span style={{ color: '#FDAF08', fontSize: '20px' }}>{unit.title}</span>
                    {getUnitTitle(unit)}
                  </Segment>
                ) : (
                  <Segment key={unit.title}>
                    <Icon name="unhide" style={{ cursor: 'pointer', marginRight: '8px', color: '#006600' }} />
                    <span style={{ color: 'grey', fontSize: '20px' }}>{unit.title}</span>
                    {getUnitTitle(unit)}
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
