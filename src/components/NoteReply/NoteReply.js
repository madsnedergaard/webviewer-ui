import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import NoteContents from 'components/NoteContents';
import NotePopup from 'components/NotePopup';

import core from 'core';
import selectors from 'selectors';

import './NoteReply.scss';
import connect from 'react-redux/es/connect/connect';

class NoteReply extends React.PureComponent {
  static propTypes = {
    reply: PropTypes.object.isRequired,
    searchInput: PropTypes.string,
    renderAuthorName: PropTypes.func.isRequired,
    renderContents: PropTypes.func.isRequired,
    noteDateFormat: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.noteContents = React.createRef();
    this.state = {
      isEditing: false
    };
  }

  deleteReply = () => {
    core.deleteAnnotations([this.props.reply]);
  }

  openEditing = () => {
    this.setState({ isEditing: true });
  }

  closeEditing = () => {
    this.setState({ isEditing: false });
  }

  render() {
    const { reply, renderContents, searchInput } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="NoteReply" onClick={e => e.stopPropagation()}>
      <NoteContents
        annotation={reply}
        contents={reply.getContents()}
        searchInput={searchInput}
        renderContents={renderContents}
        isEditing={isEditing} 
        closeEditing={this.closeEditing} 
      />
      <NotePopup 
      annotation={reply} 
      isNoteExpanded 
      openEditing={this.openEditing} 
      onDelete={this.deleteReply}
      />
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noteDateFormat: selectors.getNoteDateFormat(state)
});

export default connect(mapStateToProps)(NoteReply);