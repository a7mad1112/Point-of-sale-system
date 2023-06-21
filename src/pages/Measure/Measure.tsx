import SectionHeading from "../Components/SectionHeading/SectionHeading";
import CategoriesTable from "./Components/MeasuresTable/MeasuresTable";
import useFetch from './../../hooks/useFetch';

const Measure = () => {
  const URL = ""
  // const useFetch()
  return (
    <section>
      <SectionHeading position="left" text="Measures" />
      <CategoriesTable />
    </section>
  );
};

export default Measure;
