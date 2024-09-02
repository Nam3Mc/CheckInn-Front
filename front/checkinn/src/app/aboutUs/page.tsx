import React from "react";

import { team } from "@/utils/arrays/arrayTeam";
/* import { ITeamMember } from "@/utils/interfaces/interfaces"; */
import { CardTeam } from "@/components/cardTeam/cardTeam";

const AboutUs = () => {
  const teamMembers = team;

  return (
    <div className="bg-greyVivino dark:bg-darkMode-greyVivino">
      <h1 className="text-lavenderBlush text-center text-6xl font-plus-jakarta-sans mb-8 p-20 pb-0">
        Learn More About Us
      </h1>
      <section className="my-10 flex flex-col items-center gap-8">
        <h2 className="text-lavenderBlush dark:text-lavenderBlush text-4xl text-center z-10">
          Welcome to CheckINN
        </h2>
        <p className="text-center text-lg text-gray-200 dark:text-gray-300 max-w-2xl mb-8 px-4">
          At CheckINN, we blend comfort and tranquility with exceptional value,
          making our hotel the perfect choice for both business travelers and
          tourists alike. Strategically located in the heart of the city, we
          offer modern spaces ideal for conventions, business meetings, and
          corporate events, equipped with the latest technology to ensure the
          success of every gathering.
        </p>
        <p className="text-center text-lg text-gray-200 dark:text-gray-300 max-w-2xl mb-8 px-4">
          Additionally, our carefully curated dining options complement the
          experience, allowing you to enjoy comprehensive events without leaving
          our premises. Discover the excellence and dedication that define us,
          and let us be a part of your next visit to [specific city].
        </p>
        <h2 className="text-lavenderBlush dark:text-lavenderBlush text-4xl text-center z-10">
          Our Team
        </h2>
        <div className="flex gap-4 mt-32">
          {teamMembers.map((member: any) => (
            <CardTeam
              key={member.id}
              id={member.id}
              name={member.name}
              role={member.role}
              GitHub={member.GitHub}
              LinkedIn={member.LinkedIn}
              img={member.img}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
