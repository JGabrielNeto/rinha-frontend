import styles from "@/styles/TreeViewer.module.css";

export const TreeViewer = ({ data, title }: treeViewerProps) => {
  const constructTree = (
    data: Record<string | number, any>,
    currKey = title
  ) => {
    const tree = [];
    for (const node in data) {
      const newKey = currKey + node;
      tree.push(
        <li key={newKey}>
          {node}:{" "}
          {typeof data[node] === "object" && data[node] !== null ? (
            <ul>{constructTree(data[node], newKey)}</ul>
          ) : (
            data[node]
          )}
        </li>
      );
    }
    return tree;
  };
  return (
    <section className={styles.section}>
      <h1>{title}</h1>
      <ul>{constructTree(data)}</ul>
    </section>
  );
};

type treeViewerProps = {
  data: Record<string | number, any>;
  title: string;
};
