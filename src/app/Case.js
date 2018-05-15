import React from 'react';
import styles from "./case.css";
export default class Case extends React.Component {

    onClick() {
      this.props.onClick();
    }

    render() {
        let {state} = this.props;
        let classe;
        if (state === 'X'){
            classe = <label className="croix"> {state}</label>
        } else if (state === 'O') {
          classe = <label className="rond"> {state}</label>
        }

        let etatComponent = classe;
        console.log(state)
        return <div className="case" onClick={() => this.onClick()}>
            {etatComponent}
        </div>;
    }
}
