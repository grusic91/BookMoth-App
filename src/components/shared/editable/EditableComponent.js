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
    const { entity, entityField } = this.props;
    const value = entity[entityField];

    this.setState({
      value,
      originValue: value
    });
  }

  disableEdit() {
    this.setState({isActive: false})

  }
  enableEdit() {
    this.setState({isActive: true})
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
    this.setState({value: event.target.value})
  }


}
