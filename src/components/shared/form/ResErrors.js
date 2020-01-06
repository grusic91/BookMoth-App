import React from "react";

export function ResErrors(props) {
  const errors = props.errors;
  
  const renderError = (errors) => {

    /* get from register error*/
    if (errors.length > 0) {
      return errors
    }
    /*mongoose error*/
    if ('error' in errors) {
      return `Error: ${errors.error.message}`
    }
    /*login error*/
    if ('errors' in errors) {
      return `Error: ${errors.errors[0].title} ${errors.errors[0].detail}`
    }
  }

  return (
    <div className="alert alert-danger">
      {renderError(errors)}
    </div>
  )
}
