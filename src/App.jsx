import GalleryCard from "./Gallerycard.jsx";
import Header from "./Header.jsx";
import TeamInfo from "./TeamInfo.jsx";
import Trophy from "./Trophy.jsx";
import WC from "./assets/WC.jpg";
import CA from "./assets/CA.jpg";
import F from "./assets/F.jpg";
import GlitchText from './Glitchtext';
import Footer from './Footer.jsx';
import { useEffect, useRef, useState } from "react";

function App() {
  const merchRef = useRef(null);
  const [showMerch, setShowMerch] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('merch') === '1' && merchRef.current) {
      setShowMerch(true);
      setTimeout(() => {
        merchRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      setShowMerch(false);
    }
  }, []);

  return (
    <div className="App app-bg">
      <Header />
      <h1 className="Sections" id="news-section">
        <GlitchText speed={1} enableShadows={true} enableOnHover={true}>News</GlitchText>
      </h1>
      <TeamInfo title="FIFA World Cup" image={WC} rightAlign={false}>
        <p className="team-info-text">
          Argentina has won the FIFA World Cup three times: in 1978, 1986, and 2022. The team is renowned for its attacking style and legendary players like Diego Maradona and Lionel Messi.
        </p>
      </TeamInfo>
      <TeamInfo title="Copa América" image={CA} imageRight>
        <p className="team-info-text">
          Argentina has won the Copa América title 16 times, making it one of the most successful teams in South America. The most recent victory came in 2024.
        </p>
      </TeamInfo>
      <TeamInfo title="Finalissima" image={F} rightAlign={false}>
        <p className="team-info-text">
          In 2022, Argentina won the Finalissima, a match between the champions of Europe and South America, by defeating Italy 3-0 at Wembley Stadium.
        </p>
      </TeamInfo>
      <h1 className="Sections" id="Trophy-section">
        <GlitchText speed={1} enableShadows={true} enableOnHover={true}>Trophy</GlitchText>
      </h1>
      <Trophy/>
      <h1 className="Sections" id ="players-section">
        <GlitchText speed={1} enableShadows={true} enableOnHover={true}>Gallery</GlitchText>
      </h1>
      <div className="player-list">
        <GalleryCard/>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;