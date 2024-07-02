import { ColorRing, RotatingLines, ThreeCircles, ThreeDots, Vortex } from "react-loader-spinner";
import { Box } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
    component={'div'}
    className="GradientItem"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "static",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThreeCircles
  height="300"
  width="300"
  color="#EE6B10"
  visible={true}
  outerCircleColor="#fff"
  innerCircleColor="#0d2b6b"
  middleCircleColor="#EE6B10"
/>
    
   {/* '#00a399', '#cb5b55', '#00a399', '#382e73', '#c7c1e6' */}

    </Box>
  );
};

export default LoadingScreen;
