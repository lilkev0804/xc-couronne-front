import React, { useCallback, useEffect, useState } from "react";
import styles from "./ModifiedInput.module.scss";
import InputText from "@/commons/InputText";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, OutlinedInput, Select, Switch } from "@mui/material";

export default function ModifiedInput({
  data,
  label,
  typeOfInput,
  shin = false,
  onSubmit,
  itemsData,
  isVisitor,
}) {
  const [isModified, setIsModified] = useState(false);
  const [value, setValue] = useState();

  const handleValidate = useCallback(() => {
    setIsModified(false);
    onSubmit(value);
  }, [onSubmit, value]);

  useEffect(() => {
    if (typeOfInput === "select") {
      setValue(data ?? []);
      return;
    }
    setValue(data);
  }, [data, typeOfInput]);

  const changeInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
  };

  if (typeOfInput === "select") {
    return (
      <div className={styles.container}>
        {isModified && (
          <div className={styles.containerInputModified}>
            <div>
              <Select
                id="demo-multiple-name"
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
              >
                {itemsData?.map((el, i) => (
                  <MenuItem key={i} value={el.key}>
                    {el.value}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <button
                onClick={handleValidate}
                className={styles.modifiedButton}
              >
                <DoneIcon color="success" />
              </button>
              <button
                onClick={() => setIsModified(false)}
                className={styles.modifiedButton}
              >
                <CloseIcon color="error" />
              </button>
            </div>
          </div>
        )}
        {!isModified && (
          <div className={styles.lineLabelToModified}>
            <p>
              <span className={styles.label}>{label}</span> :{" "}
              {value?.map((el, i) => (
                <span key={i}>
                  {i !== 0 && " - "}
                  {el}
                </span>
              ))}
            </p>
            {!isVisitor && (
              <button
                onClick={() => setIsModified(true)}
                className={styles.modifiedButton}
              >
                <EditIcon sx={{ color: shin ? "white" : "black" }} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  if (typeOfInput === "switch") {
    return (
      <div className={styles.container}>
        {isModified && (
          <div className={styles.containerInputModified}>
            <div>
              <span className={styles.label}>{label}</span> :
              <Switch
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
              />
            </div>
            <div>
              <button
                onClick={handleValidate}
                className={styles.modifiedButton}
              >
                <DoneIcon color="success" />
              </button>
              <button
                onClick={() => setIsModified(false)}
                className={styles.modifiedButton}
              >
                <CloseIcon color="error" />
              </button>
            </div>
          </div>
        )}
        {!isModified && (
          <div className={styles.lineLabelToModified}>
            <p>
              <span className={styles.label}>{label}</span> :{" "}
              <Switch checked={value} disabled />
            </p>
            {!isVisitor && (
              <button
                onClick={() => setIsModified(true)}
                className={styles.modifiedButton}
              >
                <EditIcon sx={{ color: shin ? "white" : "black" }} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isModified && (
        <div className={styles.containerInputModified}>
          <InputText
            shin={shin}
            label={label}
            value={value}
            onChange={changeInput}
          />
          <div>
            <button onClick={handleValidate} className={styles.modifiedButton}>
              <DoneIcon color="success" />
            </button>
            <button
              onClick={() => setIsModified(false)}
              className={styles.modifiedButton}
            >
              <CloseIcon color="error" />
            </button>
          </div>
        </div>
      )}
      {!isModified && (
        <div className={styles.lineLabelToModified}>
          <p>
            <span className={styles.label}>{label}</span> : {value}
          </p>
          {!isVisitor && (
            <button
              onClick={() => setIsModified(true)}
              className={styles.modifiedButton}
            >
              <EditIcon sx={{ color: shin ? "white" : "black" }} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
