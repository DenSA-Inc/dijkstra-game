export default class Edge {
  constructor(v, v2, {
    weigth = 0
  }) {
    this.to = v;
    this.from = v2;
    this.weigth = weigth;
  }

  getTo() {
    return this.to;
  }

  getFrom() {
    return this.from;
  }

  getWeigth(){
    return this.weigth;
  }

  connectsVertices(v, v2, context) {
    return (v === this.to && v2 === this.from) || (v2 === this.to && v === this.from);
  }
}
