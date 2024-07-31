import { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

function App() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading] =useState(false)
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=laWcRQqUp3dSTbR3WVHW1cqo9bnHckxqKw1yX0vX
`;

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData)
        console.log('DATA\n', apiData);
      } catch (err) {
        console.error('Fetch error:', err.message);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
     {data ? ( <Main data={data} />) : (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
     )}
      {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
    {data && (
      <Footer data={data} showModal={showModal} handleToggleModal={handleToggleModal} /> 
    )}

    </>
  );
}

export default App;
