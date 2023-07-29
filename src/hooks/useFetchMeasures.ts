import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { measuresActions } from '../store/states/measuresSlice';

const useFetchMeasures = () => {
  const dispatch = useDispatch();
  const measures = useSelector((state: any) => state.measures.measures);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch measures if not available
      if (!measures) {
        try {
          const measuresRes = await fetch(
            "http://localhost:1337/api/unit-of-measures1?pagination[limit]=-1"
          );
          const measuresData = await measuresRes.json();
          dispatch(measuresActions.setMeasures(measuresData.data));
        } catch (error) {
          throw new Error("Failed to fetch measures");
        }
      }
    };

    fetchData();
  }, [measures, dispatch]);
};

export default useFetchMeasures;
