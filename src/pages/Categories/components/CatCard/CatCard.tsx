import { Category } from "../../../../types/types";
import { Grid } from '@mui/material';
const CatCard = ({ category }: { category: Category }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <span className="point top-left"></span>
      <span className="point top-right"></span>
      <span className="point bottom-left"></span>
      <span className="point bottom-right"></span>
      {category.attributes.name}
    </Grid>
  );
};

export default CatCard;
