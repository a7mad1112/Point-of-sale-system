import SectionHeading from "../Components/SectionHeading/SectionHeading";
import CategoriesTable from "./Components/MeasuresTable/MeasuresTable";
import useFetch from "./../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { measuresActions } from "../../store/states/measuresSlice";
import Loader from "../Components/Loader/Loader";
import { MeasuresType } from "../../types/types";
import { Button } from "@mui/material";
import CreateMeasureModal from "./Components/CreateMeasureModal/CreateMeasureModal";

const Measure = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const measures: MeasuresType = useSelector(
    (state: any) => state.measures?.measures
  );
  const URL = "http://localhost:1337/api/unit-of-measures1";
  const { response } = useFetch(URL);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.data) {
      dispatch(measuresActions.setMeasures(response.data.data));
    }
  }, [response, dispatch]);

  if (response.loading)
    return (
      <div className="loading-container">
        <Loader />
      </div>
    );

  return (
    <section>
      <SectionHeading position="left" text="Measures" />
      {!measures?.length ? (
        <p>
          Oops! It seems that no measures have been added yet. Don't worry, you
          can easily add new measures to your system to organize your units of
          measurement more effectively. Just click the "Add Measure" button to
          get started and enhance your inventory management.
        </p>
      ) : (
        <CategoriesTable measures={measures} />
      )}
      <Button
        onClick={() => setShowCreateModal(true)}
        sx={{
          my: 4,
          backgroundColor: "var(--yellow-color)",
          color: "#FFFFFF",
          fontWeight: "bold",
          transition: "0.3s",
          "&:hover": {
            opacity: 0.8,
            backgroundColor: "var(--yellow-color)",
            transform: "translateY(-2px)",
          },
        }}
        variant="contained"
      >
        New Measure
      </Button>
      {
        showCreateModal && <CreateMeasureModal setIsShow={setShowCreateModal} />
      }
    </section>
  );
};

export default Measure;
