import SelectCustom from "@/commons/SelectCustom";
import React, { useCallback, useState } from "react";
import styles from "./Filter.module.scss";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "@/components/SearchBar";
import InputRadio from "@/commons/InputRadio";

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
  const [orderValue, setOrderValue] = useState("new");

  const onSubmit = useCallback(() => {
    onChange(localValue);
    setOpenFilter(false);
  }, [onChange, localValue]);

  const handleChangeOrder = useCallback((e) => {
    setOrderValue(e);
  }, []);

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
            <InputRadio
              data={[
                {
                  value: "new",
                  label: "Nouveau",
                },
                {
                  value: "asc",
                  label: "A venir",
                },
                {
                  value: "desc",
                  label: "Passé",
                },
              ]}
              label={"Ordre"}
              value={orderValue}
              onChange={handleChangeOrder}
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
                setOrderValue("");
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
