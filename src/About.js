import React, {Component} from "react";

export class About extends Component {
  render() {
    let miejsce = "Świecie"
    return (
        <div>
          <h1>Witaj {miejsce}</h1>
          <h3>{this.props.wlasciwosc}</h3>
        </div>
    )
  }
}