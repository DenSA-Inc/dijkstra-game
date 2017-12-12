import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Edge from "./ui/edge";
import Vertex from "./ui/vertex";
import Player from "./ui/player";

import "./style.css";
import { VIEWBOX_PADDING } from "./constants";

import makeStore from "./store";
import gameReducer from "./reducers";

import Graph from "./lib/graph";
const graphData = require("./level.json");

class Level extends React.Component {
  constructor(props) {
    super(props);

    this.playerMoving = false;
    this.graph = new Graph(this.props.graph);

    this.state = {
      pos: this.graph.getStartingIndex()
    };
    this.buffer = null;
    this.store = makeStore(gameReducer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <svg viewBox={this.getViewBox()} id="level">
          {this.graph.getEdges().map(this.renderEdge.bind(this))}
          {this.graph.getVertices().map(this.renderVertex.bind(this))}
          {this.renderPlayer.bind(this)()}
        </svg>
      </Provider>
    );
  }

  renderVertex(v, i) {
    const onClick = () => {
      this.makeMove(i);
    };

    const VertexComponent = this.getVertexRenderComponent(v);
    return <VertexComponent onClick={onClick} vertex={v} key={i}/>;
  }

  makeMove(i){
    const v = this.graph.getVertex(i);

    if (!this.graph.verticesConnected(this.graph.getVertex(this.state.pos), v)) {
      return;
    }
    if (!this.playerMoving) {
      this.setState({ pos: i });
    }
    else if (this.buffer === null) {
      this.buffer = i;
    }
  }

  getVertexRenderComponent(v){
    return Vertex;
  }

  renderEdge(e, i) {
    const EdgeComponent = this.getEdgeRenderComponent(e);

    return <EdgeComponent edge={e} key={i}/>;
  }

  getEdgeRenderComponent(e){
    return Edge;
  }

  renderPlayer() {
    const v = this.graph.getVertex(this.state.pos);
    const onMovingEnded = () => {
      this.playerMoving = false;
      if (this.buffer != null){
        const b = this.buffer;
        this.buffer = null;

        this.makeMove(b);
      }
    };
    const onMovingStarted = () => {
      this.playerMoving = true;
    };

    const PlayerComponent = this.getPlayerRenderComponent();
    return <PlayerComponent x={v.getX()} y={v.getY()} onMovingEnded={onMovingEnded} onMovingStart={onMovingStarted}/>;
  }

  getPlayerRenderComponent(){
    return Player;
  }

  getViewBox() {
    const xCoords = this.graph.getVertices().map(v => v.getX());
    const yCoords = this.graph.getVertices().map(v => v.getY());

    const minX = Math.min(...xCoords) - VIEWBOX_PADDING;
    const minY = Math.min(...yCoords) - VIEWBOX_PADDING;
    const maxX = Math.max(...xCoords) + VIEWBOX_PADDING;
    const maxY = Math.max(...yCoords) + VIEWBOX_PADDING;

    return minX + " " + minY + " " + (maxX - minX) + " " + (maxY - minY);
  }
}

render(<Level graph={graphData} />, document.getElementById("root"));
