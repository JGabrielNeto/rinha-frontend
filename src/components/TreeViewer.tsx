import styles from "@/styles/TreeViewer.module.css";

export const TreeViewer = ({ title }: treeViewerProps) => {
  const data = globalThis.parsedJson;

  const lines = data.split("\n").map((line: string, index: number) => (
    <p style={{ whiteSpace: "pre" }} key={index}>
      {line}
    </p>
  ));

  return (
    <section className={styles.section}>
      <h1>{title}</h1>
      <ul>{lines}</ul>
    </section>
  );
};

type treeViewerProps = {
  title: string;
};
