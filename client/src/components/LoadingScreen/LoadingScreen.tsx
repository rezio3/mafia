import { CircularProgress } from "@mui/material";
import Header from "../Header";
import "./loadingScreen.scss";

type LoadingScreenPropsType = {
  loadingText?: string;
};

const LoadingScreen: React.FC<LoadingScreenPropsType> = ({ loadingText }) => {
  return (
    <div className="full-screen-loader">
      <div className="loader-content">
        <CircularProgress color="primary" size={60} />
        {loadingText && (
          <Header variant="h5" className="mt-3">
            {loadingText}
          </Header>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
