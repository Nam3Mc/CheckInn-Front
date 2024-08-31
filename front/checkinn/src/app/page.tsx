import CarouselRooms from "@/components/CarouselRooms/carouselRooms";
import CarouselWelcome from "@/components/CarouselWelcome/carouselWelcome";
import CategoriesFather from "@/components/recommendations/categoriesFather";
import CategoriesFather2 from "@/components/recommendations/categoriesFather2";
import RecommendationVIPFather from "@/components/recommendationVIP/recommendationVIPFather";
import RecommendationVIPFatherReverse from "@/components/recommendationVIP/recommendationVIPFatherReverse";
import Chatbot from "./chatbot";

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
      <Chatbot/>
    </div>
  );
}
