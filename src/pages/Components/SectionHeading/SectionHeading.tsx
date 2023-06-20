import "./section-heading.css";
import Box from "@mui/material/Box";
interface SectionHeadingProps {
  position?: string;
  text: string
}
const SectionHeading: React.FC<SectionHeadingProps> = ({ position = "center", text }) => {
  return (
    <Box sx={{ textAlign: position }} className={`main-heading ${position === 'center' && 'center-heading'}`}>
      <h2>{text}</h2>
    </Box>
  );
};

export default SectionHeading;
