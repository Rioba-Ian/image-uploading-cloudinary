import type { Component } from "solid-js";
import UploadImage from "./components/UploadImage";

const App: Component = () => {
 return (
  <main class="bg-slate-200 flex flex-col justify-center items-center h-screen">
   <UploadImage />
  </main>
 );
};

export default App;
