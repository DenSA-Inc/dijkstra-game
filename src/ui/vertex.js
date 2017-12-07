import React from "react";
import PropTypes from "prop-types";

import { VERTICE_RADIUS } from "../constants";

export default class Vertex extends React.Component {
  static propTypes = {
    vertex: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render(){
    const v = this.props.vertex;

    return <g className="vertice"
      onClick={this.props.onClick}>
      <circle
        cx={v.getX()}
        cy={v.getY()}
        r={VERTICE_RADIUS}
      />
      <text x={v.getX()} y={v.getY()} className="vertice-text" textAnchor="middle"></text>
    </g>;
  }
}
