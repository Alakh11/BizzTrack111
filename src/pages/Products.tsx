
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Package, AlertCircle, Search, Barcode } from "lucide-react";
import { useProducts, PRODUCT_CATEGORIES, Product } from "@/hooks/useProducts";
import AddProductForm from "@/components/products/AddProductForm";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Products = () => {
  const { products = [], isLoading, deleteProduct, getLowStockProducts } = useProducts();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = getLowStockProducts();

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsAddProductOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct.mutateAsync(id);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products & Inventory</h1>
            <p className="text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Button onClick={() => {
            setProductToEdit(null);
            setIsAddProductOpen(true);
          }}>
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Products</p>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold">{lowStockProducts.length}</p>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Inventory Value</p>
              <span className="text-muted-foreground text-xs">₹</span>
            </div>
            <p className="text-2xl font-bold">
              {formatCurrency(products.reduce((sum, product) => sum + product.price * product.quantity, 0))}
            </p>
          </div>
        </div>

        {lowStockProducts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-medium text-amber-800">Low Stock Alert</h3>
            </div>
            <div className="mt-2 text-sm text-amber-700">
              <p>{lowStockProducts.length} products are running low on stock.</p>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                {lowStockProducts.slice(0, 3).map(product => (
                  <li key={product.id}>{product.name} - Only {product.quantity} left</li>
                ))}
                {lowStockProducts.length > 3 && (
                  <li>And {lowStockProducts.length - 3} more...</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Inventory List</CardTitle>
            <CardDescription>
              View and manage all your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {PRODUCT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-center">Barcode</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading products...
                      </TableCell>
                    </TableRow>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.name}
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description}</div>
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(Number(product.price))}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={
                            product.quantity <= (product.low_stock_threshold || 10) 
                            ? "text-red-500 font-medium" 
                            : ""
                          }>
                            {product.quantity}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Barcode className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-mono text-xs">{product.barcode}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddProductForm
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        productToEdit={productToEdit}
      />
    </MainLayout>
  );
};

export default Products;
