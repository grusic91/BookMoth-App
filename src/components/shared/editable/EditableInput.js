import React from 'react';

export class EditableInput extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
      value: undefined,
      originValue: undefined
    }
  }

  componentDidMount() {
    const { entity, entityField} = this.props;
    const value = entity[entityField]; //book[title]

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

  renderComponentView() {
    const {value, isActive} = this.state;
    const { className, entityField, type } = this.props;

    if(isActive) {
      return (
        <React.Fragment >
          <input className={`${className} form-control`}
                 onChange={(event) => this.handleChange(event)}
                 value={value}
                 placeholder={entityField}
                 type={type}/>
          <button onClick={() => this.disableEdit()}
                  className="btn btn-warning btn-editable"
                  type="button"> Close </button>
        </React.Fragment >
      )
    }
    return (
      <React.Fragment >
        <span className={className}>{value}</span>
        <button onClick={() => this.enableEdit()}
          className="btn btn-warning btn-editable"
          type="button"> Edit </button>
      </React.Fragment>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    console.log(this.props);
    return (
      <div id="editableComp" className="form-inline">
          {this.renderComponentView()}
      </div>
    )
  }
}
