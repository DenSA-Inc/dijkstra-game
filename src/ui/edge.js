import React from "react";
import PropTypes from "prop-types";

import { EDGE_WEIGTH_RADIUS } from "../constants";

export default class Edge extends React.Component {
  static propTypes = {
    edge: PropTypes.object.isRequired
  };

  render(){
    const e = this.props.edge;

    return <g>
      <line x1={e.getFrom().getX()} y1={e.getFrom().getY()}
        x2={e.getTo().getX()} y2={e.getTo().getY()} />
      { this.renderWeigth()}
    </g>;
  }

  renderWeigth() {
    const e = this.props.edge;

    if (e.getWeigth() > 0){
      const midX = (e.getFrom().getX() + e.getTo().getX()) / 2;
      const midY = (e.getFrom().getY() + e.getTo().getY()) / 2;

      return <g>
        <circle className="edge-weigth"
          cx={midX}
          cy={midY}
          r={EDGE_WEIGTH_RADIUS}/>
        <text className="edge-weigth-text" x={midX} y={midY}>
          {e.getWeigth()}
        </text>
      </g>;
    }
  }
};
