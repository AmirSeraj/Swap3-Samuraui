import Loading from "./loadingCircle/Loading";

const LoadingComponent = () => {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-green-600 via-green-400 to-green-200 flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default LoadingComponent;

/* HTML: <div class="loader"></div> */

