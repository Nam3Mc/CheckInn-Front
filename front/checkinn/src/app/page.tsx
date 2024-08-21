import CarouselRooms from "@/components/CarouselRooms/carouselRooms";
import CarouselWelcome from "@/components/CarouselWelcome/carouselWelcome";
import CategoriesFather from "@/components/recommendations/categoriesFather";
import CategoriesFather2 from "@/components/recommendations/categoriesFather2";
import RecommendationVIPFather from "@/components/recommendationVIP/recommendationVIPFather";
import RecommendationVIPFatherReverse from "@/components/recommendationVIP/recommendationVIPFatherReverse";

export default function Home() {
  return (
    <div className="bg-powerBackground w-full h-screen p-5">
      <CarouselWelcome />
      <CarouselRooms />
      <CategoriesFather />
      <RecommendationVIPFather />
      <RecommendationVIPFatherReverse />
      <CategoriesFather2 />
      <CarouselRooms />

      {/* 
      
      welcome carousel------------------------------------
      
      rooms carousel ---------------------------------------
      
      2 categories componentx2-------------------------------

      componente para recomendacion de producto--------------------

      componente para recomendacion de producto ESPEJADO-----------------

      2 categories MORE componentx2

      rooms carousel 

       */}
    </div>
  );
}
