import Head from "next/head";
import { useState } from "react";
import reactDom from "react-dom";
import styles from "./index.module.css";

const data = [];
const searchQuery = [];

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [results, setResults] = useState([]);
  

  const myData = [];
  console.log(data)
  async function onSubmit(event) {
    event.preventDefault();
    
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: animalInput }),
    });
     
    const responseData = await response.json();
    data.unshift({prompt: animalInput, response: responseData.result});

  const newEntry = (
   <div className={styles.listInner}>
   <div >{data.map(val=> (
   <div className={styles.listElement}>
   <p>Prompt: {val["prompt"]}</p>
   <p>Result: {val["response"]}</p>
   </div>
   ))}</div>
   </div>
  );

    
   reactDom.render(newEntry, document.getElementById('list'));
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Enter a Prompt</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter your prompt"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Run AI" />
        </form>
        <div id="list" className='list'>

        </div>
      </main>
    </div>
  );
}
