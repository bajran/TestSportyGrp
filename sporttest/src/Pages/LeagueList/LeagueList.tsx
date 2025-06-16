import { useEffect, useMemo, useState, lazy } from "react";
import { getAllLeagues } from "../../service/league";
import type { League } from "../../types/leagueType";
import styles from "./LeagueList.module.css";
import { IF } from "../../component/IF/IF";
import Loader from "../../component/Loader/Loader";

const NoData = lazy(() => import("../../component/NoData/NoData"));
const Card = lazy(() => import("../../component/Card/Card"));
const SearchBar = lazy(() => import("../../component/SearchBar/SearchBar"));
const MultiSelectDropdown = lazy(
  () => import("../../component/MultiSelectDropdown/MultiSelectDropdown")
);

interface LeagueListProps {
  setSelectedLeague: (params: { id: string; name: string }) => void;
}

const LeagueList = ({ setSelectedLeague }: LeagueListProps) => {
  const [allLeague, setAllLeague] = useState<League[]>([]);
  const [filteredLeague, setFilteredLeague] = useState<League[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    setLoading(true);
    try {
      const data = await getAllLeagues();
      const { leagues = [] } = data;
      setAllLeague(leagues);
      setFilteredLeague(leagues);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch leagues:", error);
      setLoading(false);
    }
  };

  const getSportFilterOptions = useMemo(() => {
    const options = allLeague?.map((item) => item?.strSport);
    return [...new Set(options)];
  }, [allLeague]);

  const handleSearch = (str: string) => {
    setSearch(str);
    // First apply sport filter if any
    let filteredBySport = allLeague;
    if (selectedFilter.length > 0) {
      filteredBySport = allLeague.filter((league: League) =>
        selectedFilter.includes(league?.strSport)
      );
    }
    // Then apply search filter
    const list = filteredBySport.filter(
      (item: League) =>
        item?.strLeague?.toLowerCase()?.includes(str?.toLowerCase()) ||
        item?.strLeagueAlternate?.toLowerCase()?.includes(str?.toLowerCase())
    );
    setFilteredLeague(list);
  };

  const handleFilter = (val: string[]) => {
    setSelectedFilter(val);
    // First apply search filter if any
    let filteredBySearch = allLeague;
    if (search) {
      filteredBySearch = allLeague.filter(
        (item: League) =>
          item?.strLeague?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.strLeagueAlternate
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
      );
    }
    // Then apply sport filter
    const list = filteredBySearch.filter((league: League) =>
      val.length === 0 ? true : val.includes(league?.strSport)
    );
    setFilteredLeague(list);
  };

  return (
    <>
      <header className={styles.headerAction}>
        <img
          src="https://sportygroup.com/images/logo.svg"
          alt="sporty group"
          loading="lazy"
        />
        <div style={{ display: "flex", gap: "20px" }}>
          <SearchBar value={search} onChange={handleSearch} />
          <MultiSelectDropdown
            selected={selectedFilter}
            onChange={handleFilter}
            options={getSportFilterOptions}
          />
        </div>
      </header>
      <IF expr={loading}>
        <Loader />
      </IF>
      <section className={styles.leagueList}>
        <IF expr={!filteredLeague.length && !loading}>
          <NoData title="No Leagues Found" />
        </IF>
        <IF expr={!!filteredLeague.length && !loading}>
          {filteredLeague.map((league) => (
            <Card
              key={league.idLeague}
              id={league.idLeague}
              name={league.strLeague}
              type={league.strSport}
              onClick={(data) => {
                setSelectedLeague(data);
              }}
              alternateName={league.strLeagueAlternate}
            />
          ))}
        </IF>
      </section>
    </>
  );
};

export default LeagueList;
