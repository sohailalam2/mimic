import React from 'react';
import OutlineButton from 'ui/components/common/OutlineButton';
import API from 'api';
import omit from 'lodash/omit';
import { Group } from 'api/models/group';
import { MultiSelectContainer, MultiSelectContainerText } from 'ui/components/Mocks/styled';
import { Div } from 'ui/components/common/base';

export class MultiSelectView extends React.PureComponent {

  groupMocks = () => {
    const group = API.addGroup({ name: 'Grouped Mocks' });

    if (group) {
      this.props.selectedItems.forEach((item) => {
        if (item instanceof Group) {
          return;
        }

        if (item.groupId) {
          API.mockRequest({ ...omit(item, ['id']), groupId: group.id });
          return;
        }

        API.updateMock(item.id, { ...item, groupId: group.id })
      });
    }

    const firstMock = group.mocks[0];
    this.props.selectItems([firstMock]);
    this.props.addGroup({
      id: group.id,
      isOpen: true,
      lastState: null
    });
  };

  render() {
    return (
      <MultiSelectContainer>
        <Div>
          <OutlineButton onClick={ this.groupMocks }>Group</OutlineButton>
          <MultiSelectContainerText>these mocks</MultiSelectContainerText>
        </Div>
      </MultiSelectContainer>
    );
  }

}

MultiSelectView.propTypes = {
  selectedItems: React.PropTypes.array.isRequired,
  groups: React.PropTypes.array.isRequired,
  selectItems: React.PropTypes.func.isRequired,
  setGroups: React.PropTypes.func.isRequired,
  addGroup: React.PropTypes.func.isRequired
};

export default MultiSelectView;
