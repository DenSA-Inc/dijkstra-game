import Vertex from "./vertex";
import Edge from "./edge";

export default class Graph {
  constructor({ edges, vertices, start = 0 }) {
    this.vertices = vertices.map(([x, y]) => new Vertex(x, y));
    this.edges = edges.map(
      ([a, b, ...args]) => new Edge(this.vertices[a], this.vertices[b], args[0] || {})
    );

    this.start = start;
  }

  getVertices() {
    return this.vertices.map(i => i); // best copy algorithm
  }

  getVerticesSize() {
    return this.vertices.length;
  }

  getVertex(x) {
    return this.vertices[x];
  }

  getEdges() {
    return this.edges.map(i => i);
  }

  verticesConnected(v, v2) {
    return this.edges.find(e => e.connectsVertices(v, v2));
  }

  getStartingIndex(){
    return this.start;
  }
}
