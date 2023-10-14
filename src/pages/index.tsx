import Head from "next/head";
import { ChangeEvent, useCallback, useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { JsonForm } from "@/components/JsonForm";
import { TreeViewer } from "@/components/TreeViewer";

const inter = Inter({ subsets: ["latin"] });

const reader = (file: File): Promise<FileReader> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader);
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });

const readAsync = async (file: File) => {
  const frPromise = async () => reader(file);
  let fileReader: FileReader | undefined;
  try {
    fileReader = await frPromise();
  } catch (err) {
    console.error(err);
  }

  if (fileReader) return JSON.parse(fileReader.result as string);
  return {};
};

export default function Home() {
  const [name, setName] = useState("");

  const responsesCb = useCallback(async (file: File) => {
    const parsedJson = await readAsync(file);
    setName(file.name);
    globalThis.parsedJson = parsedJson;
  }, []);

  const handleJsonUpload = (e: ChangeEvent<HTMLInputElement>) => {
    responsesCb([...(e.target.files || [])][0]);
  };

  return (
    <>
      <Head>
        <title>Rinha</title>
        <meta name="description" content="Generated for rinha de frontend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {name ? (
          <TreeViewer title={name} />
        ) : (
          <JsonForm onChange={handleJsonUpload} />
        )}
      </main>
    </>
  );
}
