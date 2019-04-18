import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading, Input } from '../styled';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    const {
      onSubmit,
      search,
    } = this.props;

    const submit = (event) => {
      event.preventDefault();
      const { current: { value = '' } } = this.textInput;
      onSubmit(value);
    };

    return (
      <Heading>
        Serie finder
        <form
          onSubmit={submit}
        >
          <Input
            type="text"
            placeholder={search}
            ref={this.textInput}
          />
        </form>
      </Heading>
    );
  }
}

SearchBar.defaultProps = {
  search: null,
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  search: PropTypes.string,
};

export default SearchBar;
