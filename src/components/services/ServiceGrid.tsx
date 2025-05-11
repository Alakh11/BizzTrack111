import React from "react";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

interface ServiceGridProps {
  searchQuery: string;
  currentTab: string;
}

// Mock service data (this would ideally come from your services hook)
const services = [
  {
    id: "1",
    name: "Website Design",
    description: "Custom website design with responsive layouts",
    price: 15000,
    category: "design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
  {
    id: "2",
    name: "Logo Design",
    description: "Professional logo design with multiple concepts",
    price: 5000,
    category: "design",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
  },
  {
    id: "3",
    name: "Web Development",
    description: "Custom web application development",
    price: 30000,
    category: "development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: "4",
    name: "Digital Marketing",
    description: "Comprehensive digital marketing services",
    price: 8000,
    category: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    id: "5",
    name: "SEO Optimization",
    description: "Search engine optimization for better rankings",
    price: 6000,
    category: "marketing",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
  },
  {
    id: "6",
    name: "Mobile App Development",
    description: "Native mobile application development",
    price: 40000,
    category: "development",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
  },
  {
    id: "7",
    name: "Content Writing",
    description: "Professional content creation services",
    price: 3000,
    category: "content",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
  },
  {
    id: "8",
    name: "UI/UX Design",
    description: "User interface and experience design",
    price: 12000,
    category: "design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
  },
];

const ServiceGrid: React.FC<ServiceGridProps> = ({
  searchQuery,
  currentTab,
}) => {
  // Filter services based on search query and selected category
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      currentTab === "all" || service.category === currentTab;
    return matchesSearch && matchesCategory;
  });

  if (filteredServices.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No services found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredServices.map((service) => (
        <div
          key={service.id}
          className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700"
        >
          <div
            className="h-40 bg-cover bg-center"
            style={{
              backgroundImage: `url(${service.image})`,
            }}
          ></div>
          <div className="p-4">
            <h3 className="font-medium text-foreground">{service.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {service.description}
            </p>
            <div className="flex justify-between items-center mt-3">
              <div className="font-bold text-primary flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                {service.price.toLocaleString("en-IN")}
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;
