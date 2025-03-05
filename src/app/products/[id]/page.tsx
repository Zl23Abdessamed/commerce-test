import { initialProducts } from "@/app/utils/utils";
import ProductDetails from "../components/ProductsDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = initialProducts.find((item) => item.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}
