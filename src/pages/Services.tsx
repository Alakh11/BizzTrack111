
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServices } from "@/hooks/useServices";
import AddServiceDialog from "@/components/services/AddServiceDialog";
import ServiceGrid from "@/components/services/ServiceGrid";

// Categories for filtering services
const categories = [
  { value: "all", label: "All Services" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "content", label: "Content" },
];

const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { services, isLoading } = useServices();

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
          <AddServiceDialog 
            isOpen={isAddDialogOpen} 
            setIsOpen={setIsAddDialogOpen} 
          />
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
                  <ServiceGrid 
                    searchQuery={searchQuery} 
                    currentTab={currentTab} 
                  />
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
