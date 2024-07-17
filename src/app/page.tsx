
import AssetTable from '../components/AssetTable';

const Home = () => {
  const currentAsset ='BTC';

  return (
    <div className="container mx-auto mt-8">
      <AssetTable initialAsset={currentAsset} />
    </div>
  );
};

export default Home;
