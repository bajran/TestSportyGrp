import styles from "./App.module.css";
import { useState, lazy } from "react";

const LeagueList = lazy(() => import("./Pages/LeagueList/LeagueList"));
const Modal = lazy(() => import("./component/Modal/Modal"));
const BadgePanel = lazy(() => import("./Pages/BadgePannel/BadgePannel"));

function App() {
  const [selectedLeague, setSelectedLeague] = useState({
    id: "",
    name: "",
  });

  return (
    <div className={styles.container}>
      <LeagueList setSelectedLeague={setSelectedLeague} />
      {selectedLeague?.id && (
        <Modal
          onClose={() => setSelectedLeague({ id: "", name: "" })}
          title={selectedLeague?.name}
        >
          <BadgePanel leagueId={selectedLeague?.id} />
        </Modal>
      )}
    </div>
  );
}

export default App;
