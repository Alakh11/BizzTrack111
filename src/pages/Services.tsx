
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  const services: Service[] = [
    {
      id: "1",
      name: "Website Design",
      description: "Custom website design with responsive layouts",
      price: 1500,
      category: "design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    },
    {
      id: "2",
      name: "Logo Design",
      description: "Professional logo design with multiple concepts",
      price: 500,
      category: "design",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea",
    },
    {
      id: "3",
      name: "Web Development",
      description: "Custom web application development",
      price: 3000,
      category: "development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
      id: "4",
      name: "Digital Marketing",
      description: "Comprehensive digital marketing services",
      price: 800,
      category: "marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
    {
      id: "5",
      name: "SEO Optimization",
      description: "Search engine optimization for better rankings",
      price: 600,
      category: "marketing",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
    },
    {
      id: "6",
      name: "Mobile App Development",
      description: "Native mobile application development",
      price: 4000,
      category: "development",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    },
    {
      id: "7",
      name: "Content Writing",
      description: "Professional content creation services",
      price: 300,
      category: "content",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    },
    {
      id: "8",
      name: "UI/UX Design",
      description: "User interface and experience design",
      price: 1200,
      category: "design",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
    },
  ];

  // Filter services based on search query and selected category
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      currentTab === "all" || service.category === currentTab;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const categories = [
    { value: "all", label: "All Services" },
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" },
    { value: "content", label: "Content" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Services</h1>
            <p className="text-muted-foreground">
              Manage your service offerings
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-1" /> Add Service
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className={!searchQuery ? "bg-muted" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="mb-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.value} value={category.value}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div
                          className="h-40 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${service.image})`,
                          }}
                        ></div>
                        <div className="p-4">
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="font-bold text-primary">
                              {formatCurrency(service.price)}
                            </p>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredServices.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No services found</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Services;
