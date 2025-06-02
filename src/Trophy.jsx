import FIFAWC from "./assets/FIFAWC.png";
import COPA from "./assets/COPA.png";
import Finalissima from "./assets/Finalissima.png";
import OIP from "./assets/OIP.png";

function Trophy() {
  return (
    <section className="trophy-section">
      <div className="trophy-card-list">
        <div className="trophy-card">
          <img src={FIFAWC} alt="FIFA World Cup" className="trophy-img" />
          <div className="trophy-card-content">
            FIFA World Cup
            <div className="trophy-count">3 Cups</div>
          </div>
        </div>
        <div className="trophy-card">
          <img src={COPA} alt="Copa América" className="trophy-img" />
          <div className="trophy-card-content">
            Copa América
            <div className="trophy-count">16 Cups</div>
          </div>
        </div>
        <div className="trophy-card">
          <img src={Finalissima} alt="Finalissima" className="trophy-img" />
          <div className="trophy-card-content">
            Finalissima
            <div className="trophy-count">2 Cups</div>
          </div>
        </div>
        <div className="trophy-card">
          <img src={OIP} alt="FIFA Confederations Cup" className="trophy-img" />
          <div className="trophy-card-content">
            FIFA Confederations Cup
            <div className="trophy-count">1 Cup</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trophy;