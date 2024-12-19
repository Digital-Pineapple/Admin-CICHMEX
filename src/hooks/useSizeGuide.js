import { useSelector, useDispatch } from "react-redux";

import {
  startAddOneSizeGuide,
  startDeleteSizeGuide,
  startLoadOneSizeGuide,
  startLoadSizeGuides,
  startSelectSizeGuide,
  startUpdateSizeGuide,
} from "../store/actions/sizeGuideActions";
import { useNavigate } from "react-router-dom";

export const useSizeGuide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sizeGuides, sizeGuide } = useSelector((state) => state.sizeGuide);
  const { loading } = useSelector((state) => state.ui);

  const loadSizeGuides = async () => await dispatch(startLoadSizeGuides());

  const loadAddOneSizeGuide = (values) =>
    dispatch(startAddOneSizeGuide(values));

  const loadOneSizeGuide = async (id) => dispatch(startLoadOneSizeGuide(id));
  const deleteSizeGuide = async (id) => dispatch(startDeleteSizeGuide(id));
  const updateSizeGuide = async (id, values) =>
    dispatch(startUpdateSizeGuide(id, values, navigate));

  const rowsAllGuides = sizeGuides?.map((item, index) => ({
    id: index,
    ...item,
  }));

  const rowsSizeGuide = sizeGuide?.dimensions?.map((item, index) => ({
    id: index,
    ...item,
  }));

  return {
    loadSizeGuides,
    navigate,
    updateSizeGuide,
    sizeGuides,
    sizeGuide,
    loadAddOneSizeGuide,
    dispatch,
    loadOneSizeGuide,
    rowsAllGuides,
    deleteSizeGuide,
    loading,
    rowsSizeGuide,
  };
};
