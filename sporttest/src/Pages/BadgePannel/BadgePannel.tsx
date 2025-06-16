import { useEffect, useState, lazy } from "react";
import { getSeasonBadges } from "../../service/league";
import styles from "./BadgePannel.module.css";
import { IF } from "../../component/IF/IF";
import Loader from "../../component/Loader/Loader";

const NoData = lazy(() => import("../../component/NoData/NoData"));

interface Props {
  leagueId: string;
}

const BadgePanel: React.FC<Props> = ({ leagueId }) => {
  const [badges, setBadges] = useState<
    { strSeason: string; strBadge: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const response = await getSeasonBadges(leagueId); // should handle cache internally
      setBadges(response?.seasons || []);
      setLoading(false);
    } catch (error) {
      console.error("Not able to load seasons", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.panel}>
      <IF expr={loading}>
        <Loader />
      </IF>
      <IF expr={!badges.length && !loading}>
        <NoData title="No Season Found" />
      </IF>
      <IF expr={!!badges.length && !loading}>
        <div className={styles.grid}>
          {badges?.map((badge) => (
            <div key={badge.strSeason} className={styles.badgeCard}>
              <img
                src={badge.strBadge}
                alt={badge.strSeason}
                className={styles.badgeImage}
                loading="lazy"
              />
              <div className={styles.seasonLabel}>{badge.strSeason}</div>
            </div>
          ))}
        </div>
      </IF>
    </div>
  );
};

export default BadgePanel;
