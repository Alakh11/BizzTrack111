
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Product, PRODUCT_CATEGORIES, useProducts } from "@/hooks/useProducts";
import { Barcode } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  sku: z.string().min(1, { message: "SKU/Code is required" }),
  price: z.coerce.number().min(0, { message: "Price must be 0 or higher" }),
  quantity: z.coerce.number().int().min(0, { message: "Quantity must be 0 or higher" }),
  category: z.string().min(1, { message: "Category is required" }),
  low_stock_threshold: z.coerce.number().int().min(0).default(10),
  description: z.string().optional(),
  barcode: z.string().optional(),
});

interface AddProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit?: Product | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  open,
  onOpenChange,
  productToEdit,
}) => {
  const { createProduct, updateProduct } = useProducts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: productToEdit?.name || "",
      sku: productToEdit?.sku || "",
      price: productToEdit?.price || 0,
      quantity: productToEdit?.quantity || 0,
      category: productToEdit?.category || "",
      low_stock_threshold: productToEdit?.low_stock_threshold || 10,
      description: productToEdit?.description || "",
      barcode: productToEdit?.barcode || "",
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
        sku: "",
        price: 0,
        quantity: 0,
        category: "",
        low_stock_threshold: 10,
        description: "",
        barcode: "",
      });
    }
  }, [productToEdit, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (productToEdit) {
      await updateProduct.mutateAsync({
        ...values,
        id: productToEdit.id,
      });
    } else {
      await createProduct.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {productToEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {productToEdit
              ? "Update product information"
              : "Add a new product to your inventory"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
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
                    <FormLabel>SKU/Code</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU/Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
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
                    <FormLabel>Quantity in Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="low_stock_threshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Alert</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
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
                      placeholder="Product description"
                      className="h-20"
                      {...field}
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
                  <FormLabel>Barcode (Optional)</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input placeholder="Will be auto-generated if empty" {...field} />
                    </FormControl>
                    <Barcode className="text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createProduct.isPending || updateProduct.isPending}
              >
                {createProduct.isPending || updateProduct.isPending ? (
                  "Saving..."
                ) : productToEdit ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
