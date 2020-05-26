/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Divider, Header, Icon, Segment } from 'semantic-ui-react';

const sectionsList = require('../../../../../config/sectionsList');

export default class SummaryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { curriculum } = this.props;
    const { activeIndex } = this.state;
    const { cohort_title: title, sections } = curriculum;
    const sectionDetails = sections ? sections.map((section) => ({ title: section.title, units: section.units })) : [];
    const sortedSections = sectionDetails.sort((a, b) => sectionsList.indexOf(a.title) - sectionsList.indexOf(b.title));

    const getUnitTitle = (unit, backgroundColor) => (
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

    const getUnitContent = (unit, iconName, color, backgroundColor) => (
      <React.Fragment key={unit.title}>
        <Accordion>
          <Accordion.Title active={activeIndex === unit.uid} index={unit.uid} onClick={this.handleClick}>
            <Icon name={iconName} style={{ cursor: 'pointer', marginRight: '8px', color: `${color}` }} />
            <span style={{ fontSize: '20px', color: `${color}` }}>{unit.title}</span>
            <span>
              <Icon name="dropdown" style={{ fontSize: '1.2em', float: 'right' }} color="grey" />
            </span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === unit.uid}>
            <div>{getUnitTitle(unit, backgroundColor)}</div>
          </Accordion.Content>
          <Divider section />
        </Accordion>
      </React.Fragment>
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
              <Segment>
                {section.units.map((unit) =>
                  unit.visible && unit.content_files.every((file) => file.visible === true)
                    ? getUnitContent(unit, 'checkmark', '#006600', '#F0FFF3')
                    : unit.visible && unit.content_files.some((file) => file.visible === true)
                    ? getUnitContent(unit, 'checkmark', '#FDAF08', '#F0FFF3')
                    : getUnitContent(unit, 'x', '#BF0000')
                )}
              </Segment>
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
