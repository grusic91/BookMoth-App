import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableTextArea extends EditableComponent {

  renderComponentView() {
    const {value, isActive} = this.state;
    const { className, entityField, rows, cols } = this.props;

    if(isActive) {
      return (
        <React.Fragment >
          <textarea className={`${className} form-control`}
          rows={rows}
          cols={cols}
                 onChange={(event) => this.handleChange(event)}
                 value={value}
                 placeholder={entityField}
          ></textarea>
          <button onClick={() => this.disableEdit()}
                  className="btn btn-warning btn-editable"
                  type="button"> Close </button>
          <button onClick={this.update}
                  className="btn btn-success btn-editable"
                  type="button"> save </button>
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

  render() {
    const {entityField} = this.props;
    return (
      <div className="editableComp form-inline">
        <label className="label control-label">{entityField}: </label>
          {this.renderComponentView()}
      </div>
    )
  }
}
