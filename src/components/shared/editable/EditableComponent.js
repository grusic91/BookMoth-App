import React from 'react';

export class EditableComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      value: undefined,
      originValue: undefined
    }
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.setOriginValue();
  }

  componentDidUpdate() {
    const {errors, entityField, resetErrors} = this.props;

    if (errors && errors[entityField]) {
      this.setOriginValue();
      resetErrors();
    }
  }

  setOriginValue() {
    const {entityField, entity} = this.props;

    this.setState({
      value: entity[entityField],
      originValue: entity[entityField],
      isActive: false
    });
  }

  disableEdit() {
    this.setState({isActive: false});
  }

  enableEdit() {
    this.setState({isActive: true});
  }

  update() {
    const { updateEntity, entityField } = this.props;
    const { value, originValue } = this.state;

    if(value !== originValue) {
      updateEntity({[entityField]: value});

      this.setState({isActive: false, originValue: value});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
}
