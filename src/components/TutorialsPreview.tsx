import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TutorialsPreview = () => {
  const tutorials = [
    {
      title: "Crystalball Drone | Smart Missions for Solar, Agri & Urban Zones",
      level: "Beginner",
      duration: "10 min",
      video: "https://www.youtube.com/embed/RVQ8oiLejLs",
      description: "Explore the Crystalball drone performing multi-zone operations across solar fields, farms, and urban infrastructure."
    },
    {
      title: "Agriculture Drone | Precision Farming & RPTO Ground Training",
      level: "Intermediate",
      duration: "15 min",
      video: "https://www.youtube.com/embed/cYKk5S0aOGU",
      description: "Watch precision farming in action as RPTO trainees perform real-time spraying operations using smart agriculture drones."
    },
    {
      title: "DJI Marvic | Urban Mapping & RPTO Missions",
      level: "Advanced",
      duration: "18 min",
      video: "https://www.youtube.com/embed/HyuewgCoSNE",
      description: "DJI Marvic takes on complex RPTO missions including urban inspections, aerial surveys, and mapping operations."
    }
  ];

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

 
};

export default TutorialsPreview;