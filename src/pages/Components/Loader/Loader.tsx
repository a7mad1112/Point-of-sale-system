import { PuffLoader } from "react-spinners";
function Loader() {
  return (
    <div
      className="loading"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1.6)",
      }}
    >
      <PuffLoader color="#A30000" />
    </div>
  );
}

export default Loader;
