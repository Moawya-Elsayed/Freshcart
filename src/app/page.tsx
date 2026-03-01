import MainSlider from "./_components/MainSlider/MainSlider";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";
import AllProducts from "./_components/AllProducts/AllProducts";

export default function Home() {
  return (
      <div  className="min-h-screen bg-gray-100 dark:bg-[#020617]">
      <MainSlider/>
      <CategoriesSlider/>
      <AllProducts/>
      
      </div>
  );
}
