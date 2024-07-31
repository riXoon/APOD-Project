import { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=laWcRQqUp3dSTbR3WVHW1cqo9bnHckxqKw1yX0vX`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      const localData = localStorage.getItem(localKey);
      if (localData) {
        try {
          const apiData = JSON.parse(localData);
          setData(apiData);
          setLoading(false); // Set loading to false when data is fetched from cache
          console.log('Fetched from cache');
          return;
        } catch (err) {
          console.error('Error parsing local storage data:', err.message);
        }
      }

      localStorage.clear();

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        setLoading(false); // Set loading to false when data is fetched from API
        console.log('Fetched from API');
      } catch (err) {
        setLoading(false); // Set loading to false on error
        console.error('Fetch error:', err.message);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear fa-spin"></i>
        </div>
      ) : (
        <Main data={data} />
      )}
      {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
      {data && (
        <Footer data={data} showModal={showModal} handleToggleModal={handleToggleModal} />
      )}
    </>
  );
}

export default App;
