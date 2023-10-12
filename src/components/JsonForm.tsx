import styles from "@/styles/JsonForm.module.css";
import type { ChangeEventHandler } from "react";

export const JsonForm = ({
  onChange
}: JsonFormProps) => {
  return (
    <>
      <h1 className={styles.title}>JSON Tree Viewer</h1>
      <h2 className={styles.subtitle}>
        Simple JSON Viewer that runs completely on-client. No data exchange
      </h2>
      <label className={styles.button}>
        <input
          style={{ display: "none" }}
          type="file"
          accept=".json"
          onChange={onChange}
        />
        Load JSON
      </label>
    </>
  );
};

type JsonFormProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};
