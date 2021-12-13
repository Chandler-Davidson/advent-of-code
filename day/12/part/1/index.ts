import { getInputLines } from "utils";

class Graph {
  public readonly nodes = new Map<string, string[]>();

  constructor(edges: [string, string][]) {
    for (const [source, destination] of edges) {
      this.addEdge(source, destination);
    }
  }

  addEdge(source: string, destination: string) {
    for (const node of [source, destination]) {
      if (!this.nodes.has(node)) {
        this.nodes.set(node, []);
      }
    }

    (this.nodes.get(source) as string[]).push(destination);
    (this.nodes.get(destination) as string[]).push(source);
  }
}

function findAllPaths(graph: Graph) {
  const isLargeCave = (node: string) => node.toUpperCase() == node;
  function findPaths(current: string, visited: Set<string>): string[] {
    if (current == "end") {
      return [current];
    }

    visited.add(current);

    const paths = (graph.nodes.get(current) || [])
      .filter((n) => isLargeCave(n) || !visited.has(n))
      .flatMap((n) => findPaths(n, visited))
      .map((n) => current + "," + n);

    visited.delete(current);

    return paths;
  }

  return findPaths("start", new Set());
}

const edges = getInputLines().map((line) => line.split("-"));
const graph = new Graph(edges as [string, string][]);
const paths = findAllPaths(graph);

console.log(`# paths: ${paths.length}`);
console.log(paths);
