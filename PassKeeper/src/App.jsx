import Navbar from "./Navbar"
import Footer from "./Footer"
import Content from "./Content"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-100">
      <Navbar />
      <main className="flex-grow">
        <Content />
      </main>
      <Footer />
    </div>
  );
}


export default App
