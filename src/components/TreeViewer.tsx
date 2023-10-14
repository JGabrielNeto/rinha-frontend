import styles from "@/styles/TreeViewer.module.css";

const trampoline =
  (fn) =>
  (...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };

const recursiveCall = (data: any, callback: any) =>
  typeof data === "object" && data !== null ? () => callback(data) : data;

const returnValueOrCallFn = trampoline(recursiveCall);

export const TreeViewer = ({ title }: treeViewerProps) => {
  const data = globalThis.parsedJson as treeViewerProps["data"];

  const recursiveTree = (data: treeViewerProps["data"]) => {
    const tree = [];
    for (const node in data) {
      console.log(node)
      const currValue = returnValueOrCallFn(data[node], recursiveTree);
      tree.push(
        <li key={node}>
          {node}: {currValue}
        </li>
      );
    }
    return <ul>{tree}</ul>;
  };

  const tree = recursiveTree(data);

  return (
    <section className={styles.section}>
      <h1>{title}</h1>
      {tree}
    </section>
  );
};

type treeViewerProps = {
  data: Record<string | number, any>;
  title: string;
};
