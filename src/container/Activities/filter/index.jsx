import SelectCustom from "@/commons/SelectCustom";
import React, { useCallback, useState } from "react";
import styles from "./Filter.module.scss";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "@/components/SearchBar";

const data = [
  {
    value: "XCO",
    label: "Xco",
  },
  {
    value: "XCM",
    label: "Xcm",
  },
  {
    value: "CX",
    label: "CX",
  },
  {
    value: "RANDO",
    label: "Rando",
  },
  {
    value: "ROAD",
    label: "Route",
  },
];

export default function FilterActivites({
  value,
  onChange,
  handleRestart,
  searchBar,
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [localValue, setLocalValue] = useState({
    type: "",
    date: "",
    nom: "",
  });

  const onSubmit = useCallback(() => {
    onChange(localValue);
    setOpenFilter(false);
  }, [onChange, localValue]);

  return (
    <div className={styles.container}>
      <div>
        <SearchBar
          onChange={searchBar?.onChange}
          value={searchBar?.value}
          placeholder={"Par nom ou ville"}
        />
      </div>
      {openFilter && (
        <div className={styles.menuContainer}>
          <div className={styles.titleContainer}>
            <p>Filtrer les activités</p>
          </div>
          <div className={styles.selectorContainer}>
            <SelectCustom
              onChange={(e) => setLocalValue({ ...localValue, type: e })}
              width={"100%"}
              label={"Type d'activité"}
              value={localValue?.type}
              data={data}
            />
          </div>

          {/* <div className={styles.selectorContainer}>
            <DatePickerCustom
              minDate={dayjs(new Date())}
              classic={true}
              onChange={(e) => setLocalValue({ ...localValue, date: e?.$d })}
              label={"Date choisie"}
            />
          </div> */}
          <div className={styles.buttonContainerFilter}>
            <Button onClick={onSubmit} variant="outlined">
              Valider
            </Button>
            <Button
              onClick={() => {
                handleRestart();
                setOpenFilter(false);
                setLocalValue({
                  type: "",
                  date: "",
                  nom: "",
                });
              }}
              variant="outlined"
              color="error"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
      <Button
        size="large"
        variant="outlined"
        onClick={() => setOpenFilter(!openFilter)}
      >
        {openFilter ? <CloseIcon /> : <FilterAltIcon />}
      </Button>
    </div>
  );
}
