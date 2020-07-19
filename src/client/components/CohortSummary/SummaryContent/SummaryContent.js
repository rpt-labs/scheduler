/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Divider, Header, Icon, Segment, Grid } from 'semantic-ui-react';
import ReleaseContent from './ReleaseContent/ReleaseContent';

const sectionsList = require('../../../../../config/sectionsList');

export default class SummaryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  getUnitTitle = (unit, backgroundColor) => (
    <Segment.Group style={{ color: 'grey' }}>
      {unit.content_files.map((file) =>
        file.visible ? (
          <Segment key={file.title} style={{ backgroundColor: `${backgroundColor}` }}>
            <Icon name="checkmark" style={{ cursor: 'pointer', marginRight: '16px', color: '#006600' }} />
            <span>{file.title}</span>
          </Segment>
        ) : (
          <Segment key={file.title}>
            <Icon name="x" style={{ cursor: 'pointer', marginRight: '16px', color: '#bf0000' }} />
            <span style={{ color: 'grey' }}>{file.title}</span>
          </Segment>
        )
      )}
    </Segment.Group>
  );

  getUnitContent = (unit, iconName, color, backgroundColor, activeIndex) => (
    <Grid.Row key={unit.title} style={{ margin: '16px', marginTop: '0px' }}>
      <Grid.Column width={13}>
        <Accordion>
          <Accordion.Title active={activeIndex === unit.uid} index={unit.uid} onClick={this.handleClick}>
            <Icon name={iconName} style={{ cursor: 'pointer', marginRight: '8px', color: `${color}` }} />
            <span style={{ fontSize: '20px', color: `${color}` }}>{unit.title}</span>
            <Icon name="dropdown" color="grey" onClick={this.handleClick} />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === unit.uid}>
            <div>{this.getUnitTitle(unit, backgroundColor)}</div>
          </Accordion.Content>
          <Divider />
        </Accordion>
      </Grid.Column>
      <Grid.Column width={3}>
        <ReleaseContent />
      </Grid.Column>
    </Grid.Row>
  );

  render() {
    const { curriculum } = this.props;
    const { activeIndex } = this.state;
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
                <Header as="h2">{section.title}</Header>
              </Segment>
              <Grid>
                {section.units.map((unit) =>
                  unit.visible && unit.content_files.every((file) => file.visible === true)
                    ? this.getUnitContent(unit, 'checkmark', '#006600', '#F0FFF3', activeIndex)
                    : unit.visible && unit.content_files.some((file) => file.visible === true)
                    ? this.getUnitContent(unit, 'checkmark', '#FDAF08', '#F0FFF3', activeIndex)
                    : this.getUnitContent(unit, 'x', '#BF0000', '#FFF', activeIndex)
                )}
              </Grid>
              <Divider />
            </Segment.Group>
          ))}
        </>
      </div>
    );
  }
}

SummaryContent.propTypes = {
  curriculum: PropTypes.instanceOf(Object).isRequired
};
