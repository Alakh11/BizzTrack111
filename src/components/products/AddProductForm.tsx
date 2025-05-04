
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useProducts, PRODUCT_CATEGORIES, Product } from "@/hooks/useProducts";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  category: z.string().min(1, "Category is required"),
  low_stock_threshold: z.coerce.number().min(0).optional(),
  description: z.string().optional(),
  barcode: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit: Product | null;
}

const AddProductForm = ({ open, onOpenChange, productToEdit }: AddProductFormProps) => {
  const { createProduct, updateProduct } = useProducts();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: productToEdit ? {
      name: productToEdit.name,
      sku: productToEdit.sku,
      price: productToEdit.price,
      quantity: productToEdit.quantity,
      category: productToEdit.category,
      low_stock_threshold: productToEdit.low_stock_threshold || 10,
      description: productToEdit.description || "",
      barcode: productToEdit.barcode || "",
    } : {
      name: "",
      sku: generateSku(),
      price: 0,
      quantity: 0,
      category: "",
      low_stock_threshold: 10,
      description: "",
      barcode: "",
    },
  });
  
  React.useEffect(() => {
    if (productToEdit) {
      form.reset({
        name: productToEdit.name,
        sku: productToEdit.sku,
        price: productToEdit.price,
        quantity: productToEdit.quantity,
        category: productToEdit.category,
        low_stock_threshold: productToEdit.low_stock_threshold || 10,
        description: productToEdit.description || "",
        barcode: productToEdit.barcode || "",
      });
    } else {
      form.reset({
        name: "",
        sku: generateSku(),
        price: 0,
        quantity: 0,
        category: "",
        low_stock_threshold: 10,
        description: "",
        barcode: "",
      });
    }
  }, [productToEdit, form]);
  
  function generateSku() {
    const prefix = "SKU";
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomNum}`;
  }
  
  const onSubmit = (data: ProductFormValues) => {
    // Make sure all required fields are provided
    const productData = {
      name: data.name,
      sku: data.sku,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      description: data.description || "",
      low_stock_threshold: data.low_stock_threshold || 10,
      barcode: data.barcode || "",
    };
    
    if (productToEdit) {
      updateProduct.mutate({
        ...productData,
        id: productToEdit.id
      }, {
        onSuccess: () => {
          onOpenChange(false);
        }
      });
    } else {
      createProduct.mutate(productData, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{productToEdit ? "Edit Product" : "Add New Product"}</SheetTitle>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Product name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU/Code*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Product SKU" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity in Stock*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="low_stock_threshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Threshold</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        {...field} 
                        placeholder="10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Product description" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Leave empty for auto-generation" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{productToEdit ? "Update" : "Save"} Product</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductForm;
