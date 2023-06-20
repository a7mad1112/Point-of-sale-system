import "./dialog.css";
type DialogProps = {
  dialog: {
    loading: boolean;
    msg: string;
  };
  setDialog: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      msg: string;
    }>
  >;
  handleDelete: () => void;
};

const Dialog = ({ dialog, setDialog, handleDelete }: DialogProps) => {
  const handleDel = async () => {
    handleDelete();
    // close dialog
    handleCancel();
  };
  const handleCancel = () => {
    setDialog({ ...dialog, loading: false });
  };
  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && handleCancel()}
    >
      <div className="dialog">
        <p>{dialog.msg}</p>
        <div className="buttons">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDel}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
