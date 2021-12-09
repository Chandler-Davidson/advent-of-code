import {
  alphabetSort,
  complement,
  getInputLines,
  intersection,
  sum,
} from "utils";

type SignalMap = { [key: string]: string };

class SymmetricMap {
  private map: SignalMap = {};
  private reverseMap: SignalMap = {};

  constructor(map: SignalMap | null = null) {
    this.map = map ?? {};

    for (const key in map) {
      this.reverseMap[map[key]] = key;
    }
  }

  get(key: string): string {
    return this.map[key];
  }

  getKey(value: string): string {
    return this.reverseMap[value];
  }

  getMap(): SignalMap {
    return this.map;
  }

  set(key: string, value: string): void {
    this.map[key] = value;
    this.reverseMap[value] = key;
  }
}

function buildSegmentMap(signals: string[]): SignalMap {
  signals = signals.map((s) => alphabetSort(s));
  const signalMap = new SymmetricMap({});

  // Fill known values: 1, 4, 7, 8
  const uniqueSignalMap: SignalMap = { 2: "1", 4: "4", 3: "7", 7: "8" }; // signal length: digit
  for (const signal of signals) {
    if (signal.length in uniqueSignalMap) {
      signalMap.set(signal, uniqueSignalMap[signal.length]);
    }
  }

  // Fill digits of length 6
  for (const signal of signals.filter(({ length }) => length == 6)) {
    if (complement([...signal], [...signalMap.getKey("4")]).length == 2) {
      signalMap.set(signal, "9");
    } else if (
      intersection([...signal], [...signalMap.getKey("7")]).length == 3
    ) {
      signalMap.set(signal, "0");
    } else if (
      intersection([...signal], [...signalMap.getKey("4")]).length == 3
    ) {
      signalMap.set(signal, "6");
    }
  }

  // Fill digits of length 5
  for (const signal of signals.filter(({ length }) => length == 5)) {
    if (complement([...signal], [...signalMap.getKey("1")]).length == 3) {
      signalMap.set(signal, "3");
    } else if (
      intersection([...signal], [...signalMap.getKey("6")]).length == 4
    ) {
      signalMap.set(signal, "2");
    } else if (
      intersection([...signal], [...signalMap.getKey("6")]).length == 5
    ) {
      signalMap.set(signal, "5");
    }
  }

  return signalMap.getMap();
}

function mapSegments(signalMap: SignalMap, segments: string[]): number {
  const value = segments.map((s) => signalMap[alphabetSort(s)]).join("");
  return parseInt(value);
}

const lines = getInputLines().map((l) =>
  l.split(" | ").map((s) => s.split(" "))
);
const digits = lines.map(([signals, segments]) =>
  mapSegments(buildSegmentMap(signals), segments)
);

console.log(`digits: ${digits}`);
console.log(`total: ${sum(digits)}`);
