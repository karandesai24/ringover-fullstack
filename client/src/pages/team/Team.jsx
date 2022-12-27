import "./team.scss";

import { TEAM } from "../../static/data/team";
const TeamMemberCard = ({ member }) => {
  return (
    <div className="member-card">
      <div className="member-img">
        <img src={member.image} alt="team member" />
      </div>
      <div className="member-details">
        <h3>{member.name}</h3>
        <p>{member.position}</p>
        <div className="member-social">
          {member.socials.map((item, index) => (
            <img
              className="member-social-icon"
              src={item.icon}
              alt="icon"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const Team = () => {
  return (
    <>
      <div className="team">
        <main className="team-container">
          <h3>
            Without bonding and coordination,every project is a failure. Look at
            who makes Kicksup great. ;{")"}
          </h3>
          <ul className="team-members-list">
            {TEAM.map((member) => (
              <TeamMemberCard member={member} key={member.name} />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Team;
