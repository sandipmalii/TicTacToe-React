import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Tooltip, Typography } from "@material-tailwind/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function DeveloperCard({ name, title, imgSrc, description }) {
  return (
    
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <img src={imgSrc} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h2" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="blue gray" className="font-medium" >
          {title}
        </Typography>
        <Typography color="gray" className="mt-2">
          {description}
        </Typography>
      </CardBody>

      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography as="a" href="#facebook" variant="lead" color="blue"  >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography as="a" href="#twitter" variant="lead" color="light-blue"  >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography as="a" href="#instagram" variant="lead" color="purple"  >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

function DeveloperSection() {
  const developers = [
    {
      name: "Srinivas",
      title: "CEO / Co-Founder",
      imgSrc: "https://docs.material-tailwind.com/img/team-3.jpg",
      description: "Developer and Code Leader.",
    },
    {
      name: "Keshav",
      title: "CTO / Co-Founder",
      imgSrc: "https://docs.material-tailwind.com/img/team-4.jpg",
      description: "Mentor and Developer.",
    },
    {
      name: "Sandip",
      title: "COO / Co-Founder",
      imgSrc: "https://docs.material-tailwind.com/img/team-1.jpg",
      description: "Designer, Developer and Idolist.",
    },
  ];

  return (
    <div className="container mx-auto">
      {/* Section 1: Developers */}
      <Typography variant="h2" color="blue-gray" className="text-center mt-7 mb-10 relative ">
        Lead Developers
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-80 h-1 bg-orange-500 "></span>
        </Typography>

      <div className="flex justify-around my-10">
        {developers.map((dev, index) => (
          <DeveloperCard
            key={index}
            name={dev.name}
            title={dev.title}
            imgSrc={dev.imgSrc}
            description={dev.description}
          />
        ))}
      </div>
    </div>
  );
}

function ContributorSection() {
  const contributors = [
    {
      name: "G.Pradeep",
      title: "Lead Developer",
      imgSrc: "https://docs.material-tailwind.com/img/team-3.jpg",
      description: "Hari contributed to the backend architecture and database design.",
    },
    {
      name: "M.Sweta",
      title: "UI/UX Designer",
      imgSrc: "https://docs.material-tailwind.com/img/team-4.jpg",
      description: "John designed the user interfaces and improved overall user experience.",
    },
    // {
    //   name: "Jane",
    //   title: "DevOps Engineer",
    //   imgSrc: "https://docs.material-tailwind.com/img/team-1.jpg",
    //   description: "Jane automated deployment processes and ensured system reliability.",
    // },
  ];

  return (
    <div className="container mx-auto mt-16">
      {/* Section 2: Contributors */}
      <Typography variant="h2" color="blue-gray" className="text-center mb-10 relative">
  Our Contributors
  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-80 h-1 bg-orange-500 "></span>
</Typography>

      <div className="flex justify-around my-10">
        {contributors.map((contributor, index) => (
          <DeveloperCard
            key={index}
            name={contributor.name}
            title={contributor.title}
            imgSrc={contributor.imgSrc}
            description={contributor.description}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <DeveloperSection />
      <ContributorSection />
    </>
  );
}


export default App;

