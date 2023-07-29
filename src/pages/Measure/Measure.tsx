import SectionHeading from "../Components/SectionHeading/SectionHeading";
import MeasuresTable from "./Components/MeasuresTable/MeasuresTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MeasuresType } from "../../types/types";
import { Button } from "@mui/material";
import CreateMeasureModal from "./Components/CreateMeasureModal/CreateMeasureModal";
import useFetch from "../../hooks/useFetch";
import { measuresActions } from "../../store/states/measuresSlice";
import Loader from "../Components/Loader/Loader";

const Measure = () => {
  const dispatch = useDispatch();
  // fetch measures
  const MEASURES_URL =
    "http://localhost:1337/api/unit-of-measures1?pagination[limit]=-1";
  const { response: measuresRes } = useFetch(MEASURES_URL);
  useEffect(() => {
    if (measuresRes.data) {
      dispatch(measuresActions.setMeasures(measuresRes.data.data));
    }
  }, [measuresRes, dispatch]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const measures: MeasuresType = useSelector(
    (state: any) => state.measures?.measures
  );
  // if loading, show spinner
  const isLoading: Boolean = useSelector(
    (state: any) => state.isLoading.isLoading
  );
  const spinner = (
    <div className="loading-container">
      <Loader />
    </div>
  );
  if (isLoading) return spinner;
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
        <MeasuresTable measures={measures} />
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
      {showCreateModal && <CreateMeasureModal setIsShow={setShowCreateModal} />}
    </section>
  );
};

export default Measure;
