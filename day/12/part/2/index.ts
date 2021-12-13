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
  function findPaths(
    current: string,
    visited: Map<string, number>,
    haveVisitedSmallCaveTwice = false,
  ): string[] {
    if (current == "end") {
      return [current];
    }

    const visits = (visited.get(current) || 0) + 1;
    visited.set(current, visits);

    // 1. Can visit a single small cave twice
    // 2. All other small caves can only be visited once
    if (!isLargeCave(current) && visits > 1) {
      haveVisitedSmallCaveTwice = true;
    }

    const isEligibleSmallCave = (n: string) =>
      (visited.get(n) || 0) < 1 || !haveVisitedSmallCaveTwice;

    const paths = (graph.nodes.get(current) || [])
      .filter((n) => n != "start")
      .filter((n) => isLargeCave(n) || isEligibleSmallCave(n))
      .flatMap((n) => findPaths(n, visited, haveVisitedSmallCaveTwice))
      .map((n) => current + "," + n);

    visited.set(current, visits - 1);

    return paths;
  }

  return findPaths("start", new Map());
}

const edges = getInputLines().map((line) => line.split("-"));
const graph = new Graph(edges as [string, string][]);
const paths = findAllPaths(graph);

console.log(`# paths: ${paths.length}`);
