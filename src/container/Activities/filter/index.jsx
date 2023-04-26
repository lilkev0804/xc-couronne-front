import SelectCustom from "@/commons/SelectCustom";
import React, { useState } from "react";
import styles from "./Filter.module.scss";
import { DatePicker } from "@mui/x-date-pickers";
import DatePickerCustom from "@/commons/DatePickerCustome";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

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

export default function FilterActivites({ value, onChange }) {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className={styles.container}>
      {openFilter && (
        <div className={styles.menuContainer}>
          <div className={styles.titleContainer}>
            <p>Filtrer les activités</p>
          </div>
          <div className={styles.selectorContainer}>
            <SelectCustom
              onChange={(e) => console.log(e)}
              width={"100%"}
              label={"Type d'activité"}
              data={data}
            />
          </div>
          <div className={styles.selectorContainer}>
            <DatePickerCustom
              minDate={dayjs(new Date())}
              classic={true}
              onChange={(e) => console.log(e?.$d)}
              label={"Date choisie"}
            />
          </div>
          <div className={styles.buttonContainerFilter}>
            <Button variant="outlined">Valider</Button>
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
