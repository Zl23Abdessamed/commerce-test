import { createSlugFromName, initialProducts } from "@/app/utils/utils";
import ProductDetails from "../components/ProductsDetails";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // Find product by matching the slug with converted product name
  const product = initialProducts.find((item) => {
    const productSlug = createSlugFromName(item.name);
    return productSlug === slug;
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}