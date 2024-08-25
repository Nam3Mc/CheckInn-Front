import React from "react";

import { team } from "@/utils/arrays/arrayTeam";
/* import { ITeamMember } from "@/utils/interfaces/interfaces"; */
import { CardTeam } from "@/components/cardTeam/cardTeam";

const AboutUs = () => {
  const teamMembers = team;

  return (
    <div className="bg-greyVivino dark:bg-darkMode-greyVivino ">
      <h1 className="text-wine text-center text-6xl font-plus-jakarta-sans  mb-8 p-20 pb-0">
        Conoce más sobre nosotros
      </h1>
      <section className="my-10 flex flex-col items-center gap-8">
        <h2 className="text-black dark:text-darkMode-white text-4xl text-center z-10">
          Nuestro equipo
        </h2>
        <div className="flex gap-4  mt-32">
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
